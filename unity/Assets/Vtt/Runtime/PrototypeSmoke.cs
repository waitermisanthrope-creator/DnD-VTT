using System;
using System.Collections;
using System.IO;
using UnityEngine;

namespace DndVtt.UnityPrototype
{
    public sealed class PrototypeSmoke : MonoBehaviour
    {
        private IEnumerator Start()
        {
            if (Array.IndexOf(Environment.GetCommandLineArgs(), "--vtt-smoke") < 0) yield break;
            var player = FindFirstObjectByType<ExplorerController>();
            player.acceptInput = false;
            yield return null;
            try { Run(player); }
            catch (Exception error) { Debug.LogException(error); Application.Quit(1); yield break; }
            yield return new WaitForEndOfFrame();
            ScreenCapture.CaptureScreenshot(Path.Combine(Application.persistentDataPath, "prototype-smoke.png"));
            yield return null;
            Debug.Log("VTT_SMOKE_PASS: ground, motion, wall collision, jump, first/third camera, camera obstruction, respawn; rendering screenshot requested");
            Application.Quit(0);
        }
        private static void Check(bool ok, string reason) { if (!ok) throw new Exception("VTT_SMOKE_FAIL: " + reason); }
        private static void Run(ExplorerController p)
        {
            p.ResetPosition();
            for (int i = 0; i < 90; i++) p.Step(Vector2.zero, false, 1f / 60);
            Check(Mathf.Abs(p.transform.position.y) < .12f, "ground contact");
            Vector3 before = p.transform.position;
            for (int i = 0; i < 30; i++) p.Step(Vector2.up, false, 1f / 60);
            Check(p.transform.position.z > before.z + 1.8f, "forward motion");
            float startY = p.transform.position.y;
            for (int i = 0; i < 15; i++) p.Step(Vector2.zero, i == 0, 1f / 60);
            Check(p.transform.position.y > startY + .5f, "jump");
            p.ResetPosition();
            for (int i = 0; i < 240; i++) p.Step(Vector2.up, false, 1f / 60);
            Check(p.transform.position.z < -.5f && p.transform.position.z > -.9f, "wall must stop player");
            p.SetFirstPerson(true);
            Check(!p.avatar.enabled && Vector3.Distance(p.viewCamera.transform.position, p.transform.position + Vector3.up * 1.6f) < .01f, "first person");
            p.SetFirstPerson(false);
            Check(p.avatar.enabled && Vector3.Distance(p.viewCamera.transform.position, p.transform.position + Vector3.up * 1.6f) > 3.5f, "third person");
            p.Look(new Vector2(180, 0)); p.UpdateCamera();
            Check(Vector3.Distance(p.viewCamera.transform.position, p.transform.position + Vector3.up * 1.6f) < 1.5f, "camera obstruction");
            p.Look(new Vector2(-180, 0));
            // Teleport fixtures through the same disable/enable boundary as respawn;
            // direct Transform writes can be overwritten by CharacterController.Move.
            var motor = p.GetComponent<CharacterController>();
            motor.enabled = false; p.transform.position = new Vector3(0, -20, 0); motor.enabled = true;
            p.Step(Vector2.zero, false, 1f / 60);
            Check(Vector3.Distance(p.transform.position, p.Spawn) < .01f, "fall recovery");
            p.UpdateCamera();
        }
    }
}
