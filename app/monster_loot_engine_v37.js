/**
 * monster_loot_engine_v37.js
 * ------------------------------------------------------------------
 * ЧТО ЭТО ЗА ФАЙЛ:
 * Расширенная система добычи и разделки монстров для D&D 5e 2014.
 * Разделяет карманы/снаряжение и тело существа, а разделку связывает
 * с CR монстра, Survival/Medicine, владением инструментами и качеством
 * добычи. Сохраняет свободный мастерский лут для импровизации.
 *
 * КАК РАБОТАЕТ:
 * - DNDMonsterLoot.catalog описывает базовые таблицы карманов и разделки;
 * - pockets() создаёт случайный лут снаряжения;
 * - harvest() выполняет отдельные проверки разделки для каждого материала;
 * - skill/tool bonuses берутся из rulesEngine и proficiencies персонажа;
 * - качество разделки влияет на количество, сохранность и редкие бонусные части;
 * - collect() переносит выбранные контейнеры в инвентарь и сохраняет журнал;
 * - addCustomLoot() позволяет мастеру добавить любой придуманный ресурс.
 *
 * ОСНОВНЫЕ ПЕРЕМЕННЫЕ:
 * DNDMonsterLoot.catalog, harvestProfiles, lootContainers,
 * currentChar.monsterLootHistory, currentChar.inventory.materials,
 * currentChar.exhaustion, skillsData, proficiencies.
 *
 * НЕ ИЗМЕНЯЕТ Wallpapers.js/Ambiences.js.
 * ------------------------------------------------------------------
 */
