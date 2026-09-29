/**
 * necromancer_mhp_2024_runtime.js
 * Полный runtime Некроманта 2024/5.5E: прогрессия 1–20, ресурсы,
 * заклинательная таблица, слуги, Dead Space и 14 Grave Ambitions.
 * API: window.necromancerRuntime / window.necromancerProgression.
 */
(function(){
"use strict";
const PB=[0,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6];
const CAN=[0,3,3,3,4,4,4,4,4,4,5,5,5,5,5,5,5,5,5,5,5];
const PREP=[0,4,5,6,7,9,10,11,12,14,15,16,16,17,17,18,18,19,20,21,22];
const THR=[0,0,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6];
const CR=[0,0,.25,.5,.5,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4];
const SLOTS=[[],[2],[3],[4,2],[4,3],[4,3,2],[4,3,3],[4,3,3,1],[4,3,3,2],[4,3,3,3,1],[4,3,3,3,2],[4,3,3,3,2,1],[4,3,3,3,2,1,1],[4,3,3,3,2,1,1],[4,3,3,3,2,1,1,1],[4,3,3,3,2,1,1,1],[4,3,3,3,2,1,1,1,1],[4,3,3,3,2,1,1,1,1],[4,3,3,3,3,1,1,1,1],[4,3,3,3,3,2,1,1,1],[4,3,3,3,3,2,2,1,1]];
const spells={
0:["Acid Splash","Blade Ward","Chill Touch","Dancing Lights","Eldritch Orb","Hocuspocus","Light","Mage Hand","Mending","Message","Minor Illusion","Poison Spray","Prestidigitation","Ray of Frost","Shocking Grasp","Spare the Dying","Spark of Life","True Strike"],
1:["Alarm","Bane","Command","Comprehend Languages","Detect Evil and Good","Detect Magic","Disguise Self","Exhume","Expeditious Retreat","False Life","Feather Fall","Flawed Reconstruction","Fog Cloud","Grease","Tasha's Hideous Laughter","Identify","Illusory Script","Jump","Mage Armor","Might of the Abyss","Protection from Evil and Good","Ray of Sickness","Silent Image","Sleep","Thunderwave"],
2:["Melf's Acid Arrow","Arcane Lock","Blindness/Deafness","Darkness","Darkvision","Detect Thoughts","Enhance Ability","Enlarge/Reduce","Gentle Repose","Hold Person","Invisibility","Knock","Locate Object","Misty Step","Ray of Enfeeblement","See Invisibility","Shatter","Silence","Spider Climb","Web"],
3:["Animate Dead","Bestow Curse","Clairvoyance","Counterspell","Dispel Magic","Fear","Fly","Gaseous Form","Lightning Bolt","Major Image","Nondetection","Protection from Energy","Revivify","Sending","Speak with Dead","Stinking Cloud","Tongues","Vampiric Touch"],
4:["Arcane Eye","Banishment","Blight","Black Tentacles","Death Ward","Dimension Door","Dominate Beast","Gahoul's Scapegoat","Grasp of the Grave","Greater Invisibility","Hallucinatory Terrain","Locate Creature","Phantasmal Killer","Secret Chest"],
5:["Antilife Shell","Cloudkill","Contagion","Dispel Evil and Good","Dominate Person","Dream","Flawed Resurrection","Geas","Hold Monster","Insect Plague","Modify Memory","Scrying","Seeming","Teleportation Circle"],
6:["Chain Lightning","Circle of Death","Contingency","Create Undead","Eyebite","Flesh to Stone","Harm","Magic Jar","True Seeing"],
7:["Etherealness","Finger of Death","Plane Shift","Sequester","Teleport"],
8:["Antimagic Field","Befuddlement","Clone","Dominate Monster","Gahoul's Glorious Gothic","Maze","Mind Blank"],
9:["Astral Projection","Foresight","Power Word Kill","Storm of Vengeance","Weird"]
};
const sc=(name,desc,features,always={})=>({name,description:desc,featureLevels:[3,6,10,20],alwaysPrepared:always,features});
const subclasses={
blackRider:sc("Чёрный всадник","Военный некромант и всадник неживого скакуна.",{
3:["Воинское оружие; лёгкие/средние доспехи; щиты. После Атаки — Могильное касание бонусным действием. В броне Интеллект вместо Ловкости к КД. Ритуал может создать боевого коня-скелета как скакуна."],
6:["Могильный щит: реакцией тратить до половины полученного урона очков Могильного касания. Дополнительная атака; одну атаку можно заменить заговором или атакой скакуна."],
10:["Жуткий натиск: 10 минут, призрачный скакун каждому обычному слуге, скорость 60 футов."],
20:["Дуллахан: сосудом становится собственная голова; сопротивление дробящему/колющему/рубящему вам и скакуну; можно призывать кошмара как неживого скакуна."]
}),
bloodAscendent:sc("Кровавый вознесённый","Вампирская сила без полного проклятия вампира.",{
3:["Кровавое истощение: убийство Могильным касанием восстанавливает HP на Интеллект + уровень некроманта."],
6:["Вампирское превращение: 15 очков, действие, до 1 часа; форма летучей мыши или тумана с соответствующими свойствами формы."],
10:["Дети ночи: ритуал может призывать волков, стаи летучих мышей или крыс как слуг."],
20:["Носферату: гроб-сосуд, регенерация 10 HP, лазание по сложным поверхностям и удвоенная скорость; солнечный свет остаётся опасностью."]
},{3:["Charm Person","Enthrall","Sleep","Suggestion"],5:["Hypnotic Pattern","Vampiric Touch"],7:["Phantasmal Killer","Private Sanctum"],9:["Dominate Person","Modify Memory"]}),
corpseFlorist:sc("Флорист трупов","Выращивает цветущих слуг из мёртвых тел.",{
3:["Сад могилы: выбранные слуги становятся Растениями, но считаются нежитью; после отдыха восстанавливают 1d8 + Интеллект HP. Могильное касание 5+ может опутать целью до конца следующего хода."],
6:["Гнилое семя: бонусное действие, цель в 15 футах; при провале Ловкости получает 1d8 некротического урона в начале хода, а вы столько же временных HP. 1d10 на 11 уровне, 1d12 на 17."],
10:["Смерть в цвету: смерть цели под Гнилым семенем позволяет раз в ход поднять тело как скелета, духа или зомби с Садом могилы."],
20:["Ботанический лич: тринадцать цветов-якорей; телепортация между цветами в 30 футах; регенерация 10 HP, кроме 0 HP и полной темноты."]
},{3:["Barkskin","False Life","Goodberry","Spike Growth"],5:["Plant Growth","Speak with Plants"],7:["Blight","Freedom of Movement"],9:["Reincarnate","Tree Stride"]}),
crone:sc("Карга","Ведьмовские проклятия и зелья.",{
3:["Могильное проклятие: после 5+ урона цель спасается Мудростью; при провале вычитает 1d6 из d20 до успешного спасброска."],
6:["Ведьмин котёл: 10 минут и 10 очков на зелье; максимум Интеллект, минимум 1; после долгого отдыха зелья инертны."],
10:["Нечестные уловки: 10 очков делают слуг невидимыми до начала вашего следующего хода; также можно магическим действием поменяться местами со слугой в 30 футах."],
20:["Баба Яга: при 25+ урона касанием — помеха спасброскам цели и преимущество слуг; зачарованный предмет даёт полёт 60 футов; часть ведьмовских заклинаний можно оплачивать очками вместо ячейки."]
},{3:["Blindness/Deafness","Find Familiar","Tasha's Hideous Laughter","Invisibility"],5:["Bestow Curse","Fly"],7:["Polymorph","Soul Effigy"],9:["Contagion","Seeming"]}),
deadMistAcolyte:sc("Акколит мёртвого тумана","Черпает силу из истощающего жизненную энергию мёртвого тумана.",{
3:["Поглощение тумана: после 5+ урона можно платить собственными HP вместо очков; заклинания не восстанавливают ваши HP."],
6:["Восстановление туманом: 5+ очков дают 1d8 HP за каждые 5; реакцией при уроне можно применить Gaseous Form к источнику урона, 1/отдых."],
10:["Сумеречный туман: ритуал может призывать Duskfog как слуг."],
20:["Владыка тумана: сопротивление дробящему/колющему/рубящему, газообразное тело, полёт и раз за ход лечение 2d6 + Интеллект после некротического урона."]
},{3:["Dead Mist Lash","Fog Cloud","Levitate","Misty Step"],5:["Dead Fog","Gaseous Form"],7:["Banishment","Death Ward"],9:["Antilife Shell","Cloudkill"]}),
deathKnight:sc("Рыцарь смерти","Бронированный боевой некромант.",{
3:["Воинское оружие, лёгкие/средние доспехи и щиты; Могильное касание бонусным действием после Атаки; Интеллект вместо Ловкости к КД в броне; соматические компоненты с оружием/щитом; касание даёт временные HP на размер некротического урона."],
6:["Дополнительная атака; одну атаку можно заменить действием-заговором."],
10:["Перезаряженные слуги: смерть или освобождение слуги возвращает очки касания в размере уровня некроманта."],
20:["Император: сопротивление дробящему/колющему/рубящему; три атаки; некротический урон касания и заклинаний игнорирует сопротивление и иммунитет."]
}),
necrodancer:sc("Некротанцор","Управляет армией нежити через ритм.",{
3:["Акробатика и Выступление с бонусом Интеллекта; воинское Finesse/Ranged оружие. Слуги получают Танец; число танцующих даёт ступенчатый бонус к КД, урону и d20 Ловкости/Харизмы, открывая Отступление, Рывок, атаку бонусным действием, две разные бонусные способности, Уклонение и помеху атакам."],
6:["Танго кладбища: 5 очков и бонусное действие передают союзнику ваш текущий бонус танцующих."],
10:["Дискотека мёртвых: танцующий слуга может на ход уйти на Эфирный план."],
20:["Триллер: 20 очков, до 10 целей, спасбросок Харизмы, при провале 8d6 психического урона; Freedom of Movement без ячейки; Ловкость и Харизма +4, максимум 25."]
}),
overlord:sc("Повелитель","Командует армией и усиливает её.",{
3:["Трупная аура: 5–15 очков, 30 футов до начала следующего хода; слуги получают +1/+2/+3 к d20, урону и КД."],
6:["Деспотическая речь: бонус к Обману, Запугиванию и Убеждению равен Интеллекту."],
10:["Жертвенный слуга: реакцией перенаправляет попавшую атаку на слугу в 5 футах; восстановление отдыхом или ячейкой 2+."],
20:["Тиран: при 0 HP можно овладеть телом гуманоида/слуги в 120 футах; очками касания можно без ячейки колдовать Command, Dominate Beast, Dominate Person, Geas и Dominate Monster."]
},{3:["Bane","Command","Detect Thoughts","Hold Person"],5:["Haste","Slow"],7:["Compulsion","Confusion"],9:["Dominate Person","Geas"]}),
paleMaster:sc("Бледный мастер","Максимально чистая некромантия.",{
3:["Усиление: при уроне заклинанием некромантии 1+ уровня можно добавить некротический урон за очки касания, максимум уровень некроманта + Интеллект."],
6:["Владение Запугиванием и бонус Интеллекта; 10 очков и бонусное действие вызывают страх в 60 футах со спасбросками Мудрости."],
10:["Натиск слуг: при инициативе можно выпустить содержимое Dead Space и переместить всех слуг на их скорость."],
20:["Архилич: раз/долгий отдых восстановить ячейки суммарным уровнем d8; поглощённую душу нельзя вернуть без Wish; преимущество против магии; касание 30+ парализует до начала следующего хода."]
},{3:["Exhume","Invisibility","Might of the Abyss","Ray of Enfeeblement"],5:["Fear","Speak with Dead"],7:["Black Tentacles","Blight"],9:["Cloudkill","Scrying"]}),
pharaoh:sc("Фараон","Псевдобожественный некромант.",{
3:["Священный символ — фокус. Божественный канал: 2 использования, одно возвращается коротким отдыхом; Анкх сияния благословляет до Интеллекта союзников, давая сопротивление первому урону и 1d6 сияющего атакующему в ближнем бою."],
6:["Ложная божественность: расширенные визуальные и световые эффекты Thaumaturgy, включая аватар и бурю."],
10:["Скарабей суда: расход Божественного канала уничтожает слугу и лечит добровольного гуманоида в 60 футах на его HP; цель 1/долгий отдых."],
20:["Царь мумий: четыре канопические банки; преимущество против магии; Могильное касание 20+ проклинает и режет максимум HP; бонусным действием вихрь песка с иммунитетом к урону и ряду состояний на перемещение."]
},{3:["Bless","Darkness","Guiding Bolt","Lesser Restoration","Thaumaturgy"],5:["Bestow Curse","Revivify"],7:["Death Ward","Divination"],9:["Insect Plague","Greater Restoration"]}),
plagueLord:sc("Владыка чумы","Некротические болезни и яд.",{
3:["После 5+ урона касанием — Отравление до начала следующего хода; ваш яд игнорирует сопротивление, а Отравление — иммунитет; враги в 5 футах вычитают 1d4 из d20."],
6:["Дальность касания и заклинаний Touch увеличивается на 10 футов."],
10:["Вздутый слуга: при смерти/освобождении взрывается; 5 футов, спасбросок Ловкости, 4d6 яда и Отравление."],
20:["Тучный лич: при 0 HP взрыв 5d10 яда + 5d10 некротического; касание 25+ создаёт Отравление и проклятие с выбором двух тяжёлых последствий."]
}),
reanimator:sc("Реаниматор","Хирургические и электрические эксперименты.",{
3:["Владение Медицины + Интеллект. За 1 час и очки накладывает до двух швов: броня КД 18 (15), скорость x2 (5), все ваши навыки (5), +2×уровень HP (10), преимущество первой атаки (10). Касание 5+ можно сделать молнией и дугой ударить вторую цель на половину очков."],
6:["Разряд Лазаря: действием возвращает недавно умершего к 1 HP и временным HP 2×уровень; 1/долгий отдых или 20 очков."],
10:["Быстрый шов: действие позволяет наложить дополнительный шов на 10 минут сверх лимита."],
20:["Сшитый голем: искусственное тело-сосуд; возвращение через час с половиной HP; Сила/Ловкость/Телосложение 20; сопротивление физическому урону; швы на себе действием до долгого отдыха."]
}),
reaper:sc("Жнец","Теневой вестник смерти.",{
3:["После 5+ урона касанием — Невидимость до начала следующего хода."],
6:["Теневая форма: действие, затем выход бонусным; нельзя действовать/реагировать, иммунитет к Захвату и Поваленности, атаки с помехой, в темноте невидимость для тёмного зрения, двойная скорость и лазание по поверхностям."],
10:["Слуги получают полёт со скоростью ходьбы и не провоцируют атаки в полёте."],
20:["Касание попадает при d20 11+; полёт 60; убийство Среднего/Маленького не-нежитого касанием создаёт призрака-слугу."]
},{3:["False Life","Inflict Wounds","Invisibility","Silence"],5:["Fear","Speak with Dead"],7:["Greater Invisibility","Phantasmal Killer"],9:["Mislead","Passwall"]}),
toymaker:sc("Игрушечник","Запирает души в игрушечных конструктах.",{
3:["Ритуал создаёт слейматов; два слеймата занимают один лимит слуги и два места Dead Space. За каждые 5 очков можно действием создать двух слейматов."],
6:["Реакцией при смерти существа в 60 футах ловит душу в куклу; кукла не является вашим слугой, душа не может быть воскрешена пока заключена; максимум пять."],
10:["Ритуал может делать слуг Крошечными; такой слуга получает +3 КД."],
20:["Заводной лич: конструктивное тело, иммунитеты к слепоте/очарованию/глухоте/испугу/параличу/оглушению, иммунитет к трём заклинаниям; резервное тело создаётся за 10 дней и 1000+ золота."]
})
};
const order=["blackRider","bloodAscendent","corpseFlorist","crone","deadMistAcolyte","deathKnight","necrodancer","overlord","paleMaster","pharaoh","plagueLord","reanimator","reaper","toymaker"];
const features={1:["Заклинания","Могильное касание"],2:["Неживые слуги","Мёртвое пространство"],3:["Подкласс","Тёмная аркана"],4:["Увеличение характеристик / Черта"],5:["Оживление мёртвых","Критическое колдовство"],6:["Способность подкласса"],7:["Улучшенные слуги"],8:["Увеличение характеристик / Черта"],9:[],10:["Способность подкласса"],11:[],12:["Увеличение характеристик / Черта"],13:[],14:["Улучшенное критическое колдовство"],15:[],16:["Увеличение характеристик / Черта"],17:[],18:["Неумирающее служение"],19:["Эпический дар"],20:["Личествование","Способность подкласса"]};
const levels={}; for(let i=1;i<=20;i++) levels[i]={features:features[i]||[],proficiencyBonus:PB[i],cantrips:CAN[i],preparedSpells:PREP[i],thralls:THR[i],crTotal:CR[i],spellSlots:SLOTS[i]};
const progression={className:"Некромант",englishName:"Necromancer",edition:"5.5E",source:"Mage Hand Press — Necromancer 2024 / Complete Necromancer 2024",status:"implemented_2024_runtime",hitDie:6,primaryStat:"intelligence",savingThrows:["constitution","intelligence"],armor:[],weapons:["simple"],tools:[],skills:{choose:2,from:["arcana","deception","history","intimidation","investigation","medicine","persuasion","religion","stealth"]},multiclassRequirement:{intelligence:13},subclassFeatureLevels:[3,6,10,20],levels,spellcasting:{type:"full_caster",ability:"intelligence",cantripsByLevel:CAN,preparedByLevel:PREP,slotsByLevel:SLOTS,spells},subclasses};
const runtime={progression,subclasses,thrallTypes:[["bloodlurk","Кровосос",2],["boneBeast","Костяной зверь",1],["deadnaught","Мёртвый страж",1],["gorger","Пожиратель",1],["skeleton","Скелет",.25],["spirit","Дух",.25],["zombie","Зомби",.25]],mechanics:{charnelTouch:{pool:"5×уровень",maxSpend:"5×PB",recovery:"long_rest",damage:"necrotic",criticalDoubles:true,missRefunds:true},thralls:{ritualMinutes:10,range:30,sharedReaction:true,sharedBonusAction:true,turn:"before_or_after_necromancer"},deadSpace:{capacity:12,ritualMinutes:60},darkArcana:"bonus_action: slot -> Int mod + 1d8/slot",animateDead:"always_prepared; action; Spirit; Small/Medium corpse -> Skeleton/Spirit/Zombie",criticalSpellcasting:{5:{save1:true,attackCrit:[19,20]},14:{save1or2:true,attackCrit:[18,19,20]}},improvedThralls:7,undyingServitude:18,lichdom:20},variants:{necromancyUnleashed:true,alternateNecromancers:["wisdom","charisma"]},getSubclass(id){return subclasses[id]||null},listSubclasses(){return order.map(id=>({id,name:subclasses[id].name,description:subclasses[id].description}))},sync(c){const l=Math.max(1,Math.min(20,Number(c?.level)||1)),a=Number(c?.intelligence??c?.abilities?.intelligence??10),m=Math.floor((a-10)/2);return Object.assign({},levels[l],{charnelTouchMax:l*5,charnelTouchSpendMax:5*PB[l],spellSaveDC:8+PB[l]+m,spellAttackBonus:PB[l]+m})}};
window.NECROMANCER_2024=runtime;window.necromancerRuntime=runtime;window.necromancerProgression=progression;window.NECROMANCER_SUBCLASSES=subclasses;
})();