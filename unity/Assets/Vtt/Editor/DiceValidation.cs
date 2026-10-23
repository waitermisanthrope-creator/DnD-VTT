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
    private static void ValidateComposer()
    {
        const System.Reflection.BindingFlags flags=System.Reflection.BindingFlags.Instance|System.Reflection.BindingFlags.NonPublic;
        var type=typeof(LegacySessionPanel);var host=new GameObject("Dice composer validation");
        try {
            var panel=host.AddComponent<LegacySessionPanel>();
            object Call(string name,params object[] args)=>type.GetMethod(name,flags).Invoke(panel,args);
            void Field(string name,object value)=>type.GetField(name,flags).SetValue(panel,value);
            var groups=(List<KeyValuePair<int,System.Numerics.BigInteger>>)type.GetField("diceGroups",flags).GetValue(panel);
            groups.Clear();
            foreach(var spec in new[]{new[]{5,7},new[]{1,3},new[]{2,1}}) {
                Call("AddDiceGroup",spec[0]);Field("diceQuantity",spec[1].ToString());Call("ApplyDiceQuantity");
            }
            Check((string)Call("DiceGroupExpression")=="7d20 + 3d6 + 1d8","button composer mixed request");
            Check(DiceRollRequest.Parse((string)Call("DiceGroupExpression")).Count==11,"composer uses existing batch protocol");
            Call("AddDiceGroup",5);Field("diceQuantity","999999999999999999999999999999");Call("ApplyDiceQuantity");
            Check(groups.Count==4&&groups[3].Value>long.MaxValue,"repeated die type and arbitrary precision quantity");
            Call("AddDiceGroup",6);Field("diceQuantity","0");Call("ApplyDiceQuantity");
            Check(groups[4].Value==1,"invalid quantity preserves existing group");
            Field("diceQuantity","");Call("ApplyDiceQuantity");Check(groups[4].Value==1,"empty quantity preserves group");
            Debug.Log("VTT_DICE_COMPOSER_PASS: mixed/repeated groups, huge quantities, invalid input preserves draft");
        }finally { UnityEngine.Object.DestroyImmediate(host); }
    }
    public static void Run()
    {
        ValidateComposer();
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
            Check(shape.Read(Quaternion.FromToRotation(midpoint,count==4?Vector3.down:Vector3.up),out _,.7f,.04f)==0,"themed ambiguous edge rejected d"+count);
            var mesh=shape.Mesh();Check(mesh.triangles.Length>0,"triangulated mesh");UnityEngine.Object.DestroyImmediate(mesh);
        }
        var tilted=DiceGeometry.Create(10);var supportPose=Quaternion.FromToRotation(new Vector3(-.644822f,-.399584f,.651565f),Vector3.up);
        Check(tilted.Read(supportPose,out _,.94f)==0,"flat-only rule rejects known tilted support");
        Check(tilted.Read(supportPose,out _,.7f,.04f)==8,"clear dominant numbered face on actual tentacle support plane");
        var vertexPose=Quaternion.FromToRotation(DiceGeometry.Create(20).vertices[0].normalized,Vector3.up);
        Check(DiceGeometry.Create(20).Read(vertexPose,out _,.7f,.04f)==0,"five-way vertex tie is not fabricated");
        ExpectedSceneCount=SceneManager.sceneCount;int bodies=UnityEngine.Object.FindObjectsByType<Rigidbody>(FindObjectsSortMode.None).Length;
        string folder=Path.Combine("Builds","DiceValidation");Directory.CreateDirectory(folder);
        int rolls=0;
        using(var table=new DiceTable()) {
            foreach(int count in new[]{4,6,8,10,12,20,100}) {
                table.Preview(count);if(count==20)CheckNumeralOcclusion(table);Check(table.BodyCount==(count==100?2:1),"bounded active dice");
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
            var catalog=WorkshopStore.Catalog(File.ReadAllText(Path.Combine(fixture,"catalog/v6/index.json")),"packs");
            int themes=0;var families=new HashSet<string>();
            foreach(JObject manifest in catalog) {
                if((string)manifest["imageKind"]!="dice")continue;
                string payload=Path.Combine(fixture,"packages",Path.GetFileName((string)manifest["url"]));WorkshopStore.Verify(manifest,payload);
                var data=WorkshopStore.ValidateData(manifest,File.ReadAllText(payload));var theme=DiceTheme.Read((JObject)data["diceThemes"][0],true);
                table.SetTheme(theme);Check(table.ActiveThemeId==theme.Id&&table.HasMaterialTexture,"downloaded material is active");bool first=families.Add(theme.Shape);var checkedMeshes=new HashSet<Mesh>();
                foreach(int count in first?new[]{4,6,8,10,12,20,100}:new[]{20}) {
                    table.Preview(count);if(count==20) { CheckNumeralOcclusion(table);if(theme.Icon.EndsWith(".01")||theme.Icon.EndsWith(".05"))CheckTexturedRender(table); }SaveImage(table.Image,Path.Combine(folder,theme.Id+"-d"+count+".png"),false);Check(theme.Shape=="rounded"||table.PhysicalOrnamentCount>0,"actual protrusion geometry "+theme.Id);
                    foreach(var body in UnityEngine.Object.FindObjectsByType<Rigidbody>(FindObjectsSortMode.None)) {
                        var colliders=body.GetComponentsInChildren<MeshCollider>();Check(colliders.Length>(theme.Shape=="rounded"?0:1),"physical collision "+theme.Id);
                        var sculpt=body.transform.Find("Sculpted details");
                        if(sculpt) {
                            var visual=sculpt.GetComponent<MeshFilter>().sharedMesh;
                            var edging=body.transform.Find("Metal edges");int edgeTriangles=edging?edging.GetComponent<MeshFilter>().sharedMesh.triangles.Length:0;
                            Check(visual.triangles.Length+edgeTriangles==colliders.Where(c=>c.gameObject!=body.gameObject).Sum(c=>c.sharedMesh.triangles.Length),"batched render retains every physical ornament triangle");
                            Check(sculpt.localPosition==Vector3.zero&&sculpt.localRotation==Quaternion.identity,"batched visual/collision poses agree");
                            Check(body.GetComponentsInChildren<MeshRenderer>().Length<=shapeRendererBudget(count),"bounded visual renderer count with raised cups");
                        }
                        foreach(var collider in colliders) {
                            Check(collider.enabled&&collider.convex&&!collider.isTrigger&&collider.attachedRigidbody==body&&!Physics.GetIgnoreLayerCollision(collider.gameObject.layer,31),"solid enabled attached collision piece");
                            Check(collider.sharedMesh==collider.GetComponent<MeshFilter>().sharedMesh,"collision uses the verified source mesh");
                            Check((collider.sharedMesh.hideFlags&HideFlags.DontUnloadUnusedAsset)!=0,"cached procedural mesh survives unused-asset cleanup");
                            if(checkedMeshes.Add(collider.sharedMesh))CheckClosedConvex(collider.sharedMesh);
                        }
                    }
                    int cached=table.CachedMeshCount;Check(cached<=1800,"bounded per-theme mesh cache");
                    table.Throw(count);
                    Check(table.ActiveThemeId==theme.Id&&table.HasMaterialTexture,"selected downloaded set persists into active throw");
                    foreach(var body in UnityEngine.Object.FindObjectsByType<Rigidbody>(FindObjectsSortMode.None).Where(b=>b.gameObject.name.StartsWith("d"))) {
                        var renderer=body.GetComponent<MeshRenderer>();Check(renderer&&renderer.sharedMaterial.GetFloat("_Textured")==1&&renderer.sharedMaterial.GetTexture("_MainTex")!=null,"actual moving body uses material texture");
                        Check(((Texture2D)renderer.sharedMaterial.GetTexture("_MainTex")).isReadable,"CPU texture pixels retained for Android context restoration");
                        Check(body.GetComponent<MeshFilter>().sharedMesh.uv.Length>0,"actual moving mesh has UVs");
                    }
                    for(int step=0;step<650&&table.Throwing;step++)table.Tick(.1f,false);
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
            var experimental=WorkshopStore.Catalog(File.ReadAllText(Path.Combine(fixture,"catalog/v7/index.json")),"packs");int experimentCount=0;
            foreach(JObject manifest in experimental.Where(m=>(string)m["version"]=="1.2.0"&&(string)m["imageKind"]=="dice")) {
                string payload=Path.Combine(fixture,"packages",Path.GetFileName((string)manifest["url"]));WorkshopStore.Verify(manifest,payload);
                var theme=DiceTheme.Read((JObject)WorkshopStore.ValidateData(manifest,File.ReadAllText(payload))["diceThemes"][0],true);table.SetTheme(theme);
                foreach(int count in new[]{4,6,8,10,12,20,100}) {
                    table.Preview(count);
                    Check(!UnityEngine.Object.FindObjectsByType<TextMesh>(FindObjectsSortMode.None).Any(),"numbered material has no floating text layers");
                    Check(table.MaterialBehavior==theme.Behavior,"actual profile selected");
                    if(count==20)CheckOpaqueShell(table);
                    SaveImage(table.Image,Path.Combine(folder,"test-"+theme.Behavior+"-d"+count+".png"),false);
                    table.Throw(count);
                    for(int step=0;step<1000&&table.Throwing;step++)table.Tick(.1f,false);
                    Check(table.Value.HasValue&&table.Completed==1,"experimental actual physical result "+theme.Behavior+" d"+count+": "+table.Result);rolls++;
                    int value=table.Value.Value;
                    if(count==20) {
                        table.Tick(.1f);SaveImage(table.Image,Path.Combine(folder,"test-"+theme.Behavior+"-settled-a.png"),false);
                        for(int i=0;i<20;i++)table.Tick(.1f,false);table.Tick(0);
                        SaveImage(table.Image,Path.Combine(folder,"test-"+theme.Behavior+"-settled-b.png"),false);
                        Check(table.Value==value&&table.Completed==1,"post-result animation never changes accepted value");
                        var bodiesNow=UnityEngine.Object.FindObjectsByType<Rigidbody>(FindObjectsSortMode.None).Where(b=>b.gameObject.name=="d20").ToArray();
                        if(theme.Behavior=="ice")Check(bodiesNow[0].GetComponent<Collider>().sharedMaterial.dynamicFriction<.04f&&bodiesNow[0].linearDamping<.1f,"ice has actual low-friction physics");
                        if(theme.Behavior=="vine")Check(table.EffectCount>=5,"actual post-result root meshes");
                        if(theme.Behavior=="blood"||theme.Behavior=="stone")Check(table.EffectCount>0&&table.EffectCount<=48,"bounded actual impact meshes");
                    }
                    Check(table.EffectCount<=48,"bounded effects for all die types");
                }
                table.Preview(20);Check(table.EffectCount==0,"old marks/roots cleared with next preview");experimentCount++;
            }
            Check(experimentCount==6,"six complete experimental sets");
            Debug.Log("VTT_DICE_EXPERIMENTS_PASS: six profiles,42 physical types including percentile pairs, opaque shell controls, immutable results, actual effect meshes and cleanup");
        }
        Check(UnityEngine.Object.FindObjectsByType<Rigidbody>(FindObjectsSortMode.None).Length==bodies,"no rigidbody leaks");
        Debug.Log("VTT_DICE_PASS: "+checks+" face orientations/topology/convexity/equal areas; "+rolls+" real local-physics throws; d100 pair, PNG rendering and cleanup");
    }
    private static void CheckOpaqueShell(DiceTable table)
    {
        var body=UnityEngine.Object.FindObjectsByType<Rigidbody>(FindObjectsSortMode.None).Single(b=>b.gameObject.name=="d20");
        var camera=UnityEngine.Object.FindObjectsByType<Camera>(FindObjectsSortMode.None).Single(c=>c.targetTexture==table.Image);
        var filter=body.GetComponent<MeshFilter>();var original=filter.sharedMesh;var mesh=UnityEngine.Object.Instantiate(original);filter.sharedMesh=mesh;
        var vertices=mesh.vertices;var triangles=mesh.triangles;var front=new List<int>();var rear=new List<int>();
        for(int i=0;i<triangles.Length;i+=3) {
            Vector3 n=body.transform.TransformDirection(Vector3.Cross(vertices[triangles[i+1]]-vertices[triangles[i]],vertices[triangles[i+2]]-vertices[triangles[i]]).normalized);
            var target=Vector3.Dot(n,-camera.transform.forward)>0?front:rear;target.AddRange(new[]{triangles[i],triangles[i+1],triangles[i+2]});
        }
        Check(front.Count>0&&rear.Count>0,"opaque shell positive controls exist");
        var render=typeof(DiceTable).GetMethod("Render",System.Reflection.BindingFlags.Instance|System.Reflection.BindingFlags.NonPublic);
        var previous=RenderTexture.active;var texture=new Texture2D(table.Image.width,table.Image.height,TextureFormat.RGB24,false);
        Color32[] Pixels() { RenderTexture.active=table.Image;texture.ReadPixels(new Rect(0,0,texture.width,texture.height),0,0);texture.Apply();return texture.GetPixels32(); }
        int Changed(Color32[] a,Color32[] b) { int count=0;for(int i=0;i<a.Length;i++)if(Math.Abs(a[i].r-b[i].r)+Math.Abs(a[i].g-b[i].g)+Math.Abs(a[i].b-b[i].b)>15)count++;return count; }
        try {
            var all=Pixels();mesh.SetTriangles(front,0);render.Invoke(table,null);int rearDifference=Changed(all,Pixels());
            Check(rearDifference<=4,"removing rear faces leaves opaque exterior identical; pixels="+rearDifference);
            mesh.SetTriangles(rear,0);render.Invoke(table,null);int frontDifference=Changed(all,Pixels());Check(frontDifference>1000,"removing front faces visibly removes the actual exterior");
            Debug.Log("VTT_DICE_OPAQUE_SHELL_PASS: "+table.MaterialBehavior+" rear="+rearDifference+" front="+frontDifference);
        }finally { filter.sharedMesh=original;UnityEngine.Object.DestroyImmediate(mesh);render.Invoke(table,null);RenderTexture.active=previous;UnityEngine.Object.DestroyImmediate(texture); }
    }
    private static void CheckNumeralOcclusion(DiceTable table)
    {
        var camera=UnityEngine.Object.FindObjectsByType<Camera>(FindObjectsSortMode.None).Single(c=>c.targetTexture==table.Image);
        var labels=UnityEngine.Object.FindObjectsByType<TextMesh>(FindObjectsSortMode.None).Where(t=>t.GetComponent<MeshRenderer>().sharedMaterial.shader.name=="DnDVtt/DiceNumeral").ToArray();
        var back=labels.Where(t=>Vector3.Dot(-t.transform.forward,-camera.transform.forward)<-.15f).Select(t=>t.GetComponent<MeshRenderer>()).ToArray();
        Check(labels.Length==20&&back.Length>=4,"real front/back facet numerals available for occlusion test");
        foreach(var text in labels) {
            var size=Vector3.Scale(text.GetComponent<MeshRenderer>().localBounds.size,text.transform.localScale);
            Check(size.x<=.265f&&size.y<=.221f,"d20 numerals fit within the facet");
        }
        var render=typeof(DiceTable).GetMethod("Render",System.Reflection.BindingFlags.Instance|System.Reflection.BindingFlags.NonPublic);
        var previous=RenderTexture.active;var image=new Texture2D(table.Image.width,table.Image.height,TextureFormat.RGB24,false);
        Color32[] Pixels() { RenderTexture.active=table.Image;image.ReadPixels(new Rect(0,0,image.width,image.height),0,0);image.Apply();return image.GetPixels32(); }
        try {
            var all=Pixels();foreach(var r in back)r.gameObject.SetActive(false);render.Invoke(table,null);var front=Pixels();
            int changed=0;for(int i=0;i<all.Length;i++)if(Math.Abs(all[i].r-front[i].r)+Math.Abs(all[i].g-front[i].g)+Math.Abs(all[i].b-front[i].b)>12)changed++;
            Check(changed<=4,"hidden back-face numerals must not appear through the body; pixels="+changed);
            foreach(var r in back)r.gameObject.SetActive(true);
            var visible=labels.Where(t=>Vector3.Dot(-t.transform.forward,-camera.transform.forward)>.5f).Select(t=>t.GetComponent<MeshRenderer>()).ToArray();
            Check(visible.Length>0,"front numerals available for positive control");foreach(var r in visible)r.gameObject.SetActive(false);render.Invoke(table,null);var hidden=Pixels();
            int frontChanged=0,highContrast=0;
            for(int i=0;i<all.Length;i++) {
                int difference=Math.Abs(all[i].r-hidden[i].r)+Math.Abs(all[i].g-hidden[i].g)+Math.Abs(all[i].b-hidden[i].b);
                if(difference>12)frontChanged++;if(difference>150)highContrast++;
            }
            Check(frontChanged>10,"visible front numerals must actually render; pixels="+frontChanged);
            Check(highContrast>50,"front numerals have sufficient actual image contrast; pixels="+highContrast);
            Debug.Log("VTT_DICE_NUMERAL_OCCLUSION_PASS: back labels="+back.Length+", back changed="+changed+", front control="+frontChanged+", high contrast="+highContrast);
        }finally { foreach(var text in labels)text.gameObject.SetActive(true);render.Invoke(table,null);RenderTexture.active=previous;UnityEngine.Object.DestroyImmediate(image); }
    }
    private static void CheckTexturedRender(DiceTable table)
    {
        var materials=UnityEngine.Object.FindObjectsByType<MeshRenderer>(FindObjectsSortMode.None).Select(r=>r.sharedMaterial).Where(m=>m&&m.HasProperty("_Textured")&&m.GetFloat("_Textured")==1).Distinct().ToArray();
        Check(materials.Length>0,"textured moving-body materials exist");
        var render=typeof(DiceTable).GetMethod("Render",System.Reflection.BindingFlags.Instance|System.Reflection.BindingFlags.NonPublic);
        var previous=RenderTexture.active;var image=new Texture2D(table.Image.width,table.Image.height,TextureFormat.RGB24,false);
        Color32[] Pixels() { RenderTexture.active=table.Image;image.ReadPixels(new Rect(0,0,image.width,image.height),0,0);image.Apply();return image.GetPixels32(); }
        try {
            var textured=Pixels();foreach(var m in materials)m.SetFloat("_Textured",0);render.Invoke(table,null);var plain=Pixels();
            int changed=0;for(int i=0;i<plain.Length;i++)if(Math.Abs(plain[i].r-textured[i].r)+Math.Abs(plain[i].g-textured[i].g)+Math.Abs(plain[i].b-textured[i].b)>40)changed++;
            Check(changed>1000,"GPU actually samples the downloaded art texture; changed pixels="+changed);
        }finally { foreach(var m in materials)m.SetFloat("_Textured",1);render.Invoke(table,null);RenderTexture.active=previous;UnityEngine.Object.DestroyImmediate(image); }
    }
    private static int shapeRendererBudget(int sides)=>sides==4?15:sides+3;
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
            int blue=0,gold=0,ivory=0;foreach(var pixel in image.GetPixels32()) {
                if(pixel.b>pixel.r*1.3f&&pixel.b>pixel.g*1.1f&&pixel.b>100)blue++;
                if(pixel.r>220&&pixel.g>180&&pixel.b<230)gold++;
                if(pixel.r>220&&pixel.g>180&&pixel.b>170)ivory++;
            }
            Check(!classic||blue>80,"actual rendered blue die pixels="+blue+", gold="+gold+": "+path);
            Check((classic?gold:ivory)>8,"actual rendered number pixels="+(classic?gold:ivory)+", blue="+blue+": "+path);
            File.WriteAllBytes(path,image.EncodeToPNG());
        }finally { RenderTexture.active=previous;UnityEngine.Object.DestroyImmediate(image); }
    }
}
