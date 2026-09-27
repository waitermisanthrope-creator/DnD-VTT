/**
 * test_v56_12.js
 * WHAT THIS FILE IS: V56.12 Dragonlance smoke test.
 * HOW IT WORKS: loads the staged bestiary layers and validates unique Dragonlance registration,
 * both official source packs, warfront metadata and harvest bridges.
 * IMPORTANT APIS: DND_BESTIARY_V56_12.summary(), getCreature().
 */
const fs=require('fs'),vm=require('vm');const ctx={console,window:{}};ctx.window=ctx;ctx.DNDMonsters={catalog:{}};ctx.DNDMonsterLoot={catalog:{}};ctx.DND_CRAFTING_V31={MATERIALS:[]};ctx.DNDExpandedBestiary={catalog:{},families:{},familyByCreature:{}};vm.createContext(ctx);
['expanded_bestiary_v39.js','bestiary_2_0_v56.js',...Array.from({length:12},(_,i)=>`bestiary_catalog_v56_${i+1}.js`)].forEach(f=>vm.runInContext(fs.readFileSync(f,'utf8'),ctx,{filename:f}));
const api=ctx.DND_BESTIARY_V56_12,s=api.summary();if(s.added<30)throw new Error('Dragonlance build unexpectedly small: '+s.added);if(!s.sources.dragonlance_shadow_dragon_queen||!s.sources.dragonlance_mon_compendium_2)throw new Error('Both Dragonlance source packs required');let war=0,harvest=0;Object.keys(api.catalog).forEach(n=>{const c=api.getCreature(n);if(!c||!c.dragonlance?.warfrontEligible)throw new Error('Missing Dragonlance metadata: '+n);if(c.dragonlance.warfrontEligible)war++;if(c.loot?.harvest?.[0]?.craftMaterialId)harvest++;if(!ctx.DNDMonsters.catalog[n])throw new Error('Monster not registered: '+n);});if(war<s.added||harvest<s.added)throw new Error('Incomplete Dragonlance registration');console.log('V56_12_BESTIARY_TEST_OK',JSON.stringify({added:s.added,total:s.total,sources:s.sources,materials:ctx.DND_CRAFTING_V31.MATERIALS.length,warfront:s.warfrontEligible}));
