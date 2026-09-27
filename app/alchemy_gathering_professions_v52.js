/**
 * Alchemy 2.0 ↔ Gathering ↔ Professions v52: интеграционный слой для алхимических ингредиентов.
 * Как работает: связывает 120 ингредиентов Alchemy 2.0 с единым каталогом ресурсов и добычей,
 * позволяет собирать/получать ингредиенты как физические предметы инвентаря, учитывает профессию
 * алхимика/травника в проверке смеси и создаёт каталог источников. Не создаёт новый алхимический
 * или crafting engine: владельцами логики остаются alchemy_gameplay_v30.js, resource_gathering_v35.js,
 * crafting_resources_v34.js и crafting_profession_progression_v47.js.
 * Основные переменные/API: DND_ALCHEMY_GATHERING_V52, INGREDIENT_SOURCES, sourceFor(), gatherIngredient(),
 * grantIngredient(), professionProfile(), listSources(), render().
 */
(function(global){'use strict';
var A=global.DNDAlchemy, R=global.DND_CRAFT_RESOURCES_V34, G=global.DND_RESOURCE_GATHERING_V35, C=global.DND_CRAFT_PROFESSIONS_V38;
if(!A||!R)return;

function hero(){return global.currentChar||global.currentCharacter||null;}
function save(){try{if(typeof global.autoSaveCurrentCharacter==='function')global.autoSaveCurrentCharacter();else if(typeof global.saveCharacter==='function')global.saveCharacter();}catch(e){}}
function norm(s){return String(s||'').toLowerCase().replace(/ё/g,'е').replace(/[^a-zа-я0-9]+/gi,'');}
function rarityRank(r){return {common:1,uncommon:2,rare:3,very_rare:4,legendary:5}[r]||1;}
function candidatesByTag(tags){
  var all=R.RESOURCES||[];
  return all.filter(function(x){var xt=(x.tags||[]).concat(x.roles||[]).map(norm);return tags.some(function(t){return xt.indexOf(norm(t))!==-1;});});
}
function categoryPool(ing){
  var cat=String(ing.category||'').toLowerCase();
  if(cat==='plant')return candidatesByTag(['plant','herb','natural']);
  if(cat==='fungus')return candidatesByTag(['fungus','mushroom','spore','natural']);
  if(cat==='animal')return candidatesByTag(['animal','hide','fiber','organ','reagent']);
  if(cat==='monster'||cat==='construct'||cat==='organic')return candidatesByTag(['monster','undead','magic','organ','reagent']);
  if(cat==='mineral')return candidatesByTag(['mineral','ore','gem','magic']);
  if(cat==='magical')return candidatesByTag(['magic','gem','natural','reagent']);
  if(cat==='craft')return candidatesByTag(['glass','paper','metal','craft','component']);
  return candidatesByTag(['alchemy','reagent','natural','fuel']);
}
function exactPool(ing){
  var n=norm(ing.name), all=R.RESOURCES||[];
  return all.filter(function(x){var xn=norm(x.name);return xn===n||xn.indexOf(n)!==-1||n.indexOf(xn)!==-1;});
}
function score(ing,m){
  var score=0,n=norm(ing.name),mn=norm(m.name);
  if(mn&&n&&((mn.indexOf(n)!==-1)||(n.indexOf(mn)!==-1)))score+=100;
  score+=Math.max(0,5-Math.abs(rarityRank(ing.rarity)-rarityRank(m.rarity))*2);
  var tags=(m.tags||[]).concat(m.roles||[]).map(norm), cat=String(ing.category||'').toLowerCase();
  if(cat==='plant'&&tags.indexOf('plant')>=0)score+=20;
  if(cat==='fungus'&&tags.some(function(x){return x.indexOf('fung')>=0||x.indexOf('spore')>=0;}))score+=20;
  if(cat==='animal'&&tags.indexOf('animal')>=0)score+=20;
  if(cat==='monster'&&tags.indexOf('monster')>=0)score+=25;
  if(cat==='mineral'&&tags.some(function(x){return ['mineral','ore','gem'].indexOf(x)>=0;}))score+=20;
  if(cat==='magical'&&tags.indexOf('magic')>=0)score+=25;
  if((m.usedBy||[]).indexOf('alchemy')>=0)score+=18;
  if((m.roles||[]).indexOf('reagent')>=0)score+=10;
  return score;
}

var INGREDIENT_SOURCES={};
A.ingredients.forEach(function(ing){
  var pool=exactPool(ing); if(!pool.length)pool=categoryPool(ing);
  if(!pool.length)pool=R.RESOURCES||[];
  pool=pool.slice().sort(function(a,b){return score(ing,b)-score(ing,a);});
  var primary=pool[0];
  var alternates=pool.slice(1,4).filter(function(x){return x.id!==primary.id;});
  INGREDIENT_SOURCES[ing.id]={ingredientId:ing.id,ingredientName:ing.name,rarity:ing.rarity,category:ing.category,
    primaryResourceId:primary&&primary.id||null,alternateResourceIds:alternates.map(function(x){return x.id;}),
    gatherAction:ing.category==='plant'||ing.category==='fungus'?'herbs':(ing.category==='mineral'?'mining':(ing.category==='animal'||ing.category==='monster'||ing.category==='construct'||ing.category==='organic'?'salvage':'flowers')),
    sourceRule:'Авторская связь ресурса с Alchemy 2.0; конкретный источник может быть заменён Мастером.'};
});

function ensureInventory(c){c.inventory=c.inventory||{weapons:[],armor:[],consumables:[],materials:[],junk:[]};c.inventory.materials=c.inventory.materials||[];return c.inventory;}
function grantIngredient(id,count,meta){
  var c=hero(),ing=A.ingredients.find(function(x){return x.id===id;}); if(!c||!ing||count<=0)return{ok:false,error:'Ингредиент или персонаж не найден'};
  var inv=ensureInventory(c), item=inv.materials.find(function(x){return x.alchemyId===id;});
  if(item)item.count=(Number(item.count)||0)+count;
  else inv.materials.push({name:ing.name,count:count,category:'Алхимический ингредиент',rarity:ing.rarity,weight:.1,cost:Math.max(1,Math.round(ing.potency/4)),alchemyId:id,source:meta&&meta.source||'alchemy_gathering_v52',ingredientCategory:ing.category,propertiesHidden:true});
  save(); if(typeof global.renderInventory==='function')global.renderInventory();
  return{ok:true,ingredient:ing,count:count,item:item||inv.materials[inv.materials.length-1]};
}
function gatherIngredient(id,opts){
  opts=opts||{};var src=INGREDIENT_SOURCES[id],ing=A.ingredients.find(function(x){return x.id===id;}),c=hero();
  if(!src||!ing||!c)return{ok:false,error:'Ингредиент или персонаж не найден'};
  var amount=Math.max(1,Number(opts.amount)||1);
  if(G&&typeof G.gather==='function'&&src.primaryResourceId&&!opts.direct){
    var g=G.gather(src.gatherAction,src.primaryResourceId,{die:Number(opts.die)||4,strenuous:!!opts.strenuous});
    if(!g.ok)return g;
    /* Ресурс добыт физически; затем этот же объём перерабатывается в алхимический компонент,
       поэтому интеграция не создаёт ресурс из воздуха и не дублирует инвентарь. */
    var inv=ensureInventory(c),raw=inv.materials.find(function(x){return x.materialId===src.primaryResourceId;});
    var converted=Math.min(Number(g.amount)||0,Number(raw&&raw.count)||0);
    if(raw){raw.count-=converted;if(raw.count<=0)inv.materials.splice(inv.materials.indexOf(raw),1);}
    amount=converted;
    var granted=grantIngredient(id,amount,{source:'gather:'+src.primaryResourceId});
    return Object.assign({source:src,amount:amount,gather:g},granted);
  }
  return grantIngredient(id,amount,{source:'direct_master_gather'});
}
function sourceFor(id){return INGREDIENT_SOURCES[id]||null;}
function listSources(filter){var q=norm(filter||'');return A.ingredients.map(function(i){return{ingredient:i,source:INGREDIENT_SOURCES[i.id]};}).filter(function(x){return !q||norm(x.ingredient.name).indexOf(q)!==-1||norm(x.ingredient.category).indexOf(q)!==-1;});}
function professionProfile(){
  var c=hero(), tools=['alchemist','herbalism'], p={bonus:0,qualityBonus:0,sources:[],hasProfession:false}; if(!c)return p;
  if(C&&typeof C.craftingProfile==='function'){var cp=C.craftingProfile(c,tools);p.bonus=Number(cp.totalBonus)||0;p.qualityBonus=Number(cp.professionQualityBonus)||0;p.sources=cp.notes||[];}
  var prog=global.DND_CRAFT_PROFESSION_PROGRESS;
  if(prog&&typeof prog.getProfile==='function'){var pp=prog.getProfile(c,tools);p.bonus=Math.max(p.bonus,Number(pp.bonus)||0);p.qualityBonus=Math.max(p.qualityBonus,Number(pp.qualityBonus)||0);p.sources=p.sources.concat(pp.sources||[]);}
  p.hasProfession=!!((c.craftingProfessions&&((c.craftingProfessions.alchemist)||(c.craftingProfessions.herbalist)))||p.bonus>0||p.sources.length);
  return p;
}
function mix(ids,catalyst,opts){
  opts=Object.assign({},opts||{});var p=professionProfile();
  if(p.hasProfession)opts.ignoreProficiency=true;
  opts.professionBonus=p.bonus;
  var r=A.mix(ids,catalyst,opts);
  if(r&&typeof r==='object'){r.craftingProfessionBonus=p.bonus;r.craftingProfessionQualityBonus=p.qualityBonus;r.professionSources=p.sources;}
  return r;
}
function discoveryBonus(){var p=professionProfile();return{bonus:p.bonus,description:p.bonus?'Бонус профессии алхимика/травника: +'+p.bonus+' к алхимической проверке.':'Профиль профессии не даёт отдельного бонуса.'};}
function render(){
  var host=document.getElementById('alchemyPanel');if(!host||document.getElementById('alchemyGatheringV52'))return;
  var box=document.createElement('div');box.id='alchemyGatheringV52';box.style.cssText='margin-top:8px;padding:9px;background:#171717;border:1px solid #4b3a20;border-radius:8px';
  box.innerHTML='<h4 style="margin:0;color:#d7b86e">🌿 Источники алхимических ингредиентов</h4><div style="font-size:.76em;color:#aaa;margin:4px 0">Ингредиенты теперь связаны с добычей и профессиями. Свойства остаются скрытыми до исследования.</div><select id="alchemyGatherIngredient" style="width:100%;padding:7px;background:#222;color:#fff;border:1px solid #444"></select><div style="display:flex;gap:5px;margin-top:5px"><select id="alchemyGatherDie" style="flex:1;padding:7px;background:#222;color:#fff;border:1px solid #444"><option value="4">d4</option><option value="6">d6</option><option value="8">d8</option><option value="10">d10</option><option value="12">d12</option></select><button class="btn-action" style="flex:1" onclick="DND_ALCHEMY_GATHERING_V52.uiGather()">🌿 Собрать</button></div><div id="alchemyGatherResult" style="margin-top:6px"></div><div id="alchemyProfessionV52" style="margin-top:6px;color:#aaa;font-size:.76em"></div>';
  host.appendChild(box);var s=document.getElementById('alchemyGatherIngredient');A.ingredients.forEach(function(i){var o=document.createElement('option');o.value=i.id;o.textContent=i.name+' · '+i.rarity;s.appendChild(o);});var p=professionProfile();document.getElementById('alchemyProfessionV52').textContent=(p.hasProfession?'🧪 Профессия активна: +'+p.bonus+' к алхимической проверке.':'ℹ️ Можно собирать ресурсы, но для алхимических проверок нужна соответствующая подготовка.');
}
function uiGather(){var id=document.getElementById('alchemyGatherIngredient')?.value;var die=Number(document.getElementById('alchemyGatherDie')?.value)||4;var r=gatherIngredient(id,{die:die});var e=document.getElementById('alchemyGatherResult');if(e)e.innerHTML=r.ok?'✅ Получено: <b>'+r.amount+' × '+r.ingredient.name+'</b><br><small>Источник: '+((r.source&&r.source.primaryResourceId)||'свободный сбор')+'</small>':'❌ '+r.error;}
var API={VERSION:'52.0.0',INGREDIENT_SOURCES:INGREDIENT_SOURCES,sourceFor:sourceFor,listSources:listSources,grantIngredient:grantIngredient,gatherIngredient:gatherIngredient,professionProfile:professionProfile,mix:mix,discoveryBonus:discoveryBonus,render:render,uiGather:uiGather};
global.DND_ALCHEMY_GATHERING_V52=API;
document.addEventListener('DOMContentLoaded',function(){setTimeout(render,350);});
})(window);
