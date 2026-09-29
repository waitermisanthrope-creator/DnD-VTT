/**
 * ДОРАБОТКА: повышение уровня и мультикласс.
 * При взятии нового класса передаёт движку признак именно НОВОГО класса, чтобы получить
 * частичные владения; также показывает незаполненный выбор навыка/инструмента, если он
 * предусмотрен таблицей мультикласса.
 * Основные переменные: pendingLevelUpData, hero.classes, hero.proficiencies, hero.skillsData.
 */

/**
 * classes/level_up.js (финальный исправленный вариант с сортировкой черт по источникам и алфавиту)
 * ------------------------------------------------------------------
 * ЧТО ЭТО ЗА ФАЙЛ:
 * Единый модуль UI+логики повышения уровня: модальное окно выбора класса
 * (с иконками, поддерживает мультикласс — можно выбрать НОВЫЙ класс, а не
 * только текущий), модалка подтверждения уровня (хиты, черта/ASI, теперь
 * и выбор подкласса), и функции, синхронизирующие результат с остальным
 * приложением (спасброски, ячейки заклинаний, лист персонажа).
 *
 * ЧТО ДОБАВЛЕНО В ЭТОЙ ВЕРСИИ:
 * 1. Проверка требований мультикласса (window.checkMulticlassRequirements
 *    из Hero-info.js): классы, для взятия которых персонажу не хватает
 *    характеристик (правило D&D 5e, мин. 13 в нужной характеристике),
 *    в окне выбора класса подсвечиваются как "недоступно" — но выбор не
 *    блокируется жёстко (на случай хоумбрула/фит Adept), просто предупреждаем.
 * 2. Блок выбора ПОДКЛАССА в модалке повышения уровня — показывается,
 *    когда levelData.subclassLevel === true И подкласс для этого класса
 *    ещё не выбран. Использует window.getAvailableSubclasses(className)
 *    из subclasses/subclassesRegistry.js. Выбор сохраняется в
 *    hero.classes[i].subclass, дальше progressionEngine.js сам подтягивает
 *    фичи подкласса на каждом новом уровне.
 * 3. window.getFormattedClassAndLevel(hero) — определена здесь (раньше на
 *    неё была ссылка, но самой функции не существовало нигде в проекте),
 *    теперь показывает "3 ур. Воин (Мастер боя)" и т.п. для мультикласса.
 *
 * КАКИЕ ПЕРЕМЕННЫЕ/ГЛОБАЛЫ ИСПОЛЬЗУЕТ:
 * - hero.classes[i] = { name, level, subclass }  — основной источник истины
 * - window.pendingLevelUpData — { class, targetLevel, levelData, hitDie,
 *   hasAsi, needsSubclassChoice } — состояние текущего открытого повышения
 * - window.getClassData / window.getSubclassData / window.getAvailableSubclasses
 * - window.checkMulticlassRequirements(hero, className) <- Hero-info.js
 * - window.applyClassProgression / window.chooseSubclass <- progressionEngine.js
 * ------------------------------------------------------------------
 */

let pendingLevelUpData = null;

