# UI Rollback Snapshot

Snapshot name: `2026-04-03_pre_premium_refinement`

Purpose:
- Preserve the current accepted marketing-page UI before the next premium-style refinement pass.
- Allow immediate rollback if a new design iteration looks worse.

Rollback trigger phrase:
- `回滚到高级感快照`

When that phrase appears, restore these files from `files/`:
- `components/marketing/marketing-sections.tsx`
- `components/marketing/marketing-page-templates.tsx`
- `lib/marketing-content.ts`
- `lib/marketing-content-core-eu.ts`
- `lib/marketing-content-example-eu.ts`
- `lib/marketing-content-template-eu.ts`
- `components/layout/navbar.tsx`
- `components/layout/footer.tsx`
- `app/globals.css`

Reference screenshot:
- `screenshots/home-en-current.png`

Restore helper:
- `scripts/restore_ui_snapshot.sh 2026-04-03_pre_premium_refinement`
