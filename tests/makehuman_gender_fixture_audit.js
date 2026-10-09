#!/usr/bin/env node
/* Explicit stage-1 audit: node tests/makehuman_gender_fixture_audit.js fixture.glb */
const assert=require('assert'),fs=require('fs'),path=require('path'),vm=require('vm'),crypto=require('crypto');
const {readGlb}=require('./makehuman_morph_bridge');
const root=path.resolve(__dirname,'..'),file=process.argv[2];
if(!file)throw Error('Usage: node tests/makehuman_gender_fixture_audit.js fixture.glb');
function bytes(g,i){const a=g.json.accessors[i],v=g.json.bufferViews[a.bufferView],n={VEC3:3,VEC2:2,VEC4:4,MAT4:16,SCALAR:1}[a.type],size={5126:4,5125:4,5123:2,5121:1}[a.componentType],off=(v.byteOffset||0)+(a.byteOffset||0);assert(!v.byteStride&&!a.sparse);return g.bin.subarray(off,off+a.count*n*size);}
function hash(b){return crypto.createHash('sha256').update(b).digest('hex');}
const built=readGlb(file),base=readGlb(path.join(root,'human-base-rigged.glb')),shipped=readGlb(process.argv[3]||path.join(root,'app/assets/3d/makehuman/human-body-morphs.glb'));
const bp=base.json.meshes[0].primitives[0],mp=built.json.meshes[0].primitives[0],sp=shipped.json.meshes[0].primitives[0];
assert.strictEqual(built.bytes.readUInt32LE(8),built.bytes.length);
assert.strictEqual(mp.targets.length,9);assert.deepStrictEqual(built.json.nodes,base.json.nodes);assert.deepStrictEqual(built.json.skins,base.json.skins);
for(const key of Object.keys(bp.attributes))assert(bytes(base,bp.attributes[key]).equals(bytes(built,mp.attributes[key])),key+' changed');
assert(bytes(base,bp.indices).equals(bytes(built,mp.indices)));
assert.deepStrictEqual(built.json.extras.dndMorphChannels,shipped.json.extras.dndMorphChannels);
for(let i=0;i<8;i++)assert(bytes(built,mp.targets[i].POSITION).equals(bytes(shipped,sp.targets[i].POSITION)),'shipped slider '+i+' changed');
assert.strictEqual(built.json.meshes[0].extras.targetNames[8],'human-female');
const win={},ctx={window:win,console,TextDecoder,DataView,Float32Array,Uint32Array,Uint16Array,Uint8Array,Int8Array,Int16Array,atob,btoa,fetch:async()=>({ok:true,arrayBuffer:async()=>built.bytes.buffer.slice(built.bytes.byteOffset,built.bytes.byteOffset+built.bytes.length)})};
for(const module of ['gltf_loader','gltf_character_pipeline'])vm.runInNewContext(fs.readFileSync(path.join(root,'app/3dmap',module+'.js'),'utf8'),ctx);
(async()=>{
 win.DNDGLTFCharacterPipeline.install();const asset=await win.DNDGLTF.load('gender-fixture.glb'),p=asset.parts[0],pipe=win.DNDGLTFCharacterPipeline;
 pipe.deformAsset(asset,{});const neutral=new Float32Array(p.deformedPositions);
 pipe.deformAsset(asset,{'human-female':1});const female=new Float32Array(p.deformedPositions),delta=p.morphTargets[8].POSITION;
 assert(p.morphHandledAxes['human-female']);assert.strictEqual(delta.length,70985*3);
 let changed=0,maxDisplacement=0,sum=0,seamMax=0;const seam=new Map();
 for(let i=0;i<female.length;i+=3){
  for(let k=0;k<3;k++)assert(Number.isFinite(female[i+k]));
  const displacement=Math.hypot(female[i]-neutral[i],female[i+1]-neutral[i+1],female[i+2]-neutral[i+2]);if(displacement>1e-7)changed++;sum+=displacement*displacement;maxDisplacement=Math.max(maxDisplacement,displacement);
  const key=Array.from(p.basePositions.subarray(i,i+3)).map(v=>v.toFixed(6)).join(','),old=seam.get(key);if(old)seamMax=Math.max(seamMax,Math.hypot(delta[i]-old[0],delta[i+1]-old[1],delta[i+2]-old[2]));else seam.set(key,Array.from(delta.subarray(i,i+3)));
 }
 assert(changed>1000&&maxDisplacement>.01&&maxDisplacement<.3,'unexpected female displacement');assert(seamMax<.001,'UV seam exceeds 1 mm');
 pipe.deformAsset(asset,{'human-female':1,chest:.7,waist:-.4,hips:1,shoulders:-1});const mixed=new Float32Array(p.deformedPositions);
 assert.notDeepStrictEqual(mixed,female,'body sliders must still affect female mesh');
 pipe.deformAsset(asset,{'human-female':1,chest:.7,waist:-.4,hips:1,shoulders:-1});assert.deepStrictEqual(p.deformedPositions,mixed,'draws accumulate deformation');
 pipe.deformAsset(asset,{});assert.deepStrictEqual(p.deformedPositions,neutral,'male reset must be exact');
 console.log(JSON.stringify({status:'PASS',fixtureSha256:hash(built.bytes),sourceSha256:hash(base.bytes),shippedSha256:hash(shipped.bytes),bytes:built.bytes.length,vertices:70985,joints:built.json.skins[0].joints.length,targets:mp.targets.length,changedVertices:changed,maxDisplacementMeters:maxDisplacement,rmsDisplacementMeters:Math.sqrt(sum/70985),seamMaxMeters:seamMax,unchanged:'base attributes, indices, nodes, skin, eight shipped targets',runtime:'real loader, morph before skin, signed body sliders, repeat draw, exact reset',physicalAndroidQA:false},null,2));
})().catch(e=>{console.error(e);process.exitCode=1;});
