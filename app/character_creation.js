/**
 * ДОРАБОТКА: создание персонажа.
 * Создаёт совместимые поля spellcastingSources и trackers для дальнейшей работы мультикласса,
 * компаньонов и инициативы; существующие spellStat/proficiencies сохраняются.
 * Основные переменные: newChar, initialProficiencies, selectedRace, className.
 */

/**
 * character_creation.js
 * ------------------------------------------------------------------
 * ЧТО ЭТО ЗА ФАЙЛ:
 * Экран создания нового персонажа: раса, класс, предыстория, характеристики
 * по системе Point Buy (как в BG3), стартовые владения и сборка итогового
 * объекта персонажа (newChar), который кладётся в allCharacters.
 *
 * ЧТО ДОБАВЛЕНО (мультикласс/подклассы):
 * - newChar теперь сразу получает поле `classes: [{name, level, subclass}]`,
 *   а не только устаревшие строковые `class`/`className` — раньше массив
 *   `classes` лениво создавался только при первом повышении уровня или
 *   первом расчёте ячеек заклинаний, из-за чего часть кода вплоть до этого
 *   момента работала с несогласованными данными.
 * - renderCreationSubclassPicker(classNameOnly) — если у выбранного класса
 *   подкласс выбирается уже на 1 уровне (Жрец, Чародей, Колдун), рядом
 *   с описанием класса появляется список подклассов (#cc_subclass). Для
 *   остальных классов подкласс предлагается выбрать позже, при первом
 *   повышении уровня (см. classes/level_up.js).
 *
 * КАКИЕ ПЕРЕМЕННЫЕ/ГЛОБАЛЫ ИСПОЛЬЗУЕТ:
 * - window.getAvailableSubclasses(className) <- subclasses/subclassesRegistry.js
 * - window.applyClassProgression(hero, className, level) <- classes/progressionEngine.js
 * - DND_CLASSES_LIST, PROFICIENCIES_DB, allCharacters — определены в других
 *   файлах проекта (races.js/Backgrounds.js/app.js), используются как есть.
 * ------------------------------------------------------------------
 */
// --- МОДУЛЬ СОЗДАНИЯ ПЕРСОНАЖА (Point Buy как в BG3) ---

var BG3_POINT_BUY = {
  costs: { 8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 7, 15: 9 },
  maxPoints: 27,
  stats: {
    str: 8,
    dex: 8,
    con: 8,
    int: 8,
    wis: 8,
    cha: 8
  }
};

