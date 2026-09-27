/**
 * classes/sorcerer.js
 * Прогрессия класса "Чародей" с 1 по 20 уровень (D&D 5e)
 */

window.sorcererProgression = {
    className: "Чародей",
    hitDie: 6,
    levels: {
        1: { features: ["Использование заклинаний", "Чародейское происхождение (Подкласс)"], sorceryPoints: 0, subclassLevel: true },
        2: { features: ["Исток магии", "Метамагия"], sorceryPoints: 2 },
        3: { features: [], sorceryPoints: 3 },
        4: { features: ["Увеличение характеристик (ASI) или Черта"], sorceryPoints: 4, asi: true },
        5: { features: [], sorceryPoints: 5 },
        6: { features: ["Способность происхождения"], sorceryPoints: 6 },
        7: { features: [], sorceryPoints: 7 },
        8: { features: ["Увеличение характеристик (ASI) или Черта"], sorceryPoints: 8, asi: true },
        9: { features: [], sorceryPoints: 9 },
        10: { features: ["Дополнительная метамагия"], sorceryPoints: 10 },
        11: { features: [], sorceryPoints: 11 },
        12: { features: ["Увеличение характеристик (ASI) или Черта"], sorceryPoints: 12, asi: true },
        13: { features: [], sorceryPoints: 13 },
        14: { features: ["Способность происхождения"], sorceryPoints: 14 },
        15: { features: [], sorceryPoints: 15 },
        16: { features: ["Увеличение характеристик (ASI) или Черта"], sorceryPoints: 16, asi: true },
        17: { features: ["Дополнительная метамагия"], sorceryPoints: 17 },
        18: { features: ["Способность происхождения"], sorceryPoints: 18 },
        19: { features: ["Увеличение характеристик (ASI) или Черта"], sorceryPoints: 19, asi: true },
        20: { features: ["Восстановление истока магии"], sorceryPoints: 20 }
    }
};
