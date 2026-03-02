import { Worker, Job } from 'bullmq'
import { redis } from '../redis'
import { AIEngine } from '../ai/engine'
import { supabaseAdmin } from '../supabase'

const aiEngine = new AIEngine()

export interface AnalysisJobData {
  input: string
  taskId: string
  reportId: string
  userId: string
}

export const analysisWorker = new Worker<AnalysisJobData>(
  'analysis-queue',
  async (job: Job<AnalysisJobData>) => {
    const { input, taskId, reportId, userId } = job.data

    console.log(`Starting analysis job: ${taskId}`)

    try {
      // Mark task as running
      await supabaseAdmin
        .from('tasks')
        .update({ status: 'running', updated_at: new Date().toISOString() })
        .eq('id', taskId)

      // Execute AI analysis
      await aiEngine.analyze(input, taskId, reportId)

      console.log(`Analysis job completed: ${taskId}`)
    } catch (error) {
      console.error(`Analysis job failed: ${taskId}`, error)

      // Mark task as failed
      await supabaseAdmin
        .from('tasks')
        .update({ status: 'failed', updated_at: new Date().toISOString() })
        .eq('id', taskId)

      // Mark report as failed
      await supabaseAdmin
        .from('reports')
        .update({ status: 'failed' })
        .eq('id', reportId)

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
  console.log(`Job completed: ${job.id}`)
})

analysisWorker.on('failed', (job, err) => {
  console.error(`Job failed: ${job?.id}`, err.message)
})

analysisWorker.on('error', (err) => {
  console.error('Worker error:', err)
})

// Graceful shutdown
process.on('SIGTERM', async () => {
  await analysisWorker.close()
})

process.on('SIGINT', async () => {
  await analysisWorker.close()
})
