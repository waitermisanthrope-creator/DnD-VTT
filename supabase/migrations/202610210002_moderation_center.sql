-- Existing Auth/access control only. Trusted operator applies after 001.
begin;
create table app_private.account_limits(
 user_id uuid primary key references auth.users(id), banned_until timestamptz,muted_until timestamptz,
 reason text not null,revision bigint not null default 1,changed_by uuid not null references auth.users(id)
);
create table app_private.moderation_cases(
 id uuid primary key,author uuid not null references auth.users(id),
 kind text not null check(kind in ('content','complaint','bug')),
 title text not null check(length(title) between 1 and 160),
 body text not null check(length(body) between 1 and 8000),
 package_manifest jsonb,assigned_to uuid references auth.users(id),
 status text not null default 'open' check(status in ('open','changes','accepted','rejected','resolved')),
 revision bigint not null default 1,created_at timestamptz not null default clock_timestamp()
);
alter table app_private.account_limits enable row level security;
alter table app_private.moderation_cases enable row level security;
revoke all on app_private.account_limits,app_private.moderation_cases from public,anon,authenticated;

create function app_private.not_banned() returns boolean language sql stable security definer set search_path='' as $$
 select auth.uid() is not null and not exists(select 1 from app_private.account_limits where user_id=auth.uid() and banned_until>now());
$$;
-- Existing cloud content remains intact, but a ban denies its remote use.
create policy account_not_banned on public.characters as restrictive for select to authenticated using(app_private.not_banned());
create policy history_account_not_banned on public.character_history as restrictive for select to authenticated using(app_private.not_banned());
-- RLS helper requires schema usage for policy evaluation, never table access.
grant usage on schema app_private to authenticated;
revoke all on function app_private.not_banned() from public,anon;
grant execute on function app_private.not_banned() to authenticated;
create function app_private.guard_character_save() returns trigger language plpgsql security definer set search_path='' as $$
begin
 if auth.uid() is not null and not app_private.not_banned() then raise exception 'Account suspended' using errcode='42501';end if;return new;
end;$$;
create trigger account_save_guard before insert or update on public.characters for each row execute function app_private.guard_character_save();

-- Audit cannot be edited, truncated, or removed early by application roles.
create function app_private.audit_guard() returns trigger language plpgsql set search_path='' as $$
begin
 if TG_OP='DELETE' and old.at<=clock_timestamp()-interval '24 hours' then return old;end if;
 raise exception 'Audit immutable for 24 hours' using errcode='42501';
end;$$;
create trigger immutable_audit before update or delete on app_private.access_audit for each row execute function app_private.audit_guard();
create function app_private.reject_audit_truncate() returns trigger language plpgsql set search_path='' as $$
begin raise exception 'Audit truncate prohibited' using errcode='42501';end;$$;
create trigger no_audit_truncate before truncate on app_private.access_audit for each statement execute function app_private.reject_audit_truncate();
create index access_audit_expiry on app_private.access_audit(at);
create function app_private.purge_expired_audit() returns bigint language plpgsql security definer set search_path='' as $$
declare n bigint;
begin delete from app_private.access_audit where at<=clock_timestamp()-interval '24 hours';get diagnostics n=row_count;return n;end;$$;
revoke all on function app_private.purge_expired_audit() from public,anon,authenticated;

create function app_private.center_guard(p_staff boolean default false) returns void language plpgsql security definer set search_path='' as $$
begin
 if not app_private.not_banned() then raise exception 'Authentication required or suspended' using errcode='42501';end if;
 if p_staff then perform public.require_capability('review.read');end if;
