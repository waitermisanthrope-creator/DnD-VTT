'use strict';
const fs=require('fs'),vm=require('vm'),assert=require('assert');
// Registry collision / pack-qualified lookup.
const reg={console,localStorage:{getItem:()=>null,setItem:()=>{}},window:null};reg.window=reg;vm.runInNewContext(fs.readFileSync('content_framework.js','utf8'),reg);
const D=reg.DNDContent;
D.registerClass({id:'pack-a',name:'Pack A',source:'test',features:[{id:'earthshaker',name:'Earth A',level:1}],subclasses:[],hooks:{useFeature:(h,id)=>({ok:true,pack:'A'})}});
D.registerClass({id:'pack-b',name:'Pack B',source:'test',features:[{id:'earthshaker',name:'Earth B',level:1}],subclasses:[],hooks:{useFeature:(h,id)=>({ok:true,pack:'B'})}});
assert.strictEqual(D.getFeature('earthshaker','pack-a').name,'Earth A');
assert.strictEqual(D.getFeature('earthshaker','pack-b').name,'Earth B');
assert.strictEqual(D.invoke('Pack A',{classes:[{name:'Pack A',level:1}]},'earthshaker').pack,'A');
assert.strictEqual(D.invoke('Pack B',{classes:[{name:'Pack B',level:1}]},'earthshaker').pack,'B');
// Class engine: unsupported must not claim success; passives/resources are real.
const ctx={console,Math,Date,JSON,isFinite,Number,String,Array,Object,parseInt,parseFloat,window:null,global:null,setTimeout,clearTimeout,addEventListener:()=>{},document:{getElementById:()=>null,createElement:()=>({})}};ctx.window=ctx;ctx.global=ctx;ctx.DNDRules={profBonus:()=>3,rollD20:()=>({result:15,critical:false,fumble:false}),getSaveBonus:()=>2};
vm.runInNewContext(fs.readFileSync('class_features_engine.js','utf8'),ctx);
const F=ctx.DNDClassFeatures;
let h={classes:[{name:'Варвар',level:9}],stats:{str:18,dex:14,con:16},resources:{},classFeaturesState:{}};
let u=F.useFeature(h,'someMissingFeature',{});assert.strictEqual(u.ok,false);assert.strictEqual(u.unsupported,true);
let passive=F.useFeature(h,'dangerSense',{});assert.strictEqual(passive.ok,true);assert.strictEqual(passive.passive,true);
let fighter={classes:[{name:'Воин',level:9}],stats:{str:18,dex:14,con:16},resources:{},classFeaturesState:{}};
let m=F.attackModifiers(fighter,{weaponAttack:true,critical:true});assert(!m.notes.some(x=>String(x).indexOf('Жестокий критический удар')>=0),'fighter does not gain barbarian Brutal Critical');
let h2={classes:[{name:'Плут',level:11}],stats:{dex:18},resources:{},classFeaturesState:{}};let cm=F.checkModifiers(h2,{skillProficient:true});assert.strictEqual(cm.minimum,10);
let h3={classes:[{name:'Воин',level:5}],stats:{str:18},resources:{},classFeaturesState:{}};let am=F.attackModifiers(h3,{weaponAttack:true});assert.strictEqual(am.extraAttacks,2);
// Gameplay Core must execute Extra Attack as part of one Action.
const core={console,Math,Date,JSON,isFinite,Number,String,Array,Object,parseInt,parseFloat,setTimeout,clearTimeout,window:null,global:null};core.window=core;core.global=core;core.currentChar={initiativeTracker:{round:1,activeIndex:0,combatants:[]}};core.currentCharacter=core.currentChar;core.DNDCombat={attack:()=>({ok:true,hit:true,extraAttacks:2}),};core.DNDClassFeatures={};core.autoSaveCurrentCharacter=()=>{};core.renderInitiativeTracker=()=>{};core.dndNetwork={state:{role:'single'}};vm.runInNewContext(fs.readFileSync('gameplay_core_v57.js','utf8'),core);const actor={id:'f',hp:20,maxHp:20,classes:[{name:'Воин',level:5}],turnResources:{action:true,bonusAction:true,reaction:true,movement:30,movementUsed:0}};core.currentChar.initiativeTracker.combatants=[actor];let ar=core.DNDGameplayV57.executeAttack(actor,{id:'t',hp:20,maxHp:20},{damage:'1d6'});assert.strictEqual(ar.attackCount,2);assert.strictEqual(ar.hitCount,2);
let h4={classes:[{name:'Монах',level:5,subclass:'Путь открытой длани'}],stats:{wis:16},resources:{ki:{max:5,current:5}},classFeaturesState:{}};let oh=F.useFeature(h4,'openHandTechnique',{target:{id:'t'},effect:'push'});assert(oh.ok&&oh.prepared);assert.strictEqual(h4.classFeaturesState.pendingOnHit.openHand.effect,'push');
console.log('V70.25 registry + passive/class-feature audit tests: PASS');
