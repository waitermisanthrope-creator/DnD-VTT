/**
 * Inventory.js — единый инвентарь персонажа и модальные окна.
 * Как работает: хранит категории предметов, объединяет одинаковые позиции,
 * управляет экипировкой, количеством и весом, а также рендерит удобные списки.
 * v43: добавлены поиск по названию/ID/тегам, фильтры по типу материала,
 * сортировка, быстрые фильтры и поддержка дробных количеств ресурсов.
 * v51: для изготовленных предметов показывает качество/состояние и добавляет ремонт
 * и необратимую разборку через DND_CRAFT_DISASSEMBLY_V51, не создавая отдельный инвентарь.
 * Основные переменные: currentInventoryCategory, currentCharacter.inventory,
 * category, item, count, materialId, craftMaterialId, inventorySearchState.
 */

let currentInventoryCategory = 'weapons';

document.addEventListener('DOMContentLoaded', () => {
  fixInventoryTabsLayout();

  const tabsContainer = document.querySelector('.inventory-tabs') || document.querySelector('.inv-tabs-container') || document.body;
  
  if (tabsContainer) {
    const handleTabClick = (e) => {
      const btn = e.target.closest('.inv-tab-btn');
      if (!btn) return;
      e.preventDefault();
      e.stopPropagation();
      const category = btn.getAttribute('data-category');
      if (category) {
        switchInventoryTab(category);
      }
    };

    tabsContainer.addEventListener('click', handleTabClick, { passive: false });
    tabsContainer.addEventListener('touchend', handleTabClick, { passive: false });
  }
  
  updateCharacterArmorClass();
  switchInventoryTab('weapons');
  initModalTouchShields();

  if (typeof initCoinCalculatorUI === 'function') {
    initCoinCalculatorUI();
  }
});

function fixInventoryTabsLayout() {
  const tabsWrapper = document.querySelector('.inventory-tabs') || document.querySelector('.inv-tabs-container') || document.querySelector('[class*="inv-tab"]')?.parentElement;
  
  if (tabsWrapper) {
    tabsWrapper.style.cssText = `
      display: grid !important;
      grid-template-columns: repeat(3, 1fr) !important;
      gap: 6px !important;
      padding: 4px 2px 8px 2px !important;
      width: 100% !important;
      box-sizing: border-box !important;
    `;
    
    if (!document.getElementById('inv-tabs-style-fix')) {
      const styleEl = document.createElement('style');
      styleEl.id = 'inv-tabs-style-fix';
      styleEl.innerHTML = `
        .inventory-tabs, .inv-tabs-container {
          display: grid !important;
          grid-template-columns: repeat(3, 1fr) !important;
          gap: 6px !important;
        }
        .inv-tab-btn:nth-child(1) { grid-column: 1; grid-row: 1; }
        .inv-tab-btn:nth-child(2) { grid-column: 2; grid-row: 1; }
        .inv-tab-btn:nth-child(3) { grid-column: 3; grid-row: 1; }
        .inv-tab-btn:nth-child(4) { grid-column: 1 / span 2; grid-row: 2; }
        .inv-tab-btn:nth-child(5) { grid-column: 3 / span 1; grid-row: 2; }

        .inv-tab-btn {
          width: 100% !important;
          text-align: center !important;
          white-space: nowrap !important;
          overflow: hidden !important;
          text-overflow: ellipsis !important;
          padding: 8px 4px !important;
          font-size: 0.85em !important;
          pointer-events: auto !important;
          touch-action: manipulation;
          box-sizing: border-box !important;
        }
      `;
      document.head.appendChild(styleEl);
    }
  }
}

function lockSwipers() {
    ['mySwiper', 'swiper', 'mainSwiper', 'inventorySwiper'].forEach(name => {
        if (window[name] && typeof window[name].disable === 'function') {
            window[name].disable();
        }
    });

    document.querySelectorAll('.swiper').forEach(el => {
        if (el.swiper) {
            if (typeof el.swiper.disable === 'function') el.swiper.disable();
            el.swiper.allowTouchMove = false;
        }
    });
}

function unlockSwipers() {
    ['mySwiper', 'swiper', 'mainSwiper', 'inventorySwiper'].forEach(name => {
        if (window[name] && typeof window[name].enable === 'function') {
            window[name].enable();
        }
    });

    document.querySelectorAll('.swiper').forEach(el => {
        if (el.swiper) {
            if (typeof el.swiper.enable === 'function') el.swiper.enable();
            el.swiper.allowTouchMove = true;
        }
    });
}

