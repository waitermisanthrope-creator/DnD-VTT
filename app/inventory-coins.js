// ==========================================
// --- УДОБНЫЙ КАЛЬКУЛЯТОР МОНЕТ С ЛОГОМ И КУРСАМИ ---
// ==========================================

function getCharacterCoins() {
  if (typeof currentCharacter === 'undefined' || !currentCharacter) return { cp: 0, sp: 0, ep: 0, gp: 0, pp: 0 };
  if (!currentCharacter.coins || typeof currentCharacter.coins !== 'object' || Array.isArray(currentCharacter.coins)) {
    currentCharacter.coins = { cp: 0, sp: 0, ep: 0, gp: 0, pp: 0 };
  }
  return currentCharacter.coins;
}

// Wallet amounts must be whole, non-negative safe integers. Treat blank/invalid
// input as zero, matching the calculator's existing empty-field behavior.
function normalizeCoinAmount(value) {
  const amount = typeof value === 'number' ? value : (String(value ?? '').trim() === '' ? 0 : Number(value));
  return Number.isSafeInteger(amount) && amount >= 0 ? amount : 0;
}

function readPositiveCoinRate(elementId, fallback) {
  const raw = document.getElementById(elementId)?.value;
  const value = raw == null || String(raw).trim() === '' ? fallback : Number(raw);
  return Number.isSafeInteger(value) && value > 0 ? value : fallback;
}

function updateCoinsFromInputs() {
  if (typeof currentCharacter === 'undefined' || !currentCharacter) return;
  
  const cpInput = document.getElementById('charCP') || document.getElementById('coinCP');
  const spInput = document.getElementById('charSP') || document.getElementById('coinSP');
  const epInput = document.getElementById('charEP') || document.getElementById('coinEP');
  const gpInput = document.getElementById('charGP') || document.getElementById('coinGP');
  const ppInput = document.getElementById('charPP') || document.getElementById('coinPP');

  const coins = getCharacterCoins();
  coins.cp = cpInput ? normalizeCoinAmount(cpInput.value) : normalizeCoinAmount(coins.cp);
  coins.sp = spInput ? normalizeCoinAmount(spInput.value) : normalizeCoinAmount(coins.sp);
  coins.ep = epInput ? normalizeCoinAmount(epInput.value) : normalizeCoinAmount(coins.ep);
  coins.gp = gpInput ? normalizeCoinAmount(gpInput.value) : normalizeCoinAmount(coins.gp);
  coins.pp = ppInput ? normalizeCoinAmount(ppInput.value) : normalizeCoinAmount(coins.pp);
  if (cpInput) cpInput.value = coins.cp;
  if (spInput) spInput.value = coins.sp;
  if (epInput) epInput.value = coins.ep;
  if (gpInput) gpInput.value = coins.gp;
  if (ppInput) ppInput.value = coins.pp;

  if (typeof autoSaveCurrentCharacter === 'function') {
    autoSaveCurrentCharacter();
  }
  updateCoinEquivalentPreview();
}

