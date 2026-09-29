// --- СОСТОЯНИЯ (CONDITIONS) ---
function renderConditions() {
  var container = document.getElementById('conditionsContainer');
  if (!container) return;
  if (!currentChar.activeConditions) currentChar.activeConditions = {};

  var html = '';
  for (var i = 0; i < CONDITIONS_CONFIG.length; i++) {
    var cond = CONDITIONS_CONFIG[i];
    var isActive = currentChar.activeConditions[cond] || false;
    html += '<div class="cond-chip ' + (isActive ? 'active' : '') + '" onclick="toggleCondition(\'' + cond + '\')">' + cond + '</div>';
  }
  container.innerHTML = html;
}

function toggleCondition(cond) {
  if (!currentChar.activeConditions) currentChar.activeConditions = {};
  currentChar.activeConditions[cond] = !currentChar.activeConditions[cond];
  renderConditions();
  autoSaveCurrentCharacter();
}

// --- ОРУЖИЕ И АТАКИ ---
function renderWeapons() {
  var container = document.getElementById('weaponsList');
  if (!container) return;
  if (!currentChar.weaponsData) currentChar.weaponsData = [];

  if (currentChar.weaponsData.length === 0) {
    container.innerHTML = '<div style="color: #777; text-align: center;">Оружие не добавлено</div>';
    return;
  }

  var diceTypes = ['d4', 'd6', 'd8', 'd10', 'd12', 'd20'];
  var statsList = ['str', 'dex', 'int', 'wis', 'cha'];
  var html = '';

  for (var i = 0; i < currentChar.weaponsData.length; i++) {
    var w = currentChar.weaponsData[i];
    var curSides = w.diceSides || 'd6';
    var curStat = w.stat || 'str';
    var isProf = w.proficient !== undefined ? w.proficient : true;

    var statMod = getStatModNum(curStat);
    var profBonus = getProfBonusNum();
    var calcAtk = statMod + (isProf ? profBonus : 0) + (parseInt(w.extraAtk) || 0);
    var calcDmgBonus = statMod + (parseInt(w.extraDmg) || 0);

    var diceOptions = '';
    for (var d = 0; d < diceTypes.length; d++) {
      diceOptions += '<option value="' + diceTypes[d] + '" ' + (curSides === diceTypes[d] ? 'selected' : '') + '>' + diceTypes[d] + '</option>';
    }

    var statOptions = '';
    for (var s = 0; s < statsList.length; s++) {
      statOptions += '<option value="' + statsList[s] + '" ' + (curStat === statsList[s] ? 'selected' : '') + '>' + statsList[s].toUpperCase() + '</option>';
    }

    html += '<div class="weapon-card">' +
      '<div style="display:flex; gap:8px; align-items:center;">' +
        '<input type="text" value="' + (w.name || '') + '" placeholder="Название..." oninput="updateWeapon(' + i + ', \'name\', this.value)">' +
        '<label style="display:flex; align-items:center; gap:4px; font-size:0.75em; cursor:pointer; white-space:nowrap; margin:0;">' +
          '<input type="checkbox" ' + (isProf ? 'checked' : '') + ' style="width:auto; margin:0;" onchange="updateWeapon(' + i + ', \'proficient\', this.checked)"> Влад.' +
        '</label>' +
      '</div>' +
      '<div class="weapon-grid">' +
        '<div class="weapon-field"><label>Стат</label><select onchange="updateWeapon(' + i + ', \'stat\', this.value)">' + statOptions + '</select></div>' +
        '<div class="weapon-field"><label>Кол-во</label><input type="number" min="1" value="' + (w.diceCount || 1) + '" oninput="updateWeapon(' + i + ', \'diceCount\', parseInt(this.value)||1)"></div>' +
        '<div class="weapon-field"><label>Кость</label><select onchange="updateWeapon(' + i + ', \'diceSides\', this.value)">' + diceOptions + '</select></div>' +
        '<div class="weapon-field"><label>Атака</label><div class="auto-calc-val">' + formatModStr(calcAtk) + '</div></div>' +
        '<div class="weapon-field"><label>Урон</label><div class="auto-calc-val">' + formatModStr(calcDmgBonus) + '</div></div>' +
      '</div>' +
      '<div style="display: flex; justify-content: space-between; align-items: center;">' +
        '<button class="btn-action" style="padding: 6px 12px; font-size: 0.85em;" onclick="rollWeaponAttack(' + i + ')">Бросок атаки 🎲</button>' +
        '<button class="btn-del" onclick="deleteWeapon(' + i + ')">Удалить</button>' +
      '</div>' +
    '</div>';
  }
  container.innerHTML = html;
}

function addWeapon() {
  if (!currentChar.weaponsData) currentChar.weaponsData = [];
  currentChar.weaponsData.push({ id: Date.now(), name: '', stat: 'str', proficient: true, diceCount: 1, diceSides: 'd6', extraAtk: 0, extraDmg: 0 });
  renderWeapons();
  autoSaveCurrentCharacter();
}

function updateWeapon(index, field, val) {
  if (currentChar.weaponsData && currentChar.weaponsData[index]) {
    currentChar.weaponsData[index][field] = val;
    renderWeapons();
    autoSaveCurrentCharacter();
  }
}

function deleteWeapon(index) {
  currentChar.weaponsData.splice(index, 1);
  renderWeapons();
  autoSaveCurrentCharacter();
}

