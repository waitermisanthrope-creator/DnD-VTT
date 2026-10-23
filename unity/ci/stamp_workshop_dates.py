"""Backfill release dates from canonical git history; never touch immutable payload bytes.
Run against a mod repository. Highest catalog generation available for an ID wins.
Subsequent publication should set publishedAt once and updatedAt on actual payload revisions.
"""
import argparse,json,re,subprocess
from datetime import datetime,timezone
from pathlib import Path

def stamp(root,path,key):
 def git(*args):return subprocess.check_output(['git',*args],cwd=root,text=True)
 if git('rev-parse','--is-shallow-repository').strip()=='true':raise ValueError('Fetch complete history before deriving publication dates')
 history=git('log','--reverse','--format=%H %cI','--','catalog').splitlines()
 state={};dates={}
 for line in history:
  commit,date=line.split(' ',1);date=datetime.fromisoformat(date).astimezone(timezone.utc).isoformat().replace('+00:00','Z')
  paths=git('diff-tree','--root','--no-commit-id','--name-only','-r',commit,'--','catalog').splitlines()
  for oldpath in sorted(paths,key=lambda p:int(re.search(r'/v(\d+)/',p).group(1)) if re.search(r'/v(\d+)/',p) else -1):
   v=re.fullmatch(r'catalog/v(\d+)/index.json',oldpath)
   if not v:continue
   raw=subprocess.run(['git','show',commit+':'+oldpath],cwd=root,capture_output=True,text=True)
   if raw.returncode:continue
   data=json.loads(raw.stdout)
   for m in data.get(key,[]):
    mid=m['id'];generation=int(v.group(1));prior=state.get(mid)
    if prior and prior[0]>generation:continue
    fingerprint=json.dumps({k:m.get(k) for k in ('version','sha256','dependencies','bytes','type')},sort_keys=True)
    if not prior:dates[mid]=[date,date]
    elif prior[1]!=fingerprint:dates[mid][1]=date
    state[mid]=(generation,fingerprint)
 catalog=json.loads((root/path).read_text())
 for m in catalog[key]:
  if m['id'] not in dates:raise ValueError('Commit new entry before deriving historical dates: '+m['id'])
  m.setdefault('publishedAt',dates[m['id']][0]);m.setdefault('updatedAt',dates[m['id']][1])
 # A collection changes when its required contents change, including shared resources.
 byid={m['id']:m for m in catalog[key]}
 def updated(mid,active):
  if mid in active:raise ValueError('Dependency cycle')
  m=byid[mid];d=m['updatedAt']
  if m['type']=='collection':
   for dep in m['dependencies']:
    if dep in byid:d=max(d,updated(dep,active|{mid}))
  m['updatedAt']=d;return d
 for mid in byid:updated(mid,set())
 (root/path).write_text(json.dumps(catalog,ensure_ascii=False,indent=2)+'\n')
 print(root.name,len(catalog[key]),'historical publication/update dates')
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('root',type=Path);p.add_argument('catalog');p.add_argument('key');a=p.parse_args();stamp(a.root,a.catalog,a.key)
