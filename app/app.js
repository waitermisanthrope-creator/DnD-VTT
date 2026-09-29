/**
 * ДОРАБОТКА: главный контроллер приложения.
 * Инициализирует совместимые данные мультикласса, несколько заклинательных характеристик,
 * а также подключает дополнительные трекеры (компаньоны/инициатива).
 * Основные переменные: currentChar/currentCharacter, allCharacters, localStorage.
 * ВАЖНО: Wallpapers.js и Ambiences.js не изменяются.
 */

// ==========================================
// БЛОК 1: ГЛОБАЛЬНЫЕ КОНФИГУРАЦИИ И ДАННЫЕ
// ==========================================
var SKILLS_CONFIG = [
  { id: 'acrobatics', name: 'Акробатика', stat: 'dex' },
  { id: 'animalHandling', name: 'Уход за животными', stat: 'wis' },
  { id: 'arcana', name: 'Магия', stat: 'int' },
  { id: 'athletics', name: 'Атлетика', stat: 'str' },
  { id: 'deception', name: 'Обман', stat: 'cha' },
  { id: 'history', name: 'История', stat: 'int' },
  { id: 'insight', name: 'Проницательность', stat: 'wis' },
  { id: 'intimidation', name: 'Запугивание', stat: 'cha' },
  { id: 'investigation', name: 'Анализ', stat: 'int' },
  { id: 'medicine', name: 'Медицина', stat: 'wis' },
  { id: 'nature', name: 'Природа', stat: 'int' },
  { id: 'perception', name: 'Внимательность', stat: 'wis' },
  { id: 'performance', name: 'Выступление', stat: 'cha' },
  { id: 'persuasion', name: 'Убеждение', stat: 'cha' },
  { id: 'religion', name: 'Религия', stat: 'int' },
  { id: 'sleightOfHand', name: 'Ловкость рук', stat: 'dex' },
  { id: 'stealth', name: 'Скрытность', stat: 'dex' },
  { id: 'survival', name: 'Выживание', stat: 'wis' }
];

window.SKILLS_CONFIG = SKILLS_CONFIG;

var STATS_CONFIG = [
  { id: 'str', name: 'Сила' },
  { id: 'dex', name: 'Ловкость' },
  { id: 'con', name: 'Телосложение' },
  { id: 'int', name: 'Интеллект' },
  { id: 'wis', name: 'Мудрость' },
  { id: 'cha', name: 'Харизма' }
];

var CONDITIONS_CONFIG = [
  'Отравлен', 'Сбит с ног', 'Ослеплен', 'Очарован', 'Испуган', 'Невидимость', 'Парализован', 'Оглушен', 'Захвачен'
];


// ==========================================
// БЛОК 2: ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ СОСТОЯНИЯ И НАВЫКИ
// ==========================================
var allCharacters = [];
var currentCharacterId = null;
var currentChar = null;
window.currentCharacter = null;

// Глобальные переменные навыков для доступа из других файлов через window
window.Prof_Acr = 0;
window.Prof_Ani = 0;
window.Prof_Arc = 0;
window.Prof_Ath = 0;
window.Prof_Dec = 0;
window.Prof_His = 0;
window.Prof_Ins = 0;
window.Prof_Itm = 0;
window.Prof_Inv = 0;
window.Prof_Med = 0;
window.Prof_Nat = 0;
window.Prof_Prc = 0;
window.Prof_Prf = 0;
window.Prof_Prs = 0;
window.Prof_Rel = 0;
window.Prof_Soh = 0;
window.Prof_Stl = 0;
window.Prof_Sur = 0;

