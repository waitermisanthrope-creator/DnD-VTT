/* Write appearance only; preserve the latest sheet and pin the account scope.
 * DNDCharacterAppearanceStore.open/save retain targetId and cloudScope per editor
 * session so logout/account switch cannot save into a different user's character.
 */
(function(g){'use strict';
var KEY='dnd_multi_characters_v2',DRAFT='dnd_character_appearance_draft_v1';
function clone(v){return JSON.parse(JSON.stringify(v));}
function selected(){var id=g.currentCharacterId,c=g.currentChar||g.currentCharacter;if(id!=null)return String(id);return c&&c.id!=null?String(c.id):null;}
function records(){var raw=g.localStorage.getItem(KEY);if(!raw)return {value:[],list:[]};var value=JSON.parse(raw),list=Array.isArray(value)?value:value&&value.characters;if(!Array.isArray(list))throw Error('Не удалось прочитать список персонажей');return {value:value,list:list};}
function scope(){return g.DNDCloudSync&&g.DNDCloudSync.scopeId?g.DNDCloudSync.scopeId():null;}
function open(){var id=selected();if(id!=null){var c=records().list.find(function(c){return String(c.id)===id;});if(!c)throw Error('Выбранный персонаж не найден. Откройте его лист заново.');return {targetId:id,cloudScope:scope(),name:c.name||'Персонаж',raceId:c.hostRaceId||c.raceId||'human',gender:/^(female|женщина|женский)$/i.test(c.gender||'')?'female':'male',appearance:c.appearance3d?clone(c.appearance3d):null};}var raw=g.localStorage.getItem(DRAFT);return {targetId:null,cloudScope:scope(),name:'Черновик внешности',appearance:raw?JSON.parse(raw):null};}
function save(session,appearance){
 if(!session)throw Error('Не выбран получатель внешности');if(session.cloudScope!==undefined&&session.cloudScope!==scope())throw Error('Аккаунт изменился. Откройте редактор внешности заново.');var copy=clone(appearance);
 if(session.targetId==null){g.localStorage.setItem(DRAFT,JSON.stringify(copy));return;}
 var snapshot=records(),id=String(session.targetId),record=snapshot.list.find(function(c){return String(c.id)===id;});if(!record)throw Error('Персонаж удалён. Внешность не сохранена.');
 record.appearance3d=copy;g.localStorage.setItem(KEY,JSON.stringify(snapshot.value));
 (g.allCharacters||[]).forEach(function(c){if(String(c.id)===id)c.appearance3d=clone(copy);});[g.currentChar,g.currentCharacter].forEach(function(c){if(c&&String(c.id)===id)c.appearance3d=clone(copy);});
}
g.DNDCharacterAppearanceStore={open:open,save:save};
})(window);
