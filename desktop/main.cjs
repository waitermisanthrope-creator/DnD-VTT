'use strict';

const { app, BrowserWindow, ipcMain, protocol, session, shell, screen } = require('electron');
const fs = require('node:fs');
const fsp = require('node:fs/promises');
const path = require('node:path');
const { Readable } = require('node:stream');

const webRoot = path.join(__dirname, 'web');
let mainWindow = null;
let portraitBounds = null;
let isLandscape = false;

protocol.registerSchemesAsPrivileged([{
  scheme: 'dnd',
  privileges: { standard: true, secure: true, supportFetchAPI: true, stream: true }
}]);

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.wasm': 'application/wasm',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.webp': 'image/webp', '.gif': 'image/gif', '.svg': 'image/svg+xml',
  '.mp3': 'audio/mpeg', '.ogg': 'audio/ogg', '.wav': 'audio/wav',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf',
  '.glb': 'model/gltf-binary', '.gltf': 'model/gltf+json',
  '.bin': 'application/octet-stream', '.obj': 'text/plain'
};

async function respondWithLocalFile(request) {
  let relative;
  try {
    const url = new URL(request.url);
    if (url.hostname !== 'app') return new Response('Unknown host', { status: 403 });
    relative = decodeURIComponent(url.pathname.replace(/^\/+/, '')) || 'index.html';
    if (relative.includes('\\') || relative.includes('\0')) {
      return new Response('Invalid path', { status: 400 });
    }
  } catch (_) {
    return new Response('Invalid URL', { status: 400 });
  }

  const fullPath = path.resolve(webRoot, relative);
  const rel = path.relative(webRoot, fullPath);
  if (rel.startsWith('..') || path.isAbsolute(rel)) {
    return new Response('Forbidden', { status: 403 });
  }
  let stats;
  try {
    stats = await fsp.stat(fullPath);
    if (!stats.isFile()) throw new Error('Not a file');
  } catch (_) {
    return new Response('Not found', { status: 404 });
  }

  const headers = new Headers({
    'Content-Type': mimeTypes[path.extname(fullPath).toLowerCase()] || 'application/octet-stream',
    'Accept-Ranges': 'bytes'
  });
  const range = request.headers.get('range');
  const match = range && /^bytes=(\d+)-(\d*)$/.exec(range);
  if (match) {
    const start = Number(match[1]);
    const end = match[2] === '' ? stats.size - 1 : Math.min(Number(match[2]), stats.size - 1);
    if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start > end || start >= stats.size) {
      return new Response(null, { status: 416, headers: { 'Content-Range': 'bytes */' + stats.size } });
    }
    headers.set('Content-Range', 'bytes ' + start + '-' + end + '/' + stats.size);
    headers.set('Content-Length', String(end - start + 1));
    return new Response(Readable.toWeb(fs.createReadStream(fullPath, { start, end })), {
      status: 206,
      headers
    });
  }
  headers.set('Content-Length', String(stats.size));
  if (request.method === 'HEAD') return new Response(null, { status: 200, headers });
  return new Response(Readable.toWeb(fs.createReadStream(fullPath)), { status: 200, headers });
}

function setLandscape(landscape) {
  if (!mainWindow || mainWindow.isDestroyed() || isLandscape === landscape) return;
  if (landscape) {
    portraitBounds = mainWindow.isMaximized() || mainWindow.isFullScreen() ? null : mainWindow.getBounds();
    isLandscape = true;
    if (mainWindow.isMaximized() || mainWindow.isFullScreen()) return;
    const { width, height } = screen.getDisplayMatching(mainWindow.getBounds()).workArea;
    mainWindow.setSize(Math.min(1280, width), Math.min(820, height), true);
    mainWindow.center();
  } else {
    isLandscape = false;
    if (mainWindow.isMaximized() || mainWindow.isFullScreen()) return;
    if (portraitBounds) mainWindow.setBounds(portraitBounds, true);
    portraitBounds = null;
  }
}

function createWindow() {
  const display = screen.getPrimaryDisplay().workAreaSize;
  mainWindow = new BrowserWindow({
    title: 'DnD VTT',
    width: Math.min(520, display.width),
    height: Math.min(900, display.height),
    minWidth: 360,
    minHeight: 550,
    backgroundColor: '#15120f',
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      sandbox: true,
      nodeIntegration: false,
      webSecurity: true,
      devTools: true
    }
  });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:\/\//i.test(url)) shell.openExternal(url).catch(() => {});
    return { action: 'deny' };
  });
  mainWindow.webContents.on('will-navigate', (event, url) => {
    if (url.startsWith('dnd://app/')) return;
    event.preventDefault();
    if (/^https?:\/\//i.test(url)) shell.openExternal(url).catch(() => {});
  });
  mainWindow.webContents.on('before-input-event', (event, input) => {
    if (input.type !== 'keyDown' || input.isAutoRepeat) return;
    if (input.key === 'F11') {
      mainWindow.setFullScreen(!mainWindow.isFullScreen());
      event.preventDefault();
    } else if (input.control && input.shift && input.key.toLowerCase() === 'l') {
      setLandscape(!isLandscape);
      event.preventDefault();
    }
  });
  mainWindow.on('closed', () => { mainWindow = null; });
  mainWindow.loadURL('dnd://app/index.html');
}

const lock = app.requestSingleInstanceLock();
if (!lock) app.quit();
else app.on('second-instance', () => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }
});

ipcMain.on('dnd:orientation', (event, mode) => {
  if (!mainWindow || event.sender !== mainWindow.webContents) return;
  if (mode === 'landscape') setLandscape(true);
  if (mode === 'portrait') setLandscape(false);
});

ipcMain.on('dnd:icon', (event, id) => {
  event.returnValue = 'UNSUPPORTED';
  if (!mainWindow || event.sender !== mainWindow.webContents) return;
  if (!/^(default|dice_\d{2})$/.test(String(id))) return;
  const iconPath = path.join(webRoot, 'icon_previews', id + '.png');
  if (!fs.existsSync(iconPath)) return;
  try {
    mainWindow.setIcon(iconPath);
    event.returnValue = 'OK';
  } catch (_) {}
});

app.whenReady().then(() => {
  protocol.handle('dnd', respondWithLocalFile);

  // Legacy Settings.js uses absolute Android asset URLs for icon previews.
  // Redirect those local-only paths to the packaged Windows webroot.
  session.defaultSession.webRequest.onBeforeRequest({
    urls: ['https://appassets.androidplatform.net/*']
  }, (details, callback) => {
    try {
      const u = new URL(details.url);
      if (u.pathname.startsWith('/vtt-apk/icon_previews/')) {
        const name = u.pathname.slice('/vtt-apk/icon_previews/'.length);
        callback({ redirectURL: 'dnd://app/icon_previews/' + encodeURIComponent(decodeURIComponent(name)) });
        return;
      }
      if (u.pathname.startsWith('/vtt/')) {
        callback({ redirectURL: 'dnd://app/' + u.pathname.slice('/vtt/'.length) });
        return;
      }
    } catch (_) {}
    callback({ cancel: true });
  });

  session.defaultSession.setPermissionRequestHandler((_wc, permission, done) => {
    done(permission === 'fullscreen');
  });
  createWindow();
});
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
