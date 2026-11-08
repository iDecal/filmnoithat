import test from 'node:test';
import assert from 'node:assert/strict';
import { sharpenLuminance } from '../src/lib/product-image-preparation.mjs';
test('solid material colors are left exactly unchanged',()=>{
 for(const rgb of [[255,255,255],[0,0,0],[171,119,83],[42,73,115]]) {
  const pixels=new Uint8ClampedArray(Array.from({length:49},()=>[...rgb,255]).flat());
  assert.deepEqual(sharpenLuminance(pixels,7,7),pixels);
 }
});
test('edge contrast increases mildly without changing channel differences or mutating the input',()=>{
 const pixels=new Uint8ClampedArray(7*7*4);
 for(let y=0;y<7;y++)for(let x=0;x<7;x++){const i=(y*7+x)*4;const value=x<3?60:160;pixels.set([value+20,value+10,value,255],i);}
 const original=new Uint8ClampedArray(pixels);const result=sharpenLuminance(pixels,7,7);
 const left=(3*7+2)*4;const right=(3*7+3)*4;
 assert.ok(result[left]<pixels[left] && result[right]>pixels[right]);
 for(let i=0;i<result.length;i+=4){assert.ok(Math.abs(result[i]-pixels[i])<=6);assert.equal(result[i]-result[i+1],20-10);assert.equal(result[i+1]-result[i+2],10);assert.equal(result[i+3],255);}
 assert.deepEqual(pixels,original);
});
test('transparent material edges and alpha remain unchanged',()=>{
 const pixels=new Uint8ClampedArray(Array.from({length:25},(_,i)=>[i*10,100,150,i===12?0:255]).flat());
 const result=sharpenLuminance(pixels,5,5);
 for(let y=1;y<=3;y++)for(let x=1;x<=3;x++){const i=(y*5+x)*4;assert.deepEqual(result.slice(i,i+4),pixels.slice(i,i+4));}
});
