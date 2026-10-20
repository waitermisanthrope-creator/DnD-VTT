"""Download public catalogs/packages with hard byte limits for the C# lifecycle tests."""
import argparse,hashlib,json,urllib.request
from pathlib import Path
parser=argparse.ArgumentParser();parser.add_argument('--output',type=Path,required=True);args=parser.parse_args()
def fetch(url,limit):
 with urllib.request.urlopen(url,timeout=45) as response:
  data=response.read(limit+1)
  if len(data)>limit:raise ValueError('Download limit exceeded')
  return data
rows=[]
for repo,field in [('DnD-VTT-Content','packages'),('DnD-VTT-Assets','packs')]:
 prefix='https://raw.githubusercontent.com/waitermisanthrope-creator/'+repo+'/main/'
 data=fetch(prefix+'catalog/v1/index.json',1024*1024);doc=json.loads(data)
 root=args.output/repo; (root/'catalog/v1').mkdir(parents=True,exist_ok=True);(root/'packages').mkdir(exist_ok=True)
 (root/'catalog/v1/index.json').write_bytes(data)
 for m in doc[field]:
  if m.get('format')!='json':continue
  assert m['url'].startswith(prefix+'packages/') and '..' not in m['url'] and m['url'].endswith('.json')
  b=fetch(m['url'],m['bytes']);h=hashlib.sha256(b).hexdigest();assert len(b)==m['bytes'] and h==m['sha256']
  (root/'packages'/m['url'].rsplit('/',1)[1]).write_bytes(b)
  rows.append(dict(id=m['id'],url=m['url'],bytes=len(b),sha256=h,status='verified-public-download'))
(args.output/'verification.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2)+'\n')
print('PUBLIC_WORKSHOP_DOWNLOAD_PASS',len(rows),'packages,',sum(r['bytes'] for r in rows),'bytes')
