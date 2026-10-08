#!/usr/bin/env node
/**
 * MakeHuman -> GLB Morph Bridge.
 *
 * Shared implementation for audits and morph generation.
 * No production GLB is modified by this module itself.
 */
const fs=require('fs');
const zlib=require('zlib');

function readObj(path){
  const text=fs.readFileSync(path,'utf8'),v=[],f=[];
  for(const raw of text.split(/\r?\n/)){
    const line=raw.trim(); if(!line||line[0]==='#')continue;
    const p=line.split(/\s+/);
    if(p[0]==='v'&&p.length>=4){const q=[+p[1],+p[2],+p[3]];if(q.every(Number.isFinite))v.push(q);}
    else if(p[0]==='f'&&p.length>=4){
      const ids=p.slice(1).map(x=>Number(x.split('/')[0]));if(!ids.every(Number.isInteger))continue;
      const a=ids.map(i=>i<0?v.length+i:i-1);
      for(let i=1;i<a.length-1;i++)if(a[0]>=0&&a[i]>=0&&a[i+1]>=0&&a[0]<v.length&&a[i]<v.length&&a[i+1]<v.length)f.push([a[0],a[i],a[i+1]]);
    }
  } return {v,f};
}
function readTarget(path,count){
  const raw=zlib.gunzipSync(fs.readFileSync(path)).toString('utf8'),d=Array.from({length:count},()=>[0,0,0]),entries=[];let malformed=0;
  for(const line of raw.split(/\r?\n/)){const s=line.trim();if(!s||s[0]==='#'||s[0]==='"')continue;const p=s.split(/\s+/);if(p.length<4){malformed++;continue;}
    const i=Number(p[0]),x=Number(p[1]),z=Number(p[2]),yf=Number(p[3]);if(!Number.isInteger(i)||i<0||i>=count||![x,z,yf].every(Number.isFinite)){malformed++;continue;}
    d[i]=[x,-yf,z];entries.push(i);
  } return {d,entries,malformed};
}
function readGlb(path){
  const b=fs.readFileSync(path);if(b.length<20||b.toString('ascii',0,4)!=='glTF'||b.readUInt32LE(4)!==2)throw Error('Invalid/unsupported GLB');
  let p=12,json=null,bin=null;while(p+8<=b.length){const len=b.readUInt32LE(p),type=b.readUInt32LE(p+4),c=b.subarray(p+8,p+8+len);if(type===0x4e4f534a)json=JSON.parse(c.toString('utf8').replace(/\0+$/,'').trim());if(type===0x004e4942)bin=c;p+=8+len;}
  if(!json||!bin)throw Error('GLB missing JSON/BIN');return {bytes:b,json,bin};
}
function bbox(points){const mn=[Infinity,Infinity,Infinity],mx=[-Infinity,-Infinity,-Infinity];for(const p of points)for(let k=0;k<3;k++){mn[k]=Math.min(mn[k],p[k]);mx[k]=Math.max(mx[k],p[k]);}return{min:mn,max:mx,size:mx.map((x,k)=>x-mn[k]),center:mx.map((x,k)=>(x+mn[k])/2)};}
function sq(a,b){let s=0;for(let k=0;k<3;k++)s+=(a[k]-b[k])**2;return s;}
function closestTriangle(p,a,b,c){
  const ab=b.map((v,i)=>v-a[i]),ac=c.map((v,i)=>v-a[i]),ap=p.map((v,i)=>v-a[i]);
  const d1=ab[0]*ap[0]+ab[1]*ap[1]+ab[2]*ap[2],d2=ac[0]*ap[0]+ac[1]*ap[1]+ac[2]*ap[2];
  if(d1<=0&&d2<=0)return{w:[1,0,0],d2:sq(p,a)};const bp=p.map((v,i)=>v-b[i]),d3=ab[0]*bp[0]+ab[1]*bp[1]+ab[2]*bp[2],d4=ac[0]*bp[0]+ac[1]*bp[1]+ac[2]*bp[2];
  if(d3>=0&&d4<=d3)return{w:[0,1,0],d2:sq(p,b)};const vc=d1*d4-d3*d2;if(vc<=0&&d1>=0&&d3<=0){const t=d1/(d1-d3);return{w:[1-t,t,0],d2:sq(p,[a[0]+ab[0]*t,a[1]+ab[1]*t,a[2]+ab[2]*t])};}
  const cp=p.map((v,i)=>v-c[i]),d5=ab[0]*cp[0]+ab[1]*cp[1]+ab[2]*cp[2],d6=ac[0]*cp[0]+ac[1]*cp[1]+ac[2]*cp[2];if(d6>=0&&d5<=d6)return{w:[0,0,1],d2:sq(p,c)};
  const vb=d5*d2-d1*d6;if(vb<=0&&d2>=0&&d6<=0){const t=d2/(d2-d6);return{w:[1-t,0,t],d2:sq(p,[a[0]+ac[0]*t,a[1]+ac[1]*t,a[2]+ac[2]*t])};}
  const va=d3*d6-d5*d4;if(va<=0&&(d4-d3)>=0&&(d5-d6)>=0){const t=(d4-d3)/((d4-d3)+(d5-d6));return{w:[0,1-t,t],d2:sq(p,[b[0]+(c[0]-b[0])*t,b[1]+(c[1]-b[1])*t,b[2]+(c[2]-b[2])*t])};}
  const n=[ab[1]*ac[2]-ab[2]*ac[1],ab[2]*ac[0]-ab[0]*ac[2],ab[0]*ac[1]-ab[1]*ac[0]],nn=n[0]**2+n[1]**2+n[2]**2;if(nn<1e-18)return{w:[1,0,0],d2:sq(p,a)};
  const t=(ap[0]*n[0]+ap[1]*n[1]+ap[2]*n[2])/nn,q=[p[0]-n[0]*t,p[1]-n[1]*t,p[2]-n[2]*t],v0=ab,v1=ac,v2=q.map((v,i)=>v-a[i]),d00=sq(v0,[0,0,0]),d01=v0[0]*v1[0]+v0[1]*v1[1]+v0[2]*v1[2],d11=sq(v1,[0,0,0]),d20=v2[0]*v0[0]+v2[1]*v0[1]+v2[2]*v0[2],d21=v2[0]*v1[0]+v2[1]*v1[1]+v2[2]*v1[2],den=d00*d11-d01*d01;if(Math.abs(den)<1e-18)return{w:[1,0,0],d2:sq(p,a)};
  const wb=(d11*d20-d01*d21)/den,wc=(d00*d21-d01*d20)/den;return{w:[1-wb-wc,wb,wc],d2:sq(p,q)};
}
function buildGrid(v,f,cell){const m=new Map();for(let ti=0;ti<f.length;ti++){const t=f[ti],a=v[t[0]],b=v[t[1]],c=v[t[2]],mn=[0,1,2].map(k=>Math.min(a[k],b[k],c[k])),mx=[0,1,2].map(k=>Math.max(a[k],b[k],c[k])),lo=mn.map(x=>Math.floor(x/cell)),hi=mx.map(x=>Math.floor(x/cell));for(let x=lo[0];x<=hi[0];x++)for(let y=lo[1];y<=hi[1];y++)for(let z=lo[2];z<=hi[2];z++){const k=x+','+y+','+z,a=m.get(k);if(a)a.push(ti);else m.set(k,[ti]);}}return m;}
function nearest(v,f,g,p,cell){const c=p.map(x=>Math.floor(x/cell));let best=null;for(const r of [1,2,3,5,8,12]){for(let x=-r;x<=r;x++)for(let y=-r;y<=r;y++)for(let z=-r;z<=r;z++){const a=g.get((c[0]+x)+','+(c[1]+y)+','+(c[2]+z));if(!a)continue;for(const ti of a){const t=f[ti],h=closestTriangle(p,v[t[0]],v[t[1]],v[t[2]]);if(!best||h.d2<best.d2)best={ti,h};}}if(best)break;}return best;}
function readGlbGeometry(glb){const g=glb.json,buffers=[glb.bin],accessors=g.accessors||[],views=g.bufferViews||[],vertices=[],triangles=[];function getAcc(i){const a=accessors[i],v=views[a.bufferView],K={5126:Float32Array,5121:Uint8Array,5123:Uint16Array,5125:Uint32Array}[a.componentType],n=a.type==='VEC3'?3:1,raw=buffers[v.buffer||0],off=(v.byteOffset||0)+(a.byteOffset||0),stride=v.byteStride||K.BYTES_PER_ELEMENT*n,out=new K(a.count*n);for(let q=0;q<a.count;q++)for(let j=0;j<n;j++)out[q*n+j]=new K(raw,off+q*stride+j*K.BYTES_PER_ELEMENT,1)[0];return out;}
  for(const m of g.meshes||[])for(const p of m.primitives||[]){const ai=p.attributes&&p.attributes.POSITION;if(ai==null)continue;const pos=getAcc(ai),base=vertices.length;for(let i=0;i<pos.length;i+=3)vertices.push([pos[i],pos[i+1],pos[i+2]]);if(p.indices!=null){const idx=getAcc(p.indices);for(let i=0;i+2<idx.length;i+=3)triangles.push([base+idx[i],base+idx[i+1],base+idx[i+2]]);}}
  return{vertices,triangles};
}
function transfer(objPath,glbPath,targetPath){const hm=readObj(objPath),glb=readGlb(glbPath),geo=readGlbGeometry(glb),target=readTarget(targetPath,hm.v.length);if(!hm.v.length||!hm.f.length||!geo.vertices.length)throw Error('Missing geometry');const hb=bbox(hm.v),gb=bbox(geo.vertices),scale=Math.hypot(...gb.size)/Math.hypot(...hb.size),cell=Math.max(Math.hypot(...hb.size)/70,1e-5),grid=buildGrid(hm.v,hm.f,cell),morph=new Float32Array(geo.vertices.length*3);let misses=0,nonZero=0;const distances=[];
  for(let vi=0;vi<geo.vertices.length;vi++){const gp=geo.vertices[vi],hp=gp.map((x,k)=>(x-gb.center[k])/scale+hb.center[k]),hit=nearest(hm.v,hm.f,grid,hp,cell);if(!hit){misses++;continue;}distances.push(Math.sqrt(hit.h.d2));const t=hm.f[hit.ti],w=hit.h.w,a=target.d[t[0]],b=target.d[t[1]],c=target.d[t[2]],o=vi*3;for(let k=0;k<3;k++)morph[o+k]=(a[k]*w[0]+b[k]*w[1]+c[k]*w[2])*scale;if(Math.hypot(morph[o],morph[o+1],morph[o+2])>1e-7)nonZero++;}
  distances.sort((a,b)=>a-b);const mean=distances.reduce((s,x)=>s+x,0)/Math.max(1,distances.length);return{glb,target,geo,morph,scale,misses,nonZero,surfaceMeanDistance:mean,surfaceMedianDistance:distances[Math.floor(distances.length*.5)]||0,surfaceP95Distance:distances[Math.floor(distances.length*.95)]||0};
}
module.exports={readObj,readTarget,readGlb,readGlbGeometry,transfer};
