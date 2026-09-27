/**
 * Crafting Economy v49: замыкает цепочку «добыча → переработка → компонент → предмет».
 * Как работает: расширяет существующий DND_CRAFT_PROFESSIONS_V38 после загрузки
 * Resource Processing и Profession Progression, добавляет перекрёстные производственные
 * рецепты, рассчитывает качество/прочность/стоимость результата и поддерживает ремонт.
 * Основные API: DND_CRAFT_ECONOMY_V49, addRecipe(), getItemQuality(), getDurability(),
 * repairItem(), itemValue(), marketValue(), chainReport(). Это авторское ХБ и не заменяет
 * базовые правила D&D 5e. Wallpapers.js и Ambiences.js не изменяются.
 */
(function(global){'use strict';
var prof=global.DND_CRAFT_PROFESSIONS_V38;
var prog=global.DND_CRAFT_PROFESSION_PROGRESS;
if(!prof)return;
var base=prof;
var MATERIALS=base.MATERIALS||global.defaultMaterials||[];
base.MATERIALS=MATERIALS;
function ensureMaterial(id,name,cat,rarity,price,weight,tags){
  if(!MATERIALS.some(function(m){return m.id===id;})) MATERIALS.push({id:id,name:name,cat:cat||'processed',rarity:rarity||'common',price:Number(price)||1,weight:Number(weight)||0.1,roles:['crafting','processed'],tags:tags||['crafting']});
}
function addRecipe(r){
  if(!r||!r.id||base.ALL_RECIPES.some(function(x){return x.id===r.id;}))return false;
  r.category=r.category||'materials';r.materials=r.materials||{};r.tools=r.tools||[];r.output=r.output||{name:r.name,count:1};
  base.ALL_RECIPES.push(r);return true;
}

/* Shared components: разные существа сходятся в одинаковые производственные материалы. */
ensureMaterial('fineLeatherV49','Тонкая кожа','hide','uncommon',8,0.3,['leather','fine','crafting']);
ensureMaterial('leatherStrapV49','Кожаные ремни','hide','common',2,0.2,['leather','strap']);
ensureMaterial('boneStockV49','Костная заготовка','bone','common',3,0.5,['bone','component']);
ensureMaterial('boneHandleV49','Костяная рукоять','bone','uncommon',10,0.4,['bone','handle']);
ensureMaterial('silkThreadV49','Паучья нить','fiber','uncommon',6,0.05,['silk','thread']);
ensureMaterial('fineFiberV49','Тонкое волокно','fiber','uncommon',5,0.05,['fiber','fine']);
ensureMaterial('fletchingStockV49','Оперение для боеприпасов','fiber','common',1,0.02,['feather','fletching']);
ensureMaterial('scalePlateV49','Обработанная чешуйчатая пластина','scale','rare',25,0.4,['scale','armor']);
ensureMaterial('chitinPlateV49','Хитиновая пластина','armor_component','uncommon',8,0.3,['chitin','armor']);
ensureMaterial('alchemicalReagentV49','Очищенный алхимический реагент','reagent','uncommon',8,0.1,['reagent','alchemy']);
ensureMaterial('venomConcentrateV49','Концентрат яда','reagent','rare',20,0.05,['venom','poison']);
ensureMaterial('arcaneReagentV49','Арканический реагент','reagent','rare',30,0.05,['arcane','reagent']);
ensureMaterial('spectralThreadV49','Спектральная нить','fiber','rare',20,0.02,['spectral','thread']);
ensureMaterial('elementalReagentV49','Элементальный реагент','reagent','rare',25,0.05,['elemental','reagent']);
ensureMaterial('reinforcedWoodV49','Усиленная древесина','wood','uncommon',8,1,['wood','reinforced']);
ensureMaterial('steelWireV38','Стальная проволока','metal','common',3,0.05,['steel','wire']);

var R=[];
function recipe(id,name,tools,dc,time,mats,out,opts){var r={id:id,name:name,tools:tools,dc:dc,time:time,materials:mats,output:out,category:(opts&&opts.category)||'materials'};if(opts)Object.keys(opts).forEach(function(k){if(k!=='category')r[k]=opts[k];});R.push(r);addRecipe(r);}

/* Кожа: крыса/гоблин/волк/медведь и т.д. после обработки сходятся в leather. */
recipe('eco_leather_fine_v49','Тонкая выделка кожи',['leatherworker'],12,4,{leather:2,leatherStrapV49:1},{name:'Тонкая кожа',materialId:'fineLeatherV49',count:1},{craftTags:['leather','fine'],specialtyTags:['armor','gear','saddle']});
recipe('eco_leather_straps_v49','Нарезка кожаных ремней',['leatherworker'],9,2,{leather:1},{name:'Кожаные ремни',materialId:'leatherStrapV49',count:3},{craftTags:['leather','strap'],specialtyTags:['gear','travel','mount']});
recipe('eco_leather_scabbard_v49','Кожаные ножны',['leatherworker','woodcarver'],11,3,{leatherStrapV49:2,leather:1,hardwood:1},{name:'Кожаные ножны',count:1,category:'gear',weight:0.5,cost:'8 зм'},{specialtyTags:['gear','travel']});
recipe('eco_leather_saddle_v49','Усиленное седло',['leatherworker','carpenter'],15,8,{fineLeatherV49:2,leatherStrapV49:3,hardwood:2},{name:'Усиленное седло',count:1,category:'gear',weight:15,cost:'75 зм'},{specialtyTags:['saddle','mount']});

/* Кости/рога/клыки: единая костная заготовка для разных профессий. */
recipe('eco_bone_stock_v49','Обработка костного сырья',['woodcarver'],10,3,{boneStock:1},{name:'Костная заготовка',materialId:'boneStockV49',count:1},{specialtyTags:['component','finewood']});
recipe('eco_bone_handle_v49','Костяная рукоять',['woodcarver','leatherworker'],13,4,{boneStockV49:2,leatherStrapV49:1},{name:'Костяная рукоять',materialId:'boneHandleV49',count:1},{specialtyTags:['component','weapon']});
recipe('eco_bone_needle_v49','Костяная игла',['woodcarver'],9,2,{boneStockV49:1},{name:'Костяная игла',count:3,category:'junk',weight:0.05,cost:'1 зм'},{specialtyTags:['component']});

/* Волокна и перья: паучий шёлк/перья сходятся в общий текстильный контур. */
recipe('eco_silk_thread_v49','Прядение паучьего шёлка',['weaver'],12,3,{spiderSilk:1},{name:'Паучья нить',materialId:'silkThreadV49',count:0.8},{specialtyTags:['textile','rope']});
recipe('eco_fine_fiber_v49','Тонкая обработка волокна',['weaver'],11,3,{cloth:2,thread:2},{name:'Тонкое волокно',materialId:'fineFiberV49',count:1},{specialtyTags:['textile','garment']});
recipe('eco_fletching_v49','Подготовка оперения',['woodcarver'],10,2,{fletchingStock:2},{name:'Оперение для боеприпасов',materialId:'fletchingStockV49',count:4},{specialtyTags:['ammunition','arrow','bolt']});
recipe('eco_arrow_batch_v49','Партия стрел',['woodcarver','smith'],10,2,{hardwood:1,fletchingStockV49:1,arrowheads:1},{name:'Стрелы',count:20,category:'weapons',weight:1,cost:'1 зм'},{specialtyTags:['ammunition','arrow']});

/* Чешуя/хитин: природная броня → пластины → предмет. */
recipe('eco_scale_plate_v49','Обработка чешуйчатых пластин',['leatherworker','smith'],15,6,{dragonScale:2},{name:'Обработанная чешуйчатая пластина',materialId:'scalePlateV49',count:1},{specialtyTags:['armor','metal_armor']});
recipe('eco_chitin_plate_v49','Формовка хитиновой пластины',['smith'],13,5,{chitinPlate:2},{name:'Хитиновая пластина',materialId:'chitinPlateV49',count:1},{specialtyTags:['armor','component']});
recipe('eco_scale_shield_v49','Чешуйчатый щит',['smith','leatherworker','carpenter'],16,10,{scalePlateV49:4,shieldFrame:1,leatherStrapV49:2},{name:'Чешуйчатый щит',count:1,category:'armor',weight:8,cost:'80 зм'},{specialtyTags:['shield','armor']});

/* Алхимические ресурсы: кровь/яд/эссенции/слизь сходятся в общий реагентный слой. */
recipe('eco_reagent_clean_v49','Очистка алхимического реагента',['alchemist'],12,3,{dragonReagent:1},{name:'Очищенный алхимический реагент',materialId:'alchemicalReagentV49',count:0.8},{specialtyTags:['reagent','processing','catalyst']});
recipe('eco_venom_concentrate_v49','Концентрация яда',['alchemist'],14,4,{venomReagent:2},{name:'Концентрат яда',materialId:'venomConcentrateV49',count:1},{specialtyTags:['poison','toxin','antidote']});
recipe('eco_arcane_reagent_v49','Стабилизация арканической эссенции',['alchemist','potter'],16,5,{arcaneShard:1,alchemicalReagentV49:1},{name:'Арканический реагент',materialId:'arcaneReagentV49',count:1},{specialtyTags:['arcane','reagent','component']});
recipe('eco_spectral_thread_v49','Прядение спектрального волокна',['weaver','alchemist'],17,6,{spectralFiber:1,ectoplasm:1},{name:'Спектральная нить',materialId:'spectralThreadV49',count:0.75},{specialtyTags:['textile','arcane','component']});
recipe('eco_elemental_reagent_v49','Связывание элементальной эссенции',['alchemist','potter'],15,5,{fireEssence:1,elementalAsh:1},{name:'Элементальный реагент',materialId:'elementalReagentV49',count:1},{specialtyTags:['elemental','reagent','catalyst']});

/* Дерево: обычная древесина превращается в усиленные заготовки. */
recipe('eco_reinforced_wood_v49','Усиление древесины',['carpenter','woodcarver'],12,4,{hardwood:2,resin:1},{name:'Усиленная древесина',materialId:'reinforcedWoodV49',count:1},{specialtyTags:['finewood','structure','bow']});
recipe('eco_bow_v49','Составной лук',['woodcarver','leatherworker'],14,6,{reinforcedWoodV49:2,fineLeatherV49:1,thread:2},{name:'Составной лук',count:1,category:'weapons',weight:2,cost:'75 зм'},{specialtyTags:['bow','ranged']});

/* Высокоуровневые предметы используют редкие добытые ресурсы, а не создаются из воздуха. */
recipe('eco_dragon_scale_armor_v49','Драконья чешуйчатая броня',['smith','leatherworker'],20,24,{scalePlateV49:8,fineLeatherV49:4,dragonReagent:1},{name:'Драконья чешуйчатая броня',count:1,category:'armor',weight:20,cost:'1000 зм'},{specialtyTags:['armor','metal_armor']});
recipe('eco_spectral_cloak_v49','Спектральный плащ',['weaver','alchemist'],19,16,{spectralThreadV49:5,arcaneReagentV49:1,fineFiberV49:2},{name:'Спектральный плащ',count:1,category:'clothing',weight:1,cost:'500 зм'},{specialtyTags:['clothing','arcane','garment']});
recipe('eco_poison_kit_v49','Набор токсиколога',['alchemist','glassblower'],16,6,{venomConcentrateV49:2,glass:2,alchemicalReagentV49:1},{name:'Набор токсиколога',count:1,category:'consumables',weight:1,cost:'150 зм'},{specialtyTags:['poison','toxin']});

var QUALITY={critical_failure:{label:'Испорчено',mult:0.25,dur:0},failure:{label:'Сырьё потеряно',mult:0.5,dur:0},success:{label:'Стандартное',mult:1,dur:1},fine:{label:'Качественное',mult:1.15,dur:1.25},exceptional:{label:'Мастерское',mult:1.35,dur:1.5}};
function qualityKey(item){return item&&item.craftQuality||item&&item.craftOutcome||'success';}
function categoryBaseDurability(item){var c=String(item&&item.category||'').toLowerCase();if(c==='armor')return 100;if(c==='weapons')return 80;if(c==='clothing')return 60;if(c==='gear')return 50;if(c==='consumables')return 1;return 40;}
function getDurability(item){if(!item)return{current:0,max:0,ratio:0};var max=Number(item.durabilityMax)||categoryBaseDurability(item);var current=Number(item.durability);if(!Number.isFinite(current))current=max;return{current:Math.max(0,Math.min(max,current)),max:max,ratio:max?Math.max(0,Math.min(1,current/max)):0};}
function applyQuality(item){if(!item)return item;var q=QUALITY[qualityKey(item)]||QUALITY.success;var master=Number(item.craftMasterworkBonus)||Number(item.craftProfessionQualityBonus)||0;var max=Math.max(1,Math.round(categoryBaseDurability(item)*q.dur*(1+master*0.05)));item.durabilityMax=max;item.durability=max;item.qualityMultiplier=q.mult;item.qualityLabel=q.label;item.craftEconomyVersion='49.0.0';item.craftEconomySource='Авторское ХБ: производственная экономика';item.baseCraftValue=item.baseCraftValue||itemValueBase(item);item.marketValue=itemValue(item);return item;}
function itemValueBase(item){var raw=String(item&&item.cost||'').replace(',','.').match(/[0-9]+(?:\.[0-9]+)?/);if(raw)return Number(raw[0]);var mat=item&&item.materialId&&MATERIALS.find(function(m){return m.id===item.materialId;});return mat?Number(mat.price)||1:1;}
function itemValue(item){if(!item)return 0;var q=QUALITY[qualityKey(item)]||QUALITY.success;var baseValue=Number(item.baseCraftValue)||itemValueBase(item);var m=Number(item.qualityMultiplier)||q.mult||1;var d=getDurability(item);return Math.max(0,Math.round(baseValue*m*(0.25+0.75*d.ratio)*100)/100);}
function marketValue(item,mode){var v=itemValue(item);if(mode==='buy')return Math.round(v*1.25*100)/100;if(mode==='sell')return Math.round(v*0.5*100)/100;return v;}
function repairItem(item,options){options=options||{};if(!item)return{ok:false,error:'Предмет не найден'};var d=getDurability(item);if(d.current>=d.max)return{ok:true,repaired:false,cost:0,message:'Предмет уже полностью исправен.'};var missing=d.max-d.current;var cost=Math.max(1,Math.ceil(missing/10));if(options.dryRun)return{ok:true,dryRun:true,missing:missing,cost:cost};var c=global.currentCharacter||global.currentChar;if(c){c.gold=Number(c.gold)||0;if(c.gold<cost)return{ok:false,error:'Недостаточно золота для ремонта',cost:cost,have:c.gold};c.gold-=cost;}item.durability=d.max;item.repairedAt=Date.now();item.repairCount=(Number(item.repairCount)||0)+1;item.marketValue=itemValue(item);if(typeof global.autoSaveCurrentCharacter==='function')global.autoSaveCurrentCharacter();return{ok:true,repaired:true,cost:cost,item:item};}
function patchCraft(){if(base.craft.__v49Wrapped)return;var original=base.craft;function wrapped(id,options){var result=original(id,options);if(result&&result.ok&&result.item){applyQuality(result.item);result.item.marketValue=itemValue(result.item);result.item.craftMaterialLineage=(result.item.resourceInput?[result.item.resourceInput]:[]);result.item.craftRecipeName=result.recipe&&result.recipe.name||result.item.craftRecipeName;result.economyV49={durability:getDurability(result.item),marketValue:result.item.marketValue};}return result;}wrapped.__v49Wrapped=true;base.craft=wrapped;global.dndCraftProfessionV38=wrapped;}
function chainReport(){var recipes=R.map(function(r){return{id:r.id,name:r.name,tools:r.tools,materials:r.materials,output:r.output.name,specialtyTags:r.specialtyTags||[]};});return{ok:true,version:'49.0.0',recipes:recipes.length,recipesList:recipes,closedChains:{hide:['leather','fineLeatherV49'],bone:['boneStockV49','boneHandleV49'],fiber:['spiderSilk','silkThreadV49'],scale:['dragonScale','scalePlateV49'],venom:['venomReagent','venomConcentrateV49'],wood:['hardwood','reinforcedWoodV49']}};}
function render(){var host=document.getElementById('craftingV49Economy');if(host)return;host=document.getElementById('craftingProfessionsPanel')||document.getElementById('craftingV38Recipes');if(!host)return;var box=document.createElement('div');box.id='craftingV49Economy';box.style.cssText='margin:10px 0;padding:9px;background:#191714;border:1px solid #594a31;border-radius:7px;color:#ccc';box.innerHTML='<b style="color:#d7b86e">🔗 Производственные цепочки v49</b><div style="font-size:.74em;color:#999;margin-top:4px">Добыча существ → переработка → общие компоненты → готовые предметы. Качество влияет на стоимость и прочность.</div><div style="margin-top:6px;font-size:.75em">Добавлено цепных рецептов: <b>'+R.length+'</b> · Материалы: <b>'+MATERIALS.length+'</b></div>';host.prepend(box);}
patchCraft();
if(typeof base.rebuildMaterialUsage==='function')base.rebuildMaterialUsage();
var API={VERSION:'49.0.0',RECIPES:R,QUALITY:QUALITY,ensureMaterial:ensureMaterial,addRecipe:addRecipe,getItemQuality:qualityKey,getDurability:getDurability,applyQuality:applyQuality,repairItem:repairItem,itemValue:itemValue,marketValue:marketValue,chainReport:chainReport,render:render};
global.DND_CRAFT_ECONOMY_V49=API;
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',render);else render();
})(window);
