// --- БАЗА ПРЕДЫСТОРИЙ D&D 5e (ПО ПРАВИЛАМ ОФИЦИАЛЬНЫХ ИЗДАНИЙ БЕЗ СЛЭШЕЙ И ВЫБОРОВ) ---
const dndBackgrounds = [
  // --- КНИГА ИГРОКА (PHB) ---
  {
    name: "Acolyte",
    nameRu: "Прислужник",
    source: "PHB",
    skills: ["Проницательность (Insight)", "Религия (Religion)"],
    toolProficiencies: [],
    languages: 2,
    feature: "Приют верующего (Shelter of the Faithful) — Вы и ваши спутники можете рассчитывать на бесплатные исцеление и уход в храмах вашей веры. Единоверцы также готовы предоставить вам скромный ночлег и пищу, а вы имеете определенный авторитет в религиозных кругах.",
    description: "Служитель храма, ордена или божества. Всю жизнь провел в молитвах, ритуалах и изучении священных текстов. Благодаря глубоким знаниям религии и развитой проницательности он с легкостью распознает ложь и фальшь, а также пользуется авторитетом и поддержкой среди единоверцев."
  },
  {
    name: "Charlatan",
    nameRu: "Шарлатан",
    source: "PHB",
    skills: ["Обман (Deception)", "Ловкость рук (Sleight of Hand)"],
    toolProficiencies: ["Набор для фальсификации", "Набор для грима"],
    languages: 0,
    feature: "Фальшивая личность (False Identity) — Вы создали себе второе «я» (другое имя, документы, легенду и внешность). Вы можете без труда выдавать себя за другого человека, подделывать документы и оставлять фальшивые следы, не привлекая лишнего внимания.",
    description: "Мастер манипуляций, мошенник и игрок чужими судьбами. Он выживает за счет подвешенного языка, ловкости рук и умения выдавать себя за совершенно другого человека. С помощью набора для грима и фальшивых документов мастерски втирается в доверие к доверчивым богачам."
  },
  {
    name: "Criminal",
    nameRu: "Преступник",
    source: "PHB",
    skills: ["Обман (Deception)", "Скрытность (Stealth)"],
    toolProficiencies: ["Набор для игры в кости", "Воровские инструменты"],
    languages: 0,
    feature: "Криминальный контакт (Criminal Contact) — У вас есть надежный связной в преступном мире, с которым вы можете общаться на расстоянии (через записки или посредников). Этот человек помогает вам передавать сообщения, узнавать новости или находить нужных людей в тени.",
    description: "Человек из темных переулков, вор или контрабандист, связанный с преступным миром. Обладает навыками скрытности и обмана, а также умело обращается с воровскими инструментами для взлома замков. Имеет надежные каналы связи с криминальными авторитетами."
  },
  {
    name: "Entertainer",
    nameRu: "Артист",
    source: "PHB",
    skills: ["Акробатика (Acrobatics)", "Выступление (Performance)"],
    toolProficiencies: ["Набор для грима", "Лютня", "Флейта", "Барабан"],
    languages: 0,
    feature: "Популярность (By Popular Demand) — Вы всегда можете найти место для выступления в таверне, театре или на постоялом дворе. Благодаря своим выступлениям вы получаете бесплатную еду и скромный ночлег, а местные жители часто узнают вас в лицо и относятся благосклонно.",
    description: "Бродячий актер, танцор, музыкант или шут. Его стихия — сцена, аплодисменты и внимание публики. Благодаря акробатике и артистизму он умеет развлекать толпу, держаться на публике и без труда находить ночлег за счет своего таланта. Ремесло: Сценическое ремесло: +1 к гриму, краскам и текстилю."
  },
  {
    name: "Folk Hero",
    nameRu: "Народный герой",
    source: "PHB",
    skills: ["Уход за животными (Animal Handling)", "Выживание (Survival)"],
    toolProficiencies: ["Инструменты кузнеца", "Инструменты плотника", "Инструменты кожевника", "Наземный транспорт"],
    languages: 0,
    feature: "Свой человек (Rustic Hospitality) — Простые крестьяне и рабочие видят в вас своего защитника. Они всегда готовы спрятать вас от властей, поделиться едой и кровом в своих домах, а также защитить от опасности ценой собственной безопасности.",
    description: "Выходец из простых крестьян или ремесленников, который совершил подвиг или поднял восстание против угнетателей. Он прекрасно разбирается в дикой природе, умеет ладить с животными и мастерски владеет ремеслом. Простые люди всегда готовы укрыть его в своем доме. Ремесло: Народное ремесло: +1 к кузнечному, плотницкому и кожевенному делу."
  },
  {
    name: "Guild Artisan",
    nameRu: "Гильдийский ремесленник",
    source: "PHB",
    skills: ["Проницательность (Insight)", "Убеждение (Persuasion)"],
    toolProficiencies: ["Инструменты кузнеца", "Алхимический набор", "Инструменты ювелира", "Инструменты кожевника"],
    languages: 1,
    feature: "Членство в гильдии (Guild Membership) — Вы пользуетесь уважением и поддержкой вашей гильдии. Другие мастера готовы пустить вас на постой, заступиться за вас перед судом или выкупить из беды. Кроме того, вы платите взносы, но имеете право на юридическую защиту.",
    description: "Дипломированный мастер своего дела — кузнец, ювелир, портной или алхимик. Он состоит в влиятельной гильдии, что дает ему вес в торговых кругах. Благодаря умению убеждать и проницательности он мастерски заключает выгодные сделки. Ремесло: Гильдийское ремесло: +1 к кузнечному, алхимическому, ювелирному и кожевенному делу."
  },
  {
    name: "Hermit",
    nameRu: "Отшельник",
    source: "PHB",
    skills: ["Лекарство (Medicine)", "Религия (Religion)"],
    toolProficiencies: ["Набор травника", "Пан-флейта"],
    languages: 1,
    feature: "Уединение / Откровение (Discovery) — Годы изоляции подарили вам уникальное знание о тайне космоса, богах, природе или конкретных людях. Это озарение дает вам подсказку в решении сложнейших загадок или помогает понять скрытый смысл происходящего.",
    description: "Человек, долгие годы проживший в изоляции — в пещере, лесу или высокогорном монастыре. Посвятив себя размышлениям и изучению природы, он научился исцелять травами и обрел глубокое понимание религиозных догм, а также сделал важное умозаключение о мироздании. Ремесло: Травническая практика: +1 к обработке трав при владении набором травника."
  },
  {
    name: "Noble",
    nameRu: "Благородный",
    source: "PHB",
    skills: ["История (History)", "Убеждение (Persuasion)"],
    toolProficiencies: ["Набор для игры в кости", "Игральные карты"],
    languages: 1,
    feature: "Положение (Position of Privilege) — Благодаря вашему происхождению вас везде встречают с уважением. Вы можете добиться аудиенции у местных чиновников и дворян, вас принимают в высшем обществе, а люди низшего сословия стараются угодить вам.",
    description: "Представитель аристократического рода, выросший в роскоши и окружении придворных интриг. Он прекрасно знает геральдику и историю королевств, а природное обаяние и статус позволяют ему легко добиваться аудиенции у властей."
  },
  {
    name: "Outlander",
    nameRu: "Дикарь",
    source: "PHB",
    skills: ["Атлетика (Athletics)", "Выживание (Survival)"],
    toolProficiencies: ["Боевой рог", "Барабан"],
    languages: 1,
    feature: "Странник (Wanderer) — Вы обладаете превосходной памятью на карты и географию. Вы всегда можете безошибочно определить направление, найти пресную воду и пропитание (ягоды, дичь) для себя и спутников в любых диких условиях.",
    description: "Обитатель диких земель, кочевник, охотник или варвар, выросший вдали от цивилизации. Обладает железной атлетической закалкой и навыками выживания: может безошибочно находить пищу, воду и ориентироваться на любой местности. Ремесло: Полевой опыт: +1 к обработке природных материалов."
  },
  {
    name: "Sage",
    nameRu: "Мудрец",
    source: "PHB",
    skills: ["Магия (Arcana)", "История (History)"],
    toolProficiencies: [],
    languages: 2,
    feature: "Исследователь (Researcher) — Когда вы сталкиваетесь с неизвестным текстом, тайной или историческим фактом, вы всегда интуитивно знаете, в каких библиотеках, архивах или у каких ученых мужей можно найти информацию об этом.",
    description: "Ученый муж, архивариус или академик, посвятивший жизнь фолиантам и древним тайнам. Он отлично разбирается в магических теориях и исторической хронологии, а если чего-то не знает, то всегда точно понимает, в какой библиотеке искать ответ. Ремесло: Исследовательская практика: +1 к каллиграфии и алхимии."
  },
  {
    name: "Sailor",
    nameRu: "Мореход",
    source: "PHB",
    skills: ["Атлетика (Athletics)", "Восприятие (Perception)"],
    toolProficiencies: ["Инструменты навигатора", "Водный транспорт"],
    languages: 0,
    feature: "Проход на корабль (Ship's Passage) — Вы и ваши спутники можете бесплатно доплыть на попутном торговом или военном судове из одного порта в другой. Взамен вы и ваша команда обычно помогаете матросам работать с парусами и нести вахту.",
    description: "Бывалый матрос или капитан, исходивший вдоль и поперек бурные моря. Обладает развитой реакцией, крепкой мускулатурой и острым зрением. Уверенно управляет любыми судами и может договориться о бесплатном проплыве на попутном корабле."
  },
  {
    name: "Soldier",
    nameRu: "Солдат",
    source: "PHB",
    skills: ["Атлетика (Athletics)", "Запугивание (Intimidation)"],
    toolProficiencies: ["Набор для игры в кости", "Наземный транспорт"],
    languages: 0,
    feature: "Военное звание (Military Rank) — Вы сохранили авторитет среди военных и уважение армейских чинов. Другие солдаты подчиняются вашему авторитету в рамках звания, вас пускают в военные лагеря, а при необходимости вы можете получить лошадь или снаряжение во временное пользование.",
    description: "Ветеран регулярной армии или наемник, прошедший через горнило вооруженных конфликтов. Закален физически, умеет подчиняться приказам и внушать страх противникам. Пользуется уважением среди военных и имеет авторитет в лагерях."
  },
  {
    name: "Urchin",
    nameRu: "Беспризорник",
    source: "PHB",
    skills: ["Ловкость рук (Sleight of Hand)", "Скрытность (Stealth)"],
    toolProficiencies: ["Набор для грима", "Воровские инструменты"],
    languages: 0,
    feature: "Городской слух (City Secrets) — Вы знаете городские трущобы как свои пять пальцев. Вы и ваши спутники можете перемещаться по городу в два раза быстрее обычной скорости, а также находить надежные тайные убежища, где стража и враги не смогут вас найти.",
    description: "Сирота улиц, выживавший в трущобах крупных городов за счет воровства, проворства и знания потайных лазеек. Он незаметно ускользает от преследователей и знает городские закоулки лучше любого стражника."
  },

  // --- ВАРИАНТЫ БАЗОВЫХ ПРЕДЫСТОРИЙ ---
  {
    name: "Gladiator",
    nameRu: "Гладиатор",
    source: "PHB (Вариант артиста)",
    skills: ["Акробатика (Acrobatics)", "Выступление (Performance)"],
    toolProficiencies: ["Набор для грима", "Трезубец", "Сеть"],
    languages: 0,
    feature: "Популярность (By Popular Demand) — Вас знают и любят зрители арен. Вы легко находите место для проживания и питания в обмен на шоу, а толпы фанатов готовы поддержать вас и предоставить убежище или слухи в городах.",
    description: "Звезда арены, выступающая перед ревущей толпой зрителей. В отличие от обычного артиста, он сочетает смертоносное владение необычным оружием с акробатическим шоу, вызывая всеобщий восторг и трепет."
  },
  {
    name: "Knight",
    nameRu: "Рыцарь",
    source: "PHB (Вариант благородного)",
    skills: ["История (History)", "Убеждение (Persuasion)"],
    toolProficiencies: ["Набор для игры в кости", "Наземный транспорт"],
    languages: 1,
    feature: "Державное положение / Слуги (Retainers) — У вас есть три преданных слуги (оруженосец, простолюдин-слуга и шпион/секретарь), которые сопровождают вас. Они выполняют мелкие поручения, ухаживают за лошадями и помогают в быту, но не участвуют в опасных боях.",
    description: "Благородный воин, давший обет верности сюзерену или ордену. Обладает безупречными манерами, знанием истории рыцарства и даром убеждения. В его подчинении состоят преданные слуги, готовые помогать в путешествиях."
  },
  {
    name: "Pirate",
    nameRu: "Пират",
    source: "PHB (Вариант морехода)",
    skills: ["Атлетика (Athletics)", "Восприятие (Perception)"],
    toolProficiencies: ["Инструменты навигатора", "Водный транспорт"],
    languages: 0,
    feature: "Дурная слава (Bad Reputation) — Ваша пиратская репутация внушает людям страх. Простые обыватели стараются не связываться с вами и охотно выполняют мелкие требования, чтобы избежать неприятностей, а в портовых кабаках вас опасаются задирать.",
    description: "Гроза морских путей, промышлявший грабежом торговых караванов. Прекрасно управляет кораблями и ориентируется в навигации, а его дурная слава заставляет врагов трепетать при одном упоминании имени."
  },

  // --- СТРАДЫ И УЖАСЫ (CURSE OF STRAHD) ---
  {
    name: "Haunted One",
    nameRu: "Одержимый",
    source: "CoS",
    skills: ["Магия (Arcana)", "Расследование (Investigation)"],
    toolProficiencies: [],
    languages: 2,
    feature: "Сердце тьмы (Heart of Darkness) — Люди чувствуют вашу внутреннюю тьму и шрамы прошлого. Они испытывают инстинктивный страх или трепет перед вами, поэтому охотно выполняют ваши разумные требования и предоставляют кров, лишь бы вы быстрее ушли.",
    description: "Человек, переживший ужасную трагедию или столкнувшийся с потусторонним злом, которое навсегда изменило его рассудок. Он обладает глубокими познаниями в мистике и выживании, а внутренние демоны наделяют его пугающей несгибаемостью."
  },

  // --- ПОБЕРЕЖЬЕ МЕЧЕЙ (SCAG) ---
  {
    name: "City Watch / Investigator",
    nameRu: "Городская стража / Следователь",
    source: "SCAG",
    skills: ["Проницательность (Insight)", "Расследование (Investigation)"],
    toolProficiencies: [],
    languages: 2,
    feature: "Городской дозор (Watcher's Eye) — Вы знаете, как устроена городская стража и законы. Вы без труда находите лазейки в городской юрисдикции, можете договариваться со стражниками о снисходительности и легко замечаете посты охраны.",
    description: "Блюститель закона или профессиональный детектив крупных городов. Он умеет находить улики, распутывать сложные заговоры и читать людей по малейшим изменениям в поведении, поддерживая порядок на улицах."
  },
  {
    name: "Faction Agent",
    nameRu: "Агент фракции",
    source: "SCAG",
    skills: ["Проницательность (Insight)", "Убеждение (Persuasion)"],
    toolProficiencies: [],
    languages: 2,
    feature: "Безопасное укрытие (Safe Haven) — Вы всегда можете рассчитывать на тайную поддержку членов вашей организации. В любом крупном поселении вам предоставят конспиративную квартиру, еду, лечение, а также свежие разведданные и контакты.",
    description: "Поверенный тайного общества или влиятельной организации (Арфисты, Жентарим и др.). Обладает острым умом и проницательностью, действует скрытно и всегда может рассчитывать на конспиративные квартиры своей фракции."
  },
  {
    name: "Far Traveler",
    nameRu: "Чужеземец (из дальних земель)",
    source: "SCAG",
    skills: ["Проницательность (Insight)", "Внимательность (Perception)"],
    toolProficiencies: ["Лютня", "Набор для игры в кости"],
    languages: 1,
    feature: "В диковинку (All Eyes on You) — Ваша экзотическая внешность, манеры и акцент приковывают всеобщее внимание. Люди готовы бесплатно угощать вас напитками, пускать на порог из любопытства и рассказывать местные сплетни, лишь бы послушать байки о заморских краях.",
    description: "Путешественник из далеких и экзотических уголков мира, чьи обычаи, акцент и одежда кардинально отличаются от местных. Из-за своей экзотичности он постоянно привлекает к себе всеобщее внимание."
  },
  {
    name: "Inheritor",
    nameRu: "Наследник",
    source: "SCAG",
    skills: ["Выживание (Survival)", "История (History)"],
    toolProficiencies: ["Игральные карты", "Наземный транспорт"],
    languages: 1,
    feature: "Наследство (Inheritance) — Вы владеете уникальным семейным артефактом или секретным документом. Хотя другие охотятся за ним, ваше наследство дает вам связи с влиятельными людьми или организацией, которые помогут защитить его и вас.",
    description: "Обладатель уникального семейного реликта или тайного знания, доставшегося от предков. Наследство накладывает на него большую ответственность, а навыки выживания и эрудиция помогают защитить эту ценность."
  },
  {
    name: "Urban Bounty Hunter",
    nameRu: "Городской охотник за головами",
    source: "SCAG / XGtE",
    skills: ["Скрытность (Stealth)", "Ловкость рук (Sleight of Hand)"],
    toolProficiencies: ["Воровские инструменты", "Набор для игры в кости"],
    languages: 0,
    feature: "Бродячий уличный сыщик (Ear to the Ground) — У вас есть сеть мелких информаторов (нищие, трактирщики, уличные торговцы) во всех районах города. За скромную плату или выпивку они всегда могут поделиться слухами о разыскиваемых преступниках или пропавших людях.",
    description: "Специалист по поимке беглых преступников и должников в каменных джунглях. Он отлично владеет скрытностью, умеет обращаться с уличным оружием и имеет информаторов в каждом кабаке."
  },

  // --- ЭБЕРРОН (ERLW) ---
  {
    name: "House Agent",
    nameRu: "Агент Дома",
    source: "ERLW",
    skills: ["Расследование (Investigation)", "Проницательность (Insight)"],
    toolProficiencies: ["Инструменты кузнеца", "Набор для игры в кости"],
    languages: 1,
    feature: "Корпоративная связь (House Connection) — Вы можете использовать ресурсы, транспорт и недвижимость вашего Драконьего Дома. Вас обслуживают вне очереди в отделениях банка и транспортных компаниях дома, а также оказывают юридическую поддержку.",
    description: "Представитель одного из могущественных Драконьих Домов Эберрона. Специализируется на корпоративных расследованиях, коммерческих интересах и управлении ресурсами дома, используя обширную сеть связей."
  },

  // --- СПЕЛЛДЖАМПЕР (AAG) ---
  {
    name: "Astral Drifter",
    nameRu: "Астральный бродяга",
    source: "AAG",
    skills: ["Проницательность (Insight)", "Религия (Religion)"],
    toolProficiencies: ["Набор травника", "Поварские принадлежности"],
    languages: 2,
    feature: "Божественное откровение (Divine Contact) — Пребывание на Астральном Плане дало вам ментальную защиту: вы получаете сопротивление урону психической энергией и способны черпать силы из ментального следа древних сущностей.",
    description: "Странник, блуждавший по бесконечным просторам Астрального Плана. Познал космические истины, научился выживать в суровых межпространственных условиях и получил частицу божественного благословения."
  },
  {
    name: "Wildspacer",
    nameRu: "Дикий космопроходец",
    source: "AAG",
    skills: ["Атлетика (Athletics)", "Выживание (Survival)"],
    toolProficiencies: ["Инструменты навигатора", "Космический транспорт"],
    languages: 1,
    feature: "Пространственный кочевник (Wildspace Runner) — Вы мастерски ориентируетесь в невесомости и на космических кораблях. Вы никогда не теряете равновесие в условиях нулевой гравитации и без труда находите попутные звездные суда.",
    description: "Моряк звездных кораблей, бороздящий Дикий Космос между мирами. Обладает отличной физической формой, умеет пилотировать космические суда и ориентироваться в звездных потоках."
  },

  // --- ДРАКОНЬИ КОПЬЯ (DOS) ---
  {
    name: "Knight of Solamnia",
    nameRu: "Рыцарь Соламнии",
    source: "DoS",
    skills: ["Атлетика (Athletics)", "История (History)"],
    toolProficiencies: ["Наземный транспорт", "Инструменты кузнеца"],
    languages: 1,
    feature: "Обещание Рыцарства (Squire of Solamnia) — Вы можете рассчитывать на гостеприимство, ночлег и снаряжение в замках, гарнизонах и орденских домах других рыцарей и последователей кодекса чести.",
    description: "Благородный защитник порядка и чести из мира Кринн, следующий жесткому кодексу чести. Силен физически, глубоко чтит традиции рыцарских орденов и историю своего народа."
  },
  {
    name: "Mage of High Sorcery",
    nameRu: "Маг Высшего Волшебства",
    source: "DoS",
    skills: ["Магия (Arcana)", "История (History)"],
    toolProficiencies: ["Инструменты каллиграфа", "Алхимический набор"],
    languages: 2,
    feature: "Адепт Мантии (Initiate of High Sorcery) — Вы имеете доступ к башням и библиотекам Конклава Магов. Другие маги и ученые уважают вашу принадлежность к ордену, помогая с редкими книгами, свитками и компонентами заклинаний.",
    description: "Адепт официальных магических конклавов Криннa. Он глубоко изучил теорию арканы и историю магии, а также мастерски владеет инструментами алхимика или каллиграфа для создания свитков."
  },

  // --- БИГБИ (BGG) ---
  {
    name: "Giant Foundling",
    nameRu: "Найденыш великана",
    source: "BGG",
    skills: ["Атлетика (Athletics)", "Выживание (Survival)"],
    toolProficiencies: ["Инструменты резчика по дереву", "Лютня"],
    languages: 1,
    feature: "Наследие великана (Giant Resiliency) — Впитав частицу первородной мощи великанов, вы получаете временные дополнительные хиты при каждом завершении долгого отдыха, что делает вас более живучим в бою.",
    description: "Человек, выросший среди гигантов или испытавший на себе их мощное влияние. Перенял их силу, выносливость и закалку, а также развил творческие наклонности в ремесле."
  },
  {
    name: "Rune Carver",
    nameRu: "Рунный резчик",
    source: "BGG",
    skills: ["Магия (Arcana)", "История (History)"],
    toolProficiencies: ["Инструменты каменщика"],
    languages: 2,
    feature: "Резчик рун (Rune Adept) — Вы обучены искусству высечения магических рун. Вы можете накладывать определенные рунические заклинания прямо на предметы, используя свои познания в рунах великанов.",
    description: "Мастер древних рунических языков и магии великанов. Специализируется на высечении магических знаков по камню, понимает тайное устройство заклинаний и древнюю историю мира."
  },

  // --- ПЛЕЙНСКЕЙП (PLANESCAPE) ---
  {
    name: "Gate Warden",
    nameRu: "Привратник",
    source: "Planescape",
    skills: ["Выживание (Survival)", "Проницательность (Insight)"],
    toolProficiencies: ["Набор травника", "Флейта"],
    languages: 1,
    feature: "Знаток порталов (Gate Warden Feature) — Вы интуитивно чувствуете магические разрывы, мерцания пространства и межпространственные порталы. Вы можете определять точное расположение стабильных и нестабильных проходов между мирами неподалеку.",
    description: "Страж межпространственных порталов и границ между мирами. Обладает интуицией и навыками выживания на стыке планов бытия, прекрасно чувствуя искажения пространства."
  },
  {
    name: "Planar Philosopher",
    nameRu: "Пленарный философ",
    source: "Planescape",
    skills: ["Магия (Arcana)", "Убеждение (Persuasion)"],
    toolProficiencies: ["Инструменты каллиграфа", "Игральные карты"],
    languages: 1,
    feature: "Убежденный спорщик (Dispute) — Ваш язык подвешен лучше, чем лезвие меча. В любом споре или дебатах вы умеете искусно находить логические дыры в доводах оппонента, склоняя толпу или собеседника на свою сторону.",
    description: "Мыслитель и диспутер из Сигила или других уголков Мультивселенной, спорящий о природе мультиверсума. Обладает даром убеждения и глубокими познаниями в метафизике."
  }
];

