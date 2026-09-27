function renderSaveThrows() {
  var container = document.getElementById('saveThrowsList');
  if (!container) return;
  if (!currentChar.savesData) currentChar.savesData = {};

  var html = '';
  for (var i = 0; i < STATS_CONFIG.length; i++) {
    var s = STATS_CONFIG[i];
    var modNum = getStatModNum(s.id);
    var isProf = currentChar.savesData[s.id] || false;
    var total = modNum + (isProf ? getProfBonusNum() : 0);
    var checkedAttr = isProf ? 'checked' : '';
    html += '<div class="list-row">' +
      '<span class="list-label">' +
        '<input type="checkbox" ' + checkedAttr + ' onchange="toggleSave(\'' + s.id + '\', this.checked)"> ' +
        s.name + ' (' + s.id.toUpperCase() + ')' +
      '</span>' +
      '<span class="list-val">' + formatModStr(total) + '</span>' +
    '</div>';
  }
  container.innerHTML = html;
}

function toggleSave(statId, isChecked) {
  if (!currentChar.savesData) currentChar.savesData = {};
  currentChar.savesData[statId] = isChecked;
  calculateMods();
}

function renderSkills() {
  var container = document.getElementById('skillsList');
  if (!container) return;
  if (!currentChar.skillsData) currentChar.skillsData = {};

  var html = '';
  for (var i = 0; i < SKILLS_CONFIG.length; i++) {
    var s = SKILLS_CONFIG[i];
    var modNum = getStatModNum(s.stat);
    var mult = currentChar.skillsData[s.id] || 0;
    var total = modNum + (getProfBonusNum() * mult);

    html += '<div class="list-row">' +
      '<span class="list-label">' +
        '<select class="prof-select" onchange="changeSkillProf(\'' + s.id + '\', this.value)">' +
          '<option value="0" ' + (mult === 0 ? 'selected' : '') + '>—</option>' +
          '<option value="1" ' + (mult === 1 ? 'selected' : '') + '>✓</option>' +
          '<option value="2" ' + (mult === 2 ? 'selected' : '') + '>✕2</option>' +
        '</select> ' +
        s.name + ' <small style="color:#777;">(' + s.stat.toUpperCase() + ')</small>' +
      '</span>' +
      '<span class="list-val">' + formatModStr(total) + '</span>' +
    '</div>';
  }
  container.innerHTML = html;
  updateSkillsState(); // Синхронизируем состояние навыков при перерисовке
}

function changeSkillProf(skillId, valStr) {
  if (!currentChar.skillsData) currentChar.skillsData = {};
  currentChar.skillsData[skillId] = parseInt(valStr) || 0;
  calculateMods();
}

/**
 * Синхронизирует данные навыков из листа персонажа в единую структуру,
 * ожидаемую модулем дайсов (currentCharacter.skills и window.Prof_...), 
 * а также рассчитывает итоговые модификаторы навыков.
 */
function updateSkillsState() {
  if (typeof currentChar === 'undefined' || !currentChar) return;
  if (!currentChar.skillsData) currentChar.skillsData = {};
  if (!currentChar.skills) currentChar.skills = {};

  var profBonus = typeof getProfBonusNum === 'function' ? getProfBonusNum() : 2;

  // Маппинг внутренних ID на глобальные переменные window из dice.js
  var mapToVar = typeof SKILL_TO_VAR_MAP !== 'undefined' ? SKILL_TO_VAR_MAP : {
    acrobatics: 'Prof_Acr', animalHandling: 'Prof_Ani', arcana: 'Prof_Arc',
    athletics: 'Prof_Ath', deception: 'Prof_Dec', history: 'Prof_His',
    insight: 'Prof_Ins', intimidation: 'Prof_Itm', investigation: 'Prof_Inv',
    medicine: 'Prof_Med', nature: 'Prof_Nat', perception: 'Prof_Prc',
    performance: 'Prof_Prf', persuasion: 'Prof_Prs', religion: 'Prof_Rel',
    sleightOfHand: 'Prof_Soh', stealth: 'Prof_Stl', survival: 'Prof_Sur'
  };

  for (var i = 0; i < SKILLS_CONFIG.length; i++) {
    var s = SKILLS_CONFIG[i];
    var mult = currentChar.skillsData[s.id] || 0;
    var statMod = typeof getStatModNum === 'function' ? getStatModNum(s.stat) : 0;
    var totalSkillMod = statMod + (profBonus * mult);

    // Устанавливаем строковый статус для модуля дайсов
    if (mult === 2) {
      currentChar.skills[s.id] = 'expert';
    } else if (mult === 1) {
      currentChar.skills[s.id] = 'proficient';
    } else {
      currentChar.skills[s.id] = 'none';
    }

    // Привязываем итоговое значение в глобальные window-переменные для дайсов
    var varName = mapToVar[s.id];
    if (varName) {
      window[varName] = totalSkillMod;
    }
  }
}

function calculateMods() {
  // Пересчитываем бонус мастерства из уровня персонажа перед всем остальным,
  // чтобы он сразу обновлялся при левел-апе, а не только при переоткрытии листа.
  if (typeof updateProficiencyBonus === 'function') updateProficiencyBonus();

  for (var i = 0; i < STATS_CONFIG.length; i++) {
    var s = STATS_CONFIG[i];
    var modNum = getStatModNum(s.id);
    var modTag = document.getElementById(s.id + 'Mod');
    if (modTag) modTag.innerText = formatModStr(modNum);
  }

  var dexMod = getStatModNum('dex');
  var initElem = document.getElementById('initMod');
  if (initElem) initElem.value = formatModStr(dexMod);

  var profBonus = getProfBonusNum();
  var wisMod = getStatModNum('wis');
  var intMod = getStatModNum('int');
  var skills = currentChar.skillsData || {};

  var passPerception = 10 + wisMod + (profBonus * (skills['perception'] || 0));
  var passInvestigation = 10 + intMod + (profBonus * (skills['investigation'] || 0));
  var passInsight = 10 + wisMod + (profBonus * (skills['insight'] || 0));

  if (document.getElementById('passivePerception')) document.getElementById('passivePerception').innerText = passPerception.toString();
  if (document.getElementById('passiveInvestigation')) document.getElementById('passiveInvestigation').innerText = passInvestigation.toString();
  if (document.getElementById('passiveInsight')) document.getElementById('passiveInsight').innerText = passInsight.toString();

  updateSkillsState(); // Обновляем сопряженные переменные навыков
  renderSaveThrows();
  renderSkills();
  if (typeof renderWeapons === 'function') renderWeapons();
  if (typeof calculateSpellStats === 'function') calculateSpellStats();
  autoSaveCurrentCharacter();
}
