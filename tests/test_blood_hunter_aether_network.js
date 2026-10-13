const assert=require('assert'),fs=require('fs'),vm=require('vm'),path=require('path');
const {runtime,hero,root}=require('./helpers/class_runtime_harness');
const g=runtime(),H=g.DNDBloodHunter,C=g.DNDClassFeatures;
const hunter=hero(H.CLASS,7,'Орден призрачных убийц');
hunter.id='host-ghost';hunter.characterId='host-ghost';C.buildFeatureSet(hunter);
assert(C.useFeature(hunter,'aetherWalk',{className:H.CLASS,atStartOfTurn:true}).ok);
const actor={id:'host-ghost',characterId:hunter.id,ownerPeerId:'p1',name:'Призрачный убийца',type:'hero',team:'party',speed:30,turnResources:{action:true,bonusAction:true,reaction:true,movement:30,movementUsed:0}};
const enemy={id:'enemy',name:'Враг',type:'monster',team:'enemy'};
const tokens={'bt_host-ghost':{id:'bt_host-ghost',sourceId:'host-ghost',x:0,y:0,size:1},bt_enemy:{id:'bt_enemy',x:5,y:0,size:1}};
const board={tokens,cols:8,rows:1,cellFt:5,obstacles:{'1:0':true,'2:0':true},walls:[]};
g.DNDBattleBoard={
 ensure:()=>board,findToken:k=>tokens[k],distanceFt:(a,b)=>Math.abs(a.x-b.x)*5,
 lineOfSight:()=>({clear:true,cover:0}),
 pathCost:(a,b)=>{if(a.x===b.x)return 0;const x1=Math.min(a.x,b.x),x2=Math.max(a.x,b.x);for(let x=x1+1;x<=x2;x++)if(board.obstacles[x+':0'])return Infinity;return Math.abs(a.x-b.x)*5;}
};
const peers={p1:{profile:hunter}};
g.dndNetwork={state:{role:'host'},getPeer:k=>peers[k]};
g.currentChar={id:'master',initiativeTracker:{round:1,activeIndex:0,combatants:[actor,enemy],battlefield:board}};
g.currentCharacter=g.currentChar;
const src=fs.readFileSync(path.join(root,'app/network_gameplay.js'),'utf8')
  .replace('  function geometryCheck(actor,target,payload){','  global.__testGeometryCheck=geometryCheck;global.__testApplyPlannedMove=applyPlannedMove;\n  function geometryCheck(actor,target,payload){');
vm.runInContext(src,g,{filename:'app/network_gameplay.js'});
function check(cost,phase){
 actor.turnResources.movement=cost;
 return g.__testGeometryCheck(actor,enemy,{moveTo:{x:4,y:0},rangeFt:5,phaseThroughObjects:phase});
}
assert.strictEqual(check(30,false).ok,false,'ordinary move cannot pass walls or solid cells');
let r=check(30,true);assert.strictEqual(r.ok,true,JSON.stringify(r));assert.strictEqual(r.pathFt,30,'two solid squares cost double');
assert.strictEqual(check(25,true).ok,false,'phasing cannot exceed real movement allowance');
assert.strictEqual(tokens['bt_host-ghost'].x,0);
assert.strictEqual(g.__testApplyPlannedMove(actor,{moveTo:{x:4,y:0},phaseThroughObjects:true}),false,'host move must independently recheck budget');
actor.turnResources.movement=30;
assert.strictEqual(g.__testApplyPlannedMove(actor,{moveTo:{x:4,y:0},phaseThroughObjects:true}),true);
assert.strictEqual(tokens['bt_host-ghost'].x,4);
assert.strictEqual(actor.turnResources.movementUsed,30);
tokens['bt_host-ghost'].x=0;actor.turnResources.movementUsed=0;
delete hunter.classFeaturesState.bhAetherWalk;
assert.strictEqual(check(30,true).ok,false,'without active Aether Walk, client phasing request is rejected');
assert.strictEqual(g.__testApplyPlannedMove(actor,{moveTo:{x:4,y:0},phaseThroughObjects:true}),false);
hunter.classFeaturesState.bhAetherWalk={turns:1};
actor.classFeaturesState={bloodHunterBrand:{ownerId:'another-hunter',level:11,order:'ghostslayer',dc:14}};
assert.strictEqual(check(30,true).ok,false,'Brand of Sundering forbids phasing even with Aether Walk');
console.log('PASS: host validates phased path, terrain costs, resource budgets and Sundering restriction');