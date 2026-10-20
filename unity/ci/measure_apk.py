"""Measure the signed APK itself; Unity BuildReport totalSize can include symbols."""
import argparse
import hashlib
import json
from pathlib import Path
import zipfile

parser = argparse.ArgumentParser()
parser.add_argument('--apk', type=Path, required=True)
parser.add_argument('--objects', type=Path, required=True)
parser.add_argument('--report', type=Path, required=True)
parser.add_argument('--max-prop-texture', type=int)
args = parser.parse_args()
root = Path(__file__).resolve().parents[2]
objects = json.loads(args.objects.read_text())
digest = hashlib.sha256(args.apk.read_bytes()).hexdigest()
assert objects['apkSha256'] == digest, 'Object inventory is for a different APK'
props = [item for item in objects['objects'] if item['type'] == 'Texture2D' and item.get('name', '').startswith('T_Trim_')]
if args.max_prop_texture:
    assert len(props) == 12, 'Missing mandatory prop textures'
    assert all(max(item['width'], item['height']) <= args.max_prop_texture for item in props), 'Android texture import cap not applied'
with zipfile.ZipFile(args.apk) as archive:
    assert archive.testzip() is None
    entries = archive.infolist()
    for name in ('Dragon20.png', 'Splash19.png', 'Wallpaper16.jpg'):
        assert archive.read('assets/Branding/' + name) == (root/'unity/Assets/Vtt/Resources/Branding'/name).read_bytes(), 'Original packaged artwork changed'
    compressed = lambda prefix: sum(item.compress_size for item in entries if item.filename.startswith(prefix))
    old = 58430834
    result = dict(apkBytes=args.apk.stat().st_size, apkSha256=digest,
                  oldUnity10005ApkBytes=old, reductionBytes=old-args.apk.stat().st_size,
                  reductionPercent=round((old-args.apk.stat().st_size)*100/old, 3),
                  zipCompressedUnityDataBytes=compressed('assets/bin/Data/'),
                  zipCompressedBrandingBytes=compressed('assets/Branding/'),
                  zipCompressedNativeBytes=compressed('lib/'),
                  propTextureCount=len(props), propTextureDimensions={item['name']:[item['width'], item['height']] for item in props},
                  originalBrandingBytesVerified=True,
                  deviceQa=False,
                  note='Signed APK file size; ZIP groups include engine/metadata as indicated by path, not only gameplay content.')
args.report.write_text(json.dumps(result, indent=2)+'\n')
print('SIGNED_APK_MEASURED', json.dumps(result, separators=(',', ':')))
