/**
 * shifter_laserllama_v2_1_runtime.js
 * Полный runtime Шифтера laserllama v2.1.0.
 * Источник сверки: публичный GM Binder / laserllama Shifter;
 * v2.1.0 опубликована 25 июня 2026.
 * API: window.shifterRuntime / window.shifterProgression / window.SHIFTER_V21.
 */
(function(){
"use strict";
const PB=[0,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6];
const MAX_CR=[0,0,0.25,0.5,1,1,1,2,2,2,3,3,3,4,4,5,5,5,6,6,6];
const ASI=[4,8,12,16,19];

const bloodlines={};
function line(name,data){bloodlines[name]=Object.assign({name,featureLevels:[1,7,13,18]},data);}

line("Водная",{
englishName:"Aquatic",description:"Кровная линия морских и водных зверей.",
normalForm:{
darkvision:60,underwaterDarkvision:120,naturalArmor:"10 + Dexterity + Constitution",
naturalWeapons:"1d6 рубящий, Finesse, Light",resistance:["холод"],
traits:["Дышите воздухом и водой","Скорость плавания равна скорости ходьбы"]
},
features:{
1:["Водная адаптация","Водные формы: все Beast с подтипом Aquatic считаются кровными формами."],
7:["Сокрушительная сила: 1/ход после попадания природным оружием цель делает спасбросок Силы. При провале вы отбрасываете её на 10 футов либо уменьшаете её скорость на 10 футов; на 13 уровне дальность отбрасывания 20 футов, на 18 — 30. Более крупные цели имеют преимущество."],
13:["Мистические воды: при превращении в кровную форму можно потратить Adrenaline Surge; на время формы она получает полёт, равный скорости плавания, и воздух считается водой для её особенностей."],
18:["Ужас глубин: под водой в кровной форме выбранные существа в 60 футах считают область труднопроходимой; при Mystical Waters радиус 30 футов. Провал против Crushing Force под водой можно заменить 1 уровнем Истощения."]
},
shapes:{
0:["Crab","Fish","Octopus"],0.125:["Crab, Giant","Dolphin","Piranha"],0.25:["Electric Eel","Fish, Giant"],0.5:["Reef Shark","Walrus"],1:["Octopus, Giant"],2:["Hunter Shark"],3:["Electric Eel, Giant","Killer Whale"],4:["Walrus, Giant"],5:["Crab, Colossal","Giant Squid"],6:["Shark, Giant"]
}});

line("Птичья",{
englishName:"Avian",description:"Кровная линия воздушных и пернатых зверей.",
normalForm:{naturalArmor:"10 + Dexterity + Constitution",naturalWeapons:"1d6 рубящий, Light, Dexterity",traits:["Dash бонусным действием","После Dash провоцируемые атаки имеют помеху","Преимущество на Acrobatics до конца хода"]},
features:{
1:["Птичья анатомия","Птичьи формы: все Beast с подтипом Avian считаются кровными формами."],
7:["Быстрое крыло: Dash в форме без полёта даёт временную скорость полёта, равную скорости ходьбы, до конца хода; при наличии полёта — преимущество на спасброски Ловкости."],
13:["Ветровой шквал: бонусным действием в кровной форме создаёте конус 20 футов, линию 30×5 футов или радиус 10 футов; Сила спасбросок, провал — отбрасывание на 20 футов, с уменьшением для более крупных целей."],
18:["Повелитель ветров: 1/короткий или долгий отдых создаёте рядом эффект whirlwind без концентрации и невосприимчивы к нему; последующими бонусными действиями можете двигать вихрь на 30 футов."]
},
shapes:{0:["Owl","Raven","Rooster"],0.125:["Hawk","Heron","Vulture"],0.25:["Falcon","Rooster, Giant"],0.5:["Emu"],1:["Eagle","Owl, Giant","Vulture, Giant"],2:["Emu, Giant","Hawk, Giant"],3:["Falcon, Giant"],4:["Heron, Giant"],5:["Terror Bird"],6:["Royal Eagle"]
}});

line("Грубая",{
englishName:"Brute",description:"Кровная линия массивных, выносливых зверей.",
normalForm:{naturalArmor:"10 + Constitution + Strength",naturalWeapons:"1d10 дробящий",traits:["+1 к максимуму HP сейчас и при каждом следующем уровне","Добавляете Constitution к проверкам и спасброскам Силы, минимум +1"]},
features:{
1:["Грубая биология","Грубые формы: все Beast с подтипом Brute считаются кровными формами."],
7:["Стойкая шкура: в начале хода в кровной форме можно получить временные HP = Constitution зверя, минимум 1. Пока есть временные HP, сопротивление дробящему, колющему и рубящему урону."],
13:["Топот: действием двигаетесь до своей скорости по прямой; существа на пути делают спасбросок Силы. Урон зависит от размера: Tiny 1d12, Small 2d12, Medium 3d12, Large 4d12, Huge 5d12, Gargantuan 6d12. Провал также сбивает меньшую цель с ног."],
18:["Великий бегемот: при Primeval Form можно стать Huge; меньшие Huge получают помеху против Stampede; природное оружие +1d12; сопротивление всему кроме Force/Psychic. 1/короткий или долгий отдых."]
},
shapes:{0:["Goat","Hare","Monkey"],0.125:["Camel","Llama","Pony"],0.25:["Boar","Ox","Stag"],0.5:["Chimpanzee","Goat, Giant","Horse"],1:["Aurochs","Gorilla","Giraffe"],2:["Boar, Giant","Stag, Giant"],3:["Hippopotamus","Rhinoceros"],4:["Elephant"],5:["Sloth, Giant"],6:["Gorilla, Giant","Mammoth"]
}});

line("Хищная",{
englishName:"Carnivore",description:"Кровная линия охотников и хищников.",
normalForm:{naturalArmor:"10 + Strength + Constitution",naturalWeapons:"1d6 рубящий, Light, Finesse",traits:["При проверке, основанной на обонянии, результат d20 7 или ниже считается 8"]},
features:{
1:["Хищная физиология","Добыча: при Shift в кровную форму можно отметить видимое враждебное существо как Добычу; можно также действием анализировать следы. Добыча держится 1 час, до смерти, смены цели или выхода из формы. По Добыче природные атаки критуют на 19–20, по другим целям имеют помеху; скорость +10 футов; отслеживание по запаху с преимуществом.","Хищные формы: все Beast с подтипом Carnivore считаются кровными формами."],
7:["Первобытная кровожадность: попав по Добыче природным оружием, можно потратить Adrenaline Surge; пока эффект действует, преимущество на природные атаки по Добыче и иммунитет к Grappled, Paralyzed, Restrained."],
13:["Верховный хищник: преимущество на спасброски, вызванные Добычей; природные атаки по Добыче критуют на 18–20, а на 18 уровне — на 17–20."],
18:["Первобытное безумие: если HP падают до 0 при активной Добыче, не теряете сознание и можете получить временные HP; пока не восстановите HP, продолжаете делать спасброски от смерти."]
},
shapes:{0:["Cat","Fox"],0.125:["Hunting Dog","Lynx","Wild Dog"],0.25:["Panther","Wolf"],0.5:["Black Bear","Cheetah"],1:["Dire Wolf","Lion","Tiger","Wild Dog, Giant"],2:["Grizzly Bear","Polar Bear"],3:["Saber-Toothed Tiger"],4:["Cave Bear"],5:["Dire Tiger"],6:["Cave Bear, Giant"]
}});

line("Насекомая",{
englishName:"Insect",description:"Кровная линия насекомых, паукообразных и членистоногих.",
normalForm:{naturalArmor:"10 + Constitution + Dexterity",naturalWeapons:"1d8 колющий, Finesse",traits:["Скорость лазания равна ходьбе; можно лазать по сложным и отвесным поверхностям без проверки"]},
features:{
1:["Насекомообразная эволюция","Жалящая атака: 1/ход после попадания природным оружием цель делает спасбросок Телосложения; провал — +1d8 яда и Poisoned до начала вашего следующего хода. Урон становится 2d8 на 7, 3d8 на 13, 4d8 на 18.","Насекомые-формы: Beast с подтипом Insect считаются кровными формами."],
7:["Едкие жала: Poison-урон от ваших кровных/звериных способностей можно заменить на Acid.","Форма роя: изучаете и можете принимать формы Insect Swarm. Рой получает временные HP = 2×уровень Шифтера + Constitution; при их обнулении возвращаетесь в обычную форму и получаете остаточный урон. Flurry использует эти временные HP. Первый рой между отдыхами бесплатен, следующие требуют Adrenaline Surge."],
13:["Радужное бегство: потратив Adrenaline Surge, перемещаетесь на 30 футов без провоцирования атак; это реакция и одновременно позволяет Shift в кровную форму."],
18:["Смертельный нейротоксин: спасбросок против Poisoned можно заменить на Интеллект; провал на 5+ вместо Poisoned даёт Paralyzed."]
},
shapes:{0:["Firefly","Scorpion","Spider"],0.125:["Beetle, Giant","Hellwasp","Scarab, Giant"],0.25:["Centipede, Giant","Swarm of Bugs","Wolf Spider, Giant"],0.5:["Soldier Ant, Giant","Swarm of Spiders","Wasp, Giant"],1:["Mantis, Giant","Spider, Giant","Swarm of Wasps"],2:["Stag Beetle, Giant","Swarm of Fire Ants"],3:["Ant Queen, Giant","Scorpion, Giant"],4:["Rhino Beetle, Giant","Swarm of Scarabs"],5:["Centipede, Colossal","Wasp Queen, Giant"],6:["Spider, Colossal"]
}});

line("Рептильная",{
englishName:"Reptilian",description:"Кровная линия рептилий и древних хладнокровных хищников.",
normalForm:{naturalArmor:"10 + Dexterity + Constitution",naturalWeapons:"1d6 рубящий, Light, Finesse",traits:["Скорость лазания равна ходьбе; можно лазать по сложным и отвесным поверхностям без проверки"]},
features:{
1:["Рептильная физиология","Змеиный следопыт: владение Stealth; если уже есть — d20 7 или ниже считается 8. В кровной форме Disengage бонусным действием.","Рептильные формы: Beast с подтипом Reptilian считаются кровными формами."],
7:["Адаптивный камуфляж: действием и за Adrenaline Surge становитесь Invisible на 10 минут без концентрации.","Свернувшийся удар: в кровной форме преимущество на opportunity attacks; после атаки ощущаемого существа можно реакцией сделать opportunity attack; дополнительную реакцию можно получить за Adrenaline Surge, если первая уже потрачена."],
13:["Сокрушительная мощь: существо, начинающее ход Grappled/Restrained вами, делает спасбросок Силы; провал — дробящий урон = уровень Шифтера и помеха на все проверки, атаки и спасброски в этот ход. В кровной форме реакцией можно дать ему помеху на этот спасбросок."],
18:["Первобытный хищник: особое тепловое Blindsight 120 футов; получаете вторую реакцию за раунд, но только одну реакцию на один триггер."]
},
shapes:{0:["Frog","Lizard","Tortoise"],0.125:["Alligator Turtle","Viper"],0.25:["Boa Constrictor","Frog, Giant","Lizard, Giant"],0.5:["Komodo Dragon","Tortoise, Giant"],1:["Crocodile","King Cobra","Toad, Giant"],2:["Anaconda"],3:["Alligator Turtle, Giant"],4:["Toad, Colossal"],5:["Titanoboa"],6:["Crocodile, Giant"]
}});

line("Паразитная",{
englishName:"Vermin",description:"Кровная линия мелких, скрытных и роевых существ.",
normalForm:{darkvision:60,naturalArmor:"10 + Constitution + Dexterity",naturalWeapons:"1d6 колющий, Finesse, Light",traits:["Scamper: при Shift в кровную форму получаете преимущество Disengage или Hide"]},
features:{
1:["Паразитная анатомия","Носитель чумы: попадание природным оружием не позволяет цели восстанавливать HP до начала вашего следующего хода.","Паразитные формы: Beast с подтипом Vermin считаются кровными формами."],
7:["Форма роя: изучаете и можете принимать Vermin Swarms; получаете временные HP = 2×уровень Шифтера + Constitution; Flurry считается природной атакой. Первый рой между отдыхами бесплатен и следующие требуют Adrenaline Surge."],
13:["Невидимые лазутчики: при Wild Awareness получаете знания обо всех Vermin в радиусе 3 миль, включая пути, укрытия, опасных существ и ловушки."],
18:["Подавляющая орда: действием цель в 30 футах делает спасбросок Ловкости; провал — покрыта роем до получения урона 2×уровень, успех — до урона = уровню. Пока покрыта, скорость вдвое ниже и помеха на атаки, проверки и спасброски Ловкости. 1/короткий или долгий отдых."]
},
shapes:{0:["Bat","Mole","Racoon","Rodent"],0.125:["Badger","Beaver","Rodent, Giant","Vampire Bat"],0.25:["Racoon, Giant","Swarm of Bats"],0.5:["Porcupine, Giant","Swarm of Rodents"],1:["Badger, Giant","Bat, Giant"],2:["Dire Beaver","Rodent of Unusual Size"],3:["Mole, Giant","Swarm of Vampire Bats"],4:["Elder Vampire Bat"],5:["Deep Mole","Swarm of Plague Rats"],6:["Badger Lord"]
}});

const progression={
1:["Кровная линия","Дикая форма"],
2:["Первобытная связь"],
3:["Звериные инстинкты"],
4:["Увеличение характеристик (ASI) или Черта"],
5:["Дикий воин","Мистические удары"],
6:["Всплеск адреналина"],
7:["Особенность кровной линии"],
8:["Увеличение характеристик (ASI) или Черта"],
9:["Дикая осведомлённость"],
10:["Первобытная стойкость"],
11:["Первобытная форма"],
12:["Увеличение характеристик (ASI) или Черта"],
13:["Особенность кровной линии"],
14:["Звериные чувства"],
15:["Мифические формы"],
16:["Увеличение характеристик (ASI) или Черта"],
17:["Первобытное возрождение"],
18:["Особенность кровной линии"],
19:["Увеличение характеристик (ASI) или Черта"],
20:["Сила природы"]
};

const mechanics={
hitDie:10,primaryStat:"constitution",secondaryStats:["strength","dexterity"],
savingThrows:["strength","dexterity"],armor:["light"],
weapons:["simple","blowgun","longbow","net"],tools:[],
skills:{choose:2,from:["acrobatics","animal handling","athletics","nature","perception","stealth","survival"]},
multiclassRequirement:{constitution:13},multiclassProficiencies:["simple weapons"],
startingEquipment:["two clubs OR greatclub OR quarterstaff","shortbow + 20 arrows OR four javelins","leather armor","dagger","explorer's pack"],
saveDC:"8 + proficiency bonus + Constitution modifier",
attackModifier:"proficiency bonus + Constitution modifier",
wildShape:{
action:"bonus_action",startLevel:1,retain:["alignment","personality","hit points","Intelligence","Wisdom","Charisma","skill proficiencies","saving throw proficiencies"],
revert:["Incapacitated","bonus action"],directShift:true,maxCR:MAX_CR,
durationRule:"После 1 часа непрерывно в Beast Shapes автоматически возвращаетесь в нормальную форму",
diminutive:"любой урон или провал спасброска мгновенно возвращает в нормальную форму",
equipment:"natural/unrefined merges; refined metal and highly processed equipment drops",
spellcasting:"нельзя накладывать заклинания в Beast Shape, но можно поддерживать концентрацию на уже наложенном",
mysticEmpowerment:"можно заменить innate save DC и attack modifier зверя на Shifter values, если бонусы Шифтера не ниже; использовать Constitution нормальной формы",
naturalArmor:"если AC зверя не выше, можно использовать AC кровной линии с характеристиками нормальной формы",
learning:"при каждом повышении Max CR автоматически изучается одна кровная форма этого CR или ниже; Primal Bond позволяет действием коснуться живого не-враждебного Beast в лимите CR и выучить его без лимита числа форм"
},
adrenaline:{level:6,uses:"Constitution modifier нормальной формы, минимум 1",refresh:"short_or_long_rest",reaction:"при получении урона получить временные HP = полученному урону на 1 минуту"},
primalResilience:{level:10,use:"потратить Adrenaline Surge после провала спасброска и добавить Constitution modifier нормальной формы, минимум +1"},
primevalForm:{level:11,uses:3,refresh:"1 short + all long",effects:["размер +1 при наличии места","сопротивление B/P/S от немагических атак","преимущество на проверки и спасброски Strength/Dexterity"]},
feralSenses:{level:14,effect:"нет помехи на Natural Weapon атаки по целям в пределах 30 футов"},
mythicForms:{level:15,effect:"CR 5+ формы можно использовать по одному разу на каждую известную форму между short/long rest"},
primevalResurgence:{level:17,effect:"можно получать Primeval Form при любом Shift в Bloodline Shape"},
forceOfNature:{level:20,effect:"CR 5 и 6 без ограничений; в бою в начале каждого хода восстанавливается 1 Adrenaline Surge"}
};

window.SHIFTER_V21={version:"2.1.0",updated:"2026-06-25",source:"laserllama / GM Binder",PB,MAX_CR,ASI,progression,bloodlines,mechanics};
window.shifterRuntime=window.SHIFTER_V21;
var __shifterProgression={
className:"Шифтер",englishName:"Shifter",source:"laserllama",sourceVersion:"2.1.0",edition:"5E",
status:"implemented_full_v2_1_runtime",hitDie:10,primaryStat:"constitution",secondaryStats:["strength","dexterity"],
savingThrows:["strength","dexterity"],armor:["light"],weapons:["simple","blowgun","longbow","net"],
skills:mechanics.skills,multiclassRequirement:{constitution:13},subclassFeatureLevels:[1,7,13,18],
progression,mechanics,bloodlines:Object.keys(bloodlines)
};
window.shifterProgression=Object.assign(window.shifterProgression||{},__shifterProgression);
window.getShifterBloodlines=function(){return Object.values(window.SHIFTER_V21.bloodlines);};
window.getShifterBloodline=function(name){return window.SHIFTER_V21.bloodlines[name]||null;};
window.getShifterMaxCR=function(level){return window.SHIFTER_V21.MAX_CR[Math.max(0,Math.min(20,Number(level)||0))]||0;};
})();