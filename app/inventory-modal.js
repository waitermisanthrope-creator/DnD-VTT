// --- INVENTORY-MODAL.JS (FIXED) ---

const DND_DAMAGE_TYPES = [
  'Кислота', 'Дробящий', 'Огонь', 'Силовой', 'Электричество', 
  'Холод', 'Яд', 'Некротический', 'Колющий', 'Психический', 
  'Излучение', 'Рубящий', 'Звук'
];

const DND_SKILLS_LIST = [
  { id: 'acrobatics', name: 'Акробатика (Лов)' },
  { id: 'animal_handling', name: 'Уход за животными (Муд)' },
  { id: 'arcana', name: 'Магия / Алкана (Инт)' },
  { id: 'athletics', name: 'Атлетика (Сил)' },
  { id: 'deception', name: 'Обман (Хар)' },
  { id: 'history', name: 'История (Инт)' },
  { id: 'insight', name: 'Проницательность (Муд)' },
  { id: 'intimidation', name: 'Запугивание (Хар)' },
  { id: 'investigation', name: 'Расследование (Инт)' },
  { id: 'medicine', name: 'Медицина (Муд)' },
  { id: 'nature', name: 'Природа (Инт)' },
  { id: 'perception', name: 'Внимательность (Муд)' },
  { id: 'performance', name: 'Выступление (Хар)' },
  { id: 'persuasion', name: 'Убеждение (Хар)' },
  { id: 'religion', name: 'Религия (Инт)' },
  { id: 'sleight_of_hand', name: 'Ловкость рук (Лов)' },
  { id: 'stealth', name: 'Скрытность (Лов)' },
  { id: 'survival', name: 'Выживание (Муд)' }
];

const DND_WEAPON_CATEGORIES = [
  'Простое оружие', 'Воинское оружие', 
  'Огнестрельное', 'Экзотическое', 
  'Дальнобойное (луки/арбалеты)'
];

const DND_WEAPON_PROPERTIES = [
  'Легкое', 'Фехтовальное', 'Двуручное', 'Тяжелое', 
  'Дальнобойное', 'Досягаемость', 'Универсальное', 
  'Метательное', 'Специальное', 'Боеприпас', 'Перезарядка'
];

let selectedWeaponProperties = [];
let selectedWeaponDice = 'd6';
let selectedArmorCategory = 'Лёгкий доспех';
let selectedWeaponCategoryType = 'Простое оружие';

function openCustomItemModalForCurrentTab() {
  openCustomItemModal(typeof currentInventoryCategory !== 'undefined' ? currentInventoryCategory : 'weapons');
}

