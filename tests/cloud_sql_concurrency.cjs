/** Real PostgreSQL race: two independent clients write the same expected revision.
 * Run via tools/test_cloud_sql.sh against its disposable database only.
 */
const {spawn}=require('node:child_process'),path=require('node:path'),assert=require('node:assert/strict');
const bin=process.env.PG_BIN||'/workspace/cloud-tools/pg/usr/lib/postgresql/17/bin';
if(!/^dnd_cloud_qa_/.test(process.env.PGDATABASE||''))throw Error('Only a disposable dnd_cloud_qa_ database is allowed');
function sql(source){return new Promise((resolve,reject)=>{
  const child=spawn(path.join(bin,'psql'),['-X','-q','-A','-t','-v','ON_ERROR_STOP=1']),out=[],errors=[];
  child.stdout.on('data',x=>out.push(x));child.stderr.on('data',x=>errors.push(x));child.on('error',reject);
  child.on('close',code=>code?reject(Error(Buffer.concat(errors).toString())):resolve(Buffer.concat(out).toString().trim()));child.stdin.end(source);
});}
const uid='11111111-1111-4111-8111-111111111111',id='aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';
const auth=`set local role authenticated;set local "request.jwt.claim.sub"='${uid}';`;
function write(op,name,expected){return `select public.save_character('${id}',${expected},'{"name":"${name}"}',3,false,'aaaaaaaa-0000-4000-8000-${op}');`;}
(async()=>{
  await sql(`insert into auth.users(id) values('${uid}');begin;${auth}${write('000000000001','initial',0)}commit;`);
  const responses=await Promise.all(['000000000002','000000000003'].map((op,i)=>sql(`begin;${auth}select pg_sleep(0.1);${write(op,'racer'+i,1)}commit;`)));
  const results=responses.map(x=>JSON.parse(x.split('\n').find(line=>line.startsWith('{'))));
  assert.equal(results.filter(r=>r.conflict).length,1);assert.equal(results.filter(r=>!r.conflict).length,1);
  assert.equal(await sql(`select revision from public.characters where owner_id='${uid}' and id='${id}';`),'2');
  assert.equal(await sql('select count(*) from public.character_history;'),'2');
  console.log('CLOUD_SQL_CONCURRENCY_OK: one commit, one conflict, two retained revisions');
})().catch(e=>{console.error(e);process.exitCode=1;});