// Функция синхронизации глобальных window-переменных с текущим объектом персонажа
function syncSkillsToWindow() {
  if (!currentChar || !currentChar.skillValues) return;
  window.Prof_Acr = currentChar.skillValues.acrobatics || 0;
  window.Prof_Ani = currentChar.skillValues.animalHandling || 0;
  window.Prof_Arc = currentChar.skillValues.arcana || 0;
  window.Prof_Ath = currentChar.skillValues.athletics || 0;
  window.Prof_Dec = currentChar.skillValues.deception || 0;
  window.Prof_His = currentChar.skillValues.history || 0;
  window.Prof_Ins = currentChar.skillValues.insight || 0;
  window.Prof_Itm = currentChar.skillValues.intimidation || 0;
  window.Prof_Inv = currentChar.skillValues.investigation || 0;
  window.Prof_Med = currentChar.skillValues.medicine || 0;
  window.Prof_Nat = currentChar.skillValues.nature || 0;
  window.Prof_Prc = currentChar.skillValues.perception || 0;
  window.Prof_Prf = currentChar.skillValues.performance || 0;
  window.Prof_Prs = currentChar.skillValues.persuasion || 0;
  window.Prof_Rel = currentChar.skillValues.religion || 0;
  window.Prof_Soh = currentChar.skillValues.sleightOfHand || 0;
  window.Prof_Stl = currentChar.skillValues.stealth || 0;
  window.Prof_Sur = currentChar.skillValues.survival || 0;
}


// ==========================================
// БЛОК 3: УПРАВЛЕНИЕ МЕНЮ И ПЕРСОНАЖАМИ (CRUD И STORAGE)
// ==========================================
var CHARACTER_SAVE_SCHEMA_VERSION = 3;

function normalizeCharacterSave(c) {
  if (!c || typeof c !== 'object' || Array.isArray(c)) return null;
  if (!c.id) c.id = 'char_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);
  if (!c.name) c.name = 'Без имени';
  if (!c.stats || typeof c.stats !== 'object' || Array.isArray(c.stats)) {
    c.stats = {str:10,dex:10,con:10,int:10,wis:10,cha:10};
  }
  ['str','dex','con','int','wis','cha'].forEach(function(k){
    var n = Number(c.stats[k]);
    c.stats[k] = isFinite(n) ? n : 10;
  });
  if (!Array.isArray(c.spellcastingSources)) c.spellcastingSources = [];
  if (!Array.isArray(c.companions)) c.companions = [];
  if (!c.initiativeTracker || !Array.isArray(c.initiativeTracker.combatants)) {
    c.initiativeTracker = {round:1, activeIndex:0, combatants:[]};
  }
  if (!Array.isArray(c.weaponsData)) c.weaponsData = [];
  if (!Array.isArray(c.spellsData)) c.spellsData = [];
  if (!c.activeConditions || typeof c.activeConditions !== 'object' || Array.isArray(c.activeConditions)) c.activeConditions = {};
  if (!c.spellSlotsData || typeof c.spellSlotsData !== 'object' || Array.isArray(c.spellSlotsData)) c.spellSlotsData = {};
  for (var level=1; level<=9; level++) {
    if (!c.spellSlotsData[level]) c.spellSlotsData[level] = {max:0,used:0};
    c.spellSlotsData[level].max = Math.max(0, Number(c.spellSlotsData[level].max)||0);
    c.spellSlotsData[level].used = Math.min(c.spellSlotsData[level].max, Math.max(0, Number(c.spellSlotsData[level].used)||0));
  }
  c.schemaVersion = CHARACTER_SAVE_SCHEMA_VERSION;
  return c;
}

function loadAllCharacters() {
  var saved = localStorage.getItem('dnd_multi_characters_v2');
  if (!saved) { allCharacters = []; return; }
  try {
    var parsed = JSON.parse(saved);
    if (Array.isArray(parsed)) {
      allCharacters = parsed.map(normalizeCharacterSave).filter(Boolean);
    } else if (parsed && Array.isArray(parsed.characters)) {
      allCharacters = parsed.characters.map(normalizeCharacterSave).filter(Boolean);
    } else {
      allCharacters = [];
    }
  } catch(e) { allCharacters = []; }
}

function saveAllCharacters() {
  var safe = Array.isArray(allCharacters) ? allCharacters.map(normalizeCharacterSave).filter(Boolean) : [];
  var payload = JSON.stringify(safe);
  try {
    localStorage.setItem('dnd_multi_characters_v2', payload);
  } catch(e) {
    console.error('Не удалось сохранить персонажей:', e);
    if (typeof alert === 'function') alert('Не удалось сохранить данные персонажей. Возможно, переполнено локальное хранилище. Экспортируйте резервную копию.');
    return false;
  }
  return true;
}

