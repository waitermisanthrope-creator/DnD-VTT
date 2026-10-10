/* Sparse MPFB targets for the shipped body; no new copies of base geometry. */
const fs=require('fs'),path=require('path'),crypto=require('crypto');
const bridge=require('./build_makehuman_morphs'),recipe=require('./prepare_makehuman_gender');
const {readGlb}=require('../tests/makehuman_morph_bridge');
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
function build(data,input,out){
 const g=readGlb(input),p=g.json.meshes[0].primitives[0];
 function acc(id,n){const a=g.json.accessors[id],v=g.json.bufferViews[a.bufferView];if(a.componentType!==5126||v.byteStride)throw Error('Packed float attributes required');return new Float32Array(g.bin.buffer,g.bin.byteOffset+(v.byteOffset||0)+(a.byteOffset||0),a.count*n);}
 const pos=acc(p.attributes.POSITION,3),uv=acc(p.attributes.TEXCOORD_0,2),hm=bridge.obj(path.join(data,'3dobjs/base.obj')),mapping=bridge.mapSurface(hm,uv),macros=recipe.readMacros(g),config=JSON.parse(fs.readFileSync(path.join(data,'targets/macrodetails/macro.json'))),defs={},channels={},sourceHashes={baseObj:sha(fs.readFileSync(path.join(data,'3dobjs/base.obj')))};
 function axis(name,folder,stem,scale=1){channels[name]={positive:stem+'-incr',negative:stem+'-decr',scale};for(const sign of ['incr','decr'])defs[stem+'-'+sign]=[{folder,name:stem+'-'+sign,weight:1}];}
 axis('arms','arms','measure-upperarm-circ');axis('legs','legs','measure-thigh-circ');axis('pectorals','torso','torso-muscle-pectoral',.7);
 function combine(name,folder,stems,scale){channels[name]={positive:name+'-incr',negative:name+'-decr',scale};for(const sign of ['incr','decr'])defs[name+'-'+sign]=stems.map(stem=>({folder,name:stem+'-'+sign,weight:1}));}
 combine('armLength','arms',['measure-upperarm-length','measure-lowerarm-length'],.65);
 combine('legLength','legs',['measure-upperleg-height','measure-lowerleg-height'],.65);
 combine('head','head',['head-scale-horiz','head-scale-vert','head-scale-depth'],.35);
 channels.breastSize={positive:'breast-volume-incr',negative:'breast-volume-decr',scale:.8};
 for(const [sign,cup] of [['incr',1],['decr',0]]){
  const terms=[];
  for(const [age,aw] of recipe.interpolate(config,'age',macros.age))for(const [muscle,mw] of recipe.interpolate(config,'muscle',macros.muscle))for(const [weight,ww] of recipe.interpolate(config,'weight',macros.weight))for(const [size,cw] of recipe.interpolate(config,'cupsize',cup))for(const [firmness,fw] of recipe.interpolate(config,'firmness',macros.firmness)){
   const weightValue=aw*mw*ww*cw*fw;if(weightValue>.01 && !(size==='averagecup'&&firmness==='averagefirmness'))terms.push({folder:'breast',name:['female',age,muscle,weight,size,firmness].join('-'),weight:weightValue});
  }
  defs['breast-volume-'+sign]=terms;
 }
 let offset=0;const chunks=[],targets=[];
 for(const [name,sources] of Object.entries(defs)){
  const delta=bridge.composeTarget(data,sources,hm.vertices.length,sourceHashes),records=[];
  for(let i=0;i<pos.length/3;i++){const hit=mapping.vertices[i],d=[0,0,0];for(let k=0;k<3;k++)for(let j=0;j<3;j++)d[k]+=delta[hit.ids[j]*3+k]*hit.w[j]*.1;if(Math.hypot(...d)>1e-8)records.push([i,...d]);}
  if(!records.length)throw Error('Empty '+name);const b=Buffer.alloc(records.length*16);records.forEach((r,i)=>{b.writeUInt32LE(r[0],i*16);for(let k=1;k<4;k++)b.writeFloatLE(r[k],i*16+k*4);});
  targets.push({name,offset,count:records.length});offset+=b.length;chunks.push(b);
 }
 const binary=Buffer.concat(chunks),meta={schema:1,vertexCount:pos.length/3,basePositionsSha256:sha(Buffer.from(pos.buffer,pos.byteOffset,pos.byteLength)),binary:'editor-morphs.bin',binarySha256:sha(binary),bytes:binary.length,channels,targets,source:{project:'makehumancommunity/mpfb2',commit:recipe.PINNED_COMMIT,license:'CC0-1.0',method:'native Y-up deltas, UV barycentric transfer, scale 0.1',sourceHashes,compositions:defs,limitations:['Fixed exported macro composition for breast volume','Static body; rig is unchanged and animation fitting needs separate QA']}};
 fs.mkdirSync(out,{recursive:true});fs.writeFileSync(path.join(out,meta.binary),binary);fs.writeFileSync(path.join(out,'editor-morphs.json'),JSON.stringify(meta,null,2)+'\n');return {bytes:binary.length,targets:targets.map(t=>({name:t.name,count:t.count})),sha:meta.binarySha256};
}
if(require.main===module){const [data,input,out]=process.argv.slice(2);if(!data||!input||!out)throw Error('Usage: pinned MPFB data, body GLB, output directory');console.log(JSON.stringify(build(data,input,out),null,2));}
module.exports={build};
