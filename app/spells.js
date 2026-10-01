/**
 * Блок логики заклинаний с поддержкой бросков атаки, урона и сворачиваемой шторкой
 */

// Автоматический сбор всех баз данных (фокусы + заклинания 1-9 кругов) с жесткой привязкой уровня
function getAllSpellsDatabase() {
  let allSpells = [];

  // 1. Сбор фокусов (0 круг)
  const focusSources = [
    typeof FOCUSES_DB !== 'undefined' ? FOCUSES_DB : null,
    typeof focusesList !== 'undefined' ? focusesList : null,
    typeof focuses !== 'undefined' ? focuses : null,
    typeof FOCUSES !== 'undefined' ? FOCUSES : null,
    typeof cantrips !== 'undefined' ? cantrips : null,
    typeof cantripsList !== 'undefined' ? cantripsList : null,
    window.FOCUSES_DB, window.focusesList, window.focuses, window.FOCUSES, window.cantrips
  ];
  focusSources.forEach(src => {
    if (Array.isArray(src)) {
      src.forEach(spell => {
        if (spell) {
          let copy = Object.assign({}, spell);
          copy.level = 0; // Гарантируем фокус
          allSpells.push(copy);
        }
      });
    }
  });

  // 2. Сбор заклинаний с 1 по 9 круг с принудительной установкой правильного уровня круга
  for (let i = 1; i <= 9; i++) {
    const levelSources = [
      window['spellsLevel' + i],
      window['spells' + i + 'lvl'],
      window['spells' + i + 'List'],
      window['SPELLS_' + i + '_DB'],
      window['SPELLS_' + i],
      window['spellsLevel' + i + 'List'],
      window['level' + i + 'Spells'],
      typeof self !== 'undefined' ? self['spellsLevel' + i] : null,
      typeof self !== 'undefined' ? self['spells' + i + 'lvl'] : null
    ];

    levelSources.forEach(src => {
      if (Array.isArray(src)) {
        src.forEach(spell => {
          if (spell) {
            let copy = Object.assign({}, spell);
            copy.level = i; // Принудительно присваиваем правильный круг итерации
            allSpells.push(copy);
          }
        });
      }
    });
  }

  // Убираем дубликаты и нормализуем поля
  let uniqueMap = new Map();
  allSpells.forEach(spell => {
    if (spell && (spell.name || spell.title)) {
      let spellName = spell.name || spell.title;
      let key = (spellName + '_' + (spell.level !== undefined ? spell.level : 0)).toLowerCase();
      if (!uniqueMap.has(key)) {
        spell.name = spellName;
        spell.description = spell.description || spell.desc || '';
        uniqueMap.set(key, spell);
      }
    }
  });

  return Array.from(uniqueMap.values());
}

// Функция сортировки заклинаний с приоритетом "Книги игрока" выше всех
function sortSpellsArray(spells) {
  if (!Array.isArray(spells)) return spells;
  return spells.sort((a, b) => {
    // 1. Сравнение по уровню (круг магии)
    let lvlA = a.level !== undefined ? a.level : 0;
    let lvlB = b.level !== undefined ? b.level : 0;
    if (lvlA !== lvlB) {
      return lvlA - lvlB;
    }

    // 2. Сравнение по источнику (source) — "Книга игрока" (PHB) всегда выше всех
    let srcA = (a.source || '').trim();
    let srcB = (b.source || '').trim();
    
    let isPhbA = /книга игрока|phb|player'?s handbook/i.test(srcA);
    let isPhbB = /книга игрока|phb|player'?s handbook/i.test(srcB);

    if (isPhbA && !isPhbB) return -1;
    if (!isPhbA && isPhbB) return 1;

    let srcALower = srcA.toLowerCase();
    let srcBLower = srcB.toLowerCase();
    
    if (srcALower === '' && srcBLower !== '') return 1;  
    if (srcALower !== '' && srcBLower === '') return -1; 

    if (srcALower !== srcBLower) {
      return srcALower.localeCompare(srcBLower, 'ru');
    }

    // 3. Сравнение по названию (name) по русскому алфавиту
    let nameA = (a.name || '').toLowerCase();
    let nameB = (b.name || '').toLowerCase();
    return nameA.localeCompare(nameB, 'ru');
  });
}

// Список полноценных магических классов и гибридов
const SPELLCASTING_CLASSES = [
  'бард', 'волшебник', 'друид', 'жрец', 'изобретатель', 
  'колдун', 'паладин', 'следопыт', 'чародей'
];

// Официальная таблица ячеек заклинаний для полноценного заклинателя (Full Caster)
const FULL_CASTER_SLOTS_TABLE = {
  1:  { 1: 2 },
  2:  { 1: 3 },
  3:  { 1: 4, 2: 2 },
  4:  { 1: 4, 2: 3 },
  5:  { 1: 4, 2: 3, 3: 2 },
  6:  { 1: 4, 2: 3, 3: 3 },
  7:  { 1: 4, 2: 3, 3: 3, 4: 1 },
  8:  { 1: 4, 2: 3, 3: 3, 4: 2 },
  9:  { 1: 4, 2: 3, 3: 3, 4: 3, 5: 1 },
  10: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2 },
  11: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1 },
  12: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1 },
  13: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1 },
  14: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1 },
  15: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 1 },
  16: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 1 },
  17: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 1, 9: 1 },
  18: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 3, 6: 1, 7: 1, 8: 1, 9: 1 },
  19: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 3, 6: 2, 7: 1, 8: 1, 9: 1 },
  20: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 3, 6: 2, 7: 2, 8: 1, 9: 1 }
};

