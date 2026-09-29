/**
 * alchemist_mhp_2024_runtime.js
 * Полный доступный 2024/5.5E runtime Алхимика Mage Hand Press.
 * Все игровые подписи — русские; исходные тексты не копируются.
 */
(function(g){
'use strict';
var D=g.DNDContent;if(!D)return;
var CLASS='Алхимик',SOURCE='Mage Hand Press — Alchemist 2024 / 5.5E',PACK_ID='mhp-alchemist-2024';
function level(h){return (h&&h.classes||[]).reduce(function(n,c){return n+(Number(c.name)===0?0:Number(c.level)||0);},0);}
function alvl(h){var c=(h&&h.classes||[]).find(function(x){return x.name===CLASS||x.englishName==='Alchemist';});return c?Number(c.level)||0:0;}
function st(h){h.classFeaturesState=h.classFeaturesState||{};return h.classFeaturesState;}
function ability(h,k){var a=h.abilityScores||h.stats||{},v=a[k];if(v===undefined){var m={dex:'dexterity',int:'intelligence',str:'strength',con:'constitution',wis:'wisdom',cha:'charisma'};v=a[m[k]];}return Number(v)||10;}
function mod(h,k){return Math.floor((ability(h,k)-10)/2);}
function prof(h){return Number(h.proficiencyBonus)||Math.floor((level(h)-1)/4)+2;}
function maxReagents(l){return 2*l;}
function primeMax(l){return l>=17?5:l>=13?4:l>=9?3:l>=5?2:l>=2?1:0;}
function formulasKnown(l){return l>=19?8:l>=16?7:l>=12?6:l>=8?5:l>=2?3:0;}
function bombDice(l){return l>=17?'4d10':l>=11?'3d10':l>=5?'2d10':'1d10';}
var formulae=[
 {id:'acid',name:'Кислотная бомба',damage:'кислота',dice:'d8',save:'Ловкость',effect:'попадание или провал спасброска: -3 к AC до начала вашего следующего хода.'},
 {id:'bramble',name:'Колючая бомба',damage:'нет',save:'Сила',effect:'создаёт труднопроходимые заросли; провал удерживает скорость цели на 0.'},
 {id:'concussion',name:'Контузионная бомба',damage:'гром',dice:'d10',save:'Телосложение',effect:'попавшее/провалившее цель существо до Huge отбрасывается на 10 фт.'},
 {id:'cryo',name:'Крио-бомба',damage:'холод',dice:'d8',save:'Телосложение',effect:'-3 к броскам атаки до начала вашего следующего хода.'},
 {id:'fear',name:'Бомба страха',damage:'психический',dice:'d6',save:'Мудрость',effect:'испуг до начала вашего следующего хода.'},
 {id:'holy',name:'Святая бомба',damage:'излучение',dice:'d10',save:'Ловкость',effect:'против нежити/исчадий кости урона становятся d12.'},
 {id:'impact',name:'Ударная бомба',damage:'силовой',dice:'d8',save:'Сила',effect:'цель Huge или меньше получает Сбит с ног.'},
 {id:'incendiary',name:'Зажигательная бомба',damage:'огонь',dice:'d8',save:'Ловкость',effect:'область горит до начала вашего следующего хода и наносит урон при входе/конце хода.'},
 {id:'laughingGas',name:'Бомба со смехотворным газом',damage:'яд',dice:'d8',save:'Телосложение',effect:'Отравлен и не может произносить словесные компоненты заклинаний до начала вашего следующего хода.'},
 {id:'lightning',name:'Молниевая бомба',damage:'молния',dice:'d10',save:'Ловкость',effect:'цель не может совершать провоцированные атаки до начала вашего следующего хода.'},
 {id:'oil',name:'Масляная бомба',damage:'нет',effect:'покрывает цель маслом; следующий огненный урон получает улучшенные кости.'},
 {id:'paint',name:'Красочная бомба',damage:'нет',save:'Ловкость',effect:'цель видима даже при невидимости, атаки по ней получают преимущество.'},
 {id:'prismatic',name:'Призматическая бомба',damage:'случайный тип',save:'случайный',effect:'тип урона и спасброска определяются случайно.'},
 {id:'quiet',name:'Тихая бомба',damage:'дробящий',dice:'d10',save:'Ловкость',effect:'почти бесшумна; смертельный удар можно заменить нокаутом с 1 HP.'},
 {id:'seeking',name:'Самонаводящаяся бомба',damage:'огонь',dice:'d10',save:'Ловкость',effect:'атака и взрыв игнорируют половинное и трёхчетвертное укрытие.'},
 {id:'smoke',name:'Дымовая бомба',damage:'нет',effect:'создаёт сферу сильного затуманивания на 1 минуту, если её не развеет сильный ветер.'},
 {id:'teleport',name:'Телепортационная бомба',damage:'нет',effect:'телепортирует алхимика в точку попадания, если она не дальше 30 фт.'},
 {id:'withering',name:'Иссушающая бомба',damage:'некротический',dice:'d8',save:'Телосложение',effect:'-3 к спасброскам цели до начала вашего следующего хода.'}
];
var potions=[
 {name:'Зелье лазания',level:1,cost:1},{name:'Зелье уменьшения',level:1,cost:1},{name:'Зелье увеличения',level:1,cost:2},{name:'Зелье лечения',level:1,cost:1},{name:'Зелье сопротивления',level:1,cost:1},{name:'Зелье дыхания под водой',level:1,cost:1},
 {name:'Зелье улучшенного лечения',level:4,cost:2},{name:'Зелье невидимости',level:4,cost:2},{name:'Совершенный клей',level:4,cost:1},{name:'Универсальный растворитель',level:4,cost:1},
 {name:'Зелье героизма',level:8,cost:3},{name:'Зелье силы холмового великана',level:8,cost:3},{name:'Зелье превосходного лечения',level:8,cost:3},
 {name:'Зелье полёта',level:12,cost:5},{name:'Зелье силы морозного/каменного великана',level:12,cost:4},{name:'Зелье неуязвимости',level:12,cost:6},
 {name:'Зелье силы огненного великана',level:16,cost:7},{name:'Зелье скорости',level:16,cost:9}
];
var discoveries=[
 ['Алхимия изменения','Максимум хранимых зелий +2; +4 реагента только для варки; открывает дополнительные трансформационные зелья.'],
 ['Алхимия яда','Владение набором отравителя; ядовитый урон игнорирует сопротивление; открывает набор сильных ядов.'],
 ['Алхимия восстановления','Максимум зелий +2; лечебные зелья получают второй заряд; открывает усиленные лечебные составы.'],
 ['Арканические исследования','2 заговора и по одному заклинанию 1-го и 2-го круга из списка Волшебника; восстановление применений реагентами.'],
 ['Боевые исследования','Владение воинским оружием, средними доспехами и щитами; бонусная атака не-тяжёлым оружием; реагент усиливает рукопашный удар огнём.'],
 ['Фундаментальная алхимия','Пакеты базовых флаконов; быстрый флакон после атаки бомбой; усиленные кислота, огонь и святая вода.'],
 ['Направленные взрывы','+1 к атакам бомбами, затем +2 на 11 уровне; удвоенная дальность; реагент может добавить 1d8 к промаху.'],
 ['Гомункул','Создание одного гомункула за 3 реагента; иммунитет к собственным бомбам, действия вне атаки; элементальная инфузия.'],
 ['Некробиология','Превращение собственных костей хитов в реагенты; восстановление умершего в течение минуты за реагенты/отдых.'],
 ['Точные взрывы','+1 к DC алхимика, затем +2 на 11; можно исключать существ из взрыва в количестве до модификатора Интеллекта.'],
 ['Нестандартные взрывчатые вещества','Бомба-ракета через арбалет; режим огнедыщания конусом после взрыва.'],
 ['Нестандартные зелья','Бонусным действием можно метнуть зелье союзнику; реакцией выпить зелье после полученного урона.']
];
var subs=[
 {id:'apothecary',name:'Аптекарь',desc:'Алхимический целитель.',f:[
  [3,'Бомба обезболивания','Бомба не наносит урон, а даёт цели временные HP, равные уровню Алхимика; реагенты усиливают количество временных HP.'],
  [6,'Концентрированное лечение','При лечении зельем можно максимизировать до половины выпавших лечебных костей.'],
  [10,'Алхимическое воскрешение','Зельем превосходного/высшего лечения можно вернуть умершего не более 24 часов назад с 1 HP.'],
  [14,'Чудо-сыворотка','После восстановления HP вашим зельем существо получает преимущество на проверки d20 до начала своего следующего хода.']]},
 {id:'madBomber',name:'Безумный бомбардир',desc:'Специалист по разрушительным бомбам.',f:[
  [3,'Взрывная специализация','Ваши бомбы наносят двойной урон объектам и сооружениям.'],
  [3,'Бомба с чёрным порохом','Дополнительная формула: кости урона d12; сопротивление огню игнорируется, иммунитет превращается в сопротивление; число применений равно модификатору Интеллекта.'],
  [6,'Отложенный взрыв','Действием Использовать предмет устанавливаете бомбу с таймером до 10 минут; взрыв срабатывает в начале указанного хода.'],
  [10,'Защитный экран','После короткого/долгого отдыха выбираете кислоту, холод, огонь, молнию или гром и получаете сопротивление выбранному типу.'],
  [14,'Перегруженный заряд','При максимальном расходе реагентов на Prime Bomb добавляются ещё два реагента без расхода.']]},
 {id:'mutagenist',name:'Мутагенист',desc:'Алхимик, изменяющий собственное тело.',f:[
  [3,'Дополнительные владения','Владение Акробатикой и Атлетикой.'],
  [3,'Мутаген','Бонусным действием выбираете Силу, Ловкость или Телосложение на 1 минуту: выбранная характеристика +3 до максимума 23; каждая форма имеет собственное телесное усиление.'],
  [6,'Общий мутаген','Бонусным действием и за 1 реагент вводите мутаген союзнику в пределах 5 фт; пока действует исходный мутаген, новый нельзя передать другому существу.'],
  [10,'Продвинутая мутация','При введении себе мутагена выбираете гиперэластичность, слизистость или пару дополнительных рук.'],
  [14,'Мутировавшая кровь','Выбираете Силу, Ловкость или Телосложение: +2 к характеристике; при мутагене её максимум становится 25.']]},
 {id:'amorist',name:'Аморист',desc:'Подкласс зарегистрирован для выбора; полный 2024-текст относится к Complete Alchemist.',f:[[3,'Алхимическая романтика','Подкласс выбран; полный набор механик ожидает источник 2024.'],[6,'Зелья воздействия',''],[10,'Алхимический парфюм',''],[14,'Мастерство амориста','']]},
 {id:'dynamoEngineer',name:'Инженер-динамо',desc:'Подкласс зарегистрирован для выбора; полный 2024-текст относится к Complete Alchemist.',f:[[3,'Динамо-инженерия',''],[6,'Улучшенное динамо',''],[10,'Стабилизатор динамо',''],[14,'Мастер динамо','']]},
 {id:'ionizer',name:'Ионизатор',desc:'Подкласс зарегистрирован для выбора; полный 2024-текст относится к Complete Alchemist.',f:[[3,'Ионизирующее оружие',''],[6,'Ионизационная камера',''],[10,'Реактивный разряд',''],[14,'Пульс реагента','']]},
 {id:'oozeRancher',name:'Разводчик слизней',desc:'Подкласс зарегистрирован для выбора; полный 2024-текст относится к Complete Alchemist.',f:[[3,'Слизистая адаптация',''],[6,'Слизни в бутылках',''],[10,'Жертвенная слизь',''],[14,'Элементальные слизни','']]},
 {id:'pigmentist',name:'Пигментист',desc:'Подкласс зарегистрирован для выбора; полный 2024-текст относится к Complete Alchemist.',f:[[3,'Художник',''],[6,'Порталы краски',''],[10,'Пигментные зелья',''],[14,'Разноцветный взрыв','']]},
 {id:'resonator',name:'Резонатор',desc:'Подкласс зарегистрирован для выбора; полный 2024-текст относится к Complete Alchemist.',f:[[3,'Резонансная бомба',''],[6,'Усиленный резонанс',''],[10,'Акустическое поле',''],[14,'Мастер резонанса','']]},
 {id:'venomsmith',name:'Веномсмит',desc:'Подкласс зарегистрирован для выбора; полный 2024-текст относится к Complete Alchemist.',f:[[3,'Алхимический яд',''],[6,'Усиленный токсин',''],[10,'Митридатизм',''],[14,'Ядовитое возмездие','']]},
 {id:'xenoalchemist',name:'Ксеноалхимик',desc:'Подкласс зарегистрирован для выбора; актуальная версия была отдельно переработана в Complete Alchemist.',f:[[3,'Ксеноалхимические трансплантаты',''],[6,'Монструозный привой',''],[10,'Улучшенная адаптация',''],[14,'Совершенная мутация','']]}
];
var base=[
 [1,'Бомбы','Вы создаёте алхимические бомбы без стоимости; владеете ими и мастерством Explode. Урон и DC используют Dexterity/Intelligence.'],
 [1,'Реагенты','Начинаете с 2 реагентов; +1 при коротком и все при долгом отдыхе. Максимум растёт по таблице до 40.'],
 [1,'Варка зелий','За 10 минут тратите реагенты на зелья; максимум одновременно равен модификатору Интеллекта.'],
 [2,'Прайм-бомба','Раз за ход тратите реагенты при попадании/взрыве для +1d10 за каждый реагент; максимум зависит от уровня, взрыв можно расширить.'],
 [2,'Формулы бомб','Выберите 3 формулы; число известных растёт по таблице, одну можно заменить после долгого отдыха.'],
 [2,'Синтез реагентов','После короткого отдыха восстанавливаете дополнительные реагенты до модификатора Интеллекта; раз за долгий отдых.'],
 [3,'Подкласс Алхимика','Выбираете специализацию; особенности на 3, 6, 10 и 14 уровнях.'],
 [4,'Зелья','Открываются новые рецепты на 4, 8, 12 и 16 уровнях.'],
 [5,'Открытие','Выбираете одно уникальное Открытие; новые на 9, 13 и 17.'],
 [5,'Улучшенные бомбы','Раз за ход урон бомбы становится 2d10; затем 3d10 на 11 и 4d10 на 17.'],
 [7,'Уклонение','Успешный спасбросок Ловкости против половины урона даёт 0; провал — половину.'],
 [11,'Покрытие взрыва','Вы автоматически преуспеваете против собственных бомб и не получаете от них урон.'],
 [15,'Миксолог зелий','Можно бонусным действием выпить сразу два смешанных зелья без побочных эффектов.'],
 [18,'Экспериментатор','После долгого отдыха можно заменить любые формулы бомб и одно Открытие.'],
 [19,'Эпический дар','Получаете Эпический дар или другую доступную черту.'],
 [20,'Философский камень','Камень возвращает реагенты при инициативе до 6, ускоряет варку и замедляет старение.'],
 [20,'Ядерная бомба','Особая формула: взрыв 10d10 + 100 силового урона в сфере радиусом 1 милю; уничтожает Философский камень.']
];
var features=base.map(function(x){return{id:'alchemist-'+x[1],name:x[1],level:x[0],description:x[2]};});
var subpacks=subs.map(function(s){return{id:s.id,name:s.name,description:s.desc,features:s.f.map(function(x){return{id:'alchemist-'+s.id+'-'+x[0]+'-'+x[1],level:x[0],name:x[1],description:x[2]};})};});
function sync(h){
 var l=alvl(h);if(!l)return;var s=st(h);h.resources=h.resources||{};
 function rr(id,max,recharge){var r=h.resources[id];if(!r||r.max!==max)h.resources[id]={max:max,current:r?Math.min(r.current,max):max,recharge:recharge};}
 rr('alchemistReagents',maxReagents(l),'short');
 s.alchemistBombDamage=bombDice(l);s.alchemistPrimeMax=primeMax(l);s.alchemistFormulaMax=formulasKnown(l);s.alchemistSaveDC=8+mod(h,'int')+prof(h);
 s.alchemistPotionLimit=Math.max(1,mod(h,'int'));s.alchemistDiscovered=s.alchemistDiscovered||[];s.alchemistFormulas=s.alchemistFormulas||[];
}
function spend(h,n){var r=h.resources&&h.resources.alchemistReagents;if(!r||r.current<n)return false;r.current-=n;return true;}
function use(h,id,ctx){
 sync(h);ctx=ctx||{};var l=alvl(h),s=st(h),r=h.resources.alchemistReagents;
 id=String(id||'').replace(/^alchemist-/,'');
 if(id==='primeBomb'){var n=Math.min(Number(ctx.reagents)||1,s.alchemistPrimeMax,r.current);if(!spend(h,n))return{ok:false,message:'Недостаточно реагентов.'};return{ok:true,effect:{extraDamage:n+'d10',extraRadiusFt:n*5},message:'💣 Прайм-бомба: +'+n+'d10.'};}
 if(id==='reagentSynthesis'){if(s.alchemistSynthesisUsed)return{ok:false,message:'Синтез уже использован до долгого отдыха.'};var n=Math.min(Math.max(1,mod(h,'int')),s.alchemistReagentsMax||r.max-r.current);r.current=Math.min(r.max,r.current+n);s.alchemistSynthesisUsed=true;return{ok:true,message:'⚗️ Восстановлено реагентов: '+n+'.'};}
 if(id==='bomb'){return{ok:true,effect:{attack:true,damageDice:s.alchemistBombDamage,damageType:'fire',range:'30/90',saveDC:s.alchemistSaveDC,explodeRadiusFt:5,intelligentExplosion:Math.max(1,mod(h,'int'))},message:'💣 Бомба готова.'};}
 if(id==='formula'){var f=formulae.find(function(x){return x.id===ctx.formula||x.name===ctx.formula;});if(!f)return{ok:false,message:'Формула не найдена.'};return{ok:true,effect:{formula:f},message:'🧪 Формула применена: '+f.name+'.'};}
 if(id==='nuclearBomb'){if(l<20||!s.philosopherStone)return{ok:false,message:'Нужен 20 уровень и Философский камень.'};s.philosopherStone=false;return{ok:true,effect:{damage:'10d10+100',type:'force',radiusMiles:1},message:'☢️ Ядерная бомба создана. Философский камень уничтожен.'};}
 if(id==='potionBrew'){var p=potions.find(function(x){return x.name===ctx.potion;});if(!p||l<p.level)return{ok:false,message:'Этот рецепт ещё недоступен.'};if(!spend(h,p.cost))return{ok:false,message:'Недостаточно реагентов.'};s.alchemistPotions=s.alchemistPotions||[];if(s.alchemistPotions.length>=s.alchemistPotionLimit){r.current+=p.cost;return{ok:false,message:'Достигнут лимит зелий.'};}s.alchemistPotions.push({name:p.name,cost:p.cost});return{ok:true,message:'⚗️ Сварено: '+p.name+'.'};}
 if(id==='potionMix'){if(l<15)return{ok:false,message:'Миксолог доступен с 15 уровня.'};return{ok:true,effect:{mixPotions:true},message:'🍶 Два зелья можно выпить бонусным действием.'};}
 if(id==='philosopherStone'){if(l<20)return{ok:false,message:'Философский камень доступен с 20 уровня.'};s.philosopherStone=true;return{ok:true,effect:{regainReagentsOnInitiativeUpTo:6,quickBrewing:true,longevity:true},message:'💎 Философский камень создан.'};}
 var sub=subs.find(function(x){return x.id===ctx.subclass||x.name===ctx.subclass;});
 if(sub&&id==='subclassFeature'){var f=sub.f.find(function(x){return Number(x[0])===Number(ctx.level)||String(x[0])===String(ctx.featureId);});if(!f)return{ok:false,message:'Особенность подкласса не найдена.'};return{ok:true,effect:{subclass:sub.id,feature:f[1]},message:'✨ '+f[1]+' активна.'};}
 return{ok:true,message:'🧪 '+id+' зарегистрирован.'};
}
var pack={id:PACK_ID,name:CLASS,source:SOURCE,metadata:{edition:'2024 / 5.5E',hitDie:8,primaryAbilities:['dexterity','intelligence'],savingThrows:['dexterity','intelligence'],skillsChoose:3,armor:['light'],weapons:['simple'],tools:['alchemist_supplies'],multiclass:{dexterity:13,intelligence:13},startingEquipment:['2 кинжала','Кожаный доспех','Инструменты алхимика','Алхимический огонь','Набор учёного','6 зм'],subclassLevel:3,subclassFeatureLevels:[3,6,10,14]},features:features,subclasses:subpacks,formulas:formulae,potions:potions,discoveries:discoveries,hooks:{sync:sync,useFeature:use}};
D.registerClass(pack);
g.CLASSES_REFERENCE=g.CLASSES_REFERENCE||{};
g.CLASSES_REFERENCE[CLASS]={source:SOURCE,hitDie:8,primaryStat:'dexterity',primaryAbilities:['dexterity','intelligence'],savingThrows:['dexterity','intelligence'],subclassLevel:3,subclassFeatureLevels:[3,6,10,14],contentPackId:PACK_ID};
g.SUBCLASSES_REFERENCE=g.SUBCLASSES_REFERENCE||{};g.SUBCLASSES_REFERENCE[CLASS]={};
subpacks.forEach(function(s){var lv={};s.features.forEach(function(f){lv[f.level]=lv[f.level]||{features:[]};lv[f.level].features.push(f.name);});g.SUBCLASSES_REFERENCE[CLASS][s.name]={source:SOURCE,description:s.description,pickLevel:3,levels:lv};});
g.ALCHEMIST_MHP_2024={VERSION:'1.0.0',PACK_ID:PACK_ID,formulae:formulae,potions:potions,discoveries:discoveries,subclasses:subpacks.map(function(s){return{id:s.id,name:s.name};})};
})(window);
