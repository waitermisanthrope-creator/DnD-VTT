/** Shared Supabase REST/Auth and durable character synchronization.
 * DNDCloudSync exposes account actions, sync, importLocal, history and resolve.
 * Storage interception observes legacy saves and appearance3d writes before app boot.
 * Journal scopes are keyed by project + owner; guest bytes are retained separately.
 * Entries keep cloud UUID, acknowledged revision, latest local snapshot, immutable
 * in-flight operation and conflict. Only CAS RPC writes; no last-write-wins.
 */
(function (g) {
  'use strict';
  var KEY = 'dnd_multi_characters_v2', JOURNAL = 'dnd_cloud_journal_v1';
  var SESSION = 'dnd_cloud_session_v1', CONFIG = 'dnd_cloud_config_v1';
  var storage = g.localStorage, proto = g.Storage ? g.Storage.prototype : storage;
  var nativeSet = proto.setItem, nativeRemove = proto.removeItem, nativeClear = proto.clear;
  var state, session, config, running = false, timer, attempts = 0, blocked = false, epoch = 0;
  var status = 'Гость', message = '', listeners = [], refreshing;
  function read(k, fallback) { var raw = storage.getItem(k); return raw ? JSON.parse(raw) : fallback; }
  function set(k, v) { nativeSet.call(storage, k, v); }
  function clone(v) { return JSON.parse(JSON.stringify(v)); }
  function uuid() { return g.crypto.randomUUID ? g.crypto.randomUUID() : '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, function(c) { return (Number(c) ^ g.crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> Number(c)/4).toString(16); }); }
  // A copied profile has a new identity; keep its own combat/effect links intact.
  function copyProfile(original, identity) {
    var c=clone(original),old=String(c.id),next=identity||uuid();
    if(old===next)return c;
    var refs=new Set(['characterId','combatantId','sourceId','ownerId','source','untilOwnerStart','untilOwnerEnd','sceneOwnerId','roundOwnerId','charmSourceId','bondPartnerId','bondOwnerId','fearSourceId','nearAllyId','attackerId','targetId','casterId','actorId']);
    var selfActor=(c.initiativeTracker&&c.initiativeTracker.combatants||[]).some(function(a){return String(a.id)===old;});
    function walk(v){
      if(!v||typeof v!=='object')return;
      Object.keys(v).forEach(function(k){
        var x=v[k];
        if(refs.has(k)&&x===old)v[k]=next;
        else if(typeof x==='string'&&selfActor&&['id','ownTurnId','tarotLastStartedTurn'].includes(k)&&x.indexOf('initiative:'+old+':')===0)v[k]='initiative:'+next+':'+x.slice(('initiative:'+old+':').length);
        else if(Array.isArray(x)&&selfActor&&['turnIds','swappedTurns','slipTurns'].includes(k))v[k]=x.map(function(t){return typeof t==='string'&&t.indexOf('initiative:'+old+':')===0?'initiative:'+next+':'+t.slice(('initiative:'+old+':').length):t;});
        else walk(x);
      });
    }
    walk(c);
    (c.initiativeTracker&&c.initiativeTracker.combatants||[]).forEach(function(a){if(String(a.id)===old)a.id=next;});
    var tokens=c.initiativeTracker&&c.initiativeTracker.battlefield&&c.initiativeTracker.battlefield.tokens;
    if(tokens)Object.keys(tokens).forEach(function(k){var t=tokens[k];if(t.id===old)t.id=next;else if(t.id==='bt_'+old)t.id='bt_'+next;if(k===old||k==='bt_'+old){tokens[k===old?next:'bt_'+next]=t;delete tokens[k];}});
    if(c.tarotKnowledge&&Object.prototype.hasOwnProperty.call(c.tarotKnowledge,old)){c.tarotKnowledge[next]=c.tarotKnowledge[old];delete c.tarotKnowledge[old];}
    var totals=c.initiativeTracker&&c.initiativeTracker.tarotDamageTotals;if(selfActor&&totals&&Object.prototype.hasOwnProperty.call(totals,old)){totals[next]=totals[old];delete totals[old];}
    c.id=next;return c;
  }
  function list(raw) {
    var v = raw ? JSON.parse(raw) : [], a = Array.isArray(v) ? v : v && v.characters;
    if (!Array.isArray(a) || a.some(function(c) { return !c || typeof c !== 'object' || c.id == null; })) throw Error('Повреждён список персонажей. Восстановите резервную копию.');
    if (new Set(a.map(function(c) { return String(c.id); })).size !== a.length) throw Error('Повторяющиеся ID персонажей. Сначала создайте отдельные копии.');
    return a;
  }
  function serialize(raw, a) { var v = raw ? JSON.parse(raw) : []; if (Array.isArray(v)) return JSON.stringify(a); v.characters = a; return JSON.stringify(v); }
  function persist() { set(JOURNAL, JSON.stringify(state)); }
  function scope() { return state.active && state.scopes[state.active]; }
  function notify() { listeners.forEach(function(f) { try { f(snapshot()); } catch (_) {} }); }
  function snapshot() { var s = scope(); return { status: status, message: message, email: session && session.user.email || '', configured: !!(config.projectUrl && config.publishableKey), pending: s ? Object.values(s.entries).filter(function(e) { return e.dirty || e.pending; }).length : 0, conflicts: s ? Object.values(s.entries).filter(function(e) { return e.conflict; }).map(clone) : [] }; }
  function fail(e) { message = e.message || 'Ошибка сети'; status = e.status === 401 ? 'Требуется вход' : 'Офлайн'; blocked = !!(e.status && e.status < 500 && e.status !== 429); notify(); }
  try {
    config = read(CONFIG, g.DNDCloudConfig || {});
    session = read(SESSION, null);
    state = read(JOURNAL, { version: 1, active: null, guest: storage.getItem(KEY), scopes: {} });
    if (!state.scopes || state.version !== 1) throw Error('Несовместимый журнал синхронизации');
    state.scopes=Object.assign(Object.create(null),state.scopes);
    Object.values(state.scopes).forEach(function(s){s.entries=Object.assign(Object.create(null),s.entries);});
    // Recover a commit interrupted between journal and legacy roster writes.
    if (state.active) {
      var cached = scope();
      if (!cached) throw Error('Не найден локальный профиль аккаунта');
      set(KEY, cached.raw || '[]');
      if (!session || state.active !== config.projectUrl + '/' + session.user.id) {
        state.active = null; set(KEY, state.guest || '[]'); persist();
      }
    }
  } catch (e) {
    // Never replace unreadable journal/roster with an empty one.
    g.DNDCloudSync = { snapshot: function() { return {status:'Ошибка локальных данных',message:e.message}; } };
    return;
  }
  function observe(raw) {
    var a = list(raw), s = scope();
    if (!s) { state.guest = raw; return; }
    var seen = new Set();
    a.forEach(function(c) {
      var id = String(c.id), e = s.entries[id], json = JSON.stringify(c); seen.add(id);
      if (!e) e = s.entries[id] = { localId: id, cloudId: uuid(), revision: 0, json: json, deleted: false, dirty: true };
      else if (e.json !== json || e.deleted) { e.json = json; e.deleted = false; e.dirty = true; }
    });
    Object.values(s.entries).forEach(function(e) { if (!seen.has(e.localId) && !e.deleted) { e.deleted = true; e.dirty = true; } });
    s.raw = raw;
  }
  proto.setItem = function(k, v) {
    if (this !== storage || String(k) !== KEY) return nativeSet.call(this, k, v);
    var before = JSON.stringify(state);
    try { observe(String(v)); persist(); nativeSet.call(this, k, v); }
    catch (e) { state = JSON.parse(before);Object.values(state.scopes).forEach(function(s){s.entries=Object.assign(Object.create(null),s.entries);});try { persist(); } catch (_) {} fail(e); throw e; }
    schedule(1000); notify();
  };
  proto.removeItem = function(k) { if (this === storage && String(k) === KEY) return this.setItem(KEY, '[]'); return nativeRemove.call(this, k); };
  proto.clear = function() {
    if(this!==storage)return nativeClear.call(this);
    // App reset/backup import clears local state, never deletes cloud heroes.
    ++epoch;session=null;blocked=true;g.clearTimeout(timer);
    nativeClear.call(this);state={version:1,active:null,guest:null,scopes:{}};
    status='Гость';message='';notify();
  };
  function refreshView(reset) {
    var id = g.currentCharacterId, chars = list(storage.getItem(KEY));
    g.allCharacters = chars;
    var current = !reset && chars.find(function(c) { return String(c.id) === String(id); });
    if (current) {
      // Defer replacing an open sheet until the user explicitly reopens it.
      // Pull marks this as a conflict instead, so this path only updates inactive heroes.
      var live=g.currentChar||g.currentCharacter;
      if(live&&String(live.id)===String(id))g.allCharacters[chars.indexOf(current)]=live;
      else {g.currentChar=current;g.currentCharacter=current;}
    } else { g.currentChar = null; g.currentCharacter = null; g.currentCharacterId = null; nativeRemove.call(storage, 'dnd_current_character_id'); }
    if (g.renderCharacterList) g.renderCharacterList();
    if (reset && g.document) {
      ['characterSheetScreen','characterCreationScreen'].forEach(function(k) { var el=g.document.getElementById(k); if(el)el.style.display='none'; });
      var select=g.document.getElementById('characterSelectScreen');if(select)select.style.display='block';
    }
  }
  function activate() {
    var next = config.projectUrl + '/' + session.user.id;
    if (state.active === next) return;
    if (!state.active) state.guest = storage.getItem(KEY);
    state.active = next;
    if (!scope()) state.scopes[next] = { raw: '[]', entries: Object.create(null) };
    persist(); set(KEY, scope().raw); refreshView(true);
  }
  function validateConfig(c) {
    var url = new URL(c.projectUrl);
    if (url.protocol !== 'https:' || !/^[a-z0-9-]+\.supabase\.co$/.test(url.hostname) || url.username || url.password || url.port || (url.pathname !== '/' && url.pathname !== '') || url.search || url.hash) throw Error('Введите Project URL вида https://<project>.supabase.co');
    var key = String(c.publishableKey || '');
    if (!/^sb_publishable_[A-Za-z0-9_-]+$/.test(key)) {
      var payload; try { payload = JSON.parse(g.atob(key.split('.')[1].replace(/-/g,'+').replace(/_/g,'/'))); } catch (_) {}
      if (!payload || payload.role !== 'anon') throw Error('Допустим только публичный publishable key или legacy anon key.');
    }
    return {projectUrl:url.origin,publishableKey:key};
  }
  async function request(path, body, token, method) {
    var c = validateConfig(config), controller = new AbortController(), timeout = g.setTimeout(function() { controller.abort(); }, 15000);
    try {
      var headers = {apikey:c.publishableKey,'Content-Type':'application/json'};
      if (token) headers.Authorization = 'Bearer ' + token;
      var r = await g.fetch(c.projectUrl + path, { method:method || (body ? 'POST' : 'GET'),headers:headers,body:body ? JSON.stringify(body) : undefined,signal:controller.signal });
      var text = await r.text(), data = text ? JSON.parse(text) : null;
      if (!r.ok) {
        // GoTrue sends a numeric HTTP `code` alongside the semantic `error_code`.
        var code=data&&(data.error_code||data.code);
        var err = Error(code==='email_not_confirmed'?'Почта ещё не подтверждена. Подтвердите адрес по письму и повторите вход. До этого вы остаётесь гостем.':code==='invalid_credentials'?'Неверная почта или пароль.':r.status === 401 ? 'Сессия истекла. Войдите снова.' : r.status === 429 ? 'Слишком много запросов. Повторите позже.' : (r.status === 400||r.status===422) && path.indexOf('/auth/') === 0 ? 'Проверьте почту, пароль или код подтверждения.' : 'Облачный запрос не выполнен (' + r.status + '). Проверьте подключение и настройки проекта.');
        err.status = r.status; throw err;
      }
      return data;
    } catch(e) {if(e.status)throw e;throw Error('Нет связи с облаком. Проверьте интернет; локальные изменения сохранены.');}
    finally { g.clearTimeout(timeout); }
  }
  function storeSession(s) {
    if (!s || !s.user || !s.access_token || !s.refresh_token) throw Error('Сессия не получена. Подтвердите почту.');
    session = {user:{id:s.user.id,email:s.user.email},access_token:s.access_token,refresh_token:s.refresh_token,expires_at:s.expires_at || Math.floor(Date.now()/1000)+(s.expires_in || 3600)};
    set(SESSION,JSON.stringify(session));
  }
  async function token() {
    if (!session) throw Error('Войдите в аккаунт');
    if (session.expires_at > Date.now()/1000 + 60) return session.access_token;
    if (!refreshing) {
      var old = session, generation = epoch;
      refreshing = request('/auth/v1/token?grant_type=refresh_token',{refresh_token:old.refresh_token}).then(function(s) {
        if (generation !== epoch || session !== old) throw Error('Аккаунт изменился');
        storeSession(s); return session.access_token;
      }).finally(function() { refreshing = null; });
    }
    return refreshing;
  }
  function beforeAccountSwitch(){
    if(g.dndNetwork&&g.dndNetwork.state&&g.dndNetwork.state.mode!=='single')throw Error('Завершите сетевую игру перед сменой аккаунта или переходом в гостевой режим.');
    if(g.currentCharacterId&&g.currentChar&&g.autoSaveCurrentCharacter){
      g.autoSaveCurrentCharacter();
      var saved=list(storage.getItem(KEY)).find(function(c){return String(c.id)===String(g.currentCharacterId);});
      if(!saved||JSON.stringify(saved)!==JSON.stringify(g.currentChar))throw Error('Сначала сохраните открытого персонажа. Не удалось подтвердить локальную запись.');
    }
  }
  async function login(email,password) {
    beforeAccountSwitch();
    var generation=++epoch;
    var s=await request('/auth/v1/token?grant_type=password',{email:email,password:password});
    if(generation!==epoch)return;
    storeSession(s); activate(); blocked=false; attempts=0; message=''; await sync();
  }
  async function signup(email,password) {
    beforeAccountSwitch();
    var generation=++epoch;
    var s=await request('/auth/v1/signup',{email:email,password:password});
    if(generation!==epoch)return;
    if(s.access_token) { storeSession(s);activate();blocked=false;await sync(); }
    else { message='Для входа подтвердите почту по ссылке или коду из письма, затем нажмите «Войти». Пока почта не подтверждена, вы остаётесь гостем.';notify(); }
  }
  async function verify(email,code,type) {
    beforeAccountSwitch();
    var generation=++epoch;
    var s=await request('/auth/v1/verify',{email:email,token:code,type:type});
    if(generation!==epoch)return;
    storeSession(s);activate();blocked=false;message=type==='recovery'?'Теперь задайте новый пароль.':'Почта подтверждена';await sync();
  }
  async function recover(email) { await request('/auth/v1/recover',{email:email});message='Если адрес зарегистрирован, придёт письмо. Введите код восстановления.';notify(); }
  async function password(value) { await request('/auth/v1/user',{password:value},await token(),'PUT');message='Пароль изменён';notify(); }
  async function logout() {
    beforeAccountSwitch();
    var old = session; ++epoch; blocked=true;g.clearTimeout(timer);
    // Local sign-out always succeeds offline; cloud cache/queue remain owner scoped.
    session=null;nativeRemove.call(storage,SESSION);state.active=null;persist();set(KEY,state.guest || '[]');refreshView(true);status='Гость';message='';notify();
    if(old && g.navigator.onLine !== false) try {await request('/auth/v1/logout?scope=local',{},old.access_token);} catch (_) {}
  }
  function schedule(delay) { g.clearTimeout(timer); if(session && !blocked)timer=g.setTimeout(function() { sync().catch(fail); },delay); }
  function writeScope(s) {
    var a=list(s.raw);
    Object.values(s.entries).forEach(function(e) {
      var i=a.findIndex(function(c) {return String(c.id)===e.localId;});
      if(e.deleted) {if(i>=0)a.splice(i,1);} else {var c=JSON.parse(e.json);c.id=e.localId;if(i>=0)a[i]=c;else a.push(c);}
    });
    s.raw=serialize(s.raw,a);persist();if(s===scope())set(KEY,s.raw);
  }
  function updateRemote(e,r) { e.revision=r.revision;e.json=JSON.stringify(copyProfile(r.profile,e.localId));e.deleted=r.deleted;e.dirty=false;delete e.conflict; }
  async function sync() {
    if(running || !session || !scope())return;
    if(g.navigator.onLine===false){status='Офлайн';notify();return;}
    running=true;status='Синхронизация…';notify();
    var generation=epoch,s=scope();
    function valid() {return generation===epoch && s===scope();}
    try {
      var bearer=await token();if(!valid())return;
      var entries=Object.values(s.entries);
      for(var e of entries) {
        if(e.conflict || (!e.dirty && !e.pending))continue;
        if(!e.pending) {e.pending={p_id:e.cloudId,p_expected_revision:e.revision,p_profile:JSON.parse(e.json),p_schema_version:JSON.parse(e.json).schemaVersion || 3,p_deleted:e.deleted,p_operation_id:uuid()};persist();}
        var op=clone(e.pending),result=await request('/rest/v1/rpc/save_character',op,bearer);
        if(!valid())return;
        if(result.conflict) {e.conflict={remote:result.character,local:JSON.parse(e.json),deleted:e.deleted};delete e.pending;persist();continue;}
        e.revision=result.character.revision;
        e.dirty=e.json!==JSON.stringify(op.p_profile) || e.deleted!==op.p_deleted;
        delete e.pending;persist();
      }
      // Include tombstones; never infer deletion from a missing page.
      var rows=[],offset=0;
      while(true) {
        var page=await request('/rest/v1/characters?select=*&order=id&limit=500&offset='+offset,null,bearer);
        if(!valid())return;rows=rows.concat(page);if(page.length<500)break;offset+=page.length;
      }
      rows.forEach(function(r) {
        var e=Object.values(s.entries).find(function(x){return x.cloudId===r.id;});
        if(!e) {var localId=r.id;e=s.entries[localId]={localId:localId,cloudId:r.id};updateRemote(e,r);return;}
        if(r.revision<=e.revision || e.conflict)return;
        // Open sheets may have unsaved DOM/editor state. Preserve them for explicit choice.
        if(e.dirty || e.pending || String(g.currentCharacterId)===e.localId) {e.conflict={remote:r,local:JSON.parse(e.json),deleted:e.deleted};}
        else updateRemote(e,r);
      });
      writeScope(s);refreshView(false);attempts=0;message='';blocked=false;
      status=Object.values(s.entries).some(function(e){return e.conflict;})?'Конфликт версий':'Синхронизировано';notify();
      schedule(Object.values(s.entries).some(function(e){return e.dirty&&!e.conflict;})?1000:30000);
    } catch(e) { if(valid()) { fail(e);schedule(Math.min(60000,2000*Math.pow(2,Math.min(attempts++,5)))+Math.floor(Math.random()*1000)); } }
    finally { running=false;if(session && generation!==epoch)schedule(0); }
  }
  function importLocal() {
    var s=scope();if(!s)throw Error('Сначала войдите в аккаунт');
    var a=list(s.raw);
    list(state.guest).forEach(function(c) {var copy=copyProfile(c);a.push(copy);});
    // Originals remain in the guest roster, including their legacy IDs.
    storage.setItem(KEY,serialize(s.raw,a));refreshView(false);
    message='Созданы облачные копии локальных героев. Гостевые оригиналы сохранены.';notify();
  }
  function resolve(id,choice) {
    if(String(g.currentCharacterId)===String(id)&&g.autoSaveCurrentCharacter)g.autoSaveCurrentCharacter();
    var s=scope(),e=s&&s.entries[id];if(!e||!e.conflict)throw Error('Конфликт не найден');
    var conflict=e.conflict,local=JSON.parse(e.json),deleted=e.deleted,r=conflict.remote;
    if(choice==='copy') {
      var copy=copyProfile(local);copy.name=(copy.name || 'Персонаж')+' (копия)';
      s.entries[copy.id]={localId:copy.id,cloudId:uuid(),revision:0,json:JSON.stringify(copy),deleted:false,dirty:true};
    }
    if(choice==='local') {e.revision=r?r.revision:0;e.dirty=true;delete e.pending;delete e.conflict;}
    else if(choice==='remote'||choice==='copy') {if(r)updateRemote(e,r);else {e.deleted=true;e.dirty=false;delete e.conflict;}}
    else throw Error('Выберите способ разрешения конфликта');
    // Keep both versions locally even after explicit overwrite; exportable backup.
    s.resolved=s.resolved||[];s.resolved.push({at:Date.now(),local:local,deleted:deleted,remote:r});
    writeScope(s);refreshView(String(g.currentCharacterId)===String(id));blocked=false;schedule(0);notify();
  }
  async function history(id) {
    var s=scope(),e=s&&s.entries[id],generation=epoch;
    if(!e)throw Error('Персонаж не найден');
    var rows=await request('/rest/v1/character_history?select=*&id=eq.'+e.cloudId+'&order=revision.desc',null,await token());
    if(generation!==epoch)throw Error('Аккаунт изменился');return rows;
  }
  async function restore(id,revision) {
    var generation=epoch,rows=await history(id),s=scope();if(generation!==epoch)return;
    var r=rows.find(function(r){return r.revision===Number(revision);});if(!r)throw Error('Версия не найдена');
    var e=s.entries[id];if(e.conflict)throw Error('Сначала разрешите конфликт');
    s.resolved=s.resolved||[];s.resolved.push({at:Date.now(),local:JSON.parse(e.json),deleted:e.deleted});
    e.json=JSON.stringify(copyProfile(r.profile,e.localId));e.deleted=r.deleted;e.dirty=true;
    writeScope(s);refreshView(String(g.currentCharacterId)===String(id));blocked=false;schedule(0);notify();
  }
  function configure(c) {if(session)throw Error('Выйдите из аккаунта перед сменой проекта');config=validateConfig(c);set(CONFIG,JSON.stringify(config));blocked=false;message='Подключение сохранено';notify();}
  function localBackups(){var s=scope();return s?(s.resolved||[]).map(function(b,i){return {index:i,at:b.at,name:b.local.name||'Персонаж'};}):[];}
  function copyDeleted(id){
    var s=scope(),e=s&&s.entries[id];if(!e||!e.deleted)throw Error('Удалённый персонаж не найден');
    var c=copyProfile(JSON.parse(e.json));c.name=(c.name||'Персонаж')+' (восстановленная копия)';
    s.entries[c.id]={localId:c.id,cloudId:uuid(),revision:0,json:JSON.stringify(c),deleted:false,dirty:true};
    writeScope(s);refreshView(false);blocked=false;schedule(0);notify();
  }
  function restoreLocalCopy(index){
    var s=scope(),backup=s&&s.resolved&&s.resolved[index];if(!backup)throw Error('Локальная резервная версия не найдена');
    var c=copyProfile(backup.local);c.name=(c.name||'Персонаж')+' (восстановленная копия)';
    s.entries[c.id]={localId:c.id,cloudId:uuid(),revision:0,json:JSON.stringify(c),deleted:false,dirty:true};
    writeScope(s);refreshView(false);blocked=false;schedule(0);notify();
  }
  g.DNDCloudSync={
    snapshot:snapshot,
    scopeId:function(){return state.active;},
    onChange:function(f){
      listeners.push(f);
      return function(){listeners=listeners.filter(function(x){return x!==f;});};
    },
    login:login, signup:signup, verify:verify, recover:recover,
    password:password, logout:logout,
    sync:function(){blocked=false;return sync();},
    configure:configure, importLocal:importLocal,
    resolve:resolve, history:history, restore:restore,
    localBackups:localBackups, restoreLocalCopy:restoreLocalCopy, copyDeleted:copyDeleted,
    characters:function(){
      var s=scope();
      return s?Object.values(s.entries).map(function(e){
        return {id:e.localId,name:JSON.parse(e.json).name || 'Без имени',deleted:e.deleted};
      }):[];
    }
  };
  g.addEventListener('online',function(){blocked=false;schedule(0);});
  g.addEventListener('offline',function(){status=session?'Офлайн':'Гость';notify();});
  g.addEventListener('focus',function(){schedule(0);});
  if(session){try{activate();}catch(e){fail(e);return;}status=g.navigator.onLine===false?'Офлайн':'Подключение…';schedule(0);}
})(window);
