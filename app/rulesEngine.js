/**
 * rulesEngine.js
 * ------------------------------------------------------------------
 * ЧТО ЭТО ЗА ФАЙЛ:
 * Центральный движок правил D&D 5e (2014) для расчётов персонажа.
 * Он не рисует интерфейс и не хранит состояние отдельно от currentChar:
 * нормализует данные персонажа и предоставляет единые расчёты для AC,
 * атак, урона, спасбросков, навыков, spell DC/attack, условий и ресурсов.
 *
 * КАК РАБОТАЕТ:
 * - поддерживает старые короткие ключи stats (str/dex/...) и полные;
 * - учитывает proficiency/expertise и advantage/disadvantage;
 * - различает обычное spellcasting и Pact Magic Warlock;
 * - строит модификаторы условий и concentration save;
 * - хранит ресурсы в hero.resources и выполняет short/long rest;
 * - даёт API для UI, чтобы отдельные модули не дублировали формулы.
 *
 * ОСНОВНЫЕ ПЕРЕМЕННЫЕ:
 * hero/currentChar, hero.stats, hero.classes, hero.inventory,
 * hero.skillsData, hero.savesData, hero.activeConditions,
 * hero.spellcastingSources, hero.spellsData, hero.resources.
 *
 * ВАЖНО: Wallpapers.js и Ambiences.js не используются и не изменяются.
 * ------------------------------------------------------------------
 */
