'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const crypto = require('node:crypto');
const { DesktopWebUpdater, validRelative, assertSource, compare } = require('../desktop/update.cjs');

(async () => {
  assert.equal(compare('74.00.63','74.0.62'), 1);
  assert.throws(()=>validRelative('../outside.exe'));
  assert.throws(()=>validRelative('app/../../shell.js'));
  assert.throws(()=>assertSource('https://attacker.invalid/manifest.json'));
  assert.throws(()=>assertSource('http://raw.githubusercontent.com/waitermisanthrope-creator/DnD-VTT/main/updates/stable.json'));
  assert.equal(validRelative('app/assets/dice/ChatGPT Image Sep 30, 2026, 07_08_07 PM.png'),
    'app/assets/dice/ChatGPT Image Sep 30, 2026, 07_08_07 PM.png');

  const root = fs.mkdtempSync(path.join(os.tmpdir(),'dnd-desktop-ota-'));
  const bundled = path.join(root,'bundled');
  const data = path.join(root,'userdata');
  fs.mkdirSync(path.join(bundled,'app'),{recursive:true});
  fs.writeFileSync(path.join(bundled,'index.html'),'<html>old</html>');
  fs.writeFileSync(path.join(bundled,'app/update_manager_v2.js'),'/* old */');
  const app = {
    getPath: () => data,
    getVersion: () => '74.0.62',
    relaunch: () => {},
    exit: () => {}
  };
  const updater = new DesktopWebUpdater(app,bundled);
  const incoming = new Map([
    ['index.html',Buffer.from('<html>new</html>')],
    ['app/update_manager_v2.js',Buffer.from('/* new */')]
  ]);
  function manifest(version) {
    return {
      version,
      baseUrl:'https://raw.githubusercontent.com/waitermisanthrope-creator/DnD-VTT/main',
      files:[...incoming].map(([p,buf])=>({path:p,bytes:buf.length,sha256:crypto.createHash('sha256').update(buf).digest('hex')}))
    };
  }
  const previousFetch = global.fetch;
  try {
    global.fetch = async url => {
      const u = new URL(url);
      if (u.pathname.endsWith('/updates/stable.json')) return new Response(JSON.stringify(manifest('74.00.63')),{status:200});
      const entry = [...incoming].find(([p]) => u.pathname.endsWith('/'+p));
      return entry ? new Response(entry[1],{status:200}) : new Response('Missing',{status:404});
    };
    const responses=[];
    const link='https://raw.githubusercontent.com/waitermisanthrope-creator/DnD-VTT/main/updates/stable.json';
    const staged=await updater.handle({id:'a',type:'stage',manifestUrl:link},p=>responses.push(p));
    assert.equal(staged.ok,true,staged.value);
    assert(responses.some(p=>p.status==='progress'));
    assert(fs.existsSync(path.join(updater.staging,'index.html')));
    const applied=await updater.handle({id:'b',type:'apply'},()=>{});
    assert.equal(applied.ok,true,applied.value);
    assert.equal(updater.getActiveVersion(),'74.00.63');
    assert.equal(updater.state.pending,true);
    assert.equal(fs.readFileSync(path.join(updater.getWebRoot(),'index.html'),'utf8'),'<html>new</html>');
    await updater.bootHealthy();
    assert.equal(updater.state.pending,false);
    // A bad hash must reject the complete update, preserving the active version.
    global.fetch = async url => {
      const u=new URL(url);
      if (u.pathname.endsWith('/updates/stable.json')) {
        const m=manifest('74.00.64');
        m.files[0].sha256='a'.repeat(64);
        return new Response(JSON.stringify(m),{status:200});
      }
      const entry=[...incoming].find(([p])=>u.pathname.endsWith('/'+p));
      return entry ? new Response(entry[1],{status:200}) : new Response('Missing',{status:404});
    };
    const rejected=await updater.handle({id:'c',type:'stage',manifestUrl:link},()=>{});
    assert.equal(rejected.ok,false);
    assert.equal(updater.getActiveVersion(),'74.00.63');
    console.log('Desktop OTA contract: manifest validation, SHA-256, apply and rollback state PASS');
  } finally {
    global.fetch=previousFetch;
    fs.rmSync(root,{recursive:true,force:true});
  }
})().catch(e=>{console.error(e);process.exitCode=1;});