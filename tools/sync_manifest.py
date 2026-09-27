from pathlib import Path
import hashlib, json, datetime

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "VTT_PROJECT_MANIFEST_V70.json"
RUNTIME_MANIFEST = ROOT / "app" / "vtt_project_manifest_v70.js"
VERSION = "70.25.61"
GENERATED = datetime.date.today().isoformat()

EXCLUDE_DIRS={".git","__pycache__"}
MANIFEST_PATHS={"VTT_PROJECT_MANIFEST_V70.json","app/vtt_project_manifest_v70.js"}

def sha256(path):
    h=hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda:f.read(1024*1024),b""):
            h.update(chunk)
    return h.hexdigest()

def collect_base():
    out=[]
    for p in sorted(ROOT.rglob("*")):
        if not p.is_file() or any(part in EXCLUDE_DIRS for part in p.parts):
            continue
        rel=p.relative_to(ROOT).as_posix()
        if rel in MANIFEST_PATHS:
            continue
        ext=p.suffix.lower()
        kind="text" if ext in {".js",".json",".css",".html",".md",".txt",".py"} else "binary"
        category={"js":"JS","json":"JSON","css":"CSS","html":"HTML","md":"DOC","txt":"DOC","py":"PY"}.get(ext.lstrip("."),"ASSET")
        out.append({"path":rel,"kind":kind,"category":category,"bytes":p.stat().st_size,"sha256":sha256(p)})
    return out

files=collect_base()
for _ in range(12):
    entries=list(files)
    entries += [
        {"path":"VTT_PROJECT_MANIFEST_V70.json","kind":"text","category":"JSON","bytes":MANIFEST.stat().st_size,"sha256":None},
        {"path":"app/vtt_project_manifest_v70.js","kind":"text","category":"JS","bytes":RUNTIME_MANIFEST.stat().st_size,"sha256":None},
    ]
    entries=sorted(entries,key=lambda x:x["path"])
    m={"version":VERSION,"generated":GENERATED,"fileCount":len(entries),"files":entries}
    MANIFEST.write_text(json.dumps(m,ensure_ascii=False,separators=(",",":"))+"\n",encoding="utf-8")
    RUNTIME_MANIFEST.write_text("window.VTT_PROJECT_MANIFEST_V70 = "+json.dumps(m,ensure_ascii=False,separators=(",",":"))+";\n",encoding="utf-8")
    files=collect_base()
print("manifest files",len(m["files"]))
