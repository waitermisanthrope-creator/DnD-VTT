/**
 * DICE.JS — Модуль бросков D&D 5e (Автономный)
 * Включает детальное логирование (отладку) всех расчетов в консоль, 
 * полноэкранные атмосферные эффекты при критическом успехе/провале,
 * а также интеграцию с состояниями персонажа (перевес, паралич, бессознательность и др.).
 */

let currentRollMode = 'normal'; // 'normal' | 'advantage' | 'disadvantage'

// Карта соответствия ID навыков к их глобальным переменным под window
var SKILL_TO_VAR_MAP = {
  acrobatics: 'Prof_Acr',
  animalHandling: 'Prof_Ani',
  arcana: 'Prof_Arc',
  athletics: 'Prof_Ath',
  deception: 'Prof_Dec',
  history: 'Prof_His',
  insight: 'Prof_Ins',
  intimidation: 'Prof_Itm',
  investigation: 'Prof_Inv',
  medicine: 'Prof_Med',
  nature: 'Prof_Nat',
  perception: 'Prof_Prc',
  performance: 'Prof_Prf',
  persuasion: 'Prof_Prs',
  religion: 'Prof_Rel',
  sleightOfHand: 'Prof_Soh',
  stealth: 'Prof_Stl',
  survival: 'Prof_Sur'
};

document.addEventListener('DOMContentLoaded', () => {
  console.log('[DICE_INIT] Документ загружен. Инициализация модуля бросков.');
  renderDiceModule();
  injectCritStyles();
});

/**
 * Внедрение стилей для анимаций критов и полноэкранных оверлеев
 */
function injectCritStyles() {
  if (document.getElementById('diceCritStyles')) return;
  const style = document.createElement('style');
  style.id = 'diceCritStyles';
  style.textContent = `
    @keyframes critZoomIn {
      0% { transform: scale(0.2); opacity: 0; }
      40% { transform: scale(1.05); opacity: 1; }
      100% { transform: scale(1); opacity: 1; }
    }
    @keyframes critFadeOut {
      0% { opacity: 1; }
      100% { opacity: 0; }
    }
    @keyframes floatEmoji {
      0% { transform: translateY(0px) scale(0.8); opacity: 1; }
      100% { transform: translateY(-200px) scale(1.6); opacity: 0; }
    }
    .dice-crit-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.85);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 99999;
      pointer-events: none;
      animation: critZoomIn 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    }
    .dice-crit-overlay.fade-out {
      animation: critFadeOut 0.5s ease-in forwards;
    }
    .dice-crit-overlay img {
      width: 100vw;
      height: 100vh;
      max-width: none;
      max-height: none;
      object-fit: cover;
      object-position: center;
      filter: drop-shadow(0 0 30px rgba(255, 215, 0, 0.5));
    }
    .floating-emoji {
      position: absolute;
      font-size: 3.5rem;
      animation: floatEmoji 3.2s ease-out forwards;
      pointer-events: none;
    }
  `;
  document.head.appendChild(style);
}

/**
 * Функция вызова полноэкранного эффекта при крите (~4.5 секунды суммарно)
 * @param {boolean} isSuccess - true для успехов (20), false для провалов (1)
 */
function triggerCritEffect(isSuccess) {
  const existingOverlay = document.getElementById('diceCritOverlay');
  if (existingOverlay) existingOverlay.remove();

  const overlay = document.createElement('div');
  overlay.id = 'diceCritOverlay';
  overlay.className = 'dice-crit-overlay';

  const img = document.createElement('img');
  img.src = isSuccess ? './dice/succesfull.png' : './dice/lose.png';
  img.alt = isSuccess ? 'Критический успех!' : 'Критический провал!';
  
  img.onerror = () => {
    img.style.display = 'none';
    const fallbackText = document.createElement('div');
    fallbackText.style.cssText = `font-size: 4rem; font-weight: bold; color: ${isSuccess ? '#4CAF50' : '#e53935'}; text-align: center; text-shadow: 0 0 15px #000;`;
    fallbackText.textContent = isSuccess ? '🔥 КРИТИЧЕСКИЙ УСПЕХ! 🔥' : '💀 КРИТИЧЕСКИЙ ПРОВАЛ! 💀';
    overlay.appendChild(fallbackText);
  };

  overlay.appendChild(img);

  const emojis = isSuccess ? ['🎉', '🔥', '✨', '🏆', '⭐', '⚡', '💥', '🍾'] : ['💀', '😱', '🌧️', '🩸', '💩', '⚠️', '🥀', '📉'];
  
  for (let i = 0; i < 20; i++) {
    const span = document.createElement('span');
    span.className = 'floating-emoji';
    span.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    
    const randomXOffset = (Math.random() - 0.5) * 600; 
    const randomYOffset = (Math.random() - 0.5) * 300;
    span.style.left = `calc(50% + ${randomXOffset}px)`;
    span.style.top = `calc(50% + ${randomYOffset}px)`;
    span.style.animationDelay = `${Math.random() * 0.8}s`;
    
    overlay.appendChild(span);
  }

  document.body.appendChild(overlay);

  setTimeout(() => {
    overlay.classList.add('fade-out');
    setTimeout(() => {
      if (overlay.parentElement) {
        overlay.remove();
      }
    }, 500); 
  }, 4000); 
}

