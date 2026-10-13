/** Behavioral tests for shared CloudSync: mock Supabase Auth/REST, independent
 * device storage, offline restarts, CAS conflicts, lost acknowledgements and owners.
 * Run with node tests/cloud_sync_test.cjs; no live project or secrets required.
 */
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),crypto=require('node:crypto');
const source=fs.readFileSync(__dirname+'/../app/cloud_sync.js','utf8');
const appearanceSource=fs.readFileSync(__dirname+'/../app/3dmap/character_appearance_store.js','utf8');
const KEY='dnd_multi_characters_v2',JOURNAL='dnd_cloud_journal_v1';
const cfg={projectUrl:'https://example.supabase.co',publishableKey:'sb_publishable_test'};
const copy=v=>JSON.parse(JSON.stringify(v));
class Server {
  constructor(){this.rows=new Map();this.receipts=new Map();this.history=new Map();this.calls=[];this.loseReply=false;this.hold=null;}
  session(owner){return {user:{id:owner,email:owner+'@example.com'},access_token:owner,refresh_token:owner,expires_in:3600};}
  async fetch(url,opts){
    const u=new URL(url),body=opts.body&&JSON.parse(opts.body),owner=(opts.headers.Authorization||'').replace('Bearer ','');
    this.calls.push({path:u.pathname,owner,body});
    const response=(status,data)=>({ok:status<400,status,text:async()=>data==null?'':JSON.stringify(data)});
    if(u.pathname==='/auth/v1/token'){
      if(body.refresh_token)return response(200,this.session(body.refresh_token));
      if(!['password123','123456'].includes(body.password))return response(400,{});
      return response(200,this.session(body.email.split('@')[0]));
    }
    if(u.pathname==='/auth/v1/signup')return response(200,{user:{id:'a'}});
    if(u.pathname==='/auth/v1/recover')return response(200,{});
    if(u.pathname==='/auth/v1/verify')return body.token==='123456'?response(200,this.session(body.email.split('@')[0])):response(400,{});
    if(u.pathname==='/auth/v1/logout')return response(204,null);
    if(u.pathname==='/auth/v1/user')return response(200,{});
    if(!owner)return response(401,{});
    if(u.pathname==='/rest/v1/rpc/save_character'){
      const receiptKey=owner+'/'+body.p_operation_id,key=owner+'/'+body.p_id;
      if(this.receipts.has(receiptKey))return response(200,this.receipts.get(receiptKey));
      const old=this.rows.get(key);
      if((old?old.revision:0)!==body.p_expected_revision)return response(200,{conflict:true,character:old||null});
      const row={owner_id:owner,id:body.p_id,revision:(old?old.revision:0)+1,profile:body.p_profile,schema_version:body.p_schema_version,deleted:body.p_deleted,updated_at:new Date().toISOString()};
      this.rows.set(key,copy(row));const result={conflict:false,character:row};this.receipts.set(receiptKey,copy(result));
      const h=this.history.get(key)||[];h.unshift(copy(row));this.history.set(key,h);
      if(this.hold)await this.hold;
      if(this.loseReply){this.loseReply=false;throw Error('Lost response');}
      return response(200,result);
    }
    if(u.pathname==='/rest/v1/characters')return response(200,[...this.rows.values()].filter(r=>r.owner_id===owner).slice(Number(u.searchParams.get('offset')),Number(u.searchParams.get('offset'))+500));
    if(u.pathname==='/rest/v1/character_history')return response(200,this.history.get(owner+'/'+u.searchParams.get('id').slice(3))||[]);
    return response(404,{});
  }
}
function device(server,seed={}){
  const map=new Map(Object.entries(seed)),timers=new Map(),events={},g={console,crypto:crypto.webcrypto,Uint8Array,URL,AbortController,atob,Set,Date,JSON,Math,navigator:{onLine:true},DNDCloudConfig:cfg,
    setTimeout:f=>{const id=crypto.randomUUID();timers.set(id,f);return id;},clearTimeout:id=>timers.delete(id),addEventListener:(k,f)=>{events[k]=f;},fetch:(...args)=>server.fetch(...args)};
  g.window=g;g.__map=map;vm.createContext(g);
  vm.runInContext(`class Storage {getItem(k){return window.__map.get(String(k))??null;}setItem(k,v){window.__map.set(String(k),String(v));}removeItem(k){window.__map.delete(String(k));}clear(){window.__map.clear();}}window.Storage=Storage;window.localStorage=new Storage();`,g);
  vm.runInContext(source,g);vm.runInContext(appearanceSource,g);
  return {g,map,timers,events,api:g.DNDCloudSync,roster:()=>JSON.parse(map.get(KEY)||'[]'),save(a){g.localStorage.setItem(KEY,JSON.stringify(a));},restart(){return device(server,Object.fromEntries(map));}};
}
const hero={id:'char_legacy',name:'Герой',schemaVersion:3,hpCurrent:10,stats:{str:18},inventory:[{name:'Меч',count:1}],classes:[{name:'Воин',level:4}],spellsData:[{name:'Щит'}],resources:{rage:2},appearance3d:{gender:'female',morphs:{height:.7},colors:{skin:'#aabbcc'}}};
async function main(){
  let passed=0;const test=async(name,fn)=>{await fn();passed++;console.log('PASS '+name);};
  await test('guest bytes, explicit migration, Windows → Android full profile and appearance',async()=>{
    const server=new Server(),raw=JSON.stringify([hero]),pc=device(server,{[KEY]:raw});
    assert.equal(pc.map.get(KEY),raw);await pc.api.login('a@example.com','password123');assert.equal(pc.roster().length,0);
    pc.api.importLocal();await pc.api.sync();const cloud=[...server.rows.values()][0];assert.equal(cloud.profile.appearance3d.morphs.height,.7);
    const phone=device(server);await phone.api.login('a@example.com','password123');assert.equal(phone.roster()[0].hpCurrent,10);assert.deepEqual(phone.roster()[0].inventory,hero.inventory);
    phone.g.currentCharacterId=phone.roster()[0].id;phone.g.currentChar=phone.roster()[0];phone.g.allCharacters=[phone.g.currentChar];
    phone.g.DNDCharacterAppearanceStore.save(phone.g.DNDCharacterAppearanceStore.open(),{morphs:{height:.9},hair:'braid'});await phone.api.sync();await pc.api.sync();assert.equal(pc.roster()[0].appearance3d.hair,'braid');
    await pc.api.logout();assert.equal(pc.map.get(KEY),raw);assert.equal(pc.api.snapshot().status,'Гость');
  });
  await test('offline queue persists through restart; Android → Windows',async()=>{
    const server=new Server(),pc=device(server,{[KEY]:JSON.stringify([hero])});await pc.api.login('a@example.com','password123');pc.api.importLocal();await pc.api.sync();
    let phone=device(server);await phone.api.login('a@example.com','password123');phone.g.navigator.onLine=false;let a=phone.roster();a[0].hpCurrent=2;a[0].spellsData.push({name:'Свет'});phone.save(a);await phone.api.sync();assert.equal(phone.api.snapshot().status,'Офлайн');
    phone=phone.restart();assert.equal(phone.roster()[0].hpCurrent,2);assert.equal(phone.api.snapshot().pending,1);await phone.api.sync();await pc.api.sync();assert.equal(pc.roster()[0].hpCurrent,2);assert.equal(pc.roster()[0].spellsData.length,2);
  });
  await test('two devices preserve stale local version; conflict copy and history restore',async()=>{
    const server=new Server(),pc=device(server,{[KEY]:JSON.stringify([hero])});await pc.api.login('a@example.com','password123');pc.api.importLocal();await pc.api.sync();
    const phone=device(server);await phone.api.login('a@example.com','password123');let a=pc.roster();a[0].hpCurrent=7;pc.save(a);await pc.api.sync();a=phone.roster();a[0].hpCurrent=1;phone.save(a);await phone.api.sync();
    assert.equal(phone.api.snapshot().conflicts.length,1);assert.equal([...server.rows.values()][0].profile.hpCurrent,7);assert.equal(phone.roster()[0].hpCurrent,1);
    phone.api.resolve(phone.roster()[0].id,'copy');await phone.api.sync();assert.equal(server.rows.size,2);assert.deepEqual(phone.roster().map(c=>c.hpCurrent).sort(),[1,7]);
    const id=pc.roster()[0].id;await pc.api.restore(id,1);await pc.api.sync();assert.equal(pc.roster().find(c=>c.id===id).hpCurrent,10);assert.equal((await pc.api.history(id))[0].revision,3);
  });
  await test('explicit local/remote choice and tombstones never resurrect stale copies',async()=>{
    const server=new Server(),pc=device(server,{[KEY]:JSON.stringify([hero])});await pc.api.login('a@example.com','password123');pc.api.importLocal();await pc.api.sync();
    const phone=device(server);await phone.api.login('a@example.com','password123');pc.save([]);await pc.api.sync();let a=phone.roster();a[0].hpCurrent=6;phone.save(a);await phone.api.sync();assert.equal(phone.api.snapshot().conflicts[0].conflict.remote.deleted,true);
    phone.api.resolve(a[0].id,'remote');await phone.api.sync();assert.equal(phone.roster().length,0);await pc.api.sync();assert.equal(pc.roster().length,0);
    await phone.api.restore(a[0].id,1);await phone.api.sync();await pc.api.sync();assert.equal(pc.roster().length,1);
    let p=pc.roster();p[0].hpCurrent=3;pc.save(p);await pc.api.sync();let f=phone.roster();f[0].hpCurrent=4;phone.save(f);await phone.api.sync();phone.api.resolve(f[0].id,'local');await phone.api.sync();await pc.api.sync();assert.equal(pc.roster()[0].hpCurrent,4);
  });
  await test('lost reply retries exact operation once, and new edits remain pending',async()=>{
    const server=new Server(),pc=device(server,{[KEY]:JSON.stringify([hero])});await pc.api.login('a@example.com','password123');pc.api.importLocal();server.loseReply=true;await pc.api.sync();assert.equal([...server.rows.values()][0].revision,1);
    const restarted=pc.restart();let a=restarted.roster();a[0].hpCurrent=8;restarted.save(a);await restarted.api.sync();assert.equal([...server.rows.values()][0].revision,1);assert.equal(restarted.api.snapshot().pending,1);await restarted.api.sync();assert.equal([...server.rows.values()][0].revision,2);assert.equal([...server.rows.values()][0].profile.hpCurrent,8);
  });
  await test('edits during HTTP request are not acknowledged or dropped',async()=>{
    const server=new Server(),pc=device(server,{[KEY]:JSON.stringify([hero])});await pc.api.login('a@example.com','password123');pc.api.importLocal();let release;server.hold=new Promise(r=>release=r);
    const request=pc.api.sync();await new Promise(r=>setImmediate(r));let a=pc.roster();a[0].hpCurrent=5;pc.save(a);release();await request;server.hold=null;assert.equal(pc.api.snapshot().pending,1);await pc.api.sync();assert.equal([...server.rows.values()][0].profile.hpCurrent,5);
  });
  await test('owner isolation, logout, second account, reauthentication and suspended queues',async()=>{
    const server=new Server(),pc=device(server,{[KEY]:JSON.stringify([hero])});await pc.api.login('a@example.com','password123');pc.api.importLocal();pc.g.navigator.onLine=false;await pc.api.logout();pc.g.navigator.onLine=true;await pc.api.login('b@example.com','password123');assert.equal(pc.roster().length,0);assert.equal(server.rows.size,0);await pc.api.logout();await pc.api.login('a@example.com','password123');assert.equal(server.rows.size,1);assert.equal([...server.rows.values()][0].owner_id,'a');
    const phone=device(server);await phone.api.login('b@example.com','password123');assert.equal(phone.roster().length,0);
    await assert.rejects(phone.api.login('b@example.com','bad'));assert.equal(phone.api.snapshot().email,'b@example.com');
  });
  await test('email confirmation, recovery code, password change, session refresh',async()=>{
    const server=new Server(),pc=device(server);await pc.api.signup('a@example.com','password123');assert.equal(pc.api.snapshot().email,'');assert.match(pc.api.snapshot().message,/почту/);await pc.api.verify('a@example.com','123456','signup');assert.equal(pc.api.snapshot().email,'a@example.com');await pc.api.recover('a@example.com');await pc.api.verify('a@example.com','123456','recovery');await pc.api.password('newpassword');
    const s=JSON.parse(pc.map.get('dnd_cloud_session_v1'));s.expires_at=0;pc.map.set('dnd_cloud_session_v1',JSON.stringify(s));const next=pc.restart();await next.api.sync();assert(server.calls.some(c=>c.body&&c.body.refresh_token));
  });
  await test('invalid configuration, corrupt journal, wrapped legacy data and reset are safe',async()=>{
    const server=new Server(),raw=JSON.stringify({version:7,characters:[hero],other:'keep'}),pc=device(server,{[KEY]:raw});assert.throws(()=>pc.api.configure({...cfg,publishableKey:'sb_secret_123'}));assert.throws(()=>pc.api.configure({...cfg,projectUrl:'http://example.supabase.co'}));
    await pc.api.login('a@example.com','password123');pc.api.importLocal();await pc.api.sync();await pc.api.logout();assert.equal(pc.map.get(KEY),raw);
    const broken=device(server,{[KEY]:raw,[JOURNAL]:'broken'});assert.equal(broken.map.get(KEY),raw);assert.equal(broken.api.snapshot().status,'Ошибка локальных данных');
    await pc.api.login('a@example.com','password123');pc.g.localStorage.clear();assert.equal(pc.api.snapshot().email,'');await pc.api.sync();assert.equal(server.rows.size,1);pc.save([hero]);assert.equal(pc.api.snapshot().status,'Гость');
  });
  await test('quota failure leaves roster and queue unchanged',async()=>{
    const server=new Server(),pc=device(server,{[KEY]:JSON.stringify([hero])});await pc.api.login('a@example.com','password123');pc.api.importLocal();await pc.api.sync();const old=pc.map.get(KEY),journal=pc.map.get(JOURNAL),realSet=pc.map.set.bind(pc.map);pc.map.set=(k,v)=>{if(k===KEY)throw Error('quota');return realSet(k,v);};
    let a=pc.roster();a[0].hpCurrent=99;assert.throws(()=>pc.save(a),/quota/);assert.equal(pc.map.get(KEY),old);assert.equal(pc.map.get(JOURNAL),journal);await pc.api.sync();assert.equal([...server.rows.values()][0].profile.hpCurrent,10);
  });
  await test('remote change cannot silently replace an open sheet',async()=>{
    const server=new Server(),pc=device(server,{[KEY]:JSON.stringify([hero])});await pc.api.login('a@example.com','password123');pc.api.importLocal();await pc.api.sync();const phone=device(server);await phone.api.login('a@example.com','password123');
    pc.g.currentCharacterId=pc.roster()[0].id;pc.g.currentChar=pc.roster()[0];pc.g.currentChar.unsaved='keep';let a=phone.roster();a[0].hpCurrent=1;phone.save(a);await phone.api.sync();await pc.api.sync();assert.equal(pc.g.currentChar.unsaved,'keep');assert.equal(pc.api.snapshot().conflicts.length,1);assert.equal(pc.roster()[0].hpCurrent,10);
  });
  await test('old 3D editor cannot save after account switch; retained local conflict is recoverable',async()=>{
    const server=new Server(),pc=device(server,{[KEY]:JSON.stringify([hero])});await pc.api.login('a@example.com','password123');pc.api.importLocal();await pc.api.sync();
    pc.g.currentCharacterId=pc.roster()[0].id;const editor=pc.g.DNDCharacterAppearanceStore.open();await pc.api.logout();assert.throws(()=>pc.g.DNDCharacterAppearanceStore.save(editor,{}),/Аккаунт изменился/);
    await pc.api.login('a@example.com','password123');const phone=device(server);await phone.api.login('a@example.com','password123');let a=phone.roster();a[0].hpCurrent=1;phone.save(a);await phone.api.sync();a=pc.roster();a[0].hpCurrent=6;pc.save(a);await pc.api.sync();pc.api.resolve(a[0].id,'remote');assert.equal(pc.api.localBackups().length,1);pc.api.restoreLocalCopy(0);await pc.api.sync();assert(pc.roster().some(c=>c.hpCurrent===6));
  });
  await test('legacy special property IDs remain ordinary records',async()=>{
    const server=new Server(),pc=device(server);await pc.api.login('a@example.com','password123');pc.save([{...hero,id:'__proto__'},{...hero,id:'constructor'}]);await pc.api.sync();assert.equal(server.rows.size,2);const next=pc.restart();assert.equal(next.roster().length,2);await next.api.sync();assert.equal(server.rows.size,2);
  });
  await test('interrupted journal/roster commit recovers latest durable snapshot',async()=>{
    const server=new Server(),pc=device(server,{[KEY]:JSON.stringify([hero])});await pc.api.login('a@example.com','password123');pc.api.importLocal();await pc.api.sync();let a=pc.roster();a[0].hpCurrent=9;pc.save(a);
    pc.map.set(KEY,'[]');const recovered=pc.restart();assert.equal(recovered.roster()[0].hpCurrent,9);await recovered.api.sync();assert.equal([...server.rows.values()][0].profile.hpCurrent,9);await recovered.api.logout();assert.equal(recovered.roster()[0].id,hero.id);
  });
  await test('offline deletion can be recovered as a separate copy before first upload',async()=>{
    const server=new Server(),pc=device(server,{[KEY]:JSON.stringify([hero])});await pc.api.login('a@example.com','password123');pc.g.navigator.onLine=false;pc.api.importLocal();const id=pc.roster()[0].id;pc.save([]);pc.api.copyDeleted(id);assert.equal(pc.roster().length,1);assert.notEqual(pc.roster()[0].id,id);assert.deepEqual(pc.roster()[0].appearance3d,hero.appearance3d);pc.g.navigator.onLine=true;await pc.api.sync();assert.equal(server.rows.size,2);assert.equal([...server.rows.values()].filter(r=>r.deleted).length,1);
    pc.g.dndNetwork={state:{mode:'host'}};await assert.rejects(pc.api.logout(),/Завершите сетевую игру/);assert.equal(pc.api.snapshot().email,'a@example.com');pc.g.dndNetwork.state.mode='single';await pc.api.logout();
  });
  await test('real GoTrue error_code takes priority over numeric HTTP code',async()=>{
    const server=new Server(),raw=JSON.stringify([hero]),pc=device(server,{[KEY]:raw});
    pc.g.fetch=async()=>({ok:false,status:400,text:async()=>JSON.stringify({code:400,error_code:'email_not_confirmed',msg:'Email not confirmed'})});
    await assert.rejects(pc.api.login('a@example.com','password123'),/Почта ещё не подтверждена/);
    assert.equal(pc.api.snapshot().email,'');assert.equal(pc.api.snapshot().status,'Гость');assert.equal(pc.map.get(KEY),raw);assert(!pc.map.has('dnd_cloud_session_v1'));
    pc.g.fetch=async()=>({ok:false,status:400,text:async()=>JSON.stringify({code:400,error_code:'invalid_credentials',msg:'Invalid login credentials'})});
    await assert.rejects(pc.api.login('a@example.com','password123'),/Неверная почта или пароль/);
  });
  console.log('CLOUD_SYNC_TEST_OK: '+passed+' scenarios');
}
module.exports={Server,hero};
if(require.main===module)main().catch(e=>{console.error(e);process.exitCode=1;});
