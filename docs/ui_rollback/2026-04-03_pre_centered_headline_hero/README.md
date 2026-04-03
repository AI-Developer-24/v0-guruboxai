# UI Rollback Snapshot

Created on `2026-04-03` before the centered-headline hero redesign.

## Purpose

This snapshot preserves the current shared hero implementation and representative page visuals so we can restore the pre-redesign state if the next iteration is not accepted.

## Backed Up Files

- `components/marketing/marketing-sections.tsx`
- `components/marketing/marketing-page-templates.tsx`
- `components/layout/navbar.tsx`
- `components/layout/footer.tsx`
- `lib/marketing-content.ts`

These copies are stored in:

- `docs/ui_rollback/2026-04-03_pre_centered_headline_hero/files/`

## Visual References

Representative screenshots captured from the current implementation:

- `docs/ui_rollback/2026-04-03_pre_centered_headline_hero/screenshots/home-desktop-en.png`
- `docs/ui_rollback/2026-04-03_pre_centered_headline_hero/screenshots/home-mobile-en.png`
- `docs/ui_rollback/2026-04-03_pre_centered_headline_hero/screenshots/core-desktop-en.png`

## Restore Procedure

If we want to roll back to this snapshot, copy these files back into place:

1. `docs/ui_rollback/2026-04-03_pre_centered_headline_hero/files/marketing-sections.tsx` -> `components/marketing/marketing-sections.tsx`
2. `docs/ui_rollback/2026-04-03_pre_centered_headline_hero/files/marketing-page-templates.tsx` -> `components/marketing/marketing-page-templates.tsx`
3. `docs/ui_rollback/2026-04-03_pre_centered_headline_hero/files/navbar.tsx` -> `components/layout/navbar.tsx`
4. `docs/ui_rollback/2026-04-03_pre_centered_headline_hero/files/footer.tsx` -> `components/layout/footer.tsx`
5. `docs/ui_rollback/2026-04-03_pre_centered_headline_hero/files/marketing-content.ts` -> `lib/marketing-content.ts`

## Notes

- This is a local rollback checkpoint, not a clean git commit.
- The snapshot reflects the exact working files and page visuals immediately before the next redesign pass begins.
