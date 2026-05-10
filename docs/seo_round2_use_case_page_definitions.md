# SEO Round 2 Use-Case Page Definitions

Last updated: 2026-05-06
Status: Drafted for implementation planning
Related framework: [seo_round2_page_definition_framework.md](./seo_round2_page_definition_framework.md)
Related plan: [seo_round2_execution_plan.md](./seo_round2_execution_plan.md)

## Purpose

This document defines the first use-case cluster before implementation.

All routes in this set should launch in:
- `en`
- `zh`

All routes should keep English slugs for locale consistency:
- `/en/use-cases/...`
- `/zh/use-cases/...`

## Shared Rules

### Primary CTA

- `Start analysis`

### Secondary CTA

- `View sample report`

### Shared internal-link rules

Every page in this cluster must:
- link to one existing core workflow page
- link to one existing public sample page
- link back to the homepage
- reserve one related-link slot for a future comparison or how-to page

### Shared visual direction

- use the existing marketing language
- feel more operational than the homepage
- reduce abstract brand copy
- show clearer workflow examples and repeated pain
- prefer open layout plus restrained dividers over decorative card density

## Page 1

### Page ID

- `use-case-recruiters`

### Route slug

- `/[locale]/use-cases/ai-tools-for-recruiters`

### Launch locales

- `en`
- `zh`

### Page type

- `Type A: Use Case`

### Primary intent

- Capture search intent around `ai tools for recruiters`

### Supporting intents

- `ai recruiting workflow tools`
- `ai tools for interview notes`
- `candidate summary automation`

### Primary CTA

- Start an analysis for a recruiting workflow

### Secondary CTA

- View a public sample report first

### Required content blocks

1. Hero with recruiter-specific pain framing
2. Audience definition:
   - independent recruiters
   - boutique recruiting teams
   - in-house operators with repetitive screening handoffs
3. Why recruiting workflows break:
   - interview notes stay unstructured
   - candidate summaries are slow to produce
   - follow-up quality drops under volume
4. Opportunity wedges:
   - interview note to candidate summary
   - follow-up drafting after recruiter calls
   - role-to-candidate-fit briefing
5. Example input/output:
   - sample recruiter brief
   - ranked opportunity snapshot
6. Why AI matters here:
   - high repetition
   - high context-switching cost
   - measurable time-to-response pain
7. FAQ
8. CTA

### Preferred visual direction

- operator-focused
- concise workflow strips
- more concrete than homepage
- should feel closer to a recruiting ops memo than a broad landing page

### Mandatory internal links

- homepage: `/[locale]`
- core workflow: `/[locale]/saas-idea-validation`
- public example: `/[locale]/examples/ai-tools-for-freelancers`
- future reserved link: comparison page against generic ChatGPT research

### Success metric

- impressions and clicks for recruiter-intent queries
- CTA clicks into product flow from recruiting visitors

### Differentiation note

This page should not read like “general AI tools for HR.”
It should stay narrow and operational, focused on recruiting workflow friction that can produce paid software wedges.

## Page 2

### Page ID

- `use-case-agencies`

### Route slug

- `/[locale]/use-cases/ai-tools-for-agencies`

### Launch locales

- `en`
- `zh`

### Page type

- `Type A: Use Case`

### Primary intent

- Capture search intent around `ai tools for agencies`

### Supporting intents

- `agency workflow automation`
- `ai tools for client delivery teams`
- `agency operations ai`

### Primary CTA

- Start an analysis for an agency workflow

### Secondary CTA

- Review a public sample report first

### Required content blocks

1. Hero with agency delivery pain framing
2. Audience definition:
   - boutique agencies
   - service delivery teams
   - client-facing project operators
3. Where agencies lose margin:
   - client feedback loops
   - project handoff friction
   - post-call coordination drift
4. Opportunity wedges:
   - client feedback to scoped action items
   - meeting recap to project update
   - recurring deliverable QA workflow
5. Example input/output
6. Why AI matters here:
   - high manual coordination
   - expensive rework
   - frequent structured text artifacts
7. FAQ
8. CTA

### Preferred visual direction

- service-operations editorial
- quieter than homepage
- more delivery-system oriented than startup-language oriented

### Mandatory internal links

