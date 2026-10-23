using System;
using System.IO;
using System.Linq;
using Newtonsoft.Json.Linq;
using DndVtt.UnityPrototype;
static class CommerceChecks
{
 public static int Run(WorkshopStore store,string appRoot)
 {
  int count=0;
  void Check(bool value,string name) { if(!value) throw new Exception(name); count++; }
  void Reject(Action action,string name) { bool failed=false; try { action(); } catch(FormatException) { failed=true; } Check(failed,name); }
  var commerce=store.Commerce(); var craft=(JObject)commerce["craft"]; var alchemy=(JObject)commerce["alchemy"];
  var sourceItems=store.Installed().OfType<JObject>().Where(m=>new[]{"item","craft"}.Contains((string)m["type"])).SelectMany(m=>(store.Data(m)["items"] as JArray ?? new JArray()).OfType<JObject>()).ToArray();
  Check(((JArray)commerce["items"]).Count==sourceItems.Length && sourceItems.Select(i=>(string)i["id"]).Distinct().Count()==sourceItems.Length,"all installed item IDs activated once, including optional collections");
  Check(((JArray)craft["recipes"]).Count==47,"47 recipes activated");
  var contracts=JObject.Parse(File.ReadAllText(Path.Combine(appRoot,"unity/ContentSources~/workshop-commerce/contracts.json")));
  foreach(JObject contract in (JArray)contracts["profiles"])
  {
   var actual=CommerceRules.Profile(alchemy,((JArray)contract["ids"]).Values<string>().ToArray(),(string)contract["catalyst"]);
   foreach(var property in ((JObject)contract["expected"]).Properties()) Check(JToken.DeepEquals(actual[property.Name],property.Value),"JS profile parity: "+property.Name);
  }
  var hero=JObject.Parse("{id:'commerce-test',name:'Commerce test',proficiencies:['p_tool_smith','p_tool_alchemist'],proficiencyBonus:2,unknown:{preserve:true}}");
  var recipe=((JArray)craft["recipes"]).OfType<JObject>().First(r=>((JArray)r["tools"]).Values<string>().All(t=>CommerceRules.HasTool(hero,t,(JObject)craft["toolAliases"])));
  foreach(var requirement in ((JObject)recipe["materials"]).Properties())
  {
   var material=(JObject)((JArray)craft["materials"]).First(m=>(string)m["id"]==requirement.Name).DeepClone(); material["inventoryCategory"]="materials"; material["craftMaterialId"]=requirement.Name;
   CommerceRules.AddItem(hero,material,(double)requirement.Value);
  }
  var result=CommerceRules.Craft(hero,recipe,craft,20); Check((bool)result["ok"],"craft success"); Check((bool)hero["unknown"]["preserve"],"craft preserves unknown save fields");
  string before=hero.ToString(); Reject(()=>CommerceRules.Craft(hero,recipe,craft,20),"missing materials rejected"); Check(hero.ToString()==before,"failed transaction changes nothing");
  var samples=((JArray)alchemy["ingredients"]).OfType<JObject>().Take(2).ToArray();
  var ids=samples.Select(i=>(string)i["id"]).ToArray();
  foreach(var sample in samples) CommerceRules.AddItem(hero,((JArray)commerce["items"]).OfType<JObject>().First(i=>(string)i["alchemyId"]==(string)sample["id"] || (string)i["name"]==(string)sample["name"]));
  var mixed=CommerceRules.Mix(hero,alchemy,ids,null,100); Check((bool)mixed["ok"],"mix creates product"); Check(((JArray)hero["alchemyState"]["history"]).Count==1,"alchemy history persisted");
  var saved=new LegacyCharacterArchive(hero.ToString()).Export(); Check(JToken.DeepEquals(new LegacyCharacterArchive(saved).Snapshot(0),hero),"crafted save roundtrip");
  var hpHero=JObject.Parse("{id:'old-hp',name:'Old HP',hp:{current:3,max:20,custom:'keep'},stats:{dex:10},ac:17}");
  var potion=JObject.Parse("{name:'Test heal',inventoryCategory:'consumables',potency:40,count:1,effects:[{kind:'heal'}]}");
  CommerceRules.AddItem(hpHero,potion);
  CommerceRules.UseProduct(hpHero,(JObject)hpHero["inventory"]["consumables"][0]);
  Check((double)hpHero["hpCurrent"]==7 && (string)hpHero["hp"]["custom"]=="keep","legacy nested HP heals without losing source fields");
  Check(((JArray)hpHero["inventory"]["consumables"]).Count==0,"product consumption persisted");
  var weapon=JObject.Parse("{name:'Sword',inventoryCategory:'weapons'}"); CommerceRules.AddItem(hpHero,weapon);
  CommerceRules.Equip(hpHero,(JObject)hpHero["inventory"]["weapons"][0]);
  Check((int)hpHero["ac"]==17,"weapon equip preserves manually set AC");
  var preferences=ClientPreferences.Parse("{version:1,custom:{future:true}}"); Check(preferences.keepScreenAwake,"old preferences default awake"); preferences.keepScreenAwake=false;
  var restored=ClientPreferences.Parse(preferences.Export()); Check(!restored.keepScreenAwake && (bool)JObject.Parse(restored.Export())["custom"]["future"],"sleep preference and unknown fields roundtrip");
  Reject(()=>ClientPreferences.Parse("{version:1,keepScreenAwake:'false'}"),"invalid sleep preference rejected");
  return count;
 }
}
