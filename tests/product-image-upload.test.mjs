import test from 'node:test';
import assert from 'node:assert/strict';
import { uploadProductImage, deleteProductImage } from '../server/product-image-upload.mjs';
const origin='https://filmnoithat.pages.dev';
const record={slug:'toda-922-03',brand:'TODA',code:'922-03',image:'/images/original.webp',gallery:[{src:'/images/existing.webp',alt:'Existing'}]};
function request({alt='Wood texture',slug=record.slug,brand='TODA',type='image/png',bytes=new Uint8Array([137,80,78,71,13,10,26,10,1,2,3]),auth=true,site=origin}={}) {
 const body=new FormData();body.set('file',new File([bytes],'material.png',{type}));body.set('slug',slug);body.set('brand',brand);body.set('alt',alt);body.set('caption','Sample photo');body.set('width','100');body.set('height','100');
 return new Request(`${origin}/api/product-images`,{method:'POST',headers:{Origin:site,...(auth?{Authorization:'Bearer test-token'}:{})},body});
}
function github({push=true,race=false,product=record}={}) {
 const calls=[];let patches=0;let records=0;
 const fetcher=async(url,options)=>{
  const method=options.method;const body=options.body?JSON.parse(options.body):null;calls.push({url,method,body});
  if(url.endsWith('/filmnoithat'))return Response.json({permissions:{push}});
  if(url.endsWith('/git/ref/heads/main'))return Response.json({object:{sha:patches?'head-2':'head-1'}});
  if(url.includes('/contents/')){
   const currentProduct=patches?{...product,gallery:[...(product.gallery||[]),{src:'/images/concurrent.webp',alt:'Another edit'}]}:product;
   return Response.json({type:'file',encoding:'base64',content:Buffer.from(JSON.stringify(currentProduct)).toString('base64')});
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
test('rejects traversal, excessive ALT, forged MIME and oversized files',async()=>{
 const cases=[{slug:'../settings'},{alt:'a'.repeat(501)},{type:'image/png',bytes:new Uint8Array([1,2,3])},{bytes:new Uint8Array(5*1024*1024+1)}];
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
function deleteRequest(src='/images/existing.webp',{auth=true,site=origin}={}) {
 return new Request(`${origin}/api/product-images`,{method:'DELETE',headers:{Origin:site,'Content-Type':'application/json',...(auth?{Authorization:'Bearer test-token'}:{})},body:JSON.stringify({slug:record.slug,brand:'TODA',src})});
}
test('deletion requires origin and write permission',async()=>{
 for(const options of [{auth:false},{site:'https://attacker.example'}])assert.ok([401,403].includes((await deleteProductImage({request:deleteRequest(undefined,options),env:{}},()=>{throw new Error('unexpected');})).status));
 const mock=github({push:false});assert.equal((await deleteProductImage({request:deleteRequest(),env:{}},mock.fetcher)).status,403);
});
test('deleting an additional photo removes only the association and leaves shared media and the main image intact',async()=>{
 const mock=github();const response=await deleteProductImage({request:deleteRequest(),env:{}},mock.fetcher);assert.equal(response.status,200);
 const blob=mock.calls.find(call=>call.url.endsWith('/git/blobs'));const product=JSON.parse(Buffer.from(blob.body.content,'base64').toString());
 assert.equal(product.image,record.image);assert.equal(product.gallery.length,0);assert.deepEqual(product.hiddenImages,['/images/existing.webp']);
 const tree=mock.calls.find(call=>call.url.endsWith('/git/trees')).body;assert.equal(tree.tree.length,1);assert.ok(tree.tree[0].path.startsWith('src/content/products/'));assert.notEqual(tree.tree[0].sha,null);
});
test('deleting a main photo promotes an uploaded alternative, but the last material image cannot be removed',async()=>{
 const mock=github({product:{...record,imageSource:{pdf:'/catalogue.pdf',page:1}}});assert.equal((await deleteProductImage({request:deleteRequest(record.image),env:{}},mock.fetcher)).status,200);
 const product=JSON.parse(Buffer.from(mock.calls.find(call=>call.url.endsWith('/git/blobs')).body.content,'base64').toString());assert.equal(product.image,'/images/existing.webp');assert.equal(product.imageAlt,'Existing');assert.equal(product.imageSource,undefined);
 const last=github({product:{...record,gallery:[]}});assert.equal((await deleteProductImage({request:deleteRequest(record.image),env:{}},last.fetcher)).status,409);assert.equal(last.calls.filter(call=>call.method==='POST').length,0);
});
test('deletion retries concurrent edits and retains another editor’s uploaded photo',async()=>{
 const mock=github({race:true});assert.equal((await deleteProductImage({request:deleteRequest(),env:{}},mock.fetcher)).status,200);
 const blobs=mock.calls.filter(call=>call.url.endsWith('/git/blobs'));const product=JSON.parse(Buffer.from(blobs.at(-1).body.content,'base64').toString());assert.equal(product.gallery.length,1);assert.equal(product.gallery[0].src,'/images/concurrent.webp');
});

test('blank ALT automatically uses the product name, code and brand', async () => {
 const mock=github({product:{...record,name:'Vân gỗ'}});
 const response=await uploadProductImage({request:request({alt:''}),env:{}},mock.fetcher);
 assert.equal(response.status,201); const {photo}=await response.json();
 assert.equal(photo.title,'Film dán nội thất Vân gỗ 922-03 – TODA');
 assert.equal(photo.alt,`Bề mặt ${photo.title}`);
});
function managementRequest(method,body,auth=true){return new Request(`${origin}/api/product-images`,{method,headers:{Origin:origin,'Content-Type':'application/json',...(auth?{Authorization:'Bearer test-token'}:{})},body:JSON.stringify({slug:record.slug,brand:record.brand,...body})});}
test('setting primary swaps the material photo while preserving the former primary and metadata',async()=>{
 const mock=github({product:{...record,imageAlt:'Original ALT',gallery:[{src:'/images/existing.webp',alt:'New ALT',title:'New title',width:80,height:60}]}});
 const response=await deleteProductImage({request:managementRequest('PATCH',{src:'/images/existing.webp'}),env:{}},mock.fetcher);
 assert.equal(response.status,200);
 const stored=JSON.parse(Buffer.from(mock.calls.find(c=>c.url.endsWith('/git/blobs')).body.content,'base64').toString());
 assert.equal(stored.image,'/images/existing.webp');assert.equal(stored.imageAlt,'New ALT');assert.equal(stored.imageTitle,'New title');assert.equal(stored.imageWidth,80);assert.equal(stored.gallery[0].src,record.image);
});
test('primary cannot be a reference or hidden image',async()=>{
 for(const src of ['/images/reference.webp','/images/existing.webp']){
 const mock=github({product:{...record,hiddenImages:['/images/existing.webp']}});
 const response=await deleteProductImage({request:managementRequest('PATCH',{src}),env:{}},mock.fetcher);
 assert.equal(response.status,409);assert.ok(!mock.calls.some(c=>c.method==='POST'));
 }
});
test('product deletion removes only the product JSON, requires permission, and retries concurrent changes',async()=>{
 for(const auth of [false,true]){
 const mock=github({race:true});const response=await deleteProductImage({request:managementRequest('DELETE',{action:'delete-product'},auth),env:{}},mock.fetcher);
 assert.equal(response.status,auth?200:401);
 if(auth){const trees=mock.calls.filter(c=>c.url.endsWith('/git/trees'));assert.equal(trees.length,2);for(const c of trees)assert.deepEqual(c.body.tree,[{path:'src/content/products/toda/toda-922-03.json',mode:'100644',type:'blob',sha:null}]);assert.equal((await response.json()).deletedProduct,true);}
 }
 const mock=github({push:false});assert.equal((await deleteProductImage({request:managementRequest('DELETE',{action:'delete-product'}),env:{}},mock.fetcher)).status,403);
});
