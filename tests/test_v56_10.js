/**
 * test_v56_10.js
 * WHAT THIS FILE IS: V56.10 smoke test for the Ravenloft / Van Richten's Guide to Ravenloft catalogue layer.
 * HOW IT WORKS: loads all prior V56.x layers and verifies unique Ravenloft registration,
 * source metadata, harvest bridges and reusable horror hooks without requiring a browser DOM.
 * IMPORTANT APIS: DND_BESTIARY_V56_10.summary(), getCreature(), listBySource().
 */
const fs=require('fs'),vm=require('vm');
const ctx={console,window:{}};ctx.window=ctx;ctx.DNDMonsters={catalog:{}};ctx.DNDMonsterLoot={catalog:{}};ctx.DND_CRAFTING_V31={MATERIALS:[]};ctx.DNDExpandedBestiary={catalog:{},families:{},familyByCreature:{}};vm.createContext(ctx);
['expanded_bestiary_v39.js','bestiary_2_0_v56.js','bestiary_catalog_v56_1.js','bestiary_catalog_v56_2.js','bestiary_catalog_v56_3.js','bestiary_catalog_v56_4.js','bestiary_catalog_v56_5.js','bestiary_catalog_v56_6.js','bestiary_catalog_v56_7.js','bestiary_catalog_v56_8.js','bestiary_catalog_v56_9.js','bestiary_catalog_v56_10.js'].forEach(f=>vm.runInContext(fs.readFileSync(f,'utf8'),ctx,{filename:f}));
const api=ctx.DND_BESTIARY_V56_10,summary=api.summary(); if(summary.added<1)throw new Error('V56.10 added no unique creatures');
if(summary.source!=='ravenloft_vrgtR')throw new Error('Wrong source pack');
let horror=0,phases=0;
Object.keys(api.catalog).forEach(name=>{const c=api.getCreature(name);if(!c||c.sourcePack!=='ravenloft_vrgtR'||!c.loot?.harvest?.[0])throw new Error('Incomplete creature: '+name);if(!ctx.DNDMonsters.catalog[name])throw new Error('Monster not registered: '+name);if(c.horror?.horrorEligible)horror++;if(c.actions.some(a=>a.kind==='mythic'))phases++;if(!c.loot.harvest[0].craftMaterialId.startsWith('v56_10_'))throw new Error('Bad material id: '+name);});
if(horror<summary.added)throw new Error('Not all Ravenloft creatures received horror metadata');
if(phases<2)throw new Error('Expected both Star Spawn emissary phase hooks');
console.log('V56_10_BESTIARY_TEST_OK',JSON.stringify({added:summary.added,total:summary.total,source:api.sourcePack,materials:ctx.DND_CRAFTING_V31.MATERIALS.length,horror,emissaryPhaseHooks:phases}));