/**
 * Получение текущих активных состояний персонажа из global/currentChar
 */
function getActiveCharacterConditions() {
  if (typeof currentCharacter !== 'undefined' && currentCharacter && Array.isArray(currentCharacter.conditions)) {
    return currentCharacter.conditions;
  }
  // Запасной вариант через DOM-элементы активных кнопок состояний
  const activeBtns = document.querySelectorAll('.condition-btn.active, .condition-btn[style*="border-color"]');
  const conditions = [];
  activeBtns.forEach(b => {
    const cond = b.getAttribute('data-condition');
    if (cond) conditions.push(cond);
  });
  return conditions;
}

/**
 * Проверка модификаторов броска на основе текущих состояний персонажа
 * Возвращает модифицированный режим и флаги
 */
function applyConditionsToRoll(isAttackOrCheck = true) {
  const conditions = getActiveCharacterConditions();
  let effectiveMode = currentRollMode;
  let forceCrit1 = false;
  let conditionNotes = [];

  // Перевес (Encumbered): скорость -10 футов, помеха на проверки Сил/Лов/Кон, требующие физических усилий
  if (conditions.includes('encumbered')) {
    if (isAttackOrCheck) {
      if (effectiveMode === 'normal') effectiveMode = 'disadvantage';
      conditionNotes.push('⚠️ [Перевес: помеха]');
    }
  }

  // Истощение (Exhaustion) или Паралич (Paralyzed) / Бессознательное (Unconscious)
  if (conditions.includes('paralyzed') || conditions.includes('unconscious')) {
    if (isAttackOrCheck) {
      forceCrit1 = true; // Автоматический провал / крит 1 для проверок
      conditionNotes.push('💀 [Обездвижен/Без сознания]');
    }
  }

  return { effectiveMode, forceCrit1, conditionNotes };
}

/**
 * Полный рендеринг интерфейса дайсов внутри #tabDice
 */
