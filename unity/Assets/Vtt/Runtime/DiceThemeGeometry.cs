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
            if(theme==null||theme.Shape=="rounded")return pieces;
            float rootRadius=theme.TexturePng!=null&&theme.Shape=="tentacles"?Mathf.Min(.09f,theme.Width*1.45f):theme.Width;
            int arms=Math.Min(shape.vertices.Length,theme.Behavior=="abyss"?4:6);
            for(int i=0;i<arms;i++) {
                int vertexIndex=i*shape.vertices.Length/arms;Vector3 vertex=shape.vertices[vertexIndex];
                Vector3 radial=vertex.normalized;
                Vector3 tangent=Vector3.Cross(radial,Mathf.Abs(radial.y)<.8f?Vector3.up:Vector3.right).normalized;
                // Follow an incident edge rather than curling across a numbered face center.
                foreach(var face in shape.faces) {
                    int corner=Array.IndexOf(face.vertices,vertexIndex);if(corner<0)continue;
                    Vector3 edge=shape.vertices[face.vertices[(corner+1)%face.vertices.Length]]-vertex;
                    tangent=(edge-radial*Vector3.Dot(edge,radial)).normalized;break;
                }
                Vector3 bitangent=Vector3.Cross(radial,tangent).normalized;
                bool curved=theme.Shape=="tentacles"||theme.Shape=="vines"||theme.Shape=="fangs";
                int segments=theme.Shape=="tentacles"?10:curved?5:1;
                Vector3 previous=vertex-radial*.035f;
                float previousRadius=rootRadius;
                for(int j=1;j<=segments;j++) {
                    float t=j/(float)segments;
                    Vector3 next=vertex+radial*(theme.Length*t);
                    if(theme.Shape=="tentacles") {
                        float angle=t*Mathf.PI*1.35f;
                        next=vertex+radial*(theme.Length*Mathf.Sin(angle))+tangent*(theme.Length*1.45f*(1-Mathf.Cos(angle)))+bitangent*(Mathf.Sin(t*Mathf.PI)*theme.Length*.2f);
                    }else if(curved)next+=tangent*(theme.Length*.85f*t*t);
                    float radius=rootRadius*(1-t*.92f);
                    if(theme.Shape=="rounded")radius=theme.Width*Mathf.Sqrt(Mathf.Max(.01f,1-t*t));
                    var segment=Frustum(previous,next,previousRadius,radius,theme.Shape=="crystal"?4:8);
                    if(theme.NumberedAtlas&&curved) { var coords=segment.uv;for(int k=0;k<coords.Length;k++)coords[k].y=(j-1+coords[k].y)/segments;segment.uv=coords; }
                    pieces.Add(segment);
                    if(theme.TexturePng!=null&&theme.Shape=="tentacles"&&j%3==0) {
                        // Six convex tubes form a genuinely hollow, raised suction cup.
                        Vector3 along=(next-previous).normalized;
                        Vector3 cupNormal=(radial-along*Vector3.Dot(radial,along)).normalized;
                        if(cupNormal.sqrMagnitude<.1f)cupNormal=bitangent;
                        Vector3 across=Vector3.Cross(cupNormal,along).normalized;
                        float r=(previousRadius+radius)*.4f,tube=Mathf.Max(.002f,r*.22f);
                        Vector3 center=(previous+next)*.5f+cupNormal*((previousRadius+radius)*.46f);
                        for(int ring=0;ring<6;ring++) {
                            float a=ring*Mathf.PI/3,b=(ring+1)*Mathf.PI/3;
                            Vector3 from=center+(along*Mathf.Cos(a)+across*Mathf.Sin(a))*r;
                            Vector3 to=center+(along*Mathf.Cos(b)+across*Mathf.Sin(b))*r;
                            pieces.Add(Frustum(from,to,tube,tube,6));
                        }
                    }
                    previous=next;previousRadius=radius;
                }
            }
            // Raised edgework follows the actual solid instead of painting a flat decal.
            if(theme.TexturePng!=null||theme.Shape=="filigree"||theme.Shape=="vines"||theme.Shape=="crystal") {
                var edges=new HashSet<string>();
                foreach(var face in shape.faces)for(int i=0;i<face.vertices.Length;i++) {
                    int a=face.vertices[i],b=face.vertices[(i+1)%face.vertices.Length];
                    if(!edges.Add(Math.Min(a,b)+":"+Math.Max(a,b)))continue;
                    var edge=Frustum(shape.vertices[a]*1.01f,shape.vertices[b]*1.01f,theme.Width*.36f,theme.Width*.36f,8);edge.name="Dice metal edge";pieces.Add(edge);
                }
            }
            if(theme.NumberedAtlas&&theme.Behavior!="slime"&&theme.Behavior!="stone") {
                // Fine secondary raised frame sits inside each face perimeter, leaving numbers clear.
                foreach(var face in shape.faces)for(int i=0;i<face.vertices.Length;i++) {
                    Vector3 a=Vector3.Lerp(face.center,shape.vertices[face.vertices[i]],.84f)+face.normal*.006f;
                    Vector3 b=Vector3.Lerp(face.center,shape.vertices[face.vertices[(i+1)%face.vertices.Length]],.84f)+face.normal*.006f;
                    var rail=Frustum(a,b,.006f,.006f,6);rail.name="Dice metal edge";pieces.Add(rail);
                }
            }
            return pieces;
        }
        public static Mesh Root(Vector3 start,float angle)
        {
            Vector3 end=start+new Vector3(Mathf.Cos(angle),0,Mathf.Sin(angle))*.95f;
            return Frustum(start,end,.045f,.004f,6);
        }
        private static Mesh Frustum(Vector3 a,Vector3 b,float ra,float rb,int count)
        {
            Vector3 axis=(b-a).normalized,x=Vector3.Cross(axis,Mathf.Abs(axis.y)<.8f?Vector3.up:Vector3.right).normalized,y=Vector3.Cross(axis,x);
            var v=new List<Vector3>();var triangles=new List<int>();var uv=new List<Vector2>();
            for(int i=0;i<count;i++) {
                float angle=2*Mathf.PI*i/count;Vector3 radial=x*Mathf.Cos(angle)+y*Mathf.Sin(angle);
                v.Add(a+radial*ra);v.Add(b+radial*rb);uv.Add(new Vector2(i/(float)count,0));uv.Add(new Vector2(i/(float)count,1));
            }
            for(int i=0;i<count;i++) {
                int n=(i+1)%count;
                triangles.AddRange(new[]{i*2,n*2,n*2+1,i*2,n*2+1,i*2+1});
            }
            // End caps, outward winding.
            for(int i=1;i<count-1;i++) { triangles.AddRange(new[]{0,(i+1)*2,i*2});triangles.AddRange(new[]{1,i*2+1,(i+1)*2+1}); }
            var mesh=new Mesh { name="Dice physical ornament" };mesh.SetVertices(v);mesh.SetUVs(0,uv);mesh.SetTriangles(triangles,0);mesh.RecalculateNormals();mesh.RecalculateBounds();return mesh;
        }
    }
}
