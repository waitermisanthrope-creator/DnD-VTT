/* РОЙ — Extra class runtime
 * Проектная система, основанная на предоставленных пользователем материалах.
 * Не является обычным D&D-классом: одновременно заменяет расу и класс.
 */
(function(g){
"use strict";

var PB=[0,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6];
var ASI_LEVELS=[4,8,12,16,19];
var MUTATION_SLOTS={1:0,5:1,9:2,13:3,17:4};

var states={
    horde:{key:"horde",name:"Орда",min:0.50,size:"Большой",space:"10x10 фт.",acBase:10,damageMult:1,speed:30},
    swarm:{key:"swarm",name:"Стая",min:0.20,size:"Средний",space:"5x5 фт.",acBase:13,damageMult:0.5,speed:30},
    remnant:{key:"remnant",name:"Остаток",min:0.01,size:"Крошечный",space:"2.5x2.5 фт.",acBase:16,damageMult:0,speed:15}
};

var mutations={
    "Регенерация тканей":{
        sources:["Тролль","Вампир"],
        effect:"При начале хода, если Рой ниже 50% максимального ХП, восстанавливает 1 + модификатор Телосложения ХП. Не работает до начала следующего хода после получения урона огнём."
    },
    "Железа сопротивления":{
        sources:["Дракон","Элементаль"],
        effect:"При выборе мутации выберите тип урона, которым обладало поглощённое существо. Рой получает сопротивление этому типу."
    },
    "Липкие выделения":{
        sources:["Паук","Эттеркап"],
        effect:"Сложность спасброска для выхода из Пожирания увеличивается на 1. Рой получает скорость лазания, равную скорости ходьбы."
    },
    "Нейротоксин":{
        sources:["Змея","Виверна"],
        effect:"Атаки Пожирания и обычные атаки Роя наносят дополнительно 1к6 урона ядом. Цель получает этот урон не более одного раза за ход."
    },
    "Мерцание":{
        sources:["Дисплацер"],
        effect:"Существа получают помеху на провоцированные атаки по Рою. Первый провоцированный промах до следующего хода позволяет переместиться на 5 футов."
    },
    "Каменная кожа":{
        sources:["Василиск","Медуза"],
        effect:"КД Роя увеличивается на 1, но скорость уменьшается на 5 футов."
    },
    "Амфибия":{
        sources:["Жаба","Грунг"],
        effect:"Рой может дышать под водой и получает скорость плавания, равную скорости ходьбы."
    },
    "Пси-барьер":{
        sources:["Иллитид","Аберрация"],
        effect:"Сопротивление психическому урону."
    },
    "Эхо Роя":{
        sources:["Мимолетный","Фейри"],
        effect:"Бонусным действием телепортация на 15 футов. После применения повторное использование на 5–6 по d6."
    }
};

var species={
    "Трупоеды":{
        key:"corpseEaters",
        creatures:["крысы","падальщики","мелкие трупоеды"],
        features:{
            3:{name:"Разносчик заразы",effect:"Цель, провалившая спасбросок против Пожирания, получает Отравление до конца своего следующего хода."},
            7:{name:"Нюх на кровь",effect:"Рой имеет преимущество на атаки по существам, имеющим меньше максимума ХП."},
            14:{name:"Воскрешение",effect:"Если хотя бы одно существо Роя выжило отдельно от основной массы, Рой может восстановиться через 1к4 суток в ближайшей канализации с полным ХП. До восстановления нельзя создать новый Рой."}
        }
    },
    "Железный Панцирь":{
        key:"ironShell",
        creatures:["жуки","панцирные насекомые"],
        features:{
            3:{name:"Живая стена",effect:"КД становится 13 + модификатор Телосложения. Телосложение можно использовать вместо Ловкости в проверках Скрытности."},
            7:{name:"Кислотная кровь",effect:"Существо, попавшее по Рою рукопашной атакой, получает 2к6 урона кислотой."},
            14:{name:"Осада",effect:"Рой наносит двойной урон строениям и может прогрызать каменные стены со скоростью 1 фут за минуту."}
        }
    },
    "Тень":{
        key:"shadow",
        creatures:["вороны","летучие мыши","ночные существа"],
        features:{
            3:{name:"Крылья ночи",effect:"Скорость полёта равна скорости ходьбы. В темноте Рой невидим, пока не перемещается и не атакует."},
            7:{name:"Выклёвывание глаз",effect:"Бонусным действием цель в 5 футах совершает спасбросок Ловкости. При провале она Ослеплена до конца своего следующего хода."},
            14:{name:"Штормовой ветер",effect:"Дальнобойные атаки по Рою совершаются с помехой."}
        }
    }
};

var progression={
    className:"Рой",
    englishName:"Swarm",
    source:"Project Extra / пользовательский дизайн",
    status:"implemented_full_1_20",
    edition:"Project Extra",
    isExtra:true,
    replacesRace:true,
    isRaceClassHybrid:true,
    hitDie:8,
    primaryStat:"constitution",
    secondaryStats:["dexterity"],
    savingThrows:["constitution","dexterity"],
    armor:[],
    weapons:[],
    tools:[],
    skills:["Скрытность","Восприятие","Выживание","Запугивание","Природа"],
    skillChoices:2,
    multiclassAllowed:false,
    progression:{},
    mechanics:{
        collectiveBody:"Рой считается единым существом, но его биомасса представлена большим количеством особей.",
        immunities:["Схваченный","Опутанный","Очарованный","Испуганный","Окаменевший","Сбитый с ног"],
        physicalResistance:"Сопротивление немагическому дробящему, колющему и рубящему урону.",
        areaVulnerability:"Уязвимость к урону по площади и огню.",
        noStandardHealing:"Обычные эффекты лечения, рассчитанные на одно существо, не восстанавливают ХП Роя.",
        hitDice:"Кость Хитов Роя — d8.",
        devouring:"Пожирание использует спасбросок Ловкости: DC = 8 + PB + модификатор Телосложения.",
        biomassHealing:"Во время короткого отдыха Рой может тратить Кости Хитов только при наличии трупов. Маленький труп позволяет потратить 1 Кость, Средний — до 2, Большой — до 4, Огромный — до 8, Громадный — до 12.",
        equipment:"Обычные доспехи и оружие не используются. Магическая Ассимиляция позволяет превращать часть поглощённых предметов в постоянные коллективные свойства."
    }
};

var levels={
1:{
    features:["Коллективное тело","Пожирание","Биомасса"],
    details:{
        "Коллективное тело":progression.mechanics.collectiveBody,
        "Пожирание":"Действие: Рой перемещается в пространство существа в пределах досягаемости. Цель совершает спасбросок Ловкости. При провале получает 2к6 колющего урона, при успехе половину. Урон увеличивается на 1к6 на 5, 11 и 17 уровнях. Пожирание не требует броска атаки.",
        "Биомасса":"Максимальное ХП рассчитывается как для класса d8, но текущее ХП одновременно определяет состояние Роя."
    }
},
2:{
    features:["Разделение"],
    details:{"Разделение":"Реакция после получения урона оружием: уменьшить полученный урон на 1к10 + уровень Роя и переместиться на 10 футов без провоцирования атак. 1 раз за раунд."}
},
3:{
    features:["Выбор вида"],
    subclassLevel:true
},
4:{
    features:["Увеличение характеристик или Черта"],
    asi:true
},
5:{
    features:["Ошеломляющая масса","Адаптивная эволюция I"],
    details:{
        "Ошеломляющая масса":"Пространство Роя считается труднопроходимой местностью. Существо, провалившее спасбросок против Пожирания, не может совершать реакции до начала своего следующего хода.",
        "Адаптивная эволюция I":"Открывается 1 слот мутации."
    }
},
6:{
    features:["Ассимиляция магии"],
    details:{"Ассимиляция магии":"Рой может поглотить до 3 магических колец, амулетов или камней. Поглощённые предметы больше нельзя использовать отдельно. Их свойства преобразуются в коллективные бонусы: оружейные свойства дают +1 к атакам и урону, защитные — +1 КД. Общий бонус одного типа не может превышать +3."}
},
7:{
    features:["Голос Легиона","Особенность вида"],
    details:{
        "Голос Легиона":"Рой получает Коллективный шёпот: телепатически передаёт мысли существу в пределах 30 футов. Для обычной речи Рой может создать Посланника — одну особь с временным интеллектом.",
        "Особенность вида":"Вторая особенность выбранного вида."
    },
    subclassLevel:true
},
8:{
    features:["Увеличение характеристик или Черта"],
    asi:true
},
9:{
    features:["Адаптивная эволюция II"],
    details:{"Адаптивная эволюция II":"Открывается второй слот мутации."}
},
10:{
    features:["Митоз"],
    details:{"Митоз":"Бонусное действие: если у Роя есть хотя бы 1 ХП, разделить текущее ХП пополам и создать второе Отделение Роя. Оба отделения действуют в одну инициативу. Каждое получает собственный токен и половину текущей биомассы. Действием два отделения, соприкоснувшись, объединяются и складывают текущее ХП обратно в единый Рой. Разделённые отделения не могут превысить половину исходного максимума ХП каждое."}
},
11:{
    features:["Улучшенное Пожирание"],
    details:{"Улучшенное Пожирание":"Урон Пожирания увеличивается на 1к6. Кроме того, при провале спасброска цель считается частично захваченной массой до начала следующего хода Роя: её скорость уменьшается на 10 футов."}
},
12:{
    features:["Увеличение характеристик или Черта"],
    asi:true
},
13:{
    features:["Адаптивная эволюция III"],
    details:{"Адаптивная эволюция III":"Открывается третий слот мутации."}
},
14:{
    features:["Особенность вида"],
    subclassLevel:true
},
15:{
    features:["Единый разум"],
    details:{"Единый разум":"Рой получает телепатию 60 футов. Посланник может говорить без помехи к Убеждению и получает преимущество на Запугивание. Пока хотя бы одно отделение Роя существует, Рой имеет преимущество на спасброски против эффектов, нацеленных на разум."}
},
16:{
    features:["Увеличение характеристик или Черта"],
    asi:true
},
17:{
    features:["Адаптивная эволюция IV"],
    details:{"Адаптивная эволюция IV":"Открывается четвёртый слот мутации."}
},
18:{
    features:["Бессмертный легион"],
    details:{"Бессмертный легион":"Если у Роя есть хотя бы 1 ХП, в начале его хода он восстанавливает 5 + модификатор Телосложения ХП. Эффект не работает до начала следующего хода после получения урона огнём или холодом. Если все отделения уничтожены, способность не спасает Рой."}
},
19:{
    features:["Увеличение характеристик или Черта"],
    asi:true
},
20:{
    features:["Чума"],
    details:{"Чума":"1 раз в день на 1 минуту Рой становится Огромным и занимает пространство 20x20 футов. Пожирание наносит 10к6 колющего урона вместо обычного. Когда существо погибает от Пожирания во время Чумы, из его останков рождается малый рой под вашим контролем. Одновременно можно контролировать число таких роёв не больше PB."}
}
};
for(var i=1;i<=20;i++) progression.progression[i]=levels[i];

function abilityMod(score){return Math.floor((Number(score||10)-10)/2);}
function getState(current,max){
    if(max<=0||current<=0)return null;
    var ratio=current/max;
    if(ratio>=0.50)return states.horde;
    if(ratio>=0.20)return states.swarm;
    return states.remnant;
}
function getAC(dex,current,max,con){
    var s=getState(current,max);
    if(!s)return 0;
    var ac=s.acBase+abilityMod(dex);
    if(speciesActive("Железный Панцирь")) ac=13+abilityMod(con);
    var muts=(window.swarmRuntime&&window.swarmRuntime.activeMutations)||[];
    if(muts.indexOf("Каменная кожа")>=0) ac+=1;
    return ac;
}
function devourDice(level){return level>=17?5:level>=11?4:level>=5?3:2;}
function devourDamage(level){return devourDice(level)+"d6";}
function dc(level,con){return 8+(PB[Math.max(0,Math.min(20,level))]||2)+abilityMod(con);}
function speciesActive(name){
    var s=window.swarmRuntime;
    return !!(s&&s.species===name);
}
function mutationSlots(level){
    var out=0;
    Object.keys(MUTATION_SLOTS).forEach(function(k){if(level>=Number(k))out=MUTATION_SLOTS[k];});
    return out;
}
function biomassFromCorpse(size){
    return ({tiny:0,small:1,medium:2,large:4,huge:8,gargantuan:12}[String(size||"medium").toLowerCase()]||2);
}
function makeAvatar(parentId,current,max){
    return {
        type:"swarmAvatar",
        id:"swarm-"+Date.now()+"-"+Math.floor(Math.random()*100000),
        parentId:parentId||null,
        currentHP:Math.floor(current/2),
        maxHP:Math.ceil(max/2),
        sharedInitiative:true,
        canMerge:true,
        isIndependentCreature:false,
        state:getState(Math.floor(current/2),Math.ceil(max/2))
    };
}
function normalizeCharacter(hero){
    hero=hero||{};
    hero.isExtraClass=true;
    hero.extraClassType="swarm";
    hero.replacesRace=true;
    hero.race="Рой";
    hero.swarm={
        species:hero.swarm&&hero.swarm.species||null,
        currentHP:hero.swarm&&Number(hero.swarm.currentHP)||0,
        maxHP:hero.swarm&&Number(hero.swarm.maxHP)||0,
        activeMutations:hero.swarm&&hero.swarm.activeMutations||[],
        absorbedItems:hero.swarm&&hero.swarm.absorbedItems||[],
        avatars:hero.swarm&&hero.swarm.avatars||[]
    };
    return hero;
}

g.SWARM_EXTRA={
    version:"1.0.0",
    source:"Пользовательские материалы + проектная доработка",
    PB:PB,
    states:states,
    mutations:mutations,
    species:species,
    mutationSlots:MUTATION_SLOTS,
    progression:progression,
    getState:getState,
    getAC:getAC,
    getDevourDC:dc,
    getDevourDamage:devourDamage,
    getMutationSlots:mutationSlots,
    getBiomassFromCorpse:biomassFromCorpse,
    createAvatar:makeAvatar,
    normalizeCharacter:normalizeCharacter,
    calculateMaxHP:function(level,con){return Math.max(1,level*8+Math.max(0,level-1)*abilityMod(con));},
    rules:{
        shortRestHealing:"Количество потраченных Костей Хитов ограничено доступной биомассой трупов.",
        mitosis:"Отделение Роя является специальной сущностью и не считается отдельным персонажем или спутником.",
        plague:"Созданные Чумой рои считаются временными отделениями и исчезают после окончания эффекта или смерти."
    }
};
g.swarmRuntime=g.SWARM_EXTRA;
g.swarmProgression=Object.assign(g.swarmProgression||{},progression);
g.swarmProgression.status="implemented_full_1_20";
g.swarmProgression.source="Project Extra / пользовательский дизайн";
g.getSwarmState=getState;
g.getSwarmDevourDC=dc;
g.getSwarmDevourDamage=devourDamage;
g.getSwarmMutationSlots=mutationSlots;
g.createSwarmAvatar=makeAvatar;
})(window);
