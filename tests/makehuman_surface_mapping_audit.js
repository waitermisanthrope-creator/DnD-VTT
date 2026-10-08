#!/usr/bin/env node
/**
 * MakeHuman hm08 -> human GLB SURFACE mapping audit.
 *
 * Usage:
 *   node tests/makehuman_surface_mapping_audit.js <base.obj> <human.glb>
 *
 * Unlike the old vertex-nearest audit, this compares hm08 vertices against
 * the actual GLB triangle surface. It does not modify either asset.
 */
const fs = require('fs');

function die(msg) {
  console.error('MAKEHUMAN_SURFACE_MAPPING_AUDIT_ERROR');
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
          if (a[0] >= 0 && a[i] >= 0 && a[i+1] >= 0 &&
              a[0] < v.length && a[i] < v.length && a[i+1] < v.length)
            f.push([a[0], a[i], a[i+1]]);
        }
      }
    }
  }
  return {v, f};
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
  const vertices=[], triangles=[];
  for (const mesh of json.meshes||[]) for (const prim of mesh.primitives||[]) {
    const ai=prim.attributes && prim.attributes.POSITION;
    if (ai==null) continue;
    const a=accessors[ai], view=views[a && a.bufferView];
    if (!a || !view || a.componentType!==5126 || a.type!=='VEC3') continue;
    if (view.buffer !== 0) die('Unsupported POSITION buffer index');
    const stride=view.byteStride||12;
    const start=(view.byteOffset||0)+(a.byteOffset||0);
    const base=vertices.length;
    for(let i=0;i<a.count;i++){
      const o=start+i*stride;
      if(o+12>bin.length) die('POSITION accessor exceeds BIN');
      vertices.push([bin.readFloatLE(o),bin.readFloatLE(o+4),bin.readFloatLE(o+8)]);
    }
    const ii=prim.indices;
    if(ii==null) continue;
    const ia=accessors[ii], iv=views[ia.bufferView];
    if(!ia || !iv || ia.type!=='SCALAR' || iv.buffer!==0) die('Unsupported index accessor');
    const comps={5121:1,5123:2,5125:4};
    const width=comps[ia.componentType];
    if(!width) die('Unsupported index component type');
    const is= (iv.byteOffset||0)+(ia.byteOffset||0);
    const readIndex=(o)=>{
      if(ia.componentType===5121) return bin.readUInt8(o);
      if(ia.componentType===5123) return bin.readUInt16LE(o);
      return bin.readUInt32LE(o);
    };
    const idx=[];
    for(let i=0;i<ia.count;i++) idx.push(readIndex(is+i*width));
    for(let i=0;i+2<idx.length;i+=3){
      const a0=base+idx[i], a1=base+idx[i+1], a2=base+idx[i+2];
      if(a0<vertices.length&&a1<vertices.length&&a2<vertices.length)
        triangles.push([a0,a1,a2]);
    }
  }
  return {vertices,triangles};
}

function bbox(points){
  const mn=[Infinity,Infinity,Infinity],mx=[-Infinity,-Infinity,-Infinity];
  for(const p of points)for(let k=0;k<3;k++){mn[k]=Math.min(mn[k],p[k]);mx[k]=Math.max(mx[k],p[k]);}
  return {min:mn,max:mx,size:mx.map((x,k)=>x-mn[k]),center:mx.map((x,k)=>(x+mn[k])/2)};
}

function transform(p,hb,gb){
  const hs=Math.hypot(...hb.size), gs=Math.hypot(...gb.size), s=gs/hs;
  return p.map((x,k)=>x*s+gb.center[k]-hb.center[k]*s);
}

function pointTriDist2(p,a,b,c){
  const ab=[b[0]-a[0],b[1]-a[1],b[2]-a[2]];
  const ac=[c[0]-a[0],c[1]-a[1],c[2]-a[2]];
  const ap=[p[0]-a[0],p[1]-a[1],p[2]-a[2]];
  const d1=ab[0]*ap[0]+ab[1]*ap[1]+ab[2]*ap[2];
  const d2=ac[0]*ap[0]+ac[1]*ap[1]+ac[2]*ap[2];
  if(d1<=0&&d2<=0)return sq(p,a);
  const bp=[p[0]-b[0],p[1]-b[1],p[2]-b[2]];
  const d3=ab[0]*bp[0]+ab[1]*bp[1]+ab[2]*bp[2];
  const d4=ac[0]*bp[0]+ac[1]*bp[1]+ac[2]*bp[2];
  if(d3>=0&&d4<=d3)return sq(p,b);
  const vc=d1*d4-d3*d2;
  if(vc<=0&&d1>=0&&d3<=0){const t=d1/(d1-d3);return sq(p,lerp(a,b,t));}
  const cp=[p[0]-c[0],p[1]-c[1],p[2]-c[2]];
  const d5=ab[0]*cp[0]+ab[1]*cp[1]+ab[2]*cp[2];
  const d6=ac[0]*cp[0]+ac[1]*cp[1]+ac[2]*cp[2];
  if(d6>=0&&d5<=d6)return sq(p,c);
  const vb=d5*d2-d1*d6;
  if(vb<=0&&d2>=0&&d6<=0){const t=d2/(d2-d6);return sq(p,lerp(a,c,t));}
  const va=d3*d6-d5*d4;
  if(va<=0&&(d4-d3)>=0&&(d5-d6)>=0){const t=(d4-d3)/((d4-d3)+(d5-d6));return sq(p,lerp(b,c,t));}
  const n=[ab[1]*ac[2]-ab[2]*ac[1],ab[2]*ac[0]-ab[0]*ac[2],ab[0]*ac[1]-ab[1]*ac[0]];
  const nn=n[0]*n[0]+n[1]*n[1]+n[2]*n[2];
  if(nn<1e-18)return Math.min(sq(p,a),sq(p,b),sq(p,c));
  const d=(ap[0]*n[0]+ap[1]*n[1]+ap[2]*n[2]);
  return d*d/nn;
}
function sq(a,b){const x=a[0]-b[0],y=a[1]-b[1],z=a[2]-b[2];return x*x+y*y+z*z;}
function lerp(a,b,t){return[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t,a[2]+(b[2]-a[2])*t];}