// Принудительно делаем доступным глобально и добавляем функцию-геттер
window.dndBackgrounds = dndBackgrounds;
window.getAllBackgrounds = function() {
  return dndBackgrounds;
};

// ============================================================================
// АУДИТ (см. отчёт): всё, что находится ниже этой строки и до конца файла —
// renderSaveThrows / toggleSave / renderSkills / changeSkillProf /
// calculateMods / BG3_POINT_BUY / DND_CLASSES_LIST / initCharacterCreationScreen /
// updateCreationRaceSelect / updateRaceDescription / updateBackgroundDescription /
// updateClassDescription / renderPointBuyRows / calculateTotalPointsSpent /
// updatePointBuyUI — является МЁРТВЫМ КОДОМ.
//
// Все эти же имена объявлены заново в skills.js и character_creation.js,
// которые подключаются в index.html ПОСЛЕ Backgrounds.js. Поскольку все
// скрипты являются классическими <script> и делят одно глобальное
// пространство имён (var/function на верхнем уровне = window.*), более
// поздний файл молча перезаписывает функцию с тем же именем. В результате
// код ниже никогда не выполняется — реально работают только версии из
// skills.js / character_creation.js.
//
// Само по себе это НЕ ломает приложение (баг не проявляется), но создаёт
// серьёзный риск сопровождения: правки, внесённые сюда, не будут иметь
// эффекта, а следующий разработчик может потратить время на отладку
// "неработающего" изменения. Рекомендуется в будущем релизе удалить этот
// блок и оставить только dndBackgrounds/getSkillKeyByName выше.
// ============================================================================

