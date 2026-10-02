/*
 * Market Social V55.3: завершает систему торговли V55/V55.1/V55.2 социальным торгом.
 * Как работает: берёт CHA, навык Persuasion (Убеждение) и proficiency/expertise из
 * существующего листа персонажа, хранит отношения с каждым торговцем и рассчитывает
 * временный бонус переговоров к покупке/продаже. Торг проходит отдельным d20-челленджем,
 * а затем обычные V55.2 buy/sell/barter используют улучшенную цену. Важные API:
 * DND_MARKET_V55_3, getCharismaModifier(), getPersuasionModifier(), haggle(),
 * relationship(), negotiatedQuote(), resetNegotiation(). Не создаёт новый рынок,
 * инвентарь или кошелёк; Wallpapers.js и Ambiences.js не изменяются.
 */
(function(global){'use strict';
  var base=global.DND_MARKET_V55_2, market=global.DND_MARKET_V55;
  if(!base||!market)return;
  var KEY='dnd_market_v55_3_social_state';
  var selectedTrader=null, lastResult=null;
  var TEMPER={
    general:{dc:11,shift:0.14},smith:{dc:12,shift:0.12},alchemist:{dc:13,shift:0.11},caravan:{dc:11,shift:0.16},
    armorer:{dc:12,shift:0.12},weaponsmith:{dc:12,shift:0.12},fletcher:{dc:11,shift:0.13},leatherworker:{dc:11,shift:0.13},
    weaver:{dc:10,shift:0.12},woodcarver:{dc:10,shift:0.12},carpenter:{dc:11,shift:0.13},jeweler:{dc:14,shift:0.10},
    gemcutter:{dc:14,shift:0.10},potter:{dc:10,shift:0.12},glassblower:{dc:12,shift:0.11},mason:{dc:11,shift:0.12},
    cobbler:{dc:10,shift:0.13},painter:{dc:10,shift:0.13},tinker:{dc:12,shift:0.12},scribe:{dc:12,shift:0.11},
    cartographer:{dc:12,shift:0.11},herbalist:{dc:11,shift:0.13},poisoner:{dc:14,shift:0.09},brewer:{dc:10,shift:0.13},
    cook:{dc:10,shift:0.13},fisher:{dc:10,shift:0.13},shipchandler:{dc:11,shift:0.13},miner:{dc:12,shift:0.11},
    stonecutter:{dc:11,shift:0.12},luxury:{dc:15,shift:0.08},relic:{dc:15,shift:0.08},arcane:{dc:15,shift:0.08},
    stable:{dc:11,shift:0.13},hunter:{dc:11,shift:0.13},monsterparts:{dc:13,shift:0.10},scrolls:{dc:13,shift:0.10},
    temple:{dc:12,shift:0.10},blackmarket:{dc:16,shift:0.07},caravan_master:{dc:12,shift:0.16},siege:{dc:13,shift:0.10}
  };
  function read(){try{return JSON.parse(global.localStorage&&global.localStorage.getItem(KEY)||'{}')||{};}catch(e){return {};}}
  function write(s){try{if(global.localStorage)global.localStorage.setItem(KEY,JSON.stringify(s));}catch(e){}}
  function state(){var s=read();s.relationships=s.relationships||{};s.negotiations=s.negotiations||{};return s;}
  function save(s){write(s);return s;}
  function hero(){return global.currentCharacter||global.currentChar||null;}
  function num(v,d){var n=Number(v);return isFinite(n)?n:d;}
  function abilityValue(h){var a=h&&(h.stats||h.abilityScores||{});return num(a.cha!==undefined?a.cha:a.charisma,10);}
  function mod(v){return Math.floor((num(v,10)-10)/2);}
  function getCharismaModifier(){return mod(abilityValue(hero()));}
  function getProfBonus(){if(typeof global.getProfBonusNum==='function')return num(global.getProfBonusNum(),2);var h=hero();return num(h&&h.proficiencyBonus,h&&h.profBonus)||2;}
  function getPersuasionModifier(){var h=hero(),m=getCharismaModifier(),skills=h&&(h.skillsData||{}), mult=skills&&skills.persuasion!=null?num(skills.persuasion,0):0;if(!mult&&h&&h.skills&&typeof h.skills.persuasion==='string')mult=h.skills.persuasion==='expert'?2:(h.skills.persuasion==='proficient'?1:0);return {modifier:m+getProfBonus()*mult,cha:m,proficiency:mult,bonus:getProfBonus()*mult};}
  function relationship(traderId){var s=state();if(s.relationships[traderId]==null)s.relationships[traderId]=0;return Math.max(-20,Math.min(100,num(s.relationships[traderId],0)));}
  function temperament(traderId){var t=market.getTrader(traderId),x=TEMPER[t&&t.type]||{dc:12,shift:.12};return x;}
  function negotiation(traderId){var s=state(),n=s.negotiations[traderId]||{};return {buy:num(n.buy,0),sell:num(n.sell,0),last:n.last||null,successes:num(n.successes,0),failures:num(n.failures,0)};}
  function setNegotiation(traderId,n){var s=state();s.negotiations[traderId]=n;save(s);}
  function rollD20(){return Math.floor(Math.random()*20)+1;}
  function haggle(traderId,mode,opts){opts=opts||{};var t=market.getTrader(traderId);if(!t)return {ok:false,error:'Торговец не найден'};mode=mode==='sell'?'sell':'buy';var rel=relationship(traderId),tm=temperament(traderId),p=getPersuasionModifier();var dc=tm.dc+Math.floor(Math.max(0,10-rel)/5);if(opts.difficulty!=null)dc=num(opts.difficulty,dc);var roll=opts.roll!=null?num(opts.roll,10):rollD20(),total=roll+p.modifier,success=total>=dc,s=state(),n=negotiation(traderId);n.last=Date.now();if(success){var bonus=tm.shift+Math.min(.06,Math.max(0,rel)/1000);n[mode]=Math.min(.20,num(n[mode],0)+bonus);n.successes++;s.relationships[traderId]=Math.min(100,rel+1);}else{n[mode]=Math.max(-.08,num(n[mode],0)-tm.shift/2);n.failures++;s.relationships[traderId]=Math.max(-20,rel-1);}s.negotiations[traderId]=n;save(s);lastResult={ok:true,traderId:traderId,mode:mode,roll:roll,modifier:p.modifier,total:total,dc:dc,success:success,relationship:s.relationships[traderId],priceModifier:n[mode]};return lastResult;}
  function priceParts(cp){cp=Math.max(0,Math.floor(Number(cp)||0));var gp=Math.floor(cp/100);cp%=100;var sp=Math.floor(cp/10);return {gp:gp,sp:sp,cp:cp%10};}
  function negotiatedQuote(traderId,item,mode){var t=market.getTrader(traderId);if(!t)return {ok:false,error:'Торговец не найден'};if(!item||typeof item!=='object'||Array.isArray(item))return {ok:false,error:'Предмет для расчёта цены не найден'};var q=market.quote(traderId,item,mode);if(!q||q.ok!==true||!Number.isSafeInteger(Number(q.cp))||Number(q.cp)<0)return {ok:false,error:q&&q.error||'Не удалось рассчитать базовую цену'};var n=negotiation(traderId),m=mode==='sell'?n.sell:n.buy,raw=Number(q.cp)*(1-m);if(!Number.isFinite(raw)||raw<0||raw>Number.MAX_SAFE_INTEGER)return {ok:false,error:'Некорректная согласованная цена'};var cp=Math.max(1,Math.round(raw));if(!Number.isSafeInteger(cp))return {ok:false,error:'Некорректная согласованная цена'};return Object.assign({},q,{ok:true,baseCp:q.cp,cp:cp,gp:cp/100,display:priceParts(cp),negotiationModifier:m,negotiated:true});}
  function resetNegotiation(traderId){var s=state();delete s.negotiations[traderId];save(s);return {ok:true};}
  function buy(traderId,itemId,count){var t=market.getTrader(traderId),it=t&&t.stock&&t.stock.find(function(x){return x.id===itemId;});if(!it)return {ok:false,error:'Товар не найден'};var n=Number(count==null?1:count);if(!Number.isSafeInteger(n)||n<1)return {ok:false,error:'Количество покупки должно быть целым положительным числом'};var q=negotiatedQuote(traderId,it,'buy');var total=q.cp*n;if(!Number.isSafeInteger(total)||total<0)return {ok:false,error:'Некорректная согласованная сумма покупки'};var h=hero();if(!h)return {ok:false,error:'Персонаж не загружен'};if(market.balanceCp()<total)return {ok:false,error:'Недостаточно монет',required:q.display};var r=base.buy(traderId,itemId,n,{unitPriceCp:q.cp});if(!r.ok)return r;return Object.assign({},r,{negotiated:true,negotiatedPrice:q});}
  function sell(traderId,category,index,count){if(!market.getTrader(traderId))return {ok:false,error:'Торговец не найден'};var h=hero(),item=h&&h.inventory&&h.inventory[category]&&h.inventory[category][index];if(!item)return {ok:false,error:'Предмет не найден'};var n=Number(count==null?1:count);if(!Number.isSafeInteger(n)||n<1)return {ok:false,error:'Количество продажи должно быть целым положительным числом'};var q=negotiatedQuote(traderId,item,'sell');if(!q||q.ok!==true||!Number.isSafeInteger(Number(q.cp))||Number(q.cp)<0)return {ok:false,error:q&&q.error||'Не удалось рассчитать согласованную цену продажи'};var total=Number(q.cp)*n;if(!Number.isSafeInteger(total)||total<0)return {ok:false,error:'Некорректная согласованная сумма продажи'};var r=base.sell(traderId,category,index,n,{unitPriceCp:q.cp});if(!r.ok)return r;return Object.assign({},r,{negotiated:true,negotiatedPrice:q});}
  function canBarter(traderId,itemId,count,offers){var want=market.getTrader(traderId),it=want&&want.stock&&want.stock.find(function(x){return x.id===itemId;});if(!it)return {ok:false,error:'Товар торговца не найден'};var n=Math.max(1,Math.floor(num(count,1))),wanted=negotiatedQuote(traderId,it,'buy').cp*n,offer=0;offers=(offers||[]);offers.forEach(function(o){var x=hero()&&hero().inventory&&hero().inventory[o.category]&&hero().inventory[o.category][o.index];if(!x||!base.canTraderBuy(traderId,x).ok)return;offer+=base.calculateItemValue(x,{unit:true}).cp*Math.max(1,Math.floor(num(o.count,1)));});return {ok:offer>=wanted&&offer<=Math.round(wanted*1.10),offeredCp:offer,wantedCp:wanted,negotiationModifier:negotiation(traderId).buy};}
  function renderPanel(traderId){var root=document.getElementById('marketSocialV55_3');if(!root)return;var t=market.getTrader(traderId),rel=relationship(traderId),p=getPersuasionModifier(),n=negotiation(traderId),tm=temperament(traderId);root.innerHTML='<div style="padding:10px;background:#171717;border:1px solid #806b3c;border-radius:9px"><div style="display:flex;gap:8px;align-items:center"><b style="color:#e8bd64">🤝 Торг и отношения</b><span style="margin-left:auto">Харизма '+(p.cha>=0?'+':'')+p.cha+' · Убеждение '+(p.modifier>=0?'+':'')+p.modifier+'</span></div><div style="margin-top:7px">'+t.name+' · отношение: <b>'+rel+'/100</b></div><div style="font-size:.78em;color:#aaa;margin-top:5px">Базовая DC торга: '+tm.dc+' · улучшение покупки: '+Math.round(n.buy*100)+'% · скупки: '+Math.round(n.sell*100)+'%</div><div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:8px"><button class="btn-action" id="m553Buy">🛒 Торг за покупку</button><button class="btn-action" id="m553Sell">💰 Торг за продажу</button><button class="btn-action" id="m553Reset">↺ Сбросить условия</button></div><div id="m553Result" style="margin-top:7px;color:#bbb">'+(lastResult&&lastResult.traderId===traderId?('Последний бросок: d20 '+lastResult.roll+' + '+lastResult.modifier+' = '+lastResult.total+' против DC '+lastResult.dc+' — '+(lastResult.success?'успех':'провал')):'Выберите сторону сделки и бросьте на Убеждение.')+'</div></div>';document.getElementById('m553Buy').onclick=function(){var r=haggle(traderId,'buy');renderPanel(traderId);};document.getElementById('m553Sell').onclick=function(){var r=haggle(traderId,'sell');renderPanel(traderId);};document.getElementById('m553Reset').onclick=function(){resetNegotiation(traderId);renderPanel(traderId);};}
  var baseOpenTrade=base.openTrade;
  function openTrade(traderId){selectedTrader=traderId||selectedTrader||Object.keys(market.TRADERS)[0];if(typeof baseOpenTrade==='function')baseOpenTrade(selectedTrader);setTimeout(function(){var old=document.getElementById('marketSocialV55_3');if(old)old.remove();var host=document.getElementById('marketTradeV55_2');if(!host)return;var d=document.createElement('div');d.id='marketSocialV55_3';d.style.cssText='margin:8px 0';host.querySelector('#m552_content')&&host.querySelector('#m552_content').insertBefore(d,host.querySelector('#m552_content').firstChild);renderPanel(selectedTrader);},30);}
  var api={version:'55.3',getCharismaModifier:getCharismaModifier,getPersuasionModifier:getPersuasionModifier,relationship:relationship,haggle:haggle,negotiatedQuote:negotiatedQuote,resetNegotiation:resetNegotiation,buy:buy,sell:sell,canBarter:canBarter,openTrade:openTrade,temperament:TEMPER};
  global.DND_MARKET_V55_3=api;global.DndMarketV55_3=api;
  base.openTrade=openTrade;
  if(global.DND_MARKET_V55)global.DND_MARKET_V55.openTrade=openTrade;
})(window);
