/** V70.25.50 — resignal/reconnect, snapshot fingerprint, reaction resource fencing, monster RPC. */
const assert=require('assert'),fs=require('fs'),vm=require('vm'),root=__dirname;
function makeCtx(extra={}){const c={console,Math,JSON,Date,setTimeout,clearTimeout,window:null,document:{getElementById:()=>null,createElement:()=>({style:{},appendChild(){},addEventListener(){}})},localStorage:{getItem:()=>null,setItem(){}},...extra};c.window=c;return vm.createContext(c);}
const ne=fs.readFileSync(root+'/network_engine.js','utf8');
assert(ne.includes('stateFingerprint'),'snapshot fingerprint missing');assert(ne.includes('createReconnectInvite'),'reconnect invite missing');assert(ne.includes("type!=='reconnect-offer'"),'reconnect-offer join fence missing');assert(ne.includes('resignalStatus'),'resignal status missing');assert(ne.includes('resignalSeq'),'resignal sequence missing');
const gp=fs.readFileSync(root+'/network_gameplay.js','utf8');
assert(gp.includes('reactionResourceRevision'),'reaction resource revision missing');assert(gp.includes('window reactions stale')||gp.includes('окно реакции устарело'),'reaction stale fence missing');assert(gp.includes('dndNetworkGameplayMonsterAction'),'monster RPC missing');assert(gp.includes('authoritative host'),'monster RPC authority guard missing');
const mctx=makeCtx({dndNetwork:{state:{role:'host',stateRevision:10},commitHostEvent:()=>({stateRevision:11}),getPeer:()=>null},currentChar:{initiativeTracker:{round:1,activeIndex:0,combatants:[]}}});
// Load the gameplay file only far enough to register the public API; all UI paths are stubbed.
vm.runInContext(fs.readFileSync(root+'/network_gameplay.js','utf8'),mctx,{filename:'network_gameplay.js'});
assert.strictEqual(typeof mctx.dndNetworkGameplayMonsterAction,'function');
const bad=mctx.dndNetworkGameplayMonsterAction('missing','target','Hit');assert.strictEqual(bad.ok,false);
console.log('V750_RESIGNAL_REACTION_MONSTER_RPC_OK');
