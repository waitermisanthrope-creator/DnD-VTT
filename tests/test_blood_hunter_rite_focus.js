const assert = require('assert');
const {runtime,hero} = require('./helpers/class_runtime_harness');
const g=runtime(), H=g.DNDBloodHunter, C=g.DNDClassFeatures, B=g.DNDCombat;
assert(H,'Blood Hunter runtime must be registered');
let serial=0;
function hunter(patron,level=11){
 const h=hero('Кровавый охотник',level,'Орден осквернённых душ');
 h.id='patron-hero-'+(++serial);h.ac=10;
 h.weapons=[{id:'sword',name:'Меч',damageDice:'1d6',damageType:'slashing',rangeFt:5}];
 C.buildFeatureSet(h);
 assert.strictEqual(C.useFeature(h,'otherworldlyPatron',{patron,className:H.CLASS}).ok,true);
 assert.strictEqual(C.useFeature(h,'chooseCrimsonRites',{rites:['flame'],className:H.CLASS}).ok,true);
 assert.strictEqual(C.useFeature(h,'crimsonRite',{weaponId:'sword',riteType:'flame',className:H.CLASS}).ok,true);
 C.resetTurn(h);return h;
}
function foe(hp=50){
 const a=hero('Воин',1);a.id='patron-target-'+(++serial);a.ac=10;
 a.hpCurrent=hp;a.hpMax=Math.max(hp,40);a.coverBonus=0;return a;
}
function attack(h,t,extras={}){
 return B.attack(h,t,{weapon:h.weapons[0],damageType:'slashing',bonus:0,useRules:false,distanceFt:5,...extras});
}
function fixedRoll(n){
 g.DNDRules.rollD20=()=>({result:n,critical:n===20,fumble:n===1});
}
g.Math.random=()=>0;fixedRoll(11);

// Archfey: real hit with active rite reveals cover/invisibility and expires.
let h=hunter('archfey'), t=foe();
t.coverBonus=5;let outsider=foe();
assert.strictEqual(B.attack(outsider,t,{damage:'1d6',damageType:'slashing',useRules:false,bonus:0}).hit,false);
assert.strictEqual(attack(h,t,{coverBonus:0}).hit,true);
assert.strictEqual(H.isRevealed(t),true);
assert.strictEqual(B.attack(outsider,t,{damage:'1d6',damageType:'slashing',useRules:false,bonus:0}).hit,true);
C.onTurnEnd(h);assert.strictEqual(H.isRevealed(t),true);
C.onTurnEnd(h);assert.strictEqual(H.isRevealed(t),false);

// Fathomless: water breathing and once-per-turn speed reduction, cleared next start.
h=hunter('fathomless');t=foe();assert.strictEqual(H.canBreatheUnderwater(h),true);
assert.strictEqual(attack(h,t).hit,true);assert.strictEqual(t.speed,20);
assert.strictEqual(attack(h,t).hit,true);assert.strictEqual(t.speed,20);
C.resetTurn(h);assert.strictEqual(t.speed,30);
assert.strictEqual(attack(h,t).hit,true);assert.strictEqual(t.speed,20);

// Genie: resource and bonus action are consumed once, flight has an expiry.
h=hunter('genie');const prior=h.resources.bloodMaledict.current;
let result=C.useFeature(h,'riteFocus',{className:H.CLASS});
assert.strictEqual(result.ok,true);assert.strictEqual(h.flySpeed,30);
assert.strictEqual(h.resources.bloodMaledict.current,prior-1);
assert.strictEqual(C.useFeature(h,'riteFocus',{className:H.CLASS}).ok,false);
const rounds=Math.max(1,Math.floor((h.stats.intelligence-10)/2));
for(let i=0;i<rounds;i++)C.onTurnEnd(h);
assert.strictEqual(H.flightSpeed(h),0);
assert.strictEqual(h.flySpeed,undefined);
const reloaded=JSON.parse(JSON.stringify(h));C.buildFeatureSet(reloaded);assert.strictEqual(H.flightSpeed(reloaded),0);

