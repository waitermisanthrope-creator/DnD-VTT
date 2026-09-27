/**
 * V49 test: проверяет замкнутые производственные цепочки, качество/прочность и ремонт.
 * Как работает: загружает проект в Node VM, поднимает минимальные браузерные заглушки и
 * проверяет API DND_CRAFT_ECONOMY_V49 без изменения игровых данных пользователя.
 * Основные переменные: chainReport, getDurability, itemValue, repairItem.
 */
const fs=require('fs'),vm=require('vm');
const dir=__dirname;
const ctx={console,Math,Date,JSON,window:null,document:{readyState:'complete',getElementById:()=>null,addEventListener:()=>{}},setTimeout,clearTimeout};ctx.window=ctx;
ctx.defaultMaterials=[];ctx.DND_CRAFT_PROFESSIONS_V38={MATERIALS:ctx.defaultMaterials,ALL_RECIPES:[],craft:()=>({ok:true,item:{name:'Тестовый предмет',category:'weapons',craftQuality:'fine',craftMasterworkBonus:2}}),rebuildMaterialUsage:()=>true};
ctx.currentCharacter={};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(__dirname+'/crafting_economy_v49.js','utf8'),ctx);
const api=ctx.DND_CRAFT_ECONOMY_V49;
if(!api||api.VERSION!=='49.0.0')throw new Error('V49 API missing');
const report=api.chainReport();
if(report.recipes<20)throw new Error('Expected at least 20 chain recipes');
if(!report.closedChains.hide.includes('leather'))throw new Error('Hide chain missing');
const item={category:'weapons',craftQuality:'exceptional',craftMasterworkBonus:3,cost:'100 зм'};
api.applyQuality(item);
if(!(item.durabilityMax>80))throw new Error('Quality durability not applied');
item.durability=10;
const dry=api.repairItem(item,{dryRun:true});
if(!dry.ok||dry.cost<=0)throw new Error('Repair calculation failed');
console.log('V49_CRAFTING_ECONOMY_TEST_OK',JSON.stringify({recipes:report.recipes,materials:ctx.defaultMaterials.length,durability:item.durabilityMax,repairCost:dry.cost}));
