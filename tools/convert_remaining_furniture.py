"""Run with blender -b --python tools/convert_remaining_furniture.py -- <repository root>."""
import bpy, sys, zipfile, tempfile, re, json, shutil
from pathlib import Path
root=Path(sys.argv[sys.argv.index('--')+1]).resolve() if '--' in sys.argv else Path.cwd()
out=root/'app/assets/3d/user_furniture';out.mkdir(parents=True,exist_ok=True)
archives=['Mini-RPG-Bundle Part2.zip','medv-cafe.zip','Medieval_Inn_Beds.zip','3D Retro Medieval Fantasy Kit.zip']
standalone=['medievaltavern.blend','medievalbenchesexport.blend','medievalstonestairs.blend','bed.fbx']
records=[];errors=[];skipped=[]
def slug(s):return re.sub(r'[^a-z0-9]+','_',s.lower()).strip('_')[:90]
def reset():
 bpy.ops.object.select_all(action='SELECT')
 bpy.ops.object.delete(use_global=False)
def convert(path,prefix):
 key=slug(prefix+'_'+path.stem)
 target=out/(key+'.glb')
 if target.exists():
  skipped.append(key);return
 try:
  reset()
  if path.suffix.lower()=='.fbx':
   bpy.ops.import_scene.fbx(filepath=str(path))
  elif path.suffix.lower()=='.blend':
   with bpy.data.libraries.load(str(path),link=False) as (src,dst):
    dst.objects=list(src.objects)
   for obj in dst.objects:
    if obj and obj.name not in bpy.context.scene.objects:
     bpy.context.collection.objects.link(obj)
  meshes=[obj for obj in bpy.context.scene.objects if obj.type=='MESH']
  if not meshes:raise ValueError('No mesh objects')
  bpy.ops.object.select_all(action='DESELECT')
  for obj in meshes:obj.select_set(True)
  bpy.context.view_layer.objects.active=meshes[0]
  bpy.ops.export_scene.gltf(filepath=str(target),export_format='GLB',use_selection=True,export_apply=True)
  if target.stat().st_size<500:raise ValueError('GLB too small')
  records.append({'id':'UserConverted_'+key,'file':target.name,'source':str(path.relative_to(root)) if path.is_relative_to(root) else path.name,'bytes':target.stat().st_size})
 except Exception as exc:
  target.unlink(missing_ok=True)
  errors.append({'source':str(path),'error':str(exc)})
  print('FAILED:',path,exc)
with tempfile.TemporaryDirectory() as directory:
 temp=Path(directory)
 for archive in archives:
  file=root/archive
  if not file.exists():
   errors.append({'source':archive,'error':'archive not found'});continue
  dest=temp/slug(archive);dest.mkdir()
  with zipfile.ZipFile(file) as z:
   for item in z.infolist():
    if item.is_dir():continue
    relative=Path(item.filename)
    if relative.is_absolute() or '..' in relative.parts:continue
    if relative.suffix.lower() not in ('.fbx','.blend','.png','.jpg','.jpeg','.tga','.webp','.bmp'):continue
    if archive.startswith('Mini-RPG') and relative.suffix.lower()=='.blend':continue
    target=dest/relative;target.parent.mkdir(parents=True,exist_ok=True)
    with z.open(item) as src,target.open('wb') as dst:shutil.copyfileobj(src,dst)
  files=sorted(dest.rglob('*.fbx'))
  if not files:files=sorted(dest.rglob('*.blend'))
  for file in files:convert(file,slug(archive))
 for filename in standalone:
  file=root/filename
  if file.exists():convert(file,'standalone')
  else:errors.append({'source':filename,'error':'file not found'})
catalog=root/'app/3dmap/gltf_catalog.js'
text=catalog.read_text(encoding='utf8')
marker='/* AUTO-CONVERTED FURNITURE START */'
if marker in text:text=text.split(marker)[0].rstrip()+'\n'
lines=[marker,'(function(g){"use strict";var c=g.DND3DAssetCatalog,n=g.DND3DAssetNames;if(!c||!n)return;']
for file in sorted(out.glob('*.glb')):
 if not file.stem.startswith(('mini_rpg_bundle','medv_cafe','medieval_inn_beds','3d_retro_medieval','standalone_')):continue
 key='UserConverted_'+file.stem
 item={'id':key,'name':file.stem.replace('_',' '),'nameRus':file.stem.replace('_',' '),'path':'./app/assets/3d/user_furniture/'+file.name,'category':'furniture','packName':'Конвертированная мебель','scale':1}
 k=json.dumps(key)
 lines.append('if(!c['+k+']){c['+k+']='+json.dumps(item,ensure_ascii=False)+';n.push('+k+');}')
lines.append('})(window);')
catalog.write_text(text+'\n'.join(lines)+'\n',encoding='utf8')
report={'converted':records,'skipped':skipped,'errors':errors}
(root/'docs/FURNITURE_CONVERSION_REPORT.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf8')
print('Converted:',len(records),'skipped:',len(skipped),'errors:',len(errors))
