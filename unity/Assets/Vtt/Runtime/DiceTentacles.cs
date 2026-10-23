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
        private readonly float[] floors;
        private readonly int[] arm;
        private readonly float[] weight,lastPush;
        private readonly Mesh mesh;
        private readonly Transform transform;
        private readonly Rigidbody body;
        private readonly Func<Vector3,float> support;
        private float phase,lastAnimation=-100;
        public int Count=>roots.Length;
        public int Pushes { get;private set; }
        public DiceTentacles(DiceGeometry geometry,List<Mesh> pieces,Transform host,Material material,Func<Vector3,float> floor,List<UnityEngine.Object> owned)
        {
            transform=host;body=host.GetComponent<Rigidbody>();support=floor;roots=geometry.vertices;
            tips=new Vector3[Count];offsets=new Vector3[Count];floors=new float[Count];lastPush=new float[Count];phase=UnityEngine.Random.Range(0,6.28f);
            var vv=new List<Vector3>();var nn=new List<Vector3>();var uv=new List<Vector2>();var tt=new List<int>();var aa=new List<int>();
            foreach(var p in pieces) {
                if(!p.name.StartsWith("Tentacle ",StringComparison.Ordinal))continue;
                int index=int.Parse(p.name.Substring(9)),offset=vv.Count;
                vv.AddRange(p.vertices);nn.AddRange(p.normals);uv.AddRange(p.uv);foreach(int t in p.triangles)tt.Add(t+offset);
                foreach(var v in p.vertices) { aa.Add(index);if((v-roots[index]).sqrMagnitude>(tips[index]-roots[index]).sqrMagnitude||tips[index]==Vector3.zero)tips[index]=v; }
            }
            rest=vv.ToArray();normals=nn.ToArray();vertices=new Vector3[rest.Length];arm=aa.ToArray();weight=new float[rest.Length];
            for(int i=0;i<rest.Length;i++)weight[i]=Mathf.Clamp01((rest[i]-roots[arm[i]]).magnitude/.5f);
            mesh=new Mesh { name="Compliant tentacles",indexFormat=UnityEngine.Rendering.IndexFormat.UInt32,hideFlags=HideFlags.HideAndDontSave };mesh.MarkDynamic();mesh.vertices=rest;mesh.normals=normals;mesh.SetUVs(0,uv);mesh.SetTriangles(tt,0);mesh.RecalculateBounds();owned.Add(mesh);
            var go=new GameObject("Soft tentacles") { layer=31 };go.transform.SetParent(host,false);go.AddComponent<MeshFilter>().sharedMesh=mesh;go.AddComponent<MeshRenderer>().sharedMaterial=material;
        }
        public void Reset() { Array.Clear(lastPush,0,lastPush.Length);Pushes=0; }
        private Vector3 Offset(int a,float clock)
        {
            Vector3 radial=roots[a].normalized,side=Vector3.Cross(radial,Mathf.Abs(radial.y)<.8f?Vector3.up:Vector3.right).normalized;
            return side*(Mathf.Sin(clock*4.6f+phase+a*1.7f)*.22f)+radial*(Mathf.Sin(clock*3.3f+phase+a)*.11f);
        }
        public void Step(float clock,float elapsed,bool active)
        {
            if(!active||body.isKinematic||elapsed<.5f||elapsed>4.2f)return;
            for(int a=0;a<Count;a++) {
                Vector3 tip=transform.TransformPoint(tips[a]+Offset(a,clock));float floor=support(tip);
                // Only a touching, flexed arm can push. Lower arms yield; no permanent
                // rigid cage holds the numbered solid above the table.
                float compression=floor+.09f-tip.y;
                if(compression<=0||elapsed-lastPush[a]<1.1f||Pushes>=3||body.linearVelocity.magnitude>3)continue;
                Vector3 point=new Vector3(tip.x,floor,tip.z),away=body.worldCenterOfMass-point;away.y=0;
                float fade=Mathf.Clamp01((4.2f-elapsed)/.8f);
                Vector3 impulse=(Vector3.up*.052f+away.normalized*.028f)*fade;
                body.AddForceAtPosition(impulse,point,ForceMode.Impulse);body.WakeUp();lastPush[a]=elapsed;Pushes++;
            }
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
