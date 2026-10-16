/** Trickster rules and real combat boundary tests. Synthetic card action rules
 * are fixtures; they do not enable or approve execution of Tarot card effects.
 */
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),crypto=require('node:crypto');
const clone=x=>JSON.parse(JSON.stringify(x));
function setup(l=10,sub='Шулер'){
 const g={console,crypto:crypto.webcrypto,Uint32Array,Set,addEventListener(){},document:{readyState:'loading',addEventListener(){},getElementById(){return null;}}};g.window=g;vm.createContext(g);
 for(const file of ['content_framework.js','predictor_runtime.js','combat_engine.js'])vm.runInContext(fs.readFileSync(__dirname+'/../app/'+file,'utf8'),g);
 const a=g.DNDPredictor,h={id:'p',name:'Шулер',classes:[{name:'Предсказатель',level:l,subclass:sub}],stats:{cha:18},hpCurrent:20,hpMax:30,hpTemp:0,speed:30,turnResources:{reaction:1},activeConditions:{}};assert(a.initialize(h).ok);
 const rules=Object.fromEntries(a.cards.map(c=>[c.id,{action:'action'}]));return {g,a,h,rules};
}
function draw(a,h){const r=a.draw(h,'minor');assert(r.ok,r.reason);assert(a.choose(h,r.cards[0]).ok);return r.cards[0];}
function forceSuit(h,suit){const ids=h.predictorState.decks.minor;ids.sort((a,b)=>Number(b.startsWith(suit+'_'))-Number(a.startsWith(suit+'_')));}
function betWin(a,h,rules,suit='cups',id='bet'){
 forceSuit(h,suit);const odds=a.wagerOdds(h,suit,'',rules);assert(odds.ok);const r=a.beginWager(h,suit,id,'',rules,odds.revision);assert(r.ok,r.reason);assert(r.won);return r.card;
}
let n=0;function test(name,fn){fn();n++;console.log('PASS '+name);}
test('swap is once per completed own turn, preserves size/quota, and gives three choices at 10',()=>{
 const {a,h}=setup();a.beginInitial(h);const card=draw(a,h);a.endTurn(h,'t1');const cap=a.capacity(h),quota=h.predictorState.window.remaining,r=a.swapCard(h,card);assert(r.ok);assert.equal(r.cards.length,3);assert.equal(h.predictorState.hand.length,0);assert.equal(a.capacity(h),cap);assert(a.choose(h,r.cards[0]).ok);assert.equal(h.predictorState.window.remaining,quota);assert.equal(h.predictorState.hand.length,1);assert(!a.swapCard(h,h.predictorState.hand[0]).ok);
});
test('swap rejects other subclasses, opening hand, major cards and post-draw use',()=>{
 for(const sub of ['Оракул','Ткач Судьбы']){const {a,h}=setup(5,sub);a.beginInitial(h);const id=draw(a,h);a.endTurn(h,'t');assert(!a.swapCard(h,id).ok);}
 const {a,h}=setup(5);a.beginInitial(h);const id=draw(a,h);assert(!a.swapCard(h,id).ok);a.endTurn(h,'t');draw(a,h);const before=JSON.stringify(h);assert(!a.swapCard(h,id).ok);assert.equal(JSON.stringify(h),before);
});
test('odds count applicable remaining cards, excluding untriggered reactions and held cards',()=>{
 const {a,h,rules}=setup(3);a.beginInitial(h);const held=draw(a,h);const blocked=h.predictorState.decks.minor.find(x=>x.startsWith('cups_'));rules[blocked]={action:'reaction',trigger:'hit'};
 const r=a.wagerOdds(h,'cups','',rules);assert.equal(r.denominator,54);assert.equal(r.numerator,13-(held.startsWith('cups_')?1:0));assert.equal(a.wagerOdds(h,'cups','hit',rules).denominator,55);
});
test('stale odds and absent approved rules never spend a stake or reveal a card',()=>{
 const {a,h,rules}=setup();const before=JSON.stringify(h);assert(!a.beginWager(h,'cups','b','',rules,-1).ok);assert(!a.beginWager(h,'cups','b','',null,h.predictorState.revision).ok);assert.equal(JSON.stringify(h),before);
});
test('stake and mandatory result persist, cannot be replaced, and settle exactly once',()=>{
 const {a,h,rules}=setup();const card=betWin(a,h,rules);assert.equal(a.tricksterStatus(h).wagerCurrent,3);const restored=clone(h);assert(!a.beginWager(restored,'swords','retry','',rules,restored.predictorState.revision).ok);assert(a.recordApplication(restored,card,'bet',restored.predictorState.revision).ok);assert.equal(a.tricksterStatus(restored).rewards.length,1);const before=JSON.stringify(restored);assert(!a.recordApplication(restored,card,'bet',restored.predictorState.revision).ok);assert.equal(JSON.stringify(restored),before);
});
test('loss spends stake but has no additional penalty; short rest preserves, long rest restores',()=>{
 const {a,h,rules}=setup(3);forceSuit(h,'swords');const r=a.beginWager(h,'cups','loss','',rules,h.predictorState.revision);assert(r.ok&&!r.won);assert(a.recordApplication(h,r.card,'loss',h.predictorState.revision).ok);assert.equal(a.tricksterStatus(h).rewards.length,0);a.rest(h,'short','s');assert.equal(a.tricksterStatus(h).wagerCurrent,1);a.rest(h,'long','l');assert.equal(a.tricksterStatus(h).wagerCurrent,2);
});
test('class-only levels determine wager count and luck die',()=>{
 for(const [l,max,die] of [[3,2,6],[6,3,8],[10,4,10],[14,5,12],[20,6,12]]){const {a,h}=setup(l);h.classes.push({name:'Воин',level:20});assert.equal(a.tricksterStatus(h).wagerMax,max);assert.equal(a.tricksterStatus(h).die,die);}
});
test('unconscious owner still wins healing, which revives through real combat heal',()=>{
 const {a,h,rules}=setup();const id=betWin(a,h,rules);h.hpCurrent=0;h.activeConditions['Бессознателен']=true;h.deathSaves={successes:0,failures:2};assert(a.recordApplication(h,id,'bet',h.predictorState.revision).ok);const reward=a.tricksterStatus(h).rewards[0];assert(reward.amount>=5);assert(a.claimWagerReward(h,reward.id,{target:h,expectedRevision:h.predictorState.revision}).ok);assert(h.hpCurrent>0);assert(!h.activeConditions['Бессознателен']);assert(!a.claimWagerReward(h,reward.id,{target:h,expectedRevision:h.predictorState.revision}).ok);
});
test('pentacles grant nonstacking temp HP and swords validate range/target before damage',()=>{
 const {a,h,rules}=setup();let id=betWin(a,h,rules,'pentacles','p');a.recordApplication(h,id,'p',h.predictorState.revision);let reward=a.tricksterStatus(h).rewards[0];h.hpTemp=100;assert(a.claimWagerReward(h,reward.id,{expectedRevision:h.predictorState.revision}).ok);assert.equal(h.hpTemp,100);
 id=betWin(a,h,rules,'swords','s');a.recordApplication(h,id,'s',h.predictorState.revision);reward=a.tricksterStatus(h).rewards.find(x=>x.kind==='swords');const target={hp:100,maxHp:100};assert(!a.claimWagerReward(h,reward.id,{target,visible:true,distanceFt:40,relation:'enemy',expectedRevision:h.predictorState.revision}).ok);assert.equal(target.hp,100);assert(a.claimWagerReward(h,reward.id,{target,visible:true,distanceFt:30,relation:'enemy',expectedRevision:h.predictorState.revision}).ok);assert.equal(target.hp,100-reward.amount);
});
test('wands survive unconscious turns and expire at first own awake turn',()=>{
 const {a,h,rules}=setup();const id=betWin(a,h,rules,'wands');h.hpCurrent=0;a.recordApplication(h,id,'bet',h.predictorState.revision);const reward=a.tricksterStatus(h).rewards[0];assert(!a.spendMovementReward(h,reward.id,5,h.predictorState.revision).ok);a.beginOwnTurn(h,'asleep1');assert.equal(a.tricksterStatus(h).rewards[0].status,'pending');h.hpCurrent=1;assert(a.spendMovementReward(h,reward.id,10,h.predictorState.revision).ok);assert.equal(a.tricksterStatus(h).rewards[0].remainingFeet,20);a.beginOwnTurn(h,'awake1');assert.equal(a.tricksterStatus(h).rewards[0].status,'expired');
});
test('slippery grants at most 10 feet per own turn, never for off-turn applications',()=>{
 const {a,h}=setup(6);a.beginInitial(h);let id=draw(a,h);a.beginOwnTurn(h,'own1');a.recordApplication(h,id,'c1',h.predictorState.revision);id=draw(a,h);a.recordApplication(h,id,'c2',h.predictorState.revision);assert.equal(a.tricksterStatus(h).rewards.filter(x=>x.kind==='slip').length,1);a.endTurn(h,'own1');assert.equal(a.tricksterStatus(h).rewards[0].status,'expired');id=draw(a,h);a.recordApplication(h,id,'offturn',h.predictorState.revision);assert.equal(a.tricksterStatus(h).rewards.length,1);
});
test('last trump at real damage boundary spends reaction/card, preserves 1 HP, once per long rest',()=>{
 const {g,a,h}=setup(14);a.beginInitial(h);const id=draw(a,h);g.DNDCombat.applyDamage(h,25,'сила',{zeroHpReaction:'predictor-last-trump',predictorCardId:id});assert.equal(h.hpCurrent,1);assert.equal(h.turnResources.reaction,0);assert(h.predictorState.discard.minor.includes(id));assert(!a.tricksterStatus(h).lastTrumpAvailable);a.rest(h,'long','l');assert(a.tricksterStatus(h).lastTrumpAvailable);
});
test('last trump does not stop instant death or consume a card on failed reaction',()=>{
 const {g,a,h}=setup(14);a.beginInitial(h);const id=draw(a,h);g.DNDCombat.applyDamage(h,50,'сила',{zeroHpReaction:'predictor-last-trump',predictorCardId:id});assert.equal(h.hpCurrent,0);assert(h.predictorState.hand.includes(id));assert.equal(h.turnResources.reaction,1);
});
test('embedded encounter target receives persisted reward damage, not a detached copy',()=>{
 const {a,h,rules}=setup();const id=betWin(a,h,rules,'swords');a.recordApplication(h,id,'bet',h.predictorState.revision);const reward=a.tricksterStatus(h).rewards[0];h.initiativeTracker={combatants:[{id:'enemy',hp:100,maxHp:100}]};
 assert(a.claimWagerReward(h,reward.id,{target:h.initiativeTracker.combatants[0],visible:true,distanceFt:5,relation:'enemy',expectedRevision:h.predictorState.revision}).ok);assert.equal(h.initiativeTracker.combatants[0].hp,100-reward.amount);
});
test('last trump cannot spend a reaction while incapacitated',()=>{
 const {g,a,h}=setup(14);a.beginInitial(h);const id=draw(a,h);h.activeConditions['Парализован']=true;g.DNDCombat.applyDamage(h,25,'сила',{zeroHpReaction:'predictor-last-trump',predictorCardId:id});assert.equal(h.hpCurrent,0);assert(h.predictorState.hand.includes(id));assert.equal(h.turnResources.reaction,1);
});
test('corrupt subclass journals fail safely without reset',()=>{
 const {a,h,rules}=setup();betWin(a,h,rules);h.predictorState.trickster.rewards.push(null);const before=JSON.stringify(h);assert(!a.inspect(h).ok);assert.equal(JSON.stringify(h),before);
});
test('last trump is selectable through shared reaction options and resolves after final damage',()=>{
 const {g,a,h}=setup(14);vm.runInContext(fs.readFileSync(__dirname+'/../app/class_features_engine.js','utf8'),g);a.beginInitial(h);const id=draw(a,h);
 const reaction=g.DNDClassFeatures.reactionOptions(h,{amount:25,source:'attack'});assert(reaction.options.some(x=>x.id==='predictorTrump:'+id));
 g.DNDCombat.applyDamage(h,25,'сила',{reactionChoice:'predictorTrump:'+id,source:'attack'});assert.equal(h.hpCurrent,1);assert(h.predictorState.discard.minor.includes(id));
});
console.log('PREDICTOR_TRICKSTER_OK: '+n+' scenarios');
