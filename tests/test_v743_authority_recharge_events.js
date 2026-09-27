#!/usr/bin/env node
const fs=require('fs'),vm=require('vm'),assert=require('assert');
const root=__dirname;
function browserCtx(){
 const doc={readyState:'complete',_: {},getElementById(id){return this._[id]||null},querySelector(){return null},querySelectorAll(){return[]},createElement(){return {style:{},appendChild(){},addEventListener(){},click(){}}},addEventListener(){},body:{appendChild(){}}};
 const ctx={console,document:doc,window:null,globalThis:null,setTimeout,clearTimeout,Date,Math,JSON,localStorage:{getItem(){return null},setItem(){},removeItem(){}},confirm(){return false},prompt(){return null},alert(){},navigator:{},location:{}};
 ctx.window=ctx;ctx.globalThis=ctx;ctx.addEventListener=function(){};vm.createContext(ctx);return ctx;
}
// Static guardrails: the authoritative feature path must not trust stale classFeatureIds.
const ng=fs.readFileSync(root+'/network_gameplay.js','utf8');
assert(ng.includes("global.DNDClassFeatures||typeof global.DNDClassFeatures.useFeature!=='function"),'network feature engine guard missing');
assert(!ng.includes("profile.classFeatureIds.indexOf(id)<0"),'stale classFeatureIds gate still authoritative');
const ne=fs.readFileSync(root+'/network_engine.js','utf8');
assert(ne.includes('var seenEventIds={}'),'event dedupe state missing');
assert(ne.includes('if(ev.id&&seenEventIds[ev.id])return false'),'event id dedupe missing');
assert(ne.includes('if(seq&&seq<=state.eventSeq)return false'),'stale event sequence guard missing');
assert(ne.includes('dndNetworkGameplayPeerDisconnect'),'disconnect reaction hook missing');
// Runtime feature prerequisite test.
{
 const c=browserCtx();
 c.DNDFeats={has(){return false}};
 c.DNDContent={};
 vm.runInContext(fs.readFileSync(root+'/class_features_engine.js','utf8'),c,{filename:'class_features_engine.js'});
 let r=c.DNDClassFeatures.useFeature({classes:[{name:'Плут',level:1}],stats:{}},'actionSurge',{});
 assert.strictEqual(r.ok,false,'fighter-only feature accepted by rogue');
 r=c.DNDClassFeatures.useFeature({classes:[{name:'Воин',level:2}],stats:{}},'actionSurge',{});
 assert.notStrictEqual(r.ok,false,'fighter level prerequisite rejected');
}
console.log('PASS V70.25.43 authority/recharge/event guards');