var DND_CLASSES_LIST = [
  { id: 'occultist', name: 'Оккультист', hitDie: 6, desc: 'Заготовка оккультного класса; механики, ресурс и специализации будут добавлены отдельным этапом.' },
  { id: 'witch', name: 'Ведьма', hitDie: 8, desc: 'Полный заклинатель, использующий проклятия, Hexes и фамильяра; механики будут добавлены отдельным этапом.' },
  { id: 'necromancer', name: 'Некромант', hitDie: 6, desc: 'Полный заклинатель Интеллекта, управляющий нежитью; каркас трэллов, Charnel Touch и Личества будет наполнен механиками отдельным этапом.' },
  { id: 'martyr', name: 'Мученик', hitDie: 12, desc: 'Божественный воин-заклинатель, превращающий собственные жизненные силы в силу и чудеса; механики жертвоприношения будут добавлены отдельным этапом.' },
  { id: 'vessel', name: 'Сосуд', hitDie: 10, desc: 'Воин-носитель потустороннего духа: Spirit Mantle, Unsealed Aspects, магия и форма Archon; механики будут добавлены отдельным этапом.' },
  { id: 'alchemist', name: 'Алхимик', hitDie: 8, desc: 'Немагический алхимик: формулы, реактивы, быстро создаваемые составы, смешивание предметов и собственная специализация.' },
  { id: 'artificer', name: 'Изобретатель', hitDie: 8, desc: 'Мастер магических изобретений, превращающий обычные предметы в чудеса инженерии. Ремесло: Инструментальный эксперт: с 3 уровня +2 к проверкам крафта при владении требуемым инструментом.' },
  { id: 'barbarian', name: 'Варвар', hitDie: 12, desc: 'Яростный воин первобытной дикости, способный впадать в боевое безумие.' },
  { id: 'bard', name: 'Бард', hitDie: 8, desc: 'Мастер песни, речи и магии, вдохновляющий союзников и сбивающий с толку врагов. Ремесло: Сценическое ремесло: +1 к текстилю, оформлению и каллиграфии при владении инструментом.' },
  { id: 'cleric', name: 'Жрец', hitDie: 8, desc: 'Посредник между божеством и смертным миром, обладающий целительной и карающей силой.' },
  { id: 'druid', name: 'Друид', hitDie: 8, desc: 'Страж природы, черпающий силу из стихий и способный принимать форму зверей. Ремесло: Природное ремесло: +1 к обработке растительных и алхимических компонентов при владении инструментом.' },
  { id: 'fighter', name: 'Воин', hitDie: 10, desc: 'Универсальный мастер оружия и брони, готовый к любым испытаниям в бою.' },
  { id: 'monk', name: 'Монах', hitDie: 8, desc: 'Адепт мистических боевых искусств, использующий внутреннюю энергию ки.' },
  { id: 'paladin', name: 'Паладин', hitDie: 10, desc: 'Святой воитель, связанный священной клятвой защищать праведных и карать зло.' },
  { id: 'ranger', name: 'Следопыт', hitDie: 10, desc: 'Охотник и следопыт диких земель, мастер выживания и борьбы с избранными врагами. Ремесло: Полевое ремесло: +1 к обработке природных материалов при владении соответствующим инструментом.' },
  { id: 'rogue', name: 'Плут', hitDie: 8, desc: 'Мастер скрытности, ловушек и неожиданных смертоносных ударов из тени. Ремесло: Теневое ремесло: +1 к тонкой механике, подделкам и гриму при владении инструментом.' },
  { id: 'sorcerer', name: 'Чародей', hitDie: 6, desc: 'Заклинатель, чья магия в крови от рождения благодаря уникальному наследию.' },
  { id: 'warlock', name: 'Колдун', hitDie: 8, desc: 'Заключивший договор с могущественной потусторонней сущностью в обмен на тайные знания.' },
  { id: 'wizard', name: 'Волшебник', hitDie: 6, desc: 'Ученый от магии, изучающий заклинания по толстым фолиантам и книгам. Ремесло: Арканное ремесло: +1 к каллиграфии и алхимии при владении инструментом.' },
  { id: 'illrigger', name: 'Иллирригер', hitDie: 10, desc: 'Бронированный сверхъестественный воин с инфернальным источником силы.' },
  { id: 'beastheart', name: 'Бистхарт', hitDie: 10, desc: 'Герой, сражающийся в связке с постоянным монструозным компаньоном.' },
  { id: 'pugilist', name: 'Пугилист', hitDie: 10, desc: 'Уличный боец, превращающий стойкость, кулаки и боевой азарт в ресурс.' },
  { id: 'accursed', name: 'Аккурсд', hitDie: 10, desc: 'Временная заглушка класса. Жетон подключён; механика будет добавлена позже.' },
  { id: 'geist', name: 'Гайст', hitDie: 8, desc: 'Временная заглушка класса. Жетон подключён; механика будет добавлена позже.' },
  { id: 'parasite', name: 'Паразит', hitDie: 10, desc: 'Временная заглушка класса. Жетон подключён; механика будет добавлена позже.' },
  { id: 'psion', name: 'Псионик', hitDie: 8, desc: 'Временная заглушка класса. Жетон подключён; механика будет добавлена позже.' },
  { id: 'rune_keeper', name: 'Рунный хранитель', hitDie: 10, desc: 'Временная заглушка класса. Жетон подключён; механика будет добавлена позже.' },
  { id: 'savant', name: 'Савант', hitDie: 8, desc: 'Временная заглушка класса. Жетон подключён; механика будет добавлена позже.' },
  { id: 'shifter', name: 'Шифтер', hitDie: 10, desc: 'Временная заглушка класса. Жетон подключён; механика будет добавлена позже.' },
  { id: 'swarm', name: 'Рой', hitDie: 8, isExtra: true, replacesRace: true, desc: 'Extra-класс: одновременно раса и класс. Управляет коллективной биомассой, не использует обычную расу и не может мультиклассироваться.' }
  { id: 'warden', name: 'Страж', hitDie: 10, desc: 'Временная заглушка класса. Жетон подключён; механика будет добавлена позже.' },
  { id: 'warlord', name: 'Военачальник', hitDie: 10, desc: 'Временная заглушка класса. Жетон подключён; механика будет добавлена позже.' }
];


// Клик по кнопке "+ Новый персонаж" из главного меню
window.createNewCharacter = function() {
  var selectScreen = document.getElementById('characterSelectScreen');
  var sheetScreen = document.getElementById('characterSheetScreen');
  var creationScreen = document.getElementById('characterCreationScreen');

  if (selectScreen) selectScreen.style.display = 'none';
  if (sheetScreen) sheetScreen.style.display = 'none';
  if (creationScreen) creationScreen.style.display = 'block';

  // Сбрасываем статы Point Buy к дефолту (все по 8)
  for (var key in BG3_POINT_BUY.stats) {
    BG3_POINT_BUY.stats[key] = 8;
  }
  
  var nameInput = document.getElementById('cc_name');
  if (nameInput) nameInput.value = '';

  var ageInput = document.getElementById('cc_age');
  if (ageInput) ageInput.value = '';

  initCharacterCreationScreen();
  updatePointBuyUI();
};

