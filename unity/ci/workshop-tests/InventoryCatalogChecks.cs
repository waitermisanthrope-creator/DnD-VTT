using System;
using System.Diagnostics;
using System.Linq;
using System.Threading;
using Newtonsoft.Json.Linq;
using DndVtt.UnityPrototype;
static class InventoryCatalogChecks
{
 public static int Run()
 {
  int count=0;void Check(bool ok,string message){if(!ok)throw new Exception(message);count++;}
  var type=typeof(CharacterSheetRules).Assembly.GetType("DndVtt.UnityPrototype.InventoryCatalogCache");
  Check(type!=null,"inventory catalog must cache searches and load off the GUI thread");
  var items=new JArray();for(int i=0;i<10000;i++)items.Add(new JObject{["name"]="Предмет "+i,["description"]=i==9995?"Редкая игла":"Описание предмета",["inventoryCategory"]=CharacterSheetRules.InventoryCategories[i%5],["unknown"]=i});
  var catalog=new JObject{["items"]=items};string original=catalog.ToString();
  var snapshot=Activator.CreateInstance(type.GetNestedType("Snapshot"),catalog);
  var find=(Func<string,string,JObject[]>)Delegate.CreateDelegate(typeof(Func<string,string,JObject[]>),snapshot,snapshot.GetType().GetMethod("Find"));
  foreach(string category in CharacterSheetRules.InventoryCategories)
   foreach(string query in new[]{"","ПРЕДМЕТ","999","редкая","нет совпадений"," "})
   {
    var expected=items.OfType<JObject>().Where(x=>(string)x["inventoryCategory"]==category&&(x["name"]+" "+x["description"]).IndexOf(query,StringComparison.OrdinalIgnoreCase)>=0).Take(25).ToArray();
    var actual=find(category,query);Check(actual.SequenceEqual(expected),"same items, search semantics and original order");Check(ReferenceEquals(actual,find(category,query)),"unchanged query reuses result array");
   }
  var first=find("weapons","");long before=GC.GetAllocatedBytesForCurrentThread();var timer=Stopwatch.StartNew();
  for(int i=0;i<10000;i++)find("weapons","");
  timer.Stop();long cachedBytes=GC.GetAllocatedBytesForCurrentThread()-before;
  Check(cachedBytes<1024,"ten thousand warm searches allocate less than 1KiB");
  Console.WriteLine("INVENTORY_CATALOG_WARM: 10000 calls, "+timer.Elapsed.TotalMilliseconds.ToString("F2")+"ms, "+cachedBytes+" bytes");
  var hero=new JObject();CommerceRules.AddItem(hero,first[0]);Check(catalog.ToString()==original,"adding an item leaves cached definitions intact");
  dynamic cache=Activator.CreateInstance(type);int guiThread=Thread.CurrentThread.ManagedThreadId,readThread=guiThread;
  using(var started=new ManualResetEventSlim())using(var release=new ManualResetEventSlim())
  {
   cache.Request((Func<JObject>)(()=>{readThread=Thread.CurrentThread.ManagedThreadId;started.Set();release.Wait();return catalog;}));
   Check(started.Wait(3000)&&readThread!=guiThread&&cache.IsLoading,"disk loader runs off caller thread without blocking");
   cache.Invalidate();release.Set();Check(SpinWait.SpinUntil(()=>{cache.Poll();return !cache.IsLoading;},5000),"background request completes");
   Check(cache.Current==null,"invalidated package snapshot is never published");
  }
  var updated=new JObject{["items"]=new JArray(new JObject{["name"]="Новое",["inventoryCategory"]="weapons"})};
  cache.Request((Func<JObject>)(()=>updated));Check(SpinWait.SpinUntil(()=>{cache.Poll();return !cache.IsLoading;},5000),"replacement loads");
  Check((string)cache.Current.Find("weapons","")[0]["name"]=="Новое","mod changes replace old search results");
  cache.Invalidate();cache.Request((Func<JObject>)(()=>throw new System.IO.IOException("test")));
  Check(SpinWait.SpinUntil(()=>{cache.Poll();return !cache.IsLoading;},5000)&&cache.Error=="test"&&cache.Current==null,"load error is observable without breaking GUI");
  return count;
 }
}