// Надежное получение и распаковка объекта персонажа
function getActiveCharacter() {
  let hero = window.currentCharacter || window.currentChar;
  if (!hero) return null;
  if (typeof hero === 'string' || hero instanceof String) {
    try {
      hero = JSON.parse(hero.valueOf());
    } catch (e) {
      return null;
    }
  }
  if (typeof hero !== 'object' || Array.isArray(hero)) return null;
  return hero;
}

// Получение максимального доступного круга заклинаний для персонажа
function getMaxAvailableSpellLevel(hero) {
  if (!hero) return 0;
  if (!hero.spellSlotsData) {
    window.updateCharacterSpellSlots(hero);
  }
  let maxLevel = 0;
  if (hero.spellSlotsData) {
    for (let lvl = 1; lvl <= 9; lvl++) {
      if (hero.spellSlotsData[lvl] && (hero.spellSlotsData[lvl].max || 0) > 0) {
        if (lvl > maxLevel) maxLevel = lvl;
      }
    }
  }
  return maxLevel;
}

// Расчет лимита подготовленных заклинаний по правилам D&D
function normalizeSpellClassName(name) {
  return String(name || '').toLowerCase().replace(/ё/g, 'е').trim();
}

function getSpellClassLevel(hero, names) {
  if (!hero) return 0;
  var list = Array.isArray(hero.classes) ? hero.classes : [];
  var keys = Array.isArray(names) ? names : [names];
  var found = 0;
  list.forEach(function(c){
    var n = normalizeSpellClassName(c && c.name);
    if (keys.some(function(k){ return n.includes(k); })) found += Math.max(0, Number(c && c.level) || 0);
  });
  if (!found && keys.length) {
    var fallback = normalizeSpellClassName(hero.class || hero.className || '');
    if (keys.some(function(k){ return fallback.includes(k); })) found = Math.max(0, Number(hero.level) || 0);
  }
  return found;
}

function getSpellAbilityMod(hero, ability) {
  var stats = hero && hero.stats || {};
  var value = Number(stats[ability]);
  if (!Number.isFinite(value)) value = Number(hero && hero[ability]);
  if (!Number.isFinite(value)) value = 10;
  return Math.floor((value - 10) / 2);
}

// Centralized class-specific preparation/known-spell model.
// Prepared casters: Cleric, Druid, Wizard, Paladin, Ranger, Artificer.
// Known casters: Bard, Sorcerer, Warlock; they do not use a prepared limit.
function getSpellPreparationProfile(hero) {
  var profile = { preparedLimit: 0, preparedClasses: [], knownClasses: [], hasPreparation: false };
  if (!hero) return profile;
  var classes = Array.isArray(hero.classes) && hero.classes.length ? hero.classes : [{ name: hero.class || hero.className || '', level: hero.level || 0 }];
  classes.forEach(function(c){
    var name = normalizeSpellClassName(c && c.name), level = Math.max(0, Number(c && c.level) || 0);
    if (!level) return;
    var limit = null, ability = null;
    if (name.includes('жрец') || name.includes('клерик') || name.includes('cleric')) { limit = level + getSpellAbilityMod(hero, 'wis'); ability = 'wis'; }
    else if (name.includes('друид') || name.includes('druid')) { limit = level + getSpellAbilityMod(hero, 'wis'); ability = 'wis'; }
    else if (name.includes('волшебник') || name.includes('wizard')) { limit = level + getSpellAbilityMod(hero, 'int'); ability = 'int'; }
    else if (name.includes('паладин') || name.includes('paladin')) { limit = Math.floor(level / 2) + getSpellAbilityMod(hero, 'cha'); ability = 'cha'; }
    else if (name.includes('следопыт') || name.includes('ranger')) { limit = Math.floor(level / 2) + getSpellAbilityMod(hero, 'wis'); ability = 'wis'; }
    else if (name.includes('изобретатель') || name.includes('artificer')) { limit = Math.floor(level / 2) + getSpellAbilityMod(hero, 'int'); ability = 'int'; }
    else if (name.includes('бард') || name.includes('bard') || name.includes('чародей') || name.includes('sorcerer') || name.includes('колдун') || name.includes('warlock')) {
      profile.knownClasses.push({name:name, level:level}); return;
    }
    if (limit !== null) {
      limit = Math.max(1, limit);
      profile.preparedLimit += limit;
      profile.preparedClasses.push({name:name, level:level, limit:limit, ability:ability});
      profile.hasPreparation = true;
    }
  });
  return profile;
}

function getMaxPreparedSpellsLimit(hero) {
  return getSpellPreparationProfile(hero).preparedLimit;
}

window.DNDSpellPreparation = { getProfile: getSpellPreparationProfile, getMaxPreparedSpellsLimit: getMaxPreparedSpellsLimit, normalizeClassName: normalizeSpellClassName };

