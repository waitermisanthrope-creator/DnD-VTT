'use strict';

const { contextBridge, ipcRenderer } = require('electron');

// These are exposed before any game scripts. Android's native updater is NOT
// simulated: there is no dndNative.postMessage bridge on Windows.
contextBridge.exposeInMainWorld('DND_DESKTOP', true);
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
    const next = body.classList.contains('dnd-map-active');
    if (next !== landscape) {
      landscape = next;
      ipcRenderer.send('dnd:orientation', next ? 'landscape' : 'portrait');
    }
  };
  new MutationObserver(sync).observe(body, { attributes: true, attributeFilter: ['class'] });
  sync();
});
