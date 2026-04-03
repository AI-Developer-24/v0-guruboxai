# Multilingual SEO Execution Plan

Last updated: 2026-04-02
Status: In progress
Owner: Codex + User

## Purpose

This document is the source of truth for the multilingual SEO rollout.

It exists to prevent:
- scope drift
- memory drift
- inconsistent implementation decisions
- long, risky batches of work

All future implementation should follow this document unless we explicitly update it.

## Confirmed Decisions

1. Locale SEO paths use `/en` and `/zh` first.
2. Root `/` acts as the `x-default` entry and can default to the English experience.
3. English and Chinese are implemented first.
4. The remaining SEO locales are implemented only after the English and Chinese rollout is complete and verified.
5. All currently supported languages should eventually get SEO pages:
   - `en`
   - `zh`
   - `de`
   - `fr`
   - `it`
   - `es`
   - `pt`
6. Public marketing copy must not promise `300` opportunities.
7. Public marketing copy should use a safer phrasing such as `20+ evaluated opportunities`.
8. Private app pages remain non-indexable:
   - `/analysis/*`
   - `/report/*`
   - `/account`
   - auth-related pages

## Final Page Inventory

There are 6 marketing page groups.

### Page groups

1. Homepage
2. AI Startup Idea Generator
3. SaaS Idea Validation
4. AI Business Opportunity Analysis
5. Example: AI Tools for Freelancers
6. Example: AI Tools for Small Businesses

### Phase 1 inventory: English + Chinese

12 SEO pages total:

1. `/en`
2. `/zh`
3. `/en/ai-startup-idea-generator`
4. `/zh/ai-startup-idea-generator`
5. `/en/saas-idea-validation`
6. `/zh/saas-idea-validation`
7. `/en/ai-business-opportunity-analysis`
8. `/zh/ai-business-opportunity-analysis`
9. `/en/examples/ai-tools-for-freelancers`
10. `/zh/examples/ai-tools-for-freelancers`
11. `/en/examples/ai-tools-for-small-business`
12. `/zh/examples/ai-tools-for-small-business`

### Final inventory: all locales

42 SEO pages total:

- 6 page groups
- 7 locales
- `6 x 7 = 42`

The root `/` is an entry route, not counted as a locale SEO page.

## Execution Rules

1. Work must be done in small, independently verifiable steps.
2. Each step should solve one narrow problem where possible.
3. A step should not begin until the previous step's verification passes.
4. English and Chinese are the only locales in the first implementation pass.
5. Remaining locales are deferred until the first pass is complete and validated.
6. New public pages must use reusable marketing templates and shared content configuration.
7. Private pages must never appear in the sitemap.
8. `noindex` pages must not rely on `robots.txt` blocking for exclusion.

## Terminology Rules

These rules apply to public marketing copy:

- Use `20+ evaluated opportunities` instead of `300 opportunities`.
- Do not overstate product output unless implementation behavior is verified.
- Keep each page focused on a single primary intent.
- Avoid direct mechanical translation between English and Chinese.
- Future locale expansions should be localized, not merely translated.

## Phased Plan

## Stage A: Scope Freeze

### A1. Lock page matrix

Status: Completed

Tasks:
- define all page groups
- define all locale variants
- define primary CTA and secondary CTA for each page
- define whether each route is indexable

Deliverables:
- page matrix
- locale route table

Artifacts:
- `docs/seo_page_matrix.md`

Verification:
- every public page has a unique URL
- every English page has a Chinese counterpart
- total English + Chinese public pages equals 12

### A2. Lock indexing boundaries

Status: Completed

Tasks:
- list all public SEO pages
- list all private non-index pages
- define sitemap inclusion rules

Deliverables:
- indexing boundary checklist

Artifacts:
- `docs/seo_indexing_boundaries.md`

Verification:
- private routes are fully listed
- public routes are fully listed
- there is no overlap

### A3. Lock content constraints

