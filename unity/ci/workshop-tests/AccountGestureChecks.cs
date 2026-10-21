using System;
using Newtonsoft.Json.Linq;
using DndVtt.UnityPrototype;
static class AccountGestureChecks
{
 public static int Run()
 {
  int count=0;void Check(bool ok,string name) { if(!ok)throw new Exception(name);count++; }
  var gesture=new MenuGesture();gesture.Regions["page"]=new MenuGesture.Region { x=10,y=10,width=400,height=700 };gesture.Regions["tabs"]=new MenuGesture.Region { x=10,y=10,width=400,height=70,horizontal=true };
  gesture.Begin(40,30);gesture.Move(42,32,2,2,2);Check(!gesture.Dragging&&!gesture.End(),"tap is not scroll and does not suppress click");
  gesture.Begin(40,30);gesture.Move(40,5,0,-25,2);Check(gesture.Dragging&&gesture.Regions["page"].dy==12.5f,"vertical drag over tabs scrolls parent page at DPI scale");Check(gesture.End(),"drag end suppresses synthetic click");
  gesture.Begin(200,30);gesture.Move(170,30,-30,0,2);Check(gesture.Regions["tabs"].dx==15&&gesture.Regions["page"].dx==0,"horizontal tab swipe does not scroll page");gesture.End();
  gesture.Begin(900,900);gesture.Move(900,800,0,-100,1);Check(!gesture.Dragging,"outside touch never captures");gesture.Clear();Check(gesture.Regions.Count==0,"navigation clears stale regions");
  var raw=JObject.Parse("{access_token:'access',refresh_token:'refresh',expires_at:2000000000,user:{id:'96bd0a7c-dd42-4adf-aa61-f0cf8d62310e',email:'test@example.invalid',user_metadata:{role:'owner'},app_metadata:{role:'admin'}}}");
  var session=CloudCharacterProtocol.Session(raw);Check(session["role"]==null&&session["user_metadata"]==null&&session["app_metadata"]==null,"self-assigned metadata never grants roles");
  var profile=JObject.Parse("{id:'old-local-id',name:'Keep me',unknown:{nested:[1,2,3]},inventory:{weapons:[]}}");
  var link=JObject.Parse("{remoteId:'0e5cff0f-7b90-408a-b076-e47658da2242',revision:7}");
  var request=CloudCharacterProtocol.SaveRequest(profile,link);Check((int)request["p_expected_revision"]==7&&request["p_profile"]["id"].ToString()=="old-local-id","revision compare-and-swap preserves original profile identity");
  var pending=JObject.Parse(request.ToString());Check((string)pending["p_operation_id"]==(string)request["p_operation_id"],"durable retry keeps operation UUID");
  var copy=CloudCharacterProtocol.DownloadCopy(new JObject { ["id"]=link["remoteId"].DeepClone(),["revision"]=8,["profile"]=profile.DeepClone(),["deleted"]=false });
  Check((string)copy["id"]!=(string)profile["id"]&&JToken.DeepEquals(copy["unknown"],profile["unknown"]),"cloud download is separate local identity without losing unknown fields");
  Check((string)profile["id"]=="old-local-id","cloud copy never modifies original save");
  return count;
 }
}