// Great Old One: critical hits frighten target and selected nearby creatures, not remote actors.
h=hunter('greatOldOne');t=foe();let near=foe(),far=foe();fixedRoll(20);
result=attack(h,t,{critFearTargets:[{target:near,distanceFt:8},{target:far,distanceFt:20}]});
assert.strictEqual(result.hit,true);
assert.strictEqual(t.conditions['Испуган'],true);
assert.strictEqual(near.conditions['Испуган'],true);
assert.notStrictEqual(far.conditions&&far.conditions['Испуган'],true);
C.onTurnEnd(h);C.onTurnEnd(h);
assert.strictEqual(t.conditions['Испуган'],false);

// Hexblade: after successful curse only next hit gains proficiency, never every attack.
h=hunter('hexblade');t=foe();fixedRoll(1);
assert.strictEqual(C.useFeature(h,'chooseBloodCurses',{className:H.CLASS,curses:['binding']}).ok,true);
result=C.useFeature(h,'bloodMaledict',{className:H.CLASS,curse:'binding',target:t,distanceFt:5});
assert.strictEqual(result.applied,true);
fixedRoll(11);
result=attack(h,t);assert.strictEqual(result.hit,true);
assert.strictEqual(result.damageResult.amount,2+h.proficiencyBonus);
result=attack(h,t);assert.strictEqual(result.damageResult.amount,2);

// Undead: only necrotic damage is halved, reaction is consumed, no unlimited rerolls.
h=hunter('undead');const hp=h.hpCurrent;
result=B.applyDamage(h,10,'necrotic',{defenderReaction:'profane-undead'});
assert.strictEqual(result.amount,5);assert.strictEqual(result.undeadRiteFocus.ok,true);
assert.strictEqual(h.hpCurrent,hp-5);assert.strictEqual(h.turnResources.reaction,false);
result=B.applyDamage(h,10,'necrotic',{defenderReaction:'profane-undead'});
assert.strictEqual(result.amount,10);

// Undying: needs confirmed hostile/mild-threat kill, no healing for trivial/nonhostile.
h=hunter('undying');h.hpCurrent=10;t=foe(2);
B.applyDamage(t,5,'fire',{attacker:h,bhHostile:false,bhMildThreat:true});
assert.strictEqual(h.hpCurrent,10);
t=foe(2);
result=B.applyDamage(t,5,'fire',{attacker:h,bhHostile:true,bhMildThreat:true});
assert.strictEqual(t.hpCurrent,0);assert.strictEqual(h.hpCurrent,11);
assert.strictEqual(result.undyingRiteHealing.amount,1);

// All nine patrons expose their appropriate focus, without invented resource charges.
for(const patron of ['archfey','fathomless','fiend','greatOldOne','hexblade','undead','undying']){
 const a=hunter(patron);const uses=a.resources.bloodMaledict.current;
 assert.strictEqual(C.useFeature(a,'riteFocus',{className:H.CLASS}).ok,true,patron);
 assert.strictEqual(a.resources.bloodMaledict.current,uses,patron);
}
// Sapping Scar: only the owner's pact spell save against a branded creature has disadvantage.
h=hunter('fiend',11);t=foe();fixedRoll(11);
result=attack(h,t,{brandCastigation:true});
assert.strictEqual(result.hit,true);
assert.strictEqual(t.classFeaturesState.bloodHunterBrand.ownerId,h.id);
const modes=[];
g.DNDRules.rollD20=mode=>{modes.push(mode);return {result:11,critical:false,fumble:false};};
B.savingThrow(t,'wis',15,'normal',{fromSpell:true,caster:h,castingClass:H.CLASS});
B.savingThrow(t,'wis',15,'normal',{fromSpell:true,caster:h,castingClass:'Волшебник'});
B.savingThrow(t,'wis',15,'normal',{fromSpell:true,caster:{id:h.id},castingClass:H.CLASS});
B.savingThrow(t,'wis',15,'normal',{fromSpell:true,caster:foe(),castingClass:H.CLASS});
B.savingThrow(t,'wis',15,'normal',{fromSpell:false,caster:h,castingClass:H.CLASS});
assert.deepStrictEqual(modes,['disadvantage','normal','disadvantage','normal','normal']);
assert.strictEqual(C.useFeature(h,'brandSappingScar',{className:H.CLASS}).ok,true);
console.log('PASS: all nine Profane Soul patron rite-focus paths and effect lifecycle');
