/**
 * Crafting & Durability DLC v50: единая необязательная надстройка авторского ХБ для ремесел и износа.
 * Как работает: хранит переключатель DLC в localStorage, по умолчанию включает его, и безопасно
 * блокирует создание/ремонт/износ/крафтовый UI при отключении. Файл также подключается к боевому
 * движку и уменьшает прочность экипированного оружия/брони при подходящих событиях, не меняя базовые правила D&D.
 * Основные переменные/API: STORAGE_KEY, isEnabled(), setEnabled(), damageDurability(), guardCraft(), guardRepair().
 */
(function(global){
  'use strict';
  var STORAGE_KEY='dnd_dlc_crafting_enabled_v50';
  var DEFAULT_ENABLED=true;
  var state={enabled:DEFAULT_ENABLED};

  function read(){
    try { var raw=global.localStorage&&global.localStorage.getItem(STORAGE_KEY); state.enabled=raw===null?DEFAULT_ENABLED:raw==='true'; }
    catch(e){ state.enabled=DEFAULT_ENABLED; }
    return state.enabled;
  }
  function isEnabled(){return !!state.enabled;}
  function save(){try{if(global.localStorage)global.localStorage.setItem(STORAGE_KEY,state.enabled?'true':'false');}catch(e){} renderStatus();}
  function setEnabled(enabled){state.enabled=!!enabled;save();applyVisibility();return state.enabled;}
  function disabledResult(action){return {ok:false,disabled:true,dlc:'crafting_durability_v50',error:'Авторское дополнение «Ремесла и износ» отключено в настройках.',action:action||'craft'};}

  function getDurabilityApi(){return global.DND_CRAFT_ECONOMY_V49||null;}
  function getDurability(item){var api=getDurabilityApi();return api&&api.getDurability?api.getDurability(item):{current:Number(item&&item.durability)||0,max:Number(item&&item.durabilityMax)||0,ratio:0};}
  function damageDurability(item,amount,reason){
    if(!isEnabled())return disabledResult('durability');
    if(!item||!Number.isFinite(Number(item.durabilityMax)))return {ok:false,error:'У предмета нет системы прочности.'};
    var d=getDurability(item), loss=Math.max(0,Math.floor(Number(amount)||0));
    item.durability=Math.max(0,d.current-loss);
    item.durabilityDamageLog=Array.isArray(item.durabilityDamageLog)?item.durabilityDamageLog:[];
    if(loss>0)item.durabilityDamageLog.push({amount:loss,reason:String(reason||'обычное использование'),at:Date.now()});
    if(item.durabilityDamageLog.length>20)item.durabilityDamageLog=item.durabilityDamageLog.slice(-20);
    var api=getDurabilityApi(); if(api&&api.itemValue)item.marketValue=api.itemValue(item);
    return {ok:true,item:item,lost:loss,current:item.durability,max:d.max,broken:item.durability<=0};
  }
  function wearForAttack(item,hit){return damageDurability(item,hit?1:0,hit?'попадание оружием':'использование оружия');}
  function wearForArmor(item,damage){
    var loss=Math.max(0,Math.min(3,Math.ceil((Number(damage)||0)/10)));
    return damageDurability(item,loss,'полученный физический урон');
  }
  function guardCraft(){return isEnabled();}
  function guardRepair(){return isEnabled()?null:disabledResult('repair');}

  function patchCraft(){
    var api=global.DND_CRAFT_PROFESSIONS_V38;
    if(api){
      if(typeof api.craft==='function'&&!api.craft.__v50DlcWrapped){
        var originalCraft=api.craft;
        function craftWrapped(){if(!isEnabled())return disabledResult('craft');return originalCraft.apply(this,arguments);}
        craftWrapped.__v50DlcWrapped=true;api.craft=craftWrapped;
      }
      if(typeof api.uiCraft==='function'&&!api.uiCraft.__v50DlcWrapped){
        var originalUiCraft=api.uiCraft;
        function uiCraftWrapped(){if(!isEnabled()){var el=document.getElementById('craftingV38Result');if(el)el.innerHTML='<div style="padding:7px;color:#e99a8c">⚠️ DLC «Ремесла и износ» отключено.</div>';return disabledResult('craft');}return originalUiCraft.apply(this,arguments);}
        uiCraftWrapped.__v50DlcWrapped=true;api.uiCraft=uiCraftWrapped;
      }
    }
    var econ=getDurabilityApi();
    if(econ&&typeof econ.repairItem==='function'&&!econ.repairItem.__v50DlcWrapped){
      var originalRepair=econ.repairItem;
      function repairWrapped(){if(!isEnabled())return disabledResult('repair');return originalRepair.apply(this,arguments);}
      repairWrapped.__v50DlcWrapped=true;econ.repairItem=repairWrapped;
    }
    patchCombat();
  }
  function patchCombat(){
    var combat=global.DNDCombat;
    if(!combat)return;
    if(typeof combat.attack==='function'&&!combat.attack.__v50DlcWrapped){
      var originalAttack=combat.attack;
      function attackWrapped(attacker,target,opts){
        var result=originalAttack.apply(this,arguments);
        if(isEnabled()&&result&&result.hit&&opts){
          var weapon=opts.weapon||opts.item||opts.equippedWeapon;
          if(weapon&&Number.isFinite(Number(weapon.durabilityMax)))wearForAttack(weapon,true);
        }
        return result;
      }
      attackWrapped.__v50DlcWrapped=true;combat.attack=attackWrapped;
    }
    if(typeof combat.applyDamage==='function'&&!combat.applyDamage.__v50DlcWrapped){
      var originalDamage=combat.applyDamage;
      function damageWrapped(target,amount,type){
        var result=originalDamage.apply(this,arguments);
        if(isEnabled()&&result&&result.hpDamage>0&&(type==='дробящий'||type==='колющий'||type==='рубящий')){
          var armor=(target&&target.equippedArmor)||null;
          if(!armor&&target&&target.equipment)armor=target.equipment.armor||target.equipment.equippedArmor||null;
          if(armor&&Number.isFinite(Number(armor.durabilityMax)))wearForArmor(armor,result.hpDamage);
        }
        return result;
      }
      damageWrapped.__v50DlcWrapped=true;combat.applyDamage=damageWrapped;
    }
  }

  function applyVisibility(){
    var ids=['craftingProfessionsPanel','craftingProfessionsV38','craftingV49Economy','craftingV51Lifecycle','craftingV47Progress','craftingV48Specialties'];
    ids.forEach(function(id){var el=document.getElementById(id);if(el)el.style.display=isEnabled()?'':'none';});
    var buttons=document.querySelectorAll?document.querySelectorAll('[data-crafting-dlc-control]'):[];
    Array.prototype.forEach.call(buttons,function(el){el.style.display=isEnabled()?'':'none';});
  }
  function renderStatus(){
    var host=document.getElementById('settingsCraftingDlcStatus'),toggle=document.getElementById('settingsCraftingDlcToggle');
    if(toggle)toggle.checked=isEnabled();
    if(host)host.innerHTML=isEnabled()?'<span style="color:#8bc48b">● Включено</span> · Ремесла, профессии, качество, износ и ремонт активны.':'<span style="color:#e99a8c">● Выключено</span> · DLC не вмешивается в крафт и износ.';
  }
  function openInfo(){
    alert('Авторское ХБ-дополнение «Ремесла и износ».\n\nПо умолчанию включено. При отключении крафт, профессии, производственная экономика, качество, износ и ремонт не используются. Базовые правила D&D и боевая система не меняются.');
  }

  read();
  patchCraft();
  global.DND_CRAFTING_DLC_V50={VERSION:'50.0.0',NAME:'Авторское ХБ: Ремесла и износ',SOURCE:'Авторский модуль, необязательное DLC',DEFAULT_ENABLED:DEFAULT_ENABLED,STORAGE_KEY:STORAGE_KEY,isEnabled:isEnabled,setEnabled:setEnabled,guardCraft:guardCraft,guardRepair:guardRepair,damageDurability:damageDurability,wearForAttack:wearForAttack,wearForArmor:wearForArmor,renderStatus:renderStatus,applyVisibility:applyVisibility,openInfo:openInfo,patch:patchCraft};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){patchCraft();renderStatus();applyVisibility();});
  else {patchCraft();renderStatus();applyVisibility();}
})(window);
