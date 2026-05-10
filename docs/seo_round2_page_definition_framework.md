# SEO Round 2 Page Definition Framework

Last updated: 2026-05-06
Status: Drafted for confirmation baseline
Related plan: [seo_round2_execution_plan.md](./seo_round2_execution_plan.md)

## Purpose

Every new SEO page in Round 2 must be defined before implementation.

This avoids:
- building pages without clear search intent
- reusing the wrong layout for the wrong page type
- mixing SEO goals with UI experimentation

## Required Definition Fields

Each new page must define:

1. Page ID
2. Route slug
3. Launch locales
4. Page type
5. Primary intent
6. Supporting intents
7. Primary CTA
8. Secondary CTA
9. Required content blocks
10. Preferred visual direction
11. Mandatory internal links
12. Success metric

## Page Types

### Type A: Use Case

Purpose:
- capture vertical or role-based search intent

Best for:
- recruiters
- agencies
- ecommerce operators
- consultants

Default structure:
1. Hero
2. Audience and pain framing
3. Why this workflow is hard
4. Opportunity lanes or example wedges
5. Sample inputs/outputs
6. FAQ
7. CTA

Preferred visual direction:
- product-editorial
- more operational and concrete
- fewer abstract brand statements

Required content:
- audience definition
- repeated pain
- willingness-to-pay or urgency signal
- why AI is relevant here
- example wedge list

### Type B: How-To

Purpose:
- capture instructional intent

Best for:
- “how to validate”
- “how to prioritize”
- “how to find”

Default structure:
1. Hero
2. Problem statement
3. Step-by-step process
4. Example walkthrough
5. Mistakes to avoid
6. FAQ
7. CTA

Preferred visual direction:
- editorial process page
- clear step rhythm
- lower marketing tone

Required content:
- numbered steps
- examples
- edge cases
- practical next action

### Type C: Comparison

Purpose:
- capture evaluation or alternative-intent search

Best for:
- comparison with ChatGPT
- comparison with manual research
- comparison between product workflows

Default structure:
1. Hero
2. Who this comparison is for
3. Comparison matrix
4. Strengths and trade-offs
5. Use-when guidance
6. FAQ
7. CTA

Preferred visual direction:
- restrained, analytical, high-clarity
- minimal ornament
- strongest information density among page types

Required content:
- explicit comparison dimensions
- who should choose what
- honest limitations

### Type D: Public Example

Purpose:
- show real output quality before login

Default structure:
1. Hero
2. Scenario brief
3. Ranked opportunities
4. Why top opportunities scored well
5. Next move guidance
6. Related workflows
7. CTA

Preferred visual direction:
- report-like
- concrete and scenario-heavy
- slightly denser than homepage/core pages

Required content:
- market slice
- brief
- ranked wedges
- score logic
- practical next step

## Launch-Locale Rules

### New pages in this round

Launch first in:
- `en`
- `zh`

Deferred locales:
- `de`
- `fr`
- `it`
- `es`
- `pt`

Expansion condition:
- only after `en` and `zh` pages show useful impression/click data

## Internal-Link Rules

1. Every new page must link back to one core workflow page.
2. Every new page must link to at least one public example.
3. Every new page must receive at least one inbound link from an existing page.
4. Comparison pages must link to the compared workflow pages.
5. How-to pages must link to the workflow page that operationalizes the guide.

## Content Completeness Threshold

Do not implement a new page until it has:

- one clear main query target
- one clear CTA
- one page-type-appropriate structure
- enough content to stand alone
- internal-link targets defined

