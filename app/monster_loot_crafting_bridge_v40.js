/**
 * monster_loot_crafting_bridge_v40.js (extended through v45)
 * ------------------------------------------------------------------
 * ЧТО ЭТО ЗА ФАЙЛ:
 * Связывает добычу существ из bestiary v39 с физически правдоподобными
 * контейнерами лута и с реальными рецептами ремесел v38.
 *
 * КАК РАБОТАЕТ:
 * - для каждого существа задаётся lootModel: pockets, carried, hoard,
 *   contents или none;
 * - естественные существа не получают случайные мечи/монеты из «карманов»;
 * - трофеи разделки получают craftMaterialId и становятся сырьём для крафта;
 * - добавляются рецепты, использующие конкретные части существ;
 * - generate()/collect() расширяются контейнерами без изменения старого API;
 * - мастерский лут остаётся свободным и может быть добавлен вручную.
 *
 * ОСНОВНЫЕ ПЕРЕМЕННЫЕ:
 * LOOT_MODELS, MATERIAL_BRIDGE, MONSTER_RECIPES,
 * DNDMonsterLoot.catalog, DND_CRAFT_PROFESSIONS_V38.ALL_RECIPES,
 * base.MATERIALS.
 *
 * V45 расширяет существующий registry; НЕ ИЗМЕНЯЕТ Wallpapers.js/Ambiences.js.
 * ------------------------------------------------------------------
 */
