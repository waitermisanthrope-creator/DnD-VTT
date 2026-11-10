using System;
using System.IO;
using System.Linq;
using Newtonsoft.Json.Linq;
using DndVtt.UnityPrototype;

static class AdvancementChecks
{
    static int count;
    static void Check(bool value,string name){if(!value)throw new Exception("Advancement: "+name);count++;}
    static void Reject(Action action,string name){bool failed=false;try{action();}catch(Exception){failed=true;}Check(failed,name);}
    static JObject Hero(string name="Воин",int level=1) {var h=JObject.Parse("{\"id\":\"test\",\"name\":\"Hero\",\"level\":1,\"stats\":{\"str\":15,\"dex\":14,\"con\":14,\"int\":13,\"wis\":13,\"cha\":13},\"hpMax\":12,\"hpCurrent\":0,\"hpTemp\":3,\"unknown\":{\"keep\":17},\"resources\":{\"spent\":2}}");h["classes"]=new JArray(new JObject{["name"]=name,["level"]=level});h["level"]=level;return h;}
    static JObject Pick(int hp=6)=>new JObject{["baseHp"]=hp,["restoreFull"]=false,["mode"]="milestone"};
    public static int Run()
    {
        count=0;var data=JObject.Parse(File.ReadAllText("unity/Assets/Vtt/Resources/CharacterSheet/advancement.json"));
        foreach(JObject source in (JArray)data["sources"]){var bytes=File.ReadAllBytes((string)source["file"]);var digest=Convert.ToHexString(System.Security.Cryptography.SHA256.HashData(bytes)).ToLowerInvariant();if(digest!=(string)source["sha256"])digest=Convert.ToHexString(System.Security.Cryptography.SHA256.HashData(System.Text.Encoding.UTF8.GetBytes(File.ReadAllText((string)source["file"]).Replace("\r\n","\n")))).ToLowerInvariant();Check(digest==(string)source["sha256"],"authoritative source hash "+source["file"]);}
        var thresholds=(JArray)data["xp"];
        for(int i=0;i<20;i++){Check(CharacterAdvancement.LevelByExperience(data,(long)thresholds[i])==i+1,"XP threshold "+i);if(i>0)Check(CharacterAdvancement.LevelByExperience(data,(long)thresholds[i]-1)==i,"before XP threshold "+i);}
        var h=Hero();string original=h.ToString();
        var xp=CharacterAdvancement.Experience(h,300,"add");Check((long)xp["exp"]==300&&h.ToString()==original,"XP detached");
        Check((long)CharacterAdvancement.Experience(xp,999,"sub")["exp"]==0,"XP floor");
        Reject(()=>CharacterAdvancement.Experience(h,-1,"set"),"negative XP");
        var up=CharacterAdvancement.Advance(data,h,"Воин",Pick());
        Check((int)up["classes"][0]["level"]==2&&(int)up["level"]==2,"single class increment");
        Check((int)up["hpMax"]==20&&(int)up["hpCurrent"]==8&&(int)up["hpTemp"]==3,"zero HP and temp preserved");
        Check(h.ToString()==original&&JToken.DeepEquals(h["unknown"],up["unknown"])&&JToken.DeepEquals(h["resources"],up["resources"]),"source unknown/resources preserved");
        var wiz=CharacterAdvancement.Advance(data,Hero("Воин",2),"Волшебник",Pick(4));
        Check((int)wiz["classes"][1]["level"]==1&&(int)wiz["level"]==3,"multiclass class-level1 not total3");
        var low=Hero();low["stats"]["int"]=12;Reject(()=>CharacterAdvancement.Advance(data,low,"Волшебник",Pick(4)),"gated INT");
        Check(CharacterAdvancement.EntryProblem(data,low,"Воин")==null,"existing class exempt");
        var aliases=Hero("Плут");aliases["stats"]=new JObject{["strength"]=8,["dexterity"]=13};Check(CharacterAdvancement.EntryProblem(data,aliases,"Воин")==null,"full alias STR or DEX");
        Reject(()=>CharacterAdvancement.Advance(data,Hero("Воин",20),"Воин",Pick()),"cap20");
        var noXp=Pick();noXp["mode"]="xp";Reject(()=>CharacterAdvancement.Advance(data,h,"Воин",noXp),"XP gate");
        var asiHero=Hero("Воин",3);asiHero["classes"][0]["subclass"]="Мастер боя";var asi=Pick();asi["asi"]=new JObject{["con"]=2};
        var four=CharacterAdvancement.Advance(data,asiHero,"Воин",asi);
        Check((int)four["stats"]["con"]==16&&(int)four["hpMax"]==24,"CON retroactive HP all four levels");
        Reject(()=>CharacterAdvancement.Advance(data,asiHero,"Воин",Pick()),"mandatory ASI");
        asi["asi"]=new JObject{["str"]=3};Reject(()=>CharacterAdvancement.Advance(data,asiHero,"Воин",asi),"invalid ASI");
        asi["asi"]=new JObject{["str"]=2};asiHero["stats"]["str"]=19;Reject(()=>CharacterAdvancement.Advance(data,asiHero,"Воин",asi),"ASI cap20");
        Reject(()=>CharacterAdvancement.Advance(data,Hero("Воин",2),"Воин",Pick()),"required subclass");
        var subPick=Pick();subPick["subclass"]="Мастер боя";var three=CharacterAdvancement.Advance(data,Hero("Воин",2),"Воин",subPick);Check((string)three["classes"][0]["subclass"]=="Мастер боя","subclass stored");
        var slots=Hero("Волшебник",1);slots["spellSlotsData"]=JObject.Parse("{\"1\":{\"max\":2,\"used\":1,\"custom\":17}}");
        var two=CharacterAdvancement.Advance(data,slots,"Волшебник",new JObject{["baseHp"]=4,["mode"]="milestone",["subclass"]="Школа Воплощения"});
        Check((int)two["spellSlotsData"]["1"]["max"]==3&&(int)two["spellSlotsData"]["1"]["used"]==1&&(int)two["spellSlotsData"]["1"]["custom"]==17,"slots and spent/unknown preserved");
        var aliasHp=Hero();aliasHp.Remove("hpMax");aliasHp.Remove("hpCurrent");aliasHp["maxHp"]=40;aliasHp["currentHP"]=5;
        var aliasUp=CharacterAdvancement.Advance(data,aliasHp,"Воин",Pick());Check((int)aliasUp["hpMax"]==48&&(int)aliasUp["hpCurrent"]==13,"legacy HP aliases retain actual health");
        var scalarHp=Hero();scalarHp.Remove("hpCurrent");scalarHp["hp"]=0;Check((int)CharacterAdvancement.Advance(data,scalarHp,"Воин",Pick())["hpCurrent"]==8,"scalar legacy hp");
        var beast=Hero("Бистхарт",2);var beastPick=Pick();beastPick["subclass"]="Свирепый союз";Check(CharacterAdvancement.Advance(data,beast,"Бистхарт",beastPick)["features"].Any(f=>(string)f=="Яростный рывок"),"array subclass feature format");
        var oldStats=Hero("Воин",3);oldStats["classes"][0]["subclass"]="Мастер боя";((JObject)oldStats["stats"]).Remove("con");oldStats["stats"]["constitution"]=14;
        var featCatalog=JObject.Parse("{\"feats\":[{\"id\":\"tough-con\",\"name\":\"Con feat\",\"statBonus\":{\"type\":\"fixed\",\"stats\":[\"con\"],\"value\":1}}]}");var featChoice=Pick();featChoice["feat"]="tough-con";
        Check((int)CharacterAdvancement.Advance(data,oldStats,"Воин",featChoice,featCatalog)["stats"]["con"]==15,"feat full stat alias");
        oldStats["feats"]=new JArray("Con feat");Reject(()=>CharacterAdvancement.Advance(data,oldStats,"Воин",featChoice,featCatalog),"legacy string feat cannot be granted twice");
        var blood=Hero("Кровавый охотник",2);var bloodPick=Pick();bloodPick["subclass"]="Орден осквернённых душ";
        Check((int)CharacterAdvancement.Advance(data,blood,"Кровавый охотник",bloodPick)["pactMagicData"]["max"]==1,"bloodhunter pact progression");
        // Differential projection from actual WebView progressionEngine (520 class-level cases).
        var golden=JObject.Parse(File.ReadAllText("unity/Assets/Vtt/Tests/advancement-contract.json"));
        foreach(JObject c in (JArray)golden["cases"]){var target=new JObject{["features"]=new JArray()};CharacterAdvancement.ApplyLevelFeatures(data,target,(string)c["name"],(int)c["level"]);Check(JToken.DeepEquals(target["features"],c["features"]),"JS features "+c["name"]+c["level"]);foreach(var f in ((JObject)c["fields"]).Properties())Check(JToken.DeepEquals(target[f.Name],f.Value),"JS effect "+f.Name);}
        foreach(JObject c in (JArray)golden["magicCases"]){var target=new JObject{["classes"]=c["classes"].DeepClone()};CharacterAdvancement.RebuildSpellSlots(data,target);for(int i=1;i<=9;i++)Check((int)target["spellSlotsData"][i.ToString()]["max"]==((int?)c["expected"]["normal"][i.ToString()]??0),"JS mixed caster slots");if(c["expected"]["pact"] is JObject p)Check((int)target["pactMagicData"]["max"]==(int)p["count"]&&(int)target["pactMagicData"]["slotLevel"]==(int)p["level"],"JS Pact separate");}
        var legacyLevel=Hero("Воин",3);legacyLevel.Remove("classes");legacyLevel.Remove("level");legacyLevel["class"]="Воин 3";var legacyPick=Pick();legacyPick["asi"]=new JObject{["str"]=2};legacyPick["subclass"]="Мастер боя";Check((int)CharacterAdvancement.Advance(data,legacyLevel,"Воин",legacyPick)["level"]==4,"legacy class label preserves level when root level absent");
        var invalidClasses=Hero();invalidClasses["classes"]=new JObject{["future"]=17};Reject(()=>CharacterAdvancement.Advance(data,invalidClasses,"Воин",Pick()),"non-array class data cannot be overwritten");
        var unknown=Hero("HomebrewCaster",2);Reject(()=>CharacterAdvancement.Advance(data,unknown,"Воин",Pick()),"unknown owned class blocks whole-hero destructive recalculation");
        string dir=Path.Combine(Path.GetTempPath(),"vtt-advancement-"+Guid.NewGuid());Directory.CreateDirectory(dir);
        try{string path=Path.Combine(dir,"test.json");var other=Hero("Плут");other["id"]="other";var archive=new LegacyCharacterArchive(new JObject{["characters"]=new JArray(h,other),["wrapper"]=17}.ToString());CharacterSheetStore.Save(path,archive);var candidate=archive.DetachedCopy();candidate.Replace(0,up);CharacterSheetStore.Save(path,candidate);Check(JToken.DeepEquals(CharacterSheetStore.Load(path).Snapshot(0),up),"restart advancement");Check(CharacterSheetStore.Load(path+".bak").Export()==archive.Export(),"backup exact prior roster");Check(JToken.DeepEquals(CharacterSheetStore.Load(path).Snapshot(1),archive.Snapshot(1)),"other hero intact");Check((int)JObject.Parse(CharacterSheetStore.Load(path).Export())["wrapper"]==17,"wrapper intact");File.WriteAllText(Path.Combine(dir,"block"),"x");Reject(()=>CharacterSheetStore.Save(Path.Combine(dir,"block","bad.json"),candidate),"IO failure");Check(JToken.DeepEquals(archive.Snapshot(0),h),"live remains prior state");}finally{Directory.Delete(dir,true);}
        return count;
    }
}
