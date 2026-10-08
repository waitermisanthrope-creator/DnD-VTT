#!/usr/bin/env node
/**
 * Reverse MakeHuman target -> GLB transfer audit.
 *
 * For every GLB vertex, finds the nearest point on the hm08 surface,
 * interpolates the hm08 target displacement over that source triangle,
 * and reports the resulting GLB morph field.
 *
 * This avoids the earlier "source target entry -> nearest GLB triangle"
 * accumulation, which can collapse many source vertices onto a small set
 * of GLB vertices.
 *
 * Usage:
 * node tests/makehuman_target_reverse_transfer_audit.js <base.obj> <human.glb> <target.gz>
 *
 * Audit only. No production asset is modified.
 */
const fs = require('fs');
const zlib = require('zlib');

function die(msg){ console.error('MAKEHUMAN_TARGET_REVERSE_TRANSFER_AUDIT_ERROR'); console.error(msg); process.exit(1); }

function readObj(path){
  const text=fs.readFileSync(path,'utf8'), v=[], f=[];
  for(const raw of text.split(/\r?\n/)){
    const line=raw.trim(); if(!line||line[0]==='#') continue;
    const p=line.split(/\s+/);
    if(p[0]==='v'&&p.length>=4){
      const q=[+p[1],+p[2],+p[3]]; if(q.every(Number.isFinite)) v.push(q);
    } else if(p[0]==='f'&&p.length>=4){
      const ids=p.slice(1).map(x=>Number(x.split('/')[0]));
      if(!ids.every(Number.isInteger)) continue;
      const a=ids.map(i=>i<0?v.length+i:i-1);
      for(let i=1;i<a.length-1;i++) if(a[0]>=0&&a[i]>=0&&a[i+1]>=0&&a[0]<v.length&&a[i]<v.length&&a[i+1]<v.length) f.push([a[0],a[i],a[i+1]]);
    }
  }
  return {v,f};
}

function readGlb(path){
  const b=fs.readFileSync(path);
  if(b.length<20||b.toString('ascii',0,4)!=='glTF') die('Invalid GLB');
  if(b.readUInt32LE(4)!==2) die('Unsupported GLB version');
  let p=12,json=null,bin=null;
  while(p+8<=b.length){
    const len=b.readUInt32LE(p),type=b.readUInt32LE(p+4),chunk=b.subarray(p+8,p+8+len);
    if(type===0x4e4f534a) json=JSON.parse(chunk.toString('utf8').replace(/\0+$/,'').trim());
    if(type===0x004e4942) bin=chunk;
    p+=8+len;
  }
  if(!json||!bin) die('GLB missing JSON/BIN');
  const views=json.bufferViews||[], acc=json.accessors||[], vertices=[], triangles=[];
  for(const mesh of json.meshes||[]) for(const prim of mesh.primitives||[]){
    const ai=prim.attributes&&prim.attributes.POSITION; if(ai==null) continue;
    const a=acc[ai],v=views[a&&a.bufferView];
    if(!a||!v||a.componentType!==5126||a.type!=='VEC3') continue;
    const stride=v.byteStride||12,start=(v.byteOffset||0)+(a.byteOffset||0),base=vertices.length;
    for(let i=0;i<a.count;i++){const o=start+i*stride;if(o+12>bin.length)die('POSITION exceeds BIN');vertices.push([bin.readFloatLE(o),bin.readFloatLE(o+4),bin.readFloatLE(o+8)]);}
    if(prim.indices==null) continue;
    const ia=acc[prim.indices],iv=views[ia.bufferView],width=({5121:1,5123:2,5125:4})[ia.componentType];
    if(!ia||!iv||ia.type!=='SCALAR'||iv.buffer!==0||!width) die('Unsupported GLB index accessor');
    const startI=(iv.byteOffset||0)+(ia.byteOffset||0);
    const ri=o=>ia.componentType===5121?bin.readUInt8(o):ia.componentType===5123?bin.readUInt16LE(o):bin.readUInt32LE(o);
    const idx=[];for(let i=0;i<ia.count;i++)idx.push(ri(startI+i*width));
    for(let i=0;i+2<idx.length;i+=3){const x=base+idx[i],y=base+idx[i+1],z=base+idx[i+2];if(x<vertices.length&&y<vertices.length&&z<vertices.length)triangles.push([x,y,z]);}
  }
  return {vertices,triangles};
}

