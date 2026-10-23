using System;

namespace DndVtt.UnityPrototype
{
    // Pure, testable accelerometer filter. Input is in g; gravity/orientation changes
    // are removed by a low-pass estimate. One gesture produces one bounded release.
    public sealed class DiceMotion
    {
        private float gx,gy,gz,energy,quiet,cooldown;
        private bool initialized,armed;
        public float Strength { get; private set; }
        public bool Sample(float x,float y,float z,float delta)
        {
            if(float.IsNaN(x)||float.IsInfinity(x)||float.IsNaN(y)||float.IsInfinity(y)||float.IsNaN(z)||float.IsInfinity(z)||float.IsNaN(delta)||float.IsInfinity(delta)||delta<=0)return false;
            delta=Math.Min(delta,.1f);cooldown=Math.Max(0,cooldown-delta);
            if(!initialized) { gx=x;gy=y;gz=z;initialized=true;return false; }
            float blend=1-(float)Math.Exp(-delta*3);
            gx+=(x-gx)*blend;gy+=(y-gy)*blend;gz+=(z-gz)*blend;
            float a=(float)Math.Sqrt((x-gx)*(x-gx)+(y-gy)*(y-gy)+(z-gz)*(z-gz));
            if(a>.65f&&cooldown==0) { energy=Math.Min(8,energy+a*delta);quiet=0;armed=energy>.22f; }
            else if(armed)quiet+=delta;
            else energy=Math.Max(0,energy-delta);
            if(!armed||quiet<.22f)return false;
            Strength=Math.Max(.15f,Math.Min(1,energy/2));armed=false;quiet=energy=0;cooldown=1.2f;return true;
        }
        public void Reset() { initialized=armed=false;energy=quiet=cooldown=Strength=0; }
    }
}
