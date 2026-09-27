/**
 * monster_engine.js
 * ------------------------------------------------------------------
 * ЧТО ЭТО ЗА ФАЙЛ:
 * Monster/Statblock Engine 2.0 и Encounter Builder 2.0 для D&D 5e 2014.
 * Добавляет структурированные statblock'и, действия, Multiattack,
 * Saving Throw actions, Recharge, Legendary Actions/Resistance,
 * расчёт XP/сложности и запуск encounter в существующий initiative tracker.
 *
 * КАК РАБОТАЕТ:
 * - monster templates хранятся в DNDMonsters.catalog;
 * - encounter хранится в currentChar.encounters;
 * - перед запуском encounter строится сводка XP и сложности;
 * - при запуске каждый statblock копируется в initiativeTracker;
 * - DNDMonsterEngine.resolveAction() выполняет атаку или saving throw;
 * - rechargeActions() восстанавливает способности по броску d6 в начале хода.
 *
 * ОСНОВНЫЕ ПЕРЕМЕННЫЕ:
 * DNDMonsters.catalog, currentChar.encounters, currentChar.initiativeTracker,
 * combatant.actions, combatant.recharge, combatant.legendaryActions,
 * combatant.legendaryResistances, combatant.cr, combatant.xp.
 *
 * НЕ ИЗМЕНЯЕТ Wallpapers.js/Ambiences.js.
 * ------------------------------------------------------------------
 */
