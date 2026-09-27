/**
 * feats_phb.js
 * База данных черт из PHB (2014).
 */

window.FEATS_PHB = [
  {
    id: 'alert',
    name: 'Alert',
    nameRu: 'Бдительный',
    source: 'PHB',
    prerequisite: null,
    statBonus: null,
    description: 'Всегда начеку. Вы получаете следующие преимущества: бонус +5 к инициативе; вас нельзя застать врасплох, пока вы в сознании; невидимые противники не получают преимуществ при бросках атаки по вам.'
  },
  {
    id: 'athlete',
    name: 'Athlete',
    nameRu: 'Атлет',
    source: 'PHB',
    prerequisite: null,
    statBonus: { type: 'choice', stats: ['str', 'dex'], value: 1 },
    description: 'Вы физически развиты. Вы получаете бонус +1 к Силе или Ловкости. Встать из положения лежа стоит всего 5 футов движения; сложные препятствия не замедляют ваше карабканье; прыжок в длину с места увеличивается.'
  },
  {
    id: 'actor',
    name: 'Actor',
    nameRu: 'Актёр',
    source: 'PHB',
    prerequisite: null,
    statBonus: { stats: ['cha'], value: 1 },
    description: 'Мастер мимики и перевоплощения. Вы получаете +1 к Харизме. Преимущество при проверках Харизмы (Обман) и Харизмы (Выступление) при попытке сойти за другого человека. Вы можете имитировать голоса существ.'
  },
  {
    id: 'charger',
    name: 'Charger',
    nameRu: 'Наскок',
    source: 'PHB',
    prerequisite: null,
    statBonus: null,
    description: 'Когда вы совершаете действие «Рывок», вы можете бонусным действием совершить одну рукопашную атаку оружием или толчок, если пробежали не менее 10 футов по прямой.'
  },
  {
    id: 'crossbow_expert',
    name: 'Crossbow Expert',
    nameRu: 'Эксперт по арбалетам',
    source: 'PHB',
    prerequisite: null,
    statBonus: null,
    description: 'Вы мастерски владеете арбалетами. Вы не получаете помехи в ближнем бою при стрельбе из дальнобойного оружия. При атаке одноручным оружием вы можете совершить бонусную атаку ручным арбалетом.'
  },
  {
    id: 'defensive_duelist',
    name: 'Defensive Duelist',
    nameRu: 'Защитный дуэлянт',
    source: 'PHB',
    prerequisite: { stat: 'dex', min: 13 },
    statBonus: null,
    description: 'Когда по вам попадают рукопашной атакой и вы держите фехтовальное оружие, которым владеете, реакцией вы можете добавить свой бонус мастерства к КД против этой атаки.'
  },
  {
    id: 'dual_wielder',
    name: 'Dual Wielder',
    nameRu: 'Парное оружие',
    source: 'PHB',
    prerequisite: null,
    statBonus: null,
    description: 'Вы мастерски сражаетесь двумя оружиями. +1 к КД, когда вы держите по оружию ближнего боя в каждой руке. Можете использовать оружие, не являющееся легким. Доставать/убирать два оружия сразу.'
  },
  {
    id: 'dungeon_delver',
    name: 'Dungeon Delver',
    nameRu: 'Исследователь подземелий',
    source: 'PHB',
    prerequisite: null,
    statBonus: null,
    description: 'Эксперт по поиску ловушек и секретов. Преимущество при спасбросках от ловушек и проверках Внимательности для их поиска. Сопротивление урону от ловушек. Идете в полный шаг при поиске скрытых дверей.'
  },
  {
    id: 'durable',
    name: 'Durable',
    nameRu: 'Выносливый',
    source: 'PHB',
    prerequisite: null,
    statBonus: { stats: ['con'], value: 1 },
    description: 'Выносливость к боли. +1 к Телосложению. При броске костей хитов для восстановления здоровья ваше минимальное восстановление тесно связано с удвоенным модификатором Телосложения.'
  },
  {
    id: 'elemental_adept',
    name: 'Elemental Adept',
    nameRu: 'Адепт стихий',
    source: 'PHB',
    prerequisite: { spellcasting: true },
    statBonus: null,
    description: 'Выберите стихию (кислота, огонь, холод, молния, гром). Заклинания этого типа игнорируют сопротивление урону. При броске урона единицы на кубиках считаются за двойки.'
  },
  {
    id: 'grappler',
    name: 'Grappler',
    nameRu: 'Мастер захватов',
    source: 'PHB',
    prerequisite: { stat: 'str', min: 13 },
    statBonus: null,
    description: 'Преимущество при атаках по существу, находящемуся в вашем захвате. Возможность накладывать состояние «Опутанный» на захваченного противника.'
  },
  {
    id: 'great_weapon_master',
    name: 'Great Weapon Master',
    nameRu: 'Мастер тяжелого оружия',
    source: 'PHB',
    prerequisite: null,
    statBonus: null,
    description: 'При крите или убийстве тяжелым оружием — бонусная атака в этот же ход. При атаке тяжелым оружием можно пожертвовать -5 к попаданию ради +10 к урону.'
  },
  {
    id: 'healer',
    name: 'Healer',
    nameRu: 'Целитель',
    source: 'PHB',
    prerequisite: null,
    statBonus: null,
    description: 'Вы умело используете набор лекаря. При использовании набора лекаря существо восстанавливает 1d6 + 4 HP плюс количество костей хитов цели. Можно стабилизировать умирающего, давая ему 1 HP.'
  },
  {
    id: 'heavily_armored',
    name: 'Heavily Armored',
    nameRu: 'Тяжелобронированный',
    source: 'PHB',
    prerequisite: { proficiency: 'Medium Armor' },
    statBonus: { stats: ['str'], value: 1 },
    description: '+1 к Силе. Вы получаете владение тяжелыми доспехами.'
  },
  {
    id: 'heavy_armor_master',
    name: 'Heavy Armor Master',
    nameRu: 'Мастер тяжелых доспехов',
    source: 'PHB',
    prerequisite: { proficiency: 'Heavy Armor' },
    statBonus: { stats: ['str'], value: 1 },
    description: '+1 к Силе. Пока вы носите тяжелый доспех, дробящий, колющий и рубящий урон от немагических атак снижается на 3.'
  },
  {
    id: 'inspiring_leader',
    name: 'Inspiring Leader',
    nameRu: 'Вдохновляющий лидер',
    source: 'PHB',
    prerequisite: { stat: 'cha', min: 13 },
    statBonus: null,
    description: 'Вы можете произнести воодушевляющую речь. До 6 союзников получают временные хиты равные вашему уровню + модификатор Харизмы.'
  },
  {
    id: 'keen_mind',
    name: 'Keen Mind',
    nameRu: 'Острый ум',
    source: 'PHB',
    prerequisite: null,
    statBonus: { stats: ['int'], value: 1 },
    description: '+1 к Интеллекту. Вы точно помните всё, что видели или слышали за последний месяц. Всегда знаете, в какой стороне север и сколько осталось до закатов/рассветов.'
  },
  {
    id: 'lightly_armored',
    name: 'Lightly Armored',
    nameRu: 'Легкобронированный',
    source: 'PHB',
    prerequisite: null,
    statBonus: { type: 'choice', stats: ['str', 'dex'], value: 1 },
    description: '+1 к Силе или Ловкости. Вы получаете владение легкими доспехами.'
  },
  {
    id: 'linguist',
    name: 'Linguist',
    nameRu: 'Лингвист',
    source: 'PHB',
    prerequisite: null,
    statBonus: { stats: ['int'], value: 1 },
    description: '+1 к Интеллекту. Вы изучаете 3 языка на выбор. Умеете создавать шифры и коды, которые сложно расшифровать.'
  },
  {
    id: 'lucky',
    name: 'Lucky',
    nameRu: 'Везунчик',
    source: 'PHB',
    prerequisite: null,
    statBonus: null,
    description: 'У вас есть 3 очка удачи. Вы можете использовать их для получения преимущества при броске атаки, проверки или спасброска, либо чтобы заставить врага перебросить атаку по вам.'
  },
  {
    id: 'mage_slayer',
    name: 'Mage Slayer',
    nameRu: 'Убийца магов',
    source: 'PHB',
    prerequisite: null,
    statBonus: null,
    description: 'Враги в радиусе 5 футов провоцируют реакцию атакой, даже если колдуют. Преимущество на спасброски против заклинаний от целей в 5 футах. При попадании по колдующему он получает помеху на концентрацию.'
  },
  {
    id: 'magic_initiate',
    name: 'Magic Initiate',
    nameRu: 'Адепт магии',
    source: 'PHB',
    prerequisite: null,
    statBonus: null,
    description: 'Вы изучаете 2 заговора и одно заклинание 1-го уровня выбранного класса. Заклинание 1-го уровня можно сотворить бесплатно 1 раз за долгий отдых.'
  },
  {
    id: 'martial_adept',
    name: 'Martial Adept',
    nameRu: 'Мастер боевых искусств',
    source: 'PHB',
    prerequisite: null,
    statBonus: null,
    description: 'Вы изучаете 2 маневра боевого воина и получаете 1 кость превосходства (d6) для их использования.'
  },
  {
    id: 'medium_armor_master',
    name: 'Medium Armor Master',
    nameRu: 'Мастер средних доспехов',
    source: 'PHB',
    prerequisite: { proficiency: 'Medium Armor' },
    statBonus: null,
    description: 'Средний доспех не дает помехи на Скрытность. Модификатор Ловкости учитывается до +3 вместо +2.'
  },
  {
    id: 'mobile',
    name: 'Mobile',
    nameRu: 'Подвижный',
    source: 'PHB',
    prerequisite: null,
    statBonus: null,
    description: 'Скорость увеличена на 10 футов. Пересечение сложной местности не замедляет рывок. Если вы совершаете рукопашную атаку по существу, оно не может совершить по вам атаки возможности в этот ход.'
  },
  {
    id: 'moderately_armored',
    name: 'Moderately Armored',
    nameRu: 'Умеренно бронированный',
    source: 'PHB',
    prerequisite: { proficiency: 'Light Armor' },
    statBonus: { type: 'choice', stats: ['str', 'dex'], value: 1 },
    description: '+1 к Силе или Ловкости. Владение средними доспехами и щитами.'
  },
  {
    id: 'mounted_combatant',
    name: 'Mounted Combatant',
    nameRu: 'Всадник',
    source: 'PHB',
    prerequisite: null,
    statBonus: null,
    description: 'Преимущество в атаках по существам пеком меньше вашего коня. Можете перенаправлять атаки, направленные в коня, на себя. Улучшенные спасброски для маунта.'
  },
  {
    id: 'observant',
    name: 'Observant',
    nameRu: 'Наблюдательный',
    source: 'PHB',
    prerequisite: null,
    statBonus: { type: 'choice', stats: ['int', 'wis'], value: 1 },
    description: '+1 к Интеллекту или Мудрости. Пассивная Внимательность и Анализ увеличиваются на +5. Вы умеете читать по губам.'
  },
  {
    id: 'polearm_master',
    name: 'Polearm Master',
    nameRu: 'Мастер древкового оружия',
    source: 'PHB',
    prerequisite: null,
    statBonus: null,
    description: 'Бонусная атака тупым концом алебарды/копья/посоха. Атака реакцией, когда враг только заходит в зону досягаемости вашего оружия.'
  },
  {
    id: 'resilient',
    name: 'Resilient',
    nameRu: 'Закаленный',
    source: 'PHB',
    prerequisite: null,
    statBonus: { type: 'choice', stats: ['str', 'dex', 'con', 'int', 'wis', 'cha'], value: 1 },
    description: '+1 к выбранной характеристике и владение спасбросками по этой же характеристике.'
  },
  {
    id: 'ritual_caster',
    name: 'Ritual Caster',
    nameRu: 'Заклинатель ритуалов',
    source: 'PHB',
    prerequisite: { stat: 'int', min: 13, altStat: 'wis', altMin: 13 },
    statBonus: null,
    description: 'Вы получаете книгу ритуалов и можете творить заклинания с меткой "ритуал" выбранного класса, не подготавливая их.'
  },
  {
    id: 'savage_attacker',
    name: 'Savage Attacker',
    nameRu: 'Зверский атакующий',
    source: 'PHB',
    prerequisite: null,
    statBonus: null,
    description: 'Один раз в ход при броске урона оружия вы можете перебросить кубики урона и выбрать лучший результат.'
  },
  {
    id: 'sentinel',
    name: 'Sentinel',
    nameRu: 'Часовой',
    source: 'PHB',
    prerequisite: null,
    statBonus: null,
    description: 'При попадании атакой возможности скорость цели падает до 0. Атака возможности даже при отходе врага (Disengage). Реакция на атаку врага, бьющего вашего союзника.'
  },
  {
    id: 'sharpshooter',
    name: 'Sharpshooter',
    nameRu: 'Снайпер',
    source: 'PHB',
    prerequisite: null,
    statBonus: null,
    description: 'Дальнобойные атаки не получают помехи на максимальной дистанции. Игнорирует полу- и ¾ укрытия. Можно пожертвовать -5 к попаданию ради +10 к урону дальнобойным оружием.'
  },
  {
    id: 'shield_master',
    name: 'Shield Master',
    nameRu: 'Мастер щитов',
    source: 'PHB',
    prerequisite: null,
    statBonus: null,
    description: 'Бонусное действие толчка щитом после атаки. Добавление бонуса КД щита к спасброскам Ловкости от атак по площади. Избегание урона при успехе спасброска.'
  },
  {
    id: 'skilled',
    name: 'Skilled',
    nameRu: 'Умелец',
    source: 'PHB',
    prerequisite: null,
    statBonus: null,
    description: 'Вы получаете владение любыми тремя навыками или инструментами на ваш выбор. Ремесло: Широкий практический навык: +1 к проверкам крафта.'
  },
  {
    id: 'skulker',
    name: 'Skulker',
    nameRu: 'Шпион',
    source: 'PHB',
    prerequisite: { stat: 'dex', min: 13 },
    statBonus: null,
    description: 'Можно прятаться в легком укрытии. Промах из тени или темноты не раскрывает вашу позицию врагам.'
  },
  {
    id: 'spell_sniper',
    name: 'Spell Sniper',
    nameRu: 'Заклинательный снайпер',
    source: 'PHB',
    prerequisite: { spellcasting: true },
    statBonus: null,
    description: 'Дальность заклинаний с атакой удваивается. Игнорирует укрытия. Знание одного дополнительного атакующего заговора.'
  },
  {
    id: 'tavern_brawler',
    name: 'Tavern Brawler',
    nameRu: 'Тавернный драчун',
    source: 'PHB',
    prerequisite: null,
    statBonus: { type: 'choice', stats: ['str', 'con'], value: 1 },
    description: '+1 к Силе или Телосложению. Владение импровизированным оружием и кулаками (урон 1d4). Возможность совершить захват бонусным действием.'
  },
  {
    id: 'tough',
    name: 'Tough',
    nameRu: 'Крепыш',
    source: 'PHB',
    prerequisite: null,
    statBonus: null,
    description: 'Максимальные хиты увеличиваются на удвоенное значение вашего текущего уровня, и на +2 за каждый новый уровень в дальнейшем.'
  },
  {
    id: 'war_caster',
    name: 'War Caster',
    nameRu: 'Боевой заклинатель',
    source: 'PHB',
    prerequisite: { spellcasting: true },
    statBonus: null,
    description: 'Преимущество на спасброски концентрации. Возможность сотворить заклинание вместо атаки возможности. Можно колдовать с оружием/щитом в руках.'
  },
  {
    id: 'weapon_master',
    name: 'Weapon Master',
    nameRu: 'Мастер оружия',
    source: 'PHB',
    prerequisite: null,
    statBonus: { type: 'choice', stats: ['str', 'dex'], value: 1 },
    description: '+1 к Силе или Ловкости. Вы получаете владение четырьмя видами простого или воинского оружия на выбор.'
  }
];
