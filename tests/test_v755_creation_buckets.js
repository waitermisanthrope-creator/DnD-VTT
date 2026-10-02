/** V70.32.14 — character-creation content bucket contract tests. */
const fs=require('fs'),vm=require('vm'),assert=require('assert'),path=require('path');
const src=fs.readFileSync(path.join(__dirname,'..','app','character_builder_v2.js'),'utf8');
const classicClasses=['Варвар','Бард','Жрец','Друид','Воин','Монах','Паладин','Следопыт','Плут','Чародей','Колдун','Волшебник','Изобретатель'];
const extraClasses=[
  {name:'Рой',isExtra:true,replacesRace:true},
  {name:'Паразит',isExtra:true,replacesRace:true},
  {name:'Паразит доктора Вальтера',isExtra:true,replacesRace:true},
  {name:'Призрак',isExtra:true,replacesRace:true},
  {name:'Гайст',isExtra:true,replacesRace:true}
];
const homebrewClasses=['Алхимик','Оккультист','Ведьма','Кровавый охотник','Пугилист','Страж','Военачальник','Псионик'];
const records=classicClasses.map(name=>({name,hitDie:8})).concat(homebrewClasses.map(name=>({name,hitDie:8})),extraClasses);
const standardRaceIds=['human','human_variant','elf_high','elf_wood','elf_drow','dwarf_hill','dwarf_mountain','halfling_lightfoot','halfling_stout','dragonborn','gnome_rock','gnome_forest','half_elf','half_orc','tiefling'];
const races=standardRaceIds.map(id=>({id,name:id})).concat([{id:'aarakocra',name:'Ааракокра'},{id:'custom_test',name:'Своя раса'}]);
const classicBgs=['Прислужник','Шарлатан','Преступник','Артист','Народный герой','Гильдийский ремесленник','Отшельник','Благородный','Дикарь','Мудрец','Мореход','Солдат','Беспризорник'];
const backgrounds=classicBgs.map(nameRu=>({nameRu,name:nameRu})).concat([{nameRu:'Рунный резчик',name:'Rune Carver'},{nameRu:'Привратник',name:'Gate Warden'}]);
const ctx={console,DND_CLASSES_LIST:records,DEFAULT_RACES:races,dndBackgrounds:backgrounds,getAllRaces:()=>races,getAllBackgrounds:()=>backgrounds,CLASSES_REFERENCE:{}};
ctx.window=ctx;ctx.globalThis=ctx;
vm.createContext(ctx);
vm.runInContext(src,ctx,{filename:'character_builder_v2.js'});
const filters=ctx.DND_CREATION_CONTENT_FILTERS;
assert(filters,'shared creation content filters missing');
const names=xs=>Array.from(xs,x=>x.name);
const ids=xs=>Array.from(xs,x=>x.id);
assert.deepStrictEqual(names(filters.classes('classic')),classicClasses,'classic parchment must contain only the 13 standard classes');
assert.deepStrictEqual(names(filters.classes('homebrew')),homebrewClasses,'homebrew parchment must contain only non-extra homebrew classes');
assert.deepStrictEqual(names(filters.classes('constructor')),classicClasses.concat(homebrewClasses),'constructor must combine classic and homebrew classes without Extra');
assert.deepStrictEqual(names(filters.classes('constructor')).filter(n=>extraClasses.some(x=>x.name===n)),[],'constructor must exclude every Extra class');
assert.deepStrictEqual(ids(filters.races('classic')),standardRaceIds,'classic parchment must contain only standard race IDs');
assert.deepStrictEqual(ids(filters.races('homebrew')),['aarakocra','custom_test'],'homebrew parchment must exclude standard race IDs');
assert.deepStrictEqual(ids(filters.races('constructor')),races.map(r=>r.id),'constructor must include classic plus homebrew races');
assert.deepStrictEqual(names(filters.backgrounds('classic')),classicBgs,'classic parchment must contain only the 13 standard backgrounds');
assert.deepStrictEqual(names(filters.backgrounds('homebrew')),['Рунный резчик','Привратник'],'homebrew parchment must exclude standard backgrounds');
assert.deepStrictEqual(names(filters.backgrounds('constructor')),backgrounds.map(b=>b.nameRu),'constructor must include classic plus homebrew backgrounds');
console.log('PASS character creation content buckets');
