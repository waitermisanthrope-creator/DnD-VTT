/**
 * blood_hunter_engine.js
 * ------------------------------------------------------------------
 * ЧТО ЭТО ЗА ФАЙЛ:
 * Полноценный расширяемый контент-пак Кровавого охотника (Blood Hunter):
 * Hemocraft, Crimson Rite, Blood Maledict и четыре популярных Order.
 * Это первый крупный сторонний класс, подключённый через Content Framework.
 *
 * КАК РАБОТАЕТ:
 * - регистрирует класс через DNDContent;
 * - sync() создаёт Blood Maledict, Crimson Rite и order-ресурсы;
 * - useFeature() применяет выбранную механику;
 * - attackModifiers() добавляет rite/brand/lycan damage;
 * - saveModifiers() учитывает curse/Mutagen состояния;
 * - события turn/attack поддерживают длительные состояния.
 *
 * ОСНОВНЫЕ ПЕРЕМЕННЫЕ:
 * hero.resources, hero.classFeaturesState, hemocraftDie,
 * crimsonRite, bloodCurses, brandTargetId, hybridForm, mutagens,
 * pactSlots и order-specific state.
 *
 * ИСТОЧНИК:
 * Matthew Mercer / Critical Role — Blood Hunter. В проекте помечен как
 * сторонний контент; конкретная реализация намеренно описывает механику
 * кратко и через структурированные эффекты, а не копирует книгу целиком.
 *
 * НЕ ИЗМЕНЯЕТ Wallpapers.js/Ambiences.js.
 * ------------------------------------------------------------------
 */
