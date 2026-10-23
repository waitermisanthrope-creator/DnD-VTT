using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Newtonsoft.Json.Linq;
namespace DndVtt.UnityPrototype
{
    // Server snapshots are separate from catalog metadata; no local votes or client-written totals.
    public sealed class WorkshopCommunity
    {
        private readonly Dictionary<string,JObject> entries=new Dictionary<string,JObject>(StringComparer.Ordinal);
        public bool Ready { get; private set; }
        public void Clear() { entries.Clear();Ready=false; }
        public void Invalidate() { Ready=false; }
        public bool Known(string id)=>Ready&&entries.ContainsKey(id);
        public bool Hearted(string id)=>Known(id)&&(bool)entries[id]["hearted"];
        public long Rating(string id)=>Known(id)?(long)entries[id]["rating"]:0;
        public void Replace(JArray items)
        {
            var next=new Dictionary<string,JObject>(StringComparer.Ordinal);
            foreach(JObject item in items) { Validate(item);next.Add((string)item["id"],(JObject)item.DeepClone()); }
            entries.Clear();foreach(var pair in next)entries.Add(pair.Key,pair.Value);Ready=true;
        }
        public void Apply(JObject item) { Validate(item);entries[(string)item["id"]]=(JObject)item.DeepClone(); }
        private static void Validate(JObject item)
        {
            if(string.IsNullOrEmpty((string)item["id"])||item["rating"]?.Type!=JTokenType.Integer||(long)item["rating"]<0||item["hearted"]?.Type!=JTokenType.Boolean||((bool)item["hearted"]&&(long)item["rating"]<1))throw new FormatException("Invalid workshop rating");
        }
        public static DateTimeOffset Updated(JObject item)
        {
            foreach(string key in new[]{"updatedAt","publishedAt"})
                if(DateTimeOffset.TryParse((string)item[key],CultureInfo.InvariantCulture,DateTimeStyles.AssumeUniversal,out var date))return date;
            return DateTimeOffset.MinValue;
        }
        public IEnumerable<JObject> Order(IEnumerable<JObject> items,bool byRating)
        {
            // LINQ preserves original catalog order for undated legacy entries and exact ties.
            return byRating?items.OrderByDescending(m=>Rating((string)m["id"])).ThenByDescending(Updated):items.OrderByDescending(Updated);
        }
    }
}
