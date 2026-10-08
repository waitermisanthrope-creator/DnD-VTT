/* DND VTT — NEW updater v2. V70.37.38
 * The legacy updater is intentionally not loaded. This module owns the complete
 * update UX and talks only to the native storage/apply bridge.
 */
(function (global) {
  'use strict';

  var APP_VERSION='70.37.41';
  var DEFAULT_MANIFEST_URL = 'https://waitermisanthrope-creator.github.io/DnD-VTT/updates/stable.json';
  var FALLBACK_MANIFEST_URL = 'https://raw.githubusercontent.com/waitermisanthrope-creator/DnD-VTT/main/updates/stable.json';
  var STORAGE_KEY = 'dnd_update_manifest_url_v2';
  var CHANNEL_KEY = 'dnd_update_channel_v2';
  var STAGED_KEY = 'dnd_update_staged_v2';
  var DEFAULT_CHANNEL = 'stable';
  var CACHE_BUSTER = 'dnd-v2-' + APP_VERSION + '-' + Date.now();
  // V70.37.38: native stage must receive a cache-busted manifest URL too.
  var pending = Object.create(null);
  var counter = 0;
  var progressHandler = null;

  if (global.dndNative && typeof global.dndNative.addEventListener === 'function') {
    global.dndNative.addEventListener('message', function (event) {
      try {
        var message = JSON.parse(String(event.data || '{}'));
        var p = pending[message.id];
        if (!p) return;
        if (message.status === 'progress') {
          if (typeof progressHandler === 'function') {
            try { progressHandler(message); } catch (_) {}
          }
          return;
        }
        delete pending[message.id];
        if (message.ok) p.resolve(message);
        else p.reject(new Error(message.value || message.status || 'Ошибка native updater'));
      } catch (_) {}
    });
  }

  function versionParts(v) {
    return String(v || '0').replace(/^v/i, '').split('.').map(function (x) {
      var n = parseInt(x, 10); return Number.isFinite(n) ? n : 0;
    });
  }

  function compareVersions(a, b) {
    var aa = versionParts(a), bb = versionParts(b), len = Math.max(aa.length, bb.length);
    for (var i = 0; i < len; i++) {
      var av = aa[i] || 0, bv = bb[i] || 0;
      if (av !== bv) return av > bv ? 1 : -1;
    }
    return 0;
  }

  function nativeRequest(type, manifestUrl) {
    if (!global.dndNative || typeof global.dndNative.postMessage !== 'function') return null;
    return new Promise(function (resolve, reject) {
      var id = 'v2_' + Date.now() + '_' + (++counter);
      pending[id] = { resolve: resolve, reject: reject };
      global.dndNative.postMessage(JSON.stringify({
        id: id, type: type, manifestUrl: manifestUrl || ''
      }));
    });
  }

  async function runtimeVersion() {
    var nativeVersion = '';
    try {
      var r = nativeRequest('version', '');
      if (r) {
        var x = await r;
        if (x && x.value) nativeVersion = String(x.value);
      }
    } catch (_) {}
    // OTA versions are JS/app-content versions. Once an OTA is installed,
    // the native APK version can legitimately remain older, so use the newer
    // of the native version and this manager's content version.
    return compareVersions(APP_VERSION, nativeVersion) >= 0 ? APP_VERSION : nativeVersion;
  }

  function channel() {
    try { return global.localStorage.getItem(CHANNEL_KEY) || DEFAULT_CHANNEL; } catch (_) { return DEFAULT_CHANNEL; }
  }

  function manifestUrl() {
    try {
      return String(global.localStorage.getItem(STORAGE_KEY) || global.DND_UPDATE_MANIFEST_URL || DEFAULT_MANIFEST_URL).trim();
    } catch (_) {
      return DEFAULT_MANIFEST_URL;
    }
  }

  function validateManifest(m) {
    if (!m || typeof m !== 'object' || !m.version || !Array.isArray(m.files)) throw new Error('Некорректный манифест обновления');
    if (!m.baseUrl && !m.files.every(function (f) { return /^https?:\/\//i.test(String(f.url || '')); })) throw new Error('В манифесте нет baseUrl');
    m.files.forEach(function (f) {
      if (!f || !f.path || !/^[a-f0-9]{64}$/i.test(String(f.sha256 || ''))) throw new Error('Некорректный файл: ' + (f && f.path || '?'));
      if (String(f.path).indexOf('..') >= 0 || String(f.path).charAt(0) === '/') throw new Error('Небезопасный путь: ' + f.path);
    });
    return true;
  }

  async function fetchManifest(url) {
    var list = [url, DEFAULT_MANIFEST_URL, FALLBACK_MANIFEST_URL].filter(function (x, i, a) {
      return x && a.indexOf(x) === i;
    });
    var found = [];
    var last = null;
    for (var i = 0; i < list.length; i++) {
      try {
        var u = list[i] + (list[i].indexOf('?') >= 0 ? '&' : '?') + 'cb=' + encodeURIComponent(CACHE_BUSTER);
        var response = await global.fetch(u, { cache: 'no-store' });
        if (!response.ok) throw new Error('HTTP ' + response.status);
        var m = await response.json();
        validateManifest(m);
        found.push({ manifest: m, url: list[i] });
      } catch (e) { last = e; }
    }
    if (!found.length) throw new Error('Не удалось получить манифест: ' + (last && last.message || 'нет связи'));
    found.sort(function (a, b) { return compareVersions(b.manifest.version, a.manifest.version); });
    return found[0];
  }

  function compatibility(m, current) {
    current = String(current || APP_VERSION);
    if (m.minAppVersion && compareVersions(current, m.minAppVersion) < 0) {
      return { ok: false, reason: 'minimum-app-version', minAppVersion: m.minAppVersion };
    }
    if (Array.isArray(m.blockedVersions) && m.blockedVersions.indexOf(current) >= 0) {
      return { ok: false, reason: 'blocked-current-version' };
    }
    return { ok: true };
  }

  async function inspect() {
    var current = await runtimeVersion();
    var fetched = await fetchManifest(manifestUrl());
    var m = fetched.manifest;
    var compat = compatibility(m, current);
    return {
      configured: true,
      currentVersion: current,
      channel: channel(),
      manifest: m,
      manifestUrl: fetched.url,
      compatibility: compat,
      updateAvailable: compat.ok && compareVersions(m.version, current) > 0
    };
  }

  function setProgressHandler(fn) { progressHandler = typeof fn === 'function' ? fn : null; }

  async function stage(manifest, onProgress, sourceManifestUrl) {
    validateManifest(manifest);
    var current = await runtimeVersion();
    var compat = compatibility(manifest, current);
    if (!compat.ok) throw new Error('Обновление недоступно: ' + compat.reason);
    if (compareVersions(manifest.version, current) <= 0) return { staged: false, reason: 'not-newer' };

    if (global.dndNative && typeof global.dndNative.postMessage === 'function') {
      if (onProgress) setProgressHandler(onProgress);
      try {
        var stageManifestUrl = sourceManifestUrl || manifestUrl();
        stageManifestUrl += (stageManifestUrl.indexOf('?') >= 0 ? '&' : '?') + 'cb=' + encodeURIComponent(CACHE_BUSTER);
        var native = await nativeRequest('stage', stageManifestUrl);
        return { staged: true, native: true, version: native && native.value || manifest.version };
      } finally {
        setProgressHandler(null);
      }
    }

    var total = manifest.files.reduce(function (n, f) { return n + Math.max(0, Number(f.bytes) || 0); }, 0);
    var done = 0, files = [];
    for (var i = 0; i < manifest.files.length; i++) {
      var f = manifest.files[i];
      if (onProgress) onProgress({ phase:'download', current:i+1, total:manifest.files.length, path:f.path, bytesDone:done, bytesTotal:total });
      var u = f.url || String(manifest.baseUrl).replace(/\/+$/, '') + '/' + String(f.path).replace(/^\/+/, '');
      var response = await global.fetch(u, { cache:'no-store' });
      if (!response.ok) throw new Error('HTTP ' + response.status + ': ' + f.path);
      var data = await response.arrayBuffer();
      if (f.bytes && Number(f.bytes) !== data.byteLength) throw new Error('Размер не совпал: ' + f.path);
      var hash = await crypto.subtle.digest('SHA-256', data);
      var hex = Array.from(new Uint8Array(hash)).map(function(b){return b.toString(16).padStart(2,'0');}).join('');
      if (hex.toLowerCase() !== String(f.sha256).toLowerCase()) throw new Error('SHA-256 не совпал: ' + f.path);
      files.push({path:f.path,bytes:data.byteLength,sha256:hex,data:data});
      done += data.byteLength;
      if (onProgress) onProgress({ phase:'download', current:i+1, total:manifest.files.length, path:f.path, bytesDone:done, bytesTotal:total });
    }
    try { global.localStorage.setItem(STAGED_KEY, JSON.stringify({version:manifest.version,files:files.map(function(f){return {path:f.path,bytes:f.bytes,sha256:f.sha256};})})); } catch (_) {}
    return { staged:true, native:false, files:files };
  }

  async function checkAndStage(options) {
    options = options || {};
    var state = await inspect();
    if (!state.updateAvailable) return state;
    var result = await stage(state.manifest, options.onProgress, state.manifestUrl);
    state.stageResult = result;
    return state;
  }

  async function applyStaged(options) {
    options = options || {};
    if (global.dndNative && typeof global.dndNative.postMessage === 'function') {
      if (options.onProgress) setProgressHandler(options.onProgress);
      try {
        return await nativeRequest('apply', '');
      } finally {
        setProgressHandler(null);
      }
    }
    throw new Error('Native установщик недоступен. Файлы не будут заменены.');
  }

  function scene(state) {
    if (!global.DND_UPDATE_SCENE_V2 || typeof global.DND_UPDATE_SCENE_V2.create !== 'function') {
      throw new Error('Новая сцена обновления не загружена');
    }
    return global.DND_UPDATE_SCENE_V2.create(state);
  }

  function nextPaint() {
    return new Promise(function(resolve) {
      if (typeof requestAnimationFrame !== 'function') return setTimeout(resolve, 32);
      requestAnimationFrame(function(){ requestAnimationFrame(resolve); });
    });
  }

  async function autoCheckForUpdates(options) {
    // Startup must only determine whether an update exists.
    // Download/install starts only after the user presses the main-screen update button.
    options = options || {};
    if (global.__dndUpdateV2CheckRunning) return global.__dndUpdateV2CheckRunning;
    var run = inspect();
    global.__dndUpdateV2CheckRunning = run;
    try { return await run; } finally { global.__dndUpdateV2CheckRunning = null; }
  }

  function runSceneTest() {
    try {
      ['settingsModal','devMenuModal'].forEach(function(id){
        var e=document.getElementById(id); if(e) e.style.display='none';
      });
      var ui = scene({testMode:true,updateAvailable:false,manifest:{version:'70.34.1',files:[]}});
      ui.setStatus('Тест новой сцены. Файлы не скачиваются и ничего не устанавливается.');
      var total=18, i=0, timer=null;
      ui.setProgress({current:0,total:total,bytesDone:0,bytesTotal:100,path:'Запуск'});
      ui.onApply=function(){ ui.setStatus('Тест завершён — установщик не запускался.'); ui.enableApply(); };
      function tick(){
        i++;
        ui.setProgress({current:i,total:total,bytesDone:i,bytesTotal:total,path:i<total?'Проверка ресурсов…':'Готово'});
        if(i<total) timer=setTimeout(tick,115);
        else { ui.setStatus('Тест завершён. Переход готов.'); ui.finish(); }
      }
      nextPaint().then(function(){timer=setTimeout(tick,180);});
      return true;
    } catch(e) {
      try { alert('Тест нового окна не запустился: '+(e&&e.message||e)); } catch(_){}
      return false;
    }
  }

  var settingsProgressAnimator = null;
  function ensureSettingsPanel() {
    var old = document.getElementById('dndUpdateV2Settings');
    if (old) return old;
    var host = document.querySelector('#settingsModal .modal-content,#settingsModal .modal-body,#settingsModal');
    if (!host) return null;
    var box = document.createElement('div');
    box.id='dndUpdateV2Settings';
    box.style.cssText='margin:12px 0;padding:12px;border:1px solid #55472c;border-radius:10px;background:#171510;color:#eee';
    box.innerHTML='<div style="font-weight:800;color:#e0b65a;margin-bottom:6px">🔥 Обновление приложения</div><div id="settingsUpdateStatusV2" style="font-size:13px;color:#aaa">Нажмите «Проверить».</div><div style="height:7px;margin-top:8px;background:#2b2b2b;border-radius:99px;overflow:hidden"><div id="settingsUpdateBarV2" style="height:100%;width:0;background:linear-gradient(90deg,#d49a2e,#ff6a1a);transition:width .2s"></div></div><div style="display:flex;gap:7px;margin-top:9px"><button id="settingsUpdateCheckV2" type="button" style="flex:1;padding:9px">Проверить и обновить</button><button id="settingsUpdateTestV2" type="button" style="flex:1;padding:9px">Тест окна</button></div>';
    host.appendChild(box);
    box.querySelector('#settingsUpdateCheckV2').onclick=function(){ settingsCheck(); };
    box.querySelector('#settingsUpdateTestV2').onclick=function(){ runSceneTest(); };
    return box;
  }

  function settingsCheck() {
    var box=ensureSettingsPanel(),
        status=box&&box.querySelector('#settingsUpdateStatusV2'),
        bar=box&&box.querySelector('#settingsUpdateBarV2');
    if(status) status.textContent='Проверяю новую систему обновлений…';
    return inspect().then(function(state){
      if(!state.updateAvailable){
        if(status) status.textContent='Версия v'+state.currentVersion+' актуальна.';
        return state;
      }
      var ui=scene(state);
      ui.setStatus('Найдено обновление v'+state.manifest.version+'. Загружаю…');
      return checkAndStage({
        onProgress:function(p){
          if(bar&&p.total) bar.style.width=Math.round((p.current/p.total)*100)+'%';
          ui.setProgress(p);
        }
      }).then(function(s){
        if(!s.stageResult || !s.stageResult.staged) return s;
        ui.setProgress({current:1,total:1,bytesDone:1,bytesTotal:1,path:'Проверено'});
        ui.setStatus('Файлы скачаны и проверены. Устанавливаю обновление…');
        return applyStaged({
          onProgress:function(p){ui.setProgress(p);}
        }).then(function(result){
          ui.setStatus('Готово. Перезапускаю приложение…');
          if(status) status.textContent='Обновление v'+state.manifest.version+' установлено.';
          return result;
        }).catch(function(e){
          ui.fail(e&&e.message||e);
          throw e;
        });
      });
    }).catch(function(e){
      if(status) status.textContent='Ошибка: '+(e&&e.message||e);
      return null;
    });
  }

  function settingsApply() {
    return applyStaged({});
  }

  global.DND_UPDATE_UI = {
    check:settingsCheck,
    apply:settingsApply,
    refresh:function(){ensureSettingsPanel();},
    setMainMenuAvailability:function(available, state) {
      var button=document.getElementById('mainMenuUpdateButton');
      if (!button) return;
      button.style.display=available?'flex':'none';
      button.setAttribute('aria-hidden',available?'false':'true');
      if (available && state && state.manifest && state.manifest.version) {
        button.setAttribute('data-update-version',String(state.manifest.version));
        button.title='Доступно обновление v'+String(state.manifest.version);
      } else {
        button.removeAttribute('data-update-version');
        button.removeAttribute('title');
      }
    },
    openMainMenuUpdate:function() {
      if (global.__dndUpdateV2MainRunning) return global.__dndUpdateV2MainRunning;
      var run = inspect().then(function(state) {
        if (!state.updateAvailable) {
          global.DND_UPDATE_UI.setMainMenuAvailability(false,state);
          return state;
        }
        global.DND_UPDATE_UI.setMainMenuAvailability(false,state);
        var ui=scene(state);
        ui.setStatus('Найдено обновление v'+state.manifest.version+'. Загружаю…');
        return checkAndStage({
          onProgress:function(p){ui.setProgress(p);}
        }).then(function(s) {
          if(!s.stageResult || !s.stageResult.staged) return s;
          ui.setProgress({current:1,total:1,bytesDone:1,bytesTotal:1,path:'Проверено'});
          ui.setStatus('Файлы скачаны и проверены. Устанавливаю обновление…');
          return applyStaged({
            onProgress:function(p){ui.setProgress(p);}
          }).then(function(result){
            ui.setStatus('Готово. Перезапускаю приложение…');
            return result;
          }).catch(function(e){
            ui.fail(e&&e.message||e);
            throw e;
          });
        });
      }).catch(function(e) {
        try { alert('Не удалось обновить приложение: '+(e&&e.message||e)); } catch (_) {}
        return null;
      });
      global.__dndUpdateV2MainRunning = run;
      run.then(function(){global.__dndUpdateV2MainRunning=null;},function(){global.__dndUpdateV2MainRunning=null;});
      return run;
    }
  };
  global.DND_UPDATE_MANAGER = {
    VERSION:APP_VERSION, compareVersions:compareVersions, inspect:inspect, stage:stage,
    checkAndStage:checkAndStage, applyStaged:applyStaged, autoCheckForUpdates:autoCheckForUpdates,
    runSceneTest:runSceneTest, setProgressHandler:setProgressHandler,
    getNativeStorageStats:async function(){try{return await nativeRequest('storage','');}catch(_){return null;}},
    canApplyNatively:function(){return !!(global.dndNative&&typeof global.dndNative.postMessage==='function');}
  };

  function boot() {
    // On startup we only check availability. Download/install starts from the main-screen update button.
    try { ensureSettingsPanel(); } catch (_) {}
    setTimeout(function () {
      try {
        inspect().then(function (state) {
          if (global.DND_UPDATE_UI && typeof global.DND_UPDATE_UI.setMainMenuAvailability === 'function') {
            global.DND_UPDATE_UI.setMainMenuAvailability(!!state.updateAvailable, state);
          }
        }).catch(function () {
          if (global.DND_UPDATE_UI && typeof global.DND_UPDATE_UI.setMainMenuAvailability === 'function') {
            global.DND_UPDATE_UI.setMainMenuAvailability(false, null);
          }
        });
      } catch (_) {}
    }, 900);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',boot,{once:true}); else boot();
})(window);
