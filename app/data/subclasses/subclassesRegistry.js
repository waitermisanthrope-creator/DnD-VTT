/**
 * subclasses/subclassesRegistry.js
 * ------------------------------------------------------------------
 * ЧТО ЭТО ЗА ФАЙЛ:
 * Единый реестр подклассов (архетипов/доменов/школ/традиций и т.д.) для
 * всех 13 классов D&D 5e, используемых в проекте. Раньше папка
 * /subclasses существовала, но была пустой — подклассов в приложении
 * не было вообще, хотя классы (classes/*.js) уже помечали нужные уровни
 * флагом `subclassLevel: true`, а объект персонажа (hero.classes[i])
 * уже имел поле `subclass`, которое никто никогда не заполнял.
 *
 * КАК ЭТО РАБОТАЕТ:
 * 1. window.SUBCLASSES_REFERENCE — главный объект вида:
 *      {
 *        "Воин": {
 *          "Мастер боя": {
 *            source: "PHB",
 *            description: "Короткое текстовое описание архетипа",
 *            pickLevel: 3,               // на каком уровне класса выбирается
 *            levels: {
 *              3:  { features: ["..."] },
 *              7:  { features: ["..."] },
 *              ...
 *            }
 *          },
 *          "Мистический рыцарь": { ... }
 *        },
 *        "Плут": { ... },
 *        ...
 *      }
 *    Ключи верхнего уровня — русские названия классов, ТОЧНО такие же,
 *    как в window.CLASSES_REFERENCE (classesRegistry.js), чтобы поиск
 *    работал без доп. нормализации.
 *
 * 2. window.getAvailableSubclasses(className) — возвращает массив
 *    [{ key, name, source, description, pickLevel }] для выпадающего
 *    списка в UI (используется в classes/level_up.js и character_creation.js).
 *
 * 3. window.getSubclassData(className, subclassName) — возвращает объект
 *    одного подкласса (с полем .levels) или null, если не найден.
 *
 * 4. window.getSubclassFeaturesForLevel(className, subclassName, level) —
 *    удобный шорткат, возвращает массив строк-способностей подкласса на
 *    конкретном уровне класса (или пустой массив).
 *
 * ГДЕ ИСПОЛЬЗУЕТСЯ (переменные/функции, которые читают этот файл):
 * - classes/progressionEngine.js  -> applySubclassProgression(...)
 * - classes/level_up.js           -> UI выбора подкласса при повышении уровня
 * - character_creation.js         -> выбор подкласса, если он даётся на 1 уровне
 *   (Жрец, Чародей, Колдун)
 *
 * ВАЖНО: как и многие черты (feats) в этом проекте, большинство способностей
 * подклассов здесь — это ТЕКСТОВОЕ описание (просто попадает в hero.features
 * для отображения на листе персонажа), без автоматических числовых баффов.
 * Это сознательное решение ради простоты и надёжности: пользователь сам
 * учитывает эффект способности в бою, движок только напоминает, что она есть.
 * ------------------------------------------------------------------
 */

