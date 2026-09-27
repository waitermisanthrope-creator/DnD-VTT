#!/usr/bin/env python3
"""Build a static DnD VTT update manifest.

Only index.html and app/** are deployable application payload.
Large media packs are intentionally outside this lightweight update bundle.
"""
import argparse, hashlib, json, pathlib
from datetime import datetime, timezone

def sha256(path):
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()

def main():
    p = argparse.ArgumentParser()
    p.add_argument("--root", default=".")
    p.add_argument("--base-url", required=True)
    p.add_argument("--output", required=True)
    p.add_argument("--version", default="70.25.61")
    p.add_argument("--channel", default="stable")
    args = p.parse_args()
    root = pathlib.Path(args.root).resolve()
    paths = [root / "index.html"] + sorted((root / "app").rglob("*"))
    files = []
    for path in paths:
        if not path.is_file():
            continue
        rel = path.relative_to(root).as_posix()
        data = path.read_bytes()
        files.append({"path": rel, "bytes": len(data), "sha256": sha256(path)})
    manifest = {
        "schema": 1,
        "app": "DnD-VTT",
        "version": args.version,
        "minAppVersion": "70.25.61",
        "channel": args.channel,
        "generated": datetime.now(timezone.utc).isoformat(),
        "baseUrl": args.base_url.rstrip("/") + "/",
        "files": files,
        "blockedVersions": [],
    }
    pathlib.Path(args.output).write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

if __name__ == "__main__":
    main()