// 1. Создаем и внедряем HTML-разметку модального окна выбора классов (с иконками) в документ при загрузке
(function() {
  console.log("[LevelUp Debug] Инициализация скрипта level_up.js");
  if (!document.getElementById('dndModal')) {
    console.log("[LevelUp Debug] Создаем HTML-разметку модального окна выбора классов в DOM");
    const modalHTML = `
      <div id="dndModal" class="modal-overlay" style="display: none;">
        <div class="modal-content">
          <span class="modal-close" id="closeClassesModal">&times;</span>
          <h2 style="text-align: center; margin-top: 0; color: #d4af37;">Выберите класс для повышения</h2>
          <div class="classes-grid">
            <div class="class-item" data-class="Кровавый охотник"><span>🩸 Кровавый охотник</span></div>
            <div class="class-item" data-class="Алхимик"><span>🧪 Алхимик</span></div>
            <div class="class-item" data-class="Оккультист"><span>👁️ Оккультист</span></div>
            <div class="class-item" data-class="Ведьма"><span>🧙‍♀️ Ведьма</span></div>
            <div class="class-item" data-class="Некромант"><span>☠️ Некромант</span></div>
            <div class="class-item" data-class="Мученик"><span>✝️ Мученик</span></div>
            <div class="class-item" data-class="Сосуд"><span>👻 Сосуд</span></div>
            <div class="class-item" data-class="Psion"><span>🧠 Псионик</span></div>
            <div class="class-item" data-class="Warlord"><span>⚔️ Военачальник</span></div>
            <div class="class-item" data-class="Warden"><span>🌿 Страж</span></div>
            <div class="class-item" data-class="Spellblade"><span>✨ Заклинатель клинка</span></div>
            <div class="class-item" data-class="Бард">
              <img src="./app/data/classes/Bard.png" alt="Бард">
              <span>Бард (Bard)</span>
            </div>
            <div class="class-item" data-class="Варвар">
              <img src="./app/data/classes/BARBARIAN.png" alt="Варвар">
              <span>Варвар (Barbarian)</span>
            </div>
            <div class="class-item" data-class="Воин">
              <img src="./app/data/classes/FIGHTER.png" alt="Воин">
              <span>Воин (Fighter)</span>
            </div>
            <div class="class-item" data-class="Волшебник">
              <img src="./app/data/classes/Wizard.png" alt="Волшебник">
              <span>Волшебник (Wizard)</span>
            </div>
            <div class="class-item" data-class="Друид">
              <img src="./app/data/classes/DRUID.png" alt="Друид">
              <span>Друид (Druid)</span>
            </div>
            <div class="class-item" data-class="Жрец">
              <img src="./app/data/classes/CLERIC.png" alt="Жрец">
              <span>Жрец (Cleric)</span>
            </div>
            <div class="class-item" data-class="Изобретатель">
              <img src="./app/data/classes/ARTIFICER.png" alt="Изобретатель">
              <span>Изобретатель (Artificer)</span>
            </div>
            <div class="class-item" data-class="Колдун">
              <img src="./app/data/classes/WARLOCK.png" alt="Колдун">
              <span>Колдун (Warlock)</span>
            </div>
            <div class="class-item" data-class="Монах">
              <img src="./app/data/classes/Monk.png" alt="Монах">
              <span>Монах (Monk)</span>
            </div>
            <div class="class-item" data-class="Паладин">
              <img src="./app/data/classes/PALADIN.png" alt="Паладин">
              <span>Паладин (Paladin)</span>
            </div>
            <div class="class-item" data-class="Плут">
              <img src="./app/data/classes/Rogue.png" alt="Плут">
              <span>Плут (Rogue)</span>
            </div>
            <div class="class-item" data-class="Следопыт">
              <img src="./app/data/classes/RANGER.png" alt="Следопыт">
              <span>Следопыт (Ranger)</span>
            </div>
            <div class="class-item extra-class-item" data-class="Рой">
              <span>🩸 Рой — EXTRA</span>
            </div>
            <div class="class-item extra-class-item" data-class="Паразит">
              <span>🦠 Паразит — EXTRA</span>
            </div>
            <div class="class-item extra-class-item" data-class="Паразит доктора Вальтера">
              <span>🧬 Паразит доктора Вальтера — EXTRA</span>
            </div>
            <div class="class-item extra-class-item" data-class="Призрак">
              <span>👻 Призрак — EXTRA</span>
            </div>
            <div class="class-item extra-class-item" data-class="Паразит доктора Вальтера">
              <span>🧬 Паразит доктора Вальтера — EXTRA</span>
            </div>
            <div class="class-item center-item" data-class="Чародей">
              <img src="./app/data/classes/SORCERER.png" alt="Чародей">
              <span>Чародей (Sorcerer)</span>
            </div>
          </div>
        </div>
      </div>

      <style>
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }
        .modal-content {
          background: #1e1e1e;
          color: #fff;
          padding: 20px;
          border-radius: 8px;
          width: 90%;
          max-width: 550px;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          box-sizing: border-box;
          border: 1px solid #d4af37;
          box-shadow: 0 4px 20px rgba(0,0,0,0.5);
        }
        .modal-close {
          position: absolute;
          top: 10px; right: 15px;
          font-size: 28px;
          cursor: pointer;
          color: #aaa;
        }
        .modal-close:hover {
          color: #fff;
        }
        .classes-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-top: 15px;
        }
        .class-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-decoration: none;
          color: #ddd;
          text-align: center;
          padding: 8px;
          border-radius: 6px;
          background: #2a2a2a;
          cursor: pointer;
          border: 1px solid transparent;
          transition: all 0.2s;
        }
        .class-item:hover {
          background: #333;
          border-color: #d4af37;
          color: #fff;
        }
        .class-item img {
          width: 60px;
          height: 60px;
          object-fit: contain;
          margin-bottom: 6px;
        }
        .class-item span {
          font-size: 12px;
          line-height: 1.2;
        }
        .center-item {
          grid-column: 2 / 3;
        }
        .class-item-locked {
          opacity: 0.45;
          filter: grayscale(60%);
        }
        .class-item-locked::after {
          content: "⚠ Недоступно для этого персонажа";
          display: block;
          font-size: 9px;
          color: #ff9800;
          margin-top: 2px;
        }
      </style>
    `;
    const div = document.createElement('div');
    div.innerHTML = modalHTML;
    document.body.appendChild(div);
  }

  document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('dndModal');
    const closeBtn = document.getElementById('closeClassesModal');

    function closeClassSelectorModal() {
      if (modal) modal.style.display = 'none';
    }

    if (closeBtn) {
      closeBtn.onclick = closeClassSelectorModal;
    }

    window.addEventListener('click', function(event) {
      if (event.target === modal) {
        closeClassSelectorModal();
      }
    });

    document.addEventListener('click', function(e) {
      const item = e.target.closest('.class-item');
      if (item && modal && modal.style.display === 'flex') {
        e.preventDefault();
        e.stopPropagation();

        const selectedClassName = item.getAttribute('data-class');

        const hero = window.currentCharacter || window.currentChar;
        const normalizeClassKey = function(value) {
          return String(value || '')
            .replace(/[0-9]/g, '')
            .replace(/[‐‑‒–—]/g, '-')
            .trim()
            .toLowerCase();
        };

        // EXTRA-классы — жёстко закрытая ветка. Рой одновременно является
        // расой и классом: его нельзя взять вторым классом, а персонаж-Рой
        // может повышать только Рой.
        const isSwarm = selectedClassName === "Рой";
        const isParasite = selectedClassName === "Паразит";
        const isWalterParasite = selectedClassName === "Паразит доктора Вальтера";
        const isGhost = selectedClassName === "Призрак";
        const isSwarmHero = !!(hero && (
          hero.extraClassType === "swarm" ||
          hero.isExtraClass === true && hero.race === "Рой" ||
          Array.isArray(hero.classes) && hero.classes.some(function(c){
            return c && normalizeClassKey(c.name) === "рой";
          })
        ));
        const isParasiteHero = !!(hero && (
          hero.extraClassType === "parasite" ||
          hero.isExtraClass === true && hero.extraClassType === "parasite" ||
          Array.isArray(hero.classes) && hero.classes.some(function(c){
            return c && normalizeClassKey(c.name) === "паразит";
          })
        ));
        const isWalterHero = !!(hero && (
          hero.extraClassType === "walter_parasite" ||
          Array.isArray(hero.classes) && hero.classes.some(function(c){
            return c && normalizeClassKey(c.name) === normalizeClassKey("Паразит доктора Вальтера");
          })
        ));
        const isGhostHero = !!(hero && (
          hero.extraClassType === "ghost" ||
          Array.isArray(hero.classes) && hero.classes.some(function(c){
            return c && normalizeClassKey(c.name) === "призрак";
          })
        ));
        const isWalterParasiteHero = !!(hero && (
          hero.extraClassType === "walter_parasite" ||
          Array.isArray(hero.classes) && hero.classes.some(function(c){
            return c && normalizeClassKey(c.name) === "паразит доктора вальтера";
          })
        ));
        if (isSwarmHero && !isSwarm) {
          alert("Рой — Extra-класс. Повышать можно только класс «Рой».");
          return;
        }
        if (isParasiteHero && !isParasite) {
          alert("Паразит — Extra-класс. Повышать можно только класс «Паразит».");
          return;
        }
        if (isWalterParasiteHero && !isWalterParasite) {
          alert("Паразит доктора Вальтера — Extra-класс. Повышать можно только его.");
          return;
        }
        if (!isSwarmHero && !isParasiteHero && !isWalterParasiteHero && (isSwarm || isParasite || isWalterParasite)) {
          alert("Extra-классы нельзя взять мультиклассом. Рой, Паразит и Паразит доктора Вальтера выбираются как отдельная закрытая ветка.");
          return;
        }

        // Требования мультикласса относятся только к ВЗЯТИЮ НОВОГО КЛАССА.
        // Повышение уже имеющегося класса не проверяется как multiclass entry.
        const selectedClassKey = normalizeClassKey(selectedClassName);
        const alreadyHasSelectedClass = !!(hero && Array.isArray(hero.classes) &&
          hero.classes.some(function(c){
            return c && normalizeClassKey(c.name) === selectedClassKey;
          }));
        if (hero && !alreadyHasSelectedClass &&
            typeof window.checkMulticlassRequirements === 'function' &&
            !window.checkMulticlassRequirements(hero, selectedClassName)) {
          const proceed = confirm(
            `У персонажа не хватает характеристик для мультиклассирования в класс "${selectedClassName}" ` +
            `(по правилам D&D 5e требуется минимум 13 в ключевой характеристике этого класса).\n\n` +
            `Всё равно продолжить?`
          );
          if (!proceed) return;
        }

        closeClassSelectorModal();
        
        if (typeof proceedWithClassLevelUp === 'function') {
          proceedWithClassLevelUp(selectedClassName);
        }
      }
    }, true);
  });

  /**
   * Подсвечивает в сетке выбора класса те классы, для взятия которых
   * персонажу не хватает характеристик под правила мультикласса.
   * Вызывается прямо перед показом модалки (см. openLevelUpModal ниже).
   */
  window.refreshClassModalLocks = function() {
    const hero = window.currentCharacter || window.currentChar;
    const items = document.querySelectorAll('#dndModal .class-item');
    const extraType = hero && hero.extraClassType;
    const isExtraHero = extraType === "swarm" || extraType === "parasite" || extraType === "walter_parasite" ||
      !!(hero && Array.isArray(hero.classes) && hero.classes.some(function(c){
        var n=String(c&&c.name||"").replace(/[0-9]/g,"").trim();
        return n==="Рой" || n==="Паразит" || n==="Паразит доктора Вальтера";
      }));
    const extraClass = extraType === "parasite" ? "Паразит" : (extraType === "walter_parasite" ? "Паразит доктора Вальтера" : "Рой");

    items.forEach(item => {
      const cls = item.getAttribute('data-class');
      if (isExtraHero) {
        const allowed = cls === extraClass;
        item.style.display = allowed ? "flex" : "none";
        item.classList.toggle('class-item-locked', false);
        item.setAttribute('aria-disabled', allowed ? 'false' : 'true');
        return;
      }

      // Extra-классы всегда видимы обычным персонажам только как заблокированные карточки.
      if (cls === "Рой" || cls === "Паразит" || cls === "Паразит доктора Вальтера") {
        item.style.display = "flex";
        item.classList.add('class-item-locked');
        item.setAttribute('aria-disabled', 'true');
        item.title = cls + " — Extra-класс. Нельзя взять мультиклассом.";
        return;
      }

      item.style.display = "flex";
      const ok = !hero || typeof window.checkMulticlassRequirements !== 'function' ||
                 window.checkMulticlassRequirements(hero, cls);
      item.classList.toggle('class-item-locked', !ok);
      item.setAttribute('aria-disabled', ok ? 'false' : 'true');
    });
  };
})();

