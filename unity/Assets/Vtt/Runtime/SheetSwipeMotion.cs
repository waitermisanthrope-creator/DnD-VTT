using System;
namespace DndVtt.UnityPrototype
{
    // Animation only. The selected page remains owned by requestedSheetTab.
    public sealed class SheetSwipeMotion
    {
        private int phase,step;private float width=440,from,target,elapsed;private bool previous,next;
        public float Offset {get;private set;}
        public bool Waiting=>phase==2;
        public bool Busy=>phase!=0;
        public void Drag(float delta,float viewport,bool canPrevious,bool canNext)
        {
            if(phase!=0)return;width=Math.Max(1,viewport);previous=canPrevious;next=canNext;
            float value=Offset+delta;if(value>0&&!previous||value<0&&!next)value=Offset+delta*.22f;
            Offset=Math.Max(-width*.85f,Math.Min(width*.85f,value));
        }
        public void Release(bool cancelled)
        {
            if(phase!=0)return;
            step=!cancelled&&Math.Abs(Offset)>=40?(Offset<0&&next?1:Offset>0&&previous?-1:0):0;
            from=Offset;target=step==0?0:-step*width;elapsed=0;phase=1;
        }
        public int Tick(float delta)
        {
            if(phase==0||phase==2)return 0;
            elapsed+=Math.Max(0,delta);float t=Math.Min(1,elapsed/.13f),ease=1-(1-t)*(1-t)*(1-t);
            Offset=from+(target-from)*ease;
            if(t<1)return 0;Offset=target;
            if(phase==1&&step!=0){phase=2;return step;}
            phase=0;Offset=0;return 0;
        }
        public void Commit(){if(phase!=2){Cancel();return;}from=Offset=-target;target=0;elapsed=0;phase=3;}
        public void Cancel(){phase=step=0;Offset=0;elapsed=0;}
    }
}
