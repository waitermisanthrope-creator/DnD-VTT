# Mobile Grimoire 1.00.56 implementation plan

**Goal:** Match the owner's supplied right-hand phone reference using existing GitHub Grimoire assets; compact hero details; deliver an Android in-app update newer than 1.00.55.
**Architecture:** Extend the existing LegacySessionPanel IMGUI partials. Retain JSON, save/keyboard, wallet and game-rule contracts. Work on experiment/unity-vtt; use existing signed candidate and Android-only publisher.
**Design:** Graphite background, fixed five-entry icon dock with overflow for remaining pages, compact header; one row of detail tabs, reduced repeated headings and profile spacing. Desktop keeps its existing navigation. Use existing nine-slice resources, never destroy Resources-owned images; preserve user-selected wallpaper/accent.
**Approaches:** Continue the existing Grimoire integration (chosen by implementer from owner's reference and explicit implementation request); replacing the UI framework would add migration risk without helping this update.

- [x] Verify existing asset provenance, current 1.00.55 channel, and source contracts.
- [x] In ClassicSheet.cs and FrontEnd.cs connect graphite, phone dock/header and existing destinations. In GrimoireDetails.cs compact tabs/rows; keep numeric keyboard commits.
- [x] Update current source contract and actual portrait evidence in DesktopUiSmoke.cs. Regenerate GUI style cache; run theme, branding, input, save and Roslyn checks.
- [ ] Review diff, prepare candidate 1.00.56 with existing pipeline, inspect native outputs. Keep known legacy Windows smoke limitations explicit.
- [ ] Publish verified signed Android via separate approval commit; independently verify public manifest, downloaded APK/hash/package/signature. No Windows publication.

Review focus: 360–440 logical-pixel phones; long names; overflow reachability; pending numeric input on navigation; theme/lifecycle cache resets. Android physical-device testing remains with owner.

Evidence: fresh catalog workshop run PASS 11523 checks; old cached registry failed its optional-merchants fixture and was replaced. Candidate43581731230, source18185caa0d0511ab3114440acceac2941634ac5a. Local .NET theme95/numeric17/menu50/hero11/lifecycle3/swipe191/delete1781 and Python contracts PASS. Native builds pending.
