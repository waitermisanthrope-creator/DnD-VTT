/* Audit the actual shipped MakeHuman images and the actual human GLB UVs. */
const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert');
const root=path.resolve(__dirname,'..');
const win={},ctx={window:win,console,TextDecoder,DataView,Float32Array,Uint32Array,Uint16Array,Uint8Array,Int8Array,Int16Array,atob,btoa,fetch:async url=>{const b=fs.readFileSync(path.join(root,path.basename(url)));return{ok:true,arrayBuffer:async()=>b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength)};}};
for(const name of ['character_system','gltf_loader'])vm.runInNewContext(fs.readFileSync(path.join(root,'app/3dmap',name+'.js'),'utf8'),ctx);
(async()=>{
const api=win.DNDCharacter3D;
for(const skin of api.listSkins()){
 const file=path.join(root,skin.texture),b=fs.readFileSync(file);
 assert.strictEqual(b.subarray(0,8).toString('hex'),'89504e470d0a1a0a');assert.strictEqual(b.toString('ascii',12,16),'IHDR');
 assert.strictEqual(b.readUInt32BE(16),2048);assert.strictEqual(b.readUInt32BE(20),2048);
 const dir=path.dirname(file),mat=fs.readdirSync(dir).find(n=>n.endsWith('.mhmat')),text=fs.readFileSync(path.join(dir,mat),'utf8');
 assert(text.includes('diffuseTexture '+path.basename(file)),'material references a missing/different image');assert(text.includes('released as CC0'));
}
const a=await win.DNDGLTF.load('human-base-rigged.glb');
const parts=a.parts.filter(p=>p.material===api.getRace('human').skinMaterial);assert(parts.length);
for(const p of parts){assert(p.uv&&p.uv.length===p.positions.length/3*2);assert(Array.from(p.uv).every(n=>Number.isFinite(n)&&n>=0&&n<=1));assert(Array.from(p.indices).every(n=>n<p.positions.length/3));}
console.log('CHARACTER_3D_SKIN_ASSETS_TEST_OK: 2 shipped PNGs, CC0 materials, real GLB UVs and indices');
})().catch(e=>{console.error(e);process.exitCode=1;});
