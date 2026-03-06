#!/usr/bin/env tsx
/**
 * BullMQ Worker Process
 * Run this separately from the Next.js dev server to handle background jobs
 *
 * Usage:
 *   npm run worker
 *   or: npx tsx --env-file=.env.local scripts/worker.ts
 */

import http from 'http'
import { analysisWorker } from '../lib/queue/worker'
import { logger } from '../lib/logger'

const workerLogger = logger.withContext('WorkerProcess')

// Health check server for Railway/container orchestration
const PORT = process.env.PORT || 3001

const healthServer = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({
      status: 'ok',
      timestamp: new Date().toISOString(),
      worker: 'analysis-worker'
    }))
  } else {
    res.writeHead(404)
    res.end()
  }
})

healthServer.listen(PORT, () => {
  workerLogger.info(`Health check server running on port ${PORT}`)
})

workerLogger.info('Analysis Worker started')
workerLogger.info('Waiting for jobs...')

// Handle graceful shutdown
const shutdown = async (signal: string) => {
  workerLogger.info(`${signal} received, closing worker...`)
  await analysisWorker.close()
  process.exit(0)
}

process.on('SIGTERM', () => shutdown('SIGTERM'))
process.on('SIGINT', () => shutdown('SIGINT'))
