#!/usr/bin/env python3
"""Atomic cross-platform version update, used by the one-click unified release."""
import argparse
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

def parse_version(s):
    m = re.fullmatch(r"(\d+)\.(\d+)\.(\d+)", s)
    if not m:
        raise ValueError("Expected numeric version MAJOR.MINOR.PATCH")
    a, b, c = map(int, m.groups())
    if not (1 <= a <= 200 and 0 <= b <= 99 and 0 <= c <= 999):
        raise ValueError("Version parts outside supported Android versionCode range")
    return a, b, c

def source_version():
    text = (ROOT / "android/app/build.gradle").read_text(encoding="utf-8")
    m = re.search(r"versionName\s+'(\d+\.\d+\.\d+)'", text)
    if not m:
        raise ValueError("Android versionName not found")
    return m.group(1)

def check():
    android = source_version()
    a,b,c = parse_version(android)
    gradle=(ROOT / "android/app/build.gradle").read_text(encoding="utf-8")
    code = re.search(r"versionCode\s+(\d+)", gradle)
    if not code or int(code.group(1)) != a*100000+b*1000+c:
        raise ValueError("Android versionCode does not match versionName")
    app=(ROOT / "app/update_manager_v2.js").read_text(encoding="utf-8")
    if not re.search(r"var APP_VERSION\s*=\s*['\"]"+re.escape(android)+r"['\"]",app):
        raise ValueError("Shared OTA APP_VERSION does not match Android version")
    package=json.loads((ROOT / "package.json").read_text(encoding="utf-8"))
    if parse_version(package["version"]) != (a,b,c):
        raise ValueError("Windows EXE version differs from Android")
    return android

def patch_exact(regex, replacement, content):
    next_content, count = re.subn(regex, lambda _:replacement, content, count=1)
    if count!=1:
        raise ValueError("Expected exactly one version marker matching "+regex)
    return next_content

def bump(target):
    current=source_version()
    a,b,c=parse_version(current)
    if target == "auto":
        if c==999:
            if b==99: raise ValueError("Version overflow: choose a new major version")
            b,c=b+1,0
        else: c+=1
        target=f"{a}.{b:02d}.{c:02d}"
    x,y,z=parse_version(target)
    if (x,y,z) <= parse_version(current):
        raise ValueError(f"New version must exceed {current}")
    gradle_path=ROOT/"android/app/build.gradle"
    app_path=ROOT/"app/update_manager_v2.js"
    pkg_path=ROOT/"package.json"
    gradle=gradle_path.read_text(encoding="utf-8")
    app=app_path.read_text(encoding="utf-8")
    pkg=json.loads(pkg_path.read_text(encoding="utf-8"))
    # Refuse partial updates when source versions diverged.
    check()
    gradle=patch_exact(r"versionCode\s+\d+",f"versionCode {x*100000+y*1000+z}",gradle)
    gradle=patch_exact(r"versionName\s+'[^']+'",f"versionName '{target}'",gradle)
    app=patch_exact(r"var APP_VERSION\s*=\s*['\"][^'\"]+['\"]",f"var APP_VERSION='{target}'",app)
    pkg["version"]=f"{x}.{y}.{z}"
    gradle_path.write_text(gradle,encoding="utf-8")
    app_path.write_text(app,encoding="utf-8")
    pkg_path.write_text(json.dumps(pkg,indent=2,ensure_ascii=False)+"\n",encoding="utf-8")
    check()
    return target

if __name__=="__main__":
    parser=argparse.ArgumentParser()
    parser.add_argument("--bump",metavar="VERSION",help="new numeric version or auto")
    args=parser.parse_args()
    print(bump(args.bump) if args.bump else check())