function renderDiceModule() {
  const diceTab = document.getElementById('tabDice') || document.querySelector('.tab-page:nth-child(6)');
  if (!diceTab) {
    console.warn('[DICE_RENDER] Вкладка дайсов (#tabDice) не найдена в DOM!');
    return;
  }

  diceTab.innerHTML = '';
  const mainCard = document.createElement('div');
  mainCard.className = 'card dice-container';
  mainCard.innerHTML = `
    <h3 style="text-align:center;margin-top:0;">🎲 Генератор бросков</h3>
    <div id="diceModePanel" style="display:flex;gap:8px;margin-bottom:12px;width:100%;">
      <button class="dice-mode-btn active" data-mode="normal" onclick="setDiceMode('normal')" style="flex:1;padding:10px 6px;background:#2196f3;color:#fff;border:1px solid #555;border-radius:6px;font-weight:bold;cursor:pointer;">Обычный</button>
      <button class="dice-mode-btn" data-mode="advantage" onclick="toggleDiceMode('advantage')" style="flex:1;padding:10px 6px;background:#333;color:#fff;border:1px solid #555;border-radius:6px;font-weight:bold;cursor:pointer;">Преимущество</button>
      <button class="dice-mode-btn" data-mode="disadvantage" onclick="toggleDiceMode('disadvantage')" style="flex:1;padding:10px 6px;background:#333;color:#fff;border:1px solid #555;border-radius:6px;font-weight:bold;cursor:pointer;">Помеха</button>
    </div>
    <div class="result-box" id="diceResult" style="text-align:center;font-size:1.15em;padding:12px;background:#2a2a2a;border-radius:6px;margin-bottom:10px;">Выбери кубик</div>
    <div class="dice-grid" style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin:12px 0;">
      <button class="dice-btn" onclick="rollDice(4)">d4</button>
      <button class="dice-btn" onclick="rollDice(6)">d6</button>
      <button class="dice-btn" onclick="rollDice(8)">d8</button>
      <button class="dice-btn" onclick="rollDice(10)">d10</button>
      <button class="dice-btn" onclick="rollDice(12)">d12</button>
      <button class="dice-btn" onclick="rollDice(20)">d20</button>
      <button class="dice-btn" onclick="rollDice(100)">d100</button>
    </div>
    <button id="quickWeaponAttackBtn" class="btn-action" onclick="executeEquippedWeaponAttack()" style="background:#ff9800;color:#000;font-weight:bold;padding:14px 10px;font-size:1em;width:100%;border-radius:8px;cursor:pointer;border:none;box-shadow:0 2px 4px rgba(0,0,0,.3);margin-top:8px;">⚔️ Атака экипированным оружием (d20 + мод)</button>
    <button id="diceLogToggle" onclick="toggleDiceLog()" style="width:100%;padding:10px;background:#252525;color:#d4af37;border:1px solid #444;border-radius:6px;font-weight:bold;cursor:pointer;margin-top:8px;">📜 История бросков ▾</button>
    <div id="diceLogWrapper" style="display:none;margin-top:8px;padding:10px;background:#1f1f1f;border-radius:6px;border:1px solid #333;">
      <div id="diceLogContainer" style="max-height:320px;overflow-y:auto;display:flex;flex-direction:column;gap:4px;"></div>
    </div>
  `;

  const drawerContainer = document.createElement('div');
  drawerContainer.id = 'diceDrawerContainer';
  drawerContainer.style.cssText = 'margin:12px 0;border:1px solid #444;border-radius:8px;background:#1a1a1a;overflow:hidden;';
  drawerContainer.innerHTML = `
    <button id="diceDrawerToggleBtn" onclick="toggleDiceDrawer()" style="width:100%;padding:12px;background:#252525;color:#d4af37;border:none;font-weight:bold;font-size:.95em;cursor:pointer;display:flex;justify-content:space-between;align-items:center;">
      <span>⚔️ Боевка, компаньоны, отдых и проверки</span><span id="drawerArrow">▾</span>
    </button>
    <div id="diceDrawerContent" style="max-height:0;overflow-y:auto;overflow-x:hidden;transition:max-height .3s ease-out;padding:0 12px;background:#161616;">
      <div style="padding:12px 0;">
        <div style="font-size:.9em;color:#ff9800;font-weight:bold;margin-bottom:8px;">⚔️ Боевые действия</div>
        <div style="font-size:.9em;color:#ff9800;font-weight:bold;margin-bottom:8px;">💪 Проверки характеристик</div>
        <div id="diceDrawerStatsGrid" style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px;margin-bottom:15px;"></div>
        <div style="font-size:.9em;color:#2196F3;font-weight:bold;margin-bottom:8px;">🎯 Проверки навыков</div>
        <div id="diceDrawerSkillsList" style="display:flex;flex-direction:column;gap:6px;max-height:250px;overflow-y:auto;padding-right:4px;"></div>
      </div>
    </div>
  `;

  // Все дополнительные игровые панели, которые другие модули добавляют прямо во вкладку
  // «Дайсы» (инициатива, компаньоны, отдых, боевые действия и т.п.), складываем в эту шторку.
  const drawerContent = drawerContainer.querySelector('#diceDrawerContent');
  const externalPanels = document.createElement('div');
  externalPanels.id = 'diceDrawerExternalPanels';
  externalPanels.style.cssText = 'display:flex;flex-direction:column;gap:12px;padding-top:12px;';
  drawerContent.appendChild(externalPanels);

  diceTab.appendChild(mainCard);
  diceTab.appendChild(drawerContainer);

  // Relocate known gameplay/combat panels into the drawer even if a module
  // created them before the dice UI finished rendering.
  const relocateGameplayPanels = () => {
    const host = document.getElementById('diceDrawerExternalPanels');
    const tab = document.getElementById('tabDice');
    if (!host || !tab) return;
    ['dndGameplayCoreV57','dndGameplayV58','combatEnginePanel','encounterBuilderPanel','dndCombatEnginePanel','dndEncounterBuilder'].forEach(id => {
      const node = document.getElementById(id);
      if (node && tab.contains(node) && !host.contains(node)) host.appendChild(node);
    });
    tab.querySelectorAll('[data-dnd-gameplay-panel="true"], .dnd-combat-panel, .dnd-gameplay-panel').forEach(node => {
      if (node !== mainCard && node !== drawerContainer && !host.contains(node)) host.appendChild(node);
    });
  };
  relocateGameplayPanels();
  if (window.__diceGameplayRelocationObserver) window.__diceGameplayRelocationObserver.disconnect();
  window.__diceGameplayRelocationObserver = new MutationObserver(() => {
    if (window.__diceGameplayRelocationQueued) return;
    window.__diceGameplayRelocationQueued = true;
    Promise.resolve().then(() => {
      window.__diceGameplayRelocationQueued = false;
      relocateGameplayPanels();
    });
  });
  window.__diceGameplayRelocationObserver.observe(diceTab, { childList: true });

  // Переносим уже существующие и вновь добавляемые панели из корня вкладки в шторку.
  // Главная карточка кубиков и сама шторка остаются единственными элементами снаружи.
  const moveExtraPanelsIntoDrawer = () => {
    Array.from(diceTab.children).forEach(node => {
      if (node === mainCard || node === drawerContainer || node.id === 'diceDrawerContainer') return;
      externalPanels.appendChild(node);
    });
    // Боевые элементы, созданные сторонними модулями, больше не занимают место в основном экране.
    if (externalPanels.children.length) {
      const label = drawerContainer.querySelector('#diceDrawerExternalHeading');
      if (!label) {
        const heading = document.createElement('div');
        heading.id = 'diceDrawerExternalHeading';
        heading.textContent = '⚔️ Поле боя, компаньоны, отдых и дополнительные игровые панели';
        heading.style.cssText = 'color:#ff9800;font-weight:bold;padding:8px 0;border-bottom:1px solid #444;';
        externalPanels.prepend(heading);
      }
    }
  };
  moveExtraPanelsIntoDrawer();
  if (window.__diceTabPanelObserver) window.__diceTabPanelObserver.disconnect();
  window.__diceTabPanelObserver = new MutationObserver(() => {
    // MutationObserver вызывается после добавления чужих панелей в tabDice.
    moveExtraPanelsIntoDrawer();
  });
  window.__diceTabPanelObserver.observe(diceTab, { childList: true });

  setDiceMode('normal');
}