if (typeof window.getClassData !== 'function') {
  window.getClassData = function(className) {
    if (!className) return null;
    const norm = String(className).replace(/[0-9]/g, '').trim();
    if (window.CLASSES_REFERENCE && window.CLASSES_REFERENCE[norm]) {
      return window.CLASSES_REFERENCE[norm];
    }
    const map = {
      "Кровавый охотник": window.bloodHunterProgression,
      "Бард": window.bardProgression,
      "Варвар": window.barbarianProgression,
      "Воин": window.fighterProgression,
      "Волшебник": window.wizardProgression,
      "Друид": window.druidProgression,
      "Жрец": window.clericProgression,
      "Изобретатель": window.artificerProgression,
      "Колдун": window.warlockProgression,
      "Монах": window.monkProgression,
      "Паладин": window.paladinProgression,
      "Плут": window.rogueProgression,
      "Следопыт": window.rangerProgression,
      "Чародей": window.sorcererProgression,
      "Рой": window.swarmProgression,
      "Паразит": window.parasiteProgression,
      "Паразит доктора Вальтера": window.walterParasiteProgression,
      "Призрак": window.ghostProgression,
      "Паразит доктора Вальтера": window.walterParasiteProgression
    };
    if (map[norm]) {
      const prog = map[norm];
      return {
        hitDie: prog.hitDie || 8,
        progression: prog.levels ? prog : { levels: prog }
      };
    }
    return { hitDie: 8, progression: { levels: {} } };
  };
}

function getConMod(hero) {
  if (!hero) return 0;
  let conVal = 10;
  if (hero.stats && hero.stats.constitution !== undefined) {
    conVal = Number(hero.stats.constitution);
  } else if (hero.stats && hero.stats.con !== undefined) {
    conVal = Number(hero.stats.con);
  } else if (hero.constitution !== undefined) {
    conVal = Number(hero.constitution);
  } else if (hero.con !== undefined) {
    conVal = Number(hero.con);
  }
  return Math.floor((conVal - 10) / 2);
}

// Главная точка входа при нажатии на «Повысить уровень»
window.openLevelUpModal = function() {
  const hero = window.currentCharacter || window.currentChar;
  if (!hero) {
    alert("Ошибка: не выбран текущий персонаж!");
    return;
  }
  
  window.currentCharacter = hero;
  window.currentChar = hero;

  const totalCurrentLevel = window.getCharacterLevel();
  if (totalCurrentLevel >= 20) {
    alert("Персонаж уже достиг максимального 20 уровня!");
    return;
  }

  const dndModal = document.getElementById('dndModal');
  if (dndModal) {
    if (typeof window.refreshClassModalLocks === 'function') window.refreshClassModalLocks();
    dndModal.style.display = 'flex';
  } else {
    proceedWithClassLevelUp("Воин");
  }
};

