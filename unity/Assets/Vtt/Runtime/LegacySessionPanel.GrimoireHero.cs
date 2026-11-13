using System;
using System.Globalization;
using System.Linq;
using Newtonsoft.Json.Linq;
using UnityEngine;

namespace DndVtt.UnityPrototype
{
    public sealed partial class LegacySessionPanel
    {
        private static readonly long[] GrimoireXpThresholds =
        {
            0, 300, 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000,
            85000, 100000, 120000, 140000, 165000, 195000, 225000, 265000, 305000, 355000
        };
        private static readonly CultureInfo GrimoireCulture = CultureInfo.GetCultureInfo("ru-RU");

        private void PrepareGrimoireHeroStyles()
        {
            // UiStyleRoles is owned by the sheet skin and is discarded on a theme change.
            if (uiStyles.HeroPanel != null) return;
            uiStyles.HeroPanel = new GUIStyle(sheetSkin.box)
            {
                padding = new RectOffset(13, 13, 13, 13),
                margin = new RectOffset(0, 0, 0, 10)
            };
            uiStyles.HeroMetric = new GUIStyle(sheetMetricBox)
            {
                padding = new RectOffset(5, 5, 10, 10),
                margin = new RectOffset(2, 2, 2, 2)
            };
            uiStyles.HeroName = new GUIStyle(sheetCharacterName)
            {
                fontSize = 22, fontStyle = FontStyle.Bold, wordWrap = true,
                normal = { textColor = Color.white }
            };
            uiStyles.HeroSubtitle = new GUIStyle(sheetQuiet)
            {
                fontSize = 15, wordWrap = true,
                normal = { textColor = new Color(.80f, .79f, .76f) }
            };
            uiStyles.HeroSection = new GUIStyle(sheetHeading)
            {
                fontSize = 17, normal = { textColor = ThemeHeadingAccent }
            };
            uiStyles.HeroValue = new GUIStyle(sheetCharacterName)
            {
                fontSize = 20, alignment = TextAnchor.MiddleCenter,
                normal = { textColor = Color.white }
            };
            uiStyles.HeroSmall = new GUIStyle(sheetQuiet)
            {
                fontSize = 13, alignment = TextAnchor.MiddleCenter, wordWrap = true
            };

            // Optional imported Dark Grimoire UI Kit. Missing PNGs never block the sheet.
            // Loaded once per skin lifetime; Resources-owned textures are never destroyed.
            Texture2D main = Resources.Load<Texture2D>("UI/Grimoire/panels/panel_primary_9s");
            Texture2D inset = Resources.Load<Texture2D>("UI/Grimoire/panels/panel_inset_9s");
            if (main)
            {
                uiStyles.HeroPanel.normal.background = main;
                uiStyles.HeroPanel.border = new RectOffset(16, 16, 16, 16);
            }
            if (inset)
            {
                uiStyles.HeroMetric.normal.background = inset;
                uiStyles.HeroMetric.border = new RectOffset(16, 16, 16, 16);
            }
            uiStyles.HeroIcon = Resources.Load<Texture2D>("UI/Grimoire/icons/icon_hero_96");
            uiStyles.HeroHealthTrack = Resources.Load<Texture2D>("UI/Grimoire/bars/bar_health_track_9s");
            uiStyles.HeroHealthFill = Resources.Load<Texture2D>("UI/Grimoire/bars/bar_health_fill_mask_9s");
            uiStyles.HeroXpTrack = Resources.Load<Texture2D>("UI/Grimoire/bars/bar_experience_track_9s");
            uiStyles.HeroXpFill = Resources.Load<Texture2D>("UI/Grimoire/bars/bar_experience_fill_mask_9s");
        }

        // First redesign screen; the original full character editor stays available below.
        private void GrimoireHero(JObject hero, ref bool changed)
        {
            PrepareCloneControls();
            PrepareGrimoireHeroStyles();
            classicControlWidth = ClassicBodyWidth - 32;
            GrimoireIdentity(hero);
            GrimoireHealth(hero, ref changed);
            GrimoireMetrics(hero);
            GrimoireExperience(hero);
            GrimoireConditions(hero);
            GrimoireQuickActions(hero);

            string foldId = "grimoire-hero:" + (string)hero["id"];
            if (SheetFold(foldId, "Сведения о герое · подробности и редактирование"))
            {
                // Keep every old control: editable identity/race/speed, death saves,
                // long/short rest, all six stats, exports and class advancement.
                GrimoireHeroDetails(hero, ref changed);
            }
            classicControlWidth = 0;
        }

