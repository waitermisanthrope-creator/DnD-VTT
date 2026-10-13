const assert=require('assert');
const {runtime,hero}=require('./helpers/class_runtime_harness');
const g=runtime(),C=g.DNDClassFeatures,B=g.DNDCombat,H=g.DNDBloodHunter;
let serial=0,modes=[];
function hunter(p,level=11){
 const h=hero(H.CLASS,level,'profaneSoul');h.id='focus-'+(++serial);
 h.weapons=[{id:'blade',name:'Клинок',damageDice:'1d6',damageType:'slashing',rangeFt:5}];
 C.buildFeatureSet(h);
 assert(C.useFeature(h,'otherworldlyPatron',{patron:p,className:H.CLASS}).ok);
 assert(C.useFeature(h,'chooseCrimsonRites',{rites:['flame'],className:H.CLASS}).ok);
 assert(C.useFeature(h,'crimsonRite',{weaponId:'blade',riteType:'flame',className:H.CLASS}).ok);
 C.resetTurn(h);return h;
}
function foe(){const t=hero('Enemy',1);t.id='target-'+(++serial);t.hpCurrent=t.hpMax=100;t.ac=10;return t;}
function rolls(n=11){modes=[];g.DNDRules.rollD20=mode=>{modes.push(mode);return {result:n,critical:n===20,fumble:n===1};};}
function attack(h,t,extra={}){return B.attack(h,t,{weapon:h.weapons[0],damageType:'slashing',useRules:false,distanceFt:5,...extra});}
g.Math.random=()=>0;rolls();
// Archfey affects the actual rolled attack and partial cover, only for its rite weapon.
let h=hunter('archfey'),t=foe();t.conditions={Невидим:true};t.ac=11;
let r=attack(h,t,{coverBonus:5});assert(r.hit);assert.equal(modes[0],'normal');
rolls();r=attack(h,t,{weapon:{id:'other',damageDice:'1d6',rangeFt:5},coverBonus:5});
assert(!r.hit);assert.equal(modes[0],'disadvantage');
rolls();r=attack(h,t,{coverBonus:10});assert(!r.hit,'Full cover is not ignored');
// Fathomless slows on a hit, does not stack, and restores the exact speed.
h=hunter('fathomless');t=foe();assert.equal(h.swimSpeed,30);assert(H.mobility(h).waterBreathing);
attack(h,t);assert.equal(t.speed,20);attack(h,t);assert.equal(t.speed,20);
const savedTarget=JSON.parse(JSON.stringify(t));H.observe(savedTarget);C.resetTurn(h);
assert.equal(savedTarget.speed,30);assert.equal(savedTarget.classFeaturesState.bhAppliedFocusSlow,0);
t=foe();t.speed=5;attack(h,t);assert.equal(t.speed,0);C.resetTurn(h);assert.equal(t.speed,5);
// Genie spends one curse and bonus action; flight survives JSON and ends on time/rest.
h=hunter('genie');const charges=h.resources.bloodMaledict.current;
assert(C.useFeature(h,'riteFocus',{className:H.CLASS}).ok);assert.equal(h.flySpeed,30);
assert.equal(h.resources.bloodMaledict.current,charges-1);assert.equal(h.turnResources.bonusAction,false);
assert(!C.useFeature(h,'riteFocus',{className:H.CLASS}).ok);
let saved=JSON.parse(JSON.stringify(h));C.buildFeatureSet(saved);assert.equal(saved.flySpeed,30);
for(let i=0;i<3;i++)C.onTurnEnd(saved);assert.equal(saved.flySpeed,0);
C.resetTurn(h);C.restore(h,'short');assert.equal(h.flySpeed,0);
// Great Old One uses a real save and respects condition immunity and the ten-foot area.
h=hunter('greatOldOne');t=foe();const near=foe(),immune=foe(),far=foe();immune.conditionImmunities=['Испуган'];
g.DNDRules.rollD20=mode=>{modes.push(mode);return {result:mode==='normal'&&modes.length===1?20:1,critical:modes.length===1,fumble:false};};modes=[];
r=attack(h,t,{fearTargets:[{target:near,distanceFt:10},{target:immune,distanceFt:5},{target:far,distanceFt:15}]});
assert(r.critical);assert(near.conditions.Испуган);assert(!immune.conditions.Испуган);assert(!far.conditions||!far.conditions.Испуган);
C.onTurnEnd(h);assert.equal(near.conditions.Испуган,false);
// Hexblade adds proficiency only to the next rite hit on the cursed target, not a miss.
rolls();h=hunter('hexblade');t=foe();
assert(C.useFeature(h,'chooseBloodCurses',{curses:['marked'],className:H.CLASS}).ok);
assert(C.useFeature(h,'bloodMaledict',{curse:'marked',target:t,distanceFt:5,className:H.CLASS}).ok);
rolls(1);assert(!attack(h,t).hit);assert(h.classFeaturesState.bhHexbladeTarget);
rolls();r=attack(h,t);assert.equal(r.damageResult.amount,3+h.proficiencyBonus);
r=attack(h,t);assert.equal(r.damageResult.amount,3);
// Undead halves just the necrotic component before resistance, and spends only once.
h=hunter('undead');h.resistances=['necrotic'];const before=h.hpCurrent,prior=h.resources.bloodMaledict.current;
r=B.applyDamage(h,20,'necrotic',{damageParts:[{amount:12,damageType:'necrotic'},{amount:8,damageType:'fire'}],defenderReaction:'blood-hunter-undead-focus'});
assert.equal(r.amount,11);assert.equal(h.hpCurrent,before-11);assert.equal(h.resources.bloodMaledict.current,prior-1);
const pending={amount:10,damageType:'necrotic'};
assert(!C.useFeature(h,'riteFocus',{pendingDamage:pending,className:H.CLASS}).ok);assert.equal(pending.amount,10);
C.resetTurn(h);const snapshot=JSON.stringify(h.resources);
assert(!C.useFeature(h,'riteFocus',{pendingDamage:{amount:10,damageType:'fire'},className:H.CLASS}).ok);assert.equal(JSON.stringify(h.resources),snapshot);
// The common reaction picker preserves typed parts, including fire before necrotic.
h=hunter('undead');let options=C.reactionOptions(h,{amount:20,damageType:'fire',damageParts:[{amount:8,damageType:'fire'},{amount:12,damageType:'necrotic'}]});
assert(options.options.some(x=>x.id==='bloodHunterUndeadFocus'));
r=B.applyDamage(h,20,'fire',{damageParts:[{amount:8,damageType:'fire'},{amount:12,damageType:'necrotic'}],reactionChoice:'bloodHunterUndeadFocus'});
assert.equal(r.amount,14);assert.equal(r.damageParts[0].amount,8);assert.equal(r.damageParts[1].amount,6);
assert.equal(h.turnResources.reaction,false);
assert(!C.reactionOptions(h,{amount:20,damageType:'necrotic'}));
// Undying heals a real living target's lethal hit; repeated hits on zero HP give no healing.
h=hunter('undying');t=foe();t.hpCurrent=1;h.hpCurrent=10;rolls();
r=attack(h,t);assert.equal(h.hpCurrent,11);attack(h,t);assert.equal(h.hpCurrent,11);
// Sapping Scar applies to this hunter's spells only and survives save/load.
h=hunter('fiend');t=foe();r=attack(h,t,{brandCastigation:true});assert(t.classFeaturesState.bloodHunterBrand);
t=JSON.parse(JSON.stringify(t));rolls();B.savingThrow(t,'wis',15,'normal',{fromSpell:true,spellCaster:h});
B.savingThrow(t,'wis',15,'normal',{fromSpell:true,spellCaster:foe()});B.savingThrow(t,'wis',15);
assert.deepEqual(modes,['disadvantage','normal','normal']);
// Missing or disabled class never projects magical mobility or adds attack bonuses.
g.DNDContent.setEnabled('blood-hunter',false);assert.equal(H.mobility(h).flyFt,0);
console.log('PASS: profane focus combat, mixed damage, lifecycle, immunity, JSON and source scope');
