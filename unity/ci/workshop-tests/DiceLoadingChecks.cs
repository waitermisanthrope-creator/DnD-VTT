using System;
using Newtonsoft.Json.Linq;
using DndVtt.UnityPrototype;
static class DiceLoadingChecks
{
 public static int Run()
 {
  var type=typeof(DiceTheme).Assembly.GetType("DndVtt.UnityPrototype.DiceAppearanceCatalog");if(type==null)throw new Exception("dice appearance discovery must be reusable off the GUI thread");
  int reads=0;var load=type.GetMethod("Load");dynamic result=load.Invoke(null,new object[]{new JArray(new JObject{["id"]="item.test",["type"]="item"}), (Func<JObject,JObject>)(m=>{reads++;throw new Exception("must skip unrelated packages");})});
  if(reads!=0||result.Themes.Length!=0||result.Trays.Length!=0)throw new Exception("dice discovery must not read unrelated item/model payloads");
  return 2;
 }
}