// Функция для сопоставления русских/английских названий навыков с их системными ключами из SKILLS_CONFIG
function getSkillKeyByName(skillNameRu) {
  const map = {
    "акробатика": "acrobatics",
    "атлетика": "athletics",
    "внимательность": "perception",
    "выживание": "survival",
    "выступление": "performance",
    "запугивание": "intimidation",
    "история": "history",
    "лекарство": "medicine",
    "ловкость рук": "sleight_of_hand",
    "магия": "arcana",
    "обман": "deception",
    "природа": "nature",
    "проницательность": "insight",
    "расследование": "investigation",
    "религия": "religion",
    "скрытность": "stealth",
    "убеждение": "persuasion",
    "уход за животными": "animal_handling"
  };

  var lowerName = skillNameRu.toLowerCase();
  for (let key in map) {
    if (lowerName.includes(key)) {
      return map[key];
    }
  }
  return null;
}

function renderSaveThrows() {
  var container = document.getElementById('saveThrowsList');
  if (!container) return;
  if (!currentChar.savesData) currentChar.savesData = {};

  var html = '';
  for (var i = 0; i < STATS_CONFIG.length; i++) {
    var s = STATS_CONFIG[i];
    var modNum = getStatModNum(s.id);
    var isProf = currentChar.savesData[s.id] || false;
    var total = modNum + (isProf ? getProfBonusNum() : 0);
    var checkedAttr = isProf ? 'checked' : '';
    html += '<div class="list-row">' +
      '<span class="list-label">' +
        '<input type="checkbox" ' + checkedAttr + ' onchange="toggleSave(\'' + s.id + '\', this.checked)"> ' +
        s.name + ' (' + s.id.toUpperCase() + ')' +
      '</span>' +
      '<span class="list-val">' + formatModStr(total) + '</span>' +
    '</div>';
  }
  container.innerHTML = html;
}

