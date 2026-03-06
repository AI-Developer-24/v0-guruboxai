import { Queue } from 'bullmq'
import { getRedisConfig } from '../env'
import { supabaseAdmin } from '../supabase-admin'
import type { AnalysisJobData } from '../queue/worker'
import { logger } from '../logger'

const serviceLogger = logger.withContext('AIService')

serviceLogger.debug('Initializing analysis queue...')

// Get Redis URL for BullMQ
const { url: redisUrl } = getRedisConfig()

const analysisQueue = new Queue<AnalysisJobData>('analysis-queue', {
  connection: {
    url: redisUrl,
    maxRetriesPerRequest: null,
  } as never,
})

serviceLogger.info('Analysis queue initialized')

export class AIService {
  /**
   * Start a new analysis
   */
  async startAnalysis(input: string, userId: string) {
    serviceLogger.info('Starting new analysis', { userId, inputPreview: input.substring(0, 100) })

    // Check concurrent task limit
    serviceLogger.debug('Checking concurrent task limit...')
    type RunningTask = { id: string; report_id: string }
    const { data: runningTask, error: checkError } = await supabaseAdmin
      .from('tasks')
      .select('id, report_id')
      .eq('user_id', userId)
      .eq('status', 'running')
      .maybeSingle()

    if (checkError) {
      serviceLogger.error('Error checking concurrent tasks', checkError)
    }

    const typedRunningTask = runningTask as RunningTask | null
    if (typedRunningTask) {
      serviceLogger.warn('User has running task', { taskId: typedRunningTask.id })
      throw new Error('CONCURRENT_TASK_LIMIT')
    }

    serviceLogger.debug('No running tasks, proceeding...')

    // Create report
    serviceLogger.debug('Creating report...')
    const { data: report, error: reportError } = await supabaseAdmin
      .from('reports')
      .insert({
        user_id: userId,
        input_text: input,
        status: 'generating',
      } as never)
      .select()
      .single()

    if (reportError) {
      serviceLogger.error('Failed to create report', reportError)
      throw new Error('Failed to create report')
    }
    type ReportResult = { id: string }
    const typedReport = report as ReportResult
    serviceLogger.debug('Report created', { reportId: typedReport.id })

    // Create task
    serviceLogger.debug('Creating task...')
    const { data: task, error: taskError } = await supabaseAdmin
      .from('tasks')
      .insert({
        user_id: userId,
        report_id: typedReport.id,
        status: 'pending',
        current_stage: 'understanding',
      } as never)
      .select()
      .single()

    if (taskError) {
      serviceLogger.error('Failed to create task', taskError)
      // Rollback report
      serviceLogger.warn('Rolling back report', { reportId: typedReport.id })
      await supabaseAdmin.from('reports').delete().eq('id', typedReport.id)
      throw new Error('Failed to create task')
    }
    type TaskResult = { id: string }
    const typedTask = task as TaskResult
    serviceLogger.debug('Task created', { taskId: typedTask.id })

    // Add to queue
    serviceLogger.debug('Adding job to queue...')
    const job = await analysisQueue.add(
      'analyze',
      {
        input,
        taskId: typedTask.id,
        reportId: typedReport.id,
        userId,
      },
      {
        jobId: typedTask.id,
      }
    )
    serviceLogger.debug('Job added to queue', { jobId: job.id })

    serviceLogger.info('Analysis started successfully', {
      taskId: typedTask.id,
      reportId: typedReport.id,
    })

    return {
      taskId: typedTask.id,
      reportId: typedReport.id,
    }
  }
}

export const aiService = new AIService()
