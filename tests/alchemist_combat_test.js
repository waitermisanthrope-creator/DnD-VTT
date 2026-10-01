const fs=require('fs'),vm=require('vm'),assert=require('assert');
let registered=null;
let rolls=[{result:20,critical:true,fumble:false},{result:1,critical:false,fumble:false}];
const ctx={console,Math,Date,JSON,Set,Number,String,Array,Object,RegExp,parseInt,parseFloat,
  DNDContent:{registerClass:p=>{registered=p;}},document:{getElementById:()=>null},addEventListener:()=>{},window:null};
ctx.window=ctx;ctx.globalThis=ctx;ctx.DNDRules={
  rollD20:()=>rolls.shift()||{result:1,critical:false,fumble:false},
  getSaveBonus:()=>-100,
  normalizeConditionName:x=>String(x),
  conditionModifiers:()=>({autoFailStrDex:false}),
  profBonus:()=>3
};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(__dirname+'/../app/alchemist_mhp_2024_runtime.js','utf8'),ctx);
assert.ok(registered,'Alchemist runtime registers');
const hooks=registered.hooks;
const attacker={classes:[{name:'Алхимик',level:8,subclass:'apothecary'}],abilityScores:{intelligence:16,dexterity:14},proficiencyBonus:3,resources:{},classFeaturesState:{}};
hooks.sync(attacker);
assert.equal(hooks.useFeature(attacker,'alchemist-formula',{formulas:['acid','fear','cryo']}).ok,true);
assert.equal(hooks.useFeature(attacker,'alchemist-formula',{formula:'acid'}).ok,true);
ctx.DNDClassFeatures={
  attackModifiers:(hero,opts)=>hooks.attackModifiers(hero,opts),
  saveModifiers:()=>null,
  consumePendingOnHit:()=>({}),
  onAttackResult:()=>{}
};
vm.runInContext(fs.readFileSync(__dirname+'/../app/combat_engine.js','utf8'),ctx);
const target={id:'dummy',name:'Манекен',ac:15,hp:40,maxHp:40,saveBonuses:{dex:-100},conditions:{},activeConditions:{},classFeaturesState:{}};
const result=ctx.DNDCombat.attack(attacker,target,{bonus:10,damage:'1d6',damageType:'огонь',isBomb:true,target:target,useRules:false});
assert.equal(result.hit,true,'attack hits target');
assert.ok(result.alchemistFormulaEffect,'acid formula is resolved by combat engine on hit');
assert.equal(result.alchemistFormulaEffect.save.success,false,'target fails formula saving throw');
assert.equal(target.classFeaturesState.alchemistDebuffs.acPenalty,3,'failed save applies AC penalty');
assert.equal(target.ac,15,'formula does not destructively alter base AC');

target.classFeaturesState.alchemistDebuffs.savePenalty=2;
rolls=[{result:20,critical:true,fumble:false}];
const penalizedSave=ctx.DNDCombat.savingThrow(target,'dex',10);
assert.equal(penalizedSave.bonus,-102,'alchemist formula save penalty modifies real save total');
attacker.classFeaturesState.alchemistDebuffs={attackPenalty:3};
rolls=[{result:20,critical:true,fumble:false}];
const penalizedAttack=ctx.DNDCombat.attack(attacker,{id:'second',ac:12,hp:20,maxHp:20},{bonus:0,damage:'1',useRules:false});
assert.equal(penalizedAttack.classBonus,-3,'alchemist formula attack penalty modifies real attack total');

