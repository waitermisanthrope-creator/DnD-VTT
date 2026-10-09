/* CPU morph + skeletal skinning regression test. */
const fs=require('fs'),vm=require('vm'),assert=require('assert'),path=require('path');
const src=fs.readFileSync(path.join(__dirname,'../app/3dmap/gltf_character_pipeline.js'),'utf8');
const ctx={window:{},console};
vm.runInNewContext(src,ctx,{filename:'gltf_character_pipeline.js'});
const pipe=ctx.window.DNDGLTFCharacterPipeline;
assert(pipe&&typeof pipe.deformAsset==='function','deformAsset API missing');
const asset={
  gltf:{nodes:[{children:[1]},{translation:[0,1,0]}],scenes:[{nodes:[0]}],scene:0},
  character:{skins:[{joints:[1],inverseBindMatrices:[[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]]}]},
  parts:[{
    basePositions:new Float32Array([0,0,0]),positions:new Float32Array([0,0,0]),
    joints:new Uint16Array([0,0,0,0]),weights:new Float32Array([1,0,0,0]),
    skin:0,node:0,morphTargets:[{POSITION:new Float32Array([1,0,0])}],morphNames:['width']
  }]
};
pipe.deformAsset(asset,{width:.5});
const p=asset.parts[0].deformedPositions;
assert(Math.abs(p[0]-.5)<1e-6,'morph target failed');
assert(Math.abs(p[1]-1)<1e-6,'skeletal transform failed');
console.log('CHARACTER_3D_SKIN_MORPH_TEST_OK');
// Negative/positive channels compose before skinning and never accumulate.
const channels={waist:{positive:'waist-grow',negative:'waist-shrink'}};
const part=asset.parts[0];part.morphNames=['waist-grow','waist-shrink'];part.morphTargets=[{POSITION:new Float32Array([2,0,0])},{POSITION:new Float32Array([-1,0,0])}];
pipe.deformAsset(asset,{waist:.5},channels);assert.strictEqual(part.deformedPositions[0],1);
pipe.deformAsset(asset,{waist:-.5},channels);assert.strictEqual(part.deformedPositions[0],-.5);
pipe.deformAsset(asset,{waist:0},channels);assert.strictEqual(part.deformedPositions[0],0);assert.strictEqual(part.deformedPositions[1],1);assert.strictEqual(part.basePositions[0],0);
pipe.deformAsset(asset,{waist:Infinity},channels);assert.strictEqual(part.deformedPositions[0],0);
pipe.deformAsset(asset,{waist:7},channels);assert.strictEqual(part.deformedPositions[0],2);
part.morphTargets.pop();assert.strictEqual(Object.keys(pipe.resolveMorphWeights(part,{waist:1},channels).handled).length,0,'incomplete pair must retain procedural fallback');
// A rigid mesh uses node-local deltas before its world transform; node weights
// from the loader override mesh defaults, and untouched defaults stay active.
const rigid={gltf:{nodes:[{translation:[0,3,0],scale:[2,2,2]}],scenes:[{nodes:[0]}]},character:{skins:[]},parts:[{basePositions:new Float32Array([1,0,0]),positions:new Float32Array([2,3,0]),node:0,skin:null,morphNames:['custom'],morphTargets:[{POSITION:new Float32Array([1,0,0])}],meshWeights:[.25]}]};
pipe.deformAsset(rigid,{});assert.strictEqual(rigid.parts[0].deformedPositions[0],2.5);assert.strictEqual(rigid.parts[0].deformedPositions[1],3);
pipe.deformAsset(rigid,{custom:.5});assert.strictEqual(rigid.parts[0].deformedPositions[0],3);
console.log('MORPH_REGISTRY_TEST_OK: signed channels, reset, clamp, fallback, default weights, rigid transforms');
