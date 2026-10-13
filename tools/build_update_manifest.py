#!/usr/bin/env python3
"""Build a GitHub Pages/static-host update manifest from the current app tree.

Usage:
  python tools/build_update_manifest.py --base-url https://example.github.io/repo/updates/files --output /tmp/update.json

Only the deployable web application and wallpaper assets are included: index.html + app/** + wallpapers/**.
Tests, docs, tools and the local integrity manifest are intentionally excluded.
"""
from pathlib import Path
import argparse, hashlib, json, datetime

ROOT=Path(__file__).resolve().parents[1]

def app_version_from_source():
    p=ROOT/'app/update_manager.js'
    try:
        text=p.read_text(encoding='utf-8')
        import re
        m=re.search(r"APP_VERSION\s*=\s*['\"]([^'\"]+)['\"]",text)
        return m.group(1) if m else None
    except OSError:
        return None

def sha256(path):
    h=hashlib.sha256()
    with path.open('rb') as f:
        for chunk in iter(lambda:f.read(1024*1024),b''):
            h.update(chunk)
    return h.hexdigest()

def main():
    ap=argparse.ArgumentParser()
    ap.add_argument('--base-url',required=True)
    ap.add_argument('--version',default='70.25.66')
    ap.add_argument('--min-app-version',default='70.25.63')
    ap.add_argument('--channel',default='stable',choices=['stable','beta'])
    ap.add_argument('--output',required=True)
    args=ap.parse_args()
    detected=app_version_from_source()
    version=args.version
    if detected:
        def parts(v):
            return tuple(int(x) if x.isdigit() else 0 for x in v.lstrip('v').split('.'))
        if parts(detected)>parts(version):
            version=detected
            print(f'using APP_VERSION from app/update_manager.js: {version}')
    from urllib.parse import quote
    files=[]
    # (source file, destination path, explicit URL for destination aliases)
    candidates=[(ROOT/'index.html','index.html',None)]
    candidates += [(p,p.relative_to(ROOT).as_posix(),None) for p in sorted((ROOT/'app').rglob('*'))]
    if (ROOT/'wallpapers').exists():
        candidates += [(p,p.relative_to(ROOT).as_posix(),None) for p in sorted((ROOT/'wallpapers').rglob('*'))]
    if (ROOT/'ambience').exists():
        candidates += [(p,p.relative_to(ROOT).as_posix(),None) for p in sorted((ROOT/'ambience').rglob('*'))]
    # The APK copies root assets into its webroot; full OTA replacements must
    # also include them. Legacy root PNGs serve as wallpapers and root MP3s
    # are mounted under ambience/. Pinned raw GitHub URLs refer to root files.
    for p in sorted(ROOT.iterdir()):
        if not p.is_file(): continue
        ext=p.suffix.lower()
        root_url=args.base_url.rstrip('/')+'/'+quote(p.name)
        if ext in {'.png','.jpg','.jpeg','.svg','.glb','.gltf','.bin','.webp'}:
            candidates.append((p,p.name,None))
        if ext in {'.png','.jpg','.jpeg','.svg'}:
            candidates.append((p,'wallpapers/'+p.name,root_url))
        if ext in {'.mp3','.wav','.ogg'}:
            candidates.append((p,'ambience/'+p.name,root_url))
    seen=set()
    for p, rel, url in candidates:
        if not p.is_file() or p.name.endswith('.map') or rel in seen:
            continue
        seen.add(rel)
        entry={'path':rel,'bytes':p.stat().st_size,'sha256':sha256(p)}
        if url: entry['url']=url
        files.append(entry)
    manifest={
        'schema':1,
        'app':'DND_VTT',
        'version':version,
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
