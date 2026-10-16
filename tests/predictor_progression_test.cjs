/** Full level matrix for approved deck infrastructure; not a claim that subclass abilities are complete. */
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),crypto=require('node:crypto');
const sources=['content_framework.js','predictor_runtime.js'].map(f=>fs.readFileSync(__dirname+'/../app/'+f,'utf8'));
function context(){const g={console,crypto:crypto.webcrypto,Uint32Array,Set};g.window=g;vm.createContext(g);sources.forEach(s=>vm.runInContext(s,g));return g;}
const g=context(),api=g.DNDPredictor;
const maxAt=l=>l<3?0:l<5?2:l<9?4:l<13?5:l<17?6:8;
function conservation(h){const s=h.predictorState;const cards=[...s.decks.minor,...s.decks.major,...s.hand,...s.discard.minor,...s.discard.major,...(s.offer?s.offer.cards:[]),...(s.blind?[s.blind.card]:[])];assert.equal(cards.length,78);assert.equal(new Set(cards).size,78);assert(api.inspect(h).ok);}
function choose(h,deck){const result=api.draw(h,deck);assert(result.ok,result.reason);assert(result.cards.length>=1&&result.cards.length<=2);const picked=api.choose(h,result.cards[0]);assert(picked.ok,picked.reason);conservation(h);return picked.card;}
let cases=0;
for(const [subclass,base] of [['Оракул',2],['Шулер',1],['Ткач Судьбы',3]])for(let level=1;level<=20;level++){
 const h={id:subclass+level,classes:[{name:'Предсказатель',level,subclass:level<3?'':subclass}],turnResources:{actions:2,bonusAction:1,reaction:1},hpCurrent:30};
 assert(api.initialize(h).ok);const capacity=(level<3?2:base)+Math.floor(level/2);
 assert.equal(api.capacity(h),capacity);assert.equal(api.inspect(h).majorMax,maxAt(level));conservation(h);
 assert(api.beginInitial(h).ok);
 // Exercise both decks and application accounting at every unlocked level.
 const first=choose(h,level<3?'minor':'major');
 if(level>=3)assert(api.rules.unlockSchedule[first]<=level);
 assert.equal(api.inspect(h).majorCurrent,maxAt(level));
 assert(api.recordApplication(h,first,'matrix-use',h.predictorState.revision).ok);
 assert.equal(api.inspect(h).majorCurrent,maxAt(level)-(level>=3?1:0));
 while(h.predictorState.window.remaining>0)choose(h,'minor');
 assert.equal(h.predictorState.hand.length,capacity-1);
 const spent=JSON.stringify(h.predictorState);api.rest(h,'short','matrix-short');assert.equal(JSON.stringify(h.predictorState),spent);
 const restored=JSON.parse(JSON.stringify(h));assert(context().DNDPredictor.sync(restored).ok);assert.equal(JSON.stringify(restored),JSON.stringify(h));
 assert(api.endTurn(h,'matrix-turn').ok);assert.equal(h.predictorState.window.remaining,level<5?1:level<17?2:3);
 choose(h,'minor');assert.equal(h.predictorState.hand.length,capacity);
 const full=JSON.stringify(h);assert(!api.draw(h,'minor').ok);assert.equal(JSON.stringify(h),full);
 assert.deepEqual(h.turnResources,{actions:2,bonusAction:1,reaction:1});
 assert(api.rest(h,'long','matrix-long').ok);assert.equal(api.inspect(h).majorCurrent,maxAt(level));
 assert.equal(h.predictorState.hand.length,0);assert.equal(h.predictorState.discard.minor.length+h.predictorState.discard.major.length,0);assert.equal(h.predictorState.window.remaining,capacity);conservation(h);
 const rested=JSON.stringify(h);assert(!api.rest(h,'long','matrix-long').ok);assert.equal(JSON.stringify(h),rested);
 // Additional non-Predictor levels must not inflate class resources or hand.
 h.classes.push({name:'Воин',level:20-level});assert.equal(api.capacity(h),capacity);assert.equal(api.inspect(h).majorMax,maxAt(level));
 cases++;
}
assert.equal(g.DNDContent.getClass('Предсказатель').subclasses.length,3);
console.log('PASS Predictor level matrix: '+cases+' level/subclass cases; finite decks, budgets, JSON, rest and multiclass isolation');
