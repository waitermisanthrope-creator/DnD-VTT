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
console.log('Alchemist runtime regression tests PASS');
