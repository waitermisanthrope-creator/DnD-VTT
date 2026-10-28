using System;
using System.Linq;
using System.IO;
using Newtonsoft.Json.Linq;
using DndVtt.UnityPrototype;
static class SheetActionChecks
{
 static int n;static void Check(bool b,string s){if(!b)throw new Exception(s);n++;}static void Reject(Action a,string s){bool bad=false;try{a();}catch{bad=true;}Check(bad,s);}
 public static int Run(){n=0;
 var h=JObject.Parse("{\"id\":\"actions\",\"hpMax\":20,\"hpCurrent\":12,\"hpTemp\":3,\"unknown\":{\"keep\":17},\"classFeaturesState\":{\"keep\":true},\"spellSlotsData\":{\"1\":{\"max\":3,\"used\":1,\"unknown\":17}},\"resources\":{\"ki\":{\"max\":2,\"current\":1,\"recharge\":\"short\",\"unknown\":17}},\"combatAbilities\":[{\"id\":\"ab\",\"maxUses\":2,\"usedCount\":1,\"rechargeOn\":\"short\"}]}");
 CharacterSheetRules.ChangeHealth(h,5,false);Check((int)h["hpCurrent"]==10&&(int)h["hpTemp"]==0,"damage consumes temp first");CharacterSheetRules.ChangeHealth(h,999,true);Check((int)h["hpCurrent"]==20,"heal cap");CharacterSheetRules.ChangeHealth(h,999,false);Check((int)h["hpCurrent"]==0,"damage zero not fallback10");
 string before=h.ToString();Reject(()=>CharacterSheetRules.ChangeHealth(h,-1,true),"negative HP rejected");Check(h.ToString()==before,"bad HP no mutation");
 CharacterSheetRules.ChangeSpellUse(h,1,1);Check((int)h["spellSlotsData"]["1"]["used"]==2&&(int)h["spellSlotsData"]["1"]["unknown"]==17,"slot use preserves unknown");CharacterSheetRules.ChangeSpellUse(h,1,1);before=h.ToString();Reject(()=>CharacterSheetRules.ChangeSpellUse(h,1,1),"spent slot unavailable");Check(h.ToString()==before,"bad slot no mutation");
 CharacterSheetRules.ChangeResource(h,"ki",-1);Check((int)h["resources"]["ki"]["current"]==0,"resource spend");Reject(()=>CharacterSheetRules.ChangeResource(h,"ki",-1),"no negative resource");
 h["pactMagicData"]=JObject.Parse("{\"max\":2,\"used\":0,\"slotLevel\":2,\"future\":17}");h["pactMagic"]=h["pactMagicData"].DeepClone();CharacterSheetRules.ChangePactUse(h,1);Check((int)h["pactMagicData"]["used"]==1&&(int)h["pactMagic"]["used"]==1&&(int)h["pactMagicData"]["future"]==17,"Pact use and aliases");
 CharacterSheetRules.ChangeAbilityUse(h,"ab",1);Check((int)h["combatAbilities"][0]["usedCount"]==2,"ability count");Reject(()=>CharacterSheetRules.ChangeAbilityUse(h,"ab",1),"no exhausted ability use");
 CharacterSheetRules.RecordRest(h,false);Check((int)h["hpCurrent"]==0&&(int)h["resources"]["ki"]["current"]==2&&(int)h["combatAbilities"][0]["usedCount"]==0&&(int)h["spellSlotsData"]["1"]["used"]==3,"short rest selective");
 CharacterSheetRules.RecordRest(h,true);Check((int)h["hpCurrent"]==20&&(int)h["spellSlotsData"]["1"]["used"]==0,"long rest known HP slots");Check((int)h["unknown"]["keep"]==17&&(bool)h["classFeaturesState"]["keep"],"unknown and hooks preserved");
 var special=(JObject)h.DeepClone();special["extraClassType"]="ghost";before=special.ToString();Reject(()=>CharacterSheetRules.RecordRest(special,true),"extra body must not heal");Check(special.ToString()==before,"special untouched");
 var f=CharacterSheetRules.CreateFolder(h,"Приключение");Check((string)h["activeFolderId"]==(string)f["id"],"new folder active");var note=CharacterSheetRules.CreateNote(h,(string)f["id"]);note["future"]=true;CharacterSheetRules.UpdateNote(h,(string)f["id"],note["id"],"Ключ","Дверь\nСевер");Check((string)note["text"]=="Дверь\nСевер"&&(bool)note["future"],"note multiline and unknown");
 CharacterSheetRules.ToggleSheetCondition(h,"Отравлен");Check((bool)h["activeConditions"]["Отравлен"],"condition marked");CharacterSheetRules.SetDeathTrack(h,2,1);Check((int)h["deathSaves"]["successes"]==2&&(int)h["deathSaves"]["failures"]==1,"death track");Reject(()=>CharacterSheetRules.SetDeathTrack(h,4,1),"invalid death track");
 var legacy=JObject.Parse("{\"id\":\"old\",\"maxHp\":20,\"currentHP\":0,\"tempHp\":3,\"hitPoints\":{\"max\":20,\"current\":0,\"temp\":3,\"future\":17}}");CharacterSheetRules.ChangeHealth(legacy,5,true);Check((int)legacy["currentHP"]==5&&(int)legacy["hitPoints"]["current"]==5&&(int)legacy["hitPoints"]["future"]==17,"legacy health aliases");
 var custom=JObject.Parse("{\"id\":\"rest-custom\",\"combatAbilities\":[{\"id\":\"custom\",\"maxUses\":2,\"usedCount\":1,\"rechargeOn\":\"none\"}],\"resources\":{\"custom\":{\"current\":{\"future\":17},\"max\":2,\"recharge\":\"short\"}}}");
 before=custom.ToString();Reject(()=>CharacterSheetRules.RecordRest(custom,false),"unsupported rest counter rejected");Check(custom.ToString()==before,"unsupported rest atomic");
 custom.Remove("resources");CharacterSheetRules.RecordRest(custom,true);Check((int)custom["combatAbilities"][0]["usedCount"]==1,"long rest preserves custom recharge");
 foreach(var invalid in new JToken[]{new JObject{["future"]=17},new JArray(1),new JValue("PB"),new JValue("NaN"),new JValue(-1),new JValue(1.5),new JValue(true)})Check(!CharacterSheetRules.TrySheetCount(invalid,out _),"unsupported counter remains readonly: "+invalid.Type);
 Check(CharacterSheetRules.TrySheetCount(new JValue("3"),out int parsed)&&parsed==3,"legacy numeric string supported");
 string dir=Path.Combine(Path.GetTempPath(),"vtt-sheet-actions-"+Guid.NewGuid().ToString("N"));Directory.CreateDirectory(dir);
 try
 {
  string path=Path.Combine(dir,"heroes.json");var roster=new LegacyCharacterArchive(new JObject{["characters"]=new JArray(h.DeepClone(),new JObject{["id"]="other",["future"]=17}),["metadata"]=new JObject{["future"]=true}}.ToString());CharacterSheetStore.Save(path,roster);string original=File.ReadAllText(path);
  var candidate=roster.DetachedCopy();var edited=candidate.Snapshot(0);CharacterSheetRules.ChangeHealth(edited,2,false);candidate.Replace(0,edited);CharacterSheetStore.Save(path,candidate);var reopened=CharacterSheetStore.Load(path);
  Check((int)reopened.Snapshot(0)["hpCurrent"]==18,"health survives disk reload");Check((int)reopened.Snapshot(1)["future"]==17&&(bool)JObject.Parse(reopened.Export())["metadata"]["future"],"action preserves other hero and wrapper");Check(File.ReadAllText(path+".bak")==original,"action retains previous backup");
  string blocker=Path.Combine(dir,"blocker");File.WriteAllText(blocker,"file");Reject(()=>CharacterSheetStore.Save(Path.Combine(blocker,"heroes.json"),candidate),"failed action save rejected");Check(roster.Export()==original,"failed save leaves live roster unchanged");
 }
 finally{Directory.Delete(dir,true);}
 return n;}
}