// Автоматический расчет ячеек заклинаний по правилам D&D 5e
window.updateCharacterSpellSlots = function(hero) {
  if (!hero) return;
  if (window.DNDMagic && window.DNDMagic.rebuild) { window.DNDMagic.rebuild(hero); return; }
};

function checkCharacterHasSpellcasting() {
  const spellcastingCard = document.getElementById('spellcastingCard');
  if (!spellcastingCard) return;
  
  const hero = getActiveCharacter();
  if (!hero) {
    spellcastingCard.style.display = 'none';
    return;
  }

  let hasMagic = false;
  if (hero.classes && Array.isArray(hero.classes) && hero.classes.length > 0) {
    hasMagic = hero.classes.some(c => {
      if (!c) return false;
      const cName = (typeof c === 'string' ? c : (c.name || '')).toLowerCase();
      return SPELLCASTING_CLASSES.some(sc => cName.includes(sc));
    });
  }
  if (!hasMagic) {
    const classStr = (hero.class || hero.className || hero.heroClass || '').toLowerCase();
    if (classStr) {
      hasMagic = SPELLCASTING_CLASSES.some(sc => classStr.includes(sc));
    }
  }
  spellcastingCard.style.display = hasMagic ? 'block' : 'none';
}

function updateProficiencyBonus() {
  const hero = getActiveCharacter();
  if (!hero) return;

  let totalLevel = 1;
  if (typeof window.getCharacterLevel === 'function') {
    totalLevel = window.getCharacterLevel();
  } else {
    if (hero.classes && Array.isArray(hero.classes) && hero.classes.length > 0) {
      totalLevel = hero.classes.reduce((sum, c) => sum + (Number(c.level) || 0), 0) || 1;
    } else {
      totalLevel = Number(hero.level) || 1;
    }
  }
  
  const profBonus = Math.floor((totalLevel - 1) / 4) + 2;
  const profInput = document.getElementById('profBonus');
  if (profInput) profInput.value = profBonus;
  hero.profBonus = profBonus;

  checkCharacterHasSpellcasting();
  if (typeof window.updateCharacterSpellSlots === 'function') {
    window.updateCharacterSpellSlots(hero);
  }
}

if (typeof window.calculateMods === 'function') {
  const originalCalculateMods = window.calculateMods;
  window.calculateMods = function() {
    updateProficiencyBonus();
    originalCalculateMods();
  };
}

function calculateSpellStats() {
  var hero = getActiveCharacter();
  if (!hero) return;

  var statElem = document.getElementById('spellStat');
  var statKey = statElem ? statElem.value : 'int';
  var mod = typeof getStatModNum === 'function' ? getStatModNum(statKey) : 0;
  var prof = typeof getProfBonusNum === 'function' ? getProfBonusNum() : 2;
  
  var dc = 8 + prof + mod;
  var atk = mod + prof;

  var dcElem = document.getElementById('spellDCVal');
  var atkElem = document.getElementById('spellAtkVal');
  if (dcElem) dcElem.innerText = dc.toString();
  if (atkElem) atkElem.innerText = typeof formatModStr === 'function' ? formatModStr(atk) : (atk >= 0 ? '+' + atk : atk);

  renderSpellSlots();
  if (typeof autoSaveCurrentCharacter === 'function') autoSaveCurrentCharacter();
}

/**
 * Бросок атаки заклинанием на КД (с поддержкой преимущества/помехи через currentRollMode, критов и вызовом эффектов)
 */
function rollSpellAttack(spellName) {
  console.group(`[SPELL_ATTACK] Бросок атаки заклинанием: "${spellName}"`);
  var hero = getActiveCharacter();
  
  var statElem = document.getElementById('spellStat');
  var statKey = statElem ? statElem.value : 'int';
  var mod = typeof getStatModNum === 'function' ? getStatModNum(statKey) : 0;
  var prof = typeof getProfBonusNum === 'function' ? getProfBonusNum() : (hero && hero.profBonus ? hero.profBonus : 2);
  var goldMod = hero && window.MorehodGoldModifier && typeof window.MorehodGoldModifier.getModifier === 'function' ? window.MorehodGoldModifier.getModifier(hero) : 0;
  var totalAtk = mod + prof + goldMod;

  let d20Result = 0;
  const r1 = typeof rollSingleDice === 'function' ? rollSingleDice(20) : (Math.floor(Math.random() * 20) + 1);
  let detailText = '';
  let rollTypeClass = 'norm-roll';
  let mode = typeof currentRollMode !== 'undefined' ? currentRollMode : 'normal';

  const modDisplay = totalAtk >= 0 ? '+' + totalAtk : totalAtk;

  if (mode === 'advantage') {
    const r2 = typeof rollSingleDice === 'function' ? rollSingleDice(20) : (Math.floor(Math.random() * 20) + 1);
    d20Result = Math.max(r1, r2);
    const fR1 = r1 === d20Result ? `**${r1}**` : r1;
    const fR2 = r2 === d20Result ? `**${r2}**` : r2;
    detailText = `✨ Атака заклинанием (${spellName}) [Преимущество]\nd20 броски: [${fR1}, ${fR2}] | Мод (${modDisplay})`;
    rollTypeClass = 'adv-roll';
  } else if (mode === 'disadvantage') {
    const r2 = typeof rollSingleDice === 'function' ? rollSingleDice(20) : (Math.floor(Math.random() * 20) + 1);
    d20Result = Math.min(r1, r2);
    const fR1 = r1 === d20Result ? `**${r1}**` : r1;
    const fR2 = r2 === d20Result ? `**${r2}**` : r2;
    detailText = `✨ Атака заклинанием (${spellName}) [Помеха]\nd20 броски: [${fR1}, ${fR2}] | Мод (${modDisplay})`;
    rollTypeClass = 'dis-roll';
  } else {
    d20Result = r1;
    detailText = `✨ Атака заклинанием (${spellName}): d20 [${d20Result}] | Мод (${modDisplay})`;
    rollTypeClass = 'norm-roll';
  }

  if (d20Result === 20) {
    if (typeof triggerCritEffect === 'function') triggerCritEffect(true);
  } else if (d20Result === 1) {
    if (typeof triggerCritEffect === 'function') triggerCritEffect(false);
  }

  const finalTotal = d20Result + totalAtk;
  let critNote = '';
  if (d20Result === 20) critNote = ' 🔥 **КРИТИЧЕСКОЕ ПОПАДАНИЕ!**';
  else if (d20Result === 1) critNote = ' 💀 **КРИТИЧЕСКИЙ ПРОМАХ!**';

  detailText += ` ➔ Итог атаки: **${finalTotal}**${critNote}`;
  console.groupEnd();

  if (typeof appendDiceLog === 'function') {
    appendDiceLog(detailText, rollTypeClass);
  } else {
    console.log(detailText);
  }
  return finalTotal;
}