function proceedWithClassLevelUp(currentClass) {
  const hero = window.currentCharacter || window.currentChar;

  // Сервероподобная защита на уровне логики: даже вызов функции вручную
  // не должен позволить обойти ограничения Extra-класса.
  const normalizedRequested = String(currentClass || "").replace(/[0-9]/g,"").trim();
  const extraType = hero && hero.extraClassType;
  const extraLocked = extraType === "swarm" || extraType === "parasite" || extraType === "walter_parasite" || extraType === "ghost";
  const extraName = extraType === "parasite" ? "Паразит" : (extraType === "walter_parasite" ? "Паразит доктора Вальтера" : (extraType === "ghost" ? "Призрак" : "Рой"));
  if (extraLocked && normalizedRequested !== extraName) {
    alert("Этот персонаж — " + extraName + ". Другой класс выбрать нельзя.");
    return;
  }
  if (!extraLocked && (normalizedRequested === "Рой" || normalizedRequested === "Паразит" || normalizedRequested === "Паразит доктора Вальтера" || normalizedRequested === "Призрак")) {
    alert(normalizedRequested + " нельзя взять мультиклассом.");
    return;
  }
  
  // Сохраняем исходное значение опыта на случай отмены повышения уровня
  window._expBeforeLevelUp = (hero.exp !== undefined) ? hero.exp : 0;

  const normalizeLevelUpClassName = value => String(value || '')
    .replace(/[0-9]/g, '')
    .replace(/[‐‑‒–—]/g, '-')
    .trim()
    .toLowerCase();

  let classLevel = 0;
  if (hero.classes && Array.isArray(hero.classes)) {
    const wantedClass = normalizeLevelUpClassName(currentClass);
    const found = hero.classes.find(c => c && normalizeLevelUpClassName(c.name) === wantedClass);
    if (found) classLevel = Number(found.level) || 0;
  }

  const nextLevel = classLevel + 1;
  const classData = getClassData(currentClass);
  const levelData = (classData && classData.progression && classData.progression.levels) 
    ? classData.progression.levels[nextLevel] 
    : { features: [] };

  // Уже выбран ли подкласс для этого класса у персонажа?
  const normalizedCurrentClass = normalizeLevelUpClassName(currentClass);
  let existingClassEntry = (hero.classes && Array.isArray(hero.classes))
    ? hero.classes.find(c => c && normalizeLevelUpClassName(c.name) === normalizedCurrentClass)
    : null;
  const alreadyHasSubclass = !!(existingClassEntry && existingClassEntry.subclass);
  const needsSubclassChoice = !!(levelData && levelData.subclassLevel) && !alreadyHasSubclass;

  pendingLevelUpData = {
    class: currentClass,
    targetLevel: nextLevel,
    levelData: levelData || {},
    hitDie: (classData && classData.hitDie) ? classData.hitDie : 8,
    hasAsi: levelData ? !!levelData.asi : false,
    needsSubclassChoice: needsSubclassChoice
  };
  window.pendingLevelUpData = pendingLevelUpData;

  const hitDie = pendingLevelUpData.hitDie;
  const contentBox = document.getElementById('levelUpContent');
  const totalCurrentLevel = window.getCharacterLevel();

  let featuresList = (levelData && levelData.features) ? levelData.features : [];
  let featuresHtml = featuresList.length > 0
    ? featuresList.map(f => `<li>✨ ${f}</li>`).join('')
    : '<li>Нет новых способностей на этом уровне</li>';

  // Собираем черты с разбивкой по источникам
  const sourceGroups = [
    { name: "Книга игрока (PHB)", items: [window.FEATS_PHB, window.PHB_FEATS, window.feats_phb] },
    { name: "Котел всего Таншира / Таша (TCoE)", items: [window.FEATS_TCOE, window.TCOE_FEATS, window.feats_tcoe] },
    { name: "Путеводитель Занатара (XGtE)", items: [window.FEATS_XGTE, window.XGTE_FEATS, window.feats_xgte] },
    { name: "Сеттинги и другие книги", items: [window.FEATS_SETTINGS, window.feats_settings] },
    { name: "Homebrew и UA", items: [window.FEATS_UA_HOMEBREW, window.feats_ua_homebrew, window.Feats, window.FEATS, window.ALL_FEATS, window.allFeats] }
  ];

  const uniqueFeatsMap = new Map();
  const groupedFeats = [];

  sourceGroups.forEach(group => {
    let groupFeats = [];
    group.items.forEach(source => {
      if (source) {
        let arr = [];
        if (Array.isArray(source)) arr = source;
        else if (typeof source === 'object') arr = Object.values(source).flat();

        arr.forEach(feat => {
          if (!feat) return;
          let engName = typeof feat === 'string' ? feat : (feat.name || feat.title);
          let ruName = typeof feat === 'object' ? (feat.nameRu || engName) : engName;
          let desc = typeof feat === 'object' ? (feat.description || feat.text || 'Описание отсутствует.') : 'Описание отсутствует.';

          if (engName && !uniqueFeatsMap.has(engName)) {
            const featObj = { name: engName, nameRu: ruName, description: desc };
            uniqueFeatsMap.set(engName, featObj);
            groupFeats.push(featObj);
          }
        });
      }
    });

    if (groupFeats.length > 0) {
      // Сортировка внутри группы по русскому алфавиту
      groupFeats.sort((a, b) => a.nameRu.localeCompare(b.nameRu, 'ru'));
      groupedFeats.push({
        sourceName: group.name,
        feats: groupFeats
      });
    }
  });

  let asiHtml = '';
  const isAsiLevel = levelData && levelData.asi;
  if (isAsiLevel) {
    let featsOptions = '<option value="">-- Выберите черту или ASI --</option>';
    featsOptions += '<option value="NONE">❌ Ничего не брать / Пропустить</option>';
    featsOptions += '<option value="ASI_PLUS_2">📈 Увеличение характеристики (+2 к одной)</option>';
    featsOptions += '<option value="ASI_PLUS_1_1">📈 Увеличение характеристик (+1 к двум)</option>';

    if (groupedFeats.length > 0) {
      groupedFeats.forEach(group => {
        featsOptions += `<optgroup label="${group.sourceName}">`;
        group.feats.forEach(f => {
          featsOptions += `<option value="${f.name}">${f.nameRu} (${f.name})</option>`;
        });
        featsOptions += `</optgroup>`;
      });
    }

    asiHtml = `
      <div style="margin-top: 12px; background: #2a2a2a; padding: 12px; border-radius: 6px; border: 1px solid #d4af37;">
        <label style="font-size: 0.9em; font-weight: bold; color: #d4af37; display: block; margin-bottom: 5px;">
          📈 Увеличение характеристик (ASI) или Черта:
        </label>
        <select id="selectedFeatInput" onchange="onFeatOrAsiChange()" style="width: 100%; padding: 8px; background: #1a1a1a; color: #fff; border: 1px solid #444; border-radius: 4px; margin-bottom: 8px;">
          ${featsOptions}
        </select>
        <div id="featDescBox" style="font-size: 0.85em; color: #ccc; background: #1f1f1f; padding: 8px; border-radius: 4px; margin-bottom: 8px; display: none; line-height: 1.4; border-left: 3px solid #d4af37;"></div>
        <div id="asiStatContainer" style="display: none; margin-top: 8px; border-top: 1px dashed #444; padding-top: 8px;">
          <div style="font-size: 0.85em; color: #ff9800; margin-bottom: 4px;" id="asiPromptText">Выберите характеристику для повышения (+2):</div>
          <div style="display: flex; gap: 6px;" id="asiStatSelects">
            <select id="asiStat1" style="flex:1; padding:6px; background:#1a1a1a; color:#fff; border:1px solid #444; border-radius:4px;">
              <option value="strength">Сила (СИЛ)</option>
              <option value="dexterity">Ловкость (ЛОВ)</option>
              <option value="constitution">Телосложение (ТЕЛ)</option>
              <option value="intelligence">Интеллект (ИНТ)</option>
              <option value="wisdom">Мудрость (МУД)</option>
              <option value="charisma">Харизма (ХАР)</option>
            </select>
            <select id="asiStat2" style="flex:1; padding:6px; background:#1a1a1a; color:#fff; border:1px solid #444; border-radius:4px; display:none;">
              <option value="strength">Сила (СИЛ)</option>
              <option value="dexterity" selected>Ловкость (ЛОВ)</option>
              <option value="constitution">Телосложение (ТЕЛ)</option>
              <option value="intelligence">Интеллект (ИНТ)</option>
              <option value="wisdom">Мудрость (МУД)</option>
              <option value="charisma">Харизма (ХАР)</option>
            </select>
          </div>
        </div>
      </div>
    `;
    window._loadedFeatsMap = uniqueFeatsMap;
  }


  // --- Блок выбора частичного владения при новом классе ---
  let proficiencyChoiceHtml = '';
  const isNewClass = !(hero.classes && hero.classes.some(c =>
    c && normalizeLevelUpClassName(c.name) === normalizeLevelUpClassName(currentClass)
  ));
  const multiRules = window.MULTICLASS_PROFICIENCIES_2014 ? window.MULTICLASS_PROFICIENCIES_2014[currentClass] : null;
  if (isNewClass && multiRules && multiRules.choices && multiRules.choices.length > 0) {
    let choiceBlocks = '';
    multiRules.choices.forEach((choice, idx) => {
      if (choice.type === 'skill') {
        const opts = (window.SKILLS_CONFIG || []).map(s => `<option value="${s.id}">${s.name}</option>`).join('');
        choiceBlocks += `<div style="margin-top:8px;"><label style="font-size:.85em;color:#ff9800;">${choice.label}:</label><select id="multiProfChoice_${idx}" style="width:100%;padding:8px;background:#1a1a1a;color:#fff;border:1px solid #444;border-radius:4px;">${opts}</select></div>`;
      } else if (choice.type === 'instrument') {
        const opts = (window.PROFICIENCIES_DB || []).filter(p => p.category === 'Музыкальные инструменты').map(p => `<option value="${p.id}">${p.name}</option>`).join('');
        choiceBlocks += `<div style="margin-top:8px;"><label style="font-size:.85em;color:#ff9800;">${choice.label}:</label><select id="multiProfChoice_${idx}" style="width:100%;padding:8px;background:#1a1a1a;color:#fff;border:1px solid #444;border-radius:4px;">${opts}</select></div>`;
      }
    });
    proficiencyChoiceHtml = `<div style="margin-top:12px;background:#252525;padding:12px;border-radius:6px;border:1px solid #2196F3;"><strong style="color:#64b5f6;">🛡️ Дополнительные владения мультикласса</strong>${choiceBlocks}</div>`;
    pendingLevelUpData.multiclassChoices = multiRules.choices;
  }

  // --- Блок выбора ПОДКЛАССА (архетип/домен/школа/традиция/клятва/происхождение и т.д.) ---
  let subclassHtml = '';
  if (needsSubclassChoice) {
    const options = (typeof window.getAvailableSubclasses === 'function')
      ? window.getAvailableSubclasses(currentClass)
      : [];

    if (options.length > 0) {
      let subOptionsHtml = '<option value="">-- Выберите подкласс --</option>';
      options.forEach(opt => {
        subOptionsHtml += `<option value="${opt.name}">${opt.name} (${opt.source})</option>`;
      });

      window._loadedSubclassOptions = options;

      subclassHtml = `
        <div style="margin-top: 12px; background: #2a2a2a; padding: 12px; border-radius: 6px; border: 1px solid #9c27b0;">
          <label style="font-size: 0.9em; font-weight: bold; color: #ce93d8; display: block; margin-bottom: 5px;">
            🌟 Выберите подкласс для «${currentClass}»:
          </label>
          <select id="selectedSubclassInput" onchange="onSubclassChange()" style="width: 100%; padding: 8px; background: #1a1a1a; color: #fff; border: 1px solid #444; border-radius: 4px;">
            ${subOptionsHtml}
          </select>
          <div id="subclassDescBox" style="font-size: 0.85em; color: #ccc; background: #1f1f1f; padding: 8px; border-radius: 4px; margin-top: 8px; display: none; line-height: 1.4; border-left: 3px solid #9c27b0;"></div>
        </div>
      `;
    } else {
      subclassHtml = `
        <div style="margin-top: 12px; background: #2a2a2a; padding: 10px; border-radius: 6px; border: 1px solid #555; color: #999; font-size: 0.85em;">
          🌟 Для класса «${currentClass}» на этом уровне доступен выбор подкласса, но его данных пока нет в subclasses/subclassesRegistry.js.
        </div>
      `;
    }
  }

  if (contentBox) {
    contentBox.innerHTML = `
      <p style="font-size: 1.1em; margin-top: 0;">Повышение класса: <strong style="color: #ff9800;">${currentClass}</strong> (до ${nextLevel} ур.)</p>
      <p>Общий уровень персонажа вырастет с <span style="color:#aaa;">${totalCurrentLevel}</span> до <strong style="color:#4caf50; font-size:1.2em;">${totalCurrentLevel + 1}</strong>!</p>
      
      <div style="background: #252525; padding: 10px; border-radius: 6px; margin: 10px 0;">
        <label style="font-size: 0.85em; color: #aaa; display: block; margin-bottom: 5px;">Прибавка здоровья (Кость хита: d${hitDie}):</label>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 6px;">
          <button type="button" class="btn-action" style="background: #2196F3; padding:6px; font-size: 0.9em;" onclick="rollHpIncrease(${hitDie})">🎲 Бросить d${hitDie}</button>
          <button type="button" class="btn-action" style="background: #ff9800; padding:6px; font-size: 0.9em;" onclick="averageHpIncrease(${hitDie})">🛡️ Среднее</button>
        </div>
        <button type="button" class="btn-action" style="background: #9c27b0; width: 100%; padding: 6px; font-size: 0.9em;" onclick="maxHpIncrease(${hitDie})">💥 Максимум (${hitDie})</button>
        <div id="hpGainResult" style="margin-top: 8px; text-align: center; font-weight: bold; color: #4caf50;"></div>
      </div>

      <div style="margin: 10px 0; background: #252525; padding: 8px; border-radius: 6px;">
        <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 0.9em; color: #ddd;">
          <input type="checkbox" id="restoreFullHpCheckbox" style="width: 16px; height: 16px; accent-color: #4caf50;" checked>
          ❤️ Восстановить HP до максимума
        </label>
      </div>

      ${subclassHtml}

      ${asiHtml}

      <div style="margin-top: 12px;">
        <label style="font-size: 0.9em; font-weight: bold; color: #d4af37;">Новые особенности уровня:</label>
        <ul style="margin: 5px 0 0 0; padding-left: 20px; font-size: 0.9em; color: #ddd;">
          ${featuresHtml}
        </ul>
      </div>
    `;

    const conMod = getConMod(hero);
    const avg = Math.floor(hitDie / 2) + 1;
    window.selectedBaseHp = Math.max(1, avg);
    const totalGain = Math.max(1, window.selectedBaseHp + conMod);
    const modStr = conMod >= 0 ? `+${conMod}` : `${conMod}`;
    const hpRes = document.getElementById('hpGainResult');
    if (hpRes) {
      hpRes.innerText = `Прирост HP: +${totalGain} (Среднее: ${window.selectedBaseHp} + Тел ${modStr})`;
    }
  }

  const modal = document.getElementById('levelUpModal');
  if (modal) modal.style.display = 'flex';
}

