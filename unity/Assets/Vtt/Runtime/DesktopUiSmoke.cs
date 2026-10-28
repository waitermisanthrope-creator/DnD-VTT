using System;
using System.Collections;
using System.IO;
using System.Reflection;
using System.Linq;
using UnityEngine;
using Newtonsoft.Json.Linq;

namespace DndVtt.UnityPrototype
{
    // Opt-in test of the installed Windows player with an actual graphics device.
    // The existing no-graphics migration test cannot detect invisible IMGUI text.
    public sealed class DesktopUiSmoke : MonoBehaviour
    {
        public static bool HideText, PortraitLayout;
        static bool running;
        static int buttonChecks, clippedButtons;
        static readonly System.Collections.Generic.Dictionary<string,Vector2> buttonPoints=new System.Collections.Generic.Dictionary<string,Vector2>();
        public static void RecordButton(string label, GUIStyle style, Rect rect)
        {
            if (!running || Event.current.type != EventType.Repaint) return;
            buttonChecks++;
            Vector2 point=GUIUtility.GUIToScreenPoint(rect.center);
            if(point.x>=0&&point.y>=0&&point.x<Screen.width&&point.y<Screen.height)buttonPoints[label]=point;
            float needed = style.CalcHeight(new GUIContent(label), rect.width);
            if (needed > rect.height + 1 || !style.wordWrap && style.CalcSize(new GUIContent(label)).x > rect.width + 1)
            {
                clippedButtons++;
                Debug.LogError("VTT_LABEL_CLIP_FAIL: " + label + " requires " + needed + " allocated " + rect.height);
            }
        }
        public static void RecordSingleLine(string label, GUIStyle style, Rect rect)
        {
            if(!running||Event.current.type!=EventType.Repaint)return;
            buttonChecks++;
            if(style.CalcSize(new GUIContent(label)).x>rect.width+1){clippedButtons++;Debug.LogError("VTT_LABEL_CLIP_FAIL: stat label "+label+" width "+rect.width);}
        }
        const BindingFlags Flags = BindingFlags.Instance | BindingFlags.NonPublic;
        string folder;
        LegacySessionPanel panel;
        JObject qaHeroArt;
        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.AfterSceneLoad)]
        static void Install()
        {
            if (Array.IndexOf(Environment.GetCommandLineArgs(), "--vtt-ui-smoke") >= 0)
            { running = true; new GameObject("Installed desktop UI validation").AddComponent<DesktopUiSmoke>(); }
        }
        static void Check(bool ok, string message) { if (!ok) throw new Exception("VTT_DESKTOP_UI_FAIL: " + message); }
        void Call(string method, params object[] args) => typeof(LegacySessionPanel).GetMethod(method, Flags).Invoke(panel, args);
        void Field(string name, object value) => typeof(LegacySessionPanel).GetField(name, Flags).SetValue(panel, value);
        void Fail(Exception error) { HideText = false; Debug.LogException(error); Application.Quit(1); }
