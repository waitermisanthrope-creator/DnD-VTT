using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;

namespace DndVtt.UnityPrototype
{
    // Native Unity UI styled after main/index.html + main/app/Settings.js.
    // Bundled artwork: ONLY main/wallpapers/{16,19,20}.png.
    public sealed partial class LegacySessionPanel
    {
        private const float BrandMaxWidth = 720f;
        private Texture2D brandWallpaper, brandSplash, brandDragon;
        private GUIStyle brandTitle, brandSub, brandName, brandCard, brandBlue, brandGreen,
            brandRed, brandPurple, brandGold, brandBrown, brandPlain;
        // GUIStyle backgrounds alone are not reliable roots during unloading or
        // Android graphics-context recreation. Own readable textures explicitly.
        private readonly List<Texture2D> brandStyleTextures = new List<Texture2D>();
        private bool brandStylesDirty = true;
        private void InvalidateBrandStyles() { brandStylesDirty = true; }
        private void ReleaseBrandStyles()
        {
            foreach (var texture in brandStyleTextures)
                if (texture) { if (Application.isPlaying) Destroy(texture); else DestroyImmediate(texture); }
            brandStyleTextures.Clear();
            if (sheetSkin) { if (Application.isPlaying) Destroy(sheetSkin); else DestroyImmediate(sheetSkin); sheetSkin = null; }
            heading = muted = bigButton = null;
            settingsHeader = settingsDescription = settingsInset = null;
        }
        private void OnApplicationPause(bool paused) { if(paused)StopDiceSensor();ApplyScreenSleep(!paused); if (!paused) InvalidateBrandStyles(); }
        private Vector2 brandHomeScroll, brandSettingsScroll, brandHomeActionsScroll;
        private bool brandMoreOpen, brandSplashActive, brandAdvancedOpen;
        private float brandSplashSince;
        private string brandNotice = "";

