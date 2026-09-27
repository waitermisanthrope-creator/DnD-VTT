/**
 * feats_xgte.js
 * База данных черт из Xanathar’s Guide to Everything.
 */

window.FEATS_XGTE = [
  {
    id: 'elven_accuracy',
    name: 'Elven Accuracy',
    nameRu: 'Эльфийская меткость',
    source: 'XGtE',
    prerequisite: { race: 'Elf / Half-Elf' },
    statBonus: { type: 'choice', stats: ['dex', 'int', 'wis', 'cha'], value: 1 },
    description: '+1 к Ловкости, Интеллекту, Мудрости или Харизме. При броске с преимуществом атакующим броском задействуется супер-преимущество (три кубика вместо двух).'
  },
  {
    id: 'infernal_constitution',
    name: 'Infernal Constitution',
    nameRu: 'Адское телосложение',
    source: 'XGtE',
    prerequisite: { race: 'Tiefling' },
    statBonus: { stats: ['con'], value: 1 },
    description: '+1 к Телосложению. Сопротивление урону холодом и ядом, преимущество от отравления.'
  },
  {
    id: 'prodigy',
    name: 'Prodigy',
    nameRu: 'Вундеркинд',
    source: 'XGtE',
    prerequisite: { race: 'Human / Half-Elf / Half-Orc' },
    statBonus: null,
    description: 'Владение навыком, инструментом и знание одного языка. Компетентность в одном из имеющихся навыков. Ремесло: Вундеркинд: +1 к проверкам крафта, отражающий дополнительную инструментальную практику.'
  },
  {
    id: 'bountiful_luck',
    name: 'Bountiful Luck',
    nameRu: 'Обильная удача',
    source: 'XGtE',
    prerequisite: { race: 'Halfling' },
    statBonus: null,
    description: 'Ваша удача распространяется на союзников. Если союзник в 30 футах выбросил единицу (natural 1), вы можете заставить его перебросить кубик.'
  },
  {
    id: 'dragon_fear',
    name: 'Dragon Fear',
    nameRu: 'Драконий страх',
    source: 'XGtE',
    prerequisite: { race: 'Dragonborn' },
    statBonus: { type: 'choice', stats: ['str', 'con', 'cha'], value: 1 },
    description: '+1 к Силе, Телосложению или Харизме. Вместо дыхания вы можете издать устрашающий рев на врагов в радиусе 30 футов.'
  },
  {
    id: 'dragon_hide',
    name: 'Dragon Hide',
    nameRu: 'Драконья шкура',
    source: 'XGtE',
    prerequisite: { race: 'Dragonborn' },
    statBonus: { type: 'choice', stats: ['str', 'con', 'cha'], value: 1 },
    description: '+1 к Силе, Телосложению или Харизме. Естественный КД = 13 + Ловкость. Выростают выдвижные когти (1d4 рубящий урон).'
  },
  {
    id: 'dwarven_fortitude',
    name: 'Dwarven Fortitude',
    nameRu: 'Дворфийская стойкость',
    source: 'XGtE',
    prerequisite: { race: 'Dwarf' },
    statBonus: { stats: ['con'], value: 1 },
    description: '+1 к Телосложению. Когда вы совершаете действие "Уклонение" (Dodge), вы можете потратить кость хитов, чтобы исцелиться.'
  },
  {
    id: 'flames_of_phlegethos',
    name: 'Flames of Phlegethos',
    nameRu: 'Пламя Флегетоса',
    source: 'XGtE',
    prerequisite: { race: 'Tiefling' },
    statBonus: { type: 'choice', stats: ['int', 'cha'], value: 1 },
    description: '+1 к Интеллекту или Харизме. Переброс единиц на уроне огнем. Воспламенение вокруг вас при использовании огненных заклинаний.'
  },
  {
    id: 'orcish_aggression',
    name: 'Orcish Aggression',
    nameRu: 'Орочья агрессия',
    source: 'XGtE',
    prerequisite: { race: 'Half-Orc' },
    statBonus: { stats: ['str'], value: 1 },
    description: '+1 к Силе. Бонусным действием вы можете приблизиться к врагу.'
  },
  {
    id: 'orcish_fury',
    name: 'Orcish Fury',
    nameRu: 'Орочья ярость',
    source: 'XGtE',
    prerequisite: { race: 'Half-Orc' },
    statBonus: { type: 'choice', stats: ['str', 'con'], value: 1 },
    description: '+1 к Силе или Телосложению. Дополнительный кубик урона при атаке оружием раз за отдых. Дополнительный спасбросок при срабатывании Неукротимой стойкости.'
  },
  {
    id: 'squat_nimbleness',
    name: 'Squat Nimbleness',
    nameRu: 'Приземистая ловкость',
    source: 'XGtE',
    prerequisite: { race: 'Dwarf / Small Race' },
    statBonus: { type: 'choice', stats: ['str', 'dex'], value: 1 },
    description: '+1 к Силе или Ловкости. Скорость +5 футов. Владение акробатикой или атлетикой. Преимущество при выходе из захвата.'
  },
  {
    id: 'wood_elf_magic',
    name: 'Wood Elf Magic',
    nameRu: 'Магия лесных эльфов',
    source: 'XGtE',
    prerequisite: { race: 'Wood Elf' },
    statBonus: null,
    description: 'Изучение друидского заговора и заклинаний 1-го и 2-го уровня (Длинный шаг, Маскировка под растительность) раз за долгий отдых.'
  },
  {
    id: 'second_chance',
    name: 'Second Chance',
    nameRu: 'Второй шанс',
    source: 'XGtE',
    prerequisite: { race: 'Halfling' },
    statBonus: { type: 'choice', stats: ['dex', 'con', 'cha'], value: 1 },
    description: '+1 к Ловкости, Телосложению или Харизме. Реакцией вы заставляете врага перебросить успешную по вам атаку.'
  },
  {
    id: 'fey_teleportation',
    name: 'Fey Teleportation',
    nameRu: 'Фейская телепортация',
    source: 'XGtE',
    prerequisite: { race: 'Elf' },
    statBonus: { type: 'choice', stats: ['int', 'cha'], value: 1 },
    description: '+1 к Интеллекту или Харизме. Знание эльфийского и разговор на Сильване. Заклинание «Туманный шаг» (Misty Step) бесплатно раз за короткий отдых.'
  }
];