Status: Completed

Tasks:
- freeze the `20+` opportunities wording
- define homepage vs core page vs example page messaging boundaries
- define English and Chinese terminology

Deliverables:
- terminology glossary
- public content rules

Artifacts:
- `docs/seo_content_constraints.md`

Verification:
- no public copy uses hardcoded `300`
- messaging between page types is clearly separated

## Stage B: Bilingual Technical SEO Foundation

### B1. Build locale routing skeleton

Status: Completed

Tasks:
- add locale-aware public route structure
- support `en` and `zh`

Deliverables:
- locale route skeleton

Artifacts:
- `lib/seo/locales.ts`
- `components/marketing/route-scaffold-page.tsx`
- `app/[locale]/layout.tsx`
- `app/[locale]/page.tsx`
- `app/[locale]/ai-startup-idea-generator/page.tsx`
- `app/[locale]/saas-idea-validation/page.tsx`
- `app/[locale]/ai-business-opportunity-analysis/page.tsx`
- `app/[locale]/examples/ai-tools-for-freelancers/page.tsx`
- `app/[locale]/examples/ai-tools-for-small-business/page.tsx`
- `app/page.tsx`

Verification:
- `/en` renders
- `/zh` renders
- unsupported locale handling is defined

### B2. Add locale metadata helper

Status: Completed

Tasks:
- centralize title generation
- centralize description generation
- centralize canonical generation
- centralize Open Graph and Twitter metadata

Deliverables:
- metadata helper

Artifacts:
- `lib/seo/metadata.ts`
- `lib/seo/locales.ts`
- `app/layout.tsx`
- `app/[locale]/page.tsx`
- `app/[locale]/ai-startup-idea-generator/page.tsx`
- `app/[locale]/saas-idea-validation/page.tsx`
- `app/[locale]/ai-business-opportunity-analysis/page.tsx`
- `app/[locale]/examples/ai-tools-for-freelancers/page.tsx`
- `app/[locale]/examples/ai-tools-for-small-business/page.tsx`

Verification:
- metadata can be generated per locale and per page slug
- repeated metadata logic is removed from individual pages

### B3. Add `lang` and `hreflang`

Status: Completed

Tasks:
- output correct page language
- output reciprocal `hreflang`
- output `x-default`

Deliverables:
- locale metadata expansion

Artifacts:
- `lib/seo/locales.ts`
- `lib/seo/metadata.ts`
- `middleware.ts`
- `app/layout.tsx`

Verification:
- `/en/...` outputs English language metadata
- `/zh/...` outputs Chinese language metadata
- page source contains reciprocal alternate references

### B4. Add `robots.txt`

Status: Completed

Tasks:
- expose robots file
- allow crawling of public pages

Deliverables:
- `app/robots.ts`

Artifacts:
- `app/robots.ts`
- `lib/seo/metadata.ts`

Verification:
- `/robots.txt` returns 200
- content matches expected policy

### B5. Add sitemap

Status: Completed

Tasks:
- generate sitemap for public SEO pages
- include only English and Chinese in the first pass

Deliverables:
- `app/sitemap.ts`

Artifacts:
- `app/sitemap.ts`
- `lib/seo/metadata.ts`

Verification:
- `/sitemap.xml` returns 200
- contains only public pages
- excludes all private pages

### B6. Add `noindex` to private pages

Status: Completed

Tasks:
- add `noindex` metadata to private areas

Deliverables:
- private page metadata updates

Artifacts:
- `lib/seo/metadata.ts`
- `app/account/layout.tsx`
- `app/analysis/layout.tsx`
- `app/report/layout.tsx`
- `app/auth/layout.tsx`
- `app/privacy/layout.tsx`
- `app/terms/layout.tsx`
- `app/tools/product-insight/layout.tsx`

Verification:
- private page source contains `noindex`
- private pages are absent from sitemap

### B7. Reduce middleware scope

