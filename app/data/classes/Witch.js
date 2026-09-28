/**
 * Witch.js
 * Карманный ВТТ — каркас прогрессии класса «Ведьма».
 *
 * Источник концепции: Mike / Mage Hand Press, Witch.
 * Это независимая структура проекта; текст и художественные материалы источника
 * не копируются. Точные механики будут перенесены отдельным этапом.
 */
window.witchProgression = {
    className: "Ведьма",
    englishName: "Witch",
    source: "Mage Hand Press / Third-party",
    status: "skeleton",

    hitDie: 8,
    primaryStat: "charisma",
    savingThrows: ["wisdom", "charisma"],
    armor: ["light"],
    weapons: ["simple", "blowgun", "shortsword", "whip"],
    tools: ["alchemist_supplies", "poisoner_kit"],
    multiclassRequirement: { charisma: 13 },
    subclassLevel: 3,

    levels: {
        1: { features: ["Заготовка: Заклинания", "Заготовка: Проклятие ведьмы", "Заготовка: Hexes"] },
        2: { features: ["Заготовка: Cackle", "Заготовка: Familiar"] },
        3: { features: ["Заготовка: Witch Craft / Подкласс"] },
        4: { features: ["Увеличение характеристик (ASI) или Черта"], asi: true },
        5: { features: ["Заготовка: Insidious Spell"] },
        6: { features: ["Заготовка: способность подкласса"] },
        7: { features: ["Заготовка: Improved Familiar"] },
        8: { features: ["Увеличение характеристик (ASI) или Черта"], asi: true },
        9: { features: ["Заготовка: высокий уровень Hex-механики"] },
        10: { features: ["Заготовка: способность подкласса"] },
        11: { features: ["Заготовка: Grand Hex"] },
        12: { features: ["Увеличение характеристик (ASI) или Черта"], asi: true },
        13: { features: ["Заготовка: Grand Hex"] },
        14: { features: ["Заготовка: способность подкласса"] },
        15: { features: ["Заготовка: Grand Hex"] },
        16: { features: ["Увеличение характеристик (ASI) или Черта"], asi: true },
        17: { features: ["Заготовка: Grand Hex"] },
        18: { features: ["Заготовка: Vengeful Curse"] },
        19: { features: ["Заготовка: Epic Boon"], asi: false },
        20: { features: ["Заготовка: Hexmaster"] }
    },

    mechanics: {
        spellcasting: "full_caster",
        spellcastingAbility: "charisma",
        hexes: { status: "pending", separateFromNormalSpells: true },
        familiar: { status: "pending" },
        witchCurse: { status: "pending" },
        cackle: { status: "pending" },
        subclassSystem: "witch_craft",
        specialActions: [],
        notes: "Этап 1 — только структура. Полная реализация механик после проверки progression."
    }
};
