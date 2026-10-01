const fs=require('fs'),vm=require('vm'),assert=require('assert');
let registered=null;
const ctx={console,Math,Date,JSON,Set,Number,String,Array,Object,RegExp,parseInt,parseFloat,
  DNDContent:{registerClass:p=>{registered=p;}},window:null};
ctx.window=ctx;ctx.globalThis=ctx;vm.createContext(ctx);
vm.runInContext(fs.readFileSync(__dirname+'/../app/alchemist_mhp_2024_runtime.js','utf8'),ctx);
assert.ok(registered,'Alchemist pack registers');
assert.equal(registered.subclasses.length,11,'all 11 subclasses registered');
const hooks=registered.hooks;
const hero={classes:[{name:'Алхимик',level:6,subclass:'apothecary'}],
  abilityScores:{intelligence:16,dexterity:14,constitution:12},proficiencyBonus:3,
  resources:{},classFeaturesState:{}};
hooks.sync(hero);
assert.equal(hero.resources.alchemistReagents.max,12,'level 6 reagent maximum');
const subclassResult=hooks.useFeature(hero,'alchemist-apothecary-3-Болеутоляющая бомба',{}, {subclassId:'apothecary'});
assert.equal(subclassResult.ok,true,'generated subclass feature ID resolves');
assert.equal(subclassResult.effect.tempHp,6,'pain-relief bomb scales with class level');
const first=hooks.useFeature(hero,'alchemist-discovery',{discovery:'Базовая алхимия'});
assert.equal(first.ok,true,'level 6 grants first discovery');
const second=hooks.useFeature(hero,'alchemist-discovery',{discovery:'Алхимия восстановления'});
assert.equal(second.ok,false,'level 6 cannot take second discovery before level 9');
const bomb=hooks.attackModifiers(hero,{isBomb:true});
assert.ok(Array.isArray(bomb.extraDice),'bomb hook returns dice modifiers');

// Potion effects must be applied to the character and unsupported recipes must never be consumed.
hero.classFeaturesState.alchemistPotions=[
  {name:'Зелье сопротивления',cost:1,type:'potion'},
  {name:'Зелье невидимости',cost:2,type:'potion'},
  {name:'Зелье лечения',cost:1,type:'potion'}
];
hero.resistances=[];
let noChoice=hooks.useFeature(hero,'alchemist-potionUse',{index:0});
assert.equal(noChoice.ok,false,'resistance potion requires a damage type');
assert.equal(hero.classFeaturesState.alchemistPotions.length,3,'missing choice does not consume potion');
let resistance=hooks.useFeature(hero,'alchemist-potionUse',{index:0,damageType:'огонь'});
assert.equal(resistance.ok,true,'resistance potion applies');
assert.ok(hero.resistances.includes('огонь'),'resistance is recorded on character');
hooks.startTurn(hero);
let invis=hooks.useFeature(hero,'alchemist-potionUse',{index:0});
assert.equal(invis.ok,true,'invisibility potion applies');
assert.equal(hero.activeConditions.Невидим,true,'invisibility condition is set');
hooks.startTurn(hero);
let heal=hooks.useFeature(hero,'alchemist-potionUse',{index:0,healAmount:7});
assert.equal(heal.ok,true,'healing potion applies');
assert.equal(hero.hp,7,'healing potion updates character HP when no max is specified');
assert.equal(hero.classFeaturesState.alchemistPotions.length,0,'successfully used potions are consumed');


// Progression regression: level 4 gains the fourth formula; poison specialist gets its free discovery.
const levelFour={classes:[{name:'Алхимик',level:4,subclass:'apothecary'}],abilityScores:{intelligence:16,dexterity:14},proficiencyBonus:2,resources:{},classFeaturesState:{}};
hooks.sync(levelFour);
assert.equal(levelFour.classFeaturesState.alchemistFormulaMax,4,'level 4 formula count matches progression table');
const venom={classes:[{name:'Алхимик',level:3,subclass:'venomsmith'}],abilityScores:{intelligence:16,dexterity:14},proficiencyBonus:2,resources:{},classFeaturesState:{}};
const venomFeature=hooks.useFeature(venom,'alchemist-venomsmith-3-Отравитель',{}, {subclassId:'venomsmith'});
assert.equal(venomFeature.ok,true,'Venomsmith poisoner feature resolves');
assert.ok(venom.classFeaturesState.alchemistDiscovered.includes('Алхимия яда'),'Venomsmith gains poison alchemy discovery');


// Active combat potion effects feed the shared attack-modifier bridge.
hero.classFeaturesState.alchemistPotions=[
  {name:'Зелье увеличения',cost:2,type:'potion'},
  {name:'Зелье героизма',cost:3,type:'potion'},
  {name:'Зелье скорости',cost:9,type:'potion'}
];
assert.equal(hooks.useFeature(hero,'alchemist-potionUse',{index:0}).ok,true,'enlarge potion applies');
assert.ok(hooks.attackModifiers(hero,{weaponAttack:true}).extraDice.includes('1d4'),'enlarge potion adds weapon damage');
hooks.startTurn(hero);
assert.equal(hooks.useFeature(hero,'alchemist-potionUse',{index:0}).ok,true,'heroism potion applies');
assert.equal(hero.tempHp,10,'heroism potion grants temporary HP');
hooks.startTurn(hero);
assert.equal(hooks.useFeature(hero,'alchemist-potionUse',{index:0}).ok,true,'speed potion applies');
assert.equal(hooks.attackModifiers(hero,{weaponAttack:true}).hasteActive,true,'speed potion exposes active combat state');

console.log('Alchemist runtime regression tests PASS');
