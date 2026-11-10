# Hero art / Unity 1.00.42
Owner delegated design and implementation and requested paired release42.
Extend existing IMGUI sheet and native document bridge, no UI framework migration.
Hero: large fit-inside portrait, Art/3D (explicit Coming soon), replace/remove controls,
identity + health/defence cards, compact stat grid. Move archive actions behind a menu.
Portrait on phone above details; on wide desktop beside details. Never crop silently.
PNG/JPEG/BMP input, bounded bytes/dimensions before Unity decode, normalize to <=512px
and <=64KiB JPEG; flatten alpha on dark background. Embed versioned heroArt object
in existing character JSON, not picker paths/remote URLs. Cache only current texture,
release on replacement/destroy. Persist against original hero ID, transactional save.
Preserve all unknown fields, other heroes, wrapper, .bak, old saves. Keep 1MiB profile
limit for cloud compatibility; raise aggregate archive/file limit to16MiB consistently
(C#/Android/provider), with pre-save whole-archive validation. No SQL change.
Alternative local-file reference rejected: loses art on export/device transfer.
Alternative unbounded original embeds rejected: memory/archive/cloud overflow.
Errors/cancel preserve prior art. Corrupt stored art gives recoverable UI, no sheet crash.
Tests: PNG/JPEG/BMP headers, huge/truncated inputs; ID-targeted save, archive roundtrip,
backup/restart/multihero; Unity decode/normalize/cache and actual rendered portrait;
Windows/Android builds and native installed UI before paired publisher. Physical phone
QA explicitly remains unperformed. Work only experiment/unity-vtt; no main/MMO/keys.
