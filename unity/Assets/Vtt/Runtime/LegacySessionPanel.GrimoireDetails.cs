using System;
using System.Globalization;
using System.Linq;
using Newtonsoft.Json.Linq;
using UnityEngine;

namespace DndVtt.UnityPrototype
{
    public sealed partial class LegacySessionPanel
    {
        // UI-only state. No profile schema migration and no changes to wallet mechanics.
        private int grimoireDetailsTab;
        private string grimoireDetailsHero;

        private void CommitGrimoireDetailKeyboard(JObject hero, ref bool changed)
        {
            // A user can tap a new subtab before Android closes its numeric keyboard.
            // Commit the typed value instead of cancelling the numeric session.
            if (grimoireDetailsTab == 1)
            {
                FlushHealthInputs(hero, ref changed);
                return;
            }
            if (grimoireDetailsTab == 2)
            {
                CompleteNumericKeyboard();
                var stats = hero["stats"] as JObject ?? new JObject();
                bool statsChanged = false;
                foreach (string stat in CharacterSheetRules.Stats)
                {
                    string owner = "classic-stat:" + hero["id"] + ":" + stat;
                    if (numericSession.TryTake(owner, out string text)
                        && int.TryParse(text, NumberStyles.Integer, CultureInfo.InvariantCulture,
                            out int value))
                    {
                        stats[stat] = value;
                        edits[owner] = text;
                        statsChanged = true;
                    }
                }
                if (statsChanged)
                {
                    hero["stats"] = stats;
                    CharacterSheetRules.Recalculate(hero);
                    changed = true;
                }
            }
            ResetFormInput();
        }

        private bool GrimoireDetailsFold(JObject hero, ref bool changed)
        {
            string key = "grimoire-hero:" + (string)hero["id"];
            bool open = expanded.Contains(key);
            if (MeasuredMenuButton((open ? "▾ " : "▸ ") +
                "Сведения о герое",
                grimoireHpButton ?? uiStyles.SecondaryButton, GUILayout.MinHeight(UiTheme.TouchHeight)))
            {
                if (open) CommitGrimoireDetailKeyboard(hero, ref changed);
                else ResetFormInput();
                if (open) expanded.Remove(key);
                else expanded.Add(key);
                open = !open;
            }
            return open;
        }

        // The details drawer is an editor, not another copy of the overview.
        // Each page keeps its own focused controls; all state lives in the hero JSON.
        private void GrimoireHeroDetails(JObject hero, ref bool changed)
        {
            PrepareGrimoireHeroStyles();
            PrepareCompactControls();
            string id = (string)hero["id"];
            if (grimoireDetailsHero != id)
            {
                grimoireDetailsHero = id;
                grimoireDetailsTab = 0;
            }

            GUILayout.BeginVertical(grimoireDetailCard ?? uiStyles.HeroPanel);
            GrimoireIconHeading("СВЕДЕНИЯ О ГЕРОЕ", uiStyles.HeroIcon);
            GUILayout.Label("Изменения сохраняются в листе персонажа", uiStyles.HeroSubtitle);
            string[] tabs = { "Профиль", "Бой", "Статы", "Данные" };
            // Two rows on phones: four 44px+ touch targets should never shrink
            // to unreadable 60px-wide labels.
            int columns = UiWidth < 600 ? 2 : 4;
            for (int row = 0; row < tabs.Length; row += columns)
            {
                GUILayout.BeginHorizontal();
                for (int i = row; i < Math.Min(tabs.Length, row + columns); i++)
                {
                    int target = i;
                    GUIStyle style = grimoireDetailsTab == i
                        ? (grimoirePrimaryButton ?? uiStyles.ActiveTab)
                        : (grimoireHpButton ?? uiStyles.SecondaryButton);
                    if (MeasuredMenuButton((grimoireDetailsTab == i ? "◆ " : "") + tabs[i],
                        style, GUILayout.ExpandWidth(true),
                        GUILayout.MinHeight(UiTheme.TouchHeight))
                        && grimoireDetailsTab != target)
                    {
                        CommitGrimoireDetailKeyboard(hero, ref changed);
                        grimoireDetailsTab = target;
                    }
                }
                GUILayout.EndHorizontal();
            }
            GUILayout.EndVertical();

            switch (grimoireDetailsTab)
            {
                case 0: GrimoireDetailsProfile(hero, ref changed); break;
                case 1: GrimoireDetailsCombat(hero, ref changed); break;
                case 2: GrimoireDetailsStats(hero, ref changed); break;
                default: GrimoireDetailsData(); break;
            }
        }

