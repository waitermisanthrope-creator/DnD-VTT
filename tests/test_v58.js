/** V58 Battle UX + Campaign Gameplay regression test. */
const fs=require('fs'),vm=require('vm'),path=require('path');
const hero={id:'hero',name:'Герой',hp:20,maxHp:20,type:'hero',turnResources:{action:true,bonusAction:true,reaction:true,movement:30}};
const gob={id:'gob',name:'Гоблин',hp:7,maxHp:7,type:'enemy',turnResources:{action:true,bonusAction:true,reaction:true,movement:30}};
const events=[];const campaign={sessions:[]};
const ctx={console,Date,Math,JSON,setTimeout:()=>{},localStorage:{x:null,getItem(){return this.x;},setItem(k,v){this.x=v;}},document:{getElementById:()=>null,querySelector:()=>null,createElement:()=>({}),addEventListener:()=>{}},alert:()=>{},confirm:()=>true,prompt:()=>null,DNDCampaign:{getCurrent:()=>campaign,save:()=>{}},DNDGameplayV57:{ensureTracker:()=>({round:1,activeIndex:0,combatants:[hero,gob]}),active:()=>hero,endTurn:()=>({ok:true}),},DNDBattleBoard:{syncFromInitiative:()=>{},open:()=>{}}};ctx.window=ctx;
vm.runInNewContext(fs.readFileSync(path.join(__dirname,'vtt_gameplay_ux_v58.js'),'utf8'),ctx,{filename:'vtt_gameplay_ux_v58.js'});
const api=ctx.DNDGameplayV58;if(!api||api.VERSION!=='58.0.0')throw new Error('V58 API missing');
let r=api.startEncounter('Тестовый бой',{sessionId:'ses_test'});if(!r.ok)throw new Error('start encounter failed');
if(api.snapshot().encounter.name!=='Тестовый бой')throw new Error('encounter state failed');
r=api.endTurn();if(!r.ok)throw new Error('end turn failed');
r=api.finishEncounter('victory');if(!r.ok||api.snapshot().encounter!==null)throw new Error('finish failed');
if(campaign.gameplay.eventLog.length<3)throw new Error('campaign log failed');
console.log('V58_GAMEPLAY_UX_TEST_OK');console.log(JSON.stringify({version:api.VERSION,events:api.snapshot().eventCount,campaignEvents:campaign.gameplay.eventLog.length}));