function toggleDiceMode(mode) {
  setDiceMode(currentRollMode === mode ? 'normal' : mode);
}

function toggleDiceLog() {
  const wrapper = document.getElementById('diceLogWrapper');
  const button = document.getElementById('diceLogToggle');
  if (!wrapper || !button) return;
  const opening = wrapper.style.display === 'none';
  wrapper.style.display = opening ? 'block' : 'none';
  button.textContent = opening ? '📜 Лог бросков ▴' : '📜 Лог бросков ▾';
}

/**
 * Установка активного режима броска
 */
function setDiceMode(mode) {
  currentRollMode = mode;
  console.log(`[DICE_MODE] Режим броска изменен на: ${mode}`);
  const modeButtons = document.querySelectorAll('.dice-mode-btn');

  modeButtons.forEach(b => {
    const btnMode = b.getAttribute('data-mode');
    if (btnMode === mode && mode !== 'normal') {
      b.classList.add('active');
      if (mode === 'advantage') b.style.background = '#4CAF50';
      else if (mode === 'disadvantage') b.style.background = '#e53935';
    } else {
      b.classList.remove('active');
      b.style.background = '#333';
    }
  });
}

/**
 * Переключение шторки характеристик и навыков
 */
let isDrawerOpen = false;
function toggleDiceDrawer() {
  const contentDiv = document.getElementById('diceDrawerContent');
  const arrow = document.getElementById('drawerArrow');
  if (!contentDiv) return;

  isDrawerOpen = !isDrawerOpen;
  console.log(`[DICE_DRAWER] Шторка выбора бросков переключена. Состояние: ${isDrawerOpen ? 'Открыта' : 'Закрыта'}`);
  
  if (isDrawerOpen) {
    contentDiv.style.maxHeight = '75vh';
    if (arrow) arrow.textContent = '▴';
    populateDiceDrawerData();
  } else {
    contentDiv.style.maxHeight = '0';
    if (arrow) arrow.textContent = '▾';
  }
}

/**
 * Базовый генератор случайностей для грани sides
 */
function rollSingleDice(sides) {
  const parsedSides = parseInt(sides, 10);
  if (isNaN(parsedSides) || parsedSides < 1) return 1;
  const res = Math.floor(Math.random() * parsedSides) + 1;
  return res;
}

/**
 * Стандартный бросок кубика
 */
