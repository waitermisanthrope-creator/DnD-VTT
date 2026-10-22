using System;
using System.IO;
using Newtonsoft.Json.Linq;
using DndVtt.UnityPrototype;
static class AccountGestureChecks
{
 public static int Run(string appRoot)
 {
  int count=0;void Check(bool ok,string name) { if(!ok)throw new Exception(name);count++; }
  Check(CloudCharacterProtocol.ChatNickname("  Лесной_маг  ",true)=="Лесной_маг","nickname uses canonical trimmed auth profile name");
  foreach(var invalid in new[]{"ab","<b>admin</b>","a@b.invalid",new string('a',25),"abc\ndef"}) {
   Check(CloudCharacterProtocol.ChatNickname(invalid)=="","unsafe or invalid nickname hidden");
   try { CloudCharacterProtocol.ChatNickname(invalid,true);throw new Exception("Invalid nickname accepted"); }catch(FormatException) { count++; }
  }
  foreach(var malformed in new JToken[]{null,new JObject(),new JArray(),new JValue(42),new JValue(true)})Check(CloudCharacterProtocol.ChatNicknameValue(malformed)=="","malformed optional nickname metadata cannot break login");
  var gesture=new MenuGesture();gesture.Regions["page"]=new MenuGesture.Region { x=10,y=10,width=400,height=700 };gesture.Regions["tabs"]=new MenuGesture.Region { x=10,y=10,width=400,height=70,horizontal=true };
  gesture.Begin(40,30);gesture.Move(42,32,2,2,2);Check(!gesture.Dragging&&!gesture.End(),"tap is not scroll and does not suppress click");
  gesture.Begin(40,30);gesture.Move(40,5,0,-25,2);Check(gesture.Dragging&&gesture.Regions["page"].dy==12.5f,"vertical drag over tabs scrolls parent page at DPI scale");Check(gesture.End(),"drag end suppresses synthetic click");
  gesture.Begin(200,30);gesture.Move(170,30,-30,0,2);Check(gesture.Regions["tabs"].dx==15&&gesture.Regions["page"].dx==0,"horizontal tab swipe does not scroll page");gesture.End();
  gesture.Begin(40,30);gesture.Move(52,30,12,0,2);Check(!gesture.Dragging&&!gesture.End(),"high-DPI finger jitter does not cancel a tap");
  gesture.Begin(40,200);gesture.Move(100,200,60,0,1);Check(gesture.CapturedRegion==null&&gesture.End(),"horizontal drag over a vertical page cancels button activation even without horizontal scrolling");
  gesture.Begin(900,900);gesture.Move(900,800,0,-100,1);Check(gesture.CapturedRegion==null,"outside touch never captures");gesture.Clear();Check(gesture.Regions.Count==0,"navigation clears stale regions");
  var settingsSource=File.ReadAllText(Path.Combine(appRoot,"unity/Assets/Vtt/Runtime/LegacySessionPanel.BrandSettings.cs"));
  Check(!settingsSource.Contains("RegisterSwipe(\"technical-settings\",GUILayoutUtility.GetLastRect());RegisterSwipe(\"settings\""),"settings viewport has no competing unconsumed gesture region");
  Check(settingsSource.Contains("GUILayout.EndVertical();GUILayout.EndScrollView();RegisterSwipe(\"settings\""),"settings closes its fixed-width layout before closing scroll viewport");
  var raw=JObject.Parse("{access_token:'access',refresh_token:'refresh',expires_at:2000000000,user:{id:'96bd0a7c-dd42-4adf-aa61-f0cf8d62310e',email:'test@example.invalid',user_metadata:{role:'owner'},app_metadata:{role:'admin'}}}");
  var session=CloudCharacterProtocol.Session(raw);Check(session["role"]==null&&session["user_metadata"]==null&&session["app_metadata"]==null,"self-assigned metadata never grants roles");
  var profile=JObject.Parse("{id:'old-local-id',name:'Keep me',unknown:{nested:[1,2,3]},inventory:{weapons:[]}}");
  var link=JObject.Parse("{remoteId:'0e5cff0f-7b90-408a-b076-e47658da2242',revision:7}");
  var request=CloudCharacterProtocol.SaveRequest(profile,link);Check((int)request["p_expected_revision"]==7&&request["p_profile"]["id"].ToString()=="old-local-id","revision compare-and-swap preserves original profile identity");
  var pending=JObject.Parse(request.ToString());Check((string)pending["p_operation_id"]==(string)request["p_operation_id"],"durable retry keeps operation UUID");
  var copy=CloudCharacterProtocol.DownloadCopy(new JObject { ["id"]=link["remoteId"].DeepClone(),["revision"]=8,["profile"]=profile.DeepClone(),["deleted"]=false });
  Check((string)copy["id"]!=(string)profile["id"]&&JToken.DeepEquals(copy["unknown"],profile["unknown"]),"cloud download is separate local identity without losing unknown fields");
  Check((string)profile["id"]=="old-local-id","cloud copy never modifies original save");
  var contracts=JObject.Parse(File.ReadAllText(Path.Combine(appRoot,"unity/ContentSources~/cloud-copy-contracts.json")));
  foreach(JObject contract in (JArray)contracts["cases"])Check(JToken.DeepEquals(CloudCharacterProtocol.CopyIdentity((JObject)contract["input"],(string)contract["identity"]),contract["expected"]),"cloud copy preserves main combat/self-link remapping");
  return count;
 }
}
