# SEO Content Constraints and Terminology

Last updated: 2026-04-01
Status: A3 completed
Related documents:
- [seo_multilingual_execution_plan.md](./seo_multilingual_execution_plan.md)
- [seo_page_matrix.md](./seo_page_matrix.md)
- [seo_indexing_boundaries.md](./seo_indexing_boundaries.md)

## Purpose

This document freezes the public content rules for the multilingual SEO rollout.

It defines:
- what public marketing pages are allowed to say
- what public marketing pages must not say
- how page types differ in messaging
- how core English and Chinese terminology should be used

This document applies to:
- homepage
- core landing pages
- public example pages

It does not apply to:
- current private app UI copy
- current report UI labels
- internal analysis stage names unless they are exposed on marketing pages

## Core Content Rules

### Rule 1: Do not promise exact large output counts

Public marketing pages must not promise:
- `300 opportunities`
- `300 evaluated opportunities`
- `300 unique opportunity profiles`

Reason:
- current product behavior and public trust must stay aligned
- hard promises create conversion risk and credibility risk

Allowed alternatives:
- `20+ evaluated opportunities`
- `a ranked set of evaluated opportunities`
- `structured opportunity analysis for your direction`
- Chinese: `20+ 个经过评估的机会`
- Chinese: `一组经过筛选和排序的机会`

### Rule 2: Public SEO pages must focus on one primary intent

Each public page must have one primary search intent.

Allowed:
- homepage: broad product discovery
- core landing page: one explicit problem or tool intent
- example page: one explicit scenario and result preview

Not allowed:
- one page trying to rank for every major product concept at once
- mixing homepage messaging with example-page depth

### Rule 3: Public SEO copy must describe value before login

Public pages must show value before requiring login.

That means:
- visible example content
- visible workflow explanation
- visible output preview
- visible scoring or evaluation logic

Not allowed:
- pages that mostly push login before demonstrating value
- SEO landing pages that only replicate the product input box

### Rule 4: Public pages must avoid unverifiable superiority claims

Avoid phrases like:
- `best`
- `most accurate`
- `expert-level` unless grounded by visible explanation or proof
- `guaranteed`

Preferred alternatives:
- `structured`
- `ranked`
- `signal-backed`
- `designed for`
- Chinese: `结构化`
- Chinese: `基于信号`
- Chinese: `用于`

### Rule 5: English and Chinese pages are localized, not mirrored word-for-word

English and Chinese pages should share:
- intent
- structure
- CTA
- proof shape

But they should not use:
- mechanical sentence-by-sentence translation
- English-first phrasing awkwardly copied into Chinese

### Rule 6: Public SEO pages are distinct from app UI routes

Marketing pages describe the product and show public examples.

App routes perform authenticated product actions.

Marketing copy must not inherit app UI labels blindly if they are not good search-language choices.

## Messaging Boundaries by Page Type

## 1. Homepage Messaging Boundary

Homepage purpose:
- introduce the product category
- explain who it is for
- explain what input and output look like
- route visitors to the best next page

Homepage must include:
- broad positioning
- product workflow summary
- proof blocks
- links to core landing pages
- links to public examples

Homepage must not become:
- a full scenario report
- a deep tutorial
- a wall of app-specific internal terminology

Recommended messaging angle:
- English: `Find and evaluate AI startup directions faster`
- Chinese: `更快发现并评估 AI 创业方向`

## 2. Core Landing Page Messaging Boundary

Core landing page purpose:
- capture one specific tool-intent or solution-intent query
- explain why the problem exists
- show how the product solves that problem

Core landing pages must include:
- one primary keyword target
- one explicit problem statement
- one input/output example
- one CTA to try the product

Core landing pages must not become:
- generic overview pages
- broad category directories
- example report substitutes

## 3. Public Example Page Messaging Boundary

Public example page purpose:
- show realistic output quality
- help visitors self-identify with a use case
- reduce hesitation before entering the product

Public example pages must include:
- scenario brief
- evaluated opportunities or ranked outputs
- explanation of why selected items matter
- CTA back into the product

Public example pages must not become:
- private user reports
- thin SEO pages with no useful visible content
- generic listicles with no product connection

## Approved Positioning Language

Use these as the preferred framing for public pages.

### English positioning phrases

- `AI startup idea generator`
- `SaaS idea validation`
- `AI business opportunity analysis`
- `evaluate startup directions`
- `rank potential opportunities`
- `turn a product direction into structured opportunities`
- `signal-backed opportunity analysis`

### Chinese positioning phrases

- `AI 创业点子生成器`
- `SaaS 点子验证`
- `AI 商业机会分析`
- `评估创业方向`
- `机会排序与筛选`
- `把产品方向转成结构化机会`
- `基于信号的机会分析`

## Disallowed Public Marketing Phrases

Avoid these phrases in new public SEO pages:

### English disallowed phrases

- `receive 300 evaluated opportunities`
- `creating 300 unique opportunity profiles`
- `expert-level AI opportunity discovery`
- `best AI startup idea generator`
- `guaranteed opportunities`

### Chinese disallowed phrases

- `获取300条评估后的机会`
- `创建300个独特的机会画像`
- `专家级AI机会发现`
- `最佳 AI 创业点子生成器`
- `保证找到机会`

## Approved CTA Language

### English

Primary CTA:
- `Start Analysis`

Secondary CTAs:
- `View Sample Report`
- `Try Your Own Direction`

### Chinese

Primary CTA:
- `开始分析`

Secondary CTAs:
- `查看样例报告`
- `分析我的方向`

## Terminology Glossary

This glossary applies first to English and Chinese.

| Concept | Preferred English | Preferred Chinese | Notes |
| --- | --- | --- | --- |
| Product category | AI startup idea generator | AI 创业点子生成器 | homepage or generator page |
| Validation workflow | SaaS idea validation | SaaS 点子验证 | validation page |
| Opportunity workflow | AI business opportunity analysis | AI 商业机会分析 | opportunity page |
| Input | product direction | 产品方向 | preferred over vague `idea` in broad copy |
| Output set | evaluated opportunities | 经过评估的机会 | use with `20+` phrasing where relevant |
| Ranking logic | scoring dimensions | 评分维度 | public-facing explanation |
| Public example | sample report | 样例报告 | secondary CTA term |
| Signals | market signals | 市场信号 | avoid overly technical jargon |
| Core users | target users | 目标用户 | more natural in marketing copy |
| Solution | AI solution | AI 解决方案 | okay for examples and output previews |

## Existing Copy That Must Be Replaced Later

These are known phrases in the current codebase that conflict with this document.

### Known conflicting English copy

- `Enter your product direction and receive 300 evaluated opportunities.`
- `Creating 300 unique opportunity profiles`

### Known conflicting Chinese copy

- `输入你的产品方向，获取300条评估后的机会。`
- `创建300个独特的机会画像`

### Notes

These phrases currently exist in app and translation files.
They should be replaced when the implementation reaches the relevant files.

This document does not perform those replacements yet.

## Public Content Checklist

Every new public marketing page should satisfy all of the following:

- one primary keyword target
- one H1
- no hard `300` promise
- at least one visible proof or example block
- at least one primary CTA
- at least one supporting CTA where applicable
- wording that is understandable without login
- wording that matches the assigned page type

## Verification Checklist for A3

- [x] `20+` opportunity phrasing is locked for public marketing use.
- [x] disallowed public claims are documented.
- [x] homepage, core landing, and example page messaging boundaries are defined.
- [x] English and Chinese preferred terminology is defined.
- [x] conflicting legacy copy patterns are identified for later replacement.

