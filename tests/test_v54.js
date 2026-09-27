/*
 * test_v54.js — smoke/regression test for V54 inventory containers.
 * Как работает: загружает существующий проект в VM, создаёт контейнер,
 * перемещает предмет, проверяет вместимость/вложенность и возвращает предмет.
 * Важные API: DND_INVENTORY_CONTAINERS_V54.createContainer(),
 * moveItemToContainer(), takeFromContainer(), listContainers().
 */
const fs=require('fs'),vm=require('vm'),path=require('path');
const dir=__dirname;
const ctx={console,Date,Math,JSON,parseFloat,Number,String,Set,Map,Array,Object,window:null};
ctx.window=ctx;ctx.global=ctx;ctx.addEventListener=()=>{};ctx.document={addEventListener(){},getElementById(){return null},querySelector(){return null},createElement(){return {style:{},appendChild(){}}}};ctx.localStorage={_:{},getItem(k){return this._[k]||null},setItem(k,v){this._[k]=String(v)}};
ctx.autoSaveCurrentCharacter=()=>{};ctx.renderInventory=()=>{};ctx.showCustomAlert=()=>{};ctx.prompt=()=>null;
ctx.currentCharacter={inventory:{weapons:[{name:'Test Sword',count:1,weight:2}],armor:[],consumables:[],materials:[],junk:[]}};ctx.currentChar=ctx.currentCharacter;
vm.createContext(ctx);
for(const f of ['inventory_containers_v54.js']) vm.runInContext(fs.readFileSync(path.join(dir,f),'utf8'),ctx,{filename:f});
const api=ctx.DND_INVENTORY_CONTAINERS_V54;
let r=api.createContainer('Рюкзак',{capacity:5,weight:1}); if(!r.ok)throw Error('create failed');
let c=r.container;
r=api.moveItemToContainer('weapons',0,c.id); if(!r.ok)throw Error('move failed '+r.error);
let list=api.listContainers(); if(list[0].used<1.9||list[0].contents!==1)throw Error('weight/content mismatch');
r=api.takeFromContainer(c.id,0,'weapons'); if(!r.ok||ctx.currentCharacter.inventory.weapons.length!==1)throw Error('take failed');
r=api.addToContainer(c.id,{name:'Stone',count:10,weight:1},{category:'materials'}); if(r.ok)throw Error('capacity should block');
console.log('V54_CONTAINER_TEST_OK',JSON.stringify({containers:api.listContainers().length,capacity:list[0].capacity,blocked:true}));
