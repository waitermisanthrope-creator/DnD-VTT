using System;
using UnityEngine;

namespace DndVtt.UnityPrototype
{
    public sealed class LegacyContentCatalog : ScriptableObject
    {
        [Serializable] public struct MapEntry { public string key; public TextAsset json; }
        [Serializable] public struct ModelEntry { public string key; public GameObject prefab; }
        [Serializable] public struct SurfaceEntry { public string key; public Material material; }
        public MapEntry[] maps;
        public ModelEntry[] models;
        public SurfaceEntry[] surfaces;
        public GameObject Model(string key) { foreach (var item in models) if (item.key == key) return item.prefab; return null; }
        public Material Surface(string key) { foreach (var item in surfaces) if (item.key == key) return item.material; return null; }
    }
}
