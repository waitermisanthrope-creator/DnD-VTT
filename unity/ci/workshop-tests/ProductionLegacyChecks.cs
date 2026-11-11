using System;
using System.IO;
using System.Linq;
using Newtonsoft.Json.Linq;
using DndVtt.UnityPrototype;
static class ProductionLegacyChecks
{
 public static int Run()
 {
  int n=0;void Check(bool ok,string label){if(!ok)throw new Exception(label);n++;}
  var commerce=JObject.Parse("{items:[],craft:{materials:[{id:'iron',name:'Железо',weight:1}],recipes:[{id:'test',name:'Пробный клинок',inventoryCategory:'weapons',materials:{iron:2},tools:['smith'],dc:10,time:8}],toolAliases:{smith:['smith']}},alchemy:{}}");
  var module=JObject.Parse("{mode:'production-v1',professions:[{id:'smith',name:'Кузнечное дело',tools:[]}],recipes:[]}");var catalog=new ProductionCatalog(commerce,new[]{module});
  Check(catalog.Recipes.ContainsKey("legacy.craft.test"),"existing working craft recipes must participate in three modes and project book");
  var hero=JObject.Parse("{id:'a',tools:['p_tool_smith'],inventory:{materials:[{id:'iron',name:'Железо',craftMaterialId:'iron',inventoryCategory:'materials',count:4,weight:1}]}}");var ctx=new JObject();var rolls=new JObject{["d20"]=20};
  var semi=CommerceRules.StartProduction(hero,catalog,"legacy.craft.test","legacy.project","semi",1,ctx,rolls);Check(JToken.DeepEquals(semi["inventory"],hero["inventory"]),"legacy semi mode does not consume before approval");
  semi=CommerceRules.ReviewProductionOffline(semi,catalog,"legacy.project",true,true,ctx,rolls);Check(JToken.DeepEquals(semi["inventory"],hero["inventory"]),"legacy long recipe waits for actual game work");
  var complete=CommerceRules.ProgressProduction(semi,catalog,"legacy.project",8,ctx,rolls);Check((int)complete["inventory"]["materials"][0]["count"]==2&&((JArray)complete["inventory"]["weapons"]).Count==1,"legacy recipe reuses trusted old arithmetic with atomic project completion");
  Check((string)complete["crafts"]["projects"][0]["status"]=="completed","legacy completion updates the actual persisted project node");
  Check(JToken.DeepEquals(complete,CommerceRules.ProgressProduction(complete,catalog,"legacy.project",8,ctx,rolls)),"repeated legacy completion never debits or produces twice");
  var alchemy=(JObject)JObject.Parse(File.ReadAllText(Path.Combine(Directory.GetCurrentDirectory(),"unity/ContentSources~/workshop-commerce/catalogs.json")))["alchemy"];
  var alchemyCommerce=(JObject)commerce.DeepClone();alchemyCommerce["alchemy"]=alchemy;var alchemyCatalog=new ProductionCatalog(alchemyCommerce,new[]{module});
  var alchemist=JObject.Parse("{id:'alchemist',tools:['p_tool_alchemist'],inventory:{materials:[]}}");var selected=new JArray();
  foreach(JObject ingredient in ((JArray)alchemy["ingredients"]).Take(2)){selected.Add(ingredient["id"].DeepClone());((JArray)alchemist["inventory"]["materials"]).Add(new JObject{["id"]="ingredient."+ingredient["id"],["name"]=ingredient["name"].DeepClone(),["alchemyId"]=ingredient["id"].DeepClone(),["count"]=2,["inventoryCategory"]="materials"});}
  var mixed=CommerceRules.StartLegacyProduction(alchemist,alchemyCatalog,new JObject{["kind"]="alchemy",["ids"]=selected},"alchemy.project","auto",1,ctx,new JObject{["d100"]=100});
  Check((string)mixed["crafts"]["projects"][0]["status"]=="completed","alchemy completion updates owned project after legacy whole-hero commit");
  Check(JToken.DeepEquals(mixed,CommerceRules.ProgressProduction(mixed,alchemyCatalog,"alchemy.project",1,ctx,rolls)),"alchemy retry never creates another potion or consumes more ingredients");
  var save=typeof(CharacterSheetStore).GetMethod("SaveExpected");Check(save!=null,"craft saves must reject an externally changed full archive");
  string dir=Path.Combine(Path.GetTempPath(),"vtt-craft-save-"+Guid.NewGuid());Directory.CreateDirectory(dir);
  try{string path=Path.Combine(dir,"heroes.json");var original=new LegacyCharacterArchive(new JArray(hero).ToString());CharacterSheetStore.Save(path,original);var candidate=original.DetachedCopy();candidate.Replace(0,complete);save.Invoke(null,new object[]{path,candidate,original.Export()});string written=File.ReadAllText(path);bool rejected=false;try{save.Invoke(null,new object[]{path,original,original.Export()});}catch(System.Reflection.TargetInvocationException){rejected=true;}Check(rejected&&File.ReadAllText(path)==written,"stale pending command never overwrites latest craft inventory");}
  finally{Directory.Delete(dir,true);}
  return n;
 }
}
