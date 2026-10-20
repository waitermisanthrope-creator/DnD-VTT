using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Newtonsoft.Json.Linq;
using UnityEngine;
using UnityEngine.Networking;

namespace DndVtt.UnityPrototype
{
    // Streaming to disk prevents a malicious Content-Length from allocating RAM.
    public sealed class WorkshopDownload : DownloadHandlerScript
    {
        private readonly FileStream file;
        private readonly long limit;
        public long Received { get; private set; }
        public string Failure { get; private set; }
        public WorkshopDownload(string path, long max) : base(new byte[64 * 1024]) { limit = max; file = new FileStream(path, FileMode.Create, FileAccess.Write, FileShare.None); }
        protected override bool ReceiveData(byte[] data, int length)
        {
            if (Received + length > limit) { Failure = "Превышен лимит загрузки"; return false; }
            try { file.Write(data, 0, length); Received += length; return true; }
            catch (Exception e) { Failure = "Недостаточно места или ошибка записи: " + e.Message; return false; }
        }
        public void Close() { try { file.Flush(); } catch (Exception e) { Failure = e.Message; } finally { file.Dispose(); } }
    }

    public sealed class WorkshopRuntime : IDisposable
    {
        private readonly WorkshopStore store;
        public readonly Dictionary<string, GameObject> Models = new Dictionary<string, GameObject>();
        public readonly Dictionary<string, Material> Surfaces = new Dictionary<string, Material>();
        private readonly List<GameObject> owned = new List<GameObject>();
        private readonly HashSet<string> loaded = new HashSet<string>();
        private readonly List<AssetBundle> bundles = new List<AssetBundle>();
        public string Error { get; private set; } = "";
        public static string Platform => Application.platform == RuntimePlatform.Android ? "android-arm64" : Application.platform == RuntimePlatform.WindowsPlayer || Application.platform == RuntimePlatform.WindowsEditor ? "windows-x64" : "unsupported";
        public WorkshopRuntime(WorkshopStore s) { store = s; }
        public JObject Creation(JObject baseline) => store.Creation(baseline);
        public void ActivateData()
        {
            foreach (JObject m in store.Installed())
            {
                if ((string)m["format"] != "json") continue;
                try
                {
                    WorkshopStore.Compatible(m, Platform, Application.unityVersion);
                    var d = store.Data(m);
                    foreach (JObject entry in (JArray)d["objects"] ?? new JArray())
                    {
                        string id = (string)entry["id"]; if (Models.ContainsKey(id)) continue;
                        var go = GameObject.CreatePrimitive((PrimitiveType)Enum.Parse(typeof(PrimitiveType), (string)entry["primitive"]));
                        go.name = id; go.SetActive(false); UnityEngine.Object.DontDestroyOnLoad(go);
                        var scale = (JArray)entry["scale"]; go.transform.localScale = new Vector3((float)scale[0], (float)scale[1], (float)scale[2]);
                        var mat = new Material(Shader.Find("Universal Render Pipeline/Lit")); ColorUtility.TryParseHtmlString((string)entry["color"], out Color color); mat.color = color;
                        go.GetComponent<Renderer>().sharedMaterial = mat; owned.Add(go); Models.Add(id, go); Surfaces.Add(id + ".material", mat);
                    }
                    foreach (JObject entry in (JArray)d["surfaces"] ?? new JArray())
                    {
                        string id = (string)entry["id"]; if (Surfaces.ContainsKey(id)) continue;
                        var mat = new Material(Shader.Find("Universal Render Pipeline/Lit")); ColorUtility.TryParseHtmlString((string)entry["color"], out Color color); mat.color = color; Surfaces.Add(id, mat);
                    }
                }
                catch (Exception e) { Error = e.Message; }
            }
        }
        // Called on demand when opening the object library. Files are verified again
        // after restart. Bundles come only from a curated trusted Editor build.
        public IEnumerator LoadBundles()
        {
            foreach (JObject m in store.Installed())
            {
                if ((string)m["format"] != "assetbundle" || loaded.Contains((string)m["id"])) continue;
                string path = null;
                try { WorkshopStore.Compatible(m, Platform, Application.unityVersion); path = store.PayloadPath(m); WorkshopStore.Verify(m, path); }
                catch (Exception e) { Error = e.Message; }
                if (path == null) continue;
                if (SystemInfo.systemMemorySize > 0 && SystemInfo.systemMemorySize < 512) { Error = "Недостаточно памяти"; continue; }
                var request = AssetBundle.LoadFromFileAsync(path); yield return request;
                var bundle = request.assetBundle;
                if (!bundle) { Error = "AssetBundle не удалось открыть"; continue; }
                var all = bundle.LoadAllAssetsAsync<GameObject>(); yield return all;
                bool valid = all.allAssets.Length > 0;
                foreach (var asset in all.allAssets)
                    if (!(asset is GameObject go) || go.GetComponentsInChildren<MonoBehaviour>(true).Length != 0 || go.GetComponentsInChildren<Renderer>(true).Length == 0) valid = false;
                if (!valid) { bundle.Unload(true); Error = "Bundle отклонён: недопустимый prefab"; continue; }
                bundles.Add(bundle); loaded.Add((string)m["id"]);
                foreach (GameObject go in all.allAssets) Models[(string)m["id"] + "." + go.name.ToLowerInvariant()] = go;
            }
        }
        public void ReleaseBundleCache()
        {
            foreach (string id in loaded)
                foreach (string key in Models.Keys.Where(k => k.StartsWith(id + ".", StringComparison.Ordinal)).ToArray()) Models.Remove(key);
            foreach (var bundle in bundles) bundle.Unload(false);
            bundles.Clear(); loaded.Clear(); Resources.UnloadUnusedAssets();
        }
        public void Dispose()
        {
            foreach (var go in owned) if (go) UnityEngine.Object.Destroy(go);
            foreach (var material in Surfaces.Values) if (material) UnityEngine.Object.Destroy(material);
            Models.Clear(); owned.Clear(); Surfaces.Clear(); ReleaseBundleCache();
        }
    }
}
