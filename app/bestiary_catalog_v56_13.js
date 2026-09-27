/**
 * bestiary_catalog_v56_13.js
 * WHAT THIS FILE IS: V56.13 Planescape: Adventures in the Multiverse source-pack layer.
 * HOW IT WORKS: registers the verified Planescape creature index with duplicate protection,
 * then adds reusable app-native planar metadata for Sigil, the Outlands, factions, portals
 * and Outer Plane influences. Combat values/actions and harvest logic are original app-native
 * implementations; published statblock prose/mechanics are not copied.
 * IMPORTANT APIS: DND_BESTIARY_V56_13, DND_PLANESCAPE_V56_13.
 */
(function(global){'use strict';
var base=global.DNDExpandedBestiary, monsters=global.DNDMonsters, loot=global.DNDMonsterLoot, craft=global.DND_CRAFTING_V31;
if(!base||!monsters)return;
function clone(v){return JSON.parse(JSON.stringify(v));}
function mod(n){return Math.floor((n-10)/2);}
var SOURCE='planescape_mortes_planar_parade';
var NAMES=[
'Hound Archon','Lantern Archon','Warden Archon','Baernaloth','Bariaur Wanderer','Cranium Rat Squeaker','Cranium Rat Squeaker Swarm','Dabus','Darkweaver','Farastu Demodand','Kelubar Demodand','Shator Demodand','Eater of Knowledge','Githzerai Futurist','Githzerai Traveler','Githzerai Uniter','Avoral Guardinal','Equinal Guardinal','Musteval Guardinal','Kolyarut','Maelephant','Decaton Modron','Hexton Modron','Nonaton Modron','Octon Modron','Septon Modron','Planar Incarnate','Razorvine Blight','Aurumach Rilmani','Cuprilach Rilmani','Ferrumach Rilmani','Shemeshka','Sunfly','Swarm of Sunflies','Ancient Time Dragon','Adult Time Dragon','Young Time Dragon','Time Dragon Wyrmling','Vargouille Reflection',
'Athar Null','Bleak Cabal Void Soother','Doomguard Doom Lord','Doomguard Rot Blade','Fated Shaker','Fraternity of Order Law Bender','Hands of Havoc Fire Starter','Harmonium Captain','Harmonium Peacekeeper','Heralds of Dust Remnant','Mercykiller Bloodhound','Mind’s Eye Matter Smith','Society of Sensation Muse','Transcendent Order Conduit','Transcendent Order Instinct'
];
var PLANES=['Astral Plane','Arborea','Arcadia','Beastlands','Bytopia','Carceri','Elysium','Gehenna','Hades','Limbo','Mechanus','Mount Celestia','Nine Hells','Outlands','Pandemonium','Ysgard'];
var GATE_TOWNS=['Automata','Bedlam','Curst','Ecstasy','Faunel','Glorium','Hopeless','Plague-Mort','Ribcage','Sylvania','Torch','Tradegate','Xaos','Excelsior','Faerinaal','Fortitude'];
var FACTIONS=['Athar','Bleak Cabal','Doomguard','Fated','Fraternity of Order','Hands of Havoc','Harmonium','Heralds of Dust','Mercykillers','Mind’s Eye','Society of Sensation','Transcendent Order'];
var FAMILY_NAMES={celestial:'Небожители',fiend:'Исчадия',humanoid:'Гуманоиды',aberration:'Аберрации',construct:'Конструкты',dragon:'Драконы',plant:'Растения',undead:'Нежить',monstrosity:'Чудовища'};
function family(n){var s=n.toLowerCase();
 if(/archon|guardinal|dabus|maelephant/.test(s))return'celestial';
 if(/baernaloth|demodand|shemeshka|doomguard|heralds of dust/.test(s))return'fiend';
 if(/githzerai|bariaur|athar null|fated shaker|fraternity|harmonium|merc|mind’s eye|society of sensation|transcendent order|hands of havoc|bleak cabal/.test(s))return'humanoid';
 if(/cranium|darkweaver|eater of knowledge/.test(s))return'aberration';
 if(/modron|kolyarut|rilmani/.test(s))return'construct';
 if(/time dragon/.test(s))return'dragon';
 if(/razorvine/.test(s))return'plant';
 if(/vargouille reflection/.test(s))return'undead';
 return'monstrosity';
}
function role(n){var s=n.toLowerCase();
 if(/warden archon|hound archon|harmonium captain|peacekeeper|doom lord/.test(s))return'guardian';
 if(/lantern archon|musteval|void soother|matter smith|conduit|muse/.test(s))return'support';
 if(/time dragon|baernaloth|shemeshka|eater|shator|aurumach/.test(s))return'controller';
 if(/dabus|modron|kolyarut|law bender|bloodhound/.test(s))return'sentinel';
 if(/bariaur|githzerai|cuprilach|ferrumach|rot blade|fire starter|instinct/.test(s))return'skirmisher';
 return'scout';
}
function crFor(n){var s=n.toLowerCase();
 if(/ancient time dragon/.test(s))return 26;if(/shemeshka/.test(s))return 18;if(/aurumach/.test(s))return 18;if(/baernaloth/.test(s))return 19;
 if(/adult time dragon/.test(s))return 18;if(/planar incarnate/.test(s))return 15;if(/shator/.test(s))return 14;if(/kolyarut/.test(s))return 20;
 if(/warden archon/.test(s))return 8;if(/hexton modron/.test(s))return 13;if(/octon modron/.test(s))return 12;if(/nonaton modron/.test(s))return 10;if(/septon modron/.test(s))return 9;if(/decaton modron/.test(s))return 8;
 if(/cuprilach/.test(s))return 12;if(/ferrumach/.test(s))return 9;if(/hound archon/.test(s))return 4;if(/farastu/.test(s))return 9;if(/eater of knowledge/.test(s))return 10;
 if(/equinal/.test(s))return 6;if(/avoral/.test(s))return 12;if(/githzerai uniter/.test(s))return 7;if(/githzerai futurist/.test(s))return 5;if(/darkweaver/.test(s))return 7;if(/doom lord/.test(s))return 8;if(/peacekeeper/.test(s))return 6;
 if(/young time dragon/.test(s))return 10;if(/time dragon wyrmling/.test(s))return 5;if(/vargouille/.test(s))return 2;
 if(/transcendent order|society of sensation|fraternity of order|bleak cabal|athar|fated|heralds of dust|mercykiller|hands of havoc|doomguard/.test(s))return 4;
 return 3;
}
function habitat(n){var s=n.toLowerCase();
 if(/modron|kolyarut|law bender/.test(s))return['outlands','mechanus','sigil'];
 if(/archon|guardinal|celestial/.test(s))return['outlands','upper planes'];
 if(/demodand|baernaloth|shemeshka|doomguard|heralds of dust|mercykiller/.test(s))return['outlands','lower planes'];
 if(/githzerai|limbo/.test(s))return['outlands','limbo'];
 if(/time dragon/.test(s))return['outlands','temporal nexus'];
 if(/dabus|faction|harmonium|fated|fraternity|athar|hands of havoc|mind’s eye|society of sensation|transcendent/.test(s))return['sigil','outlands','gate-town'];
 return['outlands','planar frontier'];
}
function planeHook(n){var s=n.toLowerCase();var h={planar:true,sigilEligible:true,outlandsEligible:true,portalAffinity:'neutral',influenceSlots:1};
 if(/modron|kolyarut|fraternity|harmonium/.test(s))h.portalAffinity='mechanus';
 if(/githzerai/.test(s))h.portalAffinity='limbo';
 if(/archon|guardinal/.test(s))h.portalAffinity='upper_planes';
 if(/demodand|baernaloth|doomguard|heralds of dust|mercykiller/.test(s))h.portalAffinity='lower_planes';
 if(/time dragon/.test(s))h.temporalAnomaly=true;
 if(/dabus/.test(s))h.sigilNative=true;
 if(/cranium rat/.test(s))h.collectiveMind=true;
 if(/faction/.test(s)||/athar|bleak cabal|fated|fraternity|hands of havoc|harmonium|heralds|mercykiller|mind’s eye|society of sensation|transcendent/.test(s))h.factionAgent=true;
 return h;
}
function material(n,fam){var tag=fam==='dragon'?'temporal_dragon_scale':fam==='construct'?'planar_mechanism':fam==='celestial'?'astral_essence':fam==='fiend'?'infernal_ichor':fam==='aberration'?'psychic_tissue':fam==='plant'?'planar_vine':'planar_trophy';var id='v56_13_'+n.toLowerCase().replace(/[^a-z0-9]+/g,'_');return{name:n+' harvest',category:'materials',count:[1,3],guaranteed:true,tags:[tag,fam,'planescape','planar'],skill:fam==='construct'?'arcana':'survival',dc:14,craftMaterialId:id,tool:fam==='plant'?'p_tool_herbalism':'p_tool_alchemist',source:SOURCE};}
function profile(n,i){var fam=family(n),r=role(n),cr=crFor(n),xp=Math.max(25,Math.round(cr*cr*50)),ac=11+Math.min(10,Math.floor(cr/3)),hp=14+Math.round(cr*15)+(i%5)*3,dex=r==='skirmisher'||r==='scout'?16:12,str=r==='guardian'?18:14,con=15+Math.min(8,Math.floor(cr/4)),int=r==='controller'||r==='sentinel'?16:11,wis=14,cha=/shemeshka|dabus|archon|guardinal|faction/.test(n.toLowerCase())?16:10,bonus=4+Math.floor(cr/2),dmg=cr>=15?'4d10+8':cr>=8?'3d10+7':cr>=4?'2d8+5':'1d6+2';var h=planeHook(n);var actions=[{name:'Planar Strike',kind:'attack',bonus:bonus,damage:dmg,damageType:fam==='fiend'?'fire':fam==='celestial'?'radiant':fam==='aberration'?'psychic':'force'},{name:'Planar Shift',kind:'movement',description:'Original app-native repositioning hook using planar terrain and portals.'}];if(h.portalAffinity!=='neutral')actions.push({name:'Portal Affinity',kind:'portal',description:'Original app-native interaction with a matching planar portal or gate-town route.'});if(h.temporalAnomaly)actions.push({name:'Temporal Distortion',kind:'time',description:'Original app-native time-state encounter hook.'});if(h.collectiveMind)actions.push({name:'Collective Signal',kind:'psychic',description:'Original app-native shared-awareness hook.'});if(h.factionAgent)actions.push({name:'Faction Doctrine',kind:'social',description:'Original app-native faction encounter and reputation hook.'});var mh=material(n,fam);return{name:n,familyId:fam,cr:String(cr),xp:xp,ac:ac,hp:hp,maxHp:hp,initiative:mod(dex),speed:r==='skirmisher'||r==='scout'?35:30,abilities:{str:str,dex:dex,con:con,int:int,wis:wis,cha:cha},actions:actions,role:r,habitats:habitat(n),sourceType:'official-name-catalog / authorial-mechanics',sourcePack:SOURCE,sourceLabel:'Planescape: Adventures in the Multiverse — Morte’s Planar Parade',bestiaryVersion:'2.0.13',loot:{pockets:{rolls:0,table:[]},harvest:[mh]},planescape:h,ecology:{habitats:habitat(n),social:h.factionAgent?'faction':'variable',activity:'variable',diet:fam==='construct'?'none':'omnivore',role:r}};}
var CATALOG={};NAMES.forEach(function(n,i){if(!base.catalog[n])CATALOG[n]=profile(n,i);});
function register(){Object.keys(CATALOG).forEach(function(n){var c=CATALOG[n];base.families[c.familyId]=base.families[c.familyId]||{id:c.familyId,name:FAMILY_NAMES[c.familyId]||c.familyId,category:c.familyId,habitats:c.habitats,variantHooks:['source','plane','portal']};c.family=FAMILY_NAMES[c.familyId]||c.familyId;c.familyCategory=c.familyId;base.catalog[n]=clone(c);if(base.familyByCreature)base.familyByCreature[n]=c.familyId;monsters.catalog[n]=clone(c);if(loot&&loot.catalog)loot.catalog[n]=clone(c.loot);var mh=c.loot.harvest[0];if(craft&&mh&&mh.craftMaterialId&&Array.isArray(craft.MATERIALS)&&!craft.MATERIALS.some(function(m){return m.id===mh.craftMaterialId;}))craft.MATERIALS.push({id:mh.craftMaterialId,name:mh.name,cat:'monster_harvest',rarity:'uncommon',price:15,weight:.1,roles:['harvest','crafting'],tags:mh.tags,source:'bestiary_v56_13'});});}
function getCreature(n){return CATALOG[n]?clone(CATALOG[n]):(base.catalog[n]?clone(base.catalog[n]):null);}
function listBySource(s){return Object.keys(CATALOG).filter(function(n){return CATALOG[n].sourcePack===s;}).map(getCreature);}
function listByFamily(f){return Object.keys(CATALOG).filter(function(n){return CATALOG[n].familyId===f;}).map(getCreature);}
function planarInfluence(plane){var p=String(plane||'Outlands');var low=p.toLowerCase();var map={};if(/beastlands/.test(low))map={name:p,tags:['nature','feral'],effects:['movement','regeneration']};else if(/celestia|elysium|arborea|bytopia|mount celestia/.test(low))map={name:p,tags:['upper','radiant'],effects:['resolve','radiant']};else if(/mechanus|arcadia/.test(low))map={name:p,tags:['law','order'],effects:['precision','structure']};else if(/limbo/.test(low))map={name:p,tags:['chaos','change'],effects:['wild_magic','movement']};else if(/abyss|hells|gehenna|carceri|hades|pandemonium/.test(low))map={name:p,tags:['lower','danger'],effects:['corruption','hazard']};else map={name:p,tags:['outlands','neutral'],effects:['portal','balance']};return map;}
function portalRoute(from,to){return{id:'portal_'+String(from).toLowerCase().replace(/[^a-z0-9]+/g,'_')+'_'+String(to).toLowerCase().replace(/[^a-z0-9]+/g,'_'),from:from,to:to,stability:'variable',requirements:['portal_key_or_narrative_trigger'],encounterBias:'planar'};}
function summary(){var byFamily={},agents=0;Object.keys(CATALOG).forEach(function(n){var c=CATALOG[n];byFamily[c.familyId]=(byFamily[c.familyId]||0)+1;if(c.planescape&&c.planescape.factionAgent)agents++;});return{version:'56.13.0',added:Object.keys(CATALOG).length,total:Object.keys(base.catalog).length,families:byFamily,factionAgents:agents,planes:PLANES.length,gateTowns:GATE_TOWNS.length,factions:FACTIONS.length};}
register();
global.DND_BESTIARY_V56_13={VERSION:'56.13.0',catalog:CATALOG,sourcePacks:[SOURCE],planes:PLANES.slice(),gateTowns:GATE_TOWNS.slice(),factions:FACTIONS.slice(),getCreature:getCreature,listBySource:listBySource,listByFamily:listByFamily,summary:summary,register:register};
global.DND_PLANESCAPE_V56_13={VERSION:'56.13.0',planes:PLANES.slice(),gateTowns:GATE_TOWNS.slice(),factions:FACTIONS.slice(),getCreature:getCreature,listByFamily:listByFamily,planarInfluence:planarInfluence,portalRoute:portalRoute,summary:summary};
})(window);
