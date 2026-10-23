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
    public sealed partial class DiceTable : IDisposable
    {
        private sealed class Die { public DiceGeometry geometry;public Rigidbody body;public bool tens,units;public int resolved;public Vector3 settledPosition;public float lastImpact,lastHop,lastGuide,materialStart=-1;public float previousVertical;public int hops,guides;public DiceTentacles tentacles; }
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
        private float accumulator,elapsed,still,effectClock,settledClock;
        private readonly List<GameObject> effects=new List<GameObject>();
        public int EffectCount=>effects.Count;
        public string MaterialBehavior=>theme?.Behavior??"";
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
        private bool nextBatch,resultAccepted;
        public bool Throwing=>Rolling||nextBatch;
        public System.Numerics.BigInteger Completed=>request?.Completed??System.Numerics.BigInteger.Zero;
        public System.Numerics.BigInteger Requested=>request?.Count??System.Numerics.BigInteger.Zero;
        public System.Numerics.BigInteger Total=>request?.Total??System.Numerics.BigInteger.Zero;
        public RenderTexture Image { get;private set; }
        public bool Rolling { get;private set; }
        public string Result { get;private set; }="Выберите кубик и бросьте его на стол.";
        public int? Value { get;private set; }
        public int BodyCount=>dice.Count;
        public const int LiveBodyBudget=20;
        public int TentacleCount=>dice.Sum(d=>d.tentacles?.Count??0);
        public int TentaclePushes=>dice.Sum(d=>d.tentacles?.Pushes??0);
        public int SlimeHops=>dice.Sum(d=>d.hops);
        public int TowerGuides=>dice.Sum(d=>d.guides);
        private float throwStrength=.45f;
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
            BuildTray();
            var view=Child("Dice camera");camera=view.AddComponent<Camera>();camera.enabled=false;camera.gameObject.AddComponent<UniversalAdditionalCameraData>().renderPostProcessing=false;camera.clearFlags=CameraClearFlags.SolidColor;camera.backgroundColor=new Color(.025f,.035f,.045f);camera.cullingMask=1<<31;
            camera.transform.localPosition=new Vector3(0,9,-6);camera.transform.LookAt(origin);camera.orthographic=true;camera.orthographicSize=4;camera.nearClipPlane=.1f;camera.farClipPlane=50;
            Image=new RenderTexture(768,640,24,RenderTextureFormat.ARGB32) { name="Dice view",antiAliasing=1 };Image.Create();camera.targetTexture=Image;camera.aspect=768f/640;
            tableResourceCount=owned.Count;Preview(20);
            }catch { Dispose();throw; }
        }
        private GameObject Child(string name)
        {
            var go=new GameObject(name) { layer=31 };go.transform.SetParent(root.transform,false);return go;
        }
        private GameObject Box(string name,Vector3 position,Vector3 scale,Color color)
        {
            var go=GameObject.CreatePrimitive(PrimitiveType.Cube);go.name=name;go.layer=31;go.transform.SetParent(root.transform,false);go.transform.localPosition=position;go.transform.localScale=scale;
            var material=new Material(surface) { color=color };owned.Add(material);go.GetComponent<Renderer>().sharedMaterial=material;go.GetComponent<Collider>().sharedMaterial=contact;
            if(name=="Борт") { var wall=go.GetComponent<BoxCollider>();wall.size=new Vector3(1,8,1);wall.center=new Vector3(0,3.5f,0); }
            return go;
        }
        private void ClearDice()
        {
            numberLabels.Clear();resultAccepted=false;
            foreach(var effect in effects)if(effect)UnityEngine.Object.DestroyImmediate(effect);effects.Clear();settledClock=0;
            foreach(var die in dice)if(die.body) { die.body.gameObject.SetActive(false);UnityEngine.Object.DestroyImmediate(die.body.gameObject); }
            dice.Clear();PhysicalOrnamentCount=0;
            // Per-roll materials are separate from table assets and bounded shared shape meshes.
            for(int i=owned.Count-1;i>=tableResourceCount;i--) { UnityEngine.Object.DestroyImmediate(owned[i]);owned.RemoveAt(i); }
        }
        private void AddDie(int count,bool tens=false,bool units=false)
        {
            if(!shapes.TryGetValue(count,out var geometry)) { geometry=DiceGeometry.Create(count);shapes[count]=geometry; }
            int meshKey=count+(tens?100:units?200:0);
            if(!bodyMeshes.TryGetValue(meshKey,out var mesh)) {
                mesh=theme?.NumberedAtlas==true?geometry.Mesh(true,DiceGeometry.AtlasOffset(count,tens,units)):theme?.Shape=="rounded"?geometry.BeveledMesh(.12f+theme.Length):geometry.Mesh();mesh.hideFlags=HideFlags.HideAndDontSave;bodyMeshes[meshKey]=mesh;geometryAssets.Add(mesh);
            }
            var go=Child("d"+count);go.AddComponent<MeshFilter>().sharedMesh=mesh;
            var material=new Material(surface) { color=tens?new Color(.72f,.27f,.18f):new Color(.18f,.39f,.67f) };
            if(theme!=null) {
                ColorUtility.TryParseHtmlString(theme.Body,out var bodyColor);material.color=bodyColor;
                ColorUtility.TryParseHtmlString(theme.Trim,out var accent);material.SetColor("_Accent",accent);material.SetFloat("_Pattern",1);
                if(themeTexture) { material.SetTexture("_MainTex",themeTexture);material.SetFloat("_Textured",1);material.SetFloat("_Tile",theme.FaceTile);material.color=theme.TintTexture?bodyColor*3:Color.white; }
            if(theme.NumberedAtlas) { material.SetFloat("_Numbered",1);material.SetFloat("_Tile",-1);material.color=Color.white;material.SetFloat("_Gloss",theme.Behavior=="stone"?.05f:theme.Behavior=="vine"?.2f:.8f); }
            }owned.Add(material);go.AddComponent<MeshRenderer>().sharedMaterial=material;
            var collider=go.AddComponent<MeshCollider>();collider.sharedMesh=mesh;collider.convex=true;collider.sharedMaterial=contact;
            List<Mesh> softPieces=null;Material softMaterial=null;
            if(theme!=null) {
                ColorUtility.TryParseHtmlString(theme.Trim,out var trimColor);
                var trim=new Material(surface) { color=trimColor };
                if(themeTexture) { trim.SetTexture("_MainTex",themeTexture);trim.SetFloat("_Textured",1);trim.SetFloat("_Tile",theme.TrimTile);trim.color=theme.TintTexture?trimColor:Color.white; }
                if(theme.NumberedAtlas) { trim.SetFloat("_Numbered",1);trim.SetFloat("_Tile",80);trim.color=Color.white;trim.SetFloat("_Motion",0);trim.SetFloat("_Gloss",theme.Behavior=="stone"?.05f:.7f); }
                owned.Add(trim);
                if(!ornamentMeshes.TryGetValue(count,out var pieces)) {
                    pieces=DiceThemeGeometry.Build(geometry,theme);ornamentMeshes[count]=pieces;foreach(var piece in pieces)piece.hideFlags=HideFlags.HideAndDontSave;geometryAssets.AddRange(pieces);
                }
                bool soft=theme.Behavior=="abyss"&&theme.NumberedAtlas;
                if(soft) { softPieces=pieces;softMaterial=trim; }
                foreach(var part in pieces) {
                    if(soft&&part.name.StartsWith("Tentacle ",StringComparison.Ordinal))continue;
                    PhysicalOrnamentCount++;var ornament=Child("Physical "+theme.Shape);ornament.transform.SetParent(go.transform,false);
                    ornament.AddComponent<MeshFilter>().sharedMesh=part;
                    var collision=ornament.AddComponent<MeshCollider>();collision.sharedMesh=part;collision.convex=true;collision.sharedMaterial=contact;
                }
                if(pieces.Count>0) {
                    if(!ornamentRenderMeshes.TryGetValue(count,out var rendered)) {
                        rendered=new Mesh { name="Batched sculpted dice detail",hideFlags=HideFlags.HideAndDontSave };
                        var visible=pieces.Where(p=>(!soft||!p.name.StartsWith("Tentacle ",StringComparison.Ordinal))&&(soft||!(themeTexture&&theme.TrimTile==2)||p.name!="Dice metal edge")).ToList();
                        var combine=new CombineInstance[visible.Count];for(int i=0;i<visible.Count;i++)combine[i]=new CombineInstance { mesh=visible[i],transform=Matrix4x4.identity };
                        rendered.CombineMeshes(combine,true,false);ornamentRenderMeshes[count]=rendered;geometryAssets.Add(rendered);
                    }
                    var detail=Child("Sculpted details");detail.transform.SetParent(go.transform,false);
                    detail.AddComponent<MeshFilter>().sharedMesh=rendered;detail.AddComponent<MeshRenderer>().sharedMaterial=trim;
                    if(themeTexture&&theme.TrimTile==2&&!soft) {
                        if(!edgeRenderMeshes.TryGetValue(count,out var edges)) {
                            edges=new Mesh { name="Batched metallic dice edges",hideFlags=HideFlags.HideAndDontSave };
                            edges.CombineMeshes(pieces.Where(p=>p.name=="Dice metal edge").Select(p=>new CombineInstance { mesh=p,transform=Matrix4x4.identity }).ToArray(),true,false);
                            edgeRenderMeshes[count]=edges;geometryAssets.Add(edges);
                        }
                        var metal=new Material(trim);metal.SetFloat("_Tile",theme.NumberedAtlas?80:3);metal.SetFloat("_Motion",0);metal.color=theme.TintTexture?trimColor:Color.white;owned.Add(metal);
                        var edging=Child("Metal edges");edging.transform.SetParent(go.transform,false);edging.AddComponent<MeshFilter>().sharedMesh=edges;edging.AddComponent<MeshRenderer>().sharedMaterial=metal;
                    }
                }
            }
            var body=go.AddComponent<Rigidbody>();body.mass=.08f;body.linearDamping=.3f;body.angularDamping=.35f;body.maxAngularVelocity=30;body.collisionDetectionMode=CollisionDetectionMode.ContinuousDynamic;body.interpolation=RigidbodyInterpolation.None;body.solverIterations=12;body.solverVelocityIterations=6;
            if(theme?.Behavior=="ice") { body.linearDamping=.05f;body.angularDamping=.1f; }
            if(theme?.Behavior=="stone")body.mass=.16f;
            if(theme?.Behavior=="slime") { body.linearDamping=.025f;body.angularDamping=.08f; }
            if(theme?.NumberedAtlas!=true)foreach(var face in geometry.faces) {
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
            var die=new Die { geometry=geometry,body=body,tens=tens,units=units };
            if(softPieces!=null)die.tentacles=new DiceTentacles(geometry,softPieces,go.transform,softMaterial,SupportHeight,owned);
            dice.Add(die);
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
            contact.dynamicFriction=selected?.Behavior=="ice"?.025f:.65f;contact.staticFriction=selected?.Behavior=="ice"?.035f:.7f;
            contact.frictionCombine=selected?.Behavior=="ice"?PhysicsMaterialCombine.Minimum:PhysicsMaterialCombine.Average;
            contact.bounciness=selected?.Behavior=="slime"?.88f:selected?.Behavior=="stone"?.12f:.26f;
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
        public void Throw(string expression,float strength=.45f)
        {
            if(Throwing)return;
            var parsed=DiceRollRequest.Parse(expression); // Invalid input preserves the last result.
            throwStrength=Mathf.Clamp01(strength);request=parsed;NextBatch();
        }
        private void NextBatch()
        {
            nextBatch=false;ClearDice();Value=null;batch=request.TakeBatch(LiveBodyBudget);
            foreach(int count in batch) {
                if(count==100) { AddDie(10,true);AddDie(10,false,true); }
                else AddDie(count);
            }
            retry=0;Launch();
        }
        public void Cancel()
        {
            Rolling=nextBatch=resultAccepted=false;Value=null;
            foreach(var d in dice) { if(!d.body.isKinematic) { d.body.linearVelocity=Vector3.zero;d.body.angularVelocity=Vector3.zero;d.body.isKinematic=true; } }
            Result="Бросок отменён. Готово "+Completed+" из "+Requested+"; промежуточная сумма "+Total+". Это не полный результат.";
            imageDirty=true;
        }
        public void Shake(float strength)
        {
            if(!Rolling)return; // An accepted result is never changed by phone movement.
            float impulse=Mathf.Clamp01(strength);
            foreach(var d in dice)if(d.resolved==0&&!d.body.isKinematic) {
                d.body.AddForce(new Vector3(UnityEngine.Random.Range(-1f,1f),1.3f,UnityEngine.Random.Range(-1f,1f))*impulse*2,ForceMode.VelocityChange);
                d.body.AddTorque(UnityEngine.Random.onUnitSphere*impulse*8,ForceMode.VelocityChange);d.body.WakeUp();
            }
            still=0;
        }
        private void Launch(bool unresolvedOnly=false)
        {
            FrameTray();
            elapsed=still=accumulator=0;Rolling=true;Value=null;Result=(retry==0?"Кубики летят… ":"Неоднозначная грань — перебрасываем… ")+"Готово "+Completed+" / "+Requested+". Сумма: "+Total;
            int columns=5,rows=(dice.Count+columns-1)/columns;float spacing=1.85f;
            for(int i=0;i<dice.Count;i++) {
                var die=dice[i];if(unresolvedOnly&&die.resolved>0)continue;
                die.resolved=0;die.lastImpact=die.lastHop=die.lastGuide=0;die.hops=die.guides=0;die.materialStart=-1;die.tentacles?.Reset();var b=die.body;b.isKinematic=false;b.rotation=UnityEngine.Random.rotationUniform;
                PlaceLaunch(b,i,columns,rows,spacing,unresolvedOnly);
                b.linearVelocity=new Vector3(UnityEngine.Random.Range(-2.5f,2.5f),UnityEngine.Random.Range(1f,3f),UnityEngine.Random.Range(-2f,2f));b.linearVelocity*=.65f+throwStrength*1.3f;
                if(unresolvedOnly)b.linearVelocity=new Vector3(b.linearVelocity.x*.12f,b.linearVelocity.y,b.linearVelocity.z*.12f);
                else if(IsTower)b.linearVelocity=new Vector3(b.linearVelocity.x*.08f,.3f,b.linearVelocity.z*.08f);
                b.angularVelocity=UnityEngine.Random.onUnitSphere*UnityEngine.Random.Range(12f,24f)*(.65f+throwStrength);b.WakeUp();
            }
        }
        public void Tick(float delta,bool render=true)
        {
            effectClock+=Mathf.Clamp(delta,0,.1f);
            if(nextBatch)NextBatch();
            bool moved=Rolling;
            if(Rolling) {
                accumulator+=Mathf.Clamp(delta,0,.1f);
                while(accumulator>=1f/60) {
                    foreach(var d in dice)if(d.resolved==0) {
                        GuideTower(d);
                        if((MaterialBehavior=="abyss"||MaterialBehavior=="slime")&&d.materialStart<0) {
                            float support=SupportHeight(d.body.position);
                            if(d.body.position.y-support<.85f&&(!IsTower||support<=origin.y+FloorHeight+.18f))d.materialStart=elapsed;
                        }
                        float age=d.materialStart<0?-1:elapsed-d.materialStart;
                        d.tentacles?.Step(effectClock,age,age>=0);
                        // Capture incoming speed only; restitution supplies all bounce energy.
                        d.previousVertical=d.body.linearVelocity.y;
                    }
                    physics.Simulate(1f/60);accumulator-=1f/60;elapsed+=1f/60;
                    bool quiet=true;foreach(var d in dice) {
                        if(d.body.linearVelocity.sqrMagnitude>.0144f||d.body.angularVelocity.sqrMagnitude>.0324f)quiet=false;
                        if(d.resolved==0) {
                            if(IsTower&&SupportHeight(d.body.position)>origin.y+FloorHeight+.18f)quiet=false;
                            if(MaterialBehavior=="abyss"&&(d.materialStart<0||elapsed-d.materialStart<4.8f))quiet=false;
                            if(MaterialBehavior=="slime"&&d.previousVertical<-.5f&&d.body.linearVelocity.y>.5f&&elapsed-d.lastHop>.08f) { d.hops++;d.lastHop=elapsed; }
                        }
                        // Detect meaningful floor contacts without global MonoBehaviour callbacks.
                        if((theme?.Behavior=="blood"||theme?.Behavior=="stone")&&d.body.position.y-SupportHeight(d.body.position)<.85f&&d.body.linearVelocity.y>.15f&&elapsed-d.lastImpact>.22f) { SpawnImpact(d);d.lastImpact=elapsed; }
                    }
                    still=quiet?still+1f/60:0;
                    if(elapsed>.8f&&still>.6f) { Complete();break; }
                    if(elapsed>(IsTower?32:20)) { RerollOrFail();break; }
                }
            }
            AnimateMaterial(delta);
            bool animated=theme?.Behavior=="abyss"||theme?.Behavior=="slime"||theme?.Behavior=="vine"&&settledClock<1.6f||effects.Count>0&&settledClock<10.1f;
            if(render&&(moved||imageDirty||animated||!Image.IsCreated()))Render();
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
            FrameDice();Rolling=false;resultAccepted=true;settledClock=0;
            foreach(var die in dice)die.settledPosition=die.body.position;
            if(theme?.Behavior=="vine")foreach(var die in dice)GrowRoots(die);
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
                Debug.Log("VTT_DICE_RETRY: theme="+(theme?.Id??"classic")+" d"+die.geometry.sides+" retry="+retry+" time="+elapsed+" quiet="+still+" alignment="+alignment+" linear="+die.body.linearVelocity.magnitude+" angular="+die.body.angularVelocity.magnitude+" resolved="+die.resolved+" position="+(die.body.position-origin)+" support="+SupportHeight(die.body.position)+" guides="+die.guides);
            }
#endif
            if(++retry<=3) { Launch(true);return; }
            Rolling=nextBatch=resultAccepted=false;Value=null;Result="Не удалось прочитать грань. Бросок прерван: "+Completed+" / "+Requested+"; промежуточная сумма "+Total+". Повторите бросок.";
            foreach(var d in dice)d.body.isKinematic=true;
        }
        private void FrameDice()
        {
            imageDirty=true;
            Vector3 center=Vector3.zero;foreach(var d in dice)center+=d.body.position;center/=dice.Count;
            float span=0;foreach(var d in dice)span=Mathf.Max(span,(d.body.position-center).magnitude);
            camera.orthographicSize=Mathf.Clamp(1.5f+span,1.5f,7.5f);
            camera.transform.position=center+new Vector3(0,9,-6);camera.transform.LookAt(center);
            RevealDiceAtWalls();
        }
        private void Render()
        {
            if(!camera||!Image)return;
            if(numerals)numerals.mainTexture=font.material.mainTexture;
            foreach(var label in numberLabels)if(label) {
                FitNumeral(label);
                // Explicit orientation culling also protects old text overlays on mobile GPUs.
                label.GetComponent<MeshRenderer>().enabled=Vector3.Dot(-label.transform.forward,-camera.transform.forward)>.015f;
            }
            if(!Image.IsCreated()&&!Image.Create())throw new InvalidOperationException("Не удалось восстановить 3D-стол");
            if(GraphicsSettings.currentRenderPipeline!=null)
                RenderPipeline.SubmitRenderRequest(camera,new UniversalRenderPipeline.SingleCameraRequest { destination=Image });
            else camera.Render();
            imageDirty=false;
        }
        private void SpawnImpact(Die die)
        {
            int count=theme.Behavior=="blood"?3:5;
            for(int i=0;i<count&&effects.Count<48;i++) {
                var drop=Child(theme.Behavior=="blood"?"Blood drop":"Stone dust");
                drop.AddComponent<MeshFilter>().sharedMesh=bodyMeshes.Values.First();
                var mat=new Material(surface) { color=theme.Behavior=="blood"?new Color(.3f,.005f,.012f):new Color(.36f,.34f,.3f) };owned.Add(mat);
                drop.AddComponent<MeshRenderer>().sharedMaterial=mat;
                float phase=effects.Count*2.39996f,r=.12f+(effects.Count%5)*.07f;
                drop.transform.localPosition=new Vector3(die.body.position.x-origin.x+Mathf.Cos(phase)*r,SupportHeight(die.body.position)-origin.y+.025f,die.body.position.z-origin.z+Mathf.Sin(phase)*r);
                drop.transform.localScale=theme.Behavior=="blood"?new Vector3(.11f,.012f,.09f):Vector3.one*.045f;
                effects.Add(drop);
            }
            imageDirty=true;
        }
        private void GrowRoots(Die die)
        {
            for(int i=0;i<5&&effects.Count<48;i++) {
                float angle=i*Mathf.PI*.4f;
                var rootMesh=DiceThemeGeometry.Root(Vector3.zero,angle);
                var rootGo=Child("Growing root");rootGo.AddComponent<MeshFilter>().sharedMesh=rootMesh;owned.Add(rootMesh);
                var mat=new Material(surface) { color=new Color(.18f,.25f,.065f) };owned.Add(mat);rootGo.AddComponent<MeshRenderer>().sharedMaterial=mat;
                rootGo.transform.localPosition=new Vector3(die.body.position.x-origin.x,SupportHeight(die.body.position)-origin.y+.04f,die.body.position.z-origin.z);rootGo.transform.localScale=Vector3.zero;effects.Add(rootGo);
            }
        }
        private void AnimateMaterial(float delta)
        {
            string behavior=theme?.Behavior??"";if(behavior=="")return;
            if(!Rolling)settledClock+=Mathf.Clamp(delta,0,.1f);
            foreach(var die in dice) {
                die.tentacles?.Animate(effectClock);
                foreach(var renderer in die.body.GetComponentsInChildren<MeshRenderer>()) {
                    var mat=renderer.sharedMaterial;if(mat.HasProperty("_Clock"))mat.SetFloat("_Clock",effectClock);
                    if(behavior=="slime"&&mat.HasProperty("_Squash"))mat.SetFloat("_Squash",Rolling?.045f*Mathf.Sin(effectClock*12):.035f*Mathf.Sin(settledClock*8)*Mathf.Exp(-settledClock*2));
                }

            }
            foreach(var effect in effects)if(effect) {
                if(behavior=="vine")effect.transform.localScale=Vector3.one*Mathf.Clamp01(settledClock/1.5f);
                else { var renderer=effect.GetComponent<MeshRenderer>();float fade=Mathf.Clamp01(1-settledClock/(behavior=="blood"?10:3));renderer.enabled=fade>0; }
            }
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
            foreach(var asset in trayAssets)if(asset)UnityEngine.Object.DestroyImmediate(asset);trayAssets.Clear();trayObjects.Clear();
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
