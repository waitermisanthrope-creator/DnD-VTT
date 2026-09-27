/**
 * test_v56_5.js
 * WHAT THIS FILE IS: V56.5 smoke test for the Fizban bestiary catalogue.
 * HOW IT WORKS: loads the shared catalogue layers and validates registration,
 * source metadata, dragon families, harvest and crafting material bridges.
 * IMPORTANT APIS: DND_BESTIARY_V56_5.summary(), getCreature(), listBySource().
 */
const fs=require('fs'),vm=require('vm');
const ctx={console,window:{}};ctx.window=ctx;ctx.DNDMonsters={catalog:{}};ctx.DNDMonsterLoot={catalog:{}};ctx.DND_CRAFTING_V31={MATERIALS:[]};ctx.DNDExpandedBestiary={catalog:{},families:{},familyByCreature:{}};vm.createContext(ctx);
['expanded_bestiary_v39.js','bestiary_2_0_v56.js','bestiary_catalog_v56_1.js','bestiary_catalog_v56_2.js','bestiary_catalog_v56_3.js','bestiary_catalog_v56_4.js','bestiary_catalog_v56_5.js'].forEach(f=>vm.runInContext(fs.readFileSync(f,'utf8'),ctx,{filename:f}));
const api=ctx.DND_BESTIARY_V56_5,summary=api.summary();
if(summary.added<10)throw new Error('V56.5 added fewer than 10 unique creatures');
if(!api.listByFamily('dragon').length)throw new Error('No Fizban dragon family entries');
Object.keys(api.catalog).forEach(name=>{const c=api.getCreature(name);if(!c||c.sourcePack!=='fizban_treasury'||!c.loot?.harvest?.[0])throw new Error('Incomplete creature: '+name);if(!ctx.DNDMonsters.catalog[name])throw new Error('Monster not registered: '+name);});
const mats=ctx.DND_CRAFTING_V31.MATERIALS.filter(m=>String(m.source||'').includes('v56_5')).length;
if(mats!==summary.added)throw new Error('Material bridge mismatch: '+mats+' / '+summary.added);
console.log('V56_5_BESTIARY_TEST_OK',JSON.stringify({added:summary.added,total:summary.total,source:api.sourcePack,dragonFamily:api.listByFamily('dragon').length,materials:mats}));
