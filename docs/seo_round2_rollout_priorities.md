# SEO Round 2 Rollout Priorities

Last updated: 2026-05-07
Status: Batch 4 implementation completed
Related plan: [seo_round2_execution_plan.md](./seo_round2_execution_plan.md)
Related definitions:
- [seo_round2_use_case_page_definitions.md](./seo_round2_use_case_page_definitions.md)
- [seo_round2_how_to_page_definitions.md](./seo_round2_how_to_page_definitions.md)
- [seo_round2_comparison_page_definitions.md](./seo_round2_comparison_page_definitions.md)
- [seo_round2_public_example_page_definitions.md](./seo_round2_public_example_page_definitions.md)

## Purpose

This document answers:
- which new pages to build first
- which pages should launch together
- which locales should ship in each batch
- how the new pages should connect back into the existing site

The goal is to avoid building 14 new pages at once without a sequencing model.

## Total Planned New Pages

### Use case

1. `ai-tools-for-recruiters`
2. `ai-tools-for-agencies`
3. `ai-tools-for-ecommerce-operators`
4. `ai-tools-for-consultants`

### How-to

5. `how-to-validate-an-ai-startup-idea`
6. `how-to-prioritize-ai-business-opportunities`
7. `how-to-find-an-ai-saas-wedge`

### Comparison

8. `badgersignal-vs-chatgpt-for-startup-idea-validation`
9. `badgersignal-vs-manual-market-research`
10. `idea-generator-vs-opportunity-analysis`

### Public example

11. `ai-tools-for-recruiters`
12. `ai-tools-for-agencies`
13. `ai-tools-for-ecommerce-operations`
14. `ai-tools-for-customer-support-operations`

## Rollout Principles

1. Ship `en` and `zh` first for every new page.
2. Build pages in linkable clusters, not as isolated single pages.
3. Prefer pages that:
   - clarify product positioning
   - capture strong search intent
   - naturally route visitors into an existing core workflow
4. Launch a public example page close to the matching use-case page whenever possible.
5. Defer lower-confidence topics until early batches show usable impression and click data.

## Recommended Implementation Order

## Batch 1

### Goal

Strengthen the top-of-funnel path around startup validation and high-intent workflow choice while adding one highly concrete vertical.

### Pages

1. `how-to-validate-an-ai-startup-idea`
2. `badgersignal-vs-chatgpt-for-startup-idea-validation`
3. `ai-tools-for-recruiters` (use case)
4. `ai-tools-for-recruiters` (public example)

### Why this batch first

- `how-to-validate-an-ai-startup-idea` captures broad instructional intent that already matches the product narrative well.
- `badgersignal-vs-chatgpt-for-startup-idea-validation` captures high-intent evaluators who are close to choosing a workflow.
- `ai-tools-for-recruiters` is a narrow, believable vertical that is easy to understand and monetize.
- the recruiter public example gives the recruiter use-case page immediate proof, not just claims.

### Launch locales

- `en`
- `zh`

### Internal-link plan

- homepage links to:
  - `how-to-validate-an-ai-startup-idea`
  - recruiter public example
- `how-to-validate-an-ai-startup-idea` links to:
  - `saas-idea-validation`
  - recruiter public example
  - comparison with ChatGPT
- `badgersignal-vs-chatgpt-for-startup-idea-validation` links to:
  - `ai-startup-idea-generator`
  - `saas-idea-validation`
  - recruiter public example
- recruiter use-case links to:
  - recruiter public example
  - `saas-idea-validation`
- recruiter public example links to:
  - recruiter use-case
  - `saas-idea-validation`

### Success signals

- first impressions for validation-intent queries
- click-through from comparison traffic into core workflows
- sample-to-analysis clicks from recruiter-intent visitors

## Batch 2

### Goal

Strengthen product-positioning clarity around prioritization and widen the vertical surface with agency workflows.

### Pages