#if UNITY_STANDALONE_WIN && !UNITY_EDITOR
        [System.Runtime.InteropServices.DllImport("user32.dll", CharSet=System.Runtime.InteropServices.CharSet.Unicode)]
        static extern IntPtr FindWindow(string kind, string title);
        [System.Runtime.InteropServices.DllImport("user32.dll")]
        static extern bool PostMessage(IntPtr window, uint message, IntPtr first, IntPtr second);
        [System.Runtime.InteropServices.StructLayout(System.Runtime.InteropServices.LayoutKind.Sequential)]
        struct NativePoint{public int x,y;}
        [System.Runtime.InteropServices.DllImport("user32.dll")] static extern IntPtr GetActiveWindow();
        [System.Runtime.InteropServices.DllImport("user32.dll")] static extern bool SetForegroundWindow(IntPtr window);
        [System.Runtime.InteropServices.DllImport("user32.dll")] static extern bool ClientToScreen(IntPtr window,ref NativePoint point);
        [System.Runtime.InteropServices.DllImport("user32.dll")] static extern bool SetCursorPos(int x,int y);
        [System.Runtime.InteropServices.DllImport("user32.dll")] static extern void mouse_event(uint flags,uint dx,uint dy,uint data,UIntPtr extra);
        IEnumerator ClickNativeButton(string label)
        {
            IntPtr window=IntPtr.Zero;
            try{window=GetActiveWindow();if(window==IntPtr.Zero)window=FindWindow("UnityWndClass",null);Check(window!=IntPtr.Zero,"Unity window for pointer input");SetForegroundWindow(window);}
            catch(Exception error){Fail(error);yield break;}
            yield return new WaitForSecondsRealtime(.3f);
            yield return new WaitForEndOfFrame();
            try
            {
                // Derive the hit target from the actual GPU image. GUIToScreenPoint
                // includes a Wine/IMGUI scroll offset and is not a client coordinate.
                Check(buttonPoints.ContainsKey(label),"visible native click target "+label);
                bool gold=label=="Опыт и уровень";Check(gold||label=="+ Заметка","supported visual pointer target");
                var capture=ScreenCapture.CaptureScreenshotAsTexture();
                int minX=Screen.width,minY=Screen.height,maxX=-1,maxY=-1,hits=0;
                try
                {
                    var pixels=capture.GetPixels32();
                    for(int y=80;y<capture.height;y++)for(int x=15;x<capture.width-15;x++)
                    {
                        var c=pixels[y*capture.width+x];
                        bool match=gold?c.r>=210&&c.r<=214&&c.g>=173&&c.g<=177&&c.b>=53&&c.b<=57:c.g>65&&c.g<150&&c.r<70&&c.b<c.g*.9f&&c.g>c.r*1.6f;
                        if(!match)continue;hits++;minX=Math.Min(minX,x);maxX=Math.Max(maxX,x);minY=Math.Min(minY,y);maxY=Math.Max(maxY,y);
                    }
                }
                finally{Destroy(capture);}
                Check(hits>500&&maxX-minX>40&&maxY-minY>30&&maxY-minY<130,"unique compact visible button color "+label+" bounds="+minX+","+minY+".."+maxX+","+maxY);
                var point=new Vector2((minX+maxX)/2f,Screen.height-1-(minY+maxY)/2f);
                var native=new NativePoint{x=(int)point.x,y=(int)point.y};Check(ClientToScreen(window,ref native),"client-to-screen pointer");Check(SetCursorPos(native.x,native.y),"native pointer position");Debug.Log("VTT_NATIVE_POINTER: "+label+" gui="+point+" native="+native.x+","+native.y+" viewport="+Screen.width+","+Screen.height);
            }
            catch(Exception error){Fail(error);yield break;}
            yield return new WaitForSecondsRealtime(.12f);mouse_event(2,0,0,0,UIntPtr.Zero);yield return new WaitForSecondsRealtime(.12f);
            mouse_event(4,0,0,0,UIntPtr.Zero);yield return new WaitForSecondsRealtime(.2f);
        }
        [System.Runtime.InteropServices.DllImport("user32.dll")] static extern void keybd_event(byte key,byte scan,uint flags,UIntPtr extra);
        IEnumerator EditNativeHp()
        {
            yield return new WaitForEndOfFrame();
            try
            {
                var capture=ScreenCapture.CaptureScreenshotAsTexture();int centerX=-1,centerY=-1;
                try
                {
                    var pixels=capture.GetPixels32();
                    // In this fixture scroll600 leaves the readonly combat row above200px.
                    for(int y=capture.height-200;y>=100&&centerX<0;y--)
                    {
                        var spans=new System.Collections.Generic.List<Vector2Int>();int start=-1;
                        for(int x=15;x<capture.width-10;x++)
                        {
                            var c=pixels[y*capture.width+x];bool hit=c.r==42&&c.g==42&&c.b==42;
                            if(hit&&start<0)start=x;
                            if((!hit||x==capture.width-11)&&start>=0){if(x-start>=Mathf.FloorToInt((capture.width-50)*.8f/3))spans.Add(new Vector2Int(start,x));start=-1;}
                        }
                        if(spans.Count==3){centerX=(spans[1].x+spans[1].y)/2;centerY=capture.height-1-y+15;}
                    }
                }
                finally{Destroy(capture);}
                Debug.Log("VTT_HP_POINTER: "+centerX+","+centerY);Check(centerX>=0,"visible three-field HP row for real input");var window=GetActiveWindow();SetForegroundWindow(window);var point=new NativePoint{x=centerX,y=centerY};Check(ClientToScreen(window,ref point),"HP client coordinate");Check(SetCursorPos(point.x,point.y),"HP pointer position");
            }
            catch(Exception error){Fail(error);yield break;}
            mouse_event(2,0,0,0,UIntPtr.Zero);yield return new WaitForSecondsRealtime(.1f);mouse_event(4,0,0,0,UIntPtr.Zero);yield return new WaitForSecondsRealtime(.2f);
            keybd_event(0x11,0,0,UIntPtr.Zero);keybd_event(0x41,0,0,UIntPtr.Zero);keybd_event(0x41,0,2,UIntPtr.Zero);keybd_event(0x11,0,2,UIntPtr.Zero);
            yield return new WaitForSecondsRealtime(.1f);var target=GetActiveWindow();keybd_event(0x31,0,0,UIntPtr.Zero);keybd_event(0x31,0,2,UIntPtr.Zero);yield return new WaitForSecondsRealtime(.1f);keybd_event(0x31,0,0,UIntPtr.Zero);keybd_event(0x31,0,2,UIntPtr.Zero);yield return new WaitForSecondsRealtime(.3f);
            yield return new WaitForEndOfFrame();var diagnostic=ScreenCapture.CaptureScreenshotAsTexture();File.WriteAllBytes(Path.Combine(folder,"native-hp-probe.png"),diagnostic.EncodeToPNG());Destroy(diagnostic);
        }
        static void CheckDialogCancellation(bool save, bool art = false)
        {
            bool found = false;
            var closer = new System.Threading.Thread(() =>
            {
                for (int i = 0; i < 100; i++)
                {
                    var window = FindWindow("#32770", art ? "Выбрать арт персонажа" : save ? "Сохранить персонажей DnD VTT" : "Открыть персонажей DnD VTT");
                    if (window != IntPtr.Zero) { found = true; PostMessage(window, 0x0010, IntPtr.Zero, IntPtr.Zero); return; }
                    System.Threading.Thread.Sleep(100);
                }
            }) { IsBackground = true };
            closer.Start(); string path = art ? CharacterFiles.PickWindowsArt() : CharacterFiles.PickWindows(save); closer.Join(12000);
            Check(found && path == null, "actual Windows file dialog cancellation " + save);
        }
