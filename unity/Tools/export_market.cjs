'use strict';
const fs=require('fs'),vm=require('vm'),path=require('path'),crypto=require('crypto');
const root=path.resolve(__dirname,'../..');
const files=['app/market_economy_v55.js','app/market_expansion_v55_1.js','app/market_trade_v55_2.js'];
const c={document:{addEventListener(){},getElementById(){return null}},addEventListener(){},setTimeout(){},localStorage:{getItem(){return null},setItem(){}},console};c.window=c;vm.createContext(c);
for(const file of files)vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),c,{filename:file,timeout:5000});
const market=c.DND_MARKET_V55,trade=c.DND_MARKET_V55_2;
const cases=[];
for(const region of Object.keys(market.REGION_MOD))for(const id of Object.keys(market.TRADERS))for(const mode of ['buy','sell']){
 const item=market.TRADERS[id].stock[0];cases.push({region,trader:id,mode,item,cp:market.quote(id,item,mode,region).cp});
}
const result={schema:1,traders:market.TRADERS,regions:market.REGION_MOD,accept:trade.ACCEPT,aliases:{'Противоядие':'Противоядие (Антидот)','Антитоксин':'Противоядие (Антидот)'},sources:files.map(file=>({file,sha256:crypto.createHash('sha256').update(fs.readFileSync(path.join(root,file),'utf8').replace(/\r\n/g,'\n')).digest('hex')}))};
const dest=path.join(root,'unity/Assets/Vtt/Resources/CharacterSheet/market.json');fs.writeFileSync(dest,JSON.stringify(result,null,2)+'\n');
const out=path.join(root,'unity/ContentSources~/workshop-commerce/market-contracts.json');fs.writeFileSync(out,JSON.stringify({cases},null,2)+'\n');
console.log('MARKET_EXPORT',Object.keys(result.traders).length,'traders',Object.values(result.traders).reduce((s,t)=>s+t.stock.length,0),'stock rows',cases.length,'golden quotes');
