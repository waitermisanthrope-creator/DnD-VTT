/*
 * V56 regression: проверяет Bestiary 2.0 поверх единого DNDExpandedBestiary.
 * Проверяются новые creature profiles, семейства, экология, runtime-варианты,
 * поведение, harvest -> material и processing recipe registration.
 */
const fs=require('fs'),vm=require('vm'),path=require('path');
const ctx={console,Date,Math,JSON,Number,String,Array,Object,Set,Map,isFinite,parseFloat};
ctx.window=ctx;ctx.global=ctx;ctx.addEventListener=()=>{};
ctx.localStorage={_: {},getItem(k){return this._[k]||null},setItem(k,v){this._[k]=String(v)}};
ctx.document={addEventListener(){},getElementById(){return null},querySelector(){return null},createElement(){return {style:{},appendChild(){},setAttribute(){},remove(){},addEventListener(){}}},body:{appendChild(){}}};
ctx.currentCharacter={inventory:{weapons:[],armor:[],consumables:[],materials:[],junk:[]},coins:{gp:100,sp:0,cp:0,ep:0,pp:0},stats:{str:10,dex:10,con:10,int:10,wis:10,cha:10}};ctx.currentChar=ctx.currentCharacter;
vm.createContext(ctx);
['monster_engine.js','monster_loot_engine_v37.js','expanded_bestiary_v39.js','crafting_engine_v31.js','crafting_professions_v38.js','crafting_resources_v34.js','monster_loot_crafting_bridge_v40.js','resource_processing_v44.js','bestiary_2_0_v56.js'].forEach(f=>vm.runInContext(fs.readFileSync(path.join(__dirname,f),'utf8'),ctx,{filename:f}));
const B=ctx.DND_BESTIARY_V56;if(!B)throw Error('V56 API missing');
const names=Object.keys(B.catalog);if(names.length<40)throw Error('expected >=40 new creatures, got '+names.length);
const summary=B.summary();if(summary.total<82)throw Error('expanded bestiary total unexpectedly low: '+summary.total);
['fey','fiend','construct','aberration','plant'].forEach(f=>{if(!ctx.DNDExpandedBestiary.families[f])throw Error('missing family '+f);});
const eco=B.getEcology('Грозовой дух');if(!eco||eco.role!=='skirmisher'||eco.activity!=='storm')throw Error('ecology failed');
const variant=B.createVariant('Грозовой дух','alpha',77);if(!variant||variant.hp<=B.catalog['Грозовой дух'].hp||variant.ac!==18)throw Error('variant failed');
const beh=B.getBehavior('Разведчик-гоблин',{unseen:true,distance:20,targets:1,allies:1,hpPercent:.9});if(!beh||beh.priority!=='ambush'){console.log('BEH',beh);throw Error('behavior failed');}
const habitat=B.listByHabitat('swamp');if(habitat.length<5)throw Error('habitat index too small');
const role=B.listByRole('guardian');if(role.length<5)throw Error('role index too small');
const c=B.getCreature('Гигантская гадюка');const hv=c.loot.harvest[0];if(!hv.craftMaterialId)throw Error('harvest material id missing');
const mat=ctx.DND_CRAFTING_V31.MATERIALS.find(m=>m.id===hv.craftMaterialId);if(!mat)throw Error('harvest material not registered');
const recipe=ctx.DND_CRAFT_PROFESSIONS_V38.ALL_RECIPES.find(r=>r.id==='res_v56_'+hv.craftMaterialId);if(!recipe)throw Error('processing recipe missing');
const generated=ctx.DNDMonsterLoot.generate('Гигантская гадюка',{});const generatedHarvest=generated.containers.harvest.find(x=>x.craftMaterialId===hv.craftMaterialId);if(!generatedHarvest||generatedHarvest.rawQuantity===undefined)throw Error('generated harvest not normalized');
console.log('V56_BESTIARY_2_TEST_OK',JSON.stringify({added:names.length,total:summary.total,families:Object.keys(summary.families).length,variants:summary.variants.length,swamp:habitat.length,guardians:role.length,harvestMaterial:true,processing:true,behavior:true}));
