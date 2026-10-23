"""Source/asset bridge contract; actual rendering is gated in CharacterPreviewValidation."""
import hashlib,json,struct
from pathlib import Path
root=Path(__file__).resolve().parents[2]
assets=root/'unity/Assets/Vtt/Resources/CharacterStudio'
source=root/'app/assets/3d/makehuman'
def digest(p):return hashlib.sha256(p.read_bytes()).hexdigest()
meta=json.loads((assets/'MorphCatalog.json').read_text())
assert meta['sourceGlbSha256']==digest(source/'human-body-morphs.glb')
assert meta['sourceSparseSha256']==digest(source/'editor-morphs.bin')
assert meta['fbxSha256']==digest(assets/'HumanBody.fbx')
assert meta['bones']==53 and meta['triangles']==107024 and len(set(meta['morphNames']))==23
assert meta['maxCoordinateRoundTripError']<.0001
for gender,suffix in [('male','Male'),('female','Female')]:
 assert digest(assets/f'Skin{suffix}.png')==digest(source/f'skins/young_caucasian_{gender}/young_lightskinned_{gender}_diffuse.png')
 preset=json.loads((assets/f'Default{suffix}.json').read_text());assert preset['schemaVersion']==2 and preset['gender']==gender and preset['raceId']=='human'
for rule in meta['channels'].values():
 assert rule['positive'] in meta['morphNames'] and rule['negative'] in meta['morphNames']
print('UNITY_CHARACTER_PREVIEW_SOURCE_CONTRACT_PASS: source hashes, 23 morphs, two skins/presets and bounded FBX round-trip error')
