(function(global){
  'use strict';
  var CLASS_IDS={
    bandit:['Бандит','Bandit','bandit'],
    circus:['Циркач','Circus','circus'],
    protector:['Заступник','Protector','protector']
  };
  function n(v,d){v=Number(v);return isFinite(v)?v:(d||0);}
  function level(hero,names){
    var classes=Array.isArray(hero&&hero.classes)?hero.classes:[];
    var total=0;
    classes.forEach(function(c){
      var namesHere=[c&&c.name,c&&c.englishName,c&&c.id].map(function(x){return String(x||'').trim().toLowerCase();});
      if(names.some(function(x){return namesHere.indexOf(String(x).toLowerCase())>=0;}))total+=Math.max(0,n(c.level,0));
    });
    if(!total){
      var fallback=[hero&&hero.className,hero&&hero.class,hero&&hero.englishClass].map(function(x){return String(x||'').trim().toLowerCase();});
      if(names.some(function(x){return fallback.indexOf(String(x).toLowerCase())>=0;}))total=Math.max(1,n(hero&&hero.level,1));
    }
    return total;
  }
  function abilityMod(hero,key){
    var scores=hero&&hero.abilityScores||hero&&hero.stats||{};
    var aliases={str:'strength',dex:'dexterity',con:'constitution',int:'intelligence',wis:'wisdom',cha:'charisma'};
    var val=scores[key]!==undefined?scores[key]:scores[aliases[key]];
    return Math.floor((n(val,10)-10)/2);
  }
  function proficiency(levelValue){return levelValue>0?Math.floor((levelValue-1)/4)+2:0;}
  function ensureResource(hero,id,max,recharge){
    hero.resources=hero.resources||{};
    var r=hero.resources[id];
    if(!r||typeof r!=='object')r=hero.resources[id]={current:max,max:max,recharge:recharge};
    else{
      var oldMax=Math.max(0,n(r.max,max)),current=Math.max(0,n(r.current,max));
      r.max=max;r.current=Math.min(max,Math.max(0,current));
      r.recharge=recharge;
    }
    return r;
  }
  function sync(hero){
    if(!hero)return {};
    var out={},l,pb;
    l=level(hero,CLASS_IDS.bandit);
    if(l){pb=proficiency(l);out.bandit=ensureResource(hero,'banditDirtyTricks',Math.max(1,pb+abilityMod(hero,'dex')),'short');}
    l=level(hero,CLASS_IDS.circus);
    if(l){pb=proficiency(l);out.circus=ensureResource(hero,'circusZap',Math.max(1,pb+abilityMod(hero,'cha')),'short');}
    l=level(hero,CLASS_IDS.protector);
    if(l){pb=proficiency(l);out.protector=ensureResource(hero,'protectorImpulses',Math.max(1,pb),'short');}
    return out;
  }
  function restore(hero,kind){
    if(!hero||!hero.resources)return {ok:false,reason:'Персонаж или ресурсы не найдены.'};
    sync(hero);
    var restored=[];
    Object.keys({banditDirtyTricks:1,circusZap:1,protectorImpulses:1}).forEach(function(id){
      var r=hero.resources[id];
      if(!r)return;
      if(kind==='short'||kind==='long'||kind==='shortRest'||kind==='longRest'){
        r.current=r.max;restored.push(id);
      }
    });
    return {ok:true,restored:restored};
  }
  function studyTarget(hero,target,ctx){
    ctx=ctx||{};
    var l=level(hero,CLASS_IDS.bandit);
    if(!l)return {ok:false,reason:'Для изучения цели нужен класс Бандит.'};
    if(!target||target.id==null)return {ok:false,reason:'Выберите конкретную цель со стабильным ID.'};
    if(ctx.visible!==true)return {ok:false,reason:'Подтвердите, что цель видна.'};
    if(ctx.distanceFt==null||!isFinite(Number(ctx.distanceFt))||Number(ctx.distanceFt)>60||Number(ctx.distanceFt)<0)return {ok:false,reason:'Цель должна находиться в пределах 60 футов.'};
    hero.classFeaturesState=hero.classFeaturesState||{};
    var state=hero.classFeaturesState.bandit||(hero.classFeaturesState.bandit={studiedTargetIds:[]});
    if(!Array.isArray(state.studiedTargetIds))state.studiedTargetIds=[];
    var id=String(target.id);
    var max=l>=11?2:1;
    state.studiedTargetIds=state.studiedTargetIds.filter(function(x){return String(x)!==id;});
    if(state.studiedTargetIds.length>=max)state.studiedTargetIds.shift();
    state.studiedTargetIds.push(id);
    return {ok:true,targetId:id,studiedTargetIds:state.studiedTargetIds.slice(),maxTargets:max};
  }
  function clearInvalidTargets(hero,validIds){
    var state=hero&&hero.classFeaturesState&&hero.classFeaturesState.bandit;
    if(!state||!Array.isArray(state.studiedTargetIds))return [];
    var set={};(validIds||[]).forEach(function(id){set[String(id)]=true;});
    state.studiedTargetIds=state.studiedTargetIds.filter(function(id){return set[String(id)];});
    return state.studiedTargetIds.slice();
  }
  function selectedSubclass(hero,names){
    var classes=Array.isArray(hero&&hero.classes)?hero.classes:[];
    var c=classes.find(function(x){return names.some(function(nm){return String(x&&x.name||'').toLowerCase()===String(nm).toLowerCase();});});
    return String(c&&c.subclass||'').toLowerCase();
  }
  function useCircusFireBreath(hero,ctx){
    ctx=ctx||{};
    var l=level(hero,CLASS_IDS.circus),sub=selectedSubclass(hero,CLASS_IDS.circus);
    if(l<3)return {ok:false,reason:'Огненное дыхание доступно с 3-го уровня Циркача.'};
    if(sub.indexOf('пожиратель огня')<0&&sub.indexOf('fire eater')<0&&sub.indexOf('fire-eater')<0)return {ok:false,reason:'Для огненного дыхания нужна специализация «Пожиратель огня».'};
    var combat=global.DNDCombat;
    if(!combat||typeof combat.savingThrow!=='function'||typeof combat.rollDice!=='function'||typeof combat.applyDamage!=='function')return {ok:false,reason:'Боевой движок не поддерживает полный цикл огненного дыхания.'};
    var targets=Array.isArray(ctx.targets)?ctx.targets:[];
    if(!targets.length)return {ok:false,reason:'Выберите хотя бы одну цель в области конуса.'};
    var normalized=[];
    for(var i=0;i<targets.length;i++){
      var item=targets[i],target=item&&item.target?item.target:item;
      var dist=item&&item.distanceFt!=null?Number(item.distanceFt):NaN;
      if(!target||target.id==null)return {ok:false,reason:'У каждой цели должен быть стабильный ID.'};
      if(!item||item.inArea!==true)return {ok:false,reason:'Подтвердите, что каждая цель находится в конусе огня.'};
      if(!isFinite(dist)||dist<0||dist>15)return {ok:false,reason:'Все цели должны находиться в пределах конуса длиной 15 футов.'};
      normalized.push({target:target,distanceFt:dist});
    }
    var resource=hero.resources&&hero.resources.circusZap;
    if(!resource||Number(resource.current)<1)return {ok:false,reason:'Недостаточно Запала.'};
    var dc=8+proficiency(l)+abilityMod(hero,'dex');
    var diceCount=l>=15?5:l>=11?4:l>=7?3:2;
    // Reserve the resource only after all input and engine prerequisites pass.
    resource.current-=1;
    var results=[];
    normalized.forEach(function(entry){
      var save=combat.savingThrow(entry.target,'dex',dc,'normal',{source:hero,saveType:'dex'});
      var roll=combat.rollDice(diceCount+'d6',false,false,hero);
      var amount=save&&save.success?Math.floor(roll.total/2):roll.total;
      var applied=combat.applyDamage(entry.target,amount,'огонь',{attackerId:hero.id,source:hero,damageSource:'circusFireBreath'});
      results.push({targetId:String(entry.target.id),dc:dc,save:save,rolled:roll.total,damage:amount,applied:applied});
    });
    return {ok:true,dc:dc,dice:diceCount+'d6',results:results,message:'Огненное дыхание: '+results.length+' целей обработано.'};
  }
  function interceptDamage(protector,target,amount,ctx){
    ctx=ctx||{};
    var l=level(protector,CLASS_IDS.protector);
    if(l<1)return {ok:false,reason:'Нужен класс Заступник.'};
    if(!target||target.id==null||String(target.id)===String(protector.id))return {ok:false,reason:'Нужен другой союзник с устойчивым ID.'};
    if(ctx.isAlly!==true)return {ok:false,reason:'Цель должна быть подтверждённым союзником.'};
    if(ctx.visible!==true)return {ok:false,reason:'Заступник должен видеть союзника.'};
    if(n(amount,0)<=0)return {ok:false,reason:'Нет урона для перехвата.'};
    var distance=Number(ctx.distanceFt);
    if(!isFinite(distance)||distance<0||distance>5)return {ok:false,reason:'Союзник должен находиться в пределах 5 футов.'};
    var turns=protector.turnResources||{};
    if(n(turns.reaction,0)<1)return {ok:false,reason:'Реакция Заступника уже потрачена.'};
    var resource=protector.resources&&protector.resources.protectorImpulses;
    if(!resource||Number(resource.current)<1)return {ok:false,reason:'Защитные импульсы закончились.'};
    var combat=global.DNDCombat;
    if(!combat||typeof combat.rollDice!=='function')return {ok:false,reason:'Боевой движок не поддерживает защитный перехват.'};
    var diceCount=l>=17?3:l>=11?2:1;
    var roll=combat.rollDice(diceCount+'d10',false,false,protector);
    var reduction=Math.max(0,n(roll&&roll.total,0)+proficiency(l));
    // Spend the reaction and impulse only after all preconditions and the roll are valid.
    resource.current-=1;
    turns.reaction=0;
    return {ok:true,reduction:Math.min(Math.max(0,n(amount,0)),reduction),rolled:roll.total,dice:diceCount+'d10',resourceRemaining:resource.current};
  }
  function hasFeature(id){return ['banditStudyTarget','circusFireBreath'].indexOf(String(id||''))>=0;}
  function useFeature(hero,id,ctx){
    ctx=ctx||{};
    if(!hero)return {ok:false,reason:'Персонаж не найден.'};
    sync(hero);
    if(String(id)==='circusFireBreath')return useCircusFireBreath(hero,ctx);
    if(String(id)!=='banditStudyTarget')return {ok:false,unsupported:true,reason:'Эта способность пока не подключена.'};
    if(level(hero,CLASS_IDS.bandit)<1)return {ok:false,reason:'Для изучения цели нужен класс Бандит.'};
    var tr=hero.turnResources||(hero.turnResources={actions:1,bonusAction:1,reaction:1});
    if(n(tr.bonusAction,0)<1)return {ok:false,reason:'Бонусное действие уже использовано.'};
    var result=studyTarget(hero,ctx.target,{visible:ctx.visible,distanceFt:ctx.distanceFt});
    if(!result.ok)return result;
    tr.bonusAction=Math.max(0,n(tr.bonusAction,1)-1);
    result.message='Цель изучена: '+String(ctx.target.name||ctx.target.id)+'.';
    return result;
  }
  global.FourCustomClassRuntime={
    VERSION:'0.1.0-stage-foundation',
    sync:sync,
    restore:restore,
    studyTarget:studyTarget,
    clearInvalidTargets:clearInvalidTargets,
    interceptDamage:interceptDamage,
    hasFeature:hasFeature,
    useFeature:useFeature,
    classLevel:level,
    proficiencyBonus:proficiency,
    abilityModifier:abilityMod
  };
})(window);
