/**
 * expanded_classes_v23.js
 * ------------------------------------------------------------------
 * ЧТО ЭТО ЗА ФАЙЛ:
 * Runtime-контент v23 для трёх новых сторонних 5e-классов: Illrigger,
 * Beastheart и Pugilist. Пак подключается через DNDContent и не копирует
 * текст исходных книг.
 *
 * КАК РАБОТАЕТ:
 * - синхронизирует уникальные ресурсы персонажа;
 * - отдаёт классовые способности в общий Content Framework;
 * - принимает VTT context.target и возвращает структурированный effect;
 * - attackModifiers подключаются к общему combat_engine.
 *
 * ОСНОВНЫЕ ПЕРЕМЕННЫЕ: infernalSeals, ferocity, moxie, club, companion,
 * activeBrand, hellmark, context.target.
 *
 * ИСТОЧНИКИ: Illrigger — MCDM Productions, Beastheart — MCDM Productions,
 * Pugilist — Benjamin Huffman/community. Реализация является самостоятельным
 * runtime-слоем; для распространения оригинального контента нужны права/лицензия.
 * НЕ ИЗМЕНЯЕТ Wallpapers.js/Ambiences.js.
 * ------------------------------------------------------------------
 */
(function(g){
  'use strict';
  var D=g.DNDContent;if(!D)return;
  function lvl(h,n){var c=(h.classes||[]).find(function(x){return String(x.name)===n;});return c?Number(c.level)||0:0;}
  function state(h){h.classFeaturesState=h.classFeaturesState||{};return h.classFeaturesState;}
  function res(h,key,max,recharge){h.resources=h.resources||{};var r=h.resources[key]||{};r.max=max;r.current=Math.min(Number(r.current===undefined?max:r.current),max);r.recharge=recharge;h.resources[key]=r;return r;}
  function spend(h,key,n){var r=h.resources&&h.resources[key];if(!r||r.current<n)return false;r.current-=n;return true;}
  function target(ctx){return ctx&&ctx.target?ctx.target:null;}
  function mod(h,k){var a=h.abilities||{};var v=a[k]??a[String(k).toUpperCase()]??0;return Number(v)>10?Math.floor((Number(v)-10)/2):Number(v)||0;}

  function syncIll(h){var l=lvl(h,'Иллирригер');if(!l)return;res(h,'infernalSeals',Math.max(1,Math.ceil(l/2)),'short');}
  function useIll(h,id,ctx){syncIll(h);var s=state(h),t=target(ctx);
    if(id==='infernalBrand'){if(!t)return{ok:false,message:'Выбери врага на поле.'};if(!spend(h,'infernalSeals',1))return{ok:false,message:'Нет доступных Infernal Seals.'};s.activeBrand=t.id;return{ok:true,target:t.id,effect:{marked:true},message:'🔥 Infernal Brand наложен на выбранную цель.'};}
    if(id==='sealTransfer'){if(!t)return{ok:false,message:'Выбери цель на поле.'};if(!spend(h,'infernalSeals',1))return{ok:false,message:'Нет печати.'};return{ok:true,target:t.id,effect:{forcedMoveFt:10},message:'⛓️ Infernal Seal: цель перемещается на 10 ft.'};}
    if(id==='hellishRebuke'){if(!spend(h,'infernalSeals',1))return{ok:false,message:'Нет печати.'};return{ok:true,target:t&&t.id,effect:{reaction:true,damage:'2d10 fire',save:'dex'},message:'🔥 Адская ответная атака подготовлена.'};}
    return{ok:true,message:'🔥 '+id+' подготовлено.'};
  }
  function illAttack(h,ctx){var s=state(h),o={bonusDamage:0,extraDice:[],advantage:false,disadvantage:false,notes:[]};if(s.activeBrand&&ctx&&ctx.target&&String(s.activeBrand)===String(ctx.target.id)){o.extraDice.push(lvl(h,'Иллирригер')>=11?'2d6':'1d6');o.notes.push('Infernal Brand');}return o;}

  function syncBeast(h){var l=lvl(h,'Бистхарт');if(!l)return;res(h,'ferocity',Math.max(2,Math.ceil(l/2)),'short');h.companion=h.companion||{name:'Монструозный компаньон',ferocity:0,active:true};h.companion.ferocity=Math.max(0,Number(h.companion.ferocity)||0);}
  function useBeast(h,id,ctx){syncBeast(h);var s=state(h),t=target(ctx),c=h.companion;
    if(id==='companionCommand'){return{ok:true,effect:{companionAction:true},message:'🐾 Компаньон получает команду на действие.'};}
    if(id==='ferociousStrike'){if(!spend(h,'ferocity',1))return{ok:false,message:'Недостаточно Ferocity.'};c.ferocity+=1;return{ok:true,target:t&&t.id,effect:{extraDice:['1d8']},message:'🐾 Ferocious Strike: компаньон усиливает атаку.'};}
    if(id==='earthshaker'){if(!spend(h,'ferocity',2))return{ok:false,message:'Недостаточно Ferocity.'};c.ferocity+=2;return{ok:true,effect:{aoeRadiusFt:10,damage:'2d6 bludgeoning',save:'str'},message:'🌎 Earthshaker: зона вокруг компаньона.'};}
    if(id==='rampage'){if(c.ferocity<Math.max(3,Math.ceil(lvl(h,'Бистхарт')/2)))return{ok:false,message:'Компаньон ещё не набрал достаточно Ferocity.'};s.rampage=true;return{ok:true,effect:{companionRampage:true},message:'🐾 RAMPAGE: компаньон входит в ярость.'};}
    return{ok:true,message:'🐾 '+id+' подготовлено.'};
  }
  function beastAttack(h,ctx){var c=h.companion||{},o={bonusDamage:0,extraDice:[],advantage:false,disadvantage:false,notes:[]};if(c.rampage)o.extraDice.push('1d8'),o.notes.push('Companion Rampage');return o;}

  function syncPug(h){var l=lvl(h,'Пугилист');if(!l)return;res(h,'moxie',Math.max(2,Math.ceil(l/2)),'short');}
  function usePug(h,id,ctx){syncPug(h);var s=state(h),t=target(ctx),l=lvl(h,'Пугилист');
    if(id==='oldOneTwo'){if(!spend(h,'moxie',1))return{ok:false,message:'Недостаточно Moxie.'};return{ok:true,effect:{bonusActionAttack:true,attacks:2,damageDie:l>=17?'1d12':l>=11?'1d10':l>=6?'1d8':'1d6'},message:'🥊 Old One-Two: две дополнительные безоружные атаки.'};}
    if(id==='stickAndMove'){if(!spend(h,'moxie',1))return{ok:false,message:'Недостаточно Moxie.'};return{ok:true,effect:{dash:true,shove:true},message:'🥊 Stick and Move: рывок или толчок за бонусное действие.'};}
    if(id==='bloodiedButUnbowed'){s.bloodiedReady=true;return{ok:true,effect:{tempHp:l+mod(h,'con'),restoreResource:'moxie'},message:'🩸 Bloodied but Unbowed подготовлено как реакция.'};}
    if(id==='haymaker'){if(!spend(h,'moxie',1))return{ok:false,message:'Недостаточно Moxie.'};return{ok:true,target:t&&t.id,effect:{extraDice:['2d6']},message:'💥 Haymaker: усиленный удар.'};}
    if(id==='shakeItOff'){if(!spend(h,'moxie',1))return{ok:false,message:'Недостаточно Moxie.'};return{ok:true,effect:{removeCondition:true},message:'🧘 Shake It Off: снять одно подходящее состояние.'};}
    return{ok:true,message:'🥊 '+id+' подготовлено.'};
  }
  function pugAttack(h){var s=state(h),o={bonusDamage:0,extraDice:[],advantage:false,disadvantage:false,notes:[]};if(s.bloodiedReady){o.extraDice.push('1d6');o.notes.push('Bloodied but Unbowed');s.bloodiedReady=false;}return o;}


  /* ================================================================
     V70.26.95 — runtime closure: Пугилист / Военачальник / Ведьма
     Все активные действия возвращают структурированные эффекты для
     общего combat/effect слоя; пассивы хранятся в состоянии персонажа.
     ================================================================ */
  function arrMax(level, a){return a[Math.max(1,Math.min(level,a.length))]||a[a.length-1]||0;}
  function condition(ctx,names){var t=target(ctx);return t&&t.conditions&&names.some(function(n){return t.conditions.indexOf(n)>=0;});}

  function pugClubEffect(h,club,id,ctx){
    var l=lvl(h,'Пугилист'),t=target(ctx),s=state(h),r={ok:true,subclass:club,id:id,effect:{},message:'🥊 '+id+' подготовлено.'};
    if(club==='arenaRoyale'){
      if(id==='crowdWork')r.effect={advantage:['performance','intimidation'],tempHpOnApplause:true};
      else if(id==='highFlying')r.effect={jumpDistanceMultiplier:2,fallingStrike:true};
      else if(id==='signatureMove')r.effect={extraDice:['2d8'],knockdown:true};
      else r.effect={proficiency:'performance'};
    } else if(club==='bloodhoundBruisers'){
      if(id==='detectiveWork')r.effect={investigationExpertise:true,searchAsBonus:true};
      else if(id==='fightLikeDetective')r.effect={reactionCounter:true,extraDice:['1d8']};
      else if(id==='heartOfCity')r.effect={tempHp:Math.max(1,l+mod(h,'con')),urbanAdvantage:true};
      else r.effect={initiativeBonus:mod(h,'con'),cannotSurprise:true};
    } else if(club==='dogAndHound'){
      if(id==='magicBite')r.effect={companionMagicAttacks:true};
      else if(id==='coordinatedAttack')r.effect={companionAttack:true,allyAdvantage:true};
      else if(id==='houndBestFriend')r.effect={companionExtraAttack:true};
      else if(id==='ferociousDog')r.effect={companionDamage:'2d8',knockdown:true};
      else r.effect={companion:{active:true}};
    } else if(club==='handOfDread'){
      if(id==='dreadHand')r.effect={reachFt:10,necroticDamage:'1d8',grapple:true};
      else if(id==='devilDeal')r.effect={tempHp:l*2,damageResistance:['necrotic','fire']};
      else if(id==='grotesqueGrowth')r.effect={sizeIncrease:true,reachFt:5};
      else if(id==='gutsFountain')r.effect={aoeRadiusFt:10,damage:'4d8',save:'con',damageType:'necrotic'};
      else r.effect={darkMagic:true};
    } else if(club==='pissAndVinegar'){
      if(id==='saltyGreeting')r.effect={taunt:true,save:'wis',disadvantage:true};
      else if(id==='dirtyTricks')r.effect={disarm:true,blind:true,shove:true};
      else if(id==='oldBully')r.effect={fearImmunity:true,advantageVsIntimidation:true};
      else r.effect={socialAdvantage:true};
    } else if(club==='squaredCircle'){
      if(id==='livingShield')r.effect={redirectDamage:true,grappleTarget:true};
      else if(id==='heavyweight')r.effect={pushFt:10,extraDice:['1d8']};
      else if(id==='cleanFinish')r.effect={criticalOn:19,20:true,knockout:true};
      else r.effect={grappleMastery:true};
    } else if(club==='sweetScience'){
      if(id==='counterpunch')r.effect={reactionAttack:true,extraDice:['1d8']};
      else if(id==='oneTwoThree')r.effect={attackChain:3,knockdown:true};
      else if(id==='floatLike')r.effect={disengageOnHit:true,advantageNextAttack:true};
      else if(id==='knockout')r.effect={stun:true,save:'con',extraDice:['3d8']};
      else r.effect={boxingTechnique:true};
    } else r.effect={subclassFeature:true};
    return r;
  }
  function usePugClosed(h,id,ctx){
    syncPug(h);var l=lvl(h,'Пугилист'),s=state(h),t=target(ctx);
    if(id==='oldOneTwo'||id==='stickAndMove'||id==='bloodiedButUnbowed'||id==='haymaker'||id==='shakeItOff')return usePug(h,id,ctx);
    if(id==='digDeep'){if(!spend(h,'moxie',1))return{ok:false,message:'Недостаточно Мокси.'};s.digDeep=true;return{ok:true,effect:{resistance:['bludgeoning','piercing','slashing'],duration:'1 minute',exhaustionAfter:true},message:'🥊 Соберись с силами активировано.'};}
    if(id==='unbreakable'){if(!spend(h,'moxie',1))return{ok:false,message:'Недостаточно Мокси.'};return{ok:true,effect:{rerollSave:['str','dex','con'],advantage:true},message:'🛡️ Несокрушимый: переброс спасброска.'};}
    if(id==='fightingSpirit'){if(s.fightingSpiritUsed)return{ok:false,message:'Боевой дух уже использован после долгого отдыха.'};s.fightingSpiritUsed=true;return{ok:true,effect:{reviveAtZero:true,hpFraction:.5,moxieFraction:.5,exhaustionGain:1},message:'🔥 Боевой дух сработал.'};}
    if(id==='peakPhysicalCondition')return{ok:true,effect:{abilityIncrease:{strength:2,constitution:2,max:22},restoreExhaustion:2,restoreHitDice:true},message:'💪 Пиковая физическая форма.'};
    if(id==='subclassFeature'){var club=s.pugilistClub||s.subclass||'';return pugClubEffect(h,club,ctx&&ctx.featureId||'feature',ctx);}
    return{ok:false,unsupported:true,message:'Пугилист: неизвестная активная способность '+id};
  }
  function pugAttackClosed(h,ctx){
    var o=pugAttack(h,ctx),s=state(h),l=lvl(h,'Пугилист');
    if(s.digDeep)o.notes.push('Dig Deep');
    if(s.haymakerActive){o.extraDice.push(l>=11?'1d10':'1d8');o.notes.push('Haymaker');s.haymakerActive=false;}
    if(s.pugilistClub==='sweetScience')o.notes.push('Sweet Science');
    return o;
  }

  var WAR_ACADEMIES=['knighthood','dread','ferocity','gallantry','intrigue','tactics','claws','mentorship','freedom','seafarers','order','zeal'];
  function syncWarlord(h){
    var l=lvl(h,'Военачальник');if(!l)return;
    res(h,'inspiringWord',arrMax(l,[0,3,3,3,4,4,4,4,5,5,5,5,5,6,6,6,6,7,7,7,7]),'short');
    res(h,'exploitDice',arrMax(l,[0,0,2,2,3,3,3,3,3,3,4,4,4,4,4,4,5,5,5,5]),'short');
    sState(h).warlordAcademy=sState(h).warlordAcademy||null;
    sState(h).leadershipAbility=sState(h).leadershipAbility||'charisma';
  }
  function sState(h){return state(h);}
  function exploit(h,die){
    var r=h.resources&&h.resources.exploitDice;if(!r||r.current<1)return false;r.current-=1;
    return true;
  }
  function warAcademyEffect(h,academy,id){
    var e={academy:academy,id:id};
    if(academy==='knighthood')e.effect={allyCharge:true,hope:true};
    else if(academy==='dread')e.effect={fearAura:true,commandWithoutFear:true};
    else if(academy==='ferocity')e.effect={hunterCompanion:true,advantageAgainstWounded:true};
    else if(academy==='gallantry')e.effect={spells:true,heroicRush:true,warSongs:true};
    else if(academy==='intrigue')e.effect={dirtyStrike:true,mentalDefense:true};
    else if(academy==='tactics')e.effect={battlefieldAnalysis:true,enemyRead:true,allyReposition:true};
    else if(academy==='claws')e.effect={monstrousMinion:true,beastCommand:true};
    else if(academy==='mentorship')e.effect={student:true,sharedReaction:true};
    else if(academy==='freedom')e.effect={allyFormation:true,bonusActionSupport:true};
    else if(academy==='seafarers')e.effect={navigation:true,crewSupport:true,seaMobility:true};
    else if(academy==='order')e.effect={lawShield:true,stopIntruder:true,defenderAura:true};
    else if(academy==='zeal')e.effect={holyMagic:true,channelDivinity:true,zealousWords:true};
    else e.effect={academyFeature:true};
    return e;
  }
  function useWarlord(h,id,ctx){
    syncWarlord(h);var l=lvl(h,'Военачальник'),t=target(ctx),s=state(h),lead=mod(h,s.leadershipAbility||'cha');
    if(id==='inspiringWord'){if(!spend(h,'inspiringWord',1))return{ok:false,message:'Нет Вдохновляющего слова.'};if(!t)return{ok:false,message:'Выбери союзника.'};return{ok:true,target:t.id,effect:{healHitDie:true,healModifier:lead},message:'📣 Вдохновляющее слово.'};}
    if(id==='tacticalSkill'){if(!exploit(h))return{ok:false,message:'Нет кубов Тактических приёмов.'};return{ok:true,effect:{skillBonus:'exploitDie'},message:'🎯 Тактический приём добавлен к проверке.'};}
    if(id==='rallyingCry'){if(!spend(h,'inspiringWord',1)||!t)return{ok:false,message:'Нужен ресурс и союзник.'};return{ok:true,target:t.id,effect:{rerollSave:true,bonus:lead},message:'📣 Боевой клич.'};}
    if(id==='tacticalSuperiority'){var a=h.resources&&h.resources.inspiringWord,b=h.resources&&h.resources.exploitDice;if(a)a.current=Math.min(a.max,a.current+1);if(b)b.current=Math.min(b.max,b.current+1);return{ok:true,effect:{commandRangeMultiplier:2},message:'⚔️ Тактическое превосходство.'};}
    if(id==='dauntless')return{ok:true,effect:{rallyUnlimited:true,inspiringWordMaxHeal:true},message:'🛡️ Неустрашимый.'};
    if(id==='academyFeature'){return warAcademyEffect(h,s.warlordAcademy,ctx&&ctx.featureId||'feature');}
    if(id==='exploit'){if(!exploit(h))return{ok:false,message:'Нет кубов Тактических приёмов.'};return{ok:true,target:t&&t.id,effect:{exploitDie:true},message:'🎯 Тактический приём применён.'};
    return{ok:false,unsupported:true,message:'Военачальник: неизвестная активная способность '+id};
  }
  function warAttack(h,ctx){
    var o={bonusDamage:0,extraDice:[],advantage:false,disadvantage:false,notes:[]},s=state(h);
    if(s.warlordAttackBonus)o.bonusDamage+=Number(s.warlordAttackBonus)||0;
    return o;
  }

  function syncWitch(h){
    var l=lvl(h,'Ведьма');if(!l)return;
    var p=arrMax(l,[0,2,3,3,3,4,4,4,4,5,5,6,6,6,7,7,8,8,9,9,10]);
    res(h,'hexes',p,'long');
    var s=state(h);s.witchCraft=s.witchCraft||null;s.familiar=s.familiar||{active:false,name:'Фамильяр ведьмы'};
  }
  function useWitch(h,id,ctx){
    syncWitch(h);var l=lvl(h,'Ведьма'),t=target(ctx),s=state(h);
    if(id==='hex'){if(!t)return{ok:false,message:'Выбери цель для проклятия.'};s.hexTarget=t.id;return{ok:true,target:t.id,effect:{curse:true,concentration:false,damage:'1d6',duration:'untilRest'},message:'🧿 Проклятие наложено.'};}
    if(id==='cackle'){return{ok:true,effect:{extendHex:true,bonusAction:true},message:'😈 Cackle: поддержание проклятия бонусным действием.'};}
    if(id==='familiar'){s.familiar.active=true;return{ok:true,effect:{summon:'witchFamiliar',linked:true},message:'🐈 Фамильяр призван.'};}
    if(id==='grandHex'){var n=ctx&&ctx.hexName||'Grand Hex';if(!spend(h,'hexes',1))return{ok:false,message:'Нет доступного Hex.'};return{ok:true,target:t&&t.id,effect:{grandHex:n,save:'wis'},message:'🕯️ Великий Hex: '+n};}
    if(id==='witchCurse'){if(!t)return{ok:false,message:'Выбери цель.'};s.curseTarget=t.id;return{ok:true,target:t.id,effect:{curse:true,save:'wis'},message:'☠️ Ведьмино проклятие наложено.'};}
    if(id==='craftFeature'){
      var craft=s.witchCraft||'Black';
      var effects={Black:{necrotic:true,undead:true,cursePower:true},Green:{nature:true,beast:true,poisonResistance:true},Red:{fire:true,damageBoost:true},White:{healing:true,protection:true}};
      return{ok:true,effect:effects[craft]||effects.Black,message:'🔮 Ремесло ведьмы: '+craft};
    }
    if(id==='hexmaster')return{ok:true,effect:{hexesAtWill:true,curseMastery:true},message:'👑 Hexmaster активирован.'};
    return{ok:false,unsupported:true,message:'Ведьма: неизвестная активная способность '+id};
  }
  function witchAttack(h,ctx){
    var o={bonusDamage:0,extraDice:[],advantage:false,disadvantage:false,notes:[]},s=state(h);
    if(s.hexTarget&&ctx&&ctx.target&&String(s.hexTarget)===String(ctx.target.id))o.extraDice.push(lvl(h,'Ведьма')>=11?'1d8':'1d6'),o.notes.push('Witch Hex');
    return o;
  }


  function syncPsion(h){
    var l=lvl(h,'Псионик');if(!l)return;
    var max=[0,2,3,5,6,7,9,10,11,13,14,15,17,18,19,20,21,22,23,25][l]||25;
    res(h,'psiPoints',max,'long');
    var s=state(h);s.psionDiscipline=s.psionDiscipline||'Астральный разум';s.psionicFocus=s.psionicFocus||false;
  }
  function psiCost(h,n){return spend(h,'psiPoints',n);}
  function usePsion(h,id,ctx){
    syncPsion(h);var l=lvl(h,'Псионик'),s=state(h),t=target(ctx),cost=Number(ctx&&ctx.cost)||1;
    if(id==='psiBlast'){if(!t)return{ok:false,message:'Выбери цель.'};if(!psiCost(h,cost))return{ok:false,message:'Недостаточно псионических очков.'};return{ok:true,target:t.id,effect:{damage:(1+Math.floor(l/5))+'d8',damageType:ctx.damageType||'psychic',save:'int'},message:'🧠 Псионический взрыв.'};}
    if(id==='mindLink'){if(!psiCost(h,1))return{ok:false,message:'Недостаточно псионических очков.'};s.psionicFocus=true;return{ok:true,effect:{telepathyFt:120,link:true,duration:'1 hour'},message:'🔗 Ментальная связь установлена.'};}
    if(id==='psychicShield'){if(!psiCost(h,2))return{ok:false,message:'Недостаточно псионических очков.'};return{ok:true,effect:{reaction:true,acBonus:2,resistance:'psychic',duration:'1 round'},message:'🛡️ Психический щит.'};}
    if(id==='telekineticPush'){if(!t)return{ok:false,message:'Выбери цель.'};if(!psiCost(h,1))return{ok:false,message:'Недостаточно псионических очков.'};return{ok:true,target:t.id,effect:{forcedMoveFt:30,save:'str'},message:'🌀 Телекинетический толчок.'};}
    if(id==='teleport'){if(!psiCost(h,3))return{ok:false,message:'Недостаточно псионических очков.'};return{ok:true,effect:{teleportFt:Number(ctx.distanceFt)||60,provokesNoOpportunity:true},message:'✨ Псионическая телепортация.'};}
    if(id==='dominateMind'){if(!t)return{ok:false,message:'Выбери цель.'};if(!psiCost(h,5))return{ok:false,message:'Недостаточно псионических очков.'};return{ok:true,target:t.id,effect:{condition:'charmed',save:'wis',duration:'1 minute',concentration:true},message:'👁️ Подчинение разума.'};}
    if(id==='discipline'){
      var d=ctx.discipline||s.psionDiscipline;var map={
        'Астральный разум':{effect:{telepathyFt:120,clairvoyance:true}},
        'Психокинез':{effect:{telekinesis:true,moveFt:30}},
        'Психометаболизм':{effect:{tempHp:l*2,advantageOnCon:true}},
        'Телепатия':{effect:{mindRead:true,telepathyFt:120}},
        'Прорицание':{effect:{foresight:true,advantageOnChecks:true}},
        'Телепортация':{effect:{teleportFt:60,noOpportunity:true}}
      };return{ok:true,effect:map[d]||map['Астральный разум'],message:'🧠 Дисциплина: '+d};
    }
    if(id==='apotheosis')return{ok:true,effect:{psiPointsMax:25,regainOnShortRest:true,immune:['charmed','frightened'],allDisciplines:true},message:'🌌 Псионический апофеоз.'};
    return{ok:false,unsupported:true,message:'Псионик: неизвестная активная способность '+id};
  }
  function psionAttack(h,ctx){
    var o={bonusDamage:0,extraDice:[],advantage:false,disadvantage:false,notes:[]},s=state(h);
    if(s.psionicFocus)o.notes.push('Псионический фокус');
    if(ctx&&ctx.psionicDamage)o.extraDice.push(lvl(h,'Псионик')>=11?'2d8':'1d8');
    return o;
  }

  var packs=[
    {id:'psion',name:'Псионик',source:'Project custom class contract',license:'Project-owned rules layer',features:[{id:'psiBlast',name:'Псионический взрыв',level:1,action:'action',target:'enemy'},{id:'mindLink',name:'Ментальная связь',level:1,action:'action',target:'ally'},{id:'psychicShield',name:'Психический щит',level:2,action:'reaction',target:'self'},{id:'telekineticPush',name:'Телекинетический толчок',level:2,action:'action',target:'enemy'},{id:'teleport',name:'Псионическая телепортация',level:5,action:'bonus',target:'self'},{id:'dominateMind',name:'Подчинение разума',level:9,action:'action',target:'enemy'},{id:'discipline',name:'Псионическая дисциплина',level:2,action:'varies'},{id:'apotheosis',name:'Псионический апофеоз',level:20,action:'passive'}],subclasses:[{id:'astral',name:'Астральный разум'},{id:'kinetic',name:'Психокинез'},{id:'metabolic',name:'Психометаболизм'},{id:'telepath',name:'Телепатия'},{id:'seer',name:'Прорицание'},{id:'teleporter',name:'Телепортация'}],hooks:{sync:syncPsion,useFeature:usePsion,attackModifiers:psionAttack}},

    {id:'mcdm-illrigger',name:'Иллирригер',source:'MCDM Productions — The Illrigger Revised',license:'Requires appropriate source rights',features:[{id:'infernalBrand',name:'Infernal Brand',level:1,action:'bonus',target:'enemy',rangeFt:60},{id:'sealTransfer',name:'Seal Transfer',level:2,action:'action',target:'enemy',rangeFt:60},{id:'hellishRebuke',name:'Infernal Reaction',level:3,action:'reaction',target:'enemy',rangeFt:60}],subclasses:[{id:'hellknight',name:'Hell Knight',features:[{id:'hellishArmor',name:'Infernal Armor',level:3,action:'passive'}]},{id:'shadowmaster',name:'Shadowmaster',features:[{id:'shadowStep',name:'Shadow Step',level:3,action:'bonus'}]},{id:'painkiller',name:'Painkiller',features:[{id:'painTransfer',name:'Pain Transfer',level:3,action:'reaction'}]},{id:'duelist',name:'Dread Duelist',features:[{id:'infernalDuel',name:'Infernal Duel',level:3,action:'bonus'}]},{id:'commander',name:'Hellspeaker',features:[{id:'commandSeal',name:'Command Seal',level:3,action:'bonus'}]}],hooks:{sync:syncIll,useFeature:useIll,attackModifiers:illAttack}},
    {id:'mcdm-beastheart',name:'Бистхарт',source:'MCDM Productions — Beastheart and Monstrous Companions (5e)',license:'Requires appropriate source rights',features:[{id:'companionCommand',name:'Companion Command',level:1,action:'action',target:'self'},{id:'ferociousStrike',name:'Ferocious Strike',level:1,action:'bonus',target:'enemy',rangeFt:30},{id:'earthshaker',name:'Earthshaker',level:2,action:'action',rangeFt:10},{id:'rampage',name:'Rampage',level:3,action:'bonus',target:'self'}],subclasses:[{id:'beastcaller',name:'Beastcaller',features:[{id:'bondedBeast',name:'Bonded Beast',level:3,action:'passive'}]},{id:'direHunter',name:'Dire Hunter',features:[{id:'predatoryStrike',name:'Predatory Strike',level:3,action:'on-hit'}]},{id:'packleader',name:'Pack Leader',features:[{id:'packTactics',name:'Pack Tactics',level:3,action:'passive'}]},{id:'primalSoul',name:'Primal Soul',features:[{id:'primalBond',name:'Primal Bond',level:3,action:'bonus'}]},{id:'wildHeart',name:'Wild Heart',features:[{id:'feralForm',name:'Feral Form',level:3,action:'bonus'}]}],hooks:{sync:syncBeast,useFeature:useBeast,attackModifiers:beastAttack}},
    {id:'pugilist',name:'Пугилист',source:'Benjamin Huffman / community Pugilist',license:'Requires appropriate source rights',features:[{id:'oldOneTwo',name:'Old One-Two',level:1,action:'bonus',target:'self'},{id:'stickAndMove',name:'Stick and Move',level:1,action:'bonus',target:'self'},{id:'bloodiedButUnbowed',name:'Bloodied but Unbowed',level:3,action:'reaction',target:'self'},{id:'haymaker',name:'Haymaker',level:5,action:'bonus',target:'enemy',rangeFt:5},{id:'shakeItOff',name:'Shake It Off',level:7,action:'bonus',target:'self'},{id:'digDeep',name:'Dig Deep',level:2,action:'bonus',target:'self'},{id:'unbreakable',name:'Unbreakable',level:14,action:'reaction',target:'self'},{id:'fightingSpirit',name:'Fighting Spirit',level:18,action:'reaction',target:'self'},{id:'peakPhysicalCondition',name:'Peak Physical Condition',level:20,action:'passive'}],subclasses:[{id:'arenaRoyale',name:'Арена Рояль'},{id:'bloodhoundBruisers',name:'Бладхаундские громилы'},{id:'dogAndHound',name:'Пёс и гончая'},{id:'handOfDread',name:'Рука Ужаса'},{id:'pissAndVinegar',name:'Ярость и дерзость'},{id:'squaredCircle',name:'Квадратный ринг'},{id:'sweetScience',name:'Благородное искусство'}],hooks:{sync:syncPug,useFeature:usePugClosed,attackModifiers:pugAttackClosed}},
    {id:'warlord',name:'Военачальник',source:'Laserllama Warlord',license:'Requires appropriate source rights',features:[{id:'inspiringWord',name:'Inspiring Word',level:1,action:'bonus',target:'ally',rangeFt:30},{id:'tacticalSkill',name:'Tactical Skill',level:2,action:'check',target:'self'},{id:'rallyingCry',name:'Rallying Cry',level:9,action:'reaction',target:'ally'},{id:'tacticalSuperiority',name:'Tactical Superiority',level:11,action:'bonus',target:'self'},{id:'dauntless',name:'Dauntless',level:20,action:'passive'}],subclasses:WAR_ACADEMIES.map(function(id){return{id:id,name:id,features:[{id:'academyFeature',name:'Academy Feature',level:3,action:'varies'}]};}),hooks:{sync:syncWarlord,useFeature:useWarlord,attackModifiers:warAttack}},
    {id:'witch',name:'Ведьма',source:'Mage Hand Press Complete Witch',license:'Requires appropriate source rights',features:[{id:'hex',name:'Hex',level:1,action:'action',target:'enemy'},{id:'cackle',name:'Cackle',level:2,action:'bonus',target:'self'},{id:'familiar',name:'Familiar',level:2,action:'action',target:'self'},{id:'grandHex',name:'Grand Hex',level:11,action:'action',target:'enemy'},{id:'witchCurse',name:'Witch Curse',level:1,action:'action',target:'enemy'},{id:'craftFeature',name:'Witch Craft',level:3,action:'varies'},{id:'hexmaster',name:'Hexmaster',level:20,action:'passive'}],subclasses:[{id:'Black',name:'Чёрное ремесло'},{id:'Green',name:'Зелёное ремесло'},{id:'Red',name:'Красное ремесло'},{id:'White',name:'Белое ремесло'}],hooks:{sync:syncWitch,useFeature:useWitch,attackModifiers:witchAttack}}
  ];
  packs.forEach(function(p){D.registerClass(p);});
  g.DNDExpandedV23={VERSION:'1.0.0',packs:packs.map(function(p){return p.id;})};
})(window);
