const fs=require('fs'),vm=require('vm'),path=require('path'),assert=require('assert'),crypto=require('crypto');
const root=path.resolve(__dirname,'..'),g={crypto:crypto.webcrypto},ctx={window:g,console,TextDecoder,DataView,Float32Array,Float64Array,Uint32Array,Uint16Array,Uint8Array,Int8Array,Int16Array,atob,btoa};
ctx.fetch=async url=>{const b=fs.readFileSync(path.join(root,url.replace(/^\.\//,'').split('?')[0]));return {ok:true,json:async()=>JSON.parse(b),arrayBuffer:async()=>b.buffer.slice(b.byteOffset,b.byteOffset+b.length)}};
for(const n of ['character_clothing','character_anatomy','character_system','gltf_loader','gltf_character_pipeline','character_morph_assets','character_body_geometry'])vm.runInNewContext(fs.readFileSync(path.join(root,'app/3dmap',n+'.js'),'utf8'),ctx);
(async()=>{
 const api=g.DNDCharacterAnatomy,sys=g.DNDCharacter3D,geo=g.DNDCharacterBodyGeometry,pipe=g.DNDGLTFCharacterPipeline;
 assert.equal(Object.keys(api.regions).length,20);assert.equal(sys.createCharacter({gender:'female'}).anatomy.maturity,'adult');
 assert.throws(()=>api.normalize({maturity:'child'}),/взрослых/);assert.throws(()=>api.normalize({version:2}),/версия/);
 const malformed=api.normalize({hair:{quality:'invalid',regions:{pubic:{enabled:true,density:Infinity,length:-3,color:'bad'},unknown:{enabled:true}}}});
 assert.equal(malformed.hair.quality,'medium');assert.equal(malformed.hair.regions.pubic.density,.5);assert.equal(malformed.hair.regions.pubic.length,0);assert(!Object.hasOwn(malformed.hair.regions,'unknown'));
 const legacy=sys.deserialize({raceId:'human',gender:'male',body:{hips:.25}});assert(Object.values(legacy.anatomy.hair.regions).every(r=>!r.enabled));
 legacy.anatomy.hair.regions.armpitL={enabled:true,density:.8,length:.7,color:'#223344'};const before=JSON.stringify(legacy.anatomy);sys.setGender(legacy,'female');sys.setRace(legacy,'elf_high');assert.equal(JSON.stringify(legacy.anatomy),before);assert.deepEqual(sys.deserialize(sys.serialize(legacy)).anatomy,legacy.anatomy);
 assert.equal(api.descriptor(legacy).externalGeometryReady,false);
 for(const id of ['ghost','parasite','swarm_bats','warforged','plasmoid','myconid','dragonborn','owlin'])assert.equal(api.descriptor(sys.createCharacter({raceId:id})).regionalHairSupported,false,id);
 pipe.install();const asset=await g.DNDGLTF.load(sys.getRace('human').baseModel);await g.DNDCharacterMorphAssets.attach(asset,sys.getRace('human').morphSet);let cases=0;
 for(const gender of ['male','female']){
  const c=sys.createCharacter({raceId:'human',gender,clothing:{underwearBottom:'none',underwearTop:'none'}});
  for(const extreme of [-1,0,1]){
   c.body.width=extreme;c.body.fat=extreme;c.body.muscle=extreme;c.body.hips=extreme;pipe.deformAsset(asset,sys.getMorphWeights(c));const ref=geo.bounds(asset.parts,'deformedPositions');
   for(const p of asset.parts){p.__ceShapedPositions=geo.shape(asset,p,c.body,ref);p.__ceNormals=geo.normals(p.__ceShapedPositions,p.indices,p.basePositions);p.__ceVisibleIndices=p.indices;
    for(const id of Object.keys(api.regions)){const mask=api.regionMask(asset,p,id,geo);assert(mask.some(v=>v>0),gender+' '+extreme+' empty region '+id);c.anatomy.hair.regions[id].enabled=true;c.anatomy.hair.regions[id].density=1;}
    for(const quality of ['low','medium','high']){c.anatomy.hair.quality=quality;const parts=api.hairParts(asset,p,c,geo),count=parts.reduce((n,p)=>n+p.furStrands,0);assert(count>0&&count<=api.budgets[quality]);for(const part of parts){assert.equal(part.furShell,0);assert(part.positions.length/3<65536);assert(Array.from(part.positions).every(Number.isFinite));assert(Array.from(part.indices).every(i=>i<part.positions.length/3));}}
    c.anatomy.hair.shaved=true;assert.equal(api.hairParts(asset,p,c,geo).length,0);c.anatomy.hair.shaved=false;
    const alone=api.normalize({hair:{regions:{pubic:{enabled:true,density:1}}}});c.anatomy=alone;assert(api.hairParts(asset,p,c,geo).some(p=>p.bodyHairRegion==='pubic'));c.clothing.underwearBottom=gender==='female'?'briefs_female':'briefs_male';assert.equal(api.hairParts(asset,p,c,geo).length,0);c.clothing.underwearBottom='none';
    c.anatomy=api.normalize({hair:{regions:{armpitL:{enabled:true,density:1}}}});const left=api.hairParts(asset,p,c,geo);assert(left.length>0);assert(left.every(p=>p.bodyHairRegion==='armpitL'));assert(!c.anatomy.hair.regions.armpitR.enabled);
   }cases++;
  }
 }
 console.log('ADULT_ANATOMY_FOUNDATION_OK',cases,'gender/extreme cases; 20 nonempty regions; adult/version guards; migration/roundtrip/sex-race preservation; 3 ribbon budgets; shaving; regional isolation; underwear coverage; finite indexed meshes');
})().catch(e=>{console.error(e);process.exitCode=1});
