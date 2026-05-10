# SEO Round 2 Live Verification Report

Date: 2026-05-08
Verifier: Codex
Target domain: `https://nobadger.com` -> `https://www.nobadger.com`
Status: Production environment is live, but the deployed site does not yet contain the full Round 2 rollout

## What Was Checked

### Core platform endpoints

- `https://nobadger.com/robots.txt`
- `https://nobadger.com/sitemap.xml`
- `https://nobadger.com/en`
- `https://nobadger.com/zh`

### New Round 2 routes

- `https://nobadger.com/en/guides/how-to-validate-an-ai-startup-idea`
- `https://nobadger.com/zh/examples/ai-tools-for-customer-support-operations`

### Unpublished-locale guardrail

- `https://nobadger.com/de/use-cases/ai-tools-for-consultants`

## Live Results

### Healthy

- `robots.txt` returns `200`
- `sitemap.xml` returns `200`
- `/en` returns `200`
- `/zh` returns `200`
- traffic is redirected to the canonical `www` host
- unpublished locale page `/de/use-cases/ai-tools-for-consultants` returns `404` as expected

### Not Yet Live

- `/en/guides/how-to-validate-an-ai-startup-idea` returns `404`
- `/zh/examples/ai-tools-for-customer-support-operations` returns `404`

## Important Findings

### 1. Production is still serving only the earlier 42-page rollout

The live sitemap contains `42` `<loc>` entries, which matches the earlier multilingual baseline:

- 6 marketing page groups
- 7 locales
- `6 x 7 = 42`

The new Round 2 pages are not present in the live sitemap.

### 2. `x-default` is still the older live behavior

Live homepage markup still shows:

- `x-default = https://www.nobadger.com`

That means the production deploy is still serving the pre-Round-2 metadata behavior rather than the newer local implementation that moved `x-default` handling into the updated entry strategy.

### 3. Environment configuration is not the current blocker

User confirmed the production values for:

- `NEXT_PUBLIC_APP_URL`
- `NEXTAUTH_URL`
- `REDIS_URL`

are already deployed.

The blocker is now deployment freshness / release completeness, not environment configuration.

## Likely Conclusion

The production site appears to be on an older deployment or branch that predates:

- the 14 new Round 2 `en + zh` pages
- the updated sitemap expansion
- the newer `x-default` metadata behavior

## Recommended Next Step

1. Deploy the current Round 2 codebase to production.
2. Re-run this exact live verification set.
3. Only after those pages return `200` should Search Console sitemap submission and URL Inspection proceed.
