/**
 * Necromancer.js
 * Карманный ВТТ — каркас прогрессии класса «Некромант».
 *
 * Источник концепции: Mike / Mage Hand Press, Necromancer.
 * Структура проекта независимая; текст и художественные материалы источника
 * не копируются. Полная реализация механик — отдельный этап.
 */
window.necromancerProgression = {
    className: "Некромант",
    englishName: "Necromancer",
    source: "Mage Hand Press / Third-party",
    status: "skeleton",

    edition: "5.5E",
    hitDie: 6,
    primaryStat: "intelligence",
    savingThrows: ["constitution", "intelligence"],
    armor: [],
    weapons: ["simple"],
    tools: [],
    multiclassRequirement: { intelligence: 13 },
    subclassLevel: 3,

    levels: {
        1: { features: ["Заготовка: Spellcasting", "Заготовка: Charnel Touch"] },
        2: { features: ["Заготовка: Thralls", "Заготовка: Dead Space"] },
        3: { features: ["Заготовка: Necromancer Subclass", "Заготовка: Dark Arcana"] },
        4: { features: ["Увеличение характеристик (ASI) или Черта"], asi: true },
        5: { features: ["Заготовка: Animate Dead", "Заготовка: Critical Spellcasting"] },
        6: { features: ["Заготовка: способность подкласса"] },
        7: { features: ["Заготовка: Improved Thralls"] },
        8: { features: ["Увеличение характеристик (ASI) или Черта"], asi: true },
        9: { features: [] },
        10: { features: ["Заготовка: способность подкласса"] },
        11: { features: [] },
        12: { features: ["Увеличение характеристик (ASI) или Черта"], asi: true },
        13: { features: [] },
        14: { features: ["Заготовка: Improved Critical Spellcasting"] },
        15: { features: [] },
        16: { features: ["Увеличение характеристик (ASI) или Черта"], asi: true },
        17: { features: [] },
        18: { features: ["Заготовка: Undying Servitude"] },
        19: { features: ["Заготовка: Epic Boon"], asi: false },
        20: { features: ["Заготовка: Lichdom"] }
    },

    mechanics: {
        spellcasting: "full_caster",
        spellcastingAbility: "intelligence",
        thralls: { status: "pending", sharedSystem: "undead_companions" },
        charnelTouch: { status: "pending", resource: "charnel_touch_points" },
        deadSpace: { status: "pending" },
        animateDead: { status: "pending" },
        criticalSpellcasting: { status: "pending" },
        lichdom: { status: "pending" },
        subclassSystem: "grave_ambition",
        specialActions: [],
        notes: "Этап 1 — только структура. Механики, лимиты нежити, заклинания и подклассы реализуются отдельным этапом."
    }
};
