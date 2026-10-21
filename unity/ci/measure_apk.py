"""Measure the signed APK itself; Unity BuildReport totalSize can include symbols."""
import argparse
import hashlib
import json
from pathlib import Path
import zipfile
import io
from PIL import Image

parser = argparse.ArgumentParser()
parser.add_argument('--apk', type=Path, required=True)
parser.add_argument('--objects', type=Path, required=True)
parser.add_argument('--report', type=Path, required=True)
parser.add_argument('--max-prop-texture', type=int)
parser.add_argument('--minimal-content', action='store_true')
args = parser.parse_args()
root = Path(__file__).resolve().parents[2]
objects = json.loads(args.objects.read_text())
digest = hashlib.sha256(args.apk.read_bytes()).hexdigest()
assert objects['apkSha256'] == digest, 'Object inventory is for a different APK'
props = [item for item in objects['objects'] if item['type'] == 'Texture2D' and item.get('name', '').startswith('T_Trim_')]
if args.minimal_content:
    assert not props, 'Optional prop textures leaked into APK'
    optional_names = ('floor_', 'wall_', '3d_', 'T_Trim_')
    assert not any(item.get('name','').startswith(optional_names) for item in objects['objects'] if item['type'] in ('Texture2D','TextAsset','Material')), 'Optional map content leaked into APK'
    assert not any(item.get('isMapDocument') for item in objects['objects']), 'Map JSON is bundled in APK'
    catalogs = [item['creationIds'] for item in objects['objects'] if 'creationIds' in item]
    assert len(catalogs) == 1, 'Expected one actual serialized character catalog'
    catalog = catalogs[0]
    assert len(catalog['races']) == 15 and len(catalog['classes']) == 12, 'APK must contain only the PHB baseline'
    assert not {'tortle','aasimar'}.intersection(catalog['races'])
    assert not {'artificer','blood_hunter','alchemist','witch','occultist'}.intersection(catalog['classes'])
    expected = json.loads((root/'unity/Assets/Vtt/Resources/CharacterSheet/catalog.json').read_text())['creation']
    assert catalog == {key:[row.get('id') for row in expected[key]] for key in ('races','classes','feats')}, 'APK catalog differs from reviewed baseline' 
if args.max_prop_texture:
    assert len(props) == 12, 'Missing mandatory prop textures'
    assert all(max(item['width'], item['height']) <= args.max_prop_texture for item in props), 'Android texture import cap not applied'
with zipfile.ZipFile(args.apk) as archive:
    assert archive.testzip() is None
    entries = archive.infolist()
    def png_chunks(data):
        result=[];position=8
        assert data[:8] == b'\x89PNG\r\n\x1a\n'
        while position < len(data):
            size=int.from_bytes(data[position:position+4], 'big')+12
            assert size >= 12 and position+size <= len(data)
            result.append((data[position+4:position+8],data[position:position+size]));position+=size
        assert result[-1][0] == b'IEND'
        return result
    removed_art_bytes=0
    for name in ('Dragon20.png', 'Splash19.png', 'Wallpaper16.jpg'):
        packaged=archive.read('assets/Branding/' + name)
        original=(root/'unity/Assets/Vtt/Resources/Branding'/name).read_bytes()
        if name == 'Splash19.png':
            original_chunks=png_chunks(original);packaged_chunks=png_chunks(packaged)
            assert packaged_chunks == [(kind,chunk) for kind,chunk in original_chunks if kind != b'caBX'], 'Rendered PNG chunks or attribution changed'
            source_image=Image.open(io.BytesIO(original));packaged_image=Image.open(io.BytesIO(packaged))
            assert source_image.mode==packaged_image.mode and source_image.size==packaged_image.size and source_image.tobytes()==packaged_image.tobytes(), 'Artwork pixels changed'
            removed_art_bytes=len(original)-len(packaged)
            assert removed_art_bytes == 6854025
        else:
            assert packaged == original, 'Original packaged artwork changed' 
    compressed = lambda prefix: sum(item.compress_size for item in entries if item.filename.startswith(prefix))
    old = 58430834
    result = dict(apkBytes=args.apk.stat().st_size, apkSha256=digest,
                  oldUnity10005ApkBytes=old, reductionBytes=old-args.apk.stat().st_size,
                  reductionPercent=round((old-args.apk.stat().st_size)*100/old, 3),
                  zipCompressedUnityDataBytes=compressed('assets/bin/Data/'),
                  zipCompressedBrandingBytes=compressed('assets/Branding/'),
                  zipCompressedNativeBytes=compressed('lib/'),
                  propTextureCount=len(props), propTextureDimensions={item['name']:[item['width'], item['height']] for item in props},
                  originalBrandingBytesVerified=False,
                  originalBrandingPixelsVerified=True,
                  omittedNonRenderingPngBytes=removed_art_bytes,
                  minimalContentVerified=args.minimal_content,
                  bundledCreationIds=catalog if args.minimal_content else None,
                  deviceQa=False,
                  note='Signed APK file size; ZIP groups include engine/metadata as indicated by path, not only gameplay content.')
args.report.write_text(json.dumps(result, indent=2)+'\n')
print('SIGNED_APK_MEASURED', json.dumps(result, separators=(',', ':')))
