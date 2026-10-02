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
    "Оккультист": { hitDie: 6, primaryStat: "wisdom", savingThrows: ["wisdom", "charisma"], progression: window.occultistProgression || {} },
    "Ведьма": { hitDie: 8, primaryStat: "charisma", savingThrows: ["wisdom", "charisma"], progression: window.witchProgression || {} },
    "Некромант": { hitDie: 6, primaryStat: "intelligence", savingThrows: ["constitution", "intelligence"], progression: window.necromancerProgression || {} },
    "Мученик": { hitDie: 12, primaryStat: "wisdom", savingThrows: ["strength", "wisdom"], progression: window.martyrProgression || {} },
    "Сосуд": { hitDie: 10, primaryStat: "charisma", savingThrows: ["constitution", "charisma"], progression: window.vesselProgression || {} },
    "Алхимик": { hitDie: 8, primaryStat: "dexterity", savingThrows: ["dexterity", "intelligence"], progression: window.alchemistProgression || {} },
    "Циркач": { hitDie: 8, primaryStat: "charisma", savingThrows: ["dexterity", "charisma"], progression: window.circusProgression || {} },
    "Кровавый охотник": { hitDie: 10, primaryStat: "dexterity", savingThrows: ["dexterity", "intelligence"], progression: window.bloodHunterProgression || {} },
    "Иллиригер": { hitDie: 10, primaryStat: "charisma", savingThrows: ["constitution", "charisma"], progression: window.illriggerProgression || {} },
    "Бистхарт": { hitDie: 8, primaryStat: "strength", savingThrows: ["strength", "wisdom"], progression: window.beastheartProgression || {} },
    "Пугилист": { hitDie: 8, primaryStat: "strength", savingThrows: ["strength", "constitution"], progression: window.pugilistProgression || {} },
    "Аккурсд": { hitDie: 10, primaryStat: "curseAbility", savingThrows: ["wisdom", "intelligence_or_charisma"], progression: window.accursedProgression || {} },
    "Гайст": { hitDie: 8, primaryStat: "wisdom", savingThrows: ["wisdom", "charisma"], progression: window.geistProgression || {} },
    "Паразит": { hitDie: 8, primaryStat: "wisdom", savingThrows: ["wisdom", "intelligence"], isExtra: true, isRaceClassHybrid: true, replacesRace: true, multiclassAllowed: false, progression: window.parasiteProgression || {} },
    "Паразит доктора Вальтера": { hitDie: 10, primaryStat: "highest_stat", savingThrows: ["constitution", "dexterity"], isExtra: true, isRaceClassHybrid: true, replacesRace: true, multiclassAllowed: false, progression: window.walterParasiteProgression || {} },
    "Призрак": { hitDie: 8, primaryStat: "charisma", savingThrows: ["wisdom", "charisma"], isExtra: true, isRaceClassHybrid: true, replacesRace: true, multiclassAllowed: false, progression: window.ghostProgression || {} },
    "Псионик": { hitDie: 6, primaryStat: "intelligence", savingThrows: ["intelligence", "wisdom"], progression: window.psionProgression || {} },
    "Рунный хранитель": { hitDie: 8, primaryStat: "intelligence", savingThrows: ["intelligence", "wisdom"], progression: window.runeKeeperProgression || {} },
    "Савант": { hitDie: 8, primaryStat: "intelligence", savingThrows: ["intelligence", "wisdom"], progression: window.savantProgression || {} },
    "Шифтер": { hitDie: 10, primaryStat: "dexterity", savingThrows: ["dexterity", "wisdom"], progression: window.shifterProgression || {} },
    "Рой": { hitDie: 8, primaryStat: "constitution", savingThrows: ["constitution", "dexterity"], isExtra: true, replacesRace: true, multiclassAllowed: false, progression: window.swarmProgression || {} },
    "Страж": { hitDie: 10, primaryStat: "constitution", savingThrows: ["strength", "constitution"], progression: window.wardenProgression || {} },
    "Военачальник": { hitDie: 8, primaryStat: "strength_or_dexterity", savingThrows: ["wisdom", "charisma"], progression: window.warlordProgression || {} },
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
 * Runtime-прогрессии загружаются в index.html ПОСЛЕ classesRegistry.js.
 * Поэтому нельзя навсегда сохранять window.xxxProgression в момент загрузки
 * реестра: иначе custom/runtime-классы получают пустую таблицу levels.
 */
var LIVE_PROGRESSION_KEYS = {
    "Оккультист": "occultistProgression", "Ведьма": "witchProgression", "Некромант": "necromancerProgression", "Мученик": "martyrProgression", "Сосуд": "vesselProgression", "Алхимик": "alchemistProgression", "Циркач": "circusProgression", "Кровавый охотник": "bloodHunterProgression", "Иллиригер": "illriggerProgression", "Бистхарт": "beastheartProgression", "Пугилист": "pugilistProgression", "Аккурсд": "accursedProgression", "Гайст": "geistProgression", "Паразит": "parasiteProgression", "Паразит доктора Вальтера": "walterParasiteProgression", "Призрак": "ghostProgression", "Псионик": "psionProgression", "Рунный хранитель": "runeKeeperProgression", "Савант": "savantProgression", "Шифтер": "shifterProgression", "Рой": "swarmProgression", "Страж": "wardenProgression", "Военачальник": "warlordProgression"
};

/**
 * Глобальный хелпер для получения данных конкретного класса
 */
window.getClassData = function(className) {
    if (!className) return null;
    var key = className.trim();
    var base = window.CLASSES_REFERENCE[key] || null;
    var liveKey = LIVE_PROGRESSION_KEYS[key];
    var live = liveKey ? window[liveKey] : null;
    if (live && typeof live === 'object' && Object.keys(live).length) {
        var merged = Object.assign({}, base || {}, live);
        merged.progression = live;
        if (!merged.hitDie && base) merged.hitDie = base.hitDie;
        return merged;
    }
    return base;
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
