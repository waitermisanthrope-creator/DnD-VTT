'use strict';
// Check the delivered Unity payload against live WebView data, not a second hand-written preset.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const project = 'unity/CharacterStudio';
const resources = project + '/Assets/CharacterStudio/Resources/CharacterStudio/';
const source = 'app/assets/3d/makehuman/';
const read = p => fs.readFileSync(p);
const json = p => JSON.parse(read(p));
const hash = p => crypto.createHash('sha256').update(read(p)).digest('hex');
const catalog = json(resources + 'MorphCatalog.json');
assert.equal(catalog.sourceGlbSha256, hash(source + 'human-body-morphs.glb'));
assert.equal(catalog.sourceSparseSha256, hash(source + 'editor-morphs.bin'));
assert.equal(catalog.fbxSha256, hash(resources + 'HumanBody.fbx'));
assert.equal(read(resources + 'HumanBody.fbx').subarray(0, 21).toString(), 'Kaydara FBX Binary  \0');
const glb = read(source + 'human-body-morphs.glb');
const gltf = JSON.parse(glb.subarray(20, 20 + glb.readUInt32LE(12)));
const extra = json(source + 'editor-morphs.json');
assert.deepEqual(catalog.channels, { ...gltf.extras.dndMorphChannels, ...extra.channels });
assert.deepEqual(catalog.morphNames, [...gltf.meshes[0].extras.targetNames, ...extra.targets.map(t => t.name)]);
assert.equal(catalog.bones, gltf.skins[0].joints.length);
assert.equal(catalog.triangles, gltf.accessors[gltf.meshes[0].primitives[0].indices].count / 3);
assert.equal(catalog.morphNames.length, 23);
assert.equal(new Set(catalog.morphNames).size, 23);
for (const rule of Object.values(catalog.channels)) {
  assert(catalog.morphNames.includes(rule.positive));
  assert(catalog.morphNames.includes(rule.negative));
}
const context = { window: {}, console };
vm.createContext(context);
for (const name of ['character_clothing', 'character_system'])
  vm.runInContext(read('app/3dmap/' + name + '.js').toString(), context);
for (const gender of ['male', 'female']) {
  const suffix = gender === 'male' ? 'Male' : 'Female';
  const expected = context.window.DNDCharacter3D.createCharacter({ id: 'unity-human-preview', raceId: 'human', gender });
  assert.deepEqual(json(resources + 'Default' + suffix + '.json'), JSON.parse(JSON.stringify(expected)));
  assert.equal(hash(resources + 'Skin' + suffix + '.png'), hash(source + 'skins/young_caucasian_' + gender + '/young_lightskinned_' + gender + '_diffuse.png'));
}
const guids = new Map();
function walk(folder) {
  for (const entry of fs.readdirSync(folder, { withFileTypes: true })) {
    const file = path.join(folder, entry.name);
    if (entry.name.endsWith('.meta')) continue;
    const meta = read(file + '.meta').toString();
    const guid = /^guid: ([a-f0-9]{32})$/m.exec(meta)?.[1];
    assert(guid, 'Missing GUID: ' + file);
    assert(!guids.has(guid), 'Duplicate GUID: ' + file);
    guids.set(guid, file);
    if (entry.isDirectory()) walk(file);
  }
}
walk(project + '/Assets');
const scene = read(project + '/Assets/CharacterStudio/Scenes/CharacterStudio.unity').toString();
const scriptGuid = /m_Script: \{fileID: 11500000, guid: ([a-f0-9]{32})/.exec(scene)?.[1];
assert.equal(guids.get(scriptGuid), project + '/Assets/CharacterStudio/Runtime/CharacterStudio.cs');
console.log('UNITY_CHARACTER_ASSET_CONTRACT_OK: source hashes, FBX, 23 morphs, channels, both live presets, unchanged skins, GUIDs and scene reference');
