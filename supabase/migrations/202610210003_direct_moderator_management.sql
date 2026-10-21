-- Owner policy: either administrator appoints/removes moderators independently.
begin;
create or replace function public.request_staff_change(p_target uuid,p_kind text,p_trust integer) returns uuid language plpgsql security definer set search_path='' as $$
declare uid uuid:=auth.uid(); my_kind text; target_kind text; request_id uuid;
begin
 perform public.require_capability('staff.manage');
 perform pg_advisory_xact_lock(8841,2026);
 select kind into my_kind from app_private.staff where user_id=uid and active;
 select kind into target_kind from app_private.staff where user_id=p_target and active;
 if p_target=uid or p_target is null or p_kind is null or p_kind not in ('moderator','admin','revoke') or p_trust not between 0 and 3 or p_trust is null or target_kind='owner' or (my_kind<>'owner' and (p_kind='admin' or target_kind='admin')) then
  raise exception 'Staff change denied' using errcode='42501';
 end if;
 -- Moderator appointments/removals are immediate for either administrator.
 -- Deputy changes retain the separate owner-controlled critical workflow.
 if p_kind='moderator' and target_kind='admin' then
  raise exception 'Deputy cannot be changed through moderator appointment' using errcode='42501';
 end if;
 if p_kind='moderator' or (p_kind='revoke' and target_kind is distinct from 'admin') then
  if p_kind='revoke' then update app_private.staff set active=false where user_id=p_target;
  else insert into app_private.staff(user_id,kind,trust,active) values(p_target,'moderator',p_trust,true)
   on conflict(user_id) do update set kind='moderator',trust=excluded.trust,active=true;
  end if;
  insert into app_private.staff_requests(requester,target,kind,trust,applied_at)
   values(uid,p_target,p_kind,p_trust,clock_timestamp()) returning id into request_id;
  insert into app_private.access_audit(actor,target,action,details) values(uid,p_target,'staff.direct',jsonb_build_object('request',request_id,'kind',p_kind,'trust',p_trust));
  return request_id;
 end if;
 insert into app_private.staff_requests(requester,target,kind,trust) values(uid,p_target,p_kind,p_trust) returning id into request_id;
 insert into app_private.access_audit(actor,target,action,details) values(uid,p_target,'staff.request',jsonb_build_object('request',request_id,'kind',p_kind,'trust',p_trust));
 return request_id;
end;$$;

-- Supersede old pending moderator decisions; never replay them over newer roles.
update app_private.staff_requests set expires_at=least(expires_at,clock_timestamp())
 where applied_at is null and kind in ('moderator','revoke');
insert into app_private.access_audit(action,details) values('staff.policy',jsonb_build_object('moderators','direct administrator decision; fresh MFA required'));
notify pgrst, 'reload schema';
commit;
