'use strict';
// Package repository-owned content for Unity, preserving glTF relative dependencies.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),cp=require('node:child_process');
const repo=path.resolve(__dirname,'../..'), out=path.join(repo,'unity/Assets/LegacyContent');
if(cp.execFileSync('git',['branch','--show-current'],{cwd:repo,encoding:'utf8'}).trim()!=='experiment/unity-vtt')throw Error('Requires experiment/unity-vtt');
const copied=new Map(),derived=[];
function copy(relative,destination=relative){
 const absolute=path.resolve(repo,relative);
 if(!absolute.startsWith(repo+path.sep))throw Error('Content path escapes repository');
 if(!path.resolve(out,'Source',destination).startsWith(path.resolve(out,'Source')+path.sep))throw Error('Content destination escapes Unity content root');
 if(copied.has(destination))return;
 const bytes=fs.readFileSync(absolute);
 let importDocument=null, rawDestination=destination;
 if(relative.endsWith('.gltf')){
  importDocument=JSON.parse(bytes);
  if(importDocument.skins?.length){
   rawDestination=destination+'.bytes';
   const baked=JSON.parse(bytes);delete baked.skins;delete baked.animations;
   for(const node of baked.nodes||[])delete node.skin;
   for(const mesh of baked.meshes||[])for(const primitive of mesh.primitives||[])for(const key of Object.keys(primitive.attributes||{}))if(/^(JOINTS|WEIGHTS)_/.test(key))delete primitive.attributes[key];
   const generated=Buffer.from(JSON.stringify(baked,null,2)+'\n'),generatedPath=path.join(out,'Source',destination);
   fs.mkdirSync(path.dirname(generatedPath),{recursive:true});if(!fs.existsSync(generatedPath)||!fs.readFileSync(generatedPath).equals(generated))fs.writeFileSync(generatedPath,generated);
   derived.push({source:relative,destination,sha256:crypto.createHash('sha256').update(generated).digest('hex'),reason:'Static bind-pose derivative: existing JS flatten does not execute skins/animations. Original glTF retained as .gltf.bytes. glTFast 6.14.1 bone job importer fails on this multi-primitive skin.'});
  }
 }
 const target=path.join(out,'Source',rawDestination);
 fs.mkdirSync(path.dirname(target),{recursive:true});
 if(!fs.existsSync(target)||!fs.readFileSync(target).equals(bytes))fs.writeFileSync(target,bytes);
 copied.set(destination,{path:relative,destination:rawDestination,bytes:bytes.length,sha256:crypto.createHash('sha256').update(bytes).digest('hex')});
 if(relative.endsWith('.gltf')){
  const model=importDocument;
  for(const item of [...model.buffers||[],...model.images||[]]){
   if(!item.uri||item.uri.startsWith('data:'))continue;
   if(/^[a-z]+:/i.test(item.uri))throw Error('Remote glTF dependency forbidden: '+relative);
   const dependency=path.relative(repo,path.resolve(path.dirname(absolute),decodeURIComponent(item.uri))).split(path.sep).join('/');
   // Existing JS uriPath redirects T_* images to the shared texture directory.
   // Place the same bytes at the glTF-relative destination for Unity; do not edit glTF.
   if(!fs.existsSync(path.join(repo,dependency))&&/^T_/i.test(path.basename(dependency)))copy('app/assets/3d/quaternius/textures/'+path.basename(dependency),dependency);
   else copy(dependency);
  }
 }
}
const mapPaths=fs.readdirSync(path.join(repo,'app/data/maps')).filter(f=>/^3d_.*\.json$/.test(f)).sort().map(f=>'app/data/maps/'+f);
const textures=new Set();
for(const relative of mapPaths){
 copy(relative);const map=JSON.parse(fs.readFileSync(path.join(repo,relative)));
 for(const floor of map.floors||[]){
  Object.values(floor.tiles||{}).forEach(t=>textures.add(t));
  for(const wall of Object.values(floor.walls||{}))for(const [key,value]of Object.entries(wall))if(key.endsWith('Texture'))textures.add(value);
 }
}
const tavern=JSON.parse(fs.readFileSync(path.join(repo,'app/data/maps/3d_tavern_v740019.json')));
const models=[...new Set(tavern.floors.flatMap(f=>f.objects||[]).map(o=>o.model).filter(Boolean))].sort();
for(const model of models)copy(model.replace(/^\.\//,''));
for(const texture of textures)if(typeof texture==='string'&&/^[\w-]+$/.test(texture)&&fs.existsSync(path.join(repo,texture+'.png')))copy(texture+'.png');
// Keep the existing asset license with the ported assets; do not fabricate licensing.
for(const relative of ['app/assets/3d/quaternius/LICENSE.txt','app/assets/3d/quaternius/README.md'])if(fs.existsSync(path.join(repo,relative)))copy(relative);
const manifest={sourceCommit:cp.execFileSync('git',['rev-parse','HEAD'],{cwd:repo,encoding:'utf8'}).trim(),maps:mapPaths,models,textures:[...textures].filter(t=>copied.has(t+'.png')).sort(),derived,files:[...copied.values()].sort((a,b)=>a.path.localeCompare(b.path))};
fs.mkdirSync(out,{recursive:true});fs.writeFileSync(path.join(out,'provenance.json'),JSON.stringify(manifest,null,2)+'\n');
const vm=require('node:vm'),window={};vm.createContext(window);window.window=window;
for(const file of ['app/3dmap/map_model.js','app/3dmap/map_world.js'])vm.runInContext(fs.readFileSync(path.join(repo,file),'utf8'),window,{filename:file});
const contracts=mapPaths.map(relative=>{const m=JSON.parse(fs.readFileSync(path.join(repo,relative)));return {key:path.basename(relative),floors:m.floors.map((f,i)=>({base:window.DNDMapModel.baseHeight(m,i),tiles:Object.keys(f.tiles).length,walls:window.DNDMapModel.wallSegments(m,i).filter(s=>!(s.open&&(!s.secret||s.revealed))).length})),models:m.floors.flatMap(f=>f.objects||[]).filter(o=>o.model).length};});
fs.writeFileSync(path.join(out,'geometry-contract.json'),JSON.stringify(contracts,null,2)+'\n');
console.log(`LEGACY_CONTENT_SYNC_PASS: ${mapPaths.length} maps, ${models.length} models, ${manifest.textures.length} textures, ${copied.size} source files; no original files changed`);
