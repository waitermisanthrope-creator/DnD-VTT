/**
 * feats_ua_homebrew.js
 * Дополнительные, тестовые (UA) и домашние черты для расширения выбора.
 */

window.FEATS_UA_HOMEBREW = [
  {
    id: 'alchemist',
    name: 'Alchemist',
    nameRu: 'Алхимик',
    source: 'UA',
    prerequisite: null,
    statBonus: { stats: ['int'], value: 1 },
    description: 'Создание зелий и кислот с повышенной эффективностью.'
  },
  {
    id: 'arcane_marksman',
    name: 'Arcane Marksman',
    nameRu: 'Магический стрелок',
    source: 'Homebrew',
    prerequisite: null,
    statBonus: null,
    description: 'Наложение магических эффектов на стрелы.'
  },
  {
    id: 'berserker',
    name: 'Berserker',
    nameRu: 'Берсерк',
    source: 'UA',
    prerequisite: null,
    statBonus: null,
    description: 'Дополнительный урон в состоянии ярости.'
  },
  {
    id: 'brawler',
    name: 'Brawler',
    nameRu: 'Головорез',
    source: 'UA',
    prerequisite: null,
    statBonus: null,
    description: 'Улучшенные приемы рукопашной борьбы и бросков.'
  },
  {
    id: 'empath',
    name: 'Empath',
    nameRu: 'Эмпат',
    source: 'UA',
    prerequisite: null,
    statBonus: { stats: ['wis'], value: 1 },
    description: 'Чтение эмоций и чувств окружающих существ.'
  },
  {
    id: 'fast_movement',
    name: 'Speedster',
    nameRu: 'Спринтер',
    source: 'UA',
    prerequisite: null,
    statBonus: { stats: ['dex'], value: 1 },
    description: 'Дополнительные 10 футов к скорости передвижения.'
  },
  {
    id: 'gourmand',
    name: 'Gourmand',
    nameRu: 'Гурман',
    source: 'UA',
    prerequisite: null,
    statBonus: { stats: ['con'], value: 1 },
    description: 'Определение ядов в пище, приготовление изысканных блюд.'
  },
  {
    id: 'harper_agent',
    name: 'Harper Agent',
    nameRu: 'Агент Арфистов',
    source: 'SCAG',
    prerequisite: null,
    statBonus: null,
    description: 'Связи с тайной организацией Арфистов, преимущество на проверки мудрости.'
  },
  {
    id: 'master_of_disguise',
    name: 'Master of Disguise',
    nameRu: 'Мастер маскировки',
    source: 'UA',
    prerequisite: null,
    statBonus: null,
    description: 'Идеальное создание поддельных документов и личин.'
  },
  {
    id: 'medic',
    name: 'Field Medic',
    nameRu: 'Полевой медик',
    source: 'UA',
    prerequisite: null,
    statBonus: null,
    description: 'Мгновенное оказание первой помощи союзникам.'
  },
  {
    id: 'necromantic_scholar',
    name: 'Necromancer Scholar',
    nameRu: 'Знаток некромантии',
    source: 'Homebrew',
    prerequisite: null,
    statBonus: { stats: ['int'], value: 1 },
    description: 'Понимание темных искусств и улучшение нежити.'
  },
  {
    id: 'perceptive',
    name: 'Eagle Eye',
    nameRu: 'Соколиный глаз',
    source: 'UA',
    prerequisite: null,
    statBonus: { stats: ['wis'], value: 1 },
    description: 'Преимущество на высматривание скрытых объектов.'
  },
  {
    id: 'pyromaniac',
    name: 'Pyromaniac',
    nameRu: 'Пироман',
    source: 'UA',
    prerequisite: null,
    statBonus: { stats: ['int'], value: 1 },
    description: 'Увеличение урона заклинаний огня.'
  },
  {
    id: 'sea_faring',
    name: 'Sailor / Navigator',
    nameRu: 'Морской волк',
    source: 'UA',
    prerequisite: null,
    statBonus: null,
    description: 'Преимущество в управлении кораблями и в шторм.'
  },
  {
    id: 'silver_tongue',
    name: 'Silver Tongue',
    nameRu: 'Язык без костей',
    source: 'UA',
    prerequisite: null,
    statBonus: { stats: ['cha'], value: 1 },
    description: 'Невозможность завалить проверку обмана или убеждения ниже определенного порога.'
  },
  {
    id: 'stealthy',
    name: 'Stealthy',
    nameRu: 'Теневой лазутчик',
    source: 'UA',
    prerequisite: null,
    statBonus: null,
    description: 'Дополнительный бонус к скрытности и возможность прятаться на бегу.'
  },
  {
    id: 'survivalist',
    name: 'Survivalist',
    nameRu: 'Выживальщик',
    source: 'UA',
    prerequisite: null,
    statBonus: { stats: ['wis'], value: 1 },
    description: 'Удвоенный результат сбора еды и воды в дикой природе.'
  },
  {
    id: 'tough_hide',
    name: 'Thick Skin',
    nameRu: 'Толстокожий',
    source: 'UA',
    prerequisite: null,
    statBonus: { stats: ['con'], value: 1 },
    description: 'Небольшое естественное уменьшение любого получаемого урона.'
  },
  {
    id: 'unarmored_defense_feat',
    name: 'Brawler Defense',
    nameRu: 'Боевая закалка',
    source: 'Homebrew',
    prerequisite: null,
    statBonus: null,
    description: 'Расчет класса защиты без доспехов по альтернативной формуле.'
  },
  {
    id: 'zealot',
    name: 'Zealot',
    nameRu: 'Фанатик',
    source: 'UA',
    prerequisite: null,
    statBonus: null,
    description: 'Иммунитет к испугу при защите выбранных идеалов или божества.'
  },
  {
    id: 'arcane_defender',
    name: 'Arcane Defender',
    nameRu: 'Магический страж',
    source: 'Homebrew',
    prerequisite: { spellcasting: true },
    statBonus: null,
    description: 'Создание магического барьера реакцией.'
  },
  {
    id: 'divine_interventionist',
    name: 'Divine Shield',
    nameRu: 'Божественная защита',
    source: 'Homebrew',
    prerequisite: null,
    statBonus: null,
    description: 'Временное благословение светлых сил.'
  },
  {
    id: 'shadow_dancer',
    name: 'Shadow Dancer',
    nameRu: 'Теневой танцор',
    source: 'Homebrew',
    prerequisite: null,
    statBonus: { stats: ['dex'], value: 1 },
    description: 'Телепортация из тени в тень на короткие дистанции.'
  },
  {
    id: 'beast_tamer',
    name: 'Beast Tamer',
    nameRu: 'Укротитель зверей',
    source: 'Homebrew',
    prerequisite: null,
    statBonus: null,
    description: 'Призыв верного лесного спутника.'
  },
  {
    id: 'runic_carver',
    name: 'Runic Carver',
    nameRu: 'Рунный резчик',
    source: 'Homebrew',
    prerequisite: null,
    statBonus: { stats: ['int'], value: 1 },
    description: 'Начертание магических рун на оружии и броне.'
  },
  {
    id: 'storm_herald',
    name: 'Storm Herald',
    nameRu: 'Буревестник',
    source: 'Homebrew',
    prerequisite: null,
    statBonus: null,
    description: 'Управление силой ветра и молний вокруг себя.'
  },
  {
    id: 'blood_hunter',
    name: 'Blood Hunter Adept',
    nameRu: 'Адепт кровавой охоты',
    source: 'Homebrew',
    prerequisite: null,
    statBonus: null,
    description: 'Владение проклятиями крови.'
  },
  {
    id: 'bardic_inspiration_feat',
    name: 'Inspiring Voice',
    nameRu: 'Звучный голос',
    source: 'Homebrew',
    prerequisite: null,
    statBonus: { stats: ['cha'], value: 1 },
    description: 'Возможность воодушевлять союзников песней или словом.'
  },
  {
    id: 'monastic_training',
    name: 'Monastic Training',
    nameRu: 'Монастырская выучка',
    source: 'Homebrew',
    prerequisite: null,
    statBonus: { stats: ['wis'], value: 1 },
    description: 'Владение базовыми приемами учения ки.'
  },
  {
    id: 'warlock_pact_initiate',
    name: 'Pact Initiate',
    nameRu: 'Адепт договора',
    source: 'Homebrew',
    prerequisite: null,
    statBonus: null,
    description: 'Получение младшего благословения инфернального патрона.'
  },
  {
    id: 'artisan_genius',
    name: 'Artisan Genius',
    nameRu: 'Гениальный ремесленник',
    source: 'Homebrew',
    prerequisite: null,
    statBonus: { stats: ['int'], value: 1 },
    description: 'Создание уникальных механизмов и улучшение предметов.'
  },
  {
    id: 'gladiator',
    name: 'Gladiator',
    nameRu: 'Гладиатор',
    source: 'Homebrew',
    prerequisite: null,
    statBonus: null,
    description: 'Зрелые атаки экзотическим оружием.'
  },
  {
    id: 'nomad',
    name: 'Nomad',
    nameRu: 'Странник пустошей',
    source: 'Homebrew',
    prerequisite: null,
    statBonus: { stats: ['con'], value: 1 },
    description: 'Снижение штрафов от жажды, жары и холода.'
  },
  {
    id: 'duelist_master',
    name: 'Duelist Master',
    nameRu: 'Мастер дуэлей',
    source: 'Homebrew',
    prerequisite: null,
    statBonus: null,
    description: 'Преимущество при атаках одиночным одноручным оружием.'
  },
  {
    id: 'shield_bash_master',
    name: 'Shield Bash',
    nameRu: 'Щитовой удар',
    source: 'Homebrew',
    prerequisite: null,
    statBonus: null,
    description: 'Опрокидывание врагов ударом щита в лицо.'
  },
  {
    id: 'shadow_strike',
    name: 'Shadow Strike',
    nameRu: 'Удар из тени',
    source: 'Homebrew',
    prerequisite: null,
    statBonus: { stats: ['dex'], value: 1 },
    description: 'Дополнительный урон из состояния скрытности.'
  },
  {
    id: 'holy_warrior',
    name: 'Holy Warrior',
    nameRu: 'Святой воитель',
    source: 'Homebrew',
    prerequisite: null,
    statBonus: { stats: ['wis'], value: 1 },
    description: 'Освещение оружия священной силой.'
  },
  {
    id: 'arcane_recovery_feat',
    name: 'Mana Well',
    nameRu: 'Магический резерв',
    source: 'Homebrew',
    prerequisite: { spellcasting: true },
    statBonus: null,
    description: 'Восстановление ячейки заклинания низкого круга за короткий отдых.'
  },
  {
    id: 'berserker_rage',
    name: 'Frenzied',
    nameRu: 'Неистовый',
    source: 'Homebrew',
    prerequisite: null,
    statBonus: { stats: ['str'], value: 1 },
    description: 'Игнорирование части урона в пылу схватки.'
  },
  {
    id: 'tactician',
    name: 'Tactician',
    nameRu: 'Полевой командир',
    source: 'Homebrew',
    prerequisite: { stat: 'int', min: 13 },
    statBonus: null,
    description: 'Перемещение союзников вне их хода за счет своей реакции.'
  }
];