        private Color BrandAccent
        {
            get {
                string name = settingsDraft != null && screen == FrontScreen.Settings
                    ? settingsDraft.theme : preferences?.theme;
                switch (name) {
                    case "purple": return new Color(.64f,.18f,.78f);
                    case "blue": return new Color(.13f,.59f,.95f);
                    case "red": return new Color(.9f,.22f,.2f);
                    default: return new Color(1f,.60f,.04f);
                }
            }
        }
        private Color BrandFrameColor
        {
            get {
                string c = settingsDraft != null && screen == FrontScreen.Settings
                    ? settingsDraft.frameColor : preferences?.frameColor;
                switch(c) {
                    case "crimson": return new Color(.79f,.29f,.27f);
                    case "jade": return new Color(.29f,.66f,.54f);
                    case "azure": return new Color(.29f,.57f,.78f);
                    case "violet": return new Color(.61f,.42f,.78f);
                    default: return new Color(.83f,.69f,.22f);
                }
            }
        }
        private static Texture2D Solid(Color c)
        {
            var t = new Texture2D(1, 1, TextureFormat.RGBA32, false);
            t.SetPixel(0, 0, c); t.Apply(); return t;
        }
        // Nine-sliced curved edges: the WebView source uses rounded buttons,
        // not the flat square IMGUI controls accidentally shipped in 1.00.04.
        private Texture2D Rounded(Color fill, Color edge, int radius = 12)
        {
            const int size = 48; const int border = 2;
            var texture = new Texture2D(size, size, TextureFormat.RGBA32, false);
            texture.hideFlags = HideFlags.HideAndDontSave;
            brandStyleTextures.Add(texture);
            texture.filterMode = FilterMode.Bilinear; texture.wrapMode = TextureWrapMode.Clamp;
            for (int y = 0; y < size; y++) for (int x = 0; x < size; x++)
            {
                float cx = Mathf.Clamp(x, radius, size - radius - 1);
                float cy = Mathf.Clamp(y, radius, size - radius - 1);
                float distance = Vector2.Distance(new Vector2(x,y), new Vector2(cx,cy));
                float coverage = Mathf.Clamp01(radius + .5f - distance);
                // Keep a thin border around each rounded component.
                float inside = Mathf.Clamp01(radius - border + .5f - distance);
                Color pixel = Color.Lerp(edge, fill, inside);
                pixel.a *= coverage;
                texture.SetPixel(x,y,pixel);
            }
            texture.Apply(false, false); return texture;
        }
        private GUIStyle Button(GUIStyle from, Color color, Color foreground)
        {
            var b = new GUIStyle(from);
            b.normal.background = Rounded(color, new Color(.84f,.70f,.37f,.63f));
            b.hover.background = Rounded(Color.Lerp(color, Color.white, .12f), new Color(.96f,.79f,.45f,.93f));
            b.active.background = b.hover.background;
            b.normal.textColor = foreground; b.hover.textColor = foreground;
            b.active.textColor = foreground;
            b.alignment = TextAnchor.MiddleCenter; b.fontStyle = FontStyle.Bold;
            b.font = MenuFont; b.fontSize = 19; b.wordWrap = true;
            b.padding = new RectOffset(7, 7, 7, 7);
            b.border = new RectOffset(16, 16, 16, 16);
            return b;
        }
        private void PrepareBrand()
        {
            EnsureBrandStyles(GUI.skin.button, GUI.skin.label, GUI.skin.box);
        }
        private void EnsureBrandStyles(GUIStyle button, GUIStyle label, GUIStyle box)
        {
            if (!brandStylesDirty && brandBlue != null && brandBlue.normal.background) return;
            ReleaseBrandStyles();
            if (!brandWallpaper) brandWallpaper = Resources.Load<Texture2D>("Branding/Wallpaper16");
            if (!brandSplash) brandSplash = Resources.Load<Texture2D>("Branding/Splash19");
            if (!brandDragon) brandDragon = Resources.Load<Texture2D>("Branding/Dragon20");
            brandBlue = Button(button, new Color(.12f,.58f,.95f), Color.white);
            brandGreen = Button(button, new Color(.28f,.69f,.33f), Color.white);
            brandRed = Button(button, new Color(.89f,.19f,.2f), Color.white);
            brandPurple = Button(button, new Color(.29f,.23f,.43f), Color.white);
            brandGold = Button(button, new Color(.41f,.28f,.08f), Color.white);
            brandBrown = Button(button, new Color(.16f,.12f,.08f), new Color(.98f,.84f,.49f));
            brandPlain = Button(button, new Color(.17f,.16f,.16f), Color.white);
            brandTitle = new GUIStyle(label) { font = MenuFont, fontSize = 25, fontStyle = FontStyle.Bold, wordWrap = true };
            brandTitle.normal.textColor = BrandAccent;
            brandName = new GUIStyle(brandTitle) { fontSize = 20 };
            brandSub = new GUIStyle(label) { font = MenuFont, fontSize = 15, wordWrap = true };
            brandSub.normal.textColor = new Color(.73f,.72f,.71f);
            brandCard = new GUIStyle(box) { padding = new RectOffset(12,12,12,12),
                margin = new RectOffset(0,0,0,9) };
            brandCard.normal.background = Rounded(new Color(.09f,.09f,.11f,.88f), new Color(.38f,.38f,.36f,.72f));
            brandCard.border = new RectOffset(16,16,16,16);
            brandStylesDirty = false;
        }
        // Three original art assets also exist verbatim in StreamingAssets as
        // Android-safe fallbacks. No additional wallpapers are shipped.
        private IEnumerator LoadPackagedBrandArt()
        {
#if UNITY_ANDROID && !UNITY_EDITOR
            string path = Application.streamingAssetsPath.TrimEnd('/') + "/Branding/";
            yield return ReadPackagedArt(path + "Wallpaper16.jpg", 0);
            yield return ReadPackagedArt(path + "Splash19.png", 1);
            yield return ReadPackagedArt(path + "Dragon20.png", 2);
#endif
            // This iterator must compile in the Unity Editor too.
            // UNITY_ANDROID is not defined in the Linux build editor.
            yield break;
        }
        private IEnumerator ReadPackagedArt(string url, int kind)
        {
            // UnityWebRequestTexture is an optional Unity package module and
            // is not installed in this Unity project. Download raw bytes using
            // the already-proven UnityWebRequest module and decode with the
            // installed ImageConversion module instead.
            using var request = UnityWebRequest.Get(url);
            request.timeout = 25;
            yield return request.SendWebRequest();
            if (request.result != UnityWebRequest.Result.Success)
            {
                Debug.LogWarning("Branding asset package not loaded: " + kind + " / " + request.error);
                yield break;
            }
            var texture = new Texture2D(2, 2, TextureFormat.RGBA32, false);
            if (!ImageConversion.LoadImage(texture, request.downloadHandler.data, true))
            {
                Destroy(texture);
                Debug.LogWarning("Branding image decode failed: " + kind);
                yield break;
            }
            if (texture.width < 100 || texture.height < 100)
            {
                Debug.LogWarning("Branding asset invalid: " + kind);
                yield break;
            }
            if (kind == 0) brandWallpaper = texture;
            else if (kind == 1) brandSplash = texture;
            else brandDragon = texture;
            Debug.Log("VTT_BRAND_ART_LOADED: " + kind + " / " + texture.width + "x" + texture.height);
        }

