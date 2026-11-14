# Mobile Grimoire 1.00.56

Owner request, 2026-11-14: implement the supplied comparison's right-hand phone direction, connect existing GitHub artwork, make hero details compact, and deliver an Android update inside the app over 1.00.55. No Windows publication.

## Implementation

- Existing `Resources/UI/Grimoire` kit: 65 runtime PNGs, original `.meta`/GUIDs retained. Manifest also mentions original SVG sources that are not Unity runtime resources; PNG validation deliberately covers runtime assets only.
- `LegacySessionPanel.ClassicSheet.cs`: graphite backdrop with user wallpaper preserved; phone header and fixed five-entry artwork/icon dock. Overflow retains Dice, Notes, Crafts, Lore/Bestiary, Data and Passport. Desktop navigation retained.
- `LegacySessionPanel.FrontEnd.cs`: reserves a distinct viewport above the dock, renders/commits the old page before deferred navigation, routes menu exits from overflow.
- `LegacySessionPanel.GrimoireDetails.cs`: removes duplicated drawer heading/explanation; one scrollable row of readable tabs; smaller profile rows; three-column stats and two-column saving throw controls on narrow screens. Subtab changes deferred until Layout and pending Android numeric input committed.
- `LegacySessionPanel.Touch.cs`: overflow disables paging of the hidden sheet, preventing a pending swipe animation from stranding the menu.
- Generated style cache resets every new Grimoire GUIStyle on theme changes. Resources-owned PNGs remain cached and are not destroyed.
- Includes upstream unpublished nine-slice fixes for portrait/health/XP and secondary detail-card artwork, already present in base78cd96b7.

## Verification observed

- Fresh verified public registries: full workshop harness **11523 checks PASS**. An initial run using an older cached registry failed `optional fantasy merchants coexist with five original libraries`; freshly fetched registry resolves that fixture mismatch.
- .NET: theme95, numeric input17, menu input50, speed display11, lifecycle3, sheet swipe191, character files/delete/backup/unknown-field preservation+Roslyn1781 PASS. Menu/swipe/character syntax checks repeated after the final overflow guard.
- Python: Grimoire details, UI theme, brand visuals, menu readability, update settings, Android publisher, preview, content,44-source provenance and10 cloud-release tests PASS.
-65PNG signatures and matching `.meta` files PASS. Independent static review found and resolved the overflow menu-exit defect; author additionally resolved hidden-page swipe capture.
- Added actual portrait evidence for overview, all four details pages and overflow to existing native Windows UI harness. Those captures are pending CI; no actual rendered UI claim is made from source checks. Existing later Windows tests still contain old classic HP coordinates/paper expectations.

## Delivery tracking

Final source: `35e1ed9696948ff63434d5c5c42f2cc5dddac2d5`.
Final candidate: https://github.com/waitermisanthrope-creator/DnD-VTT/actions/runs/43582205096 .
Android-only publisher: https://github.com/waitermisanthrope-creator/DnD-VTT/actions/runs/43582603729 .
Earlier candidate43581731230/source18185caa was superseded after the touch guard; do not publish it.

Android job132409575612 SUCCESS. Publisher43582603729/job132415142213 SUCCESS; feed activation9ef9185c. Independent normal/cache-busted public feeds both1.00.56/10056. Public APK independently downloaded:64134862bytes, SHA256 `e18bd36322dfc4e19c33b2a4252c717dd4011d07fe70864685b6d857a6d68353`; ZIP CRC, ARM64 IL2CPP, package/version, original signing certificate and16KB alignment PASS. Evidence: `MOBILE_GRIMOIRE_1.00.56_verification.json`. Owner informed the in-app update is available.

The earlier publisher43582256391 successfully uploaded the identical signed APK but its feed push was rejected by concurrent documentation commits. Final publisher43582603729 reverified that existing public APK and successfully activated the feed from the final checkout; no force-push or replacement APK bytes.

Windows build/GUI is still running as an independent validation, not a published installer. Physical Android testing belongs to owner.

## Native portrait review and follow-up57

Android delivered as above. Windows build132414963836 SUCCESS; native QA132416630877 produced actual GPU frames before failing its old `bundled paper is actually visible` expectation (observed graphite brightness0.05098, legacy threshold>0.08). This is not a complete GUI PASS. Six reviewed Grimoire frames are preserved in `evidence-1.00.56/`. They confirm the new artwork/dock/details and no measured button clipping, but exposed dark primary text, wrapped background caption and scrolled header positioning.57 fixes only those observed presentation issues, adds native primary contrast>=4.5/caption-width checks, and keeps data/gameplay intact. Owner informed56 remains available while57 is built.
