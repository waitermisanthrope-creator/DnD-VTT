/**
 * Illigger.js
 * Карманный ВТТ — прогрессия и runtime-контракт класса «Иллиригер».
 * Источник: MCDM, The Illrigger — Revised 1.0.
 *
 * Здесь хранится структурированная модель класса; полный runtime находится
 * в app/expansion_classes_pack.js.
 */
(function(g){
  'use strict';
  var levels={};
  for(var i=1;i<=20;i++)levels[i]={features:[]};

  levels[1]={features:['Зловещее запрещение','Раздвоенный язык']};
  levels[2]={features:['Боевая специализация','Интердикт']};
  levels[3]={features:['Дьявольский контракт','Призыв Ада'],subclassLevel:true};
  levels[4]={features:['Увеличение характеристик (ASI) или Черта'],asi:true};
  levels[5]={features:['Дополнительная атака']};
  levels[6]={features:['Инфернальный проводник']};
  levels[7]={features:['Способность Дьявольского контракта']};
  levels[8]={features:['Увеличение характеристик (ASI) или Черта'],asi:true};
  levels[9]={features:['Раздвоенный язык — улучшение']};
  levels[10]={features:['Кровавая цена']};
  levels[11]={features:['Способность Дьявольского контракта','Инфернальный проводник — улучшение','Терроризирующая сила']};
  levels[12]={features:['Увеличение характеристик (ASI) или Черта'],asi:true};
  levels[13]={features:[]};
  levels[14]={features:['Высший интердикт']};
  levels[15]={features:['Способность Дьявольского контракта']};
  levels[16]={features:['Увеличение характеристик (ASI) или Черта'],asi:true};
  levels[17]={features:['Инфернальное величие']};
  levels[18]={features:[]};
  levels[19]={features:['Увеличение характеристик (ASI) или Черта'],asi:true};
  levels[20]={features:['Повелитель Ада']};

  var seals=[3,3,4,4,4,4,5,5,5,5,5,5,6,6,6,6,6,7,7,7];
  var sealDamage=['1d6','1d6','1d6','1d6','2d6','2d6','2d6','2d6','2d6','2d6','3d6','3d6','3d6','3d6','3d6','3d6','3d6','3d6','3d6','4d6'];
  var conduit=[0,0,0,0,0,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10];

  g.illriggerProgression={
    className:'Иллиригер', englishName:'Illrigger',
    source:'MCDM Productions — The Illrigger Revised 1.0',
    status:'implemented_core',
    edition:'5E 2024',
    hitDie:10, primaryStat:'charisma', secondaryStatChoice:['strength','dexterity'],
    savingThrows:['constitution','charisma'],
    armor:['light','medium','shields'], weapons:['simple','martial'], tools:[],
    multiclassRequirement:{charisma:13,strengthOrDexterity:13},
    multiclassProficiencies:{armor:['light','medium','shields'],weapons:['simple','martial']},
    skills:{choose:2,from:['arcana','athletics','deception','insight','intimidation','investigation','persuasion','religion','stealth']},
    subclassLevel:3,
    resources:{
      seals:{recharge:'short',progression:seals},
      sealDamage:{progression:sealDamage},
      interdictBoons:{knownAt:[0,0,1,1,1,1,2,2,2,2,2,2,3,3,3,3,3,4,4,4]},
      infernalConduitDice:{recharge:'long',progression:conduit},
      infernalMajesty:{recharge:'long',uses:1},
      masterOfHell:{recharge:'long',uses:1},
      superiorInterdictRestore:{recharge:'long',uses:1}
    },
    levels:levels,
    combatMasteries:['Бравада','Жестокость','Неумолимый','Ложь','Проворство','Неукротимый'],
    interdictBoons:{
      2:['Ослабляющая печать','Мучение','Пожиратель душ','Апатия Стикса','Быстрое возмездие'],
      7:['Цепь Ахерона','Канал Пламени','Очи Врат','Теневая завеса','Высвободить Ад','Мстительный выстрел'],
      13:['Натиск Диса','Вспышка серы','Адское неистовство']
    },
    contracts:[
      {id:'architect',name:'Архитектор разрушения',patron:'Асмодей'},
      {id:'hellspeaker',name:'Говорящий с Адом',patron:'Молох'},
      {id:'painkiller',name:'Палач боли',patron:'Диспатер'},
      {id:'sanguine',name:'Кровавый рыцарь',patron:'Сутех'},
      {id:'shadowmaster',name:'Повелитель теней',patron:'Велиал'}
    ],
    mechanics:{
      status:'implemented_core',
      extraAttack:'level 5; two attacks with Attack action',
      sealSystem:'short_rest_pool; one seal can be placed per bonus action on a visible creature within 30 ft; burning deals current seal dice and transfers/refunds on death according to the tabletop rule',
      balefulInterdict:'implemented',
      forkedTongue:'implemented',
      combatMastery:'implemented',
      interdiction:'implemented',
      invokeHell:'implemented_core',
      infernalConduit:'implemented_core',
      bloodPrice:'implemented_core',
      terrorizingForce:'implemented_core',
      superiorInterdict:'implemented_core',
      infernalMajesty:'implemented_core',
      masterOfHell:'implemented_core',
      subclassSystem:'implemented_core',
      subclassDeepMagic:'all_registered_contract_actions_have_runtime_hooks_and_structured_effects',
      notes:'Класс закрыт в текущем движке: ресурсы, печати, контракты, Дары Интердикта и высокоуровневые способности связаны с runtime/resource/action layer. Сложные многотаргетные последствия применяются существующим боевым resolver по переданному контексту.'
    }
  };
})(window);
