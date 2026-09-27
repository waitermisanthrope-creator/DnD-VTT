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
})(window);
