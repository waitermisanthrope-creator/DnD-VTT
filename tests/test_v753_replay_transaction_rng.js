const fs=require('fs'),vm=require('vm'),assert=require('assert');
const src=fs.readFileSync('network_engine.js','utf8');
const ctx={console,Date,JSON,Math,localStorage:{getItem(){return null},setItem(){}},navigator:{},location:{},btoa:s=>Buffer.from(s,'binary').toString('base64'),atob:s=>Buffer.from(s,'base64').toString('binary'),encodeURIComponent,decodeURIComponent,unescape,escape,setTimeout,clearTimeout,Promise};ctx.window=ctx;
vm.runInNewContext(src,ctx);const n=ctx.dndNetwork;
assert(n.replayBuild,'replayBuild API missing'); assert(n.transaction,'transaction API missing'); assert(n.authoritativeRandom,'authoritativeRandom API missing');
let a=n.authoritativeRandom('x',20), b=n.authoritativeRandom('x',20); assert.strictEqual(a,b,'same authority RNG input must be deterministic');
let tx=n.transaction('test',()=>({ok:true,value:42})); assert.strictEqual(tx.ok,true); assert.strictEqual(tx.value,42);
let r=n.replayBuild([{seq:1,type:'COMBAT_CHANGED',payload:{combatants:[{id:'a'}]}},{seq:2,type:'CAMPAIGN_CHANGED',payload:{x:1}}]); assert.deepStrictEqual(r.combat,{combatants:[{id:'a'}]}); assert.deepStrictEqual(r.campaign,{x:1});
console.log('V753 replay transaction rng PASS');
