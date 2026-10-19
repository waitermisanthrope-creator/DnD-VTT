"""Isolated CI adapter for existing UnityReleaseBuild + release.ps1. No publishing.

Only encrypted candidate archives may leave a public runner. Signing material is
decoded in RUNNER_TEMP, checked against the 1.00.00 certificate and always removed.
"""
import argparse
import base64
import hashlib
import json
import os
from pathlib import Path
import re
import subprocess
import tempfile
import zipfile

REPO = 'waitermisanthrope-creator/DnD-VTT'
BRANCH = 'refs/heads/experiment/unity-vtt'
CERT = 'c1c1b3e6537f10819a3042817ac91535b47754ed65d084e635f84ff2b1f44c8e'
PACKAGE = 'com.dndvtt.unity'
PUBLISHED_APK_SHA = '21299f36b6a23ee79e41dc754f133c92f51bdf42faf8e41f11a05fbb5796fd2e'


def trusted():
    if os.environ.get('GITHUB_REF') != BRANCH or os.environ.get('GITHUB_REPOSITORY') != REPO or os.environ.get('GITHUB_EVENT_NAME') not in ('push', 'workflow_dispatch'):
        raise ValueError('Only trusted experimental branch runs may access release material')


def run(args, capture=False):
    return subprocess.check_output(list(map(str, args)), stderr=subprocess.PIPE) if capture else subprocess.check_call(list(map(str, args)))


def sdk_tool(name):
    root = Path(os.environ['ANDROID_HOME']) / 'build-tools' / '36.0.0'
    path = root / (name + ('.bat' if name == 'apksigner' else '.exe') if os.name == 'nt' else name)
    if not path.is_file():
        raise ValueError('Required Android build-tools 36.0.0 missing: ' + name)
    return path


def sha(path):
    with Path(path).open('rb') as stream:
        return hashlib.file_digest(stream, 'sha256').hexdigest()


def version_code(value):
    if not re.fullmatch(r'[1-9][0-9]{0,3}\.[0-9]{2}\.[0-9]{2}', value):
        raise ValueError('Use version such as 1.00.01')
    a, b, c = map(int, value.split('.'))
    return a * 10000 + b * 100 + c


def metadata():
    source = Path('unity/Assets/Vtt/Runtime/UnityRelease.cs').read_text()
    version = re.search(r'const string Version = "([0-9.]+)"', source)[1]
    code = int(re.search(r'const int Code = ([0-9]+)', source)[1])
    if code != version_code(version):
        raise ValueError('Version/code mismatch')
    return version, code, Path('unity/Builds/Unity-' + version)


def prepare(version):
    trusted()
    code = version_code(version)
    feed = json.loads(Path('updates/unity-experiment.json').read_text())
    if code <= feed['versionCode']:
        raise ValueError('Candidate must be newer than public 1.00.00; never rebuild a published version')
    settings = Path('unity/ProjectSettings/ProjectSettings.asset').read_text()
    for identity in ('companyName: DnDVttExperiment', 'productName: DnD VTT Unity Prototype'):
        if identity not in settings:
            raise ValueError('Save identity changed')
    if '6000.3.26f1' not in Path('unity/ProjectSettings/ProjectVersion.txt').read_text():
        raise ValueError('Unexpected editor version')
    if not Path('unity/Assets/Vtt/Scenes/ImportedAdventure.unity').is_file():
        raise ValueError('Working scene missing')
    path = Path('unity/Assets/Vtt/Runtime/UnityRelease.cs')
    source = path.read_text()
    source, n = re.subn(r'const string Version = "[0-9.]+"', 'const string Version = "' + version + '"', source)
    source, m = re.subn(r'const int Code = [0-9]+', 'const int Code = ' + str(code), source)
    if n != 1 or m != 1:
        raise ValueError('Release constants missing or ambiguous')
    path.write_text(source)
    print('CI_CANDIDATE_VERSION:', version, code)


def verify_apk(path, version, code):
    text = run([sdk_tool('apksigner'), 'verify', '--verbose', '--print-certs', path], True).decode()
    if 'certificate SHA-256 digest: ' + CERT not in text:
        raise ValueError('APK certificate differs from installed 1.00.00')
    badging = run([sdk_tool('aapt'), 'dump', 'badging', path], True).decode()
    for expected in ("name='" + PACKAGE + "'", "versionCode='" + str(code) + "'", "versionName='" + version + "'", "native-code: 'arm64-v8a'", "sdkVersion:'26'", "targetSdkVersion:'36'"):
        if expected not in badging:
            raise ValueError('APK metadata mismatch: ' + expected)
    run([sdk_tool('zipalign'), '-c', '-P', '16', '4', path])