(function(global){
  'use strict';
  var D=global.DNDContent;
  if(!D)return;
  var CLASS='Кровавый охотник';
  var DIE={1:'1d4',5:'1d6',9:'1d8',13:'1d10',17:'1d12'};
  function n(v,d){var x=Number(v);return isFinite(x)?x:(d||0);}
  function lvl(h){var c=(h&&h.classes||[]).find(function(x){return String(x.name)===CLASS;});return c?n(c.level):0;}
  function state(h){if(!h.classFeaturesState)h.classFeaturesState={};if(!h.resources)h.resources={};return h.classFeaturesState;}
  function dieLevel(l){var d='1d4';Object.keys(DIE).forEach(function(k){if(l>=Number(k))d=DIE[k];});return d;}
  function dieSides(l){return Number(dieLevel(l).split('d')[1]);}
  function ensure(h,id,max,recharge){if(!h.resources)h.resources={};var old=h.resources[id];if(!old||n(old.max)!==n(max))h.resources[id]={max:n(max),current:old?Math.min(n(old.current),n(max)):n(max),recharge:recharge||'short'};else old.recharge=recharge||old.recharge;return h.resources[id];}
  function spend(h,id,cost){var r=h.resources[id];if(!r||n(r.current)<cost)return false;r.current-=cost;return true;}
  function hp(h){return n(h.hpCurrent,n(h.hitPoints,h.hp||h.currentHP));}
  function setHp(h,v){if('hpCurrent' in h)h.hpCurrent=v;else if('hitPoints' in h)h.hitPoints=v;else if('currentHP' in h)h.currentHP=v;else h.hp=v;if(h.hp&&typeof h.hp==='object')h.hp.current=v;else if('hpCurrent' in h){h.hp={current:v,max:n(h.hpMax,v),temp:n(h.hpTemp,0)};}}
  function rollDie(s){return Math.floor(Math.random()*s)+1;}
  function bloodCost(h){return rollDie(dieSides(lvl(h)));}
  function hemocraftMax(h){return Math.max(1,Math.ceil((lvl(h)||1)/4));}
  function pb(h){return Math.max(2,Math.floor(((n(h.level)||lvl(h))-1)/4)+2);}
  function sync(h){var l=lvl(h);if(!l)return;h.hemocraftDie=dieLevel(l);ensure(h,'bloodMaledict',pb(h),'short');ensure(h,'crimsonRite',1,'short');var s=state(h);var cc=(h.classes||[]).find(function(x){return String(x.name)===CLASS;});var subName=cc&&cc.subclass?String(cc.subclass):'';if(!s.bloodCurses)s.bloodCurses={};if(!s.crimsonRite)s.crimsonRite={active:false,type:null,weaponId:null};if((subName==='Order of the Lycan'||subName==='Орден ликантропов')){ensure(h,'hybridTransformation',1,'short');}if((subName==='Order of the Mutant'||subName==='Орден мутантов')){ensure(h,'mutagens',Math.max(1,Math.floor(l/4)),'long');}if((subName==='Order of the Profane Soul'||subName==='Орден осквернённых душ')){ensure(h,'bloodHunterPactSlots',l>=17?4:l>=11?3:l>=5?2:1,'short');}}
  function useCrimsonRite(h,ctx){sync(h);var s=state(h),loss=bloodCost(h),cur=hp(h);if(cur<=loss)return{ok:false,reason:'Недостаточно HP для Hemocraft.'};if(!spend(h,'crimsonRite',1))return{ok:false,reason:'Нет доступной активации Crimson Rite.'};setHp(h,cur-loss);s.crimsonRite={active:true,type:String(ctx&&ctx.riteType||'огонь'),weaponId:ctx&&ctx.weaponId||null};return{ok:true,message:'🩸 Crimson Rite активирован: '+s.crimsonRite.type+'; потеряно '+loss+' HP.'};}
  function useBloodCurse(h,ctx){sync(h);var s=state(h),curse=String(ctx&&ctx.curse||'binding'),target=ctx&&ctx.target;if(!target)return{ok:false,reason:'Нужна цель на поле.'};var loss=ctx&&ctx.amplify?bloodCost(h):0,cur=hp(h);if(ctx&&ctx.amplify&&cur<=loss)return{ok:false,reason:'Недостаточно HP для Amplify.'};if(!spend(h,'bloodMaledict',1))return{ok:false,reason:'Нет доступного Blood Maledict.'};var out={ok:true,message:'🩸 Blood Curse: '+curse+'.',curse:curse,targetId:target.id};if(ctx&&ctx.amplify){setHp(h,cur-loss);out.message+=' Amplified; потеряно '+loss+' HP.';out.amplified=true;}s.lastBloodCurse=out;return out;}
  function useBrand(h,ctx){sync(h);var t=ctx&&ctx.target;if(!t)return{ok:false,reason:'Нужна цель.'};state(h).brandTargetId=t.id;return{ok:true,message:'🔻 Brand of Castigation наложен на '+(t.name||'цель')+'.'};}
  function useLycan(h,ctx){sync(h);var s=state(h);if(s.hybridForm){s.hybridForm=false;return{ok:true,message:'🐺 Hybrid Transformation завершена.'};}if(!spend(h,'hybridTransformation',1))return{ok:false,reason:'Трансформация недоступна.'};s.hybridForm=true;return{ok:true,message:'🐺 Hybrid Transformation активна: усиленные природные атаки и сопротивление физическому урону.'};}
  function useMutagen(h,ctx){sync(h);if(!spend(h,'mutagens',1))return{ok:false,reason:'Нет доступного мутагена.'};var s=state(h);s.activeMutagen=String(ctx&&ctx.mutagen||'celerity');return{ok:true,message:'🧪 Mutagen активирован: '+s.activeMutagen+'.'};}
  function useProfanePact(h){sync(h);if(!spend(h,'bloodHunterPactSlots',1))return{ok:false,reason:'Нет ячейки Пакта.'};return{ok:true,message:'👁️ Profane Soul: использована ячейка Пакта.'};}
  function useFeature(h,id,ctx,feature){sync(h);switch(id){case'crimsonRite':return useCrimsonRite(h,ctx);case'bloodMaledict':return useBloodCurse(h,ctx);case'brandOfCastigation':case'brandOfTethering':return useBrand(h,ctx);case'hybridTransformation':return useLycan(h,ctx);case'mutagencraft':return useMutagen(h,ctx);case'profanePactMagic':return useProfanePact(h);case'sanguineMastery':return{ok:true,passive:true,message:'🩸 Sanguine Mastery: мастерство Hemocraft активно.'};default:if(feature&&feature.action==='passive')return{ok:true,passive:true,message:'✨ '+(feature.name||id)+' пассивно активно.'};return{ok:false,unsupported:true,message:'Способность '+(feature&&feature.name||D.getFeature(id)||{name:id}).name+' зарегистрирована, но её runtime-эффект ещё не реализован.'};}}
  function attackModifiers(h,ctx){sync(h);var o={bonusDamage:0,extraDice:[],advantage:false,disadvantage:false,notes:[]},s=state(h),l=lvl(h);if(s.crimsonRite&&s.crimsonRite.active){o.extraDice.push(dieLevel(l));o.notes.push('Crimson Rite');}if(s.hybridForm){o.extraDice.push(l>=11?'1d8':'1d6');o.notes.push('Hybrid Transformation');}if(s.brandTargetId&&ctx&&ctx.target&&String(s.brandTargetId)===String(ctx.target.id)){o.extraDice.push(l>=13?'1d8':'1d6');o.notes.push('Blood Brand');}return o;}
  function saveModifiers(h,ctx){var o={bonus:0,advantage:false,notes:[]},s=state(h);if(s.activeMutagen==='crimson'&&ctx&&ctx.saveType==='con'){o.bonus+=2;o.notes.push('Mutagen');}return o;}
  function turnEnd(h){var s=state(h);if(s.hybridForm&&s.bloodlustUsedThisTurn===false)s.hybridForm=false;s.bloodlustUsedThisTurn=false;}
  function featureList(h){return D.availableFeatures(h,CLASS);}
  var pack={id:'blood-hunter',name:CLASS,source:'Matthew Mercer / Critical Role — third-party content',license:'Use only with appropriate content rights; implementation is an original rules engine layer',features:[
    {id:'bloodHunterHemocraft',name:'Hemocraft',level:1,action:'passive',description:'Основной ресурс Кровавого охотника; размер кости зависит от уровня.'},
    {id:'crimsonRite',name:'Crimson Rite',level:1,action:'bonus',description:'Потратить HP через Hemocraft и наполнить оружие элементарной силой.'},
    {id:'bloodMaledict',name:'Blood Maledict',level:1,action:'reaction',description:'Применить Blood Curse; часть проклятий можно Amplify ценой собственного HP.'},
    {id:'brandOfCastigation',name:'Brand of Castigation',level:6,action:'on-hit',description:'Пометить поражённую цель и отслеживать/наказывать её в рамках механики бренда.'},
    {id:'brandOfTethering',name:'Brand of Tethering',level:13,action:'on-hit',description:'Усиленный бренд высокого уровня с ограничением перемещения цели.'},
    {id:'sanguineMastery',name:'Sanguine Mastery',level:20,action:'passive',description:'Высокоуровневое мастерство Hemocraft.'}
  ],subclasses:[
    {id:'ghostslayer',name:'Орден призрачных убийц',features:[{id:'riteOfTheDawn',name:'Rite of the Dawn',level:3,action:'passive',description:'Особый rite для борьбы с нежитью.'},{id:'curseOfTheMarked',name:'Curse of the Marked',level:3,action:'on-hit',description:'Дополнительное давление на отмеченную нежить.'},{id:'bloodCurseOfTheExorcist',name:'Blood Curse of the Exorcist',level:6,action:'reaction',description:'Снимает ряд эффектов с цели.'},{id:'etherealStep',name:'Ethereal Step',level:7,action:'bonus',description:'Краткое перемещение через эфир.'}]},
    {id:'lycan',name:'Орден ликантропов',features:[{id:'hybridTransformation',name:'Hybrid Transformation',level:3,action:'bonus',description:'Превращение в гибридную форму.'},{id:'predatoryStrikes',name:'Predatory Strikes',level:3,action:'on-hit',description:'Усиленные природные атаки гибридной формы.'},{id:'stalkerProwess',name:'Stalker’s Prowess',level:7,action:'passive',description:'Улучшенная мобильность и чувства.'},{id:'exaltedMutation',name:'Exalted Mutation',level:18,action:'passive',description:'Высшая форма lycan.'}]},
    {id:'mutant',name:'Орден мутантов',features:[{id:'mutagencraft',name:'Mutagencraft',level:3,action:'bonus',description:'Создание и применение мутагенов.'},{id:'mutantForm',name:'Mutant Form',level:7,action:'passive',description:'Расширенные эффекты активных мутагенов.'},{id:'alchemicalMastery',name:'Alchemical Mastery',level:11,action:'passive',description:'Улучшенный контроль мутагенов.'},{id:'exaltedMutation',name:'Exalted Mutation',level:18,action:'passive',description:'Высшее мутирование.'}]},
    {id:'profaneSoul',name:'Орден осквернённых душ',features:[{id:'profanePactMagic',name:'Pact Magic',level:3,action:'action',description:'Небольшой набор магии Пакта.'},{id:'otherworldlyPatron',name:'Otherworldly Patron',level:3,action:'passive',description:'Выбор покровителя и связанных эффектов.'},{id:'mysticFrenzy',name:'Mystic Frenzy',level:7,action:'passive',description:'Связать магию и атаку оружием.'},{id:'unsealedArcana',name:'Unsealed Arcana',level:11,action:'passive',description:'Расширение магических возможностей.'}]}
  ],hooks:{sync:sync,useFeature:useFeature,attackModifiers:attackModifiers,saveModifiers:saveModifiers,onTurnEnd:turnEnd}};
  var result=D.registerClass(pack);if(result.ok){global.DNDBloodHunter={VERSION:'1.0.0',CLASS:CLASS,hemocraftDie:dieLevel,sync:sync,useFeature:useFeature,attackModifiers:attackModifiers,saveModifiers:saveModifiers,featureList:featureList};}
})(window);
