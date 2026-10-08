/* Structural audit of the real human-base-rigged.glb. No external npm packages. */
const fs=require('fs'),assert=require('assert');
const file='human-base-rigged.glb'; assert(fs.existsSync(file),'Missing '+file);
const b=fs.readFileSync(file); assert(b.length>=20,'GLB too small'); assert(b.toString('ascii',0,4)==='glTF','Not a GLB file');
const version=b.readUInt32LE(4),total=b.readUInt32LE(8); assert(version===2,'Expected glTF 2.x');
let off=12,json=null,binBytes=0;
while(off+8<=b.length){const len=b.readUInt32LE(off),type=b.readUInt32LE(off+4),start=off+8,end=start+len;assert(end<=b.length,'GLB chunk exceeds file');if(type===0x4E4F534A)json=JSON.parse(b.toString('utf8',start,end).replace(/\u0000/g,'').trim());if(type===0x004E4942)binBytes=len;off=end;}
assert(json,'Missing JSON chunk');
const nodes=json.nodes||[],meshes=json.meshes||[],skins=json.skins||[],acc=json.accessors||[];
const joints=skins.reduce((n,s)=>n+(s.joints||[]).length,0);let skinnedPrimitives=0,morphPrimitives=0,morphTargets=0,vertices=0,names=[];
for(const m of meshes){for(const p of (m.primitives||[])){if(p.attributes&&p.attributes.JOINTS_0!==undefined&&p.attributes.WEIGHTS_0!==undefined)skinnedPrimitives++;if(p.targets&&p.targets.length){morphPrimitives++;morphTargets=Math.max(morphTargets,p.targets.length);}const a=p.attributes&&acc[p.attributes.POSITION];if(a)vertices+=a.count||0;}const tn=m.extras&&m.extras.targetNames;if(Array.isArray(tn))names.push(...tn);}
const report={file,size_mb:+(b.length/1048576).toFixed(2),version,total_length:total,nodes:nodes.length,meshes:meshes.length,skins:skins.length,joints,skin_names:skins.map(s=>s.name||'(unnamed)'),skinned_primitives:skinnedPrimitives,vertices,morph_primitives:morphPrimitives,max_morph_targets:morphTargets,morph_names:names.slice(0,200),bin_bytes:binBytes,has_joints_and_weights:skinnedPrimitives>0,has_morph_targets:morphPrimitives>0};
console.log(JSON.stringify(report,null,2));assert(skins.length>0,'NO_SKIN');assert(joints>0,'NO_JOINTS');assert(skinnedPrimitives>0,'NO_SKINNED_PRIMITIVE');console.log(morphPrimitives>0?'HUMAN_BASE_GLB_AUDIT_OK_WITH_MORPHS':'HUMAN_BASE_GLB_AUDIT_OK_NO_MORPHS');