using Newtonsoft.Json.Linq;
using UnityEngine;

namespace DndVtt.UnityPrototype
{
    public sealed partial class LegacySessionPanel
    {
        private void DrawAbilityTurnPanel(JObject hero, ref bool changed)
        {
            if (hero == null) return;
            // Initial registration is persisted by the same sheet change pipeline.
            if (!(hero[CharacterResourceEngine.DefinitionsKey] is JArray) ||
                !(hero[CharacterResourceEngine.StateKey] is JObject))
            {
                SheetAction(() => CharacterResourceEngine.EnsureTurnResources(hero), ref changed);
            }
            else
            {
                // Add missing standard resources to imported/older sheets.
                var definitions = (JArray)hero[CharacterResourceEngine.DefinitionsKey];
                bool missing = false;
                foreach (string id in new[] { "turn.action", "turn.bonus", "turn.reaction" })
                {
                    bool found = false;
                    foreach (var token in definitions)
                        if ((string)(token as JObject)?["id"] == id) { found = true; break; }
                    if (!found) missing = true;
                }
                if (missing) SheetAction(() => CharacterResourceEngine.EnsureTurnResources(hero), ref changed);
            }

            var state = hero[CharacterResourceEngine.StateKey] as JObject;
            var definitionsNow = hero[CharacterResourceEngine.DefinitionsKey] as JArray;
            GUILayout.BeginVertical(uiStyles.AbilityPanel);
            GUILayout.Label("Ресурсы хода", uiStyles.AbilityGold);
            if (state != null && definitionsNow != null)
            {
                foreach (var token in definitionsNow)
                {
                    var definition = token as JObject;
                    string id = (string)definition?["id"];
                    if (string.IsNullOrEmpty(id) || !id.StartsWith("turn.", System.StringComparison.Ordinal) || !(state[id] is JObject value)) continue;
                    GUILayout.BeginHorizontal();
                    GUILayout.Label(((string)definition["name"] ?? id) + ": " +
                        ((int?)value["current"] ?? 0) + "/" + ((int?)definition["max"] ?? 0));
                    int spend = id == "turn.movement" ? 5 : 1;
                    bool wasEnabled = GUI.enabled;
                    GUI.enabled = wasEnabled && ((int?)value["current"] ?? 0) >= spend;
                    if (MeasuredMenuButton(id == "turn.movement" ? "−5 фт" : "Использовать",
                        uiStyles.AbilityChip, GUILayout.Width(110), GUILayout.Height(35)))
                    {
                        string resourceId = id;
                        SheetAction(() => {
                            if (!CharacterResourceEngine.TrySpend(hero,
                                new System.Collections.Generic.Dictionary<string, int> { [resourceId] = spend }))
                                throw new System.FormatException("Недостаточно ресурса");
                        }, ref changed);
                    }
                    GUI.enabled = wasEnabled;
                    GUILayout.EndHorizontal();
                }
            }
            if (MeasuredMenuButton("Завершить ход", uiStyles.AbilityGold,
                GUILayout.ExpandWidth(true), GUILayout.Height(42)))
                SheetAction(() => CharacterResourceEngine.EndTurn(hero), ref changed);
            GUILayout.EndVertical();
            GUILayout.Space(6);
        }
    }
}
