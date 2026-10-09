const assert=require('assert'),fs=require('fs'),os=require('os'),path=require('path'),zlib=require('zlib');
const bridge=require('../tools/build_makehuman_morphs');
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'mh-uv-'));
try{
 const obj=path.join(dir,'base.obj'),target=path.join(dir,'sample.target.gz');
 fs.writeFileSync(obj,'v 0 0 0\nv 1 0 0\nv 0 1 0\nvt 0 0\nvt 1 0\nvt 0 1\ng body\nf 1/1 2/2 3/3\ng helper-tights\nf 1/1 2/2 3/3\n');
 const hm=bridge.obj(obj);assert.strictEqual(hm.triangles.length,1,'helper geometry must not enter body map');
 const m=bridge.mapSurface(hm,new Float32Array([.25,.75]));assert.deepStrictEqual(m.vertices[0].ids,[0,1,2]);assert.deepStrictEqual(m.vertices[0].w,[.5,.25,.25]);assert.strictEqual(m.maxOutside,0);
 fs.writeFileSync(target,zlib.gzipSync('1 .1 .2 .3\n'));const d=bridge.target(target,3);for(let i=0;i<3;i++)assert(Math.abs(d[3+i]-[.1,.2,.3][i])<1e-7,'native Y-up target axes must stay in OBJ order');
 assert.throws(()=>bridge.mapSurface(hm,new Float32Array([.99,.01])),/UV map failed/,'incompatible UV must fail rather than guess');
 assert.throws(()=>bridge.build(dir,obj,obj,'unused'),/Source must not be overwritten/);
 fs.writeFileSync(target,zlib.gzipSync('99 1 0 0\n'));assert.throws(()=>bridge.target(target,3),/Malformed/);
 console.log('MAKEHUMAN_UV_BRIDGE_TEST_OK: barycentric map, V flip, body-only triangles, native axes and fail-closed inputs');
}finally{fs.rmSync(dir,{recursive:true,force:true});}