function rollDice(sides) {
  console.group(`[DICE_ROLL_BASIC] Бросок d${sides}`);
  const { effectiveMode, forceCrit1, conditionNotes } = applyConditionsToRoll(sides === 20);
  console.log(`Текущий режим: ${currentRollMode}, С учетом состояний: ${effectiveMode}`);

  let result = 0;
  let detailText = '';
  let rollTypeClass = 'norm-roll';

  const r1 = rollSingleDice(sides);
  console.log(`Первый бросок (r1): ${r1}`);

  if (forceCrit1 && sides === 20) {
    result = 1;
    detailText = `d20 [Принудительный провал из-за состояния] ➔ Итог: **1**`;
    rollTypeClass = 'dis-roll';
  } else if (effectiveMode === 'advantage') {
    const r2 = rollSingleDice(sides);
    console.log(`Второй бросок [Преимущество] (r2): ${r2}`);
    result = Math.max(r1, r2);
    const fR1 = r1 === result ? `**${r1}**` : r1;
    const fR2 = r2 === result ? `**${r2}**` : r2;
    detailText = `d${sides} [Преимущество] ➔ Броски: [${fR1}, ${fR2}] (Итог: ${result})`;
    rollTypeClass = 'adv-roll';
  } else if (effectiveMode === 'disadvantage') {
    const r2 = rollSingleDice(sides);
    console.log(`Второй бросок [Помеха] (r2): ${r2}`);
    result = Math.min(r1, r2);
    const fR1 = r1 === result ? `**${r1}**` : r1;
    const fR2 = r2 === result ? `**${r2}**` : r2;
    detailText = `d${sides} [Помеха] ➔ Броски: [${fR1}, ${fR2}] (Итог: ${result})`;
    rollTypeClass = 'dis-roll';
  } else {
    result = r1;
    detailText = `d${sides} ➔ [${result}]`;
    rollTypeClass = 'norm-roll';
  }

  if (conditionNotes.length > 0) {
    detailText += ` ${conditionNotes.join(' ')}`;
  }

  if (sides === 20) {
    if (result === 20 && !forceCrit1) triggerCritEffect(true);
    else if (result === 1 || forceCrit1) triggerCritEffect(false);
  }

  console.log(`Итоговое значение броска кубика: ${result}`);
  console.groupEnd();

  const resBox = document.getElementById('diceResult');
  if (resBox) resBox.textContent = `Результат: ${result}`;

  appendDiceLog(detailText, rollTypeClass);
  return result;
}

/**
 * Заполнение данных характеристик и навыков из глобальных данных
 */
function populateDiceDrawerData() {
  console.log('[DICE_DRAWER_POPULATE] Заполнение интерфейса шторки характеристик и навыков...');
  if (typeof updateSkillsState === 'function') {
    updateSkillsState();
  }

  const statsGrid = document.getElementById('diceDrawerStatsGrid');
  if (statsGrid) {
    const statsConfig = typeof STATS_CONFIG !== 'undefined' ? STATS_CONFIG : [
      { id: 'str', name: 'Сила' }, { id: 'dex', name: 'Ловкость' },
      { id: 'con', name: 'Телосложение' }, { id: 'int', name: 'Интеллект' },
      { id: 'wis', name: 'Мудрость' }, { id: 'cha', name: 'Харизма' }
    ];

    let html = '';
    statsConfig.forEach(st => {
      const mod = typeof getStatModNum === 'function' ? getStatModNum(st.id) : 0;
      const modStr = mod >= 0 ? '+' + mod : mod;
      html += `
        <button onclick="rollStatCheck('${st.id}', '${st.name}')" style="background: #2a2a2a; border: 1px solid #444; color: #fff; padding: 8px; border-radius: 6px; cursor: pointer; text-align: left; display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 0.85em; font-weight: bold;">${st.name}</span>
          <span style="background: rgba(212,175,55,0.2); color: #d4af37; padding: 2px 6px; border-radius: 4px; font-size: 0.85em; font-family: monospace;">${modStr}</span>
        </button>
      `;
    });
    statsGrid.innerHTML = html;
  }

  const skillsList = document.getElementById('diceDrawerSkillsList');
  if (skillsList) {
    const skillsConfig = typeof SKILLS_CONFIG !== 'undefined' ? SKILLS_CONFIG : [];
    const profBonus = typeof getProfBonusNum === 'function' ? getProfBonusNum() : 2;
    
    const skillsDataObj = (typeof currentChar !== 'undefined' && currentChar && currentChar.skillsData)
      ? currentChar.skillsData
      : {};

    let html = '';
    skillsConfig.forEach(sk => {
      const baseMod = typeof getStatModNum === 'function' ? getStatModNum(sk.stat) : 0;
      const mult = skillsDataObj[sk.id] || 0;

      let badgeTag = '';
      let bonusMultiplier = 0;

      if (mult === 2) {
        bonusMultiplier = 2;
        badgeTag = ' <span style="color: #FFD700; font-size: 0.8em;" title="Экспертность">✦</span>';
      } else if (mult === 1) {
        bonusMultiplier = 1;
        badgeTag = ' <span style="color: #4CAF50; font-size: 0.8em;" title="Владение">●</span>';
      }

      const totalMod = baseMod + (profBonus * bonusMultiplier);
      const modStr = totalMod >= 0 ? '+' + totalMod : totalMod;
      const statNameShort = (sk.stat || '').toUpperCase();

      html += `
        <button onclick="rollSkillCheck('${sk.id}', '${sk.name}', '${sk.stat}')" style="background: #222; border: 1px solid #333; color: #fff; padding: 6px 10px; border-radius: 6px; cursor: pointer; display: flex; justify-content: space-between; align-items: center;">
          <div style="text-align: left;">
            <span style="font-size: 0.85em; font-weight: bold;">${sk.name}</span>${badgeTag}
            <span style="font-size: 0.75em; color: #888; margin-left: 4px;">(${statNameShort})</span>
          </div>
          <span style="background: rgba(33,150,243,0.2); color: #64B5F6; padding: 2px 6px; border-radius: 4px; font-size: 0.85em; font-family: monospace;">${modStr}</span>
        </button>
      `;
    });
    skillsList.innerHTML = html;
  }
}

