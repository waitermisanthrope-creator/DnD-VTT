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
    max=Number.isSafeInteger(Number(max))?Math.max(0,Number(max)):0;
    var r=hero.resources[id];
    if(!r||typeof r!=='object'||Array.isArray(r))r=hero.resources[id]={current:max,max:max,recharge:recharge};
    else{
      // Missing current is a legacy migration case (start full); malformed stored
      // values must never refill a spent resource merely because Number() failed.
      var current;
      if(r.current===undefined||r.current===null)current=max;
      else{
        var parsed=Number(r.current);
        current=Number.isSafeInteger(parsed)&&parsed>=0?parsed:0;
      }
      r.max=max;r.current=Math.min(max,current);
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
    if(l){
      pb=proficiency(l);
      // Migrate the old internal key without resetting the character's spent resource.
      if(hero.resources&&hero.resources.circusResource==null&&hero.resources.circusZap){
        hero.resources.circusResource=hero.resources.circusZap;
        delete hero.resources.circusZap;
      }
      out.circus=ensureResource(hero,'circusResource',Math.max(1,pb+abilityMod(hero,'cha')),'short');
    }
    l=level(hero,CLASS_IDS.protector);
    if(l){pb=proficiency(l);out.protector=ensureResource(hero,'protectorImpulses',Math.max(1,pb),'short');}
    return out;
  }
  function restore(hero,kind){
    if(!hero||!hero.resources)return {ok:false,reason:'Персонаж или ресурсы не найдены.'};
    if(kind!=='short'&&kind!=='long'&&kind!=='shortRest'&&kind!=='longRest')
      return {ok:false,reason:'Неизвестный тип отдыха; ресурсы не восстановлены.'};
    sync(hero);
    var restored=[];
    Object.keys({banditDirtyTricks:1,circusResource:1,protectorImpulses:1}).forEach(function(id){
      var r=hero.resources[id];
      if(!r)return;
      r.current=r.max;restored.push(id);
    });
    return {ok:true,restored:restored};
  }
  function studyTarget(hero,target,ctx){
    ctx=ctx||{};
    var l=level(hero,CLASS_IDS.bandit);
    if(!l)return {ok:false,reason:'Для изучения цели нужен класс Бандит.'};
    if(!target||target.id==null||String(target.id).trim()==='')return {ok:false,reason:'Выберите конкретную цель со стабильным ID.'};
    if(hero.id!=null&&String(target.id)===String(hero.id))return {ok:false,reason:'Нельзя изучить самого себя как цель.'};
    if(ctx.visible!==true)return {ok:false,reason:'Подтвердите, что цель видна.'};
    if(ctx.distanceFt==null||!isFinite(Number(ctx.distanceFt))||Number(ctx.distanceFt)>60||Number(ctx.distanceFt)<0)return {ok:false,reason:'Цель должна находиться в пределах 60 футов.'};
    if(!hero.classFeaturesState||typeof hero.classFeaturesState!=='object'||Array.isArray(hero.classFeaturesState))hero.classFeaturesState={};
    var state=hero.classFeaturesState.bandit;
    if(!state||typeof state!=='object'||Array.isArray(state))state=hero.classFeaturesState.bandit={studiedTargetIds:[]};
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
  function clearStudiedTarget(hero,targetId){
    var state=hero&&hero.classFeaturesState&&hero.classFeaturesState.bandit;
    if(!state||!Array.isArray(state.studiedTargetIds)||targetId==null)return [];
    var id=String(targetId);
    state.studiedTargetIds=state.studiedTargetIds.filter(function(studiedId){return String(studiedId)!==id;});
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
      if(normalized.some(function(entry){return String(entry.target.id)===String(target.id);}))return {ok:false,reason:'Одна и та же цель не может быть указана в конусе огня дважды.'};
      if(!item||item.inArea!==true)return {ok:false,reason:'Подтвердите, что каждая цель находится в конусе огня.'};
      if(!isFinite(dist)||dist<0||dist>15)return {ok:false,reason:'Все цели должны находиться в пределах конуса длиной 15 футов.'};
      normalized.push({target:target,distanceFt:dist});
    }
    var resource=hero.resources&&hero.resources.circusResource;
    if(!resource||Number(resource.current)<1)return {ok:false,reason:'Недостаточно Циркового ресурса.'};
    var dc=8+proficiency(l)+abilityMod(hero,'dex');
    var diceCount=l>=15?5:l>=11?4:l>=7?3:2;
    // Resolve all saves and rolls before spending the shared resource or applying damage.
    // A failed resolver/invalid roll must not charge the Circus resource.
    var prepared=[];
    try{
      normalized.forEach(function(entry){
        var save=combat.savingThrow(entry.target,'dex',dc,'normal',{source:hero,saveType:'dex'});
        if(!save||typeof save.success!=='boolean')throw new Error('invalid save result');
        var roll=combat.rollDice(diceCount+'d6',false,false,hero);
        if(!roll||!Number.isSafeInteger(Number(roll.total))||Number(roll.total)<0)throw new Error('invalid damage roll');
        var total=Number(roll.total);
        prepared.push({entry:entry,save:save,rolled:total,damage:save.success?Math.floor(total/2):total});
      });
    }catch(error){
      return {ok:false,reason:'Не удалось безопасно рассчитать огненное дыхание; Цирковой ресурс сохранён.'};
    }
    resource.current-=1;
    var results=[];
    for(var j=0;j<prepared.length;j++){
      var staged=prepared[j],applied;
      try{
        applied=combat.applyDamage(staged.entry.target,staged.damage,'огонь',{attackerId:hero.id,source:hero,damageSource:'circusFireBreath'});
      }catch(error){
        return {ok:false,partial:true,reason:'Бой прервал применение огненного дыхания после начала действия; ресурс потрачен, проверьте уже обработанные цели.',results:results};
      }
      if(applied===false||(applied&&applied.ok===false)){
        return {ok:false,partial:true,reason:'Бой отклонил применение урона после начала огненного дыхания; ресурс потрачен, проверьте уже обработанные цели.',results:results};
      }
      results.push({targetId:String(staged.entry.target.id),dc:dc,save:staged.save,rolled:staged.rolled,damage:staged.damage,applied:applied});
    }
    return {ok:true,dc:dc,dice:diceCount+'d6',results:results,message:'Огненное дыхание: '+results.length+' целей обработано.'};
  }
  function interceptDamage(protector,target,amount,ctx){
    ctx=ctx||{};
    var l=level(protector,CLASS_IDS.protector);
    if(l<1)return {ok:false,reason:'Нужен класс Заступник.'};
    if(!target||target.id==null)return {ok:false,reason:'Нужна цель с устойчивым ID.'};
    var selfTarget=String(target.id)===String(protector.id)||(ctx.isSelf===true&&ctx.isHeroCombatant===true);
    if(selfTarget&&ctx.isSelf!==true)return {ok:false,reason:'Самозащита должна быть явно выбрана.'};
    if(!selfTarget&&ctx.isAlly!==true)return {ok:false,reason:'Цель должна быть подтверждённым союзником.'};
    if(!selfTarget&&ctx.visible!==true)return {ok:false,reason:'Заступник должен видеть союзника.'};
    if(n(amount,0)<=0)return {ok:false,reason:'Нет урона для перехвата.'};
    var distance=selfTarget&&ctx.distanceFt===undefined?0:Number(ctx.distanceFt);
    if(!isFinite(distance)||distance<0||distance>5)return {ok:false,reason:'Цель должна находиться в пределах 5 футов.'};
    var turns=protector.turnResources||{};
    if(n(turns.reaction,0)<1)return {ok:false,reason:'Реакция Заступника уже потрачена.'};
    var resource=protector.resources&&protector.resources.protectorImpulses;
    if(!resource||Number(resource.current)<1)return {ok:false,reason:'Защитные импульсы закончились.'};
    var combat=global.DNDCombat;
    if(!combat||typeof combat.rollDice!=='function')return {ok:false,reason:'Боевой движок не поддерживает защитный перехват.'};
    var diceCount=l>=17?3:l>=11?2:1;
    var roll;
    try{roll=combat.rollDice(diceCount+'d10',false,false,protector);}catch(error){return {ok:false,reason:'Не удалось выполнить защитный бросок; реакция и импульс сохранены.'};}
    if(!roll||!Number.isSafeInteger(Number(roll.total))||Number(roll.total)<0)return {ok:false,reason:'Боевой движок вернул некорректный защитный бросок; ресурсы сохранены.'};
    var reduction=Math.max(0,Number(roll.total)+proficiency(l));
    // Spend the reaction and impulse only after a valid roll.
    resource.current-=1;
    turns.reaction=0;
    return {ok:true,reduction:Math.min(Math.max(0,n(amount,0)),reduction),rolled:roll.total,dice:diceCount+'d10',resourceRemaining:resource.current};
  }
  function useProtectorZone(hero,ctx){
    ctx=ctx||{};
    var l=level(hero,CLASS_IDS.protector);
    if(l<3)return {ok:false,reason:'Страж рубежа доступен с 3-го уровня Заступника.'};
    if(selectedSubclass(hero,CLASS_IDS.protector).indexOf('страж рубежа')<0&&selectedSubclass(hero,CLASS_IDS.protector).indexOf('bastion')<0)return {ok:false,reason:'Выберите специализацию «Страж рубежа».'};
    if(ctx.actionAvailable!==true)return {ok:false,reason:'Нужно свободное бонусное действие.'};
    var tr=hero.turnResources||(hero.turnResources={actions:1,bonusAction:1,reaction:1});
    if(n(tr.bonusAction,0)<1)return {ok:false,reason:'Бонусное действие уже использовано.'};
    var resource=hero.resources&&hero.resources.protectorImpulses;
    if(!resource||n(resource.current,0)<1)return {ok:false,reason:'Защитные импульсы закончились.'};
    var round=Math.max(1,n(ctx.round,1));
    if(!hero.classFeaturesState||typeof hero.classFeaturesState!=='object'||Array.isArray(hero.classFeaturesState))hero.classFeaturesState={};
    var state=hero.classFeaturesState.protector;
    if(!state||typeof state!=='object'||Array.isArray(state))state=hero.classFeaturesState.protector={};
    if(state.zone&&state.zone.active&&round<state.zone.expiresRound)return {ok:false,reason:'Оборонительная зона уже активна.'};
    resource.current-=1;tr.bonusAction-=1;
    state.zone={active:true,createdRound:round,expiresRound:round+10,radiusFt:l>=11?15:10,saveBonus:1,advantageAtLevel17:l>=17,lastAdvantageRound:null};
    return {ok:true,zone:state.zone,resourceRemaining:resource.current,message:'Оборонительная зона создана на 1 минуту.'};
  }
  function protectorZoneSave(protector,ally,ctx){
    ctx=ctx||{};
    var l=level(protector,CLASS_IDS.protector),state=protector&&protector.classFeaturesState&&protector.classFeaturesState.protector,zone=state&&state.zone;
    if(l<3||!zone||!zone.active)return {ok:false,bonus:0,reason:'Оборонительная зона не активна.'};
    var activeConditions=protector&&protector.activeConditions||{},conditions=protector&&protector.conditions||{};if(ctx.protectorIncapacitated===true||activeConditions['Недееспособен']||conditions['Недееспособен']||activeConditions['Бессознателен']||conditions['Бессознателен']||activeConditions['Парализован']||conditions['Парализован']||activeConditions['Оглушён']||conditions['Оглушён']||activeConditions['Оглушен']||conditions['Оглушен']||activeConditions['Окаменел']||conditions['Окаменел']){zone.active=false;zone.endedReason='protector-incapacitated';return {ok:false,bonus:0,reason:'Зона заканчивается, когда Заступник недееспособен.'};}
    var round=Math.max(1,n(ctx.round,1));
    if(round>=zone.expiresRound){zone.active=false;return {ok:false,bonus:0,reason:'Время оборонительной зоны истекло.'};}
    if(ctx.forcedMovementSave!==true||ctx.isAlly!==true||ctx.visible!==true)return {ok:false,bonus:0,reason:'Нужен спасбросок видимого союзника против принудительного перемещения.'};
    var distance=Number(ctx.distanceFt);
    if(!isFinite(distance)||distance<0||distance>zone.radiusFt)return {ok:false,bonus:0,reason:'Союзник находится вне оборонительной зоны.'};
    var result={ok:true,bonus:1,advantage:false,radiusFt:zone.radiusFt};
    if(l>=17&&zone.lastAdvantageRound!==round&&ctx.requestAdvantage===true){result.advantage=true;zone.lastAdvantageRound=round;}
    return result;
  }
  function rescueAlly(hero,ctx){
    ctx=ctx||{};
    var l=level(hero,CLASS_IDS.protector),target=ctx.target;
    if(l<3)return {ok:false,reason:'Спаситель доступен с 3-го уровня Заступника.'};
    if(selectedSubclass(hero,CLASS_IDS.protector).indexOf('спаситель')<0&&selectedSubclass(hero,CLASS_IDS.protector).indexOf('savior')<0&&selectedSubclass(hero,CLASS_IDS.protector).indexOf('saviour')<0)return {ok:false,reason:'Выберите специализацию «Спаситель».'};
    if(!target||target.id==null)return {ok:false,reason:'Выберите конкретного союзника.'};
    if(ctx.isAlly!==true||ctx.visible!==true)return {ok:false,reason:'Цель должна быть видимым союзником.'};
    if(n(target.hp, target.hpCurrent)>0)return {ok:false,reason:'Спасение доступно, только когда союзник упал до 0 HP.'};
    if(target.stable===true||(target.deathSaves&&Number(target.deathSaves.successes)>=3))return {ok:false,reason:'Союзник уже стабилизирован; способность не требуется.'};
    if(target.instantDeath===true||target.dead===true||target.deathState==='dead')return {ok:false,reason:'Мгновенно погибшего персонажа спасти нельзя.'};
    var distance=Number(ctx.distanceFt);
    if(!isFinite(distance)||distance<0||distance>5)return {ok:false,reason:'Союзник должен находиться в пределах 5 футов.'};
    if(ctx.cellAvailable!==true||!ctx.freeCell||!isFinite(Number(ctx.freeCell.x))||!isFinite(Number(ctx.freeCell.y)))return {ok:false,reason:'Нужно выбрать и подтвердить свободную клетку для перемещения.'};
    var maxMove=l>=17?10:5,move=Number(ctx.moveFt==null?maxMove:ctx.moveFt);
    if(!isFinite(move)||move<0||move>maxMove)return {ok:false,reason:'Перемещение превышает доступную дистанцию '+maxMove+' футов.'};
    var cellDistance=Number(ctx.distanceToCellFt);if(!isFinite(cellDistance)||cellDistance<0||cellDistance>maxMove)return {ok:false,reason:'Выбранная клетка должна находиться в пределах перемещения '+maxMove+' футов.'};
    var tr=hero.turnResources||(hero.turnResources={actions:1,bonusAction:1,reaction:1});
    if(n(tr.reaction,0)<1)return {ok:false,reason:'Реакция уже потрачена.'};
    var resource=hero.resources&&hero.resources.protectorImpulses;
    if(!resource||n(resource.current,0)<1)return {ok:false,reason:'Защитные импульсы закончились.'};
    var combat=global.DNDCombat;
    if(l>=11&&(!combat||typeof combat.rollDice!=='function'))return {ok:false,reason:'Боевой движок для временных HP недоступен.'};
    var temp=0;
    if(l>=11){
      var roll;
      try{roll=combat.rollDice('1d8',false,false,hero);}catch(error){return {ok:false,reason:'Не удалось рассчитать временные HP; реакция и импульс сохранены.'};}
      if(!roll||!Number.isSafeInteger(Number(roll.total))||Number(roll.total)<0)return {ok:false,reason:'Боевой движок вернул некорректный бросок; реакция и импульс сохранены.'};
      temp=Math.max(0,Number(roll.total)+proficiency(l));
    }
    resource.current-=1;tr.reaction=0;
    target.position={x:Number(ctx.freeCell.x),y:Number(ctx.freeCell.y)};
    target.x=Number(ctx.freeCell.x);target.y=Number(ctx.freeCell.y);
    target.stable=true;target.defeated=false;
    target.deathSaves=target.deathSaves||{successes:0,failures:0};target.deathSaves.successes=3;
    if(l>=11)target.tempHp=Math.max(n(target.tempHp,0),temp);
    target.classFeaturesState=target.classFeaturesState||{};
    target.classFeaturesState.protectorRescue={sourceId:hero.id==null?null:String(hero.id),noOpportunityAttacksFrom:ctx.chosenEnemyId==null?null:String(ctx.chosenEnemyId),round:Math.max(1,n(ctx.round,1))};
    return {ok:true,targetId:String(target.id),position:target.position,movementFt:move,tempHpGranted:temp,resourceRemaining:resource.current,message:'Союзник стабилизирован и перемещён; HP не восстановлены.'};
  }
  function useBanditTrip(hero,ctx){
    ctx=ctx||{};
    var l=level(hero,CLASS_IDS.bandit);
    if(l<1)return {ok:false,reason:'Для подсечки нужен класс Бандит.'};
    var target=ctx.target;
    if(ctx.attackHit!==true)return {ok:false,reason:'Подсечка применяется только после подтверждённого попадания рукопашной атакой.'};
    if(!target||target.id==null||String(target.id)===String(hero.id))return {ok:false,reason:'Выберите конкретную цель.'};
    var dist=Number(ctx.distanceFt);
    if(!isFinite(dist)||dist<0||dist>5)return {ok:false,reason:'Цель должна быть в пределах досягаемости 5 футов.'};
    if(target.classFeaturesState&&target.classFeaturesState.banditTripSpeedLock)return {ok:false,reason:'Цель уже находится под эффектом подсечки.'};
    if(!isFinite(Number(target.speed)))return {ok:false,reason:'У цели не задана скорость; подсечка не применена.'};
    var resource=hero.resources&&hero.resources.banditDirtyTricks;
    var combat=global.DNDCombat;
    if(!resource||Number(resource.current)<1)return {ok:false,reason:'Грязные приёмы закончились.'};
    if(!combat||typeof combat.savingThrow!=='function')return {ok:false,reason:'Боевой движок спасбросков недоступен.'};
    var dc=8+proficiency(l)+abilityMod(hero,'dex');
    var save;
    try{save=combat.savingThrow(target,'str',dc,'normal',{source:hero,saveType:'str'});}catch(error){return {ok:false,reason:'Не удалось выполнить спасбросок подсечки; ресурс сохранён.'};}
    if(!save||typeof save.success!=='boolean')return {ok:false,reason:'Боевой движок не вернул результат спасброска; ресурс сохранён.'};
    resource.current-=1;
    if(!save.success){
      target.classFeaturesState=target.classFeaturesState||{};
      target.classFeaturesState.banditTripSpeedLock={originalSpeed:Number(target.speed),sourceId:hero.id==null?null:String(hero.id)};
      target.speed=0;
    }
    return {ok:true,dc:dc,save:save,applied:!!(save&&!save.success),resourceRemaining:resource.current,message:save&&save.success?'Цель устояла против подсечки.':'Подсечка успешна: скорость цели равна 0 до начала её следующего хода.'};
  }
  function useBanditReactionBreak(hero,ctx){
    ctx=ctx||{};
    var l=level(hero,CLASS_IDS.bandit),target=ctx.target;
    if(l<1)return {ok:false,reason:'Нужен класс Бандит.'};
    if(ctx.attackHit!==true)return {ok:false,reason:'Срыв реакции применяется только после подтверждённого попадания.'};
    if(!target||target.id==null||String(target.id)===String(hero.id))return {ok:false,reason:'Выберите конкретную враждебную цель.'};
    if(!target.turnResources||Number(target.turnResources.reaction||0)<1)return {ok:false,reason:'У цели уже нет доступной реакции.'};
    var resource=hero.resources&&hero.resources.banditDirtyTricks;
    if(!resource||Number(resource.current)<1)return {ok:false,reason:'Грязные приёмы закончились.'};
    if(!hero.classFeaturesState||typeof hero.classFeaturesState!=='object'||Array.isArray(hero.classFeaturesState))hero.classFeaturesState={};
    resource.current-=1;
    target.turnResources.reaction=0;
    target.classFeaturesState=target.classFeaturesState&&typeof target.classFeaturesState==='object'&&!Array.isArray(target.classFeaturesState)?target.classFeaturesState:{};
    target.classFeaturesState.banditReactionBreak={sourceId:hero.id==null?null:String(hero.id),appliedAtTurnCount:n(target.turnCount,0)};
    return {ok:true,targetId:String(target.id),resourceRemaining:resource.current,message:'Срыв реакции: цель теряет доступную реакцию до начала своего следующего хода.'};
  }
  function useBanditDistractingManeuver(hero,ctx){
    ctx=ctx||{};
    var l=level(hero,CLASS_IDS.bandit),target=ctx.target;
    if(l<1)return {ok:false,reason:'Нужен класс Бандит.'};
    if(!target||target.id==null||String(target.id)===String(hero.id))return {ok:false,reason:'Выберите конкретную цель.'};
    if(ctx.visible!==true)return {ok:false,reason:'Подтвердите, что цель видна.'};
    var state=hero.classFeaturesState&&hero.classFeaturesState.bandit;
    if(!state||!Array.isArray(state.studiedTargetIds)||state.studiedTargetIds.map(String).indexOf(String(target.id))<0)return {ok:false,reason:'Сначала изучите эту цель.'};
    var tr=hero.turnResources||(hero.turnResources={action:true,bonusAction:true,reaction:true});
    if(n(tr.bonusAction,0)<1)return {ok:false,reason:'Бонусное действие уже использовано.'};
    var resource=hero.resources&&hero.resources.banditDirtyTricks;
    if(!resource||Number(resource.current)<1)return {ok:false,reason:'Грязные приёмы закончились.'};
    hero.classFeaturesState=hero.classFeaturesState&&typeof hero.classFeaturesState==='object'&&!Array.isArray(hero.classFeaturesState)?hero.classFeaturesState:{};
    hero.classFeaturesState.bandit=hero.classFeaturesState.bandit||state;
    hero.classFeaturesState.bandit.distractingTargetId=String(target.id);
    hero.classFeaturesState.bandit.distractingUntilTurnCount=n(hero.turnCount,0)+1;
    resource.current-=1;tr.bonusAction=0;
    return {ok:true,targetId:String(target.id),resourceRemaining:resource.current,message:'Отвлекающий манёвр подготовлен: следующая атака Бандита по изученной цели получает преимущество.'};
  }
  function onTurnStart(hero){
    if(!hero||!hero.classFeaturesState||typeof hero.classFeaturesState!=='object')return false;
    var changed=false;
    var state=hero.classFeaturesState.banditTripSpeedLock;
    if(state){
      hero.speed=Number(state.originalSpeed);
      delete hero.classFeaturesState.banditTripSpeedLock;
      changed=true;
    }
    // A distracting maneuver lasts only until the Bandit's next turn if unused.
    var bandit=hero.classFeaturesState.bandit;
    if(bandit&&bandit.distractingTargetId!=null){
      delete bandit.distractingTargetId;
      delete bandit.distractingUntilTurnCount;
      changed=true;
    }
    return changed;
  }
  function hasFeature(id){return ['banditStudyTarget','banditTrip','banditReactionBreak','banditDistractingManeuver','circusFireBreath','protectorZone','protectorRescue'].indexOf(String(id||''))>=0;}
  function useFeature(hero,id,ctx){
    ctx=ctx||{};
    if(!hero)return {ok:false,reason:'Персонаж не найден.'};
    sync(hero);
    if(String(id)==='banditTrip')return useBanditTrip(hero,ctx);
    if(String(id)==='banditReactionBreak')return useBanditReactionBreak(hero,ctx);
    if(String(id)==='banditDistractingManeuver')return useBanditDistractingManeuver(hero,ctx);
    if(String(id)==='protectorZone')return useProtectorZone(hero,ctx);
    if(String(id)==='protectorRescue')return rescueAlly(hero,ctx);
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
    clearStudiedTarget:clearStudiedTarget,
    interceptDamage:interceptDamage,
    protectorZoneSave:protectorZoneSave,
    hasFeature:hasFeature,
    useFeature:useFeature,
    onTurnStart:onTurnStart,
    classLevel:level,
    proficiencyBonus:proficiency,
    abilityModifier:abilityMod
  };
})(window);
