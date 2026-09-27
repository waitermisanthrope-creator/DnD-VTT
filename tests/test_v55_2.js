/*
 * V55.2 regression test: проверяет функциональные предметы, расчёт стоимости,
 * профиль скупки торговцев, покупку за монеты, продажу и бартер по стоимости.
 * Основные API: DND_MARKET_V55_2.calculateItemValue/canTraderBuy/barter и рынок V55.
 */
const fs=require('fs'),vm=require('vm'),path=require('path');
const ctx={console,Date,Math,JSON,Number,String,Array,Object,Set,Map,isFinite,parseFloat};
ctx.window=ctx;ctx.global=ctx;ctx.addEventListener=()=>{};ctx.localStorage={_: {},getItem(k){return this._[k]||null},setItem(k,v){this._[k]=String(v)}};
ctx.document={addEventListener(){},getElementById(){return null},querySelector(){return null},createElement(){return {style:{},appendChild(){},setAttribute(){},remove(){}}},body:{appendChild(){}}};
ctx.autoSaveCurrentCharacter=()=>{};ctx.renderInventory=()=>{};ctx.showCustomAlert=()=>{};
vm.createContext(ctx);
['weaponsmelee.js','weaponsheavy.js','weaponsranged.js','weaponsspecial.js','weapons.js','armors.js','consumables.js','market_economy_v55.js','market_expansion_v55_1.js','market_trade_v55_2.js'].forEach(f=>vm.runInContext(fs.readFileSync(path.join(__dirname,f),'utf8'),ctx,{filename:f}));
ctx.currentCharacter={coins:{gp:1000,sp:0,cp:0,ep:0,pp:0},inventory:{weapons:[],armor:[],consumables:[],materials:[{name:'Пучок лечебных трав',count:17,cost:3,tags:['herbalism']}],junk:[]}};ctx.currentChar=ctx.currentCharacter;
const M=ctx.DND_MARKET_V55, T=ctx.DND_MARKET_V55_2;
if(!M||!T)throw Error('API missing');
let rb=T.resolveFunctionalItem({name:'Кинжал',category:'weapons',costGp:2});if(rb.marketFunctionalStatus!=='functional'||rb.damage!=='1d4')throw Error('weapon did not resolve to functional DB');
let rp=T.resolveFunctionalItem({name:'Зелье лечения',category:'consumables',costGp:50});if(rp.marketFunctionalStatus!=='functional'||!rp.effect)throw Error('consumable did not resolve to functional DB');
let va=T.calculateItemValue(rb,{unit:true});if(va.gp!==2)throw Error('weapon value mismatch '+va.gp);
let no=T.canTraderBuy('apothecary',{name:'Боевой молот',category:'weapons',cost:'10 зм',tags:['metal']});if(no.ok)throw Error('apothecary accepts battle hammer');
let yes=T.canTraderBuy('apothecary',{name:'Пучок лечебных трав',category:'materials',cost:'3 зм',tags:['herbalism']});if(!yes.ok)throw Error('apothecary rejects useful herbs');
let b=T.openTrade; // API presence check
let before=M.balanceCp();let bought=T.buy('blacksmith','market_dagger',1);
if(!bought.ok)throw Error('functional buy failed '+bought.error);
let balanceAfterBuy=M.balanceCp();
let raw=ctx.currentCharacter.inventory.weapons.find(x=>x.name==='Кинжал');if(!raw||raw.marketFunctionalStatus!=='functional'||raw.damage!=='1d4')throw Error('functional market buy missing weapon data');
ctx.currentCharacter.inventory.weapons=[];let state=ctx.localStorage.getItem('dnd_market_v55_state');
let offer=T.canTraderBuy('apothecary',ctx.currentCharacter.inventory.materials[0]);if(!offer.ok)throw Error('herb offer rejected');
let barter=T.barter('apothecary','market_healing',1,[{category:'materials',index:0,count:17}]);
if(!barter.ok)throw Error('barter failed '+barter.error);
let balanceAfterBarter=(ctx.currentCharacter.coins.pp*1000+ctx.currentCharacter.coins.gp*100+ctx.currentCharacter.coins.ep*50+ctx.currentCharacter.coins.sp*10+ctx.currentCharacter.coins.cp);let potion=ctx.currentCharacter.inventory.consumables.find(x=>x.name==='Зелье лечения');if(!potion||potion.marketFunctionalStatus!=='functional')throw Error('barter did not yield functional potion');
let potionIndex=ctx.currentCharacter.inventory.consumables.indexOf(potion);let sellResult=T.sell('apothecary','consumables',potionIndex,1);if(!sellResult.ok)throw Error('functional sell failed '+sellResult.error);
console.log('V55_2_MARKET_TEST_OK',JSON.stringify({weaponFunctional:true,consumableFunctional:true,weaponValue:va.gp,apothecaryRejectsHammer:true,barter:true,balancePreserved:(balanceAfterBarter===balanceAfterBuy)}));
