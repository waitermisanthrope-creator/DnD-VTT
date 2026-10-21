"""Audit an existing signed APK and its exact Unity inventory/build report.
This does not build, modify, sign or publish an APK.
"""
import argparse,hashlib,json,zipfile
from pathlib import Path
p=argparse.ArgumentParser();p.add_argument('--apk',type=Path,required=True);p.add_argument('--inventory',type=Path,required=True);p.add_argument('--build-report',type=Path,required=True);p.add_argument('--output',type=Path,required=True);a=p.parse_args()
root=Path(__file__).resolve().parents[1];inv=json.loads(a.inventory.read_text());build=json.loads(a.build_report.read_text());sha=hashlib.sha256(a.apk.read_bytes()).hexdigest();assert sha==inv['apkSha256']=='f1b2f98a667f57a7d304d218965b2cd4afb625f12e79cbd0df76c0cd6404e169'
textures=[x for x in inv['objects'] if x['type']=='Texture2D'];materials=[x for x in inv['objects'] if x['type']=='Material']
provenance=json.loads((root/'unity/Assets/LegacyContent/provenance.json').read_text());optional=set(provenance['textures'])|{Path(f['path']).stem for f in provenance['files'] if Path(f['path']).name.startswith('T_Trim_')}
with zipfile.ZipFile(a.apk) as z:
 rows=[dict(path=i.filename,bytes=i.file_size,apkCompressedBytes=i.compress_size) for i in z.infolist() if not i.is_dir()]
 artwork=[r for r in rows if r['path'].startswith('assets/Branding/')]
 for r in artwork:r['sha256']=hashlib.sha256(z.read(r['path'])).hexdigest()
 native=sorted([r for r in rows if r['path'].startswith('lib/')],key=lambda r:r['apkCompressedBytes'],reverse=True)
 packed=sorted(build['packedAssets'],key=lambda r:r['packedBytes'],reverse=True)
 result={'version':'1.00.08','apkBytes':a.apk.stat().st_size,'apkSha256':sha,'nativeLibraries':native,'rawArtwork':artwork,'textures':textures,'materials':materials,'optionalTextureMatches':[x for x in textures if x.get('name') in optional], 'optionalMaterialMatches':[x for x in materials if x.get('name') in optional], 'artworkAlsoPresentAsUnityTextures':[x for x in textures if x.get('name') in ('Splash19','Dragon20','Wallpaper16')],'packedSourceAssets':packed,'note':'APK compressed sizes are exact ZIP-entry sizes. Unity packed/serialized sizes are uncompressed asset representations and cannot be added as compressed APK savings. Mandatory Android artwork is present in Resources and raw StreamingAssets fallback; downloadable patterns are generated at runtime.'}
 a.output.parent.mkdir(parents=True,exist_ok=True);a.output.write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
 print('RETAINED_APK_AUDIT',json.dumps({k:result[k] for k in ('apkBytes','nativeLibraries','rawArtwork','materials','optionalTextureMatches','optionalMaterialMatches','artworkAlsoPresentAsUnityTextures')},ensure_ascii=False))
 print('RETAINED_TEXTURES',json.dumps(textures,ensure_ascii=False));print('TOP_PACKED_SOURCES',json.dumps(packed[:18],ensure_ascii=False))
 assert not result['optionalTextureMatches'] and not result['optionalMaterialMatches']