def with_keystore(action):
    trusted()
    # No key generation path. Original encrypted local files are never involved.
    with tempfile.TemporaryDirectory(prefix='unity-sign-', dir=os.environ['RUNNER_TEMP']) as folder:
        store = Path(folder) / 'release.p12'
        try:
            store.write_bytes(base64.b64decode(os.environ['UNITY_ANDROID_KEYSTORE_BASE64'], validate=True))
            store.chmod(0o600)
            cert = run(['keytool', '-exportcert', '-alias', 'unity-release', '-keystore', store,
                        '-storepass:env', 'UNITY_ANDROID_KEYSTORE_PASSWORD'], True)
            if hashlib.sha256(cert).hexdigest() != CERT:
                raise ValueError('CI key/password did not open the pinned release certificate')
            action(store)
        finally:
            store.unlink(missing_ok=True)
    print('CI_KEY_TEMP_CLEANUP_PASS')


def check_key():
    def check(store):
        with tempfile.TemporaryDirectory(prefix='unity-public-', dir=os.environ['RUNNER_TEMP']) as folder:
            apk = Path(folder) / 'published.apk'
            url = 'https://github.com/' + REPO + '/releases/download/unity-v1.00.00/DnD-VTT-Unity-1.00.00-arm64.apk'
            run(['curl', '--fail', '--location', '--retry', '3', '--silent', '--show-error', url, '-o', apk])
            if sha(apk) != PUBLISHED_APK_SHA:
                raise ValueError('Published 1.00.00 bytes differ from delivery record')
            verify_apk(apk, '1.00.00', 10000)
            # Exercise the private key and key password, not only certificate export.
            # This is a throwaway re-sign of existing public bytes, NOT a Unity build.
            probe = Path(folder) / 'signing-probe.apk'
            run([sdk_tool('apksigner'), 'sign', '--ks', store, '--ks-key-alias', 'unity-release',
                 '--ks-pass', 'env:UNITY_ANDROID_KEYSTORE_PASSWORD', '--key-pass', 'env:UNITY_ANDROID_KEYSTORE_PASSWORD', '--out', probe, apk])
            verify_apk(probe, '1.00.00', 10000)
        print('CLOUD_SIGNING_KEY_PASS:', CERT, '(CI store/key passwords usable; public APK matched; disposable private-key signing probe verified; NOT a Unity build)')
    with_keystore(check)


def check_license():
    trusted()
    # GameCI CLI v0.1.72 resolves email+password without serial/file to Personal
    # and activates a fresh seat on the runner through Unity Licensing Client.
    required = ['UNITY_EMAIL', 'UNITY_PASSWORD']
    missing = [name for name in required if not os.environ.get(name)]
    if missing:
        raise ValueError('Unity CI credentials missing: ' + ', '.join(missing) + '. Configure these Environment Secrets for runner-side Personal activation; do not copy local Unity auth.')
    method = 'serial' if os.environ.get('UNITY_SERIAL') else 'personal'
    print('LICENSE_CONFIGURATION_PRESENT:', method, '(activation is NOT verified until Unity build succeeds)')


def sign():
    version, code, root = metadata()
    out = root / 'distribution'
    out.mkdir(parents=True, exist_ok=True)
    apk = out / ('DnD-VTT-Unity-' + version + '-arm64.apk')
    def apply(store):
        aligned = root / 'android-aligned.apk'
        run([sdk_tool('zipalign'), '-P', '16', '-f', '4', root / 'android-intermediate.apk', aligned])
        run([sdk_tool('apksigner'), 'sign', '--ks', store, '--ks-key-alias', 'unity-release',
             '--ks-pass', 'env:UNITY_ANDROID_KEYSTORE_PASSWORD', '--key-pass', 'env:UNITY_ANDROID_KEYSTORE_PASSWORD', '--out', apk, aligned])
        verify_apk(apk, version, code)
    with_keystore(apply)


def candidate():
    trusted()
    version, code, root = metadata()
    out = root / 'distribution'
    artifacts = {}
    for platform, name in [('android', f'DnD-VTT-Unity-{version}-arm64.apk'), ('windows', f'DnD-VTT-Unity-Setup-{version}-x64.exe')]:
        path = out / name
        if not path.is_file() or path.stat().st_size < 1024:
            raise ValueError('Candidate package missing: ' + name)
        artifacts[platform] = dict(name=name, bytes=path.stat().st_size, sha256=sha(path))
    payload = {}
    for path in sorted((root / 'windows').rglob('*')):
        if path.is_file() and not any('DoNotShip' in p or 'BackUpThisFolder' in p for p in path.parts):
            payload[path.relative_to(root / 'windows').as_posix()] = sha(path)
    if not {'DndVtt.exe', 'DndVtt_Data/Managed/Assembly-CSharp.dll'} <= payload.keys():
        raise ValueError('Windows Mono player payload incomplete')
    report = dict(schema=1, status='built-packaged-not-published', version=version, versionCode=code,
                  sourceCommit=os.environ['GITHUB_SHA'], signingCertificateSha256=CERT, artifacts=artifacts,
                  windowsFiles=payload, physicalAndroidQa=False)
    (out / 'candidate.json').write_text(json.dumps(report, indent=2) + '\n')
    (out / 'SHA256SUMS.txt').write_text(''.join(a['sha256'] + '  ' + a['name'] + '\n' for a in artifacts.values()))
    print('CI_CANDIDATE_PACKAGES_PASS:', version, json.dumps(artifacts))



