/**
 * Модуль управления обоями, прозрачностью интерфейса, модалок, цветностью фона, затемнением и автосменой (wallpapers.js)
 */

// V70.34.13: the legacy ./wallpapers/*.png directory is not part of the
// deployable update manifest, so those URLs became 404 after an in-app update.
// Use artwork that is guaranteed to ship with the current app instead.
const wallpaperFallbackSources = [
  './app/assets/ui/forest_green.jpg',
  './app/assets/ui/forest_burned.jpg',
  './app/assets/ui/dragon.png',
  './app/assets/ui/dragon_fire.png',
  './app/assets/ui/update_scene_background.svg',
  './app/assets/ui/update_scene_forest_green.svg',
  './app/assets/ui/update_scene_forest_burned.svg',
  './app/assets/ui/update_scene_dragon.svg',
  './app/assets/ui/loader_forest.svg',
  './app/assets/ui/loader_forest_burning.svg',
  './app/data/classes/Alchemist.png',
  './app/data/classes/BloodHunter.png'
];

const availableWallpapers = [];
for (let i = 1; i <= 30; i++) {
  if (i === 20) continue;
  availableWallpapers.push({
    name: `Обои №${i}`,
    file: wallpaperFallbackSources[(i - 1) % wallpaperFallbackSources.length]
  });
}

// Предопределенная палитра цветов для фона карточек и модальных окон
const BG_COLOR_PALETTE = {
  dark: { name: 'Тёмно-серый (Стандарт)', hex: '#1e1e1e' },
  black: { name: 'Угольно-чёрный', hex: '#121212' },
  navy: { name: 'Тёмно-синий (Магия)', hex: '#101827' },
  purple: { name: 'Некротический (Фиолетовый)', hex: '#1a1025' },
  maroon: { name: 'Глубокий бордовый', hex: '#251010' },
  emerald: { name: 'Тёмный изумруд', hex: '#0f2318' }
};

let autoRotateTimer = null;
let currentWallpaperIndex = 0;

/**
 * Преобразование HEX в RGB для подстановки в rgba()
 */
function hexToRgb(hex) {
  let c = hex.replace('#', '');
  if (c.length === 3) {
    c = c.split('').map(x => x + x).join('');
  }
  const num = parseInt(c, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  };
}

/**
 * Функция скрытия/показа всего интерфейса для просмотра артов
 */
let isInterfaceHidden = false;

function toggleInterfaceVisibility() {
  isInterfaceHidden = !isInterfaceHidden;
  
  const elementsToHide = document.querySelectorAll('.card, #characterCreationScreen, .tabs-nav > div:first-child');
  
  elementsToHide.forEach(el => {
    el.style.transition = 'opacity 0.3s ease';
    el.style.opacity = isInterfaceHidden ? '0' : '1';
    el.style.pointerEvents = isInterfaceHidden ? 'none' : 'auto';
  });

  const tabsNav = document.querySelector('.tabs-nav');
  if (tabsNav) {
    if (isInterfaceHidden) {
      tabsNav.style.background = 'transparent';
      tabsNav.style.borderBottom = 'none';
      tabsNav.style.boxShadow = 'none';
    } else {
      tabsNav.style.background = '';
      tabsNav.style.borderBottom = '';
      tabsNav.style.boxShadow = '';
    }
  }

  const eyeBtn = document.querySelector('.tabs-nav button[title*="Скрыть"]');
  if (eyeBtn) {
    eyeBtn.style.opacity = '1';
    eyeBtn.style.pointerEvents = 'auto';
    eyeBtn.style.visibility = 'visible';
    eyeBtn.innerHTML = isInterfaceHidden ? '👁️‍🗨️' : '👁️';
  }

  const dimLayer = document.getElementById('wallpaperDimLayer');
  if (dimLayer) {
    if (!window.savedDimBeforeHide && isInterfaceHidden) {
      window.savedDimBeforeHide = dimLayer.style.backgroundColor;
      dimLayer.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    } else if (!isInterfaceHidden && window.savedDimBeforeHide) {
      dimLayer.style.backgroundColor = window.savedDimBeforeHide;
      window.savedDimBeforeHide = null;
    }
  }
}

