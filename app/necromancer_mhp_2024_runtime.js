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
function getState(h){h.classFeaturesState=h.classFeaturesState||{};h.classFeaturesState.necromancer=h.classFeaturesState.necromancer||{};return h.classFeaturesState.necromancer;}
function classEntry(h){return (h&&h.classes||[]).find(c=>c&&(['Некромант','Necromancer'].includes(c.name)||c.englishName==='Necromancer'));}
function classLevel(h){var c=classEntry(h);return Math.max(0,Math.min(20,c?Number(c.level)||0:Array.isArray(h&&h.classes)?0:Number(h&&h.level)||1));}
function intMod(h){var a=h.abilityScores||h.stats||h.abilities||h;return Math.floor((Number(a.intelligence??a.int??10)-10)/2);}
function syncState(h){
 var l=classLevel(h),s=getState(h);if(!l)return s;h.resources=h.resources||{};
 [['charnelTouch',l*5],['undyingServitude',l>=18?1:0]].forEach(([id,max])=>{var r=h.resources[id];h.resources[id]={max,current:r?Math.min(Math.max(0,Number(r.current)||0),max):max,recharge:'long'};});
 var c=classEntry(h),chosen=c&&c.subclass,key=order.find(k=>k===chosen||subclasses[k].name===chosen);if(key)s.graveAmbition=key;else if(c)s.graveAmbition=null;
 s.thrallLimit=THR[l];s.crTotal=CR[l];s.deadSpaceCapacity=12;s.thrallIds=s.thrallIds||[];s.deadSpace=s.deadSpace||[];
 h.spellSaveDC=8+(Number(h.proficiencyBonus)||PB[l])+intMod(h);h.spellAttackBonus=(Number(h.proficiencyBonus)||PB[l])+intMod(h);
 return s;
}
function spend(h,id,n){var r=h.resources&&h.resources[id];n=Math.max(0,Number(n)||0);if(!r||r.current<n)return false;r.current-=n;return true;}
function subclassFeatureEffect(h,sub,level,ctx){
 ctx=ctx||{};var l=classLevel(h),s=getState(h),id=Object.keys(subclasses).find(function(k){return subclasses[k]===sub;})||sub.id||'';
 var E={};
 E.blackRider={3:{effect:{proficiencies:['martial','light_armor','medium_armor','shields'],mount:true,bonusCharnelTouchAfterAttack:true,intToAC:true},message:'⚔️ Чёрный всадник активирован.'},6:{effect:{reactionDamageReduction:'up_to_half',extraAttack:true,mountCantripSwap:true},message:'🛡️ Могильный щит готов.'},10:{effect:{spectralMounts:true,mountSpeed:60,durationMinutes:10},message:'🐎 Жуткий натиск готов.'},20:{effect:{resistance:['bludgeoning','piercing','slashing'],nightmareMount:true},message:'💀 Дуллахан активирован.'}};
 E.bloodAscendent={3:{effect:{healOnCharnelKill:'intelligence+necromancerLevel'},message:'🩸 Кровавое истощение активно.'},6:{effect:{transform:['bat','mist'],durationMinutes:60,cost:15},message:'🦇 Вампирское превращение готово.'},10:{effect:{summon:['wolves','bat_swarm','rat_swarm']},message:'🦇 Дети ночи готовы.'},20:{effect:{regeneration:10,climb:true,doubleSpeed:true,sunlightHazard:true},message:'🧛 Носферату активирован.'}};
 E.corpseFlorist={3:{effect:{thrallType:'plant',healAfterRest:'1d8+int',bindOnCharnelSpend:5},message:'🌹 Сад могилы активирован.'},6:{effect:{bonusActionSeed:true,rangeFt:15,save:'dexterity',damage:'1d8 necrotic',tempHp:'sameAsDamage'},message:'🌱 Гнилое семя готово.'},10:{effect:{raiseThrallOnSeedKill:true,perTurn:1},message:'🌺 Смерть в цвету готова.'},20:{effect:{anchors:13,teleportRangeFt:30,regeneration:10,regenerationBlockedBy:['0hp','complete_darkness']},message:'🌳 Ботанический лич активирован.'}};
 E.crone={3:{effect:{curseSave:'wisdom',cursePenalty:'1d6',triggerSpend:5,durationUntilSave:true},message:'🧙 Могильное проклятие готово.'},6:{effect:{cauldron:true,brewMinutes:10,cost:10,potionCap:'intelligence'},message:'🧪 Ведьмин котёл готов.'},10:{effect:{thrallInvisible:true,duration:'until_start_of_next_turn',swapWithThrallRangeFt:30,cost:10},message:'🕷️ Нечестные уловки готовы.'},20:{effect:{touchThreshold:25,saveDisadvantage:true,thrallAdvantage:true,witchItemFlySpeed:60,spellSlotSubstitute:true},message:'🧙 Баба Яга активна.'}};
 E.deadMistAcolyte={3:{effect:{payOwnHPForCharnel:true,healingSpellsCannotHealSelf:true},message:'🌫️ Поглощение тумана активно.'},6:{effect:{healPer5Charnel:'1d8',gaseousReaction:true,usesPerRest:1},message:'🌫️ Восстановление туманом готово.'},10:{effect:{summon:'Duskfog'},message:'🌫️ Сумеречный туман готов.'},20:{effect:{resistance:['bludgeoning','piercing','slashing'],gaseousBody:true,fly:true,healAfterNecrotic:'2d6+int'},message:'🌫️ Владыка тумана активирован.'}};
 E.deathKnight={3:{effect:{proficiencies:['martial','light_armor','medium_armor','shields'],intToAC:true,bonusCharnelTouchAfterAttack:true,tempHpFromCharnel:true},message:'⚔️ Рыцарь смерти активирован.'},6:{effect:{extraAttack:true,attackCantripSwap:true},message:'⚔️ Дополнительная атака готова.'},10:{effect:{refundCharnelOnThrallLoss:'necromancerLevel'},message:'☠️ Перезаряженные слуги активны.'},20:{effect:{resistance:['bludgeoning','piercing','slashing'],extraAttacks:3,necroticIgnoreResistance:true,necroticIgnoreImmunity:true},message:'👑 Император активирован.'}};
 E.necrodancer={3:{effect:{thrallDance:true,danceBonusByCount:true},message:'💃 Танец слуг активирован.'},6:{effect:{shareDanceBonus:true,cost:5},message:'💃 Танго кладбища готово.'},10:{effect:{thrallEthereal:true,durationTurns:1},message:'👻 Дискотека мёртвых готова.'},20:{effect:{targets:10,save:'charisma',damage:'8d6 psychic',freedomOfMovement:true,abilityBonus:{dexterity:4,charisma:4},maxAbility:25,cost:20},message:'🕺 Триллер активирован.'}};
 E.overlord={3:{effect:{thrallAura:true,rangeFt:30,bonusSteps:[1,2,3],cost:[5,10,15]},message:'👑 Трупная аура активна.'},6:{effect:{socialBonus:'intelligence'},message:'🗣️ Деспотическая речь активна.'},10:{effect:{reactionRedirectAttack:true,rangeFt:5},message:'🛡️ Жертвенный слуга готов.'},20:{effect:{bodyPossession:true,rangeFt:120,commandSpellsWithoutSlot:['Command','Dominate Beast','Dominate Person','Geas','Dominate Monster']},message:'👑 Тиран активирован.'}};
 E.paleMaster={3:{effect:{necromancyDamageBonusPerCharnel:true,maxSpend:'level+int'},message:'💀 Усиление готово.'},6:{effect:{fear:true,rangeFt:60,save:'wisdom',cost:10},message:'☠️ Страх готов.'},10:{effect:{releaseDeadSpaceOnInitiative:true,moveThralls:true},message:'☠️ Натиск слуг готов.'},20:{effect:{restoreSpellLevels:'d8',antiMagicAdvantage:true,touchParalyzeThreshold:30},message:'💀 Архилич активирован.'}};
 E.pharaoh={3:{effect:{divineChannelUses:2,onePerShortRest:true,ankhBlessing:true,radiantRetaliation:'1d6'},message:'𓂀 Анкх сияния готов.'},6:{effect:{thaumaturgyEnhanced:true,avatarStorm:true},message:'𓂀 Ложная божественность активна.'},10:{effect:{destroyThrallToHeal:true,rangeFt:60,heal:'thrallHP',targetOncePerLongRest:true},message:'𓂀 Скарабей суда готов.'},20:{effect:{canopicJars:4,magicAdvantage:true,touchMaxHpCut:true,sandVortex:true},message:'𓂀 Царь мумий активирован.'}};
 E.plagueLord={3:{effect:{poisonOnCharnel:true,poisonIgnoresResistance:true,poisonIgnoresImmunity:true,auraDebuff:'1d4',auraRangeFt:5},message:'☣️ Владыка чумы активен.'},6:{effect:{touchRangeBonusFt:10},message:'☣️ Дальность касания увеличена.'},10:{effect:{thrallDeathExplosion:{radiusFt:5,damage:'4d6 poison',save:'dexterity',poisoned:true}},message:'☣️ Вздутый слуга готов.'},20:{effect:{deathExplosion:{damage:'5d10 poison + 5d10 necrotic'},touchCurseThreshold:25},message:'☣️ Тучный лич активирован.'}};
 E.reanimator={3:{effect:{sutureOptions:{ac:18,speedMultiplier:2,allSkills:true,bonusHp:'2xlevel',firstAttackAdvantage:true},sutureCost:[15,5,5,10,10],lightningArc:true},message:'⚡ Швы готовы.'},6:{effect:{reviveRecentDead:true,hp:1,tempHp:'2xlevel',cost:20,usesPerLongRest:1},message:'⚡ Разряд Лазаря готов.'},10:{effect:{extraSuture:true,durationMinutes:10},message:'🧵 Быстрый шов готов.'},20:{effect:{constructBody:true,returnAfterHour:true,stats:20,resistance:'physical',selfSuture:true},message:'🧟 Сшитый голем активирован.'}};
 E.reaper={3:{effect:{invisibilityAfterCharnel:true,duration:'until_start_of_next_turn'},message:'🌑 Невидимость Жнеца готова.'},6:{effect:{shadowForm:true,immunity:['grappled','prone'],doubleSpeed:true,wallClimb:true},message:'🌑 Теневая форма готова.'},10:{effect:{thrallFlight:true,ignoreOpportunityAttacksWhileFlying:true},message:'🌑 Полёт слуг активен.'},20:{effect:{charnelHitThreshold:11,flySpeed:60,ghostOnKill:true},message:'💀 Жнец активирован.'}};
 E.toymaker={3:{effect:{slaymateRitual:true,deadSpaceSlots:2,thrallSlots:2},message:'🧸 Игрушечник активирован.'},6:{effect:{soulToyConversion:true},message:'🧸 Запечатление души готово.'},10:{effect:{toyArmy:true},message:'🧸 Армия игрушек готова.'},20:{effect:{toySoulVault:true,immortalityAnchor:true},message:'🧸 Великий игрушечник активирован.'}};
 var byLevel=E[id]&&E[id][Number(level)];if(!byLevel)return null;return Object.assign({ok:true,subclass:id,level:Number(level)},byLevel);
}
function actorContext(h){var owner=window.currentChar||window.currentCharacter;return owner&&String(owner.id)===String(h.id)&&window.DNDSecondaryEntities&&window.DNDSummoning;}
function ownedThrall(h,id){var E=window.DNDSecondaryEntities,e=E&&E.get(id),s=syncState(h);return e&&s.thrallIds.includes(e.id)&&String(e.ownerId)===String(h.id)?e:null;}
function useFeature(h,id,ctx){
 ctx=ctx||{};var l=classLevel(h),s=syncState(h),fid=String(id||'').replace(/^necromancer[-:]/,'');
 if(!l)return {ok:false,unavailable:true,reason:'Нет уровней Некроманта.'};
 var D=window.DNDContent,f=D&&D.getFeature(id,'mh-necromancer');
 if(f&&!D.resolveFeature(h,id,'Некромант'))return {ok:false,unavailable:true,reason:'Способность недоступна текущему уровню или стремлению.'};
 if(fid==='chooseAmbition'){
   var key=order.find(k=>k===ctx.subclass||subclasses[k].name===ctx.subclass);
   if(l<3||!key)return {ok:false,reason:'Выберите доступное Могильное стремление.'};
   s.graveAmbition=key;var c=classEntry(h);if(c)c.subclass=key;return {ok:true,subclass:key,message:'Могильное стремление: '+subclasses[key].name};
 }
 if(fid==='charnelTouch'||fid==='graveTouch'){
   var n=ctx.points==null?1:Number(ctx.points),t=ctx.target,B=window.DNDCombat;
   if(!Number.isInteger(n)||n<1||n>Math.min(5*(Number(h.proficiencyBonus)||PB[l]),5*l))return {ok:false,reason:'Недопустимое число очков касания.'};
   if(!t||!B||!B.attack||!B.applyDamage)return {ok:false,reason:'Нужны цель и боевой движок.'};
   if(ctx.distanceFt!=null&&Number(ctx.distanceFt)>5)return {ok:false,reason:'Цель вне досягаемости касания.'};
   if(h.resources.charnelTouch.current<n)return {ok:false,reason:'Недостаточно очков Могильного касания.'};
   if(ctx.mode==='heal'){
     var e=ownedThrall(h,t.entityId||t.id);if(!e||!actorContext(h))return {ok:false,reason:'Лечение доступно только своему слуге.'};
     var healed=window.DNDSummoning.heal(e.id,n);if(!healed||!healed.ok)return {ok:false,reason:'Не удалось вылечить слугу.'};
     spend(h,'charnelTouch',n);return {ok:true,healed,message:'Слуга исцелён Могильным касанием.'};
   }
   // Pool points buy fixed damage, not one d8 per point.
   var attack=B.attack(h,t,{bonus:h.spellAttackBonus,spellAttack:true,useRules:false,distanceFt:ctx.distanceFt});
   if(!attack.hit)return {ok:true,attack,spent:0,message:'Промах: очки Могильного касания сохранены.'};
   var damage=B.applyDamage(t,n*(attack.critical?2:1),'necrotic',{attacker:h,source:'charnelTouch',critical:attack.critical});
   spend(h,'charnelTouch',n);return {ok:true,attack,damage,spent:n,targetId:t.id,message:'Могильное касание: '+damage.hpDamage+' урона HP.'};
 }
 if(fid==='darkArcana'){
   var sl=Number(ctx.spellLevel),slot=h.spellSlotsData&&h.spellSlotsData[sl],r=h.resources.charnelTouch;
   if(l<3||!Number.isInteger(sl)||sl<1||sl>9||!slot||Number(slot.used||0)>=Number(slot.max))return {ok:false,reason:'Нужна доступная ячейка заклинания.'};
   if(r.current>=r.max)return {ok:false,reason:'Запас Могильного касания полон.'};
   var gain=Math.max(0,intMod(h));for(var i=0;i<sl;i++)gain+=1+Math.floor(Math.random()*8);
   slot.used=(Number(slot.used)||0)+1;var actual=Math.min(gain,r.max-r.current);r.current+=actual;
   return {ok:true,restored:actual,slotLevel:sl,message:'Тёмная аркана: восстановлено '+actual+' очков.'};
 }
 if(fid==='thralls'||fid==='animateDead'){
   if(l<(fid==='thralls'?2:5)||!actorContext(h))return {ok:false,reason:'Недоступен ритуал или поле боя персонажа.'};
   var corpse=ctx.corpse,block=ctx.statBlock,sl=Number(ctx.spellLevel||3),slot=h.spellSlotsData&&h.spellSlotsData[sl];
   if(fid==='animateDead'&&(!Number.isInteger(sl)||sl<3||sl>9||!slot||Number(slot.used||0)>=Number(slot.max)))return {ok:false,reason:'Нужна ячейка 3 круга или выше.'};
   if(!corpse||corpse.necromancerRaised||Number(corpse.hpCurrent??corpse.hp??1)>0)return {ok:false,reason:'Нужно неиспользованное мёртвое тело.'};
   if(!block||!Number.isFinite(Number(block.cr))||Number(block.cr)<0||!(Number(block.maxHp||block.hp)>0)||!(Number(block.ac)>0)||!Array.isArray(block.actions)||!block.actions.length)return {ok:false,reason:'Нужен полный статблок слуги: CR, HP, КД и действия.'};
   var E=window.DNDSecondaryEntities;s.thrallIds=s.thrallIds.filter(id=>E.get(id)||s.deadSpace.some(x=>x.id===id));
   var all=s.thrallIds.map(id=>E.get(id)||s.deadSpace.find(x=>x.id===id)),total=all.reduce((n,e)=>n+Number(e.metadata&&e.metadata.cr||0),0);
   if(all.length>=s.thrallLimit||total+Number(block.cr)>s.crTotal)return {ok:false,reason:'Превышен лимит числа или общего CR слуг.'};
   var spec=Object.assign({},block,{ownerId:h.id,ownerTokenId:'bt_'+h.id,source:'necromancer-thrall',sourceType:'class',controlMode:'shared_turn',metadata:Object.assign({},block.metadata,{cr:Number(block.cr),corpseId:corpse.id})});
   var e;try{e=window.DNDSummoning.create(spec);}catch(err){return {ok:false,reason:'Не удалось создать слугу.'};}
   s.thrallIds.push(e.id);corpse.necromancerRaised=e.id;if(fid==='animateDead')slot.used=(Number(slot.used)||0)+1;
   return {ok:true,entity:e,message:'Неживый слуга создан.'};
 }
 if(fid==='deadSpace'){
   if(l<2||!actorContext(h))return {ok:false,reason:'Мёртвое пространство недоступно.'};
   var E=window.DNDSecondaryEntities,mode=ctx.mode||'store',eid=ctx.entityId||(ctx.target&&(ctx.target.entityId||ctx.target.id));
   if(mode==='store'){
     var e=ownedThrall(h,eid);if(!e)return {ok:false,reason:'Выберите своего слугу.'};
     var slots=Math.max(1,Number(e.metadata&&e.metadata.deadSpaceSlots)||1),used=s.deadSpace.reduce((n,x)=>n+Math.max(1,Number(x.metadata&&x.metadata.deadSpaceSlots)||1),0);
     if(used+slots>s.deadSpaceCapacity)return {ok:false,reason:'Мёртвое пространство заполнено.'};
     var copy=JSON.parse(JSON.stringify(e));if(!E.remove(e.id))return {ok:false,reason:'Не удалось убрать слугу.'};
     s.deadSpace.push(copy);window.DNDSummoning.sync();return {ok:true,stored:e.id,message:'Слуга помещён в Мёртвое пространство.'};
   }
   if(mode==='release'){
     var index=s.deadSpace.findIndex(x=>x.id===eid);if(index<0||E.get(eid))return {ok:false,reason:'Слуга не хранится в пространстве или ID занят.'};
     var e;try{e=window.DNDSummoning.create(s.deadSpace[index]);}catch(err){return {ok:false,reason:'Не удалось выпустить слугу.'};}
     s.deadSpace.splice(index,1);return {ok:true,entity:e,message:'Слуга выпущен из Мёртвого пространства.'};
   }
   return {ok:false,reason:'Выберите помещение или выпуск слуги.'};
 }
 if(fid==='undyingServitude'){
   var eid=ctx.entityId||(ctx.target&&(ctx.target.entityId||ctx.target.id)),e=ownedThrall(h,eid);
   if(l<18||!e||e.hp>0||!actorContext(h)||h.resources.undyingServitude.current<1)return {ok:false,reason:'Нужны павший собственный слуга и использование служения.'};
   window.DNDSecondaryEntities.update(e.id,{hp:1,defeated:false});window.DNDSummoning.sync();spend(h,'undyingServitude',1);
   return {ok:true,targetId:e.id,message:'Слуга возвращён к 1 HP.'};
 }
 return {ok:false,unsupported:true,reason:'Эта способность требует отдельного исполняемого обработчика.'};
}
function rest(h,type){syncState(h);if(type==='long')['charnelTouch','undyingServitude'].forEach(id=>{var r=h.resources&&h.resources[id];if(r)r.current=r.max;});}
function attackModifiers(h,ctx){var l=classLevel(h),sub=syncState(h).graveAmbition;return {criticalRange:ctx&&ctx.spellAttack?(l>=14?18:l>=5?19:20):20,extraAttacks:(sub==='deathKnight'||sub==='blackRider')&&l>=6?(sub==='deathKnight'&&l>=20?3:2):1};}

