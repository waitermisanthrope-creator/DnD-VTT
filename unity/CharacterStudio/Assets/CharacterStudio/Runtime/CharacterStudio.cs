using System;
using System.IO;
using UnityEngine;
using UnityEngine.Rendering;

namespace DndVtt.CharacterStudio
{
    public sealed class CharacterStudio : MonoBehaviour
    {
        static readonly string[] Axes = { "height", "width", "muscle", "fat", "shoulders", "chest", "waist", "hips", "arms", "legs", "head", "breastSize", "pectorals", "armLength", "legLength" };
        static readonly string[] Labels = { "Рост", "Ширина тела", "Мышцы", "Жир", "Плечи", "Грудная клетка", "Талия", "Бёдра", "Объём рук", "Объём ног", "Размер головы", "Объём груди", "Грудные мышцы", "Длина рук", "Длина ног" };
        CharacterBodyPreview preview;
        AppearanceDocument document;
        Camera studioCamera;
        Vector2 scroll, jsonScroll;
        string status = "Текущая база из WebView. Это первый этап переноса, не новая графика.";
        string jsonText = "";
        bool dirty, showJson;
        float yaw, pitch = 5, distance = 2.8f, targetHeight = .85f;
        float guiScale;
        Rect panel;
        bool dragging, pinching;
        string DraftPath => Path.Combine(Application.persistentDataPath, "character-studio-draft.json");

        void Start()
        {
            try
            {
                CreateStudio();
                preview = new GameObject("Character").AddComponent<CharacterBodyPreview>();
                preview.transform.SetParent(transform, false);
                preview.Initialize();
                document = AppearanceDocument.Create(false);
                preview.Apply(document);
                Layout();
                Frame(false);
            }
            catch (Exception error) { document = null; status = "Не удалось открыть сцену: " + error.Message; Debug.LogException(error); }
        }

        void CreateStudio()
        {
            RenderSettings.ambientMode = AmbientMode.Flat;
            RenderSettings.ambientLight = new Color(.30f, .33f, .40f);
            studioCamera = new GameObject("Studio Camera").AddComponent<Camera>();
            studioCamera.transform.SetParent(transform, false);
            studioCamera.tag = "MainCamera";
            studioCamera.clearFlags = CameraClearFlags.SolidColor;
            studioCamera.backgroundColor = new Color(.055f, .065f, .085f);
            studioCamera.fieldOfView = 35;
            studioCamera.nearClipPlane = .02f;
            studioCamera.farClipPlane = 50;
            AddLight("Key", new Vector3(35, -35, 0), new Color(1, .91f, .83f), 2.0f);
            AddLight("Fill", new Vector3(15, 45, 0), new Color(.76f, .85f, 1), .7f);
            AddLight("Rim", new Vector3(20, 170, 0), new Color(.85f, .91f, 1), 1.3f);
        }

        void AddLight(string label, Vector3 angles, Color color, float intensity)
        {
            var go = new GameObject(label); go.transform.SetParent(transform, false);
            go.transform.rotation = Quaternion.Euler(angles);
            var light = go.AddComponent<Light>(); light.type = LightType.Directional;
            light.color = color; light.intensity = intensity;
        }

        void Layout()
        {
            guiScale = Mathf.Clamp(Screen.height / 950f, .7f, 1.6f);
            float width = Screen.width / guiScale, height = Screen.height / guiScale;
            bool portrait = Screen.height > Screen.width;
            panel = portrait ? new Rect(0, height * .56f, width, height * .44f) : new Rect(0, 0, 330, height);
            if (studioCamera)
                studioCamera.rect = portrait ? new Rect(0, .44f, 1, .56f) : new Rect(330 / width, 0, 1 - 330 / width, 1);
        }

        bool InViewport(Vector2 screenPosition)
        {
            var guiPosition = new Vector2(screenPosition.x / guiScale, (Screen.height - screenPosition.y) / guiScale);
            return !panel.Contains(guiPosition) && !showJson;
        }

