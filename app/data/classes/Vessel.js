/**
 * Vessel.js
 * Карманный ВТТ — каркас прогрессии класса «Сосуд».
 *
 * Источник концепции: laserllama, Vessel Class v4.0.
 * Структура проекта независимая; защищённый текст и художественные материалы
 * источника не копируются. Полная реализация механик — отдельный этап.
 */
window.vesselProgression = {
    className: "Сосуд",
    englishName: "Vessel",
    source: "laserllama / Third-party",
    status: "skeleton",

    edition: "5E 2014",
    sourceVersion: "4.0.0",
    hitDie: 10,
    primaryStat: "charisma",
    savingThrows: ["constitution", "charisma"],
    armor: ["light"],
    weapons: ["simple", "scimitar", "shortsword"],
    tools: [],
    multiclassRequirement: { constitution: 13, charisma: 13 },
    subclassLevel: 3,

    levels: {
        1: { features: ["Заготовка: Spirit Mantle", "Заготовка: Unsealed Aspects"] },
        2: { features: ["Заготовка: Vessel Magic"] },
        3: { features: ["Заготовка: Sealed Spirit", "Заготовка: Archon Form"] },
        4: { features: ["Увеличение характеристик (ASI) или Черта"], asi: true },
        5: { features: ["Заготовка: Extra Attack"] },
        6: { features: ["Заготовка: способность Sealed Spirit"] },
        7: { features: ["Заготовка: Controlled Transformation"] },
        8: { features: ["Увеличение характеристик (ASI) или Черта"], asi: true },
        9: { features: [] },
        10: { features: ["Заготовка: Primeval Will / Twin Consciousness"] },
        11: { features: ["Заготовка: Elder Archon"] },
        12: { features: ["Увеличение характеристик (ASI) или Черта"], asi: true },
        13: { features: [] },
        14: { features: ["Заготовка: Dire Preservation"] },
        15: { features: ["Заготовка: способность Sealed Spirit"] },
        16: { features: ["Увеличение характеристик (ASI) или Черта"], asi: true },
        17: { features: [] },
        18: { features: ["Заготовка: Unchained Power"] },
        19: { features: ["Увеличение характеристик (ASI) или Черта"], asi: true },
        20: { features: ["Заготовка: способность Sealed Spirit"] }
    },

    mechanics: {
        spellcasting: "half_caster_warlock_style_slots",
        spellcastingAbility: "charisma",
        spellSlotsRefresh: "short_or_long_rest",
        spiritMantle: { status: "pending", unarmoredDefense: true, empoweredStrikes: true },
        unsealedAspects: { status: "pending", initial: 1, replaceOnNewAspect: true },
        sealedSpirit: {
            status: "pending",
            subclassLevel: 3,
            spirits: ["Ascended", "Cataclysm", "Cursed", "Fallen", "Formless", "Trickster"]
        },
        archonForm: { status: "pending", transformation: true },
        controlledTransformation: { status: "pending" },
        primevalWill: { status: "pending" },
        elderArchon: { status: "pending" },
        direPreservation: { status: "pending" },
        unchainedPower: { status: "pending" },
        subclassSystem: "sealed_spirit",
        specialActions: [],
        notes: "Этап 1 — только структура. Каркас сверён по Vessel Class v4.0; точные механики, аспекты, заклинания и статблоки Archon реализуются отдельно."
    }
};