window.SUBCLASSES_REFERENCE = {
  "Кровавый охотник": {
    "Орден призрачных убийц": {source:"Third-party",description:"Охотники на нежить и некромантов.",pickLevel:3,levels:{3:{features:["Rite of the Dawn","Curse of the Marked"]},6:{features:["Blood Curse of the Exorcist"]},7:{features:["Ethereal Step"]},11:{features:["Grim Psychometry"]},15:{features:["Brand of Tethering"]},18:{features:["Rite Revival"]}}},
    "Орден ликантропов": {source:"Third-party",description:"Кровавые охотники, контролирующие проклятие ликантропии.",pickLevel:3,levels:{3:{features:["Hybrid Transformation"]},7:{features:["Stalker’s Prowess"]},11:{features:["Advanced Transformation"]},15:{features:["Feral Might"]},18:{features:["Hybrid Transformation Mastery"]}}},
    "Орден мутантов": {source:"Third-party",description:"Гемокрафт и алхимические мутагены.",pickLevel:3,levels:{3:{features:["Mutagencraft"]},7:{features:["Strange Metabolism"]},11:{features:["Alchemical Mastery"]},15:{features:["Blood Curse Mastery"]},18:{features:["Exalted Mutation"]}}},
    "Орден осквернённых душ": {source:"Third-party",description:"Кровавые охотники, заключившие договор с потусторонней силой.",pickLevel:3,levels:{3:{features:["Pact Magic","Otherworldly Patron"]},7:{features:["Mystic Frenzy"]},11:{features:["Unsealed Arcana"]},15:{features:["Revealed Arcana"]},18:{features:["Brand of Castigation Mastery"]}}},
  },

  "Воин": {
    "Мастер боя": {
      source: "PHB",
      description: "Простой и эффективный архетип, сфокусированный на чистом боевом мастерстве.",
      pickLevel: 3,
      levels: {
        3: { features: ["Улучшенная критическая атака (крит. попадание на 19-20)"] },
        7: { features: ["Выдающийся атлет (доп. бонус к неосвоенным проверкам, длинные прыжки)"] },
        10: { features: ["Дополнительный боевой стиль"] },
        15: { features: ["Превосходная критическая атака (крит. попадание на 18-20)"] },
        18: { features: ["Обзор выживания (доп. хиты при коротком отдыхе 1/день)"] }
      }
    },
    "Мистический рыцарь": {
      source: "PHB",
      description: "Воин, изучающий магию школ Ограждения и Воплощения и вплетающий её в бой.",
      pickLevel: 3,
      levels: {
        3: { features: ["Использование заклинаний (Ограждение/Воплощение)", "Связанное оружие"] },
        7: { features: ["Военная магия (доп. заговор + атака бонусным действием)"] },
        10: { features: ["Улучшенная военная магия"] },
        15: { features: ["Арканический заряд (телепорт при всплеске действия)"] },
        18: { features: ["Улучшенная военная магия (двойное заклинание)"] }
      }
    }
  },

  "Плут": {
    "Вор": {
      source: "PHB",
      description: "Мастер ловкости рук, взлома и использования любых обстоятельств себе на пользу.",
      pickLevel: 3,
      levels: {
        3: { features: ["Быстрые руки", "Верхолаз и скалолаз (Second-Story Work)"] },
        9: { features: ["Непревзойдённая скрытность (Supreme Sneak)"] },
        13: { features: ["Использование магических предметов без ограничений класса"] },
        17: { features: ["Воровская реакция (второе действие после короткого отдыха, 1/бой)"] }
      }
    },
    "Убийца": {
      source: "PHB",
      description: "Специалист по маскировке, ядам и стремительным смертоносным ударам из засады.",
      pickLevel: 3,
      levels: {
        3: { features: ["Бонусное владение набором для маскировки и набором отравителя", "Убийство из засады (преимущество по ещё не ходившим целям; попадание по застигнутой врасплох цели — критическое)"] },
        9: { features: ["Мастер проникновения (создание и поддержание ложной личности)"] },
        13: { features: ["Самозванец (безошибочная имитация изученного человека)"] },
        17: { features: ["Смертельный удар (при попадании по застигнутой врасплох цели — спасбросок Телосложения; при провале урон атаки удваивается)"] }
      }
    }
  },

  "Волшебник": {
    "Школа Воплощения": {
      source: "PHB",
      description: "Специализация на разрушительной боевой магии стихий и энергии.",
      pickLevel: 2,
      levels: {
        2: { features: ["Ваяние заклинаний (союзники автоматически проходят зону эффекта)"] },
        6: { features: ["Мощный заговор (доп. урон заговорами)"] },
        10: { features: ["Усиленное воплощение (+INT к урону заклинаний воплощения)"] },
        14: { features: ["Спонтанное перенапряжение магии (Overchannel)"] }
      }
    },
    "Школа Ограждения": {
      source: "PHB",
      description: "Специализация на защитных барьерах и контр-магии.",
      pickLevel: 2,
      levels: {
        2: { features: ["Магический оберег (щит из временных хитов)"] },
        6: { features: ["Проецируемый оберег (перенос щита на союзника)"] },
        10: { features: ["Улучшенное ограждение (оберег дешевле восстанавливать)"] },
        14: { features: ["Магическое сопротивление (преим. на спасброски от заклинаний)"] }
      }
    }
  },

  "Друид": {
    "Круг Земли": {
      source: "PHB",
      description: "Друиды-хранители древних знаний, связанные с определённым типом местности.",
      pickLevel: 2,
      levels: {
        2: { features: ["Заклинания круга (по ландшафту)", "Природное восстановление (доп. ячейки)"] },
        6: { features: ["Стихийная поступь (Land's Stride, игнор труднопроходимой местности)"] },
        10: { features: ["Природный отшельник (сопротивление заклинаниям в дикой местности)"] },
        14: { features: ["Природное святилище (существа природы неохотно атакуют)"] }
      }
    },
    "Круг Луны": {
      source: "PHB",
      description: "Друиды-стражи, мастерски использующие Дикий облик в бою.",
      pickLevel: 2,
      levels: {
        2: { features: ["Боевой дикий облик (превращение бонусным действием, больше CR)"] },
        6: { features: ["Изначальный удар (атаки в облике животного как магические)"] },
        10: { features: ["Стихийный дикий облик (превращение в элементаля)"] },
        14: { features: ["Тысяча форм (Thousand Forms, эффект как у Alter Self)"] }
      }
    }
  },

  "Бард": {
    "Коллегия знаний": {
      source: "PHB",
      description: "Барды-эрудиты, собирающие знания и обращающие слова против врагов.",
      pickLevel: 3,
      levels: {
        3: { features: ["Дополнительные владения навыками (3)", "Едкое слово (Cutting Words)"] },
        6: { features: ["Дополнительные магические тайны (заклинания любого класса)"] },
        14: { features: ["Непревзойдённое мастерство (авто-успех проверки навыка 1/отдых)"] }
      }
    },
    "Коллегия доблести": {
      source: "PHB",
      description: "Барды-воины, вдохновляющие соратников прямо в гуще битвы.",
      pickLevel: 3,
      levels: {
        3: { features: ["Боевое вдохновение", "Владение средними доспехами, щитами и воинским оружием"] },
        6: { features: ["Дополнительная атака"] },
        14: { features: ["Боевая магия (атака бонусным действием после заклинания)"] }
      }
    }
  },

  "Жрец": {
    "Домен Жизни": {
      source: "PHB",
      description: "Жрецы величайших целителей, повелевающие позитивной энергией.",
      pickLevel: 1,
      levels: {
        1: { features: ["Заклинания домена жизни", "Владение тяжёлыми доспехами"] },
        2: { features: ["Последователь жизни (доп. исцеление к лечащим заклинаниям)"] },
        6: { features: ["Благословенный целитель (самолечение при лечении других)"] },
        8: { features: ["Божественный удар (+1к8 урона излучением раз в ход)"] },
        17: { features: ["Высшее исцеление (лечащие заклинания лечат по максимуму)"] }
      }
    },
    "Домен Войны": {
      source: "PHB",
      description: "Жрецы-воители, черпающие боевую доблесть от своего божества.",
      pickLevel: 1,
      levels: {
        1: { features: ["Заклинания домена войны", "Владение тяжёлыми доспехами и воинским оружием"] },
        2: { features: ["Воинствующий жрец (доп. атака бонусным действием)"] },
        6: { features: ["Направленный удар (Guided Strike, +10 к атаке, 3/отдых)"] },
        8: { features: ["Божественный удар (+1к8 урона оружием раз в ход)"] },
        17: { features: ["Аватар битвы (сопротивление немагическому оружейному урону)"] }
      }
    }
  },

  "Монах": {
    "Путь открытой длани": {
      source: "PHB",
      description: "Мастера рукопашного боя, использующие Ки для контроля над противником.",
      pickLevel: 3,
      levels: {
        3: { features: ["Техника открытой длани (доп. эффект Шквала ударов)"] },
        6: { features: ["Прикосновение покоя (лечение очками Ки)"] },
        11: { features: ["Совершенство безмятежности (сопротивление урону между ходами)"] },
        17: { features: ["Дрожащая ладонь (отложенный смертельный удар)"] }
      }
    },
    "Путь тени": {
      source: "PHB",
      description: "Монахи-лазутчики, использующие искусство теней и иллюзий.",
      pickLevel: 3,
      levels: {
        3: { features: ["Искусство тени (заклинания за очки Ки: тьма, невидимость и др.)"] },
        6: { features: ["Шаг сквозь тень (телепорт между тенями)"] },
        11: { features: ["Плащ теней (невидимость в тусклом свете/тьме)"] },
        17: { features: ["Использование возможности (атака бонусным действием по цели без хитов)"] }
      }
    }
  },

  "Паладин": {
    "Клятва преданности": {
      source: "PHB",
      description: "Классический рыцарь-паладин, воплощающий идеалы чести и защиты слабых.",
      pickLevel: 3,
      levels: {
        3: { features: ["Заклинания клятвы преданности", "Аура преданности (иммунитет к очарованию рядом)"] },
        7: { features: ["Аура защиты (улучшение)"] },
        15: { features: ["Чистота духа (постоянный эффект Protection from Evil and Good)"] },
        20: { features: ["Святое воплощение (крылья, полёт, аура урона излучением)"] }
      }
    },
    "Клятва мести": {
      source: "PHB",
      description: "Паладин, поклявшийся покарать величайшее зло любой ценой.",
      pickLevel: 3,
      levels: {
        3: { features: ["Заклинания клятвы мести", "Клятва вражды (преим. по атакам к одной цели)"] },
        7: { features: ["Неумолимый мститель (доп. движение при провале атаки по клятве)"] },
        15: { features: ["Душа мстителя (сопротивление урону от нежити/исчадий вне клятвы)"] },
        20: { features: ["Ангел кары (крылья, полёт, испуг врагов рядом)"] }
      }
    }
  },

  "Следопыт": {
    "Охотник": {
      source: "PHB",
      description: "Следопыт, специализирующийся на выслеживании и уничтожении конкретных типов угроз.",
      pickLevel: 3,
      levels: {
        3: { features: ["Охотничья добыча (выбор тактики против групп/крупных/одиночных целей)"] },
        7: { features: ["Защитная тактика (доп. реакция против атак стаи и т.п.)"] },
        11: { features: ["Множественная охотничья атака (доп. атаки по прилегающим целям)"] },
        15: { features: ["Превосходная охотничья защита (доп. защитная реакция)"] }
      }
    },
    "Повелитель зверей": {
      source: "PHB",
      description: "Следопыт, сражающийся плечом к плечу со своим звериным спутником.",
      pickLevel: 3,
      levels: {
        3: { features: ["Звериный компаньон (получает животное-спутника)"] },
        7: { features: ["Совершенная выучка (компаньон получает доп. командную способность)"] },
        11: { features: ["Совместная ярость (компаньон атакует при вашей Доп. атаке)"] },
        15: { features: ["Общие заклинания (компаньон получает эффект ваших заклинаний с целью «себя»)"] }
      }
    }
  },

  "Чародей": {
    "Драконье происхождение": {
      source: "PHB",
      description: "Чародей, чья магия проистекает из крови древних драконов.",
      pickLevel: 1,
      levels: {
        1: { features: ["Драконье наследие (стихия дракона-предка)", "Драконья устойчивость (+1 КД без доспехов)"] },
        6: { features: ["Стихийное сродство (доп. урон стихией + сопротивление ей)"] },
        14: { features: ["Крылья дракона (полёт скоростью передвижения)"] },
        18: { features: ["Драконье присутствие (аура страха/благоговения)"] }
      }
    },
    "Дикая магия": {
      source: "PHB",
      description: "Магия чародея нестабильна и непредсказуема — сила, живущая своей жизнью.",
      pickLevel: 1,
      levels: {
        1: { features: ["Всплеск дикой магии (случайный эффект таблицы)", "Волны хаоса (переброс д20 1/отдых)"] },
        6: { features: ["Гнущаяся удача (изменение результата броска очками истока)"] },
        14: { features: ["Контролируемый хаос (2 варианта на выбор при всплеске)"] },
        18: { features: ["Магический обстрел (доп. урон при провале спасброска от заклинания)"] }
      }
    }
  },

  "Колдун": {
    "Архифея": {
      source: "PHB",
      description: "Покровитель колдуна — могущественный обитатель Страны Фей.",
      pickLevel: 1,
      levels: {
        1: { features: ["Пленяющее присутствие фей (страх/очарование вспышкой, 1/отдых)"] },
        6: { features: ["Туманный побег (телепорт+невидимость в ответ на урон)"] },
        10: { features: ["Обманчивая защита (доп. преим. на спасброски от очарования/страха рядом)"] },
        14: { features: ["Тёмное безумие (страх+урон психической энергией по контакту разума)"] }
      }
    },
    "Исчадие": {
      source: "PHB",
      description: "Покровитель колдуна — могущественная сущность Нижних планов.",
      pickLevel: 1,
      levels: {
        1: { features: ["Тёмное благословение (врем. хиты за убийство врага)"] },
        6: { features: ["Удача Исчадия (переброс д20 очками истока, 1/отдых)"] },
        10: { features: ["Инфернальная живучесть (шанс встать с 1 хп при провале спасброска смерти)"] },
        14: { features: ["Низвержение в Ад (телепорт цели в Нижние планы на ход)"] }
      }
    }
  },

  "Варвар": {
    "Путь неистового берсерка": {
      source: "PHB",
      description: "Варвар, чья ярость граничит с безумием на поле боя.",
      pickLevel: 3,
      levels: {
        3: { features: ["Исступление (доп. атака бонусным действием во время Ярости, истощение после)"] },
        6: { features: ["Неистовая стойкость (не падает без сознания на 0 хп во время Ярости)"] },
        10: { features: ["Пугающее присутствие (испуг рядом стоящих)"] },
        14: { features: ["Неистовое возмездие (реакция ударом на попадание по варвару)"] }
      }
    },
    "Путь тотемного воина": {
      source: "PHB",
      description: "Варвар, черпающий духовную силу тотемного животного.",
      pickLevel: 3,
      levels: {
        3: { features: ["Дух-тотем (Медведь / Орёл / Волк — выбор эффекта Ярости)"] },
        6: { features: ["Аспект зверя (постоянная способность тотемного животного)"] },
        10: { features: ["Обряд духов (ритуальное общение с духами)"] },
        14: { features: ["Тотемное единение (мощная итоговая способность выбранного духа)"] }
      }
    }
  },

  "Изобретатель": {
    "Алхимик": {
      source: "TCoE",
      description: "Изобретатель-мастер зелий, реагентов и полевой алхимии.",
      pickLevel: 3,
      levels: {
        3: { features: ["Алхимические заклинания", "Экспериментальный элексир (случайный бонусный эффект)"] },
        5: { features: ["Алхимический эксперт (доп. эффект элексира + бонус к лечению/урону)"] },
        9: { features: ["Восстанавливающие реагенты (доп. лечение хитов и состояний)"] },
        15: { features: ["Химическое мастерство (иммунитет к яду/болезни, доп. элексиры)"] }
      }
    },
    "Артиллерист": {
      source: "TCoE",
      description: "Изобретатель, создающий магические орудия поддержки на поле боя.",
      pickLevel: 3,
      levels: {
        3: { features: ["Заклинания артиллериста", "Мистическая пушка (Eldritch Cannon — призываемое орудие)"] },
        5: { features: ["Арканическое огнестрельное оружие (доп. урон заклинаниям через оружие)"] },
        9: { features: ["Взрывное орудие (доп. режим урона по области у пушки)"] },
        15: { features: ["Укреплённая позиция (пушки дают укрытие и бонус КД союзникам)"] }
      }
    }
  }
};

