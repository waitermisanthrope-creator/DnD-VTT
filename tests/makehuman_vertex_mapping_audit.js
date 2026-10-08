#!/usr/bin/env node
/**
 * MakeHuman hm08 -> human GLB geometric mapping audit.
 *
 * Usage:
 *   node tests/makehuman_vertex_mapping_audit.js <base.obj> <human.glb>
 *
 * This does not modify either asset. It tests whether the GLB geometry can
 * plausibly be derived from the hm08 base mesh despite different topology.
 */
const fs = require('fs');

function die(msg) {
  console.error('MAKEHUMAN_VERTEX_MAPPING_AUDIT_ERROR');
  console.error(msg);
  process.exit(1);
}

function readObj(path) {
  const text = fs.readFileSync(path, 'utf8');
  const v = [];
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line[0] === '#') continue;
    const p = line.split(/\s+/);
    if (p[0] === 'v' && p.length >= 4) {
      const x = Number(p[1]), y = Number(p[2]), z = Number(p[3]);
      if ([x,y,z].every(Number.isFinite)) v.push([x,y,z]);
    }
  }
  return v;
}

function readGlb(path) {
  const b = fs.readFileSync(path);
  if (b.length < 20 || b.toString('ascii',0,4) !== 'glTF') die('Invalid GLB');
  if (b.readUInt32LE(4) !== 2) die('Unsupported GLB version');
  let p=12, json=null, bin=null;
  while (p+8 <= b.length) {
    const len=b.readUInt32LE(p), type=b.readUInt32LE(p+4);
    const chunk=b.subarray(p+8,p+8+len);
    if (type===0x4e4f534a) json=JSON.parse(chunk.toString('utf8').replace(/\0+$/,'').trim());
    if (type===0x004e4942) bin=chunk;
    p += 8+len;
  }
  if (!json || !bin) die('GLB missing JSON/BIN');

  const views=json.bufferViews||[], accessors=json.accessors||[];
  const out=[];
  for (const mesh of json.meshes||[]) for (const prim of mesh.primitives||[]) {
    const ai=prim.attributes && prim.attributes.POSITION;
    if (ai==null) continue;
    const a=accessors[ai], view=views[a.bufferView];
    if (!a || !view || a.componentType!==5126 || a.type!=='VEC3') continue;
    const stride=view.byteStride||12;
    const start=(view.byteOffset||0)+(a.byteOffset||0);
    if (view.buffer !== 0) die(`GLB POSITION references unsupported buffer index ${view.buffer}; expected buffer 0`);
    const requiredEnd=start+(a.count-1)*stride+12;
    if (requiredEnd > view.byteOffset + view.byteLength) die(`POSITION accessor exceeds bufferView bounds: end ${requiredEnd}, viewEnd ${view.byteOffset + view.byteLength}`);
    const arr=new Array(a.count);
    for(let i=0;i<a.count;i++){
      const o=start+i*stride;
      if (o < 0 || o+12 > bin.length) die(`POSITION accessor out of BIN bounds at vertex ${i}: offset ${o}, BIN ${bin.length}`);
      arr[i]=[bin.readFloatLE(o),bin.readFloatLE(o+4),bin.readFloatLE(o+8)];
    }
    out.push(arr);
  }
  return out.flat();
}

function bbox(points) {
  const mn=[Infinity,Infinity,Infinity], mx=[-Infinity,-Infinity,-Infinity];
  for(const p of points) for(let k=0;k<3;k++){ mn[k]=Math.min(mn[k],p[k]); mx[k]=Math.max(mx[k],p[k]); }
  return {min:mn,max:mx,size:mx.map((x,k)=>x-mn[k]),center:mx.map((x,k)=>(x+mn[k])/2)};
}

function dist2(a,b){const x=a[0]-b[0],y=a[1]-b[1],z=a[2]-b[2];return x*x+y*y+z*z;}

function permutations(){
  const out=[];
  const perms=[[0,1,2],[0,2,1],[1,0,2],[1,2,0],[2,0,1],[2,1,0]];
  for(const p of perms) for(const sx of [-1,1]) for(const sy of [-1,1]) for(const sz of [-1,1])
    out.push({p,s:[sx,sy,sz]});
  return out;
}

function transformForBBox(p, hb, gb, cfg){
  const q=[p[cfg.p[0]]*cfg.s[0],p[cfg.p[1]]*cfg.s[1],p[cfg.p[2]]*cfg.s[2]];
  // Uniform scale is estimated from total bbox diagonal; translation centers the model.
  const hdiag=Math.hypot(...hb.size), gdiag=Math.hypot(...gb.size);
  const scale=gdiag/hdiag;
  return q.map((x,k)=>x*scale + gb.center[k] - (hb.center[cfg.p[k]]*cfg.s[k])*scale);
}