/**
 * Бросок урона заклинания (с поддержкой русской 'к'/'К', множественных групп кубов и критов)
 */
function rollSpellDamage(spellName, damageString, isCrit = false) {
  console.group(`[SPELL_DAMAGE] Бросок урона заклинания: "${spellName}", строка: "${damageString}", крит: ${isCrit}`);
  if (!damageString) damageString = '1d6';

  // Заменяем русскую 'к' и 'К' на 'd' и приводим к нижнему регистру
  const cleanStr = damageString.toLowerCase().replace(/[кk]/g, 'd').replace(/\s+/g, '');
  let totalSum = 0;
  const allRollsDetails = [];

  // Ищем все группы кубов вида XdY (например, 2d8, 4d6)
  const diceRegex = /(\d+)d(\d+)/g;
  let match;
  let hasDice = false;

  while ((match = diceRegex.exec(cleanStr)) !== null) {
    hasDice = true;
    let diceCount = parseInt(match[1], 10) || 1;
    const diceSides = parseInt(match[2], 10) || 6;

    if (isCrit) {
      diceCount *= 2;
    }

    let groupRolls = [];
    for (let i = 0; i < diceCount; i++) {
      const raw = typeof rollSingleDice === 'function' ? rollSingleDice(diceSides) : (Math.floor(Math.random() * diceSides) + 1);
      groupRolls.push(raw);
      totalSum += raw;
    }
    allRollsDetails.push(`${diceCount}d${diceSides}: [${groupRolls.join(', ')}]`);
  }

  if (!hasDice) {
    let diceCount = isCrit ? 2 : 1;
    let groupRolls = [];
    for (let i = 0; i < diceCount; i++) {
      const raw = typeof rollSingleDice === 'function' ? rollSingleDice(6) : (Math.floor(Math.random() * 6) + 1);
      groupRolls.push(raw);
      totalSum += raw;
    }
    allRollsDetails.push(`1d6: [${groupRolls.join(', ')}]`);
  }

  // Вычисляем модификаторы / константы (очищаем строку от кубов и суммируем оставшиеся числа со знаками)
  let modVal = 0;
  let restStr = cleanStr.replace(/(\d+d\d+)/g, '');
  let modMatches = restStr.match(/([+-]?\d+)/g);
  if (modMatches) {
    modVal = modMatches.reduce((acc, m) => acc + parseInt(m, 10), 0);
  }

  totalSum += modVal;

  let logText = `⚡ Урон заклинания (${spellName})${isCrit ? ' [КРИТИЧЕСКИЙ УРОН]' : ''}: ${damageString}\nДетали бросков: ${allRollsDetails.join(' | ')}`;
  if (modVal !== 0) {
    logText += ` | Мод: ${modVal > 0 ? '+' + modVal : modVal}`;
  }
  if (goldMod !== 0) logText += ` | Мореход: ${goldMod >= 0 ? '+' : ''}${goldMod} к каждой кости`;
  logText += ` ➔ Итог: **${totalSum}**`;

  console.groupEnd();
  if (typeof appendDiceLog === 'function') {
    appendDiceLog(logText, 'norm-roll');
  } else {
    console.log(logText);
  }
  return totalSum;
}

