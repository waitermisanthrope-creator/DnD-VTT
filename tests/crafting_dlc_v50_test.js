/**
 * V50 test: проверяет включение/выключение DLC, блокировку крафта и ремонта,
 * а также фактический износ оружия и брони через боевые API.
 * Основные переменные/API: DND_CRAFTING_DLC_V50, DND_CRAFT_PROFESSIONS_V38,
 * DND_CRAFT_ECONOMY_V49, DNDCombat.
 */
const fs=require('fs'),vm=require('vm');
const ctx={console,Math,Date,JSON,localStorage:{data:{},getItem(k){return this.data[k]??null;},setItem(k,v){this.data[k]=String(v);}},document:{readyState:'complete',getElementById:()=>null,querySelectorAll:()=>[],addEventListener:()=>{}},alert:()=>{}};
ctx.window=ctx;
ctx.DND_CRAFT_PROFESSIONS_V38={craft:function(){return {ok:true,item:{name:'Тестовый предмет'}}}};
ctx.DND_CRAFT_ECONOMY_V49={repairItem:function(){return {ok:true,repaired:true}},getDurability:function(i){return {current:Number(i.durability),max:Number(i.durabilityMax),ratio:Number(i.durability)/Number(i.durabilityMax)}},itemValue:function(i){return 10}};
ctx.DNDCombat={attack:function(){return {hit:true}},applyDamage:function(t,a){return {hpDamage:a}}};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(__dirname+'/crafting_dlc_v50.js','utf8'),ctx);
const api=ctx.DND_CRAFTING_DLC_V50;
if(!api||api.VERSION!=='50.0.0')throw new Error('V50 DLC API missing');
if(!api.isEnabled())throw new Error('DLC must be enabled by default');
let craft=ctx.DND_CRAFT_PROFESSIONS_V38.craft();
if(!craft.ok)throw new Error('Craft should work when DLC enabled');
const weapon={durabilityMax:10,durability:10};
ctx.DNDCombat.attack({}, {}, {weapon});
if(weapon.durability!==9)throw new Error('Weapon durability should decrease on hit');
const armor={durabilityMax:20,durability:20};
ctx.DNDCombat.applyDamage({equippedArmor:armor},15,'рубящий');
if(armor.durability!==18)throw new Error('Armor durability should decrease from physical damage');
api.setEnabled(false);
craft=ctx.DND_CRAFT_PROFESSIONS_V38.craft();
if(!craft.disabled)throw new Error('Craft should be blocked when DLC disabled');
let repair=ctx.DND_CRAFT_ECONOMY_V49.repairItem({});
if(!repair.disabled)throw new Error('Repair should be blocked when DLC disabled');
const before=weapon.durability;
ctx.DNDCombat.attack({}, {}, {weapon});
if(weapon.durability!==before)throw new Error('Weapon should not wear while DLC disabled');
api.setEnabled(true);
if(!ctx.DND_CRAFT_PROFESSIONS_V38.craft().ok)throw new Error('Craft should recover after re-enable');
console.log('V50_CRAFTING_DLC_TEST_OK',JSON.stringify({defaultEnabled:true,weaponWear:true,armorWear:true,disabledBlocked:true,reEnabled:true}));
