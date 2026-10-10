# MakeHuman skin textures

The two 2048×2048 PNG textures and their original `.mhmat` definitions were supplied
from `makehuman_system_assets_cc0` by the project maintainer on 2026-10-09.

The accompanying `.mhmat` files explicitly state that these assets were released
under CC0 in September 2020. They retain the original release and attribution
information (Data Collection AB, Joel Palmius and Jonas Hauquier).

The runtime uses the PNG diffuse images. `.mhmat` is preserved as source metadata;
Blender/MakeHuman shaders and SSS are not executed in Android WebView.

The skin registry is in `app/3dmap/character_system.js`. Only the human body's
material index 0 is overridden. The original `human-base-rigged.glb` is unchanged.

## Editor anatomy targets (74.00.22)

`editor-morphs.json` and `editor-morphs.bin` contain 14 sparse targets transferred
from MakeHuman/MPFB's bundled CC0 assets at commit
`d0a32e57a7f915cb2f2b95410e2117648c7bbb7e`. The metadata retains source hashes
and weighted breast macro compositions. Original body/rig/UV are unchanged.
Rebuild using `node tools/build_character_editor_morphs.js <pinned src/mpfb/data>
app/assets/3d/makehuman/human-body-morphs.glb app/assets/3d/makehuman`.
Runtime checks the base position hash, binary hash, vertex indices and finite
deltas before atomically attaching any target. Breast volume is active only
for the female form. The fixed exported age/muscle/weight macro mixture is
retained; this is not a complete runtime MakeHuman macro editor.
