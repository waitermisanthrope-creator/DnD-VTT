using System;
using System.Linq;
using System.IO;
using Newtonsoft.Json.Linq;
using DndVtt.UnityPrototype;
static class SheetActionChecks
{
 static int n;static void Check(bool b,string s){if(!b)throw new Exception(s);n++;}static void Reject(Action a,string s){bool bad=false;try{a();}catch{bad=true;}Check(bad,s);}
 public static int Run(){n=0;
 var race=JObject.Parse("{id:'test-race',name:'Тестовая раса',speed:'35 футов',bonuses:{str:2,dex:1},baseAcFormula:'lizardfolk',hpBonusPerLevel:1,desc:'Описание',languages:['Всеобщий язык']}");
 var raceHero=JObject.Parse("{id:'race-hero',stats:{str:10,dex:12,con:10,int:10,wis:10,cha:10,future:17},abilities:{str:10,dex:12,con:10,int:10,wis:10,cha:10,future:18},_builderBaseStats:{str:10,dex:12,con:10,int:10,wis:10,cha:10},maxHp:20,currentHP:7,hitPoints:{max:20,current:7,temp:2,future:19},resources:{future:17},classFeaturesState:{keep:true},art:{future:18},unknown:{keep:17}}");
 string raceBefore=raceHero.ToString();var selectedRace=CharacterSheetRules.SelectRace(raceHero,race);
 Check(raceHero.ToString()==raceBefore,"race preview/cancel does not mutate input");
 Check((int)selectedRace["stats"]["str"]==12&&(int)selectedRace["stats"]["dex"]==13&&(int)selectedRace["abilities"]["str"]==12&&(int)selectedRace["_builderBaseStats"]["str"]==10,"race stats and Builder aliases");
 Check((string)selectedRace["raceId"]=="test-race"&&(string)selectedRace["speed"]=="35 футов"&&(int)selectedRace["ac"]==14,"race identity speed and natural armor");
 Check((int)selectedRace["hpMax"]==21&&(int)selectedRace["currentHP"]==8&&(int)selectedRace["hitPoints"]["future"]==19&&(int)selectedRace["hpTemp"]==2,"race HP aliases preserve temp and unknown");
 foreach(string key in new[]{"resources","classFeaturesState","art","unknown"})Check(JToken.DeepEquals(raceHero[key],selectedRace[key]),"race preserves "+key);
 Reject(()=>CharacterSheetRules.SelectRace(selectedRace,race),"race cannot apply twice");
 var unknownRace=(JObject)raceHero.DeepClone();unknownRace["raceId"]="missing-package";Reject(()=>CharacterSheetRules.SelectRace(unknownRace,race),"unknown existing race stays locked");
 var badRace=(JObject)race.DeepClone();badRace["bonuses"]["str"]="PB";Reject(()=>CharacterSheetRules.SelectRace(raceHero,badRace),"malformed bonus rejected");Check(raceHero.ToString()==raceBefore,"bad race atomic");
 var seedRace=CharacterSheetRules.SelectRace(raceHero,JObject.Parse("{id:'package-seed-only',name:'Package race',seed:{stats:{str:12},speed:'40 футов',size:'Средний'},choices:[]}"));Check((int)seedRace["stats"]["str"]==12&&(string)seedRace["speed"]=="40 футов"&&(string)seedRace["size"]=="Средний","seed-only package applies normalized bonuses and speed");
 Reject(()=>CharacterSheetRules.SelectRace(raceHero,JObject.Parse("{id:'package-complex',name:'Complex race',seed:{hpMax:999}}")),"unsupported seed effects cannot silently lock race");
 var customRace=CharacterSheetRules.CustomRace("  Своя раса  ","Описание\nв две строки",30,JObject.Parse("{str:1,con:2}"));
 var prefs=ClientPreferences.Parse("{version:1,future:{keep:17}}");prefs.AddCustomRace(customRace);var restoredPrefs=ClientPreferences.Parse(prefs.Export());
 Check((string)restoredPrefs.CustomRaces[0]["name"]=="Своя раса"&&(int)restoredPrefs.CustomRaces[0]["bonuses"]["con"]==2,"custom race catalog survives restart");
 Check((int)JObject.Parse(restoredPrefs.Export())["future"]["keep"]==17,"custom catalog preserves unknown preferences");
 restoredPrefs.CustomRaces.Clear();Check(restoredPrefs.CustomRaces.Count==1,"custom catalog snapshots cannot mutate preferences");
 Reject(()=>prefs.AddCustomRace(customRace),"duplicate custom ID rejected");
 Reject(()=>CharacterSheetRules.CustomRace(" ","",30,new JObject()),"empty custom name rejected");
 prefs.theme="red";var defaults=prefs.WithDefaults("Medium");Check(defaults.theme=="orange"&&defaults.quality=="Medium"&&defaults.CustomRaces.Count==1&&(int)JObject.Parse(defaults.Export())["future"]["keep"]==17,"reset defaults retains custom race catalog and unknown preferences");
 var damagedPrefs=ClientPreferences.Parse("{version:1,dnd_custom_races:{future:17}}");Reject(()=>damagedPrefs.AddCustomRace(customRace),"unknown custom catalog blocks writes");Check((int)JObject.Parse(damagedPrefs.WithDefaults("Medium").Export())["dnd_custom_races"]["future"]==17,"reset preserves unknown catalog shape");
 var raceDir=Path.Combine(Path.GetTempPath(),"vtt-race-"+Guid.NewGuid().ToString("N"));Directory.CreateDirectory(raceDir);
 try{string file=Path.Combine(raceDir,"heroes.json");var a=new LegacyCharacterArchive(new JObject{["characters"]=new JArray(raceHero.DeepClone(),new JObject{["id"]="other-race",["future"]=17}),["wrapper"]=17}.ToString());CharacterSheetStore.Save(file,a);string oldFile=File.ReadAllText(file);var detached=a.DetachedCopy();detached.Replace(0,selectedRace);CharacterSheetStore.Save(file,detached);var reopened=CharacterSheetStore.Load(file);Check((string)reopened.Snapshot(0)["raceId"]=="test-race"&&(int)reopened.Snapshot(1)["future"]==17&&(int)JObject.Parse(reopened.Export())["wrapper"]==17,"race selection disk roundtrip and other hero/wrapper");Check(File.ReadAllText(file+".bak")==oldFile,"race selection backup");}finally{Directory.Delete(raceDir,true);}
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
 var f=CharacterSheetRules.CreateFolder(h,"Приключение");Check((string)h["activeFolderId"]==(string)f["id"],"new folder active");var note=CharacterSheetRules.CreateNote(h,(string)f["id"]);Check((string)note["title"]==""&&(string)note["text"]=="","new note starts blank like WebView");note["future"]=true;CharacterSheetRules.UpdateNote(h,(string)f["id"],note["id"],"Ключ","Дверь\nСевер");Check((string)note["text"]=="Дверь\nСевер"&&(bool)note["future"],"note multiline and unknown");
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
