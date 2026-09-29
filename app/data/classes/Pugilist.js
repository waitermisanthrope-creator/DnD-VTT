/**
 * Pugilist.js
 * Карманный ВТТ — каркас прогрессии класса «Пугилист».
 *
 * Этап 1: требования, базовые владения, ресурс Moxie, прогрессия 1–20 и
 * точки Fight Club. Точные боевые формулы и расход Moxie будут реализованы
 * отдельным этапом.
 *
 * Публичный API: window.pugilistProgression
 */
(function(g){
  'use strict';
  var levels={};
  for(var i=1;i<=20;i++)levels[i]={features:[]};
  levels[1]={features:['Заготовка: Fisticuffs','Заготовка: Iron Chin']};
  levels[2]={features:['Заготовка: Moxie','Заготовка: Street Smart']};
  levels[3]={features:['Заготовка: Bloodied but Unbowed','Заготовка: Fight Club'],subclassLevel:true};
  levels[4]={features:['Увеличение характеристик (ASI) или Черта'],asi:true};
  levels[5]={features:['Заготовка: Extra Attack','Заготовка: Haymaker']};
  levels[6]={features:['Заготовка: Fight Club','Заготовка: Moxie-Fueled Fists']};
  levels[7]={features:['Заготовка: Fancy Footwork','Заготовка: Shake It Off']};
  levels[8]={features:['Увеличение характеристик (ASI) или Черта'],asi:true};
  levels[9]={features:['Заготовка: Down but Not Out']};
  levels[10]={features:['Заготовка: School of Hard Knocks']};
  levels[11]={features:['Заготовка: Fight Club']};
  levels[12]={features:['Увеличение характеристик (ASI) или Черта'],asi:true};
  levels[13]={features:['Заготовка: Rabble Rouser']};
  levels[14]={features:['Заготовка: Unbreakable']};
  levels[15]={features:['Заготовка: Herculean']};
  levels[16]={features:['Увеличение характеристик (ASI) или Черта'],asi:true};
  levels[17]={features:['Заготовка: Fight Club']};
  levels[18]={features:['Заготовка: Fighting Spirit']};
  levels[19]={features:['Увеличение характеристик (ASI) или Черта'],asi:true};
  levels[20]={features:['Заготовка: Peak Physical Condition']};

  g.pugilistProgression={
    className:'Пугилист',
    englishName:'Pugilist',
    source:'Benjamin Huffman / Sterling Vermin Adventuring Co. / third-party',
    status:'skeleton',
    edition:'5.5E',
    hitDie:10,
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
    resources:{
      moxie:{status:'pending',progression:[0,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,12]},
      fisticuffsDie:{status:'pending',progression:['1d6','1d6','1d6','1d6','1d8','1d8','1d8','1d8','1d8','1d8','1d10','1d10','1d10','1d10','1d10','1d10','1d12','1d12','1d12','1d12']}
    },
    levels:levels,
    mechanics:{
      status:'pending',
      fisticuffs:'pending',
      moxie:'pending',
      ironChin:'pending',
      bloodiedButUnbowed:'pending',
      haymaker:'pending',
      digDeep:'pending',
      subclassSystem:'fight_club',
      notes:'Этап 1 — только каркас. Не реализует расчёт урона, AC, Moxie и специальные приёмы.'
    }
  };
})(window);
