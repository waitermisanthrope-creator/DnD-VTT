/**
 * bestiary_catalog_v56_11.js
 * ------------------------------------------------------------------
 * WHAT THIS FILE IS:
 * V56.11 is the Spelljammer source-pack layer. It registers the named
 * creatures from Boo's Astral Menagerie plus the ten Spelljammer creatures
 * in Monstrous Compendium Vol. 1, using original app-native mechanics.
 *
 * HOW IT WORKS:
 * - duplicate protection prevents re-registering creatures already present;
 * - sourcePack preserves the exact source family for each entry;
 * - profiles are deterministic and intentionally do not reproduce published
 *   stat-block prose;
 * - Wildspace/Astral hooks, void ecology and ship-encounter metadata plug into
 *   existing encounter, combat, loot and crafting owners.
 *
 * IMPORTANT APIS: DND_BESTIARY_V56_11, getCreature(), listBySource(),
 * listByFamily(), summary(), register().
 * ------------------------------------------------------------------
 */
(function(global){'use strict';
var base=global.DNDExpandedBestiary, monsters=global.DNDMonsters, loot=global.DNDMonsterLoot;
var craft=global.DND_CRAFTING_V31;
if(!base||!monsters)return;
function clone(v){return JSON.parse(JSON.stringify(v));}
function mod(n){return Math.floor((n-10)/2);}
var BAM='spelljammer_boo_astral_menagerie', MC1='spelljammer_mon_compendium_1';
var NAMES=[
['Aartuk','bam'],['Aartuk Elder','bam'],['Aartuk Starhorror','bam'],['Aartuk Weedling','bam'],
['Astral Elf Aristocrat','bam'],['Astral Elf Commander','bam'],['Astral Elf Honor Guard','bam'],['Astral Elf Star Priest','bam'],['Astral Elf Warrior','bam'],
['Autognome','bam'],['Braxat','bam'],["B'rohg",'bam'],['Chwinga','bam'],['Cosmic Horror','bam'],['Dohwar','bam'],['Esthetic','bam'],['Eye Monger','bam'],['Feyr','bam'],['Gaj','bam'],
['Giff Shipmate','bam'],['Giff Shock Trooper','bam'],['Giff Warlord','bam'],['Githyanki Buccaneer','bam'],['Githyanki Star Seer','bam'],['Githyanki Xenomancer','bam'],
['Hadozee Explorer','bam'],['Hadozee Shipmate','bam'],['Hadozee Warrior','bam'],['Jammer Leech','bam'],['Kindori','bam'],
['Ancient Lunar Dragon','bam'],['Adult Lunar Dragon','bam'],['Young Lunar Dragon','bam'],['Lunar Dragon Wyrmling','bam'],['Megapede','bam'],['Mercane','bam'],['Murder Comet','bam'],['Neh-thalggu','bam'],
['Neogi Hatchling Swarm','bam'],['Neogi Pirate','bam'],['Neogi Void Hunter','bam'],['Plasmoid Boss','bam'],['Plasmoid Explorer','bam'],['Plasmoid Warrior','bam'],
['Psurlon','bam'],['Psurlon Leader','bam'],['Psurlon Ringer','bam'],['Reigar','bam'],['Talarith','bam'],
['Brown Scavver','bam'],['Gray Scavver','bam'],['Night Scavver','bam'],['Void Scavver','bam'],
['Ancient Solar Dragon','bam'],['Adult Solar Dragon','bam'],['Young Solar Dragon','bam'],['Solar Dragon Wyrmling','bam'],
['Space Clown','bam'],['Space Eel','bam'],['Space Guppy','bam'],['Giant Space Hamster','bam'],['Space Hamster','bam'],['Space Mollymawk','bam'],['Space Swine','bam'],
['Ssurran','bam'],['Ssurran Defiler','bam'],['Ssurran Poisoner','bam'],['Starlight Apparition','bam'],['Thri-kreen Gladiator','bam'],['Thri-kreen Hunter','bam'],['Thri-kreen Mystic','bam'],
['Vampirate','bam'],['Vampirate Captain','bam'],['Vampirate Mage','bam'],['Zodar','bam'],
['Asteroid Spider','mc1'],['Clockwork Horror','mc1'],['Eldritch Lich','mc1'],['Fractine','mc1'],['Gadabout','mc1'],['Goon Balloon','mc1'],['Nightmare Beast','mc1'],['Puppeteer Parasite','mc1'],['Star Lancer','mc1'],['Yggdrasti','mc1']
];
var FAMILY_NAMES={aberration:'Аберрации',humanoid:'Гуманоиды',monstrosity:'Чудовища',fey:'Феи',construct:'Конструкты',fiend:'Исчадия',elemental:'Элементали',dragon:'Драконы',undead:'Нежить',plant:'Растения',celestial:'Небожители',beast:'Звери'};
function family(name){var s=name.toLowerCase();
 if(/clockwork horror|autognome|fractine/.test(s))return'construct';
 if(/eldritch lich|vampirate|starlight apparition/.test(s))return'undead';
 if(/solar dragon|lunar dragon/.test(s))return'dragon';
 if(/star lancer/.test(s))return'celestial';
 if(/gadabout|yggdrasti/.test(s))return'plant';
 if(/giff|githyanki|hadozee|dohwar|mercane|reigar|thri-kreen|plasmoid|astral elf|ssurran|neogi|b'rohg/.test(s))return'humanoid';
 if(/psurlon|neh-thalggu|cosmic horror|eye monger|feyr|gaj|goon balloon|puppeteer|jammer leech|zodar/.test(s))return'aberration';
 if(/aartuk/.test(s))return'plant';
 if(/chwinga/.test(s))return'fey';
 if(/space guppy|space hamster|space mollymawk|space swine|kindori/.test(s))return'beast';
 if(/braxat|esthetic|scavver|megapede|space eel|space clown|murder comet|asteroid spider|nightmare beast/.test(s))return'monstrosity';
 return'monstrosity';
}
function role(name){var s=name.toLowerCase();
 if(/dragon|braxat|nightmare beast|asteroid spider|zodar|yggdrasti|cosmic horror/.test(s))return'bruiser';
 if(/scavver|vampirate|giff shock|githyanki buccaneer|thri-kreen hunter|space clown|murder comet|jammer leech/.test(s))return'hunter';
 if(/star priest|star seer|xenomancer|psurlon leader|psurlon ringer|mercane|reigar|eldritch lich|puppeteer|clockwork/.test(s))return'controller';
 if(/astral elf warrior|giff shipmate|hadozee|plasmoid|ssurran|thri-kreen gladiator|aartuk|neogi/.test(s))return'guardian';
 return'scout';
}
function crFor(name){var s=name.toLowerCase();
 if(/ancient solar dragon/.test(s))return 21;if(/ancient lunar dragon/.test(s))return 17;if(/nightmare beast|asteroid spider|eldritch lich/.test(s))return 15;
 if(/adult solar dragon/.test(s))return 16;if(/adult lunar dragon|yggdrasti/.test(s))return 12;if(/zodar/.test(s))return 16;
 if(/greater|void scavver|reigar|cosmic horror/.test(s))return 10;if(/braxat|gaj|eye monger|night scavver|vampirate captain|solar dragon wyrmling/.test(s))return 8;
 if(/young solar dragon|young lunar dragon|giff warlord|githyanki xenomancer|astral elf commander|star priest|mercane|vampirate mage|psurlon leader|space clown/.test(s))return 5;
 if(/astral elf honor guard|giff shock trooper|githyanki star seer|thri-kreen mystic|vampirate|neh-thalggu|psurlon|ssurran defiler|scavver/.test(s))return 3;
 if(/giff shipmate|githyanki buccaneer|hadozee warrior|plasmoid boss|ssurran poisoner|thri-kreen gladiator|reigar|murder comet|fractine|puppeteer parasite|clockwork horror|star lancer/.test(s))return 2;
 if(/autognome|hadozee explorer|hadozee shipmate|plasmoid explorer|plasmoid warrior|space eel|space guppy|space hamster|space mollymawk|space swine|chwinga|dohwar|feyr|gaj|talarith|gadabout|goon balloon/.test(s))return 1;
 if(/aartuk weedling|neogi hatchling|jammer leech|kindori|space/.test(s))return .5;
 return 1;
}
function habitat(name){var s=name.toLowerCase();
 if(/astral elf|githyanki|mercane|reigar|psurlon|zodar|star lancer|eldritch lich/.test(s))return['astral sea','wildspace','astral dominion'];
 if(/vampirate|neogi|giff|hadozee|plasmoid|thri-kreen|ssurran/.test(s))return['spelljamming ship','wildspace','asteroid settlement'];
 if(/dragon|kindori|space eel|space guppy|space hamster|mollymawk|space swine|scavver/.test(s))return['wildspace','planetary system'];
 if(/yggdrasti|gadabout|aartuk/.test(s))return['asteroid','wildspace','alien flora'];
 return['wildspace','astral sea','ruins'];
}
function spaceHooks(name,source,fam,roleName){var s=name.toLowerCase();var h={wildspaceEligible:true,zeroG:true,astralTravel:true,shipEncounterEligible:true,airEnvelopeRisk:false,gravityInteraction:'standard',astralAffinity:source===MC1?2:1};
 if(/space eel|space guppy|kindori|dragon|scavver|mollymawk/.test(s))h.airEnvelopeRisk=true;
 if(/vampirate|neogi|giff|hadozee|githyanki|plasmoid|astral elf|thri-kreen/.test(s))h.shipboardRole='crew_or_boarder';
 if(/murder comet|space clown|asteroid spider|nightmare beast|cosmic horror/.test(s))h.shipHazard='high';
 if(/zodar|star lancer|eldritch lich|reigar|mercane/.test(s))h.astralMystery=true;
 if(/clockwork horror|fractine|puppeteer parasite/.test(s))h.technicalHazard=true;
 return h;
}
function material(name,fam,source){var tag=fam==='dragon'?'astral_dragon_scale':fam==='undead'?'void_ichor':fam==='construct'?'spelljammer_mechanism':fam==='plant'?'astral_fiber':fam==='humanoid'?'wildspace_gear':fam==='aberration'?'astral_tissue':'wildspace_beast_part';
 var clean=name.toLowerCase().replace(/[^a-z0-9]+/g,'_');
 return {name:name+' harvest',category:'materials',count:[1,3],guaranteed:true,tags:[tag,fam,'spelljammer','wildspace'],skill:fam==='construct'?'arcana':'survival',dc:13,craftMaterialId:'v56_11_'+clean,tool:fam==='dragon'?'p_tool_leatherworker':'p_tool_alchemist',source:source};
}
function profile(name,i,source){var fam=family(name),r=role(name),cr=crFor(name),xp=Math.max(25,Math.round(cr*cr*50)),ac=11+Math.min(10,Math.floor(cr/3)),hp=10+Math.round(cr*13)+(i%7)*3;
 var dex=r==='hunter'?17:12,str=r==='bruiser'?20:15,con=15+Math.min(7,Math.floor(cr/4)),int=r==='controller'?17:10,wis=14,cha=/vampirate|reigar|mercane|astral elf/.test(name.toLowerCase())?16:10;
 var atkBonus=4+Math.floor(cr/2),damage=cr>=15?'4d10+8':cr>=8?'3d10+7':cr>=3?'2d8+5':'1d6+2';
 var acts=[{name:'Void Strike',kind:'attack',bonus:atkBonus,damage:damage,damageType:fam==='undead'?'necrotic':fam==='aberration'?'psychic':'physical'}];
 var h=spaceHooks(name,source,fam,r);
 acts.push({name:'Wildspace Maneuver',kind:'movement',description:'Original app-native zero-gravity/shipboard movement hook for encounter positioning.'});
 if(h.shipEncounterEligible)acts.push({name:'Shipboard Pressure',kind:'encounter',description:'Original app-native hook for boarding, hull-side, deck and crew encounters.'});
 if(h.airEnvelopeRisk)acts.push({name:'Air Envelope Interaction',kind:'hazard',description:'Original app-native environmental hook for air supply and open-space encounters.'});
 if(h.astralMystery)acts.push({name:'Astral Resonance',kind:'astral',description:'Original app-native hook for magical, planar or navigation events in the Astral Sea.'});
 if(h.technicalHazard)acts.push({name:'Arcane Mechanism',kind:'hazard',description:'Original app-native technical hazard hook for constructs, parasites or unstable devices.'});
 if(/vampirate/.test(name.toLowerCase()))acts.push({name:'Boarding Raid',kind:'boarding',description:'Original app-native boarding encounter hook.'});
 if(/murder comet|space clown/.test(name.toLowerCase()))acts.push({name:'Wildspace Surprise',kind:'hazard',description:'Original app-native surprise hazard hook for bizarre Wildspace encounters.'});
 var mh=material(name,fam,source);
 return {name:name,familyId:fam,cr:String(cr),xp:xp,ac:ac,hp:hp,maxHp:hp,initiative:mod(dex),speed:r==='hunter'?40:30,abilities:{str:str,dex:dex,con:con,int:int,wis:wis,cha:cha},actions:acts,role:r,habitats:habitat(name),sourceType:'official-name-catalog / authorial-mechanics',sourcePack:source,sourceLabel:source===BAM?"Boo's Astral Menagerie":"Monstrous Compendium Vol. 1: Spelljammer Creatures",bestiaryVersion:'2.0.11',loot:{pockets:{rolls:0,table:[]},harvest:[mh]},wildspace:h,ecology:{habitats:habitat(name),social:/swarm|crew|horde|giff|githyanki|neogi/.test(name.toLowerCase())?'group':'variable',activity:'variable',diet:fam==='construct'?'none':fam==='plant'?'photosynthetic':'omnivore',role:r}};
}
var CATALOG={};NAMES.forEach(function(pair,i){var n=pair[0],source=pair[1]==='mc1'?MC1:BAM;if(!base.catalog[n])CATALOG[n]=profile(n,i,source);});
function register(){Object.keys(CATALOG).forEach(function(n){var c=CATALOG[n];base.families[c.familyId]=base.families[c.familyId]||{id:c.familyId,name:FAMILY_NAMES[c.familyId]||c.familyId,category:c.familyId,habitats:c.habitats,variantHooks:['source','regional','wildspace']};c.family=FAMILY_NAMES[c.familyId]||c.familyId;base.catalog[n]=clone(c);if(base.familyByCreature)base.familyByCreature[n]=c.familyId;monsters.catalog[n]=clone(c);if(loot&&loot.catalog)loot.catalog[n]=clone(c.loot);var mh=c.loot.harvest[0];if(craft&&mh&&mh.craftMaterialId&&Array.isArray(craft.MATERIALS)&&!craft.MATERIALS.some(function(m){return m.id===mh.craftMaterialId;}))craft.MATERIALS.push({id:mh.craftMaterialId,name:mh.name,cat:'monster_harvest',rarity:'uncommon',price:13,weight:.1,roles:['harvest','crafting'],tags:mh.tags,source:'bestiary_v56_11'});});}
function getCreature(n){return CATALOG[n]?clone(CATALOG[n]):(base.catalog[n]?clone(base.catalog[n]):null);}
function listBySource(s){return Object.keys(CATALOG).filter(function(n){return CATALOG[n].sourcePack===s;}).map(getCreature);}
function listByFamily(f){return Object.keys(CATALOG).filter(function(n){return CATALOG[n].familyId===f;}).map(getCreature);}
function summary(){var byFamily={},bySource={},wild=0;Object.keys(CATALOG).forEach(function(n){var c=CATALOG[n],f=c.familyId;byFamily[f]=(byFamily[f]||0)+1;bySource[c.sourcePack]=(bySource[c.sourcePack]||0)+1;if(c.wildspace&&c.wildspace.wildspaceEligible)wild++;});return {version:'56.11.0',added:Object.keys(CATALOG).length,total:Object.keys(base.catalog).length,families:byFamily,sources:bySource,wildspaceEligible:wild};}
register();global.DND_BESTIARY_V56_11={VERSION:'56.11.0',catalog:CATALOG,sourcePacks:[BAM,MC1],getCreature:getCreature,listBySource:listBySource,listByFamily:listByFamily,summary:summary,register:register};
})(window);