function readTarget(path,count){
  const raw=zlib.gunzipSync(fs.readFileSync(path)).toString('utf8');
  const d=Array.from({length:count},()=>[0,0,0]), entries=[]; let malformed=0;
  for(const line of raw.split(/\r?\n/)){
    const s=line.trim();if(!s||s[0]==='#'||s[0]==='"')continue;
    const p=s.split(/\s+/);if(p.length<4){malformed++;continue;}
    const i=Number(p[0]),x=Number(p[1]),zFile=Number(p[2]),yFile=Number(p[3]);
    if(!Number.isInteger(i)||i<0||i>=count||![x,zFile,yFile].every(Number.isFinite)){malformed++;continue;}
    // MakeHuman target order is X Z Y and stored Y is sign-inverted.
    d[i]=[x,-yFile,zFile];
    entries.push(i);
  }
  return {d,entries,malformed};
}

function bbox(points){
  const mn=[Infinity,Infinity,Infinity],mx=[-Infinity,-Infinity,-Infinity];
  for(const p of points)for(let k=0;k<3;k++){mn[k]=Math.min(mn[k],p[k]);mx[k]=Math.max(mx[k],p[k]);}
  return {min:mn,max:mx,size:mx.map((x,k)=>x-mn[k]),center:mx.map((x,k)=>(x+mn[k])/2)};
}
function sq(a,b){const x=a[0]-b[0],y=a[1]-b[1],z=a[2]-b[2];return x*x+y*y+z*z;}
function lerp(a,b,t){return[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t,a[2]+(b[2]-a[2])*t];}

function closestTriangle(p,a,b,c){
  const ab=[b[0]-a[0],b[1]-a[1],b[2]-a[2]],ac=[c[0]-a[0],c[1]-a[1],c[2]-a[2]],ap=[p[0]-a[0],p[1]-a[1],p[2]-a[2]];
  const d1=ab[0]*ap[0]+ab[1]*ap[1]+ab[2]*ap[2],d2=ac[0]*ap[0]+ac[1]*ap[1]+ac[2]*ap[2];
  if(d1<=0&&d2<=0)return {w:[1,0,0],d2:sq(p,a)};
  const bp=[p[0]-b[0],p[1]-b[1],p[2]-b[2]],d3=ab[0]*bp[0]+ab[1]*bp[1]+ab[2]*bp[2],d4=ac[0]*bp[0]+ac[1]*bp[1]+ac[2]*bp[2];
  if(d3>=0&&d4<=d3)return {w:[0,1,0],d2:sq(p,b)};
  const vc=d1*d4-d3*d2;
  if(vc<=0&&d1>=0&&d3<=0){const t=d1/(d1-d3);return {w:[1-t,t,0],d2:sq(p,lerp(a,b,t))};}
  const cp=[p[0]-c[0],p[1]-c[1],p[2]-c[2]],d5=ab[0]*cp[0]+ab[1]*cp[1]+ab[2]*cp[2],d6=ac[0]*cp[0]+ac[1]*cp[1]+ac[2]*cp[2];
  if(d6>=0&&d5<=d6)return {w:[0,0,1],d2:sq(p,c)};
  const vb=d5*d2-d1*d6;
  if(vb<=0&&d2>=0&&d6<=0){const t=d2/(d2-d6);return {w:[1-t,0,t],d2:sq(p,lerp(a,c,t))};}
  const va=d3*d6-d5*d4;
  if(va<=0&&(d4-d3)>=0&&(d5-d6)>=0){const t=(d4-d3)/((d4-d3)+(d5-d6));return {w:[0,1-t,t],d2:sq(p,lerp(b,c,t))};}
  const n=[ab[1]*ac[2]-ab[2]*ac[1],ab[2]*ac[0]-ab[0]*ac[2],ab[0]*ac[1]-ab[1]*ac[0]],nn=n[0]*n[0]+n[1]*n[1]+n[2]*n[2];
  if(nn<1e-18)return {w:[1,0,0],d2:sq(p,a)};
  const t=(ap[0]*n[0]+ap[1]*n[1]+ap[2]*n[2])/nn,q=[p[0]-n[0]*t,p[1]-n[1]*t,p[2]-n[2]*t];
  const v0=[b[0]-a[0],b[1]-a[1],b[2]-a[2]],v1=[c[0]-a[0],c[1]-a[1],c[2]-a[2]],v2=[q[0]-a[0],q[1]-a[1],q[2]-a[2]];
  const d00=sq(v0,[0,0,0]),d01=v0[0]*v1[0]+v0[1]*v1[1]+v0[2]*v1[2],d11=sq(v1,[0,0,0]),d20=v2[0]*v0[0]+v2[1]*v0[1]+v2[2]*v0[2],d21=v2[0]*v1[0]+v2[1]*v1[1]+v2[2]*v1[2],den=d00*d11-d01*d01;
  if(Math.abs(den)<1e-18)return {w:[1,0,0],d2:sq(p,a)};
  const wb=(d11*d20-d01*d21)/den,wc=(d00*d21-d01*d20)/den;
  return {w:[1-wb-wc,wb,wc],d2:sq(p,q)};
}

