# SEO Round 2 Execution Plan

Last updated: 2026-05-07
Status: Batch 4 completed, launch-prep hardening completed, live verification found production is still on an older rollout
Owner: Codex + User

## Purpose

This document is the source of truth for the next SEO iteration.

Round 2 is not about basic indexability. It is about:
- hardening technical SEO
- improving the completeness and competitiveness of existing indexed pages
- defining the next content-cluster expansion before implementation

## Confirmed Decisions

1. Root `/` is a user entry route, not a core index target.
2. `x-default` should point to `/en` for now.
3. Root `/` should auto-route users by browser language and saved preference when possible.
4. Locale pages such as `/en/...` and `/zh/...` must remain stable, directly crawlable URLs.
5. Existing 6 marketing page groups remain published in 7 locales:
   - `en`
   - `zh`
   - `de`
   - `fr`
   - `it`
   - `es`
   - `pt`
6. New SEO content in this round launches in `en` and `zh` first.
7. New pages must be defined by page role first:
   - page purpose
   - search intent
   - structure
   - content form
   - CTA
   - visual direction
8. New content priority order is:
   1. use case
   2. how-to
   3. comparison
   4. public examples
9. This round should execute Phase 0, Phase 1, and Phase 2 first.

## Round 2 Goals

1. Eliminate technical SEO ambiguity in canonical, site URL, and locale behavior.
2. Add missing semantic signals such as JSON-LD and richer metadata validation.
3. Strengthen the 6 existing public page groups so they better satisfy search intent and CTR expectations.
4. Define the next content-cluster inventory before implementation begins.

## Scope

### In scope now

- Phase 0 decision freeze
- Phase 1 technical SEO hardening
- Phase 2 existing page strengthening
- Phase 3 page-definition framework only

### Not in scope yet

- bulk creation of new cluster pages
- mass multilingual rollout for new pages beyond `en` and `zh`
- app/product workflow changes unrelated to SEO
- full lifecycle product analytics beyond the first started analysis

## Progress Snapshot

- Phase 0 is complete.
- Phase 1 is complete:
  - locale entry and `x-default` responsibilities are split
  - root `/` now routes by browser language or saved locale preference
  - locale preference is persisted in a server-readable cookie
  - `x-default` now resolves to `/en`
  - structured data now ships on homepage, core pages, and sample pages
  - the SEO validation script now checks locale alternates, `x-default`, structured data, metadata ranges, OG/Twitter image presence, and noindex coverage
- Phase 2 has started:
  - metadata ranges and distinctness are being tightened across published locales
  - core landing pages now include a clearer “best fit / not for / use it when” section
  - English and Chinese core pages now cover stronger search-intent FAQs, including why the workflow is more useful than a generic ChatGPT prompt
  - English and Chinese homepages now explain when the homepage is the right public entry route
  - English and Chinese public sample pages now explain how to use samples to judge output quality before logging in
  - public sample pages now ship FAQ blocks across published locales, and sample-page structured data now includes `FAQPage` alongside `BreadcrumbList`
- Phase 3 definition work is complete for the initial rollout:
  - the first four use-case page-definition cards are drafted for recruiters, agencies, ecommerce operators, and consultants
  - the first three how-to page-definition cards are drafted for startup-idea validation, opportunity prioritization, and AI SaaS wedge discovery
  - the first three comparison page-definition cards are drafted for ChatGPT, manual market research, and idea-generator versus opportunity-analysis evaluation
  - the first four public-example expansion page-definition cards are drafted for recruiters, agencies, ecommerce operations, and customer support operations
  - a rollout-priority document now orders the first 14 new pages into implementation batches, locale rollout phases, and internal-link dependencies
- Batch 1 implementation has started:
  - four new Batch 1 pages are now implemented in `en` and `zh`
  - the new routes cover:
    - `guides/how-to-validate-an-ai-startup-idea`
    - `comparisons/badgersignal-vs-chatgpt-for-startup-idea-validation`
    - `use-cases/ai-tools-for-recruiters`
    - `examples/ai-tools-for-recruiters`
  - marketing-page locale publishing is now page-specific, so new Batch 1 pages publish only in `en` and `zh` while existing six page groups remain published in all 7 locales
  - sitemap, alternates, route localization, and local SEO validation now respect per-page locale rollout
  - local SEO validation currently passes 564 checks across 50 published locale-page combinations and 10 page groups
  - runtime QA confirmed that unpublished locales for Batch 1 pages return `404` as intended
  - runtime QA also caught and fixed a real locale-content bug on `/en/examples/ai-tools-for-recruiters`, where the page shell was English but the body content and CTAs were still Chinese
  - existing generator, validation, and sample pages now route more naturally into the Batch 1 guide, comparison, and recruiter sample pages so the new cluster has stronger in-site discovery