function openAddItemModal(category) {
  if (typeof currentInventoryCategory !== 'undefined') {
    currentInventoryCategory = category || currentInventoryCategory;
  }
  const activeCategory = typeof currentInventoryCategory !== 'undefined' ? currentInventoryCategory : category;
  
  const modal = document.getElementById('addItemModal');
  const container = document.getElementById('addItemPresetsContainer');
  if (!modal || !container) return;

  container.innerHTML = '';

  const customBtn = document.createElement('button');
  customBtn.type = 'button';
  customBtn.className = 'btn-action';
  customBtn.style.cssText = 'background: #4CAF50; width: 100%; margin-bottom: 15px; padding: 12px; font-weight: bold; cursor: pointer; border-radius: 4px; border: none; color: #fff; font-size: 1em; z-index: 99999; position: relative; pointer-events: auto; touch-action: manipulation;';
  customBtn.textContent = '✨ Создать свой предмет вручную';
  
  let isActionProcessed = false;
  const triggerCustomCreation = (e) => {
    if (e) e.preventDefault();
    if (isActionProcessed) return;
    isActionProcessed = true;
    setTimeout(() => { isActionProcessed = false; }, 300);

    closeAddItemModal();
    setTimeout(() => {
      promptCustomItem(activeCategory);
    }, 80);
  };
  
  customBtn.addEventListener('click', triggerCustomCreation, { passive: false });
  customBtn.addEventListener('touchend', triggerCustomCreation, { passive: false });
  container.appendChild(customBtn);

  let presets = null;
  const cat = activeCategory.toLowerCase();

  const safeGet = (varName) => {
    try {
      if (typeof window !== 'undefined' && window[varName]) return window[varName];
      if (typeof eval(varName) !== 'undefined') return eval(varName);
    } catch (e) {}
    return null;
  };

  if (cat === 'weapons' || cat === 'weapon') {
    presets = safeGet('defaultWeapons') || safeGet('defaultweapons') || safeGet('WEAPONS_DB') || safeGet('weaponsDatabase') || safeGet('weapons');
  } else if (cat === 'armor' || cat === 'armors') {
    presets = safeGet('defaultArmors') || safeGet('defaultarmors') || safeGet('defaultArmor') || safeGet('ARMORS_DB') || safeGet('armorsDatabase') || safeGet('armors');
  } else if (cat === 'consumables' || cat === 'consumable') {
    presets = safeGet('defaultConsumables') || safeGet('defaultconsumables') || safeGet('CONSUMABLES_DB') || safeGet('consumablesDatabase') || safeGet('consumables');
  } else if (cat === 'materials' || cat === 'material') {
    presets = safeGet('defaultMaterials') || safeGet('defaultmaterials') || safeGet('MATERIALS_DB') || safeGet('materialsDatabase') || safeGet('materials');
  } else if (cat === 'junk') {
    presets = safeGet('defaultJunk') || safeGet('defaultjunk') || safeGet('JUNK_DB') || safeGet('junkDatabase') || safeGet('junk');
  }

  if (presets) {
    if (Array.isArray(presets)) {
      presets.forEach(item => {
        if (item) renderPresetRow(container, activeCategory, item.name || 'Предмет', item);
      });
    } else if (typeof presets === 'object') {
      let isGrouped = false;
      for (let key in presets) {
        if (Array.isArray(presets[key])) {
          isGrouped = true;
          break;
        }
      }

      if (isGrouped) {
        for (let groupName in presets) {
          const groupTitle = document.createElement('h4');
          groupTitle.style.cssText = 'color: #ff9800; margin: 10px 0 5px 0; border-bottom: 1px solid #444; padding-bottom: 3px;';
          groupTitle.textContent = groupName;
          container.appendChild(groupTitle);

          if (Array.isArray(presets[groupName])) {
            presets[groupName].forEach(item => {
              if (item) renderPresetRow(container, activeCategory, item.name || 'Предмет', item);
            });
          }
        }
      } else {
        for (let key in presets) {
          const item = presets[key];
          const name = (item && item.name) ? item.name : key;
          renderPresetRow(container, activeCategory, name, item);
        }
      }
    }
  }

  if (container.children.length === 1) {
    const emptyMsg = document.createElement('div');
    emptyMsg.style.cssText = 'color: #777; font-size: 0.9em; text-align: center; padding: 10px;';
    emptyMsg.textContent = 'Справочник пуст или не подключен';
    container.appendChild(emptyMsg);
  }

  modal.style.display = 'flex';
  modal.style.zIndex = '999999';
  modal.style.position = 'fixed';
  modal.style.top = '0';
  modal.style.left = '0';
  modal.style.width = '100%';
  modal.style.height = '100%';
  
  document.body.classList.add('modal-open');
  if (typeof lockSwipers === 'function') lockSwipers();
}

