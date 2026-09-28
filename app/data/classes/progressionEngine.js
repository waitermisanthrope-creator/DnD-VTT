/**
 * ДОРАБОТКА: движок прогрессии класса/подкласса.
 * Автоматически добавляет частичные владения при НОВОМ мультиклассе по таблице D&D 5e 2014
 * (без дублирования), регистрирует отдельную заклинательную характеристику класса
 * и хранит её в hero.spellcastingSources.
 * Основные переменные: hero.classes, hero.proficiencies, hero.skillsData,
 * hero.spellcastingSources, window.PROFICIENCIES_DB.
 */

/**
 * classes/progressionEngine.js
 * ------------------------------------------------------------------
 * ЧТО ЭТО ЗА ФАЙЛ:
 * Движок интеграции прогрессии персонажа. Подтягивает способности класса
 * (а теперь и подкласса) и обновляет их числовые параметры при повышении
 * уровня. Раньше умел работать только с классами (classesRegistry.js);
 * теперь также читает subclasses/subclassesRegistry.js и умеет применять
 * способности выбранного архетипа/домена/школы/традиции.
 *
 * КАК ЭТО РАБОТАЕТ:
 * - applyClassProgression(hero, className, targetLevel) — как и раньше,
 *   добавляет фичи и ресурсы базового класса на конкретном уровне.
 *   Дополнительно теперь САМА проверяет: если у этого класса в hero.classes
 *   уже выбран подкласс (поле .subclass), она сразу же вызывает
 *   applySubclassProgression(...) для того же уровня — то есть вызывающему
 *   коду (level_up.js, character_creation.js) достаточно вызвать только
 *   applyClassProgression, и способности подкласса подтянутся сами.
 * - applySubclassProgression(hero, className, subclassName, targetLevel) —
 *   новая функция. Ищет данные подкласса в window.SUBCLASSES_REFERENCE
 *   (через window.getSubclassData) и добавляет его фичи уровня в
 *   hero.features, не дублируя уже добавленные строки.
 * - chooseSubclass(hero, className, subclassName, currentLevelInClass) —
 *   новая функция. Записывает выбранный подкласс в hero.classes[i].subclass
 *   и догоняет (применяет) все способности подкласса вплоть до текущего
 *   уровня в классе.
 *
 * КАКИЕ ПЕРЕМЕННЫЕ/ГЛОБАЛЫ ИСПОЛЬЗУЕТ:
 * - window.getClassData(className)            <- classesRegistry.js
 * - window.getSubclassData(className, sub)     <- subclasses/subclassesRegistry.js
 * - hero.features   (string[])  — общий список отображаемых способностей
 * - hero.classes    ({name, level, subclass}[]) — массив классов персонажа
 * - hero.sneakAttackDice, hero.ragesCount, hero.rageDamageBonus,
 *   hero.kiPoints, hero.sorceryPoints — числовые параметры отдельных классов
 * - window.pendingLevelUpData.hasAsi / .needsSubclassChoice — флаги для UI
 *   модалки повышения уровня (classes/level_up.js)
 * ------------------------------------------------------------------
 */

/**
 * Добавляет строки способностей в hero.features без дублирования.
 * @param {Object} hero
 * @param {string[]} featureList
 */
function _mergeFeatures(hero, featureList) {
    if (!featureList || !Array.isArray(featureList) || featureList.length === 0) return;
    if (!hero.features) hero.features = [];
    featureList.forEach(feature => {
        if (!hero.features.includes(feature)) {
            hero.features.push(feature);
            console.log(`+ Получена способность: "${feature}"`);
        }
    });
}

/**
 * Применяет прогрессию уровня БАЗОВОГО КЛАССА к объекту персонажа,
 * а также (если уже выбран) прогрессию подкласса на этом же уровне.
 * @param {Hero|Object} hero - Объект персонажа (currentChar/currentCharacter)
 * @param {string} className - Название класса (например, "Плут")
 * @param {number} targetLevel - Уровень В ЭТОМ КЛАССЕ, на который поднимается персонаж
 */

/**
 * Частичные владения при мультиклассе по таблице D&D 5e 2014.
 * Фиксированные владения добавляются автоматически без дублей; варианты "на выбор"
 * сохраняются как pendingProficiencyChoices и разрешаются UI повышения уровня.
 */