// Инициализация элементов экрана создания персонажа
function initCharacterCreationScreen() {
  var classSelect = document.getElementById('cc_class');
  if (classSelect) {
    classSelect.innerHTML = '';
    DND_CLASSES_LIST.forEach(function(c) {
      classSelect.innerHTML += '<option value="' + c.name + ' 1">' + (c.displayName || c.name) + '</option>';
    });
    classSelect.onchange = function() {
      updateClassDescription();
      updateExtraClassCreationUI();
    };
  }

  // Получаем предыстории из Backgrounds.js через глобальные переменные или функции
  var backgroundsList = [];
  if (typeof getAllBackgrounds === 'function') {
    backgroundsList = getAllBackgrounds();
  } else if (typeof dndBackgrounds !== 'undefined' && Array.isArray(dndBackgrounds)) {
    backgroundsList = dndBackgrounds;
  } else if (typeof window.dndBackgrounds !== 'undefined' && Array.isArray(window.dndBackgrounds)) {
    backgroundsList = window.dndBackgrounds;
  }

  var bgSelect = document.getElementById('cc_background');
  if (bgSelect) {
    bgSelect.innerHTML = '<option value="">-- Выберите предысторию --</option>';
    backgroundsList.forEach(function(b) {
      var valName = b.nameRu || b.name;
      var displayName = b.nameRu ? b.nameRu + ' (' + b.name + ')' : b.name;
      var source = b.source ? ' [' + b.source + ']' : '';
      
      bgSelect.innerHTML += '<option value="' + valName + '">' + displayName + source + '</option>';
    });
    bgSelect.onchange = updateBackgroundDescription;
  }

  updateCreationRaceSelect();
  renderPointBuyRows();
  
  updateClassDescription();
  updateExtraClassCreationUI();
  updateBackgroundDescription();
  if (window.DND_CRAFT_PROFESSION_PROGRESS && typeof window.DND_CRAFT_PROFESSION_PROGRESS.renderCharacterCreation === 'function') {
    window.DND_CRAFT_PROFESSION_PROGRESS.renderCharacterCreation();
  }
}

function updateCreationRaceSelect() {
  var raceSelect = document.getElementById('cc_race');
  if (!raceSelect || typeof getAllRaces !== 'function') return;
  
  var allRaces = getAllRaces();
  var html = '<option value="">-- Выберите расу --</option>';
  allRaces.forEach(function(r) {
    html += '<option value="' + r.id + '">' + r.name + '</option>';
  });
  raceSelect.innerHTML = html;
  raceSelect.onchange = updateRaceDescription;
  updateRaceDescription();
}

// Обновление описания расы
function updateRaceDescription() {
  var raceSelect = document.getElementById('cc_race');
  var descBox = document.getElementById('cc_raceDescBox');
  if (!raceSelect || !descBox) return;

  var raceId = raceSelect.value;
  if (!raceId || typeof getAllRaces !== 'function') {
    descBox.innerHTML = '<span style="color: #777;">Выберите расу, чтобы увидеть ее описание и особенности.</span>';
    return;
  }

  var allRaces = getAllRaces();
  var selectedRace = null;
  for (var i = 0; i < allRaces.length; i++) {
    if (allRaces[i].id === raceId) {
      selectedRace = allRaces[i];
      break;
    }
  }

  if (selectedRace) {
    var bonusesText = '';
    if (selectedRace.bonuses) {
      var bParts = [];
      var statNamesShort = { str: 'Сил', dex: 'Лов', con: 'Тел', int: 'Инт', wis: 'Муд', cha: 'Хар' };
      for (var s in selectedRace.bonuses) {
        if (selectedRace.bonuses[s] !== 0) {
          bParts.push(statNamesShort[s] + ': +' + selectedRace.bonuses[s]);
        }
      }
      if (bParts.length > 0) {
        bonusesText = '<br><strong>Бонусы к характеристикам:</strong> ' + bParts.join(', ');
      }
    }
    descBox.innerHTML = '<strong>' + selectedRace.name + '</strong><br>' + (selectedRace.desc || 'Нет описания.') + bonusesText + '<br><span style="color: #aaa; font-size: 12px;">Скорость: ' + (selectedRace.speed || '30 футов') + '</span>';
  } else {
    descBox.innerHTML = '<span style="color: #777;">Описание не найдено.</span>';
  }
}