Status: Completed

Tasks:
- restrict auth middleware to private app areas
- avoid unnecessary auth work on public SEO pages

Deliverables:
- middleware matcher update

Artifacts:
- `middleware.ts`

Verification:
- public pages load without auth checks
- private pages remain protected

## Stage C: Marketing Component System

### C1. Create marketing templates

Status: Completed

Tasks:
- create homepage template
- create core landing template
- create public example template

Deliverables:
- reusable marketing template components

Artifacts:
- `components/marketing/marketing-page-templates.tsx`
- `components/marketing/route-scaffold-page.tsx`
- `app/[locale]/page.tsx`
- `app/[locale]/ai-startup-idea-generator/page.tsx`
- `app/[locale]/saas-idea-validation/page.tsx`
- `app/[locale]/ai-business-opportunity-analysis/page.tsx`
- `app/[locale]/examples/ai-tools-for-freelancers/page.tsx`
- `app/[locale]/examples/ai-tools-for-small-business/page.tsx`

Verification:
- each template renders independently
- templates are not page-specific

### C2. Create content configuration layer

Status: Completed

Tasks:
- move marketing copy into content config
- support `en` and `zh`

Deliverables:
- marketing content configuration

Artifacts:
- `lib/marketing-content.ts`
- `components/marketing/route-scaffold-page.tsx`
- `components/marketing/marketing-page-templates.tsx`
- `app/[locale]/page.tsx`
- `app/[locale]/ai-startup-idea-generator/page.tsx`
- `app/[locale]/saas-idea-validation/page.tsx`
- `app/[locale]/ai-business-opportunity-analysis/page.tsx`
- `app/[locale]/examples/ai-tools-for-freelancers/page.tsx`
- `app/[locale]/examples/ai-tools-for-small-business/page.tsx`

Verification:
- layout can change independently of content
- locale content can be swapped without changing structure

### C3. Create reusable sections

Status: Completed

Tasks:
- hero
- proof strip
- feature grid
- process steps
- example preview
- FAQ
- CTA banner
- locale switcher

Deliverables:
- reusable marketing section library

Artifacts:
- `components/marketing/marketing-sections.tsx`
- `components/marketing/marketing-page-templates.tsx`
- `components/marketing/route-scaffold-page.tsx`

Verification:
- each section renders independently
- mobile and desktop layouts are both acceptable
- locale switcher renders on active marketing pages
- production build completes after section extraction

## Stage D: English + Chinese Page Generation

### D1. Generate bilingual homepage

Status: Completed

Tasks:
- build `/en`
- build `/zh`

Artifacts:
- `lib/marketing-content.ts`
- `components/marketing/marketing-sections.tsx`
- `components/marketing/marketing-page-templates.tsx`

Verification:
- one H1 per page
- clear CTA above the fold
- links to core pages and example pages exist
- `/en` and `/zh` both render homepage-specific localized copy
- homepage cards link to all 3 core pages and both public example pages

### D2. Generate bilingual AI Startup Idea Generator page

Status: Completed

Tasks:
- build English page
- build Chinese page

Artifacts:
- `lib/marketing-content.ts`
- `components/marketing/marketing-page-templates.tsx`

Verification:
- page intent is focused on idea generation with evaluation
- includes example input and output
- includes FAQ and CTA
- `/en/ai-startup-idea-generator` renders route-specific generator copy
- `/zh/ai-startup-idea-generator` renders route-specific generator copy

### D3. Generate bilingual SaaS Idea Validation page

Status: Completed

Tasks:
- build English page
- build Chinese page

Artifacts:
- `lib/marketing-content.ts`

Verification:
- page intent is focused on validation
- page is clearly differentiated from the generator page
- `/en/saas-idea-validation` renders route-specific validation copy
- `/zh/saas-idea-validation` renders route-specific validation copy
- both pages include example input/output, FAQ, and CTA

### D4. Generate bilingual AI Business Opportunity Analysis page