function buildGrid(vertices,triangles,cell){
  const map=new Map(), key=(x,y,z)=>Math.floor(x/cell)+','+Math.floor(y/cell)+','+Math.floor(z/cell);
  for(let ti=0;ti<triangles.length;ti++){
    const t=triangles[ti], a=vertices[t[0]],b=vertices[t[1]],c=vertices[t[2]];
    const mn=[Math.min(a[0],b[0],c[0]),Math.min(a[1],b[1],c[1]),Math.min(a[2],b[2],c[2])];
    const mx=[Math.max(a[0],b[0],c[0]),Math.max(a[1],b[1],c[1]),Math.max(a[2],b[2],c[2])];
    const lo=mn.map(x=>Math.floor(x/cell)), hi=mx.map(x=>Math.floor(x/cell));
    for(let x=lo[0];x<=hi[0];x++)for(let y=lo[1];y<=hi[1];y++)for(let z=lo[2];z<=hi[2];z++){
      const k=x+','+y+','+z; let arr=map.get(k); if(!arr)map.set(k,arr=[]); arr.push(ti);
    }
  }
  return {map,key};
}

function nearestSurface(vertices,triangles,grid,p,cell){
  const cx=Math.floor(p[0]/cell),cy=Math.floor(p[1]/cell),cz=Math.floor(p[2]/cell);
  let best=Infinity,bestTri=-1;
  for(const r of [1,2,3,5]){
    for(let x=-r;x<=r;x++)for(let y=-r;y<=r;y++)for(let z=-r;z<=r;z++){
      const arr=grid.map.get((cx+x)+','+(cy+y)+','+(cz+z)); if(!arr)continue;
      for(const ti of arr){
        const t=triangles[ti], d=pointTriDist2(p,vertices[t[0]],vertices[t[1]],vertices[t[2]]);
        if(d<best){best=d;bestTri=ti;}
      }
    }
    if(bestTri>=0) break;
  }
  return [bestTri,Math.sqrt(best)];
}

const [objPath,glbPath]=process.argv.slice(2);
if(!objPath||!glbPath)die('Usage: node tests/makehuman_surface_mapping_audit.js <base.obj> <human.glb>');
if(!fs.existsSync(objPath)||!fs.existsSync(glbPath))die('File not found');

const hm=readObj(objPath), glb=readGlb(glbPath);
if(!hm.v.length||!hm.f.length)die('hm08 OBJ has no usable vertices/faces');
if(!glb.vertices.length||!glb.triangles.length)die('GLB has no usable POSITION triangles');

const hb=bbox(hm.v),gb=bbox(glb.vertices);
const transformed=hm.v.map(p=>transform(p,hb,gb));
const gdiag=Math.hypot(...gb.size);
const cell=Math.max(gdiag/70,1e-5);
const grid=buildGrid(glb.vertices,glb.triangles,cell);

const distances=[];
let misses=0;
for(const p of transformed){
  const [,d]=nearestSurface(glb.vertices,glb.triangles,grid,p,cell);
  if(!Number.isFinite(d)){misses++;continue;}
  distances.push(d);
}
distances.sort((a,b)=>a-b);
const pct=q=>distances[Math.min(distances.length-1,Math.floor((distances.length-1)*q))];
const mean=distances.reduce((a,b)=>a+b,0)/Math.max(1,distances.length);
const thresholds=[cell,cell*2,cell*5,cell*10];
const report={
  hm08Vertices:hm.v.length,
  hm08Triangles:hm.f.length,
  glbVertices:glb.vertices.length,
  glbTriangles:glb.triangles.length,
  scale:gdiag/Math.hypot(...hb.size),
  cellSize:cell,
  hm08BBox:hb,
  glbBBox:gb,
  surfaceMeanDistance:mean,
  surfaceMedianDistance:pct(.5),
  surfaceP95Distance:pct(.95),
  surfaceMaxDistance:distances.length?distances[distances.length-1]:null,
  withinCellPct:distances.filter(x=>x<=thresholds[0]).length/distances.length*100,
  within2CellsPct:distances.filter(x=>x<=thresholds[1]).length/distances.length*100,
  within5CellsPct:distances.filter(x=>x<=thresholds[2]).length/distances.length*100,
  within10CellsPct:distances.filter(x=>x<=thresholds[3]).length/distances.length*100,
  misses,
  note:'This is a surface-proximity audit, not proof of vertex correspondence. A successful result permits testing target displacement transfer.'
};
console.log('MAKEHUMAN_SURFACE_MAPPING_AUDIT');
console.log(JSON.stringify(report,null,2));
console.log('');
console.log('RESULT:');
console.log('hm08 triangles:',hm.f.length);
console.log('GLB triangles:',glb.triangles.length);
console.log('Surface mean distance:',mean);
console.log('Surface median distance:',pct(.5));
console.log('Surface P95 distance:',pct(.95));
console.log('Within 2 cells:',report.within2CellsPct.toFixed(2)+'%');
console.log('Within 5 cells:',report.within5CellsPct.toFixed(2)+'%');
console.log('NEXT_STEP: if surface proximity is strong, transfer one hm08 target to a GLB morph and validate deformation.');