const invisibleAttacker={id:'invisible-alchemist',classes:[{name:'Алхимик',level:3,subclass:'apothecary'}],abilityScores:{intelligence:14,dexterity:14},proficiencyBonus:2,resources:{},activeConditions:{'Невидим':true},conditions:{'Невидим':true},classFeaturesState:{alchemistActiveEffects:[{name:'Зелье невидимости',effect:{condition:'Невидим',endsOnAttack:true,durationMinutes:60},remainingMinutes:60}]}};
rolls=[{result:1,critical:false,fumble:true}];
ctx.DNDCombat.attack(invisibleAttacker,{id:'third',ac:12,hp:20,maxHp:20},{bonus:0,damage:'1',useRules:false});
assert.equal(invisibleAttacker.classFeaturesState.alchemistActiveEffects.length,0,'invisibility potion ends after an attack even on a miss');
assert.equal(invisibleAttacker.activeConditions['Невидим'],undefined,'invisibility condition clears after attacking');

const xenoHero={id:'xeno',classes:[{name:'Алхимик',level:14,subclass:'xenoalchemist'}],hp:3,maxHp:30,hitPoints:3,classFeaturesState:{xenoNecroticReady:true},conditions:{},resistances:[]};
const revival=ctx.DNDCombat.applyDamage(xenoHero,5,'огонь');
assert.equal(xenoHero.hp,14,'Necromantic Organs restore HP equal to Alchemist level instead of dropping to zero');
assert.equal(xenoHero.classFeaturesState.xenoNecroticReady,false,'Necromantic Organs charge is consumed');
assert.equal(xenoHero.classFeaturesState.xenoNecroticUsed,true,'Necromantic Organs cannot trigger twice before rest');
assert.equal(xenoHero.defeated,false,'Necromantic Organs prevent defeat');
assert.ok(revival.note.includes('Некромантические органы'),'combat log reports the revival');

const immuneFire=ctx.DNDCombat.effectiveDamage({immunities:['огонь']},10,'огонь',{immunityBecomesResistance:true});
assert.equal(immuneFire.amount,5,'black powder converts immunity into resistance');
const resistantFire=ctx.DNDCombat.effectiveDamage({resistances:['огонь']},10,'огонь',{ignoreResistance:true});
assert.equal(resistantFire.amount,10,'black powder bypasses ordinary resistance');

const ownerBombHit=ctx.DNDCombat.effectiveDamage({classFeaturesState:{alchemistHomunculusOwner:'alch'}},12,'огонь',{isBomb:true,attackerId:'alch'});
assert.equal(ownerBombHit.amount,0,'homunculus is immune to its creator Alchemist bombs');


const oldRandom=ctx.Math.random;ctx.Math.random=()=>0.999;
rolls=[{result:20,critical:true,fumble:false}];
const ionizerTarget={id:'ionizer-defender',classes:[{name:'Алхимик',level:14,subclass:'ionizer'}],ac:15,hp:25,maxHp:25,abilityScores:{intelligence:16,dexterity:14},proficiencyBonus:5,resources:{},classFeaturesState:{},conditions:{},resistances:[]};
const deflected=ctx.DNDCombat.attack({id:'ranged-attacker',classes:[],stats:{}},ionizerTarget,{bonus:10,damage:'1d8',damageType:'молния',attackKind:'rangedWeapon',rangedAttack:true,useRules:false});
ctx.Math.random=oldRandom;
assert.equal(deflected.hit,false,'Electromagnetic Shield deflects a qualifying ranged hit on a six');
assert.equal(ionizerTarget.classFeaturesState.alchemistEnergyCharges,1,'Electromagnetic Shield stores one energy charge');
const dischargeTarget={id:'discharge-target',hp:30,maxHp:30,ac:12,conditions:{},resistances:[]};
const discharge=hooks.useFeature(ionizerTarget,'alchemist-subclassFeature',{featureName:'Энергетический разряд',target:dischargeTarget,charges:1,damageRoll:7,distanceFt:20},{subclassId:'ionizer'});
assert.equal(discharge.ok,true,'Energy Discharge spends a stored charge on a valid target');
assert.equal(dischargeTarget.hp,23,'Energy Discharge applies actual force damage');
assert.equal(ionizerTarget.classFeaturesState.alchemistEnergyCharges,0,'Energy Discharge consumes exactly one charge');

