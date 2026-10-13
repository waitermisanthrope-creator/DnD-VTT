const assert=require('assert'),fs=require('fs'),vm=require('vm'),path=require('path');
const {runtime,hero,root}=require('./helpers/class_runtime_harness');
const g=runtime(),C=g.DNDClassFeatures,B=g.DNDCombat,H=g.DNDBloodHunter;
let serial=0;
function lycan(){
 const h=hero('Кровавый охотник',11,'Орден ликантропов');h.id='wolf-'+(++serial);h.hpCurrent=5;
 C.buildFeatureSet(h);assert(C.useFeature(h,'hybridTransformation',{}).ok);
 B.beginConcentration(h,{name:'Тест концентрации',concentration:true});
 return h;
}
function creature(team,x){
 const c=hero('Воин',1);c.id='actor-'+(++serial);c.name=c.id;c.team=team;c.hpCurrent=30;c.hpMax=40;c.ac=10;c.x=x;return c;
}
function boardFor(h,others){
 let tokens={['bt_'+h.id]:{x:0,y:0,size:1}};
 others.forEach(x=>tokens['bt_'+x.id]={x:x.x,y:0,size:1});
 const board={tokens},obj={
  ensure:()=>board,findToken:id=>tokens[id]||null,tokenList:()=>Object.values(tokens),
  distanceFt:(a,b)=>Math.abs(a.x-b.x)*5,pathCost:(a,b)=>Math.abs(a.x-b.x)*5,
  pathCells:(a,b)=>{let list=[];let dx=a.x<=b.x?1:-1;for(let x=a.x;dx>0?x<=b.x:x>=b.x;x+=dx)list.push({x,y:0});return list;}};
 g.DNDBattleBoard=obj;return obj;
}
g.Math.random=()=>0.5;g.DNDRules.rollD20=()=>({result:11,critical:false,fumble:false});
let h=lycan(),friend=creature('party',1),enemy=creature('enemy',4);h.team='party';boardFor(h,[friend,enemy]);C.resetTurn(h);
assert.strictEqual(h.classFeaturesState.bhBloodlust.requiresNearestAttack,true);
let result=H.resolveBloodlust(h,{combatants:[friend,enemy]});
assert(result.ok&&result.triggered,'failed save forces the Bloodlust resolution');
assert.strictEqual(result.targetId,friend.id,'nearest ally is not excluded');
assert(result.attack&&result.attack.hit,'forced melee attack should execute: '+JSON.stringify(result));
assert(friend.hpCurrent<30,'actual ally HP must be modified');
assert.strictEqual(h.turnResources.action,false);
assert.strictEqual(H.resolveBloodlust(h,{combatants:[friend,enemy]}).ok,false,'cannot attack twice from one Bloodlust turn');
let saved=JSON.parse(JSON.stringify(h));assert(saved.classFeaturesState.bhBloodlust.resolved);

// Equal-distance ties choose randomly instead of always privileging enemy.
h=lycan();friend=creature('party',1);enemy=creature('enemy',-1);h.team='party';boardFor(h,[friend,enemy]);C.resetTurn(h);g.Math.random=()=>0.99;
result=H.resolveBloodlust(h,{combatants:[friend,enemy]});
assert.strictEqual(result.targetId,enemy.id,'random tie-break can choose second creature');

// The wolf moves towards an out-of-reach target without entering its tile,
// uses the actual path cost, and attacks after reaching melee range.
g.Math.random=()=>0.5;h=lycan();enemy=creature('enemy',4);boardFor(h,[enemy]);C.resetTurn(h);
result=H.resolveBloodlust(h,{combatants:[enemy]});
assert.strictEqual(result.targetId,enemy.id);
assert.strictEqual(result.movedFt,15);
assert.strictEqual(result.to.x,3,'movement must stop adjacent to occupied target tile');
assert.strictEqual(h.turnResources.movementUsed,15);
assert(result.attack&&result.attack.hit);
assert(enemy.hpCurrent<30);

// Not enough movement: forced action remains spent; no fabricated attack.
h=lycan();enemy=creature('enemy',7);boardFor(h,[enemy]);C.resetTurn(h);h.turnResources.movement=5;
result=H.resolveBloodlust(h,{combatants:[enemy]});
assert.strictEqual(result.movedFt,5);
assert.strictEqual(result.attack,null);
assert.strictEqual(result.distanceFt,30);
assert.strictEqual(h.turnResources.action,false);

