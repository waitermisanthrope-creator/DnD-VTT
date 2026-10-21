using UnityEngine;
using UnityEngine.InputSystem;
using InputTouchPhase = UnityEngine.InputSystem.TouchPhase;
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
        // IMGUI pointer fallback also covers devices that deliver emulated mouse
        // events when no touchscreen gesture is active.
        private bool HasMenuTouch => Touchscreen.current!=null && (Touchscreen.current.primaryTouch.press.isPressed || Touchscreen.current.primaryTouch.press.wasReleasedThisFrame || Touchscreen.current.primaryTouch.phase.ReadValue()==InputTouchPhase.Ended || Touchscreen.current.primaryTouch.phase.ReadValue()==InputTouchPhase.Canceled);
        private void UpdateMenuPointer()
        {
            if(HasMenuTouch)return;
            var e=Event.current;var point=e.mousePosition;
            if(e.type==EventType.MouseDown&&e.button==0)menuGesture.Begin(point.x,point.y);
            else if(e.type==EventType.MouseDrag&&e.button==0)menuGesture.Move(point.x,point.y,e.delta.x,e.delta.y,screen==FrontScreen.Map?1:MenuScale);
            else if(e.type==EventType.MouseUp&&e.button==0&&menuGesture.End())suppressMenuClickUntil=Time.unscaledTime+.15f;
        }
        private void Update()
        {
            var device=Touchscreen.current;if(device==null||!HasMenuTouch)return;
            if(device.touches.Count(t=>t.press.isPressed)>1) { if(menuGesture.End())suppressMenuClickUntil=Time.unscaledTime+.15f;return; }
            var touch=device.primaryTouch;var position=touch.position.ReadValue();var delta=touch.delta.ReadValue();var phase=touch.phase.ReadValue();
            float x=position.x,y=Screen.height-position.y;
            if(phase==InputTouchPhase.Began||touch.press.wasPressedThisFrame)menuGesture.Begin(x,y);
            else if(phase==InputTouchPhase.Moved)menuGesture.Move(x,y,delta.x,-delta.y,screen==FrontScreen.Map?1:MenuScale);
            else if(phase==InputTouchPhase.Ended||phase==InputTouchPhase.Canceled||touch.press.wasReleasedThisFrame) { if(menuGesture.End())suppressMenuClickUntil=Time.unscaledTime+.15f; }
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