const MULTICLASS_PROFICIENCIES_2014 = {
    "Алхимик": { fixed: ["p_armor_light", "p_weapon_simple", "p_tool_alchemist", "p_tool_herbalism"] },
    "Кровавый охотник": { fixed: ["p_armor_light", "p_armor_medium", "p_shields", "p_weapon_simple", "p_weapon_martial", "p_tool_alchemist"], choices: [{ type: "skill", count: 1, label: "Навык Кровавого охотника" }] },
    "Варвар": { fixed: ["p_shields", "p_weapon_simple", "p_weapon_martial"] },
    "Бард": { fixed: ["p_armor_light"], choices: [{ type: "skill", count: 1, label: "Навык Барда" }, { type: "instrument", count: 1, label: "Музыкальный инструмент Барда" }] },
    "Воин": { fixed: ["p_armor_light", "p_armor_medium", "p_armor_heavy", "p_shields", "p_weapon_simple", "p_weapon_martial"] },
    "Волшебник": { fixed: [] },
    "Друид": { fixed: ["p_armor_light", "p_armor_medium", "p_shields"] },
    "Жрец": { fixed: ["p_armor_light", "p_armor_medium", "p_shields"] },
    "Изобретатель": { fixed: ["p_armor_light", "p_armor_medium", "p_shields", "p_tool_thief"] },
    "Монах": { fixed: ["p_weapon_simple", "p_weap_shortsword"] },
    "Паладин": { fixed: ["p_armor_light", "p_armor_medium", "p_armor_heavy", "p_shields", "p_weapon_simple", "p_weapon_martial"] },
    "Плут": { fixed: ["p_armor_light", "p_tool_thief"], choices: [{ type: "skill", count: 1, label: "Навык Плута" }] },
    "Следопыт": { fixed: ["p_armor_light", "p_armor_medium", "p_shields", "p_weapon_simple", "p_weapon_martial"], choices: [{ type: "skill", count: 1, label: "Навык Следопыта" }] },
    "Чародей": { fixed: [] },
    "Колдун": { fixed: ["p_armor_light", "p_weapon_simple"] }
};

const CLASS_SPELLCASTING_ABILITIES_2014 = {
    "Бард": "cha", "Друид": "wis", "Жрец": "wis", "Паладин": "cha",
    "Следопыт": "wis", "Чародей": "cha", "Колдун": "cha", "Волшебник": "int", "Изобретатель": "int"
};

function getSpellcastingAbilityForClass(className) {
    return CLASS_SPELLCASTING_ABILITIES_2014[className] || null;
}

function _ensureUniqueProficiency(hero, profId, fallbackName, category) {
    if (!hero || !profId) return false;
    if (!Array.isArray(hero.proficiencies)) hero.proficiencies = [];
    if (hero.proficiencies.some(p => p && p.id === profId)) return false;
    const db = Array.isArray(window.PROFICIENCIES_DB) ? window.PROFICIENCIES_DB : [];
    const found = db.find(p => p && p.id === profId);
    hero.proficiencies.push(found ? Object.assign({}, found) : {
        id: profId, category: category || "Мультикласс", name: fallbackName || profId,
        description: "Получено при мультиклассировании."
    });
    return true;
}

function _registerSpellcastingSource(hero, className) {
    const ability = getSpellcastingAbilityForClass(className);
    if (!ability) return;
    if (!Array.isArray(hero.spellcastingSources)) hero.spellcastingSources = [];
    if (!hero.spellcastingSources.some(s => s && s.className === className)) {
        hero.spellcastingSources.push({ className: className, ability: ability });
    }
    if (!hero.spellStat) hero.spellStat = ability;
}

function applyMulticlassProficiencies(hero, className, isNewClass) {
    if (!hero || !isNewClass) return { added: [], choices: [] };
    const rules = MULTICLASS_PROFICIENCIES_2014[className] || { fixed: [] };
    const added = [];
    (rules.fixed || []).forEach(id => { if (_ensureUniqueProficiency(hero, id)) added.push(id); });
    if (!Array.isArray(hero.pendingProficiencyChoices)) hero.pendingProficiencyChoices = [];
    const choices = (rules.choices || []).map(c => ({ type:c.type, count:c.count||1, label:c.label, className:className }));
    choices.forEach(c => hero.pendingProficiencyChoices.push(c));
    _registerSpellcastingSource(hero, className);
    if (typeof renderProficienciesBlock === "function") renderProficienciesBlock();
    return { added: added, choices: choices };
}

