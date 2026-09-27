'use strict';
const assert=require('assert'),fs=require('fs'),vm=require('vm');
let elements={};
function el(tag){return {tagName:tag,style:{},children:[],parentNode:null,textContent:'',appendChild(ch){ch.parentNode=this;this.children.push(ch);if(ch.id)elements[ch.id]=ch;},removeChild(ch){this.children=this.children.filter(x=>x!==ch);if(ch.id)delete elements[ch.id];},setAttribute(){},onclick:null,type:''};}
const body=el('body');
const ctx={console,Math,Date,JSON,isFinite,Number,String,Array,Object,parseInt,parseFloat,setTimeout:(fn)=>{fn();return 1;},clearTimeout,document:{body,createElement:el,getElementById:id=>elements[id]||null},window:null,global:null};
ctx.window=ctx;ctx.global=ctx;
ctx.dndNetwork={playerAction:(type,payload)=>{ctx.sent={type,payload};return true;}};
ctx.autoSaveCurrentCharacter=()=>{};ctx.renderInitiativeTracker=()=>{};ctx.dndRenderCombatV3=()=>{};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync('./network_gameplay.js','utf8'),ctx,{filename:'network_gameplay.js'});
ctx.dndNetworkGameplayRender=()=>{};
ctx.dndNetworkGameplayReactionRequest({reactionId:'rx1',targetName:'Герой',amount:0,source:'spell',spellName:'Fireball',options:[{id:'counterspell',name:'Контрзаклинание',reason:'Прервать заклинание'}]},'wire-1');
const root=elements.dndReactionWindow;assert(root,'reaction window should be rendered');
const card=root.children[0];const list=card.children[2];const reactionButton=list.children[0];assert(reactionButton&&typeof reactionButton.onclick==='function');reactionButton.onclick();assert.strictEqual(String(ctx.sent.type),'REACTION_RESPONSE');assert.strictEqual(String(ctx.sent.payload.reactionId),'rx1');assert.strictEqual(String(ctx.sent.payload.choice),'counterspell');assert(!elements.dndReactionWindow,'reaction window should close after one answer');
// Duplicate click cannot submit twice because window is removed and answer is guarded.
reactionButton.onclick();assert.strictEqual(ctx.sent.payload.choice,'counterspell');
// Network engine must forward native reaction requests to the same UI callback.
const ne=fs.readFileSync('./network_engine.js','utf8');assert(ne.includes("msg.type==='REACTION_REQUEST'"),'native transport must forward REACTION_REQUEST');
console.log('PASS V70.24 reaction window UI + native transport');
