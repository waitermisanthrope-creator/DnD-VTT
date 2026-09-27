const assert=require('assert');const fs=require('fs');const vm=require('vm');
function ctx(){const ls={};const c={console,localStorage:{getItem:k=>ls[k]||null,setItem:(k,v)=>ls[k]=String(v)},currentChar:{name:'Master',initiativeTracker:{combatants:[]}},dndNetworkGameplayEvent(){},dndNetworkGameplaySnapshot(){},btoa:s=>Buffer.from(s,'binary').toString('base64'),atob:s=>Buffer.from(s,'base64').toString('binary'),unescape,escape,Date,Math,setTimeout,clearTimeout,Promise};c.window=c;return vm.createContext(c)}
const src=fs.readFileSync(__dirname+'/network_engine.js','utf8');
let c=ctx();vm.runInContext(src,c,{filename:'network_engine.js'});let n=c.dndNetwork;n.state.role='host';n.state.roomId='r';n.state.authorityEpoch=1;n.state.authorityId='host';
for(let i=0;i<4;i++)n.commitHostEvent('TEST',{i},'host');
let info=n.eventLogInfo();assert.strictEqual(info.valid,true);assert(info.headHash);assert(info.count===4);
let snap=n.authoritySnapshot();assert.strictEqual(snap.schemaVersion,7);assert.strictEqual(snap.session.eventHeadHash,info.headHash);assert.strictEqual(snap.session.eventLogBaseHash,info.baseHash);
let tampered=JSON.parse(JSON.stringify(snap));tampered.session.eventLog[2].payload.i=999;assert.strictEqual(n.reconcileSnapshot({type:'STATE_SNAPSHOT',payload:tampered}),false,'tampered snapshot must be rejected');
let stale=JSON.parse(JSON.stringify(snap));stale.session.authorityEpoch=0;stale.session.stateFingerprint='bad';assert.strictEqual(n.reconcileSnapshot({type:'STATE_SNAPSHOT',payload:stale}),false,'stale snapshot must be rejected');
let c2=ctx();vm.runInContext(src,c2,{filename:'network_engine.js'});let n2=c2.dndNetwork;n2.state.role='player';n2.state.authorityEpoch=1;n2.state.authorityId='host';n2.state.eventSeq=4;n2.state.stateRevision=4;
let ev=JSON.parse(JSON.stringify(snap.session.eventLog[3]));assert.strictEqual(n2.reconcileSnapshot({type:'STATE_SNAPSHOT',payload:snap}),false,'equal divergent state must not silently replace local state');
console.log('V752 replay hash authority PASS');
