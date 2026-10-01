/** Occultist.js — canonical progression/data contract for the KibblesTasty Occultist runtime. */
window.occultistProgression={
 className:"Оккультист",englishName:"Occultist",source:"KibblesTasty Occultist v1.1",
 status:"complete_runtime",edition:"5E",runtime:"app/occultist_kibbles_v11_runtime.js",
 hitDie:6,primaryStat:"wisdom",savingThrows:["wisdom","charisma"],armor:["light"],
 weapons:["daggers","quarterstaff","light_crossbow"],tools:["herbalism_kit"],
 multiclassRequirement:{wisdom:13},multiclassProficiencies:{skills:["medicine"],tools:["herbalism_kit"]},
 skills:{choose:2,from:["animalHandling","arcana","deception","history","investigation","medicine","nature","religion","sleightOfHand","stealth","survival"]},
 subclassLevel:1,subclassFeatureLevels:[1,3,6,14],
 spellcasting:{type:"full_caster",ability:"wisdom",ritualCasting:true,
  cantripsKnown:[3,3,3,3,4,4,4,4,4,5,5,5,5,5,5,5,5,5,5,5],
  spellsKnown:[4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,22]},
 occultRitesKnown:{2:2,5:3,7:4,9:5,12:6,15:7,18:8,20:8},
 levels:{
  1:{features:["Spellcasting","Occult Tradition"]},2:{features:["Occult Rites"],rites:2},
  3:{features:["Occult Tradition feature"],rites:2},4:{features:["Ability Score Improvement"],asi:true,rites:2},
  5:{features:["Occult Rites"],rites:3},6:{features:["Occult Tradition feature"],rites:3},
  7:{features:["Occult Rites"],rites:4},8:{features:["Ability Score Improvement"],asi:true,rites:4},
  9:{features:["Occult Rites"],rites:5},10:{features:["Traditional Expertise"],rites:5},
  11:{features:["Occult Rites"],rites:5},12:{features:["Ability Score Improvement"],asi:true,rites:6},
  13:{features:["Occult Rites"],rites:6},14:{features:["Occult Tradition feature"],rites:6},
  15:{features:["Occult Rites"],rites:7},16:{features:["Ability Score Improvement"],asi:true,rites:7},
  17:{features:["Occult Rites"],rites:7},18:{features:["Occult Rites"],rites:8},
  19:{features:["Ability Score Improvement"],asi:true,rites:8},20:{features:["The Old Ways"],rites:8}
 },
 traditions:{
  Oracle:{name:"Оракул",levels:[1,3,6,14],features:["Божественное касание","Раскрытая тайна","Чтение судьбы","Просветлённое понимание","Мастер пророчества"],
   mysteries:["Жизнь","Огонь","Смерть","Война","Души"]},
  Shaman:{name:"Шаман",levels:[1,3,6,14],features:["Духовный воин","Призыв духа","Усиленный дух","Дополнительная атака","Духовное усиление"],
   spiritTypes:["fire","cold","lightning","radiant","necrotic"]},
  Witch:{name:"Ведьма",levels:[1,3,6,14],features:["Ведьмина магия","Ковен","Связь с фамильяром","Прикосновение ведьмы","Мастер проклятий"],
   covens:["Чёрный ковен","Белый ковен","Зелёный ковен"]}
 },
 mysteries:{
  "Жизнь":["Лечащее слово","Связь хранителя","Массовое лечащее слово","Аура жизни","Массовое лечение ран"],
  "Огонь":["Пылающие руки","Непрерывное пламя","Огненный шар","Огненный щит","Испепеление"],
  "Смерть":["Ложная жизнь","Покой с миром","Иссушение","Порча","Проклятие убийства"],
  "Война":["Громовой удар","Клеймящая кара","Ослепляющая кара","Ошеломляющая кара","Изгоняющая кара"],
  "Души":["Невидимый слуга","Целительный дух","Стражи духов","Страж веры","Возвращение к жизни"]
 },
 covens:{
  "Чёрный ковен":["Гниющее проклятие","Руки Хадара","Слепота/глухота","Тьма","Оживление тени","Призыв теневого порождения","Порча","Чёрные щупальца Эварда","Проклятие убийства","Заражение"],
  "Белый ковен":["Связывающее проклятие","Лечащее слово","Успокоение эмоций","Удержание личности","Воскрешение","Массовое лечащее слово","Изгнание","Сфера Отилюка","Проклятие бессилия","Призыв небожителя"],
  "Зелёный ковен":["Ослепляющее проклятие","Опутывание","Изменение облика","Увеличение/уменьшение","Великий образ","Призыв феи","Высшая невидимость","Полиморф","Обменное проклятие","Гнев природы"]
 },
 rites:[
  {id:"alchemicalRites",level:1,name:"Алхимические обряды"},{id:"communeBeyondDeath",level:1,name:"За гранью смерти"},
  {id:"emblazonedFocus",level:1,name:"Клеймёный фокус"},{id:"occultFamiliar",level:1,name:"Оккультный фамильяр"},
  {id:"riteOfProwess",level:1,name:"Обряд мастерства"},{id:"witchsClaws",level:1,name:"Ведьмины когти"},
  {id:"witchsHat",level:1,name:"Ведьмина шляпа"},{id:"protectiveMarks",level:1,name:"Защитные метки"},
  {id:"wardingPower",level:1,name:"Оберегающая сила"},{id:"specializedPoisons",level:1,name:"Специализированные яды"},
  {id:"soulBurn",level:1,name:"Выжигание души"},{id:"warriorVestments",level:1,name:"Воинские облачения"},
  {id:"spatialStorage",level:1,name:"Пространственное хранилище"},
  {id:"bloodRituals",level:5,name:"Кровавые ритуалы"},{id:"bloodMagic",level:5,name:"Кровавая магия"},
  {id:"defileItem",level:5,name:"Осквернение предмета"},{id:"forbiddenRites",level:5,name:"Запретные обряды"},
  {id:"lostRitual",level:1,name:"Потерянный ритуал"},{id:"occultHaste",level:5,name:"Оккультное ускорение"},
  {id:"traditionExpert",level:10,name:"Эксперт традиции"},{id:"immortality",level:15,name:"Обряд бессмертия"},
  {id:"youth",level:15,name:"Обряд молодости"},{id:"rootOfMagic",level:15,name:"Корень магии"}
 ],
 traditionRites:{
  Witch:["Оживление метлы","Оживление волос","Ковен спутников","Зловещий взгляд","Обмен с фамильяром","Форма фамильяра","Лунные обряды","Верхом на фамильяре","Скрытный фамильяр","Ведьмино варево","Ведьмины когти","Ведьмина шляпа"],
  Oracle:["Страж смерти","Божественное чудо","Божественное зрение","Зрение оракула","Откровение огня","Откровение жизни","Откровение душ","Откровение войны","Касание огня","Истина смерти","Истина огня","Истина войны","Истина душ","Двойное откровение","Понимание войны"],
  Shaman:["Аватар стихий","Танец духов","Стихийное оружие","Заряженное оружие","Наставление духов","Туманник","Усиленная связь","Первородная земля","Первородный лёд","Первородный огонь","Первородные бури","Излучение силы","Обряд мастерства","Прикосновение шамана","Оберегающая сила"]
 },
 mechanics:{
  coreLoop:"full_caster + one Occult Tradition + replaceable Occult Rites",
  runtimeStatus:"complete_runtime",
  resources:["spellSlots","occultRites","occultistFateReading","occultistBloodMagic","hitDice"],
  actions:["chooseTradition","chooseCoven","chooseMystery","chooseRite","replaceRite","useRite","traditionalMastery","oldWays","rest"],
  combatHooks:["attackModifiers","saveModifiers","spellDamageModifiers","checkModifiers","onTurnEnd"],
  notes:"Runtime and canonical data are synchronized. Remaining work is ordinary APK/device QA, not an unfinished class mechanic."
 }
};
