#!/usr/bin/env node
/**
 * MakeHuman target -> GLB surface transfer audit.
 *
 * This is a CONTROLLED NUMERICAL TRANSFER TEST.
 * It does not modify the source OBJ, target or GLB.
 *
 * Usage:
 *   node tests/makehuman_target_surface_transfer_audit.js <base.obj> <human.glb> <target.gz>
 *
 * The target displacement is mapped from hm08 target vertices onto the nearest
 * GLB triangle. The displacement is scaled by the hm08->GLB uniform scale and
 * distributed to the three triangle vertices using barycentric coordinates.
 *
 * This is intentionally an audit first: it reports transfer quality and does
 * not write a morph into the production GLB.
 */
const fs = require('fs');
const zlib = require('zlib');

function die(msg) {
  console.error('MAKEHUMAN_TARGET_SURFACE_TRANSFER_AUDIT_ERROR');
  console.error(msg);
  process.exit(1);
}

function readObj(path) {
  const text = fs.readFileSync(path, 'utf8');
  const v = [], f = [];
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line[0] === '#') continue;
    const p = line.split(/\s+/);
    if (p[0] === 'v' && p.length >= 4) {
      const q = [Number(p[1]), Number(p[2]), Number(p[3])];
      if (q.every(Number.isFinite)) v.push(q);
    } else if (p[0] === 'f' && p.length >= 4) {
      const ids = p.slice(1).map(x => Number(x.split('/')[0]));
      if (ids.every(Number.isInteger) && ids.length >= 3) {
        const a = ids.map(i => i < 0 ? v.length + i : i - 1);
        for (let i = 1; i < a.length - 1; i++) {
          if (a[0] >= 0 && a[i] >= 0 && a[i + 1] >= 0 &&
              a[0] < v.length && a[i] < v.length && a[i + 1] < v.length) {
            f.push([a[0], a[i], a[i + 1]]);
          }
        }
      }
    }
  }
  return { v, f };
}

function readGlb(path) {
  const b = fs.readFileSync(path);
  if (b.length < 20 || b.toString('ascii', 0, 4) !== 'glTF') die('Invalid GLB');
  if (b.readUInt32LE(4) !== 2) die('Unsupported GLB version');
  let p = 12, json = null, bin = null;
  while (p + 8 <= b.length) {
    const len = b.readUInt32LE(p), type = b.readUInt32LE(p + 4);
    const chunk = b.subarray(p + 8, p + 8 + len);
    if (type === 0x4e4f534a) json = JSON.parse(chunk.toString('utf8').replace(/\0+$/, '').trim());
    if (type === 0x004e4942) bin = chunk;
    p += 8 + len;
  }
  if (!json || !bin) die('GLB missing JSON/BIN');

  const views = json.bufferViews || [], accessors = json.accessors || [];
  const vertices = [], triangles = [];

  for (const mesh of json.meshes || []) for (const prim of mesh.primitives || []) {
    const ai = prim.attributes && prim.attributes.POSITION;
    if (ai == null) continue;
    const a = accessors[ai], view = views[a && a.bufferView];
    if (!a || !view || a.componentType !== 5126 || a.type !== 'VEC3') continue;
    const stride = view.byteStride || 12;
    const start = (view.byteOffset || 0) + (a.byteOffset || 0);
    const base = vertices.length;
    for (let i = 0; i < a.count; i++) {
      const o = start + i * stride;
      if (o + 12 > bin.length) die('POSITION accessor exceeds BIN');
      vertices.push([bin.readFloatLE(o), bin.readFloatLE(o + 4), bin.readFloatLE(o + 8)]);
    }
    const ii = prim.indices;
    if (ii == null) continue;
    const ia = accessors[ii], iv = views[ia.bufferView];
    if (!ia || !iv || ia.type !== 'SCALAR' || iv.buffer !== 0) die('Unsupported index accessor');
    const width = ({5121:1,5123:2,5125:4})[ia.componentType];
    if (!width) die('Unsupported index component type');
    const startI = (iv.byteOffset || 0) + (ia.byteOffset || 0);
    const readIndex = o => ia.componentType === 5121 ? bin.readUInt8(o) :
      ia.componentType === 5123 ? bin.readUInt16LE(o) : bin.readUInt32LE(o);
    const idx = [];
    for (let i = 0; i < ia.count; i++) idx.push(readIndex(startI + i * width));
    for (let i = 0; i + 2 < idx.length; i += 3) {
      const a0 = base + idx[i], a1 = base + idx[i + 1], a2 = base + idx[i + 2];
      if (a0 < vertices.length && a1 < vertices.length && a2 < vertices.length) {
        triangles.push([a0, a1, a2]);
      }
    }
  }
  return { vertices, triangles };
}

