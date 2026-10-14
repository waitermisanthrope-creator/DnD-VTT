/** Blind-draw infrastructure tests. Synthetic action definitions are fixtures,
 * not an approval of the draft card table or implementation of card effects.
 */
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),crypto=require('node:crypto');
const source=fs.readFileSync(__dirname+'/../app/predictor_runtime.js','utf8');
const clone=x=>JSON.parse(JSON.stringify(x));
function context(){const g={crypto:crypto.webcrypto,Uint32Array,Set,console};g.window=g;vm.createContext(g);vm.runInContext(source,g);return g;}
function hero(){return {id:'blind',classes:[{name:'Предсказатель',level:5,subclass:'Оракул'}]};}
function rules(a){return Object.fromEntries(a.cards.map(c=>[c.id,{action:'action'}]));}
let passed=0;function test(name,fn){fn();passed++;console.log('PASS '+name);}
test('no approved action rules means no reveal or state mutation',()=>{
 const a=context().DNDPredictor,h=hero();a.initialize(h);const before=JSON.stringify(h);assert(!a.beginBlind(h,'minor','b1','',null).ok);assert.equal(JSON.stringify(h),before);
});
test('mandatory result survives reload, is outside hand, and blocks alternate draws',()=>{
 const a=context().DNDPredictor,h=hero();a.initialize(h);a.beginInitial(h);const r=a.beginBlind(h,'minor','blind1','',rules(a));assert(r.ok);assert.equal(h.predictorState.hand.length,0);const before=JSON.stringify(h);
 assert(!a.draw(h,'minor').ok);assert(!a.beginBlind(h,'minor','blind2','',rules(a)).ok);assert(!a.endTurn(h,'turn1').ok);assert.equal(JSON.stringify(h),before);
 const restored=clone(h),next=context().DNDPredictor;next.sync(restored);assert.equal(JSON.stringify(restored),before);assert(next.recordApplication(restored,r.card,'blind1',restored.predictorState.revision).ok);assert(restored.predictorState.discard.minor.includes(r.card));assert(!restored.predictorState.blind);
});
test('wrong operation and stale revision cannot consume blind result or resource',()=>{
 const a=context().DNDPredictor,h=hero();a.initialize(h);const r=a.beginBlind(h,'major','major1','',rules(a));assert(r.ok);assert.equal(a.inspect(h).majorCurrent,4);const before=JSON.stringify(h);
 assert(!a.recordApplication(h,r.card,'wrong',h.predictorState.revision).ok);assert(!a.recordApplication(h,r.card,'major1',h.predictorState.revision-1).ok);assert.equal(JSON.stringify(h),before);
 assert(a.recordApplication(h,r.card,'major1',h.predictorState.revision).ok);assert.equal(a.inspect(h).majorCurrent,3);assert(!a.beginBlind(h,'major','major1','',rules(a)).ok);
});
test('exhausted major resource cannot reveal another card',()=>{
 const a=context().DNDPredictor,h=hero();a.initialize(h);h.predictorState.majorSpent=4;const before=JSON.stringify(h);assert(!a.beginBlind(h,'major','b','',rules(a)).ok);assert.equal(JSON.stringify(h),before);
});
test('untriggered reaction returns and reshuffles before another result; no discard',()=>{
 const a=context().DNDPredictor,h=hero();a.initialize(h);const reaction=h.predictorState.decks.minor[0],defs=rules(a);defs[reaction]={action:'reaction',trigger:'hit'};
 const r=a.beginBlind(h,'minor','b','',defs);assert(r.ok);assert.notEqual(r.card,reaction);assert(r.retries>=1);assert(h.predictorState.decks.minor.includes(reaction));assert.equal(h.predictorState.discard.minor.length,0);
});
test('matching reaction can be selected and all-untriggered deck fails without looping',()=>{
 const a=context().DNDPredictor,h=hero();a.initialize(h);const defs=rules(a);a.cards.filter(c=>c.deck==='minor').forEach(c=>defs[c.id]={action:'reaction',trigger:'hit'});const before=JSON.stringify(h);
 assert(!a.beginBlind(h,'minor','b','',defs).ok);assert.equal(JSON.stringify(h),before);assert(a.beginBlind(h,'minor','b','hit',defs).ok);assert.equal(h.predictorState.blind.event,'hit');
});
test('bounded fallback terminates even when RNG repeatedly restores unsuitable top card',()=>{
 const g=context(),a=g.DNDPredictor,h=hero();a.initialize(h);const defs=rules(a),valid=h.predictorState.decks.minor.at(-1);a.cards.filter(c=>c.deck==='minor').forEach(c=>defs[c.id]={action:'reaction',trigger:'hit'});defs[valid]={action:'bonus'};
 let step=0;g.crypto={getRandomValues(arr){arr[0]=step===0?0:55-step;step=(step+1)%55;return arr;}};
 const r=a.beginBlind(h,'minor','bounded','',defs);assert(r.ok);assert.equal(r.card,valid);assert.equal(r.retries,112);assert.equal(h.predictorState.decks.minor.length,55);
});
test('long rest collects pending blind card and empty deck never recycles discard',()=>{
 const a=context().DNDPredictor,h=hero();a.initialize(h);a.beginBlind(h,'minor','b','',rules(a));assert(a.rest(h,'long','rest1').ok);assert(!h.predictorState.blind);assert.equal(h.predictorState.decks.minor.length,56);
 h.predictorState.discard.minor=h.predictorState.decks.minor.splice(0);const before=JSON.stringify(h);assert(!a.beginBlind(h,'minor','b2','',rules(a)).ok);assert.equal(JSON.stringify(h),before);
});
console.log('PREDICTOR_BLIND_OK: '+passed+' scenarios');
