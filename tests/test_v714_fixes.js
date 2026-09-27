const fs=require('fs'), vm=require('vm'), assert=require('assert');
const src=fs.readFileSync(__dirname+'/network_engine.js','utf8');
const sent=[]; const handlers={};
const bridge={
  createRoom:o=>sent.push(['createRoom',o]),
  joinRoom:o=>sent.push(['joinRoom',o]),
  sendMessage:o=>sent.push(['sendMessage',o]),
  setMessageHandler:fn=>{handlers.message=fn;}
};
const ctx={console,Date,Math,JSON,Promise,localStorage:{getItem:()=>null,setItem:()=>{}},document:{getElementById:()=>null},btoa:s=>Buffer.from(s,'binary').toString('base64'),atob:s=>Buffer.from(s,'base64').toString('binary'),encodeURIComponent,decodeURIComponent,unescape,escape,setTimeout,clearTimeout,DndLanBridge:bridge};
ctx.window=ctx; vm.createContext(ctx); vm.runInContext(src,ctx);
assert(ctx.dndNetwork.nativeInfo().available,'native bridge detected');
assert(typeof handlers.message==='function','native message handler bound');
assert(ctx.dndNetwork.hostRoomNative(),'native host starts');
assert(sent.some(x=>x[0]==='createRoom' && x[1].protocolVersion===6),'host advertises protocol v6');
handlers.message({peerId:'p1',message:{type:'HELLO',clientId:'c1',name:'Alice',characterId:'char1',characterName:'Alice',profile:{characterId:'char1',name:'Alice',className:'Wizard'}}});
assert(ctx.dndNetwork.getPeer('p1'),'native HELLO creates peer');
assert(sent.some(x=>x[0]==='sendMessage' && x[1].message.type==='HELLO_ACCEPT'),'host accepts native HELLO');
handlers.message({peerId:'p1',message:{type:'PLAYER_ACTION',action:{type:'ROLL_D20',requestId:'r1',label:'test'}}});
assert(sent.some(x=>x[0]==='sendMessage' && x[1].message.type==='ACTION_RESULT'),'native PLAYER_ACTION routed to host');
console.log('V70.14 native bridge adapter tests: PASS');