function renderCharacterList() {
  loadAllCharacters();
  if (typeof loadCustomRaces === 'function') loadCustomRaces();
  var container = document.getElementById('characterList');
  if (!container) return;

  if (allCharacters.length === 0) {
    container.innerHTML = '<div style="color: #777; text-align: center; padding: 20px;">У вас пока нет созданных персонажей</div>';
    return;
  }

  var html = '';
  for (var i = 0; i < allCharacters.length; i++) {
    var char = allCharacters[i];
    html += '<div class="char-card">' +
      '<div class="char-info">' +
        '<h4>' + (char.name || 'Без имени') + '</h4>' +
        '<p>' + (char.class || char.className || 'Класс не указан') + ' • ' + (char.raceName || char.race || 'Раса не выбрана') + '</p>' +
      '</div>' +
      '<div class="char-actions">' +
        '<button class="btn-action" onclick="openCharacter(\'' + char.id + '\')">Играть</button>' +
        '<button type="button" class="btn-del" data-character-id="' + String(char.id).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;') + '">✕</button>' +
      '</div>' +
    '</div>';
  }
  container.innerHTML = html;
  // V70.25.80: прямые touch/click-обработчики. Не полагаемся на closest/delegation
  // WebView и не оставляем удаление на inline onclick.
  Array.prototype.forEach.call(container.querySelectorAll('.btn-del'), function(btn) {
    var handler = function(e) {
      if (e) { e.preventDefault(); e.stopPropagation(); }
      var id = btn.getAttribute('data-character-id');
      if (id) deleteCharacter(id);
      return false;
    };
    btn.addEventListener('click', handler, false);
    btn.addEventListener('touchend', handler, false);
  });
}

