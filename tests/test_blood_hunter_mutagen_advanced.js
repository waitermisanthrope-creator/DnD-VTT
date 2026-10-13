const assert=require('assert'),fs=require('fs'),vm=require('vm'),path=require('path');
const {runtime,hero,root}=require('./helpers/class_runtime_harness');
const g=runtime(),C=g.DNDClassFeatures,B=g.DNDCombat,H=g.DNDBloodHunter;
let id=0;function mutant(level=11){const h=hero('Кровавый охотник',level,'Орден мутантов');h.id='mutant-'+(++id);h.weapons=[{id:'blade',name:'Клинок',damageDice:'1d6',damageType:'slashing',rangeFt:5}];C.buildFeatureSet(h);return h;}
function activate(h,formula){assert(C.useFeature(h,'chooseMutagenFormulas',{className:H.CLASS,formulas:[formula]}).ok);assert(C.useFeature(h,'prepareMutagens',{className:H.CLASS,mutagens:[formula]}).ok);const r=C.useFeature(h,'mutagencraft',{className:H.CLASS,mutagen:formula});assert(r.ok,formula+': '+JSON.stringify(r));}
g.Math.random=()=>0.6;
let h=mutant();activate(h,'aether');assert.strictEqual(h.flySpeed,20,'Aether grants 20-ft flight');
C.buildFeatureSet(h);assert.strictEqual(h.flySpeed,20,'sync must not accumulate flight');
const saved=JSON.parse(JSON.stringify(h));C.buildFeatureSet(saved);assert.strictEqual(saved.flySpeed,20);
C.resetTurn(h);assert(C.useFeature(h,'flushMutagens',{className:H.CLASS}).ok);
assert.strictEqual(h.flySpeed,undefined,'clearing Aether must restore the prior flight speed');
h=mutant();h.flySpeed=40;activate(h,'aether');assert.strictEqual(h.flySpeed,40,'Aether must not weaken existing flight');
C.restore(h,'short');assert.strictEqual(h.flySpeed,40,'rest restores innate flight');

h=mutant();h.darkvisionFt=30;activate(h,'nighteye');assert.strictEqual(h.darkvisionFt,90);
C.buildFeatureSet(h);assert.strictEqual(h.darkvisionFt,90,'Nighteye stacking must not inflate vision');
const persisted=JSON.parse(JSON.stringify(h));C.buildFeatureSet(persisted);assert.strictEqual(persisted.darkvisionFt,90);
C.restore(h,'short');assert.strictEqual(h.darkvisionFt,30,'Nighteye exit restores racial vision');

h=mutant();activate(h,'cruelty');C.resetTurn(h);
let foe=hero('Воин',1);foe.id='cruelty-foe';foe.ac=10;foe.hpCurrent=40;foe.hpMax=40;
const hp=foe.hpCurrent;
let r=C.useFeature(h,'mutagenCrueltyAttack',{className:H.CLASS,target:foe,weaponId:'blade',distanceFt:5});
assert(r.ok&&r.attack,'Cruelty grants an actual bonus-weapon attack');
assert(foe.hpCurrent<hp,'Cruelty deals real damage');
assert.strictEqual(h.turnResources.bonusAction,false);
assert.strictEqual(C.useFeature(h,'mutagenCrueltyAttack',{className:H.CLASS,target:foe,weaponId:'blade',distanceFt:5}).ok,false,'bonus action cannot be spent twice');
C.resetTurn(h);const prior=foe.hpCurrent;
assert.strictEqual(C.useFeature(h,'mutagenCrueltyAttack',{className:H.CLASS,target:foe,weaponId:'forged',distanceFt:5}).ok,false,'must own selected weapon');
assert.strictEqual(foe.hpCurrent,prior);

h=mutant();activate(h,'vermillion');assert.strictEqual(H.deathSaveMode(h),'disadvantage');
C.resetTurn(h);let ignored=C.useFeature(h,'strangeMetabolism',{className:H.CLASS,mutagen:'vermillion'});
assert(ignored.ok);assert.strictEqual(H.deathSaveMode(h),'normal','suppressed mutagen downside should not affect Death Save');
for(let i=0;i<10;i++)C.onTurnEnd(h);
assert.strictEqual(H.deathSaveMode(h),'disadvantage','after suppression ends downside returns');
C.restore(h,'short');assert.strictEqual(H.deathSaveMode(h),'normal');

// The host's death-save RPC uses the real disadvantage dice mode.
h=mutant();activate(h,'vermillion');h.characterId=h.id;
const actor={id:'dieing',characterId:h.id,name:'Мутант',ownerPeerId:'p1',type:'hero',hp:0,maxHp:40,defeated:true,deathSaves:{successes:0,failures:0},turnResources:{action:true}};
g.currentChar={id:'master',initiativeTracker:{round:1,activeIndex:0,combatants:[actor]}};
g.currentCharacter=g.currentChar;g.renderInitiativeTracker=()=>{};g.dndRenderCombatV3=()=>{};g.dndNetworkGameplayRender=()=>{};g.autoSaveCurrentCharacter=()=>{};
let handler;const results=[],modes=[];
g.DNDRules.rollD20=mode=>{modes.push(mode);return {result:9,critical:false,fumble:false};};
g.dndNetwork={state:{role:'host'},getPeer:id=>id==='p1'?{profile:h}:null,roster:()=>[],registerActionHandler:fn=>handler=fn,sendActionResult:(id,req,res)=>results.push(res),commitHostEvent:()=>({seq:1})};
g.addEventListener=(type,fn)=>{if(type==='DOMContentLoaded')fn();};
vm.runInContext(fs.readFileSync(path.join(root,'app/network_gameplay.js'),'utf8'),g,{filename:'app/network_gameplay.js'});
assert(handler);
handler('p1',{type:'DEATH_SAVE',requestId:'vermillion-save',payload:{}});
assert.deepStrictEqual(modes,['disadvantage']);
assert.strictEqual(results.at(-1).mode,'disadvantage');
assert.strictEqual(actor.deathSaves.failures,1);
console.log('PASS: Aether flight, Nighteye sight, Cruelty attack and Vermillion host death-save disadvantage');