        private void GrimoireIdentity(JObject hero)
        {
            GUILayout.BeginVertical(uiStyles.HeroPanel);
            GUILayout.BeginHorizontal();
            Texture2D portrait = HeroArtTexture(hero); // Existing cached decoder.
            Rect photo = GUILayoutUtility.GetRect(92, 116, GUILayout.Width(92), GUILayout.Height(116));
            if (Event.current.type == EventType.Repaint)
            {
                GUI.DrawTexture(photo, Texture2D.whiteTexture, ScaleMode.StretchToFill, false, 0,
                    new Color(.10f, .10f, .12f), 0, 10);
                if (portrait)
                {
                    Rect inner = new Rect(photo.x + 5, photo.y + 5, photo.width - 10, photo.height - 10);
                    GUI.DrawTexture(inner, portrait, ScaleMode.ScaleAndCrop);
                }
                else if (uiStyles.HeroIcon)
                {
                    Rect icon = new Rect(photo.x + 24, photo.y + 34, photo.width - 48, photo.height - 68);
                    GUI.DrawTexture(icon, uiStyles.HeroIcon, ScaleMode.ScaleToFit, true, 0, ThemeHeadingAccent, 0, 0);
                }
                else
                {
                    GUI.Label(photo, "✦", uiStyles.HeroValue);
                }
            }
            // Reuse the existing art viewer/import flow rather than a new portrait system.
            if (GUI.Button(photo, GUIContent.none, GUIStyle.none))
                requestedPortraitVisibility = true;
            GUILayout.Space(10);
            GUILayout.BeginVertical(GUILayout.ExpandWidth(true));
            GUILayout.Label((string)hero["name"] ?? "Безымянный герой", uiStyles.HeroName);
            var classes = hero["classes"] as JArray;
            string classLabel = classes != null && classes.Count > 0
                ? string.Join(" / ", classes.OfType<JObject>().Select(c => (string)c["name"] ?? "Класс"))
                : (string)(hero["class"] ?? hero["className"]) ?? "Класс не выбран";
            GUILayout.Label(classLabel + " · " + CharacterSheetRules.Level(hero) + " ур.", uiStyles.HeroSubtitle);
            GUILayout.Label((string)(hero["raceName"] ?? hero["race"]) ?? "Раса не указана", uiStyles.HeroSubtitle);
            string background = (string)hero["background"];
            if (!string.IsNullOrWhiteSpace(background))
                GUILayout.Label(background, uiStyles.HeroSubtitle);
            GUILayout.EndVertical();
            GUILayout.EndHorizontal();
            GrimoireRule();
            GUILayout.EndVertical();
        }

        private void GrimoireSection(string title)
        {
            GUILayout.Space(5);
            GUILayout.Label(title, uiStyles.HeroSection);
        }

        private void GrimoireRule()
        {
            Rect r = GUILayoutUtility.GetRect(1, 2, GUILayout.ExpandWidth(true));
            if (Event.current.type == EventType.Repaint)
                GUI.DrawTexture(r, Texture2D.whiteTexture, ScaleMode.StretchToFill, false, 0,
                    new Color(ThemeHeadingAccent.r, ThemeHeadingAccent.g, ThemeHeadingAccent.b, .65f), 0, 0);
        }

        private void GrimoireProgress(float amount, Color fill, bool experience)
        {
            Rect track = GUILayoutUtility.GetRect(1, 13, GUILayout.ExpandWidth(true));
            if (Event.current.type != EventType.Repaint) return;
            Texture2D trackArt = experience ? uiStyles.HeroXpTrack : uiStyles.HeroHealthTrack;
            Texture2D fillMask = experience ? uiStyles.HeroXpFill : uiStyles.HeroHealthFill;
            GUI.DrawTexture(track, trackArt ? trackArt : Texture2D.whiteTexture,
                ScaleMode.StretchToFill, true, 0,
                trackArt ? Color.white : new Color(.10f, .10f, .13f), 0, 6);
            float width = Mathf.Max(0, track.width - 4) * Mathf.Clamp01(amount);
            if (width > 0)
            {
                Rect portion = new Rect(track.x + 2, track.y + 2, width, Mathf.Max(1, track.height - 4));
                GUI.DrawTexture(portion, fillMask ? fillMask : Texture2D.whiteTexture,
                    ScaleMode.StretchToFill, true, 0, fill, 0, 4);
            }
        }

        private static int GrimoireCount(JToken token, int fallback)
        {
            if (token == null || token.Type == JTokenType.Null) return fallback;
            return CharacterSheetRules.TrySheetCount(token, out int n) ? n : fallback;
        }

