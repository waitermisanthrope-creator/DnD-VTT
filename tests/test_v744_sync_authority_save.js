#!/usr/bin/env node
const fs=require('fs'),vm=require('vm'),assert=require('assert');
const root=__dirname;
function ctx(){const c={console,document:{getElementById(){return null},addEventListener(){},body:{appendChild(){}}},window:null,globalThis:null,localStorage:{getItem(){return null},setItem(){},removeItem(){}},setTimeout,clearTimeout,Date,Math,JSON,Blob:function(){},URL:{createObjectURL(){return''},revokeObjectURL(){}},alert(){},confirm(){return false},prompt(){return null},navigator:{}};c.window=c;c.globalThis=c;c.addEventListener=function(){};vm.createContext(c);return c;}
const ne=fs.readFileSync(root+'/network_engine.js','utf8');
assert(ne.includes('stateRevision'),'snapshot revision missing');
assert(ne.includes('authorityEpoch'),'authority epoch missing');
assert(ne.includes('incomingRevision<Number(state.stateRevision||0)'),'stale snapshot rejection missing');
assert(ne.includes('authoritySnapshot:snapshot'),'authority snapshot API missing');
assert(ne.includes('reconcileSnapshot:applySnapshot'),'snapshot reconciliation API missing');
{
 const c=ctx();
 c.currentChar={name:'Hero',initiativeTracker:{combatants:[]}};
 vm.runInContext(ne,c,{filename:'network_engine.js'});
 const n=c.dndNetwork;
 n.state.role='player';n.state.authorityEpoch=2;n.state.stateRevision=20;n.state.eventSeq=20;
 const stale={type:'STATE_SNAPSHOT',payload:{session:{roomId:'x',authorityEpoch:2,stateRevision:19,eventSeq:19,combat:{combatants:[{id:'old'}]},eventLog:[]}}};
 assert.strictEqual(n.reconcileSnapshot(stale),false,'stale snapshot was accepted');
 assert.strictEqual(c.currentChar.initiativeTracker.combatants.length,0,'stale snapshot mutated combat');
 const fresh={type:'STATE_SNAPSHOT',payload:{session:{roomId:'x',authorityEpoch:2,stateRevision:21,eventSeq:21,combat:{combatants:[{id:'new'}]},eventLog:[]}}};
 assert.strictEqual(n.reconcileSnapshot(fresh),true,'fresh snapshot rejected');
 assert.strictEqual(c.currentChar.initiativeTracker.combatants[0].id,'new','fresh snapshot not applied');
}
const cs=fs.readFileSync(root+'/vtt_mobile_session_v67.js','utf8');
assert(cs.includes("VERSION='67.3.0'"),'mobile session version not bumped');
assert(cs.includes('lastRestoredKey'),'restore idempotency state missing');
assert(cs.includes('idempotent:true'),'idempotent restore branch missing');
const ce=fs.readFileSync(root+'/combat_engine.js','utf8');
assert(ce.includes("commitHostEvent('COMBAT_CHANGED'"),'rest commit not broadcast');
console.log('PASS V70.25.44 sync/authority/save guards');
