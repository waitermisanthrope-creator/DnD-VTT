/**
 * Параметры иконки приложения.
 * Web-слой показывает все PNG из app/assets/dice.
 * Android-native слой фактически переключает launcher activity-alias.
 */
(function(global){
  const DEFAULT_ICON = {
    id: 'default',
    label: 'Стандартная иконка',
    src: './icon_previews/default.png'
  };
  const DICE_ICONS = [
  {
    "id": "dice_01",
    "name": "ChatGPT Image Sep 30, 2026, 07_08_07 PM.png",
    "label": "Куб 1",
    "src": "./app/assets/dice/ChatGPT%20Image%20Sep%2030%2C%202026%2C%2007_08_07%20PM.png"
  },
  {
    "id": "dice_02",
    "name": "ChatGPT Image Sep 30, 2026, 07_08_30 PM.png",
    "label": "Куб 2",
    "src": "./app/assets/dice/ChatGPT%20Image%20Sep%2030%2C%202026%2C%2007_08_30%20PM.png"
  },
  {
    "id": "dice_03",
    "name": "ChatGPT Image Sep 30, 2026, 07_13_27 PM.png",
    "label": "Куб 3",
    "src": "./app/assets/dice/ChatGPT%20Image%20Sep%2030%2C%202026%2C%2007_13_27%20PM.png"
  },
  {
    "id": "dice_04",
    "name": "ChatGPT Image Sep 30, 2026, 07_23_00 PM.png",
    "label": "Куб 4",
    "src": "./app/assets/dice/ChatGPT%20Image%20Sep%2030%2C%202026%2C%2007_23_00%20PM.png"
  },
  {
    "id": "dice_05",
    "name": "ChatGPT Image Sep 30, 2026, 07_24_38 PM.png",
    "label": "Куб 5",
    "src": "./app/assets/dice/ChatGPT%20Image%20Sep%2030%2C%202026%2C%2007_24_38%20PM.png"
  },
  {
    "id": "dice_06",
    "name": "ChatGPT Image Sep 30, 2026, 07_27_51 PM.png",
    "label": "Куб 6",
    "src": "./app/assets/dice/ChatGPT%20Image%20Sep%2030%2C%202026%2C%2007_27_51%20PM.png"
  },
  {
    "id": "dice_07",
    "name": "ChatGPT Image Sep 30, 2026, 07_35_50 PM.png",
    "label": "Куб 7",
    "src": "./app/assets/dice/ChatGPT%20Image%20Sep%2030%2C%202026%2C%2007_35_50%20PM.png"
  },
  {
    "id": "dice_08",
    "name": "ChatGPT Image Sep 30, 2026, 07_41_40 PM.png",
    "label": "Куб 8",
    "src": "./app/assets/dice/ChatGPT%20Image%20Sep%2030%2C%202026%2C%2007_41_40%20PM.png"
  },
  {
    "id": "dice_09",
    "name": "ChatGPT Image Sep 30, 2026, 07_49_58 PM.png",
    "label": "Куб 9",
    "src": "./app/assets/dice/ChatGPT%20Image%20Sep%2030%2C%202026%2C%2007_49_58%20PM.png"
  },
  {
    "id": "dice_10",
    "name": "ChatGPT Image Sep 30, 2026, 07_58_07 PM.png",
    "label": "Куб 10",
    "src": "./app/assets/dice/ChatGPT%20Image%20Sep%2030%2C%202026%2C%2007_58_07%20PM.png"
  },
  {
    "id": "dice_11",
    "name": "ChatGPT Image Sep 30, 2026, 07_58_18 PM.png",
    "label": "Куб 11",
    "src": "./app/assets/dice/ChatGPT%20Image%20Sep%2030%2C%202026%2C%2007_58_18%20PM.png"
  },
  {
    "id": "dice_12",
    "name": "ChatGPT Image Sep 30, 2026, 07_58_28 PM.png",
    "label": "Куб 12",
    "src": "./app/assets/dice/ChatGPT%20Image%20Sep%2030%2C%202026%2C%2007_58_28%20PM.png"
  },
  {
    "id": "dice_13",
    "name": "ChatGPT Image Sep 30, 2026, 07_58_39 PM.png",
    "label": "Куб 13",
    "src": "./app/assets/dice/ChatGPT%20Image%20Sep%2030%2C%202026%2C%2007_58_39%20PM.png"
  },
  {
    "id": "dice_14",
    "name": "dice1.png",
    "label": "Куб 14",
    "src": "./app/assets/dice/dice1.png"
  },
  {
    "id": "dice_15",
    "name": "dice10-1.png",
    "label": "Куб 15",
    "src": "./app/assets/dice/dice10-1.png"
  },
  {
    "id": "dice_16",
    "name": "dice10.png",
    "label": "Куб 16",
    "src": "./app/assets/dice/dice10.png"
  },
  {
    "id": "dice_17",
    "name": "dice11.png",
    "label": "Куб 17",
    "src": "./app/assets/dice/dice11.png"
  },
  {
    "id": "dice_18",
    "name": "dice12.png",
    "label": "Куб 18",
    "src": "./app/assets/dice/dice12.png"
  },
  {
    "id": "dice_19",
    "name": "dice13.png",
    "label": "Куб 19",
    "src": "./app/assets/dice/dice13.png"
  },
  {
    "id": "dice_20",
    "name": "dice15.png",
    "label": "Куб 20",
    "src": "./app/assets/dice/dice15.png"
  },
  {
    "id": "dice_21",
    "name": "dice16.png",
    "label": "Куб 21",
    "src": "./app/assets/dice/dice16.png"
  },
  {
    "id": "dice_22",
    "name": "dice17.png",
    "label": "Куб 22",
    "src": "./app/assets/dice/dice17.png"
  },
  {
    "id": "dice_23",
    "name": "dice2.png",
    "label": "Куб 23",
    "src": "./app/assets/dice/dice2.png"
  },
  {
    "id": "dice_24",
    "name": "dice3.png",
    "label": "Куб 24",
    "src": "./app/assets/dice/dice3.png"
  },
  {
    "id": "dice_25",
    "name": "dice4.png",
    "label": "Куб 25",
    "src": "./app/assets/dice/dice4.png"
  },
  {
    "id": "dice_26",
    "name": "dice5.png",
    "label": "Куб 26",
    "src": "./app/assets/dice/dice5.png"
  },
  {
    "id": "dice_27",
    "name": "dice6.png",
    "label": "Куб 27",
    "src": "./app/assets/dice/dice6.png"
  },
  {
    "id": "dice_28",
    "name": "dice7.png",
    "label": "Куб 28",
    "src": "./app/assets/dice/dice7.png"
  },
  {
    "id": "dice_29",
    "name": "dice8.png",
    "label": "Куб 29",
    "src": "./app/assets/dice/dice8.png"
  },
  {
    "id": "dice_30",
    "name": "dice9.png",
    "label": "Куб 30",
    "src": "./app/assets/dice/dice9.png"
  }
];
  DICE_ICONS.forEach(function(icon, index) {
    icon.src = './icon_previews/dice_' + String(index + 1).padStart(2, '0') + '.png';
  });
  const ICONS = [DEFAULT_ICON].concat(DICE_ICONS);
  let pending = {};
  let counter = 0;

  if (global.dndNative && typeof global.dndNative.addEventListener === 'function') {
    global.dndNative.addEventListener('message', function(event) {
      try {
        const msg = JSON.parse(String(event.data || '{}'));
        const p = pending[msg.id];
        if (!p) return;
        delete pending[msg.id];
        if (msg.ok) p.resolve(msg);
        else p.reject(new Error(msg.value || msg.status || 'Ошибка native-слоя'));
      } catch (_) {}
    });
  }

  function nativeSetIcon(iconId) {
    if (!global.dndNative || typeof global.dndNative.postMessage !== 'function') {
      return Promise.reject(new Error('Native-слой смены иконки недоступен. Нужен Android APK.'));
    }
    return new Promise(function(resolve, reject) {
      const id = 'icon_' + Date.now() + '_' + (++counter);
      pending[id] = {resolve: resolve, reject: reject};
      global.dndNative.postMessage(JSON.stringify({
        id: id,
        type: 'set-icon',
        iconId: iconId
      }));
    });
  }

  function selectedId() {
    try { return localStorage.getItem('dnd_launcher_icon') || 'default'; } catch (_) { return 'default'; }
  }

  function openIconSettingsModal() {
    let modal = document.getElementById('iconSettingsModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'iconSettingsModal';
      modal.style.cssText = 'display:none;position:fixed;inset:0;z-index:20100;background:rgba(0,0,0,.9);backdrop-filter:blur(5px);align-items:center;justify-content:center;padding:12px;box-sizing:border-box;';
      modal.innerHTML =
        '<div style="background:#1b1b1b;color:#fff;width:100%;max-width:520px;max-height:92vh;overflow:auto;border:1px solid #66502e;border-radius:12px;padding:16px;box-sizing:border-box;box-shadow:0 15px 45px rgba(0,0,0,.7);">' +
          '<div style="display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #444;padding-bottom:10px;margin-bottom:10px;">' +
            '<h3 style="margin:0;color:#e5c878;font-size:1.15em;">🖼️ Параметры иконки</h3>' +
            '<button onclick="closeIconSettingsModal()" style="background:#e53935;color:#fff;border:0;border-radius:6px;padding:6px 10px;font-weight:bold;">✕</button>' +
          '</div>' +
          '<div style="font-size:.78em;color:#aaa;line-height:1.45;margin-bottom:12px;">Выберите изображение, которое Android будет использовать как иконку Карманного ВТТ на рабочем столе.</div>' +
          '<div id="iconSettingsStatus" style="display:none;font-size:.78em;padding:8px;border-radius:6px;margin-bottom:10px;"></div>' +
          '<div id="iconSettingsGrid" style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:9px;"></div>' +
        '</div>';
      modal.addEventListener('click', function(e){ if(e.target === modal) closeIconSettingsModal(); });
      document.body.appendChild(modal);
    }
    renderIconSettings();
    modal.style.display = 'flex';
  }

  function renderIconSettings() {
    const grid = document.getElementById('iconSettingsGrid');
    if (!grid) return;
    const selected = selectedId();
    grid.innerHTML = ICONS.map(function(icon){
      const active = icon.id === selected;
      return '<button type="button" onclick="selectLauncherIcon(\'' + icon.id + '\')" style="position:relative;min-width:0;background:#252525;color:#fff;border:2px solid ' + (active ? 'var(--theme-primary,#ff9800)' : '#3b3b3b') + ';border-radius:9px;padding:7px;cursor:pointer;text-align:center;box-sizing:border-box;">' +
        '<div style="height:105px;display:flex;align-items:center;justify-content:center;background:radial-gradient(circle,#303030 0,#202020 55%,#191919 100%);border-radius:6px;overflow:hidden;">' +
          '<img src="' + icon.src + '" alt="" style="width:92px;height:92px;object-fit:contain;display:block;">' +
        '</div>' +
        '<div style="font-size:.74em;font-weight:bold;margin-top:6px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + icon.label + '</div>' +
        (active ? '<div style="font-size:.68em;color:#8bc34a;margin-top:3px;">✓ выбрана</div>' : '') +
      '</button>';
    }).join('');
  }

  async function selectLauncherIcon(iconId) {
    const icon = ICONS.find(function(x){ return x.id === iconId; });
    if (!icon) return;
    const status = document.getElementById('iconSettingsStatus');
    if (status) {
      status.style.display = 'block';
      status.style.background = '#2a2418';
      status.style.border = '1px solid #5d492a';
      status.style.color = '#e5c878';
      status.textContent = 'Переключаю иконку…';
    }
    try {
      await nativeSetIcon(iconId);
      try { localStorage.setItem('dnd_launcher_icon', iconId); } catch (_) {}
      if (status) {
        status.style.background = '#19351e';
        status.style.border = '1px solid #356b3e';
        status.style.color = '#9be7a5';
        status.textContent = '✓ Иконка изменена. Launcher может обновить её с небольшой задержкой.';
      }
      renderIconSettings();
    } catch (e) {
      if (status) {
        status.style.background = '#3a1919';
        status.style.border = '1px solid #6d2d2d';
        status.style.color = '#ffb3b3';
        status.textContent = 'Ошибка смены иконки: ' + (e && e.message ? e.message : e);
      }
    }
  }

  function closeIconSettingsModal() {
    const modal = document.getElementById('iconSettingsModal');
    if (modal) modal.style.display = 'none';
  }

  global.openIconSettingsModal = openIconSettingsModal;
  global.closeIconSettingsModal = closeIconSettingsModal;
  global.selectLauncherIcon = selectLauncherIcon;
  global.DND_APP_ICONS = ICONS;
})(window);
