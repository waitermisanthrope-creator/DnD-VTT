/**
 * test_v56_13.js
 * WHAT THIS FILE IS: V56.13 Planescape regression/smoke test.
 * HOW IT WORKS: loads the existing expanded bestiary plus source-pack layers in an isolated VM,
 * then validates duplicate protection, Planescape metadata, harvest registration and planar APIs.
 * IMPORTANT APIS: DND_BESTIARY_V56_13, DND_PLANESCAPE_V56_13.
 */
const fs=require('fs'),vm=require('vm'),path=require('path');
const root=__dirname;
const ctx={console,window:null,Date,Math,JSON,setTimeout:()=>{}};ctx.window=ctx;
ctx.DNDMonsters={catalog:{}};ctx.DNDMonsterLoot={catalog:{}};ctx.DND_CRAFTING_V31={MATERIALS:[]};
ctx.document={getElementById:()=>null};ctx.addEventListener=()=>{};
const files=['expanded_bestiary_v39.js','bestiary_2_0_v56.js','bestiary_catalog_v56_1.js','bestiary_catalog_v56_2.js','bestiary_catalog_v56_3.js','bestiary_catalog_v56_4.js','bestiary_catalog_v56_5.js','bestiary_catalog_v56_6.js','bestiary_catalog_v56_7.js','bestiary_catalog_v56_8.js','bestiary_catalog_v56_9.js','bestiary_catalog_v56_10.js','bestiary_catalog_v56_11.js','bestiary_catalog_v56_12.js','bestiary_catalog_v56_13.js'];
for(const f of files){const src=fs.readFileSync(path.join(root,f),'utf8');vm.runInNewContext(src,ctx,{filename:f});}
const api=ctx.DND_BESTIARY_V56_13, ps=ctx.DND_PLANESCAPE_V56_13;
if(!api||!ps)throw new Error('V56.13 API missing');
const s=api.summary();
if(s.added<50)throw new Error('Expected 50+ unique Planescape entries, got '+s.added);
if(s.added!==Object.keys(api.catalog).length)throw new Error('Summary/catalog mismatch');
if(s.total!==Object.keys(ctx.DNDExpandedBestiary.catalog).length)throw new Error('Total mismatch');
for(const n of Object.keys(api.catalog)){
 const c=api.catalog[n];
 if(c.sourcePack!=='planescape_mortes_planar_parade')throw new Error('Bad source '+n);
 if(!c.planescape||!c.loot||!c.loot.harvest||!c.loot.harvest[0].craftMaterialId)throw new Error('Missing Planescape/harvest '+n);
}
if(!ps.planarInfluence('Mechanus').tags.includes('law'))throw new Error('Mechanus influence failed');
if(ps.portalRoute('Sigil','Mechanus').from!=='Sigil')throw new Error('Portal route failed');
if(api.getCreature('Dabus')==null)throw new Error('Dabus missing');
if(!Array.isArray(ps.gateTowns)||ps.gateTowns.length!==16)throw new Error('Gate towns mismatch');
if(!Array.isArray(ps.factions)||ps.factions.length!==12)throw new Error('Faction count mismatch');
console.log('V56_13_PLANESCAPE_TEST_OK');
console.log(JSON.stringify(s));
