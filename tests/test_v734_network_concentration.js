/**
 * test_v734_network_concentration.js
 * Verifies the network damage bridge does not roll concentration twice
 * when the core combat engine already resolved the concentration check.
 */
const assert=require('assert'),vm=require('vm'),fs=require('fs');
const ctx={console,Math,Date,JSON,setTimeout,clearTimeout,alert:()=>{},prompt:()=>null};ctx.window=ctx;ctx.globalThis=ctx;ctx.addEventListener=()=>{};
ctx.document={readyState:'complete',addEventListener(){},getElementById(){return null},createElement(){return {style:{},appendChild(){},addEventListener(){}}},body:{appendChild(){}}};ctx.localStorage={getItem(){return null},setItem(){}};
let src=fs.readFileSync('network_gameplay.js','utf8').replace('  function battlefield(){', '  global.__testApplyDamageWithConcentration=applyDamageWithConcentration;\n  function battlefield(){');
vm.runInNewContext(src,ctx,{filename:'network_gameplay.js'});
let calls=0;
ctx.DNDCombat={applyDamage(){calls++;return {amount:8,hpDamage:8,concentration:{dc:10,roll:5,total:5,success:false}};},savingThrow(){throw new Error('duplicate concentration roll');}};
ctx.dndNetwork={state:{role:'host'},getPeer(){return {profile:{}}}};
const fn=ctx.__testApplyDamageWithConcentration;
assert.strictEqual(typeof fn,'function');
const out=fn('peer',{id:'target',ownerPeerId:'owner',concentration:{active:true,spellName:'X'}},8,'огонь');
assert.strictEqual(calls,1);assert(out.concentration&&out.concentration.dc===10);
console.log('V70.25.34 network concentration regression: PASS');
