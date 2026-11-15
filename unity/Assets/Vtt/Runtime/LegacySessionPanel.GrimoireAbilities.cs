using System;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json.Linq;
using UnityEngine;

namespace DndVtt.UnityPrototype
{
    // Presentation only. All character data, action accounting and persistence
    // remain in CharacterSheetRules and DrawSheet.
    public sealed partial class LegacySessionPanel
    {
        private int abilityViewMode;
        private int abilityActionFilter;
        private int abilitySpellCircle = -1;
        private bool abilitySpellFiltersOpen;
        private bool abilityMoreFeaturesOpen;
        private bool abilityEditorOpen;
        private bool requestedAbilitySettings;
        private string abilitySpellQuery = "";
        private Vector2 abilitySlotsScroll, abilitySpellFiltersScroll;
        private int? pendingAbilityViewMode, pendingAbilityActionFilter, pendingAbilitySpellCircle;
        private bool? pendingAbilitySpellFilters, pendingAbilityMoreFeatures, pendingAbilityEditor;
        private string pendingAbilityFold;
        private static readonly string[] AbilityActionLabels = { "Все", "Действия", "Бонусные", "Реакции" };
        private static readonly string[] AbilityRoman = { "Ф", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX" };

        private void ResetGrimoireAbilityView()
        {
            abilityViewMode = abilityActionFilter = 0;
            abilitySpellCircle = -1;
            abilitySpellFiltersOpen = false;
            abilityMoreFeaturesOpen = false;
            abilityEditorOpen = false;
            requestedAbilitySettings = false;
            abilitySpellQuery = "";
            abilitySlotsScroll = abilitySpellFiltersScroll = Vector2.zero;
            pendingAbilityViewMode = pendingAbilityActionFilter = pendingAbilitySpellCircle = null;
            pendingAbilitySpellFilters = pendingAbilityMoreFeatures = pendingAbilityEditor = null;
            pendingAbilityFold = null;
        }

        private void CommitGrimoireAbilityView()
        {
            if (Event.current.type != EventType.Layout) return;
            if (pendingAbilityViewMode.HasValue)
            {
                abilityViewMode = pendingAbilityViewMode.Value;
                pendingAbilityViewMode = null;
                ResetFormInput();
                frontScroll = Vector2.zero;
            }
            if (pendingAbilityActionFilter.HasValue)
            {
                abilityActionFilter = pendingAbilityActionFilter.Value;
                pendingAbilityActionFilter = null;
            }
            if (pendingAbilitySpellCircle.HasValue)
            {
                abilitySpellCircle = pendingAbilitySpellCircle.Value;
                pendingAbilitySpellCircle = null;
            }
            if (pendingAbilitySpellFilters.HasValue)
            {
                abilitySpellFiltersOpen = pendingAbilitySpellFilters.Value;
                pendingAbilitySpellFilters = null;
            }
            if (pendingAbilityMoreFeatures.HasValue)
            {
                abilityMoreFeaturesOpen = pendingAbilityMoreFeatures.Value;
                pendingAbilityMoreFeatures = null;
            }
            if (pendingAbilityEditor.HasValue)
            {
                abilityEditorOpen = pendingAbilityEditor.Value;
                pendingAbilityEditor = null;
            }
            if (pendingAbilityFold != null)
            {
                ResetFormInput();
                if (!expanded.Add(pendingAbilityFold)) expanded.Remove(pendingAbilityFold);
                pendingAbilityFold = null;
            }
        }

        // Filtering is deliberately conservative: an untyped imported feature
        // stays in "Все", rather than inventing an action type.
        public static bool GrimoireAbilityMatches(JObject ability, int category)
        {
            if (category == 0) return true;
            string action = (ability?["actionType"] ?? ability?["activation"] ??
                ability?["actionEconomy"] ?? ability?["type"])?.ToString().Trim().ToLowerInvariant() ?? "";
            switch (category)
            {
                case 1: return action == "action" || action == "1 action" ||
                    action == "действие" || action == "основное действие";
                case 2: return action == "bonus" || action == "bonus action" ||
                    action == "бонусное" || action == "бонусное действие";
                case 3: return action == "reaction" || action == "реакция";
                default: return false;
            }
        }

        public static bool GrimoireSpellMatches(JObject spell, string query, int circle)
        {
            if (spell == null) return false;
            int level = SpellDisplayLevel(spell);
            if (circle >= 0 && level != circle) return false;
            string search = (query ?? "").Trim();
            if (search.Length == 0) return true;
            return ((string)spell["name"] ?? "").IndexOf(search, StringComparison.OrdinalIgnoreCase) >= 0 ||
                ((string)(spell["description"] ?? spell["desc"]) ?? "")
                    .IndexOf(search, StringComparison.OrdinalIgnoreCase) >= 0;
        }

        private static int SpellDisplayLevel(JObject spell)
        {
            return int.TryParse(spell?["level"]?.ToString(), out int level) &&
                level >= 0 && level <= 9 ? level : -1;
        }

        private void DrawGrimoireAbilities(JObject hero, ref bool changed)
        {
            PrepareGrimoireAbilityStyles();
            CommitGrimoireAbilityView();
            if (!PhoneSheet) DrawSheetHeroBack();

            // A single visual stream exactly like the approved right-hand phone.
            GUILayout.Space(2);
            DrawAbilityTurnPanel(hero, ref changed);
            DrawAbilityModeTabs();
            if (abilityViewMode == 0)
            {
                DrawAbilityActionTabs();
                DrawAbilityCards(hero, ref changed);
            }
            DrawAbilitySlotPanel(hero, ref changed);
            DrawAbilitySpellToolbar(hero);
            DrawAbilitySpellCards(hero, ref changed);
            DrawAbilityResources(hero, ref changed);
            DrawAbilityLegacyControls(hero, ref changed);
        }

        private void DrawAbilityModeTabs()
        {
            GUILayout.BeginHorizontal();
            if (MeasuredMenuButton("⚔  Умения", abilityViewMode == 0 ? uiStyles.AbilityGold : uiStyles.AbilityTab,
                GUILayout.ExpandWidth(true), GUILayout.Height(47)))
                pendingAbilityViewMode = 0;
            if (MeasuredMenuButton("▣  Заклинания", abilityViewMode == 1 ? uiStyles.AbilityGold : uiStyles.AbilityTab,
                GUILayout.ExpandWidth(true), GUILayout.Height(47)))
                pendingAbilityViewMode = 1;
            GUILayout.EndHorizontal();
            GUILayout.Space(8);
        }

        private void DrawAbilityActionTabs()
        {
            GUILayout.BeginHorizontal();
            for (int i = 0; i < AbilityActionLabels.Length; i++)
            {
                int value = i;
                if (MeasuredMenuButton(AbilityActionLabels[i],
                    abilityActionFilter == i ? uiStyles.AbilitySelectedChip : uiStyles.AbilityChip,
                    GUILayout.ExpandWidth(true), GUILayout.Height(36)))
                    pendingAbilityActionFilter = value;
            }
            GUILayout.EndHorizontal();
            GUILayout.Space(5);
        }

        private void DrawAbilityCards(JObject hero, ref bool changed)
        {
            var list = (hero["combatAbilities"] as JArray ?? new JArray()).OfType<JObject>()
                .Where(a => GrimoireAbilityMatches(a, abilityActionFilter)).ToArray();
            var additional = new List<(string name, string desc)>();
            var shown = new HashSet<string>(list.Select(x => (string)x["name"] ?? ""),
                StringComparer.OrdinalIgnoreCase);
            if (hero["features"] is JArray features)
                foreach (JToken feature in features)
                {
                    JObject data = feature as JObject;
                    if (data != null && !GrimoireAbilityMatches(data, abilityActionFilter)) continue;
                    if (data == null && abilityActionFilter != 0) continue;
                    string title = data != null
                        ? GrimoireAbilityScalar(data["name"] ?? data["title"] ?? data["id"])
                        : feature.Type == JTokenType.String ? feature.ToString() : null;
                    if (string.IsNullOrWhiteSpace(title) || !shown.Add(title)) continue;
                    string desc = data != null
                        ? GrimoireAbilityScalar(data["description"] ?? data["desc"] ?? data["text"]) ?? ""
                        : "";
                    additional.Add((title, desc));
                }
            if (list.Length == 0 && additional.Count == 0)
            {
                GUILayout.BeginVertical(uiStyles.AbilityPanel);
                GUILayout.Label(abilityActionFilter == 0
                    ? "Способности пока не добавлены."
                    : "В этой категории нет приёмов с указанным типом действия.", uiStyles.AbilitySub);
                GUILayout.EndVertical();
            }

            foreach (JObject ability in list)
            {
                string name = (string)ability["name"] ?? "Приём";
                string key = "ability:" + ability["id"];
                bool open = expanded.Contains(key);
                int max = 0, used = 0;
                bool known = CharacterSheetRules.TrySheetCount(ability["maxUses"], out max) &&
                    CharacterSheetRules.TrySheetCount(ability["usedCount"], out used);
                if (!known) { max = 0; used = 0; }
                GUILayout.BeginVertical(uiStyles.AbilityCard, GUILayout.MinHeight(68));
                GUILayout.BeginHorizontal(GUILayout.MinHeight(51));
                DrawGrimoireQuestionIcon(51);
                GUILayout.Space(7);
                GUILayout.BeginVertical(GUILayout.ExpandWidth(true));
                if (GUILayout.Button(name + (open ? "  ▴" : "  ▾"),
                    uiStyles.AbilityName))
                    ToggleAbilityFold(key);
                string recharge = (string)ability["rechargeOn"] ?? "none";
                string rechargeLabel = recharge == "short" || recharge == "short_rest" ? "короткий отдых" :
                    recharge == "long" || recharge == "long_rest" ? "длинный отдых" : "не требуется";
                GUILayout.Label(known ? "Восстановление: " + rechargeLabel : "Особый счётчик · данные сохранены",
                    uiStyles.AbilitySub);
                GUILayout.EndVertical();
                GUILayout.BeginVertical(GUILayout.Width(90));
                if (known && max > 0)
                    GUILayout.Label(Math.Max(0, max - used) + "/" + max, uiStyles.AbilityCounter, GUILayout.Height(21));
                else
                    GUILayout.Label("—", uiStyles.AbilityCounter, GUILayout.Height(21));
                bool old = GUI.enabled;
                GUI.enabled = old && known && max > 0 && used < max;
                if (max > 0 && known)
                {
                    if (MeasuredMenuButton(used < max ? "Применить" : "Исчерпано", uiStyles.AbilityGold,
                        GUILayout.Width(90), GUILayout.Height(31)))
                        SheetAction(() => CharacterSheetRules.ChangeAbilityUse(hero, ability["id"]?.ToString(), 1), ref changed);
                }
                GUI.enabled = old;
                if (!(known && max > 0) &&
                    MeasuredMenuButton(open ? "Свернуть" : "Подробнее", uiStyles.AbilityChip, GUILayout.Width(90), GUILayout.Height(31)))
                    ToggleAbilityFold(key);
                GUILayout.EndVertical();
                GUILayout.EndHorizontal();
                // Details open by tapping the ability name. No second control
                // row is needed in the collapsed reference-sized card.
                if (open)
                {
                    if (known && max > 0 && used > 0 &&
                        MeasuredMenuButton("↶ Вернуть использование", uiStyles.AbilityChip,
                            GUILayout.MinHeight(40)))
                        SheetAction(() => CharacterSheetRules.ChangeAbilityUse(hero, ability["id"]?.ToString(), -1), ref changed);
                    GUILayout.Label("Параметры приёма", uiStyles.AbilitySub);
                    foreach (var pair in new[] { ("name", "Название"), ("description", "Описание"),
                        ("maxUses", "Максимум использований"), ("rechargeOn", "Восстановление: short / long / none") })
                        Scalar(ability, pair.Item1, pair.Item2, ref changed);
                    if (MeasuredMenuButton("Удалить приём…", uiStyles.AbilityChip, GUILayout.MinHeight(42)))
                        RequestDelete(ability, name);
                }
                GUILayout.EndVertical();
            }

            // Imported class features may be purely descriptive. Show them as
            // read-only cards, never fabricate uses or a playable effect.
            int visibleFeatures = abilityMoreFeaturesOpen ? additional.Count :
                Math.Min(additional.Count, 2);
            for (int index = 0; index < visibleFeatures; index++)
            {
                var feature = additional[index];
                string key = "grimoire-feature:" + index + ":" + feature.name;
                bool open = expanded.Contains(key);
                GUILayout.BeginVertical(uiStyles.AbilityCard, GUILayout.MinHeight(65));
                GUILayout.BeginHorizontal(GUILayout.MinHeight(49));
                DrawGrimoireQuestionIcon(49);
                GUILayout.Space(7);
                GUILayout.BeginVertical(GUILayout.ExpandWidth(true));
                GUILayout.Label(feature.name, uiStyles.AbilityName);
                GUILayout.Label("Особенность класса", uiStyles.AbilitySub);
                GUILayout.EndVertical();
                if (MeasuredMenuButton(open ? "⌃" : "⌄", uiStyles.AbilityChip,
                    GUILayout.Width(40), GUILayout.Height(44)))
                    ToggleAbilityFold(key);
                GUILayout.EndHorizontal();
                if (open)
                    GUILayout.Label(string.IsNullOrWhiteSpace(feature.desc)
                        ? "Описание отсутствует. Полные данные доступны в «Особенности класса»."
                        : feature.desc, uiStyles.AbilityDescription);
                GUILayout.EndVertical();
            }

            if (additional.Count > 2)
            {
                if (MeasuredMenuButton(abilityMoreFeaturesOpen ? "▴ Свернуть особенности" :
                    "▾ Все особенности (" + additional.Count + ")", uiStyles.AbilityChip,
                    GUILayout.MinHeight(36)))
                    pendingAbilityMoreFeatures = !abilityMoreFeaturesOpen;
            }
        }

        private void ToggleAbilityFold(string key)
        {
            // IMGUI layout must only change at the next Layout event.
            pendingAbilityFold = key;
        }

        private bool GrimoireAbilityFold(string key, string label)
        {
            bool open = expanded.Contains(key);
            if (MeasuredMenuButton((open ? "▾ " : "▸ ") + label,
                uiStyles.AbilityChip, GUILayout.MinHeight(39)))
                ToggleAbilityFold(key);
            return open;
        }

        // Imported and homebrew JSON may contain objects instead of plain
        // strings. Only scalar values are useful for a compact card heading.
        private static string GrimoireAbilityScalar(JToken token)
        {
            return token is JValue value ? value.ToString() : null;
        }

        private void DrawAbilitySlotPanel(JObject hero, ref bool changed)
        {
            var slots = new List<(int level, int max, int used, bool pact)>();
            var unusual = new List<string>();
            if (hero["spellSlotsData"] is JObject rows)
                foreach (var property in rows.Properties())
                {
                    if (!int.TryParse(property.Name, out int level) || level < 1 || level > 9 ||
                        property.Value is not JObject slot) continue;
                    if (!CharacterSheetRules.TrySheetCount(slot["max"], out int max) ||
                        !CharacterSheetRules.TrySheetCount(slot["used"], out int used))
                    { unusual.Add("Круг " + level + ": особый счётчик"); continue; }
                    if (max > 0) slots.Add((level, max, used, false));
                }
            if ((hero["pactMagicData"] as JObject ?? hero["pactMagic"] as JObject) is JObject pact)
            {
                if (CharacterSheetRules.TrySheetCount(pact["max"], out int max) &&
                    CharacterSheetRules.TrySheetCount(pact["used"], out int used))
                {
                    if (max > 0)
                    {
                        int pactLevel = int.TryParse(pact["slotLevel"]?.ToString(), out int parsed)
                            ? Mathf.Clamp(parsed, 1, 9) : 1;
                        slots.Add((pactLevel, max, used, true));
                    }
                }
                else unusual.Add("Пакт: особый счётчик");
            }
            slots = slots.OrderBy(s => s.level).ThenBy(s => s.pact).ToList();
            GUILayout.Space(7);
            GUILayout.BeginVertical(uiStyles.AbilityPanel);
            GUILayout.Label("✦  Ячейки заклинаний", uiStyles.AbilityTitle);
            DrawGrimoireAbilityRule();
            if (slots.Count == 0 && unusual.Count == 0)
                GUILayout.Label("Обычных ячеек пока нет", uiStyles.AbilitySub);

            // Group widths are fixed; the full row scrolls horizontally if more
            // than three circles are unlocked. No squashing of the glowing orbs.
            int highestRows = slots.Count == 0 ? 1 : slots.Max(s => (Math.Min(s.max, 20) + 4) / 5);
            int maxHeight = Mathf.Clamp(43 + highestRows * 26, 75, 150);
            abilitySlotsScroll = GUILayout.BeginScrollView(
                SwipePosition("grimoire-ability-slots", abilitySlotsScroll), false, false,
                GUI.skin.horizontalScrollbar, GUIStyle.none, GUILayout.Height(maxHeight));
            GUILayout.BeginHorizontal();
            foreach (var slot in slots)
            {
                int level = slot.level, max = slot.max, used = slot.used;
                bool isPactSlot = slot.pact;
                GUILayout.BeginVertical(GUILayout.Width(117));
                GUILayout.Label(isPactSlot ? "ПАКТ " + AbilityRoman[level] : AbilityRoman[level],
                    uiStyles.AbilityCircleTitle, GUILayout.Height(22));
                int display = Math.Min(max, 20);
                for (int start = 0; start < display; start += 5)
                {
                    // Fixed geometry; a GUILayout row of five tiny buttons can
                    // add implicit spacing and incorrectly wrap to six columns.
                    Rect row = GUILayoutUtility.GetRect(111, 26,
                        GUILayout.Width(111), GUILayout.Height(26));
                    for (int index = start; index < Math.Min(display, start + 5); index++)
                    {
                        bool filled = index < Math.Max(0, max - used);
                        Rect hit = new Rect(row.x + (index - start) * 22,
                            row.y, 22, 26);
                        Rect orb = new Rect(hit.x + 2, hit.y + 4, 18, 18);
                        if (GUI.Button(hit, GUIContent.none, GUIStyle.none))
                        {
                            if (isPactSlot) SheetAction(() => CharacterSheetRules.ChangePactUse(hero, filled ? 1 : -1), ref changed);
                            else SheetAction(() => CharacterSheetRules.ChangeSpellUse(hero, level, filled ? 1 : -1), ref changed);
                        }
                        if (Event.current.type == EventType.Repaint)
                            DrawGrimoireAbilityOrb(orb, filled, level);
                    }
                }
                if (max > display)
                    GUILayout.Label("+" + (max - display) + " ячеек", uiStyles.AbilitySub);
                GUILayout.Label(Math.Max(0, max - used) + "/" + max,
                    uiStyles.AbilityCounter, GUILayout.Height(21));
                GUILayout.EndVertical();
                GUILayout.Space(8);
            }
            GUILayout.EndHorizontal();
            GUILayout.EndScrollView();
            RegisterSwipe("grimoire-ability-slots", GUILayoutUtility.GetLastRect(), true);
            foreach (string message in unusual) GUILayout.Label(message, uiStyles.AbilitySub);
            GUILayout.EndVertical();
            DrawGrimoireAbilityFrame(GUILayoutUtility.GetLastRect());
        }

        private void DrawAbilitySpellToolbar(JObject hero)
        {
            GUILayout.Space(4);
            GUILayout.BeginHorizontal(uiStyles.AbilitySearchPanel, GUILayout.Height(44));
            GUILayout.Label("⌕", uiStyles.AbilitySearchGlyph, GUILayout.Width(25), GUILayout.Height(32));
            abilitySpellQuery = MenuTextField("grimoire-abilities-spell-search", abilitySpellQuery,
                uiStyles.AbilityInput, GUILayout.ExpandWidth(true), GUILayout.Height(36));
            Rect searchRect = GUILayoutUtility.GetLastRect();
            if (Event.current.type == EventType.Repaint && string.IsNullOrEmpty(abilitySpellQuery))
                GUI.Label(new Rect(searchRect.x + 8, searchRect.y + 2,
                    searchRect.width - 16, searchRect.height - 4),
                    "Поиск заклинаний…", uiStyles.AbilitySearchHint);
            if (MeasuredMenuButton("⚲", uiStyles.AbilityChip, GUILayout.Width(39), GUILayout.Height(36)))
                pendingAbilitySpellFilters = !abilitySpellFiltersOpen;
            if (MeasuredMenuButton("☷", uiStyles.AbilityChip, GUILayout.Width(39), GUILayout.Height(36)))
                OpenSpellCatalog();
            GUILayout.EndHorizontal();
            if (abilitySpellFiltersOpen)
            {
                abilitySpellFiltersScroll = GUILayout.BeginScrollView(
                    SwipePosition("grimoire-spell-filters", abilitySpellFiltersScroll), true, false,
                    GUI.skin.horizontalScrollbar, GUIStyle.none, GUILayout.Height(46));
                GUILayout.BeginHorizontal();
                if (MeasuredMenuButton(abilitySpellCircle == -1 ? "✓ Все круги" : "Все круги",
                    uiStyles.AbilityChip, GUILayout.MinHeight(37)))
                    pendingAbilitySpellCircle = -1;
                for (int i = 0; i <= 9; i++)
                {
                    int circle = i;
                    if ((hero["spellsData"] as JArray)?.OfType<JObject>()
                        .Any(s => SpellDisplayLevel(s) == i) != true) continue;
                    if (MeasuredMenuButton((abilitySpellCircle == i ? "✓ " : "") + AbilityRoman[i],
                        uiStyles.AbilityChip, GUILayout.MinHeight(37)))
                        pendingAbilitySpellCircle = circle;
                }
                GUILayout.EndHorizontal();
                GUILayout.EndScrollView();
                RegisterSwipe("grimoire-spell-filters", GUILayoutUtility.GetLastRect(), true);
            }
        }

        private void DrawAbilitySpellCards(JObject hero, ref bool changed)
        {
            var spells = (hero["spellsData"] as JArray ?? new JArray()).OfType<JObject>()
                .Where(s => GrimoireSpellMatches(s, abilitySpellQuery, abilitySpellCircle))
                .OrderBy(SpellDisplayLevel).ThenBy(s => (string)s["name"], StringComparer.CurrentCultureIgnoreCase)
                .ToArray();
            if (spells.Length == 0)
            {
                GUILayout.BeginVertical(uiStyles.AbilityPanel);
                GUILayout.Label("Заклинания не найдены. Нажмите ＋, чтобы открыть справочник.",
                    uiStyles.AbilitySub);
                GUILayout.EndVertical();
            }
            foreach (JObject spell in spells)
            {
                string name = (string)spell["name"] ?? "Заклинание";
                int level = SpellDisplayLevel(spell);
                string key = "spell:" + spell["id"];
                bool open = expanded.Contains(key);
                bool prepared = spell["prepared"]?.Type == JTokenType.Boolean && (bool)spell["prepared"];
                GUILayout.BeginVertical(uiStyles.AbilityCard, GUILayout.MinHeight(56));
                GUILayout.BeginHorizontal(GUILayout.MinHeight(47));
                DrawGrimoireQuestionIcon(47);
                GUILayout.Space(6);
                GUILayout.BeginVertical(GUILayout.ExpandWidth(true));
                GUILayout.Label(name, uiStyles.AbilityName);
                string time = (string)spell["castingTime"] ?? (string)spell["time"] ?? "—";
                string range = (string)spell["range"] ?? "—";
                string summary = (level < 0 ? "?" : AbilityRoman[level]) + "   " +
                    CompactSpellAttribute(time, 14) + "  ◉ " +
                    CompactSpellAttribute(range, 12) +
                    (spell["concentration"]?.Type == JTokenType.Boolean && (bool)spell["concentration"]
                        ? "  ◇ Конц." : "");
                GUILayout.Label(summary, uiStyles.AbilitySpellMeta, GUILayout.MinHeight(17));
                GUILayout.EndVertical();
                if (MeasuredMenuButton(prepared ? "★" : "☆", uiStyles.AbilityStar,
                    GUILayout.Width(33), GUILayout.Height(39)))
                {
                    spell["prepared"] = !prepared;
                    changed = true;
                }
                if (MeasuredMenuButton(open ? "⌃" : "⌄", uiStyles.AbilityChip,
                    GUILayout.Width(30), GUILayout.Height(39)))
                    ToggleAbilityFold(key);
                GUILayout.EndHorizontal();
                if (open)
                {
                    GUILayout.Label(prepared ? "★ Подготовлено" : "☆ Не подготовлено", uiStyles.AbilitySub);
                    string desc = (string)(spell["desc"] ?? spell["description"]) ?? "Описание отсутствует";
                    GUILayout.Label(desc, uiStyles.AbilityDescription);
                    if (MeasuredMenuButton("Удалить заклинание…", uiStyles.AbilityChip,
                        GUILayout.MinHeight(42)))
                        RequestDelete(spell, name);
                }
                GUILayout.EndVertical();
            }
        }

        // Display-only truncation. Original time/range stays in JSON and the
        // expanded description, so no user content is modified.
        private static string CompactSpellAttribute(string value, int maxLength)
        {
            if (string.IsNullOrWhiteSpace(value)) return "—";
            value = value.Trim().Replace("\\n", " ");
            return value.Length > maxLength ? value.Substring(0, maxLength - 1) + "…" : value;
        }

        private void DrawAbilityResources(JObject hero, ref bool changed)
        {
            if (hero["resources"] is not JObject resources || !resources.Properties().Any()) return;
            GUILayout.Space(6);
            GUILayout.BeginVertical(uiStyles.AbilityPanel);
            GUILayout.Label("✦ Ресурсы", uiStyles.AbilityTitle);
            DrawGrimoireAbilityRule();
            foreach (var property in resources.Properties())
            {
                if (property.Value is not JObject resource ||
                    !int.TryParse(resource["current"]?.ToString(), out int current) ||
                    !int.TryParse(resource["max"]?.ToString(), out int max) ||
                    current < 0 || max < 0)
                {
                    GUILayout.Label(property.Name + " · особый способ учёта", uiStyles.AbilitySub);
                    continue;
                }
                GUILayout.BeginHorizontal();
                GUILayout.Label(((string)resource["name"] ?? property.Name) + "   " + current + "/" + max,
                    uiStyles.AbilitySub, GUILayout.ExpandWidth(true), GUILayout.MinHeight(35));
                bool enabled = GUI.enabled;
                GUI.enabled = enabled && current > 0;
                if (MeasuredMenuButton("−", uiStyles.AbilityChip, GUILayout.Width(40), GUILayout.Height(36)))
                    SheetAction(() => CharacterSheetRules.ChangeResource(hero, property.Name, -1), ref changed);
                GUI.enabled = enabled && current < max;
                if (MeasuredMenuButton("+", uiStyles.AbilityChip, GUILayout.Width(40), GUILayout.Height(36)))
                    SheetAction(() => CharacterSheetRules.ChangeResource(hero, property.Name, 1), ref changed);
                GUI.enabled = enabled;
                GUILayout.EndHorizontal();
                Rect bar = GUILayoutUtility.GetRect(1, 9, GUILayout.ExpandWidth(true));
                if (Event.current.type == EventType.Repaint)
                    DrawGrimoireAbilityBar(bar, max == 0 ? 0 : Mathf.Clamp01((float)current / max));
                GUILayout.Space(5);
            }
            GUILayout.EndVertical();
            DrawGrimoireAbilityFrame(GUILayoutUtility.GetLastRect());
        }

        private void DrawAbilityLegacyControls(JObject hero, ref bool changed)
        {
            GUILayout.Space(5);
            GUILayout.BeginVertical(uiStyles.AbilityPanel);
            if (GrimoireAbilityFold("class-features", "Особенности класса"))
                ReadOnlyToken(hero["features"] ?? new JArray(), "features", 0);
            if (GrimoireAbilityFold("grimoire-slot-settings", "⚙ Настроить ячейки"))
                Tree(hero, "spellSlotsData", "Максимум / использовано", ref changed);
            if (MeasuredMenuButton(abilityEditorOpen ? "▴ Скрыть создание приёма" :
                "＋ Добавить свой приём", uiStyles.AbilityChip, GUILayout.MinHeight(39)))
                pendingAbilityEditor = !abilityEditorOpen;
            if (abilityEditorOpen &&
                MeasuredMenuButton("+ Свой приём", uiStyles.AbilityGold, GUILayout.MinHeight(42)))
                SheetAction(() => CharacterSheetRules.Array(hero, "combatAbilities").Add(new JObject {
                    ["id"] = Guid.NewGuid().ToString(),
                    ["name"] = "Новый приём", ["description"] = "",
                    ["rechargeOn"] = "none", ["maxUses"] = 0, ["usedCount"] = 0
                }), ref changed);
            if (GrimoireAbilityFold("grimoire-ability-stats", "⚙ Параметры приёмов и магии"))
            {
                GUILayout.Label("Характеристика приёмов", uiStyles.AbilitySub);
                ClassicAbilityStat(hero, "combatAbilityStat", "str", ref changed);
                string stat = (string)hero["combatAbilityStat"] ?? "str";
                int atk = CharacterSheetRules.Modifier(hero, stat) + CharacterSheetRules.Proficiency(hero);
                GUILayout.Label("Атака " + Signed(atk) + " · СЛ " + (8 + atk), uiStyles.AbilitySub);
                GUILayout.Label("Характеристика заклинаний", uiStyles.AbilitySub);
                ClassicAbilityStat(hero, "spellStat", "int", ref changed);
                string magic = (string)hero["spellStat"] ?? "int";
                int spellAtk = CharacterSheetRules.Modifier(hero, magic) + CharacterSheetRules.Proficiency(hero);
                GUILayout.Label("Атака " + Signed(spellAtk) + " · СЛ " + (8 + spellAtk), uiStyles.AbilitySub);
            }
            GUILayout.Label("Расход счётчика не выполняет атаку, выбор цели или особый классовый эффект. Эти действия пока учитываются за столом.",
                uiStyles.AbilityDescription);
            GUILayout.EndVertical();
        }
    }
}