function initModalTouchShields() {
  const modals = document.querySelectorAll('.modal, [id*="Modal"], [id*="modal"]');
  modals.forEach(modal => {
    modal.addEventListener('wheel', (e) => {
      e.stopPropagation();
    }, { passive: true });
  });
}

function switchInventoryTab(category) {
  currentInventoryCategory = category;
  
  const tabButtons = document.querySelectorAll('.inv-tab-btn');
  tabButtons.forEach(b => {
    const btnCat = b.getAttribute('data-category');
    if (btnCat === category) {
      b.classList.add('active');
      b.style.background = '#2196F3';
      b.style.color = '#fff';
    } else {
      b.classList.remove('active');
      b.style.background = '#333';
      b.style.color = '#ccc';
    }
  });

  document.querySelectorAll('.inv-category-content').forEach(content => {
    content.style.display = 'none';
  });

  let targetContent = document.getElementById(`invCat_${category}`);
  if (!targetContent) {
    targetContent = document.querySelector(`.inv-category-content[data-category="${category}"]`) ||
                    document.getElementById(`${category}List`)?.closest('.inv-category-content');
  }

  if (targetContent) {
    targetContent.style.display = 'block';
  } else {
    let dynamicContainer = document.getElementById(`invCat_${category}`);
    if (!dynamicContainer) {
      const parentArea = document.querySelector('.inventory-content-area') || document.querySelector('.inv-content') || document.body;
      dynamicContainer = document.createElement('div');
      dynamicContainer.id = `invCat_${category}`;
      dynamicContainer.className = 'inv-category-content';
      dynamicContainer.style.cssText = 'display: block; margin-top: 10px;';
      
      const innerList = document.createElement('div');
      innerList.id = `inv${category.charAt(0).toUpperCase() + category.slice(1)}List`;
      dynamicContainer.appendChild(innerList);
      parentArea.appendChild(dynamicContainer);
    } else {
      dynamicContainer.style.display = 'block';
    }
  }

  renderInventory();
}

function openCustomItemModalForCurrentTab() {
  openCustomItemModal(typeof currentInventoryCategory !== 'undefined' ? currentInventoryCategory : 'weapons');
}

function addItemToInventory(category, name, count, extraData = {}) {
  if (typeof currentCharacter === 'undefined' || !currentCharacter) return;
  if (!currentCharacter.inventory) {
    currentCharacter.inventory = { weapons: [], armor: [], consumables: [], materials: [], junk: [] };
  }
  if (!currentCharacter.inventory[category]) {
    currentCharacter.inventory[category] = [];
  }

  const existing = currentCharacter.inventory[category].find(i => i.name === name);
  if (existing) {
    existing.count = (existing.count || 1) + count;
  } else {
    currentCharacter.inventory[category].push({ name, count, equipped: false, ...extraData });
  }

  if (typeof autoSaveCurrentCharacter === 'function') autoSaveCurrentCharacter();
  renderInventory();
}

function removeInventoryItem(category, index) {
  if (typeof currentCharacter === 'undefined' || !currentCharacter || !currentCharacter.inventory || !currentCharacter.inventory[category]) return;
  currentCharacter.inventory[category].splice(index, 1);
  if (typeof autoSaveCurrentCharacter === 'function') autoSaveCurrentCharacter();
  renderInventory(); 
}

function updateInventoryItemCount(category, index, newCount) {
  if (typeof currentCharacter === 'undefined' || !currentCharacter || !currentCharacter.inventory || !currentCharacter.inventory[category]) return;
  const val = parseInt(newCount);
  if (isNaN(val) || val <= 0) {
    removeInventoryItem(category, index);
  } else {
    currentCharacter.inventory[category][index].count = val;
    if (typeof autoSaveCurrentCharacter === 'function') autoSaveCurrentCharacter();
    if (typeof updateInventoryWeight === 'function') updateInventoryWeight();
  }
}

