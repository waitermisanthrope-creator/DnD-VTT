/**
 * Модуль общих настроек приложения (settings.js)
 */
const APP_THEMES = {
  orange: { name: 'D&D Оранжевый', primary: '#ff9800', accent: '#e53935' },
  purple: { name: 'Некромантский фиолетовый', primary: '#9c27b0', accent: '#7b1fa2' },
  blue: { name: 'Магический синий', primary: '#2196F3', accent: '#00bcd4' },
  red: { name: 'Кроваво-красный', primary: '#e53935', accent: '#b71c1c' }
};

const APP_FONTS = {
  inter: { name: 'Интер (Строгий и чистый)', family: "'Inter', sans-serif" },
  playfair: { name: 'Плейфэйр (Книжный с засечками)', family: "'Playfair Display', serif" },
  cinzel: { name: 'Чинзель (Фэнтези манускрипт)', family: "'Cinzel Decorative', cursive, serif" }
};

function openSettingsModal() {
  let modal = document.getElementById('settingsModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'settingsModal';
    modal.style.cssText = `
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.85);
      z-index: 20005;
      justify-content: center;
      align-items: center;
      padding: 15px;
      box-sizing: border-box;
      backdrop-filter: blur(4px);
    `;
    modal.innerHTML = `
      <div style="background: #1e1e1e; padding: 22px; border-radius: 10px; width: 100%; max-width: 450px; border: 1px solid #444; box-shadow: 0 10px 25px rgba(0,0,0,0.5); color: #fff; position: relative; max-height: 90vh; overflow-y: auto;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #444; padding-bottom: 10px; margin-bottom: 15px;">
          <h3 style="margin: 0; color: var(--theme-primary, #ff9800); font-size: 1.2em;">⚙️ Настройки приложения</h3>
          <button onclick="closeSettingsModal()" style="background: #e53935; color: #fff; border: none; padding: 6px 10px; border-radius: 6px; cursor: pointer; font-weight: bold;">✕</button>
        </div>
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div style="background: #252525; padding: 12px; border-radius: 6px; border: 1px solid #333;">
            <div style="font-size: 0.95em; font-weight: bold; margin-bottom: 8px; color: var(--theme-primary, #ff9800);">🎨 Тема оформления (Акцент)</div>
            <select id="settingsThemeSelect" onchange="applyAppTheme(this.value)" style="width: 100%; padding: 8px; background: #1e1e1e; color: #fff; border: 1px solid #444; border-radius: 4px; box-sizing: border-box;">
              <option value="orange">D&D Оранжевый</option>
              <option value="purple">Некромантский фиолетовый</option>
              <option value="blue">Магический синий</option>
              <option value="red">Кроваво-красный</option>
            </select>
          </div>
          <div style="background: #252525; padding: 12px; border-radius: 6px; border: 1px solid #333;">
            <div style="font-size: 0.95em; font-weight: bold; margin-bottom: 8px; color: var(--theme-primary, #ff9800);">✍️ Типографика (Шрифт интерфейса)</div>
            <select id="settingsFontSelect" onchange="applyAppFont(this.value)" style="width: 100%; padding: 8px; background: #1e1e1e; color: #fff; border: 1px solid #444; border-radius: 4px; box-sizing: border-box;">
              <option value="inter">Интер (Строгий и чистый)</option>
              <option value="playfair">Плейфэйр (Книжный с засечками)</option>
              <option value="cinzel">Чинзель (Фэнтези манускрипт)</option>
            </select>
          </div>
          <div style="background: #252525; padding: 12px; border-radius: 6px; border: 1px solid #333;">
            <div style="font-size: 0.95em; font-weight: bold; margin-bottom: 8px; color: var(--theme-primary, #ff9800);">🖼️ Обои и арты</div>
            <button onclick="if(typeof openWallpapersModal === 'function') openWallpapersModal()" class="btn-action" style="background: #673AB7; width: 100%; padding: 10px; font-size: 0.85em; font-weight: bold; cursor: pointer; color: #fff; border: 1px solid #7E57C2; border-radius: 6px;">Открыть настройки обоев</button>
          </div>
          <div style="background: #252525; padding: 12px; border-radius: 6px; border: 1px solid #333;">
            <div style="font-size: 0.95em; font-weight: bold; margin-bottom: 8px; color: var(--theme-primary, #ff9800);">🎵 Аудио и Эмбиент</div>
            <button onclick="if(typeof openAmbienceModal === 'function') openAmbienceModal()" class="btn-action" style="background: #FF9800; width: 100%; padding: 10px; font-size: 0.85em; font-weight: bold; cursor: pointer; color: #000; border: none; border-radius: 6px;">🎵 Настройки эмбиента и музыки</button>
          </div>
          <div style="background: #252525; padding: 12px; border-radius: 6px; border: 1px solid #5d492a;">
            <div style="font-size: 0.95em; font-weight: bold; margin-bottom: 8px; color: #e5c878;">📜 История изменений</div>
            <div style="font-size: 0.78em; color: #aaa; line-height: 1.4; margin-bottom: 8px;">Здесь всегда можно посмотреть, что изменилось в установленной версии.</div>
            <button onclick="if(typeof window.openDndChangelog==='function') window.openDndChangelog()" class="btn-action" style="background:#30281c; width:100%; padding:9px; font-size:0.82em; font-weight:bold; cursor:pointer; color:#f5d77b; border:1px solid #66502e; border-radius:6px;">📜 Открыть «Что нового»</button>
          </div>
          <div style="background: #252525; padding: 12px; border-radius: 6px; border: 1px solid #333;">
            <div style="font-size: 0.95em; font-weight: bold; margin-bottom: 8px; color: #4FC3F7;">🔄 Обновления приложения</div>
            <div style="font-size: 0.78em; color: #c7c7c7; margin-bottom: 8px;">Установленная версия: <strong id="settingsCurrentVersion" style="color:#fff;">—</strong></div>
            <div id="settingsUpdateProgress" style="display:none;margin-top:8px;">
  <div id="settingsUpdateProgressLabel" style="font-size:.78em;color:#aaa;margin-bottom:5px;">Загрузка обновления: 0%</div>
  <div style="height:9px;background:#333;border-radius:999px;overflow:hidden;border:1px solid #555;"><div id="settingsUpdateProgressBar" style="height:100%;width:0%;background:var(--theme-primary,#ff9800);transition:width .2s;"></div></div>
</div>
<div id="settingsUpdateStatus" style="font-size: 0.78em; color: #aaa; line-height: 1.4; margin-bottom: 8px;">Проверка обновлений доступна, когда настроен канал распространения.</div>
            <div style="display:flex; gap:8px;">
              <button onclick="if(window.DND_UPDATE_UI) DND_UPDATE_UI.check()" class="btn-action" style="background:#1976D2; flex:1; padding:9px; font-size:0.8em; font-weight:bold; cursor:pointer; color:#fff; border:none; border-radius:6px;">🔎 Проверить</button>
              <button id="settingsUpdateApplyButton" onclick="if(window.DND_UPDATE_UI) DND_UPDATE_UI.apply()" class="btn-action" style="display:none; background:#2E7D32; flex:1; padding:9px; font-size:0.8em; font-weight:bold; cursor:pointer; color:#fff; border:none; border-radius:6px;">⬇️ Установить</button>
            </div>
          </div>
          <div style="background: #252525; padding: 12px; border-radius: 6px; border: 1px solid #333;">
            <label style="display: flex; align-items: center; gap: 10px; cursor: pointer; margin-bottom: 8px;">
              <input type="checkbox" id="settingsDebugToggle" onchange="toggleDebugMode(this.checked)" style="width: 18px; height: 18px; cursor: pointer;">
              <span style="font-size: 0.95em; font-weight: bold;">Включить режим отладки (🐞)</span>
            </label>
            <div id="settingsDebugButtonWrapper" style="display: none; margin-top: 8px;">
              <button onclick="openDevMenuModal()" class="btn-action" style="background: #37474F; width: 100%; padding: 10px; font-size: 0.85em; font-weight: bold; cursor: pointer; border: 1px solid #546E7A; border-radius: 6px; color: #fff;">🛠️ Меню разработчика</button>
              <button onclick="openDebugLogsModal()" class="btn-action" style="background:#455a64; width:100%; margin-top:8px; padding:10px; font-size:0.85em; font-weight:bold; cursor:pointer; border:1px solid #607d8b; border-radius:6px; color:#fff;">📜 Логи отладки</button>
            </div>
          </div>
          <div style="background: #252525; padding: 12px; border-radius: 6px; border: 1px solid #333;">
            <div style="font-size: 0.95em; font-weight: bold; margin-bottom: 8px; color: var(--theme-primary, #ff9800);">🛠️ Авторское DLC: Ремесла и износ</div>
            <label style="display:flex;align-items:center;gap:10px;cursor:pointer;margin-bottom:7px;">
              <input type="checkbox" id="settingsCraftingDlcToggle" onchange="if(window.DND_CRAFTING_DLC_V50) DND_CRAFTING_DLC_V50.setEnabled(this.checked)" style="width:18px;height:18px;cursor:pointer;">
              <span style="font-size:0.95em;font-weight:bold;">Использовать ремесла и износ</span>
            </label>
            <div id="settingsCraftingDlcStatus" style="font-size:0.76em;color:#aaa;margin:5px 0 8px;"></div>
            <button onclick="if(window.DND_CRAFTING_DLC_V50) DND_CRAFTING_DLC_V50.openInfo()" class="btn-action" style="background:#594a31;width:100%;padding:9px;font-size:0.8em;font-weight:bold;cursor:pointer;color:#fff;border:1px solid #806b45;border-radius:6px;">ℹ️ О дополнении</button>
          </div>
          <div style="background: #252525; padding: 12px; border-radius: 6px; border: 1px solid #333;">
            <div style="font-size: 0.95em; font-weight: bold; margin-bottom: 8px; color: #2196F3;">💾 Резервное копирование данных</div>
            <div style="display: flex; gap: 8px; margin-top: 8px;">
              <button onclick="exportAllDataBackup()" class="btn-action" style="background: #2196F3; flex: 1; padding: 10px; font-size: 0.85em; font-weight: bold; cursor: pointer;">💾 Сохранить</button>
              <button onclick="document.getElementById('importBackupFile').click()" class="btn-action" style="background: #4CAF50; flex: 1; padding: 10px; font-size: 0.85em; font-weight: bold; cursor: pointer;">📂 Загрузить</button>
              <input type="file" id="importBackupFile" style="display: none;" accept=".json" onchange="importAllDataBackup(event)">
            </div>
          </div>
          <div style="background: #2a1515; padding: 12px; border-radius: 6px; border: 1px solid #552222;">
            <div style="font-size: 0.95em; font-weight: bold; margin-bottom: 8px; color: #e53935;">⚠️ Опасная зона</div>
            <button onclick="resetAppToDefaults()" class="btn-action" style="background: #e53935; width: 100%; padding: 10px; font-size: 0.85em; font-weight: bold; cursor: pointer; color: #fff;">🗑️ Сбросить данные приложения</button>
          </div>
        </div>
        <div style="margin-top: 20px; display: flex; justify-content: flex-end;">
          <button onclick="closeSettingsModal()" class="btn-action" style="background: #444; color: #fff; padding: 10px 16px; border-radius: 6px; cursor: pointer;">Закрыть</button>
        </div>
      </div>
    `;
    modal.addEventListener('click', (event) => {
      if (event.target === modal) closeSettingsModal();
    });
    document.body.appendChild(modal);
  }

  const currentVersion = document.getElementById('settingsCurrentVersion');
  if (currentVersion) {
    const version = (window.DND_UPDATE_MANAGER && window.DND_UPDATE_MANAGER.VERSION) ||
      (window.DND_UPDATE_MANAGER && window.DND_UPDATE_MANAGER.getConfig && window.DND_UPDATE_MANAGER.getConfig().version) || '70.25.68';
    currentVersion.textContent = 'v' + version;
  }

  const isDebug = localStorage.getItem('dnd_debug_enabled') === 'true';
  const debugToggle = document.getElementById('settingsDebugToggle');
  const debugWrapper = document.getElementById('settingsDebugButtonWrapper');
  if (debugToggle) debugToggle.checked = isDebug;
  if (debugWrapper) debugWrapper.style.display = isDebug ? 'block' : 'none';

  const themeSelect = document.getElementById('settingsThemeSelect');
  if (themeSelect) {
    themeSelect.value = localStorage.getItem('dnd_app_theme') || 'orange';
  }

  const fontSelect = document.getElementById('settingsFontSelect');
  if (fontSelect) {
    fontSelect.value = localStorage.getItem('dnd_app_font') || 'inter';
  }

  if (window.DND_CRAFTING_DLC_V50) window.DND_CRAFTING_DLC_V50.renderStatus();

  modal.style.display = 'flex';
}

