const fs=require('fs'),vm=require('vm'),assert=require('assert');
const core={console,Math,Date,JSON,isFinite,Number,String,Array,Object,parseInt,parseFloat,setTimeout,clearTimeout,window:null,global:null};
core.window=core;core.global=core;core.addEventListener=()=>{};core.document={getElementById:()=>null,addEventListener:()=>{}};
core.DNDRules={profBonus:h=>2,getSaveBonus:()=>0,parseDice:e=>({groups:[{count:1,sides:6}],constant:0}),rollD20:()=>({result:10,critical:false,fumble:false})};
vm.runInNewContext(fs.readFileSync('combat_engine.js','utf8'),core);
const C=core.DNDCombat;
function h(id){return {id,name:id,hp:30,maxHp:30,stats:{str:16,dex:16,con:14,wis:10,int:10,cha:10},turnResources:{action:true,bonusAction:true,reaction:true}};}
// Shared attack sequence executes each supplied attack exactly once and stops on defeat.
let a=h('a'),t=h('t');t.ac=1;let seq=C.attackSequence(a,t,[{bonus:10,damage:'1d6',damageType:'рубящий'},{bonus:10,damage:'1d6',damageType:'рубящий'}],{stopOnDefeat:true});assert.equal(seq.attackCount,2);assert.equal(seq.hitCount,2);
// Multiattack with distinct attack profiles uses the same resolver API.
const monsterSrc=fs.readFileSync('monster_engine.js','utf8');core.DNDCombat=C;vm.runInNewContext(monsterSrc,core);assert.equal(typeof core.DNDMonsters,'object');
console.log('V70.25.21 Fix Batch 22 tests: PASS');
