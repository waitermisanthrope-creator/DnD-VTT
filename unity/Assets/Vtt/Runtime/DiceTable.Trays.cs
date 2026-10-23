using System;
using System.Collections.Generic;
using UnityEngine;

namespace DndVtt.UnityPrototype
{
    public sealed partial class DiceTable
    {
        private DiceTray tray;
        private PhysicsMaterial rampContact;
        private readonly List<GameObject> trayObjects=new List<GameObject>();
        private readonly List<UnityEngine.Object> trayAssets=new List<UnityEngine.Object>();
        private readonly RaycastHit[] supportHits=new RaycastHit[24];
        public string ActiveTrayId=>tray?.Id??"";
        private bool IsTower=>tray?.Profile=="spiral"||tray?.Profile=="pit";
        private float FloorHeight=>tray?.Profile=="pit"?-.7f:0;
        public void SetTray(DiceTray selected)
        {
            if(Throwing)throw new InvalidOperationException("Дождитесь окончания броска.");
            ClearDice();
            foreach(var go in trayObjects)if(go)UnityEngine.Object.DestroyImmediate(go);trayObjects.Clear();
            foreach(var asset in trayAssets)if(asset)UnityEngine.Object.DestroyImmediate(asset);trayAssets.Clear();
            tray=selected;BuildTray();Preview(sides);FrameTray();Render();
        }
        private GameObject TrayBox(string name,Vector3 position,Vector3 size,Color color,Quaternion rotation=default)
        {
            // Tray assets have a separate lifetime from per-roll materials.
            int before=owned.Count;var go=Box(name,position,size,color);
            while(owned.Count>before) { trayAssets.Add(owned[before]);owned.RemoveAt(before); }
            if(rotation!=default)go.transform.localRotation=rotation;
            if(name=="Винтовая ступень"||name=="Наклонная ступень")go.GetComponent<Collider>().sharedMaterial=rampContact;
            trayObjects.Add(go);return go;
        }
        private void BuildTray()
        {
            rampContact=new PhysicsMaterial("Tower ramp") { dynamicFriction=.06f,staticFriction=.08f,frictionCombine=PhysicsMaterialCombine.Minimum,bounciness=.15f };trayAssets.Add(rampContact);
            Color floor=new Color(.035f,.16f,.14f),wall=new Color(.36f,.21f,.08f);
            if(tray!=null) { ColorUtility.TryParseHtmlString(tray.Floor,out floor);ColorUtility.TryParseHtmlString(tray.Wall,out wall); }
            int sides=tray?.Profile=="hexagon"?6:tray?.Profile=="octagon"?8:4;
            var ground=TrayBox("Tray floor",new Vector3(0,FloorHeight-.18f,0),new Vector3(12,.35f,10),floor);
            if(sides>4) {
                var prism=PolygonFloor(sides);trayAssets.Add(prism);
                ground.transform.localScale=Vector3.one;ground.GetComponent<MeshFilter>().sharedMesh=prism;
                UnityEngine.Object.DestroyImmediate(ground.GetComponent<BoxCollider>());
                var collision=ground.AddComponent<MeshCollider>();collision.sharedMesh=prism;collision.convex=true;collision.sharedMaterial=contact;
            }
            var print=PrintTexture(tray?.Print??"compass",floor);trayAssets.Add(print);
            var mat=ground.GetComponent<Renderer>().sharedMaterial;mat.SetTexture("_MainTex",print);mat.SetFloat("_Textured",1);mat.SetFloat("_Numbered",1);mat.SetFloat("_Tile",-1);mat.color=Color.white;
            if(sides>4) {
                // Walls and the complete printed floor follow the same polygon.
                for(int i=0;i<sides;i++) {
                    float a=i*2*Mathf.PI/sides,b=(i+1)*2*Mathf.PI/sides;
                    Vector3 p=new Vector3(Mathf.Cos(a)*6.2f,.65f,Mathf.Sin(a)*5.2f),q=new Vector3(Mathf.Cos(b)*6.2f,.65f,Mathf.Sin(b)*5.2f),d=q-p;
                    TrayBox("Борт",(p+q)*.5f,new Vector3(.23f,1.5f,d.magnitude+.12f),wall,Quaternion.LookRotation(d));
                }
            }else {
                TrayBox("Борт",new Vector3(-6.1f,.65f,0),new Vector3(.25f,1.5f,10.4f),wall);
                TrayBox("Борт",new Vector3(6.1f,.65f,0),new Vector3(.25f,1.5f,10.4f),wall);
                TrayBox("Борт",new Vector3(0,.65f,-5.1f),new Vector3(12.5f,1.5f,.25f),wall);
                TrayBox("Борт",new Vector3(0,.65f,5.1f),new Vector3(12.5f,1.5f,.25f),wall);
            }
            if(tray?.Profile=="pit") {
                // Open-front observation shaft, staggered sloping baffles and a recessed landing.
                TrayBox("Башня · стена",new Vector3(-2.8f,2.9f,1.8f),new Vector3(.2f,7,5.7f),wall);
                TrayBox("Башня · стена",new Vector3(2.8f,2.9f,1.8f),new Vector3(.2f,7,5.7f),wall);
                TrayBox("Башня · стена",new Vector3(0,2.9f,4.6f),new Vector3(5.8f,7,.2f),wall);
                for(int i=0;i<3;i++)TrayBox("Наклонная ступень",new Vector3(i%2==0?.85f:-.85f,4.8f-i*1.9f,1.8f),new Vector3(3.3f,.18f,5.3f),wall,Quaternion.Euler(0,0,i%2==0?23:-23));
            }
            if(tray?.Profile=="spiral") {
                // A continuous overlapping helical ramp: every visible tread is collidable.
                TrayBox("Опора винтовой башни",new Vector3(0,3.1f,1.7f),new Vector3(1.05f,6.2f,1.05f),wall);
                int steps=40;float start=-Mathf.PI*.5f;
                for(int i=0;i<steps;i++) {
                    float a=start+i*(Mathf.PI*2/steps),b=start+(i+1)*(Mathf.PI*2/steps);
                    Vector3 p=new Vector3(Mathf.Cos(a)*2.05f,6.3f-i*.14f,Mathf.Sin(a)*2.05f+1.7f),q=new Vector3(Mathf.Cos(b)*2.05f,6.3f-(i+1)*.14f,Mathf.Sin(b)*2.05f+1.7f);
                    Vector3 forward=q-p;var rotation=Quaternion.LookRotation(forward);
                    TrayBox("Винтовая ступень",(p+q)*.5f,new Vector3(2.35f,.14f,forward.magnitude+.08f),wall,rotation);
                    Vector3 outer=(p+q)*.5f+new Vector3(Mathf.Cos((a+b)*.5f),0,Mathf.Sin((a+b)*.5f))*1.2f;
                    TrayBox("Перила винтовой башни",outer+Vector3.up*.65f,new Vector3(.15f,1.3f,forward.magnitude+.15f),wall,rotation);
                }
            }
        }
        private static Mesh PolygonFloor(int sides)
        {
            var vertices=new List<Vector3>();var uv=new List<Vector2>();var triangles=new List<int>();
            void Vertex(Vector3 p) { vertices.Add(p);uv.Add(new Vector2(.5f+p.x/12.4f,.5f+p.z/10.4f)); }
            for(int cap=0;cap<2;cap++) {
                float y=cap==0?.175f:-.175f;int center=vertices.Count;Vertex(new Vector3(0,y,0));
                for(int i=0;i<sides;i++) { float a=i*2*Mathf.PI/sides;Vertex(new Vector3(Mathf.Cos(a)*6.2f,y,Mathf.Sin(a)*5.2f)); }
                for(int i=0;i<sides;i++) {
                    int a=center+1+i,b=center+1+(i+1)%sides;
                    triangles.AddRange(cap==0?new[]{center,b,a}:new[]{center,a,b});
                }
            }
            for(int i=0;i<sides;i++) {
                float a=i*2*Mathf.PI/sides,b=((i+1)%sides)*2*Mathf.PI/sides;int start=vertices.Count;
                Vector3 p=new Vector3(Mathf.Cos(a)*6.2f,0,Mathf.Sin(a)*5.2f),q=new Vector3(Mathf.Cos(b)*6.2f,0,Mathf.Sin(b)*5.2f);
                Vertex(p+Vector3.up*.175f);Vertex(p-Vector3.up*.175f);Vertex(q+Vector3.up*.175f);Vertex(q-Vector3.up*.175f);
                triangles.AddRange(new[]{start,start+3,start+1,start,start+2,start+3});
            }
            var mesh=new Mesh { name="Closed polygon tray floor" };mesh.SetVertices(vertices);mesh.SetUVs(0,uv);mesh.SetTriangles(triangles,0);mesh.RecalculateNormals();mesh.RecalculateBounds();return mesh;
        }
        private static Texture2D PrintTexture(string print,Color floor)
        {
            const int size=256;var pixels=new Color[size*size];
            for(int y=0;y<size;y++)for(int x=0;x<size;x++) {
                float u=(x-size*.5f)/(size*.5f),v=(y-size*.5f)/(size*.5f),r=Mathf.Sqrt(u*u+v*v),a=Mathf.Atan2(v,u);
                bool ink=print=="web"?Mathf.Abs(Mathf.Sin(a*8))<.055f||Mathf.Abs(Mathf.Sin(r*30))<.06f:print=="runes"?Mathf.Abs(Mathf.Sin((u+v)*18)*Mathf.Cos((u-v)*18))<.045f:print=="astral"?Mathf.Abs(r-(.55f+.16f*Mathf.Cos(a*5)))<.012f||Mathf.Abs(r-.86f)<.012f:Mathf.Abs(r-.72f)<.013f||Mathf.Abs(Mathf.Sin(a*4))<.035f&&r<.72f;
                pixels[y*size+x]=ink?Color.Lerp(floor,new Color(.75f,.61f,.32f),.55f):floor*(.94f+.06f*Mathf.Sin(x*2+y*3));
            }
            var texture=new Texture2D(size,size,TextureFormat.RGB24,true) { name="Tray print "+print,filterMode=FilterMode.Trilinear };texture.SetPixels(pixels);texture.Apply(true,false);return texture;
        }
        private float SupportHeight(Vector3 point)
        {
            float floor=origin.y+FloorHeight;
            int count=physics.Raycast(point+Vector3.up*.2f,Vector3.down,supportHits,1.1f,1<<31,QueryTriggerInteraction.Ignore);
            for(int i=0;i<count;i++)if(supportHits[i].rigidbody==null&&supportHits[i].normal.y>.25f)floor=Mathf.Max(floor,supportHits[i].point.y);
            return floor;
        }
        private void GuideTower(Die die)
        {
            if(!IsTower||die.body.isKinematic||elapsed-die.lastGuide<.8f||die.guides>=12||die.body.linearVelocity.sqrMagnitude>.12f||die.body.angularVelocity.sqrMagnitude>.5f)return;
            int count=physics.Raycast(die.body.position+Vector3.up*.2f,Vector3.down,supportHits,1.3f,1<<31,QueryTriggerInteraction.Ignore);
            RaycastHit support=default;float high=origin.y+FloorHeight+.18f;
            for(int i=0;i<count;i++)if(supportHits[i].rigidbody==null&&supportHits[i].normal.y>.25f&&supportHits[i].point.y>high) { support=supportHits[i];high=support.point.y; }
            if(support.collider==null)return;
            Vector3 downhill=Vector3.ProjectOnPlane(Vector3.down,support.normal).normalized;
            if(downhill.sqrMagnitude<.1f) {
                Vector3 local=die.body.position-origin;
                downhill=support.collider.name.StartsWith("Опора",StringComparison.Ordinal)?new Vector3(local.x,0,local.z-1.7f).normalized:new Vector3(-local.x,0,1.7f-local.z).normalized;
                if(downhill.sqrMagnitude<.1f)downhill=Vector3.back;
            }
            // A small physical release breaks a static bridge on the ramp. Never
            // rotate/teleport a die into a chosen value, and never touch accepted dice.
            die.body.AddForce(downhill*1.2f+Vector3.up*.65f,ForceMode.VelocityChange);
            die.body.AddTorque(UnityEngine.Random.onUnitSphere*2,ForceMode.VelocityChange);die.body.WakeUp();die.lastGuide=elapsed;die.guides++;
        }
        private void RevealDiceAtWalls(bool overview=false)
        {
            // Rendering only: physical containment and accepted body poses stay intact.
            foreach(var go in trayObjects) {
                if(!go||go.name!="Борт")continue;
                var wall=go.GetComponent<MeshRenderer>();wall.enabled=true;
                if(overview)continue;
                foreach(var die in dice) {
                    Bounds bounds=die.body.GetComponent<MeshRenderer>().bounds;
                    for(int corner=0;corner<8;corner++) {
                        Vector3 point=new Vector3((corner&1)==0?bounds.min.x:bounds.max.x,(corner&2)==0?bounds.min.y:bounds.max.y,(corner&4)==0?bounds.min.z:bounds.max.z);
                        Vector3 delta=point-camera.transform.position;
                        if(wall.bounds.IntersectRay(new Ray(camera.transform.position,delta.normalized),out float distance)&&distance<delta.magnitude-.02f) { wall.enabled=false;break; }
                    }
                    if(!wall.enabled)break;
                }
            }
        }
        private void FrameTray()
        {
            RevealDiceAtWalls(true);
            bool tower=tray?.Profile=="spiral"||tray?.Profile=="pit";
            bool tallStack=tray?.Profile=="spiral"&&dice.Count>6;
            camera.orthographicSize=tallStack?12:tower?10:8.5f;Vector3 target=origin+Vector3.up*(tallStack?5:tower?3:1.5f);
            camera.transform.position=target+new Vector3(0,11,-9);camera.transform.LookAt(target);imageDirty=true;
        }
        private void PlaceLaunch(Rigidbody body,int index,int columns,int rows,float spacing,bool retry)
        {
            bool tower=tray?.Profile=="spiral"||tray?.Profile=="pit";
            if(retry)body.position=origin+ClearLandingSpot(body);
            else if(!tower)body.position=origin+new Vector3((index%columns-(Mathf.Min(dice.Count,columns)-1)*.5f)*spacing,5f,(index/columns-(rows-1)*.5f)*spacing);
            else if(tray.Profile=="pit")body.position=origin+new Vector3((index%3-1)*1.35f,8.5f+index/9*1.5f,1.8f+(index/3%3-1)*1.35f);
            else body.position=origin+new Vector3((index%2-.5f)*1.25f,8.5f+index/2*1.25f,-.35f);
        }
        private Vector3 ClearLandingSpot(Rigidbody body)
        {
            Vector3 best=new Vector3(0,FloorHeight+5f,-3.8f);float score=-1;
            for(int x=0;x<9;x++)for(int z=0;z<7;z++) {
                Vector3 p=new Vector3(-4.8f+x*1.2f,FloorHeight+5f,-3.8f+z*(7.6f/6));
                if(p.x*p.x/25+p.z*p.z/16>1||IsTower&&Mathf.Abs(p.x)<3.5f&&p.z>-1.7f)continue;
                float nearest=100;
                foreach(var other in dice)if(other.body!=body) {
                    Vector3 delta=other.body.position-origin-p;delta.y=0;nearest=Mathf.Min(nearest,delta.sqrMagnitude);
                }
                if(nearest>score) { score=nearest;best=p; }
            }
            return best;
        }
    }
}