1. `how-to-prioritize-ai-business-opportunities`
2. `badgersignal-vs-manual-market-research`
3. `ai-tools-for-agencies` (use case)
4. `ai-tools-for-agencies` (public example)

### Why this batch second

- it builds directly on Batch 1 by covering the “what should I build first?” question.
- the manual-research comparison helps explain where BadgerSignal fits in a real decision process.
- agency workflows are concrete, monetizable, and easy to tie into the existing small-business and operations language.

### Launch locales

- `en`
- `zh`

### Internal-link plan

- homepage links to:
  - `how-to-prioritize-ai-business-opportunities`
  - agency public example
- prioritization guide links to:
  - `ai-business-opportunity-analysis`
  - agency public example
  - manual-research comparison
- manual-research comparison links to:
  - `ai-business-opportunity-analysis`
  - agency public example
- agency use-case links to:
  - agency public example
  - `ai-business-opportunity-analysis`
- agency public example links to:
  - agency use-case
  - `ai-business-opportunity-analysis`

### Success signals

- impressions for prioritization and manual-research comparison queries
- internal click-through into `ai-business-opportunity-analysis`
- public example engagement on agency pages

## Batch 3

### Goal

Clarify workflow routing inside the product ecosystem and expand into ecommerce-operations intent.

### Pages

1. `how-to-find-an-ai-saas-wedge`
2. `idea-generator-vs-opportunity-analysis`
3. `ai-tools-for-ecommerce-operators` (use case)
4. `ai-tools-for-ecommerce-operations` (public example)

### Why this batch third

- this batch is strong once the first two batches already established the value of validation and prioritization.
- the workflow-choice comparison helps route visitors between existing core pages.
- ecommerce operations is a strong but slightly broader vertical, so it benefits from the stronger link network created by earlier batches.

### Launch locales

- `en`
- `zh`

### Internal-link plan

- homepage links to:
  - `how-to-find-an-ai-saas-wedge`
  - ecommerce public example
- wedge guide links to:
  - `ai-startup-idea-generator`
  - ecommerce public example
  - idea-generator versus opportunity-analysis comparison
- workflow comparison links to:
  - `ai-startup-idea-generator`
  - `ai-business-opportunity-analysis`
  - ecommerce public example
- ecommerce use-case links to:
  - ecommerce public example
  - `ai-business-opportunity-analysis`
- ecommerce public example links to:
  - ecommerce use-case
  - `ai-business-opportunity-analysis`

### Success signals

- impressions for wedge-finding and workflow-choice queries
- internal routing clicks into the correct core workflow
- ecommerce public-example engagement

## Batch 4

### Goal

Expand the surface area only after the first three batches produce usable data.

### Pages

1. `ai-tools-for-consultants` (use case)
2. `ai-tools-for-customer-support-operations` (public example)

### Why this batch is deferred

- consultant intent is promising, but it overlaps more with the existing freelancer sample and should follow after earlier verticals prove the model.
- customer-support operations is a strong public-example topic, but it currently has no paired use-case page in the first definition set, so it is safer as a later extension.

### Launch locales

- `en`
- `zh`

### Internal-link plan

- consultant use-case links to:
  - freelancer public example
  - `ai-startup-idea-generator`
- customer-support public example links to:
  - `ai-business-opportunity-analysis`
  - existing small-business example

### Implementation status

- completed in `en` and `zh`
- runtime QA confirmed:
  - `/en/use-cases/ai-tools-for-consultants` renders route-specific English content
  - `/zh/examples/ai-tools-for-customer-support-operations` renders route-specific Chinese content
  - unpublished locales such as `/de/use-cases/ai-tools-for-consultants` return `404`
- internal-link fine tuning is complete:
  - freelancer sample now links to the consultant use-case
  - opportunity analysis now links to the customer-support operations sample
  - small-business sample now links to the customer-support operations sample
- local SEO validation now passes 784 checks across 70 published locale-page combinations and 20 page groups

### Success signals