def android_candidate():
    """Build an authenticated, unpublished Android-only candidate.

    Keep the old two-platform candidate() for future Windows work.
    Never change the update feed from this stage.
    """
    trusted()
    version, code, root = metadata()
    out = root / 'distribution'
    name = f'DnD-VTT-Unity-{version}-arm64.apk'
    apk = out / name
    if not apk.is_file() or apk.stat().st_size < 1024:
        raise ValueError('Android candidate APK missing')
    verify_apk(apk, version, code)
    artifacts = {'android': dict(name=name, bytes=apk.stat().st_size, sha256=sha(apk))}
    report = dict(schema=1, status='built-android-not-published', version=version,
                  versionCode=code, sourceCommit=os.environ['GITHUB_SHA'],
                  signingCertificateSha256=CERT, artifacts=artifacts,
                  physicalAndroidQa=False)
    (out / 'candidate.json').write_text(json.dumps(report, indent=2) + '\n')
    (out / 'SHA256SUMS.txt').write_text(artifacts['android']['sha256'] + '  ' + name + '\n')
    print('CI_ANDROID_CANDIDATE_PASS:', version, artifacts['android']['sha256'])


def encryption_key(salt):
    password = os.environ['UNITY_CI_ARTIFACT_PASSWORD']
    if len(password) < 40:
        raise ValueError('Artifact encryption secret missing/too short')
    return hashlib.pbkdf2_hmac('sha256', password.encode(), salt, 200000, dklen=32)


def seal():
    from cryptography.hazmat.primitives.ciphers.aead import AESGCM
    trusted()
    _, _, root = metadata()
    out = root / 'distribution'
    # Explicit allowlist: no key, password, Unity auth, logs, cache or source archive.
    names = [a['name'] for a in json.loads((out / 'candidate.json').read_text())['artifacts'].values()] + ['candidate.json', 'SHA256SUMS.txt']
    destination = Path(os.environ['RUNNER_TEMP']) / 'unity-encrypted'
    destination.mkdir(exist_ok=True)
    with tempfile.TemporaryDirectory(prefix='unity-envelope-', dir=os.environ['RUNNER_TEMP']) as folder:
        archive = Path(folder) / 'candidate.zip'
        with zipfile.ZipFile(archive, 'w', zipfile.ZIP_STORED) as target:
            for name in names:
                if Path(name).name != name:
                    raise ValueError('Unsafe archive path')
                target.write(out / name, name)
        encrypted = destination / 'candidate.zip.enc'
        salt, nonce = os.urandom(16), os.urandom(12)
        header = b'VTT1' + salt + nonce
        encrypted.write_bytes(header + AESGCM(encryption_key(salt)).encrypt(nonce, archive.read_bytes(), header))
    print('CI_ENCRYPTED_ARTIFACT_READY (no plaintext packages uploaded)')


def unseal(source, destination):
    from cryptography.hazmat.primitives.ciphers.aead import AESGCM
    from cryptography.exceptions import InvalidTag
    trusted()
    source, destination = Path(source), Path(destination)
    if destination.exists():
        raise ValueError('Decrypt only into a new isolated directory')
    encrypted = source / 'candidate.zip.enc'
    data = encrypted.read_bytes()
    if len(data) < 48 or data[:4] != b'VTT1':
        raise ValueError('Encrypted candidate authentication failed')
    try:
        plaintext = AESGCM(encryption_key(data[4:20])).decrypt(data[20:32], data[32:], data[:32])
    except InvalidTag:
        raise ValueError('Encrypted candidate authentication failed') from None
    with tempfile.TemporaryDirectory(prefix='unity-decrypt-', dir=os.environ['RUNNER_TEMP']) as folder:
        archive = Path(folder) / 'candidate.zip'
        archive.write_bytes(plaintext)
        with zipfile.ZipFile(archive) as candidate_zip:
            for name in candidate_zip.namelist():
                if Path(name).name != name or '\\' in name:
                    raise ValueError('Unsafe candidate archive')
            destination.mkdir()
            candidate_zip.extractall(destination)
    report = json.loads((destination / 'candidate.json').read_text())
    for entry in report['artifacts'].values():
        path = destination / entry['name']
        if Path(entry['name']).name != entry['name'] or sha(path) != entry['sha256'] or path.stat().st_size != entry['bytes']:
            raise ValueError('Decrypted package hash/size mismatch')


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('stage', choices=['check-key', 'check-license', 'prepare', 'sign', 'candidate', 'android-candidate', 'seal', 'unseal'])
    parser.add_argument('--version', default='1.00.01')
    parser.add_argument('--source')
    parser.add_argument('--destination')
    args = parser.parse_args()
    try:
        if args.stage == 'prepare': prepare(args.version)
        elif args.stage == 'unseal': unseal(args.source, args.destination)
        else: {'check-key': check_key, 'check-license': check_license, 'sign': sign, 'candidate': candidate, 'android-candidate': android_candidate, 'seal': seal}[args.stage]()
    except subprocess.CalledProcessError:
        raise SystemExit('CI external command failed; secret-bearing output suppressed')
    except (ValueError, KeyError) as error:
        raise SystemExit(str(error))