function renderPresetRow(container, category, displayName, itemData) {
  const row = document.createElement('div');
  row.style.cssText = 'display: flex; justify-content: space-between; align-items: center; background: #2a2a2a; padding: 8px; margin-bottom: 6px; border-radius: 4px;';
  
  const nameSpan = document.createElement('span');
  nameSpan.textContent = displayName;
  nameSpan.style.fontSize = '0.9em';
  nameSpan.style.flex = '1';
  nameSpan.style.marginRight = '8px';
  nameSpan.style.color = '#fff';

  const addBtn = document.createElement('button');
  addBtn.type = 'button';
  addBtn.className = 'btn-action';
  addBtn.style.cssText = 'background: #2196F3; padding: 8px 14px; font-size: 0.85em; cursor: pointer; border-radius: 4px; border: none; color: #fff; font-weight: bold; pointer-events: auto; touch-action: manipulation;';
  addBtn.textContent = 'Добавить';
  
  let isRowActionProcessed = false;
  const handleAdd = (e) => {
    if (e) e.preventDefault();
    if (isRowActionProcessed) return;
    isRowActionProcessed = true;
    setTimeout(() => { isRowActionProcessed = false; }, 300);

    // Дополнительная защита по весу перед кликом
    const checkbox = document.getElementById('enable-weight-calc');
    if (checkbox && checkbox.checked && typeof window.getCurrentInventoryWeightData === 'function') {
      const { totalWeightKg, maxCapacityKg } = window.getCurrentInventoryWeightData();
      if (totalWeightKg >= maxCapacityKg) {
        alert('🚫 Перевес! Невозможно взять предмет: инвентарь переполнен.');
        return;
      }
      if (itemData && itemData.weight) {
        let addedWeight = window.parseWeightToKg(itemData.weight);
        if (totalWeightKg + addedWeight > maxCapacityKg) {
          alert('🚫 Невозможно взять предмет: эта вещь создаст перевес!');
          return;
        }
      }
    }

    if (typeof addItemToInventory === 'function') {
      const catLower = category.toLowerCase();
      let finalName = displayName;
      let finalData = itemData ? JSON.parse(JSON.stringify(itemData)) : {};

      if (catLower === 'weapons' || catLower === 'weapon' || catLower === 'armor' || catLower === 'armors') {
        const uniqueSuffix = Math.floor(Math.random() * 90000) + 10000;
        finalName = `${displayName} #${uniqueSuffix}`;
      }

      addItemToInventory(category, finalName, 1, finalData);
    }
    closeAddItemModal();
  };
  
  addBtn.addEventListener('click', handleAdd, { passive: false });
  addBtn.addEventListener('touchend', handleAdd, { passive: false });

  row.appendChild(nameSpan);
  row.appendChild(addBtn);
  container.appendChild(row);
}

function closeAddItemModal() {
  const modal = document.getElementById('addItemModal');
  if (modal) modal.style.display = 'none';
  document.body.classList.remove('modal-open');
  if (typeof unlockSwipers === 'function') unlockSwipers();
}

function openCustomItemModal(category) {
  if (typeof currentInventoryCategory !== 'undefined') {
    currentInventoryCategory = category || currentInventoryCategory;
  }
  const activeCategory = typeof currentInventoryCategory !== 'undefined' ? currentInventoryCategory : category;

  const modal = document.getElementById('customItemModal');
  const titleEl = document.getElementById('customItemModalTitle');
  const weaponFields = document.getElementById('ci_weaponFields');
  const armorFields = document.getElementById('ci_armorFields');
  
  if (!modal) return;

  const nameInp = document.getElementById('ci_name');
  if (nameInp) nameInp.value = '';
  const weightInp = document.getElementById('ci_weightKg');
  if (weightInp) weightInp.value = '';
  const weightRes = document.getElementById('ci_weightLbResult');
  if (weightRes) weightRes.textContent = '0 фунтов';
  const costInp = document.getElementById('ci_cost');
  if (costInp) costInp.value = '';
  const descInp = document.getElementById('ci_description');
  if (descInp) descInp.value = '';
  const diceCountInp = document.getElementById('ci_diceCount');
  if (diceCountInp) diceCountInp.value = '1';
  const acBaseInp = document.getElementById('ci_acBase');
  if (acBaseInp) acBaseInp.value = '10';

  const extraDmgContainer = document.getElementById('ci_extraDamagesContainer');
  if (extraDmgContainer) extraDmgContainer.innerHTML = '';

  const defensesContainer = document.getElementById('ci_defensesContainer');
  if (defensesContainer) defensesContainer.innerHTML = '';

  document.querySelectorAll('.ci-bonus-input').forEach(inp => inp.value = 0);
  document.querySelectorAll('.ci-skill-bonus-input').forEach(inp => inp.value = 0);

  selectedWeaponProperties = [];
  selectedWeaponDice = 'd6';
  selectedArmorCategory = 'Лёгкий доспех';
  selectedWeaponCategoryType = 'Простое оружие';

  if (weaponFields) weaponFields.style.display = 'none';
  if (armorFields) armorFields.style.display = 'none';

  if (activeCategory === 'weapons' || activeCategory === 'weapon') {
    if (titleEl) titleEl.textContent = '⚔️ Создание оружия';
    if (weaponFields) weaponFields.style.display = 'flex';
    renderWeaponPropertyButtons();
    renderDiceButtons();
    addCustomWeaponExtraDamageRow('Психический', 3);
  } else if (activeCategory === 'armor' || activeCategory === 'armors') {
    if (titleEl) titleEl.textContent = '🛡️ Создание доспеха / защиты';
    if (armorFields) armorFields.style.display = 'flex';
    renderArmorCategoryButtons();
    updateCustomAcFormulaPreview();
    addCustomDefenseRow('Сопротивление', 'Психический');
  } else {
    if (titleEl) titleEl.textContent = `📦 Создание предмета (${activeCategory})`;
  }

  renderSkillsBonusesInModal();

  modal.style.display = 'flex';
  modal.style.zIndex = '999999';
  modal.style.position = 'fixed';
  modal.style.top = '0';
  modal.style.left = '0';
  modal.style.width = '100%';
  modal.style.height = '100%';

  document.body.classList.add('modal-open');
  if (typeof lockSwipers === 'function') lockSwipers();
}

