using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace DndVtt.UnityPrototype
{
    // Read-only UI snapshot. Package verification stays in WorkshopStore;
    // only the resulting catalog and its search index cross to the GUI thread.
    public sealed class InventoryCatalogCache
    {
        public sealed class Snapshot
        {
            private sealed class Entry { public JObject Item; public string Text; }
            private readonly Dictionary<string, List<Entry>> categories = new Dictionary<string, List<Entry>>();
            private string lastCategory, lastQuery;
            private JObject[] matches = Array.Empty<JObject>();
            public JObject Catalog { get; }
            public Dictionary<string,JObject> MarketDefinitions { get; }
            public Snapshot(JObject catalog)
            {
                Catalog = catalog ?? throw new ArgumentNullException(nameof(catalog));
                MarketDefinitions=CommerceRules.IndexMarketDefinitions(catalog["items"] as JArray??new JArray());
                foreach (var token in catalog["items"] as JArray ?? new JArray())
                {
                    if (!(token is JObject item) || !(item["inventoryCategory"] is JValue category)) continue;
                    string key = category.ToString();
                    if (!categories.TryGetValue(key, out var list)) categories[key] = list = new List<Entry>();
                    list.Add(new Entry { Item = item, Text = (item["name"]?.ToString() ?? "") + " " + (item["description"]?.ToString() ?? "") });
                }
            }
            public JObject[] Find(string category, string query)
            {
                category = category ?? ""; query = query ?? "";
                if (category == lastCategory && query == lastQuery) return matches;
                var result = new List<JObject>(25);
                if (categories.TryGetValue(category, out var entries))
                    foreach (var entry in entries)
                        if (entry.Text.IndexOf(query, StringComparison.OrdinalIgnoreCase) >= 0)
                        { result.Add(entry.Item); if (result.Count == 25) break; }
                lastCategory = category; lastQuery = query;
                return matches = result.ToArray();
            }
        }
        private sealed class Loaded { public int Revision; public Snapshot View; public string Error; }
        private Task<Loaded> loading;
        private int revision;
        public Snapshot Current { get; private set; }
        public string Error { get; private set; }
        public bool IsLoading => loading != null;
        public void Request(Func<JObject> read)
        {
            Poll();
            if (Current != null || Error != null || loading != null) return;
            int requestedRevision = revision;
            loading = Task.Run(() =>
            {
                try { return new Loaded { Revision = requestedRevision, View = new Snapshot(read()) }; }
                catch (Exception error) { return new Loaded { Revision = requestedRevision, Error = error.Message }; }
            });
        }
        public void Poll()
        {
            if (loading == null || !loading.IsCompleted) return;
            var result = loading.Result; loading = null;
            if (result.Revision != revision) return;
            Current = result.View; Error = result.Error;
        }
        public void Invalidate() { revision++; Current = null; Error = null; }
    }
}
