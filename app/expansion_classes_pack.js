/**
 * expansion_classes_pack.js
 * ------------------------------------------------------------------
 * ЧТО ЭТО ЗА ФАЙЛ:
 * Контент-пак популярных сторонних 5e-классов, подключаемых через
 * Content Framework. Здесь нет копии текста книг: только оригинальные
 * структурированные описания и runtime-эффекты для VTT.
 *
 * КАК РАБОТАЕТ:
 * - регистрирует Psion, Warlord, Warden и Spellblade;
 * - создаёт их ресурсы и активные способности;
 * - attackModifiers/saveModifiers дают боевому движку эффекты;
 * - useFeature работает через выбранную VTT-цель из context.target.
 *
 * ОСНОВНЫЕ ПЕРЕМЕННЫЕ:
 * hero.resources, hero.classFeaturesState, psiPoints, commandDice,
 * primalFocus, spellstrikeState и context.target.
 *
 * ИСТОЧНИК:
 * KibblesTasty Homebrew — популярный сторонний 5e-контент. Названия
 * классов/архетипов и происхождение контента помечены; реализация здесь
 * является самостоятельным runtime-слоем и не воспроизводит книгу.
 *
 * НЕ ИЗМЕНЯЕТ Wallpapers.js/Ambiences.js.
 * ------------------------------------------------------------------
 */
