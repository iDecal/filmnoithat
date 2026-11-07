const COOKIE = '__Host-decap_oauth_state';
const DEFAULT_SITE = 'https://filmnoithat.pages.dev';
const headers = {
  'Cache-Control': 'no-store',
  'Referrer-Policy': 'no-referrer',
  'X-Content-Type-Options': 'nosniff',
};

function configuration(env, request) {
  const site = new URL(env.CMS_SITE_URL || DEFAULT_SITE);
  if (site.protocol !== 'https:' || site.origin !== new URL(request.url).origin) {
    throw new Error('invalid_origin');
  }
  if (!env.GITHUB_OAUTH_CLIENT_ID || !env.GITHUB_OAUTH_CLIENT_SECRET) {
    throw new Error('not_configured');
  }
  return { origin: site.origin, clientId: env.GITHUB_OAUTH_CLIENT_ID, secret: env.GITHUB_OAUTH_CLIENT_SECRET };
}

function cookie(value, maxAge) {
  return `${COOKIE}=${value}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`;
}

function errorResponse(code, status = 400, clearCookie = false) {
  const text = code === 'not_configured'
    ? 'Chưa cấu hình đăng nhập CMS. Hãy thêm GitHub OAuth Client ID và Client Secret trong Cloudflare Pages.'
    : 'Không thể đăng nhập CMS. Hãy đóng cửa sổ này và thử lại từ trang quản trị.';
  return new Response(text, { status, headers: { ...headers, 'Content-Type': 'text/plain; charset=utf-8', ...(clearCookie ? { 'Set-Cookie': cookie('', 0) } : {}) } });
}

export async function authorize({ request, env }) {
  if (request.method !== 'GET') return errorResponse('method', 405);
  try {
    const config = configuration(env, request);
    const provider = new URL(request.url).searchParams.get('provider');
    if (provider && provider !== 'github') return errorResponse('provider');
    const state = [...crypto.getRandomValues(new Uint8Array(32))].map(byte => byte.toString(16).padStart(2, '0')).join('');
    const url = new URL('https://github.com/login/oauth/authorize');
    url.search = new URLSearchParams({ client_id: config.clientId, redirect_uri: `${config.origin}/api/callback`, scope: 'repo', state }).toString();
    return new Response(null, { status: 302, headers: { ...headers, Location: url.href, 'Set-Cookie': cookie(state, 600) } });
  } catch (error) {
    return errorResponse(error.message, error.message === 'not_configured' ? 503 : 400);
  }
}

export async function callback({ request, env }, fetcher = fetch) {
  if (request.method !== 'GET') return errorResponse('method', 405);
  let config;
  try { config = configuration(env, request); }
  catch (error) { return errorResponse(error.message, error.message === 'not_configured' ? 503 : 400, true); }
  const url = new URL(request.url);
  const state = url.searchParams.get('state');
  const savedState = (request.headers.get('Cookie') || '').split(';').map(value => value.trim()).find(value => value.startsWith(`${COOKIE}=`))?.slice(COOKIE.length + 1);
  const code = url.searchParams.get('code');
  if (!state || !savedState || !/^[a-f0-9]{64}$/.test(state) || state !== savedState || !code || url.searchParams.has('error')) {
    return errorResponse('invalid_state', 400, true);
  }
  try {
    const response = await fetcher('https://github.com/login/oauth/access_token', {
      method: 'POST', headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ client_id: config.clientId, client_secret: config.secret, code, redirect_uri: `${config.origin}/api/callback` }),
    });
    if (!response.ok) return errorResponse('token_exchange', 502, true);
    const token = await response.json();
    if (!token.access_token || token.error) return errorResponse('authorization_denied', 403, true);
    // Only issue a CMS session to users who can write to this site's repository.
    const repository = await fetcher('https://api.github.com/repos/iDecal/filmnoithat', {
      headers: { Accept: 'application/vnd.github+json', Authorization: `Bearer ${token.access_token}`, 'User-Agent': 'filmnoithat-decap-cms' },
    });
    if (!repository.ok || !(await repository.json()).permissions?.push) return errorResponse('repository_permission', 403, true);
    const nonce = crypto.randomUUID().replaceAll('-', '');
    const message = JSON.stringify(`authorization:github:success:${JSON.stringify({ token: token.access_token, provider: 'github' })}`).replaceAll('<', '\\u003c');
    const origin = JSON.stringify(config.origin);
    const html = `<!doctype html><html lang="vi"><meta charset="utf-8"><meta name="robots" content="noindex,nofollow"><title>Đăng nhập CMS</title><p>Đang hoàn tất đăng nhập…</p><script nonce="${nonce}">
(function () {
  var origin = ${origin};
  if (!window.opener) { document.querySelector('p').textContent = 'Hãy mở đăng nhập từ trang quản trị.'; return; }
  window.addEventListener('message', function receive(event) {
    if (event.origin !== origin || event.source !== window.opener || event.data !== 'authorizing:github') return;
    window.removeEventListener('message', receive);
    window.opener.postMessage(${message}, origin);
    window.close();
  });
  window.opener.postMessage('authorizing:github', origin);
})();
</script></html>`;
    return new Response(html, { headers: { ...headers, 'Content-Type': 'text/html; charset=utf-8', 'Set-Cookie': cookie('', 0), 'Content-Security-Policy': `default-src 'none'; script-src 'nonce-${nonce}'; base-uri 'none'; frame-ancestors 'none'` } });
  } catch {
    return errorResponse('upstream_error', 502, true);
  }
}
