const fs=require('fs'),vm=require('vm'),assert=require('assert');
const root=__dirname;
const ctx={console,require,process,setTimeout,clearTimeout,Date,Math,JSON,localStorage:{_:{},getItem(k){return this._[k]||null},setItem(k,v){this._[k]=String(v)}},document:{getElementById(){return null},querySelector(){return null},querySelectorAll(){return[]}},navigator:{},RTCPeerConnection:function(){}};
ctx.window=ctx;ctx.globalThis=ctx;vm.createContext(ctx);
vm.runInContext(fs.readFileSync(root+'/network_engine.js','utf8'),ctx,{filename:'network_engine.js'});
const n=ctx.dndNetwork;
assert(n.prepareHostHandoff,'handoff prepare API missing');
assert(n.acceptHostHandoff,'handoff accept API missing');
assert(n.handoffStatus,'handoff status API missing');
// Host prepares a deterministic successor and must advance the future authority epoch.
n.state.role='host'; n.state.mode='lan'; n.state.roomId='room-x'; n.state.clientId='host-a'; n.state.authorityId='host-a'; n.state.authorityEpoch=7; n.state.stateRevision=42; n.state.eventSeq=42;
let sent=[];
n.getPeer=function(){};
// inject a peer through the test hook exposed by the engine
assert(n.__testInjectPeer,'test peer injection missing');
n.__testInjectPeer('peer-b',{clientId:'client-b',status:'online',name:'B',characterId:'c2',channel:{readyState:'open',send(raw){sent.push(JSON.parse(raw));return true;}}});
const prepared=n.prepareHostHandoff('client-b');
assert(prepared.ok,'handoff preparation failed');
assert(prepared.successorClientId==='client-b','wrong successor');
assert(prepared.authorityEpoch===8,'future epoch not fenced');
assert(sent.some(x=>x.type==='HOST_HANDOFF_PREPARE'),'successor was not prepared');
// A stale acceptance must be rejected.
n.state.role='player'; n.state.clientId='client-b'; n.state.authorityEpoch=8; n.state.authorityId='host-a';
assert.strictEqual(n.acceptHostHandoff({type:'HOST_HANDOFF_ACCEPT',payload:{roomId:'room-x',authorityEpoch:7,authorityId:'host-a',successorClientId:'client-b',snapshot:n.authoritySnapshot()}}),false,'stale handoff accepted');
console.log('PASS V70.25.45 host handoff/election guards');
