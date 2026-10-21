using System;
using System.Collections;
using System.IO;
using Newtonsoft.Json.Linq;
using UnityEngine;

namespace DndVtt.UnityPrototype
{
    public sealed class LegacyMigrationSmoke : MonoBehaviour
    {
        public const string Fixture = "{\"id\":\"unity-fixture\",\"name\":\"Fixture hero\",\"schemaVersion\":3,\"hpCurrent\":\"17\",\"hpMax\":24,\"resources\":{\"tarot\":{\"remaining\":3}},\"classFeaturesState\":{\"pending\":{\"sourceId\":\"unity-fixture\"}},\"futureUnknown\":{\"value\":123}}";
        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.AfterSceneLoad)]
        private static void InstallMinimalClientCheck()
        {
            if(Array.IndexOf(Environment.GetCommandLineArgs(),"--vtt-client-smoke")>=0 && !FindFirstObjectByType<LegacyMigrationSmoke>())
                new GameObject("Explicit minimal-client smoke check").AddComponent<LegacyMigrationSmoke>();
        }
        private static void RunMinimalClient()
        {
            var args=Environment.GetCommandLineArgs();int index=Array.IndexOf(args,"--vtt-profile-store");
            Check(index>=0&&index+1<args.Length,"isolated profile override required");
            string path=Path.GetFullPath(args[index+1]);var panel=FindFirstObjectByType<LegacySessionPanel>();
            Check(panel&&panel.world&&panel.world.explorer,"core session/world/explorer started");
            Check(Path.GetFullPath(panel.SavePath)==path&&File.Exists(path),"actual runtime uses isolated profile");
            string original=File.ReadAllText(path);var expected=new LegacyCharacterArchive(original);
            Check(panel.CurrentName==expected.Name(0)&&panel.ExportOriginal()==original,"startup loaded original profile without replacement");
            Check(JToken.DeepEquals(LegacyJson.Parse(panel.ExportCurrent()),LegacyJson.Parse(original)),"all profile fields preserved in actual runtime export");
            Check(!panel.Import("{\"id\":\"future\",\"schemaVersion\":99}")&&panel.ExportOriginal()==original,"invalid import preserves active profile");
            Check(File.ReadAllText(path)==original&&File.ReadAllText(path+".bak")==original,"profile and backup remain unchanged");
            var catalog=panel.world.catalog;
            Check(catalog&&catalog.maps.Length==0&&catalog.models.Length==0&&catalog.surfaces.Length==0,"minimal startup has no bundled optional map resources");
            foreach(string art in new[]{"Branding/Wallpaper16","Branding/Splash19","Branding/Dragon20"})Check(Resources.Load<Texture2D>(art),"mandatory artwork available: "+art);
            var baseData=Resources.Load<TextAsset>("CharacterSheet/catalog");Check(baseData,"offline character data available");
            var creation=(JObject)JObject.Parse(baseData.text)["creation"];
            Check(((JArray)creation["races"]).Count>0&&((JArray)creation["classes"]).Count>0,"offline base creation catalog populated");
        }
        private IEnumerator Start()
        {
            bool minimal=Array.IndexOf(Environment.GetCommandLineArgs(),"--vtt-client-smoke")>=0;
            if (!minimal && Array.IndexOf(Environment.GetCommandLineArgs(), "--vtt-migration-smoke") < 0) yield break;
            yield return null;
            try { if(minimal) { RunMinimalClient();Debug.Log("VTT_CLIENT_SMOKE_PASS: minimal startup, original profile/backup, unknown fields, invalid import isolation, mandatory artwork and offline creation");Application.Quit(0); } else { Run(); Debug.Log("VTT_MIGRATION_SMOKE_PASS: actual tavern meshes/textures, both floors, ground/movement, first/third cameras, elevated respawn, character import/no-loss/rejection"); Application.Quit(0); } }
            catch (Exception error) { Debug.LogException(error); Application.Quit(1); }
        }
        private static void Check(bool ok, string message) { if (!ok) throw new Exception("VTT_MIGRATION_SMOKE_FAIL: " + message); }
        private static void Run()
        {
            var world = FindFirstObjectByType<LegacyMapPresenter>(); var p = world.explorer; p.acceptInput = false;
            Check(world.FloorCount == 2 && world.ImportedModels > 0 && world.MissingModels == 0, "real tavern import " + world.Error);
            Check(world.TileCount == 504 && world.WallCount == 164, "geometry contract");
            for (int floor = 0; floor < 2; floor++)
            {
                world.SetFloor(floor);
                for (int i = 0; i < 90; i++) p.Step(Vector2.zero, false, 1f / 60);
                Check(Mathf.Abs(p.transform.position.y - floor * 3.5f) < .12f, "floor contact " + floor);
                var before = p.transform.position;
                for (int i = 0; i < 12; i++) p.Step(Vector2.up, false, 1f / 60);
                Check(p.transform.position.z > before.z + .4f, "movement on imported floor " + floor);
                p.SetFirstPerson(true); Check(!p.avatar.enabled && Vector3.Distance(p.viewCamera.transform.position, p.transform.position + Vector3.up * 1.6f) < .01f, "first person");
                p.SetFirstPerson(false); Check(p.avatar.enabled, "third person");
            }
            var motor = p.GetComponent<CharacterController>(); motor.enabled = false; p.transform.position = new Vector3(0, -30, 0); motor.enabled = true; p.Step(Vector2.zero, false, 1f / 60);
            Check(Vector3.Distance(p.transform.position, p.Spawn) < .01f && p.Spawn.y > 3.5f, "elevated respawn");
            var panel = FindFirstObjectByType<LegacySessionPanel>();
            Check(panel.Import(Fixture) && panel.CurrentName == "Fixture hero" && panel.ExportOriginal() == Fixture, "character snapshot roundtrip");
            Check(!panel.Import("{\"id\":\"future\",\"schemaVersion\":99}") && panel.CurrentName == "Fixture hero" && panel.ExportOriginal() == Fixture, "failed import must retain previous profile");
            world.SetFloor(0);
        }
    }
}
