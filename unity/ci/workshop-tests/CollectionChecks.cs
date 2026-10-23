using System;
using System.IO;
using System.Linq;
using Newtonsoft.Json.Linq;
using DndVtt.UnityPrototype;
static class CollectionChecks
{
 public static int Run(string content)
 {
  int checks=0;
  void Check(bool ok,string message){if(!ok)throw new Exception(message);checks++;}
  void Reject(Action action,string message){bool rejected=false;try{action();}catch(FormatException){rejected=true;}Check(rejected,message);}
  var catalog=WorkshopStore.Catalog(File.ReadAllText(Path.Combine(content,"catalog/v3/index.json")),"packages");
  var all=catalog.OfType<JObject>().ToArray();var roots=all.Where(m=>(string)m["collectionRole"]=="category").ToArray();
  Check(roots.Length==5,"five category buttons");
  var hidden=WorkshopStore.CollectionParts(all);
  Check(all.Count(m=>new[]{"item","craft","collection"}.Contains((string)m["type"])&&!hidden.Contains((string)m["id"]))==5,"five visible libraries replace individual tomes");
  string temp=Path.Combine(Path.GetTempPath(),"collection-test-"+Guid.NewGuid());Directory.CreateDirectory(temp);
  try {
   string Payload(JObject m)=>Path.Combine(content,"packages",Path.GetFileName((string)m["url"]));
   void Install(WorkshopStore store,JObject m,string platform){string part=Path.Combine(temp,"download.part");File.Copy(Payload(m),part,true);store.Install(m,part,platform,"6000.3.26f1");}
   var union=new WorkshopStore(Path.Combine(temp,"all"));int downloaded=0;
   foreach(var root in roots) {
    string category=(string)root["inventoryCategory"];
    Reject(()=>WorkshopStore.InstallPlan(root,all,Array.Empty<JObject>(),"android-arm64","6000.3.26f1",10034),"old client requires an update");
    var originalPlan=WorkshopStore.InstallPlan(root,all,Array.Empty<JObject>(),"android-arm64","6000.3.26f1",10035);
    Check((string)originalPlan.Last["id"]==(string)root["id"],"root committed last");
    Check(originalPlan.Select(m=>(string)m["id"]).Distinct().Count()==originalPlan.Count,"dependency graph deduplicated");
    foreach(var platform in new[]{"android-arm64","windows-x64"}) {
     var store=new WorkshopStore(Path.Combine(temp,category+platform));int prefix=2;
     foreach(JObject m in originalPlan.Take(prefix))Install(store,m,platform);
     Check(store.Find((string)root["id"])==null,"partial batch never marks collection complete");
     var resumed=WorkshopStore.InstallPlan(root,all,store.Installed().OfType<JObject>(),platform,"6000.3.26f1",10035);
     Check(resumed.Count==originalPlan.Count-prefix,"retry skips already verified downloads");
     foreach(JObject m in resumed)Install(store,m,platform);
     var restart=new WorkshopStore(store.Root);
     Check(restart.Find((string)root["id"])!=null,"collection survives restart "+platform);
     Check(WorkshopStore.InstallPlan(root,all,restart.Installed().OfType<JObject>(),platform,"6000.3.26f1",10035).Count==0,"no redundant downloads on repeat click");
     var items=(JArray)restart.Commerce()["items"];
     Check(items.Count==(int)root["itemCount"],"every category item activated");
     Check(items.All(i=>(string)i["inventoryCategory"]==category),"no unrelated category downloaded");
     Check(items.Select(i=>(string)i["id"]).Distinct().Count()==items.Count,"no duplicate item IDs");
     if(category=="materials")Check(((JArray)restart.Commerce()["alchemy"]["ingredients"]).Count==339,"all ingredient profiles and rules installed automatically");
     var leaf=(JObject)originalPlan.First(m=>(string)m["type"]!="collection");
     Reject(()=>restart.Remove((string)leaf["id"]),"cannot remove a required part accidentally");
     // A missing/corrupt file is not considered an installed complete library after restart.
     string leafDir=Path.Combine(restart.Root,(string)leaf["id"]+"-"+(string)leaf["sha256"]);
     foreach(string file in Directory.GetFiles(leafDir))File.Delete(file);
     var broken=new WorkshopStore(store.Root);
     Check(broken.Find((string)root["id"])==null,"missing dependency invalidates completion badge");
     var repair=WorkshopStore.InstallPlan(root,all,broken.Installed().OfType<JObject>(),platform,"6000.3.26f1",10035);
     Check(repair.Any(m=>(string)m["id"]==(string)leaf["id"]),"damaged installation can be repaired with one click");
     foreach(JObject m in repair)Install(broken,m,platform);
     Check(new WorkshopStore(store.Root).Find((string)root["id"])!=null,"missing cached file actually restored on retry");
    }
    foreach(JObject m in WorkshopStore.InstallPlan(root,all,union.Installed().OfType<JObject>(),"android-arm64","6000.3.26f1",10035)){Install(union,m,"android-arm64");downloaded++;}
   }
   Check(((JArray)union.Commerce()["items"]).Count==6729,"all five collections preserve all 6729 inventory records");
   Check(downloaded==110,"103 content modules and seven small collection markers, once each");
   var selected=(JObject)roots[0].DeepClone();var missing=all.Where(m=>(string)m["id"]!=(string)((JArray)selected["dependencies"])[0]).ToArray();
   Reject(()=>WorkshopStore.InstallPlan(selected,missing,Array.Empty<JObject>(),"android-arm64","6000.3.26f1",10035),"missing part rejected before download");
   var cycle=all.Select(m=>(JObject)m.DeepClone()).ToArray();cycle.First(m=>(string)m["id"]==(string)selected["dependencies"][0])["dependencies"]=new JArray(selected["id"].DeepClone());
   Reject(()=>WorkshopStore.InstallPlan(selected,cycle,Array.Empty<JObject>(),"android-arm64","6000.3.26f1",10035),"cyclic dependency rejected");
   var mismatch=(JObject)selected.DeepClone();mismatch["sha256"]=new string('0',64);
   Reject(()=>WorkshopStore.InstallPlan(mismatch,all,Array.Empty<JObject>(),"android-arm64","6000.3.26f1",10035),"stale manifest rejected");
   var invalid=JObject.Parse(File.ReadAllText(Payload(selected)));((JArray)invalid["members"]).RemoveAt(0);
   Reject(()=>WorkshopStore.ValidateData(selected,invalid.ToString()),"manifest/payload members must agree");
   var incompatible=all.Select(m=>(JObject)m.DeepClone()).ToArray();incompatible.First(m=>(string)m["id"]==(string)selected["dependencies"][0])["platform"]="windows-x64";
   Reject(()=>WorkshopStore.InstallPlan(selected,incompatible,Array.Empty<JObject>(),"android-arm64","6000.3.26f1",10035),"incompatible child rejected before any downloads");
  }finally{Directory.Delete(temp,true);}
  return checks;
 }
}
