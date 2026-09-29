/**
 * Illigger.js
 * Карманный ВТТ — каркас прогрессии класса «Иллирригер».
 *
 * Этап 1: только структура класса, требования, ресурсы прогрессии и точки
 * подклассов. Полная логика печатей, Interdict, Infernal Conduit, боевых
 * приёмов и заклинаний будет добавлена отдельным этапом.
 *
 * Публичный API: window.illriggerProgression
 */
(function(g){
  'use strict';

  var levels = {};
  for (var i = 1; i <= 20; i++) levels[i] = {features: []};

  levels[1] = {features: ['Заготовка: Baleful Interdict','Заготовка: Forked Tongue']};
  levels[2] = {features: ['Заготовка: Combat Mastery','Заготовка: Interdiction']};
  levels[3] = {features: ['Заготовка: Diabolic Contract','Заготовка: Invoke Hell'], subclassLevel: true};
  levels[4] = {features: ['Увеличение характеристик (ASI) или Черта'], asi: true};
  levels[5] = {features: ['Заготовка: Extra Attack']};
  levels[6] = {features: ['Заготовка: Infernal Conduit']};
  levels[7] = {features: ['Заготовка: способность Diabolic Contract']};
  levels[8] = {features: ['Увеличение характеристик (ASI) или Черта'], asi: true};
  levels[9] = {features: ['Заготовка: Forked Tongue — улучшение']};
  levels[10] = {features: ['Заготовка: Blood Price']};
  levels[11] = {features: ['Заготовка: способность Diabolic Contract','Заготовка: Infernal Conduit — улучшение','Заготовка: Terrorizing Force']};
  levels[12] = {features: ['Увеличение характеристик (ASI) или Черта'], asi: true};
  levels[13] = {features: []};
  levels[14] = {features: ['Заготовка: Superior Interdict']};
  levels[15] = {features: ['Заготовка: способность Diabolic Contract']};
  levels[16] = {features: ['Увеличение характеристик (ASI) или Черта'], asi: true};
  levels[17] = {features: ['Заготовка: Infernal Majesty']};
  levels[18] = {features: ['Заготовка: дополнительный ресурс Interdict']};
  levels[19] = {features: ['Увеличение характеристик (ASI) или Черта'], asi: true};
  levels[20] = {features: ['Заготовка: Master of Hell']};

  g.illriggerProgression = {
    className: 'Иллирригер',
    englishName: 'Illrigger',
    source: 'MCDM / third-party',
    status: 'skeleton',
    edition: '5E',
    hitDie: 10,
    primaryStat: 'charisma',
    secondaryStatChoice: ['strength','dexterity'],
    savingThrows: ['constitution','charisma'],
    armor: ['light','medium','shields'],
    weapons: ['simple','martial'],
    tools: [],

    multiclassRequirement: {
      charisma: 13,
      strengthOrDexterity: 13
    },

    multiclassProficiencies: {
      armor: ['light','medium','shields'],
      weapons: ['simple','martial']
    },

    skills: {
      choose: 2,
      from: ['arcana','athletics','deception','insight','intimidation','investigation','persuasion','religion','stealth']
    },

    subclassLevel: 3,

    resources: {
      seals: {status: 'pending', progression: [3,3,4,4,4,4,5,5,5,5,5,5,6,6,6,6,6,7,7,7]},
      sealDamage: {status: 'pending', progression: ['1d6','1d6','1d6','1d6','2d6','2d6','2d6','2d6','2d6','2d6','3d6','3d6','3d6','3d6','3d6','3d6','3d6','3d6','3d6','4d6']},
      interdictBoons: {status: 'pending'},
      infernalConduitDice: {status: 'pending'}
    },

    levels: levels,

    mechanics: {
      status: 'pending',
      sealSystem: 'pending',
      balefulInterdict: 'pending',
      combatMastery: 'pending',
      invokeHell: 'pending',
      infernalConduit: 'pending',
      bloodPrice: 'pending',
      terrorizingForce: 'pending',
      infernalMajesty: 'pending',
      masterOfHell: 'pending',
      spellcasting: 'subclass_dependent',
      subclassSystem: 'diabolic_contract',
      notes: 'Этап 1 — только каркас. Не реализует боевые формулы, печати или ресурсные расчёты.'
    }
  };
})(window);
