using System;
using DndVtt.UnityPrototype;
static class SheetSwipeChecks
{
 public static int Run()
 {
  int n=0;void Check(bool ok,string label){if(!ok)throw new Exception(label);n++;}
  var type=typeof(MenuGesture).Assembly.GetType("DndVtt.UnityPrototype.SheetSwipeMotion");Check(type!=null,"sheet page swipe must snap through the existing navigation");
  dynamic swipe=Activator.CreateInstance(type);
  foreach(int direction in new[]{-1,1})
  {
   swipe.Drag(direction*100f,440f,true,true);swipe.Release(false);int step=0;
   for(int i=0;i<90;i++){int next=swipe.Tick(1f/60);if(next!=0){Check(step==0,"one page per gesture");step=next;swipe.Commit();}}
   Check(step==-direction&&Math.Abs((float)swipe.Offset)<.01f,"both directions snap to a complete page");
  }
  swipe.Drag(20f,440f,true,true);swipe.Release(false);for(int i=0;i<90;i++)Check(swipe.Tick(1f/60)==0,"short gesture stays on page");Check((float)swipe.Offset==0,"short gesture snaps back exactly");
  swipe.Drag(100f,440f,false,true);swipe.Release(false);for(int i=0;i<90;i++)Check(swipe.Tick(1f/60)==0,"first page clamps previous gesture");
  swipe.Drag(-100f,440f,true,true);swipe.Cancel();Check((float)swipe.Offset==0&&swipe.Tick(1)==0,"pause cancels transition without stale navigation");
  var gesture=new MenuGesture();gesture.Regions["front"]=new MenuGesture.Region{x=0,y=50,width=440,height=800};gesture.Regions["sheet-page"]=new MenuGesture.Region{x=0,y=50,width=440,height=800,horizontal=true};gesture.Regions["inventory-tabs"]=new MenuGesture.Region{x=0,y=200,width=440,height=40,horizontal=true};
  gesture.Begin(200,400);gesture.Move(100,402,-100,2,1);Check(gesture.CapturedRegion=="sheet-page","dominant horizontal body gesture pages");gesture.End();
  gesture.Begin(200,400);gesture.Move(202,300,2,-100,1);Check(gesture.CapturedRegion=="front","vertical body gesture scrolls");gesture.End();
  gesture.Begin(200,220);gesture.Move(100,220,-100,0,1);Check(gesture.CapturedRegion=="inventory-tabs","nested category list owns horizontal drag");gesture.End();
  gesture.Regions["input"]=new MenuGesture.Region{x=20,y=300,width=200,height=45,nativeControl=true};gesture.Begin(40,320);gesture.Move(160,320,120,0,1);Check(!gesture.Dragging&&gesture.CapturedRegion==null,"text caret/selection owns gesture");gesture.Clear();
  return n;
 }
}
