const assert=require('assert'),fs=require('fs'),vm=require('vm'),path=require('path');
const {runtime,hero,root}=require('./helpers/class_runtime_harness');
const g=runtime(),C=g.DNDClassFeatures,H=g.DNDBloodHunter;
g.Math.random=()=>0;
const hunter=hero(H.CLASS,7,'Орден призрачных убийц');
hunter.id='aether-owner';hunter.characterId=hunter.id;hunter.hpCurrent=30;hunter.hpMax=40;
C.buildFeatureSet(hunter);
assert(C.useFeature(hunter,'aetherWalk',{className:H.CLASS,atStartOfTurn:true}).ok);
const startingTurns=hunter.classFeaturesState.bhAetherWalk.turns;
assert(startingTurns>0);
const actor={id:'aether-owner',characterId:hunter.id,ownerPeerId:'p1',type:'hero',name:'Призрачный убийца',team:'party',hp:30,maxHp:40,ac:12,speed:30,turnResources:{action:true,bonusAction:true,reaction:true,movement:30}};
const other={id:'another',ownerPeerId:'p2',characterId:'another',type:'hero',name:'Союзник',team:'party',hp:25,maxHp:25,ac:12,speed:30,turnResources:{action:true,bonusAction:true,reaction:true,movement:30}};
const tokens={'bt_aether-owner':{id:'bt_aether-owner',sourceId:'aether-owner',x:2,y:2,size:1},bt_another:{id:'bt_another',sourceId:'another',x:1,y:1,size:1}};
const board={cols:5,rows:5,cellFt:5,obstacles:{'2:2':true},tokens};
g.DNDBattleBoard={ensure:()=>board,findToken:k=>tokens[k],pathCost:(a,b)=>Math.abs(a.x-b.x)*5+Math.abs(a.y-b.y)*5,distanceFt:(a,b)=>Math.abs(a.x-b.x)*5+Math.abs(a.y-b.y)*5,lineOfSight:()=>({clear:true,cover:0})};
g.currentChar={id:'master',initiativeTracker:{round:1,activeIndex:0,combatants:[actor,other],battlefield:board}};g.currentCharacter=g.currentChar;
g.autoSaveCurrentCharacter=()=>{};g.renderInitiativeTracker=()=>{};g.dndRenderCombatV3=()=>{};g.dndNetworkGameplayRender=()=>{};
let handler;const results=[],peers={p1:{profile:hunter},p2:{profile:hero('Воин',1)}};
g.dndNetwork={state:{role:'host'},getPeer:id=>peers[id],roster:()=>[],registerActionHandler:fn=>handler=fn,sendActionResult:(id,req,result)=>results.push({id,...result}),commitHostEvent:()=>({seq:1})};
g.addEventListener=(name,fn)=>{if(name==='DOMContentLoaded')fn();};
vm.runInContext(fs.readFileSync(path.join(root,'app/network_gameplay.js'),'utf8'),g,{filename:'app/network_gameplay.js'});
assert(handler,'network handler must register');
function end(id,i){
 const prev=results.length;
 handler(id,{type:'END_TURN',requestId:'end-'+id+'-'+i,payload:{}});
 assert(results.length>prev,'end turn must return a response');
 assert(results.at(-1).ok,JSON.stringify(results.at(-1)));
}
for(let i=0;i<startingTurns;i++){
 end('p1',i);
 assert.strictEqual(actor.hp,30-(i+1),'host must apply force damage to authoritative combat HP every turn inside an obstacle');
 assert.strictEqual(hunter.hpCurrent,actor.hp,'host must persist damage to connected player profile');
 end('p2',i);
}
assert.strictEqual(hunter.classFeaturesState.bhAetherWalk,undefined,'host must expire Aether Walk after its duration');
assert.strictEqual(H.aetherInsideObject(actor),false,'host must shunt token outside solid obstacle');
assert.strictEqual(hunter.classFeaturesState.bhAetherShuntRequired,undefined);
assert(hunter.classFeaturesState.bhLastAetherShunt&&hunter.classFeaturesState.bhLastAetherShunt.ok,'host must persist safe shunt outcome');
assert.notStrictEqual(tokens['bt_aether-owner'].x+':'+tokens['bt_aether-owner'].y,'1:1','shunt may not overlap an ally');
const hp=actor.hp;end('p1','after');
assert.strictEqual(actor.hp,hp,'expired walk must stop dealing damage');
console.log('PASS: host Aether Walk ticks force damage, synchronizes HP and shunts on real initiative end turns');
