import test from 'node:test';
import assert from 'node:assert/strict';
import { authorize, callback } from '../server/cms-oauth.mjs';
const origin = 'https://filmnoithat.pages.dev';
const env = { GITHUB_OAUTH_CLIENT_ID: 'test-client', GITHUB_OAUTH_CLIENT_SECRET: 'test-secret' };
async function start() {
  const response = await authorize({ request: new Request(`${origin}/api/auth?provider=github`), env });
  const redirect = new URL(response.headers.get('Location'));
  return { response, redirect, state: redirect.searchParams.get('state'), cookie: response.headers.get('Set-Cookie').split(';')[0] };
}
function request(state, cookie) { return new Request(`${origin}/api/callback?code=sample-code&state=${state}`, { headers: { Cookie: cookie } }); }
test('missing hosted OAuth bindings give a clear 503 without redirecting', async () => {
  assert.equal((await authorize({ request: new Request(`${origin}/api/auth`), env: {} })).status, 503);
});
test('authorization binds the callback to the production origin with secure random state', async () => {
  const { response, redirect, state } = await start();
  assert.equal(response.status, 302); assert.equal(redirect.origin, 'https://github.com');
  assert.equal(redirect.searchParams.get('redirect_uri'), `${origin}/api/callback`);
  assert.match(state, /^[a-f0-9]{64}$/); assert.match(response.headers.get('Set-Cookie'), /HttpOnly; Secure; SameSite=Lax/);
  assert.equal(response.headers.get('Cache-Control'), 'no-store');
  assert.equal((await authorize({ request: new Request('https://attacker.example/api/auth'), env })).status, 400);
});
test('callback rejects forged, missing and denied OAuth state before exchanging credentials', async () => {
  const { state, cookie } = await start();
  const never = () => { throw new Error('must not call GitHub'); };
  for (const req of [request('a'.repeat(64), cookie), request(state, ''), new Request(`${origin}/api/callback?error=access_denied&state=${state}`, { headers: { Cookie: cookie } })]) {
    assert.equal((await callback({ request: req, env }, never)).status, 400);
  }
});
test('successful exchange checks repo write permission and uses an origin-restricted popup handshake', async () => {
  const { state, cookie } = await start(); const calls = [];
  const response = await callback({ request: request(state, cookie), env }, async (url, options) => {
    calls.push(url);
    if (url.includes('access_token')) {
      const body = JSON.parse(options.body); assert.equal(body.redirect_uri, `${origin}/api/callback`);
      return Response.json({ access_token: 'test-token-only' });
    }
    assert.equal(options.headers.Authorization, 'Bearer test-token-only');
    return Response.json({ permissions: { push: true } });
  });
  assert.equal(calls.length, 2); assert.equal(response.status, 200);
  assert.match(response.headers.get('Content-Security-Policy'), /frame-ancestors 'none'/);
  assert.match(response.headers.get('Set-Cookie'), /Max-Age=0/);
  const html = await response.text(); assert.match(html, /event\.origin !== origin/); assert.match(html, /event\.source !== window\.opener/);
  assert.match(html, /authorization:github:success/); assert.doesNotMatch(html, /test-secret/);
});
test('repository read-only access and token errors cannot establish a CMS session', async () => {
  const { state, cookie } = await start();
  for (const tokenError of [true, false]) {
    const response = await callback({ request: request(state, cookie), env }, async url => Response.json(url.includes('access_token') ? (tokenError ? { error: 'bad_verification_code' } : { access_token: 'test-token-only' }) : { permissions: { push: false } }));
    assert.equal(response.status, 403); assert.doesNotMatch(await response.text(), /test-token-only/);
  }
});
