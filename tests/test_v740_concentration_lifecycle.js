const assert=require('assert');
const fs=require('fs');
const vm=require('vm');
const ctx={console,Math,JSON,setTimeout,clearTimeout};
ctx.window=ctx;ctx.globalThis=ctx;
ctx.DNDRules={
  rollD20(){return {result:20,critical:false,fumble:false};},
  getSaveBonus(){return 0;},
  normalizeConditionName(v){return String(v||'').trim();}
};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync('combat_engine.js','utf8'),ctx,{filename:'combat_engine.js'});
const C=ctx.DNDCombat;

let h={type:'hero',hp:20,maxHp:20,tempHp:0,stats:{con:10},concentration:{active:true,spellId:'bless',spellName:'Bless'},conditions:{}};
let c=C.beginConcentration(h,{id:'hold',name:'Hold Person',concentration:true});
assert.strictEqual(c.active,true);
assert.strictEqual(c.spellId,'hold');
assert.strictEqual(c.spellName,'Hold Person');

C.toggleCondition(h,'Оглушён',true);
assert.strictEqual(h.concentration.active,false,'incapacitating condition must end concentration');

h={type:'hero',hp:20,maxHp:20,tempHp:0,stats:{con:10},concentration:{active:true,spellId:'x',spellName:'Bless'},conditions:{}};
let r=C.applyDamage(h,20,'огонь');
assert.strictEqual(h.hp,0);
assert.strictEqual(h.concentration.active,false,'dropping to 0 HP must end concentration even on successful CON roll');
assert.strictEqual(r.concentration.endedByZeroHp,true);

h={type:'hero',hp:20,maxHp:20,tempHp:10,stats:{con:10},concentration:{active:true,spellId:'x',spellName:'Bless'},conditions:{}};
r=C.applyDamage(h,5,'огонь');
assert.strictEqual(h.hp,20);
assert.strictEqual(h.tempHp,5);
assert.strictEqual(h.concentration.active,true,'temporary HP damage still allows concentration');
assert.strictEqual(r.concentration.success,true);

h={type:'hero',hp:20,maxHp:20,tempHp:0,stats:{con:10},concentration:{active:true,spellId:'x',spellName:'Bless'},conditions:{}};
C.breakConcentration(h);
assert.strictEqual(h.concentration.active,false);
assert.strictEqual(C.beginConcentration(h,{name:'Haste',concentration:true}).spellName,'Haste');
assert.strictEqual(h.concentration.active,true);
console.log('V70.25.40 concentration lifecycle: PASS');
