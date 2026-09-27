/**
 * bestiary_catalog_v56_9.js
 * ------------------------------------------------------------------
 * WHAT THIS FILE IS:
 * V56.9 is the Mythic Odysseys of Theros catalogue layer. It adds
 * creature names from Mythic Odysseys of Theros using original app-native
 * mechanics; it does NOT reproduce published statblocks or text.
 *
 * HOW IT WORKS:
 * - sourcePack=theros_moot marks the source pack;
 * - profiles are generated deterministically from creature archetype;
 * - combat uses the existing Monster Engine;
 * - dragon harvest is bridged into the existing crafting material catalog;
 * - existing creatures are skipped automatically to prevent duplicates.
 * IMPORTANT APIS: DND_BESTIARY_V56_9, getCreature(), listBySource(),
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
'Amphisbaena',
'Anvilwrought Raptor',
'Anvilwrought Mastiff',
'Anvilwrought Lion',
'Archon of Falling Stars',
'Archon of the Triumvirate',
'Cerberus',
'Chimera',
'Colossus of Akros',
'Eidolon of Obedience',
'Eidolon of Combat',
'Fleecemane Lion',
'Hippocamp',
'Iron-Scale Hydra',
'Lernaean Hydra',
'Polukranos',
'Nyxborn Brute',
'Nyxborn Lynx',
'Nyxborn Wolf',
'Nyxborn Pegasus',
'Nyx-Fleece Ram',
'Nymph',
'Oceanid',
'Dryad of Theros',
'Satyr Reveler',
'Returned Drifter',
'Returned Palamnite',
'Returned Sentry',
'Phylaskia',
'Woe Strider',
'Typhon',
'Arasta of the Endless Web',
'Hythonia the Cruel',
'Tromokratis',
'Aphemia',
'Ashen Rider',
'Bident of Thassa Guardian',
'Bronze Sable',
'Dreadmaw',
'Fell Hide Penanggalan',
'Gorgon of Theros',
'Griffin of Theros',
'Hoplite Veteran',
'Leonin Champion',
'Minotaur Warrior',
'Oracle of Theros',
'Pheres-Band Centaur',
'Pheres-Band Raiders',
'Skophos Maze-Warden',
'Thassa Kraken Spawn',
'Theran Kraken',
'Underworld Cerberus',
'Winged Chimera',
'Winged Lion',
'Akroan War Beast',
'Mogis Blood-Touched',
'Erebos Returned',
'Nyxborn Stalker',
 ];
var FAMILY_NAMES={aberration:'Аберрации',humanoid:'Гуманоиды',monstrosity:'Чудовища',fey:'Феи',magical_beast:'Магические звери',construct:'Конструкты',fiend:'Исчадия',elemental:'Элементали',dragon:'Драконы',undead:'Нежить',plant:'Растения',celestial:'Небожители'};
var SOURCE='theros_moot';
function family(name){var s=name.toLowerCase();
 if(/barrowghast|cairnwight|death giant|frostmourn/.test(s))return'undead';
 if(/cinder hulk|dust hulk|lightning hulk|mist hulk|mud hulk|rime hulk|storm herald|tempest spirit|spectral cloud/.test(s))return'elemental';
 if(/runic colossus|flesh colossus|gigant/.test(s))return'construct';
 if(/echo of demogorgon|maw of yeenoghu|stalker of baphomet|fury of kostchtchie/.test(s))return'fiend';
 if(/ettin ceremorph|gargantua/.test(s))return'aberration';
 if(/firbolg|goliath|giant|fomorian|fensir|scion/.test(s))return'humanoid';
 if(/aerosaur|altisaur|ceratops|regisaur|titanothere|goose|lynx|ox|ram|tick|lion/.test(s))return'magical_beast';
 if(/anvilwrought|eidolon|colossus|guardian|sable/.test(s))return'construct';
 if(/nyxborn|phylaskia|woe strider|aphemia/.test(s))return'magical_beast';
 if(/archon/.test(s))return'celestial';
 if(/returned|ashen rider|erebos/.test(s))return'undead';
 if(/cerberus|chimera|hydra|amphisbaena|typhon|gorgon|lion|hippocamp|kraken|centaur|minotaur|griffin|satyr|ram|lynx|wolf|pegasus/.test(s))return'magical_beast';
 if(/nyp?hm|oceanid|dryad/.test(s))return'fey';
 if(/hoplite|leonin|satyr|oracle|raider|palamnite|sentry|warrior|champion/.test(s))return'humanoid';
 if(/archon/.test(s))return'celestial';
 if(/bag jelly|grinning cat/.test(s))return'ooze';
 return'monstrosity';
}
function role(name){var s=name.toLowerCase();
 if(/mythic|typhon|arasta|hythonia|tromokratis|polukranos|hydra|colossus/.test(s))return'bruiser';
 if(/stalker|lion|wolf|cerberus|gryphon|hippocamp/.test(s))return'hunter';
 if(/eidolon|nymph|archon|oracle|returned/.test(s))return'controller';
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
 if(/hippocamp|kraken|thassa|ocean/.test(s))return['coast','underwater'];
 if(/returned|erebos|phylaskia/.test(s))return['underworld','ruins'];
 if(/nyx|archon|nymph|nyxborn/.test(s))return['nyx','temple'];
 if(/satyr|nymph|dryad|lion|ram|centaur/.test(s))return['forest','wilderness'];
 return['theran wilderness','ruins'];
}
function material(name,fam){var s=name.toLowerCase();
 var tag=fam==='construct'?'bronze':fam==='undead'?'underworld_relic':fam==='celestial'?'divine_essence':fam==='fey'?'nyx_bloom':fam==='magical_beast'?'mythic_beast_part':fam==='humanoid'?'theran_hide':fam==='fiend'?'ichor':fam==='aberration'?'nyx_ichor':'monster_part';
 var clean=name.toLowerCase().replace(/[^a-z0-9]+/g,'_');
 var tool=fam==='construct'?'p_tool_smith':(fam==='undead'||fam==='celestial'||fam==='fey'?'p_tool_alchemist':(fam==='humanoid'?'p_tool_leatherworker':'p_tool_alchemist'));
 return {name:name+' harvest',category:'materials',count:[1,3],guaranteed:true,tags:[tag,fam,'theros'],skill:fam==='construct'?'arcana':'survival',dc:12,craftMaterialId:'v56_9_'+clean,tool:tool};
}
function profile(name,i){var fam=family(name),r=role(name),cr=crFor(i,name),xp=Math.max(50,cr*cr*50),ac=12+Math.min(9,Math.floor(cr/3)),hp=12+cr*12+(i%9)*4;
 var dex=r==='hunter'?16:12,str=r==='bruiser'?20:16,con=16+Math.min(5,Math.floor(cr/5)),int=r==='controller'?18:10,wis=14,cha=fam==='dragon'?16:10;
 var atkBonus=4+Math.floor(cr/2),damage=cr>=18?'4d10+8':cr>=10?'3d10+6':cr>=5?'2d8+5':'1d8+3';
 var acts=[{name:'Mythic Strike',kind:'attack',bonus:atkBonus,damage:damage,damageType:fam==='celestial'?'radiant':fam==='undead'?'necrotic':'physical'}];
 if(/mythic|arasta|hythonia|tromokratis|typhon/.test(name.toLowerCase()))acts.push({name:'Mythic Trait',kind:'mythic',description:'Original app-native second-phase encounter mechanic; restores resources and unlocks enhanced actions.'});
 if(fam==='dragon'||/dracohydra|dragonnel/.test(name.toLowerCase()))acts.push({name:'Breath Surge',kind:'aoe',description:'Original app-native cone attack with damage type selected from the creature profile.'});
 if(r==='controller')acts.push({name:'Arcane Distortion',kind:'utility',description:'Original app-native control action that complicates movement or targeting.'});
 if(r==='hunter')acts.push({name:'Predatory Rush',kind:'attack',bonus:atkBonus,damage:'2d6+'+(2+Math.floor(cr/3)),damageType:'physical'});
 if(r==='guardian')acts.push({name:'Guarding Counter',kind:'reaction',description:'Original app-native defensive reaction protecting an allied token.'});
 var h=material(name,fam);
 return {name:name,familyId:fam,cr:String(cr),xp:xp,ac:ac,hp:hp,maxHp:hp,initiative:mod(dex),speed:r==='hunter'?40:30,abilities:{str:str,dex:dex,con:con,int:int,wis:wis,cha:cha},actions:acts,role:r,habitats:habitat(name),sourceType:'official-name-catalog / authorial-mechanics',sourcePack:SOURCE,sourceLabel:"Mythic Odysseys of Theros",bestiaryVersion:'2.0.7',loot:{pockets:{rolls:0,table:[]},harvest:[h]},ecology:{habitats:habitat(name),social:/dragon|draconian|dragonborn|sentinel|follower/.test(name.toLowerCase())?'group':'variable',activity:/ghost|hollow|deep/.test(name.toLowerCase())?'nocturnal':'diurnal',diet:fam==='construct'?'none':fam==='plant'?'photosynthetic':'omnivore',role:r}};
}
var CATALOG={};NAMES.forEach(function(n,i){if(!base.catalog[n])CATALOG[n]=profile(n,i);});
function register(){Object.keys(CATALOG).forEach(function(n){var c=CATALOG[n];base.families[c.familyId]=base.families[c.familyId]||{id:c.familyId,name:FAMILY_NAMES[c.familyId]||c.familyId,category:c.familyId,habitats:c.habitats,variantHooks:['source','regional']};c.family=FAMILY_NAMES[c.familyId]||c.familyId;base.catalog[n]=clone(c);if(base.familyByCreature)base.familyByCreature[n]=c.familyId;monsters.catalog[n]=clone(c);if(loot&&loot.catalog)loot.catalog[n]=clone(c.loot);var h=c.loot.harvest[0];if(craft&&h&&h.craftMaterialId&&Array.isArray(craft.MATERIALS)&&!craft.MATERIALS.some(function(m){return m.id===h.craftMaterialId;}))craft.MATERIALS.push({id:h.craftMaterialId,name:h.name,cat:'monster_harvest',rarity:'uncommon',price:12,weight:.1,roles:['harvest','crafting'],tags:h.tags,source:'bestiary_v56_9'});});}
function getCreature(n){return CATALOG[n]?clone(CATALOG[n]):(base.catalog[n]?clone(base.catalog[n]):null);}
function listBySource(s){return Object.keys(CATALOG).filter(function(n){return CATALOG[n].sourcePack===s;}).map(getCreature);}
function listByFamily(f){return Object.keys(CATALOG).filter(function(n){return CATALOG[n].familyId===f;}).map(getCreature);}
function summary(){var byFamily={};Object.keys(CATALOG).forEach(function(n){var f=CATALOG[n].familyId;byFamily[f]=(byFamily[f]||0)+1;});return {version:'56.9.0',source:SOURCE,added:Object.keys(CATALOG).length,total:Object.keys(base.catalog).length,families:byFamily};}
register();global.DND_BESTIARY_V56_9={VERSION:'56.9.0',catalog:CATALOG,sourcePack:SOURCE,getCreature:getCreature,listBySource:listBySource,listByFamily:listByFamily,summary:summary,register:register};
})(window);
