using System;
using UnityEngine;
using UnityEngine.Rendering;
using UnityEngine.Rendering.Universal;

namespace DndVtt.UnityPrototype
{
    // Render into the native menu, without replacing its camera or changing global lighting.
    public sealed class CharacterStudioView : IDisposable
    {
        public RenderTexture Image { get; private set; }
        public CharacterBodyPreview Body { get; private set; }
        public float Yaw { get; private set; }
        readonly GameObject root;
        readonly Camera camera;
        float pitch = 5, distance, targetHeight;
        bool imageDirty = true, face;
        const int Layer = 29;
        public CharacterStudioView()
        {
            root = new GameObject("Human character studio");
            root.transform.position = new Vector3(18000, 0, 18000);
            try
            {
                Body = Child("Human").AddComponent<CharacterBodyPreview>(); Body.Initialize();
                camera = Child("Character camera").AddComponent<Camera>(); camera.enabled = false;
                camera.gameObject.AddComponent<UniversalAdditionalCameraData>().renderPostProcessing = false;
                camera.cullingMask = 1 << Layer; camera.clearFlags = CameraClearFlags.SolidColor;
                camera.backgroundColor = new Color(.045f, .055f, .075f);
                camera.fieldOfView = 35; camera.nearClipPlane = .02f; camera.farClipPlane = 30;
                Image = new RenderTexture(600, 800, 24, RenderTextureFormat.ARGB32) { name = "Human character preview", antiAliasing = 1 };
                Image.Create(); camera.targetTexture = Image; camera.aspect = 600f / 800;
                AddLight("Key", new Vector3(25, 215, 0), new Color(1, .91f, .83f), 1.8f);
                AddLight("Fill", new Vector3(10, 135, 0), new Color(.76f, .85f, 1), .8f);
                AddLight("Rim", new Vector3(20, 20, 0), new Color(.85f, .91f, 1), 1.2f);
                // Objects instantiated by Body.Initialize must join the isolated render layer too.
                foreach (var t in root.GetComponentsInChildren<Transform>(true)) t.gameObject.layer = Layer;
            }
            catch { Dispose(); throw; }
        }
        GameObject Child(string name) { var go = new GameObject(name) { layer = Layer }; go.transform.SetParent(root.transform, false); return go; }
        void AddLight(string name, Vector3 rotation, Color color, float intensity)
        {
            var go = Child(name); go.transform.localRotation = Quaternion.Euler(rotation);
            var light = go.AddComponent<Light>(); light.type = LightType.Directional;
            light.cullingMask = 1 << Layer; light.color = color; light.intensity = intensity;
        }
        public void Apply(AppearanceDocument document) { Body.Apply(document); Frame(face); imageDirty = true; }
        public void Frame(bool closeup)
        {
            face = closeup; var b = Body.Bounds;
            targetHeight = closeup ? b.max.y - b.size.y * .09f : b.center.y;
            float halfFov = camera.fieldOfView * Mathf.Deg2Rad / 2;
            distance = closeup ? b.size.y * .44f : Mathf.Max(b.size.y * .56f / Mathf.Tan(halfFov), b.size.x * .56f / (Mathf.Tan(halfFov) * camera.aspect));
            pitch = closeup ? 0 : 5; imageDirty = true;
        }
        public void Angle(float yaw) { Yaw = yaw; imageDirty = true; }
        public void Orbit(Vector2 delta) { Yaw += delta.x * .35f; pitch = Mathf.Clamp(pitch + delta.y * .2f, -35, 60); imageDirty = true; }
        public void Zoom(float factor) { distance = Mathf.Clamp(distance * factor, .25f, 8); imageDirty = true; }
        public void Grey(bool value) { Body.SetGrey(value); imageDirty = true; }
        public void Render(bool force = false)
        {
            if (!camera || !Image || (!imageDirty && !force && Image.IsCreated())) return;
            if (!Image.IsCreated() && !Image.Create()) throw new InvalidOperationException("Не удалось восстановить изображение персонажа.");
            var b = Body.Bounds; var target = new Vector3(b.center.x, targetHeight, b.center.z);
            camera.transform.position = target + Quaternion.Euler(pitch, Yaw, 0) * Vector3.forward * distance;
            camera.transform.LookAt(target);
            // Directional lights from the live map must not illuminate this isolated view.
            var outside = UnityEngine.Object.FindObjectsByType<Light>(FindObjectsSortMode.None);
            var masks = new int[outside.Length];
            try
            {
                for (int i = 0; i < outside.Length; i++)
                { masks[i] = outside[i].cullingMask; if (!outside[i].transform.IsChildOf(root.transform)) outside[i].cullingMask &= ~(1 << Layer); }
                if (GraphicsSettings.currentRenderPipeline != null)
                    RenderPipeline.SubmitRenderRequest(camera, new UniversalRenderPipeline.SingleCameraRequest { destination = Image });
                else camera.Render();
            }
            finally { for (int i = 0; i < outside.Length; i++) if (outside[i]) outside[i].cullingMask = masks[i]; }
            imageDirty = false;
        }
        public void Dispose()
        {
            if (camera) camera.targetTexture = null;
            if (root) UnityEngine.Object.DestroyImmediate(root);
            if (Image) { Image.Release(); UnityEngine.Object.DestroyImmediate(Image); Image = null; }
        }
    }
}