Status: Completed

Tasks:
- build English page
- build Chinese page

Artifacts:
- `lib/marketing-content.ts`

Verification:
- page intent is focused on business opportunity analysis
- page is clearly differentiated from the other two core pages
- `/en/ai-business-opportunity-analysis` renders route-specific analysis copy
- `/zh/ai-business-opportunity-analysis` renders route-specific analysis copy
- both pages include example input/output, FAQ, and CTA

### D5. Generate bilingual freelancers example page

Status: Completed

Tasks:
- turn the freelancers sample route into a production-ready public report
- localize opportunity labels and CTA paths for English and Chinese
- align the sample page hero with real public-report positioning

Artifacts:
- `components/marketing/marketing-sections.tsx`
- `components/marketing/marketing-page-templates.tsx`
- `lib/marketing-content.ts`

Verification:
- `npm run build` passes
- `/en/examples/ai-tools-for-freelancers` renders production copy and uses real CTA paths
- `/zh/examples/ai-tools-for-freelancers` renders production copy and localized labels
- browser-level screenshots confirm the page matches the existing visual language on desktop and mobile
- the page contains ranked opportunities, scenario context, and a closing CTA instead of scaffold content

### D6. Generate bilingual small business example page

Status: Completed

Tasks:
- turn the small-business sample route into a production-ready public report
- differentiate the page from the freelancers sample with owner-led revenue and operations framing
- localize CTA paths and Chinese terminology for an outward-facing release

Verification:
- `npm run build` passes
- `/en/examples/ai-tools-for-small-business` renders production content and real CTA paths
- `/zh/examples/ai-tools-for-small-business` renders localized production content and Chinese CTA paths
- browser-level screenshots confirm the page matches the existing visual system on desktop and mobile
- the page is meaningfully different from the freelancers sample and centers revenue recovery, scheduling, and cash-flow workflow pain

## Stage E: Site Wiring and First-Pass Validation

### E1. Update navigation

Status: Completed

Tasks:
- add route-aware public navigation for SEO pages
- add path-based locale switching for `/en` and `/zh`
- preserve the existing product/app account and login behavior outside marketing routes

Artifacts:
- `components/layout/navbar.tsx`

Verification:
- `npm run build` passes
- `/en` renders public navigation links, locale switching, and marketing CTA
- `/zh` renders the same navigation structure with localized labels such as `首页` and `登录`
- `/tools/product-insight` keeps the product-style navbar instead of the public SEO navigation
- all public destinations are reachable
- switching locale lands on the correct counterpart page

### E2. Update footer

Status: Completed

Tasks:
- add a route-aware public footer for marketing pages
- add grouped links for product pages, public examples, and company/legal pages
- preserve the simpler app footer outside marketing routes

Artifacts:
- `components/layout/footer.tsx`
- `lib/seo/marketing-shell.ts`
- `components/layout/navbar.tsx`

Verification:
- `npm run build` passes
- `/en` renders a public footer with product, examples, and company groupings plus locale switching
- `/zh` renders the same footer structure with localized labels such as `产品`, `样例`, and `公司`
- `/tools/product-insight` stays on the lighter app footer path instead of using the public marketing footer
- public footer links cover the six English and Chinese SEO destinations without removing legal links

### E3. Add internal linking

Status: Completed

Tasks:
- homepage links to core pages and example pages
- core pages link to homepage and example pages
- example pages link to homepage and core pages

Artifacts:
- `components/marketing/marketing-page-templates.tsx`
- `lib/marketing-content.ts`

Verification:
- `npm run build` passes after adding related-page sections to core and example templates
- homepage content continues to link to all core pages and both public example pages
- core pages now render a dedicated related-pages section linking back to the homepage, a sibling workflow, and a public sample report
- example pages now render a dedicated related-pages section linking back to the homepage and into the most relevant workflow pages
- no public page relies on navbar or footer links alone to connect back into the rest of the public site