function checkInventoryItemProficiency(category, item) {
  if (typeof currentCharacter === 'undefined' || !currentCharacter) return true;
  
  const profs = currentCharacter.proficiencies || [];
  const userProfsIds = profs.map(p => {
    if (!p) return '';
    if (typeof p === 'object') return (p.id || '').toLowerCase();
    return String(p).toLowerCase();
  });

  const itemName = (item.name || '').toLowerCase();
  const itemCategory = (item.category || '').toLowerCase().replace(/ё/g, 'е');

  // 1. ПРОВЕРКА ДОСПЕХОВ И ЩИТОВ
  if (category === 'armor') {
    const proficiencyType = String(item.proficiencyType || '').toLowerCase();

    if (itemCategory.includes('одежда') || itemCategory.includes('прочее') || itemCategory.includes('кольцо') || 
        itemCategory.includes('шлем') || itemCategory.includes('плащ') || itemCategory.includes('амулет') || 
        itemCategory.includes('наручи') || itemCategory.includes('чудесный предмет') || itemCategory.includes('аксессуар')) {
      return true;
    }

    if (itemCategory.includes('щит') || itemName.includes('щит')) {
      return userProfsIds.includes('p_shields');
    }

    if (itemCategory.includes('тяжел') || itemName.includes('латы') || itemName.includes('кольчуга') || itemName.includes('кираса тяжелая')) {
      return userProfsIds.includes('p_armor_heavy');
    }

    if (itemCategory.includes('средн') || proficiencyType === 'medium') {
      return userProfsIds.includes('p_armor_medium') || userProfsIds.includes('p_armor_heavy');
    }

    if (itemCategory.includes('легк') || proficiencyType === 'light') {
      return userProfsIds.includes('p_armor_light') || userProfsIds.includes('p_armor_medium') || userProfsIds.includes('p_armor_heavy');
    }

    if (itemCategory.includes('доспех') || item.acBase > 0 || item.ac > 0) {
      return userProfsIds.includes('p_armor_light') || userProfsIds.includes('p_armor_medium') || userProfsIds.includes('p_armor_heavy');
    }
  }

  // 2. ПРОВЕРКА ОРУЖИЯ
  if (category === 'weapons') {
    if (itemCategory.includes('простое') && userProfsIds.includes('p_weapon_simple')) return true;
    if (itemCategory.includes('воинское') && userProfsIds.includes('p_weapon_martial')) return true;
    if (itemCategory.includes('огнестрельное') && userProfsIds.includes('p_firearms')) return true;

    if (typeof PROFICIENCIES_DB !== 'undefined') {
      for (let i = 0; i < PROFICIENCIES_DB.length; i++) {
        let prof = PROFICIENCIES_DB[i];
        if (prof.category === 'Конкретное оружие') {
          if (itemName.includes(prof.name.toLowerCase()) && userProfsIds.includes(prof.id)) {
            return true;
          }
        }
      }
    }

    if (itemCategory.includes('простое оружие') && userProfsIds.includes('p_weapon_simple')) return true;
    if (itemCategory.includes('воинское оружие') && userProfsIds.includes('p_weapon_martial')) return true;

    return false;
  }

  return true;
}

function toggleItemEquipped(category, index, isChecked) {
  if (typeof currentCharacter === 'undefined' || !currentCharacter || !currentCharacter.inventory || !currentCharacter.inventory[category]) return;
  const item = currentCharacter.inventory[category][index];
  
  if (item) {
    if (isChecked) {
      const hasProficiency = checkInventoryItemProficiency(category, item);
      if (!hasProficiency) {
        alert(`❌ Персонаж не владеет данным типом снаряжения («${item.name}»)!\nЭкипировка заблокирована.`);
        renderInventory(); 
        return;
      }
    }

    if (isChecked && category === 'armor') {
      const name = String(item.name || '').toLowerCase();
      const cat = String(item.category || '').toLowerCase();
      const isShield = cat.includes('щит') || name.includes('щит') || cat.includes('shield');
      currentCharacter.inventory.armor.forEach((other, otherIndex) => {
        if (!other || otherIndex === index || other.equipped !== true) return;
        const otherName = String(other.name || '').toLowerCase();
        const otherCat = String(other.category || '').toLowerCase();
        const otherIsShield = otherCat.includes('щит') || otherName.includes('щит') || otherCat.includes('shield');
        // Only one shield and one body-armor item may be equipped at once.
        if (otherIsShield === isShield) other.equipped = false;
      });
    }
    item.equipped = isChecked;
    if (typeof autoSaveCurrentCharacter === 'function') autoSaveCurrentCharacter();
    if (category === 'armor' || category === 'weapons') {
      updateCharacterArmorClass();
    }
    renderInventory(); 
  }
}

