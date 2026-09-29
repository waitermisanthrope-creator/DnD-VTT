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
    fightClubs:[
      'Arena Royale — Арена Рояль',
      'Bloodhound Bruisers — Бладхаундские громилы',
      'Dog & Hound — Пёс и гончая',
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
        effect:'Безоружные атаки и допустимое оружие Пугилиста используют кость Fisticuffs; при отсутствии щита и тяжёлой брони Пугилист получает дополнительную безоружную атаку/захват бонусным действием после Attack.'
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
        effect:'Когда HP опускаются до половины максимума или ниже, Пугилист восстанавливает Мокси и получает временные HP.'
      },
      extraAttack:{name:'Дополнительная атака'},
      haymaker:{
        name:'Сокрушительный удар',
        effect:'Можно объявить серию рискованных ударов: атаки до конца хода получают помеху, но кости урона используют максимальные значения.'
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
        effect:'Преимущество на спасброски Силы, Ловкости и Телосложения; провал можно перебросить за 1 Мокси.'
      },
      herculean:{
        name:'Геркулесова сила',
        effect:'Удвоенная грузоподъёмность, дополнительный урон объектам и увеличенная дистанция прыжка.'
      },
      fightingSpirit:{
        name:'Боевой дух',
        effect:'При падении до 0 HP Пугилист может вернуться с половиной максимальных HP и половиной максимального Мокси, получив истощение.'
      },
      peakPhysicalCondition:{
        name:'Пиковая физическая форма',
        effect:'Сила и Телосложение получают +2 к максимуму до 22; короткий отдых восстанавливает больше истощения и все потраченные Кости хитов.'
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
