/**
 * Blood Hunter deep runtime — core + all four Orders.
 * Source mechanics: Matt Mercer / Critical Role partner content.
 * This file stores original structured runtime data, not book text.
 */
(function(global){
'use strict';
var D=global.DNDContent;if(!D)return;
var CLASS='Кровавый охотник', DIE={1:4,5:6,11:8,17:10};
function num(v,d){var n=Number(v);return isFinite(n)?n:(d||0);}
function lvl(h){var c=(h&&h.classes||[]).find(function(x){return ['Кровавый охотник','Blood Hunter','BloodHunter'].indexOf(String(x.name))>=0;});return c?num(c.level):0;}
function st(h){h.classFeaturesState=h.classFeaturesState||{};return h.classFeaturesState;}
function res(h,id,max,recharge){h.resources=h.resources||{};var r=h.resources[id];if(!r)r=h.resources[id]={max:max,current:max};else{var used=Math.max(0,num(r.max)-num(r.current));r.max=max;r.current=Math.max(0,max-used);}r.recharge=recharge||'short';return r;}
function spend(h,id,n){var r=h.resources&&h.resources[id];if(!r||num(r.current)<n)return false;r.current-=n;return true;}
function mod(h,key){var short=key.slice(0,3);if(global.DNDRules&&global.DNDRules.getStats&&h.stats)return Math.floor((global.DNDRules.getStats(h)[short]-10)/2);var sources=[h.abilityScores,h.stats,h.abilities];for(var i=0;i<sources.length;i++){var a=sources[i];if(!a)continue;var v=a[key];if(v==null)v=a[short];if(v==null)v=a[short.toUpperCase()];if(v==null)v=a[key.toUpperCase()];if(v!=null&&isFinite(Number(v)))return Math.floor((Number(v)-10)/2);}return 0;}
function hemMod(h){var s=st(h),a=s.hemocraftAbility||'intelligence';return mod(h,a);}
function dc(h){return 8+num(h.proficiencyBonus,Math.max(2,Math.floor((num(h.level)||lvl(h)-1)/4)+2))+hemMod(h);}
function dieSides(l){var d=4;Object.keys(DIE).forEach(function(k){if(l>=Number(k))d=DIE[k];});return d;}
function die(l){return '1d'+dieSides(l);}
function roll(s){return Math.floor(Math.random()*s)+1;}
function bloodLoss(h){return roll(dieSides(lvl(h)));}
function hp(h){if(h.hpCurrent!=null)return num(h.hpCurrent);if(h.hitPoints!=null)return num(h.hitPoints);if(h.currentHP!=null)return num(h.currentHP);return num(h.hp&&typeof h.hp==='object'?h.hp.current:h.hp);}
function setHp(h,v){v=Math.max(0,num(v));if('hpCurrent'in h){h.hpCurrent=v;if(!h.hp||typeof h.hp!=='object')h.hp={};h.hp.current=v;if(h.hpMax!=null)h.hp.max=num(h.hpMax);}else if('hitPoints'in h)h.hitPoints=v;else if('currentHP'in h)h.currentHP=v;else if(h.hp&&typeof h.hp==='object')h.hp.current=v;else h.hp=v;}
function target(ctx){return ctx&&ctx.target||null;}
function sub(h){var c=(h.classes||[]).find(function(x){return ['Кровавый охотник','Blood Hunter','BloodHunter'].indexOf(String(x.name))>=0;});return c&&String(c.subclass||'');}
function orderKey(h){var x=sub(h).toLowerCase();return /призрач|ghostslayer/.test(x)?'ghostslayer':/ликантроп|lycan/.test(x)?'lycan':/мутант|mutant/.test(x)?'mutant':/оскверн|profane/.test(x)?'profaneSoul':x;}

function ensureChoices(h){var s=st(h),l=lvl(h);s.hemocraftAbility=s.hemocraftAbility||'intelligence';s.crimsonRitesKnown=(s.crimsonRitesKnown||[]).filter(function(id){return !!riteTypes[id]&&id!=='dawn'&&(!/dead|oracle|roar/.test(id)||l>=14);}).slice(0,riteLimit(l));s.bloodCursesKnown=(s.bloodCursesKnown||[]).filter(function(id){return curses[id]&&!curses[id].req;}).slice(0,knownLimit(l));}
function sync(h){
 var l=lvl(h);if(!l||!D.isEnabled('blood-hunter'))return;observe(h);var s=st(h),o=orderKey(h);ensureChoices(h);h.hemocraftDie=die(l);s.hemocraftSaveDC=dc(h);
 res(h,'bloodMaledict',(l>=17?4:l>=13?3:l>=6?2:1)+(o==='ghostslayer'&&l>=3?1:0),'short');res(h,'brandCastigation',l>=6?1:0,'short');
 if(o==='ghostslayer')res(h,'aetherWalk',l>=15?2:l>=7?1:0,'short');
 if(o==='lycan'){res(h,'hybridTransformation',l>=11?2:l>=3?1:0,'short');s.bhUnlimitedHybrid=l>=18;}
 if(o==='mutant'&&l>=3){s.mutagenFormulasKnown=s.mutagenFormulasKnown||[];res(h,'mutagenConcoctions',l>=15?3:l>=7?2:1,'prepared');if(!s.bhPreparedMutagens)s.bhPreparedMutagens=[];h.resources.mutagenConcoctions.current=s.bhPreparedMutagens.length;res(h,'strangeMetabolism',l>=7?1:0,'long');res(h,'exaltedMutation',l>=18?Math.max(1,hemMod(h)):0,'long');}
 var verm=activeMutations(h).some(function(m){return m.id==='vermillion';});if(verm)res(h,'bloodMaledict',h.resources.bloodMaledict.max+1,'short');projectSpeed(h);
 if(o==='profaneSoul'&&l>=3){var table=spellTable(l);var old=h.pactMagicData,legacy=h.resources.profaneSoulSlots;if(!old&&legacy)h.pactMagicData={max:legacy.max,used:Math.max(0,num(legacy.max)-num(legacy.current)),slotLevel:table.slotLevel};if(global.DNDMagic)global.DNDMagic.rebuild(h);delete h.resources.profaneSoulSlots;s.profaneSoulSlotLevel=table.slotLevel;s.profaneSoulCantrips=table.cantrips;s.profaneSoulSpellsKnown=table.spells;}
 ['bhPactSlots','bhAetherWalk','bhHybridTransformation','bhExaltedMutation'].forEach(function(k){delete h.resources[k];});
}

function requireHp(h){var loss=bloodLoss(h),cur=hp(h);if(cur<=loss)return null;setHp(h,cur-loss);return loss;}
var curses={
anxious:{action:'bonus',effect:{skillAdvantage:'intimidation',durationRounds:1},amp:{nextWisSaveDisadvantage:true}},
binding:{action:'bonus',save:'str',effect:{speed:0,noReactions:true,durationRounds:1},amp:{durationRounds:10,repeatSave:'str'}},
bloatedAgony:{action:'bonus',effect:{strDexChecksDisadvantage:true,extraAttackDamage:'1d8 necrotic',durationRounds:1},amp:{durationRounds:10,repeatSave:'con'}},
corrosion:{action:'bonus',req:['mutant',15],effect:{condition:'poisoned',repeatSave:'con'},amp:{damage:'4d6 necrotic',repeatDamageOnFailedSave:true}},
exorcist:{action:'bonus',req:['ghostslayer',15],effect:{removeConditions:['charmed','frightened','possessed']},amp:{damage:'3d6 psychic',save:'wis',condition:'stunned'}},
exposure:{action:'reaction',effect:{removeResistance:true,triggerDamageTypes:true},amp:{removeImmunity:true,thenResistance:true}},
eyeless:{action:'reaction',effect:{subtractHemocraftDie:true,immuneIfBlindedImmune:true},amp:{allAttacksThisTurn:true}},
fallenPuppet:{action:'reaction',effect:{fallenAttack:true},amp:{moveHalfSpeed:true,attackBonus:'hemocraft'}},
howl:{action:'action',req:['lycan',18],effect:{aoeFt:30,save:'wis',condition:'frightened',stunIfFailedBy5:true},amp:{rangeFt:60}},
marked:{action:'bonus',effect:{nextRiteHitExtraDie:true,durationRounds:1},amp:{nextAttackAdvantage:true}},
muddledMind:{action:'bonus',effect:{nextConcentrationSaveDisadvantage:true,durationRounds:1},amp:{allConcentrationSavesDisadvantage:true}},
soulEater:{action:'reaction',req:['profaneSoul',18],effect:{triggerOnNearbyKill:true,advantageAllAttacks:true,resistanceAll:true,durationRounds:1},amp:{restorePactSlot:true,longRestLimit:true}}
};
var mutagens={
aether:{req:11,effect:{flyFt:20,durationHours:1},side:{strDexChecksDisadvantage:true}},
alluring:{effect:{charismaChecksAdvantage:true},side:{initiativeDisadvantage:true}},
celerity:{effect:{dexBonus:3,dexMaxBonus:3},scale:{11:4,18:5},side:{wisSavesDisadvantage:true}},
conversant:{effect:{intChecksAdvantage:true},side:{wisChecksDisadvantage:true}},
cruelty:{req:11,effect:{bonusActionWeaponAttack:true},side:{intWisChaSavesDisadvantage:true}},
deftness:{effect:{dexChecksAdvantage:true},side:{wisChecksDisadvantage:true}},
embers:{effect:{resistance:['fire'],vulnerability:['cold']}},
gelid:{effect:{resistance:['cold'],vulnerability:['fire']}},
impermeable:{effect:{resistance:['piercing'],vulnerability:['slashing']}},
mobility:{effect:{immunity:['grappled','restrained']},side:{strChecksDisadvantage:true},scale:{11:{immunity:['paralyzed']}}},
nighteye:{effect:{darkvisionFt:60,extendExistingDarkvisionFt:60},side:{sunlightAttackAndSightDisadvantage:true}},
percipient:{effect:{wisChecksAdvantage:true},side:{chaChecksDisadvantage:true}},
potency:{effect:{strBonus:3,strMaxBonus:3},scale:{11:4,18:5},side:{dexSavesDisadvantage:true}},
precision:{req:11,effect:{critRange:19},side:{strSavesDisadvantage:true}},
rapidity:{effect:{speedBonusFt:10},scale:{15:15},side:{intChecksDisadvantage:true}},
reconstruction:{req:7,effect:{regenPbWhenBloodied:true,durationHours:1},side:{speedPenaltyFt:10}},
sagacity:{effect:{intBonus:3,intMaxBonus:3},scale:{11:4,18:5},side:{chaSavesDisadvantage:true}},
shielded:{effect:{resistance:['slashing'],vulnerability:['bludgeoning']}},
unbreakable:{effect:{resistance:['bludgeoning'],vulnerability:['piercing']}},
vermillion:{effect:{extraBloodMaledictUse:true},side:{deathSaveDisadvantage:true}}
};
var patrons={
archfey:{focus:{noCoverOrInvisibility:true},revealed:'blur',unsealed:'slow'},celestial:{focus:{heal:'1d'+4,healMod:'hemocraft',cost:'bloodMaledict'},revealed:'lesser restoration',unsealed:'revivify'},
fathomless:{focus:{waterBreathing:true,slowFt:10},revealed:'gust of wind',unsealed:'lightning bolt'},fiend:{focus:{flameReroll12:true},revealed:'scorching ray',unsealed:'fireball'},
genie:{focus:{flyFt:30,cost:'bloodMaledict'},revealed:'phantasmal force',unsealed:'protection from energy'},greatOldOne:{focus:{critFearAoEFt:10},revealed:'detect thoughts',unsealed:'haste'},
hexblade:{focus:{curseBonusDamage:'proficiency'},revealed:'branding smite',unsealed:'blink'},undead:{focus:{halveNecroticReaction:true},revealed:'blindness/deafness',unsealed:'speak with dead'},
undying:{focus:{healOnKill:'hemocraftDie'},revealed:'silence',unsealed:'bestow curse'}
};
var actors=Object.create(null), effectSerial=0;
var riteTypes={flame:'fire',frozen:'cold',storm:'lightning',dead:'necrotic',oracle:'psychic',roar:'thunder',dawn:'radiant'};
var riteNames={flame:'Пламя',frozen:'Холод',storm:'Буря',dead:'Мёртвые',oracle:'Оракул',roar:'Рёв',dawn:'Рассвет'};
var curseNames={anxious:'Тревога',binding:'Связывание',bloatedAgony:'Распирающая боль',corrosion:'Коррозия',exorcist:'Экзорцист',exposure:'Обнажение',eyeless:'Безглазый',fallenPuppet:'Павшая марионетка',howl:'Вой',marked:'Метка',muddledMind:'Помутнённый разум',soulEater:'Пожиратель душ'};
function actorId(h){return String(h&&(h.id||h.entityId||h.characterId)||'');}
function observe(h){var id=actorId(h);if(id)actors[id]=h;return h;}
function enabled(h){return lvl(h)>0&&D.isEnabled('blood-hunter');}
function able(h){var c=Object.assign({},h&&h.conditions,h&&h.activeConditions);return hp(h)>0&&!h.defeated&&!['Недееспособен','Бессознателен','Оглушён','Парализован','Окаменел','incapacitated','unconscious','stunned','paralyzed','petrified'].some(function(k){return c[k];});}
function error(message){return {ok:false,reason:message};}
function actionReady(h,kind){return able(h)&&(!h.turnResources||!!(kind==='action'?(h.turnResources.actions!=null?h.turnResources.actions:h.turnResources.action):h.turnResources[kind==='bonus'?'bonusAction':'reaction']));}
function takeAction(h,kind){if(h.turnResources){h.turnResources[kind==='action'?'actions':kind==='bonus'?'bonusAction':'reaction']=false;if(kind==='action')h.turnResources.action=false;}}
function distance(h,t,ctx){var d=ctx&&ctx.distanceFt;if(d!=null&&Number.isFinite(Number(d)))return Number(d);var b=global.DNDBattleBoard;if(b&&b.findToken&&b.distanceFt){var a=b.findToken('bt_'+actorId(h))||b.findToken(actorId(h)),z=b.findToken('bt_'+actorId(t))||b.findToken(actorId(t));if(a&&z)return b.distanceFt(a,z);}return null;}
function inRange(h,t,ctx,range){var d=distance(h,t,ctx);return !!t&&actorId(t)&&d!==null&&d>=0&&d<=range&&ctx.visible!==false;}
function knownLimit(l){return l>=18?5:l>=14?4:l>=10?3:l>=6?2:l>=1?1:0;}
function riteLimit(l){return l>=14?3:l>=7?2:l>=2?1:0;}
function specialCurse(h,id){var o=orderKey(h),l=lvl(h);return id==='exorcist'&&o==='ghostslayer'&&l>=15||id==='corrosion'&&o==='mutant'&&l>=15||id==='howl'&&o==='lycan'&&l>=18||id==='soulEater'&&o==='profaneSoul'&&l>=18;}
function chooseKnown(h,kind,ctx){
 var s=st(h),l=lvl(h),isRite=kind==='rites',key=isRite?'crimsonRitesKnown':'bloodCursesKnown',cap=isRite?riteLimit(l):knownLimit(l),items=ctx[isRite?'rites':'curses'];
 if(!Array.isArray(items)||!items.length||items.length>cap||new Set(items).size!==items.length)return error('Выберите допустимое число разных изученных вариантов.');
 if(items.some(function(id){return isRite?!riteTypes[id]||id==='dawn'||(['dead','oracle','roar'].indexOf(id)>=0&&l<14):!curses[id]||!!curses[id].req;}))return error('Один из вариантов недоступен этому уровню.');
 var old=s[key]||[],removed=old.filter(function(x){return items.indexOf(x)<0;}),step=isRite?(l>=14?14:l>=7?7:2):(l>=18?18:l>=14?14:l>=10?10:l>=6?6:1),replaceKey=isRite?'bhRiteReplacementLevel':'bhCurseReplacementLevel';
 if(removed.length&&(removed.length>1||old.length<cap||step===1||step===2||num(s[replaceKey])>=step))return error('Замена одного изученного варианта доступна при получении нового варианта.');
 if(removed.length)s[replaceKey]=step;s[key]=items.slice();return {ok:true,choices:s[key].slice(),message:'Изученные варианты сохранены.'};
}
function weaponList(h){if(!h)return [];var a=[];[h.weaponsData,h.weapons,h.inventory,h.inventory&&h.inventory.weapons,h.equipment&&h.equipment.weapons].forEach(function(v){if(Array.isArray(v))a=a.concat(v);});return a.filter(function(w,i){return w&&typeof w==='object'&&a.findIndex(function(x){return weaponKey(x)===weaponKey(w);})===i;});}
function weaponKey(w){return String(w&&(w.id||w.weaponId||w.name)||'');}
function ownedWeapon(h,ctx){var k=String(ctx.weaponId||weaponKey(ctx.weapon)||'');if(k==='unarmed')return orderKey(h)==='lycan'&&st(h).hybridForm?{id:'unarmed',name:'Когти',damageDice:lvl(h)>=11?'1d8':'1d6',rangeFt:5}:null;return weaponList(h).find(function(w){return weaponKey(w)===k;})||null;}
function rites(h){var s=st(h);if(!Array.isArray(s.crimsonRites)){s.crimsonRites=[];if(s.crimsonRite&&s.crimsonRite.active&&s.crimsonRite.weaponId)s.crimsonRites.push(s.crimsonRite);else if(s.crimsonRite&&s.crimsonRite.active&&weaponList(h).length===1){s.crimsonRite.weaponId=weaponKey(weaponList(h)[0]);s.crimsonRites.push(s.crimsonRite);}}return s.crimsonRites;}
function activeRite(h,ctx){if(!ctx||!ctx.weaponAttack&&!ctx.weapon&&!ctx.unarmedAttack&&!ctx.unarmed)return null;var key=String(ctx.weaponId||weaponKey(ctx.weapon)||(ctx.unarmedAttack||ctx.unarmed?'unarmed':''));if(key==='unarmed'&&!st(h).hybridForm)return null;return rites(h).find(function(r){return r.active&&String(r.weaponId)===key;})||null;}
function hemRoll(h,ctx,commit){var a=bloodLoss(h),s=st(h);if(lvl(h)>=20&&ctx&&ctx.rerollHemocraft===true&&!s.bhHemocraftRerolled){var b=bloodLoss(h);if(commit!==false)s.bhHemocraftRerolled=true;return ctx.preferLowerHemocraft?Math.min(a,b):Math.max(a,b);}return a;}
function payBlood(h,amount){var B=global.DNDCombat;if(!B||!B.payHitPointCost)return false;return B.payHitPointCost(h,amount).ok;}
function effects(t){if(!t)return [];observe(t);return st(t).bloodHunterEffects||(st(t).bloodHunterEffects=[]);}
function conditionPresent(t,k){return !!(t.conditions&&t.conditions[k]||t.activeConditions&&t.activeConditions[k]);}
function removeEffect(t,e){var list=effects(t);st(t).bloodHunterEffects=list.filter(function(x){return x!==e;});if(e.condition&&!e.conditionWasPresent&&!effects(t).some(function(x){return x.condition===e.condition;})){global.DNDCombat.toggleCondition(t,e.condition,false);if(t.activeConditions)t.activeConditions[e.condition]=false;}if(e.id==='binding'&&!effects(t).some(function(x){return x.id==='binding';})&&st(t).bhBoundSpeed!=null){if(t.speed===0)t.speed=st(t).bhBoundSpeed;delete st(t).bhBoundSpeed;}}
function addEffect(h,t,id,ctx,extra){var old=effects(t).filter(function(e){return e.ownerId===actorId(h)&&e.id===id;});old.forEach(function(e){removeEffect(t,e);});var e=Object.assign({id:id,ownerId:actorId(h),dc:dc(h),amplified:!!ctx.amplify,serial:++effectSerial,createdAt:Date.now()},extra||{});effects(t).push(e);if(e.condition){e.conditionWasPresent=conditionPresent(t,e.condition);global.DNDCombat.toggleCondition(t,e.condition,true);}if(id==='binding'){if(st(t).bhBoundSpeed==null)st(t).bhBoundSpeed=num(t.speed,30);t.speed=0;if(t.turnResources){t.turnResources.movement=0;t.turnResources.reaction=0;}}return e;}
function curseSave(t,stat,saveDC,ctx){return global.DNDCombat.savingThrow(t,stat,saveDC,'normal',ctx||{});}
function curseDamage(h,t,formula,type){var r=global.DNDCombat.rollDice(formula);return global.DNDCombat.applyDamage(t,r.total,type,{source:'blood-hunter',attacker:h,magicalAttack:true});}
function useRite(h,ctx){
 sync(h);ctx=ctx||{};var s=st(h),type=String(ctx.riteType||'flame');type=({fire:'flame',cold:'frozen',lightning:'storm','огонь':'flame','холод':'frozen','молния':'storm','некротический':'dead','излучение':'dawn'})[type]||type;
 if(lvl(h)<2||!actionReady(h,'bonus'))return error('Обряд требует бонусного действия и 2 уровня.');
 if((s.crimsonRitesKnown||[]).indexOf(type)<0&&!(type==='dawn'&&orderKey(h)==='ghostslayer'&&lvl(h)>=3))return error('Этот обряд не изучен.');
 var w=ownedWeapon(h,ctx);if(!w||ctx.holdingWeapon===false)return error('Выберите своё оружие, которое держите в руке.');var key=weaponKey(w);
 if(rites(h).some(function(r){return r.active&&r.weaponId===key;}))return error('На этом оружии уже действует обряд.');
 var loss=hemRoll(h,ctx,false);if(hp(h)<=loss)return error('Недостаточно HP.');if(!payBlood(h,loss))return error('Невозможно оплатить обряд.');if(lvl(h)>=20&&ctx.rerollHemocraft)s.bhHemocraftRerolled=true;
 var r={active:true,type:type,weaponId:key};rites(h).push(r);s.crimsonRite=r;takeAction(h,'bonus');return {ok:true,lossHp:loss,weaponId:key,message:'Алый обряд: '+riteNames[type]+'. Потеряно '+loss+' HP.'};
}
function useCurse(h,ctx){
 sync(h);ctx=ctx||{};var id=String(ctx.curse||''),c=curses[id],t=target(ctx),s=st(h),B=global.DNDCombat;
 if(!c||!B)return error('Выберите кровавое проклятие.');
 if((s.bloodCursesKnown||[]).indexOf(id)<0&&!specialCurse(h,id))return error('Это проклятие не изучено или недоступно ордену.');
 if(c.req&&!specialCurse(h,id))return error('Не соблюдены требования ордена.');
 if(!actionReady(h,c.action)||!h.resources.bloodMaledict.current)return error('Нет доступного действия или использования проклятия.');
 var range=id==='howl'&&ctx.amplify?60:30;
 if(id!=='howl'&&!inRange(h,t,ctx,range))return error('Нужна видимая цель в пределах '+range+' футов.');
 if(t&&t.hasBlood===false&&!ctx.amplify&&!(orderKey(h)==='ghostslayer'&&lvl(h)>=3))return error('Цель без крови невосприимчива к неусиленному проклятию.');
 if(id==='binding'&&!ctx.amplify&&['huge','gargantuan','огромный','исполинский'].indexOf(String(t.size||'').toLowerCase())>=0)return error('Без усиления цель должна быть не крупнее Большого размера.');
 if(id==='muddledMind'&&!B.concentrationState(t).active)return error('Цель не поддерживает концентрацию.');
 if(id==='exorcist'&&!['Очарован','Испуган','possessed','Одержим'].some(function(k){return conditionPresent(t,k);})&&!t.possessed)return error('Цель не очарована, не испугана и не одержима.');
 if(id==='exorcist'&&ctx.amplify&&(!ctx.controller||!actorId(ctx.controller)))return error('Для усиления укажите существо, вызвавшее эффект.');
 if(id==='eyeless'&&(!ctx.attackResult||ctx.attackResult.completed||ctx.attackResult.damageResult||!Number.isFinite(Number(ctx.attackResult.total))))return error('Нужен бросок атаки до определения попадания.');
 if(id==='eyeless'&&(t.conditionImmunities||[]).some(function(k){return /blinded|ослеп/i.test(k);}))return error('Цель невосприимчива к слепоте.');
 if(id==='exposure'&&(!ctx.pendingDamage||!Array.isArray(ctx.damageTypes)||!ctx.damageTypes.length||ctx.damageTypes.some(function(x){return typeof x!=='string'||!x;})))return error('Нужен ещё не применённый урон атаки или заклинания с указанными типами.');
 if((id==='fallenPuppet'||id==='soulEater')&&(hp(t)!==0||ctx.justDroppedToZero!==true))return error('Нужен подтверждённый переход цели к 0 HP.');
 if(id==='soulEater'&&/construct|undead|конструкт|нежить/i.test(String(t.creatureType||t.typeName||'')))return error('Энергия нежити и конструктов не подходит.');
 if(id==='soulEater'&&ctx.amplify&&(s.bhSoulEaterAmplified||!h.pactMagicData||num(h.pactMagicData.used)<=0))return error('Усиление уже использовано или нет потраченной ячейки договора.');
 if(id==='fallenPuppet'&&num(ctx.moveFt)>0)return error('Перемещение марионетки должно быть разрешено картой до атаки.');var puppetWeapon=ownedWeapon(t,ctx),puppetTarget=ctx.attackTarget;
 if(id==='fallenPuppet'&&(!puppetWeapon||!/^\d+d(?:4|6|8|10|12)(?:[+-]\d+)?$/.test(String(puppetWeapon.damageDice||''))||!puppetTarget||!inRange(t,puppetTarget,{distanceFt:ctx.attackDistanceFt,visible:ctx.attackVisible!==false},num(puppetWeapon.rangeFt,5))||(ctx.moveFt!=null&&(!ctx.amplify||num(ctx.moveFt)<0||num(ctx.moveFt)>num(t.speed,30)/2))))return error('Для марионетки нужны оружие, цель в его дальности и допустимое перемещение.');
 var howlTargets=id==='howl'?ctx.targets:null;
 if(id==='howl'&&(!Array.isArray(howlTargets)||!howlTargets.length||howlTargets.some(function(x){return !x||!inRange(h,x.target,{distanceFt:x.distanceFt,visible:x.visible!==false},range);})))return error('Выберите слышащие вой цели в радиусе '+range+' футов.');
 if(id==='howl'&&howlTargets.some(function(x){return x.canHear===false;}))return error('Цель должна слышать вой.');
 var loss=ctx.amplify?hemRoll(h,ctx,false):0;if(ctx.amplify&&hp(h)<=loss)return error('Недостаточно HP для усиления.');
 if(ctx.amplify&&!payBlood(h,loss))return error('Невозможно оплатить усиление.');if(ctx.amplify&&lvl(h)>=20&&ctx.rerollHemocraft)s.bhHemocraftRerolled=true;spend(h,'bloodMaledict',1);takeAction(h,c.action);observe(h);if(t)observe(t);
 var out={ok:true,curse:id,amplified:!!ctx.amplify,lossHp:loss,applied:false,targetId:actorId(t),message:'Кровавое проклятие: '+curseNames[id]+'.'};
 if(id==='binding'){out.save=curseSave(t,'str',dc(h));if(!out.save.success){addEffect(h,t,id,ctx,ctx.amplify?{targetTurns:10,repeatSave:'str'}:{ownerTurns:2});out.applied=true;}}
 if(id==='anxious'||id==='bloatedAgony'||id==='marked'||id==='muddledMind'){addEffect(h,t,id,ctx,id==='bloatedAgony'&&ctx.amplify?{targetTurns:10,repeatSave:'con'}:{ownerTurns:id==='marked'?1:2});out.applied=true;}
 if(id==='corrosion'){addEffect(h,t,id,ctx,{repeatSave:'con',condition:'Отравлен'});out.applied=true;if(ctx.amplify)out.damage=curseDamage(h,t,'4d6','necrotic');}
 if(id==='exorcist'){['Очарован','Испуган','possessed','Одержим'].forEach(function(k){B.toggleCondition(t,k,false);if(t.activeConditions)t.activeConditions[k]=false;});t.possessed=false;out.applied=true;if(ctx.amplify){out.damage=curseDamage(h,ctx.controller,'3d6','psychic');out.save=curseSave(ctx.controller,'wis',dc(h));if(!out.save.success)addEffect(h,ctx.controller,'exorcistStun',ctx,{condition:'Оглушён',ownerTurns:2});}}
 if(id==='exposure'){addEffect(h,t,id,ctx,{targetTurns:1,damageTypes:ctx.damageTypes.map(normalizeDamageType)});out.applied=true;}
 if(id==='eyeless'){var deduction=hemRoll(h,ctx);ctx.attackResult.total-=deduction;ctx.attackResult.bloodCurseDeduction=deduction;out.deduction=deduction;out.applied=true;if(ctx.amplify)addEffect(h,t,id,ctx,{targetTurns:1});}
 if(id==='fallenPuppet'){out.attack=B.attack(t,puppetTarget,{weapon:puppetWeapon,damage:puppetWeapon.damageDice,damageType:puppetWeapon.damageType||'slashing',bonus:num(puppetWeapon.attackBonus),attackBonusAdjustment:ctx.amplify?Math.max(1,hemMod(h)):0,distanceFt:ctx.attackDistanceFt,bloodHunterPuppet:true});out.applied=true;if(ctx.amplify&&ctx.moveFt)out.movementRequiredFt=num(ctx.moveFt);}
 if(id==='howl'){out.results=howlTargets.map(function(x){var immunity=effects(x.target).some(function(e){return e.id==='howlImmunity'&&e.ownerId===actorId(h)&&e.expiresAt>Date.now();});if(immunity)return {targetId:actorId(x.target),immune:true};var sv=curseSave(x.target,'wis',dc(h));if(sv.success)addEffect(h,x.target,'howlImmunity',ctx,{expiresAt:Date.now()+86400000});else{addEffect(h,x.target,'howl',ctx,{condition:'Испуган',targetTurns:10,repeatSave:'wis'});if(conditionPresent(x.target,'Испуган')&&sv.total<=dc(h)-5)addEffect(h,x.target,'howlStun',ctx,{condition:'Оглушён',linkedHowl:true});}return {targetId:actorId(x.target),save:sv,applied:!sv.success};});out.applied=out.results.some(function(x){return x.applied;});}
 if(id==='soulEater'){addEffect(h,h,id,ctx,{ownerTurns:2});out.applied=true;if(ctx.amplify){h.pactMagicData.used--;if(h.pactMagic)h.pactMagic.used=h.pactMagicData.used;s.bhSoulEaterAmplified=true;}}
 s.lastBloodCurse=out;return out;
}
function normalizeDamageType(t){return ({'огонь':'fire','холод':'cold','молния':'lightning','некротический':'necrotic','психический':'psychic','силовой':'force','излучение':'radiant','дробящий':'bludgeoning','колющий':'piercing','рубящий':'slashing','яд':'poison','кислота':'acid','гром':'thunder'})[String(t).toLowerCase()]||String(t).toLowerCase();}
function damageModifiers(t,type,ctx){var k=normalizeDamageType(type),out={resistance:false,vulnerability:false,immunity:false,ignoreResistance:false,ignoreImmunity:false,immunityBecomesResistance:false},s=st(t);ctx=ctx||{};
 effects(t).forEach(function(e){if(e.id==='soulEater')out.resistance=true;if(e.id==='exposure'&&e.damageTypes.indexOf(k)>=0){out.ignoreResistance=!e.amplified;out.immunityBecomesResistance=e.amplified;}});
 if(enabled(t)){if(orderKey(t)==='lycan'&&s.hybridForm&&['bludgeoning','piercing','slashing'].indexOf(k)>=0&&!ctx.magicalAttack&&!ctx.silvered)out.resistance=true;if(orderKey(t)==='ghostslayer'&&k==='necrotic'&&rites(t).some(function(r){return r.active&&r.type==='dawn';}))out.resistance=true;if(orderKey(t)==='mutant'&&lvl(t)>=7&&k==='poison')out.immunity=true;}
 var md=mutationDamage(t,k);out.resistance=out.resistance||md.resistance;out.vulnerability=md.vulnerability;return out;
}
function cursedSaveModifiers(t,ctx){var out={advantage:false,disadvantage:false};effects(t).forEach(function(e){if(e.id==='anxious'&&e.amplified&&(ctx.stat==='wis'||ctx.saveType==='wis')){out.disadvantage=true;e.amplified=false;}if(e.id==='muddledMind'&&ctx.concentrationCheck===true&&(ctx.stat==='con'||ctx.saveType==='con')){out.disadvantage=true;if(!e.amplified)removeEffect(t,e);}});return out;}
function cursedCheckModifiers(t,ctx){var out={advantage:false,disadvantage:false};effects(t).forEach(function(e){if(e.id==='bloatedAgony'&&['str','dex'].indexOf(ctx.stat)>=0)out.disadvantage=true;});if(ctx.target&&ctx.skill==='intimidation'&&effects(ctx.target).some(function(e){return e.id==='anxious';}))out.advantage=true;return out;}
function cursedAttackPenalty(t){var e=effects(t).find(function(e){return e.id==='eyeless';});var owner=e&&actors[e.ownerId];return owner&&enabled(owner)?hemRoll(owner,{}):0;}
function endActorTurn(t){observe(t);Object.keys(actors).forEach(function(k){var a=actors[k];effects(a).slice().forEach(function(e){if(e.expiresAt&&e.expiresAt<=Date.now()){removeEffect(a,e);return;}if(e.ownerId===actorId(t)&&e.ownerTurns!=null){e.ownerTurns--;if(e.ownerTurns<=0)removeEffect(a,e);}if(a===t&&e.repeatSave){var sv=curseSave(t,e.repeatSave,e.dc);if(sv.success){removeEffect(t,e);if(e.id==='howl')effects(t).slice().filter(function(x){return x.ownerId===e.ownerId&&x.linkedHowl;}).forEach(function(x){removeEffect(t,x);});}else if(e.id==='corrosion'&&e.amplified&&actors[e.ownerId])curseDamage(actors[e.ownerId],t,'4d6','necrotic');}if(a===t&&e.targetTurns!=null){e.targetTurns--;if(e.targetTurns<=0){removeEffect(t,e);if(e.id==='howl')effects(t).slice().filter(function(x){return x.ownerId===e.ownerId&&x.linkedHowl;}).forEach(function(x){removeEffect(t,x);});}}});});}
function startActorTurn(t){observe(t);st(t).bhAttacksThisTurn=0;if(effects(t).some(function(e){return e.id==='binding';})&&t.turnResources){t.turnResources.movement=0;t.turnResources.reaction=0;}if(enabled(t))st(t).bhHemocraftRerolled=false;}
function afterActorAttack(t,ctx){if(!t||ctx.bloodHunterPuppet)return;var count=st(t).bhAttacksThisTurn=num(st(t).bhAttacksThisTurn)+1;if(count===2)effects(t).filter(function(e){return e.id==='bloatedAgony';}).slice(0,1).forEach(function(e){var owner=actors[e.ownerId];if(owner)curseDamage(owner,t,'1d8','necrotic');});}
function bloodHunterRest(h,type){if(type!=='short'&&type!=='long')return;var s=st(h);Object.keys(actors).forEach(function(k){var a=actors[k];effects(a).slice().filter(function(e){return e.id!=='howlImmunity'&&(a===h||e.ownerId===actorId(h));}).forEach(function(e){removeEffect(a,e);});});rites(h).forEach(function(r){r.active=false;});if(h.pactMagicData)h.pactMagicData.used=0;if(h.pactMagic)h.pactMagic.used=0;s.hybridForm=false;s.activeMutagens=[];s.bhPreparedMutagens=[];s.bhMayPrepareMutagens=true;delete s.bhIgnoreMutagenSide;delete s.bhAetherWalk;delete s.bhBloodlust;projectSpeed(h);sync(h);if(type==='long')s.bhSoulEaterAmplified=false;}

function useBrand(h,ctx){
 sync(h);ctx=ctx||{};var t=target(ctx),r=ctx.attackResult,ac=ctx.attackContext||ctx,s=st(h);
 if(lvl(h)<6||!able(h)||!t||!r||!r.hit||!r.damageResult||num(r.damageResult.damageTaken,r.damageResult.amount)<=0||!activeRite(h,ac))return error('Клеймо требует реального урона попадания своим оружием с активным обрядом.');
 if(!spend(h,'brandCastigation',1))return error('Клеймо уже использовано до отдыха.');
 if(s.brandTargetId&&actors[s.brandTargetId]&&st(actors[s.brandTargetId]).bloodHunterBrand&&st(actors[s.brandTargetId]).bloodHunterBrand.ownerId===actorId(h))delete st(actors[s.brandTargetId]).bloodHunterBrand;
 s.brandTargetId=actorId(t);s.brandTether=lvl(h)>=13;st(t).bloodHunterBrand={ownerId:actorId(h),hemMod:hemMod(h),dc:dc(h),level:lvl(h),order:orderKey(h)};observe(t);return {ok:true,targetId:actorId(t),message:'Клеймо наказания наложено.'};
}
function afterDamage(t,result,opts){var attacker=opts&&opts.attacker;if(!attacker||opts.source==='blood-hunter-brand'||num(result.damageTaken,result.amount)<=0)return;var b=st(attacker).bloodHunterBrand,owner=b&&actors[b.ownerId];if(!owner||!enabled(owner))return;var d=owner===t?0:distance(owner,t,{distanceFt:opts.brandAllyDistanceFt});if(d!==null&&d<=5&&opts.visible!==false)global.DNDCombat.applyDamage(attacker,b.level>=13?Math.max(2,2*b.hemMod):Math.max(1,b.hemMod),'psychic',{source:'blood-hunter-brand',magicalAttack:true});}
function onAttackResult(h,ctx){var r=ctx.attackResult,ac=ctx.attackContext||{};if(!enabled(h))return;var rite=activeRite(h,ac),s=st(h);if(lvl(h)>=20&&ctx.hit&&ctx.critical&&rite&&h.resources.bloodMaledict)h.resources.bloodMaledict.current=Math.min(h.resources.bloodMaledict.max,num(h.resources.bloodMaledict.current)+1);
 if(rite&&ctx.brandCastigation&&ctx.target)useBrand(h,{target:ctx.target,attackResult:r,attackContext:ac});
 if(ctx.attackContext&&(ctx.attackContext.unarmedAttack||ctx.attackContext.unarmed)&&ctx.attackContext.inAttackAction)s.bhUnarmedAttackThisTurn=true;
 if(ctx.target){var mark=effects(ctx.target).find(function(e){return e.id==='marked'&&e.ownerId===actorId(h)&&e.amplified;});if(mark)mark.amplified=false;}
}

function mutationLimit(l){return l>=18?8:l>=15?7:l>=11?6:l>=7?5:4;}
function activeMutations(h){var s=st(h);s.activeMutagens=(s.activeMutagens||[]).filter(function(m){return mutagens[m.id]&&(!m.expiresAt||m.expiresAt>Date.now());});return s.activeMutagens;}
function sideIgnored(h,id){var x=st(h).bhIgnoreMutagenSide;return !!(x&&x.id===id&&x.turns>0&&x.expiresAt>Date.now());}
function abilityBonuses(h){var out={str:0,dex:0,int:0};if(!enabled(h)||orderKey(h)!=='mutant')return out;activeMutations(h).forEach(function(m){var k=({potency:'str',celerity:'dex',sagacity:'int'})[m.id];if(k)out[k]=lvl(h)>=18?5:lvl(h)>=11?4:3;});return out;}
function mutationModifiers(h,ctx,save){var out={advantage:false,disadvantage:false},stat=String(ctx.stat||ctx.saveType||'').slice(0,3);if(!enabled(h)||orderKey(h)!=='mutant')return out;activeMutations(h).forEach(function(m){var good={alluring:'cha',conversant:'int',deftness:'dex',percipient:'wis'};if(!save&&good[m.id]===stat)out.advantage=true;if(sideIgnored(h,m.id))return;var bad=save?{celerity:'wis',potency:'dex',sagacity:'cha',precision:'str'}:{conversant:'wis',deftness:'wis',mobility:'str',percipient:'cha',rapidity:'int'};if(bad[m.id]===stat)out.disadvantage=true;if(m.id==='aether'&&!save&&['str','dex'].indexOf(stat)>=0)out.disadvantage=true;if(m.id==='cruelty'&&save&&['int','wis','cha'].indexOf(stat)>=0)out.disadvantage=true;if(m.id==='alluring'&&!save&&ctx.initiativeRoll)out.disadvantage=true;if(m.id==='nighteye'&&!save&&ctx.skill==='perception'&&ctx.sight&&ctx.directSunlight)out.disadvantage=true;if(m.id==='vermillion'&&save&&ctx.deathSave)out.disadvantage=true;});return out;}
function projectSpeed(h){if(!enabled(h))return;var s=st(h),bonus=lvl(h)>=10?5:0;if(orderKey(h)==='lycan'&&lvl(h)>=7)bonus+=10;activeMutations(h).forEach(function(m){if(m.id==='rapidity')bonus+=lvl(h)>=15?15:10;if(m.id==='reconstruction'&&!sideIgnored(h,m.id))bonus-=10;});var previous=num(s.bhAppliedSpeed),base=st(h).bhBoundSpeed!=null?num(st(h).bhBoundSpeed):num(h.speed,30);if(st(h).bhBoundSpeed!=null)st(h).bhBoundSpeed=Math.max(0,base-previous+bonus);else h.speed=Math.max(0,base-previous+bonus);s.bhAppliedSpeed=bonus;}
function heavyArmor(h){var a=h.inventory&&h.inventory.armor;return Array.isArray(a)&&a.some(function(x){return x&&x.equipped&&/heavy|тяжел/i.test(x.category||x.armorCategory||'');})||/heavy|тяжел/i.test(String(h.armorCategory||''));}
function incomingAC(h){if(!enabled(h))return 0;var bonus=st(h).hybridForm&&!heavyArmor(h)?1:0,dx=abilityBonuses(h).dex;if(dx&&!heavyArmor(h)){var raw=global.DNDRules.getStats(h,true),old=raw.dex,a=h.inventory&&h.inventory.armor,medium=Array.isArray(a)&&a.some(function(x){return x.equipped&&/medium|средн/i.test(x.category||x.armorCategory||'');}),before=Math.floor((old-10)/2),after=Math.floor((old+dx-10)/2);bonus+=(medium?Math.min(2,after)-Math.min(2,before):after-before);}return bonus;}
function conditionImmune(h,key){if(!enabled(h)||orderKey(h)!=='mutant')return false;if(lvl(h)>=7&&/poison|отрав/i.test(key))return true;return activeMutations(h).some(function(m){return m.id==='mobility'&&(/grapple|restrain|захвачен|опутан/i.test(key)||lvl(h)>=11&&/paraly|парализ/i.test(key));});}
function mutationDamage(h,k){var out={resistance:false,vulnerability:false};if(!enabled(h)||orderKey(h)!=='mutant')return out;var map={embers:['fire','cold'],gelid:['cold','fire'],impermeable:['piercing','slashing'],shielded:['slashing','bludgeoning'],unbreakable:['bludgeoning','piercing']};activeMutations(h).forEach(function(m){var a=map[m.id];if(a&&a[0]===k)out.resistance=true;if(a&&a[1]===k&&!sideIgnored(h,m.id))out.vulnerability=true;});return out;}
function useMutant(h,id,ctx){
 sync(h);ctx=ctx||{};var s=st(h),l=lvl(h),known=s.mutagenFormulasKnown||[];
 if(id==='chooseMutagenFormulas'){var list=ctx.formulas;if(!Array.isArray(list)||!list.length||list.length>mutationLimit(l)||new Set(list).size!==list.length||list.some(function(k){return !mutagens[k]||l<num(mutagens[k].req,3);}))return error('Выберите доступные разные формулы мутагенов.');var removed=known.filter(function(k){return list.indexOf(k)<0;}),step=l>=18?18:l>=15?15:l>=11?11:l>=7?7:3;if(removed.length&&(removed.length>1||known.length<mutationLimit(l)||step===3||num(s.bhFormulaReplacementLevel)>=step))return error('Заменять одну формулу можно при изучении новой формулы.');if(removed.length)s.bhFormulaReplacementLevel=step;s.mutagenFormulasKnown=list.slice();return {ok:true,message:'Формулы мутагенов сохранены.'};}
 if(id==='prepareMutagens'){var formulas=ctx.mutagens;if(s.bhMayPrepareMutagens===false||!Array.isArray(formulas)||!formulas.length||formulas.length>h.resources.mutagenConcoctions.max||formulas.some(function(k){return known.indexOf(k)<0||!mutagens[k]||l<num(mutagens[k].req,3);}))return error('После отдыха приготовьте доступные изученные мутагены.');s.bhPreparedMutagens=formulas.slice();s.bhMayPrepareMutagens=false;h.resources.mutagenConcoctions.current=formulas.length;return {ok:true,message:'Мутагены приготовлены.'};}
 if(id==='flushMutagens'){if(!actionReady(h,'action'))return error('Требуется действие.');s.activeMutagens=[];delete s.bhIgnoreMutagenSide;takeAction(h,'action');projectSpeed(h);return {ok:true,message:'Все мутагены выведены из организма.'};}
 if(id==='strangeMetabolism'){var active=activeMutations(h);if(!actionReady(h,'bonus')||!active.some(function(m){return m.id===ctx.mutagen;})||!h.resources.strangeMetabolism.current)return error('Выберите действующий мутаген; нужно бонусное действие и доступное использование.');spend(h,'strangeMetabolism',1);takeAction(h,'bonus');s.bhIgnoreMutagenSide={id:ctx.mutagen,turns:10,expiresAt:Date.now()+60000};projectSpeed(h);return {ok:true,message:'Побочный эффект выбранного мутагена подавлен на минуту.'};}
 if(id==='mutagencraft'||id==='consumeMutagen'||id==='exaltedMutation'){
  var k=String(ctx.mutagen||''),d=mutagens[k],active=activeMutations(h),prepared=s.bhPreparedMutagens||[],at=prepared.indexOf(k),replace=active.findIndex(function(m){return m.id===ctx.replaceMutagen;});
  if(!actionReady(h,'bonus')||!d||known.indexOf(k)<0||l<num(d.req,3)||active.some(function(m){return m.id===k;}))return error('Требуется бонусное действие и изученный неактивный мутаген.');
  if(id==='exaltedMutation'){if(l<18||replace<0||!h.resources.exaltedMutation.current)return error('Выберите активный мутаген для замены; требуется 18 уровень.');spend(h,'exaltedMutation',1);active.splice(replace,1);}else{if(at<0||!h.resources.mutagenConcoctions.current)return error('Этот мутаген не приготовлен.');prepared.splice(at,1);spend(h,'mutagenConcoctions',1);}
  var entry={id:k};if(k==='aether'||k==='reconstruction')entry.expiresAt=Date.now()+3600000;active.push(entry);s.activeMutagens=active;takeAction(h,'bonus');projectSpeed(h);return {ok:true,mutagen:k,message:'Мутаген принят: '+mutagenNames[k]+'.'};
 }
 if(id==='brandOfAxiom')return {ok:true,passive:true,message:'Клеймо раскрывает истинную форму; применяется при наложении клейма.'};
 return {ok:false,unsupported:true,reason:'Действие мутанта ещё не реализовано.'};
}
function useLycan(h,id,ctx){
 sync(h);ctx=ctx||{};var s=st(h),l=lvl(h);
 if(id==='hybridTransformation'){if(!actionReady(h,'bonus'))return error('Требуется бонусное действие.');if(s.hybridForm){s.hybridForm=false;takeAction(h,'bonus');return {ok:true,message:'Гибридная форма снята.'};}if(!s.bhUnlimitedHybrid&&!spend(h,'hybridTransformation',1))return error('Нет использования превращения.');s.hybridForm=true;s.bhHybridExpiresAt=l>=18?null:Date.now()+3600000;takeAction(h,'bonus');return {ok:true,message:'Гибридная форма активна.'};}
 if(id==='predatoryStrike'){if(!s.hybridForm||!actionReady(h,'bonus')||!s.bhUnarmedAttackThisTurn||!inRange(h,ctx.target,ctx,5))return error('После безоружной атаки действием нужна цель в 5 футах и бонусное действие.');takeAction(h,'bonus');var w={id:'unarmed',name:'Когти',damageDice:l>=11?'1d8':'1d6',damageType:ctx.damageType==='slashing'?'slashing':'bludgeoning',stat:ctx.stat==='dex'?'dex':'str',rangeFt:5};return {ok:true,attack:global.DNDCombat.attack(h,ctx.target,{weapon:w,unarmedAttack:true,damageType:w.damageType,distanceFt:ctx.distanceFt}),message:'Хищный удар выполнен.'};}
 if(['heightenedSenses','stalkersProwess','advancedTransformation','brandOfVoracious','hybridTransformationMastery'].indexOf(id)>=0)return {ok:true,passive:true,message:'Пассивная способность учитывается в расчётах и начале хода.'};
 return {ok:false,unsupported:true,reason:'Действие ликантропа ещё не реализовано.'};
}
function reviveRite(h,ctx){if(!enabled(h)||orderKey(h)!=='ghostslayer'||lvl(h)<18||hp(h)!==0||ctx.instantDeath||!rites(h).some(function(r){return r.active;}))return error('Возрождение требует 0 HP, активного обряда и отсутствия мгновенной смерти.');rites(h).forEach(function(r){r.active=false;});setHp(h,1);h.defeated=false;global.DNDCombat.resetDeathSaves(h);['Бессознателен','unconscious'].forEach(function(k){global.DNDCombat.toggleCondition(h,k,false);if(h.activeConditions)h.activeConditions[k]=false;});return {ok:true,message:'Все обряды завершены: персонаж остаётся на 1 HP.'};}
function useGhost(h,id,ctx){
 var s=st(h);ctx=ctx||{};
 if(id==='riteOfTheDawn')return useRite(h,Object.assign({},ctx,{riteType:'dawn'}));
 if(id==='riteRevival')return reviveRite(h,ctx);
 if(id==='aetherWalk'){if(!able(h)||ctx.atStartOfTurn!==true||s.bhAetherWalk||!h.resources.aetherWalk.current)return error('Эфирная поступь доступна в начале хода.');spend(h,'aetherWalk',1);s.bhAetherWalk={turns:Math.max(1,hemMod(h))};return {ok:true,message:'Эфирная поступь активна.'};}
 if(id==='curseSpecialist'||id==='brandOfSundering')return {ok:true,passive:true,message:'Пассивная способность учитывается в проклятиях и уроне обряда.'};
 return {ok:false,unsupported:true,reason:'Действие призрачного убийцы ещё не реализовано.'};
}
function turnStart(h){
 sync(h);var s=st(h),l=lvl(h);s.bhUnarmedAttackThisTurn=false;projectSpeed(h);if(s.hybridForm&&(hp(h)<=0||s.bhHybridExpiresAt&&s.bhHybridExpiresAt<=Date.now()))s.hybridForm=false;
 if(orderKey(h)==='lycan'&&l>=11&&hp(h)>0&&hp(h)<num(h.hpMax,h.maxHp)/2)global.DNDCombat.heal(h,Math.max(1,1+mod(h,'constitution')));
 if(orderKey(h)==='mutant'&&activeMutations(h).some(function(m){return m.id==='reconstruction';})&&hp(h)>0&&hp(h)<num(h.hpMax,h.maxHp)/2)global.DNDCombat.heal(h,num(h.proficiencyBonus,2));
 if(s.hybridForm&&hp(h)>0&&hp(h)<num(h.hpMax,h.maxHp)/2){var automatic=global.DNDCombat.concentrationState(h).active||s.raging,sv=automatic?{success:false,autoFailed:true}:global.DNDCombat.savingThrow(h,'wis',8,l>=15?'advantage':'normal');s.bhBloodlust={save:sv,requiresNearestAttack:!sv.success};}
 else delete s.bhBloodlust;
}
function turnEnd(h){var s=st(h);if(s.bhIgnoreMutagenSide){s.bhIgnoreMutagenSide.turns--;if(s.bhIgnoreMutagenSide.turns<=0)delete s.bhIgnoreMutagenSide;}if(s.bhAetherWalk){if(h.insideObject===true)curseDamage(h,h,'1d10','force');s.bhAetherWalk.turns--;if(s.bhAetherWalk.turns<=0){if(h.insideObject===true)s.bhAetherShuntRequired=true;delete s.bhAetherWalk;}}projectSpeed(h);}

function spellTable(l){if(l<3)return{cantrips:0,spells:0,slots:0,slotLevel:0};return{cantrips:l>=10?3:2,spells:l>=20?11:l>=19?10:l>=17?9:l>=15?8:l>=13?7:l>=11?6:l>=9?5:l>=7?4:l>=5?3:2,slots:l>=6?2:1,slotLevel:l>=19?4:l>=13?3:l>=7?2:1};}
function useProfane(h,id,ctx){
 sync(h);var s=st(h),p=String(s.profanePatron||'fiend'),pt=patrons[p]||patrons.fiend,l=lvl(h);
 if(id==='choosePatron'){if(!patrons[String(ctx&&ctx.patron)])return{ok:false,reason:'Неизвестный покровитель.'};s.profanePatron=String(ctx.patron);return{ok:true,patron:s.profanePatron};}
 if(id==='castPactSpell'||id==='pactMagic')return {ok:false,unsupported:true,reason:'Заклинание должно выполняться через проверяемый боевой resolver магии.'};
 if(id==='riteFocus')return{ok:true,effect:pt.focus};
 if(id==='mysticFrenzy')return{ok:true,effect:{cantripPlusWeaponAttack:true}};
 if(id==='revealedArcana')return{ok:true,effect:{spell:pt.revealed,freeUseAfterCasting:true,recharge:'long'}};
 if(id==='brandSappingScar')return{ok:true,effect:{brandedDisadvantageOnSavesVsPactSpells:true}};
 if(id==='unsealedArcana')return{ok:true,effect:{spell:pt.unsealed,freeUse:true,recharge:'long'}};
 if(id==='soulEater')return useCurse(h,{curse:'soulEater',target:target(ctx),amplify:ctx&&ctx.amplify});
 return{ok:false,unsupported:true};
}
function useFeature(h,id,ctx,feature){
 ctx=ctx||{};if(!enabled(h))return error('Класс недоступен.');sync(h);var known=D.getFeature&&D.getFeature(id,'blood-hunter');if(known&&(!D.resolveFeature||!D.resolveFeature(h,id,CLASS)))return{ok:false,unavailable:true,reason:'Способность недоступна текущему уровню или ордену.'};
 if(id==='chooseBloodCurses')return chooseKnown(h,'curses',ctx);
 if(id==='chooseCrimsonRites')return chooseKnown(h,'rites',ctx);
 if(id==='chooseBloodOrder'){var sc=subclasses.find(function(x){return x.id===ctx.order||x.name===ctx.order;});if(lvl(h)<3||!sc||sub(h)&&orderKey(h)!==sc.id)return error('Орден выбирается с 3 уровня и не меняется произвольно.');h.classes.find(function(x){return ['Кровавый охотник','Blood Hunter','BloodHunter'].indexOf(x.name)>=0;}).subclass=sc.id;sync(h);return {ok:true,order:sc.id};}
 if(id==='setHemocraftAbility'){var a=String(ctx.ability||'intelligence');if(['intelligence','wisdom'].indexOf(a)<0)return{ok:false,reason:'Только Intelligence или Wisdom.'};st(h).hemocraftAbility=a;(h.spellcastingSources||[]).forEach(function(x){if(['Кровавый охотник','Blood Hunter','BloodHunter'].indexOf(x.className)>=0)x.ability=a.slice(0,3);});(h.spellsData||[]).forEach(function(x){if(['Кровавый охотник','Blood Hunter','BloodHunter'].indexOf(x.castingClass)>=0)x.castingStat=a.slice(0,3);});sync(h);return{ok:true,ability:a,saveDC:dc(h)};}
 if(id==='crimsonRite')return useRite(h,ctx);
 if(id==='bloodMaledict')return useCurse(h,ctx);
 if(id==='brandOfCastigation')return useBrand(h,ctx,false);
 if(id==='brandOfTethering')return {ok:true,passive:true,message:'Клеймо наказания усилено; эффект применяется при наложении клейма.'};
 if(id==='bloodCurseOfCorrosion'||id==='bloodCurseOfTheExorcist'||id==='bloodCurseOfHowl'||id==='soulEater')return useCurse(h,Object.assign({},ctx,{curse:({bloodCurseOfCorrosion:'corrosion',bloodCurseOfTheExorcist:'exorcist',bloodCurseOfHowl:'howl',soulEater:'soulEater'})[id]}));
 var o=orderKey(h);if(o==='ghostslayer'){var x=useGhost(h,id,ctx);if(x.ok||x.unsupported===false)return x;}
 if(o==='lycan'){var y=useLycan(h,id,ctx);if(y.ok||y.unsupported===false)return y;}
 if(o==='mutant'){var z=useMutant(h,id,ctx);if(z.ok||z.unsupported===false)return z;}
 if(o==='profaneSoul'){var pr=useProfane(h,id,ctx);if(!pr.unsupported)return pr;}
 if(id==='sanguineMastery')return{ok:true,effect:{hemocraftRerollOncePerTurn:true,restoreBloodMaledictOnRiteCrit:true}};
 if(id==='huntersBane')return{ok:true,effect:{advantageTrackFeyFiendsUndead:true,advantageRecallFeyFiendsUndead:true,saveDC:dc(h)}};
 if(id==='darkAugmentation')return{ok:true,effect:{speedBonusFt:5,saveBonus:{str:Math.max(1,hemMod(h)),dex:Math.max(1,hemMod(h)),con:Math.max(1,hemMod(h))}}};
 if(id==='hardenedSoul')return{ok:true,effect:{advantageSaves:['charmed','frightened']}};
 if(id==='grimPsychometry')return{ok:true,effect:{historyAdvantageOnSinisterObjectOrPlace:true}};
 if(id==='extraAttack')return{ok:true,effect:{extraAttack:true}};
 if(id==='fightingStyle'){var style=String(ctx.style||'');if(['Стрельба','Дуэлянт','Сражение большим оружием','Сражение двумя оружиями','Archery','Dueling','Great Weapon Fighting','Two-Weapon Fighting'].indexOf(style)<0)return{ok:false,reason:'Выберите боевой стиль.'};style=({'Archery':'Стрельба','Dueling':'Дуэлянт','Great Weapon Fighting':'Сражение большим оружием','Two-Weapon Fighting':'Сражение двумя оружиями'})[style]||style;if(st(h).bhFightingStyle&&st(h).bhFightingStyle!==style)return error('Боевой стиль уже выбран.');st(h).bhFightingStyle=style;st(h).fightingStyle=style;return{ok:true,message:'Боевой стиль: '+style};}
 return{ok:false,unsupported:true,message:'Эта способность пока не имеет отдельного действия.'};
}
function attackModifiers(h,ctx){
 sync(h);ctx=ctx||{};var s=st(h),style=s.bhFightingStyle||s.fightingStyle,l=lvl(h),o={bonusDamage:0,extraDice:[],typedExtraDice:[],advantage:false,disadvantage:false,notes:[],bonusAttack:0,extraAttacks:l>=5?2:1},r=activeRite(h,ctx);
 if(r){var count=1,t=ctx.target;if(r.type==='dawn'&&t&&/undead|нежить/i.test(t.creatureType||t.typeName||''))count++;if(t&&effects(t).some(function(e){return e.id==='marked'&&e.ownerId===actorId(h);}))count++;if(orderKey(h)==='ghostslayer'&&l>=11&&t&&st(t).bloodHunterBrand&&st(t).bloodHunterBrand.ownerId===actorId(h))count++;o.typedExtraDice.push({dice:count+'d'+dieSides(l),type:riteTypes[r.type],label:'Алый обряд',magicalAttack:true});o.magicalAttack=true;}
 if(ctx.target&&effects(ctx.target).some(function(e){return e.id==='marked'&&e.ownerId===actorId(h)&&e.amplified;}))o.advantage=true;
 if(effects(h).some(function(e){return e.id==='soulEater';}))o.advantage=true;
 if(orderKey(h)==='mutant'){if(activeMutations(h).some(function(m){return m.id==='precision';}))o.criticalRange=19;if(activeMutations(h).some(function(m){return m.id==='nighteye';})&&ctx.directSunlight)o.disadvantage=true;}
 if(s.hybridForm){if(ctx.meleeOrThrown)o.bonusDamage+=l>=18?3:l>=11?2:1;if(ctx.unarmed||ctx.unarmedAttack){o.unarmedDie=l>=11?'1d8':'1d6';if(l>=7)o.bonusAttack+=l>=18?3:l>=11?2:1;}}
 if((style==='Стрельба'||style==='Archery')&&ctx.weaponAttack&&(ctx.rangedAttack||ctx.attackKind==='ranged'||ctx.weapon&&num(ctx.weapon.rangeFt)>5))o.bonusAttack+=2;
 if((style==='Дуэлянт'||style==='Dueling')&&ctx.weaponAttack&&ctx.duelingEligible)o.bonusDamage+=2;
 if(style==='Сражение двумя оружиями'&&ctx.weaponAttack&&ctx.offHand&&ctx.abilityModifierOmitted)o.bonusDamage+=mod(h,ctx.stat==='dex'?'dexterity':'strength');
 if(orderKey(h)==='lycan'&&s.hybridForm&&s.brandTargetId&&ctx.target&&s.brandTargetId===actorId(ctx.target)&&l>=15)o.advantage=true;
 return o;
}

function saveModifiers(h,ctx){sync(h);ctx=ctx||{};var s=st(h),o={bonus:0,advantage:false,disadvantage:false,notes:[]},l=lvl(h),stat=String(ctx.stat||ctx.saveType||'').slice(0,3);if(['str','dex','con'].indexOf(stat)>=0&&l>=10)o.bonus+=Math.max(1,hemMod(h));if(s.hybridForm&&stat==='str')o.advantage=true;var mm=mutationModifiers(h,ctx,true);o.advantage=o.advantage||mm.advantage;o.disadvantage=mm.disadvantage;
 if(l>=14&&(ctx.charmEffect||ctx.frightenedEffect||['charmed','frightened'].indexOf(ctx.saveType)>=0))o.advantage=true;return o;}

function skillModifiers(h,ctx){ctx=ctx||{};var o={advantage:false,disadvantage:false,notes:[]};if(ctx.creatureType&&['fey','fiend','undead'].indexOf(ctx.creatureType)>=0&&(ctx.skill==='survival'&&ctx.tracking||ctx.stat==='int'&&ctx.recallCreature))o.advantage=true;if(lvl(h)>=9&&ctx.skill==='history'&&ctx.sinister)o.advantage=true;if(orderKey(h)==='lycan'&&lvl(h)>=3&&ctx.skill==='perception'&&(ctx.hearing||ctx.smell))o.advantage=true;if(st(h).hybridForm&&ctx.stat==='str')o.advantage=true;var mm=mutationModifiers(h,ctx,false);o.advantage=o.advantage||mm.advantage;o.disadvantage=mm.disadvantage;return o;}

var mutagenNames={aether:'Эфир',alluring:'Обаяние',celerity:'Проворство',conversant:'Осведомлённость',cruelty:'Жестокость',deftness:'Ловкость рук',embers:'Угли',gelid:'Лёд',impermeable:'Непроницаемость',mobility:'Подвижность',nighteye:'Ночной глаз',percipient:'Проницательность',potency:'Мощь',precision:'Точность',rapidity:'Быстрота',reconstruction:'Восстановление',sagacity:'Мудрёность',shielded:'Защищённость',unbreakable:'Несокрушимость',vermillion:'Киноварь'};
function escUI(v){return String(v).replace(/[&<>"']/g,function(c){return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c];});}
function gameActors(){var h=global.currentChar||global.currentCharacter,all=[];if(h)all.push(h);if(h&&h.initiativeTracker)all=all.concat(h.initiativeTracker.combatants||[]);if(Array.isArray(global.characters))all=all.concat(global.characters);all.forEach(observe);return Object.keys(actors).map(function(k){return actors[k];});}
function selectUI(title,list,label,many){if(!list.length){global.alert('Нет доступных вариантов.');return null;}var raw=global.prompt(title+'\n'+list.map(function(x,i){return (i+1)+'. '+label(x);}).join('\n')+(many?'\nВведите номера через запятую.':''),'');if(raw===null)return null;var parts=raw.split(/[,;\s]+/).filter(Boolean);if(!parts.length||!many&&parts.length!==1||parts.some(function(x){return !/^\d+$/.test(x)||!list[Number(x)-1];})){global.alert('Укажите номера из списка.');return null;}return parts.map(function(x){return list[Number(x)-1];});}
function renderControls(h){if(!enabled(h))return '';sync(h);var s=st(h),buttons=[['chooseBloodCurses','Изученные проклятия'],['setHemocraftAbility','Гемокрафт']];if(lvl(h)>=2)buttons=buttons.concat([['chooseCrimsonRites','Изученные обряды'],['fightingStyle','Боевой стиль'],['crimsonRite','Активировать обряд']]);if(lvl(h)>=3)buttons.push(['chooseBloodOrder','Орден']);buttons.push(['bloodMaledict','Наложить проклятие']);if(orderKey(h)==='lycan'&&lvl(h)>=3)buttons.push(['hybridTransformation','Гибридная форма'],['predatoryStrike','Хищный удар']);if(orderKey(h)==='mutant'&&lvl(h)>=3){buttons.push(['chooseMutagenFormulas','Формулы'],['prepareMutagens','Приготовить мутагены'],['mutagencraft','Принять мутаген'],['flushMutagens','Вывести мутагены']);if(lvl(h)>=7)buttons.push(['strangeMetabolism','Подавить побочный эффект']);if(lvl(h)>=18)buttons.push(['exaltedMutation','Заменить активный мутаген']);}
 var r=h.resources.bloodMaledict,summary='Проклятия: '+(s.bloodCursesKnown.map(function(k){return curseNames[k];}).join(', ')||'не выбраны')+' · '+r.current+'/'+r.max;var riteText=rites(h).filter(function(r){return r.active;}).map(function(r){return riteNames[r.type]+' — '+r.weaponId;}).join(', ');
 return '<div class="weapon-card"><strong>Кровавый охотник — выборы и действия</strong><p>'+escUI(summary)+'</p>'+(riteText?'<p>Активные обряды: '+escUI(riteText)+'</p>':'')+'<div style="display:flex;gap:6px;flex-wrap:wrap">'+buttons.map(function(b){return '<button class="btn-action" onclick="useBloodHunterFeature(\''+b[0]+'\')">'+escUI(b[1])+'</button>';}).join('')+'</div></div>';
}
global.useBloodHunterFeature=function(id){
 var h=global.currentChar||global.currentCharacter;if(!h||!enabled(h))return;sync(h);var s=st(h),ctx={className:CLASS},picked,t;
 if(id==='chooseBloodCurses'){picked=selectUI('Изученные проклятия: до '+knownLimit(lvl(h)),Object.keys(curses).filter(function(k){return !curses[k].req;}),function(k){return curseNames[k];},true);if(!picked)return;ctx.curses=picked;}
 else if(id==='chooseCrimsonRites'){picked=selectUI('Изученные обряды: до '+riteLimit(lvl(h)),Object.keys(riteTypes).filter(function(k){return k!=='dawn'&&(lvl(h)>=14||['flame','frozen','storm'].indexOf(k)>=0);}),function(k){return riteNames[k];},true);if(!picked)return;ctx.rites=picked;}
 else if(id==='setHemocraftAbility'){picked=selectUI('Характеристика гемокрафта',['intelligence','wisdom'],function(k){return k==='wisdom'?'Мудрость (вариант с разрешения мастера)':'Интеллект';});if(!picked)return;ctx.ability=picked[0];}
 else if(id==='chooseBloodOrder'){picked=selectUI('Орден кровавого охотника',subclasses,function(sc){return sc.name;});if(!picked)return;ctx.order=picked[0].id;}
 else if(id==='fightingStyle'){picked=selectUI('Боевой стиль',['Стрельба','Дуэлянт','Сражение большим оружием','Сражение двумя оружиями'],function(k){return k;});if(!picked)return;ctx.style=picked[0];}
 else if(id==='crimsonRite'){var ws=weaponList(h).slice();if(s.hybridForm&&orderKey(h)==='lycan')ws.push({id:'unarmed',name:'Когти'});picked=selectUI('Оружие в руке',ws,function(w){return w.name||weaponKey(w);});if(!picked)return;ctx.weaponId=weaponKey(picked[0]);var rs=s.crimsonRitesKnown.slice();if(orderKey(h)==='ghostslayer'&&lvl(h)>=3)rs.push('dawn');picked=selectUI('Обряд (цена: кость гемокрафта в HP)',rs,function(k){return riteNames[k];});if(!picked)return;ctx.riteType=picked[0];}
 else if(id==='chooseMutagenFormulas'){picked=selectUI('Изученные формулы: до '+mutationLimit(lvl(h)),Object.keys(mutagens).filter(function(k){return lvl(h)>=num(mutagens[k].req,3);}),function(k){return mutagenNames[k];},true);if(!picked)return;ctx.formulas=picked;}
 else if(id==='prepareMutagens'){picked=selectUI('Приготовление после отдыха: до '+h.resources.mutagenConcoctions.max,s.mutagenFormulasKnown,function(k){return mutagenNames[k];},true);if(!picked)return;ctx.mutagens=picked;}
 else if(id==='mutagencraft'||id==='strangeMetabolism'||id==='exaltedMutation'){var choices=id==='strangeMetabolism'?activeMutations(h).map(function(m){return m.id;}):id==='exaltedMutation'?s.mutagenFormulasKnown:(s.bhPreparedMutagens||[]);picked=selectUI('Выберите мутаген',choices,function(k){return mutagenNames[k];});if(!picked)return;ctx.mutagen=picked[0];if(id==='exaltedMutation'){picked=selectUI('Какой активный мутаген заменить?',activeMutations(h).map(function(m){return m.id;}),function(k){return mutagenNames[k];});if(!picked)return;ctx.replaceMutagen=picked[0];}}
 else if(id==='bloodMaledict'||id==='predatoryStrike'){
  if(id==='bloodMaledict'){var cs=s.bloodCursesKnown.concat(Object.keys(curses).filter(function(k){return specialCurse(h,k);}));picked=selectUI('Кровавое проклятие',cs,function(k){return curseNames[k]+' ('+(curses[k].action==='reaction'?'реакция':curses[k].action==='action'?'действие':'бонусное действие')+')';});if(!picked)return;ctx.curse=picked[0];if(curses[ctx.curse].action==='reaction'||ctx.curse==='howl'){global.alert('Это проклятие требует выбора боевого триггера или нескольких целей в бою.');return;}ctx.amplify=global.confirm('Усилить проклятие за HP, равные кости гемокрафта?');}
  picked=selectUI('Выберите реальную цель боя',gameActors().filter(function(a){return a!==h;}),function(a){return a.name||actorId(a);});if(!picked)return;t=ctx.target=picked[0];var d=distance(h,t,{});if(d===null){var raw=global.prompt('Расстояние до цели в футах (по решению мастера)','');if(raw===null)return;d=Number(raw);if(raw.trim()===''||!Number.isFinite(d)||d<0){global.alert('Укажите действительное расстояние.');return;}}ctx.distanceFt=d;
  if(ctx.curse==='exorcist'&&ctx.amplify){picked=selectUI('Кто вызвал очарование, страх или одержимость?',gameActors(),function(a){return a.name||actorId(a);});if(!picked)return;ctx.controller=picked[0];}
 }
 var result=global.DNDClassFeatures.useFeature(h,id,ctx);if(!result.ok){global.alert(result.reason||'Способность недоступна.');return;}if(typeof global.autoSaveCurrentCharacter==='function')global.autoSaveCurrentCharacter();if(typeof global.renderClassFeatures==='function')global.renderClassFeatures();if(typeof global.renderCombatAbilities==='function')global.renderCombatAbilities();if(typeof global.dndRenderCombat==='function')global.dndRenderCombat();global.alert(result.message||'Действие выполнено.');
};


function onDamage(h){if(hp(h)<=0)st(h).hybridForm=false;}
function onCondition(h,ctx){if(ctx.active&&['Бессознателен','unconscious'].indexOf(ctx.condition)>=0)st(h).hybridForm=false;}
function adjustWeaponDamage(h,damage,ctx){if(!enabled(h)||!damage||!damage.rolls||!ctx.weaponAttack||!ctx.twoHanded||(st(h).bhFightingStyle||st(h).fightingStyle)!=='Сражение большим оружием')return damage;var groups=global.DNDRules.parseDice(damage.expression).groups,idx=0;groups.forEach(function(group){for(var i=0;i<group.count*(damage.critical?2:1);i++,idx++){if(damage.rolls[idx]===1||damage.rolls[idx]===2){var v=roll(group.sides);damage.total+=v-damage.rolls[idx];damage.rolls[idx]=v;}}});return damage;}
function adjustRiteDamage(h,damage,ctx){if(!enabled(h)||!damage||!damage.rolls||lvl(h)<20||!ctx.rerollHemocraft||st(h).bhHemocraftRerolled)return damage;var i=damage.rolls.indexOf(Math.min.apply(Math,damage.rolls)),value=bloodLoss(h);if(value>damage.rolls[i]){damage.total+=value-damage.rolls[i];damage.rolls[i]=value;}st(h).bhHemocraftRerolled=true;return damage;}

function featureList(h){return D.availableFeatures(h,CLASS);}
var features=[
{id:'chooseBloodCurses',name:'Изученные кровавые проклятия',level:1,action:'choice'},{id:'chooseCrimsonRites',name:'Изученные алые обряды',level:2,action:'choice'},{id:'setHemocraftAbility',name:'Характеристика гемокрафта',level:1,action:'choice'},{id:'chooseBloodOrder',name:'Выбрать орден',level:3,action:'choice'},
{id:'huntersBane',name:'Hunter’s Bane',level:1,action:'passive'},{id:'bloodMaledict',name:'Blood Maledict',level:1,action:'bonus'},{id:'fightingStyle',name:'Fighting Style',level:2,action:'choice'},{id:'crimsonRite',name:'Crimson Rite',level:2,action:'bonus'},{id:'extraAttack',name:'Extra Attack',level:5,action:'passive'},{id:'brandOfCastigation',name:'Brand of Castigation',level:6,action:'on-hit'},{id:'grimPsychometry',name:'Grim Psychometry',level:9,action:'utility'},{id:'darkAugmentation',name:'Dark Augmentation',level:10,action:'passive'},{id:'brandOfTethering',name:'Brand of Tethering',level:13,action:'on-hit'},{id:'hardenedSoul',name:'Hardened Soul',level:14,action:'passive'},{id:'sanguineMastery',name:'Sanguine Mastery',level:20,action:'passive'}
];
var subclasses=[
{id:'ghostslayer',name:'Орден призрачных убийц',features:[{id:'riteOfTheDawn',name:'Rite of the Dawn',level:3,action:'bonus'},{id:'curseSpecialist',name:'Curse Specialist',level:3,action:'passive'},{id:'aetherWalk',name:'Aether Walk',level:7,action:'start-turn'},{id:'brandOfSundering',name:'Brand of Sundering',level:11,action:'passive'},{id:'bloodCurseOfTheExorcist',name:'Blood Curse of the Exorcist',level:15,action:'bonus'},{id:'riteRevival',name:'Rite Revival',level:18,action:'reaction'}]},
{id:'lycan',name:'Орден ликантропов',features:[{id:'predatoryStrike',name:'Хищный удар',level:3,action:'bonus'},{id:'heightenedSenses',name:'Heightened Senses',level:3,action:'passive'},{id:'hybridTransformation',name:'Hybrid Transformation',level:3,action:'bonus'},{id:'stalkersProwess',name:'Stalker’s Prowess',level:7,action:'passive'},{id:'advancedTransformation',name:'Advanced Transformation',level:11,action:'passive'},{id:'brandOfVoracious',name:'Brand of the Voracious',level:15,action:'passive'},{id:'hybridTransformationMastery',name:'Hybrid Transformation Mastery',level:18,action:'passive'}]},
{id:'mutant',name:'Орден мутантов',features:[{id:'chooseMutagenFormulas',name:'Изученные формулы',level:3,action:'choice'},{id:'prepareMutagens',name:'Приготовить мутагены после отдыха',level:3,action:'choice'},{id:'flushMutagens',name:'Вывести мутагены',level:3,action:'action'},{id:'mutagencraft',name:'Mutagencraft',level:3,action:'bonus'},{id:'strangeMetabolism',name:'Strange Metabolism',level:7,action:'bonus'},{id:'brandOfAxiom',name:'Brand of Axiom',level:11,action:'passive'},{id:'bloodCurseOfCorrosion',name:'Blood Curse of Corrosion',level:15,action:'bonus'},{id:'exaltedMutation',name:'Exalted Mutation',level:18,action:'bonus'}]},
{id:'profaneSoul',name:'Орден осквернённых душ',features:[{id:'otherworldlyPatron',name:'Otherworldly Patron',level:3,action:'choice'},{id:'pactMagic',name:'Pact Magic',level:3,action:'spell'},{id:'riteFocus',name:'Rite Focus',level:3,action:'passive'},{id:'mysticFrenzy',name:'Mystic Frenzy',level:7,action:'passive'},{id:'revealedArcana',name:'Revealed Arcana',level:7,action:'spell'},{id:'brandSappingScar',name:'Brand of the Sapping Scar',level:11,action:'passive'},{id:'unsealedArcana',name:'Unsealed Arcana',level:15,action:'spell'},{id:'soulEater',name:'Blood Curse of the Soul Eater',level:18,action:'reaction'}]}
];
var labels={huntersBane:'Погибель охотника',bloodMaledict:'Кровавое проклятие',fightingStyle:'Боевой стиль',crimsonRite:'Алый обряд',extraAttack:'Дополнительная атака',brandOfCastigation:'Клеймо наказания',grimPsychometry:'Мрачная психометрия',darkAugmentation:'Тёмное усиление',brandOfTethering:'Клеймо привязки',hardenedSoul:'Закалённая душа',sanguineMastery:'Мастерство крови',riteOfTheDawn:'Обряд рассвета',curseSpecialist:'Мастер проклятий',aetherWalk:'Эфирная поступь',brandOfSundering:'Клеймо разрушения',bloodCurseOfTheExorcist:'Кровавое проклятие экзорциста',riteRevival:'Возрождение обрядом',heightenedSenses:'Обострённые чувства',hybridTransformation:'Гибридное превращение',stalkersProwess:'Мастерство преследователя',advancedTransformation:'Улучшенное превращение',brandOfVoracious:'Клеймо ненасытности',hybridTransformationMastery:'Мастерство гибридного превращения',mutagencraft:'Создание мутагенов',strangeMetabolism:'Необычный метаболизм',brandOfAxiom:'Клеймо аксиомы',bloodCurseOfCorrosion:'Кровавое проклятие коррозии',exaltedMutation:'Возвышенная мутация',otherworldlyPatron:'Потусторонний покровитель',pactMagic:'Магия договора',riteFocus:'Фокус обряда',mysticFrenzy:'Мистическое неистовство',revealedArcana:'Открытая аркана',brandSappingScar:'Клеймо истощающего шрама',unsealedArcana:'Освобождённая аркана',soulEater:'Кровавое проклятие пожирателя душ'};
features.forEach(function(f){f.name=labels[f.id]||f.name;});subclasses.forEach(function(s){s.features.forEach(function(f){f.name=labels[f.id]||f.name;});});
var pack={id:'blood-hunter',name:CLASS,aliases:['Blood Hunter','BloodHunter'],authoritativeSubclasses:true,source:'Matthew Mercer / Critical Role — partner third-party content',license:'Original runtime implementation',
features:features,subclasses:subclasses,hooks:{sync:sync,useFeature:useFeature,attackModifiers:attackModifiers,saveModifiers:saveModifiers,skillModifiers:skillModifiers,checkModifiers:skillModifiers,startTurn:turnStart,onTurnEnd:turnEnd,rest:bloodHunterRest,onDamage:onDamage,onCondition:onCondition,onAttackResult:onAttackResult}};
var result=D.registerClass(pack);if(result&&result.ok)global.DNDBloodHunter={VERSION:'3.0.0',CLASS:CLASS,adjustWeaponDamage:adjustWeaponDamage,adjustRiteDamage:adjustRiteDamage,renderControls:renderControls,gameActors:gameActors,abilityBonuses:abilityBonuses,incomingAC:incomingAC,conditionImmune:conditionImmune,reviveRite:reviveRite,chooseKnown:chooseKnown,activeRite:activeRite,observe:observe,damageModifiers:damageModifiers,cursedSaveModifiers:cursedSaveModifiers,cursedCheckModifiers:cursedCheckModifiers,cursedAttackPenalty:cursedAttackPenalty,endActorTurn:endActorTurn,startActorTurn:startActorTurn,afterActorAttack:afterActorAttack,afterDamage:afterDamage,rest:bloodHunterRest,sync:sync,useFeature:useFeature,attackModifiers:attackModifiers,saveModifiers:saveModifiers,skillModifiers:skillModifiers,spellTable:spellTable,mutagens:mutagens,patrons:patrons,curses:curses};
})(window);
