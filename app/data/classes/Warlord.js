/**
 * Warlord.js
 * Карманный ВТТ — каркас прогрессии класса «Военачальник».
 *
 * Источник: Laserllama Warlord. Этап 1 — требования, базовые владения,
 * ресурс командования, прогрессия 1–20 и полный набор Academies.
 * Боевые Exploits, Orders и точные эффекты поддержки будут реализованы позже.
 *
 * Публичный API: window.warlordProgression
 */
(function(g){
  'use strict';
  var levels={};
  for(var i=1;i<=20;i++)levels[i]={features:[]};
  levels[1]={features:['Заготовка: Warlord Orders','Заготовка: Leadership Die']};
  levels[2]={features:['Заготовка: Tactical Exploits','Заготовка: Commanding Presence']};
  levels[3]={features:['Заготовка: Warlord Academy'],subclassLevel:true};
  levels[4]={features:['Увеличение характеристик (ASI) или Черта'],asi:true};
  levels[5]={features:['Заготовка: Extra Attack']};
  levels[6]={features:['Заготовка: Warlord feature']};
  levels[7]={features:['Заготовка: Academy feature']};
  levels[8]={features:['Увеличение характеристик (ASI) или Черта'],asi:true};
  levels[9]={features:['Заготовка: Tactical feature']};
  levels[10]={features:['Заготовка: Warlord feature']};
  levels[11]={features:['Заготовка: Academy feature']};
  levels[12]={features:['Увеличение характеристик (ASI) или Черта'],asi:true};
  levels[13]={features:['Заготовка: Warlord feature']};
  levels[14]={features:['Заготовка: Commanding feature']};
  levels[15]={features:['Заготовка: Academy feature']};
  levels[16]={features:['Увеличение характеристик (ASI) или Черта'],asi:true};
  levels[17]={features:['Заготовка: Warlord feature']};
  levels[18]={features:['Заготовка: Academy feature']};
  levels[19]={features:['Заготовка: Epic Boon'],asi:false};
  levels[20]={features:['Заготовка: Legendary Commander']};
  g.warlordProgression={
    className:'Военачальник',
    englishName:'Warlord',
    source:'Laserllama / third-party',
    status:'skeleton',
    edition:'5E',
    hitDie:8,
    primaryStat:'strength_or_dexterity',
    leadershipStatChoice:['intelligence','charisma'],
    savingThrows:['constitution','charisma'],
    armor:['light','medium','shields'],
    weapons:['simple','martial'],
    tools:[],
    multiclassRequirement:{strengthOrDexterity:13,charisma:13},
    multiclassProficiencies:{armor:['light','medium','shields'],weapons:['simple']},
    skills:{choose:2,from:['animalHandling','athletics','deception','history','insight','intimidation','perception','persuasion']},
    subclassLevel:3,
    subclassFeatureLevels:[3,7,11,15,18],
    resources:{leadershipDice:{status:'pending'},tacticalExploits:{status:'pending'},orders:{status:'pending'}},
    levels:levels,
    mechanics:{
      status:'pending',
      orders:'pending',
      exploits:'pending',
      leadershipModifier:'pending',
      battlefieldSupport:'pending',
      subclassSystem:'academy_of_war',
      notes:'Этап 1 — структура класса. Командные эффекты, кубы и Exploits пока не исполняются.'
    }
  };
})(window);
