using System;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using Newtonsoft.Json.Linq;
using DndVtt.UnityPrototype;
static class MarketChecks
{
 static int n;
 static void Check(bool ok,string message){if(!ok)throw new Exception(message);n++;}
 static void Reject(Action action,string message){bool rejected=false;try{action();}catch{rejected=true;}Check(rejected,message);}
 public static int Run(string root)
 {
  n=0;string dir=Path.Combine(Path.GetTempPath(),"vtt-market-"+Guid.NewGuid().ToString("N"));Directory.CreateDirectory(dir);
  try
  {
   string path=Path.Combine(dir,"heroes.json"),settings=path+".settings.json";
   var before=new LegacyCharacterArchive("{characters:[{id:'a',name:'First',coins:{gp:20},unknown:17},{id:'b',future:18}],wrapper:19}");
   CharacterSheetStore.Save(path,before);var prefs=ClientPreferences.Parse("{version:1,future:17,dnd_custom_races:[]}");prefs.Save(settings);
   string oldProfile=File.ReadAllText(path),oldPrefs=File.ReadAllText(settings);
   var after=before.DetachedCopy();var hero=after.Snapshot(0);hero["coins"]["gp"]=19;after.Replace(0,hero);
   var afterPrefs=prefs.WithMarketState(JObject.Parse("{region:'forest',traders:{village:{stock:[{id:'market_rations',qty:19}],lastRestock:17}},future:18}"));
   using(var lease=new FileStream(path+".write-lock",FileMode.OpenOrCreate,FileAccess.ReadWrite,FileShare.None))
   {
    Reject(()=>CharacterSheetStore.SaveTrade(path,after,settings,afterPrefs,oldProfile,oldPrefs),"concurrent paired writer rejected");
    Reject(()=>CharacterSheetStore.Save(path,after),"ordinary profile write shares trade lease");
   }
   using(var lease=new FileStream(settings+".write-lock",FileMode.OpenOrCreate,FileAccess.ReadWrite,FileShare.None))
    Reject(()=>afterPrefs.Save(settings),"ordinary preferences write shares trade lease");
   CharacterSheetStore.SaveTrade(path,after,settings,afterPrefs,oldProfile,oldPrefs);
   Check((int)CharacterSheetStore.Load(path).Snapshot(0)["coins"]["gp"]==19,"paired profile commit");
   Check((int)ClientPreferences.Load(settings).MarketState["traders"]["village"]["stock"][0]["qty"]==19,"global stock committed");
   Check(File.ReadAllText(path+".bak")==oldProfile&&File.ReadAllText(settings+".bak")==oldPrefs,"paired previous backups");
   Check((int)CharacterSheetStore.Load(path).Snapshot(1)["future"]==18&&(int)JObject.Parse(CharacterSheetStore.Load(path).Export())["wrapper"]==19,"other hero and wrapper");
   Reject(()=>CharacterSheetStore.SaveTrade(path,after,settings,afterPrefs,oldProfile,oldPrefs),"repeated/stale commit rejected");
   string committed=File.ReadAllText(path),committedPrefs=File.ReadAllText(settings),oldBackup=File.ReadAllText(path+".bak");
   // A real second replace failure, after first profile replace, must roll back.
   File.Delete(settings+".bak");Directory.CreateDirectory(settings+".bak");
   var changed=after.DetachedCopy();hero=changed.Snapshot(0);hero["coins"]["gp"]=18;changed.Replace(0,hero);
   var newerPrefs=afterPrefs.WithMarketState(JObject.Parse("{region:'coast',traders:{}}"));
   Reject(()=>CharacterSheetStore.SaveTrade(path,changed,settings,newerPrefs,committed,committedPrefs),"second-file failure rejected");
   Check(File.ReadAllText(path)==committed&&File.ReadAllText(settings)==committedPrefs,"failure restores both files");
   Check(File.ReadAllText(path+".bak")==oldBackup&&!File.Exists(path+".trade-journal"),"rollback preserves prior backup and clears resolved journal");
   Directory.Delete(settings+".bak");
   // Model a crash after the first durable replacement, before preferences replace.
   var journal=new JObject{["schema"]=1,["beforeCharacters"]=committed,["afterCharacters"]=changed.Export(),["beforePreferences"]=committedPrefs,["afterPreferences"]=newerPrefs.Export()};
   File.WriteAllText(path+".trade-journal",journal.ToString());File.WriteAllText(path,changed.Export());
   Reject(()=>CharacterSheetStore.Save(path,after),"pending trade blocks ordinary profile writes");
   CharacterSheetStore.RecoverTrade(path,settings);
   Check(File.ReadAllText(path)==changed.Export()&&File.ReadAllText(settings)==newerPrefs.Export()&&!File.Exists(path+".trade-journal"),"crash rolls both files forward once");
   File.WriteAllText(path+".trade-journal",journal.ToString());File.WriteAllText(settings,"{version:1,external:17}");string external=File.ReadAllText(settings);
   Reject(()=>CharacterSheetStore.RecoverTrade(path,settings),"unknown concurrent file change blocks recovery");Check(File.ReadAllText(settings)==external,"conflict preserves external data");
   Check((int)afterPrefs.WithDefaults("").MarketState["future"]==18,"settings reset retains global market state");
  }
  finally{Directory.Delete(dir,true);}
  var catalog=JObject.Parse(File.ReadAllText(Path.Combine(root,"unity/Assets/Vtt/Resources/CharacterSheet/market.json")));
  Check(((JObject)catalog["traders"]).Count==42&&((JObject)catalog["traders"]).Properties().Sum(p=>((JArray)p.Value["stock"]).Count)==320,"all source trader stock exported");
  foreach(JObject source in catalog["sources"]){using var sha=SHA256.Create();Check(Convert.ToHexString(sha.ComputeHash(System.Text.Encoding.UTF8.GetBytes(File.ReadAllText(Path.Combine(root,(string)source["file"])).Replace("\r\n","\n")))).ToLowerInvariant()==(string)source["sha256"],"source hash "+source["file"]);}
  var quotes=JObject.Parse(File.ReadAllText(Path.Combine(root,"unity/ContentSources~/workshop-commerce/market-contracts.json")));
  foreach(JObject vector in quotes["cases"])Check(CommerceRules.MarketQuote(catalog,(string)vector["trader"],(JObject)vector["item"],(string)vector["mode"],(string)vector["region"])==(long)vector["cp"],"JS golden quote "+vector["trader"]+"/"+vector["region"]+"/"+vector["mode"]);
  Check(CommerceRules.MarketQuote(catalog,"village",JObject.Parse("{name:'Факел',costGp:0.01,tags:['common']}"),"buy","forest")==1,"catalog price wins over source1gp fallback bug");
  var definitions=new JArray(JObject.Parse("{id:'dnd.items.dagger',name:'Кинжал',inventoryCategory:'weapons',cost:'2 зм',damage:'1d4',future:17}"),JObject.Parse("{id:'dnd.items.potion',name:'Зелье лечения',inventoryCategory:'consumables',effect:'2d4+2',cost:'50 зм'}"));
  var h=JObject.Parse("{id:'buyer',coins:{gp:1000,unknown:17},inventory:{weapons:[],armor:[],consumables:[],materials:[],junk:[]},unknown:{keep:17},resources:{keep:18},classFeaturesState:{keep:19},tokenArt:{keep:20}}");var state=JObject.Parse("{region:'forest',future:17}");string hBefore=h.ToString(),stateBefore=state.ToString();
  var buy=CommerceRules.MarketTrade(catalog,definitions,h,state,"blacksmith","buy",new JObject{["itemId"]="market_dagger"},1,new JArray());var bought=(JObject)buy["hero"];var stock=(JObject)buy["state"];
  Check(h.ToString()==hBefore&&state.ToString()==stateBefore,"preview/cancel leaves hero and global state untouched");
  Check((string)bought["inventory"]["weapons"][0]["damage"]=="1d4"&&(string)bought["inventory"]["weapons"][0]["marketFunctionalStatus"]=="functional","purchase retains installed functional weapon");
  Check(CharacterSheetRules.CoinTotal((JObject)bought["coins"],null)==99758,"regional purchase exact coin settlement");
  Check((int)CommerceRules.MarketStock(catalog,stock,"blacksmith").First(x=>(string)x["id"]=="market_dagger")["qty"]==2&&(int)stock["future"]==17,"global stock decrement preserves future fields");
  foreach(string key in new[]{"unknown","resources","classFeaturesState","tokenArt"})Check(JToken.DeepEquals(h[key],bought[key]),"trade preserves "+key);
  Check((int)bought["coins"]["unknown"]==17,"trade preserves unknown currency fields");
  var target=new JObject{["category"]="weapons",["index"]=0,["signature"]=bought["inventory"]["weapons"][0].ToString(Newtonsoft.Json.Formatting.None)};
  var sale=CommerceRules.MarketTrade(catalog,definitions,bought,stock,"blacksmith","sell",target,1,new JArray());Check(((JArray)sale["hero"]["inventory"]["weapons"]).Count==0,"sale removes exact selected record");
  Reject(()=>CommerceRules.MarketTrade(catalog,definitions,bought,stock,"apothecary","sell",target,1,new JArray()),"wrong trader rejects weapon");
  Reject(()=>CommerceRules.MarketTrade(catalog,definitions,bought,stock,"blacksmith","buy",new JObject{["itemId"]="market_dagger"},3,new JArray()),"stock insufficiency rejected");
  var poor=(JObject)h.DeepClone();poor["coins"]=new JObject();string poorBefore=poor.ToString();Reject(()=>CommerceRules.MarketTrade(catalog,definitions,poor,state,"blacksmith","buy",new JObject{["itemId"]="market_dagger"},1,new JArray()),"poor buyer rejected");Check(poor.ToString()==poorBefore,"failed buy no partial item or stock");
  var offerHero=(JObject)h.DeepClone();offerHero["inventory"]["materials"]=JArray.Parse("[{id:'herbs',name:'Пучок лечебных трав',costGp:3,count:17,tags:['herbalism'],future:17}]");
  var offer=new JObject{["category"]="materials",["index"]=0,["count"]=17,["signature"]=offerHero["inventory"]["materials"][0].ToString(Newtonsoft.Json.Formatting.None)};var offers=new JArray(offer);
  var barter=CommerceRules.MarketTrade(catalog,definitions,offerHero,state,"apothecary","barter",new JObject{["itemId"]="market_healing"},1,offers);
  Check(((JArray)barter["hero"]["inventory"]["materials"]).Count==0&&(string)barter["hero"]["inventory"]["consumables"][0]["effect"]=="2d4+2","barter removes offers and adds functional potion");
  Check(JToken.DeepEquals(barter["hero"]["coins"],offerHero["coins"]),"barter never touches coins");
  Reject(()=>CommerceRules.MarketTrade(catalog,definitions,offerHero,state,"apothecary","barter",new JObject{["itemId"]="market_healing"},1,new JArray(offer.DeepClone(),offer.DeepClone())),"duplicate barter references rejected");
  var stale=(JObject)offer.DeepClone();stale["signature"]="changed";Reject(()=>CommerceRules.MarketTrade(catalog,definitions,offerHero,state,"apothecary","barter",new JObject{["itemId"]="market_healing"},1,new JArray(stale)),"stale barter item rejected");
  var small=(JObject)offer.DeepClone();small["count"]=1;Reject(()=>CommerceRules.MarketTrade(catalog,definitions,offerHero,state,"apothecary","barter",new JObject{["itemId"]="market_healing"},1,new JArray(small)),"under-value barter rejected");
  Check((string)CommerceRules.MarketResolve(definitions,JObject.Parse("{name:'Unknown generic object',category:'gear',costGp:1}"))["marketFunctionalStatus"]=="data_only","missing mod definition explicitly data-only");
  var enhanced=(JObject)barter["hero"].DeepClone();enhanced["inventory"]["consumables"][0]["potency"]=90;
  var second=CommerceRules.MarketTrade(catalog,definitions,enhanced,(JObject)barter["state"],"apothecary","buy",new JObject{["itemId"]="market_healing"},1,new JArray());
  Check(((JArray)second["hero"]["inventory"]["consumables"]).Count==2,"purchased ordinary item cannot duplicate enhanced variant");
  Check((int)second["hero"]["inventory"]["consumables"][0]["potency"]==90&&(int)second["hero"]["inventory"]["consumables"][0]["count"]==1,"existing variant remains unchanged");
  return n;
 }
}
