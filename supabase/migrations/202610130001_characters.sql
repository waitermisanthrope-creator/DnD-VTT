-- Managed Supabase Auth owns credentials. Profiles contain game data only.
begin;
create table public.characters (
  owner_id uuid not null references auth.users(id) on delete cascade,
  id uuid not null,
  profile jsonb not null check (jsonb_typeof(profile) = 'object'),
  schema_version integer not null check (schema_version > 0),
  revision bigint not null check (revision > 0),
  updated_at timestamptz not null default now(),
  deleted boolean not null default false,
  primary key(owner_id,id)
);
create table public.character_history (
  owner_id uuid not null,
  id uuid not null,
  revision bigint not null,
  profile jsonb not null,
  schema_version integer not null,
  deleted boolean not null,
  updated_at timestamptz not null,
  primary key(owner_id,id,revision),
  foreign key(owner_id,id) references public.characters(owner_id,id) on delete cascade
);
-- Durable receipts make retry after a lost HTTP response idempotent.
create table public.character_operations (
  owner_id uuid not null references auth.users(id) on delete cascade,
  operation_id uuid not null,
  result jsonb not null,
  primary key(owner_id,operation_id)
);
alter table public.characters enable row level security;
alter table public.character_history enable row level security;
alter table public.character_operations enable row level security;
create policy own_characters on public.characters for select to authenticated using ((select auth.uid()) = owner_id);
create policy own_history on public.character_history for select to authenticated using ((select auth.uid()) = owner_id);
revoke all on public.characters, public.character_history, public.character_operations from anon, authenticated;
grant select on public.characters, public.character_history to authenticated;

create function public.save_character(p_id uuid, p_expected_revision bigint, p_profile jsonb,
  p_schema_version integer, p_deleted boolean, p_operation_id uuid)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare
  uid uuid := auth.uid();
  current_row public.characters%rowtype;
  saved public.characters%rowtype;
  receipt jsonb;
begin
  if uid is null then raise exception 'Authentication required' using errcode = '42501'; end if;
  if p_id is null or p_operation_id is null or p_expected_revision is null or p_expected_revision < 0
     or p_schema_version is null or p_schema_version < 1 or p_deleted is null
     or p_profile is null or jsonb_typeof(p_profile) <> 'object'
     or octet_length(p_profile::text) > 1048576 then
    raise exception 'Invalid character payload' using errcode = '22023';
  end if;
  -- Serialize per owner, including first creation and operation receipt lookup.
  perform pg_advisory_xact_lock(hashtextextended(uid::text, 0));
  select result into receipt from public.character_operations where owner_id = uid and operation_id = p_operation_id;
  if found then return receipt; end if;
  select * into current_row from public.characters where owner_id = uid and id = p_id for update;
  if (found and current_row.revision <> p_expected_revision) or (not found and p_expected_revision <> 0) then
    return jsonb_build_object('conflict', true, 'character', case when current_row.id is null then null else to_jsonb(current_row) end);
  end if;
  insert into public.characters(owner_id,id,profile,schema_version,revision,deleted)
    values(uid,p_id,p_profile,p_schema_version,1,p_deleted)
    on conflict(owner_id,id) do update set profile = excluded.profile,
      schema_version = excluded.schema_version, revision = public.characters.revision + 1,
      deleted = excluded.deleted, updated_at = clock_timestamp()
    returning * into saved;
  insert into public.character_history values(uid,p_id,saved.revision,saved.profile,saved.schema_version,saved.deleted,saved.updated_at);
  delete from public.character_history where owner_id = uid and id = p_id and revision <= saved.revision - 30;
  -- Receipts retain revision metadata, not another unbounded copy of the profile.
  receipt := jsonb_build_object('conflict',false,'character',to_jsonb(saved) - 'profile');
  insert into public.character_operations values(uid,p_operation_id,receipt);
  return receipt;
end;
$$;
revoke all on function public.save_character(uuid,bigint,jsonb,integer,boolean,uuid) from public, anon;
grant execute on function public.save_character(uuid,bigint,jsonb,integer,boolean,uuid) to authenticated;
commit;
