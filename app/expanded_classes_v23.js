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

  var packs=[
    {id:'mcdm-illrigger',name:'Иллирригер',source:'MCDM Productions — The Illrigger Revised',license:'Requires appropriate source rights',features:[{id:'infernalBrand',name:'Infernal Brand',level:1,action:'bonus',target:'enemy',rangeFt:60},{id:'sealTransfer',name:'Seal Transfer',level:2,action:'action',target:'enemy',rangeFt:60},{id:'hellishRebuke',name:'Infernal Reaction',level:3,action:'reaction',target:'enemy',rangeFt:60}],subclasses:[{id:'hellknight',name:'Hell Knight',features:[{id:'hellishArmor',name:'Infernal Armor',level:3,action:'passive'}]},{id:'shadowmaster',name:'Shadowmaster',features:[{id:'shadowStep',name:'Shadow Step',level:3,action:'bonus'}]},{id:'painkiller',name:'Painkiller',features:[{id:'painTransfer',name:'Pain Transfer',level:3,action:'reaction'}]},{id:'duelist',name:'Dread Duelist',features:[{id:'infernalDuel',name:'Infernal Duel',level:3,action:'bonus'}]},{id:'commander',name:'Hellspeaker',features:[{id:'commandSeal',name:'Command Seal',level:3,action:'bonus'}]}],hooks:{sync:syncIll,useFeature:useIll,attackModifiers:illAttack}},
    {id:'mcdm-beastheart',name:'Бистхарт',source:'MCDM Productions — Beastheart and Monstrous Companions (5e)',license:'Requires appropriate source rights',features:[{id:'companionCommand',name:'Companion Command',level:1,action:'action',target:'self'},{id:'ferociousStrike',name:'Ferocious Strike',level:1,action:'bonus',target:'enemy',rangeFt:30},{id:'earthshaker',name:'Earthshaker',level:2,action:'action',rangeFt:10},{id:'rampage',name:'Rampage',level:3,action:'bonus',target:'self'}],subclasses:[{id:'beastcaller',name:'Beastcaller',features:[{id:'bondedBeast',name:'Bonded Beast',level:3,action:'passive'}]},{id:'direHunter',name:'Dire Hunter',features:[{id:'predatoryStrike',name:'Predatory Strike',level:3,action:'on-hit'}]},{id:'packleader',name:'Pack Leader',features:[{id:'packTactics',name:'Pack Tactics',level:3,action:'passive'}]},{id:'primalSoul',name:'Primal Soul',features:[{id:'primalBond',name:'Primal Bond',level:3,action:'bonus'}]},{id:'wildHeart',name:'Wild Heart',features:[{id:'feralForm',name:'Feral Form',level:3,action:'bonus'}]}],hooks:{sync:syncBeast,useFeature:useBeast,attackModifiers:beastAttack}},
    {id:'pugilist',name:'Пугилист',source:'Benjamin Huffman / community Pugilist',license:'Requires appropriate source rights',features:[{id:'oldOneTwo',name:'Old One-Two',level:1,action:'bonus',target:'self'},{id:'stickAndMove',name:'Stick and Move',level:1,action:'bonus',target:'self'},{id:'bloodiedButUnbowed',name:'Bloodied but Unbowed',level:3,action:'reaction',target:'self'},{id:'haymaker',name:'Haymaker',level:5,action:'bonus',target:'enemy',rangeFt:5},{id:'shakeItOff',name:'Shake It Off',level:7,action:'bonus',target:'self'}],subclasses:[{id:'sweetScience',name:'The Sweet Science',features:[{id:'technicalBoxer',name:'Technical Boxer',level:3,action:'passive'}]},{id:'streetFighter',name:'The Street Fighter',features:[{id:'dirtyTricks',name:'Dirty Tricks',level:3,action:'bonus'}]},{id:'bloodhound',name:'The Bloodhound',features:[{id:'relentlessPursuit',name:'Relentless Pursuit',level:3,action:'reaction'}]},{id:'knuckleBone',name:'Knuckle Bone',features:[{id:'boneBreaker',name:'Bone Breaker',level:3,action:'on-hit'}]}],hooks:{sync:syncPug,useFeature:usePug,attackModifiers:pugAttack}}
  ];
  packs.forEach(function(p){D.registerClass(p);});
  g.DNDExpandedV23={VERSION:'1.0.0',packs:packs.map(function(p){return p.id;})};
})(window);