/* Алхимик — независимые краткие описания для VTT, без копирования текста исходного продукта. */
window.SUBCLASSES_REFERENCE["Алхимик"] = {
  "Аморист": {source:"Mage Hand Press",description:"Алхимик, специализирующийся на любовных зельях и воздействии на эмоции.",pickLevel:3,levels:{3:{features:["Алхимическая романтика"]},6:{features:["Зелья воздействия"]},10:{features:["Алхимический парфюм"]},14:{features:["Мастерство амориста"]}}},
  "Аптекарь": {source:"Mage Hand Press",description:"Алхимический целитель и специалист по восстановлению.",pickLevel:3,levels:{3:{features:["Бомба обезболивания"]},6:{features:["Концентрированное лечение"]},10:{features:["Алхимическое воскрешение"]},14:{features:["Чудо-сыворотка"]}}},
  "Инженер-динамо": {source:"Mage Hand Press",description:"Алхимик, использующий устройства-динамо для доступа к магическим эффектам.",pickLevel:3,levels:{3:{features:["Динамо-инженерия"]},6:{features:["Улучшенное динамо"]},10:{features:["Стабилизатор динамо"]},14:{features:["Мастер динамо"]}}},
  "Ионизатор": {source:"Mage Hand Press",description:"Алхимик, исследующий высокоэнергетические бластерные технологии.",pickLevel:3,levels:{3:{features:["Ионизирующее оружие"]},6:{features:["Ионизационная камера"]},10:{features:["Реактивный разряд"]},14:{features:["Пульс реагента"]}}},
  "Безумный бомбардир": {source:"Mage Hand Press",description:"Специалист по разрушительным и нестандартным бомбам.",pickLevel:3,levels:{3:{features:["Формула безумного бомбардира"]},6:{features:["Усиленная взрывчатка"]},10:{features:["Лазарев заряд"]},14:{features:["Увеличенный взрыв"]}}},
  "Мутагенист": {source:"Mage Hand Press",description:"Алхимик, изменяющий собственное тело экспериментальными мутагенами.",pickLevel:3,levels:{3:{features:["Мутаген"]},6:{features:["Самолечение"]},10:{features:["Продвинутые мутагены"]},14:{features:["Мутировавшая кровь"]}}},
  "Разводчик слизней": {source:"Mage Hand Press",description:"Алхимик, выращивающий и использующий живых слизней.",pickLevel:3,levels:{3:{features:["Устойчивость к слизи","Слизистая бомба"]},6:{features:["Слизни в бутылках"]},10:{features:["Жертвенная слизь"]},14:{features:["Элементальные слизни"]}}},
  "Пигментист": {source:"Mage Hand Press",description:"Алхимик, использующий магические краски для поддержки и ослабления врагов.",pickLevel:3,levels:{3:{features:["Художник","Бомбы с краской"]},6:{features:["Порталы краски"]},10:{features:["Пигментные зелья"]},14:{features:["Разноцветный взрыв"]}}},
  "Резонатор": {source:"Mage Hand Press",description:"Алхимик, формирующий поле боя звуковыми волнами.",pickLevel:3,levels:{3:{features:["Резонансная бомба"]},6:{features:["Усиленный резонанс"]},10:{features:["Акустическое поле"]},14:{features:["Мастер резонанса"]}}},
  "Веномсмит": {source:"Mage Hand Press",description:"Специалист по ядам, токсинам и алхимическим убийственным составам.",pickLevel:3,levels:{3:{features:["Отравитель","Бомбы со смехотворным газом"]},6:{features:["Алхимический убийца"]},10:{features:["Митридатизм"]},14:{features:["Ядовитое возмездие"]}}},
  "Ксеноалхимик": {source:"Mage Hand Press",description:"Алхимик, исследующий свойства чудовищ и создающий монструозные модификации.",pickLevel:3,levels:{3:{features:["Ксеноалхимические трансплантаты"]},6:{features:["Монструозный привой"]},10:{features:["Улучшенная адаптация"]},14:{features:["Совершенная мутация"]}}}
};




