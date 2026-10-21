using System;
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
        private bool showAdminPanel,showModeratorPanel;
        private GUIStyle settingsHeader, settingsDescription, settingsInset;
        private float brandSettingsContentHeight = 1320;

        private void PrepareSettingsSkin()
        {
            PrepareBrand();
            if (settingsHeader != null) return;
            settingsHeader = new GUIStyle(brandTitle) { fontSize = 24, wordWrap = true, font = sheetSerif };
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
            float width=Mathf.Min(UiWidth-24,600),x=(UiWidth-width)*.5f;
            GUI.Box(new Rect(x,12,width,UiHeight-24),GUIContent.none,brandCard);
            GUILayout.BeginArea(new Rect(x+16,24,width-32,UiHeight-48));
            GUILayout.BeginHorizontal();GUILayout.Label("Настройки приложения",settingsHeader);if(GUILayout.Button("×",brandRed,GUILayout.Width(46),GUILayout.Height(46)))Navigate(FrontScreen.Home);GUILayout.EndHorizontal();
            brandSettingsScroll=GUILayout.BeginScrollView(SwipePosition("settings",brandSettingsScroll),false,true,GUIStyle.none,GUI.skin.verticalScrollbar);
            GUILayout.BeginVertical(new GUIStyle { fixedWidth=width-54,stretchWidth=false });
            GUILayout.BeginVertical(GUI.skin.box);SettingsSection("Аккаунт и облачные персонажи");
            GUILayout.Label(cloudSession==null?"Гостевой режим. Локальные герои доступны без регистрации.":(string)cloudSession["email"],sheetQuiet);
            if(GUILayout.Button("Аккаунт и синхронизация",brandBlue,GUILayout.MinHeight(64)))Navigate(FrontScreen.Account);
            GUILayout.EndVertical();
            DrawStaffSettingsPanels();
            GUILayout.BeginVertical(GUI.skin.box);SettingsSection("Тема оформления");
            for(int i=0;i<BrandAccentKeys.Length;i++)if(GUILayout.Button(BrandAccentNames[i]+(settingsDraft.theme==BrandAccentKeys[i]?" ✓":""),brandBrown,GUILayout.MinHeight(50)))settingsDraft.theme=BrandAccentKeys[i];
            GUILayout.EndVertical();
            GUILayout.BeginVertical(GUI.skin.box);SettingsSection("Оформление рамок");
            for(int i=0;i<BrandFrameKeys.Length;i++)if(GUILayout.Button(BrandFrameNames[i]+(settingsDraft.frameStyle==BrandFrameKeys[i]?" ✓":""),GUILayout.MinHeight(50)))settingsDraft.frameStyle=BrandFrameKeys[i];
            for(int i=0;i<BrandFrameColors.Length;i++)if(GUILayout.Button(BrandFrameLabels[i]+(settingsDraft.frameColor==BrandFrameColors[i]?" ✓":""),brandGold,GUILayout.MinHeight(48)))settingsDraft.frameColor=BrandFrameColors[i];
            GUILayout.EndVertical();
            GUILayout.BeginVertical(GUI.skin.box);SettingsSection("Шрифт и оформление");GUILayout.Label("Сохранены wallpapers/16.png. Книжный системный шрифт с резервной гарнитурой. Размер интерфейса адаптирован под телефон.",sheetQuiet);GUILayout.Label("Смена значка Android и аудиопаки пока недоступны.",sheetQuiet);GUILayout.EndVertical();
            GUILayout.BeginVertical(GUI.skin.box);SettingsSection("Мастерская дополнений");if(GUILayout.Button("Открыть мастерскую",brandBlue,GUILayout.Height(56)))OpenContentManager();GUILayout.EndVertical();
            GUILayout.BeginVertical(GUI.skin.box);SettingsSection("Обновления приложения");GUILayout.Label("Установлена Unity "+UnityRelease.Version,sheetQuiet);
            if(GUILayout.Button("Проверить и обновить",brandBlue,GUILayout.Height(56))) { settingsSection=0;showChangelog=false;brandTechnicalScreen=true; }
            if(GUILayout.Button("История изменений",brandBrown,GUILayout.Height(54))) { settingsSection=0;showChangelog=true;brandTechnicalScreen=true;StartCoroutine(FetchChangelog()); }GUILayout.EndVertical();
            GUILayout.BeginVertical(GUI.skin.box);SettingsSection("Графика и управление");
            settingsDraft.keepScreenAwake=GUILayout.Toggle(settingsDraft.keepScreenAwake,"Не выключать экран, пока приложение открыто",GUILayout.MinHeight(58));
            if(GUILayout.Button("Графика и FPS",brandGold,GUILayout.Height(54))) { settingsSection=2;brandTechnicalScreen=true; }
            if(GUILayout.Button("Камера, управление и данные",brandGold,GUILayout.MinHeight(60))) { settingsSection=3;brandTechnicalScreen=true; }GUILayout.EndVertical();
            GUILayout.Label(brandNotice??"",sheetQuiet);GUILayout.Space(12);
            GUILayout.EndVertical();GUILayout.EndScrollView();RegisterSwipe("settings",GUILayoutUtility.GetLastRect());
            if(GUILayout.Button("Сохранить настройки",brandGreen,GUILayout.Height(56)))BrandSaveAppearance();
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
                brandNotice="Оформление сохранено.";
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
            if(GUI.Button(new Rect(x+12,16,Mathf.Min(160,width*.42f),43),"← К оформлению",brandBrown))
            { brandTechnicalScreen=false; return; }
            GUILayout.BeginArea(new Rect(x+13,66,width-26,UiHeight-86));
            frontScroll=GUILayout.BeginScrollView(SwipePosition("technical-settings",frontScroll),false,true,GUIStyle.none,GUI.skin.verticalScrollbar);
            GUILayout.BeginVertical(new GUIStyle { fixedWidth=width-48,stretchWidth=false });
            DrawSettings();
            GUILayout.EndVertical();GUILayout.EndScrollView();RegisterSwipe("technical-settings",GUILayoutUtility.GetLastRect());
            GUILayout.EndArea();
        }
    }
}
