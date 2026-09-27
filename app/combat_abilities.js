/**
 * combat_abilities.js
 * Модуль боевых способностей и приёмов персонажа (вкладка "Способн.").
 *
 * Этот файл раньше отсутствовал в проекте, хотя index.html уже был готов
 * к нему (контейнер #combatAbilitiesList, кнопка "+ Добавить" с
 * onclick="addCombatAbility()", селектор базовой характеристики
 * #combatAbilityStat с onchange="calculateCombatAbilityStats()" и поля
 * #combatAbilityDCVal / #combatAbilityAtkVal) — из-за этого вкладка была
 * полностью нерабочей (клики ни к чему не приводили, в консоли были ошибки
 * "addCombatAbility is not defined").
 *
 * Модель данных хранится на самом персонаже:
 *   currentChar.combatAbilities = [
 *     { id, name, description, rechargeOn: 'long'|'short'|'none', maxUses, usedCount }
 *   ]
 *   currentChar.combatAbilityStat = 'str' | 'dex' | ... (запоминаем выбор характеристики)
 */

// Рендер списка способностей во вкладке "Способн."
function renderCombatAbilities() {
  var container = document.getElementById('combatAbilitiesList');
  if (!container || !currentChar) return;

  // Восстанавливаем ранее выбранную базовую характеристику способностей (если сохранена)
  var statSelect = document.getElementById('combatAbilityStat');
  if (statSelect && currentChar.combatAbilityStat) {
    statSelect.value = currentChar.combatAbilityStat;
  }

  if (typeof renderClassFeatures === 'function') renderClassFeatures();
  if (!currentChar.combatAbilities) currentChar.combatAbilities = [];

  if (currentChar.combatAbilities.length === 0) {
    container.innerHTML = '<div style="color: #777; text-align: center; padding: 10px 0;">Способности и приёмы пока не добавлены</div>';
  } else {
    var html = '';
    for (var i = 0; i < currentChar.combatAbilities.length; i++) {
      var ab = currentChar.combatAbilities[i];
      var maxUses = parseInt(ab.maxUses) || 0;
      var usedCount = parseInt(ab.usedCount) || 0;
      var recharge = ab.rechargeOn || 'none';

      var usesHtml = '';
      if (maxUses > 0) {
        var remaining = Math.max(0, maxUses - usedCount);
        usesHtml =
          '<div style="display:flex; align-items:center; gap:8px; margin-top:8px;">' +
            '<span style="font-size:0.8em; color:#aaa;">Использований: <strong style="color:' + (remaining > 0 ? '#4caf50' : '#e53935') + ';">' + remaining + ' / ' + maxUses + '</strong></span>' +
            '<button class="btn-action" style="padding:4px 10px; font-size:0.75em; background:#ff9800;" ' + (remaining <= 0 ? 'disabled' : '') + ' onclick="useCombatAbility(' + i + ')">Использовать</button>' +
            '<button class="btn-action" style="padding:4px 10px; font-size:0.75em; background:#555;" onclick="resetCombatAbilityUses(' + i + ')">Сброс</button>' +
          '</div>';
      }

      html += '<div class="weapon-card">' +
        '<div style="display:flex; gap:8px; align-items:center;">' +
          '<input type="text" value="' + (ab.name || '').replace(/"/g, '&quot;') + '" placeholder="Название способности..." oninput="updateCombatAbility(' + i + ', \'name\', this.value)">' +
        '</div>' +
        '<textarea placeholder="Описание эффекта..." oninput="updateCombatAbility(' + i + ', \'description\', this.value)" style="height:60px; margin-top:8px;">' + (ab.description || '') + '</textarea>' +
        '<div style="display:flex; gap:8px; align-items:center; margin-top:8px; flex-wrap: wrap;">' +
          '<div style="flex:1; min-width:140px;">' +
            '<label style="font-size:0.75em; margin:0;">Восстановление</label>' +
            '<select onchange="updateCombatAbility(' + i + ', \'rechargeOn\', this.value)" style="margin-top:2px;">' +
              '<option value="none" ' + (recharge === 'none' ? 'selected' : '') + '>Не тратится (пассивно)</option>' +
              '<option value="short" ' + (recharge === 'short' ? 'selected' : '') + '>Короткий отдых</option>' +
              '<option value="long" ' + (recharge === 'long' ? 'selected' : '') + '>Длинный отдых</option>' +
            '</select>' +
          '</div>' +
          '<div style="width:110px;">' +
            '<label style="font-size:0.75em; margin:0;">Макс. исп.</label>' +
            '<input type="number" min="0" value="' + maxUses + '" oninput="updateCombatAbility(' + i + ', \'maxUses\', parseInt(this.value)||0)" style="margin-top:2px;">' +
          '</div>' +
        '</div>' +
        usesHtml +
        '<div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">' +
          '<button class="btn-action" style="padding: 6px 12px; font-size: 0.85em;" onclick="rollCombatAbility(' + i + ')">Бросок 🎲</button>' +
          '<button class="btn-del" onclick="deleteCombatAbility(' + i + ')">Удалить</button>' +
        '</div>' +
      '</div>';
    }
    container.innerHTML = html;
  }

  // Пересчитываем СЛ спасброска и бонус атаки способностей от выбранной характеристики
  calculateCombatAbilityStats();
}

// Кнопка "+ Добавить" — создаёт новую пустую способность
function addCombatAbility() {
  if (!currentChar) return;
  if (!currentChar.combatAbilities) currentChar.combatAbilities = [];

  currentChar.combatAbilities.push({
    id: Date.now(),
    name: '',
    description: '',
    rechargeOn: 'none',
    maxUses: 0,
    usedCount: 0
  });

  renderCombatAbilities();
  autoSaveCurrentCharacter();
}

function updateCombatAbility(index, field, value) {
  if (!currentChar || !currentChar.combatAbilities || !currentChar.combatAbilities[index]) return;
  currentChar.combatAbilities[index][field] = value;

  // Поля, влияющие на разметку счётчика использований, требуют перерисовки;
  // текстовые поля (name/description) можно просто сохранить без лишнего ре-рендера,
  // чтобы не сбрасывать фокус ввода на мобильных устройствах.
  if (field === 'rechargeOn' || field === 'maxUses') {
    renderCombatAbilities();
  }
  autoSaveCurrentCharacter();
}

function deleteCombatAbility(index) {
  if (!currentChar || !currentChar.combatAbilities) return;
  currentChar.combatAbilities.splice(index, 1);
  renderCombatAbilities();
  autoSaveCurrentCharacter();
}

function useCombatAbility(index) {
  if (!currentChar || !currentChar.combatAbilities || !currentChar.combatAbilities[index]) return;
  var ab = currentChar.combatAbilities[index];
  var maxUses = parseInt(ab.maxUses) || 0;
  var usedCount = parseInt(ab.usedCount) || 0;
  if (maxUses > 0 && usedCount < maxUses) {
    ab.usedCount = usedCount + 1;
  }
  renderCombatAbilities();
  autoSaveCurrentCharacter();
}

function resetCombatAbilityUses(index) {
  if (!currentChar || !currentChar.combatAbilities || !currentChar.combatAbilities[index]) return;
  currentChar.combatAbilities[index].usedCount = 0;
  renderCombatAbilities();
  autoSaveCurrentCharacter();
}

// Пересчёт СЛ спасброска и бонуса атаки для боевых способностей на основе выбранной характеристики
function calculateCombatAbilityStats() {
  var statSelect = document.getElementById('combatAbilityStat');
  var statKey = statSelect ? statSelect.value : 'str';

  var mod = typeof getStatModNum === 'function' ? getStatModNum(statKey) : 0;
  var prof = typeof getProfBonusNum === 'function' ? getProfBonusNum() : 2;

  var dc = 8 + prof + mod;
  var atk = mod + prof;

  var dcElem = document.getElementById('combatAbilityDCVal');
  var atkElem = document.getElementById('combatAbilityAtkVal');
  if (dcElem) dcElem.innerText = dc.toString();
  if (atkElem) atkElem.innerText = typeof formatModStr === 'function' ? formatModStr(atk) : (atk >= 0 ? '+' + atk : atk);

  if (currentChar) {
    currentChar.combatAbilityStat = statKey;
    if (typeof autoSaveCurrentCharacter === 'function') autoSaveCurrentCharacter();
  }
}

// Бросок d20 + бонус атаки способности, результат выводится во вкладке "Дайсы"
function rollCombatAbility(index) {
  if (!currentChar || !currentChar.combatAbilities || !currentChar.combatAbilities[index]) return;
  var ab = currentChar.combatAbilities[index];

  var statSelect = document.getElementById('combatAbilityStat');
  var statKey = statSelect ? statSelect.value : 'str';
  var mod = getStatModNum(statKey);
  var prof = getProfBonusNum();
  var atkBonus = mod + prof;

  var roll = Math.floor(Math.random() * 20) + 1;
  var total = roll + atkBonus;
  var abName = (ab.name && ab.name.trim()) || 'Способность';

  var resultText = '✨ ' + abName + '\n' +
    'd20 (' + roll + ') ' + formatModStr(atkBonus) + ' = ' + total;

  goToTab(5);
  var resBox = document.getElementById('diceResult');
  if (resBox) resBox.innerText = resultText;
}
