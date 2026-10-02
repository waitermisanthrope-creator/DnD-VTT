/* DND VTT — lightweight application updater contract.
 * The Android/native shell performs the final filesystem replacement.
 * The browser layer is responsible for manifest fetch, version checks,
 * SHA-256 verification and staging. No arbitrary script is executed.
 */
(function (global) {
  'use strict';

  var APP_VERSION = '70.29.0'
  // V70.25.91: parchment asset/update audit; stable manifest includes index.html and required root parchment assets. Trigger manifest regeneration with current workflow policy.
  // Public manifest is stored in the repository; do not depend on GitHub Pages.
  var DEFAULT_MANIFEST_URL = 'https://raw.githubusercontent.com/waitermisanthrope-creator/DnD-VTT/main/updates/stable.json';
  var MANIFEST_CACHE_BUSTER = 'dnd-vtt-94'
  var STORAGE_KEY = 'dnd_update_manifest_url';
  var CHANNEL_KEY = 'dnd_update_channel';
  var STAGED_KEY = 'dnd_update_staged_manifest';
  var DEFAULT_CHANNEL = 'stable';

  function versionParts(v) {
    return String(v || '0').replace(/^v/i, '').split('.').map(function (n) {
      var x = parseInt(n, 10);
      return Number.isFinite(x) ? x : 0;
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

  var nativePending = {};
  var nativeCounter = 0;
  var nativeProgressHandler = null;

  if (global.dndNative && typeof global.dndNative.addEventListener === 'function') {
    global.dndNative.addEventListener('message', function (event) {
      try {
        var message = JSON.parse(String(event.data || '{}'));
        var pending = nativePending[message.id];
        if (!pending) return;
        if (message.status === 'progress') {
          if (typeof nativeProgressHandler === 'function') {
            try { nativeProgressHandler(message); } catch (_) {}
          }
          return;
        }
        delete nativePending[message.id];
        if (message.ok) pending.resolve(message);
        else pending.reject(new Error(message.value || message.status || 'Native updater error'));
      } catch (e) {}
    });
  }

  function nativeRequest(type, manifestUrl) {
    if (!global.dndNative || typeof global.dndNative.postMessage !== 'function') return null;
    return new Promise(function (resolve, reject) {
      var id = 'u' + Date.now() + '_' + (++nativeCounter);
      nativePending[id] = { resolve: resolve, reject: reject };
      global.dndNative.postMessage(JSON.stringify({ id: id, type: type, manifestUrl: manifestUrl || '' }));
    });
  }

  async function getRuntimeAppVersion() {
    try {
      var native = nativeRequest('version', '');
      if (native) {
        var result = await native;
        if (result && result.value) return String(result.value);
      }
    } catch (_) {}
    return APP_VERSION;
  }

  function getConfig() {
    var url = '';
    try { url = global.localStorage.getItem(STORAGE_KEY) || ''; } catch (_) {}
    return {
      version: APP_VERSION,
      channel: (tryGetChannel() || DEFAULT_CHANNEL),
      manifestUrl: String(global.DND_UPDATE_MANIFEST_URL || url || DEFAULT_MANIFEST_URL || '').trim()
    };
  }

  function tryGetChannel() {
    try { return global.localStorage.getItem(CHANNEL_KEY) || DEFAULT_CHANNEL; } catch (_) { return DEFAULT_CHANNEL; }
  }

  function setManifestUrl(url) {
    url = String(url || '').trim();
    try {
      if (url) global.localStorage.setItem(STORAGE_KEY, url);
      else global.localStorage.removeItem(STORAGE_KEY);
    } catch (_) {}
    return url;
  }

  function setChannel(channel) {
    channel = channel === 'beta' ? 'beta' : 'stable';
    try { global.localStorage.setItem(CHANNEL_KEY, channel); } catch (_) {}
    return channel;
  }

  function joinUrl(base, rel) {
    if (/^https?:\/\//i.test(rel)) return rel;
    return String(base || '').replace(/\/+$/, '') + '/' + String(rel || '').replace(/^\/+/, '');
  }

  async function sha256Hex(buffer) {
    if (!global.crypto || !global.crypto.subtle) throw new Error('Web Crypto SHA-256 is unavailable');
    var digest = await global.crypto.subtle.digest('SHA-256', buffer);
    return Array.from(new Uint8Array(digest)).map(function (b) { return b.toString(16).padStart(2, '0'); }).join('');
  }

  async function fetchManifest(url) {
    if (!url) throw new Error('Update manifest URL is not configured');
    var response = await global.fetch(url, { cache: 'no-store' });
    if (!response.ok) throw new Error('Update manifest HTTP ' + response.status);
    var manifest = await response.json();
    validateManifest(manifest);
    return manifest;
  }

  function validateManifest(m) {
    if (!m || typeof m !== 'object') throw new Error('Invalid update manifest');
    if (!m.version) throw new Error('Update manifest has no version');
    if (!Array.isArray(m.files)) throw new Error('Update manifest has no files array');
    if (!m.baseUrl && !m.files.every(function (f) { return /^https?:\/\//i.test(String(f.url || f.path || '')); })) {
      throw new Error('Update manifest has no baseUrl');
    }
    m.files.forEach(function (f) {
      if (!f || !f.path || !/^[a-f0-9]{64}$/i.test(String(f.sha256 || ''))) throw new Error('Invalid file entry: ' + (f && f.path || '?'));
      if (f.path.indexOf('..') !== -1 || f.path.charAt(0) === '/') throw new Error('Unsafe update path: ' + f.path);
    });
    return true;
  }

  function compatibility(manifest, appVersion) {
    appVersion = String(appVersion || APP_VERSION);
    if (manifest.minAppVersion && compareVersions(appVersion, manifest.minAppVersion) < 0) {
      return { ok: false, reason: 'minimum-app-version', minAppVersion: manifest.minAppVersion };
    }
    if (Array.isArray(manifest.blockedVersions) && manifest.blockedVersions.indexOf(appVersion) !== -1) {
      return { ok: false, reason: 'blocked-current-version' };
    }
    return { ok: true };
  }

  async function inspect() {
    var cfg = getConfig();
    if (!cfg.manifestUrl) return { configured: false, currentVersion: APP_VERSION, channel: cfg.channel };
    var manifest = await fetchManifest(cfg.manifestUrl + (cfg.manifestUrl.indexOf('?') >= 0 ? '&' : '?') + 'cb=' + MANIFEST_CACHE_BUSTER);
    var runtimeVersion = await getRuntimeAppVersion();
    var compat = compatibility(manifest, runtimeVersion);
    return {
      configured: true,
      currentVersion: runtimeVersion,
      channel: cfg.channel,
      manifest: manifest,
      compatibility: compat,
      updateAvailable: compat.ok && compareVersions(manifest.version, runtimeVersion) > 0
    };
  }

  async function stage(manifest, onProgress) {
    validateManifest(manifest);
    var runtimeVersion = await getRuntimeAppVersion();
    var compat = compatibility(manifest, runtimeVersion);
    if (!compat.ok) throw new Error('Update rejected: ' + compat.reason);
    if (compareVersions(manifest.version, runtimeVersion) <= 0) return { staged: false, reason: 'not-newer' };

    var base = manifest.baseUrl || '';
    var files = [];
    for (var i = 0; i < manifest.files.length; i++) {
      var entry = manifest.files[i];
      if (typeof onProgress === 'function') {
        try { onProgress({ phase: 'download', current: i + 1, total: manifest.files.length, path: entry.path }); } catch (_) {}
      }
      var response = await global.fetch(entry.url || joinUrl(base, entry.path), { cache: 'no-store' });
      if (!response.ok) throw new Error('Update file HTTP ' + response.status + ': ' + entry.path);
      var buffer = await response.arrayBuffer();
      if (entry.bytes != null && Number(entry.bytes) !== buffer.byteLength) throw new Error('Size mismatch: ' + entry.path);
      var hash = await sha256Hex(buffer);
      if (hash.toLowerCase() !== String(entry.sha256).toLowerCase()) throw new Error('SHA-256 mismatch: ' + entry.path);
      files.push({ path: entry.path, bytes: buffer.byteLength, sha256: hash, data: buffer });
    }

    var packageInfo = {
      version: manifest.version,
      channel: manifest.channel || getConfig().channel,
      generated: manifest.generated || null,
      files: files.map(function (f) { return { path: f.path, bytes: f.bytes, sha256: f.sha256 }; })
    };
    try { global.localStorage.setItem(STAGED_KEY, JSON.stringify(packageInfo)); } catch (_) {}

    return { staged: true, packageInfo: packageInfo, files: files };
  }

  function getStaged() {
    try { return JSON.parse(global.localStorage.getItem(STAGED_KEY) || 'null'); } catch (_) { return null; }
  }

  function clearStaged() {
    try { global.localStorage.removeItem(STAGED_KEY); } catch (_) {}
  }

  function setProgressHandler(handler) { nativeProgressHandler = typeof handler === 'function' ? handler : null; }

  async function checkAndStage(options) {
    options = options || {};
    var state = await inspect();
    if (!state.configured || !state.updateAvailable) return state;
    var native;
    if (options.onProgress) setProgressHandler(options.onProgress);
    native = nativeRequest('stage', getConfig().manifestUrl);
    if (native) {
      try {
        var nativeResult = await native;
        state.stageResult = { staged: true, native: true, version: nativeResult.value || state.manifest.version };
        return state;
      } finally {
        setProgressHandler(null);
      }
    }
    state.stageResult = await stage(state.manifest, options.onProgress);
    return state;
  }

  function canApplyNatively() {
    return !!((global.dndNative && typeof global.dndNative.postMessage === 'function') || (global.DndUpdater && typeof global.DndUpdater.applyStagedUpdate === 'function'));
  }

  async function applyStaged(options) {
    options = options || {};
    if (options.onProgress) setProgressHandler(options.onProgress);
    if (global.dndNative && typeof global.dndNative.postMessage === 'function') {
      try {
        var native = await nativeRequest('apply', '');
        clearStaged();
        return native || true;
      } finally {
        setProgressHandler(null);
      }
    }
    var staged = getStaged();
    if (!staged) throw new Error('No staged update');
    if (!canApplyNatively()) throw new Error('Native updater is not available; update remains safely staged.');
    var result = await global.DndUpdater.applyStagedUpdate(staged);
    if (result === false) throw new Error('Native updater rejected the staged update');
    clearStaged();
    if (options.onProgress) options.onProgress({phase:'apply',current:1,total:1,path:'готово'});
    return result || true;
  }

  function showStartupUpdatePrompt(state, options) {
    options = options || {};
    if (!state || !state.updateAvailable || !state.manifest) return null;
    if (document.getElementById('dndStartupUpdatePrompt')) return document.getElementById('dndStartupUpdatePrompt');
    var overlay = document.createElement('div');
    overlay.id = 'dndStartupUpdatePrompt';
    overlay.style.cssText = 'position:fixed;inset:0;z-index:120000;display:flex;align-items:center;justify-content:center;padding:18px;box-sizing:border-box;background:rgba(0,0,0,.78);font-family:Inter,system-ui,sans-serif';
    var card = document.createElement('div');
    card.style.cssText = 'width:min(430px,100%);background:#181818;color:#fff;border:1px solid #d4af37;border-radius:14px;padding:20px;box-sizing:border-box;box-shadow:0 18px 70px #000';
    card.innerHTML = '<h2 style="margin:0 0 10px;color:#ffd85e;font-size:1.25rem">🔄 Доступно обновление</h2>' +
      '<p style="margin:0 0 8px;line-height:1.5;color:#ddd">Версия <strong>'+String(state.manifest.version)+'</strong> найдена.</p>' +
      '<p id="dndStartupUpdateStatus" style="margin:0 0 10px;line-height:1.45;color:#aaa">Подготавливаю обновление…</p>' +
      '<div style="height:10px;background:#292929;border-radius:99px;overflow:hidden;border:1px solid #444"><div id="dndStartupUpdateBar" style="height:100%;width:0%;background:#d4af37;transition:width .15s ease"></div></div>' +
      '<div id="dndStartupUpdatePercent" style="margin-top:7px;text-align:center;color:#ffd85e;font-weight:700">0%</div>' +
      '<div style="display:flex;gap:8px;margin-top:14px"><button id="dndStartupUpdateLater" style="flex:1;padding:11px;border-radius:8px;border:1px solid #555;background:#333;color:#fff">Позже</button><button id="dndStartupUpdateApply" disabled style="flex:1;padding:11px;border-radius:8px;border:1px solid #d4af37;background:#5b4618;color:#aaa;font-weight:700">Загрузка…</button></div>';
    overlay.appendChild(card); document.body.appendChild(overlay);
    var status=card.querySelector('#dndStartupUpdateStatus'),bar=card.querySelector('#dndStartupUpdateBar'),pct=card.querySelector('#dndStartupUpdatePercent'),apply=card.querySelector('#dndStartupUpdateApply'),later=card.querySelector('#dndStartupUpdateLater');
    function progress(p){
      var total=Number(p&&p.total)||0,current=Number(p&&p.current)||0;
      var percent=total?Math.max(0,Math.min(100,Math.round(current/total*100))):0;
      if(bar)bar.style.width=percent+'%'; if(pct)pct.textContent=percent+'%';
      if(status)status.textContent=(p&&p.phase==='apply'?'Применяю обновление…':(p&&p.phase==='skip'?'Уже установлено, повторная загрузка не нужна…':'Загрузка обновления…'))+' '+percent+'%'+(p&&p.path?' · '+p.path:'');
    }
    later.onclick=function(){overlay.remove();};
    apply.onclick=async function(){
      apply.disabled=true;later.disabled=true;
      try { await applyStaged({onProgress:progress}); if(status)status.textContent='Готово. Перезапускаю приложение…'; }
      catch(e){ if(status)status.textContent='Не удалось применить: '+(e&&e.message||e);apply.disabled=false;later.disabled=false; }
    };
    if(options.stagePromise){
      options.stagePromise.then(function(result){
        if(result&&result.stageResult&&result.stageResult.staged){
          progress({phase:'download',current:state.manifest.files.length,total:state.manifest.files.length,path:'готово'});
          if(status)status.textContent='Обновление загружено и проверено. Можно устанавливать.';
          apply.disabled=false;apply.textContent='Установить обновление';apply.style.background='#9b6e13';apply.style.color='#fff';
        } else {
          if(status)status.textContent='Новая версия не была загружена.';apply.style.display='none';
        }
      }).catch(function(e){if(status)status.textContent='Ошибка загрузки: '+(e&&e.message||e);apply.disabled=true;});
    }
    return overlay;
  }

  function autoCheckForUpdates(options) {
    options=options||{};
    if(global.__dndUpdateCheckRunning)return global.__dndUpdateCheckRunning;
    var run = async function () {
      try {
        if (global.navigator && global.navigator.onLine === false) return;
        var state = await inspect();
        if (!state || !state.updateAvailable) return state;
        var prompt=showStartupUpdatePrompt(state);
        var stagePromise=checkAndStage({onProgress:function(p){
          var card=prompt&&prompt.querySelector?prompt.querySelector('#dndStartupUpdateStatus'):null;
          var bar=prompt&&prompt.querySelector?prompt.querySelector('#dndStartupUpdateBar'):null;
          var pct=prompt&&prompt.querySelector?prompt.querySelector('#dndStartupUpdatePercent'):null;
          var total=Number(p&&p.total)||0,current=Number(p&&p.current)||0,percent=total?Math.round(current/total*100):0;
          if(bar)bar.style.width=percent+'%';if(pct)pct.textContent=percent+'%';if(card)card.textContent=(p&&p.phase==='apply'?'Применяю обновление…':(p&&p.phase==='skip'?'Уже установлено, повторная загрузка не нужна…':'Загрузка обновления…'))+' '+percent+'%'+(p&&p.path?' · '+p.path:'');
        }});
        stagePromise.then(function(result){
          var st=prompt&&prompt.querySelector?prompt.querySelector('#dndStartupUpdateStatus'):null;
          var bar=prompt&&prompt.querySelector?prompt.querySelector('#dndStartupUpdateBar'):null;
          var pc=prompt&&prompt.querySelector?prompt.querySelector('#dndStartupUpdatePercent'):null;
          if(result&&result.stageResult&&result.stageResult.staged){
            if(bar)bar.style.width='100%'; if(pc)pc.textContent='100%';
            if(st)st.textContent='Обновление загружено и проверено. Можно устанавливать.';
            var ap=prompt&&prompt.querySelector?prompt.querySelector('#dndStartupUpdateApply'):null;
            if(ap){ap.disabled=false;ap.textContent='Установить обновление';ap.style.background='#9b6e13';ap.style.color='#fff';}
          }
        }).catch(function(e){
          var st=prompt&&prompt.querySelector?prompt.querySelector('#dndStartupUpdateStatus'):null;
          if(st)st.textContent='Ошибка загрузки: '+(e&&e.message||e);
        });
        return await stagePromise;
      } catch(e){try{console.warn('DND update check failed:',e);}catch(_){} return null;}
      finally{global.__dndUpdateCheckRunning=null;}
    };
    global.__dndUpdateCheckRunning=run(); return global.__dndUpdateCheckRunning;
  }

  function updateUiProgress(show,current,total,path){var box=document.getElementById('settingsUpdateProgress'),bar=document.getElementById('settingsUpdateProgressBar'),label=document.getElementById('settingsUpdateProgressLabel');if(!box)return;box.style.display=show?'block':'none';if(total>0){var pct=Math.round(current/total*100);if(bar)bar.style.width=pct+'%';if(label)label.textContent='Загрузка обновления: '+pct+'% — '+current+' из '+total+(path?' · '+path:'');}}
  async function settingsCheck(){var status=document.getElementById('settingsUpdateStatus'),apply=document.getElementById('settingsUpdateApplyButton');if(status)status.textContent='Проверяю GitHub…';if(apply)apply.style.display='none';updateUiProgress(true,0,0,'');try{var state=await checkAndStage({onProgress:function(p){updateUiProgress(true,p.current||0,p.total||0,p.path||'');}});if(state&&state.updateAvailable){if(status)status.textContent='Доступно обновление до v'+state.manifest.version+'. Загружено и проверено.';if(apply)apply.style.display='block';updateUiProgress(true,state.manifest.files.length,state.manifest.files.length,'готово');}else{if(status)status.textContent='Установлена актуальная версия v'+(state&&state.currentVersion||APP_VERSION)+'.';updateUiProgress(false,0,0,'');}return state;}catch(e){if(status)status.textContent='Ошибка проверки: '+(e&&e.message||e);updateUiProgress(false,0,0,'');return null;}}
  async function settingsApply(){var status=document.getElementById('settingsUpdateStatus'),apply=document.getElementById('settingsUpdateApplyButton');if(apply)apply.disabled=true;if(status)status.textContent='Применяю обновление… 0%';try{await applyStaged({onProgress:function(p){var t=Number(p&&p.total)||0,c=Number(p&&p.current)||0;if(status)status.textContent='Применяю обновление… '+(t?Math.round(c/t*100):0)+'%';}});if(status)status.textContent='Обновление применено. Перезапускаю приложение…';}catch(e){if(status)status.textContent='Не удалось применить: '+(e&&e.message||e);if(apply)apply.disabled=false;}}
  function refreshSettingsVersion(){var e=document.getElementById('settingsCurrentVersion');if(!e)return;inspect().then(function(s){if(s&&s.currentVersion)e.textContent='v'+s.currentVersion;}).catch(function(){});}
  global.DND_UPDATE_UI={check:settingsCheck,apply:settingsApply,refresh:refreshSettingsVersion};

  global.DND_UPDATE_MANAGER = {
    autoCheckForUpdates: autoCheckForUpdates,
    VERSION: APP_VERSION,
    getConfig: getConfig,
    setManifestUrl: setManifestUrl,
    setChannel: setChannel,
    compareVersions: compareVersions,
    validateManifest: validateManifest,
    fetchManifest: fetchManifest,
    inspect: inspect,
    stage: stage,
    checkAndStage: checkAndStage,
    setProgressHandler: setProgressHandler,
    getStaged: getStaged,
    clearStaged: clearStaged,
    canApplyNatively: canApplyNatively,
    applyStaged: applyStaged
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoCheckForUpdates);
  } else {
    autoCheckForUpdates();
  }
})(window);