function closeCustomItemModal() {
  const modal = document.getElementById('customItemModal');
  if (modal) modal.style.display = 'none';
  document.body.classList.remove('modal-open');
  if (typeof unlockSwipers === 'function') unlockSwipers();
}

function addCustomWeaponExtraDamageRow(defaultType = 'Психический', defaultValue = 3) {
  let container = document.getElementById('ci_extraDamagesContainer');
  if (!container) {
    const weaponFields = document.getElementById('ci_weaponFields');
    if (!weaponFields) return;
    
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'margin-top: 10px; border-top: 1px solid #444; padding-top: 8px;';
    wrapper.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin: 6px 0 4px 0;">
        <label style="font-size: 0.85em; color: #ff9800;">Дополнительные типы урона:</label>
        <button type="button" id="ci_addExtraDmgBtn" class="btn-action" style="background: #4CAF50; padding: 4px 10px; font-size: 0.85em; cursor: pointer; border-radius: 3px; border: none; color: #fff; pointer-events: auto; touch-action: manipulation;">+</button>
      </div>
      <div id="ci_extraDamagesContainer"></div>
    `;
    weaponFields.appendChild(wrapper);
    
    const addBtn = document.getElementById('ci_addExtraDmgBtn');
    const handleAddClick = (e) => {
      if (e) e.preventDefault();
      addCustomWeaponExtraDamageRow('Психический', 1);
    };
    addBtn.addEventListener('click', handleAddClick);
    addBtn.addEventListener('touchend', handleAddClick);

    container = document.getElementById('ci_extraDamagesContainer');
  }

  const row = document.createElement('div');
  row.style.cssText = 'display: flex; gap: 6px; align-items: center; margin-bottom: 6px; background: #222; padding: 6px; border-radius: 4px;';

  const valInput = document.createElement('input');
  valInput.type = 'number';
  valInput.value = defaultValue;
  valInput.className = 'ci-extra-dmg-val';
  valInput.style.cssText = 'width: 55px; padding: 6px; background: #1a1a1a; color: #fff; border: 1px solid #444; border-radius: 4px; text-align: center;';

  const selectType = document.createElement('select');
  selectType.className = 'ci-extra-dmg-type';
  selectType.style.cssText = 'flex: 1; padding: 6px; background: #1a1a1a; color: #fff; border: 1px solid #444; border-radius: 4px;';
  
  DND_DAMAGE_TYPES.forEach(dt => {
    const opt = document.createElement('option');
    opt.value = dt;
    opt.textContent = dt;
    if (dt === defaultType) opt.selected = true;
    selectType.appendChild(opt);
  });

  const delBtn = document.createElement('button');
  delBtn.type = 'button';
  delBtn.className = 'btn-action';
  delBtn.style.cssText = 'background: #e53935; padding: 6px 10px; font-size: 0.8em; cursor: pointer; border-radius: 3px; border: none; color: #fff; pointer-events: auto; touch-action: manipulation;';
  delBtn.textContent = '✕';
  
  const handleDel = (e) => {
    if (e) e.preventDefault();
    row.remove();
  };
  delBtn.addEventListener('click', handleDel);
  delBtn.addEventListener('touchend', handleDel);

  row.appendChild(valInput);
  row.appendChild(selectType);
  row.appendChild(delBtn);
  container.appendChild(row);
}

function addCustomDefenseRow(defaultMode = 'Сопротивление', defaultType = 'Психический') {
  let container = document.getElementById('ci_defensesContainer');
  if (!container) {
    const armorFields = document.getElementById('ci_armorFields');
    if (!armorFields) return;

    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'margin-top: 10px; border-top: 1px solid #444; padding-top: 8px;';
    wrapper.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin: 6px 0 4px 0;">
        <label style="font-size: 0.85em; color: #ff9800;">Сопротивления и неуязвимости:</label>
        <button type="button" id="ci_addDefenseBtn" class="btn-action" style="background: #4CAF50; padding: 4px 10px; font-size: 0.85em; cursor: pointer; border-radius: 3px; border: none; color: #fff; pointer-events: auto; touch-action: manipulation;">+</button>
      </div>
      <div id="ci_defensesContainer"></div>
    `;
    armorFields.appendChild(wrapper);

    const addBtn = document.getElementById('ci_addDefenseBtn');
    const handleAddClick = (e) => {
      if (e) e.preventDefault();
      addCustomDefenseRow('Сопротивление', 'Огонь');
    };
    addBtn.addEventListener('click', handleAddClick);
    addBtn.addEventListener('touchend', handleAddClick);

    container = document.getElementById('ci_defensesContainer');
  }

  const row = document.createElement('div');
  row.style.cssText = 'display: flex; gap: 6px; align-items: center; margin-bottom: 6px; background: #222; padding: 6px; border-radius: 4px;';

  const modeSelect = document.createElement('select');
  modeSelect.className = 'ci-defense-mode';
  modeSelect.style.cssText = 'width: 130px; padding: 6px; background: #1a1a1a; color: #fff; border: 1px solid #444; border-radius: 4px;';
  ['Сопротивление', 'Неуязвимость', 'Иммунитет', 'Уязвимость'].forEach(m => {
    const opt = document.createElement('option');
    opt.value = m;
    opt.textContent = m;
    if (m === defaultMode) opt.selected = true;
    modeSelect.appendChild(opt);
  });

  const typeSelect = document.createElement('select');
  typeSelect.className = 'ci-defense-type';
  typeSelect.style.cssText = 'flex: 1; padding: 6px; background: #1a1a1a; color: #fff; border: 1px solid #444; border-radius: 4px;';
  DND_DAMAGE_TYPES.forEach(dt => {
    const opt = document.createElement('option');
    opt.value = dt;
    opt.textContent = dt;
    if (dt === defaultType) opt.selected = true;
    typeSelect.appendChild(opt);
  });

  const delBtn = document.createElement('button');
  delBtn.type = 'button';
  delBtn.className = 'btn-action';
  delBtn.style.cssText = 'background: #e53935; padding: 6px 10px; font-size: 0.8em; cursor: pointer; border-radius: 3px; border: none; color: #fff; pointer-events: auto; touch-action: manipulation;';
  delBtn.textContent = '✕';
  
  const handleDel = (e) => {
    if (e) e.preventDefault();
    row.remove();
  };
  delBtn.addEventListener('click', handleDel);
  delBtn.addEventListener('touchend', handleDel);

  row.appendChild(modeSelect);
  row.appendChild(typeSelect);
  row.appendChild(delBtn);
  container.appendChild(row);
}

