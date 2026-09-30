/* Savant — laserllama v5.6.1, public GM Binder
 * Russian runtime/data layer.
 */
(function(){
const PB=[0,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6];
const DIE=[null,"d4","d4","d4","d4","d6","d6","d6","d6","d8","d8","d8","d8","d10","d10","d10","d10","d12","d12","d12","d12"];
const REACTIONS=Array.from({length:21},(_,l)=>l>=17?4:l>=11?3:l>=5?2:1);
const disciplines={
"Археолог":{
features:{
3:["Ученик истории: История и Расследование; Интеллектуальный куб к проверкам, две дополнительных языка, бонус к проверкам ловушек, определение возраста/происхождения/стоимости и магии предметов.","Око древности: во время отдыха находить временный магический Curio; Интеллект — базовая характеристика; обслуживание на каждом долгом отдыхе."],
7:["Отважный исследователь: Интеллектуальный куб к спасброскам против ловушек, скорость лазания.","Древние знания: игнорировать ограничения настройки/использования магических предметов, свитков и зелий; Curio может быть необычным."],
13:["Мастер знаний: эффект легендора по наблюдаемому объекту/месту/существу.","Найденная аркана: Интеллектуальный DC для спасбросков магических предметов и восстановление зарядов одного Curio после отдыха."],
18:["Мастер-археолог: сопротивление урону от заклинаний, магических предметов и ловушек; один Curio может иметь свойства редкого предмета."]
}},
"Исследователь":{
features:{
3:["Ученик истины: Проницательность и Расследование; Интеллект вместо Мудрости для Проницательности и Восприятия; ускоренный Поиск; Воровской жаргон; изучение черт/идеалов/связей/слабостей Фокуса.","Грязная драка: усиленные безоружные атаки и бонусная безоружная атака; можно отказаться от Studied Strike для ослепления, оглушения речи, глухоты или сбивания с ног."],
7:["Преступные связи: Интеллектуальный куб к социальным проверкам на Воровском жаргоне; получает «Секреты и шёпот».","Грязный боец: усиленная реакция после промаха Calculated Flourish, два эффекта Грязной драки, возможность сделать атакующего новым Фокусом и дать помеху атаке."],
13:["Пронизывающий взгляд: всегда распознаёт ложь Фокуса, видит наличие иллюзий и оборотней; может заменить обычный эффект Грязной драки на Ошеломление."],
18:["Мастер-исследователь: истинное зрение 30 футов, обнаружение скрытых дверей/ловушек и лжи; раз за отдых атака или Potent Observation по Фокусу становится критическим попаданием."]
}},
"Наставник":{
features:{
3:["Ученик жизни: История, Проницательность и ремесленный инструмент; Интеллектуальный куб к ним; Интеллект вместо Мудрости для Проницательности; бесплатное Изучение/Быстрая учёба; переброс 1 на Интеллектуальном кубе.","Мудрый совет: реакция заставляет союзника в 30 футах перебросить проваленную проверку, атаку или спасбросок; число использований = Интеллект."],
7:["Спокойствие: если за ход не наносил урон и не вынуждал спасбросок, временные HP = Интеллект.","Успокаивающее присутствие: союзники на коротком отдыхе с вами имеют преимущество на восстановление HP Костями хитов."],
13:["Чудесный совет: после переброса дать Интеллектуальный куб или временные HP; восстановление использований на коротком/долгом отдыхе и одно при инициативе.","Мистическая интуиция: 1 минута медитации даёт ответ как commune, если ответ известен смертному; 1/долгий отдых."],
18:["Мастер-наставник: выбранные союзники в 15 футах получают ваш модификатор Интеллекта к проверкам и спасброскам; Мистическая интуиция после каждого отдыха."]
}},
"Натуралист":{
features:{
3:["Ученик природы: Уход за животными и Природа; Интеллектуальный куб; Интеллект вместо Мудрости для Ухода и Выживания; можно определять Фокус по следам.","Журнал натуралиста: после часа исследования заносить окружение или Зверя/Растение/Чудовище; преимущество на связанные проверки, специальные бонусы Фокуса и игнор обычной трудной местности."],
7:["Зов природы: заставить описанное в журнале существо пройти спасбросок Харизмы; при провале оно очаровано и выполняет команды; повторный спасбросок после урона."],
13:["Продвинутые исследования: добавляются Драконы, Великаны, Слизи и Нежить; преимущества Журнала распространяются на них, а магическая трудная местность игнорируется."],
18:["Мастер-натуралист: любой не-гуманоид может быть внесён в Журнал, преимущество атак по изученным существам; Зов природы длится до добровольного освобождения, смены цели или смерти."]
}},
"Врач":{
features:{
3:["Ученик медицины: Медицина и Ловкость рук; Интеллектуальный куб; определение болезней/ядов/проклятий Фокуса; можно снизить скорость Фокуса; восстановление использований Набора лекаря.","Боевой медик: Адреналиновый импульс, Перевязка ран и Лечебный рывок; расход Набора лекаря максимизирует Интеллектуальные кубы; стабилизация существа с 0 HP."],
7:["Полевой врач: после действия Боевого медика бонусным действием Рывок, Отход или атака.","Уверенные руки: действия Боевого медика можно применять к себе, кроме ряда ограничивающих состояний."],
13:["Медицинская экспертиза: число усилений = модификатор Интеллекта за короткий/долгий отдых; снимает тяжёлые состояния, восстанавливает конечности или возвращает умершего менее минуты назад."],
18:["Мастер-врач: существо, которого вы касаетесь, при трате Кости хитов восстанавливает максимальное значение."]
}},
"Тактик":{
features:{
3:["Ученик войны: История, Убеждение и два игровых набора; Интеллектуальный куб; средняя броня, щиты и немассивное воинское оружие; Интеллект вместо Ловкости для КД; Potent Observation на инициативу.","Тактическое командование: при Атаке жертвовать атаками для приказов — Атака, Защита, Манёвр или Поддержка."],
7:["Продвинутая тактика: новые приказы — Воодушевление и Восстановление.","Стратегическое превосходство: две атаки действием Атака; после Рывка/Уклонения/Отхода бонусным действием атака или приказ."],
13:["Тактический гений: приказ до начала первого хода после броска инициативы; Potent Observation на атаку союзника по Фокусу после броска, но до результата."],
18:["Мастер-тактик: каждый приказ даёт временные HP = Интеллект; два легендарных приказа 1/короткий или долгий отдых — Героический и Оживляющий."]
}}};
const pursuits={
"Инструкция":"За час обучает до уровня Саванта существ с Интеллектом 8+ одному вашему навыку, инструменту, оружию или языку до следующего долгого отдыха.",
"Идеальная память":"После минуты наблюдения позволяет идеально вспоминать наблюдаемые детали объекта или существа.",
"Быстрая учёба":"За час получить временное владение навыком/инструментом или язык по образцу; можно совершить Поиск при инициативе, если не застигнут врасплох.",
"Астрология":"Владение Магией и Интеллектуальный куб к ней; во время ночного долгого отдыха записать d20 и один раз заменить им бросок до следующего отдыха.",
"Соколиная охота":"Владение Восприятием + Интеллектуальный куб; обученный сокол действует в бою и командуется бонусным действием.",
"Лингвистика":"Владение Убеждением + Интеллектуальный куб; дополнительные языки в количестве модификатора Интеллекта.",
"Физическая подготовка":"Владение Атлетикой или Акробатикой + Интеллектуальный куб; скорость лазания или плавания равна скорости ходьбы; можно изучить дважды.",
"Загадки":"Владение Обманом + Интеллектуальный куб; скрытые сообщения в рифмах и загадках.",
"Секреты и шёпот":"Владение Скрытностью + Интеллектуальный куб; после долгого отдыха в поселении узнать важный местный слух за последний месяц.",
"Богословие":"Владение Религией + Интеллектуальный куб, Небесный; ритуалом без слота давать bless, ceremony, detect evil and good или protection from evil and good.",
"Традиции":"Владение Историей + Интеллектуальный куб; Историю можно применять вместо Харизмы при опоре на местные обычаи."
};
const progression={className:"Савант",englishName:"Savant",source:"laserllama — Savant v5.6.1",status:"implemented_full_v5_6_1_runtime",edition:"5E 2014",hitDie:8,primaryStat:"intelligence",savingThrows:["intelligence","wisdom"],armor:["light"],weapons:["simple","rapier","shortsword","whip"],tools:["one artisan's tool"],skills:["Arcana","History","Investigation","Insight","Medicine","Nature","Persuasion","Religion"],multiclassRequirement:{intelligence:13},subclassLevel:3,subclassFeatureLevels:[3,7,13,18],levels:{}};
const features={
1:["Искусный анализ","Аналитическая защита"],2:["Мощное наблюдение","Учёные стремления"],3:["Академическая дисциплина"],4:["Увеличение характеристик/Черта"],5:["Расчётный манёвр","Быстрые рефлексы (2 реакции)"],6:["Острый ум"],7:["Особенность дисциплины"],8:["Увеличение характеристик/Черта"],9:["Острая осведомлённость"],10:["Непревзойдённый гений"],11:["Быстрые рефлексы (3 реакции)"],12:["Увеличение характеристик/Черта"],13:["Особенность дисциплины"],14:["Несокрушимая воля"],15:["Безупречный анализ"],16:["Увеличение характеристик/Черта"],17:["Быстрые рефлексы (4 реакции)"],18:["Особенность дисциплины"],19:["Увеличение характеристик/Черта"],20:["Несравненный интеллект"]
};
for(let l=1;l<=20;l++)progression.levels[l]={features:features[l],intellectDie:DIE[l],reactions:REACTIONS[l],asi:[4,8,12,16,19].includes(l)};
progression.mechanics={adroitAnalysis:"bonus action Search/Help/Intelligence check; Search marks visible Focus within 60 ft; concentration; learn characteristics; Focus attacks against you have disadvantage; Studied Strike uses Intelligence and adds Intellect Die once/turn or learns another characteristic.",analyticalDefense:"AC 10+Dex+Int without armor/shield; v5.6.1 also uses Intelligence in place of Dexterity for light/medium armor where allowed.",potentObservation:"reaction within 30 ft to add Intellect Die to qualifying damage/check/save; improves at 10.",scholarlyPursuits:pursuits,calculatedFlourish:"reaction add Intellect Die to AC against visible attack; at 10 a miss also permits movement without opportunity attacks.",sharpMind:"Intellect Die to Int/Wis/Cha saves and Potent Observation on forced saves.",keenAwareness:"cannot be surprised and adds Intelligence to initiative.",unrivaledGenius:"Potent Observation can support any damage; Focus gets two dice; Calculated Flourish miss grants disengaging movement or attack.",unyieldingWill:"Charisma save proficiency and advantage against Focus-forced saves and saves vs Charmed/Frightened.",flawlessAnalysis:"action, Focus Intelligence save; on fail severe penalties until next turn; once per creature per long rest.",incomparableIntellect:"Intelligence +4 up to 24; low Intellect Die can be replaced by Intelligence modifier."};
window.SAVANT_V561={PB,DIE,REACTIONS,progression,disciplines,pursuits};
window.savantProgression=Object.assign(window.savantProgression||{},progression);
window.savantRuntime={version:"5.6.1",getDie:l=>DIE[l],getReactions:l=>REACTIONS[l],getDC:(pb,intMod)=>8+pb+intMod,getDiscipline:n=>disciplines[n]||null,getPursuit:n=>pursuits[n]||null};
window.savantDisciplines=Object.keys(disciplines);

  const MECHANICS={focusRangeFt:60,focusDuration:"concentration",analysisAction:"bonus_action",reactionUsesByLevel:REACTIONS,analyticalDefense:"10+DEX+INT without armor/shield",calculatedFlourish:"reaction_add_intellect_die_to_AC",flawlessAnalysis:{level:15,action:"action",save:"intelligence",recharge:"long_rest_per_creature"},incomparableIntellect:{level:20,maxIntelligence:24,bonus:4}};
  function svState(h){h.classFeaturesState=h.classFeaturesState||{};var s=h.classFeaturesState.savant=h.classFeaturesState.savant||{};if(!Array.isArray(s.focuses))s.focuses=[];return s;}
  function svLevel(h){return ((h&&h.classes)||[]).reduce((n,c)=>String(c.name||"")==="Савант"?Math.max(n,Number(c.level)||0):n,0);}
  function svDiscipline(h,name){if(!disciplines[name])return {ok:false,reason:"Неизвестная академическая дисциплина."};svState(h).discipline=name;return {ok:true,discipline:name,data:disciplines[name]};}
  function svPursuit(h,name){if(!pursuits[name])return {ok:false,reason:"Неизвестное учёное стремление."};svState(h).pursuit=name;return {ok:true,pursuit:name,data:pursuits[name]};}
  function svFocus(h,target){if(!target)return {ok:false,reason:"Нужна наблюдаемая цель."};var s=svState(h),max=svLevel(h)>=20?2:1;s.focuses=[target.id||target.name].slice(0,max);s.focusUntil="concentration";return {ok:true,targetId:s.focuses[0],rangeFt:MECHANICS.focusRangeFt};}
  function svObserve(h,kind,ctx){var s=svState(h),max=REACTIONS[svLevel(h)]||1;s.reactionUses=s.reactionUses==null?max:s.reactionUses;if(s.reactionUses<=0)return {ok:false,reason:"Реакции Саванта закончились."};s.reactionUses--;return {ok:true,kind:kind||"generic",die:DIE[svLevel(h)]||"d4",remaining:s.reactionUses,context:ctx||{}};}
  function svFlourish(h,ctx){var r=svObserve(h,"calculated_flourish",ctx);if(r.ok)r.acBonus=r.die;return r;}
  function svAnalysis(h,target){var l=svLevel(h);if(l<15)return {ok:false,reason:"Безупречный анализ доступен с 15 уровня."};var s=svState(h),id=target&&(target.id||target.name);if(!id)return {ok:false,reason:"Нужна цель."};s.flawless=s.flawless||{};if(s.flawless[id])return {ok:false,reason:"Эта цель уже анализировалась после последнего долгого отдыха."};s.flawless[id]=true;var mod=Math.floor(((Number(h.stats&&h.stats.int)||10)-10)/2);return {ok:true,targetId:id,saveDC:8+(PB[l]||2)+mod,save:"intelligence"};}
  function svRestore(h){var s=svState(h),l=svLevel(h);s.reactionUses=REACTIONS[l]||1;s.flawless={};s.focuses=[];return s;}
  window.SAVANT_V561.MECHANICS=MECHANICS;window.savantRuntime.MECHANICS=MECHANICS;window.savantRuntime.chooseDiscipline=svDiscipline;window.savantRuntime.choosePursuit=svPursuit;window.savantRuntime.markFocus=svFocus;window.savantRuntime.potentObservation=svObserve;window.savantRuntime.calculatedFlourish=svFlourish;window.savantRuntime.flawlessAnalysis=svAnalysis;window.savantRuntime.restore=svRestore;


})();