const assert=require('assert'),fs=require('fs'),vm=require('vm'),path=require('path');
const {runtime,hero,root}=require('./helpers/class_runtime_harness');
const g=runtime(),C=g.DNDClassFeatures,H=g.DNDBloodHunter;
g.Math.random=()=>0.6;
g.getAllSpellsDatabase=()=>[
 {name:'Опаляющий луч (Scorching Ray)',level:2,classes:['Волшебник'],damage:'2d6',damageType:'fire',attackType:'spell',castingTime:'1 действие',rangeFt:90},
 {name:'Огненный шар (Fireball)',level:3,classes:['Волшебник'],damage:'8d6',damageType:'fire',savingThrow:'dex',castingTime:'1 действие',rangeFt:150}
];
function profane(level=15){
 const h=hero(H.CLASS,level,'Орден осквернённых душ');h.id='arcana-hero';h.characterId='arcana-hero';
 C.buildFeatureSet(h);assert(C.useFeature(h,'otherworldlyPatron',{className:H.CLASS,patron:'fiend'}).ok);return h;
}
let h=profane();
const revealed=h.spellsData.find(sp=>sp.specialArcana==='revealedArcana'),unsealed=h.spellsData.find(sp=>sp.specialArcana==='unsealedArcana');
assert(revealed&&unsealed,'catalog spells must register with their real metadata');
assert.equal(revealed.name,'Опаляющий луч (Scorching Ray)');assert.equal(unsealed.name,'Огненный шар (Fireball)');
assert.strictEqual(revealed.castingClass,H.CLASS);assert.strictEqual(unsealed.castingClass,H.CLASS);
C.buildFeatureSet(h);assert.strictEqual(h.spellsData.filter(sp=>sp.specialArcana).length,2,'rebuild does not duplicate patron spells');
assert.strictEqual(H.arcanaInfo(h,'revealedArcana').free,false);
assert.strictEqual(H.arcanaInfo(h,'unsealedArcana').free,true);
assert.strictEqual(C.useFeature(h,'revealedArcana',{className:H.CLASS}).ok,false,'feature button must not bypass spell resolver');
const saved=JSON.parse(JSON.stringify(h));C.buildFeatureSet(saved);
assert.strictEqual(saved.spellsData.filter(sp=>sp.specialArcana).length,2);
let novice=profane(6);assert.strictEqual(H.arcanaInfo(novice,'revealedArcana'),null);
assert.strictEqual(novice.spellsData.filter(sp=>sp.specialArcana).length,0);

