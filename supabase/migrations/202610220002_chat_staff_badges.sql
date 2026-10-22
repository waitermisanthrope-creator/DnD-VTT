-- Staff badges come exclusively from active server-side appointments.
-- Auth metadata/nicknames never grant a badge; revocation takes effect on next read.
begin;
create or replace function public.read_chat() returns jsonb language plpgsql security definer set search_path='' as $$
declare messages jsonb;
begin
 perform app_private.center_guard();
 select coalesce(jsonb_agg(to_jsonb(t) order by t.created_at,t.id),'[]') into messages from (
 select c.id,c.author,c.body,c.created_at,c.created_at+interval '1 hour' expires_at,
 case when char_length(trim(u.raw_user_meta_data->>'chat_nickname')) between 3 and 24
 and trim(u.raw_user_meta_data->>'chat_nickname') ~ '^[A-Za-zА-Яа-яЁё0-9 _-]{3,24}$'
 then trim(u.raw_user_meta_data->>'chat_nickname') else null end author_name, s.kind author_role, s.trust author_trust
 from app_private.chat_messages c left join auth.users u on u.id=c.author
 left join app_private.staff s on s.user_id=c.author and s.active
 where c.created_at>clock_timestamp()-interval '1 hour' order by c.created_at desc,c.id desc limit 100)t;
 return jsonb_build_object('messages',messages,'serverTime',clock_timestamp(),'retentionSeconds',3600,'nicknamesSupported',true,'roleBadgesSupported',true);
end;$$;
revoke all on function public.read_chat() from public,anon;
grant execute on function public.read_chat() to authenticated;
notify pgrst,'reload schema';
commit;
