/**
 * Бистхарт — полная модель класса MCDM 5e.
 * Все строки, которые видит игрок, на русском.
 */
(function(g){
'use strict';
var CLASS='Бистхарт';
var bonds={
 ferocious:{name:'Свирепый союз',levels:{3:['Яростный рывок','Мудрость ярости'],7:['Заряжающая ярость'],11:['Свирепая ярость'],15:['Усиленная ярость']}},
 hunter:{name:'Охотничий союз',levels:{3:['Избранная добыча','Инстинкты охотника'],7:['Охотничья связь'],11:['Улучшенная охота'],15:['Выслеживание добычи']}},
 infernal:{name:'Инфернальный союз',levels:{3:['Дьявольское понимание','Инфернальные приёмы'],7:['Адское обаяние'],11:['Демонические черты'],15:['Инфернальная форма']}},
 primordial:{name:'Первородный союз',levels:{3:['Первородное понимание','Приёмы природы'],7:['Союз с землёй'],11:['Улучшенные приёмы природы'],15:['Первобытная форма']}},
 protector:{name:'Защитный союз',levels:{3:['Живучесть зверя','Фаланга стаи'],7:['Утолщённая шкура'],11:['Страж-компаньон'],15:['Неумирающий защитник']}}
};
var creatures={
basilisk:{name:'Василиск',size:'Средний',ac:15,hp:22,speed:20,actions:[{name:'Укус',attackBonus:5,damage:'1d8+3',damageType:'колющий',rangeFt:5},{name:'Окаменяющий взгляд',attackBonus:0,damage:'2d6',damageType:'яд'}]},
bloodhawk:{name:'Кровавый ястреб',size:'Маленький',ac:14,hp:12,speed:60,actions:[{name:'Когти',attackBonus:5,damage:'1d6+3',damageType:'рубящий',rangeFt:5}]},
bulette:{name:'Буровая акула',size:'Большой',ac:17,hp:42,speed:40,actions:[{name:'Укус',attackBonus:6,damage:'1d10+4',damageType:'колющий',rangeFt:5},{name:'Прыжок',attackBonus:6,damage:'2d6+4',damageType:'дробящий',rangeFt:10}]},
deinonychus:{name:'Дейноних',size:'Средний',ac:14,hp:18,speed:40,actions:[{name:'Когти',attackBonus:5,damage:'1d8+3',damageType:'рубящий',rangeFt:5}]},
dragon:{name:'Дракончик',size:'Средний',ac:16,hp:28,speed:30,actions:[{name:'Укус',attackBonus:6,damage:'1d8+4',damageType:'колющий',rangeFt:5},{name:'Дыхание',attackBonus:0,damage:'2d6',damageType:'огонь',rangeFt:15}]},
earth:{name:'Земляной элементаль',size:'Большой',ac:17,hp:45,speed:30,actions:[{name:'Удар',attackBonus:6,damage:'1d8+4',damageType:'дробящий',rangeFt:5},{name:'Землетрясение',attackBonus:0,damage:'2d6',damageType:'дробящий',rangeFt:10}]},
cube:{name:'Слизистый куб',size:'Большой',ac:8,hp:30,speed:15,actions:[{name:'Поглощение',attackBonus:4,damage:'2d6+2',damageType:'кислота',rangeFt:5}]},
spider:{name:'Гигантский паук',size:'Большой',ac:14,hp:24,speed:30,actions:[{name:'Укус',attackBonus:5,damage:'1d8+3',damageType:'яд',rangeFt:5},{name:'Паутина',attackBonus:5,damage:'1d4',damageType:'огонь',rangeFt:30}]},
toad:{name:'Гигантская жаба',size:'Большой',ac:13,hp:28,speed:30,actions:[{name:'Укус',attackBonus:5,damage:'1d10+3',damageType:'колющий',rangeFt:5},{name:'Язык',attackBonus:5,damage:'1d6+3',damageType:'дробящий',rangeFt:15}]},
weasel:{name:'Гигантская ласка',size:'Средний',ac:14,hp:16,speed:40,actions:[{name:'Укус',attackBonus:5,damage:'1d6+3',damageType:'колющий',rangeFt:5}]},
hellhound:{name:'Адская гончая',size:'Средний',ac:15,hp:30,speed:50,actions:[{name:'Укус',attackBonus:6,damage:'1d8+4',damageType:'огонь',rangeFt:5},{name:'Огненное дыхание',attackBonus:0,damage:'2d6',damageType:'огонь',rangeFt:15}]},
mimic:{name:'Мимик',size:'Средний',ac:12,hp:25,speed:15,actions:[{name:'Псевдоподия',attackBonus:5,damage:'1d8+3',damageType:'дробящий',rangeFt:5},{name:'Липкость',attackBonus:5,damage:'1d6',damageType:'кислота',rangeFt:5}]},
owlbear:{name:'Совомедведь',size:'Большой',ac:13,hp:38,speed:40,actions:[{name:'Клюв',attackBonus:6,damage:'1d8+4',damageType:'колющий',rangeFt:5},{name:'Когти',attackBonus:6,damage:'2d6+4',damageType:'рубящий',rangeFt:5}]},
sporeling:{name:'Спорлинг',size:'Маленький',ac:13,hp:20,speed:30,actions:[{name:'Удар спорами',attackBonus:5,damage:'1d6+3',damageType:'яд',rangeFt:5},{name:'Облако спор',attackBonus:0,damage:'1d6',damageType:'яд',rangeFt:10}]},
worg:{name:'Ворг',size:'Большой',ac:13,hp:30,speed:50,actions:[{name:'Укус',attackBonus:5,damage:'2d6+3',damageType:'колющий',rangeFt:5}]}
};
function lvl(h){var c=(h&&h.classes||[]).find(function(x){return String(x.name)===CLASS||String(x.name)==='Beastheart';});return c?Number(c.level)||0:0}
function st(h){h.classFeaturesState=h.classFeaturesState||{};return h.classFeaturesState}
function res(h,id,max,recharge){h.resources=h.resources||{};var r=h.resources[id];if(!r)r=h.resources[id]={max:max,current:max,recharge:recharge||'short'};r.max=max;r.current=Math.min(Number(r.current)||0,max);return r}
function prof(h){return Number(h.proficiencyBonus)||2}
function mod(h,a){var v=Number((h.abilities||{})[a]);return Math.floor((v-10)/2)}
function dc(h){return 8+prof(h)+mod(h,'wisdom')}
function ownerCompanion(h){var s=st(h);if(s.beastheartCompanionId&&g.DNDSecondaryEntities&&g.DNDSecondaryEntities.get)return g.DNDSecondaryEntities.get(s.beastheartCompanionId);return null}
function sync(h){
 var l=lvl(h);if(!l)return;var s=st(h);
 s.primalExploitSaveDC=dc(h);s.companionBond=s.companionBond||null;s.primalExploitsKnown=l>=17?7:l>=10?5:3;s.beyondInstinctBonus=l>=15?5:l>=10?3:l>=5?1:0;s.signatureAttackDice=l>=17?3:l>=11?2:l>=5?1:0;
 var fr=res(h,'beastheartFerocity',9999,'encounter');fr.unbounded=true;fr.displayMax=null;fr.current=Number((ownerCompanion(h)||{}).resources&&ownerCompanion(h).resources.ferocity)||0;
 s.beyondInstinct=l>=5?s.beyondInstinctBonus:0;
 s.faithfulCompanion=l>=6;s.masterCaregiver=l>=3;s.loyalToEnd=l>=13;s.keenSenses=l>=14;s.primalStrikeDice=l>=14?2:l>=8?1:0;
 if(s.beastheartCompanionId&&g.DNDSecondaryEntities&&g.DNDSecondaryEntities.get){
   var e=g.DNDSecondaryEntities.get(s.beastheartCompanionId);if(e){e.resources=e.resources||{};e.resources.ferocityMax=9999;e.resources.ferocity=Math.max(0,Number(e.resources.ferocity)||0);e.beastheartLevel=l;e.proficiencyBonus=prof(h);h.resources=h.resources||{};h.resources.beastheartFerocity=h.resources.beastheartFerocity||{};h.resources.beastheartFerocity.max=9999;h.resources.beastheartFerocity.unbounded=true;h.resources.beastheartFerocity.displayMax=null;h.resources.beastheartFerocity.current=Number(e.resources.ferocity)||0;h.resources.beastheartFerocity.recharge='encounter';if(g.DNDSecondaryEntities.update)g.DNDSecondaryEntities.update(e.id,{resources:e.resources,beastheartLevel:l,proficiencyBonus:e.proficiencyBonus});}
 }
}
function chooseCompanion(h,id){
 var c=creatures[id];if(!c)return{ok:false,message:'Неизвестный вид компаньона.'};
 var s=st(h),l=lvl(h);if(s.beastheartCompanionId&&g.DNDSecondaryEntities&&g.DNDSecondaryEntities.remove)g.DNDSecondaryEntities.remove(s.beastheartCompanionId);
 var spec={name:c.name,source:'Бистхарт',sourceType:'class',companionType:'beastheart',controlMode:'command',team:'party',hp:c.hp,maxHp:c.hp,ac:c.ac,speed:c.speed,size:c.size,actions:c.actions,resources:{ferocity:0,ferocityMax:9999},beastheartLevel:l,metadata:{вид:id,масштабируетсяСБистхартом:true}};
 var e=g.DNDCompanionPacks&&g.DNDCompanionPacks.create?g.DNDCompanionPacks.create('beastheart',spec):null;
 if(!e)return{ok:false,message:'Система спутников недоступна.'};s.beastheartCompanionId=e.id;s.beastheartCompanionType=id;sync(h);return{ok:true,companion:e,message:'Компаньон выбран: '+c.name+'.'};
}
function chooseBond(h,id){if(!bonds[id])return{ok:false,message:'Неизвестный союз.'};st(h).companionBond=id;return{ok:true,message:'Выбран '+bonds[id].name+'.'}}
function gainFerocity(h,n){var e=ownerCompanion(h);if(!e)return{ok:false,message:'Сначала выбери компаньона.'};e.resources=e.resources||{};e.resources.ferocity=Math.max(0,(Number(e.resources.ferocity)||0)+Math.max(0,Number(n)||0));if(g.DNDSecondaryEntities&&g.DNDSecondaryEntities.update)g.DNDSecondaryEntities.update(e.id,{resources:e.resources});h.resources=h.resources||{};h.resources.beastheartFerocity=h.resources.beastheartFerocity||{};h.resources.beastheartFerocity.max=9999;h.resources.beastheartFerocity.unbounded=true;h.resources.beastheartFerocity.displayMax=null;h.resources.beastheartFerocity.current=e.resources.ferocity;h.resources.beastheartFerocity.recharge='encounter';return{ok:true,ferocity:e.resources.ferocity}}
function startTurn(h,ctx){sync(h);ctx=ctx||{};var e=ownerCompanion(h),l=lvl(h),s=st(h);if(!e)return{ok:false,message:'Компаньон не найден.'};if(ctx.combat===false)return{ok:true,ferocity:Number(e.resources&&e.resources.ferocity)||0};var base=1+Math.floor(Math.random()*4),hostiles=Math.max(0,Number(ctx.hostilesWithin5)||0),bonus=l>=15?5:l>=10?3:l>=5?1:0;var gain=base+hostiles+bonus;gainFerocity(h,gain);var f=Number(e.resources&&e.resources.ferocity)||0;if(f<10||e.hp<=0||ctx.incapacitated)return{ok:true,gained:gain,ferocity:f,rampage:false};var roll=Number(ctx.animalHandlingRoll);var dc=5+f;if(Number.isFinite(roll)&&roll>=dc){return{ok:true,gained:gain,ferocity:f,rampage:false,animalHandlingDC:dc,message:'Компаньон удержан от буйства.'};}e.metadata=e.metadata||{};e.metadata.rampage=true;if(g.DNDSecondaryEntities&&g.DNDSecondaryEntities.update)g.DNDSecondaryEntities.update(e.id,{metadata:e.metadata});return{ok:true,gained:gain,ferocity:f,rampage:true,animalHandlingDC:dc,message:'⚠️ Компаньон вошёл в буйство.'}}
function endRampage(h){var e=ownerCompanion(h);if(!e)return{ok:false,message:'Компаньон не найден.'};e.resources=e.resources||{};e.resources.ferocity=0;e.metadata=e.metadata||{};e.metadata.rampage=false;if(g.DNDSecondaryEntities&&g.DNDSecondaryEntities.update)g.DNDSecondaryEntities.update(e.id,{resources:e.resources,metadata:e.metadata});if(h.resources&&h.resources.beastheartFerocity)h.resources.beastheartFerocity.current=0;return{ok:true,ferocity:0}}
function spendFerocity(h,n){var e=ownerCompanion(h);if(!e)return{ok:false,message:'Сначала выбери компаньона.'};e.resources=e.resources||{};var cur=Number(e.resources.ferocity)||0;if(cur<n)return{ok:false,message:'Недостаточно ярости компаньона.'};e.resources.ferocity=cur-n;if(g.DNDSecondaryEntities.update)g.DNDSecondaryEntities.update(e.id,{resources:e.resources});h.resources=h.resources||{};h.resources.beastheartFerocity=h.resources.beastheartFerocity||{};h.resources.beastheartFerocity.max=9999;h.resources.beastheartFerocity.unbounded=true;h.resources.beastheartFerocity.displayMax=null;h.resources.beastheartFerocity.current=Number(e.resources.ferocity)||0;h.resources.beastheartFerocity.recharge='encounter';return{ok:true,spent:n,remaining:e.resources.ferocity}}
function use(h,id,ctx){
 sync(h);ctx=ctx||{};var s=st(h),l=lvl(h),e=ownerCompanion(h);
 if(id==='chooseCompanion')return chooseCompanion(h,String(ctx.companion||''));
 if(id==='startTurn')return startTurn(h,ctx);
 if(id==='endRampage')return endRampage(h);
 if(id==='chooseBond')return chooseBond(h,String(ctx.bond||''));
 if(id==='primalExploit'){var n=Number(ctx.cost)||1,r=spendFerocity(h,n);if(!r.ok)return r;return{ok:true,effect:{exploit:String(ctx.exploit||'Звериный рывок'),cost:n},message:'Природный приём применён.'}}
 if(id==='rejuvenatingFerocity'){var uses=Number(s.rejuvenatingFerocityUses)||0;if(l<6)return{ok:false,message:'Доступно с 6 уровня.'};var maxUses=Math.max(1,mod(h,'wisdom'));var n=Number(ctx.amount)||Number(e&&e.resources&&e.resources.ferocity)||0;if(n<=0)return{ok:false,message:'Нет ярости для восстановления.'};if(uses>=maxUses)return{ok:false,message:'Все использования восстановления потрачены до долгого отдыха.'};var r=spendFerocity(h,n);if(!r.ok)return r;s.rejuvenatingFerocityUses=uses+1;if(e){e.hp=Math.min(Number(e.maxHp)||Number(e.hp)||1,(Number(e.hp)||0)+n);if(g.DNDSecondaryEntities.update)g.DNDSecondaryEntities.update(e.id,{hp:e.hp});}return{ok:true,effect:{restoreHp:n},message:'Компаньон восстанавливает '+n+' HP.'}}
 if(id==='primalStrike'){if(l<8)return{ok:false,message:'Доступно с 8 уровня.'};var n=Number(ctx.ferocity)||1;if(n<1)return{ok:false,message:'Нужно потратить хотя бы 1 Ferocity.'};var r=spendFerocity(h,n);if(!r.ok)return r;return{ok:true,effect:{extraDamage:(s.primalStrikeDice||1)+'d8',damageType:ctx.damageType||'громовой'},message:'Первобытный удар усиливает атаку.'}}
 if(id==='sootheBeast'){if(!e)return{ok:false,message:'Нет компаньона.'};if(e.resources)e.resources.ferocity=0;return{ok:true,effect:{removeRampage:true},message:'Компаньон успокоен.'}}
 if(id==='summonWilds'){if(l<18)return{ok:false,message:'Доступно с 18 уровня.'};return{ok:true,effect:{area:{shape:'cube',sizeFt:30,rangeFt:120,durationRounds:10},save:'wis',condition:'frightened',obscured:true},message:'Дикая стая призвана.'}}
 if(id==='unbreakableFriendship'){if(l<20)return{ok:false,message:'Доступно с 20 уровня.'};return{ok:true,effect:{autoAnimalHandlingRampage:true,dropToOneHP:true,initiativeFerocity:'1d10'},message:'Неразрывная дружба активна.'}}
 var b=s.companionBond;
 if(b==='ferocious'&&id==='frenziedCharge'){if(l<11)return{ok:false,message:'Доступно с 11 уровня.'};return{ok:true,effect:{reaction:true,moveFt:'speed',attack:true,advantageIfSameTarget:true,bonusDamage:'companionFerocity'},message:'Яростный рывок.'}}
 if(b==='ferocious'&&id==='energizingRampage'){if(l<7)return{ok:false,message:'Доступно с 7 уровня.'};if(e&&e.resources)e.resources.ferocity=Math.max(Number(e.resources.ferocity)||0,4);return{ok:true,message:'Ярость сохраняется после буйства.'}}
 if(b==='ferocious'&&id==='invigoratedRampage'){if(l<15)return{ok:false,message:'Доступно с 15 уровня.'};return{ok:true,effect:{conditionChoice:['ослеплён','оглох','испуган'],durationRounds:1},message:'Усиленное буйство.'}}
 if(b==='hunter'&&id==='chosenQuarry'){if(l<3)return{ok:false,message:'Доступно с 3 уровня.'};if(!ctx.targetId)return{ok:false,message:'Выбери цель для добычи.'};var r=spendFerocity(h,4);if(!r.ok)return r;s.quarryId=ctx.targetId;return{ok:true,effect:{bonusDamage:'1d6',durationRounds:60},message:'Добыча отмечена.'}}
 if(b==='hunter'&&id==='hunterWarding'){if(l<7)return{ok:false,message:'Доступно с 7 уровня.'};return{ok:true,effect:{companionResistance:'nonmagical',damageReduction:'wisdomModifier'},message:'Охотничий оберег.'}}
 if(b==='hunter'&&id==='synchronizedStealth'){if(l<11)return{ok:false,message:'Доступно с 11 уровня.'};return{ok:true,effect:{sharedStealth:true,advantageStealth:true},message:'Синхронная скрытность.'}}
 if(b==='hunter'&&id==='unseenHunters'){if(l<15)return{ok:false,message:'Доступно с 15 уровня.'};return{ok:true,effect:{invisible:true,durationMinutes:10,recharge:'long'},message:'Невидимые охотники.'}}
 if(b==='infernal'&&id==='infernalTeleport'){var r=spendFerocity(h,4);if(!r.ok)return r;return{ok:true,effect:{teleportFt:90},message:'Инфернальный перенос.'}}
 if(b==='infernal'&&id==='wickedDeception'){var r=spendFerocity(h,3);if(!r.ok)return r;return{ok:true,effect:{save:'wis',condition:'charmed',durationRounds:1},message:'Коварный обман.'}}
 if(b==='infernal'&&id==='drainThem'){var r=spendFerocity(h,4);if(!r.ok)return r;return{ok:true,effect:{healCompanion:'halfDamage'},message:'Высосать силу.'}}
 if(b==='infernal'&&id==='hellishWound'){var r=spendFerocity(h,4);if(!r.ok)return r;return{ok:true,effect:{ongoingDamage:'1d10',stacks:true,endsOnMagicHealing:true},message:'Адская рана.'}}
 if(b==='infernal'&&id==='wickedDeception'){var r=spendFerocity(h,3);if(!r.ok)return r;return{ok:true,effect:{save:'wis',condition:'charmed',durationRounds:1},message:'Коварный обман.'}}
 if(b==='infernal'&&id==='fiendishForm'){if(l<15)return{ok:false,message:'Доступно с 15 уровня.'};var r=spendFerocity(h,6);if(!r.ok)return r;return{ok:true,effect:{durationMinutes:1,resistance:['acid','cold','fire','lightning'],flyIfSelected:true,bonusFireDamage:'1d6'},message:'Инфернальная форма.'}}
 if(b==='primordial'&&id==='alliedEarth'){var r=spendFerocity(h,2);if(!r.ok)return r;return{ok:true,effect:{speedReductionFt:10,areaFt:10},message:'Союзная земля замедляет врагов.'}}
 if(b==='primordial'&&id==='spiritStampede'){if(l<11)return{ok:false,message:'Доступно с 11 уровня.'};return{ok:true,effect:{forceDamage:'companionFerocity',areaFt:40},message:'Духовный табун.'}}
 if(b==='primordial'&&id==='alliedWeather'){if(l<15)return{ok:false,message:'Доступно с 15 уровня.'};return{ok:true,effect:{reactionWeather:true,save:'strOrDex'},message:'Союзная погода.'}}
 if(b==='protector'&&id==='beastVitality'){if(l<3)return{ok:false,message:'Доступно с 3 уровня.'};return{ok:true,effect:{hpMaxBonus:3+(l-3)},message:'Живучесть зверя.'}}
 if(b==='protector'&&id==='sentinelCompanion'){if(l<11)return{ok:false,message:'Доступно с 11 уровня.'};var r=spendFerocity(h,2);if(!r.ok)return r;return{ok:true,effect:{reactionAttack:true,protectAlly:true},message:'Страж-компаньон.'}}
 if(b==='protector'&&id==='thickenedHide'){if(l<7)return{ok:false,message:'Доступно с 7 уровня.'};return{ok:true,effect:{companionACBonus:2},message:'Утолщённая шкура.'}}
 if(b==='protector'&&id==='undyingProtector'){if(l<15)return{ok:false,message:'Доступно с 15 уровня.'};var cost=Number(s.undyingProtectorCost)||2;var r=spendFerocity(h,cost);if(!r.ok)return r;s.undyingProtectorCost=cost+2;return{ok:true,effect:{preventZeroHp:true},message:'Неумирающий защитник.'}}
 return{ok:false,unsupported:true,message:'Для этой способности нужен общий боевой resolver.'}
}
function attack(h,ctx){
 sync(h);var e=ownerCompanion(h),o={bonusDamage:0,advantage:false,disadvantage:false,notes:[]};if(!e)return o;
 if(st(h).quarryId&&ctx&&String(ctx.targetId)===String(st(h).quarryId))o.bonusDamage+=6;
 if(e.metadata&&e.metadata.rampage){
   var f=Math.max(0,Number(e.resources&&e.resources.ferocity)||0);
   var bl=st(h).companionBond==='ferocious'&&lvl(h)>=11;
   o.bonusDamage+=bl?f:Math.floor(f/2);
   if(st(h).companionBond==='ferocious'&&lvl(h)>=11)o.advantage=true;
   o.notes.push('Атака буйства: дополнительный урон от Ferocity.');
 }
 if(st(h).companionBond==='protector')o.notes.push('Фаланга стаи');
 return o;
}
function endEncounter(h){
 var e=ownerCompanion(h);if(!e)return{ok:false,message:'Компаньон не найден.'};
 e.resources=e.resources||{};var keep=st(h).companionBond==='ferocious'&&lvl(h)>=7?4:0;
 e.resources.ferocity=keep;e.metadata=e.metadata||{};e.metadata.rampage=false;
 if(g.DNDSecondaryEntities&&g.DNDSecondaryEntities.update)g.DNDSecondaryEntities.update(e.id,{resources:e.resources,metadata:e.metadata});
 h.resources=h.resources||{};h.resources.beastheartFerocity=h.resources.beastheartFerocity||{};h.resources.beastheartFerocity.max=9999;h.resources.beastheartFerocity.unbounded=true;h.resources.beastheartFerocity.displayMax=null;h.resources.beastheartFerocity.current=keep;h.resources.beastheartFerocity.recharge='encounter';
 return{ok:true,ferocity:keep};
}

var progression={className:'Бистхарт',englishName:'Beastheart',source:'MCDM Beastheart and Monstrous Companions',status:'implemented_full',hitDie:8,primaryAbilities:['strength','dexterity'],secondaryAbility:'wisdom',savingThrows:['strength','wisdom'],armor:['light','medium','shields'],weapons:['simple','battleaxe','greataxe','longbow','net','scimitar','shortsword'],tools:[],skills:{choose:3,from:['Уход за животными','Атлетика','Запугивание','Природа','Внимательность','Скрытность','Выживание']},multiclass:{requires:[['strength','dexterity'],13,'wisdom',13]},subclassLevel:3,subclasses:Object.keys(bonds).map(function(k){return bonds[k].name;}),levels:{1:{features:['Компаньон','Природный язык']},2:{features:['Природные приёмы','Превосходная ярость']},3:{features:['Союз с компаньоном','Успокоить зверя','Мастерство заботы']},4:{features:['Увеличение характеристик / Черта']},5:{features:['За пределами инстинкта','Улучшенная фирменная атака']},6:{features:['Верный компаньон','Восстанавливающая ярость']},7:{features:['Способность союза']},8:{features:['Увеличение характеристик / Черта','Первобытный удар (1к8)']},9:{features:['Мистическая связь']},10:{features:['Улучшение за пределами инстинкта','Природные приёмы']},11:{features:['Улучшенная фирменная атака (2 кости)','Способность союза']},12:{features:['Увеличение характеристик / Черта']},13:{features:['Верность до конца']},14:{features:['Острые чувства','Первобытный удар (2к8)']},15:{features:['Улучшение за пределами инстинкта','Способность союза']},16:{features:['Увеличение характеристик / Черта']},17:{features:['Улучшенная фирменная атака (3 кости)','Природные приёмы']},18:{features:['Призыв дикой природы']},19:{features:['Увеличение характеристик / Черта']},20:{features:['Неразрывная дружба']}},mechanics:{status:'deep_audit_pass_1',companionActor:true,ferocity:true,rampage:true,subclassBonds:true}};
g.beastheartProgression=progression;
g.BeastheartRuntime={version:'1.2.0',bonds:bonds,companions:creatures,sync:sync,use:use,attack:attack,chooseCompanion:chooseCompanion,chooseBond:chooseBond,startTurn:startTurn,endRampage:endRampage,gainFerocity:gainFerocity,endEncounter:endEncounter};
if(g.DNDContent&&g.DNDContent.registerClass)g.DNDContent.registerClass({id:'mcdm-beastheart',name:'Бистхарт',displayName:'Бистхарт',source:'MCDM Beastheart and Monstrous Companions',features:[],hooks:{sync:sync,useFeature:use,attackModifiers:attack}});
})(window);
