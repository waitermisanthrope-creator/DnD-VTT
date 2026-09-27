/**
 * classes/monk.js
 * Прогрессия класса "Монах" с 1 по 20 уровень (D&D 5e)
 */

window.monkProgression = {
    className: "Монах",
    hitDie: 8,
    levels: {
        1: { features: ["Защита без доспехов", "Монастырское оружие (Боевые искусства)"], kiPoints: 0 },
        2: { features: ["Ци (Ки)", "Невероятная скорость"], kiPoints: 2 },
        3: { features: ["Монастырская традиция (Подкласс)", "Ступни ветра / Терпеливая оборона / Шквал ударов"], kiPoints: 3, subclassLevel: true },
        4: { features: ["Увеличение характеристик (ASI) или Черта", "Медленное падение"], kiPoints: 4, asi: true },
        5: { features: ["Дополнительная атака", "Удар Оцепенения"], kiPoints: 5 },
        6: { features: ["Чистые удары (Магические атаки)", "Способность подкласса"], kiPoints: 6 },
        7: { features: ["Уклонение", "Цельность тела"], kiPoints: 7 },
        8: { features: ["Увеличение характеристик (ASI) или Черта"], kiPoints: 8, asi: true },
        9: { features: ["Невероятная скорость (улучшение)"], kiPoints: 9 },
        10: { features: ["Чистый разум", "Тихий язык (Язык солнца и луны)"], kiPoints: 10 },
        11: { features: ["Способность подкласса"], kiPoints: 11 },
        12: { features: ["Увеличение характеристик (ASI) или Черта"], kiPoints: 12, asi: true },
        13: { features: ["Язык солнца и луны"], kiPoints: 13 },
        14: { features: ["Алмазная душа"], kiPoints: 14 },
        15: { features: ["Пустой телом"], kiPoints: 15 },
        16: { features: ["Увеличение характеристик (ASI) или Черта"], kiPoints: 16, asi: true },
        17: { features: ["Способность подкласса"], kiPoints: 17 },
        18: { features: ["Пустой телом (улучшение)"], kiPoints: 18 },
        19: { features: ["Увеличение характеристик (ASI) или Черта"], kiPoints: 19, asi: true },
        20: { features: ["Совершенное Ци"], kiPoints: 20 }
    }
};
