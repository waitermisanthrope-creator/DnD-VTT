/**
 * test_v56_6.js
 * WHAT THIS FILE IS: V56.6 smoke test for the Bigby Glory of the Giants bestiary layer.
 * HOW IT WORKS: loads the shared catalogue layers and verifies source metadata, registration and harvest bridges.
 * IMPORTANT APIS: DND_BESTIARY_V56_6.summary(), getCreature(), listBySource().
 */
const fs=require('fs'),vm=require('vm');
const ctx={console,window:{}};ctx.window=ctx;ctx.DNDMonsters={catalog:{}};ctx.DNDMonsterLoot={catalog:{}};ctx.DND_CRAFTING_V31={MATERIALS:[]};ctx.DNDExpandedBestiary={catalog:{},families:{},familyByCreature:{}};vm.createContext(ctx);
['expanded_bestiary_v39.js','bestiary_2_0_v56.js','bestiary_catalog_v56_1.js','bestiary_catalog_v56_2.js','bestiary_catalog_v56_3.js','bestiary_catalog_v56_4.js','bestiary_catalog_v56_5.js','bestiary_catalog_v56_6.js'].forEach(f=>vm.runInContext(fs.readFileSync(f,'utf8'),ctx,{filename:f}));
const api=ctx.DND_BESTIARY_V56_6,summary=api.summary();
if(summary.added<1)throw new Error('V56.6 added no unique creatures');
Object.keys(api.catalog).forEach(name=>{const c=api.getCreature(name);if(!c||c.sourcePack!=='bigby_glory_giants'||!c.loot?.harvest?.[0])throw new Error('Incomplete creature: '+name);if(!ctx.DNDMonsters.catalog[name])throw new Error('Monster not registered: '+name);});
console.log('V56_6_BESTIARY_TEST_OK',JSON.stringify({added:summary.added,total:summary.total,source:api.sourcePack,materials:ctx.DND_CRAFTING_V31.MATERIALS.length}));
