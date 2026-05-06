# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development

```bash
npm run dev      # Next.js dev server
npm run worker   # BullMQ worker (must run alongside dev for analysis jobs)
npm run build    # Production build (note: typescript.ignoreBuildErrors = true in next.config)
npm run lint     # ESLint
```

No test framework is configured. Formatting via Prettier (`npm exec prettier -- --write .`).

## Project

**BadgerSignal** — AI expert toolbox. First tool: **AI Product Insight** generates 300 product opportunities + expert summary from user input.

- 300 opportunities/report, 20/page | 30s–5min runtime | 1 concurrent task/user
- Languages: EN, ZH, DE, FR, IT, ES, PT
- Premium opportunity: `final_score >= 80`

## Tech Stack

Next.js 16 + React 19 + TypeScript | Tailwind CSS v4 (OKLCH) | Radix UI/shadcn | Supabase (Auth + DB) | BullMQ + Redis (ioredis) | OpenAI / Anthropic / DashScope (Qwen)

Note: `next-auth` is listed as a dependency but is **not used at runtime**. All auth is Supabase Auth with Google OAuth.

## Architecture

### Request Flow

```
User input → POST /api/v1/tools/product-insight/tasks
  → AIService.startAnalysis() creates Report + Task in Supabase, enqueues BullMQ job
  → Separate worker process (npm run worker) picks up job
  → AIEngine.analyze() runs 6-stage pipeline
  → Saves opportunities + summary to Supabase
Client polls GET /api/v1/tasks/:task_id → redirects to /report/:report_id on completion
```

### AI Engine Pipeline (`lib/ai/`)

Six sequential stages, each with cancellation checks and DB progress updates:

1. **Understanding** (cheap model) — Extract key concepts, users, problems from input
2. **Analyzing** (cheap model) — Industry structure, market size, trends
3. **Scanning** (premium model, 32k tokens) — 10 intelligence sources
4. **Generating** (premium model, temp 0.8) — Product opportunities in batches
5. **Scoring** (cheap model) — Score on 5 dimensions → weighted `final_score`
6. **Finalizing** (premium model) — Expert summary, saves all to DB

Key files:

- `engine.ts` — Orchestrates stages, validates AI responses with Zod schemas
- `prompts.ts` — Prompt templates + Zod output schemas per stage
- `service.ts` — Entry point: creates DB records, enqueues job
- `providers/factory.ts` — Routes to OpenAI (`gpt-*`), Anthropic (`claude-*`), or DashScope (`qwen-*`) by model name prefix

Three model tiers configured via env: `DEFAULT_MODEL`, `CHEAP_MODEL`, `PREMIUM_MODEL`.

### Three Supabase Clients

1. **Browser client** (`lib/supabase.ts`) — `createBrowserClient`, used by AuthProvider and components. RLS-enforced.
2. **Admin client** (`lib/supabase-admin.ts`) — Service role key, bypasses RLS. Used by worker and privileged API operations.
3. **Per-request server client** — Created inline in middleware/API routes using `cookies()` from `next/headers`. Follows `getAll()/setAll()` cookie pattern for `@supabase/ssr` v0.9+.

Data access layer in `lib/supabase/` uses admin client for writes that bypass RLS, regular client for reads.

### Authentication

Google OAuth popup flow with Safari compatibility (popup opened synchronously in click handler). Flow: `LoginDialog` → `AuthProvider.login()` → Supabase OAuth → `/auth/callback` (code exchange + user upsert) → `postMessage('GOOGLE_AUTH_SUCCESS')` back to opener.

`requireAuth()` in `lib/api/auth.ts` for API routes; `middleware.ts` protects `/account/*` only.

### i18n — Two Separate Systems

- **Client translations**: `lib/translations.ts` (~900 lines, 7 languages) → `I18nProvider` context with `t(key)` function. Locale persisted in `localStorage`.
- **SEO metadata**: `lib/seo/` — server-side localized titles/descriptions via Next.js Metadata API. Routes in `app/[locale]/`. Middleware sets `x-seo-locale` header.

### Export

- PDF via `@react-pdf/renderer` (`lib/export/pdf.tsx`)
- Google Docs via Google OAuth + Drive API (`lib/export/google-docs.ts`)

## API Routes

| Method | Endpoint                                   | Description               |
| ------ | ------------------------------------------ | ------------------------- |
| POST   | `/api/v1/tools/product-insight/tasks`      | Create analysis task      |
| GET    | `/api/v1/tasks/:task_id`                   | Task status (no-cache)    |
| DELETE | `/api/v1/tasks/:task_id`                   | Cancel running task       |
| GET    | `/api/v1/reports`                          | List reports (paginated)  |
| GET    | `/api/v1/reports/:report_id`               | Get report                |
| DELETE | `/api/v1/reports/:report_id`               | Soft delete               |
| GET    | `/api/v1/reports/:report_id/opportunities` | Opportunities (paginated) |
| GET    | `/api/v1/reports/:report_id/export/pdf`    | Export PDF                |
| POST   | `/api/v1/reports/:report_id/export/gdocs`  | Export to Google Docs     |
| PUT    | `/api/v1/users/language`                   | Update language           |

API patterns: all routes use `requireAuth()` + Zod validation + `lib/api/response.ts` helpers (`successResponse`, `errorResponse`, etc.). Error format: `{ error: { code, message, details } }`.

## Code Style

- **TypeScript**: Strict mode, no `any`, explicit return types, reuse `lib/types.ts`
- **React**: Function components + hooks, split if >200 lines, use existing `components/ui`
- **Styling**: Tailwind classes only, no inline colors, OKLCH design tokens
- **API**: Validate input with Zod, use response helpers, proper HTTP status codes
- **Supabase**: Use `lib/supabase/` data access functions, no raw SQL in components

## AI Engine Rules

- **Do not** bypass the 6-stage pipeline
- When editing prompts: preserve structure/headings, keep instructions explicit
- Use provider factory pattern in `providers/factory.ts`
- Never hardcode API keys

## Design System

Theme: **"灵光乍现"** — Professional, Futuristic, Effortless. Reference: Linear, Vercel, Perplexity.

- OKLCH color space, glass morphism, slow gradient motion (10-30s)
- Signal scanning animation for loading (not spinners)
- Avoid: neon, strong contrasts, complex particles, high-frequency animations
- Mobile: auto-disable background animations

## Environment

See `.env.example` for all required variables. Key groups: Supabase, AI provider keys + model names, Redis URL, Google OAuth for Docs export, app URL.

`lib/env.ts` validates required vars at startup and guards against leaking sensitive vars to the client. Helper scripts for local setup:

```bash
node scripts/verify-env.mjs    # Check all required env vars are set
node scripts/verify-db.mjs     # Verify Supabase connection
node scripts/test-redis.mjs    # Verify Redis connection
```

## Observability

- **Sentry**: Configured via `sentry.client.config.ts`, `sentry.server.config.ts`, `sentry.edge.config.ts`.
- **Logger**: Use `lib/logger.ts` for all logging. Pattern: `const log = logger.withContext('ModuleName')`, then `log.info/warn/error/debug(msg, data)`.

## SEO 落地页

`app/[locale]/` 包含静态 SEO 落地页（无需登录即可访问）：
- `ai-business-opportunity-analysis/`
- `ai-startup-idea-generator/`
- `saas-idea-validation/`
- `examples/`

这些页面通过 middleware 设置的 `x-seo-locale` 请求头来确定服务端语言环境。新增 SEO 页面时，在此目录下按照相同模式添加。支持的 SEO 语言列表定义在 `lib/seo/locales.ts` 中。
