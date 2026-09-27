#!/usr/bin/env python3
"""Build a GitHub Pages/static-host update manifest from the current app tree.

Usage:
  python tools/build_update_manifest.py --base-url https://example.github.io/repo/updates/files --output /tmp/update.json

Only the deployable web application is included: index.html + app/**.
Tests, docs, tools and the local integrity manifest are intentionally excluded.
"""
from pathlib import Path
import argparse, hashlib, json, datetime

ROOT=Path(__file__).resolve().parents[1]

def sha256(path):
    h=hashlib.sha256()
    with path.open('rb') as f:
        for chunk in iter(lambda:f.read(1024*1024),b''):
            h.update(chunk)
    return h.hexdigest()

def main():
    ap=argparse.ArgumentParser()
    ap.add_argument('--base-url',required=True)
    ap.add_argument('--version',default='70.25.61')
    ap.add_argument('--min-app-version',default='70.25.61')
    ap.add_argument('--channel',default='stable',choices=['stable','beta'])
    ap.add_argument('--output',required=True)
    args=ap.parse_args()
    files=[]
    candidates=[ROOT/'index.html']+sorted((ROOT/'app').rglob('*'))
    for p in candidates:
        if not p.is_file() or p.name.endswith('.map'):
            continue
        rel=p.relative_to(ROOT).as_posix()
        files.append({'path':rel,'bytes':p.stat().st_size,'sha256':sha256(p)})
    manifest={
        'schema':1,
        'app':'DND_VTT',
        'version':args.version,
        'minAppVersion':args.min_app_version,
        'channel':args.channel,
        'generated':datetime.date.today().isoformat(),
        'baseUrl':args.base_url.rstrip('/'),
        'files':files,
        'blockedVersions':[]
    }
    out=Path(args.output); out.parent.mkdir(parents=True,exist_ok=True)
    out.write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print(f'wrote {out} ({len(files)} files)')

if __name__=='__main__': main()
