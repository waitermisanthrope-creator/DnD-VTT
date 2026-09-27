/**
 * Crafting Professions v33: расширяет общий крафт отдельными ремесленными профессиями.
 * Как работает: добавляет ювелира, ткача, плотника, кожевника, кузнеца, гончара,
 * стеклодува, каллиграфа/картографа и дополнительные профессии с цепочками сырьё →
 * компонент → готовый предмет. Проверяет владение инструментами, материалы, DC и
 * качество результата; не меняет боевую систему и не трогает защищённые Wallpapers.js
 * или Ambiences.js. Основные переменные: DND_CRAFT_PROFESSIONS_V33, PROFESSIONS,
 * RECIPES, material inventory, currentCharacter/currentChar, roll, quality.
 */
(function(global){'use strict';
const base=global.DND_CRAFTING_V31;
if(!base)return;
const PROFESSIONS={
  smith:{name:'Кузнец',icon:'🔥',tool:'smith',desc:'Металл, оружие, броня, крепления и металлические компоненты.'},
  jeweler:{name:'Ювелир',icon:'💎',tool:'jeweler',desc:'Кольца, амулеты, оправы, украшения и обработка камней.'},
  weaver:{name:'Ткач',icon:'🧵',tool:'weaver',desc:'Ткань, нити, одежда, плащи, подкладки и вышивка.'},
  woodwork:{name:'Плотник',icon:'🪵',tool:'woodwork',desc:'Древесина, рукояти, луки, древки, щиты и деревянные компоненты.'},
  leatherwork:{name:'Кожевник',icon:'🐺',tool:'leatherwork',desc:'Кожа, ремни, ножны, лёгкая броня и кожаные компоненты.'},
  pottery:{name:'Гончар',icon:'🏺',tool:'pottery',desc:'Керамика, сосуды, тигли, печные формы и ёмкости.'},
  glasswork:{name:'Стеклодув',icon:'🪟',tool:'glasswork',desc:'Стекло, флаконы, линзы, колбы и хрупкие компоненты.'},
  scribe:{name:'Каллиграф',icon:'✒️',tool:'scribe',desc:'Бумага, пергамент, книги, свитки и письменные заготовки.'},
  cartographer:{name:'Картограф',icon:'🗺️',tool:'cartographer',desc:'Карты, атласы, схемы местности и навигационные материалы.'},
  alchemy:{name:'Алхимик',icon:'⚗️',tool:'alchemy',desc:'Растворители, реагенты и сосуды для Alchemy 2.0.'},
  cook:{name:'Повар',icon:'🍲',tool:'cook',desc:'Пайки, блюда, настои и длительные пищевые эффекты.'},
  tinkerer:{name:'Механик',icon:'⚙️',tool:'tinker',desc:'Механизмы, шестерни, замки, ловушки и мелкие устройства.'}
};
const RECIPES=[
 {id:'jewel_cut_gem',name:'Огранённый драгоценный камень',profession:'jeweler',dc:12,time:4,materials:{gem:1},output:{cat:'materials',name:'Огранённый драгоценный камень',materialId:'cutGem',count:1,rarity:'rare',craftValue:65}},
 {id:'jewel_setting',name:'Ювелирная оправа',profession:'jeweler',dc:11,time:3,materials:{silver:2,gem:1},output:{cat:'materials',name:'Ювелирная оправа с камнем',materialId:'gemSetting',count:1,rarity:'rare',craftValue:80}},
 {id:'jewel_silver_ring',name:'Серебряное кольцо',profession:'jeweler',dc:10,time:2,materials:{silver:1},output:{cat:'armor',name:'Серебряное кольцо',count:1,category:'Аксессуар',weight:.05,cost:'15 зм',craftValue:15}},
 {id:'jewel_amulet',name:'Амулет с оправой',profession:'jeweler',dc:13,time:4,materials:{silver:1,gem:1,thread:1},output:{cat:'armor',name:'Амулет с камнем',count:1,category:'Аксессуар',weight:.1,cost:'35 зм',craftValue:35}},
 {id:'jewel_wire',name:'Ювелирная проволока',profession:'jeweler',dc:9,time:1,materials:{silver:1},output:{cat:'materials',name:'Тонкая серебряная проволока',materialId:'jewelerWire',count:2,rarity:'uncommon'}},
 {id:'weave_cloth',name:'Рулон ткани',profession:'weaver',dc:9,time:3,materials:{thread:6},output:{cat:'materials',name:'Рулон ткани',materialId:'cloth',count:3,rarity:'common'}},
 {id:'weave_silk',name:'Паучий шёлк',profession:'weaver',dc:14,time:6,materials:{spiderSilk:2,thread:2},output:{cat:'materials',name:'Тонкий паучий шёлк',materialId:'fineSilk',count:2,rarity:'rare'}},
 {id:'weave_padding',name:'Мягкая подкладка',profession:'weaver',dc:10,time:3,materials:{cloth:2,thread:2},output:{cat:'materials',name:'Мягкая подкладка',materialId:'padding',count:1,rarity:'common'}},
 {id:'weave_cloak',name:'Путевой плащ',profession:'weaver',dc:10,time:5,materials:{cloth:4,thread:2},output:{cat:'armor',name:'Путевой плащ',count:1,category:'Одежда',weight:2,cost:'8 зм',craftValue:8}},
 {id:'weave_robe',name:'Усиленная мантия',profession:'weaver',dc:13,time:8,materials:{cloth:4,thread:4,padding:1},output:{cat:'armor',name:'Усиленная мантия',count:1,category:'Одежда',weight:3,cost:'30 зм',craftValue:30}},
 {id:'wood_handle',name:'Мастерская рукоять',profession:'woodwork',dc:9,time:2,materials:{hardwood:1,leather:1},output:{cat:'materials',name:'Мастерская рукоять',materialId:'weaponHandle',count:1}},
 {id:'wood_shaft',name:'Усиленное древко',profession:'woodwork',dc:10,time:2,materials:{hardwood:2,leather:1},output:{cat:'materials',name:'Усиленное древко',materialId:'weaponShaft',count:1}},
 {id:'wood_bowstave',name:'Луковая заготовка',profession:'woodwork',dc:12,time:5,materials:{hardwood:3,resin:1,thread:1},output:{cat:'materials',name:'Луковая заготовка',materialId:'bowStave',count:1}},
 {id:'wood_shield_core',name:'Основа щита',profession:'woodwork',dc:11,time:4,materials:{wood:3,hardwood:1,leather:1},output:{cat:'materials',name:'Основа щита',materialId:'shieldCore',count:1}},
 {id:'leather_strip',name:'Набор кожаных ремней',profession:'leatherwork',dc:8,time:2,materials:{leather:2},output:{cat:'materials',name:'Набор кожаных ремней',materialId:'leatherStrap',count:4}},
 {id:'leather_sheath',name:'Ножны',profession:'leatherwork',dc:10,time:3,materials:{leather:2,thread:1,wood:1},output:{cat:'materials',name:'Ножны',materialId:'scabbard',count:1}},
 {id:'leather_bag',name:'Поясная сумка',profession:'leatherwork',dc:9,time:2,materials:{leather:2,thread:2},output:{cat:'junk',name:'Поясная сумка',count:1,category:'Снаряжение',weight:.5,cost:'1 зм'}},
 {id:'leather_gloves',name:'Кожаные перчатки',profession:'leatherwork',dc:10,time:3,materials:{leather:2,thread:1},output:{cat:'armor',name:'Кожаные перчатки',count:1,category:'Одежда',weight:.2,cost:'2 зм'}},
 {id:'pottery_vial',name:'Керамический флакон',profession:'pottery',dc:8,time:1,materials:{clay:1},output:{cat:'materials',name:'Керамический флакон',materialId:'ceramicVial',count:1}},
 {id:'pottery_crucible',name:'Усиленный тигель',profession:'pottery',dc:12,time:4,materials:{clay:4,charcoal:2},output:{cat:'materials',name:'Усиленный тигель',materialId:'strongCrucible',count:1}},
 {id:'pottery_sealed',name:'Ритуальная герметичная банка',profession:'pottery',dc:12,time:3,materials:{ceramic:2,wax:1},output:{cat:'materials',name:'Герметичная банка',materialId:'sealedJar',count:1}},
 {id:'pottery_filter',name:'Керамический фильтр',profession:'pottery',dc:11,time:3,materials:{clay:2,charcoal:1},output:{cat:'materials',name:'Керамический фильтр',materialId:'ceramicFilter',count:1}},
 {id:'glass_vial',name:'Тонкий флакон',profession:'glasswork',dc:9,time:1,materials:{glass:1},output:{cat:'materials',name:'Тонкий флакон',materialId:'thinVial',count:2}},
 {id:'glass_lens',name:'Точная линза',profession:'glasswork',dc:14,time:5,materials:{glass:2,crystal:1},output:{cat:'materials',name:'Точная линза',materialId:'fineLens',count:1,rarity:'uncommon'}},
 {id:'glass_retort',name:'Алхимическая реторта',profession:'glasswork',dc:13,time:5,materials:{glass:3,ceramic:1},output:{cat:'materials',name:'Алхимическая реторта',materialId:'retort',count:1,rarity:'uncommon'}},
 {id:'glass_bottle',name:'Герметичная стеклянная бутылка',profession:'glasswork',dc:11,time:2,materials:{glass:2,wax:1},output:{cat:'materials',name:'Герметичная бутылка',materialId:'sealedBottle',count:1}},
 {id:'scribe_paper',name:'Качественная бумага',profession:'scribe',dc:9,time:2,materials:{paper:6,thread:1},output:{cat:'materials',name:'Качественная бумага',materialId:'finePaper',count:6}},
 {id:'scribe_parchment',name:'Подготовленный пергамент',profession:'scribe',dc:10,time:3,materials:{parchment:6,ink:1},output:{cat:'materials',name:'Подготовленный пергамент',materialId:'fineParchment',count:6}},
 {id:'scribe_book',name:'Переплёт книги',profession:'scribe',dc:12,time:6,materials:{parchment:10,leather:2,thread:2,ink:1},output:{cat:'materials',name:'Переплётная книга',materialId:'boundBook',count:1}},
 {id:'scribe_scroll_case',name:'Футляр для свитка',profession:'scribe',dc:10,time:2,materials:{parchment:2,leather:1,thread:1},output:{cat:'junk',name:'Футляр для свитка',count:1,category:'Контейнер',weight:.2,cost:'3 зм'}},
 {id:'map_region',name:'Карта региона',profession:'cartographer',dc:12,time:8,materials:{paper:2,ink:1,thread:1},output:{cat:'materials',name:'Карта региона',materialId:'mapRegion',count:1,cartographyQuality:'standard'}},
 {id:'map_dungeon',name:'Карта подземелья',profession:'cartographer',dc:14,time:10,materials:{paper:3,ink:2,thread:1},output:{cat:'materials',name:'Карта подземелья',materialId:'mapDungeon',count:1,cartographyQuality:'standard'}},
 {id:'map_atlas',name:'Атлас местности',profession:'cartographer',dc:16,time:20,materials:{paper:12,ink:4,thread:3,gem:1},output:{cat:'materials',name:'Атлас местности',materialId:'atlas',count:1,rarity:'rare'}},
 {id:'alchemy_solvent',name:'Чистый растворитель',profession:'alchemy',dc:11,time:2,materials:{resin:1,salt:1,glass:1},output:{cat:'materials',name:'Чистый растворитель',materialId:'solvent',count:1}},
 {id:'alchemy_stabilizer',name:'Стабилизирующая соль',profession:'alchemy',dc:12,time:3,materials:{salt:2,charcoal:1},output:{cat:'materials',name:'Стабилизирующая соль',materialId:'stabilizingSalt',count:2}},
 {id:'cook_ration',name:'Походный паёк',profession:'cook',dc:8,time:1,materials:{herb:1,salt:1},output:{cat:'consumables',name:'Походный паёк',count:2,category:'Пища',weight:.5,cost:'0.5 зм',craftEffect:{type:'restFood',value:1}}},
 {id:'cook_tea',name:'Тонизирующий травяной настой',profession:'cook',dc:11,time:2,materials:{herb:2,salt:1},output:{cat:'consumables',name:'Тонизирующий травяной настой',count:1,category:'Пища',weight:.2,cost:'2 зм',craftEffect:{type:'temporaryBonus',value:1}}},
 {id:'tinker_gear',name:'Набор шестерён',profession:'tinkerer',dc:11,time:3,materials:{iron:1,steel:1},output:{cat:'materials',name:'Набор шестерён',materialId:'gearSet',count:1}},
 {id:'tinker_lock',name:'Простой замок',profession:'tinkerer',dc:12,time:4,materials:{steel:2,iron:1},output:{cat:'materials',name:'Простой замок',materialId:'lock',count:1}},
 {id:'tinker_trap',name:'Механическая ловушка',profession:'tinkerer',dc:13,time:5,materials:{steel:2,thread:1,wood:1},output:{cat:'materials',name:'Механическая ловушка',materialId:'mechanicalTrap',count:1}}
];
function char(){return global.currentCharacter||global.currentChar||null;}
function inv(){const c=char();if(!c)return null;c.inventory=c.inventory||{weapons:[],armor:[],consumables:[],materials:[],junk:[]};return c.inventory;}
function label(id){return (base.MATERIALS.find(x=>x.id===id)||{}).name||id;}
function qty(id){const v=inv();if(!v)return 0;const target=label(id).toLowerCase();let n=0;Object.values(v).forEach(list=>(list||[]).forEach(x=>{if(x.materialId===id||x.craftMaterialId===id||String(x.name||'').toLowerCase()===target)n+=Number(x.count)||0;}));return n;}
function hasTool(p){if(p==='cook'||p==='tinkerer')return ((char()?.proficiencies)||[]).some(x=>{const v=String(typeof x==='object'?(x.id||x.name||''):x).toLowerCase();return p==='cook'?['cook','cooking','cook utensils','поварские принадлежности','кухонная утварь'].some(a=>v.includes(a)):['tinker','tinkers tools','механик','инструменты механика','инструменты жестянщика'].some(a=>v.includes(a));});return base.hasTool(p);}
function consume(id,n){const v=inv();let left=n;for(const cat of Object.keys(v||{})){const list=v[cat]||[];for(let i=list.length-1;i>=0&&left>0;i--){const x=list[i];if(x.materialId===id||x.craftMaterialId===id||String(x.name||'').toLowerCase()===label(id).toLowerCase()){const take=Math.min(left,Number(x.count)||1);x.count-=take;left-=take;if(x.count<=0)list.splice(i,1);}}}return left<=0;}
function add(o){const v=inv();if(!v)return false;const a=v[o.cat]||(v[o.cat]=[]);const same=a.find(x=>x.name===o.name&&x.materialId===o.materialId&&x.craftQuality===o.craftQuality);if(same)same.count=(same.count||1)+(o.count||1);else a.push(o);return true;}
function bonus(){const c=char()||{};return Number(c.proficiencyBonus||c.proficiencyBonusValue||2);}
function craft(id){const r=RECIPES.find(x=>x.id===id);if(!r)return{ok:false,error:'Рецепт не найден'};if(!char())return{ok:false,error:'Нет активного персонажа'};if(!hasTool(r.profession))return{ok:false,error:`Нужно владение: ${PROFESSIONS[r.profession].name}`};const missing=Object.entries(r.materials).filter(([k,n])=>qty(k)<n).map(([k,n])=>`${label(k)} ×${n-qty(k)}`);if(missing.length)return{ok:false,error:'Не хватает материалов',missing};Object.entries(r.materials).forEach(([k,n])=>consume(k,n));const roll=1+Math.floor(Math.random()*20),b=bonus(),total=roll+b,success=total>=r.dc;if(!success){save();return{ok:false,failed:true,roll,bonus:b,total,dc:r.dc,error:`Проверка провалена: ${total} против DC ${r.dc}. Материалы потеряны.`};}const quality=total>=r.dc+10?'exceptional':total>=r.dc+5?'fine':'standard';const out=Object.assign({},r.output,{crafted:true,craftProfession:r.profession,craftRecipe:r.id,craftQuality:quality,craftCheck:total,craftDC:r.dc,craftTime:r.time});if(quality==='fine')out.qualityBonus=1;if(quality==='exceptional')out.qualityBonus=2;add(out);save();if(typeof global.renderInventory==='function')global.renderInventory();return{ok:true,recipe:r,quality,roll,bonus:b,total,dc:r.dc,item:out};}
function save(){if(typeof global.autoSaveCurrentCharacter==='function')global.autoSaveCurrentCharacter();else if(typeof global.saveCharacter==='function')global.saveCharacter();}
function render(){const host=document.getElementById('craftingProfessionsPanel');if(!host)return;host.innerHTML=`<div style="padding:10px;background:#171717;border:1px solid #4b3a20;border-radius:8px;margin-top:10px"><h3 style="margin:0;color:#d7b86e">🛠️ Все ремесла</h3><div style="font-size:.78em;color:#aaa;margin:5px 0 8px">Каждая профессия имеет собственные цепочки производства. Материал превращается в компонент, компонент — в предмет. Для создания требуется соответствующее владение инструментами.</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:5px" id="craftProfessionTabs"></div><div id="craftProfessionList" style="margin-top:8px"></div><div id="craftProfessionResult" style="margin-top:7px"></div></div>`;renderTabs();}
function renderTabs(){const tabs=document.getElementById('craftProfessionTabs'),list=document.getElementById('craftProfessionList');if(!tabs||!list)return;tabs.innerHTML='';Object.entries(PROFESSIONS).forEach(([id,p])=>{const b=document.createElement('button');b.className='btn-action';b.style.cssText='padding:7px;font-size:.75em';b.textContent=`${p.icon} ${p.name}`;b.onclick=()=>renderList(id);tabs.appendChild(b);});renderList('jeweler');}
function renderList(pid){const list=document.getElementById('craftProfessionList');if(!list)return;const p=PROFESSIONS[pid];const owned=hasTool(pid);list.innerHTML=`<div style="padding:7px;background:#24201a;border:1px solid #403825;border-radius:6px;font-size:.78em"><b>${p.icon} ${p.name}</b> — ${p.desc}<br><span style="color:${owned?'#8bc48b':'#e99a8c'}">${owned?'✓ Владение инструментами есть':'✗ Нет владения инструментами'}</span></div>`;RECIPES.filter(x=>x.profession===pid).forEach(r=>{const d=document.createElement('div');d.style.cssText='padding:7px;margin-top:5px;background:#211f1b;border:1px solid #39342b;border-radius:6px;font-size:.76em';const mats=Object.entries(r.materials).map(([k,n])=>`${label(k)} ×${n} (${qty(k)})`).join(' · ');d.innerHTML=`<div style="display:flex;justify-content:space-between"><b>${r.name}</b><span>DC ${r.dc} · ${r.time}ч</span></div><div style="color:#aaa;margin:3px 0">${mats}</div><button class="btn-action" style="width:100%;margin-top:4px;background:#5d4037" onclick="DND_CRAFT_PROFESSIONS_V33.uiCraft('${r.id}')">Создать</button>`;list.appendChild(d);});}
function uiCraft(id){const r=craft(id),e=document.getElementById('craftProfessionResult');if(e)e.innerHTML=r.ok?`<div style="padding:7px;background:#1d2a1f;border:1px solid #4b7052;border-radius:6px">✅ ${r.item.name}<br>Качество: <b>${r.quality}</b> · ${r.total} против DC ${r.dc}</div>`:`<div style="padding:7px;background:#321b1b;border:1px solid #7f3b3b;border-radius:6px">❌ ${r.error}<br>${r.missing?.join(', ')||''}</div>`;if(r.ok)renderList(r.recipe.profession);}
const API={PROFESSIONS,RECIPES,craft,hasTool,quantity:qty,render,renderTabs,renderList};global.DND_CRAFT_PROFESSIONS_V33=API;global.dndCraftProfession=craft;document.addEventListener('DOMContentLoaded',()=>setTimeout(render,350));
})(window);
