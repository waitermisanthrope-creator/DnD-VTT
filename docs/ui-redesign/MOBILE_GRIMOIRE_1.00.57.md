# Mobile Grimoire 1.00.57

Final visual follow-up to the owner's supplied phone reference. Version56 was delivered first; actual native portrait review then identified low-contrast primary text, a wrapped background caption and header drift during scrolling.57 fixes those observed issues without changing game rules, saves, wallet or native updater.

- Primary Grimoire artwork keeps its dark/gold appearance, using the same light foreground and compact Playfair typography as secondary sheet controls instead of the menu's black foreground.
- Profile caption width112px fits the96px “Предыстория” label; editable values and data contracts are unchanged.
- Phone header is drawn in fixed root coordinates, separate from the scroll viewport. Bottom artwork/icon dock remains fixed.
- Native UI smoke now checks primary foreground contrast>=4.5 and real allocated caption widths.

Source `adcf882bc29bf50854ab88ef8033bf1a1edc19ca`; candidate43585320337. Android job132418450415 SUCCESS, Windows build132423073746 SUCCESS. Actual native QA132424996067 rendered all six new portrait frames; reviewed originals are in `evidence-1.00.57/`. Primary contrast/caption width and no measured button clipping checks passed up to those frames. Header crop comparison across all six images has exactly zero pixel difference; `header-position.json` records the measurement. Portrait review confirms light active text, single-line background caption and fixed header.

The full legacy Windows GUI harness still FAILS its obsolete “bundled paper is actually visible” assertion: the intentional graphite brightness0.05098 is below the old paper threshold0.08. Do not claim the full Windows GUI suite passed. An existing initiative-button symbol still uses a font fallback; its action and caption remain readable. Physical Android interaction remains owner testing. Windows is not published.

## Delivered Android in-app update

Publisher43587801252/job132425956495 SUCCESS. Feed activation9941a9dc3e7abb6f59056e617ac5c80c36fa9327. Normal and cache-busted public feeds independently return1.00.57/10057 after the initial branch CDN cache expired. Public package independently downloaded:64138958bytes, SHA256 `90abed77ca847acc7cbd0280427cb67c726ef00973b73c34232c6384d134244c`. ZIP CRC, ARM64 IL2CPP, original signing certificate, package/version and16KB alignment PASS. Evidence: `MOBILE_GRIMOIRE_1.00.57_verification.json`.

Update from inside the app over1.00.55 or1.00.56; no uninstall or standalone Windows publication. Original user profiles were not used in QA. Owner informed final57 is available. Signed candidate was selected only after actual native frame review; all preceding documentation was committed before its single approval push. Physical Android testing remains the owner’s test session.
