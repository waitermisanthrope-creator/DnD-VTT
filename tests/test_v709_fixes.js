'use strict';
const fs=require('fs'),vm=require('vm'),assert=require('assert');

function loadCombat(){
  const ctx={window:{},console,Math,Date,setTimeout,clearTimeout};
  ctx.window=ctx;ctx.global=ctx;
  ctx.DNDRules={rollD20:()=>({result:12,critical:false,fumble:false}),getSaveBonus:()=>8};
  vm.runInNewContext(fs.readFileSync(__dirname+'/combat_engine.js','utf8'),ctx,{filename:'combat_engine.js'});
  return ctx.DNDCombat;
}
const C=loadCombat();
let target={hp:30,tempHp:0,resistances:['огонь'],vulnerabilities:['огонь'],immunities:[]};
assert.strictEqual(C.effectiveDamage(target,10,'огонь').amount,10,'resistance+vulnerability must cancel');
target={hp:30,tempHp:0,resistances:['огонь'],vulnerabilities:[],immunities:[]};
assert.strictEqual(C.effectiveDamage(target,9,'огонь').amount,4,'resistance halves and floors');
let save=C.savingThrow({stats:{}},'dex',20);
assert.strictEqual(save.roll.result,12); assert.strictEqual(save.success,true,'saving throws use total, not natural-20/1 attack rule');

const boardCtx={window:{},console,Math,Date,setTimeout,clearTimeout};
boardCtx.window=boardCtx;boardCtx.document={readyState:'loading',addEventListener(){},body:{appendChild(){}}};
boardCtx.currentChar={initiativeTracker:{round:1,activeIndex:0,combatants:[],battlefield:{version:3,cols:8,rows:8,cellFt:5,tokens:{},obstacles:{},difficultTerrain:{},cover:{},walls:[]}}};
vm.runInNewContext(fs.readFileSync(__dirname+'/battle_board.js','utf8'),boardCtx,{filename:'battle_board.js'});
const B=boardCtx.DNDBattleBoard;
assert.strictEqual(B.pathCost({x:0,y:0},{x:1,y:1}),5,'first diagonal costs 5 ft');
boardCtx.currentChar.initiativeTracker.battlefield.obstacles={'1:0':1,'0:1':1,'2:1':1,'1:2':1};
assert.strictEqual(B.pathCost({x:0,y:0},{x:2,y:2}),15,'forced two diagonals use 5/10 = 15 ft');
boardCtx.currentChar.initiativeTracker.battlefield.obstacles={};
assert.strictEqual(B.pathCost({x:0,y:0},{x:3,y:3}),20,'unobstructed 3x3 uses 5+10+5');
assert.strictEqual(JSON.stringify(B.pathCells({x:0,y:0},{x:1,y:1})),JSON.stringify([{x:0,y:0},{x:1,y:1}]));
console.log('V70.9 targeted fixes: PASS');
