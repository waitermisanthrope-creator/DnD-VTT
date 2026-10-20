from pathlib import Path
import hashlib,json,re,subprocess,collections
import argparse
parser=argparse.ArgumentParser();parser.add_argument('--main',type=Path,required=True);args=parser.parse_args()
root=Path(__file__).resolve().parents[1]; main=args.main.resolve()
files=[]; texts={}
for base,label in [(main,'main'),(root,'unity-branch')]:
 tracked=subprocess.check_output(['git','ls-files','-z'],cwd=base).decode().split('\0')
 for name in filter(None,tracked):
  p=base/name
  if not p.is_file():continue
  b=p.read_bytes(); row=dict(branch=label,path=name,bytes=len(b),sha256=hashlib.sha256(b).hexdigest())
  files.append(row)
  if p.suffix.lower() in ['.cs','.js','.json','.html','.css','.gltf','.asset','.unity','.mat','.gradle','.yml','.md']:
   texts[(label,name)]=b.decode('utf-8',errors='replace')
guids={}
for p in (root/'unity/Assets').rglob('*.meta'):
 m=re.search(r'^guid: ([a-f0-9]{32})',p.read_text(errors='replace'),re.M)
 if m:guids[m[1]]=str(p.relative_to(root))[:-5]
edges={}
for (branch,name),t in texts.items():
 if branch=='unity-branch' and name.startswith('unity/Assets/'):
  edges[name]=sorted({guids[g] for g in re.findall(r'guid: ([a-f0-9]{32})',t) if g in guids})
roots=['unity/Assets/Vtt/Scenes/ImportedAdventure.unity']
roots += [f['path'] for f in files if f['branch']=='unity-branch' and f['path'].startswith('unity/Assets/') and ('/Resources/' in f['path'] or '/StreamingAssets/' in f['path']) and not f['path'].endswith('.meta')]
seen=set(); queue=list(roots)
while queue:
 p=queue.pop()
 if p in seen:continue
 seen.add(p);queue+=edges.get(p,[])
for f in files:
 n=f['path']; f['unityInclusion']='outside Unity assets' if not n.startswith('unity/Assets/') else 'static build dependency' if n in seen else 'not proven included (runtime/build hooks need review)'
 if f['branch']=='main':
  f['legacyApkInput']=n.startswith('app/') or n=='index.html' or ('/' not in n and Path(n).suffix in ['.png','.jpg','.glb','.mp3']) or (n.startswith('wallpapers/') and Path(n).suffix in ['.png','.svg'])
 f['licenseReview']='CC0 evidence in MakeHuman metadata; review each file' if 'makehuman' in n else 'not cleared for redistribution'
 if n.startswith('unity/Assets/') and not n.endswith('.meta'): f['incomingUnityReferences']=[s for s,ds in edges.items() if n in ds]
groups=collections.defaultdict(list)
for f in files:groups[f['sha256']].append(f['branch']+':'+f['path'])
out=dict(sourceRefs={label:subprocess.check_output(['git','rev-parse','HEAD'],cwd=base).decode().strip() for base,label in [(main,'main'),(root,'unity-branch')]},limitations=['Static GUID closure is not a Unity BuildReport. C# dynamic references and glTF import dependencies require Editor verification.','No deletion is authorized by lack of a static reference.','Web assets referenced by dynamically constructed names cannot be exhaustively proven by text search.'],buildRoots=roots,unityGuidEdges=edges,files=files,duplicates=[dict(sha256=h,paths=ps) for h,ps in groups.items() if len(ps)>1])
p=root/'docs/modular-content/audit.json';p.write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n');print('audited',len(files),'files; static Unity closure',len(seen),'duplicate groups',len(out['duplicates']))