function openCharacter(id) {
  currentCharacterId = id;
  currentChar = null;
  for (var i = 0; i < allCharacters.length; i++) {
    if (allCharacters[i].id === id) { currentChar = allCharacters[i]; break; }
  }
  if (!currentChar) return;
  window.currentCharacter = currentChar;

  // Миграция старых персонажей: новые поля не ломают существующие сохранения.
  if (!Array.isArray(currentChar.spellcastingSources)) currentChar.spellcastingSources = [];
  if (typeof window.getSpellcastingAbilityForClass === 'function' && Array.isArray(currentChar.classes)) {
    currentChar.classes.forEach(function(c) {
      var ability = window.getSpellcastingAbilityForClass(c.name);
      if (ability && !currentChar.spellcastingSources.some(function(s){ return s.className === c.name; })) {
        currentChar.spellcastingSources.push({ className: c.name, ability: ability });
      }
    });
  }
  if (!currentChar.spellStat && currentChar.spellcastingSources.length) {
    currentChar.spellStat = currentChar.spellcastingSources[0].ability;
  }
  if (!Array.isArray(currentChar.companions)) currentChar.companions = [];
  if (!currentChar.initiativeTracker || !Array.isArray(currentChar.initiativeTracker.combatants)) {
    currentChar.initiativeTracker = { round: 1, activeIndex: 0, combatants: [] };
  }

  var selectScreen = document.getElementById('characterSelectScreen');
  var sheetScreen = document.getElementById('characterSheetScreen');
  var creationScreen = document.getElementById('characterCreationScreen');

  if (selectScreen) selectScreen.style.display = 'none';
  if (creationScreen) creationScreen.style.display = 'none';
  if (sheetScreen) sheetScreen.style.display = 'block';

  document.getElementById('charName').value = currentChar.name || '';
  document.getElementById('charClass').value = currentChar.class || currentChar.className || '';
  
  if (document.getElementById('charBackground')) {
    document.getElementById('charBackground').value = currentChar.background || '';
  }

  if (document.getElementById('charProfession')) {
    var professionMap = currentChar.craftingProfessions && typeof currentChar.craftingProfessions === 'object'
      ? currentChar.craftingProfessions
      : {};
    var professionNames = Object.keys(professionMap).map(function(id) {
      var p = professionMap[id];
      return p && (p.name || id) ? (p.name || id) : '';
    }).filter(Boolean);
    document.getElementById('charProfession').value = professionNames.length
      ? professionNames.join(', ')
      : 'Без профессии';
  }

  document.getElementById('ac').value = currentChar.ac || '10';
  if (document.getElementById('speed')) document.getElementById('speed').value = currentChar.speed || '30 футов';
  document.getElementById('hpMax').value = currentChar.hpMax || '10';
  document.getElementById('hpCurrent').value = currentChar.hpCurrent || '10';
  if (document.getElementById('hpTemp')) document.getElementById('hpTemp').value = currentChar.hpTemp || '';
  if (document.getElementById('hitDice')) document.getElementById('hitDice').value = currentChar.hitDice || '1d10';
  if (document.getElementById('profBonus')) document.getElementById('profBonus').value = currentChar.profBonus || 2;
  if (document.getElementById('spellStat')) document.getElementById('spellStat').value = currentChar.spellStat || 'int';

  if (typeof populateRaceSelect === 'function') populateRaceSelect();
  var raceSelect = document.getElementById('charRaceSelect');
  var infoBox = document.getElementById('raceInfoBox');

  if (currentChar.raceId && raceSelect) {
    raceSelect.value = currentChar.raceId;
    raceSelect.disabled = true;
    if (typeof getAllRaces === 'function') {
      var allRaces = getAllRaces();
      var rObj = null;
      for (var k = 0; k < allRaces.length; k++) {
        if (allRaces[k].id === currentChar.raceId) { rObj = allRaces[k]; break; }
      }
      if (rObj && infoBox) {
        infoBox.innerHTML = '<strong>' + rObj.name + '</strong>: ' + rObj.desc;
        infoBox.style.display = 'block';
      }
      // Если у сохранённого персонажа почему-то не проставлена скорость
      // (например, персонаж был создан до этого исправления) — подтягиваем
      // её из расы прямо здесь, при открытии листа персонажа.
      if (rObj && rObj.speed && document.getElementById('speed') && !currentChar.speed) {
        document.getElementById('speed').value = rObj.speed;
      }
    }
  } else if (raceSelect) {
    raceSelect.value = '';
    raceSelect.disabled = false;
    if (infoBox) infoBox.style.display = 'none';
  }

  if (currentChar.stats) {
    document.getElementById('str').value = currentChar.stats.str || 10;
    document.getElementById('dex').value = currentChar.stats.dex || 10;
    document.getElementById('con').value = currentChar.stats.con || 10;
    document.getElementById('int').value = currentChar.stats.int || 10;
    document.getElementById('wis').value = currentChar.stats.wis || 10;
    document.getElementById('cha').value = currentChar.stats.cha || 10;
  }

  if (typeof renderConditions === 'function') renderConditions();
  if (typeof renderWeapons === 'function') renderWeapons();
  if (typeof renderSpellSlots === 'function') renderSpellSlots();
  if (typeof renderSpells === 'function') renderSpells();
  if (typeof renderFolders === 'function') renderFolders();
  if (typeof renderLibrary === 'function') renderLibrary();
  if (typeof calculateMods === 'function') calculateMods();
  if (typeof renderInventory === 'function') renderInventory();
  if (typeof renderCombatAbilities === 'function') renderCombatAbilities();
  if (typeof calculateCombatAbilityStats === 'function') calculateCombatAbilityStats();
  if (typeof renderCharacterFeatsOnSkillsTab === 'function') renderCharacterFeatsOnSkillsTab(currentChar);
  
  renderProficienciesBlock();
  if (typeof renderDndTools === 'function') renderDndTools();
  
  // Синхронизируем навыки в глобальные переменные window при открытии героя
  syncSkillsToWindow();
  
  goToTab(0);
}

