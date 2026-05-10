# SEO Round 2 Production Environment Reference

Last updated: 2026-05-07
Owner: Codex + User
Status: Ready for deployment setup

## Purpose

This document explains which production environment variables matter for the Round 2 SEO rollout, where they are used, and what breaks if they are wrong.

Use this together with:

- [launch readiness checklist](/Users/peak/Projects/GuruBoxAI/docs/seo_round2_launch_readiness_checklist.md)
- [Search Console submission checklist](/Users/peak/Projects/GuruBoxAI/docs/seo_round2_search_console_submission_checklist.md)
- [.env.production.example](/Users/peak/Projects/GuruBoxAI/.env.production.example)

## Highest-Priority Variables

### `NEXT_PUBLIC_APP_URL`

Expected format:

- `https://app.example.com`

Used by:

- canonical and locale alternates
- Open Graph and Twitter absolute URLs
- `robots.txt`
- `sitemap.xml`
- marketing/page metadata origin handling
- auth redirect helpers
- Google Docs export OAuth redirect generation

If wrong:

- canonical may point to the wrong domain
- `hreflang` targets may be wrong
- Search Console may see mismatched origins
- OAuth callback URLs may break

### `NEXTAUTH_URL`

Expected format:

- `https://app.example.com`

Used by:

- NextAuth callback handling
- production-origin consistency checks

If wrong:

- OAuth flows may fail
- metadata origin consistency checks may fail

### `REDIS_URL`

Expected format:

- `rediss://...`

Used by:

- queue / worker infrastructure
- runtime Redis connection

If wrong:

- production boot can fail
- worker-backed product flows may break

## Additional Required Variables

### `NEXTAUTH_SECRET`

Required for:

- stable secure auth sessions

### `NEXT_PUBLIC_SUPABASE_URL`
### `NEXT_PUBLIC_SUPABASE_ANON_KEY`
### `SUPABASE_SERVICE_ROLE_KEY`

Required for:

- public auth
- server-side Supabase operations

## Optional But Operationally Important

### `GOOGLE_CLIENT_ID`
### `GOOGLE_CLIENT_SECRET`

Required only if Google Docs export OAuth is intended to work in production.

### `OPENAI_API_KEY`
### `ANTHROPIC_API_KEY`
### `DASHSCOPE_API_KEY`

At least one AI provider key must be available or product analysis cannot run.

## Verification Commands

Local/deployment verification:

```bash
npm run verify:env
npm run verify:env -- --production
```

Build verification:

```bash
npm run build
./node_modules/.bin/tsx --env-file=.env.local scripts/validate_multilingual_seo.ts
```

## Required Consistency Rules

These must all be true in production:

1. `NEXT_PUBLIC_APP_URL` is a valid absolute HTTPS URL.
2. `NEXTAUTH_URL` is a valid absolute HTTPS URL.
3. `NEXT_PUBLIC_APP_URL` and `NEXTAUTH_URL` share the same origin.
4. Neither URL points to `localhost`.
5. `REDIS_URL` uses `rediss://`.

## Recommended Setup Flow

1. Start from [.env.production.example](/Users/peak/Projects/GuruBoxAI/.env.production.example).
2. Fill in real provider values in your deployment platform.
3. Run `npm run verify:env -- --production`.
4. Run `npm run build`.
5. Deploy.
6. Run the Search Console submission checklist after production is live.
