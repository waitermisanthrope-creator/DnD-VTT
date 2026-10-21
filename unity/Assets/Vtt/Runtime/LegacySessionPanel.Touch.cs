using UnityEngine;
using System.Collections.Generic;
using System.Linq;
namespace DndVtt.UnityPrototype
{
    public sealed partial class LegacySessionPanel
    {
        private readonly MenuGesture menuGesture=new MenuGesture();
        private float suppressMenuClickUntil;
        private readonly HashSet<string> drawnSwipeRegions=new HashSet<string>();
        private bool collectingSwipeRegions;
        private void BeginSwipeFrame() { collectingSwipeRegions=Event.current.type==EventType.Repaint;if(collectingSwipeRegions)drawnSwipeRegions.Clear(); }
        private void EndSwipeFrame() { if(collectingSwipeRegions)foreach(string id in menuGesture.Regions.Keys.Where(id=>!drawnSwipeRegions.Contains(id)).ToArray())menuGesture.Regions.Remove(id); }

        private float MenuScale => Application.isMobilePlatform && Screen.height>Screen.width ? Screen.width/440f : 1f;
        private float UiWidth => Screen.width/MenuScale;
        private float UiHeight => Screen.height/MenuScale;
        private void Update()
        {
            if(Input.touchCount!=1) { if(menuGesture.End()) suppressMenuClickUntil=Time.unscaledTime+.15f;return; }
            var touch=Input.GetTouch(0); float x=touch.position.x,y=Screen.height-touch.position.y;
            if(touch.phase==TouchPhase.Began) menuGesture.Begin(x,y);
            else if(touch.phase==TouchPhase.Moved) menuGesture.Move(x,y,touch.deltaPosition.x,-touch.deltaPosition.y,screen==FrontScreen.Map?1:MenuScale);
            else if(touch.phase==TouchPhase.Ended||touch.phase==TouchPhase.Canceled) { if(menuGesture.End()) suppressMenuClickUntil=Time.unscaledTime+.15f; }
        }
        private Vector2 SwipePosition(string id,Vector2 position)
        {
            if(menuGesture.Regions.TryGetValue(id,out var region)) { position+=new Vector2(region.dx,region.dy);region.dx=region.dy=0; }
            return new Vector2(Mathf.Max(0,position.x),Mathf.Max(0,position.y));
        }
        private void RegisterSwipe(string id,Rect rect,bool horizontal=false)
        {
            if(Event.current.type!=EventType.Repaint)return;
            drawnSwipeRegions.Add(id);
            var top=GUIUtility.GUIToScreenPoint(rect.position);var bottom=GUIUtility.GUIToScreenPoint(rect.position+rect.size);
            if(!menuGesture.Regions.TryGetValue(id,out var region)) menuGesture.Regions[id]=region=new MenuGesture.Region();
            region.x=top.x;region.y=top.y;region.width=bottom.x-top.x;region.height=bottom.y-top.y;region.horizontal=horizontal;
        }
    }
}
