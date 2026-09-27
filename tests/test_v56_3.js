/**
 * test_v56_3.js
 * WHAT THIS FILE IS: V56.3 smoke test for the legacy-official bestiary catalogue.
 * HOW IT WORKS: loads the shared bestiary and validates registration, source metadata, harvest and material bridges.
 * IMPORTANT APIS: DND_BESTIARY_V56_3.summary(), getCreature(), listBySource().
 */
const fs=require('fs'),vm=require('vm');
const ctx={console,window:{}};ctx.window=ctx;ctx.DNDMonsters={catalog:{}};ctx.DNDMonsterLoot={catalog:{}};ctx.DND_CRAFTING_V31={MATERIALS:[]};ctx.DNDExpandedBestiary={catalog:{},families:{},familyByCreature:{}};vm.createContext(ctx);
['expanded_bestiary_v39.js','bestiary_2_0_v56.js','bestiary_catalog_v56_1.js','bestiary_catalog_v56_2.js','bestiary_catalog_v56_3.js'].forEach(f=>vm.runInContext(fs.readFileSync(f,'utf8'),ctx,{filename:f}));
const api=ctx.DND_BESTIARY_V56_3,summary=api.summary();
if(summary.added<150)throw new Error('V56.3 added fewer than 150 unique creatures');
Object.keys(api.catalog).forEach(name=>{const c=api.getCreature(name);if(!c||c.sourcePack!=='legacy_official'||!c.loot?.harvest?.[0])throw new Error('Incomplete creature: '+name);if(!ctx.DNDMonsters.catalog[name])throw new Error('Monster not registered: '+name);});
console.log('V56_3_BESTIARY_TEST_OK',JSON.stringify({added:summary.added,total:summary.total,source:api.sourcePack,materials:ctx.DND_CRAFTING_V31.MATERIALS.length}));
