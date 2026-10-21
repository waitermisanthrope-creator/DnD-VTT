"""Build an explicit PHB baseline and individually downloadable mechanical records.
Original source snapshot is retained outside Unity's imported Assets tree.
Third-party book prose and images are not re-published in these new packages.
"""
import argparse, hashlib, json, re, subprocess
from pathlib import Path
ROOT = Path(__file__).resolve().parents[2]
p = argparse.ArgumentParser(); p.add_argument('--content', type=Path, required=True); p.add_argument('--assets', type=Path, required=True); args=p.parse_args()
def write(path, data):
 path.parent.mkdir(parents=True, exist_ok=True); path.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
def clean(value):
 if isinstance(value,list):return [clean(x) for x in value]
 if isinstance(value,dict):return {k:clean(v) for k,v in value.items() if k not in ('desc','description','raceFeatureDescriptions')}
 return value
full=json.loads((ROOT/'unity/ContentSources~/catalog.full.json').read_text()); base=json.loads(json.dumps(full))
base_races={'human','human_variant','elf_high','elf_wood','elf_drow','dwarf_hill','dwarf_mountain','halfling_lightfoot','halfling_stout','dragonborn','gnome_rock','gnome_forest','half_elf','half_orc','tiefling'}
base_classes={'barbarian','bard','cleric','druid','fighter','monk','paladin','ranger','rogue','sorcerer','warlock','wizard'}
# The VM executes only repository-owned declarative feat arrays, without DOM/network.
script="const fs=require('fs'),vm=require('vm'),c={};c.window=c;vm.createContext(c);for(const f of process.argv.slice(1))vm.runInContext(fs.readFileSync(f,'utf8'),c,{timeout:2000});process.stdout.write(JSON.stringify(Object.values(c).filter(Array.isArray).flat()));"
files=sorted((ROOT/'app/data/feats').glob('Feats_*.js'))
feats=json.loads(subprocess.check_output(['node','-e',script,*map(str,files)]))
unique={}
for feat in feats:
 if feat['id'] in unique:raise ValueError('Duplicate feat '+feat['id'])
 unique[feat['id']]=feat
# Baseline follows the user's explicit PHB choice when -- otherwise SRD Grappler.
phb=(ROOT/'unity/ContentSources~/baseline-feats.txt').exists() and (ROOT/'unity/ContentSources~/baseline-feats.txt').read_text().strip()=='PHB'
base['creation']['feats']=[clean(f) for f in feats if f.get('source')=='PHB' and (phb or f['id']=='grappler')]
for feat in base['creation']['feats']:
 feat['description']='Черта '+feat.get('nameRu',feat['name'])+'. Бонус характеристик применяется при выборе; остальные эффекты учитываются вручную.'
base['creation']['races']=[r for r in full['creation']['races'] if r['id'] in base_races]
base['creation']['classes']=[c for c in full['creation']['classes'] if c['id'] in base_classes]
base.pop('sources',None)
base['items']={key:[] for key in full['items']}
base['baseline']={'edition':'D&D 5e 2014 PHB','raceFamilies':9,'raceEntries':15,'classEntries':12,'feats':'PHB' if phb else 'SRD Grappler'}
write(ROOT/'unity/Assets/Vtt/Resources/CharacterSheet/catalog.json',base)
content=json.loads((args.content/'catalog/v1/index.json').read_text()); content['packages']=[m for m in content['packages'] if not m['id'].startswith('dnd.')]
assets=json.loads((args.assets/'catalog/v1/index.json').read_text()); assets['packs']=[m for m in assets['packs'] if not m['id'].startswith('dnd.')]
rows=[]
def package(repo,registry,kind,slug,name,field,entries,description):
 id='dnd.'+kind+'.'+slug
 data={'schemaVersion':1,'id':id,'version':'1.0.0','type':kind,field:entries}
 target=repo/'packages'/ (id+'.json');write(target,data);b=target.read_bytes()
 m={'schemaVersion':1,'id':id,'name':name,'version':'1.0.0','author':'DnD-VTT contributors','license':'CC0-1.0 (original mechanical metadata only)','type':kind,'format':'json','platform':'any','unityVersion':'*','dependencies':[],'minClientVersionCode':10008,'description':description,'bytes':len(b),'sha256':hashlib.sha256(b).hexdigest(),'url':'https://raw.githubusercontent.com/waitermisanthrope-creator/'+repo.name+'/main/packages/'+target.name}
 registry.append(m);rows.append({'id':id,'bytes':len(b),'sha256':m['sha256'],'entries':len(entries)})