const poisonedCombatant={id:'poisoned',name:'Отравлённый',type:'monster',hp:20,maxHp:20,ac:12,saveBonuses:{con:-100},conditions:{'Отравлен':true},activeConditions:{'Отравлен':true},classFeaturesState:{alchemistToxicVengeance:{dc:18,remainingTurns:2,nextTick:true,damage:'1d10'}}};
const alchemistCombatant={id:'alch-turn',name:'Алхимик',type:'hero',classes:[{name:'Алхимик',level:14,subclass:'venomsmith'}],abilityScores:{intelligence:16,dexterity:14},proficiencyBonus:5,resources:{},classFeaturesState:{},hp:20,maxHp:20,ac:15};
ctx.currentChar={id:'alch-turn',name:'Алхимик',classes:alchemistCombatant.classes,abilityScores:alchemistCombatant.abilityScores,proficiencyBonus:5,resources:{},classFeaturesState:{},initiativeTracker:{round:1,activeIndex:0,combatants:[alchemistCombatant,poisonedCombatant]}};
vm.runInContext(fs.readFileSync(__dirname+'/../app/gameplay_core_v57.js','utf8'),ctx);
const turnOne=ctx.DNDGameplayV57.endTurn();
assert.equal(turnOne.ok,true,'turn engine advances to the poisoned target');
assert.ok(poisonedCombatant.hp<20,'Toxic Vengeance deals 1d10 poison damage at target turn start');
const hpAfterTick=poisonedCombatant.hp;
const turnTwo=ctx.DNDGameplayV57.endTurn();
assert.equal(turnTwo.ok,true,'turn engine advances back to the Alchemist');
assert.equal(poisonedCombatant.classFeaturesState.alchemistToxicVengeance.nextTick,true,'failed end-of-turn save schedules another poison tick');
assert.ok(poisonedCombatant.hp<=hpAfterTick,'poison tick remains applied through the turn cycle');






assert.equal(ctx.DNDCombat.attack(target,{id:'second',ac:12,hp:20,maxHp:20}, {bonus:0,damage:'1',useRules:false}).ac,12,'test combat engine remains callable after formula resolution');

const pheromoneOwner={id:'pheromone-owner',name:'Алхимик-фумарий',classes:[{name:'Алхимик',level:3,subclass:'amorist'}],abilityScores:{intelligence:16,dexterity:14},proficiencyBonus:2,resources:{},classFeaturesState:{}};
hooks.sync(pheromoneOwner);
const pheromoneTarget={id:'pheromone-target',hp:20,maxHp:20,conditions:{},activeConditions:{},classFeaturesState:{}};
const pheromone=hooks.useFeature(pheromoneOwner,'alchemist-subclassFeature',{featureName:'Бомба с феромонами',target:pheromoneTarget},{subclassId:'amorist'});
assert.equal(pheromone.ok,true,'Pheromone Bomb resolves its Wisdom save');
assert.equal(pheromoneTarget.activeConditions['Очарован'],true,'failed save applies charmed condition');
assert.equal(pheromoneTarget.classFeaturesState.alchemistDebuffs.endsOnDamage,true,'charm is marked to end when target takes damage');
ctx.DNDCombat.applyDamage(pheromoneTarget,1,'дробящий');
assert.equal(pheromoneTarget.activeConditions['Очарован'],undefined,'taking damage ends Pheromone Bomb charm');
assert.equal(pheromoneTarget.classFeaturesState.alchemistDebuffs.endsOnDamage,undefined,'on-damage trigger is consumed');

