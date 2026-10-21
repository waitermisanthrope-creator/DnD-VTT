-- Additive access control. Existing character RLS/RPCs remain unchanged.
-- Apply with a trusted migration identity, never an APK or public key.
begin;
create schema if not exists app_private;
revoke all on schema app_private from public,anon,authenticated;
create table app_private.staff (
 user_id uuid primary key references auth.users(id) on delete cascade,
 kind text not null check(kind in ('moderator','admin','owner')),
 trust integer not null default 0 check(trust between 0 and 3),
 active boolean not null default true
);
create unique index single_active_owner on app_private.staff((kind)) where kind='owner' and active;
create unique index single_active_deputy on app_private.staff((kind)) where kind='admin' and active;
create table app_private.entitlements (
 user_id uuid not null references auth.users(id) on delete cascade,
 feature text not null check(feature in ('premium','creator_page')),
 verified boolean not null default false,
 expires_at timestamptz,
 payment_reference text unique,
 primary key(user_id,feature)
);
create table app_private.access_audit (
 id bigint generated always as identity primary key,
 at timestamptz not null default clock_timestamp(),actor uuid,target uuid,
 action text not null,details jsonb not null default '{}'
);
create table app_private.staff_requests (
 id uuid primary key default gen_random_uuid(),requester uuid not null references auth.users(id),
 target uuid not null references auth.users(id),kind text not null check(kind in ('moderator','admin','revoke')),
 trust integer not null check(trust between 0 and 3),
 expires_at timestamptz not null default clock_timestamp()+interval '1 hour',
 approved_by uuid references auth.users(id),applied_at timestamptz
);
alter table app_private.staff enable row level security;
alter table app_private.entitlements enable row level security;
alter table app_private.access_audit enable row level security;
alter table app_private.staff_requests enable row level security;
revoke all on all tables in schema app_private from public,anon,authenticated;

create function public.my_access() returns jsonb language plpgsql stable security definer set search_path='' as $$
declare uid uuid:=auth.uid(); s app_private.staff%rowtype; premium boolean; creator boolean; elevated boolean; tags jsonb;
begin
 if uid is null then raise exception 'Authentication required' using errcode='42501'; end if;
 select * into s from app_private.staff where user_id=uid and active;
 elevated:=coalesce(s.kind in ('admin','owner'),false);
 premium:=s.user_id is not null or exists(select 1 from app_private.entitlements where user_id=uid and feature='premium' and verified and (expires_at is null or expires_at>now()));
 creator:=premium and (s.user_id is not null or exists(select 1 from app_private.entitlements where user_id=uid and feature='creator_page' and verified and (expires_at is null or expires_at>now())));
 tags:=jsonb_build_array('Авторизован');
 if premium then tags:=tags||jsonb_build_array('Премиум');end if;
 if creator then tags:=tags||jsonb_build_array('Премиум создатель');end if;
 if s.kind='moderator' then tags:=tags||jsonb_build_array('Модератор: '||(array['Стажёр','Проверяющий','Куратор','Технический специалист'])[s.trust+1]);end if;
 if elevated then tags:=tags||jsonb_build_array(case s.kind when 'owner' then 'Владелец' else 'Администрация — заместитель' end);end if;
 return jsonb_build_object('tags',tags,'role',coalesce(s.kind,'member'),'trust',coalesce(s.trust,0),'capabilities',jsonb_build_object(
  'cloud.own',true,'workshop.paid',premium,'creator.submit',creator,
  'review.read',s.user_id is not null,
  'review.decide',elevated or coalesce(s.kind='moderator' and s.trust>=1,false),
  'workshop.publish',elevated or coalesce(s.kind='moderator' and s.trust>=2,false),
  'diagnostics.read',(elevated or coalesce(s.kind='moderator' and s.trust>=3,false)) and coalesce(auth.jwt()->>'aal'='aal2',false),
  'staff.manage',elevated and coalesce(auth.jwt()->>'aal'='aal2',false)
  ));