function initCoinCalculatorUI() {
  const targetParent = document.querySelector('.inventory-content-area') || 
                       document.querySelector('.inv-content') || 
                       document.getElementById('invCat_weapons')?.parentNode;

  let referenceNode = null;
  const allElements = document.querySelectorAll('div, section');
  for (let el of allElements) {
    if (el.textContent && (el.textContent.includes('Текущий КД') || el.textContent.includes('КД')) && !el.id.includes('coinCalculatorWidget')) {
      if (el.closest('[id*="inv"]') || el.closest('.inventory') || el.closest('[class*="inv"]')) {
        referenceNode = el;
        break;
      }
    }
  }

  if (!targetParent || document.getElementById('coinCalculatorWidget')) return;

  const calcWidget = document.createElement('div');
  calcWidget.id = 'coinCalculatorWidget';
  calcWidget.style.cssText = `
    background: #1e1e24;
    border: 1px solid #444;
    border-radius: 8px;
    padding: 10px;
    margin-bottom: 12px;
    box-sizing: border-box;
    font-size: 0.9em;
    color: #fff;
    width: 100%;
    clear: both;
  `;

  calcWidget.innerHTML = `
    <!-- Переключатели вкл/выкл платины и электрума -->
    <div style="display: flex; gap: 15px; margin-bottom: 8px; background: #121216; padding: 6px 8px; border-radius: 6px; font-size: 0.8em; align-items: center;">
      <span style="color: #aaa; font-weight: bold;">Монеты:</span>
      <label style="display: flex; align-items: center; gap: 4px; cursor: pointer; color: #e1f5fe;">
        <input type="checkbox" id="cc_togglePP" checked style="cursor: pointer;"> Пл (Платина)
      </label>
      <label style="display: flex; align-items: center; gap: 4px; cursor: pointer; color: #ab47bc;">
        <input type="checkbox" id="cc_toggleEP" checked style="cursor: pointer;"> Эл (Электрум)
      </label>
    </div>

    <!-- Конвертер валют с полной сеткой курсов D&D -->
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px; margin-bottom: 10px; background: #121216; padding: 6px; border-radius: 6px;">
      <div style="display: flex; align-items: center; gap: 4px; font-size: 0.8em;">
        <span style="color: #e1f5fe;">1 пл =</span>
        <input type="number" id="cc_ratePlat" value="10" style="width: 40px; background: #1e1e24; color: #fff; border: 1px solid #555; border-radius: 3px; padding: 3px; text-align: center; font-size: 0.9em;">
        <span style="color: #ffc107;">зол.</span>
      </div>
      <div style="display: flex; align-items: center; gap: 4px; font-size: 0.8em;">
        <span style="color: #ffc107;">1 зол =</span>
        <input type="number" id="cc_rateGold" value="2" style="width: 40px; background: #1e1e24; color: #fff; border: 1px solid #555; border-radius: 3px; padding: 3px; text-align: center; font-size: 0.9em;">
        <span style="color: #ab47bc;">эл.</span>
      </div>
      <div style="display: flex; align-items: center; gap: 4px; font-size: 0.8em;">
        <span style="color: #ffc107;">1 зол =</span>
        <input type="number" id="cc_rateSilver" value="10" style="width: 40px; background: #1e1e24; color: #fff; border: 1px solid #555; border-radius: 3px; padding: 3px; text-align: center; font-size: 0.9em;">
        <span style="color: #e0e0e0;">сер.</span>
      </div>
      <div style="display: flex; align-items: center; gap: 4px; font-size: 0.8em;">
        <span style="color: #e0e0e0;">1 сер =</span>
        <input type="number" id="cc_rateCopper" value="10" style="width: 40px; background: #1e1e24; color: #fff; border: 1px solid #555; border-radius: 3px; padding: 3px; text-align: center; font-size: 0.9em;">
        <span style="color: #ff7043;">мед.</span>
      </div>
    </div>

    <div style="font-weight: bold; color: #ffc107; font-size: 1.05em; margin-bottom: 8px; border-bottom: 1px solid #333; padding-bottom: 4px;">
      💰 Мои монеты 🪙
    </div>

    <!-- Текущие монеты персонажа -->
    <div id="cc_walletGrid" style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 4px; margin-bottom: 10px; text-align: center;">
      <div id="cc_colPP" style="background: #121216; padding: 4px; border-radius: 6px; border: 1px solid #333;">
        <span style="font-size: 0.7em; color: #aaa; display: block; margin-bottom: 2px;">Пл</span>
        <input type="number" id="charPP" value="0" style="width: 100%; background: #1e1e24; color: #e1f5fe; border: 1px solid #444; border-radius: 4px; padding: 4px; text-align: center; font-weight: bold; box-sizing: border-box; font-size: 0.85em;">
      </div>
      <div style="background: #121216; padding: 4px; border-radius: 6px; border: 1px solid #333;">
        <span style="font-size: 0.7em; color: #aaa; display: block; margin-bottom: 2px;">Зл</span>
        <input type="number" id="charGP" value="0" style="width: 100%; background: #1e1e24; color: #ffc107; border: 1px solid #444; border-radius: 4px; padding: 4px; text-align: center; font-weight: bold; box-sizing: border-box; font-size: 0.85em;">
      </div>
      <div id="cc_colEP" style="background: #121216; padding: 4px; border-radius: 6px; border: 1px solid #333;">
        <span style="font-size: 0.7em; color: #aaa; display: block; margin-bottom: 2px;">Эл</span>
        <input type="number" id="charEP" value="0" style="width: 100%; background: #1e1e24; color: #ab47bc; border: 1px solid #444; border-radius: 4px; padding: 4px; text-align: center; font-weight: bold; box-sizing: border-box; font-size: 0.85em;">
      </div>
      <div style="background: #121216; padding: 4px; border-radius: 6px; border: 1px solid #333;">
        <span style="font-size: 0.7em; color: #aaa; display: block; margin-bottom: 2px;">Сл</span>
        <input type="number" id="charSP" value="0" style="width: 100%; background: #1e1e24; color: #e0e0e0; border: 1px solid #444; border-radius: 4px; padding: 4px; text-align: center; font-weight: bold; box-sizing: border-box; font-size: 0.85em;">
      </div>
      <div style="background: #121216; padding: 4px; border-radius: 6px; border: 1px solid #333;">
        <span style="font-size: 0.7em; color: #aaa; display: block; margin-bottom: 2px;">Мл</span>
        <input type="number" id="charCP" value="0" style="width: 100%; background: #1e1e24; color: #ff7043; border: 1px solid #444; border-radius: 4px; padding: 4px; text-align: center; font-weight: bold; box-sizing: border-box; font-size: 0.85em;">
      </div>
    </div>

    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; border-top: 1px solid #333; padding-top: 8px;">
      <span style="font-weight: bold; color: #ffc107; font-size: 0.95em;">🧮 Управление кошельком</span>
    </div>

    <!-- Поля ввода для добавления / вычитания -->
    <div id="cc_inputGrid" style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 4px; margin-bottom: 8px;">
      <div id="cc_inputColPP">
        <label style="font-size: 0.65em; color: #aaa; display: block; margin-bottom: 2px; text-align: center;">Пл (PP)</label>
        <input type="number" id="cc_inputPP" value="0" placeholder="0" style="width: 100%; background: #121216; color: #e1f5fe; border: 1px solid #444; border-radius: 4px; padding: 6px 2px; text-align: center; font-weight: bold; box-sizing: border-box; font-size: 0.8em;">
      </div>
      <div>
        <label style="font-size: 0.65em; color: #aaa; display: block; margin-bottom: 2px; text-align: center;">Зл (GP)</label>
        <input type="number" id="cc_inputGP" value="0" placeholder="0" style="width: 100%; background: #121216; color: #ffc107; border: 1px solid #444; border-radius: 4px; padding: 6px 2px; text-align: center; font-weight: bold; box-sizing: border-box; font-size: 0.8em;">
      </div>
      <div id="cc_inputColEP">
        <label style="font-size: 0.65em; color: #aaa; display: block; margin-bottom: 2px; text-align: center;">Эл (EP)</label>
        <input type="number" id="cc_inputEP" value="0" placeholder="0" style="width: 100%; background: #121216; color: #ab47bc; border: 1px solid #444; border-radius: 4px; padding: 6px 2px; text-align: center; font-weight: bold; box-sizing: border-box; font-size: 0.8em;">
      </div>
      <div>
        <label style="font-size: 0.65em; color: #aaa; display: block; margin-bottom: 2px; text-align: center;">Сл (SP)</label>
        <input type="number" id="cc_inputSP" value="0" placeholder="0" style="width: 100%; background: #121216; color: #e0e0e0; border: 1px solid #444; border-radius: 4px; padding: 6px 2px; text-align: center; font-weight: bold; box-sizing: border-box; font-size: 0.8em;">
      </div>
      <div>
        <label style="font-size: 0.65em; color: #aaa; display: block; margin-bottom: 2px; text-align: center;">Мл (CP)</label>
        <input type="number" id="cc_inputCP" value="0" placeholder="0" style="width: 100%; background: #121216; color: #ff7043; border: 1px solid #444; border-radius: 4px; padding: 6px 2px; text-align: center; font-weight: bold; box-sizing: border-box; font-size: 0.8em;">
      </div>
    </div>

    <!-- Переключатель операции и кнопка Посчитать -->
    <div style="display: flex; gap: 6px; margin-bottom: 8px;">
      <select id="cc_actionType" style="flex: 1; background: #2e7d32; color: #fff; border: none; border-radius: 4px; padding: 8px; font-weight: bold; cursor: pointer; font-size: 0.85em; outline: none;">
        <option value="add">➕ Добавить монеты</option>
        <option value="sub">➖ Вычесть (потратить)</option>
      </select>
      <button type="button" id="cc_btnCalculate" style="flex: 1; background: #2196F3; color: #fff; border: none; border-radius: 4px; padding: 8px; font-weight: bold; cursor: pointer; font-size: 0.85em;">Посчитать</button>
    </div>

    <!-- Информационная строка -->
    <div id="cc_infoEquivalent" style="font-size: 0.78em; color: #888; text-align: center; background: #121216; padding: 4px; border-radius: 4px; margin-bottom: 8px;">
      Сумма операции: 0 м
    </div>

    <!-- Шторка лога монет -->
    <div style="border-top: 1px solid #333; margin-top: 6px; padding-top: 6px;">
      <button type="button" id="cc_toggleLogBtn" style="width: 100%; background: #2a2a35; color: #ccc; border: 1px solid #444; border-radius: 4px; padding: 6px; font-size: 0.8em; cursor: pointer; text-align: left; display: flex; justify-content: space-between; align-items: center;">
        <span>📜 Лог транзакций кошелька</span>
        <span id="cc_logArrow">▼</span>
      </button>
      <div id="cc_logContainer" style="display: none; margin-top: 6px; background: #121216; border: 1px solid #333; border-radius: 4px; max-height: 120px; overflow-y: auto; padding: 6px; font-size: 0.75em; color: #aaa;">
        <div id="cc_logContent">История пуста</div>
      </div>
    </div>
  `;

  if (referenceNode && targetParent) {
    targetParent.insertBefore(calcWidget, referenceNode);
  } else if (targetParent) {
    targetParent.insertBefore(calcWidget, targetParent.firstChild);
  }

  syncCoinInputsFromCharacter();

  ['charPP', 'charGP', 'charEP', 'charSP', 'charCP', 'coinCP', 'coinSP', 'coinEP', 'coinGP', 'coinPP'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', updateCoinsFromInputs);
      el.addEventListener('change', updateCoinsFromInputs);
    }
  });

  document.getElementById('cc_btnCalculate').addEventListener('click', () => {
    updateCoinsFromInputs();
    const action = document.getElementById('cc_actionType').value;
    applyCoinOperation(action);
  });

  document.getElementById('cc_toggleLogBtn').addEventListener('click', () => {
    const logDiv = document.getElementById('cc_logContainer');
    const arrow = document.getElementById('cc_logArrow');
    if (logDiv.style.display === 'none') {
      logDiv.style.display = 'block';
      arrow.textContent = '▲';
    } else {
      logDiv.style.display = 'none';
      arrow.textContent = '▼';
    }
  });

  ['cc_inputPP', 'cc_inputGP', 'cc_inputEP', 'cc_inputSP', 'cc_inputCP', 'cc_ratePlat', 'cc_rateGold', 'cc_rateSilver', 'cc_rateCopper'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', updateCoinEquivalentPreview);
  });

  ['cc_togglePP', 'cc_toggleEP'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('change', () => {
        updateCoinVisibility();
        updateCoinEquivalentPreview();
      });
    }
  });

  updateCoinVisibility();
  updateCoinEquivalentPreview();
  renderCoinLog();
}

