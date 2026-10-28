using System;
using System.Linq;
using UnityEngine;

namespace DndVtt.UnityPrototype
{
    public sealed partial class LegacySessionPanel
    {
        private static readonly string[] BrandAccentKeys = { "orange", "purple", "blue", "red" };
        private static readonly string[] BrandAccentNames = {
            "D&D Оранжевый", "Некромантский", "Магический", "Кровавый"
        };
        private static readonly string[] BrandFrameKeys = { "dragon", "vine" };
        private static readonly string[] BrandFrameNames = { "Дракон", "Лоза и кости" };
        private static readonly string[] BrandFrameColors = { "gold", "crimson", "jade", "azure", "violet" };
        private static readonly string[] BrandFrameLabels = { "Золото", "Багровый", "Нефрит", "Лазурь", "Фиолетовый" };
        // Only the polished overview uses immediate GUI; the old, proven update
        // center is a separate full-screen page with unchanged working controls.
        private bool brandTechnicalScreen;
        private string settingsCategory = "";

        private void OpenSettingsCategory(string category)
        {
            settingsCategory=category;brandSettingsScroll=Vector2.zero;frontScroll=Vector2.zero;menuGesture.Clear();if(Event.current!=null)GUI.FocusControl(null);
        }
        private void SettingsCategoryButton(string title,string description,string category, float cardWidth = 0)
        {
            if (cardWidth > 0) GUILayout.BeginVertical(GUI.skin.box, GUILayout.Width(cardWidth));
            else GUILayout.BeginVertical(GUI.skin.box);
            if(GUILayout.Button(title+"  →",brandGold,GUILayout.MinHeight(60)))OpenSettingsCategory(category);
            GUILayout.Label(description,settingsDescription);GUILayout.EndVertical();
        }
        private bool showModeratorPanel;
        private GUIStyle settingsHeader, settingsDescription, settingsInset;
        private float brandSettingsContentHeight = 1320;

