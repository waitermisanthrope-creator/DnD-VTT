using System;
using System.Linq;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.Rendering;
using UnityEngine.Rendering.Universal;

namespace DndVtt.UnityPrototype
{
    // Local physics scene: dice cannot collide with, simulate or modify the user's map.
    public sealed class DiceTable : IDisposable
    {
        private sealed class Die { public DiceGeometry geometry;public Rigidbody body;public bool tens,units;public int resolved; }
        private readonly Scene scene;
        private readonly PhysicsScene physics;
        private readonly GameObject root;
        private readonly Camera camera;
        private readonly List<UnityEngine.Object> owned=new List<UnityEngine.Object>();
        private readonly List<Die> dice=new List<Die>();
        private readonly Dictionary<int,DiceGeometry> shapes=new Dictionary<int,DiceGeometry>();
        private readonly Dictionary<int,Mesh> bodyMeshes=new Dictionary<int,Mesh>();
        private readonly Dictionary<int,List<Mesh>> ornamentMeshes=new Dictionary<int,List<Mesh>>();
        private readonly Dictionary<int,Mesh> ornamentRenderMeshes=new Dictionary<int,Mesh>();
        private readonly Dictionary<int,Mesh> edgeRenderMeshes=new Dictionary<int,Mesh>();
        private readonly List<Mesh> geometryAssets=new List<Mesh>();
        public int CachedMeshCount=>geometryAssets.Count;
        private readonly Material surface,numerals;
        private readonly List<TextMesh> numberLabels=new List<TextMesh>();
        private readonly PhysicsMaterial contact;
        private readonly Font font;
        private readonly Vector3 origin=new Vector3(12000,0,12000);
        private float accumulator,elapsed,still;
        private bool imageDirty=true;
        private int retry,sides=20;
        private DiceTheme theme;
        private Texture2D themeTexture;
        public string ActiveThemeId=>theme?.Id??"";
        public bool HasMaterialTexture=>themeTexture!=null;
        private int tableResourceCount;
        public int PhysicalOrnamentCount { get;private set; }
        private DiceRollRequest request;
        private int[] batch;
        private bool nextBatch;
        public bool Throwing=>Rolling||nextBatch;
        public System.Numerics.BigInteger Completed=>request?.Completed??System.Numerics.BigInteger.Zero;
        public System.Numerics.BigInteger Requested=>request?.Count??System.Numerics.BigInteger.Zero;
        public System.Numerics.BigInteger Total=>request?.Total??System.Numerics.BigInteger.Zero;
        public RenderTexture Image { get;private set; }
        public bool Rolling { get;private set; }
        public string Result { get;private set; }="Выберите кубик и бросьте его на стол.";
        public int? Value { get;private set; }
        public int BodyCount=>dice.Count;
        public DiceTable()
        {
            scene=SceneManager.CreateScene("VttDice-"+Guid.NewGuid().ToString("N"),new CreateSceneParameters(LocalPhysicsMode.Physics3D));physics=scene.GetPhysicsScene();
            try {
            root=new GameObject("Dice table");SceneManager.MoveGameObjectToScene(root,scene);root.transform.position=origin;
            Shader shader=Resources.Load<Shader>("Dice/DiceSurface");if(!shader)throw new InvalidOperationException("Не найден шейдер дайсов");
            surface=new Material(shader);owned.Add(surface);
            contact=new PhysicsMaterial("Dice contact") { dynamicFriction=.65f,staticFriction=.7f,bounciness=.26f,frictionCombine=PhysicsMaterialCombine.Average,bounceCombine=PhysicsMaterialCombine.Average };owned.Add(contact);
            font=Resources.GetBuiltinResource<Font>("LegacyRuntime.ttf");font.RequestCharactersInTexture("0123456789.",64,FontStyle.Normal);
            Shader textShader=Resources.Load<Shader>("Dice/DiceNumeral");if(!textShader)throw new InvalidOperationException("Не найден шейдер цифр");
            numerals=new Material(textShader) { mainTexture=font.material.mainTexture };owned.Add(numerals);
            Box("Сукно",new Vector3(0,-.18f,0),new Vector3(7,.35f,5.6f),new Color(.035f,.16f,.14f));
            Box("Борт",new Vector3(-3.55f,.6f,0),new Vector3(.3f,1.6f,5.9f),new Color(.36f,.21f,.08f));
            Box("Борт",new Vector3(3.55f,.6f,0),new Vector3(.3f,1.6f,5.9f),new Color(.36f,.21f,.08f));
            Box("Борт",new Vector3(0,.6f,-2.85f),new Vector3(7.4f,1.6f,.3f),new Color(.36f,.21f,.08f));
            Box("Борт",new Vector3(0,.6f,2.85f),new Vector3(7.4f,1.6f,.3f),new Color(.36f,.21f,.08f));
            var view=Child("Dice camera");camera=view.AddComponent<Camera>();camera.enabled=false;camera.gameObject.AddComponent<UniversalAdditionalCameraData>().renderPostProcessing=false;camera.clearFlags=CameraClearFlags.SolidColor;camera.backgroundColor=new Color(.025f,.035f,.045f);camera.cullingMask=1<<31;
            camera.transform.localPosition=new Vector3(0,9,-6);camera.transform.LookAt(origin);camera.orthographic=true;camera.orthographicSize=4;camera.nearClipPlane=.1f;camera.farClipPlane=30;
            Image=new RenderTexture(768,640,16,RenderTextureFormat.ARGB32) { name="Dice view",antiAliasing=1 };Image.Create();camera.targetTexture=Image;camera.aspect=768f/640;
            tableResourceCount=owned.Count;Preview(20);
            }catch { Dispose();throw; }
        }
        private GameObject Child(string name)
        {
            var go=new GameObject(name) { layer=31 };go.transform.SetParent(root.transform,false);return go;
        }
        private void Box(string name,Vector3 position,Vector3 scale,Color color)
        {
            var go=GameObject.CreatePrimitive(PrimitiveType.Cube);go.name=name;go.layer=31;go.transform.SetParent(root.transform,false);go.transform.localPosition=position;go.transform.localScale=scale;
            var material=new Material(surface) { color=color };owned.Add(material);go.GetComponent<Renderer>().sharedMaterial=material;go.GetComponent<Collider>().sharedMaterial=contact;
            if(name=="Борт") { var wall=go.GetComponent<BoxCollider>();wall.size=new Vector3(1,4,1);wall.center=new Vector3(0,1.5f,0); }
        }
        private void ClearDice()
        {
            numberLabels.Clear();
            foreach(var die in dice)if(die.body) { die.body.gameObject.SetActive(false);UnityEngine.Object.DestroyImmediate(die.body.gameObject); }
            dice.Clear();PhysicalOrnamentCount=0;
            // Per-roll materials are separate from table assets and bounded shared shape meshes.
            for(int i=owned.Count-1;i>=tableResourceCount;i--) { UnityEngine.Object.DestroyImmediate(owned[i]);owned.RemoveAt(i); }
        }
        private void AddDie(int count,bool tens=false,bool units=false)
        {
            if(!shapes.TryGetValue(count,out var geometry)) { geometry=DiceGeometry.Create(count);shapes[count]=geometry; }
            if(!bodyMeshes.TryGetValue(count,out var mesh)) {
                mesh=theme?.Shape=="rounded"?geometry.BeveledMesh(.12f+theme.Length):geometry.Mesh();mesh.hideFlags=HideFlags.HideAndDontSave;bodyMeshes[count]=mesh;geometryAssets.Add(mesh);
            }
            var go=Child("d"+count);go.AddComponent<MeshFilter>().sharedMesh=mesh;
            var material=new Material(surface) { color=tens?new Color(.72f,.27f,.18f):new Color(.18f,.39f,.67f) };
            if(theme!=null) {
                ColorUtility.TryParseHtmlString(theme.Body,out var bodyColor);material.color=bodyColor;
                ColorUtility.TryParseHtmlString(theme.Trim,out var accent);material.SetColor("_Accent",accent);material.SetFloat("_Pattern",1);
                if(themeTexture) { material.SetTexture("_MainTex",themeTexture);material.SetFloat("_Textured",1);material.SetFloat("_Tile",theme.FaceTile);material.color=theme.TintTexture?bodyColor*3:Color.white; }
            }owned.Add(material);go.AddComponent<MeshRenderer>().sharedMaterial=material;
            var collider=go.AddComponent<MeshCollider>();collider.sharedMesh=mesh;collider.convex=true;collider.sharedMaterial=contact;
            if(theme!=null) {
                ColorUtility.TryParseHtmlString(theme.Trim,out var trimColor);
                var trim=new Material(surface) { color=trimColor };
                if(themeTexture) { trim.SetTexture("_MainTex",themeTexture);trim.SetFloat("_Textured",1);trim.SetFloat("_Tile",theme.TrimTile);trim.color=theme.TintTexture?trimColor:Color.white; }
                owned.Add(trim);
                if(!ornamentMeshes.TryGetValue(count,out var pieces)) {
                    pieces=DiceThemeGeometry.Build(geometry,theme);ornamentMeshes[count]=pieces;foreach(var piece in pieces)piece.hideFlags=HideFlags.HideAndDontSave;geometryAssets.AddRange(pieces);
                }
                foreach(var part in pieces) {
                    PhysicalOrnamentCount++;var ornament=Child("Physical "+theme.Shape);ornament.transform.SetParent(go.transform,false);
                    ornament.AddComponent<MeshFilter>().sharedMesh=part;
                    var collision=ornament.AddComponent<MeshCollider>();collision.sharedMesh=part;collision.convex=true;collision.sharedMaterial=contact;
                }
                if(pieces.Count>0) {
                    if(!ornamentRenderMeshes.TryGetValue(count,out var rendered)) {
                        rendered=new Mesh { name="Batched sculpted dice detail",hideFlags=HideFlags.HideAndDontSave };
                        var visible=themeTexture&&theme.TrimTile==2?pieces.Where(p=>p.name!="Dice metal edge").ToList():pieces;
                        var combine=new CombineInstance[visible.Count];for(int i=0;i<visible.Count;i++)combine[i]=new CombineInstance { mesh=visible[i],transform=Matrix4x4.identity };
                        rendered.CombineMeshes(combine,true,false);ornamentRenderMeshes[count]=rendered;geometryAssets.Add(rendered);
                    }
                    var detail=Child("Sculpted details");detail.transform.SetParent(go.transform,false);
                    detail.AddComponent<MeshFilter>().sharedMesh=rendered;detail.AddComponent<MeshRenderer>().sharedMaterial=trim;
                    if(themeTexture&&theme.TrimTile==2) {
                        if(!edgeRenderMeshes.TryGetValue(count,out var edges)) {
                            edges=new Mesh { name="Batched metallic dice edges",hideFlags=HideFlags.HideAndDontSave };
                            edges.CombineMeshes(pieces.Where(p=>p.name=="Dice metal edge").Select(p=>new CombineInstance { mesh=p,transform=Matrix4x4.identity }).ToArray(),true,false);
                            edgeRenderMeshes[count]=edges;geometryAssets.Add(edges);
                        }
                        var metal=new Material(trim);metal.SetFloat("_Tile",3);metal.color=theme.TintTexture?trimColor:Color.white;owned.Add(metal);
                        var edging=Child("Metal edges");edging.transform.SetParent(go.transform,false);edging.AddComponent<MeshFilter>().sharedMesh=edges;edging.AddComponent<MeshRenderer>().sharedMaterial=metal;
                    }
                }
            }
            var body=go.AddComponent<Rigidbody>();body.mass=.08f;body.linearDamping=.3f;body.angularDamping=.35f;body.maxAngularVelocity=30;body.collisionDetectionMode=CollisionDetectionMode.ContinuousDynamic;body.interpolation=RigidbodyInterpolation.None;body.solverIterations=12;body.solverVelocityIterations=6;
            foreach(var face in geometry.faces) {
                if(count==4) {
                    foreach(int vertex in face.vertices) {
                        int label=0;foreach(var opposite in geometry.faces)if(Array.IndexOf(opposite.vertices,vertex)<0) { label=opposite.value;break; }
                        Vector3 position=Vector3.Lerp(face.center,geometry.vertices[vertex],.52f)+face.normal*.004f;
                        Label(go.transform,label.ToString(),position,face.normal,(geometry.vertices[vertex]-face.center).normalized,.18f);
                    }
                }else {
                    int number=tens?(face.value%10)*10:units?face.value%10:face.value;
                    string text=tens?number.ToString("00"):number.ToString();if(text=="6"||text=="9")text+=".";
                    var up=(geometry.vertices[face.vertices[0]]-face.center).normalized;
                    Label(go.transform,text,face.center+face.normal*.004f,face.normal,up,count>=12?.22f:.3f);
                }
            }
            dice.Add(new Die { geometry=geometry,body=body,tens=tens,units=units });
        }
        private void Label(Transform parent,string text,Vector3 position,Vector3 normal,Vector3 up,float size)
        {
            var go=Child("Face "+text);go.transform.SetParent(parent,false);go.transform.localPosition=position;go.transform.localRotation=Quaternion.LookRotation(-normal,up);
            var label=go.AddComponent<TextMesh>();label.font=font;label.text=text;label.fontSize=64;label.characterSize=size/6;label.anchor=TextAnchor.MiddleCenter;label.alignment=TextAlignment.Center;label.color=themeTexture?new Color(1,.94f,.84f):new Color(1,.9f,.64f);
            var renderer=go.GetComponent<MeshRenderer>();renderer.sharedMaterial=numerals;numberLabels.Add(label);
            FitNumeral(label);
        }
        private void FitNumeral(TextMesh label)
        {
            // Recheck before rendering too: dynamic fonts may rebuild geometry/atlas later.
            float size=label.characterSize*6;var bounds=label.GetComponent<MeshRenderer>().localBounds.size;
            if(bounds.x>0&&bounds.y>0)label.transform.localScale=Vector3.one*Mathf.Min(size*1.2f/bounds.x,size/bounds.y);
        }
        public void SetTheme(DiceTheme selected)
        {
            if(Throwing)throw new InvalidOperationException("Дождитесь окончания броска.");
            ClearDice();ClearGeometryAssets();
            if(themeTexture)UnityEngine.Object.DestroyImmediate(themeTexture);themeTexture=null;theme=selected;
            if(selected?.TexturePng!=null) {
                themeTexture=new Texture2D(2,2,TextureFormat.RGB24,true) { name=selected.Id+" albedo",hideFlags=HideFlags.HideAndDontSave,filterMode=FilterMode.Trilinear,wrapMode=TextureWrapMode.Clamp };
                if(!themeTexture.LoadImage(selected.TexturePng,false)) { UnityEngine.Object.DestroyImmediate(themeTexture);themeTexture=null;throw new FormatException("Не удалось прочитать текстуру набора"); }
            }
            Preview(sides);
        }
        public void Preview(int count)
        {
            if(Throwing)return;request=null;batch=null;sides=count;ClearDice();Value=null;
            if(count==100) { AddDie(10,true);AddDie(10,false,true); }else AddDie(count);
            for(int i=0;i<dice.Count;i++) { var d=dice[i];d.body.isKinematic=true;d.body.position=origin+new Vector3((i-(dice.Count-1)*.5f)*1.6f,1,0);d.body.rotation=Quaternion.Euler(20,25,10);d.body.transform.SetPositionAndRotation(d.body.position,d.body.rotation); }
            FrameDice();
            Result=count==4?"d4: число у верхней вершины; результат по нижней грани.":count==100?"d100: десятки + единицы. 00 и 0 означают 100.":"d"+count+": результат по верхней грани.";Render();
        }
        public void Throw(int count) { Throw("1d"+count); }
        public void Throw(string expression)
        {
            if(Throwing)return;
            var parsed=DiceRollRequest.Parse(expression); // Invalid input preserves the last result.
            request=parsed;NextBatch();
        }
        private void NextBatch()
        {
            nextBatch=false;ClearDice();Value=null;batch=request.TakeBatch(theme==null?8:theme.Shape=="tentacles"&&theme.TexturePng!=null?2:4);
            foreach(int count in batch) {
                if(count==100) { AddDie(10,true);AddDie(10,false,true); }
                else AddDie(count);
            }
            retry=0;Launch();
        }
        public void Cancel()
        {
            Rolling=nextBatch=false;Value=null;
            foreach(var d in dice) { if(!d.body.isKinematic) { d.body.linearVelocity=Vector3.zero;d.body.angularVelocity=Vector3.zero;d.body.isKinematic=true; } }
            Result="Бросок отменён. Готово "+Completed+" из "+Requested+"; промежуточная сумма "+Total+". Это не полный результат.";
            imageDirty=true;
        }
        private void Launch(bool unresolvedOnly=false)
        {
            camera.orthographicSize=4;camera.transform.position=origin+new Vector3(0,9,-6);camera.transform.LookAt(origin);
            elapsed=still=accumulator=0;Rolling=true;Value=null;Result=(retry==0?"Кубики летят… ":"Неоднозначная грань — перебрасываем… ")+"Готово "+Completed+" / "+Requested+". Сумма: "+Total;
            int columns=theme==null?4:2,rows=(dice.Count+columns-1)/columns;float spacing=theme==null?1.7f:2.3f;
            for(int i=0;i<dice.Count;i++) {
                var die=dice[i];if(unresolvedOnly&&die.resolved>0)continue;
                die.resolved=0;var b=die.body;b.isKinematic=false;b.position=origin+new Vector3((i%columns-((Mathf.Min(dice.Count,columns)-1)*.5f))*spacing,2.1f,(i/columns-(rows-1)*.5f)*spacing);b.rotation=UnityEngine.Random.rotationUniform;
                b.linearVelocity=new Vector3(UnityEngine.Random.Range(-2.5f,2.5f),UnityEngine.Random.Range(1f,3f),UnityEngine.Random.Range(-2f,2f));b.angularVelocity=UnityEngine.Random.onUnitSphere*UnityEngine.Random.Range(12f,24f);b.WakeUp();
            }
        }
        public void Tick(float delta,bool render=true)
        {
            if(nextBatch)NextBatch();
            bool moved=Rolling;
            if(Rolling) {
                accumulator+=Mathf.Clamp(delta,0,.1f);
                while(accumulator>=1f/60) { physics.Simulate(1f/60);accumulator-=1f/60;elapsed+=1f/60;
                    bool quiet=true;foreach(var d in dice)if(d.body.linearVelocity.sqrMagnitude>.0144f||d.body.angularVelocity.sqrMagnitude>.0324f)quiet=false;
                    still=quiet?still+1f/60:0;
                    if(elapsed>.8f&&still>.6f) { Complete();break; }
                    if(elapsed>12) { RerollOrFail();break; }
                }
            }
            if(render&&(moved||imageDirty||!Image.IsCreated()))Render();
        }
        private void Complete()
        {
            bool ambiguous=false;
            foreach(var d in dice) {
                if(d.resolved==0)d.resolved=d.geometry.Read(d.body.rotation,out _,theme==null?.985f:.7f,theme==null?.025f:.04f);
                if(d.resolved==0)ambiguous=true;
                else { if(!d.body.isKinematic) { d.body.linearVelocity=Vector3.zero;d.body.angularVelocity=Vector3.zero;d.body.isKinematic=true; } }
            }
            if(ambiguous) { RerollOrFail();return; }
            var results=new List<int>();int percentile=0;
            foreach(var d in dice) {
                int value=d.resolved;
                if(d.tens)percentile=(value%10)*10;
                else if(d.units)results.Add(percentile+value%10==0?100:percentile+value%10);
                else results.Add(value);
            }
            FrameDice();Rolling=false;
            foreach(var d in dice) { if(!d.body.isKinematic) { d.body.linearVelocity=Vector3.zero;d.body.angularVelocity=Vector3.zero;d.body.isKinematic=true; } }
            if(request!=null) {
                for(int i=0;i<batch.Length;i++)request.Accept(batch[i],results[i]);
                nextBatch=request.Pending;
                if(!nextBatch&&request.Total<=int.MaxValue)Value=(int)request.Total;
                Result=(nextBatch?"Бросаем… ":"Готово: ")+Completed+" / "+Requested+". Сумма: "+Total+". "+request.Summary+". Последняя партия: "+string.Join(", ",System.Linq.Enumerable.Select(System.Linq.Enumerable.Range(0,results.Count),i=>"d"+batch[i]+"="+results[i]));
            }
        }