function updateCoinVisibility() {
  const showPP = document.getElementById('cc_togglePP')?.checked ?? true;
  const showEP = document.getElementById('cc_toggleEP')?.checked ?? true;

  const colPP = document.getElementById('cc_colPP');
  const inputColPP = document.getElementById('cc_inputColPP');
  const colEP = document.getElementById('cc_colEP');
  const inputColEP = document.getElementById('cc_inputColEP');

  if (colPP) colPP.style.display = showPP ? 'block' : 'none';
  if (inputColPP) inputColPP.style.display = showPP ? 'block' : 'none';
  if (colEP) colEP.style.display = showEP ? 'block' : 'none';
  if (inputColEP) inputColEP.style.display = showEP ? 'block' : 'none';

  const walletGrid = document.getElementById('cc_walletGrid');
  const inputGrid = document.getElementById('cc_inputGrid');
  
  let activeColsWallet = 3;
  if (showPP) activeColsWallet++;
  if (showEP) activeColsWallet++;

  if (walletGrid) walletGrid.style.gridTemplateColumns = `repeat(${activeColsWallet}, 1fr)`;
  if (inputGrid) inputGrid.style.gridTemplateColumns = `repeat(${activeColsWallet}, 1fr)`;

  if (!showPP) {
    const pInput = document.getElementById('cc_inputPP');
    if (pInput) pInput.value = 0;
  }
  if (!showEP) {
    const eInput = document.getElementById('cc_inputEP');
    if (eInput) eInput.value = 0;
  }
}