window.onFeatOrAsiChange = function() {
  const select = document.getElementById('selectedFeatInput');
  const descBox = document.getElementById('featDescBox');
  const asiContainer = document.getElementById('asiStatContainer');
  const asiPrompt = document.getElementById('asiPromptText');
  const stat2 = document.getElementById('asiStat2');

  if (!select) return;
  const val = select.value;

  if (descBox) descBox.style.display = 'none';
  if (asiContainer) asiContainer.style.display = 'none';
  if (stat2) stat2.style.display = 'none';

  if (val === 'ASI_PLUS_2') {
    if (asiContainer) asiContainer.style.display = 'block';
    if (asiPrompt) asiPrompt.textContent = 'Выберите характеристику для повышения (+2):';
  } else if (val === 'ASI_PLUS_1_1') {
    if (asiContainer) asiContainer.style.display = 'block';
    if (asiPrompt) asiPrompt.style.display = 'block';
    if (stat2) stat2.style.display = 'block';
    if (asiPrompt) asiPrompt.textContent = 'Выберите две характеристики для повышения (+1 к каждой):';
  } else if (val && val !== 'NONE' && window._loadedFeatsMap) {
    const featObj = window._loadedFeatsMap.get(val);
    if (featObj && descBox) {
      descBox.innerHTML = `<strong>${featObj.nameRu}</strong>: ${featObj.description}`;
      descBox.style.display = 'block';
    }
  }
};

