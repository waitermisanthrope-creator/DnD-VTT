-- Run against a disposable database with the migration applied, never production.
-- The transaction rolls back all test users and characters. PostgreSQL ASSERT
-- and caught permission failures exercise actual policies and the CAS RPC.
begin;
insert into auth.users(id) values
 ('11111111-1111-4111-8111-111111111111'),
 ('22222222-2222-4222-8222-222222222222');
set local role authenticated;
select set_config('request.jwt.claim.sub','11111111-1111-4111-8111-111111111111',true);
select set_config('request.jwt.claims','{"sub":"11111111-1111-4111-8111-111111111111","role":"authenticated"}',true);
do $$
declare r jsonb;
begin
  r:=public.save_character('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',0,'{"name":"Герой A","appearance3d":{"height":0.7}}',3,false,'aaaaaaaa-0000-4000-8000-000000000001');
  assert (r->>'conflict')::boolean=false;
  assert (r->'character'->>'revision')::integer=1;
  r:=public.save_character('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',0,'{"name":"retry must not replace"}',3,false,'aaaaaaaa-0000-4000-8000-000000000001');
  assert (r->'character'->>'revision')::integer=1;
  assert (select profile->>'name' from public.characters)='Герой A';
  r:=public.save_character('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',0,'{"name":"stale"}',3,false,'aaaaaaaa-0000-4000-8000-000000000002');
  assert (r->>'conflict')::boolean=true;
  assert (select revision from public.characters)=1;
  r:=public.save_character('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',1,'{"name":"Герой A","hpCurrent":2}',3,false,'aaaaaaaa-0000-4000-8000-000000000003');
  assert (r->'character'->>'revision')::integer=2;
  assert (select count(*) from public.character_history)=2;
  begin
    update public.characters set profile='{}';
    raise exception 'Direct writes must be denied';
  exception when insufficient_privilege then null; end;
  begin
    delete from public.characters;
    raise exception 'Direct deletes must be denied';
  exception when insufficient_privilege then null; end;
  begin
    perform public.save_character('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',2,'[]',3,false,'aaaaaaaa-0000-4000-8000-000000000004');
    raise exception 'Invalid payload must be denied';
  exception when invalid_parameter_value then null; end;
end $$;
select set_config('request.jwt.claim.sub','22222222-2222-4222-8222-222222222222',true);
select set_config('request.jwt.claims','{"sub":"22222222-2222-4222-8222-222222222222","role":"authenticated"}',true);
do $$
declare r jsonb;
begin
  assert (select count(*) from public.characters where id='aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa')=0;
  assert (select count(*) from public.character_history where id='aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa')=0;
  r:=public.save_character('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',2,'{"name":"attack"}',3,false,'bbbbbbbb-0000-4000-8000-000000000001');
  assert (r->>'conflict')::boolean=true;
  assert r->'character'='null'::jsonb;
  -- Same UUID under a different owner cannot overwrite or disclose A's data.
  r:=public.save_character('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',0,'{"name":"Герой B"}',3,false,'bbbbbbbb-0000-4000-8000-000000000002');
  assert (r->>'conflict')::boolean=false;
  assert (select count(*) from public.characters)=1;
  assert (select profile->>'name' from public.characters)='Герой B';
end $$;
set local role anon;
do $$
begin
  begin perform * from public.characters;raise exception 'Anonymous read must fail';exception when insufficient_privilege then null;end;
  begin perform * from public.character_history;raise exception 'Anonymous history must fail';exception when insufficient_privilege then null;end;
  begin perform public.save_character('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',0,'{}',3,false,'cccccccc-0000-4000-8000-000000000001');raise exception 'Anonymous RPC must fail';exception when insufficient_privilege then null;end;
end $$;
set local role authenticated;
select set_config('request.jwt.claim.sub','11111111-1111-4111-8111-111111111111',true);
select set_config('request.jwt.claims','{"sub":"11111111-1111-4111-8111-111111111111","role":"authenticated"}',true);
do $$
declare r jsonb;
begin
  r:=public.save_character('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',2,'{"name":"Герой A","hpCurrent":2}',3,true,'aaaaaaaa-0000-4000-8000-000000000005');
  assert (r->'character'->>'revision')::integer=3;
  assert (select deleted from public.characters)=true;
  r:=public.save_character('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',2,'{"name":"stale resurrection"}',3,false,'aaaaaaaa-0000-4000-8000-000000000006');
  assert (r->>'conflict')::boolean=true;
  -- Restore uses current revision and retains old history.
  r:=public.save_character('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',3,(select profile from public.character_history where revision=1),3,false,'aaaaaaaa-0000-4000-8000-000000000007');
  assert (r->'character'->>'revision')::integer=4;
  assert (select deleted from public.characters)=false;
  assert (select profile->'appearance3d'->>'height' from public.characters)='0.7';
  assert (select count(*) from public.character_history)=4;
  begin perform * from public.character_operations;raise exception 'Receipts must stay private';exception when insufficient_privilege then null;end;
end $$;
reset role;
rollback;
select 'CLOUD_RLS_TEST_OK: own/foreign/anon access, CAS, idempotency, history, tombstones, restore';