end;$$;
create function public.submit_moderation_case(p_id uuid,p_kind text,p_title text,p_body text,p_manifest jsonb default null) returns jsonb language plpgsql security definer set search_path='' as $$
declare c app_private.moderation_cases%rowtype;
begin
 perform app_private.center_guard();
 if exists(select 1 from app_private.account_limits where user_id=auth.uid() and muted_until>now()) then raise exception 'Account muted' using errcode='42501';end if;
 if p_id is null or p_kind is null or p_kind not in ('content','complaint','bug') or p_title is null or length(trim(p_title)) not between 1 and 160 or p_body is null or length(trim(p_body)) not between 1 and 8000 or (p_manifest is not null and octet_length(p_manifest::text)>16384) then raise exception 'Invalid case' using errcode='22023';end if;
 if p_kind='content' then
  perform public.require_capability('creator.submit');
  if p_manifest is null or jsonb_typeof(p_manifest)<>'object' or coalesce(p_manifest->>'id','')='' or coalesce(p_manifest->>'sha256','')!~'^[a-f0-9]{64}$' then raise exception 'Manifest required' using errcode='22023';end if;
 end if;
 perform pg_advisory_xact_lock(hashtextextended(auth.uid()::text,4));
 select * into c from app_private.moderation_cases where id=p_id;
 if found then
  if c.author<>auth.uid() or c.kind<>p_kind or c.title<>trim(p_title) or c.body<>trim(p_body) or c.package_manifest is distinct from p_manifest then raise exception 'Operation ID reused' using errcode='22023';end if;
  return to_jsonb(c);
 end if;
 if (select count(*) from app_private.moderation_cases where author=auth.uid() and created_at>now()-interval '1 day')>=20 then raise exception 'Daily case limit' using errcode='54000';end if;
 insert into app_private.moderation_cases(id,author,kind,title,body,package_manifest) values(p_id,auth.uid(),p_kind,trim(p_title),trim(p_body),p_manifest) returning * into c;
 insert into app_private.access_audit(actor,action,details) values(auth.uid(),'case.submit',jsonb_build_object('case',p_id,'kind',p_kind));
 return to_jsonb(c);
end;$$;
create function public.center_snapshot(p_before timestamptz default null) returns jsonb language plpgsql security definer set search_path='' as $$
declare a jsonb;items jsonb;events jsonb;
begin
 perform app_private.center_guard();a:=public.my_access();
 if coalesce((a->'capabilities'->>'review.read')::boolean,false) then
  select coalesce(jsonb_agg(to_jsonb(t)),'[]') into items from (select * from app_private.moderation_cases where (a->>'role' in ('owner','admin') or (a->>'trust')::int>=2 or assigned_to=auth.uid()) order by created_at desc limit 50)t;
  -- Transparent decisions to all staff; no private report bodies/user emails.
  select coalesce(jsonb_agg(to_jsonb(t)),'[]') into events from (select id,at,actor,target,action,details from app_private.access_audit where at>clock_timestamp()-interval '24 hours' and (p_before is null or at<p_before) order by at desc,id desc limit 100)t;
 else
  select coalesce(jsonb_agg(to_jsonb(t)),'[]') into items from (select * from app_private.moderation_cases where author=auth.uid() order by created_at desc limit 50)t;events:='[]';
 end if;
 return jsonb_build_object('access',a,'cases',items,'events',events,'staffRequests',case when coalesce((a->'capabilities'->>'staff.manage')::boolean,false) then (select coalesce(jsonb_agg(to_jsonb(t)),'[]') from (select id,requester,target,kind,trust,expires_at from app_private.staff_requests where applied_at is null and expires_at>clock_timestamp() order by expires_at limit 50)t) else '[]'::jsonb end,'serverTime',clock_timestamp(),'auditRetentionSeconds',86400);
end;$$;
create function public.review_case(p_id uuid,p_revision bigint,p_action text,p_note text,p_assignee uuid default null) returns jsonb language plpgsql security definer set search_path='' as $$
declare c app_private.moderation_cases%rowtype;a jsonb;curator boolean;
begin
 perform app_private.center_guard(true);a:=public.my_access();curator:=a->>'role' in ('owner','admin') or (a->>'trust')::int>=2;
 select * into c from app_private.moderation_cases where id=p_id for update;
 if not found or c.author=auth.uid() or (not curator and c.assigned_to is distinct from auth.uid()) then raise exception 'Case denied' using errcode='42501';end if;
 if p_revision is null or c.revision<>p_revision then raise exception 'Revision conflict' using errcode='40001';end if;
 if p_note is null or length(trim(p_note)) not between 1 and 2000 or p_action is null or p_action not in ('comment','recommend','assign','changes','accepted','rejected','resolved') then raise exception 'Invalid review' using errcode='22023';end if;
 if p_action='recommend' then perform public.require_capability('review.decide');end if;
 if p_action in ('assign','changes','accepted','rejected','resolved') and not curator then raise exception 'Curator required' using errcode='42501';end if;
 if p_action='assign' then
  if not exists(select 1 from app_private.staff where user_id=p_assignee and active) or p_assignee=c.author then raise exception 'Invalid assignee' using errcode='22023';end if;
  update app_private.moderation_cases set assigned_to=p_assignee,revision=revision+1 where id=p_id returning * into c;
 else
  update app_private.moderation_cases set status=case when p_action in ('changes','accepted','rejected','resolved') then p_action else status end,revision=revision+1 where id=p_id returning * into c;
 end if;
 insert into app_private.access_audit(actor,target,action,details) values(auth.uid(),c.author,'case.'||p_action,jsonb_build_object('case',p_id,'revision',c.revision,'note',trim(p_note),'assignee',p_assignee));
 -- accepted is a review decision, never publication or remote code execution.
 return to_jsonb(c);
