using System;
using System.IO;
using System.Linq;
using Newtonsoft.Json.Linq;
using DndVtt.UnityPrototype;
static class CommerceChecks
{
 public static int RunCollections(string source)
 {
  int checks=0;
  void Check(bool ok,string name) { if(!ok) throw new Exception(name); checks++; }
  void Reject(Action action,string name) { bool failed=false; try { action(); } catch(FormatException) { failed=true; } Check(failed,name); }
  string root=Path.Combine(Path.GetTempPath(),"vtt-collections-"+Guid.NewGuid());
  try {
   var store=new WorkshopStore(root);
   var catalog=WorkshopStore.Catalog(File.ReadAllText(Path.Combine(source,"catalog/v4/index.json")),"packages");
   foreach(JObject m in catalog.Where(x=>(string)x["type"]=="item" || (string)x["type"]=="craft")) {
    string path=Path.Combine(source,"packages",Path.GetFileName((string)m["url"]));
    string download=Path.Combine(root,"download.json"); Directory.CreateDirectory(root); File.Copy(path,download,true);
    store.Install(m,download,"android-arm64","6000.3.26f1");
    Check(new WorkshopStore(root).Find((string)m["id"])!=null,"install/restart "+m["id"]);
    Check(WorkshopStore.ValidateData(m,File.ReadAllText(path))!=null,"runtime payload validation");
   }
   var data=store.Commerce();var items=(JArray)data["items"];var craft=(JObject)data["craft"];
   Check(items.Count==3311,"3311 inventory records");
   Check(items.OfType<JObject>().All(i=>i["weight"]!=null&&!string.IsNullOrWhiteSpace((string)i["description"])),"every item has weight/description");
   Check(((JArray)data["alchemy"]["ingredients"]).Count==120,"old alchemy profiles preserved");
   Check(((JArray)craft["recipes"]).Count==47,"all existing recipes retained");
   var hero=JObject.Parse("{id:'collections',name:'Test',hpCurrent:3,hpMax:20,ac:15,proficiencies:['p_tool_smith']}");
   var weapon=items.OfType<JObject>().First(i=>(string)i["inventoryCategory"]=="weapons");
   CommerceRules.AddItem(hero,weapon);var owned=(JObject)hero["inventory"]["weapons"][0];CommerceRules.Equip(hero,owned);
   Check((bool)owned["equipped"]&&(int)hero["ac"]==15,"weapon equips without AC damage");
   var bodyA=JObject.Parse("{name:'Body A',inventoryCategory:'armor',equipmentSlot:'body',acBase:14,proficiencyType:'heavy'}");
   var bodyB=JObject.Parse("{name:'Body B',inventoryCategory:'armor',equipmentSlot:'body',acBase:16,proficiencyType:'heavy'}");
   CommerceRules.AddItem(hero,bodyA);CommerceRules.AddItem(hero,bodyB);
   var armors=(JArray)hero["inventory"]["armor"];CommerceRules.Equip(hero,(JObject)armors[0]);CommerceRules.Equip(hero,(JObject)armors[1]);
   Check(!(bool)armors[0]["equipped"]&&(bool)armors[1]["equipped"]&&(int)hero["ac"]==16,"body armor slot replaces previous armor");
   var healing=items.OfType<JObject>().First(i=>(string)i["id"]=="dnd.items.consumables.1");CommerceRules.AddItem(hero,healing);
   CommerceRules.UseProduct(hero,(JObject)hero["inventory"]["consumables"][0],sides=>sides);
   Check((int)hero["hpCurrent"]==13,"original healing potion rolls 2d4+2");hero["hpCurrent"]=3;
   var potion=items.OfType<JObject>().First(i=>(string)i["id"]=="dnd.items.consumables.healing.9.0");
   CommerceRules.AddItem(hero,potion,2);var dose=(JObject)hero["inventory"]["consumables"][0];CommerceRules.UseProduct(hero,dose);
   Check((int)hero["hpCurrent"]==20&&(int)dose["count"]==1,"bounded healing and one dose");CommerceRules.UseProduct(hero,dose);
   string before=hero.ToString();Reject(()=>CommerceRules.UseProduct(hero,dose),"detached dose cannot replay");Check(before==hero.ToString(),"replay leaves hero unchanged");
   var food=items.OfType<JObject>().First(i=>(string)i["useMode"]=="manual");CommerceRules.AddItem(hero,food);CommerceRules.UseProduct(hero,(JObject)hero["inventory"]["consumables"][0]);
   Check(((JArray)hero["inventory"]["consumables"]).Count==0,"manual consumable spends stock");
   var heart=items.OfType<JObject>().First(i=>(string)i["craftMaterialId"]=="harvest_monster_heart");CommerceRules.AddItem(hero,heart,2);
   var recipe=JObject.Parse("{id:'test.heart',name:'Heart trophy',inventoryCategory:'junk',dc:1,tools:[],materials:{harvest_monster_heart:2},weight:'0.1 кг'}");
   Check((bool)CommerceRules.Craft(hero,recipe,craft,20)["ok"],"generic harvest material feeds real craft");
   before=hero.ToString();Reject(()=>CommerceRules.Craft(hero,recipe,craft,20),"no material double-spend");Check(before==hero.ToString(),"craft failure atomic");
   Check(JToken.DeepEquals(new LegacyCharacterArchive(new LegacyCharacterArchive(hero.ToString()).Export()).Snapshot(0),hero),"inventory archive roundtrip");
   var shared=items.OfType<JObject>().First(i=>i["alchemyIds"] is JArray a && a.Count>0);
   var alchemist=JObject.Parse("{id:'harvest-alchemy',name:'Test',proficiencies:['p_tool_alchemist']}");
   string ingredientId=(string)shared["alchemyIds"][0];CommerceRules.AddItem(alchemist,shared,2);
   CommerceRules.Research(alchemist,(JObject)data["alchemy"],ingredientId);
   Check((bool)CommerceRules.Mix(alchemist,(JObject)data["alchemy"],new[]{ingredientId,ingredientId},null,100)["ok"],"generic harvest alias works in real alchemy");
   Check(((JArray)alchemist["inventory"]["materials"]).Count==0,"generic alchemy stock consumed");
   var legacy=JObject.Parse(File.ReadAllText(Path.Combine(source,"catalog/v3/index.json")));
   foreach(JObject m in ((JArray)legacy["packages"]).Where(x=>((string)x["id"]).StartsWith("dnd.alchemy.ingredients."))) {
    string download=Path.Combine(root,"download.json");File.Copy(Path.Combine(source,"packages",Path.GetFileName((string)m["url"])),download,true);store.Install(m,download,"android-arm64","6000.3.26f1");
   }
   Check(((JArray)store.Commerce()["items"]).Count==3311,"old ingredient packs do not duplicate new inventory");
   Check(((JArray)store.Commerce()["alchemy"]["ingredients"]).Count==120,"old ingredient packs do not duplicate profiles");
   var manifest=(JObject)catalog.First(x=>(string)x["id"]=="dnd.items.weapons");
   var payload=store.Data(manifest);payload["items"]=new JArray(Enumerable.Range(0,5001).Select(n=>new JObject{["id"]="dnd.items.weapons.test."+n,["name"]="test"}));
   Reject(()=>WorkshopStore.ValidateData(manifest,payload.ToString()),"bounded collection size");
  } finally { if(Directory.Exists(root))Directory.Delete(root,true); }
  return checks;
 }
 public static int Run(WorkshopStore store,string appRoot)
 {
  int count=0;
  void Check(bool value,string name) { if(!value) throw new Exception(name); count++; }
  void Reject(Action action,string name) { bool failed=false; try { action(); } catch(FormatException) { failed=true; } Check(failed,name); }
  var commerce=store.Commerce(); var craft=(JObject)commerce["craft"]; var alchemy=(JObject)commerce["alchemy"];
  Check(((JArray)commerce["items"]).Count==308,"188 items and 120 ingredient records activated");
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
  var ids=((JArray)alchemy["ingredients"]).Take(2).Select(i=>(string)i["id"]).ToArray();
  foreach(string id in ids) CommerceRules.AddItem(hero,((JArray)commerce["items"]).OfType<JObject>().First(i=>(string)i["alchemyId"]==id));
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