(function(global){'use strict';
  var loot=global.DNDMonsterLoot;
  var craft=global.DND_CRAFT_PROFESSIONS_V38;
  if(!loot||!craft)return;

  function clone(v){return JSON.parse(JSON.stringify(v));}
  function num(v,d){var n=Number(v);return Number.isFinite(n)?n:d;}
  function die(s){return Math.floor(Math.random()*Math.max(1,s))+1;}
  function count(v){if(Array.isArray(v)){var a=num(v[0],1),b=num(v[1],a);return die(Math.max(1,b-a+1))+a-1;}return Math.max(1,num(v,1));}
  function weighted(table){var total=(table||[]).reduce(function(s,x){return s+Math.max(0,num(x.weight,0));},0);if(total<=0)return null;var r=Math.random()*total;for(var i=0;i<table.length;i++){r-=Math.max(0,num(table[i].weight,0));if(r<0)return table[i];}return table[table.length-1];}
  function rollTable(rule,source){var out=[];if(!rule)return out;for(var i=0;i<num(rule.rolls,0);i++){var p=weighted(rule.table||[]);if(p){var item=clone(p.item||p);item.count=count(item.count||1);item.source=source;item.lootGenerated=true;out.push(item);}}return out;}

  var LOOT_MODELS={
    'Бандит':'pockets','Кобольд':'pockets','Бугбир':'pockets','Гнолл':'pockets',
    'Гарпия':'pockets','Гуль':'pockets','Вайт':'pockets',
    'Тролль':'carried','Мимик':'contents','Молодой дракон':'hoard',
    'Гигантский паук':'none','Лютый волк':'none','Бурый медведь':'none','Совомедведь':'none','Базилиск':'none','Мантикора':'none'
  };

  var MATERIAL_BRIDGE={
    'Гоблинская кожа':{id:'monster_goblin_hide',name:'Гоблинская кожа',cat:'hide',rarity:'common',tags:['hide','leather','goblin']},
    'Орочья кожа':{id:'monster_orc_hide',name:'Орочья кожа',cat:'hide',rarity:'common',tags:['hide','leather','orc']},
    'Волчья шкура':{id:'monster_wolf_hide',name:'Волчья шкура',cat:'hide',rarity:'common',tags:['hide','fur','leather','wolf']},
    'Шкура лютого волка':{id:'monster_direwolf_hide',name:'Шкура лютого волка',cat:'hide',rarity:'uncommon',tags:['hide','fur','leather','pristine-hide','wolf']},
    'Медвежья шкура':{id:'monster_bear_hide',name:'Медвежья шкура',cat:'hide',rarity:'common',tags:['hide','fur','leather','bear']},
    'Толстая шкура':{id:'monster_owlbear_hide',name:'Толстая шкура совомедведя',cat:'hide',rarity:'uncommon',tags:['hide','fur','leather','owlbear']},
    'Грубая шкура бугбира':{id:'monster_bugbear_hide',name:'Грубая шкура бугбира',cat:'hide',rarity:'common',tags:['hide','leather','bugbear']},
    'Гноллья шкура':{id:'monster_gnoll_hide',name:'Гноллья шкура',cat:'hide',rarity:'common',tags:['hide','leather','gnoll']},
    'Кобольдская чешуйчатая кожа':{id:'monster_kobold_scalehide',name:'Кобольдская чешуйчатая кожа',cat:'hide',rarity:'common',tags:['scale','hide','leather','kobold']},
    'Паучий шёлк':{id:'monster_spider_silk',name:'Паучий шёлк',cat:'fiber',rarity:'uncommon',tags:['silk','textile','alchemy']},
    'Перья совомедведя':{id:'monster_owlbear_feathers',name:'Перья совомедведя',cat:'fiber',rarity:'common',tags:['feather','fletching','textile']},
    'Перья гарпии':{id:'monster_harpy_feathers',name:'Перья гарпии',cat:'fiber',rarity:'common',tags:['feather','textile']},
    'Драконья чешуя':{id:'monster_dragon_scales',name:'Драконья чешуя',cat:'scale',rarity:'rare',tags:['scale','armor','dragon']},
    'Драконьи кости':{id:'monster_dragon_bones',name:'Драконьи кости',cat:'bone',rarity:'rare',tags:['bone','dragon','weapon']},
    'Драконья кровь':{id:'monster_dragon_blood',name:'Драконья кровь',cat:'reagent',rarity:'rare',tags:['blood','dragon','alchemy']},
    'Троллья шкура':{id:'monster_troll_hide',name:'Троллья шкура',cat:'hide',rarity:'rare',tags:['hide','leather','regeneration','troll']},
    'Троллья кровь':{id:'monster_troll_blood',name:'Троллья кровь',cat:'reagent',rarity:'rare',tags:['blood','regeneration','alchemy']},
    'Паучий хитин':{id:'monster_spider_chitin',name:'Паучий хитин',cat:'bone',rarity:'uncommon',tags:['chitin','armor']},
    'Базилискова чешуя':{id:'monster_basilisk_scale',name:'Базилискова чешуя',cat:'scale',rarity:'rare',tags:['scale','petrification']},
    'Мантикорьи шипы':{id:'monster_manticore_spines',name:'Мантикорьи шипы',cat:'bone',rarity:'rare',tags:['spine','weapon','poison']}
  };

  /*
   * V45 mass harvest-material registry.
   * WHAT: expands the existing MATERIAL_BRIDGE so every current bestiary harvest
   *       item can become a concrete material without creating a second loot engine.
   * HOW: each harvest name maps to a stable material ID, category, rarity and tags;
   *      the existing ensureMaterial() and harvest patching logic then attach it.
   * IMPORTANT: these are raw/harvest resources. Processing into leather, reagent,
   *             bone stock, silk, essence, etc. remains owned by resource_processing_v44.js.
   */
  var MASS_HARVEST_MATERIALS={
    'Бандитская кожа':{id:'monster_bandit_hide',name:'Бандитская кожа',cat:'hide',rarity:'common',tags:['hide','leather','humanoid']},
    'Малый рог':{id:'monster_kobold_horn',name:'Малый рог',cat:'horn',rarity:'common',tags:['horn','trophy','goblinoid']},
    'Крупный клык':{id:'monster_bugbear_fang',name:'Крупный клык',cat:'bone',rarity:'common',tags:['tooth','bone','trophy','goblinoid']},
    'Гнолльский зуб':{id:'monster_gnoll_tooth',name:'Гнолльский зуб',cat:'bone',rarity:'common',tags:['tooth','bone','trophy','gnoll']},
    'Гнолльское мясо':{id:'monster_gnoll_meat',name:'Гнолльское мясо',cat:'food',rarity:'common',tags:['meat','food','gnoll']},
    'Паучий яд':{id:'monster_spider_venom',name:'Паучий яд',cat:'reagent',rarity:'uncommon',tags:['venom','alchemy','spider']},
    'Клык лютого волка':{id:'monster_direwolf_fang',name:'Клык лютого волка',cat:'bone',rarity:'uncommon',tags:['tooth','bone','trophy','wolf']},
    'Мясо лютого волка':{id:'monster_direwolf_meat',name:'Мясо лютого волка',cat:'food',rarity:'common',tags:['meat','food','wolf']},
    'Медвежий жир':{id:'monster_bear_fat',name:'Медвежий жир',cat:'reagent',rarity:'common',tags:['fat','alchemy','bear']},
    'Медвежье мясо':{id:'monster_bear_meat',name:'Медвежье мясо',cat:'food',rarity:'common',tags:['meat','food','bear']},
    'Совомедвежий коготь':{id:'monster_owlbear_claw',name:'Совомедвежий коготь',cat:'bone',rarity:'uncommon',tags:['claw','bone','trophy','owlbear']},
    'Голосовая мембрана':{id:'monster_harpy_vocal_membrane',name:'Голосовая мембрана',cat:'organ',rarity:'uncommon',tags:['organ','magic','harpy']},
    'Некротическая ткань':{id:'monster_ghoul_tissue',name:'Некротическая ткань',cat:'tissue',rarity:'uncommon',tags:['undead','necrotic','alchemy']},
    'Гульский коготь':{id:'monster_ghoul_claw',name:'Гульский коготь',cat:'bone',rarity:'common',tags:['claw','bone','undead']},
    'Некротическая кость':{id:'monster_wight_bone',name:'Некротическая кость',cat:'bone',rarity:'uncommon',tags:['bone','undead','necrotic','alchemy']},
    'Тёмная эссенция':{id:'monster_wight_essence',name:'Тёмная эссенция',cat:'reagent',rarity:'rare',tags:['magic','necrotic','alchemy','undead']},
    'Мимическая слизь':{id:'monster_mimic_slime',name:'Мимическая слизь',cat:'reagent',rarity:'uncommon',tags:['slime','acid','alchemy']},
    'Мимическая кожа':{id:'monster_mimic_skin',name:'Мимическая кожа',cat:'hide',rarity:'rare',tags:['hide','elastic','mimic']},
    'Базилисковая чешуя':{id:'monster_basilisk_scale',name:'Базилисковая чешуя',cat:'scale',rarity:'rare',tags:['scale','petrification','reptile']},
    'Базилисковый глаз':{id:'monster_basilisk_eye',name:'Базилисковый глаз',cat:'organ',rarity:'rare',tags:['eye','petrification','alchemy']},
    'Базилисковый желчный камень':{id:'monster_basilisk_gallstone',name:'Базилисковый желчный камень',cat:'reagent',rarity:'rare',tags:['stone','petrification','alchemy']},
    'Мантикорья шкура':{id:'monster_manticore_hide',name:'Мантикорья шкура',cat:'hide',rarity:'rare',tags:['hide','leather','monstrosity']},
    'Мантикорье мясо':{id:'monster_manticore_meat',name:'Мантикорье мясо',cat:'food',rarity:'uncommon',tags:['meat','food','monstrosity']},
    'Тролльский коготь':{id:'monster_troll_claw',name:'Тролльский коготь',cat:'bone',rarity:'rare',tags:['claw','bone','regeneration','troll']},
    'Драконье сердце':{id:'monster_dragon_heart',name:'Драконье сердце',cat:'organ',rarity:'very_rare',tags:['organ','dragon','magic','alchemy']},
    'Оленья шкура':{id:'monster_deer_hide',name:'Оленья шкура',cat:'hide',rarity:'common',tags:['hide','leather','deer']},
    'Оленье мясо':{id:'monster_deer_meat',name:'Оленье мясо',cat:'food',rarity:'common',tags:['meat','food','deer']},
    'Оленьи рога':{id:'monster_deer_antler',name:'Оленьи рога',cat:'horn',rarity:'common',tags:['horn','bone','trophy','deer']},
    'Кабанья шкура':{id:'monster_boar_hide',name:'Кабанья шкура',cat:'hide',rarity:'common',tags:['hide','leather','boar']},
    'Кабанье мясо':{id:'monster_boar_meat',name:'Кабанье мясо',cat:'food',rarity:'common',tags:['meat','food','boar']},
    'Кабаний клык':{id:'monster_boar_tusk',name:'Кабаний клык',cat:'bone',rarity:'common',tags:['tusk','bone','trophy','boar']},
    'Крысиная шкура':{id:'monster_rat_hide',name:'Крысиная шкура',cat:'hide',rarity:'common',tags:['hide','leather','small','rat']},
    'Крысиные клыки':{id:'monster_rat_fangs',name:'Крысиные клыки',cat:'bone',rarity:'common',tags:['tooth','bone','trophy','rat']},
    'Крысиное мясо':{id:'monster_rat_meat',name:'Крысиное мясо',cat:'food',rarity:'common',tags:['meat','food','rat']},
    'Лягушачья кожа':{id:'monster_frog_skin',name:'Лягушачья кожа',cat:'hide',rarity:'common',tags:['hide','leather','amphibian']},
    'Лягушачья железа':{id:'monster_frog_gland',name:'Лягушачья железа',cat:'organ',rarity:'uncommon',tags:['gland','alchemy','amphibian']},
    'Лягушачье мясо':{id:'monster_frog_meat',name:'Лягушачье мясо',cat:'food',rarity:'common',tags:['meat','food','amphibian']},
    'Крокодилья кожа':{id:'monster_crocodile_hide',name:'Крокодилья кожа',cat:'hide',rarity:'uncommon',tags:['hide','leather','scale','reptile']},
    'Крокодильи зубы':{id:'monster_crocodile_teeth',name:'Крокодильи зубы',cat:'bone',rarity:'common',tags:['tooth','bone','trophy','reptile']},
    'Крокодилье мясо':{id:'monster_crocodile_meat',name:'Крокодилье мясо',cat:'food',rarity:'common',tags:['meat','food','reptile']},
    'Гиеновая шкура':{id:'monster_hyena_hide',name:'Гиеновая шкура',cat:'hide',rarity:'common',tags:['hide','leather','hyena']},
    'Гиеновые клыки':{id:'monster_hyena_fangs',name:'Гиеновые клыки',cat:'bone',rarity:'common',tags:['tooth','bone','trophy','hyena']},
    'Гиеновое мясо':{id:'monster_hyena_meat',name:'Гиеновое мясо',cat:'food',rarity:'common',tags:['meat','food','hyena']},
    'Змеиная кожа':{id:'monster_constrictor_hide',name:'Змеиная кожа',cat:'hide',rarity:'common',tags:['hide','leather','scale','reptile']},
    'Змеиный яд':{id:'monster_constrictor_venom',name:'Змеиный яд',cat:'reagent',rarity:'uncommon',tags:['venom','alchemy','reptile']},
    'Змеиное мясо':{id:'monster_constrictor_meat',name:'Змеиное мясо',cat:'food',rarity:'common',tags:['meat','food','reptile']},
    'Перо гигантского орла':{id:'monster_giant_eagle_feather',name:'Перо гигантского орла',cat:'fiber',rarity:'uncommon',tags:['feather','fletching','avian']},
    'Коготь гигантского орла':{id:'monster_giant_eagle_claw',name:'Коготь гигантского орла',cat:'bone',rarity:'uncommon',tags:['claw','bone','trophy','avian']},
    'Мясо гигантского орла':{id:'monster_giant_eagle_meat',name:'Мясо гигантского орла',cat:'food',rarity:'common',tags:['meat','food','avian']},
    'Перо гигантской совы':{id:'monster_giant_owl_feather',name:'Перо гигантской совы',cat:'fiber',rarity:'common',tags:['feather','fletching','avian']},
    'Совиный глаз':{id:'monster_giant_owl_eye',name:'Совиный глаз',cat:'organ',rarity:'uncommon',tags:['eye','perception','alchemy']},
    'Мерцающая шерсть':{id:'monster_blink_dog_pelt',name:'Мерцающая шерсть',cat:'fiber',rarity:'rare',tags:['fur','magic','fey']},
    'Фазовая железа':{id:'monster_blink_dog_phase_gland',name:'Фазовая железа',cat:'organ',rarity:'rare',tags:['organ','magic','teleport']},
    'Дисplacer-шкура':{id:'monster_displacer_hide',name:'Дисplacer-шкура',cat:'hide',rarity:'rare',tags:['hide','magic','monstrosity']},
    'Фазовый усик':{id:'monster_displacer_tentacle',name:'Фазовый усик',cat:'organ',rarity:'rare',tags:['tentacle','magic','monstrosity']},
    'Ржавниковый хитин':{id:'monster_rust_chitin',name:'Ржавниковый хитин',cat:'chitin',rarity:'uncommon',tags:['chitin','armor','rust']},
    'Каталитическая железа':{id:'monster_rust_gland',name:'Каталитическая железа',cat:'organ',rarity:'rare',tags:['gland','catalyst','alchemy']},
    'Анкеговый панцирь':{id:'monster_ankheg_shell',name:'Анкеговый панцирь',cat:'chitin',rarity:'uncommon',tags:['chitin','armor','acid']},
    'Кислотная железа анкега':{id:'monster_ankheg_acid_gland',name:'Кислотная железа анкега',cat:'organ',rarity:'rare',tags:['gland','acid','alchemy']},
    'Анкеговое мясо':{id:'monster_ankheg_meat',name:'Анкеговое мясо',cat:'food',rarity:'common',tags:['meat','food','monstrosity']},
    'Паралитический яд':{id:'monster_carrion_crawler_paralytic',name:'Паралитический яд',cat:'reagent',rarity:'rare',tags:['venom','paralysis','alchemy']},
    'Хитиновая пластина':{id:'monster_carrion_chitin',name:'Хитиновая пластина',cat:'chitin',rarity:'uncommon',tags:['chitin','armor']},
    'Кислотная слизь':{id:'monster_acid_slime',name:'Кислотная слизь',cat:'reagent',rarity:'uncommon',tags:['slime','acid','alchemy']},
    'Слизистая мембрана':{id:'monster_slime_membrane',name:'Слизистая мембрана',cat:'tissue',rarity:'uncommon',tags:['membrane','slime','alchemy']},
    'Огненная эссенция':{id:'monster_fire_essence',name:'Огненная эссенция',cat:'essence',rarity:'rare',tags:['fire','elemental','alchemy']},
    'Элементальная зола':{id:'monster_fire_ash',name:'Элементальная зола',cat:'reagent',rarity:'uncommon',tags:['ash','fire','alchemy']},
    'Водяная эссенция':{id:'monster_water_essence',name:'Водяная эссенция',cat:'essence',rarity:'rare',tags:['water','elemental','alchemy']},
    'Сердце течения':{id:'monster_water_core',name:'Сердце течения',cat:'organ',rarity:'rare',tags:['water','magic','alchemy']},
    'Воздушная эссенция':{id:'monster_air_essence',name:'Воздушная эссенция',cat:'essence',rarity:'rare',tags:['air','elemental','alchemy']},
    'Сжатый вихрь':{id:'monster_air_vortex',name:'Сжатый вихрь',cat:'essence',rarity:'rare',tags:['air','magic','alchemy']},
    'Земляная эссенция':{id:'monster_earth_essence',name:'Земляная эссенция',cat:'essence',rarity:'rare',tags:['earth','elemental','alchemy']},
    'Сердце камня':{id:'monster_earth_core',name:'Сердце камня',cat:'mineral',rarity:'rare',tags:['stone','earth','magic']},
    'Теневой сгусток':{id:'monster_shadow_clot',name:'Теневой сгусток',cat:'essence',rarity:'rare',tags:['shadow','necrotic','magic','alchemy']},
    'Эктоплазма':{id:'monster_ectoplasm',name:'Эктоплазма',cat:'reagent',rarity:'uncommon',tags:['ectoplasm','undead','alchemy']},
    'Призрачная нить':{id:'monster_ghost_thread',name:'Призрачная нить',cat:'fiber',rarity:'rare',tags:['textile','ghost','magic']},
    'Спектральная пыль':{id:'monster_spectral_dust',name:'Спектральная пыль',cat:'reagent',rarity:'rare',tags:['undead','necrotic','alchemy']},
    'Эфирный осколок':{id:'monster_ethereal_shard',name:'Эфирный осколок',cat:'mineral',rarity:'rare',tags:['magic','crystal']},
    'Культовая одежда':{id:'monster_cultist_cloth',name:'Культовая одежда',cat:'fiber',rarity:'common',tags:['textile','cloth','humanoid']},
    'Ритуальная ткань':{id:'monster_acolyte_cloth',name:'Ритуальная ткань',cat:'fiber',rarity:'common',tags:['textile','cloth','ritual']},
    'Кожаная броня ветерана':{id:'monster_veteran_leather_armor',name:'Кожаная броня ветерана',cat:'armor_component',rarity:'common',tags:['leather','armor','reusable']},
    'Капитанская кожаная броня':{id:'monster_bandit_captain_leather_armor',name:'Капитанская кожаная броня',cat:'armor_component',rarity:'uncommon',tags:['leather','armor','humanoid','reusable']}
  };
  Object.keys(MASS_HARVEST_MATERIALS).forEach(function(name){MATERIAL_BRIDGE[name]=MASS_HARVEST_MATERIALS[name];});

  function ensureMaterial(def){
    var base=global.DND_CRAFTING_V31;
    if(!base)return;
    base.MATERIALS=base.MATERIALS||[];
    var m=base.MATERIALS.find(function(x){return x.id===def.id;});
    if(!m){m={id:def.id,name:def.name,cat:def.cat,rarity:def.rarity,price:0,weight:.1,roles:['monster-harvest'],tags:def.tags.slice(),usedByV38:[]};base.MATERIALS.push(m);}
    else {m.tags=Array.from(new Set((m.tags||[]).concat(def.tags||[])));m.roles=Array.from(new Set((m.roles||[]).concat(['monster-harvest'])));}
    return m;
  }

  Object.keys(MATERIAL_BRIDGE).forEach(function(name){ensureMaterial(MATERIAL_BRIDGE[name]);});

  var allCreatureNames=Object.keys((global.DNDExpandedBestiary&&global.DNDExpandedBestiary.catalog)||loot.catalog||{});
  allCreatureNames.forEach(function(name){
    var c=loot.catalog[name];
    var bestiary=global.DNDExpandedBestiary&&global.DNDExpandedBestiary.catalog&&global.DNDExpandedBestiary.catalog[name];
    if(!c&&bestiary&&bestiary.loot){c=loot.catalog[name]=clone(bestiary.loot);}
    if(!c)return;
    var family=bestiary&&bestiary.familyId;
    var defaultModel=(family==='humanoid'||family==='goblinoid'||family==='gnoll'||family==='magical_beast'&&name==='Гарпия')?'pockets':'none';
    var model=LOOT_MODELS[name]||defaultModel;
    c.lootModel=model;
    if(model==='none'){
      c.pockets={rolls:0,table:[]};
    } else if(model==='carried' || model==='hoard' || model==='contents'){
      c[model]=c.pockets||{rolls:0,table:[]};
      c.pockets={rolls:0,table:[]};
    }
    (c.harvest||[]).forEach(function(h){
      var def=MATERIAL_BRIDGE[h.name];
      if(def){h.craftMaterialId=def.id;h.materialTags=def.tags.slice();ensureMaterial(def);}
    });
    /* Keep the bestiary's source harvest data synchronized as well as the loot catalog.
       This prevents the UI preview and the generated loot result from disagreeing. */
    if(bestiary&&bestiary.loot&&Array.isArray(bestiary.loot.harvest)){
      bestiary.loot.harvest.forEach(function(h){
        var def=MATERIAL_BRIDGE[h.name];
        if(def){h.craftMaterialId=def.id;h.materialTags=def.tags.slice();ensureMaterial(def);}
      });
    }
  });

  var MONSTER_RECIPES=[
    {id:'v40_wolf_leather_patch',name:'Волчья кожаная накладка',category:'materials',dc:10,time:4,tools:['leatherworker'],materials:{monster_wolf_hide:1,thread:1},output:{name:'Волчья кожаная накладка',count:1,materialId:'wolfLeatherPatch'}},
    {id:'v40_direwolf_cloak',name:'Плащ из шкуры лютого волка',category:'armor',dc:15,time:12,tools:['leatherworker','weaver'],materials:{monster_direwolf_hide:2,thread:4},output:{name:'Плащ из шкуры лютого волка',count:1,category:'Одежда',weight:4}},
    {id:'v40_owlbear_fur',name:'Тёплая накидка совомедведя',category:'armor',dc:14,time:10,tools:['leatherworker','weaver'],materials:{monster_owlbear_hide:2,monster_owlbear_feathers:2,thread:3},output:{name:'Тёплая накидка совомедведя',count:1,category:'Одежда',weight:5}},
    {id:'v40_spider_silk_rope',name:'Паутиная верёвка',category:'materials',dc:12,time:5,tools:['weaver'],materials:{monster_spider_silk:4},output:{name:'Паутиная верёвка',count:1,materialId:'spiderSilkRope'}},
    {id:'v40_spider_chitin_plate',name:'Хитиновая пластина',category:'armor',dc:13,time:6,tools:['leatherworker','smith'],materials:{monster_spider_chitin:3,steel:1},output:{name:'Хитиновая пластина',count:1,category:'Компонент брони'}},
    {id:'v40_dragon_scale_panel',name:'Драконья чешуйчатая панель',category:'armor',dc:18,time:24,tools:['leatherworker','smith'],materials:{monster_dragon_scales:4,monster_dragon_bones:1,steel:2},output:{name:'Драконья чешуйчатая панель',count:1,category:'Компонент брони'}},
    {id:'v40_dragon_bone_handle',name:'Рукоять из драконьей кости',category:'materials',dc:16,time:8,tools:['woodcarver','smith'],materials:{monster_dragon_bones:2,leather:1},output:{name:'Рукоять из драконьей кости',count:1,materialId:'dragonBoneHandle'}},
    {id:'v40_basilisk_scale_plate',name:'Базилискова пластина',category:'armor',dc:17,time:10,tools:['leatherworker','smith'],materials:{monster_basilisk_scale:3,steel:1},output:{name:'Базилискова пластина',count:1,category:'Компонент брони'}},
    {id:'v40_manticore_spike_bundle',name:'Связка мантикорьих шипов',category:'weapons',dc:15,time:6,tools:['smith'],materials:{monster_manticore_spines:4,steel:1},output:{name:'Связка мантикорьих шипов',count:1,category:'Боеприпасы'}},
    {id:'v40_troll_hide_component',name:'Регенерирующий кожаный компонент',category:'armor',dc:17,time:14,tools:['leatherworker','alchemist'],materials:{monster_troll_hide:2,monster_troll_blood:1,thread:2},output:{name:'Регенерирующий кожаный компонент',count:1,category:'Компонент брони'}},
    {id:'v40_dragon_blood_reagent',name:'Драконья кровь — очищенный реагент',category:'materials',dc:18,time:8,tools:['alchemist','glassblower'],materials:{monster_dragon_blood:1,glass:1},output:{name:'Очищенный драконий реагент',count:1,materialId:'refinedDragonBlood'}},
    {id:'v40_troll_blood_reagent',name:'Троллья кровь — стабилизированный реагент',category:'materials',dc:16,time:6,tools:['alchemist'],materials:{monster_troll_blood:1,salt:1},output:{name:'Стабилизированный регенеративный реагент',count:1,materialId:'stableTrollBlood'}}
  ];

  MONSTER_RECIPES.forEach(function(r){
    if(!craft.ALL_RECIPES.some(function(x){return x.id===r.id;}))craft.ALL_RECIPES.push(r);
  });
  if(typeof craft.rebuildMaterialUsage==='function')craft.rebuildMaterialUsage();
  MONSTER_RECIPES.forEach(function(r){Object.keys(r.materials||{}).forEach(function(id){var m=(global.DND_CRAFTING_V31.MATERIALS||[]).find(function(x){return x.id===id;});if(m){m.usedByV38=m.usedByV38||[];r.tools.forEach(function(t){if(!m.usedByV38.includes(t))m.usedByV38.push(t);});}});});

  function rollContainer(name,key){var c=loot.catalog[name];return c?rollTable(c[key],key):[];}
  function generateV40(name,options){
    options=options||{};var c=loot.catalog[name];if(!c)return null;
    var model=c.lootModel||'pockets';
    var containers={pockets:[],carried:[],hoard:[],contents:[],harvest:[]};
    if(model!=='none')containers[model]=rollContainer(name,model);
    containers.harvest=typeof loot.harvest==='function'?loot.harvest(name,options):[];
    (containers.harvest||[]).forEach(function(x){var h=(c.harvest||[]).find(function(e){return e.name===x.name;});if(h&&h.craftMaterialId){x.craftMaterialId=h.craftMaterialId;x.materialTags=(h.materialTags||h.tags||[]).slice();}});
    return {monster:name,monsterId:options.monsterId||null,cr:options.cr||null,lootModel:model,containers:containers,createdAt:new Date().toISOString()};
  }
  function collectV40(char,result,selected){
    if(!char||!result)return null;selected=selected||['pockets','carried','hoard','contents','harvest'];
    if(typeof loot.collect==='function'){
      var old={containers:{pockets:[],harvest:[]}};
      selected.forEach(function(k){if(k==='harvest')old.containers.harvest=result.containers.harvest||[];else if(k==='pockets')old.containers.pockets=result.containers.pockets||[];});
      loot.collect(char,old,['pockets','harvest']);
      ['carried','hoard','contents'].forEach(function(k){if(selected.includes(k)) (result.containers[k]||[]).forEach(function(item){
        if(typeof loot.addCustomLoot==='function')loot.addCustomLoot(char,k,item);
      });});
    }
    return result;
  }

  loot.generate=generateV40;loot.collectV40=collectV40;loot.lootModels=LOOT_MODELS;loot.materialBridge=MATERIAL_BRIDGE;loot.monsterRecipes=MONSTER_RECIPES;
  global.DNDMonsterLootV40={VERSION:'40.0.0',lootModels:LOOT_MODELS,materialBridge:MATERIAL_BRIDGE,recipes:MONSTER_RECIPES,generate:generateV40,collect:collectV40};

  global.dndGenerateMonsterLootV37=function(){
    var s=document.getElementById('dndLootMonsterV37'),csel=document.getElementById('dndLootContainerV37');if(!s||!s.value)return;
    var result=generateV40(s.value,{character:global.currentChar||global.currentCharacter});
    var mode=csel&&csel.value||'all';
    if(mode!=='all' && result.containers[mode]!==undefined){Object.keys(result.containers).forEach(function(k){if(k!==mode)result.containers[k]=[];});}
    var el=document.getElementById('dndLootResultV37');if(!el)return;
    function list(a){return (a||[]).map(function(x){return '<div>• '+String(x.name).replace(/[&<>]/g,function(ch){return {'&':'&amp;','<':'&lt;','>':'&gt;'}[ch];})+' ×'+x.count+(x.craftMaterialId?' · 🔧 сырьё для крафта':'')+'</div>';}).join('')||'<div style="color:#777">ничего</div>';}
    el.innerHTML='<div><strong>📦 '+({pockets:'Карманах',carried:'Переносимое снаряжение',hoard:'Сокровище/тайник',contents:'Содержимое существа',none:'Нет переносимого лута'}[result.lootModel]||'Лут')+':</strong>'+list(result.containers[result.lootModel])+'</div><div style="margin-top:6px"><strong>🔪 Разделка:</strong>'+list(result.containers.harvest)+'</div><button class="btn-action" style="width:100%;margin-top:6px" onclick="dndCollectMonsterLootV40()">📥 Забрать добычу</button>';
    global.__dndLootV40=result;
  };
  global.dndCollectMonsterLootV40=function(){var result=global.__dndLootV40;if(!result)return;collectV40(global.currentChar||global.currentCharacter,result);var el=document.getElementById('dndLootResultV37');if(el)el.innerHTML+='<div style="color:#8f8;margin-top:6px">✓ Добыча добавлена в инвентарь</div>';};

  document.addEventListener('DOMContentLoaded',function(){
    setTimeout(function(){
      var sel=document.getElementById('dndLootContainerV37');
      if(sel){sel.innerHTML='<option value="all">Все доступные контейнеры + разделка</option><option value="pockets">Только карманы</option><option value="carried">Только переносимое снаряжение</option><option value="hoard">Только сокровище/тайник</option><option value="contents">Только содержимое</option><option value="harvest">Только разделка</option>';}
    },700);
  });
})(window);
