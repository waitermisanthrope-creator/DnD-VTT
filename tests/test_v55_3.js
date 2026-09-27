/*
 * V55.3 regression test: проверяет социальный торг через CHA + Убеждение,
 * отношения с торговцем, улучшение цены и сохранение совместимости с V55.2.
 * Важные API: DND_MARKET_V55_3.haggle(), negotiatedQuote(), getPersuasionModifier().
 */
const fs=require('fs'),vm=require('vm'),path=require('path');
const ctx={console,Date,Math,JSON,Number,String,Array,Object,Set,Map,isFinite,parseFloat};ctx.window=ctx;ctx.global=ctx;ctx.addEventListener=()=>{};ctx.localStorage={_: {},getItem(k){return this._[k]||null},setItem(k,v){this._[k]=String(v)}};ctx.document={addEventListener(){},getElementById(){return null},querySelector(){return null},createElement(){return {style:{},appendChild(){},setAttribute(){},remove(){}}},body:{appendChild(){}}};ctx.autoSaveCurrentCharacter=()=>{};ctx.renderInventory=()=>{};ctx.showCustomAlert=()=>{};
vm.createContext(ctx);
['weaponsmelee.js','weaponsheavy.js','weaponsranged.js','weaponsspecial.js','weapons.js','armors.js','consumables.js','market_economy_v55.js','market_expansion_v55_1.js','market_trade_v55_2.js','market_social_v55_3.js'].forEach(f=>vm.runInContext(fs.readFileSync(path.join(__dirname,f),'utf8'),ctx,{filename:f}));
ctx.currentCharacter={coins:{gp:1000,sp:0,cp:0,ep:0,pp:0},stats:{cha:18},skillsData:{persuasion:1},inventory:{weapons:[],armor:[],consumables:[],materials:[],junk:[]}};ctx.currentChar=ctx.currentCharacter;
const M=ctx.DND_MARKET_V55_3;if(!M)throw Error('V55.3 API missing');
if(M.getCharismaModifier()!==4)throw Error('CHA modifier failed');
if(M.getPersuasionModifier().modifier!==6)throw Error('Persuasion modifier failed');
let before=M.relationship('blacksmith');let r=M.haggle('blacksmith','buy',{roll:20});if(!r.success||r.priceModifier<=0)throw Error('forced successful haggle failed');
let q=M.negotiatedQuote('blacksmith',{name:'Кинжал',costGp:2,tags:['metal']},'buy');if(q.cp>=ctx.DND_MARKET_V55.quote('blacksmith',{name:'Кинжал',costGp:2,tags:['metal']},'buy').cp)throw Error('buy price did not improve');
let after=M.relationship('blacksmith');if(after<=before)throw Error('relationship did not improve');
ctx.currentCharacter.stats.cha=8;ctx.currentCharacter.skillsData.persuasion=0;let fail=M.haggle('blacksmith','sell',{roll:1});if(fail.success)throw Error('forced failed haggle succeeded');
if(M.relationship('blacksmith')>=after)throw Error('failure did not reduce relationship');
console.log('V55_3_MARKET_SOCIAL_TEST_OK',JSON.stringify({cha:4,persuasion:6,success:true,priceImproved:true,relationshipChanged:true,failure:true}));
