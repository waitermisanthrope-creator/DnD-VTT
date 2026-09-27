const fs=require('fs'),vm=require('vm'),assert=require('assert');
const root=__dirname;
function ctx(){const c={console,document:{getElementById(){return null},addEventListener(){},body:{appendChild(){}}},window:null,globalThis:null,localStorage:{_:{},getItem(k){return this._[k]||null},setItem(k,v){this._[k]=String(v)},removeItem(){}},setTimeout,clearTimeout,Date,Math,JSON,Blob:function(){},URL:{createObjectURL(){return''},revokeObjectURL(){}},alert(){},navigator:{}};c.window=c;c.globalThis=c;c.addEventListener=function(){};vm.createContext(c);return c;}
const ne=fs.readFileSync(root+'/network_engine.js','utf8');
assert(ne.includes('function authorityCompare'),'authority compare API missing');
const c=ctx();
vm.runInContext(ne,c,{filename:'network_engine.js'});
const n=c.dndNetwork;
n.state.authorityEpoch=4;n.state.stateRevision=20;
assert.strictEqual(n.authorityCompare({authorityEpoch:4,stateRevision:19}),-1,'older remote authority comparison wrong');
assert.strictEqual(n.authorityCompare({authorityEpoch:4,stateRevision:21}),1,'newer remote authority not detected');
assert.strictEqual(n.authorityCompare({authorityEpoch:5,stateRevision:0}),1,'future epoch comparison wrong');
assert.strictEqual(n.authorityCompare({authorityEpoch:4,stateRevision:20}),0,'equal authority comparison wrong');
const cs=fs.readFileSync(root+'/vtt_mobile_session_v67.js','utf8');
assert(cs.includes("VERSION='67.3.0'"),'mobile session version not bumped');
assert(cs.includes('authoritySnapshot'),'save authority metadata missing');
assert(cs.includes('Локальное сохранение устарело'),'stale local save guard missing');
// Exercise stale-save rejection with a real localStorage-backed session.
const sctx=ctx();sctx.dndNetwork={state:{roomId:'room-a',authorityEpoch:3,stateRevision:50,eventSeq:50,authorityId:'host'}};sctx.currentChar={id:'c1',name:'Hero',hpCurrent:10,hpMax:10};
vm.runInContext(cs,sctx,{filename:'vtt_mobile_session_v67.js'});
const api=sctx.DNDMobileSessionV67;const payload=api.build();payload.authoritySnapshot={roomId:'room-a',authorityEpoch:3,stateRevision:49,eventSeq:49,authorityId:'host'};sctx.localStorage.setItem('dnd_vtt_mobile_session_v67',JSON.stringify({quick:{savedAt:new Date().toISOString(),payload:payload}}));
const stale=api.restore('quick');assert.strictEqual(stale.ok,false,'stale save was restored');assert.strictEqual(stale.stale,true,'stale save flag missing');
const ng=fs.readFileSync(root+'/network_gameplay.js','utf8');
assert(ng.includes("case'SHORT_REST':return applyNetworkRest(peerId,action,'short')"),'network short-rest action missing');
assert(ng.includes("case'LONG_REST':return applyNetworkRest(peerId,action,'long')"),'network long-rest action missing');
const dt=fs.readFileSync(root+'/dnd_tools.js','utf8');
assert(dt.includes("playerAction('SHORT_REST'"),'client short rest not routed to host');
assert(dt.includes("playerAction('LONG_REST'"),'client long rest not routed to host');
console.log('PASS V70.25.46 authoritative save/recharge guards');
