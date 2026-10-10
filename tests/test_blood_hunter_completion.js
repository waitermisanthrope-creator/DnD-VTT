const assert=require('assert');
const {runtime,hero}=require('./helpers/class_runtime_harness');
const g=runtime(),C=g.DNDClassFeatures,B=g.DNDCombat,H=g.DNDBloodHunter,D=g.DNDContent;
let serial=0,modes=[];
function h(level=20,order='ghostslayer'){const a=hero('Кровавый охотник',level,order);a.id='bh-'+(++serial);a.weapons=[{id:'sword',name:'Меч',damageDice:'1d6',damageType:'slashing',rangeFt:5},{id:'bow',name:'Лук',damageDice:'1d6',rangeFt:80}];C.buildFeatureSet(a);return a;}
function foe(){const t=hero('Enemy',1);t.id='foe-'+(++serial);t.stats={strength:10,dexterity:10,constitution:10,intelligence:10,wisdom:10,charisma:10};t.hpCurrent=100;t.hpMax=100;return t;}
function rolls(n=11){modes=[];g.DNDRules.rollD20=mode=>{modes.push(mode);return {result:n,critical:n===20,fumble:n===1};};}
function learn(a,cs){assert.equal(C.useFeature(a,'chooseBloodCurses',{curses:cs,className:H.CLASS}).ok,true);}
function curse(a,t,id,extra={}){return C.useFeature(a,'bloodMaledict',{className:H.CLASS,curse:id,target:t,distanceFt:10,...extra});}
function attack(a,t,extra={}){return B.attack(a,t,{weapon:a.weapons[0],damageType:'slashing',bonus:0,useRules:false,distanceFt:5,...extra});}
g.Math.random=()=>0;rolls();
// No invented defaults; known-count progression follows 1, 6, 10, 14, 18.
for(let l=1;l<=20;l++){const a=h(l);assert.equal(a.classFeaturesState.bloodCursesKnown.length,0);const cap=l>=18?5:l>=14?4:l>=10?3:l>=6?2:1;const cs=['binding','marked','anxious','eyeless','exposure'];assert.equal(C.useFeature(a,'chooseBloodCurses',{curses:cs.slice(0,cap)}).ok,true);assert.equal(C.useFeature(a,'chooseBloodCurses',{curses:cs.concat('bloatedAgony').slice(0,cap+1)}).ok,false);assert(!a.resources.bhAetherWalk);assert(!a.resources.bhPactSlots);}
let a=h(14),t=foe();assert.equal(C.useFeature(a,'chooseCrimsonRites',{rites:['flame','oracle','roar']}).ok,true);assert.equal(C.useFeature(a,'crimsonRite',{weaponId:'unowned',riteType:'flame'}).ok,false);
a.hpTemp=100;a.resistances=['necrotic'];const before=a.hpCurrent;assert.equal(C.useFeature(a,'crimsonRite',{weaponId:'sword',riteType:'flame'}).ok,true);assert.equal(a.hpCurrent,before-1);assert.equal(a.hpTemp,100);
let r=attack(a,t);assert.equal(r.damage.typedExtraDice[0].type,'fire');assert.equal(r.damageResult.amount,2);assert.equal(C.attackModifiers(a,{weapon:a.weapons[1],weaponAttack:true}).typedExtraDice.length,0);assert.equal(C.attackModifiers(a,{}).typedExtraDice.length,0);
C.resetTurn(a);assert.equal(C.useFeature(a,'crimsonRite',{weaponId:'bow',riteType:'oracle'}).ok,true);assert.equal(a.classFeaturesState.crimsonRites.length,2);assert.equal(C.useFeature(a,'crimsonRite',{weaponId:'sword'}).ok,false);const saved=JSON.parse(JSON.stringify(a));C.buildFeatureSet(saved);assert.equal(H.activeRite(saved,{weapon:saved.weapons[1],weaponAttack:true}).type,'oracle');C.restore(a,'short');assert.equal(C.attackModifiers(a,{weapon:a.weapons[0],weaponAttack:true}).typedExtraDice.length,0);
// Non-hunters receive binding, repeated saves and action restrictions.
a=h(6);t=foe();learn(a,['binding','anxious']);rolls(1);const charges=a.resources.bloodMaledict.current;assert.equal(curse(a,t,'marked').ok,false);assert.equal(a.resources.bloodMaledict.current,charges);assert.equal(curse(a,t,'binding',{distanceFt:31}).ok,false);assert.equal(curse(a,t,'binding').applied,true);assert.equal(t.speed,0);C.resetTurn(t);assert.equal(t.turnResources.movement,0);assert.equal(t.turnResources.reaction,0);C.onTurnEnd(a);assert.equal(t.speed,0);C.onTurnEnd(a);assert.equal(t.speed,30);
C.resetTurn(a);C.restore(a,'short');assert.equal(curse(a,t,'binding',{amplify:true}).applied,true);rolls(20);C.onTurnEnd(t);assert.equal(t.speed,30);
// Mark adds a die on every rite hit this turn, then ends at the correct owner turn.
a=h();t=foe();learn(a,['marked']);C.useFeature(a,'chooseCrimsonRites',{rites:['flame']});C.useFeature(a,'crimsonRite',{weaponId:'sword'});C.resetTurn(a);assert.equal(curse(a,t,'marked',{amplify:true}).ok,true);rolls(11);r=attack(a,t);assert.equal(modes[0],'advantage');assert.equal(r.damageResult.amount,3);r=attack(a,t);assert.equal(modes[1],'normal');assert.equal(r.damageResult.amount,3);C.onTurnEnd(a);r=attack(a,t);assert.equal(r.damageResult.amount,2);
// Amplified anxious consumes exactly the next Wisdom save; concentration curse
// uses the actual damage/concentration pipeline and does not affect other CON saves.
a=h();t=foe();learn(a,['anxious','muddledMind']);assert.equal(curse(a,t,'anxious',{amplify:true}).ok,true);rolls();B.savingThrow(t,'wis',10);B.savingThrow(t,'wis',10);assert.deepEqual(modes,['disadvantage','normal']);C.resetTurn(a);B.beginConcentration(t,{name:'Тест',concentration:true});assert.equal(curse(a,t,'muddledMind').ok,true);rolls();B.savingThrow(t,'con',10);B.applyDamage(t,1,'fire');assert.deepEqual(modes,['normal','disadvantage']);
// Bloated Agony damages a real creature once when it makes its second attack.
a=h();t=foe();learn(a,['bloatedAgony']);curse(a,t,'bloatedAgony');const victim=foe(),old=t.hpCurrent;rolls();B.attack(t,victim,{damage:'1d6',damageType:'slashing'});assert.equal(t.hpCurrent,old);B.attack(t,victim,{damage:'1d6',damageType:'slashing'});assert.equal(t.hpCurrent,old-1);B.attack(t,victim,{damage:'1d6',damageType:'slashing'});assert.equal(t.hpCurrent,old-1);assert.equal(C.checkModifiers(t,{stat:'dex'}).disadvantage,true);
// Exposure changes the triggering damage and remains through the target's turn.
a=h();t=foe();learn(a,['exposure']);t.resistances=['fire'];r=B.applyDamage(t,10,'fire',{defenderReaction:'blood-curse-exposure',bloodCurseActor:a,bloodCurseDistanceFt:10,attacker:foe()});assert.equal(r.amount,10);assert.equal(a.turnResources.reaction,0);C.onTurnEnd(t);assert.equal(B.applyDamage(t,10,'fire').amount,5);
a=h();t=foe();learn(a,['exposure']);t.immunities=['fire'];r=B.applyDamage(t,10,'fire',{defenderReaction:'blood-curse-exposure',bloodCurseActor:a,bloodCurseDistanceFt:10,bloodCurseAmplify:true});assert.equal(r.amount,5);
// Eyeless modifies the pending attack before deciding a hit, not after damage.
a=h();t=foe();learn(a,['eyeless']);a.ac=11;rolls(11);r=B.attack(t,a,{damage:'1d6',damageType:'slashing',distanceFt:5,defenderReaction:'blood-curse-eyeless'});assert.equal(r.total,10);assert.equal(r.hit,false);assert.equal(a.turnResources.reaction,0);
// Order-granted curses are extra choices, and cannot be borrowed by another order.
a=h(15,'mutant');t=foe();assert.equal(curse(a,t,'corrosion',{amplify:true}).applied,true);assert.equal(t.conditions['Отравлен'],true);assert.equal(t.hpCurrent,96);rolls(1);C.onTurnEnd(t);assert.equal(t.hpCurrent,92);rolls(20);C.onTurnEnd(t);assert.equal(t.conditions['Отравлен'],false);assert.equal(curse(h(14,'mutant'),foe(),'corrosion').ok,false);
a=h(15);t=foe();t.conditions={'Очарован':true};const controller=foe();rolls(1);r=curse(a,t,'exorcist',{amplify:true,controller});assert.equal(r.ok,true);assert.equal(t.conditions['Очарован'],false);assert.equal(controller.hpCurrent,97);assert.equal(controller.conditions['Оглушён'],true);C.onTurnEnd(a);C.onTurnEnd(a);assert.equal(controller.conditions['Оглушён'],false);
// A real rite hit brands the enemy; damage is retaliated only when that enemy
// harms the owner/nearby ally, instead of an incorrect bonus on every own attack.
a=h(13);t=foe();C.useFeature(a,'chooseCrimsonRites',{rites:['flame']});C.useFeature(a,'crimsonRite',{weaponId:'sword'});rolls();r=attack(a,t,{brandCastigation:true});assert.equal(t.classFeaturesState.bloodHunterBrand.ownerId,a.id);const brandedHp=t.hpCurrent;B.applyDamage(a,5,'fire',{attacker:t});assert.equal(t.hpCurrent,brandedHp-6);assert.equal(C.attackModifiers(a,{target:t,weapon:a.weapons[0],weaponAttack:true}).bonusDamage,0);
// No critical refund without the exact rite-bearing weapon; real crit refunds.
a=h();t=foe();C.useFeature(a,'chooseCrimsonRites',{rites:['flame']});C.useFeature(a,'crimsonRite',{weaponId:'sword'});a.resources.bloodMaledict.current=0;rolls(20);attack(a,t,{weapon:a.weapons[1]});assert.equal(a.resources.bloodMaledict.current,0);attack(a,t);assert.equal(a.resources.bloodMaledict.current,1);
// Direct runtime calls have the same class/level/disabled restrictions as UI.
a=h(1);assert.equal(H.useFeature(a,'chooseCrimsonRites',{rites:['flame']}).ok,false);assert.equal(H.useFeature(hero('Воин',20),'bloodMaledict',{}).ok,false);a=h();D.setEnabled('blood-hunter',false);assert.equal(H.useFeature(a,'bloodMaledict',{}).ok,false);D.setEnabled('blood-hunter',true);
console.log('Blood Hunter completion core: PASS (real damage, saves, weapon scope, choices, curses, lifecycle and JSON)');
