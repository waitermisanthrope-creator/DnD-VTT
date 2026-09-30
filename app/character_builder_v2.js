/**
 * character_builder_v2.js
 * Карманный ВТТ — новый мастер создания персонажа и единый движок выборов.
 *
 * Принцип:
 * 1) Создание и Level Up используют один формат pendingChoices.
 * 2) Любой выбор хранится в hero.choiceState/choiceHistory.
 * 3) Выборы первого уровня класса применяются независимо от того,
 *    взят класс при создании или добавлен мультиклассом.
 * 4) Extra-классы имеют отдельный режим создания и не смешиваются с обычной расой.
 */
(function(g){
  'use strict';

  var STATS=[
    {id:'str',name:'Сила'},{id:'dex',name:'Ловкость'},{id:'con',name:'Телосложение'},
    {id:'int',name:'Интеллект'},{id:'wis',name:'Мудрость'},{id:'cha',name:'Харизма'}
  ];
  var STAT_NAMES={str:'Сила',dex:'Ловкость',con:'Телосложение',int:'Интеллект',wis:'Мудрость',cha:'Харизма'};
  var EXTRA={
    'Рой':{type:'swarm',replacesRace:true,description:'Единый организм из множества особей.'},
    'Паразит':{type:'parasite',replacesRace:true,host:true,description:'Живой организм, использующий тело хозяина как убежище и оружие.'},
    'Паразит доктора Вальтера':{type:'walter_parasite',replacesRace:true,host:true,description:'Лабораторный вид доктора Вальтера. Редкий, плохо изученный и опасный.'},
    'Призрак':{type:'ghost',replacesRace:true,host:true,description:'Нематериальная сущность, связанная с мёртвой оболочкой.'}
  };

  function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  function norm(v){return String(v||'').replace(/[0-9]/g,'').trim().toLowerCase();}
  function getClass(name){
    if(typeof g.getClassData==='function'){ var d=g.getClassData(name); if(d) return d; }
    var list=g.DND_CLASSES_LIST||[];
    return list.find(function(x){return x.name===name;})||null;
  }
  function getClasses(){
    var list=Array.isArray(g.DND_CLASSES_LIST)?g.DND_CLASSES_LIST.slice():[];
    var seen={};
    list.forEach(function(c){seen[norm(c.name)]=c;});
    if(g.CLASSES_REFERENCE) Object.keys(g.CLASSES_REFERENCE).forEach(function(k){
      if(!seen[norm(k)]){var d=g.CLASSES_REFERENCE[k];list.push({name:k,hitDie:d.hitDie||8,desc:d.description||d.desc||''});}
    });
    return list.filter(function(c){return c&&c.name;});
  }
  function getRaces(){return typeof g.getAllRaces==='function'?g.getAllRaces():((g.DEFAULT_RACES||[]).slice());}
  function isExtra(name){return !!EXTRA[name];}
  function extraInfo(name){return EXTRA[name]||null;}
  function classProgression(name){
    var d=getClass(name)||{};
    if(d.progression&&d.progression.levels)return d.progression;
    if(d.levels)return d;
    return d;
  }
  function levelData(name,lvl){
    var d=classProgression(name);
    return d&&d.levels&&d.levels[lvl]||{};
  }
  function ensureChoiceState(hero){
    hero.choiceState=hero.choiceState||{};
    hero.choiceHistory=Array.isArray(hero.choiceHistory)?hero.choiceHistory:[];
    hero.pendingChoices=Array.isArray(hero.pendingChoices)?hero.pendingChoices:[];
    return hero;
  }
  function addChoice(hero,choice){
    ensureChoiceState(hero);
    hero.choiceState[choice.key]=choice.value;
    hero.choiceHistory.push({
      key:choice.key,label:choice.label||choice.key,value:choice.value,
      source:choice.source||'builder',level:choice.level||1,
      className:choice.className||null,raceId:choice.raceId||null
    });
  }
  function statOptions(selected){
    return STATS.map(function(s){return '<option value="'+s.id+'" '+(selected===s.id?'selected':'')+'>'+s.name+'</option>';}).join('');
  }
  function listOptions(arr){
    return (arr||[]).map(function(x){
      var id=typeof x==='string'?x:(x.id||x.name), name=typeof x==='string'?x:(x.nameRu||x.name||x.id);
      return '<option value="'+esc(id)+'">'+esc(name)+'</option>';
    }).join('');
  }
  function flattenSource(src){
    if(Array.isArray(src))return src;
    if(src&&typeof src==='object')return Object.values(src).flat();
    return [];
  }

  /* --------- Расовые выборы --------- */
  function raceChoices(race){
    if(!race)return [];
    var out=[];
    var langs=Array.isArray(race.languages)?race.languages:[];
    var langCount=langs.filter(function(x){return /на выбор|дополнительный язык/i.test(String(x));}).length;
    if(langCount) out.push({
      id:'race_languages',key:'race:'+race.id+':languages',type:'multi',count:langCount,
      label:'Дополнительные языки',options:function(){return (g.PROFICIENCIES_DB||[]).filter(function(p){return p.category==='Языки';});},
      source:'race',raceId:race.id
    });
    if(race.id==='human_variant'){
      out.push({id:'human_stats',key:'race:human_variant:stats',type:'stats2',count:2,label:'Две характеристики человека-варианта',options:STATS,source:'race',raceId:race.id});
      out.push({id:'human_skill',key:'race:human_variant:skill',type:'single',label:'Навык человека-варианта',options:function(){return g.SKILLS_CONFIG||[];},source:'race',raceId:race.id});
      out.push({id:'human_feat',key:'race:human_variant:feat',type:'feat',label:'Черта человека-варианта',options:function(){return allFeats();},source:'race',raceId:race.id});
    }
    if(race.id==='tiefling'){
      out.push({id:'tiefling_origin',key:'race:tiefling:origin',type:'single',label:'Происхождение Тифлинга',options:[
        {id:'asmodeus',name:'Асмодей',description:'Классическое инфернальное происхождение.'},
        {id:'baalzebul',name:'Баалзебул',description:'Наследие порчи и скверны.'},
        {id:'dispater',name:'Диспатер',description:'Наследие железа, интриг и наблюдения.'},
        {id:'fierna',name:'Фьерна',description:'Наследие чар и огня.'},
        {id:'glasya',name:'Гласия',description:'Наследие скрытности и обмана.'},
        {id:'levistus',name:'Левистус',description:'Наследие льда и выживания.'},
        {id:'mammon',name:'Маммон',description:'Наследие богатства и жадности.'},
        {id:'mephistopheles',name:'Мефистофель',description:'Наследие пламени и арканы.'},
        {id:'zariel',name:'Зариэль',description:'Наследие войны и боевого пламени.'}
      ],source:'race',raceId:race.id});
    }
    return out;
  }

  function applyBackground(hero,name){
    if(!name)return;
    var list=typeof g.getAllBackgrounds==='function'?g.getAllBackgrounds():(g.dndBackgrounds||[]);
    var b=list.find(function(x){return (x.nameRu||x.name)===name||x.name===name;});
    if(!b)return;
    hero.background=name;hero.skillsData=hero.skillsData||{};hero.proficiencies=hero.proficiencies||[];
    (Array.isArray(b.skills)?b.skills:[]).forEach(function(sk){
      if(/выбирается|на выбор/i.test(String(sk)))return;
      var clean=String(sk).split('(')[0].trim().toLowerCase(),cfg=(g.SKILLS_CONFIG||[]).find(function(x){return x.name.toLowerCase()===clean||x.id===clean;});
      if(cfg)hero.skillsData[cfg.id]=1;
    });
    var db=g.PROFICIENCIES_DB||[];
    (Array.isArray(b.languages)?b.languages:[]).forEach(function(lang){
      var p=db.find(function(x){return x.category==='Языки'&&(String(x.name).toLowerCase()===String(lang).toLowerCase()||String(x.name).toLowerCase().indexOf(String(lang).toLowerCase())>=0);});
      if(p&&!hero.proficiencies.some(function(x){return x.id===p.id;}))hero.proficiencies.push(Object.assign({},p));
    });
  }

  /* Расовые бонусы применяются ПОСЛЕ point-buy и всех выборов Builder.
   * Исключение — Человек (Вариантный): его bonuses в races.js исторически
   * содержат служебные +1/+1, а реальная механика выбора задаётся human_stats. */
  function applyRaceBonuses(hero,race){
    if(!hero||!race||race.id==='human_variant')return;
    hero.stats=hero.stats||{};
    var bonuses=race.bonuses&&typeof race.bonuses==='object'?race.bonuses:{};
    Object.keys(bonuses).forEach(function(stat){
      var bonus=Number(bonuses[stat])||0;
      if(!bonus)return;
      hero.stats[stat]=(Number(hero.stats[stat])||8)+bonus;
    });
  }

  function allFeats(){
    var out=[];
    [g.FEATS_PHB,g.PHB_FEATS,g.FEATS_TCOE,g.TCOE_FEATS,g.FEATS_XGTE,g.XGTE_FEATS,g.FEATS_SETTINGS,g.feats_settings,g.FEATS_UA_HOMEBREW,g.feats_ua_homebrew,g.Feats,g.FEATS,g.ALL_FEATS,g.allFeats].forEach(function(src){
      flattenSource(src).forEach(function(f){
        if(!f)return;
        var id=typeof f==='string'?f:(f.id||f.name||f.title);
        var name=typeof f==='string'?f:(f.nameRu||f.name||f.title);
        if(id&&!out.some(function(x){return x.id===id;}))out.push({id:id,name:name,description:typeof f==='object'?(f.description||f.text||''):''});
      });
    });
    return out.sort(function(a,b){return a.name.localeCompare(b.name,'ru');});
  }

  /* --------- Уникальные выборы классов ---------
   * Все они проходят через тот же pendingChoices/choiceHistory контракт.
   * Источник берём из уже загруженных runtime-паков, чтобы не дублировать
   * списки механик в Builder V2.
   */
  function uniqueClassChoices(className,targetLevel,isNewClass,hero){
    var out=[], old=hero&&hero.choiceState||{};
    function multi(id,key,label,options,count,level){
      var have=Array.isArray(old[key])?old[key].length:0, need=Math.max(0,Number(count||0)-have);
      if(!isNewClass && need===0)return;
      if(need>0)out.push({id:id,key:key,type:'multi',count:need,label:label,options:options,className:className,level:level||targetLevel,source:'class'});
    }
    if(className==='Алхимик' && g.ALCHEMIST_MHP_2024){
      var al=g.ALCHEMIST_MHP_2024;
      var formulas=Array.isArray(al.formulae)?al.formulae:[];
      var formulaCount=(targetLevel>=19?8:targetLevel>=16?7:targetLevel>=12?6:targetLevel>=8?5:targetLevel>=2?3:0);
      var prev=Array.isArray(old['class:Алхимик:formulas'])?old['class:Алхимик:formulas']:[];
      var delta=Math.max(0,formulaCount-prev.length);
      if(delta)out.push({id:'alchemist_formulas',key:'class:Алхимик:formulas',type:'multi',count:delta,label:'Формулы бомб',options:formulas,className:className,level:targetLevel,source:'class'});
      var disc=Array.isArray(al.discoveries)?al.discoveries.map(function(x){return {id:x[0],name:x[0],description:x[1]};}):[];
      var discoveryLevels=[5,9,13,17], got=Array.isArray(old['class:Алхимик:discoveries'])?old['class:Алхимик:discoveries']:[];
      if(discoveryLevels.indexOf(targetLevel)>=0)out.push({id:'alchemist_discovery',key:'class:Алхимик:discoveries',type:'multi',count:1,label:'Открытие Алхимика',options:disc.filter(function(x){return got.indexOf(x.id)<0;}),className:className,level:targetLevel,source:'class'});
    }
    if(className==='Оккультист' && g.OCCULTIST_KIBBLES_V11){
      var rr=Array.isArray(g.OCCULTIST_KIBBLES_V11.rites)?g.OCCULTIST_KIBBLES_V11.rites.map(function(x){return {id:x[0]||x.id,name:x[0]||x.name,description:x[2]||x.description||''};}):[];
      var known={2:2,5:3,7:4,9:5,12:6,15:7,18:8,20:8}, total=known[targetLevel]||0;
      var have=Array.isArray(old['class:Оккультист:rites'])?old['class:Оккультист:rites']:[];
      var delta=Math.max(0,total-have.length);
      if(delta)out.push({id:'occultist_rites',key:'class:Оккультист:rites',type:'multi',count:delta,label:'Оккультные обряды',options:rr.filter(function(x){return have.indexOf(x.id)<0;}),className:className,level:targetLevel,source:'class'});
    }
    if(className==='Ведьма'){
      var hx=g.WITCH_HEXES||g.witchHexes||g.HEXES||null;
      var hopts=Array.isArray(hx)?hx.map(function(x){return typeof x==='string'?{id:x,name:x}:{id:x.id||x.name,name:x.name||x.id,description:x.description||x.desc||''};}):[];
      var counts=(g.witchProgression&&g.witchProgression.hexesKnown)||[];
      var total=counts[targetLevel-1]||0,have=Array.isArray(old['class:Ведьма:hexes'])?old['class:Ведьма:hexes']:[];
      var delta=Math.max(0,total-have.length);
      if(delta&&hopts.length)out.push({id:'witch_hexes',key:'class:Ведьма:hexes',type:'multi',count:delta,label:'Выбор новых проклятий (Hexes)',options:hopts.filter(function(x){return have.indexOf(x.id)<0;}),className:className,level:targetLevel,source:'class'});
    }
    if(className==='Бистхарт' && targetLevel===3 && g.BeastheartRuntime){
      var bonds=g.BeastheartRuntime.bonds||{},haveBond=old['class:Бистхарт:bond'];
      if(!haveBond)out.push({id:'beast_bond',key:'class:Бистхарт:bond',type:'single',label:'Союз с компаньоном',options:Object.keys(bonds).map(function(k){var x=bonds[k];return {id:k,name:x.name||k,description:x.description||''};}),className:className,level:3,source:'class'});
    }
    if(className==='Пугилист' && targetLevel===3){
      var p=getClass(className)||{}, clubs=(p.fightClubs||[]).map(function(x){return {id:x,name:x};}),haveClub=old['class:Пугилист:club'];
      if(clubs.length&&!haveClub)out.push({id:'pugilist_club',key:'class:Пугилист:club',type:'single',label:'Бойцовский клуб',options:clubs,className:className,level:3,source:'class'});
    }
    return out;
  }

  /* --------- Классические и кастомные выборы 1-го/любого уровня --------- */
  /* FIX: base 5e classes keep skill-choice data in the rules section, not progression. */
  var CLASS_SKILL_CHOICES_2014={
    'Варвар':{choose:2,from:['animalHandling','athletics','intimidation','nature','perception','survival']},'Бард':{choose:3,from:['any']},'Жрец':{choose:2,from:['history','insight','medicine','persuasion','religion']},'Друид':{choose:2,from:['arcana','animalHandling','insight','medicine','nature','perception','religion','survival']},'Воин':{choose:2,from:['acrobatics','animalHandling','athletics','history','insight','intimidation','perception','survival']},'Монах':{choose:2,from:['acrobatics','athletics','history','insight','religion','stealth']},'Паладин':{choose:2,from:['athletics','insight','intimidation','medicine','persuasion','religion']},'Следопыт':{choose:3,from:['animalHandling','athletics','insight','investigation','nature','perception','stealth','survival']},'Плут':{choose:4,from:['acrobatics','athletics','deception','insight','intimidation','investigation','perception','persuasion','sleightOfHand','stealth']},'Чародей':{choose:2,from:['arcana','deception','insight','intimidation','persuasion','religion']},'Колдун':{choose:2,from:['arcana','deception','history','intimidation','investigation','nature','religion']},'Волшебник':{choose:2,from:['arcana','history','insight','investigation','medicine','religion']},'Изобретатель':{choose:2,from:['arcana','history','investigation','medicine','nature','perception','sleightOfHand']}
  };
  function classSkillRule(p,className){return p&&p.skills&&p.skills.choose?p.skills:(CLASS_SKILL_CHOICES_2014[className]||null);}
  function classChoices(className,targetLevel,isNewClass){
    var d=getClass(className)||{};
    var p=d.progression&&d.progression.levels?d.progression:d;
    var out=[];
    var skillRule=classSkillRule(p,className);
    if(isNewClass && skillRule && skillRule.choose){
      out.push({id:'class_skills',key:'class:'+className+':skills',type:'multi',count:Number(skillRule.choose),label:'Навыки класса',options:function(){var ids=skillRule.from||[];if(ids.indexOf('any')>=0)return (g.SKILLS_CONFIG||[]).slice();return ids.map(function(x){
        var id=x.id||x; var f=(g.SKILLS_CONFIG||[]).find(function(s){return s.id===id||s.name===id;}); return {id:id,name:f?f.name:id};
      });},className:className,level:1,source:'class'});
    }
    if(isNewClass && p.tools && p.tools.choose){
      out.push({id:'class_tools',key:'class:'+className+':tools',type:'multi',count:Number(p.tools.choose),label:'Инструменты класса',options:function(){
        var ids=p.tools.from||[]; var db=g.PROFICIENCIES_DB||[];
        return ids.map(function(id){var f=db.find(function(x){return x.id===id||x.name===id;});return f||{id:id,name:id};});
      },className:className,level:1,source:'class'});
    }
    if(isNewClass && p.secondaryStatChoice){
      out.push({id:'secondary_stat',key:'class:'+className+':secondaryStat',type:'single',label:'Дополнительная характеристика класса',options:STATS.filter(function(s){return p.secondaryStatChoice.indexOf(s.id)>=0;}),className:className,level:1,source:'class'});
    }
    if(isNewClass && p.leadershipChoices){
      out.push({id:'leadership',key:'class:'+className+':leadership',type:'single',label:'Стиль лидерства',options:p.leadershipChoices.map(function(x){return {id:x,name:(p.leadershipStyles&&p.leadershipStyles[x]&&x==='charisma'?'Капитан':x==='wisdom'?'Наставник':x==='intelligence'?'Стратег':'Лидер '+x)};}),className:className,level:1,source:'class'});
    }

    if(isNewClass && className==='Оккультист' && p.traditions){out.push({id:'occult_tradition',key:'class:Оккультист:tradition',type:'single',label:'Оккультная традиция',options:Object.keys(p.traditions).map(function(k){return {id:k,name:k,description:p.traditions[k].description||''};}),className:className,level:1,source:'class'});}
    if(isNewClass && className==='Псионик' && p.archetypes){out.push({id:'psion_archetype',key:'class:Псионик:archetype',type:'single',label:'Псионический архетип',options:Object.keys(p.archetypes).map(function(k){var x=p.archetypes[k];return {id:k,name:x.name||k};}),className:className,level:1,source:'class'});}
    if(isNewClass && className==='Пугилист' && p.tools&&p.tools.choose){/* already handled by generic class_tools */}

    if(isNewClass && className==='Шифтер'){
      var blood=(g.SHIFTER_V21&&g.SHIFTER_V21.bloodlines)||null;
      if(!blood && p.bloodlines)blood=p.bloodlines;
      if(blood)out.push({id:'shifter_bloodline',key:'class:Шифтер:bloodline',type:'single',label:'Кровная линия Шифтера',options:Object.keys(blood).map(function(k){var x=blood[k];return {id:k,name:x.name||k,description:x.description||''};}),className:className,level:1,source:'class'});
      else out.push({id:'shifter_bloodline',key:'class:Шифтер:bloodline',type:'single',label:'Кровная линия Шифтера',options:[
        {id:'aquatic',name:'Водная'},{id:'avian',name:'Птичья'},{id:'brutish',name:'Грубая'},{id:'predatory',name:'Хищная'},{id:'insectoid',name:'Насекомая'},{id:'reptilian',name:'Рептильная'},{id:'parasitic',name:'Паразитная'}
      ],className:className,level:1,source:'class'});
    }
    if(isNewClass && className==='Бистхарт' && g.BeastheartRuntime){
      var cs=g.BeastheartRuntime.companions||{};
      var opts=Object.keys(cs).map(function(k){var x=cs[k];return {id:k,name:x.name||k,description:x.description||''};});
      if(opts.length)out.push({id:'beast_companion',key:'class:Бистхарт:companion',type:'single',label:'Монструозный компаньон',options:opts,className:className,level:1,source:'class'});
    }
    if(isNewClass && className==='Пугилист'){
      var clubs=(p.fightClubs||[]).map(function(x){return {id:x,name:x};});
      if(clubs.length)out.push({id:'pugilist_club_preview',key:'class:Пугилист:club',type:'single',label:'Будущий бойцовский клуб (предвыбор)',options:clubs,className:className,level:1,source:'class',optional:true});
    }
    /* Специальные выборы, явно объявленные в progression на конкретном уровне. */
    var ld=levelData(className,targetLevel);
    if(ld && Array.isArray(ld.choices)) ld.choices.forEach(function(c,i){
      out.push(Object.assign({},c,{id:c.id||('level_choice_'+i),key:c.key||('class:'+className+':level:'+targetLevel+':choice:'+i),className:className,level:targetLevel,source:'class'}));
    });
    if(className==='Страж' && targetLevel===1 && Array.isArray(p.sentinelStandChoices))
      out.push({id:'warden_stand',key:'class:Страж:sentinelStand',type:'single',label:'Стойка часового',options:p.sentinelStandChoices,className:className,level:1,source:'class'});
    if(className==='Страж' && targetLevel===11 && Array.isArray(p.sentinelStrikeChoices))
      out.push({id:'warden_strike',key:'class:Страж:sentinelStrike',type:'single',label:'Удар часового',options:p.sentinelStrikeChoices,className:className,level:11,source:'class'});
    if(className==='Страж' && targetLevel===18 && Array.isArray(p.sentinelSoulChoices))
      out.push({id:'warden_soul',key:'class:Страж:sentinelSoul',type:'single',label:'Душа часового',options:p.sentinelSoulChoices,className:className,level:18,source:'class'});
    return out.filter(function(x){return !x.optional;});
  }


  function availableSubclassOptions(className){
    var out=[];
    if(typeof g.getAvailableSubclasses==='function') out=g.getAvailableSubclasses(className)||[];
    if((!out.length) && g.DNDContent && typeof g.DNDContent.listSubclasses==='function'){
      var aliases={'Иллирригер':'Illrigger','Кровавый охотник':'Blood Hunter','Бистхарт':'Beastheart','Пугилист':'Pugilist','Страж':'Warden','Военачальник':'Warlord','Псионик':'Psion','Алхимик':'Alchemist','Оккультист':'Occultist','Ведьма':'Witch','Некромант':'Necromancer','Мученик':'Martyr','Сосуд':'Vessel','Рунный хранитель':'RuneKeeper','Савант':'Savant','Шифтер':'Shifter','Аккурсд':'Accursed','Гайст':'Geist','Рой':'Swarm','Призрак':'Ghost'};
      out=g.DNDContent.listSubclasses(className)||g.DNDContent.listSubclasses(aliases[className])||[];
    }
    return out.map(function(x){return typeof x==='string'?{name:x}:Object.assign({},x,{name:x.nameRu||x.name||x.id});});
  }
\n  function subclassChoice(className,targetLevel,existing){
    if(existing)return null;
    var d=getClass(className)||{};
    var p=d.progression&&d.progression.levels?d.progression:d;
    var firstDeclared=0;if(p&&p.levels){Object.keys(p.levels).sort(function(a,b){return Number(a)-Number(b);}).some(function(k){if(p.levels[k]&&p.levels[k].subclassLevel){firstDeclared=Number(k);return true;}return false;});}
    var pick=Number(d.subclassLevel||p.subclassLevel||firstDeclared||3);
    if(targetLevel<pick)return null;
    if(typeof g.getAvailableSubclasses!=='function')return null;
    var opts=g.getAvailableSubclasses(className)||[];
    if(!opts.length && p.subclasses)opts=p.subclasses.map(function(x){return typeof x==='string'?{name:x}:x;});\n    if(!opts.length){ var src=[]; if(p.fightClubs)src=p.fightClubs; else if(p.championCalls)src=p.championCalls; else if(p.academies)src=p.academies; else if(p.archetypes)src=Object.keys(p.archetypes).map(function(k){return p.archetypes[k];}); else if(p.traditions)src=Object.keys(p.traditions).map(function(k){return {name:k,description:p.traditions[k].description};}); else if(p.crafts)src=Object.keys(p.crafts).map(function(k){return {name:k,description:p.crafts[k].description};}); else if(p.subclassFeatureCatalog)src=Object.keys(p.subclassFeatureCatalog).map(function(k){return p.subclassFeatureCatalog[k];}); opts=src.map(function(x){return typeof x==='string'?{name:String(x).split(' — ').pop()}:x;});}
    if(!opts.length)return null;
    return {id:'subclass',key:'class:'+className+':subclass',type:'single',label:'Подкласс / специализация',options:opts,className:className,level:targetLevel,source:'subclass'};
  }

  function collectChoices(race,className,targetLevel,isNewClass,existingSubclass,hero){
    var arr=raceChoices(race).concat(classChoices(className,targetLevel,isNewClass)).concat(uniqueClassChoices(className,targetLevel,isNewClass,hero||window.currentCharacter||window.currentChar));
    var ld=levelData(className,targetLevel);
    if(ld&&ld.asi)arr.push({id:'asi',key:'class:'+className+':level:'+targetLevel+':asi',type:'asi',label:'Увеличение характеристик или черта',options:function(){return allFeats();},className:className,level:targetLevel,source:'class'});
    var sc=subclassChoice(className,targetLevel,existingSubclass);
    if(sc)arr.push(sc);
    return arr;
  }

  function renderChoice(choice,idx,state){
    var opts=typeof choice.options==='function'?choice.options():choice.options||[];
    if(choice.type==='asi'){return '<div class="cb-choice" data-choice="'+idx+'"><b>'+esc(choice.label)+'</b><select id="cb_'+idx+'_mode" class="cb-select"><option value="">— Выберите —</option><option value="plus2">+2 к одной характеристике</option><option value="plus11">+1 к двум характеристикам</option><option value="feat">Выбрать черту</option></select><div id="cb_'+idx+'_extra" style="margin-top:7px"></div></div> ';}
    if(choice.type==='stats2'){
      return '<div class="cb-choice" data-choice="'+idx+'"><b>'+esc(choice.label)+'</b><div class="cb-grid">'+
        '<select id="cb_'+idx+'_a">'+statOptions(state&&state[0])+'</select>'+
        '<select id="cb_'+idx+'_b">'+statOptions(state&&state[1])+'</select></div><small>Выберите две разные характеристики.</small></div>';
    }
    var multiple=choice.type==='multi';
    var size=multiple?Math.min(6,Math.max(3,choice.count||3)):1;
    return '<div class="cb-choice" data-choice="'+idx+'"><b>'+esc(choice.label)+'</b>'+
      '<select id="cb_'+idx+'" '+(multiple?'multiple size="'+size+'"':'')+'>'+
      (multiple?'<option disabled>Выберите '+choice.count+' пункт(а)</option>':'<option value="">— Выберите —</option>')+
      opts.map(function(o){return '<option value="'+esc(o.id||o.name)+'">'+esc(o.nameRu||o.name||o.id)+'</option>';}).join('')+
      '</select><div id="cb_desc_'+idx+'" class="cb-choice-desc"></div></div>';
  }

  function choiceValue(choice,idx){
    if(choice.type==='asi'){var mode=g.document.getElementById('cb_'+idx+'_mode')?.value;if(mode==='plus2')return {mode:mode,stat:g.document.getElementById('cb_'+idx+'_stat1')?.value};if(mode==='plus11')return {mode:mode,stat1:g.document.getElementById('cb_'+idx+'_stat1')?.value,stat2:g.document.getElementById('cb_'+idx+'_stat2')?.value};if(mode==='feat')return {mode:mode,feat:g.document.getElementById('cb_'+idx+'_feat')?.value};return {mode:''};}
    if(choice.type==='stats2'){
      return [g.document.getElementById('cb_'+idx+'_a')?.value,g.document.getElementById('cb_'+idx+'_b')?.value];
    }
    var el=g.document.getElementById('cb_'+idx);
    return choice.type==='multi'?Array.from(el?.selectedOptions||[]).map(function(o){return o.value;}):(el?el.value:'');
  }
  function validChoice(choice,val){
    if(choice.type==='asi')return val&&((val.mode==='plus2'&&val.stat)||(val.mode==='plus11'&&val.stat1&&val.stat2&&val.stat1!==val.stat2)||(val.mode==='feat'&&val.feat));
    if(choice.type==='stats2')return val[0]&&val[1]&&val[0]!==val[1];
    if(choice.type==='multi')return Array.isArray(val)&&val.length===Number(choice.count||1);
    return !!val;
  }
  function applyChoice(hero,choice,val){
    if(!validChoice(choice,val))return false;
    addChoice(hero,{key:choice.key,value:val,label:choice.label,source:choice.source,className:choice.className,level:choice.level,raceId:choice.raceId});
    if(choice.id==='asi'){if(val.mode==='plus2')hero.stats[val.stat]=Math.min(20,(Number(hero.stats[val.stat])||10)+2);else if(val.mode==='plus11'){hero.stats[val.stat1]=Math.min(20,(Number(hero.stats[val.stat1])||10)+1);hero.stats[val.stat2]=Math.min(20,(Number(hero.stats[val.stat2])||10)+1);}else if(val.mode==='feat'){hero.feats=hero.feats||[];if(hero.feats.indexOf(val.feat)<0)hero.feats.push(val.feat);hero.features=hero.features||[];if(hero.features.indexOf(val.feat)<0)hero.features.push(val.feat);}}
    if(choice.id==='human_stats'){
      var base=(hero._builderBaseStats||hero.stats); val.forEach(function(k){hero.stats[k]=Number(base[k]||8)+1;});
    }
    if(choice.id==='human_skill'){hero.skillsData=hero.skillsData||{};hero.skillsData[val]=1;}
    if(choice.id==='human_feat'){hero.feats=hero.feats||[];if(hero.feats.indexOf(val)<0)hero.feats.push(val);hero.features=hero.features||[];if(hero.features.indexOf(val)<0)hero.features.push(val);}
    if(choice.id==='race_languages'){
      hero.proficiencies=hero.proficiencies||[];
      var db=g.PROFICIENCIES_DB||[];
      val.forEach(function(id){var p=db.find(function(x){return x.id===id;});if(p&&!hero.proficiencies.some(function(x){return x.id===id;}))hero.proficiencies.push(Object.assign({},p));});
    }
    if(choice.id==='class_skills'){hero.skillsData=hero.skillsData||{};val.forEach(function(x){hero.skillsData[x]=1;});}
    if(choice.id==='class_tools'){hero.proficiencies=hero.proficiencies||[];var db=g.PROFICIENCIES_DB||[];val.forEach(function(id){var p=db.find(function(x){return x.id===id;});if(p&&!hero.proficiencies.some(function(x){return x.id===id;}))hero.proficiencies.push(Object.assign({},p));});}
    if(choice.id==='secondary_stat')hero.choiceState.secondaryStat=val;
    if(choice.id==='leadership')hero.choiceState.leadershipStyle=val;
    if(choice.id==='shifter_bloodline')hero.choiceState.bloodline=val;
    if(choice.id==='occult_tradition')hero.choiceState.occultTradition=val;
    if(choice.id==='psion_archetype')hero.choiceState.psionArchetype=val;
    if(choice.id==='beast_companion'){
      hero.choiceState.companion=val;
      if(g.BeastheartRuntime&&typeof g.BeastheartRuntime.chooseCompanion==='function')g.BeastheartRuntime.chooseCompanion(hero,val);
    }
    if(choice.id==='pugilist_club_preview'||choice.id==='pugilist_club')hero.choiceState.pugilistClub=Array.isArray(val)?val[0]:val;
    if(choice.id==='beast_bond'){
      hero.choiceState.companionBond=Array.isArray(val)?val[0]:val;
      if(g.BeastheartRuntime&&typeof g.BeastheartRuntime.chooseBond==='function')g.BeastheartRuntime.chooseBond(hero,hero.choiceState.companionBond);
    }
    if(choice.id==='alchemist_formulas')hero.choiceState.alchemistFormulas=(hero.choiceState.alchemistFormulas||[]).concat(val||[]);
    if(choice.id==='alchemist_discovery')hero.choiceState.alchemistDiscoveries=(hero.choiceState.alchemistDiscoveries||[]).concat(val||[]);
    if(choice.id==='occultist_rites')hero.choiceState.occultistRites=(hero.choiceState.occultistRites||[]).concat(val||[]);
    if(choice.id==='witch_hexes')hero.choiceState.witchHexes=(hero.choiceState.witchHexes||[]).concat(val||[]);
    if(choice.id==='warden_stand')hero.choiceState.sentinelStand=val;
    if(choice.id==='warden_strike')hero.choiceState.sentinelStrike=val;
    if(choice.id==='warden_soul')hero.choiceState.sentinelSoul=val;
    if(choice.id==='tiefling_origin')hero.choiceState.tieflingOrigin=val;
    if(choice.id==='subclass'){
      var entry=(hero.classes||[]).find(function(c){return norm(c.name)===norm(choice.className);});
      if(entry)entry.subclass=val;
      else hero.choiceState['subclass:'+choice.className]=val;
    }
    return true;
  }

  function styles(){
    if(g.document.getElementById('cbv2_styles'))return;
    var st=g.document.createElement('style');st.id='cbv2_styles';
    st.textContent='.cb-wrap{max-width:720px;margin:0 auto;padding:16px;color:#eee;font-family:Inter,system-ui}.cb-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}.cb-step{font-size:12px;color:#aaa}.cb-progress{height:6px;background:#292929;border-radius:6px;overflow:hidden}.cb-progress>i{display:block;height:100%;background:#d4af37}.cb-card{background:#202020;border:1px solid #444;border-radius:12px;padding:14px;margin:10px 0}.cb-card h3{margin:0 0 10px;color:#d4af37}.cb-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}.cb-grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.cb-stat-control{min-width:0}.cb-stat-control>label{display:block;margin-bottom:5px}.cb-stat-row{display:grid;grid-template-columns:34px minmax(0,1fr) 34px;gap:5px;align-items:center}.cb-stat-input{text-align:center;min-width:0}.cb-stat-btn{height:42px;padding:0;border:1px solid #555;border-radius:8px;background:#303030;color:#fff;font-size:24px;line-height:1;touch-action:manipulation}.cb-stat-btn:active{background:#6b5414;border-color:#d4af37}.cb-list{display:grid;grid-template-columns:1fr 1fr;gap:8px;max-height:360px;overflow:auto}.cb-option{padding:10px;border:1px solid #444;border-radius:9px;background:#292929;cursor:pointer}.cb-option.active{border-color:#d4af37;background:#35301d}.cb-option small{display:block;color:#aaa;margin-top:4px}.cb-input,.cb-select{width:100%;box-sizing:border-box;padding:10px;background:#151515;color:#fff;border:1px solid #555;border-radius:8px}.cb-choice{margin:10px 0;padding:11px;border:1px solid #3e3e3e;border-radius:9px;background:#181818}.cb-choice select{width:100%;box-sizing:border-box;margin-top:7px;padding:9px;background:#111;color:#fff;border:1px solid #555;border-radius:7px}.cb-choice-desc{font-size:12px;color:#aaa;margin-top:6px}.cb-actions{display:flex;gap:8px;justify-content:space-between;margin-top:14px}.cb-btn{padding:11px 15px;border:1px solid #555;border-radius:9px;background:#303030;color:#fff}.cb-btn.primary{background:#6b5414;border-color:#d4af37}.cb-summary{display:grid;grid-template-columns:1fr 1fr;gap:7px}.cb-badge{padding:8px;background:#292929;border-radius:8px;font-size:12px}.cb-error{color:#ff8a80;margin-top:8px}.cb-note{font-size:12px;color:#aaa;line-height:1.4}.cb-extra{border-color:#8e44ad}.cb-mobile{font-size:13px}@media(max-width:560px){.cb-list{grid-template-columns:1fr}.cb-grid3{grid-template-columns:1fr 1fr}.cb-wrap{padding:10px}.cb-card{padding:11px}}';
    g.document.head.appendChild(st);
  }

  function Wizard(opts){
    this.mode=opts.mode||'create';this.hero=opts.hero||null;this.fromParchment=!!opts.fromParchment;this.step=0;this.values={};
    this.race=null;this.className=null;this.classLevel=opts.classLevel||1;this.isNewClass=opts.isNewClass!==false;
    this.choices=[];this.error='';
    if(this.fromParchment&&opts.draft){
      this.values={name:opts.draft.name||'',age:Number(opts.draft.age)||0,background:opts.draft.background||'',profession:opts.draft.profession||'',stats:{}};
      this.className=opts.draft.extra?opts.draft.extraType:(opts.draft.className||null);
      this.race=opts.draft.raceId?getRaces().find(function(r){return r.id===opts.draft.raceId;})||null:null;
      this.values.hostRaceId=opts.draft.hostRaceId||opts.draft.raceId||'';
      this.values.gender=opts.draft.gender||'';
      this.values.origin=opts.draft.origin||'';
      this.step=3;
    }
    this.steps=this.mode==='create'?['Основное','Раса / Extra','Класс','Характеристики','Выборы','Проверка']:['Класс','Уровень','Выборы','Проверка'];
  }
  Wizard.prototype.mount=function(){
    styles();
    var root;
    if(this.mode==='create'){
      root=g.document.getElementById('cbv2Screen');
      if(!root&&g.document.body){
        root=g.document.createElement('div');
        root.id='cbv2Screen';
        root.style.cssText='position:fixed;inset:0;z-index:99990;display:block;background:#111;overflow-y:auto;overflow-x:hidden;-webkit-overflow-scrolling:touch;touch-action:pan-y;box-sizing:border-box;';
        g.document.body.appendChild(root);
      }
      if(!root)return;
      root.style.display='block';
    }else{
      root=g.document.getElementById('levelUpModal');
      if(!root){
        root=g.document.createElement('div');root.id='levelUpModal';root.className='modal-overlay';
        root.style.cssText='position:fixed;inset:0;z-index:99990;display:flex;overflow:auto;';
        g.document.body.appendChild(root);
      }
      root.style.display='flex';
    }
    this.root=root;
    try{
      this.render();
    }catch(err){
      console.error('Builder V2 render failed:',err);
      var msg=err&&err.stack?err.stack:(err&&err.message?err.message:String(err));
      this.root.innerHTML='<div class="cb-wrap"><div class="cb-card cb-extra"><h3>⚠️ Builder V2 получил ошибку</h3><p class="cb-note">Экран не оставлен пустым: ниже показана реальная ошибка, которая произошла при построении мастера.</p><pre style="white-space:pre-wrap;word-break:break-word;color:#ffb4ab;background:#171717;border:1px solid #553;border-radius:8px;padding:10px;font-size:12px;">'+esc(msg)+'</pre><div class="cb-actions"><button id="cbDiagLog" class="cb-btn primary">🐞 Открыть ошибки</button><button id="cbDiagClose" class="cb-btn">Закрыть</button></div></div></div>';
      var logBtn=this.root.querySelector('#cbDiagLog');
      if(logBtn)logBtn.onclick=function(){if(typeof g.dndV709Open==='function')g.dndV709Open();else alert('Журнал ошибок ещё не загрузился.');};
      var closeBtn=this.root.querySelector('#cbDiagClose');
      if(closeBtn)closeBtn.onclick=function(){if(typeof g.showCharacterSelect==='function')g.showCharacterSelect();else this.root.style.display='none';}.bind(this);
    }
  };
  Wizard.prototype.render=function(){
    var self=this;
    if(this.mode==='create')this.renderCreate();
    else this.renderLevel();
    var next=g.document.getElementById('cbNext');if(next)next.onclick=function(){self.next();};
    var back=g.document.getElementById('cbBack');if(back)back.onclick=function(){self.back();};
  };
  Wizard.prototype.renderCreate=function(){
    var s=this.steps[this.step],body='';
    if(this.step===0){var bgsRaw=typeof g.getAllBackgrounds==='function'?g.getAllBackgrounds():(g.dndBackgrounds||[]);var bgs=Array.isArray(bgsRaw)?bgsRaw:[];var professionsRaw=g.DND_CRAFT_PROFESSION_PROGRESS&&g.DND_CRAFT_PROFESSION_PROGRESS.professions;var professions=Array.isArray(professionsRaw)?professionsRaw:[];body='<div class="cb-card"><h3>Кто вы?</h3><input id="cb_name" class="cb-input" placeholder="Имя персонажа"><input id="cb_age" type="number" class="cb-input" style="margin-top:8px" placeholder="Возраст"><select id="cb_bg" class="cb-select" style="margin-top:8px"><option value="">— Предыстория —</option>'+bgs.map(function(b){var id=b.nameRu||b.name;return '<option value="'+esc(id)+'">'+esc(id)+'</option>';}).join('')+'</select><select id="cb_prof" class="cb-select" style="margin-top:8px"><option value="">— Профессия (необязательно) —</option>'+professions.map(function(p){return '<option value="'+esc(p.id||p.name)+'">'+esc(p.nameRu||p.name||p.id)+'</option>';}).join('')+'</select><p class="cb-note">Дальше мастер проведёт вас по расе, классу, характеристикам и всем обязательным выборам.</p></div>';} 
    if(this.step===1){
      var races=getRaces(),sel=this.race?this.race.id:'';
      body='<div class="cb-card"><h3>Раса или особый путь</h3><div class="cb-list">'+races.map(function(r){return '<div class="cb-option '+(sel===r.id?'active':'')+'" data-race="'+esc(r.id)+'"><b>'+esc(r.name)+'</b><small>'+esc(r.desc||'')+'</small></div>';}).join('')+'</div>';
      body+='<div class="cb-card cb-extra"><h3>EXTRA-классы</h3><p class="cb-note">Эти пути заменяют обычную расу и имеют собственную модель тела/сущности.</p><div class="cb-list">'+Object.keys(EXTRA).map(function(n){var x=EXTRA[n];return '<div class="cb-option '+(self.className===n?'active':'')+'" data-extra="'+esc(n)+'"><b>'+esc(n)+'</b><small>'+esc(x.description||'Закрытая ветка персонажа')+'</small></div>';}).join('')+'</div></div>';
      if(this.className&&extraInfo(this.className).host){
        body+='<div class="cb-card cb-extra"><h3>Тело / хозяин</h3><p class="cb-note">'+esc(this.className==='Призрак'?'Выберите тело, которое стало оболочкой призрака.':'Выберите тело/вид хозяина, с которым связан Extra.')+'</p><div class="cb-list">'+races.map(function(r){return '<div class="cb-option '+(self.race&&self.race.id===r.id?'active':'')+'" data-host-race="'+esc(r.id)+'"><b>'+esc(r.name)+'</b><small>'+esc(r.desc||'')+'</small></div>';}).join('')+'</div></div>';
      }
      body+='</div>';
    }
    if(this.step===2){
      var classes=getClasses(),selc=this.className||'';
      body='<div class="cb-card"><h3>Класс</h3><div class="cb-list">'+classes.filter(function(c){return !isExtra(c.name);}).map(function(c){return '<div class="cb-option '+(selc===c.name?'active':'')+'" data-class="'+esc(c.name)+'"><b>'+esc(c.name)+'</b><small>d'+(c.hitDie||8)+' · '+esc(c.desc||'')+'</small></div>';}).join('')+'</div></div>';
      if(this.className&&isExtra(this.className))body='<div class="cb-card cb-extra"><h3>'+esc(this.className)+'</h3><p>Это Extra-класс. Обычный класс не выбирается. Тело/хозяин уже выбран на предыдущем шаге.</p></div>';
    }
    if(this.step===3){
      var stats=this.values.stats||{};
      var statList=Array.isArray(STATS)&&STATS.length?STATS:[
        {id:'str',name:'Сила'},{id:'dex',name:'Ловкость'},{id:'con',name:'Телосложение'},
        {id:'int',name:'Интеллект'},{id:'wis',name:'Мудрость'},{id:'cha',name:'Харизма'}
      ];
      body='<div class="cb-card"><h3>Характеристики</h3><p class="cb-note">27 очков. Значения 8–15 до расовых и специальных бонусов. Используйте кнопки − / +; ручной ввод отключён.</p><div class="cb-grid3">'+statList.map(function(x){var raw=Number(stats[x.id]);var value=Number.isFinite(raw)?Math.max(8,Math.min(15,raw)):8;return '<div class="cb-stat-control"><label>'+x.name+'</label><div class="cb-stat-row"><button type="button" class="cb-stat-btn" data-stat-minus="'+x.id+'">−</button><input class="cb-input cb-stat-input" type="number" min="8" max="15" readonly data-stat="'+x.id+'" value="'+value+'"><button type="button" class="cb-stat-btn" data-stat-plus="'+x.id+'">+</button></div></div>';}).join('')+'</div><div id="cb_pointbuy" class="cb-note" style="margin-top:8px"></div></div>';
    }
    if(this.step===4){
      var rc=this.race,cc=this.className;
      this.values=(this.values&&typeof this.values==='object')?this.values:{};
      var savedChoiceValues=this.values;
      this.choices=collectChoices(rc,cc,this.classLevel,this.isNewClass,(this.hero&&this.hero.classes||[]).find(function(x){return norm(x.name)===norm(cc);})?.subclass,this.hero);
      body='<div class="cb-card"><h3>Особенности и выборы</h3><p class="cb-note">Здесь собраны ВСЕ обязательные выборы, которые нужны персонажу до первого уровня. Ничего не потеряется.</p>'+
        (this.choices.length?this.choices.map(function(c,i){return renderChoice(c,i,savedChoiceValues[c.key]);}).join(''):'<p>Для этого набора пока нет обязательных выборов.</p>')+'</div>';
      this.bindChoiceDescriptions();
    }
    if(this.step===5){
      body='<div class="cb-card"><h3>Проверка персонажа</h3><div class="cb-summary">'+
        '<div class="cb-badge">Имя: '+esc(this.values.name||'')+'</div><div class="cb-badge">Раса: '+esc(this.race?this.race.name:(isExtra(this.className)?'Extra':'—'))+'</div>'+
        '<div class="cb-badge">Класс: '+esc(this.className||'')+'</div><div class="cb-badge">Уровень: 1</div></div>'+
        '<p class="cb-note" style="margin-top:10px">После подтверждения персонаж получает стартовую прогрессию класса, расовые особенности, выбранные навыки/инструменты и сохранённые выборы.</p>'+
        '<div id="cb_error" class="cb-error">'+esc(this.error)+'</div></div>';
    }
    this.root.innerHTML='<div class="cb-wrap"><div class="cb-top"><b>Создание персонажа</b><span class="cb-step">'+(this.step+1)+' / '+this.steps.length+' · '+esc(s)+'</span></div><div class="cb-progress"><i style="width:'+((this.step+1)/this.steps.length*100)+'%"></i></div>'+body+'<div class="cb-actions"><button id="cbBack" class="cb-btn" '+(this.step===0?'disabled':'')+'>Назад</button><button id="cbNext" class="cb-btn primary">'+(this.step===this.steps.length-1?'Создать персонажа':'Далее')+'</button></div></div>';
    if(this.step===1)this.bindRace();
    if(this.step===2)this.bindClass();
    if(this.step===3)this.bindStats();
    if(this.step===4)this.bindChoiceDescriptions();
  };
  Wizard.prototype.bindRace=function(){
    var self=this;
    this.root.querySelectorAll('[data-race]').forEach(function(el){el.onclick=function(){self.race=getRaces().find(function(r){return r.id===el.dataset.race;});self.className=null;self.render();};});
    this.root.querySelectorAll('[data-extra]').forEach(function(el){el.onclick=function(){self.className=el.dataset.extra;if(!extraInfo(self.className).host)self.race=null;self.render();};});
    this.root.querySelectorAll('[data-host-race]').forEach(function(el){el.onclick=function(){self.race=getRaces().find(function(r){return r.id===el.dataset.hostRace;})||null;self.render();};});
  };
  Wizard.prototype.bindClass=function(){
    var self=this;
    this.root.querySelectorAll('[data-class]').forEach(function(el){el.onclick=function(){self.className=el.dataset.class;self.render();};});
  };
  Wizard.prototype.bindStats=function(){
     var self=this,costs={8:0,9:1,10:2,11:3,12:4,13:5,14:7,15:9};
     this.values.stats=this.values.stats||{};
     this.root.querySelectorAll('[data-stat]').forEach(function(el){
       var id=el.dataset.stat,raw=Number(self.values.stats[id]),value=Number.isFinite(raw)?Math.max(8,Math.min(15,raw)):8;
       self.values.stats[id]=value;el.value=value;
     });
     function change(id,delta){
       var current=Number(self.values.stats[id]);if(!Number.isFinite(current))current=8;
       var next=Math.max(8,Math.min(15,current+delta));
       if(next===current)return;
       if(delta>0){
         var spent=0;Object.keys(self.values.stats).forEach(function(k){var v=Number(self.values.stats[k]);spent+=costs[v]||0;});
         if((costs[next]||0)-(costs[current]||0)>27-spent)return;
       }
       self.values.stats[id]=next;
       var input=self.root.querySelector('[data-stat="'+id+'"]');if(input)input.value=next;
       self.updatePointBuy();
     }
     this.root.querySelectorAll('[data-stat-minus]').forEach(function(btn){btn.onclick=function(){change(btn.dataset.statMinus,-1);};});
     this.root.querySelectorAll('[data-stat-plus]').forEach(function(btn){btn.onclick=function(){change(btn.dataset.statPlus,1);};});
     this.updatePointBuy();
   };
  Wizard.prototype.updatePointBuy=function(){
    var costs={8:0,9:1,10:2,11:3,12:4,13:5,14:7,15:9},sum=0;
    Object.values(this.values.stats||{}).forEach(function(v){sum+=costs[v]||0;});
    var el=this.root.querySelector('#cb_pointbuy');if(el)el.textContent='Потрачено: '+sum+' / 27 · Осталось: '+(27-sum);
  };
  Wizard.prototype.bindChoiceDescriptions=function(){
    var self=this;
    this.choices.forEach(function(c,i){
      var el=self.root.querySelector('#cb_'+i);if(!el)return;
      el.onchange=function(){var opts=typeof c.options==='function'?c.options():c.options||[];var selected=c.type==='multi'?Array.from(el.selectedOptions).map(function(x){return x.value;}):el.value;var box=self.root.querySelector('#cb_desc_'+i);var found=opts.filter(function(o){return selected.indexOf(o.id||o.name)>=0;});if(box)box.textContent=found.map(function(o){return o.description||o.desc||'';}).join(' ');};
      if(c.type==='asi'){var modeEl=self.root.querySelector('#cb_'+i+'_mode');if(modeEl)modeEl.onchange=function(){var ex=self.root.querySelector('#cb_'+i+'_extra'),mode=modeEl.value;if(ex){ex.innerHTML=mode==='plus2'?'<select id="cb_'+i+'_stat1" class="cb-select">'+statOptions()+'</select>':mode==='plus11'?'<div class="cb-grid"><select id="cb_'+i+'_stat1" class="cb-select">'+statOptions()+'</select><select id="cb_'+i+'_stat2" class="cb-select">'+statOptions()+'</select></div>':mode==='feat'?'<select id="cb_'+i+'_feat" class="cb-select"><option value="">— Черта —</option>'+opts.map(function(o){return '<option value="'+esc(o.id)+'">'+esc(o.name)+'</option>';}).join('')+'</select>':'';}};}
    });
  };
  Wizard.prototype.readStep=function(){
    if(this.mode==='create'){
      if(this.step===0){this.values.name=(this.root.querySelector('#cb_name')||{}).value?.trim();this.values.age=Number((this.root.querySelector('#cb_age')||{}).value)||0;this.values.background=(this.root.querySelector('#cb_bg')||{}).value||'';this.values.profession=(this.root.querySelector('#cb_prof')||{}).value||'';if(!this.values.name){this.error='Введите имя.';return false;}}
      if(this.step===3){this.values.stats={};var sum=0,costs={8:0,9:1,10:2,11:3,12:4,13:5,14:7,15:9};var self=this;this.root.querySelectorAll('[data-stat]').forEach(function(el){var v=Math.max(8,Math.min(15,Number(el.value)||8));self.values.stats[el.dataset.stat]=v;sum+=costs[v];});if(sum>27){this.error='Превышен лимит 27 очков.';return false;}}
      if(this.step===4){for(var i=0;i<this.choices.length;i++){var c=this.choices[i],v=choiceValue(c,i);if(!validChoice(c,v)){this.error='Нужно заполнить: '+c.label;return false;}this.values[c.key]=v;}}
    }else{
      if(this.step===0){var sel=this.root.querySelector('[data-lu-class].active');if(!sel){this.error='Выберите класс.';return false;}this.className=sel.dataset.luClass;}
      if(this.step===1){var hp=this.root.querySelector('[data-hp].active');this.values.hp=hp?Number(hp.dataset.hp):Math.floor((this.classLevel?this.classLevel:8)/2)+1;}
      if(this.step===2){for(var i=0;i<this.choices.length;i++){var c=this.choices[i],v=choiceValue(c,i);if(!validChoice(c,v)){this.error='Нужно заполнить: '+c.label;return false;}this.values[c.key]=v;}}
    }
    return true;
  };
  Wizard.prototype.next=function(){
    if(!this.readStep())return this.renderError();
    if(this.mode==='create'&&this.step===1&&this.className&&extraInfo(this.className).host&&!this.race)return this.renderError('Для этого Extra выберите тело/хозяина.');
    if(this.mode==='create'&&this.step===2&&!this.className)return this.renderError('Выберите класс.');
    if(this.mode==='create'&&this.step===1&&this.className&&!isExtra(this.className)){} 
    if(this.step<this.steps.length-1){this.error='';this.step++;this.render();}
    else if(this.mode==='create')this.finishCreate();
    else this.finishLevel();
  };
  Wizard.prototype.back=function(){if(this.step>0){this.step--;this.error='';this.render();}};
  Wizard.prototype.renderError=function(msg){this.error=msg||this.error;var e=this.root.querySelector('#cb_error');if(e)e.textContent=this.error;};
  Wizard.prototype.renderLevel=function(){
    var self=this,hero=this.hero;
    if(this.step===0){
      var classes=getClasses().filter(function(c){
        if(isExtra(c.name)){
          if(hero.extraClassType===extraInfo(c.name).type)return true;
          if(hero.extraClassType==='swarm'&&c.name==='Рой')return true;
          return false;
        }
        if(hero.extraClassType==='swarm'||hero.extraClassType==='parasite'||hero.extraClassType==='walter_parasite'||hero.extraClassType==='ghost')return false;
        return true;
      });
      this.root.innerHTML='<div class="cb-wrap"><div class="cb-top"><b>Повышение уровня</b><span class="cb-step">1 / 4 · Класс</span></div><div class="cb-card"><h3>Что повышаем?</h3><div class="cb-list">'+classes.map(function(c){return '<div class="cb-option" data-lu-class="'+esc(c.name)+'"><b>'+esc(c.name)+'</b><small>'+esc((getClass(c.name)||{}).desc||c.desc||'')+'</small></div>';}).join('')+'</div><div class="cb-error" id="cb_error">'+esc(this.error)+'</div></div><div class="cb-actions"><button id="cbBack" class="cb-btn">Отмена</button><button id="cbNext" class="cb-btn primary">Далее</button></div></div>';
      this.root.querySelectorAll('[data-lu-class]').forEach(function(el){el.onclick=function(){self.root.querySelectorAll('[data-lu-class]').forEach(function(x){x.classList.remove('active');});el.classList.add('active');};});
    }else if(this.step===1){
      var cls=this.className;this.classLevel=this.nextClassLevel();var hd=(getClass(cls)||{}).hitDie||8;var avg=Math.floor(hd/2)+1;
      this.root.innerHTML='<div class="cb-wrap"><div class="cb-top"><b>Повышение '+esc(cls)+'</b><span class="cb-step">2 / 4 · Уровень '+this.classLevel+'</span></div><div class="cb-card"><h3>Кость хитов d'+hd+'</h3><div class="cb-grid3">'+[['roll','🎲 Бросок',Math.floor(Math.random()*hd)+1],['avg','🛡️ Среднее',avg],['max','💥 Максимум',hd]].map(function(x){return '<div class="cb-option '+(x[0]==='avg'?'active':'')+'" data-hp="'+x[2]+'"><b>'+x[1]+'</b><small>+'+x[2]+' до базы HP</small></div>';}).join('')+'</div><p class="cb-note">Модификатор Телосложения будет добавлен автоматически.</p></div><div class="cb-actions"><button id="cbBack" class="cb-btn">Назад</button><button id="cbNext" class="cb-btn primary">Далее</button></div></div>';
      this.root.querySelectorAll('[data-hp]').forEach(function(el){el.onclick=function(){self.root.querySelectorAll('[data-hp]').forEach(function(x){x.classList.remove('active');});el.classList.add('active');};});
    }else if(this.step===2){
      this.isNewClass=!(hero.classes||[]).some(function(c){return norm(c.name)===norm(self.className);});
      this.classLevel=this.nextClassLevel();
      var entry=(hero.classes||[]).find(function(c){return norm(c.name)===norm(self.className);});
      this.choices=collectChoices(null,self.className,this.classLevel,this.isNewClass,entry&&entry.subclass,hero);
      var html=this.choices.length?this.choices.map(function(c,i){return renderChoice(c,i,self.values[c.key]);}).join(''):'<p>Обязательных выборов нет.</p>';
      this.root.innerHTML='<div class="cb-wrap"><div class="cb-top"><b>Выборы уровня</b><span class="cb-step">3 / 4 · '+esc(self.className)+'</span></div><div class="cb-card"><h3>Все новые решения</h3>'+html+'<div id="cb_error" class="cb-error">'+esc(this.error)+'</div></div><div class="cb-actions"><button id="cbBack" class="cb-btn">Назад</button><button id="cbNext" class="cb-btn primary">Далее</button></div></div>';this.bindChoiceDescriptions();
    }else{
      this.root.innerHTML='<div class="cb-wrap"><div class="cb-top"><b>Подтверждение</b><span class="cb-step">4 / 4</span></div><div class="cb-card"><h3>'+esc(this.className)+' → '+this.classLevel+' уровень</h3><p class="cb-note">Все выбранные решения будут сохранены в одном журнале выбора и применены после подтверждения.</p><div id="cb_error" class="cb-error">'+esc(this.error)+'</div></div><div class="cb-actions"><button id="cbBack" class="cb-btn">Назад</button><button id="cbNext" class="cb-btn primary">Подтвердить уровень</button></div></div>';
    }
  };
  Wizard.prototype.nextClassLevel=function(){
    var e=(this.hero.classes||[]).find(function(c){return norm(c.name)===norm(this.className);},this);
    return (Number(e&&e.level)||0)+1;
  };
  Wizard.prototype.finishCreate=function(){
    var self=this,hero={
      id:'char_'+Date.now(),name:this.values.name,age:this.values.age||0,
      level:1,class:this.className,className:this.className,
      classes:[{name:this.className,level:1,subclass:null}],
      background:this.values.background||'',profession:this.values.profession||'',raceId:this.race?this.race.id:'',raceName:this.race?this.race.name:'',
      baseAC:10,ac:'10',speed:(this.race&&this.race.speed)||'30 футов',
      profBonus:2,stats:Object.assign({},this.values.stats),_builderBaseStats:Object.assign({},this.values.stats),
      savesData:{},skillsData:{},proficiencies:[],feats:[],features:[],choiceState:{},choiceHistory:[],pendingChoices:[],
      activeConditions:{},weaponsData:[],spellSlotsData:{},spellsData:[],folders:[],library:[]
    };
    ensureChoiceState(hero);
    var ex=extraInfo(this.className);
    if(ex){
      hero.isExtraClass=true;hero.extraClassType=ex.type;hero.extraClassName=this.className;
      hero.replacesRace=true;hero.multiclassAllowed=false;
      hero.tokenArt=({
        'Рой':'./app/data/classes/the swam.png',
        'Паразит':'./app/data/classes/parasite.png',
        'Паразит доктора Вальтера':'./wallpapers/1790718758545.png',
        'Призрак':'./app/data/classes/geist.png'
      })[this.className]||'';
      hero.tokenReady=!!hero.tokenArt;
    }
    /* Start choices are applied before progression so runtime can read them. */
    this.choices.forEach(function(c){applyChoice(hero,c,self.values[c.key]);});
    /* Расовые бонусы применяются после всех выборов, чтобы не затереть human_stats. */
    if(this.race&&this.race.id==='human_variant'){
      var st=hero.choiceState['race:human_variant:stats'];
      if(Array.isArray(st))st.forEach(function(k){hero.stats[k]=(Number(hero.stats[k])||0)+1;});
    }else{
      applyRaceBonuses(hero,this.race);
    }
    var con=Math.floor((hero.stats.con-10)/2),hd=(getClass(this.className)||{}).hitDie||8;
    hero.hpMax=Math.max(1,hd+con);hero.hpCurrent=hero.hpMax;hero.hitDice='1d'+hd;
    if(this.className==='Рой')hero.raceName='Рой';
    if(ex&&ex.host&&this.race){
      hero.hostName=this.race.name;
      hero.hostRaceId=this.race.id||'';
      hero.raceName=(this.className==='Призрак'?'Мёртвая оболочка: ':this.className==='Паразит доктора Вальтера'?'Труп: ':'Хозяин: ')+this.race.name;
    }
    hero.gender=this.values.gender||'';
    hero.origin=this.values.origin||'';
    if(typeof g.applyClassProgression==='function')g.applyClassProgression(hero,this.className,1);
    /* Runtime-specific Extra initialization. */
    if(ex&&ex.type==='swarm'&&g.SWARM_EXTRA&&g.SWARM_EXTRA.normalizeCharacter)g.SWARM_EXTRA.normalizeCharacter(hero);
    if(ex&&ex.type==='parasite'&&g.PARASITE_EXTRA&&g.PARASITE_EXTRA.normalizeCharacter){
      g.PARASITE_EXTRA.normalizeCharacter(hero);
      if(g.PARASITE_EXTRA.bindHost)g.PARASITE_EXTRA.bindHost(hero,{id:'host_'+hero.id,name:this.race?this.race.name:'Хозяин',stats:Object.assign({},hero.stats),hpMax:hero.hpMax,hpCurrent:hero.hpCurrent,ac:hero.baseAC,speed:hero.speed});
    }
    if(ex&&ex.type==='walter_parasite'&&g.WALTER_PARASITE_EXTRA&&g.WALTER_PARASITE_EXTRA.normalizeCharacter)g.WALTER_PARASITE_EXTRA.normalizeCharacter(hero);
    if(ex&&ex.type==='ghost'&&g.GHOST_EXTRA&&g.GHOST_EXTRA.normalizeCharacter)g.GHOST_EXTRA.normalizeCharacter(hero);
    applyBackground(hero,this.values.background);
    if(this.values.profession&&g.DND_CRAFT_PROFESSION_PROGRESS&&typeof g.DND_CRAFT_PROFESSION_PROGRESS.initCreatedCharacter==='function')g.DND_CRAFT_PROFESSION_PROGRESS.initCreatedCharacter(hero,this.values.profession);
    if(!Array.isArray(g.allCharacters))g.allCharacters=[];
    g.allCharacters.push(hero);if(typeof g.saveAllCharacters==='function')g.saveAllCharacters();else localStorage.setItem('dnd_multi_characters_v2',JSON.stringify(g.allCharacters));
    this.root.style.display='none';if(typeof g.openCharacter==='function')g.openCharacter(hero.id);
  };
  Wizard.prototype.finishLevel=function(){
    var hero=this.hero,cls=this.className,entry=(hero.classes||[]).find(function(c){return norm(c.name)===norm(cls);});
    if(!entry){entry={name:cls,level:0,subclass:null};hero.classes.push(entry);}
    entry.level=(Number(entry.level)||0)+1;
    var newLevel=entry.level;
    this.choices.forEach(function(c){applyChoice(hero,c,this.values[c.key]);},this);
    var hd=(getClass(cls)||{}).hitDie||8,con=Math.floor((Number(hero.stats&&hero.stats.con)||10)-10)/2;
    hero.hpMax=(Number(hero.hpMax)||1)+Math.max(1,Number(this.values.hp)||Math.floor(hd/2)+1+con);hero.hpCurrent=hero.hpMax;
    hero.level=(hero.classes||[]).reduce(function(a,c){return a+(Number(c.level)||0);},0);
    if(typeof g.applyClassProgression==='function')g.applyClassProgression(hero,cls,newLevel);
    ensureChoiceState(hero);
    hero.pendingChoices=(hero.pendingChoices||[]).filter(function(c){return !(c.className===cls&&Number(c.level)===newLevel);});
    if(typeof g.autoSaveCurrentCharacter==='function')g.autoSaveCurrentCharacter();else if(typeof g.saveAllCharacters==='function')g.saveAllCharacters();
    this.root.style.display='none';if(typeof g.calculateMods==='function')g.calculateMods();
    alert('Уровень '+hero.level+' получен. Все выборы сохранены.');
  };

  function showBuilderFatal(err){
    var msg=err&&err.stack?err.stack:(err&&err.message?err.message:String(err));
    console.error('Builder V2 fatal launch error:',err);
    g.__CBV2_LAST_ERROR=msg;
    var root=g.document.getElementById('cbv2Screen');
    if(!root){
      root=g.document.createElement('div');
      root.id='cbv2Screen';
      g.document.body.appendChild(root);
    }
    root.style.cssText='position:fixed;inset:0;z-index:99990;display:block;background:#111;color:#fff;overflow:auto;box-sizing:border-box;';
    root.innerHTML='<div class="cb-wrap"><div class="cb-card cb-extra"><h3>⚠️ Builder V2 не запустился</h3><p class="cb-note">Ошибка произошла при запуске мастера. Пустого окна больше не будет.</p><pre style="white-space:pre-wrap;word-break:break-word;color:#ffb4ab;background:#171717;border:1px solid #553;border-radius:8px;padding:10px;font-size:12px;">'+esc(msg)+'</pre><div class="cb-actions"><button id="cbFatalLog" class="cb-btn primary">🐞 Открыть ошибки</button><button id="cbFatalClose" class="cb-btn">Закрыть</button></div></div></div>';
    var b=g.document.getElementById('cbFatalLog');
    if(b)b.onclick=function(){if(typeof g.dndV709Open==='function')g.dndV709Open();};
    var close=g.document.getElementById('cbFatalClose');
    if(close)close.onclick=function(){root.style.display='none';if(typeof g.showCharacterSelect==='function')g.showCharacterSelect();};
  }
  function startCreate(opts){
    opts=opts||{};
    if(!opts.fromParchment && typeof g.openParchmentCreation==='function'){
      return g.openParchmentCreation();
    }
    var screen=g.document.getElementById('characterCreationScreen');
    if(screen)screen.style.display=opts.fromParchment?'none':'block';
    try{
      console.warn('Builder V2 launch: startCreateFromParchment=',!!opts.fromParchment);
      var wizard=new Wizard({mode:'create',fromParchment:!!opts.fromParchment,draft:opts.draft||null});
      wizard.mount();
      if(!wizard.root||!wizard.root.innerHTML.trim())throw new Error('Builder V2 mount завершился пустым root');
      return wizard;
    }catch(err){
      showBuilderFatal(err);
      return null;
    }
  }
  function startLevel(){
    var hero=g.currentCharacter||g.currentChar;if(!hero)return alert('Персонаж не выбран.');
    var total=(hero.classes||[]).reduce(function(a,c){return a+(Number(c.level)||0);},0)||Number(hero.level)||1;
    if(total>=20)return alert('Персонаж уже достиг 20 уровня.');
    var modal=g.document.getElementById('levelUpModal');
    if(!modal){modal=g.document.createElement('div');modal.id='levelUpModal';modal.className='modal-overlay';g.document.body.appendChild(modal);}
    new Wizard({mode:'level',hero:hero}).mount();
  }
  g.createNewCharacter=startCreate;
  g.openLevelUpModal=startLevel;
  g.CharacterBuilderV2={Wizard:Wizard,raceChoices:raceChoices,classChoices:classChoices,collectChoices:collectChoices,applyChoice:applyChoice,startCreate:startCreate,startLevel:startLevel,startCreateFromParchment:function(draft){return startCreate({fromParchment:true,draft:draft});}};
})(window);

// V70.26.71: keep Builder array normalization fix in the stable web update payload.