function resolveMulticlassProficiencyChoice(hero, choice, selectedIds) {
    if (!hero || !choice) return false;
    const ids = Array.isArray(selectedIds) ? selectedIds : [selectedIds];
    ids.filter(Boolean).forEach(id => {
        if (choice.type === "skill") {
            if (!hero.skillsData) hero.skillsData = {};
            hero.skillsData[id] = Math.max(1, Number(hero.skillsData[id]) || 0);
            if (!hero.skills) hero.skills = {};
            hero.skills[id] = "proficient";
            const skill = Array.isArray(window.SKILLS_CONFIG) ? window.SKILLS_CONFIG.find(s => s.id === id) : null;
            _ensureUniqueProficiency(hero, "skill_" + id, skill ? skill.name : id, "Навыки");
        } else if (choice.type === "instrument") {
            _ensureUniqueProficiency(hero, id, null, "Музыкальные инструменты");
        }
    });
    hero.pendingProficiencyChoices = (hero.pendingProficiencyChoices || []).filter(c =>
        !(c && choice && c.type === choice.type && c.className === choice.className)
    );
    if (typeof autoSaveCurrentCharacter === "function") autoSaveCurrentCharacter();
    if (typeof renderProficienciesBlock === "function") renderProficienciesBlock();
    return true;
}

window.MULTICLASS_PROFICIENCIES_2014 = MULTICLASS_PROFICIENCIES_2014;
window.CLASS_SPELLCASTING_ABILITIES_2014 = CLASS_SPELLCASTING_ABILITIES_2014;
window.getSpellcastingAbilityForClass = getSpellcastingAbilityForClass;
window.applyMulticlassProficiencies = applyMulticlassProficiencies;
window.resolveMulticlassProficiencyChoice = resolveMulticlassProficiencyChoice;

function applyClassProgression(hero, className, targetLevel) {
    // Безопасное получение данных класса (поддерживает как глобальную функцию, так и метод из window)
    const getData = typeof getClassData === 'function' ? getClassData : (window.getClassData || (() => null));
    const classData = getData(className);

    if (!classData || !classData.progression) {
        console.log(`Для класса "${className}" пока нет файла прогрессии.`);
        return;
    }

    const levelData = classData.progression.levels[targetLevel];
    if (!levelData) {
        console.log(`Уровень ${targetLevel} для класса "${className}" не найден в прогрессии.`);
        return;
    }

    console.log(`--- Применяем прогрессию: ${className} (Уровень ${targetLevel}) ---`);

    // 1. Добавляем новые способности/фичи класса в структуру персонажа
    _mergeFeatures(hero, levelData.features);

    // 2. Обработка специфических параметров классов

    // Плут: Скрытая атака
    if (levelData.sneakAttackDice !== undefined) {
        hero.sneakAttackDice = levelData.sneakAttackDice;
        console.log(`⚔️ Урон Скрытой атаки обновлен: ${hero.sneakAttackDice}d6`);
    }

    // Варвар: Ярость
    if (levelData.ragesCount !== undefined) {
        hero.ragesCount = levelData.ragesCount;
        console.log(`💢 Количество яростей обновлено: ${hero.ragesCount}`);
    }
    if (levelData.rageDamageBonus !== undefined) {
        hero.rageDamageBonus = levelData.rageDamageBonus;
        console.log(`💥 Бонус к урону от ярости: +${levelData.rageDamageBonus}`);
    }

    // Монах: Очки Ци
    if (levelData.kiPoints !== undefined) {
        hero.kiPoints = levelData.kiPoints;
        console.log(`🧘 Очки Ци (Ki) обновлены: ${hero.kiPoints}`);
    }

    // Чародей: Очки истока магии
    if (levelData.sorceryPoints !== undefined) {
        hero.sorceryPoints = levelData.sorceryPoints;
        console.log(`✨ Очки истока магии обновлены: ${hero.sorceryPoints}`);
    }

    // 3. Проверка на необходимость выбора подкласса
    if (levelData.subclassLevel) {
        console.log(`🌟 Внимание! Доступен выбор подкласса для класса "${className}".`);
        if (window.pendingLevelUpData) {
            window.pendingLevelUpData.needsSubclassChoice = true;
        }
    }

    // 4. Проверка на ASI (Увеличение характеристик или черта)
    if (levelData.asi) {
        console.log(`📈 Доступно увеличение характеристик (ASI) или выбор черты!`);
        if (window.pendingLevelUpData) {
            window.pendingLevelUpData.hasAsi = true;
        }
    }

    // 5. Если у этого класса УЖЕ выбран подкласс — сразу подтягиваем и его
    //    фичи для этого же уровня (например, домен клерика даёт способность
    //    на 2, 6, 8 и 17 уровне классов, а не только в момент выбора на 1-м).
    let subclassName = null;
    if (hero.classes && Array.isArray(hero.classes)) {
        const entry = hero.classes.find(c => c.name === className);
        if (entry && entry.subclass) subclassName = entry.subclass;
    } else if (hero.subclass) {
        subclassName = hero.subclass;
    }

    if (subclassName) {
        applySubclassProgression(hero, className, subclassName, targetLevel);
    }
}

