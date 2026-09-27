// ==========================================
// 1. ЯДРО БАЗЫ ДАННЫХ И КОНВЕРТАЦИЯ ВЕСА
// ==========================================
window.DndItemDatabase = {};

function registerItems(itemArray) {
    if (Array.isArray(itemArray)) {
        itemArray.forEach(item => {
            if (item && item.id) {
                window.DndItemDatabase[item.id] = item;
            }
        });
    }
}

[
    window.defaultWeapons,
    window.defaultArmor,
    window.defaultArmors,
    window.defaultConsumables,
    window.defaultMaterials,
    window.defaultJunk,
    window.weapons,
    window.armor,
    window.armors,
    window.consumables,
    window.materials,
    window.junk
].forEach(registerItems);

window.parseWeightToKg = function(weightStr) {
    if (typeof weightStr === 'number') return weightStr * 0.453592;
    if (!weightStr) return 0;
    
    const str = String(weightStr).trim();
    const match = str.match(/([\d.,]+)\s*([а-яa-z]*)/i);
    if (!match || !match[1]) return 0;

    let val = parseFloat(match[1].replace(',', '.')) || 0;
    const unit = match[2] ? match[2].toLowerCase() : '';

    if (unit.startsWith('фунт') || unit.startsWith('lb') || !unit) {
        val = val * 0.453592;
    }
    return val;
};


// ==========================================
// КАСТОМНЫЕ УВЕДОМЛЕНИЯ ВМЕСТО ALERT()
// ==========================================
window.showCustomAlert = function(title, message, icon = '🚫') {
    const modal = document.getElementById('customAlertModal');
    const titleEl = document.getElementById('customAlertTitle');
    const msgEl = document.getElementById('customAlertMessage');
    const iconEl = document.getElementById('customAlertIcon');

    if (modal && titleEl && msgEl) {
        titleEl.textContent = title;
        msgEl.textContent = message;
        if (iconEl) iconEl.textContent = icon;
        modal.style.display = 'flex';
        document.body.classList.add('modal-open');
    } else {
        alert(message); // Запасной вариант
    }
};

window.closeCustomAlert = function() {
    const modal = document.getElementById('customAlertModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
    }
};


// ==========================================
// 2. ИНИЦИАЛИЗАЦИЯ ИНТЕРФЕЙСА ТРЕКЕРА
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initWeightTracker, 800);
});

function initWeightTracker() {
    try {
        const actionBtn = document.querySelector('.inventory-actions');
        if (!actionBtn) {
            setTimeout(initWeightTracker, 1000);
            return;
        }

        if (document.getElementById('weight-tracker-container')) return;

        const container = document.createElement('div');
        container.id = 'weight-tracker-container';
        container.style.cssText = 'margin: 10px 0 15px 0; padding: 10px; background: #1a1a1a; border: 1px solid #333; border-radius: 6px; box-sizing: border-box; position: relative; z-index: 1000;';

        const label = document.createElement('label');
        label.style.cssText = 'display: flex; align-items: center; color: #fff; font-size: 14px; cursor: pointer; user-select: none; font-weight: bold;';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = 'enable-weight-calc';
        checkbox.style.cssText = 'margin-right: 8px; width: 16px; height: 16px; accent-color: #28a745; cursor: pointer;';

        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(' ⚖️ Расчёт веса (если вы играете с ним)'));

        const barWrapper = document.createElement('div');
        barWrapper.style.cssText = 'width: 100%; height: 12px; background: #2a2a2a; border-radius: 6px; overflow: hidden; display: none; position: relative; border: 1px solid #444; margin-top: 10px;';

        const barFill = document.createElement('div');
        barFill.id = 'weight-bar-fill';
        barFill.style.cssText = 'height: 100%; width: 0%; transition: width 0.3s ease, background-color 0.3s ease;';
        barWrapper.appendChild(barFill);

        const infoText = document.createElement('div');
        infoText.id = 'weight-info-text';
        infoText.style.cssText = 'font-size: 12px; color: #aaa; margin-top: 6px; display: none; text-align: right; font-weight: bold;';
        infoText.textContent = 'Вес: 0 кг (0 lb) / Лимит: 0 кг (0 lb)';

        container.appendChild(label);
        container.appendChild(barWrapper);
        container.appendChild(infoText);

        actionBtn.parentNode.insertBefore(container, actionBtn.nextSibling);

        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                barWrapper.style.display = 'block';
                infoText.style.display = 'block';
                safeUpdateWeightData();
            } else {
                barWrapper.style.display = 'none';
                infoText.style.display = 'none';
                updateItemButtonsState(false, false);
            }
        });

        setupDynamicListeners();

    } catch (e) {
        console.error("Ошибка инициализации Weight Tracker:", e);
    }
}


