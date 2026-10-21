using System;
using System.Collections.Generic;
namespace DndVtt.UnityPrototype
{
    // Device-independent gesture arbitration: taps remain taps; drag chooses
    // the smallest registered viewport on its dominant axis.
    public sealed class MenuGesture
    {
        public sealed class Region { public float x,y,width,height,dx,dy; public bool horizontal; public bool Contains(float px,float py)=>px>=x&&py>=y&&px<x+width&&py<y+height; }
        public readonly Dictionary<string,Region> Regions = new Dictionary<string,Region>();
        private float startX,startY; private string captured; private bool moved; public bool Dragging => moved; public string CapturedRegion => captured;
        public void Begin(float x,float y) { startX=x;startY=y;captured=null;moved=false; }
        public void Move(float x,float y,float dx,float dy,float scale)
        {
            if (captured == null)
            {
                float sx=x-startX,sy=y-startY,threshold=10*Math.Max(.1f,scale); if(sx*sx+sy*sy<threshold*threshold) return; moved=true;
                bool horizontal=Math.Abs(sx)>Math.Abs(sy); float smallest=float.MaxValue;
                foreach(var pair in Regions) { var r=pair.Value; if(r.horizontal==horizontal&&r.Contains(startX,startY)&&r.width*r.height<smallest) { captured=pair.Key;smallest=r.width*r.height; } }
            }
            if(captured!=null&&Regions.TryGetValue(captured,out var region)) { if(region.horizontal) region.dx-=dx/Math.Max(.1f,scale); else region.dy-=dy/Math.Max(.1f,scale); }
        }
        public bool End() { bool dragged=Dragging;captured=null;moved=false;return dragged; }
        public void Clear() { Regions.Clear();captured=null;moved=false; }
    }
}
