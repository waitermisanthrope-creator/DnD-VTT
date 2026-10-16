/** Shared combat integration, not a simulated copy of Tarot effect handlers. */
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),crypto=require('node:crypto');
const {runtime,hero}=require('./helpers/class_runtime_harness');
function setup(){const g=runtime();g.crypto=crypto.webcrypto;vm.runInContext(fs.readFileSync(__dirname+'/../app/predictor_cards.js','utf8'),g);const h=hero('Предсказатель',17,'Шулер');g.DNDPredictor.initialize(h);h.position={x:0,y:0};h.initiativeTracker={round:1,activeIndex:0,combatants:[{id:'owner',characterId:h.id,name:h.name,type:'hero',hp:30,maxHp:40},{id:'enemy',type:'enemy',hp:50,maxHp:50,position:{x:1,y:0},turnResources:{reaction:1}}]};return {g,h,a:g.DNDPredictor,c:g.DNDPredictorCards};}
function deal(h,id){const s=h.predictorState,d=id.startsWith('major_')?'major':'minor',i=s.decks[d].indexOf(id);assert(i>=0);s.decks[d].splice(i,1);s.hand.push(id);}
function play(c,h,id,extra={}){return c.play(h,id,{operationId:'use:'+id,expectedRevision:h.predictorState.revision,...extra});}
function ally(h,extra={}){const t={id:'ally',type:'hero',name:'Союзник',hp:10,maxHp:20,position:{x:2,y:0},...extra};h.initiativeTracker.combatants.push(t);return t;}
function tools(g,h){g.currentChar=h;vm.runInContext(fs.readFileSync(__dirname+'/../app/dnd_tools.js','utf8'),g);g.ensureDndToolsState=()=>{};g._dndSave=()=>{};g.renderInitiativeTracker=()=>{};g.syncDndNetworkInitiative=()=>{};}
function gameplay(g,h){g.currentChar=h;vm.runInContext(fs.readFileSync(__dirname+'/../app/gameplay_core_v57.js','utf8'),g);return g.DNDGameplayV57;}
let n=0;function test(name,fn){fn();n++;console.log('PASS '+name);}
test('Five Swords grants two real class reactions, not two flags that are both lost on first use',()=>{
 const {g,h,c}=setup();deal(h,'swords_05');assert(play(c,h,'swords_05',{targetId:'enemy'}).ok);assert.equal(h.turnResources.reaction,2);assert(c.blocked(h.initiativeTracker.combatants[1],'reaction'));
 const ctx={source:'attack',amount:10,attackTotal:12,targetAc:10};
 assert(g.DNDClassFeatures.resolveReaction(h,'shield',ctx).ok);assert.equal(h.turnResources.reaction,1);assert.equal(h.initiativeTracker.combatants[0].turnResources.reaction,1);assert.equal(h.tarotEffects.find(e=>e.id==='swords_05').extraReactions,0);
 assert(g.DNDClassFeatures.resolveReaction(h,'shield',ctx).ok);assert.equal(h.turnResources.reaction,0);assert(!g.DNDClassFeatures.resolveReaction(h,'shield',ctx).ok);
});
test('reaction denial is honored by common menus and expires at target own start',()=>{
 const {g,h,c}=setup();deal(h,'swords_05');assert(play(c,h,'swords_05',{targetId:'enemy'}).ok);let t=h.initiativeTracker.combatants[1];t.turnResources.reaction=1;t.spellSlotsData={1:{max:2,used:0}};
 assert.equal(g.DNDClassFeatures.reactionOptions(t,{source:'attack',amount:10,attackTotal:12,targetAc:10}),null);
 assert(c.participantTurnStart(h,'enemy','enemy:2').ok);t=h.initiativeTracker.combatants[1];assert(!c.blocked(t,'reaction'));assert.equal(t.turnResources.reaction,true);
});
test('unused temporary reaction expires before base resources reset; repeated start cannot refill',()=>{
 const {h,c}=setup();deal(h,'swords_05');assert(play(c,h,'swords_05',{targetId:'enemy'}).ok);const saved=JSON.parse(JSON.stringify(h));assert(c.turnStart(saved,'own:2',true).ok);assert.equal(saved.turnResources.reaction,1);assert(!saved.tarotEffects.some(e=>e.id==='swords_05'));saved.turnResources.reaction=0;const before=JSON.stringify(saved);assert(!c.turnStart(saved,'own:2',true).ok);assert.equal(JSON.stringify(saved),before);
});
test('Seven Pentacles grants exactly one extra action through real initiative after reload',()=>{
 const {g,h,c}=setup();deal(h,'pentacles_07');deal(h,'pentacles_09');assert(play(c,h,'pentacles_07').ok);assert.equal(h.turnResources.actions,0);const saved=JSON.parse(JSON.stringify(h));tools(g,saved);g.nextInitiativeTurn();assert.equal(saved.turnResources.actions,0);g.nextInitiativeTurn();assert.equal(saved.turnResources.actions,2);assert.equal(saved.initiativeTracker.combatants[0].turnResources.actions,2);assert(!saved.tarotEffects.some(e=>e.id==='pentacles_07'));
 // Consume both real actions with two held action cards; no one-card-per-turn rule.
 deal(saved,'cups_11');deal(saved,'major_02');assert(play(c,saved,'cups_11',{advice:'weakestEnemy'}).ok);assert.equal(saved.turnResources.actions,1);assert(play(c,saved,'major_02',{targetId:saved.id,reveal:'ac'}).ok);assert.equal(saved.turnResources.actions,0);
});
test('pending extra action is removed when encounter is cleared, never banked for another battle',()=>{
 const {g,h,c}=setup();deal(h,'pentacles_07');assert(play(c,h,'pentacles_07').ok);tools(g,h);g.confirm=()=>true;g.clearInitiativeTracker();assert(!h.tarotEffects.some(e=>e.id==='pentacles_07'));h.initiativeTracker={round:1,activeIndex:0,combatants:[{id:'new',characterId:h.id}]};assert(c.turnStart(h,'new:1',true).ok);assert.equal(h.turnResources.actions,1);
});
test('action cards reject an enemy turn atomically',()=>{
 const {h,c}=setup();deal(h,'pentacles_09');h.initiativeTracker.activeIndex=1;const before=JSON.stringify(h);assert(!play(c,h,'pentacles_09').ok);assert.equal(JSON.stringify(h),before);
});
test('legacy owner initiative entry remains usable without counting the caster twice',()=>{
 const {h,c}=setup();delete h.initiativeTracker.combatants[0].characterId;deal(h,'pentacles_07');assert(play(c,h,'pentacles_07').ok);assert.equal(h.initiativeTracker.combatants[0].turnResources.actions,0);
});
test('Six Pentacles restores a spent first-level slot and pays HP without damage events or temp HP',()=>{
 const {h,c,g}=setup();deal(h,'pentacles_06');ally(h,{spellSlotsData:{1:{max:4,used:2}}});h.hpTemp=12;h.resistances=['сила'];g.DNDCombat.beginConcentration(h,{id:'existing',name:'Existing',concentration:true});
 const r=play(c,h,'pentacles_06',{willingTargetIds:['ally']});assert(r.ok,r.reason);assert.equal(r.result.restored,'slot:1');assert.equal(h.initiativeTracker.combatants[2].spellSlotsData[1].used,1);assert.equal(h.hpCurrent,25);assert.equal(h.hpTemp,12);assert(h.concentration.active);
});
test('Six Pentacles uses a supported ability point only if a slot was not restored',()=>{
 const {h,c}=setup();deal(h,'pentacles_06');ally(h,{spellSlotsData:{1:{max:4,used:0}},resources:{ki:{max:3,current:1},predictorMajor:{max:8,current:0}}});const r=play(c,h,'pentacles_06',{willingTargetIds:['ally']});assert(r.ok,r.reason);const t=h.initiativeTracker.combatants[2];assert.equal(t.resources.ki.current,2);assert.equal(t.resources.predictorMajor.current,0);assert.equal(h.hpCurrent,25);
});
test('Six Pentacles with a full ally is spent without charging HP; absent consent or invalid range rolls back',()=>{
 const {h,c}=setup();deal(h,'pentacles_06');ally(h,{spellSlotsData:{1:{max:2,used:0}}});let before=JSON.stringify(h);assert(!play(c,h,'pentacles_06').ok);assert.equal(JSON.stringify(h),before);h.initiativeTracker.combatants[2].position.x=20;before=JSON.stringify(h);assert(!play(c,h,'pentacles_06',{willingTargetIds:['ally']}).ok);assert.equal(JSON.stringify(h),before);h.initiativeTracker.combatants[2].position.x=2;const r=play(c,h,'pentacles_06',{willingTargetIds:['ally']});assert(r.ok);assert.equal(r.result.restored,null);assert.equal(h.hpCurrent,30);assert(h.predictorState.discard.minor.includes('pentacles_06'));
});
test('HP cost may drop caster to zero, ends concentration, and cannot invoke Last Trump',()=>{
 const {h,c,g}=setup();deal(h,'pentacles_06');deal(h,'cups_14');ally(h,{resources:{sorceryPoints:{max:3,current:0}}});h.hpCurrent=5;g.DNDCombat.beginConcentration(h,{id:'existing',name:'Existing',concentration:true});assert(play(c,h,'pentacles_06',{willingTargetIds:['ally']}).ok);assert.equal(h.hpCurrent,0);assert.equal(h.turnResources.reaction,1);assert(h.conditions['Бессознателен']);assert(!h.concentration.active);assert(h.predictorState.hand.includes('cups_14'));
});
test('King Swords bypasses weapon physical resistance, preserving immunity and other damage resistances',()=>{
 const {g,h,c}=setup();deal(h,'swords_14');assert(play(c,h,'swords_14').ok);g.Math.random=()=>.5;function hit(type,defenses,weaponAttack=true){const t={hp:100,maxHp:100,ac:10,...defenses};const r=g.DNDCombat.attack(h,t,{useRules:false,bonus:20,damage:'1d8',damageType:type,weaponAttack});assert(r.hit);return 100-t.hp;}
 assert.equal(hit('рубящий',{resistances:['рубящий']}),5);assert.equal(hit('рубящий',{immunities:['рубящий']}),0);assert.equal(hit('огонь',{resistances:['огонь']}),2);assert.equal(hit('рубящий',{resistances:['рубящий']},false),2);g.DNDCombat.breakConcentration(h);assert.equal(hit('рубящий',{resistances:['рубящий']}),2);
});
test('concentration duration expires on saved game time without clearing a newer concentration',()=>{
 const {g,h,c}=setup();deal(h,'swords_14');assert(play(c,h,'swords_14').ok);const saved=JSON.parse(JSON.stringify(h));c.advanceTime(saved,59);assert(saved.concentration.active);assert(c.ignoresResistance(saved,'рубящий',{weaponAttack:true}));c.advanceTime(saved,1);assert(!saved.concentration.active);assert(!c.ignoresResistance(saved,'рубящий',{weaponAttack:true}));g.DNDCombat.beginConcentration(h,{id:'new-spell',name:'New',concentration:true});c.advanceTime(h,60);assert(h.concentration.active);assert.equal(h.concentration.spellId,'new-spell');
});
test('Last Trump spends a temporary reaction first and obeys Tarot reaction denial',()=>{
 const {g,h,c}=setup();deal(h,'swords_05');deal(h,'cups_14');assert(play(c,h,'swords_05',{targetId:'enemy'}).ok);h.hpCurrent=3;g.DNDCombat.applyDamage(h,5,'огонь',{zeroHpReaction:'predictor-last-trump',predictorCardId:'cups_14'});assert.equal(h.hpCurrent,1);assert.equal(h.turnResources.reaction,1);assert.equal(h.tarotEffects.find(e=>e.id==='swords_05').extraReactions,0);
 const other=setup();deal(other.h,'cups_14');other.h.hpCurrent=3;other.h.tarotEffects=[{id:'deny',noReactions:true}];other.g.DNDCombat.applyDamage(other.h,5,'огонь',{zeroHpReaction:'predictor-last-trump',predictorCardId:'cups_14'});assert.equal(other.h.hpCurrent,0);assert(other.h.predictorState.hand.includes('cups_14'));
});
test('alternate Gameplay Core wakes sleep and cannot reset a spent turn by pressing Start again',()=>{
 const {g,h,c}=setup();const core=gameplay(g,h);assert(core.startTurn().ok);h.hpCurrent=10;deal(h,'swords_04');assert(play(c,h,'swords_04').ok);const healing=h.tarotEffects.find(e=>e.sleep).healingAmount;assert(!core.spendAction('action').ok);core.startTurn();assert(c.asleep(h));assert.equal(h.turnResources.actions,0);assert(core.endTurn().ok);assert(core.endTurn().ok);assert.equal(h.hpCurrent,Math.min(40,10+healing));assert(!c.asleep(h));assert(core.spendAction('action').ok);assert.equal(h.turnResources.actions,0);core.startTurn();assert.equal(h.turnResources.actions,0);
 tools(g,h);g.nextInitiativeTurn();g.nextInitiativeTurn();assert.equal(h.turnResources.actions,1);core.startTurn();assert.equal(h.turnResources.actions,1);
});
test('alternate Gameplay Core consumes both granted actions and respects an unresolved draw',()=>{
 const {g,h,c,a}=setup();const core=gameplay(g,h);core.startTurn();deal(h,'pentacles_07');assert(play(c,h,'pentacles_07').ok);assert(core.endTurn().ok);assert(core.endTurn().ok);assert.equal(h.turnResources.actions,2);assert(core.spendAction('action').ok);assert.equal(h.turnResources.actions,1);assert(core.spendAction('action').ok);assert.equal(h.turnResources.actions,0);assert(!core.spendAction('action').ok);core.startTurn();assert.equal(h.turnResources.actions,0);assert(a.offer(h,'minor').ok);const before=JSON.stringify(h);assert(!core.endTurn().ok);assert.equal(JSON.stringify(h),before);
});
test('alternate Gameplay Core shares reaction count and canonical on-hit card consumption',()=>{
 const {g,h,c}=setup();const core=gameplay(g,h);core.startTurn();deal(h,'swords_05');assert(play(c,h,'swords_05',{targetId:'enemy'}).ok);assert(core.spend(h.initiativeTracker.combatants[0],'reaction').ok);assert.equal(h.turnResources.reaction,1);assert(!core.spend(h.initiativeTracker.combatants[1],'reaction').ok);
 h.turnResources.bonusAction=1;deal(h,'cups_12');assert(play(c,h,'cups_12').ok);g.Math.random=()=>.5;const result=core.executeAttack(h.initiativeTracker.combatants[0],h.initiativeTracker.combatants[1],{bonus:20,damage:'1d6',damageType:'рубящий',useRules:false});assert(result.hit);assert.equal(h.turnResources.actions,0);assert(!h.tarotEffects.some(e=>e.id==='cups_12'));assert(!h.initiativeTracker.combatants[0].tarotEffects.some(e=>e.id==='cups_12'));
});
test('alternate Gameplay Core applies enemy damage to the real owner without falsely defeating a healthy profile',()=>{
 const {g,h}=setup();const core=gameplay(g,h);h.initiativeTracker.activeIndex=1;core.startTurn();g.Math.random=()=>.5;const out=core.executeAttack(h.initiativeTracker.combatants[1],h.initiativeTracker.combatants[0],{bonus:20,damage:'1d6',damageType:'огонь',useRules:false});assert(out.hit);assert.equal(h.hpCurrent,26);assert.equal(h.initiativeTracker.combatants[0].hp,26);assert(!h.defeated);
});
console.log('PREDICTOR_TURN_EFFECTS_OK: '+n+' scenarios');
