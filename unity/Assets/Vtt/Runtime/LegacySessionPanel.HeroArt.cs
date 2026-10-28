using System;
using System.IO;
using Newtonsoft.Json.Linq;
using UnityEngine;

namespace DndVtt.UnityPrototype
{
    public sealed partial class LegacySessionPanel
    {
        private Texture2D heroArtTexture;
        private string heroArtId, heroArtData, heroArtError;
        private bool heroArt3D;
        private void ReleaseHeroArt()
        {
            ReleaseAppearanceTexture(heroArtTexture); heroArtTexture=null;
            heroArtId=heroArtData=heroArtError=null;
        }
        private static JObject NormalizeHeroArt(byte[] bytes)
        {
            var info=CharacterArt.Inspect(bytes);Texture2D source=null,small=null;
            try
            {
                source=new Texture2D(info.format=="bmp"?info.width:2,info.format=="bmp"?info.height:2,TextureFormat.RGBA32,false);
                if(info.format=="bmp") {source.LoadRawTextureData(CharacterArt.BmpRgba(bytes));source.Apply();}
                else if(!source.LoadImage(bytes,false)||source.width!=info.width||source.height!=info.height)
                    throw new FormatException("Не удалось декодировать изображение. Прежний арт сохранён.");
                int orientation=CharacterArt.JpegOrientation(bytes);bool swap=orientation>=5;
                float ratio=Mathf.Min(1f,(float)CharacterArt.Edge/Mathf.Max(source.width,source.height));
                int w=Mathf.Max(1,Mathf.RoundToInt((swap?source.height:source.width)*ratio)),h=Mathf.Max(1,Mathf.RoundToInt((swap?source.width:source.height)*ratio));
                byte[] encoded=null;
                while(true)
                {
                    ReleaseAppearanceTexture(small);small=new Texture2D(w,h,TextureFormat.RGB24,false);
                    var pixels=new Color32[w*h];
                    for(int y=0;y<h;y++)for(int x=0;x<w;x++)
                    {
                        float u=(x+.5f)/w,v=(y+.5f)/h;float sx=u,sy=v;
                        switch(orientation){case 2:sx=1-u;break;case 3:sx=1-u;sy=1-v;break;case 4:sy=1-v;break;case 5:sx=1-v;sy=1-u;break;case 6:sx=1-v;sy=u;break;case 7:sx=v;sy=u;break;case 8:sx=v;sy=1-u;break;}
                        Color c=source.GetPixelBilinear(sx,sy);
                        pixels[y*w+x]=Color.Lerp(new Color(.09f,.09f,.11f),new Color(c.r,c.g,c.b),c.a);
                    }
                    small.SetPixels32(pixels);small.Apply();
                    for(int quality=88;quality>=48;quality-=10){encoded=small.EncodeToJPG(quality);if(encoded.Length<=CharacterArt.StoredLimit)break;}
                    if(encoded.Length<=CharacterArt.StoredLimit)break;
                    w=Mathf.Max(1,w*3/4);h=Mathf.Max(1,h*3/4);
                }
                return new JObject{["version"]=1,["mime"]="image/jpeg",["data"]=Convert.ToBase64String(encoded)};
            }
            finally {ReleaseAppearanceTexture(source);ReleaseAppearanceTexture(small);}
        }
        private Texture2D HeroArtTexture(JObject hero)
        {
            string id=(string)hero["id"];var art=hero["heroArt"] as JObject;string data=art?["data"]?.Type==JTokenType.String?(string)art["data"]:null;
            if(id==heroArtId&&data==heroArtData)return heroArtTexture;
            ReleaseHeroArt();heroArtId=id;heroArtData=data;
            if(hero["heroArt"]==null)return null;
            try
            {
                var bytes=CharacterArt.StoredBytes(art);var size=CharacterArt.Inspect(bytes);
                heroArtTexture=new Texture2D(2,2,TextureFormat.RGBA32,false){name="Hero portrait",hideFlags=HideFlags.HideAndDontSave};
                if(!heroArtTexture.LoadImage(bytes,false)||heroArtTexture.width!=size.width||heroArtTexture.height!=size.height)throw new FormatException();
            }
            catch(Exception){ReleaseAppearanceTexture(heroArtTexture);heroArtTexture=null;heroArtError="Арт не удалось прочитать. Можно выбрать изображение заново.";}
            return heroArtTexture;
        }
        private void ImportHeroArt(string id,byte[] bytes)
        {
            var art=NormalizeHeroArt(bytes);var candidate=CharacterArt.WithArt(archive,id,art);
            CharacterSheetStore.Save(SavePath,candidate);archive=candidate;ReleaseHeroArt();
            status="Арт сохранён вместе с персонажем";
        }
        private void PickHeroArt(string id)
        {
            if(characterFileToken!=null)throw new InvalidOperationException("Сначала завершите выбор файла");
#if UNITY_ANDROID && !UNITY_EDITOR
            using var player=new AndroidJavaClass("com.unity3d.player.UnityPlayer");using var activity=player.GetStatic<AndroidJavaObject>("currentActivity");
            characterFileToken=Guid.NewGuid().ToString("N");characterFileOperation="art";characterArtTarget=id;
            try {using var bridge=new AndroidJavaClass("com.dndvtt.unityupdater.CharacterDocumentActivity");bridge.CallStatic("launch",activity,gameObject.name,characterFileToken,"art");}
            catch {characterFileToken=characterFileOperation=characterArtTarget=null;throw;}
#elif UNITY_STANDALONE_WIN && !UNITY_EDITOR
            string path=CharacterFiles.PickWindowsArt();if(path==null){status="Выбор арта отменён";return;}ImportHeroArt(id,CharacterArt.Read(path));
#else
            throw new PlatformNotSupportedException("Выбор арта доступен в приложении Android и Windows");
#endif
        }
        private void DrawHeroArt(JObject hero)
        {
            GUILayout.BeginVertical(GUI.skin.box);
            GUILayout.BeginHorizontal();
            if(MeasuredMenuButton("Арт",heroArt3D?GUI.skin.button:brandBlue,GUILayout.MinHeight(48)))heroArt3D=false;
            if(MeasuredMenuButton("3D · скоро",heroArt3D?brandBlue:GUI.skin.button,GUILayout.MinHeight(48)))heroArt3D=true;
            GUILayout.EndHorizontal();
            Texture2D art=HeroArtTexture(hero);
            float height=UiWidth>=900?320:Mathf.Clamp(UiHeight*.28f,190,320);
            Rect frame=GUILayoutUtility.GetRect(1,height,GUILayout.ExpandWidth(true));
            if(Event.current.type==EventType.Repaint)
            {
                GUI.DrawTexture(frame,Texture2D.whiteTexture,ScaleMode.StretchToFill,false,0,new Color(.055f,.055f,.07f),0,12);
                if(!heroArt3D&&art)GUI.DrawTexture(new Rect(frame.x+6,frame.y+6,frame.width-12,frame.height-12),art,ScaleMode.ScaleToFit);
                else GUI.Label(new Rect(frame.x+16,frame.y+height*.3f,frame.width-32,height*.6f),heroArt3D?"3D-модель\nСкоро появится здесь":heroArtError??"Здесь будет ваш герой\nЗагрузите его арт",sheetQuiet);
            }
            bool before=GUI.enabled;GUI.enabled=before&&characterFileToken==null;
            if(MeasuredMenuButton(art?"Заменить арт…":"Загрузить арт…",brandBlue,GUILayout.MinHeight(52)))Attempt(()=>PickHeroArt((string)hero["id"]));
            if(hero["heroArt"]!=null&&MeasuredMenuButton("Удалить арт",GUI.skin.button,GUILayout.MinHeight(48)))Attempt(()=>
            {
                var candidate=CharacterArt.WithArt(archive,(string)hero["id"],null);CharacterSheetStore.Save(SavePath,candidate);archive=candidate;ReleaseHeroArt();status="Арт удалён";
            });
            GUI.enabled=before;
            GUILayout.Label(characterFileToken!=null?"Ожидаем выбор файла…":"PNG · JPG · BMP. Сохраняется с героем.",sheetQuiet);
            GUILayout.EndVertical();
        }
    }
}