function syncCoinInputsFromCharacter() {
  if (typeof currentCharacter === 'undefined' || !currentCharacter) return;
  if (!currentCharacter.coins) {
    currentCharacter.coins = { cp: 0, sp: 0, ep: 0, gp: 0, pp: 0 };
  }
  const c = currentCharacter.coins;
  
  if (document.getElementById('charPP')) document.getElementById('charPP').value = c.pp || 0;
  if (document.getElementById('charGP')) document.getElementById('charGP').value = c.gp || 0;
  if (document.getElementById('charEP')) document.getElementById('charEP').value = c.ep || 0;
  if (document.getElementById('charSP')) document.getElementById('charSP').value = c.sp || 0;
  if (document.getElementById('charCP')) document.getElementById('charCP').value = c.cp || 0;
}

function getCoinMultipliers() {
  let pPerG = readPositiveCoinRate('cc_ratePlat', 10);
  let gPerE = readPositiveCoinRate('cc_rateGold', 2);
  let sPerG = readPositiveCoinRate('cc_rateSilver', 10);
  let cPerS = readPositiveCoinRate('cc_rateCopper', 10);

  let copperPerSilver = cPerS;
  let copperPerGold = sPerG * cPerS;
  let copperPerElectrum = Math.round(copperPerGold / gPerE);
  let copperPerPlat = copperPerGold * pPerG;

  // Extreme custom rates can overflow safe integer arithmetic. Fall back to
  // the standard D&D conversion rather than corrupting the character wallet.
  if (![copperPerSilver, copperPerGold, copperPerElectrum, copperPerPlat].every(Number.isSafeInteger) ||
      copperPerElectrum < 1 || copperPerGold < 1 || copperPerPlat < 1) {
    pPerG = 10; gPerE = 2; sPerG = 10; cPerS = 10;
    copperPerSilver = 10;
    copperPerGold = 100;
    copperPerElectrum = 50;
    copperPerPlat = 1000;
  }

  return { copperPerSilver, copperPerGold, copperPerElectrum, copperPerPlat };
}

