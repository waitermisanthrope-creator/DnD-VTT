const fs=require('fs'),assert=require('assert'),vm=require('vm');
for(const f of ['vtt_combat_event_bus_v69.js','vtt_combat_log_v66.js','vtt_dice_resolution_v65.js','vtt_encounter_checkpoint_v68.js','vtt_mobile_combat_hud_v62.js']) assert(fs.existsSync(f),`missing ${f}`);
const s=fs.readFileSync('vtt_combat_event_bus_v69.js','utf8');
assert(s.includes("VERSION='69.0.0'"));assert(s.includes('DNDCombatEventBusV69'));assert(s.includes('readOnly'));assert(s.includes('dndV69Step'));assert(s.includes('dndV69ExportReplay'));assert(s.includes('DNDCombatLogV66.record'));
const idx=fs.readFileSync('index.html','utf8');assert(idx.includes('vtt_combat_event_bus_v69.js'));
const hud=fs.readFileSync('vtt_mobile_combat_hud_v62.js','utf8');assert(hud.includes('dndV69OpenReplay'));
const store={};const ctx={localStorage:{getItem:k=>store[k]||null,setItem:(k,v)=>store[k]=v},Math,Date,JSON,Blob:function(){},URL:{},console};ctx.document={getElementById:()=>null,createElement:()=>({}),body:{appendChild:()=>{}}};ctx.window=ctx;vm.createContext(ctx);vm.runInContext(s,ctx);
const bus=ctx.DNDCombatEventBusV69;assert(bus&&bus.VERSION==='69.0.0');
const a=bus.record({id:'t69a',type:'TURN_START',payload:{actorName:'Hero'}});const b=bus.record({id:'t69b',type:'ROLL_RESOLVED',resolution:{kind:'attack',total:17}});assert(a.id==='t69a'&&b.id==='t69b');assert(bus.events().length===2);bus.record({id:'t69b',type:'ROLL_RESOLVED'});assert(bus.events().length===2);assert(bus.step(1).id==='t69a');assert(bus.step(1).id==='t69b');const before=JSON.stringify(bus.events());bus.step(-1);assert(JSON.stringify(bus.events())===before);assert(bus.current().replay.readOnly===true);console.log('V69_COMBAT_EVENT_BUS_REPLAY_TEST_OK');
