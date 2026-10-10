/**
 * test_v733_logic_audit.js
 * Deep rules regression tests for V70.25.33: canonical HP fields,
 * Blood Hunter HP transactions, concentration with temporary HP,
 * and class-feature healing on the real character schema.
 */
const assert=require('assert'),vm=require('vm'),fs=require('fs');
const ctx={console,Math,Date,JSON,setTimeout,clearTimeout,alert:()=>{},prompt:()=>null};
ctx.window=ctx;ctx.globalThis=ctx;ctx.addEventListener=()=>{};ctx.document={readyState:'complete',addEventListener(){},getElementById(){return null},createElement(){return {style:{},appendChild(){},addEventListener(){}}},body:{appendChild(){}}};ctx.localStorage={getItem(){return null},setItem(){}};
for(const f of ['rulesEngine.js','content_framework.js','class_features_engine.js','combat_abilities.js','combat_engine.js','blood_hunter_engine.js','expansion_classes_pack.js'])vm.runInNewContext(fs.readFileSync(f,'utf8'),ctx,{filename:f});
function fixedRoll(){return {result:1,critical:false,fumble:false};}
let t={hp:20,maxHp:20,tempHp:10,concentration:{active:true,spellName:'Hold'},stats:{con:10},resistances:[],vulnerabilities:[],immunities:[]};
const oldRoll=ctx.DNDRules.rollD20;ctx.DNDRules.rollD20=fixedRoll;let r=ctx.DNDCombat.applyDamage(t,5,'огонь');ctx.DNDRules.rollD20=oldRoll;
assert(r.concentration && r.concentration.dc===10);assert.strictEqual(t.concentration.active,false);assert.strictEqual(t.hp,20);assert.strictEqual(t.tempHp,5);
let h={id:'blood-hp-transaction',level:10,hpCurrent:30,hpMax:40,hpTemp:0,weapons:[{id:'sword',name:'Меч',damageDice:'1d6'}],classes:[{name:'Кровавый охотник',level:10,subclass:'Орден ликантропов'}],resources:{},classFeaturesState:{}};
ctx.DNDBloodHunter.sync(h);assert.strictEqual(ctx.DNDBloodHunter.useFeature(h,'chooseCrimsonRites',{rites:['flame']}).ok,true);let before=h.hpCurrent;let rite=ctx.DNDBloodHunter.useFeature(h,'crimsonRite',{riteType:'fire',weaponId:'sword'});assert.strictEqual(rite.ok,true);assert(h.hpCurrent<before);assert.strictEqual(h.hp.current,h.hpCurrent);
let c={hpCurrent:5,hpMax:10,hpTemp:0};let healed=ctx.DNDCombat.heal(c,3);assert.strictEqual(healed.amount,3);assert.strictEqual(c.hpCurrent,8);assert.strictEqual(c.hp.current,8);
console.log('V70.25.33 deep logic audit: PASS');
