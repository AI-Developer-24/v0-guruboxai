# SEO Page Matrix

Last updated: 2026-04-01
Status: A1 completed
Related plan: [seo_multilingual_execution_plan.md](./seo_multilingual_execution_plan.md)

## Purpose

This document locks the multilingual SEO page matrix before implementation.

It defines:
- page groups
- route patterns
- launch phases
- indexability
- CTA mapping
- English and Chinese primary search intent

## Global Rules

1. All marketing SEO pages use locale-prefixed URLs.
2. Root `/` is an `x-default` entry route, not a locale SEO page.
3. Phase 1 only includes `en` and `zh`.
4. Phase 2 expands to `de`, `fr`, `it`, `es`, and `pt`.
5. All marketing pages are indexable.
6. Private app pages are non-indexable and excluded from sitemap.
7. Public marketing copy should use `20+ evaluated opportunities` or equivalent localized phrasing.

## Locale Set

### Phase 1 locales

- `en`
- `zh`

### Phase 2 locales

- `de`
- `fr`
- `it`
- `es`
- `pt`

## CTA Rules

### Primary CTA

For all marketing pages:
- English: `Start Analysis`
- Chinese: `开始分析`

Intent:
- move the visitor into the product entry flow

### Secondary CTA

For homepage and core landing pages:
- English: `View Sample Report`
- Chinese: `查看样例报告`

For example pages:
- English: `Try Your Own Direction`
- Chinese: `分析我的方向`

## Page Group Definitions

| ID | Page Group | Route Pattern | Page Type | Indexable | Primary Intent | Primary CTA | Secondary CTA | Phase |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| P01 | Homepage | `/{locale}` | Homepage | Yes | brand + broad solution discovery | Start Analysis | View Sample Report | Phase 1 |
| P02 | AI Startup Idea Generator | `/{locale}/ai-startup-idea-generator` | Core landing | Yes | tool-intent idea discovery | Start Analysis | View Sample Report | Phase 1 |
| P03 | SaaS Idea Validation | `/{locale}/saas-idea-validation` | Core landing | Yes | validation-intent search | Start Analysis | View Sample Report | Phase 1 |
| P04 | AI Business Opportunity Analysis | `/{locale}/ai-business-opportunity-analysis` | Core landing | Yes | solution-intent business analysis | Start Analysis | View Sample Report | Phase 1 |
| P05 | Example: AI Tools for Freelancers | `/{locale}/examples/ai-tools-for-freelancers` | Public example | Yes | scenario + example-intent | Try Your Own Direction | Back to Core Landing | Phase 1 |
| P06 | Example: AI Tools for Small Businesses | `/{locale}/examples/ai-tools-for-small-business` | Public example | Yes | scenario + example-intent | Try Your Own Direction | Back to Core Landing | Phase 1 |

## English and Chinese Search Intent Map

| ID | English Primary Keyword | English Supporting Intent | Chinese Primary Keyword | Chinese Supporting Intent |
| --- | --- | --- | --- | --- |
| P01 | `ai startup idea generator` | `saas idea validation`, `ai business ideas` | `AI 创业点子生成器` | `SaaS 点子验证`, `AI 商业机会分析` |
| P02 | `ai startup idea generator` | `generate startup ideas with ai`, `business idea generator for startups` | `AI 创业点子生成器` | `AI 创业方向生成`, `AI 商业点子筛选` |
| P03 | `saas idea validation` | `validate saas idea`, `how to test a saas idea` | `SaaS 点子验证` | `SaaS 方向验证`, `SaaS 创业想法评估` |
| P04 | `ai business opportunity analysis` | `market opportunity analysis ai`, `ai opportunity finder` | `AI 商业机会分析` | `AI 机会分析`, `AI 细分市场机会` |
| P05 | `ai tools for freelancers` | `freelancer ai business ideas`, `ai freelancer software opportunities` | `自由职业者 AI 工具` | `面向自由职业者的 AI 机会`, `自由职业者 AI 创业方向` |
| P06 | `ai tools for small business` | `small business ai opportunities`, `ai ideas for smb` | `中小企业 AI 工具` | `中小企业 AI 机会`, `小企业 AI 创业方向` |

## English and Chinese URL Inventory

These 12 pages are the first implementation milestone.

| Locale | ID | URL | Indexable | Status |
| --- | --- | --- | --- | --- |
| en | P01 | `/en` | Yes | Planned |
| zh | P01 | `/zh` | Yes | Planned |
| en | P02 | `/en/ai-startup-idea-generator` | Yes | Planned |
| zh | P02 | `/zh/ai-startup-idea-generator` | Yes | Planned |
| en | P03 | `/en/saas-idea-validation` | Yes | Planned |
| zh | P03 | `/zh/saas-idea-validation` | Yes | Planned |
| en | P04 | `/en/ai-business-opportunity-analysis` | Yes | Planned |
| zh | P04 | `/zh/ai-business-opportunity-analysis` | Yes | Planned |
| en | P05 | `/en/examples/ai-tools-for-freelancers` | Yes | Planned |
| zh | P05 | `/zh/examples/ai-tools-for-freelancers` | Yes | Planned |
| en | P06 | `/en/examples/ai-tools-for-small-business` | Yes | Planned |
| zh | P06 | `/zh/examples/ai-tools-for-small-business` | Yes | Planned |

## Remaining Locale Expansion Inventory

These pages are deferred until English and Chinese are complete and verified.

### German

- `/de`
- `/de/ai-startup-idea-generator`
- `/de/saas-idea-validation`
- `/de/ai-business-opportunity-analysis`
- `/de/examples/ai-tools-for-freelancers`
- `/de/examples/ai-tools-for-small-business`

### French

- `/fr`
- `/fr/ai-startup-idea-generator`
- `/fr/saas-idea-validation`
- `/fr/ai-business-opportunity-analysis`
- `/fr/examples/ai-tools-for-freelancers`
- `/fr/examples/ai-tools-for-small-business`

### Italian

- `/it`
- `/it/ai-startup-idea-generator`
- `/it/saas-idea-validation`
- `/it/ai-business-opportunity-analysis`
- `/it/examples/ai-tools-for-freelancers`
- `/it/examples/ai-tools-for-small-business`

### Spanish

- `/es`
- `/es/ai-startup-idea-generator`
- `/es/saas-idea-validation`
- `/es/ai-business-opportunity-analysis`
- `/es/examples/ai-tools-for-freelancers`
- `/es/examples/ai-tools-for-small-business`

### Portuguese

- `/pt`
- `/pt/ai-startup-idea-generator`
- `/pt/saas-idea-validation`
- `/pt/ai-business-opportunity-analysis`
- `/pt/examples/ai-tools-for-freelancers`
- `/pt/examples/ai-tools-for-small-business`

## Page Pairing Rules

1. Every locale page must map to the same page group ID across languages.
2. Slugs remain stable across all locales for implementation simplicity and `hreflang` consistency.
3. Locale switching should always point to the same page group in another locale.
4. The root `/` should map to the homepage group as `x-default`, but not be included as a locale SEO page.

## Verification Checklist for A1

- [x] All page groups are defined.
- [x] All phase 1 locale variants are defined.
- [x] Final locale expansion set is defined.
- [x] Primary CTA and secondary CTA rules are defined.
- [x] Indexability for all marketing page groups is defined.
- [x] English and Chinese public page count is confirmed as 12.
- [x] Final multilingual SEO page count is confirmed as 42.

