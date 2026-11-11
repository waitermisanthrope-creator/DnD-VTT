using System;
using System.IO;
using System.Linq;
using Newtonsoft.Json.Linq;
using DndVtt.UnityPrototype;
static class ProductionPackageChecks
{
 public static int Run()
 {
  int n=0;void Check(bool ok,string label){if(!ok)throw new Exception(label);n++;}
  var import=typeof(WorkshopStore).GetMethod("ImportLocalData");Check(import!=null,"Homebrew must use the existing installed-package store with local JSON transport");
  string dir=Path.Combine(Path.GetTempPath(),"vtt-production-package-"+Guid.NewGuid());Directory.CreateDirectory(dir);
  try
  {
   var store=new WorkshopStore(dir);
   JObject Envelope(string id,string type,JObject data,JArray deps)=>new JObject{["manifest"]=new JObject{["id"]=id,["version"]="1.0.0",["name"]="Проверочное дополнение",["author"]="Автор теста",["license"]="CC0-1.0",["type"]=type,["dependencies"]=deps},["data"]=data};
   var items=Envelope("homebrew.items","item",JObject.Parse("{items:[{id:'homebrew.items.ore',name:'Руда',inventoryCategory:'materials',weight:1},{id:'homebrew.items.bar',name:'Слиток',inventoryCategory:'materials',weight:1}]}"),new JArray());
   var manifest=(JObject)import.Invoke(store,new object[]{items.ToString(),"Android","6000.3.0f1",10051});Check((string)manifest["source"]=="local"&&store.Installed().Count==1,"local items use normal manifests, hashes and installed pointers");
   var recipes=Envelope("homebrew.production","craft",JObject.Parse("{mode:'production-v1',professions:[{id:'homebrew.production.smith',name:'Кузнец'}],recipes:[{id:'homebrew.production.smelt',name:'Слиток',professionId:'homebrew.production.smith',knownByDefault:true,ingredients:[{itemId:'homebrew.items.ore',count:2}],results:[{itemId:'homebrew.items.bar',count:1}]}]}"),new JArray("homebrew.items"));
   bool rejected=false;try{import.Invoke(store,new object[]{recipes.ToString(),"Android","6000.3.0f1",10050});}catch(System.Reflection.TargetInvocationException){rejected=true;}Check(rejected&&store.Installed().Count==1,"old clients cannot activate the new production schema");
   import.Invoke(store,new object[]{recipes.ToString(),"Android","6000.3.0f1",10051});Check(store.Installed().Count==2,"production package installed through dependency validation");
   var commerce=store.Commerce();Check(((JArray)commerce["items"]).Count==2&&((JArray)commerce["craft"]["recipes"]).Count==0,"inventory catalog does not parse/load a second production recipe database");
   var docs=(JArray)typeof(WorkshopStore).GetMethod("Production").Invoke(store,new object[]{store.Installed()});Check(docs.Count==1,"production packages load only on their own page");
   var catalog=new ProductionCatalog(commerce,docs.OfType<JObject>().ToArray());Check(ReferenceEquals(catalog.Items["homebrew.items.ore"],commerce["items"][0]),"item index shares original definitions without duplicating item JSON");
   rejected=false;try{store.Remove("homebrew.items");}catch(FormatException){rejected=true;}Check(rejected,"existing dependency mechanism protects required materials package");
   store.Remove("homebrew.production");Check(store.Installed().Count==1,"removal leaves installed items and character data intact");
   var code=(JObject)recipes.DeepClone();code["manifest"]["id"]="homebrew.bad";code["data"]["script"]="unsafe()";rejected=false;try{import.Invoke(store,new object[]{code.ToString(),"Android","6000.3.0f1",10051});}catch(System.Reflection.TargetInvocationException){rejected=true;}Check(rejected&&store.Installed().Count==1,"executable addon fields rejected without installation");
  }
  finally{Directory.Delete(dir,true);}
  return n;
 }
}