function renderWeaponPropertyButtons() {
  const container = document.getElementById('ci_weaponTypesButtons');
  if (!container) return;
  container.innerHTML = '';

  const catTitle = document.createElement('div');
  catTitle.style.cssText = 'font-size: 0.85em; color: #ff9800; margin-bottom: 4px; width: 100%;';
  catTitle.textContent = 'Тип / Категория оружия:';
  container.appendChild(catTitle);

  const catContainer = document.createElement('div');
  catContainer.style.cssText = 'display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 10px; width: 100%;';
  
  DND_WEAPON_CATEGORIES.forEach(cat => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn-action';
    const isSelected = selectedWeaponCategoryType === cat;
    btn.style.cssText = `padding: 6px 10px; font-size: 0.75em; font-weight: bold; background: ${isSelected ? '#2196F3' : '#333'}; color: #fff; border: 1px solid ${isSelected ? '#64b5f6' : '#555'}; border-radius: 4px; cursor: pointer; pointer-events: auto; touch-action: manipulation;`;
    btn.textContent = cat;
    
    const handleCatSelect = (e) => {
      if (e) e.preventDefault();
      selectedWeaponCategoryType = cat;
      renderWeaponPropertyButtons();
    };
    btn.addEventListener('click', handleCatSelect);
    btn.addEventListener('touchend', handleCatSelect);

    catContainer.appendChild(btn);
  });
  container.appendChild(catContainer);

  const propTitle = document.createElement('div');
  propTitle.style.cssText = 'font-size: 0.85em; color: #ff9800; margin-bottom: 4px; width: 100%;';
  propTitle.textContent = 'Свойства оружия:';
  container.appendChild(propTitle);

  const propContainer = document.createElement('div');
  propContainer.style.cssText = 'display: flex; flex-wrap: wrap; gap: 4px; width: 100%;';

  DND_WEAPON_PROPERTIES.forEach(prop => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn-action';
    const isChecked = selectedWeaponProperties.includes(prop);
    btn.style.cssText = `padding: 6px 10px; font-size: 0.8em; background: ${isChecked ? '#2196F3' : '#333'}; color: ${isChecked ? '#fff' : '#ccc'}; border: 1px solid #555; border-radius: 4px; cursor: pointer; pointer-events: auto; touch-action: manipulation;`;
    btn.textContent = prop;
    
    const handlePropToggle = (e) => {
      if (e) e.preventDefault();
      if (selectedWeaponProperties.includes(prop)) {
        selectedWeaponProperties = selectedWeaponProperties.filter(p => p !== prop);
      } else {
        selectedWeaponProperties.push(prop);
      }
      renderWeaponPropertyButtons();
    };
    btn.addEventListener('click', handlePropToggle);
    btn.addEventListener('touchend', handlePropToggle);

    propContainer.appendChild(btn);
  });
  container.appendChild(propContainer);
}