function toggleSave(statId, isChecked) {
  if (!currentChar.savesData) currentChar.savesData = {};
  currentChar.savesData[statId] = isChecked;
  calculateMods();
}

function renderSkills() {
  var container = document.getElementById('skillsList');
  if (!container) return;
  if (!currentChar.skillsData) currentChar.skillsData = {};

  var html = '';
  for (var i = 0; i < SKILLS_CONFIG.length; i++) {
    var s = SKILLS_CONFIG[i];
    var modNum = getStatModNum(s.stat);
    var mult = currentChar.skillsData[s.id] || 0;
    var total = modNum + (getProfBonusNum() * mult);

    html += '<div class="list-row">' +
      '<span class="list-label">' +
        '<select class="prof-select" onchange="changeSkillProf(\'' + s.id + '\', this.value)">' +
          '<option value="0" ' + (mult === 0 ? 'selected' : '') + '>—</option>' +
          '<option value="1" ' + (mult === 1 ? 'selected' : '') + '>✓</option>' +
          '<option value="2" ' + (mult === 2 ? 'selected' : '') + '>✕2</option>' +
        '</select> ' +
        s.name + ' <small style="color:#777;">(' + s.stat.toUpperCase() + ')</small>' +
      '</span>' +
      '<span class="list-val">' + formatModStr(total) + '</span>' +
    '</div>';
  }
  container.innerHTML = html;
}

