/**
 * bestiary_catalog_v56_10.js
 * ------------------------------------------------------------------
 * WHAT THIS FILE IS:
 * V56.10 is the Ravenloft / Van Richten's Guide to Ravenloft source-pack
 * layer. It adds the official bestiary names from the source's Chapter 5
 * using original app-native combat, ecology, horror and harvest metadata.
 *
 * HOW IT WORKS:
 * - sourcePack=ravenloft_vrgtR marks the source pack;
 * - existing catalogue entries are skipped automatically;
 * - profiles are generated deterministically from creature family/role;
 * - horror hooks are metadata/actions consumed by existing combat/encounter
 *   systems and do not create a second horror or monster engine;
 * - harvest is bridged into the existing DND_CRAFTING_V31 material list.
 *
 * IMPORTANT APIS: DND_BESTIARY_V56_10, getCreature(), listBySource(),
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
 'Gremishka','Death\'s Head','Podling','Boneless','Carrionette','Swarm of Zombie Limbs',
 'Swarm of Gremishkas','Swarm of Maggots','Wereraven','Brain in a Jar','Carrion Stalker',
 'Swarm of Scarabs','Strigoi','Zombie Plague Spreader','Vampiric Mind Flayer','Gallows Speaker',
 'Priest of Osybus','Zombie Clot','Bodytaker Plant','Necrichor','Inquisitor of the Mind Fire',
 'Inquisitor of the Sword','Inquisitor of the Tome','Nosferatu','Relentless Slasher',
 'Unspeakable Horror','Jiangshi','Dullahan','Relentless Juggernaut','Loup Garou',
 'Lesser Star Spawn Emissary','Greater Star Spawn Emissary'
];
var FAMILY_NAMES={aberration:'Аберрации',humanoid:'Гуманоиды',monstrosity:'Чудовища',fey:'Феи',magical_beast:'Магические звери',construct:'Конструкты',fiend:'Исчадия',elemental:'Элементали',dragon:'Драконы',undead:'Нежить',plant:'Растения',celestial:'Небожители',beast:'Звери'};
var SOURCE='ravenloft_vrgtR';
function family(name){var s=name.toLowerCase();
 if(/brain in a jar|star spawn/.test(s))return'aberration';
 if(/bodytaker plant/.test(s))return'plant';
 if(/carrionette/.test(s))return'construct';
 if(/gremishka|carrion stalker|strigoi|loup garou|unspeakable horror/.test(s))return'monstrosity';
 if(/wereraven|priest of osybus|inquisitor/.test(s))return'humanoid';
 if(/death's head|boneless|swarm of zombie limbs|gallows speaker|zombie clot|zombie plague spreader|necrichor|nosferatu|jiangshi|dullahan|relentless/.test(s))return'undead';
 if(/swarm of maggots|swarm of scarabs/.test(s))return'beast';
 if(/vampiric mind flayer/.test(s))return'aberration';
 return'monstrosity';
}
function role(name){var s=name.toLowerCase();
 if(/dullahan|juggernaut|unspeakable|nosferatu|loup garou|star spawn|bodytaker/.test(s))return'bruiser';
 if(/slasher|carrion stalker|strigoi|wereraven|death's head/.test(s))return'hunter';
 if(/brain in a jar|inquisitor|gallows speaker|priest of osybus|jiangshi|necrichor/.test(s))return'controller';
 if(/carrionette|boneless|zombie|swarm|gremishka|podling/.test(s))return'guardian';
 return'ranged';
}
function crFor(name){var s=name.toLowerCase();
 if(/greater star spawn/.test(s))return 21;
 if(/lesser star spawn/.test(s))return 19;
 if(/loup garou/.test(s))return 13;
 if(/relentless juggernaut/.test(s))return 12;
 if(/dullahan/.test(s))return 10;
 if(/jiangshi/.test(s))return 9;
 if(/bodytaker plant|necrichor/.test(s))return 7;
 if(/inquisitor|nosferatu|relentless slasher|unspeakable horror/.test(s))return 8;
 if(/gallows speaker|priest of osybus|zombie clot/.test(s))return 6;
 if(/vampiric mind flayer/.test(s))return 5;
 if(/strigoi|zombie plague spreader|carrion stalker|swarm of scarabs|brain in a jar/.test(s))return 3;
 if(/swarm of gremishkas|swarm of maggots|wereraven/.test(s))return 2;
 if(/boneless|carrionette|swarm of zombie limbs/.test(s))return 1;
 if(/death's head|podling/.test(s))return .5;
 return .125;
}
function habitat(name){var s=name.toLowerCase();
 if(/bodytaker|podling|carrion stalker|swarm of maggots|strigoi/.test(s))return['forest','swamp','ruins'];
 if(/gallows|dullahan|relentless|zombie|boneless|carrionette|death's head/.test(s))return['graveyard','ruins','urban'];
 if(/jiangshi|brain in a jar|inquisitor|vampiric mind flayer/.test(s))return['laboratory','ruins','urban'];
 if(/star spawn|unspeakable/.test(s))return['mist','void','ruins'];
 if(/loup garou|wereraven|gremishka/.test(s))return['forest','wilderness','village'];
 return['domains of dread','ruins'];
}
function horror(name,fam,roleName){var s=name.toLowerCase(),h={horrorEligible:true,fearPulse:true,stressPressure:'low',mistAffinity:0,identityDistortion:false,relentless:false,bodyHorror:false};
 if(/gremishka|brain in a jar|star spawn|unspeakable|vampiric mind flayer/.test(s)){h.stressPressure='high';h.mistAffinity=2;}
 if(/podling|bodytaker|wereraven|jiangshi|boneless|carrionette/.test(s)){h.identityDistortion=true;h.stressPressure='medium';}
 if(/carrion stalker|strigoi|loup garou|nosferatu|dullahan/.test(s)){h.stressPressure='medium';h.relentless=true;}
 if(/zombie|death's head|necrichor|boneless|carrionette|bodytaker/.test(s))h.bodyHorror=true;
 if(/star spawn|unspeakable/.test(s))h.mistAffinity=3;
 return h;
}
function material(name,fam){var tag=fam==='undead'?'ravenloft_relic':fam==='construct'?'cursed_mechanism':fam==='aberration'?'eldritch_tissue':fam==='plant'?'dread_plant_fiber':fam==='humanoid'?'haunted_gear':fam==='beast'?'horror_beast_part':'dread_monster_part';
 var clean=name.toLowerCase().replace(/[^a-z0-9]+/g,'_');
 var tool=fam==='construct'?'p_tool_tinker':(fam==='undead'||fam==='aberration'?'p_tool_alchemist':(fam==='humanoid'?'p_tool_leatherworker':'p_tool_alchemist'));
 return {name:name+' harvest',category:'materials',count:[1,3],guaranteed:true,tags:[tag,fam,'ravenloft','horror'],skill:fam==='construct'?'arcana':'survival',dc:13,craftMaterialId:'v56_10_'+clean,tool:tool};
}
function profile(name,i){var fam=family(name),r=role(name),cr=crFor(name),xp=Math.max(25,Math.round(cr*cr*50)),ac=11+Math.min(10,Math.floor(cr/3)),hp=10+Math.round(cr*13)+(i%7)*3;
 var dex=r==='hunter'?17:12,str=r==='bruiser'?20:15,con=15+Math.min(7,Math.floor(cr/4)),int=r==='controller'?17:10,wis=14,cha=/dullahan|nosferatu|jiangshi|loup garou/.test(name.toLowerCase())?16:10;
 var atkBonus=4+Math.floor(cr/2),damage=cr>=18?'4d10+8':cr>=10?'3d10+7':cr>=5?'2d10+5':cr>=2?'2d6+4':'1d6+2';
 var acts=[{name:'Dread Strike',kind:'attack',bonus:atkBonus,damage:damage,damageType:fam==='undead'?'necrotic':fam==='aberration'?'psychic':'physical'}];
 var h=horror(name,fam,r);
 if(h.fearPulse)acts.push({name:'Fear Pulse',kind:'horror',description:'Original app-native horror hook: nearby creatures may gain stress pressure or a frightened-style combat complication.'});
 if(h.identityDistortion)acts.push({name:'Identity Distortion',kind:'horror',description:'Original app-native identity-horror hook for infiltration, replacement or uncertain perception encounters.'});
 if(h.relentless)acts.push({name:'Relentless Pursuit',kind:'movement',description:'Original app-native pursuit hook that preserves pressure when the creature is displaced or wounded.'});
 if(h.bodyHorror)acts.push({name:'Body Horror',kind:'horror',description:'Original app-native body-horror hook tied to harvest, conditions or encounter stress.'});
 if(/star spawn/.test(name.toLowerCase()))acts.push({name:'Emissary Phase Shift',kind:'mythic',description:'Original app-native multi-form encounter hook; emissary profiles can chain into a stronger phase without copying published text.'});
 if(/priest of osybus/.test(name.toLowerCase()))acts.push({name:'Soul Anchor',kind:'controller',description:'Original app-native survival hook for a cultic caster protected by a remote anchor.'});
 if(/gremishka/.test(name.toLowerCase()))acts.push({name:'Arcane Instability',kind:'reaction',description:'Original app-native reaction that turns nearby spell activity into unpredictable battlefield pressure.'});
 var mh=material(name,fam);
 return {name:name,familyId:fam,cr:String(cr),xp:xp,ac:ac,hp:hp,maxHp:hp,initiative:mod(dex),speed:r==='hunter'?40:30,abilities:{str:str,dex:dex,con:con,int:int,wis:wis,cha:cha},actions:acts,role:r,habitats:habitat(name),sourceType:'official-name-catalog / authorial-mechanics',sourcePack:SOURCE,sourceLabel:"Van Richten's Guide to Ravenloft",bestiaryVersion:'2.0.10',loot:{pockets:{rolls:0,table:[]},harvest:[mh]},horror:h,ecology:{habitats:habitat(name),social:/swarm|zombie|inquisitor|priest/.test(name.toLowerCase())?'group':'variable',activity:/gallows|dullahan|nosferatu|jiangshi|slasher/.test(name.toLowerCase())?'nocturnal':'variable',diet:fam==='construct'?'none':fam==='plant'?'photosynthetic':'omnivore',role:r}};
}
var CATALOG={};NAMES.forEach(function(n,i){if(!base.catalog[n])CATALOG[n]=profile(n,i);});
function register(){Object.keys(CATALOG).forEach(function(n){var c=CATALOG[n];base.families[c.familyId]=base.families[c.familyId]||{id:c.familyId,name:FAMILY_NAMES[c.familyId]||c.familyId,category:c.familyId,habitats:c.habitats,variantHooks:['source','regional','horror']};c.family=FAMILY_NAMES[c.familyId]||c.familyId;base.catalog[n]=clone(c);if(base.familyByCreature)base.familyByCreature[n]=c.familyId;monsters.catalog[n]=clone(c);if(loot&&loot.catalog)loot.catalog[n]=clone(c.loot);var mh=c.loot.harvest[0];if(craft&&mh&&mh.craftMaterialId&&Array.isArray(craft.MATERIALS)&&!craft.MATERIALS.some(function(m){return m.id===mh.craftMaterialId;}))craft.MATERIALS.push({id:mh.craftMaterialId,name:mh.name,cat:'monster_harvest',rarity:'uncommon',price:13,weight:.1,roles:['harvest','crafting'],tags:mh.tags,source:'bestiary_v56_10'});});}
function getCreature(n){return CATALOG[n]?clone(CATALOG[n]):(base.catalog[n]?clone(base.catalog[n]):null);}
function listBySource(s){return Object.keys(CATALOG).filter(function(n){return CATALOG[n].sourcePack===s;}).map(getCreature);}
function listByFamily(f){return Object.keys(CATALOG).filter(function(n){return CATALOG[n].familyId===f;}).map(getCreature);}
function summary(){var byFamily={},horror=0;Object.keys(CATALOG).forEach(function(n){var f=CATALOG[n].familyId;byFamily[f]=(byFamily[f]||0)+1;if(CATALOG[n].horror&&CATALOG[n].horror.horrorEligible)horror++;});return {version:'56.10.0',source:SOURCE,added:Object.keys(CATALOG).length,total:Object.keys(base.catalog).length,families:byFamily,horrorEligible:horror};}
register();global.DND_BESTIARY_V56_10={VERSION:'56.10.0',catalog:CATALOG,sourcePack:SOURCE,getCreature:getCreature,listBySource:listBySource,listByFamily:listByFamily,summary:summary,register:register};
})(window);
