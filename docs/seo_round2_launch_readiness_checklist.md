# SEO Round 2 Launch Readiness Checklist

Last updated: 2026-05-07
Owner: Codex + User
Status: Production env configured, live verification shows Round 2 deploy is not fully live yet

## Purpose

This checklist defines what must be true before the Round 2 SEO rollout should be considered ready for production launch.

It is intentionally stricter than local build success. A page can render locally and still ship broken canonical URLs, weak measurement, or incomplete Search Console setup.

## Release Scope

Round 2 launch scope includes:

- the original 6 published marketing page groups in 7 locales
- 14 new content-cluster pages published only in `en` and `zh`
- per-page locale publishing rules
- updated sitemap, alternates, structured data, and internal-link graph

## Blockers Before Production

These are release blockers, not optional cleanup:

1. Set `NEXT_PUBLIC_APP_URL` to the real production HTTPS origin.
2. Set `NEXTAUTH_URL` to the real production HTTPS origin.
3. Set `REDIS_URL` to a TLS-enabled `rediss://` endpoint.

Current note:

- user confirmed these three production environment values are already deployed on 2026-05-07
- live verification on 2026-05-08 shows the production site is reachable, but the new Round 2 routes are not yet deployed
- see: [live verification report](/Users/peak/Projects/GuruBoxAI/docs/seo_round2_live_verification_2026-05-08.md)

Why this matters:

- canonical URLs
- `hreflang`
- OG/Twitter URLs
- `robots.txt`
- `sitemap.xml`

all depend on correct origin handling.

Use this reference while configuring production values:

- [production environment reference](/Users/peak/Projects/GuruBoxAI/docs/seo_round2_production_env_reference.md)
- [.env.production.example](/Users/peak/Projects/GuruBoxAI/.env.production.example)

## Required Pre-Launch Checks

### 1. Environment

- `npm run verify:env -- --production` passes
- `NEXT_PUBLIC_APP_URL` is production HTTPS
- `NEXTAUTH_URL` is production HTTPS
- `REDIS_URL` uses `rediss://`
- no production fallback resolves to `localhost`

### 2. Build and Validation

- `npm run build` passes
- `./node_modules/.bin/tsx --env-file=.env.local scripts/validate_multilingual_seo.ts` passes
- validation target should be at least the current baseline:
  - `784 checks across 70 published locale-page combinations and 20 page groups`

### 3. Indexability

- `robots.txt` returns `200`
- `sitemap.xml` returns `200`
- private pages remain `noindex`
- unpublished locale pages still return `404`
- `x-default` points to `/en`

### 4. Locale Routing

- `/` redirects users by browser language and saved preference
- `/en/...` and `/zh/...` remain stable crawlable URLs
- locale routing does not rewrite already-localized URLs

### 5. Structured Data

- homepage outputs `Organization` and `WebSite`
- core pages output `SoftwareApplication` and `BreadcrumbList`
- FAQ-bearing pages output `FAQPage`
- sample pages output `BreadcrumbList`, and where applicable `FAQPage`

### 6. Internal-Link Integrity

- every new page has at least 2 meaningful inbound links
- old public pages route naturally into the new cluster pages
- no link points to unpublished locale variants

## Published Page Matrix to Recheck at Release

### 7-locale published groups

- homepage
- AI startup idea generator
- SaaS idea validation
- AI business opportunity analysis
- freelancers public sample
- small-business public sample

### `en + zh` only groups

- recruiter use case
- recruiter public sample
- agencies use case
- agencies public sample
- ecommerce operators use case
- ecommerce operations public sample
- consultants use case
- customer-support operations public sample
- validate-an-AI-startup-idea guide
- prioritize-AI-business-opportunities guide
- find-an-AI-SaaS-wedge guide
- BadgerSignal vs ChatGPT comparison
- BadgerSignal vs manual market research comparison
- idea generator vs opportunity analysis comparison

## Recommended Release Sequence

1. Confirm the production deployment contains the expected env values.
2. Run `npm run verify:env -- --production`.
3. Run production build locally or in CI.
4. Run multilingual SEO validation script.
5. Verify live routes:
   - `/robots.txt`
   - `/sitemap.xml`
   - `/en`
   - `/zh`
   - one new `en` page
   - one new `zh` page
   - one unpublished locale URL returns `404`
6. Submit sitemap and key URLs in Search Console.

## Release Verdict

Round 2 is launch-ready only when:

- blockers are cleared
- build passes
- multilingual SEO validation passes
- root routing works as intended
- Search Console submission checklist is ready to execute
