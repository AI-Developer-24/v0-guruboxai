# CLAUDE.md

## Development

```bash
npm run dev      # Dev server
npm run worker   # BullMQ worker (run in parallel with dev)
npm run build    # Production build
npm run lint     # ESLint
```

## Project

**BadgerSignal** - AI expert toolbox. First tool: **AI Product Insight** generates 300 product opportunities + expert summary from user input.

- 300 opportunities/report, 20/page | 30s–5min runtime | 1 concurrent task/user
- Languages: EN, ZH, DE, FR, IT, ES, PT

## Tech Stack

Next.js 16 + TypeScript | Tailwind CSS v4 (OKLCH) | Radix UI/shadcn | Supabase (Auth + DB) | BullMQ + Redis | OpenAI/Anthropic/DashScope

## Architecture

```
/app                    # Next.js App Router
  /tools/product-insight
  /analysis/[task_id]
  /report/[report_id]
  /api/v1

/components             # React components
  /ui, /auth, /layout, /tool, /i18n

/lib
  types.ts, translations.ts, constants.ts, utils.ts
  /api, /supabase, /queue
  /ai/providers, engine.ts, service.ts, prompts.ts
```

## Data Models (`lib/types.ts`)

- `User`: id, email, name, avatar, language
- `Report`: id, user_id, input_text, status, analysis_time_sec, total_opportunities, summary_text, is_deleted
- `Task`: id, user_id, report_id, status, current_stage, stages_completed
- `Opportunity`: monetization, industry_size, competition, mvp_difficulty, final_score

**Analysis Stages**: understanding → analyzing → scanning → generating → scoring → finalizing

## API Routes


| Method | Endpoint                                   | Description               |
| ------ | ------------------------------------------ | ------------------------- |
| POST   | `/api/v1/tools/product-insight/tasks`      | Create task               |
| GET    | `/api/v1/tasks/:task_id`                   | Task status               |
| GET    | `/api/v1/reports`                          | List reports              |
| GET    | `/api/v1/reports/:report_id`               | Get report                |
| GET    | `/api/v1/reports/:report_id/opportunities` | Opportunities (paginated) |
| DELETE | `/api/v1/reports/:report_id`               | Soft delete               |
| PUT    | `/api/v1/users/language`                   | Update language           |


## Code Style

- **TypeScript**: Strict typing, no `any`, explicit return types, reuse `lib/types.ts`
- **React**: Function components + hooks, split if >200 lines, use existing `components/ui`
- **Styling**: Tailwind classes only, no inline colors, use design tokens
- **API**: Validate input, return `{ error: { code, message } }` for errors, use proper status codes
- **Supabase**: Use `lib/supabase` helpers, no raw SQL in components

## AI Engine (`lib/ai/`)

- **Do not** bypass the 6-stage pipeline
- When editing prompts: preserve structure/headings, keep instructions explicit
- Use provider factory pattern in `providers/factory.ts`
- Never hardcode API keys

## Design System

Theme: **"灵光乍现"** - Professional, Futuristic, Effortless. Reference: Linear, Vercel, Perplexity.

- OKLCH color space, glass morphism, slow gradient motion (10-30s)
- Signal scanning animation for loading (not spinners)
- Avoid: neon, strong contrasts, complex particles, high-frequency animations

## Notes

- Premium opportunity: `final_score >= 80`
- Mobile: auto-disable background animations
- See `.env.example` for required environment variables

