/**
 * classes/barbarian.js
 * Прогрессия класса "Варвар" с 1 по 20 уровень (D&D 5e)
 */

 window.barbarianProgression = {
    className: "Варвар",
    hitDie: 12,
    levels: {
        1: {
            features: ["Ярость", "Защита без доспехов (Варвар)"],
            ragesCount: 2,
            rageDamageBonus: 2
        },
        2: {
            features: ["Безрассудная атака", "Чувство опасности"],
            ragesCount: 2,
            rageDamageBonus: 2
        },
        3: {
            features: ["Ветвящийся путь (Подкласс / Варварский архетип)"],
            ragesCount: 3,
            rageDamageBonus: 2,
            subclassLevel: true
        },
        4: {
            features: ["Увеличение характеристик (ASI) или Черта"],
            ragesCount: 3,
            rageDamageBonus: 2,
            asi: true
        },
        5: {
            features: ["Дополнительная атака", "Быстрое движение"],
            ragesCount: 3,
            rageDamageBonus: 2
        },
        6: {
            features: ["Способность подкласса (Бросок ярости и др.)"],
            ragesCount: 4,
            rageDamageBonus: 2
        },
        7: {
            features: ["Дикое чутье"],
            ragesCount: 4,
            rageDamageBonus: 2
        },
        8: {
            features: ["Увеличение характеристик (ASI) или Черта"],
            ragesCount: 4,
            rageDamageBonus: 2,
            asi: true
        },
        9: {
            features: ["Свирепый критический удар (Критический удар брута)"],
            ragesCount: 4,
            rageDamageBonus: 3
        },
        10: {
            features: ["Способность подкласса"],
            ragesCount: 4,
            rageDamageBonus: 3
        },
        11: {
            features: ["Несокрушимая ярость"],
            ragesCount: 4,
            rageDamageBonus: 3
        },
        12: {
            features: ["Увеличение характеристик (ASI) или Черта"],
            ragesCount: 5,
            rageDamageBonus: 3,
            asi: true
        },
        13: {
            features: ["Свирепый критический удар (2 кубика)"],
            ragesCount: 5,
            rageDamageBonus: 3
        },
        14: {
            features: ["Способность подкласса"],
            ragesCount: 5,
            rageDamageBonus: 3
        },
        15: {
            features: ["Непоколебимая ярость"],
            ragesCount: 5,
            rageDamageBonus: 3
        },
        16: {
            features: ["Увеличение характеристик (ASI) или Черта"],
            ragesCount: 5,
            rageDamageBonus: 4,
            asi: true
        },
        17: {
            features: ["Свирепый критический удар (3 кубика)"],
            ragesCount: 6,
            rageDamageBonus: 4
        },
        18: {
            features: ["Клич воина (Яростная мощь)"],
            ragesCount: 6,
            rageDamageBonus: 4
        },
        19: {
            features: ["Увеличение характеристик (ASI) или Черта"],
            ragesCount: 6,
            rageDamageBonus: 4,
            asi: true
        },
        20: {
            features: ["Первобытный чемпион"],
            ragesCount: "Бесконечно",
            rageDamageBonus: 4
        }
    }
};
