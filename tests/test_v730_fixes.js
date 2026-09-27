'use strict';
const fs=require('fs'),vm=require('vm'),assert=require('assert');
function load(file,ctx){vm.runInNewContext(fs.readFileSync(file,'utf8'),ctx,{filename:file});}
const ctx={console,Math,Date,JSON,isFinite,Number,String,Array,Object,parseInt,parseFloat,setTimeout,clearTimeout,window:null,global:null,addEventListener:()=>{},document:{getElementById:()=>null,createElement:()=>({})}};ctx.window=ctx;ctx.global=ctx;
ctx.DNDRules={profBonus:()=>3,rollD20:()=>({result:15,critical:false,fumble:false}),getSaveBonus:()=>2};
load('class_features_engine.js',ctx); const F=ctx.DNDClassFeatures;
let barb={classes:[{name:'Варвар',level:20}],stats:{str:20,con:18},hp:0,resources:{},classFeaturesState:{raging:true},turnResources:{reaction:true}};
F.syncClassResources(barb); assert.strictEqual(barb.resources.rages.max,6,'level 20 barbarian has 6 rages, not unlimited');
ctx.DNDCombat={savingThrow:()=>({success:true})}; let rr=F.useFeature(barb,'relentlessRage',{amount:20}); assert(rr.ok===true); assert.strictEqual(barb.classFeaturesState.relentlessRageUses.used,1);
F.restore(barb,'short'); assert.strictEqual(barb.classFeaturesState.relentlessRageUses.used,0,'Relentless Rage DC resets after rest');
const D={classes:[],registerClass(p){this.classes.push(p)},getClass(n){return this.classes.find(x=>x.name===n)},listClasses(){return this.classes},getFeature(id){for(const p of this.classes){const f=(p.features||[]).find(x=>x.id===id);if(f)return Object.assign({className:p.name},f)}},invoke(name,h,id,ctx){const p=this.getClass(name);return p.hooks.useFeature(h,id,ctx)}};
ctx.DNDContent=D; load('expansion_classes_pack.js',ctx);
let sb={classes:[{name:'Spellblade',level:5}],resources:{},classFeaturesState:{}};
let s=ctx.DNDContent.invoke('Spellblade',sb,'spellstrike',{});assert.strictEqual(s.ok,true);assert.strictEqual(sb.resources.spellstrikeCharges,undefined,'No fake 999 spellstrike resource remains');
let unknown=ctx.DNDContent.invoke('Spellblade',sb,'bladeDance',{});assert.strictEqual(unknown.ok,false);assert.strictEqual(unknown.unsupported,true,'Unimplemented external ability must not report success');
console.log('V70.25.30 resource/stub regression: PASS');