        private void GrimoireReadRow(string label, string value)
        {
            GUILayout.BeginHorizontal();
            GUILayout.Label(label, uiStyles.HeroSubtitle, GUILayout.Width(94),
                GUILayout.MinHeight(40));
            GUILayout.Label(string.IsNullOrWhiteSpace(value) ? "—" : value,
                uiStyles.HeroSubtitle, GUILayout.ExpandWidth(true), GUILayout.MinHeight(40));
            GUILayout.EndHorizontal();
            GrimoireRule();
        }

        private void GrimoireDetailsProfile(JObject hero, ref bool changed)
        {
            GrimoireIconHeading("ЛИЧНЫЕ ДАННЫЕ", uiStyles.HeroIcon);
            GUILayout.BeginVertical(grimoireDetailCard ?? uiStyles.HeroPanel);
            GUILayout.BeginHorizontal();
            GUILayout.Label("Имя", uiStyles.HeroSubtitle, GUILayout.Width(94), GUILayout.MinHeight(40));
            string name = (string)hero["name"] ?? "";
            string value = MenuTextField("clone:name", name, cloneInput, GUILayout.MinHeight(40));
            if (value != name) { hero["name"] = value; changed = true; }
            GUILayout.EndHorizontal();

            var classes = hero["classes"] as JArray;
            string classLabel = classes != null && classes.Count > 0
                ? string.Join(" / ", classes.OfType<JObject>().Select(c => c["name"] + " " + c["level"] + " ур."))
                : (string)(hero["class"] ?? hero["className"]) ?? "Класс не указан";
            GrimoireReadRow("Класс", classLabel);
            GrimoireReadRow("Предыстория", (string)hero["background"]);
            GrimoireReadRow("Профессия", (string)hero["profession"] ?? "Без профессии");
            if (MeasuredMenuButton("Опыт и уровень →", grimoirePrimaryButton,
                GUILayout.MinHeight(UiTheme.TouchHeight))) BeginAdvancement(hero, true);
            GUILayout.EndVertical();

            GrimoireSection("РАСА И ОСОБЕННОСТИ");
            GUILayout.BeginVertical(grimoireDetailCard ?? uiStyles.HeroPanel);
            GUILayout.BeginHorizontal();
            bool previous = GUI.enabled;
            GUI.enabled = previous && !RaceLocked(hero);
            string race = (string)(hero["raceName"] ?? hero["race"]) ?? "Выберите расу";
            if (MeasuredMenuButton(race + " ▾", grimoireHpButton,
                GUILayout.ExpandWidth(true), GUILayout.MinHeight(UiTheme.TouchHeight))) requestedRaceView = 1;
            GUI.enabled = previous;
            if (MeasuredMenuButton("+ Своя", grimoireHpButton,
                GUILayout.Width(77), GUILayout.MinHeight(UiTheme.TouchHeight)))
            {
                ResetFormInput();
                customRaceName = customRaceDescription = "";
                customRaceSpeed = "30";
                for (int i = 0; i < customRaceBonuses.Length; i++) customRaceBonuses[i] = "0";
                requestedRaceView = 2;
            }
            GUILayout.EndHorizontal();
            JArray details = hero["raceFeatureDescriptions"] as JArray;
            if (details != null && details.Count > 0 && SheetFold("grimoire-race:" + hero["id"],
                "Расовые особенности (" + details.Count + ")"))
                GUILayout.Label(string.Join("\n", details.Select(d => d.ToString())), uiStyles.HeroSubtitle);
            GUILayout.EndVertical();
        }

