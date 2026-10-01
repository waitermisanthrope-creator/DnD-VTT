/**
 * combat_engine.js
 * ------------------------------------------------------------------
 * ЧТО ЭТО ЗА ФАЙЛ:
 * Боевой слой D&D 5e 2014 поверх rulesEngine.js: урон, сопротивления,
 * уязвимость, иммунитет, временные HP, спасброски, death saves,
 * состояния и быстрый запуск encounter.
 *
 * КАК РАБОТАЕТ:
 * - не создаёт отдельное состояние персонажа: работает с currentChar;
 * - encounter хранится в currentChar.encounters;
 * - активный бой использует currentChar.initiativeTracker;
 * - все формулы доступны через window.DNDCombat;
 * - UI автоматически добавляется к существующей вкладке «Дайсы».
 *
 * ОСНОВНЫЕ ПЕРЕМЕННЫЕ:
 * currentChar, currentChar.encounters, currentChar.initiativeTracker,
 * DNDClassFeatures, attackModifiers и классовые ресурсы персонажа,
 * combatant.conditions, combatant.resistances, combatant.immunities,
 * combatant.vulnerabilities, combatant.deathSaves.
 *
 * НЕ ИЗМЕНЯЕТ Wallpapers.js/Ambiences.js.
 * ------------------------------------------------------------------
 */