// All authoritative casts use only the owner's registered spell source.
h=profane();h.spells=h.spellsData.filter(sp=>sp.specialArcana).map(sp=>({
 name:sp.name,level:sp.level,damage:sp.damage,damageType:sp.damageType,attackType:sp.attackType,
 savingThrow:sp.savingThrow,castingClass:sp.castingClass,castingStat:sp.castingStat,
 castingTime:sp.castingTime,rangeFt:sp.rangeFt,specialArcana:sp.specialArcana
}));
const actor={id:'a',name:'Осквернённый',characterId:h.characterId,ownerPeerId:'p1',type:'hero',team:'party',hp:30,maxHp:40,ac:12,turnResources:{action:true,bonusAction:true,reaction:true,movement:30,movementUsed:0}};
const target={id:'b',name:'Чудовище',type:'monster',team:'enemy',hp:150,maxHp:150,ac:10};
const tokens={bt_a:{x:0,y:0,size:1},bt_b:{x:1,y:0,size:1}},battle={tokens};
g.DNDBattleBoard={ensure:()=>battle,findToken:k=>tokens[k],tokenList:()=>Object.values(tokens),distanceFt:(a,b)=>Math.abs(a.x-b.x)*5,pathCost:(a,b)=>Math.abs(a.x-b.x)*5,lineOfSight:()=>({clear:true,cover:0})};
g.currentChar={id:'master',initiativeTracker:{round:1,activeIndex:0,combatants:[actor,target],battlefield:battle}};g.currentCharacter=g.currentChar;
g.autoSaveCurrentCharacter=()=>{};g.renderInitiativeTracker=()=>{};g.dndRenderCombatV3=()=>{};g.dndNetworkGameplayRender=()=>{};
let handler;const outcomes=[],peers={p1:{profile:h}};
g.dndNetwork={state:{role:'host'},getPeer:id=>peers[id],roster:()=>[],registerActionHandler:fn=>handler=fn,sendActionResult:(id,req,r)=>outcomes.push(r),commitHostEvent:()=>({seq:1})};
g.addEventListener=(type,fn)=>{if(type==='DOMContentLoaded')fn();};
vm.runInContext(fs.readFileSync(path.join(root,'app/network_gameplay.js'),'utf8'),g,{filename:'app/network_gameplay.js'});
assert(handler);
const use=(name,id,type='CAST_SPELL')=>{handler('p1',{type,requestId:id,payload:{spellName:name,targetId:'b',type:'CAST_SPELL'}});return outcomes.at(-1);};
const prep=use(revealed.name,'prepare-arcana','PREPARE_ACTION');assert.strictEqual(prep.ok,false,'special arcana cannot be delayed without reservation checks');
assert.strictEqual(h.pactMagicData.used,0);
let r=use(revealed.name,'first-revealed');
assert.strictEqual(r.ok,true,JSON.stringify(r));
assert.strictEqual(r.slot.kind,'pact','Revealed Arcana spends real pact slot');
assert.strictEqual(h.pactMagicData.used,1);
assert.strictEqual(h.classFeaturesState.bhRevealedArcanaUsed,true);
assert(target.hp<150,'real spell rolls against real target HP');
actor.turnResources.action=true;
const repeat=use(revealed.name,'repeated-revealed');
assert.strictEqual(repeat.ok,false,'Revealed Arcana is once per long rest');
assert.strictEqual(h.pactMagicData.used,1,'failed repeated cast cannot spend second slot');
actor.turnResources.action=true;const before=h.pactMagicData.used;
r=use(unsealed.name,'first-unsealed');
assert.strictEqual(r.ok,true,JSON.stringify(r));assert.strictEqual(r.slot.kind,'arcana-free');
assert.strictEqual(h.pactMagicData.used,before,'Unsealed Arcana does not spend Pact Magic');
assert.strictEqual(h.classFeaturesState.bhUnsealedArcanaUsed,true);
actor.turnResources.action=true;assert.strictEqual(use(unsealed.name,'second-unsealed').ok,false,'Unsealed Arcana cannot be spammed');
C.restore(h,'short');assert.strictEqual(h.classFeaturesState.bhRevealedArcanaUsed,true);
assert.strictEqual(h.classFeaturesState.bhUnsealedArcanaUsed,true);
C.restore(h,'long');assert.strictEqual(H.arcanaInfo(h,'revealedArcana').used,false);
assert.strictEqual(H.arcanaInfo(h,'unsealedArcana').used,false);
actor.turnResources.action=true;r=use(revealed.name,'after-long-rest');assert.strictEqual(r.ok,true,JSON.stringify(r));
assert.strictEqual(h.classFeaturesState.bhRevealedArcanaUsed,true);

// Invalid class spell metadata cannot be passed as arbitrary patron arcana.
actor.turnResources.action=true;
h.spells.push({name:'Поддельное чудо (Fireball)',level:3,specialArcana:'unsealedArcana',castingClass:H.CLASS,castingStat:'int',damage:'8d6',castingTime:'1 действие'});
assert.strictEqual(use('Поддельное чудо (Fireball)','forged-arcana').ok,false);
console.log('PASS: patron-specific Arcana catalogue, Pact/free slots, use limits, rests and forged-source rejection');
