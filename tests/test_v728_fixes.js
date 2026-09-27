const fs=require('fs'),vm=require('vm'),assert=require('assert');
const core={console,Math,Date,JSON,isFinite,Number,String,Array,Object,parseInt,parseFloat,setTimeout,clearTimeout,window:null,global:null};
core.window=core;core.global=core;core.addEventListener=()=>{};core.document={getElementById:()=>null};
core.DNDRules={profBonus:h=>2,getSaveBonus:()=>0,rollD20:()=>({result:1,critical:false,fumble:false})};
core.DNDCombat={savingThrow:(actor,stat,dc,mode,ctx)=>({stat,dc,success:false,roll:{result:1},total:1}),toggleCondition:(t,c,on)=>{t.conditions=t.conditions||{};t.conditions[c]=on;return on;}};
vm.runInNewContext(fs.readFileSync('class_features_engine.js','utf8'),core);
const F=core.DNDClassFeatures;
function hero(classes,stats){return {id:'h1',name:'Hero',classes,stats:stats||{str:10,dex:16,con:14,wis:16,int:16,cha:16},resources:{},spellSlotsData:{},classFeaturesState:{},turnResources:{action:1,bonusAction:1,reaction:1}};}
// Aura of Courage makes frightened saves auto-success when source is nearby.
let pal=hero([{name:'Паладин',level:10}]);let sm=F.saveModifiers(pal,{saveType:'frightened',frightenedEffect:true});assert.equal(sm.immuneFrightened,true);
// Foe Slayer does not require Hunter's Mark and applies only one chosen modifier per turn.
let ranger=hero([{name:'Следопыт',level:20}],{str:10,dex:18,con:14,wis:18,int:10,cha:10});let fm=F.attackModifiers(ranger,{target:{id:'t'},foeSlayerMode:'attack'});assert.equal(fm.bonusAttack,4);assert.equal(fm.bonusDamage,0);assert.equal(fm.foeSlayerApplied,true);F.onAttackResult(ranger,{foeSlayerApplied:true,hit:true});let fm2=F.attackModifiers(ranger,{target:{id:'t'},foeSlayerMode:'attack'});assert.equal(!!fm2.foeSlayerApplied,false);
// Barbarian keeps Brutal Critical; Fighter no longer receives it from a core-level check.
let barb=hero([{name:'Варвар',level:9}]);let bm=F.attackModifiers(barb,{weaponAttack:true,critical:true});assert(bm.extraDice.includes('1d12'));
let fighter=hero([{name:'Воин',level:9}]);let fgm=F.attackModifiers(fighter,{weaponAttack:true,critical:true});assert(!fgm.notes.some(x=>String(x).indexOf('Жестокий критический удар')>=0));
// Turn Undead ignores non-undead targets instead of consuming a successful effect on them.
let cleric=hero([{name:'Жрец',level:5}]);cleric.resources.channelDivinity={max:1,current:1,recharge:'short'};let orc={id:'o',name:'Orc',creatureType:'humanoid',conditions:{}};let tu=F.useFeature(cleric,'turnUndead',{targets:[orc],round:1});assert.equal(tu.ok,true);assert.equal(tu.results[0].ignored,true);
console.log('V70.25.21 Fix Batch 21 tests: PASS');
