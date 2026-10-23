using System;

namespace DndVtt.UnityPrototype
{
    // Pure, testable accelerometer filter. Input is in g; gravity/orientation changes
    // are removed by a low-pass estimate. One gesture produces one bounded release.
    public sealed class DiceMotion
    {
        private float gx,gy,gz,energy,quiet,cooldown,px,py,pz;
        private int reversals;
        private bool initialized,armed;
        public float Strength { get; private set; }
        public bool Sample(float x,float y,float z,float delta)
        {
            if(float.IsNaN(x)||float.IsInfinity(x)||float.IsNaN(y)||float.IsInfinity(y)||float.IsNaN(z)||float.IsInfinity(z)||float.IsNaN(delta)||float.IsInfinity(delta)||delta<=0)return false;
            if(Math.Abs(x)>32||Math.Abs(y)>32||Math.Abs(z)>32)return false;
            delta=Math.Min(delta,.1f);cooldown=Math.Max(0,cooldown-delta);
            if(!initialized) { gx=x;gy=y;gz=z;initialized=true;return false; }
            float blend=1-(float)Math.Exp(-delta*3);
            gx+=(x-gx)*blend;gy+=(y-gy)*blend;gz+=(z-gz)*blend;
            float dx=x-gx,dy=y-gy,dz=z-gz,a=(float)Math.Sqrt(dx*dx+dy*dy+dz*dz);
            if(a>.65f&&cooldown==0) {
                float nx=dx/a,ny=dy/a,nz=dz/a;
                if(nx*px+ny*py+nz*pz<-.2f)reversals++;
                px=nx;py=ny;pz=nz;energy=Math.Min(8,energy+a*delta);quiet=0;armed=energy>.22f&&reversals>=3;
            }
            else if(armed)quiet+=delta;
            else { energy=Math.Max(0,energy-delta);quiet+=delta;if(quiet>.4f) { reversals=0;px=py=pz=0; } }
            if(!armed||quiet<.22f)return false;
            Strength=Math.Max(.15f,Math.Min(1,energy/2));armed=false;quiet=energy=px=py=pz=0;reversals=0;cooldown=1.2f;return true;
        }
        public void Reset() { initialized=armed=false;energy=quiet=cooldown=Strength=px=py=pz=0;reversals=0; }
    }
}
