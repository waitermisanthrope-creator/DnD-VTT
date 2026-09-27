/**
 * Модуль отладки и принудительных настроек персонажей (settings_debug.js)
 */

function getDebugCharactersList() {
  let characters = [];
  try {
    characters = JSON.parse(localStorage.getItem('dnd_multi_characters_v2')) || [];
    if (characters.length === 0) characters = JSON.parse(localStorage.getItem('dnd_characters')) || [];
  } catch (e) {
    console.error('[DEBUG] Ошибка чтения персонажей из localStorage:', e);
  }
  return characters;
}

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
  if (activeHero && activeHero.id) currentActiveId = activeHero.id;
  else currentActiveId = localStorage.getItem('dnd_current_character_id');
  characters.forEach((char, index) => {
    const opt = document.createElement('option');
    const charId = char.id !== undefined ? char.id : index;
    opt.value = charId;
    const charName = char.name || char.charName || 'Без имени';
    let charLevel = char.level || 1;
    if (char.classes && Array.isArray(char.classes) && char.classes.length > 0) {
      charLevel = char.classes.reduce((sum, c) => sum + (Number(c.level) || 0), 0);
    }
    opt.textContent = `${charName} (Ур. ${charLevel})`;
    if (currentActiveId && String(charId) === String(currentActiveId)) opt.selected = true;
    select.appendChild(opt);
  });
}

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
  let characters = getDebugCharactersList();
  const charIndex = characters.findIndex((c, i) => String(c.id !== undefined ? c.id : i) === String(targetCharId));
  if (charIndex === -1) {
    console.error(`[DEBUG] Персонаж с ID ${targetCharId} не найден в массиве localStorage!`);
    console.groupEnd();
    return;
  }
  let targetChar = characters[charIndex];
  targetChar.level = newLevel;
  if (targetChar.classes && Array.isArray(targetChar.classes) && targetChar.classes.length > 0) {
    targetChar.classes[0].level = newLevel;
  } else {
    targetChar.classes = [{ name: targetChar.class || targetChar.charClass || 'Воин', level: newLevel }];
  }
  window.currentCharacter = targetChar;
  window.currentChar = targetChar;
  localStorage.setItem('dnd_current_character_id', targetChar.id || targetCharId);
  characters[charIndex] = targetChar;
  try {
    localStorage.setItem('dnd_multi_characters_v2', JSON.stringify(characters));
    localStorage.setItem('dnd_characters', JSON.stringify(characters));
  } catch (err) {
    console.error('[DEBUG] Ошибка записи в localStorage:', err);
  }
  if (typeof window.setCharacterLevel === 'function') window.setCharacterLevel(newLevel, 0);
  else if (typeof saveCurrentCharacter === 'function') saveCurrentCharacter();
  if (typeof renderCharacterList === 'function') renderCharacterList();
  if (typeof updateCharacterUI === 'function') updateCharacterUI();
  if (typeof loadCharacterData === 'function') loadCharacterData(targetChar);
  populateForceLevelCharacterSelect();
  console.groupEnd();
  alert(`Уровень персонажа "${targetChar.name || targetChar.charName}" успешно изменен на ${newLevel}!`);
}

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
      }
    });
  }
});
