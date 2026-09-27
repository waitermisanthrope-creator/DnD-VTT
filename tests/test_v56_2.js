/**
 * test_v56_2.js
 * V56.2 regression test: validates the large MotM catalogue registration, source tagging,
 * combat profile and harvest material linkage. Loads its dependencies into an isolated
 * VM context, matching the pattern used by the neighboring test_v56_1.js / test_v56_3.js.
 */
const fs=require('fs'),vm=require('vm');
const ctx={console,window:{}};ctx.window=ctx;ctx.DNDMonsters={catalog:{}};ctx.DNDMonsterLoot={catalog:{}};ctx.DND_CRAFTING_V31={MATERIALS:[]};ctx.DNDExpandedBestiary={catalog:{},families:{},familyByCreature:{}};vm.createContext(ctx);
['expanded_bestiary_v39.js','bestiary_2_0_v56.js','bestiary_catalog_v56_1.js','bestiary_catalog_v56_2.js'].forEach(f=>vm.runInContext(fs.readFileSync(f,'utf8'),ctx,{filename:f}));
var b=ctx.DND_BESTIARY_V56_2, base=ctx.DNDExpandedBestiary, craft=ctx.DND_CRAFTING_V31;
if(!b||!base)throw new Error('V56.2 API missing');
var s=b.summary(); if(s.added<180)throw new Error('Expected at least 180 new profiles, got '+s.added);
if(s.total<300)throw new Error('Expected 300+ total bestiary profiles, got '+s.total);
var sample=b.getCreature('Abishai'); if(!sample||sample.sourcePack!=='motm'||!sample.actions.length||!sample.loot.harvest.length)throw new Error('Sample profile incomplete');
if(!sample.loot.harvest[0].craftMaterialId)throw new Error('Harvest material missing');
if(craft&&Array.isArray(craft.MATERIALS)&&!craft.MATERIALS.some(function(m){return m.id===sample.loot.harvest[0].craftMaterialId;}))throw new Error('Harvest material not registered');
console.log('V56_2_BESTIARY_TEST_OK',JSON.stringify({added:s.added,total:s.total,families:s.families,sample:sample.name,harvest:sample.loot.harvest[0].craftMaterialId}));