function changeSkillProf(skillId, valStr) {
  if (!currentChar.skillsData) currentChar.skillsData = {};
  currentChar.skillsData[skillId] = parseInt(valStr) || 0;
  calculateMods();
}

function calculateMods() {
  for (var i = 0; i < STATS_CONFIG.length; i++) {
    var s = STATS_CONFIG[i];
    var modNum = getStatModNum(s.id);
    var modTag = document.getElementById(s.id + 'Mod');
    if (modTag) modTag.innerText = formatModStr(modNum);
  }

  var dexMod = getStatModNum('dex');
  var initElem = document.getElementById('initMod');
  if (initElem) initElem.value = formatModStr(dexMod);

  var profBonus = getProfBonusNum();
  var wisMod = getStatModNum('wis');
  var intMod = getStatModNum('int');
  var skills = currentChar.skillsData || {};

  var passPerception = 10 + wisMod + (profBonus * (skills['perception'] || 0));
  var passInvestigation = 10 + intMod + (profBonus * (skills['investigation'] || 0));
  var passInsight = 10 + wisMod + (profBonus * (skills['insight'] || 0));

  if (document.getElementById('passivePerception')) document.getElementById('passivePerception').innerText = passPerception.toString();
  if (document.getElementById('passiveInvestigation')) document.getElementById('passiveInvestigation').innerText = passInvestigation.toString();
  if (document.getElementById('passiveInsight')) document.getElementById('passiveInsight').innerText = passInsight.toString();

  renderSaveThrows();
  renderSkills();
  if (typeof renderWeapons === 'function') renderWeapons();
  if (typeof calculateSpellStats === 'function') calculateSpellStats();
  autoSaveCurrentCharacter();
}

// --- МОДУЛЬ СОЗДАНИЯ ПЕРСОНАЖА (Point Buy как в BG3) ---

var BG3_POINT_BUY = {
  costs: { 8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 7, 15: 9 },
  maxPoints: 27,
  stats: {
    str: 8,
    dex: 8,
    con: 8,
    int: 8,
    wis: 8,
    cha: 8
  }
};

