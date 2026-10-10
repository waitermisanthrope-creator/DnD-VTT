/**
 * expanded_class_registry_bridge.js
 * Full character-builder bridge for content-framework classes.
 * Keeps the existing runtime hooks and makes the four Kibbles classes,
 * plus Blood Hunter, first-class citizens of creation/level-up/progression.
 */
(function(g){
  'use strict';
  var D=g.DNDContent;
  if(!D) return;

  var CLASS_DEFS={
    'Кровавый охотник':{id:'blood-hunter',hitDie:10,primaryStat:'dexterity',savingThrows:['dexterity','intelligence'],source:'Blood Hunter runtime pack',multiclass:{any:[['dexterity',13],['strength',13]],all:[['intelligence',13]]}},
    'Псионик':{displayName:'Псионик',id:'kibbles-psion',hitDie:6,primaryStat:'intelligence',savingThrows:['intelligence','wisdom'],source:'KibblesTasty Homebrew',multiclass:{all:[['intelligence',13]]}},
    'Warlord':{displayName:'Военачальник',id:'kibbles-warlord',hitDie:10,primaryStat:'charisma',savingThrows:['strength','charisma'],source:'KibblesTasty Homebrew',multiclass:{all:[['strength',13],['charisma',13]]}},
    'Warden':{displayName:'Страж',id:'kibbles-warden',hitDie:10,primaryStat:'wisdom',savingThrows:['strength','wisdom'],source:'KibblesTasty Homebrew',multiclass:{all:[['strength',13],['wisdom',13]]}},
    'Spellblade':{displayName:'Заклинатель клинка',id:'kibbles-spellblade',hitDie:10,primaryStat:'intelligence',savingThrows:['dexterity','intelligence'],source:'KibblesTasty Homebrew',multiclass:{all:[['dexterity',13],['intelligence',13]]}}
  };

  function pack(name){return D.getClass(name)||null;}
  function makeProgression(p){
    var levels={};
    for(var i=1;i<=20;i++) levels[i]={features:[],subclassLevel:i===3,hasAsi:[4,8,12,16,19].indexOf(i)>=0};
    (p.features||[]).forEach(function(f){var l=Number(f.level)||1;if(!levels[l])levels[l]={features:[]};levels[l].features.push(f.name||f.id);});
    return {levels:levels};
  }
  function syncClass(name){
    var p=pack(name),d=CLASS_DEFS[name];
    if(!p||!d)return false;
    var old=g.CLASSES_REFERENCE&&g.CLASSES_REFERENCE[name]||{};
    g.CLASSES_REFERENCE[name]={hitDie:d.hitDie,primaryStat:d.primaryStat,savingThrows:d.savingThrows.slice(),progression:makeProgression(p),source:d.source,displayName:d.displayName||name,contentPackId:p.id};
    if(g.SUBCLASSES_REFERENCE){
      g.SUBCLASSES_REFERENCE[name]=g.SUBCLASSES_REFERENCE[name]||{};
      (p.subclasses||[]).forEach(function(s){
        if(!g.SUBCLASSES_REFERENCE[name][s.name]){
          var levels={};
          (s.features||[]).forEach(function(f){var l=Number(f.level)||3;levels[l]=levels[l]||{features:[]};levels[l].features.push(f.name||f.id);});
          g.SUBCLASSES_REFERENCE[name][s.name]={source:p.source||d.source,description:'Контент-пак: '+(p.source||d.source),pickLevel:3,levels:levels};
        }
      });
    }
    return true;
  }

  ['Кровавый охотник','Псионик','Warlord','Warden','Spellblade'].forEach(syncClass);

  // Keep the UI's canonical class list in sync. The global var is already created
  // by character_creation.js by the time this bridge is loaded.
  var list=g.DND_CLASSES_LIST;
  if(Array.isArray(list)){
    Object.keys(CLASS_DEFS).forEach(function(name){
      if(!list.some(function(c){return c&&c.name===name;})){
        var d=CLASS_DEFS[name];
        list.push({id:d.id,name:name,hitDie:d.hitDie,desc:'Расширенный класс: '+d.source+'.'});
      }
    });
  }

  // Multiclass prerequisites and basic non-spellcasting class proficiencies.
  g.MULTICLASS_PROFICIENCIES_2014=g.MULTICLASS_PROFICIENCIES_2014||{};
  Object.keys(CLASS_DEFS).forEach(function(name){
    if(!g.MULTICLASS_PROFICIENCIES_2014[name]) g.MULTICLASS_PROFICIENCIES_2014[name]={fixed:[]};
  });
  g.MULTICLASS_CLASS_REQUIREMENTS=g.MULTICLASS_CLASS_REQUIREMENTS||{};
  Object.keys(CLASS_DEFS).forEach(function(name){g.MULTICLASS_CLASS_REQUIREMENTS[name]=CLASS_DEFS[name].multiclass;});

  // Generic helper used by level-up and tests.
  g.getExpandedClassPack=function(name){return pack(name);};
  // Late authoritative runtimes replace early bridge definitions. Always expose
  // the live pack/reference through both canonical names and old saved aliases.
  g.getExpandedClassDefinition=function(name){
    var p=pack(name),base=CLASS_DEFS[name]||null;if(!p)return base;
    var r=g.CLASSES_REFERENCE&&(g.CLASSES_REFERENCE[name]||g.CLASSES_REFERENCE[p.name])||{},m=p.metadata||{};
    return Object.assign({},base||{}, {id:p.id,displayName:p.name,source:p.source,
      hitDie:r.hitDie||m.hitDie||(base&&base.hitDie),primaryStat:r.primaryStat||m.primaryStat||(base&&base.primaryStat),
      savingThrows:(r.savingThrows||m.savingThrows||(base&&base.savingThrows)||[]).slice(),
      multiclass:g.MULTICLASS_CLASS_REQUIREMENTS&&(g.MULTICLASS_CLASS_REQUIREMENTS[name]||g.MULTICLASS_CLASS_REQUIREMENTS[p.name])||(base&&base.multiclass)});
  };
  g.listIntegratedExpandedClasses=function(){return Object.keys(CLASS_DEFS).filter(function(n){return !!pack(n);});};
})(window);
