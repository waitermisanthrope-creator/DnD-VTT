/**
 * Custom Crafting v32: конструктор оружия, брони и одежды с материалами, компонентами,
 * положительными и отрицательными модификаторами и качеством результата.
 * Как работает: игрок выбирает основу, материал и до двух модификаторов; движок считает
 * итоговые характеристики, цену, DC и эффекты, затем сохраняет созданный предмет в инвентарь.
 * Основные переменные: DND_CUSTOM_CRAFTING_V32, BASES, MATERIALS, MODIFIERS, QUALITY,
 * currentCharacter/currentChar, inventory и selectedCategory.
 */
(function(global){'use strict';
const BASES=[
{id:'dagger',name:'Кинжал',type:'weapon',dc:10,weight:1,damage:'1d4',damageType:'колющий',cost:2,props:['Finesse','Light','Thrown'],slots:2},
{id:'longsword',name:'Длинный меч',type:'weapon',dc:12,weight:3,damage:'1d8',damageType:'рубящий',cost:15,props:['Versatile'],slots:2},
{id:'greatsword',name:'Двуручный меч',type:'weapon',dc:14,weight:6,damage:'2d6',damageType:'рубящий',cost:50,props:['Heavy','Two-Handed'],slots:3},
{id:'rapier',name:'Рапира',type:'weapon',dc:13,weight:2,damage:'1d8',damageType:'колющий',cost:25,props:['Finesse'],slots:2},
{id:'battleaxe',name:'Боевой топор',type:'weapon',dc:12,weight:4,damage:'1d8',damageType:'рубящий',cost:10,props:['Versatile'],slots:2},
{id:'longbow',name:'Длинный лук',type:'weapon',dc:13,weight:2,damage:'1d8',damageType:'колющий',cost:50,props:['Ammunition','Heavy','Two-Handed'],slots:2},
{id:'shield',name:'Щит',type:'armor',dc:12,weight:6,ac:2,cost:10,slots:2},
{id:'leather',name:'Кожаный доспех',type:'armor',dc:10,weight:10,ac:11,cost:10,armorClass:'light',slots:2},
{id:'breastplate',name:'Кираса',type:'armor',dc:14,weight:20,ac:14,cost:400,armorClass:'medium',slots:3},
{id:'chainmail',name:'Кольчуга',type:'armor',dc:14,weight:55,ac:16,cost:75,armorClass:'heavy',slots:3},
{id:'robe',name:'Мантия',type:'clothing',dc:9,weight:4,cost:2,slots:3},
{id:'travelClothes',name:'Дорожная одежда',type:'clothing',dc:8,weight:3,cost:2,slots:2},
{id:'cloak',name:'Плащ',type:'clothing',dc:9,weight:2,cost:5,slots:2},
{id:'boots',name:'Сапоги',type:'clothing',dc:9,weight:2,cost:1,slots:2},
{id:'gloves',name:'Перчатки',type:'clothing',dc:9,weight:.5,cost:1,slots:2}
];
const MATERIALS=[
{id:'iron',name:'Железо',dc:0,cost:1,weight:1,effects:[]},
{id:'steel',name:'Сталь',dc:1,cost:2,weight:1,effects:['Прочный']},
{id:'silver',name:'Серебро',dc:2,cost:5,weight:1,effects:['Серебряное']},
{id:'mithral',name:'Мифрил',dc:5,cost:75,weight:.7,effects:['Лёгкий металл','Тихий']},
{id:'adamantine',name:'Адамантин',dc:6,cost:100,weight:1.1,effects:['Адамантиновый']},
{id:'wood',name:'Древесина',dc:0,cost:.1,weight:.9,effects:[]},
{id:'darkwood',name:'Тенедревесина',dc:3,cost:10,weight:.6,effects:['Тихий','Лёгкий']},
{id:'leather',name:'Кожа',dc:0,cost:1,weight:.9,effects:['Гибкий']},
{id:'dragonScale',name:'Драконья чешуя',dc:5,cost:75,weight:.8,effects:['Драконья защита']},
{id:'spiderSilk',name:'Паучий шёлк',dc:4,cost:15,weight:.35,effects:['Тихий','Прочный']},
{id:'cloth',name:'Ткань',dc:0,cost:.5,weight:.9,effects:[]},
{id:'enchantedCloth',name:'Зачарованная ткань',dc:4,cost:20,weight:.7,effects:['Магическая проводимость']}
];
const MODIFIERS=[
{id:'keen',name:'Заточенная кромка',types:['weapon'],dc:2,cost:15,weight:0,effects:[{id:'keen',label:'+1 к броскам урона при качественном результате',type:'bonus',value:1}],requires:['steel','mithral','adamantine']},
{id:'reinforced',name:'Усиленная конструкция',types:['weapon','armor','clothing'],dc:2,cost:10,weight:.4,effects:[{id:'reinforced',label:'+1 к прочности/надёжности',type:'bonus',value:1}]},
{id:'lightweight',name:'Облегчённая конструкция',types:['weapon','armor','clothing'],dc:2,cost:12,weight:-.35,effects:[{id:'light',label:'Вес −20%',type:'bonus',value:.2}]},
{id:'balanced',name:'Сбалансированная рукоять',types:['weapon'],dc:1,cost:8,weight:0,effects:[{id:'balanced',label:'+1 к инициативе при ношении',type:'bonus',value:1}]},
{id:'serrated',name:'Зубчатая кромка',types:['weapon'],dc:2,cost:12,weight:.1,effects:[{id:'bleed',label:'При критическом попадании: кровотечение',type:'bonus',value:1}]},
{id:'insulated',name:'Теплоизоляция',types:['armor','clothing'],dc:2,cost:8,weight:.1,effects:[{id:'cold',label:'Преимущество против холода окружающей среды',type:'bonus',value:1}]},
{id:'camouflage',name:'Камуфляж',types:['armor','clothing'],dc:2,cost:10,weight:0,effects:[{id:'stealth',label:'+1 к проверкам Скрытности в подходящей местности',type:'bonus',value:1}]},
{id:'lining',name:'Мягкая подкладка',types:['armor','clothing'],dc:1,cost:6,weight:.2,effects:[{id:'comfort',label:'−1 к штрафу от длительного ношения',type:'bonus',value:1}]},
{id:'warding',name:'Оберегающая вышивка',types:['armor','clothing'],dc:4,cost:35,weight:0,effects:[{id:'save',label:'+1 к одному выбранному спасброску',type:'bonus',value:1}]},
{id:'arcaneThread',name:'Арканная нить',types:['armor','clothing'],dc:4,cost:30,weight:0,effects:[{id:'spell',label:'+1 к проверкам концентрации',type:'bonus',value:1}],requires:['enchantedCloth','spiderSilk']},
{id:'poisoned',name:'Токсичная пропитка',types:['weapon','clothing'],dc:3,cost:18,weight:0,effects:[{id:'toxic',label:'При попадании/контакте может вызвать слабое отравление',type:'bonus',value:1}]},
{id:'fragile',name:'Хрупкий сплав',types:['weapon','armor'],dc:-2,cost:-5,weight:-.2,effects:[{id:'fragile',label:'При критическом провале крафта предмет повреждается',type:'penalty',value:1}]},
{id:'noisy',name:'Шумные заклёпки',types:['armor','clothing'],dc:-2,cost:-2,weight:.3,effects:[{id:'noisy',label:'−1 к Скрытности',type:'penalty',value:1}]},
{id:'awkward',name:'Неудобная посадка',types:['armor','clothing'],dc:-1,cost:-3,weight:.2,effects:[{id:'awkward',label:'−1 к инициативе',type:'penalty',value:1}]},
{id:'unstable',name:'Нестабильный магический шов',types:['weapon','armor','clothing'],dc:3,cost:20,weight:0,effects:[{id:'unstable',label:'При критическом провале возникает случайный магический побочный эффект',type:'penalty',value:1}]}
];
const QUALITY={standard:{label:'Обычное',mult:1,effect:0},fine:{label:'Качественное',mult:1.25,effect:1},masterwork:{label:'Мастерское',mult:1.6,effect:2},flawed:{label:'Дефектное',mult:.8,effect:-1}};
function char(){return global.currentCharacter||global.currentChar||null;}
function inv(){const c=char();if(!c)return null;c.inventory=c.inventory||{weapons:[],armor:[],consumables:[],materials:[],junk:[],clothing:[]};return c.inventory;}
function add(category,item){if(typeof global.addItemToInventory==='function')global.addItemToInventory(category,item.name,item.count||1,item);else{const v=inv();v[category]=v[category]||[];v[category].push(item);}}
function qty(id){const v=inv();if(!v)return 0;const m=MATERIALS.find(x=>x.id===id);let n=0;Object.values(v).forEach(list=>(list||[]).forEach(i=>{if(i.materialId===id||i.craftMaterialId===id||String(i.name).toLowerCase()===String(m?.name||id).toLowerCase())n+=Number(i.count)||0;}));return n;}
function consume(id,n){const v=inv();let left=n;for(const cat of Object.keys(v)){for(let i=(v[cat]||[]).length-1;i>=0&&left>0;i--){const x=v[cat][i];if(x.materialId===id||x.craftMaterialId===id||String(x.name).toLowerCase()===String(MATERIALS.find(m=>m.id===id)?.name||id).toLowerCase()){const take=Math.min(left,Number(x.count)||1);x.count-=take;left-=take;if(x.count<=0)v[cat].splice(i,1);}}}return left<=0;}
function materialOptions(){return MATERIALS.map(m=>`<option value="${m.id}">${m.name}</option>`).join('');}
function baseOptions(type){return BASES.filter(b=>!type||b.type===type).map(b=>`<option value="${b.id}">${b.name}</option>`).join('');}
function modOptions(type){return MODIFIERS.filter(m=>m.types.includes(type)).map(m=>`<option value="${m.id}">${m.name}</option>`).join('');}
function get(id,list){return list.find(x=>x.id===id);}
function selected(){const type=document.getElementById('customCraftType')?.value||'weapon';const b=get(document.getElementById('customCraftBase')?.value,BASES)||BASES[0];const mat=get(document.getElementById('customCraftMaterial')?.value,MATERIALS)||MATERIALS[0];const mods=[document.getElementById('customCraftMod1')?.value,document.getElementById('customCraftMod2')?.value].filter(Boolean).map(id=>get(id,MODIFIERS)).filter(Boolean);return{type,b,mat,mods};}
function calc(s){let dc=s.b.dc+s.mat.dc+ s.mods.reduce((a,m)=>a+m.dc,0);let weight=s.b.weight*s.mat.weight+s.mods.reduce((a,m)=>a+m.weight,0);let cost=s.b.cost+s.mat.cost+s.mods.reduce((a,m)=>a+m.cost,0);let effects=[...(s.mat.effects||[])];s.mods.forEach(m=>effects.push(...m.effects.map(e=>e.label)));return{dc:Math.max(5,Math.round(dc)),weight:Math.max(.1,Number(weight.toFixed(2))),cost:Math.max(.01,Number(cost.toFixed(2))),effects};}
function category(type){return type==='weapon'?'weapons':type==='armor'?'armor':'clothing';}
function craft(){const s=selected();const c=char();if(!c)return{ok:false,error:'Нет активного персонажа'};const used={};used[s.mat.id]=1;const missing=Object.entries(used).filter(([id,n])=>qty(id)<n);if(missing.length)return{ok:false,error:`Не хватает материала: ${get(missing[0][0],MATERIALS).name}`};const bad=s.mods.find(m=>m.requires&&!m.requires.includes(s.mat.id));if(bad)return{ok:false,error:`Модификатор «${bad.name}» требует подходящий материал.`};const r=calc(s);const roll=Math.floor(Math.random()*20)+1;const bonus=Number(c.proficiencyBonus||2);const total=roll+bonus;let q=total>=r.dc+10?'masterwork':total>=r.dc+5?'fine':'standard';if(total<r.dc)q='flawed';consume(s.mat.id,1);const qd=QUALITY[q];let damage=s.b.damage;let ac=s.b.ac;let effects=[...r.effects];if(qd.effect>0)effects.push(`Бонус качества +${qd.effect}`);if(q==='flawed')effects.push('Дефект: один негативный эффект может проявиться при использовании.');const item={name:`${s.b.name} — ${s.mat.name}`,count:1,crafted:true,customCrafted:true,craftQuality:q,craftQualityLabel:qd.label,baseId:s.b.id,materialId:s.mat.id,modifierIds:s.mods.map(m=>m.id),weight:Number((r.weight*qd.mult).toFixed(2)),cost:Number((r.cost*qd.mult).toFixed(2)),dc:r.dc,craftRoll:total,damage,damageType:s.b.damageType,ac,properties:[...(s.b.props||[])],effects};add(category(s.type),item);if(typeof global.autoSaveCurrentCharacter==='function')global.autoSaveCurrentCharacter();if(typeof global.renderInventory==='function')global.renderInventory();return{ok:true,item,roll,bonus,total,dc:r.dc,quality:q,effects};}
function update(){const s=selected();const r=calc(s);const el=document.getElementById('customCraftPreview');if(!el)return;el.innerHTML=`<div style="padding:8px;border:1px solid #51472e;border-radius:6px;background:#211f18"><b>${s.b.name} — ${s.mat.name}</b><br>DC: <b>${r.dc}</b> · Вес: ${r.weight} · Цена: ${r.cost} зм<br>Материал: ${s.mat.effects.join(', ')||'нет'}<br>${s.mods.length?'Модификаторы: '+s.mods.map(m=>m.name).join(', ')+'<br>':''}<span style="color:#c8b67a">${r.effects.join(' · ')||'Без дополнительных эффектов'}</span></div>`;}
function render(){let host=document.getElementById('customCraftingPanel');if(!host){const old=document.getElementById('craftingPanel');if(!old)return;host=document.createElement('div');host.id='customCraftingPanel';old.parentNode.insertBefore(host,old.nextSibling);}host.innerHTML=`<div style="padding:10px;background:#171717;border:1px solid #6d542d;border-radius:8px;margin-top:10px"><h3 style="margin:0;color:#d7b86e">⚒️ Конструктор предмета</h3><div style="font-size:.78em;color:#aaa;margin:5px 0 8px">Собери собственное оружие, броню или одежду. Материал и модификаторы меняют свойства, DC, вес и эффекты. Негативные модификаторы намеренно существуют: дешёвые и рискованные варианты тоже жизнеспособны.</div><label>Тип <select id="customCraftType" style="width:100%;padding:7px;background:#222;color:#fff" onchange="DND_CUSTOM_CRAFTING_V32.refresh()"><option value="weapon">Оружие</option><option value="armor">Броня</option><option value="clothing">Одежда</option></select></label><label>Основа <select id="customCraftBase" style="width:100%;padding:7px;background:#222;color:#fff" onchange="DND_CUSTOM_CRAFTING_V32.refreshBase()"></select></label><label>Материал <select id="customCraftMaterial" style="width:100%;padding:7px;background:#222;color:#fff" onchange="DND_CUSTOM_CRAFTING_V32.update()">${materialOptions()}</select></label><label>Модификатор 1 <select id="customCraftMod1" style="width:100%;padding:7px;background:#222;color:#fff" onchange="DND_CUSTOM_CRAFTING_V32.update()"></select></label><label>Модификатор 2 <select id="customCraftMod2" style="width:100%;padding:7px;background:#222;color:#fff" onchange="DND_CUSTOM_CRAFTING_V32.update()"></select></label><div id="customCraftPreview" style="margin:7px 0"></div><button class="btn-action" style="width:100%;background:#6d4c41" onclick="DND_CUSTOM_CRAFTING_V32.uiCraft()">⚒️ Создать предмет</button><div id="customCraftResult" style="margin-top:7px"></div></div>`;refresh();}
function refresh(){const t=document.getElementById('customCraftType')?.value||'weapon';const base=document.getElementById('customCraftBase');if(base)base.innerHTML=baseOptions(t);refreshBase();}
function refreshBase(){const t=document.getElementById('customCraftType')?.value||'weapon';const m1=document.getElementById('customCraftMod1'),m2=document.getElementById('customCraftMod2');if(m1)m1.innerHTML='<option value="">— нет —</option>'+modOptions(t);if(m2)m2.innerHTML='<option value="">— нет —</option>'+modOptions(t);update();}
function uiCraft(){const r=craft();const e=document.getElementById('customCraftResult');if(!e)return;e.innerHTML=r.ok?`<div style="padding:8px;background:#1d2a1f;border:1px solid #4b7052;border-radius:6px">✅ <b>${r.item.name}</b><br>Качество: ${QUALITY[r.quality].label}<br>Проверка: ${r.total} (d20 ${r.roll} + ${r.bonus}) против DC ${r.dc}<br>${r.effects.join('<br>')}</div>`:`<div style="padding:8px;background:#321b1b;border:1px solid #7f3b3b;border-radius:6px">❌ ${r.error}</div>`;}
const API={BASES,MATERIALS,MODIFIERS,QUALITY,render,refresh,refreshBase,update,craft,uiCraft};global.DND_CUSTOM_CRAFTING_V32=API;document.addEventListener('DOMContentLoaded',()=>setTimeout(render,350));
})(window);
