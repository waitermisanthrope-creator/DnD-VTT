-- Trusted SQL Editor, after migration 004 and enabled pg_cron.
select cron.schedule('dnd-vtt-chat-expiry','* * * * *',
 $$select app_private.purge_expired_chat();$$);
select cron.schedule('dnd-vtt-audit-job-history-expiry','* * * * *',
 $$delete from cron.job_run_details where end_time<clock_timestamp()-interval '24 hours'
 and jobid in(select jobid from cron.job where jobname in
 ('dnd-vtt-audit-expiry','dnd-vtt-audit-job-history-expiry','dnd-vtt-chat-expiry'));$$);
