/**
 * ДОРАБОТКА: модель героя и требования мультикласса.
 * Поддерживает совместимые данные нескольких классов и заклинательных источников.
 * Основные переменные: hero.classes, hero.stats, hero.proficiencies, hero.spellcastingSources.
 */

/**
 * Hero-info.js
 * ------------------------------------------------------------------
 * ЧТО ЭТО ЗА ФАЙЛ:
 * Архитектура данных персонажа с поддержкой мультикласса, прогрессии
 * уровней, характеристик, черт и заклинаний.
 *
 * ВАЖНО: этот файл подключается как обычный <script>, а не как ES-модуль
 * (type="module"), поэтому здесь нельзя использовать import/export — раньше
 * это вызывало жёсткий SyntaxError в консоли браузера при загрузке страницы.
 * classesRegistry.js и progressionEngine.js кладут нужные данные и функции
 * в window (window.CLASSES_REFERENCE, applyClassProgression), поэтому просто
 * используем их оттуда напрямую — они уже подключены раньше этого файла.
 *
 * ВАЖНОЕ ДОПОЛНЕНИЕ (мультикласс):
 * Класс Hero ниже НИГДЕ в проекте не создаётся через `new Hero(...)` — само
 * приложение работает с обычным объектом-персонажем (`currentChar` /
 * `currentCharacter` в app.js). Поэтому его метод checkMulticlassRequirements
 * реально никогда не вызывался, а проверка характеристик для мультикласса
 * (минимум 13 в нужной характеристике — правило D&D 5e) нигде не применялась.
 * Чтобы это заработало на практике, ниже добавлены ДВЕ ГЛОБАЛЬНЫЕ функции,
 * которые работают с любым объектом персонажа (и с Hero, и с plain-object):
 *   - window.MULTICLASS_REQUIREMENTS — та же таблица, но доступна из любого
 *     файла (используется в classes/level_up.js для подсветки классов,
 *     которые персонажу пока рано брать вторым/третьим классом).
 *   - window.checkMulticlassRequirements(hero, className) — вернёт true/false
 *     и не требует, чтобы hero был экземпляром класса Hero.
 * ------------------------------------------------------------------
 */

// Официальные требования характеристик для мультикласса в D&D 5e (минимум 13)
const MULTICLASS_REQUIREMENTS = {
    "Оккультист": { wisdom: 13 },
    "Ведьма": { charisma: 13 },
    "Некромант": { intelligence: 13 },
    "Мученик": { wisdom: 13 },
    "Алхимик": { intelligence: 13 },
    "Бард": { charisma: 13 },
    "Варвар": { strength: 13 },
    "Воин": { strength: 13, dexterity: 13 }, // Достаточно одной из двух
    "Волшебник": { intelligence: 13 },
    "Друид": { wisdom: 13 },
    "Изобретатель": { intelligence: 13 },
    "Жрец": { wisdom: 13 },
    "Кровавый охотник": { dexterity: 13, intelligence: 13 },
    "Psion": { intelligence: 13 },
    "Warlord": { strength: 13, charisma: 13 },
    "Warden": { strength: 13, wisdom: 13 },
    "Spellblade": { dexterity: 13, intelligence: 13 },
    "Монах": { dexterity: 13, wisdom: 13 },
    "Паладин": { strength: 13, charisma: 13 },
    "Плут": { dexterity: 13 },
    "Следопыт": { dexterity: 13, wisdom: 13 },
    "Чародей": { charisma: 13 },
    "Колдун": { charisma: 13 }
};

class Hero {
    constructor(data = {}) {
        this.name = data.name || "Безымянный герой";
        this.race = data.race || "Человек";
        this.background = data.background || "Бродяга";
        this.experience = data.experience || 0;

        this.stats = data.stats || {
            strength: 10,
            dexterity: 10,
            constitution: 10,
            intelligence: 10,
            wisdom: 10,
            charisma: 10
        };

        // Массив классов персонажа: [{ name: "Воин", level: 3, subclass: "Мастер меча" }]
        this.classes = data.classes || [];
        this.feats = data.feats || [];
        this.features = data.features || []; // Сюда будут падать способности от классов

        this.hp = {
            max: data.hp?.max || 10,
            current: data.hp?.current || 10,
            temp: data.hp?.temp || 0
        };
        
        this.hitDiceUsed = data.hitDiceUsed || {};
        this.sneakAttackDice = data.sneakAttackDice || 0; // Для плута и других механик

        this.inventory = data.inventory || [];
        this.spells = data.spells || {
            known: data.spells?.known || [],
            slots: data.spells?.slots || { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 },
            slotsUsed: data.spells?.slotsUsed || { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 }
        };
    }

    get totalLevel() {
        return this.classes.reduce((sum, cls) => sum + cls.level, 0);
    }