function rollWeaponAttack(index) {
  var w = currentChar.weaponsData[index];
  if (!w) return;

  var curStat = w.stat || 'str';
  var isProf = w.proficient !== undefined ? w.proficient : true;
  var statMod = getStatModNum(curStat);
  var profBonus = getProfBonusNum();
  var atkBonus = statMod + (isProf ? profBonus : 0) + (parseInt(w.extraAtk) || 0);
  var dmgBonus = statMod + (parseInt(w.extraDmg) || 0);

  var d20_1 = Math.floor(Math.random() * 20) + 1;
  var d20_2 = Math.floor(Math.random() * 20) + 1;

  var modeRadio = document.querySelector('input[name="rollMode"]:checked');
  var rollMode = modeRadio ? modeRadio.value : 'normal';
  var chosenD20 = d20_1;
  var d20Details = 'd20 (' + d20_1 + ')';

  if (rollMode === 'adv') {
    chosenD20 = Math.max(d20_1, d20_2);
    d20Details = 'd20 [Преимущество: ' + d20_1 + ', ' + d20_2 + ' ➔ ' + chosenD20 + ']';
  } else if (rollMode === 'dis') {
    chosenD20 = Math.min(d20_1, d20_2);
    d20Details = 'd20 [Помеха: ' + d20_1 + ', ' + d20_2 + ' ➔ ' + chosenD20 + ']';
  }

  var totalAttack = chosenD20 + atkBonus;
  var sides = parseInt((w.diceSides || 'd6').replace('d', '')) || 6;
  var count = parseInt(w.diceCount) || 1;

  var rolls = [];
  var totalDiceDamage = 0;
  for (var i = 0; i < count; i++) {
    var r = Math.floor(Math.random() * sides) + 1;
    rolls.push(r);
    totalDiceDamage += r;
  }

  var totalDamage = totalDiceDamage + dmgBonus;
  var wName = w.name.trim() || 'Оружие';

  var resultText = '⚔️ ' + wName + '\n' +
    'Атака: ' + d20Details + ' ' + formatModStr(atkBonus) + ' = ' + totalAttack + '\n' +
    'Урон: [' + rolls.join(', ') + '] (' + count + w.diceSides + ') ' + formatModStr(dmgBonus) + ' = ' + totalDamage;

  goToTab(5);
  var resBox = document.getElementById('diceResult');
  if (resBox) resBox.innerText = resultText;
}

// --- ОТДЫХ ---
function shortRest() {
  if (window.restorePactMagic) window.restorePactMagic();
  // Восстанавливаем боевые способности, помеченные восстановлением "на коротком отдыхе"
  if (currentChar.combatAbilities && typeof renderCombatAbilities === 'function') {
    var restoredShort = false;
    for (var i = 0; i < currentChar.combatAbilities.length; i++) {
      var ab = currentChar.combatAbilities[i];
      if (ab.rechargeOn === 'short' && ab.usedCount) {
        ab.usedCount = 0;
        restoredShort = true;
      }
    }
    if (restoredShort) renderCombatAbilities();
  }

  if (currentChar && currentChar.extraClassType === 'walter_parasite' && window.WALTER_PARASITE_EXTRA && typeof window.WALTER_PARASITE_EXTRA.resetRestResources === 'function') {
    window.WALTER_PARASITE_EXTRA.resetRestResources(currentChar);
  }

  autoSaveCurrentCharacter();
  alert('Короткий отдых завершен.');
}

function longRest() {
  // Extra-классы Паразит/Призрак не получают HP от долгого отдыха:
  // их тело восстанавливается только собственными сверхъестественными/
  // биологическими механизмами.
  var suppressBodyHP = !!(
    currentChar &&
    window.EXTRA_BODY_RUNTIME &&
    typeof window.EXTRA_BODY_RUNTIME.shouldSuppressRestHP === 'function' &&
    window.EXTRA_BODY_RUNTIME.shouldSuppressRestHP(currentChar)
  );
  var hpMax = document.getElementById('hpMax').value;
  if (hpMax && !suppressBodyHP) document.getElementById('hpCurrent').value = hpMax;
  document.getElementById('hpTemp').value = '';

  for (var i = 1; i <= 3; i++) {
    if (document.getElementById('deathSuccess' + i)) document.getElementById('deathSuccess' + i).checked = false;
    if (document.getElementById('deathFail' + i)) document.getElementById('deathFail' + i).checked = false;
  }

  if (currentChar.spellSlotsData) {
    for (var level = 1; level <= 9; level++) {
      if (currentChar.spellSlotsData[level]) currentChar.spellSlotsData[level].used = 0;
    }
  }

  // Длинный отдых восстанавливает ВСЕ боевые способности (и короткого, и длинного отдыха)
  if (currentChar.combatAbilities) {
    for (var j = 0; j < currentChar.combatAbilities.length; j++) {
      currentChar.combatAbilities[j].usedCount = 0;
    }
    if (typeof renderCombatAbilities === 'function') renderCombatAbilities();
  }

  if (currentChar && currentChar.extraClassType === 'walter_parasite' && window.WALTER_PARASITE_EXTRA && typeof window.WALTER_PARASITE_EXTRA.resetRestResources === 'function') {
    window.WALTER_PARASITE_EXTRA.resetRestResources(currentChar);
  }

  if (typeof renderSpellSlots === 'function') renderSpellSlots();
  autoSaveCurrentCharacter();
  alert(suppressBodyHP
    ? 'Длинный отдых завершен! Ячейки заклинаний и способности восстановлены. HP тела не восстановлены: это Extra-класс с особой системой восстановления.'
    : 'Длинный отдых завершен! HP, ячейки заклинаний и способности восстановлены.');
}
