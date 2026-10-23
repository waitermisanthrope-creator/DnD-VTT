using System;
using System.IO;
using System.Linq;
using System.Collections.Generic;
using Newtonsoft.Json.Linq;
using DndVtt.UnityPrototype;
static class AllModCollectionChecks
{
 public static int Run(string source)
 {
  int checks=0;void Check(bool ok,string msg){if(!ok)throw new Exception(msg);checks++;}
  void Reject(Action f,string msg){bool failed=false;try{f();}catch(FormatException){failed=true;}Check(failed,msg);}
  var all=new List<JObject>();var paths=new Dictionary<string,string>();
  foreach(string repo in new[]{"DnD-VTT-Content","DnD-VTT-Assets"}) {
   string dir=Path.Combine(source,repo);bool content=repo.EndsWith("Content");
   foreach(JObject m in WorkshopStore.Catalog(File.ReadAllText(Path.Combine(dir,content?"catalog/v3/index.json":"catalog/v9/index.json")),content?"packages":"packs")) {
    all.Add(m);paths.Add((string)m["id"],Path.Combine(dir,"packages",Path.GetFileName((string)m["url"])));
   }
  }
  var roots=all.Where(m=>(string)m["collectionRole"]=="category").OrderBy(WorkshopStore.CollectionOrder).ToArray();
  Check(roots.Length==15,"all fifteen optional categories visible");
  Check(roots.Skip(5).Select(m=>(string)m["collectionCategory"]).SequenceEqual(WorkshopStore.ModCollectionCategories),"all non-item categories have deterministic order");
  var hidden=WorkshopStore.CollectionParts(all);Check(all.Where(m=>!hidden.Contains((string)m["id"])).Select(m=>(string)m["id"]).ToHashSet().SetEquals(roots.Select(m=>(string)m["id"])),"every original mod grouped; exactly fifteen top-level entries");
  string temp=Path.Combine(Path.GetTempPath(),"all-mod-collections-"+Guid.NewGuid());Directory.CreateDirectory(temp);
  try {
   void Install(WorkshopStore store,JObject m,string platform){string part=Path.Combine(temp,"download.part");File.Copy(paths[(string)m["id"]],part,true);store.Install(m,part,platform,"6000.3.26f1");}
   foreach(string platform in new[]{"android-arm64","windows-x64"}) {
    var store=new WorkshopStore(Path.Combine(temp,platform));var activated=new HashSet<string>();
    foreach(var root in roots) {
     bool generic=root["collectionCategory"]!=null;
     if(generic)Reject(()=>WorkshopStore.InstallPlan(root,all,Array.Empty<JObject>(),platform,"6000.3.26f1",10035),"client35 cannot install generic category metadata");
     var plan=WorkshopStore.InstallPlan(root,all,store.Installed().OfType<JObject>(),platform,"6000.3.26f1",10036);
     Check(plan.Count>0&&(string)plan.Last["id"]==(string)root["id"],"collection marker committed last");
     if(generic)Check(plan.OfType<JObject>().Count(m=>(string)m["type"]!="collection")== (int)root["packageCount"],"all expected source mods in plan");
     int prefix=Math.Min(2,plan.Count-1);foreach(JObject m in plan.Take(prefix)){Install(store,m,platform);activated.Add((string)m["id"]);}
     var resumed=WorkshopStore.InstallPlan(root,all,store.Installed().OfType<JObject>(),platform,"6000.3.26f1",10036);
     Check(resumed.Count==plan.Count-prefix,"partial retry skips verified mods");
     foreach(JObject m in resumed){Check(activated.Add((string)m["id"]),"no module downloaded twice");Install(store,m,platform);}
     Check(WorkshopStore.InstallPlan(root,all,store.Installed().OfType<JObject>(),platform,"6000.3.26f1",10036).Count==0,"repeated collection install is a no-op");
     if(generic) {
      var data=JObject.Parse(File.ReadAllText(paths[(string)root["id"]]));data["inventoryCategory"]="junk";
      Reject(()=>WorkshopStore.ValidateData(root,data.ToString()),"mixed item/mod collection category rejected");
      data.Remove("inventoryCategory");data["collectionCategory"]="unknown";
      Reject(()=>WorkshopStore.ValidateData(root,data.ToString()),"unknown or mismatched collection category rejected");
     }
    }
    var restarted=new WorkshopStore(store.Root);Check(restarted.Installed().Count==417,"397 original modules and20 metadata markers survive restart");
    var creation=restarted.Creation(JObject.Parse("{races:[],classes:[],feats:[]}"));
    foreach(var pair in new[]{("races",43),("classes",23),("feats",117)})Check(((JArray)creation[pair.Item1]).Count==pair.Item2,"all creation choices activated: "+pair.Item1);
    Check(((JArray)restarted.Commerce()["items"]).Count==6729,"item libraries unchanged by generic collections");
    var assets=restarted.Installed().OfType<JObject>().Where(m=>(string)m["type"]=="appearance").Select(m=>(manifest:m,data:restarted.Data(m))).ToArray();
    Check(assets.Sum(x=>(x.data["images"] as JArray??new JArray()).Count)==63,"all icons/wallpapers usable");
    Check(assets.Sum(x=>(x.data["diceThemes"] as JArray??new JArray()).Count)==32,"all current 3D dice themes activated once");
    Check(assets.Sum(x=>(x.data["diceTrays"] as JArray??new JArray()).Count)==4,"all four native trays installed");
    Check(restarted.Installed().OfType<JObject>().Count(m=>(string)m["type"]=="map")==9,"all nine maps installed");
   }
  }finally{Directory.Delete(temp,true);}
  return checks;
 }
}