function updateCharacterArmorClass() {
  if (typeof currentCharacter === 'undefined' || !currentCharacter) return;

  let rawStats = {
    str: currentCharacter.stats && !isNaN(currentCharacter.stats.str) ? parseInt(currentCharacter.stats.str) : 10,
    dex: currentCharacter.stats && !isNaN(currentCharacter.stats.dex) ? parseInt(currentCharacter.stats.dex) : 10,
    con: currentCharacter.stats && !isNaN(currentCharacter.stats.con) ? parseInt(currentCharacter.stats.con) : 10,
    int: currentCharacter.stats && !isNaN(currentCharacter.stats.int) ? parseInt(currentCharacter.stats.int) : 10,
    wis: currentCharacter.stats && !isNaN(currentCharacter.stats.wis) ? parseInt(currentCharacter.stats.wis) : 10,
    cha: currentCharacter.stats && !isNaN(currentCharacter.stats.cha) ? parseInt(currentCharacter.stats.cha) : 10
  };

  let activeStats = { ...rawStats };
  let dexMod = Math.floor((activeStats.dex - 10) / 2);

  let baseAC = 10;
  if (typeof currentCharacter.baseAC !== 'undefined' && !isNaN(parseInt(currentCharacter.baseAC))) {
    baseAC = parseInt(currentCharacter.baseAC);
  } else {
    const baseACInput = document.getElementById('baseAC');
    if (baseACInput && baseACInput.value) {
      baseAC = parseInt(baseACInput.value) || 10;
    }
  }

  let bodyArmor = null;         
  let shieldBonus = 0;          
  let extraACBonus = 0;         

  if (currentCharacter.inventory && currentCharacter.inventory.armor) {
    currentCharacter.inventory.armor.forEach(item => {
      if (item.equipped === true) {
        const sourceArmor = Array.isArray(window.defaultArmors)
          ? window.defaultArmors.find(a =>
              a && (
                (item.id && a.id === item.id) ||
                (item.name && a.name && String(a.name).toLowerCase() === String(item.name).toLowerCase())
              )
            )
          : null;

        let name = String(item.name || sourceArmor?.name || '').toLowerCase();
        let cat = String(item.category || sourceArmor?.category || '').toLowerCase();
        let proficiencyType = String(item.proficiencyType || sourceArmor?.proficiencyType || '').toLowerCase();

        let acVal = 0;
        if (item.acBase !== undefined && !isNaN(parseInt(item.acBase))) {
          acVal = parseInt(item.acBase);
        } else if (item.ac !== undefined && !isNaN(parseInt(item.ac))) {
          acVal = parseInt(item.ac);
        } else if (sourceArmor && sourceArmor.acBase !== undefined && !isNaN(parseInt(sourceArmor.acBase))) {
          acVal = parseInt(sourceArmor.acBase);
        }

        if (cat.includes('щит') || name.includes('щит') || cat.includes('shield') || proficiencyType === 'shield') {
          shieldBonus += (acVal > 0 ? acVal : 2);
        } else if (cat.includes('тяжел') || cat.includes('heavy') || proficiencyType === 'heavy') {
          bodyArmor = { type: 'heavy', ac: acVal };
        } else if (cat.includes('средн') || cat.includes('medium') || proficiencyType === 'medium') {
          bodyArmor = { type: 'medium', ac: acVal };
        } else if (cat.includes('легк') || cat.includes('light') || proficiencyType === 'light') {
          bodyArmor = { type: 'light', ac: acVal };
        } else {
          if (acVal > 0) extraACBonus += acVal;
        }
      }
    });
  }

  let finalAC = baseAC;
  if (bodyArmor) {
    if (bodyArmor.type === 'heavy') finalAC = bodyArmor.ac;
    else if (bodyArmor.type === 'medium') finalAC = bodyArmor.ac + Math.min(dexMod, 2);
    else if (bodyArmor.type === 'light') finalAC = bodyArmor.ac + dexMod;
  } else {
    finalAC = 10 + dexMod;
  }

  finalAC += shieldBonus + extraACBonus;
  currentCharacter.ac = finalAC;

  if (typeof autoSaveCurrentCharacter === 'function') autoSaveCurrentCharacter();

  const acInputEl = document.getElementById('ac');
  if (acInputEl) acInputEl.value = finalAC;

  const invHeaderACEl = document.getElementById('invHeaderAC');
  if (invHeaderACEl) invHeaderACEl.textContent = finalAC;
}

function useInventoryItem(category, index) {
  if (typeof currentCharacter === 'undefined' || !currentCharacter || !currentCharacter.inventory || !currentCharacter.inventory[category]) return;
  const item = currentCharacter.inventory[category][index];
  if (!item) return;

  alert(`Вы использовали предмет: ${item.name}`);

  if (item.count > 1) {
    item.count -= 1;
  } else {
    currentCharacter.inventory[category].splice(index, 1);
  }

  if (typeof autoSaveCurrentCharacter === 'function') autoSaveCurrentCharacter();
  renderInventory();
}


const inventorySearchState = {
  query: '',
  materialOnly: false,
  craftedOnly: false,
  sort: 'name',
  rarity: ''
};

