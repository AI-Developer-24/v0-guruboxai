import { Worker, Job } from 'bullmq'
import { getRedisConfig } from '../env'
import { AIEngine } from '../ai/engine'
import { supabaseAdmin } from '../supabase-admin'
import { logger } from '../logger'

const workerLogger = logger.withContext('Worker')

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

workerLogger.info('Initializing analysis worker...')

// Get Redis URL for BullMQ Worker
const { url: redisUrl } = getRedisConfig()

export const analysisWorker = new Worker<AnalysisJobData>(
  'analysis-queue',
  async (job: Job<AnalysisJobData>) => {
    const { input, taskId, reportId, userId } = job.data

    workerLogger.info('Starting analysis job', {
      taskId,
      reportId,
      userId,
      inputPreview: input.substring(0, 100),
    })

    try {
      // Mark task as running
      workerLogger.debug('Marking task as running...', { taskId })
      const { error: updateError } = await supabaseAdmin
        .from('tasks')
        .update({ status: 'running', updated_at: new Date().toISOString() } as never)
        .eq('id', taskId)

      if (updateError) {
        workerLogger.error('Failed to mark task as running', updateError, taskId)
      } else {
        workerLogger.debug('Task marked as running', { taskId })
      }

      // Execute AI analysis
      workerLogger.info('Starting AI engine analysis...', { taskId })
      await aiEngine.analyze(input, taskId, reportId)

      workerLogger.info('Analysis job completed', { taskId })
    } catch (error) {
      // Check if task was cancelled
      if (error instanceof Error && error.name === 'TaskCancelledError') {
        workerLogger.info('Analysis job CANCELLED', { taskId })
        // Don't throw - task was intentionally cancelled
        return
      }

      workerLogger.error('Analysis job FAILED', error, { taskId })

      // Mark task as failed
      workerLogger.debug('Marking task as failed...', { taskId })
      const { error: taskError } = await supabaseAdmin
        .from('tasks')
        .update({ status: 'failed', updated_at: new Date().toISOString() } as never)
        .eq('id', taskId)

      if (taskError) {
        workerLogger.error('Failed to mark task as failed', taskError, taskId)
      }

      // Mark report as failed
      workerLogger.debug('Marking report as failed...', { reportId })
      const { error: reportError } = await supabaseAdmin
        .from('reports')
        .update({ status: 'failed' } as never)
        .eq('id', reportId)

      if (reportError) {
        workerLogger.error('Failed to mark report as failed', reportError, reportId)
      }

      throw error
    }
  },
  {
    connection: {
      url: redisUrl,
      maxRetriesPerRequest: null,
    } as never,
    concurrency: 5, // Maximum concurrent tasks
  }
)

// Worker event listeners
analysisWorker.on('completed', (job) => {
  workerLogger.info('Job completed', { jobId: job.id })
})

analysisWorker.on('failed', (job, err) => {
  workerLogger.error('Job failed', err, { jobId: job?.id })
})

analysisWorker.on('error', (err) => {
  workerLogger.error('Worker error', err)
})

analysisWorker.on('active', (job) => {
  workerLogger.debug('Job started processing', { jobId: job.id })
})

analysisWorker.on('stalled', (jobId) => {
  workerLogger.warn('Job stalled', { jobId })
})

workerLogger.info('Analysis worker initialized and ready')

// Graceful shutdown
process.on('SIGTERM', async () => {
  workerLogger.info('Received SIGTERM, closing worker...')
  await analysisWorker.close()
})

process.on('SIGINT', async () => {
  workerLogger.info('Received SIGINT, closing worker...')
  await analysisWorker.close()
})