// ==========================================
// 3. ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ БЛОКИРОВКИ
// ==========================================
window.getCurrentInventoryWeightData = function() {
    let totalWeightKg = 0;
    const itemRegistry = window.DndItemDatabase || {};

    const itemCards = document.querySelectorAll(
        '#invWeaponsList > div, #invArmorList > div, #invArmorsList > div, ' +
        '#invConsumablesList > div, #invMaterialsList > div, #invJunkList > div, ' +
        '#inventory-list > div, .inventory-item, [class*="item"], [class*="armor"], [class*="weapon"], [class*="inventory"]'
    );
    const allCards = itemCards.length > 0 ? itemCards : document.querySelectorAll('div');
    const processedCards = new Set();

    allCards.forEach(card => {
        if (processedCards.has(card)) return;
        const text = card.innerText || '';
        if (!text.trim() && !card.querySelector('input')) return;

        let foundItemData = null;
        const possibleIdElements = card.querySelectorAll('[data-id], [data-item-id], [id]');
        for (let el of possibleIdElements) {
            const elId = el.getAttribute('data-id') || el.getAttribute('data-item-id') || el.id;
            if (itemRegistry[elId]) {
                foundItemData = itemRegistry[elId];
                break;
            }
        }

        if (!foundItemData) {
            const cardId = card.getAttribute('data-id') || card.getAttribute('data-item-id');
            if (cardId && itemRegistry[cardId]) {
                foundItemData = itemRegistry[cardId];
            }
        }

        if (!foundItemData) {
            for (let id in itemRegistry) {
                const dbItem = itemRegistry[id];
                if (dbItem && dbItem.name && text.toLowerCase().includes(dbItem.name.toLowerCase().trim())) {
                    foundItemData = dbItem;
                    break;
                }
            }
        }

        if (!foundItemData || foundItemData.weight === undefined) return;

        let singleWeightKg = window.parseWeightToKg(foundItemData.weight);
        if (singleWeightKg < 0) return;

        let quantity = 1;
        const inputField = card.querySelector('input[type="number"], input[type="text"], input');
        if (inputField) {
            const parsedQty = parseInt(inputField.value);
            if (!isNaN(parsedQty) && parsedQty >= 0) quantity = parsedQty;
        } else {
            const explicitMatch = text.match(/(?:эк|шт|кол-во|qty|x)\s*[:\-]?\s*(\d+)/i);
            if (explicitMatch && explicitMatch[1]) {
                quantity = parseInt(explicitMatch[1]) || 1;
            } else {
                const numbers = text.match(/\b([1-9]\d{0,2})\b/g);
                if (numbers) {
                    for (let numStr of numbers) {
                        const val = parseInt(numStr);
                        if (val > 0 && val < 100) {
                            quantity = val;
                            break;
                        }
                    }
                }
            }
        }

        totalWeightKg += singleWeightKg * quantity;
        processedCards.add(card);
    });

    let strength = 10;
    const strInput = document.getElementById('str');
    if (strInput && strInput.value) {
        strength = parseInt(strInput.value) || 10;
    }

    const maxCapacityKg = strength * 15 * 0.453592;
    return { totalWeightKg, maxCapacityKg };
};

function updateItemButtonsState(isOverweight, isHeavyOrExceeds) {
    const disable = isOverweight || isHeavyOrExceeds;
    const selector = '#addItemPresetsContainer button, #customItemModal button[onclick*="saveCustomItemModalData"], #customItemModal button.btn-action:last-of-type';
    document.querySelectorAll(selector).forEach(btn => {
        if (btn.textContent.includes('Добавить') || btn.textContent.includes('Сохранить') || btn.classList.contains('save-btn')) {
            if (disable) {
                btn.style.opacity = '0.5';
                btn.style.pointerEvents = 'none';
                btn.title = 'Действие заблокировано: достигнут лимит веса / перегруз!';
            } else {
                btn.style.opacity = '1';
                btn.style.pointerEvents = 'auto';
                btn.title = '';
            }
        }
    });
}

// Перехват функции добавления предмета с выводом красивого уведомления
if (typeof window.addItemToInventory === 'function' && !window._originalAddItemToInventory) {
    window._originalAddItemToInventory = window.addItemToInventory;
    window.addItemToInventory = function(category, name, quantity, itemData) {
        const checkbox = document.getElementById('enable-weight-calc');
        if (checkbox && checkbox.checked) {
            const { totalWeightKg, maxCapacityKg } = window.getCurrentInventoryWeightData();
            if (totalWeightKg >= maxCapacityKg) {
                window.showCustomAlert('Инвентарь переполнен', 'Невозможно взять предмет: достигнут максимальный предел веса.');
                return;
            }
            if (itemData && itemData.weight) {
                let addedWeight = window.parseWeightToKg(itemData.weight) * (quantity || 1);
                if (totalWeightKg + addedWeight > maxCapacityKg) {
                    window.showCustomAlert('Перевес!', 'Невозможно взять предмет: эта вещь создаст перевес!');
                    return;
                }
            }
        }
        return window._originalAddItemToInventory(category, name, quantity, itemData);
    };
}


