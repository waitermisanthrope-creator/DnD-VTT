const assert=require('assert'),fs=require('fs'),vm=require('vm'),path=require('path');
const {runtime,hero,root}=require('./helpers/class_runtime_harness');
const g=runtime(),H=g.DNDBloodHunter;
const a=hero('Воин',5);a.id='a';a.speed=30;
a.turnResources={action:true,bonusAction:true,reaction:true,movement:80,movementUsed:0};
const b=hero('Воин',5);b.id='b';b.ac=10;
const tokens={bt_a:{x:0,y:0,size:1},bt_b:{x:3,y:0,size:1}};
const board={tokens};
g.currentChar={id:'master',initiativeTracker:{round:1,activeIndex:0,combatants:[a,b],battlefield:board}};
g.currentCharacter=g.currentChar;
g.DNDBattleBoard={
 ensure:()=>board,findToken:k=>tokens[k],
 distanceFt:(x,y)=>Math.abs(x.x-y.x)*5,
 pathCost:(x,y)=>Math.abs(x.x-y.x)*5,
 lineOfSight:()=>({clear:true,cover:0})};
const src=fs.readFileSync(path.join(root,'app/network_gameplay.js'),'utf8').replace('  function geometryCheck(actor,target,payload){','  global.__testGeometryCheck=geometryCheck;global.__testApplyPlannedMove=applyPlannedMove;\n  function geometryCheck(actor,target,payload){');
vm.runInContext(src,g,{filename:'app/network_gameplay.js'});
const check=(dest,extra={})=>g.__testGeometryCheck(a,b,{moveTo:{x:dest,y:0},rangeFt:5,...extra});
let r=check(2);
assert.strictEqual(r.ok,true,'baseline projected target range should be respected');
assert.strictEqual(g.__testApplyPlannedMove(a,{moveTo:{x:2,y:0}}),true,'nested moveTo must be used as real destination');
assert.strictEqual(tokens.bt_a.x,2);
assert.strictEqual(a.turnResources.movementUsed,10);
assert.strictEqual(check(40).ok,false,'movement cannot exceed remaining allowance');
assert.strictEqual(g.__testApplyPlannedMove(a,{moveTo:{x:NaN,y:0}}),false);
assert.strictEqual(tokens.bt_a.x,2);
a.classFeaturesState={bloodHunterBrand:{ownerId:'owner',order:'ghostslayer',level:13,dc:15}};
assert.strictEqual(H.canDash(a),false);
assert.strictEqual(H.canPhaseThroughObjects(a),false);
assert.strictEqual(check(3,{movementMode:'dash'}).ok,false,'Tethering forbids declared dash');
assert.strictEqual(check(3,{phaseThroughObjects:true}).ok,false,'Sundering forbids phasing');
assert.strictEqual(g.__testApplyPlannedMove(a,{moveTo:{x:3,y:0},movementMode:'dash'}),false);
assert.strictEqual(g.__testApplyPlannedMove(a,{moveTo:{x:3,y:0},phaseThroughObjects:true}),false);
assert.strictEqual(tokens.bt_a.x,2,'forbidden movement must not mutate token');
assert.strictEqual(check(7).ok,false,'branded target must not spend Dash-extended movement allowance');
assert.strictEqual(g.__testApplyPlannedMove(a,{moveTo:{x:7,y:0}}),false);
assert.strictEqual(check(3).ok,true,'ordinary walking remains available');
assert.strictEqual(g.__testApplyPlannedMove(a,{moveTo:{x:3,y:0}}),true);
assert.strictEqual(tokens.bt_a.x,3);
assert.strictEqual(a.turnResources.movementUsed,15);
delete a.classFeaturesState.bloodHunterBrand;
assert.strictEqual(H.canDash(a),true);
assert.strictEqual(check(7).ok,true,'without Tethering, speed beyond 30 may be used');
console.log('PASS: host movement destination, path budget, Tethering Dash and Sundering phase guards');
