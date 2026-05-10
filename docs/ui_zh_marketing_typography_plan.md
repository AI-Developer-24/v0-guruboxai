## Goal

Establish a Chinese-only typography system for marketing pages so the Chinese experience no longer inherits aggressive English spacing, line-height, and weight rules.

This round targets readability, compatibility, and consistency first. Product tool pages are explicitly deferred to the next round.

## Scope

Included:

- `/zh` marketing homepage
- Chinese core landing pages
- Chinese public example pages
- Chinese guides, comparisons, and use-case pages
- Shared marketing components
- Marketing navbar and footer text treatment

Excluded:

- Product tool pages
- Auth dialogs
- User-generated content areas
- English and non-Chinese locale typography systems

## Current Site State

Observed issues before this round:

1. Chinese titles inherit English-tight line heights such as `0.9`, `0.96`, and `1.02`, which makes two-line Chinese titles look cramped.
2. Chinese headings and card titles still use aggressive negative tracking and unstable mid-weights like `560`, which render inconsistently across systems.
3. Eyebrow, meta, and small-label styles still use English uppercase/tracking logic, which makes Chinese labels look noisy and unnatural.
4. Marketing navbar and footer Chinese text do not participate in a unified Chinese typography system yet.
5. Chinese pages rely too much on shared English `measure` and title width logic, increasing the risk of awkward wrapping on Windows and Android fallbacks.

## Typography Strategy

Use the stable compatibility-first stack:

`Geist`, `PingFang SC`, `Hiragino Sans GB`, `Noto Sans CJK SC`, `Noto Sans SC`, `Microsoft YaHei`, `DengXian`, `system-ui`, `sans-serif`

Principles:

- Geist keeps handling Latin, numbers, and brand terms
- Chinese rendering falls through to stable system fonts
- No downloaded Chinese webfont
- No Chinese serif titles in this round
- No unstable mid-weight dependence for Chinese text

## Chinese Tokens

Chinese-only targets:

- H1: `600 / 1.06 / 0`
- H2: `600 / 1.12 / 0`
- H3: `600 / 1.26 / 0`
- Body: `400 / 1.82 / 0`
- Meta: `400-500 / 1.68`
- Nav and buttons: `500`

Additional rules:

- Chinese hero titles should prefer 1-2 lines on desktop
- Chinese card titles should cap at 2 lines without using compressed line-height
- Chinese kicker labels should reduce tracking noise instead of imitating uppercase Latin labels

## Component Mapping

### Layer 1: Global Tokens

File:

- [app/globals.css](/Users/peak/Projects/GuruBoxAI/app/globals.css)

Work:

- Add Chinese typography overrides under `html[lang^="zh"]`
- Extend the font fallback stack
- Split `marketing-display-xl`, `marketing-heading`, `marketing-body`, and `marketing-kicker` into shared defaults plus Chinese overrides

### Layer 2: Shared Marketing Layout

Files:

- [components/marketing/marketing-sections.tsx](/Users/peak/Projects/GuruBoxAI/components/marketing/marketing-sections.tsx)
- [components/marketing/route-scaffold-page.tsx](/Users/peak/Projects/GuruBoxAI/components/marketing/route-scaffold-page.tsx)

Work:

- Add a Chinese-only marketing scope wrapper
- Map hero H1, section H2, narrative body, visual labels, and aside items to the Chinese token system
- Add Chinese-specific measure control where titles are most sensitive

### Layer 3: Cards, FAQ, Process, Example

Files:

- [components/marketing/marketing-sections.tsx](/Users/peak/Projects/GuruBoxAI/components/marketing/marketing-sections.tsx)

Work:

- Normalize Chinese card titles, FAQ titles, process titles, and example titles to the Chinese H3 system
- Raise Chinese body line-height in dense cards
- Reduce noisy tracking in labels and score lines

### Layer 4: Navbar and Footer

Files:

- [components/layout/navbar.tsx](/Users/peak/Projects/GuruBoxAI/components/layout/navbar.tsx)
- [components/layout/footer.tsx](/Users/peak/Projects/GuruBoxAI/components/layout/footer.tsx)

Work:

- Bring Chinese marketing nav, locale switcher, CTA, and footer headings into the token system
- Normalize weights to stable values
- Reduce label noise

## Rollout Steps

1. Write and freeze this plan
2. Record current site state and create rollback snapshot
3. Update progress log before each code pass
4. Implement global Chinese token layer
5. Implement shared marketing hero, section, and body layer
6. Implement card, FAQ, process, and example layer
7. Implement navbar and footer layer
8. Run build and Chinese-page validation
9. Update progress log with outcomes and remaining issues

## Validation

Required checks:

- `/zh`
- `/zh/ai-startup-idea-generator`
- `/zh/saas-idea-validation`
- `/zh/examples/ai-tools-for-freelancers`
- `/zh/guides/how-to-validate-an-ai-startup-idea`

Look for:

- H1/H2/H3 are visibly more relaxed
- Two-line Chinese titles no longer collide
- Kicker labels are quieter
- Navbar and footer Chinese text looks stable
- English pages are not affected
- Build still passes

## Deferred to Next Round

- Product tool area Chinese typography
- Any experimentation with premium Chinese display fonts
- Chinese serif title exploration
