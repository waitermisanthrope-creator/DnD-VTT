#!/usr/bin/env node
const fs=require('fs');
function die(s){console.error('MAKEHUMAN_GLB_MORPH_FIXTURE_AUDIT_ERROR');console.error(s);process.exit(1);}
const file=process.argv[2]||'human-base-rigged-morph-test.glb';if(!fs.existsSync(file))die('Missing '+file);
const b=fs.readFileSync(file);if(b.toString('ascii',0,4)!=='glTF'||b.readUInt32LE(4)!==2)die('Invalid GLB');
let p=12,g=null,bin=null;while(p+8<=b.length){const n=b.readUInt32LE(p),t=b.readUInt32LE(p+4),s=p+8,c=b.subarray(s,s+n);if(t===0x4e4f534a)g=JSON.parse(c.toString('utf8').replace(/\0+$/,'').trim());if(t===0x004e4942)bin=c;p=s+n;}
if(!g||!bin)die('Missing JSON/BIN');
const acc=g.accessors||[],views=g.bufferViews||[];let morphPrimitives=0,maxTargets=0,names=[];
for(const m of g.meshes||[])for(const prim of m.primitives||[]){if(prim.targets&&prim.targets.length){morphPrimitives++;maxTargets=Math.max(maxTargets,prim.targets.length);const tn=m.extras&&m.extras.targetNames;if(Array.isArray(tn))names.push(...tn);for(const t of prim.targets){if(t.POSITION==null)die('Morph target has no POSITION accessor');const a=acc[t.POSITION],v=a&&views[a.bufferView];if(!a||!v||a.componentType!==5126||a.type!=='VEC3'||!Array.isArray(a.min)||!Array.isArray(a.max))die('Invalid morph POSITION accessor');if((v.byteOffset||0)+(a.byteOffset||0)+a.count*12>bin.length)die('Morph accessor exceeds BIN');}}}
if(!morphPrimitives)die('No morph primitives');
console.log('MAKEHUMAN_GLB_MORPH_FIXTURE_AUDIT');
console.log(JSON.stringify({file,sizeBytes:b.length,nodes:(g.nodes||[]).length,meshes:(g.meshes||[]).length,skins:(g.skins||[]).length,morphPrimitives,maxTargets,morphNames:names},null,2));
console.log('RESULT: MORPH ACCESSOR STRUCTURE VALID');
