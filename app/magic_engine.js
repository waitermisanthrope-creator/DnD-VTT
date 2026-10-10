/*
 * magic_engine.js — слой магии для мультикласса.
 *
 * Что делает:
 * - хранит обычные spell slots отдельно от Pact Magic;
 * - даёт каждому заклинанию castingClass/castingStat;
 * - вычисляет Spell Attack и Save DC по источнику заклинания;
 * - восстанавливает Pact Magic на коротком отдыхе;
 * - мигрирует старые spellsData, где источник/характеристика не были указаны.
 * Основные переменные: currentChar, hero.spellsData, hero.spellcastingSources,
 * hero.spellSlotsData, hero.pactMagicData.
 */
(function(global){
  'use strict';
  var ABILITY = {bard:'cha',cleric:'wis',druid:'wis',sorcerer:'cha',wizard:'int',warlock:'cha',paladin:'cha',ranger:'wis',artificer:'int',spellblade:'int'};
  var FULL = {1:{1:2},2:{1:3},3:{1:4,2:2},4:{1:4,2:3},5:{1:4,2:3,3:2},6:{1:4,2:3,3:3},7:{1:4,2:3,3:3,4:1},8:{1:4,2:3,3:3,4:2},9:{1:4,2:3,3:3,4:3,5:1},10:{1:4,2:3,3:3,4:3,5:2},11:{1:4,2:3,3:3,4:3,5:2,6:1},12:{1:4,2:3,3:3,4:3,5:2,6:1},13:{1:4,2:3,3:3,4:3,5:2,6:1,7:1},14:{1:4,2:3,3:3,4:3,5:2,6:1,7:1},15:{1:4,2:3,3:3,4:3,5:2,6:1,7:1,8:1},16:{1:4,2:3,3:3,4:3,5:2,6:1,7:1,8:1},17:{1:4,2:3,3:3,4:3,5:2,6:1,7:1,8:1,9:1},18:{1:4,2:3,3:3,4:3,5:3,6:1,7:1,8:1,9:1},19:{1:4,2:3,3:3,4:3,5:3,6:2,7:1,8:1,9:1},20:{1:4,2:3,3:3,4:3,5:3,6:2,7:2,8:1,9:1}};
  var PACT = {1:{count:1,level:1},2:{count:2,level:1},3:{count:2,level:2},4:{count:2,level:2},5:{count:2,level:3},6:{count:2,level:3},7:{count:2,level:4},8:{count:2,level:4},9:{count:2,level:5},10:{count:2,level:5},11:{count:3,level:5},12:{count:3,level:5},13:{count:3,level:5},14:{count:3,level:5},15:{count:3,level:5},16:{count:3,level:5},17:{count:4,level:5},18:{count:4,level:5},19:{count:4,level:5},20:{count:4,level:5}};
  function key(n){return String(n||'').toLowerCase().trim();}
  function classKey(n){var s=key(n);if(s==='spellblade'||s==='заклинатель клинка')return'spellblade'; if(s.indexOf('бард')>=0||s==='bard')return'bard';if(s.indexOf('жрец')>=0||s.indexOf('клерик')>=0||s.indexOf('cleric')>=0)return'cleric';if(s.indexOf('друид')>=0||s==='druid')return'druid';if(s.indexOf('чародей')>=0||s==='sorcerer')return'sorcerer';if(s.indexOf('волшебник')>=0||s==='wizard')return'wizard';if(s.indexOf('колдун')>=0||s==='warlock')return'warlock';if(s.indexOf('паладин')>=0||s==='paladin')return'paladin';if(s.indexOf('следопыт')>=0||s==='ranger')return'ranger';if(s.indexOf('изобретатель')>=0||s==='artificer')return'artificer';return s;}
  function level(h){return Array.isArray(h.classes)?h.classes.reduce(function(a,c){return a+(Number(c.level)||0)},0):Number(h.level)||1;}
  function stats(h){if(global.DNDRules&&global.DNDRules.getStats)return global.DNDRules.getStats(h);var a=h.abilityScores||h.stats||{},out={};Object.entries({str:'strength',dex:'dexterity',con:'constitution',int:'intelligence',wis:'wisdom',cha:'charisma'}).forEach(function(p){out[p[0]]=a[p[0]]!=null?a[p[0]]:a[p[1]];});return out;}
  function mod(v){return Math.floor(((Number(v)||10)-10)/2);}
  function prof(h){return Math.floor((Math.max(1,level(h))-1)/4)+2;}
  function sources(h){
    h.spellcastingSources=Array.isArray(h.spellcastingSources)?h.spellcastingSources:[];
    (h.classes||[]).forEach(function(c){var k=classKey(c.name),a=ABILITY[k];if(a&&!h.spellcastingSources.some(function(x){return x.className===c.name;}))h.spellcastingSources.push({className:c.name,ability:a});});
    return h.spellcastingSources;
  }
  function sourceFor(h,spell){
    var ss=sources(h); if(spell.castingClass){var exact=ss.find(function(x){return x.className===spell.castingClass;});if(exact)return exact;}
    if(spell.source){var byName=ss.find(function(x){return key(x.className)===key(spell.source);});if(byName)return byName;}
    return ss[0]||null;
  }
  function ensure(h){
    if(!h)return h; sources(h); h.spellsData=Array.isArray(h.spellsData)?h.spellsData:[];
    h.spellsData.forEach(function(s){var src=sourceFor(h,s);if(src){s.castingClass=s.castingClass||src.className;s.castingStat=s.castingStat||src.ability;}});
    return h;
  }
  function casterLevel(h){
    if(global.DNDRules&&typeof global.DNDRules.spellSlotTable==='function'){
      return Number(global.DNDRules.spellSlotTable(h).casterLevel)||0;
    }
    var n=0; (h.classes||[]).forEach(function(c){var k=classKey(c.name),l=Number(c.level)||0,sub=key(c.subclass);if(['bard','cleric','druid','sorcerer','wizard'].indexOf(k)>=0)n+=l;else if(k==='spellblade'&&l>=2)n+=(h.classes||[]).some(function(x){var q=classKey(x.name);return ['bard','cleric','druid','sorcerer','wizard','artificer','paladin','ranger'].includes(q)||['fighter','rogue'].includes(q)&&/eldritch|мистич|arcane|трикстер/.test(key(x.subclass));})?Math.floor(l/2):Math.ceil(l/2);else if(k==='artificer')n+=Math.ceil(l/2);else if(k==='paladin'||k==='ranger')n+=Math.floor(l/2);else if(k==='fighter'&&(sub.indexOf('eldritch')>=0||sub.indexOf('мистичес')>=0))n+=Math.floor(l/3);else if(k==='rogue'&&(sub.indexOf('arcane')>=0||sub.indexOf('трикстер')>=0))n+=Math.floor(l/3);});return Math.max(0,Math.min(20,n));}
  function pactLevel(h){var c=(h.classes||[]).find(function(x){return classKey(x.name)==='warlock';});return c?Number(c.level)||0:0;}
  function rebuild(h){
    ensure(h);
    var table;
    if(global.DNDRules&&typeof global.DNDRules.spellSlotTable==='function') table=global.DNDRules.spellSlotTable(h).normal||{};
    else table=FULL[casterLevel(h)]||{};
    h.spellSlotsData=h.spellSlotsData||{};
    for(var i=1;i<=9;i++){var max=table[i]||0,old=h.spellSlotsData[i]||{max:0,used:0};h.spellSlotsData[i]={max:max,used:Math.min(Number(old.used)||0,max)};}
    var pl=pactLevel(h),pi=PACT[Math.min(20,pl)];
    if(pi){
      var legacyPact=h.pactMagic||{},currentPact=h.pactMagicData||{};
      var used=Math.min(Number(currentPact.used!=null?currentPact.used:legacyPact.used)||0,pi.count);
      h.pactMagicData={max:pi.count,used:used,slotLevel:pi.level};
      h.pactMagic={max:pi.count,used:used,slotLevel:pi.level};
    } else { h.pactMagicData=null; h.pactMagic={max:0,used:0,slotLevel:0}; }
    return h;
  }
  function info(h,spell){ensure(h);var src=sourceFor(h,spell),a=spell.castingStat||(src&&src.ability);if(!a)return null;return {className:src&&src.className||'',ability:a,attack:prof(h)+mod(stats(h)[a]),dc:8+prof(h)+mod(stats(h)[a])};}
  global.DNDMagic={ensure:ensure,rebuild:rebuild,getSource:sourceFor,getSpellInfo:info,casterLevel:casterLevel,pactLevel:pactLevel};
  global.updateMagicData=function(h){return rebuild(h);};
  global.getSpellCastingInfo=function(spell){var h=global.currentCharacter||global.currentChar;return h?info(h,spell):null;};
  global.restorePactMagic=function(){var h=global.currentCharacter||global.currentChar;if(h&&h.pactMagicData)h.pactMagicData.used=0;};
})(window);
