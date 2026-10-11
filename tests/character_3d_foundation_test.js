/* Runtime test for the 3D character foundation. Loads the real module in an isolated window-like context. */
const fs=require('fs'),vm=require('vm'),assert=require('assert');
const src=fs.readFileSync(require('path').join(__dirname,'../app/3dmap/character_system.js'),'utf8');
const ctx={window:{},console};vm.runInNewContext(src,ctx,{filename:'character_system.js'});
const api=ctx.window.DNDCharacter3D;
assert(api&&api.VERSION===1,'DNDCharacter3D API missing');
api.registerRace({id:'orc_test',name:'Тестовый орк',baseModel:'orc_body',skeleton:'humanoid',morphs:{height:{min:-.5,max:1,default:.2}},presets:[]});
api.registerPreset({id:'big_orc_test',name:'Большой орк',body:{height:.8,width:.7,muscle:.9}});
api.registerEquipment({id:'plate_test',name:'Тестовый доспех',assetId:'Plate_Test',slot:'body',fit:{width:.25,height:.1,depth:.2},morphChannels:{chestShape:{source:'chest',scale:.8}}});
let c=api.createCharacter({raceId:'orc_test',presetId:'big_orc_test'});
assert(c.body.height===.8&&c.body.muscle===.9,'preset/morph state failed');
api.equip(c,'plate_test');
const fitted=api.resolveEquipment(c,'plate_test');
assert(fitted.scale[0]>1&&fitted.morphs.chestShape===0,'equipment fitting failed');
c.body.chest=.5;
assert(api.resolveEquipment(c,'plate_test').morphs.chestShape===.4,'equipment morph channel failed');
const base=new Float32Array([0,0,0,1,1,1]),delta=new Float32Array([1,0,0,0,1,0]);
const morphed=api.applyMorphTargets(base,[{name:'test',delta}],{test:.5});
assert(Math.abs(morphed[0]-.5)<1e-6&&Math.abs(morphed[4]-1.5)<1e-6,'vertex morph failed');
const restored=api.deserialize(api.serialize(c));
assert(restored.raceId==='orc_test'&&restored.equipment.body==='plate_test','serialization failed');
console.log('CHARACTER_3D_FOUNDATION_TEST_OK');
const human=api.createCharacter({raceId:'human'});
assert.strictEqual(human.skinId,'human_young_male');
assert(api.resolveSkin(human).texture.endsWith('young_lightskinned_male_diffuse.png'));
const legacyHuman=api.deserialize({raceId:'human',body:{},equipment:{}});
assert.strictEqual(legacyHuman.skinId,'human_young_male','old characters need a default skin');
human.skinId='human_young_female';
assert.strictEqual(api.deserialize(api.serialize(human)).skinId,'human_young_female');
assert.strictEqual(api.getRenderDescriptor(human).skin.id,'human_young_female');
assert.strictEqual(api.resolveSkin(c),null,'a human skin must not override another race');
human.skinId='invalid';assert.strictEqual(api.resolveSkin(human).id,'human_young_male');

const female=api.createCharacter({raceId:'human',gender:'female',body:{chest:.6,hips:-.4}});
assert.strictEqual(female.skinId,'human_young_female','new female gets female default skin');
assert.strictEqual(api.getRenderDescriptor(female).morphWeights['human-female'],1);assert(!Object.hasOwn(female.body,'human-female'));
const roundTrip=api.deserialize(api.serialize(female));assert.strictEqual(roundTrip.gender,'female');assert.strictEqual(roundTrip.body.chest,.6);assert.strictEqual(roundTrip.body.hips,-.4);
const explicit=api.createCharacter({raceId:'human',gender:'female',skinId:'human_young_male'});assert.strictEqual(api.resolveSkin(explicit).id,'human_young_male','explicit skin is independent');
const originalBody=JSON.stringify(female.body);assert(api.setGender(female,'male'));assert.strictEqual(api.getMorphWeights(female)['human-female'],0);assert.strictEqual(JSON.stringify(female.body),originalBody);assert.strictEqual(female.skinId,'human_young_female');
assert.strictEqual(api.setGender(female,'invalid'),false);assert.strictEqual(female.gender,'male');
assert.strictEqual(api.getMorphWeights(legacyHuman)['human-female'],0);assert(!Object.hasOwn(api.getMorphWeights(c),'human-female'),'human gender morph must not leak to another race');
console.log('CHARACTER_3D_GENDER_STATE_OK: defaults, independent skin, derived weights, serialization, legacy neutral, race isolation');

