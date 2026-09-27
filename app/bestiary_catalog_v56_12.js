/**
 * bestiary_catalog_v56_12.js
 * WHAT THIS FILE IS: V56.12 Dragonlance source-pack layer.
 * HOW IT WORKS: registers Dragonlance creature names from Shadow of the Dragon Queen
 * and Monstrous Compendium Vol. 2, skipping existing catalogue entries. It adds
 * original app-native warfront, dragon, draconian, undead and Krynn ecology metadata,
 * plus harvest-to-crafting bridges, without copying published statblock prose.
 * IMPORTANT APIS: DND_BESTIARY_V56_12, getCreature(), listBySource(), listByFamily(), summary(), register().
 */
(function(global){'use strict';
var base=global.DNDExpandedBestiary, monsters=global.DNDMonsters, loot=global.DNDMonsterLoot, craft=global.DND_CRAFTING_V31;
if(!base||!monsters)return;
function clone(v){return JSON.parse(JSON.stringify(v));}
function mod(n){return Math.floor((n-10)/2);}
var SOTDQ='dragonlance_shadow_dragon_queen', MCV2='dragonlance_mon_compendium_2';
var NAMES=[
['Anhkolox','sotdq'],['Caradoc','sotdq'],['Greater Death Dragon','sotdq'],['Lesser Death Dragon','sotdq'],
['Aurak Draconian','sotdq'],['Baaz Draconian','sotdq'],['Bozak Draconian','sotdq'],['Kapak Draconian','sotdq'],['Sivak Draconian','sotdq'],
['Dragon Army Officer','sotdq'],['Dragon Army Soldier','sotdq'],['Dragon Army Dragonnel','sotdq'],['Wasteland Dragonnel','sotdq'],
['Istarian Drone','sotdq'],['Kalaman Soldier','sotdq'],['Kansaldi Fire-Eyes','sotdq'],['Kender Skirmisher','sotdq'],['Lohezet','sotdq'],['Lord Soth','sotdq'],['Red Ruin','sotdq'],['Skeletal Knight','sotdq'],['Wersten Kern','sotdq'],
['Dream Eater','mcv2'],['Ember','mcv2'],['Forest Master','mcv2'],['Foresworn','mcv2'],['Irda Seeker','mcv2'],['Irda Veil Keeper','mcv2'],['Nevermind Gnome Inventor','mcv2'],['Nevermind Gnome Mastermind','mcv2'],['Thanoi Hunter','mcv2'],['Traag Draconian','mcv2'],['Verminaard','mcv2']
];
var FAMILY_NAMES={aberration:'Аберрации',humanoid:'Гуманоиды',monstrosity:'Чудовища',fey:'Феи',construct:'Конструкты',undead:'Нежить',dragon:'Драконы',giant:'Великаны',celestial:'Небожители'};
function family(n){var s=n.toLowerCase();
 if(/death dragon|ember|dragon$/.test(s))return'dragon';
 if(/skeletal|lord soth|foresworn|red ruin|wersten kern|verminaard/.test(s))return'undead';
 if(/dream eater/.test(s))return'aberration';
 if(/forest master/.test(s))return'celestial';
 if(/irda/.test(s))return'giant';
 if(/nevermind|draconian|kender|soldier|officer|kansaldi|lohezet/.test(s))return'humanoid';
 return'monstrosity';
}
function role(n){var s=n.toLowerCase();
 if(/dragon|anhkolox|lord soth|verminaard|red ruin/.test(s))return'bruiser';
 if(/soldier|officer|draconian|dragonnel|kender|hunter|skirmisher|skeletal knight/.test(s))return'guardian';
 if(/dream eater|forest master|irda veil keeper|lohezet|kansaldi|nevermind gnome mastermind/.test(s))return'controller';
 return'scout';
}
function crFor(n){var s=n.toLowerCase();
 if(/lord soth/.test(s))return 19;if(/verminaard/.test(s))return 17;if(/ember/.test(s))return 22;if(/dream eater/.test(s))return 7;
 if(/greater death dragon/.test(s))return 10;if(/lesser death dragon/.test(s))return 6;if(/anhkolox/.test(s))return 9;
 if(/forest master/.test(s))return 8;if(/foresworn|red ruin/.test(s))return 6;if(/irda veil keeper|nevermind gnome mastermind|traag draconian/.test(s))return 5;
 if(/lohezet|kansaldi/.test(s))return 7;if(/skeletal knight|dragon army dragonnel|wasteland dragonnel/.test(s))return 4;
 if(/aurak draconian/.test(s))return 6;if(/bozak draconian/.test(s))return 4;if(/sivak draconian/.test(s))return 4;if(/kapak draconian/.test(s))return 3;if(/baaz draconian/.test(s))return 1;
 if(/thanoi hunter/.test(s))return 5;if(/irda seeker/.test(s))return 1;if(/nevermind gnome inventor/.test(s))return 2;if(/kender skirmisher|kalaman soldier|dragon army soldier|dragon army officer/.test(s))return 3;
 return 3;
}
function habitat(n){var s=n.toLowerCase();
 if(/dragon|draconian|dragon army|dragonnel|verminaard|lord soth|skeletal/.test(s))return['krynn','ansalon','warfront'];
 if(/irda/.test(s))return['krynn','hidden enclave','wilderness'];
 if(/nevermind|gnome/.test(s))return['krynn','settlement','workshop'];
 if(/dream eater/.test(s))return['krynn','silvanesti','dreamscape'];
 return['krynn','ansalon','frontier'];
}
function warHooks(n,source,fam){var s=n.toLowerCase();var h={krynn:true,warfrontEligible:true,dragonlance:true,formationRole:'individual',siegeInteraction:false,dragonArmyAffinity:source===SOTDQ?1:0};
 if(/soldier|officer|draconian|dragonnel|kender|skeletal knight/.test(s))h.formationRole='unit';
 if(/dragon army|lord soth|verminaard|kansaldi|traag draconian|ember/.test(s))h.dragonArmyAffinity=2;
 if(/dragon|dragonnel|lord soth|red ruin/.test(s))h.siegeInteraction=true;
 if(/dream eater|forest master|irda veil keeper|lohezet/.test(s))h.arcaneWarfront=true;
 if(/nevermind/.test(s))h.technicalSupport=true;
 if(/foresworn|skeletal|lord soth|red ruin/.test(s))h.undeadWarfront=true;
 if(/kender/.test(s))h.skirmishMobility=true;
 return h;
}
function material(n,fam,source){var tag=fam==='dragon'?'krynn_dragon_scale':fam==='undead'?'deathly_ichor':fam==='construct'?'krynn_mechanism':fam==='humanoid'?'warfront_gear':fam==='giant'?'irda_crystal':'krynn_monster_part';var id='v56_12_'+n.toLowerCase().replace(/[^a-z0-9]+/g,'_');return{name:n+' harvest',category:'materials',count:[1,3],guaranteed:true,tags:[tag,fam,'dragonlance','krynn'],skill:fam==='construct'?'arcana':'survival',dc:13,craftMaterialId:id,tool:fam==='dragon'?'p_tool_leatherworker':'p_tool_alchemist',source:source};}
function profile(n,i,source){var fam=family(n),r=role(n),cr=crFor(n),xp=Math.max(25,Math.round(cr*cr*50)),ac=11+Math.min(9,Math.floor(cr/3)),hp=12+Math.round(cr*14)+(i%6)*3;var dex=r==='scout'?16:12,str=r==='bruiser'?20:15,con=15+Math.min(7,Math.floor(cr/4)),int=r==='controller'?16:10,wis=14,cha=/lord soth|verminaard|kansaldi|forest master|irda/.test(n.toLowerCase())?16:10;var bonus=4+Math.floor(cr/2);var dmg=cr>=15?'4d10+8':cr>=8?'3d10+7':cr>=4?'2d8+5':'1d6+2';var actions=[{name:'Krynn Strike',kind:'attack',bonus:bonus,damage:dmg,damageType:fam==='undead'?'necrotic':fam==='dragon'?'fire':'physical'}];var h=warHooks(n,source,fam);actions.push({name:'Warfront Positioning',kind:'movement',description:'Original app-native battlefield positioning hook for Krynn warfront encounters.'});if(h.siegeInteraction)actions.push({name:'Siege Interaction',kind:'siege',description:'Original app-native hook for fortifications, siege lines and mounted/airborne threats.'});if(h.arcaneWarfront)actions.push({name:'High Sorcery Resonance',kind:'magic',description:'Original app-native magical-warfront hook for spells, relics and arcane encounters.'});if(h.undeadWarfront)actions.push({name:'Deathly Resolve',kind:'undead',description:'Original app-native persistence hook for undead warfront encounters.'});if(h.technicalSupport)actions.push({name:'Gnomish Field Engineering',kind:'support',description:'Original app-native engineering hook for battlefield devices and improvised machinery.'});if(h.skirmishMobility)actions.push({name:'Kender Skirmish',kind:'mobility',description:'Original app-native skirmisher movement and opportunistic positioning hook.'});if(h.formationRole==='unit')actions.push({name:'Formation Pressure',kind:'formation',description:'Original app-native formation hook for allied units and coordinated battlefield pressure.'});var mh=material(n,fam,source);return{name:n,familyId:fam,cr:String(cr),xp:xp,ac:ac,hp:hp,maxHp:hp,initiative:mod(dex),speed:r==='scout'?35:30,abilities:{str:str,dex:dex,con:con,int:int,wis:wis,cha:cha},actions:actions,role:r,habitats:habitat(n),sourceType:'official-name-catalog / authorial-mechanics',sourcePack:source,sourceLabel:source===SOTDQ?'Dragonlance: Shadow of the Dragon Queen':'Monstrous Compendium Vol. 2: Dragonlance Creatures',bestiaryVersion:'2.0.12',loot:{pockets:{rolls:0,table:[]},harvest:[mh]},dragonlance:h,ecology:{habitats:habitat(n),social:h.formationRole==='unit'?'group':'variable',activity:'variable',diet:fam==='construct'?'none':fam==='dragon'?'omnivore':'omnivore',role:r}};}
var CATALOG={};NAMES.forEach(function(p,i){var n=p[0],source=p[1]==='mcv2'?MCV2:SOTDQ;if(!base.catalog[n])CATALOG[n]=profile(n,i,source);});
function register(){Object.keys(CATALOG).forEach(function(n){var c=CATALOG[n];base.families[c.familyId]=base.families[c.familyId]||{id:c.familyId,name:FAMILY_NAMES[c.familyId]||c.familyId,category:c.familyId,habitats:c.habitats,variantHooks:['source','regional','dragonlance']};c.family=FAMILY_NAMES[c.familyId]||c.familyId;base.catalog[n]=clone(c);if(base.familyByCreature)base.familyByCreature[n]=c.familyId;monsters.catalog[n]=clone(c);if(loot&&loot.catalog)loot.catalog[n]=clone(c.loot);var mh=c.loot.harvest[0];if(craft&&mh&&mh.craftMaterialId&&Array.isArray(craft.MATERIALS)&&!craft.MATERIALS.some(function(m){return m.id===mh.craftMaterialId;}))craft.MATERIALS.push({id:mh.craftMaterialId,name:mh.name,cat:'monster_harvest',rarity:'uncommon',price:13,weight:.1,roles:['harvest','crafting'],tags:mh.tags,source:'bestiary_v56_12'});});}
function getCreature(n){return CATALOG[n]?clone(CATALOG[n]):(base.catalog[n]?clone(base.catalog[n]):null);}function listBySource(s){return Object.keys(CATALOG).filter(function(n){return CATALOG[n].sourcePack===s;}).map(getCreature);}function listByFamily(f){return Object.keys(CATALOG).filter(function(n){return CATALOG[n].familyId===f;}).map(getCreature);}function summary(){var byFamily={},bySource={},war=0;Object.keys(CATALOG).forEach(function(n){var c=CATALOG[n],f=c.familyId;byFamily[f]=(byFamily[f]||0)+1;bySource[c.sourcePack]=(bySource[c.sourcePack]||0)+1;if(c.dragonlance&&c.dragonlance.warfrontEligible)war++;});return{version:'56.12.0',added:Object.keys(CATALOG).length,total:Object.keys(base.catalog).length,families:byFamily,sources:bySource,warfrontEligible:war};}
register();global.DND_BESTIARY_V56_12={VERSION:'56.12.0',catalog:CATALOG,sourcePacks:[SOTDQ,MCV2],getCreature:getCreature,listBySource:listBySource,listByFamily:listByFamily,summary:summary,register:register};
})(window);
