using System;
using DndVtt.UnityPrototype;
static class NumericInputChecks
{
 public static int Run(){int n=0;void Check(bool b,string s){if(!b)throw new Exception(s);n++;}
 var s=new NumericInputSession();s.Begin("a");s.Stage("a","18");Check(s.TryTake("a",out var live)&&live=="18"&&s.Owner=="a","visible IME commits only owner");s.Finish("a","19",true);s.Begin("b");Check(s.TryTake("a",out var previous)&&previous=="19","field switch retains final prior digit");s.CancelAll();s.Begin("creation:str");s.Finish("creation:str","Герой 1",true);Check(!s.TryTake("creation:str",out _),"name cannot enter numeric field");
 s.Begin("creation:str");s.Finish("creation:dex","20",true);Check(s.Owner=="creation:str","stale owner ignored");
 s.Finish("creation:str","15",true);Check(!s.TryTake("creation:dex",out _),"another stat untouched");Check(s.TryTake("creation:str",out var x)&&x=="15","number committed to original field");Check(!s.TryTake("creation:str",out _),"consume once");
 s.Begin("creation:str");s.Finish("creation:str","99",false);Check(!s.TryTake("creation:str",out _),"cancel retains old number");
 s.Begin("name");s.CancelAll();s.Finish("name","100",true);Check(!s.TryTake("name",out _),"closed step rejects late keyboard");
 s.Begin("sheet:a:hp");s.Finish("sheet:a:hp","12",true);s.CancelAll();Check(!s.TryTake("sheet:a:hp",out _),"navigation clears queued edits");
 var hero=Newtonsoft.Json.Linq.JObject.Parse("{\"id\":\"level-test\",\"level\":5,\"classes\":[{\"name\":\"Воин\",\"level\":1}],\"custom\":true}");CharacterSheetRules.SynchronizeClassLevel(hero);Check((int)hero["level"]==1&&CharacterSheetRules.Level(hero)==1&&(bool)hero["custom"],"canonical class level and unknown fields");
 foreach(var key in new[]{"a","b"}){s.Begin(key);s.Stage(key,"14");s.Finish(key,"15",true);Check(s.TryTake(key,out var final)&&final=="15","final digit survives either control order");s.CancelAll();}
 Check(!NumericInputSession.IsIntegerText("1.5")&&!NumericInputSession.IsIntegerText("")&&!NumericInputSession.IsIntegerText("999999999999"),"invalid numeric text");return n;
 }
}