// Инициализация при старте приложения
function initWallpaperModule() {
  if (!document.getElementById('wallpaperFadeOverlay')) {
    const overlay = document.createElement('div');
    overlay.id = 'wallpaperFadeOverlay';
    overlay.style.cssText = `
      position: fixed;
      top: 0; left: 0; width: 100%; height: 100%;
      background: #000;
      opacity: 0;
      pointer-events: none;
      z-index: -1;
      transition: opacity 1.5s ease-in-out;
    `;
    document.body.prepend(overlay);
  }

  const savedBg = localStorage.getItem('dnd_selected_wallpaper');
  if (savedBg) {
    const foundIdx = availableWallpapers.findIndex(w => w.file === savedBg);
    if (foundIdx !== -1) currentWallpaperIndex = foundIdx;
    applyWallpaper(savedBg, false);
  } else {
    applyWallpaper(availableWallpapers[0].file, false);
  }

  initUIPTransparency();
  initModalTransparency();
  initWallpaperDimming();

  let autoRotateState = localStorage.getItem('dnd_autorotate_enabled');
  let intervalVal = localStorage.getItem('dnd_autorotate_interval');

  if (autoRotateState === null) {
    localStorage.setItem('dnd_autorotate_enabled', 'true');
    localStorage.setItem('dnd_autorotate_interval', '0.25');
    autoRotateState = 'true';
    intervalVal = '0.25';
  }

  if (autoRotateState === 'true') {
    const minutes = parseFloat(intervalVal) || 0.25;
    startAutoRotateWallpapers(minutes);
  }
}

// Применение обоев
function applyWallpaper(filePath, withFade = false) {
  const bgBody = document.body;
  
  if (withFade) {
    const overlay = document.getElementById('wallpaperFadeOverlay');
    if (overlay) {
      overlay.style.opacity = '1';
      setTimeout(() => {
        bgBody.style.backgroundImage = `url('${filePath}')`;
        bgBody.style.backgroundSize = 'cover';
        bgBody.style.backgroundPosition = 'center';
        bgBody.style.backgroundAttachment = 'fixed';
        setTimeout(() => {
          overlay.style.opacity = '0';
        }, 100);
      }, 1500);
    } else {
      bgBody.style.backgroundImage = `url('${filePath}')`;
    }
  } else {
    bgBody.style.backgroundImage = `url('${filePath}')`;
    bgBody.style.backgroundSize = 'cover';
    bgBody.style.backgroundPosition = 'center';
    bgBody.style.backgroundAttachment = 'fixed';
  }

  localStorage.setItem('dnd_selected_wallpaper', filePath);
  const found = availableWallpapers.findIndex(w => w.file === filePath);
  if (found !== -1) currentWallpaperIndex = found;
  
  updateActiveWallpaperThumbnail(filePath);
}

// Прозрачность и Цвет основного интерфейса
function initUIPTransparency() {
  const savedOpacity = localStorage.getItem('dnd_ui_opacity') !== null ? localStorage.getItem('dnd_ui_opacity') : '0.90';
  const savedColor = localStorage.getItem('dnd_ui_color') || '#1e1e1e';
  applyUiStyle(savedOpacity, savedColor);
}

function applyUiStyle(opacityVal, colorHex) {
  if (opacityVal !== undefined && opacityVal !== null) localStorage.setItem('dnd_ui_opacity', opacityVal);
  if (colorHex) localStorage.setItem('dnd_ui_color', colorHex);

  const opacity = localStorage.getItem('dnd_ui_opacity') || '0.90';
  const hex = localStorage.getItem('dnd_ui_color') || '#1e1e1e';
  const { r, g, b } = hexToRgb(hex);
  
  let styleTag = document.getElementById('dynamicUiOpacityStyle');
  if (!styleTag) {
    styleTag = document.createElement('style');
    styleTag.id = 'dynamicUiOpacityStyle';
    document.head.appendChild(styleTag);
  }
  
  styleTag.innerHTML = `
    .card, .tabs-nav, #characterCreationScreen .card {
      background-color: rgba(${r}, ${g}, ${b}, ${opacity}) !important;
      backdrop-filter: blur(6px);
    }
  `;
}

