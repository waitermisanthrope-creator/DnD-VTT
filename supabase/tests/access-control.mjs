import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
const {PGlite}=await import(process.env.PGLITE_MODULE||'@electric-sql/pglite');
const db=new PGlite();let checks=0;
const owner='00000000-0000-4000-8000-000000000001',deputy='00000000-0000-4000-8000-000000000002',member='00000000-0000-4000-8000-000000000003',other='00000000-0000-4000-8000-000000000004';
function check(value,name){assert.ok(value,name);checks++;}
async function denied(sql,args=[]){await assert.rejects(db.query(sql,args));checks++;}
async function identity(uid,aal='aal1'){await db.exec('reset role');await db.query("select set_config('request.jwt.claims',$1,false)",[JSON.stringify({sub:uid,aal,amr:aal==='aal2'?[{method:'totp',timestamp:Math.floor(Date.now()/1000)}]:[],user_metadata:{role:'owner',premium:true,email:'waiter.misanthrope@gmail.com'}})]);await db.exec('set role authenticated');}
async function root(){await db.exec('reset role');}
async function access(){return (await db.query('select public.my_access() as a')).rows[0].a;}
try {
 await db.exec(`create role anon;create role authenticated;create role service_role;create schema auth;grant usage on schema auth to authenticated;create table auth.users(id uuid primary key,email text,raw_user_meta_data jsonb not null default '{}');
 create function auth.jwt() returns jsonb language sql stable as $$select coalesce(nullif(current_setting('request.jwt.claims',true),''),'{}')::jsonb$$;
 create function auth.uid() returns uuid language sql stable as $$select (auth.jwt()->>'sub')::uuid$$;`);
 await db.query('insert into auth.users(id) values($1),($2),($3),($4)',[owner,deputy,member,other]);
 await db.exec(await readFile(new URL('../migrations/202610130001_characters.sql',import.meta.url),'utf8'));
 await db.exec(await readFile(new URL('../migrations/202610210001_access_control.sql',import.meta.url),'utf8'));
 await db.exec('set role anon');await denied('select public.my_access()');
 await identity(member);let a=await access();check(a.capabilities['cloud.own']&&!a.capabilities['workshop.paid']&&!a.capabilities['staff.manage'],'ordinary auth and forged metadata never grant staff/premium');
 await denied("insert into app_private.entitlements(user_id,feature,verified) values($1,'premium',true)",[member]);
 await root();await db.query("insert into app_private.entitlements(user_id,feature,verified) values($1,'creator_page',true)",[member]);await identity(member);check(!(await access()).capabilities['creator.submit'],'creator page alone requires premium');
 await root();await db.query("insert into app_private.entitlements(user_id,feature,verified) values($1,'premium',false)",[member]);await identity(member);check(!(await access()).capabilities['workshop.paid'],'unverified purchase gives no access');
 await root();await db.query("update app_private.entitlements set verified=true where user_id=$1 and feature='premium'",[member]);await identity(member);a=await access();check(a.capabilities['workshop.paid']&&a.capabilities['creator.submit'],'both verified entitlements grant creator');
 await root();await db.query("update app_private.entitlements set expires_at=now()-interval '1 second' where user_id=$1 and feature='premium'",[member]);await identity(member);check(!(await access()).capabilities['workshop.paid'],'expiry enforced per request');
 await root();await db.query("insert into app_private.staff values($1,'moderator',0,true)",[member]);
 for(let trust=0;trust<=3;trust++){await root();await db.query('update app_private.staff set trust=$1 where user_id=$2',[trust,member]);await identity(member);a=await access();check(a.capabilities['creator.submit']&&a.capabilities['review.read'],'moderator has creator + queue');check(a.capabilities['review.decide']===(trust>=1),'review threshold');check(a.capabilities['workshop.publish']===(trust>=2),'publication threshold');check(!a.capabilities['diagnostics.read'],'technical console needs MFA');}
 // Even fresh MFA and the owner's email in editable metadata cannot appoint staff.
 for(let trust=0;trust<=3;trust++){
  await root();await db.query('update app_private.staff set trust=$1 where user_id=$2',[trust,member]);
  await identity(member,'aal2');
  check(!(await access()).capabilities['staff.manage'],'no moderator tier may appoint staff');
  await denied("select public.request_staff_change($1,'moderator',0)",[other]);
  await denied('select public.approve_staff_change($1)',[other]);
  await denied("update app_private.staff set kind='owner' where user_id=$1",[member]);
 }
 await identity(member,'aal2');check((await access()).capabilities['diagnostics.read'],'technical diagnostics with MFA');
 await root();await db.query("select set_config('request.jwt.claims',$1,false)",[JSON.stringify({sub:member,aal:'aal2',amr:[{method:'totp',timestamp:Math.floor(Date.now()/1000)-3600}]})]);await db.exec('set role authenticated');check(!(await access()).capabilities['diagnostics.read'],'stale aal2 session requires fresh MFA');
 await root();await db.query('update app_private.staff set active=false where user_id=$1',[member]);await identity(member,'aal2');check(!(await access()).capabilities['diagnostics.read'],'revocation effective with unchanged token');
 await root();await db.query("insert into app_private.staff values($1,'owner',3,true),($2,'admin',3,true)",[owner,deputy]);
 await denied("insert into app_private.staff values($1,'owner',3,true)",[other]);
 await identity(owner);await denied("select public.request_staff_change($1,'moderator',3)",[member]);
 await identity(owner,'aal2');await denied("select public.request_staff_change($1,'owner',3)",[member]);await denied("select public.request_staff_change($1,'moderator',3)",[owner]);
 let id=(await db.query("select public.request_staff_change($1,'moderator',3) as id",[member])).rows[0].id;
 await denied('select public.approve_staff_change($1)',[id]);
 await identity(deputy,'aal2');await db.query('select public.approve_staff_change($1)',[id]);await denied('select public.approve_staff_change($1)',[id]);
 await identity(member,'aal2');check((await access()).capabilities['diagnostics.read'],'independent second approval activates role');
 await identity(deputy,'aal2');await denied("select public.request_staff_change($1,'admin',3)",[other]);
 await identity(owner,'aal2');id=(await db.query("select public.request_staff_change($1,'moderator',1) as id",[other])).rows[0].id;
 await root();await db.query("update app_private.staff_requests set expires_at=now()-interval '1 second' where id=$1",[id]);await identity(deputy,'aal2');await denied('select public.approve_staff_change($1)',[id]);
 // Exercise the existing cloud RPC with the same revision/idempotency contract as Unity.
 await identity(member);let cid='10000000-0000-4000-8000-000000000001',operation='20000000-0000-4000-8000-000000000001';
 const sql='select public.save_character($1,0,$2::jsonb,1,false,$3) as saved',profile=JSON.stringify({id:'legacy-id',name:'Kept',unknown:{x:7}});
 let saved=(await db.query(sql,[cid,profile,operation])).rows[0].saved;check(saved.character.revision===1&&!saved.conflict,'cloud first save');
 saved=(await db.query(sql,[cid,profile,operation])).rows[0].saved;check(saved.character.revision===1,'lost response retry does not double write');
 saved=(await db.query(sql,[cid,profile,'20000000-0000-4000-8000-000000000002'])).rows[0].saved;check(saved.conflict===true,'stale upload preserves newer revision');
 await identity(other);check((await db.query('select * from public.characters')).rows.length===0,'RLS hides another user characters');
 await denied('delete from public.characters');await denied('select * from app_private.access_audit');
 // Execute the additive center migration against the same Auth/character store.
 await root();await db.exec(await readFile(new URL('../migrations/202610210002_moderation_center.sql',import.meta.url),'utf8'));
 await db.query("update auth.users set email='person@example.invalid' where id=$1",[other]);
 await db.exec('set role anon');await denied('select public.center_snapshot()');
 await identity(other);await denied('select * from app_private.moderation_cases');await denied('select * from app_private.account_limits');
 await identity(other);let caseId='30000000-0000-4000-8000-000000000001';
 const submit="select public.submit_moderation_case($1,'bug','Crash','Steps to reproduce',null) as c";
 let item=(await db.query(submit,[caseId])).rows[0].c;check(item.author===other,'ordinary player submits bug report');
 check((await db.query(submit,[caseId])).rows[0].c.revision===1,'submission retry idempotent');
 await denied("select public.submit_moderation_case($1,'bug','Changed','Steps to reproduce',null)",[caseId]);
 await denied('select public.center_users($1)',['person']);
 await denied("select public.submit_moderation_case($1,'content','Pack','Own pack',null)",[other]);
 await root();await db.query('update app_private.staff set trust=0 where user_id=$1',[member]);
 await identity(member,'aal2');check((await db.query('select public.center_snapshot() as s')).rows[0].s.cases.length===0,'trainee cannot see unassigned reports');
 await identity(owner,'aal2');let snapshot=(await db.query('select public.center_snapshot() as s')).rows[0].s;
 check(snapshot.cases.length===1&&snapshot.events.length>0,'administration sees cases and shared audit');
 await db.query("select public.review_case($1,1,'assign','Assigned for review',$2)",[caseId,member]);
 await root();await db.query('update app_private.staff set trust=0 where user_id=$1',[member]);
 await identity(member,'aal2');check((await db.query('select public.center_snapshot() as s')).rows[0].s.cases.length===1,'trainee sees assigned case');
 await db.query("select public.review_case($1,2,'comment','Checked reproduction',null)",[caseId]);
 await denied("select public.review_case($1,3,'accepted','Accept',null)",[caseId]);
 await denied("select public.review_case($1,3,'recommend','Recommend',null)",[caseId]);
 await root();await db.query('update app_private.staff set trust=1 where user_id=$1',[member]);
 await identity(member);await db.query("select public.review_case($1,3,'recommend','Recommend triage',null)",[caseId]);
 await denied("select public.review_case($1,4,'rejected','Reject',null)",[caseId]);
 await root();await db.query('update app_private.staff set trust=2 where user_id=$1',[member]);
 await identity(member);await db.query("select public.review_case($1,4,'resolved','Reproduction fixed',null)",[caseId]);
 await denied("select public.review_case($1,4,'rejected','Stale decision',null)",[caseId]);
 snapshot=(await db.query('select public.center_snapshot() as s')).rows[0].s;
 check(snapshot.events.some(e=>e.action==='case.resolved')&&snapshot.events.some(e=>e.actor===owner),'colleagues and admin decisions transparent to staff');
 await denied('delete from app_private.access_audit');await denied('truncate app_private.access_audit');await denied('select app_private.purge_expired_audit()');
 await identity(owner,'aal2');check((await db.query("select public.center_users('person') as u")).rows[0].u[0].id===other,'admin searches accounts without character data');
 const limit="select public.set_account_limit($1,$2,$3,now()+interval '1 hour','Reviewed complaint') as l";
 await denied(limit,[owner,0,'ban']);await denied(limit,[deputy,0,'ban']);
 await db.query(limit,[other,0,'mute']);
 await identity(other);await denied("select public.submit_moderation_case($1,'complaint','Help','Complaint',null)",[other]);
 check((await db.query('select public.center_snapshot() as s')).rows[0].s.cases.length===1,'mute preserves own case visibility');
 await db.query('select public.save_character($1,0,$2::jsonb,1,false,$3)',[other,profile,other]);
 check((await db.query('select * from public.characters')).rows.length===1,'muted player retains cloud characters');
 await identity(owner,'aal2');await db.query(limit,[other,1,'ban']);await denied(limit,[other,1,'unban']);
 await identity(other);await denied('select public.center_snapshot()');
 check((await db.query('select * from public.characters')).rows.length===0,'ban hides existing own cloud character through RLS');
 // Ban blocks existing character RPC even with a still-valid access token.
 await denied('select public.save_character($1,0,$2::jsonb,1,false,$3)',[cid,profile,operation]);
 await identity(owner,'aal2');await db.query(limit,[other,2,'unban']);await db.query(limit,[other,3,'unmute']);
 await identity(other);await db.query(submit,[caseId]);
 check((await db.query('select * from public.characters')).rows[0].profile.unknown.x===7,'unban restores original character without data loss');
 await identity(member,'aal2');await denied(limit,[other,4,'ban']);
 // A stale staff token and self-authored content cannot bypass guards.
 await root();await db.query('update app_private.staff set active=false where user_id=$1',[member]);
 await identity(member,'aal2');check((await db.query('select public.center_snapshot() as s')).rows[0].s.events.length===0,'revoked staff loses shared audit immediately');
 await denied("select public.review_case($1,6,'comment','Revoked comment',null)",[caseId]);
 await identity(deputy);await denied("select public.center_users('person')");
 await identity(owner,'aal2');let ownId='30000000-0000-4000-8000-000000000002';
 await db.query("select public.submit_moderation_case($1,'content','Own pack','Original manifest',$2::jsonb)",[ownId,JSON.stringify({id:'own.test',sha256:'a'.repeat(64)})]);
 await denied("select public.review_case($1,1,'accepted','Self approval',null)",[ownId]);
 await root();await denied("update app_private.access_audit set action='tampered'");await denied('delete from app_private.access_audit');await denied('truncate app_private.access_audit');
 // Trusted test fixture seeds an expired event; application roles cannot do this.
 await db.exec("insert into app_private.access_audit(at,action) values(clock_timestamp()-interval '25 hours','expired.fixture')");
 await identity(member);snapshot=(await db.query('select public.center_snapshot() as s')).rows[0].s;
 check(!snapshot.events.some(e=>e.action==='expired.fixture'),'events invisible immediately at retention cutoff');
 await root();check(Number((await db.query('select app_private.purge_expired_audit() as n')).rows[0].n)===1,'worker deletes only expired logs');
 check(Number((await db.query('select count(*) as n from app_private.access_audit')).rows[0].n)>0,'worker preserves unexpired logs');
 // Latest owner policy supersedes independent approval for moderators only.
 await root();await db.exec(await readFile(new URL('../migrations/202610210003_direct_moderator_management.sql',import.meta.url),'utf8'));
 await identity(owner);await denied("select public.request_staff_change($1,'moderator',0)",[member]);
 await identity(owner,'aal2');let immediate=(await db.query("select public.request_staff_change($1,'moderator',0) as id",[member])).rows[0].id;
 await identity(member);check((await access()).trust===0&&(await access()).role==='moderator','owner appoints moderator immediately without deputy');
 await identity(deputy,'aal2');await denied('select public.approve_staff_change($1)',[immediate]);
 await db.query("select public.request_staff_change($1,'moderator',3)",[member]);
 await identity(member,'aal2');check((await access()).trust===3,'deputy independently changes moderator level');
 await denied("select public.request_staff_change($1,'moderator',0)",[other]);
 await identity(deputy,'aal2');await db.query("select public.request_staff_change($1,'revoke',0)",[member]);
 await identity(member,'aal2');check((await access()).role==='member','deputy removes moderator immediately');
 await identity(owner,'aal2');await denied("select public.request_staff_change($1,'moderator',0)",[deputy]);await denied("select public.request_staff_change($1,'revoke',0)",[owner]);
 await identity(deputy,'aal2');await denied("select public.request_staff_change($1,'admin',3)",[member]);
 await root();check((await db.query("select count(*)::int n from app_private.access_audit where action='staff.direct'")).rows[0].n===3,'all direct grants/removals audited');
 // Authenticated rolling-hour chat: no raw body copies in audit.
 await root();await db.exec(await readFile(new URL('../migrations/202610210004_authenticated_chat.sql',import.meta.url),'utf8'));
 await db.exec(await readFile(new URL('../migrations/202610220001_chat_nicknames.sql',import.meta.url),'utf8'));
 await db.query("update auth.users set raw_user_meta_data=$1 where id=$2",[JSON.stringify({chat_nickname:'Лесной_маг',role:'owner'}),other]);
 await db.exec('set role anon');await denied('select public.read_chat()');await denied("select public.send_chat($1,'x')",[member]);
 await identity(other);let msg='40000000-0000-4000-8000-000000000001';
 await db.query("select public.send_chat($1,'Chat-test-unique')",[msg]);await db.query("select public.send_chat($1,'Chat-test-unique')",[msg]);
 check((await db.query('select public.read_chat() r')).rows[0].r.messages.length===1,'retry does not duplicate chat message');
 const named=(await db.query('select public.read_chat() r')).rows[0].r;check(named.nicknamesSupported===true,'nickname-capable chat contract');
 check(named.messages[0].author_name==='Лесной_маг','chat resolves nickname from existing auth profile');
 check(!JSON.stringify(named.messages).includes('user_metadata'),'chat never exposes auth metadata');
 await root();await db.query("update auth.users set raw_user_meta_data=$1 where id=$2",[JSON.stringify({chat_nickname:'<b>admin</b>'}),other]);await identity(other);
 check((await db.query('select public.read_chat() r')).rows[0].r.messages[0].author_name===null,'unsafe metadata nickname rejected server-side');
 await denied("select public.send_chat($1,'Changed payload')",[msg]);await denied('select * from app_private.chat_messages');await denied('select app_private.purge_expired_chat()');
 await identity(member);await denied("select public.send_chat($1,'Chat-test-unique')",[msg]);
 await root();await db.query("update app_private.account_limits set muted_until=now()+interval '1 hour' where user_id=$1",[other]);
 await identity(other);await denied("select public.send_chat($1,'Muted')",[other]);check((await db.query('select public.read_chat() r')).rows[0].r.messages.length===1,'muted user may read chat');
 await root();await db.query("update app_private.account_limits set muted_until=null,banned_until=now()+interval '1 hour' where user_id=$1",[other]);
 await identity(other);await denied('select public.read_chat()');await denied("select public.send_chat($1,'Banned')",[other]);
 await root();await db.query('update app_private.account_limits set banned_until=null where user_id=$1',[other]);
 await db.query("insert into app_private.chat_messages(id,author,body,created_at) values($1,$2,'Expired',clock_timestamp()-interval '3601 seconds')",[member,other]);
 await identity(other);check((await db.query('select public.read_chat() r')).rows[0].r.messages.length===1,'expired chat invisible before physical cleanup');
 await denied('select public.send_chat($1,$2)',[other,'x'.repeat(1001)]);
 for(let n=0;n<9;n++)await db.query("select public.send_chat(gen_random_uuid(),'Rate test')");
 await denied("select public.send_chat(gen_random_uuid(),'Too fast')");
 await root();check(Number((await db.query('select app_private.purge_expired_chat() n')).rows[0].n)===1,'worker purges expired chat only');
 check(Number((await db.query('select count(*) n from app_private.chat_messages')).rows[0].n)===10,'worker retains unexpired chat');
 check(Number((await db.query("select count(*) n from app_private.access_audit where details::text like '%Chat-test-unique%'")).rows[0].n)===0,'chat body not copied to longer audit');
 console.log('POSTGRES_ACCESS_CLOUD_PASS',checks,'checks: roles, forged metadata, MFA, two-person approval, revocation, receipts, conflict and RLS');
} finally {await db.close();}
