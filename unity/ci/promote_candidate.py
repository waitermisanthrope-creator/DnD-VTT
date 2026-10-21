"""Prepare a future owner-requested promotion; dry-run by default, never build here."""
import argparse
import importlib.util
import json
import os
from pathlib import Path
import re
import subprocess
import cloud_release as ci


def proven_run(run_id):
    ci.trusted()
    if not re.fullmatch(r'[0-9]+', run_id):
        raise ValueError('Run ID must be numeric')
    run = json.loads(subprocess.check_output(['gh','api',f'repos/{ci.REPO}/actions/runs/{run_id}']))
    if run['conclusion'] != 'success' or run['head_branch'] != 'experiment/unity-vtt' or run['path'] != '.github/workflows/unity-cloud-candidate.yml' or run['head_repository']['full_name'] != ci.REPO or run['event'] not in ('push','workflow_dispatch'):
        raise ValueError('Only a successful trusted dual-platform candidate run may be promoted')
    jobs = json.loads(subprocess.check_output(['gh','api',f'repos/{ci.REPO}/actions/runs/{run_id}/jobs?per_page=100']))['jobs']
    expected = {'Build and verify signed Android ARM64 APK', 'Build verified Windows x64 installer',
                'Install and upgrade from public 1.00.00 on isolated Windows runner'}
    legacy = {'Verify cloud signing key against public 1.00.00','Unity license preflight (not a build)',
              'Build both release packages on GitHub Linux runner','Install and upgrade from public 1.00.00 on isolated Windows runner'}
    passed = {j['name'] for j in jobs if j['conclusion'] == 'success'}
    if not (expected <= passed or legacy <= passed):
        raise ValueError('Required actual build/signature/installation jobs did not all succeed')
    return run


def candidate_manifest(folder, qa_path, run, version):
    folder = Path(folder)
    report = json.loads((folder/'candidate.json').read_text())
    qa = json.loads(Path(qa_path).read_text(encoding='utf-8-sig'))
    code = ci.version_code(version)
    if report['sourceCommit'] != run['head_sha'] or report['version'] != version or report['versionCode'] != code or report['signingCertificateSha256'] != ci.CERT or report['status'] != 'built-packaged-not-published':
        raise ValueError('Candidate provenance/version/signature mismatch')
    if qa['status'] != 'passed' or qa['source'] != run['head_sha'] or qa['candidate'] != version or str(qa['run']) != str(run['id']):
        raise ValueError('Windows QA does not belong to this candidate')
    for name in ['baselineInstall','installedPayloadHashes','upgrade','reinstall','isolatedProfileAndBackupPreserved','unknownFilePreserved','runtimeSmoke']:
        if qa.get(name) is not True:
            raise ValueError('Windows QA check missing: ' + name)
    artifacts, files = {}, []
    for platform in ['android','windows']:
        expected = f'DnD-VTT-Unity-{version}-arm64.apk' if platform == 'android' else f'DnD-VTT-Unity-Setup-{version}-x64.exe'
        item = report['artifacts'][platform]
        if item['name'] != expected:
            raise ValueError('Unexpected package name')
        path = folder/expected
        if path.stat().st_size != item['bytes'] or ci.sha(path) != item['sha256']:
            raise ValueError('Candidate binary size/hash mismatch')
        artifacts[platform] = dict(url=f'https://github.com/{ci.REPO}/releases/download/unity-v{version}/{expected}', bytes=item['bytes'],sha256=item['sha256'])
        files.append(path)
    ci.verify_apk(files[0], version, code)
    manifest = dict(schema=1,channel='unity-experiment',version=version,versionCode=code,androidPackage=ci.PACKAGE,
                    notes='Проверенное обновление Unity ' + version,artifacts=artifacts)
    previous = json.loads(Path('updates/unity-experiment.json').read_text())
    if code <= previous['versionCode']:
        raise ValueError('Only a newer, unpublished version may be promoted')
    return files, manifest


if __name__ == '__main__':
    p=argparse.ArgumentParser(); p.add_argument('stage',choices=['verify-run','promote'])
    p.add_argument('--run',required=True);p.add_argument('--folder');p.add_argument('--qa');p.add_argument('--version');p.add_argument('--publish',action='store_true')
    args=p.parse_args()
    run=proven_run(args.run)
    if args.stage=='verify-run': print('PROVEN_CLOUD_BUILD:',run['html_url'])
    else:
        files, manifest=candidate_manifest(args.folder,args.qa,run,args.version)
        if not args.publish: print('CLOUD_PROMOTION_DRY_RUN_PASS: provenance, both packages, Android metadata/signature and Windows upgrade QA verified; no publication/feed mutation')
        else:
            spec=importlib.util.spec_from_file_location('publisher',Path('.github/scripts/publish-unity-artifacts.py'))
            publisher=importlib.util.module_from_spec(spec);spec.loader.exec_module(publisher)
            publisher.publish_verified(files,manifest,ci.CERT,source_commit=run['head_sha'],build_run=run['html_url'])
