/**
 * classes/fighter.js
 * Прогрессия класса "Воин" с 1 по 20 уровень (D&D 5e)
 */

window.fighterProgression = {
    className: "Воин",
    hitDie: 10,
    levels: {
        1: {
            features: ["Боевой стиль", "Второе дыхание"],
            actionSurges: 0,
            indomitable: 0
        },
        2: {
            features: ["Всплеск действий (1 использование)"],
            actionSurges: 1,
            indomitable: 0
        },
        3: {
            features: ["Воинский архетип (Подкласс)"],
            actionSurges: 1,
            indomitable: 0,
            subclassLevel: true
        },
        4: {
            features: ["Увеличение характеристик (ASI) или Черта"],
            actionSurges: 1,
            indomitable: 0,
            asi: true
        },
        5: {
            features: ["Дополнительная атака"],
            actionSurges: 1,
            indomitable: 0
        },
        6: {
            features: ["Увеличение характеристик (ASI) или Черта"],
            actionSurges: 1,
            indomitable: 0,
            asi: true
        },
        7: {
            features: ["Способность подкласса"],
            actionSurges: 1,
            indomitable: 0
        },
        8: {
            features: ["Увеличение характеристик (ASI) или Черта"],
            actionSurges: 1,
            indomitable: 0,
            asi: true
        },
        9: {
            features: ["Непреклонность (1 использование)"],
            actionSurges: 1,
            indomitable: 1
        },
        10: {
            features: ["Способность подкласса"],
            actionSurges: 1,
            indomitable: 1
        },
        11: {
            features: ["Дополнительная атака (2)"],
            actionSurges: 1,
            indomitable: 1
        },
        12: {
            features: ["Увеличение характеристик (ASI) или Черта"],
            actionSurges: 1,
            indomitable: 1,
            asi: true
        },
        13: {
            features: ["Непреклонность (2 использования)"],
            actionSurges: 1,
            indomitable: 2
        },
        14: {
            features: ["Увеличение характеристик (ASI) или Черта"],
            actionSurges: 1,
            indomitable: 2,
            asi: true
        },
        15: {
            features: ["Способность подкласса"],
            actionSurges: 1,
            indomitable: 2
        },
        16: {
            features: ["Увеличение характеристик (ASI) или Черта"],
            actionSurges: 1,
            indomitable: 2,
            asi: true
        },
        17: {
            features: ["Всплеск действий (2 использования)", "Непреклонность (3 использования)"],
            actionSurges: 2,
            indomitable: 3
        },
        18: {
            features: ["Способность подкласса"],
            actionSurges: 2,
            indomitable: 3
        },
        19: {
            features: ["Увеличение характеристик (ASI) или Черта"],
            actionSurges: 2,
            indomitable: 3,
            asi: true
        },
        20: {
            features: ["Дополнительная атака (3)"],
            actionSurges: 2,
            indomitable: 3
        }
    }
};