- Batch 2 implementation has now started:
  - four new Batch 2 pages are now implemented in `en` and `zh`
  - the new routes cover:
    - `guides/how-to-prioritize-ai-business-opportunities`
    - `comparisons/badgersignal-vs-manual-market-research`
    - `use-cases/ai-tools-for-agencies`
    - `examples/ai-tools-for-agencies`
  - local SEO validation now passes 652 checks across 58 published locale-page combinations and 14 page groups
  - runtime QA confirmed the new Batch 2 routes render in the intended published locales and that unpublished locales such as `/de/use-cases/ai-tools-for-agencies` return `404`
  - no mixed-locale regression was found on the new Batch 2 pages during runtime spot checks
  - existing opportunity-analysis and small-business sample pages now link more directly into the Batch 2 prioritization guide, manual-research comparison, and agency sample pages, so the new cluster has stronger discovery from older public pages
- Batch 3 implementation is now complete:
  - existing generator, opportunity-analysis, and small-business sample pages now include stronger related-link paths into the Batch 3 wedge guide, workflow comparison, and ecommerce sample pages
  - runtime QA caught a real content-wiring bug on the new Batch 3 core pages: the route-specific long-form content had been attached to the wrong template branch, which caused generic scaffold copy and mixed-locale output at runtime
  - the Batch 3 core-page content is now sourced from a dedicated override layer, and runtime verification confirmed the English wedge guide and ecommerce use-case pages now render route-specific English body copy again
  - unpublished locales such as `/de/use-cases/ai-tools-for-ecommerce-operators` continue to return `404`
  - Batch 3 runtime QA and internal-link fine tuning are now complete
  - four new Batch 3 pages are now implemented in `en` and `zh`
  - local SEO validation passed 740 checks across 66 published locale-page combinations and 18 page groups after the Batch 3 rollout stabilized
- Batch 4 implementation is now complete:
  - two new Batch 4 pages are now implemented in `en` and `zh`:
    - `use-cases/ai-tools-for-consultants`
    - `examples/ai-tools-for-customer-support-operations`
  - older public pages now route more naturally into the later-batch consultant use-case and customer-support operations sample:
    - freelancer sample -> consultant use-case
    - opportunity analysis -> customer-support operations sample
    - small-business sample -> customer-support operations sample
  - runtime QA confirmed that:
    - `/en/use-cases/ai-tools-for-consultants` renders route-specific English content
    - `/zh/examples/ai-tools-for-customer-support-operations` renders route-specific Chinese content
    - unpublished locales such as `/de/use-cases/ai-tools-for-consultants` return `404`
  - local SEO validation now passes 784 checks across 70 published locale-page combinations and 20 page groups
- Phase 4 launch-ops preparation is now documented:
  - deployment-readiness checklist is drafted
  - Search Console submission checklist is drafted
  - weekly monitoring scorecard is drafted
  - a funnel event taxonomy is now documented
  - explicit client-side funnel tracking now exists for marketing CTA clicks, related-link clicks, locale switches, login opens, and analysis-start progression
  - the remaining analytics gap is now narrower: lifecycle tracking beyond the first started analysis still does not yet exist
  - production deployment prep is now more actionable:
    - a production environment reference is drafted
    - a production-ready environment template exists
    - `npm run verify:env -- --production` is now part of the release checklist
  - user confirmed the production values for `NEXT_PUBLIC_APP_URL`, `NEXTAUTH_URL`, and `REDIS_URL` are already deployed
  - the next Round 2 gate is live verification plus Search Console submission, not additional local environment prep
  - live verification on 2026-05-08 confirmed that the production domain is healthy but still serves only the earlier 42-page rollout:
    - `robots.txt` and `sitemap.xml` return `200`
    - `/en` and `/zh` return `200`
    - new Round 2 routes such as `/en/guides/how-to-validate-an-ai-startup-idea` and `/zh/examples/ai-tools-for-customer-support-operations` still return `404`
    - live sitemap count is still `42`, so the 14 new `en + zh` Round 2 pages are not yet deployed
    - live homepage markup still exposes the older `x-default` behavior pointing to the root host
  - a deploy-gap checklist is now documented so release verification can focus on exactly what production is still missing

## Phase 0: Scope Freeze

### 0.1 Entry strategy

Tasks:
- treat `/` as a user entry route
- point `x-default` to `/en`
- define locale-routing behavior for first-time visits
- separate SEO URL behavior from user convenience redirects

Verification:
- locale pages remain directly reachable
- `x-default` behavior matches the documented entry strategy
- the entry route does not become a crawl trap or locale-adaptive content page

### 0.2 New content launch-language strategy

