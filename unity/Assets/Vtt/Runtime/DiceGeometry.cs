using System;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;

namespace DndVtt.UnityPrototype
{
    // Exact convex solids. Flat faces are kept separately for numbering and result detection.
    public sealed class DiceGeometry
    {
        public sealed class Face
        {
            public int[] vertices;
            public Vector3 normal, center;
            public int value;
        }
        public readonly Vector3[] vertices;
        public readonly Face[] faces;
        public readonly int sides;
        private DiceGeometry(Vector3[] points, int count)
        {
            sides=count;vertices=points;faces=Hull(points);
            if(faces.Length!=count)throw new InvalidOperationException("Invalid d"+count+" hull: "+faces.Length);
            // Pair opposite faces where possible (standard d6/d8/d12/d20 sums).
            var remaining=new HashSet<int>(Enumerable.Range(0,count));int low=1;
            while(remaining.Count>0) {
                int first=remaining.Min();remaining.Remove(first);faces[first].value=low;
                int opposite=-1;
                foreach(int other in remaining)if(Vector3.Dot(faces[first].normal,faces[other].normal)<-.999f) { opposite=other;break; }
                if(opposite>=0) { faces[opposite].value=count+1-low;remaining.Remove(opposite); }
                low++;
            }
            if(count==4||count==10)for(int i=0;i<count;i++)faces[i].value=i+1;
        }
        public static DiceGeometry Create(int sides)
        {
            float phi=(1+Mathf.Sqrt(5))/2;
            var points=new List<Vector3>();
            switch(sides) {
                case 4:points.AddRange(new[]{new Vector3(1,1,1),new Vector3(-1,-1,1),new Vector3(-1,1,-1),new Vector3(1,-1,-1)});break;
                case 6:for(int x=-1;x<=1;x+=2)for(int y=-1;y<=1;y+=2)for(int z=-1;z<=1;z+=2)points.Add(new Vector3(x,y,z));break;
                case 8:points.AddRange(new[]{Vector3.right,Vector3.left,Vector3.up,Vector3.down,Vector3.forward,Vector3.back});break;
                case 12:
                    var ico=Create(20);
                    foreach(var face in ico.faces)points.Add(face.normal/Vector3.Dot(face.normal,face.center));
                    break;
                case 20:
                    for(int a=-1;a<=1;a+=2)for(int b=-1;b<=1;b+=2) {
                        points.Add(new Vector3(0,a,b*phi));points.Add(new Vector3(a,b*phi,0));points.Add(new Vector3(b*phi,0,a));
                    }break;
                case 10:
                    // Polar dual of a regular pentagonal antiprism: ten congruent kite faces.
                    var ring=new List<Vector3>();
                    float h=Mathf.Sqrt((Mathf.Cos(Mathf.PI/5)-Mathf.Cos(2*Mathf.PI/5))/2);
                    for(int i=0;i<10;i++) {
                        float angle=i*Mathf.PI/5;ring.Add(new Vector3(Mathf.Cos(angle),i%2==0?h:-h,Mathf.Sin(angle)));
                    }
                    foreach(var face in Hull(ring.ToArray()))points.Add(face.normal/Vector3.Dot(face.normal,face.center));
                    break;
                default:throw new ArgumentOutOfRangeException(nameof(sides));
            }
            float radius=points.Max(p=>p.magnitude);
            return new DiceGeometry(points.Select(p=>p/radius*.65f).ToArray(),sides);
        }
        private static Face[] Hull(Vector3[] points)
        {
            var result=new List<Face>();var keys=new HashSet<string>();const float epsilon=.0001f;
            for(int a=0;a<points.Length-2;a++)for(int b=a+1;b<points.Length-1;b++)for(int c=b+1;c<points.Length;c++) {
                Vector3 cross=Vector3.Cross(points[b]-points[a],points[c]-points[a]);if(cross.sqrMagnitude<epsilon*epsilon)continue;
                Vector3 normal=cross.normalized;float distance=Vector3.Dot(normal,points[a]);
                bool positive=false,negative=false;
                foreach(var p in points) { float delta=Vector3.Dot(normal,p)-distance;if(delta>epsilon)positive=true;if(delta < -epsilon)negative=true; }
                if(positive&&negative)continue;
                if(positive) { normal=-normal;distance=-distance; }
                if(distance<=epsilon)continue;
                var ids=Enumerable.Range(0,points.Length).Where(i=>Mathf.Abs(Vector3.Dot(normal,points[i])-distance)<epsilon).ToArray();
                string key=string.Join(",",ids);if(!keys.Add(key))continue;
                Vector3 center=Vector3.zero;foreach(int id in ids)center+=points[id];center/=ids.Length;
                Vector3 u=(points[ids[0]]-center).normalized,v=Vector3.Cross(normal,u);
                Array.Sort(ids,(i,j)=>Mathf.Atan2(Vector3.Dot(points[i]-center,v),Vector3.Dot(points[i]-center,u)).CompareTo(Mathf.Atan2(Vector3.Dot(points[j]-center,v),Vector3.Dot(points[j]-center,u))));
                result.Add(new Face { vertices=ids,normal=normal,center=center });
            }
            return result.ToArray();
        }
        public int Read(Quaternion rotation,out float alignment,float minimumAlignment=.985f,float minimumDominance=.025f)
        {
            Vector3 direction=sides==4?Vector3.down:Vector3.up;Face best=null;alignment=-1;float second=-1;
            foreach(var f in faces) { float dot=Vector3.Dot(rotation*f.normal,direction);if(dot>alignment) { second=alignment;alignment=dot;best=f; }else if(dot>second)second=dot; }
            return alignment>=minimumAlignment&&alignment-second>minimumDominance?best.value:0; // Cocked/edge dice are never silently accepted.
        }
        public Mesh BeveledMesh(float fraction)
        {
            if(fraction<=0||fraction>=.5f)throw new ArgumentOutOfRangeException(nameof(fraction));
            var points=new List<Vector3>();var edges=new HashSet<string>();
            foreach(var face in faces)for(int i=0;i<face.vertices.Length;i++) {
                int a=face.vertices[i],b=face.vertices[(i+1)%face.vertices.Length];
                if(!edges.Add(Math.Min(a,b)+":"+Math.Max(a,b)))continue;
                points.Add(vertices[a]*(1-fraction)+vertices[b]*fraction);
                points.Add(vertices[b]*(1-fraction)+vertices[a]*fraction);
            }
            var clipped=points.ToArray();return CreateMesh(clipped,Hull(clipped),"Beveled d"+sides);
        }
        public static int AtlasOffset(int sides,bool tens=false,bool units=false)=>tens?60:units?70:sides==4?0:sides==6?4:sides==8?10:sides==10?18:sides==12?28:40;
        public Mesh Mesh(bool numberedAtlas=false,int atlasOffset=0) => CreateMesh(vertices,faces,"Procedural d"+sides,numberedAtlas,atlasOffset);
        private static Mesh CreateMesh(Vector3[] vertices,Face[] faces,string name,bool numberedAtlas=false,int atlasOffset=0)
        {
            var positions=new List<Vector3>();var triangles=new List<int>();var uv=new List<Vector2>();
            foreach(var f in faces) {
                int offset=positions.Count;
                Vector3 up=(vertices[f.vertices[0]]-f.center).normalized,right=Vector3.Cross(up,f.normal).normalized;
                float radius=0;foreach(int id in f.vertices)radius=Mathf.Max(radius,(vertices[id]-f.center).magnitude);
                foreach(int id in f.vertices) { positions.Add(vertices[id]);Vector3 local=vertices[id]-f.center;Vector2 coord=new Vector2(.5f+Vector3.Dot(local,right)/radius*.46f,.5f+Vector3.Dot(local,up)/radius*.46f);
                    if(numberedAtlas) { int tile=atlasOffset+f.value-1;coord=new Vector2((tile%10+coord.x)/10,(8-tile/10+coord.y)/9); }uv.Add(coord); }
                for(int i=1;i<f.vertices.Length-1;i++)triangles.AddRange(new[]{offset,offset+i,offset+i+1});
            }
            var mesh=new Mesh { name=name };mesh.SetVertices(positions);mesh.SetUVs(0,uv);mesh.SetTriangles(triangles,0);mesh.RecalculateNormals();mesh.RecalculateBounds();return mesh;
        }
    }
}
