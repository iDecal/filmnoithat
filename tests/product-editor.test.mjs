import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { productEditor } from '../server/product-editor.mjs';
const origin='https://filmnoithat.pages.dev';
const product=JSON.parse(readFileSync(new URL('../src/content/products/toda/toda-922-03.json',import.meta.url),'utf8'));
const encode=x=>Buffer.from(JSON.stringify(x)).toString('base64');
function request(body,options={}){
 const method=options.method||(body?'PATCH':'GET');return new Request(origin+'/api/products'+(method==='GET'?`?slug=${product.slug}&brand=TODA`:''),{method,headers:{Origin:options.origin||origin,...(options.auth===false?{}:{Authorization:'Bearer test-token'}),'Content-Type':'application/json'},...(body?{body:JSON.stringify({slug:product.slug,brand:'TODA',...body})}:{})});
}
function mock({push=true,race=false,record=product,concurrent={},duplicate=false,targetExists=false}={}){
 const calls=[];let updates=0;
 return {calls,fetcher:async(url,options)=>{
  const method=options.method;const body=options.body?JSON.parse(options.body):null;calls.push({url,method,body});
  if(url.endsWith('/filmnoithat'))return Response.json({permissions:{push}});
  if(url.endsWith('/git/ref/heads/main'))return Response.json({object:{sha:updates?'new-head':'head'}});
  if(url.includes('/contents/src/content/products/infeel/')||url.includes('/contents/src/content/products/corance/'))return targetExists?Response.json({type:'file'}):new Response('',{status:404});
  if(url.includes(`/contents/src/content/products/toda/${product.slug}.json`))return Response.json({type:'file',encoding:'base64',content:encode(updates?{...record,...concurrent}:record)});
  if(url.includes('/contents/src/content/products/'))return Response.json([{type:'file',name:'other.json',path:'src/content/products/toda/other.json'}]);
  if(url.endsWith('/graphql'))return Response.json({data:{repository:{p0:{text:JSON.stringify({code:duplicate?'NEW-123':'UNRELATED'})}}}});
  if(method==='GET'&&url.includes('/git/commits/'))return Response.json({tree:{sha:'base-tree'}});
  if(url.endsWith('/git/blobs'))return Response.json({sha:'blob'});
  if(url.endsWith('/git/trees'))return Response.json({sha:'tree'});
  if(method==='POST'&&url.endsWith('/git/commits'))return Response.json({sha:'commit'});
  if(method==='PATCH'&&url.endsWith('/git/refs/heads/main')){updates++;return race&&updates===1?new Response('',{status:422}):Response.json({});}
  throw new Error('Unexpected API request: '+url);
 }};
}
const context=req=>({request:req,env:{}});
const patch=(changes,extras={})=>({changes,base:Object.fromEntries(Object.keys(changes).map(k=>[k,product[k]??null])),...extras});
const stored=m=>m.calls.filter(c=>c.url.endsWith('/git/blobs')).map(c=>JSON.parse(Buffer.from(c.body.content,'base64').toString()));
test('metadata reads and writes reject anonymous, cross-origin and read-only access',async()=>{
 for(const method of ['GET','PATCH'])for(const options of [{auth:false},{origin:'https://foreign.example'}]){
  const response=await productEditor(context(request(method==='PATCH'?patch({name:'Updated'}):null,{method,...options})),()=>{throw new Error('unexpected');});assert.equal(response.status,options.auth===false?401:403);
 }
 const m=mock({push:false});assert.equal((await productEditor(context(request()),m.fetcher)).status,403);
});
test('GET returns latest product only after checking write permission, without caching or exposing tokens',async()=>{
 const m=mock();const response=await productEditor(context(request()),m.fetcher);assert.equal(response.status,200);assert.equal(response.headers.get('Cache-Control'),'no-store');assert.deepEqual((await response.json()).product,product);
});
test('metadata edit preserves photos and catalogue provenance, and supports contact or explicit pricing for any brand',async()=>{
 const m=mock();const response=await productEditor(context(request(patch({name:'Tên mới',pricePerMetre:123000,seoTitle:'SEO mới'}))),m.fetcher);assert.equal(response.status,200);
 const saved=stored(m)[0];assert.equal(saved.name,'Tên mới');assert.equal(saved.pricePerMetre,123000);assert.deepEqual(saved.gallery,product.gallery);assert.equal(saved.pdf,product.pdf);assert.equal(saved.slug,product.slug);
 assert.equal(m.calls.find(c=>c.method==='PATCH').body.force,false);
});
test('retries merge unrelated photo uploads, but refuse overwriting the same metadata field',async()=>{
 const concurrent={gallery:[...(product.gallery||[]),{src:'/images/new.webp',alt:'New'}]};const m=mock({race:true,concurrent});
 assert.equal((await productEditor(context(request(patch({name:'New name'}))),m.fetcher)).status,200);assert.deepEqual(stored(m)[1].gallery,concurrent.gallery);
 const conflict=mock({race:true,concurrent:{name:'Other editor'}});assert.equal((await productEditor(context(request(patch({name:'New name'}))),conflict.fetcher)).status,409);assert.equal(stored(conflict).length,1);
});
test('validates fields and prevents arbitrary paths or provenance edits',async()=>{
 for(const changes of [{pricePerMetre:-1},{pricePerMetre:1.2},{name:''},{category:'unknown'},{brand:'unknown'},{slug:'../bad'},{image:'/images/forged.webp'},{color:{name:'x',family:'x',value:'bad'}}]){
  const m=mock();assert.equal((await productEditor(context(request(patch(changes))),m.fetcher)).status,400);assert.equal(m.calls.length,0);
 }
});
test('editing photo ALT and title preserves the source and rejects unassociated images',async()=>{
 const alt=product.imageAlt||'';const title=product.imageTitle||'';const photo={src:product.image,alt:'Bề mặt vật liệu mới',title:'Tiêu đề ảnh mới',base:{alt,title}};
 const m=mock();assert.equal((await productEditor(context(request(patch({}, {photos:[photo]}))),m.fetcher)).status,200);assert.equal(stored(m)[0].imageAlt,photo.alt);assert.equal(stored(m)[0].imageTitle,photo.title);
 assert.equal((await productEditor(context(request(patch({}, {photos:[{...photo,src:'/images/other.webp'}]}))),mock().fetcher)).status,409);
});
test('brand changes atomically move the JSON and preserve the public slug, while collisions are refused',async()=>{
 const m=mock();const response=await productEditor(context(request(patch({brand:'Corance'}))),m.fetcher);assert.equal(response.status,200);
 const tree=m.calls.find(c=>c.url.endsWith('/git/trees')).body.tree;assert.equal(tree.length,2);assert.equal(tree[0].path,`src/content/products/corance/${product.slug}.json`);assert.equal(tree[1].sha,null);assert.equal(stored(m)[0].slug,product.slug);
 assert.equal((await productEditor(context(request(patch({brand:'Corance'}))),mock({targetExists:true}).fetcher)).status,409);
});
test('code collision checks use bounded GraphQL batch reads before any mutation',async()=>{
 const m=mock({duplicate:true});assert.equal((await productEditor(context(request(patch({code:'NEW-123'}))),m.fetcher)).status,409);assert.equal(stored(m).length,0);assert.ok(m.calls.some(c=>c.url.endsWith('/graphql')));
});
test('unique code updates succeed, while GraphQL failure cannot bypass duplicate checks',async()=>{
 const m=mock();assert.equal((await productEditor(context(request(patch({code:'NEW-123'}))),m.fetcher)).status,200);assert.equal(stored(m)[0].code,'NEW-123');
 const failing=mock();const fetcher=(url,options)=>url.endsWith('/graphql')?Response.json({errors:[{message:'not available'}]}):failing.fetcher(url,options);
 assert.equal((await productEditor(context(request(patch({code:'NEW-123'}))),fetcher)).status,502);assert.equal(stored(failing).length,0);
});
test('contact pricing is persisted as null and oversized edits are rejected before GitHub access',async()=>{
 const m=mock();assert.equal((await productEditor(context(request(patch({pricePerMetre:null}))),m.fetcher)).status,200);
 const oversized=patch({seoDescription:'a'.repeat(70000)});assert.equal((await productEditor(context(request(oversized)),()=>{throw new Error('unexpected');})).status,413);
});
