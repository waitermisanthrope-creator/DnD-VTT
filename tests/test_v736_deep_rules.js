/**
 * test_v736_deep_rules.js
 * V70.25.36 regression coverage for healing/death-save reset, concentration
 * interruption by incapacitating conditions, Pact Magic rest/synchronization,
 * and Channel Divinity pending-selection transaction safety.
 */
const assert=require('assert'),vm=require('vm'),fs=require('fs');
function makeCtx(){
  const ctx={console,Math,Date,JSON,setTimeout,clearTimeout,alert:()=>{},prompt:()=>null};
  ctx.window=ctx;ctx.globalThis=ctx;ctx.addEventListener=()=>{};
  ctx.document={readyState:'complete',addEventListener(){},getElementById(){return null},querySelectorAll(){return[]},createElement(){return {style:{},appendChild(){},addEventListener(){},remove(){}}},body:{appendChild(){}}};
  ctx.localStorage={getItem(){return null},setItem(){}};
  return ctx;
}

// Healing from 0 HP clears death saves and ends Unconscious.
{
  const c=makeCtx();
  vm.runInNewContext(fs.readFileSync('rulesEngine.js','utf8'),c,{filename:'rulesEngine.js'});
  vm.runInNewContext(fs.readFileSync('combat_engine.js','utf8'),c,{filename:'combat_engine.js'});
  const h={hpCurrent:0,hpMax:20,hpTemp:0,deathSaves:{successes:2,failures:1},conditions:{'Бессознателен':true},defeated:true};
  const r=c.DNDCombat.heal(h,5);
  assert.strictEqual(r.revivedFromZero,true);assert.strictEqual(h.hpCurrent,5);assert.strictEqual(h.deathSaves.successes,0);assert.strictEqual(h.deathSaves.failures,0);assert.strictEqual(h.conditions['Бессознателен'],false);assert.strictEqual(h.defeated,false);
}

// Incapacitating conditions immediately end concentration.
{
  const c=makeCtx();
  vm.runInNewContext(fs.readFileSync('rulesEngine.js','utf8'),c,{filename:'rulesEngine.js'});
  vm.runInNewContext(fs.readFileSync('combat_engine.js','utf8'),c,{filename:'combat_engine.js'});
  for(const condition of ['Недееспособен','Бессознателен','Парализован','Оглушён','Окаменел']){
    const h={concentration:{active:true,spellId:'x',spellName:'Hold'},conditions:{}};
    c.DNDCombat.toggleCondition(h,condition,true);
    assert.strictEqual(h.concentration.active,false,condition+' must break concentration');
  }
}

// Pact Magic refreshes on short rest and long rest, with both schemas synced.
{
  const c=makeCtx();
  c.currentChar={pactMagicData:{max:2,used:2,slotLevel:2},pactMagic:{max:2,used:2,slotLevel:2},lastRest:null};
  vm.runInNewContext(fs.readFileSync('dnd_tools.js','utf8'),c,{filename:'dnd_tools.js'});
  c.shortRestCharacter();
  assert.strictEqual(c.currentChar.pactMagicData.used,0);assert.strictEqual(c.currentChar.pactMagic.used,0);
  c.currentChar.pactMagicData.used=2;c.currentChar.pactMagic.used=2;c.longRestCharacter();
  assert.strictEqual(c.currentChar.pactMagicData.used,0);assert.strictEqual(c.currentChar.pactMagic.used,0);
}

// Slot-table recalculation keeps legacy pactMagic and current pactMagicData aligned.
{
  const c=makeCtx();
  c.currentChar={classes:[{name:'Колдун',level:5}],stats:{cha:16},pactMagic:{used:1}};
  c.updateCharacterSpellSlots=function(h){return h;};
  c.addEventListener=(name,fn)=>{if(name==='DOMContentLoaded')c.__dom=fn;};
  vm.runInNewContext(fs.readFileSync('rulesEngine.js','utf8'),c,{filename:'rulesEngine.js'});
  c.__dom();
  c.currentChar.spellSlotsData={};
  c.updateCharacterSpellSlots(c.currentChar);
  assert.strictEqual(c.currentChar.pactMagic.used,1);assert.strictEqual(c.currentChar.pactMagicData.used,1);assert.strictEqual(c.currentChar.pactMagicData.slotLevel,3);assert.strictEqual(c.currentChar.pactMagicData.max,2);
}

// Channel Divinity must not spend a charge merely to open a target-selection window.
{
  const c=makeCtx();
  vm.runInNewContext(fs.readFileSync('content_framework.js','utf8'),c,{filename:'content_framework.js'});
  c.DNDCombat={savingThrow(){return {success:true}}};
  vm.runInNewContext(fs.readFileSync('class_features_engine.js','utf8'),c,{filename:'class_features_engine.js'});
  const h={classes:[{name:'Жрец',level:2}],resources:{channelDivinity:{max:1,current:1,recharge:'short'}},classFeaturesState:{}};
  const r=c.DNDClassFeatures.useFeature(h,'turnUndead',{});
  assert.strictEqual(r.pendingSelection,true);assert.strictEqual(h.resources.channelDivinity.current,1);
}
console.log('V70.25.36 deep rules regression: PASS');