// Отрисовка ячеек заклинаний вместе с блоками заклинаний (обернуто в шторку-details)
function renderSpellSlots() {
  var container = document.getElementById('spellSlotsContainer');
  if (!container) return;
  
  var hero = getActiveCharacter();
  if (!hero) return;

  if (typeof window.updateCharacterSpellSlots === 'function') {
    window.updateCharacterSpellSlots(hero);
  }

  if (!hero.spellSlotsData) {
    hero.spellSlotsData = {};
  }
  if (!hero.spellsData) {
    hero.spellsData = [];
  }
  if (window.DNDMagic && window.DNDMagic.ensure) window.DNDMagic.ensure(hero);

  hero.spellsData = sortSpellsArray(hero.spellsData);

  var prepProfile = getSpellPreparationProfile(hero);
  let preparedCount = hero.spellsData.filter(s => ((s.level !== undefined ? s.level : 0) > 0) && s.prepared).length;
  let maxPrepared = prepProfile.preparedLimit;
  let isOverLimit = prepProfile.hasPreparation && preparedCount > maxPrepared;

  var innerHtml = '';

  innerHtml += '<div style="background:#222; border:1px solid ' + (isOverLimit ? '#a93226' : '#444') + '; border-radius:6px; padding:10px; margin-bottom:12px; display:flex; justify-content:space-between; align-items:center;">' +
    '<div style="font-size:0.9em; color:#ddd;">Подготовлено заклинаний: <b style="color:' + (isOverLimit ? '#e74c3c' : '#ff9800') + ';">' + preparedCount + ' / ' + maxPrepared + '</b></div>' +
    (isOverLimit ? '<div style="font-size:0.75em; color:#e74c3c; font-weight:bold;">Превышен лимит!</div>' : '') +
  '</div>';

  var cantripsList = hero.spellsData.filter(s => (s.level !== undefined ? s.level : 0) === 0);
  innerHtml += renderLevelSpellSection(0, 'Фокусы', null, cantripsList);

  for (var level = 1; level <= 9; level++) {
    var slotData = hero.spellSlotsData[level] || { max: 0, used: 0 };
    var maxVal = slotData.max || 0;
    var usedVal = slotData.used || 0;

    let levelSpells = hero.spellsData.filter(s => (s.level !== undefined ? s.level : 0) === level);
    var displayStyle = (maxVal === 0 && levelSpells.length === 0) ? 'display: none;' : 'display: block;';

    var boxesHtml = '';
    for (var b = 0; b < maxVal; b++) {
      var isAvailable = b >= usedVal;
      boxesHtml += '<input type="checkbox" class="slot-box" ' + (isAvailable ? 'checked' : '') + ' onchange="toggleSpellSlot(' + level + ', ' + b + ', this.checked)">';
    }

    var slotRowHtml = '<div class="spell-slot-row" style="display:flex; align-items:center; justify-content:space-between; margin-bottom:6px;">' +
      '<div style="font-weight:bold; font-size:0.9em; width:80px; color:#fff;">' + level + '-й круг</div>' +
      '<div class="slot-boxes" style="display:flex; gap:6px; flex:1; justify-content:flex-end;">' + (boxesHtml || '<span style="font-size:0.75em; color:#777;">Нет ячеек</span>') + '</div>' +
    '</div>';

    innerHtml += '<div style="' + displayStyle + ' margin-bottom:12px; background:#181818; border:1px solid #333; border-radius:6px; padding:8px;">' +
      slotRowHtml +
      renderLevelSpellSection(level, level + '-й круг', slotRowHtml, levelSpells) +
    '</div>';
  }

  if (hero.pactMagicData) {
    var pact = hero.pactMagicData;
    var pactBoxes = '';
    for (var pb = 0; pb < pact.max; pb++) {
      pactBoxes += '<input type="checkbox" class="slot-box" ' + (pb >= pact.used ? 'checked' : '') + ' onchange="togglePactSlot(' + pb + ', this.checked)">';
    }
    innerHtml += '<div style="background:#21152a;border:1px solid #7e57c2;border-radius:6px;padding:10px;margin-bottom:12px;"><div style="font-weight:bold;color:#ce93d8">🔮 Pact Magic — ячейки '+pact.slotLevel+' круга</div><div style="display:flex;gap:6px;justify-content:flex-end;margin-top:6px">'+pactBoxes+'</div><div style="font-size:.75em;color:#aaa;margin-top:5px">Восстанавливаются коротким отдыхом.</div></div>';
  }

  // Общая шторка на весь блок заклинаний
  var html = '<details open style="background:#1a1a1a; border:1px solid #444; border-radius:8px; padding:10px; margin-bottom:15px;">' +
    '<summary style="cursor:pointer; color:#ff9800; font-weight:bold; font-size:1.05em; user-select:none; outline:none;">✨ Управление заклинаниями и ячейки</summary>' +
    '<div style="margin-top:12px;">' + innerHtml + '</div>' +
  '</details>';

  container.innerHTML = html;
}