function readTarget(path) {
  const raw = zlib.gunzipSync(fs.readFileSync(path)).toString('utf8');
  const entries = [];
  let malformed = 0;
  for (const line of raw.split(/\r?\n/)) {
    const s = line.trim();
    if (!s || s[0] === '#') continue;
    const p = s.split(/\s+/);
    if (p.length < 4) { malformed++; continue; }
    const index = Number(p[0]), dx = Number(p[1]), dy = Number(p[2]), dz = Number(p[3]);
    if (!Number.isInteger(index) || ![dx,dy,dz].every(Number.isFinite)) {
      malformed++;
      continue;
    }
    entries.push({ index, d: [dx, dy, dz] });
  }
  return { entries, malformed };
}

function bbox(points) {
  const mn = [Infinity, Infinity, Infinity], mx = [-Infinity, -Infinity, -Infinity];
  for (const p of points) for (let k = 0; k < 3; k++) {
    mn[k] = Math.min(mn[k], p[k]); mx[k] = Math.max(mx[k], p[k]);
  }
  return { min: mn, max: mx, size: mx.map((x,k)=>x-mn[k]), center: mx.map((x,k)=>(x+mn[k])/2) };
}

function transformPoint(p, hb, gb, scale) {
  return p.map((x,k) => x * scale + gb.center[k] - hb.center[k] * scale);
}

function sq(a,b) {
  const x=a[0]-b[0], y=a[1]-b[1], z=a[2]-b[2];
  return x*x+y*y+z*z;
}

function closestPointTriangle(p,a,b,c) {
  const ab=[b[0]-a[0],b[1]-a[1],b[2]-a[2]];
  const ac=[c[0]-a[0],c[1]-a[1],c[2]-a[2]];
  const ap=[p[0]-a[0],p[1]-a[1],p[2]-a[2]];
  const d1=ab[0]*ap[0]+ab[1]*ap[1]+ab[2]*ap[2];
  const d2=ac[0]*ap[0]+ac[1]*ap[1]+ac[2]*ap[2];
  if(d1<=0&&d2<=0)return {q:a,w:[1,0,0],d2:sq(p,a)};
  const bp=[p[0]-b[0],p[1]-b[1],p[2]-b[2]];
  const d3=ab[0]*bp[0]+ab[1]*bp[1]+ab[2]*bp[2];
  const d4=ac[0]*bp[0]+ac[1]*bp[1]+ac[2]*bp[2];
  if(d3>=0&&d4<=d3)return {q:b,w:[0,1,0],d2:sq(p,b)};
  const vc=d1*d4-d3*d2;
  if(vc<=0&&d1>=0&&d3<=0){const t=d1/(d1-d3);return {q:lerp(a,b,t),w:[1-t,t,0],d2:sq(p,lerp(a,b,t))};}
  const cp=[p[0]-c[0],p[1]-c[1],p[2]-c[2]];
  const d5=ab[0]*cp[0]+ab[1]*cp[1]+ab[2]*cp[2];
  const d6=ac[0]*cp[0]+ac[1]*cp[1]+ac[2]*cp[2];
  if(d6>=0&&d5<=d6)return {q:c,w:[0,0,1],d2:sq(p,c)};
  const vb=d5*d2-d1*d6;
  if(vb<=0&&d2>=0&&d6<=0){const t=d2/(d2-d6);return {q:lerp(a,c,t),w:[1-t,0,t],d2:sq(p,lerp(a,c,t))};}
  const va=d3*d6-d5*d4;
  if(va<=0&&(d4-d3)>=0&&(d5-d6)>=0){const t=(d4-d3)/((d4-d3)+(d5-d6));return {q:lerp(b,c,t),w:[0,1-t,t],d2:sq(p,lerp(b,c,t))};}
  const n=[ab[1]*ac[2]-ab[2]*ac[1],ab[2]*ac[0]-ab[0]*ac[2],ab[0]*ac[1]-ab[1]*ac[0]];
  const nn=n[0]*n[0]+n[1]*n[1]+n[2]*n[2];
  if(nn<1e-18)return {q:a,w:[1,0,0],d2:sq(p,a)};
  const t=(ap[0]*n[0]+ap[1]*n[1]+ap[2]*n[2])/nn;
  const q=[p[0]-n[0]*t,p[1]-n[1]*t,p[2]-n[2]*t];
  const v0=[b[0]-a[0],b[1]-a[1],b[2]-a[2]];
  const v1=[c[0]-a[0],c[1]-a[1],c[2]-a[2]];
  const v2=[q[0]-a[0],q[1]-a[1],q[2]-a[2]];
  const d00=v0[0]*v0[0]+v0[1]*v0[1]+v0[2]*v0[2];
  const d01=v0[0]*v1[0]+v0[1]*v1[1]+v0[2]*v1[2];
  const d11=v1[0]*v1[0]+v1[1]*v1[1]+v1[2]*v1[2];
  const d20=v2[0]*v0[0]+v2[1]*v0[1]+v2[2]*v0[2];
  const d21=v2[0]*v1[0]+v2[1]*v1[1]+v2[2]*v1[2];
  const den=d00*d11-d01*d01;
  const wb=(d11*d20-d01*d21)/den, wc=(d00*d21-d01*d20)/den, wa=1-wb-wc;
  return {q,w:[wa,wb,wc],d2:sq(p,q)};
}
function lerp(a,b,t){return [a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t,a[2]+(b[2]-a[2])*t];}

