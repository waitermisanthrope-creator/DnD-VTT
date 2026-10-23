using System;
using DndVtt.CharacterStudio.Editor;
using Newtonsoft.Json.Linq;
using NUnit.Framework;
using UnityEngine;

namespace DndVtt.CharacterStudio.Tests
{
    public class CharacterStudioTests
    {
        [Test]
        public void EditingBodyPreservesSheetAndUnsupportedAppearanceFields()
        {
            var appearance = AppearanceDocument.Create(false).Appearance;
            appearance["head"] = new JObject { ["hair"] = "braid", ["futureData"] = new JArray(1, 2, 3) };
            var root = new JObject { ["id"] = "sheet-a", ["hpCurrent"] = 17, ["resources"] = new JObject { ["spell"] = 3 }, ["appearance3d"] = appearance };
            var document = new AppearanceDocument(root.ToString());
            document.Set("shoulders", .7f); document.SetGender(true);
            var restored = new AppearanceDocument(document.Serialize());
            Assert.That((int)restored.Root["hpCurrent"], Is.EqualTo(17));
            Assert.That(JToken.DeepEquals(restored.Root["resources"], root["resources"]), Is.True);
            Assert.That(JToken.DeepEquals(restored.Appearance["head"], appearance["head"]), Is.True);
            Assert.That(restored.Get("shoulders"), Is.EqualTo(.7f).Within(.00001));
            Assert.That(restored.Female, Is.True);
        }

        [Test]
        public void UnsupportedRaceIsRejectedRatherThanDisplayedAsHuman()
        {
            var root = AppearanceDocument.Create(false).Root;
            root["raceId"] = "kenku";
            Assert.Throws<FormatException>(() => new AppearanceDocument(root.ToString()));
        }

        [Test]
        public void InvalidBodyDoesNotEnterPreview()
        {
            var root = AppearanceDocument.Create(false).Root;
            root["body"]["height"] = 100;
            Assert.Throws<FormatException>(() => new AppearanceDocument(root.ToString()));
            root["body"]["height"] = "not a number";
            Assert.Throws<FormatException>(() => new AppearanceDocument(root.ToString()));
        }

        [Test]
        public void ImportedUnityModelRetainsRigMorphsAndHumanScale()
        {
            CharacterStudioSetup.Prepare();
            CharacterStudioSetup.ValidateAssets();
        }

        [Test]
        public void BothGendersAndOppositeBodyExtremesProduceFiniteGeometry()
        {
            CharacterStudioSetup.Prepare();
            var go = new GameObject("Body test");
            try
            {
                var preview = go.AddComponent<CharacterBodyPreview>(); preview.Initialize();
                foreach (bool female in new[] { false, true })
                foreach (float sign in new[] { -1f, 1f })
                {
                    var document = AppearanceDocument.Create(female);
                    foreach (var axis in new[] { "height", "width", "fat", "muscle", "shoulders", "chest", "waist", "hips", "arms", "legs", "head", "breastSize", "pectorals", "armLength", "legLength" }) document.Set(axis, sign);
                    preview.Apply(document);
                    foreach (var filter in go.GetComponentsInChildren<MeshFilter>())
                    foreach (var v in filter.sharedMesh.vertices)
                        Assert.That(float.IsNaN(v.x) || float.IsInfinity(v.x) || float.IsNaN(v.y) || float.IsInfinity(v.y) || float.IsNaN(v.z) || float.IsInfinity(v.z), Is.False);
                    Assert.That(preview.Bounds.size.y, Is.GreaterThan(.5f).And.LessThan(3));
                }
            }
            finally { UnityEngine.Object.DestroyImmediate(go); }
        }
    }
}
