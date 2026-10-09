#!/usr/bin/env node
/**
 * Generate a test GLB with one transferred MakeHuman morph target.
 *
 * Usage:
 * node tests/generate_makehuman_glb_morph_fixture.js <base.obj> <human.glb> <target.gz> <output.glb> <morphName>
 *
 * The source GLB is never overwritten.
 */
const fs=require('fs');
const {transfer,readGlb}=require('./makehuman_morph_bridge');

function die(s){console.error('MAKEHUMAN_GLB_MORPH_FIXTURE_ERROR');console.error(s);process.exit(1);}
function align4(n){return(n+3)&~3;}
function u32(n){const b=Buffer.alloc(4);b.writeUInt32LE(n>>>0,0);return b;}
function chunk(type,data){return Buffer.concat([u32(data.length),u32(type),data]);}

const [objPath,glbPath,targetPath,outPath,morphName='makehuman-test-morph']=process.argv.slice(2);
if(!objPath||!glbPath||!targetPath||!outPath)die('Usage: node tests/generate_makehuman_glb_morph_fixture.js <base.obj> <human.glb> <target.gz> <output.glb> <morphName>');
for(const p of [objPath,glbPath,targetPath])if(!fs.existsSync(p))die('File not found: '+p);

const result=transfer(objPath,glbPath,targetPath);
if(result.misses)die('Surface transfer has misses: '+result.misses);

const json=JSON.parse(JSON.stringify(result.glb.json));
let targetMeshIndex=-1,targetPrimIndex=-1;
for(let mi=0;mi<(json.meshes||[]).length;mi++){
  const mesh=json.meshes[mi];
  for(let pi=0;pi<(mesh.primitives||[]).length;pi++){
    const prim=mesh.primitives[pi];
    if(prim.attributes&&prim.attributes.POSITION!=null){
      targetMeshIndex=mi;
      targetPrimIndex=pi;
      break;
    }
  }
  if(targetMeshIndex>=0)break;
}
if(targetMeshIndex<0)die('No POSITION primitive found');
const mesh=json.meshes[targetMeshIndex];
const targetPrim=mesh.primitives[targetPrimIndex];

const oldBin=result.glb.bin;
let bin=Buffer.from(oldBin);
const morphOffset=align4(bin.length);
if(morphOffset>bin.length)bin=Buffer.concat([bin,Buffer.alloc(morphOffset-bin.length)]);
const morphBytes=Buffer.from(result.morph.buffer,result.morph.byteOffset,result.morph.byteLength);
bin=Buffer.concat([bin,morphBytes]);

json.buffers=json.buffers||[{byteLength:oldBin.length}];
if(!json.buffers[0])json.buffers[0]={byteLength:oldBin.length};
json.buffers[0].byteLength=bin.length;

json.bufferViews=json.bufferViews||[];
const bvIndex=json.bufferViews.length;
json.bufferViews.push({buffer:0,byteOffset:morphOffset,byteLength:morphBytes.length,target:34962});
json.accessors=json.accessors||[];
const accIndex=json.accessors.length;
let mn=[Infinity,Infinity,Infinity],mx=[-Infinity,-Infinity,-Infinity];
for(let i=0;i<result.morph.length;i+=3)for(let k=0;k<3;k++){mn[k]=Math.min(mn[k],result.morph[i+k]);mx[k]=Math.max(mx[k],result.morph[i+k]);}
json.accessors.push({bufferView:bvIndex,componentType:5126,count:result.geo.vertices.length,type:'VEC3',min:mn,max:mx});

targetPrim.targets=targetPrim.targets||[];
targetPrim.targets.push({POSITION:accIndex});
mesh.extras=mesh.extras||{};
mesh.extras.targetNames=Array.isArray(mesh.extras.targetNames)?mesh.extras.targetNames.slice():[];
while(mesh.extras.targetNames.length<targetPrim.targets.length)mesh.extras.targetNames.push('morph_'+mesh.extras.targetNames.length);
mesh.extras.targetNames[targetPrim.targets.length-1]=morphName;
mesh.weights=Array.isArray(mesh.weights)?mesh.weights.slice():[];
while(mesh.weights.length<targetPrim.targets.length)mesh.weights.push(0);

const jsonBytes0=Buffer.from(JSON.stringify(json),'utf8');
const jsonPad=Buffer.alloc(align4(jsonBytes0.length)-jsonBytes0.length,0x20);
const jsonBytes=Buffer.concat([jsonBytes0,jsonPad]);
const binPad=Buffer.alloc(align4(bin.length)-bin.length,0);
bin=Buffer.concat([bin,binPad]);

const out=Buffer.concat([
 Buffer.from('glTF'),
 u32(2),
 u32(12+8+jsonBytes.length+8+bin.length),
 chunk(0x4e4f534a,jsonBytes),
 chunk(0x004e4942,bin)
]);
fs.writeFileSync(outPath,out);

console.log('MAKEHUMAN_GLB_MORPH_FIXTURE');
console.log(JSON.stringify({
 output:outPath,
 morphName,
 sourceGlb:glbPath,
 sourceTarget:targetPath,
 glbVertices:result.geo.vertices.length,
 mappedVertices:result.geo.vertices.length-result.misses,
 nonZeroVertices:result.nonZero,
 nonZeroPct:+(result.nonZero/result.geo.vertices.length*100).toFixed(4),
 surfaceMeanDistance:result.surfaceMeanDistance,
 surfaceMedianDistance:result.surfaceMedianDistance,
 surfaceP95Distance:result.surfaceP95Distance,
 morphAccessor:accIndex,
 morphBufferView:bvIndex,
 outputBytes:out.length
},null,2));
console.log('RESULT: TEST MORPH GLB GENERATED');
