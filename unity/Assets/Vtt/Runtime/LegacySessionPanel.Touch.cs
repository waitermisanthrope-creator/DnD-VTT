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
        private bool selectingChatText;
        private readonly Dictionary<string, (string parent, Rect rect)> menuNativeControls = new Dictionary<string, (string, Rect)>();
        private void BeginSwipeFrame()
        {
            collectingSwipeRegions = Event.current.type == EventType.Repaint;
            if (collectingSwipeRegions) { drawnSwipeRegions.Clear(); menuNativeControls.Clear(); }
        }
        private void EndSwipeFrame()
        {
            if (!collectingSwipeRegions) return;
            foreach (var pair in menuNativeControls)
            {
                if (!menuGesture.Regions.TryGetValue(pair.Value.parent, out var parent)) continue;
                var rect = pair.Value.rect;
                float left = Mathf.Max(rect.xMin, parent.x), top = Mathf.Max(rect.yMin, parent.y);
                float right = Mathf.Min(rect.xMax, parent.x + parent.width), bottom = Mathf.Min(rect.yMax, parent.y + parent.height);
                if (right > left && bottom > top) RegisterMenuRegion(pair.Key, Rect.MinMaxRect(left, top, right, bottom), false, true);
            }
            foreach (string id in menuGesture.Regions.Keys.Where(id => !drawnSwipeRegions.Contains(id)).ToArray()) menuGesture.Regions.Remove(id);
        }
        private void RegisterMenuRegion(string id, Rect pixels, bool horizontal, bool nativeControl)
        {
            drawnSwipeRegions.Add(id);
            if (!menuGesture.Regions.TryGetValue(id, out var region)) menuGesture.Regions[id] = region = new MenuGesture.Region();
            region.x = pixels.x; region.y = pixels.y; region.width = pixels.width; region.height = pixels.height;
            region.horizontal = horizontal; region.nativeControl = nativeControl;
        }
        private void RegisterMenuControl(string id, string parent, Rect rect)
        {
            if (Event.current.type != EventType.Repaint) return;
            var top = GUIUtility.GUIToScreenPoint(rect.position);
            var bottom = GUIUtility.GUIToScreenPoint(rect.position + rect.size);
            menuNativeControls[id] = (parent, Rect.MinMaxRect(top.x, top.y, bottom.x, bottom.y));
        }

        private float MenuScale => (Application.isMobilePlatform || DesktopUiSmoke.PortraitLayout) && Screen.height>Screen.width ? Screen.width/440f : 1f;
        private float UiWidth => Screen.width/MenuScale;
        private float UiHeight => Screen.height/MenuScale;
        // IMGUI pointer fallback also covers devices that deliver emulated mouse
        // events when no touchscreen gesture is active.
        private bool HasMenuTouch => Touchscreen.current!=null && (Touchscreen.current.primaryTouch.press.isPressed || Touchscreen.current.primaryTouch.press.wasReleasedThisFrame || Touchscreen.current.primaryTouch.phase.ReadValue()==InputTouchPhase.Ended || Touchscreen.current.primaryTouch.phase.ReadValue()==InputTouchPhase.Canceled);
        private void UpdateMenuPointer()
        {
            if (screen == FrontScreen.Map && !panel) return;
            if(HasMenuTouch)return;
            var e=Event.current;var point=e.mousePosition;
            if (CharacterOwnsPointer(new Vector2(point.x, Screen.height - point.y))) return;
            if(e.type==EventType.MouseDown&&e.button==0) { selectingChatText=screen==FrontScreen.Chat&&chatDraftRectValid&&chatDraftRect.Contains(GUIUtility.GUIToScreenPoint(point));if(!selectingChatText)menuGesture.Begin(point.x,point.y); }
            else if(selectingChatText) { if(e.type==EventType.MouseUp)selectingChatText=false;return; }
            else if(e.type==EventType.MouseDrag&&e.button==0)menuGesture.Move(point.x,point.y,e.delta.x,e.delta.y,screen==FrontScreen.Map?1:MenuScale);
            else if(e.type==EventType.MouseUp&&e.button==0&&menuGesture.End())suppressMenuClickUntil=Time.unscaledTime+.15f;
        }
        private void Update()
        {
            UpdateDesktopWindow();
            UpdateDiceTable();
            if (screen == FrontScreen.Map && !panel) { menuGesture.Clear(); return; }
            if (UpdateCharacterStudio()) { menuGesture.Clear(); return; }
            PollNativeChatEditor();
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
            var top=GUIUtility.GUIToScreenPoint(rect.position);var bottom=GUIUtility.GUIToScreenPoint(rect.position+rect.size);
            RegisterMenuRegion(id, Rect.MinMaxRect(top.x, top.y, bottom.x, bottom.y), horizontal, false);
            // Match the native scrollbar gutter; it owns drags instead of page swipe.
            var style = horizontal ? GUI.skin.horizontalScrollbar : GUI.skin.verticalScrollbar;
            float thickness = horizontal ? style.fixedHeight + style.margin.top : style.fixedWidth + style.margin.left;
            if (thickness <= 0) return;
            var gutter = horizontal ? new Rect(rect.x, Mathf.Max(rect.y, rect.yMax-thickness), rect.width, Mathf.Min(rect.height, thickness))
                : new Rect(Mathf.Max(rect.x, rect.xMax-thickness), rect.y, Mathf.Min(rect.width, thickness), rect.height);
            RegisterMenuControl(id + "-scrollbar", id, gutter);
        }
    }
}
