/* Exercise the shipped GLB through the real loader and skinning pipeline. */
const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert');
const {readGlb}=require('./makehuman_morph_bridge');
const root=path.resolve(__dirname,'..'),win={},ctx={window:win,console,TextDecoder,DataView,Float32Array,Uint32Array,Uint16Array,Uint8Array,Int8Array,Int16Array,atob,btoa,fetch:async url=>{const b=fs.readFileSync(path.join(root,url.replace(/^\.\//,'')));return{ok:true,arrayBuffer:async()=>b.buffer.slice(b.byteOffset,b.byteOffset+b.length)};}};
for(const name of ['character_system','gltf_loader','gltf_character_pipeline'])vm.runInNewContext(fs.readFileSync(path.join(root,'app/3dmap',name+'.js'),'utf8'),ctx);
function accessorBytes(g,i){const a=g.json.accessors[i],v=g.json.bufferViews[a.bufferView];return g.bin.subarray((v.byteOffset||0)+(a.byteOffset||0),(v.byteOffset||0)+(a.byteOffset||0)+a.count*({VEC3:3,VEC2:2,VEC4:4,MAT4:16,SCALAR:1}[a.type])*({5126:4,5125:4,5123:2,5121:1}[a.componentType]));}
(async()=>{
win.DNDGLTFCharacterPipeline.install();const url=win.DNDCharacter3D.getRace('human').baseModel;assert(url.startsWith('./app/assets/'),'morph body must be available through OTA');const file=path.join(root,url),source=readGlb(path.join(root,'human-base-rigged.glb')),built=readGlb(file),sm=source.json.meshes[0].primitives[0],bm=built.json.meshes[0].primitives[0];
assert.strictEqual(built.bytes.readUInt32LE(8),built.bytes.length);assert.strictEqual(bm.targets.length,8);assert.strictEqual(built.json.skins[0].joints.length,53);
for(const k of Object.keys(sm.attributes))assert(accessorBytes(source,sm.attributes[k]).equals(accessorBytes(built,bm.attributes[k])),'original '+k+' changed');assert(accessorBytes(source,sm.indices).equals(accessorBytes(built,bm.indices)));assert.deepStrictEqual(built.json.nodes,source.json.nodes);assert.deepStrictEqual(built.json.skins,source.json.skins);
const a=await win.DNDGLTF.load(url),p=a.parts[0],pipe=win.DNDGLTFCharacterPipeline,rules=a.character.morphChannels;assert.strictEqual(p.basePositions.length,70985*3);assert.strictEqual(Object.keys(rules).length,4);assert(p.meshWeights.every(w=>w===0));
pipe.deformAsset(a,{});const neutral=new Float32Array(p.deformedPositions);let seamMax=0;
for(const [axis,rule] of Object.entries(rules))for(const value of [-1,1]){
 const name=value>0?rule.positive:rule.negative,i=p.morphNames.indexOf(name),delta=p.morphTargets[i].POSITION;assert.strictEqual(delta.length,p.basePositions.length);assert(Array.from(delta).every(Number.isFinite));const acc=built.json.accessors[bm.targets[i].POSITION];assert.strictEqual(acc.count,70985);assert(acc.min.every(Number.isFinite)&&acc.max.every(Number.isFinite));
 pipe.deformAsset(a,{[axis]:value});assert(p.morphHandledAxes[axis]);let changed=0,max=0;for(let k=0;k<neutral.length;k++){const d=Math.abs(p.deformedPositions[k]-neutral[k]);if(d>1e-7)changed++;max=Math.max(max,d);assert(Number.isFinite(p.deformedPositions[k]));}assert(changed>1000&&max>.005&&max<.08,axis+' displacement outside expected physical range');
 const seam=new Map();for(let k=0;k<delta.length;k+=3){const key=Array.from(p.basePositions.subarray(k,k+3)).map(x=>x.toFixed(6)).join(','),q=seam.get(key);if(q)seamMax=Math.max(seamMax,Math.hypot(delta[k]-q[0],delta[k+1]-q[1],delta[k+2]-q[2]));else seam.set(key,Array.from(delta.subarray(k,k+3)));}
}
assert(seamMax<.001,'UV seam displacements exceed 1 mm: '+seamMax);
pipe.deformAsset(a,{chest:.7,waist:-.4,hips:1,shoulders:-1});const mixed=new Float32Array(p.deformedPositions);pipe.deformAsset(a,{chest:.7,waist:-.4,hips:1,shoulders:-1});assert.deepStrictEqual(p.deformedPositions,mixed,'repeated draws accumulate deformation');pipe.deformAsset(a,{});assert.deepStrictEqual(p.deformedPositions,neutral,'zero must restore exact neutral');
console.log('CHARACTER_3D_MORPH_ASSETS_TEST_OK: 8 real targets, 4 signed axes, unchanged base/rig/UV, finite extremes, reset; seam max '+seamMax.toFixed(7)+' m');
})().catch(e=>{console.error(e);process.exitCode=1;});