- whether later-batch verticals can still generate impressions without hurting focus
- whether consultant traffic behaves differently from recruiter and agency traffic

## Locale Rollout Order

### Phase A

- ship all new pages in `en`
- ship matching pages in `zh`

### Phase B

Expand to `de / fr / it / es / pt` only when at least one of these is true:
- a page group has clear impression growth
- a page group has healthy CTR relative to other new pages
- a page group proves strong product-start clicks

## Dependencies and Build Order

### First build sequence inside each batch

1. content outline and copy draft
2. metadata draft
3. internal-link targets
4. route scaffolding
5. page content implementation
6. FAQ and structured-data checks
7. sitemap and validation pass

### Content dependency notes

- public example pages should not be implemented before their supporting scenario and top wedges are defined.
- comparison pages should not ship before the compared workflows already have stable messaging.
- use-case pages should prefer launching alongside either a matching public example or an existing relevant public example.

## Recommended First Implementation After Planning

If implementation starts immediately, begin with:

1. `how-to-validate-an-ai-startup-idea`
2. `badgersignal-vs-chatgpt-for-startup-idea-validation`
3. `ai-tools-for-recruiters` use case
4. `ai-tools-for-recruiters` public example

This first set gives the best balance of:
- search volume potential
- product-positioning clarity
- proof-before-login
- internal linking back into existing workflows

## Current Implementation Status

Batch 1 is now in progress.

Implemented in `en` and `zh`:

1. `how-to-validate-an-ai-startup-idea`
2. `badgersignal-vs-chatgpt-for-startup-idea-validation`
3. `ai-tools-for-recruiters` use case
4. `ai-tools-for-recruiters` public example

Runtime QA notes:

- unpublished locales for Batch 1 pages correctly return `404`
- `/en/examples/ai-tools-for-recruiters` had a mixed-locale content issue during QA and has since been corrected so the English page now renders fully English body copy and CTAs
- existing generator, validation, and sample pages now include stronger related-link paths into the Batch 1 guide, comparison, and recruiter sample pages

Batch 2 is now implemented in `en` and `zh`.

Implemented in `en` and `zh`:

5. `how-to-prioritize-ai-business-opportunities`
6. `badgersignal-vs-manual-market-research`
7. `ai-tools-for-agencies` use case
8. `ai-tools-for-agencies` public example

Runtime QA notes:

- new Batch 2 routes render in the intended published locales
- unpublished locales for Batch 2 pages correctly return `404`
- local SEO validation now passes 652 checks across 58 published locale-page combinations and 14 page groups
- no mixed-locale regression was found on the new agency public-sample page during runtime spot checks
- existing opportunity-analysis and small-business sample pages now route more naturally into the Batch 2 prioritization guide, manual-research comparison, and agency sample pages

Batch 3 is now complete.

Implemented in `en` and `zh`:

9. `how-to-find-an-ai-saas-wedge`
10. `idea-generator-vs-opportunity-analysis`
11. `ai-tools-for-ecommerce-operators` use case
12. `ai-tools-for-ecommerce-operations` public example

Implementation notes:

- the new ecommerce sample report is now backed by full page content in both `en` and `zh`
- the new Batch 3 routes compile into the production build as published locale-aware pages
- local SEO validation now passes 740 checks across 66 published locale-page combinations and 18 page groups
- runtime QA caught and fixed a content-wiring bug on the new Batch 3 core pages, where route-specific long-form content had been attached to the wrong template branch
- existing generator, opportunity-analysis, and small-business sample pages now include stronger related-link paths into the Batch 3 wedge guide, workflow comparison, and ecommerce sample pages
- runtime verification confirmed the English wedge guide and English ecommerce use-case pages now render route-specific English body copy again
- unpublished locales such as `/de/use-cases/ai-tools-for-ecommerce-operators` still return `404`

Still pending inside the broader rollout:

- post-launch performance review for Batch 1
- later locale expansion beyond `en` and `zh`