function closeSettingsModal() {
  const modal = document.getElementById('settingsModal');
  if (modal) modal.style.display = 'none';
}

/**
 * Вспомогательная функция получения списка персонажей из всех возможных источников
 */
function getDevCharactersList() {
  if (typeof savedCharacters !== 'undefined' && Array.isArray(savedCharacters) && savedCharacters.length > 0) {
    return savedCharacters;
  }
  if (typeof allCharacters !== 'undefined' && Array.isArray(allCharacters) && allCharacters.length > 0) {
    return allCharacters;
  }
  try {
    const localData = localStorage.getItem('dnd_multi_characters_v2');
    if (localData) {
      const parsed = JSON.parse(localData);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch(e) {
    console.error("Ошибка чтения персонажей:", e);
  }
  return [];
}

/**
 * Синхронизация состояния выбранного персонажа в меню разработчика
 */
function updateDevCharacterUI() {
  const chars = getDevCharactersList();
  const select = document.getElementById('devCharSelect');
  const lvlInput = document.getElementById('devLevelInput');
  const lvlDisplay = document.getElementById('devCurrentLevelDisplay');
  const charInfo = document.getElementById('devCharInfo');

  if (!select) return;

  if (chars.length === 0) {
    select.innerHTML = '<option value="">-- Нет персонажей --</option>';
    if (lvlDisplay) lvlDisplay.textContent = '-';
    if (lvlInput) lvlInput.value = 1;
    if (charInfo) charInfo.textContent = 'Создайте персонажа в приложении.';
    return;
  }

  let activeHero = window.currentCharacter || window.currentChar;
  let currId = activeHero ? (activeHero.id || activeHero.name) : null;

  select.innerHTML = chars.map((c, idx) => {
    const cId = c.id || c.name || idx;
    const name = c.name || c.charName || `Персонаж #${idx + 1}`;
    const level = (typeof window.getCharacterLevel === 'function' && (window.currentCharacter === c || window.currentChar === c)) 
      ? window.getCharacterLevel() 
      : (c.level || (c.classes && c.classes[0] ? c.classes[0].level : 1));
    return `<option value="${cId}">${name} (Ур. ${level})</option>`;
  }).join('');

  if (currId) {
    select.value = currId;
  } else {
    window.currentCharacter = chars[0];
    window.currentChar = chars[0];
    select.value = chars[0].id || chars[0].name || 0;
  }

  const activeLvl = (typeof window.getCharacterLevel === 'function') 
    ? window.getCharacterLevel() 
    : (window.currentCharacter ? (window.currentCharacter.level || 1) : 1);

  if (lvlDisplay) lvlDisplay.textContent = activeLvl;
  if (lvlInput) lvlInput.value = activeLvl;

  const currentHero = window.currentCharacter || window.currentChar;
  if (charInfo && currentHero) {
    let className = "Класс не указан";
    if (currentHero.classes && currentHero.classes.length > 0) {
      className = currentHero.classes[0].name;
    } else if (currentHero.className) {
      className = String(currentHero.className).replace(/[0-9]/g, '').trim();
    }
    charInfo.textContent = `Класс: ${className} | Здоровье: ${currentHero.hpMax || currentHero.hp?.max || '?'} HP`;
  }
}

/**
 * Смена текущего персонажа из слайдера/селектора меню разработчика
 */
function onDevCharSelectChange(val) {
  const chars = getDevCharactersList();
  const found = chars.find(c => String(c.id || c.name) === String(val));
  if (found) {
    window.currentCharacter = found;
    window.currentChar = found; // Назначаем глобальную переменную currentChar для skills.js
    
    // Синхронизация UI главного экрана
    if (typeof loadCharacterToUI === 'function') {
      loadCharacterToUI(found);
    } else if (typeof renderCharacter === 'function') {
      renderCharacter(found);
    }
    
    if (typeof calculateMods === 'function') {
      calculateMods();
    }
  }
  updateDevCharacterUI();
}

/**
 * Ручное изменение уровня (с добавлением/вычитанием дельты)
 */
function devAdjustLevel(delta) {
  const hero = window.currentCharacter || window.currentChar;
  if (!hero) {
    alert("Выберите персонажа!");
    return;
  }
  const currentLvl = (typeof window.getCharacterLevel === 'function') ? window.getCharacterLevel() : Number(hero.level || 1);
  devSetLevelDirect(currentLvl + delta);
}

/**
 * Прямая установка уровня через ввод
 */
function devSetLevelDirect(targetLvl) {
  const hero = window.currentCharacter || window.currentChar;
  if (!hero) {
    alert("Выберите персонажа!");
    return;
  }
  let newLvl = parseInt(targetLvl, 10);
  if (isNaN(newLvl)) return;
  newLvl = Math.max(1, Math.min(20, newLvl));

  if (typeof window.setCharacterLevel === 'function') {
    window.setCharacterLevel(newLvl, 0);
  } else {
    hero.level = newLvl;
    if (hero.classes && hero.classes.length > 0) {
      hero.classes[0].level = newLvl;
    }
  }

  if (typeof renderCharacterList === 'function') {
    renderCharacterList();
  }
  updateDevCharacterUI();
}

/**
 * Вызов стандартной модалки Level Up из level_up.js
 */
function devTriggerLevelUpModal() {
  const hero = window.currentCharacter || window.currentChar;
  if (!hero) {
    alert("Персонаж не выбран!");
    return;
  }
  if (typeof openLevelUpModal === 'function') {
    closeDevMenuModal();
    openLevelUpModal();
  } else {
    alert("Модуль level_up.js не загружен или функция openLevelUpModal отсутствует!");
  }
}

/**
 * Модальное окно Меню разработчика
 */
function openDevMenuModal() {
  let devModal = document.getElementById('devMenuModal');
  if (!devModal) {
    devModal = document.createElement('div');
    devModal.id = 'devMenuModal';
    devModal.style.cssText = `
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.85);
      z-index: 20010;
      justify-content: center;
      align-items: center;
      padding: 15px;
      box-sizing: border-box;
      backdrop-filter: blur(4px);
    `;
    devModal.innerHTML = `
      <div style="background: #1a1a1a; padding: 22px; border-radius: 10px; width: 100%; max-width: 480px; border: 1px solid #555; box-shadow: 0 10px 25px rgba(0,0,0,0.7); color: #fff; position: relative;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #444; padding-bottom: 10px; margin-bottom: 15px;">
          <h3 style="margin: 0; color: #00bcd4; font-size: 1.2em;">🛠️ Меню разработчика</h3>
          <button onclick="closeDevMenuModal()" style="background: #e53935; color: #fff; border: none; padding: 6px 10px; border-radius: 6px; cursor: pointer; font-weight: bold;">✕</button>
        </div>
        <div id="devMenuContent" style="display: flex; flex-direction: column; gap: 14px;">
          <!-- Выбор персонажа (Слайдер / Селектор) -->
          <div style="background: #252525; padding: 12px; border-radius: 6px; border: 1px solid #37474F;">
            <div style="font-size: 0.9em; font-weight: bold; color: #00bcd4; margin-bottom: 6px;">👤 Выберите персонажа:</div>
            <select id="devCharSelect" onchange="onDevCharSelectChange(this.value)" style="width: 100%; padding: 8px; background: #1a1a1a; color: #fff; border: 1px solid #444; border-radius: 4px; box-sizing: border-box; font-size: 0.9em;">
            </select>
            <div id="devCharInfo" style="font-size: 0.8em; color: #aaa; margin-top: 6px;"></div>
          </div>
          
          <!-- Управление уровнем -->
          <div style="background: #252525; padding: 12px; border-radius: 6px; border: 1px solid #37474F;">
            <div style="font-size: 0.9em; font-weight: bold; color: #ff9800; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;">
              <span>⚔️ Управление уровнем:</span>
              <span>Текущий: <strong id="devCurrentLevelDisplay" style="color: #4caf50; font-size: 1.1em;">-</strong></span>
            </div>
            
            <button onclick="devTriggerLevelUpModal()" class="btn-action" style="background: #4caf50; width: 100%; padding: 10px; font-size: 0.9em; font-weight: bold; cursor: pointer; color: #fff; border: none; border-radius: 6px; margin-bottom: 10px;">
              ✨ Повысить уровень (Интерфейс Level Up)
            </button>

            <div style="border-top: 1px dashed #444; padding-top: 10px; margin-top: 4px;">
              <div style="font-size: 0.8em; color: #ccc; margin-bottom: 6px;">Принудительная установка уровня:</div>
              <div style="display: flex; gap: 6px; align-items: center;">
                <button onclick="devAdjustLevel(-1)" class="btn-action" style="background: #e53935; color: #fff; width: 36px; height: 36px; font-size: 1.2em; font-weight: bold; border-radius: 6px; cursor: pointer; border: none;">-</button>
                <input type="number" id="devLevelInput" min="1" max="20" value="1" style="flex: 1; padding: 8px; text-align: center; background: #1a1a1a; color: #fff; border: 1px solid #444; border-radius: 6px; font-weight: bold; font-size: 1em;">
                <button onclick="devAdjustLevel(1)" class="btn-action" style="background: #2196F3; color: #fff; width: 36px; height: 36px; font-size: 1.2em; font-weight: bold; border-radius: 6px; cursor: pointer; border: none;">+</button>
                <button onclick="devSetLevelDirect(document.getElementById('devLevelInput').value)" class="btn-action" style="background: #ff9800; color: #000; padding: 8px 12px; font-weight: bold; font-size: 0.85em; border-radius: 6px; cursor: pointer; border: none;">Задать</button>
              </div>
            </div>
          </div>

          <!-- Инструменты отладки -->
          <div style="background: #252525; padding: 12px; border-radius: 6px; border: 1px solid #37474F;">
            <div style="font-size: 0.9em; color: #aaa; margin-bottom: 8px;">Инструменты отладки и тестирования:</div>
            <button onclick="exportDebugLogs()" class="btn-action" style="background: #37474F; width: 100%; padding: 10px; font-size: 0.85em; cursor: pointer; border-radius: 6px; border: 1px solid #546E7A; color: #fff; font-weight: bold;">📥 Выгрузить логи дебага (.txt)</button>
          </div>
        </div>
        <div style="margin-top: 20px; display: flex; justify-content: flex-end;">
          <button onclick="closeDevMenuModal()" class="btn-action" style="background: #444; color: #fff; padding: 10px 16px; border-radius: 6px; cursor: pointer;">Закрыть</button>
        </div>
      </div>
    `;
    devModal.addEventListener('click', (event) => {
      if (event.target === devModal) closeDevMenuModal();
    });

    document.body.appendChild(devModal);
  }

  updateDevCharacterUI();
  window.dispatchEvent(new CustomEvent('devMenuModalOpened', { detail: devModal }));
  devModal.style.display = 'flex';
}

function closeDevMenuModal() {
  const devModal = document.getElementById('devMenuModal');
  if (devModal) devModal.style.display = 'none';
}

function applyAppTheme(themeKey) {
  localStorage.setItem('dnd_app_theme', themeKey);
  const theme = APP_THEMES[themeKey] || APP_THEMES.orange;
  document.documentElement.style.setProperty('--theme-primary', theme.primary);
  document.documentElement.style.setProperty('--theme-accent', theme.accent);

  let styleTag = document.getElementById('dynamicThemeStyle');
  if (!styleTag) {
    styleTag = document.createElement('style');
    styleTag.id = 'dynamicThemeStyle';
    document.head.appendChild(styleTag);
  }
  styleTag.innerHTML = `
    .app-title, h3, .combat-box label { color: ${theme.primary} !important; }
    .tab-btn.active { border-bottom: 2px solid ${theme.primary} !important; color: ${theme.primary} !important; }
  `;
}

function applyAppFont(fontKey) {
  localStorage.setItem('dnd_app_font', fontKey);
  const fontObj = APP_FONTS[fontKey] || APP_FONTS.inter;

  let fontStyleTag = document.getElementById('dynamicFontStyle');
  if (!fontStyleTag) {
    fontStyleTag = document.createElement('style');
    fontStyleTag.id = 'dynamicFontStyle';
    document.head.appendChild(fontStyleTag);
  }
  fontStyleTag.innerHTML = `
    body, input, button, select, textarea { font-family: ${fontObj.family} !important; }
  `;
}

function openDebugLogsModal() {
  let modal = document.getElementById('settingsDebugLogsModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'settingsDebugLogsModal';
    modal.style.cssText = 'display:none;position:fixed;inset:0;z-index:20040;background:rgba(0,0,0,.88);align-items:center;justify-content:center;padding:15px;box-sizing:border-box;';
    modal.innerHTML = '<div style="background:#181818;color:#fff;width:100%;max-width:700px;max-height:90vh;overflow:auto;border:1px solid #607d8b;border-radius:12px;padding:18px;box-sizing:border-box;">' +
      '<div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #444;padding-bottom:10px;margin-bottom:12px;">' +
        '<h3 style="margin:0;color:#90caf9;">📜 Логи отладки</h3>' +
        '<button onclick="closeDebugLogsModal()" style="background:#e53935;color:#fff;border:0;border-radius:6px;padding:6px 10px;font-weight:bold;">✕</button>' +
      '</div>' +
      '<div id="settingsDebugLogsBody" style="font-family:monospace;font-size:11px;line-height:1.45;white-space:pre-wrap;background:#0d0d0d;color:#ddd;border:1px solid #333;border-radius:7px;padding:10px;min-height:180px;max-height:55vh;overflow:auto;"></div>' +
      '<div style="display:flex;gap:8px;margin-top:10px;">' +
        '<button onclick="refreshDebugLogsModal()" class="btn-action" style="flex:1;background:#455a64;padding:9px;">🔄 Обновить</button>' +
        '<button onclick="exportDebugLogs()" class="btn-action" style="flex:1;background:#1976d2;padding:9px;">💾 Скачать</button>' +
        '<button onclick="clearDebugLogs()" class="btn-action" style="flex:1;background:#6d3030;padding:9px;">🗑️ Очистить</button>' +
      '</div>' +
    '</div>';
    document.body.appendChild(modal);
    modal.addEventListener('click', function(event){ if(event.target === modal) closeDebugLogsModal(); });
  }
  modal.style.display = 'flex';
  refreshDebugLogsModal();
}

function refreshDebugLogsModal() {
  const body = document.getElementById('settingsDebugLogsBody');
  if (!body) return;
  const logs = Array.isArray(window.appDebugLogs) ? window.appDebugLogs : [];
  body.textContent = logs.length ? logs.join('\n') : 'Логи пока не собраны.';
  body.scrollTop = body.scrollHeight;
}

function exportDebugLogs() {
  const logs = Array.isArray(window.appDebugLogs) ? window.appDebugLogs : [];
  const text = logs.length ? logs.join('\n') : 'Логи пока не собраны.';
  const blob = new Blob([text], {type:'text/plain;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'dnd-vtt-debug-logs-' + new Date().toISOString().replace(/[:.]/g,'-') + '.txt';
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(function(){ URL.revokeObjectURL(url); }, 1000);
}

function clearDebugLogs() {
  window.appDebugLogs = [];
  refreshDebugLogsModal();
}

function closeDebugLogsModal() {
  const modal = document.getElementById('settingsDebugLogsModal');
  if (modal) modal.style.display = 'none';
}

function toggleDebugMode(isEnabled) {
  localStorage.setItem('dnd_debug_enabled', isEnabled ? 'true' : 'false');
  const debugWrapper = document.getElementById('settingsDebugButtonWrapper');
  if (debugWrapper) debugWrapper.style.display = isEnabled ? 'block' : 'none';
  if (isEnabled) {
    document.documentElement.classList.add('debug-enabled');
    if (typeof window.enableDndDebugRuntime === 'function') window.enableDndDebugRuntime();
    else if (typeof window.enableDndDebugLogger === 'function') window.enableDndDebugLogger();
  } else {
    document.documentElement.classList.remove('debug-enabled');
    if (typeof window.disableDndDebugRuntime === 'function') window.disableDndDebugRuntime();
  }
  const debugContainer = document.getElementById('debugLogContainer');
  if (debugContainer) debugContainer.style.display = isEnabled ? 'flex' : 'none';
}

function exportDebugLogs() {
  const logs = window.appDebugLogs ? window.appDebugLogs.join('\n') : "Логи дебага отсутствуют или не собраны.";
  const blob = new Blob([logs], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `dnd_debug_logs_${new Date().toISOString().slice(0, 10)}.txt`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function resetAppToDefaults() {
  if (confirm("ВНИМАНИЕ! Это полностью очистит все локальные данные (все персонажи, настройки, заметки будут удалены). Продолжить?")) {
    localStorage.clear();
    alert("Данные сброшены. Приложение будет перезагружено.");
    location.reload();
  }
}

function exportAllDataBackup() {
  try {
    const backupData = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      backupData[key] = localStorage.getItem(key);
    }
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    const dateStr = new Date().toISOString().slice(0, 10);
    downloadAnchor.setAttribute("download", `dnd_character_sheet_backup_${dateStr}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  } catch (err) {
    console.error("Ошибка при создании сохранения:", err);
  }
}

function importAllDataBackup(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const backupData = JSON.parse(e.target.result);
      if (!backupData || typeof backupData !== 'object' || Array.isArray(backupData)) throw new Error('invalid-backup');
      const protectedKeys = ['length'];
      for (const key in backupData) {
        if (protectedKeys.indexOf(key) !== -1 || typeof backupData[key] !== 'string') throw new Error('invalid-entry');
      }
      if (confirm("Внимание! Текущие данные будут перезаписаны. Продолжить?")) {
        const oldData = {};
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i); oldData[key] = localStorage.getItem(key);
        }
        try {
          localStorage.clear();
          for (const key in backupData) localStorage.setItem(key, backupData[key]);
        } catch (writeErr) {
          localStorage.clear();
          for (const key in oldData) localStorage.setItem(key, oldData[key]);
          throw writeErr;
        }
        alert("Данные загружены! Перезагрузка.");
        location.reload();
      }
    } catch (err) {
      alert("Ошибка чтения файла.");
    }
  };
  reader.readAsText(file);
  event.target.value = '';
}

document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('dnd_app_theme') || 'orange';
  applyAppTheme(savedTheme);
  const savedFont = localStorage.getItem('dnd_app_font') || 'playfair';
  applyAppFont(savedFont);

  if (typeof applyAppTransparency === 'function') {
    const savedAlpha = localStorage.getItem('dnd_app_alpha') || '0.65';
    applyAppTransparency(parseFloat(savedAlpha));
  }
});


(function(global){
  function setStatus(text){ var el=document.getElementById('settingsUpdateStatus'); if(el) el.textContent=text; }
  function updateProgress(p){var w=document.getElementById('settingsUpdateProgress'),b=document.getElementById('settingsUpdateProgressBar'),l=document.getElementById('settingsUpdateProgressLabel');if(!w||!b||!l)return;w.style.display='block';var t=Number(p&&p.total||0),c=Number(p&&p.current||0),pc=t?Math.max(0,Math.min(100,Math.round(c*100/t))):0;b.style.width=pc+'%';l.textContent='Загрузка обновления: '+pc+'% — '+c+' из '+t+(p&&p.path?' — '+p.path:'');}
  global.DND_UPDATE_UI={
    check: async function(){
      if(!global.DND_UPDATE_MANAGER){ setStatus('Модуль обновлений недоступен.'); return; }
      setStatus('Проверяю канал обновлений…'); updateProgress({current:0,total:1});
      try {
        var state=await global.DND_UPDATE_MANAGER.checkAndStage({onProgress:updateProgress});
        var btn=document.getElementById('settingsUpdateApplyButton');
        if(!state.configured){ setStatus('Канал обновлений ещё не настроен.'); if(btn) btn.style.display='none'; return; }
        if(!state.compatibility.ok){ setStatus('Текущая версия несовместима с этим обновлением: '+state.compatibility.reason); if(btn) btn.style.display='none'; return; }
        if(!state.updateAvailable){ setStatus('Установлена актуальная версия '+state.currentVersion+'.'); var p=document.getElementById('settingsUpdateProgress'); if(p) p.style.display='none'; if(btn) btn.style.display='none'; return; }
        updateProgress({current:1,total:1,path:'готово'}); setStatus('Доступно обновление '+state.manifest.version+'. Файлы проверены SHA-256 и подготовлены.');
        if(btn) btn.style.display=global.DND_UPDATE_MANAGER.canApplyNatively()?'block':'none';
      } catch(e){ setStatus('Ошибка обновления: '+(e&&e.message||e)); }
    },
    apply: async function(){
      try {
        setStatus('Применяю обновление…');
        await global.DND_UPDATE_MANAGER.applyStaged();
        setStatus('Обновление применено. Перезапустите приложение.');
      } catch(e){ setStatus('Обновление подготовлено, но native-слой пока не может его применить: '+(e&&e.message||e)); }
    }
  };
})(window);
