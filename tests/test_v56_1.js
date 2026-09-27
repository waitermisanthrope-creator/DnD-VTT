/**
 * test_v56_1.js
 * ------------------------------------------------------------------
 * ЧТО ЭТО ЗА ФАЙЛ:
 * Регрессионный smoke-test для V56.1. Загружает существующий Bestiary 2.0
 * и каталог V56.1 в изолированный VM-контекст, затем проверяет регистрацию,
 * source metadata, harvest и доступность существующего monster/loot catalog.
 * ОСНОВНЫЕ API: DND_BESTIARY_V56_1.summary(), getCreature(), listBySource().
 * ------------------------------------------------------------------
 */
const fs=require('fs');
const vm=require('vm');
const ctx={console,window:{}};
ctx.window=ctx;
ctx.DNDMonsters={catalog:{}};
ctx.DNDMonsterLoot={catalog:{}};
ctx.DND_CRAFTING_V31={MATERIALS:[]};
ctx.DNDExpandedBestiary={catalog:{},families:{},familyByCreature:{}};
vm.createContext(ctx);
['expanded_bestiary_v39.js','bestiary_2_0_v56.js','bestiary_catalog_v56_1.js'].forEach(function(f){vm.runInContext(fs.readFileSync(f,'utf8'),ctx,{filename:f});});
const api=ctx.DND_BESTIARY_V56_1;
const summary=api.summary();
if(summary.added<50)throw new Error('V56.1 added fewer than 50 creatures');
Object.keys(api.catalog).forEach(function(name){const c=api.getCreature(name);if(!c||!c.sourcePack||!c.loot||!c.loot.harvest||!c.loot.harvest[0])throw new Error('Incomplete creature: '+name);if(!ctx.DNDMonsters.catalog[name])throw new Error('Monster not registered: '+name);});
console.log('V56_1_BESTIARY_TEST_OK',JSON.stringify({added:summary.added,total:summary.total,sources:summary.sources,materials:ctx.DND_CRAFTING_V31.MATERIALS.length}));
