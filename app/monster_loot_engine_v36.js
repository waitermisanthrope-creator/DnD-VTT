/**
 * monster_loot_engine_v36.js
 * ------------------------------------------------------------------
 * ЧТО ЭТО ЗА ФАЙЛ:
 * Система добычи с поверженных существ для D&D 5e 2014.
 * Разделяет лут на контейнеры: pockets (карманы/снаряжение) и harvest
 * (разделка/добыча тела). Поддерживает гарантированные трофеи,
 * вероятностные предметы, материалы для крафта и свободную добычу.
 *
 * КАК РАБОТАЕТ:
 * - DNDMonsterLoot.catalog описывает правила добычи по типу монстра;
 * - rollPockets() бросает таблицу случайного лута;
 * - harvest() выдаёт гарантированные трофеи и проверяет условия;
 * - collectDefeatedMonster() создаёт снимок добычи и переносит предметы
 *   в inventory текущего персонажа;
 * - свободный мастерский лут можно добавить через addCustomLoot().
 *
 * ОСНОВНЫЕ ПЕРЕМЕННЫЕ:
 * DNDMonsterLoot.catalog, lootContainers.pockets, lootContainers.harvest,
 * currentChar.monsterLootHistory, currentChar.inventory.materials,
 * currentChar.inventory.consumables, currentChar.inventory.weapons.
 *
 * НЕ ИЗМЕНЯЕТ Wallpapers.js/Ambiences.js.
 * ------------------------------------------------------------------
 */