    get proficiencyBonus() {
        const lvl = this.totalLevel;
        if (lvl >= 17) return 6;
        if (lvl >= 13) return 5;
        if (lvl >= 9) return 4;
        if (lvl >= 5) return 3;
        return 2;
    }

    getModifier(statName) {
        const value = this.stats[statName] || 10;
        return Math.floor((value - 10) / 2);
    }

    checkMulticlassRequirements(className) {
        if (this.classes.length === 0) return true;
        
        const existingClass = this.classes.find(c => c.name === className);
        if (existingClass) return true;

        const reqs = MULTICLASS_REQUIREMENTS[className];
        if (!reqs) return true;

        if (className === "Воин") {
            return this.stats.strength >= 13 || this.stats.dexterity >= 13;
        }
        if (className === "Кровавый охотник") {
            return this.stats.intelligence >= 13 && (this.stats.strength >= 13 || this.stats.dexterity >= 13);
        }

        for (const [stat, minVal] of Object.entries(reqs)) {
            if ((this.stats[stat] || 0) < minVal) {
                return false;
            }
        }

        return true;
    }

    /**
     * Повышение уровня или добавление нового класса (Мультикласс)
     * @param {string} className - Название класса
     */
    levelUp(className) {
        if (!this.checkMulticlassRequirements(className)) {
            console.warn(`Невозможно повысить уровень: персонаж не соответствует требованиям для класса ${className}.`);
            return false;
        }

        // Берем базовые данные класса из единого справочника
        const classMeta = window.CLASSES_REFERENCE ? window.CLASSES_REFERENCE[className] : null;
        if (!classMeta) {
            console.error(`Класс "${className}" не найден в справочнике!`);
            return false;
        }

        let targetClass = this.classes.find(c => c.name === className);

        if (targetClass) {
            targetClass.level += 1;
        } else {
            this.classes.push({
                name: className,
                level: 1,
                subclass: null
            });
            targetClass = this.classes.find(c => c.name === className);
        }

        // Расчет хитов по максимуму кости здоровья
        const conMod = this.getModifier('constitution');
        const hitDieMax = classMeta.hitDie || 8; 
        const gainedHp = Math.max(1, hitDieMax + conMod);
        
        this.hp.max += gainedHp;
        this.hp.current = this.hp.max; 

        console.log(`Поздравляем! Новый уровень: ${className}. Получено HP: ${gainedHp}. Общий уровень: ${this.totalLevel}`);

        // Автоматически подтягиваем способности и фичи уровня через движок прогрессии
        applyClassProgression(this, className, targetClass.level);

        return true;
    }

    addFeat(featName, statIncreases = {}) {
        this.feats.push(featName);
        
        for (const [stat, value] of Object.entries(statIncreases)) {
            if (this.stats[stat] !== undefined) {
                this.stats[stat] = Math.min(20, this.stats[stat] + value);
            }
        }
    }

    toJSON() {
        return {
            name: this.name,
            race: this.race,
            background: this.background,
            experience: this.experience,
            stats: this.stats,
            classes: this.classes,
            feats: this.feats,
            features: this.features,
            hp: this.hp,
            hitDiceUsed: this.hitDiceUsed,
            sneakAttackDice: this.sneakAttackDice,
            inventory: this.inventory,
            spells: this.spells
        };
    }
}

window.Hero = Hero;
window.MULTICLASS_REQUIREMENTS = MULTICLASS_REQUIREMENTS;

/**
 * Проверка требований мультикласса D&D 5e для ЛЮБОГО объекта персонажа
 * (не обязательно экземпляра Hero — реальный currentChar в приложении
 * это обычный объект). Первый класс персонажа брать можно всегда.
 * @param {Object} hero - персонаж с полями .stats и (опционально) .classes
 * @param {string} className - класс, который персонаж хочет взять/повысить
 * @returns {boolean}
 */
window.checkMulticlassRequirements = function(hero, className) {
    if (!hero) return false;
    const stats = hero.stats || {};

    // Если у персонажа ещё нет ни одного класса, или это его текущий/уже
    // взятый класс — требований мультикласса нет, повышать можно свободно.
    const classes = Array.isArray(hero.classes) ? hero.classes : [];
    if (classes.length === 0) return true;
    if (classes.some(c => c.name === className)) return true;

    const reqs = MULTICLASS_REQUIREMENTS[className];
    if (!reqs) return true; // нет данных о требованиях — не блокируем

    const getStat = (key) => Number(stats[key]) || 0;

    // Воин и Монах формально требуют "13 в СИЛ ИЛИ ЛОВ" / оба по D&D 5e
    // соответственно; для Воина условие — любая из двух.
    if (className === "Воин") {
        return getStat('strength') >= 13 || getStat('dexterity') >= 13;
    }
    if (className === "Кровавый охотник") {
        return getStat('intelligence') >= 13 && (getStat('strength') >= 13 || getStat('dexterity') >= 13);
    }

    return Object.entries(reqs).every(([stat, minVal]) => getStat(stat) >= minVal);
};
