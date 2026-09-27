/**
 * feats_tcoe.js
 * База данных черт из Tasha’s Cauldron of Everything.
 */

window.FEATS_TCOE = [
  {
    id: 'chef',
    name: 'Chef',
    nameRu: 'Шеф-повар',
    source: 'TCoE',
    prerequisite: null,
    statBonus: { type: 'choice', stats: ['con', 'wis'], value: 1 },
    description: '+1 к Телосложению или Мудрости. Владение кухонной утварью. Во время короткого отдыха улучшенное восстановление союзников (дополнительные хиты). Ремесло: Шеф-повар: +1 к крафту пищи и пайков.'
  },
  {
    id: 'eldritch_adept',
    name: 'Eldritch Adept',
    nameRu: 'Мистический адепт',
    source: 'TCoE',
    prerequisite: { spellcasting: true },
    statBonus: null,
    description: 'Вы выбираете одно воззвание колдуна (Eldritch Invocation), требование по уровню которого можете выполнить.'
  },
  {
    id: 'fey_touched',
    name: 'Fey Touched',
    nameRu: 'Меченый феями',
    source: 'TCoE',
    prerequisite: null,
    statBonus: { type: 'choice', stats: ['int', 'wis', 'cha'], value: 1 },
    description: '+1 к Интеллекту, Мудрости или Харизме. Заклинания «Туманный шаг» (Misty Step) и одно заклинание школы Иллюзии или Очарования 1-го уровня бесплатно раз за долгий отдых.'
  },
  {
    id: 'shadow_touched',
    name: 'Shadow Touched',
    nameRu: 'Меченый тенью',
    source: 'TCoE',
    prerequisite: null,
    statBonus: { type: 'choice', stats: ['int', 'wis', 'cha'], value: 1 },
    description: '+1 к Интеллекту, Мудрости или Харизме. Заклинание «Невидимость» и заклинание школы Некромантии или Иллюзии 1-го уровня бесплатно раз за отдых.'
  },
  {
    id: 'fighting_initiate',
    name: 'Fighting Initiate',
    nameRu: 'Адепт боевого стиля',
    source: 'TCoE',
    prerequisite: { proficiency: 'Martial Weapon' },
    statBonus: null,
    description: 'Вы получаете один стиль боевого искусства на выбор из доступных воину.'
  },
  {
    id: 'metamagic_adept',
    name: 'Metamagic Adept',
    nameRu: 'Адепт метамагии',
    source: 'TCoE',
    prerequisite: { spellcasting: true },
    statBonus: null,
    description: 'Вы получаете 2 очка чародейства (Sorcery Points) и изучаете 2 варианта метамагии.'
  },
  {
    id: 'gunner',
    name: 'Gunner',
    nameRu: 'Стрелок',
    source: 'TCoE',
    prerequisite: null,
    statBonus: { stats: ['dex'], value: 1 },
    description: '+1 к Ловкости. Владение огнестрельным оружием. Стрельба из огнестрельного оружия вплотную к противнику не вызывает помех.'
  },
  {
    id: 'piercer',
    name: 'Piercer',
    nameRu: 'Пронзатель',
    source: 'TCoE',
    prerequisite: null,
    statBonus: { type: 'choice', stats: ['str', 'dex'], value: 1 },
    description: '+1 к Силе или Ловкости. Переброс одного кубика урона колющего оружия за ход. Дополнительный кубик урона при критическом попадании.'
  },
  {
    id: 'poisoner',
    name: 'Poisoner',
    nameRu: 'Отравитель',
    source: 'TCoE',
    prerequisite: null,
    statBonus: null,
    description: 'Игнорирование сопротивления ядам у целей. Создание смертельных ядов бонусным действием. Дополнительный ядовитый урон оружию. Ремесло: Отравитель: +1 к алхимическому изготовлению ядов и токсичных реагентов.'
  },
  {
    id: 'skill_expert',
    name: 'Skill Expert',
    nameRu: 'Эксперт навыков',
    source: 'TCoE',
    prerequisite: null,
    statBonus: { type: 'choice', stats: ['str', 'dex', 'con', 'int', 'wis', 'cha'], value: 1 },
    description: '+1 к выбранной характеристике. Владение одним новым навыком и «Компетентность» (удвоенный бонус мастерства) в одном из навыков, которыми вы владеете.'
  },
  {
    id: 'telekinetic',
    name: 'Telekinetic',
    nameRu: 'Телекинетик',
    source: 'TCoE',
    prerequisite: null,
    statBonus: { type: 'choice', stats: ['int', 'wis', 'cha'], value: 1 },
    description: '+1 к Интеллекту, Мудрости или Харизме. Вы изучаете заговор «Волшебная рука». Бонусным действием вы можете толкнуть существо силой мысли в радиусе 30 футов.'
  },
  {
    id: 'telepathic',
    name: 'Telepathic',
    nameRu: 'Телепат',
    source: 'TCoE',
    prerequisite: null,
    statBonus: { type: 'choice', stats: ['int', 'wis', 'cha'], value: 1 },
    description: '+1 к Интеллекту, Мудрости или Харизме. Телепатическая связь с любым существом на расстоянии до 60 футов. Заклинание «Обнаружение мыслей» без ячеек раз в день.'
  }
];