// Прозрачность и Цвет модальных окон
function initModalTransparency() {
  const savedOpacity = localStorage.getItem('dnd_modal_opacity') !== null ? localStorage.getItem('dnd_modal_opacity') : '0.95';
  const savedColor = localStorage.getItem('dnd_modal_color') || '#1e1e1e';
  applyModalStyle(savedOpacity, savedColor);
}

function applyModalStyle(opacityVal, colorHex) {
  if (opacityVal !== undefined && opacityVal !== null) localStorage.setItem('dnd_modal_opacity', opacityVal);
  if (colorHex) localStorage.setItem('dnd_modal_color', colorHex);

  const opacity = localStorage.getItem('dnd_modal_opacity') || '0.95';
  const hex = localStorage.getItem('dnd_modal_color') || '#1e1e1e';
  const { r, g, b } = hexToRgb(hex);

  let styleTag = document.getElementById('dynamicModalOpacityStyle');
  if (!styleTag) {
    styleTag = document.createElement('style');
    styleTag.id = 'dynamicModalOpacityStyle';
    document.head.appendChild(styleTag);
  }
  
  styleTag.innerHTML = `
    #settingsModal > div, 
    #wallpapersModal > div, 
    #customItemModal > div, 
    #addItemModal > div, 
    #customRaceModal .card,
    #customAlertModal > div {
      background-color: rgba(${r}, ${g}, ${b}, ${opacity}) !important;
      backdrop-filter: blur(6px);
    }
  `;
}

function initWallpaperDimming() {
  const savedDim = localStorage.getItem('dnd_wallpaper_dim') || '0.4';
  applyWallpaperDim(savedDim);
}

function applyWallpaperDim(val) {
  localStorage.setItem('dnd_wallpaper_dim', val);
  
  let dimLayer = document.getElementById('wallpaperDimLayer');
  if (!dimLayer) {
    dimLayer = document.createElement('div');
    dimLayer.id = 'wallpaperDimLayer';
    dimLayer.style.cssText = `
      position: fixed;
      top: 0; left: 0; width: 100%; height: 100%;
      pointer-events: none;
      z-index: -1;
      transition: background 0.3s;
    `;
    document.body.prepend(dimLayer);
  }
  dimLayer.style.backgroundColor = `rgba(0, 0, 0, ${val})`;
}

function startAutoRotateWallpapers(minutes) {
  if (autoRotateTimer) clearInterval(autoRotateTimer);
  
  const ms = minutes * 60 * 1000;
  autoRotateTimer = setInterval(() => {
    currentWallpaperIndex = (currentWallpaperIndex + 1) % availableWallpapers.length;
    applyWallpaper(availableWallpapers[currentWallpaperIndex].file, true);
  }, ms);
}

function toggleAutoRotate(isEnabled, minutesVal) {
  localStorage.setItem('dnd_autorotate_enabled', isEnabled ? 'true' : 'false');
  if (isEnabled) {
    const mins = parseFloat(minutesVal) || 0.25;
    localStorage.setItem('dnd_autorotate_interval', mins);
    startAutoRotateWallpapers(mins);
  } else {
    if (autoRotateTimer) clearInterval(autoRotateTimer);
  }
}

function updateActiveWallpaperThumbnail(filePath) {
  const thumbs = document.querySelectorAll('.wp-thumb-card');
  thumbs.forEach(card => {
    if (card.dataset.file === filePath) {
      card.style.borderColor = '#ff9800';
      card.style.boxShadow = '0 0 8px rgba(255,152,0,0.6)';
    } else {
      card.style.borderColor = '#444';
      card.style.boxShadow = 'none';
    }
  });
}

