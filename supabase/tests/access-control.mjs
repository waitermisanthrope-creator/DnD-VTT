import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
const {PGlite}=await import(process.env.PGLITE_MODULE||'@electric-sql/pglite');
const db=new PGlite();let checks=0;
const owner='00000000-0000-4000-8000-000000000001',deputy='00000000-0000-4000-8000-000000000002',member='00000000-0000-4000-8000-000000000003',other='00000000-0000-4000-8000-000000000004';
function check(value,name){assert.ok(value,name);checks++;}
async function denied(sql,args=[]){await assert.rejects(db.query(sql,args));checks++;}
async function identity(uid,aal='aal1'){await db.exec('reset role');await db.query("select set_config('request.jwt.claims',$1,false)",[JSON.stringify({sub:uid,aal,user_metadata:{role:'owner',premium:true}})]);await db.exec('set role authenticated');}
async function root(){await db.exec('reset role');}
async function access(){return (await db.query('select public.my_access() as a')).rows[0].a;}
try {
 await db.exec(`create role anon;create role authenticated;create role service_role;create schema auth;grant usage on schema auth to authenticated;create table auth.users(id uuid primary key);
 create function auth.jwt() returns jsonb language sql stable as $$select coalesce(nullif(current_setting('request.jwt.claims',true),''),'{}')::jsonb$$;
 create function auth.uid() returns uuid language sql stable as $$select (auth.jwt()->>'sub')::uuid$$;`);
 await db.query('insert into auth.users values($1),($2),($3),($4)',[owner,deputy,member,other]);
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
 await identity(member,'aal2');check((await access()).capabilities['diagnostics.read'],'technical diagnostics with MFA');
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
 console.log('POSTGRES_ACCESS_CLOUD_PASS',checks,'checks: roles, forged metadata, MFA, two-person approval, revocation, receipts, conflict and RLS');
} finally {await db.close();}