        void Update()
        {
            Layout();
            if (!studioCamera || document == null) return;
            if (Input.touchCount > 0)
            {
                var touch = Input.GetTouch(0);
                if (touch.phase == TouchPhase.Began) dragging = InViewport(touch.position);
                if (Input.touchCount == 2)
                {
                    var second = Input.GetTouch(1);
                    if (!pinching) pinching = InViewport(touch.position) && InViewport(second.position);
                    if (pinching)
                    {
                        float oldDistance = ((touch.position - touch.deltaPosition) - (second.position - second.deltaPosition)).magnitude;
                        float newDistance = (touch.position - second.position).magnitude;
                        distance *= oldDistance / Mathf.Max(1, newDistance);
                    }
                }
                else
                {
                    pinching = false;
                    if (dragging && touch.phase == TouchPhase.Moved) Rotate(touch.deltaPosition);
                }
                if (touch.phase == TouchPhase.Ended || touch.phase == TouchPhase.Canceled) dragging = false;
            }
            else
            {
                pinching = false;
                if (Input.GetMouseButtonDown(0)) dragging = InViewport(Input.mousePosition);
                if (Input.GetMouseButtonUp(0)) dragging = false;
                if (dragging && Input.GetMouseButton(0))
                {
                    // Read absolute cursor movement: no dependency on an InputManager axis asset.
                    Vector2 current = Input.mousePosition;
                    if (lastMouse.HasValue) Rotate(current - lastMouse.Value);
                    lastMouse = current;
                }
                else lastMouse = null;
                if (InViewport(Input.mousePosition)) distance *= Mathf.Exp(-Input.mouseScrollDelta.y * .12f);
            }
        }
        Vector2? lastMouse;
        void Rotate(Vector2 delta) { yaw += delta.x * .3f; pitch = Mathf.Clamp(pitch - delta.y * .2f, -35, 60); }

        void LateUpdate()
        {
            if (!studioCamera || document == null) return;
            if (dirty)
            {
                try { preview.Apply(document); }
                catch (Exception error) { status = error.Message; Debug.LogException(error); }
                dirty = false;
            }
            distance = Mathf.Clamp(distance, .25f, 6);
            var target = new Vector3(preview.Bounds.center.x, targetHeight, preview.Bounds.center.z);
            studioCamera.transform.position = target + Quaternion.Euler(pitch, yaw, 0) * Vector3.forward * distance;
            studioCamera.transform.LookAt(target);
        }

        void Frame(bool face)
        {
            if (!preview) return;
            var bounds = preview.Bounds;
            targetHeight = face ? bounds.max.y - bounds.size.y * .09f : bounds.center.y;
            float aspect = studioCamera.aspect;
            float verticalHalfFov = studioCamera.fieldOfView * Mathf.Deg2Rad / 2;
            float horizontalHalfFov = Mathf.Atan(Mathf.Tan(verticalHalfFov) * Mathf.Max(.2f, aspect));
            distance = face ? bounds.size.y * .42f : Mathf.Max(bounds.size.y * .56f / Mathf.Tan(verticalHalfFov), bounds.size.x * .56f / Mathf.Tan(horizontalHalfFov));
            pitch = face ? 0 : 5;
        }

