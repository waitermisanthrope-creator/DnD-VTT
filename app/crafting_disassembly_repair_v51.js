/**
 * Crafting Quality / Disassembly / Repair v51.
 * Как работает: расширяет существующую экономику v49 одним слоем для полного жизненного
 * цикла готового предмета — качество, состояние, ремонт и разборка обратно в материалы.
 * Файл не создаёт второй crafting engine: он использует DND_CRAFT_ECONOMY_V49 и
 * DND_CRAFT_PROFESSIONS_V38 как владельцев рецептов/производства. Разборка возвращает
 * долю материалов исходного рецепта с поправкой на качество и текущую прочность; ремонт
 * использует существующий repairItem(), но сохраняет историю и нормализует метаданные.
 * Основные API: DND_CRAFT_DISASSEMBLY_V51, assessItem(), repairItem(), disassembleItem(),
 * previewDisassembly(), qualityReport(), render(). Важные переменные: QUALITY_GRADES,
 * RECOVERY_BY_DURABILITY, REPAIR_COST_PER_10. Это авторское ХБ; базовые правила D&D 5e
 * не заменяются. Wallpapers.js и Ambiences.js не изменяются.
 */
(function(global){
  'use strict';

  var ECON=global.DND_CRAFT_ECONOMY_V49;
  var BASE=global.DND_CRAFT_PROFESSIONS_V38;
  if(!ECON||!BASE)return;

  var VERSION='51.0.0';
  var REPAIR_COST_PER_10=1;
  var RECOVERY_BY_DURABILITY={broken:0.10,ruined:0.25,worn:0.50,good:0.75,pristine:1};
  var QUALITY_GRADES={
    critical_failure:{label:'Испорчено',score:5,band:'F'},
    failure:{label:'Низкое',score:25,band:'D'},
    success:{label:'Стандартное',score:50,band:'C'},
    fine:{label:'Качественное',score:75,band:'B'},
    exceptional:{label:'Мастерское',score:100,band:'A'}
  };

  function n(v,d){var x=Number(v);return Number.isFinite(x)?x:(d||0);}
  function round(v,p){var m=Math.pow(10,p||2);return Math.round(v*m)/m;}
  function qualityKey(item){return ECON.getItemQuality?ECON.getItemQuality(item):(item&&item.craftQuality)||'success';}
  function qualityDef(item){return QUALITY_GRADES[qualityKey(item)]||QUALITY_GRADES.success;}
  function durability(item){return ECON.getDurability?ECON.getDurability(item):{current:n(item&&item.durability,0),max:n(item&&item.durabilityMax,0),ratio:0};}

  function condition(ratio){
    if(ratio<=0)return 'broken';
    if(ratio<0.25)return 'ruined';
    if(ratio<0.50)return 'worn';
    if(ratio<0.85)return 'good';
    return 'pristine';
  }

  function ensureMetadata(item){
    if(!item)return null;
    var q=qualityDef(item), d=durability(item);
    if(!item.craftQuality)item.craftQuality=qualityKey(item);
    if(!item.qualityLabel)item.qualityLabel=q.label;
    if(!Number.isFinite(Number(item.qualityScore)))item.qualityScore=q.score;
    if(!Number.isFinite(Number(item.durabilityMax)) && ECON.applyQuality)ECON.applyQuality(item);
    d=durability(item);
    item.condition=condition(d.ratio);
    item.conditionLabel={broken:'Сломан',ruined:'Сильно изношен',worn:'Изношен',good:'Исправен',pristine:'Почти новый'}[item.condition];
    item.craftQualityVersion=VERSION;
    item.repairHistory=Array.isArray(item.repairHistory)?item.repairHistory:[];
    item.disassemblyHistory=Array.isArray(item.disassemblyHistory)?item.disassemblyHistory:[];
    return item;
  }

  function assessItem(item){
    if(!item)return{ok:false,error:'Предмет не найден'};
    ensureMetadata(item);
    var q=qualityDef(item),d=durability(item),c=condition(d.ratio);
    var repairCount=n(item.repairCount,0);
    var qualityPenalty=Math.min(15,repairCount*2);
    var score=Math.max(0,Math.min(100,Math.round(q.score*d.ratio-qualityPenalty)));
    var value=ECON.itemValue?ECON.itemValue(item):n(item.baseCraftValue,0);
    return{ok:true,qualityKey:qualityKey(item),qualityLabel:q.label,qualityBand:q.band,baseQualityScore:q.score,score:score,current:d.current,max:d.max,ratio:round(d.ratio,3),condition:c,conditionLabel:item.conditionLabel,repairCount:repairCount,marketValue:round(value,2)};
  }

  function findRecipeForItem(item){
    if(!item)return null;
    var id=item.craftRecipeId||item.craftRecipe||item.recipeId;
    if(id&&Array.isArray(ECON.RECIPES)){
      var exact=ECON.RECIPES.find(function(r){return r.id===id;});
      if(exact)return exact;
    }
    if(item.craftRecipeName&&Array.isArray(ECON.RECIPES)){
      var byName=ECON.RECIPES.find(function(r){return r.name===item.craftRecipeName;});
      if(byName)return byName;
    }
    if(item.name&&Array.isArray(ECON.RECIPES)){
      return ECON.RECIPES.find(function(r){return r.output&&r.output.name===item.name;})||null;
    }
    return null;
  }

  function recoverRatio(item){
    var d=durability(item), q=qualityDef(item);
    var base=RECOVERY_BY_DURABILITY[condition(d.ratio)]||0.5;
    var qualityFactor=0.70+(q.score/100)*0.30;
    var result=base*qualityFactor;
    return Math.max(0.05,Math.min(1,result));
  }

  function materialName(id){
    var mats=BASE.MATERIALS||[];
    var m=mats.find(function(x){return x.id===id;});
    return m?m.name:id;
  }

  function previewDisassembly(item){
    if(!item)return{ok:false,error:'Предмет не найден'};
    ensureMetadata(item);
    var recipe=findRecipeForItem(item);
    if(!recipe)return{ok:false,error:'Не найден исходный рецепт предмета.',recoverable:false};
    var ratio=recoverRatio(item);
    var materials=Object.keys(recipe.materials||{}).map(function(id){
      var requested=n(recipe.materials[id],0);
      return{id:id,name:materialName(id),sourceQuantity:requested,recovered:round(requested*ratio,2)};
    }).filter(function(x){return x.recovered>0;});
    return{ok:true,recipeId:recipe.id,recipeName:recipe.name,ratio:round(ratio,3),condition:condition(durability(item).ratio),materials:materials,warning:'Разборка необратима: предмет уничтожается.'};
  }

  function addMaterialToInventory(id,name,qty){
    var c=global.currentCharacter||global.currentChar;
    if(!c)return false;
    c.inventory=c.inventory||{weapons:[],armor:[],consumables:[],materials:[],junk:[]};
    c.inventory.materials=c.inventory.materials||[];
    var existing=c.inventory.materials.find(function(x){return x.materialId===id||x.name===name;});
    if(existing){existing.count=n(existing.count,0)+qty;return true;}
    c.inventory.materials.push({name:name,materialId:id,count:qty,equipped:false,craftingMaterial:true});
    return true;
  }

  function removeItemReference(item,options){
    var c=global.currentCharacter||global.currentChar;
    if(!c||!c.inventory)return false;
    options=options||{};
    if(options.category&&Number.isInteger(options.index)&&Array.isArray(c.inventory[options.category])){
      if(c.inventory[options.category][options.index]===item){
        var stack=n(item.count,1);
        if(stack>1){item.count=round(stack-1,2);return true;}
        c.inventory[options.category].splice(options.index,1);return true;
      }
    }
    var cats=Object.keys(c.inventory);
    for(var i=0;i<cats.length;i++){
      var list=c.inventory[cats[i]];
      if(!Array.isArray(list))continue;
      var idx=list.indexOf(item);
      if(idx>=0){list.splice(idx,1);return true;}
    }
    return false;
  }

  function disassembleItem(item,options){
    options=options||{};
    if(global.DND_CRAFTING_DLC_V50&&!global.DND_CRAFTING_DLC_V50.isEnabled())return{ok:false,disabled:true,error:'Авторское дополнение «Ремесла и износ» отключено в настройках.',action:'disassembly'};
    if(!item)return{ok:false,error:'Предмет не найден'};
    ensureMetadata(item);
    var preview=previewDisassembly(item);
    if(!preview.ok)return preview;
    if(options.dryRun)return preview;
    if(item.equipped&&!options.allowEquipped)return{ok:false,error:'Сначала снимите предмет с экипировки.'};
    var removed=removeItemReference(item,options);
    if(!removed&&!options.allowDetached)return{ok:false,error:'Предмет не найден в инвентаре.'};
    preview.materials.forEach(function(m){addMaterialToInventory(m.id,m.name,m.recovered);});
    item.disassembledAt=Date.now();
    item.disassemblyRecovery=preview.ratio;
    item.disassemblyHistory.push({at:item.disassembledAt,ratio:preview.ratio,recipeId:preview.recipeId,materials:preview.materials});
    if(typeof global.autoSaveCurrentCharacter==='function')global.autoSaveCurrentCharacter();
    if(typeof global.renderInventory==='function')global.renderInventory();
    return{ok:true,removed:removed,recovered:preview.materials,ratio:preview.ratio,recipeId:preview.recipeId};
  }

  function repairItem(item,options){
    options=options||{};
    if(global.DND_CRAFTING_DLC_V50&&!global.DND_CRAFTING_DLC_V50.isEnabled())return{ok:false,disabled:true,error:'Авторское дополнение «Ремесла и износ» отключено в настройках.',action:'repair'};
    if(!item)return{ok:false,error:'Предмет не найден'};
    ensureMetadata(item);
    var d=durability(item);
    if(d.current>=d.max)return{ok:true,repaired:false,cost:0,message:'Предмет уже полностью исправен.',report:assessItem(item)};
    var missing=d.max-d.current;
    var cost=Math.max(1,Math.ceil(missing/10)*REPAIR_COST_PER_10);
    if(options.dryRun)return{ok:true,dryRun:true,missing:missing,cost:cost,report:assessItem(item)};
    var c=global.currentCharacter||global.currentChar;
    if(c){c.gold=n(c.gold,0);if(c.gold<cost)return{ok:false,error:'Недостаточно золота для ремонта',cost:cost,have:c.gold};c.gold-=cost;}
    var old=d.current;
    item.durability=d.max;
    item.repairCount=n(item.repairCount,0)+1;
    item.repairedAt=Date.now();
    item.repairHistory.push({at:item.repairedAt,cost:cost,from:old,to:d.max});
    ensureMetadata(item);
    if(ECON.itemValue)item.marketValue=ECON.itemValue(item);
    if(typeof global.autoSaveCurrentCharacter==='function')global.autoSaveCurrentCharacter();
    return{ok:true,repaired:true,cost:cost,item:item,report:assessItem(item)};
  }

  function qualityReport(){
    return Object.keys(QUALITY_GRADES).map(function(k){var q=QUALITY_GRADES[k];return{key:k,label:q.label,score:q.score,band:q.band};});
  }

  function render(){
    if(typeof document==='undefined')return;
    var host=document.getElementById('craftingProfessionsPanel')||document.getElementById('craftingV38Recipes');
    if(!host||document.getElementById('craftingV51Lifecycle'))return;
    var box=document.createElement('div');box.id='craftingV51Lifecycle';
    box.style.cssText='margin-top:10px;padding:10px;background:#171717;border:1px solid #69522f;border-radius:8px;color:#ddd';
    box.innerHTML='<h3 style="margin:0;color:#d7b86e">♻️ Жизненный цикл предмета v51</h3><div style="font-size:.76em;color:#aaa;margin:5px 0 8px">Качество → состояние → ремонт → разборка. Разборка возвращает часть материалов исходного рецепта с учётом качества и износа.</div><div style="font-size:.72em;color:#999">A — мастерское · B — качественное · C — стандартное · D/F — низкое/испорченное.</div><div id="craftV51ItemStatus" style="margin-top:7px;font-size:.75em"></div>';
    host.appendChild(box);
    if(global.DND_CRAFTING_DLC_V50&&global.DND_CRAFTING_DLC_V50.isEnabled&&!global.DND_CRAFTING_DLC_V50.isEnabled())box.style.display='none';
    refreshStatus();
  }

  function refreshStatus(){
    if(typeof document==='undefined')return;
    var el=document.getElementById('craftV51ItemStatus');if(!el)return;
    var c=global.currentCharacter||global.currentChar;
    if(!c||!c.inventory){el.textContent='Откройте персонажа, чтобы управлять конкретными предметами.';return;}
    var total=0,crafted=0,damaged=0;
    Object.keys(c.inventory).forEach(function(cat){var list=c.inventory[cat];if(!Array.isArray(list))return;list.forEach(function(item){total++;if(item.craftQuality||item.craftRecipeId||item.craftEconomyVersion){crafted++;if(durability(item).ratio<1)damaged++;}});});
    el.innerHTML='Предметов: <b>'+total+'</b> · изготовленных: <b>'+crafted+'</b> · требуют ремонта: <b>'+damaged+'</b>';
  }

  var API={VERSION:VERSION,QUALITY_GRADES:QUALITY_GRADES,RECOVERY_BY_DURABILITY:RECOVERY_BY_DURABILITY,assessItem:assessItem,qualityReport:qualityReport,previewDisassembly:previewDisassembly,disassembleItem:disassembleItem,repairItem:repairItem,findRecipeForItem:findRecipeForItem,recoverRatio:recoverRatio,render:render,refreshStatus:refreshStatus};
  global.DND_CRAFT_DISASSEMBLY_V51=API;
  if(typeof document!=='undefined'){
    if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',render);else render();
  }
})(window);
