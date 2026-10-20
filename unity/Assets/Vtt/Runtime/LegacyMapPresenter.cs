using System;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json.Linq;
using UnityEngine;

namespace DndVtt.UnityPrototype
{
    public sealed class LegacyMapPresenter : MonoBehaviour
    {
        public WorkshopRuntime Workshop { get; set; }
        public LegacyContentCatalog catalog;
        public ExplorerController explorer;
        public int mapIndex;
        [SerializeField] private GameObject geometry;
        private readonly List<GameObject> floors = new List<GameObject>();
        private LegacyMapDocument document;
        public int CurrentFloor { get; private set; }
        public string MapName => document?.Name ?? "";
        public int FloorCount => document?.FloorCount ?? 0;
        public int ImportedModels { get; private set; }
        public int MissingModels { get; private set; }
        public int TileCount { get; private set; }
        public int WallCount { get; private set; }
        public string Error { get; private set; }
        private Material fallback;
        private void Awake() { TryLoad(mapIndex); }
        private static float N(JObject o, string key, float fallback = 0) => LegacyJson.Number(o[key], fallback);
        private static void Dispose(GameObject go) { if (!go) return; go.SetActive(false); if (Application.isPlaying) Destroy(go); else DestroyImmediate(go); }
        private Material Surface(string key)
        {
            if (Workshop != null && Workshop.Surfaces.TryGetValue(key, out var external)) return external;
            var material = catalog.Surface(key); if (material) return material;
            if (!fallback) fallback = new Material(Shader.Find("Universal Render Pipeline/Lit")) { color = new Color(.5f, .4f, .3f) };
            return fallback;
        }
        private GameObject Box(Transform parent, string name, Vector3 position, Vector3 scale, string surface)
        {
            var go = GameObject.CreatePrimitive(PrimitiveType.Cube); go.name = name; go.transform.SetParent(parent, false); go.transform.localPosition = position; go.transform.localScale = scale;
            go.GetComponent<Renderer>().sharedMaterial = Surface(surface); return go;
        }
        private GameObject Model(string key) => Workshop != null && Workshop.Models.TryGetValue(key, out var downloaded) ? downloaded : catalog.Model(key);
        public bool TryLoad(int index) => LoadDocument(index, null);
        private bool LoadDocument(int index, JObject snapshot)
        {
            GameObject staging = null; var stagedFloors = new List<GameObject>();
            try
            {
                if (index < 0 || index >= catalog.maps.Length) throw new ArgumentOutOfRangeException(nameof(index));
                var next = new LegacyMapDocument(snapshot != null ? snapshot.ToString() : catalog.maps[index].json.text);
                staging = new GameObject("Imported map geometry"); staging.transform.SetParent(transform, false);
                int tiles = 0, walls = 0, models = 0, missing = 0, floorIndex = 0;
                foreach (JObject floor in next.Floors)
                {
                    var group = new GameObject("Floor " + floor["id"] + " / " + floor["name"]); group.transform.SetParent(staging.transform, false); group.transform.localPosition = Vector3.up * next.BaseHeight(floorIndex); stagedFloors.Add(group);
                    float height = N(floor, "height", 3);
                    foreach (var tile in ((JObject)floor["tiles"]).Properties())
                    {
                        var cell = LegacyMapDocument.Cell(tile.Name); Box(group.transform, "Tile " + tile.Name, new Vector3(cell.x + .5f, -.08f, cell.y + .5f), new Vector3(1, .16f, 1), tile.Value.ToString()); tiles++;
                    }
                    var segments = new HashSet<string>();
                    foreach (var wall in ((JObject)floor["walls"]).Properties())
                    {
                        var cell = LegacyMapDocument.Cell(wall.Name); var data = (JObject)wall.Value;
                        foreach (string side in new[] { "n", "e", "s", "w", "slash", "backslash" })
                        {
                            if (data[side]?.Type != JTokenType.Boolean || !(bool)data[side]) continue;
                            Vector3 a, b; float x = cell.x, z = cell.y;
                            switch (side)
                            {
                                case "n": a = new Vector3(x, 0, z); b = new Vector3(x + 1, 0, z); break;
                                case "s": a = new Vector3(x, 0, z + 1); b = new Vector3(x + 1, 0, z + 1); break;
                                case "e": a = new Vector3(x + 1, 0, z); b = new Vector3(x + 1, 0, z + 1); break;
                                case "w": a = new Vector3(x, 0, z); b = new Vector3(x, 0, z + 1); break;
                                case "slash": a = new Vector3(x, 0, z + 1); b = new Vector3(x + 1, 0, z); break;
                                default: a = new Vector3(x, 0, z); b = new Vector3(x + 1, 0, z + 1); break;
                            }
                            string first = a.x + "," + a.z, second = b.x + "," + b.z;
                            string id = string.CompareOrdinal(first, second) < 0 ? first + "|" + second : second + "|" + first;
                            if (!segments.Add(id)) continue;
                            string kind = (string)data[side + "Kind"] ?? "wall";
                            bool opening = (bool?)data[side + "Open"] == true && ((bool?)data[side + "Secret"] != true || (bool?)data[side + "Revealed"] == true);
                            if (opening) continue;
                            string texture = (string)data[side + "FrontTexture"] ?? (string)data[side + "Texture"] ?? "wall_stone_dark";
                            var go = Box(group.transform, "Wall " + id + " (" + kind + ")", (a + b) * .5f + Vector3.up * height / 2, new Vector3(Vector3.Distance(a, b), height, .12f), texture);
                            go.transform.localRotation = Quaternion.Euler(0, -Mathf.Atan2(b.z - a.z, b.x - a.x) * Mathf.Rad2Deg, 0); walls++;
                        }
                    }
                    int objectIndex = 0;
                    foreach (JObject obj in (JArray)floor["objects"])
                    {
                        string type = (string)obj["type"] ?? "box", name = (string)obj["name"] ?? type;
                        Vector3 position = new Vector3(N(obj, "x"), N(obj, "z"), N(obj, "y"));
                        Vector3 size = new Vector3(Mathf.Max(.05f, N(obj, "w", 1)), Mathf.Max(.05f, N(obj, "h", 1)), Mathf.Max(.05f, N(obj, "d", 1)));
                        string model = (string)obj["model"];
                        if (type == "light")
                        {
                            if (group.GetComponentsInChildren<Light>().Length < 24)
                            {
                                var lamp = new GameObject(name).AddComponent<Light>(); lamp.transform.SetParent(group.transform, false); lamp.transform.localPosition = position + new Vector3(.5f, Mathf.Max(.5f, size.y), .5f);
                                lamp.type = LightType.Point; lamp.range = N(obj, "lightRadius", N(obj, "radius", 4)); lamp.intensity = N(obj, "lightIntensity", N(obj, "intensity", 1)); lamp.color = new Color(1, .78f, .48f);
                            }
                        }
                        else if (type == "stairs" && (bool?)obj["walkable"] == true)
                        {
                            int steps = Mathf.Clamp((int)N(obj, "steps", 12), 2, 64);
                            for (int s = 0; s < steps; s++)
                            {
                                float h = size.y * (s + 1) / steps;
                                Box(group.transform, name + " step " + s, position + new Vector3(size.x / 2, h / 2, size.z * (s + .5f) / steps), new Vector3(size.x, h, size.z / steps), "floor_wood_light");
                            }
                        }
                        else if (!string.IsNullOrEmpty(model) && Model(model))
                        {
                            var anchor = new GameObject(name + " / " + ((string)obj["id"] ?? objectIndex.ToString())); anchor.transform.SetParent(group.transform, false);
                            var instance = Instantiate(Model(model), anchor.transform, false); instance.SetActive(true);
                            var renderers = instance.GetComponentsInChildren<Renderer>();
                            if (renderers.Length == 0) throw new FormatException("Imported model has no renderers: " + model);
                            Bounds bounds = renderers[0].bounds; foreach (var renderer in renderers) bounds.Encapsulate(renderer.bounds);
                            float fit = Mathf.Max(bounds.size.x, bounds.size.y, bounds.size.z); fit = fit > 2.5f ? 2.5f / fit : 1;
                            float scale = N(obj, "scale", 1);
                            var scaling = new Vector3(N(obj, "scaleX", scale), N(obj, "scaleY", scale), N(obj, "scaleZ", scale)) * fit;
                            instance.transform.localPosition = -Vector3.Scale(new Vector3(bounds.center.x, bounds.min.y, bounds.center.z) - anchor.transform.position, scaling);
                            instance.transform.localScale = Vector3.Scale(instance.transform.localScale, scaling);
                            var collider = anchor.AddComponent<BoxCollider>(); collider.center = Vector3.up * bounds.size.y * scaling.y / 2; var colliderSize = Vector3.Scale(bounds.size, scaling); collider.size = new Vector3(Mathf.Abs(colliderSize.x), Mathf.Abs(colliderSize.y), Mathf.Abs(colliderSize.z));
                            anchor.transform.localPosition = position + new Vector3(.5f, 0, .5f); anchor.transform.localRotation = Quaternion.Euler(0, N(obj, "rotation"), 0); models++;
                        }
                        else
                        {
                            var proxy = Box(group.transform, name + (model != null ? " [model pending]" : ""), position + size / 2, size, "floor_wood_dark"); proxy.transform.localRotation = Quaternion.Euler(0, N(obj, "rotation"), 0);
                            if (model != null) missing++;
                        }
                        objectIndex++;
                    }
                    floorIndex++;
                }
                if (geometry) geometry.SetActive(false);
                var previousDocument = document; document = next;
                var previousFloors = floors.ToArray(); floors.Clear(); floors.AddRange(stagedFloors);
                try { SetFloor(0); }
                catch { document = previousDocument; floors.Clear(); floors.AddRange(previousFloors); if (geometry) geometry.SetActive(true); throw; }
                Dispose(geometry); geometry = staging; staging = null; mapIndex = index;
                TileCount = tiles; WallCount = walls; ImportedModels = models; MissingModels = missing; Error = ""; return true;
            }
            catch (Exception error) { Dispose(staging); Error = error.Message; Debug.LogWarning("Map import rejected: " + error.Message); return false; }
        }
        public string WorkshopMapStoreOverride { get; set; }
        private string WorkshopMapPath => WorkshopMapStoreOverride ?? System.IO.Path.Combine(Application.persistentDataPath, "workshop-map-v1.json");
        public void ClearWorkshopGeometry() { Dispose(geometry); geometry = null; }
        public bool ReloadCurrent() => document == null ? TryLoad(mapIndex) : LoadDocument(mapIndex, document.Snapshot);
        public void RestoreWorkshopMap()
        {
            if (!System.IO.File.Exists(WorkshopMapPath)) { ReloadCurrent(); return; }
            try { var saved = WorkshopStore.Parse(System.IO.File.ReadAllText(WorkshopMapPath)); if (!LoadDocument((int)saved["mapIndex"], (JObject)saved["map"])) throw new FormatException(Error); }
            catch (Exception e) { Error = "Карта оставлена без изменений: " + e.Message; }
        }
        public void SaveWorkshopMap()
        {
            if (document == null) throw new InvalidOperationException("Нет карты");
            WorkshopStore.AtomicText(WorkshopMapPath, new JObject { ["mapIndex"] = mapIndex, ["map"] = document.Snapshot }.ToString());
        }
        public void PlaceWorkshopObject(string id)
        {
            if (Workshop == null || !Workshop.Models.ContainsKey(id) || document == null) throw new FormatException("Модель недоступна");
            var next = document.Snapshot; var floor = (JObject)((JArray)next["floors"])[CurrentFloor];
            Vector3 position = explorer.transform.position;
            ((JArray)floor["objects"]).Add(new JObject { ["id"] = Guid.NewGuid().ToString(), ["type"] = "model", ["name"] = id, ["model"] = id, ["x"] = Mathf.Floor(position.x) + 2, ["y"] = Mathf.Floor(position.z), ["z"] = 0, ["w"] = 1, ["h"] = 1, ["d"] = 1 });
            if (!LoadDocument(mapIndex, next)) throw new FormatException(Error);
            SaveWorkshopMap();
        }
        public void ApplyWorkshopSurface(string id)
        {
            if (Workshop == null || !Workshop.Surfaces.ContainsKey(id) || document == null) throw new FormatException("Материал недоступен");
            var next = document.Snapshot; var floor = (JObject)((JArray)next["floors"])[CurrentFloor];
            foreach (var tile in ((JObject)floor["tiles"]).Properties()) tile.Value = id;
            if (!LoadDocument(mapIndex, next)) throw new FormatException(Error);
            SaveWorkshopMap();
        }
        public void SetFloor(int index)
        {
            if (document == null || index < 0 || index >= FloorCount) throw new ArgumentOutOfRangeException(nameof(index));
            for (int i = 0; i < floors.Count; i++) floors[i].SetActive(i <= index);
            Physics.SyncTransforms();
            var tiles = (JObject)document.Floors[index]["tiles"];
            foreach (var cell in tiles.Properties().Select(t => LegacyMapDocument.Cell(t.Name)).OrderBy(c => c.y).ThenBy(c => c.x))
            {
                Vector3 spawn = new Vector3(cell.x + .5f, document.BaseHeight(index) + .15f, cell.y + .5f);
                if (Physics.CheckCapsule(spawn + Vector3.up * .31f, spawn + Vector3.up * 1.49f, .29f, 1, QueryTriggerInteraction.Ignore)) continue;
                explorer.spawnPosition = spawn; explorer.ResetPosition(); explorer.UpdateCamera(); CurrentFloor = index; return;
            }
            throw new InvalidOperationException("No collision-free entry on floor " + index);
        }
        private void OnDestroy() { if (fallback) { if (Application.isPlaying) Destroy(fallback); else DestroyImmediate(fallback); } }
    }
}