- homepage: `/[locale]`
- core workflow: `/[locale]/ai-business-opportunity-analysis`
- public example: `/[locale]/examples/ai-tools-for-small-business`
- future reserved link: how-to page about prioritizing AI business opportunities

### Success metric

- impressions and clicks for agency-intent queries
- sample-report click-through rate from this page

### Differentiation note

This page should avoid broad “agency AI trends” language.
It should speak to concrete delivery friction and margin leakage inside agency operations.

## Page 3

### Page ID

- `use-case-ecommerce-operators`

### Route slug

- `/[locale]/use-cases/ai-tools-for-ecommerce-operators`

### Launch locales

- `en`
- `zh`

### Page type

- `Type A: Use Case`

### Primary intent

- Capture search intent around `ai tools for ecommerce operators`

### Supporting intents

- `ecommerce operations ai`
- `ai tools for catalog and support workflows`
- `shop operations automation ai`

### Primary CTA

- Start an analysis for an ecommerce workflow

### Secondary CTA

- View a public sample before analyzing your own workflow

### Required content blocks

1. Hero with ecommerce-ops pain framing
2. Audience definition:
   - operator-led ecommerce teams
   - marketplace and DTC workflow owners
   - catalog and support coordinators
3. Where operations slow down:
   - product information cleanup
   - support and returns triage
   - merchandising updates across channels
4. Opportunity wedges:
   - catalog enrichment workflow
   - returns-reason clustering
   - customer-support summary and routing
5. Example input/output
6. Why AI matters here:
   - repetitive structured text
   - many low-leverage manual reviews
   - visible time-to-resolution cost
7. FAQ
8. CTA

### Preferred visual direction

- operations board feel
- slightly denser data rhythm
- practical and systems-oriented

### Mandatory internal links

- homepage: `/[locale]`
- core workflow: `/[locale]/ai-business-opportunity-analysis`
- public example: `/[locale]/examples/ai-tools-for-small-business`
- future reserved link: comparison page for opportunity analysis versus manual market research

### Success metric

- impressions for ecommerce-ops long-tail queries
- click-through to the core opportunity-analysis workflow

### Differentiation note

This page should not try to cover every ecommerce AI use case.
It should focus on repeated operator workflows where AI creates clearer software wedges rather than one-off growth hacks.

## Page 4

### Page ID

- `use-case-consultants`

### Route slug

- `/[locale]/use-cases/ai-tools-for-consultants`

### Launch locales

- `en`
- `zh`

### Page type

- `Type A: Use Case`

### Primary intent

- Capture search intent around `ai tools for consultants`

### Supporting intents

- `consulting workflow ai`
- `ai tools for solo consultants`
- `client follow-up automation for consultants`

### Primary CTA

- Start an analysis for a consulting workflow

### Secondary CTA

- View a freelancer-oriented public sample report

### Required content blocks

1. Hero with consultant workflow pain framing
2. Audience definition:
   - solo consultants
   - fractional operators
   - independent strategists with recurring client work
3. Where consultants lose time:
   - calls do not turn into clean follow-up
   - proposals and scopes drift
   - project next steps stay trapped in notes
4. Opportunity wedges:
   - call notes to follow-up plan
   - scope draft generator for repeat service lines
   - client update and action-summary workflow
5. Example input/output
6. Why AI matters here:
   - repeated language patterns
   - admin-heavy work around expert calls
   - fast time-to-value for small operators
7. FAQ
8. CTA

### Preferred visual direction

- more editorial than the recruiters page
- closer to solo-operator workflow framing
- should feel practical and premium, not generic productivity content

### Mandatory internal links

- homepage: `/[locale]`
- core workflow: `/[locale]/ai-startup-idea-generator`
- public example: `/[locale]/examples/ai-tools-for-freelancers`
- future reserved link: how-to page about validating an AI startup idea

### Success metric

- impressions and CTR for consultant-intent terms
- product-start clicks from solo-operator visitors

### Differentiation note

This page should stay focused on consultant operations, not broad “AI for knowledge workers.”
The strongest angle is repeated client-service workflow friction that can turn into paid software products.

## Next planned definition set

After this use-case cluster, the next page-definition batch should cover:
- `how-to-validate-an-ai-startup-idea`
- `how-to-prioritize-ai-business-opportunities`
- `how-to-find-an-ai-saas-wedge`
