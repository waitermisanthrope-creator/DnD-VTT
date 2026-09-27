/**
 * test_v56_11.js
 * WHAT THIS FILE IS: V56.11 smoke test for the Spelljammer source-pack layer.
 * HOW IT WORKS: loads V56.0-V56.11 and verifies unique registration, both
 * official source packs, wildspace metadata, harvest bridges and core hooks.
 * IMPORTANT APIS: DND_BESTIARY_V56_11.summary(), listBySource(), getCreature().
 */
const fs=require('fs'),vm=require('vm');
const ctx={console,window:{}};ctx.window=ctx;ctx.DNDMonsters={catalog:{}};ctx.DNDMonsterLoot={catalog:{}};ctx.DND_CRAFTING_V31={MATERIALS:[]};ctx.DNDExpandedBestiary={catalog:{},families:{},familyByCreature:{}};vm.createContext(ctx);
['expanded_bestiary_v39.js','bestiary_2_0_v56.js',...Array.from({length:11},(_,i)=>`bestiary_catalog_v56_${i+1}.js`)].forEach(f=>vm.runInContext(fs.readFileSync(f,'utf8'),ctx,{filename:f}));
const api=ctx.DND_BESTIARY_V56_11,s=api.summary();
if(s.added<70)throw new Error('Spelljammer build is unexpectedly small: '+s.added);
if(!s.sources.spelljammer_boo_astral_menagerie||!s.sources.spelljammer_mon_compendium_1)throw new Error('Both Spelljammer source packs required');
let hooks=0,harvest=0,registered=0;Object.keys(api.catalog).forEach(name=>{const c=api.getCreature(name);if(!c||!c.wildspace?.wildspaceEligible)throw new Error('Missing wildspace metadata: '+name);if(c.actions.some(a=>a.name==='Wildspace Maneuver'))hooks++;if(c.loot?.harvest?.[0]?.craftMaterialId)harvest++;if(ctx.DNDMonsters.catalog[name])registered++;else throw new Error('Monster not registered: '+name);});
if(hooks<s.added||harvest<s.added||registered<s.added)throw new Error('Incomplete Spelljammer registration');
console.log('V56_11_BESTIARY_TEST_OK',JSON.stringify({added:s.added,total:s.total,sources:s.sources,materials:ctx.DND_CRAFTING_V31.MATERIALS.length,wildspace:s.wildspaceEligible}));
