"""Download public catalogs/packages with hard byte limits for the C# lifecycle tests."""
import argparse,hashlib,json,urllib.request
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
parser=argparse.ArgumentParser();parser.add_argument('--output',type=Path,required=True);args=parser.parse_args()
def fetch(url,limit):
 with urllib.request.urlopen(url,timeout=45) as response:
  data=response.read(limit+1)
  if len(data)>limit:raise ValueError('Download limit exceeded')
  return data
rows=[]
jobs=[]
for repo,field in [('DnD-VTT-Content','packages'),('DnD-VTT-Assets','packs')]:
 prefix='https://raw.githubusercontent.com/waitermisanthrope-creator/'+repo+'/main/'
 data=fetch(prefix+'catalog/v2/index.json',1024*1024);doc=json.loads(data)
 root=args.output/repo; (root/'catalog/v2').mkdir(parents=True,exist_ok=True);(root/'packages').mkdir(exist_ok=True)
 (root/'catalog/v2/index.json').write_bytes(data)
 for m in doc[field]:
  if m.get('format')!='json':continue
  assert m['url'].startswith(prefix+'packages/') and '..' not in m['url'] and m['url'].endswith('.json')
  jobs.append((root,m))
def download(job):
 root,m=job
 b=fetch(m['url'],m['bytes']);h=hashlib.sha256(b).hexdigest();assert len(b)==m['bytes'] and h==m['sha256']
 (root/'packages'/m['url'].rsplit('/',1)[1]).write_bytes(b)
 return dict(id=m['id'],url=m['url'],bytes=len(b),sha256=h,status='verified-public-download')
with ThreadPoolExecutor(max_workers=6) as pool: rows=list(pool.map(download,jobs))
(args.output/'verification.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2)+'\n')
print('PUBLIC_WORKSHOP_DOWNLOAD_PASS',len(rows),'packages,',sum(r['bytes'] for r in rows),'bytes')
