/**
 * content_framework.js
 * ------------------------------------------------------------------
 * ЧТО ЭТО ЗА ФАЙЛ:
 * Универсальный реестр расширяемого контента: дополнительных классов,
 * подклассов, способностей и ресурсов. Нужен, чтобы новые контент-паки
 * подключались к VTT без переписывания боевого ядра.
 *
 * КАК РАБОТАЕТ:
 * - DNDContent.registerClass(pack) регистрирует полноценный класс;
 * - pack.features содержит runtime-описания способностей;
 * - pack.subclasses содержит варианты подкласса;
 * - validatePack() проверяет структуру перед регистрацией;
 * - class_features_engine.js вызывает внешние хуки паков при сборке,
 *   использовании способностей и расчёте боевых модификаторов.
 *
 * ОСНОВНЫЕ ПЕРЕМЕННЫЕ:
 * registry.classes, registry.subclasses, featureIndex, pack.source,
 * feature.id/level/action/target/rangeFt/recharge.
 *
 * ИСТОЧНИК:
 * Технический слой проекта. Конкретные контент-паки обязаны указывать
 * собственный источник/лицензионную пометку и не должны смешиваться с
 * ядром 5e без явной маркировки.
 *
 * НЕ ИЗМЕНЯЕТ Wallpapers.js/Ambiences.js.
 * ------------------------------------------------------------------
 */