/* Иллирригер — каркас пяти контрактов. Подробные боевые/магические механики добавятся позже. */
window.SUBCLASSES_REFERENCE["Иллирригер"] = {
  "Architect of Ruin": {source:"MCDM / third-party",description:"Арканический контракт: оружие, инфернальная сила, иллюзии и контроль поля боя.",pickLevel:3,levels:{3:{features:["Заготовка: контракт Architect of Ruin","Заготовка: Invoke Hell"]},7:{features:["Заготовка: способность контракта"]},11:{features:["Заготовка: способность контракта"]},15:{features:["Заготовка: способность контракта"]}}},
  "Hellspeaker": {source:"MCDM / third-party",description:"Контракт манипулятора: давление на разум, переговоры, принуждение и управление противниками.",pickLevel:3,levels:{3:{features:["Заготовка: контракт Hellspeaker","Заготовка: Invoke Hell"]},7:{features:["Заготовка: способность контракта"]},11:{features:["Заготовка: способность контракта"]},15:{features:["Заготовка: способность контракта"]}}},
  "Painkiller": {source:"MCDM / third-party",description:"Тяжёлый фронтовой контракт: броня, удержание линии и командование боем.",pickLevel:3,levels:{3:{features:["Заготовка: контракт Painkiller","Заготовка: Invoke Hell"]},7:{features:["Заготовка: способность контракта"]},11:{features:["Заготовка: способность контракта"]},15:{features:["Заготовка: способность контракта"]}}},
  "Sanguine Knight": {source:"MCDM / third-party",description:"Кровавый контракт: истощение противников, преобразование жизненной силы и ритуальная сила.",pickLevel:3,levels:{3:{features:["Заготовка: контракт Sanguine Knight","Заготовка: Invoke Hell"]},7:{features:["Заготовка: способность контракта"]},11:{features:["Заготовка: способность контракта"]},15:{features:["Заготовка: способность контракта"]}}},
  "Shadowmaster": {source:"MCDM / third-party",description:"Скрытный контракт: тени, проникновение, маскировка и точечные атаки.",pickLevel:3,levels:{3:{features:["Заготовка: контракт Shadowmaster","Заготовка: Invoke Hell"]},7:{features:["Заготовка: способность контракта"]},11:{features:["Заготовка: способность контракта"]},15:{features:["Заготовка: способность контракта"]}}}
};



/* Пугилист — каркас семи Fight Clubs. Подробные механики добавятся позже. */
window.SUBCLASSES_REFERENCE["Пугилист"] = {
  "Arena Royale": {source:"Benjamin Huffman / third-party",description:"Гладиатор и шоумен: выступление, репутация и зрелищный стиль боя.",pickLevel:3,levels:{3:{features:["Заготовка: Fight Club feature"]},6:{features:["Заготовка: Fight Club feature"]},11:{features:["Заготовка: Fight Club feature"]},17:{features:["Заготовка: Fight Club feature"]}}},
  "Bloodhound Bruisers": {source:"Benjamin Huffman / third-party",description:"Городской защитник и следопыт, специализирующийся на наблюдательности и расследовании.",pickLevel:3,levels:{3:{features:["Заготовка: Fight Club feature"]},6:{features:["Заготовка: Fight Club feature"]},11:{features:["Заготовка: Fight Club feature"]},17:{features:["Заготовка: Fight Club feature"]}}},
  "Dog & Hound": {source:"Benjamin Huffman / third-party",description:"Боец со специально обученным псом-компаньоном и тактикой совместного нападения.",pickLevel:3,levels:{3:{features:["Заготовка: Fight Club feature","Заготовка: собачий компаньон"]},6:{features:["Заготовка: Fight Club feature"]},11:{features:["Заготовка: Fight Club feature"]},17:{features:["Заготовка: Fight Club feature"]}}},
  "Hand of Dread": {source:"Benjamin Huffman / third-party",description:"Мрачный сверхъестественный путь, открывающий доступ к иномировой силе.",pickLevel:3,levels:{3:{features:["Заготовка: Fight Club feature","Заготовка: сверхъестественная магия"]},6:{features:["Заготовка: Fight Club feature"]},11:{features:["Заготовка: Fight Club feature"]},17:{features:["Заготовка: Fight Club feature"]}}},
  "Piss & Vinegar": {source:"Benjamin Huffman / third-party",description:"Грязный уличный боец: провокации, обманные приёмы и давление на противника.",pickLevel:3,levels:{3:{features:["Заготовка: Fight Club feature"]},6:{features:["Заготовка: Fight Club feature"]},11:{features:["Заготовка: Fight Club feature"]},17:{features:["Заготовка: Fight Club feature"]}}},
  "The Squared Circle": {source:"Benjamin Huffman / third-party",description:"Специалист по борьбе, захватам, удержанию и контролю противников в ближнем бою.",pickLevel:3,levels:{3:{features:["Заготовка: Fight Club feature","Заготовка: grappling"]},6:{features:["Заготовка: Fight Club feature"]},11:{features:["Заготовка: Fight Club feature"]},17:{features:["Заготовка: Fight Club feature"]}}},
  "The Sweet Science": {source:"Benjamin Huffman / third-party",description:"Техничный боксёр: точные удары, контратаки и ставка на нокаут.",pickLevel:3,levels:{3:{features:["Заготовка: Fight Club feature"]},6:{features:["Заготовка: Fight Club feature"]},11:{features:["Заготовка: Fight Club feature"]},17:{features:["Заготовка: Fight Club feature"]}}}
};