const surface=api.normalizeHead({skinSurface:'ember',skinDetail:2,skinGlow:-1});assert.strictEqual(surface.skinDetail,1);assert.strictEqual(surface.skinGlow,0);assert.strictEqual(surface.skinSurface,'ember');assert.strictEqual(api.normalizeHead({skinSurface:'__proto__'}).skinSurface,'none');assert.strictEqual(api.normalizeHead({}).skinDetail,0);assert.strictEqual(api.normalizeHead({}).skinGlow,0);assert.strictEqual(api.deserialize(api.serialize(api.createCharacter({head:surface}))).head.skinSurface,'ember');console.log('SKIN_SURFACE_STATE_OK: bounded, whitelisted, migrated, saved');

const anatomy=api.normalizeHead({fangSize:5,finSize:-3,pupilShape:'slit',skinSurface:'scales'});assert.strictEqual(anatomy.fangSize,1);assert.strictEqual(anatomy.finSize,0);assert.strictEqual(anatomy.pupilShape,'slit');assert.strictEqual(anatomy.skinSurface,'scales');assert.strictEqual(api.normalizeHead({pupilShape:'invalid'}).pupilShape,'round');assert.strictEqual(api.normalizeHead({}).fangSize,0);assert.strictEqual(api.normalizeHead({}).finSize,0);assert.deepStrictEqual(api.deserialize(api.serialize(api.createCharacter({head:anatomy}))).head,anatomy);console.log('RACIAL_DETAILS_STATE_OK: bounded fangs/fins, whitelisted pupils/scales, old save migration, exact serialization');

for(const raceId of ['hexblood','reborn'])for(const gender of ['male','female']){const heritage=api.createCharacter({raceId,gender,originRaceId:'dwarf_hill'});assert.strictEqual(heritage.originRaceId,'dwarf_hill');assert.deepStrictEqual(api.getRenderDescriptor(heritage).anatomyProfile,api.getRace('dwarf_hill').anatomyProfile);assert.strictEqual(heritage.body.width,api.getRace('dwarf_hill').bodyDefaults.width);const clothes=JSON.stringify(heritage.clothing);assert(api.setOriginRace(heritage,'full_orc'));assert.strictEqual(heritage.head.tuskSize,.8);assert.strictEqual(JSON.stringify(heritage.clothing),clothes);assert.strictEqual(heritage.gender,gender);assert(!api.setOriginRace(heritage,'reborn'));assert(!api.setOriginRace(heritage,'missing'));assert.deepStrictEqual(api.deserialize(api.serialize(heritage)),heritage);api.setRace(heritage,'human');assert(!('originRaceId' in heritage));}assert.strictEqual(api.createCharacter({raceId:'reborn',originRaceId:'missing'}).originRaceId,'human');assert.strictEqual(api.normalizeHead({crownSize:2}).crownSize,1);assert.strictEqual(api.normalizeHead({}).crownSize,0);console.log('HERITAGE_STATE_OK: origins, proportions, inherited tusks, clothes/sex, rejected recursive/unknown origins, migration, exact saved state');

const tie=api.createCharacter({raceId:'tiefling',gender:'female'});assert(tie.head.hornSize>0&&tie.head.tailLength>0&&tie.head.torsoRidgeSize>0);assert.deepStrictEqual(api.deserialize(api.serialize(tie)),tie);const oldHead=api.normalizeHead({});assert.strictEqual(oldHead.hornSize,0);assert.strictEqual(oldHead.tailLength,0);assert.strictEqual(oldHead.torsoRidgeSize,0);assert.strictEqual(api.normalizeHead({hornStyle:'invalid',tailCurve:5}).hornStyle,'swept');assert.strictEqual(api.normalizeHead({tailCurve:5}).tailCurve,1);console.log('TIEFLING_STATE_OK: defaults, bounded details, migration, exact saved state');