(function(global){
  'use strict';
  var registry={classes:{},sources:{},enabled:{}};
  function loadEnabled(id){try{var raw=global.localStorage&&localStorage.getItem('dndContentEnabled');var map=raw?JSON.parse(raw):{};return map[id]!==false;}catch(e){return true;}}
  function saveEnabled(){try{if(global.localStorage)localStorage.setItem('dndContentEnabled',JSON.stringify(registry.enabled));}catch(e){}}
  var featureIndex={};
  var featureIds={};
  function clone(v){if(v===undefined)return v;try{return JSON.parse(JSON.stringify(v));}catch(e){return v;}}
  function validString(v){return typeof v==='string'&&v.trim().length>0;}
  function validatePack(pack){
    var errors=[];
    if(!pack||!validString(pack.id))errors.push('pack.id');
    if(!validString(pack.name))errors.push('pack.name');
    if(!validString(pack.source))errors.push('pack.source');
    if(!Array.isArray(pack.features))errors.push('pack.features');
    if(!Array.isArray(pack.subclasses))errors.push('pack.subclasses');
    (pack.features||[]).forEach(function(f,i){if(!validString(f.id))errors.push('features['+i+'].id');if(!validString(f.name))errors.push('features['+i+'].name');});
    (pack.subclasses||[]).forEach(function(s,i){if(!validString(s.id))errors.push('subclasses['+i+'].id');});
    return {ok:!errors.length,errors:errors};
  }
  function indexPack(pack){
    function put(f,extra){var key=pack.id+'::'+f.id;var entry=Object.assign({packId:pack.id,className:pack.name},extra||{},clone(f));featureIndex[key]=entry;featureIds[f.id]=featureIds[f.id]||[];if(featureIds[f.id].indexOf(key)<0)featureIds[f.id].push(key);if(!featureIndex[f.id])featureIndex[f.id]=entry;}
    (pack.features||[]).forEach(function(f){put(f);});
    (pack.subclasses||[]).forEach(function(s){(s.features||[]).forEach(function(f){put(f,{subclassId:s.id});});});
  }
  function registerClass(pack){
    var check=validatePack(pack);if(!check.ok)return check;
    registry.classes[pack.name]=clone(pack);registry.enabled[pack.id]=loadEnabled(pack.id);if(pack.hooks)registry.classes[pack.name].hooks=pack.hooks;registry.sources[pack.id]={id:pack.id,name:pack.name,source:pack.source,license:pack.license||'unspecified'};indexPack(pack);
    return {ok:true,pack:registry.classes[pack.name]};
  }
  function getClass(name){return registry.classes[name]||null;}
  function getFeature(id,packId){if(packId&&featureIndex[packId+'::'+id])return featureIndex[packId+'::'+id];var keys=featureIds[id]||[];return keys.length===1?featureIndex[keys[0]]:featureIndex[id]||null;}
  function listClasses(){return Object.keys(registry.classes).filter(function(k){var p=registry.classes[k];return registry.enabled[p.id]!==false;}).map(function(k){var p=registry.classes[k];return {id:p.id,name:p.name,source:p.source,license:p.license||'unspecified',enabled:true};});}
  function listAllClasses(){return Object.keys(registry.classes).map(function(k){var p=registry.classes[k];return {id:p.id,name:p.name,source:p.source,license:p.license||'unspecified',enabled:registry.enabled[p.id]!==false};});}
  function isEnabled(id){return registry.enabled[id]!==false;}
  function setEnabled(id,on){if(!registry.sources[id])return false;registry.enabled[id]=!!on;saveEnabled();return true;}
  function listSubclasses(name){var p=getClass(name);return p?(p.subclasses||[]).map(clone):[];}
  function availableFeatures(hero,name){var p=getClass(name),lvl=0;if(!p||!hero)return[];var c=(hero.classes||[]).find(function(x){return String(x.name)===name;});lvl=c?Number(c.level)||0:0;var out=(p.features||[]).filter(function(f){return lvl>=(Number(f.level)||1);}).map(clone);var sub=c&&c.subclass;var s=(p.subclasses||[]).find(function(x){return x.name===sub||x.id===sub;});if(s)(s.features||[]).forEach(function(f){if(lvl>=(Number(f.level)||1))out.push(clone(f));});return out;}
  function invoke(packName,hero,id,ctx){
    var p=getClass(packName),f=getFeature(id,p&&p.id);
    // If an ID is shared by multiple subclass features, resolve it against the
    // hero's actually selected subclass instead of whichever duplicate was
    // indexed last.
    if(p&&hero&&hero.classes){
      var c0=hero.classes.find(function(x){return String(x.name)===String(p.name);});
      var selected0=c0&&c0.subclass;
      var candidates=(featureIds[id]||[]).map(function(k){return featureIndex[k];}).filter(function(x){return x&&x.packId===p.id;});
      var exact=candidates.find(function(x){return x.subclassId&&String(x.subclassId)===String(selected0);});
      var base=candidates.find(function(x){return !x.subclassId;});
      if(exact)f=exact;else if(base)f=base;
    }
    if(p&&registry.enabled[p.id]===false)return {ok:false,message:'Контент-пак отключён в каталоге.'};
    if(!p||!f||f.packId!==p.id)return null;
    var c=(hero&&hero.classes||[]).find(function(x){return String(x.name)===String(p.name);});
    var heroLevel=c?Number(c.level)||0:0, featureLevel=Number(f.level)||1;
    if(!c||heroLevel<featureLevel)return {ok:false,unavailable:true,message:'Способность недоступна на текущем уровне класса.'};
    if(f.subclassId){
      var selected=c.subclass;
      if(String(selected)!==String(f.subclassId)){
        var sub=p.subclasses&&p.subclasses.find(function(x){return String(x.id)===String(selected)||String(x.name)===String(selected);});
        if(!sub||String(sub.id)!==String(f.subclassId))return {ok:false,unavailable:true,message:'Способность не принадлежит выбранному подклассу.'};
      }
    }
    if(typeof p.hooks==='object'&&typeof p.hooks.useFeature==='function')return p.hooks.useFeature(hero,id,ctx||{},f);
    return null;
  }
  global.DNDContent={VERSION:'1.1.0',registry:registry,validatePack:validatePack,registerClass:registerClass,getClass:getClass,getFeature:getFeature,listClasses:listClasses,listAllClasses:listAllClasses,isEnabled:isEnabled,setEnabled:setEnabled,listSubclasses:listSubclasses,availableFeatures:availableFeatures,invoke:invoke};
})(window);
