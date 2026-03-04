import { Worker, Job } from 'bullmq'
import { redis } from '../redis'
import { AIEngine } from '../ai/engine'
import { supabaseAdmin } from '../supabase'

const aiEngine = new AIEngine()

// Custom error for cancelled tasks
class TaskCancelledError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'TaskCancelledError'
  }
}

export interface AnalysisJobData {
  input: string
  taskId: string
  reportId: string
  userId: string
}

console.log('[Worker] Initializing analysis worker...')

export const analysisWorker = new Worker<AnalysisJobData>(
  'analysis-queue',
  async (job: Job<AnalysisJobData>) => {
    const { input, taskId, reportId, userId } = job.data

    console.log(`[Worker] ========================================`)
    console.log(`[Worker] Starting analysis job`)
    console.log(`[Worker]   Task ID: ${taskId}`)
    console.log(`[Worker]   Report ID: ${reportId}`)
    console.log(`[Worker]   User ID: ${userId}`)
    console.log(`[Worker]   Input: ${input.substring(0, 100)}...`)
    console.log(`[Worker] ========================================`)

    try {
      // Mark task as running
      console.log(`[Worker] Marking task as running...`)
      const { error: updateError } = await supabaseAdmin
        .from('tasks')
        .update({ status: 'running', updated_at: new Date().toISOString() })
        .eq('id', taskId)

      if (updateError) {
        console.error(`[Worker] Failed to mark task as running:`, updateError)
      } else {
        console.log(`[Worker] Task marked as running`)
      }

      // Execute AI analysis
      console.log(`[Worker] Starting AI engine analysis...`)
      await aiEngine.analyze(input, taskId, reportId)

      console.log(`[Worker] ========================================`)
      console.log(`[Worker] Analysis job completed: ${taskId}`)
      console.log(`[Worker] ========================================`)
    } catch (error) {
      // Check if task was cancelled
      if (error instanceof Error && error.name === 'TaskCancelledError') {
        console.log(`[Worker] ========================================`)
        console.log(`[Worker] Analysis job CANCELLED: ${taskId}`)
        console.log(`[Worker] ========================================`)
        // Don't throw - task was intentionally cancelled
        return
      }

      console.error(`[Worker] ========================================`)
      console.error(`[Worker] Analysis job FAILED: ${taskId}`)
      console.error(`[Worker] Error:`, error)
      console.error(`[Worker] ========================================`)

      // Mark task as failed
      console.log(`[Worker] Marking task as failed...`)
      const { error: taskError } = await supabaseAdmin
        .from('tasks')
        .update({ status: 'failed', updated_at: new Date().toISOString() })
        .eq('id', taskId)

      if (taskError) {
        console.error(`[Worker] Failed to mark task as failed:`, taskError)
      }

      // Mark report as failed
      console.log(`[Worker] Marking report as failed...`)
      const { error: reportError } = await supabaseAdmin
        .from('reports')
        .update({ status: 'failed' })
        .eq('id', reportId)

      if (reportError) {
        console.error(`[Worker] Failed to mark report as failed:`, reportError)
      }

      throw error
    }
  },
  {
    connection: redis,
    concurrency: 5, // Maximum concurrent tasks
    attempts: 3,    // Maximum retry attempts
    backoff: {
      type: 'exponential',
      delay: 5000,
    },
  }
)

// Worker event listeners
analysisWorker.on('completed', (job) => {
  console.log(`[Worker.Event] Job completed: ${job.id}`)
})

analysisWorker.on('failed', (job, err) => {
  console.error(`[Worker.Event] Job failed: ${job?.id}`, err.message)
})

analysisWorker.on('error', (err) => {
  console.error('[Worker.Event] Worker error:', err)
})

analysisWorker.on('active', (job) => {
  console.log(`[Worker.Event] Job started processing: ${job.id}`)
})

analysisWorker.on('stalled', (jobId) => {
  console.warn(`[Worker.Event] Job stalled: ${jobId}`)
})

console.log('[Worker] Analysis worker initialized and ready')

// Graceful shutdown
process.on('SIGTERM', async () => {
  await analysisWorker.close()
})

process.on('SIGINT', async () => {
  await analysisWorker.close()
})
