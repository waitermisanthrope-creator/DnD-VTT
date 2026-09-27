// Вспомогательная функция для защиты от XSS
function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Получение активного персонажа
function getActiveCharacter() {
  return typeof currentChar !== 'undefined' ? currentChar : (typeof currentCharacter !== 'undefined' ? currentCharacter : null);
}

// Инициализация структуры хранилища
function initLibraryData(character) {
  if (!character.libraryData) {
    character.libraryData = {
      entries: Array.isArray(character.library) ? character.library : [],
      openGroups: [] // Хранение ID/путей открытых веток дерева
    };
  }
  // Синхронизация старого массива library с новым
  if (Array.isArray(character.library)) {
    character.libraryData.entries = character.library;
  }
}

// Рендеринг интерфейса вкладки Лор/Бестиарий
function renderLibraryUI() {
  const container = document.getElementById('tab-page-library');
  if (!container) return;

  container.innerHTML = `
    <div class="card">
      <h3>Добавить запись в Базу</h3>
      <label>Категория (используй '/' для подкатегорий, напр: "NPC/Враги")</label>
      <div style="display: flex; gap: 8px; margin-bottom: 8px;">
        <select id="entryCategorySelect" style="flex: 1;" onchange="handleLibraryCategorySelect(this)">
          <option value="📍 Локация">📍 Локация</option>
          <option value="👤 NPC">👤 NPC / Непись</option>
          <option value="🐉 Тварь">🐉 Тварь / Монстр</option>
          <option value="📜 Квест">📜 Квест / Лор</option>
          <option value="__custom__">+ Своя категория...</option>
        </select>
        <input type="text" id="entryCategoryCustom" placeholder="Имя категории..." style="display: none; flex: 1;">
      </div>

      <label>Название</label>
      <input type="text" id="entryTitle" placeholder="Название записи...">

      <label>Описание и характеристики</label>
      <textarea id="entryDesc" placeholder="Детали, статы, слабости..."></textarea>

      <button onclick="addLibraryEntry()" style="background: #2196F3; color: white; border: none; padding: 10px; border-radius: 6px; font-weight: bold; width: 100%; margin-top: 10px; cursor: pointer;">+ Добавить запись</button>
    </div>

    <div class="card">
      <h3>Справочник мира</h3>
      <div id="libraryList"></div>
    </div>
  `;

  renderLibrary();
}

// Обработка переключения пользовательской категории
function handleLibraryCategorySelect(selectElem) {
  const customInput = document.getElementById('entryCategoryCustom');
  if (!customInput) return;

  if (selectElem.value === '__custom__') {
    customInput.style.display = 'block';
    customInput.focus();
  } else {
    customInput.style.display = 'none';
    customInput.value = '';
  }
}

