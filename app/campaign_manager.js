/*
 * campaign_manager.js — лёгкий DM/Campaign слой.
 *
 * Хранит кампании отдельно от листов персонажей: сессии, NPC, заметки и
 * сохранённые encounter IDs. Позволяет быстро создавать кампанию, сессию,
 * NPC и экспортировать/импортировать весь campaign JSON.
 * Основные переменные: dndCampaigns, currentCampaignId, campaign.
 */
(function(global){
  'use strict';
  var KEY='dnd_campaigns_v1', SCHEMA_VERSION=2, state={schemaVersion:SCHEMA_VERSION,campaigns:[],currentCampaignId:null};
  function normalizeCampaign(c){if(!c||typeof c!=='object')return null;var x=c; x.id=String(x.id||('camp_'+Date.now()+Math.random().toString(36).slice(2,7))); x.name=String(x.name||'Новая кампания'); x.createdAt=x.createdAt||new Date().toISOString(); x.notes=String(x.notes||''); x.sessions=Array.isArray(x.sessions)?x.sessions.map(function(s){return s&&typeof s==='object'?{id:String(s.id||('ses_'+Date.now()+Math.random().toString(36).slice(2,5))),title:String(s.title||'Сессия'),date:String(s.date||''),notes:String(s.notes||'')}:null;}).filter(Boolean):[]; x.npcs=Array.isArray(x.npcs)?x.npcs.map(function(n){return n&&typeof n==='object'?{id:String(n.id||('npc_'+Date.now()+Math.random().toString(36).slice(2,5))),name:String(n.name||'NPC'),role:String(n.role||''),notes:String(n.notes||'')}:null;}).filter(Boolean):[]; x.encounterIds=Array.isArray(x.encounterIds)?x.encounterIds.map(String):[]; return x;}
  function normalizeRoot(x){if(Array.isArray(x))x={campaigns:x,currentCampaignId:x[0]&&x[0].id||null};if(!x||typeof x!=='object'||!Array.isArray(x.campaigns))return {schemaVersion:SCHEMA_VERSION,campaigns:[],currentCampaignId:null};var campaigns=x.campaigns.map(normalizeCampaign).filter(Boolean);var current=campaigns.some(function(c){return c.id===x.currentCampaignId;})?x.currentCampaignId:(campaigns[0]&&campaigns[0].id)||null;return {schemaVersion:SCHEMA_VERSION,campaigns:campaigns,currentCampaignId:current};}
  function load(){try{var raw=localStorage.getItem(KEY);var x=raw?JSON.parse(raw):null;state=normalizeRoot(x);}catch(e){state={schemaVersion:SCHEMA_VERSION,campaigns:[],currentCampaignId:null};}return state;}
  function save(){var previous=null;try{previous=localStorage.getItem(KEY);localStorage.setItem(KEY,JSON.stringify(state));return true;}catch(e){try{if(previous===null)localStorage.removeItem(KEY);else localStorage.setItem(KEY,previous);}catch(ignore){}return false;}}
  function cur(){return state.campaigns.find(function(c){return c.id===state.currentCampaignId;})||null;}
  function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c];});}
  function ensure(){load();if(!state.campaigns.length){var c=create('Моя кампания');state.currentCampaignId=c.id;save();}return cur();}
  function create(name){var c={id:'camp_'+Date.now()+Math.random().toString(36).slice(2,7),name:name||'Новая кампания',createdAt:new Date().toISOString(),notes:'',sessions:[],npcs:[],encounterIds:[]};state.campaigns.push(c);state.currentCampaignId=c.id;state.schemaVersion=SCHEMA_VERSION;return c;}
  function render(){var root=document.getElementById('campaignManagerPanel');if(!root)return;var c=cur();if(!c){root.innerHTML='<p>Кампания не выбрана.</p>';return;}root.innerHTML='<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px;"><button class="btn-action" onclick="dndCampaignNewSession()">➕ Сессия</button><button class="btn-action" onclick="dndCampaignNewNpc()">👤 NPC</button><button class="btn-action" onclick="dndCampaignExport()">💾 Backup</button></div>'+
    '<label>Название кампании</label><input id="campName" value="'+esc(c.name)+'" oninput="dndCampaignRename(this.value)">'+
    '<label>Общие заметки</label><textarea id="campNotes" style="width:100%;min-height:90px" oninput="dndCampaignNotes(this.value)">'+esc(c.notes)+'</textarea>'+
    '<h4>📅 Сессии ('+c.sessions.length+')</h4>'+c.sessions.slice().reverse().map(function(s){return '<div style="background:#222;padding:8px;border-radius:6px;margin-bottom:6px;"><b>'+esc(s.title)+'</b><div style="font-size:.8em;color:#999">'+esc(s.date)+'</div><div>'+esc(s.notes)+'</div></div>';}).join('')+
    '<h4>👤 NPC ('+c.npcs.length+')</h4>'+c.npcs.map(function(n){return '<div style="background:#222;padding:8px;border-radius:6px;margin-bottom:6px;"><b>'+esc(n.name)+'</b> <span style="color:#aaa">'+esc(n.role||'')+'</span><div>'+esc(n.notes||'')+'</div></div>';}).join('');}
  function inject(){if(document.getElementById('campaignManagerPanel'))return;var host=document.getElementById('tab-page-library')||document.querySelectorAll('.tab-page')[6];if(!host)return;var box=document.createElement('div');box.innerHTML='<div class="card" style="margin-top:12px"><h3>🗺️ Кампания / DM</h3><div id="campaignManagerPanel"></div></div>';host.appendChild(box);render();}
  global.dndCampaignNew=function(){load();var n=prompt('Название кампании:','Новая кампания');if(!n)return;create(n);save();render();};
  global.dndCampaignNewSession=function(){var c=ensure(),title=prompt('Название сессии:','Сессия '+(c.sessions.length+1));if(!title)return;c.sessions.push({id:'ses_'+Date.now(),title:title,date:new Date().toLocaleDateString(),notes:prompt('Краткие заметки:','')||''});save();render();};
  global.dndCampaignNewNpc=function(){var c=ensure(),name=prompt('Имя NPC:','Новый NPC');if(!name)return;c.npcs.push({id:'npc_'+Date.now(),name:name,role:prompt('Роль:','')||'',notes:prompt('Заметки:','')||''});save();render();};
  global.dndCampaignRename=function(v){var c=cur();if(c){c.name=v;save();}};
  global.dndCampaignNotes=function(v){var c=cur();if(c){c.notes=v;save();}};
  global.dndCampaignExport=function(){var c=cur();if(!c)return;var blob=new Blob([JSON.stringify({schemaVersion:SCHEMA_VERSION,type:'dnd-campaign',exportedAt:new Date().toISOString(),campaign:c},null,2)],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='dnd_campaign_'+c.name.replace(/[^a-zа-я0-9_-]+/gi,'_')+'.json';a.click();URL.revokeObjectURL(a.href);};
  global.dndCampaignOpen=function(){inject();render();var host=document.getElementById('tab-page-library');var pages=document.querySelectorAll('#swiper > .tab-page');var libraryIndex=-1;for(var i=0;i<pages.length;i++){if(pages[i]===host){libraryIndex=i;break;}}if(libraryIndex>=0&&typeof global.goToTab==='function'){global.goToTab(libraryIndex);}var panel=document.getElementById('campaignManagerPanel');if(panel){var card=panel.closest('.card');if(card&&card.scrollIntoView)card.scrollIntoView({behavior:'smooth',block:'start'});}};
  document.addEventListener('DOMContentLoaded',function(){load();setTimeout(inject,300);});
  global.DNDCampaign={SCHEMA_VERSION:SCHEMA_VERSION,load:load,save:save,getCurrent:cur,create:create,normalize:normalizeRoot};
})(window);