function buildGrid(vertices,triangles,cell){
  const map=new Map();
  for(let ti=0;ti<triangles.length;ti++){
    const t=triangles[ti],a=vertices[t[0]],b=vertices[t[1]],c=vertices[t[2]];
    const mn=[Math.min(a[0],b[0],c[0]),Math.min(a[1],b[1],c[1]),Math.min(a[2],b[2],c[2])],mx=[Math.max(a[0],b[0],c[0]),Math.max(a[1],b[1],c[1]),Math.max(a[2],b[2],c[2])];
    const lo=mn.map(x=>Math.floor(x/cell)),hi=mx.map(x=>Math.floor(x/cell));
    for(let x=lo[0];x<=hi[0];x++)for(let y=lo[1];y<=hi[1];y++)for(let z=lo[2];z<=hi[2];z++){const k=x+','+y+','+z;let a=map.get(k);if(!a)map.set(k,a=[]);a.push(ti);}
  }
  return map;
}
function nearest(vertices,triangles,grid,p,cell){
  const cx=Math.floor(p[0]/cell),cy=Math.floor(p[1]/cell),cz=Math.floor(p[2]/cell);let best=null;
  for(const r of [1,2,3,5,8,12]){
    for(let x=-r;x<=r;x++)for(let y=-r;y<=r;y++)for(let z=-r;z<=r;z++){
      const arr=grid.get((cx+x)+','+(cy+y)+','+(cz+z));if(!arr)continue;
      for(const ti of arr){const t=triangles[ti],h=closestTriangle(p,vertices[t[0]],vertices[t[1]],vertices[t[2]]);if(!best||h.d2<best.d2)best={ti,h};}
    }
    if(best)break;
  }
  return best;
}

const [objPath,glbPath,targetPath]=process.argv.slice(2);
if(!objPath||!glbPath||!targetPath)die('Usage: node tests/makehuman_target_reverse_transfer_audit.js <base.obj> <human.glb> <target.gz>');
for(const p of [objPath,glbPath,targetPath])if(!fs.existsSync(p))die('File not found: '+p);

