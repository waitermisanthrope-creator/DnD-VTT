using System;
using System.IO;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using UnityEngine;

namespace DndVtt.UnityPrototype
{
    // Keep the original JSON tree: fields not rendered by this milestone must survive a save.
    public sealed class AppearanceDocument
    {
        public JObject Root { get; }
        public JObject Appearance { get; }
        public JObject Body => (JObject)Appearance["body"];
        public bool Female => (string)Appearance["gender"] == "female";

        public AppearanceDocument(string json)
        {
            Root = JObject.Parse(json);
            Appearance = Root["appearance3d"] as JObject ?? Root;
            if ((int?)Appearance["schemaVersion"] != 2)
                throw new FormatException("Ожидается appearance3d со schemaVersion: 2.");
            string race = (string)Appearance["raceId"];
            if (race != "human" && race != "human_variant")
                throw new FormatException("Этот этап показывает только человека. Другие расы ещё не перенесены.");
            string gender = (string)Appearance["gender"];
            if (gender != "male" && gender != "female")
                throw new FormatException("Для предпросмотра нужен gender: male или female.");
            if (!(Appearance["body"] is JObject))
                throw new FormatException("В appearance3d отсутствует объект body.");
            foreach (var property in Body.Properties())
            {
                if (property.Value.Type != JTokenType.Integer && property.Value.Type != JTokenType.Float)
                    throw new FormatException("Параметры body должны быть числами.");
                double value = (double)property.Value;
                if (double.IsNaN(value) || double.IsInfinity(value) || value < -1 || value > 1)
                    throw new FormatException("Параметры body должны быть в диапазоне -1…1.");
            }
        }

        public static AppearanceDocument Create(bool female)
        {
            var asset = Resources.Load<TextAsset>("CharacterStudio/Default" + (female ? "Female" : "Male"));
            if (!asset) throw new FileNotFoundException("Не найден исходный пресет человека.");
            return new AppearanceDocument(asset.text);
        }

        public float Get(string axis) => (float?)Body[axis] ?? 0;
        public void Set(string axis, float value) => Body[axis] = Mathf.Clamp(value, -1, 1);
        public void SetGender(bool female)
        {
            Appearance["gender"] = female ? "female" : "male";
            string skin = (string)Appearance["skinId"];
            if (string.IsNullOrEmpty(skin) || skin == "human_young_male" || skin == "human_young_female")
                Appearance["skinId"] = female ? "human_young_female" : "human_young_male";
        }
        public string Serialize() => Root.ToString(Formatting.Indented);
    }
}
