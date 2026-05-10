# SEO Round 2 Monitoring Scorecard

Last updated: 2026-05-07
Owner: Codex + User
Status: Ready for weekly use

## Purpose

This scorecard defines what to monitor after the Round 2 rollout so iteration decisions are based on data instead of intuition.

## Important Measurement Reality

Current measurement is stronger than before, but still not complete.

What exists now:

- Vercel Analytics page-level analytics is installed globally in [layout.tsx](/Users/peak/Projects/GuruBoxAI/app/layout.tsx)
- Search Console can provide search-side performance data after deployment
- explicit client-side funnel events now exist for:
  - marketing CTA clicks
  - related-link clicks
  - locale-switch clicks
  - marketing login opens
  - Google sign-in clicks
  - product login opens
  - analysis submit attempts
  - successful analysis starts
- event reference: [seo_round2_funnel_event_taxonomy.md](/Users/peak/Projects/GuruBoxAI/docs/seo_round2_funnel_event_taxonomy.md)

What still does not exist yet:

- login-success completion as a separate funnel event
- richer product-side repeat-usage attribution
- deeper in-app lifecycle instrumentation after the first started analysis

This means:

- SEO visibility can be monitored now
- page-level traffic can be monitored now
- first-touch marketing-to-product funnel progression can now be monitored in a lightweight way
- full lifecycle attribution is still a gap

## Weekly Scorecard

### Search Visibility

- indexed public pages
- sitemap acceptance status
- total impressions
- total clicks
- average CTR
- average position

### Landing-Page Performance

Track at minimum for:

- homepage
- core pages
- each new batch page

Review:

- impressions by landing page
- clicks by landing page
- CTR by landing page
- queries by landing page

### Funnel Events

Review at minimum:

- `marketing_cta_click`
- `marketing_related_link_click`
- `marketing_locale_switch_click`
- `marketing_login_open`
- `auth_google_sign_in_click`
- `product_login_open`
- `product_analysis_submit`
- `product_analysis_started`

### Content-Cluster Performance

Compare by cluster:

- use case
- how-to
- comparison
- public example

Review:

- which cluster gets impressions first
- which cluster converts clicks better
- which cluster has the weakest CTR

### Locale Performance

Review separately:

- `en`
- `zh`

Later, only if expanded:

- `de`
- `fr`
- `it`
- `es`
- `pt`

## Decision Rules

### High impression, low CTR

Likely action:

- rewrite title
- rewrite meta description
- tighten search-intent promise

### Some clicks, weak engagement

Likely action:

- improve above-the-fold positioning
- strengthen “best fit / not for / use it when”
- improve sample preview clarity
- compare `marketing_cta_click` against `product_analysis_submit` to see whether traffic is hesitating before product entry

### No impressions after a reasonable window

Likely action:

- inspect internal links
- inspect sitemap presence
- inspect uniqueness of topic and copy
- consider rewriting angle instead of just waiting longer

### Strong impressions in one cluster

Likely action:

- prioritize the next page in the same cluster
- delay lower-signal clusters until the winning theme is clearer

### Strong CTA clicks, weak analysis starts

Likely action:

- inspect product-entry friction
- inspect whether login requirement is blocking progression
- compare `product_login_open` and `auth_google_sign_in_click` volume against `product_analysis_started`

## Recommended Review Cadence

### First 4 weeks

- weekly

### Weeks 5 to 12

- every 2 weeks

### After a stable signal emerges

- monthly cluster review

## Reporting Template

Each review should answer:

1. Which new pages got indexed?
2. Which pages earned the first real impressions?
3. Which pages have the best CTR?
4. Which page titles/descriptions look weakest?
5. Which cluster should be expanded next?
6. Which pages should be revised before adding more?

## Recommended Next Measurement Improvement

The most valuable follow-up instrumentation would be:

1. login-success completion event
2. analysis-created-to-report-complete event
3. more explicit CTA placement variants in reporting
4. repeat-analysis attribution for logged-in users
5. deeper product-side event stitching after the first started analysis

That would let future reviews connect:

- query -> landing page -> CTA click -> product entry

instead of stopping at:

- query -> landing page -> first funnel step only

