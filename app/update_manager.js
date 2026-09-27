/* DND VTT — lightweight application updater contract.
 * The Android/native shell performs the final filesystem replacement.
 * The browser layer is responsible for manifest fetch, version checks,
 * SHA-256 verification and staging. No arbitrary script is executed.
 */
(function (global) {
  'use strict';

  var APP_VERSION = '70.25.61';
  var DEFAULT_MANIFEST_URL = '';
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

  function compatibility(manifest) {
    if (manifest.minAppVersion && compareVersions(APP_VERSION, manifest.minAppVersion) < 0) {
      return { ok: false, reason: 'minimum-app-version', minAppVersion: manifest.minAppVersion };
    }
    if (Array.isArray(manifest.blockedVersions) && manifest.blockedVersions.indexOf(APP_VERSION) !== -1) {
      return { ok: false, reason: 'blocked-current-version' };
    }
    return { ok: true };
  }

  async function inspect() {
    var cfg = getConfig();
    if (!cfg.manifestUrl) return { configured: false, currentVersion: APP_VERSION, channel: cfg.channel };
    var manifest = await fetchManifest(cfg.manifestUrl);
    var compat = compatibility(manifest);
    return {
      configured: true,
      currentVersion: APP_VERSION,
      channel: cfg.channel,
      manifest: manifest,
      compatibility: compat,
      updateAvailable: compat.ok && compareVersions(manifest.version, APP_VERSION) > 0
    };
  }

  async function stage(manifest) {
    validateManifest(manifest);
    var compat = compatibility(manifest);
    if (!compat.ok) throw new Error('Update rejected: ' + compat.reason);
    if (compareVersions(manifest.version, APP_VERSION) <= 0) return { staged: false, reason: 'not-newer' };

    var base = manifest.baseUrl || '';
    var files = [];
    for (var i = 0; i < manifest.files.length; i++) {
      var entry = manifest.files[i];
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

  async function checkAndStage() {
    var state = await inspect();
    if (!state.configured || !state.updateAvailable) return state;
    state.stageResult = await stage(state.manifest);
    return state;
  }

  function canApplyNatively() {
    return !!(global.DndUpdater && typeof global.DndUpdater.applyStagedUpdate === 'function');
  }

  async function applyStaged() {
    var staged = getStaged();
    if (!staged) throw new Error('No staged update');
    if (!canApplyNatively()) throw new Error('Native updater is not available; update remains safely staged.');
    var result = await global.DndUpdater.applyStagedUpdate(staged);
    if (result === false) throw new Error('Native updater rejected the staged update');
    clearStaged();
    return result || true;
  }

  global.DND_UPDATE_MANAGER = {
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
    getStaged: getStaged,
    clearStaged: clearStaged,
    canApplyNatively: canApplyNatively,
    applyStaged: applyStaged
  };
})(window);
