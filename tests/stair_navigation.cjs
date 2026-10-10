'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const context={};context.window=context;
vm.runInNewContext(fs.readFileSync(path.join(root,'app/3dmap/stair_navigation.js'),'utf8'),context);
const N=context.DNDStairNavigation;
const map=JSON.parse(fs.readFileSync(path.join(root,'app/data/maps/3d_stress_v740026.json'),'utf8'));
assert.ok(map.width>=50&&map.height>=50);
assert.equal(map.floors.length,3);
for(let floor=0;floor<3;floor++){
 const f=map.floors[floor],stairs=f.objects.filter(o=>o.walkable);
 assert.equal(stairs.length,floor===1?2:1,'stair count on floor '+floor);
 assert.ok(f.objects.some(o=>o.type==='light'),'lighting on floor '+floor);
 assert.ok(f.objects.some(o=>o.type==='model'),'models on floor '+floor);
}
const t={x:9.5,y:9.5,floor:0,stairHeight:0};
function climb(from,to,x){
 t.floor=from;map.currentFloor=from;t.x=x;t.y=9.5;
 let heights=[];
 for(let i=0;i<55&&t.floor===from;i++){
  t.y+=.12;const result=N.step(map,t);heights.push(t.stairHeight);
  if(result){assert.equal(result.floor,to);assert.equal(result.direction,'up');}
 }
 assert.equal(t.floor,to,'climb '+from+'->'+to);
 assert.ok(heights.some(h=>h>1&&h<3),'intermediate camera elevation');
}
function descend(from,to,x){
 t.floor=from;map.currentFloor=from;t.x=x;t.y=14.5;
 let heights=[];
 for(let i=0;i<55&&t.floor===from;i++){
  t.y-=.12;const result=N.step(map,t);heights.push(t.stairHeight);
  if(result){assert.equal(result.floor,to);assert.equal(result.direction,'down');}
 }
 assert.equal(t.floor,to,'descent '+from+'->'+to);
 assert.ok(heights.some(h=>h< -1&&h> -3),'intermediate camera descent');
}
climb(0,1,9.5);climb(1,2,16.5);descend(2,1,16.5);descend(1,0,9.5);
assert.equal(N.at(map,0,40,40),null);
t.stairHeight=2;N.step(map,t);assert.equal(t.stairHeight,0,'height resets off stairs');
// Test the full range of movement deltas (including the maximum editor frame step).
for(const delta of [.01,.04,.08,.12,.16]){
 for(const [from,to,x,dir] of [[0,1,9.5,1],[1,2,16.5,1],[2,1,16.5,-1],[1,0,9.5,-1]]){
  t.floor=from;map.currentFloor=from;t.x=x;t.y=dir===1?9.5:14.5;
  for(let i=0;i<Math.ceil(6/delta)&&t.floor===from;i++){t.y+=dir*delta;N.step(map,t);}
  assert.equal(t.floor,to,'landing must not be skipped at movement delta '+delta+' on '+from+'->'+to);
 }
}
console.log('PASS: stress map, 4 stair transitions, intermediate camera heights, reset and 20 delta cases');
