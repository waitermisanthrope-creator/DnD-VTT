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
    source: "Mage Hand Press / third-party",
    multiclassProficiencies: { armor: ["light"], weapons: ["simple"] },
    skills: { choose: 2, from: ["arcana","history","insight","medicine","nature","religion"] },
    subclassFeatureLevels: [3,6,10,14],
    status: "implemented_core",

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
        1: { features: ["Использование заклинаний", "Могильное касание"] },
        2: { features: ["Неживые слуги", "Мёртвое пространство"] },
        3: { features: ["Подкласс Некроманта", "Тёмная аркана"] , subclassLevel: true },
        4: { features: ["Увеличение характеристик (ASI) или Черта"], asi: true },
        5: { features: ["Оживление мёртвых", "Критическое колдовство"] },
        6: { features: ["Заготовка: способность подкласса"] },
        7: { features: ["Улучшенные слуги"] },
        8: { features: ["Увеличение характеристик (ASI) или Черта"], asi: true },
        9: { features: [] },
        10: { features: ["Заготовка: способность подкласса"] },
        11: { features: [] },
        12: { features: ["Увеличение характеристик (ASI) или Черта"], asi: true },
        13: { features: [] },
        14: { features: ["Улучшенное критическое колдовство"] },
        15: { features: [] },
        16: { features: ["Увеличение характеристик (ASI) или Черта"], asi: true },
        17: { features: [] },
        18: { features: ["Неумирающее служение"] },
        19: { features: ["Заготовка: Epic Boon"], asi: false },
        20: { features: ["Личествование"] }
    },

    mechanics: { implemented: ["spellcasting","charnelTouch","thralls","deadSpace","darkArcana","criticalSpellcasting","undyingServitude","lichdom"],
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
