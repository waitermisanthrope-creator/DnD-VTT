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
Android-only publisher: https://github.com/waitermisanthrope-creator/DnD-VTT/actions/runs/43582256391 .
Earlier candidate43581731230/source18185caa was superseded after the touch guard; do not publish it.

At this checkpoint signed build and publisher are pending. Live channel remains1.00.55 until publisher verifies actual Android job success, original certificate, package, version, architecture, alignment, size/hash and a public download. Independent public verifier is prepared at `/workspace/scratch/grimoire56-delivery/verify_public.py`. Physical Android testing belongs to owner; Windows is not published.
