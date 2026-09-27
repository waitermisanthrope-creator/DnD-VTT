'use strict';
const assert=require('assert'),fs=require('fs'),vm=require('vm');
let domReady=null, registered=null, sent=[];
const ctx={console,Math,Date,JSON,isFinite,Number,String,Array,Object,parseInt,parseFloat,setTimeout:()=>0,clearTimeout,alert:null,prompt:null};
ctx.window=ctx;ctx.global=ctx;ctx.addEventListener=(n,f)=>{if(n==='DOMContentLoaded')domReady=f;};
ctx.document={getElementById:()=>null,createElement:()=>({style:{},appendChild(){},setAttribute(){}})};
ctx.DNDRules={profBonus:()=>2,rollD20:()=>({result:15,critical:false,fumble:false}),weaponAttack:(a,w,m)=>({roll:{result:15,critical:false,fumble:false},bonus:5})};
ctx.dndNetwork={state:{role:'host'},getPeer:id=>({profile:id==='p2'?{characterId:'c2',name:'Rogue',stats:{dex:16},classes:[{name:'Плут',level:5}],classFeatureIds:['uncannyDodge'],resources:{},classFeaturesState:{}}:{characterId:'c1',name:'Attacker',stats:{str:16},classes:[{name:'Воин',level:5}],classFeatureIds:[],resources:{},classFeaturesState:{},weapons:[{id:'w1',name:'Sword',damage:'1d6+3',damageType:'рубящий',rangeFt:5}]}}),
 sendActionResult:(id,req,res)=>sent.push({kind:'result',id,req,res}),sendReactionRequest:(id,p)=>sent.push({kind:'reaction',id,p}),commitHostEvent:(t,p)=>({seq:1}),registerActionHandler:fn=>registered=fn};
ctx.currentChar={name:'Host',initiativeTracker:{round:1,activeIndex:0,combatants:[
 {id:'a',name:'Attacker',ownerPeerId:'p1',hp:20,maxHp:20,ac:12,turnResources:{action:true,bonusAction:true,reaction:true,movement:30,movementUsed:0}},
 {id:'b',name:'Rogue',ownerPeerId:'p2',hp:20,maxHp:20,ac:12,turnResources:{action:true,bonusAction:true,reaction:true,movement:30,movementUsed:0}}
]}};
ctx.autoSaveCurrentCharacter=()=>{};ctx.renderInitiativeTracker=()=>{};ctx.dndRenderCombatV3=()=>{};
vm.createContext(ctx);
for(const f of ['combat_engine.js','class_features_engine.js','network_gameplay.js']) vm.runInContext(fs.readFileSync('./'+f,'utf8'),ctx,{filename:f});
assert(domReady,'network DOM hook registered'); domReady(); assert(registered,'network action handler registered');
const profile=ctx.dndNetwork.getPeer('p2').profile;
const opts=ctx.DNDClassFeatures.reactionOptions({...profile,turnResources:{reaction:true}},{amount:10,damageType:'рубящий',source:'attack',attackKind:'weapon',visible:true});
assert(opts&&opts.options.some(x=>x.id==='uncannyDodge'));
// Real host ATTACK handler: must open reaction window and not apply damage.
const before=ctx.currentChar.initiativeTracker.combatants[1].hp;
const r=registered('p1',{type:'ATTACK',requestId:'atk1',payload:{targetId:'b',weaponId:'w1'}});
assert(r&&r.reactionPending,'attack should pause for reaction');
assert.strictEqual(ctx.currentChar.initiativeTracker.combatants[1].hp,before,'damage must be deferred');
const rq=sent.find(x=>x.kind==='reaction'); assert(rq&&rq.id==='p2','reaction request sent to target owner');
const rr=registered('p2',{type:'REACTION_RESPONSE',requestId:'rr1',payload:{reactionId:rq.p.reactionId,choice:'uncannyDodge'}});
assert(rr&&rr.ok,'reaction response accepted');
assert(ctx.currentChar.initiativeTracker.combatants[1].hp<before,'damage applied after reaction');
const hpAfter=ctx.currentChar.initiativeTracker.combatants[1].hp;
assert.strictEqual(ctx.currentChar.initiativeTracker.combatants[1].turnResources.reaction,false,'reaction consumed');
assert.strictEqual(ctx.currentChar.initiativeTracker.combatants[1].hp,hpAfter,'damage applied exactly once');
console.log('PASS V70.22 two-phase reaction authority');
