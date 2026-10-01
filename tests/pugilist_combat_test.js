const fs=require('fs'),vm=require('vm'),assert=require('assert');
let randomValue=0.99;
const math=Object.create(Math);math.random=()=>randomValue;
const ctx={console,Math:math,Date,JSON,Set,Number,String,Array,Object,RegExp,parseInt,parseFloat,
  document:{getElementById:()=>null,querySelectorAll:()=>[],addEventListener:()=>{}},
  addEventListener:()=>{},setTimeout:()=>{},clearTimeout:()=>{},prompt:()=>null,alert:()=>{},window:null};
ctx.window=ctx;ctx.globalThis=ctx;
ctx.DNDRules={
  parseDice(expr){const m=String(expr).match(/(\\d+)d(\\d+)(?:([+-])(\\d+))?/i);return m?{groups:[{count:Number(m[1]),sides:Number(m[2])}],constant:m[3]?(m[3]==='-'?-1:1)*Number(m[4]):0}:{groups:[{count:1,sides:6}],constant:0};},
  rollD20(){return {result:19,critical:false,fumble:false};}
};
ctx.DNDContent={packs:[],registerClass(p){this.packs.push(p);},listClasses(){return this.packs.map(p=>({name:p.displayName||p.name}));},getClass(n){return this.packs.find(p=>p.displayName===n||p.name===n||p.id===n)||null;}};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(__dirname+'/../app/expansion_classes_pack.js','utf8'),ctx);
vm.runInContext(fs.readFileSync(__dirname+'/../app/class_features_engine.js','utf8'),ctx);
vm.runInContext(fs.readFileSync(__dirname+'/../app/combat_engine.js','utf8'),ctx);
const pack=ctx.DNDContent.getClass('Пугилист');
assert.ok(pack&&pack.hooks,'Pugilist pack and hooks register');
function hero(level,subclass,extra={}){return Object.assign({id:'pugilist-'+level,classes:[{name:'Пугилист',level,subclass}],stats:{str:16,con:14,dex:10,wis:10,cha:12,int:10},abilityScores:{strength:16,constitution:14,dexterity:10,wisdom:10,charisma:12,intelligence:10},proficiencyBonus:3,hp:30,maxHp:30,tempHp:0,resources:{},classFeaturesState:{}},extra);}
function target(id,ac=1){return{id,hp:30,maxHp:30,ac,tempHp:0,conditions:{},activeConditions:{},resistances:[],immunities:[],vulnerabilities:[],classFeaturesState:{}};}
const boxer=hero(17,'Благородное искусство');pack.hooks.sync(boxer);
const modifiers=ctx.DNDClassFeatures.attackModifiers(boxer,{target:target('crit'),unarmedAttack:true});
assert.equal(modifiers.criticalRange,19,'Saved subclass name resolves to Sweet Science in the actual class-feature engine');
assert.equal(modifiers.unarmedDie,'1d12','Level 17 Fisticuffs die reaches the combat resolver');
const critTarget=target('crit');
const crit=ctx.DNDCombat.attack(boxer,critTarget,{bonus:0,damage:'1d4',damageType:'дробящий',unarmedAttack:true,useRules:false});
assert.equal(crit.critical,true,'Natural 19 is critical through the real combat pipeline');
assert.equal(crit.damage.expression,'1d12','Fisticuffs replaces the supplied unarmed damage die');
assert.equal(crit.damage.rolls.length,2,'Critical Fisticuffs attack rolls two d12');
assert.equal(critTarget.hp,30-crit.damage.total,'Resolved Fisticuffs damage is applied to target HP');
const haymaker=hero(5,'Арена Рояль');pack.hooks.sync(haymaker);
assert.equal(pack.hooks.useFeature(haymaker,'haymaker',{}).ok,true,'Haymaker activates at level 5');
randomValue=0.1;
const hayTarget=target('haymaker-target');
const hay=ctx.DNDCombat.attack(haymaker,hayTarget,{bonus:0,damage:'1d6',damageType:'рубящий',useRules:false});
assert.equal(hay.hit,true,'Haymaker fixture hits');
assert.equal(hay.damage.total,6,'Haymaker maximizes actual damage die');
assert.equal(hay.damage.maximized,true,'Combat result marks damage dice as maximized');
assert.equal(hayTarget.hp,24,'Maximized damage is actually applied to target HP');
const arena=hero(17,'Арена Рояль');pack.hooks.sync(arena);
const sigTarget=target('signature-target');
assert.equal(pack.hooks.useFeature(arena,'signatureMove',{target:sigTarget}).ok,true,'Signature Move can be prepared against a selected target');
const wrong=target('wrong-target');
ctx.DNDCombat.attack(arena,wrong,{bonus:0,damage:'1d6',damageType:'дробящий',useRules:false});
assert.equal(arena.classFeaturesState.pugilistSignatureMovePending,true,'Signature Move does not consume itself on a different target');
assert.equal(wrong.conditions['Оглушён'],undefined,'Signature Move does not stun the wrong target');
const sig=ctx.DNDCombat.attack(arena,sigTarget,{bonus:0,damage:'1d6',damageType:'дробящий',useRules:false});
assert.equal(sig.critical,true,'Signature Move forces a critical hit on its chosen target');
assert.equal(!!sigTarget.conditions['Оглушён'],true,'Signature Move applies stun to its chosen target');
assert.equal(arena.classFeaturesState.pugilistSignatureMovePending,false,'Signature Move clears after its chosen target is hit');
const missArena=hero(17,'Арена Рояль');pack.hooks.sync(missArena);
const missTarget=target('miss-target',99);
const resourceBefore=missArena.resources.pugilistSignatureMove.current;
pack.hooks.useFeature(missArena,'signatureMove',{target:missTarget});
ctx.DNDCombat.attack(missArena,missTarget,{bonus:-100,damage:'1d6',damageType:'дробящий',useRules:false});
assert.equal(missArena.classFeaturesState.pugilistSignatureMovePending,false,'Signature Move clears after a miss');
assert.equal(missArena.resources.pugilistSignatureMove.current,resourceBefore,'Signature Move charge is restored after a miss');
const defender=target('dig-deep-defender');
defender.classFeaturesState.pugilistDigDeepActive={roundsRemaining:10,damageTypes:['bludgeoning','piercing','slashing']};
const resisted=ctx.DNDCombat.applyDamage(defender,11,'рубящий',{attackerId:'enemy'});
assert.equal(resisted.amount,5,'Dig Deep halves physical damage');
assert.equal(defender.hp,25,'Dig Deep changes actual HP');
assert.equal(ctx.DNDCombat.effectiveDamage(defender,11,'огонь',{}).amount,11,'Dig Deep does not resist fire');
const expired=target('expired-dig-deep');expired.classFeaturesState.pugilistDigDeepActive={roundsRemaining:0};
assert.equal(ctx.DNDCombat.effectiveDamage(expired,11,'рубящий',{}).amount,11,'Expired Dig Deep no longer resists damage');
const hpShape=hero(18,'Арена Рояль',{hpCurrent:0,hpMax:40});delete hpShape.hp;delete hpShape.maxHp;
pack.hooks.sync(hpShape);
assert.equal(pack.hooks.useFeature(hpShape,'fightingSpirit',{}).ok,true,'Fighting Spirit supports the app hpCurrent/hpMax shape');
assert.equal(hpShape.hpCurrent,20,'Fighting Spirit restores half max HP in the app data shape');
assert.equal(hpShape.classFeaturesState.pugilistExhaustion,1,'Fighting Spirit adds one exhaustion level');
console.log('Pugilist combat integration tests: PASS (real class hooks, subclass mapping, Fisticuffs die, Haymaker, target-bound Signature Move hit/miss, Dig Deep resistance, Fighting Spirit HP shape)');