        void OnGUI()
        {
            Layout();
            GUI.matrix = Matrix4x4.Scale(Vector3.one * guiScale);
            GUI.skin.label.wordWrap = true;
            GUILayout.BeginArea(panel, GUI.skin.box);
            scroll = GUILayout.BeginScrollView(scroll);
            GUILayout.Label("DnD VTT · Character Studio", GUI.skin.box);
            if (document != null)
            {
                GUILayout.BeginHorizontal();
                if (GUILayout.Button("Мужчина", GUILayout.Height(36))) ChangeGender(false);
                if (GUILayout.Button("Женщина", GUILayout.Height(36))) ChangeGender(true);
                GUILayout.EndHorizontal();
                GUILayout.BeginHorizontal();
                if (GUILayout.Button("Тело", GUILayout.Height(32))) Frame(false);
                if (GUILayout.Button("Лицо", GUILayout.Height(32))) Frame(true);
                GUILayout.EndHorizontal();
                GUILayout.BeginHorizontal();
                if (GUILayout.Button("Спереди")) yaw = 0;
                if (GUILayout.Button("Сбоку")) yaw = 90;
                if (GUILayout.Button("Сзади")) yaw = 180;
                GUILayout.EndHorizontal();
                bool grey = GUILayout.Toggle(preview.Grey, "Серый материал — проверка формы");
                if (grey != preview.Grey) preview.SetGrey(grey);
                for (int i = 0; i < Axes.Length; i++)
                {
                    if (Axes[i] == "breastSize" && !document.Female) continue;
                    float oldValue = document.Get(Axes[i]);
                    GUILayout.Label(Labels[i] + "  " + oldValue.ToString("0.00"));
                    float value = GUILayout.HorizontalSlider(oldValue, -1, 1, GUILayout.Height(22));
                    if (Mathf.Abs(value - oldValue) > .0001f) { document.Set(Axes[i], value); dirty = true; }
                }
                if (GUILayout.Button("Сбросить параметры тела", GUILayout.Height(32)))
                { foreach (string axis in Axes) document.Set(axis, 0); dirty = true; }
                if (GUILayout.Button("Сохранить черновик", GUILayout.Height(32))) Safe(() =>
                {
                    File.WriteAllText(DraftPath, document.Serialize()); status = "Черновик сохранён: " + DraftPath;
                });
                if (GUILayout.Button("Загрузить черновик", GUILayout.Height(32))) Safe(() => Import(File.ReadAllText(DraftPath)));
                if (GUILayout.Button("Импорт / экспорт JSON", GUILayout.Height(32))) { jsonText = document.Serialize(); showJson = !showJson; }
                GUILayout.Label("Вращение: перетаскивание. Масштаб: колесо или два пальца.");
                GUILayout.Label("Пока перенесены тело и кожа человека. Лицо, волосы, одежда и другие расы ещё не отображаются.");
            }
            GUILayout.Label(status);
            GUILayout.EndScrollView(); GUILayout.EndArea();
            if (showJson) DrawJson();
        }

        void ChangeGender(bool female)
        {
            document.SetGender(female); dirty = true;
            status = "Пол изменён. Остальные настройки сохранены. Камеру можно настроить кнопкой «Тело».";
        }

        void DrawJson()
        {
            float width = Screen.width / guiScale, height = Screen.height / guiScale;
            GUILayout.BeginArea(new Rect(15, 15, width - 30, height - 30), GUI.skin.window);
            GUILayout.Label("Вставьте appearance3d или один лист персонажа с полем appearance3d.");
            jsonScroll = GUILayout.BeginScrollView(jsonScroll);
            jsonText = GUILayout.TextArea(jsonText, GUILayout.ExpandHeight(true));
            GUILayout.EndScrollView();
            GUILayout.BeginHorizontal();
            if (GUILayout.Button("Применить", GUILayout.Height(36))) Safe(() => { Import(jsonText); showJson = false; });
            if (GUILayout.Button("Копировать JSON", GUILayout.Height(36))) { GUIUtility.systemCopyBuffer = document.Serialize(); status = "JSON скопирован."; }
            if (GUILayout.Button("Закрыть", GUILayout.Height(36))) showJson = false;
            GUILayout.EndHorizontal();
            GUILayout.Label(status);
            GUILayout.EndArea();
        }

        void Import(string json)
        {
            var candidate = new AppearanceDocument(json);
            // Commit only after successfully building the candidate appearance.
            try { preview.Apply(candidate); }
            catch { preview.Apply(document); throw; }
            document = candidate; dirty = false; Frame(false);
            status = "JSON загружен. Неперенесённые поля сохранены; отображаются тело и базовая кожа человека.";
        }
        void Safe(Action action)
        { try { action(); } catch (Exception error) { status = "Ошибка: " + error.Message; } }
    }
}
