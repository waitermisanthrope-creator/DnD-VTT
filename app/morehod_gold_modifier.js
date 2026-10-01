/* Мореход: модификатор личного кошелька.
 * Отдельный чистый модуль: пока не подключён к общим броскам, чтобы не менять
 * правила всех классов до завершения аудита точек применения.
 */
(function (global) {
  'use strict';

  function finiteNonNegative(value) {
    var n = Number(value);
    return Number.isFinite(n) && n > 0 ? n : 0;
  }

  // D&D 5e: 1 pp = 10 gp, 1 ep = 0.5 gp, 1 gp = 10 sp = 100 cp.
  // Берём только личный кошелёк героя; имущество группы/корабля не учитывается.
  function carriedGoldEquivalent(coins) {
    coins = coins && typeof coins === 'object' ? coins : {};
    return finiteNonNegative(coins.gp)
      + finiteNonNegative(coins.pp) * 10
      + finiteNonNegative(coins.ep) * 0.5
      + finiteNonNegative(coins.sp) * 0.1
      + finiteNonNegative(coins.cp) * 0.01;
  }

  function modifierForGold(gold) {
    gold = finiteNonNegative(gold);
    if (gold >= 2000) return 5;
    return Math.floor(gold / 200) - 5;
  }

  function getModifier(hero) {
    if (!hero || typeof hero !== 'object') return 0;
    var classList = Array.isArray(hero.classes) ? hero.classes : [];
    var isMorehod = classList.some(function (entry) {
      var name = typeof entry === 'string' ? entry : entry && (entry.name || entry.englishName);
      return /^(мореход|morehod|mariner)$/i.test(String(name || '').trim());
    });
    if (!isMorehod && !/^(мореход|morehod|mariner)$/i.test(String(hero.className || hero.class || '').trim())) return 0;
    return modifierForGold(carriedGoldEquivalent(hero.coins));
  }

  function adjustRollTotal(total, hero) {
    return Number(total || 0) + getModifier(hero);
  }

  function adjustDamageDie(value, hero) {
    return Math.max(0, Number(value || 0) + getModifier(hero));
  }

  var api = {
    carriedGoldEquivalent: carriedGoldEquivalent,
    modifierForGold: modifierForGold,
    getModifier: getModifier,
    adjustRollTotal: adjustRollTotal,
    adjustDamageDie: adjustDamageDie
  };
  global.MorehodGoldModifier = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