var DND_CLASSES_LIST = [
  { id: 'barbarian', name: 'Варвар', hitDie: 12, desc: 'Яростный воин первобытной дикости, способный впадать в боевое безумие.' },
  { id: 'bard', name: 'Бард', hitDie: 8, desc: 'Мастер песни, речи и магии, вдохновляющий союзников и сбивающий с толку врагов. Ремесло: Сценическое ремесло: +1 к текстилю, оформлению и каллиграфии при владении инструментом.' },
  { id: 'cleric', name: 'Жрец', hitDie: 8, desc: 'Посредник между божеством и смертным миром, обладающий целительной и карающей силой.' },
  { id: 'druid', name: 'Друид', hitDie: 8, desc: 'Страж природы, черпающий силу из стихий и способный принимать форму зверей. Ремесло: Природное ремесло: +1 к обработке растительных и алхимических компонентов при владении инструментом.' },
  { id: 'fighter', name: 'Воин', hitDie: 10, desc: 'Универсальный мастер оружия и брони, готовый к любым испытаниям в бою.' },
  { id: 'monk', name: 'Монах', hitDie: 8, desc: 'Адепт мистических боевых искусств, использующий внутреннюю энергию ки.' },
  { id: 'paladin', name: 'Паладин', hitDie: 10, desc: 'Святой воитель, связанный священной клятвой защищать праведных и карать зло.' },
  { id: 'ranger', name: 'Следопыт', hitDie: 10, desc: 'Охотник и следопыт диких земель, мастер выживания и борьбы с избранными врагами. Ремесло: Полевое ремесло: +1 к обработке природных материалов при владении соответствующим инструментом.' },
  { id: 'rogue', name: 'Плут', hitDie: 8, desc: 'Мастер скрытности, ловушек и неожиданных смертоносных ударов из тени. Ремесло: Теневое ремесло: +1 к тонкой механике, подделкам и гриму при владении инструментом.' },
  { id: 'sorcerer', name: 'Чародей', hitDie: 6, desc: 'Заклинатель, чья магия в крови от рождения благодаря уникальному наследию.' },
  { id: 'warlock', name: 'Колдун', hitDie: 8, desc: 'Заключивший договор с могущественной потусторонней сущностью в обмен на тайные знания.' },
  { id: 'wizard', name: 'Волшебник', hitDie: 6, desc: 'Ученый от магии, изучающий заклинания по толстым фолиантам и книгам. Ремесло: Арканное ремесло: +1 к каллиграфии и алхимии при владении инструментом.' }
];

// Клик по кнопке "+ Новый персонаж" из главного меню
window.createNewCharacter = function() {
  var selectScreen = document.getElementById('characterSelectScreen');
  var sheetScreen = document.getElementById('characterSheetScreen');
  var creationScreen = document.getElementById('characterCreationScreen');

  if (selectScreen) selectScreen.style.display = 'none';
  if (sheetScreen) sheetScreen.style.display = 'none';
  if (creationScreen) creationScreen.style.display = 'block';

  // Сбрасываем статы Point Buy к дефолту (все по 8)
  for (var key in BG3_POINT_BUY.stats) {
    BG3_POINT_BUY.stats[key] = 8;
  }
  
  var nameInput = document.getElementById('cc_name');
  if (nameInput) nameInput.value = '';

  var ageInput = document.getElementById('cc_age');
  if (ageInput) ageInput.value = '';

  initCharacterCreationScreen();
  updatePointBuyUI();
};

// Инициализация элементов экрана создания персонажа
function initCharacterCreationScreen() {
  var classSelect = document.getElementById('cc_class');
  if (classSelect) {
    classSelect.innerHTML = '';
    DND_CLASSES_LIST.forEach(function(c) {
      classSelect.innerHTML += '<option value="' + c.name + ' 1">' + c.name + '</option>';
    });
    classSelect.onchange = updateClassDescription;
  }

  var backgroundsList = [];
  if (typeof getAllBackgrounds === 'function') {
    backgroundsList = getAllBackgrounds();
  } else if (typeof dndBackgrounds !== 'undefined' && Array.isArray(dndBackgrounds)) {
    backgroundsList = dndBackgrounds;
  } else if (typeof window.dndBackgrounds !== 'undefined' && Array.isArray(window.dndBackgrounds)) {
    backgroundsList = window.dndBackgrounds;
  }

  var bgSelect = document.getElementById('cc_background');
  if (bgSelect) {
    bgSelect.innerHTML = '<option value="">-- Выберите предысторию --</option>';
    backgroundsList.forEach(function(b) {
      var valName = b.nameRu || b.name;
      var displayName = b.nameRu ? b.nameRu + ' (' + b.name + ')' : b.name;
      var source = b.source ? ' [' + b.source + ']' : '';
      
      bgSelect.innerHTML += '<option value="' + valName + '">' + displayName + source + '</option>';
    });
    bgSelect.onchange = updateBackgroundDescription;
  }

  updateCreationRaceSelect();
  renderPointBuyRows();
  
  updateClassDescription();
  updateBackgroundDescription();
}

function updateCreationRaceSelect() {
  var raceSelect = document.getElementById('cc_race');
  if (!raceSelect || typeof getAllRaces !== 'function') return;
  
  var allRaces = getAllRaces();
  var html = '<option value="">-- Выберите расу --</option>';
  allRaces.forEach(function(r) {
    html += '<option value="' + r.id + '">' + r.name + '</option>';
  });
  raceSelect.innerHTML = html;
  raceSelect.onchange = updateRaceDescription;
  updateRaceDescription();
}

function updateRaceDescription() {
  var raceSelect = document.getElementById('cc_race');
  var descBox = document.getElementById('cc_raceDescBox');
  if (!raceSelect || !descBox) return;

  var raceId = raceSelect.value;
  if (!raceId || typeof getAllRaces !== 'function') {
    descBox.innerHTML = '<span style="color: #777;">Выберите расу, чтобы увидеть ее описание и особенности.</span>';
    return;
  }

  var allRaces = getAllRaces();
  var selectedRace = null;
  for (var i = 0; i < allRaces.length; i++) {
    if (allRaces[i].id === raceId) {
      selectedRace = allRaces[i];
      break;
    }
  }

  if (selectedRace) {
    var bonusesText = '';
    if (selectedRace.bonuses) {
      var bParts = [];
      var statNamesShort = { str: 'Сил', dex: 'Лов', con: 'Тел', int: 'Инт', wis: 'Муд', cha: 'Хар' };
      for (var s in selectedRace.bonuses) {
        if (selectedRace.bonuses[s] !== 0) {
          bParts.push(statNamesShort[s] + ': +' + selectedRace.bonuses[s]);
        }
      }
      if (bParts.length > 0) {
        bonusesText = '<br><strong>Бонусы к характеристикам:</strong> ' + bParts.join(', ');
      }
    }
    descBox.innerHTML = '<strong>' + selectedRace.name + '</strong><br>' + (selectedRace.desc || 'Нет описания.') + bonusesText + '<br><span style="color: #aaa; font-size: 12px;">Скорость: ' + (selectedRace.speed || '30 футов') + '</span>';
  } else {
    descBox.innerHTML = '<span style="color: #777;">Описание не найдено.</span>';
  }
}