const runtime={progression,subclasses,useFeature,rest,attackModifiers,thrallTypes:[["bloodlurk","Кровосос",2],["boneBeast","Костяной зверь",1],["deadnaught","Мёртвый страж",1],["gorger","Пожиратель",1],["skeleton","Скелет",.25],["spirit","Дух",.25],["zombie","Зомби",.25]],mechanics:{charnelTouch:{pool:"5×уровень",maxSpend:"5×PB",recovery:"long_rest",damage:"necrotic",criticalDoubles:true,missRefunds:true},thralls:{ritualMinutes:10,range:30,sharedReaction:true,sharedBonusAction:true,turn:"before_or_after_necromancer"},deadSpace:{capacity:12,ritualMinutes:60},darkArcana:"bonus_action: slot -> Int mod + 1d8/slot",animateDead:"always_prepared; action; Spirit; Small/Medium corpse -> Skeleton/Spirit/Zombie",criticalSpellcasting:{5:{save1:true,attackCrit:[19,20]},14:{save1or2:true,attackCrit:[18,19,20]}},improvedThralls:7,undyingServitude:18,lichdom:20},variants:{necromancyUnleashed:true,alternateNecromancers:["wisdom","charisma"]},getSubclass(id){return subclasses[id]||null},listSubclasses(){return order.map(id=>({id,name:subclasses[id].name,description:subclasses[id].description}))},sync(c){var l=classLevel(c);syncState(c);return Object.assign({},levels[l]||{},{charnelTouchMax:l*5,charnelTouchSpendMax:5*(Number(c.proficiencyBonus)||PB[l]||0),spellSaveDC:c.spellSaveDC,spellAttackBonus:c.spellAttackBonus});}};

