/** Tactical Tarot effects on the real board, attack and initiative engines. */
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),crypto=require('node:crypto');
const {runtime,hero}=require('./helpers/class_runtime_harness');
function setup(){const g=runtime();g.crypto=crypto.webcrypto;for(const f of ['predictor_cards.js','battle_board.js'])vm.runInContext(fs.readFileSync(__dirname+'/../app/'+f,'utf8'),g);const h=hero('Предсказатель',17,'Шулер');g.DNDPredictor.initialize(h);h.initiativeTracker={round:1,activeIndex:0,combatants:[{id:'own',characterId:h.id,name:h.name,type:'hero',hp:30,maxHp:40,initiative:10},{id:'enemy',name:'Враг',type:'enemy',hp:100,maxHp:100,ac:10,initiative:14,saveBonuses:{wis:0}},{id:'ally',name:'Друг',type:'hero',hp:20,maxHp:20,initiative:5}],battlefield:{cols:12,rows:10,cellFt:5,tokens:{bt_own:{id:'bt_own',sourceId:'own',x:0,y:0,size:1},bt_ally:{id:'bt_ally',sourceId:'ally',x:1,y:0,size:1},bt_enemy:{id:'bt_enemy',sourceId:'enemy',x:2,y:0,size:1}},obstacles:{},walls:[],cover:{}}};g.currentChar=h;return {g,h,c:g.DNDPredictorCards,b:g.DNDCombat,a:g.DNDPredictor};}
function hold(h,id){const s=h.predictorState,d=id.startsWith('major_')?'major':'minor',i=s.decks[d].indexOf(id);assert(i>=0);s.decks[d].splice(i,1);s.hand.push(id);}
function play(c,h,id,extra={}){return c.play(h,id,{operationId:'tactics:'+id,expectedRevision:h.predictorState.revision,...extra});}
function tools(g){vm.runInContext(fs.readFileSync(__dirname+'/../app/dnd_tools.js','utf8'),g);g.ensureDndToolsState=()=>{};g._dndSave=()=>{};g.renderInitiativeTracker=()=>{};g.syncDndNetworkInitiative=()=>{};}
function owner(h){return h.initiativeTracker.combatants.find(t=>t.characterId===h.id);}
function enemy(h){return h.initiativeTracker.combatants.find(t=>t.id==='enemy');}
let n=0;function test(name,fn){fn();n++;console.log('PASS '+name);}
test('Emperor forces an actual WIS save before attack roll, spending the attack on a failure',()=>{
 const {g,h,c,b}=setup();hold(h,'major_04');assert(play(c,h,'major_04').ok);const before=h.hpCurrent;const result=b.attack(enemy(h),h,{bonus:100,damage:'1d8',damageType:'огонь',useRules:false});assert(result.wardDenied);assert(!result.hit);assert.equal(result.ward.save.stat,'wis');assert.equal(h.hpCurrent,before);assert.equal(h.predictorState.majorSpent,1);
 g.Math.random=()=>.99;const hit=b.attack(enemy(h),h,{bonus:100,damage:'1d8',damageType:'огонь',useRules:false});assert(hit.hit);assert(h.hpCurrent<before);
});
test('Emperor loses its guard on concentration loss and only restricts Hide/Disengage for the cast turn',()=>{
 const {g,h,c,b}=setup();h.classes.push({name:'Плут',level:2});hold(h,'major_04');assert(play(c,h,'major_04').ok);h.turnResources.bonusAction=1;assert(!g.DNDClassFeatures.useFeature(h,'cunningAction',{kind:'hide'}).ok);assert.equal(h.turnResources.bonusAction,1);assert(c.blocked(h,'disengage'));c.turnEnd(h);assert(!c.blocked(h,'hide'));assert(g.DNDClassFeatures.useFeature(h,'cunningAction',{kind:'hide'}).ok);assert(c.beforeAttack(enemy(h),h).allowed===false);b.breakConcentration(h);assert(c.beforeAttack(enemy(h),h).allowed);
});
test('Four Pentacles affects actual AC and enforces shared Help/transfer restrictions only while concentrated',()=>{
 const {g,h,c,b}=setup();hold(h,'pentacles_04');assert(play(c,h,'pentacles_04').ok);assert.equal(c.incoming(h).ac,3);assert(c.blocked(h,'help'));assert(c.blocked(h,'transfer'));g.Math.random=()=>.5;let result=b.attack(enemy(h),h,{bonus:0,useRules:false});assert.equal(result.ac,13);assert(!result.hit);b.breakConcentration(h);assert(!c.blocked(h,'help'));assert(!c.blocked(h,'transfer'));result=b.attack(enemy(h),h,{bonus:0,useRules:false});assert.equal(result.ac,10);assert(result.hit);
});
test('Five Pentacles protects the caster until the caster attempts a hostile attack, even if it misses',()=>{
 const {h,c,b}=setup();hold(h,'pentacles_05');assert(play(c,h,'pentacles_05').ok);assert(b.attack(enemy(h),h,{bonus:100,useRules:false}).wardDenied);const miss=b.attack(h,{id:'miss',hp:30,maxHp:30,ac:99},{bonus:0,useRules:false});assert(!miss.hit);assert(!h.tarotEffects.some(e=>e.id==='pentacles_05'));assert(!h.concentration.active);assert(!b.attack(enemy(h),h,{bonus:100,useRules:false}).wardDenied);
});
test('Five Pentacles ends on hostile card effects and area damage, while a failed card transaction preserves it',()=>{
 const {h,c}=setup();hold(h,'pentacles_05');assert(play(c,h,'pentacles_05').ok);h.turnResources.bonusAction=1;hold(h,'swords_05');const before=JSON.stringify(h);assert(!play(c,h,'swords_05',{targetId:'ally'}).ok);assert.equal(JSON.stringify(h),before);assert(play(c,h,'swords_05',{targetId:'enemy'}).ok);assert(!h.tarotEffects.some(e=>e.id==='pentacles_05'));
 const other=setup();hold(other.h,'pentacles_05');assert(play(other.c,other.h,'pentacles_05').ok);hold(other.h,'swords_10');assert(play(other.c,other.h,'swords_10').ok);assert(!other.h.tarotEffects.some(e=>e.id==='pentacles_05'));
});
test('replacing ward concentration never leaves two active attack-save shields',()=>{
 const {h,c}=setup();hold(h,'major_04');assert(play(c,h,'major_04').ok);h.turnResources.bonusAction=1;hold(h,'pentacles_05');assert(play(c,h,'pentacles_05').ok);const denied=c.beforeAttack(enemy(h),h);assert.equal(denied.cardId,'pentacles_05');c.advanceTime(h,60);assert(c.beforeAttack(enemy(h),h).allowed);assert(!h.concentration.active);
});
test('Three Pentacles gives the caster and chosen ally +2 only against enemies next to that ally',()=>{
 const {g,h,c,b}=setup();hold(h,'pentacles_03');assert(play(c,h,'pentacles_03',{targetId:'ally'}).ok);g.Math.random=()=>.5;assert.equal(b.attack(h,enemy(h),{useRules:false}).classBonus,2);const ally=h.initiativeTracker.combatants.find(t=>t.id==='ally');assert.equal(b.attack(ally,enemy(h),{useRules:false}).classBonus,2);h.initiativeTracker.battlefield.tokens.bt_enemy.x=5;assert.equal(b.attack(h,enemy(h),{useRules:false}).classBonus,0);assert.equal(b.attack(h,ally,{useRules:false}).classBonus,0);
});
test('team bonus survives another participant end but expires for both at source own end',()=>{
 const {h,c}=setup();hold(h,'pentacles_03');assert(play(c,h,'pentacles_03',{targetId:'ally'}).ok);const ally=h.initiativeTracker.combatants.find(t=>t.id==='ally');c.turnEnd(ally);assert(ally.tarotEffects.some(e=>e.id==='pentacles_03'));const saved=JSON.parse(JSON.stringify(h));c.turnEnd(saved);assert(!saved.tarotEffects.some(e=>e.id==='pentacles_03'));assert(!saved.initiativeTracker.combatants.find(t=>t.id==='ally').tarotEffects.some(e=>e.id==='pentacles_03'));
});
test('Six Swords teleports two consenting creatures atomically without walking or opportunity attacks',()=>{
 const {h,c}=setup();hold(h,'swords_06');h.turnResources.movementUsed=20;const result=play(c,h,'swords_06',{destination:{x:3,y:1},teleportAllyId:'ally',allyWilling:true,allyDestination:{x:4,y:1}});assert(result.ok,result.reason);assert(result.result.noOpportunityAttacks);assert.equal(h.initiativeTracker.battlefield.tokens.bt_own.x,3);assert.equal(h.initiativeTracker.battlefield.tokens.bt_ally.x,4);assert.equal(h.position.x,3);assert.equal(owner(h).position.x,3);assert.equal(h.turnResources.movementUsed,20);assert.equal(h.turnResources.bonusAction,0);assert(h.predictorState.discard.minor.includes('swords_06'));
});
test('teleport rejects occupied, remote, invisible, overlapping and unsafe cells without touching anything',()=>{
 const cases=[{destination:{x:2,y:0}},{destination:{x:10,y:0}},{destination:{x:-1,y:0}},{destination:{x:1.5,y:0}},{destination:{x:3,y:0},teleportAllyId:'ally',allyWilling:true,allyDestination:{x:3,y:0}},{destination:{x:3,y:0},teleportAllyId:'ally',allyWilling:false,allyDestination:{x:4,y:0}}];
 for(const request of cases){const {h,c}=setup();hold(h,'swords_06');const before=JSON.stringify(h);assert(!play(c,h,'swords_06',request).ok);assert.equal(JSON.stringify(h),before);}
 const {h,c}=setup();hold(h,'swords_06');h.initiativeTracker.battlefield.obstacles['3:0']=true;let before=JSON.stringify(h);assert(!play(c,h,'swords_06',{destination:{x:3,y:0}}).ok);assert.equal(JSON.stringify(h),before);h.initiativeTracker.battlefield.obstacles={};h.initiativeTracker.battlefield.walls=['0:0|1:0'];before=JSON.stringify(h);assert(!play(c,h,'swords_06',{destination:{x:3,y:0}}).ok);assert.equal(JSON.stringify(h),before);
});
test('LOS against a draft never reads or modifies the unrelated global battlefield',()=>{
 const {g,h,c}=setup();hold(h,'swords_06');g.currentChar={id:'other',initiativeTracker:{battlefield:{cols:1,rows:1,tokens:{},obstacles:{'0:0':true}}}};const unrelated=JSON.stringify(g.currentChar);assert(play(c,h,'swords_06',{destination:{x:3,y:1}}).ok);assert.equal(JSON.stringify(g.currentChar),unrelated);
});
test('Page Wands changes initiative on the next round once, without resorting the current round',()=>{
 const {g,h,c}=setup();hold(h,'wands_11');assert(play(c,h,'wands_11').ok);assert.equal(owner(h).initiative,10);assert.equal(h.initiativeTracker.combatants[0].id,'own');tools(g);g.nextInitiativeTurn();assert.equal(h.initiativeTracker.activeIndex,1);assert.equal(owner(h).initiative,10);g.nextInitiativeTurn();assert.equal(owner(h).initiative,10);g.nextInitiativeTurn();assert.equal(h.initiativeTracker.round,2);assert.equal(owner(h).initiative,15);assert.equal(h.initiativeTracker.combatants[0].id,'own');c.roundStart(h);assert.equal(owner(h).initiative,15);
});
test('pending initiative survives reload and also resolves through the alternate Gameplay Core',()=>{
 const {g,h,c}=setup();hold(h,'wands_11');assert(play(c,h,'wands_11').ok);const saved=JSON.parse(JSON.stringify(h));g.currentChar=saved;vm.runInContext(fs.readFileSync(__dirname+'/../app/gameplay_core_v57.js','utf8'),g);assert(g.DNDGameplayV57.endTurn().ok);assert(g.DNDGameplayV57.endTurn().ok);assert(g.DNDGameplayV57.endTurn().ok);assert.equal(saved.initiativeTracker.round,2);assert.equal(owner(saved).initiative,15);assert.equal(saved.initiativeTracker.combatants[saved.initiativeTracker.activeIndex].id,'own');assert.equal(saved.turnResources.actions,1);
});
test('an attack denied by the Emperor still consumes the attacker action through the actual combat UI engine',()=>{
 const {g,h,c}=setup();hold(h,'major_04');assert(play(c,h,'major_04').ok);h.initiativeTracker.activeIndex=1;vm.runInContext(fs.readFileSync(__dirname+'/../app/gameplay_core_v57.js','utf8'),g);g.DNDGameplayV57.startTurn();const first=g.DNDGameplayV57.executeAttack(enemy(h),owner(h),{bonus:100,damage:'1d8',useRules:false});assert(first.wardDenied);assert.equal(enemy(h).turnResources.action,false);assert(!g.DNDGameplayV57.executeAttack(enemy(h),owner(h),{bonus:100,damage:'1d8',useRules:false}).ok);assert.equal(h.hpCurrent,30);
});
test('large creature teleport checks its full footprint and missing companion data cannot partially move the owner',()=>{
 const {h,c}=setup();hold(h,'swords_06');h.initiativeTracker.battlefield.tokens.bt_own.size=2;const before=JSON.stringify(h);assert(!play(c,h,'swords_06',{destination:{x:11,y:1}}).ok);assert.equal(JSON.stringify(h),before);assert(!play(c,h,'swords_06',{destination:{x:3,y:1},teleportAllyId:'ally',allyWilling:true}).ok);assert.equal(JSON.stringify(h),before);
});
console.log('PREDICTOR_TACTICS_CARDS_OK: '+n+' scenarios');
