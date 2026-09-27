/**
 * classes/wizard.js
 * Прогрессия класса "Волшебник" с 1 по 20 уровень (D&D 5e)
 */

window.wizardProgression = {
    className: "Волшебник",
    hitDie: 6,
    levels: {
        1: { features: ["Использование заклинаний", "Магическое восстановление"] },
        2: { features: ["Магическая школа (Подкласс)"], subclassLevel: true },
        3: { features: [] },
        4: { features: ["Увеличение характеристик (ASI) или Черта"], asi: true },
        5: { features: [] },
        6: { features: ["Способность подкласса"] },
        7: { features: [] },
        8: { features: ["Увеличение характеристик (ASI) или Черта"], asi: true },
        9: { features: [] },
        10: { features: ["Способность подкласса"] },
        11: { features: [] },
        12: { features: ["Увеличение характеристик (ASI) или Черта"], asi: true },
        13: { features: [] },
        14: { features: ["Способность подкласса"] },
        15: { features: [] },
        16: { features: ["Увеличение характеристик (ASI) или Черта"], asi: true },
        17: { features: [] },
        18: { features: ["Фирменное заклинание"] },
        19: { features: ["Увеличение характеристик (ASI) или Черта"], asi: true },
        20: { features: ["Магическое мастерство"] }
    }
};