function renderArmorCategoryButtons() {
  const armorFields = document.getElementById('ci_armorFields');
  if (!armorFields) return;

  let btnContainer = document.getElementById('ci_armorCategoryButtons');
  if (!btnContainer) {
    btnContainer = document.createElement('div');
    btnContainer.id = 'ci_armorCategoryButtons';
    btnContainer.style.cssText = 'display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px;';
    
    const oldSelect = document.getElementById('ci_armorCategory');
    if (oldSelect) {
      oldSelect.style.display = 'none';
      oldSelect.parentNode.insertBefore(btnContainer, oldSelect);
    } else {
      armorFields.insertBefore(btnContainer, armorFields.firstChild);
    }
  }

  btnContainer.innerHTML = '';
  const armorCategories = ['Лёгкий доспех', 'Средний доспех', 'Тяжелый доспех', 'Щит', 'Шлем', 'Чудесный предмет (DMG)'];

  armorCategories.forEach(cat => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn-action';
    const isSelected = selectedArmorCategory === cat;
    btn.style.cssText = `flex: 1; min-width: 100px; padding: 8px; font-size: 0.8em; font-weight: bold; background: ${isSelected ? '#2196F3' : '#333'}; color: #fff; border: 1px solid ${isSelected ? '#64b5f6' : '#555'}; border-radius: 4px; cursor: pointer; pointer-events: auto; touch-action: manipulation;`;
    btn.textContent = cat;

    const handleArmorCatSelect = (e) => {
      if (e) e.preventDefault();
      selectedArmorCategory = cat;
      const selectEl = document.getElementById('ci_armorCategory');
      if (selectEl) selectEl.value = cat;
      renderArmorCategoryButtons();
    };
    btn.addEventListener('click', handleArmorCatSelect);
    btn.addEventListener('touchend', handleArmorCatSelect);

    btnContainer.appendChild(btn);
  });

  const selectEl = document.getElementById('ci_armorCategory');
  if (selectEl) selectEl.value = selectedArmorCategory;
}