        private void PrepareSettingsSkin()
        {
            PrepareBrand();
            // Embedded graphics/control/data panels also use these shared styles.
            // They can open directly from Home, before the sheet/technical page.
            heading ??= new GUIStyle(brandTitle) { font = MenuFont, fontSize = 24 };
            muted ??= new GUIStyle(brandSub) { font = MenuFont, fontSize = 17 };
            if (settingsHeader != null) return;
            settingsHeader = new GUIStyle(brandTitle) { fontSize = 24, wordWrap = true, font = MenuFont };
            settingsDescription = new GUIStyle(brandSub) { fontSize = 17, wordWrap = true };
            settingsInset = new GUIStyle(brandCard) {
                padding = new RectOffset(14,14,12,12),
                margin = new RectOffset(0,0,7,7)
            };
        }
        private void SettingsSection(string title)
        {
            PrepareSettingsSkin();settingsHeader.normal.textColor=BrandAccent;
            GUILayout.Space(8);GUILayout.Label(title,settingsHeader);
        }
        private void DrawBrandSettings()
        {
            PrepareSheetSkin();PrepareSettingsSkin();LoadCloudSession();
            if(settingsDraft==null)settingsDraft=ClientPreferences.Parse(preferences.Export());
            DrawBrandBackdrop(true);
            float width=Mathf.Min(UiWidth-24,Application.isMobilePlatform ? 600 : 1040),x=(UiWidth-width)*.5f;
            GUI.Box(new Rect(x,12,width,UiHeight-24),GUIContent.none,brandCard);
            GUILayout.BeginArea(new Rect(x+16,24,width-32,UiHeight-48));
            GUILayout.BeginHorizontal();GUILayout.Label(settingsCategory==""?"Настройки приложения":settingsCategory,settingsHeader);if(GUILayout.Button("×",brandRed,GUILayout.Width(46),GUILayout.Height(46)))Navigate(FrontScreen.Home);GUILayout.EndHorizontal();
            brandSettingsScroll=GUILayout.BeginScrollView(SwipePosition("settings",brandSettingsScroll),false,true,GUIStyle.none,GUI.skin.verticalScrollbar);
            GUILayout.BeginVertical(new GUIStyle { fixedWidth=width-54,stretchWidth=false });
            if(settingsCategory=="") {
                bool wide = !Application.isMobilePlatform && width >= 850;
                float categoryWidth = wide ? (width - 76) * .5f : 0;
                if(wide)GUILayout.BeginHorizontal();
                SettingsCategoryButton("Визуальные","Тема, рамки, обои и иконка приложения.","Визуальные",categoryWidth);
                SettingsCategoryButton("Графические","Качество, FPS и режим окна.","Графические",categoryWidth);
                if(wide) { GUILayout.EndHorizontal();GUILayout.BeginHorizontal(); }
                SettingsCategoryButton("Управление","Камера, чувствительность и поле зрения.","Управление",categoryWidth);
                SettingsCategoryButton("Сеть и аккаунт","Вход, облачные герои и глобальный чат.","Сеть и аккаунт",categoryWidth);
                if(wide) { GUILayout.EndHorizontal();GUILayout.BeginHorizontal(); }
                SettingsCategoryButton("Данные и устройство","Локальный архив и сохранение персонажей.","Данные и устройство",categoryWidth);
                SettingsCategoryButton("Обновления","Проверка новой версии и история изменений.","Обновления",categoryWidth);
                if(wide)GUILayout.EndHorizontal();
                if(cloudSession!=null)SettingsCategoryButton("Обращения и управление","Жалобы, заявки и инструменты в рамках серверных прав.","Обращения и управление");
            } else {
                if(GUILayout.Button("← Все настройки",brandBrown,GUILayout.MinHeight(54)))OpenSettingsCategory("");
                switch(settingsCategory) {
                    case "Визуальные":
                        GUILayout.BeginVertical(GUI.skin.box);SettingsSection("Тема оформления");
                        int accentIndex = Math.Max(0, Array.IndexOf(BrandAccentKeys, settingsDraft.theme));
                        settingsDraft.theme = BrandAccentKeys[MenuGrid(accentIndex, BrandAccentNames.Select((name, i) => name + (i == accentIndex ? " ✓" : "")).ToArray(), 2)];
                        GUILayout.EndVertical();
                        GUILayout.BeginVertical(GUI.skin.box);SettingsSection("Оформление рамок");
                        int frameIndex = Math.Max(0, Array.IndexOf(BrandFrameKeys, settingsDraft.frameStyle));
                        settingsDraft.frameStyle = BrandFrameKeys[MenuGrid(frameIndex, BrandFrameNames.Select((name, i) => name + (i == frameIndex ? " ✓" : "")).ToArray(), 2)];
                        int colorIndex = Math.Max(0, Array.IndexOf(BrandFrameColors, settingsDraft.frameColor));
                        settingsDraft.frameColor = BrandFrameColors[MenuGrid(colorIndex, BrandFrameLabels.Select((name, i) => name + (i == colorIndex ? " ✓" : "")).ToArray(), 3)];
                        GUILayout.EndVertical();
                        // Retain the packaged main reference: wallpapers/16.png.
                        GUILayout.Label("Обои и значки приложения можно выбрать ниже.",sheetQuiet);
                        DrawAppearanceLibrary();break;
                    case "Сеть и аккаунт":
                        SettingsSection("Аккаунт и облачные персонажи");
                        GUILayout.Label(cloudSession==null?"Гостевой режим. Локальные герои доступны без регистрации.":(string)cloudSession["email"],sheetQuiet);
                        if(GUILayout.Button("Аккаунт и синхронизация",brandBlue,GUILayout.MinHeight(64)))Navigate(FrontScreen.Account);
                        DrawChatNicknameSettings();break;
                    case "Обращения и управление":DrawStaffSettingsPanels();break;
                    case "Графические":
                        DrawDesktopWindowControls();settingsSection=2;DrawSettings(true);break;
                    case "Управление":settingsSection=3;DrawSettings(true);break;
                    case "Данные и устройство":
                        settingsSection=4;DrawSettings(true);
                        if(archive!=null)
                        {
                            if(GUILayout.Button("Копировать весь архив",GUI.skin.button,GUILayout.MinHeight(44))){GUIUtility.systemCopyBuffer=archive.Export();brandNotice="Архив всех героев скопирован";}
                            if(GUILayout.Button("Файлы и резервные копии",GUI.skin.button,GUILayout.MinHeight(44))){Navigate(FrontScreen.Sheet);sheetTab=6;}
                            if(GUILayout.Button("Кошелёк персонажа",GUI.skin.button,GUILayout.MinHeight(44))){Navigate(FrontScreen.Sheet);sheetTab=7;}
                            if(GUILayout.Button("Паспорт персонажа",GUI.skin.button,GUILayout.MinHeight(44))){Navigate(FrontScreen.Sheet);sheetTab=8;}
                        }
                        if(GUILayout.Button("Выбрать настройки по умолчанию",brandBrown,GUILayout.MinHeight(60))) {
                            settingsDraft=new ClientPreferences { quality=platformQuality };
                            brandNotice="Выбраны стандартные параметры. Нажмите «Сохранить настройки». Персонажи сохранены.";
                        }
                        break;
                    case "Обновления":
                        SettingsSection("Обновления приложения");GUILayout.Label("Установлена Unity "+UnityRelease.Version,sheetQuiet);
                        if(GUILayout.Button("Проверить и обновить",brandBlue,GUILayout.MinHeight(56))) { settingsSection=0;showChangelog=false;brandTechnicalScreen=true; }
                        if(GUILayout.Button("История изменений",brandBrown,GUILayout.MinHeight(54))) { settingsSection=0;showChangelog=true;brandTechnicalScreen=true;StartCoroutine(FetchChangelog()); }
                        break;
                }
            }
            GUILayout.Label(brandNotice??"",sheetQuiet);GUILayout.Space(12);
            GUILayout.EndVertical();GUILayout.EndScrollView();RegisterSwipe("settings",GUILayoutUtility.GetLastRect());
            if(settingsCategory!=""&&GUILayout.Button("Сохранить настройки",brandGreen,GUILayout.MinHeight(56)))BrandSaveAppearance();
            GUILayout.EndArea();
        }

