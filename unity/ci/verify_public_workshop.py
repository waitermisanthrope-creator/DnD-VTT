"""Download public catalogs/packages with hard byte limits for the C# lifecycle tests."""
import argparse,hashlib,json,urllib.request
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
parser=argparse.ArgumentParser();parser.add_argument('--output',type=Path,required=True);parser.add_argument('--reuse-packages',action='store_true');args=parser.parse_args()
def fetch(url,limit):
 with urllib.request.urlopen(url,timeout=45) as response:
  data=response.read(limit+1)
  if len(data)>limit:raise ValueError('Download limit exceeded')
  return data
rows=[]
jobs=[]
for repo,field in [('DnD-VTT-Content','packages'),('DnD-VTT-Assets','packs')]:
 prefix='https://raw.githubusercontent.com/waitermisanthrope-creator/'+repo+'/main/'
 version=3
 data=fetch(prefix+f'catalog/v{version}/index.json',1024*1024);doc=json.loads(data)
 root=args.output/repo; (root/f'catalog/v{version}').mkdir(parents=True,exist_ok=True);(root/'packages').mkdir(exist_ok=True)
 (root/f'catalog/v{version}/index.json').write_bytes(data)
 for m in doc[field]:
  if m.get('format')!='json':continue
  assert (m['url'].startswith(prefix+'packages/') or (repo.endswith('Assets') and m['url'].startswith('https://github.com/waitermisanthrope-creator/DnD-VTT-Assets/releases/download/owner-appearance-v1/'))) and '..' not in m['url'] and m['url'].endswith('.json')
  jobs.append((root,m))
def download(job):
 root,m=job
 existing=root/'packages'/m['url'].rsplit('/',1)[1]
 b=existing.read_bytes() if args.reuse_packages and existing.exists() else fetch(m['url'],m['bytes']);h=hashlib.sha256(b).hexdigest();assert len(b)==m['bytes'] and h==m['sha256']
 (root/'packages'/m['url'].rsplit('/',1)[1]).write_bytes(b)
 return dict(id=m['id'],url=m['url'],bytes=len(b),sha256=h,status='verified-public-download')
with ThreadPoolExecutor(max_workers=6) as pool: rows=list(pool.map(download,jobs))
(args.output/'verification.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2)+'\n')
print('PUBLIC_WORKSHOP_DOWNLOAD_PASS',len(rows),'packages,',sum(r['bytes'] for r in rows),'bytes')

preview_root=args.output/'DnD-VTT-Assets';data=fetch('https://raw.githubusercontent.com/waitermisanthrope-creator/DnD-VTT-Assets/main/catalog/v4/index.json',1024*1024)
(preview_root/'catalog/v4').mkdir(parents=True,exist_ok=True);(preview_root/'catalog/v4/index.json').write_bytes(data);(preview_root/'previews').mkdir(exist_ok=True)
preview_rows=[]
def download_preview(m):
 p=m['preview'];assert p['url'].startswith('https://github.com/waitermisanthrope-creator/DnD-VTT-Assets/releases/download/workshop-previews-v1/') and p['url'].endswith('.jpg') and '..' not in p['url'] and '?' not in p['url'] and 0<p['bytes']<=256*1024
 b=fetch(p['url'],p['bytes']);assert len(b)==p['bytes'] and hashlib.sha256(b).hexdigest()==p['sha256'];(preview_root/'previews'/p['url'].rsplit('/',1)[1]).write_bytes(b);return len(b)
with ThreadPoolExecutor(max_workers=6) as pool:preview_rows=list(pool.map(download_preview,[m for m in json.loads(data)['packs'] if 'preview' in m]))
print('PUBLIC_WORKSHOP_PREVIEWS_PASS',len(preview_rows),sum(preview_rows),'bytes')

# v5 is consumed only by generator-capable clients; v3/v4 remain unchanged.
data=fetch('https://raw.githubusercontent.com/waitermisanthrope-creator/DnD-VTT-Assets/main/catalog/v5/index.json',1024*1024)
(preview_root/'catalog/v5').mkdir(parents=True,exist_ok=True);(preview_root/'catalog/v5/index.json').write_bytes(data)
themes=[m for m in json.loads(data)['packs'] if m.get('imageKind')=='dice']
assert len(themes)==31
for m in themes:
 assert m['url'].startswith('https://raw.githubusercontent.com/waitermisanthrope-creator/DnD-VTT-Assets/main/packages/dnd.dice.icon.') and '..' not in m['url'] and '?' not in m['url']
 download((preview_root,m))
print('PUBLIC_DICE_PACKAGES_PASS',len(themes),sum(m['bytes'] for m in themes),'bytes')

# Textured v6 is separate: v5 legacy payloads and image pixels are unchanged.
data=fetch('https://raw.githubusercontent.com/waitermisanthrope-creator/DnD-VTT-Assets/main/catalog/v6/index.json',1024*1024)
(preview_root/'catalog/v6').mkdir(parents=True,exist_ok=True);(preview_root/'catalog/v6/index.json').write_bytes(data)
textured=[m for m in json.loads(data)['packs'] if m.get('imageKind')=='dice']
assert len(textured)==31
for m in textured:
 assert m['version']=='1.1.0' and m['minClientVersionCode']==10026 and m['dependencies']==[]
 assert m['url'].startswith('https://github.com/waitermisanthrope-creator/DnD-VTT-Assets/releases/download/owner-appearance-v1/dnd.dice.icon.')
 download((preview_root,m))
print('PUBLIC_TEXTURED_DICE_PACKAGES_PASS',len(textured),sum(m['bytes'] for m in textured),'bytes')

# Six test material profiles are isolated in v7; existing v6 stays byte-compatible.
data=fetch('https://raw.githubusercontent.com/waitermisanthrope-creator/DnD-VTT-Assets/main/catalog/v7/index.json',1024*1024)
(preview_root/'catalog/v7').mkdir(parents=True,exist_ok=True);(preview_root/'catalog/v7/index.json').write_bytes(data)
experimental=[m for m in json.loads(data)['packs'] if m.get('imageKind')=='dice' and m['version']=='1.2.0']
assert len(experimental)==6
for m in experimental:
 assert m['minClientVersionCode']==10029 and m['dependencies']==[]
 assert m['url'].startswith('https://github.com/waitermisanthrope-creator/DnD-VTT-Assets/releases/download/owner-appearance-v1/dnd.dice.')
 download((preview_root,m))
print('PUBLIC_SIX_DICE_PACKAGES_PASS',len(experimental),sum(m['bytes'] for m in experimental),'bytes')
