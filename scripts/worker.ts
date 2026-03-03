#!/usr/bin/env tsx
/**
 * BullMQ Worker Process
 * Run this separately from the Next.js dev server to handle background jobs
 *
 * Usage:
 *   npm run worker
 *   or: npx tsx --env-file=.env.local scripts/worker.ts
 */

import { analysisWorker } from '../lib/queue/worker'

console.log('🚀 Analysis Worker started')
console.log('Waiting for jobs...')

// Handle graceful shutdown
const shutdown = async (signal: string) => {
  console.log(`\n${signal} received, closing worker...`)
  await analysisWorker.close()
  process.exit(0)
}

process.on('SIGTERM', () => shutdown('SIGTERM'))
process.on('SIGINT', () => shutdown('SIGINT'))
