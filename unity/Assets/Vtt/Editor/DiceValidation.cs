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
        UnityEngine.Random.InitState(10024);Debug.Log("VTT_DICE_TEST_SEED:10024");
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
            Check(shape.Read(Quaternion.FromToRotation(midpoint,count==4?Vector3.down:Vector3.up),out _,.94f)==0,"themed ambiguous edge rejected d"+count);
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
                table.SetTheme(theme);bool first=families.Add(theme.Shape);var checkedMeshes=new HashSet<Mesh>();
                foreach(int count in first?new[]{4,6,8,10,12,20,100}:new[]{20}) {
                    table.Preview(count);SaveImage(table.Image,Path.Combine(folder,theme.Id+"-d"+count+".png"),false);Check(theme.Shape=="rounded"||table.PhysicalOrnamentCount>0,"actual protrusion geometry "+theme.Id);
                    foreach(var body in UnityEngine.Object.FindObjectsByType<Rigidbody>(FindObjectsSortMode.None)) {
                        var colliders=body.GetComponentsInChildren<MeshCollider>();Check(colliders.Length>(theme.Shape=="rounded"?0:1),"physical collision "+theme.Id);
                        foreach(var collider in colliders) {
                            Check(collider.enabled&&collider.convex&&!collider.isTrigger&&collider.attachedRigidbody==body&&!Physics.GetIgnoreLayerCollision(collider.gameObject.layer,31),"solid enabled attached collision piece");
                            Check(collider.sharedMesh==collider.GetComponent<MeshFilter>().sharedMesh,"render and collision use same mesh");
                            Check((collider.sharedMesh.hideFlags&HideFlags.DontUnloadUnusedAsset)!=0,"cached procedural mesh survives unused-asset cleanup");
                            if(checkedMeshes.Add(collider.sharedMesh))CheckClosedConvex(collider.sharedMesh);
                        }
                    }
                    int cached=table.CachedMeshCount;Check(cached<=366,"bounded per-theme mesh cache");
                    table.Throw(count);for(int step=0;step<650&&table.Throwing;step++)table.Tick(.1f,false);
                    Check(table.CachedMeshCount==cached,"same shape reuses cooked collision meshes");
                    Check(!table.Throwing&&table.Value.HasValue&&table.Value>=1&&table.Value<=count,"themed physical throw "+theme.Id+" d"+count+": "+table.Result);rolls++;
                }
                if(first&&theme.Shape=="tentacles") {
                    table.Throw("7d20 + 3d6 + 1d8");
                    for(int step=0;step<2000&&table.Throwing;step++) { Check(table.BodyCount<=4,"themed mixed body budget");table.Tick(.1f,false); }
                    Check(!table.Throwing&&table.Completed==11&&table.Total>=11&&table.Total<=166,"mixed tentacle physical throw: "+table.Result);
                }
                themes++;
            }
            Check(themes==31&&families.Count==7,"all icon sets and shape families tested");
        }
        Check(UnityEngine.Object.FindObjectsByType<Rigidbody>(FindObjectsSortMode.None).Length==bodies,"no rigidbody leaks");
        Debug.Log("VTT_DICE_PASS: "+checks+" face orientations/topology/convexity/equal areas; "+rolls+" real local-physics throws; d100 pair, PNG rendering and cleanup");
    }
    private static void CheckClosedConvex(Mesh mesh)
    {
        var vertices=mesh.vertices;var triangles=mesh.triangles;
        var weld=new Dictionary<Vector3,int>();var ids=new int[vertices.Length];
        for(int i=0;i<vertices.Length;i++) {
            if(!weld.TryGetValue(vertices[i],out int id)) { id=weld.Count;weld[vertices[i]]=id; }ids[i]=id;
        }
        var edges=new Dictionary<string,int>();float volume=0;
        for(int i=0;i<triangles.Length;i+=3) {
            int a=triangles[i],b=triangles[i+1],c=triangles[i+2];
            Vector3 normal=Vector3.Cross(vertices[b]-vertices[a],vertices[c]-vertices[a]);
            Check(normal.sqrMagnitude>1e-16f,"nondegenerate collision triangle");normal.Normalize();
            foreach(var point in vertices)Check(Vector3.Dot(normal,point-vertices[a])<=.00002f,"convex outward collision plane");
            foreach(var pair in new[]{new[]{ids[a],ids[b]},new[]{ids[b],ids[c]},new[]{ids[c],ids[a]}}) {
                string key=Math.Min(pair[0],pair[1])+":"+Math.Max(pair[0],pair[1]);edges.TryGetValue(key,out int n);edges[key]=n+1;
            }
            volume+=Vector3.Dot(vertices[a],Vector3.Cross(vertices[b],vertices[c]))/6;
        }
        Check(volume>0&&edges.Values.All(n=>n==2)&&weld.Count-edges.Count+triangles.Length/3==2,"closed positive-volume collision mesh");
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