/**
 * Выполнение чистой проверки характеристики
 */
function rollStatCheck(statId, statName) {
  console.group(`[DICE_STAT_CHECK] Проверка характеристики: ${statName} (${statId})`);
  const mod = typeof getStatModNum === 'function' ? getStatModNum(statId) : 0;
  console.log(`Характеристика: ${statId}, Вычисленный мод: ${mod}`);
  executeD20Check(`Проверка: ${statName}`, mod);
  console.groupEnd();
}

/**
 * Выполнение проверки навыка с детальной отладкой
 */
function rollSkillCheck(skillId, skillName, statId) {
  console.group(`[DICE_SKILL_CHECK] Проверка навыка: "${skillName}" (ID: ${skillId}, Базовая характеристика: ${statId})`);

  if (typeof updateSkillsState === 'function') {
    updateSkillsState();
  }

  const baseMod = typeof getStatModNum === 'function' ? getStatModNum(statId) : 0;
  const profBonus = typeof getProfBonusNum === 'function' ? getProfBonusNum() : 2;

  const skillsDataObj = (typeof currentChar !== 'undefined' && currentChar && currentChar.skillsData)
    ? currentChar.skillsData
    : {};
  const mult = skillsDataObj[skillId] || 0;

  const isExpert = (mult === 2);
  const isProficient = (mult >= 1);

  let totalMod = baseMod;
  let statusText = '';

  if (isExpert) {
    totalMod += (profBonus * 2);
    statusText = ' [Экспертность]';
  } else if (isProficient) {
    totalMod += profBonus;
    statusText = ' [Владение]';
  }

  let variableNameUsed = '';
  let finalSkillModifier = totalMod;
  
  if (SKILL_TO_VAR_MAP[skillId] && typeof window[SKILL_TO_VAR_MAP[skillId]] !== 'undefined') {
    variableNameUsed = SKILL_TO_VAR_MAP[skillId];
    finalSkillModifier = Number(window[variableNameUsed]) || totalMod;
  }

  executeD20Check(`Навык: ${skillName}${statusText}`, finalSkillModifier, variableNameUsed);
  console.groupEnd();
}

/**
 * Выполнение стандартной проверки d20 + модификатор с учетом состояний
 */
function executeD20Check(title, modifier, varName = '') {
  console.group(`[DICE_EXECUTE_D20] Запуск d20 проверки для: "${title}" с модификатором: ${modifier}`);
  const { effectiveMode, forceCrit1, conditionNotes } = applyConditionsToRoll(true);

  let d20Result = 0;
  const r1 = rollSingleDice(20);
  let detailText = '';
  let rollTypeClass = 'norm-roll';

  const modStr = modifier >= 0 ? '+' + modifier : modifier;
  const modSourceLabel = varName ? `window.${varName} (${modStr})` : `мод (${modStr})`;

  if (forceCrit1) {
    d20Result = 1;
    detailText = `🎲 ${title} [Принудительный провал / Состояние]\nd20 бросок: [**1**] | d20 + ${modSourceLabel}`;
    rollTypeClass = 'dis-roll';
  } else if (effectiveMode === 'advantage') {
    const r2 = rollSingleDice(20);
    d20Result = Math.max(r1, r2);
    const fR1 = r1 === d20Result ? `**${r1}**` : r1;
    const fR2 = r2 === d20Result ? `**${r2}**` : r2;
    detailText = `🎲 ${title} [Преимущество]\nd20 броски: [${fR1}, ${fR2}] | d20 + ${modSourceLabel}`;
    rollTypeClass = 'adv-roll';
  } else if (effectiveMode === 'disadvantage') {
    const r2 = rollSingleDice(20);
    d20Result = Math.min(r1, r2);
    const fR1 = r1 === d20Result ? `**${r1}**` : r1;
    const fR2 = r2 === d20Result ? `**${r2}**` : r2;
    detailText = `🎲 ${title} [Помеха]\nd20 броски: [${fR1}, ${fR2}] | d20 + ${modSourceLabel}`;
    rollTypeClass = 'dis-roll';
  } else {
    d20Result = r1;
    detailText = `🎲 ${title}: d20 [${d20Result}] + ${modSourceLabel}`;
    rollTypeClass = 'norm-roll';
  }

  if (conditionNotes.length > 0) {
    detailText += ` ${conditionNotes.join(' ')}`;
  }

  if (d20Result === 20 && !forceCrit1) {
    triggerCritEffect(true);
  } else if (d20Result === 1 || forceCrit1) {
    triggerCritEffect(false);
  }

  const finalTotal = d20Result + modifier;
  let critNote = '';
  if (d20Result === 20 && !forceCrit1) critNote = ' 🔥 **КРИТИЧЕСКИЙ УСПЕХ!**';
  else if (d20Result === 1 || forceCrit1) critNote = ' 💀 **КРИТИЧЕСКИЙ ПРОВАЛ!**';

  detailText += ` ➔ Итог: **${finalTotal}**${critNote}`;
  console.groupEnd();

  const resBox = document.getElementById('diceResult');
  if (resBox) resBox.textContent = `Итог: ${finalTotal} (${finalTotal >= 0 ? '+' + finalTotal : finalTotal})`;

  appendDiceLog(detailText, rollTypeClass);
}

