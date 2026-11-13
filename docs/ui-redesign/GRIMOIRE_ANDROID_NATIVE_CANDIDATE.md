# Grimoire Hero native Android candidate 1.00.54

This commit stages the owner-approved Grimoire UI foundation and 65 PNG assets on the trusted `experiment/unity-vtt` branch so the existing pinned Unity 6000.3.26f1 Android ARM64 IL2CPP + original signing-key pipeline can validate them.

- Source: `experiment/ui-grimoire-hero` @ `e6e80ea72a2abba33bfe29c777adcb2bf9ebe07a`.
- Base: published-code staging branch `08bdf971da5cfe81927bf6fb5362360c8099bbf0`, update feed stays on **1.00.53**.
- APK test candidate version: **1.00.54**, prepared *inside the GitHub Actions checkout*, not committed to UnityRelease.cs.
- Protected components: `main`, `updates/unity-experiment.json`, release approval, wallet mechanics, rules, game saves and cloud behavior unchanged.
- Differences include 65 UI images with Unity .meta, neutral skin/theme, compact Hero cards, progress, conditions, portrait, the legacy editor (fold), speed in metres AND feet, and automated source tests.
- Experimental `1.00.54` APK must be checked on a real Android device before any publishing decision. Native Windows UI review and upgrade QA remain separate.
- To find a signed APK for testing, retrieve the artifact `DnD-VTT-Unity-1.00.54-Android-test` from the GitHub Actions run `Unity cloud Android candidate`.
- This commit **does not** approve public release or alter the in-app update feed.

No separate GitHub action for binary extraction is needed after importing; assets are source files under `Resources/UI/Grimoire`.