        private float Card(float start, float width, float height, string label, Color accent)
        {
            GUI.Box(new Rect(0,start,width,height),GUIContent.none,settingsInset);
            settingsHeader.normal.textColor=accent;
            GUI.Label(new Rect(13,start+9,width-26,35),label,settingsHeader);
            return start+height+12;
        }
        private void TextLine(float y, float width, string text, float height)
        {
            GUI.Label(new Rect(13,y,width-26,height),text,settingsDescription);
        }
        private void BrandSaveAppearance()
        {
            Attempt(() => {
                settingsDraft.Save(SettingsPath);
                preferences=ClientPreferences.Parse(settingsDraft.Export());
                ApplyPreferences();InvalidateBrandStyles();
                brandNotice="Настройки сохранены.";
            });
        }

        private void DrawTechnicalSettings()
        {
            PrepareSheetSkin();PrepareSettingsSkin();
            DrawBrandBackdrop(true);
            heading ??= new GUIStyle(GUI.skin.label) { fontSize = 26, fontStyle = FontStyle.Bold, wordWrap = true };
            muted ??= new GUIStyle(GUI.skin.label) { fontSize = 16, wordWrap = true,
                normal = { textColor = new Color(.77f,.75f,.72f) } };
            float width = Mathf.Min(UiWidth-20,BrandMaxWidth);
            float x=(UiWidth-width)*.5f;
            Rect outer=new Rect(x,10,width,UiHeight-20);
            GUI.Box(outer,GUIContent.none,brandCard);
            var backText = new GUIContent("← К настройкам");
            float backWidth = Mathf.Min(width-48, Mathf.Max(230, brandBrown.CalcSize(backText).x+12));
            var back = new Rect(x+12,16,backWidth,Mathf.Max(54,brandBrown.CalcHeight(backText,backWidth)));
            if (GUI.Button(back,backText,brandBrown)) { brandTechnicalScreen=false; return; }
            DesktopUiSmoke.RecordButton(backText.text, brandBrown, back);
            GUILayout.BeginArea(new Rect(x+13,back.yMax+12,width-26,UiHeight-back.yMax-32));
            frontScroll=GUILayout.BeginScrollView(SwipePosition("technical-settings",frontScroll),false,true,GUIStyle.none,GUI.skin.verticalScrollbar);
            GUILayout.BeginVertical(new GUIStyle { fixedWidth=width-48,stretchWidth=false });
            DrawSettings();
            GUILayout.EndVertical();GUILayout.EndScrollView();RegisterSwipe("technical-settings",GUILayoutUtility.GetLastRect());
            GUILayout.EndArea();
        }
    }
}
