'use strict';

// Windows counterpart of Android DndUpdateBridge: same manifest, nativeRequest
// message types and progress schema. Web content only, NOT a binary EXE updater.
const fs = require('node:fs');
const fsp = require('node:fs/promises');
const path = require('node:path');
const crypto = require('node:crypto');

const SEMVER = /^\d+\.\d+\.\d+$/;
const SAFE_FILE = /^(?:index\.html|app\/[^\u0000-\u001f\\:]+\.[a-zA-Z0-9]+|wallpapers\/[^\u0000-\u001f\\:]+|ambience\/[^\u0000-\u001f\\:]+|[a-zA-Z0-9_ .()@+\-]+\.(?:png|jpg|jpeg|svg|webp|glb|mp3))$/;
const MAX_FILES = 12000;
const MAX_TOTAL_BYTES = 3 * 1024 ** 3;
const BASE_HOSTS = new Set(['raw.githubusercontent.com', 'waitermisanthrope-creator.github.io']);
function assertSource(input) {
  const u = new URL(input);
  if (u.protocol !== 'https:' || u.username || u.password || !BASE_HOSTS.has(u.hostname)) throw Error('Unapproved update host');
  if (u.hostname === 'raw.githubusercontent.com' && !u.pathname.startsWith('/waitermisanthrope-creator/DnD-VTT/')) throw Error('Unapproved GitHub repository');
  if (u.hostname.endsWith('github.io') && !u.pathname.startsWith('/DnD-VTT/')) throw Error('Unapproved update Pages path');
  return u.toString();
}
function validRelative(rel) {
  if (typeof rel !== 'string' || rel.includes('..') || rel.startsWith('/') || rel.includes('\\') || !SAFE_FILE.test(rel) || rel.split('/').some(x => x === '.' || x === '' || x === '..')) throw Error('Unsafe update path: ' + rel);
  return rel;
}
function compare(a, b) {
  const x = String(a).split('.').map(Number), y = String(b).split('.').map(Number);
  for (let i = 0; i < 3; i++) if (x[i] !== y[i]) return x[i] > y[i] ? 1 : -1;
  return 0;
}
function hashFile(p) {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('sha256');
    const stream = fs.createReadStream(p);
    stream.on('data', chunk => hash.update(chunk));
    stream.on('error', reject);
    stream.on('end', () => resolve(hash.digest('hex')));
  });
}