#endif
        void CheckHeroArt()
        {
            Texture2D source = new Texture2D(900, 600, TextureFormat.RGBA32, false);
            try
            {
                var pixels = new Color32[900 * 600];
                for(int y=0;y<600;y++)for(int x=0;x<900;x++)pixels[y*900+x]=new Color32((byte)(x*255/900),(byte)(y*255/600),150,(byte)(x%2==0?255:120));
                source.SetPixels32(pixels);source.Apply();
                var normalize=typeof(LegacySessionPanel).GetMethod("NormalizeHeroArt",Flags|BindingFlags.Static);
                Check(normalize!=null,"portrait normalizer exists");
                byte[] bmp=new byte[62];bmp[0]=66;bmp[1]=77;bmp[2]=62;bmp[10]=54;bmp[14]=40;bmp[18]=2;bmp[22]=1;bmp[26]=1;bmp[28]=24;bmp[54]=180;bmp[58]=200;
                foreach(var bytes in new[]{source.EncodeToPNG(),source.EncodeToJPG(90),bmp})
                {
                    var art=(JObject)normalize.Invoke(null,new object[]{bytes});if(qaHeroArt==null)qaHeroArt=art;var encoded=CharacterArt.StoredBytes(art);var size=CharacterArt.Inspect(encoded);
                    Check(size.width<=512&&size.height<=512&&encoded.Length<=CharacterArt.StoredLimit,"normalized portrait dimensions/bytes");
                    var hero=new JObject{["id"]="art-qa",["heroArt"]=art};
                    var get=typeof(LegacySessionPanel).GetMethod("HeroArtTexture",Flags);
                    var texture=(Texture2D)get.Invoke(panel,new object[]{hero});Check(texture&&texture.width==size.width,"saved portrait decoded");
                    Check(ReferenceEquals(texture,get.Invoke(panel,new object[]{hero})),"portrait cache stable");
                    Call("ReleaseHeroArt");Check(typeof(LegacySessionPanel).GetField("heroArtTexture",Flags).GetValue(panel)==null,"portrait texture ownership released");
                    Check((Texture2D)get.Invoke(panel,new object[]{hero}),"portrait restored after cache loss");Call("ReleaseHeroArt");
                }
                byte[] jpeg=source.EncodeToJPG(92);
                for(int orientation=1;orientation<=8;orientation++)
                {
                    byte[] exif={255,225,0,34,69,120,105,102,0,0,73,73,42,0,8,0,0,0,1,0,18,1,3,0,1,0,0,0,(byte)orientation,0,0,0,0,0,0,0};
                    var rotated=new byte[jpeg.Length+exif.Length];Array.Copy(jpeg,0,rotated,0,2);Array.Copy(exif,0,rotated,2,exif.Length);Array.Copy(jpeg,2,rotated,2+exif.Length,jpeg.Length-2);
                    var art=(JObject)normalize.Invoke(null,new object[]{rotated});var texture=new Texture2D(2,2);
                    try
                    {
                        Check(texture.LoadImage(CharacterArt.StoredBytes(art)),"EXIF portrait decode");
                        Check(orientation>=5?texture.height>texture.width:texture.width>texture.height,"EXIF swapped dimensions "+orientation);
                        Color pixel=texture.GetPixelBilinear(.25f,.25f);
                        float[] xs={0,.25f,.75f,.75f,.25f,.75f,.75f,.25f,.25f};
                        float[] ys={0,.25f,.25f,.75f,.75f,.75f,.25f,.25f,.75f};
                        Color original=source.GetPixelBilinear(xs[orientation],ys[orientation]);
                        Color expected=new Color(original.r,original.g,original.b); // JPEG has no alpha.
                        Check(Mathf.Abs(pixel.r-expected.r)<.13f&&Mathf.Abs(pixel.g-expected.g)<.13f,"EXIF pixel orientation "+orientation);
                    }finally{DestroyImmediate(texture);}
                }
                bool rejected=false;try{normalize.Invoke(null,new object[]{new byte[32]});}catch(TargetInvocationException){rejected=true;}
                Check(rejected,"corrupt portrait rejected");
                Debug.Log("VTT_HERO_ART_PASS: PNG/JPEG/BMP decode, normalization, stored reload, cache, eight EXIF orientations and texture teardown");
            }
            finally { DestroyImmediate(source); }
        }
        IEnumerator Start()
        {
            yield return new WaitForSecondsRealtime(1);
            try
            {
                var args = Environment.GetCommandLineArgs(); int at = Array.IndexOf(args, "--vtt-ui-output");
                Check(at >= 0 && at + 1 < args.Length, "explicit evidence output"); folder = args[at + 1]; Directory.CreateDirectory(folder);
                panel = FindFirstObjectByType<LegacySessionPanel>(); Check(panel, "actual application menu");
                // Optional QA-copy override; released players resolve the bundled Resources asset.
                int advancementAt=Array.IndexOf(args,"--vtt-advancement-catalog");
                if(advancementAt>=0){Check(advancementAt+1<args.Length,"explicit QA advancement path");Field("advancementCatalog",JObject.Parse(File.ReadAllText(args[advancementAt+1])));}
                int parchmentAt=Array.IndexOf(args,"--vtt-sheet-parchment");
                if(parchmentAt>=0){var texture=new Texture2D(2,2);Check(texture.LoadImage(File.ReadAllBytes(args[parchmentAt+1])),"QA parchment source decode");Field("sheetParchment",texture);}
                int fontAt=Array.IndexOf(args,"--vtt-sheet-font-family");
                if(fontAt>=0){var reference=Font.CreateDynamicFontFromOSFont(args[fontAt+1],16);Check(reference,"actual Playfair reference font");Field("sheetReferenceFont",reference);}
                Field("brandSplashActive", false);
                CheckHeroArt();
                Check(SystemInfo.graphicsDeviceType != UnityEngine.Rendering.GraphicsDeviceType.Null, "real graphics device");
                var paper=Resources.Load<Texture2D>("UI/Parchment");if(!paper&&parchmentAt>=0)paper=typeof(LegacySessionPanel).GetField("sheetParchment",Flags).GetValue(panel) as Texture2D;Check(paper,"bundled source paper or explicit QA override");
                Debug.Log("VTT_DESKTOP_REFERENCE_ASSET: Parchment="+paper.width+"x"+paper.height+" format="+paper.format);
                var previousTarget=RenderTexture.active;var target=RenderTexture.GetTemporary(16,16,0,RenderTextureFormat.ARGB32);Texture2D sampled=null;
                try{Graphics.Blit(paper,target);RenderTexture.active=target;sampled=new Texture2D(16,16,TextureFormat.RGB24,false);sampled.ReadPixels(new Rect(0,0,16,16),0,0);sampled.Apply();Color pixel=sampled.GetPixel(8,8);Debug.Log("VTT_DESKTOP_REFERENCE_ASSET_GPU: "+pixel.r+","+pixel.g+","+pixel.b);}
                finally{RenderTexture.active=previousTarget;RenderTexture.ReleaseTemporary(target);if(sampled)Destroy(sampled);}
                var actualFont=typeof(LegacySessionPanel).GetProperty("MenuFont",Flags).GetValue(panel) as Font;Check(actualFont,"actual menu font");actualFont.RequestCharactersInTexture("АМИШabc123",13,FontStyle.Normal);
                foreach(char letter in "АМИШabc123"){Check(actualFont.GetCharacterInfo(letter,out var glyph,13,FontStyle.Normal)&&glyph.advance>0,"bundled reference glyph "+letter);Debug.Log("VTT_DESKTOP_REFERENCE_FONT: "+actualFont.name+" "+letter+" advance="+glyph.advance+" glyph="+glyph.glyphWidth+"x"+glyph.glyphHeight);}
                Debug.Log("VTT_DESKTOP_REFERENCE_FONT_NAMES: "+string.Join(",",actualFont.fontNames));
                Check(!Screen.fullScreen && Screen.width >= 800 && Screen.height >= 600, "starts windowed with usable dimensions");
                var font = Resources.Load<Font>("UI/DejaVuSans"); Check(font, "bundled font in installed player");
                const string sample = "НастройкиОбновленияГрафическиеУправлениеДанныеВизуальныеЁёABC123×←✓";
                foreach (var style in new[] { FontStyle.Normal, FontStyle.Bold })
                {
                    font.RequestCharactersInTexture(sample, 20, style);
                    foreach (char c in sample) Check(font.GetCharacterInfo(c, out var glyph, 20, style) && glyph.advance > 0, "renderable glyph " + c);
                }
                Debug.Log("VTT_DESKTOP_FONT_PASS: Cyrillic, Latin, digits and controls in actual Windows player");
            }
            catch (Exception error) { Fail(error); yield break; }
            if(Array.IndexOf(Environment.GetCommandLineArgs(),"--vtt-reference-only")>=0){yield return ReferenceFrames();yield break;}
            yield return Frame("home");
            if (failed) yield break;
            foreach (var category in new[] { "", "Визуальные", "Графические", "Управление", "Сеть и аккаунт", "Данные и устройство", "Обновления" })
            {
                try { Call("OpenSettings"); Call("OpenSettingsCategory", category); }
                catch (Exception error) { Fail(error); yield break; }
                yield return Frame(category == "" ? "settings-overview" : "settings-" + category);
                if (failed) yield break;
            }
            try { Field("brandTechnicalScreen", true); }
            catch (Exception error) { Fail(error); yield break; }
            yield return Frame("update-center"); if (failed) yield break;
            object savedArchive = typeof(LegacySessionPanel).GetField("archive", Flags).GetValue(panel);
            object savedOverride = typeof(LegacySessionPanel).GetField("profileStoreOverride", Flags).GetValue(panel);
            object savedSelected = typeof(LegacySessionPanel).GetField("selected", Flags).GetValue(panel);
            try
            {
                Field("profileStoreOverride", Path.Combine(folder, "daily-profile.json")); Field("archive", null); Field("selected", 0);
                Check(panel.Import("{\"id\":\"daily-a\",\"name\":\"Первый герой\",\"futureUnknown\":{\"value\":123}}"), "first profile import and save");
                Check(panel.Import("{\"id\":\"daily-b\",\"name\":\"Второй герой\"}"), "second import adds without replacing first");
                var loaded = CharacterSheetStore.Load(panel.SavePath);
                Check(loaded.Count == 2 && (int)loaded.Snapshot(0)["futureUnknown"]["value"] == 123, "native additive import preserves original fields");
                Field("selected",1);
                var withArt=CharacterArt.WithArt(loaded,"daily-a",qaHeroArt);CharacterSheetStore.Save(panel.SavePath,withArt);Field("archive",CharacterSheetStore.Load(panel.SavePath));
                Check(JToken.DeepEquals(CharacterSheetStore.Load(panel.SavePath).Snapshot(0)["heroArt"],qaHeroArt),"art restart attached to original ID despite selection change");
                Check(CharacterSheetStore.Load(panel.SavePath).Snapshot(1)["heroArt"]==null,"other hero art untouched");
                Field("selected",0);
                loaded=(LegacyCharacterArchive)typeof(LegacySessionPanel).GetField("archive",Flags).GetValue(panel);
                Check(!panel.Import("{\"id\":\"daily-a\",\"name\":\"Conflict\"}") && CharacterSheetStore.Load(panel.SavePath).Count == 2, "conflict leaves disk unchanged");
                var screenType = typeof(LegacySessionPanel).GetNestedType("FrontScreen", BindingFlags.NonPublic);
                Call("Navigate", Enum.Parse(screenType, "Home"));
            }
            catch (Exception error) { Fail(error); yield break; }
            yield return Frame("characters-home"); if (failed) yield break;
            try { Call("RequestCharacterDeletion", 0); }
            catch (Exception error) { Fail(error); yield break; }
            yield return Frame("characters-delete-confirmation"); if (failed) yield break;
            try
            {
                Call("ConfirmCharacterDeletion");
                Check(CharacterSheetStore.Load(panel.SavePath).Count == 1 && panel.CurrentName == "Второй герой", "actual delete action saves and selects remaining hero");
                Field("pendingCharacterDeleteId", "daily-b"); Call("ConfirmCharacterDeletion");
                Check(CharacterSheetStore.Load(panel.SavePath).Count == 0 && panel.CurrentName == "Исследователь", "actual last-hero delete leaves empty roster");
                Field("archive", CharacterSheetStore.RestorePrevious(panel.SavePath)); Field("selected", 0);
                Check(panel.CurrentName == "Второй герой", "deleted last hero can be restored");
                string backup = CharacterSheetStore.Backup(panel.SavePath, CharacterSheetStore.Load(panel.SavePath));
                Check(CharacterSheetStore.Load(backup).Name(0) == "Второй герой", "native independent backup roundtrip");
                string portable = Path.Combine(folder, "portable-characters.json");
                CharacterFiles.Write(portable, panel.ExportCurrent());
                Field("archive", null);
                Check(panel.Import(CharacterFiles.Read(portable)) && panel.CurrentName == "Второй герой", "actual file import/export roundtrip");
#if UNITY_STANDALONE_WIN && !UNITY_EDITOR
                string beforeDialogs = panel.ExportCurrent();
                CheckDialogCancellation(false); CheckDialogCancellation(true); CheckDialogCancellation(false,true);
                Check(panel.ExportCurrent() == beforeDialogs, "cancelled system dialogs leave roster unchanged");
                Debug.Log("VTT_DESKTOP_FILE_TRANSFER_PASS: actual Windows open/save dialogs cancelled, Unicode JSON file roundtrip and unchanged roster");
#endif
                Field("archive", savedArchive); Field("profileStoreOverride", savedOverride); Field("selected", savedSelected);
                Call("OpenSettings"); Call("OpenSettingsCategory", "Данные и устройство");
                Debug.Log("VTT_DAILY_CHARACTERS_PASS: actual installed native import, conflicting import rejection, delete/last delete, selection, disk reload and backup restore; original QA profile untouched");
            }
            catch (Exception error) { Fail(error); yield break; }
            try
            {
                var screenType = typeof(LegacySessionPanel).GetNestedType("FrontScreen", BindingFlags.NonPublic);
                Call("Navigate", Enum.Parse(screenType, "Import"));
            }
            catch (Exception error) { Fail(error); yield break; }
            yield return Frame("character-files-desktop"); if (failed) yield break;
            // Render the actual roster and search-empty state using a detached long-name fixture.
            // Restore the live archive afterward; presentation must not write to disk.
            LegacyCharacterArchive rosterBefore = null;
            string rosterDiskBefore = null, rosterPreviewJson = null;
            try
            {
                rosterBefore = (LegacyCharacterArchive)typeof(LegacySessionPanel).GetField("archive", Flags).GetValue(panel);
                rosterDiskBefore = File.ReadAllText(panel.SavePath);
                var preview = rosterBefore.DetachedCopy(); var hero = preview.Snapshot(0);
                hero["name"] = "Элеонора Серебряная — хранительница забытой библиотеки";
                hero["heroArt"]=qaHeroArt.DeepClone();
                preview.Replace(0, hero); Field("archive", preview); rosterPreviewJson = preview.Export();
                var screenType = typeof(LegacySessionPanel).GetNestedType("FrontScreen", BindingFlags.NonPublic);
                Call("Navigate", Enum.Parse(screenType, "Characters")); Field("rosterSearch", "");
            }
            catch (Exception error) { Fail(error); yield break; }
            yield return Frame("roster-desktop"); if (failed) yield break;
            try {var screenType=typeof(LegacySessionPanel).GetNestedType("FrontScreen",BindingFlags.NonPublic);Call("Navigate",Enum.Parse(screenType,"Sheet"));Field("sheetTab",0);}
            catch(Exception error){Fail(error);yield break;}
            yield return Frame("hero-art-desktop");if(failed)yield break;
            try {var screenType=typeof(LegacySessionPanel).GetNestedType("FrontScreen",BindingFlags.NonPublic);Call("Navigate",Enum.Parse(screenType,"Characters"));}
            catch(Exception error){Fail(error);yield break;}
            Screen.SetResolution(600, 960, FullScreenMode.Windowed);
            yield return new WaitForSecondsRealtime(.5f); PortraitLayout = true;
            yield return Frame("roster-portrait"); if (failed) yield break;
            Field("rosterSearch", "не-существующий-поиск-qa");
            yield return Frame("roster-empty-search-portrait"); if (failed) yield break;
            try
            {
                var screenType = typeof(LegacySessionPanel).GetNestedType("FrontScreen", BindingFlags.NonPublic);
                Call("Navigate", Enum.Parse(screenType, "Sheet"));
            }
            catch (Exception error) { Fail(error); yield break; }
            yield return Frame("sheet-long-name-portrait"); if (failed) yield break;
            Field("classicPortraitOpen",true);Field("heroArt3D",true);yield return Frame("hero-3d-coming-soon-portrait");if(failed)yield break;
            Field("heroArt3D",false);Field("classicPortraitOpen",false);Field("sheetActionsOpen",true);yield return Frame("hero-actions-portrait");if(failed)yield break;
            Field("sheetActionsOpen",false);Field("frontScroll",new Vector2(0,650));yield return Frame("hero-details-portrait");if(failed)yield break;
            Field("frontScroll",new Vector2(0,1800));yield return Frame("hero-stats-portrait");if(failed)yield break;
            Field("frontScroll",Vector2.zero);
            try
            {
                Check(panel.ExportCurrent() == rosterPreviewJson, "roster search and rendering preserve every character field");
                Check(File.ReadAllText(panel.SavePath) == rosterDiskBefore, "roster presentation never rewrites the saved archive");
                Field("archive", rosterBefore); Field("rosterSearch", "");
            }
            catch (Exception error) { Fail(error); yield break; }
            PortraitLayout = false;

            Screen.SetResolution(600, 960, FullScreenMode.Windowed);
            yield return new WaitForSecondsRealtime(.5f); PortraitLayout = true;
            try
            {
                var screenType = typeof(LegacySessionPanel).GetNestedType("FrontScreen", BindingFlags.NonPublic);
                Call("Navigate", Enum.Parse(screenType, "Sheet"));
            }
            catch (Exception error) { Fail(error); yield break; }
            yield return Frame("character-sheet-portrait"); if (failed) yield break;
            try
            {
                var screenType = typeof(LegacySessionPanel).GetNestedType("FrontScreen", BindingFlags.NonPublic);
                Call("Navigate", Enum.Parse(screenType, "Import"));
            }
            catch (Exception error) { Fail(error); yield break; }
            yield return Frame("character-files-portrait"); if (failed) yield break;
            try { Call("RequestCharacterDeletion", 0); }
            catch (Exception error) { Fail(error); yield break; }
            yield return Frame("character-delete-portrait"); if (failed) yield break;
            // Device-feedback coverage: portrait data settings, backup controls,
            // wizard field ownership and compact data screen (separate from raw editor).
            try {Call("OpenSettings");Call("OpenSettingsCategory","Данные и устройство");Field("brandSettingsScroll",Vector2.zero);}
            catch(Exception error){Fail(error);yield break;}
            yield return Frame("settings-data-portrait");if(failed)yield break;
            Field("brandSettingsScroll",new Vector2(0,1600));yield return Frame("settings-data-bottom-portrait");if(failed)yield break;
            try {Call("BeginCreation");Field("heroName","Герой 1");}
            catch(Exception error){Fail(error);yield break;}
            yield return Frame("creation-name-portrait");if(failed)yield break;
            try
            {
                var session=(NumericInputSession)typeof(LegacySessionPanel).GetField("numericSession",Flags).GetValue(panel);session.Begin("creation-name");
                Call("SetCreationStep",2);session.Finish("creation-name","Герой 1",true);
                Check(session.Owner==null&&!session.TryTake("creation-name",out _),"step clears prior keyboard owner");
                var values=(string[])typeof(LegacySessionPanel).GetField("statInputs",Flags).GetValue(panel);
                Check(values[0]=="15"&&values[1]=="14"&&values[5]=="8","name and stats remain independent");
                values[0]="18";Call("BeginCreation");Check(values[0]=="15","new wizard resets previous numbers");Field("heroName","Герой 1");Call("SetCreationStep",2);
            }
            catch(Exception error){Fail(error);yield break;}
            yield return Frame("creation-stats-portrait");if(failed)yield break;
            try {Field("lastPreview",JObject.Parse("{\"name\":\"Герой 1\",\"raceName\":\"Человек\",\"class\":\"Воин\",\"background\":\"Моряк\",\"hpMax\":12,\"hitDice\":\"1d10\",\"stats\":{\"str\":15,\"dex\":14,\"con\":13,\"int\":12,\"wis\":10,\"cha\":8}}"));Call("SetCreationStep",3);}
            catch(Exception error){Fail(error);yield break;}
            yield return Frame("creation-confirm-portrait");if(failed)yield break;
            try {var type=typeof(LegacySessionPanel).GetNestedType("FrontScreen",BindingFlags.NonPublic);Call("Navigate",Enum.Parse(type,"Sheet"));Field("sheetTab",6);}
            catch(Exception error){Fail(error);yield break;}
            yield return Frame("character-data-portrait");if(failed)yield break;
            LegacyCharacterArchive advancementBefore=null;string advancementStore=null;
            try
            {
                advancementBefore=(LegacyCharacterArchive)typeof(LegacySessionPanel).GetField("archive",Flags).GetValue(panel);
                advancementStore=(string)typeof(LegacySessionPanel).GetField("profileStoreOverride",Flags).GetValue(panel);
                Field("profileStoreOverride",Path.Combine(folder,"advancement-qa.json"));
                var sample=JObject.Parse("{\"id\":\"advancement-qa\",\"name\":\"Элеонора\",\"exp\":900,\"classes\":[{\"name\":\"Воин\",\"level\":1}],\"stats\":{\"str\":15,\"dex\":14,\"con\":14,\"int\":13,\"wis\":13,\"cha\":13},\"hpMax\":12,\"hpCurrent\":0,\"future\":17}");
                Field("archive",new LegacyCharacterArchive(sample.ToString()));Field("selected",0);Field("sheetTab",0);Call("ClearSheetInputs");Field("frontScroll",Vector2.zero);
                Call("BeginAdvancement",sample,true);
            }
            catch(Exception error){Fail(error);yield break;}
            yield return Frame("experience-portrait");if(failed)yield break;
            try
            {
                var sample=((LegacyCharacterArchive)typeof(LegacySessionPanel).GetField("archive",Flags).GetValue(panel)).Snapshot(0);
                Call("BeginAdvancement",sample,false);
            }
            catch(Exception error){Fail(error);yield break;}
            yield return Frame("advancement-classes-portrait");if(failed)yield break;
            try
            {
                var live=(LegacyCharacterArchive)typeof(LegacySessionPanel).GetField("archive",Flags).GetValue(panel);var sample=live.Snapshot(0);
                Call("SelectAdvancementClass",sample,"Воин");
                Check(live.Snapshot(0).ToString()==sample.ToString(),"class selection leaves live character unchanged");
            }
            catch(Exception error){Fail(error);yield break;}
            yield return Frame("advancement-preview-portrait");if(failed)yield break;
            Field("frontScroll",new Vector2(0,1000));yield return Frame("advancement-confirm-portrait");if(failed)yield break;
            try
            {
                var live=(LegacyCharacterArchive)typeof(LegacySessionPanel).GetField("archive",Flags).GetValue(panel);var sample=live.Snapshot(0);
                Call("CloseAdvancement");Check((int)live.Snapshot(0)["classes"][0]["level"]==1,"cancel leaves level unchanged");
                Call("BeginAdvancement",sample,false);Call("SelectAdvancementClass",sample,"Воин");
                var choices=(JObject)typeof(LegacySessionPanel).GetMethod("AdvancementChoices",Flags).Invoke(panel,null);
                var data=(JObject)typeof(LegacySessionPanel).GetProperty("AdvancementCatalog",Flags).GetValue(panel);
                var updated=CharacterAdvancement.Advance(data,sample,"Воин",choices);
                Call("PublishAdvancement",sample,updated);Call("CloseAdvancement");
                Check((int)CharacterSheetStore.Load(panel.SavePath).Snapshot(0)["level"]==2,"actual UI publish persists after restart");
                bool stale=false;try{Call("PublishAdvancement",sample,updated);}catch(TargetInvocationException){stale=true;}Check(stale,"duplicate confirmation refused");
                Debug.Log("VTT_ADVANCEMENT_UI_PASS: XP/selection/preview/cancel, exact one-level atomic publish/restart and duplicate confirmation rejection; synthetic profile only");
                var leveled=CharacterSheetStore.Load(panel.SavePath).Snapshot(0);Call("BeginAdvancement",leveled,false);Call("SelectAdvancementClass",leveled,"Воин");Field("advancementSubclass","Мастер боя");
            }
            catch(Exception error){Fail(error);yield break;}
            yield return Frame("advancement-subclass-portrait");if(failed)yield break;
            try
            {
                var fixture=CharacterSheetStore.Load(panel.SavePath).Snapshot(0);fixture["classes"][0]["level"]=3;fixture["classes"][0]["subclass"]="Мастер боя";fixture["level"]=3;fixture["exp"]=2700;
                Field("archive",new LegacyCharacterArchive(fixture.ToString()));Call("BeginAdvancement",fixture,false);Call("SelectAdvancementClass",fixture,"Воин");Field("frontScroll",new Vector2(0,700));
            }
            catch(Exception error){Fail(error);yield break;}
            yield return Frame("advancement-asi-portrait");if(failed)yield break;
            Field("frontScroll",new Vector2(0,3000));yield return Frame("advancement-asi-confirm-portrait");if(failed)yield break;
            try
            {
                Field("archive",advancementBefore);Field("profileStoreOverride",advancementStore);Call("ClearSheetInputs");
            }
            catch(Exception error){Fail(error);yield break;}
            // Full WebView-shaped sheet: render purity and actual OS-pointer actions.
            LegacyCharacterArchive classicBefore=null;string classicStore=null,classicDisk=null;int classicSelected=0;
            try
            {
                classicBefore=(LegacyCharacterArchive)typeof(LegacySessionPanel).GetField("archive",Flags).GetValue(panel);classicStore=(string)typeof(LegacySessionPanel).GetField("profileStoreOverride",Flags).GetValue(panel);classicSelected=(int)typeof(LegacySessionPanel).GetField("selected",Flags).GetValue(panel);
                var fixture=JObject.Parse("{\"id\": \"ui-sample\", \"schemaVersion\": 3, \"name\": \"Элеонора Серебряная\", \"class\": \"Воин 2\", \"className\": \"Воин\", \"level\": 2, \"classes\": [{\"name\": \"Воин\", \"level\": 2}], \"raceName\": \"Человек\", \"race\": \"Человек\", \"background\": \"Солдат\", \"stats\": {\"str\": 16, \"dex\": 14, \"con\": 14, \"int\": 12, \"wis\": 10, \"cha\": 8}, \"hpMax\": 20, \"hpCurrent\": 12, \"hpTemp\": 3, \"exp\": 500, \"speed\": \"30 футов\", \"ac\": 16, \"skillsData\": {\"athletics\": 1, \"perception\": 1}, \"savesData\": {\"str\": true, \"con\": true}, \"features\": [\"Второе дыхание\", \"Всплеск действий\"], \"resources\": {\"ki\": {\"name\": \"Ци\", \"max\": 2, \"current\": 1, \"recharge\": \"short\", \"future\": 17}}, \"classFeaturesState\": {}, \"combatAbilities\": [{\"id\": \"wind\", \"name\": \"Второе дыхание\", \"description\": \"Восстановление здоровья учитывает игрок.\", \"maxUses\": 1, \"usedCount\": 0, \"rechargeOn\": \"short\"}], \"spellsData\": [{\"id\": \"light\", \"name\": \"Свет\", \"level\": 0, \"desc\": \"Касание предмета. Яркий свет20футов, тусклый ещё20.\", \"prepared\": true}], \"spellSlotsData\": {\"1\": {\"max\": 3, \"used\": 1, \"future\": 17}}, \"inventory\": {\"weapons\": [], \"armor\": [], \"consumables\": [], \"materials\": [], \"junk\": []}, \"folders\": [{\"id\": \"f1\", \"name\": \"Приключение\", \"notes\": [{\"id\": 1, \"title\": \"Следующая сессия\", \"text\": \"Найти ключ от северных ворот.\\nНе доверять трактирщику.\"}], \"future\": 17}], \"activeFolderId\": \"f1\", \"coins\": {\"gp\": 32, \"sp\": 5, \"cp\": 0}, \"combatAbilityStat\": \"str\", \"spellStat\": \"int\", \"unknown\": {\"future\": 17}}");var other=new JObject{["id"]="other-sheet-hero",["name"]="Другой герой",["future"]=true};
                Field("archive",new LegacyCharacterArchive(new JObject{["characters"]=new JArray(fixture,other),["metadata"]=17}.ToString()));Field("selected",0);Field("profileStoreOverride",Path.Combine(folder,"classic-sheet-qa.json"));
                var type=typeof(LegacySessionPanel).GetNestedType("FrontScreen",BindingFlags.NonPublic);Call("Navigate",Enum.Parse(type,"Sheet"));Field("sheetTab",0);panel.SaveSheet();classicDisk=File.ReadAllText(panel.SavePath);
            }
            catch(Exception error){Fail(error);yield break;}
            try
            {
                var session=(NumericInputSession)typeof(LegacySessionPanel).GetField("numericSession",Flags).GetValue(panel);
                var synthetic=CharacterSheetStore.Load(panel.SavePath).Snapshot(0);string owner="classic:"+synthetic["id"]+":hpCurrent";
                session.Begin(owner);session.Stage(owner,"7");
                typeof(LegacySessionPanel).GetMethod("FlushHealthInputs",Flags).Invoke(panel,new object[]{synthetic,false});
                Check((int)synthetic["hpCurrent"]==7&&!session.TryTake(owner,out _)&&session.Owner==null,"health action consumes pending native digits and closes owner");
                CharacterSheetRules.RecordRest(synthetic,true);Check((int)synthetic["hpCurrent"]==20&&!session.TryTake(owner,out _),"rest cannot replay stale native HP on next frame");
            }
            catch(Exception error){Fail(error);yield break;}
            yield return Frame("classic-hero-portrait");if(failed)yield break;
            try{Check(File.ReadAllText(panel.SavePath)==classicDisk,"rendering Hero cannot rewrite profile");Field("frontScroll",new Vector2(0,200));}
            catch(Exception error){Fail(error);yield break;}
            yield return Frame("classic-health-portrait");if(failed)yield break;
#if UNITY_STANDALONE_WIN && !UNITY_EDITOR
            Field("frontScroll",new Vector2(0,600));yield return new WaitForSecondsRealtime(.3f);
            yield return EditNativeHp();if(failed)yield break;
            try{Check((int)CharacterSheetStore.Load(panel.SavePath).Snapshot(0)["hpCurrent"]==11,"actual HP text edit persists");}
            catch(Exception error){Fail(error);yield break;}
            Field("frontScroll",Vector2.zero);yield return new WaitForSecondsRealtime(.3f);yield return ClickNativeButton("Опыт и уровень");if(failed)yield break;
            try
            {
                var saved=CharacterSheetStore.Load(panel.SavePath);Check((bool)typeof(LegacySessionPanel).GetField("advancementOpen",Flags).GetValue(panel),"original XP action opens advancement");Call("CloseAdvancement");Check((int)saved.Snapshot(0)["hpTemp"]==3&&(int)saved.Snapshot(0)["hpCurrent"]==11,"opening XP does not alter HP");
                Check((bool)saved.Snapshot(1)["future"]&&(int)JObject.Parse(saved.Export())["metadata"]==17,"pointer action preserves other hero/wrapper");classicDisk=File.ReadAllText(panel.SavePath);
            }
            catch(Exception error){Fail(error);yield break;}
#endif
            try{Field("sheetTab",1);Field("frontScroll",Vector2.zero);}
            catch(Exception error){Fail(error);yield break;}
            yield return Frame("classic-skills-portrait");if(failed)yield break;
            try{Check(File.ReadAllText(panel.SavePath)==classicDisk,"rendering Skills cannot rewrite profile");Field("sheetTab",4);Field("frontScroll",Vector2.zero);}
            catch(Exception error){Fail(error);yield break;}
            yield return Frame("classic-notes-portrait");if(failed)yield break;
#if UNITY_STANDALONE_WIN && !UNITY_EDITOR
            yield return ClickNativeButton("+ Заметка");if(failed)yield break;
            try{var saved=CharacterSheetStore.Load(panel.SavePath).Snapshot(0);Check(((JArray)saved["folders"][0]["notes"]).Count==2&&(int)saved["folders"][0]["future"]==17,"actual add-note button saves without losing folder fields");classicDisk=File.ReadAllText(panel.SavePath);}
            catch(Exception error){Fail(error);yield break;}
#endif
            try{Field("sheetTab",2);Field("frontScroll",Vector2.zero);}
            catch(Exception error){Fail(error);yield break;}
            yield return Frame("classic-abilities-portrait");if(failed)yield break;
            Field("frontScroll",new Vector2(0,800));yield return Frame("classic-resources-portrait");if(failed)yield break;
            try{Check(File.ReadAllText(panel.SavePath)==classicDisk,"rendering spells/resources cannot rewrite profile");Field("sheetTab",0);Field("frontScroll",Vector2.zero);}
            catch(Exception error){Fail(error);yield break;}
            Screen.SetResolution(360,800,FullScreenMode.Windowed);yield return new WaitForSecondsRealtime(.3f);
            yield return Frame("classic-hero-narrow-portrait");if(failed)yield break;
            PortraitLayout=false;Screen.SetResolution(1280,900,FullScreenMode.Windowed);yield return new WaitForSecondsRealtime(.3f);
            yield return Frame("classic-hero-desktop");if(failed)yield break;
            try
            {
                var unsupported=((LegacyCharacterArchive)typeof(LegacySessionPanel).GetField("archive",Flags).GetValue(panel)).DetachedCopy();var hero=unsupported.Snapshot(0);
                hero["combatAbilities"][0]["maxUses"]="PB";hero["spellSlotsData"]["1"]["max"]=new JObject{["future"]=17};hero["pactMagicData"]=new JObject{["max"]="PB",["used"]=0};
                unsupported.Replace(0,hero);Field("archive",unsupported);Field("sheetTab",2);Field("frontScroll",Vector2.zero);
            }
            catch(Exception error){Fail(error);yield break;}
            yield return Frame("classic-unsupported-counters-desktop");if(failed)yield break;
            Field("requestedSheetTab",(int?)0);yield return new WaitForSecondsRealtime(.3f);
            try{Check((int)typeof(LegacySessionPanel).GetField("sheetTab",Flags).GetValue(panel)==0,"unsupported counter cannot trap tab navigation");Check(File.ReadAllText(panel.SavePath)==classicDisk,"unsupported counter rendering never overwrites archive");}
            catch(Exception error){Fail(error);yield break;}
            try{Field("archive",classicBefore);Field("profileStoreOverride",classicStore);Field("selected",classicSelected);Call("ClearSheetInputs");Debug.Log("VTT_CLASSIC_SHEET_UI_PASS: synthetic render purity, actual OS pointer experience/add-note, disk reload/other-hero/wrapper invariants; portrait/narrow/desktop frames");}
            catch(Exception error){Fail(error);yield break;}
            PortraitLayout = false;
            try { Check(buttonChecks > 12 && clippedButtons == 0, "navigation/back labels checked at desktop and portrait widths"); Call("OpenSettings"); }
            catch (Exception error) { Fail(error); yield break; }
            Screen.SetResolution(1024, 768, FullScreenMode.Windowed);
            yield return new WaitForSecondsRealtime(.4f);
            try { Call("OpenSettings"); }
            catch (Exception error) { Fail(error); yield break; }
            yield return Frame("settings-1024x768"); if (failed) yield break;
            try { Call("SetDesktopWindow", true); }
            catch (Exception error) { Fail(error); yield break; }
            yield return new WaitForSecondsRealtime(.5f);
            try { Check(Screen.fullScreen, "fullscreen switch"); Call("SetDesktopWindow", false); }
            catch (Exception error) { Fail(error); yield break; }
            yield return new WaitForSecondsRealtime(.5f);
            try { Check(!Screen.fullScreen, "window restored"); }
            catch (Exception error) { Fail(error); yield break; }
            Debug.Log("VTT_DESKTOP_UI_PASS: installed player, visible Cyrillic home/all settings/update center, windowed startup/resize/fullscreen roundtrip and real PNG evidence");
            Application.Quit(0);
        }
        IEnumerator ReferenceFrames()
        {
            try
            {
                var args=Environment.GetCommandLineArgs();int at=Array.IndexOf(args,"--vtt-reference-hero");Check(at>=0,"explicit reference fixture");
                Field("archive",new LegacyCharacterArchive(File.ReadAllText(args[at+1])));Field("selected",0);Field("profileStoreOverride",Path.Combine(folder,"reference-qa.json"));
                var type=typeof(LegacySessionPanel).GetNestedType("FrontScreen",BindingFlags.NonPublic);Call("Navigate",Enum.Parse(type,"Sheet"));panel.SaveSheet();
            }
            catch(Exception error){Fail(error);yield break;}
            foreach(bool phone in new[]{true,false})
            {
                PortraitLayout=phone;Screen.SetResolution(phone?440:1280,900,FullScreenMode.Windowed);yield return new WaitForSecondsRealtime(.4f);
                foreach(int tab in new[]{0,1,2,4})
                {Field("sheetTab",tab);Field("frontScroll",Vector2.zero);yield return Frame("reference-"+tab+"-"+(phone?"portrait":"desktop"));if(failed)yield break;}
            }
#if UNITY_STANDALONE_WIN && !UNITY_EDITOR
            PortraitLayout=true;Screen.SetResolution(440,900,FullScreenMode.Windowed);Field("sheetTab",0);Field("frontScroll",new Vector2(0,600));yield return new WaitForSecondsRealtime(.4f);yield return EditNativeHp();if(failed)yield break;
            try{Check((int)CharacterSheetStore.Load(panel.SavePath).Snapshot(0)["hpCurrent"]==11,"reference actual native HP edit");Debug.Log("VTT_NATIVE_HP_EDIT_PASS");}
            catch(Exception error){Fail(error);yield break;}
#endif
            Debug.Log("VTT_REFERENCE_CAPTURE_PASS: Unity frames captured; no automatic WebView/font/visual equivalence assertion");Application.Quit(0);
        }
        bool failed;
        IEnumerator Frame(string name)
        {
            HideText=false;
            // Word-wrapped IMGUI controls need settled Layout/Repaint passes after a
            // viewport/tab change. Do not capture a stale first-pass layout.
            string last=null;int stable=0;
            for(int i=0;i<60&&stable<3;i++)
            {
                yield return null;
                string signature=string.Join(";",System.Linq.Enumerable.OrderBy(buttonPoints,p=>p.Key).Select(p=>p.Key+":"+Mathf.RoundToInt(p.Value.x)+","+Mathf.RoundToInt(p.Value.y)));
                stable=signature==last?stable+1:0;last=signature;
            }
            yield return new WaitForEndOfFrame();
            var visible = ScreenCapture.CaptureScreenshotAsTexture();
            HideText = true; yield return null; yield return new WaitForEndOfFrame();
            var hidden = ScreenCapture.CaptureScreenshotAsTexture(); HideText = false;
            try
            {
                Check(clippedButtons == 0, "all recorded navigation/back labels fit their actual bounds");
                Check(visible && hidden && visible.width == hidden.width, "GPU capture " + name);
                if (name.EndsWith("-portrait", StringComparison.Ordinal)) Check(PortraitLayout && visible.height > visible.width, "actual portrait viewport " + name);
                Debug.Log("VTT_DESKTOP_VIEWPORT: "+name+" "+visible.width+"x"+visible.height);
                if(name=="classic-hero-portrait"||name=="reference-0-portrait")
                {
                    double brightness=0;foreach(int x in new[]{1,visible.width-2})foreach(float fraction in new[]{.3f,.5f,.75f}){Color pixel=visible.GetPixel(x,(int)(visible.height*fraction));brightness+=(pixel.r+pixel.g+pixel.b)/3;}
                    brightness/=6;Debug.Log("VTT_DESKTOP_PAPER_BRIGHTNESS: "+brightness);Check(brightness>.08,"bundled paper is actually visible, not just imported");
                }
                File.WriteAllBytes(Path.Combine(folder, name + ".png"), visible.EncodeToPNG());
                var a = visible.GetPixels32(); var b = hidden.GetPixels32(); int textPixels = 0;
                for (int i = 0; i < a.Length; i++)
                    if (Mathf.Abs(a[i].r - b[i].r) + Mathf.Abs(a[i].g - b[i].g) + Mathf.Abs(a[i].b - b[i].b) > 90) textPixels++;
                Check(textPixels > 600, "actual visible text pixels on " + name + ": " + textPixels);
                Debug.Log("VTT_DESKTOP_TEXT_PIXELS: " + name + " " + textPixels);
                // Reviewable actual GPU evidence even if the artifact download host is unreachable.
                float thumbScale=Mathf.Min(640f/visible.width,640f/visible.height);int thumbWidth=Mathf.Max(1,Mathf.RoundToInt(visible.width*thumbScale)),thumbHeight=Mathf.Max(1,Mathf.RoundToInt(visible.height*thumbScale));
                var thumb = new Texture2D(thumbWidth, thumbHeight, TextureFormat.RGB24, false);
                try
                {
                    var pixels = new Color[thumbWidth * thumbHeight];
                    for (int y = 0; y < thumbHeight; y++) for (int x = 0; x < thumbWidth; x++) pixels[y * thumbWidth + x] = visible.GetPixelBilinear((x + .5f) / thumbWidth, (y + .5f) / thumbHeight);
                    thumb.SetPixels(pixels); thumb.Apply();
                    Debug.Log("VTT_DESKTOP_UI_PNG:" + name + ":" + Convert.ToBase64String(thumb.EncodeToPNG()));
                }
                finally { Destroy(thumb); }
            }
            catch (Exception error) { failed = true; Fail(error); }
            finally { if (visible) Destroy(visible); if (hidden) Destroy(hidden); }
        }
    }
}
