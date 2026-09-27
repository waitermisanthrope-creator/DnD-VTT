/**
 * feats_setting.js
 * База данных черт из сеттинговых книг (ERftLW, SotDQ, BPGG, BMT, EEPC).
 */

window.FEATS_SETTING = [
  // Elemental Evil
  {
    id: 'flame_touched',
    name: 'Flame Touched',
    nameRu: 'Огненное касание',
    source: 'EEPC',
    prerequisite: { spellcasting: true },
    statBonus: null,
    description: 'Специализированные стихийные черты для усиления урона заклинаний.'
  },
  // Eberron: Rising from the Last War
  {
    id: 'aberrant_dragonmark',
    name: 'Aberrant Dragonmark',
    nameRu: 'Чужеродная драконья метка',
    source: 'ERftLW',
    prerequisite: null,
    statBonus: { type: 'choice', stats: ['con', 'cha'], value: 1 },
    description: '+1 к выбранной характеристике. Получение заговора и заклинания 1-го круга с возможностью творить их за счет хитов.'
  },
  {
    id: 'greater_dragonmark',
    name: 'Greater Dragonmark',
    nameRu: 'Великая драконья метка',
    source: 'ERftLW',
    prerequisite: { feat: 'Lesser Dragonmark' },
    statBonus: null,
    description: 'Доступ к мощнейшим заклинаниям родовой метки дома Эберрона.'
  },
  {
    id: 'revenant_blade',
    name: 'Revenant Blade',
    nameRu: 'Клинок ревенанта',
    source: 'ERftLW',
    prerequisite: { race: 'Elf' },
    statBonus: { type: 'choice', stats: ['str', 'dex'], value: 1 },
    description: '+1 к Силе или Ловкости. Двукликовый меч становится фехтовальным оружием, +1 к КД при его использовании.'
  },
  // Dragonlance: Shadow of the Dragon Queen
  {
    id: 'squire_of_solamnia',
    name: 'Squire of Solamnia',
    nameRu: 'Соламнийский оруженосец',
    source: 'SotDQ',
    prerequisite: null,
    statBonus: null,
    description: 'Тактические преимущества рыцарей Соламнии. Дополнительные спасброски и защита союзников.'
  },
  {
    id: 'knight_of_the_sword',
    name: 'Knight of the Sword',
    nameRu: 'Рыцарь Меча',
    source: 'SotDQ',
    prerequisite: { feat: 'Squire of Solamnia' },
    statBonus: null,
    description: 'Усиленная стойкость рыцарей Соламнии, защита от страха и внушительный авторитет.'
  },
  {
    id: 'knight_of_the_rose',
    name: 'Knight of the Rose',
    nameRu: 'Рыцарь Розы',
    source: 'SotDQ',
    prerequisite: { feat: 'Squire of Solamnia' },
    statBonus: null,
    description: 'Лидерские качества соламнийского ордена, вдохновение сопартийцев в трудную минуту.'
  },
  {
    id: 'initiate_of_high_sorcery',
    name: 'Initiate of High Sorcery',
    nameRu: 'Адепт Высшего Волшебства',
    source: 'SotDQ',
    prerequisite: null,
    statBonus: null,
    description: 'Посвящение в лунные магии Кринна. Дополнительные заговоры и круговые заклинания в зависимости от выбранной Луны.'
  },
  // Bigby Presents: Glory of the Giants
  {
    id: 'strike_of_the_giants',
    name: 'Strike of the Giants',
    nameRu: 'Удар великанов',
    source: 'BPGG',
    prerequisite: null,
    statBonus: { type: 'choice', stats: ['str', 'dex', 'con'], value: 1 },
    description: '+1 к Силе, Ловкости или Телосложению. Наделяет вашу атаку силой определенного типа великана.'
  },
  // Book of Many Things
  {
    id: 'scion_of_the_outer_planes',
    name: 'Scion of the Outer Planes',
    nameRu: 'Наследник Внешних Планов',
    source: 'BMT',
    prerequisite: null,
    statBonus: { type: 'choice', stats: ['con', 'wis', 'cha'], value: 1 },
    description: '+1 к выбранной характеристике. Сопротивление урону в зависимости от выбранного плана существования.'
  }
];
