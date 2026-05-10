## Snapshot

This snapshot records the marketing-page UI state before the Chinese typography refinement on May 10, 2026.

### Scope

- Marketing Chinese typography only
- Shared marketing hero, section, card, FAQ, navbar, and footer text treatment
- Product tool area intentionally excluded from this round

### Snapshot Files

- [app/globals.css](/Users/peak/Projects/GuruBoxAI/docs/ui_rollback/2026-05-10_pre_zh_marketing_typography/files/app/globals.css)
- [components/marketing/marketing-sections.tsx](/Users/peak/Projects/GuruBoxAI/docs/ui_rollback/2026-05-10_pre_zh_marketing_typography/files/components/marketing/marketing-sections.tsx)
- [components/marketing/marketing-page-templates.tsx](/Users/peak/Projects/GuruBoxAI/docs/ui_rollback/2026-05-10_pre_zh_marketing_typography/files/components/marketing/marketing-page-templates.tsx)
- [components/layout/navbar.tsx](/Users/peak/Projects/GuruBoxAI/docs/ui_rollback/2026-05-10_pre_zh_marketing_typography/files/components/layout/navbar.tsx)
- [components/layout/footer.tsx](/Users/peak/Projects/GuruBoxAI/docs/ui_rollback/2026-05-10_pre_zh_marketing_typography/files/components/layout/footer.tsx)

### Rollback

This snapshot is intended for manual restoration if the typography pass regresses the current Chinese marketing presentation.

The existing restore helper script does not fully cover this snapshot shape, so restoration for this round should be done by copying the saved files back into the matching project paths.
