# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
npm run worker   # Start BullMQ worker (run separately from dev server)
```

## Project Overview

**GuruBox.ai** is an AI expert toolbox platform. The first tool is **AI Product Insight**, which generates expert-level AI product opportunity analysis reports (300 opportunities + expert summary) from user input directions.

### Key Specifications
- 300 opportunities per report, 20 per page
- 30s–5min runtime per analysis
- Maximum 1 concurrent task per user
- Multi-language support: EN, ZH, DE, FR, IT, ES, PT
- Report data is permanently saved (soft delete supported)

## Technology Stack

- **Framework**: Next.js 16.1.6 with App Router
- **Language**: TypeScript 5.7.3
- **UI**: Radix UI components via shadcn/ui
- **Styling**: Tailwind CSS v4 with OKLCH color space
- **Theming**: next-themes (dark/light mode)
- **Authentication**: Supabase Auth with Google OAuth
- **Database**: Supabase PostgreSQL
- **AI Providers**: OpenAI, Anthropic, Alibaba Cloud DashScope (Qwen)
- **Queue**: BullMQ with Redis
- **Notifications**: Sonner

## Architecture

### Directory Structure

```
/app                    # Next.js App Router pages
  /tools/product-insight # Main AI Product Insight tool page
  /analysis/[task_id]   # Analysis progress tracking
  /report/[report_id]    # Report display page
  /account              # User account and history
  /api/v1               # API routes

/components             # React components
  /ui                   # shadcn/ui base components
  /auth                 # Authentication components
  /layout               # Navbar, Footer
  /tool                 # Tool-specific components
  /i18n                 # Internationalization components
  /account, /analysis, /report  # Feature-specific components

/lib                    # Utilities and business logic
  types.ts              # TypeScript type definitions
  translations.ts       # i18n translations
  constants.ts          # App constants
  utils.ts              # Utility functions
  api/                  # API client and response helpers
  supabase/             # Supabase client and user management
  ai/                   # AI engine and providers
    providers/          # AI provider implementations (OpenAI, Anthropic, DashScope)
    engine.ts           # 6-stage AI analysis pipeline
    service.ts          # AI service for queue integration
    prompts.ts          # AI prompt templates and schemas
  queue/                # BullMQ worker
  redis.ts              # Redis configuration
```

### Data Models (lib/types.ts)

**Core Entities:**
- `User`: id, google_id, email, name, avatar, language
- `Report`: id, user_id, input_text, status, analysis_time_sec, total_opportunities, premium_ratio, summary_text, created_at, is_deleted
- `Task`: id, user_id, report_id, status, current_stage, stages_completed, created_at
- `Opportunity`: Detailed product opportunity with scoring metrics (monetization, industry_size, competition, mvp_difficulty, final_score)

**Analysis Stages:**
1. `understanding` - Understanding idea
2. `analyzing` - Analyzing markets
3. `scanning` - Scanning signals
4. `generating` - Generating opportunities
5. `scoring` - Scoring opportunities
6. `finalizing` - Finalizing report

### API Routes

- `POST /api/v1/tools/product-insight/tasks` - Create new analysis task
- `GET /api/v1/tasks/:task_id` - Get task status
- `GET /api/v1/reports` - List user reports (paginated)
- `GET /api/v1/reports/:report_id` - Get single report
- `GET /api/v1/reports/:report_id/opportunities` - Get opportunities (paginated)
- `DELETE /api/v1/reports/:report_id` - Delete report (soft delete)
- `PUT /api/v1/users/language` - Update user language preference
- `POST /api/v1/reports/:report_id/exports/pdf` - Export to PDF
- `POST /api/v1/reports/:report_id/exports/google-docs` - Export to Google Docs

## Design System

The app uses a custom design theme called **"灵光乍现" (Spark of Insight)** with:

- **OKLCH color space** for better accessibility
- **Glass morphism** effects with gradient backgrounds
- **Slow gradient motion** background animation (10-30s cycle, GPU-accelerated, 60fps)
- **Signal scanning style** animation for analysis loading (not simple spinners)
- Subtle animations: soft glow on input focus, gradient shift on button hover, smooth table transitions

Design principles: Professional, Futuristic, Effortless, Expert-level. Reference: Linear, Vercel, Perplexity.

Avoid: Neon styles, strong contrasts, complex particle animations, high-frequency animations, visual noise.

## Environment Variables

Required environment variables (see `.env.example`):

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# NextAuth
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000

# AI Providers (at least one required)
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
DASHSCOPE_API_KEY=

# Model Selection
DEFAULT_MODEL=gpt-4
CHEAP_MODEL=gpt-3.5-turbo
PREMIUM_MODEL=gpt-4

# Redis (for BullMQ)
REDIS_URL=redis://localhost:6379

# Google Docs Export
GOOGLE_DOCS_CREDENTIALS=
```

## Current Implementation Status

### Completed
- ✅ Frontend UI implementation with Next.js App Router
- ✅ Design system with "灵光乍现" theme
- ✅ Supabase Auth with Google OAuth
- ✅ Internationalization system with type-safe translations (7 languages)
- ✅ API routes for all operations
- ✅ AI engine with multi-provider support (OpenAI, Anthropic, DashScope)
- ✅ BullMQ worker for background job processing
- ✅ Database models and migrations
- ✅ Report display with pagination (20 per page)
- ✅ Real-time task progress tracking with polling

### In Progress
- 🚧 PDF export functionality (API route exists, needs implementation)
- 🚧 Google Docs export functionality (API route exists, needs implementation)

## Key Features

### AI Product Insight Tool
- Single input box with natural language support
- Pre-populated suggestions (3-6 items) for quick start
- Real-time analysis progress tracking via 6-stage pipeline
- Export capabilities: PDF, Google Docs (coming soon)
- Persistent report history in user account

### User Management
- Google OAuth authentication via Supabase
- User profiles with avatar
- Analysis history tracking
- Language preference settings (account dropdown)

## Important Notes

- All data is persisted in Supabase PostgreSQL database
- The AI analysis runs in a separate BullMQ worker process
- The worker should be started with `npm run worker` in parallel with `npm run dev`
- Tasks support resume functionality via database state
- Premium opportunities are defined as `final_score >= 80`
- Mobile devices auto-disable background animations for performance

## Running the Application

For full functionality:

1. Start the dev server: `npm run dev`
2. Start the worker (in another terminal): `npm run worker`
3. Ensure Redis is running locally or use Upstash Redis

For development without AI features, you can skip the worker, but task creation will fail.