function getCalculatorInputInCopper() {
  const showPP = document.getElementById('cc_togglePP')?.checked ?? true;
  const showEP = document.getElementById('cc_toggleEP')?.checked ?? true;

  const pp = showPP ? normalizeCoinAmount(document.getElementById('cc_inputPP')?.value) : 0;
  const gp = normalizeCoinAmount(document.getElementById('cc_inputGP')?.value);
  const ep = showEP ? normalizeCoinAmount(document.getElementById('cc_inputEP')?.value) : 0;
  const sp = normalizeCoinAmount(document.getElementById('cc_inputSP')?.value);
  const cp = normalizeCoinAmount(document.getElementById('cc_inputCP')?.value);
  
  const mults = getCoinMultipliers();

  const total = (pp * mults.copperPerPlat) +
                (gp * mults.copperPerGold) +
                (ep * mults.copperPerElectrum) +
                (sp * mults.copperPerSilver) +
                cp;
  return Number.isSafeInteger(total) ? total : NaN;
}

function updateCoinEquivalentPreview() {
  const info = document.getElementById('cc_infoEquivalent');
  if (!info) return;
  const totalCopper = getCalculatorInputInCopper();
  
  if (!Number.isSafeInteger(totalCopper) || totalCopper <= 0) {
    info.textContent = 'Сумма операции: 0';
    return;
  }

  const showPP = document.getElementById('cc_togglePP')?.checked ?? true;
  const showEP = document.getElementById('cc_toggleEP')?.checked ?? true;
  const mults = getCoinMultipliers();
  let rem = totalCopper;

  let p = 0;
  if (showPP) {
    p = Math.floor(rem / mults.copperPerPlat);
    rem %= mults.copperPerPlat;
  }

  const g = Math.floor(rem / mults.copperPerGold);
  rem %= mults.copperPerGold;

  let e = 0;
  if (showEP) {
    e = Math.floor(rem / mults.copperPerElectrum);
    rem %= mults.copperPerElectrum;
  }

  const s = Math.floor(rem / mults.copperPerSilver);
  const c = rem % mults.copperPerSilver;

  let parts = [];
  if (p > 0) parts.push(`${p} пл`);
  if (g > 0) parts.push(`${g} зл`);
  if (e > 0) parts.push(`${e} эл`);
  if (s > 0) parts.push(`${s} сер`);
  if (c > 0 || parts.length === 0) parts.push(`${c} мед`);

  info.textContent = `Сумма операции: ${parts.join(', ')} (${totalCopper} м)`;
}

