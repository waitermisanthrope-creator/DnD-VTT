#!/usr/bin/env node
'use strict';
const cp=require('node:child_process'),fs=require('node:fs');
const git=(...args)=>cp.execFileSync('git',args,{encoding:'utf8'}).trim();
// Read only tracked changes and non-ignored files. Never add arbitrary runner files.
const stateOnly=process.argv.includes('--cooldown');
const files=stateOnly?['.github/ai-control.json']:Array.from(new Set([...git('diff','--name-only','HEAD','-z').split('\0'),...git('ls-files','--others','--exclude-standard','-z').split('\0')].filter(Boolean)));
if(files.some(f=>f.startsWith('.github/workflows/')||['tools/ai_automation.cjs','tools/ai_finalize.cjs'].includes(f)||/(^|\/)(\.env($|\.)|auth\.json$)|\.(jks|keystore|pem)$/.test(f)))throw Error('Protected changes require owner review; no automatic push');
if(!files.length){console.log('No completed changes');process.exit(0);}
if(!stateOnly)cp.execFileSync(process.execPath,['tools/ai_checks.cjs'],{stdio:'inherit'});
git('config','user.name','github-actions[bot]');git('config','user.email','41898282+github-actions[bot]@users.noreply.github.com');
git('restore','--staged',':/'); // Unstage only; preserve all worktree data.
git('add','--',...files);
if(!stateOnly){cp.execFileSync(process.execPath,['tools/generate_project_atlas.cjs'],{stdio:'inherit'});git('add','PROJECT_ATLAS.md','PROJECT_ATLAS.txt');}
git('diff','--cached','--check');
git('commit','-m',stateOnly?'AI: persist bounded execution cooldown':'AI: save verified autonomous development checkpoint');
const sha=git('rev-parse','HEAD');
fs.appendFileSync('AI_PROGRESS.md',`\n- Autonomous checkpoint ${sha}; ${stateOnly?'cooldown saved; model execution failed':'regression gate passed'}. Run: ${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}.\n`);
git('add','AI_PROGRESS.md');git('commit','-m','AI: record checkpoint commit and CI run');
// Reject a race, preserving the complete local checkpoint as an artifact instead of overwriting main.
git('fetch','origin','main');
if(git('rev-parse','origin/main')!==process.env.AI_BASE_SHA)throw Error('main advanced; checkpoint retained in artifact, next run must merge it');
git('push','origin','HEAD:main');