(function(global){
  'use strict';

  var CATALOG={
    'Гоблин':{
      pockets:{rolls:1,table:[
        {weight:35,item:{name:'Медные монеты',category:'currency',count:[2,12]}},
        {weight:20,item:{name:'Скимитар гоблина',category:'weapons',count:[1,1]}},
        {weight:12,item:{name:'Короткий лук гоблина',category:'weapons',count:[1,1]}},
        {weight:12,item:{name:'Стрела',category:'junk',count:[1,6]}},
        {weight:8,item:{name:'Малое лечебное зелье',category:'consumables',count:[1,1]}},
        {weight:8,item:{name:'Грубый отмычечный набор',category:'junk',count:[1,1]}},
        {weight:5,item:{name:'Кусок железного лома',category:'materials',count:[1,3]}}
      ]},
      harvest:[
        {name:'Ухо гоблина',category:'materials',count:2,guaranteed:true,tags:['trophy','monster-part','goblin']},
        {name:'Гоблинская кожа',category:'materials',count:[1,2],guaranteed:true,tags:['hide','leather']},
        {name:'Грубая ткань',category:'materials',count:[0,1],chance:0.35,tags:['textile']}
      ]
    },
    'Орк':{
      pockets:{rolls:1,table:[
        {weight:38,item:{name:'Медные и серебряные монеты',category:'currency',count:[5,25]}},
        {weight:22,item:{name:'Секира орка',category:'weapons',count:[1,1]}},
        {weight:12,item:{name:'Грубый лечебный настой',category:'consumables',count:[1,1]}},
        {weight:10,item:{name:'Кожаный ремень',category:'materials',count:[1,2]}},
        {weight:10,item:{name:'Железный лом',category:'materials',count:[1,3]}},
        {weight:8,item:{name:'Затупленный боевой трофей',category:'junk',count:[1,1]}}
      ]},
      harvest:[
        {name:'Орочий клык',category:'materials',count:2,guaranteed:true,tags:['trophy','monster-part','orc']},
        {name:'Орочья кожа',category:'materials',count:[1,2],guaranteed:true,tags:['hide','leather']},
        {name:'Кость орка',category:'materials',count:[1,2],guaranteed:true,tags:['bone']}
      ]
    },
    'Скелет':{
      pockets:{rolls:1,table:[
        {weight:35,item:{name:'Ржавые монеты',category:'currency',count:[1,15]}},
        {weight:25,item:{name:'Короткий меч',category:'weapons',count:[1,1]}},
        {weight:15,item:{name:'Короткий лук',category:'weapons',count:[1,1]}},
        {weight:15,item:{name:'Стрела',category:'junk',count:[1,6]}},
        {weight:10,item:{name:'Костяной осколок',category:'materials',count:[1,4]}}
      ]},
      harvest:[
        {name:'Кость',category:'materials',count:[2,6],guaranteed:true,tags:['bone','undead']},
        {name:'Костяной прах',category:'materials',count:[1,2],guaranteed:true,tags:['undead','alchemy']}
      ]
    },
    'Зомби':{
      pockets:{rolls:1,table:[
        {weight:45,item:{name:'Грязные монеты',category:'currency',count:[1,8]}},
        {weight:20,item:{name:'Сгнивший нож',category:'junk',count:[1,1]}},
        {weight:20,item:{name:'Рваная одежда',category:'materials',count:[1,2]}},
        {weight:15,item:{name:'Гнилостный реагент',category:'materials',count:[1,2]}}
      ]},
      harvest:[
        {name:'Гнилая ткань',category:'materials',count:[1,3],guaranteed:true,tags:['textile','undead']},
        {name:'Кость',category:'materials',count:[1,3],guaranteed:true,tags:['bone','undead']}
      ]
    },
    'Волк':{
      pockets:{rolls:0,table:[]},
      harvest:[
        {name:'Волчья шкура',category:'materials',count:1,guaranteed:true,tags:['hide','leather']},
        {name:'Волчий клык',category:'materials',count:[1,4],guaranteed:true,tags:['bone','trophy']},
        {name:'Волчье мясо',category:'materials',count:[2,5],guaranteed:true,tags:['food','meat']}
      ]
    },
    'Огр':{
      pockets:{rolls:1,table:[
        {weight:45,item:{name:'Мешок монет',category:'currency',count:[10,40]}},
        {weight:20,item:{name:'Дубина огра',category:'weapons',count:[1,1]}},
        {weight:15,item:{name:'Кусок железа',category:'materials',count:[1,4]}},
        {weight:10,item:{name:'Грубая провизия',category:'consumables',count:[1,3]}},
        {weight:10,item:{name:'Бесполезный хлам',category:'junk',count:[1,2]}}
      ]},
      harvest:[
        {name:'Огрская шкура',category:'materials',count:[1,2],guaranteed:true,tags:['hide','leather','large']},
        {name:'Огрский клык',category:'materials',count:[2,4],guaranteed:true,tags:['trophy','bone']},
        {name:'Огрское мясо',category:'materials',count:[4,8],guaranteed:true,tags:['food','meat']}
      ]
    },
    'Вождь хобгоблинов':{
      pockets:{rolls:2,table:[
        {weight:30,item:{name:'Серебряные монеты',category:'currency',count:[10,30]}},
        {weight:20,item:{name:'Длинный меч',category:'weapons',count:[1,1]}},
        {weight:15,item:{name:'Длинный лук',category:'weapons',count:[1,1]}},
        {weight:12,item:{name:'Малое лечебное зелье',category:'consumables',count:[1,1]}},
        {weight:13,item:{name:'Сталь',category:'materials',count:[1,2]}},
        {weight:10,item:{name:'Командирский жетон',category:'junk',count:[1,1]}}
      ]},
      harvest:[
        {name:'Ухо хобгоблина',category:'materials',count:2,guaranteed:true,tags:['trophy','monster-part']},
        {name:'Хобгоблинская кожа',category:'materials',count:[1,2],guaranteed:true,tags:['hide','leather']}
      ]
    }
  };

  function clone(v){return JSON.parse(JSON.stringify(v));}
  function num(v,d){var n=Number(v);return Number.isFinite(n)?n:d;}
  function rollDie(sides){return Math.floor(Math.random()*sides)+1;}
  function rangeCount(v){if(Array.isArray(v))return rollDie(Math.max(1,num(v[1],1)-num(v[0],1)+1))+num(v[0],1)-1;return Math.max(0,num(v,1));}
  function weighted(table){var total=table.reduce(function(s,x){return s+Math.max(0,num(x.weight,0));},0);if(total<=0)return null;var r=Math.random()*total;for(var i=0;i<table.length;i++){r-=Math.max(0,num(table[i].weight,0));if(r<0)return table[i];}return table[table.length-1];}
  function normalize(item,source){var out=clone(item||{});out.count=Math.max(1,rangeCount(out.count||1));out.source=source||'monster-loot';out.lootGenerated=true;return out;}
  function pockets(monsterName){var rule=CATALOG[monsterName]&&CATALOG[monsterName].pockets;if(!rule)return[];var out=[];for(var i=0;i<num(rule.rolls,0);i++){var pick=weighted(rule.table||[]);if(pick)out.push(normalize(pick.item,'pockets'));}return out;}
  function harvest(monsterName,options){var rule=CATALOG[monsterName]&&CATALOG[monsterName].harvest;if(!rule)return[];options=options||{};var out=[];rule.forEach(function(entry){var chance=entry.guaranteed?1:num(entry.chance,1);if(Math.random()<=chance){var x=normalize(entry,'harvest');if(options.toolBonus)x.toolBonus=options.toolBonus;out.push(x);}});return out;}
  function generate(monsterName,options){options=options||{};return {monster:monsterName,monsterId:options.monsterId||null,containers:{pockets:pockets(monsterName),harvest:harvest(monsterName,options)},createdAt:new Date().toISOString()};}
  function ensureInventory(char){char.inventory=char.inventory||{weapons:[],armor:[],consumables:[],materials:[],junk:[],accessories:[]};return char.inventory;}
  function addItem(char,item){var inv=ensureInventory(char);if(item.category==='currency'){char.currency=(num(char.currency,0)+item.count);return;}var cat=inv[item.category]||inv.junk;var existing=cat.find(function(x){return x.name===item.name;});if(existing)existing.count=num(existing.count,0)+item.count;else cat.push(clone(item));}
  function collect(char,loot,containers){if(!char||!loot)return null;var selected=containers||['pockets','harvest'];(selected||[]).forEach(function(key){(loot.containers&&loot.containers[key]||[]).forEach(function(item){addItem(char,item);});});char.monsterLootHistory=Array.isArray(char.monsterLootHistory)?char.monsterLootHistory:[];char.monsterLootHistory.push({monster:loot.monster,monsterId:loot.monsterId,containers:selected,loot:clone(loot),at:loot.createdAt});return loot;}
  function addCustomLoot(char,container,item){var inv=char.monsterLootHistory||[];var rec={monster:'Мастерский лут',monsterId:null,containers:[container||'pockets'],loot:{monster:'Мастерский лут',containers:{pockets:[],harvest:[]}},at:new Date().toISOString()};var normalized=normalize(item,'dm-custom');rec.loot.containers[container==='harvest'?'harvest':'pockets'].push(normalized);inv.push(rec);char.monsterLootHistory=inv;addItem(char,normalized);return normalized;}
  function render(){var host=document.getElementById('dndCombatV3');if(!host||document.getElementById('dndMonsterLootV36'))return;var box=document.createElement('div');box.id='dndMonsterLootV36';box.className='card';box.innerHTML='<h3>🎒 Loot & Разделка</h3><p style="font-size:12px;color:#aaa">У монстра есть два независимых контейнера: карманы/снаряжение и разделка тела.</p><div style="display:grid;grid-template-columns:1fr 1fr;gap:6px"><select id="dndLootMonsterV36"><option value="">— выбрать существо —</option>'+Object.keys(CATALOG).map(function(k){return '<option>'+k+'</option>';}).join('')+'</select><select id="dndLootContainerV36"><option value="all">Карманы + разделка</option><option value="pockets">Только карманы</option><option value="harvest">Только разделка</option></select></div><button class="btn-action" style="width:100%;margin-top:6px" onclick="dndGenerateMonsterLootV36()">🎲 Сгенерировать лут</button><div id="dndLootResultV36" style="margin-top:8px"></div>';host.appendChild(box);}
  function renderResult(loot){var el=document.getElementById('dndLootResultV36');if(!el)return;function list(a){return (a||[]).map(function(x){return '<div>• '+String(x.name).replace(/[&<>]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;'}[c];})+' ×'+x.count+'</div>';}).join('')||'<div style="color:#777">ничего</div>';}el.innerHTML='<div><strong>🧥 Карманы:</strong>'+list(loot.containers.pockets)+'</div><div style="margin-top:6px"><strong>🔪 Разделка:</strong>'+list(loot.containers.harvest)+'</div>'+(loot.collected?'<div style="color:#8f8;margin-top:6px">✓ Добавлено в инвентарь</div>':'<button class="btn-action" style="width:100%;margin-top:6px" onclick="dndCollectMonsterLootV36()">📥 Забрать в инвентарь</button>');global.__dndLootV36=loot;}
  global.DNDMonsterLoot={VERSION:'36.0.0',catalog:CATALOG,rollPockets:pockets,harvest:harvest,generate:generate,collect:collect,addCustomLoot:addCustomLoot};
  global.dndGenerateMonsterLootV36=function(){var s=document.getElementById('dndLootMonsterV36'),c=document.getElementById('dndLootContainerV36');if(!s||!s.value)return;var loot=generate(s.value,{monsterId:null});if(c.value==='pockets')loot.containers.harvest=[];if(c.value==='harvest')loot.containers.pockets=[];renderResult(loot);};
  global.dndCollectMonsterLootV36=function(){var char=global.currentChar||global.currentCharacter;if(!char||!global.__dndLootV36)return;collect(char,global.__dndLootV36);global.__dndLootV36.collected=true;if(typeof global.autoSaveCurrentCharacter==='function')global.autoSaveCurrentCharacter();renderResult(global.__dndLootV36);};
  if(global.addEventListener)global.addEventListener('DOMContentLoaded',function(){setTimeout(render,150);});
})(window);