/* Страж — каркас 13 Champion Calls / Warden subclasses. */
window.SUBCLASSES_REFERENCE["Страж"] = {
  "Beastblood Guardian": {source:"Mage Hand Press / third-party",description:"Защитник зверей, усиливающийся через первобытную ярость и охотничьи инстинкты.",pickLevel:3,levels:{3:{features:["Заготовка: Champion Call"]},6:{features:["Заготовка: Champion Call"]},10:{features:["Заготовка: Champion Call"]},17:{features:["Заготовка: Champion Call"]}}},
  "Carrion King": {source:"Mage Hand Press / third-party",description:"Покровитель паразитов и мелких существ, управляющий роем защитников.",pickLevel:3,levels:{3:{features:["Заготовка: Champion Call"]},6:{features:["Заготовка: Champion Call"]},10:{features:["Заготовка: Champion Call"]},17:{features:["Заготовка: Champion Call"]}}},
  "Diabolist": {source:"Mage Hand Press / third-party",description:"Защитник, заключающий сделки с адскими существами и использующий инфернальную силу.",pickLevel:3,levels:{3:{features:["Заготовка: Champion Call"]},6:{features:["Заготовка: Champion Call"]},10:{features:["Заготовка: Champion Call"]},17:{features:["Заготовка: Champion Call"]}}},
  "Drake-Blooded": {source:"Mage Hand Press / third-party",description:"Страж, связанный с драконьей кровью и стихийной магией.",pickLevel:3,levels:{3:{features:["Заготовка: Champion Call"]},6:{features:["Заготовка: Champion Call"]},10:{features:["Заготовка: Champion Call"]},17:{features:["Заготовка: Champion Call"]}}},
  "Godsworn": {source:"Mage Hand Press / third-party",description:"Божественно назначенный защитник храмов, священных мест и тех, кто ищет убежища.",pickLevel:3,levels:{3:{features:["Заготовка: Champion Call"]},6:{features:["Заготовка: Champion Call"]},10:{features:["Заготовка: Champion Call"]},17:{features:["Заготовка: Champion Call"]}}},
  "Grey Watchman": {source:"Mage Hand Press / third-party",description:"Тактический страж, использующий манёвры, дисциплину и контратаки.",pickLevel:3,levels:{3:{features:["Заготовка: Champion Call"]},6:{features:["Заготовка: Champion Call"]},10:{features:["Заготовка: Champion Call"]},17:{features:["Заготовка: Champion Call"]}}},
  "Nightgaunt": {source:"Mage Hand Press / third-party",description:"Союзник нежити, использующий некротическую силу для защиты своей цели.",pickLevel:3,levels:{3:{features:["Заготовка: Champion Call"]},6:{features:["Заготовка: Champion Call"]},10:{features:["Заготовка: Champion Call"]},17:{features:["Заготовка: Champion Call"]}}},
  "Rimekeeper": {source:"Mage Hand Press / third-party",description:"Страж зимы, управляющий холодом, снегом и замораживающей защитой.",pickLevel:3,levels:{3:{features:["Заготовка: Champion Call"]},6:{features:["Заготовка: Champion Call"]},10:{features:["Заготовка: Champion Call"]},17:{features:["Заготовка: Champion Call"]}}},
  "Steel Shepherd": {source:"Mage Hand Press / third-party",description:"Защитник конструкций и машин, соединяющий боевую выносливость с техномантией.",pickLevel:3,levels:{3:{features:["Заготовка: Champion Call"]},6:{features:["Заготовка: Champion Call"]},10:{features:["Заготовка: Champion Call"]},17:{features:["Заготовка: Champion Call"]}}},
  "Stoneheart Defender": {source:"Mage Hand Press / third-party",description:"Неподвижный защитник гор и крепостей, почти буквально превращающийся в стену.",pickLevel:3,levels:{3:{features:["Заготовка: Champion Call"]},6:{features:["Заготовка: Champion Call"]},10:{features:["Заготовка: Champion Call"]},17:{features:["Заготовка: Champion Call"]}}},
  "Storm Sentinel": {source:"Mage Hand Press / third-party",description:"Страж бурь, использующий гром и молнию для защиты побережий и союзников.",pickLevel:3,levels:{3:{features:["Заготовка: Champion Call"]},6:{features:["Заготовка: Champion Call"]},10:{features:["Заготовка: Champion Call"]},17:{features:["Заготовка: Champion Call"]}}},
  "Verdant Protector": {source:"Mage Hand Press / third-party",description:"Защитник природы, связывающий боевые тактики с растениями и лесом.",pickLevel:3,levels:{3:{features:["Заготовка: Champion Call"]},6:{features:["Заготовка: Champion Call"]},10:{features:["Заготовка: Champion Call"]},17:{features:["Заготовка: Champion Call"]}}},
  "Witchbane Hunter": {source:"Mage Hand Press / third-party",description:"Охотник на магов, колдунов и опасные сверхъестественные угрозы.",pickLevel:3,levels:{3:{features:["Заготовка: Champion Call"]},6:{features:["Заготовка: Champion Call"]},10:{features:["Заготовка: Champion Call"]},17:{features:["Заготовка: Champion Call"]}}}
};



