/**
 * Crafting Engine v31: единая система изготовления оружия, брони, аксессуаров,
 * алхимической тары, карт, бумаги, стекла, керамики, инструментов и расходников.
 * Как работает: проверяет владение инструментами, наличие материалов и времени,
 * выполняет проверку ремесла, списывает компоненты и создаёт предмет в инвентаре.
 * Основные переменные: DND_CRAFTING_V31, MATERIALS, RECIPES, currentCharacter,
 * proficiencyIds, skillBonus, DC, quality, station, inventory.
 */
(function(global){'use strict';
const MATERIALS=[
{id:'iron',name:'Железо',cat:'metal',rarity:'common',price:1,weight:1},{id:'steel',name:'Сталь',cat:'metal',rarity:'common',price:2,weight:1},{id:'mithral',name:'Мифрил',cat:'metal',rarity:'very_rare',price:75,weight:1},{id:'adamantine',name:'Адамантин',cat:'metal',rarity:'very_rare',price:100,weight:1},{id:'silver',name:'Серебро',cat:'metal',rarity:'uncommon',price:5,weight:1},{id:'copper',name:'Медь',cat:'metal',rarity:'common',price:.5,weight:1},
{id:'wood',name:'Древесина',cat:'wood',rarity:'common',price:.1,weight:1},{id:'hardwood',name:'Твёрдая древесина',cat:'wood',rarity:'uncommon',price:1,weight:1},{id:'darkwood',name:'Тенедревесина',cat:'wood',rarity:'rare',price:10,weight:1},
{id:'leather',name:'Кожа',cat:'hide',rarity:'common',price:1,weight:.5},{id:'hide',name:'Шкура',cat:'hide',rarity:'common',price:2,weight:1},{id:'dragonScale',name:'Драконья чешуя',cat:'hide',rarity:'very_rare',price:75,weight:.5},{id:'spiderSilk',name:'Паучий шёлк',cat:'fiber',rarity:'rare',price:15,weight:.2},
{id:'cloth',name:'Ткань',cat:'fiber',rarity:'common',price:.5,weight:.2},{id:'thread',name:'Нить',cat:'fiber',rarity:'common',price:.1,weight:.1},{id:'paper',name:'Бумага',cat:'paper',rarity:'common',price:.2,weight:.05},{id:'parchment',name:'Пергамент',cat:'paper',rarity:'common',price:1,weight:.05},
{id:'glass',name:'Стекло',cat:'glass',rarity:'common',price:1,weight:.2},{id:'crystal',name:'Кристалл',cat:'glass',rarity:'uncommon',price:10,weight:.2},{id:'clay',name:'Глина',cat:'ceramic',rarity:'common',price:.1,weight:1},{id:'ceramic',name:'Керамика',cat:'ceramic',rarity:'common',price:1,weight:.5},{id:'charcoal',name:'Древесный уголь',cat:'fuel',rarity:'common',price:.1,weight:.5},{id:'salt',name:'Соль',cat:'reagent',rarity:'common',price:.05,weight:.2},{id:'resin',name:'Смола',cat:'reagent',rarity:'common',price:.5,weight:.2},{id:'wax',name:'Воск',cat:'reagent',rarity:'common',price:.2,weight:.2},
{id:'gem',name:'Драгоценный камень',cat:'gem',rarity:'rare',price:50,weight:.1},{id:'ink',name:'Чернила',cat:'reagent',rarity:'common',price:5,weight:.05},{id:'herb',name:'Сушёные травы',cat:'reagent',rarity:'common',price:1,weight:.1},{id:'monsterPart',name:'Часть чудовища',cat:'monster',rarity:'uncommon',price:10,weight:.2}
];
const RECIPES=[];
function r(id,name,category,dc,time,tools,materials,extra={}){RECIPES.push({id,name,category,dc,time,tools,materials,...extra});}
// Оружие
r('dagger','Кинжал','weapons',10,4,['smith'],{iron:1,leather:1},{damage:'1d4',damageType:'колющий',weight:1,cost:'2 зм',properties:['Finesse','Light','Thrown']});
r('shortsword','Короткий меч','weapons',11,8,['smith'],{steel:2,leather:1},{damage:'1d6',damageType:'колющий',weight:2,cost:'10 зм',properties:['Finesse','Light']});
r('longsword','Длинный меч','weapons',12,10,['smith'],{steel:3,leather:1},{damage:'1d8',damageType:'рубящий',weight:3,cost:'15 зм',properties:['Versatile']});
r('greatsword','Двуручный меч','weapons',14,18,['smith'],{steel:6,leather:1},{damage:'2d6',damageType:'рубящий',weight:6,cost:'50 зм',properties:['Heavy','Two-Handed']});
r('rapier','Рапира','weapons',13,10,['smith'],{steel:2,silver:1,leather:1},{damage:'1d8',damageType:'колющий',weight:2,cost:'25 зм',properties:['Finesse']});
r('mace','Булава','weapons',10,6,['smith'],{iron:2,wood:1},{damage:'1d6',damageType:'дробящий',weight:4,cost:'5 зм',properties:[]});
r('battleaxe','Боевой топор','weapons',12,9,['smith'],{steel:2,wood:1,leather:1},{damage:'1d8',damageType:'рубящий',weight:4,cost:'10 зм',properties:['Versatile']});
r('warhammer','Боевой молот','weapons',12,9,['smith'],{steel:2,wood:1},{damage:'1d8',damageType:'дробящий',weight:2,cost:'15 зм',properties:['Versatile']});
r('spear','Копьё','weapons',9,4,['smith','woodwork'],{steel:1,wood:2,leather:1},{damage:'1d6',damageType:'колющий',weight:3,cost:'1 зм',properties:['Thrown','Versatile']});
r('shield','Щит','armor',12,8,['smith','leatherwork'],{wood:3,steel:1,leather:1},{ac:2,weight:6,cost:'10 зм',category:'Щит'});
r('shortbow','Короткий лук','weapons',11,8,['woodwork'],{hardwood:2,leather:1,thread:1},{damage:'1d6',damageType:'колющий',weight:2,cost:'25 зм',properties:['Ammunition','Two-Handed']});
r('longbow','Длинный лук','weapons',13,14,['woodwork'],{hardwood:4,leather:1,thread:2},{damage:'1d8',damageType:'колющий',weight:2,cost:'50 зм',properties:['Ammunition','Heavy','Two-Handed']});
r('crossbow','Арбалет','weapons',13,12,['woodwork','smith'],{steel:2,hardwood:2,leather:1,thread:2},{damage:'1d8',damageType:'колющий',weight:5,cost:'25 зм',properties:['Ammunition','Loading','Two-Handed']});
// Броня
r('leatherArmor','Кожаный доспех','armor',10,10,['leatherwork'],{leather:4,thread:2},{ac:11,weight:10,cost:'10 зм',category:'Лёгкий доспех'});
r('studdedLeather','Клёпаная кожа','armor',12,14,['leatherwork','smith'],{leather:5,iron:2,thread:2},{ac:12,weight:13,cost:'45 зм',category:'Лёгкий доспех'});
r('chainShirt','Кольчуга','armor',13,20,['smith'],{steel:8},{ac:13,weight:20,cost:'50 зм',category:'Средний доспех'});
r('breastplate','Кираса','armor',14,18,['smith'],{steel:8,leather:2},{ac:14,weight:20,cost:'400 зм',category:'Средний доспех'});
r('chainmail','Кольчужная рубаха','armor',14,24,['smith'],{steel:12,leather:2},{ac:16,weight:55,cost:'75 зм',category:'Тяжёлый доспех'});
r('plate','Латы','armor',17,40,['smith'],{steel:24,leather:3},{ac:18,weight:65,cost:'1500 зм',category:'Тяжёлый доспех'});
r('mithralArmor','Мифриловая броня','armor',18,36,['smith'],{mithral:12,leather:2,thread:2},{ac:16,weight:25,cost:'1500+ зм',category:'Средний доспех',rarity:'very_rare',special:'Не имеет ограничения Силы и помехи скрытности по решению мастера.'});
r('dragonScaleArmor','Доспех из драконьей чешуи','armor',18,30,['leatherwork'],{dragonScale:12,leather:3,thread:2},{ac:14,weight:20,cost:'500+ зм',category:'Средний доспех',rarity:'very_rare',special:'Выбери сопротивление, связанное с видом чешуи.'});
// Аксессуары
r('amulet','Амулет','armor',10,6,['jeweler'],{silver:1,gem:1,thread:1},{category:'Аксессуар',weight:.1,cost:'20 зм'});
r('ring','Кольцо','armor',11,5,['jeweler'],{silver:1,gem:1},{category:'Аксессуар',weight:.05,cost:'25 зм'});
r('goggles','Защитные очки','armor',10,5,['glasswork','leatherwork'],{glass:2,leather:1,thread:1},{category:'Аксессуар',weight:.2,cost:'10 зм'});
r('cloak','Плотный плащ','armor',9,5,['weaver'],{cloth:3,thread:2},{category:'Аксессуар',weight:2,cost:'5 зм'});
// Алхимическая тара
r('vial','Стеклянный флакон','materials',8,1,['glasswork'],{glass:1},{category:'Стекло',weight:.1,cost:'1 зм'});
r('alchemistBottle','Алхимическая бутылочка','materials',10,2,['glasswork'],{glass:2,clay:1},{category:'Стекло',weight:.2,cost:'3 зм'});
r('crucible','Керамический тигель','materials',10,3,['pottery'],{clay:3,charcoal:1},{category:'Керамика',weight:2,cost:'5 зм'});
r('retort','Перегонная колба','materials',13,5,['glasswork','alchemy'],{glass:3,ceramic:1},{category:'Алхимия',weight:1,cost:'15 зм'});
r('sealedJar','Герметичная банка','materials',9,2,['pottery'],{ceramic:2,wax:1},{category:'Керамика',weight:1,cost:'2 зм'});
// Бумага, карты, книги
r('paperBundle','Стопка бумаги','materials',8,2,['scribe'],{paper:10,thread:1},{category:'Бумага',weight:.5,cost:'2 зм',quantity:10});
r('parchmentBundle','Стопка пергамента','materials',9,3,['scribe','leatherwork'],{parchment:10,thread:1},{category:'Пергамент',weight:.5,cost:'10 зм',quantity:10});
r('map','Карта местности','materials',12,8,['cartographer','scribe'],{paper:2,ink:1,thread:1},{category:'Карта',weight:.1,cost:'10 зм',special:'Точность зависит от инструментов и проверки.'});
r('spellbook','Пустая книга заклинаний','materials',12,10,['scribe'],{parchment:30,leather:2,thread:3,ink:2},{category:'Книга',weight:3,cost:'50 зм'});
// Керамика/стекло/хлам как полноценный крафт
r('bowl','Керамическая миска','junk',8,1,['pottery'],{clay:2},{category:'Посуда',weight:1,cost:0.02});
r('cup','Керамическая кружка','junk',8,1,['pottery'],{clay:1},{category:'Посуда',weight:.5,cost:0.01});
r('glassBottle','Стеклянная бутылка','junk',8,1,['glasswork'],{glass:2},{category:'Стекло',weight:.3,cost:0.5});
r('lens','Стеклянная линза','materials',14,4,['glasswork'],{glass:2,crystal:1},{category:'Оптика',weight:.2,cost:'20 зм'});
r('candle','Свеча','consumables',7,1,['weaver'],{wax:1,thread:1},{category:'Расходник',weight:.1,cost:0.01,quantity:2});
r('torch','Факел','consumables',7,1,['woodwork'],{wood:1,cloth:1,resin:1},{category:'Расходник',weight:1,cost:0.01,quantity:2});
// Материалы высокого уровня
r('silverWire','Серебряная проволока','materials',11,3,['smith'],{silver:2},{category:'Материал',weight:.2,cost:'10 зм'});
r('adamantineEdge','Адамантиновая заточка','materials',17,12,['smith'],{adamantine:1,steel:2,charcoal:1},{category:'Модификатор',weight:.2,cost:'150 зм',special:'Можно применить к подходящему оружию по решению мастера.'});
r('mithralWire','Мифриловая нить','materials',17,8,['smith','weaver'],{mithral:1,thread:2},{category:'Материал',weight:.1,cost:'100 зм'});
// Боеприпасы и расходники
r('arrows','Стрелы','consumables',9,2,['woodwork'],{wood:2,steel:1,thread:1},{category:'Боеприпасы',weight:1,cost:'1 зм',quantity:20});
r('bolts','Арбалетные болты','consumables',9,2,['woodwork','smith'],{wood:2,steel:1,thread:1},{category:'Боеприпасы',weight:1.5,cost:'1 зм',quantity:20});
r('oil','Масло','consumables',8,2,['alchemy'],{resin:1,glass:1},{category:'Расходник',weight:1,cost:'1 зм',quantity:2});
r('antitoxinVial','Пустой флакон антидота','materials',9,2,['alchemy','glasswork'],{glass:1,herb:1,charcoal:1},{category:'Алхимия',weight:.1,cost:'2 зм'});
const TOOL_LABELS={smith:'Кузнечные инструменты',woodwork:'Плотницкие инструменты',leatherwork:'Инструменты кожевника',glasswork:'Инструменты стеклодува',pottery:'Гончарные инструменты',weaver:'Инструменты ткача',jeweler:'Ювелирные инструменты',scribe:'Каллиграфические инструменты',cartographer:'Инструменты картографа',alchemy:'Инструменты алхимика'};
const TOOL_IDS={smith:['smith','p_smith_tools','кузнечные инструменты','smiths tools'],woodwork:['woodwork','p_carpenter_tools','плотницкие инструменты','carpenters tools'],leatherwork:['leatherwork','p_leatherworker_tools','инструменты кожевника','leatherworker tools'],glasswork:['glasswork','p_glassblower_tools','инструменты стеклодува','glassblowers tools'],pottery:['pottery','p_potter_tools','гончарные инструменты','potter tools'],weaver:['weaver','p_weaver_tools','инструменты ткача','weaver tools'],jeweler:['jeweler','p_jeweler_tools','ювелирные инструменты','jeweler tools'],scribe:['scribe','p_calligrapher_tools','каллиграфические инструменты','calligrapher supplies'],cartographer:['cartographer','p_cartographer_tools','инструменты картографа','cartographers tools'],alchemy:['alchemy','p_alchemist_tools','инструменты алхимика','alchemists supplies']};
function char(){return global.currentCharacter||global.currentChar||null;}
function inv(){const c=char();if(!c)return null;c.inventory=c.inventory||{weapons:[],armor:[],consumables:[],materials:[],junk:[]};return c.inventory;}
function profs(){const c=char();return (c&&c.proficiencies)||[];}
function hasTool(tool){const p=profs().map(x=>typeof x==='object'?(x.id||x.name||''):String(x)).map(x=>String(x).toLowerCase());const aliases=TOOL_IDS[tool]||[tool];return aliases.some(a=>p.includes(String(a).toLowerCase())||p.some(x=>x.includes(String(a).toLowerCase())));}
function qty(name){const v=inv();if(!v)return 0;let n=0;Object.values(v).forEach(list=>(list||[]).forEach(i=>{if(i.materialId===name||i.craftMaterialId===name||String(i.name).toLowerCase()===String((MATERIALS.find(m=>m.id===name)||{}).name||'').toLowerCase())n+=Number(i.count)||0;}));return n;}
function materialLabel(id){return MATERIALS.find(x=>x.id===id)?.name||id;}
function canPay(recipe){return Object.entries(recipe.materials).every(([id,n])=>qty(id)>=n);}
function consume(id,n){const v=inv();let left=n;for(const cat of Object.keys(v)){for(let i=v[cat].length-1;i>=0&&left>0;i--){const item=v[cat][i];if(item.materialId===id||item.craftMaterialId===id||String(item.name).toLowerCase()===materialLabel(id).toLowerCase()){const take=Math.min(left,Number(item.count)||1);item.count-=take;left-=take;if(item.count<=0)v[cat].splice(i,1);}}}return left<=0;}
function add(category,item){if(typeof global.addItemToInventory==='function')global.addItemToInventory(category,item.name,item.count||1,item);else{const v=inv();v[category]=v[category]||[];v[category].push(item);}}
function skillBonus(){const c=char()||{};if(typeof global.DND_RULES_ENGINE?.getSkillBonus==='function')return Number(global.DND_RULES_ENGINE.getSkillBonus(c,'crafting'))||0;return Number(c.proficiencyBonus||2);}
function craft(recipeId){const recipe=RECIPES.find(x=>x.id===recipeId);if(!recipe)return{ok:false,error:'Рецепт не найден'};if(!char())return{ok:false,error:'Нет активного персонажа'};const missing=Object.entries(recipe.materials).filter(([id,n])=>qty(id)<n).map(([id,n])=>`${materialLabel(id)} ×${n-qty(id)}`);if(missing.length)return{ok:false,error:'Не хватает материалов',missing};const absent=recipe.tools.filter(t=>!hasTool(t));if(absent.length)return{ok:false,error:'Нет владения инструментами',missingTools:absent.map(t=>TOOL_LABELS[t]||t)};const roll=Math.floor(Math.random()*20)+1, bonus=skillBonus(), total=roll+bonus, success=total>=recipe.dc;Object.entries(recipe.materials).forEach(([id,n])=>consume(id,n));if(!success){if(typeof global.autoSaveCurrentCharacter==='function')global.autoSaveCurrentCharacter();if(typeof global.renderInventory==='function')global.renderInventory();return{ok:false,failed:true,roll,bonus,total,dc:recipe.dc,error:`Проверка ремесла провалена (${total} против DC ${recipe.dc}). Материалы испорчены.`};}const quality=total>=recipe.dc+10?'exceptional':total>=recipe.dc+5?'fine':'standard';const item={name:recipe.name,count:recipe.quantity||1,crafted:true,craftRecipe:recipe.id,craftQuality:quality,craftTime:recipe.time,craftTools:recipe.tools.map(t=>TOOL_LABELS[t]||t),...Object.fromEntries(Object.entries(recipe).filter(([k])=>['damage','damageType','weight','cost','properties','ac','category','rarity','special'].includes(k)))};add(recipe.category,item);if(typeof global.autoSaveCurrentCharacter==='function')global.autoSaveCurrentCharacter();if(typeof global.renderInventory==='function')global.renderInventory();return{ok:true,roll,bonus,total,dc:recipe.dc,quality,item};}
function grantMaterial(id,count=1){const m=MATERIALS.find(x=>x.id===id);if(!m)return false;add('materials',{name:m.name,count,materialId:m.id,craftMaterialId:m.id,weight:m.weight,cost:m.price,rarity:m.rarity,category:'Материал'});return true;}
function render(){const host=document.getElementById('craftingPanel');if(!host)return;host.innerHTML=`<div style="padding:10px;background:#171717;border:1px solid #4b3a20;border-radius:8px;margin-top:10px"><h3 style="margin:0;color:#d7b86e">🔨 Мастерская и крафт</h3><div style="font-size:.78em;color:#aaa;margin:5px 0 8px">Выбери предмет. Система проверит материалы, инструменты и выполнит проверку ремесла. Чем выше результат — тем лучше качество.</div><input id="craftSearch" placeholder="Поиск рецепта..." style="width:100%;box-sizing:border-box;padding:8px;background:#222;color:#fff;border:1px solid #444;border-radius:5px" oninput="DND_CRAFTING_V31.renderList()"><div id="craftList" style="max-height:420px;overflow:auto;margin-top:7px"></div><div id="craftResult" style="margin-top:7px"></div></div>`;renderList();}
function renderList(){const list=document.getElementById('craftList');if(!list)return;const q=(document.getElementById('craftSearch')?.value||'').toLowerCase();list.innerHTML='';RECIPES.filter(x=>!q||x.name.toLowerCase().includes(q)||x.category.includes(q)).forEach(x=>{const d=document.createElement('div');d.style.cssText='padding:8px;margin-bottom:5px;background:#26221a;border:1px solid #403825;border-radius:6px;font-size:.78em';const mats=Object.entries(x.materials).map(([id,n])=>`${materialLabel(id)} ×${n}`).join(' · ');d.innerHTML=`<div style="display:flex;justify-content:space-between;gap:6px"><b>${x.name}</b><span>DC ${x.dc} · ${x.time}ч</span></div><div style="color:#aaa;margin:3px 0">${mats}</div><div style="color:#c9b98c">🔧 ${x.tools.map(t=>TOOL_LABELS[t]||t).join(', ')}</div><button class="btn-action" style="width:100%;margin-top:5px;background:#6d4c41" onclick="DND_CRAFTING_V31.uiCraft('${x.id}')">🔨 Изготовить</button>`;list.appendChild(d);});}
function uiCraft(id){const r=craft(id),e=document.getElementById('craftResult');if(e)e.innerHTML=r.ok?`<div style="padding:8px;background:#1d2a1f;border:1px solid #4b7052;border-radius:6px">✅ ${r.item.name}<br>Качество: <b>${r.quality}</b><br>Проверка: ${r.total} (d20 ${r.roll} + ${r.bonus}) против DC ${r.dc}</div>`:`<div style="padding:8px;background:#321b1b;border:1px solid #7f3b3b;border-radius:6px">❌ ${r.error}<br>${r.missing?.join(', ')||''}${r.missingTools?.length?'<br>Нужны: '+r.missingTools.join(', '):''}</div>`;}
const API={MATERIALS,RECIPES,TOOL_LABELS,craft,grantMaterial,render,renderList,hasTool,quantity:qty};global.DND_CRAFTING_V31=API;global.dndCraft=craft;document.addEventListener('DOMContentLoaded',()=>setTimeout(render,250));
})(window);