window.onSubclassChange = function() {
  const select = document.getElementById('selectedSubclassInput');
  const descBox = document.getElementById('subclassDescBox');
  if (!select || !descBox) return;

  const opt = (window._loadedSubclassOptions || []).find(o => o.name === select.value);
  if (opt) {
    descBox.innerHTML = `<strong>${opt.name}</strong> (${opt.source}): ${opt.description}`;
    descBox.style.display = 'block';
  } else {
    descBox.style.display = 'none';
  }
};

window.closeLevelUpModal = function() {
  // Если окно закрывается без подтверждения (отмена), возвращаем опыт в исходное положение
  const hero = window.currentCharacter || window.currentChar;
  if (hero && window._expBeforeLevelUp !== undefined && pendingLevelUpData !== null) {
    hero.exp = window._expBeforeLevelUp;
    if (typeof updateExperienceModalUI === 'function') {
      updateExperienceModalUI();
    }
  }

  const modal = document.getElementById('levelUpModal');
  if (modal) modal.style.display = 'none';
  pendingLevelUpData = null;
  window.pendingLevelUpData = null;
  window.selectedBaseHp = null;
  window._expBeforeLevelUp = undefined;
};

window.rollHpIncrease = function(hitDie) {
  const hero = window.currentCharacter || window.currentChar;
  const conMod = getConMod(hero);
  const roll = Math.floor(Math.random() * hitDie) + 1;
  window.selectedBaseHp = Math.max(1, roll);
  const totalGain = Math.max(1, window.selectedBaseHp + conMod);
  const modStr = conMod >= 0 ? `+${conMod}` : `${conMod}`;
  const hpRes = document.getElementById('hpGainResult');
  if (hpRes) hpRes.innerText = `Бросок: ${roll} + Тел (${modStr}) = +${totalGain} HP`;
};

window.averageHpIncrease = function(hitDie) {
  const hero = window.currentCharacter || window.currentChar;
  const conMod = getConMod(hero);
  const avg = Math.floor(hitDie / 2) + 1;
  window.selectedBaseHp = Math.max(1, avg);
  const totalGain = Math.max(1, window.selectedBaseHp + conMod);
  const modStr = conMod >= 0 ? `+${conMod}` : `${conMod}`;
  const hpRes = document.getElementById('hpGainResult');
  if (hpRes) hpRes.innerText = `Среднее: ${avg} + Тел (${modStr}) = +${totalGain} HP`;
};

window.maxHpIncrease = function(hitDie) {
  const hero = window.currentCharacter || window.currentChar;
  const conMod = getConMod(hero);
  window.selectedBaseHp = hitDie;
  const totalGain = Math.max(1, window.selectedBaseHp + conMod);
  const modStr = conMod >= 0 ? `+${conMod}` : `${conMod}`;
  const hpRes = document.getElementById('hpGainResult');
  if (hpRes) hpRes.innerText = `Максимум: ${hitDie} + Тел (${modStr}) = +${totalGain} HP`;
};

