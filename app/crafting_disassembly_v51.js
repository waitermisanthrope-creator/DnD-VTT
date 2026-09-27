/**
 * Crafting Disassembly & Full Quality v51: расширяет существующую производственную экономику
 * разбором изготовленных предметов, ремонтом с ресурсной стоимостью и единой шкалой качества.
 * Как работает: использует craftRecipe/craftQuality уже созданного предмета, находит исходный
 * рецепт в DND_CRAFT_PROFESSIONS_V38, рассчитывает возврат материалов с учётом качества и
 * износа, а также нормализует качество предмета в 7 уровней без изменения базовых правил D&D.
 * Основные API: DND_CRAFT_V51.disassembleItem(), repairItem(), qualityOf(), qualityEffects(),
 * canDisassemble(), canRepair(). Вспомогательные переменные: QUALITY_TIERS, RECOVERY_BY_QUALITY,
 * REPAIR_PROFILES. Wallpapers.js и Ambiences.js не изменяются.
 */
(function(global){
  'use strict';
  var prof=global.DND_CRAFT_PROFESSIONS_V38;
  var econ=global.DND_CRAFT_ECONOMY_V49;
  if(!prof||!econ)return;

  var QUALITY_TIERS={
    ruined:{label:'Разрушенное',score:0,value:0.10,durability:0.10},
    poor:{label:'Низкое',score:1,value:0.75,durability:0.80},
    standard:{label:'Стандартное',score:2,value:1.00,durability:1.00},
    fine:{label:'Качественное',score:3,value:1.15,durability:1.15},
    superior:{label:'Превосходное',score:4,value:1.30,durability:1.30},
    masterwork:{label:'Мастерское',score:5,value:1.50,durability:1.50},
    legendary:{label:'Легендарное',score:6,value:1.85,durability:1.80}
  };
  var RECOVERY_BY_QUALITY={ruined:0,poor:0.25,standard:0.50,fine:0.65,superior:0.72,masterwork:0.80,legendary:0.85};
  var REPAIR_PROFILES={
    weapons:{material:'steelWireV38',materialCount:1,goldPer10:1,label:'оружейная фурнитура'},
    armor:{material:'leatherStrapV49',materialCount:1,goldPer10:2,label:'ремонтная фурнитура'},
    clothing:{material:'thread',materialCount:1,goldPer10:1,label:'нить'},
    gear:{material:'leatherStrapV49',materialCount:1,goldPer10:1,label:'кожаные ремни'},
    default:{material:'steelWireV38',materialCount:1,goldPer10:1,label:'ремонтный материал'}
  };

  function enabled(){return !global.DND_CRAFTING_DLC_V50||global.DND_CRAFTING_DLC_V50.isEnabled();}
  function character(){return global.currentCharacter||global.currentChar||null;}
  function inventory(){var c=character();if(!c)return null;c.inventory=c.inventory||{weapons:[],armor:[],consumables:[],materials:[],junk:[],clothing:[],gear:[]};return c.inventory;}
  function addMaterial(id,count,name){var inv=inventory();if(!inv||count<=0)return false;var list=inv.materials=inv.materials||[];var same=list.find(function(x){return x.materialId===id||x.craftMaterialId===id||x.name===name;});if(same)same.count=Math.round((Number(same.count)||0)+count*100)/100;else list.push({name:name||id,materialId:id,count:Math.round(count*100)/100,crafted:false,recoveredFromCrafting:true});return true;}
  function consumeMaterial(id,count){var inv=inventory();if(!inv)return false;var left=Number(count)||0;Object.keys(inv).forEach(function(cat){var list=inv[cat]||[];for(var i=list.length-1;i>=0&&left>0;i--){var it=list[i];if(it.materialId!==id&&it.craftMaterialId!==id)continue;var take=Math.min(left,Number(it.count)||0);it.count-=take;left-=take;if(it.count<=0)list.splice(i,1);}});return left<=0;}
  function save(){if(typeof global.autoSaveCurrentCharacter==='function')global.autoSaveCurrentCharacter();else if(typeof global.saveCharacter==='function')global.saveCharacter();}
  function category(item){return String(item&&item.category||'gear').toLowerCase();}
  function qualityKey(item){return item&&item.craftQuality||item&&item.craftOutcome||'success';}
  function qualityOf(item){
    if(!item)return{key:'standard',label:QUALITY_TIERS.standard.label,score:2};
    if(item.qualityTier&&QUALITY_TIERS[item.qualityTier])return Object.assign({key:item.qualityTier},QUALITY_TIERS[item.qualityTier]);
    var q=qualityKey(item), bonus=Number(item.qualityBonus)||0, craftBonus=Number(item.craftingBonus)||0, master=Number(item.craftMasterworkBonus)||0;
    var key='standard';
    if(q==='critical_failure')key='ruined';
    else if(q==='failure')key='poor';
    else if(q==='fine')key='fine';
    else if(q==='exceptional')key=(bonus+master+Math.floor(craftBonus/3)>=4?'legendary':'masterwork');
    else if(bonus+master+Math.floor(craftBonus/4)>=2)key='superior';
    var tier=Object.assign({key:key},QUALITY_TIERS[key]);
    tier.reason={craftQuality:q,qualityBonus:bonus,craftingBonus:craftBonus,craftMasterworkBonus:master};
    return tier;
  }
  function applyFullQuality(item){
    if(!item)return item;
    var tier=qualityOf(item), oldMax=econ.getDurability(item).max||0;
    item.qualityTier=tier.key;item.qualityLabel=tier.label;item.qualityScore=tier.score;
    item.qualityValueMultiplier=tier.value;item.qualityDurabilityMultiplier=tier.durability;
    var base=econ.categoryBaseDurability?econ.categoryBaseDurability(item):oldMax||40;
    var master=Math.max(0,Number(item.craftMasterworkBonus)||0);
    item.durabilityMax=Math.max(1,Math.round(base*tier.durability*(1+master*0.05)));
    if(!Number.isFinite(Number(item.durability)))item.durability=item.durabilityMax;
    item.durability=Math.min(item.durabilityMax,Math.max(0,Number(item.durability)));
    item.qualityAppliedV51=true;item.craftQualityVersion='51.0.0';
    item.marketValue=econ.itemValue(item);
    return item;
  }
  function qualityEffects(item){
    var q=qualityOf(item);return {tier:q.key,label:q.label,score:q.score,valueMultiplier:q.value,durabilityMultiplier:q.durability,attackDamageBonus:q.score>=5?1:0,armorBonus:q.score>=6?1:0,craftValueNote:q.score>=5?'Мастерская работа: предмет получает +1 к соответствующему авторскому качественному модификатору.':'Стандартный качественный профиль.'};
  }
  function findRecipe(item){
    if(!item||!item.craftRecipe)return null;
    return (prof.ALL_RECIPES||[]).find(function(r){return r.id===item.craftRecipe;})||null;
  }
  function canDisassemble(item){
    if(!enabled())return{ok:false,disabled:true,error:'DLC «Ремесла и износ» отключено.'};
    var r=findRecipe(item);if(!r)return{ok:false,error:'У предмета нет связанного рецепта для разбора.'};
    if(category(item)==='consumables')return{ok:false,error:'Расходуемые предметы не разбираются.'};
    return{ok:true,recipe:r,quality:qualityOf(item)};
  }
  function disassembleItem(item,options){
    options=options||{};var check=canDisassemble(item);if(!check.ok)return check;
    var r=check.recipe,q=check.quality,d=econ.getDurability(item),wear=d.max?d.current/d.max:1;
    var baseRate=RECOVERY_BY_QUALITY[q.key]||0.5,rate=Math.max(0,Math.min(0.9,baseRate*(0.35+0.65*wear)));
    var recovered={};Object.keys(r.materials||{}).forEach(function(id){var amount=Math.round((Number(r.materials[id])||0)*rate*100)/100;if(amount>0)recovered[id]=amount;});
    var result={ok:true,committed:false,rate:Math.round(rate*1000)/1000,quality:q,wearRatio:wear,recipe:r,recovered:recovered};
    if(options.dryRun!==false)return result;
    Object.keys(recovered).forEach(function(id){var mat=(prof.MATERIALS||[]).find(function(m){return m.id===id;});addMaterial(id,recovered[id],mat&&mat.name||id);});
    var removed=false,inv=inventory();
    if(inv){Object.keys(inv).some(function(cat){var list=inv[cat]||[],idx=list.indexOf(item);if(idx>=0){list.splice(idx,1);removed=true;return true;}return false;});}
    result.committed=true;result.itemRemoved=removed;result.item=item;save();
    return result;
  }
  function repairProfile(item){return REPAIR_PROFILES[category(item)]||REPAIR_PROFILES.default;}
  function canRepair(item){
    if(!enabled())return{ok:false,disabled:true,error:'DLC «Ремесла и износ» отключено.'};
    if(!item)return{ok:false,error:'Предмет не найден.'};var d=econ.getDurability(item);if(!d.max)return{ok:false,error:'У предмета нет системы прочности.'};
    if(d.current>=d.max)return{ok:true,repaired:false,cost:0,materialCount:0,message:'Предмет уже полностью исправен.'};
    var p=repairProfile(item),missing=d.max-d.current,cycles=Math.max(1,Math.ceil(missing/10));
    return{ok:true,repaired:false,missing:missing,profile:p,material:p.material,materialCount:cycles*p.materialCount,gold:cycles*p.goldPer10};
  }
  function repairItem(item,options){
    options=options||{};var plan=canRepair(item);if(!plan.ok||plan.repaired)return plan;
    if(options.dryRun)return plan;
    var have=0,inv=inventory();if(inv)Object.keys(inv).forEach(function(cat){(inv[cat]||[]).forEach(function(it){if(it.materialId===plan.material||it.craftMaterialId===plan.material)have+=Number(it.count)||0;});});
    var use=Math.min(have,plan.materialCount);var goldNeeded=plan.gold;
    if(use<plan.materialCount){var shortage=plan.materialCount-use;goldNeeded+=shortage*2;}
    var c=character();if(c){c.gold=Number(c.gold)||0;if(c.gold<goldNeeded)return{ok:false,error:'Недостаточно ресурсов для ремонта.',requiredMaterials:plan.materialCount,haveMaterials:have,requiredGold:goldNeeded,haveGold:c.gold};}
    if(use>0)consumeMaterial(plan.material,use);
    if(c)c.gold-=goldNeeded;
    var d=econ.getDurability(item);item.durability=d.max;item.repairCount=(Number(item.repairCount)||0)+1;item.repairQualityLoss=Math.max(0,Number(item.repairQualityLoss)||0);
    item.marketValue=econ.itemValue(item);item.lastRepairV51={at:Date.now(),materialsUsed:use,gold:goldNeeded};save();
    return{ok:true,repaired:true,materialsUsed:use,gold:goldNeeded,item:item};
  }
  function patchCraft(){
    if(prof.craft&& !prof.craft.__v51Wrapped){
      var original=prof.craft;function wrapped(){var result=original.apply(this,arguments);if(result&&result.ok&&result.item){applyFullQuality(result.item);result.item.craftDisassemblyV51={recipe:result.recipe&&result.recipe.id||result.item.craftRecipe};}return result;}
      wrapped.__v51Wrapped=true;prof.craft=wrapped;global.dndCraftProfessionV38=wrapped;
    }
  }
  function render(){
    var host=document.getElementById('craftingV49Economy')||document.getElementById('craftingProfessionsPanel');if(!host||document.getElementById('craftingV51Tools'))return;
    var box=document.createElement('div');box.id='craftingV51Tools';box.style.cssText='margin-top:8px;padding:9px;background:#181715;border:1px solid #594a31;border-radius:7px;color:#ccc';
    box.innerHTML='<b style="color:#d7b86e">🛠️ Разбор, ремонт и качество v51</b><div style="font-size:.74em;color:#999;margin-top:4px">7 уровней качества · возврат материалов при разборе зависит от качества и износа · ремонт использует ремонтные материалы и золото.</div>';
    host.appendChild(box);
  }
  patchCraft();
  global.DND_CRAFT_V51={VERSION:'51.0.0',QUALITY_TIERS:QUALITY_TIERS,RECOVERY_BY_QUALITY:RECOVERY_BY_QUALITY,qualityOf:qualityOf,qualityEffects:qualityEffects,applyFullQuality:applyFullQuality,canDisassemble:canDisassemble,disassembleItem:disassembleItem,canRepair:canRepair,repairItem:repairItem,repairProfile:repairProfile,patch:patchCraft,render:render};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){patchCraft();render();});else{patchCraft();render();}
})(window);
