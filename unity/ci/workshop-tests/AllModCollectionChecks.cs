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
  var requiredRoots=new[]{"weapons","armor","materials","consumables","junk"}.Concat(WorkshopStore.ModCollectionCategories).Select(x=>"dnd.collections."+x).ToHashSet();
  Check(requiredRoots.IsSubsetOf(roots.Select(m=>(string)m["id"]).ToHashSet()),"all fifteen base optional categories remain visible alongside additions");
  Check(roots.Skip(5).Select(m=>(string)m["collectionCategory"]).Distinct().SequenceEqual(WorkshopStore.ModCollectionCategories),"all non-item categories have deterministic order");
  var hidden=WorkshopStore.CollectionParts(all);
  const string merchantId="dnd.market.fantasy-merchants";
  var standalone=all.Where(m=>!hidden.Contains((string)m["id"])&&!roots.Any(r=>(string)r["id"]==(string)m["id"])).ToArray();
  Check(standalone.Length==1&&(string)standalone[0]["id"]==merchantId,"one optional merchant pack is outside full collections");
  Check(all.Where(m=>!hidden.Contains((string)m["id"])&&(string)m["id"]!=merchantId).Select(m=>(string)m["id"]).ToHashSet().SetEquals(roots.Select(m=>(string)m["id"])),"all other mods remain grouped by original categories");
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
     if(generic) {
      var closure=new HashSet<string>();
      void Visit(string id){if(!closure.Add(id))return;foreach(string dep in ((JArray)all.First(m=>(string)m["id"]==id)["dependencies"]).Values<string>())Visit(dep);}
      Visit((string)root["id"]);
      var leaves=all.Where(m=>closure.Contains((string)m["id"])&&(string)m["type"]!="collection").ToArray();
      Check(leaves.Length==(int)root["packageCount"],"complete category includes declared shared resources");
      var installedIds=store.Installed().OfType<JObject>().Select(m=>(string)m["id"]).ToHashSet();
      Check(plan.OfType<JObject>().Count(m=>(string)m["type"]!="collection")==leaves.Count(m=>!installedIds.Contains((string)m["id"])),"shared resources are downloaded only once across collections");
      if((string)root["collectionCategory"]=="maps")Check(leaves.Any(m=>(string)m["id"]=="dnd.appearance.map-surfaces"),"map collection includes procedural map textures");
     }
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
    var restarted=new WorkshopStore(store.Root);var installed=restarted.Installed().OfType<JObject>().ToArray();
    Check(installed.Length==all.Count-1&&installed.Select(m=>(string)m["id"]).ToHashSet().SetEquals(all.Where(m=>(string)m["id"]!=merchantId).Select(m=>(string)m["id"])),"original collections install without optional merchant module");
    var merchant=all.Single(m=>(string)m["id"]==merchantId);
    Reject(()=>WorkshopStore.InstallPlan(merchant,all,restarted.Installed().OfType<JObject>(),"android-arm64","6000.3.26f1",10049),"released Unity49 cannot install merchant extension");
    var optionPlan=WorkshopStore.InstallPlan(merchant,all,restarted.Installed().OfType<JObject>(),platform,"6000.3.26f1",10050);
    Check(optionPlan.Count==1&&(string)optionPlan[0]["id"]==merchantId,"new Unity50 downloads market only when explicitly selected");
    Install(store,merchant,platform);
    restarted=new WorkshopStore(store.Root);
    Check(restarted.Find(merchantId)!=null&&((JArray)restarted.Commerce()["markets"]).Count==1,"opt-in market activates without changing other packages");
    Check(WorkshopStore.InstallPlan(merchant,all,restarted.Installed().OfType<JObject>(),platform,"6000.3.26f1",10050).Count==0,"already installed market never downloads twice");
    var creation=restarted.Creation(JObject.Parse("{races:[],classes:[],feats:[]}"));
    foreach(var pair in new[]{("races","race"),("classes","class"),("feats","feat")})
    {
     var expected=all.Where(m=>(string)m["type"]==pair.Item2).SelectMany(m=>((JArray)JObject.Parse(File.ReadAllText(paths[(string)m["id"]]))[pair.Item1]).OfType<JObject>()).Select(x=>(string)x["id"]).ToArray();
     var actual=((JArray)creation[pair.Item1]).OfType<JObject>().Select(x=>(string)x["id"]).ToArray();
     Check(actual.Length==expected.Length&&actual.ToHashSet().SetEquals(expected),"all exact published creation choices activated: "+pair.Item1);
    }
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