/**
 * Применяет прогрессию уровня ПОДКЛАССА к объекту персонажа.
 * Ничего не делает, если для класса/подкласса/уровня нет данных —
 * это нормально (не на каждом уровне подкласс даёт новую способность).
 * @param {Hero|Object} hero
 * @param {string} className
 * @param {string} subclassName
 * @param {number} targetLevel
 */
function applySubclassProgression(hero, className, subclassName, targetLevel) {
    const getSub = typeof window.getSubclassData === 'function' ? window.getSubclassData : null;
    if (!getSub) {
        console.log('[progressionEngine] subclassesRegistry.js не загружен — пропускаем прогрессию подкласса.');
        return;
    }

    let subData = getSub(className, subclassName);
    if (!subData && window.DNDContent && window.DNDContent.getClass) {
        const pack = window.DNDContent.getClass(className);
        const sub = pack && (pack.subclasses || []).find(s => s.name === subclassName || s.id === subclassName);
        if (sub) {
            const feats = {};
            (sub.features || []).forEach(f => { feats[f.level] = feats[f.level] || []; feats[f.level].push(f.name || f.id); });
            subData = { levels: Object.keys(feats).reduce((o,k)=>{o[k]={features:feats[k]};return o;}, {}) };
        }
    }
    if (!subData || !subData.levels) {
        console.log(`Для подкласса "${subclassName}" (${className}) нет файла прогрессии.`);
        return;
    }

    const levelData = subData.levels[targetLevel];
    if (!levelData) return; // На этом уровне подкласс не даёт новых способностей — это ок

    console.log(`--- Применяем прогрессию подкласса: ${subclassName} [${className}] (Уровень ${targetLevel}) ---`);
    _mergeFeatures(hero, levelData.features);
}

/**
 * Назначает подкласс конкретному классу персонажа и сразу применяет
 * все его способности, накопленные до targetLevel включительно
 * (полезно, если подкласс выбирают "задним числом" не на уровне выбора).
 * @param {Hero|Object} hero
 * @param {string} className
 * @param {string} subclassName
 * @param {number} currentLevelInClass
 */
function chooseSubclass(hero, className, subclassName, currentLevelInClass) {
    if (!hero) return false;
    if (!hero.classes || !Array.isArray(hero.classes)) hero.classes = [];

    let entry = hero.classes.find(c => c.name === className);
    if (!entry) {
        entry = { name: className, level: currentLevelInClass || 1, subclass: null };
        hero.classes.push(entry);
    }
    entry.subclass = subclassName;

    // Догоняем все уровни подкласса вплоть до текущего уровня в классе
    const upTo = currentLevelInClass || entry.level || 1;
    for (let lvl = 1; lvl <= upTo; lvl++) {
        applySubclassProgression(hero, className, subclassName, lvl);
    }

    if (typeof autoSaveCurrentCharacter === 'function') autoSaveCurrentCharacter();
    return true;
}

window.applyClassProgression = applyClassProgression;
window.applySubclassProgression = applySubclassProgression;
window.chooseSubclass = chooseSubclass;
