/**
 * Warlord.js — Военачальник, Laserllama Warlord v3.3.0
 * Базовая прогрессия и правила класса для Карманного ВТТ.
 */
(function(g){
'use strict';
var levels={};
for(var i=1;i<=20;i++)levels[i]={features:[]};
levels[1]={features:['Leadership Style — Стиль лидерства','Inspiring Word — Вдохновляющее слово']};
levels[2]={features:['Fighting Style — Стиль боя','Tactical Exploits — Тактические приёмы']};
levels[3]={features:['Academy of War — Военная академия'],subclassLevel:true};
levels[4]={features:['Увеличение характеристик (ASI) или Черта'],asi:true};
levels[5]={features:['Extra Attack — Дополнительная атака']};
levels[6]={features:['Academy feature — Особенность академии']};
levels[7]={features:['Valiant Leader — Доблестный лидер']};
levels[8]={features:['Увеличение характеристик (ASI) или Черта'],asi:true};
levels[9]={features:['Rallying Cry — Боевой клич']};
levels[10]={features:['Unwavering Will — Непоколебимая воля']};
levels[11]={features:['Tactical Superiority — Тактическое превосходство']};
levels[12]={features:['Увеличение характеристик (ASI) или Черта'],asi:true};
levels[13]={features:['Rallying Cry — Боевой клич (2)']};
levels[14]={features:['Academy feature — Особенность академии']};
levels[15]={features:['Exalted Leader — Возвышенный лидер']};
levels[16]={features:['Увеличение характеристик (ASI) или Черта'],asi:true};
levels[17]={features:['Rallying Cry — Боевой клич (3)']};
levels[18]={features:['Academy feature — Особенность академии']};
levels[19]={features:['Увеличение характеристик (ASI) или Черта'],asi:true};
levels[20]={features:['Dauntless — Неустрашимый']};

g.warlordProgression={
 className:'Военачальник',englishName:'Warlord',
 source:'Laserllama — Warlord v3.3.0',status:'implemented_core',edition:'5E',
 hitDie:8,primaryStat:'strength_or_dexterity',leadershipAbility:'choose',
 leadershipChoices:['charisma','wisdom','intelligence'],
 savingThrows:['wisdom','charisma'],
 armor:['light','medium','shields'],
 weapons:['simple','hand_crossbow','longbow','longsword','rapier','scimitar','shortsword'],
 tools:['gaming_set'],
 multiclassRequirement:{strengthOrDexterity:13,intelligenceOrWisdomOrCharisma:13},
 multiclassProficiencies:{armor:['light','medium','shields'],weapons:['simple'],tools:['gaming_set']},
 skills:{choose:2,from:['athletics','deception','history','insight','intimidation','persuasion']},
 subclassLevel:3,subclassFeatureLevels:[3,6,14,18],
 fightingStyles:['Сбалансированный бой','Классическое фехтование','Защитный бой','Конный воин','Знаменосец','Тактический бой','Универсальный бой'],
 progression:{
   inspiringWordUses:[3,3,3,4,4,4,4,5,5,5,5,5,6,6,6,6,7,7,7,7],
   exploitsKnown:[0,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,10,10],
   exploitDice:[0,0,2,2,3,3,3,3,3,3,4,4,4,4,4,4,5,5,5,5],
   exploitDie:['','', 'd4','d4','d4','d6','d6','d6','d6','d6','d6','d8','d8','d8','d8','d8','d8','d10','d10','d10','d10']
 },
 leadershipStyles:{
  captain:{ability:'charisma',features:['тяжёлая броня','Запугивание или Убеждение']},
  mentor:{ability:'wisdom',features:['реакция: +Exploit Die к промаху атаки/провалу проверки союзника в 15 футах']},
  strategist:{ability:'intelligence',features:['обмен местами в инициативе с согласным существом после броска инициативы']}
 },
 academies:[
  'Рыцарство','Ужас','Свирепость','Галантность','Интриги','Тактика',
  'Когти','Наставничество','Свобода','Мореходы','Порядок','Рвение'
 ],
 academyFeatures:{
  'Рыцарство':{3:['Рыцарские навыки','Вдохновляющий клич'],6:['Веди в атаку'],14:['Пламя надежды'],18:['Парагон рыцарства']},
  'Ужас':{3:['Тёмный капитан'],6:['Ужасающая аура'],14:['Безжалостное командование'],18:['Повелитель ужаса']},
  'Свирепость':{3:['Хищничьи навыки','Вожак стаи'],6:['Тихий охотник'],14:['Жажда охоты'],18:['Вершина хищника']},
  'Галантность':{3:['Галантные приёмы','Заклинания галантности','Поэт-воин'],6:['Героический рывок','Песни войны и мира'],14:['Боевой гимн'],18:['Мифический голос']},
  'Интриги':{3:['Грязный удар','Коварные таланты'],6:['Безжалостный натиск'],14:['Хитрые тактики'],18:['Метка смерти','Непроницаемый разум']},
  'Тактика':{3:['Продвинутая тактика','Искусство войны','Стратегические корректировки'],6:['Мозг вместо мускулов','Знай врага'],14:['Одарённый стратег'],18:['Великий тактик']},
  'Когти':{3:['Чудовищный миньон'],6:['Железное командование'],14:['Чудовищный зверинец'],18:['Полное подчинение']},
  'Наставничество':{3:['Ученик наставника'],6:['Воодушевляющие приказы'],14:['Возвышенный ученик'],18:['Легендарный тандем']},
  'Свобода':{3:['Слаженное нападение','Соль земли'],6:['Вместе сильнее'],14:['Сила численности'],18:['Великий революционер']},
  'Мореходы':{3:['Приёмы навигатора','Переговоры','Мореход'],6:['Экипаж навигатора','Сплочение экипажа'],14:['Первый помощник'],18:['Прославленный адмирал']},
  'Порядок':{3:['Приёмы порядка','Хранитель порядка','Щит закона'],6:['Остановить нарушителя','Стойкий защитник'],14:['Непогрешимый глаз','Бастион порядка'],18:['Высшая власть']},
  'Рвение':{3:['Освящённая магия','Божественный мандат'],6:['Божественный канал'],14:['Слова рвения'],18:['Избранный слуга']}
 },
 features:{
  inspiringWord:'bonus_action; союзник в 30 футах восстанавливает 1 Кость Хитов + модификатор лидерства; короткий/длинный отдых',
  tacticalExploit:'2 уровня; Exploit Dice восстанавливаются после короткого/длинного отдыха; не более одного Exploit на атаку/проверку/спасбросок',
  tacticalSkill:'потратить Exploit Die и добавить его к проверке навыка/инструмента, которым владеешь',
  extraAttack:'2 атаки; после Dash или Disengage бонусным действием одна атака',
  valiantLeader:'улучшение выбранного Leadership Style',
  rallyingCry:'реакция после провала спасброска союзника; переброс с модификатором лидерства; 1/отдых, затем 2 и 3 использования',
  unwaveringWill:'преимущество против Очарования, Испуга и Оглушения',
  tacticalSuperiority:'на инициативе вернуть 1 Вдохновляющее слово и 1 Боевой клич; удвоить дальность командных особенностей',
  exaltedLeader:'улучшение Leadership Style на 15 уровне',
  dauntless:'Боевой клич без ограничения; Вдохновляющее слово восстанавливает максимально возможные HP'
 },
 mechanics:{
  status:'implemented_core',
  orders:'implemented_core',
  exploits:'implemented_core',
  leadershipModifier:'implemented_core',
  battlefieldSupport:'implemented_core',
  subclassSystem:'academy_of_war',
  notes:'Базовый класс, 7 Fighting Styles, 40 базовых Tactical Exploits и 12 Academies of War зарегистрированы. Расширенные 30 Exploits и сложные spell/statblock interactions представлены структурированными runtime-контрактами.'
 },
 levels:levels
};
})(window);