        private void GrimoireHealth(JObject hero, ref bool changed)
        {
            GrimoireSection("ЗДОРОВЬЕ");
            GUILayout.BeginVertical(uiStyles.HeroPanel);
            int maximum = GrimoireCount(hero["hpMax"], Mathf.RoundToInt(archive.MaximumHp(selected)));
            int current = GrimoireCount(hero["hpCurrent"], Mathf.RoundToInt(archive.CurrentHp(selected)));
            int temporary = GrimoireCount(hero["hpTemp"], Mathf.RoundToInt(archive.TemporaryHp(selected)));
            GUILayout.BeginHorizontal();
            GUILayout.Label("♥ " + current + " / " + maximum + " HP", uiStyles.HeroValue, GUILayout.ExpandWidth(true));
            GUILayout.Label("Временные: " + temporary, uiStyles.HeroSubtitle, GUILayout.Width(Mathf.Min(142, UiWidth * .29f)));
            GUILayout.EndHorizontal();
            GrimoireProgress(maximum <= 0 ? 0 : (float)current / maximum, new Color(.70f, .37f, .37f), false);
            GUILayout.Space(7);
            GUILayout.BeginHorizontal();
            GUILayout.FlexibleSpace();
            if (MeasuredMenuButton("−1 HP", uiStyles.SecondaryButton, GUILayout.MinWidth(93), GUILayout.MinHeight(UiTheme.TouchHeight)))
            {
                SheetAction(() => CharacterSheetRules.ChangeHealth(hero, 1, false), ref changed);
                InvalidateHealthInputs(hero);
            }
            if (MeasuredMenuButton("+1 HP", uiStyles.SecondaryButton, GUILayout.MinWidth(93), GUILayout.MinHeight(UiTheme.TouchHeight)))
            {
                SheetAction(() => CharacterSheetRules.ChangeHealth(hero, 1, true), ref changed);
                InvalidateHealthInputs(hero);
            }
            GUILayout.EndHorizontal();
            GUILayout.EndVertical();
        }

        private void GrimoireMetric(string caption, string value)
        {
            GUILayout.BeginVertical(uiStyles.HeroMetric, GUILayout.ExpandWidth(true));
            GUILayout.Label(caption, uiStyles.HeroSmall, GUILayout.Height(30));
            GUILayout.Label(caption == "СКОРОСТЬ" ? value.Replace(" / ", "\n") : value,
                uiStyles.HeroValue, GUILayout.MinHeight(62));
            GUILayout.EndVertical();
        }

        private void GrimoireMetrics(JObject hero)
        {
            GrimoireSection("БОЕВЫЕ ПОКАЗАТЕЛИ");
            GUILayout.BeginHorizontal();
            GrimoireMetric("КЛАСС ЗАЩИТЫ", GrimoireCount(hero["ac"], 10).ToString(CultureInfo.InvariantCulture));
            GrimoireMetric("ИНИЦИАТИВА", Signed(CharacterSheetRules.Modifier(hero, "dex")));
            GrimoireMetric("СКОРОСТЬ", CharacterSpeedDisplay.Format(hero["speed"]?.ToString()));
            GUILayout.EndHorizontal();
        }

        private void GrimoireExperience(JObject hero)
        {
            GrimoireSection("ОПЫТ И УРОВЕНЬ");
            GUILayout.BeginVertical(uiStyles.HeroPanel);
            int level = Math.Max(1, CharacterSheetRules.Level(hero));
            long current = DisplayExperience(hero);
            GUILayout.BeginHorizontal();
            GUILayout.Label("Уровень " + level, uiStyles.HeroSubtitle);
            GUILayout.FlexibleSpace();
            if (level < GrimoireXpThresholds.Length)
                GUILayout.Label(current.ToString("N0", GrimoireCulture) + " / " +
                    GrimoireXpThresholds[level].ToString("N0", GrimoireCulture), uiStyles.HeroSubtitle);
            else GUILayout.Label(current.ToString("N0", GrimoireCulture) + " XP", uiStyles.HeroSubtitle);
            GUILayout.EndHorizontal();
            float progress = 1f;
            if (level < GrimoireXpThresholds.Length)
            {
                long floor = GrimoireXpThresholds[level - 1], next = GrimoireXpThresholds[level];
                progress = Mathf.Clamp01((float)(current - floor) / Math.Max(1L, next - floor));
            }
            GrimoireProgress(progress, ThemeHeadingAccent, true);
            GUILayout.EndVertical();
        }

        private void GrimoireConditions(JObject hero)
        {
            GrimoireSection("СОСТОЯНИЕ");
            GUILayout.BeginVertical(uiStyles.HeroPanel);
            var conditions = hero["activeConditions"] as JObject;
            string[] active = conditions == null ? Array.Empty<string>() :
                conditions.Properties()
                    .Where(p => p.Value.Type == JTokenType.Boolean && (bool)p.Value)
                    .Select(p => p.Name).ToArray();
            GUILayout.Label(active.Length == 0 ? "✓ Без негативных состояний" :
                string.Join(" · ", active), uiStyles.HeroSubtitle);
            GUILayout.EndVertical();
        }

        private void GrimoireQuickActions(JObject hero)
        {
            GrimoireSection("БЫСТРЫЕ ДЕЙСТВИЯ");
            int action = ClassicButtonRow("К дайсам", "К атакам", "Развитие");
            if (action == 0) requestedSheetTab = 5;
            else if (action == 1) requestedSheetTab = 2;
            else if (action == 2) BeginAdvancement(hero, true);
        }
    }
}