        private void RerollOrFail()
        {
#if UNITY_EDITOR
            foreach(var die in dice) {
                die.geometry.Read(die.body.rotation,out float alignment,theme==null?.985f:.7f,theme==null?.025f:.04f);
                Debug.Log("VTT_DICE_RETRY: theme="+(theme?.Id??"classic")+" d"+die.geometry.sides+" retry="+retry+" time="+elapsed+" quiet="+still+" alignment="+alignment+" linear="+die.body.linearVelocity.magnitude+" angular="+die.body.angularVelocity.magnitude+" resolved="+die.resolved);
            }
#endif
            if(++retry<=3) { Launch(true);return; }
            Rolling=nextBatch=false;Value=null;Result="Не удалось прочитать грань. Бросок прерван: "+Completed+" / "+Requested+"; промежуточная сумма "+Total+". Повторите бросок.";
            foreach(var d in dice)d.body.isKinematic=true;
        }
        private void FrameDice()
        {
            imageDirty=true;
            Vector3 center=Vector3.zero;foreach(var d in dice)center+=d.body.position;center/=dice.Count;
            float span=0;foreach(var d in dice)span=Mathf.Max(span,(d.body.position-center).magnitude);
            camera.orthographicSize=Mathf.Clamp(1.5f+span,1.5f,4);
            camera.transform.position=center+new Vector3(0,9,-6);camera.transform.LookAt(center);
        }
        private void Render()
        {
            if(!camera||!Image)return;
            if(numerals)numerals.mainTexture=font.material.mainTexture;
            foreach(var label in numberLabels)if(label)FitNumeral(label);
            if(!Image.IsCreated()&&!Image.Create())throw new InvalidOperationException("Не удалось восстановить 3D-стол");
            if(GraphicsSettings.currentRenderPipeline!=null)
                RenderPipeline.SubmitRenderRequest(camera,new UniversalRenderPipeline.SingleCameraRequest { destination=Image });
            else camera.Render();
            imageDirty=false;
        }
        private void ClearGeometryAssets()
        {
            foreach(var mesh in geometryAssets)if(mesh)UnityEngine.Object.DestroyImmediate(mesh);
            geometryAssets.Clear();shapes.Clear();bodyMeshes.Clear();ornamentMeshes.Clear();ornamentRenderMeshes.Clear();edgeRenderMeshes.Clear();
        }
        public void Dispose()
        {
            if(themeTexture)UnityEngine.Object.DestroyImmediate(themeTexture);themeTexture=null;
            if(camera)camera.targetTexture=null;
            if(root)UnityEngine.Object.DestroyImmediate(root);
            ClearGeometryAssets();
            foreach(var asset in owned)if(asset)UnityEngine.Object.DestroyImmediate(asset);owned.Clear();dice.Clear();
            if(Image) { Image.Release();UnityEngine.Object.DestroyImmediate(Image);Image=null; }
            if(scene.IsValid()&&scene.isLoaded) {
#if UNITY_EDITOR
                if(!Application.isPlaying)UnityEditor.SceneManagement.EditorSceneManager.CloseScene(scene,true);
                else SceneManager.UnloadSceneAsync(scene);
#else
                SceneManager.UnloadSceneAsync(scene);
#endif
            }
        }
    }
}