function renderLevelSpellSection(level, titleText, slotHtml, spells) {
  var spellsHtml = '';
  if (spells.length === 0) {
    spellsHtml = '<div style="color: #666; font-size:0.8em; text-align: center; padding: 6px;">Нет заклинаний этого круга</div>';
  } else {
    spells.forEach(s => {
      let i = getActiveCharacter().spellsData.indexOf(s);
      let isPrepared = s.prepared || false;
      let spellDesc = s.desc || s.description || '';
      let schoolText = s.school ? s.school : 'Школа не указана';
      let spellNameEscaped = (s.name || '').replace(/'/g, "\\'");
      let spellDamageStr = s.damage || '';
      let castInfo = (window.getSpellCastingInfo ? window.getSpellCastingInfo(s) : null);

      spellsHtml += '<div class="spell-card" style="background:#1e1e1e; border:1px solid #333; border-radius:6px; padding:10px; margin-bottom:8px;">' +
        '<div class="spell-card-header" style="display:flex; justify-content:space-between; align-items:center; gap:8px;">' +
          '<input type="text" value="' + (s.name || '') + '" readonly style="font-weight:bold; color:#ff9800; margin:0; flex:1; min-width:0; background:#1a1a1a; border:1px solid #333; color:#ff9800; padding:6px; border-radius:4px; font-size:0.95em; cursor:default;" title="Название заблокировано">' +
          '<input type="text" value="' + schoolText + '" readonly style="width:130px; flex-shrink:0; margin:0; font-size:0.85em; background:#1a1a1a; color:#aaa; border:1px solid #333; padding:6px; border-radius:4px; text-align:center; cursor:default;" title="Школа заклинания">' +
        '</div>' +
        '<details style="margin-top:8px; background:#181818; border:1px solid #333; border-radius:4px; padding:6px 8px;">' +
          '<summary style="cursor:pointer; color:#ffb74d; font-size:0.85em; font-weight:bold; user-select:none;">Подробнее</summary>' +
          '<div style="font-size:0.75em; color:#aaa; margin-top:8px; display:flex; gap:10px; flex-wrap:wrap; align-items:center;">' +
            (s.source ? '<span style="color:#ffb74d; font-weight:bold;">📖 ' + s.source + '</span>' : '') +
            (s.castingTime ? '<span>⏱ ' + s.castingTime + '</span>' : '') +
            (s.range ? '<span>🎯 ' + s.range + '</span>' : '') +
            (s.duration ? '<span>⏳ ' + s.duration + '</span>' : '') +
            (s.damage ? '<span>⚔ ' + s.damage + (s.damageType ? ' (' + s.damageType + ')' : '') + '</span>' : '') +
            (castInfo ? '<span style="color:#80cbc4">✨ ' + castInfo.className + ' / ' + castInfo.ability.toUpperCase() + ' • атака +' + castInfo.attack + ' • DC ' + castInfo.dc + '</span>' : '') +
          '</div>' +
          '<textarea rows="4" onchange="updateSpell(' + i + ', \'desc\', this.value)" style="width:100%; margin-top:8px; background:#2a2a2a; color:#fff; border:1px solid #444; padding:8px; font-size:0.9em; border-radius:4px; line-height:1.4; resize:vertical; box-sizing:border-box; font-family:inherit;">' + spellDesc + '</textarea>' +
        '</details>' +
        '<div style="display:flex; gap:8px; margin-top:8px;">' +
          '<button type="button" onclick="rollSpellAttack(\'' + spellNameEscaped + '\')" style="flex:1; background:#333; color:#ff9800; border:1px solid #444; padding:6px; border-radius:4px; cursor:pointer; font-size:0.8em; font-weight:bold;">d20 на кд</button>' +
          '<button type="button" onclick="rollSpellDamage(\'' + spellNameEscaped + '\', \'' + spellDamageStr + '\', false)" style="flex:1; background:#333; color:#ff9800; border:1px solid #444; padding:6px; border-radius:4px; cursor:pointer; font-size:0.8em; font-weight:bold;">бросить на урон</button>' +
        '</div>' +
        '<div style="display:flex; justify-content:space-between; align-items:center; margin-top:8px; border-top:1px solid #333; padding-top:8px;">' +
          '<label style="display:flex; align-items:center; gap:6px; margin:0; cursor:pointer; font-size:0.85em; color:#ddd;">' +
            '<input type="checkbox" ' + (isPrepared ? 'checked' : '') + (getSpellPreparationProfile(getActiveCharacter()).hasPreparation ? '' : ' disabled') + ' style="width:auto; margin:0;" onchange="updateSpell(' + i + ', \'prepared\', this.checked)"> ' + (getSpellPreparationProfile(getActiveCharacter()).hasPreparation ? 'Подготовлено' : 'Известно') + '' +
          '</label>' +
          '<button class="btn-del" onclick="deleteSpell(' + i + ')" style="background:#a93226; color:#fff; border:none; padding:6px 10px; border-radius:4px; cursor:pointer; font-size:0.8em;">Удалить</button>' +
        '</div>' +
      '</div>';
    });
  }

  return '<details style="background:#141414; border:1px solid #333; border-radius:6px; padding:8px; margin-bottom:10px;">' +
    '<summary style="cursor:pointer; color:#ff9800; font-weight:bold; font-size:0.95em; user-select:none;">' + titleText + ' (' + spells.length + ')</summary>' +
    '<div style="margin-top:10px;">' + spellsHtml + '</div>' +
  '</details>';
}

function renderSpells() {
  renderSpellSlots();
}

function toggleSpellSlot(level, boxIndex, isChecked) {
  var hero = getActiveCharacter();
  if (!hero || !hero.spellSlotsData || !hero.spellSlotsData[level]) return;

  var maxVal = hero.spellSlotsData[level].max || 0;
  if (!isChecked) {
    hero.spellSlotsData[level].used = maxVal - boxIndex;
  } else {
    hero.spellSlotsData[level].used = Math.max(0, maxVal - (boxIndex + 1));
  }

  renderSpellSlots();
  if (typeof autoSaveCurrentCharacter === 'function') autoSaveCurrentCharacter();
}

function togglePactSlot(boxIndex, isChecked) {
  var hero = getActiveCharacter(); if (!hero || !hero.pactMagicData) return;
  var max = hero.pactMagicData.max || 0;
  hero.pactMagicData.used = isChecked ? Math.max(0, max - (boxIndex + 1)) : Math.min(max, max - boxIndex);
  renderSpellSlots(); if (typeof autoSaveCurrentCharacter === 'function') autoSaveCurrentCharacter();
}

function addSpell() {
  openSpellModal();
}

function updateSpell(index, field, val) {
  var hero = getActiveCharacter();
  if (!hero || !hero.spellsData || !hero.spellsData[index]) return;

  hero.spellsData[index][field] = val;

  if (field === 'level' || field === 'source' || field === 'name' || field === 'prepared') {
    renderSpellSlots();
  }
  if (typeof autoSaveCurrentCharacter === 'function') autoSaveCurrentCharacter();
}

function deleteSpell(index) {
  var hero = getActiveCharacter();
  if (!hero || !hero.spellsData) return;

  hero.spellsData.splice(index, 1);
  renderSpellSlots();
  if (typeof autoSaveCurrentCharacter === 'function') autoSaveCurrentCharacter();
}

// Модальное окно выбора заклинаний
function openSpellModal() {
  let modal = document.getElementById('spellSelectModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'spellSelectModal';
    modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); display:flex; justify-content:center; align-items:center; z-index:9999; padding:10px; box-sizing:border-box;';
    modal.innerHTML = `
      <div style="background:#222; color:#fff; width:100%; max-width:650px; height:90vh; max-height:850px; border-radius:8px; display:flex; flex-direction:column; padding:15px; box-sizing:border-box; box-shadow: 0 4px 20px rgba(0,0,0,0.5);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; flex-shrink:0;">
          <h3 style="margin:0; color:#ff9800; font-size:1.1em;" id="spellModalTitle">Добавить фокус или заклинание</h3>
          <button onclick="closeSpellModal()" style="background:none; border:none; color:#fff; font-size:1.4em; cursor:pointer;">&times;</button>
        </div>

        <div style="display:flex; gap:8px; margin-bottom:12px; flex-shrink:0;">
          <input type="text" id="spellSearchInput" placeholder="Поиск по названию или описанию..." style="flex:1; padding:8px; background:#333; border:1px solid #444; color:#fff; border-radius:4px; font-size:0.9em;" oninput="filterSpellModalList()">
          <select id="spellLevelFilter" style="padding:8px; background:#333; border:1px solid #444; color:#fff; border-radius:4px; font-size:0.9em;" onchange="filterSpellModalList()">
            <option value="all">Все доступные круги</option>
            <option value="0">Фокусы</option>
            <option value="1">1 круг</option>
            <option value="2">2 круг</option>
            <option value="3">3 круг</option>
            <option value="4">4 круг</option>
            <option value="5">5 круг</option>
            <option value="6">6 круг</option>
            <option value="7">7 круг</option>
            <option value="8">8 круг</option>
            <option value="9">9 круг</option>
          </select>
        </div>

        <div id="spellModalListContainer" style="flex:1; min-height:0; overflow-y:auto; border:1px solid #444; border-radius:4px; padding:8px; background:#181818;"></div>

        <div style="margin-top:12px; display:flex; justify-content:space-between; align-items:center; flex-shrink:0;">
          <button onclick="addCustomEmptySpell()" style="background:#444; color:#fff; border:none; padding:8px 12px; border-radius:4px; cursor:pointer; font-size:0.9em;">+ Создать пустое</button>
          <button onclick="closeSpellModal()" style="background:#ff9800; color:#000; border:none; padding:8px 16px; border-radius:4px; font-weight:bold; cursor:pointer; font-size:0.9em;">Закрыть</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }
  modal.style.display = 'flex';
  populateSpellModalList();
}

function closeSpellModal() {
  const modal = document.getElementById('spellSelectModal');
  if (modal) modal.style.display = 'none';
}

function getActiveSpellSourceData() {
  var hero = getActiveCharacter();
  let rawItems = getAllSpellsDatabase();

  let heroClassNames = [];
  if (hero) {
    if (hero.classes && Array.isArray(hero.classes)) {
      hero.classes.forEach(c => {
        if (c && c.name) heroClassNames.push(String(c.name).toLowerCase().trim());
      });
    }
    if (hero.class || hero.className) {
      let single = String(hero.class || hero.className).replace(/[0-9]/g, '').replace(/ур\./gi, '').toLowerCase().trim();
      if (single) heroClassNames.push(single);
    }
  }

  let maxAllowedLevel = getMaxAvailableSpellLevel(hero);

  let filteredItems = rawItems.filter(s => {
    let lvl = s.level !== undefined ? s.level : 0;
    
    let levelOk = (lvl === 0 || lvl <= maxAllowedLevel);
    if (!levelOk) return false;

    if (s.classes && Array.isArray(s.classes) && s.classes.length > 0) {
      let classMatch = s.classes.some(spellClass => {
        let scLower = String(spellClass).toLowerCase().trim();
        return heroClassNames.some(hCls => hCls.includes(scLower) || scLower.includes(hCls));
      });
      if (!classMatch) return false;
    }

    return true;
  });

  return sortSpellsArray(filteredItems);
}

function populateSpellModalList() {
  const container = document.getElementById('spellModalListContainer');
  if (!container) return;
  const items = getActiveSpellSourceData();
  if (items.length === 0) {
    let msg = 'Нет доступных заклинаний для вашего уровня и класса.';
    container.innerHTML = '<div style="color:#777; text-align:center; padding:20px;">' + msg + '</div>';
    return;
  }
  renderSpellModalItems(items);
}

function renderSpellModalItems(items) {
  const container = document.getElementById('spellModalListContainer');
  const searchInput = document.getElementById('spellSearchInput');
  const levelFilter = document.getElementById('spellLevelFilter');
  if (!container || !searchInput || !levelFilter) return;

  const searchVal = (searchInput.value || '').toLowerCase();
  const levelVal = levelFilter.value;

  let html = '';
  let count = 0;

  for (let i = 0; i < items.length; i++) {
    let s = items[i];
    let name = s.name || '';
    let level = s.level !== undefined ? s.level : 0;
    let desc = s.description || s.desc || '';
    let source = s.source || '';

    if (searchVal && !name.toLowerCase().includes(searchVal) && !desc.toLowerCase().includes(searchVal)) continue;
    if (levelVal !== 'all' && level.toString() !== levelVal) continue;

    count++;
    let lvlBadge = level === 0 ? 'Фокус' : level + ' круг';
    let sourceHtml = source ? '<div style="font-size:0.75em; color:#ffb74d; font-weight:bold; margin-bottom:4px;">📖 Источник: ' + source + '</div>' : '';

    html += `<div style="display:flex; justify-content:space-between; align-items:flex-start; padding:12px; border-bottom:1px solid #333; gap:12px;">
      <div style="flex:1; min-width:0;">
        <div style="font-weight:bold; color:#ff9800; font-size:1em; margin-bottom:2px;">${name} <span style="font-size:0.75em; color:#aaa; font-weight:normal;">(${lvlBadge}${s.school ? ', ' + s.school : ''})</span></div>
        ${sourceHtml}
        <div style="font-size:0.85em; color:#ccc; white-space:pre-wrap; word-break:break-word; line-height:1.4;">${desc}</div>
      </div>
      <button onclick='addSpellFromDB(${JSON.stringify(s)})' style="background:#ff9800; color:#000; border:none; padding:8px 14px; border-radius:4px; font-weight:bold; cursor:pointer; font-size:0.85em; white-space:nowrap; align-self:flex-start; flex-shrink:0;">Добавить</button>
    </div>`;
  }

  if (count === 0) {
    html = '<div style="color:#777; text-align:center; padding:20px;">Ничего не найдено</div>';
  }
  container.innerHTML = html;
}

function filterSpellModalList() {
  renderSpellModalItems(getActiveSpellSourceData());
}

function addSpellFromDB(spellObj) {
  var hero = getActiveCharacter();
  if (!hero) return;

  if (!hero.spellsData) hero.spellsData = [];
  let newSpell = {
    id: Date.now() + Math.random(),
    name: spellObj.name || '',
    level: spellObj.level !== undefined ? spellObj.level : 1,
    school: spellObj.school || '',
    castingTime: spellObj.castingTime || '',
    range: spellObj.range || '',
    components: spellObj.components || {},
    duration: spellObj.duration || '',
    concentration: spellObj.concentration || false,
    attackType: spellObj.attackType || null,
    savingThrow: spellObj.savingThrow || null,
    damage: spellObj.damage || '',
    damageType: spellObj.damageType || '',
    source: spellObj.source || '',
    desc: spellObj.description || spellObj.desc || '',
    prepared: getSpellPreparationProfile(hero).hasPreparation
  };
  hero.spellsData.push(newSpell);
  renderSpellSlots();
  if (typeof autoSaveCurrentCharacter === 'function') autoSaveCurrentCharacter();
  closeSpellModal();
}

function addCustomEmptySpell() {
  var hero = getActiveCharacter();
  if (!hero) return;

  if (!hero.spellsData) hero.spellsData = [];
  hero.spellsData.push({ id: Date.now(), name: '', level: 1, desc: '', prepared: getSpellPreparationProfile(hero).hasPreparation });
  renderSpellSlots();
  if (typeof autoSaveCurrentCharacter === 'function') autoSaveCurrentCharacter();
  closeSpellModal();
}

// Перехват открытия персонажа
window.addEventListener('DOMContentLoaded', () => {
  if (typeof window.openCharacter === 'function') {
    const originalOpenCharacter = window.openCharacter;
    window.openCharacter = function(id) {
      originalOpenCharacter(id);
      
      const hero = getActiveCharacter();
      if (hero && typeof window.updateCharacterSpellSlots === 'function') {
        window.updateCharacterSpellSlots(hero);
      }
      updateProficiencyBonus();
      if (typeof calculateSpellStats === 'function') calculateSpellStats();
      if (typeof renderSpellSlots === 'function') renderSpellSlots();
    };
  }
});
