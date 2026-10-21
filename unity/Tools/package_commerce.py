"""Curated small data collections; no JS or executable code is published."""
import argparse,json,hashlib
from pathlib import Path
p=argparse.ArgumentParser();p.add_argument('--content',type=Path,required=True);a=p.parse_args();root=Path(__file__).resolve().parents[2]
def write(p,d):p.parent.mkdir(parents=True,exist_ok=True);p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n')
source=json.loads((root/'unity/ContentSources~/catalog.full.json').read_text());data=json.loads((root/'unity/ContentSources~/workshop-commerce/catalogs.json').read_text());catalog=json.loads((a.content/'catalog/v2/index.json').read_text())
rows=[]
def package(id,name,type,payload,deps=[]):
 doc={'schemaVersion':1,'id':id,'version':'1.0.0','type':type,**payload};target=a.content/'packages'/(id+'.json');write(target,doc);b=target.read_bytes()
 m={'schemaVersion':1,'id':id,'version':'1.0.0','type':type,'name':name,'author':'DnD-VTT contributors','license':'CC0-1.0 (project mechanical metadata)','platform':'any','format':'json','unityVersion':'*','dependencies':deps,'minClientVersionCode':10011,'description':'Данные из main. Код обработчиков встроен в Unity; пакет не содержит исполняемых модов.','bytes':len(b),'sha256':hashlib.sha256(b).hexdigest(),'url':'https://raw.githubusercontent.com/waitermisanthrope-creator/DnD-VTT-Content/main/packages/'+target.name}
 catalog['packages'].append(m);rows.append(m)
def items(values,category,id):
 result=[]
 for i,raw in enumerate(values):
  row=json.loads(json.dumps(raw));row['id']=id+'.'+str(i+1);row['inventoryCategory']=category;row.pop('count',None);row['description']='Предмет игрового справочника: '+str(row.get('name',''))+'. Характеристики указаны в полях записи.';result.append(row)
 return result
for category,label in [('weapons','Оружие'),('armor','Броня'),('consumables','Расходники'),('materials','Материалы'),('junk','Хлам')]:
 id='dnd.items.'+category;package(id,'Сборник: '+label,'item',{'items':items(source['items'][category],category,id)})
craft=data['craft'];package('dnd.craft.core','Мастерская — 47 рецептов и материалы','craft',{'mode':'craft-v31',**craft})
alch=data['alchemy'];ings=alch.pop('ingredients');package('dnd.alchemy.rules','Алхимия 2.0 — правила и катализаторы','craft',{'mode':'alchemy-v30',**alch})
for i in range(0,len(ings),40):
 id='dnd.alchemy.ingredients.'+str(i//40+1);part=ings[i:i+40];entries=[]
 for ing in part:entries.append({'id':id+'.'+ing['id'],'name':ing['name'],'alchemyId':ing['id'],'weight':'0.1 кг','inventoryCategory':'materials','description':'Алхимический ингредиент; свойства открываются исследованием.'})
 package(id,'Алхимия 2.0 — ингредиенты '+str(i//40+1),'craft',{'mode':'alchemy-ingredients','ingredients':part,'items':entries},['dnd.alchemy.rules'])
write(a.content/'catalog/v3/index.json',catalog)
# Only manual/custom inventory functionality remains offline; no optional tables.
p=root/'unity/Assets/Vtt/Resources/CharacterSheet/catalog.json';base=json.loads(p.read_text());base['items']={key:[] for key in source['items']};write(p,base)
write(root/'docs/modular-content/commerce-transfer.json',{'newPackages':rows,'items':{k:len(v) for k,v in source['items'].items()},'recipes':len(craft['recipes']),'ingredients':len(ings),'sourceCodeNeverDownloaded':True})
print('COMMERCE_PACKAGES',len(rows),'bytes',sum(r['bytes'] for r in rows))
