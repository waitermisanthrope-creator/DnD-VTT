import importlib.util,pathlib,tempfile,os,json,hashlib,base64,subprocess
from unittest.mock import patch
spec=importlib.util.spec_from_file_location('delivery', '.github/scripts/publish-unity-artifacts.py'); module=importlib.util.module_from_spec(spec); spec.loader.exec_module(module)
original=os.getcwd()
def scenario(kind):
 with tempfile.TemporaryDirectory(prefix='unity-publish-test-') as folder:
  os.chdir(folder)
  try:
   root=pathlib.Path(folder); (root/'release-staging').mkdir(); (root/'updates').mkdir(); (root/'unity').mkdir(); (root/'runner').mkdir(); sdk=root/'sdk/build-tools/36.0.0'; sdk.mkdir(parents=True); (sdk/'apksigner').touch()
   (root/'updates/stable.json').write_text('unchanged')
   files={'android':('DnD-VTT-Unity-1.00.00-arm64.apk',b'apk-fixture'),'windows':('DnD-VTT-Unity-Setup-1.00.00-x64.exe',b'setup-fixture')}; blobs={}; artifacts={}; targets={}
   for platform,(name,data) in files.items():
    sha=hashlib.sha1(b'blob '+str(len(data)).encode()+b'\0'+data).hexdigest(); blobs[sha]=data
    artifacts[platform]={'name':name,'bytes':len(data),'sha256':hashlib.sha256(data).hexdigest(),'parts':[{'offset':0,'bytes':len(data),'sha':sha}]}
    targets[platform]={'bytes':len(data),'sha256':artifacts[platform]['sha256'],'url':'https://github.com/'+module.REPO+'/releases/download/unity-v1.00.00/'+name}
   manifest={'schema':1,'channel':'unity-experiment','version':'1.00.00','versionCode':10000,'artifacts':targets}
   descriptor={'schema':1,'version':'1.00.00','versionCode':10000,'signingCertificateSha256':'a'*64,'updateManifest':manifest,'artifacts':artifacts}
   (root/'release-staging/unity-release.json').write_text(json.dumps(descriptor))
   if kind=='downgrade': (root/'updates/unity-experiment.json').write_text(json.dumps(dict(manifest,versionCode=10001)))
   created=[]; pushed=[]
   def api(path):
    data=blobs[path.rsplit('/',1)[1]]; data=b'corrupt' if kind=='transport' else data
    return {'content':base64.b64encode(data).decode()}
   def command(args):
    if args[0]=='curl':
     dest=pathlib.Path(args[-1]); source=pathlib.Path(str(dest)[:-7]); dest.write_bytes(b'bad' if kind=='remote' else source.read_bytes())
    elif args[:2]==['git','push']: pushed.append(args)
   def run(args,**kwargs): return subprocess.CompletedProcess(args,1,'','')
   env={'GITHUB_REF':'refs/heads/'+module.BRANCH,'GITHUB_SHA':'1'*40,'RUNNER_TEMP':str(root/'runner'),'ANDROID_HOME':str(root/'sdk'),'GH_TOKEN':'not-used-in-test'}
   if kind=='branch': env['GITHUB_REF']='refs/heads/main'
   with patch.dict(os.environ,env),patch.object(module,'api',api),patch.object(module,'gh',lambda *a:created.append(a)),patch.object(module.subprocess,'check_call',command),patch.object(module.subprocess,'run',run),patch.object(module.subprocess,'check_output',lambda *a,**k:'Signer #1 certificate SHA-256 digest: '+('b'*64 if kind=='signature' else 'a'*64)),patch('builtins.print'):
    failed=False
    try: module.publish()
    except ValueError: failed=True
   assert (not failed)==(kind=='success'),kind
   if kind in ('transport','signature','branch'): assert not created
   if kind in ('transport','signature','branch','remote'): assert not (root/'updates/unity-experiment.json').exists()
   if kind=='downgrade': assert json.loads((root/'updates/unity-experiment.json').read_text())['versionCode']==10001
   assert (root/'updates/stable.json').read_text()=='unchanged'
   if kind=='success': assert len(created)==1 and '--prerelease' in created[0] and '--latest=false' in created[0] and len(pushed)==1
   print('PUBLISH_TEST_PASS:',kind)
  finally: os.chdir(original)
for name in ('success','branch','transport','signature','remote','downgrade'): scenario(name)
