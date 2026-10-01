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



assert.equal(ctx.DNDCombat.attack(target,{id:'second',ac:12,hp:20,maxHp:20}, {bonus:0,damage:'1',useRules:false}).ac,12,'test combat engine remains callable after formula resolution');
console.log('Alchemist combat integration tests PASS');
