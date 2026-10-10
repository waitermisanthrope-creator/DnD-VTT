'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const source=fs.readFileSync('app/3dmap/gltf_loader.js','utf8');
const ctx={window:{},TextDecoder,Uint8Array,ArrayBuffer,DataView,Float32Array,Uint16Array,Uint32Array,Int8Array,Int16Array,Number,Promise,fetch:null};
vm.runInNewContext(source,ctx,{filename:'gltf_loader.js'});
const loader=ctx.window.DNDGLTF;
function glb(json,bin){let j=Buffer.from(JSON.stringify(json));j=Buffer.concat([j,Buffer.alloc((4-j.length%4)%4,32)]);bin=Buffer.from(bin);bin=Buffer.concat([bin,Buffer.alloc((4-bin.length%4)%4)]);const b=Buffer.alloc(12+8+j.length+8+bin.length);b.write('glTF',0);b.writeUInt32LE(2,4);b.writeUInt32LE(b.length,8);b.writeUInt32LE(j.length,12);b.write('JSON',16);j.copy(b,20);let o=20+j.length;b.writeUInt32LE(bin.length,o);b.writeUInt32LE(0x004e4942,o+4);bin.copy(b,o+8);return Uint8Array.from(b).buffer;}
const base={asset:{version:'2.0'},scene:0,scenes:[{nodes:[0]}],nodes:[{mesh:0}],meshes:[{primitives:[{attributes:{POSITION:0}}]}]};
async function run(){
 const positions=Buffer.alloc(36);[0,0,0,1,0,0,0,1,0].forEach((v,i)=>positions.writeFloatLE(v,i*4));
 const json={...base,buffers:[{byteLength:36}],bufferViews:[{buffer:0,byteOffset:0,byteLength:36}],accessors:[{bufferView:0,componentType:5126,count:3,type:'VEC3'}]};
 let calls=0;ctx.fetch=async()=>{calls++;return {ok:true,arrayBuffer:async()=>glb(json,positions)}};
 const normal=await loader.load('normal.glb');assert.equal(normal.parts.length,1);assert.equal(normal.bounds.size[0],1);assert.equal(normal.bounds.size[1],1);assert.equal(calls,1);
 // Sparse accessor with no base bufferView: indices 1,2 override the zero-filled positions.
 const sparse=Buffer.alloc(26);sparse.writeUInt8(1,0);sparse.writeUInt8(2,1);[1,0,0,0,1,0].forEach((v,i)=>sparse.writeFloatLE(v,2+i*4));
 const sparseJson={...base,buffers:[{byteLength:26}],bufferViews:[{buffer:0,byteOffset:0,byteLength:2},{buffer:0,byteOffset:2,byteLength:24}],accessors:[{componentType:5126,count:3,type:'VEC3',sparse:{count:2,indices:{bufferView:0,componentType:5121},values:{bufferView:1}}}]};
 ctx.fetch=async()=>({ok:true,arrayBuffer:async()=>glb(sparseJson,sparse)});
 const parsed=await loader.load('sparse.glb');assert.equal(parsed.bounds.size[0],1);assert.equal(parsed.bounds.size[1],1);assert.equal(parsed.parts[0].positions.length,9);
 // GLB with an external secondary buffer: fetch and resolve it before flattening.
 const externalJson={...base,buffers:[{byteLength:4},{uri:'positions.bin',byteLength:36}],bufferViews:[{buffer:1,byteOffset:0,byteLength:36}],accessors:[{bufferView:0,componentType:5126,count:3,type:'VEC3'}]};
 let externalCalls=[];ctx.fetch=async url=>{externalCalls.push(url);return {ok:true,arrayBuffer:async()=>url.endsWith('.bin')?Uint8Array.from(positions).buffer:glb(externalJson,Buffer.alloc(4))}};
 const external=await loader.load('models/external.glb');assert.equal(external.bounds.size[0],1);assert.equal(external.bounds.size[1],1);assert.deepEqual(externalCalls,['models/external.glb','models/positions.bin']);
 // A failed fetch must not poison the loader cache.
 let attempts=0;ctx.fetch=async()=>{attempts++;if(attempts===1)throw Error('temporary');return {ok:true,arrayBuffer:async()=>glb(json,positions)}};
 await assert.rejects(loader.load('retry.glb'),/temporary/);await loader.load('retry.glb');assert.equal(attempts,2);
 // Truncated binary must fail cleanly.
 ctx.fetch=async()=>({ok:true,arrayBuffer:async()=>glb(json,positions).slice(0,25)});
 await assert.rejects(loader.load('truncated.glb'),/Truncated GLB/);
 console.log('PASS: ordinary, sparse, external buffer, retry, truncated GLB');
}
run().catch(e=>{console.error(e);process.exitCode=1;});
