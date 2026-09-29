/**
 * Warden.js
 * Карманный ВТТ — каркас прогрессии класса «Страж».
 *
 * Этап 1: базовые требования, владения, уровни 1–20 и точки Champion/Warden
 * subclass. Полная логика Guardian Tactics, Interrupt и подклассов будет
 * добавлена отдельно.
 *
 * Публичный API: window.wardenProgression
 */
(function(g){
  'use strict';
  var levels={};
  for(var i=1;i<=20;i++)levels[i]={features:[]};
  levels[1]={features:['Заготовка: Fighting Style','Заготовка: Sentinel’s Stand','Заготовка: Weapon Mastery']};
  levels[2]={features:['Заготовка: Guardian Tactics','Заготовка: Unyielding Resolve']};
  levels[3]={features:['Заготовка: Warden Subclass'],subclassLevel:true};
  levels[4]={features:['Увеличение характеристик (ASI) или Черта'],asi:true};
  levels[5]={features:['Заготовка: Extra Attack','Заготовка: Interrupt']};
  levels[6]={features:['Заготовка: способность подкласса']};
  levels[7]={features:['Заготовка: Mettle']};
  levels[8]={features:['Увеличение характеристик (ASI) или Черта'],asi:true};
  levels[9]={features:['Заготовка: Survive']};
  levels[10]={features:['Заготовка: способность подкласса']};
  levels[11]={features:['Заготовка: Sentinel’s Strike']};
  levels[12]={features:['Увеличение характеристик (ASI) или Черта'],asi:true};
  levels[13]={features:['Заготовка: Font of Life']};
  levels[14]={features:['Заготовка: Extended Tactics']};
  levels[15]={features:['Заготовка: Improved Resolve']};
  levels[16]={features:['Увеличение характеристик (ASI) или Черта'],asi:true};
  levels[17]={features:['Заготовка: способность подкласса']};
  levels[18]={features:['Заготовка: Sentinel’s Soul']};
  levels[19]={features:['Заготовка: Epic Boon'],asi:false};
  levels[20]={features:['Заготовка: Legendary Resistance']};

  g.wardenProgression={
    className:'Страж',
    englishName:'Warden',
    source:'Mage Hand Press / third-party',
    status:'skeleton',
    edition:'5.5E',
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
    mechanics:{
      status:'pending',
      sentinelStand:'pending',
      guardianTactics:'pending',
      unyieldingResolve:'pending',
      interrupt:'pending',
      mettle:'pending',
      survive:'pending',
      sentinelStrike:'pending',
      fontOfLife:'pending',
      extendedTactics:'pending',
      improvedResolve:'pending',
      sentinelSoul:'pending',
      legendaryResistance:'pending',
      subclassSystem:'warden_subclass',
      notes:'Этап 1 — только каркас. Guardian Tactics и защитные реакции не исполняются автоматически.'
    },
    levels:levels
  };
})(window);