// Обновление описания предыстории
function updateBackgroundDescription() {
  var bgSelect = document.getElementById('cc_background');
  var descBox = document.getElementById('cc_bgDescBox');
  if (!bgSelect || !descBox) return;

  var bgVal = bgSelect.value;
  if (!bgVal) {
    descBox.innerHTML = '<span style="color: #777;">Выберите предысторию, чтобы увидеть навыки, особенности и описание.</span>';
    return;
  }

  var backgroundsList = [];
  if (typeof getAllBackgrounds === 'function') {
    backgroundsList = getAllBackgrounds();
  } else if (typeof dndBackgrounds !== 'undefined') {
    backgroundsList = dndBackgrounds;
  } else if (typeof window.dndBackgrounds !== 'undefined') {
    backgroundsList = window.dndBackgrounds;
  }

  var selectedBg = null;
  for (var i = 0; i < backgroundsList.length; i++) {
    var b = backgroundsList[i];
    if (b.nameRu === bgVal || b.name === bgVal) {
      selectedBg = b;
      break;
    }
  }

  if (selectedBg) {
    var skillsStr = Array.isArray(selectedBg.skills) ? selectedBg.skills.join(', ') : (selectedBg.skills || 'Нет');
    var toolsStr = Array.isArray(selectedBg.toolProficiencies) && selectedBg.toolProficiencies.length > 0 ? selectedBg.toolProficiencies.join(', ') : 'Нет';
    var featureStr = selectedBg.feature || 'Не указана';
    
    var featureDescStr = selectedBg.featuredescription || selectedBg.featureDescription || selectedBg.featureDesc || '';
    var descText = selectedBg.description || 'Описание отсутствует.';
    
    var featureHtml = '<strong>Особенность:</strong> ' + featureStr;
    if (featureDescStr) {
      featureHtml += '<br><span style="color: #bbb; display: block; margin: 2px 0 4px 10px; font-size: 13px;">' + featureDescStr + '</span>';
    }

    descBox.innerHTML = '<strong>' + (selectedBg.nameRu || selectedBg.name) + '</strong> (' + (selectedBg.source || 'PHB') + ')<br>' +
      '<span style="color: #ccc; display: block; margin: 4px 0;">' + descText + '</span>' +
      '<strong>Навыки:</strong> ' + skillsStr + '<br>' +
      '<strong>Инструменты:</strong> ' + toolsStr + '<br>' +
      featureHtml;
  } else {
    descBox.innerHTML = '<span style="color: #777;">Информация о предыстории отсутствует.</span>';
  }
}

// Extra-классы: отдельная ветка создания персонажа.
function updateExtraClassCreationUI() {
  var classSelect = document.getElementById('cc_class');
  var raceSelect = document.getElementById('cc_race');
  var raceDesc = document.getElementById('cc_raceDescBox');
  if (!classSelect || !raceSelect) return;

  var className = String(classSelect.value || '').replace(/[0-9]/g, '').trim().split(' ')[0];
  var isSwarm = className === 'Рой';

  if (isSwarm) {
    raceSelect.dataset.previousRace = raceSelect.value || '';
    raceSelect.value = '';
    raceSelect.disabled = true;
    raceSelect.style.opacity = '0.55';
    raceSelect.title = 'Рой одновременно является расой и классом. Обычная раса не выбирается.';
    if (raceDesc) {
      raceDesc.innerHTML = '<strong>Рой — Extra-класс</strong><br>' +
        'Рой одновременно заменяет расу и класс. Обычная раса не выбирается. ' +
        'Все уровни после первого идут только в класс «Рой».';
    }
  } else {
    raceSelect.disabled = false;
    raceSelect.style.opacity = '';
    raceSelect.title = '';
    if (raceSelect.dataset.previousRace && !raceSelect.value) {
      raceSelect.value = raceSelect.dataset.previousRace;
    }
    updateRaceDescription();
  }
}
window.updateExtraClassCreationUI = updateExtraClassCreationUI;

// Обновление описания класса
function updateClassDescription() {
  var classSelect = document.getElementById('cc_class');
  var descBox = document.getElementById('cc_classDescBox');
  if (!classSelect || !descBox) return;

  var val = classSelect.value;
  var classNameOnly = val.split(' ')[0];

  var selectedClass = null;
  for (var i = 0; i < DND_CLASSES_LIST.length; i++) {
    if (DND_CLASSES_LIST[i].name === classNameOnly) {
      selectedClass = DND_CLASSES_LIST[i];
      break;
    }
  }

  if (selectedClass) {
    descBox.innerHTML = '<strong>' + selectedClass.name + '</strong> (Кость хитов: d' + selectedClass.hitDie + ')<br>' + selectedClass.desc;
  } else {
    descBox.innerHTML = '<span style="color: #777;">Выберите класс для просмотра информации.</span>';
  }

  renderCreationSubclassPicker(classNameOnly);
}

/**
 * ДОБАВЛЕНО (поддержка подклассов): некоторые классы выбирают подкласс уже
 * на 1 уровне (Жрец — домен, Чародей — происхождение, Колдун — покровитель).
 * Если выбранный на экране создания класс — один из них, рисуем прямо здесь
 * выпадающий список подклассов (id="cc_subclass"). Для остальных классов
 * подкласс будет предложено выбрать позже, при повышении уровня — см.
 * classes/level_up.js.
 * @param {string} classNameOnly - "чистое" название класса без уровня
 */
