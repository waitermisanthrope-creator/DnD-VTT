const assert=require('assert'),fs=require('fs'),vm=require('vm'),path=require('path');
const {runtime,hero,root}=require('./helpers/class_runtime_harness');
const g=runtime(),C=g.DNDClassFeatures,H=g.DNDBloodHunter;
g.Math.random=()=>0.6;
g.getAllSpellsDatabase=()=>[
 {name:'Кантрип А',level:0,classes:['Колдун'],damage:'1d6',damageType:'fire',attackType:'spell',rangeFt:60},
 {name:'Кантрип Б',level:0,classes:['Колдун'],damage:'1d6'},
 {name:'Пакт 1',level:1,classes:['Колдун'],damage:'1d6'},
 {name:'Пакт 2',level:1,classes:['Колдун'],damage:'1d6'},
 {name:'Пакт 3',level:1,classes:['Колдун'],damage:'1d6'},
 {name:'Пакт 4',level:2,classes:['Колдун'],damage:'2d6'}];
function hunter(){
 const h=hero(H.CLASS,7,'Орден осквернённых душ');h.id='mystic-hero';h.characterId='mystic-hero';
 h.weapons=[{id:'blade',name:'Клинок',damageDice:'1d6',damageType:'slashing',rangeFt:5}];
 C.buildFeatureSet(h);
 assert(C.useFeature(h,'otherworldlyPatron',{className:H.CLASS,patron:'fiend'}).ok);
 assert(C.useFeature(h,'chooseProfaneSpells',{className:H.CLASS,cantrips:['Кантрип А','Кантрип Б'],spells:['Пакт 1','Пакт 2','Пакт 3','Пакт 4']}).ok);
 C.resetTurn(h);return h;
}
let h=hunter(),foe=hero('Воин',1);foe.id='mystic-foe';foe.ac=10;foe.hpCurrent=40;foe.hpMax=40;
const strike=(h,t)=>C.useFeature(h,'mysticFrenzy',{className:H.CLASS,target:t,weaponId:'blade',distanceFt:5});
assert.strictEqual(strike(h,foe).ok,false,'bonus attack cannot happen before actual cantrip cast');
assert.strictEqual(H.recordCantripCast(h,{spellName:'Кантрип А',spellLevel:0,usedAction:false}),false);
assert.strictEqual(H.recordCantripCast(h,{spellName:'Чужой заговор',spellLevel:0,usedAction:true}),false);
assert.strictEqual(H.recordCantripCast(h,{spellName:'Кантрип А',spellLevel:0,usedAction:true}),true);
assert.strictEqual(h.classFeaturesState.bhMysticFrenzyReady,true);
assert(H.renderControls(h).includes('Атака после заговора'));
let hp=foe.hpCurrent,result=strike(h,foe);
assert(result.ok&&result.attack&&result.attack.hit,'real bonus attack must hit');
assert(foe.hpCurrent<hp);
assert.strictEqual(h.turnResources.bonusAction,false);
assert.strictEqual(h.classFeaturesState.bhMysticFrenzyReady,false);
assert.strictEqual(strike(h,foe).ok,false,'no repeat attack from same cast');
C.resetTurn(h);
assert.strictEqual(h.classFeaturesState.bhMysticFrenzyReady,false,'new turn clears unused window');
const saved=JSON.parse(JSON.stringify(h));C.buildFeatureSet(saved);assert.strictEqual(saved.classFeaturesState.bhMysticFrenzyReady,false);

// Host end-to-end: casting the known cantrip first consumes the Action, then
// a separate authenticated scoped feature consumes Bonus Action and damages target.
h=hunter();
const actor={id:'a',characterId:h.id,ownerPeerId:'p1',name:'Осквернённая душа',type:'hero',team:'party',hp:30,maxHp:40,ac:12,turnResources:{action:true,bonusAction:true,reaction:true,movement:30,movementUsed:0}};
const target={id:'b',name:'Гоблин',type:'monster',team:'enemy',hp:40,maxHp:40,ac:10};
const tokens={bt_a:{x:0,y:0,size:1},bt_b:{x:1,y:0,size:1}},battle={tokens};
g.DNDBattleBoard={ensure:()=>battle,findToken:k=>tokens[k],tokenList:()=>Object.values(tokens),distanceFt:(a,b)=>Math.abs(a.x-b.x)*5,pathCost:(a,b)=>Math.abs(a.x-b.x)*5,lineOfSight:()=>({clear:true,cover:0})};
g.currentChar={id:'master',initiativeTracker:{round:1,activeIndex:0,combatants:[actor,target],battlefield:battle}};g.currentCharacter=g.currentChar;
g.autoSaveCurrentCharacter=()=>{};g.renderInitiativeTracker=()=>{};g.dndRenderCombatV3=()=>{};g.dndNetworkGameplayRender=()=>{};
h.spells=h.spellsData.map(s=>({...s,castingClass:H.CLASS,castingStat:'int',rangeFt:s.rangeFt||60,castingTime:'1 действие'}));
let handler;const results=[];const peers={p1:{profile:h}};
g.dndNetwork={state:{role:'host'},getPeer:id=>peers[id],roster:()=>[],registerActionHandler:fn=>handler=fn,sendActionResult:(id,req,res)=>results.push(res),commitHostEvent:()=>({seq:1})};
g.addEventListener=(name,fn)=>{if(name==='DOMContentLoaded')fn();};
vm.runInContext(fs.readFileSync(path.join(root,'app/network_gameplay.js'),'utf8'),g,{filename:'app/network_gameplay.js'});
assert(handler);
handler('p1',{type:'USE_FEATURE',requestId:'premature',payload:{featureId:'mysticFrenzy',className:H.CLASS,targetId:'b',weaponId:'blade'}});
assert.strictEqual(results.at(-1).ok,false,'host must reject bonus attack before cantrip');
handler('p1',{type:'CAST_SPELL',requestId:'cantrip',payload:{spellName:'Кантрип А',targetId:'b'}});
assert.strictEqual(results.at(-1).ok,true,JSON.stringify(results.at(-1)));
assert.strictEqual(results.at(-1).mysticFrenzyReady,true);
assert.strictEqual(h.classFeaturesState.bhMysticFrenzyReady,true);
assert.strictEqual(actor.turnResources.action,false);
hp=target.hp;
handler('p1',{type:'USE_FEATURE',requestId:'frenzy',payload:{featureId:'mysticFrenzy',className:H.CLASS,targetId:'b',weaponId:'blade',distanceFt:999}});
assert.strictEqual(results.at(-1).ok,true,JSON.stringify(results.at(-1)));
assert(target.hp<hp,'host bonus attack applies real target HP damage');
assert.strictEqual(actor.turnResources.bonusAction,false);
assert.strictEqual(h.classFeaturesState.bhMysticFrenzyReady,false);
handler('p1',{type:'USE_FEATURE',requestId:'frenzy-repeat',payload:{featureId:'mysticFrenzy',className:H.CLASS,targetId:'b',weaponId:'blade'}});
assert.strictEqual(results.at(-1).ok,false);
console.log('PASS: Mystic Frenzy only after real Action cantrip in local and host authoritative combat');
