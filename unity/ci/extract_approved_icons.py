# DnD-VTT 1.00.61 — exact-artwork extraction helper
# Run with Pillow installed: python unity/ci/extract_approved_icons.py approved_atlas.png output_dir
# Source image must be the ORIGINAL approved 1536x1024 PNG; never regenerate it.
from PIL import Image
from pathlib import Path
import json,sys
source=Path(sys.argv[1]); target=Path(sys.argv[2]); target.mkdir(parents=True,exist_ok=True)
im=Image.open(source).convert('RGBA')
if im.size!=(1536,1024): raise ValueError('Expected original 1536x1024 approved atlas')
rows=[
([1,2,3,4,5,6,7,8,10,11,12],[52,112,169,225,282,338,395,451,508,565,621],145,32),
(list(range(13,19)),[696,755,815,875,936,994],145,32),
(list(range(19,27)),[1078,1138,1197,1256,1315,1374,1433,1490],145,32),
(list(range(27,33)),[58,119,181,242,303,365],258,32),
(list(range(33,38)),[453,516,579,642,705],258,32),
(list(range(38,42)),[786,849,912,975],258,32),
(list(range(42,46)),[1065,1129,1193,1257],258,32),
(list(range(46,49)),[1350,1414,1478],258,32),
(list(range(49,65)),[54,99,145,191,237,283,329,375,421,467,513,559,605,651,697,743],384,29),
(list(range(65,81)),[833,878,924,970,1016,1062,1108,1154,1200,1246,1292,1338,1384,1430,1476,1515],384,27),
(list(range(81,97)),[57,104,151,198,245,292,339,386,433,480,527,574,621,668,715,762],512,28),
(list(range(97,109)),[845,903,961,1019,1077,1135,1193,1251,1309,1367,1425,1483],512,29),
(list(range(109,121)),[56,115,174,233,292,351,410,469,528,587,646,705],703,29),
(list(range(121,133)),[847,905,963,1021,1079,1137,1195,1253,1311,1369,1427,1485],703,29),
(list(range(133,149)),[55,102,149,196,243,290,337,384,431,478,525,572,619,666,713,760],896,28),
(list(range(149,161)),[845,903,961,1019,1077,1135,1193,1251,1309,1367,1425,1483],896,29)]
manifest=[]
for ids,centers,y,half in rows:
 for number,x in zip(ids,centers):
  box=(max(0,x-half),y-half,min(im.width,x+half),y+half)
  im.crop(box).save(target/f'icon_{number:03d}.png')
  manifest.append({'id':number,'file':f'icon_{number:03d}.png','source_rect':box})
missing=sorted(set(range(1,161))-{x['id'] for x in manifest})
(target/'manifest.json').write_text(json.dumps({'source':source.name,'icons':manifest,'missing':missing,'status':'UNREVIEWED — source crop retains background and border; not production ready'},indent=2))
print(f'Extracted {len(manifest)} original crops; missing: {missing}')
