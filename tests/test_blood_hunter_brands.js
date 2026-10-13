const assert=require('assert');
const {runtime,hero}=require('./helpers/class_runtime_harness');
const g=runtime(),C=g.DNDClassFeatures,B=g.DNDCombat,H=g.DNDBloodHunter;
let serial=0;
function hunter(order,level){
 const a=hero('Кровавый охотник',level,order);a.id='bh-brand-owner-'+(++serial);
 a.weapons=[{id:'sword',name:'Меч',damageDice:'1d6',rangeFt:5}];C.buildFeatureSet(a);
 assert(C.useFeature(a,'chooseCrimsonRites',{rites:['flame']}).ok);
 assert(C.useFeature(a,'crimsonRite',{weaponId:'sword',riteType:'flame'}).ok);C.resetTurn(a);
 return a;
}
function victim(){const t=hero('Воин',1);t.id='bh-brand-target-'+(++serial);t.ac=10;t.hpCurrent=100;t.hpMax=100;return t;}
function hit(a,t){
 g.DNDRules.rollD20=()=>({result:20,critical:true,fumble:false});
 const attack=B.attack(a,t,{weapon:a.weapons[0],weaponAttack:true,damage:'1d6',damageType:'slashing',bonus:10,useRules:false,brandCastigation:true,distanceFt:5});
 assert(attack.hit,'branded attack must hit');
 assert(t.classFeaturesState.bloodHunterBrand,'on-hit must store the brand on its actual victim');
 return attack;
}
g.Math.random=()=>0;
let h=hunter('ghostslayer',13),t=victim();hit(h,t);
assert.strictEqual(H.canDash(t),false,'Brand of Tethering prevents Dash at level 13');
assert.strictEqual(H.canPhaseThroughObjects(t),false,'Brand of Sundering prevents incorporeal phasing');
assert.strictEqual(H.resolveBrandTravel(t,{kind:'unknown'}).ok,false);
let hp=t.hpCurrent;
g.DNDRules.rollD20=()=>({result:1,critical:false,fumble:true});
let blocked=H.resolveBrandTravel(t,{kind:'teleport'});
assert.strictEqual(blocked.ok,true);assert.strictEqual(blocked.allowed,false);
assert.strictEqual(blocked.damageRoll.total,4);
assert.strictEqual(t.hpCurrent,hp-4,'failed planar transit still inflicts 4d6 psychic damage');
g.DNDRules.rollD20=()=>({result:20,critical:true,fumble:false});
hp=t.hpCurrent;let passed=H.resolveBrandTravel(t,{kind:'planeShift'});
assert.strictEqual(passed.allowed,true);assert.strictEqual(t.hpCurrent,hp-4,'successful transit still inflicts 4d6');
let innocent=victim();
assert.strictEqual(H.canDash(innocent),true);
assert.strictEqual(H.canPhaseThroughObjects(innocent),true);
assert.strictEqual(H.resolveBrandTravel(innocent,{kind:'teleport'}).branded,false);
let weaker=hunter('ghostslayer',11),weakTarget=victim();hit(weaker,weakTarget);
assert.strictEqual(H.canDash(weakTarget),true,'Tethering unlocks at level 13');
assert.strictEqual(H.canPhaseThroughObjects(weakTarget),false,'Sundering unlocks at level 11');

// Mutant Axiom: dispel existing invisibility/illusion, revert transformed form
// on a failed Wisdom save and prevent future invisibility/shape changes.
let mutant=hunter('mutant',11),invisible=victim();
B.toggleCondition(invisible,'Невидим',true);invisible.illusionActive=true;invisible.alternativeForm={id:'wolf'};
g.DNDRules.rollD20=()=>({result:1,critical:false,fumble:true});
hit(mutant,invisible);
assert.strictEqual(H.brandedByAxiom(invisible),true);
assert.strictEqual(invisible.conditions['Невидим'],false,'invisibility ended on being branded');
assert.strictEqual(invisible.illusionActive,false,'illusion ended on being branded');
assert.strictEqual(invisible.alternativeForm,undefined,'failed save reverted the form');
assert.strictEqual(invisible.conditions['Оглушён'],true,'failed save stunned the target');
assert.strictEqual(B.toggleCondition(invisible,'Невидим',true),false,'new invisibility must be rejected');
g.DNDRules.rollD20=()=>({result:1,critical:false,fumble:true});
let shape=H.attemptBrandedShapeChange(invisible,{isShapeChange:true});
assert.strictEqual(shape.allowed,false,'failed save prevents the shape change');
C.onTurnEnd(mutant);C.onTurnEnd(mutant);
assert.strictEqual(invisible.conditions['Оглушён'],false,'stun ends after owner next turn');
g.DNDRules.rollD20=()=>({result:20,critical:true,fumble:false});
shape=H.attemptBrandedShapeChange(invisible,{isShapeChange:true});
assert.strictEqual(shape.allowed,true,'successful save allows a change without stun');
assert.strictEqual(H.attemptBrandedShapeChange(innocent,{isShapeChange:true}).branded,false);
console.log('PASS: Brand of Tethering/Sundering/Axiom on-hit, travel, form, save and lifecycle');
