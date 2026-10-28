using System;
using System.Globalization;
using System.Linq;
using Newtonsoft.Json.Linq;
using UnityEngine;

namespace DndVtt.UnityPrototype
{
    public sealed partial class LegacySessionPanel
    {
        private Texture2D sheetParchment;
        private float classicControlWidth;
        private int? requestedSheetTab,requestedSheetCharacter;
        private FrontScreen? requestedSheetDestination;
        private bool classicPortraitOpen,classicProfileEdit;
        private bool? pendingBaseRest;
        private string healthAmount="1",newFolderName="",notesQuery="";
        private readonly int[] classicTabs={0,1,2,3,4,5,9};
        private readonly string[] classicTabNames={"Герой","Навыки","Способности","Инвентарь","Заметки","Дайсы","Лор"};
        private float ClassicBodyWidth=>UiWidth-2*Mathf.Min(28f,UiWidth*.04f)-22;
        private int ClassicButtonRow(params string[] labels)
        {
            float available=classicControlWidth>0?classicControlWidth:ClassicBodyWidth-36;
            float cell=Mathf.Max(40,(available-labels.Length*4)/labels.Length);
            float height=Mathf.Max(44,labels.Select(label=>GUI.skin.button.CalcHeight(new GUIContent(label),cell)).DefaultIfEmpty(44).Max());
            int result=-1;GUILayout.BeginHorizontal();for(int i=0;i<labels.Length;i++)if(MeasuredMenuButton(labels[i],GUI.skin.button,GUILayout.Width(cell),GUILayout.Height(height)))result=i;GUILayout.EndHorizontal();return result;
        }
        private void DrawClassicSheetBackdrop()
        {
            PrepareBrand();if(!sheetParchment)sheetParchment=Resources.Load<Texture2D>("UI/Parchment");
            Rect full=new Rect(0,0,UiWidth,UiHeight);var chosen=SelectedAppearanceImage("wallpaper");
            Shade(full,new Color(.20f,.18f,.15f));Cover(chosen?chosen:sheetParchment?sheetParchment:brandWallpaper,full);
            Shade(full,new Color(0,0,0,chosen?.45f:.20f));
            Shade(new Rect(0,0,UiWidth,60),new Color(.15f,.15f,.15f,.99f));
        }
        private void DrawClassicSheetNavigation()
        {
            GUILayout.BeginHorizontal();
            if(MeasuredMenuButton("Меню",sheetActiveTab,GUILayout.Width(60),GUILayout.Height(44)))requestedSheetDestination=FrontScreen.Home;
            int active=Array.IndexOf(classicTabs,sheetTab);
            sheetTabsScroll=GUILayout.BeginScrollView(SwipePosition("sheet-tabs",sheetTabsScroll),false,false,GUIStyle.none,GUIStyle.none,GUILayout.Height(48));GUILayout.BeginHorizontal();
            for(int i=0;i<classicTabs.Length;i++)
            {
                string label=classicTabNames[i];float width=Mathf.Max(65,sheetTabStyle.CalcSize(new GUIContent(label)).x+12);
                if(MeasuredMenuButton(label,active==i?sheetActiveTab:sheetTabStyle,GUILayout.Width(width),GUILayout.Height(44)))requestedSheetTab=classicTabs[i];
                if(active==i&&Event.current.type==EventType.Repaint){Rect r=GUILayoutUtility.GetLastRect();Shade(new Rect(r.x,r.yMax-3,r.width,3),BrandAccent);}
            }
            GUILayout.EndHorizontal();GUILayout.EndScrollView();RegisterSwipe("sheet-tabs",GUILayoutUtility.GetLastRect(),true);
            if(MeasuredMenuButton("Ещё",sheetActionsOpen?sheetActiveTab:sheetTabStyle,GUILayout.Width(48),GUILayout.Height(44)))sheetActionsOpen=!sheetActionsOpen;
            GUILayout.EndHorizontal();
            if(!sheetActionsOpen)return;
            float previousWidth=classicControlWidth;classicControlWidth=UiWidth-2*Mathf.Min(28f,UiWidth*.04f)-36;
            GUILayout.BeginVertical(GUI.skin.box);GUILayout.Label(archive!=null&&archive.Count>0?archive.Name(selected):"Персонаж",sheetCharacterName);
            if(archive==null){if(FitMenuButton("Открыть персонажей"))requestedSheetDestination=FrontScreen.Characters;GUILayout.EndVertical();classicControlWidth=previousWidth;return;}
            if(archive!=null&&archive.Count>1)
            {
                int heroAction=ClassicButtonRow("← Предыдущий герой","Следующий герой →");
                if(heroAction==0)requestedSheetCharacter=(selected+archive.Count-1)%archive.Count;if(heroAction==1)requestedSheetCharacter=(selected+1)%archive.Count;
            }
            int detailAction=ClassicButtonRow("Файлы","Кошелёк","Паспорт");if(detailAction>=0)requestedSheetTab=new[]{6,7,8}[detailAction];
            int menuAction=ClassicButtonRow("Персонажи","Настройки","Сохранить");
            if(menuAction==0)requestedSheetDestination=FrontScreen.Characters;if(menuAction==1)requestedSheetDestination=FrontScreen.Settings;
            if(menuAction==2)Attempt(()=>{SaveSheet();status="Сохранено на устройстве";});
            if(FitMenuButton("Копировать весь архив")){GUIUtility.systemCopyBuffer=archive.Export();status="Архив всех героев скопирован";}
            if(FitMenuButton("Сохранить архив в файл…"))Attempt(()=>PickCharacterFile(true));
            GUILayout.EndVertical();classicControlWidth=previousWidth;
        }
        private void FinishSheetNavigation()
        {
            if(requestedSheetCharacter.HasValue){selected=requestedSheetCharacter.Value;requestedSheetCharacter=null;ClearSheetInputs();frontScroll=Vector2.zero;}
            if(requestedSheetDestination.HasValue){var destination=requestedSheetDestination.Value;requestedSheetDestination=null;Navigate(destination);}
        }
        private void SheetAction(Action action,ref bool changed)
        {try{action();changed=true;}catch(Exception e){status=e.Message;}}
        private bool SheetFold(string key,string label)
        {bool open=expanded.Contains(key);if(FitMenuButton((open?"▾ ":"▸ ")+label)){ResetFormInput();if(open)expanded.Remove(key);else expanded.Add(key);open=!open;}return open;}
        private GUIStyle classicLegacySurface;
        private GUIStyle ClassicLegacySurface=>classicLegacySurface??=new GUIStyle{normal={background=brandCard.normal.background},border=new RectOffset(16,16,16,16),padding=new RectOffset(),margin=new RectOffset()};
        private void ClassicHint(string text)
        {GUILayout.BeginVertical(GUI.skin.box);GUILayout.Label(text,sheetQuiet);GUILayout.EndVertical();}
        private void ClassicHero(JObject hero,ref bool changed)
        {
            bool wide=UiWidth>=900;classicControlWidth=(wide?Mathf.Min(360,UiWidth*.32f):ClassicBodyWidth)-36;
            if(wide){GUILayout.BeginHorizontal();GUILayout.BeginVertical(GUILayout.Width(Mathf.Min(360,UiWidth*.32f)));}
            GUILayout.BeginVertical(GUI.skin.box);SheetSection("Герой");GUILayout.BeginHorizontal();
            var art=HeroArtTexture(hero);Rect preview=GUILayoutUtility.GetRect(92,116,GUILayout.Width(92),GUILayout.Height(116));
            GUI.DrawTexture(preview,Texture2D.whiteTexture,ScaleMode.StretchToFill,false,0,new Color(.12f,.12f,.13f),0,6);
            if(art)GUI.DrawTexture(new Rect(preview.x+3,preview.y+3,preview.width-6,preview.height-6),art,ScaleMode.ScaleToFit);
            else GUI.Label(new Rect(preview.x+6,preview.y+20,preview.width-12,80),"Ваш\nпортрет",sheetQuiet);
            GUILayout.BeginVertical();GUILayout.Label((string)hero["name"]??"Без имени",sheetCharacterName);
            var classes=hero["classes"] as JArray;
            if(classes!=null&&classes.Count>0)foreach(JObject c in classes.OfType<JObject>())GUILayout.Label(c["name"]+" · "+c["level"]+" ур."+(string.IsNullOrEmpty((string)c["subclass"])?"":"\n"+c["subclass"]),sheetQuiet);
            else GUILayout.Label((string)(hero["class"]??hero["className"])??"Класс не выбран",sheetQuiet);
            GUILayout.Label((string)(hero["raceName"]??hero["race"])??"Раса не указана",sheetQuiet);
            GUILayout.EndVertical();GUILayout.EndHorizontal();
            GUILayout.Label((string)hero["background"]??"Предыстория не указана",sheetQuiet);
            if(MeasuredMenuButton("Опыт и уровень · "+DisplayExperience(hero)+" XP",brandGold,GUILayout.MinHeight(44)))BeginAdvancement(hero,true);
            int profileAction=ClassicButtonRow(classicPortraitOpen?"Скрыть портрет":"Портрет…",classicProfileEdit?"Готово":"Изменить сведения");if(profileAction==0)classicPortraitOpen=!classicPortraitOpen;if(profileAction==1){ResetFormInput();classicProfileEdit=!classicProfileEdit;}
            if(classicProfileEdit)
            {
                Scalar(hero,"name","Имя",ref changed);
                foreach(var pair in new[]{("background","Предыстория"),("profession","Профессия")})Scalar(hero,pair.Item1,pair.Item2,ref changed);
                GUILayout.Label("Класс и уровень меняются через мастер повышения.",sheetQuiet);
            }
            GUILayout.EndVertical();if(classicPortraitOpen)DrawHeroArt(hero);
            if(wide){GUILayout.EndVertical();GUILayout.BeginVertical();}
            classicControlWidth=(wide?ClassicBodyWidth-Mathf.Min(360,UiWidth*.32f):ClassicBodyWidth)-36;
            ClassicCombat(hero,ref changed);ClassicStats(hero,ref changed);
            if(wide){GUILayout.EndVertical();GUILayout.EndHorizontal();}classicControlWidth=0;
        }
        private void ClassicNumber(JObject hero,string field,string label,ref bool changed,JToken fallback)
        {
            GUILayout.BeginVertical(sheetMetricBox,GUILayout.ExpandWidth(true));GUILayout.Label(label,sheetQuiet);
            string key="classic:"+hero["id"]+":"+field;string old=edits.TryGetValue(key,out var saved)?saved:(hero[field]??fallback)?.ToString()??"0";
            string value=IntegerField(key,old,GUILayout.MinHeight(44),GUILayout.MinWidth(40),GUILayout.ExpandWidth(true));edits[key]=value;
            if(value!=old){if(int.TryParse(value,NumberStyles.Integer,CultureInfo.InvariantCulture,out int number)&&number>=0){hero[field]=number;changed=true;}else status="Введите неотрицательное целое: "+label;}
            GUILayout.EndVertical();
        }
        private void ClassicCombat(JObject hero,ref bool changed)
        {
            GUILayout.BeginVertical(GUI.skin.box);SheetSection("Боевые параметры");GUILayout.BeginHorizontal();
            ClassicNumber(hero,"ac","КД",ref changed,10);
            GUILayout.BeginVertical(sheetMetricBox,GUILayout.ExpandWidth(true));GUILayout.Label("Инициатива",sheetQuiet);GUILayout.Label(Signed(CharacterSheetRules.Modifier(hero,"dex")),sheetCharacterName);
            if(MeasuredMenuButton("d20",GUI.skin.button,GUILayout.MinHeight(44)))Roll("Инициатива",20,CharacterSheetRules.Modifier(hero,"dex"));GUILayout.EndVertical();
            GUILayout.BeginVertical(sheetMetricBox,GUILayout.ExpandWidth(true));GUILayout.Label("Скорость",sheetQuiet);
            string speed=(string)hero["speed"]??"30 футов";string next=GUILayout.TextField(speed,sheetMetricInput,GUILayout.MinHeight(44),GUILayout.MinWidth(40));if(next!=speed){hero["speed"]=next;changed=true;}GUILayout.EndVertical();GUILayout.EndHorizontal();
            GUILayout.Label("Здоровье",sheetCharacterName);GUILayout.BeginHorizontal();
            ClassicNumber(hero,"hpMax","Максимум",ref changed,archive.MaximumHp(selected));ClassicNumber(hero,"hpCurrent","Текущие HP",ref changed,archive.CurrentHp(selected));ClassicNumber(hero,"hpTemp","Временные",ref changed,archive.TemporaryHp(selected));GUILayout.EndHorizontal();
            GUILayout.BeginHorizontal();healthAmount=IntegerField("health-amount",healthAmount,GUILayout.Width(70),GUILayout.Height(44));
            if(MeasuredMenuButton("− Урон",brandRed,GUILayout.MinHeight(44)))HealthAction(hero,false,ref changed);
            if(MeasuredMenuButton("+ Лечение",brandGreen,GUILayout.MinHeight(44)))HealthAction(hero,true,ref changed);GUILayout.EndHorizontal();
            GUILayout.Label("Урон сначала расходует временные HP.",sheetQuiet);
            if(SheetFold("classic-conditions","Состояния и спасброски от смерти"))
            {
                GUILayout.Label("Отметки для игры за столом. Автоматические эффекты состояний ещё переносятся.",sheetQuiet);
                string[] names={"Отравлен","Сбит с ног","Ослеплен","Очарован","Испуган","Невидимость","Парализован","Оглушен","Захвачен"};
                for(int i=0;i<names.Length;i++){if(i%2==0)GUILayout.BeginHorizontal();string name=names[i];var condition=(hero["activeConditions"] as JObject)?[name];bool active=condition?.Type==JTokenType.Boolean&&(bool)condition;
                    if(MeasuredMenuButton((active?"✓ ":"")+name,active?brandRed:GUI.skin.button,GUILayout.MinHeight(44)))SheetAction(()=>CharacterSheetRules.ToggleSheetCondition(hero,name),ref changed);
                    if(i%2==1||i==names.Length-1)GUILayout.EndHorizontal();}
                CharacterSheetRules.TrySheetCount((hero["deathSaves"] as JObject)?["successes"],out int successes);CharacterSheetRules.TrySheetCount((hero["deathSaves"] as JObject)?["failures"],out int failures);
                foreach(bool success in new[]{true,false}){GUILayout.BeginHorizontal();GUILayout.Label(success?"Успехи":"Провалы",GUILayout.Width(85));for(int i=1;i<=3;i++){int value=i;int current=success?successes:failures;
                    if(MeasuredMenuButton(current>=i?"●":"○",current>=i?(success?brandGreen:brandRed):GUI.skin.button,GUILayout.Width(46),GUILayout.Height(44)))SheetAction(()=>CharacterSheetRules.SetDeathTrack(hero,success?(current==value?value-1:value):successes,success?failures:(current==value?value-1:value)),ref changed);}
                    GUILayout.EndHorizontal();}
            }
            int restAction=ClassicButtonRow("Короткий отдых…","Длинный отдых…");if(restAction>=0)pendingBaseRest=restAction==1;
            if(pendingBaseRest.HasValue)
            {
                GUILayout.Label(pendingBaseRest.Value?"Восстановить HP, обычные ячейки, пакт и ресурсы с указанным коротким/длинным отдыхом?":"Восстановить пакт, приёмы и ресурсы с указанным коротким отдыхом? HP не изменятся.",sheetQuiet);
                GUILayout.Label("Особые классовые эффекты и ресурсы без правила восстановления учитывайте вручную.",sheetQuiet);
                if(MeasuredMenuButton("Подтвердить отдых",brandGreen,GUILayout.MinHeight(44))){bool full=pendingBaseRest.Value;FlushHealthInputs(hero,ref changed);SheetAction(()=>CharacterSheetRules.RecordRest(hero,full),ref changed);InvalidateHealthInputs(hero);pendingBaseRest=null;}
                if(FitMenuButton("Отмена"))pendingBaseRest=null;
            }
            if(rollResult!="Выберите кубик или проверку")GUILayout.Label(rollResult,sheetQuiet);GUILayout.EndVertical();
        }
        private void InvalidateHealthInputs(JObject hero)
        {foreach(string key in new[]{"hpMax","hpCurrent","hpTemp"})edits.Remove("classic:"+hero["id"]+":"+key);}
        private void FlushHealthInputs(JObject hero,ref bool changed)
        {
            CompleteNumericKeyboard();
            foreach(string field in new[]{"hpMax","hpCurrent","hpTemp"})
            {
                string owner="classic:"+hero["id"]+":"+field;
                if(numericSession.TryTake(owner,out string value)&&int.TryParse(value,NumberStyles.Integer,CultureInfo.InvariantCulture,out int number)&&number>=0)
                {hero[field]=number;changed=true;}
            }
            if(numericSession.TryTake("health-amount",out string amount))healthAmount=amount;
            ResetFormInput();
        }
        private void HealthAction(JObject hero,bool heal,ref bool changed)
        {
            FlushHealthInputs(hero,ref changed);
            if(!int.TryParse(healthAmount,NumberStyles.None,CultureInfo.InvariantCulture,out int amount)){status="Введите целое количество HP";return;}
            SheetAction(()=>CharacterSheetRules.ChangeHealth(hero,amount,heal),ref changed);InvalidateHealthInputs(hero);
        }
        private void ClassicStats(JObject hero,ref bool changed)
        {
            GUILayout.BeginVertical(GUI.skin.box);SheetSection("Характеристики");int columns=UiWidth>=900?3:2;
            var stats=hero["stats"] as JObject??new JObject();
            for(int i=0;i<6;i++)
            {
                if(i%columns==0)GUILayout.BeginHorizontal();string stat=CharacterSheetRules.Stats[i];GUILayout.BeginVertical(GUI.skin.box,GUILayout.ExpandWidth(true));
                GUILayout.Label(CharacterSheetRules.StatNames[i],sheetQuiet);DesktopUiSmoke.RecordSingleLine(CharacterSheetRules.StatNames[i],sheetQuiet,GUILayoutUtility.GetLastRect());
                string key="classic-stat:"+hero["id"]+":"+stat;string old=edits.TryGetValue(key,out var saved)?saved:stats[stat]?.ToString()??"10";
                string value=IntegerField(key,old,GUILayout.MinHeight(44),GUILayout.MinWidth(40));edits[key]=value;
                if(value!=old&&int.TryParse(value,out int score)){stats[stat]=score;hero["stats"]=stats;CharacterSheetRules.Recalculate(hero);changed=true;}
                GUILayout.Label(Signed(CharacterSheetRules.Modifier(hero,stat)),sheetCharacterName);GUILayout.EndVertical();if(i%columns==columns-1)GUILayout.EndHorizontal();
            }
            GUILayout.Label("Бонус мастерства "+Signed(CharacterSheetRules.Proficiency(hero)),sheetQuiet);GUILayout.EndVertical();
            GUILayout.BeginVertical(GUI.skin.box);SheetSection("Спасброски");ClassicSaves(hero,ref changed);GUILayout.EndVertical();
        }
        private void ClassicSaves(JObject hero,ref bool changed)
        {
            var saves=hero["savesData"] as JObject??new JObject();
            for(int i=0;i<6;i++){string key=CharacterSheetRules.Stats[i];bool owned=(bool?)saves[key]??false;GUILayout.BeginHorizontal();
                if(MeasuredMenuButton(owned?"✓":"—",owned?brandGold:GUI.skin.button,GUILayout.Width(44),GUILayout.Height(44))){saves[key]=!owned;hero["savesData"]=saves;changed=true;owned=!owned;}
                GUILayout.Label(CharacterSheetRules.StatNames[i],GUILayout.ExpandWidth(true));int bonus=CharacterSheetRules.Modifier(hero,key)+(owned?CharacterSheetRules.Proficiency(hero):0);
                if(MeasuredMenuButton(Signed(bonus)+" · d20",GUI.skin.button,GUILayout.Width(Mathf.Max(104,GUI.skin.button.CalcSize(new GUIContent(Signed(bonus)+" · d20")).x+4)),GUILayout.Height(44)))Roll("Спасбросок: "+CharacterSheetRules.StatNames[i],20,bonus);GUILayout.EndHorizontal();}
        }
        private void ClassicSkills(JObject hero,ref bool changed)
        {
            GUILayout.BeginVertical(GUI.skin.box);SheetSection("Бонус мастерства");GUILayout.Label(Signed(CharacterSheetRules.Proficiency(hero)),sheetCharacterName);GUILayout.EndVertical();
            GUILayout.BeginVertical(GUI.skin.box);SheetSection("Пассивные чувства");
            foreach(var pair in new[]{("Внимательность",11),("Анализ",8),("Проницательность",6)}){GUILayout.BeginHorizontal();GUILayout.Label(pair.Item1);GUILayout.FlexibleSpace();GUILayout.Label((10+CharacterSheetRules.Skill(hero,pair.Item2)).ToString(),sheetCharacterName);GUILayout.EndHorizontal();}GUILayout.EndVertical();
            GUILayout.BeginVertical(GUI.skin.box);SheetSection("Навыки · 18");GUILayout.Label("— без владения · ✓ владение · ★ экспертиза. Нажмите значок для выбора.",sheetQuiet);
            var skills=hero["skillsData"] as JObject??new JObject();
            for(int i=0;i<CharacterSheetRules.SkillIds.Length;i++)
            {
                string key=CharacterSheetRules.SkillIds[i];int owned=Mathf.Clamp((int)LegacyJson.Number(skills[key]),0,2);GUILayout.BeginHorizontal();
                if(MeasuredMenuButton(new[]{"—","✓","★"}[owned],owned>0?brandGold:GUI.skin.button,GUILayout.Width(44),GUILayout.Height(44))){skills[key]=(owned+1)%3;hero["skillsData"]=skills;CharacterSheetRules.Recalculate(hero);changed=true;}
                GUILayout.Label(CharacterSheetRules.SkillNames[i],GUILayout.ExpandWidth(true));int bonus=CharacterSheetRules.Skill(hero,i);
                if(MeasuredMenuButton(Signed(bonus)+" · d20",GUI.skin.button,GUILayout.Width(Mathf.Max(104,GUI.skin.button.CalcSize(new GUIContent(Signed(bonus)+" · d20")).x+4)),GUILayout.Height(44)))Roll(CharacterSheetRules.SkillNames[i],20,bonus);GUILayout.EndHorizontal();
            }
            GUILayout.Label("Базовые проверки. Особые классовые бонусы пока учитываются вручную.",sheetQuiet);GUILayout.Label(rollResult,sheetQuiet);GUILayout.EndVertical();
        }
        private void ClassicNotes(JObject hero,ref bool changed)
        {
            if(hero["folders"]!=null&&!(hero["folders"] is JArray)){ReadOnly(hero,"folders","Заметки другого формата — данные сохранены");return;}
            var folders=hero["folders"] as JArray??new JArray();GUILayout.BeginVertical(GUI.skin.box);SheetSection("Папки заметок");
            foreach(JObject folder in folders.OfType<JObject>())
            {bool active=JToken.DeepEquals(hero["activeFolderId"],folder["id"]);if(MeasuredMenuButton((active?"✓ ":"")+(string)folder["name"],active?brandGold:GUI.skin.button,GUILayout.MinHeight(44))){ResetFormInput();hero["activeFolderId"]=folder["id"]?.DeepClone();changed=true;}}
            GUILayout.BeginHorizontal();GUI.SetNextControlName("new-note-folder");newFolderName=GUILayout.TextField(newFolderName,GUILayout.MinHeight(44));if(MeasuredMenuButton("+ Папка",brandBlue,GUILayout.Width(104),GUILayout.MinHeight(44)))SheetAction(()=>{CharacterSheetRules.CreateFolder(hero,newFolderName);newFolderName="";},ref changed);GUILayout.EndHorizontal();GUILayout.EndVertical();
            var selectedFolder=folders.OfType<JObject>().FirstOrDefault(f=>JToken.DeepEquals(f["id"],hero["activeFolderId"]))??folders.OfType<JObject>().FirstOrDefault();
            if(selectedFolder==null){ClassicHint("Создайте папку для первой заметки");return;}
            GUILayout.BeginVertical(GUI.skin.box);SheetSection((string)selectedFolder["name"]??"Заметки");
            if(MeasuredMenuButton("+ Заметка",brandGreen,GUILayout.MinHeight(44)))SheetAction(()=>CharacterSheetRules.CreateNote(hero,(string)selectedFolder["id"]),ref changed);
            if(SheetFold("folder-settings:"+selectedFolder["id"],"Настройки папки")){Scalar(selectedFolder,"name","Название",ref changed);if(MeasuredMenuButton("Удалить папку с заметками…",brandRed,GUILayout.MinHeight(44)))RequestDelete(selectedFolder,(string)selectedFolder["name"]);}
            GUILayout.Label("Поиск в папке",sheetQuiet);notesQuery=GUILayout.TextField(notesQuery,GUILayout.MinHeight(44));GUILayout.EndVertical();
            var notes=selectedFolder["notes"] as JArray;if(notes==null){if(selectedFolder["notes"]!=null)ReadOnly(selectedFolder,"notes","Нестандартные заметки — открыть");return;}
            foreach(JObject note in notes.OfType<JObject>().Where(n=>(n["title"]+" "+n["text"]).IndexOf(notesQuery,StringComparison.CurrentCultureIgnoreCase)>=0).ToArray())
            {
                GUILayout.BeginVertical(GUI.skin.box);Scalar(note,"title","Заголовок",ref changed);Scalar(note,"text","Текст",ref changed);
                if(MeasuredMenuButton("Удалить заметку…",brandRed,GUILayout.MinHeight(44)))RequestDelete(note,(string)note["title"]??"Заметка");GUILayout.EndVertical();
            }
            if(notes.Count==0)ClassicHint("В этой папке пока нет заметок");
        }
        private void ClassicAbilities(JObject hero,ref bool changed)
        {
            GUILayout.BeginVertical(GUI.skin.box);SheetSection("Способности и приёмы");
            GUILayout.Label("Характеристика приёмов",sheetQuiet);ClassicAbilityStat(hero,"combatAbilityStat","str",ref changed);string stat=(string)hero["combatAbilityStat"]??"str";int bonus=CharacterSheetRules.Modifier(hero,stat)+CharacterSheetRules.Proficiency(hero);
            GUILayout.Label("Атака "+Signed(bonus)+" · СЛ "+(8+bonus),sheetCharacterName);
            if(FitMenuButton("+ Свой приём"))SheetAction(()=>CharacterSheetRules.Array(hero,"combatAbilities").Add(new JObject{["id"]=Guid.NewGuid().ToString(),["name"]="Новый приём",["description"]="",["rechargeOn"]="none",["maxUses"]=0,["usedCount"]=0}),ref changed);
            GUILayout.EndVertical();
            foreach(JObject ability in (hero["combatAbilities"] as JArray??new JArray()).OfType<JObject>().ToArray())
            {
                GUILayout.BeginVertical(GUI.skin.box);string name=(string)ability["name"]??"Приём";bool detail=SheetFold("ability:"+ability["id"],name);
                bool known=CharacterSheetRules.TrySheetCount(ability["maxUses"],out int max)&&CharacterSheetRules.TrySheetCount(ability["usedCount"],out _);CharacterSheetRules.TrySheetCount(ability["usedCount"],out int used);if(!known){max=0;GUILayout.Label("Особый счётчик · данные сохранены; настройка в разделе «Ещё → Данные»",sheetQuiet);}
                if(max>0){GUILayout.Label("Осталось "+Math.Max(0,max-used)+" / "+max,sheetQuiet);GUILayout.BeginHorizontal();bool enabled=GUI.enabled;GUI.enabled=enabled&&used<max;if(FitMenuButton("− Расход"))SheetAction(()=>CharacterSheetRules.ChangeAbilityUse(hero,ability["id"]?.ToString(),1),ref changed);GUI.enabled=enabled&&used>0;if(FitMenuButton("+ Вернуть"))SheetAction(()=>CharacterSheetRules.ChangeAbilityUse(hero,ability["id"]?.ToString(),-1),ref changed);GUI.enabled=enabled;GUILayout.EndHorizontal();}
                if(detail){foreach(var pair in new[]{("name","Название"),("description","Описание"),("maxUses","Максимум использований"),("rechargeOn","Восстановление: short / long / none")})Scalar(ability,pair.Item1,pair.Item2,ref changed);if(FitMenuButton("Удалить приём…"))RequestDelete(ability,name);}
                GUILayout.EndVertical();
            }
            GUILayout.BeginVertical(GUI.skin.box);SheetSection("Заклинания");ClassicAbilityStat(hero,"spellStat","int",ref changed);string magic=(string)hero["spellStat"]??"int";int attack=CharacterSheetRules.Modifier(hero,magic)+CharacterSheetRules.Proficiency(hero);GUILayout.Label("Атака "+Signed(attack)+" · СЛ "+(8+attack),sheetQuiet);GUILayout.EndVertical();
            ClassicSpellSlots(hero,ref changed);
            foreach(JObject spell in (hero["spellsData"] as JArray??new JArray()).OfType<JObject>().ToArray())
            {
                GUILayout.BeginVertical(GUI.skin.box);bool detail=SheetFold("spell:"+spell["id"],(string)spell["name"]+" · "+spell["level"]);bool prepared=spell["prepared"]?.Type==JTokenType.Boolean&&(bool)spell["prepared"];
                if(MeasuredMenuButton(prepared?"✓ Подготовлено":"Подготовить",prepared?brandBlue:GUI.skin.button,GUILayout.MinHeight(44))){spell["prepared"]=!prepared;changed=true;}
                if(detail){GUILayout.Label((string)(spell["desc"]??spell["description"])??"Описание отсутствует",sheetQuiet);if(FitMenuButton("Удалить заклинание…"))RequestDelete(spell,(string)spell["name"]);}
                GUILayout.EndVertical();
            }
            if(SheetFold("spell-catalog","Добавить заклинание из справочника"))SpellCatalog(hero,ref changed);
            ClassicResources(hero,ref changed);
            if(SheetFold("class-features","Особенности класса"))ReadOnlyToken(hero["features"]??new JArray(),"features",0);
            ClassicHint("Расход счётчика не выполняет атаку, выбор цели или особый классовый эффект. Эти действия пока учитываются за столом.");
        }
        private void ClassicAbilityStat(JObject hero,string key,string fallback,ref bool changed)
        {
            string old=(string)hero[key]??fallback;int active=Array.IndexOf(CharacterSheetRules.Stats,old);
            int next=MenuGrid(active,new[]{"СИЛ","ЛОВ","ТЕЛ","ИНТ","МУД","ХАР"},3);
            if(next>=0&&next!=active){hero[key]=CharacterSheetRules.Stats[next];changed=true;}
        }
        private void ClassicSpellSlots(JObject hero,ref bool changed)
        {
            GUILayout.BeginVertical(GUI.skin.box);SheetSection("Ячейки заклинаний");bool found=false;
            foreach(var p in (hero["spellSlotsData"] as JObject??new JObject()).Properties())
            {
                if(!(p.Value is JObject slot)||!int.TryParse(p.Name,out int level)||level<1||level>9)continue;if(!CharacterSheetRules.TrySheetCount(slot["max"],out int max)||!CharacterSheetRules.TrySheetCount(slot["used"],out int used)){GUILayout.Label("Круг "+level+" · особый счётчик, данные сохранены",sheetQuiet);found=true;continue;}if(max<=0)continue;found=true;
                GUILayout.BeginHorizontal();GUILayout.Label("Круг "+level+" · "+Math.Max(0,max-used)+" / "+max,GUILayout.ExpandWidth(true));bool enabled=GUI.enabled;
                GUI.enabled=enabled&&used<max;if(MeasuredMenuButton("−",GUI.skin.button,GUILayout.Width(44),GUILayout.Height(44)))SheetAction(()=>CharacterSheetRules.ChangeSpellUse(hero,level,1),ref changed);
                GUI.enabled=enabled&&used>0;if(MeasuredMenuButton("+",GUI.skin.button,GUILayout.Width(44),GUILayout.Height(44)))SheetAction(()=>CharacterSheetRules.ChangeSpellUse(hero,level,-1),ref changed);GUI.enabled=enabled;GUILayout.EndHorizontal();
            }
            if(!found)GUILayout.Label("Обычных ячеек пока нет",sheetQuiet);
            if((hero["pactMagicData"] as JObject??hero["pactMagic"] as JObject) is JObject pact)
            {
                bool known=CharacterSheetRules.TrySheetCount(pact["max"],out int max)&&CharacterSheetRules.TrySheetCount(pact["used"],out _);CharacterSheetRules.TrySheetCount(pact["used"],out int used);if(!known)GUILayout.Label("Пакт · особый счётчик, данные сохранены",sheetQuiet);GUILayout.BeginHorizontal();GUILayout.Label("Пакт · "+Math.Max(0,max-used)+" / "+max+" · круг "+pact["slotLevel"],sheetQuiet);bool enabled=GUI.enabled;
                GUI.enabled=enabled&&known&&used<max;if(MeasuredMenuButton("−",GUI.skin.button,GUILayout.Width(44),GUILayout.Height(44)))SheetAction(()=>CharacterSheetRules.ChangePactUse(hero,1),ref changed);
                GUI.enabled=enabled&&known&&used>0;if(MeasuredMenuButton("+",GUI.skin.button,GUILayout.Width(44),GUILayout.Height(44)))SheetAction(()=>CharacterSheetRules.ChangePactUse(hero,-1),ref changed);GUI.enabled=enabled;GUILayout.EndHorizontal();
            }
            if(SheetFold("configure-slots","Настроить ячейки"))Tree(hero,"spellSlotsData","Максимум / использовано",ref changed);GUILayout.EndVertical();
        }
        private void ClassicResources(JObject hero,ref bool changed)
        {
            if(!(hero["resources"] is JObject resources)||!resources.Properties().Any())return;
            GUILayout.BeginVertical(GUI.skin.box);SheetSection("Ресурсы");foreach(var p in resources.Properties())
            {
                if(!(p.Value is JObject r)||!int.TryParse(r["current"]?.ToString(),out int current)||!int.TryParse(r["max"]?.ToString(),out int max)||current<0||max<0){GUILayout.Label(p.Name+" · особый способ учёта",sheetQuiet);continue;}
                GUILayout.BeginHorizontal();GUILayout.Label(((string)r["name"]??p.Name)+" · "+current+" / "+max,GUILayout.ExpandWidth(true));bool enabled=GUI.enabled;
                GUI.enabled=enabled&&current>0;if(MeasuredMenuButton("−",GUI.skin.button,GUILayout.Width(44),GUILayout.Height(44)))SheetAction(()=>CharacterSheetRules.ChangeResource(hero,p.Name,-1),ref changed);
                GUI.enabled=enabled&&current<max;if(MeasuredMenuButton("+",GUI.skin.button,GUILayout.Width(44),GUILayout.Height(44)))SheetAction(()=>CharacterSheetRules.ChangeResource(hero,p.Name,1),ref changed);GUI.enabled=enabled;GUILayout.EndHorizontal();
            }
            GUILayout.EndVertical();
        }
    }
}