/* Военачальник — каркас 12 Academies of War. */
window.SUBCLASSES_REFERENCE["Военачальник"] = {
  "Academy of Chivalry":{source:"Laserllama / third-party",description:"Рыцарский командир: честь, защита и лидерство с передовой.",pickLevel:3,levels:{3:{features:["Заготовка: Academy feature"]},7:{features:["Заготовка: Academy feature"]},11:{features:["Заготовка: Academy feature"]},15:{features:["Заготовка: Academy feature"]},18:{features:["Заготовка: Academy feature"]}}},
  "Academy of Dread":{source:"Laserllama / third-party",description:"Запугивание и давление на врагов через страх и жёсткую дисциплину.",pickLevel:3,levels:{3:{features:["Заготовка: Academy feature"]},7:{features:["Заготовка: Academy feature"]},11:{features:["Заготовка: Academy feature"]},15:{features:["Заготовка: Academy feature"]},18:{features:["Заготовка: Academy feature"]}}},
  "Academy of Ferocity":{source:"Laserllama / third-party",description:"Агрессивный лидер охотничьего отряда и ближнего боя.",pickLevel:3,levels:{3:{features:["Заготовка: Academy feature"]},7:{features:["Заготовка: Academy feature"]},11:{features:["Заготовка: Academy feature"]},15:{features:["Заготовка: Academy feature"]},18:{features:["Заготовка: Academy feature"]}}},
  "Academy of Gallantry":{source:"Laserllama / third-party",description:"Героический командир, вдохновляющий союзников личным примером.",pickLevel:3,levels:{3:{features:["Заготовка: Academy feature"]},7:{features:["Заготовка: Academy feature"]},11:{features:["Заготовка: Academy feature"]},15:{features:["Заготовка: Academy feature"]},18:{features:["Заготовка: Academy feature"]}}},
  "Academy of Schemes":{source:"Laserllama / third-party",description:"Тактик интриг, ловушек и нестандартных способов победить.",pickLevel:3,levels:{3:{features:["Заготовка: Academy feature"]},7:{features:["Заготовка: Academy feature"]},11:{features:["Заготовка: Academy feature"]},15:{features:["Заготовка: Academy feature"]},18:{features:["Заготовка: Academy feature"]}}},
  "Academy of Tactics":{source:"Laserllama / third-party",description:"Чистый стратег, меняющий порядок боя и распределяющий преимущества.",pickLevel:3,levels:{3:{features:["Заготовка: Academy feature"]},7:{features:["Заготовка: Academy feature"]},11:{features:["Заготовка: Academy feature"]},15:{features:["Заготовка: Academy feature"]},18:{features:["Заготовка: Academy feature"]}}},
  "Academy of Claws":{source:"Laserllama / third-party",description:"Командир, связанный с хищниками и звериной тактикой.",pickLevel:3,levels:{3:{features:["Заготовка: Academy feature"]},7:{features:["Заготовка: Academy feature"]},11:{features:["Заготовка: Academy feature"]},15:{features:["Заготовка: Academy feature"]},18:{features:["Заготовка: Academy feature"]}}},
  "Academy of Counsel":{source:"Laserllama / third-party",description:"Наставник, усиливающий союзников советами и подготовкой.",pickLevel:3,levels:{3:{features:["Заготовка: Academy feature"]},7:{features:["Заготовка: Academy feature"]},11:{features:["Заготовка: Academy feature"]},15:{features:["Заготовка: Academy feature"]},18:{features:["Заготовка: Academy feature"]}}},
  "Academy of Liberty":{source:"Laserllama / third-party",description:"Командир независимости, мобильности и освобождения союзников.",pickLevel:3,levels:{3:{features:["Заготовка: Academy feature"]},7:{features:["Заготовка: Academy feature"]},11:{features:["Заготовка: Academy feature"]},15:{features:["Заготовка: Academy feature"]},18:{features:["Заготовка: Academy feature"]}}},
  "Academy of Navigators":{source:"Laserllama / third-party",description:"Мореход и лидер экспедиции, ориентированный на движение и путешествия.",pickLevel:3,levels:{3:{features:["Заготовка: Academy feature"]},7:{features:["Заготовка: Academy feature"]},11:{features:["Заготовка: Academy feature"]},15:{features:["Заготовка: Academy feature"]},18:{features:["Заготовка: Academy feature"]}}},
  "Academy of Order":{source:"Laserllama / third-party",description:"Строгий организатор, превращающий отряд в дисциплинированное целое.",pickLevel:3,levels:{3:{features:["Заготовка: Academy feature"]},7:{features:["Заготовка: Academy feature"]},11:{features:["Заготовка: Academy feature"]},15:{features:["Заготовка: Academy feature"]},18:{features:["Заготовка: Academy feature"]}}},
  "Academy of Zeal":{source:"Laserllama / third-party",description:"Воодушевлённый лидер, поддерживающий союзников убеждённостью и решимостью.",pickLevel:3,levels:{3:{features:["Заготовка: Academy feature"]},7:{features:["Заготовка: Academy feature"]},11:{features:["Заготовка: Academy feature"]},15:{features:["Заготовка: Academy feature"]},18:{features:["Заготовка: Academy feature"]}}}
};



/* Оккультист — каркас трёх базовых Occult Traditions. */
window.SUBCLASSES_REFERENCE["Оккультист"] = {
  "Oracle": {source:"KibblesTasty / third-party",description:"Оккультная традиция предвидения, пророчеств и управления вероятностями.",pickLevel:1,levels:{1:{features:["Заготовка: Oracle Tradition"]},3:{features:["Заготовка: Oracle Tradition"]},6:{features:["Заготовка: Oracle Tradition"]},14:{features:["Заготовка: Oracle Tradition"]}}},
  "Shaman": {source:"KibblesTasty / third-party",description:"Духовная традиция: призыв и связывание духов, стихий и предков.",pickLevel:1,levels:{1:{features:["Заготовка: Shaman Tradition"]},3:{features:["Заготовка: Shaman Tradition"]},6:{features:["Заготовка: Shaman Tradition"]},14:{features:["Заготовка: Shaman Tradition"]}}},
  "Witch": {source:"KibblesTasty / third-party",description:"Ведьмовская традиция, основанная на проклятиях, обрядах и тайных договорах.",pickLevel:1,levels:{1:{features:["Заготовка: Witch Tradition"]},3:{features:["Заготовка: Witch Tradition"]},6:{features:["Заготовка: Witch Tradition"]},14:{features:["Заготовка: Witch Tradition"]}}}
};



window.SUBCLASSES_REFERENCE["Шифтер"] = {
  "Avian":{source:"third-party",description:"Крылатая кровная линия: скорость, мобильность и воздушные формы.",pickLevel:3,levels:{3:{features:["Заготовка: способность подкласса"]},6:{features:["Заготовка: способность подкласса"]},10:{features:["Заготовка: способность подкласса"]},14:{features:["Заготовка: способность подкласса"]}}},
  "Brute":{source:"third-party",description:"Мощная звериная линия: сила, выносливость и тяжёлые формы.",pickLevel:3,levels:{3:{features:["Заготовка: способность подкласса"]},6:{features:["Заготовка: способность подкласса"]},10:{features:["Заготовка: способность подкласса"]},14:{features:["Заготовка: способность подкласса"]}}},
  "Carnivore":{source:"third-party",description:"Хищная линия: охота, органы чувств и быстрые атаки.",pickLevel:3,levels:{3:{features:["Заготовка: способность подкласса"]},6:{features:["Заготовка: способность подкласса"]},10:{features:["Заготовка: способность подкласса"]},14:{features:["Заготовка: способность подкласса"]}}},
  "Reptilian":{source:"third-party",description:"Рептильная линия: броня, хватка и адаптация.",pickLevel:3,levels:{3:{features:["Заготовка: способность подкласса"]},6:{features:["Заготовка: способность подкласса"]},10:{features:["Заготовка: способность подкласса"]},14:{features:["Заготовка: способность подкласса"]}}},
  "Aquatic":{source:"third-party",description:"Водная линия: плавание, амфибийные формы и подводная охота.",pickLevel:3,levels:{3:{features:["Заготовка: способность подкласса"]},6:{features:["Заготовка: способность подкласса"]},10:{features:["Заготовка: способность подкласса"]},14:{features:["Заготовка: способность подкласса"]}}},
  "Vermin":{source:"third-party",description:"Насекомоподобная линия: ловкость, выживание и рой.",pickLevel:3,levels:{3:{features:["Заготовка: способность подкласса"]},6:{features:["Заготовка: способность подкласса"]},10:{features:["Заготовка: способность подкласса"]},14:{features:["Заготовка: способность подкласса"]}}},
  "Ancient":{source:"third-party",description:"Древняя линия: первобытные и редкие формы.",pickLevel:3,levels:{3:{features:["Заготовка: способность подкласса"]},6:{features:["Заготовка: способность подкласса"]},10:{features:["Заготовка: способность подкласса"]},14:{features:["Заготовка: способность подкласса"]}}}
};

window.SUBCLASSES_REFERENCE["Аккурсд"] = {
  "Corruption":{source:"third-party",description:"Проклятие разложения и порчи.",pickLevel:1,levels:{1:{features:["Заготовка: способность подкласса"]},6:{features:["Заготовка: способность подкласса"]},9:{features:["Заготовка: способность подкласса"]},13:{features:["Заготовка: способность подкласса"]}}},
  "Disease":{source:"third-party",description:"Проклятие болезни и истощения.",pickLevel:1,levels:{1:{features:["Заготовка: способность подкласса"]},6:{features:["Заготовка: способность подкласса"]},9:{features:["Заготовка: способность подкласса"]},13:{features:["Заготовка: способность подкласса"]}}},
  "Rot":{source:"third-party",description:"Проклятие гнили и нежизни.",pickLevel:1,levels:{1:{features:["Заготовка: способность подкласса"]},6:{features:["Заготовка: способность подкласса"]},9:{features:["Заготовка: способность подкласса"]},13:{features:["Заготовка: способность подкласса"]}}},
  "Lycanthropy":{source:"third-party",description:"Звериное проклятие и трансформация.",pickLevel:1,levels:{1:{features:["Заготовка: способность подкласса"]},6:{features:["Заготовка: способность подкласса"]},9:{features:["Заготовка: способность подкласса"]},13:{features:["Заготовка: способность подкласса"]}}},
  "Vampirism":{source:"third-party",description:"Проклятие жажды крови и ночной охоты.",pickLevel:1,levels:{1:{features:["Заготовка: способность подкласса"]},6:{features:["Заготовка: способность подкласса"]},9:{features:["Заготовка: способность подкласса"]},13:{features:["Заготовка: способность подкласса"]}}}
};

