# Dark Grimoire — visible UI kit wiring (internal branch)

Visual review of owner Android video on 13 Nov 2026 confirmed that approximately seven of the 65 available PNG assets are referenced. This is **not** an importer or missing-upload issue: the other files were never wired into the IMGUI roles.

This feature branch makes the existing imported artwork visible without touching the wallpaper chosen by the player:
- tinted decorative hero portrait frame `frame_hero_mask_9s`
- subtle runic divider `divider_runic_mask`
- colored theme-tinted icons `icon_hp`, `icon_xp`, `icon_conditions`, `icon_shield`
- textured `button_primary` and `button_secondary` states for Grimoire Hero, details, and advancement
- themed active navigation tabs via `nav_tab_active_9s`

The textures are `Resources.Load`-cached once per GUISkin lifecycle, PNG 9-slice borders are set explicitly, and custom HEX remains respected. No changes to wallet, character save schema, or business logic.

**STOP-SHIP**: [Play Protect investigation #17](https://github.com/waitermisanthrope-creator/DnD-VTT/issues/17). Do NOT promote this branch to public Android updater until a security review of the flagged APK and Play Protect verdict is complete. Visual assets are unrelated to the malware classification and must not be presented as a security fix. Native Unity/Android compile and visual QA still required.
