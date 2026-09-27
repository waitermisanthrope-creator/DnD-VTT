/**
 * Resource Processing v45 — физический объём добычи, массовый каталог переработки и исходы обработки ресурсов.
 * Как работает: переводит добытые части существ в измеримые количества сырья,
 * допускает дробные единицы, описывает потери при обработке и добавляет рецепты
 * переработки в существующий DND_CRAFT_PROFESSIONS_V38 без создания отдельного
 * конкурирующего crafting engine. Основные переменные: RESOURCE_YIELDS,
 * RESOURCE_PROCESSING, DNDMonsterLootV40, DNDMonsterLoot, currentCharacter,
 * MATERIALS, ALL_RECIPES, rawQuantity, processedQuantity, resourceUnit.
 */
(function(global){'use strict';
const base = global.DND_CRAFTING_V31;
const prof = global.DND_CRAFT_PROFESSIONS_V38;
if(!base || !prof) return;

// Базовые материалы, которых не было в старом каталоге, но они нужны новой системе.
if(!base.MATERIALS.some(m=>m.id==='monster_rat_hide')) base.MATERIALS.push({id:'monster_rat_hide',name:'Крысиная шкура',cat:'hide',rarity:'common',price:.2,weight:.1,roles:['monster-harvest'],tags:['hide','leather','small','rat']});

const RESOURCE_YIELDS = {
  // Небольшие шкуры дают очень мало готовой кожи — намеренно.
  monster_rat_hide: {rawUnit:'шкура', processedId:'leather', processedUnit:'ед. кожи', ratio:0.10, waste:0.90},
  monster_wolf_hide: {rawUnit:'шкура', processedId:'leather', processedUnit:'ед. кожи', ratio:0.80, waste:0.20},
  monster_direwolf_hide: {rawUnit:'шкура', processedId:'leather', processedUnit:'ед. кожи', ratio:1.80, waste:0.10},
  monster_bear_hide: {rawUnit:'шкура', processedId:'leather', processedUnit:'ед. кожи', ratio:3.20, waste:0.12},
  monster_owlbear_hide: {rawUnit:'шкура', processedId:'leather', processedUnit:'ед. кожи', ratio:4.00, waste:0.15},
  monster_troll_hide: {rawUnit:'шкура', processedId:'leather', processedUnit:'ед. кожи', ratio:3.00, waste:0.25},
  monster_goblin_hide: {rawUnit:'шкура', processedId:'leather', processedUnit:'ед. кожи', ratio:0.35, waste:0.25},
  monster_orc_hide: {rawUnit:'шкура', processedId:'leather', processedUnit:'ед. кожи', ratio:0.90, waste:0.20},
  monster_bugbear_hide: {rawUnit:'шкура', processedId:'leather', processedUnit:'ед. кожи', ratio:0.75, waste:0.20},
  monster_gnoll_hide: {rawUnit:'шкура', processedId:'leather', processedUnit:'ед. кожи', ratio:0.85, waste:0.20},
  monster_kobold_scalehide: {rawUnit:'шкура', processedId:'leather', processedUnit:'ед. кожи', ratio:0.30, waste:0.35},
  monster_dragon_scales: {rawUnit:'чешуя', processedId:'dragonScale', processedUnit:'ед. обработанной чешуи', ratio:0.85, waste:0.15},
  monster_dragon_bones: {rawUnit:'кость', processedId:'monsterPart', processedUnit:'ед. костного сырья', ratio:0.75, waste:0.20},
  monster_spider_silk: {rawUnit:'пучок', processedId:'spiderSilk', processedUnit:'ед. паучьего шёлка', ratio:0.80, waste:0.10},
  monster_troll_blood: {rawUnit:'порция', processedId:'monster_troll_blood', processedUnit:'порция крови', ratio:0.95, waste:0.05},

  // V45 mass resource expansion: raw harvest from all current bestiary families.
  monster_bandit_hide:{rawUnit:'шкура',processedId:'leather',processedUnit:'ед. кожи',ratio:0.45,waste:0.20},
  monster_kobold_horn:{rawUnit:'рог',processedId:'boneStock',processedUnit:'ед. костного сырья',ratio:0.25,waste:0.20},
  monster_bugbear_fang:{rawUnit:'клык',processedId:'boneStock',processedUnit:'ед. костного сырья',ratio:0.12,waste:0.10},
  monster_gnoll_tooth:{rawUnit:'зуб',processedId:'boneStock',processedUnit:'ед. костного сырья',ratio:0.10,waste:0.10},
  monster_spider_venom:{rawUnit:'порция',processedId:'venomReagent',processedUnit:'ед. ядовитого реагента',ratio:0.75,waste:0.15},
  monster_direwolf_fang:{rawUnit:'клык',processedId:'boneStock',processedUnit:'ед. костного сырья',ratio:0.18,waste:0.10},
  monster_bear_fat:{rawUnit:'порция',processedId:'alchemicalFat',processedUnit:'ед. очищенного жира',ratio:0.70,waste:0.15},
  monster_owlbear_claw:{rawUnit:'коготь',processedId:'boneStock',processedUnit:'ед. костного сырья',ratio:0.20,waste:0.10},
  monster_harpy_vocal_membrane:{rawUnit:'мембрана',processedId:'voiceReagent',processedUnit:'ед. голосового реагента',ratio:0.60,waste:0.20},
  monster_ghoul_tissue:{rawUnit:'фрагмент',processedId:'necroticReagent',processedUnit:'ед. некротического реагента',ratio:0.65,waste:0.20},
  monster_ghoul_claw:{rawUnit:'коготь',processedId:'boneStock',processedUnit:'ед. костного сырья',ratio:0.18,waste:0.10},
  monster_wight_bone:{rawUnit:'кость',processedId:'necroticBone',processedUnit:'ед. некротической кости',ratio:0.75,waste:0.10},
  monster_wight_essence:{rawUnit:'порция',processedId:'necroticEssence',processedUnit:'ед. некротической эссенции',ratio:0.80,waste:0.10},
  monster_mimic_slime:{rawUnit:'порция',processedId:'slimeReagent',processedUnit:'ед. слизистого реагента',ratio:0.70,waste:0.20},
  monster_mimic_skin:{rawUnit:'фрагмент',processedId:'elasticHide',processedUnit:'ед. эластичной кожи',ratio:0.55,waste:0.20},
  monster_basilisk_eye:{rawUnit:'глаз',processedId:'petrificationReagent',processedUnit:'ед. реагента окаменения',ratio:0.65,waste:0.15},
  monster_basilisk_gallstone:{rawUnit:'камень',processedId:'petrificationReagent',processedUnit:'ед. реагента окаменения',ratio:0.80,waste:0.10},
  monster_manticore_hide:{rawUnit:'шкура',processedId:'leather',processedUnit:'ед. кожи',ratio:2.10,waste:0.18},
  monster_manticore_meat:{rawUnit:'порция',processedId:'monster_meat',processedUnit:'ед. мяса',ratio:0.90,waste:0.10},
  monster_troll_claw:{rawUnit:'коготь',processedId:'boneStock',processedUnit:'ед. костного сырья',ratio:0.25,waste:0.10},
  monster_dragon_heart:{rawUnit:'орган',processedId:'dragonReagent',processedUnit:'ед. драконьего реагента',ratio:1.50,waste:0.20},
  monster_deer_hide:{rawUnit:'шкура',processedId:'leather',processedUnit:'ед. кожи',ratio:1.10,waste:0.15},
  monster_deer_antler:{rawUnit:'рог',processedId:'boneStock',processedUnit:'ед. костного сырья',ratio:1.30,waste:0.12},
  monster_boar_hide:{rawUnit:'шкура',processedId:'leather',processedUnit:'ед. кожи',ratio:1.00,waste:0.15},
  monster_boar_tusk:{rawUnit:'клык',processedId:'boneStock',processedUnit:'ед. костного сырья',ratio:0.55,waste:0.10},
  monster_rat_fangs:{rawUnit:'клык',processedId:'boneStock',processedUnit:'ед. костного сырья',ratio:0.08,waste:0.10},
  monster_frog_skin:{rawUnit:'кожа',processedId:'leather',processedUnit:'ед. кожи',ratio:0.20,waste:0.25},
  monster_frog_gland:{rawUnit:'железа',processedId:'alchemicalReagent',processedUnit:'ед. алхимического реагента',ratio:0.55,waste:0.20},
  monster_crocodile_hide:{rawUnit:'шкура',processedId:'leather',processedUnit:'ед. кожи',ratio:2.40,waste:0.12},
  monster_crocodile_teeth:{rawUnit:'зуб',processedId:'boneStock',processedUnit:'ед. костного сырья',ratio:0.10,waste:0.10},
  monster_hyena_hide:{rawUnit:'шкура',processedId:'leather',processedUnit:'ед. кожи',ratio:1.00,waste:0.18},
  monster_hyena_fangs:{rawUnit:'клык',processedId:'boneStock',processedUnit:'ед. костного сырья',ratio:0.14,waste:0.10},
  monster_constrictor_hide:{rawUnit:'шкура',processedId:'leather',processedUnit:'ед. кожи',ratio:1.60,waste:0.15},
  monster_constrictor_venom:{rawUnit:'порция',processedId:'venomReagent',processedUnit:'ед. ядовитого реагента',ratio:0.80,waste:0.15},
  monster_giant_eagle_feather:{rawUnit:'перо',processedId:'fletchingStock',processedUnit:'ед. оперения',ratio:0.90,waste:0.08},
  monster_giant_eagle_claw:{rawUnit:'коготь',processedId:'boneStock',processedUnit:'ед. костного сырья',ratio:0.20,waste:0.10},
  monster_giant_owl_feather:{rawUnit:'перо',processedId:'fletchingStock',processedUnit:'ед. оперения',ratio:0.90,waste:0.08},
  monster_giant_owl_eye:{rawUnit:'глаз',processedId:'perceptionReagent',processedUnit:'ед. реагента восприятия',ratio:0.60,waste:0.15},
  monster_blink_dog_pelt:{rawUnit:'пучок шерсти',processedId:'feyFiber',processedUnit:'ед. фейской нити',ratio:0.70,waste:0.15},
  monster_blink_dog_phase_gland:{rawUnit:'железа',processedId:'phaseReagent',processedUnit:'ед. фазового реагента',ratio:0.70,waste:0.20},
  monster_displacer_hide:{rawUnit:'шкура',processedId:'elasticHide',processedUnit:'ед. эластичной кожи',ratio:1.60,waste:0.15},
  monster_displacer_tentacle:{rawUnit:'усик',processedId:'phaseFiber',processedUnit:'ед. фазового волокна',ratio:0.55,waste:0.20},
  monster_rust_chitin:{rawUnit:'панцирная пластина',processedId:'chitinPlate',processedUnit:'ед. хитиновой заготовки',ratio:0.80,waste:0.15},
  monster_rust_gland:{rawUnit:'железа',processedId:'catalystReagent',processedUnit:'ед. каталитического реагента',ratio:0.70,waste:0.15},
  monster_ankheg_shell:{rawUnit:'панцирь',processedId:'chitinPlate',processedUnit:'ед. хитиновой заготовки',ratio:1.20,waste:0.15},
  monster_ankheg_acid_gland:{rawUnit:'железа',processedId:'acidReagent',processedUnit:'ед. кислотного реагента',ratio:0.70,waste:0.15},
  monster_carrion_crawler_paralytic:{rawUnit:'порция',processedId:'paralyticReagent',processedUnit:'ед. паралитического реагента',ratio:0.75,waste:0.15},
  monster_carrion_chitin:{rawUnit:'пластина',processedId:'chitinPlate',processedUnit:'ед. хитиновой заготовки',ratio:0.80,waste:0.15},
  monster_acid_slime:{rawUnit:'порция',processedId:'acidReagent',processedUnit:'ед. кислотного реагента',ratio:0.75,waste:0.20},
  monster_slime_membrane:{rawUnit:'мембрана',processedId:'slimeFiber',processedUnit:'ед. слизистого волокна',ratio:0.60,waste:0.20},
  monster_fire_essence:{rawUnit:'порция',processedId:'fireEssence',processedUnit:'ед. огненной эссенции',ratio:0.90,waste:0.08},
  monster_fire_ash:{rawUnit:'порция',processedId:'elementalAsh',processedUnit:'ед. элементальной золы',ratio:0.85,waste:0.10},
  monster_water_essence:{rawUnit:'порция',processedId:'waterEssence',processedUnit:'ед. водной эссенции',ratio:0.90,waste:0.08},
  monster_water_core:{rawUnit:'сердце',processedId:'waterCore',processedUnit:'ед. водного ядра',ratio:0.80,waste:0.15},
  monster_air_essence:{rawUnit:'порция',processedId:'airEssence',processedUnit:'ед. воздушной эссенции',ratio:0.90,waste:0.08},
  monster_air_vortex:{rawUnit:'сгусток',processedId:'airCore',processedUnit:'ед. воздушного ядра',ratio:0.80,waste:0.15},
  monster_earth_essence:{rawUnit:'порция',processedId:'earthEssence',processedUnit:'ед. земной эссенции',ratio:0.90,waste:0.08},
  monster_earth_core:{rawUnit:'сердце',processedId:'earthCore',processedUnit:'ед. земного ядра',ratio:0.80,waste:0.15},
  monster_shadow_clot:{rawUnit:'сгусток',processedId:'shadowEssence',processedUnit:'ед. теневой эссенции',ratio:0.75,waste:0.15},
  monster_ectoplasm:{rawUnit:'порция',processedId:'ectoplasm',processedUnit:'ед. эктоплазмы',ratio:0.90,waste:0.08},
  monster_ghost_thread:{rawUnit:'нить',processedId:'spectralFiber',processedUnit:'ед. спектрального волокна',ratio:0.75,waste:0.15},
  monster_spectral_dust:{rawUnit:'порция',processedId:'spectralReagent',processedUnit:'ед. спектрального реагента',ratio:0.80,waste:0.10},
  monster_ethereal_shard:{rawUnit:'осколок',processedId:'arcaneShard',processedUnit:'ед. эфирного осколка',ratio:0.90,waste:0.05},
  monster_cultist_cloth:{rawUnit:'отрез',processedId:'cloth',processedUnit:'ед. ткани',ratio:0.80,waste:0.15},
  monster_acolyte_cloth:{rawUnit:'отрез',processedId:'cloth',processedUnit:'ед. ткани',ratio:0.80,waste:0.15},
  monster_veteran_leather_armor:{rawUnit:'броня',processedId:'leather',processedUnit:'ед. кожи',ratio:2.00,waste:0.25},
  monster_bandit_captain_leather_armor:{rawUnit:'броня',processedId:'leather',processedUnit:'ед. кожи',ratio:2.50,waste:0.20}
};

const RESOURCE_PROCESSING = [];
function addRecipe(id,name,profession,dc,time,inputId,outputId,outputName,ratio,tools){
  const r={id,name,profession,dc,time,tools:tools||[profession],resourceProcessing:true,materials:{[inputId]:1},output:{category:'materials',name:outputName,count:ratio,materialId:outputId,resourceUnit:(RESOURCE_YIELDS[inputId]||{}).processedUnit||'ед.'},resourceProcessing:true};
  RESOURCE_PROCESSING.push(r);
  if(!prof.ALL_RECIPES.some(x=>x.id===id)) prof.ALL_RECIPES.push(r);
}
addRecipe('res_monster_rat_hide_tan','Выделка крысиной шкурки','leatherwork',8,1,'monster_rat_hide','leather','Кожа из крысиной шкурки',0.10,['leatherworker']);
addRecipe('res_monster_wolf_tan','Выделка волчьей шкуры','leatherwork',10,3,'monster_wolf_hide','leather','Кожа из волчьей шкуры',0.80,['leatherworker']);
addRecipe('res_monster_direwolf_tan','Выделка шкуры лютого волка','leatherwork',13,5,'monster_direwolf_hide','leather','Кожа из шкуры лютого волка',1.80,['leatherworker']);
addRecipe('res_monster_bear_tan','Выделка медвежьей шкуры','leatherwork',12,5,'monster_bear_hide','leather','Кожа из медвежьей шкуры',3.20,['leatherworker']);
addRecipe('res_monster_owlbear_tan','Выделка шкуры совомедведя','leatherwork',15,7,'monster_owlbear_hide','leather','Кожа из шкуры совомедведя',4.00,['leatherworker']);
addRecipe('res_monster_dragon_scale_treat','Обработка драконьей чешуи','leatherwork',16,8,'monster_dragon_scales','dragonScale','Обработанная драконья чешуя',0.85,['leatherworker','smith']);
addRecipe('res_monster_spider_silk_clean','Очистка паучьего шёлка','weaver',11,3,'monster_spider_silk','spiderSilk','Очищенный паучий шёлк',0.80,['weaver']);

  /* V45 generated processing recipes for every newly registered raw resource. */
  var PROCESSING_TOOL_BY_TYPE={
    hide:'leatherworker',bone:'woodcarver',horn:'woodcarver',scale:'leatherworker',chitin:'smith',fiber:'weaver',organ:'alchemist',reagent:'alchemist',essence:'alchemist',tissue:'alchemist',mineral:'smith',armor_component:'leatherworker'
  };
  var PROCESSING_DC_BY_RARITY={common:9,uncommon:11,rare:14,very_rare:17,legendary:20};
  var processedNames={leather:'Кожа',boneStock:'Костное сырьё',venomReagent:'Ядовитый реагент',alchemicalFat:'Очищенный жир',voiceReagent:'Голосовой реагент',necroticReagent:'Некротический реагент',necroticBone:'Некротическая кость',necroticEssence:'Некротическая эссенция',slimeReagent:'Слизистый реагент',elasticHide:'Эластичная кожа',petrificationReagent:'Реагент окаменения',monster_meat:'Обработанное мясо',dragonReagent:'Драконий реагент',fletchingStock:'Оперение',perceptionReagent:'Реагент восприятия',feyFiber:'Фейская нить',phaseReagent:'Фазовый реагент',phaseFiber:'Фазовое волокно',chitinPlate:'Хитиновая заготовка',catalystReagent:'Каталитический реагент',acidReagent:'Кислотный реагент',paralyticReagent:'Паралитический реагент',slimeFiber:'Слизистое волокно',fireEssence:'Огненная эссенция',elementalAsh:'Элементальная зола',waterEssence:'Водная эссенция',waterCore:'Водное ядро',airEssence:'Воздушная эссенция',airCore:'Воздушное ядро',earthEssence:'Земная эссенция',earthCore:'Земное ядро',shadowEssence:'Теневая эссенция',ectoplasm:'Эктоплазма',spectralFiber:'Спектральное волокно',spectralReagent:'Спектральный реагент',arcaneShard:'Эфирный осколок',cloth:'Ткань'};
  Object.keys(RESOURCE_YIELDS).forEach(function(inputId){
    var rule=RESOURCE_YIELDS[inputId];
    if(!rule||!rule.processedId||RESOURCE_PROCESSING.some(function(r){return r.materials&&r.materials[inputId];}))return;
    var mat=base.MATERIALS.find(function(m){return m.id===inputId;});
    var tool=PROCESSING_TOOL_BY_TYPE[mat&&mat.cat]||'alchemist';
    var rarity=mat&&mat.rarity||'common';
    var dc=PROCESSING_DC_BY_RARITY[rarity]||10;
    var safe=inputId.replace(/[^a-zA-Z0-9_]/g,'_');
    var outputName=processedNames[rule.processedId]||rule.processedUnit;
    addRecipe('res_v45_'+safe,'Переработка: '+(mat&&mat.name||inputId),tool,dc,Math.max(1,Math.round(dc/3)),inputId,rule.processedId,outputName,rule.ratio,[tool]);
  });

function num(v,d){const n=Number(v);return Number.isFinite(n)?n:d;}
function clone(v){return JSON.parse(JSON.stringify(v));}
function normalizeYield(item){
  if(!item) return item;
  const id=item.craftMaterialId||item.materialId;
  const rule=RESOURCE_YIELDS[id];
  if(!rule) return item;
  const sourceCount=Math.max(0,num(item.count,0));
  item.rawQuantity=sourceCount;
  item.resourceUnit=rule.rawUnit;
  item.resourceType='raw';
  item.resourceYield={processedId:rule.processedId,ratio:rule.ratio,waste:rule.waste,expectedProcessed:Math.round(sourceCount*rule.ratio*100)/100};
  item.count=sourceCount;
  return item;
}
function patchLootResult(result){
  if(!result || !result.containers) return result;
  ['pockets','carried','hoard','contents','harvest'].forEach(k=>(result.containers[k]||[]).forEach(normalizeYield));
  return result;
}
function wrapGenerate(api,key){
  if(!api || typeof api.generate!=='function' || api.generate.__v43) return;
  const original=api.generate;
  const wrapped=function(){return patchLootResult(original.apply(this,arguments));};
  wrapped.__v43=true;
  api.generate=wrapped;
}
wrapGenerate(global.DNDMonsterLoot,'v37');
wrapGenerate(global.DNDMonsterLootV40,'v40');

function ensureRatLoot(){
  const loot=global.DNDMonsterLoot;
  if(!loot || !loot.catalog || loot.catalog['Гигантская крыса']) return;
  loot.catalog['Гигантская крыса']={
    pockets:{rolls:0,table:[]},
    harvest:[
      {name:'Крысиная шкура',category:'materials',count:1,guaranteed:true,tags:['hide','leather','small'],skill:'survival',tool:'p_tool_leatherworker',dc:9,craftMaterialId:'monster_rat_hide'},
      {name:'Крысиные клыки',category:'materials',count:[1,2],guaranteed:true,tags:['bone','trophy'],skill:'medicine',dc:9},
      {name:'Крысиное мясо',category:'materials',count:[0,1],chance:0.6,tags:['food','meat'],skill:'medicine',dc:9}
    ]
  };
}
ensureRatLoot();

// Создаём отсутствующие ресурсные материалы в существующем каталоге.
RESOURCE_PROCESSING.forEach(r=>{
  const out=r.output||{};
  if(out.materialId && !base.MATERIALS.some(m=>m.id===out.materialId)){
    base.MATERIALS.push({id:out.materialId,name:out.name,cat:'processed',rarity:'common',price:1,weight:.1,roles:['processed','component'],tags:['crafting','resource']});
  }
});

function inventory(){const c=global.currentCharacter||global.currentChar;return c&&c.inventory?c.inventory:null;}
function quantity(id){const inv=inventory();if(!inv)return 0;let total=0;Object.values(inv).forEach(list=>(list||[]).forEach(i=>{if(i.materialId===id||i.craftMaterialId===id)total+=num(i.count,0);}));return total;}
function process(id,options){
  options=options||{};
  const recipe=RESOURCE_PROCESSING.find(r=>r.id===id);
  if(!recipe)return{ok:false,error:'Рецепт переработки не найден'};
  const char=global.currentCharacter||global.currentChar;
  if(!char)return{ok:false,error:'Нет активного персонажа'};
  const have=quantity(Object.keys(recipe.materials)[0]);
  if(have<1)return{ok:false,error:'Недостаточно сырья',have:have};
  if(options.dryRun)return{ok:true,dryRun:true,recipe:recipe,have:have};
  const result=prof.craft(recipe.id,options);
  if(result && result.ok && result.item){result.item.resourceType='processed';result.item.resourceUnit=recipe.output.resourceUnit;result.item.resourceInput=Object.keys(recipe.materials)[0];}
  return result;
}

const API={VERSION:'43.0.0',RESOURCE_YIELDS,RESOURCE_PROCESSING,normalizeYield,patchLootResult,quantity,process};
global.DND_RESOURCE_PROCESSING_V43=API;
global.dndProcessResourceV43=process;
})(window);
