import test from 'node:test';
import assert from 'node:assert/strict';
import { uploadProductImage } from '../server/product-image-upload.mjs';
const origin='https://filmnoithat.pages.dev';
const record={slug:'toda-922-03',brand:'TODA',code:'922-03',image:'/images/original.webp',gallery:[{src:'/images/existing.webp',alt:'Existing'}]};
function request({alt='Wood texture',slug=record.slug,brand='TODA',type='image/png',bytes=new Uint8Array([137,80,78,71,13,10,26,10,1,2,3]),auth=true,site=origin}={}) {
 const body=new FormData();body.set('file',new File([bytes],'material.png',{type}));body.set('slug',slug);body.set('brand',brand);body.set('alt',alt);body.set('caption','Sample photo');body.set('width','100');body.set('height','100');
 return new Request(`${origin}/api/product-images`,{method:'POST',headers:{Origin:site,...(auth?{Authorization:'Bearer test-token'}:{})},body});
}
function github({push=true,race=false}={}) {
 const calls=[];let patches=0;let records=0;
 const fetcher=async(url,options)=>{
  const method=options.method;const body=options.body?JSON.parse(options.body):null;calls.push({url,method,body});
  if(url.endsWith('/filmnoithat'))return Response.json({permissions:{push}});
  if(url.endsWith('/git/ref/heads/main'))return Response.json({object:{sha:patches?'head-2':'head-1'}});
  if(url.includes('/contents/')){
   const product=patches?{...record,gallery:[...record.gallery,{src:'/images/concurrent.webp',alt:'Another edit'}]}:record;
   return Response.json({type:'file',encoding:'base64',content:Buffer.from(JSON.stringify(product)).toString('base64')});
  }
  if(method==='GET'&&url.includes('/git/commits/'))return Response.json({tree:{sha:'base-tree'}});
  if(url.endsWith('/git/blobs'))return Response.json({sha:++records===1?'image-blob':`record-blob-${records}`});
  if(url.endsWith('/git/trees'))return Response.json({sha:'new-tree'});
  if(method==='POST'&&url.endsWith('/git/commits'))return Response.json({sha:'new-commit'});
  if(method==='PATCH'&&url.endsWith('/git/refs/heads/main')){patches++;return patches===1&&race?new Response('',{status:422}):Response.json({object:{sha:'new-commit'}});}
  throw new Error('Unexpected GitHub request');
 };
 return {fetcher,calls};
}
test('rejects cross-origin and anonymous writes before calling GitHub',async()=>{
 for(const input of [{auth:false},{site:'https://attacker.example'}]){
  const response=await uploadProductImage({request:request(input),env:{}},()=>{throw new Error('must not call GitHub');});
  assert.equal(response.status,input.auth===false?401:403);
 }
});
test('rejects traversal, blank ALT, forged MIME and oversized files',async()=>{
 const cases=[{slug:'../settings'},{alt:''},{type:'image/png',bytes:new Uint8Array([1,2,3])},{bytes:new Uint8Array(5*1024*1024+1)}];
 for(const input of cases){const response=await uploadProductImage({request:request(input),env:{}},()=>{throw new Error('must not call GitHub');});assert.ok([400,413].includes(response.status));}
});
test('read-only GitHub users cannot save photos',async()=>{
 const mock=github({push:false});const response=await uploadProductImage({request:request(),env:{}},mock.fetcher);assert.equal(response.status,403);assert.equal(mock.calls.length,1);
});
test('commits the image and product gallery atomically, preserving the main image and existing photos',async()=>{
 const mock=github();const response=await uploadProductImage({request:request(),env:{}},mock.fetcher);assert.equal(response.status,201);
 const result=await response.json();assert.match(result.photo.src,/^\/images\/uploads\/products\/toda-922-03\/film-dan-noi-that-toda-922-03-[a-f0-9]+\.png$/);
 const blobs=mock.calls.filter(call=>call.url.endsWith('/git/blobs'));
 const stored=JSON.parse(Buffer.from(blobs[1].body.content,'base64').toString());assert.equal(stored.image,record.image);assert.deepEqual(stored.gallery[0],record.gallery[0]);assert.equal(stored.gallery[1].alt,'Wood texture');
 const tree=mock.calls.find(call=>call.url.endsWith('/git/trees')).body;assert.equal(tree.tree.length,2);assert.equal(tree.base_tree,'base-tree');
 const update=mock.calls.find(call=>call.method==='PATCH');assert.equal(update.body.force,false);
 assert.equal(response.headers.get('Cache-Control'),'no-store');assert.doesNotMatch(JSON.stringify(result),/test-token/);
});
test('retries against the latest HEAD on concurrent edits without dropping another uploaded photo',async()=>{
 const mock=github({race:true});const response=await uploadProductImage({request:request(),env:{}},mock.fetcher);assert.equal(response.status,201);
 assert.equal(mock.calls.filter(call=>call.method==='PATCH').length,2);
 const records=mock.calls.filter(call=>call.url.endsWith('/git/blobs')).slice(1).map(call=>JSON.parse(Buffer.from(call.body.content,'base64').toString()));
 assert.equal(records[1].gallery.length,3);assert.equal(records[1].gallery[1].alt,'Another edit');
 const commits=mock.calls.filter(call=>call.method==='POST'&&call.url.endsWith('/git/commits'));assert.deepEqual(commits[1].body.parents,['head-2']);
});
