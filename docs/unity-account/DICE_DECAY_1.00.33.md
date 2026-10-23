# [НЕ ВЫПОЛНЕНО] Unity1.00.33 — independent Abyss motion and dissipating slime

Owner correction after physical-device testing of32: repeated faces in multiple Abyss throws; slime must bounce from its original launch energy, not receive new timed kicks after settling. This report records work in progress. No33 APK or update-feed claim until actual paired candidate, installer QA and exact native render review succeed.

## Confirmed source issues and changes

- Abyss formerly used the same planar waveform plus vertex-index phase, a common incident-edge curl, and an index-ordered three-contact budget. Each die now has independently rotated rest curls around each vertex radial, independently sampled tangent frames, phases and incommensurate spatial frequencies. Uniform reservoir sampling chooses among eligible contact arms, avoiding first-vertex priority. Only genuine support contact can apply a bounded pre-result impulse. Lower skin still yields to support; accepted values remain immutable.
- Slime formerly injected repeated upward VelocityChange/torque for6.5seconds, prevented early locking for7.2seconds and moved accepted bodies in perpetual decorative hops. These mechanisms are removed. Low damping and restitution produce collision-driven energy loss; jelly deformation decays after settlement. No exact bounce count is forced: shape, initial rotation, other bodies and tower impacts affect the number.
- Ordinary launch increased2.2→5 world units; tower launch increased1.5units. Camera and invisible containment follow the larger arc. Clear-space retry selection remains; tower anti-stuck guidance remains limited to raised static supports.
- Existing numbered1.2.1 texture payloads, profiles, package IDs, character saves and input-sensor lifecycle are retained. Legacy1.0/1.1 recipes remain compatible.

## Verification plan / honest boundaries

Local4398C# checks,12Python unit tests,2render activation boundary tests and3structural contracts PASS. Actual Unity compilation/PhysX/GPU/Android/Windows install checks are pending at this checkpoint. Candidate39945776162, source a80bfdec24d667f725fbcfff8a9b7a69803055bf; feed still32.

Native regressions add600seeded Abyss d20 results, full20-bin histogram and a gross-bias rejection threshold (absent faces or ≥90/600 for one face). This does not prove mathematical fairness. Slime checks actual downward/upward collision transitions, bounded original mechanical energy and stationary accepted body positions. Existing all-shape,20-body, tower landing, opaque-shell, exterior UV, glyph and cleanup gates remain.

Physical phone remains unavailable here. Real perceived bounce cadence, asymmetry and motion/performance require owner verification after a confirmed release. Do not represent synthetic sensor or Linux Editor tests as device tests. MMO WAIT_TEAM; workshop page-reset fix remains owner-deferred. No production Supabase/main-stable changes.