Tasks:
- define that new pages launch in `en` and `zh` first
- define deferred expansion rules for the other 5 locales

Verification:
- all new page definitions explicitly label launch locales
- multilingual expansion is data-driven, not automatic

### 0.3 New page-definition workflow

Tasks:
- require a page-definition card before building any new page
- define required fields for each planned page

Verification:
- every new page has a definition artifact before design or coding begins

## Phase 1: Technical SEO Hardening

### 1.1 Production site URL enforcement

Tasks:
- fail production builds if `NEXT_PUBLIC_APP_URL` is missing or invalid
- fail production builds if canonical base is not HTTPS
- remove silent fallback risk around `localhost`

Verification:
- production metadata cannot emit `http://localhost`
- sitemap, canonical, robots, and OG URLs are guaranteed to use the production origin

### 1.2 `x-default` and root routing cleanup

Tasks:
- align metadata output with the chosen `x-default` strategy
- implement root-route locale entry behavior safely
- ensure crawlers see stable localized pages, not adaptive page variants

Verification:
- `alternates.languages['x-default']` is correct
- root-entry behavior is documented and testable

### 1.3 Structured data rollout

Tasks:
- add `Organization` and `WebSite` to the homepage
- add `BreadcrumbList` to core and example pages
- add `SoftwareApplication` to core landing pages
- add `FAQPage` where FAQ blocks exist

Verification:
- each page type outputs the expected JSON-LD blocks
- local validation confirms schema presence

### 1.4 Sitemap and robots hardening

Tasks:
- review `lastModified` strategy
- review whether a sitemap index is needed
- ensure future public pages auto-enter the sitemap
- ensure noindex and private pages stay out

Verification:
- sitemap contains only public indexable pages
- robots output remains stable and environment-safe

### 1.5 Locale strategy cleanup

Tasks:
- remove or reconcile stale locale configuration such as `ACTIVE_SEO_LOCALES`
- make configuration match real publishing behavior

Verification:
- locale strategy is consistent across metadata, routing, sitemap, and validation

### 1.6 SEO validation expansion

Tasks:
- extend the local SEO validation script to check:
  - JSON-LD presence
  - noindex coverage
  - metadata length ranges
  - OG image coverage
  - repeated metadata collisions

Verification:
- local validation covers technical SEO beyond canonical and `hreflang`

## Phase 2: Existing Page Strengthening

### 2.1 Metadata rewrite for CTR

Tasks:
- review all existing page titles and descriptions
- reduce overlap between homepage, core pages, and example pages
- improve clarity of promise and result

Verification:
- each page group has a clearly distinct title/description pair

### 2.2 Intent-depth improvements for existing pages

Tasks:
- add or strengthen sections for:
  - who it is for
  - who it is not for
  - when to use this workflow
  - input examples
  - output examples
  - why not just use ChatGPT

Verification:
- each existing page better answers “is this for me?”

### 2.3 FAQ quality upgrade

Tasks:
- turn placeholder-style FAQ into real search-answer coverage
- target 3 to 5 useful questions per page

Verification:
- FAQ content adds information not already repeated in the main body

### 2.4 Internal-link enhancement

Tasks:
- improve cross-linking between homepage, core pages, and sample pages
- reserve future link slots for cluster pages

Verification:
- each public page has multiple meaningful internal entry points

## Phase 3: New Content-Cluster Definition Only

This phase defines the pages before implementation begins.

### 3.1 Use-case cluster

Proposed initial targets:
- `ai-tools-for-recruiters`
- `ai-tools-for-agencies`
- `ai-tools-for-ecommerce-operators`
- `ai-tools-for-consultants`

### 3.2 How-to cluster

Proposed initial targets:
- `how-to-validate-an-ai-startup-idea`
- `how-to-prioritize-ai-business-opportunities`
- `how-to-find-an-ai-saas-wedge`

### 3.3 Comparison cluster

Proposed initial targets:
- `badgersignal-vs-chatgpt-for-startup-idea-validation`
- `badgersignal-vs-manual-market-research`
- `idea-generator-vs-opportunity-analysis`

### 3.4 Public-example cluster expansion

Proposed expansion:
- recruiters
- agencies
- ecommerce operations
- customer support operations

Verification:
- page definitions exist before implementation begins

## Execution Order

1. Phase 0
2. Phase 1
3. Phase 2
4. Phase 3 definitions

## Round 2 Verification Standard

Round 2 Phase 0-2 is considered complete only when:

1. root locale-entry behavior is documented and implemented safely
2. `x-default` and canonical rules are consistent
3. schema coverage exists for each public page type
4. local SEO validation covers the new technical checks
5. the 6 existing page groups have stronger metadata and richer search-intent content
