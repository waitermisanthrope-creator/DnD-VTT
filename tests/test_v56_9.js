/**
 * test_v56_9.js
 * WHAT THIS FILE IS: V56.9 smoke test for the Mythic Odysseys of Theros catalogue layer.
 * HOW IT WORKS: loads the shared bestiary layers through V56.9 and verifies Theros source metadata,
 * unique registration, harvest bridges and mythic-phase hooks without requiring a browser DOM.
 * IMPORTANT APIS: DND_BESTIARY_V56_9.summary(), getCreature(), listBySource().
 */
const fs=require('fs'),vm=require('vm');
const ctx={console,window:{}};ctx.window=ctx;ctx.DNDMonsters={catalog:{}};ctx.DNDMonsterLoot={catalog:{}};ctx.DND_CRAFTING_V31={MATERIALS:[]};ctx.DNDExpandedBestiary={catalog:{},families:{},familyByCreature:{}};vm.createContext(ctx);
['expanded_bestiary_v39.js','bestiary_2_0_v56.js','bestiary_catalog_v56_1.js','bestiary_catalog_v56_2.js','bestiary_catalog_v56_3.js','bestiary_catalog_v56_4.js','bestiary_catalog_v56_5.js','bestiary_catalog_v56_6.js','bestiary_catalog_v56_7.js','bestiary_catalog_v56_8.js','bestiary_catalog_v56_9.js'].forEach(f=>vm.runInContext(fs.readFileSync(f,'utf8'),ctx,{filename:f}));
const api=ctx.DND_BESTIARY_V56_9,summary=api.summary(); if(summary.added<1)throw new Error('V56.9 added no unique creatures');
let mythic=0;
Object.keys(api.catalog).forEach(name=>{const c=api.getCreature(name);if(!c||c.sourcePack!=='theros_moot'||!c.loot?.harvest?.[0])throw new Error('Incomplete creature: '+name);if(!ctx.DNDMonsters.catalog[name])throw new Error('Monster not registered: '+name);if(c.actions.some(a=>a.kind==='mythic'))mythic++;});
if(mythic<1)throw new Error('No mythic-phase hooks registered');
console.log('V56_9_BESTIARY_TEST_OK',JSON.stringify({added:summary.added,total:summary.total,source:api.sourcePack,materials:ctx.DND_CRAFTING_V31.MATERIALS.length,mythic}));