(function(global){
  'use strict';
  var DAMAGE_TYPES=['кислота','дробящий','холод','огонь','сила','молния','некротический','колющий','яд','психический','излучение','рубящий','гром','некротический','сияние'];
  var CONDITIONS=['Ослеплён','Очарован','Оглушён','Испуган','Захвачен','Недееспособен','Невидим','Парализован','Окаменел','Отравлен','Сбит с ног','Истощение','Опутан'];

  function num(v,d){var n=Number(v);return isFinite(n)?n:(d||0);}
  function normList(v){ if(Array.isArray(v)) return v.map(function(x){return String(x).toLowerCase().trim();}); if(typeof v==='string') return v.split(',').map(function(x){return x.toLowerCase().trim();}).filter(Boolean); return []; }
  function hasType(list,type){ return normList(list).indexOf(String(type||'').toLowerCase().trim())>=0; }
  function rollDie(sides){return Math.floor(Math.random()*sides)+1;}
  function parseDice(expr){ return global.DNDRules && global.DNDRules.parseDice ? global.DNDRules.parseDice(expr) : {groups:[{count:1,sides:6}],constant:0}; }
  function rollDice(expr,critical,maximize){
    var p=parseDice(expr), total=num(p.constant), rolls=[];
    p.groups.forEach(function(g){
      var count=Math.max(0,num(g.count,1))*(critical?2:1);
      for(var i=0;i<count;i++){var r=maximize?Math.max(1,num(g.sides,6)):rollDie(Math.max(1,num(g.sides,6)));rolls.push(r);total+=r;}
    });
    return {total:total,rolls:rolls,expression:String(expr||'1d6'),critical:!!critical,maximized:!!maximize};
  }
  function effectiveDamage(target,amount,type,opts){
    opts=opts||{};
    amount=Math.max(0,Math.floor(num(amount)));
    var note='';
    type=String(type||'').toLowerCase().trim();
    var homunculusState=target&&target.classFeaturesState||{},homunculusOwner=homunculusState.alchemistHomunculusOwner;
    if(opts.isBomb&&homunculusOwner!=null&&opts.attackerId!=null&&String(homunculusOwner)===String(opts.attackerId))return{raw:amount,amount:0,mode:'owner-bomb-immunity',note:'Гомункул невосприимчив к бомбам создателя',type:type};
    var physical=(type==='дробящий'||type==='колющий'||type==='рубящий'||type==='bludgeoning'||type==='piercing'||type==='slashing');
    var pugilistState=target&&target.classFeaturesState||{},digDeep=pugilistState.pugilistDigDeepActive;
    var digDeepTypes=['дробящий','колющий','рубящий','bludgeoning','piercing','slashing'];
    var pugilistDigDeepResistant=!!(digDeep&&Number(digDeep.roundsRemaining)>0&&digDeepTypes.indexOf(type)>=0);
    var raging=physical&&global.DNDClassFeatures&&global.DNDClassFeatures.activeRage&&global.DNDClassFeatures.activeRage(target);
    var rm=target&&target.raceMechanics||{};
    var raceImmune=(type==='яд'&&rm.poisonImmunity);
    var raceResistant=(type==='яд'&&rm.poisonResistance)||(type==='огонь'&&rm.fireResistance)||(type==='холод'&&rm.coldResistance)||(type==='кислота'&&rm.acidResistance)||(type==='некротический'&&rm.necroticResistance)||(type==='излучение'&&rm.radiantResistance)||(type==='психический'&&rm.psychicResistance);
    if(raceImmune||hasType(target && target.immunities,type)){if(opts.immunityBecomesResistance)return {raw:amount,amount:Math.floor(amount/2),mode:'immunity-as-resistance',note:'Иммунитет считается сопротивлением',type:type};return {raw:amount,amount:0,mode:'immune',note:'Иммунитет',type:type};}
    var witchImperil=target&&target.witchImperil&&String(target.witchImperil.damageType||'').toLowerCase()===type;
    var witchElemental=target&&target.witchElementalResistance&&String(target.witchElementalResistance).toLowerCase()===type;
    var grafts=target&&target.classFeaturesState&&Array.isArray(target.classFeaturesState.alchemistGrafts)?target.classFeaturesState.alchemistGrafts:[];var graftResistant=grafts.some(function(g){return g&&['Энергетический шов','Шкура дракона'].indexOf(g.name)>=0&&String(g.resistanceType||'')===String(type||'');});
    var targetClasses=target&&target.classes||[],madBomber=targetClasses.find(function(c){return c&&(c.name==='Алхимик'||c.englishName==='Alchemist')&&(c.subclass==='madBomber'||c.subclass==='Безумный бомбометатель')&&Number(c.level)>=10;}),madBomberResistance=!!(madBomber&&target.classFeaturesState&&target.classFeaturesState.alchemistExplosionResistanceType===type);
    var targetClassesForSlime=target&&target.classes||[],oozeRancher=targetClassesForSlime.find(function(c){return c&&(c.name==='Алхимик'||c.englishName==='Alchemist')&&(c.subclass==='oozeRancher'||c.subclass==='Разводчик слизи')&&Number(c.level)>=3;}),slimeAcidResistance=!!(oozeRancher&&type==='кислота');
    var resistant=!opts.ignoreResistance&&!witchImperil&&(raging||pugilistDigDeepResistant||raceResistant||witchElemental||graftResistant||madBomberResistance||slimeAcidResistance||hasType(target && target.resistances,type));
    var vulnerable=hasType(target && target.vulnerabilities,type);
    if(resistant&&vulnerable){
      note='Сопротивление и уязвимость взаимно компенсированы';
    }else if(vulnerable){
      amount*=2;note='Уязвимость ×2';
    }else if(resistant){
      amount=Math.floor(amount/2);note=pugilistDigDeepResistant?'Сопротивление «Соберись с силами» 1/2':raging?'Сопротивление от Ярости 1/2':'Сопротивление 1/2';
    }
    return {raw:num(amount),amount:amount,mode:note||'normal',note:note,type:type};
  }
  function normalizeDamageParts(amount,type,opts){
    opts=opts||{};
    var parts=Array.isArray(opts.damageParts)?opts.damageParts:[];
    if(!parts.length)parts=[{amount:num(amount),damageType:type||''}];
    return parts.map(function(part){return {amount:Math.max(0,num(part&&part.amount)),damageType:String(part&&part.damageType||type||'').toLowerCase().trim(),label:part&&part.label||''};}).filter(function(part){return part.amount>0;});
  }
  function addTempHpForWitch(target,amount){
    if(!target)return;
    var current=Math.max(num(target.tempHp),num(target.hpTemp));
    var next=Math.max(current,Math.max(1,num(amount)));
    target.tempHp=next;target.hpTemp=next;
  }
  function applyDamage(target,amount,type,opts){
    opts=opts||{};
    var reaction=null, reactionResult=null;
    var rawParts=normalizeDamageParts(amount,type,opts);
    if(target&&target.classFeaturesState&&target.classFeaturesState.alchemistDebuffs&&target.classFeaturesState.alchemistDebuffs.oilCoated&&rawParts.some(function(p){return p.damageType==='огонь';})){var oilDamage=rollDice('1d6').total;rawParts.push({amount:oilDamage,damageType:'огонь',label:'Масляная бомба'});target.classFeaturesState.alchemistDebuffs.oilCoated=false;}
    var rawTotal=rawParts.reduce(function(sum,p){return sum+p.amount;},0);
    var reactionCtx={amount:rawTotal,damageType:type||'',source:opts.source||'generic',attackKind:opts.attackKind||'',visible:opts.visible!==false,projectile:!!opts.projectile,fall:!!opts.fall,critical:!!opts.critical,damageParts:rawParts.map(function(x){return {amount:x.amount,damageType:x.damageType,label:x.label||''};})};
    var perfumeSource=opts.attacker,perfumeTargetId=target&&(target.id||target.entityId),perfumeSourceClass=(perfumeSource&&perfumeSource.classes||[]).find(function(cl){return cl&&(cl.name==='Алхимик'||cl.englishName==='Alchemist')&&(cl.subclass==='amorist'||cl.subclass==='Аморист')&&Number(cl.level)>=10;});if(perfumeSourceClass&&perfumeTargetId){var perfumeHero=global.currentChar||global.currentCharacter||{},perfumeRound=Number(perfumeHero.initiativeTracker&&perfumeHero.initiativeTracker.round)||1,perfumeState=perfumeSource.classFeaturesState=perfumeSource.classFeaturesState||{};perfumeState.alchemistPerfumeImmuneUntilByTarget=perfumeState.alchemistPerfumeImmuneUntilByTarget||{};perfumeState.alchemistPerfumeImmuneUntilByTarget[String(perfumeTargetId)]=perfumeRound+600;}
    if(global.DNDClassFeatures&&typeof global.DNDClassFeatures.reactionOptions==='function') reaction=global.DNDClassFeatures.reactionOptions(target,reactionCtx);
    if(opts.reactionChoice&&global.DNDClassFeatures&&typeof global.DNDClassFeatures.resolveReaction==='function'){ reactionResult=global.DNDClassFeatures.resolveReaction(target,opts.reactionChoice,reactionCtx); if(reactionResult&&reactionResult.ok) amount=reactionResult.remainingAmount; }
    var wardAbsorbed=0,wardState=target&&target.classFeaturesState;
    // Resolve resistance/vulnerability/immunity per damage component. This is required
    // for mixed hits such as weapon damage + Divine Smite (different damage types).
    var resolvedParts=rawParts.map(function(part){return Object.assign({},part,effectiveDamage(target,part.amount,part.damageType,opts));});
    var damageBeforeWard=resolvedParts.reduce(function(sum,p){return sum+num(p.amount);},0);
    if(damageBeforeWard>0&&wardState&&num(wardState.arcaneWard)>0){
      wardAbsorbed=Math.min(damageBeforeWard,num(wardState.arcaneWard));
      wardState.arcaneWard=num(wardState.arcaneWard)-wardAbsorbed;
      var left=wardAbsorbed;
      resolvedParts.forEach(function(part){var take=Math.min(num(part.amount),left);part.wardAbsorbed=take;part.amount-=take;left-=take;});
    }
    var r={raw:rawTotal,amount:resolvedParts.reduce(function(sum,p){return sum+num(p.amount);},0),note:resolvedParts.map(function(p){return p.note;}).filter(Boolean).filter(function(v,i,a){return a.indexOf(v)===i;}).join('; ')};
    if(target&&target.witchWard&&r.amount>0){var wardReduce=Math.min(3,r.amount);r.amount-=wardReduce;r.note=(r.note?r.note+'; ':'')+'Hex Ward: -'+wardReduce+' урона';}
    if(target&&target.witchBleedingUntil&&r.amount>0){var bleed=rollDice('1d4').total;r.amount+=bleed;r.note=(r.note?r.note+'; ':'')+'Bleeding: +'+bleed+' урона';}
    if(target&&target.classFeaturesState&&target.classFeaturesState&&target.classFeaturesState.invulnerability50&&r.amount>0){var inv=Math.min(50,r.amount);r.amount-=inv;target.classFeaturesState.witch.invulnerability50=false;r.note=(r.note?r.note+'; ':'')+'Неуязвимость: -'+inv+' урона';}
    if(reactionResult&&reactionResult.id==='relentlessRage'&&reactionResult.keptAtOne){ target.hp=1;target.hitPoints=1;target.defeated=false; return {amount:0,hpDamage:0,tempAbsorbed:0,wardAbsorbed:wardAbsorbed,hp:1,tempHp:num(target.tempHp),defeated:false,note:'Неукротимая ярость: HP сохранены на 1',concentration:null,reaction:reactionResult,reactionWindow:null}; }
    var hp=num(target.hp), temp=num(target.tempHp);
    var damageTaken=r.amount;
    var absorbed=Math.min(temp,damageTaken); target.tempHp=temp-absorbed;
    var hpDamage=damageTaken-absorbed; target.hp=Math.max(0,hp-hpDamage);
    if(damageTaken>0&&target.classFeaturesState&&target.classFeaturesState.alchemistDebuffs&&target.classFeaturesState.alchemistDebuffs.endsOnDamage){var pher=target.classFeaturesState.alchemistDebuffs;if(target.conditions)delete target.conditions['Очарован'];if(target.activeConditions)delete target.activeConditions['Очарован'];pher.conditionsApplied=(pher.conditionsApplied||[]).filter(function(x){return x!=='Очарован';});delete pher.endsOnDamage;if(!pher.oilCoated&&!pher.smokeCloud&&!pher.conditionsApplied.length){delete pher.sourceId;delete pher.sourceName;delete pher.expires;if(!Object.keys(pher).length)delete target.classFeaturesState.alchemistDebuffs;}}
    var necromanticRevival=false,alchemistState=target&&target.classFeaturesState;
    if(target.hp<=0&&alchemistState&&alchemistState.xenoNecroticReady&&!alchemistState.xenoNecroticUsed){
      var alchemistLevel=(target.classes||[]).reduce(function(sum,c){return sum+(c&&(c.name==='Алхимик'||c.englishName==='Alchemist')?(Number(c.level)||0):0);},0);
      if(alchemistLevel>0){target.hp=Math.max(1,alchemistLevel);target.hitPoints=target.hp;target.defeated=false;alchemistState.xenoNecroticReady=false;alchemistState.xenoNecroticUsed=true;target.deathSaves={successes:0,failures:0};necromanticRevival=true;r.note=(r.note?r.note+'; ':'')+'Некромантические органы: вместо падения до 0 HP восстановлено '+target.hp+' HP.';}
    }
    var concentration=null;
    var deathSaveFailures=0, instantDeath=false;
    // A character already at 0 HP that takes damage suffers death-save failures.
    // A critical hit causes two failures; massive damage can kill outright.
    if(!necromanticRevival&&hp<=0 && damageTaken>0 && (target.type==='hero'||target.ownerPeerId||target.deathSaveEligible)){
      if(damageTaken>=num(target.maxHp,hp)) instantDeath=true;
      else deathSaveFailures=opts.critical?2:1;
      if(deathSaveFailures){target.deathSaves=target.deathSaves||{successes:0,failures:0};target.deathSaves.failures=Math.min(3,num(target.deathSaves.failures)+deathSaveFailures);}
    }
    target.defeated=target.hp<=0 || instantDeath || !!(target.deathSaves&&num(target.deathSaves.failures)>=3);
    if(target.hp>0) target.defeated=false;
    if(target.hp<=0&&target.witchDoomward&&!instantDeath){
      target.hp=1;target.defeated=false;target.witchDoomward=null;
      target.deathSaves={successes:0,failures:0};
      if(target.hpCurrent!==undefined)target.hpCurrent=1;
    }
    var eventAttacker=opts&&opts.attacker||null;
    if(eventAttacker&&target.hp<=0&&!instantDeath&&eventAttacker.classFeaturesState&&eventAttacker.classFeaturesState.witchCurse==='Hollow'){
      var hollowHp=Math.max(1,num((eventAttacker.abilities&&eventAttacker.abilities.charisma)||0)>10?Math.floor((num(eventAttacker.abilities.charisma)-10)/2):0)+num((eventAttacker.classes||[]).find(function(c){return String(c.name)==='Ведьма';})||{} .level,0);
      addTempHpForWitch(eventAttacker,hollowHp);
    }
    if(target.hp<=0&&target.classFeaturesState&&target.classFeaturesState.dyingCurseArmed&&eventAttacker&&!instantDeath){
      target.classFeaturesState.witch.dyingCurseArmed=false;
      eventAttacker.witchDyingCurse={source:target,durationHours:24,disadvantage:['attack','ability','save']};
    }
    // Falling unconscious/defeated ends concentration regardless of the CON save.
    // Otherwise a successful save at 0 HP could leave an illegal concentration state.
    if(target.hp<=0 || target.defeated){
      if(concentrationState(target).active){
        breakConcentration(target);
        concentration={dc:null,roll:null,total:null,bonus:null,success:false,spell:null,endedByZeroHp:true};
      }
    } else if(damageTaken>0){
      // Temporary HP still means the creature took damage for concentration purposes.
      concentration=concentrationCheck(target,damageTaken);
    }
    return {amount:r.amount+wardAbsorbed,hpDamage:hpDamage,tempAbsorbed:absorbed,wardAbsorbed:wardAbsorbed,hp:target.hp,tempHp:target.tempHp,defeated:target.defeated,deathSaveFailures:deathSaveFailures,instantDeath:instantDeath,note:r.note,damageParts:resolvedParts.map(function(p){return {raw:num(p.raw),amount:num(p.amount),damageType:p.damageType,note:p.note||'',wardAbsorbed:num(p.wardAbsorbed)};}),concentration:concentration,reaction:reactionResult||null,reactionWindow:reaction&&!reactionResult?reaction.window:null};
  }
  function concentrationState(target){target.concentration=target.concentration||{active:false,spellId:null,spellName:''};return target.concentration;}
  function breakConcentration(target){var con=concentrationState(target);con.active=false;con.spellId=null;con.spellName='';return con;}
  function beginConcentration(target,spell){
    var con=concentrationState(target);
    if(!spell||!spell.concentration){breakConcentration(target);return con;}
    // Starting a new concentration spell immediately replaces the old one.
    breakConcentration(target);
    con=concentrationState(target);
    con.active=true;con.spellId=spell.id||spell.spellId||spell.name||null;con.spellName=spell.name||spell.spellName||'';
    return con;
  }
  function concentrationCheck(target,damage,opts){var con=concentrationState(target);if(!con.active||num(damage)<=0)return null;opts=opts||{};var dc=Math.max(10,Math.floor(num(damage)/2)),actor=opts.saveActor||target,statBonus=0;if(global.DNDRules&&actor){statBonus=global.DNDRules.getSaveBonus(actor,'con');}else if(actor&&actor.saveBonuses)statBonus=num(actor.saveBonuses.con,0);var roll=global.DNDRules?global.DNDRules.rollD20('normal'):{result:rollDie(20)};var total=roll.result+statBonus,success=total>=dc;if(!success)breakConcentration(target);return {dc:dc,roll:roll.result,total:total,bonus:statBonus,success:success,spell:con.spellName};}
  function heal(target,amount){
    // Мёртвая оболочка Призрака не подлежит лечению никакими обычными
    // эффектами. Сам дух восстанавливается только собственными механиками.
    if(target && target.extraClassType==='ghost'){
      return {amount:0,hp:num(target.hpCurrent,target.hp||0),maxHp:num(target.hpMax,target.maxHp||target.hp||0),blocked:true,note:'Мёртвую оболочку Призрака невозможно лечить.'};
    }
    // Accept both combatant fields (hp/maxHp/tempHp) and the canonical character fields (hpCurrent/hpMax/hpTemp).
    var characterShape=target && ('hpCurrent' in target || 'hpMax' in target);
    var max=characterShape?num(target.hpMax,target.maxHp):num(target.maxHp,target.hp);
    var before=characterShape?num(target.hpCurrent,target.hp):num(target.hp);
    var after=Math.min(max,before+Math.max(0,num(amount)));
    if(characterShape){target.hpCurrent=after;target.hpMax=max;target.hp=target.hp||{};target.hp.current=after;target.hp.max=max;target.hp.temp=num(target.hpTemp, target.hp.temp||0);}
    else target.hp=after;
    // In 5e, regaining HP from 0 ends the unconscious/death-save state and clears
    // the accumulated death-save successes/failures. Do this only when the heal
    // actually crosses from 0 to positive HP, not for ordinary healing.
    var revivedFromZero=before<=0&&after>0;
    if(after>0) target.defeated=false;
    if(revivedFromZero){
      resetDeathSaves(target);
      var conds=target.conditions||target.activeConditions;
      if(conds){
        var names=['Бессознателен','Unconscious','без сознания'];
        names.forEach(function(name){var key=global.DNDRules&&global.DNDRules.normalizeConditionName?global.DNDRules.normalizeConditionName(name):name;if(conds[key]!==undefined)conds[key]=false;});
      }
    }
    return {amount:after-before,hp:after,maxHp:max,revivedFromZero:revivedFromZero};
  }
  function cloneValue(v){try{return JSON.parse(JSON.stringify(v));}catch(e){return null;}}
  function restoreObject(target,snapshot){if(!target||!snapshot)return;Object.keys(target).forEach(function(k){delete target[k];});Object.keys(snapshot).forEach(function(k){target[k]=cloneValue(snapshot[k]);});}
  function applyDamageBatch(entries){
    entries=Array.isArray(entries)?entries:[];
    var snapshots=[],seen=[];
    entries.forEach(function(e){var t=e&&e.target;if(!t||seen.indexOf(t)>=0)return;seen.push(t);snapshots.push({target:t,state:cloneValue(t)});});
    var results=[];
    try{
      entries.forEach(function(e){if(!e||!e.target)throw new Error('Batch damage target missing');results.push(applyDamage(e.target,e.amount,e.type,e.opts||{}));});
      return {ok:true,results:results,count:results.length};
    }catch(err){
      snapshots.forEach(function(x){restoreObject(x.target,x.state);});
      return {ok:false,error:err&&err.message||'Batch damage transaction failed',results:[],count:0};
    }
  }
  function healBatch(entries){
    entries=Array.isArray(entries)?entries:[];
    var snapshots=[],seen=[];
    entries.forEach(function(e){var t=e&&e.target;if(!t||seen.indexOf(t)>=0)return;seen.push(t);snapshots.push({target:t,state:cloneValue(t)});});
    var results=[];
    try{
      entries.forEach(function(e){if(!e||!e.target)throw new Error('Batch heal target missing');results.push(heal(e.target,e.amount));});
      return {ok:true,results:results,count:results.length};
    }catch(err){
      snapshots.forEach(function(x){restoreObject(x.target,x.state);});
      return {ok:false,error:err&&err.message||'Batch heal transaction failed',results:[],count:0};
    }
  }

  function attackSequence(actor,target,attacks,opts){
    opts=opts||{}; var list=Array.isArray(attacks)?attacks:[attacks||{}]; var results=[];
    for(var i=0;i<list.length;i++){ var a=list[i]||{}; var base={}; Object.keys(a).forEach(function(k){base[k]=a[k];});
      base.target=target; if(base.useRules===undefined)base.useRules=true;
      var r=attack(actor,target,base); results.push(r);
      if(opts.stopOnDefeat&&target&&(target.defeated||num(target.hp)<=0))break;
    }
    return {ok:true,attacks:results,attackCount:results.length,hitCount:results.filter(function(r){return r&&r.hit;}).length,targetDefeated:!!(target&&(target.defeated||num(target.hp)<=0))};
  }
  function savingThrow(actor,stat,dc,mode,ctx){
    var h=actor && actor.stats ? actor : null, bonus=0, featureMode=mode||'normal';
    if(h && global.DNDRules){bonus=global.DNDRules.getSaveBonus(h,stat);} else bonus=num(actor && actor.saveBonuses && actor.saveBonuses[stat]);
    ctx=ctx||{};var sm=(global.DNDClassFeatures&&global.DNDClassFeatures.saveModifiers&&actor)?global.DNDClassFeatures.saveModifiers(actor,{stat:stat,dexSaveVisible:stat==='dex',fromSpell:!!(actor&&actor.saveFromSpell),allyWithinAura:!!(ctx.allyWithinAura||actor&&actor.allyWithinAura),auraSource:ctx.auraSource||null,saveType:ctx.saveType||stat,frightenedEffect:!!ctx.frightenedEffect,courageSource:ctx.courageSource||null,allyWithinCourage:!!ctx.allyWithinCourage,charmEffect:!!ctx.charmEffect,fromFiendOrUndead:!!ctx.fromFiendOrUndead,flashOfGeniusAvailable:!!(actor&&actor.useFlashOfGenius)}):null;
    if(sm){bonus+=num(sm.bonus);if(sm.advantage)featureMode=featureMode==='disadvantage'?'normal':'advantage';}
    var normalizedCondition=global.DNDRules&&global.DNDRules.normalizeConditionName?global.DNDRules.normalizeConditionName:null;
    var conds=(actor&&actor.activeConditions)|| (actor&&actor.conditions)||{};
    var autoFail=!!(global.DNDRules&&global.DNDRules.conditionModifiers&&global.DNDRules.conditionModifiers(actor).autoFailStrDex&&(stat==='str'||stat==='dex'));
    var roll=global.DNDRules ? global.DNDRules.rollD20(featureMode) : {result:rollDie(20),critical:false};
    var saveDebuffs=actor&&actor.classFeaturesState&&actor.classFeaturesState.alchemistDebuffs||{};
    bonus-=num(saveDebuffs.savePenalty,0);
    var total=roll.result+bonus;
    var success=autoFail?false:total>=num(dc);var evasion=!!(sm&&sm.evasion&&String(stat).toLowerCase()==='dex'&&success&&!autoFail);
    return {stat:stat,dc:num(dc),bonus:bonus,roll:roll,total:total,success:success,autoFailed:autoFail,evasion:evasion,classFeatureNotes:sm&&sm.notes||[]};
  }
  function toggleCondition(target,condition,on){
    if(!target.conditions) target.conditions={};
    var key=global.DNDRules&&global.DNDRules.normalizeConditionName?global.DNDRules.normalizeConditionName(condition):String(condition||'').trim(); if(!key)return false;
    target.conditions[key]=on===undefined?!target.conditions[key]:!!on;
    if(target.conditions[key] && ['Недееспособен','Бессознателен','Парализован','Оглушён','Окаменел'].indexOf(key)>=0){
      breakConcentration(target);
    }
    return target.conditions[key];
  }
  function deathSave(hero,success){
    if(!hero.deathSaves) hero.deathSaves={successes:0,failures:0};
    var ds=hero.deathSaves;
    if(success){ds.successes=Math.min(3,num(ds.successes)+1);}else{ds.failures=Math.min(3,num(ds.failures)+1);}
    return ds;
  }
  function resetDeathSaves(hero){hero.deathSaves={successes:0,failures:0};}
  function attack(attacker,target,opts){
    opts=opts||{};if(!opts.target)opts.target=target; var bonus=num(opts.bonus), mode=opts.mode||'normal';
    var perfumeClass=(target&&target.classes||[]).find(function(cl){return cl&&(cl.name==='Алхимик'||cl.englishName==='Alchemist')&&(cl.subclass==='amorist'||cl.subclass==='Аморист')&&Number(cl.level)>=10;});
    if(perfumeClass&&attacker&&target&&opts.__perfumeChecked!==true){
      var perfumeState=target.classFeaturesState=target.classFeaturesState||{},perfumeOwnerState=attacker.classFeaturesState||{},attackerId=String(attacker.id||attacker.entityId||''),roundTracker=(global.currentChar||global.currentCharacter||{}).initiativeTracker||{},currentRound=Number(roundTracker.round)||1;
      var immuneUntil=Number(perfumeOwnerState.alchemistPerfumeImmuneUntilByTarget&&perfumeOwnerState.alchemistPerfumeImmuneUntilByTarget[String(target.id||target.entityId||'')])||0;
      var distance=Number(opts.distanceFt);
      if(!Number.isFinite(distance)&&global.DNDBattleBoard&&global.DNDBattleBoard.findToken&&global.DNDBattleBoard.distanceFt){
        var aTok=global.DNDBattleBoard.findToken('bt_'+attackerId)||global.DNDBattleBoard.findToken(attackerId),tTok=global.DNDBattleBoard.findToken('bt_'+String(target.id||target.entityId||''));
        if(aTok&&tTok)distance=global.DNDBattleBoard.distanceFt(aTok,tTok);
      }
      if(Number.isFinite(distance)&&distance<=5&&immuneUntil<currentRound&&Number(perfumeState.alchemistPerfumeLastRound||0)!==currentRound){
        var perfumeDC=Number(perfumeState.alchemistSaveDC)||8+Math.floor((Number(target.abilityScores&&target.abilityScores.intelligence||target.stats&&target.stats.int||10)-10)/2)+Number(target.proficiencyBonus||2);
        var perfumeSave=global.DNDCombat&&global.DNDCombat.savingThrow?global.DNDCombat.savingThrow(attacker,'wis',perfumeDC):null;
        if(perfumeSave){perfumeState.alchemistPerfumeLastRound=currentRound;if(target.turnResources)target.turnResources.reaction=false;opts.__perfumeResult={dc:perfumeDC,save:perfumeSave,targetId:attackerId};if(!perfumeSave.success)opts.__perfumeCancelled=true;}
      }
    }
    if(opts.weapon){opts.weaponAttack=true;opts.meleeOrThrown=opts.meleeOrThrown!==undefined?opts.meleeOrThrown:(opts.weapon.rangeFt==null||Number(opts.weapon.rangeFt)<=5);}
    var featureMod=(global.DNDClassFeatures&&global.DNDClassFeatures.attackModifiers&&attacker)?global.DNDClassFeatures.attackModifiers(attacker,opts):{bonusDamage:0,extraDice:[],advantage:false,disadvantage:false,notes:[],pendingOnHit:{}};
    if(target&&target.classFeaturesState&&target.classFeaturesState.alchemistDebuffs&&target.classFeaturesState.alchemistDebuffs.attacksHaveAdvantage)featureMod.advantage=true;
    if(featureMod.advantage && featureMod.disadvantage) mode='normal'; else if(featureMod.advantage) mode='advantage'; else if(featureMod.disadvantage) mode='disadvantage';
    if(global.DNDRules && attacker && attacker.stats && opts.useRules!==false){
      if(opts.weapon) { var wa=global.DNDRules.weaponAttack(attacker,opts.weapon,mode); opts.__classFeatureMod=featureMod; opts.__attacker=attacker; opts.__forceCritical=!!featureMod.forceCritical; return resolveAttack(target,wa.roll.result,wa.bonus,opts); }
    }
    var roll=global.DNDRules ? global.DNDRules.rollD20(mode) : {result:rollDie(20),critical:false,fumble:false};
    opts.__classFeatureMod=featureMod; opts.__attacker=attacker; opts.__forceCritical=!!featureMod.forceCritical;
    return resolveAttack(target,roll.result,bonus,opts,roll);
  }
  function resolveAttack(target,d20,bonus,opts,roll){
    roll=roll||{result:d20,critical:d20===20,fumble:d20===1};
    if(opts&&opts.__forceCritical&&roll.result!==1)roll.critical=true;
    var criticalRange=Number(opts&&opts.__classFeatureMod&&opts.__classFeatureMod.criticalRange)||20;
    if(roll.result>=criticalRange&&roll.result!==1)roll.critical=true;
    var classBonus=opts&&opts.__classFeatureMod?num(opts.__classFeatureMod.bonusAttack):0;
    var attackerDebuffs=opts&&opts.__attacker&&opts.__attacker.classFeaturesState&&opts.__attacker.classFeaturesState.alchemistDebuffs||{};
    classBonus-=num(attackerDebuffs.attackPenalty,0);
    var witchAttackPenalty=target&&target.witchAttackPenaltyDice?rollDie(6):0;
    var total=d20+bonus+classBonus-witchAttackPenalty;
    var alchemistDebuffs=target&&target.classFeaturesState&&target.classFeaturesState.alchemistDebuffs||{};
    var coverBonus=(opts&&opts.__classFeatureMod&&opts.__classFeatureMod.ignoreCover)?0:num(opts&&opts.coverBonus, num(target&&target.coverBonus,0));
    var targetGrafts=target&&target.classFeaturesState&&Array.isArray(target.classFeaturesState.alchemistGrafts)?target.classFeaturesState.alchemistGrafts.map(function(x){return typeof x==='string'?x:x&&x.name||'';}):[];
    var dexScore=Number(target&&target.abilityScores&&target.abilityScores.dexterity!=null?target.abilityScores.dexterity:target&&target.stats&&target.stats.dexterity!=null?target.stats.dexterity:10),dexMod=Math.floor((dexScore-10)/2);
    var targetHasArmor=!!(target&&(target.armorEquipped||target.equippedArmor||(target.equipment&&(target.equipment.armor||target.equipment.armour))));
    var graftAC=null,unarmoredBase=10+dexMod;
    if(!targetHasArmor&&(target.ac==null||Number(target.ac)<=unarmoredBase)){
      if(targetGrafts.indexOf('Шкура дракона')>=0&&target.heavyArmorProficient)graftAC=17;
      else if(targetGrafts.indexOf('Чешуя исчадия')>=0)graftAC=15+Math.min(2,dexMod);
      else if(targetGrafts.indexOf('Звериная шкура')>=0)graftAC=13+dexMod;
    }
    var normalAC=Math.max(10,num(target && target.ac,10)-num(target&&target.witchACPenalty,0))-num(alchemistDebuffs.acPenalty,0);
    var ac=(opts&&opts.acOverride!=null?num(opts.acOverride,10):graftAC!=null?graftAC:normalAC)+coverBonus;
    var duplicityTarget=opts&&opts.__attacker&&target&&target.classFeaturesState&&target.classFeaturesState.witchDuplicity;
    var duplicityMiss=false;
    if(duplicityTarget&&!roll.fumble){var dupRoll=rollDie(6);if(dupRoll%2===1){duplicityMiss=true;target.classFeaturesState.witch.witchDuplicity=false;}}
    var naturalTwenty=!!roll.critical;if(naturalTwenty&&targetGrafts.indexOf('Изменчивая анатомия')>=0)roll.critical=false;
    var hit=!opts.__perfumeCancelled&&!duplicityMiss&&(naturalTwenty || (!roll.fumble && total>=ac));
    var electromagneticShield=null,defenderClasses=target&&target.classes||[],ionizerClass=defenderClasses.find(function(c){return c&&(c.name==='Алхимик'||c.englishName==='Alchemist')&&(c.subclass==='ionizer'||c.subclass==='Ионизатор');});
    var incomingType=String(opts&&opts.damageType||'').toLowerCase(),rangedIncoming=!!(opts&&(opts.rangedAttack||opts.attackKind==='rangedWeapon'||opts.weapon&&Number(opts.weapon.rangeFt)>5));
    if(hit&&ionizerClass&&Number(ionizerClass.level)>=10&&rangedIncoming&&['силовой','force','молния','lightning','некротический','necrotic','излучение','radiant'].indexOf(incomingType)>=0){
      var shieldRoll=rollDie(6);if(shieldRoll===6){hit=false;target.classFeaturesState=target.classFeaturesState||{};target.classFeaturesState.alchemistEnergyCharges=Math.min(10,(Number(target.classFeaturesState.alchemistEnergyCharges)||0)+1);electromagneticShield={roll:shieldRoll,deflected:true,charges:target.classFeaturesState.alchemistEnergyCharges};}
    }
    var out={d20:d20,bonus:bonus,classBonus:classBonus,total:total,ac:ac,hit:hit,critical:!!roll.critical,fumble:!!roll.fumble,damage:null,extraAttacks:Math.max(1,num(opts&&opts.__classFeatureMod&&opts.__classFeatureMod.extraAttacks,1))};
    if(opts.__perfumeResult){out.alchemistPerfume=opts.__perfumeResult;out.classFeatureNotes=(out.classFeatureNotes||[]);out.classFeatureNotes.push(opts.__perfumeCancelled?'Притягательный парфюм: спасбросок провален, атака сорвана.':'Притягательный парфюм: цель устояла.');}
    if(electromagneticShield){out.electromagneticShield=electromagneticShield;out.classFeatureNotes=(out.classFeatureNotes||[]);out.classFeatureNotes.push('Электромагнитный щит: атака отражена; накоплено 1 заряд.');}
    if(hit && opts.damage){
      var fm=opts.__classFeatureMod||{bonusDamage:0,extraDice:[]};
      out.damage=fm.noDamage?{total:0,extraDice:[]}:rollDice(opts.damage,!!roll.critical,!!fm.maximizeDamageDice);
      if(!fm.noDamage&&Array.isArray(fm.extraDice)) fm.extraDice.forEach(function(expr){var er=rollDice(expr,!!roll.critical,!!fm.maximizeDamageDice);out.damage.total+=er.total;(out.damage.extraDice||(out.damage.extraDice=[])).push(er);});
      if(!fm.noDamage&&Array.isArray(fm.typedExtraDice))fm.typedExtraDice.forEach(function(entry){var er=rollDice(entry.dice,!!roll.critical,!!fm.maximizeDamageDice);out.damage.total+=er.total;(out.damage.typedExtraDice||(out.damage.typedExtraDice=[])).push({total:er.total,type:entry.type,label:entry.label||'Дополнительный урон'});});
      if(!fm.noDamage)out.damage.total+=num(fm.bonusDamage);
      if(!fm.noDamage&&fm.doubleDamageAgainstObjects){out.damage.total*=2;(out.damage.typedExtraDice||[]).forEach(function(p){p.total*=2;});out.classFeatureNotes=(out.classFeatureNotes||[]);out.classFeatureNotes.push('Взрывная специализация: двойной урон объекту/сооружению.');}
      var pending=(global.DNDClassFeatures&&global.DNDClassFeatures.consumePendingOnHit&&opts.__attacker)?global.DNDClassFeatures.consumePendingOnHit(opts.__attacker,{hit:true}):{};
      if(pending.divineSmite){var sr=rollDice(pending.divineSmite.dice,!!roll.critical,!!fm.maximizeDamageDice);out.damage.total+=sr.total;out.damage.extraDice=(out.damage.extraDice||[]);out.damage.extraDice.push(sr);out.classFeatureNotes=(out.classFeatureNotes||[]);out.classFeatureNotes.push('Божественная кара +'+sr.total+' '+pending.divineSmite.damageType);out.divineSmite={dice:pending.divineSmite.dice,total:sr.total,damageType:pending.divineSmite.damageType};}
      if(pending.stunningStrike){var ss=global.DNDCombat&&global.DNDCombat.savingThrow?global.DNDCombat.savingThrow(target,'con',pending.stunningStrike.dc):{success:true};out.stunningStrike={dc:pending.stunningStrike.dc,save:ss,applied:!ss.success};if(!ss.success&&global.DNDCombat&&global.DNDCombat.toggleCondition)global.DNDCombat.toggleCondition(target,'Оглушён',true);}
      if(fm.assassinDeathStrikeEligible&&fm.assassinSurprised&&global.DNDRules){var dexStats=(opts.__attacker&&opts.__attacker.stats)||{};var dexMod=Math.floor((num(dexStats.dex,10)-10)/2);var pb=global.DNDRules.profBonus?global.DNDRules.profBonus(opts.__attacker):2;var dc=8+dexMod+pb;var sv=global.DNDCombat.savingThrow?global.DNDCombat.savingThrow(target,'con',dc):{success:false,total:0,dc:dc};out.assassinDeathStrike={dc:dc,save:sv,damageDoubled:!sv.success};if(!sv.success)out.damage.total*=2;}
      out.classFeatureNotes=(out.classFeatureNotes||[]).concat((fm.notes||[]).slice());
      var alchemistFormula=fm.pendingOnHit&&fm.pendingOnHit.alchemistFormula;
      if(alchemistFormula&&opts.target){
        var needsSave=!!alchemistFormula.save;
        var saveResult=needsSave?(global.DNDCombat&&global.DNDCombat.savingThrow?global.DNDCombat.savingThrow(target,alchemistFormula.save,alchemistFormula.dc):{success:true,unsupported:true}):null;
        var effectApplies=!needsSave||!!(saveResult&&!saveResult.success);
        out.alchemistFormulaEffect={id:alchemistFormula.id,dc:alchemistFormula.dc,save:saveResult,applied:effectApplies,effects:[]};
        if(effectApplies){
          target.classFeaturesState=target.classFeaturesState||{};
          target.classFeaturesState.alchemistDebuffs=target.classFeaturesState.alchemistDebuffs||{};
          var debuffs=target.classFeaturesState.alchemistDebuffs;
          debuffs.sourceId=opts.__attacker&&(opts.__attacker.id||opts.__attacker.entityId)||null;debuffs.sourceName=opts.__attacker&&opts.__attacker.name||null;debuffs.conditionsApplied=debuffs.conditionsApplied||[];
          if(alchemistFormula.acPenalty){debuffs.acPenalty=Math.max(Number(debuffs.acPenalty)||0,alchemistFormula.acPenalty);out.alchemistFormulaEffect.effects.push('acPenalty');}
          if(alchemistFormula.attackPenalty){debuffs.attackPenalty=Math.max(Number(debuffs.attackPenalty)||0,alchemistFormula.attackPenalty);out.alchemistFormulaEffect.effects.push('attackPenalty');}
          if(alchemistFormula.savePenalty){debuffs.savePenalty=Math.max(Number(debuffs.savePenalty)||0,alchemistFormula.savePenalty);out.alchemistFormulaEffect.effects.push('savePenalty');}
          if(alchemistFormula.condition&&global.DNDCombat&&global.DNDCombat.toggleCondition){global.DNDCombat.toggleCondition(target,alchemistFormula.condition,true);out.alchemistFormulaEffect.effects.push(alchemistFormula.condition);}
          if(alchemistFormula.condition){target.activeConditions=target.activeConditions||{};target.activeConditions[alchemistFormula.condition]=true;if(debuffs.conditionsApplied.indexOf(alchemistFormula.condition)<0)debuffs.conditionsApplied.push(alchemistFormula.condition);}
          if(alchemistFormula.speed===0){debuffs.speedZero=true;if(target.turnResources)target.turnResources.movement=0;out.alchemistFormulaEffect.effects.push('speedZero');}
          if(alchemistFormula.pushFt){out.alchemistFormulaEffect.pushFt=alchemistFormula.pushFt;out.alchemistFormulaEffect.effects.push('pushFt');}
          if(alchemistFormula.noOpportunityAttacks){debuffs.noOpportunityAttacks=true;out.alchemistFormulaEffect.effects.push('noOpportunityAttacks');}
          if(alchemistFormula.verbalComponentsBlocked){debuffs.verbalComponentsBlocked=true;out.alchemistFormulaEffect.effects.push('verbalComponentsBlocked');}
          if(alchemistFormula.revealsInvisible){debuffs.revealsInvisible=true;if(target.activeConditions)delete target.activeConditions['Невидим'];if(target.conditions)delete target.conditions['Невидим'];out.alchemistFormulaEffect.effects.push('revealsInvisible');}
          if(alchemistFormula.attacksHaveAdvantage){debuffs.attacksHaveAdvantage=true;out.alchemistFormulaEffect.effects.push('attacksHaveAdvantage');}
          if(alchemistFormula.burning){debuffs.burning=true;debuffs.burningTicks=1;out.alchemistFormulaEffect.effects.push('burning');}
          if(alchemistFormula.oilCoated){debuffs.oilCoated=true;out.alchemistFormulaEffect.effects.push('oilCoated');}
          if(alchemistFormula.smokeCloud){debuffs.smokeCloud=true;out.alchemistFormulaEffect.effects.push('smokeCloud');}
          if(alchemistFormula.teleportToImpact){var source=opts.__attacker;if(source&&target&&source.x!=null&&source.y!=null&&target.x!=null&&target.y!=null){var dx=Number(source.x)-Number(target.x),dy=Number(source.y)-Number(target.y);if(Math.sqrt(dx*dx+dy*dy)<=30){source.x=target.x;source.y=target.y;out.alchemistFormulaEffect.effects.push('teleportedToImpact');}else out.alchemistFormulaEffect.effects.push('teleportOutOfRange');}else out.alchemistFormulaEffect.effects.push('teleportNeedsMapCoordinates');}
          debuffs.expires='start_of_attacker_next_turn';
        }
        out.classFeatureNotes.push('Алхимическая формула: '+alchemistFormula.name+'; спасбросок '+(saveResult&&saveResult.success?'успешен':'провален')+'.');
      }
      if(out.assassinDeathStrike&&out.assassinDeathStrike.damageDoubled)out.classFeatureNotes.push('Смертельный удар: урон удвоен');
      if(opts.target){
        var damageOpts={source:'attack',attackKind:opts.attackKind||((opts.weapon&&Number(opts.weapon.rangeFt)>5)?'rangedWeapon':'weapon'),visible:opts.visible!==false,projectile:!!opts.projectile,critical:!!roll.critical,attacker:opts.__attacker||null};
        var damageParts=[{amount:rollDice(opts.damage,!!roll.critical).total,damageType:opts.damageType||''}];
        // Rebuild the exact rolled base damage used above so resistance is applied per type.
        var typedExtraTotal=(out.damage.typedExtraDice||[]).reduce(function(sum,p){return sum+num(p.total);},0);damageParts[0].amount=out.damage.total-num(fm.bonusDamage)-typedExtraTotal;(out.damage.typedExtraDice||[]).forEach(function(p){damageParts.push({amount:num(p.total),damageType:p.type||opts.damageType||'',label:p.label||'Дополнительный урон'});});
        if(pending.divineSmite){
          var smitePart=out.divineSmite&&num(out.divineSmite.total)||0;
          damageParts[0].amount-=smitePart;
          damageParts.push({amount:smitePart,damageType:pending.divineSmite.damageType,label:'Божественная кара'});
        }
        if(num(fm.bonusDamage)){damageParts.push({amount:num(fm.bonusDamage),damageType:opts.damageType||'',label:'Бонус урона'});}
        if(opts.deferDamage){out.damageResult=null;out.pendingDamage={amount:out.damage.total,damageType:opts.damageType||'',context:Object.assign({},damageOpts,{damageParts:damageParts,isBomb:!!opts.isBomb,attackerId:opts.__attacker&&(opts.__attacker.id||opts.__attacker.entityId)||null})};}
        else out.damageResult=applyDamage(target,out.damage.total,opts.damageType||'',Object.assign({},damageOpts,{damageParts:damageParts,ignoreResistance:!!fm.ignoreResistance,immunityBecomesResistance:!!fm.immunityBecomesResistance,isBomb:!!opts.isBomb,attackerId:opts.__attacker&&(opts.__attacker.id||opts.__attacker.entityId)||null}));
      }
      if(global.DNDClassFeatures&&global.DNDClassFeatures.onAttackResult)global.DNDClassFeatures.onAttackResult(opts.__attacker||{}, {sneakApplied:Array.isArray(fm.extraDice)&&fm.extraDice.length>0,hit:hit,pendingOnHit:pending});
    }
    var attacker=opts&&opts.__attacker;
    var attackerState=attacker&&attacker.classFeaturesState;
    if(attackerState&&Array.isArray(attackerState.alchemistActiveEffects)){
      var invisUsed=attackerState.alchemistActiveEffects.some(function(e){return e&&e.name==='Зелье невидимости'&&e.effect&&e.effect.endsOnAttack;});
      if(invisUsed){
        attackerState.alchemistActiveEffects=attackerState.alchemistActiveEffects.filter(function(e){return !(e&&e.name==='Зелье невидимости'&&e.effect&&e.effect.endsOnAttack);});
        if(attacker.activeConditions)delete attacker.activeConditions['Невидим'];
        if(attacker.conditions)delete attacker.conditions['Невидим'];
        out.classFeatureNotes=(out.classFeatureNotes||[]);out.classFeatureNotes.push('Невидимость от зелья завершилась после атаки.');
      }
    }
    return out;
  }
  function addCombatantFromTemplate(template){
    var t=template||{}, c={id:'init_'+Date.now()+'_'+Math.random().toString(36).slice(2,7),name:t.name||'Противник',initiative:num(t.initiative),hp:num(t.hp,num(t.maxHp,1)),maxHp:num(t.maxHp,num(t.hp,1)),tempHp:num(t.tempHp),ac:num(t.ac,10),type:t.type||'enemy',notes:t.notes||'',conditions:t.conditions||{},resistances:t.resistances||[],vulnerabilities:t.vulnerabilities||[],immunities:t.immunities||[],attacks:Array.isArray(t.attacks)?JSON.parse(JSON.stringify(t.attacks)):[],deathSaves:{successes:0,failures:0}};
    return c;
  }
  var MONSTERS={
    'Гоблин':{name:'Гоблин',ac:15,hp:7,maxHp:7,initiative:2,attacks:[{name:'Скимитар',bonus:4,damage:'1d6+2',type:'рубящий'},{name:'Короткий лук',bonus:4,damage:'1d6+2',type:'колющий'}]},
    'Орк':{name:'Орк',ac:13,hp:15,maxHp:15,initiative:1,attacks:[{name:'Секира',bonus:5,damage:'1d12+3',type:'рубящий'}]},
    'Скелет':{name:'Скелет',ac:13,hp:13,maxHp:13,initiative:2,attacks:[{name:'Меч',bonus:4,damage:'1d6+2',type:'рубящий'},{name:'Лук',bonus:4,damage:'1d6+2',type:'колющий'}]},
    'Зомби':{name:'Зомби',ac:8,hp:22,maxHp:22,initiative:-2,attacks:[{name:'Удар',bonus:3,damage:'1d6+1',type:'дробящий'}],resistances:[]},
    'Волк':{name:'Волк',ac:13,hp:11,maxHp:11,initiative:2,attacks:[{name:'Укус',bonus:4,damage:'2d4+2',type:'колющий'}]}
  };
  global.DNDCombat={VERSION:'3.3.0',DAMAGE_TYPES:DAMAGE_TYPES,CONDITIONS:CONDITIONS,rollDice:rollDice,applyDamage:applyDamage,applyDamageBatch:applyDamageBatch,heal:heal,healBatch:healBatch,effectiveDamage:effectiveDamage,savingThrow:savingThrow,toggleCondition:toggleCondition,concentrationState:concentrationState,concentrationCheck:concentrationCheck,breakConcentration:breakConcentration,beginConcentration:beginConcentration,deathSave:deathSave,resetDeathSaves:resetDeathSaves,attack:attack,attackSequence:attackSequence,resolveAttack:attack,addCombatantFromTemplate:addCombatantFromTemplate,MONSTERS:MONSTERS};

  function hero(){return global.currentChar||global.currentCharacter||null;}
  function save(){if(typeof global.autoSaveCurrentCharacter==='function')global.autoSaveCurrentCharacter();}
  function ensure(){var h=hero();if(!h)return null;if(!Array.isArray(h.encounters))h.encounters=[];if(!h.initiativeTracker)h.initiativeTracker={round:1,activeIndex:0,combatants:[]};return h;}
  function esc(v){return typeof global.escapeDndHtml==='function'?global.escapeDndHtml(v):String(v==null?'':v).replace(/[&<>\"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
  function combatPanel(){
    var tab=document.getElementById('tabDice');if(!tab)return;
    var old=document.getElementById('dndCombatV3');if(old)old.remove();
    var div=document.createElement('div');div.id='dndCombatV3';div.innerHTML=`
      <div class="card"><h3>🛡️ Боевой движок</h3>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">
          <button class="btn-action" onclick="dndCombatAttack()">🎯 Атака активного</button>
          <button class="btn-action" onclick="dndCombatDamage()">💥 Нанести урон</button>
          <button class="btn-action" onclick="dndCombatHeal()">💚 Лечение</button>
          <button class="btn-action" onclick="dndCombatCondition()">☠️ Состояние</button>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:6px;">
          <button class="btn-action" onclick="dndDeathSave(true)">☠️ Успех death save</button>
          <button class="btn-action" onclick="dndDeathSave(false)">💀 Провал death save</button>
        </div>
        <div id="dndCombatStatus" style="margin-top:8px;color:#bbb;font-size:.82em;"></div>
        <button class="btn-action" style="width:100%;margin-top:8px;background:#8b4513;" onclick="dndBattleOpen()">⚔️ Открыть боевое поле</button>
      </div>
      <div class="card"><h3>👹 Encounter Builder</h3>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:5px;">
          <select id="dndMonsterPreset"><option value="">— шаблон монстра —</option>${Object.keys(MONSTERS).map(function(n){return '<option>'+esc(n)+'</option>';}).join('')}</select>
          <button class="btn-action" onclick="dndAddMonsterPreset()">+ Добавить</button>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:5px;margin-top:5px;"><input id="dndMonsterName" placeholder="Имя своего монстра"><input id="dndMonsterHp" type="number" placeholder="HP"></div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:5px;margin-top:5px;"><input id="dndMonsterAc" type="number" placeholder="КД"><input id="dndMonsterInit" type="number" placeholder="Инициатива"></div>
        <button class="btn-action" style="width:100%;margin-top:5px;" onclick="dndAddCustomMonster()">+ Свой монстр</button>
        <div id="dndEncounterList" style="margin-top:8px;"></div>
        <button class="btn-action" style="width:100%;margin-top:6px;background:#4caf50;" onclick="dndLaunchEncounter()">⚔️ Запустить encounter</button>
      </div>`;
    tab.appendChild(div);renderEncounter();renderCombatStatus();
  }
  function renderCombatStatus(){var h=ensure(),box=document.getElementById('dndCombatStatus');if(!h||!box)return;var t=h.initiativeTracker||{combatants:[],activeIndex:0,round:1},c=t.combatants[t.activeIndex];if(!c){box.textContent='Активного участника нет.';return;}box.innerHTML='Раунд '+num(t.round,1)+' • <strong>'+esc(c.name)+'</strong> • HP '+num(c.hp)+'/'+num(c.maxHp)+' • КД '+num(c.ac,10)+(c.defeated?' • 💀 повержен':'');}
  function syncNetworkMasterCombat(reason){var net=global.dndNetwork;if(net&&net.state&&net.state.role==='host'&&net.commitHostEvent){var h=ensure();if(h&&h.initiativeTracker)net.commitHostEvent('COMBAT_CHANGED',JSON.parse(JSON.stringify(h.initiativeTracker)),'master');}}
  function renderEncounter(){var h=ensure(),box=document.getElementById('dndEncounterList');if(!h||!box)return;var e=h.encounters[h.encounters.length-1]||{combatants:[]};box.innerHTML=(e.combatants||[]).map(function(c,i){return '<div style="display:flex;gap:5px;align-items:center;padding:5px;border-bottom:1px solid #333"><span style="flex:1">'+esc(c.name)+' • HP '+num(c.hp)+' • КД '+num(c.ac,10)+'</span><button class="btn-del" onclick="dndRemoveEncounterCombatant('+i+')">✕</button></div>';}).join('')||'<div style="color:#777">Добавьте противников.</div>';}
  function currentEncounter(){var h=ensure();if(!h)return null;if(!h.encounters.length)h.encounters.push({id:'enc_'+Date.now(),name:'Новый encounter',combatants:[]});return h.encounters[h.encounters.length-1];}
  global.dndAddMonsterPreset=function(){var s=document.getElementById('dndMonsterPreset'),name=s&&s.value;if(!name)return;var e=currentEncounter();e.combatants.push(addCombatantFromTemplate(MONSTERS[name]));save();renderEncounter();};
  global.dndAddCustomMonster=function(){var n=document.getElementById('dndMonsterName'),hp=document.getElementById('dndMonsterHp'),ac=document.getElementById('dndMonsterAc'),ini=document.getElementById('dndMonsterInit');var e=currentEncounter();e.combatants.push(addCombatantFromTemplate({name:n.value||'Монстр',hp:num(hp.value,10),maxHp:num(hp.value,10),ac:num(ac.value,10),initiative:num(ini.value)}));save();renderEncounter();};
  global.dndRemoveEncounterCombatant=function(i){var e=currentEncounter();e.combatants.splice(i,1);save();renderEncounter();};
  global.dndLaunchEncounter=function(){var h=ensure(),e=currentEncounter();if(!e.combatants.length){alert('Добавьте хотя бы одного противника.');return;}h.initiativeTracker={round:1,activeIndex:0,combatants:[]};if(typeof global.addInitiativeCombatant==='function'){global.addInitiativeCombatant(h.name||'Герой',true);}h.initiativeTracker.combatants=h.initiativeTracker.combatants.concat(e.combatants.map(function(c){return addCombatantFromTemplate(c);}));if(typeof global.sortInitiativeTracker==='function')global.sortInitiativeTracker();save();if(typeof global.renderInitiativeTracker==='function')global.renderInitiativeTracker();renderCombatStatus();syncNetworkMasterCombat('launch');};
  function active(){var h=ensure();return h&&h.initiativeTracker&&h.initiativeTracker.combatants[h.initiativeTracker.activeIndex];}
  function syncHeroCombatant(c){var h=hero();if(!h||!c||c.type!=='hero')return;c.hp=Math.max(0,num(h.hpCurrent));c.maxHp=num(h.hpMax,c.maxHp);c.tempHp=num(h.hpTemp,c.tempHp);}
  function syncBackToHero(c){var h=hero();if(!h||!c||c.type!=='hero')return;h.hpCurrent=c.hp;h.hpMax=c.maxHp;h.hpTemp=c.tempHp;h.hp=h.hp||{};h.hp.current=c.hp;h.hp.max=c.maxHp;h.hp.temp=c.tempHp;}
  function chooseTarget(){var h=ensure(),list=h.initiativeTracker.combatants;if(!list.length)return null;var s=list.map(function(c,i){return i+': '+c.name+' HP '+num(c.hp)+'/'+num(c.maxHp);}).join('\n');var idx=Number(prompt('Цель:\n'+s,'0'));return isFinite(idx)&&list[idx]?list[idx]:null;}
  global.dndCombatAttack=function(){var h=ensure(),a=active(),target=chooseTarget();if(!a||!target)return;var bonus=Number(prompt('Бонус атаки:',a.type==='hero'&&h? (global.DNDRules?global.DNDRules.profBonus(h):2):0));if(!isFinite(bonus))return;var dmg=prompt('Урон (например 1d8+3):','1d8+3');if(!dmg)return;var type=prompt('Тип урона:','рубящий')||'';syncHeroCombatant(a);syncHeroCombatant(target);var r=attack(a,target,{bonus:bonus,damage:dmg,damageType:type,target:target,attackKind:'weapon'});if(r.damageResult)syncBackToHero(target);var msg='d20 '+r.d20+' '+(bonus>=0?'+':'')+bonus+' = '+r.total+' против КД '+r.ac+' — '+(r.hit?'ПОПАДАНИЕ':'ПРОМАХ');if(r.damage){var dr=r.damageResult||{amount:r.damage.total,hp:target.hp};msg+='\nУрон '+r.damage.total+(r.critical?' (крит!)':'')+' → '+dr.amount+' ('+type+')';if(dr.note)msg+='; '+dr.note;msg+='\nHP цели: '+dr.hp+'/'+target.maxHp;}alert(msg);save();if(typeof global.renderInitiativeTracker==='function')global.renderInitiativeTracker();renderCombatStatus();syncNetworkMasterCombat('attack');};
  global.dndCombatDamage=function(){var t=chooseTarget();if(!t)return;var a=prompt('Урон:','5'),n=Number(a);if(!isFinite(n))return;var type=prompt('Тип урона:','рубящий')||'';syncHeroCombatant(t);var r=applyDamage(t,n,type);syncBackToHero(t);alert('Получено '+r.amount+' урона'+(r.note?' ('+r.note+')':'')+'. HP: '+r.hp+'/'+t.maxHp);save();if(typeof global.renderInitiativeTracker==='function')global.renderInitiativeTracker();renderCombatStatus();syncNetworkMasterCombat('damage');};
  global.dndCombatHeal=function(){var t=chooseTarget();if(!t)return;var n=Number(prompt('Лечение:','5'));if(!isFinite(n))return;syncHeroCombatant(t);var r=heal(t,n);syncBackToHero(t);alert('Восстановлено '+r.amount+' HP. HP: '+r.hp+'/'+r.maxHp);save();if(typeof global.renderInitiativeTracker==='function')global.renderInitiativeTracker();renderCombatStatus();syncNetworkMasterCombat('heal');};
  global.dndCombatCondition=function(){var t=chooseTarget();if(!t)return;var c=prompt('Состояние:\n'+CONDITIONS.join(', '),'Отравлен');if(!c)return;var on=toggleCondition(t,c);alert(c+': '+(on?'активно':'снято'));save();syncNetworkMasterCombat('condition');};
  global.dndDeathSave=function(){var h=ensure();if(!h)return;var roll=rollDie(20),ds=h.deathSaves||{successes:0,failures:0};if(num(ds.successes)>=3||num(ds.failures)>=3){alert(num(ds.failures)>=3?'☠ Персонаж уже мёртв.':'🛡 Персонаж уже стабилен — новый Death Save не требуется.');return;}if(roll===20){h.hpCurrent=1;h.hp=h.hp||{};h.hp.current=1;resetDeathSaves(h);alert('🎲 Death Save: 20 — герой приходит в себя с 1 HP!');}else if(roll===1){deathSave(h,false);deathSave(h,false);alert('🎲 Death Save: 1 — два провала. '+h.deathSaves.failures+'/3');}else if(roll>=10){deathSave(h,true);alert('🎲 Death Save: '+roll+' — успех. '+h.deathSaves.successes+'/3');}else{deathSave(h,false);alert('🎲 Death Save: '+roll+' — провал. '+h.deathSaves.failures+'/3');}save();if(typeof global.calculateMods==='function')global.calculateMods();syncNetworkMasterCombat('death_save');};
  global.dndRenderCombatV3=function(){combatPanel();};

  function patchRest(name,type){
    var old=global[name]; if(typeof old!=='function'||old.__combatRestV3)return;
    var wrapped=function(){var h=hero();if(h&&global.DNDRules)global.DNDRules.restoreResources(h,type);var r=old.apply(this,arguments);if(h&&type==='long'){resetDeathSaves(h);h.activeConditions={};h.concentration={active:false,spellId:null,spellName:''};}save();if(global.dndNetwork&&global.dndNetwork.state&&global.dndNetwork.state.role==='host'&&typeof global.dndNetwork.commitHostEvent==='function'&&h&&h.initiativeTracker){if(typeof global.dndSyncCurrentCharacterFromCombat==='function')global.dndSyncCurrentCharacterFromCombat();global.dndNetwork.commitHostEvent('COMBAT_CHANGED',JSON.parse(JSON.stringify(h.initiativeTracker)),'rest');}return r;};
    wrapped.__combatRestV3=true;global[name]=wrapped;
  }
  function patch(){
    if(typeof global.renderDndTools!=='function'||global.renderDndTools.__combatV3)return;
    var old=global.renderDndTools;var wrapped=function(){old.apply(this,arguments);setTimeout(combatPanel,0);};wrapped.__combatV3=true;global.renderDndTools=wrapped;
  }
  if(global.addEventListener)global.addEventListener('DOMContentLoaded',function(){patch();patchRest('shortRestCharacter','short');patchRest('longRestCharacter','long');setTimeout(function(){if(hero())combatPanel();},50);});
})(window);
