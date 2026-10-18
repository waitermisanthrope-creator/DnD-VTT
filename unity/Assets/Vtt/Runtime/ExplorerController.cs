using UnityEngine;
using UnityEngine.InputSystem;

namespace DndVtt.UnityPrototype
{
    [RequireComponent(typeof(CharacterController))]
    public sealed class ExplorerController : MonoBehaviour
    {
        public Camera viewCamera;
        public Renderer avatar;
        public bool firstPerson;
        public bool acceptInput = true;
        public float speed = 4f;
        public float lookSensitivity = 1;
        public bool invertY;
        public Vector3 spawnPosition = new Vector3(0, .15f, -6);
        public bool showHelp = true;
        private CharacterController motor;
        private float yaw, pitch = 12f, vertical;
        private Vector2 touchMove;
        private bool jumpRequested;
        public Vector3 Spawn => spawnPosition;

        private void Awake() { motor = GetComponent<CharacterController>(); }
        private void Start() { if (!Application.isMobilePlatform && acceptInput && showHelp) Capture(true); }
        private void OnApplicationFocus(bool focus) { if (!focus) Capture(false); }
        public void RequestJump() { jumpRequested = true; }
        private static void Capture(bool value) { Cursor.lockState = value ? CursorLockMode.Locked : CursorLockMode.None; Cursor.visible = !value; }
        public void SetFirstPerson(bool value) { firstPerson = value; avatar.enabled = !value; UpdateCamera(); }
        public void Look(Vector2 delta) { delta *= lookSensitivity; yaw += delta.x; pitch = Mathf.Clamp(pitch - delta.y * (invertY ? -1 : 1), -70f, 75f); transform.rotation = Quaternion.Euler(0, yaw, 0); }
        public void ResetPosition()
        {
            if (!motor) motor = GetComponent<CharacterController>();
            motor.enabled = false; transform.position = Spawn; motor.enabled = true; vertical = 0;
        }
        // Also used by runtime verification: exercise exactly the same collision/movement path.
        public void Step(Vector2 movement, bool jump, float dt)
        {
            if (motor.isGrounded && vertical < 0) vertical = -2;
            if (jump && motor.isGrounded) vertical = Mathf.Sqrt(1.2f * -2f * Physics.gravity.y);
            vertical += Physics.gravity.y * dt;
            Vector3 planar = transform.right * movement.x + transform.forward * movement.y;
            motor.Move((Vector3.ClampMagnitude(planar, 1) * speed + Vector3.up * vertical) * dt);
            if (transform.position.y < Spawn.y - 12) ResetPosition();
        }
        private void Update()
        {
            if (!acceptInput) return;
            var keys = Keyboard.current; var mouse = Mouse.current;
            Vector2 move = touchMove;
            if (keys != null)
            {
                move += new Vector2((keys.dKey.isPressed ? 1 : 0) - (keys.aKey.isPressed ? 1 : 0), (keys.wKey.isPressed ? 1 : 0) - (keys.sKey.isPressed ? 1 : 0));
                if (keys.vKey.wasPressedThisFrame) SetFirstPerson(!firstPerson);
                if (keys.escapeKey.wasPressedThisFrame) Capture(false);
                if (keys.rKey.wasPressedThisFrame) ResetPosition();
                jumpRequested |= keys.spaceKey.wasPressedThisFrame;
            }
            if (mouse != null && !Application.isMobilePlatform)
            {
                if (mouse.leftButton.wasPressedThisFrame && mouse.position.ReadValue().y < Screen.height - 100) Capture(true);
                if (Cursor.lockState == CursorLockMode.Locked) Look(mouse.delta.ReadValue() * 0.12f);
            }
            if (Touchscreen.current != null)
            {
                touchMove = Vector2.zero;
                foreach (var touch in Touchscreen.current.touches)
                {
                    if (!touch.press.isPressed) continue;
                    Vector2 position = touch.position.ReadValue();
                    if (position.y > Screen.height - 110) continue; // reserve toolbar
                    if (touch.startPosition.ReadValue().x < Screen.width * .45f)
                        touchMove = Vector2.ClampMagnitude((position - touch.startPosition.ReadValue()) / 90f, 1);
                    else Look(touch.delta.ReadValue() * .12f);
                }
                move = touchMove;
            }
            Step(move, jumpRequested, Mathf.Min(Time.deltaTime, .05f)); jumpRequested = false;
        }
        private void LateUpdate() { UpdateCamera(); }
        public void UpdateCamera()
        {
            if (!viewCamera) return;
            Vector3 eye = transform.position + Vector3.up * 1.6f;
            Quaternion rotation = Quaternion.Euler(pitch, yaw, 0);
            Vector3 position = eye;
            if (!firstPerson)
            {
                Vector3 backwards = rotation * Vector3.back;
                // Player is on Ignore Raycast; environment remains on Default.
                float distance = Physics.SphereCast(eye, .18f, backwards, out var hit, 4f, 1, QueryTriggerInteraction.Ignore) ? Mathf.Max(.05f, hit.distance - .08f) : 4f;
                position += backwards * distance;
            }
            viewCamera.transform.SetPositionAndRotation(position, rotation);
        }
        private void OnGUI()
        {
            if (!showHelp) return;
            GUI.skin.label.fontSize = 18;
            GUI.Label(new Rect(16, 12, Screen.width - 32, 30), "DnD VTT / Unity experiment — " + (firstPerson ? "First person" : "Third person"));
            GUI.Label(new Rect(16, 42, Screen.width - 32, 30), "WASD / mouse · V camera · Space jump · Esc cursor · R respawn");
            if (GUI.Button(new Rect(Screen.width - 220, 12, 100, 48), "Camera")) SetFirstPerson(!firstPerson);
            if (GUI.Button(new Rect(Screen.width - 110, 12, 100, 48), "Jump")) jumpRequested = true;
            if (Application.isMobilePlatform) GUI.Label(new Rect(16, Screen.height - 45, Screen.width - 32, 40), "Left drag: move / Right drag: look");
        }
    }
}