function ensureInventoryV43Toolbar() {
  const area = document.querySelector('.inventory-content-area') || document.querySelector('.inv-content');
  if (!area || document.getElementById('inventoryToolsV43')) return;
  const box = document.createElement('div');
  box.id = 'inventoryToolsV43';
  box.style.cssText = 'margin:6px 0 8px;padding:8px;background:#191919;border:1px solid #3a3a3a;border-radius:7px;box-sizing:border-box;';
  box.innerHTML = `
    <div style="display:flex;gap:6px;align-items:center;">
      <input id="inventorySearchV43" type="search" placeholder="🔎 Найти предмет, материал, тег..." autocomplete="off"
        style="flex:1;min-width:0;padding:8px;background:#222;color:#fff;border:1px solid #555;border-radius:5px;box-sizing:border-box;">
      <select id="inventorySortV43" style="width:112px;padding:8px;background:#222;color:#fff;border:1px solid #555;border-radius:5px;">
        <option value="name">А–Я</option><option value="quantity">Количество</option><option value="weight">Вес</option><option value="rarity">Редкость</option>
      </select>
    </div>
    <div style="display:flex;gap:5px;flex-wrap:wrap;margin-top:6px;">
      <button type="button" id="inventoryMaterialFilterV43" class="btn-action" style="padding:5px 8px;font-size:.75em;">🧱 Материалы</button>
      <button type="button" id="inventoryCraftFilterV43" class="btn-action" style="padding:5px 8px;font-size:.75em;">🔧 Для крафта</button>
      <button type="button" id="inventoryClearFilterV43" class="btn-action" style="padding:5px 8px;font-size:.75em;">✕ Сбросить</button>
      <span id="inventorySearchCountV43" style="margin-left:auto;color:#888;font-size:.72em;align-self:center;"></span>
    </div>`;
  area.insertBefore(box, area.firstChild);

  const input = document.getElementById('inventorySearchV43');
  input.addEventListener('input', () => { inventorySearchState.query = input.value.trim().toLowerCase(); renderInventory(); });
  document.getElementById('inventorySortV43').addEventListener('change', e => { inventorySearchState.sort = e.target.value; renderInventory(); });
  document.getElementById('inventoryMaterialFilterV43').addEventListener('click', () => { inventorySearchState.materialOnly = !inventorySearchState.materialOnly; updateInventoryFilterButtonsV43(); renderInventory(); });
  document.getElementById('inventoryCraftFilterV43').addEventListener('click', () => { inventorySearchState.craftedOnly = !inventorySearchState.craftedOnly; updateInventoryFilterButtonsV43(); renderInventory(); });
  document.getElementById('inventoryClearFilterV43').addEventListener('click', () => { inventorySearchState.query=''; inventorySearchState.materialOnly=false; inventorySearchState.craftedOnly=false; inventorySearchState.rarity=''; input.value=''; updateInventoryFilterButtonsV43(); renderInventory(); });
  updateInventoryFilterButtonsV43();
}

function updateInventoryFilterButtonsV43() {
  const m = document.getElementById('inventoryMaterialFilterV43');
  const c = document.getElementById('inventoryCraftFilterV43');
  if (m) m.style.background = inventorySearchState.materialOnly ? '#2e7d32' : '#333';
  if (c) c.style.background = inventorySearchState.craftedOnly ? '#6a1b9a' : '#333';
}

function inventoryItemMatchesV43(item, category) {
  if (!item) return false;
  if (inventorySearchState.materialOnly && category !== 'materials' && !(item.materialId || item.craftMaterialId || item.tags)) return false;
  if (inventorySearchState.craftedOnly && !item.crafted && !item.craftRecipe && !item.craftMaterialId) return false;
  const q = inventorySearchState.query;
  if (!q) return true;
  const hay = [item.name, item.materialId, item.craftMaterialId, item.category, item.rarity, item.source,
    ...(Array.isArray(item.tags) ? item.tags : []), ...(Array.isArray(item.roles) ? item.roles : [])].filter(Boolean).join(' ').toLowerCase();
  return hay.includes(q);
}

function inventorySortV43(items) {
  const copy = items.slice();
  const rarityOrder = {common:1, uncommon:2, rare:3, very_rare:4, legendary:5};
  copy.sort((a,b) => {
    if (inventorySearchState.sort === 'quantity') return (Number(b.count)||0)-(Number(a.count)||0);
    if (inventorySearchState.sort === 'weight') return (Number(a.weight)||0)-(Number(b.weight)||0);
    if (inventorySearchState.sort === 'rarity') return (rarityOrder[b.rarity]||0)-(rarityOrder[a.rarity]||0) || String(a.name||'').localeCompare(String(b.name||''),'ru');
    return String(a.name||'').localeCompare(String(b.name||''),'ru');
  });
  return copy;
}