window.SUBCLASSES_REFERENCE["Рунный хранитель"] = {
  "Blood Runes":{source:"third-party",description:"Руны, связанные с жизненной силой и кровью.",pickLevel:3,levels:{3:{features:["Заготовка: способность подкласса"]},7:{features:["Заготовка: способность подкласса"]},10:{features:["Заготовка: способность подкласса"]},15:{features:["Заготовка: способность подкласса"]}}},
  "Elemental Runes":{source:"third-party",description:"Стихийные руны и разрушительная энергия.",pickLevel:3,levels:{3:{features:["Заготовка: способность подкласса"]},7:{features:["Заготовка: способность подкласса"]},10:{features:["Заготовка: способность подкласса"]},15:{features:["Заготовка: способность подкласса"]}}},
  "Guardian Runes":{source:"third-party",description:"Защитные руны и усиление союзников.",pickLevel:3,levels:{3:{features:["Заготовка: способность подкласса"]},7:{features:["Заготовка: способность подкласса"]},10:{features:["Заготовка: способность подкласса"]},15:{features:["Заготовка: способность подкласса"]}}},
  "Spirit Runes":{source:"third-party",description:"Руны духов, памяти и связи с потусторонним.",pickLevel:3,levels:{3:{features:["Заготовка: способность подкласса"]},7:{features:["Заготовка: способность подкласса"]},10:{features:["Заготовка: способность подкласса"]},15:{features:["Заготовка: способность подкласса"]}}},
  "War Runes":{source:"third-party",description:"Боевые руны и усиление рунического оружия.",pickLevel:3,levels:{3:{features:["Заготовка: способность подкласса"]},7:{features:["Заготовка: способность подкласса"]},10:{features:["Заготовка: способность подкласса"]},15:{features:["Заготовка: способность подкласса"]}}}
};

window.SUBCLASSES_REFERENCE["Савант"] = {
  "Adroit":{source:"third-party",description:"Мастер ловкости, точности и практического применения знаний.",pickLevel:3,levels:{3:{features:["Заготовка: способность подкласса"]},6:{features:["Заготовка: способность подкласса"]},10:{features:["Заготовка: способность подкласса"]},14:{features:["Заготовка: способность подкласса"]}}},
  "Doctor":{source:"third-party",description:"Медик и поддерживающий специалист.",pickLevel:3,levels:{3:{features:["Заготовка: способность подкласса"]},6:{features:["Заготовка: способность подкласса"]},10:{features:["Заготовка: способность подкласса"]},14:{features:["Заготовка: способность подкласса"]}}},
  "Investigator":{source:"third-party",description:"Следователь и аналитик, раскрывающий слабости противников.",pickLevel:3,levels:{3:{features:["Заготовка: способность подкласса"]},6:{features:["Заготовка: способность подкласса"]},10:{features:["Заготовка: способность подкласса"]},14:{features:["Заготовка: способность подкласса"]}}},
  "Mechanist":{source:"third-party",description:"Техник, использующий инструменты и устройства.",pickLevel:3,levels:{3:{features:["Заготовка: способность подкласса"]},6:{features:["Заготовка: способность подкласса"]},10:{features:["Заготовка: способность подкласса"]},14:{features:["Заготовка: способность подкласса"]}}},
  "Tactician":{source:"third-party",description:"Тактик, управляющий позициями и преимуществами союзников.",pickLevel:3,levels:{3:{features:["Заготовка: способность подкласса"]},6:{features:["Заготовка: способность подкласса"]},10:{features:["Заготовка: способность подкласса"]},14:{features:["Заготовка: способность подкласса"]}}},
  "Marksman":{source:"third-party",description:"Специалист дальнего боя и точных атак.",pickLevel:3,levels:{3:{features:["Заготовка: способность подкласса"]},6:{features:["Заготовка: способность подкласса"]},10:{features:["Заготовка: способность подкласса"]},14:{features:["Заготовка: способность подкласса"]}}},
  "Duelist":{source:"third-party",description:"Мастер одиночного боя и контрприёмов.",pickLevel:3,levels:{3:{features:["Заготовка: способность подкласса"]},6:{features:["Заготовка: способность подкласса"]},10:{features:["Заготовка: способность подкласса"]},14:{features:["Заготовка: способность подкласса"]}}},
  "Philosopher":{source:"third-party",description:"Специалист абстрактных знаний, рассуждений и ментальной поддержки.",pickLevel:3,levels:{3:{features:["Заготовка: способность подкласса"]},6:{features:["Заготовка: способность подкласса"]},10:{features:["Заготовка: способность подкласса"]},14:{features:["Заготовка: способность подкласса"]}}}
};

window.SUBCLASSES_REFERENCE["Хранитель рун"]={
  "Detek":{source:"third-party",description:"Дварфийская руническая традиция кузнецов и инженеров.",pickLevel:2,levels:{2:{features:["Заготовка: способность подкласса"]},6:{features:["Заготовка: способность подкласса"]},10:{features:["Заготовка: способность подкласса"]},14:{features:["Заготовка: способность подкласса"]}}},
  "Infernal":{source:"third-party",description:"Инфернальный диалект и опасные рунические законы.",pickLevel:2,levels:{2:{features:["Заготовка: способность подкласса"]},6:{features:["Заготовка: способность подкласса"]},10:{features:["Заготовка: способность подкласса"]},14:{features:["Заготовка: способность подкласса"]}}},
  "Joharic":{source:"third-party",description:"Редкая традиция, исследующая изменяющие реальность руны.",pickLevel:2,levels:{2:{features:["Заготовка: способность подкласса"]},6:{features:["Заготовка: способность подкласса"]},10:{features:["Заготовка: способность подкласса"]},14:{features:["Заготовка: способность подкласса"]}}},
  "Jotun":{source:"third-party",description:"Великанский диалект, связанный с древними рунами.",pickLevel:2,levels:{2:{features:["Заготовка: способность подкласса"]},6:{features:["Заготовка: способность подкласса"]},10:{features:["Заготовка: способность подкласса"]},14:{features:["Заготовка: способность подкласса"]}}},
  "Ghukliak":{source:"third-party",description:"Экзотическая руническая философия и магические конструкции.",pickLevel:2,levels:{2:{features:["Заготовка: способность подкласса"]},6:{features:["Заготовка: способность подкласса"]},10:{features:["Заготовка: способность подкласса"]},14:{features:["Заготовка: способность подкласса"]}}},
  "Celestial":{source:"third-party",description:"Небесные руны и священные законы реальности.",pickLevel:2,levels:{2:{features:["Заготовка: способность подкласса"]},6:{features:["Заготовка: способность подкласса"]},10:{features:["Заготовка: способность подкласса"]},14:{features:["Заготовка: способность подкласса"]}}}
};/**
 * Возвращает список подклассов, доступных для выбранного класса,
 * в формате для построения выпадающего списка / карточек UI.
 * @param {string} className
 * @returns {Array<{key:string,name:string,source:string,description:string,pickLevel:number}>}
 */