window.confirmLevelUp = function() {
  const hero = window.currentCharacter || window.currentChar;
  if (!pendingLevelUpData || !hero) return;

  // Очищаем бэкап опыта, так как повышение уровня успешно подтверждено
  window._expBeforeLevelUp = undefined;

  const { class: className } = pendingLevelUpData;

  const extraType = hero.extraClassType;
  const heroIsExtra = extraType === "swarm" || extraType === "parasite" || extraType === "walter_parasite" || extraType === "ghost";
  const extraName = extraType === "parasite" ? "Паразит" : (extraType === "walter_parasite" ? "Паразит доктора Вальтера" : (extraType === "ghost" ? "Призрак" : "Рой"));
  if (heroIsExtra && className !== extraName) {
    alert(extraName + " не может мультиклассироваться. Повышайте только уровень " + extraName + ".");
    return;
  }
  if (!heroIsExtra && (className === "Рой" || className === "Паразит" || className === "Паразит доктора Вальтера" || className === "Призрак")) {
    alert(className + " нельзя добавить вторым классом.");
    return;
  }

  // Валидируем ASI до изменения уровня/класса: две характеристики должны быть разными,
  // а повышение не может вывести значение выше 20 по правилам PHB 2014.
  const preFeatSelect = document.getElementById('selectedFeatInput');
  if (preFeatSelect && preFeatSelect.value === 'ASI_PLUS_1_1') {
    const preS1 = document.getElementById('asiStat1')?.value;
    const preS2 = document.getElementById('asiStat2')?.value;
    const preStats = hero.stats || {};
    if (!preS1 || !preS2 || preS1 === preS2) {
      alert('Для варианта +1/+1 нужно выбрать две разные характеристики.');
      return;
    }
    if ((Number(preStats[preS1]) || 10) >= 20 || (Number(preStats[preS2]) || 10) >= 20) {
      alert('ASI не может поднять характеристику выше 20. Выберите другие характеристики.');
      return;
    }
  }
  if (preFeatSelect && preFeatSelect.value === 'ASI_PLUS_2') {
    const preS = document.getElementById('asiStat1')?.value;
    if (!preS || (Number((hero.stats || {})[preS]) || 10) >= 20) {
      alert('Выберите характеристику, значение которой меньше 20.');
      return;
    }
  }

  const baseGain = window.selectedBaseHp !== undefined && window.selectedBaseHp !== null
    ? window.selectedBaseHp
    : Math.floor((pendingLevelUpData.hitDie || 8) / 2) + 1;

  const conMod = getConMod(hero);
  const hpGain = Math.max(1, baseGain + conMod);

  if (!hero.classes) hero.classes = [];
  let targetClass = hero.classes.find(c => c.name === className);

  if (targetClass) {
    targetClass.level = (Number(targetClass.level) || 0) + 1;
  } else {
    hero.classes.push({ name: className, level: 1, subclass: null });
    targetClass = hero.classes.find(c => c.name === className);
  }


  // Для нового класса применяем фиксированные частичные владения и выбранные навыки/инструменты.
  const wasNewClass = targetClass.level === 1 && pendingLevelUpData.targetLevel === 1;
  if (wasNewClass && typeof window.applyMulticlassProficiencies === 'function') {
    window.applyMulticlassProficiencies(hero, className, true);
    const rules = window.MULTICLASS_PROFICIENCIES_2014 && window.MULTICLASS_PROFICIENCIES_2014[className];
    if (rules && rules.choices) {
      rules.choices.forEach((choice, idx) => {
        const select = document.getElementById('multiProfChoice_' + idx);
        if (select && typeof window.resolveMulticlassProficiencyChoice === 'function') {
          window.resolveMulticlassProficiencyChoice(hero, choice, select.value);
        }
      });
    }
  }

  // Сохраняем выбранный подкласс (если на этом уровне он предлагался)
  const subclassSelect = document.getElementById('selectedSubclassInput');
  if (subclassSelect && subclassSelect.value && targetClass && !targetClass.subclass) {
    targetClass.subclass = subclassSelect.value;
    console.log(`🌟 Выбран подкласс: ${subclassSelect.value} (${className})`);
  }

  const newTotalLevel = hero.classes.reduce((sum, c) => sum + (Number(c.level) || 0), 0);

  if (typeof window.setCharacterLevel === 'function') {
    // setCharacterLevel owns total character level, but class progression must use the selected class level.
  window.setCharacterLevel(newTotalLevel, hpGain, className);
  }

  // Обработка выбранной черты или ASI
  const selectedFeatSelect = document.getElementById('selectedFeatInput');
  if (selectedFeatSelect) {
    const val = selectedFeatSelect.value;
    if (!hero.stats) hero.stats = {};

    if (val === 'ASI_PLUS_2') {
      const s1 = document.getElementById('asiStat1')?.value;
      if (s1 && window.DNDRules) window.DNDRules.applyASI(hero, { [s1]: 2 });
      else if (s1) hero.stats[s1] = Math.min(20, (Number(hero.stats[s1]) || 10) + 2);
    } else if (val === 'ASI_PLUS_1_1') {
      const s1 = document.getElementById('asiStat1')?.value;
      const s2 = document.getElementById('asiStat2')?.value;
      if (window.DNDRules) window.DNDRules.applyASI(hero, { [s1]: 1, [s2]: 1 });
      else {
        if (s1) hero.stats[s1] = Math.min(20, (Number(hero.stats[s1]) || 10) + 1);
        if (s2) hero.stats[s2] = Math.min(20, (Number(hero.stats[s2]) || 10) + 1);
      }
    } else if (val && val !== 'NONE') {
      const chosenFeat = val;
      if (!hero.feats) hero.feats = [];
      if (!hero.feats.includes(chosenFeat)) hero.feats.push(chosenFeat);
      if (!hero.features) hero.features = [];
      if (!hero.features.includes(chosenFeat)) hero.features.push(chosenFeat);
    }
  }

  // Автоматическое обновление полей ввода характеристик на листе персонажа (поддержка разных алиасов)
  const statKeysMap = {
    'strength': ['str', 'strength', 'сила'],
    'dexterity': ['dex', 'dexterity', 'ловкость'],
    'constitution': ['con', 'constitution', 'телосложение'],
    'intelligence': ['int', 'intelligence', 'интеллект'],
    'wisdom': ['wis', 'wisdom', 'мудрость'],
    'charisma': ['cha', 'charisma', 'харизма']
  };

  // Также маппинг на случай, если ключи в stats записаны коротко ('str', 'dex' и т.д.)
  const shortToFull = { 'str': 'strength', 'dex': 'dexterity', 'con': 'constitution', 'int': 'intelligence', 'wis': 'wisdom', 'cha': 'charisma' };

  Object.keys(statKeysMap).forEach(statKey => {
    let val = hero.stats[statKey];
    if (val === undefined) {
      // проверяем короткие ключи
      for (let short in shortToFull) {
        if (shortToFull[short] === statKey && hero.stats[short] !== undefined) {
          val = hero.stats[short];
          break;
        }
      }
    }

    if (val !== undefined) {
      statKeysMap[statKey].forEach(alias => {
        const inputElem = document.getElementById(alias) || document.querySelector(`[name="${alias}"]`);
        if (inputElem) {
          inputElem.value = val;
          inputElem.dispatchEvent(new Event('input', { bubbles: true }));
          inputElem.dispatchEvent(new Event('change', { bubbles: true }));
        }
      });
    }
  });

  alert(`Поздравляем! Персонаж поднялся до ${newTotalLevel} уровня!`);
  
  // Закрываем модальное окно через стандартный DOM-метод
  const modal = document.getElementById('levelUpModal');
  if (modal) modal.style.display = 'none';
  pendingLevelUpData = null;
  window.pendingLevelUpData = null;
  window.selectedBaseHp = null;

  if (typeof updateExperienceModalUI === 'function') {
    updateExperienceModalUI();
  }
  if (typeof calculateMods === 'function') calculateMods();
  if (typeof autoSaveCurrentCharacter === 'function') autoSaveCurrentCharacter();
};

window.getCharacterLevel = function() {
  const hero = window.currentCharacter || window.currentChar;
  if (!hero) return 1;

  if (hero.classes && Array.isArray(hero.classes) && hero.classes.length > 0) {
    return hero.classes.reduce((sum, c) => sum + (Number(c.level) || 0), 0) || 1;
  }
  return Number(hero.level) || 1;
};