function buildGrid(vertices, triangles, cell) {
  const map=new Map();
  for(let ti=0;ti<triangles.length;ti++){
    const t=triangles[ti], a=vertices[t[0]],b=vertices[t[1]],c=vertices[t[2]];
    const mn=[Math.min(a[0],b[0],c[0]),Math.min(a[1],b[1],c[1]),Math.min(a[2],b[2],c[2])];
    const mx=[Math.max(a[0],b[0],c[0]),Math.max(a[1],b[1],c[1]),Math.max(a[2],b[2],c[2])];
    const lo=mn.map(x=>Math.floor(x/cell)), hi=mx.map(x=>Math.floor(x/cell));
    for(let x=lo[0];x<=hi[0];x++)for(let y=lo[1];y<=hi[1];y++)for(let z=lo[2];z<=hi[2];z++){
      const k=x+','+y+','+z; let arr=map.get(k); if(!arr)map.set(k,arr=[]); arr.push(ti);
    }
  }
  return map;
}

function nearestSurface(vertices, triangles, grid, p, cell) {
  const cx=Math.floor(p[0]/cell), cy=Math.floor(p[1]/cell), cz=Math.floor(p[2]/cell);
  let best=null;
  for(const r of [1,2,3,5,8]){
    for(let x=-r;x<=r;x++)for(let y=-r;y<=r;y++)for(let z=-r;z<=r;z++){
      const arr=grid.get((cx+x)+','+(cy+y)+','+(cz+z)); if(!arr) continue;
      for(const ti of arr){
        const t=triangles[ti];
        const hit=closestPointTriangle(p,vertices[t[0]],vertices[t[1]],vertices[t[2]]);
        if(!best||hit.d2<best.d2) best={ti,hit};
      }
    }
    if(best) break;
  }
  return best;
}

const [objPath, glbPath, targetPath] = process.argv.slice(2);
if(!objPath||!glbPath||!targetPath) die('Usage: node tests/makehuman_target_surface_transfer_audit.js <base.obj> <human.glb> <target.gz>');
for(const p of [objPath,glbPath,targetPath]) if(!fs.existsSync(p)) die('File not found: '+p);

const hm=readObj(objPath), glb=readGlb(glbPath), target=readTarget(targetPath);
if(!hm.v.length||!hm.f.length) die('hm08 OBJ has no usable geometry');
if(!glb.vertices.length||!glb.triangles.length) die('GLB has no usable POSITION triangles');
if(!target.entries.length) die('Target has no usable entries');