for field,kind,keep in [('races','race',base_races),('classes','class',base_classes)]:
 for raw in full['creation'][field]:
  if raw['id'] in keep:continue
  item=clean(raw)
  item['desc']='Дополнение: '+raw['name']+'. Перенесены параметры создания персонажа; автоматизация боя и развития класса не входит в этот пакет.'
  if kind=='class' and raw['seed'].get('isExtraClass'):item['desc']='Экстра-класс, заменяющий расу. Создание в Unity пока недоступно; существующие персонажи сохраняются и доступны через импорт.'
  if kind=='race':
   # Preserve identifiers, numeric mechanics, languages and AC, without book prose.
   item['seed']['features']=['Параметры расы: '+raw['name']]
   item['seed']['raceFeatureDescriptions']=[item['desc']]
  package(args.content,content['packages'],kind,raw['id'],raw['name'],field,[item],item['desc'])
base_feat_ids={x['id'] for x in base['creation']['feats']}
for raw in feats:
 if raw['id'] in base_feat_ids:continue
 item=clean(raw);item['description']='Дополнительная черта: '+raw.get('nameRu',raw['name'])+'. Бонус характеристик применяется при выборе; прочие эффекты учитываются вручную.'
 package(args.content,content['packages'],'feat',raw['id'],raw.get('nameRu',raw['name']),'feats',[item],item['description'])
for path in sorted((ROOT/'app/data/maps').glob('3d_*.json')):
 doc=json.loads(path.read_text());slug=path.stem.replace('_','-');id='dnd.map.'+slug
 entry={'id':id,'name':doc.get('name',path.stem),'document':doc}
 package(args.assets,assets['packs'],'map',slug,entry['name'],'maps',[entry],'Карта из проекта. Текстуры и модели подключаются отдельными пакетами; отсутствующие ресурсы отображаются заменителями.')
# New original texture patterns. Unknown-license legacy PNG/model bytes stay in
# source control, excluded from player builds and NOT relabelled as CC0.
keys=json.loads((ROOT/'unity/Assets/LegacyContent/provenance.json').read_text())['textures']
surfaces=[]
for key in keys:
 h=hashlib.sha256(key.encode()).hexdigest();color='#'+h[:6]+'ff';alt='#'+''.join(f'{max(0,int(h[i:i+2],16)-24):02x}' for i in (0,2,4))+'ff'
 surfaces.append({'id':'dnd.appearance.map-surfaces.'+key,'name':key,'legacyKey':key,'color':color,'alternateColor':alt,'pattern':'checker','textureSize':32})
package(args.assets,assets['packs'],'appearance','map-surfaces','Поверхности карт — новые процедурные текстуры','surfaces',surfaces,'36 оригинальных процедурных текстур и материалов для старых ключей карт. Это новые узоры, а не копии исходных PNG с неподтверждённой лицензией.')
write(args.content/'catalog/v2/index.json',content);write(args.assets/'catalog/v2/index.json',assets)
write(ROOT/'docs/modular-content/split-inventory.json',{'baseline':base['baseline'],'packages':rows,'originalsDeleted':0,'legacyBinaryPublication':'BLOCKED: exact license/source verification pending'})
print('SPLIT_CONTENT_PASS',len(rows),'packages',sum(x['bytes'] for x in rows),'bytes; baseline',base['baseline'])
