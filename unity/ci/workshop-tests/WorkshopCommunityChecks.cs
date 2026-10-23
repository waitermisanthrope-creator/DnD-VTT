using System;
using System.Linq;
using Newtonsoft.Json.Linq;
using DndVtt.UnityPrototype;
internal static class WorkshopCommunityChecks
{
    public static int Run()
    {
        int checks=0;void Check(bool value,string name) {if(!value)throw new Exception(name);checks++;}
        void Reject(Action action) {bool rejected=false;try {action();}catch(Exception) {rejected=true;}Check(rejected,"bad community snapshot rejected");}
        var c=new WorkshopCommunity();Check(!c.Ready&&!c.Hearted("a"),"no invented favorites before server");
        c.Replace(JArray.Parse("[{id:'a',rating:4,hearted:true},{id:'b',rating:2,hearted:false}]"));
        Check(c.Ready&&c.Known("a")&&c.Rating("a")==4&&c.Hearted("a"),"server snapshot applied");
        c.Apply(JObject.Parse("{id:'a',rating:3,hearted:false}"));Check(!c.Hearted("a")&&c.Rating("a")==3,"second press server result removes favorite and total");
        c.Apply(JObject.Parse("{id:'a',rating:3,hearted:false}"));Check(c.Rating("a")==3,"duplicate response does not decrement again");
        Reject(()=>c.Apply(JObject.Parse("{id:'a',rating:-1,hearted:false}")));Reject(()=>c.Apply(JObject.Parse("{id:'a',rating:0,hearted:true}")));Reject(()=>c.Apply(JObject.Parse("{id:'a',rating:3,hearted:'yes'}")));
        Reject(()=>c.Replace(JArray.Parse("[{id:'a',rating:8,hearted:true},{id:'a',rating:8,hearted:true}]")));
        Check(c.Rating("a")==3,"invalid snapshot leaves prior snapshot intact");
        var a=JObject.Parse("{id:'a',publishedAt:'2026-10-20T10:00:00Z',updatedAt:'2026-10-23T10:00:00Z'}");
        var b=JObject.Parse("{id:'b',publishedAt:'2026-10-22T10:00:00Z'}");var old=JObject.Parse("{id:'old'}");
        Check(c.Order(new[]{b,old,a},false).Select(m=>(string)m["id"]).SequenceEqual(new[]{"a","b","old"}),"updates and new releases ahead of undated legacy");
        c.Apply(JObject.Parse("{id:'b',rating:7,hearted:true}"));Check((string)c.Order(new[]{a,b},true).First()["id"]=="b","rating sorts by total hearts");
        Check(c.Order(new[]{a,b},false).Where(m=>c.Hearted((string)m["id"])).Count()==1,"favorites contain only own server flags");
        c.Invalidate();Check(!c.Ready&&!c.Known("a")&&!c.Hearted("b"),"uncertain write blocks stale toggles/favorites");
        c.Clear();Check(!c.Ready&&c.Rating("a")==0,"logout clears account-specific state");
        Check(WorkshopCommunity.Updated(JObject.Parse("{updatedAt:'oops',publishedAt:'2026-01-01T00:00:00Z'}")).Year==2026,"bad updated timestamp falls back to publication");
        Check((string)c.Order(new[]{old,JObject.Parse("{id:'legacy'}")},false).First()["id"]=="old","legacy exact ties keep stable catalog order");
        return checks;
    }
}