(function(global){
  'use strict';
  var XP_BY_CR={'0':10,'1/8':25,'1/4':50,'1/2':100,'1':200,'2':450,'3':700,'4':1100,'5':1800,'6':2300,'7':2900,'8':3900,'9':5000,'10':5900,'11':7200,'12':8400,'13':10000,'14':11500,'15':13000,'16':15000,'17':18000,'18':20000,'19':22000,'20':25000,'21':33000,'22':41000,'23':50000,'24':62000,'25':75000,'26':90000,'27':105000,'28':120000,'29':135000,'30':155000};
  var THRESHOLDS={1:[25,50,75,100],2:[50,100,150,200],3:[75,150,225,400],4:[125,250,375,500],5:[250,500,750,1100],6:[300,600,900,1400],7:[350,750,1100,1700],8:[450,900,1400,2100],9:[550,1100,1600,2400],10:[600,1200,1900,2800],11:[800,1600,2400,3600],12:[1000,2000,3000,4500],13:[1100,2200,3400,5100],14:[1250,2500,3800,5700],15:[1400,2800,4300,6400],16:[1600,3200,4800,7200],17:[2000,3900,5900,8800],18:[2100,4200,6300,9500],19:[2400,4900,7300,10900],20:[2800,5700,8500,12700]};
  var MULTIPLIER=[1,1.5,2,2.5,3,4,5];
  var CATALOG={
    'Гоблин':{name:'Гоблин',cr:'1/4',xp:50,ac:15,hp:7,maxHp:7,initiative:2,speed:30,abilities:{str:8,dex:14,con:10,int:10,wis:8,cha:8},actions:[{name:'Скимитар',kind:'attack',bonus:4,damage:'1d6+2',damageType:'рубящий'},{name:'Короткий лук',kind:'attack',bonus:4,damage:'1d6+2',damageType:'колющий'}]},
    'Орк':{name:'Орк',cr:'1/2',xp:100,ac:13,hp:15,maxHp:15,initiative:1,speed:30,abilities:{str:16,dex:12,con:16,int:7,wis:11,cha:10},actions:[{name:'Секира',kind:'attack',bonus:5,damage:'1d12+3',damageType:'рубящий'},{name:'Агрессивность',kind:'utility',description:'Бонусным действием движется к враждебному существу.'}]},
    'Скелет':{name:'Скелет',cr:'1/4',xp:50,ac:13,hp:13,maxHp:13,initiative:2,speed:30,abilities:{str:10,dex:14,con:15,int:6,wis:8,cha:5},resistances:['яд'],immunities:['истощение','яд'],actions:[{name:'Короткий меч',kind:'attack',bonus:4,damage:'1d6+2',damageType:'колющий'},{name:'Короткий лук',kind:'attack',bonus:4,damage:'1d6+2',damageType:'колющий'}]},
    'Зомби':{name:'Зомби',cr:'1/4',xp:50,ac:8,hp:22,maxHp:22,initiative:-2,speed:20,abilities:{str:13,dex:6,con:16,int:3,wis:6,cha:5},immunities:['яд'],actions:[{name:'Удар',kind:'attack',bonus:3,damage:'1d6+1',damageType:'дробящий'}],legendaryResistances:0},
    'Волк':{name:'Волк',cr:'1/4',xp:50,ac:13,hp:11,maxHp:11,initiative:2,speed:40,abilities:{str:12,dex:15,con:12,int:3,wis:12,cha:6},actions:[{name:'Укус',kind:'attack',bonus:4,damage:'2d4+2',damageType:'колющий',save:{stat:'str',dc:11,onFail:'Сбит с ног'}}]},
    'Огр':{name:'Огр',cr:'2',xp:450,ac:11,hp:59,maxHp:59,initiative:-1,speed:40,abilities:{str:19,dex:8,con:16,int:5,wis:7,cha:7},actions:[{name:'Дубина',kind:'attack',bonus:6,damage:'2d8+4',damageType:'дробящий'},{name:'Дротик',kind:'attack',bonus:6,damage:'2d6+4',damageType:'колющий'}]},
    'Вождь хобгоблинов':{name:'Вождь хобгоблинов',cr:'1/2',xp:100,ac:18,hp:39,maxHp:39,initiative:1,speed:30,abilities:{str:16,dex:14,con:14,int:11,wis:10,cha:13},actions:[{name:'Мультиатака',kind:'multiattack',count:2,with:['Длинный меч','Длинный лук']},{name:'Длинный меч',kind:'attack',bonus:4,damage:'1d8+2',damageType:'рубящий'},{name:'Длинный лук',kind:'attack',bonus:4,damage:'1d8+2',damageType:'колющий'}],legendaryResistances:0}
  };
  function clone(o){return JSON.parse(JSON.stringify(o));}
  function n(v,d){var x=Number(v);return isFinite(x)?x:(d||0);}
  function xpFor(cr){return XP_BY_CR[String(cr)]||0;}
  function partyLevelCounts(heroLevels){var c={};(heroLevels||[]).forEach(function(l){l=Math.max(1,Math.min(20,n(l,1)));c[l]=(c[l]||0)+1;});return c;}
  function thresholdFor(levels){var out=[0,0,0,0];partyLevelCounts(levels);(levels||[]).forEach(function(l){var t=THRESHOLDS[Math.max(1,Math.min(20,n(l,1)))]||THRESHOLDS[1];for(var i=0;i<4;i++)out[i]+=t[i];});return out;}
  function adjustedXp(raw,partySize,monsterCount){var idx=monsterCount<=1?0:monsterCount===2?1:monsterCount<=6?2:monsterCount<=10?3:monsterCount<=14?4:monsterCount<=18?5:6;var m=MULTIPLIER[idx]||1;if(partySize<3&&m<5)m=Math.min(5,m*2);if(partySize>=6&&m>1)m=Math.max(1,m-0.5);return Math.round(raw*m);}
  function difficulty(adjusted,thresholds){if(adjusted<thresholds[0])return 'Тривиально ниже Easy';if(adjusted<thresholds[1])return 'Easy';if(adjusted<thresholds[2])return 'Medium';if(adjusted<thresholds[3])return 'Hard';return 'Deadly';}
  function score(encounter,levels){var cs=(encounter&&encounter.combatants)||[];var raw=cs.reduce(function(s,c){return s+n(c.xp,xpFor(c.cr));},0);var adj=adjustedXp(raw,(levels||[]).length,cs.length);var th=thresholdFor(levels||[1]);return {rawXp:raw,adjustedXp:adj,multiplier:raw?adj/raw:1,thresholds:th,difficulty:difficulty(adj,th),monsterCount:cs.length};}
  function abilityMod(v){return Math.floor((n(v,10)-10)/2);}
  function savingAction(target,action){var stat=action.save&&action.save.stat||'dex',dc=n(action.save&&action.save.dc,10),r=global.DNDRules&&global.DNDRules.rollD20?global.DNDRules.rollD20('normal'):{result:Math.floor(Math.random()*20)+1};var bonus=global.DNDRules&&target.stats?global.DNDRules.getSaveBonus(target,stat):abilityMod(target.abilities&&target.abilities[stat]);return {roll:r.result,bonus:bonus,total:r.result+bonus,dc:dc,success:r.result+bonus>=dc,stat:stat};}
  function resolveAction(actor,target,action){action=action||{};if(action.kind==='save'){var s=savingAction(target,action);if(!s.success&&action.onFail&&global.DNDCombat)global.DNDCombat.toggleCondition(target,action.onFail,true);return {type:'save',save:s};}if(action.kind==='attack'){var r=global.DNDCombat.attack(actor,target,{bonus:n(action.bonus),damage:action.damage||'1d6',damageType:action.damageType||'',target:target});return {type:'attack',action:action.name,result:r};}if(action.kind==='multiattack'){var attacks=[];(action.with||[]).forEach(function(name){var a=(actor.actions||[]).find(function(x){return x.name===name&&x.kind==='attack';});if(a)attacks.push({bonus:n(a.bonus),damage:a.damage||'1d6',damageType:a.damageType||'',target:target});});var seq=global.DNDCombat&&global.DNDCombat.attackSequence?global.DNDCombat.attackSequence(actor,target,attacks,{stopOnDefeat:true}):{attacks:attacks.map(function(a){return global.DNDCombat.attack(actor,target,a);})};return {type:'multiattack',results:seq.attacks,attackCount:seq.attackCount,hitCount:seq.hitCount,targetDefeated:seq.targetDefeated};}return {type:'utility',description:action.description||''};}
  function ensureResourceState(monster){
    if(!monster)return null;
    monster.rechargeState=monster.rechargeState||{};
    (monster.actions||[]).forEach(function(a){if(a&&a.recharge){var key=String(a.id||a.name||'recharge');if(monster.rechargeState[key]==null)monster.rechargeState[key]={available:a.available!==false,lastRoll:null,lastAttemptRound:0};a.available=monster.rechargeState[key].available!==false;}});
    if(monster.legendaryActions!=null){monster.legendaryActionMax=n(monster.legendaryActions,0);if(monster.legendaryActionCurrent==null)monster.legendaryActionCurrent=monster.legendaryActionMax;}
    if(monster.legendaryResistances!=null){monster.legendaryResistanceMax=n(monster.legendaryResistances,0);if(monster.legendaryResistanceCurrent==null)monster.legendaryResistanceCurrent=monster.legendaryResistanceMax;}
    if(monster.lairActions)monster.lairActionState=monster.lairActionState||{usedThisRound:false,lastRound:0};
    return monster;
  }
  function rechargeActions(monster,round,roller){
    ensureResourceState(monster);var list=monster.actions||[],results=[];
    list.forEach(function(a){if(!a||!a.recharge)return;var key=String(a.id||a.name||'recharge'),st=monster.rechargeState[key]||(monster.rechargeState[key]={available:a.available!==false,lastRoll:null,lastAttemptRound:0});
      if(st.available!==false){a.available=true;return;}
      var r=typeof roller==='function'?Number(roller(a,monster)):(Math.floor(Math.random()*6)+1),ok=r>=n(a.recharge.min,6);st.lastRoll=r;st.lastAttemptRound=n(round,0);st.available=ok;a.available=ok;results.push({actionId:key,name:a.name||key,roll:r,required:n(a.recharge.min,6),recharged:ok});
    });
    return results;
  }
  function startTurn(monster,round,roller){
    if(!monster||monster.type==='hero')return {ok:false,error:'Не monster combatant.'};
    ensureResourceState(monster);var recharge=rechargeActions(monster,round,roller);
    if(monster.legendaryActions!=null)monster.legendaryActionCurrent=n(monster.legendaryActionMax,monster.legendaryActions);
    return {ok:true,recharge:recharge,legendaryActions:n(monster.legendaryActionCurrent,0),legendaryResistances:n(monster.legendaryResistanceCurrent,monster.legendaryResistances)};
  }
  function consumeLegendaryAction(monster,cost){ensureResourceState(monster);cost=Math.max(1,n(cost,1));if(n(monster.legendaryActionCurrent,0)<cost)return {ok:false,error:'Недостаточно legendary actions.'};monster.legendaryActionCurrent-=cost;return {ok:true,remaining:monster.legendaryActionCurrent};}
  function consumeLegendaryResistance(monster){ensureResourceState(monster);if(n(monster.legendaryResistanceCurrent,0)<=0)return {ok:false,error:'Нет legendary resistance.'};monster.legendaryResistanceCurrent--;return {ok:true,remaining:monster.legendaryResistanceCurrent};}
  function resetLairRound(monster,round){if(!monster||!monster.lairActions)return false;ensureResourceState(monster);monster.lairActionState.usedThisRound=false;monster.lairActionState.lastRound=n(round,0);return true;}
  function consumeLairAction(monster,round){if(!monster||!monster.lairActions)return {ok:false,error:'У существа нет lair action.'};ensureResourceState(monster);if(n(monster.lairActionState.lastRound,0)!==n(round,0))resetLairRound(monster,round);if(monster.lairActionState.usedThisRound)return {ok:false,error:'Lair action уже использован в этом раунде.'};monster.lairActionState.usedThisRound=true;return {ok:true,round:n(round,0)};}
  function addCopies(encounter,template,count){for(var i=0;i<count;i++){var c=clone(template);c.id='mon_'+Date.now()+'_'+Math.random().toString(36).slice(2,8);c.name=template.name+(count>1?' #'+(i+1):'');c.xp=n(template.xp,xpFor(template.cr));c.tempHp=0;c.defeated=false;c.conditions={};c.deathSaves={successes:0,failures:0};ensureResourceState(c);encounter.combatants.push(c);}}
  global.DNDMonsters={VERSION:'2.1.0',catalog:CATALOG,xpFor:xpFor,calculateEncounter:score,resolveAction:resolveAction,rechargeActions:rechargeActions,ensureResourceState:ensureResourceState,startTurn:startTurn,consumeLegendaryAction:consumeLegendaryAction,consumeLegendaryResistance:consumeLegendaryResistance,resetLairRound:resetLairRound,consumeLairAction:consumeLairAction,clone:clone};
  function hero(){return global.currentChar||global.currentCharacter||null;}
  function save(){if(typeof global.autoSaveCurrentCharacter==='function')global.autoSaveCurrentCharacter();}
  function ensure(){var h=hero();if(!h)return null;if(!Array.isArray(h.encounters))h.encounters=[];return h;}
  function current(){var h=ensure();if(!h)return null;if(!h.encounters.length)h.encounters.push({id:'enc_'+Date.now(),name:'Новый encounter',combatants:[]});return h.encounters[h.encounters.length-1];}
  function levels(){var h=hero();if(!h)return [1];if(Array.isArray(h.classes)&&h.classes.length)return h.classes.map(function(c){return n(c.level,c.lvl||1);});if(Array.isArray(h.classLevels)&&h.classLevels.length)return h.classLevels.map(n);return [n(h.level,1)];}
  function esc(v){return String(v==null?'':v).replace(/[&<>\"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
  function renderV2(){var host=document.getElementById('dndCombatV3');if(!host)return;var old=document.getElementById('dndEncounterV2');if(old)old.remove();var box=document.createElement('div');box.id='dndEncounterV2';box.className='card';box.innerHTML='<h3>🐉 Monster / Encounter 2.0</h3><div style="display:grid;grid-template-columns:1fr 1fr;gap:6px"><select id="dndMonsterV2Preset"><option value="">— выбрать монстра —</option>'+Object.keys(CATALOG).map(function(k){return '<option value="'+esc(k)+'">'+esc(k)+' · CR '+esc(CATALOG[k].cr)+'</option>';}).join('')+'</select><input id="dndMonsterV2Count" type="number" min="1" value="1" placeholder="Количество"></div><button class="btn-action" style="width:100%;margin-top:6px" onclick="dndEncounterV2Add()">+ Добавить в encounter</button><div id="dndEncounterV2List" style="margin-top:8px"></div><div id="dndEncounterV2Summary" style="margin-top:8px"></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:6px"><button class="btn-action" onclick="dndEncounterV2New()">🧹 Новый encounter</button><button class="btn-action" style="background:#4caf50" onclick="dndEncounterV2Launch()">⚔️ Начать бой</button></div>';host.appendChild(box);renderList();}
  function renderList(){var e=current(),l=document.getElementById('dndEncounterV2List'),s=document.getElementById('dndEncounterV2Summary');if(!l||!e)return;l.innerHTML=(e.combatants||[]).map(function(c,i){return '<div style="display:flex;gap:5px;align-items:center;padding:6px;border-bottom:1px solid #333"><span style="flex:1">'+esc(c.name)+' · CR '+esc(c.cr||'?')+' · '+n(c.hp)+' HP</span><button class="btn-del" onclick="dndEncounterV2Remove('+i+')">✕</button></div>';}).join('')||'<div style="color:#777">Encounter пуст.</div>';var r=score(e,levels());s.innerHTML='<strong>XP:</strong> '+r.rawXp+' · <strong>Adjusted:</strong> '+r.adjustedXp+' · <strong>Множитель:</strong> ×'+r.multiplier.toFixed(1)+'<br><strong>Сложность:</strong> '+esc(r.difficulty)+'<br><small>Thresholds: '+r.thresholds.join(' / ')+'</small>';}
  global.dndEncounterV2Add=function(){var s=document.getElementById('dndMonsterV2Preset'),q=document.getElementById('dndMonsterV2Count'),t=CATALOG[s&&s.value],count=Math.max(1,n(q&&q.value,1));if(!t)return;var e=current();for(var i=0;i<count;i++){var c=clone(t);c.id='mon_'+Date.now()+'_'+Math.random().toString(36).slice(2,7);c.name=t.name+(count>1?' #'+(i+1):'');c.tempHp=0;c.defeated=false;c.conditions={};c.deathSaves={successes:0,failures:0};e.combatants.push(c);}save();renderList();};
  global.dndEncounterV2Remove=function(i){var e=current();e.combatants.splice(i,1);save();renderList();};
  global.dndEncounterV2New=function(){var h=ensure();h.encounters.push({id:'enc_'+Date.now(),name:'Encounter '+(h.encounters.length+1),combatants:[]});save();renderList();};
  global.dndEncounterV2Launch=function(){var h=ensure(),e=current();if(!e.combatants.length){alert('Добавьте хотя бы одного монстра.');return;}h.initiativeTracker={round:1,activeIndex:0,combatants:[]};if(typeof global.addInitiativeCombatant==='function')global.addInitiativeCombatant(h.name||'Герой',true);h.initiativeTracker.combatants=h.initiativeTracker.combatants.concat(e.combatants.map(function(c){return clone(c);}));if(typeof global.sortInitiativeTracker==='function')global.sortInitiativeTracker();save();if(typeof global.renderInitiativeTracker==='function')global.renderInitiativeTracker();if(typeof global.renderDndTools==='function')global.renderDndTools();alert('⚔️ Encounter запущен: '+e.combatants.length+' монстр(ов).');};
  global.dndMonsterTakeAction=function(monsterIndex,targetIndex,actionIndex){var h=ensure(),t=h&&h.initiativeTracker;if(!t)return;var m=t.combatants[monsterIndex],target=t.combatants[targetIndex];if(!m||!target)return;var action=m.actions&&m.actions[actionIndex];if(!action)return;var r=resolveAction(m,target,action);save();if(typeof global.renderInitiativeTracker==='function')global.renderInitiativeTracker();return r;};
  function patchPanel(){if(typeof global.dndRenderCombatV3!=='function')return;if(global.dndRenderCombatV3.__v2)return;var old=global.dndRenderCombatV3;var wrapped=function(){old.apply(this,arguments);setTimeout(renderV2,0);};wrapped.__v2=true;global.dndRenderCombatV3=wrapped;}
  if(global.addEventListener)global.addEventListener('DOMContentLoaded',function(){patchPanel();setTimeout(renderV2,100);});
})(window);
