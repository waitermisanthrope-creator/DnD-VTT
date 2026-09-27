/* V70.13 multiplayer authority/handshake regression */
const fs=require('fs'), vm=require('vm'), assert=require('assert');
function read(n){return fs.readFileSync(__dirname+'/'+n,'utf8');}
const engine=read('network_engine.js');
const gameplay=read('network_gameplay.js');
assert(engine.includes('function wireHostChannel(ch)'),'player WebRTC channel handler must exist');
assert(engine.includes("type:'HELLO'"),'player must send HELLO');
assert(engine.includes("type:'HELLO_ACCEPT'"),'host must accept authenticated handshake');
assert(engine.includes("type:'HELLO_REJECT'"),'host must reject invalid handshake');
assert(engine.includes('Этот clientId уже связан с другим персонажем.'),'reconnect character binding must be enforced');
assert(!engine.includes('if(data.clientId)p.clientId=data.clientId;'),'answer payload must not overwrite host identity binding');
assert(!gameplay.includes("||action.payload.spell||{}"),'client spell object must not be authoritative');
assert(gameplay.includes('dndNetworkGameplayBuildProfile'),'player profile must be built server-side from current character');
assert(gameplay.includes('Preserve current authoritative combat HP/AC/resources on reconnect.'),'reconnect must preserve host combat state');
assert(!gameplay.includes("p.profile=clone(msg.profile)||p.profile||{};"),'reconnect must not replace authoritative profile with client payload');
// Verify exported local profile builder in a minimal browser VM.
const sandbox={window:null,console,localStorage:{getItem(){return null},setItem(){}},document:{getElementById(){return null},addEventListener(){}},alert(){},prompt(){return '0'},currentChar:{id:'c1',name:'Test',class:'Fighter',level:2,stats:{str:16},weaponsData:[{id:'w1',name:'Sword',stat:'str',diceCount:1,diceSides:8}],spellsData:[]}};
sandbox.window=sandbox;
vm.runInNewContext(gameplay,sandbox,{filename:'network_gameplay.js'});
assert.equal(sandbox.dndNetworkGameplayBuildProfile().characterId,'c1');
assert.equal(sandbox.dndNetworkGameplayBuildProfile().weapons[0].id,'w1');
console.log('V70.13 multiplayer authority/handshake PASS');
