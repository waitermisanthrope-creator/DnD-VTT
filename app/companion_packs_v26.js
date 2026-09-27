/**
 * companion_packs_v26.js
 * ------------------------------------------------------------------
 * ЧТО ЭТО ЗА ФАЙЛ:
 * Контентный слой v26 для четырёх моделей спутников: Beastheart,
 * Beast Master, Familiar и Find Steed. Он использует универсальный
 * secondary/summoning runtime и не создаёт отдельную механику токенов.
 *
 * КАК РАБОТАЕТ:
 * - создаёт полноценные вторичные сущности через DNDSummoning;
 * - хранит связь ownerId/ownerTokenId;
 * - задаёт действия, HP, AC, скорость, размер и режим управления;
 * - даёт UI-кнопки для создания спутника без prompt;
 * - предоставляет API для будущих заклинаний призыва и контент-паков.
 *
 * ОСНОВНЫЕ ПЕРЕМЕННЫЕ:
 * ownerId, ownerTokenId, entityId, companionType, controlMode,
 * duration, actions, hp, maxHp, ac, speed.
 *
 * НЕ ИЗМЕНЯЕТ Wallpapers.js/Ambiences.js.
 * ------------------------------------------------------------------
 */
(function(g){
  'use strict';
  function hero(){return g.currentChar||g.currentCharacter||null;}
  function tracker(){var h=hero();return h&&h.initiativeTracker||null;}
  function ownerId(){var t=tracker();var c=t&&t.combatants&&t.combatants[t.activeIndex];return c&&c.id||'';}
  function ownerTokenId(){var id=ownerId(),t=tracker(),c=t&&t.combatants&&t.combatants.find(function(x){return String(x.id)===String(id);});return c&&(c.tokenId||c.id)||'';}
  function summon(spec){if(!g.DNDSummoning||!g.DNDSummoning.create)return null;spec=spec||{};spec.ownerId=spec.ownerId||ownerId();spec.ownerTokenId=spec.ownerTokenId||ownerTokenId();return g.DNDSummoning.create(spec);}
  var T={
    beastheart:{name:'Монструозный компаньон',source:'Beastheart',sourceType:'class',controlMode:'command',team:'party',hp:22,maxHp:22,ac:13,speed:40,size:2,actions:[{name:'Укус',attackBonus:5,damage:'1d8+3',damageType:'piercing',rangeFt:5},{name:'Толчок',attackBonus:5,damage:'1d6+3',damageType:'bludgeoning',rangeFt:5}]},
    beastMaster:{name:'Звериный компаньон',source:'Ranger Beast Master',sourceType:'subclass',controlMode:'command',team:'party',hp:16,maxHp:16,ac:13,speed:40,size:1,actions:[{name:'Атака зверя',attackBonus:4,damage:'1d6+2',damageType:'piercing',rangeFt:5}]},
    familiar:{name:'Фамильяр',source:'Find Familiar',sourceType:'spell',controlMode:'independent',team:'party',hp:1,maxHp:1,ac:10,speed:30,size:1,actions:[],duration:600,durationUnit:'rounds',metadata:{nonCombat:true}},
    steed:{name:'Призванный скакун',source:'Find Steed',sourceType:'spell',controlMode:'shared_turn',team:'party',hp:19,maxHp:19,ac:11,speed:60,size:2,actions:[{name:'Копыта',attackBonus:5,damage:'2d6+3',damageType:'bludgeoning',rangeFt:5}]}
  };
  function create(type,overrides){var base=T[type];if(!base)throw new Error('Unknown companion type: '+type);var s=JSON.parse(JSON.stringify(base));Object.keys(overrides||{}).forEach(function(k){s[k]=overrides[k];});s.companionType=type;return summon(s);}
  function list(){return g.DNDSecondaryEntities?g.DNDSecondaryEntities.list(ownerId()):[];}
  function createFor(type){var exists=list().some(function(e){return e.companionType===type&&!e.defeated;});if(exists)return {ok:false,reason:'already_active'};return {ok:true,entity:create(type)};}
  g.DNDCompanionPacks={VERSION:'1.0.0',templates:T,create:create,createFor:createFor,list:list};
  g.dndCreateBeastheartCompanion=function(){return createFor('beastheart');};
  g.dndCreateBeastMasterCompanion=function(){return createFor('beastMaster');};
  g.dndCreateFamiliar=function(){return createFor('familiar');};
  g.dndCreateSteed=function(){return createFor('steed');};
  function panel(){var host=document.getElementById('battleBoardSummonPanel');if(!host)return;var old=document.getElementById('v26CompanionButtons');if(old)old.remove();var wrap=document.createElement('div');wrap.id='v26CompanionButtons';wrap.style.cssText='margin-top:7px;padding-top:7px;border-top:1px solid #333;display:flex;gap:5px;flex-wrap:wrap';[['beastheart','🐺 Компаньон'],['beastMaster','🦊 Зверь следопыта'],['familiar','🦉 Фамильяр'],['steed','🐎 Скакун']].forEach(function(x){var b=document.createElement('button');b.className='btn-action';b.style.padding='5px 7px';b.textContent=x[1];b.onclick=function(){var r=createFor(x[0]);if(!r.ok&&r.reason==='already_active')alert('Такой спутник уже активен.');};wrap.appendChild(b);});host.appendChild(wrap);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',panel);else panel();
  g.DNDCompanionPacks.render=panel;
})(window);