const pack={id:'mh-necromancer',name:'Некромант',aliases:['Necromancer'],source:progression.source,authoritativeSubclasses:true,subclassLevel:3,
features:[['charnelTouch','Могильное касание',1,'action'],['thralls','Неживые слуги',2,'utility'],['deadSpace','Мёртвое пространство',2,'utility'],['necromancer-chooseAmbition','Могильное стремление',3,'choice'],['darkArcana','Тёмная аркана',3,'bonus'],['animateDead','Оживление мёртвых',5,'utility'],['criticalSpellcasting','Критическое колдовство',5,'passive'],['improvedThralls','Улучшенные слуги',7,'passive'],['improvedCriticalSpellcasting','Улучшенное критическое колдовство',14,'passive'],['undyingServitude','Неумирающее служение',18,'reaction'],['lichdom','Личествование',20,'passive']].map(([id,name,level,action])=>({id,name,level,action})),
subclasses:order.map(id=>({id,name:subclasses[id].name,description:subclasses[id].description,pickLevel:3,features:[3,6,10,20].map(level=>({id:'necromancer-'+id+'-'+level,name:subclasses[id].name+' — '+level+' уровень',description:subclasses[id].features[level].join(' '),level,action:'utility'}))})),
hooks:{sync:syncState,useFeature,rest,attackModifiers}};
if(window.DNDContent)window.DNDContent.registerClass(pack);else (window.DND_PENDING_CLASS_PACKS=window.DND_PENDING_CLASS_PACKS||[]).push(pack);

window.NECROMANCER_2024=runtime;window.necromancerRuntime=runtime;window.necromancerProgression=progression;window.NECROMANCER_SUBCLASSES=subclasses;
})();