function renderCreationSubclassPicker(classNameOnly) {
  var descBox = document.getElementById('cc_classDescBox');
  if (!descBox || !descBox.parentNode) return;

  var existing = document.getElementById('cc_subclassWrap');
  if (existing) existing.remove();

  if (typeof window.getAvailableSubclasses !== 'function') return;
  var options = window.getAvailableSubclasses(classNameOnly);
  // Показываем сразу на создании только те подклассы, что открываются на 1 уровне
  var lvl1Options = options.filter(function(o) { return (o.pickLevel || 1) <= 1; });
  if (lvl1Options.length === 0) return;

  var wrap = document.createElement('div');
  wrap.id = 'cc_subclassWrap';
  wrap.style.marginTop = '8px';

  var optsHtml = '<option value="">-- Выбрать подкласс сейчас (можно позже) --</option>';
  lvl1Options.forEach(function(o) {
    optsHtml += '<option value="' + o.name + '">' + o.name + ' (' + o.source + ')</option>';
  });

  wrap.innerHTML = '<label style="font-size:0.85em; color:#d4af37; display:block; margin-bottom:4px;">' +
    'Подкласс (' + classNameOnly + '):</label>' +
    '<select id="cc_subclass" style="width:100%; padding:8px; background:#1a1a1a; color:#fff; border:1px solid #444; border-radius:4px;">' +
    optsHtml + '</select>';

  descBox.parentNode.insertBefore(wrap, descBox.nextSibling);
}

function renderPointBuyRows() {
  var container = document.getElementById('cc_statsContainer');
  if (!container) return;
  
  var statNames = {
    str: 'Сила (СИЛ)',
    dex: 'Ловкость (ЛОВ)',
    con: 'Телосложение (ТЕЛ)',
    int: 'Интеллект (ИНТ)',
    wis: 'Мудрость (МУД)',
    cha: 'Харизма (ХАР)'
  };

  var html = '';
  for (var key in BG3_POINT_BUY.stats) {
    var val = BG3_POINT_BUY.stats[key];
    var mod = Math.floor((val - 10) / 2);
    var modStr = mod >= 0 ? '+' + mod : mod;

    html += `
      <div style="display: flex; align-items: center; justify-content: space-between; background: #2a2a2a; padding: 6px 12px; border-radius: 4px;">
        <span style="font-weight:bold; font-size: 14px;">${statNames[key]}</span>
        <div style="display: flex; align-items: center; gap: 10px;">
          <button type="button" onclick="changePointBuyStat('${key}', -1)" style="width:32px; height:32px; background:#444; color:#fff; border:none; font-weight:bold; cursor:pointer; border-radius:4px;">-</button>
          <span id="cc_val_${key}" style="width: 25px; text-align: center; font-size: 16px; font-weight:bold;">${val}</span>
          <button type="button" onclick="changePointBuyStat('${key}', 1)" style="width:32px; height:32px; background:#444; color:#fff; border:none; font-weight:bold; cursor:pointer; border-radius:4px;">+</button>
          <span style="width: 45px; text-align: right; color: #aaa; font-size: 13px;">(${modStr})</span>
        </div>
      </div>
    `;
  }
  container.innerHTML = html;
}

window.changePointBuyStat = function(statKey, delta) {
  var currentVal = BG3_POINT_BUY.stats[statKey];
  var newVal = currentVal + delta;

  if (newVal < 8 || newVal > 15) return;

  var currentSpent = calculateTotalPointsSpent();
  var pointCostDiff = BG3_POINT_BUY.costs[newVal] - BG3_POINT_BUY.costs[currentVal];

  if (delta > 0 && (currentSpent + pointCostDiff > BG3_POINT_BUY.maxPoints)) {
    alert('Недостаточно очков характеристик (максимум 27)!');
    return;
  }

  BG3_POINT_BUY.stats[statKey] = newVal;
  updatePointBuyUI();
};

function calculateTotalPointsSpent() {
  var spent = 0;
  for (var key in BG3_POINT_BUY.stats) {
    spent += BG3_POINT_BUY.costs[BG3_POINT_BUY.stats[key]];
  }
  return spent;
}

function updatePointBuyUI() {
  var spent = calculateTotalPointsSpent();
  var left = BG3_POINT_BUY.maxPoints - spent;
  
  var pointsLeftEl = document.getElementById('cc_pointsLeft');
  if (pointsLeftEl) {
    pointsLeftEl.innerText = left;
    pointsLeftEl.style.color = left === 0 ? '#fa4' : '#4f4';
  }

  for (var key in BG3_POINT_BUY.stats) {
    var valEl = document.getElementById('cc_val_' + key);
    if (valEl) {
      valEl.innerText = BG3_POINT_BUY.stats[key];
    }
  }
}

