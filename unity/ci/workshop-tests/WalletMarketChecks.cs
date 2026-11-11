using System;
using System.IO;
using System.Linq;
using Newtonsoft.Json.Linq;
using DndVtt.UnityPrototype;
static class WalletMarketChecks
{
 public static int Run(string root)
 {
  int checks=0;void Check(bool value,string name){if(!value)throw new Exception(name);checks++;}
  var trade=typeof(CommerceRules).GetMethod("MarketTrade");
  Check(trade!=null,"inventory market must be available again");
  Check(trade.GetParameters().Length==11,"market settlement must respect wallet coin visibility");
  var catalog=JObject.Parse(File.ReadAllText(Path.Combine(root,"unity/Assets/Vtt/Resources/CharacterSheet/market.json")));
  var row=((JArray)catalog["traders"]["village"]["stock"]).OfType<JObject>().First();
  long quote=(long)typeof(CommerceRules).GetMethod("MarketQuote").Invoke(null,new object[]{catalog,"village",row,"buy","forest"});
  JObject Buy(bool pp,bool ep){return (JObject)trade.Invoke(null,new object[]{catalog,new JArray(),new JObject{["coins"]=new JObject{["cp"]=quote+75}},new JObject(),"village","buy",new JObject{["itemId"]=row["id"]},1L,new JArray(),pp,ep});}
  var disabled=Buy(true,false);Check((long)disabled["hero"]["coins"]["ep"]==0,"disabled electrum is not minted as market change");
  Check(CharacterSheetRules.CoinTotal((JObject)disabled["hero"]["coins"],null)==75,"disabled denominations preserve exact wallet value");
  var enabled=Buy(true,true);Check((long)enabled["hero"]["coins"]["ep"]==1,"players can opt into electrum change");
  Check(CharacterSheetRules.CoinTotal((JObject)enabled["hero"]["coins"],null)==75,"enabled electrum preserves exact wallet value");
  var h=new JObject{["coins"]=new JObject{["ep"]=1}};CharacterSheetRules.ApplyCoinOperation(h,new JObject{["cp"]=25,["ep"]=100},"add",null,true,false,"test");
  Check((long)h["coins"]["ep"]==0&&CharacterSheetRules.CoinTotal((JObject)h["coins"],null)==75,"hidden operation input ignored and preexisting electrum value retained");
  var definitions=new JArray(new JObject{["name"]="Кинжал",["id"]="one",["inventoryCategory"]="weapons"},new JObject{["name"]="Зелье",["id"]="two",["inventoryCategory"]="consumables"});
  var index=CommerceRules.IndexMarketDefinitions(definitions);
  foreach(string name in new[]{"КИНЖАЛ","Зелье","Неизвестное","Противоядие"})
  {var item=new JObject{["name"]=name,["category"]="junk"};Check(JToken.DeepEquals(CommerceRules.MarketResolve(definitions,item),CommerceRules.MarketResolve(definitions,item,index)),"indexed market resolution preserves original properties and fallback");}
  definitions.Add(new JObject{["name"]="Кинжал",["inventoryCategory"]="weapons"});index=CommerceRules.IndexMarketDefinitions(definitions);
  Check((string)CommerceRules.MarketResolve(definitions,new JObject{["name"]="Кинжал"},index)["marketFunctionalStatus"]=="data_only","ambiguous mod definitions remain data-only");
  return checks;
 }
}
