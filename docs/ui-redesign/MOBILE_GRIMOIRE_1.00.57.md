# Mobile Grimoire 1.00.57

Final visual follow-up to the owner's supplied phone reference. Version56 was delivered first; actual native portrait review then identified low-contrast primary text, a wrapped background caption and header drift during scrolling.57 fixes those observed issues without changing game rules, saves, wallet or native updater.

- Primary Grimoire artwork keeps its dark/gold appearance, using the same light foreground and compact Playfair typography as secondary sheet controls instead of the menu's black foreground.
- Profile caption width112px fits the96px “Предыстория” label; editable values and data contracts are unchanged.
- Phone header is drawn in fixed root coordinates, separate from the scroll viewport. Bottom artwork/icon dock remains fixed.
- Native UI smoke now checks primary foreground contrast>=4.5 and real allocated caption widths.

Source `adcf882bc29bf50854ab88ef8033bf1a1edc19ca`; candidate43585320337. Android job132418450415 SUCCESS, Windows build132423073746 SUCCESS. Actual native QA132424996067 rendered all six new portrait frames; reviewed originals are in `evidence-1.00.57/`. Primary contrast/caption width and no measured button clipping checks passed up to those frames. Header crop comparison across all six images has exactly zero pixel difference; `header-position.json` records the measurement. Portrait review confirms light active text, single-line background caption and fixed header.

The full legacy Windows GUI harness still FAILS its obsolete “bundled paper is actually visible” assertion: the intentional graphite brightness0.05098 is below the old paper threshold0.08. Do not claim the full Windows GUI suite passed. An existing initiative-button symbol still uses a font fallback; its action and caption remain readable. Physical Android interaction remains owner testing. Windows is not published.

Android-only publication is pending the existing publisher and independent public verifier. The signed candidate is selected only after native frame review; all reports are committed before the one approval push to avoid the earlier56 concurrent-docs/feed race. Independent verifier: `/workspace/scratch/grimoire57-delivery/verify_public.py`.
