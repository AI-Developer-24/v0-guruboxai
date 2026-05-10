# SEO Round 2 Funnel Event Taxonomy

Last updated: 2026-05-07
Owner: Codex + User
Status: Implemented in code

## Purpose

This document defines the event names and intent behind the new SEO-to-product funnel instrumentation.

The goal is to make post-launch analysis consistent across:

- marketing entry pages
- locale switching
- login intent
- product entry
- analysis creation

## Event List

### `marketing_cta_click`

Fired when a visitor clicks a primary or secondary CTA on a marketing page, including hero CTAs, closing-banner CTAs, and the marketing navbar "Start Analysis" CTA.

Core properties:

- `sourcePageKey`
- `sourcePageGroup`
- `sourceLocale`
- `placement`
- `actionKind`
- `actionLabel`
- `destinationHref`

Notes:

- when the destination is `/tools/product-insight`, the click also stores a short-lived session attribution record for downstream funnel events

### `marketing_related_link_click`

Fired when a visitor clicks a related-page link inside the marketing related-links section.

Core properties:

- `sourcePageKey`
- `sourcePageGroup`
- `sourceLocale`
- `placement`
- `linkTitle`
- `actionLabel`
- `destinationHref`

### `marketing_locale_switch_click`

Fired when a visitor switches locale from the marketing navbar locale menu.

Core properties:

- `sourcePageKey`
- `sourcePageGroup`
- `sourceLocale`
- `fromLocale`
- `toLocale`
- `destinationHref`
- `placement`

### `marketing_login_open`

Fired when a visitor opens the login dialog directly from a marketing page navbar action.

Core properties:

- `sourcePageKey`
- `sourcePageGroup`
- `sourceLocale`
- `placement`
- `sourcePath`

### `auth_google_sign_in_click`

Fired when the visitor clicks the Google sign-in button inside the login dialog.

Core properties:

- `surface`
- `currentPath`
- `locale`
- `sourcePageKey`
- `marketingSourcePageKey`
- `marketingSourcePageGroup`
- `marketingSourceLocale`
- `marketingSourcePath`
- `marketingSourcePlacement`
- `marketingSourceAgeSeconds`

Notes:

- this event works for both marketing-origin login and tool-page login

### `product_login_open`

Fired when an unauthenticated visitor on the product entry page tries to start analysis and the login dialog opens.

Core properties:

- `currentPath`
- `locale`
- `surface`
- marketing attribution fields when available

### `product_analysis_submit`

Fired when a visitor attempts to start analysis from the product entry page.

Core properties:

- `currentPath`
- `locale`
- `inputLengthBucket`
- `authState`
- marketing attribution fields when available

Notes:

- this event fires for both:
  - direct logged-in submission attempts
  - attempts that first require login

### `product_analysis_started`

Fired after analysis creation succeeds.

Core properties:

- `currentPath`
- `locale`
- `inputLengthBucket`
- marketing attribution fields when available

Notes:

- after success, the current marketing attribution record is cleared to avoid stale attribution bleeding into later unrelated sessions

## Attribution Model

The current model is a lightweight client-side last-touch attribution model.

### Stored when

- a marketing CTA click points to `/tools/product-insight`

### Stored fields

- source marketing page key
- source marketing page group
- locale
- source page path
- CTA placement
- destination href
- timestamp

### Lifetime

- session storage
- automatically expires after 4 hours
- cleared after successful analysis start

## Current Coverage

The new implementation covers:

- marketing CTA clicks
- related-link clicks
- locale switch clicks
- direct marketing login opens
- Google sign-in button clicks
- product login-open events
- analysis submit attempts
- successful analysis starts

## Known Gaps

Still not covered:

- impression-side attribution inside the app itself
- CTA visibility or scroll-depth events
- login success completion as a distinct funnel event
- account-to-repeat-analysis lifecycle tracking

These are optional next steps, not blockers for Round 2 launch.

