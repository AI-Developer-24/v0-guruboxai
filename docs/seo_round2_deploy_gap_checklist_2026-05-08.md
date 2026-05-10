# SEO Round 2 Deploy Gap Checklist

Date: 2026-05-08
Owner: Codex + User
Status: Production is missing the Round 2 content-cluster deploy

## Purpose

This checklist isolates the difference between:

- what exists locally in the current Round 2 codebase
- what is currently live on `https://www.nobadger.com`

Use this as the shortest release-gap checklist before the next production deploy.

## Live State Confirmed

Production currently has:

- `robots.txt` live
- `sitemap.xml` live
- `/en` live
- `/zh` live
- only `42` sitemap URLs live

That `42`-URL count matches the earlier baseline:

- 6 marketing page groups
- 7 locales
- `6 x 7 = 42`

## What Production Is Missing

Production is missing all `14` Round 2 cluster pages.

These pages exist locally but are not live yet.

### Batch 1

- `/en/guides/how-to-validate-an-ai-startup-idea`
- `/zh/guides/how-to-validate-an-ai-startup-idea`
- `/en/comparisons/badgersignal-vs-chatgpt-for-startup-idea-validation`
- `/zh/comparisons/badgersignal-vs-chatgpt-for-startup-idea-validation`
- `/en/use-cases/ai-tools-for-recruiters`
- `/zh/use-cases/ai-tools-for-recruiters`
- `/en/examples/ai-tools-for-recruiters`
- `/zh/examples/ai-tools-for-recruiters`

### Batch 2

- `/en/guides/how-to-prioritize-ai-business-opportunities`
- `/zh/guides/how-to-prioritize-ai-business-opportunities`
- `/en/comparisons/badgersignal-vs-manual-market-research`
- `/zh/comparisons/badgersignal-vs-manual-market-research`
- `/en/use-cases/ai-tools-for-agencies`
- `/zh/use-cases/ai-tools-for-agencies`
- `/en/examples/ai-tools-for-agencies`
- `/zh/examples/ai-tools-for-agencies`

### Batch 3

- `/en/guides/how-to-find-an-ai-saas-wedge`
- `/zh/guides/how-to-find-an-ai-saas-wedge`
- `/en/comparisons/idea-generator-vs-opportunity-analysis`
- `/zh/comparisons/idea-generator-vs-opportunity-analysis`
- `/en/use-cases/ai-tools-for-ecommerce-operators`
- `/zh/use-cases/ai-tools-for-ecommerce-operators`
- `/en/examples/ai-tools-for-ecommerce-operations`
- `/zh/examples/ai-tools-for-ecommerce-operations`

### Batch 4

- `/en/use-cases/ai-tools-for-consultants`
- `/zh/use-cases/ai-tools-for-consultants`
- `/en/examples/ai-tools-for-customer-support-operations`
- `/zh/examples/ai-tools-for-customer-support-operations`

## Secondary Missing Behavior

Production is also missing these Round 2 live-state updates:

1. the expanded sitemap that should include the 14 new `en + zh` pages
2. the updated `x-default` behavior expected from the newer metadata/entry strategy
3. the newer internal-link graph that routes older public pages into the Round 2 clusters
4. the latest funnel instrumentation on the newly added pages

## Minimal Release Acceptance Criteria

Do not call the Round 2 deploy live until all of these are true:

1. live sitemap count is greater than `42`
2. each of the `14` new page groups resolves for `en` and `zh`
3. unpublished locale variants for those page groups still return `404`
4. one old public page visibly links into one new Round 2 page
5. homepage, core pages, and sample pages still render correctly after deploy

## Immediate Next Verification Set After Deploy

Re-run these first:

- `/sitemap.xml`
- `/en/guides/how-to-validate-an-ai-startup-idea`
- `/zh/examples/ai-tools-for-customer-support-operations`
- `/en/use-cases/ai-tools-for-consultants`
- `/de/use-cases/ai-tools-for-consultants`

Expected:

- first three return `200`
- unpublished German consultant page returns `404`
