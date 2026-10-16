#!/usr/bin/env node
'use strict';
const fs=require('node:fs'),cp=require('node:child_process');
function developmentGate(control,env,now=Date.now()){
 if(env.AI_DEVELOPMENT_ENABLED!=='true')return 'disabled';
 if(control.paid_api_authorized!==true)return 'paid-api-not-authorized';
 if(env.AI_ALLOW_PAID_API!=='true')return 'paid-api-not-authorized';
 if(!env.OPENAI_API_KEY)return 'missing-api-key';
 if(control.retry_after && (!Number.isFinite(Date.parse(control.retry_after))||Date.parse(control.retry_after)>now))return 'cooldown';
 return 'ready';
}
function releaseGate(control,git=(args)=>cp.execFileSync('git',args,{encoding:'utf8'}).trim()){
 if(control.release_ready!==true)return false;
 const sha=control.release_source_sha;
 if(!/^[0-9a-f]{40}$/.test(sha||'')||!String(control.release_reason||'').trim())return false;
 try{
  git(['merge-base','--is-ancestor',sha,'HEAD']);
  // Readiness survives progress/atlas-only commits, never a code/build change.
  return git(['diff','--name-only',sha,'HEAD','--','app','index.html','android','desktop','package.json','tools','tests','.github/workflows'])==='';
 }catch{return false;}
}
function cooldown(message,now=Date.now()){
 if(/weekly|week limit|недель/i.test(message))return {quota_scope:'weekly',retry_after:new Date(now+7*86400000).toISOString()};
 if(/insufficient_quota|billing|credit balance/i.test(message))return {quota_scope:'billing',retry_after:'9999-12-31T00:00:00.000Z'};
 if(/429|rate.limit|quota|usage.limit/i.test(message))return {quota_scope:'hourly',retry_after:new Date(now+3600000).toISOString()};
 return {quota_scope:'failure',retry_after:new Date(now+3600000).toISOString()};
}
module.exports={developmentGate,releaseGate,cooldown};
if(require.main===module){
 const control=JSON.parse(fs.readFileSync('.github/ai-control.json','utf8'));
 if(process.argv[2]==='release')process.exitCode=releaseGate(control)?0:1;
 else if(process.argv[2]==='failure'){
  // Never persist raw model/credential logs in the repository.
  Object.assign(control,cooldown(fs.readFileSync(process.argv[3],'utf8')));
  fs.writeFileSync('.github/ai-control.json',JSON.stringify(control,null,2)+'\n');
 }else{
  const reason=developmentGate(control,process.env);
  console.log('Developer gate: '+reason);
  if(process.env.GITHUB_OUTPUT)fs.appendFileSync(process.env.GITHUB_OUTPUT,'ready='+(reason==='ready')+'\n');
 }
}
