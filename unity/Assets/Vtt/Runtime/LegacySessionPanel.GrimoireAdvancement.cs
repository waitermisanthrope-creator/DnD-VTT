using System;
using System.Globalization;
using System.Linq;
using Newtonsoft.Json.Linq;
using UnityEngine;

namespace DndVtt.UnityPrototype
{
    public sealed partial class LegacySessionPanel
    {
        private int advancementClassPage, advancementFeatPage;
        private string advancementFeatSearch = "";

        private void GrimoireAdvancementOverview(JObject hero)
        {
            PrepareGrimoireHeroStyles();
            int level = AdvancementTotal(hero);
            long xp = DisplayExperience(hero);
            GrimoireSection("РАЗВИТИЕ ПЕРСОНАЖА");
            GUILayout.BeginVertical(uiStyles.HeroPanel);
            GUILayout.BeginHorizontal();
            GUILayout.Label("Уровень " + level, uiStyles.HeroName);
            GUILayout.FlexibleSpace();
            GUILayout.Label(xp.ToString("N0", GrimoireCulture) + " XP",
                uiStyles.HeroSubtitle, GUILayout.MinHeight(44));
            GUILayout.EndHorizontal();
            if (level < GrimoireXpThresholds.Length)
            {
                long from = GrimoireXpThresholds[level - 1];
                long target = GrimoireXpThresholds[level];
                float progress = Mathf.Clamp01((float)(xp - from) / Math.Max(1L, target - from));
                GrimoireProgress(progress, ThemeHeadingAccent, true);
                GUILayout.Label("До следующего уровня: " +
                    Math.Max(0L, target - xp).ToString("N0", GrimoireCulture) + " XP",
                    uiStyles.HeroSubtitle);
            }
            else GUILayout.Label("Максимальный уровень", uiStyles.HeroSubtitle);
            GUILayout.EndVertical();
        }

        private void GrimoireChooseAdvancementClass(JObject hero, JArray classes,
            int total, bool enough)
        {
            bool wasMulticlass = advancementNewClass;
            GrimoireSection("ВЫБОР КЛАССА");
            GUILayout.BeginVertical(uiStyles.HeroPanel);
            GUILayout.BeginHorizontal();
            if (MeasuredMenuButton("Мои классы", advancementNewClass
                    ? uiStyles.HeroSecondaryButton : uiStyles.HeroSelectedButton,
                GUILayout.ExpandWidth(true), GUILayout.MinHeight(UiTheme.TouchHeight)))
                advancementNewClass = false;
            if (MeasuredMenuButton("Мультикласс", advancementNewClass
                    ? uiStyles.HeroSelectedButton : uiStyles.HeroSecondaryButton,
                GUILayout.ExpandWidth(true), GUILayout.MinHeight(UiTheme.TouchHeight)))
                advancementNewClass = true;
            GUILayout.EndHorizontal();
            if (wasMulticlass != advancementNewClass)
            {
                ResetFormInput();
                advancementSearch = "";
                advancementClassPage = 0;
            }
            if (advancementNewClass)
            {
                GUILayout.Label("Поиск класса", uiStyles.HeroSubtitle);
                string search = MenuTextField("advancementSearch", advancementSearch,
                    cloneInput, GUILayout.MinHeight(44));
                if (search != advancementSearch)
                {
                    advancementSearch = search;
                    advancementClassPage = 0;
                }
            }
            var owned = classes.OfType<JObject>().Select(c => (string)c["name"]).ToArray();
            var eligible = ((JObject)AdvancementCatalog["classes"]).Properties()
                .Where(p => advancementNewClass
                    ? !owned.Contains(p.Name, StringComparer.OrdinalIgnoreCase)
                      && p.Name.IndexOf(advancementSearch, StringComparison.CurrentCultureIgnoreCase) >= 0
                    : owned.Contains(p.Name, StringComparer.OrdinalIgnoreCase))
                .OrderBy(p => p.Name, StringComparer.CurrentCulture)
                .ToArray();
            const int pageSize = 8;
            int pages = Math.Max(1, (eligible.Length + pageSize - 1) / pageSize);
            advancementClassPage = Mathf.Clamp(advancementClassPage, 0, pages - 1);
            foreach (var p in eligible.Skip(advancementClassPage * pageSize).Take(pageSize))
            {
                string name = p.Name, problem = null;
                try { problem = CharacterAdvancement.EntryProblem(AdvancementCatalog, hero, name); }
                catch (FormatException e) { problem = e.Message; }
                bool enabled = GUI.enabled;
                GUI.enabled = enabled && problem == null && (enough || advancementMilestone) && total < 20;
                string label = name;
                if (problem == null)
                    label += " · " + CharacterAdvancement.NextClassLevel(AdvancementCatalog, hero, name) + " ур.";
                if (MeasuredMenuButton(label, uiStyles.HeroSecondaryButton,
                    GUILayout.MinHeight(UiTheme.TouchHeight)))
                    Attempt(() => SelectAdvancementClass(hero, name));
                GUI.enabled = enabled;
                if (problem != null) GUILayout.Label(problem, uiStyles.HeroSubtitle);
            }
            if (eligible.Length == 0)
                GUILayout.Label(advancementNewClass ? "Классы не найдены" :
                    "У героя нет класса с перенесённой прогрессией.", uiStyles.HeroSubtitle);
            if (pages > 1)
            {
                GUILayout.BeginHorizontal();
                bool enabled = GUI.enabled; GUI.enabled = enabled && advancementClassPage > 0;
                if (MeasuredMenuButton("←", uiStyles.HeroSecondaryButton,
                    GUILayout.Width(54), GUILayout.MinHeight(UiTheme.TouchHeight)))
                    advancementClassPage--;
                GUI.enabled = enabled;
                GUILayout.FlexibleSpace();
                GUILayout.Label((advancementClassPage + 1) + " / " + pages,
                    uiStyles.HeroSubtitle, GUILayout.MinHeight(44));
                GUILayout.FlexibleSpace();
                GUI.enabled = enabled && advancementClassPage + 1 < pages;
                if (MeasuredMenuButton("→", uiStyles.HeroSecondaryButton,
                    GUILayout.Width(54), GUILayout.MinHeight(UiTheme.TouchHeight)))
                    advancementClassPage++;
                GUI.enabled = enabled;
                GUILayout.EndHorizontal();
            }
            GUILayout.EndVertical();
        }

