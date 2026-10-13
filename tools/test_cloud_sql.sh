#!/usr/bin/env bash
# Run migration/RLS tests in a NEW disposable local database. No production data
# is used. PG_BIN points to PostgreSQL client binaries; cloud onboarding installs
# them under /workspace/cloud-tools/pg. The test database is dropped on exit.
set -euo pipefail
task_cloud_root="$(cd "$(dirname "$0")/.." && pwd)"
task_cloud_bin="${PG_BIN:-/workspace/cloud-tools/pg/usr/lib/postgresql/17/bin}"
task_cloud_db="dnd_cloud_qa_$$_$RANDOM"
export PGHOST="${PGHOST:-127.0.0.1}" PGPORT="${PGPORT:-5433}"
export LD_LIBRARY_PATH="/workspace/cloud-tools/pg/usr/lib/x86_64-linux-gnu${LD_LIBRARY_PATH:+:$LD_LIBRARY_PATH}"
"$task_cloud_bin/createdb" "$task_cloud_db"
trap '"$task_cloud_bin/dropdb" --if-exists "$task_cloud_db"' EXIT
"$task_cloud_bin/psql" -d "$task_cloud_db" -v ON_ERROR_STOP=1 \
  -f "$task_cloud_root/tests/fixtures/cloud_auth.sql" \
  -f "$task_cloud_root/supabase/migrations/202610130001_characters.sql" \
  -f "$task_cloud_root/tests/cloud_rls_test.sql"
PG_BIN="$task_cloud_bin" PGDATABASE="$task_cloud_db" node "$task_cloud_root/tests/cloud_sql_concurrency.cjs"
