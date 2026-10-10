/* Actual sparse assets, exact topology/integrity, anatomical isolation and armor. */
const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert'),crypto=require('crypto');
const root=path.resolve(__dirname,'..'),win={crypto:crypto.webcrypto},ctx={window:win,console,TextDecoder,DataView,Float32Array,Uint32Array,Uint16Array,Uint8Array,Int8Array,Int16Array,atob,btoa};
let corrupt=false;
ctx.fetch=async url=>{const file=path.join(root,url.replace(/^\.\//,'').split('?')[0]);let b=fs.readFileSync(file);if(corrupt&&file.endsWith('editor-morphs.bin')){b=Buffer.from(b);b[0]^=1;}return {ok:true,json:async()=>JSON.parse(b),arrayBuffer:async()=>b.buffer.slice(b.byteOffset,b.byteOffset+b.length)};};
for(const name of ['character_system','gltf_loader','gltf_character_pipeline','character_morph_assets','character_body_geometry'])vm.runInNewContext(fs.readFileSync(path.join(root,'app/3dmap',name+'.js'),'utf8'),ctx);
const sys=win.DNDCharacter3D,geo=win.DNDCharacterBodyGeometry,pipe=win.DNDGLTFCharacterPipeline;
function equal(a,b){assert.strictEqual(a.length,b.length);for(let i=0;i<a.length;i++)assert.strictEqual(a[i],b[i]);}
(async()=>{
 pipe.install();const race=sys.getRace('human'),a=await win.DNDGLTF.load(race.baseModel),p=a.parts[0];await win.DNDCharacterMorphAssets.attach(a,race.morphSet);assert.strictEqual(p.morphNames.length,23);assert.strictEqual(Object.keys(a.character.morphChannels).length,11);
 const m=geo.masks(a,p),diag=[];
 for(const gender of ['male','female']){
  const c=sys.createCharacter({gender});function sample(){pipe.deformAsset(a,sys.getMorphWeights(c));return geo.shape(a,p,c.body,geo.bounds(a.parts,'deformedPositions'));}const base=sample();
  for(const axis of Object.keys(sys.AXES)){
   let plus;
   for(const value of [-1,-.5,0,.5,1]){c.body[axis]=value;const out=sample();assert(out.every(Number.isFinite),gender+' '+axis+' finite');if(value===1)plus=out;}
   let changed=0,max=0,handMax=0,headMax=0;const names=a.character.skins[p.skin].joints.map(id=>a.gltf.nodes[id].name);
   for(let i=0;i<base.length;i+=3){const d=Math.hypot(plus[i]-base[i],plus[i+1]-base[i+1],plus[i+2]-base[i+2]);if(d>1e-7)changed++;max=Math.max(max,d);if(m.head[i/3]>.99)headMax=Math.max(headMax,d);let hand=0;for(let k=0;k<4;k++)if(/^(hand|index|middle|pinky|ring|thumb)/.test(names[p.joints[i/3*4+k]]))hand+=p.weights[i/3*4+k];if(hand>.99)handMax=Math.max(handMax,d);}
   if(axis==='breastSize'&&gender==='male')assert.strictEqual(changed,0,'male must ignore stored breast size');else assert(changed>100,axis+' must move a real region');
   if(['legs','legLength'].includes(axis))assert(handMax<1e-6,'leg controls must not move hands');if(['muscle','fat'].includes(axis))assert(headMax<1e-6,'body composition must protect head');
   if(axis==='breastSize')assert(headMax<1e-6&&handMax<1e-6,'breast size must stay local');
   c.body[axis]=0;equal(sample(),base);diag.push({gender,axis,changed,max_mm:+(max*1000).toFixed(2)});
  }
  for(const value of [-1,1]){Object.keys(c.body).forEach(k=>c.body[k]=value);let v=sample();assert(v.every(Number.isFinite));p.__ceShapedPositions=v;p.__ceNormals=geo.normals(v,p.indices,p.basePositions);assert(p.__ceNormals.every(Number.isFinite));const armor=geo.armor(a,p,geo.bounds([{positions:v}]));assert(armor&&armor.indices.length>300,'actual armor triangles');assert(armor.positions.every(Number.isFinite));for(let i=0;i<armor.indices.length;i++){const id=armor.indices[i],at=id*3;assert(Math.abs(Math.hypot(armor.positions[at]-armor.anchorPositions[at],armor.positions[at+1]-armor.anchorPositions[at+1],armor.positions[at+2]-armor.anchorPositions[at+2])-.012)<1e-6,'armor follows extreme body at 12 mm clearance');}}
 }
 const fresh=await win.DNDGLTF.load(race.baseModel);delete fresh.__editorMorphUrl;delete fresh.__editorMorphPending;fresh.parts[0].morphNames=fresh.parts[0].morphNames.slice(0,9);fresh.parts[0].morphTargets=fresh.parts[0].morphTargets.slice(0,9);corrupt=true;await assert.rejects(win.DNDCharacterMorphAssets.attach(fresh,race.morphSet),/Повреждён/);assert.strictEqual(fresh.parts[0].morphNames.length,9,'corruption cannot partially install targets');corrupt=false;
 fresh.parts[0].basePositions=new Float32Array(fresh.parts[0].basePositions);fresh.parts[0].basePositions[0]+=.001;await assert.rejects(win.DNDCharacterMorphAssets.attach(fresh,race.morphSet),/не соответствуют/);
 console.log('CHARACTER_EDITOR_MORPH_ASSETS_TEST_OK: real 23 targets, 15 axes both genders, finite extremes, exact zero, hand/head isolation, fitted 3D armor, corrupted bytes/topology rejected');
 if(process.env.CHARACTER_AUDIT_OUTPUT)fs.writeFileSync(process.env.CHARACTER_AUDIT_OUTPUT,JSON.stringify(diag,null,2)+'\n');
})().catch(e=>{console.error(e);process.exitCode=1;});
