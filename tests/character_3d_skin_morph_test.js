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