// Отрисовка дерева записей
function renderLibrary() {
  const container = document.getElementById('libraryList');
  if (!container) return;

  const character = getActiveCharacter();
  if (!character) return;

  initLibraryData(character);
  const entries = character.libraryData.entries;

  if (!entries || entries.length === 0) {
    container.innerHTML = '<div style="color: #777; text-align: center; padding: 10px;">Справочник пуст</div>';
    return;
  }

  // Построение дерева из плоского массива по полю category ("Группа/Подгруппа")
  const tree = {};

  entries.forEach(entry => {
    const rawCategory = entry.category || 'Общее';
    const pathArr = rawCategory.split('/').map(s => s.trim()).filter(Boolean);
    if (pathArr.length === 0) pathArr.push('Общее');

    let currentLevel = tree;
    pathArr.forEach((step, index) => {
      if (!currentLevel[step]) {
        currentLevel[step] = { __items: [], __sub: {} };
      }
      if (index === pathArr.length - 1) {
        currentLevel[step].__items.push(entry);
      } else {
        currentLevel = currentLevel[step].__sub;
      }
    });
  });

  // Рекурсивная функция сборки HTML дерева
  function buildTreeHtml(node, currentPath = '') {
    let html = '';

    for (const key in node) {
      const path = currentPath ? `${currentPath}/${key}` : key;
      const isOpen = character.libraryData.openGroups.includes(path) ? 'open' : '';
      const items = node[key].__items;
      const subKeys = Object.keys(node[key].__sub);

      html += `<details class="tree-group" data-path="${escapeHtml(path)}" ${isOpen} ontoggle="toggleGroupState(this)">`;
      html += `<summary class="tree-summary" style="cursor: pointer; padding: 4px 0;"><strong>${escapeHtml(key)}</strong> <small style="color: #888;">(${items.length + subKeys.length})</small></summary>`;
      html += `<div class="tree-content" style="padding-left: 12px; border-left: 2px solid #444; margin-left: 6px;">`;

      // Вложенные категории
      if (subKeys.length > 0) {
        html += buildTreeHtml(node[key].__sub, path);
      }

      // Элементы текущей категории
      items.forEach(item => {
        html += `
          <div class="entry-item" style="margin: 8px 0; padding: 10px; background: #2a2a2a; border: 1px solid #444; border-radius: 6px;">
            <div class="entry-header" style="display: flex; justify-content: space-between; font-weight: bold; color: #ff9800;">
              <span>${escapeHtml(item.title)}</span>
            </div>
            <div class="entry-desc" style="margin-top: 6px; font-size: 0.9em; color: #ccc; white-space: pre-wrap;">${escapeHtml(item.desc || 'Без описания')}</div>
            <div style="text-align: right; margin-top: 8px;">
              <button class="btn-action" style="background: #e53935; padding: 4px 10px; font-size: 0.8em; cursor: pointer;" onclick="deleteLibraryEntry(${item.id})">Удалить</button>
            </div>
          </div>`;
      });

      html += `</div></details>`;
    }

    return html;
  }

  container.innerHTML = buildTreeHtml(tree);
}

// Отслеживание состояния открытия/закрытия узлов дерева
function toggleGroupState(detailsElem) {
  const character = getActiveCharacter();
  if (!character) return;
  initLibraryData(character);

  const path = detailsElem.getAttribute('data-path');
  if (!path) return;

  const openSet = new Set(character.libraryData.openGroups);
  if (detailsElem.open) {
    openSet.add(path);
  } else {
    openSet.delete(path);
  }

  character.libraryData.openGroups = Array.from(openSet);
  if (typeof autoSaveCurrentCharacter === 'function') autoSaveCurrentCharacter();
}

function addLibraryEntry() {
  const selectElem = document.getElementById('entryCategorySelect');
  const customElem = document.getElementById('entryCategoryCustom');
  const titleElem = document.getElementById('entryTitle');
  const descElem = document.getElementById('entryDesc');

  if (!selectElem || !titleElem || !descElem) return;

  let category = selectElem.value;
  if (category === '__custom__') {
    category = customElem ? customElem.value.trim() : '';
  }

  category = category || 'Общее';
  const title = titleElem.value.trim();
  const desc = descElem.value.trim();

  if (!title) {
    if (typeof showCustomAlert === 'function') {
      showCustomAlert('Внимание', 'Введи название записи!');
    } else {
      alert('Введи название записи!');
    }
    return;
  }

  const character = getActiveCharacter();
  if (!character) return;

  initLibraryData(character);

  const newEntry = {
    id: Date.now(),
    category: category,
    title: title,
    desc: desc
  };

  character.libraryData.entries.push(newEntry);
  character.library = character.libraryData.entries; // Обратная совместимость

  titleElem.value = '';
  descElem.value = '';
  if (customElem) customElem.value = '';
  selectElem.value = '📍 Локация';
  handleLibraryCategorySelect(selectElem);

  renderLibrary();

  if (typeof autoSaveCurrentCharacter === 'function') autoSaveCurrentCharacter();
}

function deleteLibraryEntry(entryId) {
  const character = getActiveCharacter();
  if (!character) return;

  initLibraryData(character);

  character.libraryData.entries = character.libraryData.entries.filter(item => item.id !== Number(entryId));
  character.library = character.libraryData.entries; // Обратная совместимость

  renderLibrary();

  if (typeof autoSaveCurrentCharacter === 'function') autoSaveCurrentCharacter();
}

// Автоматический рендеринг при загрузке документа
document.addEventListener('DOMContentLoaded', () => {
  renderLibraryUI();
});