### E4. Run first-pass local SEO validation

Status: Completed

Tasks:
- inspect metadata
- inspect canonical
- inspect `hreflang`
- inspect `robots.txt`
- inspect `sitemap.xml`
- inspect `noindex`

Deliverables:
- `docs/seo_local_validation_checklist.md`

Verification:
- `npm run build` passes
- runtime spot-check on `/en` confirms localized title, description, canonical, and `hreflang` alternates
- source audit confirms locale-aware `<html lang>` handling through middleware headers and the root layout
- `app/robots.ts` emits crawler rules plus sitemap and host values
- `app/sitemap.ts` emits only the first 12 public bilingual SEO pages
- private and non-SEO routes continue to use `buildNoIndexMetadata(...)`

Notes:
- canonical, Open Graph URL, and alternates still resolve from the current local site URL configuration, so deployment must set the final HTTPS `NEXT_PUBLIC_APP_URL`
- existing production environment warnings around `NEXT_PUBLIC_APP_URL`, `NEXTAUTH_URL`, and `REDIS_URL` remain unresolved and must be fixed before launch

## Stage F: Remaining Locale Expansion

This stage only starts after Stages A through E are complete and verified.

### F1. Expand content configuration for remaining locales

Status: Completed

Locales:
- `de`
- `fr`
- `it`
- `es`
- `pt`

Tasks:
- extend locale utilities to understand all 7 SEO locales
- add prepared metadata coverage for all 6 page groups in the remaining 5 locales
- add prepared marketing content coverage for the remaining 5 locales while keeping public rollout limited to English and Chinese

Artifacts:
- `lib/seo/locales.ts`
- `lib/seo/metadata.ts`
- `lib/marketing-content.ts`

Verification:
- `npm run build` passes
- locale utilities now cover `en`, `zh`, `de`, `fr`, `it`, `es`, and `pt`
- metadata records now exist for all 6 marketing page groups in the remaining 5 locales
- marketing content now includes locale-specific shared actions and page-level hero copy for the remaining 5 locales
- non-active locales safely fall back to the existing English body content until the rollout step that opens the remaining locale routes

Notes:
- active public rollout remains intentionally limited to `en` and `zh` in this step
- `hreflang`, sitemap inclusion, and route activation for the remaining locales are still deferred to `F2` through `F4`

### F2. Generate remaining 30 marketing pages

Status: Completed

Tasks:
- open the remaining 5 locale routes for all 6 marketing page groups
- replace the non-English body fallback with full locale content for `de`, `fr`, `it`, `es`, and `pt`
- keep the visual system, templates, and CTA structure aligned with the English and Chinese rollout

Artifacts:
- `app/[locale]/layout.tsx`
- `app/[locale]/page.tsx`
- `app/[locale]/ai-startup-idea-generator/page.tsx`
- `app/[locale]/saas-idea-validation/page.tsx`
- `app/[locale]/ai-business-opportunity-analysis/page.tsx`
- `app/[locale]/examples/ai-tools-for-freelancers/page.tsx`
- `app/[locale]/examples/ai-tools-for-small-business/page.tsx`
- `components/layout/navbar.tsx`
- `components/layout/footer.tsx`
- `components/marketing/marketing-sections.tsx`
- `components/marketing/marketing-page-templates.tsx`
- `lib/seo/locales.ts`
- `lib/seo/marketing-shell.ts`
- `lib/marketing-content.ts`
- `lib/marketing-content-template-eu.ts`
- `lib/marketing-content-core-eu.ts`
- `lib/marketing-content-example-eu.ts`

Verification:
- `npm run build` passes
- Next generates the full 59-route production build with the remaining locale marketing routes included
- locale marketing navigation, footer links, and language switchers now resolve across all 7 locales
- internal marketing links localize correctly for the remaining locale routes
- representative runtime spot-check confirmed fully localized German marketing output instead of English body fallback
- remaining locale content is now loaded from dedicated locale content modules instead of English-only body scaffolds

