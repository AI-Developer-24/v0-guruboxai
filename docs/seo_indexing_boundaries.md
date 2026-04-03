# SEO Indexing Boundaries

Last updated: 2026-04-01
Status: A2 completed
Related documents:
- [seo_multilingual_execution_plan.md](./seo_multilingual_execution_plan.md)
- [seo_page_matrix.md](./seo_page_matrix.md)

## Purpose

This document locks the indexing boundary for the project.

It defines:
- which routes are indexable
- which routes must never be indexed
- what enters the sitemap
- how current routes map into the future multilingual SEO structure

## Route Classes

There are 5 route classes in this project.

### Class 1: Public marketing SEO pages

Definition:
- public
- indexable
- included in sitemap
- locale-based

Examples:
- `/en`
- `/zh`
- `/en/ai-startup-idea-generator`
- `/zh/examples/ai-tools-for-freelancers`

Policy:
- `index,follow`
- self-canonical
- included in locale `hreflang`
- included in sitemap

### Class 2: Public utility entry pages

Definition:
- public
- not part of the locale SEO page count
- used for routing, entry, or utility behavior

Examples:
- `/`

Policy:
- excluded from the locale SEO page count
- excluded from the first-pass sitemap
- used as the `x-default` entry route
- must not compete with locale SEO pages for search intent

Notes:
- if `/` is implemented as a redirect or a lightweight locale entry experience, it should not become a duplicate competitor to `/en`

### Class 3: Public utility/legal pages

Definition:
- public
- not targeted as search landing pages in the current rollout

Examples:
- `/privacy`
- `/terms`
- future non-marketing public support pages

Policy:
- excluded from the multilingual marketing sitemap in this rollout
- not part of the 42-page SEO inventory
- should not be used as SEO target pages
- `noindex,follow` in the current rollout

Current rollout decision:
- treat them as out of scope for SEO targeting
- do not count them as multilingual marketing pages

### Class 4: Public app/system pages that must not be indexed

Definition:
- public or semi-public routes required for app flow
- not intended for organic search entry

Examples:
- `/tools/product-insight`
- `/auth/error`
- `/auth/popup-success`
- `/auth/callback`

Policy:
- `noindex,follow`
- excluded from sitemap
- excluded from `hreflang`
- excluded from marketing internal-link targets unless needed for product flow

### Class 5: Private app pages and API/system endpoints

Definition:
- authenticated app views
- route handlers
- API endpoints
- server action surfaces

Examples:
- `/analysis/[task_id]`
- `/report/[report_id]`
- `/account`
- `/api/v1/...`

Policy:
- private UI pages use `noindex,follow`
- API and route handler endpoints are excluded from sitemap
- API endpoints are not treated as crawl targets
- locale alternates are never generated for these routes

## Sitemap Inclusion Rules

### Included in sitemap

Only Class 1 pages are included.

That means:
- locale marketing homepage
- locale core landing pages
- locale public example pages

### Excluded from sitemap

Excluded:
- `/`
- `/privacy`
- `/terms`
- `/tools/product-insight`
- auth UI routes
- account pages
- report pages
- analysis pages
- API routes

## Indexability Rules by Route Pattern

| Route Pattern | Class | Public | Indexable | Sitemap | Notes |
| --- | --- | --- | --- | --- | --- |
| `/{locale}` | Class 1 | Yes | Yes | Yes | localized homepage |
| `/{locale}/ai-startup-idea-generator` | Class 1 | Yes | Yes | Yes | core landing |
| `/{locale}/saas-idea-validation` | Class 1 | Yes | Yes | Yes | core landing |
| `/{locale}/ai-business-opportunity-analysis` | Class 1 | Yes | Yes | Yes | core landing |
| `/{locale}/examples/ai-tools-for-freelancers` | Class 1 | Yes | Yes | Yes | public example |
| `/{locale}/examples/ai-tools-for-small-business` | Class 1 | Yes | Yes | Yes | public example |
| `/` | Class 2 | Yes | No SEO targeting | No | x-default entry route |
| `/privacy` | Class 3 | Yes | No | No | legal/support page, `noindex` in current rollout |
| `/terms` | Class 3 | Yes | No | No | legal/support page, `noindex` in current rollout |
| `/tools/product-insight` | Class 4 | Yes | No | No | product entry, not a search landing page |
| `/auth/error` | Class 4 | Yes | No | No | auth support UI |
| `/auth/popup-success` | Class 4 | Yes | No | No | auth support UI |
| `/auth/callback` | Class 4 | System | No | No | auth callback |
| `/analysis/[task_id]` | Class 5 | Private | No | No | user-specific page |
| `/report/[report_id]` | Class 5 | Private | No | No | user-specific page |
| `/account` | Class 5 | Private | No | No | user account area |
| `/api/v1/**` | Class 5 | System | No | No | API surface |

## Current Route Inventory Mapping

This section maps the current app routes into the future indexing policy.

| Current Route | Target Treatment |
| --- | --- |
| `/` | Class 2 utility entry route |
| `/tools/product-insight` | Class 4 public app route, non-indexable |
| `/privacy` | Class 3 public legal/support route, non-indexable in current rollout |
| `/terms` | Class 3 public legal/support route, non-indexable in current rollout |
| `/account` | Class 5 private page, non-indexable |
| `/analysis/[task_id]` | Class 5 private page, non-indexable |
| `/report/[report_id]` | Class 5 private page, non-indexable |
| `/auth/error` | Class 4 system support route, non-indexable |
| `/auth/popup-success` | Class 4 system support route, non-indexable |
| `/auth/callback` | Class 4 system callback route, non-indexable |
| `/api/v1/**` | Class 5 API surface, excluded from sitemap and SEO handling |

## `hreflang` Inclusion Rules

Only Class 1 pages receive locale alternates.

Excluded from `hreflang`:
- `/`
- legal pages
- product entry pages
- auth routes
- private pages
- API routes

## Internal Linking Rules

Allowed as major SEO internal-link targets:
- Class 1 pages only

Allowed as utility targets:
- `/tools/product-insight`
- auth or app routes only when needed for user flow

Not allowed as SEO destinations:
- private pages
- API routes
- user-specific report or analysis pages

## Deferred Scope

These items are intentionally not part of the current multilingual SEO inventory:
- localized legal pages
- blog or documentation sections
- pricing pages
- public changelog pages
- public support or contact pages

If they are added later, they must be classified in this document before implementation.

## Verification Checklist for A2

- [x] Public SEO route classes are defined.
- [x] Public non-SEO route classes are defined.
- [x] Private and system route classes are defined.
- [x] Sitemap inclusion rules are defined.
- [x] `hreflang` inclusion rules are defined.
- [x] Current route inventory is mapped to the future indexing policy.
- [x] Public and private route sets do not overlap.
