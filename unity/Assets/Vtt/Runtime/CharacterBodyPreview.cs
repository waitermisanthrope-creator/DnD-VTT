using System;
using System.Collections.Generic;
using Newtonsoft.Json.Linq;
using UnityEngine;
using UnityEngine.Rendering;

namespace DndVtt.UnityPrototype
{
    // Static preview: retain the FBX rig, apply imported shape deltas directly,
    // and normalize the imported hierarchy once to the source GLB's physical height.
    public sealed class CharacterBodyPreview : MonoBehaviour
    {
        public Bounds Bounds { get; private set; }
        public bool Grey { get; private set; }
        SkinnedMeshRenderer source;
        MeshRenderer surface, bottom, top;
        Mesh baked, bottomMesh, topMesh;
        Material skin, cloth;
        Texture male, female;
        Vector3[] rest;
        Vector3[][] morphDeltas;
        float[] morphFrameWeights;
        BoneWeight[] weights;
        Transform[] bones;
        JObject channels;
        int[] bottomTriangles, topTriangles;
        float[] torsoMask, armMask, legMask, headNeckMask;
        int[] normalGroups;
        Vector3[] normalSums;
        int groupCount;
        bool currentFemale;

        public void Initialize()
        {
            var prefab = Resources.Load<GameObject>("CharacterStudio/HumanBody");
            if (!prefab) throw new InvalidOperationException("Не найден HumanBody.fbx. Выполните экспорт из Blender.");
            var model = Instantiate(prefab, transform);
            source = model.GetComponentInChildren<SkinnedMeshRenderer>();
            if (!source || source.sharedMesh.blendShapeCount != 23)
                throw new InvalidOperationException("Нужна skinned-модель с 23 морфами. Проверьте настройки импорта FBX.");
            source.enabled = false;
            source.updateWhenOffscreen = true;
            rest = source.sharedMesh.vertices;
            weights = source.sharedMesh.boneWeights;
            bones = source.bones;
            var catalog = Resources.Load<TextAsset>("CharacterStudio/MorphCatalog");
            var metadata = JObject.Parse(catalog.text);
            channels = (JObject)metadata["channels"];
            // FBX may encode its units/up-axis in the renderer hierarchy. Work
            // in the preview's Y-up metre space before applying WebView controls.
            var meshToPreview = transform.worldToLocalMatrix * source.transform.localToWorldMatrix;
            var importedBounds = new Bounds(meshToPreview.MultiplyPoint3x4(rest[0]), Vector3.zero);
            for (int i = 0; i < rest.Length; i++)
            { rest[i] = meshToPreview.MultiplyPoint3x4(rest[i]); importedBounds.Encapsulate(rest[i]); }
            float sourceHeight = (float)metadata["baseHeight"];
            if (sourceHeight < .5f || sourceHeight > 3 || importedBounds.size.y <= .00001f)
                throw new InvalidOperationException("Некорректные габариты исходной или импортированной модели: " + importedBounds);
            float unitScale = sourceHeight / importedBounds.size.y;
            for (int i = 0; i < rest.Length; i++) rest[i] *= unitScale;
            morphDeltas = new Vector3[source.sharedMesh.blendShapeCount][];
            morphFrameWeights = new float[morphDeltas.Length];
            for (int i = 0; i < morphDeltas.Length; i++)
            {
                int frame = source.sharedMesh.GetBlendShapeFrameCount(i) - 1;
                morphDeltas[i] = new Vector3[rest.Length];
                source.sharedMesh.GetBlendShapeFrameVertices(i, frame, morphDeltas[i], null, null);
                for (int vertex = 0; vertex < rest.Length; vertex++)
                    morphDeltas[i][vertex] = meshToPreview.MultiplyVector(morphDeltas[i][vertex]) * unitScale;
                morphFrameWeights[i] = source.sharedMesh.GetBlendShapeFrameWeight(i, frame);
                if (morphFrameWeights[i] <= 0) throw new InvalidOperationException("Некорректный кадр морфа.");
            }
            foreach (var property in channels.Properties())
            {
                FindMorph((string)property.Value["positive"]);
                FindMorph((string)property.Value["negative"]);
            }
            FindMorph("human-female");
            baked = new Mesh { name = "Human preview", indexFormat = IndexFormat.UInt32 };
            baked.vertices = rest; baked.triangles = source.sharedMesh.triangles; baked.uv = source.sharedMesh.uv;
            baked.RecalculateBounds();
            bottomMesh = new Mesh { name = "Preview shorts", indexFormat = IndexFormat.UInt32 };
            topMesh = new Mesh { name = "Preview top", indexFormat = IndexFormat.UInt32 };
            surface = MakeSurface("Body", baked);
            bottom = MakeSurface("Preview shorts", bottomMesh);
            top = MakeSurface("Preview top", topMesh);
            var template = Resources.Load<Material>("CharacterStudio/PreviewLit");
            if (!template || !template.shader) throw new InvalidOperationException("Не найден материал предпросмотра человека.");
            skin = new Material(template) { name = "Preview skin" };
            skin.SetFloat("_Smoothness", .32f);
            cloth = new Material(template) { name = "Preview underwear", color = new Color(.035f, .045f, .065f) };
            cloth.SetFloat("_Smoothness", .18f);
            surface.sharedMaterial = skin;
            bottom.sharedMaterial = top.sharedMaterial = cloth;
            male = Resources.Load<Texture2D>("CharacterStudio/SkinMale");
            female = Resources.Load<Texture2D>("CharacterStudio/SkinFemale");
            if (!male || !female) throw new InvalidOperationException("Не найдены текстуры кожи.");
            BuildMasks();
        }

