/**
 * Alchemist.js
 * Карманный ВТТ — независимая структура прогрессии класса «Алхимик».
 *
 * Источник концепции: The Alchemist by Taron Pounds / Indestructoboy Designs.
 * ВАЖНО: файл содержит собственную структуру данных проекта и краткие
 * пересказы механик, а не копию текста/иллюстраций исходного продукта.
 *
 * Архитектура:
 * - d8, основной параметр INT;
 * - класс не является заклинателем: основной ресурс — формулы и алхимические
 *   предметы;
 * - отдельная система формул/сырья/быстрого создания будет подключена позже;
 * - подклассы хранятся в subclassesRegistry.js.
 */
window.alchemistProgression = {
    className: "Алхимик",
    englishName: "Alchemist",
    source: "Taron Pounds / Indestructoboy Designs / third-party",
    status: "skeleton",
    edition: "5E",
    hitDie: 8,
    primaryStat: "intelligence",
    savingThrows: ["constitution", "intelligence"],
    armor: ["light"],
    weapons: ["simple", "blowgun"],
    tools: ["alchemist_supplies", "herbalism_kit"],
    multiclassRequirement: { intelligence: 13 },
    multiclassProficiencies: { armor: ["light"], weapons: ["simple", "blowgun"] },
    skills: {
        choose: 2,
        from: ["arcana", "deception", "insight", "medicine", "nature", "sleightOfHand", "survival"]
    },
    subclassLevel: 2,
    subclassFeatureLevels: [2, 6, 10, 14],

    levels: {
        1: {
            features: [
                "Экспериментатор",
                "Алхимия: формулы",
                "Алхимия: Катализ",
                "Алхимия: Потентность"
            ]
        },
        2: {
            features: ["Алхимическая практика (подкласс)"],
            subclassLevel: true
        },
        3: {
            features: [
                "Эврика",
                "Методичная эффективность"
            ]
        },
        4: {
            features: ["Увеличение характеристик (ASI) или Черта"],
            asi: true
        },
        5: {
            features: ["Усиленные декокции"]
        },
        6: {
            features: ["Алхимическая практика: развитие"]
        },
        7: {
            features: ["Смешивание"]
        },
        8: {
            features: ["Увеличение характеристик (ASI) или Черта"],
            asi: true
        },
        9: {
            features: [
                "Эврика: необычные зелья",
                "Меркуриальный поток"
            ]
        },
        10: {
            features: ["Алхимическая практика: развитие"]
        },
        11: {
            features: ["Летучая мощь"]
        },
        12: {
            features: ["Увеличение характеристик (ASI) или Черта"],
            asi: true
        },
        13: {
            features: [
                "Эврика: редкие зелья",
                "Разум сильнее материи"
            ]
        },
        14: {
            features: ["Алхимическая практика: развитие"]
        },
        15: {
            features: ["Философский камень"]
        },
        16: {
            features: ["Увеличение характеристик (ASI) или Черта"],
            asi: true
        },
        17: {
            features: ["Усиление летучей мощи"]
        },
        18: {
            features: ["Молния в бутылке", "Эврика: очень редкие зелья"]
        },
        19: {
            features: ["Увеличение характеристик (ASI) или Черта"],
            asi: true
        },
        20: {
            features: ["Большой взрыв"]
        }
    },

    /**
     * Метаданные будущей цифровой системы алхимика.
     * Пока не подключаются к боевому движку — это контракт для следующего этапа.
     */
    mechanics: {
        formulaLearning: true,
        craftingResource: "raw_materials",
        fastCrafting: "catalyze",
        potionCreation: "eureka",
        combineItems: "mix",
        rareMaterialSubstitution: "mercurial_flux",
        philosopherStone: true,
        initiativeCapstone: "big_bang"
    }
};
