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
 skills:{choose:2,from:['athletics','deception','history','insight','intimidation','investigation','persuasion']},
 subclassLevel:3,subclassFeatureLevels:[3,6,14,18],
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
  'Chivalry — Рыцарство','Dread — Ужас','Ferocity — Свирепость','Gallantry — Галантерея',
  'Schemes — Интриги','Tactics — Тактика','Claws — Когти','Counsel — Совет',
  'Liberty — Свобода','Navigators — Навигаторы','Order — Порядок','Zeal — Рвение'
 ],
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
  notes:'Базовый класс и командное ядро реализованы. Полные 70 Tactical Exploits, все Fighting Styles и углублённые особенности 12 Academies требуют отдельного runtime/UI прохода.'
 },
 levels:levels
};
})(window);
