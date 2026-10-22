"""Validate the actual compiled APK launcher migration, not only source XML."""
import argparse,re,subprocess,zipfile
def resource_files(dump):
 paths={};refs={};current=None
 for line in dump.splitlines():
  entry=re.search(r'\bresource (0x[0-9a-fA-F]+)',line)
  if entry:
   current=entry[1].lower()
   reference=re.search(r't=0x0*1 d=(0x[0-9a-fA-F]+)',line)
   if reference:refs[current]=reference[1].lower()
  if current:
   for filename in re.findall(r'"(res/[^"\n]+)"',line):paths.setdefault(current,set()).add(filename)
 return paths,refs

def resolve_files(resource,paths,refs,seen=None):
 seen=set() if seen is None else seen
 if resource in seen:raise ValueError('Cyclic drawable reference')
 seen.add(resource)
 if resource in paths:return paths[resource]
 if resource in refs:return resolve_files(refs[resource],paths,refs,seen)
 raise ValueError('Missing drawable file for '+resource)

def main():
 p=argparse.ArgumentParser();p.add_argument('apk');p.add_argument('--aapt',required=True);a=p.parse_args()
 text=subprocess.check_output([a.aapt,'dump','xmltree',a.apk,'AndroidManifest.xml'],text=True)
 nodes=[];stack=[]
 for line in text.splitlines():
  indent=len(line)-len(line.lstrip());element=re.search(r'E: ([\w-]+)',line)
  if element:
   while stack and stack[-1]['indent']>=indent:stack.pop()
   node=dict(tag=element[1],attrs={},indent=indent,parent=stack[-1] if stack else None);nodes.append(node);stack.append(node);continue
  attr=re.search(r'A: android:([\w]+)\([^)]*\)=(.*)',line)
  if attr and stack:
   raw=attr[2];quoted=re.search(r'"([^"]*)"',raw);stack[-1]['attrs'][attr[1]]=quoted[1] if quoted else raw.strip()
 aliases=[n for n in nodes if n['tag']=='activity-alias'];assert len(aliases)==31,'Expected 31 fixed launcher aliases'
 marker=next(n for n in nodes if n['tag']=='meta-data' and n['attrs'].get('name')=='dnd.vtt.launcherDefault');default=marker['attrs']['value']
 assert default in ('com.unity3d.player.UnityPlayerActivity','com.unity3d.player.UnityPlayerGameActivity')
 names={default}|{f'com.dndvtt.unity.LauncherIcon{i:02}' for i in range(1,31)};assert {n['attrs']['name'] for n in aliases}==names
 for alias in aliases:
  assert alias['attrs']['targetActivity']=='com.dndvtt.unity.LauncherHostActivity'
  enabled=alias['attrs'].get('enabled','');assert ('0xffffffff' in enabled or enabled=='true')==(alias['attrs']['name']==default),'Exactly the original default entry must be enabled in fresh APK'
 launchers=[n for n in nodes if n['tag']=='category' and n['attrs'].get('name')=='android.intent.category.LAUNCHER']
 assert len(launchers)==31 and all(n['parent']['parent']['tag']=='activity-alias' for n in launchers),'No extra primary launcher entries'
 resources=subprocess.check_output([a.aapt,'dump','--values','resources',a.apk],text=True)
 paths,refs=resource_files(resources)
 with zipfile.ZipFile(a.apk) as z:
  physical=set()
  for alias in aliases:
   reference=re.search(r'(0x[0-9a-fA-F]+)',alias['attrs']['icon']);assert reference,'Alias missing drawable reference'
   physical.update(resolve_files(reference[1].lower(),paths,refs))
  assert 1<=len(physical)<=31,'Invalid physical system icon count'
  size=0
  for name in physical:
   b=z.read(name);assert b[:8]==b'\x89PNG\r\n\x1a\n' and int.from_bytes(b[16:20],'big')==192 and int.from_bytes(b[20:24],'big')==192;size+=len(b)
  assert size<=3*1024*1024,'System icon resource budget exceeded'
  assert any(b'com/dndvtt/unity/LauncherHostActivity' in z.read(n) for n in z.namelist() if n.endswith('.dex')),'Unity host Activity missing from actual bytecode'
 print('APK_LAUNCHER_ALIAS_PASS: original entry, 31 aliases, physical PNGs',len(physical),'bytes',size)

if __name__=='__main__':main()
