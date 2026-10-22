using System;
using System.Collections.Generic;
using UnityEngine;

namespace DndVtt.UnityPrototype
{
    // Closed, individually convex frusta. Each piece is shared by its renderer AND collider.
    // Compound collision preserves spaces between curved arms; a single global convex hull
    // would erase those spaces and make an invisible, differently shaped die.
    public static class DiceThemeGeometry
    {
        public static List<Mesh> Build(DiceGeometry shape,DiceTheme theme)
        {
            var pieces=new List<Mesh>();
            if(theme==null)return pieces;
            int arms=Math.Min(shape.vertices.Length,6);
            for(int i=0;i<arms;i++) {
                Vector3 vertex=shape.vertices[i*shape.vertices.Length/arms];
                Vector3 radial=vertex.normalized;
                Vector3 tangent=Vector3.Cross(radial,Mathf.Abs(radial.y)<.8f?Vector3.up:Vector3.right).normalized;
                Vector3 bitangent=Vector3.Cross(radial,tangent).normalized;
                bool curved=theme.Shape=="tentacles"||theme.Shape=="vines"||theme.Shape=="fangs";
                int segments=curved?5:theme.Shape=="rounded"?3:1;
                Vector3 previous=vertex-radial*.035f;
                float previousRadius=theme.Width;
                for(int j=1;j<=segments;j++) {
                    float t=j/(float)segments;
                    Vector3 next=vertex+radial*(theme.Length*t);
                    if(curved)next+=tangent*(theme.Length*.85f*t*t)+bitangent*(theme.Shape=="tentacles"?Mathf.Sin(t*Mathf.PI)*theme.Length*.32f:0);
                    float radius=theme.Width*(1-t*.92f);
                    if(theme.Shape=="rounded")radius=theme.Width*Mathf.Sqrt(Mathf.Max(.01f,1-t*t));
                    pieces.Add(Frustum(previous,next,previousRadius,radius,theme.Shape=="crystal"?4:8));
                    previous=next;previousRadius=radius;
                }
            }
            // Raised edgework follows the actual solid instead of painting a flat decal.
            if(theme.Shape=="filigree"||theme.Shape=="vines"||theme.Shape=="crystal") {
                var edges=new HashSet<string>();
                foreach(var face in shape.faces)for(int i=0;i<face.vertices.Length;i++) {
                    int a=face.vertices[i],b=face.vertices[(i+1)%face.vertices.Length];
                    if(!edges.Add(Math.Min(a,b)+":"+Math.Max(a,b)))continue;
                    pieces.Add(Frustum(shape.vertices[a]*1.01f,shape.vertices[b]*1.01f,theme.Width*.36f,theme.Width*.36f,6));
                }
            }
            return pieces;
        }
        private static Mesh Frustum(Vector3 a,Vector3 b,float ra,float rb,int count)
        {
            Vector3 axis=(b-a).normalized,x=Vector3.Cross(axis,Mathf.Abs(axis.y)<.8f?Vector3.up:Vector3.right).normalized,y=Vector3.Cross(axis,x);
            var v=new List<Vector3>();var triangles=new List<int>();
            for(int i=0;i<count;i++) {
                float angle=2*Mathf.PI*i/count;Vector3 radial=x*Mathf.Cos(angle)+y*Mathf.Sin(angle);
                v.Add(a+radial*ra);v.Add(b+radial*rb);
            }
            for(int i=0;i<count;i++) {
                int n=(i+1)%count;
                triangles.AddRange(new[]{i*2,n*2,n*2+1,i*2,n*2+1,i*2+1});
            }
            // End caps, outward winding.
            for(int i=1;i<count-1;i++) { triangles.AddRange(new[]{0,(i+1)*2,i*2});triangles.AddRange(new[]{1,i*2+1,(i+1)*2+1}); }
            var mesh=new Mesh { name="Dice physical ornament" };mesh.SetVertices(v);mesh.SetTriangles(triangles,0);mesh.RecalculateNormals();mesh.RecalculateBounds();return mesh;
        }
    }
}