(function(global){
  'use strict';

  var CATALOG={
    'Гоблин':{pockets:{rolls:1,table:[
      {weight:35,item:{name:'Медные монеты',category:'currency',coinType:'cp',count:[2,12]}},{weight:20,item:{name:'Скимитар гоблина',category:'weapons',count:1}},{weight:12,item:{name:'Короткий лук гоблина',category:'weapons',count:1}},{weight:12,item:{name:'Стрела',category:'junk',count:[1,6]}},{weight:8,item:{name:'Малое лечебное зелье',category:'consumables',count:1}},{weight:8,item:{name:'Грубый отмычечный набор',category:'junk',count:1}},{weight:5,item:{name:'Кусок железного лома',category:'materials',count:[1,3]}}
    ]},harvest:[
      {name:'Ухо гоблина',category:'materials',count:2,guaranteed:true,tags:['trophy','monster-part','goblin'],skill:'survival',dc:10},
      {name:'Гоблинская кожа',category:'materials',count:[1,2],guaranteed:true,tags:['hide','leather'],skill:'survival',tool:'p_tool_leatherworker',dc:11},
      {name:'Грубая ткань',category:'materials',count:[0,1],chance:0.35,tags:['textile'],skill:'survival',dc:10}
    ]},
    'Орк':{pockets:{rolls:1,table:[
      {weight:38,item:{name:'Медные и серебряные монеты',category:'currency',coinType:'mixed-cp-sp',count:[5,25]}},{weight:22,item:{name:'Секира орка',category:'weapons',count:1}},{weight:12,item:{name:'Грубый лечебный настой',category:'consumables',count:1}},{weight:10,item:{name:'Кожаный ремень',category:'materials',count:[1,2]}},{weight:10,item:{name:'Железный лом',category:'materials',count:[1,3]}},{weight:8,item:{name:'Затупленный боевой трофей',category:'junk',count:1}}
    ]},harvest:[
      {name:'Орочий клык',category:'materials',count:2,guaranteed:true,tags:['trophy','monster-part','orc'],skill:'medicine',dc:11},
      {name:'Орочья кожа',category:'materials',count:[1,2],guaranteed:true,tags:['hide','leather'],skill:'survival',tool:'p_tool_leatherworker',dc:12},
      {name:'Кость орка',category:'materials',count:[1,2],guaranteed:true,tags:['bone'],skill:'medicine',dc:11}
    ]},
    'Скелет':{pockets:{rolls:1,table:[
      {weight:35,item:{name:'Ржавые монеты',category:'currency',coinType:'cp',count:[1,15]}},{weight:25,item:{name:'Короткий меч',category:'weapons',count:1}},{weight:15,item:{name:'Короткий лук',category:'weapons',count:1}},{weight:15,item:{name:'Стрела',category:'junk',count:[1,6]}},{weight:10,item:{name:'Костяной осколок',category:'materials',count:[1,4]}}
    ]},harvest:[
      {name:'Кость',category:'materials',count:[2,6],guaranteed:true,tags:['bone','undead'],skill:'medicine',dc:10},
      {name:'Костяной прах',category:'materials',count:[1,2],guaranteed:true,tags:['undead','alchemy'],skill:'medicine',dc:10}
    ]},
    'Зомби':{pockets:{rolls:1,table:[
      {weight:45,item:{name:'Грязные монеты',category:'currency',coinType:'cp',count:[1,8]}},{weight:20,item:{name:'Сгнивший нож',category:'junk',count:1}},{weight:20,item:{name:'Рваная одежда',category:'materials',count:[1,2]}},{weight:15,item:{name:'Гнилостный реагент',category:'materials',count:[1,2]}}
    ]},harvest:[
      {name:'Гнилая ткань',category:'materials',count:[1,3],guaranteed:true,tags:['textile','undead'],skill:'survival',dc:10},
      {name:'Кость',category:'materials',count:[1,3],guaranteed:true,tags:['bone','undead'],skill:'medicine',dc:10}
    ]},
    'Волк':{pockets:{rolls:0,table:[]},harvest:[
      {name:'Волчья шкура',category:'materials',count:1,guaranteed:true,tags:['hide','leather'],skill:'survival',tool:'p_tool_leatherworker',dc:12,qualityBonus:true},
      {name:'Волчий клык',category:'materials',count:[1,4],guaranteed:true,tags:['bone','trophy'],skill:'medicine',dc:11},
      {name:'Волчье мясо',category:'materials',count:[2,5],guaranteed:true,tags:['food','meat'],skill:'medicine',dc:10}
    ]},
    'Огр':{pockets:{rolls:1,table:[
      {weight:45,item:{name:'Мешок монет',category:'currency',coinType:'gp',count:[10,40]}},{weight:20,item:{name:'Дубина огра',category:'weapons',count:1}},{weight:15,item:{name:'Кусок железа',category:'materials',count:[1,4]}},{weight:10,item:{name:'Грубая провизия',category:'consumables',count:[1,3]}},{weight:10,item:{name:'Бесполезный хлам',category:'junk',count:[1,2]}}
    ]},harvest:[
      {name:'Огрская шкура',category:'materials',count:[1,2],guaranteed:true,tags:['hide','leather','large'],skill:'survival',tool:'p_tool_leatherworker',dc:14,qualityBonus:true},
      {name:'Огрский клык',category:'materials',count:[2,4],guaranteed:true,tags:['trophy','bone'],skill:'medicine',dc:13},
      {name:'Огрское мясо',category:'materials',count:[4,8],guaranteed:true,tags:['food','meat'],skill:'medicine',dc:10}
    ]},
    'Вождь хобгоблинов':{pockets:{rolls:2,table:[
      {weight:30,item:{name:'Серебряные монеты',category:'currency',coinType:'sp',count:[10,30]}},{weight:20,item:{name:'Длинный меч',category:'weapons',count:1}},{weight:15,item:{name:'Длинный лук',category:'weapons',count:1}},{weight:12,item:{name:'Малое лечебное зелье',category:'consumables',count:1}},{weight:13,item:{name:'Сталь',category:'materials',count:[1,2]}},{weight:10,item:{name:'Командирский жетон',category:'junk',count:1}}
    ]},harvest:[
      {name:'Ухо хобгоблина',category:'materials',count:2,guaranteed:true,tags:['trophy','monster-part'],skill:'survival',dc:12},
      {name:'Хобгоблинская кожа',category:'materials',count:[1,2],guaranteed:true,tags:['hide','leather'],skill:'survival',tool:'p_tool_leatherworker',dc:13}
    ]}
  };

  var CR_BY_MONSTER={'Гоблин':'1/4','Орк':'1/2','Скелет':'1/4','Зомби':'1/4','Волк':'1/4','Огр':'2','Вождь хобгоблинов':'1/2'};
  var CR_RANK={'0':0,'1/8':0,'1/4':1,'1/2':2,'1':3,'2':4,'3':5,'4':6,'5':7,'6':8,'7':9,'8':10,'9':11,'10':12};
  var SKILL_STAT={survival:'wis',medicine:'wis'};
  var QUALITY={
    poor:{label:'Повреждённое',yieldMult:0.75,craftBonus:-1,rareBonus:-0.10},
    fair:{label:'Обычное',yieldMult:1,craftBonus:0,rareBonus:0},
    good:{label:'Хорошее',yieldMult:1.15,craftBonus:1,rareBonus:0.05},
    excellent:{label:'Отличное',yieldMult:1.35,craftBonus:2,rareBonus:0.12},
    pristine:{label:'Безупречное',yieldMult:1.6,craftBonus:3,rareBonus:0.20}
  };

  function clone(v){return JSON.parse(JSON.stringify(v));}
  function num(v,d){var n=Number(v);return Number.isFinite(n)?n:d;}
  function rollDie(sides){return Math.floor(Math.random()*Math.max(1,sides))+1;}
  function d20(){return rollDie(20);}
  function rangeCount(v){if(Array.isArray(v))return rollDie(Math.max(1,num(v[1],1)-num(v[0],1)+1))+num(v[0],1)-1;return Math.max(0,num(v,1));}
  function weighted(table){var total=table.reduce(function(s,x){return s+Math.max(0,num(x.weight,0));},0);if(total<=0)return null;var r=Math.random()*total;for(var i=0;i<table.length;i++){r-=Math.max(0,num(table[i].weight,0));if(r<0)return table[i];}return table[table.length-1];}
  function normalize(item,source){var out=clone(item||{});out.count=Math.max(1,rangeCount(out.count||1));out.source=source||'monster-loot';out.lootGenerated=true;return out;}
  function hero(){return global.currentChar||global.currentCharacter||null;}
  function abilityMod(v){return Math.floor((num(v,10)-10)/2);}
  function hasToolProficiency(char,toolId){if(!char||!toolId)return false;var p=char.proficiencies||[];if(!Array.isArray(p))return !!p[toolId];return p.some(function(x){if(typeof x==='string')return x===toolId||x.toLowerCase()===toolId.toLowerCase();return x&&((x.id===toolId)||(x.name&&x.name.toLowerCase().indexOf(toolId.replace('p_tool_',''))>=0));});}
  function skillBonus(char,skill){if(!char)return 0;var stat=SKILL_STAT[skill]||'wis';if(global.DNDRules&&typeof global.DNDRules.getSkillBonus==='function')return num(global.DNDRules.getSkillBonus(char,skill,stat),abilityMod(char.stats&&char.stats[stat]));var rank=char.skillsData?num(char.skillsData[skill],0):0;return abilityMod(char.stats&&char.stats[stat])+num(char.profBonus,2)*Math.min(2,Math.max(0,rank));}
  function toolBonus(char,tool){return hasToolProficiency(char,tool)?2:0;}
  function crRank(monsterName,options){var cr=(options&&options.cr)||CR_BY_MONSTER[monsterName]||'0';return num(CR_RANK[String(cr)],0);}
  function qualityFrom(total,dc){var delta=total-dc;if(total<dc-5)return QUALITY.poor;if(delta<0)return QUALITY.fair;if(delta<=4)return QUALITY.good;if(delta<=9)return QUALITY.excellent;return QUALITY.pristine;}
  function addExhaustion(char,amount){if(!char||!amount)return;char.exhaustion=Math.max(0,Math.min(6,num(char.exhaustion,0)+amount));char.activeConditions=char.activeConditions||{};char.activeConditions['Истощение']=char.exhaustion;}
  function harvestCheck(char,monsterName,entry,options){options=options||{};var skill=entry.skill||'survival',dc=num(entry.dc,10)+Math.floor(crRank(monsterName,options)/3);var raw=d20(),bonus=skillBonus(char,skill),tb=toolBonus(char,entry.tool),total=raw+bonus+tb;var quality=qualityFrom(total,dc);return {skill:skill,dc:dc,roll:raw,skillBonus:bonus,toolBonus:tb,total:total,success:total>=dc,quality:quality.label,qualityKey:Object.keys(QUALITY).find(function(k){return QUALITY[k]===quality;})||'fair',tool:entry.tool||null};}
  function rarityChance(entry,monsterName,check,options){var rank=crRank(monsterName,options),base=num(entry.rareChance,0.03)+(rank*0.008);base+=QUALITY[check.qualityKey].rareBonus;return Math.max(0,Math.min(0.9,base));}
  function scaledCount(base,qualityKey,rank,entry){var q=QUALITY[qualityKey]||QUALITY.fair;var amount=Math.max(0,Math.round(base*q.yieldMult));if(entry.large && rank>=4)amount+=1;return amount;}
  function harvest(monsterName,options){options=options||{};var rule=CATALOG[monsterName]&&CATALOG[monsterName].harvest;if(!rule)return[];var char=options.character||hero(),rank=crRank(monsterName,options),out=[];rule.forEach(function(entry){
      var check=harvestCheck(char,monsterName,entry,options);var chance=entry.guaranteed?1:num(entry.chance,1);if(!entry.guaranteed && Math.random()>chance)return;
      var base=rangeCount(entry.count||1);var q=QUALITY[check.qualityKey]||QUALITY.fair;var count=entry.guaranteed?Math.max(1,scaledCount(base,check.qualityKey,rank,entry)):(check.success?scaledCount(base,check.qualityKey,rank,entry):0);
      if(!entry.guaranteed && !check.success)return;
      if(entry.guaranteed && !check.success){count=Math.max(1,Math.floor(base*0.75));}
      var item=normalize(entry,'harvest');item.count=count;item.harvest={quality:q.label,qualityKey:check.qualityKey,craftBonus:q.craftBonus,check:check,monsterCR:(options.cr||CR_BY_MONSTER[monsterName]||'0')};out.push(item);
      if(entry.rareBonusItem && Math.random()<=rarityChance(entry,monsterName,check,options)){
        var rare=normalize(entry.rareBonusItem,'harvest-rare');rare.harvest={quality:q.label,qualityKey:check.qualityKey,craftBonus:q.craftBonus,rare:true,check:check};out.push(rare);
      }
    });return out;}
  function pockets(monsterName){var rule=CATALOG[monsterName]&&CATALOG[monsterName].pockets;if(!rule)return[];var out=[];for(var i=0;i<num(rule.rolls,0);i++){var pick=weighted(rule.table||[]);if(pick)out.push(normalize(pick.item,'pockets'));}return out;}
  function generate(monsterName,options){options=options||{};return {monster:monsterName,monsterId:options.monsterId||null,cr:options.cr||CR_BY_MONSTER[monsterName]||null,containers:{pockets:pockets(monsterName),harvest:harvest(monsterName,options)},createdAt:new Date().toISOString()};}
  function ensureInventory(char){char.inventory=char.inventory||{weapons:[],armor:[],consumables:[],materials:[],junk:[],accessories:[]};return char.inventory;}
  function addItem(char,item){var inv=ensureInventory(char);if(item.category==='currency'){var coinType=item.coinType;if(!char.coins||typeof char.coins!=='object'||Array.isArray(char.coins))char.coins={cp:0,sp:0,ep:0,gp:0,pp:0};var amount=Math.max(0,Math.floor(num(item.count,0)));var add={};if(coinType==='mixed-cp-sp'){add.cp=Math.ceil(amount/2);add.sp=Math.floor(amount/2);}else if(['cp','sp','ep','gp','pp'].includes(coinType)){add[coinType]=amount;}else{char.currency=Math.max(0,num(char.currency,0))+amount;return;}Object.keys(add).forEach(function(k){var next=Math.max(0,Math.floor(num(char.coins[k],0)))+add[k];if(Number.isSafeInteger(next))char.coins[k]=next;});return;}var cat=inv[item.category]||inv.junk;var existing=cat.find(function(x){return x.name===item.name;});if(existing){existing.count=num(existing.count,0)+item.count;if(item.harvest&&item.harvest.qualityKey){existing.harvestQuality=item.harvest.qualityKey;existing.craftBonus=Math.max(num(existing.craftBonus,0),num(item.harvest.craftBonus,0));}}else cat.push(clone(item));}
  function collect(char,loot,containers){if(!char||!loot)return null;var selected=containers||['pockets','harvest'];selected.forEach(function(key){(loot.containers&&loot.containers[key]||[]).forEach(function(item){addItem(char,item);});});char.monsterLootHistory=Array.isArray(char.monsterLootHistory)?char.monsterLootHistory:[];char.monsterLootHistory.push({monster:loot.monster,monsterId:loot.monsterId,cr:loot.cr,containers:selected,loot:clone(loot),at:loot.createdAt});return loot;}
  function addCustomLoot(char,container,item){var history=char.monsterLootHistory||[];var rec={monster:'Мастерский лут',monsterId:null,containers:[container||'pockets'],loot:{monster:'Мастерский лут',containers:{pockets:[],harvest:[]}},at:new Date().toISOString()};var normalized=normalize(item,'dm-custom');rec.loot.containers[container==='harvest'?'harvest':'pockets'].push(normalized);history.push(rec);char.monsterLootHistory=history;addItem(char,normalized);return normalized;}
  function render(){var host=document.getElementById('dndCombatV3');if(!host||document.getElementById('dndMonsterLootV37'))return;var box=document.createElement('div');box.id='dndMonsterLootV37';box.className='card';box.innerHTML='<h3>🎒 Loot & Разделка 2.0</h3><p style="font-size:12px;color:#aaa">Карманы — случайный лут. Разделка — Survival/Medicine + CR + инструменты + качество материала.</p><div style="display:grid;grid-template-columns:1fr 1fr;gap:6px"><select id="dndLootMonsterV37"><option value="">— выбрать существо —</option>'+Object.keys(CATALOG).map(function(k){return '<option>'+k+'</option>';}).join('')+'</select><select id="dndLootContainerV37"><option value="all">Карманы + разделка</option><option value="pockets">Только карманы</option><option value="harvest">Только разделка</option></select></div><button class="btn-action" style="width:100%;margin-top:6px" onclick="dndGenerateMonsterLootV37()">🎲 Проверить добычу</button><div id="dndLootResultV37" style="margin-top:8px"></div>';host.appendChild(box);}
  function renderResult(loot){var el=document.getElementById('dndLootResultV37');if(!el)return;function list(a){return (a||[]).map(function(x){var q=x.harvest&&x.harvest.quality?' · '+x.harvest.quality:'';var c=x.harvest&&x.harvest.check?' · d20 '+x.harvest.check.roll+' + '+x.harvest.check.skillBonus+' + '+x.harvest.check.toolBonus+' = '+x.harvest.check.total+' / DC '+x.harvest.check.dc:'';return '<div>• '+String(x.name).replace(/[&<>]/g,function(ch){return {'&':'&amp;','<':'&lt;','>':'&gt;'}[ch];})+' ×'+x.count+q+c+'</div>';}).join('')||'<div style="color:#777">ничего</div>';}el.innerHTML='<div><strong>🧥 Карманы:</strong>'+list(loot.containers.pockets)+'</div><div style="margin-top:6px"><strong>🔪 Разделка:</strong>'+list(loot.containers.harvest)+'</div><button class="btn-action" style="width:100%;margin-top:6px" onclick="dndCollectMonsterLootV37()">📥 Забрать в инвентарь</button>';global.__dndLootV37=loot;}
  global.DNDMonsterLoot={VERSION:'37.0.0',catalog:CATALOG,quality:QUALITY,rollPockets:pockets,harvest:harvest,generate:generate,collect:collect,addCustomLoot:addCustomLoot,skillBonus:skillBonus,hasToolProficiency:hasToolProficiency};
  global.dndGenerateMonsterLootV37=function(){var s=document.getElementById('dndLootMonsterV37'),c=document.getElementById('dndLootContainerV37');if(!s||!s.value)return;var loot=generate(s.value,{character:hero()});if(c.value==='pockets')loot.containers.harvest=[];if(c.value==='harvest')loot.containers.pockets=[];renderResult(loot);};
  global.dndCollectMonsterLootV37=function(){var char=hero(),loot=global.__dndLootV37;if(!char||!loot)return;collect(char,loot);if(typeof global.autoSaveCurrentCharacter==='function')global.autoSaveCurrentCharacter();renderResult(loot);};
  if(global.addEventListener)global.addEventListener('DOMContentLoaded',function(){setTimeout(render,150);});
})(window);
