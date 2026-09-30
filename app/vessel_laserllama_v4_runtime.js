/**
 * vessel_laserllama_v4_runtime.js
 * Полный runtime класса «Сосуд» (Vessel) laserllama v4.0.0.
 * Источник сверки: публичный GM Binder / laserllama, версия 4.0.0,
 * последняя дата источника — 10.02.2026.
 * API: window.vesselRuntime / window.vesselProgression / window.VESSEL_V4.
 * В runtime хранятся прогрессия, Vessel Spell List, Unsealed Aspects,
 * шесть Sealed Spirits, Sealed Magic и параметры Archon Forms.
 */
(function(){
"use strict";

const PB=[0,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6];
const ASPECTS=[0,1,2,2,3,3,3,4,4,4,5,5,5,6,6,6,7,7,7,7,7];
const CANTRIPS=[0,0,2,2,3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4];
const KNOWN=[0,0,0,2,3,3,3,4,4,5,5,6,7,7,8,8,9,9,10,10,11];
const SLOTS=[0,0,0,2,2,2,2,2,2,2,2,3,3,3,3,3,4,4,4,4,4];
const SLOT_LEVEL=[0,0,0,1,1,2,2,2,2,3,3,3,3,4,4,4,5,5,5,5,5];

const spellList={
0:["chill touch","create bonfire","dancing lights","friends","frostbite","glitterbeam","infestation","lightning lure","mage hand","message","minor illusion","otherworldly grasp","thaumaturgy","thunderclap"],
1:["absorb elements","armor of agathys","arms of hadar","bane","cause fear","charm person","command","dissonant whispers","ensnaring strike","ethereal anchor","faerie fire","feather fall","hellish rebuke","inflict wounds","jump","longstrider","protection from evil & good","sanctuary","sleep","thunderwave","witch bolt"],
2:["alter self","augury","blindness/deafness","blur","darkness","darkvision","detect thoughts","enhance ability","enlarge/reduce","enthrall","flame whip","hold person","invisibility","magic aura","mind spike","mind whip","misty step","see invisibility","shadow blade","silence","spider climb","suggestion"],
3:["bestow curse","clairvoyance","dire wail","dispel magic","fear","fly","gaseous form","haste","hunger of hadar","life transference","nondetection","protection from energy","slow","spectral passage","spirit shroud","thunder step","vampiric touch"],
4:["banishment","eldritch tentacles","blight","charm monster","death ward","dimension door","fire shield","freedom of movement","greater invisibility","phantasmal killer","polymorph","shadow of moil","sickening radiance"],
5:["arcane hand","circle of power","cloudkill","contact other plane","destructive wave","dispel evil & good","enervation","far step","hold monster","spiritual sundering","wall of light"]
};

const aspects={};
function aspect(name,description,prereq){
  aspects[name]={name,description,prerequisite:prereq||null};
}
aspect("Эфирный усик","Действием проявляете один эфирный усик: досягаемость 10 футов, Сила равна Харизме; под Покровом духа досягаемость 20 футов. Усик можно использовать для Ударов, Толчков и Захватов, но не для тонких инструментов, оружия или щитов.");
aspect("Чувство духов","Под Покровом духа магия видна как при Detect Magic, но требуется концентрация. Также при наблюдении подходящего Небожителя, Элементаля, Феи или Исчадия с CR не выше вашего уровня вы узнаёте тип существа, характеристику заклинаний и уровень его высшего заклинания.");
aspect("Внушительное присутствие","Получаете владение Deception, Intimidation или Persuasion. Выберите навык; под Покровом духа имеете преимущество на проверки выбранного навыка.");
aspect("Сверхъестественная сила","Получаете владение Атлетикой. Под Покровом духа можете использовать Харизму вместо Силы для проверок Атлетики, включая Захваты и Толчки.");
aspect("Иридесцентный щит","Требование: 2 уровень. Реакцией, когда вы или существо в пределах вашей досягаемости получает урон под Покровом духа, уменьшаете урон на уровень Сосуда + модификатор Харизмы.");
aspect("Опаловая броня","Требование: 2 уровень. При активации Покрова духа получаете сопротивление дробящему, колющему и рубящему урону; скорость уменьшается на 10 футов. Посеребрённое оружие игнорирует это сопротивление.");
aspect("Мерцающий клинок","Требование: 2 уровень. Удар Иридесцентной атакой, совершаемый в рамках Attack, можно сделать дальнобойной атакой заклинанием с дистанцией 30/90.");
aspect("Вызывающий удар","Требование: 2 уровень. Попав рукопашной Иридесцентной атакой, даёте цели помеху на атаки по целям, кроме вас, до начала вашего следующего хода; иммунитет к Очарованию даёт иммунитет к этому эффекту.");
aspect("Грозный рост","Требование: 7 уровень. При превращении в Архонтскую форму можно увеличить размер на одну категорию, если есть место. За каждую категорию выше Среднего: +5 футов досягаемости рукопашных атак, +1d4 урона ими и +1 к бонусу КД Архонта.");
aspect("Эфирная хватка","Требование: 7 уровень, Сверхъестественная сила. При Захвате под Покровом духа цель использует Харизму вместо Силы для проверки или спасброска на освобождение.");
aspect("Призыв духа","Требование: 7 уровень. Получаете заклинание conjure familiar как заклинание Сосуда и можете применять его ритуалом. Фамильяр — крошечная версия вашего духа, с типом Архонта, способная атаковать.");
aspect("Малая магия","Требование: 7 уровень. 1/долгий отдых можете применить одно из своих Sealed Magic на минимальном уровне без траты ячейки; этот аспект можно взять несколько раз, но каждый экземпляр не может повторно применять одно и то же заклинание.");
aspect("Иридесцентная эгида","Требование: 7 уровень, Иридесцентный щит. Если после вашего щита другое существо всё ещё получает урон, реакцией можете принять на себя половину оставшегося урона.");
aspect("Иной пасть","Требование: 7 уровень. 1/ход в Архонтской форме можете отказаться от одной атаки и заставить существо в пределах досягаемости сделать спасбросок Харизмы. При провале 2d6 некротического урона, а временные HP увеличиваются на половину нанесённого урона; максимум временных HP = 2×уровень.");
aspect("Пронзающий взор","Требование: 7 уровень, Чувство духов. Под Покровом духа нормально видите в магической и немагической тьме/полумраке до 60 футов. Для проверок, основанных на зрении, можете использовать Харизму вместо обычной характеристики.");
aspect("Ослепляющее копьё","Требование: 10 уровень, Мерцающий клинок. Дальность становится 100/300, половина укрытия игнорируется, три четверти считается половиной. При попадании дальней Иридесцентной атакой можно потратить ячейку Сосуда: существа в 30 футах от цели делают спасбросок Ловкости, получая 6d8 урона типа удара при провале или половину при успехе; 7d8 на 13 уровне, 8d8 на 17.");
aspect("Опасный лик","Требование: 10 уровень. При превращении в Архонта выбранные видящие вас существа в пределах 60 футов делают спасбросок Мудрости; при провале Испуганы на 1 минуту. Повторяют спасбросок в конце ходов; пока видят Архонта, имеют помеху.");
aspect("Разрушающий удар","Требование: 10 уровень. При попадании Иридесцентной атакой можно потребовать спасбросок Харизмы; при провале цель до начала вашего следующего хода не может концентрироваться или накладывать заклинания. Одну цель можно заставить бросить спасбросок так только 1/ход.");
aspect("Изначальная жажда","Требование: 14 уровень, Иная пасть. Реакцией в Архонтской форме, увидев заклинание в 30 футах, можете заставить заклинателя пройти спасбросок своей характеристики заклинаний. При провале заклинание срывается; если его уровень не ниже уровня ваших ячеек, вы восстанавливаете ячейку. Использований = модификатор Харизмы, минимум 1, восстановление после долгого отдыха.");
aspect("Эфирные крылья","Требование: 14 уровень. Под Покровом духа получаете полёт 60 футов и можете зависать.");
aspect("Сумеречные шаги","Требование: 14 уровень. Получаете spectral passage. Бонусным действием можете применить его без ячейки; в таком случае эффект длится до конца хода и не требует концентрации.");
aspect("Колоссальный архонт","Требование: 18 уровень, Грозный рост. При использовании Грозного роста можете стать Огромным, если есть место; получаете все преимущества увеличения размера.");
aspect("Владыка духов","Требование: 18 уровень. Действием призываете на 1 час существо того же типа, что ваш Архонт, с CR 6 или ниже, в свободное место в 30 футах. Оно верно вам, действует в вашу инициативу. 1/долгий отдых.");
aspect("Первобытная крепость","Требование: 18 уровень, Опаловая броня. В Архонтской форме получаете сопротивление всему урону, кроме силового, психического и радиантного. Бонусным действием до начала следующего хода уменьшаете получаемый урон на модификатор Харизмы (минимум 1).");

const spirits={};
function spirit(key,data){spirits[key]=Object.assign({key,featureLevels:[3,6,15,20]},data);}

spirit("Вознесённый",{
description:"Запечатанный архимаг/высший магический дух.",
damageType:"по выбору типа урона любого подготовленного заклинания",
magic:{3:["identify","shield"],5:["locate creature","invisibility"],9:["counterspell","minute meteors"],13:["divination","resilient sphere"],17:["arcane hand","commune"]},
features:{
3:["Древние знания: вместо списка известных заклинаний подготавливаете число заклинаний из списка Сосуда или Волшебника, равное вашему числу известных; уровень не выше уровня ваших ячеек. Подготовленные заклинания можно применять ритуалом.","Магия Вознесённого: специальные заклинания всегда подготовлены и не занимают места; Иридесцентные удары могут наносить тип урона любого подготовленного заклинания."],
6:["Мощное колдовство: при нанесении урона заклинанием Сосуда или Волшебника добавляете модификатор Харизмы (минимум +1) к одному броску урона."],
15:["Арканум Вознесённого: изучаете одно заклинание Волшебника 5 уровня и 1/долгий отдых применяете его без ячейки. На 20 уровне получаете аналогично одно заклинание Волшебника 6 уровня."],
20:["Возрождённый архимаг: в Архонтской форме принимаете истинный облик духа; полёт 30 футов; дистанция Astral Step удваивается; бонусным действием каждого хода телепортируетесь на 30 футов; радиус Arcane Blast становится 15 футов."]
},
archon:{type:"Гуманоид",speed:"30 футов, полёт 10 (парение)",acBonus:0,resistances:["весь урон от заклинаний"],skills:["Arcana","History","Religion"],traits:["Arcane Blast: вместо одной атаки взрыв в точке до 60 футов; существа в радиусе 5 футов делают Ловкость и при провале получают урон как от вашей Иридесцентной атаки.","Astral Step: после заклинания телепорт на 10×уровень заклинания футов, минимум 10."]}
});

spirit("Катаклизм",{
description:"Первобытный элементальный дух. На 3 уровне выбирается стихия: Воздух, Земля, Огонь или Вода.",
affinities:{
"Воздух":{damage:"гром",resistance:"гром",archon:"Воздушный Архонт"},
"Земля":{damage:"дробящий",resistance:"дробящий",archon:"Земляной Архонт"},
"Огонь":{damage:"огонь",resistance:"огонь",archon:"Огненный Архонт"},
"Вода":{damage:"холод",resistance:"холод",archon:"Водяной Архонт"}
},
magicShared:{3:["absorb elements"],5:["elemental blade"],9:["elemental bane"],13:["resilient sphere"],17:["far step"]},
magicByAffinity:{
"Воздух":{3:["beckon air","thunderwave"],5:["dust devil"],9:["sonic wave"],13:["storm sphere"],17:["control winds"]},
"Земля":{3:["mold earth","earth tremor"],5:["spike growth"],9:["erupting earth"],13:["pillars of earth"],17:["wall of stone"]},
"Огонь":{3:["control flame","hellish rebuke"],5:["flaming sphere"],9:["fireball"],13:["wall of fire"],17:["flame strike"]},
"Вода":{3:["shape water","torrent"],5:["misty step"],9:["tidal wave"],13:["watery sphere"],17:["maelstrom"]}
},
features:{
3:["Элементальная близость: выберите стихию; она определяет тип урона, сопротивление и Архонта. Иридесцентные атаки могут наносить выбранный тип урона и считаются магическими.","Элементальная магия: получаете общие и зависящие от стихии заклинания."],
6:["Древняя мощь: под Покровом духа получаете иммунитет к своему типу урона от собственных заклинаний и способностей. В Архонтской форме 1–2 на костях урона вашего типа считаются 3."],
15:["Извержение Катаклизма: действием создаёте столб диаметром 15 и высотой 60 футов из точки поверхности в 30 футах; Ловкость, 9d6 урона выбранного типа, половина при успехе. Использований = Харизма, минимум 1/долгий отдых; при отсутствии использования можно потратить ячейку."],
20:["Возрождение Катаклизма: в Архонтской форме истинный облик, погода в радиусе мили отражает стихию, Извержение Катаклизма становится доступным без ограничения."]
},
archons:{
"Воздушный Архонт":{type:"Элементаль",speed:"20 футов, полёт 30 (парение)",acBonus:0,resistances:["гром","молния"],skills:["Акробатика","Скрытность"],traits:["Bluster: при громовом Иридесцентном ударе цель отбрасывается на 10 футов; расстояние уменьшается для более крупных целей.","Elder Elemental: ваш стихийный урон игнорирует сопротивление и превращает иммунитет в сопротивление.","Gaseous: проход через щели 1 дюйм без протискивания; атаки возможности по вам при полёте имеют помеху."]},
"Земляной Архонт":{type:"Элементаль",speed:"30 футов, лазание 30, рытьё 10",acBonus:2,resistances:["кислота","яд"],skills:["Атлетика","Запугивание"],senses:["чувство вибраций 10 футов"],traits:["Elder Elemental: стихийный урон игнорирует сопротивление и превращает иммунитет в сопротивление.","Rock Solid: дробящий Иридесцентный удар вдвое уменьшает скорость цели до начала следующего хода Архонта.","Siege Monster: максимальный дробящий урон по немагическим объектам и сооружениям."]},
"Огненный Архонт":{type:"Элементаль",speed:"40 футов",acBonus:0,resistances:["огонь","радиант"],skills:["Акробатика","Запугивание"],traits:["Elder Elemental: стихийный урон игнорирует сопротивление и превращает иммунитет в сопротивление.","Searing Flame: бросает огненный урон дважды и выбирает результат.","Illumination: яркий свет 30 футов и тусклый ещё 30."]},
"Водяной Архонт":{type:"Элементаль",speed:"30 футов, плавание 50",acBonus:0,resistances:["кислота","холод"],skills:["Акробатика","Скрытность"],senses:["тёмное зрение 120 футов"],traits:["Aqueous: дышит воздухом и водой; проходит щели 1 дюйм без протискивания.","Elder Elemental: стихийный урон игнорирует сопротивление и превращает иммунитет в сопротивление.","Fluid Resilience: реакцией уменьшает полученный урон на Харизму и перемещается на 15 футов без провоцирования; не работает против силового/психического урона."]}
}
});

spirit("Проклятый",{
description:"Могущественный мрачный дух нижних планов.",
damageType:"огонь",
magic:{3:["hellish rebuke","jump"],5:["flame whip","scorching ray"],9:["fireball","haste"],13:["dominate creature","wall of fire"],17:["destructive wave","insect plague"]},
features:{
3:["Зловещая аура: получаете аспект Внушительное присутствие; он не занимает слот аспектов и не заменяется. Если уже есть — получаете другой аспект или ещё один экземпляр с другим навыком.","Проклятая магия: заклинания всегда известны и не заменяются; Иридесцентные удары могут наносить огненный урон."],
6:["Адское пламя: ваш огненный урон игнорирует сопротивление к огню и превращает иммунитет к огню в сопротивление. Существо, получившее от вас огненный урон, не может восстанавливать HP до начала вашего следующего хода."],
15:["Тёмная жертва: бонусным действием уменьшаете текущий и максимальный HP на 10 и восстанавливаете одну ячейку Сосуда. Снижение нельзя уменьшить; после следующего долгого отдыха максимум HP возвращается."],
20:["Владыка тьмы: истинный облик; иммунитет к Очарованию, Испугу, Отравлению, яду и огню; при Attack получаете один дополнительный бонусный Иридесцентный удар; 1/ход огненный Иридесцентный удар может Испугать цель до начала вашего следующего хода."]
},
archon:{type:"Исчадие",speed:"40 футов, лазание 40",acBonus:1,resistances:["огонь","яд"],senses:["тёмное зрение 60 футов"],skills:["Запугивание","Скрытность"],traits:["Frenzy: при Attack Архонт может войти в бешенство до начала следующего хода; все его атаки и атаки по нему совершаются с преимуществом.","Infernal Drain: 1/ход при огненном Иридесцентном ударе временные HP увеличиваются на Харизму; максимум 2×уровень."]}
});

spirit("Падший",{
description:"Падший небесный дух, стремящийся к искуплению или возмездию.",
magic:{3:["divine favor","ethereal anchor"],5:["branding smite","spiritual weapon"],9:["crusader's mantle","revivify"],13:["banishment","guardian of faith"],17:["circle of power","flame strike"]},
features:{
3:["Небесный воин: владение Проницательностью и всеми воинскими оружиями; под Покровом духа добавляете Харизму к проверкам Проницательности.","Божественный гнев: рукопашную атаку оружием под Покровом духа можно усилить; используется Харизма для атаки/урона, урон становится радиантным, атака считается Иридесцентной."],
6:["Осуждение: попав Divine Wrath в Архонтской форме, можете осудить цель до конца трансформации. Её движение от вас стоит вдвое дороже, а ваши Divine Wrath критуют на 19–20."],
15:["Небесное рвение: получаете аспект Эфирные крылья бесплатно; он не заменяется. По Осуждённым Divine Wrath критует на 18–20."],
20:["Божественный мститель: истинный облик; промах по цели даёт преимущество на следующую атаку по ней; крит ослепляет, оглушает слух и лишает речи до начала вашего следующего хода."]
},
archon:{type:"Небожитель",speed:"30 футов",acBonus:2,resistances:["некротический","радиант"],senses:["тёмное зрение 60 футов"],skills:["Запугивание","Религия"],traits:["Divine Ward: бонусным действием даёт видимому существу в 30 футах временные HP = Харизма на 1 минуту.","Wings of Wrath: Divine Wrath получает свойство Thrown 20/60 и оружие возвращается в руку."]}
});

spirit("Бесформенный",{
description:"Оо́зоподобный дух, движимый ненасытным голодом.",
damageType:"кислота",
magic:{3:["caustic brew","entangle"],5:["hold person","web"],9:["grasping vine","slow"],13:["eldritch tentacles","vitriolic sphere"],17:["contagion","hold monster"]},
features:{
3:["Бесформенная форма: под Покровом духа проходите через щели 1 дюйм без протискивания; получаете Эфирный усик бесплатно, он не занимает слот и не заменяется. Если уже есть — получаете другой аспект.","Бесформенная магия: постоянные заклинания; Иридесцентные удары могут наносить кислотный урон."],
6:["Поглощение жизненной силы: в Архонтской форме бонусным действием заставляете спасбросок Телосложения существ, находящихся под вашим Formless Magic или схваченных вами. При провале 2d8 кислоты и временные HP увеличиваются на половину урона; максимум 2×уровень. Урон растёт до 3d8 на 9, 4d8 на 13, 5d8 на 17 и 6d8 на 20."],
15:["Поглощающий удар: когда Архонт получает попадание атакой, реакцией временно поглощаете память об атаке. Первый Иридесцентный удар до конца следующего хода вместо обычного эффекта воспроизводит урон и эффекты поглощённой атаки."],
20:["Первобытный голод: истинный облик; иммунитет к кислоте, кислота игнорирует сопротивление и превращает иммунитет в сопротивление. Действием делаете по одному Иридесцентному удару каждым не занятым Захватом псевдоподом."]
},
archon:{type:"Оо́з",speed:"30 футов, лазание 30",acBonus:1,resistances:["кислота","яд"],immunities:["Захвачен","Сдержан"],senses:["слепое зрение 60 футов"],traits:["Псевдоподы: число дополнительных конечностей = модификатор Харизмы, досягаемость 10 футов; могут делать Иридесцентные удары, Захваты и Толчки.","Липкая слизь: попав рукопашным Иридесцентным ударом по существу не крупнее Архонта, можно потребовать спасбросок Ловкости; провал — Захват, выход действием через спасбросок Силы."]}
});

spirit("Трикстер",{
description:"Фейский дух хаоса, обмана и иллюзий.",
damageType:"психический",
magic:{3:["charm person","color spray"],5:["invisibility","misty step"],9:["enemies abound","hypnotic pattern"],13:["charm monster","dimension door"],17:["dream","mislead"]},
features:{
3:["Изменчивый лик: под Покровом духа можете применять disguise self без ячейки и безошибочно имитировать любые услышанные звуки/голоса.","Магия Трикстера: постоянные заклинания; Иридесцентные удары могут наносить психический урон."],
6:["Иллюзорные удары: каждый раз, когда в свой ход вы должны сделать Иридесцентную атаку, можете отказаться от неё и создать в свободной клетке в 30 футах иллюзорную копию; копия делает один Иридесцентный удар по цели в пределах дальности и исчезает."],
15:["Фейское возмездие: после успешного спасброска против заклинания реакцией заставляете заклинателя пройти спасбросок Мудрости; при провале он получает эффект charm person или charm monster. Одну и ту же цель нельзя очаровать этой способностью снова до следующего рассвета."],
20:["Владыка проделок: истинный облик; дальность Иллюзорных ударов 60 футов; 1/ход можете создать две копии; попав Иридесцентной атакой даёте цели помеху на следующий спасбросок Мудрости."]
},
archon:{type:"Фея",speed:"30 футов",acBonus:0,immunities:["Очарован","Испуган"],senses:["тёмное зрение 60 футов"],skills:["Обман","Скрытность"],traits:["Juxtapose: бонусным действием цель в 60 футах делает спасбросок Харизмы; при провале вы меняетесь местами, цель может добровольно провалить.","Stolen Memory: 1/ход при психическом Иридесцентном ударе цель делает спасбросок Интеллекта; провал означает, что до начала вашего следующего хода она не может вас видеть, слышать, ощущать или выбирать целью."]
}
});

const progression={
1:["Покров духа","Нераскрытые аспекты"],
2:["Магия сосуда"],
3:["Запечатанный дух","Форма архонта"],
4:["Увеличение характеристик (ASI) или Черта"],
5:["Дополнительная атака"],
6:["Способность Запечатанного духа"],
7:["Контролируемая трансформация"],
8:["Увеличение характеристик (ASI) или Черта"],
9:[],
10:["Первобытная воля"],
11:["Старший архонт"],
12:["Увеличение характеристик (ASI) или Черта"],
13:[],
14:["Мрачное сохранение"],
15:["Способность Запечатанного духа"],
16:["Увеличение характеристик (ASI) или Черта"],
17:[],
18:["Освобождённая сила"],
19:["Увеличение характеристик (ASI) или Черта"],
20:["Способность Запечатанного духа"]
};

function vesselState(c){c.classFeaturesState=c.classFeaturesState||{};return c.classFeaturesState.vessel=c.classFeaturesState.vessel||{};}
function vesselLevel(c){return Math.max(1,Math.min(20,Number(c&&c.level)||1));}
function vesselSync(c){var l=vesselLevel(c),s=vesselState(c);s.level=l;s.proficiencyBonus=PB[l];s.aspectMax=ASPECTS[l];s.cantripsMax=CANTRIPS[l];s.spellsKnownMax=KNOWN[l];s.vesselSlotsMax=SLOTS[l];s.vesselSlots=s.vesselSlots==null?SLOTS[l]:Math.min(Math.max(0,Number(s.vesselSlots)||0),SLOTS[l]);s.spellSlotLevel=SLOT_LEVEL[l];s.archonFreeUsesMax=1;s.archonFreeUses=s.archonFreeUses==null?1:s.archonFreeUses;s.archonActive=!!s.archonActive;s.archonTempHP=s.archonTempHP||0;return s;}
function vesselChooseAspect(c,name){var l=vesselLevel(c),s=vesselSync(c),a=aspects[name];if(!a)return {ok:false,reason:"Неизвестный аспект."};if(a.prerequisite){var nums=String(a.prerequisite).match(/\\d+/g);if(nums&&l<Number(nums[0]))return {ok:false,reason:"Недостаточный уровень для этого аспекта."};}if((s.aspects||[]).indexOf(name)<0&&(s.aspects||[]).length>=s.aspectMax)return {ok:false,reason:"Достигнут лимит нераскрытых аспектов."};s.aspects=s.aspects||[];if(s.aspects.indexOf(name)<0)s.aspects.push(name);return {ok:true,selected:s.aspects.slice(),max:s.aspectMax};}
function vesselSelectSpirit(c,name){var s=vesselSync(c);if(!spirits[name])return {ok:false,reason:"Неизвестный Запечатанный дух."};s.spirit=name;return {ok:true,spirit:name,data:spirits[name]};}
function vesselCast(c,spellLevel,spellName){var l=vesselLevel(c),s=vesselSync(c),sl=Number(spellLevel)||s.spellSlotLevel;if(!s.vesselSlots)return {ok:false,reason:"Ячейки магии Сосуда закончились."};if(sl!==s.spellSlotLevel)return {ok:false,reason:"Все ячейки Сосуда имеют текущий уровень "+s.spellSlotLevel+"."};var list=spellList[sl]||[];if(spellName&&list.indexOf(spellName)<0)return {ok:false,reason:"Заклинание отсутствует в списке Сосуда."};s.vesselSlots--;return {ok:true,spell:spellName||null,slotLevel:sl,remaining:s.vesselSlots,maxSlots:s.vesselSlotsMax};}
function vesselArchon(c,forceSlot){var l=vesselLevel(c),s=vesselSync(c);if(l<3)return {ok:false,reason:"Форма архонта доступна с 3 уровня."};if(s.archonActive)return {ok:false,reason:"Форма архонта уже активна."};if(s.archonFreeUses>0){s.archonFreeUses--;s.archonActive=true;s.archonTempHP=2*l;return {ok:true,free:true,tempHP:s.archonTempHP,durationMinutes:10};}if(forceSlot&&s.vesselSlots>0){s.vesselSlots--;s.archonActive=true;s.archonTempHP=2*l;return {ok:true,free:false,tempHP:s.archonTempHP,durationMinutes:10,remainingSlots:s.vesselSlots};}return {ok:false,reason:"Нет бесплатного использования и не выбрана трата ячейки Сосуда."};}
function vesselEndArchon(c){var s=vesselSync(c);s.archonActive=false;s.archonTempHP=0;return s;}
function vesselRest(c,type){var s=vesselSync(c);if(type==="short"||type==="long"){s.vesselSlots=s.vesselSlotsMax;s.archonFreeUses=s.archonFreeUsesMax;}return s;}
window.VESSEL_V4={
version:"4.0.0",updated:"2026-02-10",source:"laserllama / GM Binder",
progression,PB,ASPECTS,CANTRIPS,KNOWN,SLOTS,SLOT_LEVEL,
spellList,aspects,spirits,
mechanics:{
hitDie:10,primaryStat:"charisma",secondaryStat:"constitution",savingThrows:["constitution","charisma"],
armor:["light"],weapons:["simple","scimitar","shortsword"],skills:{choose:2,from:["acrobatics","athletics","insight","intimidation","perception","religion","survival"]},
multiclassRequirement:{constitution:13,charisma:13},
spiritMantle:{toggle:"bonus_action",spiritualDefense:"10 + Constitution modifier + Charisma modifier when no armor/shield",iridescentStrike:"1d6 radiant + Charisma; Charisma to attack; bonus unarmed strike after Attack; die d8 at 5, d10 at 11, d12 at 17"},
vesselMagic:{ability:"charisma",slotsRefresh:"short_rest",focus:"Spirit Mantle",cantripsKnown:{2:2,4:3,11:4}},
archonForm:{durationMinutes:10,tempHP:"2 × Vessel level",freeUses:"1/short_or_long_rest",extraUse:"spend Vessel slot",ends:["unconscious","0 HP","bonus action"],retains:["alignment","personality","ability scores","HP","proficiencies","capable class/race features"]},
sealedSpiritFeatureLevels:[3,6,15,20],
unsealedAspectReplacement:true
}
};

window.vesselProgression={
className:"Сосуд",englishName:"Vessel",source:"laserllama",edition:"5E",sourceVersion:"4.0.0",
status:"implemented_full_v4_runtime",hitDie:10,primaryStat:"charisma",savingThrows:["constitution","charisma"],
armor:["light"],weapons:["simple","scimitar","shortsword"],skills:{choose:2,from:["acrobatics","athletics","insight","intimidation","perception","religion","survival"]},
multiclassRequirement:{constitution:13,charisma:13},subclassLevel:3,subclassFeatureLevels:[3,6,15,20],
progression,mechanics:window.VESSEL_V4.mechanics,spellcasting:"half_pact_warlock_style"
};
window.vesselRuntime=window.VESSEL_V4;window.vesselRuntime.state=vesselState;window.vesselRuntime.sync=vesselSync;window.vesselRuntime.chooseAspect=vesselChooseAspect;window.vesselRuntime.selectSpirit=vesselSelectSpirit;window.vesselRuntime.cast=vesselCast;window.vesselRuntime.archonForm=vesselArchon;window.vesselRuntime.endArchon=vesselEndArchon;window.vesselRuntime.rest=vesselRest;

window.getVesselSpellList=function(level){return (window.VESSEL_V4.spellList[level]||[]).slice();};
window.getVesselAspects=function(level){
 return Object.values(window.VESSEL_V4.aspects).filter(a=>{
   if(!a.prerequisite)return level>=1;
   const m=String(a.prerequisite).match(/(\\d+)th-level|2nd-level|7th-level|10th-level|14th-level|18th-level/);
   return !m || level>=parseInt(m[1]||String(a.prerequisite).match(/\\d+/)?.[0]||0,10);
 });
};
window.getVesselSpirit=function(name){return window.VESSEL_V4.spirits[name]||null;};
})();
/* V70.26.92 closure pass: executable Vessel slots, aspects, spirit and Archon resources. */