        MeshRenderer MakeSurface(string label, Mesh mesh)
        {
            var go = new GameObject(label);
            go.transform.SetParent(transform, false);
            go.AddComponent<MeshFilter>().sharedMesh = mesh;
            return go.AddComponent<MeshRenderer>();
        }

        int FindMorph(string name)
        {
            for (int i = 0; i < source.sharedMesh.blendShapeCount; i++)
            {
                string candidate = source.sharedMesh.GetBlendShapeName(i);
                if (candidate == name || candidate.EndsWith("." + name, StringComparison.Ordinal)) return i;
            }
            throw new InvalidOperationException("Отсутствует морф: " + name);
        }

        void BuildMasks()
        {
            torsoMask = new float[rest.Length]; armMask = new float[rest.Length];
            legMask = new float[rest.Length]; headNeckMask = new float[rest.Length];
            normalGroups = new int[rest.Length];
            var groups = new Dictionary<Vector3Int, int>();
            for (int i = 0; i < rest.Length; i++)
            {
                var key = new Vector3Int(Mathf.RoundToInt(rest[i].x * 1000000), Mathf.RoundToInt(rest[i].y * 1000000), Mathf.RoundToInt(rest[i].z * 1000000));
                if (!groups.TryGetValue(key, out int group)) { group = groups.Count; groups.Add(key, group); }
                normalGroups[i] = group;
                var w = weights[i];
                AddWeight(i, w.boneIndex0, w.weight0); AddWeight(i, w.boneIndex1, w.weight1);
                AddWeight(i, w.boneIndex2, w.weight2); AddWeight(i, w.boneIndex3, w.weight3);
            }
            groupCount = groups.Count;
            normalSums = new Vector3[groupCount];
            var restBounds = new Bounds(rest[0], Vector3.zero);
            foreach (var p in rest) restBounds.Encapsulate(p);
            float floor = restBounds.min.y, height = restBounds.size.y;
            var shorts = new List<int>(); var chest = new List<int>();
            int[] triangles = source.sharedMesh.triangles;
            for (int i = 0; i < triangles.Length; i += 3)
            {
                int a = triangles[i], b = triangles[i + 1], c = triangles[i + 2];
                float h = ((rest[a].y + rest[b].y + rest[c].y) / 3 - floor) / height;
                if (h > .43f && h < .61f) { shorts.Add(a); shorts.Add(b); shorts.Add(c); }
                if (h > .68f && h < .80f && torsoMask[a] > .5f && torsoMask[b] > .5f && torsoMask[c] > .5f)
                { chest.Add(a); chest.Add(b); chest.Add(c); }
            }
            bottomTriangles = shorts.ToArray(); topTriangles = chest.ToArray();
        }

        void AddWeight(int vertex, int bone, float weight)
        {
            if (weight <= 0) return;
            string name = bones[bone].name.ToLowerInvariant();
            if (name.StartsWith("spine") || name.StartsWith("pelvis")) torsoMask[vertex] += weight;
            if (name.StartsWith("upperarm") || name.StartsWith("lowerarm") || name.StartsWith("clavicle")) armMask[vertex] += weight;
            if (name.StartsWith("thigh") || name.StartsWith("calf")) legMask[vertex] += weight;
            if (name.StartsWith("head") || name.StartsWith("neck")) headNeckMask[vertex] += weight;
        }

        public void Apply(AppearanceDocument document)
        {
            for (int i = 0; i < source.sharedMesh.blendShapeCount; i++) source.SetBlendShapeWeight(i, 0);
            currentFemale = document.Female;
            source.SetBlendShapeWeight(FindMorph("human-female"), currentFemale ? 100 : 0);
            foreach (var channel in channels.Properties())
            {
                float value = channel.Name == "breastSize" && !currentFemale ? 0 : document.Get(channel.Name);
                float scale = (float?)channel.Value["scale"] ?? 1;
                source.SetBlendShapeWeight(FindMorph((string)channel.Value["positive"]), Mathf.Max(0, value) * scale * 100);
                source.SetBlendShapeWeight(FindMorph((string)channel.Value["negative"]), Mathf.Max(0, -value) * scale * 100);
            }
            var vertices = (Vector3[])rest.Clone();
            for (int target = 0; target < morphDeltas.Length; target++)
            {
                float weight = source.GetBlendShapeWeight(target) / morphFrameWeights[target];
                if (Mathf.Abs(weight) < .000001f) continue;
                for (int i = 0; i < vertices.Length; i++) vertices[i] += morphDeltas[target][i] * weight;
            }
            ApplyProceduralBody(vertices, document);
            baked.vertices = vertices;
            baked.RecalculateNormals();
            // Smooth across UV splits using the immutable source topology, as in WebView.
            var normals = baked.normals;
            Array.Clear(normalSums, 0, groupCount);
            for (int i = 0; i < normals.Length; i++) normalSums[normalGroups[i]] += normals[i];
            for (int i = 0; i < normals.Length; i++) normals[i] = normalSums[normalGroups[i]].normalized;
            baked.normals = normals;
            baked.RecalculateBounds();
            BuildCoverage(bottomMesh, vertices, normals, bottomTriangles);
            BuildCoverage(topMesh, vertices, normals, topTriangles);
            top.enabled = currentFemale;
            SetGrey(Grey);
            Bounds = surface.bounds;
        }

