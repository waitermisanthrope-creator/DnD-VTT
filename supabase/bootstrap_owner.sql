-- psql -v owner_uuid='VERIFIED_AUTH_USER_UUID' -f supabase/bootstrap_owner.sql
-- Trusted operator only. Owner explicitly authorized this identity; not public RPC.
\set ON_ERROR_STOP on
begin;
select set_config('dnd.bootstrap.owner_uuid', :'owner_uuid', true);
do $$
declare uid uuid:=current_setting('dnd.bootstrap.owner_uuid')::uuid;
begin
 perform pg_advisory_xact_lock(8841,2026);
 if not exists(select 1 from auth.users where id=uid and lower(email)='waiter.misanthrope@gmail.com' and email_confirmed_at is not null) then
  raise exception 'UUID must belong to the independently verified, email-confirmed owner account';
 end if;
 if exists(select 1 from app_private.staff where kind='owner' and active and user_id<>uid) then
  raise exception 'Different owner already exists; no automatic replacement';
 end if;
 insert into app_private.staff(user_id,kind,trust,active) values(uid,'owner',3,true)
 on conflict(user_id) do update set kind='owner',trust=3,active=true;
 insert into app_private.access_audit(actor,target,action) values(uid,uid,'owner.trusted_bootstrap');
end;$$;
commit;
