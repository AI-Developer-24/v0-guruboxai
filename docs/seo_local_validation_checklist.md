# Local SEO Validation Checklist

Date: 2026-04-02

Scope:
- English and Chinese public marketing routes
- Technical SEO foundations added in Stages B through E

Validation approach:
- `npm run build`
- local production server on `http://localhost:4100`
- headless Chrome runtime spot-check on `/en`
- source audit for helper logic, sitemap generation, robots rules, and `noindex` coverage

## Results

### 1. Public-page metadata

Status: Pass with deployment note

Runtime spot-check:
- `/en` returns a localized `<title>`
- `/en` returns a localized `description`
- `/en` returns canonical, Open Graph, and Twitter metadata
- `/en` returns `hreflang` alternates for `en`, `zh`, and `x-default`

Observed head output highlights:
- title: `AI Startup Idea Generator and Opportunity Analysis | BadgerSignal`
- canonical: `http://localhost:3000/en`
- `hreflang="en"`: `http://localhost:3000/en`
- `hreflang="zh"`: `http://localhost:3000/zh`
- `hreflang="x-default"`: `http://localhost:3000`

Deployment note:
- canonical, Open Graph URL, and alternates currently resolve from `NEXT_PUBLIC_APP_URL` or the local fallback in `lib/seo/metadata.ts`
- production deployment must set `NEXT_PUBLIC_APP_URL` to the final HTTPS domain before launch

### 2. HTML language handling

Status: Pass

Source audit:
- `middleware.ts` injects `x-seo-locale` from the pathname
- `app/layout.tsx` reads `x-seo-locale` and sets `<html lang>` via `getHtmlLang(...)`

Implication:
- `/en/...` and `/zh/...` share one root layout but still emit locale-aware `lang`

### 3. robots.txt

Status: Pass

Source audit:
- file: `app/robots.ts`
- allows `/`
- disallows `/api/` and `/_next/`
- emits sitemap URL
- emits host

Notes:
- private pages are not hidden via `robots.txt`; they are controlled with `noindex`, which is the correct approach when Google needs to see the directive

### 4. sitemap.xml

Status: Pass

Source audit:
- file: `app/sitemap.ts`
- source of truth is `MARKETING_PAGE_KEYS x ACTIVE_SEO_LOCALES`
- current output scope is the first 12 public pages only
- alternates are included for both active locales
- private pages are excluded

Expected current public URL count:
- 6 marketing page groups
- 2 active SEO locales
- total: 12 sitemap entries

### 5. noindex coverage

Status: Pass

Source audit:
- helper: `buildNoIndexMetadata(...)` in `lib/seo/metadata.ts`
- covered layouts:
  - `app/account/layout.tsx`
  - `app/analysis/layout.tsx`
  - `app/auth/layout.tsx`
  - `app/privacy/layout.tsx`
  - `app/report/layout.tsx`
  - `app/terms/layout.tsx`
  - `app/tools/product-insight/layout.tsx`

Current interpretation:
- private app surfaces and non-SEO public utility pages are excluded from indexing
- marketing routes under `/[locale]/...` remain indexable

### 6. Build status

Status: Pass with environment warnings

Command:
- `npm run build`

Outcome:
- build completes successfully
- public SEO routes are generated
- `robots.txt` and `sitemap.xml` are generated

Existing environment warnings still present:
- `NEXT_PUBLIC_APP_URL` should use HTTPS in production
- `NEXTAUTH_URL` should use HTTPS in production
- `REDIS_URL` should use TLS (`rediss://`)
- some environment variables are still missing in this local environment

## Overall verdict

Stage E4 can be considered complete for local validation.

The current bilingual SEO implementation is structurally ready for deployment, with two production prerequisites still to resolve before launch:
- set the final HTTPS site domain through `NEXT_PUBLIC_APP_URL`
- resolve the existing production environment and TLS warnings