function renderDiceButtons() {
  const container = document.getElementById('ci_diceButtons');
  if (!container) return;
  container.innerHTML = '';

  const dices = ['d4', 'd6', 'd8', 'd10', 'd12', 'd20'];
  dices.forEach(dice => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn-action';
    btn.style.cssText = `flex: 1; padding: 8px 4px; font-size: 0.85em; font-weight: bold; background: ${dice === selectedWeaponDice ? '#4CAF50' : '#2a2a2a'}; color: #fff; border: 1px solid #444; border-radius: 4px; cursor: pointer; pointer-events: auto; touch-action: manipulation;`;
    btn.textContent = dice;
    
    const handleDiceSelect = (e) => {
      if (e) e.preventDefault();
      selectedWeaponDice = dice;
      renderDiceButtons();
    };
    btn.addEventListener('click', handleDiceSelect);
    btn.addEventListener('touchend', handleDiceSelect);

    container.appendChild(btn);
  });
}

function renderSkillsBonusesInModal() {
  const container = document.getElementById('ci_skillsBonusesContainer');
  if (!container) return;
  container.innerHTML = '';

  DND_SKILLS_LIST.forEach(skill => {
    const row = document.createElement('div');
    row.style.cssText = 'display: flex; justify-content: space-between; align-items: center; padding: 4px 0;';
    
    const label = document.createElement('span');
    label.style.cssText = 'font-size: 0.8em; color: #ccc; flex: 1;';
    label.textContent = skill.name;

    const input = document.createElement('input');
    input.type = 'number';
    input.value = '0';
    input.className = 'ci-skill-bonus-input';
    input.setAttribute('data-skill', skill.id);
    input.style.cssText = 'width: 50px; padding: 4px; background: #222; color: #fff; border: 1px solid #444; text-align: center; border-radius: 3px; font-size: 0.85em;';

    row.appendChild(label);
    row.appendChild(input);
    container.appendChild(row);
  });
}

function calculateCustomItemLb() {
  const kgInput = document.getElementById('ci_weightKg');
  const resDiv = document.getElementById('ci_weightLbResult');
  if (!kgInput || !resDiv) return;

  const kg = parseFloat(kgInput.value);
  if (isNaN(kg) || kg <= 0) {
    resDiv.textContent = '0 фунтов';
    return;
  }
  const lbs = kg * 2.20462;
  resDiv.textContent = `${Math.round(lbs * 10) / 10} фунтов`;
}

function updateCustomAcFormulaPreview() {
  const select = document.getElementById('ci_acCalcBase');
  const preview = document.getElementById('ci_acFormulaPreview');
  if (!select || !preview) return;

  const val = select.value;
  if (val === '10 + ЛОВ') preview.textContent = 'Формула: 10 + модификатор Ловкости';
  else if (val === 'база + ЛОВ') preview.textContent = 'Формула: Базовое КД доспеха + полный модификатор Ловкости';
  else if (val === 'база + ЛОВ (макс 2)') preview.textContent = 'Формула: Базовое КД + модификатор Ловкости (максимум +2)';
  else if (val === 'чистая база') preview.textContent = 'Формула: Строго фиксированное базовое КД без модификаторов';
  else preview.textContent = 'Формула: Фиксированное значение КД';
}