function updateBackgroundDescription() {
  var bgSelect = document.getElementById('cc_background');
  var descBox = document.getElementById('cc_bgDescBox');
  if (!bgSelect || !descBox) return;

  var bgVal = bgSelect.value;
  if (!bgVal) {
    descBox.innerHTML = '<span style="color: #777;">Выберите предысторию, чтобы увидеть навыки, особенности и описание.</span>';
    return;
  }

  var backgroundsList = [];
  if (typeof getAllBackgrounds === 'function') {
    backgroundsList = getAllBackgrounds();
  } else if (typeof dndBackgrounds !== 'undefined') {
    backgroundsList = dndBackgrounds;
  } else if (typeof window.dndBackgrounds !== 'undefined') {
    backgroundsList = window.dndBackgrounds;
  }

  var selectedBg = null;
  for (var i = 0; i < backgroundsList.length; i++) {
    var b = backgroundsList[i];
    if (b.nameRu === bgVal || b.name === bgVal) {
      selectedBg = b;
      break;
    }
  }

  if (selectedBg) {
    var skillsStr = Array.isArray(selectedBg.skills) ? selectedBg.skills.join(', ') : (selectedBg.skills || 'Нет');
    var toolsStr = Array.isArray(selectedBg.toolProficiencies) && selectedBg.toolProficiencies.length > 0 ? selectedBg.toolProficiencies.join(', ') : 'Нет';
    var featureStr = selectedBg.feature || 'Не указана';
    
    var featureDescStr = selectedBg.featuredescription || selectedBg.featureDescription || selectedBg.featureDesc || '';
    var descText = selectedBg.description || 'Описание отсутствует.';
    
    var featureHtml = '<strong>Особенность:</strong> ' + featureStr;
    if (featureDescStr) {
      featureHtml += '<br><span style="color: #bbb; display: block; margin: 2px 0 4px 10px; font-size: 13px;">' + featureDescStr + '</span>';
    }

    descBox.innerHTML = '<strong>' + (selectedBg.nameRu || selectedBg.name) + '</strong> (' + (selectedBg.source || 'PHB') + ')<br>' +
      '<span style="color: #ccc; display: block; margin: 4px 0;">' + descText + '</span>' +
      '<strong>Навыки:</strong> ' + skillsStr + '<br>' +
      '<strong>Инструменты:</strong> ' + toolsStr + '<br>' +
      featureHtml;
  } else {
    descBox.innerHTML = '<span style="color: #777;">Информация о предыстории отсутствует.</span>';
  }
}

function updateClassDescription() {
  var classSelect = document.getElementById('cc_class');
  var descBox = document.getElementById('cc_classDescBox');
  if (!classSelect || !descBox) return;

  var val = classSelect.value;
  var classNameOnly = val.split(' ')[0];

  var selectedClass = null;
  for (var i = 0; i < DND_CLASSES_LIST.length; i++) {
    if (DND_CLASSES_LIST[i].name === classNameOnly) {
      selectedClass = DND_CLASSES_LIST[i];
      break;
    }
  }

  if (selectedClass) {
    descBox.innerHTML = '<strong>' + selectedClass.name + '</strong> (Кость хитов: d' + selectedClass.hitDie + ')<br>' + selectedClass.desc;
  } else {
    descBox.innerHTML = '<span style="color: #777;">Выберите класс для просмотра информации.</span>';
  }
}

function renderPointBuyRows() {
  var container = document.getElementById('cc_statsContainer');
  if (!container) return;
  
  var statNames = {
    str: 'Сила (СИЛ)',
    dex: 'Ловкость (ЛОВ)',
    con: 'Телосложение (ТЕЛ)',
    int: 'Интеллект (ИНТ)',
    wis: 'Мудрость (МУД)',
    cha: 'Харизма (ХАР)'
  };

  var html = '';
  for (var key in BG3_POINT_BUY.stats) {
    var val = BG3_POINT_BUY.stats[key];
    var mod = Math.floor((val - 10) / 2);
    var modStr = mod >= 0 ? '+' + mod : mod;

    html += `
      <div style="display: flex; align-items: center; justify-content: space-between; background: #2a2a2a; padding: 6px 12px; border-radius: 4px;">
        <span style="font-weight:bold; font-size: 14px;">${statNames[key]}</span>
        <div style="display: flex; align-items: center; gap: 10px;">
          <button type="button" onclick="changePointBuyStat('${key}', -1)" style="width:32px; height:32px; background:#444; color:#fff; border:none; font-weight:bold; cursor:pointer; border-radius:4px;">-</button>
          <span id="cc_val_${key}" style="width: 25px; text-align: center; font-size: 16px; font-weight:bold;">${val}</span>
          <button type="button" onclick="changePointBuyStat('${key}', 1)" style="width:32px; height:32px; background:#444; color:#fff; border:none; font-weight:bold; cursor:pointer; border-radius:4px;">+</button>
          <span style="width: 45px; text-align: right; color: #aaa; font-size: 13px;">(${modStr})</span>
        </div>
      </div>
    `;
  }
  container.innerHTML = html;
}

window.changePointBuyStat = function(statKey, delta) {
  var currentVal = BG3_POINT_BUY.stats[statKey];
  var newVal = currentVal + delta;

  if (newVal < 8 || newVal > 15) return;

  var currentSpent = calculateTotalPointsSpent();
  var pointCostDiff = BG3_POINT_BUY.costs[newVal] - BG3_POINT_BUY.costs[currentVal];

  if (delta > 0 && (currentSpent + pointCostDiff > BG3_POINT_BUY.maxPoints)) {
    alert('Недостаточно очков характеристик (максимум 27)!');
    return;
  }

  BG3_POINT_BUY.stats[statKey] = newVal;
  updatePointBuyUI();
};

function calculateTotalPointsSpent() {
  var spent = 0;
  for (var key in BG3_POINT_BUY.stats) {
    spent += BG3_POINT_BUY.costs[BG3_POINT_BUY.stats[key]];
  }
  return spent;
}

