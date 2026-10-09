#!/usr/bin/env node
/* Stage 1: derive a female-minus-exported-body recipe from MPFB metadata.
 * This prepares a named morph, without changing the app's shipped model.
 * MPFB targetservice.py rounds macro components to 4 decimals and uses a
 * 0.01 cutoff; retain those rules before subtracting the two complete stacks.
 */
const fs=require('fs'),path=require('path'),crypto=require('crypto');
const {readGlb}=require('../tests/makehuman_morph_bridge');
const PINNED_COMMIT='d0a32e57a7f915cb2f2b95410e2117648c7bbb7e';
const hash=file=>crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const round4=n=>Math.round(n*10000)/10000;
function readMacros(glb){
 const nodes=(glb.json.nodes||[]).filter(n=>n.mesh!=null);
 if(nodes.length!==1)throw Error('One exported body node required');
 const extras=nodes[0].extras||{},out={race:{}};
 for(const key of ['gender','age','muscle','weight','proportions','height','cupsize','firmness']){
  const value=extras['MPFB_HUM_'+key];
  if(!Number.isFinite(value)||value<0||value>1)throw Error('Missing/invalid exported macro: '+key);
  out[key]=value;
 }
 for(const key of ['caucasian','asian','african']){
  const value=extras['MPFB_HUM_'+key];
  if(!Number.isFinite(value)||value<0||value>1)throw Error('Missing/invalid exported ancestry: '+key);
  out.race[key]=value;
 }
 if(Math.abs(Object.values(out.race).reduce((s,v)=>s+v,0)-1)>1e-5)throw Error('Exported ancestry weights must sum to 1');
 return out;
}
function interpolate(config,key,value){
 const macro=config.macrotargets&&config.macrotargets[key];
 if(!macro||!Array.isArray(macro.parts))throw Error('Missing macro definition: '+key);
 const out=[];
 for(const part of macro.parts)if(value>part.lowest&&value<part.highest){
  const t=(value-part.lowest)/(part.highest-part.lowest);
  if(part.low)out.push([part.low,round4(1-t)]);
  if(part.high)out.push([part.high,round4(t)]);
 }
 return out;
}
function stack(macros,config){
 /* The first preset uses the exported body's neutral height and breast
  * controls. Fail explicitly for other inputs until those stacks are added. */
 if(macros.height<.49||macros.height>.51||Math.abs(macros.cupsize-.5)>1e-6||Math.abs(macros.firmness-.5)>1e-6)throw Error('Only neutral height/cupsize/firmness supported in gender stage 1');
 const c={};for(const key of ['gender','age','muscle','weight','proportions'])c[key]=interpolate(config,key,macros[key]);
 for(const key of ['gender','age','muscle','weight'])if(!c[key].length)throw Error('Macro falls in unsupported interpolation gap: '+key);
 const out=new Map();
 const add=(name,weight)=>{if(weight>.01)out.set(name,(out.get(name)||0)+weight);};
 for(const [race,rw] of Object.entries(macros.race))for(const [gender,gw] of c.gender)for(const [age,aw] of c.age)add(race+'-'+gender+'-'+age,rw*gw*aw);
 for(const [gender,gw] of c.gender)for(const [age,aw] of c.age)for(const [muscle,mw] of c.muscle)for(const [weight,ww] of c.weight){
  const stem=gender+'-'+age+'-'+muscle+'-'+weight,w=gw*aw*mw*ww;
  add('universal-'+stem,w);
  if(age!=='baby')for(const [proportions,pw] of c.proportions)add('proportions/'+stem+'-'+proportions,w*pw);
 }
 return out;
}
function difference(from,to){
 const terms=new Map();
 for(const [name,weight] of to)terms.set(name,weight);
 for(const [name,weight] of from)terms.set(name,(terms.get(name)||0)-weight);
 return Array.from(terms).filter(([,weight])=>Math.abs(weight)>1e-12).sort(([a],[b])=>a.localeCompare(b)).map(([key,weight])=>({folder:path.posix.join('macrodetails',path.posix.dirname(key)),name:path.posix.basename(key),weight}));
}
function prepare(dataDir,input,baseConfig=path.join(__dirname,'makehuman_morph_channels.json')){
 const glb=readGlb(input),macros=readMacros(glb),macroFile=path.join(dataDir,'targets/macrodetails/macro.json'),config=JSON.parse(fs.readFileSync(macroFile,'utf8'));
 const original=stack(macros,config),female=stack(Object.assign({},macros,{gender:0}),config),sources=difference(original,female);
 if(!sources.length)throw Error('Source body already has the requested female macros');
 const hashes={};for(const source of sources){const file=path.join(dataDir,'targets',source.folder,source.name+'.target.gz');hashes[source.folder+'/'+source.name+'.target.gz']=hash(file);}
 const channels=JSON.parse(fs.readFileSync(baseConfig,'utf8'));
 if(channels['human-female'])throw Error('human-female already exists in input config');
 channels['human-female']={target:'human-female',sources};
 return{channels,metadata:{sourceProject:'makehumancommunity/mpfb2',recommendedSourceCommit:PINNED_COMMIT,declaredSourceCommit:process.env.MAKEHUMAN_SOURCE_COMMIT||null,sourceGlbSha256:hash(input),macroConfigSha256:hash(macroFile),exportedMacros:macros,destinationGender:0,cutoff:.01,sourceStackTerms:original.size,femaleStackTerms:female.size,compositeTerms:sources.length,sourceHashes:hashes,limitations:['Fixed exported macros; not a full runtime macro editor','Neutral height/cupsize/firmness only','Skeleton and bind pose unchanged; animation fit needs later QA']}};
}
if(require.main===module){
 const [data,input,output]=process.argv.slice(2);
 if(!data||!input||!output)throw Error('Usage: dataDir source.glb output-channels.json');
 if(path.resolve(output)===path.resolve(input))throw Error('Source must not be overwritten');
 const result=prepare(data,input);
 fs.mkdirSync(path.dirname(output),{recursive:true});fs.writeFileSync(output,JSON.stringify(result.channels,null,2)+'\n');
 console.log(JSON.stringify(result.metadata,null,2));
}
module.exports={PINNED_COMMIT,readMacros,interpolate,stack,difference,prepare};
