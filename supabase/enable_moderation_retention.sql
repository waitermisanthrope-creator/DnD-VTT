-- Trusted operator only, after migrations 001 and 002. Never run from APK.
-- pg_cron must be enabled by the Supabase project operator beforehand.
do $$
begin
 if not exists(select 1 from pg_extension where extname='pg_cron') then
  raise exception 'Enable pg_cron first; retention is NOT deployed';
 end if;
end;$$;
-- Same named job updates on re-run; cleanup has no public RPC grant.
select cron.schedule('dnd-vtt-audit-expiry','* * * * *',
 $$select app_private.purge_expired_audit();$$);
-- Prevent scheduler execution records themselves from accumulating indefinitely.
select cron.schedule('dnd-vtt-audit-job-history-expiry','* * * * *',
 $$delete from cron.job_run_details where end_time < clock_timestamp()-interval '24 hours'
 and jobid in (select jobid from cron.job where jobname in ('dnd-vtt-audit-expiry','dnd-vtt-audit-job-history-expiry'));$$);