function formatInventoryQuantityV43(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return '0';
  return Number.isInteger(n) ? String(n) : n.toFixed(2).replace(/0+$/,'').replace(/\.$/,'');
}

function renderInventory() {
  ensureInventoryV43Toolbar();
  if (typeof currentCharacter === 'undefined' || !currentCharacter) return;
  if (!currentCharacter.inventory) {
    currentCharacter.inventory = { weapons: [], armor: [], consumables: [], materials: [], junk: [] };
  }

  renderSpecificList('weapons', 'invWeaponsList');
  renderSpecificList('armor', 'invArmorList');
  renderSpecificList('consumables', 'invConsumablesList');
  renderSpecificList('materials', 'invMaterialsList');
  renderSpecificList('junk', 'invJunkList');

  if (typeof updateInventoryWeight === 'function') updateInventoryWeight();
  updateCharacterArmorClass();
}

function renderSpecificList(category, elementId) {
  const container = document.getElementById(elementId);
  if (!container) return;
  
  container.innerHTML = '';
  const allItems = currentCharacter.inventory[category] || [];
  const indexed = allItems.map((item, originalIndex) => ({item, originalIndex})).filter(x => inventoryItemMatchesV43(x.item, category));
  indexed.sort((a,b) => {
    const sorted = inventorySortV43([a.item,b.item]);
    return sorted[0] === a.item ? -1 : sorted[0] === b.item ? 1 : 0;
  });
  const items = indexed;
  const counter = document.getElementById('inventorySearchCountV43');
  if (counter) counter.textContent = (inventorySearchState.query || inventorySearchState.materialOnly || inventorySearchState.craftedOnly) ? `${items.length}/${allItems.length}` : `${allItems.length} поз.`;
  if (items.length === 0) {
    container.innerHTML = '<div style="color: #777; font-size: 0.9em; padding: 4px;">Список пуст</div>';
  } else {
    items.forEach(entry => {
      container.appendChild(createInventoryRow(category, entry.item, entry.originalIndex));
    });
  }
}