function openWallpapersModal() {
  let modal = document.getElementById('wallpapersModal');
  
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'wallpapersModal';
    modal.style.cssText = `
      display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0, 0, 0, 0.85); z-index: 20010; justify-content: center; align-items: center; overflow: hidden; touch-action: auto;
      padding: 15px; box-sizing: border-box; backdrop-filter: blur(4px);
    `;
    document.body.appendChild(modal);
  }

  const currentOpacity = localStorage.getItem('dnd_ui_opacity') !== null ? localStorage.getItem('dnd_ui_opacity') : '0.90';
  const currentColor = localStorage.getItem('dnd_ui_color') || '#1e1e1e';
  
  const currentModalOpacity = localStorage.getItem('dnd_modal_opacity') !== null ? localStorage.getItem('dnd_modal_opacity') : '0.95';
  const currentModalColor = localStorage.getItem('dnd_modal_color') || '#1e1e1e';

  const currentDim = localStorage.getItem('dnd_wallpaper_dim') || '0.4';
  const isAutoOn = localStorage.getItem('dnd_autorotate_enabled') === 'true';
  const autoInterval = localStorage.getItem('dnd_autorotate_interval') || '0.25';
  const activeWp = localStorage.getItem('dnd_selected_wallpaper') || availableWallpapers[0].file;

  // Опции для селекторов цвета
  const uiColorOptions = Object.keys(BG_COLOR_PALETTE).map(key => {
    const item = BG_COLOR_PALETTE[key];
    const selected = item.hex.toLowerCase() === currentColor.toLowerCase() ? 'selected' : '';
    return `<option value="${item.hex}" ${selected}>${item.name}</option>`;
  }).join('');

  const modalColorOptions = Object.keys(BG_COLOR_PALETTE).map(key => {
    const item = BG_COLOR_PALETTE[key];
    const selected = item.hex.toLowerCase() === currentModalColor.toLowerCase() ? 'selected' : '';
    return `<option value="${item.hex}" ${selected}>${item.name}</option>`;
  }).join('');

  let wallpapersGridHtml = '';
  availableWallpapers.forEach(wp => {
    const isActive = wp.file === activeWp;
    wallpapersGridHtml += `
      <div class="wp-thumb-card" data-file="${wp.file}" onclick="applyWallpaper('${wp.file}', true)" style="
        background: #252525; border: 2px solid ${isActive ? '#ff9800' : '#444'}; border-radius: 6px; 
        cursor: pointer; overflow: hidden; display: flex; flex-direction: column; transition: 0.2s;
        box-shadow: ${isActive ? '0 0 8px rgba(255,152,0,0.6)' : 'none'};
      ">
        <div style="width: 100%; height: 65px; background: url('${wp.file}') center/cover no-repeat; background-color: #111;"></div>
        <div style="padding: 4px; text-align: center; font-size: 0.75em; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
          ${wp.name}
        </div>
      </div>
    `;
  });

  modal.innerHTML = `
    <div style="background: #1e1e1e; padding: 22px; border-radius: 10px; width: 100%; max-width: 500px; border: 1px solid #444; box-shadow: 0 10px 25px rgba(0,0,0,0.5); color: #fff; max-height: calc(100dvh - 30px); max-height: 90vh; overflow-y: auto; overflow-x: hidden; -webkit-overflow-scrolling: touch; overscroll-behavior: contain; touch-action: pan-y;">
      
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #444; padding-bottom: 10px; margin-bottom: 15px;">
        <h3 style="margin: 0; color: #ff9800; font-size: 1.2em;">🖼️ Графические настройки</h3>
        <button onclick="closeWallpapersModal()" style="background: #e53935; color: #fff; border: none; padding: 6px 10px; border-radius: 6px; cursor: pointer; font-weight: bold;">✕</button>
      </div>

      <div style="display: flex; flex-direction: column; gap: 16px;">
        
        <!-- Настройки карточек интерфейса -->
        <div style="background: #252525; padding: 12px; border-radius: 6px; border: 1px solid #333;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
            <span style="font-size: 0.9em; font-weight: bold;">Прозрачность интерфейса</span>
            <span id="uiOpacityVal" style="color: #ff9800; font-size: 0.9em;">${Math.round(currentOpacity * 100)}%</span>
          </div>
          <input type="range" min="0.0" max="1.0" step="0.05" value="${currentOpacity}" style="width: 100%; cursor: pointer; margin-bottom: 10px;" oninput="applyUiStyle(this.value, null); document.getElementById('uiOpacityVal').innerText = Math.round(this.value * 100) + '%'">
          
          <div style="display: flex; flex-direction: column; gap: 4px;">
            <span style="font-size: 0.8em; color: #aaa;">Цвет фона интерфейса:</span>
            <select onchange="applyUiStyle(null, this.value)" style="width: 100%; padding: 6px; background: #1e1e1e; color: #fff; border: 1px solid #444; border-radius: 4px; cursor: pointer;">
              ${uiColorOptions}
            </select>
          </div>
        </div>

        <!-- Настройки модальных окон -->
        <div style="background: #252525; padding: 12px; border-radius: 6px; border: 1px solid #333;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
            <span style="font-size: 0.9em; font-weight: bold;">Прозрачность модальных окон</span>
            <span id="modalOpacityVal" style="color: #ff9800; font-size: 0.9em;">${Math.round(currentModalOpacity * 100)}%</span>
          </div>
          <input type="range" min="0.1" max="1.0" step="0.05" value="${currentModalOpacity}" style="width: 100%; cursor: pointer; margin-bottom: 10px;" oninput="applyModalStyle(this.value, null); document.getElementById('modalOpacityVal').innerText = Math.round(this.value * 100) + '%'">
          
          <div style="display: flex; flex-direction: column; gap: 4px;">
            <span style="font-size: 0.8em; color: #aaa;">Цвет фона модальных окон:</span>
            <select onchange="applyModalStyle(null, this.value)" style="width: 100%; padding: 6px; background: #1e1e1e; color: #fff; border: 1px solid #444; border-radius: 4px; cursor: pointer;">
              ${modalColorOptions}
            </select>
          </div>
        </div>

        <!-- Затемнение обоев -->
        <div style="background: #252525; padding: 12px; border-radius: 6px; border: 1px solid #333;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
            <span style="font-size: 0.9em; font-weight: bold;">Затемнение обоев</span>
            <span id="wallpaperDimVal" style="color: #ff9800; font-size: 0.9em;">${Math.round(currentDim * 100)}%</span>
          </div>
          <input type="range" min="0.0" max="0.85" step="0.05" value="${currentDim}" style="width: 100%; cursor: pointer;" oninput="applyWallpaperDim(this.value); document.getElementById('wallpaperDimVal').innerText = Math.round(this.value * 100) + '%'">
        </div>

        <!-- Автосмена -->
        <div style="background: #252525; padding: 12px; border-radius: 6px; border: 1px solid #333;">
          <label style="display: flex; align-items: center; gap: 10px; cursor: pointer; margin-bottom: 8px;">
            <input type="checkbox" id="wpAutoToggle" ${isAutoOn ? 'checked' : ''} onchange="toggleAutoRotate(this.checked, document.getElementById('wpIntervalInput').value)" style="width: 18px; height: 18px; cursor: pointer;">
            <span style="font-size: 0.9em; font-weight: bold;">Автосмена обоев</span>
          </label>
          <div style="display: flex; align-items: center; gap: 8px; margin-left: 28px;">
            <span style="font-size: 0.8em; color: #aaa;">Каждых (минут):</span>
            <input type="number" id="wpIntervalInput" value="${autoInterval}" min="0.1" step="0.1" style="width: 70px; padding: 4px; background: #1e1e1e; color: #fff; border: 1px solid #555; border-radius: 4px; text-align: center;" onchange="toggleAutoRotate(document.getElementById('wpAutoToggle').checked, this.value)">
          </div>
        </div>

        <!-- Плитка выбора -->
        <div style="background: #252525; padding: 12px; border-radius: 6px; border: 1px solid #333;">
          <div style="font-size: 0.9em; font-weight: bold; margin-bottom: 8px; color: #ff9800;">🖼️ Выбрать вручную (Плитка)</div>
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; max-height: 180px; overflow-y: auto; padding-right: 4px;">
            ${wallpapersGridHtml}
          </div>
        </div>

      </div>

      <div style="margin-top: 20px; display: flex; justify-content: flex-end;">
        <button onclick="closeWallpapersModal()" class="btn-action" style="background: #444; color: #fff; padding: 10px 16px; border-radius: 6px; cursor: pointer;">Закрыть</button>
      </div>

    </div>
  `;

  modal.style.display = 'flex';
  // Android WebView: keep the panel as the only vertical scroller.
  const panel = modal.firstElementChild;
  if (panel) {
    panel.scrollTop = 0;
    panel.style.overflowY = 'auto';
    panel.style.overflowX = 'hidden';
    panel.style.webkitOverflowScrolling = 'touch';
    panel.style.touchAction = 'pan-y';
    panel.style.maxHeight = 'calc(100dvh - 30px)';
  }
}

function closeWallpapersModal() {
  const modal = document.getElementById('wallpapersModal');
  if (modal) modal.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', initWallpaperModule);