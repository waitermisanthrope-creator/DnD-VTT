# Exact WebView clone — correction of rejected redesign

Owner explicitly rejects the previous redesigned sheet and asks identical fonts, colors,
positions and necessary buttons. Decisions delegated; no additional design approval.
Both readonly Explorer/QA reports received before implementation. Existing IMGUI and stores.

Reference: index.html469–619, app/styles.css, Settings.js dynamic font/theme overrides.
Default font Playfair Display (not Inter), orange theme, screenshot with the actual font
loaded locally. Compare same synthetic hero and440×900/1280×900 viewport. Record computed
styles and rects; do not claim pixel parity from source assertions.

- Bundle licensed original Playfair Display (SIL OFL, google/fonts), offline regular/bold.
- Replace invented hero summary and Edit button with original fields/order, gold XP action.
- Return vertical cards,2-column stats,3-column combat; no separate initiative cell button,
  no added damage/heal row. Keep art access through the portrait itself, no permanent extra
  row; existing data/settings/import actions remain reachable without creating stores.
- Match measured CSS values rather than uniformly enforcing44px on every dense field.
  Preserve touch targets for important controls where source has them; report differences.
- Match font, colors, flat nav abbreviations and spacing; preserve unknown fields/save/.bak.
- Update existing runtime smoke to test retained real controls, render purity, saved edit,
  loaded font and matching viewport; inspect paired full-size screenshots. Targeted tests,
  both define compiles, full relevant regression before commit. Native/physical Android limits.

This is not a full class-mechanics port. Unsupported race/class mechanics must not be
made into unsafe visual-only buttons. Never call a partial visual match an exact clone.
