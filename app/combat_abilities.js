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

      var safeName = String(ab.name || 'Без названия').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
      var safeDescription = String(ab.description || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
      html += '<div class="weapon-card" style="margin-bottom:8px;padding:0;overflow:hidden;">' +
        '<button type="button" onclick="toggleCombatAbilityDetails(' + i + ')" aria-expanded="false" id="combatAbilityToggle' + i + '" style="display:flex;width:100%;align-items:center;justify-content:space-between;gap:8px;text-align:left;background:transparent;border:0;color:inherit;padding:14px;font:inherit;cursor:pointer;">' +
          '<strong style="flex:1;">' + safeName + '</strong><span id="combatAbilityArrow' + i + '" style="color:#d4af37;">▾</span>' +
        '</button>' +
        '<div id="combatAbilityDetails' + i + '" style="display:none;padding:0 14px 14px;">' +
          '<div style="font-size:.9em;color:#ccc;white-space:pre-wrap;margin-bottom:10px;">' + (safeDescription || 'Описание не добавлено.') + '</div>' +
          '<input type="text" value="' + safeName + '" placeholder="Название способности" oninput="updateCombatAbility(' + i + ', \'name\', this.value)" style="margin-bottom:6px;">' +
          '<textarea placeholder="Описание способности" oninput="updateCombatAbility(' + i + ', \'description\', this.value)" style="height:70px;margin-bottom:8px;">' + safeDescription + '</textarea>' +
          '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px;">' +
            '<button class="btn-action" style="flex:1;min-width:120px;" onclick="rollCombatAbility(' + i + ')">🎲 Кинуть d20</button>' +
            '<button class="btn-action" style="flex:1;min-width:120px;background:#b66a28;" onclick="rollCombatAbilityDamage(' + i + ')">⚔️ Кинуть на урон</button>' +
          '</div>' +
          '<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">' +
            '<label style="flex:1;min-width:130px;font-size:.8em;">Восстановление<select onchange="updateCombatAbility(' + i + ', \'rechargeOn\', this.value)" style="margin-top:4px;"><option value="none" ' + (recharge === 'none' ? 'selected' : '') + '>Пассивно</option><option value="short" ' + (recharge === 'short' ? 'selected' : '') + '>Короткий отдых</option><option value="long" ' + (recharge === 'long' ? 'selected' : '') + '>Длинный отдых</option></select></label>' +
            '<label style="width:100px;font-size:.8em;">Макс. исп.<input type="number" min="0" value="' + maxUses + '" oninput="updateCombatAbility(' + i + ', \'maxUses\', parseInt(this.value)||0)" style="margin-top:4px;"></label>' +
          '</div>' + usesHtml +
          '<button class="btn-del" style="margin-top:10px;" onclick="deleteCombatAbility(' + i + ')">Удалить способность</button>' +
        '</div></div>';
    }
    container.innerHTML = html;
  }

  // Пересчитываем СЛ спасброска и бонус атаки способностей от выбранной характеристики
  calculateCombatAbilityStats();
}


// Раскрытие/сворачивание карточки: снаружи всегда остаётся только название.
function toggleCombatAbilityDetails(index) {
  var panel = document.getElementById('combatAbilityDetails' + index);
  var button = document.getElementById('combatAbilityToggle' + index);
  var arrow = document.getElementById('combatAbilityArrow' + index);
  if (!panel) return;
  var open = panel.style.display === 'none';
  panel.style.display = open ? 'block' : 'none';
  if (button) button.setAttribute('aria-expanded', open ? 'true' : 'false');
  if (arrow) arrow.textContent = open ? '▴' : '▾';
}

// Запрашиваем формулу урона (например 2d6+3) и показываем результат в истории дайсов.
function rollCombatAbilityDamage(index) {
  if (!currentChar || !currentChar.combatAbilities || !currentChar.combatAbilities[index]) return;
  var ab = currentChar.combatAbilities[index];
  var formula = window.prompt('Формула урона (например 2d6+3):', ab.damage || '1d6');
  if (formula === null) return;
  formula = String(formula).replace(/\\s+/g, '').toLowerCase();
  var match = formula.match(/^(\\d*)d(\\d+)([+-]\\d+)?$/);
  if (!match) {
    window.alert('Укажи формулу вида 1d8, 2d6+3 или 1d10-1.');
    return;
  }
  var count = Math.max(1, Math.min(100, parseInt(match[1] || '1', 10)));
  var sides = Math.max(2, Math.min(1000, parseInt(match[2], 10)));
  var modifier = parseInt(match[3] || '0', 10);
  var rolls = [];
  for (var n = 0; n < count; n++) rolls.push(Math.floor(Math.random() * sides) + 1);
  var total = rolls.reduce(function(sum, value) { return sum + value; }, 0) + modifier;
  ab.damage = formula;
  autoSaveCurrentCharacter();
  if (typeof goToTab === 'function') goToTab(5);
  var result = document.getElementById('diceResult');
  if (result) result.textContent = 'Урон «' + (ab.name || 'Способность') + '»: ' + formula + ' → ' + rolls.join(' + ') + (modifier ? (modifier > 0 ? ' + ' : ' - ') + Math.abs(modifier) : '') + ' = ' + total;
  if (typeof appendDiceLog === 'function') appendDiceLog('⚔️ Урон «' + (ab.name || 'Способность') + '»: ' + formula + ' | Броски [' + rolls.join(', ') + '] → Итог: ' + total, 'norm-roll');
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