(function (global) {
  'use strict';

  var STAT_ALIASES = {
    str: ['str', 'strength', 'сила'],
    dex: ['dex', 'dexterity', 'ловкость'],
    con: ['con', 'constitution', 'телосложение'],
    int: ['int', 'intelligence', 'интеллект'],
    wis: ['wis', 'wisdom', 'мудрость'],
    cha: ['cha', 'charisma', 'харизма']
  };

  var CLASS_KEYS = {
    'воин': 'fighter', 'fighter': 'fighter',
    'варвар': 'barbarian', 'barbarian': 'barbarian',
    'бард': 'bard', 'bard': 'bard',
    'волшебник': 'wizard', 'wizard': 'wizard',
    'друид': 'druid', 'druid': 'druid',
    'жрец': 'cleric', 'клерик': 'cleric', 'cleric': 'cleric',
    'изобретатель': 'artificer', 'artificer': 'artificer',
    'колдун': 'warlock', 'warlock': 'warlock',
    'монах': 'monk', 'monk': 'monk',
    'паладин': 'paladin', 'paladin': 'paladin',
    'плут': 'rogue', 'rogue': 'rogue',
    'следопыт': 'ranger', 'ranger': 'ranger',
    'чародей': 'sorcerer', 'sorcerer': 'sorcerer'
  };

  // Canonical condition registry. UI/localized spellings are normalized to these keys.
  var CONDITIONS = {
    'Отравлен': { selfDisadvantage: true },
    'Ослеплён': { selfDisadvantage: true, grantsAdvantage: true },
    'Сбит с ног': { selfDisadvantage: true, prone: true },
    'Парализован': { selfDisadvantage: true, grantsAdvantage: true, autoFailStrDex: true },
    'Оглушён': { selfDisadvantage: true, grantsAdvantage: true, autoFailStrDex: true },
    'Испуган': { selfDisadvantage: true },
    'Захвачен': { speed: 0 },
    'Очарован': {},
    'Невидим': { selfAdvantage: true },
    'Недееспособен': {},
    'Бессознателен': { selfDisadvantage: true, grantsAdvantage: true, autoFailStrDex: true },
    'Окаменел': { selfDisadvantage: true, grantsAdvantage: true, autoFailStrDex: true },
    'Опутан': { selfDisadvantage: true },
    'Истощение': {}
  };
  var CONDITION_ALIASES = {
    'ослеплен':'Ослеплён','ослепленн':'Ослеплён','ослеплён':'Ослеплён',
    'оглушен':'Оглушён','оглушён':'Оглушён','отравлен':'Отравлен',
    'испуган':'Испуган','сбит с ног':'Сбит с ног','сбит с ног':'Сбит с ног',
    'парализован':'Парализован','захвачен':'Захвачен','очарован':'Очарован',
    'невидимость':'Невидим','невидим':'Невидим','недееспособен':'Недееспособен',
    'окаменел':'Окаменел','опутан':'Опутан','истощение':'Истощение','бессознателен':'Бессознателен','без сознания':'Бессознателен','unconscious':'Бессознателен'
  };
  function normalizeConditionName(name) {
    var raw=String(name||'').trim().toLowerCase().replace(/ё/g,'ё').replace(/\s+/g,' ');
    return CONDITION_ALIASES[raw] || Object.keys(CONDITIONS).find(function(k){return k.toLowerCase()===raw;}) || String(name||'').trim();
  }


  var FULL_CASTERS = ['bard', 'cleric', 'druid', 'sorcerer', 'wizard'];
  var HALF_CASTERS = ['paladin', 'ranger'];
  // Artificer (2014): half-caster; for multiclass spell slots its level rounds UP.
  var ARTIFICER_KEY = 'artificer';
  var THIRD_CASTERS = ['fighter', 'rogue'];

  var FULL_SLOTS = {
    0: {}, 1:{1:2}, 2:{1:3}, 3:{1:4,2:2}, 4:{1:4,2:3},
    5:{1:4,2:3,3:2}, 6:{1:4,2:3,3:3}, 7:{1:4,2:3,3:3,4:1},
    8:{1:4,2:3,3:3,4:2}, 9:{1:4,2:3,3:3,4:3,5:1},
    10:{1:4,2:3,3:3,4:3,5:2}, 11:{1:4,2:3,3:3,4:3,5:2,6:1},
    12:{1:4,2:3,3:3,4:3,5:2,6:1}, 13:{1:4,2:3,3:3,4:3,5:2,6:1,7:1},
    14:{1:4,2:3,3:3,4:3,5:2,6:1,7:1}, 15:{1:4,2:3,3:3,4:3,5:2,6:1,7:1,8:1},
    16:{1:4,2:3,3:3,4:3,5:2,6:1,7:1,8:1},
    17:{1:4,2:3,3:3,4:3,5:2,6:1,7:1,8:1,9:1},
    18:{1:4,2:3,3:3,4:3,5:3,6:1,7:1,8:1,9:1},
    19:{1:4,2:3,3:3,4:3,5:3,6:2,7:1,8:1,9:1},
    20:{1:4,2:3,3:3,4:3,5:3,6:2,7:2,8:1,9:1}
  };

  var PACT_SLOTS = {
    1:{count:1,level:1},2:{count:2,level:1},3:{count:2,level:2},4:{count:2,level:2},
    5:{count:2,level:3},6:{count:2,level:3},7:{count:2,level:4},8:{count:2,level:4},
    9:{count:2,level:5},10:{count:2,level:5},11:{count:3,level:5},12:{count:3,level:5},
    13:{count:3,level:5},14:{count:3,level:5},15:{count:3,level:5},16:{count:3,level:5},
    17:{count:4,level:5},18:{count:4,level:5},19:{count:4,level:5},20:{count:4,level:5}
  };

  function getStats(hero) {
    var s = (hero && hero.stats) || {};
    var out = {};
    Object.keys(STAT_ALIASES).forEach(function (key) {
      var value = 10;
      STAT_ALIASES[key].some(function (alias) {
        if (s[alias] !== undefined && s[alias] !== '') { value = Number(s[alias]); return true; }
        if (hero && hero[alias] !== undefined && hero[alias] !== '') { value = Number(hero[alias]); return true; }
        return false;
      });
      out[key] = isFinite(value) ? value : 10;
    });
    return out;
  }

  function mod(value) { return Math.floor((Number(value || 10) - 10) / 2); }
  function profBonus(hero) {
    var level = totalLevel(hero);
    return Math.floor((Math.max(1, level) - 1) / 4) + 2;
  }
  function totalLevel(hero) {
    if (!hero) return 1;
    if (Array.isArray(hero.classes) && hero.classes.length) {
      return Math.max(1, hero.classes.reduce(function (sum, c) { return sum + (Number(c && c.level) || 0); }, 0));
    }
    return Math.max(1, Number(hero.level) || 1);
  }
  function classKey(name) { return CLASS_KEYS[String(name || '').toLowerCase().trim()] || String(name || '').toLowerCase(); }
  function classLevels(hero) { return Array.isArray(hero && hero.classes) ? hero.classes : []; }
  function classLevel(hero, key) {
    var found = classLevels(hero).find(function (c) { return classKey(c.name) === key; });
    return found ? Number(found.level) || 0 : 0;
  }

  function normalize(hero) {
    if (!hero) return hero;
    hero.stats = hero.stats || {};
    var s = getStats(hero);
    Object.keys(s).forEach(function (k) {
      if (hero.stats[k] === undefined) hero.stats[k] = s[k];
    });
    if (!Array.isArray(hero.classes)) {
      var raw = hero.class || hero.className || 'Воин';
      hero.classes = [{ name: String(raw).replace(/[0-9]/g, '').replace(/ур\./gi, '').trim(), level: Number(hero.level) || 1, subclass: hero.subclass || null }];
    }
    hero.classes.forEach(function (c) { c.level = Math.max(0, Number(c.level) || 0); });
    hero.level = totalLevel(hero);
    if (!Array.isArray(hero.features)) hero.features = [];
    if (!Array.isArray(hero.feats)) hero.feats = [];
    if (!hero.activeConditions) hero.activeConditions = {};
    if (!Array.isArray(hero.spellcastingSources)) hero.spellcastingSources = [];
    if (!hero.resources) hero.resources = {};
    // Ресурсы, уже присутствующие в progressionEngine, переводим в единую модель.
    var resourceDefs = [
      ['rages', hero.ragesCount, 'long'],
      ['ki', hero.kiPoints, 'short'],
      ['sorceryPoints', hero.sorceryPoints, 'long'],
      ['actionSurges', hero.actionSurges, 'short'],
      ['secondWind', hero.secondWindUses, 'short']
    ];
    resourceDefs.forEach(function(def){
      if (def[1] !== undefined && typeof def[1] !== 'string' && (!hero.resources[def[0]] || hero.resources[def[0]].max !== Number(def[1]))) {
        var current = hero.resources[def[0]] ? Math.min(Number(hero.resources[def[0]].current)||0, Number(def[1])||0) : Number(def[1])||0;
        hero.resources[def[0]] = {max:Number(def[1])||0,current:current,recharge:def[2]};
      }
    });
    if (!hero.concentration) hero.concentration = { active: false, spellId: null, spellName: '' };
    if (Array.isArray(hero.spellsData)) {
      var spellSourcesNow = hero.spellcastingSources.length ? hero.spellcastingSources : [];
      hero.spellsData.forEach(function(sp){
        if (!sp || sp.level === undefined) return;
        if (!sp.castingStat && spellSourcesNow.length) sp.castingStat = spellSourcesNow[0].ability;
        if (!sp.castingClass && spellSourcesNow.length) sp.castingClass = spellSourcesNow[0].className;
      });
    }
    return hero;
  }

  function getSkillBonus(hero, skillId, statKey) {
    var stats = getStats(hero);
    var rank = hero && hero.skillsData ? Number(hero.skillsData[skillId]) || 0 : 0;
    return mod(stats[statKey]) + profBonus(hero) * Math.min(2, Math.max(0, rank));
  }

  function getSaveBonus(hero, statKey) {
    var stats = getStats(hero);
    var proficient = !!(hero && hero.savesData && hero.savesData[statKey]);
    return mod(stats[statKey]) + (proficient ? profBonus(hero) : 0);
  }

  function conditionModifiers(hero) {
    var result = { attack: 0, attacksAgainst: 0, checks: 0, speed: null, autoFailStrDex: false, advantage: false, disadvantage: false };
    var active = (hero && (hero.activeConditions || hero.conditions)) || {};
    Object.keys(active).forEach(function (name) {
      if (!active[name]) return;
      var key=normalizeConditionName(name), c=CONDITIONS[key];
      if (!c) return;
      if (c.selfDisadvantage) result.disadvantage=true;
      if (c.selfAdvantage) result.advantage=true;
      if (c.speed===0) result.speed=0;
      result.autoFailStrDex=result.autoFailStrDex||!!c.autoFailStrDex;
    });
    result.attack = result.disadvantage ? -1 : 0;
    return result;
  }

  function attackAgainstMode(target, baseMode, distanceFt) {
    var mode=baseMode||'normal', active=(target && (target.activeConditions||target.conditions))||{}, adv=false, dis=false;
    Object.keys(active).forEach(function(name){
      if(!active[name])return;
      var c=CONDITIONS[normalizeConditionName(name)];
      if(!c)return;
      if(c.grantsAdvantage)adv=true;
      if(c.selfAdvantage)dis=true;
      if(c.prone){ if(Number(distanceFt||0)<=5) adv=true; else dis=true; }
    });
    if(adv&&dis)return mode;
    if(adv)return mode==='disadvantage'?'normal':'advantage';
    if(dis)return mode==='advantage'?'normal':'disadvantage';
    return mode;
  }

  function resolveRollMode(hero, baseMode) {
    var mode = baseMode || 'normal';
    var c = conditionModifiers(hero);
    if (c.attack < 0 && mode === 'normal') mode = 'disadvantage';
    return mode;
  }

  function rollD20(mode, roller) {
    roller = roller || function () { return Math.floor(Math.random() * 20) + 1; };
    var a = roller(), b = null, result = a;
    if (mode === 'advantage' || mode === 'disadvantage') {
      b = roller();
      result = mode === 'advantage' ? Math.max(a, b) : Math.min(a, b);
    }
    return { first: a, second: b, result: result, critical: result === 20, fumble: result === 1, mode: mode || 'normal' };
  }

  function weaponAttack(hero, weapon, mode) {
    normalize(hero);
    weapon = weapon || {};
    var stats = getStats(hero);
    var stat = weapon.stat || (weapon.properties && weapon.properties.finesse ? (stats.dex > stats.str ? 'dex' : 'str') : 'str');
    var proficient = weapon.proficient !== false;
    var bonus = mod(stats[stat]) + (proficient ? profBonus(hero) : 0) + (Number(weapon.extraAtk) || 0);
    var conditions = conditionModifiers(hero);
    var roll = rollD20(resolveRollMode(hero, mode), global.rollSingleDice ? function(){ return global.rollSingleDice(20); } : null);
    bonus += conditions.attack;
    return { bonus: bonus, roll: roll, total: roll.result + bonus, critical: roll.critical, fumble: roll.fumble, stat: stat };
  }

  function parseDice(expr) {
    var clean = String(expr || '1d6').toLowerCase().replace(/[кk]/g, 'd').replace(/\s+/g, '');
    var matches = [], m, re = /(\d+)d(\d+)/g;
    while ((m = re.exec(clean))) matches.push({ count: Number(m[1]), sides: Number(m[2]) });
    var constant = clean.replace(/\d+d\d+/g, '').match(/[+-]?\d+/g) || [];
    return { groups: matches.length ? matches : [{count:1,sides:6}], constant: constant.reduce(function(a,x){return a+Number(x);},0) };
  }

  function calculateAC(hero) {
    normalize(hero);
    var stats = getStats(hero), dex = mod(stats.dex), base = 10 + dex, body = null, shield = 0, extra = Number(hero.extraACBonus) || 0;
    var armor = hero.inventory && hero.inventory.armor;
    if (Array.isArray(armor)) armor.forEach(function (item) {
      if (!item || !item.equipped) return;
      var name = String(item.name || '').toLowerCase();
      var cat = String(item.category || item.armorCategory || '').toLowerCase();
      var ac = Number(item.acBase !== undefined ? item.acBase : item.ac) || 0;
      if (cat.indexOf('щит') >= 0 || name.indexOf('щит') >= 0 || cat.indexOf('shield') >= 0) shield += ac || 2;
      else if (/heavy|тяжел/.test(cat)) body = {type:'heavy',ac:ac};
      else if (/medium|средн/.test(cat)) body = {type:'medium',ac:ac};
      else if (/light|легк/.test(cat)) body = {type:'light',ac:ac};
      else extra += ac;
    });
    var ac = base;
    if (body) ac = body.type === 'heavy' ? body.ac : body.ac + (body.type === 'medium' ? Math.min(dex,2) : dex);
    ac += shield + extra;
    return Math.max(0, ac);
  }

  function spellSources(hero) {
    normalize(hero);
    var sources = hero.spellcastingSources.slice();
    classLevels(hero).forEach(function(c) {
      var key = classKey(c.name), ability = ({bard:'cha',cleric:'wis',druid:'wis',sorcerer:'cha',wizard:'int',warlock:'cha',paladin:'cha',ranger:'wis',artificer:'int'})[key];
      if (ability && !sources.some(function(s){ return classKey(s.className) === key; })) sources.push({className:c.name, ability:ability});
    });
    hero.spellcastingSources = sources;
    return sources;
  }

  function spellStats(hero, source) {
    normalize(hero);
    var stats = getStats(hero), sources = spellSources(hero);
    var selected = source || sources[0] || {ability: 'int', className: ''};
    var ability = selected.ability || selected.stat || 'int';
    var m = mod(stats[ability]);
    return { className: selected.className || '', ability: ability, modifier: m, dc: 8 + profBonus(hero) + m, attack: profBonus(hero) + m };
  }

  function spellSlotTable(hero) {
    normalize(hero);
    var casterLevel = 0;
    var pactLevel = classLevel(hero, 'warlock');
    classLevels(hero).forEach(function(c) {
      var key = classKey(c.name), lvl = Number(c.level) || 0;
      if (FULL_CASTERS.indexOf(key) >= 0) casterLevel += lvl;
      else if (key === ARTIFICER_KEY) casterLevel += Math.ceil(lvl / 2);
      else if (HALF_CASTERS.indexOf(key) >= 0) casterLevel += Math.floor(lvl / 2);
      else if (THIRD_CASTERS.indexOf(key) >= 0) {
        var sub = String(c.subclass || '').toLowerCase();
        if (/мистич|eldritch|arcane trickster|трикстер/.test(sub)) casterLevel += Math.floor(lvl / 3);
      }
    });
    casterLevel = Math.min(20, Math.max(0, casterLevel));
    var normal = Object.assign({}, FULL_SLOTS[casterLevel] || {});
    var pact = pactLevel ? (PACT_SLOTS[Math.min(20,pactLevel)] || null) : null;
    return { casterLevel: casterLevel, normal: normal, pact: pact };
  }

  function concentrationDC(hero, damage) { return Math.max(10, Math.floor(Number(damage || 0) / 2)); }

  function setResource(hero, id, max, current, recharge) {
    normalize(hero);
    hero.resources[id] = { max: Math.max(0, Number(max)||0), current: Math.max(0, Number(current === undefined ? max : current)||0), recharge: recharge || 'none' };
    return hero.resources[id];
  }
  function spendResource(hero, id, amount) {
    normalize(hero); var r = hero.resources[id]; if (!r) return false; amount = Math.max(0, Number(amount)||1); if (r.current < amount) return false; r.current -= amount; return true;
  }
  function restoreResources(hero, type) {
    normalize(hero); Object.keys(hero.resources).forEach(function(id){ var r=hero.resources[id]; if (r && (r.recharge === type || (type === 'long' && r.recharge === 'short'))) r.current = r.max; });
  }
  function applyASI(hero, changes) {
    normalize(hero); var stats=getStats(hero); var result={};
    Object.keys(changes || {}).forEach(function(k){ var key=STAT_ALIASES[k] ? k : Object.keys(STAT_ALIASES).find(function(x){return STAT_ALIASES[x].indexOf(k)>=0;}); if(!key)return; var before=stats[key], after=Math.min(20,before + Number(changes[k]||0)); hero.stats[key]=after; result[key]={before:before,after:after,applied:after-before}; });
    return result;
  }

  global.DNDRules = {
    VERSION: '2.0.0', STAT_ALIASES: STAT_ALIASES, CONDITIONS: CONDITIONS,
    normalize: normalize, getStats: getStats, mod: mod, totalLevel: totalLevel, profBonus: profBonus,
    classKey: classKey, classLevel: classLevel, getSkillBonus: getSkillBonus, getSaveBonus: getSaveBonus,
    conditionModifiers: conditionModifiers, normalizeConditionName: normalizeConditionName, attackAgainstMode: attackAgainstMode, resolveRollMode: resolveRollMode, rollD20: rollD20,
    weaponAttack: weaponAttack, parseDice: parseDice, calculateAC: calculateAC, spellSources: spellSources,
    spellStats: spellStats, spellSlotTable: spellSlotTable, concentrationDC: concentrationDC,
    setResource: setResource, spendResource: spendResource, restoreResources: restoreResources, applyASI: applyASI
  };

  global.getDndRules = function(){ return global.DNDRules; };
})(window);