(function(global){
  'use strict';
  var D=global.DNDContent;
  if(!D)return;
  function lvl(h,n){var c=(h.classes||[]).find(function(x){return String(x.name)===n;});return c?Number(c.level)||0:0;}
  function st(h){h.classFeaturesState=h.classFeaturesState||{};return h.classFeaturesState;}
  function res(h,key,max,recharge){h.resources=h.resources||{};var r=h.resources[key]||{};r.max=max;r.current=Math.min(Number(r.current===undefined?max:r.current),max);r.recharge=recharge;h.resources[key]=r;return r;}
  function spend(h,key,n){var r=h.resources&&h.resources[key];if(!r||r.current<n)return false;r.current-=n;return true;}
  function mod(h,k){var a=h.abilities||{};var v=a[k]||a[k.toUpperCase()]||0;return Number(v)>10?Math.floor((Number(v)-10)/2):Number(v)||0;}
  function dieFor(l){return l>=17?'1d12':l>=11?'1d10':l>=5?'1d8':'1d6';}

  function psiLimit(l){return Math.ceil(l/2);} function psiMax(l){return l;}
  function syncPsion(h){var l=lvl(h,'Psion');if(!l)return;var r=res(h,'psiPoints',l,'short');r.limit=psiLimit(l);var s=st(h);s.psionTalentsKnown=l>=18?8:l>=15?7:l>=12?6:l>=9?5:l>=7?4:l>=5?3:2;s.psionDisciplinesKnown=l>=18?3:2;s.psionMasteryFree=l>=17?3:l>=11?2:l>=5?1:0;s.psionInnate=s.psionInnate||{};}
  function warlordDice(l){return l>=17?7:l>=13?6:l>=9?5:l>=5?4:3;}
  function warlordDie(l){return l>=17?'d10':l>=9?'d8':'d6';}
  function syncWarlord(h){var l=lvl(h,'Warlord');if(!l)return;var r=res(h,'commandDice',warlordDice(l),'short');r.die=warlordDie(l);r.perTurn=l>=17?4:l>=11?3:l>=6?2:1;}
  function wardenEndurance(l){return l>=17?7:l>=13?6:l>=9?5:l>=5?4:3;}
  function wardenDie(l){return l>=11?'d12':l>=5?'d10':'d8';}
  function syncWarden(h){var l=lvl(h,'Warden');if(!l)return;var r=res(h,'wardenEndurance',wardenEndurance(l),'short');r.die=wardenDie(l);}
  function syncSpellblade(h){var l=lvl(h,'Spellblade');if(!l)return;res(h,'arcaneSurges',Math.max(2,Math.ceil((Number(h.proficiencyBonus)||Math.floor((l-1)/4)+2))), 'short');}

  function target(ctx){return ctx&&ctx.target?ctx.target:null;}
  function usePsion(h,id,ctx,feature){
 syncPsion(h);ctx=ctx||{};var l=lvl(h,'Psion'),s=st(h),r=h.resources.psiPoints,t=target(ctx),cost=Math.max(0,Number(ctx.psi)||0);
 if(cost>r.limit)return{ok:false,message:'За один эффект можно потратить не более '+r.limit+' очк. пси.'};
 if(id==='usePsi'){if(!cost||!spend(h,'psiPoints',cost))return{ok:false,message:'Недостаточно очков пси.'};return{ok:true,effect:{psiSpent:cost},message:'🧠 Потрачено '+cost+' очк. пси.'};}
 if(id==='enhancingSurge'){if(!t)return{ok:false,message:'Выбери цель.'};if(cost&&!spend(h,'psiPoints',cost))return{ok:false,message:'Недостаточно очков пси.'};return{ok:true,target:t.id,effect:{tempHp:'1d6',nextDamage:'1d6',extraTempHpDice:cost},message:'🧠 Усиливающий импульс применён.'};}
 if(id==='telekineticForce'||id==='telekineticPush'){if(!t)return{ok:false,message:'Выбери цель.'};if(cost&&!spend(h,'psiPoints',cost))return{ok:false,message:'Недостаточно очков пси.'};return{ok:true,target:t.id,effect:{save:'str',forcedMoveFt:5*(1+cost),damage:cost?'1d8 psychic':null},message:'🧠 Телекинетическая сила применена.'};}
 if(id==='telepathicIntrusion'||id==='mindThrust'){if(!t)return{ok:false,message:'Выбери цель.'};if(cost&&!spend(h,'psiPoints',cost))return{ok:false,message:'Недостаточно очков пси.'};return{ok:true,target:t.id,effect:{save:id==='mindThrust'?null:'wis',attackRoll:id==='mindThrust',damage:(1+cost)+'d8 psychic'},message:'🧠 Телепатическая атака применена.'};}
 if(id==='phaseRift'){if(cost&&!spend(h,'psiPoints',cost))return{ok:false,message:'Недостаточно очков пси.'};return{ok:true,effect:{teleportFt:30+10*cost,passesThroughSolid:!!ctx.ethereal},message:'🌀 Фазовый разрыв активирован.'};}
 if(id==='elementalBlast'){if(!t)return{ok:false,message:'Выбери цель.'};if(cost&&!spend(h,'psiPoints',cost))return{ok:false,message:'Недостаточно очков пси.'};return{ok:true,target:t.id,effect:{rangedSpellAttack:true,damage:(1+cost)+'d8 '+(ctx.element||'force')},message:'⚡ Элементальный взрыв.'};}
 if(id==='astralConstruct'){if(cost&&!spend(h,'psiPoints',cost))return{ok:false,message:'Недостаточно очков пси.'};s.astralConstruct={active:true,psi:cost};return{ok:true,effect:{summon:'astralConstruct',durationRounds:10,concentration:true,moveFt:30},message:'🜁 Астральная конструкция создана.'};}
 if(id==='projectItem')return{ok:true,effect:{createProjectedItem:true,maxSizeFt:3,maxWeightLb:10,durationRounds:10},message:'🜁 Предмет спроецирован.'};
 if(id==='seeing'){if(!t)return{ok:false,message:'Выбери цель.'};if(cost&&!spend(h,'psiPoints',cost))return{ok:false,message:'Недостаточно очков пси.'};return{ok:true,target:t.id,effect:{advantageNextAttack:true},message:'👁️ Видение применено.'};}
 if(id==='denial'){if(!t)return{ok:false,message:'Выбери цель.'};cost=Math.max(1,cost);if(!spend(h,'psiPoints',cost))return{ok:false,message:'Недостаточно очков пси.'};return{ok:true,target:t.id,effect:{save:'cha',endEffectPowerUpTo:cost},message:'🛑 Нейтрализация применена.'};}
 if(id==='mindLeech'){if(!t)return{ok:false,message:'Выбери цель.'};cost=Math.max(1,cost);if(!spend(h,'psiPoints',cost))return{ok:false,message:'Недостаточно очков пси.'};return{ok:true,target:t.id,effect:{save:'wis',damage:cost+'d8 psychic',healSelf:'half psychic damage',restorePsi:1},message:'🩸 Пиявка разума применена.'};}
 if(id==='psiMastery')return{ok:true,effect:{freePsiPerTurn:s.psionMasteryFree||0},message:'🧠 Псионическое мастерство активно.'};
 if(id==='innatePsionics'){var sl=Number(ctx.spellLevel)||6;if(sl<6||sl>9||s.psionInnate[sl])return{ok:false,message:'Эта врождённая способность уже использована.'};s.psionInnate[sl]=true;return{ok:true,effect:{castSpell:ctx.spell||'выбранное заклинание',spellLevel:sl,requiresComponents:true},message:'🧠 Врождённая псионика применена.'};}
 if(id==='fullAwakening'){if(!spend(h,'psiPoints',2))return{ok:false,message:'Нужно 2 очка пси.'};return{ok:true,effect:{advantageAttackRolls:true,advantageSavingThrows:true,durationRounds:1},message:'🧠 Полное пробуждение.'};}
 if(id==='rampage'){s.rampageDie=s.rampageDie||'d4';var ds=['d4','d6','d8','d10','d12'],i=ds.indexOf(s.rampageDie);s.rampageDie=ctx.dealtDamage?ds[Math.min(4,i+1)]:'d4';return{ok:true,effect:{bonusDamageDie:s.rampageDie},message:'💥 Неистовствующий разум: '+s.rampageDie+'.'};}
 if(id==='unstoppableRampage')return{ok:true,effect:{zeroHpSave:'rampageDie+CON',restoreHP:1},message:'💥 Неудержимое неистовство готово.'};
 if(id==='ascension'){s.ascended=true;return{ok:true,effect:{etherealEntity:true,ghostPhysicalStats:true,retainMentalStats:true},message:'👻 Вознесение активировано.'};}
 if(id==='mentalConstruct')return usePsion(h,'astralConstruct',ctx,feature);
 if(feature&&feature.action==='passive')return{ok:true,passive:true,message:'✨ '+(feature.name||id)+' активно.'};
 return{ok:false,unsupported:true,message:'Способность Псионика зарегистрирована, но отдельный runtime-эффект ещё требует движка.'};
}
  function useWarlord(h,id,ctx,feature){syncWarlord(h);var t=target(ctx);if(id==='commandingStrike'){if(!t)return{ok:false,message:'Выбери союзника на поле.'};if(!spend(h,'commandDice',1))return{ok:false,message:'Нет кубов лидерства.'};return{ok:true,target:t.id,effect:{grantAttack:true,bonusDie:(h.resources&&h.resources.commandDice&&h.resources.commandDice.die)||dieFor(lvl(h,'Warlord'))},message:'⚔️ Commanding Strike: союзник получает усиление атаки.'};}if(id==='rallyingCry'){if(!spend(h,'commandDice',1))return{ok:false,message:'Нет кубов лидерства.'};return{ok:true,effect:{allyTempHp:Math.max(1,mod(h,'cha'))+Number(lvl(h,'Warlord'))},message:'📣 Rallying Cry: союзники получают временные HP.'};}if(feature&&feature.action==='passive')return{ok:true,passive:true,message:'✨ '+(feature.name||id)+' пассивно активно.'};return{ok:false,unsupported:true,message:'Способность '+id+' зарегистрирована, но её runtime-эффект ещё не реализован.'};}
  function warlordAttack(h){return{bonusDamage:0,extraDice:[],advantage:false,disadvantage:false,notes:[]};}

  function useWarden(h,id,ctx,feature){syncWarden(h);var t=target(ctx);if(id==='primalChallenge'){if(!t)return{ok:false,message:'Выбери врага на поле.'};if(!spend(h,'wardenEndurance',1))return{ok:false,message:'Нет костей выносливости.'};st(h).challengedTargetId=t.id;return{ok:true,target:t.id,effect:{marked:true},message:'🌿 Primal Challenge: цель помечена.'};}if(id==='earthshaker'){if(!spend(h,'wardenEndurance',2))return{ok:false,message:'Недостаточно костей выносливости.'};return{ok:true,effect:{aoeRadiusFt:10,damage:'2d6 bludgeoning',save:'str'},message:'🌿 Earthshaker: зона 10 ft подготовлена.'};}if(feature&&feature.action==='passive')return{ok:true,passive:true,message:'✨ '+(feature.name||id)+' пассивно активно.'};return{ok:false,unsupported:true,message:'Способность '+id+' зарегистрирована, но её runtime-эффект ещё не реализован.'};}
  function wardenAttack(h,ctx){var s=st(h),o={bonusDamage:0,extraDice:[],advantage:false,disadvantage:false,notes:[]};if(s.challengedTargetId&&ctx&&ctx.target&&String(s.challengedTargetId)===String(ctx.target.id)){o.extraDice.push(dieFor(lvl(h,'Warden')));o.notes.push('Primal Challenge');}return o;}

  function useSpellblade(h,id,ctx,feature){syncSpellblade(h);if(id==='spellstrike'){if(!spend(h,'arcaneSurges',1))return{ok:false,message:'Нет доступного арканного рывка.'};st(h).spellstrikePending=true;return{ok:true,effect:{spellstrike:true},message:'⚔️✨ Spellstrike: следующая атака может связать оружие и заклинание.'};}if(id==='arcaneGuard'){st(h).arcaneGuard=true;return{ok:true,effect:{tempHp:5+lvl(h,'Spellblade')},message:'✨ Arcane Guard активирован.'};}if(feature&&feature.action==='passive')return{ok:true,passive:true,message:'✨ '+(feature.name||id)+' пассивно активно.'};return{ok:false,unsupported:true,message:'Способность '+id+' зарегистрирована, но её runtime-эффект ещё не реализован.'};}
  function spellbladeAttack(h){var s=st(h),o={bonusDamage:0,extraDice:[],advantage:false,disadvantage:false,notes:[]};if(s.spellstrikePending){o.extraDice.push('2d6');o.notes.push('Spellstrike');s.spellstrikePending=false;}return o;}

  function syncNecromancer(h){var l=lvl(h,'Некромант');if(!l)return;res(h,'charnelTouch',5*l,'long');res(h,'undyingServitude',l>=18?1:0,'long');var t=l>=20?6:l>=17?5:l>=13?4:l>=10?3:l>=7?3:l>=2?2:0;h.necromancerThrallsMax=t;h.necromancerThrallCRTotal=l>=20?4:l>=17?4:l>=13?3:l>=10?2:l>=7?1:l>=2?1:0;}
  function useNecromancer(h,id,ctx,feature){syncNecromancer(h);ctx=ctx||{};if(id==='charnelTouch'){var max=5*Math.max(1,Number(h.proficiencyBonus)||Math.floor((lvl(h,'Некромант')-1)/4)+2),cost=Math.max(1,Math.min(max,Number(ctx.points)||1));if(!spend(h,'charnelTouch',cost))return{ok:false,message:'Недостаточно энергии Могильного касания.'};return{ok:true,effect:{spellAttack:true,damage:cost+' necrotic'},message:'☠️ Могильное касание: '+cost+' некротического урона.'};}if(id==='darkArcana'){var slot=Math.max(1,Number(ctx.spellLevel)||1);var gain=Number(h.abilityScores&&h.abilityScores.intelligence||h.stats&&h.stats.int||10);gain=Math.floor((gain-10)/2)+Math.floor(3.5*slot);var r=h.resources&&h.resources.charnelTouch;if(!r)return{ok:false,message:'Ресурс Могильного касания не найден.'};r.current=Math.min(r.max,r.current+gain);return{ok:true,message:'☠️ Тёмная аркана: восстановлено '+gain+' очк.'};}if(id==='undyingServitude'){if(!spend(h,'undyingServitude',1))return{ok:false,message:'Неумирающее служение уже использовано.'};return{ok:true,effect:{restoreThrall:true,hitPoints:2*lvl(h,'Некромант')},message:'☠️ Слуга остаётся при 1 HP и восстанавливает '+(2*lvl(h,'Некромант'))+' HP.'};}if(feature&&feature.action==='passive')return{ok:true,passive:true,message:'☠️ '+(feature.name||id)+' активно.'};return{ok:false,unsupported:true,message:'Способность зарегистрирована; отдельная механика ещё не добавлена.'};}
  function necromancerAttack(h,ctx){var o={bonusDamage:0,extraDice:[],advantage:false,disadvantage:false,notes:[]};if(lvl(h,'Некромант')>=5&&ctx&&ctx.spellAttack&&ctx.critical)o.forceCritical=false;if(lvl(h,'Некромант')>=5&&ctx&&ctx.spellAttack&&ctx.critical){o.notes.push('Критическое колдовство: критическое заклинательное попадание.');}return o;}
  function syncMartyr(h){var l=lvl(h,'Мученик');if(!l)return;res(h,'martyrSpellUses',[0,2,2,3,3,6,6,7,7,9,9,10,10,11,11,12,12,14,14,15,15][l]||2,'long');res(h,'divineRespite',l>=17?10:l>=13?6:3,'long');res(h,'undying',l>=10?1:0,'long');}
  function useMartyr(h,id,ctx,feature){syncMartyr(h);ctx=ctx||{};var l=lvl(h,'Мученик');if(id==='sacrificialStrike'){var dmg=l>=11?20:10;return{ok:true,effect:{selfRadiantDamage:l>=11?10:5,targetRadiantDamage:dmg,ignoreResistance:true},message:'✝️ Жертвенный удар: +'+dmg+' излучения ценой собственного HP.'};}if(id==='miraculousHealing'){var amount=Math.max(1,Number(ctx.amount)||Math.max(1,Math.floor(l/2)+mod(h,'wis')));return{ok:true,effect:{healHP:amount},amount:amount,message:'✝️ Чудесное исцеление: восстановить '+amount+' HP.'};}if(id==='sacrificeFoe'){return{ok:true,effect:{waiveSacrificeDamage:true},message:'✝️ Жертва врага: при добивании цели жертва не наносит тебе урон.'};}if(id==='divineRespite'){var r=h.resources&&h.resources.divineRespite;if(!spend(h,'divineRespite',1))return{ok:false,message:'Божественная передышка уже использована.'};return{ok:true,effect:{restoreHitDice:r.max},message:'✝️ Божественная передышка: можно восстановить до '+r.max+' КХ.'};}if(id==='undying'){if(!spend(h,'undying',1))return{ok:false,message:'Неумирающий уже использован.'};return{ok:true,effect:{setHP:1,triggerHealing:true},message:'✝️ Неумирающий: вместо 0 HP остаётся 1 HP.'};}if(id==='finalMartyrdom'){return{ok:true,effect:{durationMinutes:10,damageImmunity:true,conditionImmunity:true,advantageAllD20:true,castWish:true,deathAfterDuration:true},message:'✝️ Последнее мученичество активировано на 10 минут.'};}if(feature&&feature.action==='passive')return{ok:true,passive:true,message:'✝️ '+(feature.name||id)+' активно.'};return{ok:false,unsupported:true,message:'Способность зарегистрирована; отдельная механика ещё не добавлена.'};}
  function syncVessel(h){var l=lvl(h,'Сосуд');if(!l)return;var s=st(h),cha=mod(h,'cha');res(h,'vesselMagicSlots',l>=18?4:l>=11?3:2,'short');s.vesselSpiritMantle=!!s.vesselSpiritMantle;s.vesselAspects=s.vesselAspects||[];s.vesselArchon=!!s.vesselArchon;s.vesselStrikeDie=l>=11?'1d10':l>=5?'1d8':'1d6';s.vesselSpellDC=8+(Number(h.proficiencyBonus)||2)+cha;}
  function useVessel(h,id,ctx,feature){syncVessel(h);var l=lvl(h,'Сосуд'),s=st(h),cha=mod(h,'cha');if(id==='spiritMantle'){s.vesselSpiritMantle=!s.vesselSpiritMantle;return{ok:true,message:'✨ Покров духа '+(s.vesselSpiritMantle?'проявлён.':'рассеян.')};}if(id==='iridescentStrike'){if(!s.vesselSpiritMantle)return{ok:false,message:'Иридисцентный удар требует Покров духа.'};return{ok:true,effect:{damage:(s.vesselStrikeDie||'1d6')+' radiant',ability:'cha'},message:'✨ Иридисцентный удар нанесён.'};}if(id==='archonForm'){if(!s.vesselSpiritMantle)return{ok:false,message:'Сначала прояви Покров духа.'};if(!spend(h,'vesselMagicSlots',1))return{ok:false,message:'Нет свободного слота магии Сосуда.'};s.vesselArchon=true;return{ok:true,effect:{tempHp:Math.max(1,Number(h.abilityScores&&h.abilityScores.charisma)||10)+2*l,durationMinutes:10},message:'👁️ Форма архонта активирована.'};}if(feature&&feature.action==='passive')return{ok:true,passive:true,message:'✨ '+(feature.name||id)+' активно.'};return{ok:false,unsupported:true,message:'Способность Сосуда зарегистрирована, но отдельный эффект ещё не реализован.'};}
  function vesselAttack(h){var s=st(h),o={bonusDamage:0,extraDice:[],advantage:false,disadvantage:false,notes:[]};if(s.vesselSpiritMantle)o.notes.push('Покров духа: атаки могут использовать Charisma.');return o;}
  function syncAccursed(h){var l=lvl(h,'Аккурсд');if(!l)return;var s=st(h);res(h,'accursedSpellSlots',l>=18?4:l>=11?3:2,'long');s.accursedJinx=s.accursedJinx||{};s.accursedMetamorphoses=s.accursedMetamorphoses||[];s.accursedSaveDC=8+(Number(h.proficiencyBonus)||2)+mod(h,'cha');}
  function useAccursed(h,id,ctx,feature){syncAccursed(h);var s=st(h),t=target(ctx);if(id==='jinx'){if(!t)return{ok:false,message:'Выбери цель для Сглаза.'};s.accursedJinx={targetId:t.id,expiresRounds:2};return{ok:true,target:t.id,effect:{nextAttackOrCheckDisadvantage:true},message:'🩸 Сглаз наложен.'};}if(id==='suppressCurse'){if(!spend(h,'accursedSpellSlots',1))return{ok:false,message:'Нет свободной ячейки заклинаний Аккурсда.'};return{ok:true,effect:{suppressCurse:true,durationRounds:10},message:'🩸 Подавление проклятия активно на 10 раундов.'};}if(id==='afflictCurse'){if(!t)return{ok:false,message:'Выбери цель для проклятия.'};if(!spend(h,'accursedSpellSlots',1))return{ok:false,message:'Нет свободной ячейки заклинаний Аккурсда.'};return{ok:true,target:t.id,effect:{curseSave:'wis',curseDurationRounds:10},message:'🩸 Проклятие поражает цель.'};}if(id==='metamorphosis'){var name=ctx&&ctx.name?String(ctx.name):'Воинский путь';if(s.accursedMetamorphoses.indexOf(name)<0)s.accursedMetamorphoses.push(name);return{ok:true,message:'🩸 Метаморфоза выбрана: '+name+'.'};}if(feature&&feature.action==='passive')return{ok:true,passive:true,message:'🩸 '+(feature.name||id)+' активно.'};return{ok:false,unsupported:true,message:'Способность Аккурсда зарегистрирована, но отдельный эффект ещё не реализован.'};}
  function accursedAttack(h,ctx){var l=lvl(h,'Аккурсд'),s=st(h),o={bonusDamage:0,extraDice:[],advantage:false,disadvantage:false,notes:[]};if(s.accursedMetamorphoses.indexOf('Воинский путь')>=0&&ctx&&ctx.weaponAttack)o.extraDice.push(l>=17?'3d6':l>=11?'2d6':'1d6');return o;}
  function runeCount(l){var t=[0,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,10,10];return t[Math.max(1,Math.min(20,l))]||2;}
  function syncRuneKeeper(h){var l=lvl(h,'Рунный хранитель');if(!l)return;var s=st(h),n=runeCount(l);s.inscribedRunes=Array.isArray(s.inscribedRunes)?s.inscribedRunes:[];if(s.inscribedRunes.length>n)s.inscribedRunes=s.inscribedRunes.slice(0,n);s.runeStance=s.runeStance||null;s.runeSaveDC=8+(Number(h.proficiencyBonus)||2)+mod(h,'int');}
  function useRuneKeeper(h,id,ctx,feature){syncRuneKeeper(h);var s=st(h),n=runeCount(lvl(h,'Рунный хранитель'));if(id==='inscribeRune'){var name=ctx&&ctx.rune?String(ctx.rune):'Руна';if(s.inscribedRunes.indexOf(name)<0){if(s.inscribedRunes.length>=n)s.inscribedRunes.shift();s.inscribedRunes.push(name);}return{ok:true,message:'🔷 Руна «'+name+'» вписана: '+s.inscribedRunes.length+'/'+n+'.'};}if(id==='runeStance'){var stance=ctx&&ctx.stance?String(ctx.stance):'Разрушение';if(['Разрушение','Защита'].indexOf(stance)<0)return{ok:false,message:'Неизвестная рунная стойка.'};s.runeStance=stance;return{ok:true,effect:{radiusFt:lvl(h,'Рунный хранитель')>=18?30:10},message:'🔷 Рунная стойка: '+stance+'.'};}if(id==='invokeRune'){if(!s.inscribedRunes.length)return{ok:false,message:'Нет вписанных рун.'};var rune=ctx&&ctx.rune?String(ctx.rune):s.inscribedRunes[0];return{ok:true,effect:{runeInert:rune},message:'🔷 Руна «'+rune+'» призвана и становится инертной.'};}if(feature&&feature.action==='passive')return{ok:true,passive:true,message:'✨ '+(feature.name||id)+' активно.'};return{ok:false,unsupported:true,message:'Способность Рунного хранителя зарегистрирована, но отдельный эффект ещё не реализован.'};}
  function runeKeeperAttack(h){var s=st(h),o={bonusDamage:0,extraDice:[],advantage:false,disadvantage:false,notes:[]};if(s.runeStance==='Разрушение'&&s.inscribedRunes.length)o.notes.push('Разрушение: дополнительный урон зависит от числа вписанных рун.');return o;}
  function shifterCR(l){var t=[0,0,0.25,0.5,1,1,1,2,2,2,3,3,3,4,4,5,5,5,6,6,6];return t[Math.max(1,Math.min(20,l))]||0;}
  function shifterDie(l){return l>=11?'1d12':l>=5?'1d10':'1d8';}
  function syncShifter(h){var l=lvl(h,'Шифтер');if(!l)return;var s=st(h),con=Math.max(1,mod(h,'con'));res(h,'shifterAdrenaline',l>=20?Math.max(1,con):Math.max(1,con),'short');res(h,'shifterPrimevalForm',l>=17?3:0,'long');s.shifterMaxCR=shifterCR(l);s.shifterShifted=!!s.shifterShifted;s.shifterBloodline=s.shifterBloodline||'Водная';s.shifterSaveDC=8+(Number(h.proficiencyBonus)||2)+mod(h,'con');s.shifterAttackBonus=(Number(h.proficiencyBonus)||2)+mod(h,'con');}
  function useShifter(h,id,ctx,feature){syncShifter(h);var l=lvl(h,'Шифтер'),s=st(h),t=target(ctx),con=Math.max(1,mod(h,'con'));if(id==='shift'){s.shifterShifted=!s.shifterShifted;return{ok:true,effect:{beastShape:s.shifterShifted,maxCR:s.shifterMaxCR,saveDC:s.shifterSaveDC,attackBonus:s.shifterAttackBonus},message:'🐾 Дикая форма '+(s.shifterShifted?'активирована. Максимальный CR: '+s.shifterMaxCR+'.':'завершена.')};}if(id==='learnShape'){if(!t)return{ok:false,message:'Выбери живого не враждебного зверя для изучения формы.'};if(l<2)return{ok:false,message:'Первобытная связь доступна со 2 уровня.'};return{ok:true,effect:{learnBeastShape:t.id,maxCR:s.shifterMaxCR},message:'🐾 Новая звериная форма изучена.'};}if(id==='adrenalineSurge'){if(!spend(h,'shifterAdrenaline',1))return{ok:false,message:'Нет доступных всплесков адреналина.'};return{ok:true,effect:{tempHp:Number(ctx&&ctx.damage)||0,durationRounds:10},message:'🔥 Всплеск адреналина: получен временный HP, равный полученному урону.'};}if(id==='primalResilience'){if(!spend(h,'shifterAdrenaline',1))return{ok:false,message:'Нет доступного всплеска адреналина.'};return{ok:true,effect:{saveBonus:con},message:'🛡️ Первобытная стойкость: +'+con+' к спасброску.'};}if(id==='primevalForm'){if(!spend(h,'shifterPrimevalForm',1))return{ok:false,message:'Нет доступной Первобытной формы.'};return{ok:true,effect:{primeval:true,resistance:['bludgeoning','piercing','slashing'],strDexSaveAdvantage:true},message:'🐾 Первобытная форма усилена.'};}if(feature&&feature.action==='passive')return{ok:true,passive:true,message:'🐾 '+(feature.name||id)+' активно.'};return{ok:false,unsupported:true,message:'Способность Шифтера зарегистрирована, но её отдельный эффект ещё не реализован.'};}
  function shifterAttack(h,ctx){var l=lvl(h,'Шифтер'),s=st(h),o={bonusDamage:0,extraDice:[],advantage:false,disadvantage:false,notes:[]};if(s.shifterShifted&&l>=5){o.notes.push('Дикий воин: звериная форма получает усиленные действия.');}if(l>=5&&ctx&&ctx.naturalWeapon)o.notes.push('Мистические удары: природные атаки считаются магическими.');return o;}
  function savantIntellectDie(l){return l>=17?'d12':l>=13?'d10':l>=9?'d8':l>=5?'d6':'d4';}
  function syncSavant(h){var l=lvl(h,'Савант');if(!l)return;var s=st(h),die=savantIntellectDie(l);s.savantIntellectDie=die;s.savantFocusId=s.savantFocusId||null;s.savantFocusExpires=Number(s.savantFocusExpires)||0;s.savantFocusData=s.savantFocusData||{};s.savantReactions=l>=17?4:l>=11?3:l>=5?2:1;s.savantSaveDC=8+(Number(h.proficiencyBonus)||2)+mod(h,'int');}
  function useSavant(h,id,ctx,feature){syncSavant(h);var l=lvl(h,'Савант'),s=st(h),t=target(ctx),die=s.savantIntellectDie;if(id==='adroitAnalysis'){if(!t)return{ok:false,message:'Выбери видимую цель для анализа.'};s.savantFocusId=t.id;s.savantFocusExpires=10;return{ok:true,target:t.id,effect:{focus:true,focusDurationRounds:10,predictiveDodge:true},message:'🧠 Цель изучена и стала Фокусом.'};}if(id==='potentObservation'){if(!spend(h,'savantReaction',1)&&false)return{ok:false,message:'Нет реакции.'};return{ok:true,effect:{addDie:die},message:'🧠 Мощное наблюдение: добавь '+die+' к подходящему броску союзника.'};}if(id==='calculatedFlourish'){return{ok:true,effect:{acBonusDie:die},message:'🧠 Расчётный манёвр: +'+die+' к AC против этой атаки.'};}if(id==='flawlessAnalysis'){if(!t)return{ok:false,message:'Выбери Фокус.'};s.savantFlawlessUsed=s.savantFlawlessUsed||{};if(s.savantFlawlessUsed[t.id])return{ok:false,message:'Безупречный анализ уже использован против этой цели после долгого отдыха.'};s.savantFlawlessUsed[t.id]=true;return{ok:true,target:t.id,effect:{save:'int',focusDebuff:true,allySaveAdvantageFt:30,durationRounds:1},message:'🧠 Безупречный анализ применён.'};}if(feature&&feature.action==='passive')return{ok:true,passive:true,message:'🧠 '+(feature.name||id)+' активно.'};return{ok:false,unsupported:true,message:'Способность Саванта зарегистрирована, но её отдельный эффект ещё не реализован.'};}
  function savantAttack(h,ctx){var l=lvl(h,'Савант'),s=st(h),o={bonusDamage:0,extraDice:[],advantage:false,disadvantage:false,notes:[]};if(s.savantFocusId&&ctx&&ctx.target&&String(s.savantFocusId)===String(ctx.target.id)){o.notes.push('Изученная цель: можно использовать Intelligence для атаки и урона.');o.extraDice.push(s.savantIntellectDie||savantIntellectDie(l));}return o;}
  function bloodHunterLvl(h){return lvl(h,'Кровавый охотник');}
  function bloodDie(l){return l>=17?'1d10':l>=11?'1d8':l>=5?'1d6':'1d4';}
  function hemMod(h){var a=h.abilities||{},v=a.int||a.INT||a.intelligence||a.INTELLIGENCE||10,w=a.wis||a.WIS||a.wisdom||a.WISDOM||10;return Math.max(0,Math.floor(((Number(v)>10?Number(v):10)-10)/2));}
  function hemSave(h){return 8+(Number(h.proficiencyBonus)||2)+hemMod(h);}
  function bloodCurseUses(l){return l>=17?4:l>=13?3:l>=6?2:1;}
  function syncBloodHunter(h){
    var l=bloodHunterLvl(h);if(!l)return;
    var s=st(h),d=bloodDie(l);
    var r=res(h,'bloodMaledict',bloodCurseUses(l),'short');r.die=d;
    s.bhHemocraftDie=d;s.bhHemocraftSaveDC=hemSave(h);s.bhActiveRites=s.bhActiveRites||{};s.bhKnownCurses=s.bhKnownCurses||[];
    s.bhBrand=s.bhBrand||null;s.bhFightingStyle=s.bhFightingStyle||null;
    s.bhCrimsonRitesKnown=s.bhCrimsonRitesKnown||['flame'];
    s.bhRiteDamageDie=d;
    if(l>=6)s.bhBloodCursesKnown=2;if(l>=10)s.bhBloodCursesKnown=3;if(l>=14)s.bhBloodCursesKnown=4;if(l>=18)s.bhBloodCursesKnown=5;
    if(l>=3)s.bhOrder=s.bhOrder||'Орден призрачных убийц';
  }
  function bloodSpendAmplify(h,ctx){
    if(!ctx||!ctx.amplify)return true;
    var hp=Number(h.hp!==undefined?h.hp:h.currentHP);var costDie=bloodDie(bloodHunterLvl(h));
    if(Number.isFinite(hp))h.hp=Math.max(0,hp); // actual HP damage is returned below for engine application
    return {damageSelf:costDie,damageType:'necrotic',unreducible:true};
  }
  function useBloodHunter(h,id,ctx,feature){
    syncBloodHunter(h);ctx=ctx||{};var s=st(h),l=bloodHunterLvl(h),t=target(ctx);
    if(id==='fightingStyle'){
      var styles=['Стрельба','Дуэлянт','Сражение большим оружием','Сражение двумя оружиями'],fs=String(ctx.style||'');
      if(styles.indexOf(fs)<0)return{ok:false,message:'Неизвестный боевой стиль.'};s.bhFightingStyle=fs;return{ok:true,effect:{fightingStyle:fs},message:'⚔️ Боевой стиль: '+fs+'.'};
    }
    if(id==='riteDawn'){
      if(l<3)return{ok:false,message:'Обряд рассвета доступен с 3 уровня Ордена призрачных убийц.'};
      if(s.bhCrimsonRitesKnown.indexOf('dawn')<0)s.bhCrimsonRitesKnown.push('dawn');
      return{ok:true,effect:{rite:'dawn',damageType:'radiant',brightLightFt:20,resistance:['necrotic'],extraDieVsUndead:true},message:'☀️ Обряд рассвета изучен.'};
    }
    if(id==='curseSpecialist'){s.bhCurseSpecialist=true;var rr=res(h,'bloodMaledict',bloodCurseUses(l)+1,'short');rr.max=bloodCurseUses(l)+1;return{ok:true,effect:{bloodCurseTargetsBloodless:true,extraUse:true},message:'🩸 Специалист по проклятиям: +1 использование и можно проклинать существ без крови.'};}
    if(id==='brandSundering'){if(!s.bhBrand)return{ok:false,message:'Нет активного Клейма наказания.'};s.bhBrand.sundering=true;return{ok:true,effect:{extraRiteDie:true,blocksIncorporealMovement:true},message:'🔻 Клеймо рассечения усилено.'};}
    if(id==='stalkersProwess')return{ok:true,effect:{speedBonusFt:10,longJumpBonusFt:10,highJumpBonusFt:3,unarmedAttackBonus:l>=18?3:l>=11?2:1},message:'🐺 Доблесть преследователя активна.'};
    if(id==='advancedTransformation'){var rht=res(h,'bhHybridTransformation',2,'short');rht.max=2;return{ok:true,effect:{hybridRegeneration:'1+CON',useCount:2},message:'🐺 Продвинутая трансформация: 2 использования и регенерация.'};}
    if(id==='brandVoracious'){if(!s.bhBrand)return{ok:false,message:'Нет активного Клейма наказания.'};s.bhBrand.voracious=true;return{ok:true,effect:{hybridAttackAdvantageVsBranded:true,bloodlustAdvantage:true},message:'🐺 Клеймо ненасытности активно.'};}
    if(id==='hybridMastery'){var rm=res(h,'bhHybridTransformation',999,'short');rm.max=999;rm.current=999;return{ok:true,effect:{unlimitedHybrid:true},message:'🐺 Мастерство гибридной формы: превращение больше не ограничено.'};}
    if(id==='brandAxiom'){if(!s.bhBrand)return{ok:false,message:'Нет активного Клейма наказания.'};s.bhBrand.axiom=true;return{ok:true,effect:{endIllusion:true,endInvisibility:true,shapeChangeSave:'wis',stunOnFail:true},message:'🔻 Клеймо аксиомы раскрывает истинную форму цели.'};}
    if(id==='otherworldlyPatron'){s.bhPatron=String(ctx.patron||'Великий Древний');var patrons=['Архифея','Исчадие','Великий Древний','Бессмертный','Небожитель','Клинок проклятия','Глубинный','Джинн','Нежить'];if(patrons.indexOf(s.bhPatron)<0)return{ok:false,message:'Неизвестный потусторонний покровитель.'};return{ok:true,effect:{patron:s.bhPatron},message:'📜 Покровитель выбран: '+s.bhPatron+'.'};}
    if(id==='brandSappingScar'){if(!s.bhBrand)return{ok:false,message:'Нет активного Клейма наказания.'};s.bhBrand.sappingScar=true;return{ok:true,effect:{disadvantageVsBloodHunterSpells:true},message:'🔻 Иссушающий шрам активен.'};}
    if(id==='revealedArcana'||id==='unsealedArcana'){
      var p=s.bhPatron||'Великий Древний',map={
        'Архифея':id==='revealedArcana'?'blur':'slow','Небожитель':id==='revealedArcana'?'lesser restoration':'revivify',
        'Глубинный':id==='revealedArcana'?'gust of wind':'lightning bolt','Исчадие':id==='revealedArcana'?'scorching ray':'fireball',
        'Джинн':id==='revealedArcana'?'phantasmal force':'protection from energy','Великий Древний':id==='revealedArcana'?'detect thoughts':'haste',
        'Клинок проклятия':id==='revealedArcana'?'branding smite':'blink','Нежить':id==='revealedArcana'?'blindness/deafness':'speak with dead',
        'Бессмертный':id==='revealedArcana'?'silence':'bestow curse'
      },spell=map[p]||'detect thoughts';
      s.bhArcana=s.bhArcana||{};if(s.bhArcana[id])return{ok:false,message:'Эта аркана уже использована после долгого отдыха.'};s.bhArcana[id]=true;
      return{ok:true,effect:{castSpell:spell,freeAtUnsealed:id==='unsealedArcana'},message:'📜 '+(id==='revealedArcana'?'Открытая':'Раскрытая')+' аркана: '+spell+'.'};
    }
    if(id==='crimsonRite'){
      var rite=String(ctx.rite||s.bhCrimsonRitesKnown[0]||'flame');
      var known=s.bhCrimsonRitesKnown.indexOf(rite)>=0;
      if(!known)return{ok:false,message:'Этот Алый обряд ещё не изучен.'};
      var weaponId=ctx.weaponId||ctx.itemId||'equipped';
      var amp=bloodSpendAmplify(h,ctx);
      if(!amp)return{ok:false,message:'Не удалось активировать обряд.'};
      s.bhActiveRites[weaponId]={rite:rite,damageDie:bloodDie(l),active:true};
      return{ok:true,effect:{weaponId:weaponId,magical:true,rite:rite,extraDamageDie:bloodDie(l),selfDamage:amp.damageSelf||bloodDie(l),selfDamageType:'necrotic',unreducible:true},message:'🩸 Алый обряд активирован: '+rite+'.'};
    }
    if(id==='bloodMaledict'){
      var curse=String(ctx.curse||s.bhKnownCurses[0]||'marked');
      var amp=bloodSpendAmplify(h,ctx);
      if(!s.bhKnownCurses.length)s.bhKnownCurses=['marked'];
      var known=s.bhKnownCurses.indexOf(curse)>=0;
      if(!known)return{ok:false,message:'Это кровавое проклятие не изучено.'};
      if(!spend(h,'bloodMaledict',1))return{ok:false,message:'Нет доступного использования Кровавого проклятия.'};
      if(!t&&curse!=='exposure'&&curse!=='eyeless'&&curse!=='fallenPuppet'&&curse!=='howl'&&curse!=='soulEater')return{ok:false,message:'Выбери цель.'};
      var e={curse:curse,saveDC:hemSave(h),amplified:!!ctx.amplify};
      if(amp&&typeof amp==='object')e.selfDamage=amp.damageSelf;
      if(curse==='anxious')e.intimidationAdvantage=true;
      if(curse==='binding')e={...e,effect:'speed0_no_reaction',durationRounds:1,save:'str',size:'Large-or-smaller'};
      if(curse==='bloatedAgony')e={...e,effect:'str_dex_disadvantage_plus_extra_attack_damage',damage:'1d8 necrotic',durationRounds:1};
      if(curse==='corrosion')e={...e,effect:'poisoned',save:'con',durationRounds:10,damageOnFailedSave:'4d6 necrotic'};
      if(curse==='exorcist')e={...e,effect:'remove_charmed_frightened_possession',amplifiedDamage:'3d6 psychic'};
      if(curse==='exposure')e={...e,effect:'remove_resistance_to_trigger_damage',amplifiedEffect:'remove_invulnerability_then_resistance'};
      if(curse==='eyeless')e={...e,effect:'subtractHemocraftDieFromAttack',reaction:true};
      if(curse==='fallenPuppet')e={...e,effect:'fallen_creature_weapon_attack',reaction:true,amplifiedMoveFt:'half_speed'};
      if(curse==='howl')e={...e,effect:'frightened',save:'wis',rangeFt:ctx.amplify?60:30,stunOnFailBy5:true};
      if(curse==='marked')e={...e,effect:'extraRiteDieOnHitsThisTurn',amplifiedNextAttackAdvantage:true};
      if(curse==='muddledMind')e={...e,effect:'concentration_save_disadvantage',durationRounds:1};
      if(curse==='soulEater')e={...e,effect:'advantage_on_attacks_and_all_damage_resistance',durationRounds:1,amplifiedRestoreSpellSlot:true};
      s.bhLastCurse=e;
      return{ok:true,target:t&&t.id,effect:e,message:'🩸 Кровавое проклятие применено: '+curse+'.'};
    }
    if(id==='brandCastigation'){
      if(!t)return{ok:false,message:'Выбери цель для Клейма наказания.'};
      s.bhBrand={targetId:t.id,damagePerTrigger:Math.max(1,hemMod(h)),tethered:l>=13};
      return{ok:true,target:t.id,effect:{brand:true,psychicDamage:Math.max(1,hemMod(h)),directionSense:true},message:'🔻 Клеймо наказания наложено.'};
    }
    if(id==='brandTethering'){
      if(!s.bhBrand)return{ok:false,message:'Сначала наложи Клеймо наказания.'};
      s.bhBrand.tethered=true;s.bhBrand.damagePerTrigger=Math.max(2,2*hemMod(h));
      return{ok:true,effect:{noDash:true,teleportSave:'wis',teleportDamage:'4d6 psychic'},message:'🔻 Клеймо привязки усилено.'};
    }
    if(id==='grimPsychometry')return{ok:true,effect:{historyAdvantage:true},message:'👁️ Мрачная психометрия активна.'};
    if(id==='darkAugmentation')return{ok:true,effect:{speedBonusFt:5,saveBonus:{str:Math.max(1,hemMod(h)),dex:Math.max(1,hemMod(h)),con:Math.max(1,hemMod(h))}},message:'🩸 Тёмное усиление активно.'};
    if(id==='aetherWalk'){
      var uses=res(h,'bhAetherWalk',l>=15?2:1,'short');
      if(!spend(h,'bhAetherWalk',1))return{ok:false,message:'Астральный шаг уже использован.'};
      return{ok:true,effect:{ethereal:true,durationRounds:Math.max(1,hemMod(h)),phaseThrough:true,forceDamageInside:'1d10'},message:'👻 Эфирный шаг активирован.'};
    }
    if(id==='hybridTransformation'){
      var uses=res(h,'bhHybridTransformation',l>=11?2:1,'short');
      if(l>=18){uses.max=999;uses.current=999;}
      if(!spend(h,'bhHybridTransformation',1)&&l<18)return{ok:false,message:'Нет доступного превращения.'};
      s.bhHybrid=!s.bhHybrid;
      return{ok:true,effect:{hybrid:s.bhHybrid,advantageStr:true,resistance:['bludgeoning','piercing','slashing'],unarmedDamage:l>=11?'1d8':'1d6',bonusDamage:l>=18?3:l>=11?2:1,bonusAC:1},message:'🐺 Гибридная форма '+(s.bhHybrid?'активирована.':'завершена.')};
    }
    if(id==='lycanBloodlust'){
      return{ok:true,effect:{save:'wis',dc:8,directAttackNearestIfFailed:true},message:'🐺 Кровожадность: проверь спасбросок Мудрости при низком HP.'};
    }
    if(id==='mutagen'){
      var formulas={
        Aether:{min:11,effect:{flySpeed:20,durationMinutes:60},side:{strDexChecksDisadvantage:true}},
        Alluring:{effect:{chaChecksAdvantage:true},side:{initiativeDisadvantage:true}},
        Celerity:{effect:{dexIncrease:l>=18?5:l>=11?4:3,dexMaxIncrease:l>=18?5:l>=11?4:3},side:{wisSavesDisadvantage:true}},
        Conversant:{effect:{intChecksAdvantage:true},side:{wisChecksDisadvantage:true}},
        Cruelty:{min:11,effect:{bonusActionExtraWeaponAttack:true},side:{mentalSavesDisadvantage:true}},
        Deftness:{effect:{dexChecksAdvantage:true},side:{wisChecksDisadvantage:true}},
        Embers:{effect:{resistance:['fire'],vulnerability:['cold']}},
        Gelid:{effect:{resistance:['cold'],vulnerability:['fire']}},
        Impermeable:{effect:{resistance:['piercing'],vulnerability:['slashing']}},
        Mobility:{effect:{immunity:['grappled','restrained'],minAt11:{paralyzed:true}},side:{strChecksDisadvantage:true}},
        Nighteye:{effect:{darkvisionFt:120},side:{sunlightAttackAndPerceptionDisadvantage:true}},
        Percipient:{effect:{wisChecksAdvantage:true},side:{chaChecksDisadvantage:true}},
        Potency:{effect:{strIncrease:l>=18?5:l>=11?4:3,strMaxIncrease:l>=18?5:l>=11?4:3},side:{dexSavesDisadvantage:true}},
        Precision:{min:11,effect:{criticalRange:19},side:{strSavesDisadvantage:true}},
        Rapidity:{effect:{speedBonusFt:l>=15?15:10},side:{intChecksDisadvantage:true}},
        Reconstruction:{min:7,effect:{startTurnHealing:'PB',durationMinutes:60},side:{speedPenaltyFt:10}},
        Sagacity:{effect:{intIncrease:l>=18?5:l>=11?4:3,intMaxIncrease:l>=18?5:l>=11?4:3},side:{chaSavesDisadvantage:true}},
        Shielded:{effect:{resistance:['slashing'],vulnerability:['bludgeoning']}},
        Unbreakable:{effect:{resistance:['bludgeoning'],vulnerability:['piercing']}},
        Vermillion:{effect:{extraBloodMaledictUse:true},side:{deathSaveDisadvantage:true}}
      };
      var name=String(ctx.mutagen||'Celerity'),form=formulas[name];
      if(!form)return{ok:false,message:'Неизвестная формула мутагена.'};
      if(form.min&&l<form.min)return{ok:false,message:'Эта формула доступна только с '+form.min+' уровня.'};
      s.bhMutagens=s.bhMutagens||[];if(s.bhMutagens.indexOf(name)<0)s.bhMutagens.push(name);
      return{ok:true,effect:{mutagen:name,formula:form.effect,sideEffect:form.side||null,duration:'short-or-long-rest'},message:'🧪 Мутаген активирован: '+name+'.'};
    }
    if(id==='flushMutagens'){s.bhMutagens=[];return{ok:true,message:'🧪 Все мутагены выведены.'};}
    if(id==='ignoreMutagenSideEffect'){if(s.bhMetabolismUsed)return{ok:false,message:'Вы уже подавили побочный эффект сегодня.'};s.bhMetabolismUsed=true;return{ok:true,effect:{ignoreOneMutagenSideEffect:true,durationMinutes:1},message:'🧪 Побочный эффект мутагена подавлен на 1 минуту.'};}
    if(id==='exaltedMutation'){
      var uses=res(h,'bhExaltedMutation',Math.max(1,hemMod(h)),'long');if(!spend(h,'bhExaltedMutation',1))return{ok:false,message:'Нет доступного использования Возвышенной мутации.'};
      return{ok:true,effect:{replaceMutagen:true,mutagen:ctx.mutagen||'Celerity'},message:'🧪 Возвышенная мутация заменяет действующий мутаген.'};
    }
    if(id==='pactMagic'){
      var order=String(ctx.order||s.bhOrder||'Орден осквернённых душ'),slots=[0,0,0,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2][Math.min(20,l)]||0;
      var slotLevel=l>=19?4:l>=13?3:l>=7?2:1;
      res(h,'bhPactSlots',slots,'short');s.bhPactSlotLevel=slotLevel;s.bhPatron=ctx.patron||s.bhPatron||'Великий Древний';
      return{ok:true,effect:{slots:slots,slotLevel:slotLevel,cantrips:l>=10?3:2,spellsKnown:Math.min(11,2+Math.max(0,l-5)),ability:'int'},message:'📜 Договорная магия: ячейки '+slots+' уровня '+slotLevel+'.'};
    }
    if(id==='profaneSpell'){
      var spell=String(ctx.spell||'detect thoughts');if(!spend(h,'bhPactSlots',1))return{ok:false,message:'Нет ячейки договорной магии.'};
      return{ok:true,effect:{castSpell:spell,slotLevel:s.bhPactSlotLevel||1},message:'📜 Договорное заклинание: '+spell+'.'};
    }
    if(id==='riteFocus'){
      return{ok:true,effect:{spellcastingFocus:'active crimson rite weapon',patron:s.bhPatron||'Великий Древний'},message:'📜 Оружие с Алым обрядом стало фокусом.'};
    }
    if(id==='mysticFrenzy')return{ok:true,effect:{bonusWeaponAttackAfterCantrip:true},message:'⚔️ Мистическое безумие: после заговора можно атаковать оружием бонусным действием.'};
    if(id==='soulEater'){
      if(!spend(h,'bloodMaledict',1))return{ok:false,message:'Нет использования Кровавого проклятия.'};
      return{ok:true,effect:{advantageAttacks:true,resistanceAllDamage:true,durationRounds:1},message:'🩸 Пожиратель душ: преимущество на атаки и сопротивление всему урону.'};
    }
    if(id==='riteRevival')return{ok:true,effect:{ifReducedToZero:{setHP:1,endAllRites:true}},message:'🩸 Возрождение обряда готово сработать при падении до 0 HP.'};
    if(id==='sanguineMastery')return{ok:true,effect:{rerollHemocraftOncePerTurn:true,critWithRiteRestoresBloodMaledict:true},message:'🩸 Кровавое мастерство активно.'};
    if(feature&&feature.action==='passive')return{ok:true,passive:true,message:'🩸 '+(feature.name||id)+' активно.'};
    return{ok:false,unsupported:true,message:'Способность Кровавого охотника зарегистрирована, но отдельный runtime-эффект ещё не реализован.'};
  }
  function bloodHunterAttack(h,ctx){
    syncBloodHunter(h);var s=st(h),o={bonusDamage:0,extraDice:[],advantage:false,disadvantage:false,notes:[]},t=ctx&&ctx.target;
    Object.keys(s.bhActiveRites||{}).forEach(function(k){var r=s.bhActiveRites[k];if(r&&r.active){o.extraDice.push(r.damageDie||bloodDie(bloodHunterLvl(h)));o.notes.push('Алый обряд: '+r.rite);if(s.bhBrand&&t&&String(s.bhBrand.targetId)===String(t.id)&&s.bhBrand.tethered)o.extraDice.push(bloodDie(bloodHunterLvl(h)));}});
    if(s.bhLastCurse&&s.bhLastCurse.curse==='marked'&&t&&s.bhLastCurse.targetId===t.id)o.extraDice.push(bloodDie(bloodHunterLvl(h)));
    if(s.bhHybrid)o.notes.push('Гибридная форма: хищные удары доступны.');
    return o;
  }
  var bloodHunterPack={
    id:'cr-blood-hunter',name:'BloodHunter',displayName:'Кровавый охотник',
    source:'Matt Mercer / Critical Role / third-party',
    license:'Original runtime implementation; mechanics checked against current public source',
    features:[
      {id:'crimsonRite',name:'Алый обряд',level:2,action:'bonus',target:'weapon'},
      {id:'bloodMaledict',name:'Кровавое проклятие',level:1,action:'bonus'},
      {id:'brandCastigation',name:'Клеймо наказания',level:6,action:'passive',target:'enemy'},
      {id:'brandTethering',name:'Клеймо привязки',level:13,action:'utility'},
      {id:'grimPsychometry',name:'Мрачная психометрия',level:9,action:'passive'},
      {id:'darkAugmentation',name:'Тёмное усиление',level:10,action:'passive'},
      {id:'aetherWalk',name:'Эфирный шаг',level:7,action:'bonus'},
      {id:'hybridTransformation',name:'Гибридная трансформация',level:3,action:'bonus'},
      {id:'lycanBloodlust',name:'Кровожадность',level:3,action:'passive'},
      {id:'mutagen',name:'Мутаген',level:3,action:'bonus'},
      {id:'flushMutagens',name:'Вывести мутагены',level:3,action:'action'},
      {id:'ignoreMutagenSideEffect',name:'Странный метаболизм',level:7,action:'bonus'},
      {id:'exaltedMutation',name:'Возвышенная мутация',level:18,action:'bonus'},
      {id:'pactMagic',name:'Договорная магия',level:3,action:'utility'},
      {id:'profaneSpell',name:'Заклинание договора',level:3,action:'action'},
      {id:'riteFocus',name:'Фокус обряда',level:3,action:'passive'},
      {id:'mysticFrenzy',name:'Мистическое безумие',level:7,action:'passive'},
      {id:'soulEater',name:'Пожиратель душ',level:18,action:'reaction'},
      {id:'riteRevival',name:'Возрождение обряда',level:18,action:'reaction'},
      {id:'sanguineMastery',name:'Кровавое мастерство',level:20,action:'passive'}
    ],
    subclasses:[
      {id:'ghostslayer',name:'Орден призрачных убийц',features:[
        {id:'riteDawn',name:'Обряд рассвета',level:3,action:'bonus'},
        {id:'curseSpecialist',name:'Специалист по проклятиям',level:3,action:'passive'},
        {id:'aetherWalk',name:'Эфирный шаг',level:7,action:'bonus'},
        {id:'brandSundering',name:'Клеймо рассечения',level:11,action:'passive'},
        {id:'exorcist',name:'Кровавое проклятие экзорциста',level:15,action:'bonus'},
        {id:'riteRevival',name:'Возрождение обряда',level:18,action:'reaction'}]},
      {id:'lycan',name:'Орден ликантропов',features:[
        {id:'hybridTransformation',name:'Гибридная трансформация',level:3,action:'bonus'},
        {id:'stalkersProwess',name:'Доблесть преследователя',level:7,action:'passive'},
        {id:'advancedTransformation',name:'Продвинутая трансформация',level:11,action:'passive'},
        {id:'brandVoracious',name:'Клеймо ненасытности',level:15,action:'passive'},
        {id:'hybridMastery',name:'Мастерство гибридной формы',level:18,action:'passive'}]},
      {id:'mutant',name:'Орден мутантов',features:[
        {id:'mutagencraft',name:'Мутагенное ремесло',level:3,action:'utility'},
        {id:'strangeMetabolism',name:'Странный метаболизм',level:7,action:'passive'},
        {id:'brandAxiom',name:'Клеймо аксиомы',level:11,action:'passive'},
        {id:'corrosion',name:'Кровавое проклятие коррозии',level:15,action:'bonus'},
        {id:'exaltedMutation',name:'Возвышенная мутация',level:18,action:'bonus'}]},
      {id:'profaneSoul',name:'Орден осквернённых душ',features:[
        {id:'otherworldlyPatron',name:'Потусторонний покровитель',level:3,action:'utility'},
        {id:'pactMagic',name:'Договорная магия',level:3,action:'utility'},
        {id:'riteFocus',name:'Фокус обряда',level:3,action:'passive'},
        {id:'mysticFrenzy',name:'Мистическое безумие',level:7,action:'passive'},
        {id:'revealedArcana',name:'Открытая аркана',level:7,action:'utility'},
        {id:'brandSappingScar',name:'Клеймо иссушающего шрама',level:11,action:'passive'},
        {id:'unsealedArcana',name:'Раскрытая аркана',level:15,action:'utility'},
        {id:'soulEater',name:'Кровавое проклятие пожирателя душ',level:18,action:'reaction'}]}
    ],
    hooks:{sync:syncBloodHunter,useFeature:useBloodHunter,attackModifiers:bloodHunterAttack}
  };
  function installBloodHunterSubclassReference(){
    if(!global.SUBCLASSES_REFERENCE)return;
    global.SUBCLASSES_REFERENCE['Кровавый охотник']={
      'Орден призрачных убийц':{source:'Critical Role',description:'Охотники на нежить и некромантию.',pickLevel:3,levels:{3:{features:['Обряд рассвета','Специалист по проклятиям']},7:{features:['Эфирный шаг']},11:{features:['Клеймо рассечения']},15:{features:['Кровавое проклятие экзорциста']},18:{features:['Возрождение обряда']}}},
      'Орден ликантропов':{source:'Critical Role',description:'Охотники, контролирующие силу ликантропии.',pickLevel:3,levels:{3:{features:['Чувства хищника','Гибридная трансформация']},7:{features:['Доблесть преследователя']},11:{features:['Продвинутая трансформация']},15:{features:['Клеймо ненасытности']},18:{features:['Мастерство гибридной формы']}}},
      'Орден мутантов':{source:'Critical Role',description:'Гемокрафт и алхимические мутагены.',pickLevel:3,levels:{3:{features:['Мутагенное ремесло']},7:{features:['Странный метаболизм']},11:{features:['Клеймо аксиомы']},15:{features:['Кровавое проклятие коррозии']},18:{features:['Возвышенная мутация']}}},
      'Орден осквернённых душ':{source:'Critical Role',description:'Охотники, заключившие договор с потусторонним покровителем.',pickLevel:3,levels:{3:{features:['Потусторонний покровитель','Договорная магия','Фокус обряда']},7:{features:['Мистическое безумие','Открытая аркана']},11:{features:['Клеймо иссушающего шрама']},15:{features:['Раскрытая аркана']},18:{features:['Кровавое проклятие пожирателя душ']}}}
    };
  }
  installBloodHunterSubclassReference();
  var packs=[bloodHunterPack,

    {id:'ll-shifter',name:'Shifter',displayName:'Шифтер',source:'LaserLlama / third-party',license:'Original runtime implementation',features:[{id:'shift',name:'Дикая форма',level:1,action:'bonus'},{id:'learnShape',name:'Изучить звериную форму',level:2,action:'action',target:'beast'},{id:'adrenalineSurge',name:'Всплеск адреналина',level:6,action:'reaction'},{id:'primalResilience',name:'Первобытная стойкость',level:10,action:'reaction'},{id:'primevalForm',name:'Первобытная форма',level:11,action:'bonus'}],subclasses:[{id:'aquatic',name:'Водная',features:[]},{id:'avian',name:'Птичья',features:[]},{id:'brute',name:'Грубая',features:[]},{id:'carnivore',name:'Хищная',features:[]},{id:'insect',name:'Насекомая',features:[]},{id:'reptilian',name:'Рептильная',features:[]},{id:'vermin',name:'Паразитная',features:[]}],hooks:{sync:syncShifter,useFeature:useShifter,attackModifiers:shifterAttack}},
    {id:'ll-savant',name:'Savant',displayName:'Савант',source:'LaserLlama / third-party',license:'Original runtime implementation; source mechanics checked against current public class',features:[{id:'adroitAnalysis',name:'Искусный анализ',level:1,action:'bonus',target:'enemy',rangeFt:60},{id:'potentObservation',name:'Мощное наблюдение',level:2,action:'reaction',rangeFt:30},{id:'calculatedFlourish',name:'Расчётный манёвр',level:5,action:'reaction'},{id:'flawlessAnalysis',name:'Безупречный анализ',level:15,action:'action',target:'enemy'}],subclasses:[{id:'archaeologist',name:'Археолог',features:[]},{id:'investigator',name:'Исследователь',features:[]},{id:'naturalist',name:'Натуралист',features:[]},{id:'physician',name:'Врач',features:[]},{id:'mentor',name:'Наставник',features:[]},{id:'tactician',name:'Тактик',features:[]}],hooks:{sync:syncSavant,useFeature:useSavant,attackModifiers:savantAttack}},

    {id:'ll-vessel',name:'Vessel',displayName:'Сосуд',source:'laserllama / third-party',license:'Original runtime implementation',features:[{id:'spiritMantle',name:'Покров духа',level:1,action:'bonus'},{id:'iridescentStrike',name:'Иридисцентный удар',level:1,action:'attack'},{id:'unsealedAspects',name:'Нераскрытые аспекты',level:1,action:'utility'},{id:'archonForm',name:'Форма архонта',level:3,action:'bonus'}],subclasses:[{id:'ascended',name:'Вознесённый',features:[]},{id:'cataclysm',name:'Катаклизм',features:[]},{id:'cursed',name:'Проклятый',features:[]},{id:'fallen',name:'Падший',features:[]},{id:'formless',name:'Бесформенный',features:[]},{id:'trickster',name:'Трикстер',features:[]}],hooks:{sync:syncVessel,useFeature:useVessel,attackModifiers:vesselAttack}},
    {id:'sv-accursed',name:'Accursed',displayName:'Аккурсд',source:'Ross Leiser / Sterling Vermin Adventuring Co.',license:'Original runtime implementation',features:[{id:'jinx',name:'Сглаз',level:1,action:'bonus',target:'enemy'},{id:'suppressCurse',name:'Подавление проклятия',level:2,action:'action'},{id:'afflictCurse',name:'Поражение проклятием',level:2,action:'action',target:'enemy'},{id:'metamorphosis',name:'Метаморфоза проклятия',level:2,action:'utility'}],subclasses:[{id:'curse',name:'Проклятие',features:[]}],hooks:{sync:syncAccursed,useFeature:useAccursed,attackModifiers:accursedAttack}},
    {id:'ip-runekeeper',name:'RuneKeeper',displayName:'Рунный хранитель',source:'Taron Pounds / Indestructoboy',license:'Original runtime implementation',features:[{id:'inscribeRune',name:'Вписать руну',level:1,action:'utility'},{id:'runeStance',name:'Рунная стойка',level:2,action:'bonus'},{id:'invokeRune',name:'Призвать руну',level:1,action:'action'}],subclasses:[{id:'dethek',name:'Детек',features:[]},{id:'fiendish',name:'Инфернский',features:[]},{id:'ghukliak',name:'Гуклиак',features:[]},{id:'jotun',name:'Йотун',features:[]},{id:'iokharic',name:'Иокхарик',features:[]},{id:'supernal',name:'Высший',features:[]}],hooks:{sync:syncRuneKeeper,useFeature:useRuneKeeper,attackModifiers:runeKeeperAttack}},

    {id:'kibbles-psion',name:'Psion',displayName:'Псионик',source:'KibblesTasty Homebrew',license:'CC-BY content source; original runtime implementation',features:[{id:'psionicPower',name:'Псионическая сила',level:1,action:'bonus',description:'Усилить следующий подходящий псionic эффект.'},{id:'mindThrust',name:'Ментальный удар',level:1,action:'action',target:'enemy',rangeFt:60,description:'Псионическая атака по выбранной цели.'},{id:'telekineticPush',name:'Телекинетический толчок',level:2,action:'action',target:'enemy',rangeFt:60,description:'Принудительно переместить цель.'}],subclasses:[{id:'awakened',name:'Пробуждённый',features:[{id:'telepathy',name:'Телепатия',level:3,action:'passive'}]},{id:'unleashed',name:'Освобождённый',features:[{id:'forceSurge',name:'Всплеск силы',level:3,action:'bonus'}]},{id:'transcended',name:'Возвысившийся',features:[{id:'bodyMind',name:'Тело и разум',level:3,action:'passive'}]},{id:'shaper',name:'Создатель',features:[{id:'mentalConstruct',name:'Ментальная конструкция',level:3,action:'action'}]}],hooks:{sync:syncPsion,useFeature:usePsion,attackModifiers:psionAttack}},
    {id:'kibbles-warlord',name:'Warlord',displayName:'Военачальник',source:'KibblesTasty Homebrew',license:'CC-BY content source; original runtime implementation',features:[{id:'commandingStrike',name:'Командный удар',level:1,action:'reaction',target:'ally',rangeFt:30,description:'Передать союзнику возможность усилить атаку.'},{id:'rallyingCry',name:'Боевой клич',level:1,action:'bonus',target:'ally',rangeFt:30,description:'Поднять боевой дух группы.'}],subclasses:[{id:'tactician',name:'Тактик',features:[{id:'tacticalShift',name:'Тактический манёвр',level:3,action:'reaction'}]},{id:'paragon',name:'Парагон',features:[{id:'heroicSurge',name:'Героический рывок',level:3,action:'bonus'}]},{id:'packleader',name:'Вожак',features:[{id:'coordinatedAssault',name:'Скоординированная атака',level:3,action:'reaction'}]},{id:'chieftain',name:'Вождь',features:[{id:'warCry',name:'Боевой клич вождя',level:3,action:'bonus'}]}],hooks:{sync:syncWarlord,useFeature:useWarlord,attackModifiers:warlordAttack}},
    {id:'kibbles-warden',name:'Warden',displayName:'Страж',source:'KibblesTasty Homebrew',license:'CC-BY content source; original runtime implementation',features:[{id:'primalChallenge',name:'Первобытный вызов',level:1,action:'bonus',target:'enemy',rangeFt:30,description:'Пометить врага и контролировать его на поле.'},{id:'earthshaker',name:'Землетряс',level:2,action:'action',rangeFt:10,description:'Создать короткую зону контроля с проверкой силы.'}],subclasses:[{id:'fortressmind',name:'Крепость разума',features:[{id:'psychicWard',name:'Психический барьер',level:3,action:'reaction'}]},{id:'elements',name:'Стихии',features:[{id:'elementalAspect',name:'Стихийный облик',level:3,action:'bonus'}]},{id:'roots',name:'Корни',features:[{id:'graspingRoots',name:'Хватающие корни',level:3,action:'action'}]},{id:'nightmares',name:'Кошмары',features:[{id:'dreadAura',name:'Аура ужаса',level:3,action:'bonus'}]}],hooks:{sync:syncWarden,useFeature:useWarden,attackModifiers:wardenAttack}},
    {id:'kibbles-spellblade',name:'Spellblade',displayName:'Заклинатель клинка',source:'KibblesTasty Homebrew',license:'CC-BY content source; original runtime implementation',features:[{id:'spellstrike',name:'Заклинательный удар',level:1,action:'bonus',target:'self',description:'Связать оружейную атаку с магическим эффектом.'},{id:'arcaneGuard',name:'Арканная защита',level:2,action:'bonus',target:'self',description:'Получить временную защиту.'}],subclasses:[{id:'arcaneTradition',name:'Арканная традиция',features:[{id:'arcaneDuelist',name:'Арканный дуэлянт',level:3,action:'passive'}]},{id:'stormTradition',name:'Традиция бури',features:[{id:'stormStrike',name:'Удар бури',level:3,action:'on-hit'}]},{id:'wardingTradition',name:'Оберегающая традиция',features:[{id:'spellParry',name:'Парирование заклинания',level:3,action:'reaction'}]},{id:'bladeDancer',name:'Танцор клинка',features:[{id:'bladeDance',name:'Танец клинка',level:3,action:'bonus'}]}],hooks:{sync:syncSpellblade,useFeature:useSpellblade,attackModifiers:spellbladeAttack}},
    {id:'mh-necromancer',name:'Necromancer',displayName:'Некромант',source:'Mage Hand Press',license:'Original runtime implementation; feature names paraphrased',features:[{id:'charnelTouch',name:'Могильное касание',level:1,action:'action'},{id:'thralls',name:'Неживые слуги',level:2,action:'utility'},{id:'deadSpace',name:'Мёртвое пространство',level:2,action:'utility'},{id:'darkArcana',name:'Тёмная аркана',level:3,action:'bonus'},{id:'animateDead',name:'Оживление мёртвых',level:5,action:'utility'},{id:'criticalSpellcasting',name:'Критическое колдовство',level:5,action:'passive'},{id:'improvedThralls',name:'Улучшенные слуги',level:7,action:'passive'},{id:'improvedCriticalSpellcasting',name:'Улучшенное критическое колдовство',level:14,action:'passive'},{id:'undyingServitude',name:'Неумирающее служение',level:18,action:'reaction'},{id:'lichdom',name:'Личествование',level:20,action:'passive'}],subclasses:[{id:'deathKnight',name:'Death Knight',features:[]},{id:'overlord',name:'Overlord',features:[]},{id:'paleMaster',name:'Pale Master',features:[]}],hooks:{sync:syncNecromancer,useFeature:useNecromancer,attackModifiers:necromancerAttack}},
    {id:'mh-martyr',name:'Martyr',displayName:'Мученик',source:'Mage Hand Press',license:'Original runtime implementation; feature names paraphrased',features:[{id:'armorOfFaith',name:'Доспех веры',level:1,action:'utility'},{id:'miraculousHealing',name:'Чудесное исцеление',level:2,action:'action'},{id:'reprisal',name:'Воздаяние',level:2,action:'reaction'},{id:'sacrifice',name:'Жертвенный удар',level:3,action:'bonus'},{id:'sacrificeFoe',name:'Жертва врага',level:7,action:'passive'},{id:'divineRespite',name:'Божественная передышка',level:9,action:'utility'},{id:'undying',name:'Неумирающий',level:10,action:'reaction'},{id:'improvedSacrificialStrike',name:'Улучшенный жертвенный удар',level:11,action:'bonus'},{id:'marchUntoDestiny',name:'Шествие к судьбе',level:15,action:'passive'},{id:'finalMartyrdom',name:'Последнее мученичество',level:20,action:'action'}],subclasses:[{id:'mercy',name:'Burden of Mercy',features:[]},{id:'revolution',name:'Burden of Revolution',features:[]},{id:'truth',name:'Burden of Truth',features:[]},{id:'awakening',name:'Burden of Awakening',features:[]}],hooks:{sync:syncMartyr,useFeature:useMartyr}}
  ];
  packs.forEach(function(p){D.registerClass(p);});
  global.DNDExpansionClasses={VERSION:'1.0.0',packs:packs.map(function(p){return p.id;})};
})(window);
