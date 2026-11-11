using System;
using System.IO;
using System.Linq;
using Newtonsoft.Json.Linq;
using DndVtt.UnityPrototype;
static class ContainerMigrationChecks
{
 public static int Run()
 {
  int n=0;void Check(bool ok,string label){if(!ok)throw new Exception(label);n++;}
  var transfer=typeof(CommerceRules).GetMethod("TransferLegacyContainers");Check(transfer!=null,"legacy containers need idempotent property-preserving transfer");
  JObject Transfer(JObject hero)=>(JObject)transfer.Invoke(null,new object[]{hero});
  var h=JObject.Parse("{id:'a',unknown:17,inventory:{weapons:[{id:'blade',name:'Клинок',inventoryCategory:'weapons',weight:1,count:2,charges:1}],containers:[{id:'bag',name:'Рюкзак',weight:1,capacity:30,future:18,contents:[{id:'blade',name:'Клинок',inventoryCategory:'weapons',weight:1,count:3,charges:1},{id:'blade',name:'Клинок',inventoryCategory:'weapons',weight:1,count:3,charges:2}]}]}}");
  string before=h.ToString();double weight=CommerceRules.TotalWeightKg(h);var migrated=Transfer(h);
  Check(h.ToString()==before,"planning migration never mutates source");
  Check(((JArray)migrated["inventory"]["weapons"]).Count==2&&(decimal)migrated["inventory"]["weapons"][0]["count"]==5,"identical stacks merge and charged variants remain distinct");
  Check(JToken.DeepEquals(h["inventory"]["containers"][0]["contents"],migrated["inventory"]["containers"][0]["contents"]),"original container contents retained as archival records");
  Check(CommerceRules.TotalWeightKg(migrated)==weight,"contents and bag weight counted exactly once");
  Check(JToken.DeepEquals(migrated,Transfer(migrated)),"second transfer never duplicates items or shells");
  var bad=(JObject)h.DeepClone();((JArray)bad["inventory"]["containers"]).Add(new JObject{["contents"]="future"});string badBefore=bad.ToString();try{Transfer(bad);throw new Exception("bad container accepted");}catch(System.Reflection.TargetInvocationException){n++;}Check(bad.ToString()==badBefore,"unknown format rejects entire transfer without mutation");
  string dir=Path.Combine(Path.GetTempPath(),"vtt-container-"+Guid.NewGuid());Directory.CreateDirectory(dir);
  try
  {
   string path=Path.Combine(dir,"heroes.json");var archive=new LegacyCharacterArchive(new JObject{["characters"]=new JArray(h.DeepClone(),new JObject{["id"]="b",["future"]=19}),["wrapper"]=20}.ToString());CharacterSheetStore.Save(path,archive);
   var method=typeof(CharacterSheetStore).GetMethod("TransferContainers");Check(method!=null,"durable transfer must back up the full archive");
   var result=(LegacyCharacterArchive)method.Invoke(null,new object[]{path,archive});Check((int)result.Snapshot(1)["future"]==19&&result.Export().Contains("wrapper"),"other heroes and wrapper preserved");
   var backup=Directory.GetFiles(Path.Combine(dir,"character-backups"),"*.json").Single();Check(JToken.DeepEquals(CharacterSheetStore.Load(backup).Snapshot(0),h),"backup retains pre-transfer contents");
   Check(JToken.DeepEquals(CharacterSheetStore.Load(path).Snapshot(0),migrated),"durable archive has transferred inventory");
   CharacterSheetStore.Save(path,archive);Directory.CreateDirectory(path+".pending");string original=File.ReadAllText(path);bool failed=false;try{method.Invoke(null,new object[]{path,archive});}catch(System.Reflection.TargetInvocationException){failed=true;}Check(failed&&File.ReadAllText(path)==original,"write failure preserves original archive");
  }
  finally{Directory.Delete(dir,true);}
  return n;
 }
}
