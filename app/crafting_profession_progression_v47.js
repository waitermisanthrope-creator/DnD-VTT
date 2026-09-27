/**
 * Crafting Profession Progression v47.1: отдельный авторский ХБ-слой навыка профессий.
 * Как работает: расширяет DND_CRAFT_PROFESSIONS_V38, хранит у персонажа список профессий
 * с уровнем/XP, открывает рецепты по уровню профессии, добавляет бонус к проверкам крафта
 * и метаданные качества к созданным предметам. Профессии необязательны: персонаж может
 * быть создан без них и позже обучиться новой профессии через API/UI.
 * Основные переменные/API: DND_CRAFT_PROFESSION_PROGRESS, PROFESSIONS, LEVELS,
 * ensureCharacterProfessions(), learnProfession(), addXP(), getProfile(), canCraftRecipe(),
 * getAvailableRecipes(), render(), renderCharacterCreation(). Файл не изменяет Wallpapers.js/Ambiences.js.
 * Это авторский ХБ-модуль и не является обязательной частью базовых правил D&D 5e.
 */
(function(global){'use strict';
var base=global.DND_CRAFT_PROFESSIONS_V38;
if(!base)return;

var PROFESSIONS=base.PROFESSIONS||{};
var LEVELS=[
  {level:1,name:'Ученик',xp:0,checkBonus:0,qualityBonus:0,unlockRank:1,note:'Базовое владение профессией.'},
  {level:2,name:'Подмастерье',xp:100,checkBonus:1,qualityBonus:1,unlockRank:2,note:'+1 к проверкам; открываются рецепты 2 ранга.'},
  {level:3,name:'Мастер',xp:300,checkBonus:2,qualityBonus:1,unlockRank:3,note:'+2 к проверкам; открываются рецепты 3 ранга.'},
  {level:4,name:'Эксперт',xp:600,checkBonus:3,qualityBonus:2,unlockRank:4,note:'+3 к проверкам; открываются рецепты 4 ранга.'},
  {level:5,name:'Великий мастер',xp:1000,checkBonus:4,qualityBonus:3,unlockRank:5,note:'+4 к проверкам; открываются рецепты 5 ранга.'}
];

/* V47.1: специализации профессий. Это ХБ-ветки, выбираемые на 3 уровне.
 * Каждая ветка имеет свои теги рецептов, бонусы и второй порог развития на 5 уровне.
 * Рецепты без specialtyTags остаются общими для профессии. */
var SPECIALIZATIONS={
  smith:{
    weapons:{name:'Оружейник',desc:'Оружие, клинки, наконечники и боевые металлические детали.',tags:['weapon','metal_weapon'],checkBonus:1,qualityBonus:1},
    armorer:{name:'Бронник',desc:'Доспехи, щиты, металлические элементы защиты и крепления.',tags:['armor','shield','metal_armor'],checkBonus:1,qualityBonus:1},
    metalworker:{name:'Металлообработчик',desc:'Инструменты, крепёж, детали, посуда и универсальные металлические изделия.',tags:['metalwork','component'],checkBonus:1,qualityBonus:1}
  },
  leatherworker:{
    armor:{name:'Бронник-кожевник',desc:'Лёгкая броня, защитные накладки и кожаные компоненты.',tags:['armor','leather_armor'],checkBonus:1,qualityBonus:1},
    saddler:{name:'Шорник',desc:'Сёдла, упряжь, вьючное и ездовой снаряжение.',tags:['mount','saddle','travel'],checkBonus:1,qualityBonus:1},
    gear:{name:'Мастер снаряжения',desc:'Сумки, ремни, ножны, подсумки и походное снаряжение.',tags:['gear','travel','container'],checkBonus:1,qualityBonus:1}
  },
  woodcarver:{
    bowyer:{name:'Лучник-мастер',desc:'Луки, арбалетные детали, стрелы и древковое оружие.',tags:['bow','ranged','shaft'],checkBonus:1,qualityBonus:1},
    fletcher:{name:'Стрелочник',desc:'Стрелы, болты, наконечники и боеприпасы.',tags:['ammunition','arrow','bolt'],checkBonus:1,qualityBonus:1},
    finecarver:{name:'Тонкий резчик',desc:'Резьба, рукояти, декоративные и точные деревянные детали.',tags:['finewood','component','decorative'],checkBonus:1,qualityBonus:1}
  },
  carpenter:{
    shieldmaker:{name:'Щитовик',desc:'Щиты, каркасы и защитные деревянные конструкции.',tags:['shield','armor','frame'],checkBonus:1,qualityBonus:1},
    builder:{name:'Строитель',desc:'Ящики, мебель, конструкции и крупные деревянные изделия.',tags:['structure','furniture','container'],checkBonus:1,qualityBonus:1},
    siege:{name:'Осадный мастер',desc:'Крупные механизмы, укрепления и осадные детали.',tags:['siege','structure','mechanism'],checkBonus:1,qualityBonus:1}
  },
  alchemist:{
    elixirs:{name:'Эликсирист',desc:'Зелья, эликсиры, усилители и лечебные составы.',tags:['potion','elixir','healing'],checkBonus:1,qualityBonus:1},
    toxins:{name:'Токсиколог',desc:'Яды, противоядия и опасные составы.',tags:['poison','antidote','toxin'],checkBonus:1,qualityBonus:1},
    reagents:{name:'Реагентист',desc:'Катализаторы, реагенты, растворители и алхимические основы.',tags:['reagent','catalyst','processing'],checkBonus:1,qualityBonus:1}
  },
  jeweler:{
    gems:{name:'Геммолог',desc:'Огранка и подготовка драгоценных камней.',tags:['gem','cutting'],checkBonus:1,qualityBonus:1},
    enchant:{name:'Ювелир-арканист',desc:'Оправы, фокусирующие украшения и магические компоненты.',tags:['focus','arcane','component'],checkBonus:1,qualityBonus:1},
    adornment:{name:'Мастер украшений',desc:'Кольца, амулеты, броши и декоративные изделия.',tags:['jewelry','adornment'],checkBonus:1,qualityBonus:1}
  },
  weaver:{
    clothing:{name:'Портной',desc:'Одежда, плащи, подкладки и специализированные наряды.',tags:['clothing','garment'],checkBonus:1,qualityBonus:1},
    rope:{name:'Канатный мастер',desc:'Верёвки, канаты, сети и походные текстильные изделия.',tags:['rope','net','travel'],checkBonus:1,qualityBonus:1},
    textile:{name:'Текстильщик',desc:'Ткань, тонкие полотна, мешки и технический текстиль.',tags:['textile','fabric','container'],checkBonus:1,qualityBonus:1}
  },
  glassblower:{
    vials:{name:'Флаконщик',desc:'Флаконы, колбы, сосуды и алхимическая тара.',tags:['vial','container','alchemy'],checkBonus:1,qualityBonus:1},
    optics:{name:'Оптик',desc:'Линзы, очки и точные стеклянные детали.',tags:['lens','optics','fineglass'],checkBonus:1,qualityBonus:1},
    glasswork:{name:'Мастер стекла',desc:'Общее художественное и техническое стекло.',tags:['glass','decorative'],checkBonus:1,qualityBonus:1}
  },
  potter:{
    vessels:{name:'Мастер сосудов',desc:'Сосуды, горшки, фляги и контейнеры.',tags:['container','vessel'],checkBonus:1,qualityBonus:1},
    kiln:{name:'Печник',desc:'Тигли, печные детали и жаростойкая керамика.',tags:['kiln','crucible','heat'],checkBonus:1,qualityBonus:1},
    ceramic:{name:'Керамист',desc:'Тонкая керамика, глазурь и декоративные изделия.',tags:['ceramic','decorative','glaze'],checkBonus:1,qualityBonus:1}
  },
  tinker:{
    locks:{name:'Замочник',desc:'Замки, ключи и защитные механизмы.',tags:['lock','security'],checkBonus:1,qualityBonus:1},
    traps:{name:'Механик ловушек',desc:'Ловушки, спусковые механизмы и скрытые устройства.',tags:['trap','mechanism'],checkBonus:1,qualityBonus:1},
    devices:{name:'Изобретатель',desc:'Мелкие механизмы, устройства и сложные компоненты.',tags:['device','mechanism','component'],checkBonus:1,qualityBonus:1}
  },
  herbalist:{
    medicine:{name:'Целитель-травник',desc:'Лекарственные сборы, мази и восстановительные средства.',tags:['healing','medicine','herbal'],checkBonus:1,qualityBonus:1},
    poison:{name:'Ядовед',desc:'Ядовитые растения и их безопасная обработка.',tags:['poison','toxin','herbal'],checkBonus:1,qualityBonus:1},
    foraging:{name:'Собиратель',desc:'Редкие растения, сушёные компоненты и сбор ресурсов.',tags:['gathering','herbal','resource'],checkBonus:1,qualityBonus:1}
  },
  calligrapher:{
    scribe:{name:'Писец',desc:'Книги, документы и аккуратные рукописи.',tags:['book','document','writing'],checkBonus:1,qualityBonus:1},
    scrolls:{name:'Мастер свитков',desc:'Свитки, магические записи и подготовка пергамента.',tags:['scroll','arcane','writing'],checkBonus:1,qualityBonus:1},
    maps:{name:'Картограф-писец',desc:'Планы, схемы и техническая документация.',tags:['map','plan','document'],checkBonus:1,qualityBonus:1}
  }
};
var GENERIC_SPECIALTIES={
  brewer:['distiller','fermenter','vintner'],cook:['rationer','chef','preserver'],cobbler:['boots','travel','fine'],cartographer:['maps','dungeon','navigation'],mason:['stonework','construction','sculpture'],painter:['heraldry','camouflage','art'],disguiser:['theater','infiltration','identity'],forger:['documents','seals','counterfeit']
};
function ensureSpecializationCatalog(){Object.keys(GENERIC_SPECIALTIES).forEach(function(pid){if(SPECIALIZATIONS[pid])return;SPECIALIZATIONS[pid]={};GENERIC_SPECIALTIES[pid].forEach(function(id){SPECIALIZATIONS[pid][id]={name:id.charAt(0).toUpperCase()+id.slice(1),desc:'Специализация профессии «'+professionLabelSafe(pid)+'».',tags:[id],checkBonus:1,qualityBonus:1};});});}
function professionLabelSafe(id){return PROFESSIONS[id]&&PROFESSIONS[id].name||id;}
ensureSpecializationCatalog();

var SOURCE_TAG='Авторское ХБ: профессии и развитие ремесленного мастерства.';

function hero(){return global.currentChar||global.currentCharacter||null;}
function save(){if(typeof global.autoSaveCurrentCharacter==='function')global.autoSaveCurrentCharacter();else if(typeof global.saveCharacter==='function')global.saveCharacter();}
function norm(v){return String(v||'').trim().toLowerCase();}
function clone(v){return JSON.parse(JSON.stringify(v));}
function professionIds(){return Object.keys(PROFESSIONS);}
function toolToProfession(tool){
  var ids=professionIds();
  for(var i=0;i<ids.length;i++)if((PROFESSIONS[ids[i]].tools||[]).indexOf(tool)!==-1)return ids[i];
  return null;
}
function professionLabel(id){return PROFESSIONS[id]&&PROFESSIONS[id].name||id;}
function levelDef(level){return LEVELS[Math.max(1,Math.min(5,Number(level)||1))-1];}
function ensureCharacterProfessions(c){
  c=c||hero();if(!c)return null;
  if(!c.craftingProfessions||typeof c.craftingProfessions!=='object'||Array.isArray(c.craftingProfessions))c.craftingProfessions={};
  Object.keys(c.craftingProfessions).forEach(function(id){
    var p=c.craftingProfessions[id];
    if(!PROFESSIONS[id]||!p||typeof p!=='object'){delete c.craftingProfessions[id];return;}
    p.level=Math.max(1,Math.min(5,Number(p.level)||1));p.xp=Math.max(0,Number(p.xp)||0);
    p.name=professionLabel(id);p.updatedAt=p.updatedAt||Date.now();p.specialization=p.specialization||null;p.masterSpecialization=p.masterSpecialization||null;p.pendingSpecialization=Number(p.level)>=3&&!p.specialization;
  });
  return c.craftingProfessions;
}
function getProfession(c,id){var ps=ensureCharacterProfessions(c);return ps&&ps[id]||null;}
function learnProfession(id,options){
  var c=hero();if(!c)return{ok:false,error:'Нет активного персонажа'};
  if(!PROFESSIONS[id])return{ok:false,error:'Неизвестная профессия'};
  var ps=ensureCharacterProfessions(c),existing=ps[id];
  if(existing)return{ok:false,error:'Профессия уже изучена',profession:clone(existing)};
  var requireTool=!(options&&options.ignoreToolRequirement);
  var tools=PROFESSIONS[id].tools||[];
  if(requireTool&&typeof base.hasTool==='function'&&tools.length&&!tools.some(function(t){return base.hasTool(t);})){
    return{ok:false,error:'Для обучения нужна хотя бы одна соответствующая группа инструментов.',missingTools:tools.map(function(t){return base.TOOLS[t]&&base.TOOLS[t].name||t;})};
  }
  ps[id]={level:1,xp:0,name:professionLabel(id),learnedAt:Date.now(),source:(options&&options.source)||'обучение'};
  save();render();return{ok:true,profession:clone(ps[id]),message:'Изучена профессия «'+professionLabel(id)+'». '+SOURCE_TAG};
}

function specializationList(id){return Object.keys(SPECIALIZATIONS[id]||{}).map(function(key){return Object.assign({id:key},SPECIALIZATIONS[id][key]);});}
function chooseSpecialization(id,specId,master){
  var c=hero(),p=getProfession(c,id);if(!p)return{ok:false,error:'Профессия не изучена'};
  var def=(SPECIALIZATIONS[id]||{})[specId];if(!def)return{ok:false,error:'Неизвестная специализация'};
  if(!master && p.level<3)return{ok:false,error:'Специализация открывается на 3 уровне.'};
  if(master && p.level<5)return{ok:false,error:'Мастерская специализация открывается на 5 уровне.'};
  if(master){if(!p.specialization)return{ok:false,error:'Сначала выберите основную специализацию.'};if(p.specialization===specId)return{ok:false,error:'Второй путь должен отличаться от основной специализации.'};p.masterSpecialization=specId;}
  else {p.specialization=specId;p.pendingSpecialization=false;}
  p.updatedAt=Date.now();save();render();return{ok:true,profession:clone(p),specialization:clone(def),master:!!master};
}
function getSpecialization(id,p){p=p||getProfession(null,id);if(!p)return null;return p.specialization?Object.assign({id:p.specialization},(SPECIALIZATIONS[id]||{})[p.specialization]||{}):null;}
function getSpecializationBonus(id,p){p=p||getProfession(null,id);if(!p)return{checkBonus:0,qualityBonus:0,sources:[]};var a=getSpecialization(id,p),b=p.masterSpecialization&&((SPECIALIZATIONS[id]||{})[p.masterSpecialization]);return{checkBonus:(a?Number(a.checkBonus)||0:0)+(b?Number(b.checkBonus)||0:0),qualityBonus:(a?Number(a.qualityBonus)||0:0)+(b?Number(b.qualityBonus)||0:0),sources:[a&&a.name,b&&b.name].filter(Boolean)};}
function recipeTags(recipe){var tags=[];(recipe&&recipe.tags||[]).forEach(function(t){if(tags.indexOf(t)<0)tags.push(t);});var cat=String(recipe&&recipe.category||'');if(cat==='weapons')tags.push('weapon');if(cat==='armor')tags.push('armor');return tags.filter(function(t,i,a){return a.indexOf(t)===i;});}
function specialtyMatchesRecipe(id,p,recipe){if(!p||!p.specialization)return true;var def=(SPECIALIZATIONS[id]||{})[p.specialization];if(!def||!def.tags||!def.tags.length)return true;if(!recipe.specialtyTags||!recipe.specialtyTags.length)return true;return def.tags.some(function(t){return recipe.specialtyTags.indexOf(t)>=0;});}

function xpForNext(level){var next=LEVELS[Number(level)||1];return next?next.xp:null;}
function addXP(id,amount,reason){
  var c=hero(),ps=ensureCharacterProfessions(c);if(!c||!ps||!ps[id])return{ok:false,error:'Профессия не изучена'};
  var p=ps[id],oldLevel=p.level;amount=Math.max(0,Number(amount)||0);p.xp=Math.round((p.xp+amount)*100)/100;
  while(p.level<5&&p.xp>=LEVELS[p.level].xp)p.level++;
  p.updatedAt=Date.now();p.lastGain={amount:amount,reason:reason||'крафт',at:Date.now()};
  save();render();
  return{ok:true,profession:clone(p),leveledUp:p.level>oldLevel,oldLevel:oldLevel,level:p.level,amount:amount};
}
function professionXPReward(recipe,result){
  var dc=Number(recipe&&recipe.dc)||10,quality=result&&result.quality||result&&result.outcome;
  var reward=Math.max(5,Math.round(dc*2));
  if(quality==='fine')reward+=10;if(quality==='exceptional')reward+=20;
  return reward;
}
function recipeRequirements(recipe){
  var tools=(recipe&&recipe.tools)||[], req={};
  tools.forEach(function(t){var pid=toolToProfession(t);if(pid)req[pid]=Math.max(req[pid]||1,Number(recipe.professionLevel)||rankForRecipe(recipe));});
  return req;
}
function rankForRecipe(recipe){
  if(Number(recipe&&recipe.professionLevel)>0)return Math.max(1,Math.min(5,Number(recipe.professionLevel)));
  var dc=Number(recipe&&recipe.dc)||10;
  if(dc<=10)return 1;if(dc<=13)return 2;if(dc<=16)return 3;if(dc<=19)return 4;return 5;
}
function canCraftRecipe(recipe,c){
  c=c||hero();if(!recipe)return{ok:false,error:'Рецепт не найден'};
  var req=recipeRequirements(recipe),ps=ensureCharacterProfessions(c),missing=[];
  Object.keys(req).forEach(function(id){var required=req[id],p=ps&&ps[id];if(required<=1)return;if(!p||p.level<required)missing.push({profession:id,name:professionLabel(id),requiredLevel:required,currentLevel:p?p.level:0});if(p&&p.level>=3&&!p.specialization)missing.push({profession:id,name:professionLabel(id),requiredSpecialization:true,currentLevel:p.level});else if(p&&p.level>=3&&!specialtyMatchesRecipe(id,p,recipe)&&recipe.specialtyTags&&recipe.specialtyTags.length)missing.push({profession:id,name:professionLabel(id),requiredSpecialization:true,specialization:p.specialization});});
  return{ok:missing.length===0,requirements:req,missing:missing};
}
function getAvailableRecipes(c){
  c=c||hero();var list=base.ALL_RECIPES||[];
  return list.filter(function(r){return canCraftRecipe(r,c).ok;});
}
function getLockedRecipes(c){
  c=c||hero();var list=base.ALL_RECIPES||[];
  return list.map(function(r){return{recipe:r,access:canCraftRecipe(r,c)};}).filter(function(x){return!x.access.ok;});
}
function getProfile(c,tools){
  c=c||hero();var ps=ensureCharacterProfessions(c),ids=[];var selected=Array.isArray(tools)?tools:(tools?[tools]:[]);
  selected.forEach(function(t){var pid=toolToProfession(t);if(pid&&ids.indexOf(pid)<0)ids.push(pid);});
  var bonus=0,quality=0,sources=[];
  ids.forEach(function(id){var p=ps&&ps[id];if(p){var def=levelDef(p.level),sb=getSpecializationBonus(id,p);bonus=Math.max(bonus,def.checkBonus+sb.checkBonus);quality=Math.max(quality,def.qualityBonus+sb.qualityBonus);sources.push({id:id,name:professionLabel(id),level:p.level,levelName:def.name,xp:p.xp,checkBonus:def.checkBonus+sb.checkBonus,specialization:p.specialization||null,masterSpecialization:p.masterSpecialization||null,specializationBonus:sb.checkBonus});}});
  return{bonus:bonus,qualityBonus:quality,professionIds:ids,sources:sources};
}
function describeProfession(id){
  var p=PROFESSIONS[id];if(!p)return null;
  return{id:id,name:p.name,tools:(p.tools||[]).slice(),desc:p.desc||'',levels:clone(LEVELS),specializations:specializationList(id),homebrew:true,note:SOURCE_TAG};
}
function craftAccessAndRewards(recipe,result){
  var c=hero(),access=canCraftRecipe(recipe,c),profile=getProfile(c,recipe&&recipe.tools);
  if(!access.ok)return{access:access,profile:profile,rewards:[]};
  var rewards=[];var tools=(recipe&&recipe.tools)||[];var ids=[];tools.forEach(function(t){var pid=toolToProfession(t);if(pid&&ids.indexOf(pid)<0)ids.push(pid);});
  var xp=professionXPReward(recipe,result);
  ids.forEach(function(id){rewards.push({profession:id,xp:xp,level:(getProfession(c,id)||{}).level||0});});
  return{access:access,profile:profile,rewards:rewards};
}
function recordCraftResult(recipe,result){
  if(!recipe||!result||!result.ok)return{ok:false,rewards:[]};
  var data=craftAccessAndRewards(recipe,result),out=[];
  data.rewards.forEach(function(r){var gained=addXP(r.profession,r.xp,'крафт: '+recipe.name);if(gained.ok)out.push(gained);});
  return{ok:true,rewards:out,profile:data.profile};
}
function decorateItem(item,recipe,result){
  var c=hero(),profile=getProfile(c,recipe&&recipe.tools),access=canCraftRecipe(recipe,c);
  item=item||{};item.craftHomebrewProfession=true;item.craftProfessionLevels={};
  Object.keys(access.requirements||{}).forEach(function(id){var p=getProfession(c,id);item.craftProfessionLevels[id]=p?p.level:0;});
  item.craftProfessionBonus=profile.bonus;item.craftProfessionQualityBonus=profile.qualityBonus;item.craftProfessionSources=clone(profile.sources);item.craftProfessionSourceTag=SOURCE_TAG;item.craftSpecializations=clone(profile.sources.map(function(s){return{id:s.id,specialization:s.specialization,masterSpecialization:s.masterSpecialization};}));
  if(profile.qualityBonus>0){item.craftMasterworkBonus=profile.qualityBonus;item.craftDurabilityBonus=profile.qualityBonus;item.craftQualityNote='Бонус мастерства профессии: +'+profile.qualityBonus+' к качеству/надёжности; точный эффект определяется типом предмета.';}
  return item;
}
function renderCharacterCreation(){
  var host=document.getElementById('cc_professionBox');if(!host)return;
  var ids=professionIds();
  host.innerHTML='<div style="padding:9px;background:#171717;border:1px solid #5b4a2c;border-radius:7px"><b style="color:#d7b86e">🧰 Профессия (авторское ХБ)</b><div style="font-size:.78em;color:#aaa;margin:4px 0 7px">Необязательно. Используется для авторского модуля крафта. Можно оставить «Без профессии» и обучиться позже.</div><select id="cc_profession" style="width:100%;padding:9px;background:#252525;color:#fff;border:1px solid #444;border-radius:4px"><option value="">— Без профессии —</option>'+ids.map(function(id){return'<option value="'+id+'">'+professionLabel(id)+'</option>';}).join('')+'</select><div id="cc_professionDesc" style="font-size:.75em;color:#aaa;margin-top:6px"></div></div>';
  var sel=document.getElementById('cc_profession'),desc=document.getElementById('cc_professionDesc');
  function update(){var id=sel.value;if(!id){desc.textContent='Профессия не выбрана. Это поле полностью необязательно.';return;}var d=describeProfession(id);desc.textContent=d.name+' — '+d.desc+' Стартовый ранг: Ученик.';}
  sel.onchange=update;update();
}
function initCreatedCharacter(c,professionId){
  if(!c)return;c.craftingProfessions={};if(professionId&&PROFESSIONS[professionId])c.craftingProfessions[professionId]={level:1,xp:0,name:professionLabel(professionId),learnedAt:Date.now(),source:'создание персонажа'};
  c.craftingProfessionHomebrew=true;c.craftingProfessionNote=SOURCE_TAG;
}
function render(){
  var host=document.getElementById('craftingV38Tools');if(!host)return;
  var c=hero(),ps=ensureCharacterProfessions(c)||{},ids=professionIds();
  var block=document.getElementById('craftingV47Progress');
  if(!block){block=document.createElement('div');block.id='craftingV47Progress';host.parentNode.insertBefore(block,host);}
  var learned=Object.keys(ps||{});
  var cards=(learned.length?learned:[]).map(function(id){
    var p=ps[id],d=levelDef(p.level),next=xpForNext(p.level),sp=getSpecialization(id,p),sb=getSpecializationBonus(id,p),specs=specializationList(id);
    var specHtml='<div style="margin-top:5px;color:#c9b98c">★ Основная специализация: '+(sp?sp.name:'не выбрана')+' · бонус ветки +'+sb.checkBonus+'</div>';
    if(p.level>=3&&!p.specialization) specHtml+='<select onchange="DND_CRAFT_PROFESSION_PROGRESS.chooseSpecialization(\''+id+'\',this.value)" style="width:100%;margin-top:5px;padding:6px;background:#222;color:#fff"><option value="">Выберите специализацию</option>'+specs.map(function(x){return'<option value="'+x.id+'">'+x.name+' — '+x.desc+'</option>';}).join('')+'</select>';
    if(p.level>=5&&p.specialization){
      var master=p.masterSpecialization&&((SPECIALIZATIONS[id]||{})[p.masterSpecialization]);
      specHtml+='<div style="margin-top:4px;color:#b9c7d0">◆ Мастерская специализация: '+(master?master.name:'не выбрана')+'</div>';
      if(!master) specHtml+='<select onchange="DND_CRAFT_PROFESSION_PROGRESS.chooseSpecialization(\''+id+'\',this.value,true)" style="width:100%;margin-top:5px;padding:6px;background:#222;color:#fff"><option value="">Выберите второй путь мастерства</option>'+specs.filter(function(x){return x.id!==p.specialization;}).map(function(x){return'<option value="'+x.id+'">'+x.name+' — второй путь</option>';}).join('')+'</select>';
    }
    return '<div style="padding:6px;margin:4px 0;background:#211f1b;border-radius:5px"><b>'+professionLabel(id)+'</b> · '+d.name+' · уровень '+p.level+' · XP '+p.xp+(next?' / '+next:'')+' · бонус проверки +'+(d.checkBonus+sb.checkBonus)+'<br><span style="color:#aaa">'+(PROFESSIONS[id].desc||'')+'</span>'+specHtml+'</div>';
  }).join('');
  block.innerHTML='<div style="margin:6px 0 9px;padding:8px;background:#191714;border:1px solid #594a31;border-radius:7px"><b style="color:#d7b86e">📜 Профессии и мастерство v47.1</b><div style="font-size:.72em;color:#999;margin:3px 0 7px">'+SOURCE_TAG+' На 3 уровне выбирается специализация; на 5 уровне можно открыть второй путь мастерства.</div>'+(cards||'<span style="color:#777">Нет изученных профессий.</span>')+'<details style="margin-top:6px"><summary>Обучиться новой профессии</summary><div style="margin-top:6px;display:grid;grid-template-columns:1fr auto;gap:5px"><select id="craftV47LearnSelect" style="padding:7px;background:#222;color:#fff;border:1px solid #444"><option value="">Выберите профессию</option>'+ids.filter(function(id){return!ps[id];}).map(function(id){return'<option value="'+id+'">'+professionLabel(id)+'</option>';}).join('')+'</select><button class="btn-action" onclick="DND_CRAFT_PROFESSION_PROGRESS.learnFromUI()">Обучиться</button></div><div style="font-size:.68em;color:#888;margin-top:4px">Для обучения по умолчанию нужен соответствующий инструмент. Мастер может использовать API с ignoreToolRequirement=true.</div></details></div>';
}

function learnFromUI(){var sel=document.getElementById('craftV47LearnSelect');if(!sel||!sel.value)return;var r=learnProfession(sel.value);var el=document.getElementById('craftingV38Result');if(el)el.innerHTML='<div style="padding:7px">'+(r.ok?'✅ '+r.message:'❌ '+r.error)+'</div>';}
function patchCraftingEngine(){
  var originalCraft=base.craft;
  if(typeof originalCraft!=='function'||originalCraft.__v47Wrapped)return;
  function wrapped(id,options){
    var recipe=(base.ALL_RECIPES||[]).find(function(r){return r.id===id;});
    var access=canCraftRecipe(recipe,hero());
    if(!access.ok&&!((options||{}).ignoreProfessionRequirement))return{ok:false,error:'Профессия недостаточного уровня',professionRequirements:access.missing};
    var before=hero();var result=originalCraft(id,options);
    if(result&&result.ok&&result.item){decorateItem(result.item,recipe,result);recordCraftResult(recipe,result);}
    else if(result&&result.processing&&result.ok)recordCraftResult(recipe,result);
    return result;
  }
  wrapped.__v47Wrapped=true;base.craft=wrapped;global.dndCraftProfessionV38=wrapped;
}
function patchProfile(){
  var original=base.craftingProfile;
  if(typeof original!=='function'||original.__v47Wrapped)return;
  function wrapped(c,tools){var p=original(c,tools),q=getProfile(c,tools);p.totalBonus=(Number(p.totalBonus)||0)+q.bonus;p.professionBonus=q.bonus;p.professionQualityBonus=q.qualityBonus;p.professionSources=q.sources;p.notes=p.notes||[];q.sources.forEach(function(s){var note='Профессия «'+s.name+'»: уровень '+s.level+' ('+s.levelName+'), +'+s.checkBonus+' к проверке.';if(p.notes.indexOf(note)<0)p.notes.push(note);});return p;}
  wrapped.__v47Wrapped=true;base.craftingProfile=wrapped;base.craftingModifier=function(tools){return wrapped(hero(),tools);};
}
function autoSpecialtyTags(r){
  if(r.specialtyTags)return r.specialtyTags;
  var tags=[], name=norm(r.name), tools=r.tools||[];
  if(r.category==='weapons')tags.push('weapon');
  if(r.category==='armor')tags.push('armor');
  if(tools.indexOf('smith')>=0){if(r.category==='weapons')tags.push('metal_weapon');else if(r.category==='armor')tags.push('metal_armor','shield');else tags.push('metalwork','component');}
  if(tools.indexOf('leatherworker')>=0){if(r.category==='armor')tags.push('leather_armor');else if(/седл|упряж|вьюч|лошад|horse|saddle/i.test(name))tags.push('mount','saddle');else tags.push('gear','travel','container');}
  if(tools.indexOf('woodcarver')>=0){if(/лук|арбалет|bow|crossbow/i.test(name))tags.push('bow','ranged');else if(/стрел|болт|arrow|bolt/i.test(name))tags.push('ammunition','arrow','bolt');else if(r.category==='weapons')tags.push('shaft');else tags.push('finewood','component');}
  if(tools.indexOf('carpenter')>=0){if(/щит|buckler|shield/i.test(name))tags.push('shield','frame');else tags.push('structure','container');}
  if(tools.indexOf('alchemist')>=0){if(/яд|poison|toxin|antidote/i.test(name))tags.push('poison','toxin');else if(/зель|элик|potion|elixir/i.test(name))tags.push('potion','elixir');else tags.push('reagent','processing');}
  if(tools.indexOf('jeweler')>=0){if(/камн|gem|кристалл|crystal/i.test(name))tags.push('gem','cutting');else tags.push('jewelry','adornment');}
  if(tools.indexOf('weaver')>=0){if(/канат|rope|верёв/i.test(name))tags.push('rope','travel');else tags.push('textile','fabric');}
  if(tools.indexOf('glassblower')>=0){if(/флакон|колб|vial|bottle/i.test(name))tags.push('vial','container','alchemy');else if(/линз|lens|optic/i.test(name))tags.push('lens','optics');else tags.push('glass');}
  if(tools.indexOf('potter')>=0){if(/тигл|crucible|печ/i.test(name))tags.push('kiln','crucible','heat');else tags.push('container','vessel','ceramic');}
  if(tools.indexOf('tinker')>=0){if(/замок|ключ|lock|key/i.test(name))tags.push('lock','security');else if(/ловуш|trap/i.test(name))tags.push('trap','mechanism');else tags.push('device','mechanism','component');}
  r.specialtyTags=tags.filter(function(t,i,a){return a.indexOf(t)===i;});return r.specialtyTags;
}
function patchRecipes(){(base.ALL_RECIPES||[]).forEach(function(r){if(!r.professionLevel)r.professionLevel=rankForRecipe(r);if(!r.professionRequirements)r.professionRequirements=recipeRequirements(r);autoSpecialtyTags(r);});}

function patchRender(){
  function wrapped(){
    var el=document.getElementById('craftingV38Recipes');if(!el)return;
    var filter=document.getElementById('craftingV38Filter')&&document.getElementById('craftingV38Filter').value||'';
    var c=hero();
    var rows=(base.ALL_RECIPES||[]).filter(function(r){return!filter||r.tools.includes(filter);});
    el.innerHTML=rows.map(function(r){
      var access=canCraftRecipe(r,c),req=r.professionRequirements||recipeRequirements(r);
      var reqText=Object.keys(req).map(function(id){return professionLabel(id)+' '+req[id];}).join(' + ')||'—';
      var mats=Object.entries(r.materials||{}).map(function(x){return x[0]+' ×'+x[1];}).join(' · ');
      var locked=!access.ok;
      var action=locked?'<button class="btn-action" style="width:100%;margin-top:4px;opacity:.65" disabled>🔒 Требуется мастерство</button>':'<button class="btn-action" style="width:100%;margin-top:4px" onclick="DND_CRAFT_PROFESSIONS_V47_CRAFT(\''+r.id+'\')">Создать</button>';
      return '<div style="padding:7px;margin-bottom:5px;background:#211f1b;border:1px solid '+(locked?'#493d2b':'#39342b')+';border-radius:6px;font-size:.74em"><div style="display:flex;justify-content:space-between;gap:5px"><b>'+r.name+'</b><span>DC '+r.dc+' · '+r.time+'ч</span></div><div style="color:#aaa">'+mats+'</div><div style="color:#c9b98c">🔧 '+r.tools.map(function(t){return base.TOOLS[t]&&base.TOOLS[t].name||t;}).join(' + ')+'</div><div style="color:#9d8b68;margin-top:3px">📜 Профессии: '+reqText+'</div>'+(locked?'<div style="color:#c98b72;margin-top:3px">'+access.missing.map(function(m){return'Нужен '+m.name+' '+m.requiredLevel+' (сейчас '+m.currentLevel+')';}).join(' · ')+'</div>':'')+action+'</div>';
    }).join('')||'<div style="color:#888;padding:8px">Нет рецептов.</div>';
  }
  wrapped.__v47Wrapped=true;base.renderRecipes=wrapped;
}
function craftFromUI(id){var result=base.craft(id),el=document.getElementById('craftingV38Result');if(el)el.innerHTML=result&&result.ok?'<div style="padding:7px;background:#1d2a1f;border:1px solid #4b7052;border-radius:6px">✅ '+(result.item&&result.item.name||'Готово')+' · профессия учтена</div>':'<div style="padding:7px;background:#321b1b;border:1px solid #7f3b3b;border-radius:6px">❌ '+(result&&result.error||'Не удалось создать предмет')+'</div>';if(typeof base.renderTools==='function')base.renderTools();wrappedRefresh();}
function wrappedRefresh(){if(typeof base.renderRecipes==='function')base.renderRecipes();}

function init(){
  patchRecipes();patchCraftingEngine();patchRender();
  setTimeout(function(){render();renderCharacterCreation();if(typeof base.renderTools==='function')base.renderTools();if(typeof base.renderRecipes==='function')base.renderRecipes();},350);
}
var API={VERSION:'47.0.0',SOURCE_TAG:SOURCE_TAG,PROFESSIONS:PROFESSIONS,LEVELS:clone(LEVELS),ensureCharacterProfessions:ensureCharacterProfessions,getProfession:getProfession,learnProfession:learnProfession,addXP:addXP,getProfile:getProfile,canCraftRecipe:canCraftRecipe,getAvailableRecipes:getAvailableRecipes,getLockedRecipes:getLockedRecipes,describeProfession:describeProfession,specializationList:specializationList,chooseSpecialization:chooseSpecialization,getSpecialization:getSpecialization,recordCraftResult:recordCraftResult,decorateItem:decorateItem,rankForRecipe:rankForRecipe,recipeRequirements:recipeRequirements,render:render,renderCharacterCreation:renderCharacterCreation,initCreatedCharacter:initCreatedCharacter,learnFromUI:learnFromUI};
global.DND_CRAFT_PROFESSION_PROGRESS=API;
global.DND_CRAFT_PROFESSIONS_V47=API;
global.DND_CRAFT_PROFESSIONS_V47_CRAFT=craftFromUI;global.DND_CRAFT_PROFESSION_PROGRESS.chooseSpecialization=chooseSpecialization;
init();
})(window);
