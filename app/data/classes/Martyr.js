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
    source: "Mage Hand Press / third-party",
    skills: { choose: 2, from: ["athletics","history","insight","intimidation","medicine","persuasion","religion"] },
    subclassFeatureLevels: [3,6,14,18],
    status: "implemented_core",

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
        1: { features: ["Доспех веры", "Использование заклинаний", "Мастерство оружия"] },
        2: { features: ["Чудесное исцеление", "Воздаяние"] },
        3: { features: ["Подкласс Мученика", "Жертва"], subclassLevel: true },
        4: { features: ["Увеличение характеристик (ASI) или Черта"], asi: true },
        5: { features: ["Дополнительная атака"] },
        6: { features: ["Заготовка: способность подкласса"] },
        7: { features: ["Жертва врага"] },
        8: { features: ["Увеличение характеристик (ASI) или Черта"], asi: true },
        9: { features: ["Божественная передышка"] },
        10: { features: ["Неумирающий"] },
        11: { features: ["Улучшенный жертвенный удар"] },
        12: { features: ["Увеличение характеристик (ASI) или Черта"], asi: true },
        13: { features: ["Божественная передышка — улучшение"] },
        14: { features: ["Заготовка: способность подкласса"] },
        15: { features: ["Шествие к судьбе"] },
        16: { features: ["Увеличение характеристик (ASI) или Черта"], asi: true },
        17: { features: ["Божественная передышка — улучшение", "Улучшенный жертвенный удар — улучшение"] },
        18: { features: ["Заготовка: способность подкласса"] },
        19: { features: ["Заготовка: Epic Boon"], asi: false },
        20: { features: ["Последнее мученичество"] }
    },

    mechanics: { implemented: ["spellcasting","armorOfFaith","miraculousHealing","reprisal","sacrifice","sacrificeFoe","divineRespite","undying","improvedSacrificialStrike","marchUntoDestiny","finalMartyrdom"],
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
