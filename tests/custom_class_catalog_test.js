'use strict';
const assert = require('assert');
const fs = require('fs');
const vm = require('vm');
const cases = [
  ['Protector.js', 'protectorProgression', ['boundaryWarden','savior','bulwark']],
  ['Morehod.js', 'morehodProgression', ['corsair','boarder','pirateCaptain']],
  ['Bandit.js', 'banditProgression', ['bruiser','saboteur','bountyHunter']],
  ['Circus.js', 'circusProgression', ['fireEater','deathJuggler','strongman','artist','tamer']]
];
for (const [file, key, subclassKeys] of cases) {
  const sandbox = { window: {} };
  const source = fs.readFileSync(require.resolve('../app/data/classes/' + file), 'utf8');
  new vm.Script(source, { filename: file });
  vm.runInNewContext(source, sandbox, { filename: file });
  const data = sandbox.window[key];
  assert(data, file + ': progression export exists');
  assert.strictEqual(data.status, 'design_catalog_complete_engine_unconnected', file + ': must remain unconnected');
  assert.strictEqual(Object.keys(data.levels).length, 20, file + ': all 20 levels exist');
  for (let level = 1; level <= 20; level++) {
    assert(data.levels[level], file + ': level ' + level + ' exists');
    assert(Array.isArray(data.levels[level].features), file + ': level ' + level + ' has feature list');
  }
  for (const subclassKey of subclassKeys) {
    const subclass = data.archetypes?.[subclassKey] || data.subclasses?.[subclassKey] || data.specializations?.[subclassKey];
    assert(subclass, file + ': subclass/specialization ' + subclassKey + ' exists');
    assert(subclass.levels && Object.keys(subclass.levels).length >= 5, file + ': ' + subclassKey + ' has a full feature schedule');
    const featureCatalog = subclass.features || {};
    assert(Object.keys(featureCatalog).length >= 5, file + ': ' + subclassKey + ' has detailed feature descriptions');
    for (const [featureKey, feature] of Object.entries(featureCatalog)) {
      assert(feature.name && feature.effect, file + ': ' + subclassKey + '.' + featureKey + ' needs name and effect');
    }
    const detailedNames = new Set(Object.values(featureCatalog).map(feature => feature.name));
    for (const [level, scheduledNames] of Object.entries(subclass.levels)) {
      for (const featureName of scheduledNames) {
        assert(detailedNames.has(featureName), file + ': ' + subclassKey + ' level ' + level + ' schedules "' + featureName + '" without a matching detailed feature');
      }
    }
  }
  for (const [featureKey, feature] of Object.entries(data.features || {})) {
    assert(feature.name && (feature.effect || feature.rules), file + ': base feature ' + featureKey + ' needs an effect or explicit resource rules');
  }
  assert(!/ведущий подтверждает|TODO|TBD|уточнить/i.test(source), file + ': contains unresolved rules text');
  assert.strictEqual(data.integration.combatEngine, false, file + ': combat engine integration must remain disabled');
  assert.strictEqual(data.integration.characterCreation, false, file + ': character creation integration must remain disabled');
  assert.strictEqual(data.integration.ui, false, file + ': UI integration must remain disabled');

  if (file === 'Morehod.js') {
    const goldRule = data.features.goldModifier.effect;
    for (const requiredTerm of ['d20', 'характеристик', 'навыков', 'атак', 'спасброс', 'инициатив', 'концентрации', 'урона', 'хитов']) {
      assert(goldRule.toLowerCase().includes(requiredTerm), file + ': gold modifier must explicitly define scope/exclusion "' + requiredTerm + '"');
    }
  }
  if (file === 'Circus.js') {
    assert.strictEqual(data.resourceRules.circusResource.sharedAcrossSpecializations, true, file + ': all specializations share one resource');
    assert(data.specializations.deathJuggler.features.arsenal.effect.includes('инвентаря'), file + ': Death Juggler weapons must come from inventory');
    assert(data.specializations.tamer.features.firstPartner.effect.includes('отдельный блок характеристик'), file + ': companion needs a separate stat block');
    assert(data.specializations.tamer.features.menagerie.effect.includes('собственную инициативу'), file + ': companions need independent turns');
    assert(data.integration.notes.includes('только через сюжет'), file + ': companion replacement must be story-gated');
  }
  console.log('PASS ' + file + ': 20 levels, ' + subclassKeys.length + ' subclass catalogs, no engine/creation integration');
}
