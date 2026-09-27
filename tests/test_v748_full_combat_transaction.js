const fs=require('fs'),vm=require('vm'),assert=require('assert');
const root=__dirname;
function ctx(extra){
  const c=Object.assign({
    console,require,process,setTimeout,clearTimeout,Date,Math,JSON,
    localStorage:{_: {},getItem(k){return this._[k]||null},setItem(k,v){this._[k]=String(v)},removeItem(){}},
    document:{getElementById(){return null},querySelector(){return null},querySelectorAll(){return[]},createElement(){return {style:{},appendChild(){},addEventListener(){}}},body:{appendChild(){}}},
    navigator:{},alert(){},addEventListener(){}
  },extra||{});
  c.window=c;c.globalThis=c;vm.createContext(c);return c;
}

const ng=fs.readFileSync(root+'/network_gameplay.js','utf8');
const ne=fs.readFileSync(root+'/network_engine.js','utf8');
const ce=fs.readFileSync(root+'/combat_engine.js','utf8');

assert(ng.includes('function migratePendingPeer'),'pending reaction reconnect migration missing');
assert(ng.includes("applyPendingReaction(id,'none')"),'disconnect/handoff deterministic reaction finalization missing');
assert(ng.includes('dndNetworkGameplayPrepareHostHandoff'),'handoff gameplay fence missing');
assert(ng.includes('dndNetworkGameplayRoomShutdown'),'room-shutdown gameplay cleanup missing');
assert(ng.includes('dndNetworkGameplayPendingReactions'),'pending reaction diagnostics missing');
assert(ne.includes('dndNetworkGameplayRoomShutdown'),'network closeAll does not notify gameplay cleanup');
assert(ne.includes('dndNetworkGameplayPrepareHostHandoff'),'network handoff does not fence gameplay transactions');

// Runtime combat transaction checks: damage at 0 HP, critical failure count, and healing revival.
const c=ctx();
vm.runInContext(ce,c,{filename:'combat_engine.js'});
const combat=c.DNDCombat;
let hero={type:'hero',hp:0,maxHp:20,tempHp:0,defeated:false,deathSaves:{successes:1,failures:1},concentration:{active:true,spellId:'s1',spellName:'Hold'} ,stats:{con:10}};
const dmg=combat.applyDamage(hero,5,'рубящий',{critical:true});
assert.strictEqual(hero.hp,0,'0 HP damage changed HP incorrectly');
assert.strictEqual(hero.deathSaves.failures,3,'critical damage at 0 HP must add two death-save failures');
assert.strictEqual(hero.defeated,true,'three death-save failures must defeat the hero');
assert.strictEqual(hero.concentration.active,false,'0 HP must break concentration atomically');
assert.strictEqual(dmg.deathSaveFailures,2,'damage result omitted critical death-save failures');
const heal=combat.heal(hero,7);
assert.strictEqual(heal.revivedFromZero,true,'healing from 0 HP did not report revival');
assert.strictEqual(hero.hp,7,'healing revival HP incorrect');
assert.strictEqual(hero.defeated,false,'revival did not clear defeated state');
assert.strictEqual(hero.deathSaves.successes,0,'revival did not clear death-save successes');
assert.strictEqual(hero.deathSaves.failures,0,'revival did not clear death-save failures');
assert.strictEqual(typeof combat.applyDamageBatch,'function','batch damage API missing');
assert.strictEqual(typeof combat.healBatch,'function','batch heal API missing');
let batchTarget={type:'hero',hp:10,maxHp:10,tempHp:0,defeated:false};
const batchFail=combat.applyDamageBatch([{target:batchTarget,amount:4,type:'огонь'},{target:null,amount:2,type:'холод'}]);
assert.strictEqual(batchFail.ok,false,'invalid batch entry must abort transaction');
assert.strictEqual(batchTarget.hp,10,'failed batch damage did not rollback earlier target mutation');
let healTarget={type:'hero',hp:0,maxHp:10,tempHp:0,defeated:true,deathSaves:{successes:2,failures:1}};
const healBatch=combat.healBatch([{target:healTarget,amount:5}]);
assert.strictEqual(healBatch.ok,true,'valid batch heal failed');
assert.strictEqual(healTarget.hp,5,'batch heal HP incorrect');
assert.strictEqual(healTarget.defeated,false,'batch heal did not revive target');

// Room shutdown must call the gameplay cleanup hook before transports are torn down.
let shutdownCalls=0;
const nctx=ctx({dndNetworkGameplayRoomShutdown(){shutdownCalls++;return {pendingReactions:1,preparedActions:1}}});
vm.runInContext(ne,nctx,{filename:'network_engine.js'});
const n=nctx.dndNetwork;
n.state.role='host';n.state.roomId='r';n.state.clientId='host';n.__testInjectPeer('p',{clientId:'c',status:'online',channel:{readyState:'open',send(){return true},close(){}}});
n.single();
assert.strictEqual(shutdownCalls,1,'room shutdown hook was not called');

// Handoff must fence gameplay before building the authoritative snapshot.
let handoffCalls=0;
const hctx=ctx({dndNetworkGameplayPrepareHostHandoff(){handoffCalls++;}});
vm.runInContext(ne,hctx,{filename:'network_engine.js'});
const h=hctx.dndNetwork;
h.state.role='host';h.state.mode='lan';h.state.roomId='room-x';h.state.clientId='host';h.state.authorityId='host';h.state.authorityEpoch=3;h.state.stateRevision=10;
h.__testInjectPeer('p',{clientId:'succ',status:'online',channel:{readyState:'open',send(){return true},close(){}}});
const prepared=h.prepareHostHandoff('succ');
assert(prepared.ok,'handoff setup failed');
assert.strictEqual(handoffCalls,1,'handoff gameplay fence was not called');

console.log('PASS V70.25.48 full combat transaction / reaction race guards');
