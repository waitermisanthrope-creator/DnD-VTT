/**
 * V51 test: проверяет шкалу качества, разбор по рецепту и ремонт с материалами.
 * Как работает: поднимает минимальные browser-заглушки, загружает V49 и V51 и прогоняет
 * dry-run/commit сценарии без зависимости от реального UI. Основные API: qualityOf(),
 * disassembleItem(), canRepair(), repairItem().
 */
const fs=require('fs'),vm=require('vm');
const ctx={console,Math,Date,JSON,window:null,document:{readyState:'complete',getElementById:()=>null,addEventListener:()=>{}},setTimeout,clearTimeout};ctx.window=ctx;
ctx.defaultMaterials=[{id:'steelWireV38',name:'Стальная проволока',price:3},{id:'leatherStrapV49',name:'Кожаные ремни',price:2},{id:'hardwood',name:'Твёрдая древесина',price:2}];
const testRecipe={id:'v51_test_recipe',name:'Тестовый меч',materials:{hardwood:2,steelWireV38:1},tools:['smith'],output:{name:'Тестовый меч',count:1}};
ctx.DND_CRAFT_PROFESSIONS_V38={MATERIALS:ctx.defaultMaterials,ALL_RECIPES:[testRecipe],craft:function(){return {ok:true,recipe:testRecipe,item:{name:'Тестовый меч',category:'weapons',craftRecipe:'v51_test_recipe',craftQuality:'exceptional',craftOutcome:'exceptional',qualityBonus:2,craftingBonus:4,craftMasterworkBonus:0,cost:'100 зм',durabilityMax:80,durability:40}}},rebuildMaterialUsage:()=>true};
ctx.currentCharacter={gold:50,inventory:{weapons:[],armor:[],consumables:[],materials:[{name:'Стальная проволока',materialId:'steelWireV38',count:5},{name:'Твёрдая древесина',materialId:'hardwood',count:5}],junk:[],clothing:[],gear:[]}};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(__dirname+'/crafting_economy_v49.js','utf8'),ctx);
vm.runInContext(fs.readFileSync(__dirname+'/crafting_disassembly_v51.js','utf8'),ctx);
const api=ctx.DND_CRAFT_V51;if(!api||api.VERSION!=='51.0.0')throw new Error('V51 API missing');
const item=ctx.DND_CRAFT_PROFESSIONS_V38.craft('v51_test_recipe').item;ctx.currentCharacter.inventory.weapons.push(item);
if(!['masterwork','legendary'].includes(api.qualityOf(item).key))throw new Error('Quality normalization failed');
const plan=api.disassembleItem(item);if(!plan.ok||plan.rate<=0||!plan.recovered.hardwood)throw new Error('Disassembly dry run failed');
const committed=api.disassembleItem(item,{dryRun:false});if(!committed.committed||!committed.itemRemoved)throw new Error('Disassembly commit failed');
item.durability=Math.floor(item.durabilityMax/2);const repairPlan=api.canRepair(item);if(!repairPlan.ok||repairPlan.gold<=0)throw new Error('Repair plan failed');
const repaired=api.repairItem(item);if(!repaired.ok||!repaired.repaired||item.durability!==item.durabilityMax)throw new Error('Repair failed');
console.log('V51_DISASSEMBLY_QUALITY_TEST_OK',JSON.stringify({quality:api.qualityOf(item).key,recoveryRate:plan.rate,recovered:plan.recovered,repairGold:repaired.gold}));
