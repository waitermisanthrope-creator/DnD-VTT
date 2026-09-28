/**
 * classesRegistry.js
 * ------------------------------------------------------------------
 * ЧТО ЭТО ЗА ФАЙЛ:
 * Единый реестр базовых параметров (кость хитов, основная характеристика,
 * спасброски) и полной прогрессии по уровням для всех 13 классов D&D 5e.
 * Сами таблицы прогрессии лежат в classes/<ИмяКласса>.js (например,
 * classes/Fighter.js -> window.fighterProgression) и просто подключаются
 * сюда по ссылке.
 *
 * КАК ЭТО РАБОТАЕТ:
 * - window.CLASSES_REFERENCE — объект { "Название класса": {...} },
 *   ключи — русские названия классов (важно: они используются как ID
 *   класса во всём проекте, в т.ч. в hero.classes[i].name).
 * - window.getClassData(className) — безопасный геттер с обрезкой пробелов.
 * - window.getSubclassesForClass(className) — тонкая обёртка над
 *   window.getAvailableSubclasses из subclasses/subclassesRegistry.js,
 *   чтобы UI мог обращаться к подклассам через тот же реестр классов,
 *   не заботясь о том, в каком файле физически лежат данные подклассов.
 *
 * КАКИЕ ПЕРЕМЕННЫЕ ИСПОЛЬЗУЕТ:
 * - window.bardProgression, window.barbarianProgression, ... — по одному
 *   объекту прогрессии на класс, создаются в classes/<Класс>.js. Этот файл
 *   должен подключаться в index.html ПОСЛЕ всех classes/<Класс>.js.
 * - window.getAvailableSubclasses (опционально) <- subclasses/subclassesRegistry.js
 * ------------------------------------------------------------------
 */

window.CLASSES_REFERENCE = {
    "Алхимик": { hitDie: 8, primaryStat: "intelligence", savingThrows: ["constitution", "intelligence"], progression: window.alchemistProgression || {} },
    "Кровавый охотник": { hitDie: 10, primaryStat: "dexterity", savingThrows: ["dexterity", "intelligence"], progression: window.bloodHunterProgression || {} },
    "Иллирригер": { hitDie: 10, primaryStat: "strength", savingThrows: ["strength", "charisma"], progression: window.illriggerProgression || {} },
    "Бистхарт": { hitDie: 10, primaryStat: "strength", savingThrows: ["strength", "wisdom"], progression: window.beastheartProgression || {} },
    "Пугилист": { hitDie: 10, primaryStat: "strength", savingThrows: ["strength", "constitution"], progression: window.pugilistProgression || {} },
    "Бард": {
        hitDie: 8,
        primaryStat: "charisma",
        savingThrows: ["dexterity", "charisma"],
        progression: window.bardProgression || {}
    },
    "Варвар": {
        hitDie: 12,
        primaryStat: "strength",
        savingThrows: ["strength", "constitution"],
        progression: window.barbarianProgression || {}
    },
    "Воин": {
        hitDie: 10,
        primaryStat: "strength",
        savingThrows: ["strength", "constitution"],
        progression: window.fighterProgression || {}
    },
    "Волшебник": {
        hitDie: 6,
        primaryStat: "intelligence",
        savingThrows: ["intelligence", "wisdom"],
        progression: window.wizardProgression || {}
    },
    "Друид": {
        hitDie: 8,
        primaryStat: "wisdom",
        savingThrows: ["intelligence", "wisdom"],
        progression: window.druidProgression || {}
    },
    "Изобретатель": {
        hitDie: 8,
        primaryStat: "intelligence",
        savingThrows: ["constitution", "intelligence"],
        progression: window.artificerProgression || {}
    },
    "Жрец": {
        hitDie: 8,
        primaryStat: "wisdom",
        savingThrows: ["wisdom", "charisma"],
        progression: window.clericProgression || {}
    },
    "Монах": {
        hitDie: 8,
        primaryStat: "dexterity",
        savingThrows: ["strength", "dexterity"],
        progression: window.monkProgression || {}
    },
    "Паладин": {
        hitDie: 10,
        primaryStat: "strength",
        savingThrows: ["wisdom", "charisma"],
        progression: window.paladinProgression || {}
    },
    "Плут": {
        hitDie: 8,
        primaryStat: "dexterity",
        savingThrows: ["dexterity", "intelligence"],
        progression: window.rogueProgression || {}
    },
    "Следопыт": {
        hitDie: 10,
        primaryStat: "dexterity",
        savingThrows: ["strength", "dexterity"],
        progression: window.rangerProgression || {}
    },
    "Чародей": {
        hitDie: 6,
        primaryStat: "charisma",
        savingThrows: ["constitution", "charisma"],
        progression: window.sorcererProgression || {}
    },
    "Колдун": {
        hitDie: 8,
        primaryStat: "charisma",
        savingThrows: ["wisdom", "charisma"],
        progression: window.warlockProgression || {}
    }
};

/**
 * Глобальный хелпер для получения данных конкретного класса
 */
window.getClassData = function(className) {
    if (!className) return null;
    return window.CLASSES_REFERENCE[className.trim()] || null;
};

/**
 * Тонкая обёртка: список подклассов конкретного класса, независимо от того,
 * что данные подклассов физически лежат в отдельном файле-реестре.
 */
window.getSubclassesForClass = function(className) {
    if (typeof window.getAvailableSubclasses === 'function') {
        return window.getAvailableSubclasses(className);
    }
    return [];
};