function applyCoinOperation(action) {
  if (typeof currentCharacter === 'undefined' || !currentCharacter) {
    alert('Персонаж не загружен!');
    return;
  }

  const inputCopper = getCalculatorInputInCopper();
  if (!Number.isSafeInteger(inputCopper) || inputCopper <= 0) {
    alert('Введите корректную целую сумму больше нуля.');
    return;
  }

  const showPP = document.getElementById('cc_togglePP')?.checked ?? true;
  const showEP = document.getElementById('cc_toggleEP')?.checked ?? true;

  const ppVal = showPP ? normalizeCoinAmount(document.getElementById('cc_inputPP')?.value) : 0;
  const gpVal = normalizeCoinAmount(document.getElementById('cc_inputGP')?.value);
  const epVal = showEP ? normalizeCoinAmount(document.getElementById('cc_inputEP')?.value) : 0;
  const spVal = normalizeCoinAmount(document.getElementById('cc_inputSP')?.value);
  const cpVal = normalizeCoinAmount(document.getElementById('cc_inputCP')?.value);

  let coins = getCharacterCoins();
  const mults = getCoinMultipliers();

  let charTotalCopper = normalizeCoinAmount(coins.pp) * mults.copperPerPlat +
                        normalizeCoinAmount(coins.gp) * mults.copperPerGold +
                        normalizeCoinAmount(coins.ep) * mults.copperPerElectrum +
                        normalizeCoinAmount(coins.sp) * mults.copperPerSilver +
                        normalizeCoinAmount(coins.cp);
  if (!Number.isSafeInteger(charTotalCopper)) {
    alert('Баланс кошелька слишком велик для безопасного расчёта. Операция отменена.');
    return;
  }

  if (action === 'add') {
    charTotalCopper += inputCopper;
  } else if (action === 'sub') {
    charTotalCopper -= inputCopper;
    if (charTotalCopper < 0) {
      alert('❌ У персонажа недостаточно средств для списания!');
      return;
    }
  } else {
    alert('Неизвестный тип операции с монетами.');
    return;
  }
  if (!Number.isSafeInteger(charTotalCopper) || charTotalCopper < 0) {
    alert('Сумма выходит за безопасный диапазон. Операция отменена.');
    return;
  }

  let newPp = 0;
  let rem = charTotalCopper;

  if (showPP) {
    newPp = Math.floor(rem / mults.copperPerPlat);
    rem = rem % mults.copperPerPlat;
  }
  
  const newGp = Math.floor(rem / mults.copperPerGold);
  rem = rem % mults.copperPerGold;
  
  let newEp = 0;
  if (showEP) {
    newEp = Math.floor(rem / mults.copperPerElectrum);
    rem = rem % mults.copperPerElectrum;
  }
  
  const newSp = Math.floor(rem / mults.copperPerSilver);
  const newCp = rem % mults.copperPerSilver;

  currentCharacter.coins = { 
    cp: newCp, 
    sp: newSp, 
    ep: showEP ? newEp : 0, 
    gp: newGp + (!showPP ? newPp * (mults.copperPerPlat / mults.copperPerGold) : 0), 
    pp: showPP ? newPp : 0 
  };

  syncCoinInputsFromCharacter();

  if (!currentCharacter.coinLog) currentCharacter.coinLog = [];
  const now = new Date();
  const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
  
  currentCharacter.coinLog.unshift({
    time: timeStr,
    action: action,
    pp: ppVal,
    gp: gpVal,
    ep: epVal,
    sp: spVal,
    cp: cpVal,
    resultPp: currentCharacter.coins.pp,
    resultGp: currentCharacter.coins.gp,
    resultEp: currentCharacter.coins.ep,
    resultSp: currentCharacter.coins.sp,
    resultCp: currentCharacter.coins.cp
  });

  if (currentCharacter.coinLog.length > 25) currentCharacter.coinLog.pop();

  if (typeof autoSaveCurrentCharacter === 'function') {
    autoSaveCurrentCharacter();
  }

  ['cc_inputPP', 'cc_inputGP', 'cc_inputEP', 'cc_inputSP', 'cc_inputCP'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = 0;
  });

  updateCoinEquivalentPreview();
  renderCoinLog();
  if (typeof renderInventory === 'function') renderInventory();
}

