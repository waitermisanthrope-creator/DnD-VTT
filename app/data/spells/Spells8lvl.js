// Все заклинания 8 круга D&D 5e, включая официальные дополнения (PHB, XGE, TCE и др.)

window.spells8lvl = [
  {
    name: "Антимагическое поле (Antimagic Field)",
    level: 8,
    school: "Ограждение",
    classes: ["Жрец", "Волшебник"],
    castingTime: "1 действие",
    range: "На себя (сфера 3 м)",
    components: {
      verbal: true,
      somatic: true,
      material: "щепотка железных опилок или порошкового железа"
    },
    duration: "1 час",
    concentration: true,
    attackType: null,
    savingThrow: null,
    damage: null,
    damageType: null,
    source: "PHB",
    description: "Сфера антимагии радиусом 3 метра исходит от вас и движется вместе с вами. Внутри сферы подавляются заклинания, магические предметы теряют свои магические свойства, призванные существа исчезают, а большинство магических эффектов временно подавляется."
  },
  {
    name: "Антипатия/Симпатия (Antipathy/Sympathy)",
    level: 8,
    school: "Очарование",
    classes: ["Друид", "Волшебник"],
    castingTime: "1 час",
    range: "18 метров",
    components: {
      verbal: true,
      somatic: true,
      material: "кусочек квасцов, смоченный в уксусе (антипатия) или капля мёда (симпатия)"
    },
    duration: "10 дней",
    concentration: false,
    attackType: null,
    savingThrow: "Мудрость",
    damage: null,
    damageType: null,
    source: "PHB",
    description: "Вы зачаровываете предмет или место так, чтобы оно притягивало или отталкивало существ выбранного вами вида. Существа, проходящие спасбросок Мудрости, могут сопротивляться эффекту, но при провале либо стремятся приблизиться, либо в ужасе избегают зачарованный объект."
  },
  {
    name: "Клон (Clone)",
    level: 8,
    school: "Некромантия",
    classes: ["Волшебник"],
    castingTime: "1 час",
    range: "Касание",
    components: {
      verbal: true,
      somatic: true,
      material: "алмаз стоимостью не менее 1000 зм и не менее 30 см³ плоти клонируемого существа, а также сосуд стоимостью не менее 2000 зм"
    },
    duration: "Мгновенная",
    concentration: false,
    attackType: null,
    savingThrow: null,
    damage: null,
    damageType: null,
    source: "PHB",
    description: "Вы создаёте неактивное дублирующее тело живого существа в специальном сосуде. Когда оригинал умирает, его душа переселяется в клон, если тот полностью сформирован (120 дней), даруя фактическое воскрешение."
  },
  {
    name: "Контроль погоды (Control Weather)",
    level: 8,
    school: "Преобразование",
    classes: ["Жрец", "Друид", "Волшебник"],
    castingTime: "10 минут",
    range: "На себя (радиус 8 км)",
    components: {
      verbal: true,
      somatic: true,
      material: "тлеющие благовония и кусочки земли и дерева, смешанные с водой"
    },
    duration: "До 8 часов",
    concentration: true,
    attackType: null,
    savingThrow: null,
    damage: null,
    damageType: null,
    source: "PHB",
    description: "Вы берёте под контроль погоду в пределах радиуса действия на время действия заклинания. Вы можете изменять текущие погодные условия, постепенно переходя между заранее определёнными стадиями (ясно, ветрено, дождь, шторм, град, снег и т.д.)."
  },
  {
    name: "Полуплан (Demiplane)",
    level: 8,
    school: "Вызов",
    classes: ["Волшебник", "Колдун"],
    castingTime: "1 действие",
    range: "18 метров",
    components: {
      verbal: true,
      somatic: true,
      material: null
    },
    duration: "1 час",
    concentration: false,
    attackType: null,
    savingThrow: null,
    damage: null,
    damageType: null,
    source: "PHB",
    description: "Вы создаёте тёмную дверь на твёрдой поверхности, ведущую в пустую комнату размером 9×9×9 метров на полуплане. Когда заклинание заканчивается, дверь исчезает, а всё, что осталось внутри, остаётся в ловушке, если только у вас нет другого способа туда попасть."
  },
  {
    name: "Подчинение монстра (Dominate Monster)",
    level: 8,
    school: "Очарование",
    classes: ["Бард", "Волшебник", "Колдун", "Чародей"],
    castingTime: "1 действие",
    range: "18 метров",
    components: {
      verbal: true,
      somatic: true,
      material: null
    },
    duration: "До 1 часа",
    concentration: true,
    attackType: null,
    savingThrow: "Мудрость",
    damage: null,
    damageType: null,
    source: "PHB",
    description: "Вы пытаетесь подчинить разум существа любого вида, которое вы видите в пределах дистанции. Оно должно преуспеть в спасброске Мудрости, иначе будет очаровано вами на время действия заклинания. Пока существо очаровано, вы можете телепатически отдавать ему команды."
  },
  {
    name: "Землетрясение (Earthquake)",
    level: 8,
    school: "Воплощение",
    classes: ["Жрец", "Друид", "Чародей"],
    castingTime: "1 действие",
    range: "152 метра",
    components: {
      verbal: true,
      somatic: true,
      material: "щепотка грязи, кусочек камня и комок глины"
    },
    duration: "До 1 минуты",
    concentration: true,
    attackType: null,
    savingThrow: "Ловкость",
    damage: "5к6",
    damageType: "Дробящий",
    source: "PHB",
    description: "Вы создаёте сейсмическое возмущение в точке на земле в пределах дистанции. На протяжении действия заклинания эпицентр этого возмущения становится источником землетрясения, которое рушит структуры, создаёт трещины в земле и сбивает существ с ног."
  },
  {
    name: "Слабоумие (Feeblemind)",
    level: 8,
    school: "Очарование",
    classes: ["Бард", "Друид", "Колдун", "Волшебник"],
    castingTime: "1 действие",
    range: "45 метров",
    components: {
      verbal: true,
      somatic: true,
      material: "горсть глины, хрусталя, стекла или минеральных сфер"
    },
    duration: "Мгновенная",
    concentration: false,
    attackType: null,
    savingThrow: "Интеллект",
    damage: "4к6",
    damageType: "Психический",
    source: "PHB",
    description: "Вы обрушиваете на разум существа мощную ментальную атаку. Цель совершает спасбросок Интеллекта, получая урон и, при провале, теряет способность накладывать заклинания, произносить членораздельные фразы, а её Интеллект и Харизма становятся равны 1."
  },
  {
    name: "Красноречие (Glibness)",
    level: 8,
    school: "Очарование",
    classes: ["Бард"],
    castingTime: "1 действие",
    range: "На себя",
    components: {
      verbal: true,
      somatic: false,
      material: null
    },
    duration: "1 час",
    concentration: false,
    attackType: null,
    savingThrow: null,
    damage: null,
    damageType: null,
    source: "PHB",
    description: "Пока это заклинание активно, вы можете заменить любой результат броска Харизмы на 15. Кроме того, магия не может определить, лжёте ли вы, поэтому вы можете лгать под воздействием заклинания правды или подобных эффектов, не выдавая себя."
  },
  {
    name: "Священная аура (Holy Aura)",
    level: 8,
    school: "Ограждение",
    classes: ["Жрец"],
    castingTime: "1 действие",
    range: "На себя (сфера 9 метров)",
    components: {
      verbal: true,
      somatic: true,
      material: "маленький реликварий стоимостью не менее 1000 зм, содержащий святую реликвию"
    },
    duration: "До 1 минуты",
    concentration: true,
    attackType: null,
    savingThrow: "Телосложение",
    damage: null,
    damageType: null,
    source: "PHB",
    description: "Божественный свет озаряет вас и существ по вашему выбору вокруг вас. Пока действует заклинание, выбранные существа получают преимущество ко всем спасброскам, а другие существа получают помеху к броскам атаки против них. Кроме того, когда нежить или исчадие попадают по такому существу атакой в ближнем бою, атакующий должен пройти спасбросок Телосложения, иначе ослепнет."
  },
  {
    name: "Огненное облако (Incendiary Cloud)",
    level: 8,
    school: "Вызов",
    classes: ["Чародей", "Волшебник"],
    castingTime: "1 действие",
    range: "45 метров",
    components: {
      verbal: true,
      somatic: true,
      material: null
    },
    duration: "До 1 минуты",
    concentration: true,
    attackType: null,
    savingThrow: "Ловкость",
    damage: "10к8",
    damageType: "Огонь",
    source: "PHB",
    description: "Клубящееся облако дыма, испещрённое языками огня, появляется в сфере радиусом 6 метров с центром в точке в пределах дистанции. Существа в этой сфере совершают спасбросок Ловкости, получая огненный урон при провале и половину урона при успехе. На каждом последующем ходу облако движется по вашему выбору."
  },
  {
    name: "Лабиринт (Maze)",
    level: 8,
    school: "Вызов",
    classes: ["Волшебник"],
    castingTime: "1 действие",
    range: "18 метров",
    components: {
      verbal: true,
      somatic: true,
      material: null
    },
    duration: "До 10 минут",
    concentration: true,
    attackType: null,
    savingThrow: null,
    damage: null,
    damageType: null,
    source: "PHB",
    description: "Вы отправляете видимое существо в лабиринт на демиплане Лабиринта. Существо остаётся там до конца действия заклинания или пока не выберется, потратив действие на проверку Интеллекта Сл 20, чтобы найти выход."
  },
  {
    name: "Защита разума (Mind Blank)",
    level: 8,
    school: "Ограждение",
    classes: ["Бард", "Жрец", "Волшебник"],
    castingTime: "1 действие",
    range: "Касание",
    components: {
      verbal: true,
      somatic: true,
      material: null
    },
    duration: "24 часа",
    concentration: false,
    attackType: null,
    savingThrow: null,
    damage: null,
    damageType: null,
    source: "PHB",
    description: "Вы наделяете согласное существо, которого касаетесь, защитой от психического урона, любых средств чтения эмоций или мыслей, предсказания будущего, а также от очарования и превращения в подобие. Даже сила желания не может воздействовать на цель."
  },
  {
    name: "Слово силы: Оглушение (Power Word Stun)",
    level: 8,
    school: "Очарование",
    classes: ["Бард", "Волшебник", "Колдун", "Чародей"],
    castingTime: "1 действие",
    range: "18 метров",
    components: {
      verbal: true,
      somatic: false,
      material: null
    },
    duration: "Мгновенная",
    concentration: false,
    attackType: null,
    savingThrow: null,
    damage: null,
    damageType: null,
    source: "PHB",
    description: "Вы произносите слово силы, способное ошеломить одно существо, которое вы видите в пределах дистанции. Если у цели 150 хитов или меньше, она получает состояние «ошеломление». В противном случае заклинание не имеет эффекта. Ошеломлённое существо в конце каждого своего хода совершает спасбросок Телосложения, при успехе которого эффект заканчивается."
  },
  {
    name: "Вспышка солнца (Sunburst)",
    level: 8,
    school: "Воплощение",
    classes: ["Друид", "Волшебник", "Чародей"],
    castingTime: "1 действие",
    range: "На себя (радиус 18 метров)",
    components: {
      verbal: true,
      somatic: true,
      material: "огонь и кусочек солнечного камня"
    },
    duration: "Мгновенная",
    concentration: false,
    attackType: null,
    savingThrow: "Телосложение",
    damage: "12к6",
    damageType: "Излучение",
    source: "PHB",
    description: "Яркий свет солнца сияет в сфере радиусом 18 метров с центром на точке, которую вы выбираете в пределах дистанции. Существа в сфере совершают спасбросок Телосложения, при провале получая урон излучением и слепнув на 1 минуту, при успехе получая половину урона без ослепления. Заклинание также рассеивает тьму и уничтожает нежить, чувствительную к солнечному свету."
  },
  {
    name: "Телепатия (Telepathy)",
    level: 8,
    school: "Воплощение",
    classes: ["Волшебник"],
    castingTime: "1 действие",
    range: "Неограниченная (в пределах одного плана существования)",
    components: {
      verbal: true,
      somatic: true,
      material: "пара соединённых серебряных колец"
    },
    duration: "24 часа",
    concentration: false,
    attackType: null,
    savingThrow: null,
    damage: null,
    damageType: null,
    source: "PHB",
    description: "Вы создаёте телепатическую связь с существом, знакомым вам, находящимся на том же плане существования, что и вы. После установления связи вы и цель можете телепатически обмениваться сообщениями друг с другом на протяжении действия заклинания, независимо от расстояния между вами."
  },
  {
    name: "Цунами (Tsunami)",
    level: 8,
    school: "Вызов",
    classes: ["Друид", "Волшебник"],
    castingTime: "1 минута",
    range: "1,5 километра",
    components: {
      verbal: true,
      somatic: true,
      material: null
    },
    duration: "До 6 раундов",
    concentration: true,
    attackType: null,
    savingThrow: "Сила",
    damage: "6к10",
    damageType: "Дробящий",
    source: "PHB",
    description: "Гигантская стена воды высотой до 90 метров и шириной до 90 метров возникает в точке, выбранной вами на земле, которую вы видите в пределах дистанции. На каждом из своих последующих ходов вы можете передвигать стену на 15 метров, сокрушая всё на своём пути, нанося дробящий урон существам, попавшим под неё."
  },
  {
    name: "Ужасное иссушение Аби-Дальзима (Abi-Dalzim's Horrid Wilting)",
    level: 8,
    school: "Некромантия",
    classes: ["Волшебник", "Чародей"],
    castingTime: "1 действие",
    range: "45 метров",
    components: {
      verbal: true,
      somatic: true,
      material: "кусочек губки"
    },
    duration: "Мгновенная",
    concentration: false,
    attackType: null,
    savingThrow: "Телосложение",
    damage: "12к8",
    damageType: "Некротический",
    source: "XGE",
    description: "Вы иссушаете влагу из всех существ в кубе с длиной стороны 9 метров в пределах дистанции. Каждое существо в этой области, кроме конструктов и нежити, совершает спасбросок Телосложения, получая некротический урон при провале и половину урона при успехе. Растения, не являющиеся существами, в области действия увядают и погибают."
  },
  {
    name: "Иллюзорный дракон (Illusory Dragon)",
    level: 8,
    school: "Иллюзия",
    classes: ["Волшебник"],
    castingTime: "1 действие",
    range: "36 метров",
    components: {
      verbal: true,
      somatic: true,
      material: "чешуйка любого дракона"
    },
    duration: "До 1 минуты",
    concentration: true,
    attackType: null,
    savingThrow: "Мудрость",
    damage: "7к6",
    damageType: "Психический",
    source: "TCE",
    description: "Вы создаёте иллюзию огромного дракона в точке, которую видите в пределах дистанции. Иллюзия занимает куб с длиной стороны 12 метров и на каждом вашем ходу может летать и совершать пугающий рёв, заставляя существ поблизости пройти спасбросок Мудрости, получая психический урон и становясь испуганными при провале. Существа могут действием исследовать дракона и проверкой Интеллекта против Сл заклинания распознать иллюзию."
  }
];

// Экспорт для CommonJS
if (typeof module !== "undefined" && module.exports) {
  module.exports = spells8lvl;
}

// Экспорт для ES-модулей (раскомментируйте при необходимости)
// export default spells8lvl;