        private void GrimoireAdvancementFeatPicker()
        {
            var all = (CreationCatalog["feats"] as JArray ?? new JArray()).OfType<JObject>().ToArray();
            GrimoireSection("ЧЕРТА");
            GUILayout.Label("Поиск черты", uiStyles.HeroSubtitle);
            string search = MenuTextField("advancementFeatSearch", advancementFeatSearch,
                cloneInput, GUILayout.MinHeight(UiTheme.TouchHeight));
            if (search != advancementFeatSearch) { advancementFeatSearch = search; advancementFeatPage = 0; }
            var matches = all.Where(f => ((string)f["name"] ?? (string)f["id"] ?? "")
                .IndexOf(advancementFeatSearch, StringComparison.CurrentCultureIgnoreCase) >= 0).ToArray();
            const int pageSize = 8;
            int pages = Math.Max(1, (matches.Length + pageSize - 1) / pageSize);
            advancementFeatPage = Mathf.Clamp(advancementFeatPage, 0, pages - 1);
            foreach (JObject feat in matches.Skip(advancementFeatPage * pageSize).Take(pageSize))
            {
                string id = (string)feat["id"];
                if (MeasuredMenuButton((advancementFeat == id ? "✓ " : "") +
                    ((string)feat["name"] ?? id), uiStyles.HeroSecondaryButton,
                    GUILayout.MinHeight(UiTheme.TouchHeight)))
                    advancementFeat = id;
                if (advancementFeat == id)
                {
                    GUILayout.Label((string)(feat["description"] ?? feat["desc"]) ?? "",
                        uiStyles.HeroSubtitle);
                    if ((string)feat["statBonus"]?["type"] == "choice")
                        advancementFeatStat = AdvancementStat(advancementFeatStat,
                            "Характеристика черты");
                }
            }
            if (matches.Length == 0) GUILayout.Label("Черты не найдены", uiStyles.HeroSubtitle);
            if (pages > 1)
            {
                GUILayout.BeginHorizontal();
                bool canPrev = GUI.enabled && advancementFeatPage > 0;
                bool old = GUI.enabled; GUI.enabled = canPrev;
                if (MeasuredMenuButton("←", uiStyles.HeroSecondaryButton, GUILayout.Width(54),
                    GUILayout.MinHeight(UiTheme.TouchHeight))) advancementFeatPage--;
                GUI.enabled = old;
                GUILayout.FlexibleSpace();
                GUILayout.Label((advancementFeatPage + 1) + " / " + pages, uiStyles.HeroSubtitle);
                GUILayout.FlexibleSpace();
                GUI.enabled = old && advancementFeatPage + 1 < pages;
                if (MeasuredMenuButton("→", uiStyles.HeroSecondaryButton, GUILayout.Width(54),
                    GUILayout.MinHeight(UiTheme.TouchHeight))) advancementFeatPage++;
                GUI.enabled = old;
                GUILayout.EndHorizontal();
            }
        }
    }
}
