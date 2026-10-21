-- Authenticated global chat, rolling one-hour history. No anonymous access.
begin;
create table app_private.chat_messages(
 id uuid primary key,author uuid not null references auth.users(id),
 body text not null check(length(trim(body)) between 1 and 1000),
 created_at timestamptz not null default clock_timestamp()
);
create index chat_expiry on app_private.chat_messages(created_at,id);
create index chat_rate on app_private.chat_messages(author,created_at);
alter table app_private.chat_messages enable row level security;
revoke all on app_private.chat_messages from public,anon,authenticated;
create function public.read_chat() returns jsonb language plpgsql security definer set search_path='' as $$
declare messages jsonb;
begin
 perform app_private.center_guard();
 select coalesce(jsonb_agg(to_jsonb(t) order by t.created_at,t.id),'[]') into messages from (
 select id,author,body,created_at,created_at+interval '1 hour' expires_at from app_private.chat_messages
 where created_at>clock_timestamp()-interval '1 hour' order by created_at desc,id desc limit 100)t;
 return jsonb_build_object('messages',messages,'serverTime',clock_timestamp(),'retentionSeconds',3600);
end;$$;
create function public.send_chat(p_id uuid,p_body text) returns jsonb language plpgsql security definer set search_path='' as $$
declare m app_private.chat_messages%rowtype;
begin
 perform app_private.center_guard();
 if exists(select 1 from app_private.account_limits where user_id=auth.uid() and muted_until>clock_timestamp()) then raise exception 'Account muted' using errcode='42501';end if;
 if p_id is null or p_body is null or length(trim(p_body)) not between 1 and 1000 then raise exception 'Invalid message' using errcode='22023';end if;
 perform pg_advisory_xact_lock(hashtextextended(auth.uid()::text,6));
 select * into m from app_private.chat_messages where id=p_id;
 if found then
  if m.author<>auth.uid() or m.body<>trim(p_body) then raise exception 'Message ID reused' using errcode='22023';end if;
  return to_jsonb(m);
 end if;
 if (select count(*) from app_private.chat_messages where author=auth.uid() and created_at>clock_timestamp()-interval '1 minute')>=10 then raise exception 'Chat rate limit' using errcode='54000';end if;
 insert into app_private.chat_messages(id,author,body) values(p_id,auth.uid(),trim(p_body)) returning * into m;
 -- Never duplicate message bodies into the 24-hour administrative audit.
 return to_jsonb(m);
end;$$;
create function app_private.purge_expired_chat() returns bigint language plpgsql security definer set search_path='' as $$
declare n bigint;
begin delete from app_private.chat_messages where created_at<=clock_timestamp()-interval '1 hour';get diagnostics n=row_count;return n;end;$$;
revoke all on function app_private.purge_expired_chat() from public,anon,authenticated;
revoke all on function public.read_chat(),public.send_chat(uuid,text) from public,anon;
grant execute on function public.read_chat(),public.send_chat(uuid,text) to authenticated;
notify pgrst,'reload schema';
commit;