        private void GrimoireDetailsCombat(JObject hero, ref bool changed)
        {
            GrimoireIconHeading("БОЕВЫЕ ПАРАМЕТРЫ", grimoireShieldIcon);
            GUILayout.BeginVertical(grimoireDetailCard ?? uiStyles.HeroPanel);
            GUILayout.BeginHorizontal();
            ClassicNumber(hero, "ac", "КД", ref changed, 10);
            GUILayout.BeginVertical(uiStyles.HeroMetric, GUILayout.ExpandWidth(true));
            GUILayout.Label("ИНИЦ.", uiStyles.HeroSmall);
            GUILayout.Label(Signed(CharacterSheetRules.Modifier(hero, "dex")), uiStyles.HeroValue,
                GUILayout.MinHeight(44));
            GUILayout.EndVertical();
            GUILayout.BeginVertical(uiStyles.HeroMetric, GUILayout.ExpandWidth(true));
            GUILayout.Label("СКОРОСТЬ", uiStyles.HeroSmall);
            string speed = (string)hero["speed"] ?? "30 футов";
            string edited = MenuTextField("clone:speed", speed, cloneInput,
                GUILayout.MinHeight(44), GUILayout.MinWidth(50));
            if (edited != speed) { hero["speed"] = edited; changed = true; }
            GUILayout.EndVertical();
            GUILayout.EndHorizontal();
            if (MeasuredMenuButton("⚄ Бросить инициативу", grimoireHpButton,
                GUILayout.MinHeight(UiTheme.TouchHeight)))
                Roll("Инициатива", 20, CharacterSheetRules.Modifier(hero, "dex"));
            if (rollResult != "Выберите кубик или проверку")
                GUILayout.Label(rollResult, uiStyles.HeroSubtitle);
            GUILayout.EndVertical();

            GrimoireIconHeading("СОСТОЯНИЯ", grimoireConditionIcon);
            GUILayout.BeginVertical(grimoireDetailCard ?? uiStyles.HeroPanel);
            string[] conditions = { "Отравлен", "Сбит с ног", "Ослеплен", "Очарован",
                "Испуган", "Невидимость", "Парализован", "Оглушен", "Захвачен" };
            // Two readable columns on narrow Android screens, three on tablets.
            int conditionColumns = UiWidth < 620 ? 2 : 3;
            for (int i = 0; i < conditions.Length; i++)
            {
                if (i % conditionColumns == 0) GUILayout.BeginHorizontal();
                string condition = conditions[i];
                JToken token = (hero["activeConditions"] as JObject)?[condition];
                bool active = token?.Type == JTokenType.Boolean && (bool)token;
                if (MeasuredMenuButton((active ? "✓ " : "") + condition,
                    active ? grimoirePrimaryButton : grimoireHpButton,
                    GUILayout.ExpandWidth(true), GUILayout.MinHeight(UiTheme.TouchHeight)))
                    SheetAction(() => CharacterSheetRules.ToggleSheetCondition(hero, condition), ref changed);
                if (i % conditionColumns == conditionColumns - 1 || i == conditions.Length - 1)
                    GUILayout.EndHorizontal();
            }
            GUILayout.EndVertical();

            GrimoireIconHeading("ЗДОРОВЬЕ И ОТДЫХ", grimoireHpIcon);
            GUILayout.BeginVertical(grimoireDetailCard ?? uiStyles.HeroPanel);
            GUILayout.BeginHorizontal();
            string[] fields = { "hpMax", "hpCurrent", "hpTemp" };
            string[] labels = { "Макс.", "Текущее", "Врем." };
            for (int i = 0; i < fields.Length; i++)
            {
                GUILayout.BeginVertical(GUILayout.ExpandWidth(true));
                GUILayout.Label(labels[i], uiStyles.HeroSmall);
                JToken fallback = i == 0 ? (JToken)archive.MaximumHp(selected)
                    : i == 1 ? (JToken)archive.CurrentHp(selected)
                    : (JToken)archive.TemporaryHp(selected);
                CloneHp(hero, fields[i], ref changed, fallback);
                GUILayout.EndVertical();
            }
            GUILayout.EndHorizontal();
            GrimoireSection("СПАСБРОСКИ ОТ СМЕРТИ");
            CharacterSheetRules.TrySheetCount((hero["deathSaves"] as JObject)?["successes"],
                out int successes);
            CharacterSheetRules.TrySheetCount((hero["deathSaves"] as JObject)?["failures"],
                out int failures);
            for (int track = 0; track < 2; track++)
            {
                bool success = track == 0;
                int current = success ? successes : failures;
                GUILayout.BeginHorizontal();
                GUILayout.Label(success ? "Успехи" : "Провалы", uiStyles.HeroSubtitle,
                    GUILayout.Width(88), GUILayout.MinHeight(44));
                for (int i = 1; i <= 3; i++)
                {
                    bool old = current >= i;
                    int point = i;
                    if (MeasuredMenuButton((old ? "● " : "○ ") + i,
                        old ? grimoirePrimaryButton : grimoireHpButton,
                        GUILayout.ExpandWidth(true), GUILayout.MinHeight(UiTheme.TouchHeight)))
                    {
                        int count = old ? point - 1 : point;
                        SheetAction(() => CharacterSheetRules.SetDeathTrack(hero,
                            success ? count : successes, success ? failures : count), ref changed);
                    }
                }
                GUILayout.EndHorizontal();
            }
            GUILayout.BeginHorizontal();
            if (MeasuredMenuButton("Короткий отдых", grimoireHpButton,
                GUILayout.ExpandWidth(true), GUILayout.MinHeight(UiTheme.TouchHeight)))
                pendingBaseRest = false;
            if (MeasuredMenuButton("Длинный отдых", grimoireHpButton,
                GUILayout.ExpandWidth(true), GUILayout.MinHeight(UiTheme.TouchHeight)))
                pendingBaseRest = true;
            GUILayout.EndHorizontal();
            if (pendingBaseRest.HasValue)
            {
                GUILayout.Label("Восстановить известные счётчики отдыха? Особые эффекты учитываются вручную.",
                    uiStyles.HeroSubtitle);
                GUILayout.BeginHorizontal();
                if (MeasuredMenuButton("Подтвердить", grimoirePrimaryButton,
                    GUILayout.ExpandWidth(true), GUILayout.MinHeight(UiTheme.TouchHeight)))
                {
                    bool full = pendingBaseRest.Value;
                    FlushHealthInputs(hero, ref changed);
                    SheetAction(() => CharacterSheetRules.RecordRest(hero, full), ref changed);
                    InvalidateHealthInputs(hero);
                    pendingBaseRest = null;
                }
                if (MeasuredMenuButton("Отмена", grimoireHpButton,
                    GUILayout.ExpandWidth(true), GUILayout.MinHeight(UiTheme.TouchHeight)))
                    pendingBaseRest = null;
                GUILayout.EndHorizontal();
            }
            GUILayout.EndVertical();
        }

