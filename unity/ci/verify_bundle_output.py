"""Verify a trusted Editor-produced bundle artifact before upload, not runtime QA."""
from pathlib import Path
import hashlib
import json
import os
root = Path('unity/Builds/Workshop/android-arm64')
manifest = root / 'manifest.json'
if not manifest.is_file():
    print('::warning::Android demo bundle was not produced. Only JSON packages can be tested; no bundle publication claimed.')
else:
    doc = json.loads(manifest.read_text())
    path = root / 'demo-markers.bundle'
    size = path.stat().st_size
    assert 0 < size <= 64 * 1024 * 1024
    assert doc['format'] == 'assetbundle' and doc['platform'] == 'android-arm64'
    assert doc['unityVersion'] == '6000.3.26f1'
    assert doc['bytes'] == size and doc['sha256'] == hashlib.sha256(path.read_bytes()).hexdigest()
    assert path.read_bytes().startswith(b'UnityFS\0')
    print('TRUSTED_ANDROID_BUNDLE_ARTIFACT_PASS', size, doc['sha256'], '(device load still requires QA)')
    if os.environ.get('GITHUB_OUTPUT'):
        with open(os.environ['GITHUB_OUTPUT'], 'a') as output:
            output.write('present=true\n')