window.setCharacterLevel = function(newLevel, hpGain = 0, specificClass = null) {
  const hero = window.currentCharacter || window.currentChar;
  if (!hero) return;

  // Extra-класс нельзя превратить в мультикласс даже через прямой вызов API.
  const extraType = hero.extraClassType;
  const heroIsExtra = extraType === "swarm" || extraType === "parasite" || extraType === "walter_parasite" || extraType === "ghost";
  const extraName = extraType === "parasite" ? "Паразит" : (extraType === "walter_parasite" ? "Паразит доктора Вальтера" : (extraType === "ghost" ? "Призрак" : "Рой"));
  if (heroIsExtra && specificClass && String(specificClass).replace(/[0-9]/g,"").trim() !== extraName) {
    console.warn("[LevelUp] Заблокирована попытка мультикласса для " + extraName + ":", specificClass);
    return;
  }

  window.currentCharacter = hero;
  window.currentChar = hero;

  let targetLevel = Math.max(1, Math.min(20, Number(newLevel) || 1));
  hero.level = targetLevel;

  let className = specificClass || "Воин";
  if (!hero.classes) hero.classes = [];
  
  if (hero.classes.length > 0) {
    if (specificClass) {
      let found = hero.classes.find(c => c.name === specificClass);
      if (!found) {
        hero.classes.push({ name: specificClass, level: 1, subclass: null });
      }
      className = specificClass;
    } else {
      className = hero.classes[0].name;
      const oldTotal = hero.classes.reduce((sum, c) => sum + (Number(c.level) || 0), 0) || 1;
      const diff = targetLevel - oldTotal;
      hero.classes[0].level = Math.max(1, (Number(hero.classes[0].level) || 1) + diff);
    }
  } else {
    if (hero.className) {
      className = String(hero.className).replace(/[0-9]/g, '').replace(/ур\./gi, '').trim();
    } else if (hero.class) {
      className = String(hero.class).replace(/[0-9]/g, '').replace(/ур\./gi, '').trim();
    }
    if (!className) className = "Воин";
    hero.classes.push({ name: className, level: targetLevel, subclass: null });
  }

  if (hpGain > 0) {
    let currentMax = Number(hero.hpMax) || (hero.hp && Number(hero.hp.max)) || 10;
    let currentVal = Number(hero.hpCurrent) || (hero.hp && Number(hero.hp.current)) || 10;

    let newMax = currentMax + hpGain;
    let newVal;

    const restoreFullCheckbox = document.getElementById('restoreFullHpCheckbox');
    const shouldRestoreFull = restoreFullCheckbox ? restoreFullCheckbox.checked : false;

    if (shouldRestoreFull) {
      newVal = newMax;
    } else {
      newVal = currentVal + hpGain;
      if (newVal > newMax) newVal = newMax;
    }

    hero.hpMax = newMax;
    hero.hpCurrent = newVal;
    if (!hero.hp) hero.hp = {};
    hero.hp.max = newMax;
    hero.hp.current = newVal;

    // Синхронизация специальной биомассы Роя с обычными полями HP.
    if (hero.extraClassType === "swarm" && hero.swarm) {
      hero.swarm.maxHP = newMax;
      hero.swarm.currentHP = newVal;
      if (window.SWARM_EXTRA && typeof window.SWARM_EXTRA.getState === "function") {
        hero.swarm.state = window.SWARM_EXTRA.getState(newVal, newMax);
      }
    }

    if (hero.extraClassType === "walter_parasite" && hero.walterParasite && hero.walterParasite.body) {
      hero.walterParasite.body.maxHP = newMax;
      hero.walterParasite.body.currentHP = Math.min(hero.walterParasite.body.currentHP, newMax);
    }

    const hpMaxInput = document.getElementById('hpMax');
    if (hpMaxInput) {
      hpMaxInput.value = newMax;
      hpMaxInput.dispatchEvent(new Event('input', { bubbles: true }));
    }

    const hpCurrentInput = document.getElementById('hpCurrent');
    if (hpCurrentInput) {
      hpCurrentInput.value = newVal;
      hpCurrentInput.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }

  if (typeof window.updateCharacterSpellSlots === 'function') {
    window.updateCharacterSpellSlots(hero);
  }

  if (typeof applyClassProgression === 'function') {
    // IMPORTANT: targetLevel here is the total character level. For multiclassing
    // progression must use the level of the selected class only.
    const classEntry = Array.isArray(hero.classes) ? hero.classes.find(c => c && c.name === className) : null;
    const classLevel = classEntry ? Math.max(1, Number(classEntry.level) || 1) : 1;
    applyClassProgression(hero, className, classLevel);
  }

  window.syncLevelUI(targetLevel, className);

  if (typeof renderCharacterList === 'function') renderCharacterList();
  if (typeof calculateMods === 'function') calculateMods();
  if (typeof renderSpellSlots === 'function') renderSpellSlots();
  if (typeof autoSaveCurrentCharacter === 'function') autoSaveCurrentCharacter();
  
  if (typeof saveAllCharacters === 'function') {
    saveAllCharacters();
  } else if (typeof allCharacters !== 'undefined') {
    localStorage.setItem('dnd_multi_characters_v2', JSON.stringify(allCharacters));
  }
};

/**
 * Формирует читаемую строку класса(ов) персонажа с учётом мультикласса
 * и выбранных подклассов, например:
 *   "5 уровень\n3 ур. Воин (Мастер боя)\n2 ур. Волшебник (Школа Воплощения)"
 * Определена здесь, т.к. раньше на неё была ссылка в syncLevelUI, но самой
 * функции не существовало нигде в проекте (тихо срабатывал fallback).
 * @param {Object} hero
 * @returns {string}
 */
window.getFormattedClassAndLevel = function(hero) {
  if (!hero || !hero.classes || !Array.isArray(hero.classes) || hero.classes.length === 0) {
    return (hero && (hero.class || hero.className)) || '';
  }
  const totalLevel = hero.classes.reduce((sum, c) => sum + (Number(c.level) || 0), 0);
  const parts = hero.classes.map(c => {
    const lvl = Number(c.level) || 1;
    const sub = c.subclass ? ` (${c.subclass})` : '';
    return `${lvl} ур. ${c.name}${sub}`;
  });
  return `${totalLevel} уровень\n${parts.join('\n')}`;
};

window.syncLevelUI = function(level, className) {
  const hero = window.currentCharacter || window.currentChar;
  const totalLevel = window.getCollectionLevel ? window.getCollectionLevel() : window.getCharacterLevel();

  let formattedText = "";
  if (hero) {
    if (!hero.classes || hero.classes.length === 0) {
      hero.classes = [{ name: className || "Воин", level: totalLevel, subclass: null }];
    }
    
    if (typeof getFormattedClassAndLevel === 'function') {
      formattedText = getFormattedClassAndLevel(hero);
    } else {
      var parts = [];
      for (var i = 0; i < hero.classes.length; i++) {
        var c = hero.classes[i];
        parts.push((Number(c.level) || 1) + ' ур. ' + c.name);
      }
      formattedText = totalLevel + ' уровень\n' + parts.join('\n');
    }

    hero.class = formattedText;
    hero.className = formattedText;
  } else {
    formattedText = totalLevel + ' уровень\n' + totalLevel + ' ур. ' + (className || "Воин");
  }

  const levelInputs = document.querySelectorAll('.char-level-input, #charLevel, #settingsLevelInput, #debugLevelInput');
  levelInputs.forEach(input => {
    if (input) input.value = totalLevel;
  });

  const levelDisplays = document.querySelectorAll('.char-level-display, #settingsLevelDisplay, #debugLevelDisplay');
  levelDisplays.forEach(display => {
    if (display) display.textContent = totalLevel;
  });

  const charClassInputs = document.querySelectorAll('#charClass, input[name="className"], .char-class-input');
  charClassInputs.forEach(input => {
    if (input) {
      input.value = formattedText;
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }
  });
};