// Сохранение нового персонажа с автоматическим парсингом предыстории и расовых языков
window.saveNewCreatedCharacter = function() {
  var nameInput = document.getElementById('cc_name');
  var name = nameInput ? nameInput.value.trim() : '';
  if (!name) {
    alert('Пожалуйста, введите имя персонажа!');
    return;
  }

  var ageEl = document.getElementById('cc_age');
  var age = ageEl ? parseInt(ageEl.value) || 0 : 0;

  var className = document.getElementById('cc_class').value;
  
  var bgSelect = document.getElementById('cc_background');
  var backgroundName = bgSelect ? bgSelect.value : '';

  var raceId = document.getElementById('cc_race').value;

  var finalStats = {
    str: BG3_POINT_BUY.stats.str,
    dex: BG3_POINT_BUY.stats.dex,
    con: BG3_POINT_BUY.stats.con,
    int: BG3_POINT_BUY.stats.int,
    wis: BG3_POINT_BUY.stats.wis,
    cha: BG3_POINT_BUY.stats.cha
  };

  var raceName = '';
  var baseAc = 10;
  var selectedRace = null;
  var isSwarmExtra = className.split(' ')[0] === 'Рой';
  var isParasiteExtra = className.split(' ')[0] === 'Паразит';

  // Рой полностью заменяет обычную расу.
  if (isSwarmExtra) {
    raceId = '';
    raceName = 'Рой';
    baseAc = 10 + Math.floor((finalStats.dex - 10) / 2);
  }

  if (!isSwarmExtra && raceId && typeof getAllRaces === 'function') {
    var allRaces = getAllRaces();
    for (var i = 0; i < allRaces.length; i++) {
      if (allRaces[i].id === raceId) {
        selectedRace = allRaces[i];
        break;
      }
    }

    if (selectedRace) {
      raceName = selectedRace.name || '';
      
      if (selectedRace.bonuses) {
        for (var stat in selectedRace.bonuses) {
          // Для Паразита бонусы хозяина применяются только к физике.
          // Интеллект/Мудрость/Харизма принадлежат самому Паразиту и
          // должны сохраняться при последующей смене тела.
          if (finalStats[stat] !== undefined &&
              (!isParasiteExtra || stat === 'str' || stat === 'dex' || stat === 'con')) {
            finalStats[stat] += selectedRace.bonuses[stat];
          }
        }
      }

      if (selectedRace.baseAc !== undefined) {
        baseAc = selectedRace.baseAc;
      } else if (selectedRace.baseAcFormula === 'lizardfolk') {
        var dexMod = Math.floor((finalStats.dex - 10) / 2);
        baseAc = 13 + dexMod;
      } else if (selectedRace.baseAcFormula === 'loxodon') {
        var conMod = Math.floor((finalStats.con - 10) / 2);
        baseAc = 12 + conMod;
      }
    }
  }

  var conModFinal = Math.floor((finalStats.con - 10) / 2);
  // Extra-класс Рой использует d8 уже на 1 уровне; обычные классы
  // сохраняют существующую стартовую формулу.
  var maxHp = isSwarmExtra
    ? Math.max(1, 8 + conModFinal)
    : (isParasiteExtra ? Math.max(1, 8 + conModFinal) : (10 + conModFinal));

  // Ищем выбранную предысторию
  var backgroundsList = [];
  if (typeof getAllBackgrounds === 'function') {
    backgroundsList = getAllBackgrounds();
  } else if (typeof dndBackgrounds !== 'undefined') {
    backgroundsList = dndBackgrounds;
  } else if (typeof window.dndBackgrounds !== 'undefined') {
    backgroundsList = window.dndBackgrounds;
  }

  var selectedBg = null;
  for (var j = 0; j < backgroundsList.length; j++) {
    var b = backgroundsList[j];
    if (b.nameRu === backgroundName || b.name === backgroundName) {
      selectedBg = b;
      break;
    }
  }

  var initialSkillsData = {};
  var initialProficiencies = [];

  // --- 1. ПАРСИНГ РАСОВЫХ ЯЗЫКОВ ---
  if (selectedRace && Array.isArray(selectedRace.languages) && typeof PROFICIENCIES_DB !== 'undefined') {
    selectedRace.languages.forEach(function(langStr) {
      var lowerLang = langStr.toLowerCase().trim();
      if (lowerLang.includes('на выбор') || lowerLang.includes('все')) {
        return;
      }
      
      // Ищем точное или частичное совпадение в PROFICIENCIES_DB среди категории «Языки»
      for (var p = 0; p < PROFICIENCIES_DB.length; p++) {
        var dbItem = PROFICIENCIES_DB[p];
        if (dbItem.category === 'Языки') {
          var dbNameLower = dbItem.name.toLowerCase().trim();
          // Проверяем прямое вхождение или совпадение по ключевым словам
          if (dbNameLower.indexOf(lowerLang) !== -1 || lowerLang.indexOf(dbNameLower) !== -1) {
            if (!initialProficiencies.some(function(ip) { return ip.id === dbItem.id; })) {
              initialProficiencies.push(Object.assign({}, dbItem));
            }
            break;
          }
        }
      }
    });
  }

  if (selectedBg) {
    // 2. Навыки
    if (Array.isArray(selectedBg.skills)) {
      selectedBg.skills.forEach(function(skillStr) {
        if (!skillStr.toLowerCase().includes('выбирается')) {
          var cleanName = skillStr.split('(')[0].trim().toLowerCase();
          var skillId = (typeof SKILL_NAME_TO_ID_MAP !== 'undefined') ? SKILL_NAME_TO_ID_MAP[cleanName] : null;
          
          if (!skillId && typeof SKILLS_CONFIG !== 'undefined') {
            for (var sIdx = 0; sIdx < SKILLS_CONFIG.length; sIdx++) {
              if (SKILLS_CONFIG[sIdx].name.toLowerCase().indexOf(cleanName) !== -1) {
                skillId = SKILLS_CONFIG[sIdx].id;
                break;
              }
            }
          }

          if (skillId) {
            initialSkillsData[skillId] = 1;
          }
        }
      });
    }

    // 3. Инструменты (интеграция с PROFICIENCIES_DB включая «на выбор»)
    if (Array.isArray(selectedBg.toolProficiencies) && typeof PROFICIENCIES_DB !== 'undefined') {
      selectedBg.toolProficiencies.forEach(function(toolStr) {
        var lowerTool = toolStr.toLowerCase();
        
        if (lowerTool.includes('ремесленнические инструменты') || lowerTool.includes('инструмент ремесленника')) {
          PROFICIENCIES_DB.forEach(function(p) {
            if (p.id.startsWith('p_tool_') && p.id !== 'p_tool_thief' && p.id !== 'p_tool_poisoner' && p.id !== 'p_tool_artisans' && p.id !== 'p_tool_musicians') {
              if (!initialProficiencies.some(function(ip) { return ip.id === p.id; })) {
                initialProficiencies.push(Object.assign({}, p));
              }
            }
          });
        } else if (lowerTool.includes('музыкальный инструмент')) {
          PROFICIENCIES_DB.forEach(function(p) {
            if (p.id.startsWith('p_instr_') && p.id !== 'p_tool_musicians') {
              if (!initialProficiencies.some(function(ip) { return ip.id === p.id; })) {
                initialProficiencies.push(Object.assign({}, p));
              }
            }
          });
        } else if (lowerTool.includes('игровой набор')) {
          var gameTool = PROFICIENCIES_DB.find(function(p) { return p.id === 'p_game_set'; });
          if (gameTool && !initialProficiencies.some(function(ip) { return ip.id === gameTool.id; })) {
            initialProficiencies.push(Object.assign({}, gameTool));
          }
        } else {
          var cleanTool = toolStr.toLowerCase();
          for (var p = 0; p < PROFICIENCIES_DB.length; p++) {
            var dbItem = PROFICIENCIES_DB[p];
            if (dbItem.name.toLowerCase().indexOf(cleanTool) !== -1 || cleanTool.indexOf(dbItem.name.toLowerCase()) !== -1) {
              var exists = initialProficiencies.some(function(ip) { return ip.id === dbItem.id; });
              if (!exists) {
                initialProficiencies.push(Object.assign({}, dbItem));
              }
              break;
            }
          }
        }
      });
    }

    // 4. Языки из предыстории
    var langCount = selectedBg.languages || 0;
    if (langCount > 0 && typeof PROFICIENCIES_DB !== 'undefined') {
      var addedLangs = 0;
      for (var l = 0; l < PROFICIENCIES_DB.length; l++) {
        if (PROFICIENCIES_DB[l].category === 'Языки') {
          var lItem = PROFICIENCIES_DB[l];
          var existsL = initialProficiencies.some(function(ip) { return ip.id === lItem.id; });
          if (!existsL) {
            initialProficiencies.push(Object.assign({}, lItem));
            addedLangs++;
            if (addedLangs >= langCount) break;
          }
        }
      }
    }
  }

  var newId = 'char_' + Date.now();
  var startingProfession = document.getElementById('cc_profession') ? document.getElementById('cc_profession').value : '';
    var newChar = {
    id: newId,
    name: name,
    age: age,
    class: className,
    className: className,
    // ДОБАВЛЕНО (мультикласс/подклассы): массив классов персонажа с самого
    // создания, а не только когда его лениво создаёт spells.js/level_up.js.
    // subclass заполнится ниже, если на 1 уровне класс уже даёт его выбор
    // (см. renderCreationSubclassPicker/#cc_subclass выше).
    classes: [{
      name: className.split(' ')[0],
      level: 1,
      subclass: (function() {
        var sel = document.getElementById('cc_subclass');
        return (sel && sel.value) ? sel.value : null;
      })()
    }],
    level: 1, // Явно фиксируем 1 уровень при создании
    background: backgroundName,
    raceId: raceId,
    raceName: raceName,
    baseAC: baseAc,
    isExtraClass: isSwarmExtra || isParasiteExtra,
    extraClassType: isSwarmExtra ? 'swarm' : (isParasiteExtra ? 'parasite' : null),
    replacesRace: isSwarmExtra || isParasiteExtra,
    multiclassAllowed: !(isSwarmExtra || isParasiteExtra),
    ac: String(baseAc),
    // Скорость теперь берётся из выбранной расы (races.js -> selectedRace.speed),
    // а не захардкожена как раньше. Если раса не выбрана — используем 30 футов по умолчанию.
    speed: ((selectedRace && selectedRace.speed) ? selectedRace.speed : '30 футов'),
    hpMax: maxHp > 1 ? maxHp : 1,
    hpCurrent: maxHp > 1 ? maxHp : 1,
    hpTemp: '',
    hitDice: '1d' + (DND_CLASSES_LIST.find(c => c.name === className.split(' ')[0])?.hitDie || 10),
    profBonus: 2,
    spellStat: 'int',
    stats: {
      str: finalStats.str,
      dex: finalStats.dex,
      con: finalStats.con,
      int: finalStats.int,
      wis: finalStats.wis,
      cha: finalStats.cha
    },
    savesData: {},
    skillsData: initialSkillsData,
    proficiencies: initialProficiencies,
    activeConditions: {},
    weaponsData: [],
    spellSlotsData: { 1: {max: 0, used: 0}, 2: {max: 0, used: 0}, 3: {max: 0, used: 0}, 4: {max: 0, used: 0}, 5: {max: 0, used: 0}, 6: {max: 0, used: 0}, 7: {max: 0, used: 0}, 8: {max: 0, used: 0}, 9: {max: 0, used: 0} },
    spellsData: [],
    folders: [
      { id: 'f_inv_' + Date.now(), name: '📦 Инвентарь', notes: [] },
      { id: 'f_quest_' + Date.now(), name: '📜 Квесты', notes: [] }
    ],
    library: []
  };

  if (isSwarmExtra && window.SWARM_EXTRA && typeof window.SWARM_EXTRA.normalizeCharacter === 'function') {
    window.SWARM_EXTRA.normalizeCharacter(newChar);
    newChar.swarm.currentHP = newChar.hpCurrent;
    newChar.swarm.maxHP = newChar.hpMax;
  }

  if (isParasiteExtra && window.PARASITE_EXTRA && typeof window.PARASITE_EXTRA.normalizeCharacter === 'function') {
    window.PARASITE_EXTRA.normalizeCharacter(newChar);
    // Начальный хозяин строится из выбранной расы, но его физика и тело
    // отделены от разума Паразита.
    var parasiteHostTarget = {
      id: 'initial_host_' + newId,
      name: raceName || 'Первичный хозяин',
      creatureType: (selectedRace && selectedRace.creatureType) || 'Гуманоид',
      size: (selectedRace && selectedRace.size) || 'Средний',
      stats: {
        str: finalStats.str,
        dex: finalStats.dex,
        con: finalStats.con,
        int: finalStats.int,
        wis: finalStats.wis,
        cha: finalStats.cha
      },
      hpMax: newChar.hpMax,
      hpCurrent: newChar.hpCurrent,
      ac: baseAc,
      speed: newChar.speed
    };
    window.PARASITE_EXTRA.bindHost(newChar, parasiteHostTarget);
    newChar.raceName = raceName || 'Хозяин';
    newChar.hostName = raceName || 'Первичный хозяин';
  }

  // Авторское ХБ: профессия необязательна; при выборе создаём навык с 1 уровня.
  if (window.DND_CRAFT_PROFESSION_PROGRESS && typeof window.DND_CRAFT_PROFESSION_PROGRESS.initCreatedCharacter === 'function') {
    window.DND_CRAFT_PROFESSION_PROGRESS.initCreatedCharacter(newChar, startingProfession);
  } else {
    newChar.craftingProfessions = {};
  }

  // Применяем стартовый движок прогрессии для 1-го уровня (фичи, ресурсы класса)
  if (typeof applyClassProgression === 'function') {
    applyClassProgression(newChar, className.split(' ')[0], 1);
  }


  if (typeof allCharacters !== 'undefined') {
    allCharacters.push(newChar);
  } else {
    window.allCharacters = [newChar];
  }

  if (typeof saveAllCharacters === 'function') {
    saveAllCharacters();
  } else {
    localStorage.setItem('dnd_multi_characters_v2', JSON.stringify(allCharacters));
  }

  var creationScreen = document.getElementById('characterCreationScreen');
  if (creationScreen) creationScreen.style.display = 'none';

  if (typeof openCharacter === 'function') {
    openCharacter(newId);
  } else {
    location.reload();
  }
};

window.closeCharacterCreationModal = function() {
  if (typeof showCharacterSelect === 'function') {
    showCharacterSelect();
  } else {
    var creationScreen = document.getElementById('characterCreationScreen');
    if (creationScreen) creationScreen.style.display = 'none';
  }
};
