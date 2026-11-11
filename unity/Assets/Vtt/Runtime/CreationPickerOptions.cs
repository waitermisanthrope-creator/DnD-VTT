using System;
using System.Collections.Generic;
using Newtonsoft.Json.Linq;

namespace DndVtt.UnityPrototype
{
    /// <summary>Cached index for selection lists without cloning the JSON catalog on every IMGUI event.</summary>
    public sealed class CreationPickerOptions
    {
        private JArray source;
        private string field;
        private string search;
        private int[] matches = Array.Empty<int>();
        public int Count => matches.Length;
        public int At(int index) => matches[index];
        public int Pages(int size) => size > 0 ? Math.Max(1, (Count + size - 1) / size) : throw new ArgumentOutOfRangeException(nameof(size));
        public static string Name(JToken token, string nameField)
        {
            if (token is JObject obj) return (string)(obj[nameField] ?? obj["nameRu"] ?? obj["name"] ?? obj["id"]) ?? "";
            return token?.ToString() ?? "";
        }
        // Returns false when the original data, field and query have not changed.
        public bool Update(JArray values, string nameField, string query)
        {
            query = (query ?? "").Trim();
            if (ReferenceEquals(values, source) && field == nameField && search == query) return false;
            source = values; field = nameField; search = query;
            var found = new List<int>();
            if (values != null)
                for (int i = 0; i < values.Count; i++)
                    if (Name(values[i], nameField).IndexOf(query, StringComparison.OrdinalIgnoreCase) >= 0)
                        found.Add(i);
            matches = found.ToArray();
            return true;
        }
    }
}
