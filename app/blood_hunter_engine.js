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
function lvl(h){var c=(h&&h.classes||[]).find(function(x){return String(x.name)===CLASS;});return c?num(c.level):0;}
function st(h){h.classFeaturesState=h.classFeaturesState||{};return h.classFeaturesState;}
function res(h,id,max,recharge){h.resources=h.resources||{};var r=h.resources[id];if(!r){r={max:max,current:max,recharge:recharge||'short'};h.resources[id]=r;}else{r.max=max;r.current=Math.min(num(r.current,max),max);r.recharge=recharge||r.recharge;}return r;}
function spend(h,id,n){var r=h.resources&&h.resources[id];if(!r||num(r.current)<n)return false;r.current-=n;return true;}
function ability(h,key){var a=h.abilities||{};var v=a[key];if(v===undefined)v=a[key.slice(0,3).toUpperCase()];if(v===undefined)v=a[key.toUpperCase()];return num(v);}
function mod(h,key){var v=ability(h,key);return v>10?Math.floor((v-10)/2):v;}
function hemMod(h){var s=st(h),a=s.hemocraftAbility||'intelligence';return mod(h,a);}
function dc(h){return 8+num(h.proficiencyBonus,Math.max(2,Math.floor((num(h.level)||lvl(h)-1)/4)+2))+hemMod(h);}
function dieSides(l){var d=4;Object.keys(DIE).forEach(function(k){if(l>=Number(k))d=DIE[k];});return d;}
function die(l){return '1d'+dieSides(l);}
function roll(s){return Math.floor(Math.random()*s)+1;}
function bloodLoss(h){return roll(dieSides(lvl(h)));}
function hp(h){return num(h.hpCurrent,h.hitPoints||h.currentHP||h.hp);}
function setHp(h,v){if('hpCurrent'in h)h.hpCurrent=v;else if('hitPoints'in h)h.hitPoints=v;else if('currentHP'in h)h.currentHP=v;else h.hp=v;}
function target(ctx){return ctx&&ctx.target||null;}
function sub(h){var c=(h.classes||[]).find(function(x){return String(x.name)===CLASS;});return c&&String(c.subclass||'');}
function orderKey(h){var x=sub(h);return x.indexOf('призрач')>=0?'ghostslayer':x.indexOf('ликантроп')>=0?'lycan':x.indexOf('мутант')>=0?'mutant':x.indexOf('оскверн')>=0?'profaneSoul':x;}
function ensureChoices(h){
 var s=st(h),l=lvl(h);s.hemocraftAbility=s.hemocraftAbility||'intelligence';
 s.crimsonRitesKnown=s.crimsonRitesKnown||['flame'];if(l>=7&&s.crimsonRitesKnown.length<2)s.crimsonRitesKnown.push('frozen');if(l>=14&&s.crimsonRitesKnown.length<3)s.crimsonRitesKnown.push('dead');
 if(!s.bloodCursesKnown)s.bloodCursesKnown=['anxious'];
 var curseCount=l>=17?5:l>=13?4:l>=10?3:l>=6?2:1,defaults=['anxious','binding','bloatedAgony','exposure','marked'];
 defaults.forEach(function(x){if(s.bloodCursesKnown.length<curseCount&&s.bloodCursesKnown.indexOf(x)<0)s.bloodCursesKnown.push(x);});
 s.bloodCursesKnown=s.bloodCursesKnown.slice(0,curseCount);
}
function sync(h){
 var l=lvl(h);if(!l)return;
 var s=st(h);ensureChoices(h);h.hemocraftDie=die(l);s.hemocraftSaveDC=dc(h);
 var uses=l>=17?4:l>=13?3:l>=6?2:1;res(h,'bloodMaledict',uses,'short');
 res(h,'crimsonRite',1,'short');res(h,'brandCastigation',1,'short');
 if(orderKey(h)==='ghostslayer'){res(h,'aetherWalk',l>=15?2:1,'short');s.ghostslayerCurseSpecial=true;}
 if(orderKey(h)==='lycan'){res(h,'hybridTransformation',l>=18?999:l>=11?2:1,'short');}
 if(orderKey(h)==='mutant'){s.mutagenFormulasKnown=s.mutagenFormulasKnown||['celerity','deftness','embers','mobility'];s.mutagenFormulasKnown=s.mutagenFormulasKnown.slice(0,l>=18?8:l>=15?7:l>=11?6:l>=7?5:4);res(h,'mutagenConcoctions',l>=15?3:l>=7?2:1,'short');res(h,'strangeMetabolism',1,'long');res(h,'exaltedMutation',Math.max(1,hemMod(h)),'long');}
 if(orderKey(h)==='profaneSoul'){var slots=l>=6?2:1,sl=l>=19?4:l>=13?3:l>=7?2:1;res(h,'profaneSoulSlots',slots,'short');s.profaneSoulSlotLevel=sl;s.profaneSoulCantrips=l>=10?3:2;s.profaneSoulSpellsKnown=l>=20?11:l>=19?10:l>=17?9:l>=15?8:l>=13?7:l>=11?6:l>=9?5:l>=7?4:l>=5?3:2;}
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
function useRite(h,ctx){
 sync(h);var s=st(h),type=String(ctx&&ctx.riteType||s.crimsonRiteType||'flame');if(s.crimsonRite&&s.crimsonRite.active)return{ok:false,reason:'Уже есть активный обряд.'};
 if(s.crimsonRitesKnown.indexOf(type)<0)return{ok:false,reason:'Этот Обряд не изучен.'};var loss=requireHp(h);if(loss===null)return{ok:false,reason:'Недостаточно HP.'};
 s.crimsonRite={active:true,type:type,weaponId:ctx&&ctx.weaponId||null};return{ok:true,message:'🩸 Алый обряд: '+type+'. Потеряно '+loss+' HP.',lossHp:loss};
}
function useCurse(h,ctx){
 sync(h);var id=String(ctx&&ctx.curse||'binding'),c=curses[id];if(!c)return{ok:false,reason:'Неизвестное проклятие.'};var o=orderKey(h),l=lvl(h);
 if(c.req&&((typeof c.req[0]==='string'&&c.req[0]!==o)||(typeof c.req[0]==='string'&&l<c.req[1])))return{ok:false,reason:'Проклятие пока недоступно.'};
 if(!spend(h,'bloodMaledict',1))return{ok:false,reason:'Нет использований Blood Maledict.'};
 var out={ok:true,curse:id,effect:c.effect||{},action:c.action,rangeFt:30};if(ctx&&ctx.amplify){var loss=requireHp(h);if(loss===null)return{ok:false,reason:'Недостаточно HP для Amplify.'};out.amplified=true;out.amplify=c.amp;out.lossHp=loss;}st(h).lastBloodCurse=out;return out;
}
function useBrand(h,ctx,tether){
 sync(h);var t=target(ctx);if(!t)return{ok:false,reason:'Нужна цель.'};if(!spend(h,'brandCastigation',1))return{ok:false,reason:'Клеймо уже использовано до отдыха.'};
 var s=st(h);s.brandTargetId=t.id;s.brandTether=!!tether;return{ok:true,targetId:t.id,effect:{trackSamePlane:true,psychicDamage:tether?Math.max(2,2*hemMod(h)):Math.max(1,hemMod(h)),dashForbidden:!!tether,teleportDamage:tether?'4d6':null,teleportSave:tether?'wis':null}};
}
function useGhost(h,id,ctx){
 var s=st(h),l=lvl(h),t=target(ctx);
 if(id==='riteOfTheDawn'){s.dawnRite=true;s.crimsonRiteType='dawn';return{ok:true,effect:{damageType:'radiant',brightLightFt:20,resistance:['necrotic'],extraRiteDieVsUndead:true}};}
 if(id==='aetherWalk'){if(!spend(h,'aetherWalk',1))return{ok:false,reason:'Aether Walk недоступен.'};return{ok:true,effect:{ethereal:true,durationRounds:Math.max(1,hemMod(h)),phaseThrough:true,forceDamageIfInside:'1d10'}};}
 if(id==='riteRevival'){if(!s.crimsonRite||!s.crimsonRite.active)return{ok:false,reason:'Нет активного Crimson Rite.'};s.crimsonRite.active=false;return{ok:true,effect:{setHpIfDroppedToZero:1},message:'Rite Revival спасает от смерти.'};}
 if(id==='curseOfTheMarked'){return useCurse(h,{curse:'marked',target:t});}
 if(id==='bloodCurseOfTheExorcist'){return useCurse(h,{curse:'exorcist',target:t});}
 if(id==='bloodCurseOfCorrosion'){return useCurse(h,{curse:'corrosion',target:t});}
 if(id==='bloodCurseOfHowl'){return useCurse(h,{curse:'howl',target:t});}
 if(id==='curseSpecialist')return{ok:true,effect:{extraBloodMaledictUse:true,cursesIgnoreBloodRequirement:true}};
 if(id==='brandOfSundering')return{ok:true,effect:{brandedExtraRiteDie:true,blockIncorporealMovement:true}};
 return{ok:false,unsupported:true};
}
function useLycan(h,id,ctx){
 sync(h);var s=st(h),l=lvl(h);
 if(id==='hybridTransformation'){if(s.hybridForm){s.hybridForm=false;return{ok:true,message:'🐺 Форма снята.'};}if(!spend(h,'hybridTransformation',1))return{ok:false,reason:'Нет использования Hybrid Transformation.'};s.hybridForm=true;return{ok:true,effect:{feralMightBonus:l>=18?3:l>=11?2:1,resistanceNonmagicalBPSilvered:true,acBonus:1,predatoryStrikeDie:l>=11?'1d8':'1d6',bonusActionStrike:true,bloodlust:true}};}
 if(id==='stalkersProwess')return{ok:true,effect:{speedBonusFt:10,jumpLongBonusFt:10,jumpHighBonusFt:3,predatoryAttackBonus:l>=18?3:l>=11?2:1,predatoryRiteMagical:true}};
 if(id==='advancedTransformation'){return{ok:true,effect:{uses:2,regen:'1 + CON modifier when bloodied'}};}
 if(id==='brandOfVoracious')return{ok:true,effect:{bloodlustSaveAdvantage:true,advantageAgainstBrandedWhileHybrid:true}};
 if(id==='hybridTransformationMastery'){h.resources.hybridTransformation.current=999;return{ok:true,effect:{unlimitedHybrid:true,curseHowl:true}};}
 return{ok:false,unsupported:true};
}
function useMutant(h,id,ctx){
 sync(h);var s=st(h),l=lvl(h);
 if(id==='mutagencraft'||id==='consumeMutagen'){var m=String(ctx&&ctx.mutagen||'celerity'),d=mutagens[m];if(!d)return{ok:false,reason:'Неизвестный мутаген.'};if(d.req&&l<d.req)return{ok:false,reason:'Мутаген требует '+d.req+' уровня.'};if(!spend(h,'mutagenConcoctions',1))return{ok:false,reason:'Нет приготовленных мутагенов.'};s.activeMutagens=s.activeMutagens||[];s.activeMutagens.push({id:m,effect:d.effect,side:d.side});return{ok:true,mutagen:m,effect:d.effect,sideEffect:d.side};}
 if(id==='flushMutagens'){s.activeMutagens=[];return{ok:true,message:'Все мутагены удалены.'};}
 if(id==='strangeMetabolism'){return{ok:true,effect:{immunity:['poison','poisoned'],ignoreMutagenSideEffect:'1 minute',uses:1,recharge:'long'}};}
 if(id==='brandOfAxiom')return{ok:true,effect:{endIllusionOrInvisibilityOnBrand:true,blockIllusionInvisibility:true,shapechangeSave:'wis',stunOnFailedShapechange:true}};
 if(id==='exaltedMutation'){var uses=h.resources.exaltedMutation;if(!spend(h,'exaltedMutation',1))return{ok:false,reason:'Нет использования Exalted Mutation.'};return{ok:true,effect:{replaceOneActiveMutagen:true,usesLeft:uses.current}};}
 if(id==='alchemicalMastery')return{ok:true,effect:{mutagenCraftUses:2,formulaCount:6}};
 return{ok:false,unsupported:true};
}
function spellTable(l){if(l<3)return{cantrips:0,spells:0,slots:0,slotLevel:0};return{cantrips:l>=10?3:2,spells:l>=20?11:l>=19?10:l>=17?9:l>=15?8:l>=13?7:l>=11?6:l>=9?5:l>=7?4:l>=5?3:2,slots:l>=6?2:1,slotLevel:l>=19?4:l>=13?3:l>=7?2:1};}
function useProfane(h,id,ctx){
 sync(h);var s=st(h),p=String(s.profanePatron||'fiend'),pt=patrons[p]||patrons.fiend,l=lvl(h);
 if(id==='choosePatron'){if(!patrons[String(ctx&&ctx.patron)])return{ok:false,reason:'Неизвестный покровитель.'};s.profanePatron=String(ctx.patron);return{ok:true,patron:s.profanePatron};}
 if(id==='castPactSpell'){if(!spend(h,'profaneSoulSlots',1))return{ok:false,reason:'Нет ячейки Пакта.'};return{ok:true,effect:{spell:ctx&&ctx.spell||null,slotLevel:s.profaneSoulSlotLevel,ability:s.hemocraftAbility,saveDC:dc(h),attackBonus:num(h.proficiencyBonus,2)+hemMod(h)}};}
 if(id==='riteFocus')return{ok:true,effect:pt.focus};
 if(id==='mysticFrenzy')return{ok:true,effect:{cantripPlusWeaponAttack:true}};
 if(id==='revealedArcana')return{ok:true,effect:{spell:pt.revealed,freeUseAfterCasting:true,recharge:'long'}};
 if(id==='brandSappingScar')return{ok:true,effect:{brandedDisadvantageOnSavesVsPactSpells:true}};
 if(id==='unsealedArcana')return{ok:true,effect:{spell:pt.unsealed,freeUse:true,recharge:'long'}};
 if(id==='soulEater')return useCurse(h,{curse:'soulEater',target:target(ctx),amplify:ctx&&ctx.amplify});
 return{ok:false,unsupported:true};
}
function useFeature(h,id,ctx,feature){
 sync(h);ctx=ctx||{};
 if(id==='setHemocraftAbility'){var a=String(ctx.ability||'intelligence');if(['intelligence','wisdom'].indexOf(a)<0)return{ok:false,reason:'Только Intelligence или Wisdom.'};st(h).hemocraftAbility=a;sync(h);return{ok:true,ability:a,saveDC:dc(h)};}
 if(id==='crimsonRite')return useRite(h,ctx);
 if(id==='bloodMaledict')return useCurse(h,ctx);
 if(id==='brandOfCastigation')return useBrand(h,ctx,false);
 if(id==='brandOfTethering')return useBrand(h,ctx,true);
 var o=orderKey(h);if(o==='ghostslayer'){var x=useGhost(h,id,ctx);if(x.ok||x.unsupported===false)return x;}
 if(o==='lycan'){var y=useLycan(h,id,ctx);if(y.ok||y.unsupported===false)return y;}
 if(o==='mutant'){var z=useMutant(h,id,ctx);if(z.ok||z.unsupported===false)return z;}
 if(o==='profaneSoul')return useProfane(h,id,ctx);
 if(id==='sanguineMastery')return{ok:true,effect:{hemocraftRerollOncePerTurn:true,restoreBloodMaledictOnRiteCrit:true}};
 if(id==='huntersBane')return{ok:true,effect:{advantageTrackFeyFiendsUndead:true,advantageRecallFeyFiendsUndead:true,saveDC:dc(h)}};
 if(id==='darkAugmentation')return{ok:true,effect:{speedBonusFt:5,saveBonus:{str:Math.max(1,hemMod(h)),dex:Math.max(1,hemMod(h)),con:Math.max(1,hemMod(h))}}};
 if(id==='hardenedSoul')return{ok:true,effect:{advantageSaves:['charmed','frightened']}};
 if(id==='grimPsychometry')return{ok:true,effect:{historyAdvantageOnSinisterObjectOrPlace:true}};
 if(id==='extraAttack')return{ok:true,effect:{extraAttack:true}};
 if(id==='fightingStyle')return{ok:true,effect:{fightingStyle:st(h).fightingStyle||ctx.style||null}};
 return{ok:false,unsupported:true,message:'Эта способность пока не имеет отдельного действия.'};
}
function attackModifiers(h,ctx){
 sync(h);var s=st(h),l=lvl(h),o={bonusDamage:0,extraDice:[],advantage:false,disadvantage:false,notes:[],attackBonus:0};
 if(s.crimsonRite&&s.crimsonRite.active)o.extraDice.push(die(l)),o.notes.push('Crimson Rite: '+s.crimsonRite.type);
 if(s.brandTargetId&&ctx&&ctx.target&&String(s.brandTargetId)===String(ctx.target.id))o.bonusDamage+=Math.max(1,hemMod(h)),o.notes.push('Brand of Castigation');
 if(s.brandTether&&s.brandTargetId&&ctx&&ctx.target&&String(s.brandTargetId)===String(ctx.target.id))o.bonusDamage+=Math.max(1,hemMod(h)),o.notes.push('Brand of Tethering');
 if(s.hybridForm){o.bonusDamage+=l>=18?3:l>=11?2:1;o.notes.push('Feral Might');if(ctx&&ctx.unarmed&&l>=7)o.attackBonus+=l>=18?3:l>=11?2:1;}
 if(s.fightingStyle==='Стрельба'||s.fightingStyle==='Archery')o.attackBonus+=2;
 if(s.fightingStyle==='Дуэлянт'||s.fightingStyle==='Dueling')o.bonusDamage+=2;
 if(s.fightingStyle==='Сражение двумя оружиями'||s.fightingStyle==='Two-Weapon Fighting')o.notes.push('Add ability modifier to second attack');
 if(s.activeMutagens&&s.activeMutagens.some(function(x){return x.id==='precision';}))o.critRange=19;
 if(orderKey(h)==='lycan'&&s.hybridForm&&s.brandTargetId&&ctx&&ctx.target&&String(s.brandTargetId)===String(ctx.target.id)&&l>=15)o.advantage=true;
 return o;
}
function saveModifiers(h,ctx){
 sync(h);var s=st(h),o={bonus:0,advantage:false,disadvantage:false,notes:[]},l=lvl(h);
 if(['str','dex','con'].indexOf(String(ctx&&ctx.saveType||''))>=0&&l>=10)o.bonus+=Math.max(1,hemMod(h));
 if(s.hybridForm&&ctx&&ctx.saveType==='str')o.advantage=true;
 if(orderKey(h)==='ghostslayer'&&s.dawnRite&&ctx&&ctx.damageType==='necrotic')o.resistance=true;
 if(orderKey(h)==='mutant'&&s.activeMutagens)s.activeMutagens.forEach(function(m){if(m.side){if(m.side.wisSavesDisadvantage&&ctx.saveType==='wis')o.disadvantage=true;if(m.side.dexSavesDisadvantage&&ctx.saveType==='dex')o.disadvantage=true;if(m.side.strSavesDisadvantage&&ctx.saveType==='str')o.disadvantage=true;if(m.side.chaSavesDisadvantage&&ctx.saveType==='cha')o.disadvantage=true;}});
 if(l>=14&&(ctx.saveType==='charmed'||ctx.saveType==='frightened'))o.advantage=true;
 return o;
}
function skillModifiers(h,ctx){var o={advantage:false,notes:[]},s=st(h);if(ctx&&ctx.skill==='survival'&&ctx.creatureType&&['fey','fiend','undead'].indexOf(ctx.creatureType)>=0)o.advantage=true;if(ctx&&ctx.skill==='history'&&ctx.sinister)o.advantage=true;if(s.activeMutagens)s.activeMutagens.forEach(function(m){if(m.effect&&m.effect.intChecksAdvantage&&ctx.skillAbility==='intelligence')o.advantage=true;if(m.effect&&m.effect.wisChecksAdvantage&&ctx.skillAbility==='wisdom')o.advantage=true;if(m.effect&&m.effect.dexChecksAdvantage&&ctx.skillAbility==='dexterity')o.advantage=true;});return o;}
function turnStart(h){
 sync(h);var s=st(h);if(s.hybridForm&&hp(h)>0&&hp(h)<num(h.hpMax,h.hitPointsMax||999)/2){var heal=Math.max(1,1+mod(h,'constitution')+(orderKey(h)==='lycan'&&lvl(h)>=11?0:0));if(orderKey(h)==='lycan'&&lvl(h)>=11){setHp(h,hp(h)+heal);}}}
function turnEnd(h){var s=st(h);if(s.bloodMaledictAmplifyLocked)s.bloodMaledictAmplifyLocked=false;}
function featureList(h){return D.availableFeatures(h,CLASS);}
var features=[
{id:'huntersBane',name:'Hunter’s Bane',level:1,action:'passive'},{id:'bloodMaledict',name:'Blood Maledict',level:1,action:'bonus'},{id:'fightingStyle',name:'Fighting Style',level:2,action:'choice'},{id:'crimsonRite',name:'Crimson Rite',level:2,action:'bonus'},{id:'extraAttack',name:'Extra Attack',level:5,action:'passive'},{id:'brandOfCastigation',name:'Brand of Castigation',level:6,action:'on-hit'},{id:'grimPsychometry',name:'Grim Psychometry',level:9,action:'utility'},{id:'darkAugmentation',name:'Dark Augmentation',level:10,action:'passive'},{id:'brandOfTethering',name:'Brand of Tethering',level:13,action:'on-hit'},{id:'hardenedSoul',name:'Hardened Soul',level:14,action:'passive'},{id:'sanguineMastery',name:'Sanguine Mastery',level:20,action:'passive'}
];
var subclasses=[
{id:'ghostslayer',name:'Орден призрачных убийц',features:[{id:'riteOfTheDawn',name:'Rite of the Dawn',level:3,action:'choice'},{id:'curseSpecialist',name:'Curse Specialist',level:3,action:'passive'},{id:'aetherWalk',name:'Aether Walk',level:7,action:'bonus'},{id:'brandOfSundering',name:'Brand of Sundering',level:11,action:'passive'},{id:'bloodCurseOfTheExorcist',name:'Blood Curse of the Exorcist',level:15,action:'bonus'},{id:'riteRevival',name:'Rite Revival',level:18,action:'reaction'}]},
{id:'lycan',name:'Орден ликантропов',features:[{id:'heightenedSenses',name:'Heightened Senses',level:3,action:'passive'},{id:'hybridTransformation',name:'Hybrid Transformation',level:3,action:'bonus'},{id:'stalkersProwess',name:'Stalker’s Prowess',level:7,action:'passive'},{id:'advancedTransformation',name:'Advanced Transformation',level:11,action:'passive'},{id:'brandOfVoracious',name:'Brand of the Voracious',level:15,action:'passive'},{id:'hybridTransformationMastery',name:'Hybrid Transformation Mastery',level:18,action:'passive'}]},
{id:'mutant',name:'Орден мутантов',features:[{id:'mutagencraft',name:'Mutagencraft',level:3,action:'bonus'},{id:'strangeMetabolism',name:'Strange Metabolism',level:7,action:'bonus'},{id:'brandOfAxiom',name:'Brand of Axiom',level:11,action:'passive'},{id:'bloodCurseOfCorrosion',name:'Blood Curse of Corrosion',level:15,action:'bonus'},{id:'exaltedMutation',name:'Exalted Mutation',level:18,action:'bonus'}]},
{id:'profaneSoul',name:'Орден осквернённых душ',features:[{id:'otherworldlyPatron',name:'Otherworldly Patron',level:3,action:'choice'},{id:'pactMagic',name:'Pact Magic',level:3,action:'spell'},{id:'riteFocus',name:'Rite Focus',level:3,action:'passive'},{id:'mysticFrenzy',name:'Mystic Frenzy',level:7,action:'passive'},{id:'revealedArcana',name:'Revealed Arcana',level:7,action:'spell'},{id:'brandSappingScar',name:'Brand of the Sapping Scar',level:11,action:'passive'},{id:'unsealedArcana',name:'Unsealed Arcana',level:15,action:'spell'},{id:'soulEater',name:'Blood Curse of the Soul Eater',level:18,action:'reaction'}]}
];
var pack={id:'blood-hunter',name:CLASS,source:'Matthew Mercer / Critical Role — partner third-party content',license:'Original runtime implementation',
features:features,subclasses:subclasses,hooks:{sync:sync,useFeature:useFeature,attackModifiers:attackModifiers,saveModifiers:saveModifiers,skillModifiers:skillModifiers,onTurnStart:turnStart,onTurnEnd:turnEnd}};
var result=D.registerClass(pack);if(result&&result.ok)global.DNDBloodHunter={VERSION:'2.0.0',CLASS:CLASS,sync:sync,useFeature:useFeature,attackModifiers:attackModifiers,saveModifiers:saveModifiers,skillModifiers:skillModifiers,spellTable:spellTable,mutagens:mutagens,patrons:patrons,curses:curses};
})(window);
