/**
 * Модуль отладки и принудительных настроек персонажей (settings_debug.js)
 */

// Вспомогательная функция отладки: считывание полного списка
function getDebugCharactersList() {
  let characters = [];
  try {
    characters = JSON.parse(localStorage.getItem('dnd_multi_characters_v2')) || [];
    if (characters.length === 0) {
      characters = JSON.parse(localStorage.getItem('dnd_characters')) || [];
    }
  } catch (e) {
    console.error('[DEBUG] Ошибка чтения персонажей из localStorage:', e);
  }
  return characters;
}

// Заполнение селектора персонажей
function populateForceLevelCharacterSelect() {
  const select = document.getElementById('debug_force_char_select');
  if (!select) return;

  select.innerHTML = '';
  const characters = getDebugCharactersList();

  if (characters.length === 0) {
    const opt = document.createElement('option');
    opt.value = '';
    opt.textContent = '-- Нет сохраненных персонажей --';
    select.appendChild(opt);
    select.disabled = true;
    return;
  }

  select.disabled = false;

  let currentActiveId = null;
  const activeHero = window.currentCharacter || window.currentChar;
  if (activeHero && activeHero.id) {
    currentActiveId = activeHero.id;
  } else {
    currentActiveId = localStorage.getItem('dnd_current_character_id');
  }

  characters.forEach((char, index) => {
    const opt = document.createElement('option');
    const charId = char.id !== undefined ? char.id : index;
    opt.value = charId;
    
    let charName = char.name || char.charName || 'Без имени';
    
    // Вычисляем фактический уровень
    let charLevel = char.level || 1;
    if (char.classes && Array.isArray(char.classes) && char.classes.length > 0) {
      charLevel = char.classes.reduce((sum, c) => sum + (Number(c.level) || 0), 0);
    }

    opt.textContent = `${charName} (Ур. ${charLevel})`;

    if (currentActiveId && String(charId) === String(currentActiveId)) {
      opt.selected = true;
    }

    select.appendChild(opt);
  });
}

// Принудительное изменение уровня с детальным логированием
function applyForceLevel() {
  console.group('[DEBUG LEVEL UP] Процесс принудительного изменения уровня');

  const select = document.getElementById('debug_force_char_select');
  const levelInput = document.getElementById('debug_force_level_input');

  if (!select || !levelInput) {
    console.error('[DEBUG] Не найдены элементы управления в DOM!');
    console.groupEnd();
    return;
  }

  const targetCharId = select.value;
  const newLevel = parseInt(levelInput.value, 10);

  console.log(`Target Character ID: ${targetCharId}`);
  console.log(`Requested Level: ${newLevel}`);

  if (!targetCharId) {
    alert('Выберите персонажа!');
    console.groupEnd();
    return;
  }

  if (isNaN(newLevel) || newLevel < 1 || newLevel > 20) {
    alert('Уровень должен быть от 1 до 20.');
    console.groupEnd();
    return;
  }

  // 1. Извлекаем массив из localStorage
  let characters = getDebugCharactersList();
  const charIndex = characters.findIndex((c, i) => String(c.id !== undefined ? c.id : i) === String(targetCharId));

  if (charIndex === -1) {
    console.error(`[DEBUG] Персонаж с ID ${targetCharId} не найден в массиве localStorage!`);
    console.groupEnd();
    return;
  }

  let targetChar = characters[charIndex];
  console.log('Найден объект персонажа ДО изменений:', JSON.parse(JSON.stringify(targetChar)));

  // 2. Обновляем уровень в объекте
  targetChar.level = newLevel;

  // Обновляем структуру классов (критично для D&D скриптов)
  if (targetChar.classes && Array.isArray(targetChar.classes) && targetChar.classes.length > 0) {
    targetChar.classes[0].level = newLevel;
    console.log(`Обновлен главный класс [0]. Новый уровень: ${newLevel}`);
  } else {
    // Если массива классов не было, создаем базовую структуру
    targetChar.classes = [{ name: targetChar.class || targetChar.charClass || 'Воин', level: newLevel }];
    console.log('Создана новая структура классов:', targetChar.classes);
  }

  // 3. Синхронизируем с window глобальными переменными
  window.currentCharacter = targetChar;
  window.currentChar = targetChar;
  localStorage.setItem('dnd_current_character_id', targetChar.id || targetCharId);

  // 4. Перезаписываем персонажа в массив хранилища
  characters[charIndex] = targetChar;
  
  try {
    localStorage.setItem('dnd_multi_characters_v2', JSON.stringify(characters));
    localStorage.setItem('dnd_characters', JSON.stringify(characters));
    console.log('[DEBUG] Успешно перезаписан localStorage!');
  } catch (err) {
    console.error('[DEBUG] Ошибка записи в localStorage:', err);
  }

  // 5. Вызываем встроенную логику пересчета уровня (если есть level_up.js)
  if (typeof window.setCharacterLevel === 'function') {
    console.log('[DEBUG] Вызов встроенного window.setCharacterLevel()...');
    window.setCharacterLevel(newLevel, 0);
  } else if (typeof saveCurrentCharacter === 'function') {
    console.log('[DEBUG] Вызов saveCurrentCharacter()...');
    saveCurrentCharacter();
  }

  // 6. Принудительное обновление UI элементов на странице
  if (typeof renderCharacterList === 'function') renderCharacterList();
  if (typeof updateCharacterUI === 'function') updateCharacterUI();
  if (typeof loadCharacterData === 'function') loadCharacterData(targetChar);

  // Обновляем сам селектор отладки
  populateForceLevelCharacterSelect();

  console.log('Объект персонажа ПОСЛЕ изменений:', targetChar);
  console.groupEnd();

  alert(`Уровень персонажа "${targetChar.name || targetChar.charName}" успешно изменен на ${newLevel}!`);
}

// Привязка событий
document.addEventListener('DOMContentLoaded', () => {
  const select = document.getElementById('debug_force_char_select');
  if (select) {
    select.addEventListener('change', (e) => {
      const targetCharId = e.target.value;
      if (!targetCharId) return;

      const characters = getDebugCharactersList();
      const selectedChar = characters.find((c, i) => String(c.id !== undefined ? c.id : i) === String(targetCharId));

      if (selectedChar) {
        window.currentCharacter = selectedChar;
        window.currentChar = selectedChar;
        localStorage.setItem('dnd_current_character_id', selectedChar.id || targetCharId);
        console.log(`[DEBUG SELECT] Переключен текущий активный персонаж в сессии:`, selectedChar.name);
      }
    });
  }
});
