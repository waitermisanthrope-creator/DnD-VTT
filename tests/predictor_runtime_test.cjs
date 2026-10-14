/** Stage-one Predictor behavioral tests: finite decks, persisted choices,
 * application accounting, rest, multiclass level and invalid-state protection.
 * No draft card effects or action costs are asserted as approved gameplay.
 */
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),crypto=require('node:crypto');
const runtime=fs.readFileSync(__dirname+'/../app/predictor_runtime.js','utf8');
const framework=fs.readFileSync(__dirname+'/../app/content_framework.js','utf8');
const clone=v=>JSON.parse(JSON.stringify(v));
function drawOne(api,h,deck){const r=api.draw(h,deck);return r.ok?api.choose(h,r.cards[0]):r;}
function context(){const g={console,crypto:crypto.webcrypto,Uint32Array,Set};g.window=g;vm.createContext(g);vm.runInContext(framework,g);vm.runInContext(runtime,g);return g;}
function hero(level=5,subclass='Оракул'){return {id:'predictor',classes:[{name:'Предсказатель',level,subclass}],hpCurrent:20};}
function all(s){return [...s.decks.minor,...s.decks.major,...s.hand,...s.discard.minor,...s.discard.major,...(s.offer?s.offer.cards:[])];}
let passed=0;function test(name,f){f();passed++;console.log('PASS '+name);}
test('78 unique cards, two finite shuffled decks and exactly three registered subclasses',()=>{
 const g=context(),a=g.DNDPredictor,h=hero();assert(a.initialize(h).ok);assert.equal(a.cards.length,78);assert.equal(new Set(a.cards.map(c=>c.id)).size,78);assert.equal(h.predictorState.decks.minor.length,56);assert.equal(h.predictorState.decks.major.length,22);assert.equal(g.DNDContent.getClass('Предсказатель').subclasses.length,3);assert.equal(new Set(all(h.predictorState)).size,78);
});
test('no reshuffle or refill on sync, JSON reload or creation of another runtime',()=>{
 const a=context().DNDPredictor,h=hero();a.initialize(h);const before=JSON.stringify(h);a.sync(h);assert.equal(JSON.stringify(h),before);const restored=clone(h);context().DNDPredictor.sync(restored);assert.equal(JSON.stringify(restored),before);
});
test('class-only level controls hand and resource; base 2 before subclass',()=>{
 const a=context().DNDPredictor;for(const [l,size] of [[1,2],[2,3]])assert.equal(a.capacity(hero(l,'')),size);
 assert.equal(a.capacity(hero(20,'Оракул')),12);assert.equal(a.capacity(hero(20,'Шулер')),11);assert.equal(a.capacity(hero(20,'Ткач Судьбы')),13);
 const h=hero(3);h.classes.push({name:'Воин',level:17});a.initialize(h);assert.equal(a.capacity(h),3);assert.equal(a.inspect(h).majorMax,2);assert.equal(a.capacity(hero(3,'')),null);
});
test('open choice persists across restart; unselected card returns, chosen card stays in hand',()=>{
 let a=context().DNDPredictor,h=hero(1,'');a.initialize(h);a.beginInitial(h);const r=a.offer(h,'minor');assert(r.ok);assert.equal(r.cards.length,2);assert.equal(h.predictorState.hand.length,0);h=clone(h);a=context().DNDPredictor;
 const [chosen,other]=h.predictorState.offer.cards;assert(a.choose(h,chosen).ok);assert(h.predictorState.hand.includes(chosen));assert(h.predictorState.decks.minor.includes(other));assert(!h.predictorState.decks.minor.includes(chosen));assert.equal(h.predictorState.discard.minor.length,0);assert.equal(new Set(all(h.predictorState)).size,78);
});
test('shared hand limit, draw budget, failed operations and no action consumption',()=>{
 const a=context().DNDPredictor,h=hero(3);h.turnResources={actions:1,bonusAction:1,reaction:1};a.initialize(h);a.beginInitial(h);
 assert(drawOne(a,h,'major').ok);assert.equal(a.inspect(h).majorCurrent,2);assert(drawOne(a,h,'minor').ok);assert(drawOne(a,h,'minor').ok);const before=JSON.stringify(h);assert(!drawOne(a,h,'minor').ok);assert.equal(JSON.stringify(h),before);assert.deepEqual(h.turnResources,{actions:1,bonusAction:1,reaction:1});
});
test('major cards unlock progressively; before level 3 they cannot be drawn',()=>{
 const a=context().DNDPredictor,h=hero(2,'');a.initialize(h);a.beginInitial(h);const before=JSON.stringify(h);assert(!drawOne(a,h,'major').ok);assert.equal(JSON.stringify(h),before);
 const h3=hero(3);a.initialize(h3);a.beginInitial(h3);for(let i=0;i<3;i++){const r=drawOne(a,h3,'major');assert(r.ok);assert.equal(a.rules.unlockSchedule[r.card],3);}
 assert.equal(Object.keys(a.rules.unlockSchedule).length,22);assert.equal(a.rules.unlockSchedule.major_21,17);
});
test('application consumes card and major resource only once, never on draw',()=>{
 const a=context().DNDPredictor,h=hero(3);a.initialize(h);a.beginInitial(h);const id=drawOne(a,h,'major').card;assert.equal(a.inspect(h).majorCurrent,2);const revision=h.predictorState.revision;
 assert(!a.recordApplication(h,id,'one',revision-1).ok);assert(a.recordApplication(h,id,'one',revision).ok);assert.equal(a.inspect(h).majorCurrent,1);assert(h.predictorState.discard.major.includes(id));const before=JSON.stringify(h);assert(!a.recordApplication(h,id,'one',h.predictorState.revision).ok);assert.equal(JSON.stringify(h),before);
});
test('minor application costs no major resource and exhausted resource does not consume cards',()=>{
 const a=context().DNDPredictor,h=hero(3);a.initialize(h);a.beginInitial(h);const minor=drawOne(a,h,'minor').card;assert(a.recordApplication(h,minor,'minor',h.predictorState.revision).ok);assert.equal(a.inspect(h).majorCurrent,2);
 for(let i=0;i<2;i++){const id=drawOne(a,h,'major').card;assert(a.recordApplication(h,id,'m'+i,h.predictorState.revision).ok);}
 a.endTurn(h,'round2');const id=drawOne(a,h,'major').card,before=JSON.stringify(h);assert(!a.recordApplication(h,id,'blocked',h.predictorState.revision).ok);assert.equal(JSON.stringify(h),before);
});
test('turn quotas cannot be replayed; short rest preserves state, long rest rebuilds once',()=>{
 const a=context().DNDPredictor,h=hero(5);a.initialize(h);a.beginInitial(h);const id=drawOne(a,h,'minor').card;a.recordApplication(h,id,'used',h.predictorState.revision);a.endTurn(h,'r1');assert.equal(h.predictorState.window.remaining,2);a.endTurn(h,'r2');assert(!a.endTurn(h,'r1').ok);
 const before=JSON.stringify(h);a.rest(h,'short','s1');assert.equal(JSON.stringify(h),before);assert(a.rest(h,'long','l1').ok);assert.equal(h.predictorState.discard.minor.length,0);assert.equal(h.predictorState.hand.length,0);assert.equal(h.predictorState.window.remaining,a.capacity(h));assert.equal(h.predictorState.decks.minor.length,56);assert.equal(a.inspect(h).majorCurrent,4);assert(!a.rest(h,'long','l1').ok);
});
test('empty deck does not recycle discard; invalid state is retained, never silently reset',()=>{
 const a=context().DNDPredictor,h=hero(20);a.initialize(h);h.predictorState.discard.minor=h.predictorState.decks.minor.splice(0);a.beginInitial(h);const before=JSON.stringify(h);assert(!drawOne(a,h,'minor').ok);assert.equal(JSON.stringify(h),before);
 h.predictorState.hand.push(h.predictorState.decks.major[0]);const broken=JSON.stringify(h);assert(!a.sync(h).ok);assert.equal(JSON.stringify(h),broken);assert(!a.rest(h,'long','repair').ok);
});
test('real sheet and tools long-rest handlers restore decks before profile save',()=>{
 for(const file of ['character.js','dnd_tools.js']){
  const g=context(),a=g.DNDPredictor,h=hero(5);a.initialize(h);a.beginInitial(h);const id=drawOne(a,h,'major').card;a.recordApplication(h,id,'spent',h.predictorState.revision);h.hpMax=30;
  const elements=new Map();g.document={getElementById(id){if(!elements.has(id))elements.set(id,{value:id==='hpMax'?'30':'',checked:false});return elements.get(id);}};
  g.currentChar=h;g.alert=()=>{};g.saved=[];g.autoSaveCurrentCharacter=()=>g.saved.push(clone(h));g.renderSpellSlots=()=>{};
  vm.runInContext(fs.readFileSync(__dirname+'/../app/'+file,'utf8'),g);g._dndSave=g.autoSaveCurrentCharacter;
  (file==='character.js'?g.longRest:g.longRestCharacter)();assert.equal(a.inspect(h).majorCurrent,4);assert.equal(h.predictorState.discard.major.length,0);assert.equal(g.saved.at(-1).predictorState.decks.major.length,22);
 }
});
test('registered class rest hook works through the existing class engine',()=>{
 const g=context(),a=g.DNDPredictor,h=hero(5);g.addEventListener=()=>{};g.setTimeout=()=>{};g.document={getElementById:()=>null};
 vm.runInContext(fs.readFileSync(__dirname+'/../app/class_features_engine.js','utf8'),g);a.initialize(h);a.beginInitial(h);const id=drawOne(a,h,'major').card;a.recordApplication(h,id,'used',h.predictorState.revision);
 h.lastRest={type:'long',at:'2026-10-15T12:00:00Z'};g.DNDClassFeatures.restore(h,'long');assert.equal(a.inspect(h).majorCurrent,4);const before=JSON.stringify(h.predictorState);g.DNDClassFeatures.restore(h,'long');assert.equal(JSON.stringify(h.predictorState),before);
});
test('local initiative opens draw only for the owner turn; no repeated round grant',()=>{
 const g=context(),a=g.DNDPredictor,h=hero(5);h.name='Owner';a.initialize(h);a.beginInitial(h);
 h.initiativeTracker={round:1,activeIndex:0,combatants:[{id:'me',type:'hero',name:'Owner',characterId:h.id},{id:'enemy',type:'enemy'}]};g.currentChar=h;g.alert=()=>{};
 vm.runInContext(fs.readFileSync(__dirname+'/../app/dnd_tools.js','utf8'),g);g.ensureDndToolsState=()=>{};g._dndSave=()=>{};g.renderInitiativeTracker=()=>{};g.syncDndNetworkInitiative=()=>{};
 g.nextInitiativeTurn();assert.equal(h.predictorState.window.remaining,2);const before=JSON.stringify(h.predictorState);g.nextInitiativeTurn();assert.equal(JSON.stringify(h.predictorState),before);
 h.initiativeTracker.round=1;h.initiativeTracker.activeIndex=0;g.nextInitiativeTurn();assert.equal(JSON.stringify(h.predictorState),before);assert.equal(h.initiativeTracker.activeIndex,0);
});
test('malformed pending choice and inherited object IDs are rejected without exceptions',()=>{
 const a=context().DNDPredictor,h=hero();a.initialize(h);h.predictorState.offer={deck:'minor',cards:null};const before=JSON.stringify(h);assert(!a.inspect(h).ok);assert.equal(JSON.stringify(h),before);
 delete h.predictorState.offer;h.predictorState.decks.minor[0]='__proto__';assert(!a.inspect(h).ok);assert(!a.sync(null).ok);
 const legacy=hero();legacy.classes[0].level='5';assert.equal(a.capacity(legacy),4);
});
test('unavailable secure randomness never creates or partially changes a deck',()=>{
 const g=context(),a=g.DNDPredictor,h=hero();a.initialize(h);a.beginInitial(h);const offer=a.offer(h,'minor');assert(offer.ok);const before=JSON.stringify(h);g.crypto=null;
 assert(!a.choose(h,offer.cards[0]).ok);assert.equal(JSON.stringify(h),before);const newcomer=hero();assert(!a.initialize(newcomer).ok);assert(!newcomer.predictorState);
});
console.log('PREDICTOR_RUNTIME_OK: '+passed+' scenarios');
