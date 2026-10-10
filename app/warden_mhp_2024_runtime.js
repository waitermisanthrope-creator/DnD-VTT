/**
 * warden_mhp_2024_runtime.js
 * ------------------------------------------------------------------
 * ЧТО ЭТО:
 * Частично реализованный runtime-пак класса «Страж» версии 2024/5.5E для Карманного ВТТ.
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
  var PACK_ID='mh-warden';
  var CLASS='Страж';

  function cls(h){return (h&&h.classes||[]).find(function(c){return [CLASS,'Warden'].indexOf(String(c.name))>=0;})||null;}
  function lvl(h){var c=cls(h);return c?Number(c.level)||0:0;}
  function state(h){h.classFeaturesState=h.classFeaturesState||{};return h.classFeaturesState;}
  function res(h,id,max,recharge){
    h.resources=h.resources||{};var r=h.resources[id],n=Math.max(0,Number(max)||0);
    if(!r)r=h.resources[id]={max:n,current:n};
    else {var used=Math.max(0,(Number(r.max)||0)-(Number(r.current)||0));r.current=Math.max(0,n-used);r.max=n;}
    r.recharge=recharge||'none';return r;
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
  function hp(h){return Number(h.hpCurrent!=null?h.hpCurrent:h.hp&&typeof h.hp==='object'?h.hp.current:h.hp!=null?h.hp:h.hitPoints)||0;}
  function maxHp(h){return Number(h.hpMax!=null?h.hpMax:h.maxHp!=null?h.maxHp:h.hp&&h.hp.max!=null?h.hp.max:h.maxHitPoints)||0;}
  function bloodied(h){return maxHp(h)>0&&hp(h)>0&&hp(h)<=maxHp(h)/2;}
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

  BASE.push(['chooseCall','Выбор Призвания стража',3,'Выберите одно из 13 Призваний.','choice']);
  var features=BASE.map(function(x){return{id:'warden-'+x[0],name:x[1],level:x[2],action:x[4],description:x[3]};});
  var subclassPacks=SUBS.map(function(s){
    return {id:s.id,name:s.name,description:s.desc,features:s.f.map(function(x){
      return{id:'warden-'+s.id+'-'+x[0],name:x[1],level:Number(x[0]),action:'subclass',description:x[2]};
    }),magic:s.magic||[]};
  });

  var CONDITIONS={blinded:'Ослеплён',charmed:'Очарован',deafened:'Оглохший',frightened:'Испуган',paralyzed:'Парализован',poisoned:'Отравлен',stunned:'Оглушён',restrained:'Опутан'};
  var LABELS={stalwartSpirit:'Стойкий дух',steadfastToughness:'Несокрушимая стойкость',towerShield:'Башенный щит',interdict:'Запрет',shieldSlam:'Удар щитом',sweep:'Размашистый удар',allSeeing:'Всевидящий',fortified:'Укреплённый',unstoppable:'Неостановимый'};
  function chosen(h){var c=cls(h);return c&&SUBS.find(function(x){return x.id===c.subclass||x.name===c.subclass;})||null;}
  function available(h,id){return !!(D.resolveFeature&&D.resolveFeature(h,'warden-'+id,CLASS));}
  function fail(message){return {ok:false,unsupported:true,message:message||'Исполнение этой способности Стража ещё не подключено.'};}
  function normalizeCondition(v){var raw=String(v||''),key=CONDITIONS[raw.toLowerCase()]||raw;return g.DNDRules&&g.DNDRules.normalizeConditionName?g.DNDRules.normalizeConditionName(key):key;}
  function hasCondition(h,key){return [h.conditions,h.activeConditions].some(function(m){return m&&Object.keys(m).some(function(k){return m[k]&&normalizeCondition(k)===key;});});}
  function clearCondition(h,key){
    [h.conditions,h.activeConditions].forEach(function(m){if(m)Object.keys(m).forEach(function(k){if(normalizeCondition(k)===key)delete m[k];});});
    if(g.DNDCombat)g.DNDCombat.toggleCondition(h,key,false);
  }
  function canAct(h){return hp(h)>0&&!['Недееспособен','Оглушён','Парализован','Бессознателен','Окаменел'].some(function(k){return hasCondition(h,k);});}
  function canReact(h){return hp(h)>0&&!['Недееспособен','Оглушён','Парализован','Бессознателен','Окаменел'].some(function(k){return hasCondition(h,k);})&&!(h.turnResources&&(h.turnResources.reaction===false||Number(h.turnResources.reaction)===0));}
  function takeReaction(h){h.turnResources=h.turnResources||{};h.turnResources.reaction=0;}
  function sync(h){
    var l=lvl(h);if(!l)return;var s=state(h),call=chosen(h);
    res(h,'wardenInterrupt',interruptMax(l),'short');res(h,'wardenFontOfLife',l>=13?2:0,'short');
    if(!h.resources.wardenSurvive&&s.wardenSurviveReady===false)h.resources.wardenSurvive={max:1,current:0};
    res(h,'wardenSurvive',l>=9?1:0,'long');res(h,'wardenLegendaryResistance',l>=20?3:0,'long');
    s.wardenSurviveReady=h.resources.wardenSurvive.current>0;
    s.wardenMasteryCount=masteryCount(l);s.wardenGuardianRange=l>=14?10:5;
    s.wardenBloodied=bloodied(h);s.wardenMettle=l>=7;s.wardenImprovedResolve=l>=15;
    s.wardenChosenCall=call?call.id:null;
    s.wardenWeaponMasteries=Array.isArray(s.wardenWeaponMasteries)?s.wardenWeaponMasteries.filter(Boolean):[];
    if(call&&call.id==='greyWatchman'&&l>=3)res(h,'wardenBattleDice',2,'short');
    if(call&&call.id==='stoneheartDefender'&&l>=10)res(h,'wardenStoneShield',1,'short');
    if(call&&call.id==='witchbaneHunter'&&l>=6)res(h,'wardenBreakSpell',1,'short');
    // Old scalar fields remain in the save but cannot grant another Call's mechanics.
    if(s.wardenMarkedExpiresAt&&s.wardenMarkedExpiresAt<=Date.now()){delete s.wardenMarkedTargetId;delete s.wardenMarkedExpiresAt;}
  }
  function choose(h,id,v){
    var maps={sentinelStand:['stalwartSpirit','steadfastToughness','towerShield'],sentinelStrike:['interdict','shieldSlam','sweep'],sentinelSoul:['allSeeing','fortified','unstoppable']};
    if(!maps[id]||maps[id].indexOf(v)<0)return fail('Недопустимый вариант выбора Стража.');
    state(h)['warden'+id.charAt(0).toUpperCase()+id.slice(1)]=v;
    return {ok:true,choiceSaved:true,message:'Выбор сохранён: '+LABELS[v]+'.',mechanicsPending:id==='sentinelStand'||(id==='sentinelSoul'&&v!=='fortified')};
  }
  function use(h,id,ctx){
    id=String(id||'').replace(/^warden-/,'');ctx=ctx||{};
    if(!available(h,id))return {ok:false,unavailable:true,message:'Способность недоступна текущему уровню или Призванию.'};
    sync(h);var l=lvl(h),s=state(h),t=target(ctx),B=g.DNDCombat,call=chosen(h);
    if(['sentinelStand','sentinelStrike','sentinelSoul'].indexOf(id)>=0)return choose(h,id,ctx.choice);
    if(id==='chooseCall'){
      var pick=SUBS.find(function(x){return x.id===ctx.call||x.name===ctx.call;});
      if(!pick)return fail('Выберите Призвание из списка.');
      if(cls(h).subclass&&(!call||call.id!==pick.id))return fail('Смена выбранного Призвания требует отдельной миграции.');
      cls(h).subclass=pick.name;sync(h);return {ok:true,message:'Призвание: '+pick.name+'.'};
    }
    if(id==='survive'){
      if(!B||hp(h)!==0||h.dead||h.instantDeath||ctx.instantDeath||h.deathSaves&&Number(h.deathSaves.failures)>=3)return fail('Выжить доступно при падении до 0 HP без мгновенной смерти.');
      if(!spend(h,'wardenSurvive',1))return fail('Выжить уже использовано до долгого отдыха.');
      var healing=B.heal(h,1+2*l);if('hitPoints' in h)h.hitPoints=hp(h);clearCondition(h,'Бессознателен');s.wardenSurviveReady=false;
      return {ok:true,healing:healing,hitPointsAfter:hp(h),message:'Выжить: восстановлено '+healing.amount+' HP.'};
    }
    if(id==='fontOfLife'){
      var key=normalizeCondition(ctx.condition),allowed=Object.keys(CONDITIONS).map(function(k){return normalizeCondition(CONDITIONS[k]);});
      if(ctx.atStartOfTurn!==true||allowed.indexOf(key)<0||!hasCondition(h,key))return fail('В начале хода выберите одно действующее состояние для снятия.');
      if(!spend(h,'wardenFontOfLife',1))return fail('Источник жизни исчерпан.');
      clearCondition(h,key);return {ok:true,conditionRemoved:key,message:'Источник жизни: снято состояние «'+key+'».'};
    }
    if(id==='legendaryResistance'){
      var save=ctx.saveResult;
      if(!save||save.success!==false||save.completed===true||!Number.isFinite(Number(save.dc))||!Number.isFinite(Number(save.total)))return fail('Нужен текущий проваленный спасбросок.');
      if(!spend(h,'wardenLegendaryResistance',1))return fail('Легендарное сопротивление исчерпано.');
      save.success=true;save.legendaryResistance=true;return {ok:true,saveResult:save,message:'Легендарное сопротивление: спасбросок успешен.'};
    }
    if(id==='interrupt'){
      if(!canReact(h)||ctx.pendingAttack!==true||ctx.multiAttackAction!==true||ctx.beforeRoll!==true||!t||!Number.isFinite(ctx.distanceFt)||ctx.distanceFt<0||ctx.distanceFt>s.wardenGuardianRange)return fail('Перехват требует реакцию и одну предстоящую атаку многоатакующего действия рядом.');
      if(!spend(h,'wardenInterrupt',1))return fail('Нет доступных Перехватов.');
      takeReaction(h);return {ok:true,interrupted:true,target:t.id,message:'Перехват: одна атака отменена до броска.'};
    }
    if(call&&id===call.id+'-3'&&call.id==='drakeBlooded'){
      var types={acid:'кислота',cold:'холод',fire:'огонь',lightning:'молния',poison:'яд'},el=String(ctx.damageType||'').toLowerCase();
      if(!types[el])el=Object.keys(types).find(function(k){return types[k]===el;});
      if(!el)return fail('Выберите кислоту, холод, огонь, молнию или яд.');
      if(s.wardenDragonType&&s.wardenDragonType!==el)return fail('Драконья стихия уже выбрана.');
      s.wardenDragonType=el;return {ok:true,message:'Драконья стихия: '+types[el]+'.'};
    }
    if(call&&id===call.id+'-3'&&call.id==='diabolist'){
      if(!t||!t.id||ctx.visible===false||!Number.isFinite(ctx.distanceFt)||ctx.distanceFt<0||ctx.distanceFt>30||!canAct(h)||h.turnResources&&Number(h.turnResources.bonusAction)===0)return fail('Нужна видимая цель в пределах 30 футов и бонусное действие.');
      s.wardenMarkedTargetId=t.id;s.wardenMarkedExpiresAt=Date.now()+60000;s.wardenMarkedRounds=10;
      h.turnResources=h.turnResources||{};h.turnResources.bonusAction=0;
      return {ok:true,target:t.id,message:'Инфернальная печать наложена на 1 минуту.'};
    }
    if(call&&((call.id==='stoneheartDefender'&&id==='stoneheartDefender-10')||(call.id==='witchbaneHunter'&&id==='witchbaneHunter-6'))){
      var stone=call.id==='stoneheartDefender';
      if(!canReact(h)||ctx.pendingDamage!==true||!(Number(ctx.amount)>0)||!B||(!stone&&(ctx.source!=='spell'||ctx.visible===false)))return fail('Нужен подходящий входящий урон и доступная реакция.');
      var rid=stone?'wardenStoneShield':'wardenBreakSpell';if(!spend(h,rid,1))return fail('Защитная реакция исчерпана.');
      var reduce=B.rollDice(stone?'1d12':'1d10').total+(stone?mod(h,'con'):prof(h));takeReaction(h);
      return {ok:true,reduction:Math.min(Number(ctx.amount),Math.max(0,reduce)),message:stone?'Каменный щит уменьшил урон.':'Разрыв чар уменьшил урон заклинания.'};
    }
    return fail();
  }
  function resistance(h,type){
    if(!cls(h)||!D.isEnabled(PACK_ID))return false;var l=lvl(h),c=chosen(h),s=state(h);
    var aliases={bludgeoning:'дробящий',piercing:'колющий',slashing:'рубящий',force:'сила',necrotic:'некротический',psychic:'психический',radiant:'излучение',poison:'яд',fire:'огонь',cold:'холод',acid:'кислота',lightning:'молния'};
    var t=aliases[type]||type;
    if(l>=2&&bloodied(h)&&['дробящий','колющий','рубящий'].indexOf(t)>=0)return true;
    if(l>=15&&bloodied(h)&&Object.values(aliases).concat(['гром','кислота','холод','огонь','молния','яд']).indexOf(t)>=0&&['сила','силовой','некротический','психический','излучение','сияние'].indexOf(t)<0)return true;
    if(c&&l>=3){if(['carrionKing','stoneheartDefender'].indexOf(c.id)>=0&&t==='яд')return true;if(c.id==='diabolist'&&t==='огонь')return true;if(c.id==='rimekeeper'&&t==='холод')return true;if(c.id==='drakeBlooded'&&aliases[s.wardenDragonType]===t)return true;}
    return false;
  }
  function incoming(h,ctx){return {removeAdvantage:available(h,'sentinelSoul')&&state(h).wardenSentinelSoul==='fortified'&&canAct(h)};}
  function reduction(h,ctx){
    var id=ctx.defenderReaction==='warden-stoneShield'?'stoneheartDefender-10':ctx.defenderReaction==='warden-breakSpell'?'witchbaneHunter-6':null;
    if(!id||!available(h,id))return {reduction:0};var r=use(h,id,Object.assign({},ctx,{pendingDamage:true}));return {reduction:r.ok?r.reduction:0};
  }
  function attack(h,ctx){
    sync(h);ctx=ctx||{};var s=state(h),c=chosen(h),o={extraAttacks:lvl(h)>=5?2:1,typedExtraDice:[],notes:[]};
    if(!c||lvl(h)<3||s.wardenDamageUsed||ctx.weaponAttack!==true)return o;
    if(c.id==='diabolist'&&s.wardenMarkedExpiresAt>Date.now()&&ctx.target&&String(ctx.target.id)===String(s.wardenMarkedTargetId))o.typedExtraDice.push({dice:'1d6',type:'fire',label:'Инфернальная печать'});
    if(c.id==='stormSentinel')o.typedExtraDice.push({dice:'1d6',type:'lightning',label:'Грозовая метка'});
    if(c.id==='witchbaneHunter'&&ctx.target&&ctx.target.concentration&&ctx.target.concentration.active)o.typedExtraDice.push({dice:'1d6',type:'force',label:'Охотник на колдовство'});
    return o;
  }
  function afterAttack(h,ctx){var a=ctx&&ctx.attackResult;if(a&&a.hit&&a.damage&&Array.isArray(a.damage.typedExtraDice)&&a.damage.typedExtraDice.some(function(x){return ['Инфернальная печать','Грозовая метка','Охотник на колдовство'].indexOf(x.label)>=0;}))state(h).wardenDamageUsed=true;}
  function saveMod(h,ctx){var c=chosen(h);return {mettle:lvl(h)>=7&&['con','constitution'].indexOf(ctx.stat)>=0&&ctx.halfDamageEffect===true,advantage:!!(c&&lvl(h)>=3&&((c.id==='witchbaneHunter'&&ctx.fromSpell)||(c.id==='carrionKing'&&['poisoned','Отравлен'].indexOf(ctx.saveType)>=0))),notes:[]};}
  function start(h){sync(h);state(h).wardenDamageUsed=false;}
  function end(h){var s=state(h);if(s.wardenMarkedRounds){s.wardenMarkedRounds--;if(!s.wardenMarkedRounds){delete s.wardenMarkedTargetId;delete s.wardenMarkedExpiresAt;}}}
  function rest(h,type){sync(h);if(type==='short'||type==='long'){var s=state(h);delete s.wardenMarkedTargetId;delete s.wardenMarkedExpiresAt;delete s.wardenMarkedRounds;s.wardenDamageUsed=false;}if(type==='long')state(h).wardenSurviveReady=lvl(h)>=9;}
  var pack={id:PACK_ID,name:CLASS,aliases:['Warden'],source:SOURCE,license:'Structured implementation; no source-book text embedded',authoritativeSubclasses:true,subclassLevel:3,
    features:features,subclasses:subclassPacks,hooks:{sync:sync,useFeature:use,attackModifiers:attack,saveModifiers:saveMod,damageReduction:reduction,onAttackResult:afterAttack,startTurn:start,onTurnEnd:end,rest:rest},
    metadata:{status:'implemented_partial_runtime',edition:'2024 / 5.5E',hitDie:10,savingThrows:['strength','constitution'],subclassLevel:3,subclassFeatureLevels:[3,6,10,17],calls:SUBS.map(function(x){return x.name;})}};
  D.registerClass(pack);
  g.wardenProgression.status='implemented_partial_runtime';g.wardenProgression.mechanics.notes='Есть исполняемые базовые и отдельные защитные эффекты; остальные механики и Призвания требуют реализации. См. аудит.';
  var ref={hitDie:10,primaryStat:'strength',savingThrows:['strength','constitution'],progression:{levels:g.wardenProgression.levels},subclassLevel:3,subclassFeatureLevels:[3,6,10,17],source:SOURCE,contentPackId:PACK_ID};
  g.CLASSES_REFERENCE=g.CLASSES_REFERENCE||{};g.SUBCLASSES_REFERENCE=g.SUBCLASSES_REFERENCE||{};
  [CLASS,'Warden'].forEach(function(name){g.CLASSES_REFERENCE[name]=ref;g.SUBCLASSES_REFERENCE[name]={};subclassPacks.forEach(function(x){var levels={};x.features.forEach(function(f){levels[f.level]={features:[f.name]};});g.SUBCLASSES_REFERENCE[name][x.name]={source:SOURCE,description:x.description,pickLevel:3,levels:levels,magic:x.magic};});});
  if(Array.isArray(g.DND_CLASSES_LIST)){var i=g.DND_CLASSES_LIST.findIndex(function(x){return x.name==='Warden';});if(i>=0)g.DND_CLASSES_LIST.splice(i,1);}
  g.MULTICLASS_CLASS_REQUIREMENTS=g.MULTICLASS_CLASS_REQUIREMENTS||{};g.MULTICLASS_CLASS_REQUIREMENTS[CLASS]=g.MULTICLASS_CLASS_REQUIREMENTS.Warden={all:[['strength',13]]};
  g.WARDEN_MHP_2024={VERSION:'1.1.0-audit',PACK_ID:PACK_ID,subclasses:SUBS.map(function(x){return {id:x.id,name:x.name};}),baseFeatures:features.map(function(x){return x.name;}),sync:sync,useFeature:use,resistance:resistance,incomingAttackModifiers:incoming,rest:rest};
})(window);
