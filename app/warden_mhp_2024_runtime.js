/**
 * warden_mhp_2024_runtime.js
 * ------------------------------------------------------------------
 * ЧТО ЭТО:
 * Полный runtime-пак класса «Страж» версии 2024/5.5E для Карманного ВТТ.
 *
 * КАК РАБОТАЕТ:
 * - заменяет старый смешанный runtime Стража отдельным паком Mage Hand Press;
 * - синхронизирует ресурсы Стража и выбранные варианты Sentinel's Stand,
 *   Sentinel's Strike и Sentinel's Soul;
 * - регистрирует все 13 Champion Calls и их способности 3/6/10/17;
 * - отдаёт боевому движку структурированные effects/attack modifiers;
 * - сохраняет русские названия и отдельные sourceKey для UI/тестов.
 *
 * ВАЖНО:
 * Это самостоятельный runtime-слой с краткими оригинальными описаниями
 * механик, а не копия текста книги.
 * ------------------------------------------------------------------
 */
(function(g){
  'use strict';
  var D=g.DNDContent;
  if(!D)return;

  var SOURCE='Mage Hand Press — Warden 2024 / 5.5E';
  var PACK_ID='mhp-warden-2024';
  var CLASS='Страж';

  function cls(h){return (h&&h.classes||[]).find(function(c){return String(c.name)===CLASS;})||null;}
  function lvl(h){var c=cls(h);return c?Number(c.level)||0:0;}
  function state(h){h.classFeaturesState=h.classFeaturesState||{};return h.classFeaturesState;}
  function res(h,id,max,recharge){
    h.resources=h.resources||{};
    var r=h.resources[id];
    if(!r||Number(r.max)!==Number(max)) h.resources[id]={max:Number(max),current:r?Math.min(Number(r.current)||0,Number(max)):Number(max),recharge:recharge||'none'};
    else h.resources[id].recharge=recharge||r.recharge||'none';
    return h.resources[id];
  }
  function spend(h,id,n){
    var r=h.resources&&h.resources[id],v=Math.max(1,Number(n)||1);
    if(!r||Number(r.current)<v)return false;
    r.current-=v;return true;
  }
  function mod(h,k){
    var a=h&&((h.abilityScores)||h.stats)||{}, aliases={str:'strength',dex:'dexterity',con:'constitution',int:'intelligence',wis:'wisdom',cha:'charisma'};
    var v=a[k]!==undefined?a[k]:a[aliases[k]];
    v=Number(v);return isFinite(v)?Math.floor((v-10)/2):0;
  }
  function prof(h){return Math.max(2,Number(h&&h.proficiencyBonus)||Math.floor((levelTotal(h)-1)/4)+2);}
  function levelTotal(h){return (h&&h.classes||[]).reduce(function(a,c){return a+(Number(c.level)||0);},0);}
  function target(ctx){return ctx&&ctx.target||null;}
  function bloodied(h){
    var max=Number(h&&((h.maxHitPoints)||(h.hpMax)||(h.maxHP)||(h.hp&&h.hp.max)))||0;
    var cur=Number(h&&((h.hitPoints)||(h.hpCurrent)||(h.currentHP)||(h.hp&&h.hp.current)))||0;
    return max>0&&cur<=max/2;
  }
  function interruptMax(l){return l>=17?6:l>=13?5:l>=9?4:l>=5?3:0;}
  function masteryCount(l){return l>=10?4:l>=4?3:2;}
  function battleDie(l){return l>=13?'1d8':'1d6';}

  var SUBS=[
    {id:'beastbloodGuardian',name:'Зверокровный хранитель',desc:'Защитник зверей, использующий первобытную ярость, охотничьи чувства и звериную форму.',
      f:[
        ['3','Звериный инстинкт','Получите мастерство в одной из природных навыков; проверки выбранного навыка получают бонус Телосложения. Пока вы кровоточите, один раз после инициативы можете получить преимущество на атаки до конца хода.'],
        ['6','Первобытный рывок','Когда вы используете Рывок, можете переместиться к существу и нанести дополнительный урон при первом попадании; скорость не провоцирует атаки возможности от выбранной добычи.'],
        ['10','Свирепый страж','Вы получаете сопротивление урону от зверей и природных опасностей; когда союзник рядом получает урон от зверя, можете реакцией уменьшить этот урон.'],
        ['17','Аватар первозверя','Бонусным действием на 1 минуту усиливаете себя: скорость +10 фт, преимущество на Силу/Телосложение, дополнительная кость урона раз в ход; 1/короткий отдых.']
      ]},
    {id:'carrionKing',name:'Король падали',desc:'Страж паразитов, падали и существ, которых другие считают отбросами.',
      f:[
        ['3','Гниющая корона','Получаете сопротивление яду и преимущество против состояния Отравлен; первый удар по цели, которая уже кровоточит, наносит дополнительный некротический урон.'],
        ['6','Падальная стая','Когда враг рядом падает до 0 HP, можете реакцией переместиться на половину скорости и получить временные HP.'],
        ['10','Нечистая живучесть','Пока кровоточите, в начале хода получаете временные HP, равные модификатору Телосложения; при провале спасброска против болезни можете перебросить его.'],
        ['17','Владыка падали','Раз в долгий отдых создаёте вокруг себя 10-футовую ауру на 1 минуту: враги в ней получают некротический урон в начале хода и не могут получить преимущество от численного превосходства.']
      ]},
    {id:'diabolist',name:'Диаболист',desc:'Страж, связавший свою защитную клятву с силами исчадий и огненной магией.',
      f:[
        ['3','Инфернальная печать','Вы получаете сопротивление огню. Бонусным действием отмечаете существо в пределах 30 фт на 1 минуту; раз в ход первый удар по отмеченному существу наносит +1d6 огнём.'],
        ['6','Дьявольское возмездие','Когда отмеченный враг наносит урон вам или союзнику рядом, реакцией наносите ему 2d6 огня и можете переместить его на 5 фт к себе.'],
        ['10','Адская стойкость','Получаете преимущество против испуга и очарования; пока кровоточите, огненный урон от ваших атак игнорирует сопротивление огню один раз за ход.'],
        ['17','Врата преисподней','1/долгий отдых: на 1 минуту создаёте 15-футовую ауру огня. Враги, входящие в неё впервые за ход или начинающие в ней ход, делают спасбросок Ловкости; при провале получают 4d8 огня, при успехе половину.']
      ],magic:['Огненный снаряд','Адское возмездие','Огненная сфера','Стена огня']},
    {id:'drakeBlooded',name:'Драконокровный',desc:'Носитель драконьей силы, превращающей защиту в стихийную мощь.',
      f:[
        ['3','Драконья кровь','Выберите тип: кислота, холод, огонь, молния или яд. Получаете сопротивление выбранному типу и соответствующий стихийный урон для первобытных проявлений.'],
        ['6','Драконий ответ','Когда существо в пределах 5 фт попадает по вам, реакцией наносите ему 1d8 выбранного урона; при успешном спасброске Силы можете оттолкнуть его на 10 фт.'],
        ['10','Чешуйчатая защита','Пока не носите тяжёлую броню, получаете +1 AC. При кровоточащем состоянии бонус увеличивается до +2.'],
        ['17','Драконий облик','1/долгий отдых на 1 минуту получаете полёт 40 фт, иммунитет к выбранному типу и 30-футовое дыхание 6d8 с спасброском Ловкости на половину.']
      ]},
    {id:'godsworn',name:'Богопоклятый',desc:'Защитник, посвятивший стойкость выбранному божественному принципу.',
      f:[
        ['3','Священная клятва','Выберите сияние или тьму как источник силы. Получаете соответствующее сопротивление и можете один раз за короткий отдых добавить Мудрость к спасброску союзника в пределах 10 фт.'],
        ['6','Знак покровительства','Когда вы используете Block или Challenge, выбранный союзник получает временные HP, равные вашему бонусу мастерства.'],
        ['10','Непоколебимая вера','Иммунитет к принудительному изменению отношения; один раз за ход при провале спасброска Мудрости можете перебросить его.'],
        ['17','Аватар клятвы','1/долгий отдых на 1 минуту создаёте ауру 15 фт: союзники получают преимущество на спасброски, а ваши атаки наносят +1d8 сияющего или некротического урона.']
      ],magic:['Благословение','Защита от добра и зла','Снятие проклятия','Священное оружие']},
    {id:'greyWatchman',name:'Серый страж',desc:'Воин-часовой, превращающий позицию и манёвры в оружие.',
      f:[
        ['3','Боевые манёвры','Получаете 2 кости манёвров d6. Варианты: Обхват, Натиск, Подсечка, Молниеносная реакция, Размашистый удар, Ошеломляющий удар. Кости восстанавливаются при инициативе или коротком отдыхе.'],
        ['6','Непоколебимый импульс','Когда становитесь кровоточащим, восстанавливаете одну кость манёвра; 1 раз до следующей инициативы.'],
        ['10','Удержание линии','Пока действует Grasp, вы и союзники внутри зоны получаете преимущество на спасброски Силы, Ловкости и Телосложения.'],
        ['17','Нерушимый часовой','Бонусным действием на 1 минуту: в начале каждого хода возвращаете кость манёвра, манёвры получают дополнительную кость урона, а раз в ход получаете отдельное бонусное действие только для манёвра.']
      ]},
    {id:'nightgaunt',name:'Ночной кошмар',desc:'Страж тьмы, страха и внезапных атак из сумрака.',
      f:[
        ['3','Господство сумрака','Получаете тёмное зрение 60 фт или +30 фт к существующему. В тусклом свете можете использовать Challenge без слов.'],
        ['6','Шаг кошмара','Бонусным действием телепортируетесь на 30 фт из тьмы в тьму; следующая рукопашная атака получает преимущество.'],
        ['10','Аура ужаса','Враги в пределах 10 фт, которые начинают ход рядом с вами, делают спасбросок Мудрости; при провале Испуганы до начала вашего следующего хода.'],
        ['17','Воплощение кошмара','1/короткий отдых на 1 минуту становитесь полупрозрачным: сопротивление физическому урону, проход сквозь узкие щели и дополнительный 2d6 психического урона раз в ход.']
      ]},
    {id:'rimekeeper',name:'Хранитель изморози',desc:'Страж холода, замораживающий пространство и лишающий врагов движения.',
      f:[
        ['3','Ледяная клятва','Получаете сопротивление холоду. После попадания можете снизить скорость цели на 10 фт до начала вашего следующего хода.'],
        ['6','Ледяной барьер','Когда используете Block, союзник получает временные HP, равные 1d8 + Телосложение; при их потере нападающий замедляется.'],
        ['10','Заморозка земли','Grasp также превращает землю в труднопроходимую местность для врагов; первый добровольный отход из зоны требует спасброска Силы.'],
        ['17','Вечная зима','1/долгий отдых: 1 минуту создаёте 20-футовую ледяную область; враги в ней замедлены, а раз в ход получают 3d8 холода при провале спасброска Телосложения.']
      ]},
    {id:'steelShepherd',name:'Стальной пастырь',desc:'Защитник ремесленников и созданий из металла, мастер брони и щита.',
      f:[
        ['3','Стальной пастух','Получаете владение инструментами кузнеца. Пока держите щит, первый полученный физический урон за ход уменьшается на бонус мастерства.'],
        ['6','Перенаправление удара','Когда Block защищает союзника, реакцией можете перенести на себя часть следующего урона, а затем уменьшить его на AC щита.'],
        ['10','Железная форма','Получаете преимущество против сбивания с ног и перемещения силой; тяжёлая броня больше не снижает вашу скорость.'],
        ['17','Стальная бастиона','1/долгий отдых на 1 минуту: союзники в 10 фт получают +2 AC, а вы получаете сопротивление всему урону кроме психического и силового.']
      ]},
    {id:'stoneheartDefender',name:'Каменносердечный защитник',desc:'Страж земли, массы и неподвижной обороны.',
      f:[
        ['3','Каменное сердце','Получаете сопротивление яду и преимущество против сбивания с ног. Если стоите на земле, вас нельзя сдвинуть против воли более чем на 5 фт за один эффект.'],
        ['6','Тяжесть горы','Когда попадаете рукопашной атакой, можете снизить скорость цели до 0 до начала вашего следующего хода.'],
        ['10','Каменный щит','Реакцией уменьшаете получаемый урон на 1d12 + модификатор Телосложения. Использование восстанавливается при коротком отдыхе.'],
        ['17','Аватар горы','1/долгий отдых на 1 минуту получаете сопротивление физическому урону, иммунитет к принудительному перемещению и можете проходить через разрушимые препятствия без проверки.']
      ]},
    {id:'stormSentinel',name:'Грозовой часовой',desc:'Страж грозы, превращающий реакцию и движение в электрическую защиту.',
      f:[
        ['3','Грозовая метка','Раз в ход после попадания наносите +1d6 молнией. При Block или Challenge можете пометить цель до начала следующего хода.'],
        ['6','Разряд стража','Когда отмеченная цель атакует не вас, реакцией наносите ей 2d6 молнии и перемещаетесь на 10 фт к ней без атак возможности.'],
        ['10','Громовой шаг','После успешного спасброска Ловкости можете телепортироваться на 15 фт. Скорость +10 фт.'],
        ['17','Аватар бури','1/долгий отдых на 1 минуту получаете полёт 40 фт и ауру 10 фт; враги, начинающие ход в ауре, получают 2d8 молнии, спасбросок Ловкости на половину.']
      ]},
    {id:'verdantProtector',name:'Защитник зелени',desc:'Страж растений и живой природы, управляющий корнями и лесом.',
      f:[
        ['3','Цепкие лозы','Зона Grasp увеличивается до 10 фт для наземных существ. Вы получаете владение Природой, Скрытностью или Выживанием и бонус Телосложения к выбранному навыку.'],
        ['6','Выращиватель','В начале вашего хода можете создать рядом с собой малую растительную преграду, дающую укрытие до начала следующего хода.'],
        ['10','Лесной страж','Когда враг входит в вашу зону Grasp, можете реакцией опутать его; спасбросок Силы или состояние Restrained до конца следующего хода.'],
        ['17','Древесный аватар','1/долгий отдых на 1 минуту: размер увеличивается на категорию, скорость +10 фт, сопротивление физическому урону и атаки получают +1d8 дробящего/рубящего урона.']
      ]},
    {id:'witchbaneHunter',name:'Охотник на ведьм',desc:'Специалист по разрушению чар, проклятий и сверхъестественных угроз.',
      f:[
        ['3','Охотник на колдовство','Получаете преимущество на проверки обнаружения магии и спасброски против заклинаний. Раз в ход первая атака по существу под действием заклинания наносит +1d6 силового урона.'],
        ['6','Разрыв чар','Реакцией после видимого применения заклинания в пределах 30 фт можете снизить его урон на 1d10 + бонус мастерства; 1/короткий отдых.'],
        ['10','Магический дозор','Получаете Чувство магии 30 фт. Ваша Fortified/Block-защита также распространяется на броски атаки заклинаниями.'],
        ['17','Великий охотник','1/долгий отдых на 1 минуту: иммунитет к очарованию и испугу, преимущество на спасброски против магии и один раз за ход можете автоматически сорвать заклинание до 3 круга, направленное на вас.']
      ],magic:['Обнаружение магии','Рассеивание магии','Контрзаклинание','Снятие проклятия']}
  ];

  var BASE=[
    ['fightingStyle','Боевой стиль',1,'Выбор боевого стиля; его можно заменить при повышении уровня.','choice'],
    ['sentinelStand','Стойка часового',1,'Выберите Стойкий дух, Несокрушимую стойкость или Башенный щит. Выбор можно заменить при повышении уровня.','choice'],
    ['weaponMastery','Мастерство оружия',1,'Мастерство двух видов простого или воинского оружия; число известных мастерств растёт на 4 и 10 уровнях.','passive'],
    ['guardianBlock','Тактика: Блок',2,'Бонусным действием выравнивает AC выбранного союзника с вашим AC, пока он находится рядом.','bonus'],
    ['guardianChallenge','Тактика: Вызов',2,'Бонусным действием провоцирует врага атаковать вас вместо других целей в пределах зоны.','bonus'],
    ['guardianGrasp','Тактика: Захват',2,'Бонусным действием создаёт зону, из которой врагам нельзя добровольно отойти без Отхода.','bonus'],
    ['unyieldingResolve','Непоколебимая решимость',2,'Пока вы кровоточите, сопротивляетесь дробящему, колющему и рубящему урону.','passive'],
    ['interrupt','Перехват',5,'Реакцией прерывает одну атаку или способность многоатакующего действия врага рядом с вами до броска.','reaction'],
    ['mettle','Стойкость',7,'При успешном спасброске Телосложения против эффекта на половину урона получаете 0 вместо половины.','passive'],
    ['survive','Выжить',9,'При падении до 0 HP можете остаться на 1 HP и восстановить HP, равные удвоенному уровню Стража. 1/долгий отдых.','reaction'],
    ['sentinelStrike','Удар часового',11,'Выберите Запрет, Удар щитом или Размашистый удар.','choice'],
    ['fontOfLife','Источник жизни',13,'В начале своего хода без действия снимаете одно из тяжёлых состояний. 2 использования.','passive'],
    ['extendedTactics','Расширенная тактика',14,'Дальность Guardian Tactics увеличивается до 10 фт.','passive'],
    ['improvedResolve','Улучшенная решимость',15,'Пока кровоточите, сопротивляетесь почти всем типам урона кроме Force, Necrotic, Psychic и Radiant.','passive'],
    ['sentinelSoul','Душа часового',18,'Выберите Всевидящего, Укреплённого или Неостановимого.','choice'],
    ['legendaryResistance','Легендарное сопротивление',20,'Три раза за долгий отдых можете превратить провал спасброска в успех.','reaction']
  ];

  var features=BASE.map(function(x){return{id:'warden-'+x[0],name:x[1],level:x[2],action:x[4],description:x[3]};});
  var subclassPacks=SUBS.map(function(s){
    return {id:s.id,name:s.name,description:s.desc,features:s.f.map(function(x){
      return{id:'warden-'+s.id+'-'+x[0],name:x[1],level:Number(x[0]),action:'subclass',description:x[2]};
    }),magic:s.magic||[]};
  });

  function sync(h){
    var l=lvl(h);if(!l)return;
    var s=state(h);
    var ir=res(h,'wardenInterrupt',interruptMax(l),'short');ir.max=interruptMax(l);
    res(h,'wardenFontOfLife',l>=13?2:0,'short');
    res(h,'wardenLegendaryResistance',l>=20?3:0,'long');
    res(h,'wardenSecondWind',1,'short');
    s.wardenMasteryCount=masteryCount(l);
    s.wardenGuardianRange=l>=14?10:5;
    s.wardenSentinelStand=s.wardenSentinelStand||'stalwartSpirit';
    s.wardenSentinelStrike=s.wardenSentinelStrike||'interdict';
    s.wardenSentinelSoul=s.wardenSentinelSoul||'allSeeing';
    s.wardenSurviveReady=s.wardenSurviveReady!==false;
    s.wardenMettle=l>=7;
    s.wardenBloodied=bloodied(h);
    s.wardenImprovedResolve=l>=15;
    s.wardenChosenCall=s.wardenChosenCall||null;
    s.wardenWeaponMasteries=s.wardenWeaponMasteries||[];
    if(l>=4&&s.wardenWeaponMasteries.length<3)s.wardenWeaponMasteries.length=3;
    if(l>=10&&s.wardenWeaponMasteries.length<4)s.wardenWeaponMasteries.length=4;
  }

  function choice(h,id,v){
    sync(h);var s=state(h);
    var maps={
      sentinelStand:['stalwartSpirit','steadfastToughness','towerShield'],
      sentinelStrike:['interdict','shieldSlam','sweep'],
      sentinelSoul:['allSeeing','fortified','unstoppable']
    };
    if(!maps[id]||maps[id].indexOf(v)<0)return{ok:false,message:'Недопустимый вариант выбора Стража.'};
    s['warden'+id.charAt(0).toUpperCase()+id.slice(1)]=v;
    return{ok:true,message:'Выбор Стража сохранён: '+v+'.'};
  }

  function subclassFeature(h,sub,id,ctx){
    var s=state(h),l=lvl(h),t=target(ctx),key=sub.id+':'+id;
    if(sub.id==='greyWatchman'){
      if(id==='3'){res(h,'wardenBattleDice',2,'short');return{ok:true,message:'⚔️ Боевые кости: 2d6.'};}
      if(id==='6')return{ok:true,effect:{restoreResource:'wardenBattleDice',trigger:'bloodied'},message:'⚔️ Непоколебимый импульс подготовлен.'};
      if(id==='10')return{ok:true,effect:{guardianGraspSaveAdvantage:true},message:'🛡️ Удержание линии активно.'};
      if(id==='17')return{ok:true,effect:{battleDiceRecovery:true,bonusBattleDieDamage:true,extraManeuverBonusAction:true},message:'⚔️ Нерушимый часовой активирован.'};
    }
    if(sub.id==='diabolist'&&id==='3'){s.wardenMarkedTargetId=t&&t.id;return{ok:true,target:t&&t.id,effect:{mark:'infernal',extraDamage:'1d6 fire'},message:'🔥 Инфернальная печать наложена.'};}
    if(sub.id==='nightgaunt'&&id==='6')return{ok:true,effect:{teleportFt:30,advantageNextMelee:true},message:'🌑 Шаг кошмара выполнен.'};
    if(sub.id==='stormSentinel'&&id==='6')return{ok:true,target:t&&t.id,effect:{reaction:true,damage:'2d6 lightning',moveTowardFt:10},message:'⚡ Разряд стража подготовлен.'};
    if(sub.id==='stoneheartDefender'&&id==='10')return{ok:true,effect:{damageReduction:'1d12 + CON',recharge:'short'},message:'🪨 Каменный щит готов.'};
    if(sub.id==='witchbaneHunter'&&id==='6')return{ok:true,effect:{spellDamageReduction:'1d10 + proficiency',recharge:'short'},message:'🔮 Разрыв чар готов.'};
    if(sub.id==='rimekeeper'&&id==='10')return{ok:true,effect:{graspDifficultTerrain:true,forcedMoveSave:'str'},message:'❄️ Заморозка земли активна.'};
    if(sub.id==='verdantProtector'&&id==='10')return{ok:true,effect:{graspRestrainedReaction:true,save:'str'},message:'🌿 Лесной страж готов.'};
    if(sub.id==='steelShepherd'&&id==='6')return{ok:true,effect:{redirectBlockDamage:true,reduceBy:'shieldAC'},message:'🛡️ Перенаправление удара готово.'};
    if(sub.id==='beastbloodGuardian'&&id==='3'){s.wardenBeastFuryReady=true;return{ok:true,message:'🐺 Звериная ярость доступна при кровоточащем состоянии.'};}
    if(sub.id==='carrionKing'&&id==='6')return{ok:true,effect:{tempHpOnEnemyDeath:'1d8 + CON',reactionMoveHalfSpeed:true},message:'☠️ Падальная стая активна.'};
    if(sub.id==='drakeBlooded'&&id==='6')return{ok:true,target:t&&t.id,effect:{reactionDamage:'1d8 elemental',pushOnSaveFailFt:10},message:'🐉 Драконий ответ готов.'};
    if(sub.id==='godsworn'&&id==='6')return{ok:true,effect:{blockTempHp:'proficiency'},message:'✨ Знак покровительства активен.'};
    return{ok:true,passive:true,message:'✨ '+sub.name+': '+(id||'особенность')+' активна.'};
  }

  function use(h,id,ctx,feature){
    id=String(id||'').replace(/^warden-/,'');
    sync(h);ctx=ctx||{};var s=state(h),l=lvl(h),t=target(ctx),range=s.wardenGuardianRange||5;
    if(id==='sentinelStand'||id==='sentinelStrike'||id==='sentinelSoul')return choice(h,id,ctx.choice);
    if(id==='guardianBlock'){
      if(!t)return{ok:false,message:'Выберите союзника.'};
      s.wardenBlockedAllyId=t.id;return{ok:true,target:t.id,effect:{guardianTactic:'block',rangeFt:range,acEqualsSelf:true,duration:'untilStartOfTurn'},message:'🛡️ Блок применён.'};
    }
    if(id==='guardianChallenge'){
      if(!t)return{ok:false,message:'Выберите врага.'};
      s.wardenChallengedTargetId=t.id;return{ok:true,target:t.id,effect:{guardianTactic:'challenge',rangeFt:range,disadvantageAgainstOthers:true,duration:'untilStartOfTurn'},message:'🎯 Вызов применён.'};
    }
    if(id==='guardianGrasp')return{ok:true,effect:{guardianTactic:'grasp',emanationFt:range,requiresDisengage:true,duration:'untilStartOfTurn'},message:'⛓️ Захват активирован.'};
    if(id==='interrupt'){
      if(!spend(h,'wardenInterrupt',1))return{ok:false,message:'Нет доступных Перехватов.'};
      return{ok:true,target:t&&t.id,effect:{reaction:true,interruptOneAttackOrAbility:true,chooseBeforeRoll:true},message:'✋ Перехват выполнен.'};
    }
    if(id==='survive'){
      if(!s.wardenSurviveReady)return{ok:false,message:'Выжить уже использовано.'};
      s.wardenSurviveReady=false;return{ok:true,effect:{setHP:1,healHP:2*l},message:'🛡️ Выжить: 1 HP + '+(2*l)+' HP.'};
    }
    if(id==='fontOfLife'){
      if(!spend(h,'wardenFontOfLife',1))return{ok:false,message:'Источник жизни исчерпан.'};
      return{ok:true,effect:{endCondition:true,conditions:['blinded','charmed','deafened','frightened','paralyzed','poisoned','stunned','restrained'],noAction:true},message:'✨ Источник жизни снял состояние.'};
    }
    if(id==='legendaryResistance'){
      if(!spend(h,'wardenLegendaryResistance',1))return{ok:false,message:'Легендарное сопротивление исчерпано.'};
      return{ok:true,effect:{saveSucceeds:true},message:'👑 Спасбросок считается успешным.'};
    }
    if(id==='sentinelStrikeInterdict'){
      if(s.wardenSentinelStrike!=='interdict')return{ok:false,message:'Выбран другой Удар часового.'};
      if(!spend(h,'wardenInterrupt',1))return{ok:false,message:'Нет Перехвата.'};
      return{ok:true,target:t&&t.id,effect:{reaction:true,interruptOneAttackOrAbility:true,bonusMeleeAttack:true,restoreInterruptOnInitiative:true},message:'⚔️ Запрет: Перехват с ответной атакой.'};
    }
    if(id==='sentinelStrikeShieldSlam'){
      if(s.wardenSentinelStrike!=='shieldSlam')return{ok:false,message:'Выбран другой Удар часового.'};
      return{ok:true,target:t&&t.id,effect:{shieldSlam:true,damage:'1d8 + shield AC bonus',oncePerTurn:true},message:'🛡️ Удар щитом.'};
    }
    if(id==='sentinelStrikeSweep'){
      if(s.wardenSentinelStrike!=='sweep')return{ok:false,message:'Выбран другой Удар часового.'};
      return{ok:true,effect:{sweepAttack:true,rangeFt:5},message:'⚔️ Размашистый удар.'};
    }
    if(id==='wardenSubclassFeature'){
      var sub=SUBS.find(function(x){return x.name===ctx.subclass||x.id===ctx.subclass;})||SUBS.find(function(x){return x.name===s.wardenChosenCall||x.id===s.wardenChosenCall;});
      if(!sub)return{ok:false,message:'Сначала выберите Призвание стража.'};
      return subclassFeature(h,sub,ctx.featureId||String(ctx.level||3),ctx);
    }
    var selected=feature&&feature.subclassId?SUBS.find(function(x){return x.id===feature.subclassId;}):SUBS.find(function(x){return x.name===ctx.subclass||x.id===ctx.subclass;});
    if(selected&&feature&&feature.subclassId)return subclassFeature(h,selected,String(feature.level),ctx);
    if(feature&&feature.action==='passive')return{ok:true,passive:true,message:'✨ '+feature.name+' активно.'};
    return{ok:true,message:'🛡️ '+(feature&&feature.name||id)+' подготовлено.'};
  }

  function attack(h,ctx){
    sync(h);var s=state(h),o={bonusDamage:0,extraDice:[],advantage:false,disadvantage:false,notes:[]};
    if(bloodied(h)&&s.wardenBeastFuryReady&&!s.wardenBeastFuryUsed){o.advantage=true;o.notes.push('Звериная ярость');s.wardenBeastFuryUsed=true;}
    if(s.wardenMarkedTargetId&&ctx&&ctx.target&&String(s.wardenMarkedTargetId)===String(ctx.target.id)){o.extraDice.push('1d6');o.notes.push('Инфернальная печать');}
    if(s.wardenSentinelSoul==='fortified')o.notes.push('Укреплённый');
    return o;
  }
  function saveMod(h,ctx){
    sync(h);var s=state(h),o={bonus:0,advantage:false,disadvantage:false,notes:[]};
    if(s.wardenMettle&&ctx&&ctx.ability==='constitution'&&ctx.halfDamageEffect){o.mettle=true;o.notes.push('Стойкость');}
    if(s.wardenSentinelSoul==='fortified')o.noAttackAdvantage=true;
    return o;
  }

  var pack={
    id:PACK_ID,name:CLASS,source:SOURCE,license:'Structured implementation; no source-book text embedded',
    features:features,
    subclasses:subclassPacks,
    hooks:{sync:sync,useFeature:use,attackModifiers:attack,saveModifiers:saveMod},
    metadata:{
      edition:'2024 / 5.5E',hitDie:10,primaryAbilities:['strength','constitution'],
      savingThrows:['strength','constitution'],armor:['light','medium','heavy','shields'],
      weapons:['simple','martial'],multiclass:{all:[['strength',13]]},
      subclassLevel:3,subclassFeatureLevels:[3,6,10,17],
      weaponMasteryLevels:{1:2,4:3,10:4},
      interruptUses:{5:3,9:4,13:5,17:6},
      calls:SUBS.map(function(s){return s.name;})
    }
  };

  D.registerClass(pack);

  if(g.SUBCLASSES_REFERENCE){
    g.SUBCLASSES_REFERENCE[CLASS]={};
    subclassPacks.forEach(function(s){
      var levels={};
      s.features.forEach(function(f){levels[f.level]=levels[f.level]||{features:[]};levels[f.level].features.push(f.name);});
      g.SUBCLASSES_REFERENCE[CLASS][s.name]={source:SOURCE,description:s.description,pickLevel:3,levels:levels,magic:s.magic||[]};
    });
  }

  g.CLASSES_REFERENCE=g.CLASSES_REFERENCE||{};
  g.CLASSES_REFERENCE[CLASS]={hitDie:10,primaryStat:'strength',primaryAbilities:['strength','constitution'],savingThrows:['strength','constitution'],progression:{levels:(function(){var z={};for(var i=1;i<=20;i++)z[i]={features:[]};features.forEach(function(f){z[f.level].features.push(f.name);});[4,8,12,16,19].forEach(function(i){z[i].asi=true;z[i].features.push(i===19?'Эпический дар':'Увеличение характеристик / черта');});z[3].subclassLevel=true;z[6].features.push('Способность Призвания стража');z[10].features.push('Способность Призвания стража');z[17].features.push('Способность Призвания стража');z[5].features.push('Дополнительная атака','Перехват');return z;})()},subclassLevel:3,subclassFeatureLevels:[3,6,10,17]},source:SOURCE,contentPackId:PACK_ID};
  g.WARDEN_MHP_2024={
    VERSION:'1.0.0',PACK_ID:PACK_ID,
    subclasses:SUBS.map(function(s){return{id:s.id,name:s.name};}),
    baseFeatures:features.map(function(f){return f.name;}),
    sync:sync,useFeature:use
  };
})(window);
