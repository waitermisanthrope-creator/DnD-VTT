using System;
using System.Collections;
using UnityEngine;

namespace DndVtt.UnityPrototype
{
    public sealed class LegacyMigrationSmoke : MonoBehaviour
    {
        public const string Fixture = "{\"id\":\"unity-fixture\",\"name\":\"Fixture hero\",\"schemaVersion\":3,\"hpCurrent\":\"17\",\"hpMax\":24,\"resources\":{\"tarot\":{\"remaining\":3}},\"classFeaturesState\":{\"pending\":{\"sourceId\":\"unity-fixture\"}},\"futureUnknown\":{\"value\":123}}";
        private IEnumerator Start()
        {
            if (Array.IndexOf(Environment.GetCommandLineArgs(), "--vtt-migration-smoke") < 0) yield break;
            yield return null;
            try { Run(); Debug.Log("VTT_MIGRATION_SMOKE_PASS: actual tavern meshes/textures, both floors, ground/movement, first/third cameras, elevated respawn, character import/no-loss/rejection"); Application.Quit(0); }
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