end;$$;
revoke all on function public.my_access() from public,anon;
grant execute on function public.my_access() to authenticated;

-- Capability check is called INSIDE each future privileged operation. Returning
-- a badge in my_access is never sufficient authorization for another endpoint.
create function public.require_capability(p_capability text) returns void language plpgsql security definer set search_path='' as $$
begin
 if coalesce((public.my_access()->'capabilities'->>p_capability)::boolean,false) is not true then
  raise exception 'Capability denied' using errcode='42501';
 end if;
end;$$;
revoke all on function public.require_capability(text) from public,anon;
grant execute on function public.require_capability(text) to authenticated;

create function public.request_staff_change(p_target uuid,p_kind text,p_trust integer) returns uuid language plpgsql security definer set search_path='' as $$
declare uid uuid:=auth.uid(); my_kind text; target_kind text; request_id uuid;
begin
 perform public.require_capability('staff.manage');
 select kind into my_kind from app_private.staff where user_id=uid and active;
 select kind into target_kind from app_private.staff where user_id=p_target and active;
 if p_target=uid or p_target is null or p_kind is null or p_kind not in ('moderator','admin','revoke') or p_trust not between 0 and 3 or p_trust is null or target_kind='owner' or (my_kind<>'owner' and (p_kind='admin' or target_kind='admin')) then
  raise exception 'Staff change denied' using errcode='42501';
 end if;
 insert into app_private.staff_requests(requester,target,kind,trust) values(uid,p_target,p_kind,p_trust) returning id into request_id;
 insert into app_private.access_audit(actor,target,action,details) values(uid,p_target,'staff.request',jsonb_build_object('request',request_id,'kind',p_kind,'trust',p_trust));
 return request_id;
end;$$;
revoke all on function public.request_staff_change(uuid,text,integer) from public,anon;
grant execute on function public.request_staff_change(uuid,text,integer) to authenticated;

create function public.approve_staff_change(p_request uuid) returns void language plpgsql security definer set search_path='' as $$
declare uid uuid:=auth.uid(); r app_private.staff_requests%rowtype; requester_role text;
begin
 perform public.require_capability('staff.manage');
 -- Serialize all staff mutations, including uniqueness/deputy replacement.
 perform pg_advisory_xact_lock(8841,2026);
 select * into r from app_private.staff_requests where id=p_request for update;
 if not found or r.requester=uid or r.target=uid or r.applied_at is not null or r.expires_at<=clock_timestamp() then raise exception 'Second independent approval required' using errcode='42501'; end if;
 select kind into requester_role from app_private.staff where user_id=r.requester and active and kind in ('owner','admin');
 if requester_role is null or exists(select 1 from app_private.staff where user_id=r.target and kind='owner' and active) then raise exception 'Requester revoked or owner protected' using errcode='42501';end if;
 if r.kind='admin' and requester_role<>'owner' then raise exception 'Owner required' using errcode='42501';end if;
 if r.kind='revoke' then update app_private.staff set active=false where user_id=r.target;
 else
  if r.kind='admin' then update app_private.staff set active=false where kind='admin' and active;end if;
  insert into app_private.staff(user_id,kind,trust,active) values(r.target,r.kind,r.trust,true) on conflict(user_id) do update set kind=excluded.kind,trust=excluded.trust,active=true;
 end if;
 update app_private.staff_requests set approved_by=uid,applied_at=clock_timestamp() where id=p_request;
 insert into app_private.access_audit(actor,target,action,details) values(uid,r.target,'staff.approve',jsonb_build_object('request',p_request,'requester',r.requester,'kind',r.kind,'trust',r.trust));
end;$$;
revoke all on function public.approve_staff_change(uuid) from public,anon;
grant execute on function public.approve_staff_change(uuid) to authenticated;
commit;
