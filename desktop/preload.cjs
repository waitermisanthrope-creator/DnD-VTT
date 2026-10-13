'use strict';

const { contextBridge, ipcRenderer } = require('electron');

// The existing game updater speaks dndNative.postMessage on Android.
// Windows supplies the SAME message interface, backed by SHA-256 checked
// native file downloads. No filesystem or Node API is exposed to game JS.
contextBridge.exposeInMainWorld('DND_DESKTOP', true);
const updateListeners = new Set();
ipcRenderer.on('dnd:native-reply', (_event, data) => {
  const event = {data: JSON.stringify(data)};
  for (const listener of updateListeners) {
    try { listener(event); } catch (_) {}
  }
});
contextBridge.exposeInMainWorld('dndNative', {
  postMessage: message => {
    if (typeof message !== 'string' || message.length > 16384) throw Error('Invalid updater request');
    ipcRenderer.send('dnd:native', message);
  },
  addEventListener: (kind, listener) => {
    if (kind === 'message' && typeof listener === 'function') updateListeners.add(listener);
  },
  removeEventListener: (kind, listener) => {
    if (kind === 'message') updateListeners.delete(listener);
  }
});
contextBridge.exposeInMainWorld('DndOrientation', {
  landscape: () => ipcRenderer.send('dnd:orientation', 'landscape'),
  restore: () => ipcRenderer.send('dnd:orientation', 'portrait')
});
contextBridge.exposeInMainWorld('DndLauncherIcon', {
  setIcon: iconId => ipcRenderer.sendSync('dnd:icon', String(iconId))
});

// The map editor already marks the body with this CSS class. Mirror the
// Android orientation change by widening/restoring the desktop window.
window.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  if (!body) return;
  let landscape = false;
  const sync = () => {
    // The character editor is a separate fullscreen overlay, not a body class.
    const editor = document.getElementById('dnd3dCharacterEditor');
    const next = body.classList.contains('dnd-map-active') ||
      !!(editor && editor.isConnected && getComputedStyle(editor).display !== 'none');
    if (next !== landscape) {
      landscape = next;
      ipcRenderer.send('dnd:orientation', next ? 'landscape' : 'portrait');
    }
  };
  new MutationObserver(sync).observe(body, { attributes: true, attributeFilter: ['class'], childList: true });
  sync();
});