class DesktopWebUpdater {
  constructor(app, bundledWebroot) {
    this.app = app;
    this.bundledWebroot = bundledWebroot;
    this.dataRoot = path.join(app.getPath('userData'), 'vtt-web-update');
    this.versions = path.join(this.dataRoot, 'versions');
    this.staging = path.join(this.dataRoot, 'staging');
    this.stateFile = path.join(this.dataRoot, 'active.json');
    this.state = this.readState();
    this.running = false;
  }
  embeddedVersion() { return this.app.getVersion(); }
  readState() {
    try {
      const s = JSON.parse(fs.readFileSync(this.stateFile, 'utf8'));
      if (s && SEMVER.test(s.active) && (!s.previous || SEMVER.test(s.previous))) return s;
    } catch (_) {}
    return {active: this.embeddedVersion(), previous: null, pending: false};
  }
  getActiveVersion() {
    return this.getWebRoot() === this.bundledWebroot ? this.embeddedVersion() : this.state.active;
  }
  getWebRoot() {
    // Installing a newer EXE must supersede an older user-data web version.
    // Ignore cosmetic zero padding such as 74.00.63 vs 74.0.63.
    if (compare(this.embeddedVersion(), this.state.active) >= 0) return this.bundledWebroot;
    const candidate = path.join(this.versions, this.state.active);
    return fs.existsSync(path.join(candidate, 'index.html')) ? candidate : this.bundledWebroot;
  }
  async persist(s) {
    await fsp.mkdir(this.dataRoot, {recursive: true});
    const tmp = this.stateFile + '.tmp';
    await fsp.writeFile(tmp, JSON.stringify(s), {encoding:'utf8'});
    await fsp.rename(tmp, this.stateFile);
    this.state = s;
  }
  async bootHealthy() {
    if (!this.state.pending) return;
    await this.persist({...this.state, pending: false});
    await this.cleanup();
  }
  async rollback() {
    if (!this.state.pending) return false;
    const previous = this.state.previous && (this.state.previous === this.embeddedVersion() ||
      fs.existsSync(path.join(this.versions, this.state.previous, 'index.html'))) ? this.state.previous : this.embeddedVersion();
    await this.persist({active: previous, previous: null, pending: false});
    return true;
  }
  async cleanup() {
    try {
      const keep = new Set([this.state.active, this.state.previous].filter(Boolean));
      for (const dir of await fsp.readdir(this.versions, {withFileTypes:true})) {
        if (dir.isDirectory() && !keep.has(dir.name)) await fsp.rm(path.join(this.versions, dir.name), {recursive:true, force:true});
      }
    } catch (_) {}
    await fsp.rm(this.staging, {recursive:true, force:true}).catch(() => {});
  }
  async getManifest(url) {
    const source = assertSource(url);
    const response = await fetch(source, {signal: AbortSignal.timeout(40000), cache:'no-store'});
    if (!response.ok) throw Error('Manifest HTTP ' + response.status);
    const manifest = await response.json();
    if (!manifest || !SEMVER.test(manifest.version) || !Array.isArray(manifest.files) ||
        !manifest.files.length || manifest.files.length > MAX_FILES) throw Error('Invalid manifest');
    const unique = new Set();
    let total = 0;
    if (manifest.baseUrl) assertSource(manifest.baseUrl);
    for (const file of manifest.files) {
      validRelative(file.path);
      if (unique.has(file.path)) throw Error('Duplicate path ' + file.path);
      unique.add(file.path);
      if (!/^[a-f0-9]{64}$/i.test(file.sha256) ||
          !Number.isSafeInteger(file.bytes) || file.bytes < 0 || file.bytes > 600 * 1024 * 1024) throw Error('Invalid hash or size for ' + file.path);
      total += file.bytes;
      if (total > MAX_TOTAL_BYTES) throw Error('Update is too large');
      if (file.url) assertSource(file.url);
    }
    if (!unique.has('index.html') || !unique.has('app/update_manager_v2.js')) throw Error('Incomplete game update');
    return {manifest, total};
  }
  async stage(id, url, reply) {
    if (this.running) throw Error('An update is already being staged');
    this.running = true;
    try {
      const {manifest, total} = await this.getManifest(url);
      if (compare(manifest.version, this.getActiveVersion()) <= 0) throw Error('Update is not newer');
      await fsp.rm(this.staging, {recursive:true, force:true});
      await fsp.mkdir(this.staging, {recursive:true});
      const active = this.getWebRoot();
      let completedBytes = 0;
      for (const [i, file] of manifest.files.entries()) {
        const dest = path.join(this.staging, file.path);
        await fsp.mkdir(path.dirname(dest), {recursive:true});
        const local = path.join(active, file.path);
        let reused = false;
        try {
          if ((await fsp.stat(local)).size === file.bytes && (await hashFile(local)).toLowerCase() === file.sha256.toLowerCase()) {
            await fsp.copyFile(local, dest);
            reused = true;
          }
        } catch (_) {}
        reply({id,status:'progress',phase:reused?'skip':'download',current:i+1,total:manifest.files.length,path:file.path,bytesDone:completedBytes,bytesTotal:total});
        if (!reused) {
          const base = String(manifest.baseUrl || '').replace(/\/+$/, '');
          const urlPath = file.path.split('/').map(encodeURIComponent).join('/');
          const fileUrl = assertSource(file.url || base + '/' + urlPath);
          const u = new URL(fileUrl);
          u.searchParams.set('dndvtt_update', manifest.version + '-' + file.sha256);
          const response = await fetch(u, {signal:AbortSignal.timeout(180000)});
          if (!response.ok) throw Error('Asset HTTP ' + response.status + ': ' + file.path);
          const handle = await fsp.open(dest, 'w');
          let received = 0;
          const hash = crypto.createHash('sha256');
          try {
            for await (const chunk of response.body) {
              received += chunk.length;
              if (received > file.bytes) throw Error('Oversized asset: ' + file.path);
              hash.update(chunk);
              await handle.write(chunk);
              reply({id,status:'progress',phase:'download',current:i+1,total:manifest.files.length,path:file.path,bytesDone:completedBytes+received,bytesTotal:total});
            }
          } finally {await handle.close();}
          if (received !== file.bytes || hash.digest('hex').toLowerCase() !== file.sha256.toLowerCase()) throw Error('SHA-256/size mismatch: ' + file.path);
        }
        completedBytes += file.bytes;
      }
      await fsp.writeFile(path.join(this.staging, 'manifest.json'), JSON.stringify(manifest));
      return {id,ok:true,status:'staged',value:manifest.version};
    } catch (e) {
      await fsp.rm(this.staging,{recursive:true,force:true}).catch(()=>{});
      throw e;
    } finally {this.running = false;}
  }
  async apply(id, reply) {
    if (this.running) throw Error('Update is still downloading');
    const manifestPath = path.join(this.staging, 'manifest.json');
    const manifest = JSON.parse(await fsp.readFile(manifestPath,'utf8'));
    if (!SEMVER.test(manifest.version) || compare(manifest.version,this.getActiveVersion()) <= 0) throw Error('Invalid staged version');
    await fsp.mkdir(this.versions, {recursive:true});
    const dest = path.join(this.versions,manifest.version);
    await fsp.rm(dest,{recursive:true,force:true});
    reply({id,status:'progress',phase:'apply',current:0,total:1,path:'Переключение версии'});
    await fsp.rename(this.staging,dest);
    try {
      await this.persist({active:manifest.version,previous:this.getActiveVersion(),pending:true});
    } catch (e) {
      await fsp.rename(dest,this.staging).catch(()=>{});
      throw e;
    }
    setTimeout(()=>{this.app.relaunch();this.app.exit(0);},650);
    return {id,ok:true,status:'applied',value:manifest.version};
  }
  async handle(req, reply) {
    const id = typeof req.id==='string' ? req.id : '';
    try {
      if (req.type === 'version') return {id,ok:true,status:'version',value:this.getActiveVersion()};
      if (req.type === 'stage') return await this.stage(id,req.manifestUrl,reply);
      if (req.type === 'apply') return await this.apply(id,reply);
      if (req.type === 'rollback') {
        const rolled = await this.rollback();
        if (rolled) setTimeout(()=>{this.app.relaunch();this.app.exit(0);},500);
        return {id,ok:true,status:'rollback',value:String(rolled)};
      }
      if (req.type === 'storage') return {id,ok:true,status:'storage',value:'Windows'};
      return {id,ok:false,status:'unknown-request',value:'Unsupported desktop request'};
    } catch(e) {return {id,ok:false,status:'update-failed',value:e.message || String(e)};}
  }
}
module.exports = {DesktopWebUpdater, validRelative, assertSource, compare};