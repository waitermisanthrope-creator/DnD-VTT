"""Read-only inventory of serialized objects in a real Unity APK.

Requires UnityPy. Does not decode/rewrite textures, change the APK, or extract
native libraries. Split Unity player data files are joined by UnityPy.
"""
import argparse
import collections
import hashlib
import json
from pathlib import Path, PurePosixPath
import tempfile
import zipfile
import UnityPy

parser = argparse.ArgumentParser()
parser.add_argument('--apk', type=Path, required=True)
parser.add_argument('--output', type=Path, required=True)
args = parser.parse_args()
with tempfile.TemporaryDirectory(prefix='dnd-vtt-apk-audit-') as folder:
    root = Path(folder)
    with zipfile.ZipFile(args.apk) as archive:
        for entry in archive.infolist():
            prefix = 'assets/bin/Data/'
            if not entry.filename.startswith(prefix) or entry.is_dir():
                continue
            name = PurePosixPath(entry.filename[len(prefix):])
            if name.is_absolute() or '..' in name.parts:
                raise ValueError('Unsafe archive path')
            path = root.joinpath(*name.parts)
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_bytes(archive.read(entry))
    environment = UnityPy.load(str(root))
    counts = collections.Counter()
    objects = []
    for obj in environment.objects:
        kind = obj.type.name
        counts[kind] += 1
        if kind not in {'Texture2D', 'TextAsset', 'Mesh', 'Material', 'AudioClip', 'GameObject'}:
            continue
        record = dict(type=kind, pathId=obj.path_id, serializedBytes=obj.byte_size)
        try:
            data = obj.read()
            record['name'] = getattr(data, 'm_Name', '')
            if kind == 'TextAsset':
                raw = getattr(data, 'm_Script', '')
                try:
                    document = json.loads(raw)
                except (ValueError, TypeError, UnicodeError):
                    document = None
                if isinstance(document, dict):
                    record['isMapDocument'] = document.get('version') == 2 and isinstance(document.get('floors'), list)
                    if isinstance(document.get('creation'), dict):
                        creation = document['creation']
                        record['creationIds'] = {key: [row.get('id') for row in creation.get(key, [])] for key in ('races', 'classes', 'feats')}
                        record['baseline'] = document.get('baseline')
            if kind == 'Texture2D':
                record.update(width=data.m_Width, height=data.m_Height, textureFormat=data.m_TextureFormat)
        except Exception as error:
            record['error'] = str(error)
        objects.append(record)
    result = dict(apkBytes=args.apk.stat().st_size,
                  apkSha256=hashlib.sha256(args.apk.read_bytes()).hexdigest(),
                  unityPyVersion=getattr(UnityPy, '__version__', 'unknown'),
                  typeCounts=dict(counts), objects=objects,
                  note='Serialized objects, not proof all are active. Serialized bytes are not APK compressed sizes. Source paths need Unity BuildReport.')
    args.output.write_text(json.dumps(result, ensure_ascii=False, indent=2) + '\n')
    print('UNITY_APK_OBJECT_INVENTORY_PASS', dict(counts))
