/**
 * Necromancer.js
 * Карманный ВТТ — метаданные класса Некромант 2024/5.5E.
 * Полная таблица и механики живут в necromancer_mhp_2024_runtime.js.
 * Публичный API: window.necromancerProgression / window.necromancerRuntime.
 */
(function(){
"use strict";
window.necromancerProgression={
  className:"Некромант",
  englishName:"Necromancer",
  source:"Mage Hand Press — Necromancer 2024 / Complete Necromancer 2024",
  edition:"5.5E",
  status:"implemented_2024_runtime",
  hitDie:6,
  primaryStat:"intelligence",
  savingThrows:["constitution","intelligence"],
  armor:[],
  weapons:["simple"],
  tools:[],
  skills:{choose:2,from:["arcana","deception","history","intimidation","investigation","medicine","persuasion","religion","stealth"]},
  multiclassRequirement:{intelligence:13},
  subclassFeatureLevels:[3,6,10,20],
  progressionSource:"window.NECROMANCER_2024",
  mechanicsSource:"window.necromancerRuntime"
};
})();