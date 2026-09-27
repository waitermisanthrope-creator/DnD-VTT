/* test_v735_logic_rules.js
 * Verifies the V70.25.35 rules fixes: condition semantics and death-save handling.
 */
const fs=require('fs'), vm=require('vm'), assert=require('assert');
const ctx={console,window:null,document:{addEventListener(){},getElementById(){return null}},Math,Date,setTimeout:()=>{},alert(){},localStorage:{getItem(){return null},setItem(){}}};ctx.window=ctx;
vm.createContext(ctx);
vm.runInContext(fs.readFileSync('rulesEngine.js','utf8'),ctx);
assert.strictEqual(ctx.DNDRules.conditionModifiers({activeConditions:{'Недееспособен':true}}).advantage,false);
let m=ctx.DNDRules.attackAgainstMode({conditions:{'Невидим':true}},'normal',30);assert.strictEqual(m,'disadvantage');
assert.strictEqual(ctx.DNDRules.conditionModifiers({activeConditions:{'Бессознателен':true}}).autoFailStrDex,true);
vm.runInContext(fs.readFileSync('combat_engine.js','utf8'),ctx);
let h={type:'hero',hp:0,maxHp:20,tempHp:0,deathSaves:{successes:0,failures:0},stats:{con:10},concentration:{active:false}};
let r=ctx.DNDCombat.applyDamage(h,5,'рубящий');assert.strictEqual(r.deathSaveFailures,1);assert.strictEqual(h.deathSaves.failures,1);
h={type:'hero',hp:0,maxHp:20,tempHp:0,deathSaves:{successes:0,failures:0},stats:{con:10},concentration:{active:false}};
r=ctx.DNDCombat.applyDamage(h,5,'рубящий',{critical:true});assert.strictEqual(h.deathSaves.failures,2);
h={type:'hero',hp:0,maxHp:20,tempHp:0,deathSaves:{successes:3,failures:0},stats:{con:10},concentration:{active:false}};
assert.strictEqual(ctx.DNDCombat.applyDamage(h,1,'рубящий').deathSaveFailures,1);
assert(fs.readFileSync('combat_engine.js','utf8').includes('Персонаж уже стабилен'));
assert(fs.readFileSync('network_gameplay.js','utf8').includes('Персонаж уже стабилен'));
console.log('V70.25.35 logic rules regression: PASS');
