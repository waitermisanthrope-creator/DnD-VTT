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
        private GUIStyle grimoireHpButton, grimoirePrimaryButton, grimoireDetailCard;
        private GUIStyle grimoirePortraitFrameStyle, grimoireHealthTrackStyle,
            grimoireHealthFillStyle, grimoireXpTrackStyle, grimoireXpFillStyle;
        private Texture2D grimoirePortraitFrame, grimoireShieldIcon, grimoireHpIcon, grimoireXpIcon, grimoireConditionIcon;
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
            Texture2D secondaryPanel = Resources.Load<Texture2D>("UI/Grimoire/panels/panel_secondary_9s");
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
            grimoireDetailCard = new GUIStyle(uiStyles.HeroPanel)
            {
                padding = new RectOffset(12, 12, 12, 12),
                margin = new RectOffset(0, 0, 0, 9)
            };
            if (secondaryPanel)
            {
                grimoireDetailCard.normal.background = secondaryPanel;
                grimoireDetailCard.border = new RectOffset(16, 16, 16, 16);
            }
            // Skin the Hero quick HP controls with the imported nine-slice artwork.
            // Keep this local to Hero: other sheets (especially the wallet) retain
            // their existing button styles and behavior.
            Texture2D buttonNormal = Resources.Load<Texture2D>("UI/Grimoire/buttons/button_secondary_normal_9s");
            if (buttonNormal)
            {
                GUIStyle heroButton = new GUIStyle(uiStyles.SecondaryButton);
                heroButton.border = new RectOffset(16, 16, 16, 16);
                heroButton.normal.background = buttonNormal;
                Texture2D buttonHover = Resources.Load<Texture2D>("UI/Grimoire/buttons/button_secondary_hover_9s");
                Texture2D buttonPressed = Resources.Load<Texture2D>("UI/Grimoire/buttons/button_secondary_pressed_9s");
                heroButton.hover.background = buttonHover ? buttonHover : buttonNormal;
                heroButton.active.background = buttonPressed ? buttonPressed : buttonNormal;
                heroButton.focused.background = buttonNormal;
                heroButton.onNormal.background = buttonNormal;
                heroButton.onHover.background = heroButton.hover.background;
                heroButton.onActive.background = heroButton.active.background;
                heroButton.onFocused.background = buttonNormal;
                grimoireHpButton = heroButton;
            }
            else grimoireHpButton = uiStyles.SecondaryButton;
            Texture2D primaryNormal = Resources.Load<Texture2D>("UI/Grimoire/buttons/button_primary_normal_9s");
            if (primaryNormal)
            {
                grimoirePrimaryButton = new GUIStyle(uiStyles.PrimaryButton);
                grimoirePrimaryButton.border = new RectOffset(16, 16, 16, 16);
                grimoirePrimaryButton.normal.background = primaryNormal;
                Texture2D primaryHover = Resources.Load<Texture2D>("UI/Grimoire/buttons/button_primary_hover_9s");
                Texture2D primaryPressed = Resources.Load<Texture2D>("UI/Grimoire/buttons/button_primary_pressed_9s");
                grimoirePrimaryButton.hover.background = primaryHover ? primaryHover : primaryNormal;
                grimoirePrimaryButton.active.background = primaryPressed ? primaryPressed : primaryNormal;
                grimoirePrimaryButton.focused.background = primaryNormal;
                grimoirePrimaryButton.onNormal.background = primaryNormal;
                grimoirePrimaryButton.onHover.background = grimoirePrimaryButton.hover.background;
                grimoirePrimaryButton.onActive.background = grimoirePrimaryButton.active.background;
                grimoirePrimaryButton.onFocused.background = primaryNormal;
            }
            else grimoirePrimaryButton = uiStyles.PrimaryButton;
            grimoirePortraitFrame = Resources.Load<Texture2D>("UI/Grimoire/frames/frame_hero_mask_9s");
            grimoireShieldIcon = Resources.Load<Texture2D>("UI/Grimoire/icons/icon_shield_96");
            grimoireHpIcon = Resources.Load<Texture2D>("UI/Grimoire/icons/icon_hp_96");
            grimoireXpIcon = Resources.Load<Texture2D>("UI/Grimoire/icons/icon_xp_96");
            grimoireConditionIcon = Resources.Load<Texture2D>("UI/Grimoire/icons/icon_conditions_96");
            uiStyles.HeroIcon = Resources.Load<Texture2D>("UI/Grimoire/icons/icon_hero_96");
            uiStyles.HeroHealthTrack = Resources.Load<Texture2D>("UI/Grimoire/bars/bar_health_track_9s");
            uiStyles.HeroHealthFill = Resources.Load<Texture2D>("UI/Grimoire/bars/bar_health_fill_mask_9s");
            uiStyles.HeroXpTrack = Resources.Load<Texture2D>("UI/Grimoire/bars/bar_experience_track_9s");
            uiStyles.HeroXpFill = Resources.Load<Texture2D>("UI/Grimoire/bars/bar_experience_fill_mask_9s");
            grimoirePortraitFrameStyle = GrimoireNineSlice(grimoirePortraitFrame, 12, 12);
            grimoireHealthTrackStyle = GrimoireNineSlice(uiStyles.HeroHealthTrack, 6, 5);
            grimoireHealthFillStyle = GrimoireNineSlice(uiStyles.HeroHealthFill, 6, 5);
            grimoireXpTrackStyle = GrimoireNineSlice(uiStyles.HeroXpTrack, 6, 5);
            grimoireXpFillStyle = GrimoireNineSlice(uiStyles.HeroXpFill, 6, 5);
        }

        // GUIStyle backgrounds are nine-sliced; GUI.DrawTexture stretches the ornate
        // corners and makes progress bars look like blurred strips.
        private static GUIStyle GrimoireNineSlice(Texture2D texture, int horizontal, int vertical)
        {
            if (!texture) return null;
            return new GUIStyle(GUIStyle.none)
            {
                normal = { background = texture },
                border = new RectOffset(horizontal, horizontal, vertical, vertical)
            };
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

            if (GrimoireDetailsFold(hero, ref changed))
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
            if (grimoirePortraitFrameStyle != null && Event.current.type == EventType.Repaint)
            {
                Color original = GUI.color;
                GUI.color = ThemeHeadingAccent;
                grimoirePortraitFrameStyle.Draw(photo, false, false, false, false);
                GUI.color = original;
            }
            // Reuse the existing art viewer/import flow rather than a new portrait system.
            if (GUI.Button(photo, GUIContent.none, GUIStyle.none))
                requestedPortraitVisibility = true;
            GUILayout.Space(10);
            GUILayout.BeginVertical(GUILayout.ExpandWidth(true));
            string heroName = (string)hero["name"];
            GUILayout.Label(string.IsNullOrWhiteSpace(heroName) ? "Безымянный герой" : heroName,
                uiStyles.HeroName);
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
            GUILayout.EndVertical();
        }

        private void GrimoireIconHeading(string title, Texture2D icon)
        {
            GUILayout.Space(4);
            GUILayout.BeginHorizontal();
            if (icon)
            {
                Rect iconRect = GUILayoutUtility.GetRect(23, 23, GUILayout.Width(23), GUILayout.Height(23));
                if (Event.current.type == EventType.Repaint)
                    GUI.DrawTexture(iconRect, icon, ScaleMode.ScaleToFit, true, 0,
                        ThemeHeadingAccent, 0, 0);
            }
            GUILayout.Label(title, uiStyles.HeroSection, GUILayout.ExpandWidth(true));
            GUILayout.EndHorizontal();
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
            Rect track = GUILayoutUtility.GetRect(1, 16, GUILayout.ExpandWidth(true));
            if (Event.current.type != EventType.Repaint) return;
            GUIStyle trackStyle = experience ? grimoireXpTrackStyle : grimoireHealthTrackStyle;
            GUIStyle fillStyle = experience ? grimoireXpFillStyle : grimoireHealthFillStyle;
            Color previous = GUI.color;
            if (trackStyle != null)
            {
                GUI.color = Color.white;
                trackStyle.Draw(track, false, false, false, false);
            }
            else
                GUI.DrawTexture(track, Texture2D.whiteTexture, ScaleMode.StretchToFill,
                    true, 0, new Color(.10f, .10f, .13f), 0, 6);
            float fraction = Mathf.Clamp01(amount);
            float width = Mathf.Max(0f, track.width - 4f) * fraction;
            if (width >= 1f)
            {
                Rect portion = new Rect(track.x + 2, track.y + 2, width,
                    Mathf.Max(1, track.height - 4));
                if (fillStyle != null && width >= 12f)
                {
                    GUI.color = fill;
                    fillStyle.Draw(portion, false, false, false, false);
                }
                else
                {
                    GUI.color = Color.white;
                    GUI.DrawTexture(portion, Texture2D.whiteTexture, ScaleMode.StretchToFill,
                        true, 0, fill, 0, 4);
                }
            }
            GUI.color = previous;
        }

        private static int GrimoireCount(JToken token, int fallback)
        {
            if (token == null || token.Type == JTokenType.Null) return fallback;
            return CharacterSheetRules.TrySheetCount(token, out int n) ? n : fallback;
        }

        private void GrimoireHealth(JObject hero, ref bool changed)
        {
            GrimoireIconHeading("ЗДОРОВЬЕ", grimoireHpIcon);
            GUILayout.BeginVertical(uiStyles.HeroPanel);
            int maximum = GrimoireCount(hero["hpMax"], Mathf.RoundToInt(archive.MaximumHp(selected)));
            int current = GrimoireCount(hero["hpCurrent"], Mathf.RoundToInt(archive.CurrentHp(selected)));
            int temporary = GrimoireCount(hero["hpTemp"], Mathf.RoundToInt(archive.TemporaryHp(selected)));
            GUILayout.BeginHorizontal();
            GUILayout.Label("♥ " + current + " / " + maximum + " HP", uiStyles.HeroValue, GUILayout.ExpandWidth(true));
            if (temporary > 0)
                GUILayout.Label("+" + temporary + " врем.", uiStyles.HeroSubtitle,
                    GUILayout.MinWidth(72));
            GUILayout.EndHorizontal();
            GrimoireProgress(maximum <= 0 ? 0 : (float)current / maximum, new Color(.70f, .37f, .37f), false);
            GUILayout.Space(7);
            GUILayout.BeginHorizontal();
            if (MeasuredMenuButton("−1 HP", grimoireHpButton, GUILayout.ExpandWidth(true), GUILayout.MinHeight(UiTheme.TouchHeight)))
            {
                SheetAction(() => CharacterSheetRules.ChangeHealth(hero, 1, false), ref changed);
                InvalidateHealthInputs(hero);
            }
            if (MeasuredMenuButton("+1 HP", grimoireHpButton, GUILayout.ExpandWidth(true), GUILayout.MinHeight(UiTheme.TouchHeight)))
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
            GUILayout.Label(caption, uiStyles.HeroSmall, GUILayout.MinHeight(24));
            GUILayout.Label(caption == "СКОРОСТЬ" ? value.Replace(" / ", "\n") : value,
                uiStyles.HeroValue, GUILayout.MinHeight(42));
            GUILayout.EndVertical();
        }

        private void GrimoireMetrics(JObject hero)
        {
            GrimoireIconHeading("БОЕВЫЕ ПОКАЗАТЕЛИ", grimoireShieldIcon);
            GUILayout.BeginHorizontal();
            GrimoireMetric("КД", GrimoireCount(hero["ac"], 10).ToString(CultureInfo.InvariantCulture));
            GrimoireMetric("ИНИЦ.", Signed(CharacterSheetRules.Modifier(hero, "dex")));
            GrimoireMetric("СКОРОСТЬ", CharacterSpeedDisplay.Format(hero["speed"]?.ToString()));
            GUILayout.EndHorizontal();
        }

        private void GrimoireExperience(JObject hero)
        {
            GrimoireIconHeading("ОПЫТ И УРОВЕНЬ", grimoireXpIcon);
            GUILayout.BeginVertical(uiStyles.HeroPanel);
            int level = Math.Max(1, CharacterSheetRules.Level(hero));
            long current = DisplayExperience(hero);
            GUILayout.BeginHorizontal();
            GUILayout.Label("Уровень " + level, uiStyles.HeroSubtitle, GUILayout.ExpandWidth(true));
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
            GrimoireIconHeading("СОСТОЯНИЕ", grimoireConditionIcon);
            GUILayout.BeginVertical(uiStyles.HeroPanel);
            var conditions = hero["activeConditions"] as JObject;
            string[] active = conditions == null ? Array.Empty<string>() :
                conditions.Properties()
                    .Where(p => p.Value.Type == JTokenType.Boolean && (bool)p.Value)
                    .Select(p => p.Name).ToArray();
            GUILayout.Label(active.Length == 0 ? "✓ Нет активных состояний" :
                string.Join(" · ", active), uiStyles.HeroSubtitle);
            GUILayout.EndVertical();
        }

        private void GrimoireQuickActions(JObject hero)
        {
            GrimoireSection("БЫСТРЫЕ ДЕЙСТВИЯ");
            // Narrow phones use two rows to keep touch targets legible.
            bool narrow = UiWidth < 470;
            GUILayout.BeginHorizontal();
            if (MeasuredMenuButton("⚄ Дайсы", grimoireHpButton,
                GUILayout.ExpandWidth(true), GUILayout.MinHeight(UiTheme.TouchHeight)))
                requestedSheetTab = 5;
            if (MeasuredMenuButton("⚔ Атаки", grimoireHpButton,
                GUILayout.ExpandWidth(true), GUILayout.MinHeight(UiTheme.TouchHeight)))
                requestedSheetTab = 2;
            if (narrow) GUILayout.EndHorizontal();
            if (narrow) GUILayout.BeginHorizontal();
            if (MeasuredMenuButton("✦ Развитие", grimoirePrimaryButton,
                GUILayout.ExpandWidth(true), GUILayout.MinHeight(UiTheme.TouchHeight)))
                BeginAdvancement(hero, true);
            GUILayout.EndHorizontal();
        }
    }
}