function renderCoinLog() {
  const logContent = document.getElementById('cc_logContent');
  if (!logContent) return;

  if (typeof currentCharacter === 'undefined' || !currentCharacter || !currentCharacter.coinLog || currentCharacter.coinLog.length === 0) {
    logContent.innerHTML = 'История пуста';
    return;
  }

  let html = '';
  currentCharacter.coinLog.forEach(entry => {
    const sign = entry.action === 'add' ? '+' : '-';
    const color = entry.action === 'add' ? '#4CAF50' : '#e53935';
    
    let parts = [];
    if (entry.pp) parts.push(`${entry.pp}пл`);
    if (entry.gp) parts.push(`${entry.gp}зл`);
    if (entry.ep) parts.push(`${entry.ep}эл`);
    if (entry.sp) parts.push(`${entry.sp}сер`);
    if (entry.cp) parts.push(`${entry.cp}мед`);
    const actionStr = parts.join(' ') || '0';

    html += `<div style="border-bottom: 1px solid #222; padding: 3px 0;">
      <span style="color: #777;">[${entry.time}]</span> 
      <span style="color: ${color}; font-weight: bold;">${sign}${actionStr}</span>
      <span style="color: #aaa; display: block; font-size: 0.9em; padding-left: 2px;">➔ Стало: ${entry.resultPp ? entry.resultPp + 'пл ' : ''}${entry.resultGp}зл ${entry.resultEp ? entry.resultEp + 'эл ' : ''}${entry.resultSp}сер ${entry.resultCp}мед</span>
    </div>`;
  });
  logContent.innerHTML = html;
}