function nearestGrid(points, cell) {
  const map=new Map();
  const key=(x,y,z)=>Math.floor(x/cell)+','+Math.floor(y/cell)+','+Math.floor(z/cell);
  for(let i=0;i<points.length;i++){
    const p=points[i], k=key(p[0],p[1],p[2]);
    let a=map.get(k); if(!a) map.set(k,a=[]); a.push(i);
  }
  return {map,key};
}

function nearest(points, grid, p, cell) {
  const cx=Math.floor(p[0]/cell), cy=Math.floor(p[1]/cell), cz=Math.floor(p[2]/cell);
  let best=-1, bd=Infinity;
  // Search a 3x3x3 neighborhood. If empty, expand to 5x5x5.
  for(let r of [1,2]){
    for(let x=-r;x<=r;x++) for(let y=-r;y<=r;y++) for(let z=-r;z<=r;z++){
      const a=grid.map.get((cx+x)+','+(cy+y)+','+(cz+z));
      if(!a) continue;
      for(const i of a){const d=dist2(points[i],p);if(d<bd){bd=d;best=i;}}
    }
    if(best>=0) break;
  }
  return [best,Math.sqrt(bd)];
}

const [objPath,glbPath]=process.argv.slice(2);
if(!objPath||!glbPath) die('Usage: node tests/makehuman_vertex_mapping_audit.js <base.obj> <human.glb>');
if(!fs.existsSync(objPath)||!fs.existsSync(glbPath)) die('File not found');

const hm=readObj(objPath), glb=readGlb(glbPath);
if(!hm.length||!glb.length) die('No POSITION vertices found');

const hb=bbox(hm), gb=bbox(glb);
const hdiag=Math.hypot(...hb.size), gdiag=Math.hypot(...gb.size);
const sampleCount=Math.min(2000,hm.length);
const sample=Array.from({length:sampleCount},(_,i)=>hm[Math.floor(i*hm.length/sampleCount)]);

let best=null;
for(const cfg of permutations()){
  const transformed=sample.map(p=>transformForBBox(p,hb,gb,cfg));
  const scale=gdiag/hdiag;
  const cell=Math.max(gdiag/1000,1e-5);
  const grid=nearestGrid(glb,cell);
  let sum=0,max=0,good=0;
  for(const p of transformed){
    const [,d]=nearest(glb,grid,p,cell);
    if(!Number.isFinite(d)) continue;
    sum+=d; max=Math.max(max,d);
    if(d<=cell*2) good++;
  }
  const mean=sum/sampleCount;
  const score=good/sampleCount - mean/(gdiag||1);
  if(!best||score>best.score) best={score,cfg,mean,max,goodPct:good/sampleCount*100};
}

const bestTrans=hm.map(p=>transformForBBox(p,hb,gb,best.cfg));
const cell=Math.max(gdiag/1000,1e-5);
const grid=nearestGrid(glb,cell);
let sum=0,max=0,good=0,within1=0,within5=0;
const used=new Map();
for(const p of bestTrans){
  const [idx,d]=nearest(glb,grid,p,cell);
  if(idx<0) continue;
  sum+=d; max=Math.max(max,d);
  if(d<=cell*1) within1++;
  if(d<=cell*5) within5++;
  if(d<=cell*2) good++;
  used.set(idx,(used.get(idx)||0)+1);
}
let collisions=0;
for(const n of used.values()) if(n>1) collisions+=n-1;

const report={
  hm08Vertices:hm.length,
  glbVertices:glb.length,
  hm08BBox:hb,
  glbBBox:gb,
  bboxDiagonalRatio:gdiag/hdiag,
  bestAxisPermutation:best.cfg,
  sampledBestMeanDistance:best.mean,
  sampledBestMaxDistance:best.max,
  sampledGoodPct:best.goodPct,
  fullMeanNearestDistance:sum/hm.length,
  fullMaxNearestDistance:max,
  withinGridCellPct:within1/hm.length*100,
  within5GridCellsPct:within5/hm.length*100,
  duplicateTargetCollisions:collisions,
  note:'Nearest-vertex proximity is only a plausibility test; it does not prove identical topology or vertex correspondence.'
};
console.log('MAKEHUMAN_VERTEX_MAPPING_AUDIT');
console.log(JSON.stringify(report,null,2));
console.log('');
console.log('RESULT:');
console.log('hm08 vertices:',hm.length);
console.log('GLB vertices:',glb.length);
console.log('Best axis/sign mapping:',JSON.stringify(best.cfg));
console.log('Mean nearest distance:',report.fullMeanNearestDistance);
console.log('Within 1 grid cell:',report.withinGridCellPct.toFixed(2)+'%');
console.log('Duplicate target collisions:',collisions);
console.log('NEXT_STEP: use this only to decide whether geometric mapping is plausible; if plausible, build a topology-aware target transfer.');