function createInventoryRow(category, item, index) {
  const row = document.createElement('div');
  row.style.cssText = 'display: flex; flex-direction: column; background: #2a2a2a; padding: 8px; margin-bottom: 6px; border-radius: 4px; gap: 4px;';
  
  const topRow = document.createElement('div');
  topRow.style.cssText = 'display: flex; justify-content: space-between; align-items: center; width: 100%;';

  const nameSpan = document.createElement('span');
  nameSpan.textContent = item.name + (item.weight ? ` (${item.weight})` : '');
  nameSpan.style.cssText = 'flex: 2; font-size: 0.9em; cursor: pointer; color: #4fc3f7; text-decoration: underline dotted;';

  let equipLabel = null;
  if (category === 'weapons' || category === 'armor') {
    equipLabel = document.createElement('label');
    equipLabel.style.cssText = 'font-size: 0.75em; color: #ccc; display: flex; align-items: center; gap: 3px; margin-right: 6px; cursor: pointer;';
    
    const equipCheckbox = document.createElement('input');
    equipCheckbox.type = 'checkbox';
    equipCheckbox.checked = !!item.equipped;
    equipCheckbox.addEventListener('change', (e) => toggleItemEquipped(category, index, e.target.checked));
    
    equipLabel.appendChild(equipCheckbox);
    equipLabel.appendChild(document.createTextNode('Эк.'));
  }

  const countInput = document.createElement('input');
  countInput.type = 'number';
  countInput.step = '0.01';
  countInput.value = formatInventoryQuantityV43(item.count || 1);
  countInput.style.cssText = 'width: 45px; text-align: center; margin-right: 6px; padding: 4px; background: #1e1e1e; color: #fff; border: 1px solid #444; border-radius: 4px; font-size: 0.85em;';
  countInput.addEventListener('change', (e) => updateInventoryItemCount(category, index, e.target.value));

  const delBtn = document.createElement('button');
  delBtn.type = 'button';
  delBtn.className = 'btn-action';
  delBtn.style.cssText = 'background: #e53935; padding: 6px 10px; font-size: 0.8em; cursor: pointer; border-radius: 3px; border: none; color: #fff;';
  delBtn.textContent = '✕';
  delBtn.addEventListener('click', () => removeInventoryItem(category, index));

  topRow.appendChild(nameSpan);
  if (equipLabel) topRow.appendChild(equipLabel);
  topRow.appendChild(countInput);
  topRow.appendChild(delBtn);
  row.appendChild(topRow);

  // Выпадающая шторка с деталями предмета / оружия
  const drawer = document.createElement('div');
  drawer.style.cssText = 'display: none; margin-top: 6px; padding: 8px; background: rgba(0,0,0,0.3); border-radius: 4px; font-size: 0.85em; border-top: 1px solid #444; color: #ddd; line-height: 1.4;';

  let detailsHtml = '';
  if (item.category) detailsHtml += `<div><strong>Категория:</strong> ${item.category}</div>`;
  if (item.hands) detailsHtml += `<div><strong>Количество рук:</strong> ${item.hands}</div>`;
  if (item.damage) detailsHtml += `<div><strong>Урон:</strong> ${item.damage}${item.damageType ? ' (' + item.damageType + ')' : ''}</div>`;
  if (item.weight) detailsHtml += `<div><strong>Вес:</strong> ${item.weight}</div>`;
  if (item.materialId || item.craftMaterialId) detailsHtml += `<div><strong>🧱 Материал:</strong> ${item.materialId || item.craftMaterialId}</div>`;
  if (item.resourceUnit) detailsHtml += `<div><strong>Единица:</strong> ${item.resourceUnit}</div>`;
  if (item.resourceType) detailsHtml += `<div><strong>Тип ресурса:</strong> ${item.resourceType}</div>`;
  if (item.harvestQuality) detailsHtml += `<div><strong>Качество добычи:</strong> ${item.harvestQuality}</div>`;
  if (item.cost) detailsHtml += `<div><strong>Стоимость:</strong> ${item.cost}</div>`;

  if (item.craftQuality || item.durabilityMax) {
    const qApi = typeof DND_CRAFT_DISASSEMBLY_V51 !== 'undefined' ? DND_CRAFT_DISASSEMBLY_V51 : null;
    if (qApi && typeof qApi.assessItem === 'function') {
      const report = qApi.assessItem(item);
      if (report.ok) detailsHtml += `<div><strong>🛠️ Качество:</strong> ${report.qualityLabel} (${report.qualityBand}) · ${report.score}/100</div><div><strong>Прочность:</strong> ${report.current}/${report.max} · ${report.conditionLabel}</div>`;
    }
  }
  
  if (item.bonuses) {
    const activeBonuses = Object.entries(item.bonuses)
      .filter(([_, val]) => val !== 0)
      .map(([stat, val]) => `${stat.toUpperCase()}: ${val > 0 ? '+' + val : val}`);
    if (activeBonuses.length > 0) {
      detailsHtml += `<div><strong>Бонусы:</strong> ${activeBonuses.join(', ')}</div>`;
    }
  }

  if (item.properties && Array.isArray(item.properties) && item.properties.length > 0) {
    detailsHtml += `<div><strong>Свойства:</strong> ${item.properties.join(', ')}</div>`;
  }

  if (item.crafted && item.kind) {
    detailsHtml += `<div style="margin-top:4px;color:#ffb74d;"><strong>⚗️ Алхимия:</strong> ${item.kind} · Potency ${item.potency || 0} · Риск ${item.risk || 0}</div>`;
    if (Array.isArray(item.effects) && item.effects.length) detailsHtml += `<div><strong>Эффекты:</strong> ${item.effects.map(e => e.label || e.property).join(', ')}</div>`;
  }

  if (item.description) {
    detailsHtml += `<div style="margin-top: 4px; font-style: italic; color: #aaa;">${item.description}</div>`;
  }

  if (!detailsHtml) {
    detailsHtml = '<div style="color: #777;">Нет дополнительной информации о предмете.</div>';
  }

  drawer.innerHTML = detailsHtml;
  if (typeof DND_CRAFT_DISASSEMBLY_V51 !== 'undefined' && (item.craftQuality || item.durabilityMax || item.craftRecipe)) {
    const lifecycle = document.createElement('div');
    lifecycle.style.cssText = 'display:flex;gap:5px;margin-top:6px;';
    const repairBtn = document.createElement('button');
    repairBtn.type='button'; repairBtn.className='btn-action'; repairBtn.style.cssText='background:#5d4037;flex:1;padding:6px;font-size:.78em;'; repairBtn.textContent='🔧 Ремонт';
    repairBtn.addEventListener('click', () => {
      const r = DND_CRAFT_DISASSEMBLY_V51.repairItem(item);
      if (r.ok) { alert(r.repaired ? `Предмет отремонтирован. Стоимость: ${r.cost} зм.` : 'Предмет уже полностью исправен.'); renderInventory(); }
      else alert('❌ ' + (r.error || 'Не удалось отремонтировать предмет.'));
    });
    lifecycle.appendChild(repairBtn);
    const disBtn = document.createElement('button');
    disBtn.type='button'; disBtn.className='btn-action'; disBtn.style.cssText='background:#6d332b;flex:1;padding:6px;font-size:.78em;'; disBtn.textContent='♻️ Разобрать';
    disBtn.addEventListener('click', () => {
      const preview = DND_CRAFT_DISASSEMBLY_V51.previewDisassembly(item);
      if (!preview.ok) { alert('❌ ' + (preview.error || 'Предмет нельзя разобрать.')); return; }
      const list = preview.materials.map(m => `${m.name} ×${m.recovered}`).join('\n');
      if (!confirm(`Разобрать «${item.name}»?\n\nВернётся:\n${list}\n\nОперация необратима.`)) return;
      const r = DND_CRAFT_DISASSEMBLY_V51.disassembleItem(item, {category, index});
      if (r.ok) { alert('♻️ Предмет разобран.'); renderInventory(); }
      else alert('❌ ' + (r.error || 'Не удалось разобрать предмет.'));
    });
    lifecycle.appendChild(disBtn);
    drawer.appendChild(lifecycle);
  }

  if (item.crafted && item.alchemyId && typeof DNDAlchemy !== 'undefined' && typeof DNDAlchemy.useProduct === 'function') {
    const useBtn = document.createElement('button');
    useBtn.type = 'button';
    useBtn.className = 'btn-action';
    useBtn.style.cssText = 'background:#6a1b9a; margin-top:5px; width:100%;';
    useBtn.textContent = item.kind === 'bomb' ? '💣 Подготовить к броску' : '⚗️ Использовать';
    useBtn.addEventListener('click', () => {
      const r = DNDAlchemy.useProduct(item);
      if (r.ok) alert('Алхимический предмет применён' + (r.healed ? ': восстановлено ' + Math.round(r.healed) + ' HP.' : '.'));
      else alert('❌ ' + (r.error || 'Не удалось применить предмет.'));
    });
    drawer.appendChild(useBtn);
  }
  row.appendChild(drawer);

  // Обработчик клика для открытия/закрытия шторки
  nameSpan.addEventListener('click', () => {
    const isHidden = drawer.style.display === 'none';
    drawer.style.display = isHidden ? 'block' : 'none';
  });

  return row;
}

