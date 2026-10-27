using System;
using System.Collections;
using System.IO;
using System.Reflection;
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
        public static void RecordButton(string label, GUIStyle style, Rect rect)
        {
            if (!running || Event.current.type != EventType.Repaint) return;
            buttonChecks++;
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
                Field("brandSplashActive", false);
                CheckHeroArt();
                Check(SystemInfo.graphicsDeviceType != UnityEngine.Rendering.GraphicsDeviceType.Null, "real graphics device");
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
            Field("heroArt3D",true);yield return Frame("hero-3d-coming-soon-portrait");if(failed)yield break;
            Field("heroArt3D",false);Field("sheetActionsOpen",true);yield return Frame("hero-actions-portrait");if(failed)yield break;
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
        bool failed;
        IEnumerator Frame(string name)
        {
            HideText = false; yield return null; yield return new WaitForEndOfFrame();
            var visible = ScreenCapture.CaptureScreenshotAsTexture();
            HideText = true; yield return null; yield return new WaitForEndOfFrame();
            var hidden = ScreenCapture.CaptureScreenshotAsTexture(); HideText = false;
            try
            {
                Check(clippedButtons == 0, "all recorded navigation/back labels fit their actual bounds");
                Check(visible && hidden && visible.width == hidden.width, "GPU capture " + name);
                if (name.EndsWith("-portrait", StringComparison.Ordinal)) Check(PortraitLayout && visible.height > visible.width, "actual portrait viewport " + name);
                File.WriteAllBytes(Path.Combine(folder, name + ".png"), visible.EncodeToPNG());
                var a = visible.GetPixels32(); var b = hidden.GetPixels32(); int textPixels = 0;
                for (int i = 0; i < a.Length; i++)
                    if (Mathf.Abs(a[i].r - b[i].r) + Mathf.Abs(a[i].g - b[i].g) + Mathf.Abs(a[i].b - b[i].b) > 90) textPixels++;
                Check(textPixels > 600, "actual visible text pixels on " + name + ": " + textPixels);
                Debug.Log("VTT_DESKTOP_TEXT_PIXELS: " + name + " " + textPixels);
                // Reviewable actual GPU evidence even if the artifact download host is unreachable.
                int thumbWidth = visible.width >= visible.height ? 640 : 400, thumbHeight = visible.width >= visible.height ? 400 : 640;
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