window.getAvailableSubclasses = function(className) {
  if (!className) return [];
  const group = window.SUBCLASSES_REFERENCE[className.trim()];
  if (!group) return [];
  return Object.keys(group).map(key => ({
    key: key,
    name: key,
    source: group[key].source || '—',
    description: group[key].description || '',
    pickLevel: group[key].pickLevel || 1
  }));
};

/**
 * Возвращает полные данные одного подкласса или null.
 * @param {string} className
 * @param {string} subclassName
 */
window.getSubclassData = function(className, subclassName) {
  if (!className || !subclassName) return null;
  const group = window.SUBCLASSES_REFERENCE[className.trim()];
  if (!group) return null;
  return group[subclassName] || null;
};

/**
 * Быстрый доступ к списку фич подкласса на конкретном уровне класса.
 * @param {string} className
 * @param {string} subclassName
 * @param {number} level
 * @returns {string[]}
 */
window.getSubclassFeaturesForLevel = function(className, subclassName, level) {
  const data = window.getSubclassData(className, subclassName);
  if (!data || !data.levels || !data.levels[level]) return [];
  return data.levels[level].features || [];
};


/* Некромант — независимые краткие описания для VTT; подробные механики будут добавлены позже. */
window.SUBCLASSES_REFERENCE["Некромант"] = {
  "Рыцарь смерти": {
    source: "Third-party / Mage Hand Press",
    description: "Боевой некромант, сочетающий тяжёлое вооружение с тёмной магией.",
    pickLevel: 3,
    levels: {
      3: { features: ["Заготовка: боевой некромант"] },
      6: { features: ["Заготовка: способность специализации"] },
      10: { features: ["Заготовка: способность специализации"] },
      14: { features: ["Заготовка: способность специализации"] }
    }
  },
  "Повелитель": {
    source: "Third-party / Mage Hand Press",
    description: "Некромант-командир, усиливающий союзников и собственную нежить.",
    pickLevel: 3,
    levels: {
      3: { features: ["Заготовка: командование нежитью"] },
      6: { features: ["Заготовка: способность специализации"] },
      10: { features: ["Заготовка: способность специализации"] },
      14: { features: ["Заготовка: способность специализации"] }
    }
  },
  "Бледный мастер": {
    source: "Third-party / Mage Hand Press",
    description: "Специалист по чистой некромантии и разрушительной магии смерти.",
    pickLevel: 3,
    levels: {
      3: { features: ["Заготовка: усиленная некромантия"] },
      6: { features: ["Заготовка: способность специализации"] },
      10: { features: ["Заготовка: способность специализации"] },
      14: { features: ["Заготовка: способность специализации"] }
    }
  }
};


/* Мученик — независимые краткие описания для VTT; подробные механики будут добавлены позже. */
window.SUBCLASSES_REFERENCE["Мученик"] = {
  "Бремя милосердия": {
    source: "Third-party / Mage Hand Press",
    description: "Целитель и носитель надежды, направляющий жертву на спасение других.",
    pickLevel: 3,
    levels: {
      3: { features: ["Заготовка: милосердие"] },
      6: { features: ["Заготовка: способность специализации"] },
      14: { features: ["Заготовка: способность специализации"] },
      18: { features: ["Заготовка: способность специализации"] }
    }
  },
  "Бремя революции": {
    source: "Third-party / Mage Hand Press",
    description: "Воин-пророк, чья судьба связана с борьбой против тирании.",
    pickLevel: 3,
    levels: {
      3: { features: ["Заготовка: революционный путь"] },
      6: { features: ["Заготовка: способность специализации"] },
      14: { features: ["Заготовка: способность специализации"] },
      18: { features: ["Заготовка: способность специализации"] }
    }
  },
  "Бремя истины": {
    source: "Third-party / Mage Hand Press",
    description: "Пророк и провидец, несущий миру опасное или неудобное знание.",
    pickLevel: 3,
    levels: {
      3: { features: ["Заготовка: пророческий путь"] },
      6: { features: ["Заготовка: способность специализации"] },
      14: { features: ["Заготовка: способность специализации"] },
      18: { features: ["Заготовка: способность специализации"] }
    }
  }
};


/* Сосуд — независимый каркас шести Sealed Spirit. Механики будут добавлены позже. */
window.SUBCLASSES_REFERENCE["Сосуд"] = {
  "Вознесённый": {
    source: "Third-party / laserllama",
    description: "Дух возвышенного мага, связанный с тайной знания и мистической силой.",
    pickLevel: 3,
    levels: {
      3: { features: ["Заготовка: Sealed Spirit / Sealed Magic"] },
      6: { features: ["Заготовка: способность духа"] },
      15: { features: ["Заготовка: способность духа"] },
      20: { features: ["Заготовка: финальная форма Archon"] }
    }
  },
  "Катаклизм": {
    source: "Third-party / laserllama",
    description: "Первобытный элементальный дух с четырьмя вариантами стихии.",
    pickLevel: 3,
    levels: {
      3: { features: ["Заготовка: Elemental Affinity / Sealed Magic"] },
      6: { features: ["Заготовка: способность духа"] },
      15: { features: ["Заготовка: способность духа"] },
      20: { features: ["Заготовка: финальная форма Archon"] }
    }
  },
  "Проклятый": {
    source: "Third-party / laserllama",
    description: "Мрачный дух нижних планов, усиливающий огненные и проклятые проявления.",
    pickLevel: 3,
    levels: {
      3: { features: ["Заготовка: Malignant Aura / Sealed Magic"] },
      6: { features: ["Заготовка: способность духа"] },
      15: { features: ["Заготовка: способность духа"] },
      20: { features: ["Заготовка: финальная форма Archon"] }
    }
  },
  "Падший": {
    source: "Third-party / laserllama",
    description: "Падший небесный дух, направляющий силу воли и небесного воина.",
    pickLevel: 3,
    levels: {
      3: { features: ["Заготовка: Celestial Warrior / Divine Wrath / Sealed Magic"] },
      6: { features: ["Заготовка: способность духа"] },
      15: { features: ["Заготовка: способность духа"] },
      20: { features: ["Заготовка: финальная форма Archon"] }
    }
  },
  "Бесформенный": {
    source: "Third-party / laserllama",
    description: "Потусторонний дух-пожиратель, меняющий форму и поглощающий силу врагов.",
    pickLevel: 3,
    levels: {
      3: { features: ["Заготовка: Amorphous Shape / Sealed Magic"] },
      6: { features: ["Заготовка: способность духа"] },
      15: { features: ["Заготовка: способность духа"] },
      20: { features: ["Заготовка: финальная форма Archon"] }
    }
  },
  "Трикстер": {
    source: "Third-party / laserllama",
    description: "Непредсказуемый дух фейской природы, специализирующийся на иллюзиях и обмане.",
    pickLevel: 3,
    levels: {
      3: { features: ["Заготовка: Shifting Visage / Sealed Magic"] },
      6: { features: ["Заготовка: способность духа"] },
      15: { features: ["Заготовка: способность духа"] },
      20: { features: ["Заготовка: финальная форма Archon"] }
    }
  }
};
