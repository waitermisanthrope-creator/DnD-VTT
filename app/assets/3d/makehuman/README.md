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
