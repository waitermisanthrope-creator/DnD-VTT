using System;
using System.Linq;
using Newtonsoft.Json.Linq;
using DndVtt.UnityPrototype;
static class ProductionChecks
{
 public static int Run()
 {
  int n=0;void Check(bool ok,string text){if(!ok)throw new Exception(text);n++;}
  var type=typeof(CommerceRules).Assembly.GetType("DndVtt.UnityPrototype.ProductionCatalog");Check(type!=null,"crafts need item-ID based projects and three real production modes");
  var items=new JArray(new JObject{["id"]="ore",["name"]="Руда",["inventoryCategory"]="materials",["weight"]=1},new JObject{["id"]="bar",["name"]="Слиток",["inventoryCategory"]="materials",["weight"]=1},new JObject{["id"]="blade",["name"]="Клинок",["inventoryCategory"]="weapons",["weight"]=1});
  var definition=JObject.Parse("{mode:'production-v1',professions:[{id:'smith',name:'Кузнечное дело',tools:[],progression:{thresholds:[0,10,30]}}],recipes:[{id:'smelt',name:'Слиток',professionId:'smith',knownByDefault:true,ingredients:[{itemId:'ore',count:3}],results:[{itemId:'bar',count:1}],timeHours:0,experience:10},{id:'forge',name:'Клинок',professionId:'smith',knownByDefault:true,ingredients:[{itemId:'bar',count:1}],results:[{itemId:'blade',count:1}],timeHours:16,experience:10}]}");
  object catalog=Activator.CreateInstance(type,new object[]{new JObject{["items"]=items},new[]{definition}});
  JObject Call(string name,params object[] args)=>(JObject)typeof(CommerceRules).GetMethod(name).Invoke(null,args);
  JObject Hero()=>JObject.Parse("{id:'hero',future:17,coins:{gp:5},inventory:{materials:[{id:'ore',name:'Руда',inventoryCategory:'materials',weight:1,count:9,charges:1}]}}");
  var ctx=new JObject();var rolls=new JObject{["d20"]=20,["d100"]=100};var hero=Hero();string original=hero.ToString();
  var manual=Call("StartProduction",hero,catalog,"smelt","project.manual","manual",1m,ctx,rolls);
  Check(JToken.DeepEquals(manual["inventory"],hero["inventory"]),"manual mode never consumes or creates automatically");
  var semi=Call("StartProduction",hero,catalog,"smelt","project.semi","semi",1m,ctx,rolls);
  Check(JToken.DeepEquals(semi["inventory"],hero["inventory"]),"pending master approval does not debit");
  bool rejected=false;try{Call("ReviewProductionOffline",semi,catalog,"project.semi",true,false,ctx,rolls);}catch(System.Reflection.TargetInvocationException){rejected=true;}Check(rejected,"player cannot use master review action");
  var cancelled=Call("ReviewProductionOffline",semi,catalog,"project.semi",false,true,ctx,rolls);Check(JToken.DeepEquals(cancelled["inventory"],hero["inventory"]),"cancellation preserves all resources");
  var approved=Call("ReviewProductionOffline",semi,catalog,"project.semi",true,true,ctx,rolls);
  Check((decimal)approved["inventory"]["materials"][0]["count"]==6&&((JArray)approved["inventory"]["materials"]).OfType<JObject>().Any(i=>(string)i["id"]=="bar"),"approval atomically debits materials and adds canonical output");
  Check(JToken.DeepEquals(approved,Call("ReviewProductionOffline",approved,catalog,"project.semi",true,true,ctx,rolls)),"repeated approval never duplicates output");
  var auto=Call("StartProduction",hero,catalog,"smelt","project.auto","auto",1m,ctx,rolls);Check((decimal)auto["inventory"]["materials"][0]["count"]==6,"automatic mode performs actual transaction");
  Check((int)auto["future"]==17&&hero.ToString()==original,"crafting preserves unknown fields and immutable source");
  Check(auto["crafts"]["professions"]?["smith"]?["xp"]==null,"standard crafting does not force profession grind");
  var longProject=Call("StartProduction",auto,catalog,"forge","project.long","auto",1m,ctx,rolls);var halfway=Call("ProgressProduction",longProject,catalog,"project.long",8m,ctx,rolls);
  Check(JToken.DeepEquals(halfway["inventory"],auto["inventory"]),"unfinished project does not mint intermediate results");
  halfway=JObject.Parse(halfway.ToString());var complete=Call("ProgressProduction",halfway,catalog,"project.long",8m,ctx,rolls);
  Check(((JArray)complete["inventory"]["weapons"]).OfType<JObject>().Any(i=>(string)i["id"]=="blade"),"saved production chain consumes ordinary intermediate item");
  Check(JToken.DeepEquals(complete,Call("ProgressProduction",complete,catalog,"project.long",8m,ctx,rolls)),"reopening/completing saved project is idempotent");
  var poor=Hero();poor["inventory"]["materials"][0]["count"]=1;string poorBefore=poor.ToString();rejected=false;try{Call("StartProduction",poor,catalog,"smelt","project.poor","auto",1m,ctx,rolls);}catch(System.Reflection.TargetInvocationException){rejected=true;}Check(rejected&&poor.ToString()==poorBefore,"insufficient materials do not mutate or go negative");
  var policy=Call("SetCraftPolicyOffline",hero,new JArray("manual"),true);rejected=false;try{Call("StartProduction",policy,catalog,"smelt","project.blocked","auto",1m,ctx,rolls);}catch(System.Reflection.TargetInvocationException){rejected=true;}Check(rejected,"master policy restricts automatic mode");
  var progression=Call("SetCraftProgression",hero,catalog,"smith",true);progression=Call("StartProduction",progression,catalog,"smelt","project.xp","auto",1m,ctx,rolls);Check((long)progression["crafts"]["professions"]["smith"]["xp"]==10&&(int)progression["crafts"]["professions"]["smith"]["level"]==2,"opt-in profession rules grant XP and ranks");
  var skilledDefinition=(JObject)definition.DeepClone();skilledDefinition["recipes"][0]["check"]=JObject.Parse("{skill:'arcana',dc:15}");
  object skilledCatalog=Activator.CreateInstance(type,new object[]{new JObject{["items"]=items.DeepClone()},new[]{skilledDefinition}});
  var skilled=Hero();skilled["stats"]=new JObject{["int"]=14};skilled["skillsData"]=new JObject{["arcana"]=2};
  skilled=Call("StartProduction",skilled,skilledCatalog,"smelt","project.skill","auto",1m,ctx,new JObject{["d20"]=10});
  Check((string)skilled["crafts"]["projects"][0]["status"]=="completed","skill checks reuse actual ability, proficiency and expertise");
  var unknown=Hero();unknown["crafts"]=new JObject{["schema"]=2,["future"]=true};rejected=false;try{Call("SetCraftMode",unknown,"auto");}catch(System.Reflection.TargetInvocationException){rejected=true;}Check(rejected&&(int)unknown["crafts"]["schema"]==2,"future craft schemas never overwritten");
  var staleDefinition=(JObject)definition.DeepClone();staleDefinition["recipes"][0]["experience"]=11;
  object staleCatalog=Activator.CreateInstance(type,new object[]{new JObject{["items"]=items.DeepClone()},new[]{staleDefinition}});string semiBefore=semi.ToString();rejected=false;try{Call("ReviewProductionOffline",semi,staleCatalog,"project.semi",true,true,ctx,rolls);}catch(System.Reflection.TargetInvocationException){rejected=true;}Check(rejected&&semi.ToString()==semiBefore,"updated addon invalidates pending approval without spending");
  var archived=Call("ArchiveProductionProjects",auto);Check(JToken.DeepEquals(archived,Call("StartProduction",archived,catalog,"smelt","project.auto","auto",1m,ctx,rolls)),"archived project receipts prevent replay duplication");
  var effectsDefinition=(JObject)definition.DeepClone();effectsDefinition["recipes"][0]["effects"]=JArray.Parse("[{kind:'craft-flag',id:'tempered',value:true},{kind:'learn-recipe',recipeId:'forge'}]");
  object effectsCatalog=Activator.CreateInstance(type,new object[]{new JObject{["items"]=items.DeepClone()},new[]{effectsDefinition}});
  var effected=Call("StartProduction",Hero(),effectsCatalog,"smelt","project.effects","auto",1m,ctx,rolls);
  Check((bool?)effected["crafts"]["flags"]?["tempered"]==true&&((JArray)effected["crafts"]["professions"]["smith"]["knownRecipes"]).Values<string>().Contains("forge"),"declarative effects unlock recipes and craft flags without executing code");
  var manualXp=Call("SetCraftProgression",Hero(),catalog,"smith",true);manualXp=Call("StartProduction",manualXp,catalog,"smelt","project.manual.xp","manual",1m,ctx,rolls);manualXp=Call("FinishManualProduction",manualXp,catalog,"project.manual.xp",new JObject{["notes"]="Решение игрока и мастера",["experience"]=10});
  Check((long)manualXp["crafts"]["professions"]["smith"]["xp"]==10&&JToken.DeepEquals(manualXp["inventory"],Hero()["inventory"]),"manual XP is explicit and never forces item debit/output");
  return n;
 }
}