Notes:
- `hreflang` and sitemap rollout for the remaining locales still intentionally wait for `F3` and `F4`
- production environment warnings remain unchanged and still need deployment-side cleanup:
  - `NEXT_PUBLIC_APP_URL` should use HTTPS
  - `NEXTAUTH_URL` should use HTTPS
  - `REDIS_URL` should use `rediss://`

### F3. Expand `hreflang` to all locales

Status: Completed

Tasks:
- add reciprocal alternate mappings across all 7 locales

Artifacts:
- `lib/seo/metadata.ts`

Verification:
- `npm run build` passes after switching alternate generation from the active rollout locales to all 7 SEO locales
- `buildMarketingMetadata()` now emits alternates for `en`, `zh`, `de`, `fr`, `it`, `es`, and `pt`
- `x-default` remains pinned to root `/`

Notes:
- local runtime verification on non-English pages was partially blocked by unstable localhost responses during this pass
- the metadata generation path is now wired to all locales in code and validated through production build success

### F4. Expand sitemap to all locales

Status: Completed

Tasks:
- include all 42 public SEO pages

Artifacts:
- `app/sitemap.ts`
- `.next/server/app/sitemap.xml.body`

Verification:
- `npm run build` passes
- generated sitemap now contains 42 public locale marketing URLs
- generated sitemap alternates now include `en`, `zh`, `de`, `fr`, `it`, `es`, and `pt`
- no private pages are present in `.next/server/app/sitemap.xml.body`

### F5. Run multilingual validation

Status: Completed

Tasks:
- sample-check metadata
- sample-check canonical
- sample-check `hreflang`
- sample-check layout

Artifacts:
- `scripts/validate_multilingual_seo.ts`
- `.next/server/app/sitemap.xml.body`

Verification:
- `./node_modules/.bin/tsx --env-file=.env.local scripts/validate_multilingual_seo.ts` passes
- multilingual validation script now checks 210 rules across 7 locales and 6 page groups
- no locale points canonical to the wrong language page
- no broken alternate mappings remain in the metadata generation path
- locale marketing links no longer point back to `/en/...` for non-English pages
- content-shape checks confirm that home, core, and example templates remain structurally complete across all locales

Notes:
- localhost runtime spot-checking remained flaky in this environment, so the final acceptance step relied on deterministic source-level and build-level validation
- rerun the validation script after future SEO-content edits before shipping multilingual changes

## Stage G: Launch and Measurement Preparation

### G1. Prepare Search Console submission checklist

Status: Pending

Tasks:
- prepare sitemap submission checklist
- prepare URL Inspection target list

Verification:
- launch checklist is ready to use without further planning

### G2. Prepare measurement plan

Status: Pending

Tasks:
- define what to monitor after launch
- define what actions correspond to common signals

Suggested metrics:
- indexed pages
- impressions
- clicks
- CTR
- landing-to-CTA click rate
- CTA-to-login rate
- login-to-analysis-start rate

Verification:
- post-launch tracking and iteration rules are clearly defined

## Current Execution Order

1. A1
2. A2
3. A3
4. B1
5. B2
6. B3
7. B4
8. B5
9. B6
10. B7
11. C1
12. C2
13. C3
14. D1
15. D2
16. D3
17. D4
18. D5
19. D6
20. E1
21. E2
22. E3
23. E4
24. F1
25. F2
26. F3
27. F4
28. F5
29. G1
30. G2

## Change Control

If scope changes later:

1. update this document first
2. confirm the change explicitly
3. only then update implementation

If implementation differs from plan:

1. stop
2. document the mismatch
3. confirm the correction before continuing

## Notes

- This plan intentionally favors small, independently verifiable steps.
- English and Chinese are the first implementation milestone.
- The remaining locales are intentionally deferred to reduce initial failure risk.