function updatePointBuyUI() {
  var spent = calculateTotalPointsSpent();
  var left = BG3_POINT_BUY.maxPoints - spent;
  
  var pointsLeftEl = document.getElementById('cc_pointsLeft');
  if (pointsLeftEl) {
    pointsLeftEl.innerText = left;
    pointsLeftEl.style.color = left === 0 ? '#fa4' : '#4f4';
  }

  for (var key in BG3_POINT_BUY.stats) {
    var valEl = document.getElementById('cc_val_' + key);
    if (valEl) {
      valEl.innerText = BG3_POINT_BUY.stats[key];
    }
  }
}

// Сохранение нового персонажа
window.saveNewCreatedCharacter = function() {
  var nameInput = document.getElementById('cc_name');
  var name = nameInput ? nameInput.value.trim() : '';
  if (!name) {
    alert('Пожалуйста, введите имя персонажа!');
    return;
  }

  var ageEl = document.getElementById('cc_age');
  var age = ageEl ? parseInt(ageEl.value) || 0 : 0;

  var className = document.getElementById('cc_class').value;
  
  var bgSelect = document.getElementById('cc_background');
  var backgroundName = bgSelect ? bgSelect.value : '';

  var raceId = document.getElementById('cc_race').value;

  var finalStats = {
    str: BG3_POINT_BUY.stats.str,
    dex: BG3_POINT_BUY.stats.dex,
    con: BG3_POINT_BUY.stats.con,
    int: BG3_POINT_BUY.stats.int,
    wis: BG3_POINT_BUY.stats.wis,
    cha: BG3_POINT_BUY.stats.cha
  };

  var raceName = '';
  var baseAc = 10;

  if (raceId && typeof getAllRaces === 'function') {
    var allRaces = getAllRaces();
    var selectedRace = null;
    for (var i = 0; i < allRaces.length; i++) {
      if (allRaces[i].id === raceId) {
        selectedRace = allRaces[i];
        break;
      }
    }

    if (selectedRace) {
      raceName = selectedRace.name || '';
      
      if (selectedRace.bonuses) {
        for (var stat in selectedRace.bonuses) {
          if (finalStats[stat] !== undefined) {
            finalStats[stat] += selectedRace.bonuses[stat];
          }
        }
      }

      if (selectedRace.baseAc !== undefined) {
        baseAc = selectedRace.baseAc;
      } else if (selectedRace.baseAcFormula === 'lizardfolk') {
        var dexMod = Math.floor((finalStats.dex - 10) / 2);
        baseAc = 13 + dexMod;
      } else if (selectedRace.baseAcFormula === 'loxodon') {
        var conMod = Math.floor((finalStats.con - 10) / 2);
        baseAc = 12 + conMod;
      }
    }
  }

  var conModFinal = Math.floor((finalStats.con - 10) / 2);
  var maxHp = 10 + conModFinal;

  // --- АВТОМАТИЧЕСКОЕ ИЗВЛЕЧЕНИЕ НАВЫКОВ ИЗ ПРЕДЫСТОРИИ ---
  var initialSkillsData = {};
  if (backgroundName && typeof getAllBackgrounds === 'function') {
    var allBgs = getAllBackgrounds();
    var selectedBg = null;
    for (var bIdx = 0; bIdx < allBgs.length; bIdx++) {
      if (allBgs[bIdx].nameRu === backgroundName || allBgs[bIdx].name === backgroundName) {
        selectedBg = allBgs[bIdx];
        break;
      }
    }
    
    if (selectedBg && Array.isArray(selectedBg.skills)) {
      selectedBg.skills.forEach(function(skillStr) {
        // Пропускаем вариативные/выбираемые навыки, добавляем только фиксированные
        if (!skillStr.toLowerCase().includes('выбирается')) {
          var sKey = getSkillKeyByName(skillStr);
          if (sKey) {
            initialSkillsData[sKey] = 1; // Устанавливаем владение навыком (✓)
          }
        }
      });
    }
  }
  // ---------------------------------------------------------

  var newId = 'char_' + Date.now();
  var newChar = {
    id: newId,
    name: name,
    age: age,
    class: className,
    className: className,
    background: backgroundName,
    raceId: raceId,
    raceName: raceName,
    baseAC: baseAc,
    ac: String(baseAc),
    speed: '30 футов',
    hpMax: maxHp > 1 ? maxHp : 1,
    hpCurrent: maxHp > 1 ? maxHp : 1,
    hpTemp: '',
    hitDice: '1d10',
    profBonus: 2,
    spellStat: 'int',
    stats: {
      str: finalStats.str,
      dex: finalStats.dex,
      con: finalStats.con,
      int: finalStats.int,
      wis: finalStats.wis,
      cha: finalStats.cha
    },
    savesData: {},
    skillsData: initialSkillsData, // <--- Интегрированные навыки предыстории
    activeConditions: {},
    weaponsData: [],
    spellSlotsData: { 1: {max: 0, used: 0}, 2: {max: 0, used: 0}, 3: {max: 0, used: 0}, 4: {max: 0, used: 0}, 5: {max: 0, used: 0}, 6: {max: 0, used: 0}, 7: {max: 0, used: 0}, 8: {max: 0, used: 0}, 9: {max: 0, used: 0} },
    spellsData: [],
    folders: [
      { id: 'f_inv_' + Date.now(), name: '📦 Инвентарь', notes: [] },
      { id: 'f_quest_' + Date.now(), name: '📜 Квесты', notes: [] }
    ],
    library: []
  };

  if (typeof allCharacters !== 'undefined') {
    allCharacters.push(newChar);
  } else {
    window.allCharacters = [newChar];
  }

  if (typeof saveAllCharacters === 'function') {
    saveAllCharacters();
  } else {
    localStorage.setItem('dnd_multi_characters_v2', JSON.stringify(allCharacters));
  }

  var creationScreen = document.getElementById('characterCreationScreen');
  if (creationScreen) creationScreen.style.display = 'none';

  if (typeof openCharacter === 'function') {
    openCharacter(newId);
  } else {
    location.reload();
  }
};

window.closeCharacterCreationModal = function() {
  if (typeof showCharacterSelect === 'function') {
    showCharacterSelect();
  } else {
    var creationScreen = document.getElementById('characterCreationScreen');
    if (creationScreen) creationScreen.style.display = 'none';
  }
};
