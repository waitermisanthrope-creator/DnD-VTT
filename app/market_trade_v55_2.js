/*
 * Market Trade V55.2: расширяет единый рынок V55/V55.1 торговым окном в стиле
 * TES/Fallout: покупка за монеты, продажа за монеты и бартер товарами по стоимости.
 * Как работает: связывает товар магазина с существующими базами оружия, брони и
 * расходников, рассчитывает реальную стоимость предмета, фильтрует скупку по
 * потребностям торговца и проводит атомарные сделки. Важные API: DND_MARKET_V55_2,
 * calculateItemValue(), canTraderBuy(), barter(), resolveFunctionalItem(), openTrade().
 * Не создаёт отдельный инвентарь/кошелёк/рынок; Wallpapers.js и Ambiences.js не изменяются.
 */
(function(global){'use strict';
  var market=global.DND_MARKET_V55;
  if(!market) return;
  var TRADE_KEY='dnd_market_v55_2_trade_state';
  var ACCEPT={
    general:{categories:['consumables','materials','junk','weapons','armor'],tags:['food','rope','common','textile','leather','metal','wood','glass','stone','paper','repair']},
    smith:{categories:['weapons','armor','materials'],tags:['metal','smith','repair','bone','scale']},
    alchemist:{categories:['consumables','materials'],tags:['alchemical','reagent','herbalism','herb','poison','toxin','glass','arcane']},
    caravan:{categories:['consumables','materials','junk','weapons','armor'],tags:['common','food','rope','textile','leather','metal','wood','glass','stone','paper','repair','alchemical']},
    armorer:{categories:['armor','materials'],tags:['metal','leather','armor','repair','scale']},
    weaponsmith:{categories:['weapons','materials'],tags:['metal','wood','repair','bone']},
    fletcher:{categories:['weapons','materials'],tags:['wood','fiber','metal','rope']},
    leatherworker:{categories:['armor','materials','junk'],tags:['leather','hide','fiber','textile','repair']},
    weaver:{categories:['armor','materials','junk'],tags:['textile','fiber','cloth','leather']},
    woodcarver:{categories:['weapons','materials','junk'],tags:['wood','fiber','bone']},
    carpenter:{categories:['materials','junk','armor'],tags:['wood','stone','metal']},
    jeweler:{categories:['materials','armor','junk'],tags:['gem','relic','metal','arcane']},
    gemcutter:{categories:['materials','junk'],tags:['gem','stone','crystal','relic']},
    potter:{categories:['materials','junk'],tags:['ceramic','stone','clay','glass']},
    glassblower:{categories:['materials','junk'],tags:['glass','crystal','arcane']},
    mason:{categories:['materials','junk','armor'],tags:['stone','metal','relic']},
    cobbler:{categories:['armor','materials','junk'],tags:['leather','textile','fiber']},
    painter:{categories:['materials','junk'],tags:['pigment','paper','textile','relic']},
    tinker:{categories:['weapons','armor','materials','junk'],tags:['metal','mechanism','repair','glass','arcane']},
    scribe:{categories:['consumables','materials','junk'],tags:['paper','arcane','relic','ink']},
    cartographer:{categories:['materials','junk'],tags:['paper','ink','relic']},
    herbalist:{categories:['consumables','materials'],tags:['herbalism','herb','food','alchemical']},
    poisoner:{categories:['consumables','materials'],tags:['alchemical','poison','toxin','reagent','herbalism']},
    brewer:{categories:['consumables','materials'],tags:['food','reagent','herbalism']},
    cook:{categories:['consumables','materials'],tags:['food','herbalism']},
    fisher:{categories:['consumables','materials','junk'],tags:['food','rope','metal']},
    shipchandler:{categories:['materials','junk','armor'],tags:['rope','textile','wood','metal','leather','repair']},
    miner:{categories:['materials'],tags:['metal','stone','gem','relic']},
    stonecutter:{categories:['materials','junk'],tags:['stone','relic','gem']},
    luxury:{categories:['armor','materials','junk','consumables'],tags:['relic','gem','metal','glass','textile','food']},
    relic:{categories:['materials','junk','consumables'],tags:['relic','arcane','gem','paper','alchemical']},
    arcane:{categories:['materials','consumables','junk'],tags:['arcane','alchemical','relic','gem','crystal']},
    stable:{categories:['armor','materials','junk'],tags:['leather','wood','metal','textile','food']},
    hunter:{categories:['weapons','materials','consumables','junk'],tags:['leather','hide','bone','food','wood','fiber']},
    monsterparts:{categories:['materials','consumables','junk'],tags:['relic','bone','hide','leather','scale','fiber','alchemical','arcane']},
    scrolls:{categories:['consumables','materials','junk'],tags:['arcane','paper','relic','ink']},
    temple:{categories:['consumables','materials','junk'],tags:['alchemical','herbalism','paper','relic','metal']},
    blackmarket:{categories:['weapons','armor','consumables','materials','junk'],tags:['metal','leather','alchemical','poison','toxin','relic','arcane','mechanism']},
    caravan_master:{categories:['consumables','materials','junk','weapons','armor'],tags:['common','food','rope','wood','metal','textile','paper','leather','repair']},
    siege:{categories:['weapons','armor','materials','junk'],tags:['metal','wood','stone','rope','repair','alchemical']}
  };
  var NAME_ALIASES={
    'Противоядие':'Противоядие (Антидот)','Антитоксин':'Противоядие (Антидот)','Алхимический огонь (фляга)':'Алхимический огонь (фляга)','Фляга с кислотой':'Фляга с кислотой'
  };
  function inv(){var c=global.currentCharacter||global.currentChar;if(!c)return null;c.inventory=c.inventory||{weapons:[],armor:[],consumables:[],materials:[],junk:[]};return c.inventory;}
  function norm(v){return String(v||'').toLowerCase().replace(/[^a-zа-яё0-9]+/gi,'').trim();}
  function databases(){return [
    {key:'weapon',arr:global.defaultWeapons||global.WEAPONS_DB||[],cat:'weapons'},
    {key:'armor',arr:global.defaultArmors||global.ARMORS_DB||[],cat:'armor'},
    {key:'consumable',arr:global.defaultConsumables||[],cat:'consumables'}
  ];}
  function resolveFunctionalItem(item){
    if(!item)return null;
    var wanted=String(item.name||''); var alias=NAME_ALIASES[wanted]||wanted; var n=norm(alias), found=null, kind=null, cat=item.category||'materials';
    databases().some(function(db){return (db.arr||[]).some(function(x){if(!x||!x.name)return false;if(norm(x.name)===n){found=x;kind=db.key;cat=db.cat;return true;}return false;});});
    if(!found){ databases().some(function(db){return (db.arr||[]).some(function(x){if(!x||!x.name)return false;var xn=norm(x.name);if(xn.indexOf(n)>=0||n.indexOf(xn)>=0){found=x;kind=db.key;cat=db.cat;return true;}return false;});}); }
    var out=found?Object.assign({},found):Object.assign({},item);
    out.name=out.name||wanted; out.count=Number(item.count)||1; out.marketSource=item.marketSource||null; out.marketPriceGp=item.marketPriceGp!=null?Number(item.marketPriceGp):item.costGp!=null?Number(item.costGp):undefined;
    out.marketFunctionalKind=kind||'generic'; out.marketFunctionalStatus=found?'functional':'data_only'; out.inventoryCategory=cat;
    if(!found && item.category==='gear') out.inventoryCategory='junk';
    return out;
  }
  function parseCost(v){if(typeof v==='number')return v;var m=String(v||'').replace(',','.').match(/([0-9]+(?:\.[0-9]+)?)\s*зм/i);return m?Number(m[1]):0;}
  function calculateItemValue(item,options){
    options=options||{};var x=resolveFunctionalItem(item)||item, base=0, source='none';
    if(x.baseCraftValue!=null){base=Number(x.baseCraftValue)||0;source='craft-base';}
    if(!base&&global.DND_CRAFT_ECONOMY_V49&&typeof global.DND_CRAFT_ECONOMY_V49.itemValue==='function'){var v=Number(global.DND_CRAFT_ECONOMY_V49.itemValue(x));if(isFinite(v)&&v>0){base=v;source='craft-economy-v49';}}
    if(!base) {base=parseCost(x.cost);if(base){source='item-cost';}}
    if(!base&&x.costGp!=null){base=Number(x.costGp)||0;source='market-catalog';}
    if(!base&&x.marketPriceGp!=null){base=Number(x.marketPriceGp)||0;source='market-price';}
    if(!base&&x.materialId&&global.MATERIALS){var m=global.MATERIALS.find(function(z){return z&&z.id===x.materialId;});if(m){base=Number(m.price)||0;source='material';}}
    var rarity={common:1,uncommon:1.25,rare:1.75,very_rare:2.5,legendary:4}[x.rarity]||1;
    var quality=Number(x.qualityMultiplier)||1; var durability=1;
    if(x.currentDurability!=null&&x.maxDurability)durability=Math.max(.15,Math.min(1,Number(x.currentDurability)/Number(x.maxDurability)));
    var unit=Math.max(0,Math.round(base*rarity*quality*(.25+.75*durability)*100)/100);
    var count=options.unit?1:(Number(item&&item.count)||1);
    return {gp:unit,cp:Math.round(unit*100),unitGp:unit,totalGp:Math.round(unit*count*100)/100,count:count,source:source,functionalStatus:x.marketFunctionalStatus||'data_only',kind:x.marketFunctionalKind||'generic',qualityMultiplier:quality,durabilityMultiplier:durability};
  }
  function itemTags(item){var tags=[];(item&&item.tags||[]).concat(item&&item.craftTags||[],item&&item.roles||[]).forEach(function(t){if(t!=null)tags.push(String(t).toLowerCase());});var text=String(item&&item.name||'').toLowerCase();[['metal',['оруж','меч','топор','молот','арбалет','щит','брон','кольч','лат','руда','слит']],['wood',['лук','древес','дерев','копь','стрел']],['leather',['кож','шкур','сбру','ножн','сумк']],['alchemical',['зель','элик','алхим','кислот','дым','реагент']],['poison',['яд','токс']],['food',['паёк','мяс','сыр','хлеб','рыб','эль','пиво','медовух','сидр','соль','масло']],['paper',['свиток','пергамент','бумаг','чернил','карта']],['glass',['стекл','флакон','графин','хруст']],['rope',['верёв','канат','леск','сеть']],['textile',['ткан','шёлк','одеж','попон']],['stone',['камень','гранит','мрамор','сланец','кварц','обсидиан']],['gem',['аметист','гранат','опал','руб','сапфир','изумруд','алмаз','драгоцен']],['relic',['реликв','артефакт','рунич','древн','талисман']],['arcane',['аркан','магич','эссенц','кристалл']]].forEach(function(p){if(p[1].some(function(s){return text.indexOf(s)>=0;}))tags.push(p[0]);});return Array.from(new Set(tags));}
  function canTraderBuy(traderId,item){var t=market.TRADERS[traderId];if(!t)return {ok:false,error:'Торговец не найден'};var rule=ACCEPT[t.type]||ACCEPT.general;var cat=resolveFunctionalItem(item).inventoryCategory||item.category||'junk';var tags=itemTags(item);var catOk=rule.categories.indexOf(cat)>=0;var tagOk=tags.some(function(x){return rule.tags.indexOf(x)>=0;});if(t.type==='general'||t.type==='caravan'||t.type==='caravan_master')return {ok:true,reason:'универсальный ассортимент',matched:tags};if(catOk&&tagOk)return {ok:true,reason:'категория и профиль',matched:tags.filter(function(x){return rule.tags.indexOf(x)>=0;})};return {ok:false,error:'Торговец не заинтересован в этом товаре',matched:tags,acceptedTags:rule.tags,acceptedCategories:rule.categories};}
  function sellCheck(traderId,item){var c=canTraderBuy(traderId,item);if(!c.ok)return c;return {ok:true};}
  function addResolved(item){var i=inv(),x=resolveFunctionalItem(item);if(!i||!x||typeof i!=='object'||Array.isArray(i))return null;var cat=x.inventoryCategory||'junk';if(i[cat]!=null&&!Array.isArray(i[cat]))return null;if(!i[cat])i[cat]=[];var same=i[cat].find(function(y){return y&&y.id&&x.id&&y.id===x.id&&!y.craftQuality&&!y.currentDurability;});
    if(same)same.count=(Number(same.count)||0)+(Number(x.count)||1);else i[cat].push(x);if(typeof global.renderInventory==='function')global.renderInventory();if(typeof global.autoSaveCurrentCharacter==='function')global.autoSaveCurrentCharacter();return x;}
  function removeExact(category,index,count){var i=inv();if(!i||!i[category]||!i[category][index])return false;var x=i[category][index],n=Number(count)||1;if(Number(x.count||1)<n)return false;x.count=Number(x.count||1)-n;if(x.count<=0)i[category].splice(index,1);return true;}
  function wrappedBuy(traderId,itemId,count,opts){opts=opts||{};count=Math.max(1,Math.floor(Number(count)||1));var t=market.TRADERS[traderId],base=t&&t.stock&&t.stock.find(function(x){return x.id===itemId;});if(!base)return market.buy(traderId,itemId,count,opts);var result=market.buy(traderId,itemId,count,opts);if(!result.ok)return result;var i=inv(),rawCat=base.category||'materials',list=i[rawCat]||[],removed=false;for(var k=list.length-1;k>=0;k--){if(list[k]&&list[k].marketSource===traderId&&list[k].name===base.name){list.splice(k,1);removed=true;break;}}var added=addResolved(Object.assign({},base,{count:count,marketSource:traderId,marketPriceGp:result.price.gp}));result.functionalItem=added;result.functionalStatus=added.marketFunctionalStatus;result.replacedGeneric=removed;return result;}
  function wrappedSell(traderId,category,index,count,opts){opts=opts||{};var i=inv();var item=i&&i[category]&&i[category][index];if(!item)return {ok:false,error:'Предмет не найден'};var chk=sellCheck(traderId,item);if(!chk.ok)return chk;return market.sell(traderId,category,index,count,opts);}
  function traderItemValue(traderId,itemId){var t=market.TRADERS[traderId],it=t&&t.stock&&t.stock.find(function(x){return x.id===itemId;});if(!it)return null;return calculateItemValue(it,{unit:true});}
  function barter(traderId,itemId,count,offers){
    count=Number(count);
    if(!Number.isInteger(count)||count<1)return {ok:false,error:'Некорректное количество товара'};
    var character=global.currentCharacter||global.currentChar;
    if(!character)return {ok:false,error:'Персонаж не выбран'};
    var inventory=character.inventory;
    if(!inventory||typeof inventory!=='object'||Array.isArray(inventory))return {ok:false,error:'Инвентарь недоступен; обмен отменён'};
    var t=market.TRADERS[traderId],want=t&&t.stock&&t.stock.find(function(x){return x.id===itemId;});
    if(!want)return {ok:false,error:'Товар торговца не найден'};
    offers=Array.isArray(offers)?offers:[];
    if(!offers.length)return {ok:false,error:'Добавьте предметы для обмена'};
    var offered=0,refs=[],seen={};
    for(var oi=0;oi<offers.length;oi++){
      var o=offers[oi];
      if(!o||typeof o.category!=='string'||!Number.isInteger(Number(o.index))||Number(o.index)<0)return {ok:false,error:'Некорректный предмет в предложении; обмен отменён'};
      var index=Number(o.index),key=o.category+'#'+index;
      if(seen[key])return {ok:false,error:'Один предмет указан несколько раз; обмен отменён'};
      seen[key]=true;
      var list=inventory[o.category],item=Array.isArray(list)?list[index]:null;
      if(!item)return {ok:false,error:'Предложенный предмет больше не найден; обмен отменён'};
      var n=Number(o.count==null?1:o.count);
      if(!Number.isInteger(n)||n<1||!Number.isFinite(Number(item.count==null?1:item.count))||Number(item.count==null?1:item.count)<n)return {ok:false,error:'Некорректное количество предложенного предмета'};
      var check=canTraderBuy(traderId,item);
      if(!check.ok)return {ok:false,error:check.error||'Торговец не принимает предложенные товары'};
      var v=calculateItemValue(item,{unit:true});
      if(!v||!Number.isFinite(Number(v.cp))||Number(v.cp)<0)return {ok:false,error:'Не удалось рассчитать стоимость предложения'};
      offered+=Number(v.cp)*n;
      refs.push({category:o.category,index:index,count:n,value:Number(v.cp),item:item});
    }
    var wantValue=calculateItemValue(want,{unit:true});
    if(!wantValue||!Number.isFinite(Number(wantValue.cp))||Number(wantValue.cp)<0)return {ok:false,error:'Не удалось рассчитать стоимость товара торговца'};
    var wanted=Number(wantValue.cp)*count;
    if(!Number.isFinite(offered)||!Number.isFinite(wanted))return {ok:false,error:'Некорректная стоимость обмена'};
    if(offered<wanted)return {ok:false,error:'Недостаточная стоимость обмена',offeredCp:offered,wantedCp:wanted};
    if(offered>wanted*1.10)return {ok:false,error:'Предложение слишком выгодно торговцу: сократите товары до ±10% от стоимости'};
    var received=resolveFunctionalItem(Object.assign({},want,{count:count,marketSource:traderId,marketPriceGp:wantValue.gp}));
    var receiveCategory=received.inventoryCategory||'junk';
    if(inventory[receiveCategory]!=null&&!Array.isArray(inventory[receiveCategory]))return {ok:false,error:'Категория инвентаря для получаемого предмета повреждена; обмен отменён'};
    var state;
    try{state=global.localStorage?JSON.parse(global.localStorage.getItem('dnd_market_v55_state')||'{}'):{};}catch(e){return {ok:false,error:'Не удалось прочитать состояние рынка; обмен отменён'};}
    if(!state||typeof state!=='object'||Array.isArray(state))state={};
    state.traders=state.traders&&typeof state.traders==='object'&&!Array.isArray(state.traders)?state.traders:{};
    var baseStock=(t.stock||[]).map(function(x){return {id:x.id,qty:x.qty};});
    state.traders[traderId]=state.traders[traderId]||{stock:baseStock,lastRestock:Date.now()};
    var slot=Array.isArray(state.traders[traderId].stock)?state.traders[traderId].stock.find(function(s){return s.id===itemId;}):null;
    if(!slot||!Number.isFinite(Number(slot.qty))||Number(slot.qty)<count)return {ok:false,error:'Товар закончился до завершения обмена'};
    var inventorySnapshot=JSON.stringify(inventory),stateSnapshot=JSON.stringify(state);
    refs.sort(function(a,b){return b.index-a.index;});
    try{
      for(var ri=0;ri<refs.length;ri++)if(!removeExact(refs[ri].category,refs[ri].index,refs[ri].count))throw new Error('Не удалось списать предложенный предмет');
      slot.qty-=count;
      var added=addResolved(Object.assign({},want,{count:count,marketSource:traderId,marketPriceGp:wantValue.gp}));
      if(!added)throw new Error('Не удалось добавить полученный предмет');
      if(global.localStorage)global.localStorage.setItem('dnd_market_v55_state',JSON.stringify(state));
      return {ok:true,offeredCp:offered,wantedCp:wanted,overpayCp:offered-wanted,received:added};
    }catch(e){
      try{character.inventory=JSON.parse(inventorySnapshot);}catch(ignore){}
      try{if(global.localStorage)global.localStorage.setItem('dnd_market_v55_state',stateSnapshot);}catch(ignore){}
      return {ok:false,error:'Обмен отменён: '+(e&&e.message||'ошибка операции')};
    }
  }
  function reportItem(item){var v=calculateItemValue(item);return Object.assign({name:item&&item.name||'—'},v);}
  function inventoryEntries(){var i=inv(),out=[];['weapons','armor','consumables','materials','junk'].forEach(function(cat){(i&&i[cat]||[]).forEach(function(item,index){out.push({category:cat,index:index,item:item,value:calculateItemValue(item,{unit:true}),sellable:true});});});return out;}
  function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  var selectedTrader=null, mode='buy', query='', offers=[];
  function money(cp){cp=Math.max(0,Math.round(cp||0));var gp=Math.floor(cp/100);cp%=100;var sp=Math.floor(cp/10);cp%=10;return gp+' зм '+sp+' см '+cp+' мм';}
  function openTrade(traderId){if(typeof document==='undefined')return;selectedTrader=traderId||selectedTrader||Object.keys(market.TRADERS)[0];mode='buy';offers=[];query='';var old=document.getElementById('marketTradeV55_2');if(old)old.remove();var m=document.createElement('div');m.id='marketTradeV55_2';m.style.cssText='position:fixed;inset:0;z-index:100000;background:rgba(0,0,0,.82);display:flex;align-items:center;justify-content:center;padding:10px;box-sizing:border-box;font-family:inherit;';var p=document.createElement('div');p.style.cssText='width:min(980px,100%);max-height:94vh;overflow:auto;background:#181818;border:1px solid #806b3c;border-radius:12px;box-shadow:0 12px 50px rgba(0,0,0,.6);color:#ddd;padding:12px;box-sizing:border-box;';p.innerHTML='<div style="display:flex;gap:8px;align-items:center"><strong style="font-size:1.15em;color:#e8bd64">🏪 Торговля</strong><span id="m552_balance" style="margin-left:auto"></span><button class="btn-action" id="m552_close">✕</button></div><div id="m552_content"></div>';m.appendChild(p);document.body.appendChild(m);document.getElementById('m552_close').onclick=function(){m.remove();};renderUI();}
  function renderUI(){var b=document.getElementById('m552_content');if(!b)return;var t=market.getTrader(selectedTrader), html='<div style="display:flex;gap:6px;margin:10px 0;flex-wrap:wrap">';Object.keys(market.TRADERS).forEach(function(id){var x=market.getTrader(id);html+='<button class="btn-action" data-tr="'+id+'" style="padding:7px 9px;'+(id===selectedTrader?'background:#735d2b;':'')+'">'+esc(x.name)+'</button>';});html+='</div><div style="display:flex;gap:6px;margin-bottom:10px"><button class="btn-action" data-mode="buy">🛒 Купить</button><button class="btn-action" data-mode="sell">💰 Продать</button><button class="btn-action" data-mode="barter">🤝 Обмен</button><input id="m552_search" placeholder="Поиск товара…" value="'+esc(query)+'" style="flex:1;min-width:130px;background:#222;color:#ddd;border:1px solid #444;border-radius:6px;padding:7px"></div>';
    html+='<div style="font-size:.78em;color:#aaa;margin-bottom:8px">'+esc(t.name)+' · склад: '+t.stock.reduce(function(a,x){return a+x.qty;},0)+' · Покупает только подходящие товары</div><div id="m552_rows"></div>';
    if(mode==='barter')html+='<div id="m552_offer" style="margin-top:10px;padding:9px;background:#211f1b;border:1px solid #4b412e;border-radius:8px"></div>';
    b.innerHTML=html;document.getElementById('m552_balance').textContent='Баланс: '+money(market.balanceCp());b.querySelectorAll('[data-tr]').forEach(function(x){x.onclick=function(){selectedTrader=x.getAttribute('data-tr');offers=[];renderUI();};});b.querySelectorAll('[data-mode]').forEach(function(x){x.onclick=function(){mode=x.getAttribute('data-mode');offers=[];renderUI();};});var si=document.getElementById('m552_search');si.oninput=function(){query=this.value.toLowerCase();renderRows();};renderRows();if(mode==='barter')renderOffer();}
  function renderRows(){var r=document.getElementById('m552_rows');if(!r)return;var t=market.getTrader(selectedTrader);if(mode==='buy'||mode==='barter'){r.innerHTML=t.stock.filter(function(it){return it.qty>0&&(!query||it.name.toLowerCase().indexOf(query)>=0);}).map(function(it){var q=market.quote(selectedTrader,it,'buy'),v=calculateItemValue(it,{unit:true});return '<div style="display:flex;gap:8px;align-items:center;padding:8px 5px;border-top:1px solid #333"><span style="flex:1"><b>'+esc(it.name)+'</b><br><small>'+it.qty+' шт. · базовая стоимость '+money(v.cp)+' · продажа игроку '+money(q.cp)+'</small></span><button class="btn-action" data-buy2="'+it.id+'">'+(mode==='barter'?'Выбрать':'Купить')+'</button></div>';}).join('')||'<div style="padding:12px;color:#777">Нет подходящих товаров.</div>';} else {var rows=inventoryEntries().filter(function(e){return !query||String(e.item.name||'').toLowerCase().indexOf(query)>=0;});r.innerHTML=rows.map(function(e){var c=canTraderBuy(selectedTrader,e.item),q=market.quote(selectedTrader,e.item,'sell'),v=calculateItemValue(e.item,{unit:true});return '<div style="display:flex;gap:8px;align-items:center;padding:8px 5px;border-top:1px solid #333;opacity:'+(c.ok?'1':'.48')+'"><span style="flex:1"><b>'+esc(e.item.name)+'</b><br><small>'+e.item.count+' шт. · стоимость '+money(v.cp)+' · скупка '+money(q.cp)+(c.ok?'':' · не нужен торговцу')+'</small></span><button class="btn-action" data-sell2="'+e.category+'|'+e.index+'" '+(c.ok?'':'disabled')+'>Продать</button></div>';}).join('')||'<div style="padding:12px;color:#777">Инвентарь пуст.</div>';}
    r.querySelectorAll('[data-buy2]').forEach(function(x){x.onclick=function(){var id=x.getAttribute('data-buy2');if(mode==='barter'){offers.push({id:id});renderOffer();}else{var rr=wrappedBuy(selectedTrader,id,1);if(!rr.ok&&global.showCustomAlert)global.showCustomAlert('Торговля',rr.error,'⚠️');renderUI();}};});r.querySelectorAll('[data-sell2]').forEach(function(x){x.onclick=function(){var p=x.getAttribute('data-sell2').split('|'),rr=wrappedSell(selectedTrader,p[0],Number(p[1]),1);if(!rr.ok&&global.showCustomAlert)global.showCustomAlert('Торговля',rr.error,'⚠️');renderUI();};});}
  function renderOffer(){var o=document.getElementById('m552_offer');if(!o)return;var t=market.getTrader(selectedTrader),want=offers.length?offers[0].id:null;var wantItem=want&&t.stock.find(function(x){return x.id===want;});var totalWant=wantItem?calculateItemValue(wantItem,{unit:true}).cp:0;var offerValue=0;var html='<b>🤝 Предложение</b><div style="font-size:.78em;color:#aaa;margin:4px 0 8px">Выберите товар торговца выше, затем добавьте свои товары ниже. Обмен допускается при разнице не более 10%.</div>';
    if(wantItem)html+='<div>Получите: <b>'+esc(wantItem.name)+'</b> · '+money(totalWant)+'</div>';html+='<div style="margin-top:8px">Ваши товары:</div>';var entries=inventoryEntries().filter(function(e){return canTraderBuy(selectedTrader,e.item).ok;});html+=entries.map(function(e){var checked=offers.some(function(x){return x.category===e.category&&x.index===e.index;});return '<label style="display:flex;gap:7px;padding:5px 0"><input type="checkbox" data-offer="'+e.category+'|'+e.index+'" '+(checked?'checked':'')+'><span style="flex:1">'+esc(e.item.name)+' ×'+e.item.count+' · '+money(e.value.cp)+'</span></label>';}).join('');var selected=offers.filter(function(x){return x.category;}).reduce(function(s,x){var e=entries.find(function(z){return z.category===x.category&&z.index===x.index;});return s+(e?e.value.cp*(Number(x.count)||1):0);},0);html+='<div style="margin-top:8px"><b>Стоимость предложения: '+money(selected)+'</b></div><button class="btn-action" id="m552_do_barter" style="margin-top:8px" '+(wantItem?'':'disabled')+'>Обменять</button>';o.innerHTML=html;o.querySelectorAll('[data-offer]').forEach(function(x){x.onchange=function(){var p=x.getAttribute('data-offer').split('|');if(x.checked)offers.push({category:p[0],index:Number(p[1]),count:1});else offers=offers.filter(function(z){return !(z.category===p[0]&&z.index===Number(p[1]));});renderOffer();};});var btn=document.getElementById('m552_do_barter');if(btn)btn.onclick=function(){if(!wantItem)return;var rr=barter(selectedTrader,wantItem.id,1,offers);if(!rr.ok&&global.showCustomAlert)global.showCustomAlert('Обмен',rr.error,'⚠️');else if(rr.ok&&global.showCustomAlert)global.showCustomAlert('Обмен','Обмен завершён.','🤝');offers=[];renderUI();};}
  function install(){var old=document.getElementById('marketOpenV55');if(old){old.textContent='Открыть торговлю';old.onclick=function(){openTrade();};}else if(!document.getElementById('marketOpenV55_2')){var host=document.getElementById('marketV55')||document.body;var b=document.createElement('button');b.id='marketOpenV55_2';b.className='btn-action';b.textContent='🏪 Торговля';b.onclick=function(){openTrade();};host.appendChild(b);}}
  var api={version:'55.2',calculateItemValue:calculateItemValue,resolveFunctionalItem:resolveFunctionalItem,canTraderBuy:canTraderBuy,sellCheck:sellCheck,buy:wrappedBuy,sell:wrappedSell,barter:barter,inventoryEntries:inventoryEntries,reportItem:reportItem,openTrade:openTrade,ACCEPT:ACCEPT};
  global.DND_MARKET_V55_2=api;
  if(typeof document!=='undefined')document.addEventListener('DOMContentLoaded',function(){setTimeout(install,1400);});
})(window);
