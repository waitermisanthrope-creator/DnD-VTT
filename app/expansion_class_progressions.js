/**
 * expansion_class_progressions.js
 * ------------------------------------------------------------------
 * ЧТО ЭТО ЗА ФАЙЛ:
 * Базовые 1–20 уровневые прогрессии расширенных классов v23.
 * Нужен, чтобы Illrigger, Beastheart и Pugilist можно было создавать и
 * прокачивать через тот же progressionEngine, что и базовые 13 классов.
 *
 * КАК РАБОТАЕТ:
 * - создаёт window.illriggerProgression, beastheartProgression и
 *   pugilistProgression;
 * - progressionEngine получает из них hit-die, ASI, выбор подкласса и
 *   основные milestones;
 * - уникальные ресурсы синхронизируются отдельными runtime-паками.
 *
 * ОСНОВНЫЕ ПЕРЕМЕННЫЕ: levels, features, subclassLevel, asi.
 *
 * ИСТОЧНИК: самостоятельный структурный слой проекта; не содержит текста
 * оригинальных книг. Конкретные правила отмечены в runtime-коде.
 * НЕ ИЗМЕНЯЕТ Wallpapers.js/Ambiences.js.
 * ------------------------------------------------------------------
 */
(function(g){
  'use strict';
  function make(levels, base){
    var out={levels:{}};
    for(var i=1;i<=20;i++) out.levels[i]={features:[]};
    Object.keys(levels).forEach(function(k){out.levels[k]=levels[k];});
    return out;
  }
  function common(asiLevels, subclassLevel){
    var x={};
    (asiLevels||[]).forEach(function(l){x[l]={features:['Увеличение характеристик / черта'],asi:true};});
    if(subclassLevel)x[subclassLevel]={features:['Выбор подкласса'],subclassLevel:true};
    return x;
  }
  var i=common([4,8,12,16,19],3);
  i[1]={features:['Infernal contract','Brand / mark system']};
  i[2]={features:['Fighting style','Infernal resource']};
  i[5]={features:['Extra Attack']};
  i[9]={features:['Contract feature']};
  i[11]={features:['Improved infernal feature']};
  i[13]={features:['Contract feature']};
  i[17]={features:['Major infernal feature']};
  i[20]={features:['Epic infernal mastery']};
  g.illriggerProgression=make(i);

  var b=common([4,8,12,16,19],3);
  b[1]={features:['Monstrous Companion','Ferocity system']};
  b[2]={features:['Companion maneuver']};
  b[5]={features:['Extra Attack']};
  b[7]={features:['Companion feature']};
  b[11]={features:['Companion feature']};
  b[15]={features:['Companion feature']};
  b[20]={features:['Beastheart mastery']};
  g.beastheartProgression=make(b);

  var p=common([4,8,12,16,19],3);
  p[1]={features:['Fisticuffs','Iron Chin','Moxie']};
  p[2]={features:['Dig Deep']};
  p[3]={features:['Fight Club']};
  p[5]={features:['Extra Attack','Haymaker']};
  p[7]={features:['Fancy Footwork','Shake It Off']};
  p[9]={features:['Down but Not Out']};
  p[10]={features:['School of Hard Knocks']};
  p[14]={features:['Unbreakable']};
  p[15]={features:['Herculean']};
  p[18]={features:['Fighting Spirit']};
  g.pugilistProgression=make(p);
  /* Runtime-структура для трёх ранее оставшихся классов. Эти данные дают
     Builder/Level Up единый контракт 1–20 и не выдают незавершённые
     способности за полноценно реализованные правила. Конкретные resolver-ы
     можно наращивать поверх этих стабильных IDs без переписывания Builder. */
  function skeletonClass(name,englishName,hitDie,primary,skills,subclasses,level1){
    var x={};for(var n=1;n<=20;n++)x[n]={features:[]};
    x[1]={features:level1};[4,8,12,16,19].forEach(function(n){x[n]={features:['Увеличение характеристик / черта'],asi:true};});
    x[3]={features:['Специализация класса'],subclassLevel:true};
    x[5]={features:['Дополнительная атака / усиление основной способности']};
    x[10]={features:['Улучшение специализации']};
    x[15]={features:['Великая особенность класса']};
    x[20]={features:['Мастерство класса']};
    return {className:name,englishName:englishName,status:'structured_core',hitDie:hitDie,primaryStat:primary,skills:skills,subclassLevel:3,subclasses:subclasses,levels:x,mechanics:{status:'structured_core',note:'Структурный слой готов; отдельные активные resolver-ы расширяются без изменения Builder/Level Up.'}};
  }
  g.accursedProgression=skeletonClass('Аккурсд','Accursed',10,'constitution',{choose:2,from:['athletics','deception','insight','intimidation','investigation','religion','stealth']},[
    {id:'bloodCurse',name:'Кровавое проклятие'},{id:'hexblade',name:'Проклятый клинок'},{id:'doomcaller',name:'Вестник рока'}
  ],['Проклятие','Мрачная клятва']);
  g.runeKeeperProgression=skeletonClass('Рунный хранитель','RuneKeeper',8,'intelligence',{choose:2,from:['arcana','history','investigation','nature','religion','insight','perception']},[
    {id:'warRune',name:'Военные руны'},{id:'wardRune',name:'Руны защиты'},{id:'sageRune',name:'Руны знания'}
  ],['Руническое начертание','Рунический фокус']);
  g.savantProgression=skeletonClass('Савант','Savant',8,'intelligence',{choose:3,from:['arcana','history','insight','investigation','medicine','nature','perception','persuasion']},[
    {id:'tactician',name:'Тактик'},{id:'scholar',name:'Учёный'},{id:'physician',name:'Практик'},{id:'investigator',name:'Следователь'}
  ],['Изучение','Анализ']);

})(window);