// ==========================================
// 4. ОСНОВНАЯ ЛОГИКА РАСЧЁТА ВЕСА
// ==========================================
function safeUpdateWeightData() {
    try {
        const checkbox = document.getElementById('enable-weight-calc');
        if (!checkbox || !checkbox.checked) return;

        let { totalWeightKg, maxCapacityKg } = window.getCurrentInventoryWeightData();

        let strength = 10;
        const strInput = document.getElementById('str');
        if (strInput && strInput.value) {
            strength = parseInt(strInput.value) || 10;
        }

        const maxCapacityLb = strength * 15;
        const lightLimitLb = strength * 5;
        const mediumLimitLb = strength * 10;

        const lightLimitKg = lightLimitLb * 0.453592;
        const mediumLimitKg = mediumLimitLb * 0.453592;

        if (maxCapacityKg <= 0) return;

        let percent = (totalWeightKg / maxCapacityKg) * 100;
        if (percent > 100) percent = 100;
        if (isNaN(percent)) percent = 0;

        const barFill = document.getElementById('weight-bar-fill');
        const infoText = document.getElementById('weight-info-text');

        if (barFill) {
            barFill.style.width = percent + '%';
        }

        const totalWeightLb = totalWeightKg / 0.453592;
        const isOverweight = totalWeightKg > maxCapacityKg;
        const isHeavyOrExceeds = totalWeightKg > mediumLimitKg;

        updateItemButtonsState(isOverweight, isHeavyOrExceeds);

        if (infoText) {
            const weightStr = `${totalWeightKg.toFixed(1)} кг (${totalWeightLb.toFixed(1)} lb)`;
            const limitStr = `${maxCapacityKg.toFixed(1)} кг (${maxCapacityLb} lb)`;

            if (totalWeightKg <= lightLimitKg) {
                if (barFill) barFill.style.backgroundColor = '#28a745';
                infoText.textContent = `Вес: ${weightStr} / Лимит: ${limitStr} (Лёгкая ноша)`;
                infoText.style.color = '#28a745';
            } else if (totalWeightKg <= mediumLimitKg) {
                if (barFill) barFill.style.backgroundColor = '#ffc107';
                infoText.textContent = `Вес: ${weightStr} / Лимит: ${limitStr} (Средняя ноша)`;
                infoText.style.color = '#ffc107';
            } else if (totalWeightKg <= maxCapacityKg) {
                if (barFill) barFill.style.backgroundColor = '#dc3545';
                infoText.textContent = `Вес: ${weightStr} / Лимит: ${limitStr} (Тяжёлая ноша)`;
                infoText.style.color = '#dc3545';
            } else {
                if (barFill) {
                    barFill.style.backgroundColor = '#000000';
                    barFill.style.border = '1px solid #ff4444';
                }
                infoText.textContent = `ПЕРЕГРУЗ! Вес: ${weightStr} / Лимит: ${limitStr}`;
                infoText.style.color = '#ff4444';
            }
        }
    } catch (err) {
        console.error("Ошибка расчёта веса:", err);
    }
}


// ==========================================
// 5. ДИНАМИЧЕСКИЕ СЛУШАТЕЛИ И ОБСЕРВЕРЫ
// ==========================================
function setupDynamicListeners() {
    let updateScheduled = false;

    const scheduleUpdate = () => {
        if (updateScheduled) return;
        updateScheduled = true;
        
        requestAnimationFrame(() => {
            safeUpdateWeightData();
            setTimeout(() => {
                safeUpdateWeightData();
                updateScheduled = false;
            }, 60);
        });
    };

    document.addEventListener('input', scheduleUpdate);
    document.addEventListener('change', scheduleUpdate);

    document.addEventListener('click', (e) => {
        const target = e.target;
        if (
            target.matches('button, [class*="btn"], [class*="add"], [class*="remove"]') ||
            target.closest('button') || 
            target.closest('[class*="add"]')
        ) {
            scheduleUpdate();
        }
    });

    const observerTarget = document.querySelector('body');
    if (observerTarget) {
        const observer = new MutationObserver((mutations) => {
            let shouldUpdate = false;
            for (let mutation of mutations) {
                if (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0) {
                    shouldUpdate = true;
                    break;
                }
            }
            if (shouldUpdate) {
                scheduleUpdate();
            }
        });
        
        observer.observe(observerTarget, { 
            childList: true, 
            subtree: true
        });
    }
}