        void ApplyProceduralBody(Vector3[] vertices, AppearanceDocument d)
        {
            var bounds = new Bounds(vertices[0], Vector3.zero);
            foreach (var p in vertices) bounds.Encapsulate(p);
            float height = Mathf.Max(.001f, bounds.size.y), floor = bounds.min.y;
            var centre = bounds.center;
            // Match the WebView's 32 height slices and separate left/right limb centres.
            var sums = new Vector3[2, 2, 32];
            for (int i = 0; i < vertices.Length; i++)
            {
                var p = vertices[i]; int side = p.x < centre.x ? 0 : 1;
                int bin = Mathf.Clamp(Mathf.FloorToInt((p.y - floor) / height * 32), 0, 31);
                for (int group = 0; group < 2; group++)
                {
                    float w = group == 0 ? armMask[i] : legMask[i];
                    if (w >= .01f) sums[group, side, bin] += new Vector3(p.x * w, p.z * w, w);
                }
            }
            float muscle = d.Get("muscle"), fat = d.Get("fat"), width = d.Get("width");
            for (int i = 0; i < vertices.Length; i++)
            {
                var p = vertices[i]; var q = p;
                float torso = torsoMask[i] * (1 - Mathf.Min(1, headNeckMask[i]));
                float h = (p.y - floor) / height, belly = Mathf.Max(0, 1 - Mathf.Abs(h - .58f) / .18f);
                q.x = centre.x + (p.x - centre.x) * (1 + torso * (muscle * .065f + fat * (.04f + belly * .07f)));
                q.z = centre.z + (p.z - centre.z) * (1 + torso * (muscle * .035f + fat * (.055f + belly * .09f)));
                for (int group = 0; group < 2; group++)
                {
                    float w = group == 0 ? armMask[i] : legMask[i];
                    if (w <= 0) continue;
                    int side = p.x < centre.x ? 0 : 1;
                    float level = Mathf.Clamp(h * 32 - .5f, 0, 31);
                    int low = Mathf.FloorToInt(level), high = Mathf.Min(31, low + 1);
                    var a = SliceCentre(sums, group, side, low, p);
                    var b = SliceCentre(sums, group, side, high, p);
                    var c = Vector2.Lerp(a, b, level - low);
                    float amount = group == 0 ? muscle * .13f + fat * .06f : muscle * .10f + fat * .08f;
                    q.x += (p.x - c.x) * amount * w; q.z += (p.z - c.y) * amount * w;
                }
                q.x = centre.x + (q.x - centre.x) * (1 + width * .10f);
                q.z = centre.z + (q.z - centre.z) * (1 + width * .06f);
                q.y = floor + (q.y - floor) * (1 + d.Get("height") * .12f);
                vertices[i] = q;
            }
        }

        static Vector2 SliceCentre(Vector3[,,] sums, int group, int side, int bin, Vector3 fallback)
        {
            for (int distance = 0; distance < 32; distance++)
            {
                int low = bin - distance, high = bin + distance;
                if (low >= 0 && sums[group, side, low].z > 0) { var s = sums[group, side, low]; return new Vector2(s.x / s.z, s.y / s.z); }
                if (high < 32 && sums[group, side, high].z > 0) { var s = sums[group, side, high]; return new Vector2(s.x / s.z, s.y / s.z); }
            }
            return new Vector2(fallback.x, fallback.z);
        }

        static void BuildCoverage(Mesh mesh, Vector3[] vertices, Vector3[] normals, int[] triangles)
        {
            var expanded = new Vector3[vertices.Length];
            for (int i = 0; i < expanded.Length; i++) expanded[i] = vertices[i] + normals[i] * .004f;
            mesh.Clear(); mesh.vertices = expanded; mesh.normals = normals; mesh.triangles = triangles;
            mesh.RecalculateBounds();
        }

        public void SetGrey(bool grey)
        {
            Grey = grey;
            skin.SetTexture("_BaseMap", grey ? null : currentFemale ? female : male);
            skin.SetColor("_BaseColor", grey ? new Color(.48f, .48f, .48f) : Color.white);
        }

        void OnDestroy()
        {
            Release(baked); Release(bottomMesh); Release(topMesh); Release(skin); Release(cloth);
        }

        static void Release(UnityEngine.Object asset)
        {
            if (!asset) return;
            if (Application.isPlaying) Destroy(asset); else DestroyImmediate(asset);
        }
    }
}