end;$$;
create function public.center_users(p_query text default '') returns jsonb language plpgsql security definer set search_path='' as $$
declare result jsonb;
begin
 perform app_private.center_guard();perform public.require_capability('staff.manage');
 if p_query is null or length(p_query)>160 then raise exception 'Invalid search' using errcode='22023';end if;
 select coalesce(jsonb_agg(to_jsonb(t)),'[]') into result from (
 select u.id,u.email,s.kind,s.trust,s.active,l.banned_until,l.muted_until,coalesce(l.revision,0) revision from auth.users u left join app_private.staff s on s.user_id=u.id left join app_private.account_limits l on l.user_id=u.id where p_query<>'' and (u.email ilike '%'||replace(replace(p_query,'%','\\%'),'_','\\_')||'%' or u.id::text=p_query) order by u.id limit 30)t;
 return result;
end;$$;
create function public.set_account_limit(p_target uuid,p_revision bigint,p_kind text,p_until timestamptz,p_reason text) returns jsonb language plpgsql security definer set search_path='' as $$
declare row app_private.account_limits%rowtype;
begin
 perform app_private.center_guard();perform public.require_capability('staff.manage');
 if p_target is null or p_target=auth.uid() or not exists(select 1 from auth.users where id=p_target) or exists(select 1 from app_private.staff where user_id=p_target and kind in ('owner','admin') and active) then raise exception 'Protected account' using errcode='42501';end if;
 if p_kind is null or p_kind not in ('ban','mute','unban','unmute') or p_reason is null or length(trim(p_reason)) not between 1 and 1000 or (p_kind in ('ban','mute') and (p_until is null or p_until<=clock_timestamp() or p_until>clock_timestamp()+interval '30 days')) then raise exception 'Invalid limit' using errcode='22023';end if;
 perform pg_advisory_xact_lock(hashtextextended(p_target::text,5));
 select * into row from app_private.account_limits where user_id=p_target for update;
 if p_revision is null or coalesce(row.revision,0)<>p_revision then raise exception 'Revision conflict' using errcode='40001';end if;
 insert into app_private.account_limits(user_id,banned_until,muted_until,reason,revision,changed_by) values(p_target,case when p_kind='ban' then p_until else row.banned_until end,case when p_kind='mute' then p_until else row.muted_until end,trim(p_reason),1,auth.uid()) on conflict(user_id) do update set banned_until=case when p_kind='ban' then p_until when p_kind='unban' then null else app_private.account_limits.banned_until end,muted_until=case when p_kind='mute' then p_until when p_kind='unmute' then null else app_private.account_limits.muted_until end,reason=excluded.reason,revision=app_private.account_limits.revision+1,changed_by=auth.uid() returning * into row;
 insert into app_private.access_audit(actor,target,action,details) values(auth.uid(),p_target,'account.'||p_kind,jsonb_build_object('reason',trim(p_reason),'until',p_until,'revision',row.revision));return to_jsonb(row);
end;$$;
-- Whitelist public RPCs; helper functions never become client endpoints.
revoke all on function app_private.guard_character_save(),app_private.audit_guard(),app_private.reject_audit_truncate(),app_private.center_guard(boolean) from public,anon,authenticated;
revoke all on function public.submit_moderation_case(uuid,text,text,text,jsonb),public.center_snapshot(timestamptz),public.review_case(uuid,bigint,text,text,uuid),public.center_users(text),public.set_account_limit(uuid,bigint,text,timestamptz,text) from public,anon;
grant execute on function public.submit_moderation_case(uuid,text,text,text,jsonb),public.center_snapshot(timestamptz),public.review_case(uuid,bigint,text,text,uuid),public.center_users(text),public.set_account_limit(uuid,bigint,text,timestamptz,text) to authenticated;
commit;
