const fs=require('fs'),vm=require('vm'),assert=require('assert');
const ctx={console,Date,JSON,Set,Number,String,Array,Object,RegExp,parseInt,parseFloat,
  document:{getElementById:()=>null,querySelectorAll:()=>[]},addEventListener:()=>{},setTimeout:()=>{},clearTimeout:()=>{},window:null};
ctx.window=ctx;ctx.globalThis=ctx;
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(__dirname+'/../app/expansion_classes_pack.js','utf8'),ctx);
vm.runInContext(fs.readFileSync(__dirname+'/../app/combat_engine.js','utf8'),ctx);
assert.ok(ctx.DNDCombat,'Combat engine registers');
const target={id:'pugilist-defender',hp:20,maxHp:20,tempHp:0,resistances:[],immunities:[],vulnerabilities:[],
  classFeaturesState:{pugilistDigDeepActive:{roundsRemaining:10,damageTypes:['bludgeoning','piercing','slashing']}}};
const resolved=ctx.DNDCombat.effectiveDamage(target,11,'рубящий',{});
assert.equal(resolved.amount,5,'Dig Deep halves slashing damage');
assert.ok(resolved.note.includes('Соберись с силами'),'combat log identifies Dig Deep resistance');
const applied=ctx.DNDCombat.applyDamage(target,10,'дробящий',{});
assert.equal(applied.amount,5,'actual damage application uses Dig Deep resistance');
assert.equal(target.hp,15,'target HP changes by the reduced damage');
assert.equal(ctx.DNDCombat.effectiveDamage(target,11,'огонь',{}).amount,11,'Dig Deep does not resist non-physical damage');
const expired={hp:20,maxHp:20,resistances:[],immunities:[],vulnerabilities:[],classFeaturesState:{pugilistDigDeepActive:{roundsRemaining:0}}};
assert.equal(ctx.DNDCombat.effectiveDamage(expired,11,'рубящий',{}).amount,11,'expired Dig Deep state does not reduce damage');
console.log('Pugilist combat integration tests: PASS (physical resistance, actual HP damage, non-physical damage, expiry)');
