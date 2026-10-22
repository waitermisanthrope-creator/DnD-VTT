using System;
using System.IO;
using System.Linq;
using System.Collections.Generic;
using Newtonsoft.Json.Linq;
using DndVtt.UnityPrototype;
using UnityEngine;
using UnityEngine.SceneManagement;

public static class DiceValidation
{
    public static int ExpectedSceneCount { get; private set; }
    private static void Check(bool condition,string message) { if(!condition)throw new Exception("VTT_DICE_FAIL: "+message); }
    public static void Run()
    {
        int[] counts={4,6,8,10,12,20};int checks=0;
        foreach(int count in counts) {
            var shape=DiceGeometry.Create(count);
            Check(shape.faces.Length==count,"face count d"+count);
            Check(shape.faces.Select(f=>f.value).OrderBy(v=>v).SequenceEqual(Enumerable.Range(1,count)),"unique numbers d"+count);
            var edges=new Dictionary<string,int>();var areas=new List<float>();
            foreach(var face in shape.faces) {
                Check(Vector3.Dot(face.normal,face.center)>0,"outward normal");
                float area=0;
                for(int i=0;i<face.vertices.Length;i++) {
                    int a=face.vertices[i],b=face.vertices[(i+1)%face.vertices.Length];string edge=Math.Min(a,b)+":"+Math.Max(a,b);
                    edges.TryGetValue(edge,out int uses);edges[edge]=uses+1;
                    Check(Mathf.Abs(Vector3.Dot(shape.vertices[a]-face.center,face.normal))<.0001f,"planar polygon");
                    area+=Vector3.Cross(shape.vertices[a]-face.center,shape.vertices[b]-face.center).magnitude*.5f;
                }
                areas.Add(area);
                Quaternion rotation=Quaternion.FromToRotation(face.normal,count==4?Vector3.down:Vector3.up);
                Check(shape.Read(rotation,out float alignment)==face.value&&alignment>.999f,"actual face determines result d"+count);
                foreach(var vertex in shape.vertices)Check(Vector3.Dot(vertex-face.center,face.normal)<.0002f,"convex hull");
                checks++;
            }
            Check(edges.Values.All(v=>v==2),"watertight two faces per edge");
            Check(shape.vertices.Length-edges.Count+count==2,"Euler topology");
            Check(areas.Max()-areas.Min()<.0002f,"equal face areas d"+count);
            var first=shape.faces[0];var neighbor=shape.faces.First(f=>f!=first&&f.vertices.Intersect(first.vertices).Count()==2);
            Vector3 midpoint=(first.normal+neighbor.normal).normalized;
            Check(shape.Read(Quaternion.FromToRotation(midpoint,count==4?Vector3.down:Vector3.up),out _)==0,"edge rejected d"+count);
            var mesh=shape.Mesh();Check(mesh.triangles.Length>0,"triangulated mesh");UnityEngine.Object.DestroyImmediate(mesh);
        }
        ExpectedSceneCount=SceneManager.sceneCount;int bodies=UnityEngine.Object.FindObjectsByType<Rigidbody>(FindObjectsSortMode.None).Length;
        string folder=Path.Combine("Builds","DiceValidation");Directory.CreateDirectory(folder);
        int rolls=0;
        using(var table=new DiceTable()) {
            foreach(int count in new[]{4,6,8,10,12,20,100}) {
                table.Preview(count);Check(table.BodyCount==(count==100?2:1),"bounded active dice");
                foreach(var body in UnityEngine.Object.FindObjectsByType<Rigidbody>(FindObjectsSortMode.None)) {
                    Check((body.position-body.transform.position).sqrMagnitude<.000001f,"preview physics/render positions agree d"+count);
                    Check(Quaternion.Angle(body.rotation,body.transform.rotation)<.01f,"preview physics/render rotations agree d"+count);
                }
                SaveImage(table.Image,Path.Combine(folder,"d"+count+".png"));
                for(int trial=0;trial<8;trial++) {
                    table.Throw(count);
                    for(int step=0;step<650&&table.Rolling;step++)table.Tick(.1f,false);
                    Check(!table.Rolling,"bounded physics timeout");
                    Check(table.Value.HasValue,"settled roll d"+count+" trial"+trial+": "+table.Result);
                    Check(table.Value.Value>=1&&table.Value.Value<=count,"result range");rolls++;
                }
                table.Tick(0);SaveImage(table.Image,Path.Combine(folder,"d"+count+"-settled.png"));
            }
            table.Throw("7d20 + 3d6 + 1d8");
            for(int step=0;step<2000&&table.Throwing;step++) { Check(table.BodyCount<=8,"mixed active-body budget");table.Tick(.1f,false); }
            Check(!table.Throwing&&table.Completed==11&&table.Total>=11&&table.Total<=166,"mixed real-physics total: "+table.Result);
            table.Throw("999999999999999999999999999999d100");
            Check(table.BodyCount==8,"huge percentile request stays bounded");table.Cancel();
            Check(!table.Throwing&&!table.Value.HasValue&&table.Completed==0,"cancel is partial, never a completed result");
            string fixture=Path.GetFullPath("WorkshopFixtures~/DnD-VTT-Assets");
            var catalog=WorkshopStore.Catalog(File.ReadAllText(Path.Combine(fixture,"catalog/v5/index.json")),"packs");
            int themes=0;var families=new HashSet<string>();
            foreach(JObject manifest in catalog) {
                if((string)manifest["imageKind"]!="dice")continue;
                string payload=Path.Combine(fixture,"packages",Path.GetFileName((string)manifest["url"]));WorkshopStore.Verify(manifest,payload);
                var data=WorkshopStore.ValidateData(manifest,File.ReadAllText(payload));var theme=DiceTheme.Read((JObject)data["diceThemes"][0]);
                table.SetTheme(theme);bool first=families.Add(theme.Shape);
                foreach(int count in first?new[]{4,6,8,10,12,20,100}:new[]{20}) {
                    table.Preview(count);SaveImage(table.Image,Path.Combine(folder,theme.Id+"-d"+count+".png"),false);Check(table.PhysicalOrnamentCount>0,"actual protrusion geometry "+theme.Id);
                    foreach(var body in UnityEngine.Object.FindObjectsByType<Rigidbody>(FindObjectsSortMode.None)) {
                        var colliders=body.GetComponentsInChildren<MeshCollider>();Check(colliders.Length>1,"compound collision "+theme.Id);
                        foreach(var collider in colliders) {
                            Check(collider.convex&&!collider.isTrigger,"solid convex physical piece");
                            Check(collider.sharedMesh==collider.GetComponent<MeshFilter>().sharedMesh,"render and collision use same mesh");
                        }
                    }
                    table.Throw(count);for(int step=0;step<650&&table.Throwing;step++)table.Tick(.1f,false);
                    Check(!table.Throwing&&table.Value.HasValue&&table.Value>=1&&table.Value<=count,"themed physical throw "+theme.Id+" d"+count+": "+table.Result);rolls++;
                }
                themes++;
            }
            Check(themes==31&&families.Count==7,"all icon sets and shape families tested");
        }
        Check(UnityEngine.Object.FindObjectsByType<Rigidbody>(FindObjectsSortMode.None).Length==bodies,"no rigidbody leaks");
        Debug.Log("VTT_DICE_PASS: "+checks+" face orientations/topology/convexity/equal areas; "+rolls+" real local-physics throws; d100 pair, PNG rendering and cleanup");
    }
    private static void SaveImage(RenderTexture source,string path,bool classic=true)
    {
        var previous=RenderTexture.active;var image=new Texture2D(source.width,source.height,TextureFormat.RGB24,false);
        try {
            RenderTexture.active=source;image.ReadPixels(new Rect(0,0,source.width,source.height),0,0);image.Apply();
            int blue=0,gold=0;foreach(var pixel in image.GetPixels32()) {
                if(pixel.b>pixel.r*1.3f&&pixel.b>pixel.g*1.1f&&pixel.b>100)blue++;
                if(pixel.r>220&&pixel.g>180&&pixel.b<230)gold++;
            }
            Check(!classic||blue>80,"actual rendered blue die pixels="+blue+", gold="+gold+": "+path);
            Check(gold>8,"actual rendered number pixels="+gold+", blue="+blue+": "+path);
            File.WriteAllBytes(path,image.EncodeToPNG());
        }finally { RenderTexture.active=previous;UnityEngine.Object.DestroyImmediate(image); }
    }
}
