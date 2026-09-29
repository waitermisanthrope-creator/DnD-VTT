/**
 * Warden.js
 * Карманный ВТТ — класс «Страж».
 * Источник механики: Mage Hand Press, Warden 2024 / 5.5E.
 *
 * Базовое ядро реализовано отдельно от Champion Calls:
 * Guardian Tactics, Sentinel's Stand, Interrupt, Mettle, Survive,
 * Sentinel's Strike, Font of Life, Extended Tactics, Improved Resolve,
 * Sentinel's Soul и Legendary Resistance.
 */
(function(g){
  'use strict';
  var levels={};
  for(var i=1;i<=20;i++) levels[i]={features:[]};

  levels[1]={features:['Боевой стиль','Стойка часового','Мастерство оружия']};
  levels[2]={features:['Тактика стража','Непоколебимая решимость']};
  levels[3]={features:['Призвание стража'],subclassLevel:true};
  levels[4]={features:['Увеличение характеристик (ASI) или Черта'],asi:true};
  levels[5]={features:['Дополнительная атака','Перехват']};
  levels[6]={features:['Способность призвания стража']};
  levels[7]={features:['Стойкость']};
  levels[8]={features:['Увеличение характеристик (ASI) или Черта'],asi:true};
  levels[9]={features:['Выжить']};
  levels[10]={features:['Способность призвания стража']};
  levels[11]={features:['Удар часового']};
  levels[12]={features:['Увеличение характеристик (ASI) или Черта'],asi:true};
  levels[13]={features:['Источник жизни']};
  levels[14]={features:['Расширенная тактика']};
  levels[15]={features:['Улучшенная решимость']};
  levels[16]={features:['Увеличение характеристик (ASI) или Черта'],asi:true};
  levels[17]={features:['Способность призвания стража']};
  levels[18]={features:['Душа часового']};
  levels[19]={features:['Эпический дар']};
  levels[20]={features:['Легендарное сопротивление']};

  g.wardenProgression={
    className:'Страж',
    englishName:'Warden',
    source:'Mage Hand Press',
    status:'implemented_core',
    edition:'5.5E / 2024',
    hitDie:10,
    primaryStat:'strength',
    secondaryStat:'constitution',
    savingThrows:['strength','constitution'],
    armor:['light','medium','heavy','shields'],
    weapons:['simple','martial'],
    tools:[],
    multiclassRequirement:{strength:13},
    multiclassProficiencies:{armor:['light','medium','shields'],weapons:['martial']},
    skills:{choose:2,from:['animalHandling','athletics','insight','intimidation','medicine','perception','persuasion','survival']},
    subclassLevel:3,
    subclassFeatureLevels:[3,6,10,17],
    weaponMasteryLevels:{1:2,4:3,10:4},
    interruptUses:{5:3,9:4,13:5,17:6},
    sentinelStandChoices:[
      {id:'stalwartSpirit',name:'Стойкий дух',description:'Владение одним выбранным спасброском.'},
      {id:'steadfastToughness',name:'Несокрушимая стойкость',description:'Максимум HP увеличивается на модификатор Телосложения + уровень Стража.'},
      {id:'towerShield',name:'Башенный щит',description:'Щит даёт +3 AC вместо +2; с 10 уровня +4.'}
    ],
    sentinelStrikeChoices:[
      {id:'interdict',name:'Запрет',description:'При Перехвате совершить рукопашную атаку и восстановить Перехват при броске инициативы.'},
      {id:'shieldSlam',name:'Удар щитом',description:'Раз за ход после попадания оружием в пределах 5 футов нанести 1d8 + бонус AC щита.'},
      {id:'sweep',name:'Размашистый удар',description:'При Attack Action рукопашным оружием атаковать каждое выбранное существо в пределах 5 футов.'}
    ],
    sentinelSoulChoices:[
      {id:'allSeeing',name:'Всевидящий',description:'Blindsight 30 футов.'},
      {id:'fortified',name:'Укреплённый',description:'Атаки не получают преимущество против Стража, кроме состояния Incapacitated.'},
      {id:'unstoppable',name:'Неостановимый',description:'Можно проходить через пространство существ; меньшие существа сбиваются с ног.'}
    ],
    championCalls:[
      {id:'beastbloodGuardian',name:'Зверокровный хранитель'},
      {id:'carrionKing',name:'Король падали'},
      {id:'diabolist',name:'Диаболист'},
      {id:'drakeBlooded',name:'Драконокровный'},
      {id:'godsworn',name:'Богопоклятый'},
      {id:'greyWatchman',name:'Серый страж'},
      {id:'nightgaunt',name:'Ночной кошмар'},
      {id:'rimekeeper',name:'Хранитель изморози'},
      {id:'steelShepherd',name:'Стальной пастырь'},
      {id:'stoneheartDefender',name:'Каменносердечный защитник'},
      {id:'stormSentinel',name:'Грозовой часовой'},
      {id:'verdantProtector',name:'Защитник зелени'},
      {id:'witchbaneHunter',name:'Охотник на ведьм'}
    ],
    mechanics:{
      fightingStyle:'implemented',
      sentinelStand:'implemented',
      weaponMastery:'implemented',
      guardianTactics:'implemented',
      unyieldingResolve:'implemented',
      interrupt:'implemented',
      mettle:'implemented',
      survive:'implemented',
      sentinelStrike:'implemented',
      fontOfLife:'implemented',
      extendedTactics:'implemented',
      improvedResolve:'implemented',
      sentinelSoul:'implemented',
      legendaryResistance:'implemented',
      subclassSystem:'registered_deep_subclass_work_pending',
      notes:'Базовое ядро 2024/5.5E реализовано. Глубокие механики Champion Calls требуют отдельного прохода.'
    },
    levels:levels
  };
})(window);
