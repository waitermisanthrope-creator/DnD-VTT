/**
 * Pugilist.js
 * Карманный ВТТ — Пугилист (5.5E).
 *
 * Источник: Benjamin Huffman / Sterling Vermin Adventuring Co.
 * Этот файл описывает полную прогрессию класса и публичные данные,
 * используемые экраном создания персонажа и runtime-паком.
 */
(function(g){
  'use strict';

  var levels={};
  for(var i=1;i<=20;i++)levels[i]={features:[]};

  levels[1]={features:['Fisticuffs — Кулачный бой','Iron Chin — Железный подбородок']};
  levels[2]={features:['Moxie — Мокси','Street Smart — Уличная смекалка']};
  levels[3]={features:['Bloodied but Unbowed — Израненный, но не сломленный','Fight Club — Бойцовский клуб'],subclassLevel:true};
  levels[4]={features:['Увеличение характеристик (ASI) или Черта'],asi:true};
  levels[5]={features:['Extra Attack — Дополнительная атака','Haymaker — Сокрушительный удар']};
  levels[6]={features:['Fight Club — особенность клуба','Moxie-Fueled Fists — Кулаки, подпитанные Мокси']};
  levels[7]={features:['Fancy Footwork — Вычурная работа ногами','Shake It Off — Стряхнуть с себя']};
  levels[8]={features:['Увеличение характеристик (ASI) или Черта'],asi:true};
  levels[9]={features:['Down but Not Out — Ещё не повержен']};
  levels[10]={features:['School of Hard Knocks — Школа суровой жизни']};
  levels[11]={features:['Fight Club — особенность клуба']};
  levels[12]={features:['Увеличение характеристик (ASI) или Черта'],asi:true};
  levels[13]={features:['Rabble Rouser — Задира']};
  levels[14]={features:['Unbreakable — Несокрушимый']};
  levels[15]={features:['Herculean — Геркулесова сила']};
  levels[16]={features:['Увеличение характеристик (ASI) или Черта'],asi:true};
  levels[17]={features:['Fight Club — особенность клуба']};
  levels[18]={features:['Fighting Spirit — Боевой дух']};
  levels[19]={features:['Увеличение характеристик (ASI) или Черта'],asi:true};
  levels[20]={features:['Peak Physical Condition — Пиковая физическая форма']};

  g.pugilistProgression={
    className:'Пугилист',
    englishName:'Pugilist',
    source:'Benjamin Huffman / Sterling Vermin Adventuring Co.',
    status:'implemented_core',
    edition:'5.5E',
    hitDie:8,
    primaryStat:'strength',
    secondaryStat:'constitution',
    savingThrows:['strength','constitution'],
    armor:['light'],
    weapons:['simple','improvised','whip','hand_crossbow'],
    tools:{choose:1,from:['artisan_tools','gaming_set','thieves_tools']},
    multiclassRequirement:{strength:13,constitution:13},
    multiclassProficiencies:{armor:['light'],weapons:['improvised']},
    skills:{
      choose:2,
      from:['acrobatics','athletics','deception','intimidation','insight','perception','sleightOfHand','stealth','survival']
    },
    subclassLevel:3,
    subclassFeatureLevels:[3,6,11,17],
    subclassFeatureCatalog:{
      arenaRoyale:{name:'Арена Рояль',levels:{3:['Дополнительное владение','Свободная персона'],6:['Работа с толпой'],11:['Высокий полёт'],17:['Фирменный приём']}},
      bloodhoundBruisers:{name:'Бладхаундские громилы',levels:{3:['Всегда начеку','Детективная работа'],6:['Дерись как сыщик'],11:['Сердце города'],17:['Глаза широко открыты']}},
      dogAndHound:{name:'Пёс и гончая',levels:{3:['Дополнительное владение','Лучший друг бойца','Дворняга с Мокси'],6:['Магический укус','Слаженная атака'],11:['Лучший друг гончей'],17:['Лютый пёс']}},
      handOfDread:{name:'Рука Ужаса',levels:{3:['Чёрная магия','Рука Ужаса'],6:['Сделка с Дьяволом'],11:['Гротескный рост'],17:['Фонтан внутренностей']}},
      pissAndVinegar:{name:'Ярость и дерзость',levels:{3:['Дополнительное владение','Солёное приветствие'],6:['Грязные приёмы'],11:['Старый грубиян'],17:['Искусство невоспитанности']}},
      squaredCircle:{name:'Квадратный ринг',levels:{3:['Основы борьбы'],6:['Живой щит'],11:['Тяжеловес'],17:['Чистое завершение']}},
      sweetScience:{name:'Благородное искусство',levels:{3:['Боксёрская техника','Контрудар'],6:['Раз-два-три — на пол'],11:['Порхай как бабочка, жаль как пчела'],17:['Нокаут']}}
    },
    fightClubs:[
      'Arena Royale — Арена Рояль',
      'Bloodhound Bruisers — Бладхаундские громилы',
      'Dog & Hound — Пёс и гончая',
      'Hand of Dread — Рука Ужаса',
      'Piss & Vinegar — Ярость и дерзость',
      'The Squared Circle — Квадратный ринг',
      'The Sweet Science — Благородное искусство'
    ],
    resources:{
      moxie:{
        status:'implemented_core',
        progression:[0,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,12]
      },
      fisticuffsDie:{
        status:'implemented_core',
        progression:[
          '1d6','1d6','1d6','1d6',
          '1d8','1d8','1d8','1d8','1d8','1d8',
          '1d10','1d10','1d10','1d10','1d10','1d10',
          '1d12','1d12','1d12','1d12'
        ]
      }
    },
    features:{
      fisticuffs:{
        name:'Кулачный бой',
        effect:'Кость Кулачного боя заменяет урон безоружной атаки и оружия Пугилиста; после Attack, состоящей только из безоружных атак, оружия Пугилиста, толчков или захватов, можно бонусным действием сделать безоружную атаку или захват.'
      },
      ironChin:{
        name:'Железный подбородок',
        effect:'Без брони или в лёгкой броне и без щита AC может использовать 12 + модификатор Телосложения.'
      },
      moxie:{
        name:'Мокси',
        recovery:'short_or_long_rest',
        options:['Brace Up — Соберись','Old One-Two — Двойка','Stick and Move — Ударил и отошёл']
      },
      streetSmart:{
        name:'Уличная смекалка',
        effect:'Карузинг, спарринг и подобные занятия могут использоваться как лёгкий отдых; после длительного времяпрепровождения в поселении Пугилист ориентируется в общественных местах этого поселения.'
      },
      bloodiedButUnbowed:{
        name:'Израненный, но не сломленный',
        effect:'Когда HP опускаются до половины максимума или ниже, реакцией получить временные HP = уровень Пугилиста + модификатор Телосложения и восстановить всю Мокси; после применения требуется короткий или долгий отдых.'
      },
      extraAttack:{name:'Дополнительная атака'},
      haymaker:{
        name:'Сокрушительный удар',
        effect:'До конца хода атаки получают помеху, но кости урона наносят максимальное значение.'
      },
      digDeep:{
        name:'Соберись с силами',
        effect:'Бонусным действием Пугилист получает сопротивление дробящему, колющему и рубящему урону на 1 минуту, после чего получает уровень истощения.'
      },
      moxieFueledFists:{
        name:'Кулаки, подпитанные Мокси',
        effect:'Безоружные атаки считаются магическими для преодоления сопротивления и иммунитета.'
      },
      shakeItOff:{
        name:'Стряхнуть с себя',
        effect:'Действием снимает с себя состояние Очарован или Испуган.'
      },
      downButNotOut:{
        name:'Ещё не повержен',
        effect:'При срабатывании Bloodied but Unbowed усиливает атаки без оружия/оружием Пугилиста дополнительным уроном на ограниченное время.'
      },
      unbreakable:{
        name:'Несокрушимый',
        effect:'Преимущество на спасброски Силы, Ловкости и Телосложения; после провала можно потратить 1 Мокси и перебросить спасбросок.'
      },
      herculean:{
        name:'Геркулесова сила',
        effect:'Удвоенная грузоподъёмность, дополнительный урон объектам и увеличенная дистанция прыжка.'
      },
      fightingSpirit:{
        name:'Боевой дух',
        effect:'При падении до 0 HP и менее 5 уровней истощения: половина максимальных HP, половина максимальной Мокси и 1 уровень истощения; 1 раз за долгий отдых.'
      },
      peakPhysicalCondition:{
        name:'Пиковая физическая форма',
        effect:'Сила и Телосложение увеличиваются на 2 (максимум 22); после долгого отдыха восстанавливаются 2 уровня истощения и все потраченные Кости хитов.'
      }
    },
    mechanics:{
      status:'implemented_core',
      fisticuffs:'implemented_core',
      moxie:'implemented_core',
      ironChin:'implemented_core',
      bloodiedButUnbowed:'implemented_core',
      haymaker:'implemented_core',
      digDeep:'implemented_core',
      subclassSystem:'fight_club',
      notes:'Базовая прогрессия, ресурсы и ключевые правила класса подготовлены. Полная реализация шести Fight Clubs и точечных UI-команд/мультитаргетных действий выполняется runtime-паком.'
    }
  };
})(window);