        private static void Cover(Texture2D image, Rect area)
        {
            if (!image) return;
            Color oldColor = GUI.color;
            GUI.color = Color.white;
            // ScaleAndCrop has a supported Android IMGUI shader path, unlike
            // custom UV drawing used in 1.00.04 (blank on the test device).
            GUI.DrawTexture(area, image, ScaleMode.ScaleAndCrop, true);
            GUI.color = oldColor;
        }
        private static void Shade(Rect area, Color c)
        {
            var old = GUI.color; GUI.color = c;
            GUI.DrawTexture(area, Texture2D.whiteTexture); GUI.color = old;
        }
        private void DrawBrandBackdrop(bool modal)
        {
            PrepareBrand();
            var full = new Rect(0, 0, UiWidth, UiHeight);
            Shade(full, new Color(.04f,.04f,.05f));
            Cover(SelectedAppearanceImage("wallpaper")??brandWallpaper, full);
            Shade(full, new Color(0,0,0,modal ? .75f : .42f));
        }
        private void BeginBrandSplash()
        {
#if UNITY_ANDROID && !UNITY_EDITOR
            brandSplashActive = true; brandSplashSince = Time.realtimeSinceStartup;
            StartCoroutine(LoadPackagedBrandArt());
#endif
        }
        private bool DrawBrandSplash()
        {
            if (!brandSplashActive) return false;
            PrepareBrand();
            float elapsed = Time.realtimeSinceStartup - brandSplashSince;
            if (elapsed > 15) { brandSplashActive = false; return false; }
            var full = new Rect(0,0,UiWidth,UiHeight);
            Shade(full, Color.black); Cover(brandSplash, full);
            if (brandDragon)
            {
                float w = UiWidth * .80f;
                float h = Mathf.Min(w * brandDragon.height / brandDragon.width, UiHeight * .8f);
                float y = Mathf.Lerp(UiHeight, -h, Mathf.Clamp01((elapsed - 1.8f) / 12f));
                GUI.DrawTexture(new Rect((UiWidth-w)/2, y, w, h), brandDragon, ScaleMode.ScaleToFit, true);
            }
            if (GUI.Button(new Rect(UiWidth - 143, UiHeight - 64, 126, 46), "Пропустить", brandBrown))
                brandSplashActive = false;
            return true;
        }
        private void DrawBrandHome()
        {
            DrawBrandBackdrop(false);
            float width = Mathf.Min(UiWidth - 28, BrandMaxWidth);
            float x = (UiWidth - width) / 2f;
            float bottom = Mathf.Min(420, UiHeight * .56f);
            GUILayout.BeginArea(new Rect(x, 12, width, Mathf.Max(75, UiHeight - bottom - 24)));
            brandHomeScroll = GUILayout.BeginScrollView(SwipePosition("home",brandHomeScroll), false, true);
            if (archive == null || archive.Count == 0)
            {
                GUILayout.Space(22); GUILayout.BeginVertical(brandCard);
                GUILayout.Label("Твоя история начинается здесь", brandTitle);
                GUILayout.Label("Создай персонажа или перенеси своего героя из старой версии.", brandSub);
                GUILayout.EndVertical();
            }
            else for (int i = 0; i < archive.Count; i++)
            {
                var hero = archive.Snapshot(i);
                string details = ((string)hero["class"] ?? (string)hero["className"] ?? "Без класса")
                    + " • " + ((string)hero["raceName"] ?? (string)hero["race"] ?? "Раса не выбрана");
                GUILayout.BeginHorizontal(brandCard, GUILayout.MinHeight(76));
                GUILayout.BeginVertical(GUILayout.ExpandWidth(true));
                GUILayout.Label(archive.Name(i), brandName);
                GUILayout.Label(details, brandSub);
                GUILayout.EndVertical();
                if (GUILayout.Button("Играть", brandBlue, GUILayout.Width(Mathf.Min(105, width*.24f)), GUILayout.Height(51)))
                { selected = i; Navigate(FrontScreen.Sheet); }
                if (GUILayout.Button("×", brandRed, GUILayout.Width(48), GUILayout.Height(51))) RequestCharacterDeletion(i);
                GUILayout.EndHorizontal();
            }
            GUILayout.EndScrollView(); RegisterSwipe("home",GUILayoutUtility.GetLastRect()); GUILayout.EndArea();
            float footer = Mathf.Min(420, UiHeight * .56f);
            GUILayout.BeginArea(new Rect(x, UiHeight - footer - 6, width, footer));
            brandHomeActionsScroll=GUILayout.BeginScrollView(SwipePosition("home-actions",brandHomeActionsScroll),false,true,GUIStyle.none,GUI.skin.verticalScrollbar);
            GUILayout.BeginVertical();
            GUILayout.BeginHorizontal();
            if (GUILayout.Button("+ Новый персонаж", brandGreen, GUILayout.Height(51))) BeginCreation();
            if (GUILayout.Button("Загрузить / импорт", brandBlue, GUILayout.Height(51))) Navigate(FrontScreen.Import);
            GUILayout.EndHorizontal();
            if (GUILayout.Button("☁ Локальный архив • " + (archive?.Count ?? 0) + " героев", brandBlue, GUILayout.Height(45)))
                Navigate(FrontScreen.Characters);
            GUILayout.BeginHorizontal();
            if (GUILayout.Button("3D Персонаж", brandPurple, GUILayout.Height(53))) OpenCharacterStudio();
            if (GUILayout.Button("3D Карты", brandGold, GUILayout.Height(53))) Navigate(FrontScreen.Map);
            GUILayout.EndHorizontal();
            GUILayout.BeginHorizontal();
            if(GUILayout.Button("Мастерская",brandPurple,GUILayout.MinHeight(54)))OpenContentManager();
            if(GUILayout.Button("3D Дайсы",brandGold,GUILayout.MinHeight(54)))Navigate(FrontScreen.Dice);
            GUILayout.EndHorizontal();
            LoadCloudSession();
            if(cloudSession!=null&&GUILayout.Button("Глобальный чат",brandBlue,GUILayout.Height(51)))Navigate(FrontScreen.Chat);
            // One tap opens settings. Do not hide the essential updater behind
            // a floating popup that becomes unclickable on some Android devices.
            if (GUILayout.Button("⚙ Настройки", brandBrown, GUILayout.Height(61)))
                { brandMoreOpen = false; OpenSettings(); }
            GUILayout.EndVertical();GUILayout.EndScrollView();RegisterSwipe("home-actions",GUILayoutUtility.GetLastRect()); GUILayout.EndArea();
            if (brandMoreOpen) DrawBrandMore();
        }
        private void DrawBrandMore()
        {
            float width = Mathf.Min(UiWidth - 35, 520);
            Rect r = new Rect((UiWidth - width)/2, Mathf.Max(20,UiHeight*.34f), width, 260);
            Shade(r, new Color(.09f,.09f,.08f,.99f));
            GUILayout.BeginArea(new Rect(r.x+14,r.y+10,r.width-28,r.height-15));
            GUILayout.Label("Дополнительно", brandTitle);
            if (GUILayout.Button("⚙ Настройки приложения", brandGold, GUILayout.Height(51)))
            { brandMoreOpen = false; OpenSettings(); }
            if (GUILayout.Button("📜 История изменений", brandBrown, GUILayout.Height(51)))
            { brandMoreOpen = false; OpenSettings(); showChangelog = true; StartCoroutine(FetchChangelog()); }
            if (GUILayout.Button("Закрыть", brandRed, GUILayout.Height(44))) brandMoreOpen = false;
            GUILayout.EndArea();
        }
    }
}
