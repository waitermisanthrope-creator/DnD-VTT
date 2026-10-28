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
        private bool? requestedPortraitVisibility;
        private bool? pendingBaseRest;
        private string healthAmount="1",newFolderName="",notesQuery="";
        private readonly int[] classicTabs={0,1,2,3,4,5,9};
        private readonly string[] classicTabNames={"Герой","Навыки","Способн.","Инв-рь","Заметки","Дайсы","Лор/Бестиарий"};
        private float ClassicBodyWidth=>UiWidth-30;
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
            Shade(full,new Color(0,0,0,chosen?.45f:.40f));
            Shade(new Rect(0,0,UiWidth,60),new Color(.15f,.15f,.15f,.99f));
        }
        private void DrawClassicSheetNavigation()
        {
            cloneHome??=new GUIStyle(sheetActiveTab){fontSize=14,padding=new RectOffset(),margin=new RectOffset()};
            GUILayout.BeginHorizontal();GUILayout.Space(-5);
            if(MeasuredMenuButton("Меню",cloneHome,GUILayout.Width(65),GUILayout.Height(40)))requestedSheetDestination=FrontScreen.Characters;
            GUILayout.Space(4);
            int active=Array.IndexOf(classicTabs,sheetTab);
            sheetTabsScroll=GUILayout.BeginScrollView(SwipePosition("sheet-tabs",sheetTabsScroll),false,false,GUIStyle.none,GUIStyle.none,GUILayout.Height(48));GUILayout.BeginHorizontal();
            for(int i=0;i<classicTabs.Length;i++)
            {
                string label=classicTabNames[i];float width=Mathf.Max(65,sheetTabStyle.CalcSize(new GUIContent(label)).x+12);
                if(MeasuredMenuButton(label,active==i?sheetActiveTab:sheetTabStyle,GUILayout.Width(width),GUILayout.Height(44)))requestedSheetTab=classicTabs[i];
                if(active==i&&Event.current.type==EventType.Repaint){Rect r=GUILayoutUtility.GetLastRect();Shade(new Rect(r.x,r.yMax-2,r.width,2),BrandAccent);}
                GUILayout.Space(4);
            }
            GUILayout.EndHorizontal();GUILayout.EndScrollView();RegisterSwipe("sheet-tabs",GUILayoutUtility.GetLastRect(),true);
            cloneEye??=new GUIStyle(sheetTabStyle){font=Resources.Load<Font>("UI/DejaVuSans"),fontSize=20,padding=new RectOffset()};
            bool eyeEnabled=GUI.enabled;GUI.enabled=eyeEnabled&&!advancementOpen;
            if(MeasuredMenuButton("◉",cloneEye,GUILayout.Width(43),GUILayout.Height(38)))requestedPortraitVisibility=!classicPortraitOpen;
            GUI.enabled=eyeEnabled;
            GUILayout.EndHorizontal();
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
        private GUIStyle cloneInput,cloneReadOnly,cloneGold,cloneMetricLabel,cloneSuccess;
        private void PrepareCloneControls()
        {
            if(cloneInput!=null)return;
            cloneInput=new GUIStyle(GUI.skin.textField){font=sheetSerif,fontSize=13,padding=new RectOffset(10,10,10,10),margin=new RectOffset(0,0,4,0)};
            cloneReadOnly=new GUIStyle(cloneInput){wordWrap=true,padding=new RectOffset(8,8,8,8)};
            cloneGold=new GUIStyle(GUI.skin.button){font=sheetSerif,fontSize=13,fontStyle=FontStyle.Bold,padding=new RectOffset(8,8,8,8),margin=new RectOffset(0,0,8,0)};
            foreach(var state in new[]{cloneGold.normal,cloneGold.hover,cloneGold.active,cloneGold.focused}){state.background=Rounded(new Color(212/255f,175/255f,55/255f),Color.clear,6);state.textColor=Color.black;}
            cloneMetricLabel=new GUIStyle(sheetQuiet){fontSize=12,alignment=TextAnchor.MiddleCenter,normal={textColor=BrandAccent},margin=new RectOffset(0,0,0,4)};
            cloneSuccess=new GUIStyle(sheetSkin.label){fontStyle=FontStyle.Bold,normal={textColor=new Color(76/255f,175/255f,80/255f)},alignment=TextAnchor.MiddleRight};
        }
        private void CloneFieldLabel(string text){GUILayout.Space(10);GUILayout.Label(text,sheetQuiet,GUILayout.Height(19));}
        private void CloneText(JObject hero,string key,string label,ref bool changed,bool readOnly=false,float height=39)
        {
            CloneFieldLabel(label);string old=hero[key]?.ToString()??"";
            if(readOnly)GUILayout.Label(old,cloneReadOnly,GUILayout.Height(height));
            else{GUI.SetNextControlName("clone:"+key);string value=GUILayout.TextField(old,cloneInput,GUILayout.Height(height));if(value!=old){hero[key]=value;changed=true;}}
        }
        private void ClassicHero(JObject hero,ref bool changed)
        {
            PrepareCloneControls();classicControlWidth=ClassicBodyWidth-32;
            GUILayout.BeginVertical(GUI.skin.box);SheetSection("Герой");
            CloneText(hero,"name","Имя персонажа",ref changed);
            CloneFieldLabel("Класс и Уровень");var classes=hero["classes"] as JArray;
            string classText=classes!=null&&classes.Count>0?string.Join("\n",classes.OfType<JObject>().Select(c=>c["name"]+" "+c["level"])):(hero["class"]??hero["className"])?.ToString()??"";
            GUILayout.Label(classText,cloneReadOnly,GUILayout.Height(60));
            if(MeasuredMenuButton("Опыт и уровень",cloneGold,GUILayout.Height(35)))BeginAdvancement(hero,true);
            CloneText(hero,"background","Предыстория",ref changed,true,35);
            CloneFieldLabel("Раса персонажа");GUILayout.Label((hero["raceName"]??hero["race"])?.ToString()??"— Выберите расу —",cloneReadOnly,GUILayout.Height(39));
            CloneFieldLabel("Профессия");GUILayout.Label(hero["profession"]?.ToString()??"Без профессии",cloneReadOnly,GUILayout.Height(35));
            GUILayout.EndVertical();ClassicCombat(hero,ref changed);ClassicStats(hero,ref changed);
            GUILayout.BeginVertical(GUI.skin.box);SheetSection("Управление данными");
            int dataAction=ClassicButtonRow("Экспорт в JSON","К выбору героев");if(dataAction==0)Attempt(()=>PickCharacterFile(true));if(dataAction==1)requestedSheetDestination=FrontScreen.Characters;
            GUILayout.EndVertical();classicControlWidth=0;
        }
        private void ClassicNumber(JObject hero,string field,string label,ref bool changed,JToken fallback)
        {
            GUILayout.BeginVertical(sheetMetricBox,GUILayout.ExpandWidth(true));GUILayout.Label(label,cloneMetricLabel);
            string key="classic:"+hero["id"]+":"+field;string old=edits.TryGetValue(key,out var saved)?saved:(hero[field]??fallback)?.ToString()??"0";
            string value=IntegerField(key,old,GUILayout.Height(39),GUILayout.MinWidth(25),GUILayout.ExpandWidth(true));edits[key]=value;
            if(value!=old){if(int.TryParse(value,NumberStyles.Integer,CultureInfo.InvariantCulture,out int number)&&number>=0){hero[field]=number;changed=true;}else status="Введите неотрицательное целое: "+label;}
            GUILayout.EndVertical();
        }
        private void CloneHp(JObject hero,string field,ref bool changed,JToken fallback)
        {
            string owner="classic:"+hero["id"]+":"+field;string old=edits.TryGetValue(owner,out string saved)?saved:(hero[field]??fallback)?.ToString()??"0";
            string value=IntegerField(owner,old,GUILayout.Height(39),GUILayout.MinWidth(25));edits[owner]=value;
            if(value!=old&&int.TryParse(value,out int number)&&number>=0){hero[field]=number;changed=true;}
        }
        private GUIStyle CloneAction(Color color,Color text)
        {
            var style=new GUIStyle(GUI.skin.button){font=sheetSerif,fontSize=13,fontStyle=FontStyle.Bold};
            foreach(var state in new[]{style.normal,style.hover,style.active,style.focused}){state.background=Rounded(color,Color.clear,6);state.textColor=text;}
            return style;
        }
        private GUIStyle cloneDanger,cloneShortRest,cloneLongRest,cloneChip,cloneActiveChip;
        private void ClassicCombat(JObject hero,ref bool changed)
        {
            PrepareCloneControls();cloneChip??=new GUIStyle(GUI.skin.button){padding=new RectOffset(10,10,5,5),fontStyle=FontStyle.Normal,normal={background=Rounded(new Color(42/255f,42/255f,42/255f),new Color(68/255f,68/255f,68/255f),12),textColor=new Color(170/255f,170/255f,170/255f)}};cloneDanger??=CloneAction(new Color(229/255f,57/255f,53/255f),Color.white);cloneShortRest??=CloneAction(BrandAccent,Color.white);cloneLongRest??=CloneAction(new Color(76/255f,175/255f,80/255f),Color.white);
            GUILayout.BeginVertical(GUI.skin.box);SheetSection("Боевые параметры");GUILayout.BeginHorizontal();
            ClassicNumber(hero,"ac","КД (AC)",ref changed,10);
            GUILayout.BeginVertical(sheetMetricBox,GUILayout.ExpandWidth(true));GUILayout.Label("ИНИЦИАТИВА",cloneMetricLabel);GUILayout.Label(Signed(CharacterSheetRules.Modifier(hero,"dex")),cloneReadOnly,GUILayout.Height(39));GUILayout.EndVertical();
            GUILayout.BeginVertical(sheetMetricBox,GUILayout.ExpandWidth(true));GUILayout.Label("СКОРОСТЬ",cloneMetricLabel);
            string speed=hero["speed"]?.ToString()??"30 футов";string next=GUILayout.TextField(speed,cloneInput,GUILayout.Height(39),GUILayout.MinWidth(25));if(next!=speed){hero["speed"]=next;changed=true;}GUILayout.EndVertical();GUILayout.EndHorizontal();
            GUILayout.Space(10);if(MeasuredMenuButton("Бросок Инициативы",cloneDanger,GUILayout.Height(39)))Roll("Инициатива",20,CharacterSheetRules.Modifier(hero,"dex"));
            CloneFieldLabel("Состояния (Status Effects)");
            string[] names={"Отравлен","Сбит с ног","Ослеплен","Очарован","Испуган","Невидимость","Парализован","Оглушен","Захвачен"};
            float used=0,available=ClassicBodyWidth-32;GUILayout.BeginHorizontal();
            for(int i=0;i<names.Length;i++)
            {
                string name=names[i];float width=Mathf.Ceil(cloneChip.CalcSize(new GUIContent(name)).x)+2;
                if(used>0&&used+width+6>available){GUILayout.EndHorizontal();GUILayout.BeginHorizontal();used=0;}
                var token=(hero["activeConditions"] as JObject)?[name];bool active=token?.Type==JTokenType.Boolean&&(bool)token;
                cloneActiveChip??=new GUIStyle(cloneChip){normal={background=cloneDanger.normal.background,textColor=Color.white}};
                if(MeasuredMenuButton(name,active?cloneActiveChip:cloneChip,GUILayout.Height(28),GUILayout.Width(width)))SheetAction(()=>CharacterSheetRules.ToggleSheetCondition(hero,name),ref changed);
                GUILayout.Space(6);used+=width+6;
            }
            GUILayout.EndHorizontal();
            CloneFieldLabel("Здоровье (Макс / Текущее / Временное)");GUILayout.BeginHorizontal();CloneHp(hero,"hpMax",ref changed,archive.MaximumHp(selected));CloneHp(hero,"hpCurrent",ref changed,archive.CurrentHp(selected));CloneHp(hero,"hpTemp",ref changed,archive.TemporaryHp(selected));GUILayout.EndHorizontal();
            CloneFieldLabel("Спасброски от смерти");CharacterSheetRules.TrySheetCount((hero["deathSaves"] as JObject)?["successes"],out int successes);CharacterSheetRules.TrySheetCount((hero["deathSaves"] as JObject)?["failures"],out int failures);
            foreach(bool success in new[]{true,false})
            {
                GUILayout.BeginHorizontal();GUILayout.Label(success?"Успехи:":"Провалы:",GUILayout.Width(90));for(int i=1;i<=3;i++)
                {int current=success?successes:failures;bool old=current>=i;bool value=GUILayout.Toggle(old,"",GUILayout.Width(20),GUILayout.Height(23));if(value!=old){int count=value?i:i-1;SheetAction(()=>CharacterSheetRules.SetDeathTrack(hero,success?count:successes,success?failures:count),ref changed);}}
                GUILayout.FlexibleSpace();GUILayout.EndHorizontal();
            }
            GUILayout.Space(15);GUILayout.BeginHorizontal();if(MeasuredMenuButton("Короткий отдых",cloneShortRest,GUILayout.Height(35)))pendingBaseRest=false;if(MeasuredMenuButton("Длинный отдых",cloneLongRest,GUILayout.Height(35)))pendingBaseRest=true;GUILayout.EndHorizontal();
            if(pendingBaseRest.HasValue)
            {
                GUILayout.Label("Восстановить известные счётчики отдыха? Особые классовые эффекты учитываются вручную.",sheetQuiet);
                if(FitMenuButton("Подтвердить отдых")){bool full=pendingBaseRest.Value;FlushHealthInputs(hero,ref changed);SheetAction(()=>CharacterSheetRules.RecordRest(hero,full),ref changed);InvalidateHealthInputs(hero);pendingBaseRest=null;}
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
            GUILayout.BeginVertical(GUI.skin.box);SheetSection("Характеристики");int columns=2;
            var stats=hero["stats"] as JObject??new JObject();
            for(int i=0;i<6;i++)
            {
                if(i%columns==0)GUILayout.BeginHorizontal();string stat=CharacterSheetRules.Stats[i];GUILayout.BeginVertical(GUI.skin.box,GUILayout.ExpandWidth(true));
                GUILayout.Label(new[]{"СИЛ","ЛОВ","ТЕЛ","ИНТ","МУД","ХАР"}[i],sheetQuiet);DesktopUiSmoke.RecordSingleLine(new[]{"СИЛ","ЛОВ","ТЕЛ","ИНТ","МУД","ХАР"}[i],sheetQuiet,GUILayoutUtility.GetLastRect());
                string key="classic-stat:"+hero["id"]+":"+stat;string old=edits.TryGetValue(key,out var saved)?saved:stats[stat]?.ToString()??"10";
                string value=IntegerField(key,old,GUILayout.MinHeight(44),GUILayout.MinWidth(40));edits[key]=value;
                if(value!=old&&int.TryParse(value,out int score)){stats[stat]=score;hero["stats"]=stats;CharacterSheetRules.Recalculate(hero);changed=true;}
                GUILayout.Label(Signed(CharacterSheetRules.Modifier(hero,stat)),cloneSuccess);GUILayout.EndVertical();if(i%columns==columns-1)GUILayout.EndHorizontal();
            }
            GUILayout.EndVertical();
            GUILayout.BeginVertical(GUI.skin.box);SheetSection("Спасброски Характеристики");ClassicSaves(hero,ref changed);GUILayout.EndVertical();
        }
        private GUIStyle cloneListLabel,cloneProf,clonePassive,cloneProfBonus,cloneEye,cloneHome;
        private int? cloneSkillDropdown;
        private void PrepareCloneLists()
        {
            PrepareCloneControls();cloneProfBonus??=new GUIStyle(cloneReadOnly){alignment=TextAnchor.MiddleCenter,fontSize=19,fontStyle=FontStyle.Bold};cloneListLabel??=new GUIStyle(sheetQuiet){fontSize=14};
            cloneProf??=new GUIStyle(GUI.skin.button){font=Resources.Load<Font>("UI/DejaVuSans"),fontSize=12,fontStyle=FontStyle.Normal,padding=new RectOffset(4,4,2,2),margin=new RectOffset()};
            clonePassive??=new GUIStyle(cloneSuccess){normal={textColor=new Color(33/255f,150/255f,243/255f)}};
        }
        private void CloneListRule(){Rect line=GUILayoutUtility.GetRect(1,1);Shade(line,new Color(42/255f,42/255f,42/255f));}
        private void ClassicSaves(JObject hero,ref bool changed)
        {
            PrepareCloneLists();var saves=hero["savesData"] as JObject??new JObject();
            for(int i=0;i<6;i++)
            {
                string key=CharacterSheetRules.Stats[i];bool old=saves[key]?.Type==JTokenType.Boolean&&(bool)saves[key];GUILayout.Space(6);GUILayout.BeginHorizontal();
                bool value=GUILayout.Toggle(old,"",GUILayout.Width(20),GUILayout.Height(23));if(value!=old){saves[key]=value;hero["savesData"]=saves;changed=true;}
                GUILayout.Label(CharacterSheetRules.StatNames[i]+" ("+key.ToUpperInvariant()+")",cloneListLabel);
                GUILayout.FlexibleSpace();GUILayout.Label(Signed(CharacterSheetRules.Modifier(hero,key)+(value?CharacterSheetRules.Proficiency(hero):0)),cloneSuccess,GUILayout.Width(35));GUILayout.EndHorizontal();GUILayout.Space(6);if(i<5)CloneListRule();
            }
        }
        private void ClassicSkills(JObject hero,ref bool changed)
        {
            PrepareCloneLists();GUILayout.BeginVertical(GUI.skin.box);SheetSection("Бонус мастерства");
            GUILayout.Label(CharacterSheetRules.Proficiency(hero).ToString(),cloneProfBonus,GUILayout.Height(47));GUILayout.EndVertical();
            GUILayout.BeginVertical(GUI.skin.box);SheetSection("Пассивные чувства");
            foreach(var pair in new[]{("Пассивная Внимательность:",11),("Пассивный Анализ:",8),("Пассивная Проницательность:",6)})
            {GUILayout.Space(12);GUILayout.BeginHorizontal();GUILayout.Label(pair.Item1);GUILayout.Label((10+CharacterSheetRules.Skill(hero,pair.Item2)).ToString(),clonePassive,GUILayout.Width(30));GUILayout.FlexibleSpace();GUILayout.EndHorizontal();}GUILayout.EndVertical();
            GUILayout.BeginVertical(GUI.skin.box);SheetSection("Навыки (18)");var skills=hero["skillsData"] as JObject??new JObject();
            for(int i=0;i<CharacterSheetRules.SkillIds.Length;i++)
            {
                string key=CharacterSheetRules.SkillIds[i];CharacterSheetRules.TrySheetCount(skills[key],out int count);int owned=Mathf.Clamp(count,0,2);GUILayout.Space(6);GUILayout.BeginHorizontal();
                if(MeasuredMenuButton(new[]{"—","✓","✕2"}[owned]+" ▾",cloneProf,GUILayout.Width(42),GUILayout.Height(25)))cloneSkillDropdown=cloneSkillDropdown==i?null:(int?)i;
                GUILayout.Label(CharacterSheetRules.SkillNames[i]+" ("+CharacterSheetRules.SkillStats[i].ToUpperInvariant()+")",cloneListLabel);GUILayout.FlexibleSpace();
                GUILayout.Label(Signed(CharacterSheetRules.Skill(hero,i)),cloneSuccess,GUILayout.Width(35));GUILayout.EndHorizontal();
                if(cloneSkillDropdown==i){int choice=GUILayout.SelectionGrid(owned,new[]{"—","✓","✕2"},3,GUILayout.Height(30));if(choice!=owned){skills[key]=choice;hero["skillsData"]=skills;CharacterSheetRules.Recalculate(hero);changed=true;cloneSkillDropdown=null;}}
                GUILayout.Space(6);if(i<CharacterSheetRules.SkillIds.Length-1)CloneListRule();
            }
            GUILayout.EndVertical();
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
            string old=(string)hero[key]??fallback;int active=Array.IndexOf(CharacterSheetRules.Stats,old);string[] labels={"СИЛ","ЛОВ","ТЕЛ","ИНТ","МУД","ХАР"};
            if(FitMenuButton((active>=0?labels[active]:old)+" ▾",35)){if(!expanded.Add("select:"+key))expanded.Remove("select:"+key);}
            if(expanded.Contains("select:"+key))
            {
                int next=MenuGrid(active,labels,3);if(next>=0&&next!=active){hero[key]=CharacterSheetRules.Stats[next];changed=true;expanded.Remove("select:"+key);}
            }
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
