/**
 * feat_engine.js — runtime-механика черт.
 * Черта больше не является только строкой описания: активные и боевые эффекты
 * проходят через единые hooks, совместимые с combat_engine/class_features_engine.
 */
(function(g){
  'use strict';
  function n(v,d){var x=Number(v);return isFinite(x)?x:(d||0);}
  function st(h){h.featState=h.featState||{};return h.featState;}
  function has(h,id){var a=(h&&(h.feats||h.features))||[];return a.some(function(x){return String(x)===id||String(x).toLowerCase()===id.toLowerCase();});}
  function mod(h,k){var a=h&&h.stats||h&&h.abilities||{};var v=a[k];if(v==null)v=a[k==='str'?'strength':k==='dex'?'dexterity':k==='con'?'constitution':k==='int'?'intelligence':k==='wis'?'wisdom':'charisma'];v=n(v,10);return Math.floor((v-10)/2);}
  function lvl(h){return (h&&h.classes||[]).reduce(function(a,c){return a+n(c.level);},0)||n(h&&h.level,1);}
  function pb(h){return Math.max(2,Math.floor((lvl(h)-1)/4)+2);}
  var ACTIVE={
    lucky:'Везунчик', defensive_duelist:'Защитный дуэлянт', great_weapon_master:'Мастер тяжелого оружия', sharpshooter:'Снайпер', sentinel:'Часовой', shield_master:'Мастер щитов', savage_attacker:'Зверский атакующий', polearm_master:'Мастер древкового оружия', mage_slayer:'Убийца магов', telekinetic:'Телекинетик', telepathic:'Телепат', inspiring_leader:'Вдохновляющий лидер', magic_initiate:'Адепт магии', martial_adept:'Мастер боевых искусств', war_caster:'Боевой заклинатель', fey_touched:'Меченый феями', shadow_touched:'Меченый тенью', poisoner:'Отравитель', metamagic_adept:'Адепт метамагии', fighting_initiate:'Адепт боевого стиля', elven_accuracy:'Эльфийская меткость', bountiful_luck:'Обильная удача', dwarven_fortitude:'Дворфийская стойкость', second_chance:'Второй шанс', orcish_fury:'Орочья ярость', dragon_fear:'Драконий страх', arcane_defender:'Магический страж', shadow_dancer:'Теневой танцор', beast_tamer:'Укротитель зверей', tactician:'Полевой командир', arcane_recovery_feat:'Магический резерв', berserker_rage:'Неистовый'
  };
  function use(h,id,ctx){
    ctx=ctx||{};if(!has(h,id))return{ok:false,reason:'Черта не изучена.'};var s=st(h);
    switch(id){
      case'lucky': if(n(s.lucky,0)>=3)return{ok:false,reason:'Очки удачи закончились.'};s.lucky=n(s.lucky,0)+1;return{ok:true,prepared:true,message:'🍀 Везунчик: следующий подходящий бросок получает переброс/преимущество.'};
      case'defensive_duelist': s.defensiveDuelist=true;return{ok:true,prepared:true,message:'🛡️ Защитный дуэлянт: реакция готова добавить бонус мастерства к КД.'};
      case'great_weapon_master': s.gwmPowerAttack=ctx.enable!==false;return{ok:true,prepared:true,message:'⚔️ Мастер тяжёлого оружия: режим -5 к атаке / +10 к урону '+(s.gwmPowerAttack?'включён':'выключен')+'.'};
      case'sharpshooter': s.sharpshooterPowerAttack=ctx.enable!==false;return{ok:true,prepared:true,message:'🏹 Снайпер: режим -5 к атаке / +10 к урону '+(s.sharpshooterPowerAttack?'включён':'выключен')+'.'};
      case'savage_attacker': s.savageAttackerReady=true;return{ok:true,prepared:true,message:'🎲 Зверский атакующий: переброс урона подготовлен.'};
      case'elven_accuracy': s.elvenAccuracy=true;return{ok:true,prepared:true,message:'🧝 Эльфийская меткость активна: преимущество использует три d20.'};
      case'second_chance': s.secondChanceReady=true;return{ok:true,prepared:true,message:'🛡️ Второй шанс: реакция на успешную атаку готова.'};
      case'orcish_fury': s.orcishFuryReady=true;return{ok:true,prepared:true,message:'💢 Орочья ярость: дополнительная кость урона подготовлена.'};
      case'dwarven_fortitude': s.dwarvenFortitudeReady=true;return{ok:true,prepared:true,message:'⛏️ Дворфийская стойкость: лечение при Уклонении доступно.'};
      case'telekinetic': if(!ctx.target)return{ok:false,reason:'Нужна цель.'};return{ok:true,target:ctx.target.id,effect:{forcedMoveFt:5},message:'🧠 Телекинетический толчок: цель перемещается на 5 футов.'};
      case'telepathic': return{ok:true,target:ctx.target&&ctx.target.id||null,message:'🧠 Телепатическая связь установлена на 60 футов.'};
      case'inspiring_leader': s.inspiringLeaderUsed=true;return{ok:true,temporaryHp:Math.max(1,lvl(h)+mod(h,'cha')),message:'📣 Вдохновляющий лидер: временные HP = уровень + CHA.'};
      case'magic_initiate': s.magicInitiateUsed=true;return{ok:true,prepared:true,message:'✨ Адепт магии: бесплатное заклинание 1 круга доступно 1/долгий отдых.'};
      case'martial_adept': if(n(s.martialAdeptDice,0)>=1)return{ok:false,reason:'Кость превосходства уже потрачена.'};s.martialAdeptDice=1;return{ok:true,prepared:true,message:'⚔️ Мастер боевых искусств: кость превосходства d6 доступна.'};
      case'metamagic_adept': if(!s.sorceryPoints)s.sorceryPoints=2;return{ok:true,message:'✨ Адепт метамагии: 2 очка чародейства доступны.'};
      case'fey_touched': case'shadow_touched': s.featSpellUse=s.featSpellUse||{};s.featSpellUse[id]=true;return{ok:true,prepared:true,message:'✨ '+ACTIVE[id]+': бесплатное заклинание доступно 1/отдых.'};
      case'poisoner': s.poisoner=true;return{ok:true,message:'☠️ Отравитель: сопротивление ядам игнорируется при подходящей атаке.'};
      case'war_caster': s.warCaster=true;return{ok:true,message:'🪄 Боевой заклинатель: преимущество на концентрацию и заклинание вместо атаки возможности.'};
      case'mage_slayer': s.mageSlayer=true;return{ok:true,message:'🗡️ Убийца магов: реакция и преимущество на спасброски против заклинаний рядом.'};
      case'polearm_master': s.polearmMaster=true;return{ok:true,message:'🪓 Мастер древкового оружия: бонусная атака и реакция на вход в досягаемость.'};
      case'sentinel': s.sentinel=true;return{ok:true,message:'🛡️ Часовой: атаки возможности останавливают скорость цели.'};
      case'shield_master': s.shieldMaster=true;return{ok:true,message:'🛡️ Мастер щитов: толчок бонусным действием и защита от эффектов Ловкости.'};
      case'arcane_defender': s.arcaneDefender=true;return{ok:true,prepared:true,message:'🔮 Магический страж: реакционный барьер подготовлен.'};
      case'shadow_dancer': if(!ctx.target)return{ok:false,reason:'Нужна точка/цель телепортации.'};return{ok:true,effect:{teleportFt:30,target:ctx.target.id},message:'🌑 Теневой танцор: телепортация до 30 футов.'};
      case'beast_tamer': s.beastTamer=true;return{ok:true,prepared:true,message:'🐺 Укротитель зверей: спутник готов к призыву.'};
      case'tactician': if(!ctx.target)return{ok:false,reason:'Нужен союзник.'};return{ok:true,target:ctx.target.id,effect:{moveFt:10},message:'⚔️ Полевой командир: союзник может переместиться на 10 футов.'};
      case'arcane_recovery_feat': s.arcaneRecoveryFeat=true;return{ok:true,prepared:true,message:'🔮 Магический резерв: восстановление ячейки низкого круга доступно на коротком отдыхе.'};
      case'berserker_rage': s.berserkerRage=true;return{ok:true,message:'💢 Неистовый: режим усиленного урона активирован.'};
      default:return{ok:true,prepared:true,message:'✨ '+(ACTIVE[id]||id)+' отмечена как активная; эффект зависит от контекста.'};
    }
  }
  function attackModifiers(h,ctx){var o={bonusAttack:0,bonusDamage:0,extraDice:[],advantage:false,disadvantage:false,notes:[]};ctx=ctx||{};
    if(has(h,'great_weapon_master')&&ctx.weaponHeavy&&st(h).gwmPowerAttack){o.bonusAttack-=5;o.bonusDamage+=10;o.notes.push('Мастер тяжёлого оружия');}
    if(has(h,'sharpshooter')&&ctx.ranged&&ctx.sharpshooterPowerAttack){o.bonusAttack-=5;o.bonusDamage+=10;o.notes.push('Снайпер');}
    if(has(h,'elven_accuracy')&&ctx.advantage&&!ctx.disadvantage){o.elvenAccuracy=true;o.notes.push('Эльфийская меткость');}
    if(has(h,'orcish_fury')&&st(h).orcishFuryReady){o.extraDice.push('1d8');st(h).orcishFuryReady=false;o.notes.push('Орочья ярость');}
    if(has(h,'savage_attacker')&&st(h).savageAttackerReady){o.rerollDamage=true;st(h).savageAttackerReady=false;o.notes.push('Зверский атакующий');}
    if(has(h,'poisoner')&&ctx.damageType==='яд')o.ignoreResistance=true;
    if(has(h,'mobile')&&ctx.meleeHit)o.opportunityImmunity=true;
    return o;
  }
  function saveModifiers(h,ctx){var o={bonus:0,advantage:false,disadvantage:false,notes:[]};ctx=ctx||{};
    if(has(h,'war_caster')&&ctx.concentration)o.advantage=true;
    if(has(h,'mage_slayer')&&ctx.fromSpell&&ctx.distanceFt<=5)o.advantage=true;
    if(has(h,'infernal_constitution')&&ctx.poisoned)o.advantage=true;
    if(has(h,'shield_master')&&ctx.dexSave&&ctx.shieldEquipped)o.bonus+=n(ctx.shieldBonus,2);
    return o;
  }
  function checkModifiers(h,ctx){var o={bonus:0,minimum:0,notes:[]};ctx=ctx||{};if(has(h,'alert')&&ctx.initiative)o.bonus+=5;if(has(h,'perceptive')&&ctx.perception)o.bonus+=0;o.notes.push.apply(o.notes,[]);return o;}
  function damageModifiers(h,ctx){var o={bonus:0,notes:[]};ctx=ctx||{};if(has(h,'heavy_armor_master')&&ctx.heavyArmor&&!ctx.magicalPhysical)o.bonus=-3;if(has(h,'tough_hide'))o.bonus=-1;if(has(h,'berserker_rage')&&ctx.raging)o.bonus+=Math.max(1,mod(h,'str'));return o;}
  g.DNDFeats={VERSION:'1.0.0',ACTIVE:ACTIVE,has:has,useFeature:use,isActive:function(id){return !!ACTIVE[id]},attackModifiers:attackModifiers,saveModifiers:saveModifiers,checkModifiers:checkModifiers,damageModifiers:damageModifiers};
  g.useFeat=function(id,ctx){return use(g.currentCharacter||g.currentChar,id,ctx||{});};
})(window);