rolls=[{result:10,critical:false,fumble:false}];
const graftArmorTarget={id:'graft-armor',ac:10,hp:20,maxHp:20,abilityScores:{dexterity:14},conditions:{},activeConditions:{},classFeaturesState:{alchemistGrafts:[{name:'Звериная шкура'}]}};
const graftArmorAttack=ctx.DNDCombat.attack(attacker,graftArmorTarget,{bonus:0,damage:'1',useRules:false});
assert.equal(graftArmorAttack.ac,15,'Beast Hide graft sets unarmored AC to 13 plus Dexterity');
rolls=[{result:20,critical:true,fumble:false}];
const graftCriticalTarget={id:'graft-critical',ac:10,hp:20,maxHp:20,conditions:{},activeConditions:{},classFeaturesState:{alchemistGrafts:[{name:'Изменчивая анатомия'}]}};
const graftCriticalAttack=ctx.DNDCombat.attack(attacker,graftCriticalTarget,{bonus:0,damage:'1d8',useRules:false});
assert.equal(graftCriticalAttack.hit,true,'Mutable Anatomy still allows a natural 20 to hit');
assert.equal(graftCriticalAttack.critical,false,'Mutable Anatomy turns a critical hit into a normal hit');


const energySeamTarget={id:'energy-seam-target',hp:20,maxHp:20,conditions:{},activeConditions:{},classFeaturesState:{alchemistGrafts:[{name:'Энергетический шов',resistanceType:'огонь'}]}};
const seamDamage=ctx.DNDCombat.applyDamage(energySeamTarget,10,'огонь');
assert.equal(seamDamage.amount,5,'Energy Stitch halves damage of the selected donor type');
const burningTarget={id:'burning-target',hp:20,maxHp:20,ac:10,conditions:{},activeConditions:{},classFeaturesState:{alchemistDebuffs:{burning:true,burningTicks:1,sourceId:'incendiary-owner'}}};
const burningOwner={id:'incendiary-owner',name:'Поджигатель',classes:[{name:'Алхимик',level:5,subclass:'madBomber'}],abilityScores:{intelligence:16,dexterity:14},proficiencyBonus:3,resources:{},classFeaturesState:{}};
ctx.currentChar=burningOwner;burningOwner.initiativeTracker={round:1,activeIndex:1,combatants:[burningOwner,burningTarget]};
const beforeBurn=burningTarget.hp;
const oldRandomForBurn=ctx.Math.random;ctx.Math.random=()=>0.999;
ctx.DNDGameplayV57.startTurn();
ctx.Math.random=oldRandomForBurn;
assert.equal(burningTarget.hp,beforeBurn-6,'Incendiary Bomb deals real fire damage at the start of the burning target turn');
assert.equal(burningTarget.classFeaturesState.alchemistDebuffs.burning,undefined,'Incendiary Bomb burning expires after its scheduled tick');
const poisonedAttacker={id:'poisoned-attacker',classes:[{name:'Алхимик',level:3,subclass:'xenoalchemist'}],abilityScores:{intelligence:16,dexterity:14},proficiencyBonus:2,resources:{},classFeaturesState:{alchemistPoisonedWeaponId:'dagger'}};
hooks.sync(poisonedAttacker);
const poisonImmuneTarget={id:'poison-immune-target',ac:10,hp:30,maxHp:30,immunities:['яд'],conditions:{},activeConditions:{},classFeaturesState:{}};
const oldRandomPoison=ctx.Math.random;ctx.Math.random=()=>0.999;rolls=[{result:20,critical:true,fumble:false}];
const poisonedStrike=ctx.DNDCombat.attack(poisonedAttacker,poisonImmuneTarget,{bonus:10,damage:'1d4',damageType:'дробящий',weaponAttack:true,weaponId:'dagger',weapon:{id:'dagger',rangeFt:5},target:poisonImmuneTarget,useRules:false});
ctx.Math.random=oldRandomPoison;
assert.equal(poisonedStrike.damageResult.amount,8,'Poison immunity prevents poison dice while preserving the critical physical damage');
assert.equal(poisonImmuneTarget.hp,22,'Poison immunity prevents only the poison dice, not the physical hit');
console.log('Alchemist combat integration tests PASS');