/**
 * Расчет и бросок урона оружия
 */
function rollWeaponDamage(weaponName, damageString, critical) {
  console.group(`[DICE_WEAPON_DAMAGE] Бросок урона оружия: "${weaponName}"`);
  if (!damageString) damageString = '1d6';

  const cleanStr = damageString.toLowerCase().replace(/\s+/g, '');
  let totalSum = 0;
  const rolls = [];

  const diceMatch = cleanStr.match(/(\d+)d(\d+)/);
  const modifierMatch = cleanStr.match(/([+-]\d+)$/);

  const diceCount = diceMatch ? parseInt(diceMatch[1], 10) || 1 : 1;
  const diceSides = diceMatch ? parseInt(diceMatch[2], 10) || 6 : 6;
  const modVal = modifierMatch ? parseInt(modifierMatch[1], 10) : 0;

  const effectiveDiceCount = Math.max(1, diceCount * (critical ? 2 : 1));

  for (let i = 0; i < effectiveDiceCount; i++) {
    const r = rollSingleDice(diceSides);
    rolls.push(r);
    totalSum += r;
  }

  totalSum += modVal;

  let logText = `🎲 Просмотр урона (${weaponName})${critical ? ' • КРИТ ×2 кубов' : ''}: ${damageString}\nБроски кубов: [${rolls.join(', ')}]`;
  if (modVal !== 0) {
    logText += ` | Мод: ${modVal > 0 ? '+' + modVal : modVal}`;
  }
  logText += ` ➔ Итог: ${totalSum}`;

  console.groupEnd();
  appendDiceLog(logText, 'norm-roll');
  return totalSum;
}

/**
 * Автоматическая атака экипированным оружием с учетом состояний
 */
