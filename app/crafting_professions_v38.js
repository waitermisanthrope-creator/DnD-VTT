/**
 * Crafting Professions v38: полный реестр производственных инструментов и зависимостей.
 * Как работает: поверх v31–v37 добавляет официальный набор ремесленных инструментов 5e,
 * смежные наборы (herbalism/disguise/forgery), отдельные профессии, многоинструментальные
 * рецепты и граф производственных цепочек. Рецепт может требовать несколько инструментов;
 * проверка владения выполняется до списания материалов. Материалы получают usedByV38.
 * Основные переменные: DND_CRAFT_PROFESSIONS_V38, TOOLS, PROFESSIONS, RECIPES,
 * MATERIALS, PROCESSING, currentChar/currentCharacter, inventory, DC, quality.
 * Файл не изменяет боевую систему и не трогает Wallpapers.js/Ambiences.js.
 * V46: учитывает происхождение персонажа (раса/класс/предыстория/черта) в ремесленной
 * проверке и добавляет читаемую ремесленную строку в описания соответствующих записей.
 */
(function(global){'use strict';
const base=global.DND_CRAFTING_V31;
if(!base)return;

const TOOLS={
  smith:{name:'Кузнечные инструменты',kind:'artisan',icon:'🔥',family:'metal',official:true},
  brewer:{name:'Пивоваренные принадлежности',kind:'artisan',icon:'🍺',family:'fermentation',official:true},
  calligrapher:{name:'Каллиграфические принадлежности',kind:'artisan',icon:'✒️',family:'scribe',official:true},
  carpenter:{name:'Плотницкие инструменты',kind:'artisan',icon:'🪚',family:'wood',official:true},
  cartographer:{name:'Инструменты картографа',kind:'artisan',icon:'🗺️',family:'mapping',official:true},
  cobbler:{name:'Инструменты сапожника',kind:'artisan',icon:'🥾',family:'leather',official:true},
  cook:{name:'Поварские принадлежности',kind:'artisan',icon:'🍲',family:'food',official:true},
  glassblower:{name:'Инструменты стеклодува',kind:'artisan',icon:'🪟',family:'glass',official:true},
  jeweler:{name:'Ювелирные инструменты',kind:'artisan',icon:'💎',family:'gem',official:true},
  leatherworker:{name:'Инструменты кожевника',kind:'artisan',icon:'🐺',family:'leather',official:true},
  mason:{name:'Инструменты каменщика',kind:'artisan',icon:'🧱',family:'stone',official:true},
  painter:{name:'Малярные принадлежности',kind:'artisan',icon:'🎨',family:'pigment',official:true},
  potter:{name:'Гончарные инструменты',kind:'artisan',icon:'🏺',family:'ceramic',official:true},
  tinker:{name:'Инструменты жестянщика',kind:'artisan',icon:'⚙️',family:'mechanism',official:true},
  alchemist:{name:'Инструменты алхимика',kind:'artisan',icon:'⚗️',family:'alchemy',official:true},
  weaver:{name:'Инструменты ткача',kind:'artisan',icon:'🧵',family:'fiber',official:true},
  woodcarver:{name:'Инструменты резчика по дереву',kind:'artisan',icon:'🪵',family:'wood',official:true},
  herbalism:{name:'Набор травника',kind:'kit',icon:'🌿',family:'herbalism',official:true},
  disguise:{name:'Набор для грима',kind:'kit',icon:'🎭',family:'disguise',official:true},
  forgery:{name:'Набор для подделок',kind:'kit',icon:'🪶',family:'forgery',official:true}
};

const PROFESSIONS={
  smith:{name:'Кузнец',tools:['smith'],desc:'Оружие, металлическая броня, клинки, крепления и металлические компоненты.'},
  brewer:{name:'Пивовар',tools:['brewer'],desc:'Ферментация, напитки, дрожжи, уксусные основы и пищевые заготовки.'},
  calligrapher:{name:'Каллиграф',tools:['calligrapher'],desc:'Бумага, пергамент, книги, чернила, свитки и письменные заготовки.'},
  carpenter:{name:'Плотник',tools:['carpenter'],desc:'Щиты, мебель, ящики, каркасы, крупные деревянные детали.'},
  cartographer:{name:'Картограф',tools:['cartographer'],desc:'Карты, атласы, планы подземелий и навигационные схемы.'},
  cobbler:{name:'Сапожник',tools:['cobbler'],desc:'Обувь, подошвы, ремни, сапоги и дорожные кожаные изделия.'},
  cook:{name:'Повар',tools:['cook'],desc:'Пайки, блюда, сушёные продукты и пищевые заготовки.'},
  glassblower:{name:'Стеклодув',tools:['glassblower'],desc:'Флаконы, линзы, бутылки, стеклянные детали и оптика.'},
  jeweler:{name:'Ювелир',tools:['jeweler'],desc:'Кольца, амулеты, оправы, драгоценные камни и тонкая инкрустация.'},
  leatherworker:{name:'Кожевник',tools:['leatherworker'],desc:'Кожа, ремни, ножны, лёгкая броня, сумки и обработка шкур.'},
  mason:{name:'Каменщик',tools:['mason'],desc:'Камень, кирпич, плитка, статуи, точильные и строительные детали.'},
  painter:{name:'Маляр',tools:['painter'],desc:'Пигменты, краски, гербы, роспись, маркировка и декоративные покрытия.'},
  potter:{name:'Гончар',tools:['potter'],desc:'Керамика, тигли, формы, сосуды, печные детали и обожжённые компоненты.'},
  tinker:{name:'Жестянщик/механик',tools:['tinker'],desc:'Шестерни, замки, пружины, ловушки и мелкие механизмы.'},
  alchemist:{name:'Алхимик',tools:['alchemist'],desc:'Растворители, реагенты, катализаторы и Alchemy 2.0.'},
  weaver:{name:'Ткач',tools:['weaver'],desc:'Нити, ткань, одежда, плащи, подкладки, канаты и текстиль.'},
  woodcarver:{name:'Резчик по дереву',tools:['woodcarver'],desc:'Луки, стрелы, древки, рукояти, резные детали и деревянные мелкие изделия.'},
  herbalist:{name:'Травник',tools:['herbalism'],desc:'Сбор, сушка, сортировка и подготовка лекарственных растений.'},
  disguiser:{name:'Гример',tools:['disguise'],desc:'Грим, парики, накладки, костюмные элементы и наборы для перевоплощения.'},
  forger:{name:'Мастер подделок',tools:['forgery'],desc:'Документы, печати, копии, поддельные карты и письменные реквизиты.'}
};

const MATERIAL_DEFS=[
  ['stone','Камень','stone','common',.1,2],['granite','Гранит','stone','common',.2,3],['marble','Мрамор','stone','uncommon',2,3],
  ['brick','Кирпич','stone','common',.05,2],['mortar','Раствор','reagent','common',.02,1],['pigment','Пигмент','reagent','common',.5,.1],
  ['finePigment','Тонкий пигмент','reagent','uncommon',3,.1],['chalk','Мел','stone','common',.02,.1],['leatherSole','Кожаная подошва','hide','common',.5,.2],
  ['cord','Шнур','fiber','common',.2,.1],['rope','Верёвка','fiber','common',1,.5],['flour','Мука','food','common',.05,.2],['grain','Зерно','food','common',.05,.5],
  ['yeast','Дрожжи','reagent','common',.1,.05],['ale','Эль','food','common',.3,1],['vinegar','Уксус','reagent','common',.2,.5],
  ['stoneDust','Каменная пыль','stone','common',.05,.5],['parchment','Пергамент','paper','common',1,.05],['ink','Чернила','reagent','common',5,.05],
  ['sealWax','Печати/воск','reagent','common',.3,.1],['gold','Золото','metal','rare',50,1],['lead','Свинец','metal','common',.5,1],
  ['tin','Олово','metal','common',.5,1],['zinc','Цинк','metal','common',.5,1],['steel','Сталь','metal','common',2,1],
  ['oak','Дуб','wood','common',.5,1],['pine','Сосна','wood','common',.2,1],['yew','Тис','wood','uncommon',5,1],['maple','Клён','wood','common',.5,1],
  ['clay','Глина','ceramic','common',.1,1],['glaze','Глазурь','ceramic','uncommon',1,.2],['glass','Стекло','glass','common',1,.2],
  ['crystal','Кристалл','glass','uncommon',10,.2],['wax','Воск','reagent','common',.2,.2],['charcoal','Древесный уголь','fuel','common',.1,.5],
  ['herb','Сушёные травы','reagent','common',1,.1],['salt','Соль','reagent','common',.05,.2],['resin','Смола','reagent','common',.5,.2],
  ['thread','Нить','fiber','common',.1,.1],['cloth','Ткань','fiber','common',.5,.2],['leather','Кожа','hide','common',1,.5],
  ['hardwood','Твёрдая древесина','wood','uncommon',1,1],['gem','Драгоценный камень','gem','rare',50,.1],['iron','Железо','metal','common',1,1],
  ['water','Вода','reagent','common',0,.5],['sand','Песок','glass','common',.02,1],['driedMeat','Сушёное мясо','food','common',.5,.2],
  ['arrowheads','Наконечники стрел','metal','common',1,.1],['glazedVessel','Глазурованный сосуд','ceramic','common',2,.5],
  ['driedHerbBundle','Сушёный лекарственный сбор','reagent','common',2,.1],['paintV38','Краска','reagent','common',1,.2],['shieldFrame','Деревянная основа щита','wood','common',2,2]
];
function ensureMaterials(){
  base.MATERIALS=base.MATERIALS||[];
  MATERIAL_DEFS.forEach(function(d){
    if(!base.MATERIALS.some(function(m){return m.id===d[0];})) base.MATERIALS.push({id:d[0],name:d[1],cat:d[2],rarity:d[3],price:d[4],weight:d[5],usedByV38:[],roles:['crafting']});
  });
}
ensureMaterials();

const RECIPES=[
  {id:'v38_spear',name:'Копьё',category:'weapons',dc:10,time:4,tools:['smith','woodcarver'],materials:{steel:1,oak:1,leather:1},output:{name:'Копьё',count:1,damage:'1d6',damageType:'колющий',weight:3,cost:'1 зм',properties:['Thrown','Versatile']}},
  {id:'v38_shield',name:'Щит на каркасе',category:'armor',dc:12,time:8,tools:['carpenter','smith','leatherworker'],materials:{oak:3,steel:1,leather:1},output:{name:'Щит',count:1,ac:2,weight:6,cost:'10 зм',category:'Щит'}},
  {id:'v38_crossbow',name:'Арбалет',category:'weapons',dc:13,time:12,tools:['woodcarver','smith','leatherworker'],materials:{hardwood:2,steel:2,leather:1,thread:2},output:{name:'Арбалет',count:1,damage:'1d8',damageType:'колющий',weight:5,cost:'25 зм',properties:['Ammunition','Loading','Two-Handed']}},
  {id:'v38_buckler_frame',name:'Основа щита',category:'materials',dc:10,time:5,tools:['carpenter'],materials:{oak:2,leather:1},output:{name:'Деревянная основа щита',materialId:'shieldFrame',count:1}},
  {id:'v38_boots',name:'Дорожные сапоги',category:'armor',dc:9,time:5,tools:['cobbler','leatherworker'],materials:{leather:2,leatherSole:2,thread:2},output:{name:'Дорожные сапоги',count:1,category:'Одежда',weight:2,cost:'1 зм'}},
  {id:'v38_belt',name:'Кожаный ремень',category:'junk',dc:8,time:2,tools:['leatherworker','cobbler'],materials:{leather:1,thread:1},output:{name:'Кожаный ремень',count:1,category:'Снаряжение',weight:.2,cost:'0.5 зм'}},
  {id:'v38_rope',name:'Плетёная верёвка',category:'materials',dc:9,time:3,tools:['weaver'],materials:{thread:10},output:{name:'Плетёная верёвка',materialId:'rope',count:1}},
  {id:'v38_canvas',name:'Плотный холст',category:'materials',dc:10,time:4,tools:['weaver'],materials:{cloth:3,thread:2},output:{name:'Плотный холст',materialId:'canvas',count:2}},
  {id:'v38_woodcarved_handle',name:'Резная рукоять',category:'materials',dc:10,time:2,tools:['woodcarver'],materials:{hardwood:1},output:{name:'Резная рукоять',materialId:'carvedHandle',count:1}},
  {id:'v38_arrowheads',name:'Наконечники стрел',category:'materials',dc:9,time:2,tools:['smith'],materials:{steel:1},output:{name:'Наконечники стрел',materialId:'arrowheads',count:12}},
  {id:'v38_arrows',name:'Стрелы',category:'consumables',dc:10,time:3,tools:['woodcarver','smith'],materials:{oak:1,arrowheads:1,thread:1},output:{name:'Стрелы',count:20,category:'Боеприпасы',weight:1,cost:'1 зм'}},
  {id:'v38_clay_brick',name:'Кирпичи',category:'materials',dc:8,time:4,tools:['potter'],materials:{clay:4},output:{name:'Кирпичи',materialId:'brick',count:12}},
  {id:'v38_glazed_vessel',name:'Глазурованный сосуд',category:'materials',dc:11,time:4,tools:['potter'],materials:{clay:2,glaze:1},output:{name:'Глазурованный сосуд',materialId:'glazedVessel',count:1}},
  {id:'v38_stone_block',name:'Каменный блок',category:'materials',dc:10,time:5,tools:['mason'],materials:{stone:3},output:{name:'Каменный блок',materialId:'stoneBlock',count:1}},
  {id:'v38_grinding_stone',name:'Точильный камень',category:'materials',dc:11,time:4,tools:['mason'],materials:{stone:2,stoneDust:1},output:{name:'Точильный камень',materialId:'grindstone',count:1}},
  {id:'v38_stone_statue',name:'Каменная статуэтка',category:'junk',dc:13,time:10,tools:['mason'],materials:{marble:2},output:{name:'Каменная статуэтка',count:1,category:'Декор',weight:4,cost:'10 зм'}},
  {id:'v38_glass_lens',name:'Оптическая линза',category:'materials',dc:13,time:5,tools:['glassblower','jeweler'],materials:{glass:2,crystal:1},output:{name:'Оптическая линза',materialId:'fineLensV38',count:1}},
  {id:'v38_vial',name:'Тонкий флакон',category:'materials',dc:9,time:1,tools:['glassblower'],materials:{glass:1},output:{name:'Тонкий флакон',materialId:'thinVialV38',count:2}},
  {id:'v38_retort',name:'Алхимическая реторта',category:'materials',dc:14,time:6,tools:['potter','glassblower','alchemist'],materials:{glass:3,glazedVessel:1},output:{name:'Алхимическая реторта',materialId:'retortV38',count:1}},
  {id:'v38_ring',name:'Серебряное кольцо',category:'armor',dc:11,time:3,tools:['jeweler'],materials:{silver:1,gem:1},output:{name:'Серебряное кольцо',count:1,category:'Аксессуар',weight:.05,cost:'25 зм'}},
  {id:'v38_gem_setting',name:'Огранка и оправа',category:'materials',dc:13,time:5,tools:['jeweler'],materials:{silver:1,gem:1},output:{name:'Ювелирная оправа',materialId:'gemSettingV38',count:1}},
  {id:'v38_map',name:'Карта местности',category:'materials',dc:12,time:8,tools:['calligrapher','cartographer'],materials:{paper:2,ink:1,thread:1},output:{name:'Карта местности',materialId:'mapV38',count:1}},
  {id:'v38_atlas',name:'Атлас региона',category:'materials',dc:15,time:16,tools:['calligrapher','cartographer','painter'],materials:{paper:8,ink:2,thread:2,pigment:1},output:{name:'Атлас региона',materialId:'atlasV38',count:1,rarity:'rare'}},
  {id:'v38_scroll',name:'Пустой свиток',category:'materials',dc:10,time:3,tools:['calligrapher'],materials:{parchment:2,ink:1,thread:1},output:{name:'Пустой свиток',materialId:'scrollV38',count:1}},
  {id:'v38_book',name:'Переплёт книги',category:'materials',dc:12,time:6,tools:['calligrapher','leatherworker'],materials:{parchment:8,leather:2,thread:2,ink:1},output:{name:'Переплётная книга',materialId:'bookV38',count:1}},
  {id:'v38_ink',name:'Хорошие чернила',category:'materials',dc:9,time:2,tools:['calligrapher'],materials:{pigment:1,resin:1,water:1},output:{name:'Хорошие чернила',materialId:'fineInkV38',count:2}},
  {id:'v38_ale',name:'Походный эль',category:'consumables',dc:9,time:24,tools:['brewer'],materials:{grain:3,yeast:1,water:1},output:{name:'Походный эль',count:4,category:'Напиток',weight:4,cost:'2 зм'}},
  {id:'v38_vinegar',name:'Уксусная основа',category:'materials',dc:10,time:48,tools:['brewer'],materials:{ale:2,yeast:1},output:{name:'Уксус',materialId:'vinegarV38',count:2}},
  {id:'v38_ration',name:'Сухой походный паёк',category:'consumables',dc:8,time:4,tools:['cook'],materials:{grain:2,driedMeat:1,salt:1},output:{name:'Сухой походный паёк',count:2,category:'Пища',weight:1,cost:'1 зм'}},
  {id:'v38_herbal_dry',name:'Сушёный лекарственный сбор',category:'materials',dc:10,time:6,tools:['herbalism'],materials:{herb:3,salt:1},output:{name:'Сушёный лекарственный сбор',materialId:'driedHerbBundle',count:2}},
  {id:'v38_herbal_powder',name:'Порошок травника',category:'materials',dc:12,time:4,tools:['herbalism','alchemist'],materials:{driedHerbBundle:2},output:{name:'Порошок травника',materialId:'herbalPowderV38',count:1}},
  {id:'v38_paint',name:'Краска',category:'materials',dc:8,time:2,tools:['painter'],materials:{pigment:2,resin:1},output:{name:'Краска',materialId:'paintV38',count:2}},
  {id:'v38_heraldic_shield',name:'Расписной гербовый щит',category:'armor',dc:13,time:5,tools:['painter','carpenter'],materials:{paintV38:1,oak:1,shieldFrame:1},output:{name:'Расписной щит',count:1,ac:2,weight:6,cost:'12 зм',category:'Щит'}},
  {id:'v38_lock',name:'Простой замок',category:'materials',dc:12,time:4,tools:['tinker','smith'],materials:{steel:2,iron:1},output:{name:'Простой замок',materialId:'lockV38',count:1}},
  {id:'v38_trap',name:'Механическая ловушка',category:'materials',dc:13,time:5,tools:['tinker','smith','woodcarver'],materials:{steel:2,oak:1,thread:1},output:{name:'Механическая ловушка',materialId:'trapV38',count:1}},
  {id:'v38_disguise_kit',name:'Набор для перевоплощения',category:'junk',dc:11,time:3,tools:['disguise','weaver','leatherworker'],materials:{cloth:1,thread:2,pigment:1},output:{name:'Набор для перевоплощения',count:1,category:'Инструменты',weight:1,cost:'10 зм'}},
  {id:'v38_false_seal',name:'Имитация печати',category:'junk',dc:13,time:4,tools:['forgery','jeweler'],materials:{wax:1,silver:1,pigment:1},output:{name:'Имитация печати',count:1,category:'Реквизит',weight:.1,cost:'5 зм'}},
  {id:'v38_forged_doc',name:'Реквизитный документ',category:'junk',dc:14,time:5,tools:['forgery','calligrapher','painter'],materials:{paper:2,ink:1,pigment:1,sealWax:1},output:{name:'Реквизитный документ',count:1,category:'Документ',weight:.05,cost:'5 зм'}},
  {id:'v38_wooden_crate',name:'Ящик',category:'junk',dc:9,time:4,tools:['carpenter'],materials:{oak:3,iron:1},output:{name:'Деревянный ящик',count:1,category:'Контейнер',weight:4,cost:'1 зм'}},
  {id:'v38_table',name:'Стол',category:'junk',dc:10,time:8,tools:['carpenter'],materials:{oak:5},output:{name:'Стол',count:1,category:'Мебель',weight:20,cost:'5 зм'}},
  {id:'v38_solvent',name:'Чистый растворитель',category:'materials',dc:11,time:2,tools:['alchemist'],materials:{resin:1,salt:1,glass:1},output:{name:'Чистый растворитель',materialId:'solventV38',count:1}},
  {id:'v38_stabilizer',name:'Стабилизатор',category:'materials',dc:12,time:3,tools:['alchemist'],materials:{salt:2,charcoal:1},output:{name:'Стабилизатор',materialId:'stabilizerV38',count:2}}
];

const PROCESSING=[
  {id:'v38_wood_plank',name:'Доска',tools:['carpenter'],dc:8,time:2,materials:{oak:2},output:{name:'Дубовая доска',materialId:'oakPlankV38',count:4}},
  {id:'v38_leather_sole',name:'Подошва',tools:['leatherworker','cobbler'],dc:9,time:3,materials:{leather:2},output:{name:'Кожаная подошва',materialId:'leatherSole',count:2}},
  {id:'v38_steel_wire',name:'Стальная проволока',tools:['smith','tinker'],dc:11,time:3,materials:{steel:1},output:{name:'Стальная проволока',materialId:'steelWireV38',count:3}},
  {id:'v38_fine_cloth',name:'Тонкая ткань',tools:['weaver'],dc:11,time:4,materials:{cloth:2,thread:2},output:{name:'Тонкая ткань',materialId:'fineClothV38',count:2}},
  {id:'v38_paper',name:'Бумага из волокна',tools:['weaver','calligrapher'],dc:10,time:5,materials:{thread:5,water:1},output:{name:'Бумага из волокна',materialId:'fiberPaperV38',count:5}},
  {id:'v38_glass_batch',name:'Стекольная шихта',tools:['glassblower'],dc:9,time:2,materials:{glass:2,sand:2},output:{name:'Стекольная шихта',materialId:'glassBatchV38',count:2}},
  {id:'v38_mortar',name:'Строительный раствор',tools:['mason'],dc:8,time:2,materials:{stoneDust:2,water:1},output:{name:'Строительный раствор',materialId:'mortarV38',count:3}},
  {id:'v38_ferment_base',name:'Ферментационная основа',tools:['brewer'],dc:9,time:12,materials:{grain:2,yeast:1,water:1},output:{name:'Ферментационная основа',materialId:'fermentBaseV38',count:2}}
];

const ALL_RECIPES=RECIPES.concat(PROCESSING.map(function(r){return Object.assign({category:'materials'},r,{output:Object.assign({count:1},r.output)}); }));

function char(){return global.currentCharacter||global.currentChar||null;}
function inventory(){const c=char();if(!c)return null;c.inventory=c.inventory||{weapons:[],armor:[],consumables:[],materials:[],junk:[],clothing:[]};return c.inventory;}
function proficiencyValues(){const c=char();const p=c&&c.proficiencies||[];return (Array.isArray(p)?p:Object.keys(p||{})).map(function(x){return String(typeof x==='object'?(x.id||x.name||x.label||''):x).toLowerCase();});}
const ALIASES={
  smith:['smith','smiths tools','smith tools','p_smith_tools','кузнечные инструменты'],
  brewer:['brewer','brewers supplies','brewers tools','пивоваренные принадлежности','пивоварские принадлежности'],
  calligrapher:['calligrapher','calligrapher supplies','calligraphy','p_calligrapher_tools','каллиграфические принадлежности','каллиграфические инструменты'],
  carpenter:['carpenter','carpenters tools','p_carpenter_tools','плотницкие инструменты'],
  cartographer:['cartographer','cartographers tools','p_cartographer_tools','инструменты картографа'],
  cobbler:['cobbler','cobblers tools','cobbler tools','инструменты сапожника'],
  cook:['cook','cooks utensils','cooking utensils','cook utensils','поварские принадлежности','кухонная утварь'],
  glassblower:['glassblower','glassblowers tools','p_glassblower_tools','инструменты стеклодува'],
  jeweler:['jeweler','jewelers tools','p_jeweler_tools','ювелирные инструменты'],
  leatherworker:['leatherworker','leatherworkers tools','p_leatherworker_tools','инструменты кожевника'],
  mason:['mason','masons tools','masonry tools','инструменты каменщика'],
  painter:['painter','painters supplies','painters tools','малярные принадлежности'],
  potter:['potter','potters tools','p_potter_tools','гончарные инструменты'],
  tinker:['tinker','tinkers tools','механик','инструменты жестянщика','инструменты механика'],
  alchemist:['alchemist','alchemists supplies','p_alchemist_tools','инструменты алхимика','алхимические принадлежности'],
  weaver:['weaver','weavers tools','p_weaver_tools','инструменты ткача'],
  woodcarver:['woodcarver','woodcarvers tools','резчик по дереву','инструменты резчика по дереву'],
  herbalism:['herbalism','herbalism kit','herbalists kit','набор травника','травничество'],
  disguise:['disguise kit','disguise','набор для грима','гримёрный набор'],
  forgery:['forgery kit','forgery','набор для подделок','набор для подделки']
};
function hasTool(tool){const vals=proficiencyValues(), aliases=ALIASES[tool]||[tool];return aliases.some(function(a){a=String(a).toLowerCase();return vals.some(function(v){return v===a||v.indexOf(a)>=0||a.indexOf(v)>=0;});});}
function quantity(id){const inv=inventory();if(!inv)return 0;const m=(base.MATERIALS||[]).find(function(x){return x.id===id;});const label=String(m&&m.name||id).toLowerCase();let total=0;Object.values(inv).forEach(function(list){(list||[]).forEach(function(i){if(i.materialId===id||i.craftMaterialId===id||String(i.name||'').toLowerCase()===label)total+=Number(i.count)||0;});});return Math.round(total*100)/100;}
function consume(id,n){const inv=inventory();let left=n;if(!inv)return false;Object.keys(inv).forEach(function(cat){const list=inv[cat]||[];for(let i=list.length-1;i>=0&&left>0;i--){const item=list[i];const m=(base.MATERIALS||[]).find(function(x){return x.id===id;});if(item.materialId===id||item.craftMaterialId===id||String(item.name||'').toLowerCase()===String(m&&m.name||id).toLowerCase()){const take=Math.min(left,Number(item.count)||1);item.count-=take;left-=take;if(item.count<=0)list.splice(i,1);}}});return left<=0;}
function add(category,item){const inv=inventory();if(!inv)return false;inv[category]=inv[category]||[];const same=inv[category].find(function(x){return x.name===item.name&&x.materialId===item.materialId&&x.craftQuality===item.craftQuality;});if(same)same.count=(same.count||0)+(item.count||1);else inv[category].push(item);return true;}
function save(){if(typeof global.autoSaveCurrentCharacter==='function')global.autoSaveCurrentCharacter();else if(typeof global.saveCharacter==='function')global.saveCharacter();}
function bonus(){const c=char()||{};return Number(c.proficiencyBonus||c.profBonus||2);}

/* V46: происхождение персонажа влияет на крафт только через явно описанные ремесленные
 * особенности. Это не заменяет владение инструментом: сначала персонаж должен иметь
 * требуемый инструмент, затем сюда добавляются расовые/классовые/предысторийные/чертовые
 * модификаторы. Основные поля: checkBonus, dcReduction, yieldMultiplier, notes. */
const CRAFTING_RACE_PROFILES={
  dwarf_hill:{checkBonus:{smith:1,mason:1},note:'Кузнечное наследие: +1 к кузнечному и каменному ремеслу.'}, dwarf_mountain:{checkBonus:{smith:1,mason:1},note:'Кузнечное наследие: +1 к кузнечному и каменному ремеслу.'},
  elf_wood:{checkBonus:{woodcarver:1,weaver:1},note:'Лесное ремесло: +1 к работе с деревом и тканью.'}, gnome_rock:{checkBonus:{tinker:1},note:'Техническая смекалка: +1 к работе с механизмами.'},
  gnome_forest:{checkBonus:{woodcarver:1,herbalism:1},note:'Природное мастерство: +1 к дереву и травничеству.'}, lizardfolk:{checkBonus:{leatherworker:1},note:'Выделка шкур: +1 к кожевенному ремеслу.'},
  warforged:{checkBonus:{smith:1,tinker:1},note:'Конструкторская природа: +1 к металлу и механизмам.'}, vedalken:{checkBonus:{alchemist:1,tinker:1},note:'Аналитическое ремесло: +1 к алхимии и механизмам.'},
  autognome:{checkBonus:{tinker:1},note:'Автоматизированное мастерство: +1 к работе с механизмами.'},
  firbolg:{checkBonus:{herbalism:1,leatherworker:1},note:'Лесное мастерство: +1 к травам и коже.'}, shifter:{checkBonus:{leatherworker:1,herbalism:1},note:'Звериное ремесло: +1 к коже и травам.'},
  yuan_ti:{checkBonus:{alchemist:1},note:'Змеиная алхимия: +1 к алхимическому ремеслу.'}, full_orc:{checkBonus:{smith:1},note:'Сильная рука: +1 к кузнечному ремеслу.'}, kobold:{checkBonus:{tinker:1},note:'Кобольдская инженерия: +1 к механизмам.'},
  goblin:{checkBonus:{tinker:1},note:'Гоблинская смекалка: +1 к механизмам.'}, hobgoblin:{checkBonus:{smith:1,tinker:1},note:'Военное ремесло: +1 к металлу и механизмам.'}
};
const CRAFTING_CLASS_PROFILES={
  'Изобретатель':{checkBonusAll:2,minLevel:3,note:'Инструментальный эксперт: +2 к проверкам крафта при владении требуемым инструментом с 3 уровня.'},
  'Друид':{checkBonus:{herbalism:1,alchemist:1},note:'Природное ремесло: +1 к обработке растительных и алхимических компонентов при владении инструментом.'},
  'Следопыт':{checkBonus:{herbalism:1,leatherworker:1,woodcarver:1},note:'Полевое ремесло: +1 к обработке природных материалов при владении соответствующим инструментом.'},
  'Плут':{checkBonus:{tinker:1,forgery:1,disguise:1},note:'Теневое ремесло: +1 к тонкой механике, подделкам и гриму при владении инструментом.'},
  'Волшебник':{checkBonus:{calligrapher:1,alchemist:1},note:'Арканное ремесло: +1 к каллиграфии и алхимии при владении инструментом.'},
  'Бард':{checkBonus:{weaver:1,painter:1,calligrapher:1},note:'Сценическое ремесло: +1 к текстилю, оформлению и каллиграфии при владении инструментом.'}
};
const CRAFTING_BACKGROUND_PROFILES={
  'Guild Artisan':{checkBonus:{smith:1,alchemist:1,jeweler:1,leatherworker:1},note:'Гильдийское ремесло: +1 к кузнечному, алхимическому, ювелирному и кожевенному делу.'},
  'Folk Hero':{checkBonus:{smith:1,carpenter:1,leatherworker:1},note:'Народное ремесло: +1 к кузнечному, плотницкому и кожевенному делу.'},
  'Hermit':{checkBonus:{herbalism:1},note:'Травническая практика: +1 к обработке трав при владении набором травника.'},
  'Outlander':{checkBonus:{herbalism:1,leatherworker:1},note:'Полевой опыт: +1 к обработке природных материалов.'},
  'Sage':{checkBonus:{calligrapher:1,alchemist:1},note:'Исследовательская практика: +1 к каллиграфии и алхимии.'},
  'Entertainer':{checkBonus:{disguise:1,painter:1,weaver:1},note:'Сценическое ремесло: +1 к гриму, краскам и текстилю.'}
};
const CRAFTING_FEAT_PROFILES={
  skilled:{checkBonusAll:1,note:'Широкий практический навык: +1 к проверкам крафта.'},
  prodigy:{checkBonusAll:1,note:'Вундеркинд: +1 к проверкам крафта, отражающий дополнительную инструментальную практику.'},
  chef:{checkBonus:{cook:1},note:'Шеф-повар: +1 к крафту пищи и пайков.'},
  poisoner:{checkBonus:{alchemist:1},note:'Отравитель: +1 к алхимическому изготовлению ядов и токсичных реагентов.'}
};
function normName(v){return String(v||'').trim().toLowerCase();}
function classEntries(c){
  if(!c)return[];
  if(Array.isArray(c.classes)&&c.classes.length)return c.classes.map(function(x){return typeof x==='string'?{name:x,level:1}:x;});
  return [{name:c.className||c.class||'',level:Number(c.level)||1}];
}
function featEntries(c){return Array.isArray(c&&c.feats)?c.feats.concat(Array.isArray(c&&c.features)?c.features:[]):[];}
function hasFeat(c,idOrName){const target=normName(idOrName);return featEntries(c).some(function(f){return normName(typeof f==='string'?f:(f.id||f.name||f.nameRu))===target;});}
function mergeProfile(target,p){if(!p)return;target.checkBonusAll+=(Number(p.checkBonusAll)||0);Object.entries(p.checkBonus||{}).forEach(function(e){target.checkBonus[e[0]]=(target.checkBonus[e[0]]||0)+Number(e[1]||0);});if(p.note&&!target.notes.includes(p.note))target.notes.push(p.note);}
function craftingProfile(c,tool){
  c=c||char()||{}; const profile={checkBonusAll:0,checkBonus:{},dcReduction:0,yieldMultiplier:1,notes:[],sources:[]};
  const raceId=c.raceId||c.race||''; const race=CRAFTING_RACE_PROFILES[raceId]; if(race){mergeProfile(profile,race);profile.sources.push('race:'+raceId);}
  classEntries(c).forEach(function(cl){const p=CRAFTING_CLASS_PROFILES[cl.name];if(p){const lvl=Number(cl.level)||1;if(!p.minLevel||lvl>=p.minLevel){mergeProfile(profile,p);profile.sources.push('class:'+cl.name);}}});
  const bg=c.background||''; const bp=CRAFTING_BACKGROUND_PROFILES[bg]||CRAFTING_BACKGROUND_PROFILES[Object.keys(CRAFTING_BACKGROUND_PROFILES).find(function(k){return normName(k)===normName(bg);})]; if(bp){mergeProfile(profile,bp);profile.sources.push('background:'+bg);}
  featEntries(c).forEach(function(f){const n=normName(typeof f==='string'?f:(f.name||f.nameRu||f.id));Object.keys(CRAFTING_FEAT_PROFILES).forEach(function(k){if(n===k||n===normName(CRAFTING_FEAT_PROFILES[k].name)|| (k==='skilled'&&n==='умелец') || (k==='prodigy'&&n==='вундеркинд') || (k==='chef'&&n==='шеф-повар') || (k==='poisoner'&&n==='отравитель')){mergeProfile(profile,CRAFTING_FEAT_PROFILES[k]);profile.sources.push('feat:'+k);}});});
  const tools=Array.isArray(tool)?tool.filter(Boolean):(tool?[tool]:[]);
  profile.toolBonus=tools.reduce(function(max,t){return Math.max(max,Number(profile.checkBonus[t]||0));},0);
  profile.tools=tools.slice();
  profile.totalBonus=profile.checkBonusAll+profile.toolBonus;
  /* V47 hook: отдельный авторский модуль профессий может добавить бонус навыка
   * после загрузки этого файла, не создавая второй движок крафта. */
  if(global.DND_CRAFT_PROFESSION_PROGRESS&&typeof global.DND_CRAFT_PROFESSION_PROGRESS.getProfile==='function'){
    var professionLayer=global.DND_CRAFT_PROFESSION_PROGRESS.getProfile(c,tools);
    profile.professionBonus=Number(professionLayer.bonus)||0;
    profile.professionQualityBonus=Number(professionLayer.qualityBonus)||0;
    profile.professionSources=professionLayer.sources||[];
    profile.totalBonus+=profile.professionBonus;
    profile.notes=profile.notes||[];
    (profile.professionSources||[]).forEach(function(src){var note='Профессия «'+src.name+'»: уровень '+src.level+' ('+src.levelName+'), +'+src.checkBonus+' к проверке.';if(profile.notes.indexOf(note)<0)profile.notes.push(note);});
  }
  return profile;
}
function craftDescriptionText(profile){return profile.notes.length?' Ремесло: '+profile.notes.join(' '):'';}
function appendCraftingDescriptions(){
  const raceList=typeof DEFAULT_RACES!=='undefined'?DEFAULT_RACES:[]; raceList.forEach(function(r){const p=CRAFTING_RACE_PROFILES[r.id];if(p){const temp={checkBonusAll:0,checkBonus:{},notes:[],sources:[]};mergeProfile(temp,p);const note=' Ремесло: '+temp.notes.join(' ');if(!String(r.desc||'').includes('Ремесло:'))r.desc=(r.desc||'')+note;}});
  [global.DND_CLASSES_LIST,global.dndClasses,global.CLASSES_LIST].forEach(function(list){if(!Array.isArray(list))return;list.forEach(function(c){const p=CRAFTING_CLASS_PROFILES[c.name];if(p&&!String(c.desc||'').includes('Ремесло:'))c.desc=(c.desc||'')+' Ремесло: '+p.note;});});
  const bgs=global.dndBackgrounds||[];bgs.forEach(function(b){const p=CRAFTING_BACKGROUND_PROFILES[b.name];if(p&&!String(b.description||'').includes('Ремесло:'))b.description=(b.description||'')+' Ремесло: '+p.note;});
  Object.keys(CRAFTING_FEAT_PROFILES).forEach(function(key){const profile=CRAFTING_FEAT_PROFILES[key];const arrays=[global.FEATS_PHB,global.FEATS_TCOE,global.FEATS_XGTE,global.FEATS_SETTINGS,global.FEATS_UA_HOMEBREW];arrays.forEach(function(arr){if(!Array.isArray(arr))return;arr.forEach(function(f){const n=normName(f&&f.id);if(n===key&&!String(f.description||'').includes('Ремесло:'))f.description=(f.description||'')+' Ремесло: '+profile.note;});});});
}
appendCraftingDescriptions();
function craftModifier(tools){return craftingProfile(char(),tools);}
function recipeMissing(r){return Object.entries(r.materials||{}).filter(function(x){return quantity(x[0])<x[1];}).map(function(x){return{materialId:x[0],need:x[1],have:quantity(x[0]),missing:x[1]-quantity(x[0])};});}
function quality(total,dc){if(total>=dc+10)return'exceptional';if(total>=dc+5)return'fine';return'standard';}
function processingOutcome(total,dc,roll){
  if(roll===1 || total<=dc-10)return{outcome:'critical_failure',label:'Критический провал',consume:1,output:0};
  if(total<dc)return{outcome:'failure',label:'Провал',consume:0.5,output:0};
  if(roll===20 || total>=dc+10)return{outcome:'exceptional',label:'Исключительный успех',consume:1,output:1.15};
  if(total>=dc+5)return{outcome:'fine',label:'Хороший результат',consume:1,output:1.05};
  return{outcome:'success',label:'Успех',consume:1,output:1};
}
function craft(id,options){const r=ALL_RECIPES.find(function(x){return x.id===id;});if(!r)return{ok:false,error:'Рецепт не найден'};if(!char())return{ok:false,error:'Нет активного персонажа'};const missing=recipeMissing(r);if(missing.length)return{ok:false,error:'Не хватает материалов',missing:missing};const missingTools=(r.tools||[]).filter(function(t){return!hasTool(t);});if(missingTools.length)return{ok:false,error:'Нужно владение всеми указанными инструментами',missingTools:missingTools.map(function(t){return TOOLS[t].name;})};if(options&&options.dryRun)return{ok:true,dryRun:true,recipe:r};
  const profile=craftModifier(r.tools||[]);
  const roll=Math.floor(Math.random()*20)+1,total=roll+bonus()+profile.totalBonus;
  if(r.resourceProcessing){
    const policy=processingOutcome(total,r.dc,roll);
    const entries=Object.entries(r.materials||{});
    const consumed={};
    entries.forEach(function(x){const requested=Number(x[1])||0;const amount=Math.round(requested*policy.consume*100)/100;consume(x[0],amount);consumed[x[0]]=amount;});
    if(policy.output<=0){save();if(typeof global.renderInventory==='function')global.renderInventory();return{ok:false,failed:true,processing:true,outcome:policy.outcome,outcomeLabel:policy.label,roll:roll,bonus:bonus(),craftingBonus:profile.totalBonus,craftingProfile:profile,total:total,dc:r.dc,consumed:consumed,output:0,error:policy.outcome==='critical_failure'?`Критический провал: ${total} против DC ${r.dc}. Сырьё полностью испорчено.`:`Провал: ${total} против DC ${r.dc}. Потеряна часть сырья, оставшееся можно попытаться обработать снова.`};}
    const baseCount=Number(r.output.count)||0;const finalCount=Math.round(baseCount*policy.output*100)/100;
    const out=Object.assign({},r.output,{count:finalCount,crafted:true,craftProfession:r.tools.map(function(t){return t;}),craftRecipe:r.id,craftQuality:policy.outcome,craftOutcome:policy.outcome,craftCheck:total,craftDC:r.dc,craftTime:r.time,requiredTools:r.tools.slice(),craftingBonus:profile.totalBonus,craftingSources:profile.sources.slice(),resourceInput:Object.keys(r.materials||{})[0]||null,resourceYieldMultiplier:policy.output});
    add(r.category||'materials',out);save();if(typeof global.renderInventory==='function')global.renderInventory();return{ok:true,recipe:r,processing:true,outcome:policy.outcome,outcomeLabel:policy.label,quality:policy.outcome,roll:roll,bonus:bonus(),craftingBonus:profile.totalBonus,craftingProfile:profile,total:total,dc:r.dc,consumed:consumed,output:finalCount,item:out};
  }
  Object.entries(r.materials||{}).forEach(function(x){consume(x[0],x[1]);});
  const success=total>=r.dc;if(!success){save();return{ok:false,failed:true,roll:roll,bonus:bonus(),craftingBonus:profile.totalBonus,craftingProfile:profile,total:total,dc:r.dc,error:`Проверка провалена: ${total} против DC ${r.dc}. Материалы потеряны.`};}const q=quality(total,r.dc);const out=Object.assign({},r.output,{crafted:true,craftProfession:r.tools.map(function(t){return t;}),craftRecipe:r.id,craftQuality:q,craftOutcome:q,craftCheck:total,craftDC:r.dc,craftTime:r.time,requiredTools:r.tools.slice(),craftingBonus:profile.totalBonus,craftingSources:profile.sources.slice()});if(q==='fine')out.qualityBonus=1;if(q==='exceptional')out.qualityBonus=2;add(r.category||'materials',out);save();if(typeof global.renderInventory==='function')global.renderInventory();return{ok:true,recipe:r,quality:q,roll:roll,bonus:bonus(),craftingBonus:profile.totalBonus,craftingProfile:profile,total:total,dc:r.dc,item:out};}
function validate(){const issues=[];const materialIds=new Set((base.MATERIALS||[]).map(function(m){return m.id;}));ALL_RECIPES.forEach(function(r){(r.tools||[]).forEach(function(t){if(!TOOLS[t])issues.push('Unknown tool '+t+' in '+r.id);});Object.keys(r.materials||{}).forEach(function(m){if(!materialIds.has(m))issues.push('Unknown material '+m+' in '+r.id);});});return{ok:issues.length===0,issues:issues,recipes:ALL_RECIPES.length,tools:Object.keys(TOOLS).length,materials:materialIds.size};}
function rebuildMaterialUsage(){(base.MATERIALS||[]).forEach(function(m){m.usedByV38=[];});ALL_RECIPES.forEach(function(r){Object.keys(r.materials||{}).forEach(function(id){const m=base.MATERIALS.find(function(x){return x.id===id;});if(m&&!m.usedByV38.includes(r.tools[0]))m.usedByV38.push(r.tools[0]);});});return true;}
rebuildMaterialUsage();
function toolMatrix(){return Object.keys(TOOLS).map(function(id){return{id:id,tool:TOOLS[id],profession:Object.entries(PROFESSIONS).find(function(x){return x[1].tools.includes(id);})?.[0]||id,recipeCount:ALL_RECIPES.filter(function(r){return r.tools.includes(id);}).length};});}
function render(){const host=document.getElementById('craftingProfessionsPanel');if(!host||document.getElementById('craftingProfessionsV38'))return;const box=document.createElement('div');box.id='craftingProfessionsV38';box.style.cssText='margin-top:10px;padding:10px;background:#151515;border:1px solid #6d542d;border-radius:8px';box.innerHTML='<h3 style="margin:0;color:#d7b86e">🧰 Полная матрица ремёсел v38</h3><div style="font-size:.76em;color:#aaa;margin:5px 0 8px">Все 17 ремесленных инструментов + травник, грим и подделки. Рецепты могут требовать несколько инструментов, поэтому производство образует реальные цепочки.</div><div id="craftingV38Tools"></div><div style="margin-top:8px"><select id="craftingV38Filter" style="width:100%;padding:7px;background:#222;color:#fff"><option value="">Все рецепты</option>'+Object.keys(TOOLS).map(function(id){return '<option value="'+id+'">'+TOOLS[id].name+'</option>';}).join('')+'</select><div id="craftingV38Recipes" style="max-height:430px;overflow:auto;margin-top:7px"></div></div><div id="craftingV38Result" style="margin-top:7px"></div>';host.appendChild(box);document.getElementById('craftingV38Filter').onchange=renderRecipes;renderTools();renderRecipes();}
function renderTools(){const el=document.getElementById('craftingV38Tools');if(!el)return;el.innerHTML=toolMatrix().map(function(x){const owned=hasTool(x.id);return '<div style="display:inline-block;width:calc(50% - 6px);margin:3px;padding:6px;box-sizing:border-box;background:#211f1b;border:1px solid #39342b;border-radius:6px;font-size:.72em"><b>'+x.tool.icon+' '+x.tool.name+'</b><br><span style="color:'+(owned?'#8bc48b':'#e99a8c')+'">'+(owned?'✓ есть':'✗ нет')+'</span> · '+x.recipeCount+' рецептов</div>';}).join('');}
function renderRecipes(){const el=document.getElementById('craftingV38Recipes');if(!el)return;const filter=document.getElementById('craftingV38Filter')?.value||'';const rows=ALL_RECIPES.filter(function(r){return!filter||r.tools.includes(filter);});el.innerHTML=rows.map(function(r){const mats=Object.entries(r.materials).map(function(x){return x[0]+' ×'+x[1];}).join(' · ');return '<div style="padding:7px;margin-bottom:5px;background:#211f1b;border:1px solid #39342b;border-radius:6px;font-size:.74em"><div style="display:flex;justify-content:space-between;gap:5px"><b>'+r.name+'</b><span>DC '+r.dc+' · '+r.time+'ч</span></div><div style="color:#aaa">'+mats+'</div><div style="color:#c9b98c">🔧 '+r.tools.map(function(t){return TOOLS[t].name;}).join(' + ')+'</div><button class="btn-action" style="width:100%;margin-top:4px" onclick="DND_CRAFT_PROFESSIONS_V38.uiCraft(\''+r.id+'\')">Создать</button></div>';}).join('')||'<div style="color:#888;padding:8px">Нет рецептов.</div>';}
function uiCraft(id){const r=craft(id),el=document.getElementById('craftingV38Result');if(!el)return;const consumed=r.consumed?'<br>Потрачено: '+Object.entries(r.consumed).map(function(x){return x[0]+' ×'+x[1];}).join(', '):'';const processing=r.processing?'<br>Результат обработки: '+(r.output||0)+' ед.': '';const craftBonus=(r.craftingBonus?'<br>Бонус происхождения: +'+r.craftingBonus:'');const craftNotes=(r.craftingProfile&&r.craftingProfile.notes&&r.craftingProfile.notes.length?'<br><span style="color:#d7b86e">'+r.craftingProfile.notes.join(' ')+'</span>':'');el.innerHTML=r.ok?'<div style="padding:7px;background:#1d2a1f;border:1px solid #4b7052;border-radius:6px">✅ <b>'+r.item.name+'</b><br>Результат: '+(r.outcomeLabel||r.quality)+' · '+r.total+' против DC '+r.dc+craftBonus+processing+consumed+craftNotes+'<br>Инструменты: '+r.recipe.tools.map(function(t){return TOOLS[t].name;}).join(' + ')+'</div>':'<div style="padding:7px;background:#321b1b;border:1px solid #7f3b3b;border-radius:6px">❌ '+(r.outcomeLabel||'Провал')+'<br>'+r.error+consumed+(r.missingTools?.length?'<br>Нужны: '+r.missingTools.join(', '):'')+(r.missing?.length?'<br>Не хватает: '+r.missing.map(function(x){return x.materialId+' ×'+x.missing;}).join(', '):'')+'</div>';renderTools();}
const API={VERSION:'47.0.0',TOOLS,PROFESSIONS,RECIPES,PROCESSING,ALL_RECIPES,hasTool,quantity,craft,validate,toolMatrix,rebuildMaterialUsage,render,renderTools,renderRecipes,craftingProfile,craftModifier,CRAFTING_RACE_PROFILES,CRAFTING_CLASS_PROFILES,CRAFTING_BACKGROUND_PROFILES,CRAFTING_FEAT_PROFILES};
global.DND_CRAFT_PROFESSIONS_V38=API;
global.dndCraftProfessionV38=craft;
document.addEventListener('DOMContentLoaded',function(){setTimeout(render,500);});
})(window);