// Successful Wisdom save preserves choice.
h=lycan();enemy=creature('enemy',1);boardFor(h,[enemy]);
B.breakConcentration(h);g.DNDRules.rollD20=()=>({result:20,critical:true,fumble:false});C.resetTurn(h);
assert.strictEqual(h.classFeaturesState.bhBloodlust.requiresNearestAttack,false);
assert.strictEqual(H.resolveBloodlust(h,{combatants:[enemy]}).triggered,false);
assert.strictEqual(h.turnResources.actions,1);

// Host must execute the mandatory move and attack before allowing normal RPC.
g.DNDRules.rollD20=()=>({result:11,critical:false,fumble:false});g.Math.random=()=>0.5;
const player=lycan();player.characterId='char-wolf';player.id='wolf-network';player.team='party';
const starter={id:'starter',name:'Воин игрока',ownerPeerId:'p0',type:'hero',team:'party',hp:30,maxHp:40,ac:10,turnResources:{action:true}};
const actor={id:'wolf-network',characterId:player.characterId,name:'Ликантроп',ownerPeerId:'p1',type:'hero',team:'party',hp:5,maxHp:40,ac:10,speed:player.speed,turnResources:{action:true}};
const friendActor={id:'ally-network',name:'Союзник',type:'hero',team:'party',hp:30,maxHp:40,ac:10};
const enemyActor={id:'enemy-network',name:'Враг',type:'enemy',team:'enemy',hp:30,maxHp:40,ac:10};
const tokens={bt_starter:{x:19,y:0,size:1},'bt_wolf-network':{x:0,y:0,size:1},'bt_ally-network':{x:1,y:0,size:1},'bt_enemy-network':{x:5,y:0,size:1}};
const battle={tokens};g.DNDBattleBoard={ensure:()=>battle,findToken:k=>tokens[k],tokenList:()=>Object.values(tokens),distanceFt:(a,b)=>Math.abs(a.x-b.x)*5,pathCost:(a,b)=>Math.abs(a.x-b.x)*5,pathCells:(a,b)=>{const cells=[];const sign=a.x<=b.x?1:-1;for(let x=a.x;sign>0?x<=b.x:x>=b.x;x+=sign)cells.push({x,y:0});return cells;},lineOfSight:()=>({clear:true,cover:0})};
g.currentChar={id:'master',initiativeTracker:{round:1,activeIndex:0,combatants:[starter,actor,friendActor,enemyActor],battlefield:battle}};
g.currentCharacter=g.currentChar;g.renderInitiativeTracker=()=>{};g.dndRenderCombatV3=()=>{};g.dndNetworkGameplayRender=()=>{};g.autoSaveCurrentCharacter=()=>{};
const results=[];let handler;
const peers={p0:{profile:hero('Воин',1)},p1:{profile:player}};
g.dndNetwork={state:{role:'host'},getPeer:k=>peers[k],roster:()=>[],registerActionHandler:x=>handler=x,sendActionResult:(id,req,r)=>results.push(r),commitHostEvent:()=>({seq:1})};
g.addEventListener=(name,fn)=>{if(name==='DOMContentLoaded')fn();};
vm.runInContext(fs.readFileSync(path.join(root,'app/network_gameplay.js'),'utf8'),g,{filename:'app/network_gameplay.js'});
assert(handler,'network action handler must register');
handler('p0',{type:'END_TURN',requestId:'advance',payload:{}});
const turn=results.at(-1);assert(turn.ok&&turn.kind==='end_turn');
const auto=turn.autoPlans.find(x=>x.kind==='lycan-bloodlust');
assert(auto&&auto.result.ok&&auto.result.targetId==='ally-network','host must attack the nearest living creature even when allied');
assert(friendActor.hp<30,'host-owned ally HP must reflect forced attack');
assert.strictEqual(actor.turnResources.action,false,'host must spend the real action');
assert.strictEqual(peers.p1.profile.classFeaturesState.bhBloodlust.resolved,true,'host persists resolved frenzy in player profile');
console.log('PASS: Lycan Bloodlust nearest ally, random ties, path/attack, failed movement and authoritative host start-turn');
