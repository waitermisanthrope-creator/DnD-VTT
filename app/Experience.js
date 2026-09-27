/**
 * Модуль управления опытом персонажа и таблица прогрессии опыта по правилам D&D 5e (PHB)
 */

// Официальная таблица опыта D&D 5e
window.DND_EXP_TABLE = [
  { level: 1, exp: 0 },
  { level: 2, exp: 300 },
  { level: 3, exp: 900 },
  { level: 4, exp: 2700 },
  { level: 5, exp: 6500 },
  { level: 6, exp: 14000 },
  { level: 7, exp: 23000 },
  { level: 8, exp: 34000 },
  { level: 9, exp: 48000 },
  { level: 10, exp: 64000 },
  { level: 11, exp: 85000 },
  { level: 12, exp: 100000 },
  { level: 13, exp: 120000 },
  { level: 14, exp: 140000 },
  { level: 15, exp: 165000 },
  { level: 16, exp: 195000 },
  { level: 17, exp: 225000 },
  { level: 18, exp: 265000 },
  { level: 19, exp: 305000 },
  { level: 20, exp: 355000 }
];

window.openExperienceModal = function() {
  if (typeof currentCharacter === 'undefined' || !currentCharacter) return;
  if (typeof currentCharacter.exp === 'undefined') currentCharacter.exp = 0;
  updateExperienceModalUI();
  const modal = document.getElementById('experienceModal');
  if (modal) modal.style.display = 'flex';
};

window.closeExperienceModal = function() {
  const modal = document.getElementById('experienceModal');
  if (modal) modal.style.display = 'none';
};

window.getCharacterCurrentLevel = function() {
  if (!currentCharacter) return 1;
  if (typeof window.getCharacterLevel === 'function') return window.getCharacterLevel();
  if (!currentCharacter.class) return 1;
  const match = String(currentCharacter.class).match(/(\d+)$/);
  return match ? parseInt(match[1], 10) : 1;
};

window.getLevelByExp = function(exp) {
  let currentLvl = 1;
  for (let i = DND_EXP_TABLE.length - 1; i >= 0; i--) {
    if (exp >= DND_EXP_TABLE[i].exp) {
      currentLvl = DND_EXP_TABLE[i].level;
      break;
    }
  }
  return currentLvl;
};

window.updateExperienceModalUI = function() {
  if (!currentCharacter) return;
  const currentExp = parseInt(currentCharacter.exp, 10) || 0;
  const currentLvl = getCharacterCurrentLevel();
  let currentLevelExpReq = 0;
  let nextLevelExpReq = DND_EXP_TABLE[DND_EXP_TABLE.length - 1].exp;
  for (let i = 0; i < DND_EXP_TABLE.length; i++) {
    if (DND_EXP_TABLE[i].level === currentLvl) currentLevelExpReq = DND_EXP_TABLE[i].exp;
    if (DND_EXP_TABLE[i].level === currentLvl + 1) {
      nextLevelExpReq = DND_EXP_TABLE[i].exp;
      break;
    }
  }
  const elCurLvl = document.getElementById('expModalCurrentLevel');
  const elCurExp = document.getElementById('expModalCurrentExp');
  const elNextExp = document.getElementById('expModalNextExp');
  const elInputCur = document.getElementById('expInputCurrent');
  const elBar = document.getElementById('expProgressBar');
  if (elCurLvl) elCurLvl.innerText = currentLvl;
  if (elCurExp) elCurExp.innerText = currentExp;
  if (elNextExp) elNextExp.innerText = currentLvl >= 20 ? 'MAX' : nextLevelExpReq;
  if (elInputCur) elInputCur.value = currentExp;
  let progressPercent = 100;
  if (currentLvl < 20) {
    const spanTotal = nextLevelExpReq - currentLevelExpReq;
    const spanCurrent = Math.max(0, currentExp - currentLevelExpReq);
    progressPercent = spanTotal > 0 ? Math.min(100, Math.max(0, (spanCurrent / spanTotal) * 100)) : 100;
  }
  if (elBar) elBar.style.width = progressPercent + '%';
  const expBasedLevel = getLevelByExp(currentExp);
  const levelUpBtn = document.getElementById('expLevelUpBtn');
  if (levelUpBtn) {
    if (expBasedLevel > currentLvl && currentLvl < 20) {
      levelUpBtn.style.display = 'block';
      levelUpBtn.innerText = `⬆️ Доступно повышение до уровня ${expBasedLevel}!`;
    } else {
      levelUpBtn.style.display = 'none';
    }
  }
};

window.onExpInputChange = function() {
  const inputElem = document.getElementById('expInputCurrent');
  if (!inputElem || !currentCharacter) return;
  const inputVal = parseInt(inputElem.value, 10);
  currentCharacter.exp = isNaN(inputVal) ? 0 : Math.max(0, inputVal);
  updateExperienceModalUI();
  if (typeof autoSaveCurrentCharacter === 'function') autoSaveCurrentCharacter();
};

window.addExperienceValue = function() {
  const calcInput = document.getElementById('expCalcInput');
  if (!calcInput || !currentCharacter) return;
  const addVal = parseInt(calcInput.value, 10);
  if (isNaN(addVal) || addVal <= 0) return;
  currentCharacter.exp = (parseInt(currentCharacter.exp, 10) || 0) + addVal;
  calcInput.value = '';
  updateExperienceModalUI();
  if (typeof autoSaveCurrentCharacter === 'function') autoSaveCurrentCharacter();
};

window.subtractExperienceValue = function() {
  const calcInput = document.getElementById('expCalcInput');
  if (!calcInput || !currentCharacter) return;
  const subVal = parseInt(calcInput.value, 10);
  if (isNaN(subVal) || subVal <= 0) return;
  currentCharacter.exp = Math.max(0, (parseInt(currentCharacter.exp, 10) || 0) - subVal);
  calcInput.value = '';
  updateExperienceModalUI();
  if (typeof autoSaveCurrentCharacter === 'function') autoSaveCurrentCharacter();
};

window.openLevelUpModalFromExp = function() {
  closeExperienceModal();
  if (typeof openLevelUpModal === 'function') openLevelUpModal();
};
