# SEO Round 2 Search Console Submission Checklist

Last updated: 2026-05-07
Owner: Codex + User
Status: Hold until the full Round 2 production deploy is live

## Purpose

This checklist defines exactly what to submit and inspect in Google Search Console after the Round 2 rollout reaches production.

## Before Opening Search Console

Make sure these are already true:

- production deploy is live
- `npm run verify:env -- --production` passed before deployment
- canonical URLs use the production HTTPS origin
- `robots.txt` is live
- `sitemap.xml` is live
- unpublished locale URLs return `404`

## Recommended Property Setup

Preferred option:

- use a Domain property if DNS verification is available

Fallback option:

- use an HTTPS URL-prefix property for the production origin

Do not create separate properties per locale unless there is a later operational need.

## First Submission

Submit:

- `https://<production-domain>/sitemap.xml`

Record:

- submission date
- Search Console property used
- whether the sitemap was accepted without warnings

## Priority URL Inspection Queue

Inspect these first:

### Entry and core routes

- `/en`
- `/zh`
- `/en/ai-startup-idea-generator`
- `/en/saas-idea-validation`
- `/en/ai-business-opportunity-analysis`

### New Batch 1 routes

- `/en/guides/how-to-validate-an-ai-startup-idea`
- `/en/comparisons/badgersignal-vs-chatgpt-for-startup-idea-validation`
- `/en/use-cases/ai-tools-for-recruiters`
- `/en/examples/ai-tools-for-recruiters`

### New Batch 2 routes

- `/en/guides/how-to-prioritize-ai-business-opportunities`
- `/en/comparisons/badgersignal-vs-manual-market-research`
- `/en/use-cases/ai-tools-for-agencies`
- `/en/examples/ai-tools-for-agencies`

### New Batch 3 routes

- `/en/guides/how-to-find-an-ai-saas-wedge`
- `/en/comparisons/idea-generator-vs-opportunity-analysis`
- `/en/use-cases/ai-tools-for-ecommerce-operators`
- `/en/examples/ai-tools-for-ecommerce-operations`

### New Batch 4 routes

- `/en/use-cases/ai-tools-for-consultants`
- `/en/examples/ai-tools-for-customer-support-operations`

### Chinese spot-checks

- `/zh`
- `/zh/ai-business-opportunity-analysis`
- `/zh/examples/ai-tools-for-recruiters`
- `/zh/examples/ai-tools-for-customer-support-operations`

## What to Verify Per URL

For each inspected URL, verify:

- URL is discoverable
- page is indexable
- canonical is self-referential to the correct locale
- selected canonical is not pointing to the wrong locale
- page is not blocked by `robots.txt`
- page is served successfully to Googlebot

If Search Console allows it, request indexing for the most important new English pages first.

## Pages That Should Not Be Indexed

Spot-check these too:

- `/tools/product-insight`
- `/account`
- `/analysis/test`
- `/report/test`

Expected result:

- `noindex`
- not included in sitemap

## Search Console Weekly Review

In the first 4 weeks after launch, review weekly:

- indexed page count
- sitemap status
- top queries
- top landing pages
- clicks
- impressions
- CTR
- coverage or enhancement warnings

## Escalation Rules

If a high-priority page is not indexed after repeated fetch success:

1. check canonical
2. check `noindex`
3. check content uniqueness
4. check internal links into the page
5. check whether the page is actually in sitemap

If a locale page is indexed under the wrong locale:

1. inspect `hreflang`
2. inspect canonical
3. inspect page body language
4. inspect root locale routing to ensure the localized URL is stable