function executeEquippedWeaponAttack() {
  console.group('[DICE_WEAPON_ATTACK] Выполнение атаки экипированным оружием');
  if (typeof currentCharacter === 'undefined' || !currentCharacter) {
    alert('⚠️ Персонаж не выбран!');
    console.groupEnd();
    return;
  }

  let equippedWeapon = null;
  if (currentCharacter.inventory && Array.isArray(currentCharacter.inventory.weapons)) {
    equippedWeapon = currentCharacter.inventory.weapons.find(w => w.equipped === true);
  }

  if (!equippedWeapon) {
    alert('❌ У персонажа нет экипированного оружия!');
    console.groupEnd();
    return;
  }

  const { effectiveMode, forceCrit1, conditionNotes } = applyConditionsToRoll(true);

  const weaponName = equippedWeapon.name || 'Оружие';
  const stats = currentCharacter.stats || { str: 10, dex: 10 };
  const strMod = Math.floor(((parseInt(stats.str, 10) || 10) - 10) / 2);
  const dexMod = Math.floor(((parseInt(stats.dex, 10) || 10) - 10) / 2);

  let chosenMod = strMod;
  let modName = 'Сила';

  const cat = (equippedWeapon.category || '').toLowerCase();
  const props = Array.isArray(equippedWeapon.properties) ? equippedWeapon.properties.map(p => p.toLowerCase()) : [];
  const nameLower = weaponName.toLowerCase();

  const isFinesse = props.includes('фехтовальное') || props.includes('finesse') || cat.includes('фехтовальное');
  const isRanged = props.includes('дальнобойное') || props.includes('боеприпас') || cat.includes('дальнобойное') || nameLower.includes('лук') || nameLower.includes('арбалет');

  if (isRanged) {
    chosenMod = dexMod;
    modName = 'Ловкость';
  } else if (isFinesse) {
    if (dexMod > strMod) {
      chosenMod = dexMod;
      modName = 'Ловкость (фехт.)';
    } else {
      chosenMod = strMod;
      modName = 'Сила (фехт.)';
    }
  }

  const proficiencyBonus = typeof getProfBonusNum === 'function' ? getProfBonusNum() : 2;
  const totalAttackBonus = chosenMod + proficiencyBonus;

  let d20Result = 0;
  const r1 = rollSingleDice(20);
  let detailText = '';
  let rollTypeClass = 'norm-roll';

  const modDisplay = totalAttackBonus >= 0 ? '+' + totalAttackBonus : totalAttackBonus;

  if (forceCrit1) {
    d20Result = 1;
    detailText = `🎯 Атака (${weaponName}) [Принудительный провал / Состояние]\nd20 бросок: [**1**] | Мод (${modName}: ${modDisplay})`;
    rollTypeClass = 'dis-roll';
  } else if (effectiveMode === 'advantage') {
    const r2 = rollSingleDice(20);
    d20Result = Math.max(r1, r2);
    const fR1 = r1 === d20Result ? `**${r1}**` : r1;
    const fR2 = r2 === d20Result ? `**${r2}**` : r2;
    detailText = `🎯 Атака (${weaponName}) [Преимущество]\nd20 броски: [${fR1}, ${fR2}] | Мод (${modName}: ${modDisplay})`;
    rollTypeClass = 'adv-roll';
  } else if (effectiveMode === 'disadvantage') {
    const r2 = rollSingleDice(20);
    d20Result = Math.min(r1, r2);
    const fR1 = r1 === d20Result ? `**${r1}**` : r1;
    const fR2 = r2 === d20Result ? `**${r2}**` : r2;
    detailText = `🎯 Атака (${weaponName}) [Помеха]\nd20 броски: [${fR1}, ${fR2}] | Мод (${modName}: ${modDisplay})`;
    rollTypeClass = 'dis-roll';
  } else {
    d20Result = r1;
    detailText = `🎯 Атака (${weaponName}): d20 [${d20Result}] | Мод (${modName}: ${modDisplay})`;
    rollTypeClass = 'norm-roll';
  }

  if (conditionNotes.length > 0) {
    detailText += ` ${conditionNotes.join(' ')}`;
  }

  if (d20Result === 20 && !forceCrit1) {
    triggerCritEffect(true);
  } else if (d20Result === 1 || forceCrit1) {
    triggerCritEffect(false);
  }

  const finalAttackTotal = d20Result + totalAttackBonus;
  let critNote = '';
  if (d20Result === 20 && !forceCrit1) critNote = ' 🔥 **КРИТИЧЕСКОЕ ПОПАДАНИЕ!**';
  else if (d20Result === 1 || forceCrit1) critNote = ' 💀 **КРИТИЧЕСКИЙ ПРОМАХ!**';

  detailText += ` ➔ Итог атаки: **${finalAttackTotal}**${critNote}`;
  appendDiceLog(detailText, rollTypeClass);

  if (equippedWeapon.damage && !forceCrit1 && d20Result !== 1) {
    rollWeaponDamage(weaponName, equippedWeapon.damage, d20Result === 20 && !forceCrit1);
  }

  console.groupEnd();
  return finalAttackTotal;
}

/**
 * Запись информации в лог бросков
 */
function appendDiceLog(text, rollTypeClass) {
  const logContainer = document.getElementById('diceLogContainer');
  if (!logContainer) return;

  const logItem = document.createElement('div');

  let bgStyle = '#2a2a2a';
  let borderLeftColor = '#555';
  let textColor = '#fff';

  if (rollTypeClass === 'adv-roll') {
    bgStyle = 'rgba(46, 125, 50, 0.35)';
    borderLeftColor = '#4CAF50';
    textColor = '#c8e6c9';
  } else if (rollTypeClass === 'dis-roll') {
    bgStyle = 'rgba(198, 40, 40, 0.35)';
    borderLeftColor = '#e53935';
    textColor = '#ffcdd2';
  }

  logItem.style.cssText = `background: ${bgStyle}; border-left: 4px solid ${borderLeftColor}; padding: 9px 12px; margin-bottom: 6px; border-radius: 4px; font-size: 0.85em; color: ${textColor}; display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; white-space: pre-line; box-shadow: 0 1px 3px rgba(0,0,0,0.2);`;

  const now = new Date();
  const timeString = now.toTimeString().split(' ')[0];

  const textSpan = document.createElement('span');
  textSpan.style.flex = '1';

  const safeText = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  const parsedHtml = safeText.replace(/\*\*(.*?)\*\*/g, '<b style="color: #fff; text-decoration: underline;">$1</b>');
  textSpan.innerHTML = parsedHtml;

  const timeSpan = document.createElement('span');
  timeSpan.style.cssText = 'font-size: 0.8em; opacity: 0.7; white-space: nowrap; margin-top: 1px; font-family: monospace;';
  timeSpan.textContent = `[${timeString}]`;

  logItem.appendChild(textSpan);
  logItem.appendChild(timeSpan);

  logContainer.insertBefore(logItem, logContainer.firstChild);

  if (logContainer.children.length > 30) {
    logContainer.removeChild(logContainer.lastChild);
  }
}
