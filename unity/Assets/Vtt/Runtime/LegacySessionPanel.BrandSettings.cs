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
        private GUIStyle settingsHeader, settingsDescription, settingsInset;
        private float brandSettingsContentHeight = 1320;

        private void PrepareSettingsSkin()
        {
            PrepareBrand();
            if (settingsHeader != null) return;
            settingsHeader = new GUIStyle(brandTitle) { fontSize = 22, wordWrap = true };
            settingsDescription = new GUIStyle(brandSub) { fontSize = 17, wordWrap = true };
            settingsInset = new GUIStyle(brandCard) {
                padding = new RectOffset(14,14,12,12),
                margin = new RectOffset(0,0,7,7)
            };
        }
        private void DrawBrandSettings()
        {
            PrepareSettingsSkin();
            if (settingsDraft == null)
            {
                // Recover from a stale navigation state instead of rendering
                // an empty frame as 1.00.04 did.
                settingsDraft = ClientPreferences.Parse(preferences.Export());
            }
            DrawBrandBackdrop(true);
            float width = Mathf.Min(Screen.width - 20f, 660f);
            float x = (Screen.width - width) * .5f;
            float height = Mathf.Max(200f, Screen.height - 20f);
            Rect outer = new Rect(x, 10f, width, height);
            GUI.Box(outer, GUIContent.none, brandCard);
            GUI.BeginGroup(outer);

            GUI.Label(new Rect(18, 14, width - 91, 44), "⚙ Настройки приложения", brandTitle);
            if (GUI.Button(new Rect(width - 65, 13, 48, 44), "✕", brandRed))
            { Navigate(FrontScreen.Home); GUI.EndGroup(); return; }

            float footerTop = height - 66;
            float viewportHeight = Mathf.Max(95, footerTop - 72);
            float viewportWidth = width - 24;
            float contentWidth = Mathf.Max(170, viewportWidth - 21);
            brandSettingsScroll = GUI.BeginScrollView(
                new Rect(12, 64, viewportWidth, viewportHeight),
                brandSettingsScroll, new Rect(0,0,contentWidth,brandSettingsContentHeight));

            float y = 4;
            y = Card(y, contentWidth, 132, "☁ Аккаунт и персонажи", new Color(.88f,.72f,.47f));
            TextLine(y-75, contentWidth, "Локальных героев: " + (archive?.Count ?? 0), 37);
            if (GUI.Button(new Rect(13, y-54, contentWidth-26, 42), "Мои персонажи", brandBlue))
                Navigate(FrontScreen.Characters);

            y = Card(y,contentWidth,143, "🎨 Тема оформления (Акцент)", BrandAccent);
            TextLine(y-96,contentWidth,"Цвет заголовков и кнопок.",24);
            float half = (contentWidth - 34) * .5f;
            for (int i=0; i<BrandAccentKeys.Length;i++)
            {
                var rect = new Rect(13+(i%2)*(half+8), y-69+(i/2)*38, half, 34);
                if (GUI.Button(rect, BrandAccentNames[i] + (settingsDraft.theme == BrandAccentKeys[i] ? " ✓" : ""), brandBrown))
                    settingsDraft.theme = BrandAccentKeys[i];
            }
            y = Card(y,contentWidth,110,"✍ Типографика", BrandAccent);
            TextLine(y-71,contentWidth,"Читаемый мобильный шрифт. Декоративные гарнитуры — в отдельном пакете.",60);

            y = Card(y,contentWidth,109,"🖼 Иконка приложения",new Color(.9f,.79f,.48f));
            TextLine(y-70,contentWidth,"Сейчас значок задаётся Android-сборкой. Переключение launcher-иконки ещё не подключено.",61);

            y = Card(y,contentWidth,149,"🪄 Оформление рамок",new Color(.9f,.79f,.48f));
            float subHalf = (contentWidth-34)*.5f;
            for(int i=0;i<BrandFrameKeys.Length;i++)
                if (GUI.Button(new Rect(13+i*(subHalf+8), y-107, subHalf, 35),
                    BrandFrameNames[i] + (settingsDraft.frameStyle==BrandFrameKeys[i]?" ✓":""), brandBrown))
                    settingsDraft.frameStyle = BrandFrameKeys[i];
            for(int i=0;i<BrandFrameColors.Length;i++)
            {
                float colW=(contentWidth-26)/3f;
                var rect = new Rect(13+(i%3)*colW,y-67+(i/3)*35,colW-5,31);
                if(GUI.Button(rect,BrandFrameLabels[i]+(settingsDraft.frameColor==BrandFrameColors[i]?" ✓":""),brandGold))
                    settingsDraft.frameColor=BrandFrameColors[i];
            }

            y = Card(y,contentWidth,111,"🖼 Обои и арты",new Color(.9f,.79f,.48f));
            TextLine(y-75,contentWidth,"Установлены wallpapers/16.png. Остальные обои — будущие загружаемые пакеты.",65);

            y = Card(y,contentWidth,100,"♫ Аудио и эмбиент",BrandAccent);
            TextLine(y-63,contentWidth,"Оформление подготовлено. Аудиопаки добавим отдельно.",52);

            y = Card(y,contentWidth,105,"📜 История изменений",new Color(.9f,.79f,.48f));
            if(GUI.Button(new Rect(13,y-60,contentWidth-26,43),"📜 Открыть «Что нового»",brandBrown))
            { showChangelog = true; settingsSection = 0; brandTechnicalScreen = true; StartCoroutine(FetchChangelog()); }

            y = Card(y,contentWidth,128,"🔄 Обновления приложения",new Color(.25f,.75f,1f));
            TextLine(y-88,contentWidth,"Установлена Unity " + UnityRelease.Version,27);
            if(GUI.Button(new Rect(13,y-57,contentWidth-26,43),"🔎 Проверить и обновить",brandBlue))
            { settingsSection = 0; showChangelog = false; brandTechnicalScreen = true; }

            y = Card(y,contentWidth,139,"⚙ Дополнительные параметры",BrandAccent);
            if(GUI.Button(new Rect(13,y-94,contentWidth-26,38),"Графика и FPS",brandGold))
            { settingsSection=2; brandTechnicalScreen=true; }
            if(GUI.Button(new Rect(13,y-49,contentWidth-26,38),"Камера, управление и данные",brandGold))
            { settingsSection=3; brandTechnicalScreen=true; }

            brandSettingsContentHeight = y + 12;
            GUI.EndScrollView();

            if(!string.IsNullOrEmpty(brandNotice))
                GUI.Label(new Rect(18,footerTop-31,width-36,26),brandNotice,settingsDescription);
            float saveW = (width-44)*.60f;
            if(GUI.Button(new Rect(12,footerTop,saveW,49),"Сохранить оформление",brandGreen))
                BrandSaveAppearance();
            if(GUI.Button(new Rect(20+saveW,footerTop,width-saveW-32,49),"Закрыть",brandBrown))
                Navigate(FrontScreen.Home);
            GUI.EndGroup();
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
                ApplyPreferences();
                brandNotice="Оформление сохранено.";
            });
        }

        private void DrawTechnicalSettings()
        {
            PrepareSettingsSkin();
            DrawBrandBackdrop(true);
            heading ??= new GUIStyle(GUI.skin.label) { fontSize = 26, fontStyle = FontStyle.Bold, wordWrap = true };
            muted ??= new GUIStyle(GUI.skin.label) { fontSize = 16, wordWrap = true,
                normal = { textColor = new Color(.77f,.75f,.72f) } };
            float width = Mathf.Min(Screen.width-20,BrandMaxWidth);
            float x=(Screen.width-width)*.5f;
            Rect outer=new Rect(x,10,width,Screen.height-20);
            GUI.Box(outer,GUIContent.none,brandCard);
            if(GUI.Button(new Rect(x+12,16,Mathf.Min(160,width*.42f),43),"← К оформлению",brandBrown))
            { brandTechnicalScreen=false; return; }
            GUILayout.BeginArea(new Rect(x+13,66,width-26,Screen.height-86));
            frontScroll=GUILayout.BeginScrollView(frontScroll,false,true);
            DrawSettings();
            GUILayout.EndScrollView();
            GUILayout.EndArea();
        }
    }
}
