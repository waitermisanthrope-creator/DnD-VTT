#!/usr/bin/env node
'use strict';
// Full Git file index + best-effort static variable and state-key inventory.
// Run: node tools/generate_project_atlas.cjs
const fs=require('node:fs'), path=require('node:path'), cp=require('node:child_process');
const git=(...a)=>cp.execFileSync('git',a,{encoding:'utf8',maxBuffer:10000000});
const files=[...new Set(git('ls-files','-z').split('\0').filter(Boolean)
 .concat(['PROJECT_ATLAS.md','PROJECT_ATLAS.txt']))].sort((a,b)=>a.localeCompare(b));
const revision=git('rev-parse','--short=12','HEAD').trim();
const types=['JS объявления/параметры','Глобальные JS API','Поля персонажа',
 'Поля JS объектов','Ключи localStorage','CSS переменные','Python/Java идентификаторы','JSON поля'];
const registry=new Map(types.map(x=>[x,new Map()]));
function add(category,name,file){
 if(!name||name.length>120)return;
 if(category!=='Ключи localStorage'&&!/^--[A-Za-z][\w-]*$/.test(name)&&!/^[A-Za-z_$][\w$-]*$/.test(name))return;
 let cat=registry.get(category);
 if(!cat.has(name))cat.set(name,new Set());
 cat.get(name).add(file);
}
function scanJS(file,source){
 // Remove comments and literal strings; this is NOT a full JS AST parser.
 const s=source.replace(/\/\*[\s\S]*?\*\/|\/\/[^\n]*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\x60(?:\\.|[^\x60\\])*\x60/g,
   m=>m.replace(/[^\n]/g,' '));
 for(const m of s.matchAll(/\b(?:let|const|var)\s+([^;\n]{1,1800})/g)){
   for(const part of m[1].split(',')){
     const id=/^\s*([A-Za-z_$][\w$]*)\s*(?:=|$)/.exec(part);
     if(id)add(types[0],id[1],file);
   }
   const destruct=/^\s*[\[{]([^\]}\n]{1,500})/.exec(m[1]);
   if(destruct)for(const part of destruct[1].split(',')){
     const id=/^\s*([A-Za-z_$][\w$]*)\s*(?:[:=]|$)/.exec(part);
     if(id)add(types[0],id[1],file);
   }
 }
 for(const m of s.matchAll(/\bfunction(?:\s+[\w$]+)?\s*\(([^)]{0,500})\)|\(([^()]{1,250})\)\s*=>|\b([A-Za-z_$][\w$]*)\s*=>/g)){
   for(const part of (m[1]||m[2]||m[3]||'').split(',')){
     const id=/^\s*([A-Za-z_$][\w$]*)/.exec(part);
     if(id)add(types[0],id[1],file);
   }
 }
 for(const m of s.matchAll(/\b(?:window|globalThis|global|self|g)\s*\.\s*([A-Za-z_$][\w$]*)\s*=/g))add(types[1],m[1],file);
 for(const m of s.matchAll(/\b(?:currentChar|currentCharacter|hero|character)\s*(?:\?\.|\.)\s*([A-Za-z_$][\w$]*)/g))add(types[2],m[1],file);
 for(const m of s.matchAll(/(?:\{|,)\s*([A-Za-z_$][\w$]*)\s*:/g))add(types[3],m[1],file);
 for(const m of source.matchAll(/\b(?:setItem|getItem|removeItem)\s*\(\s*['"]([^'"\n]{1,120})['"]/g))add(types[4],m[1],file);
}
const known={
 'index.html':'HTML-точка входа; интерфейс и порядок JS загрузки',
 'app/app.js':'главный контроллер; currentChar и все персонажи',
 'app/character.js':'лист персонажа; состояния и оружие',
 'app/combat_engine.js':'движок боя и HP; адаптеры legacy значений',
 'app/blood_hunter_engine.js':'логика класса Кровавый охотник',
 'app/cloud_sync.js':'синхронизация сохранений через Supabase',
 'app/cloud_account.js':'интерфейс авторизации и управления версиями',
 'app/cloud_config.js':'публичная конфигурация облака',
 'desktop/main.cjs':'Electron: создание окна Windows',
 'desktop/preload.cjs':'Electron: preload и мост к UI',
 'desktop/prepare.cjs':'Electron: подготовка web ресурсов',
 'desktop/update.cjs':'Electron: обновление',
 'android/app/src/main/java/com/dndvtt/app/MainActivity.java':'Android: запуск WebView',
 'android/app/src/main/java/com/dndvtt/app/DndUpdateBridge.java':'Android: bridge обновлений',
 'package.json':'npm и упаковка desktop EXE',
 '01_plansforproject.md':'план целей и критериев выполнения',
 '00_AI_PROJECT_GUIDE.md':'существующее руководство ИИ, не перезаписывать',
 'VTT_PROJECT_MANIFEST_V70.json':'устаревший список V70, не актуален',
 'tools/generate_project_atlas.cjs':'автоматический генератор этого атласа',
 '.github/workflows/project-atlas.yml':'автоматическое обновление атласа на GitHub',
 'PROJECT_ATLAS.md':'машиночитаемая карта репозитория для ИИ',
 'PROJECT_ATLAS.txt':'человекочитаемая карта репозитория'
};
function role(f){
 if(known[f])return known[f];
 const e=path.extname(f).toLowerCase(),n=path.basename(f,e).replace(/[_-]+/g,' ');
 if(f.startsWith('.github/workflows/'))return 'автоматизация GitHub Actions: '+n;
 if(f.startsWith('tests/'))return 'автотест: '+n;
 if(f.startsWith('tools/'))return 'скрипт разработчика: '+n;
 if(f.startsWith('docs/')||['.md','.txt'].includes(e))return 'документация или отчёт: '+n;
 if(f.startsWith('supabase/migrations/'))return 'SQL миграция Supabase';
 if(f.startsWith('desktop/'))return 'модуль ПК/Electron: '+n;
 if(f.startsWith('android/'))return 'Android компонент: '+n;
 if(f.startsWith('updates/'))return 'метаданные обновлений: '+n;
 if(f.startsWith('app/data/spells/'))return 'данные заклинаний: '+n;
 if(f.startsWith('app/data/classes/'))return 'логика классов: '+n;
 if(f.startsWith('app/data/subclasses/'))return 'логика подклассов: '+n;
 if(f.startsWith('app/data/feats/'))return 'черты и таланты: '+n;
 if(f.startsWith('app/3dmap/'))return 'компонент 3D карты/редактора: '+n;
 if(f.startsWith('app/assets/')||f.startsWith('wallpapers/'))return 'ассет графики/3D/интерфейса: '+n;
 if(['.glb','.gltf','.bin'].includes(e))return '3D модель/геометрия: '+n;
 if(['.png','.webp','.jpg','.svg'].includes(e))return 'текстура/изображение: '+n;
 if(e==='.mp3')return 'аудиофайл: '+n;
 if(e==='.zip')return 'архив ассетов: '+n;
 if(e==='.css')return 'оформление интерфейса: '+n;
 if(['.js','.cjs'].includes(e))return 'логический модуль: '+n;
 if(e==='.json')return 'данные/конфигурация: '+n;
 return 'вспомогательный файл: '+n;
}
const fileSizes=new Map();
for(const file of files){
 let sz=null,source=null;
 try{sz=fs.statSync(file).size;}catch(_){}
 if(file==='PROJECT_ATLAS.md'||file==='PROJECT_ATLAS.txt')sz=null;
 fileSizes.set(file,sz);
 if(!/\.(js|cjs|mjs|html|css|java|py|json)$/i.test(file))continue;
 try{source=fs.readFileSync(file,'utf8');}catch(_){continue;}
 if(/\.(js|cjs|mjs|html)$/i.test(file))scanJS(file,source);
 if(/\.(css|html)$/i.test(file))for(const m of source.matchAll(/(--[A-Za-z][\w-]*)\s*:/g))add(types[5],m[1],file);
 if(/\.(java|py)$/i.test(file))for(const m of source.matchAll(/\b([A-Za-z_]\w*)\s*(?:=|\+=|-=)/g))add(types[6],m[1],file);
 if(file.endsWith('.json'))try{
   JSON.parse(source);
   for(const m of source.matchAll(/"([A-Za-z_$][\w$-]{0,100})"\s*:/g))add(types[7],m[1],file);
 }catch(_){}
}
const rules=[
 'Перед созданием файла ищи существующий модуль по назначению и имени.',
 'Перед созданием переменной ищи её и синонимы в реестре ниже.',
 'Главный объект персонажа — currentChar в app/app.js; window.currentCharacter — совместимый алиас.',
 'Канонический формат НОВЫХ полей HP: hpCurrent, hpMax, hpTemp. Унаследованные hp, hp.current, hitPoints, currentHP, maxHp и tempHp не удалять без полной миграции данных.',
 'Ресурсы/состояния класса: currentChar.resources и currentChar.classFeaturesState; бой — currentChar.encounters, currentChar.initiativeTracker.',
 'Сохранения: app/app.js; облачный аккаунт: app/cloud_sync.js и app/cloud_account.js; существующий ключ dnd_multi_characters_v2.',
 'Перед рефакторингом проверять реальные вызовы, загрузку из index.html, сохранения и тесты Android + Windows.',
 '00_AI_PROJECT_GUIDE.md и 01_plansforproject.md сохраняются; атлас не заменяет эти документы.',
 'Имена определены статическим поиском, не JS AST: динамические поля и нестандартная деструктуризация могут быть не найдены. Из похожих имён НЕ следует, что одно можно удалить.'
];
const md=['# DnD-VTT — полный атлас проекта','',
 'Снимок кода '+revision+'. Git содержит '+files.length+' файлов.',
 'Роль неочевидных файлов предварительно определена по пути/имени; перед изменением читай исходник.','',
 '## Стандарт для всех ИИ и разработчиков','',...rules.map(x=>'- '+x),'',
 '## Каждый файл в репозитории','',
 '| Полный путь | Размер | Назначение и роль |','|---|---:|---|'];
const txt=['АТЛАС РЕПОЗИТОРИЯ DnD-VTT','Коммит '+revision+'. Файлов: '+files.length,'',
 'ЕДИНЫЙ СТАНДАРТ','',...rules.map((x,i)=>(i+1)+'. '+x),'','ВСЕ ФАЙЛЫ'];
const esc=s=>String(s).replace(/\|/g,'\\|').replace(/\n/g,' ');
for(let i=0;i<files.length;i++){
 const f=files[i],size=fileSizes.get(f)===null?'генерируется':fileSizes.get(f)+' B';
 md.push('| '+esc(f)+' | '+size+' | '+esc(role(f))+' |');
 txt.push(String(i+1).padStart(4,'0')+'. '+f+' — '+role(f)+' ('+size+')');
}
md.push('','## Реестр имён, переменных и ключей','',
 'Имена сгруппированы по роли. Каждый идентификатор приводится отдельно, с местами нахождения (первые четыре файла).',
 'Локальные параметры нельзя путать с полями сериализуемого персонажа, глобальными API или ключами localStorage.','');
txt.push('','РЕЕСТР СТАТИЧЕСКИ ОБНАРУЖЕННЫХ ИМЁН');
for(const category of types){
 const arr=[...registry.get(category)].sort((a,b)=>a[0].localeCompare(b[0]));
 md.push('','### '+category+' ('+arr.length+')','','| Имя | Исходные файлы |','|---|---|');
 txt.push('','--- '+category+' ('+arr.length+') ---');
 for(const [key,set] of arr){
   const ref=[...set].sort(),list=ref.slice(0,4).join(', ')+(ref.length>4?' (+ '+(ref.length-4)+' ещё)':'');
   md.push('| '+esc(key)+' | '+esc(list)+' |');
   txt.push(key+' — '+list);
 }
}
const blobs=new Map();
for(const line of git('ls-files','-s').split('\n')){
 const m=/^\d+ ([a-f0-9]{40}) \d+\t(.+)$/.exec(line);
 if(m&&m[2]!=='PROJECT_ATLAS.md'&&m[2]!=='PROJECT_ATLAS.txt'){
  if(!blobs.has(m[1]))blobs.set(m[1],[]);
  blobs.get(m[1]).push(m[2]);
 }
}
const duplicates=[...blobs.values()].filter(a=>a.length>1).sort((a,b)=>b.length-a.length);
md.push('','## Файлы с совпадающим Git SHA','','Совпадение содержимого не означает, что путь можно удалить.','');
txt.push('','ФАЙЛЫ С ОДИНАКОВЫМ СОДЕРЖИМЫМ');
if(!duplicates.length){md.push('Совпадений не найдено.');txt.push('Совпадений не найдено.');}
for(const d of duplicates){md.push('- '+d.map(esc).join(' ; '));txt.push(d.join(' ; '));}
md.push('','## Обновление индекса','','После изменения проекта выполнить node tools/generate_project_atlas.cjs и коммитить обе версии.','');
txt.push('','Обновление: node tools/generate_project_atlas.cjs','');
fs.writeFileSync('PROJECT_ATLAS.md',md.join('\n')+'\n','utf8');
fs.writeFileSync('PROJECT_ATLAS.txt',txt.join('\n')+'\n','utf8');
console.log('Indexed '+files.length+' files; symbols: '+types.map(x=>x+'='+registry.get(x).size).join(', '));
