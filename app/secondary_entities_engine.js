/**
 * secondary_entities_engine.js
 * ------------------------------------------------------------------
 * ЧТО ЭТО ЗА ФАЙЛ:
 * Универсальный движок вторичных сущностей VTT: фамильяров, питомцев,
 * маунтов, призванных существ, конструкций и других токенов, связанных
 * с персонажем или другим владельцем.
 *
 * КАК РАБОТАЕТ:
 * - сущность хранится в currentChar.initiativeTracker.battlefield.entities;
 * - для неё автоматически создаётся отдельный VTT-токен;
 * - entity.ownerId связывает существо с владельцем;
 * - controlMode определяет модель управления: command, shared_turn,
 *   independent, bonus_action_command, reaction или passive;
 * - API используется классами, заклинаниями и Battle Board без prompt;
 * - удаление сущности удаляет её токен, а связь с владельцем сохраняется.
 *
 * ОСНОВНЫЕ ПЕРЕМЕННЫЕ:
 * battlefield.entities, entity, token, ownerId, controlMode, duration,
 * hp/maxHp, speed, ac, source, summonSpellId.
 *
 * НЕ ИЗМЕНЯЕТ Wallpapers.js/Ambiences.js.
 * ------------------------------------------------------------------
 */
(function(global){
  'use strict';
  var VERSION='1.0.0';
  function clone(v){try{return JSON.parse(JSON.stringify(v));}catch(e){return null;}}
  function hero(){return global.currentChar||global.currentCharacter||null;}
  function save(){if(typeof global.autoSaveCurrentCharacter==='function')global.autoSaveCurrentCharacter();}
  function ensure(){var h=hero();if(!h)return null;if(!h.initiativeTracker)h.initiativeTracker={round:1,activeIndex:0,combatants:[]};var b=h.initiativeTracker.battlefield;if(!b||typeof b!=='object')return null;b.entities=b.entities&&typeof b.entities==='object'?b.entities:{};b.tokens=b.tokens&&typeof b.tokens==='object'?b.tokens:{};return b;}
  function makeId(prefix){return prefix+'_'+Date.now().toString(36)+'_'+Math.random().toString(36).slice(2,8);}
  function tokenForEntity(e,b){var occupied={};Object.keys(b.tokens).forEach(function(k){var t=b.tokens[k];if(t&&t.x!=null)occupied[t.x+':'+t.y]=1;});var x=e.x==null?0:Number(e.x),y=e.y==null?0:Number(e.y),found=e.x!=null&&e.y!=null;for(y=0;y<b.rows&&!found;y++)for(x=0;x<b.cols&&!found;x++)if(!occupied[x+':'+y])found=true;if(!found){x=0;y=0;}return {id:'bt_'+e.id,entityId:e.id,kind:'secondary',name:e.name,type:e.team==='enemy'?'enemy':'entity',ownerId:e.ownerId||'',ownerTokenId:e.ownerTokenId||'',controlMode:e.controlMode||'command',x:x,y:y,size:Math.max(1,Number(e.size)||1),speed:Number(e.speed)||30,hp:Number(e.hp)||0,maxHp:Number(e.maxHp)||Number(e.hp)||0,ac:Number(e.ac)||10,visible:true,source:e.source||'summon',duration:e.duration==null?null:e.duration};}
  function normalize(spec){spec=spec||{};return {id:spec.id||makeId('ent'),name:spec.name||'Призванное существо',ownerId:String(spec.ownerId||''),ownerTokenId:String(spec.ownerTokenId||''),source:spec.source||'summon',sourceType:spec.sourceType||'class',companionType:spec.companionType||null,summonSpellId:spec.summonSpellId||null,controlMode:spec.controlMode||'command',team:spec.team||'party',hp:Number(spec.hp)||1,maxHp:Number(spec.maxHp)||Number(spec.hp)||1,tempHp:Number(spec.tempHp)||0,ac:Number(spec.ac)||10,speed:Number(spec.speed)||30,size:Math.max(1,Number(spec.size)||1, ),duration:spec.duration==null?null:Number(spec.duration),durationUnit:spec.durationUnit||'rounds',x:spec.x==null?null:Number(spec.x),y:spec.y==null?null:Number(spec.y),conditions:clone(spec.conditions||{}),actions:clone(spec.actions||[]),resources:clone(spec.resources||{}),metadata:clone(spec.metadata||{})};}
  function create(spec){var b=ensure();if(!b)throw new Error('Battlefield unavailable');var e=normalize(spec);if(b.entities[e.id])e.id=makeId('ent');b.entities[e.id]=e;b.tokens['bt_'+e.id]=tokenForEntity(e,b);save();notify('create',e);return clone(e);}
  function get(id){var b=ensure();return b&&b.entities[String(id)]||null;}
  function getToken(id){var b=ensure(),e=get(id);return b&&e&&b.tokens['bt_'+e.id]||null;}
  function remove(id){var b=ensure();if(!b)return false;id=String(id);if(!b.entities[id])return false;delete b.entities[id];delete b.tokens['bt_'+id];save();notify('remove',{id:id});return true;}
  function update(id,patch){var b=ensure(),e=get(id);if(!b||!e)return null;Object.keys(patch||{}).forEach(function(k){if(k!=='id')e[k]=clone(patch[k]);});var t=b.tokens['bt_'+e.id];if(t){['name','speed','hp','maxHp','ac','size','ownerId','ownerTokenId','controlMode','type','duration','x','y'].forEach(function(k){if(e[k]!=null)t[k]=e[k];});}save();notify('update',e);return clone(e);}
  function list(ownerId){var b=ensure();if(!b)return [];return Object.keys(b.entities).map(function(id){return b.entities[id];}).filter(function(e){return ownerId==null||String(e.ownerId)===String(ownerId);}).map(clone);}
  function command(id,command,actorId){var e=get(id);if(!e)return {ok:false,reason:'not_found'};var allowed=e.controlMode==='independent'||e.controlMode==='shared_turn'||e.controlMode==='command'||e.controlMode==='bonus_action_command';if(!allowed)return {ok:false,reason:'passive'};e.lastCommand={type:command,actorId:actorId||e.ownerId,round:hero()&&hero().initiativeTracker?hero().initiativeTracker.round:1};save();notify('command',e.lastCommand);return {ok:true,entity:clone(e),command:e.lastCommand};}
  function syncFromCombatants(){var b=ensure();if(!b)return;Object.keys(b.entities).forEach(function(id){var e=b.entities[id],t=b.tokens['bt_'+id];if(!t)b.tokens['bt_'+id]=tokenForEntity(e,b);});}
  function notify(action,payload){var h=hero(),net=global.dndNetwork;if(net&&net.state&&net.state.role==='host'&&typeof net.commitHostEvent==='function'&&h&&h.initiativeTracker){try{net.commitHostEvent('COMBAT_CHANGED',clone(h.initiativeTracker),'master');}catch(e){}}if(typeof global.renderInitiativeTracker==='function')global.renderInitiativeTracker();if(global.DNDBattleBoard&&typeof global.DNDBattleBoard.render==='function')global.DNDBattleBoard.render();}
  function registerSummonFromCombatant(c,ownerId,opts){opts=opts||{};return create({name:c.name||opts.name||'Призванное существо',ownerId:ownerId||opts.ownerId||'',ownerTokenId:opts.ownerTokenId||'',source:opts.source||'summon',sourceType:opts.sourceType||'spell',summonSpellId:opts.summonSpellId||null,controlMode:opts.controlMode||'command',team:opts.team||'party',hp:c.hp,maxHp:c.maxHp,ac:c.ac,speed:c.speed,size:c.size||1,actions:c.actions||[],resources:c.resources||{},duration:opts.duration,durationUnit:opts.durationUnit,metadata:{combatantId:c.id||null}});}
  global.DNDSecondaryEntities={VERSION:VERSION,ensure:ensure,create:create,get:get,getToken:getToken,remove:remove,update:update,list:list,command:command,sync:syncFromCombatants,registerSummon:registerSummonFromCombatant};
})(window);
