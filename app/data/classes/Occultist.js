/**
 * Occultist.js
 * Карманный ВТТ — каркас прогрессии класса «Оккультист».
 *
 * Источник концепции: KibblesTasty Occultist.
 * ВАЖНО: это только независимая заготовка структуры проекта. На этом этапе
 * механики, точные способности, ресурсы и подклассы НЕ переносятся.
 *
 * Как работает:
 * - window.occultistProgression хранит контракт класса и уровни 1–20;
 * - позже сюда будут добавлены проверенные механики и ресурсы;
 * - подклассы подключаются отдельно через subclassesRegistry.js;
 * - до наполнения механиками этот файл намеренно не содержит боевых правил.
 *
 * Публичный API:
 * - window.occultistProgression
 */ 
window.occultistProgression = {
    className: "Оккультист",
    englishName: "Occultist",
    source: "KibblesTasty / Third-party",
    status: "skeleton",
    subclassLevel: 3,

    // Базовые параметры будут подтверждены при этапе наполнения механиками.
    hitDie: 6,
    primaryStat: "wisdom",
    savingThrows: ["wisdom", "charisma"],
    armor: [],
    weapons: ["daggers", "quarterstaff", "light_crossbow"],
    tools: ["herbalism_kit"],
    multiclassRequirement: { wisdom: 13 },

    levels: {
        1: { features: ["Заготовка уровня 1"] },
        2: { features: ["Заготовка уровня 2"] },
        3: { features: ["Заготовка уровня 3", "Выбор подкласса — уточнить"] },
        4: { features: ["Увеличение характеристик (ASI) или Черта"] , asi: true },
        5: { features: ["Заготовка уровня 5"] },
        6: { features: ["Заготовка уровня 6"] },
        7: { features: ["Заготовка уровня 7"] },
        8: { features: ["Увеличение характеристик (ASI) или Черта"] , asi: true },
        9: { features: ["Заготовка уровня 9"] },
        10: { features: ["Заготовка уровня 10"] },
        11: { features: ["Заготовка уровня 11"] },
        12: { features: ["Увеличение характеристик (ASI) или Черта"] , asi: true },
        13: { features: ["Заготовка уровня 13"] },
        14: { features: ["Заготовка уровня 14"] },
        15: { features: ["Заготовка уровня 15"] },
        16: { features: ["Увеличение характеристик (ASI) или Черта"] , asi: true },
        17: { features: ["Заготовка уровня 17"] },
        18: { features: ["Заготовка уровня 18"] },
        19: { features: ["Увеличение характеристик (ASI) или Черта"] , asi: true },
        20: { features: ["Заготовка уровня 20 — capstone"] }
    },

    // Контракт будущей механической системы. Пока ничего не исполняет.
    mechanics: {
        resource: null,
        coreLoop: null,
        spellcasting: null,
        subclassSystem: "pending",
        specialActions: [],
        notes: "Наполнить после отдельной проверки актуальной версии класса."
    }
};
