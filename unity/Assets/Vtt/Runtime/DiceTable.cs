using System;
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
        private sealed class Die { public DiceGeometry geometry;public Rigidbody body;public bool tens,units; }
        private readonly Scene scene;
        private readonly PhysicsScene physics;
        private readonly GameObject root;
        private readonly Camera camera;
        private readonly List<UnityEngine.Object> owned=new List<UnityEngine.Object>();
        private readonly List<Die> dice=new List<Die>();
        private readonly Material surface;
        private readonly PhysicsMaterial contact;
        private readonly Font font;
        private readonly Vector3 origin=new Vector3(12000,0,12000);
        private float accumulator,elapsed,still;
        private bool imageDirty=true;
        private int retry,sides=20;
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
            Box("Сукно",new Vector3(0,-.18f,0),new Vector3(7,.35f,5.6f),new Color(.035f,.16f,.14f));
            Box("Борт",new Vector3(-3.55f,.6f,0),new Vector3(.3f,1.6f,5.9f),new Color(.36f,.21f,.08f));
            Box("Борт",new Vector3(3.55f,.6f,0),new Vector3(.3f,1.6f,5.9f),new Color(.36f,.21f,.08f));
            Box("Борт",new Vector3(0,.6f,-2.85f),new Vector3(7.4f,1.6f,.3f),new Color(.36f,.21f,.08f));
            Box("Борт",new Vector3(0,.6f,2.85f),new Vector3(7.4f,1.6f,.3f),new Color(.36f,.21f,.08f));
            var view=Child("Dice camera");camera=view.AddComponent<Camera>();camera.enabled=false;camera.gameObject.AddComponent<UniversalAdditionalCameraData>().renderPostProcessing=false;camera.clearFlags=CameraClearFlags.SolidColor;camera.backgroundColor=new Color(.025f,.035f,.045f);camera.cullingMask=1<<31;
            camera.transform.localPosition=new Vector3(0,9,-6);camera.transform.LookAt(origin);camera.orthographic=true;camera.orthographicSize=4;camera.nearClipPlane=.1f;camera.farClipPlane=30;
            Image=new RenderTexture(768,640,16,RenderTextureFormat.ARGB32) { name="Dice view",antiAliasing=1 };Image.Create();camera.targetTexture=Image;camera.aspect=768f/640;
            Preview(20);
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
        }
        private void ClearDice()
        {
            foreach(var die in dice)if(die.body) { die.body.gameObject.SetActive(false);UnityEngine.Object.DestroyImmediate(die.body.gameObject); }
            dice.Clear();
            // Per-roll meshes/materials are separate from the seven table resources.
            for(int i=owned.Count-1;i>=7;i--) { UnityEngine.Object.DestroyImmediate(owned[i]);owned.RemoveAt(i); }
        }
        private void AddDie(int count,bool tens=false,bool units=false)
        {
            var geometry=DiceGeometry.Create(count);var mesh=geometry.Mesh();owned.Add(mesh);
            var go=Child("d"+count);go.AddComponent<MeshFilter>().sharedMesh=mesh;
            var material=new Material(surface) { color=tens?new Color(.72f,.27f,.18f):new Color(.18f,.39f,.67f) };owned.Add(material);go.AddComponent<MeshRenderer>().sharedMaterial=material;
            var collider=go.AddComponent<MeshCollider>();collider.sharedMesh=mesh;collider.convex=true;collider.sharedMaterial=contact;
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
            var label=go.AddComponent<TextMesh>();label.font=font;label.text=text;label.fontSize=64;label.characterSize=size/6;label.anchor=TextAnchor.MiddleCenter;label.alignment=TextAlignment.Center;label.color=new Color(1,.9f,.64f);
            go.GetComponent<MeshRenderer>().sharedMaterial=font.material;
        }
        public void Preview(int count)
        {
            if(Rolling)return;sides=count;ClearDice();Value=null;
            if(count==100) { AddDie(10,true);AddDie(10,false,true); }else AddDie(count);
            for(int i=0;i<dice.Count;i++) { var d=dice[i];d.body.isKinematic=true;d.body.position=origin+new Vector3((i-(dice.Count-1)*.5f)*1.6f,1,0);d.body.rotation=Quaternion.Euler(20,25,10);d.body.transform.SetPositionAndRotation(d.body.position,d.body.rotation); }
            FrameDice();
            Result=count==4?"d4: число у верхней вершины; результат по нижней грани.":count==100?"d100: десятки + единицы. 00 и 0 означают 100.":"d"+count+": результат по верхней грани.";Render();
        }
        public void Throw(int count)
        {
            if(Rolling)return;Preview(count);retry=0;Launch();
        }
        private void Launch()
        {
            camera.orthographicSize=4;camera.transform.position=origin+new Vector3(0,9,-6);camera.transform.LookAt(origin);
            elapsed=still=accumulator=0;Rolling=true;Value=null;Result=retry==0?"Кубики летят…":"Кубик встал на ребро — перебрасываем…";
            for(int i=0;i<dice.Count;i++) {
                var b=dice[i].body;b.isKinematic=false;b.position=origin+new Vector3((i-(dice.Count-1)*.5f)*1.7f,2.1f+i*.3f,0);b.rotation=UnityEngine.Random.rotationUniform;
                b.linearVelocity=new Vector3(UnityEngine.Random.Range(-2.5f,2.5f),UnityEngine.Random.Range(1f,3f),UnityEngine.Random.Range(-2f,2f));b.angularVelocity=UnityEngine.Random.onUnitSphere*UnityEngine.Random.Range(12f,24f);b.WakeUp();
            }
        }
        public void Tick(float delta,bool render=true)
        {
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
            int total=0;var values=new List<string>();
            foreach(var d in dice) {
                int value=d.geometry.Read(d.body.rotation,out _);if(value==0) { RerollOrFail();return; }
                int displayed=d.tens?(value%10)*10:d.units?value%10:value;total+=displayed;values.Add(d.tens?displayed.ToString("00"):displayed.ToString());
            }
            if(sides==100&&total==0)total=100;
            FrameDice();
            Value=total;Result="d"+sides+": "+(sides==100?string.Join(" + ",values)+" = ":"")+total;Rolling=false;
            foreach(var d in dice) { d.body.linearVelocity=Vector3.zero;d.body.angularVelocity=Vector3.zero;d.body.isKinematic=true; }
        }
        private void RerollOrFail()
        {
            if(++retry<=3) { Launch();return; }
            Rolling=false;Value=null;Result="Кубик не лёг ровно. Нажмите «Бросить ещё раз».";
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
            if(!Image.IsCreated()&&!Image.Create())throw new InvalidOperationException("Не удалось восстановить 3D-стол");
            if(GraphicsSettings.currentRenderPipeline!=null)
                RenderPipeline.SubmitRenderRequest(camera,new UniversalRenderPipeline.SingleCameraRequest { destination=Image });
            else camera.Render();
            imageDirty=false;
        }
        public void Dispose()
        {
            if(camera)camera.targetTexture=null;
            if(root)UnityEngine.Object.DestroyImmediate(root);
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