function deleteCharacter(id) {
  id=String(id);var exists=allCharacters.some(function(c){return String(c.id)===id;});if(!exists){renderCharacterList();return;}
  var confirmed=true;try{confirmed=(typeof window.confirm==='function')?window.confirm('Вы уверены, что хотите полностью удалить этого персонажа?'):true;}catch(e){confirmed=true;}
  if(!confirmed)return;allCharacters=allCharacters.filter(function(c){return String(c.id)!==id;});
  if(String(currentCharacterId)===id){currentCharacterId=null;currentChar=null;window.currentCharacter=null;}
  saveAllCharacters();try{localStorage.setItem('dnd_current_character_id','');}catch(e){}renderCharacterList();
}

function ensureMainVersionBadge() {
  var host = document.getElementById('characterSelectScreen');
  if (!host) return null;

  var badge = document.getElementById('dndMainVersionBadge');
  if (!badge) {
    badge = document.createElement('div');
    badge.id = 'dndMainVersionBadge';
    badge.innerHTML =
      '<span id="dndMainVersionText">Версия…</span>' +
      '<button id="dndMainVersionCheck" type="button" aria-label="Проверить обновления" title="Проверить обновления">🔄</button>' +
      '<span id="dndMainVersionStatus">Проверка…</span>';
    var title = host.querySelector('.app-title');
    if (title && title.parentNode) title.parentNode.insertBefore(badge, title.nextSibling);
    else host.insertBefore(badge, host.firstChild);

    var check = document.getElementById('dndMainVersionCheck');
    if (check) {
      check.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        refreshMainVersionBadge(true);
      }, false);
      check.addEventListener('touchend', function(e) {
        e.preventDefault();
        e.stopPropagation();
        refreshMainVersionBadge(true);
      }, false);
    }
  }
  return badge;
}

function refreshMainVersionBadge(manual) {
  var badge = ensureMainVersionBadge();
  if (!badge) return;
  var versionText = document.getElementById('dndMainVersionText');
  var statusText = document.getElementById('dndMainVersionStatus');
  var check = document.getElementById('dndMainVersionCheck');
  if (statusText) statusText.textContent = manual ? 'Проверяю…' : 'Проверка…';
  if (check) check.textContent = '⏳';

  if (!window.DND_UPDATE_MANAGER || typeof window.DND_UPDATE_MANAGER.inspect !== 'function') {
    if (versionText) versionText.textContent = 'Версия 70.25.81';
    if (statusText) statusText.textContent = 'Проверка недоступна';
    if (check) check.textContent = '⚠️';
    return Promise.resolve(null);
  }

  return window.DND_UPDATE_MANAGER.inspect().then(function(state) {
    var current = state && state.currentVersion ? state.currentVersion : window.DND_UPDATE_MANAGER.VERSION;
    if (versionText) versionText.textContent = 'Версия ' + (current ? 'v' + current : '—');
    if (state && state.updateAvailable && state.manifest) {
      if (statusText) statusText.textContent = '🆕 Доступна v' + state.manifest.version;
      if (check) check.textContent = '🔄';
    } else {
      if (statusText) statusText.textContent = '✅ Актуально';
      if (check) check.textContent = '✓';
    }
    return state;
  }).catch(function() {
    if (versionText) versionText.textContent = 'Версия v' + (window.DND_UPDATE_MANAGER.VERSION || '70.25.81');
    if (statusText) statusText.textContent = '⚠️ Нет связи';
    if (check) check.textContent = '🔄';
    return null;
  });
}

function showCharacterSelect() {
  autoSaveCurrentCharacter();
  var selectScreen = document.getElementById('characterSelectScreen');
  var sheetScreen = document.getElementById('characterSheetScreen');
  var creationScreen = document.getElementById('characterCreationScreen');

  if (sheetScreen) sheetScreen.style.display = 'none';
  if (creationScreen) creationScreen.style.display = 'none';
  if (selectScreen) selectScreen.style.display = 'block';
  
  renderCharacterList();
  ensureMainVersionBadge();
  refreshMainVersionBadge(false);
  // Проверяем обновления именно в момент появления главного экрана после логотипа.
  if (window.DND_UPDATE_MANAGER && typeof window.DND_UPDATE_MANAGER.autoCheckForUpdates === 'function') {
    window.DND_UPDATE_MANAGER.autoCheckForUpdates().then(function(state) {
      if (state && state.updateAvailable) {
        refreshMainVersionBadge(false);
      } else if (state) {
        refreshMainVersionBadge(false);
      }
    }).catch(function(){});
  }
}

