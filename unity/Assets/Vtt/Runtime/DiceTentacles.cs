using System;
using System.Collections.Generic;
using UnityEngine;

namespace DndVtt.UnityPrototype
{
    // Compliant surface-contact arms, rather than hundreds of rigid compound hulls.
    // The visible skin bends to the support; active contact impulses reach the real
    // die Rigidbody. This is a bounded muscle/contact approximation, not a fluid solver.
    internal sealed class DiceTentacles
    {
        private readonly Vector3[] rest,vertices,normals,roots,tips,offsets;
        private readonly float[] floors,phases,rates;
        private readonly Vector3[] swing,curl;
        private readonly int[] arm;
        private readonly float[] weight,lastPush;
        private readonly Mesh mesh;
        private readonly Transform transform;
        private readonly Rigidbody body;
        private readonly Func<Vector3,float> support;
        private float lastAnimation=-100,lastContact=-100;
        public int Count=>roots.Length;
        public int Pushes { get;private set; }
        public DiceTentacles(DiceGeometry geometry,List<Mesh> pieces,Transform host,Material material,Func<Vector3,float> floor,List<UnityEngine.Object> owned)
        {
            transform=host;body=host.GetComponent<Rigidbody>();support=floor;roots=geometry.vertices;
            tips=new Vector3[Count];offsets=new Vector3[Count];floors=new float[Count];lastPush=new float[Count];phases=new float[Count];rates=new float[Count];swing=new Vector3[Count];curl=new Vector3[Count];
            var turns=new Quaternion[Count];
            for(int a=0;a<Count;a++) {
                Vector3 radial=roots[a].normalized;turns[a]=Quaternion.AngleAxis(UnityEngine.Random.Range(0,360f),radial);
                // Independent isotropic local frames; no shared world-up curl or vertex-index phase.
                swing[a]=Vector3.Cross(radial,UnityEngine.Random.onUnitSphere).normalized;curl[a]=Vector3.Cross(radial,swing[a]);
                phases[a]=UnityEngine.Random.Range(0,2*Mathf.PI);rates[a]=UnityEngine.Random.Range(2.4f,5.4f);
            }
            var vv=new List<Vector3>();var nn=new List<Vector3>();var uv=new List<Vector2>();var tt=new List<int>();var aa=new List<int>();
            foreach(var p in pieces) {
                if(!p.name.StartsWith("Tentacle ",StringComparison.Ordinal))continue;
                int index=int.Parse(p.name.Substring(9)),offset=vv.Count;
                var rotated=new Vector3[p.vertexCount];var source=p.vertices;
                for(int k=0;k<source.Length;k++)rotated[k]=roots[index]+turns[index]*(source[k]-roots[index]);
                vv.AddRange(rotated);foreach(var n in p.normals)nn.Add(turns[index]*n);uv.AddRange(p.uv);foreach(int t in p.triangles)tt.Add(t+offset);
                foreach(var v in rotated) { aa.Add(index);if((v-roots[index]).sqrMagnitude>(tips[index]-roots[index]).sqrMagnitude||tips[index]==Vector3.zero)tips[index]=v; }
            }
            rest=vv.ToArray();normals=nn.ToArray();vertices=new Vector3[rest.Length];arm=aa.ToArray();weight=new float[rest.Length];
            for(int i=0;i<rest.Length;i++)weight[i]=Mathf.Clamp01((rest[i]-roots[arm[i]]).magnitude/.5f);
            mesh=new Mesh { name="Compliant tentacles",indexFormat=UnityEngine.Rendering.IndexFormat.UInt32,hideFlags=HideFlags.HideAndDontSave };mesh.MarkDynamic();mesh.vertices=rest;mesh.normals=normals;mesh.SetUVs(0,uv);mesh.SetTriangles(tt,0);mesh.RecalculateBounds();owned.Add(mesh);
            var go=new GameObject("Soft tentacles") { layer=31 };go.transform.SetParent(host,false);go.AddComponent<MeshFilter>().sharedMesh=mesh;go.AddComponent<MeshRenderer>().sharedMaterial=material;
        }
        public void Reset() { Array.Clear(lastPush,0,lastPush.Length);lastContact=-100;Pushes=0; }
        private Vector3 Offset(int a,float clock)
        {
            float t=clock*rates[a],p=phases[a];
            return swing[a]*(Mathf.Sin(t+p)*.24f)+curl[a]*(Mathf.Sin(t*1.41421356f+p*2)*.24f)
                +roots[a].normalized*(Mathf.Sin(t*1.7320508f+p*3)*.13f);
        }
        public void Step(float clock,float elapsed,bool active)
        {
            if(!active||body.isKinematic||elapsed<.5f||elapsed>4.2f||elapsed-lastContact<.5f||Pushes>=3||body.linearVelocity.magnitude>3)return;
            int chosen=-1,eligible=0;Vector3 point=Vector3.zero;
            for(int a=0;a<Count;a++) {
                Vector3 tip=transform.TransformPoint(tips[a]+Offset(a,clock));float floor=support(tip);
                if(floor+.09f<=tip.y||elapsed-lastPush[a]<1.1f)continue;
                // Reservoir sampling gives every touching arm the same opportunity.
                if(UnityEngine.Random.Range(0,++eligible)==0) { chosen=a;point=new Vector3(tip.x,floor,tip.z); }
            }
            if(chosen<0)return;
            Vector3 away=body.worldCenterOfMass-point;away.y=0;
            Vector3 wander=UnityEngine.Random.onUnitSphere;wander.y=0;
            float fade=Mathf.Clamp01((4.2f-elapsed)/.8f);
            Vector3 impulse=(Vector3.up*UnityEngine.Random.Range(.035f,.065f)+away.normalized*.018f+wander*.025f)*fade;
            body.AddForceAtPosition(impulse,point,ForceMode.Impulse);body.WakeUp();lastPush[chosen]=lastContact=elapsed;Pushes++;
        }

        public void Animate(float clock)
        {
            if(clock-lastAnimation<1f/30)return;lastAnimation=clock;
            Matrix4x4 toWorld=transform.localToWorldMatrix,toLocal=transform.worldToLocalMatrix;
            // One floor probe per arm; each skin vertex is projected to that support.
            for(int a=0;a<Count;a++) { offsets[a]=Offset(a,clock);floors[a]=support(toWorld.MultiplyPoint3x4(tips[a]+offsets[a])); }
            for(int i=0;i<vertices.Length;i++) {
                int a=arm[i];Vector3 p=rest[i]+offsets[a]*weight[i];Vector3 world=toWorld.MultiplyPoint3x4(p);
                if(world.y<floors[a]+.025f) { world.y=floors[a]+.025f;p=toLocal.MultiplyPoint3x4(world); }
                vertices[i]=p;
            }
            mesh.vertices=vertices;mesh.RecalculateNormals();mesh.RecalculateBounds();
        }
    }
}