/* ------------------------------------------------------------------
 * ИНТЕГРАЦИЯ С СУЩЕСТВУЮЩИМ UI
 * Выполняется после загрузки остальных обычных script-файлов, поэтому
 * не требует переписывать весь старый интерфейс.
 * ------------------------------------------------------------------ */
if (typeof window !== 'undefined' && window.addEventListener) window.addEventListener('DOMContentLoaded', function () {
  var R = window.DNDRules;
  if (!R) return;

  function hero() { return window.currentCharacter || window.currentChar || null; }
  function save() { if (typeof window.autoSaveCurrentCharacter === 'function') window.autoSaveCurrentCharacter(); }
  function refresh() {
    if (typeof window.calculateMods === 'function') window.calculateMods();
    if (typeof window.renderWeapons === 'function') window.renderWeapons();
    if (typeof window.renderSpellSlots === 'function') window.renderSpellSlots();
    if (typeof window.renderCompanions === 'function') window.renderCompanions();
    if (typeof window.renderInitiativeTracker === 'function') window.renderInitiativeTracker();
  }

  function patchOnce(name, factory) {
    var original = window[name];
    if (typeof original !== 'function' || original.__dndRulesPatched) return;
    var wrapped = factory(original);
    wrapped.__dndRulesPatched = true;
    wrapped.__dndRulesOriginal = original;
    window[name] = wrapped;
  }

  patchOnce('exportCurrentCharacter', function (original) {
    return function () {
      var h=hero(); if(!h){return original.apply(this,arguments);} R.normalize(h);
      var backup=JSON.parse(JSON.stringify(h)); backup.schemaVersion=2; backup.exportedAt=new Date().toISOString(); backup.app='D&D Mobile Sheet';
      try{var blob=new Blob([JSON.stringify(backup,null,2)],{type:'application/json;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='dnd_'+((h.name||'character').replace(/[^a-zа-я0-9_-]+/gi,'_'))+'.json';document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(url);}catch(e){console.error(e);alert('Не удалось экспортировать персонажа.');}
    };
  });
  patchOnce('importCharacterFromFile', function (original) {
    return function (event) {
      var file=event&&event.target&&event.target.files&&event.target.files[0]; if(!file)return;
      var reader=new FileReader(); reader.onload=function(e){try{var data=JSON.parse(e.target.result);if(!data||typeof data!=='object'||Array.isArray(data)||(!data.name&&!data.stats&&!data.classes))throw new Error('not-character');R.normalize(data);data.id='char_'+Date.now();loadAllCharacters();allCharacters.push(data);saveAllCharacters();renderCharacterList();alert('Персонаж «'+(data.name||'Без имени')+'» импортирован.');}catch(err){console.error(err);alert('Файл не похож на корректный экспорт персонажа.');}if(event)event.target.value='';};reader.readAsText(file);
    };
  });

  patchOnce('openCharacter', function (original) {
    return function () {
      var result = original.apply(this, arguments);
      var h = hero();
      if (h) { R.normalize(h); R.spellSources(h); save(); }
      return result;
    };
  });

  patchOnce('updateCharacterArmorClass', function (original) {
    return function () {
      var h = hero();
      if (!h) return original.apply(this, arguments);
      R.normalize(h);
      h.ac = R.calculateAC(h);
      var ac = document.getElementById('ac'); if (ac) ac.value = h.ac;
      var inv = document.getElementById('invHeaderAC'); if (inv) inv.textContent = h.ac;
      save();
      return h.ac;
    };
  });

  patchOnce('calculateSpellStats', function (original) {
    return function () {
      var h = hero(); if (!h) return original.apply(this, arguments);
      R.normalize(h);
      var sources = R.spellSources(h);
      var source = sources[0] || {ability:'int',className:''};
      var stats = R.spellStats(h, source);
      var dc = document.getElementById('spellDCVal'); if (dc) dc.textContent = stats.dc;
      var atk = document.getElementById('spellAtkVal'); if (atk) atk.textContent = stats.attack >= 0 ? '+' + stats.attack : String(stats.attack);
      var label = document.getElementById('spellStat');
      if (label && !h.spellStat) label.value = stats.ability;
      return stats;
    };
  });

  patchOnce('rollSpellAttack', function (original) {
    return function (spellName, source) {
      var h = hero(); if (!h) return original.apply(this, arguments);
      R.normalize(h);
      var src = source;
      if (typeof source === 'string') src = { className: source };
      if (!src) {
        var sp = (h.spellsData || []).find(function(s){ return s && s.name === spellName; });
        src = sp && sp.spellcastingSource ? sp.spellcastingSource : null;
      }
      var stats = R.spellStats(h, src || undefined);
      var mode = (typeof window.currentRollMode !== 'undefined') ? window.currentRollMode : 'normal';
      var roll = R.rollD20(R.resolveRollMode(h, mode), typeof window.rollSingleDice === 'function' ? function(){ return window.rollSingleDice(20); } : null);
      var total = roll.result + stats.attack;
      var text = '✨ ' + spellName + ' [' + (stats.className || 'Заклинание') + ': ' + stats.ability.toUpperCase() + ']\n' +
        'd20 (' + roll.result + ') ' + (stats.attack >= 0 ? '+' : '') + stats.attack + ' = ' + total +
        (roll.critical ? ' 🔥 КРИТ!' : roll.fumble ? ' 💀 КРИТИЧЕСКИЙ ПРОМАХ!' : '');
      if (typeof window.appendDiceLog === 'function') window.appendDiceLog(text, roll.critical ? 'adv-roll' : 'norm-roll');
      return total;
    };
  });

  patchOnce('updateCharacterSpellSlots', function () {
    return function (h) {
      h = h || hero(); if (!h) return;
      var table = R.spellSlotTable(h);
      h.spellSlotsData = h.spellSlotsData || {};
      for (var i=1;i<=9;i++) {
        var old = h.spellSlotsData[i] || {max:0,used:0};
        var max = table.normal[i] || 0;
        h.spellSlotsData[i] = {max:max, used:Math.min(Number(old.used)||0,max)};
      }
      if (table.pact) {
        var oldPact = h.pactMagic || h.pactMagicData || {};
        var pactState = {slotLevel:table.pact.level, max:table.pact.count, used:Math.min(Number(oldPact.used)||0,table.pact.count)};
        // Keep the historical h.pactMagic field and the current UI/network
        // h.pactMagicData field synchronized; both have existed in older builds.
        h.pactMagic = {slotLevel:pactState.slotLevel,max:pactState.max,used:pactState.used};
        h.pactMagicData = {slotLevel:pactState.slotLevel,max:pactState.max,used:pactState.used};
      } else {
        h.pactMagic = {slotLevel:0,max:0,used:0};
        h.pactMagicData = null;
      }
      return h.spellSlotsData;
    };
  });

  patchOnce('renderSpellSlots', function (original) {
    return function () {
      var result = original.apply(this, arguments);
      var h=hero(), container=document.getElementById('spellSlotsContainer');
      if(!h||!container||!Array.isArray(h.spellsData)) return result;
      R.spellSources(h);
      var cards=container.querySelectorAll('.spell-card');
      cards.forEach(function(card){
        var input=card.querySelector('input[readonly]'); if(!input) return;
        var name=input.value, sp=h.spellsData.find(function(x){return x&&x.name===name;}); if(!sp) return;
        var header=card.querySelector('.spell-card-header'); if(!header||header.querySelector('.dnd-spell-source')) return;
        var sel=document.createElement('select'); sel.className='dnd-spell-source'; sel.style.cssText='width:120px;flex-shrink:0;background:#1a1a1a;color:#ffb74d;border:1px solid #444;padding:6px;border-radius:4px;font-size:.78em;';
        R.spellSources(h).forEach(function(src){var o=document.createElement('option');o.value=src.className||src.ability;o.textContent=(src.className||'Spell')+' · '+String(src.ability||'').toUpperCase();if((sp.castingClass&&src.className===sp.castingClass)||(!sp.castingClass&&src.ability===sp.castingStat))o.selected=true;sel.appendChild(o);});
        sel.addEventListener('change',function(){var src=R.spellSources(h).find(function(x){return (x.className||x.ability)===sel.value;});if(src){sp.castingClass=src.className;sp.castingStat=src.ability;save();}});
        header.appendChild(sel);
      });
      return result;
    };
  });

  patchOnce('rollWeaponAttack', function () {
    return function (index) {
      var h = hero(); if (!h || !h.weaponsData || !h.weaponsData[index]) return;
      var w = h.weaponsData[index];
      var result = R.weaponAttack(h, w);
      var mode = result.roll.mode;
      var details = mode === 'normal' ? String(result.roll.result) : '[' + result.roll.first + ', ' + result.roll.second + ' → ' + result.roll.result + ']';
      var text = '⚔️ ' + ((w.name || '').trim() || 'Оружие') + '\nАтака: d20 ' + details + ' ' + (result.bonus >= 0 ? '+' : '') + result.bonus + ' = ' + result.total +
        (result.critical ? ' 🔥 КРИТ!' : result.fumble ? ' 💀 КРИТИЧЕСКИЙ ПРОМАХ!' : '');
      if (typeof window.appendDiceLog === 'function') window.appendDiceLog(text, result.critical ? 'adv-roll' : 'norm-roll');
      return result.total;
    };
  });

  patchOnce('toggleCondition', function (original) {
    return function (cond) {
      var result = original.apply(this, arguments);
      var h = hero(); if (h) { R.normalize(h); save(); }
      return result;
    };
  });

  // Короткий/длинный отдых теперь также восстанавливают ресурсы движка.
  patchOnce('shortRest', function (original) {
    return function () { var result=original.apply(this,arguments); var h=hero(); if(h) R.restoreResources(h,'short'); save(); return result; };
  });
  patchOnce('longRest', function (original) {
    return function () { var result=original.apply(this,arguments); var h=hero(); if(h) R.restoreResources(h,'long'); save(); return result; };
  });

  // Унифицированная карточка правил: видна прямо в существующей вкладке Дайсы.
  function renderRulesPanel() {
    var tab=document.getElementById('tabDice'), h=hero();
    if(!tab || !h) return;
    R.normalize(h);
    var stats=R.getStats(h), mods={}; Object.keys(stats).forEach(function(k){mods[k]=R.mod(stats[k]);});
    var cond=R.conditionModifiers(h), slots=R.spellSlotTable(h);
    var pact=slots.pact ? ('Колдун: ' + slots.pact.count + '×' + slots.pact.level + ' круг') : '—';
    var conc=h.concentration && h.concentration.active ? ('🟢 ' + (h.concentration.spellName||'Активна')) : '⚪ нет';
    var old=document.getElementById('dndRulesPanel'); if(old) old.remove();
    var el=document.createElement('div'); el.id='dndRulesPanel'; el.className='card';
    el.innerHTML='<h3>📐 Rules Engine</h3>'+
      '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;font-size:.82em;">'+
      ['str','dex','con','int','wis','cha'].map(function(k){return '<div style="background:#252525;padding:7px;border-radius:5px;text-align:center;">'+k.toUpperCase()+' <b>'+mods[k]+'</b></div>';}).join('')+'</div>'+
      '<div style="margin-top:8px;color:#bbb;font-size:.82em;line-height:1.5;">'+
      'Уровень: <b>'+R.totalLevel(h)+'</b> · Мастерство: <b>+'+R.profBonus(h)+'</b><br>'+
      'КД: <b>'+R.calculateAC(h)+'</b> · Концентрация: <b>'+conc+'</b><br>'+
      'Обычные ячейки: <b>' + Object.keys(slots.normal).map(function(k){return k+'×'+slots.normal[k];}).join(' · ') + '</b><br>'+
      'Pact Magic: <b>'+pact+'</b></div>'+
      '<div style="display:flex;gap:6px;margin-top:8px;flex-wrap:wrap;">'+
      '<button class="btn-action" onclick="dndStartConcentrationPrompt()">🧠 Концентрация</button>'+
      '<button class="btn-action" onclick="dndConcentrationDamagePrompt()">💥 Проверка концентрации</button>'+
      '<button class="btn-action" onclick="dndShowRulesSummary()">📋 Расчёты</button></div>';
    tab.appendChild(el);
  }

  window.dndStartConcentrationPrompt=function(){var h=hero();if(!h)return;var name=prompt('Какое заклинание держите концентрацией?',(h.concentration&&h.concentration.spellName)||'');if(name===null)return;if(window.DNDCombat&&typeof window.DNDCombat.beginConcentration==='function')window.DNDCombat.beginConcentration(h,name?{name:name,concentration:true}:null);else h.concentration={active:!!name,spellName:name,spellId:null};save();renderRulesPanel();};
  window.dndConcentrationDamagePrompt=function(){var h=hero();if(!h)return;var dmg=Number(prompt('Полученный урон:','10'));if(!isFinite(dmg))return;var dc=R.concentrationDC(h,dmg), stats=R.getSaveBonus(h,'con');var roll=R.rollD20('normal');var total=roll.result+stats;var ok=total>=dc;alert('Проверка концентрации\nDC '+dc+'\nCON: d20 '+roll.result+' '+(stats>=0?'+':'')+stats+' = '+total+'\n'+(ok?'✅ Концентрация сохранена':'❌ Концентрация потеряна'));if(!ok)h.concentration={active:false,spellId:null,spellName:''};save();renderRulesPanel();};
  window.dndShowRulesSummary=function(){var h=hero();if(!h)return;var s=R.getStats(h),lines=['D&D 5e Rules Engine','Уровень '+R.totalLevel(h),'Бонус мастерства +'+R.profBonus(h),'КД '+R.calculateAC(h),'Спасброски: '+Object.keys(s).map(function(k){return k.toUpperCase()+' '+(R.getSaveBonus(h,k)>=0?'+':'')+R.getSaveBonus(h,k);}).join(', ')];alert(lines.join('\n'));};

  var oldRenderDndTools=window.renderDndTools;
  if(typeof oldRenderDndTools==='function' && !oldRenderDndTools.__rulesEnhanced){
    var wrappedTools=function(){var r=oldRenderDndTools.apply(this,arguments);renderRulesPanel();return r;};
    wrappedTools.__rulesEnhanced=true; window.renderDndTools=wrappedTools;
  }

  patchOnce('addCompanion', function(original){ return function(){ var r=original.apply(this,arguments); var h=hero(); if(h&&h.companions&&h.companions.length){ var c=h.companions[h.companions.length-1]; c.stats=c.stats||{str:10,dex:10,con:10,int:10,wis:10,cha:10}; c.attacks=Array.isArray(c.attacks)?c.attacks:[]; save(); } return r; }; });

  // Более полноценный companion/statblock UI поверх старого минимального трекера.
  window.renderCompanions = function(){
    var box=document.getElementById('companionsList'), h=hero(); if(!box||!h)return;
    if(!Array.isArray(h.companions))h.companions=[];
    if(!h.companions.length){box.innerHTML='<div style="color:#777;text-align:center;">Компаньонов пока нет</div>';return;}
    box.innerHTML=h.companions.map(function(c){
      c.stats=c.stats||{str:10,dex:10,con:10,int:10,wis:10,cha:10}; c.attacks=Array.isArray(c.attacks)?c.attacks:[];
      var attacks=c.attacks.map(function(a,i){return '<div style="display:flex;gap:4px;margin-top:4px;"><input value="'+escapeDndHtml(a.name||'Атака')+'" oninput="dndCompanionAttack(\''+c.id+'\','+i+',\'name\',this.value)" style="flex:1"><input value="'+escapeDndHtml(a.bonus||'')+'" placeholder="+5" oninput="dndCompanionAttack(\''+c.id+'\','+i+',\'bonus\',this.value)" style="width:55px"><input value="'+escapeDndHtml(a.damage||'1d6')+'" oninput="dndCompanionAttack(\''+c.id+'\','+i+',\'damage\',this.value)" style="width:75px"><button class="btn-del" onclick="dndRemoveCompanionAttack(\''+c.id+'\','+i+')">✕</button></div>';}).join('');
      return '<div style="background:#252525;border:1px solid #444;border-radius:6px;padding:9px;margin-bottom:8px;">'+
        '<div style="display:flex;gap:6px;"><input value="'+escapeDndHtml(c.name||'Новый компаньон')+'" oninput="updateCompanion(\''+c.id+'\',\'name\',this.value)" style="flex:1"><button class="btn-del" onclick="deleteCompanion(\''+c.id+'\')">✕</button></div>'+
        '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:5px;margin-top:5px;">'+
        '<label style="font-size:.7em;color:#aaa">HP<input type="number" value="'+(Number(c.hp)||0)+'" oninput="updateCompanion(\''+c.id+'\',\'hp\',this.value)"></label>'+
        '<label style="font-size:.7em;color:#aaa">Макс<input type="number" value="'+(Number(c.maxHp)||0)+'" oninput="updateCompanion(\''+c.id+'\',\'maxHp\',this.value)"></label>'+
        '<label style="font-size:.7em;color:#aaa">КД<input type="number" value="'+(Number(c.ac)||0)+'" oninput="updateCompanion(\''+c.id+'\',\'ac\',this.value)"></label></div>'+
        '<div style="display:grid;grid-template-columns:repeat(6,1fr);gap:3px;margin-top:5px;">'+['str','dex','con','int','wis','cha'].map(function(k){return '<label style="font-size:.62em;color:#999;text-align:center">'+k.toUpperCase()+'<input type="number" value="'+(Number(c.stats[k])||10)+'" oninput="dndCompanionStat(\''+c.id+'\',\''+k+'\',this.value)" style="padding:4px 1px;text-align:center"></label>';}).join('')+'</div>'+
        '<details style="margin-top:6px"><summary style="cursor:pointer;color:#ff9800">⚔️ Атаки ('+c.attacks.length+')</summary><div>'+attacks+'</div><button class="btn-action" style="margin-top:5px" onclick="dndAddCompanionAttack(\''+c.id+'\')">+ Атака</button></details>'+
        '<div style="display:flex;gap:5px;margin-top:6px"><button class="btn-action" style="flex:1" onclick="addInitiativeCombatant(decodeURIComponent(\''+encodeURIComponent(c.name||'')+'\'),false,'+(Number(c.initiative)||0)+','+(Number(c.hp)||0)+','+(Number(c.maxHp)||0)+','+(Number(c.ac)||10)+',\'companion\')">⚔️ В бой</button><button class="btn-action" onclick="dndCompanionDamage(\''+c.id+'\')">−HP</button><button class="btn-action" onclick="dndCompanionHeal(\''+c.id+'\')">+HP</button></div>'+
        '<textarea placeholder="Особенности, чувства, условия..." oninput="updateCompanion(\''+c.id+'\',\'notes\',this.value)" style="margin-top:5px">'+escapeDndHtml(c.notes||'')+'</textarea></div>';
    }).join('');
  };
  window.dndCompanionStat=function(id,key,val){var h=hero(),c=(h&&h.companions||[]).find(function(x){return x.id===id;});if(!c)return;c.stats=c.stats||{};c.stats[key]=Math.max(1,Number(val)||10);save();};
  window.dndAddCompanionAttack=function(id){var h=hero(),c=(h&&h.companions||[]).find(function(x){return x.id===id;});if(!c)return;c.attacks=Array.isArray(c.attacks)?c.attacks:[];c.attacks.push({name:'Атака',bonus:'+0',damage:'1d6'});save();renderCompanions();};
  window.dndRemoveCompanionAttack=function(id,i){var h=hero(),c=(h&&h.companions||[]).find(function(x){return x.id===id;});if(!c)return;c.attacks.splice(i,1);save();renderCompanions();};
  window.dndCompanionAttack=function(id,i,key,val){var h=hero(),c=(h&&h.companions||[]).find(function(x){return x.id===id;});if(!c||!c.attacks[i])return;c.attacks[i][key]=val;save();};
  window.dndCompanionDamage=function(id){var h=hero(),c=(h&&h.companions||[]).find(function(x){return x.id===id;});if(!c)return;var n=Number(prompt('Урон:','1'));if(!isFinite(n))return;c.hp=Math.max(0,(Number(c.hp)||0)-n);save();renderCompanions();};
  window.dndCompanionHeal=function(id){var h=hero(),c=(h&&h.companions||[]).find(function(x){return x.id===id;});if(!c)return;var n=Number(prompt('Лечение:','1'));if(!isFinite(n))return;c.hp=Math.min(Number(c.maxHp)||0,(Number(c.hp)||0)+n);save();renderCompanions();};

  // Инициатива: состояния, быстрый урон/лечение, пропуск павших участников.
  var oldInitRender=window.renderInitiativeTracker;
  window.renderInitiativeTracker=function(){
    if(typeof oldInitRender==='function') oldInitRender.apply(this,arguments);
    var box=document.getElementById('initiativeTrackerList'),h=hero();if(!box||!h||!h.initiativeTracker)return;
    var rows=box.querySelectorAll('[data-dnd-init-row]');
    // Старый renderer не имеет data-атрибута, поэтому добавляем быстрые controls в верхнюю панель.
    var t=h.initiativeTracker;
    var controls=box.querySelector('.dnd-init-enhanced'); if(controls)controls.remove();
    var wrap=document.createElement('div');wrap.className='dnd-init-enhanced';wrap.style.cssText='display:flex;gap:5px;margin:5px 0;flex-wrap:wrap;';
    wrap.innerHTML='<button class="btn-action" onclick="dndInitiativeDamageActive()">− Урон</button><button class="btn-action" onclick="dndInitiativeHealActive()">+ Лечение</button><button class="btn-action" onclick="dndInitiativeSkipDefeated()">💀 Пропустить павших</button>';
    box.appendChild(wrap);
  };
  window.dndInitiativeActive=function(){var h=hero(),t=h&&h.initiativeTracker;if(!t||!t.combatants.length)return null;return t.combatants[t.activeIndex]||null;};
  window.dndInitiativeDamageActive=function(){var c=dndInitiativeActive();if(!c)return;var n=Number(prompt('Урон:','1'));if(!isFinite(n))return;c.hp=Math.max(0,(Number(c.hp)||0)-n);c.defeated=c.hp<=0;save();renderInitiativeTracker();};
  window.dndInitiativeHealActive=function(){var c=dndInitiativeActive();if(!c)return;var n=Number(prompt('Лечение:','1'));if(!isFinite(n))return;c.hp=Math.min(Number(c.maxHp)||0,(Number(c.hp)||0)+n);c.defeated=false;save();renderInitiativeTracker();};
  window.dndInitiativeSkipDefeated=function(){var h=hero(),t=h&&h.initiativeTracker;if(!t||!t.combatants.length)return;var guard=0;while(t.combatants[t.activeIndex]&&t.combatants[t.activeIndex].defeated&&guard++<t.combatants.length){if(typeof window.nextInitiativeTurn==='function')window.nextInitiativeTurn();else break;}renderInitiativeTracker();};

  // ASI: общий API, которым пользуются и будущие модалки, и текущий level-up.
  window.applyDndASI=function(changes){var h=hero();if(!h)return null;var result=R.applyASI(h,changes);save();refresh();return result;};

  // Первый запуск после открытия текущего персонажа.
  var h=hero(); if(h){R.normalize(h);R.spellSources(h);}
});