// Экспорт текущего открытого персонажа в отдельный JSON-файл (кнопка "Экспорт в JSON" на листе персонажа)
function exportCurrentCharacter() {
  if (!currentChar) {
    alert('Нет открытого персонажа для экспорта.');
    return;
  }
  autoSaveCurrentCharacter();

  try {
    var dataStr = JSON.stringify(currentChar, null, 2);
    var blob = new Blob([dataStr], { type: 'application/json;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    var safeName = (currentChar.name || 'character').replace(/[^a-zа-я0-9_\-]+/gi, '_');
    a.download = 'dnd_' + safeName + '.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error('Ошибка экспорта персонажа:', err);
    alert('Не удалось экспортировать персонажа.');
  }
}

// Импорт персонажа из JSON-файла (кнопка "Загрузить из файла" на экране выбора персонажей)
function importCharacterFromFile(event) {
  var file = event.target.files && event.target.files[0];
  if (!file) return;

  var reader = new FileReader();
  reader.onload = function(e) {
    try {
      var imported = JSON.parse(e.target.result);
      if (!imported || typeof imported !== 'object') {
        throw new Error('invalid');
      }

      // Гарантируем уникальный id и мигрируем старую структуру перед сохранением.
      imported.id = 'char_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7);
      imported = normalizeCharacterSave(imported);
      if (!imported) throw new Error('invalid-character');

      loadAllCharacters();
      allCharacters.push(imported);
      saveAllCharacters();
      renderCharacterList();
      alert('Персонаж "' + (imported.name || 'Без имени') + '" успешно загружен!');
    } catch (err) {
      console.error('Ошибка импорта персонажа:', err);
      alert('Не удалось прочитать файл персонажа. Убедитесь, что это корректный JSON-экспорт персонажа.');
    }
  };
  reader.readAsText(file);
  event.target.value = '';
}

// Бросок инициативы (d20 + модификатор Ловкости), результат выводится во вкладке "Дайсы"
function rollInitiative() {
  if (!currentChar) return;

  var dexMod = getStatModNum('dex');
  var roll = Math.floor(Math.random() * 20) + 1;
  var total = roll + dexMod;

  var resultText = '🎲 Инициатива\n' +
    'd20 (' + roll + ') ' + formatModStr(dexMod) + ' = ' + total;

  goToTab(5);
  var resBox = document.getElementById('diceResult');
  if (resBox) resBox.innerText = resultText;
}

// ПРИМЕЧАНИЕ: функция onRaceSelected() уже полностью определена в races.js —
// она применяет расовые бонусы к характеристикам, скорость, КД (для тортлов/
// лизардфолков/локсодонов) и бонусное HP (холмовые дворфы), а также спрашивает
// подтверждение перед фиксацией расы. Раньше здесь была вторая, более простая
// копия этой функции, которая подключалась позже (app.js грузится последним) и
// перетирала оригинал из races.js — из-за этого расовые бонусы к характеристикам
// и другие эффекты расы переставали применяться. Дублирующую копию убрали.

function autoSaveCurrentCharacter() {
  if (!currentCharacterId || !currentChar) return;
  var index = -1;
  for (var i = 0; i < allCharacters.length; i++) {
    if (allCharacters[i].id === currentCharacterId) { index = i; break; }
  }
  if (index === -1) return;

  var select = document.getElementById('charRaceSelect');
  var selectedRaceId = select ? select.value : '';
  var selectedRaceName = '';
  if (selectedRaceId && typeof getAllRaces === 'function') {
    var allRaces = getAllRaces();
    for (var r = 0; r < allRaces.length; r++) {
      if (allRaces[r].id === selectedRaceId) { selectedRaceName = allRaces[r].name; break; }
    }
  }

  currentChar.name = document.getElementById('charName').value;
  currentChar.class = document.getElementById('charClass').value;
  currentChar.className = document.getElementById('charClass').value;
  
  if (document.getElementById('charBackground')) {
    currentChar.background = document.getElementById('charBackground').value;
  }

  currentChar.raceId = selectedRaceId;
  currentChar.raceName = selectedRaceName;
  currentChar.ac = document.getElementById('ac').value;
  if (document.getElementById('speed')) currentChar.speed = document.getElementById('speed').value;
  currentChar.hpMax = document.getElementById('hpMax').value;
  currentChar.hpCurrent = document.getElementById('hpCurrent').value;
  if (document.getElementById('hpTemp')) currentChar.hpTemp = document.getElementById('hpTemp').value;
  if (document.getElementById('hitDice')) currentChar.hitDice = document.getElementById('hitDice').value;
  if (document.getElementById('profBonus')) currentChar.profBonus = document.getElementById('profBonus').value;
  if (document.getElementById('spellStat')) currentChar.spellStat = document.getElementById('spellStat').value;
  
  currentChar.stats = {
    str: document.getElementById('str').value,
    dex: document.getElementById('dex').value,
    con: document.getElementById('con').value,
    int: document.getElementById('int').value,
    wis: document.getElementById('wis').value,
    cha: document.getElementById('cha').value
  };

  // Автоматический сбор текущих итоговых значений навыков со страницы
  if (!currentChar.skillValues) currentChar.skillValues = {};
  for (var i = 0; i < SKILLS_CONFIG.length; i++) {
    var sId = SKILLS_CONFIG[i].id;
    
    // Ищем элемент несколькими возможными способами на случай разной верстки
    var el = document.getElementById('skill_val_' + sId) || 
             document.getElementById('skillVal_' + sId) || 
             document.querySelector('[data-skill-val="' + sId + '"]');
             
    if (el) {
      // Очищаем строку от знака '+' перед парсингом, чтобы '+7' превратилось в 7
      var cleanText = el.innerText.replace('+', '').trim();
      currentChar.skillValues[sId] = parseInt(cleanText) || 0;
    } else {
      // Запасной вариант расчета на лету, если DOM-элемент не найден по ID
      var skillObj = SKILLS_CONFIG[i];
      var statMod = getStatModNum(skillObj.stat);
      var prof = window.currentCharacter && window.currentCharacter.skills && window.currentCharacter.skills[sId] ? window.currentCharacter.skills[sId] : 0;
      var profBonusVal = getProfBonusNum();
      currentChar.skillValues[sId] = statMod + (prof * profBonusVal);
    }
  }

  if (!Array.isArray(currentChar.spellcastingSources)) currentChar.spellcastingSources = [];
  if (!Array.isArray(currentChar.companions)) currentChar.companions = [];
  if (!currentChar.initiativeTracker || !Array.isArray(currentChar.initiativeTracker.combatants)) {
    currentChar.initiativeTracker = { round: 1, activeIndex: 0, combatants: [] };
  }
  allCharacters[index] = currentChar;
  saveAllCharacters();
  
  // Обновляем значения в window при автосохранении
  syncSkillsToWindow();
}
// ==========================================
// БЛОК 4: АВТОМАТИЧЕСКОЕ ПРИМЕНЕНИЕ БОНУСОВ ПРЕДЫСТОРИИ
// ==========================================
function applyBackgroundToCharacter(backgroundName) {
  if (!window.currentCharacter) return;
  
  window.currentCharacter.background = backgroundName;
  
  if (typeof window.getBackgroundBonuses === 'function') {
    var bonuses = window.getBackgroundBonuses(backgroundName);
    
    if (!window.currentCharacter.proficiencies) {
      window.currentCharacter.proficiencies = [];
    }

    if (bonuses.tools && bonuses.tools.length > 0) {
      for (var i = 0; i < bonuses.tools.length; i++) {
        var toolName = bonuses.tools[i];
        var exists = false;
        
        for (var j = 0; j < window.currentCharacter.proficiencies.length; j++) {
          if (window.currentCharacter.proficiencies[j].name.toLowerCase() === toolName.toLowerCase()) {
            exists = true;
            break;
          }
        }
        
        if (!exists && typeof PROFICIENCIES_DB !== 'undefined') {
          var dbItem = null;
          for (var k = 0; k < PROFICIENCIES_DB.length; k++) {
            if (PROFICIENCIES_DB[k].name.toLowerCase().includes(toolName.toLowerCase())) {
              dbItem = PROFICIENCIES_DB[k];
              break;
            }
          }
          
          if (dbItem) {
            window.currentCharacter.proficiencies.push(Object.assign({}, dbItem));
          } else {
            window.currentCharacter.proficiencies.push({
              id: 'custom_tool_' + Date.now() + '_' + i,
              category: 'Инструменты / Предыстория',
              name: toolName,
              description: 'Получено из предыстории: ' + backgroundName
            });
          }
        }
      }
    }

    autoSaveCurrentCharacter();
    renderProficienciesBlock();
  }
}


// ==========================================
// БЛОК 5: НАВИГАЦИЯ И СЕНСОРНОЕ УПРАВЛЕНИЕ (СВАЙПЫ)
// ==========================================
var currentTab = 0;
var totalTabs = 7;
var startX = 0;
var startY = 0;
var isTracking = false;

function goToTab(tabIndex) {
  var container = document.getElementById('swiper');
  var tabs = document.querySelectorAll('.tabs-nav .tab-btn');
  if (!container) return;
  
  if (tabIndex < 0) tabIndex = 0;
  if (tabIndex >= totalTabs) tabIndex = totalTabs - 1;
  
  currentTab = tabIndex;
  container.style.transform = 'translateX(-' + (currentTab * 100) + 'vw)';
  
  tabs.forEach(function(tab, i) {
    if (i === currentTab) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });

  if (tabs[currentTab]) {
    tabs[currentTab].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }
  
  if (currentTab === 1) {
    setTimeout(renderProficienciesBlock, 50);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  var container = document.getElementById('swiper');
  if (container) {
    container.addEventListener('touchstart', function(e) {
      if (e.target.closest('input, textarea, select, button')) {
        isTracking = false;
        return;
      }
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      isTracking = true;
    }, { passive: true });

    container.addEventListener('touchend', function(e) {
      if (!isTracking) return;
      isTracking = false;

      var endX = e.changedTouches[0].clientX;
      var endY = e.changedTouches[0].clientY;
      var diffX = endX - startX;
      var diffY = endY - startY;

      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
        if (diffX < 0) {
          goToTab(currentTab + 1);
        } else {
          goToTab(currentTab - 1);
        }
      }
    }, { passive: true });
  }
});


// ==========================================
// БЛОК 6: ВСПОМОГАТЕЛЬНЫЕ МОДИФИКАТОРЫ И РАСЧЁТЫ
// ==========================================
function getStatModNum(statId) {
  var elem = document.getElementById(statId);
  var val = elem ? parseInt(elem.value) || 10 : 10;
  return Math.floor((val - 10) / 2);
}

function getProfBonusNum() {
  var elem = document.getElementById('profBonus');
  return elem ? parseInt(elem.value) || 2 : 2;
}

function formatModStr(mod) {
  return mod >= 0 ? "+" + mod : mod.toString();
}


// ==========================================
// БЛОК 7: ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ СТРАНИЦЫ (DOM)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const acInput = document.getElementById('ac');
  if (acInput) {
    acInput.addEventListener('input', () => {
      const headerAC = document.getElementById('invHeaderAC');
      if (headerAC) headerAC.innerText = acInput.value || 10;
      autoSaveCurrentCharacter();
    });
  }

  const bgInput = document.getElementById('charBackground');
  if (bgInput) {
    bgInput.addEventListener('change', (e) => {
      applyBackgroundToCharacter(e.target.value);
    });
    bgInput.addEventListener('blur', (e) => {
      applyBackgroundToCharacter(e.target.value);
    });
  }

  renderCharacterList();
  setTimeout(() => {
    renderProficienciesBlock();
  }, 400);
});