import {readFile} from 'node:fs/promises';
export async function verifyWorkshop({db,root,identity,denied,check,member,other}) {
 await root();const migration=await readFile(new URL('../migrations/202610230001_workshop_hearts.sql',import.meta.url),'utf8');
 await db.exec(migration);await db.exec(migration); // additive, retry-safe SQL Editor deployment
 const id='dnd.collections.weapons',second='dnd.race.aasimar';
 const read=async(ids=[id,second])=>(await db.query('select public.read_workshop_hearts($1::text[]) r',[ids])).rows[0].r;
 const set=async(value,mid=id)=>(await db.query('select public.set_workshop_heart($1,$2) r',[mid,value])).rows[0].r;
 await db.query("select set_config('request.jwt.claims','{}',false)");await db.exec('set role anon');
 let result=await read();check(!result.authenticated&&result.items.length===2&&result.items.every(m=>m.rating===0&&!m.hearted),'anonymous public totals without personal data');
 await denied('select public.set_workshop_heart($1,true)',[id]);
 await denied('select * from app_private.workshop_hearts');await denied('select * from app_private.workshop_mods');
 await identity(member);check((await set(true)).rating===1,'first authenticated heart');
 check((await set(true)).rating===1,'repeated add / lost-response retry cannot duplicate vote');
 check((await read()).items.find(m=>m.id===id).hearted,'heart is own favorite');
 await identity(other);check(!(await read()).items.find(m=>m.id===id).hearted,'other account never inherits favorites');
 check((await set(true)).rating===2,'two accounts equal two hearts');
 await identity(member);result=await set(false);check(result.rating===1&&!result.hearted,'second UI press removes only own heart');
 check((await set(false)).rating===1,'repeated remove is idempotent');
 await denied('insert into app_private.workshop_hearts(mod_id,user_id) values($1,$2)',[id,member]);
 await denied('delete from app_private.workshop_hearts where user_id=$1',[other]);
 await denied('select public.set_workshop_heart($1,true)',['not.a.published.mod']);
 await denied('select public.set_workshop_heart($1,null)',[id]);await denied('select public.set_workshop_heart(null,true)');
 await denied('select public.read_workshop_hearts(null)');await denied('select public.read_workshop_hearts($1::text[])',[Array(501).fill(id)]);
 result=await read([id,id,'unknown']);check(result.items.length===1&&result.items[0].rating===1,'dedup requested IDs and ignore unpublished IDs');
 check((await read([])).items.length===0,'empty read safe');
 await root();await db.query('update app_private.workshop_mods set active=false where id=$1',[second]);
 await identity(member);await denied('select public.set_workshop_heart($1,true)',[second]);check((await read([second])).items.length===0,'inactive mods hidden');
 await root();await db.query('update app_private.workshop_mods set active=true where id=$1',[second]);
 await db.query("update app_private.account_limits set banned_until=now()+interval '1 hour' where user_id=$1",[other]);
 await identity(other);await denied('select public.set_workshop_heart($1,false)',[id]);await denied('select public.read_workshop_hearts($1::text[])',[[id]]);
 await root();await db.query('update app_private.account_limits set banned_until=null where user_id=$1',[other]);
 await db.query("select set_config('request.jwt.claims','{}',false)");await db.exec('set role anon');
 result=await read();check(result.items.find(m=>m.id===id).rating===1&&result.items.every(m=>!m.hearted),'anonymous sees updated totals, no user favorite flag');
 check(result.items.every(m=>Object.keys(m).sort().join(',')==='hearted,id,rating'),'response has no voter UUID/email/timestamps');
 await identity(other);check((await set(false)).rating===0,'last user can remove heart; count never negative');
 check((await set(false)).rating===0,'zero remains zero on duplicate remove');
 await root();check(Number((await db.query('select count(*) n from app_private.workshop_mods')).rows[0].n)===417,'trusted registry covers all current mods and collections');
}