function saveCustomItemModalData() {
  const nameInp = document.getElementById('ci_name');
  let name = nameInp ? nameInp.value.trim() : '';
  if (!name) {
    alert('Введите название предмета!');
    return;
  }

  const activeCat = typeof currentInventoryCategory !== 'undefined' ? currentInventoryCategory : 'weapons';
  const catLower = activeCat.toLowerCase();

  const weightInp = document.getElementById('ci_weightKg');
  const kg = weightInp ? parseFloat(weightInp.value) || 0 : 0;

  // Проверка перевеса при создании кастомного предмета
  const checkbox = document.getElementById('enable-weight-calc');
  if (checkbox && checkbox.checked && typeof window.getCurrentInventoryWeightData === 'function') {
    const { totalWeightKg, maxCapacityKg } = window.getCurrentInventoryWeightData();
    if (totalWeightKg >= maxCapacityKg) {
      alert('🚫 Перевес! Невозможно создать или взять предмет: инвентарь переполнен.');
      return;
    }
    if (totalWeightKg + kg > maxCapacityKg) {
      alert('🚫 Невозможно взять предмет: создаваемая вещь вызовет перевес!');
      return;
    }
  }

  if (catLower === 'weapons' || catLower === 'weapon' || catLower === 'armor' || catLower === 'armors') {
    const uniqueSuffix = Math.floor(Math.random() * 90000) + 10000;
    name = `${name} #${uniqueSuffix}`;
  }

  const weightStr = `${Math.round(kg * 2.20462 * 10) / 10} фунт${kg === 1 ? '' : 'ов'}`;
  
  const costInp = document.getElementById('ci_cost');
  const cost = costInp ? costInp.value.trim() : '';
  
  const descInp = document.getElementById('ci_description');
  const description = descInp ? descInp.value.trim() : '';

  let bonuses = {};
  document.querySelectorAll('.ci-bonus-input').forEach(inp => {
    let val = parseInt(inp.value) || 0;
    if (val !== 0) bonuses[inp.getAttribute('data-bonus')] = val;
  });

  document.querySelectorAll('.ci-skill-bonus-input').forEach(inp => {
    let val = parseInt(inp.value) || 0;
    if (val !== 0) bonuses[inp.getAttribute('data-skill')] = val;
  });

  let extraData = {
    weight: weightStr,
    cost: cost,
    description: description,
    bonuses: Object.keys(bonuses).length > 0 ? bonuses : undefined
  };

  if (catLower === 'weapons' || catLower === 'weapon') {
    const diceCountInp = document.getElementById('ci_diceCount');
    const diceCount = diceCountInp ? parseInt(diceCountInp.value) || 1 : 1;
    const damageStr = `${diceCount}${selectedWeaponDice}`;

    extraData.damage = damageStr;
    extraData.properties = [...selectedWeaponProperties];
    
    let finalPropsString = selectedWeaponProperties.length > 0 ? `, ${selectedWeaponProperties.join(', ')}` : '';
    extraData.category = `${selectedWeaponCategoryType}${finalPropsString}`;

    let extraDamages = [];
    document.querySelectorAll('#ci_extraDamagesContainer > div').forEach(row => {
      const val = parseInt(row.querySelector('.ci-extra-dmg-val').value) || 0;
      const type = row.querySelector('.ci-extra-dmg-type').value;
      if (val > 0) {
        extraDamages.push(`${val}${type}`);
      }
    });

    if (extraDamages.length > 0) {
      extraData.extraDamage = extraDamages.join(', ');
    }
  } else if (catLower === 'armor' || catLower === 'armors') {
    const acBaseInp = document.getElementById('ci_acBase');
    const acBase = acBaseInp ? parseInt(acBaseInp.value) || 10 : 10;
    const acCalcBaseSel = document.getElementById('ci_acCalcBase');
    const calcType = acCalcBaseSel ? acCalcBaseSel.value : '10 + ЛОВ';

    extraData.category = selectedArmorCategory;
    extraData.acBase = acBase;
    extraData.acFormula = calcType;

    let defenses = [];
    document.querySelectorAll('#ci_defensesContainer > div').forEach(row => {
      const mode = row.querySelector('.ci-defense-mode').value;
      const type = row.querySelector('.ci-defense-type').value;
      defenses.push(`${mode}:${type}`);
    });

    if (defenses.length > 0) {
      extraData.defenses = defenses;
    }
  }

  if (typeof addItemToInventory === 'function') {
    addItemToInventory(activeCat, name, 1, extraData);
  }
  closeCustomItemModal();
}

function promptCustomItem(category) {
  openCustomItemModal(category);
}