const eyes=api.normalizeHead({eyeGlow:5,pupilOpacity:-2});assert.strictEqual(eyes.eyeGlow,1);assert.strictEqual(eyes.pupilOpacity,0);assert.strictEqual(api.normalizeHead({}).eyeGlow,0);assert.strictEqual(api.normalizeHead({}).pupilOpacity,1);for(const gender of ['male','female']){const a=api.createCharacter({raceId:'aasimar',gender});assert(a.head.eyeGlow>0);assert(a.head.pupilOpacity<1);assert.deepStrictEqual(api.deserialize(api.serialize(a)),a);}console.log('CELESTIAL_EYES_STATE_OK: bounds, unchanged old defaults, both sexes, exact save');

assert.strictEqual(api.createCharacter({raceId:'changeling'}).head.pupilOpacity,0);assert.strictEqual(api.deserialize({raceId:'changeling',head:{eyeColor:'#123456'}}).head.pupilOpacity,1,'saved appearance keeps legacy pupils');

for(const gender of ['male','female']){const b=api.createCharacter({raceId:'bugbear',gender});assert.strictEqual(b.head.skinSurface,'fur');assert(b.head.tuskSize>0&&b.head.fangSize>0);assert(b.body.armLength>0);assert(api.getRace('bugbear').anatomyProfile.arms>api.getRace('hobgoblin').anatomyProfile.arms);assert.deepStrictEqual(api.deserialize(api.serialize(b)),b);}assert.strictEqual(api.normalizeHead({skinSurface:'fur'}).skinSurface,'fur');console.log('BUGBEAR_STATE_OK: both sexes, long arms, teeth, fur material, exact save');

for(const gender of ['male','female']){const sh=api.createCharacter({raceId:'shifter',gender});assert.strictEqual(sh.head.skinSurface,'fur');assert(sh.head.fangSize>0);assert.deepStrictEqual(api.deserialize(api.serialize(sh)),sh);for(const originRaceId of ['human','elf_high','vedalken']){const hybrid=api.createCharacter({raceId:'simic_hybrid',gender,originRaceId});assert.strictEqual(hybrid.originRaceId,originRaceId);assert.strictEqual(hybrid.head.earLength,api.normalizeHead(api.getRace(originRaceId).headDefaults).earLength);assert.strictEqual(hybrid.head.finSize,.6);assert.strictEqual(hybrid.head.skinSurface,'scales');assert.deepStrictEqual(api.deserialize(api.serialize(hybrid)),hybrid);const clothes=JSON.stringify(hybrid.clothing);assert(api.setOriginRace(hybrid,'elf_wood'));assert.strictEqual(hybrid.head.finSize,.6);assert.strictEqual(JSON.stringify(hybrid.clothing),clothes);assert.strictEqual(hybrid.gender,gender);assert(!api.setOriginRace(hybrid,'simic_hybrid'));}}console.log('SHIFTER_SIMIC_STATE_OK: both sexes, inherited origins, fins/fur/scales, clothes, rejected recursive origin, exact save');

for(const id of ['fairy','harengon'])for(const gender of ['male','female']){const c=api.createCharacter({raceId:id,gender});assert.deepStrictEqual(api.deserialize(api.serialize(c)),c);}for(const k of ['rabbitEarSize','rabbitTailSize','wingSize']){assert.strictEqual(api.normalizeHead({[k]:2})[k],1);assert.strictEqual(api.normalizeHead({})[k],0);}assert.strictEqual(api.createCharacter({raceId:'fairy'}).head.wingSize,.7);assert.strictEqual(api.createCharacter({raceId:'harengon'}).head.rabbitEarSize,.7);console.log('FAIRY_HARENGON_STATE_OK: both sexes, bounded modules, zero legacy defaults, exact save');