const hm=readObj(objPath),glb=readGlb(glbPath),target=readTarget(targetPath,hm.v.length);
if(!hm.v.length||!hm.f.length||!glb.vertices.length||!glb.triangles.length)die('Missing usable geometry');
const hb=bbox(hm.v),gb=bbox(glb.vertices),scale=Math.hypot(...gb.size)/Math.hypot(...hb.size);
const cell=Math.max(Math.hypot(...hb.size)/70,1e-5);
const grid=buildGrid(hm.v,hm.f,cell);
const morph=[],dist=[],fieldLengths=[];let misses=0,nonZero=0;
for(let vi=0;vi<glb.vertices.length;vi++){
  const gp=glb.vertices[vi];
  const hp=gp.map((x,k)=>(x-gb.center[k])/scale+hb.center[k]);
  const hit=nearest(hm.v,hm.f,grid,hp,cell);
  if(!hit){misses++;morph.push([0,0,0]);continue;}
  dist.push(Math.sqrt(hit.h.d2));
  const t=hm.f[hit.ti],w=hit.h.w;
  const a=target.d[t[0]],b=target.d[t[1]],c=target.d[t[2]];
  const d=[(a[0]*w[0]+b[0]*w[1]+c[0]*w[2])*scale,(a[1]*w[0]+b[1]*w[1]+c[1]*w[2])*scale,(a[2]*w[0]+b[2]*w[1]+c[2]*w[2])*scale];
  morph.push(d);
  const len=Math.hypot(...d);fieldLengths.push(len);if(len>1e-7)nonZero++;
}
dist.sort((a,b)=>a-b);fieldLengths.sort((a,b)=>a-b);
const q=(arr,p)=>arr.length?arr[Math.min(arr.length-1,Math.floor((arr.length-1)*p))]:0;
const mean=a=>a.reduce((s,x)=>s+x,0)/Math.max(1,a.length);
let sumSq=0;for(const d of morph)sumSq+=d[0]*d[0]+d[1]*d[1]+d[2]*d[2];
const report={
  targetFile:targetPath.split('/').pop(),
  hm08Vertices:hm.v.length,hm08Triangles:hm.f.length,
  glbVertices:glb.vertices.length,glbTriangles:glb.triangles.length,
  targetEntries:target.entries.length,malformedTargetLines:target.malformed,
  scale,sourceNonZeroEntries:target.entries.filter(i=>Math.hypot(...target.d[i])>1e-7).length,
  sourceMeanDisplacement:mean(target.entries.map(i=>Math.hypot(...target.d[i]))),
  sourceMaxDisplacement:Math.max(...target.entries.map(i=>Math.hypot(...target.d[i]))),
  reverseMappedGlbVertices:glb.vertices.length-misses,misses,
  surfaceMeanDistance:mean(dist),surfaceMedianDistance:q(dist,.5),surfaceP95Distance:q(dist,.95),surfaceMaxDistance:q(dist,.999),
  nonZeroMappedGlbVertices:nonZero,nonZeroMappedGlbVertexPct:nonZero/glb.vertices.length*100,
  mappedMeanDisplacement:mean(fieldLengths),mappedMedianDisplacement:q(fieldLengths,.5),
  mappedP95Displacement:q(fieldLengths,.95),mappedMaxDisplacement:q(fieldLengths,.999),
  mappedRmsDisplacement:Math.sqrt(sumSq/glb.vertices.length),
  note:'Reverse surface interpolation audit. Target coordinates are decoded as X, -storedY, storedZ. No GLB is modified.'
};
console.log('MAKEHUMAN_TARGET_REVERSE_TRANSFER_AUDIT');
console.log(JSON.stringify(report,null,2));
console.log('');
console.log('RESULT:');
console.log('GLB vertices mapped:',report.reverseMappedGlbVertices+'/'+glb.vertices.length,'misses:',misses);
console.log('Surface mean distance:',report.surfaceMeanDistance);
console.log('Non-zero mapped GLB vertices:',nonZero,'('+report.nonZeroMappedGlbVertexPct.toFixed(2)+'%)');
console.log('Mapped displacement mean:',report.mappedMeanDisplacement);
console.log('Mapped displacement P95:',report.mappedP95Displacement);
console.log('Mapped displacement max:',report.mappedMaxDisplacement);
console.log('Mapped displacement RMS:',report.mappedRmsDisplacement);
console.log('NEXT_STEP: if coverage and displacement field are plausible, generate a test morph fixture and validate the GLB morph accessor/runtime path.');
