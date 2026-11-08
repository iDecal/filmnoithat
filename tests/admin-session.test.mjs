import test from 'node:test';
import assert from 'node:assert/strict';
import { adminSession } from '../server/admin-session.mjs';
const origin='https://filmnoithat.pages.dev';
const request=(headers={},method='GET')=>new Request(`${origin}/api/admin-session`,{method,headers});
test('admin verification requires a bearer token and rejects foreign origins and methods',async()=>{
 for(const [req,status] of [[request(),401],[request({Authorization:'Bearer test',Origin:'https://foreign.example'}),403],[request({},'POST'),405]]) {
  const response=await adminSession({request:req,env:{}},()=>{throw new Error('no upstream request expected');});assert.equal(response.status,status);
 }
});
test('only GitHub users with repository write permission can reveal admin controls',async()=>{
 for(const push of [true,false]) {
  const response=await adminSession({request:request({Authorization:'Bearer private-token'}),env:{}},async(url,options)=>{
   assert.equal(url,'https://api.github.com/repos/iDecal/filmnoithat');assert.equal(options.headers.Authorization,'Bearer private-token');return Response.json({permissions:{push}});
  });
  assert.equal(response.status,push?200:403);assert.equal(response.headers.get('Cache-Control'),'no-store');const body=await response.text();assert.doesNotMatch(body,/private-token/);if(push)assert.equal(JSON.parse(body).admin,true);
 }
});
test('expired tokens and upstream failures never establish an admin session',async()=>{
 for(const status of [401,403,429,500]) {
  const response=await adminSession({request:request({Authorization:'Bearer test'}),env:{}},async()=>new Response('',{status}));assert.equal(response.status,status===401?401:503);assert.notEqual((await response.json()).admin,true);
 }
});
