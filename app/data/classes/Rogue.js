/**
 * classes/rogue.js
 * Прогрессия класса "Плут" с 1 по 20 уровень (D&D 5e)
 */

window.rogueProgression = {
    className: "Плут",
    hitDie: 8,
    levels: {
        1: {
            features: ["Экспертиза", "Скрытая атака (1d6)", "Воровской жаргон"],
            sneakAttackDice: 1
        },
        2: {
            features: ["Действие схитростью"],
            sneakAttackDice: 1
        },
        3: {
            features: ["Шерстяной архетип (Подкласс)", "Убийственный удар / иное"],
            sneakAttackDice: 2,
            subclassLevel: true // Флаг для интерфейса: пора выбирать подкласс
        },
        4: {
            features: ["Увеличение характеристик (ASI) или Черта"],
            sneakAttackDice: 2,
            asi: true
        },
        5: {
            features: ["Невероятное уклонение"],
            sneakAttackDice: 3
        },
        6: {
            features: ["Экспертиза"],
            sneakAttackDice: 3
        },
        7: {
            features: ["Ускользание"],
            sneakAttackDice: 4
        },
        8: {
            features: ["Увеличение характеристик (ASI) или Черта"],
            sneakAttackDice: 4,
            asi: true
        },
        9: {
            features: ["Способность подкласса"],
            sneakAttackDice: 5
        },
        10: {
            features: ["Увеличение характеристик (ASI) или Черта"],
            sneakAttackDice: 5,
            asi: true
        },
        11: {
            features: ["Надежный талант"],
            sneakAttackDice: 6
        },
        12: {
            features: ["Увеличение характеристик (ASI) или Черта"],
            sneakAttackDice: 6,
            asi: true
        },
        13: {
            features: ["Способность подкласса"],
            sneakAttackDice: 7
        },
        14: {
            features: ["Слепые чувствА"],
            sneakAttackDice: 7
        },
        15: {
            features: ["Скользкий ум"],
            sneakAttackDice: 8
        },
        16: {
            features: ["Увеличение характеристик (ASI) или Черта"],
            sneakAttackDice: 8,
            asi: true
        },
        17: {
            features: ["Способность подкласса"],
            sneakAttackDice: 9
        },
        18: {
            features: ["Ускользание от смерти (Эвазión / Ускользание) / Неуловимость"],
            sneakAttackDice: 9
        },
        19: {
            features: ["Увеличение характеристик (ASI) или Черта"],
            sneakAttackDice: 10,
            asi: true
        },
        20: {
            features: ["Удача на вашей стороне (Удар судьбы)"],
            sneakAttackDice: 10
        }
    }
};
