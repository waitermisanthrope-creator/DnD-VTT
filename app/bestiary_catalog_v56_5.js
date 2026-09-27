/**
 * bestiary_catalog_v56_5.js
 * ------------------------------------------------------------------
 * WHAT THIS FILE IS:
 * V56.5 is the Fizban's Treasury of Dragons catalogue layer. It adds
 * creature names from Fizban's Bestiary using original app-native
 * mechanics; it does NOT reproduce published statblocks or text.
 *
 * HOW IT WORKS:
 * - sourcePack=fizban_treasury marks the source pack;
 * - profiles are generated deterministically from creature archetype;
 * - combat uses the existing Monster Engine;
 * - dragon harvest is bridged into the existing crafting material catalog;
 * - existing creatures are skipped automatically to prevent duplicates.
 * IMPORTANT APIS: DND_BESTIARY_V56_5, getCreature(), listBySource(),
 * listByFamily(), summary(), register().
 * ------------------------------------------------------------------
 */
(function(global){'use strict';
var base=global.DNDExpandedBestiary, monsters=global.DNDMonsters, loot=global.DNDMonsterLoot;
var craft=global.DND_CRAFTING_V31;
if(!base||!monsters)return;
function clone(v){return JSON.parse(JSON.stringify(v));}
function mod(n){return Math.floor((n-10)/2);}
var NAMES=[
'Amethyst Dragon Wyrmling','Adult Amethyst Dragon','Ancient Amethyst Dragon',
'Crystal Dragon Wyrmling','Adult Crystal Dragon','Ancient Crystal Dragon',
'Emerald Dragon Wyrmling','Adult Emerald Dragon','Ancient Emerald Dragon',
'Sapphire Dragon Wyrmling','Adult Sapphire Dragon','Ancient Sapphire Dragon',
'Topaz Dragon Wyrmling','Adult Topaz Dragon','Ancient Topaz Dragon',
'Moonstone Dragon Wyrmling','Adult Moonstone Dragon','Ancient Moonstone Dragon',
'Deep Dragon Wyrmling','Adult Deep Dragon','Ancient Deep Dragon',
'Gem Stalker','Gem Greatwyrm','Chromatic Greatwyrm','Metallic Greatwyrm',
'Animated Breath','Aspect of Bahamut','Aspect of Tiamat','Dracohydra',
'Draconians','Draconic Shard','Dragonblood Ooze','Dragonbone Golem',
'Dragonborn Champions','Dragonflesh Grafters','Dragon Followers','Dragonnel',
'Dragon Turtle Wyrmling','Young Dragon Turtle','Adult Dragon Turtle','Ancient Dragon Turtle',
'Egg Hunters','Elder Brain Dragon','Eyedrake','Ghost Dragon','Hoard Mimic',
'Hoard Scarabs','Hollow Dragon','Liondrake','Metallic Sentinels','Sea Serpents'
];
var FAMILY_NAMES={aberration:'Аберрации',humanoid:'Гуманоиды',monstrosity:'Чудовища',fey:'Феи',magical_beast:'Магические звери',construct:'Конструкты',fiend:'Исчадия',elemental:'Элементали',dragon:'Драконы',undead:'Нежить',plant:'Растения',celestial:'Небожители'};
var SOURCE='fizban_treasury';
function family(name){var s=name.toLowerCase();
 if(/dragonbone golem|golem|sentinel/.test(s))return'construct';
 if(/elder brain dragon|dragonblood ooze|draconians|dragonborn|grafters|followers|egg hunters/.test(s))return s.indexOf('ooze')>=0?'ooze': 'humanoid';
 if(/bahamut/.test(s))return'celestial';
 if(/tiamat/.test(s))return'fiend';
 if(/dracohydra|dragonnel|liondrake|sea serpent|eyedrake|hoard mimic|hoard scarabs|gem stalker/.test(s))return'monstrosity';
 if(/ghost|hollow/.test(s))return'undead';
 return'dragon';
}
function role(name){var s=name.toLowerCase();
 if(/greatwyrm|aspect|elder brain|hydra|dragon turtle|ancient|adult/.test(s))return'bruiser';
 if(/stalker|eyedrake|sentinel|sea serpent|scarab/.test(s))return'hunter';
 if(/ooze|ghost|hollow|shard/.test(s))return'controller';
 if(/golem|grafters|champion|follower|draconian/.test(s))return'guardian';
 return'ranged';
}
function crFor(i,name){var s=name.toLowerCase();
 if(/aspect of|greatwyrm|ancient/.test(s))return 20+(i%9);
 if(/adult/.test(s))return 13+(i%5);
 if(/elder brain dragon|dragon turtle/.test(s))return /ancient/.test(s)?20:12;
 if(/wyrmling|shard|scarabs/.test(s))return 2+(i%4);
 if(/golem|dracohydra|hollow dragon|ghost dragon|gem stalker|sea serpent/.test(s))return 8+(i%8);
 return 4+(i%9);
}
function habitat(name){var s=name.toLowerCase();
 if(/deep dragon|elder brain|gem stalker/.test(s))return['underdark','caves'];
 if(/sea serpent|dragon turtle/.test(s))return['coast','underwater'];
 if(/moonstone|crystal|amethyst|emerald|sapphire|topaz|gem/.test(s))return['mountains','crystal caverns'];
 if(/ghost|hollow|undead/.test(s))return['graveyard','ruins'];
 return['mountains','wilderness'];
}
function material(name,fam){var s=name.toLowerCase();
 var tag=fam==='dragon'?'scale':fam==='construct'?'metal':fam==='undead'?'bone':fam==='celestial'?'essence':fam==='fiend'?'essence':fam==='humanoid'?'trophy':'hide';
 var clean=name.toLowerCase().replace(/[^a-z0-9]+/g,'_');
 var tool=fam==='construct'?'p_tool_smith':(fam==='dragon'?'p_tool_leatherworker':(fam==='elemental'||fam==='celestial'||fam==='fiend'?'p_tool_alchemist':'p_tool_leatherworker'));
 return {name:name+' harvest',category:'materials',count:[1,3],guaranteed:true,tags:[tag,fam,'fizban'],skill:fam==='construct'?'arcana':'survival',dc:12,craftMaterialId:'v56_5_'+clean,tool:tool};
}
function profile(name,i){var fam=family(name),r=role(name),cr=crFor(i,name),xp=Math.max(50,cr*cr*50),ac=12+Math.min(9,Math.floor(cr/3)),hp=12+cr*12+(i%9)*4;
 var dex=r==='hunter'?16:12,str=r==='bruiser'?20:16,con=16+Math.min(5,Math.floor(cr/5)),int=r==='controller'?18:10,wis=14,cha=fam==='dragon'?16:10;
 var atkBonus=4+Math.floor(cr/2),damage=cr>=18?'4d10+8':cr>=10?'3d10+6':cr>=5?'2d8+5':'1d8+3';
 var acts=[{name:'Draconic Strike',kind:'attack',bonus:atkBonus,damage:damage,damageType:fam==='dragon'?'elemental':'physical'}];
 if(fam==='dragon'||/dracohydra|dragonnel/.test(name.toLowerCase()))acts.push({name:'Breath Surge',kind:'aoe',description:'Original app-native cone attack with damage type selected from the creature profile.'});
 if(r==='controller')acts.push({name:'Arcane Distortion',kind:'utility',description:'Original app-native control action that complicates movement or targeting.'});
 if(r==='hunter')acts.push({name:'Predatory Rush',kind:'attack',bonus:atkBonus,damage:'2d6+'+(2+Math.floor(cr/3)),damageType:'physical'});
 if(r==='guardian')acts.push({name:'Guarding Counter',kind:'reaction',description:'Original app-native defensive reaction protecting an allied token.'});
 var h=material(name,fam);
 return {name:name,familyId:fam,cr:String(cr),xp:xp,ac:ac,hp:hp,maxHp:hp,initiative:mod(dex),speed:r==='hunter'?40:30,abilities:{str:str,dex:dex,con:con,int:int,wis:wis,cha:cha},actions:acts,role:r,habitats:habitat(name),sourceType:'official-name-catalog / authorial-mechanics',sourcePack:SOURCE,sourceLabel:"Fizban's Treasury of Dragons",bestiaryVersion:'2.0.5',loot:{pockets:{rolls:0,table:[]},harvest:[h]},ecology:{habitats:habitat(name),social:/dragon|draconian|dragonborn|sentinel|follower/.test(name.toLowerCase())?'group':'variable',activity:/ghost|hollow|deep/.test(name.toLowerCase())?'nocturnal':'diurnal',diet:fam==='construct'?'none':fam==='plant'?'photosynthetic':'omnivore',role:r}};
}
var CATALOG={};NAMES.forEach(function(n,i){if(!base.catalog[n])CATALOG[n]=profile(n,i);});
function register(){Object.keys(CATALOG).forEach(function(n){var c=CATALOG[n];base.families[c.familyId]=base.families[c.familyId]||{id:c.familyId,name:FAMILY_NAMES[c.familyId]||c.familyId,category:c.familyId,habitats:c.habitats,variantHooks:['source','regional']};c.family=FAMILY_NAMES[c.familyId]||c.familyId;base.catalog[n]=clone(c);if(base.familyByCreature)base.familyByCreature[n]=c.familyId;monsters.catalog[n]=clone(c);if(loot&&loot.catalog)loot.catalog[n]=clone(c.loot);var h=c.loot.harvest[0];if(craft&&h&&h.craftMaterialId&&Array.isArray(craft.MATERIALS)&&!craft.MATERIALS.some(function(m){return m.id===h.craftMaterialId;}))craft.MATERIALS.push({id:h.craftMaterialId,name:h.name,cat:'monster_harvest',rarity:'rare',price:12,weight:.1,roles:['harvest','crafting'],tags:h.tags,source:'bestiary_v56_5'});});}
function getCreature(n){return CATALOG[n]?clone(CATALOG[n]):(base.catalog[n]?clone(base.catalog[n]):null);}
function listBySource(s){return Object.keys(CATALOG).filter(function(n){return CATALOG[n].sourcePack===s;}).map(getCreature);}
function listByFamily(f){return Object.keys(CATALOG).filter(function(n){return CATALOG[n].familyId===f;}).map(getCreature);}
function summary(){var byFamily={};Object.keys(CATALOG).forEach(function(n){var f=CATALOG[n].familyId;byFamily[f]=(byFamily[f]||0)+1;});return {version:'56.5.0',source:SOURCE,added:Object.keys(CATALOG).length,total:Object.keys(base.catalog).length,families:byFamily};}
register();global.DND_BESTIARY_V56_5={VERSION:'56.5.0',catalog:CATALOG,sourcePack:SOURCE,getCreature:getCreature,listBySource:listBySource,listByFamily:listByFamily,summary:summary,register:register};
})(window);
