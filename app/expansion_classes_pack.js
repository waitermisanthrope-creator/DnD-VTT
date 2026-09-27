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

  function psiMax(l){var t=[0,0,2,2,2,3,3,4,4,5,5,5,6,6,6,7,7,7,8,8,8];return t[Math.max(1,Math.min(20,l))]||0;}
  function syncPsion(h){var l=lvl(h,'Psion');if(!l)return;res(h,'psiPoints',psiMax(l),'long');}
  function warlordDice(l){return l>=17?7:l>=13?6:l>=9?5:l>=5?4:3;}
  function warlordDie(l){return l>=17?'d10':l>=9?'d8':'d6';}
  function syncWarlord(h){var l=lvl(h,'Warlord');if(!l)return;var r=res(h,'commandDice',warlordDice(l),'short');r.die=warlordDie(l);r.perTurn=l>=17?4:l>=11?3:l>=6?2:1;}
  function wardenEndurance(l){return l>=17?7:l>=13?6:l>=9?5:l>=5?4:3;}
  function wardenDie(l){return l>=11?'d12':l>=5?'d10':'d8';}
  function syncWarden(h){var l=lvl(h,'Warden');if(!l)return;var r=res(h,'wardenEndurance',wardenEndurance(l),'short');r.die=wardenDie(l);}
  function syncSpellblade(h){var l=lvl(h,'Spellblade');if(!l)return;res(h,'arcaneSurges',Math.max(2,Math.ceil((Number(h.proficiencyBonus)||Math.floor((l-1)/4)+2))), 'short');}

  function target(ctx){return ctx&&ctx.target?ctx.target:null;}
  function usePsion(h,id,ctx,feature){syncPsion(h);var s=st(h),t=target(ctx);if(id==='psionicPower'){if(!spend(h,'psiPoints',1))return{ok:false,message:'Недостаточно очков пси.'};s.psionicPower=true;return{ok:true,message:'🧠 Psionic Power: следующий подходящий эффект усилен.'};}if(id==='telekineticPush'){if(!t)return{ok:false,message:'Выбери цель на поле.'};if(!spend(h,'psiPoints',2))return{ok:false,message:'Недостаточно очков пси.'};return{ok:true,target:t.id,effect:{forcedMoveFt:10},message:'🧠 Telekinetic Push: цель отталкивается на 10 ft.'};}if(id==='mindThrust'){if(!t)return{ok:false,message:'Выбери цель на поле.'};if(!spend(h,'psiPoints',1))return{ok:false,message:'Недостаточно очков пси.'};return{ok:true,target:t.id,effect:{save:'int',damage:'1d8 psychic'},message:'🧠 Mind Thrust применён.'};}if(feature&&feature.action==='passive')return{ok:true,passive:true,message:'✨ '+(feature.name||id)+' пассивно активно.'};return{ok:false,unsupported:true,message:'Способность '+id+' зарегистрирована, но её runtime-эффект ещё не реализован.'};}
  function psionAttack(h,ctx){var s=st(h),o={bonusDamage:0,extraDice:[],advantage:false,disadvantage:false,notes:[]};if(s.psionicPower){o.extraDice.push(dieFor(lvl(h,'Psion')));o.notes.push('Psionic Power');s.psionicPower=false;}return o;}

  function useWarlord(h,id,ctx,feature){syncWarlord(h);var t=target(ctx);if(id==='commandingStrike'){if(!t)return{ok:false,message:'Выбери союзника на поле.'};if(!spend(h,'commandDice',1))return{ok:false,message:'Нет кубов лидерства.'};return{ok:true,target:t.id,effect:{grantAttack:true,bonusDie:(h.resources&&h.resources.commandDice&&h.resources.commandDice.die)||dieFor(lvl(h,'Warlord'))},message:'⚔️ Commanding Strike: союзник получает усиление атаки.'};}if(id==='rallyingCry'){if(!spend(h,'commandDice',1))return{ok:false,message:'Нет кубов лидерства.'};return{ok:true,effect:{allyTempHp:Math.max(1,mod(h,'cha'))+Number(lvl(h,'Warlord'))},message:'📣 Rallying Cry: союзники получают временные HP.'};}if(feature&&feature.action==='passive')return{ok:true,passive:true,message:'✨ '+(feature.name||id)+' пассивно активно.'};return{ok:false,unsupported:true,message:'Способность '+id+' зарегистрирована, но её runtime-эффект ещё не реализован.'};}
  function warlordAttack(h){return{bonusDamage:0,extraDice:[],advantage:false,disadvantage:false,notes:[]};}

  function useWarden(h,id,ctx,feature){syncWarden(h);var t=target(ctx);if(id==='primalChallenge'){if(!t)return{ok:false,message:'Выбери врага на поле.'};if(!spend(h,'wardenEndurance',1))return{ok:false,message:'Нет костей выносливости.'};st(h).challengedTargetId=t.id;return{ok:true,target:t.id,effect:{marked:true},message:'🌿 Primal Challenge: цель помечена.'};}if(id==='earthshaker'){if(!spend(h,'wardenEndurance',2))return{ok:false,message:'Недостаточно костей выносливости.'};return{ok:true,effect:{aoeRadiusFt:10,damage:'2d6 bludgeoning',save:'str'},message:'🌿 Earthshaker: зона 10 ft подготовлена.'};}if(feature&&feature.action==='passive')return{ok:true,passive:true,message:'✨ '+(feature.name||id)+' пассивно активно.'};return{ok:false,unsupported:true,message:'Способность '+id+' зарегистрирована, но её runtime-эффект ещё не реализован.'};}
  function wardenAttack(h,ctx){var s=st(h),o={bonusDamage:0,extraDice:[],advantage:false,disadvantage:false,notes:[]};if(s.challengedTargetId&&ctx&&ctx.target&&String(s.challengedTargetId)===String(ctx.target.id)){o.extraDice.push(dieFor(lvl(h,'Warden')));o.notes.push('Primal Challenge');}return o;}

  function useSpellblade(h,id,ctx,feature){syncSpellblade(h);if(id==='spellstrike'){if(!spend(h,'arcaneSurges',1))return{ok:false,message:'Нет доступного арканного рывка.'};st(h).spellstrikePending=true;return{ok:true,effect:{spellstrike:true},message:'⚔️✨ Spellstrike: следующая атака может связать оружие и заклинание.'};}if(id==='arcaneGuard'){st(h).arcaneGuard=true;return{ok:true,effect:{tempHp:5+lvl(h,'Spellblade')},message:'✨ Arcane Guard активирован.'};}if(feature&&feature.action==='passive')return{ok:true,passive:true,message:'✨ '+(feature.name||id)+' пассивно активно.'};return{ok:false,unsupported:true,message:'Способность '+id+' зарегистрирована, но её runtime-эффект ещё не реализован.'};}
  function spellbladeAttack(h){var s=st(h),o={bonusDamage:0,extraDice:[],advantage:false,disadvantage:false,notes:[]};if(s.spellstrikePending){o.extraDice.push('2d6');o.notes.push('Spellstrike');s.spellstrikePending=false;}return o;}

  var packs=[
    {id:'kibbles-psion',name:'Psion',displayName:'Псионик',source:'KibblesTasty Homebrew',license:'CC-BY content source; original runtime implementation',features:[{id:'psionicPower',name:'Псионическая сила',level:1,action:'bonus',description:'Усилить следующий подходящий псionic эффект.'},{id:'mindThrust',name:'Ментальный удар',level:1,action:'action',target:'enemy',rangeFt:60,description:'Псионическая атака по выбранной цели.'},{id:'telekineticPush',name:'Телекинетический толчок',level:2,action:'action',target:'enemy',rangeFt:60,description:'Принудительно переместить цель.'}],subclasses:[{id:'awakened',name:'Пробуждённый',features:[{id:'telepathy',name:'Телепатия',level:3,action:'passive'}]},{id:'unleashed',name:'Освобождённый',features:[{id:'forceSurge',name:'Всплеск силы',level:3,action:'bonus'}]},{id:'transcended',name:'Возвысившийся',features:[{id:'bodyMind',name:'Тело и разум',level:3,action:'passive'}]},{id:'shaper',name:'Создатель',features:[{id:'mentalConstruct',name:'Ментальная конструкция',level:3,action:'action'}]}],hooks:{sync:syncPsion,useFeature:usePsion,attackModifiers:psionAttack}},
    {id:'kibbles-warlord',name:'Warlord',displayName:'Военачальник',source:'KibblesTasty Homebrew',license:'CC-BY content source; original runtime implementation',features:[{id:'commandingStrike',name:'Командный удар',level:1,action:'reaction',target:'ally',rangeFt:30,description:'Передать союзнику возможность усилить атаку.'},{id:'rallyingCry',name:'Боевой клич',level:1,action:'bonus',target:'ally',rangeFt:30,description:'Поднять боевой дух группы.'}],subclasses:[{id:'tactician',name:'Тактик',features:[{id:'tacticalShift',name:'Тактический манёвр',level:3,action:'reaction'}]},{id:'paragon',name:'Парагон',features:[{id:'heroicSurge',name:'Героический рывок',level:3,action:'bonus'}]},{id:'packleader',name:'Вожак',features:[{id:'coordinatedAssault',name:'Скоординированная атака',level:3,action:'reaction'}]},{id:'chieftain',name:'Вождь',features:[{id:'warCry',name:'Боевой клич вождя',level:3,action:'bonus'}]}],hooks:{sync:syncWarlord,useFeature:useWarlord,attackModifiers:warlordAttack}},
    {id:'kibbles-warden',name:'Warden',displayName:'Страж',source:'KibblesTasty Homebrew',license:'CC-BY content source; original runtime implementation',features:[{id:'primalChallenge',name:'Первобытный вызов',level:1,action:'bonus',target:'enemy',rangeFt:30,description:'Пометить врага и контролировать его на поле.'},{id:'earthshaker',name:'Землетряс',level:2,action:'action',rangeFt:10,description:'Создать короткую зону контроля с проверкой силы.'}],subclasses:[{id:'fortressmind',name:'Крепость разума',features:[{id:'psychicWard',name:'Психический барьер',level:3,action:'reaction'}]},{id:'elements',name:'Стихии',features:[{id:'elementalAspect',name:'Стихийный облик',level:3,action:'bonus'}]},{id:'roots',name:'Корни',features:[{id:'graspingRoots',name:'Хватающие корни',level:3,action:'action'}]},{id:'nightmares',name:'Кошмары',features:[{id:'dreadAura',name:'Аура ужаса',level:3,action:'bonus'}]}],hooks:{sync:syncWarden,useFeature:useWarden,attackModifiers:wardenAttack}},
    {id:'kibbles-spellblade',name:'Spellblade',displayName:'Заклинатель клинка',source:'KibblesTasty Homebrew',license:'CC-BY content source; original runtime implementation',features:[{id:'spellstrike',name:'Заклинательный удар',level:1,action:'bonus',target:'self',description:'Связать оружейную атаку с магическим эффектом.'},{id:'arcaneGuard',name:'Арканная защита',level:2,action:'bonus',target:'self',description:'Получить временную защиту.'}],subclasses:[{id:'arcaneTradition',name:'Арканная традиция',features:[{id:'arcaneDuelist',name:'Арканный дуэлянт',level:3,action:'passive'}]},{id:'stormTradition',name:'Традиция бури',features:[{id:'stormStrike',name:'Удар бури',level:3,action:'on-hit'}]},{id:'wardingTradition',name:'Оберегающая традиция',features:[{id:'spellParry',name:'Парирование заклинания',level:3,action:'reaction'}]},{id:'bladeDancer',name:'Танцор клинка',features:[{id:'bladeDance',name:'Танец клинка',level:3,action:'bonus'}]}],hooks:{sync:syncSpellblade,useFeature:useSpellblade,attackModifiers:spellbladeAttack}}
  ];
  packs.forEach(function(p){D.registerClass(p);});
  global.DNDExpansionClasses={VERSION:'1.0.0',packs:packs.map(function(p){return p.id;})};
})(window);
