/** V57 Gameplay Core regression test. */
const fs=require('fs'),vm=require('vm'),path=require('path');
const root=__dirname;
const char={id:'hero1',name:'Герой',hpCurrent:20,hpMax:20,initiativeTracker:{round:1,activeIndex:0,combatants:[
 {id:'hero1',name:'Герой',type:'hero',hp:20,maxHp:20,ac:15,speed:30,initiative:10,turnResources:{action:true,bonusAction:true,reaction:true,movement:30,movementUsed:0}},
 {id:'gob1',name:'Гоблин',type:'enemy',hp:7,maxHp:7,ac:5,speed:30,initiative:5,turnResources:{action:true,bonusAction:true,reaction:true,movement:30,movementUsed:0}}
]}};
const events=[];
const ctx={console,window:null,Date,Math,JSON,setTimeout:()=>{},document:{getElementById:()=>null,createElement:()=>({}),addEventListener:()=>{}},currentChar:char,currentCharacter:char,autoSaveCurrentCharacter:()=>{},dndNetwork:{state:{role:'single'}},DNDCampaign:{getCurrent:()=>({gameplayEvents:events}),save:()=>{}},DNDMonsterLoot:{generate:(name,o)=>({monster:name,monsterId:o.monsterId,containers:{pockets:[],harvest:[]}}),collect:(h,l,c)=>l},DNDCombat:{attack:(a,t)=>{t.hp=0;t.defeated=true;return {hit:true,damage:{total:7}}}},DNDSummoning:null};
ctx.window=ctx;
vm.runInNewContext(fs.readFileSync(path.join(root,'gameplay_core_v57.js'),'utf8'),ctx,{filename:'gameplay_core_v57.js'});
const api=ctx.DNDGameplayV57;
if(!api||api.VERSION!=='57.0.0')throw new Error('V57 API missing');
if(api.snapshot().living!==2)throw new Error('living count failed');
let s=api.spendAction('action'); if(!s.ok||char.initiativeTracker.combatants[0].turnResources.action!==false)throw new Error('action resource failed');
let e=api.endTurn(); if(!e.ok||char.initiativeTracker.activeIndex!==1)throw new Error('turn advance failed');
if(!char.initiativeTracker.combatants[1].turnResources.action)throw new Error('turn reset failed');
const r=api.executeAttack(char.initiativeTracker.combatants[1],char.initiativeTracker.combatants[0],{damage:'1d6'}); if(!r.ok)throw new Error('attack failed');
const d=char.initiativeTracker.combatants[0].generatedLoot ? {ok:true} : api.onDefeat(char.initiativeTracker.combatants[0],char.initiativeTracker.combatants[1]); if(!d||!char.initiativeTracker.combatants[0].generatedLoot)throw new Error('defeat/loot failed');
if(events.length!==1)throw new Error('campaign event count failed');
console.log('V57_GAMEPLAY_CORE_TEST_OK');
console.log(JSON.stringify({version:api.VERSION,round:char.initiativeTracker.round,active:char.initiativeTracker.combatants[char.initiativeTracker.activeIndex].name,events:events.length}));
