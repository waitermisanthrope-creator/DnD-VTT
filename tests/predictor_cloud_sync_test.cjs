/** Predictor uses the existing full-profile cloud path, tested with two device
 * stores and the shared Supabase mock. No live account or network needed.
 */
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const {Server,device}=require('./cloud_sync_test.cjs');
const source=fs.readFileSync(__dirname+'/../app/predictor_runtime.js','utf8');
const KEY='dnd_multi_characters_v2';
function drawOne(api,h,deck){const r=api.draw(h,deck);return r.ok?api.choose(h,r.cards[0]):r;}
function runtime(d){vm.runInContext(source,d.g);return d.g.DNDPredictor;}
async function main(){
 const server=new Server(),h={id:'predictor_original',name:'Предсказатель',classes:[{name:'Предсказатель',level:5,subclass:'Оракул'}],hpCurrent:20};
 const pc=device(server),api=runtime(pc);assert(api.initialize(h).ok);assert(api.beginInitial(h).ok);assert(api.offer(h,'minor').ok);pc.save([h]);
 await pc.api.login('p@example.com','password123');pc.api.importLocal();await pc.api.sync();
 let phone=device(server);let mobile=runtime(phone);await phone.api.login('p@example.com','password123');let roster=phone.roster(),character=roster[0];assert.deepEqual(character.predictorState,JSON.parse(JSON.stringify(h.predictorState)));
 const selected=character.predictorState.offer.cards[0];assert(mobile.choose(character,selected).ok);const major=drawOne(mobile,character,'major').card;assert(major);assert.equal(mobile.inspect(character).majorCurrent,4);
 assert(mobile.recordApplication(character,major,'android-use',character.predictorState.revision).ok);
 phone.g.navigator.onLine=false;phone.save(roster);await phone.api.sync();phone=phone.restart();mobile=runtime(phone);assert.equal(mobile.inspect(phone.roster()[0]).majorCurrent,3);await phone.api.sync();await pc.api.sync();
 character=pc.roster()[0];assert(character.predictorState.hand.includes(selected));assert(character.predictorState.discard.major.includes(major));assert.equal(api.inspect(character).majorCurrent,3);
 const before=JSON.stringify(character.predictorState);api.sync(character);assert.equal(JSON.stringify(character.predictorState),before);
 // Competing offline changes remain an explicit CAS conflict, never merge decks.
 roster=phone.roster();roster[0].predictorState.revision++;phone.save(roster);
 const pcRoster=pc.roster();assert(api.rest(pcRoster[0],'long','pc-rest').ok);pc.save(pcRoster);await pc.api.sync();await phone.api.sync();assert.equal(phone.api.snapshot().conflicts.length,1);
 phone.api.resolve(roster[0].id,'remote');assert.deepEqual(phone.roster()[0].predictorState,pc.roster()[0].predictorState);
 // Synthetic definitions exercise transport/accounting only, not real effects.
 const defs=Object.fromEntries(api.cards.map(c=>[c.id,{action:'action'}]));
 const next=pc.roster();const blind=api.beginBlind(next[0],'major','blind-cloud','',defs);assert(blind.ok);pc.save(next);await pc.api.sync();await phone.api.sync();
 const remote=phone.roster();assert.equal(remote[0].predictorState.blind.card,blind.card);const resumed=phone.restart();runtime(resumed);assert.equal(resumed.roster()[0].predictorState.blind.operationId,'blind-cloud');
 const applied=resumed.roster();assert(resumed.g.DNDPredictor.recordApplication(applied[0],blind.card,'blind-cloud',applied[0].predictorState.revision).ok);resumed.save(applied);await resumed.api.sync();await pc.api.sync();assert(!pc.roster()[0].predictorState.blind);assert.equal(api.inspect(pc.roster()[0]).majorCurrent,3);
 console.log('PREDICTOR_CLOUD_SYNC_OK: pending choice, offline apply, CAS conflict, blind result across device/restart and exactly one resource charge');
}
main().catch(e=>{console.error(e);process.exitCode=1;});
