/* DND VTT — lightweight application updater contract.
 * The Android/native shell performs the final filesystem replacement.
 * The browser layer is responsible for manifest fetch, version checks,
 * SHA-256 verification and staging. No arbitrary script is executed.
 */
(function (global) {
  'use strict';

  var APP_VERSION = '70.33.6'
  // V70.25.91: parchment asset/update audit; stable manifest includes index.html and required root parchment assets. Trigger manifest regeneration with current workflow policy.
  // Public manifest is stored in the repository; do not depend on GitHub Pages.
  var DEFAULT_MANIFEST_URL = 'https://waitermisanthrope-creator.github.io/DnD-VTT/updates/stable.json';
  var FALLBACK_MANIFEST_URL = 'https://raw.githubusercontent.com/waitermisanthrope-creator/DnD-VTT/main/updates/stable.json';
  var MANIFEST_CACHE_BUSTER = 'dnd-vtt-113-pages-fallback'
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

  async function getNativeStorageStats() {
    try {
      var native = nativeRequest('storage', '');
      if (!native) return null;
      return await native;
    } catch (_) {
      return null;
    }
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
    var candidates = [String(url).trim(), DEFAULT_MANIFEST_URL, FALLBACK_MANIFEST_URL].filter(function (item, index, list) {
      return item && list.indexOf(item) === index;
    });
    var lastError = null;
    var found = [];
    for (var i = 0; i < candidates.length; i++) {
      var candidate = candidates[i];
      try {
        // Add the cache buster to every candidate, not only the configured URL.
        // GitHub Pages may otherwise return an older cached stable.json while raw
        // GitHub already contains the newer manifest.
        var requestUrl = candidate + (candidate.indexOf('?') >= 0 ? '&' : '?') + 'cb=' + MANIFEST_CACHE_BUSTER;
        var response = await global.fetch(requestUrl, { cache: 'no-store' });
        if (!response.ok) throw new Error('HTTP ' + response.status);
        var manifest = await response.json();
        validateManifest(manifest);
        found.push({ manifest: manifest, url: candidate });
      } catch (e) {
        lastError = e;
      }
    }
    if (!found.length) {
      throw new Error('Не удалось получить манифест обновления: ' + (lastError && lastError.message || 'нет связи'));
    }

    // Never trust the first endpoint blindly. Pages/CDN/localStorage can be stale;
    // choose the newest valid manifest returned by any configured fallback.
    found.sort(function (a, b) {
      return compareVersions(String(b.manifest.version), String(a.manifest.version));
    });
    return found[0];
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
    var fetched = await fetchManifest(cfg.manifestUrl);
    var manifest = fetched.manifest;
    var manifestUrl = fetched.url;
    var runtimeVersion = await getRuntimeAppVersion();
    var compat = compatibility(manifest, runtimeVersion);
    return {
      configured: true,
      currentVersion: runtimeVersion,
      channel: cfg.channel,
      manifest: manifest,
      manifestUrl: manifestUrl,
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
    var totalBytes = manifest.files.reduce(function (sum, f) {
      return sum + Math.max(0, Number(f.bytes) || 0);
    }, 0);
    var downloadedBytes = 0;

    function report(extra) {
      if (typeof onProgress !== 'function') return;
      try {
        onProgress(Object.assign({
          phase: 'download',
          current: 0,
          total: manifest.files.length,
          bytesDone: downloadedBytes,
          bytesTotal: totalBytes
        }, extra || {}));
      } catch (_) {}
    }

    for (var i = 0; i < manifest.files.length; i++) {
      var entry = manifest.files[i];
      var expectedBytes = Math.max(0, Number(entry.bytes) || 0);
      report({ current: i + 1, path: entry.path });

      var response = await global.fetch(entry.url || joinUrl(base, entry.path), { cache: 'no-store' });
      if (!response.ok) throw new Error('Update file HTTP ' + response.status + ': ' + entry.path);

      if (response.body && typeof response.body.getReader === 'function') {
        var reader = response.body.getReader();
        var chunks = [];
        var received = 0;
        while (true) {
          var part = await reader.read();
          if (part.done) break;
          chunks.push(part.value);
          received += part.value.byteLength;
          report({ current: i + 1, path: entry.path, bytesDone: downloadedBytes + received });
        }
        var merged = new Uint8Array(received);
        var offset = 0;
        for (var ci = 0; ci < chunks.length; ci++) {
          merged.set(chunks[ci], offset);
          offset += chunks[ci].byteLength;
        }
        if (expectedBytes && expectedBytes !== merged.byteLength) throw new Error('Size mismatch: ' + entry.path);
        var hash = await sha256Hex(merged.buffer);
        if (hash.toLowerCase() !== String(entry.sha256).toLowerCase()) throw new Error('SHA-256 mismatch: ' + entry.path);
        files.push({ path: entry.path, bytes: merged.byteLength, sha256: hash, data: merged.buffer });
        downloadedBytes += merged.byteLength;
      } else {
        var buffer = await response.arrayBuffer();
        if (expectedBytes && expectedBytes !== buffer.byteLength) throw new Error('Size mismatch: ' + entry.path);
        var hashFallback = await sha256Hex(buffer);
        if (hashFallback.toLowerCase() !== String(entry.sha256).toLowerCase()) throw new Error('SHA-256 mismatch: ' + entry.path);
        files.push({ path: entry.path, bytes: buffer.byteLength, sha256: hashFallback, data: buffer });
        downloadedBytes += buffer.byteLength;
        report({ current: i + 1, path: entry.path });
      }
    }

    report({ phase: 'download', current: manifest.files.length, total: manifest.files.length, bytesDone: totalBytes || downloadedBytes, bytesTotal: totalBytes });

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
    native = nativeRequest('stage', state.manifestUrl || getConfig().manifestUrl);
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

  function createSmoothProgress(bar, pct) {
    var target=0,display=0,raf=0,last=0;
    function render(value) {
      display=value;
      if(bar) bar.style.width=(Math.round(value*10)/10)+'%';
      if(pct) pct.textContent=Math.round(value)+'%';
    }
    function frame(now) {
      if(!last) last=now;
      var dt=Math.min(64,now-last); last=now;
      var gap=target-display;
      if(Math.abs(gap)<0.08) { render(target); raf=0; last=0; return; }
      var duration=Math.max(220,Math.min(1400,280+Math.abs(gap)*11));
      var step=gap*(1-Math.pow(0.001,dt/duration));
      render(Math.max(0,Math.min(100,display+step)));
      raf=requestAnimationFrame(frame);
    }
    return {
      set:function(value) {
        target=Math.max(target,Math.max(0,Math.min(100,Number(value)||0)));
        if(!raf) { last=0; raf=requestAnimationFrame(frame); }
      },
      finish:function() { target=100; if(!raf) { last=0; raf=requestAnimationFrame(frame); } }
    };
  }

  function showStartupUpdatePrompt(state, options) {
    options = options || {};
    if (!state || !state.updateAvailable || !state.manifest) return null;
    if (document.getElementById('dndForestFireUpdateScene')) return document.getElementById('dndForestFireUpdateScene');

    var scene = (global.DND_UPDATE_SCENE && typeof global.DND_UPDATE_SCENE.create === 'function')
      ? global.DND_UPDATE_SCENE.create(state)
      : null;

    if (!scene) {
      var overlay = document.createElement('div');
      overlay.id = 'dndStartupUpdatePrompt';
      overlay.style.cssText = 'position:fixed;inset:0;z-index:120000;display:flex;align-items:center;justify-content:center;background:#111;color:#fff;font-family:system-ui,sans-serif';
      overlay.innerHTML = '<div style="padding:24px;text-align:center"><h2>Обновление приложения</h2><p id="dndStartupUpdateStatus">Подготавливаю обновление…</p></div>';
      document.body.appendChild(overlay);
      return overlay;
    }

    scene.onApply = async function () {
      try {
        await applyStaged({
          onProgress: function (p) {
            scene.setProgress(p);
          }
        });
        scene.finish();
      } catch (e) {
        scene.fail(e && e.message || e);
        scene.enableApply();
      }
    };

    return scene.overlay || scene;
  }

  function autoCheckForUpdates(options) {
    options = options || {};
    if (global.__dndUpdateCheckRunning) return global.__dndUpdateCheckRunning;

    var run = async function () {
      var scene = null;
      try {
        // WebView's navigator.onLine can be false even when HTTPS fetches work.
        // Never use it as a hard gate for the updater; let the manifest request decide.
        var state = await inspect();
        if (!state || !state.updateAvailable) return state;

        scene = showStartupUpdatePrompt(state);
        var stagePromise = checkAndStage({
          onProgress: function (p) {
            if (scene && scene.__sceneApi) scene.__sceneApi.setProgress(p);
            else if (scene && scene.setProgress) scene.setProgress(p);
          }
        });

        stagePromise.then(function (result) {
          if (result && result.stageResult && result.stageResult.staged) {
            if (scene && scene.__sceneApi) {
              scene.__sceneApi.finish();
              scene.__sceneApi.enableApply();
              // IMPORTANT: native apply restarts the WebView/application. Keep the
              // cinematic scene visible long enough for the user to actually see it.
              // Previously 850ms was too short and looked like an unexplained restart.
              scene.__sceneApi.setStatus('Проверка завершена. Дракон скрывается в дыму…');
              setTimeout(function () {
                if (scene && scene.__sceneApi && typeof scene.__sceneApi.onApply === 'function') {
                  scene.__sceneApi.onApply();
                }
              }, 6000);
            }
          }
        }).catch(function (e) {
          if (scene && scene.__sceneApi) scene.__sceneApi.fail(e && e.message || e);
        });

        return await stagePromise;
      } catch (e) {
        try { console.warn('DND update check failed:', e); } catch (_) {}
        if (scene && scene.__sceneApi) scene.__sceneApi.fail(e && e.message || e);
        return null;
      } finally {
        global.__dndUpdateCheckRunning = null;
      }
    };

    global.__dndUpdateCheckRunning = run();
    return global.__dndUpdateCheckRunning;
  }

  // V70.33.4: public deterministic scene test. Keep this in the updater module itself
  // so the debug button does not depend on another settings/debug script being loaded.
  function runSceneTest() {
    if (!global.DND_UPDATE_SCENE || typeof global.DND_UPDATE_SCENE.create !== 'function') {
      try { alert('Сцена обновления не загружена.'); } catch (_) {}
      return false;
    }
    var files = [
      ['index.html', 286000], ['app/app.js', 42000], ['app/update_manager.js', 21000],
      ['app/update_scene_v755.js', 15000], ['app/class_features_engine.js', 52000],
      ['app/combat_engine.js', 68000], ['app/assets/ui/forest_green.jpg', 980000],
      ['app/assets/ui/forest_burned.jpg', 1010000], ['app/assets/ui/fire_front.png', 214000],
      ['app/assets/ui/dragon.png', 118000], ['app/assets/ui/dragon_fire.png', 96000],
      ['app/assets/ui/update_scene_smoke.svg', 18000]
    ].map(function (item) { return { path:item[0], bytes:item[1], sha256:'0'.repeat(64) }; });
    var totalBytes = files.reduce(function (sum, f) { return sum + f.bytes; }, 0);
    var scene = global.DND_UPDATE_SCENE.create({ testMode:true, manifest:{version:'TEST', files:files} });
    var index=0, start=0, done=0, raf=0;
    function finish() {
      if (raf) cancelAnimationFrame(raf);
      scene.setProgress({current:files.length,total:files.length,bytesDone:totalBytes,bytesTotal:totalBytes,phase:'skip',path:''});
      scene.setStatus('Проверка завершена: все файлы условно проверены, ошибок нет.');
      scene.enableApply();
    }
    function frame(now) {
      if (!start) start=now;
      var elapsed=Math.min(380,now-start), file=files[index];
      var local=elapsed/380;
      scene.setProgress({current:index+1,total:files.length,bytesDone:done+Math.round(file.bytes*local),bytesTotal:totalBytes,phase:'skip',path:file.path});
      if (elapsed>=380) {
        done+=file.bytes; index++; start=now;
        if (index>=files.length) { finish(); return; }
      }
      raf=requestAnimationFrame(frame);
    }
    scene.setProgress({current:0,total:files.length,bytesDone:0,bytesTotal:totalBytes,phase:'skip',path:'подготовка…'});
    scene.setStatus('Имитация проверки файлов — реальные файлы не изменяются.');
    raf=requestAnimationFrame(frame);
    return true;
  }

  var settingsProgressAnimator=null;
  function updateUiProgress(show,current,total,path){
    var box=document.getElementById('settingsUpdateProgress'),bar=document.getElementById('settingsUpdateProgressBar'),label=document.getElementById('settingsUpdateProgressLabel');
    if(!box)return;
    box.style.display=show?'block':'none';
    if(show && !settingsProgressAnimator && bar) settingsProgressAnimator=createSmoothProgress(bar,null);
    if(!show){settingsProgressAnimator=null;return;}
    if(total>0){
      var pct=Math.max(0,Math.min(100,current/total*100));
      if(settingsProgressAnimator)settingsProgressAnimator.set(pct);
      if(label)label.textContent='Загрузка обновления: '+Math.round(pct)+'% — '+current+' из '+total+(path?' · '+path:'');
    }
  }
  async function settingsCheck(){var status=document.getElementById('settingsUpdateStatus'),apply=document.getElementById('settingsUpdateApplyButton');if(status)status.textContent='Проверяю GitHub…';if(apply)apply.style.display='none';updateUiProgress(true,0,0,'');try{var state=await checkAndStage({onProgress:function(p){updateUiProgress(true,p.current||0,p.total||0,p.path||'',p.bytesDone,p.bytesTotal);}});if(state&&state.updateAvailable){if(status)status.textContent='Доступно обновление до v'+state.manifest.version+'. Загружено и проверено.';if(apply)apply.style.display='block';updateUiProgress(true,state.manifest.files.length,state.manifest.files.length,'готово');if(settingsProgressAnimator)settingsProgressAnimator.finish();}else{if(status)status.textContent='Установлена актуальная версия v'+(state&&state.currentVersion||APP_VERSION)+'.';updateUiProgress(false,0,0,'');}return state;}catch(e){if(status)status.textContent='Ошибка проверки: '+(e&&e.message||e);updateUiProgress(false,0,0,'');return null;}}
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
    getNativeStorageStats: getNativeStorageStats,
    applyStaged: applyStaged,
    runSceneTest: runSceneTest
  };

  function scheduleStartupUpdateCheck() {
    // Run after the DOM, after the splash, and once on pageshow. The shared guard
    // prevents duplicate network/staging work when several lifecycle events fire.
    var run = function () { try { autoCheckForUpdates(); } catch (_) {} };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run, { once:true });
    else run();
    global.addEventListener('dnd:splash-complete', run, { once:true });
    global.addEventListener('pageshow', run, { once:true });
    setTimeout(run, 1800);
  }
  scheduleStartupUpdateCheck();
})(window);
