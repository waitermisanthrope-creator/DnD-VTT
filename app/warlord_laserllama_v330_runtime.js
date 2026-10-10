/** Warlord: selected local Laserllama v3.3.0 contract, partial executable runtime. */
(function(g){
'use strict';
var D=g.DNDContent,old=D&&D.getClass('Warlord'),P=g.warlordProgression,ID='kibbles-warlord',NAME='Военачальник';
if(!old||!P)return;
var ACADEMIES=['chivalry','dread','ferocity','gallantry','schemes','tactics','claws','counsel','liberty','navigators','order','zeal'];
var subs=ACADEMIES.map(function(id){return old.subclasses.find(function(s){return s.id===id;});}).filter(Boolean);
var subIds={};subs.forEach(function(s){s.features.forEach(function(f){subIds[f.id]=true;});});
var styles=['archery','brawling','mariner','mountaineer','shieldWarrior','strongbow','versatileFightingAdvanced'];
var baseIds=['leadershipStyle','inspiringWord','tacticalSkill','rallyingCry','unwaveringWill','tacticalSuperiority','dauntless'];
var features=old.features.filter(function(f){return !subIds[f.id]&&!/^(src-|manifest-|sub-)/.test(f.id);});
var exploits=features.filter(function(f){return baseIds.indexOf(f.id)<0&&styles.indexOf(f.id)<0;});
features=features.concat([{id:'warlord-chooseAcademy',name:'Выбор военной академии',level:3,action:'choice'},
 {id:'warlord-chooseExploits',name:'Изученные тактические приёмы',level:2,action:'choice'},
 {id:'warlord-chooseFightingStyle',name:'Выбор боевого стиля',level:2,action:'choice'}]);
function cls(h){return (h&&h.classes||[]).find(function(c){return [NAME,'Warlord'].indexOf(String(c.name))>=0;});}
function level(h){var c=cls(h);return c?Math.max(0,Math.min(20,Math.floor(Number(c.level))||0)):0;}
function state(h){return h.classFeaturesState=h.classFeaturesState||{};}
function ability(h,key){var names={str:'strength',dex:'dexterity',con:'constitution',int:'intelligence',wis:'wisdom',cha:'charisma'},a=h.abilityScores||h.stats||{};return Math.floor(((Number(a[key]!=null?a[key]:a[names[key]])||10)-10)/2);}
function hp(h){return Number(h&&h.hpCurrent!=null?h.hpCurrent:h&&h.hp&&typeof h.hp==='object'?h.hp.current:h&&h.hp)||0;}
function hpMax(h){return Number(h&&h.hpMax!=null?h.hpMax:h&&h.maxHp!=null?h.maxHp:h&&h.hp&&h.hp.max)||0;}
function condition(h,name){var maps=[h.conditions,h.activeConditions];return maps.some(function(m){return m&&Object.keys(m).some(function(k){var key=g.DNDRules&&g.DNDRules.normalizeConditionName?g.DNDRules.normalizeConditionName(k):k;return m[k]&&key===name;});});}
function canAct(h){return hp(h)>0&&!['Недееспособен','Оглушён','Парализован','Бессознателен','Окаменел'].some(function(k){return condition(h,k);});}
function canReact(h){return h&&canAct(h)&&!(h.turnResources&&(h.turnResources.reaction===false||Number(h.turnResources.reaction)===0));}
function takeReaction(h){h.turnResources=h.turnResources||{};h.turnResources.reaction=0;}
function fail(message){return {ok:false,unsupported:true,message:message||'Исполнение этой способности Военачальника ещё не подключено.'};}
function pool(h,id,max){h.resources=h.resources||{};var r=h.resources[id];if(!r)r=h.resources[id]={max:max,current:max};else {var spent=Math.max(0,(Number(r.max)||0)-(Number(r.current)||0));r.max=max;r.current=Math.max(0,max-spent);}r.recharge='short';return r;}
function spend(h,id){var r=h.resources[id];if(!r||Number(r.current)<1)return false;r.current--;return true;}
function chosen(h){var c=cls(h);return c&&subs.find(function(x){return x.id===c.subclass||x.name===c.subclass;});}
function die(h){return P.progression.exploitDie[level(h)]||'d4';}
function lead(h){return ability(h,state(h).warlordLeadership||'cha');}
function sync(h){
 var l=level(h);if(!l)return;var s=state(h),c=chosen(h),tactics=c&&c.id==='tactics'&&l>=3;
 if(['cha','wis','int'].indexOf(s.warlordLeadership)<0)s.warlordLeadership=['cha','wis','int'].indexOf(s.leadershipAbility)>=0?s.leadershipAbility:'cha';
 var r=pool(h,'warlordExploitDice',Number(P.progression.exploitDice[l])+(tactics?1:0));r.die=die(h);
 pool(h,'warlordInspiringWord',Number(P.progression.inspiringWordUses[l-1]));
 r=pool(h,'warlordRally',l>=17?3:l>=13?2:l>=9?1:0);r.unlimited=l>=20;
 s.warlordExploitKnown=Number(P.progression.exploitsKnown[l-1])+(tactics?1:0);
 s.warlordSaveDC=8+(Number(h.proficiencyBonus)||Math.floor(((h.classes||[]).reduce(function(n,c){return n+Number(c.level||0);},0)-1)/4)+2)+lead(h);
 s.warlordAcademy=c?c.id:null;s.warlordRallyUses=r.max;
 if(!Array.isArray(s.warlordKnownExploits))s.warlordKnownExploits=Array.isArray(s.warlordExploits)?s.warlordExploits.slice():[];
 s.warlordUsedTriggers=s.warlordUsedTriggers||{};
}
function available(h,id){return !!(D.resolveFeature&&D.resolveFeature(h,id,NAME));}
function known(h,id){return state(h).warlordKnownExploits.indexOf(id)>=0;}
function inRange(h,t,ctx){return t&&ctx.visible!==false&&ctx.canHear!==false&&Number.isFinite(ctx.distanceFt)&&ctx.distanceFt>=0&&ctx.distanceFt<=(level(h)>=11?60:30);}
function hitDie(t,ctx){var c=t.classes&&t.classes[0],r=c&&g.CLASSES_REFERENCE&&g.CLASSES_REFERENCE[c.name],native=Number(r&&r.hitDie||t.hitDie),n=ctx.hitDie==null?native:Number(String(ctx.hitDie).replace(/^d/i,''));if(native&&n!==native)return null;return [6,8,10,12].indexOf(n)>=0?n:null;}
function trigger(h,ctx){var id=String(ctx.triggerId||'');return id&&state(h).warlordUsedTriggers['trigger:'+id]!==true;}
function markTrigger(h,ctx){state(h).warlordUsedTriggers['trigger:'+String(ctx.triggerId)]=true;}
function use(h,id,ctx){
 ctx=ctx||{};if(!available(h,id))return {ok:false,unavailable:true,message:'Способность недоступна текущему уровню/академии.'};
 sync(h);var s=state(h),l=level(h),t=ctx.target,B=g.DNDCombat;
 if(id==='leadershipStyle'){
  var map={captain:'cha',mentor:'wis',strategist:'int',charisma:'cha',wisdom:'wis',intelligence:'int'},v=map[ctx.style]||ctx.style;
  if(['cha','wis','int'].indexOf(v)<0)return fail('Выберите Капитана, Наставника или Стратега.');
  s.warlordLeadership=v;sync(h);return {ok:true,message:'Стиль лидерства: '+({cha:'Капитан',wis:'Наставник',int:'Стратег'})[v]+'.',choiceSaved:true,otherStyleEffectsPending:true};
 }
 if(id==='warlord-chooseAcademy'){
  var pick=subs.find(function(x){return x.id===ctx.academy||x.name===ctx.academy;});if(!pick)return fail('Выберите одну из 12 академий.');
  if(cls(h).subclass&&(!chosen(h)||chosen(h).id!==pick.id))return fail('Смена академии требует отдельной миграции.');
  cls(h).subclass=pick.name;sync(h);return {ok:true,message:'Военная академия: '+pick.name+'.'};
 }
 if(id==='warlord-chooseFightingStyle'){
  if(styles.indexOf(ctx.style)<0)return fail('Выберите зарегистрированный боевой стиль.');s.warlordFightingStyle=ctx.style;
  return {ok:true,choiceSaved:true,message:'Боевой стиль сохранён.',mechanicsPending:ctx.style!=='archery'};
 }
 if(id==='warlord-chooseExploits'){
  if(!Array.isArray(ctx.names)||ctx.names.length>s.warlordExploitKnown)return fail('Превышено число известных приёмов.');
  var selected=ctx.names.map(function(id){return exploits.find(function(x){return x.id===id||x.name===id;});});
  if(selected.some(function(x){return !x||Number(x.level)>l;})||new Set(selected.map(function(x){return x&&x.id;})).size!==selected.length)return fail('Недопустимый, повторный или слишком сложный приём.');
  s.warlordKnownExploits=selected.map(function(x){return x.id;});return {ok:true,choiceSaved:true,message:'Изученные приёмы сохранены.'};
 }
 if(id==='inspiringWord'){
  var hd=t&&hitDie(t,ctx);
  if(!B||!canAct(h)||!inRange(h,t,ctx)||!hd||hpMax(t)<=hp(t)||t.dead||t.instantDeath||t.deathSaves&&Number(t.deathSaves.failures)>=3||h.turnResources&&Number(h.turnResources.bonusAction)===0)return fail('Нужен раненый союзник в пределах дальности, его Кость Хитов и бонусное действие.');
  if(!spend(h,'warlordInspiringWord'))return fail('Вдохновляющее слово исчерпано.');
  var amount=Math.max(1,(l>=20?hd:B.rollDice('1d'+hd).total)+lead(h)),healing=B.heal(t,amount);
  h.turnResources=h.turnResources||{};h.turnResources.bonusAction=0;
  return {ok:true,healing:healing,target:t.id,message:'Вдохновляющее слово: восстановлено '+healing.amount+' HP.'};
 }
 if(id==='rallyingCry'){
  var sr=ctx.saveResult,stat=String(sr&&sr.stat||'').toLowerCase();
  if(!B||!canReact(h)||!inRange(h,t,ctx)||!sr||sr.success!==false||sr.completed===true||sr.autoFailed||!['str','dex','con','int','wis','cha'].includes(stat)||!Number.isFinite(Number(sr.dc)))return fail('Нужен текущий проваленный спасбросок союзника и реакция.');
  if(l<20&&!spend(h,'warlordRally'))return fail('Боевой клич исчерпан.');
  takeReaction(h);var reroll=B.savingThrow(t,stat,Number(sr.dc),'normal',{extraSaveBonus:lead(h),halfDamageEffect:ctx.halfDamageEffect===true});Object.assign(sr,reroll);sr.warlordRally=true;
  return {ok:true,saveResult:sr,message:sr.success?'Боевой клич: спасбросок успешен.':'Боевой клич: новый спасбросок провален.'};
 }
 // A current unfinished roll gets at most one learned Exploit, keyed in saved state.
 if(exploits.some(function(x){return x.id===id;})&&!known(h,id))return fail('Приём не изучен.');
 if(id==='tacticalSkill'||id==='heroicWill'||id==='heroicFortitude'){
  var save=id!=='tacticalSkill',roll=save?ctx.saveResult:ctx.checkResult,allowed=id==='heroicWill'?['int','wis','cha']:['str','dex','con'];
  if(!B||!canAct(h)||!roll||roll.completed===true||!Number.isFinite(Number(roll.total))||!trigger(h,ctx)||(!save&&ctx.proficient!==true)||(save&&(!canReact(h)||allowed.indexOf(roll.stat)<0||roll.autoFailed||!Number.isFinite(Number(roll.dc)))))return fail('Нужен подходящий незавершённый бросок и его triggerId.');
  if(!spend(h,'warlordExploitDice'))return fail('Нет костей тактических приёмов.');var add=B.rollDice('1'+die(h)).total;markTrigger(h,ctx);roll.total=Number(roll.total)+add;if(save){roll.success=roll.total>=Number(roll.dc);takeReaction(h);}
  return {ok:true,bonus:add,rollResult:roll,message:'К текущему броску добавлено '+add+'.'};
 }
 if(id==='parry'){
  var attack=ctx.attackResult;
  if(!B||!canReact(h)||!trigger(h,ctx)||ctx.pendingAttack!==true||ctx.visible===false||!attack||attack.critical||attack.hit!==true||!Number.isFinite(Number(attack.total))||!Number.isFinite(Number(attack.ac)))return fail('Нужна подходящая видимая входящая атака до урона и реакция.');
  if(!spend(h,'warlordExploitDice'))return fail('Нет костей тактических приёмов.');var ac=B.rollDice('1'+die(h)).total;markTrigger(h,ctx);takeReaction(h);attack.ac=Number(attack.ac)+ac;attack.hit=Number(attack.total)>=attack.ac;
  return {ok:true,acBonus:ac,attackResult:attack,message:'Парирование: КД против этой атаки увеличен на '+ac+'.'};
 }
 if(id==='attackOrder'){
  var enemy=ctx.enemy,weapon=ctx.weapon;
  if(!B||!canAct(h)||!inRange(h,t,ctx)||!canReact(t)||!enemy||!weapon||!/^\d+d\d+(?:\s*[+-]\s*\d+)?$/i.test(String(weapon.damageDice||''))||!Number.isFinite(ctx.enemyDistanceFt)||ctx.enemyDistanceFt<0||ctx.enemyDistanceFt>(Number(weapon.rangeFt)||5)||ctx.inAttackAction!==true||ctx.attackReplaced!==true||!trigger(h,ctx))return fail('Нужны заменяемая атака, союзник с реакцией, оружие и цель в его досягаемости.');
  if(!spend(h,'warlordExploitDice'))return fail('Нет костей тактических приёмов.');markTrigger(h,ctx);takeReaction(t);
  var result=B.attack(t,enemy,{weapon:weapon,damage:weapon.damageDice,damageType:weapon.damageType,weaponAttack:true});return {ok:true,attack:result,message:'Приказ к атаке: союзник совершил оружейную атаку реакцией.'};
 }
 return fail();
}
function attack(h,ctx){sync(h);var s=state(h),r={extraAttacks:level(h)>=5?2:1,notes:[]};if(s.warlordFightingStyle==='archery'&&ctx.rangedAttack){r.bonusAttack=1;if(ctx.coverBonus===2)r.ignoreCover=true;}return r;}
function saveMod(h,ctx){return {advantage:level(h)>=10&&['charmed','frightened','stunned','Очарован','Испуган','Оглушён'].indexOf(ctx.saveType)>=0,notes:[]};}
function initiative(h,ctx){
 if(!available(h,'tacticalSuperiority')||!ctx||ctx.initiativeRoll!==true||!ctx.encounterId)return fail('Нужна новая инициатива конкретного боя.');sync(h);var s=state(h);if(s.warlordInitiativeEncounter===String(ctx.encounterId))return fail('Ресурсы для этой инициативы уже восстановлены.');
 s.warlordInitiativeEncounter=String(ctx.encounterId);['warlordInspiringWord','warlordRally'].forEach(function(id){var r=h.resources[id];r.current=Math.min(r.max,r.current+1);});return {ok:true,message:'Тактическое превосходство: восстановлено по одному использованию.'};
}
function rest(h,type){sync(h);if(type==='short'||type==='long'){state(h).warlordUsedTriggers={};delete state(h).warlordInitiativeEncounter;}}
var pack={id:ID,name:NAME,aliases:['Warlord'],source:P.source,license:old.license,authoritativeSubclasses:true,subclassLevel:3,features:features,subclasses:subs,
 hooks:{sync:sync,useFeature:use,attackModifiers:attack,saveModifiers:saveMod,rest:rest},metadata:{status:'implemented_partial_runtime',hitDie:8,savingThrows:['wisdom','charisma'],subclassFeatureLevels:[3,6,14,18]}};
Object.keys(P.levels).forEach(function(l){P.levels[l].features=P.levels[l].features.map(function(n){return n.includes(' — ')?n.split(' — ').slice(1).join(' — '):n;});});
D.registerClass(pack);P.status='implemented_partial_runtime';P.mechanics.status='implemented_partial_runtime';P.mechanics.notes='Выбран Laserllama v3.3.0; исполняемые эффекты и остаток в аудите. Каталог не означает готовность всех приёмов/академий.';
var ref={hitDie:8,primaryStat:P.primaryStat,savingThrows:P.savingThrows.slice(),progression:{levels:P.levels},source:P.source,contentPackId:ID,subclassLevel:3};
g.SUBCLASSES_REFERENCE=g.SUBCLASSES_REFERENCE||{};
[NAME,'Warlord'].forEach(function(name){g.CLASSES_REFERENCE[name]=ref;g.SUBCLASSES_REFERENCE[name]={};subs.forEach(function(s){var levels={};s.features.forEach(function(f){levels[f.level]=levels[f.level]||{features:[]};levels[f.level].features.push(f.name);});g.SUBCLASSES_REFERENCE[name][s.name]={source:P.source,pickLevel:3,levels:levels,description:'Военная академия: '+s.name};});});
if(Array.isArray(g.DND_CLASSES_LIST)){var index=g.DND_CLASSES_LIST.findIndex(function(x){return x.name==='Warlord';});if(index>=0)g.DND_CLASSES_LIST.splice(index,1);}
g.MULTICLASS_CLASS_REQUIREMENTS=g.MULTICLASS_CLASS_REQUIREMENTS||{};g.MULTICLASS_CLASS_REQUIREMENTS[NAME]=g.MULTICLASS_CLASS_REQUIREMENTS.Warlord={any:[['strength',13],['dexterity',13]],mentalAny:[['intelligence',13],['wisdom',13],['charisma',13]]};
g.WARLORD_LASERLLAMA_V330={VERSION:'1.0.0-audit',sync:sync,useFeature:use,initiative:initiative,rest:rest,exploits:exploits.map(function(x){return {id:x.id,name:x.name,level:x.level};}),academies:subs.map(function(x){return {id:x.id,name:x.name};})};
})(window);
