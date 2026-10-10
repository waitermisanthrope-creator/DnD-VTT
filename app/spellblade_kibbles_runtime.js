/** Partial Spellblade integration. Executes saved single-target damage spells,
 * never substitutes fixed damage for a selected spell; full techniques remain pending. */
(function(g){
'use strict';
var D=g.DNDContent,old=D&&D.getClass('Spellblade'),catalog=g.KIBBLES_SOURCE_CATALOG,NAME='Заклинатель клинка',ID='kibbles-spellblade';
if(!old||!catalog)return;
var subs=catalog.subclasses.Spellblade.map(function(x){var s=old.subclasses.find(function(v){return v.name===x[0];});return s&&Object.assign({},s,{name:x[1],description:x[2]});}).filter(Boolean);
var features=[{id:'arcaneSurge',name:'Арканный рывок',level:1,action:'bonus',description:'Подготовить преимущество следующей атаки за арканный ресурс.'},
 {id:'spellstrike',name:'Заклинательный удар',level:2,action:'bonus',description:'Подготовить выбранное сохранённое заклинание для следующей оружейной атаки.'},
 {id:'arcaneGuard',name:'Арканная защита (проектный вариант)',level:2,action:'bonus',description:'Совместимый проектный эффект: временные HP 5 + уровень; не полная книжная Эгида.'},
 {id:'spellbladeDeflection',name:'Арканное отражение',level:2,action:'reaction',description:'Потратить ячейку 1 круга на Щит против текущей атаки.'},
 {id:'spellblade-chooseTechnique',name:'Выбор техники клинка',level:3,action:'choice'}];
(catalog.core.Spellblade||[]).forEach(function(x){if(!/Spellstrike|Арканный рывок|Арканное отражение|Техника заклинателя/.test(x[1]))features.push({id:'spellblade-source-'+x[0]+'-'+x[1],name:x[1],level:x[0],action:x[3],description:x[2]});});
function cls(h){return (h&&h.classes||[]).find(function(c){return [NAME,'Spellblade'].indexOf(String(c.name))>=0;});}
function level(h){var c=cls(h);return c?Math.min(20,Math.max(0,Math.floor(Number(c.level))||0)):0;}
function state(h){h.classFeaturesState=h.classFeaturesState||{};return h.classFeaturesState.spellblade=h.classFeaturesState.spellblade||{};}
function score(h){var a=h.abilityScores||h.stats||{};return Number(a.int!=null?a.int:a.intelligence)||10;}
function hp(h){return Number(h.hpCurrent!=null?h.hpCurrent:h.hp&&typeof h.hp==='object'?h.hp.current:h.hp)||0;}
function canAct(h){return hp(h)>0&&![h.conditions,h.activeConditions].some(function(m){return m&&Object.keys(m).some(function(k){var key=g.DNDRules&&g.DNDRules.normalizeConditionName?g.DNDRules.normalizeConditionName(k):k;return m[k]&&['Недееспособен','Оглушён','Парализован','Бессознателен','Окаменел'].indexOf(key)>=0;});});}
function canReact(h){return canAct(h)&&!(h.turnResources&&(h.turnResources.reaction===false||Number(h.turnResources.reaction)===0));}
function chosen(h){var c=cls(h);return c&&subs.find(function(x){return x.id===c.subclass||x.name===c.subclass;});}
function available(h,id){return !!(D.resolveFeature&&D.resolveFeature(h,id,NAME));}
function fail(message){return {ok:false,unsupported:true,message:message||'Исполнение этой особенности Заклинателя клинка ещё не подключено.'};}
function sync(h){
 var l=level(h);if(!l)return;var s=state(h),legacy=catalog.subclasses.Spellblade.find(function(x){return x[0]===cls(h).subclass;});if(legacy){s.legacyTechnique=cls(h).subclass;cls(h).subclass=legacy[1];}
 var total=(h.classes||[]).reduce(function(n,c){return n+(Number(c.level)||0);},0),pb=Math.floor((total-1)/4)+2,max=Math.max(2,pb);
 h.resources=h.resources||{};var r=h.resources.arcaneSurges;if(!r)r=h.resources.arcaneSurges={max:max,current:max};else {var spent=Math.max(0,(Number(r.max)||0)-(Number(r.current)||0));r.max=max;r.current=Math.max(0,max-spent);}r.recharge='short';
 s.attackBonus=pb+Math.floor((score(h)-10)/2);s.saveDC=8+s.attackBonus;s.technique=chosen(h)?chosen(h).id:null;
 h.spellcastingSources=Array.isArray(h.spellcastingSources)?h.spellcastingSources:[];
 if(!h.spellcastingSources.some(function(x){return x.className===cls(h).name;}))h.spellcastingSources.push({className:cls(h).name,ability:'int'});
 if(g.DNDMagic)g.DNDMagic.rebuild(h);
 if(s.shieldExpiresAt&&s.shieldExpiresAt<=Date.now()){delete s.shieldExpiresAt;delete s.shieldActive;}
 if(s.prepared&&s.prepared.expiresAt<=Date.now())delete s.prepared;
}
function slot(h,n){var r=h.spellSlotsData&&h.spellSlotsData[n];return r&&Number(r.max)>Number(r.used||0)?r:null;}
function formula(s){return typeof s==='string'&&/^\d+d(?:4|6|8|10|12)(?:\s*[+-]\s*\d+)?$/i.test(s.trim());}
function prepare(h,ctx){
 var s=state(h),B=g.DNDCombat,sp=(h.spellsData||[]).find(function(x){return x.name===ctx.spellName&&[NAME,'Spellblade'].indexOf(x.castingClass)>=0;});
 if(!B||!canAct(h)||s.prepared||!sp||Number(sp.level)<0||!Number.isInteger(Number(sp.level))||!formula(sp.damage)||!sp.damageType||sp.concentration||sp.aoe||sp.aoeShape||sp.heal||sp.conditions||sp.condition||!/^((1\s+)?action|(1\s+)?действие)$/i.test(String(sp.castingTime||''))||(sp.castingStat&&sp.castingStat!=='int')||(!sp.attackType&&!sp.savingThrow)||h.turnResources&&Number(h.turnResources.bonusAction)===0)return fail('Выберите поддержанное сохранённое заклинание своего класса: одиночный урон, действие, без концентрации/области/дополнительных состояний.');
 var base=Number(sp.level),n=ctx.slotLevel==null?base:Number(ctx.slotLevel),maxSpell=level(h)>=17?5:level(h)>=13?4:level(h)>=9?3:level(h)>=5?2:1;
 if(!Number.isInteger(n)||n<base||n>maxSpell||(base===0&&(level(h)<5||n!==0))||(base>0&&n<1))return fail('Круг или заговор недоступен для Заклинательного удара.');
 if(sp.savingThrow&&!['str','dex','con','int','wis','cha'].includes(String(sp.savingThrow)))return fail('Не поддержан тип спасброска этого заклинания.');
 if(n>base&&!formula(sp.upcastDamagePerSlot))return fail('Не задано исполняемое усиление заклинания для повышенной ячейки.');
 var r=n>0?slot(h,n):null;if(n>0&&!r)return fail('Нет ячейки выбранного круга.');if(!(Number(h.resources.arcaneSurges.current)>0))return fail('Нет арканных рывков.');
 var expr=sp.damage;if(n>base)for(var i=base;i<n;i++)expr+='+'+sp.upcastDamagePerSlot;
 if(r)r.used=Number(r.used||0)+1;h.resources.arcaneSurges.current--;h.turnResources=h.turnResources||{};h.turnResources.bonusAction=0;
 s.prepared={spellName:sp.name,level:base,slotLevel:n,damage:expr,damageType:sp.damageType,savingThrow:sp.savingThrow||null,attackType:sp.attackType||null,halfOnSave:sp.halfOnSave===true,saveDC:s.saveDC,expiresAt:Date.now()+60000};
 return {ok:true,reserved:true,prepared:true,spellName:sp.name,message:'Заклинательный удар подготовлен: '+sp.name+'. Магия исполнится при следующем оружейном попадании.'};
}
function use(h,id,ctx){
 ctx=ctx||{};if(!available(h,id))return {ok:false,unavailable:true,message:'Способность недоступна текущему уровню/технике.'};sync(h);var s=state(h),B=g.DNDCombat;
 if(id==='spellblade-chooseTechnique'){
  var pick=subs.find(function(x){return x.id===ctx.technique||x.name===ctx.technique;});if(!pick)return fail('Выберите одну из шести техник.');
  if(cls(h).subclass&&(!chosen(h)||chosen(h).id!==pick.id))return fail('Смена техники требует отдельной миграции.');cls(h).subclass=pick.name;sync(h);return {ok:true,message:'Техника: '+pick.name+'.'};
 }
 if(id==='spellstrike')return prepare(h,ctx);
 if(id==='arcaneSurge'){
  if(ctx.mode!=='attack'||!canAct(h)||s.surgeAttack||h.turnResources&&Number(h.turnResources.bonusAction)===0)return fail('Поддержан рывок для преимущества следующей атаки; требуется бонусное действие.');
  if(Number(h.resources.arcaneSurges.current)<1)return fail('Нет арканных рывков.');h.resources.arcaneSurges.current--;s.surgeAttack=true;h.turnResources=h.turnResources||{};h.turnResources.bonusAction=0;
  return {ok:true,prepared:true,message:'Арканный рывок: следующая атака с преимуществом.'};
 }
 if(id==='arcaneGuard'){
  if(!B||!canAct(h)||h.turnResources&&Number(h.turnResources.bonusAction)===0)return fail('Нужно доступное бонусное действие.');
  var temp=B.grantTemporaryHitPoints(h,5+level(h));h.turnResources=h.turnResources||{};h.turnResources.bonusAction=0;return {ok:true,tempHP:temp,projectVariant:true,message:'Проектная арканная защита: временные HP '+temp.tempHp+'.'};
 }
 if(id==='spellbladeDeflection'){
  var a=ctx.attackResult,r=slot(h,1);
  if(!B||!canReact(h)||!r||s.shieldActive||ctx.pendingAttack!==true||ctx.visible===false||!a||!a.hit||a.critical||!Number.isFinite(Number(a.ac)))return fail('Нужна видимая входящая атака, реакция и ячейка 1 круга.');
  r.used=Number(r.used||0)+1;h.turnResources=h.turnResources||{};h.turnResources.reaction=0;s.shieldActive=true;s.shieldExpiresAt=Date.now()+60000;
  a.ac=Number(a.ac)+5;a.hit=Number(a.total)>=a.ac;return {ok:true,acBonus:5,attackResult:a,message:'Арканное отражение: Щит даёт +5 КД до следующего хода.'};
 }
 return fail();
}
function takeAttack(h,target,opts){
 if(!available(h,'spellstrike'))return null;sync(h);var s=state(h),p=s.prepared;if(!p||!target||opts.__perfumeCancelled||!opts.weaponAttack||!formula(opts.damage||opts.weapon&&opts.weapon.damageDice))return null;
 if(opts.deferDamage){opts.__spellbladeDeferred=true;return null;}
 // Retain the paid reservation until a valid attack context actually arrives.
 var c=chosen(h),range=Number(opts.weapon&&opts.weapon.rangeFt)||5;
 if(range>5&&(!c||c.id!=='spellshot'))return null;
 if(!Number.isFinite(opts.distanceFt)||opts.distanceFt<0||opts.distanceFt>range)return null;
 if(!opts.damage)opts.damage=opts.weapon.damageDice;delete s.prepared;return p;
}
function completeAttack(h,target,reservation,result){
 if(!reservation)return null;if(!result.hit)return {ok:true,spellName:reservation.spellName,missed:true,message:'Оружейный удар промахнулся; подготовка израсходована без магического урона.'};
 var B=g.DNDCombat,save=reservation.savingThrow?B.savingThrow(target,reservation.savingThrow,reservation.saveDC,'normal',{fromSpell:true,halfDamageEffect:reservation.halfOnSave}):null;
 var damage=B.rollDice(reservation.damage,!save&&result.critical),amount=damage.total;
 if(save&&save.success)amount=reservation.halfOnSave?(save.mettle||save.evasion?0:Math.floor(amount/2)):0;
 return {ok:true,rollResolved:true,amount:amount,damageType:reservation.damageType,spellName:reservation.spellName,save:save,damageRoll:damage};
}
function attack(h){sync(h);return {advantage:!!state(h).surgeAttack,notes:state(h).surgeAttack?['Арканный рывок']:[]};}
function afterAttack(h,ctx){if(ctx&&ctx.attackResult&&ctx.attackResult.d20!=null)delete state(h).surgeAttack;}
function incomingAC(h){if(!available(h,'spellbladeDeflection'))return 0;var s=state(h);return s.shieldActive&&s.shieldExpiresAt>Date.now()?5:0;}
function clear(h){var s=state(h);delete s.prepared;delete s.surgeAttack;}
function start(h){sync(h);delete state(h).shieldActive;delete state(h).shieldExpiresAt;}
function rest(h,type){sync(h);if(type==='short'||type==='long'){clear(h);delete state(h).shieldActive;delete state(h).shieldExpiresAt;}if(type==='long')Object.keys(h.spellSlotsData||{}).forEach(function(k){h.spellSlotsData[k].used=0;});}
var pack={id:ID,name:NAME,aliases:['Spellblade'],source:old.source,license:old.license,authoritativeSubclasses:true,subclassLevel:3,features:features,subclasses:subs,
 hooks:{sync:sync,useFeature:use,attackModifiers:attack,onAttackResult:afterAttack,startTurn:start,onTurnEnd:clear,rest:rest},metadata:{status:'implemented_partial_runtime',hitDie:10,savingThrows:['dexterity','intelligence'],subclassFeatureLevels:[3,7,15,20]}};
D.registerClass(pack);
var levels={};for(var l=1;l<=20;l++)levels[l]={features:[],asi:[4,8,12,16,19].includes(l)};features.forEach(function(f){levels[f.level].features.push(f.name);});levels[3].subclassLevel=true;
var P={className:NAME,englishName:'Spellblade',hitDie:10,primaryStat:'intelligence',savingThrows:['dexterity','intelligence'],source:old.source,status:'implemented_partial_runtime',subclassLevel:3,subclassFeatureLevels:[3,7,15,20],levels:levels};
g.spellbladeProgression=P;var ref={hitDie:10,primaryStat:'intelligence',savingThrows:P.savingThrows,progression:{levels:levels},subclassLevel:3,source:P.source,contentPackId:ID};
g.SUBCLASSES_REFERENCE=g.SUBCLASSES_REFERENCE||{};[NAME,'Spellblade'].forEach(function(name){g.CLASSES_REFERENCE[name]=ref;g.SUBCLASSES_REFERENCE[name]={};subs.forEach(function(x){var ls={};x.features.forEach(function(f){ls[f.level]=ls[f.level]||{features:[]};ls[f.level].features.push(f.name);});g.SUBCLASSES_REFERENCE[name][x.name]={source:P.source,pickLevel:3,levels:ls,description:x.description};});});
if(Array.isArray(g.DND_CLASSES_LIST)){var row=g.DND_CLASSES_LIST.find(function(x){return x.name==='Spellblade';});if(row){row.name=NAME;row.displayName=NAME;row.desc='Заклинатель клинка: оружие, арканные рывки и магия.';}}
g.SPELLBLADE_RUNTIME={VERSION:'1.0.0-audit',sync:sync,useFeature:use,takeAttack:takeAttack,completeAttack:completeAttack,incomingAC:incomingAC,rest:rest,techniques:subs.map(function(x){return {id:x.id,name:x.name};})};
})(window);
