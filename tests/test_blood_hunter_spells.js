const assert=require('assert');
const {runtime,hero}=require('./helpers/class_runtime_harness');
const g=runtime(),C=g.DNDClassFeatures,H=g.DNDBloodHunter;
const catalog=[
 {name:'Кантрип А',level:0,classes:['Колдун'],damage:'1d10',damageType:'force'},
 {name:'Кантрип Б',level:0,classes:['Колдун'],damage:'1d8',damageType:'necrotic'},
 {name:'Кантрип В',level:0,classes:['Колдун'],damage:'1d8'},
 {name:'Пакт А',level:1,classes:['Колдун'],damage:'1d8'},
 {name:'Пакт Б',level:1,classes:['Колдун'],damage:'1d6'},
 {name:'Пакт В',level:1,classes:['Колдун'],damage:'1d4'},
 {name:'Пакт Г',level:2,classes:['Колдун'],damage:'2d6'},
 {name:'Чужой маг',level:1,classes:['Волшебник'],damage:'2d6'}];
g.getAllSpellsDatabase=()=>catalog.slice();
function hunter(l){const h=hero(H.CLASS,l,'Орден осквернённых душ');h.id='spell-'+l;h.spellsData=[{name:'Чужое заклинание персонажа',level:1,castingClass:'Волшебник'}];C.buildFeatureSet(h);return h;}
let h=hunter(3);
const pick=(h,cantrips,spells)=>C.useFeature(h,'chooseProfaneSpells',{className:H.CLASS,cantrips,spells});
assert.strictEqual(pick(h,['Кантрип А','Кантрип Б'],['Пакт А','Пакт Б']).ok,false,'Patron is required before known spells');
assert.strictEqual(C.useFeature(h,'otherworldlyPatron',{className:H.CLASS,patron:'fiend'}).ok,true);
assert.strictEqual(pick(h,['Кантрип А','Кантрип Б'],['Чужой маг','Пакт Б']).ok,false,'other class spell cannot be learned');
assert.strictEqual(pick(h,['Кантрип А','Кантрип А'],['Пакт А','Пакт Б']).ok,false,'duplicate cantrips rejected');
assert.strictEqual(pick(h,['Кантрип А','Кантрип Б'],['Пакт Г','Пакт Б']).ok,false,'no level-2 spell at level 3');
assert.strictEqual(pick(h,['Кантрип А','Кантрип Б'],['Пакт А','Пакт Б']).ok,true);
assert.deepEqual(Array.from(h.classFeaturesState.bhProfaneSpells),['Пакт А','Пакт Б']);
assert(h.spellsData.some(x=>x.castingClass==='Волшебник'),'unrelated multiclass spells must survive');
assert(h.spellsData.some(x=>x.name==='Пакт А'&&x.castingClass===H.CLASS&&x.castingStat==='int'));
const stable=JSON.parse(JSON.stringify(h));C.buildFeatureSet(stable);
assert.deepEqual(Array.from(stable.classFeaturesState.bhProfaneCantrips),['Кантрип А','Кантрип Б']);
assert.strictEqual(pick(h,['Кантрип А','Кантрип В'],['Пакт А','Пакт Б']).ok,false,'no repeated respec same level');
let level5=hunter(5);
assert.strictEqual(C.useFeature(level5,'otherworldlyPatron',{className:H.CLASS,patron:'fiend'}).ok,true);
assert.strictEqual(pick(level5,['Кантрип А','Кантрип Б'],['Пакт А','Пакт Б','Пакт Г']).ok,true);
assert.strictEqual(level5.spellsData.filter(x=>x.castingClass===H.CLASS&&x.level>0).length,3);
let unavailable=hunter(3);C.useFeature(unavailable,'otherworldlyPatron',{className:H.CLASS,patron:'celestial'});
g.getAllSpellsDatabase=()=>[];
assert.strictEqual(pick(unavailable,['Кантрип А','Кантрип Б'],['Пакт А','Пакт Б']).ok,false);
assert.strictEqual(unavailable.classFeaturesState.bhProfaneSpells,undefined,'failed cast catalog must not mutate choices');
console.log('PASS: Profane Soul known spells, catalog/source/slot restrictions, JSON and multiclass isolation');