        private void GrimoireDetailsStats(JObject hero, ref bool changed)
        {
            GrimoireIconHeading("ХАРАКТЕРИСТИКИ", grimoireShieldIcon);
            GUILayout.BeginVertical(grimoireDetailCard ?? uiStyles.HeroPanel);
            var stats = hero["stats"] as JObject ?? new JObject();
            string[] captions = { "СИЛ", "ЛОВ", "ТЕЛ", "ИНТ", "МУД", "ХАР" };
            int columns = UiWidth < 650 ? 2 : 3;
            for (int i = 0; i < 6; i++)
            {
                if (i % columns == 0) GUILayout.BeginHorizontal();
                GUILayout.BeginVertical(uiStyles.HeroMetric, GUILayout.ExpandWidth(true));
                string stat = CharacterSheetRules.Stats[i];
                GUILayout.BeginHorizontal();
                GUILayout.Label(captions[i], uiStyles.HeroSubtitle, GUILayout.ExpandWidth(true));
                GUILayout.Label(Signed(CharacterSheetRules.Modifier(hero, stat)),
                    uiStyles.HeroSubtitle, GUILayout.Width(38));
                GUILayout.EndHorizontal();
                string key = "classic-stat:" + hero["id"] + ":" + stat;
                string old = edits.TryGetValue(key, out string saved)
                    ? saved : stats[stat]?.ToString() ?? "10";
                string value = IntegerField(key, old, GUILayout.MinHeight(44), GUILayout.MinWidth(42));
                edits[key] = value;
                if (value != old && int.TryParse(value, NumberStyles.Integer,
                    CultureInfo.InvariantCulture, out int score))
                {
                    stats[stat] = score;
                    hero["stats"] = stats;
                    CharacterSheetRules.Recalculate(hero);
                    changed = true;
                }
                GUILayout.EndVertical();
                if (i % columns == columns - 1) GUILayout.EndHorizontal();
            }
            GUILayout.EndVertical();

            GrimoireSection("ВЛАДЕНИЕ СПАСБРОСКАМИ");
            GUILayout.BeginVertical(grimoireDetailCard ?? uiStyles.HeroPanel);
            var saves = hero["savesData"] as JObject ?? new JObject();
            for (int i = 0; i < 6; i++)
            {
                if (i % columns == 0) GUILayout.BeginHorizontal();
                string stat = CharacterSheetRules.Stats[i];
                bool proficient = saves[stat]?.Type == JTokenType.Boolean && (bool)saves[stat];
                GUILayout.BeginVertical(uiStyles.HeroMetric, GUILayout.ExpandWidth(true));
                GUILayout.Label(captions[i] + "  " +
                    Signed(CharacterSheetRules.Modifier(hero, stat) +
                        (proficient ? CharacterSheetRules.Proficiency(hero) : 0)),
                    uiStyles.HeroSubtitle, GUILayout.MinHeight(26));
                if (MeasuredMenuButton(proficient ? "✓ Владение" : "○ Нет",
                    proficient ? grimoirePrimaryButton : grimoireHpButton,
                    GUILayout.ExpandWidth(true), GUILayout.MinHeight(UiTheme.TouchHeight)))
                {
                    saves[stat] = !proficient;
                    hero["savesData"] = saves;
                    changed = true;
                }
                GUILayout.EndVertical();
                if (i % columns == columns - 1) GUILayout.EndHorizontal();
            }
            GUILayout.EndVertical();
        }

        private void GrimoireDetailsData()
        {
            GrimoireIconHeading("УПРАВЛЕНИЕ ДАННЫМИ", uiStyles.HeroIcon);
            GUILayout.BeginVertical(grimoireDetailCard ?? uiStyles.HeroPanel);
            GUILayout.Label("Экспорт и переход к списку героев", uiStyles.HeroSubtitle);
            if (MeasuredMenuButton("Экспортировать JSON", grimoirePrimaryButton,
                GUILayout.MinHeight(UiTheme.TouchHeight))) Attempt(() => PickCharacterFile(true));
            if (MeasuredMenuButton("К выбору героев", grimoireHpButton,
                GUILayout.MinHeight(UiTheme.TouchHeight)))
                requestedSheetDestination = FrontScreen.Characters;
            GUILayout.EndVertical();
        }
    }
}