const hb=bbox(hm.v), gb=bbox(glb.vertices);
const scale=Math.hypot(...gb.size)/Math.hypot(...hb.size);
const cell=Math.max(Math.hypot(...gb.size)/70,1e-5);
const grid=buildGrid(glb.vertices,glb.triangles,cell);

const morph=new Map();
const distances=[];
let misses=0, triangleHits=0, outsideBary=0;

for(const e of target.entries){
  if(e.index<0||e.index>=hm.v.length){misses++;continue;}
  const p=transformPoint(hm.v[e.index],hb,gb,scale);
  const hit=nearestSurface(glb.vertices,glb.triangles,grid,p,cell);
  if(!hit){misses++;continue;}
  triangleHits++;
  distances.push(Math.sqrt(hit.hit.d2));
  const t=glb.triangles[hit.ti], w=hit.hit.w;
  if(w.some(x=>x < -0.02 || x > 1.02)) outsideBary++;
  const d=e.d.map(x=>x*scale);
  for(let k=0;k<3;k++){
    const vi=t[k], wk=w[k];
    if(!morph.has(vi)) morph.set(vi,[0,0,0,0]);
    const m=morph.get(vi);
    m[0]+=d[0]*wk; m[1]+=d[1]*wk; m[2]+=d[2]*wk; m[3]+=wk;
  }
}

const out=[];
for(const [vi,m] of morph){
  if(m[3]<=1e-12) continue;
  const d=[m[0]/m[3],m[1]/m[3],m[2]/m[3]];
  const len=Math.hypot(...d);
  out.push({vi,d,len});
}
out.sort((a,b)=>b.len-a.len);
const lengths=out.map(x=>x.len).sort((a,b)=>a-b);
const mean=lengths.reduce((a,b)=>a+b,0)/Math.max(1,lengths.length);
const q=p=>lengths[Math.min(lengths.length-1,Math.floor((lengths.length-1)*p))]||0;
const max=lengths[lengths.length-1]||0;
const nonzeroSource=target.entries.filter(e=>Math.hypot(...e.d)>1e-12).length;
const sourceMax=Math.max(...target.entries.map(e=>Math.hypot(...e.d)));
const sourceMean=target.entries.reduce((s,e)=>s+Math.hypot(...e.d),0)/target.entries.length;

const report={
  targetFile:targetPath.split('/').pop(),
  hm08Vertices:hm.v.length,
  glbVertices:glb.vertices.length,
  glbTriangles:glb.triangles.length,
  targetEntries:target.entries.length,
  nonZeroTargetEntries:nonzeroSource,
  malformedTargetLines:target.malformed,
  scale,
  sourceDisplacementMean:sourceMean,
  sourceDisplacementMax:sourceMax,
  mappedTargetEntries:triangleHits,
  misses,
  barycentricOutsideTolerance:outsideBary,
  touchedGlbVertices:out.length,
  touchedGlbVertexPct:out.length/glb.vertices.length*100,
  mappedDisplacementMean:mean,
  mappedDisplacementMedian:q(.5),
  mappedDisplacementP95:q(.95),
  mappedDisplacementMax:max,
  top10LargestMapped:out.slice(0,10),
  note:'Audit only. No GLB is modified. Barycentric transfer is a first-pass numerical test, not final production morph generation.'
};

console.log('MAKEHUMAN_TARGET_SURFACE_TRANSFER_AUDIT');
console.log(JSON.stringify(report,null,2));
console.log('');
console.log('RESULT:');
console.log('Target entries:',target.entries.length,'non-zero:',nonzeroSource);
console.log('Mapped entries:',triangleHits,'misses:',misses);
console.log('Touched GLB vertices:',out.length,'('+report.touchedGlbVertexPct.toFixed(2)+'%)');
console.log('Mapped displacement mean:',mean);
console.log('Mapped displacement P95:',q(.95));
console.log('Mapped displacement max:',max);
console.log('NEXT_STEP: if transfer statistics are stable, generate a non-production GLB morph fixture and validate the resulting target.');
