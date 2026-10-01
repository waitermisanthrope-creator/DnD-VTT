/** occultist_runtime.js — KibblesTasty Occultist v1.1
 * Русский runtime-слой для существующего класса Оккультист.
 * Правила сверены с публичной версией KibblesTasty; тексты механик пересказаны.
 */
(function(g){
'use strict';
var D=g.DNDContent;if(!D)return;
var CLASS='Оккультист',SOURCE='KibblesTasty Occultist v1.1',PACK_ID='kibbles-occultist-v11';
function lvl(h){var c=(h&&h.classes||[]).find(function(x){return x.name===CLASS||x.englishName==='Occultist';});return c?Number(c.level)||0:0;}
function ability(h,k){var a=h.abilityScores||h.stats||{};var m={wis:'wisdom',con:'constitution',dex:'dexterity',str:'strength'};return Number(a[k]!==undefined?a[k]:a[m[k]])||10;}
function mod(h,k){return Math.floor((ability(h,k)-10)/2);}
function prof(h){var l=lvl(h);return Number(h.proficiencyBonus)||Math.floor((l-1)/4)+2;}
var slots=[
[0,2,0,0,0,0,0,0,0],[0,3,0,0,0,0,0,0,0],[0,4,2,0,0,0,0,0,0],[0,4,3,0,0,0,0,0,0],
[0,4,3,2,0,0,0,0,0],[0,4,3,3,0,0,0,0,0],[0,4,3,3,1,0,0,0,0],[0,4,3,3,2,0,0,0,0],
[0,4,3,3,2,1,0,0,0],[0,4,3,3,3,2,0,0,0],[0,4,3,3,3,2,1,0,0],[0,4,3,3,3,2,1,0,0],
[0,4,3,3,3,2,1,1,0],[0,4,3,3,3,2,1,1,0],[0,4,3,3,3,2,1,1,1],[0,4,3,3,3,2,1,1,1],
[0,4,3,3,3,2,1,1,1,1],[0,4,3,3,3,3,1,1,1,1],[0,4,3,3,3,3,2,1,1,1],[0,4,3,3,3,3,2,2,1,1]
];
var cantrips=[3,3,3,3,4,4,4,4,4,5,5,5,5,5,5,5,5,5,5,5];
var known=[4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,22];
var riteKnown={2:2,5:3,7:4,9:5,12:6,15:7,18:8,20:8};
var baseFeatures=[
[1,'Заклинания','Полный кастер: 3 заговора на 1 уровне, известные заклинания по таблице, Wisdom — базовая характеристика; можно ритуально накладывать известные заклинания с тегом ритуала.'],
[1,'Оккультная традиция','На 1 уровне выбирается Оракул, Шаман или Ведьма. Традиция даёт особенности на 1, 3, 6 и 14 уровнях.'],
[2,'Оккультные обряды','На 2 уровне выбираются 2 обряда; дополнительные обряды открываются по таблице. При повышении уровня один известный обряд можно заменить другим доступным.'],
[4,'Увеличение характеристик','На 4, 8, 12, 16 и 19 уровнях — ASI/черта.'],
[10,'Традиционное мастерство','Экспертиза в одном подходящем навыке традиции; можно потратить ячейку 1 уровня, чтобы получить преимущество на проверку Мудрости.'],
[20,'Старые пути','Все известные заклинания 3 уровня и ниже становятся ритуалами; не-ритуальные заклинания требуют материальные компоненты 10 зм за уровень, а ритуал ускоряется до нескольких ходов по уровню заклинания.']
];
var rites=[
['Алхимические обряды',1,'Владение инструментами алхимика; во время долгого отдыха можно приготовить импровизированное зелье лечения.'],['Кровавые ритуалы',5,'Материальные компоненты ритуалов можно заменить кровью добровольцев; жертвы тратят Кости хитов и получают некротический урон.'],['Кровавая магия',5,'Можно оплачивать заклинания кровью вместо ячеек; общий объём уровней заклинаний ограничен уровнем Оккультиста за долгий отдых.'],['Осквернение предмета',5,'Превращает немагический предмет в проклятый магический предмет с одной из нескольких заданных сил.'],['За гранью смерти',1,'Даёт заклинание Разговор с мёртвыми и позволяет один раз применять его без ячейки за отдых.'],['Клеймёный фокус',1,'Метка на теле становится фокусом; для компонентов V/S/M больше не нужна свободная рука.'],['Эксперт традиции',10,'Дополнительная экспертиза из списка Традиционного мастерства.'],['Запретные обряды',5,'Даёт заклинание Анимация мёртвых как заклинание Оккультиста; его нельзя превратить в ритуал через Потерянный ритуал.'],['Потерянный ритуал',1,'Одно известное заклинание до 5 уровня становится ритуалом и может быть наложено таким образом раз за отдых.'],['Оккультное ускорение',5,'Даёт заклинание Ускорение как заклинание Оккультиста.'],['Защитные метки',1,'Постоянно действует Магическая броня.'],['Обряд бессмертия',15,'Старение продолжается, но смерть от старости становится невозможной.'],['Обряд молодости',15,'Внешний возраст перестаёт изменяться.'],['Корень магии',15,'Изучаются 10 заговоров из любых списков; они считаются заклинаниями Оккультиста.'],['Пространственное хранилище',1,'Предмет превращается в компактное пространственное хранилище с вместимостью, зависящей от уровня Оккультиста.'],['Специализированные яды',1,'Ядовитый урон можно настроить против одного типа существ, обходя его сопротивление/иммунитет; для остальных типов действует сопротивление.'],['Выжигание души',1,'Холодный, огненный или электрический урон можно преобразовать в некротический.'],['Воинские облачения',1,'Владение лёгкими и средними доспехами и щитами.'],['Обряд мастерства',1,'Один боевой стиль из Дуэлянта, Двух оружий или Великого оружия.'],['Оберегающая сила',1,'Даёт заклинание Щит.']
];
var traditions={
'Ведьма':{
features:[[1,'Ведьмина магия','Изучает Найти фамильяра; фамильяр действует на инициативе Оккультиста и получает дополнительные возможности.'],[1,'Ковен','Выбирается Чёрный, Белый или Зелёный ковен и получаются тематические дополнительные заклинания.'],[3,'Связь с фамильяром','Фамильяр получает Интеллект/Мудрость/Харизму 10 и знает языки хозяина; ковен даёт отдельную реакцию/защиту.'],[6,'Прикосновение ведьмы','При заклинании 1+ уровня можно дать временные HP, добавить урон или изменить следующий бросок атаки/спасбросок на 1d4; эффект можно передать отдельным действием.'],[14,'Мастер проклятий','Для проклятий с расходуемым материальным компонентом можно использовать оккультный фетиш; на длительных проклятиях и hex есть преимущество на концентрацию.']],
rites:['Оживление метлы','Оживление волос','Ковен спутников','Зловещий взгляд','Обмен с фамильяром','Форма фамильяра','Лунные обряды','Верхом на фамильяре','Скрытный фамильяр','Ведьмино варево','Ведьмины когти','Ведьмина шляпа'],
bonus:{'Чёрный ковен':['Гниющее проклятие','Руки Хадара','Слепота/глухота','Тьма','Оживление тени','Призыв теневого порождения','Порча','Чёрные щупальца Эварда','Проклятие убийства','Заражение'],'Белый ковен':['Связывающее проклятие','Лечащее слово','Успокоение эмоций','Удержание личности','Воскрешение','Массовое лечащее слово','Изгнание','Сфера Отилюка','Проклятие бессилия','Призыв небожителя'],'Зелёный ковен':['Ослепляющее проклятие','Опутывание','Изменение облика','Увеличение/уменьшение','Великий образ','Призыв феи','Высшая невидимость','Полиморф','Обменное проклятие','Гнев природы']}
},
'Оракул':{
features:[[1,'Божественное касание','Получает заговоры Наставление и Тауматургия, а также дополнительное заклинание по уровням традиции.'],[1,'Раскрытая тайна','Выбирается тайна: Жизни, Огня, Смерти или Войны; на 5 и 11 уровне можно добавить дополнительные тайны.'],[3,'Чтение судьбы','Реакцией после попадания атаки добавляет модификатор Мудрости к AC до следующего хода; число использований равно бонусу мастерства. Также свободно использует Предсказание.'],[6,'Просветлённое понимание','При активации Откровения получает временные HP, равные модификатору Мудрости.'],[14,'Мастер пророчества','Многократно использует Предсказание без обычного ограничения и может заранее резервировать кости для будущих бросков.']],
rites:['Страж смерти','Божественное чудо','Божественное зрение','Зрение оракула','Откровение огня','Откровение жизни','Откровение душ','Откровение войны','Касание огня','Истина смерти','Истина огня','Истина войны','Истина душ','Двойное откровение','Понимание войны']
},
'Шаман':{
features:[[1,'Духовный воин','Владение простым оружием, лёгкими/средними доспехами и щитами; максимум HP увеличивается на 1 за каждый уровень класса.'],[1,'Призыв духа','Бонусным действием призывает дух огня, холода, молнии, излучения или некротической энергии; дух усиливает оружейные атаки и может быть проявлен на расстоянии.'],[3,'Усиленный дух','При призыве тратится ячейка 1–5 уровня: увеличиваются кости урона духа и временные HP.'],[6,'Дополнительная атака','Две атаки действием Атака; одну или обе можно заменить атаками проявленного духа.'],[14,'Духовное усиление','После заклинания 1+ уровня бонусным действием совершается атака оружием или духом.']],
rites:['Аватар стихий','Танец духов','Стихийное оружие','Заряженное оружие','Наставление духов','Туманник','Усиленная связь','Первородная земля','Первородный лёд','Первородный огонь','Первородные бури','Излучение силы','Обряд мастерства','Прикосновение шамана','Оберегающая сила']
}
};
var mysteries={
'Жизнь':['Лечащее слово','Связь хранителя','Массовое лечащее слово','Аура жизни','Массовое лечение ран'],
'Огонь':['Пылающие руки','Непрерывное пламя','Огненный шар','Огненный щит','Испепеление'],
'Смерть':['Ложная жизнь','Покой с миром','Иссушение','Порча','Проклятие убийства'],
'Война':['Громовой удар','Клеймящая кара','Ослепляющая кара','Ошеломляющая кара','Изгоняющая кара'],
'Души':['Невидимый слуга','Целительный дух','Стражи духов','Страж веры','Возвращение к жизни']
};
var spells={
0:['Кислотный всплеск','Ожог','Холодное прикосновение','Создание костра','Разлагающее прикосновение','Танцующие огоньки','Друидское искусство','Огненные кулаки','Заморозка','Леденящее прикосновение','Наставление','Порыв','Ледяное оружие','Заражение','Свет','Электрический манок','Волшебный камень','Починка','Послание','Малая иллюзия','Формирование земли','Ядовитые брызги','Первобытная дикость','Создание пламени','Формирование воды','Шипастая плеть'],
1:['Поглощение стихий','Дружба с животными','Порча','Связь со зверем','Пылающие руки','Причина страха','Обряд','Понимание языков','Лечение ран','Калечащая агония','Обнаружение магии','Обнаружение яда и болезней','Маскировка','Диссонирующий шёпот','Электризация','Опутывание','Падение пёрышком','Туманное облако','Хватка мёртвых','Град шипов','Ледяной нож','Идентификация','Иллюзорный текст','Нанесение ран','Вызывающая головную боль','Тошнотворный яд','Луч болезни','Разговор с животными','Духовная консультация','Едкая кислота Таши','Безобразный смех Таши','Невидимый слуга','Ведьмина молния'],
2:['Изменение облика','Проворство','Послание животным','Оживление предмета','Предсказание','Кора','Слепота/глухота','Кипящая кровь','Успокоение эмоций','Тьма','Тёмное зрение','Обнаружение мыслей','Форма фамильяра','Земляная рябь','Усиление характеристики','Увеличение/уменьшение','Покой с миром','Целительный дух','Раскалённый металл','Удержание личности','Невидимость','Малое восстановление','Поиск предмета','Кислотная стрела Мелфа','Зеркальный образ','Туманный шаг','Защита от яда','Опаляющий луч','Видение невидимого','Теневая клинка','Тишина','Паучье лазание','Шипастый рост','Внушение','Призыв зверя','Паутина'],
3:['Оживление тени','Проклятие','Мигание','Короткий отдых','Ясновидение','Контрзаклинание','Жестокая марионетка','Рассеивание магии','Страх','Полёт','Газообразная форма','Гипнотический узор','Передача жизни','Магический круг','Невидимость для обнаружения','Рост растений','Дождь пауков','Снятие проклятия','Послание','Снежная буря','Замедление','Стражи духов','Призыв нежити','Вампирское прикосновение','Стена воды','Дыхание под водой','Хождение по воде','Стена ветра','Иссушение'],
4:['Магический глаз','Изгнание','Порча','Очарование чудовища','Принуждение','Замешательство','Призыв малых элементалей','Призыв лесных существ','Управление водой','Предсказание','Стихийный бич','Чёрные щупальца Эварда','Гигантское насекомое','Высшая невидимость','Галлюцинаторная местность','Ледяной шторм','Секретный сундук Леомунда','Поиск существа','Полиморф','Теневая тьма','Призыв элементаля','Ядовитая сфера','Стена огня','Водяная сфера'],
5:['Оживление предметов','Пробуждение','Облако убийства','Общение с природой','Призыв элементаля','Контакт с иным планом','Заражение','Танец смерти','Снятие кожи','Подчинение личности','Сон','Истощение','Подчинение','Великое восстановление','Удержание чудовища','Чума насекомых','Массовое лечение ран','Введение в заблуждение','Изменение памяти','Поток отрицательной энергии','Перерождение','Наблюдение','Видимость','Усиление навыка','Преобразование камня','Стена камня'],
6:['Хижина Бабы','Кости земли','Призыв феи','Предвидение','Создание гомункула','Взгляд','Поиск пути','Превращение в камень','Запрет','Вред','Исцеление','Магическая тюрьма','Массовое внушение','Ментальная тюрьма','Перемещение земли','Замораживающая сфера Отилюка','Первородная защита','Клетка души','Солнечный луч','Иной облик Таши','Истинное зрение','Стена льда','Стена шипов','Хождение по ветру'],
7:['Палец смерти','Огненный шторм','Мираж','Переход между планами','Слово силы: боль','Призматический луч','Проекция образа','Регенерация','Воскрешение','Секвестр','Телепортация','Искажающее извержение','Вихрь'],
8:['Ужасающая засуха Аби-Далзима','Формы животных','Антипатия/симпатия','Клон','Управление погодой','Полуплан','Подчинение чудовища','Землетрясение','Слабоумие','Зажигательное облако','Безумная тьма','Лабиринт','Защита разума','Слово силы: оглушение','Цунами'],
9:['Астральная проекция','Предвидение','Заточение','Неуязвимость','Манипуляция судьбой','Слово силы: исцеление','Слово силы: смерть','Психический крик','Истинное превращение','Истинное воскрешение','Изменение формы','Странность']
};
function riteLevel(name){var d=rites.find(function(x){return x[0]===name;});return d?Number(d[1]):999;}
function availableRites(l){return rites.filter(function(x){return Number(x[1])<=l;}).map(function(x){return x[0];});}
function normalizeRiteState(h,s,l){var allowed=availableRites(l),max=riteKnown[l]||0;s.occultistKnownRites=allowed;if(!Array.isArray(s.occultistSelectedRites))s.occultistSelectedRites=[];s.occultistSelectedRites=s.occultistSelectedRites.filter(function(x){return allowed.indexOf(x)>=0;}).slice(0,max);return s;}
function sync(h){
 var l=lvl(h);if(!l)return;
 var s=h.classFeaturesState=h.classFeaturesState||{};
 s.occultistSaveDC=8+prof(h)+mod(h,'wis');s.occultistSpellAttack=prof(h)+mod(h,'wis');
 s.occultistCantrips=cantrips[l-1];s.occultistKnown=known[l-1];s.occultistRites=riteKnown[l]||s.occultistRites||0;
 s.occultistSlots=slots[l-1].slice(1);s.occultistRitualCasting=true;s.occultistTradition=s.occultistTradition||'Оракул';
 s.occultistBloodMagic=s.occultistBloodMagic||{usedLevels:0,maxLevels:l,recharge:'long'};
 s.occultistLostRitual=s.occultistLostRitual||{spell:null,used:false};
 s.occultistDeathBeyond=s.occultistDeathBeyond||{used:false};
 s.occultistSpecialPoison=s.occultistSpecialPoison||{targetType:null};
 s.occultistSpirit=s.occultistSpirit||null;
 s.occultistFamiliar=s.occultistFamiliar||null;
 s.occultistTraditionalExpertise=s.occultistTraditionalExpertise||[];
 s.occultistOldWays=s.occultistOldWays||false;
 s.occultistCoven=s.occultistCoven||null;s.occultistMystery=s.occultistMystery||null;
 s.occultistFateReadingActive=false;s.occultistFateReadingACUntil=null;
 s.occultistRevelationTempHp=Number(s.occultistRevelationTempHp)||0;
 s.occultistSpiritualEmpowerment=false;s.occultistExtraAttack=false;
 s.occultistMageArmor=false;s.occultistFightingStyle=s.occultistFightingStyle||null;
 s.occultistMarkedFocus=s.occultistMarkedFocus||false;s.occultistArmorTraining=s.occultistArmorTraining||false;
 s.occultistStorage=s.occultistStorage||null;s.occultistDefiledItems=s.occultistDefiledItems||[];
 s.occultistAlchemy=s.occultistAlchemy||{potion:false};s.occultistForbiddenRite=false;
 s.occultistRootCantrips=s.occultistRootCantrips||[];s.occultistImmortal=false;s.occultistAgeless=false;
 s.occultistShieldPrepared=false;s.occultistSoulBurnType=null;s.occultistPoisonTarget=s.occultistPoisonTarget||null;
 s.occultistCursedTargets=s.occultistCursedTargets||{};

 normalizeRiteState(h,s,l);
 if(l>=3)s.fateReadingUses=s.fateReadingUses==null?prof(h):Math.min(Number(s.fateReadingUses)||0,prof(h));
 if(l>=20)s.occultistOldWays=true;
}
function hitDiceState(h){
 var r=h&&h.resources&&h.resources.hitDice;
 if(r)return{current:Number(r.current),max:Number(r.max)};
 if(h&&h.hitDice)return{current:Number(h.hitDice.current!=null?h.hitDice.current:h.hitDice),max:Number(h.hitDice.max||h.hitDice)};
 return{current:0,max:0};
}
function consumeHitDice(h,n){
 n=Math.max(1,Number(n)||1);var hd=hitDiceState(h);
 if(hd.max<=0||hd.current<n)return{ok:false,message:'Недостаточно Костей хитов для кровавой магии.'};
 if(h.resources&&h.resources.hitDice)h.resources.hitDice.current=hd.current-n;
 else if(h.hitDice&&typeof h.hitDice==='object')h.hitDice.current=hd.current-n;
 else h.hitDice=hd.current-n;
 return{ok:true,spent:n,damage:n+'d6'};
}
function saveTarget(h,t,ability,dc){if(!t)return null;return g.DNDCombat&&g.DNDCombat.savingThrow?g.DNDCombat.savingThrow(t,ability,dc,'normal',{saveType:ability}):null;}
function healTarget(t,n){return g.DNDCombat&&g.DNDCombat.heal?g.DNDCombat.heal(t,n):null;}
function condition(t,name,on){if(t&&g.DNDCombat&&g.DNDCombat.toggleCondition)g.DNDCombat.toggleCondition(t,name,on);}
function traditionFeature(h,tr,ctx){
 var l=lvl(h),s=h.classFeaturesState||{},t=ctx&&ctx.target,dc=s.occultistSaveDC;
 if(tr==='Оракул'){
   if(l>=3&&ctx.action==='fate'){if(!t)return{ok:false,message:'Нужна цель.'};return{ok:true,target:t.id,effect:{reaction:true,acBonus:mod(h,'wis'),duration:'until_start_of_turn',uses:s.fateReadingUses},message:'🔮 Чтение судьбы применено.'};}
   if(l>=6&&ctx.action==='revelation'){s.oracleTempHp=Math.max(1,mod(h,'wis'));return{ok:true,effect:{tempHp:s.oracleTempHp},message:'🔮 Просветлённое понимание: временные HP.'};}
   if(l>=14&&ctx.action==='reservedDie'){s.oracleReservedDie=ctx.die||'1d20';return{ok:true,effect:{reservedDie:s.oracleReservedDie},message:'🔮 Кость судьбы зарезервирована.'};}
   return{ok:true,effect:{cantrips:['Наставление','Тауматургия'],tradition:tr},message:'🔮 Божественное касание активно.'};
 }
 if(tr==='Шаман'){
   if(l>=1&&ctx.action==='spirit'){var type=ctx.type||'fire';s.occultistSpirit={type:type,manifested:true,level:l,damageDice:'1d6',tempHp:0,empowered:0};return{ok:true,effect:{summon:'spirit',type:type,rangeFt:30,weaponBonus:prof(h),damageDice:'1d6'},message:'👻 Дух проявлен.'};}
   if(l>=3&&ctx.action==='empowerSpirit'){var n=Math.max(1,Math.min(5,Number(ctx.slot)||1));if((s.occultistSlots[n-1]||0)<=0)return{ok:false,message:'Нет ячейки этого уровня.'};s.occultistSlots[n-1]--;s.occultistSpirit=s.occultistSpirit||{type:ctx.type||'fire',manifested:true};s.occultistSpirit.empowered=n;s.occultistSpirit.damageDice=['','1d6','1d8','1d10','1d12','2d8'][n];s.occultistSpirit.tempHp=Math.max(1,n*Math.max(1,mod(h,'wis')));return{ok:true,effect:{spiritDamage:s.occultistSpirit.damageDice,tempHp:s.occultistSpirit.tempHp},message:'👻 Дух усилен.'};}
   if(l>=6&&ctx.action==='extraAttack')return{ok:true,effect:{extraAttack:true,replaceAttackWithSpirit:true},message:'👻 Дополнительная атака духа.'};
   if(l>=14&&ctx.action==='spiritualEmpowerment')return{ok:true,effect:{bonusActionAttackAfterSpell:true},message:'👻 Духовное усиление активно.'};
 }
 if(tr==='Ведьма'){
   if(ctx.action==='familiar'){s.occultistFamiliar={active:true,initiative:'after_own',languages:'owner',int:10,wis:10,cha:10};return{ok:true,effect:{summon:'occultistFamiliar',familiar:s.occultistFamiliar},message:'🧿 Оккультный фамильяр призван.'};}
   if(l>=3&&ctx.action==='bond'){if(!s.occultistFamiliar||!s.occultistFamiliar.active)return{ok:false,message:'Сначала призови фамильяра.'};s.occultistFamiliar.bonded=true;return{ok:true,effect:{familiarLink:true,shareSaves:true,damageRedirect:true},message:'🧿 Связь с фамильяром установлена.'};}
   if(l>=6&&ctx.action==='touch'){var t2=ctx.target;if(!t2)return{ok:false,message:'Нужна цель.'};var touchHp=Math.max(1,mod(h,'wis'));if(healTarget(t2,touchHp))touchHp=Math.max(touchHp,0);return{ok:true,target:t2.id,effect:{tempHp:touchHp,bonusDie:'1d4'},message:'🧿 Прикосновение ведьмы применено.'};}
   if(l>=14&&ctx.action==='master')return{ok:true,effect:{curseConcentrationAdvantage:true,occultFetish:true},message:'🧿 Мастер проклятий активен.'};
 }
 return{ok:false,message:'Особенность традиции ещё недоступна.'};
}
function use(h,id,ctx){sync(h);ctx=ctx||{};var l=lvl(h),s=h.classFeaturesState||{};
if(id==='traditionFeature')return traditionFeature(h,s.occultistTradition||ctx.tradition||'Оракул',ctx);
if(id==='summonFamiliar')return traditionFeature(h,'Ведьма',Object.assign({},ctx,{action:'familiar'}));
if(id==='summonSpirit')return traditionFeature(h,'Шаман',Object.assign({},ctx,{action:'spirit'}));
if(id==='empowerSpirit')return traditionFeature(h,'Шаман',Object.assign({},ctx,{action:'empowerSpirit'}));
if(id==='bloodCast'){var sl=Math.max(1,Number(ctx.spellLevel)||1);if(l<5)return{ok:false,message:'Кровавая магия доступна с 5 уровня.'};if(sl>l)return{ok:false,message:'Уровень заклинания превышает уровень Оккультиста.'};if(Number(s.occultistBloodMagic.usedLevels||0)+sl>l)return{ok:false,message:'Достигнут лимит кровавой магии до долгого отдыха.'};var hd=consumeHitDice(h,sl);if(!hd.ok)return hd;s.occultistBloodMagic.usedLevels+=sl;return{ok:true,effect:{spellLevel:sl,bloodCost:sl,hitDiceSpent:sl,necroticDamage:hd.damage},message:'🩸 Заклинание оплачено кровью.'};}
if(id==='lostRitual'){var spell=String(ctx.spell||''),spellLevel=Number(ctx.spellLevel)||1;if(!spell||spellLevel>5)return{ok:false,message:'Выбери известное заклинание до 5 уровня.'};if(s.occultistLostRitual.used)return{ok:false,message:'Потерянный ритуал уже использован до отдыха.'};if(s.occultistLostRitual.spell&&s.occultistLostRitual.spell!==spell)return{ok:false,message:'Потерянный ритуал уже выбран.'};s.occultistLostRitual.spell=spell;s.occultistLostRitual.used=true;return{ok:true,effect:{castAsRitual:true,spell:spell,spellLevel:spellLevel},message:'🕯️ Потерянный ритуал применён.'};}
if(id==='deathBeyond'){if(s.occultistDeathBeyond.used)return{ok:false,message:'За гранью смерти уже использовано до отдыха.'};s.occultistDeathBeyond.used=true;return{ok:true,effect:{castSpell:'Разговор с мёртвыми',spellLevel:3,free:true},message:'☠️ Разговор с мёртвыми применён.'};}
if(id==='specialPoison'){s.occultistSpecialPoison.targetType=String(ctx.targetType||'');return{ok:true,effect:{poisonBypass:true,targetType:s.occultistSpecialPoison.targetType},message:'☠️ Специализированный яд настроен.'};}
if(id==='soulBurn'){var typ=String(ctx.damageType||'cold').toLowerCase();if(['cold','fire','lightning'].indexOf(typ)<0)return{ok:false,message:'Можно преобразовать только холод, огонь или молнию.'};s.occultistSoulBurnType=typ;return{ok:true,effect:{convertDamage:{from:typ,to:'necrotic'}},message:'🔥 Выжигание души активно.'};}

if(id==='chooseTradition'){var tr=String(ctx.tradition||'');if(!traditions[tr])return{ok:false,message:'Неизвестная Оккультная традиция.'};if(s.occultistTradition&&s.occultistTradition!==tr)return{ok:false,message:'Оккультную традицию нельзя сменить после выбора.'};s.occultistTradition=tr;return{ok:true,effect:{tradition:tr,featureLevels:[1,3,6,14]},message:'🔮 Традиция выбрана: '+tr+'.'};}
if(id==='chooseCoven'){if(s.occultistTradition!=='Ведьма')return{ok:false,message:'Ковен доступен только Ведьме.'};var cv=String(ctx.coven||'');if(['Чёрный ковен','Белый ковен','Зелёный ковен'].indexOf(cv)<0)return{ok:false,message:'Неизвестный ковен.'};if(s.occultistCoven&&s.occultistCoven!==cv)return{ok:false,message:'Ковен нельзя сменить после выбора.'};s.occultistCoven=cv;return{ok:true,effect:{coven:cv,bonusSpells:traditions.Ведьма.bonus[cv]||[]},message:'🧿 Выбран '+cv+'.'};}
if(id==='chooseMystery'){if(s.occultistTradition!=='Оракул')return{ok:false,message:'Тайна доступна только Оракулу.'};var my=String(ctx.mystery||'');if(!mysteries[my])return{ok:false,message:'Неизвестная тайна.'};if(s.occultistMystery&&s.occultistMystery!==my)return{ok:false,message:'Тайну нельзя сменить после выбора.'};s.occultistMystery=my;return{ok:true,effect:{mystery:my,spells:mysteries[my]},message:'🔮 Выбрана тайна: '+my+'.'};}
if(id==='chooseRite'){var rn=String(ctx.rite||'');var allowed=availableRites(l),max=riteKnown[l]||0;if(allowed.indexOf(rn)<0)return{ok:false,message:'Этот обряд ещё недоступен.'};s.occultistSelectedRites=s.occultistSelectedRites||[];if(s.occultistSelectedRites.indexOf(rn)>=0)return{ok:false,message:'Этот обряд уже выбран.'};if(s.occultistSelectedRites.length>=max)return{ok:false,message:'Достигнут предел известных обрядов ('+max+').'};s.occultistSelectedRites.push(rn);return{ok:true,effect:{selectedRites:s.occultistSelectedRites.slice()},message:'🕯️ Обряд выбран: '+rn+'.'};}
if(id==='replaceRite'){var old=String(ctx.oldRite||''),rn2=String(ctx.rite||''),allowed2=availableRites(l),max2=riteKnown[l]||0; s.occultistSelectedRites=s.occultistSelectedRites||[];if(s.occultistSelectedRites.indexOf(old)<0)return{ok:false,message:'Старый обряд не выбран.'};if(allowed2.indexOf(rn2)<0||riteLevel(rn2)>l)return{ok:false,message:'Новый обряд недоступен.'};if(s.occultistSelectedRites.indexOf(rn2)>=0)return{ok:false,message:'Этот обряд уже выбран.'};if(s.occultistSelectedRites.length>max2)return{ok:false,message:'Нарушен лимит обрядов.'};s.occultistSelectedRites[s.occultistSelectedRites.indexOf(old)]=rn2;return{ok:true,effect:{selectedRites:s.occultistSelectedRites.slice()},message:'🕯️ Обряд заменён: '+old+' → '+rn2+'.'};}
if(id==='fateReading'&&l>=3){if(Number(s.fateReadingUses)<=0)return{ok:false,reason:'Чтение судьбы уже потрачено до долгого отдыха.'};s.fateReadingUses--;s.occultistFateReadingActive=true;if(global.DNDClassFeatures&&h.resources&&h.resources.occultistFateReading)h.resources.occultistFateReading.current=Math.max(0,Math.min(Number(s.fateReadingUses)||0,h.resources.occultistFateReading.max));return{ok:true,effect:{acBonus:mod(h,'wis'),uses:s.fateReadingUses},message:'🔮 Чтение судьбы активировано.'};}
if(id==='augury'){return{ok:true,effect:{free:true},message:'🔮 Предсказание можно использовать без ячейки.'};}
if(id==='spirit'){if(s.occultistTradition!=='Шаман')return{ok:false,message:'Дух доступен только Шаману.'};var type=String(ctx.type||'fire');if(['fire','cold','lightning','radiant','necrotic'].indexOf(type)<0)return{ok:false,message:'Неизвестный тип духа.'};s.occultistSpirit={type:type,manifested:true,level:l,damageDice:'1d6',tempHp:0,empowered:0};return{ok:true,effect:{summon:'spirit',type:type,rangeFt:30,weaponBonus:prof(h),damageDice:'1d6'},message:'👻 Дух призван: '+type+'.'};}
if(id==='empowerSpirit'){if(s.occultistTradition!=='Шаман'||l<3)return{ok:false,message:'Усиленный дух доступен Шаману с 3 уровня.'};var n=Math.max(1,Math.min(5,Number(ctx.slot)||1));if((s.occultistSlots[n-1]||0)<=0)return{ok:false,message:'Нет ячейки этого уровня.'};s.occultistSlots[n-1]--;s.occultistSpirit=s.occultistSpirit||{type:String(ctx.type||'fire'),manifested:true};s.occultistSpirit.empowered=n;s.occultistSpirit.damageDice=['','1d6','1d8','1d10','1d12','2d8'][n];s.occultistSpirit.tempHp=Math.max(1,n*Math.max(1,mod(h,'wis')));return{ok:true,effect:{weaponDamage:s.occultistSpirit.damageDice,tempHP:s.occultistSpirit.tempHp},message:'🔥 Дух усилен ячейкой '+n+' уровня.'};}
if(id==='ritual'&&l>=20){return{ok:true,effect:{ritual:true,materialCostGP:Math.max(0,Number(ctx.spellLevel)||1)*10,extraTurns:Number(ctx.spellLevel)||1},message:'🕯️ Заклинание превращено в ускоренный ритуал.'};}
if(id==='useRite'){
 var rn0=String(ctx.rite||''),selected0=s.occultistSelectedRites||[],rd0=rites.find(function(x){return x[0]===rn0;});
 if(!rd0||selected0.indexOf(rn0)<0||l<rd0[1])return{ok:false,message:'Обряд недоступен или не выбран.'};
 var e0={rite:rn0};
 if(rn0==='Алхимические обряды'){s.occultistAlchemy.potion=true;e0={alchemyTools:true,healingPotion:true,recharge:'long'};}
 else if(rn0==='Кровавые ритуалы'){var donor=ctx.donor||null;if(!donor)return{ok:false,message:'Нужен добровольный донор.'};var d=consumeHitDice(donor,1);if(!d.ok)return d;e0={donorHitDieSpent:1,necroticDamage:'1d6',ritualComponentReplaced:true};}
 else if(rn0==='Кровавая магия')return use(h,'bloodCast',{spellLevel:Number(ctx.spellLevel)||1});
 else if(rn0==='Осквернение предмета'){var item=String(ctx.itemId||'');if(!item)return{ok:false,message:'Нужен ID предмета.'};s.occultistDefiledItems.push({itemId:item,curse:String(ctx.curse||'сила')});e0={itemId:item,curse:String(ctx.curse||'сила')};}
 else if(rn0==='За гранью смерти')return use(h,'deathBeyond',{});
 else if(rn0==='Клеймёный фокус'){s.occultistMarkedFocus=true;e0={focus:true,components:['V','S','M']};}
 else if(rn0==='Эксперт традиции'){s.occultistTraditionalExpertise.push(String(ctx.skill||''));e0={expertise:s.occultistTraditionalExpertise.slice()};}
 else if(rn0==='Запретные обряды'){s.occultistForbiddenRite=true;e0={bonusSpell:'Анимация мёртвых',cannotBecomeRitual:true};}
 else if(rn0==='Потерянный ритуал')return use(h,'lostRitual',{spell:ctx.spell,spellLevel:ctx.spellLevel});
 else if(rn0==='Оккультное ускорение')e0={bonusSpell:'Ускорение'};
 else if(rn0==='Защитные метки'){s.occultistMageArmor=true;e0={mageArmor:true,baseAC:13,plusDex:true};}
 else if(rn0==='Обряд бессмертия'){s.occultistImmortal=true;e0={immuneNaturalDeath:true};}
 else if(rn0==='Обряд молодости'){s.occultistAgeless=true;e0={appearanceAgingStopped:true};}
 else if(rn0==='Корень магии'){var roots=Array.isArray(ctx.cantrips)?ctx.cantrips.slice(0,10):[];s.occultistRootCantrips=roots;e0={cantrips:roots};}
 else if(rn0==='Пространственное хранилище'){s.occultistStorage={capacityFt3:Math.max(1,l*2),items:[]};e0=s.occultistStorage;}
 else if(rn0==='Специализированные яды')return use(h,'specialPoison',{targetType:ctx.targetType});
 else if(rn0==='Выжигание души')return use(h,'soulBurn',{damageType:ctx.damageType});
 else if(rn0==='Воинские облачения'){s.occultistArmorTraining=true;e0={armor:['light','medium','shield']};}
 else if(rn0==='Обряд мастерства'){var fs=String(ctx.style||'Дуэлянт');if(['Дуэлянт','Два оружия','Великое оружие'].indexOf(fs)<0)return{ok:false,message:'Неизвестный боевой стиль.'};s.occultistFightingStyle=fs;e0={fightingStyle:fs};}
 else if(rn0==='Оберегающая сила'){s.occultistShieldPrepared=true;e0={reactionSpell:'Щит'};}
 return{ok:true,effect:e0,message:'🕯️ Обряд применён: '+rn0+'.'};
}
if(id==='rite'){var rn=String(ctx.rite||''),rd=rites.find(function(x){return x[0]===rn;}),selected=s.occultistSelectedRites||[];if(!rd||l<rd[1])return{ok:false,message:'Обряд недоступен на текущем уровне.'};if(selected.indexOf(rn)<0)return{ok:false,message:'Сначала выбери этот обряд в списке известных.'};var re={};if(rn==='Кровавые ритуалы')re={resource:'hitDice',sacrifice:true,necroticDamage:true};else if(rn==='Кровавая магия')re={resource:'hitDice',spellLevelCap:l,bloodCostPerSpellLevel:1};else if(rn==='Осквернение предмета')re={curseItem:true,choices:['проклятие силы','проклятие защиты','проклятие восприятия']};else if(rn==='Запретные обряды')re={bonusSpell:'Анимация мёртвых',cannotBecomeRitual:true};else if(rn==='Защитные метки')re={mageArmor:true,alwaysPrepared:true};else if(rn==='Обряд мастерства')re={fightingStyle:ctx.style||'Дуэлянт',styles:['Дуэлянт','Два оружия','Великое оружие']};else if(rn==='Воинские облачения')re={armorProficiency:['light','medium','shield']};else if(rn==='Оберегающая сила')re={reactionSpell:'Щит'};else if(rn==='Специализированные яды'){re={poisonBypass:true,targetType:ctx.targetType||null};s.occultistSpecialPoison.targetType=ctx.targetType||s.occultistSpecialPoison.targetType;}
else if(rn==='Выжигание души')re={convertDamage:['cold','fire','lightning'],to:'necrotic'};
else if(rn==='Кровавая магия')re={resource:'hitDice',spellLevelCap:l,bloodCostPerSpellLevel:1,maxBloodLevels:l,usedBloodLevels:s.occultistBloodMagic.usedLevels};
else if(rn==='Пространственное хранилище')re={storage:true,capacityByLevel:l,extradimensional:true};
else if(rn==='Потерянный ритуал')re={ritualSpellLevelMax:5,uses:1};else if(rn==='За гранью смерти')re={freeSpell:'Разговор с мёртвыми',uses:1};else if(rn==='Алхимические обряды')re={alchemyTools:true,healingPotionOnLongRest:true};else if(rn==='Прикосновение шамана')re={spellHealingOrDamage:true};else if(rn==='Обряд бессмертия')re={noOldAgeDeath:true};else if(rn==='Обряд молодости')re={ageAppearanceLocked:true};else if(rn==='Корень магии')re={extraCantrips:10};else if(rn==='Пространственное хранилище')re={storage:true,capacityByLevel:l};else if(rn==='Специализированные яды')re={poisonBypass:true};else re={rite:rn};s.occultistActiveRites=s.occultistActiveRites||{};s.occultistActiveRites[rn]=re;return{ok:true,effect:re,message:'🕯️ Обряд активирован: '+rn+'.'};}

if(id==='mystery'){var mn=ctx.mystery||'Жизнь';return{ok:true,effect:{bonusSpells:mysteries[mn]||[]},message:'✨ Тайна '+mn+' применена.'};}
return{ok:false,unsupported:true,message:'Оккультист: неизвестная активная способность '+id};}
function attackModifiers(h,ctx){
 sync(h);ctx=ctx||{};var s=h.classFeaturesState||{},o={bonusAttack:0,bonusDamage:0,extraDice:[],advantage:false,disadvantage:false,extraAttacks:0,notes:[]};
 if(s.occultistFightingStyle==='Дуэлянт'&&ctx.oneHandedWeapon&&!ctx.offHand){o.bonusDamage+=2;o.notes.push('Обряд мастерства: Дуэлянт');}
 if(s.occultistFightingStyle==='Великое оружие'&&ctx.twoHandedWeapon&&ctx.damageRerollAvailable)o.rerollDamage=true;
 if(s.occultistFightingStyle==='Два оружия'&&ctx.offHand)o.bonusDamage+=prof(h);
 if(s.occultistTradition==='Шаман'&&s.occultistSpirit&&s.occultistSpirit.manifested&&ctx.weaponAttack){o.extraDice.push(s.occultistSpirit.damageDice||'1d6');o.notes.push('Духовный воин');}
 if(s.occultistFightingStyle==='Два оружия'&&ctx.offHand)o.bonusDamage+=prof(h);
 if(s.occultistSoulBurnType&&ctx.damageType&&String(ctx.damageType).toLowerCase()===s.occultistSoulBurnType)o.damageTypeOverride='necrotic';
 if(s.occultistPoisonTarget&&ctx.damageType&&String(ctx.damageType).toLowerCase()==='poison'){
   var targetType=String((ctx.target&& (ctx.target.creatureType||ctx.target.type||ctx.target.raceType))||'').toLowerCase();
   if(targetType===String(s.occultistPoisonTarget).toLowerCase())o.ignoreResistance=true;
 }
 if(s.occultistExtraAttack&&ctx.weaponAttack)o.extraAttacks=2;
 if(s.occultistFateReadingActive)o.notes.push('Чтение судьбы: реакция готова');
 return o;
}
function saveModifiers(h,ctx){
 sync(h);ctx=ctx||{};var s=h.classFeaturesState||{},o={bonus:0,advantage:false,disadvantage:false,notes:[]};
 if(s.occultistMageArmor&&ctx.armorClassBase===13)o.notes.push('Защитные метки');
 if(s.occultistCoven==='Белый ковен'&&ctx.charmEffect){o.advantage=true;o.notes.push('Белый ковен');}
 if(s.occultistFateReadingActive){o.bonus+=mod(h,'wis');o.notes.push('Чтение судьбы');}
 if(s.occultistMystery==='Жизни'&&ctx.deathSave){o.bonus+=mod(h,'wis');}
 return o;
}
function spellDamageModifiers(h,ctx){
 sync(h);ctx=ctx||{};var s=h.classFeaturesState||{},o={bonus:0,maximize:false,rerollOne:false,notes:[],selfDamage:0};
 var type=String(ctx.damageType||'').toLowerCase();
 if(s.occultistSoulBurnType&&type===s.occultistSoulBurnType){o.convertDamage={from:type,to:'necrotic'};o.damageTypeOverride='necrotic';o.notes.push('Выжигание души');}
 if(s.occultistCoven==='Чёрный ковен'&&type==='necrotic')o.bonus+=Math.max(0,mod(h,'wis'));
 return o;
}
function checkModifiers(h,ctx){
 sync(h);ctx=ctx||{};var s=h.classFeaturesState||{},o={bonus:0,advantage:false,disadvantage:false,notes:[]};
 if(s.occultistTraditionalExpertise&&ctx.skill&&s.occultistTraditionalExpertise.indexOf(ctx.skill)>=0)o.expertise=true;
 return o;
}
function onTurnEnd(h){
 sync(h);var s=h.classFeaturesState||{};s.occultistFateReadingActive=false;s.occultistSpiritualEmpowerment=false;
 if(s.occultistSpirit&&s.occultistSpirit.manifested&&s.occultistSpirit.tempHp&&s.occultistSpirit.tempHpExpires==='turn')s.occultistSpirit.tempHp=0;
}
var levels={};for(var i=1;i<=20;i++){levels[i]={features:[]};if(i===1)levels[i].features=['Заклинания','Оккультная традиция'];if(riteKnown[i])levels[i].features.push('Оккультные обряды');if([4,8,12,16,19].indexOf(i)>=0)levels[i].features.push('Увеличение характеристик');if(i===10)levels[i].features.push('Традиционное мастерство');if(i===20)levels[i].features.push('Старые пути');if([3,6,14].indexOf(i)>=0)levels[i].features.push('Особенность традиции');}
function rest(h,type){
 sync(h);var s=h.classFeaturesState||{};
 if(type==='long'){
   s.occultistBloodMagic.usedLevels=0;s.occultistLostRitual.used=false;s.occultistDeathBeyond.used=false;
   if(s.fateReadingUses!==undefined)s.fateReadingUses=prof(h);
   s.oracleReservedDie=null;s.occultistAlchemy.potion=false;s.occultistFateReadingActive=false;
   if(s.occultistSpirit)s.occultistSpirit.manifested=false;
 }
 return{ok:true,type:type};
}
var pack={id:PACK_ID,name:CLASS,source:SOURCE,metadata:{edition:'5E',hitDie:6,primaryStat:'wisdom',savingThrows:['wisdom','charisma'],armor:[],weapons:['daggers','quarterstaff','light_crossbow'],tools:['herbalism_kit'],multiclassRequirement:{wisdom:13},skillsChoose:2,subclassLevel:1,subclassFeatureLevels:[1,3,6,14]},features:baseFeatures.map(function(x){return{id:'occultist-'+x[1],level:x[0],name:x[1],description:x[2]};}),levels:levels,spellcasting:{ability:'wisdom',cantripsKnown:cantrips,spellsKnown:known,slots:slots},spells:spells,rites:rites.map(function(x){return{id:x[0].replace(/\s+/g,'-').toLowerCase(),name:x[0],level:x[1],description:x[2]};}),traditions:traditions,mysteries:mysteries,hooks:{sync:sync,useFeature:use,rest:rest,attackModifiers:attackModifiers,saveModifiers:saveModifiers,spellDamageModifiers:spellDamageModifiers,checkModifiers:checkModifiers,onTurnEnd:onTurnEnd}};
D.registerClass(pack);
g.CLASSES_REFERENCE=g.CLASSES_REFERENCE||{};g.CLASSES_REFERENCE[CLASS]={source:SOURCE,hitDie:6,primaryStat:'wisdom',savingThrows:['wisdom','charisma'],subclassLevel:1,subclassFeatureLevels:[1,3,6,14],contentPackId:PACK_ID};
g.occultistRuntime={sync:sync,useFeature:use,rest:rest,attackModifiers:attackModifiers,saveModifiers:saveModifiers,spellDamageModifiers:spellDamageModifiers,checkModifiers:checkModifiers,onTurnEnd:onTurnEnd};
g.OCCULTIST_KIBBLES_V11={VERSION:'1.1',PACK_ID:PACK_ID,spellLevels:spells,rites:rites,traditions:Object.keys(traditions),mysteries:Object.keys(mysteries)};
})(window);
