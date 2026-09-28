/**
 * Martyr.js
 * Карманный ВТТ — каркас прогрессии класса «Мученик».
 *
 * Источник концепции: Mike / Mage Hand Press, Martyr.
 * Структура проекта независимая; текст и художественные материалы источника
 * не копируются. Полная реализация механик — отдельный этап.
 */
window.martyrProgression = {
    className: "Мученик",
    englishName: "Martyr",
    source: "Mage Hand Press / Third-party",
    status: "skeleton",

    edition: "5.5E",
    hitDie: 12,
    primaryStat: "wisdom",
    secondaryStatChoice: ["strength", "dexterity"],
    savingThrows: ["strength", "wisdom"],
    armor: ["light", "shields"],
    weapons: ["simple", "martial"],
    tools: [],
    multiclassRequirement: { wisdom: 13, strengthOrDexterity: 13 },
    subclassLevel: 3,

    levels: {
        1: { features: ["Заготовка: Armor of Faith", "Заготовка: Spellcasting", "Заготовка: Weapon Mastery"] },
        2: { features: ["Заготовка: Miraculous Healing", "Заготовка: Reprisal"] },
        3: { features: ["Заготовка: Martyr Subclass", "Заготовка: Sacrifice"] },
        4: { features: ["Увеличение характеристик (ASI) или Черта"], asi: true },
        5: { features: ["Заготовка: Extra Attack"] },
        6: { features: ["Заготовка: способность подкласса"] },
        7: { features: ["Заготовка: Sacrifice Foe"] },
        8: { features: ["Увеличение характеристик (ASI) или Черта"], asi: true },
        9: { features: ["Заготовка: Divine Respite"] },
        10: { features: ["Заготовка: Undying"] },
        11: { features: ["Заготовка: Improved Sacrificial Strike"] },
        12: { features: ["Увеличение характеристик (ASI) или Черта"], asi: true },
        13: { features: ["Заготовка: Divine Respite — улучшение"] },
        14: { features: ["Заготовка: способность подкласса"] },
        15: { features: ["Заготовка: March Unto Destiny"] },
        16: { features: ["Увеличение характеристик (ASI) или Черта"], asi: true },
        17: { features: ["Заготовка: Divine Respite — улучшение", "Заготовка: Improved Sacrificial Strike — улучшение"] },
        18: { features: ["Заготовка: способность подкласса"] },
        19: { features: ["Заготовка: Epic Boon"], asi: false },
        20: { features: ["Заготовка: Final Martyrdom"] }
    },

    mechanics: {
        spellcasting: "hp_based_divine",
        spellcastingAbility: "wisdom",
        spellUses: { status: "pending", resource: "martyr_spell_uses" },
        hitPointSpellcasting: { status: "pending", damageType: "radiant" },
        sacrifice: { status: "pending", selfDamage: true },
        healing: { status: "pending" },
        reprisal: { status: "pending" },
        undying: { status: "pending" },
        finalMartyrdom: { status: "pending" },
        subclassSystem: "burden",
        specialActions: [],
        notes: "Этап 1 — только структура. Точный выбор STR/DEX для мультикласса и HP-затраты заклинаний будут зафиксированы на этапе механик."
    }
};