function openAddItemModal(category) {
  if (category) {
    currentInventoryCategory = category;
  }
  const activeCategory = currentInventoryCategory;
  
  const modal = document.getElementById('addItemModal');
  const container = document.getElementById('addItemPresetsContainer');
  if (!modal || !container) {
    openCustomItemModal(activeCategory);
    return;
  }

  container.innerHTML = '';

  const customBtn = document.createElement('button');
  customBtn.type = 'button';
  customBtn.className = 'btn-action';
  customBtn.style.cssText = 'background: #4CAF50; width: 100%; margin-bottom: 15px; padding: 12px; font-weight: bold; cursor: pointer; border-radius: 4px; border: none; color: #fff; font-size: 1em;';
  customBtn.textContent = '✨ Создать свой предмет вручную';
  
  customBtn.addEventListener('click', (e) => {
    e.preventDefault();
    closeAddItemModal();
    setTimeout(() => openCustomItemModal(activeCategory), 80);
  });
  container.appendChild(customBtn);

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

function closeAddItemModal() {
  const modal = document.getElementById('addItemModal');
  if (modal) modal.style.display = 'none';
  document.body.classList.remove('modal-open');
  if (typeof unlockSwipers === 'function') unlockSwipers();
}

function openCustomItemModal(category) {
  if (category) currentInventoryCategory = category;
  const modal = document.getElementById('customItemModal');
  if (!modal) {
    const name = prompt('Введите название предмета:');
    if (name) addItemToInventory(currentInventoryCategory, name, 1, {});
    return;
  }

  modal.style.display = 'flex';
  modal.style.zIndex = '999999';
  modal.style.position = 'fixed';
  modal.style.top = '0';
  modal.style.left = '0';
  modal.style.width = '100%';
  modal.style.height = '100%';
  document.body.classList.add('modal-open');
}

function closeCustomItemModal() {
  const modal = document.getElementById('customItemModal');
  if (modal) modal.style.display = 'none';
  document.body.classList.remove('modal-open');
  if (typeof unlockSwipers === 'function') unlockSwipers();
}
