from pathlib import Path
import json
root=Path('/mnt/data/v7040')
# guide
p=root/'00_AI_PROJECT_GUIDE.md'
s=p.read_text()
s += '''\n\n## V70.25.41 — DAMAGE PIPELINE / MIXED DAMAGE FIX BATCH 41\n\n- Current repaired build: **V70.25.41**.\n- `combat_engine.js`: damage is now resolved per damage component, so resistance/vulnerability/immunity applies to each damage type independently. Mixed hits no longer incorrectly reduce unrelated damage types.\n- `combat_engine.js`: normalized damage types case-insensitively before resistance/vulnerability/immunity checks.\n- `combat_engine.js`: critical-hit context is preserved through the authoritative damage call, including death-save failure handling on targets already at 0 HP.\n- `network_gameplay.js`: network spell criticals now forward `critical` into the authoritative damage pipeline.\n- `combat_engine.js`: damage results expose resolved per-component damage details for logging/UI and future rider processing.\n- Added `test_v741_damage_pipeline.js` covering mixed damage, component-scoped immunity, critical death-save failures, and resistance/vulnerability cancellation.\n- Protected assets remain untouched: `Wallpapers.js` and `Ambiences.js`; `wallpapers/` and `ambience/` remain intentionally absent.\n\n### VERIFIED — V70.25.41\n- Unified regression suite: **64 PASS / 0 FAIL / 10 LEGACY**.\n- `test_v741_damage_pipeline.js`: **PASS**.\n- `test_v740_concentration_lifecycle.js`: **PASS**.\n- `test_v739_prepared_transaction.js`: **PASS**.\n- `test_v738_multiclass_spell_sources.js`: **PASS**.\n- `test_v737_spellcasting_transaction.js`: **PASS**.\n- Changed JavaScript syntax: **PASS**.\n- Manifest updated to **266 files / V70.25.41**.\n\n### V70.25.41 NEXT AUDIT QUEUE\n1. Character ↔ combatant synchronization after healing, death, reconnect, save/load and host authority transfer.\n2. Multiclass feature prerequisites and recharge ownership for remaining class-specific resources.\n3. Reaction-window rollback for Shield/Counterspell and other reaction features after disconnected/expired clients.\n4. Audit concentration persistence through save/load/reconnect and remaining spell/feature entry points.\n5. Audit mixed-damage/non-damage riders for poison, conditions, on-hit effects and save-for-half effects across every spell/feature path.\n'''
p.write_text(s)
# manifest based on previous metadata
m=json.loads((root/'VTT_PROJECT_MANIFEST_V70.json').read_text())
# existing entries by path
entries={x['path']:x for x in m['files']}
# add/update all existing file sizes, keep metadata classification
for path,ent in list(entries.items()):
    fp=root/path
    if fp.exists(): ent['bytes']=fp.stat().st_size
# classify new test
entries['test_v741_damage_pipeline.js']={'path':'test_v741_damage_pipeline.js','kind':'text','category':'JS','bytes':(root/'test_v741_damage_pipeline.js').stat().st_size}
files=list(entries.values())
files.sort(key=lambda x:x['path'])
m={'version':'70.25.41','generated':'2026-09-27','fileCount':len(files),'files':files}
(root/'VTT_PROJECT_MANIFEST_V70.json').write_text(json.dumps(m,ensure_ascii=False,separators=(',',':'))+'\n')
(root/'vtt_project_manifest_v70.js').write_text('window.VTT_PROJECT_MANIFEST_V70 = '+json.dumps(m,ensure_ascii=False,separators=(',',':'))+';\n')
