import { Queue } from 'bullmq'
import { getRedisConfig } from '../env'
import { supabaseAdmin } from '../supabase-admin'
import type { AnalysisJobData } from '../queue/worker'

console.log('[AIService] Initializing analysis queue...')

// Get Redis URL for BullMQ
const { url: redisUrl } = getRedisConfig()

const analysisQueue = new Queue<AnalysisJobData>('analysis-queue', {
  connection: {
    url: redisUrl,
    maxRetriesPerRequest: null,
  } as never,
})

console.log('[AIService] Analysis queue initialized')

export class AIService {
  /**
   * Start a new analysis
   */
  async startAnalysis(input: string, userId: string) {
    console.log(`[AIService] ========================================`)
    console.log(`[AIService] Starting new analysis`)
    console.log(`[AIService]   User ID: ${userId}`)
    console.log(`[AIService]   Input: ${input.substring(0, 100)}...`)

    // Check concurrent task limit
    console.log(`[AIService] Checking concurrent task limit...`)
    type RunningTask = { id: string; report_id: string }
    const { data: runningTask, error: checkError } = await supabaseAdmin
      .from('tasks')
      .select('id, report_id')
      .eq('user_id', userId)
      .eq('status', 'running')
      .maybeSingle()

    if (checkError) {
      console.error(`[AIService] Error checking concurrent tasks:`, checkError)
    }

    const typedRunningTask = runningTask as RunningTask | null
    if (typedRunningTask) {
      console.log(`[AIService] User has running task: ${typedRunningTask.id}`)
      throw new Error('CONCURRENT_TASK_LIMIT')
    }

    console.log(`[AIService] No running tasks, proceeding...`)

    // Create report
    console.log(`[AIService] Creating report...`)
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
      console.error('[AIService] Failed to create report:', reportError)
      throw new Error('Failed to create report')
    }
    type ReportResult = { id: string }
    const typedReport = report as ReportResult
    console.log(`[AIService] Report created: ${typedReport.id}`)

    // Create task
    console.log(`[AIService] Creating task...`)
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
      console.error('[AIService] Failed to create task:', taskError)
      // Rollback report
      console.log(`[AIService] Rolling back report: ${typedReport.id}`)
      await supabaseAdmin.from('reports').delete().eq('id', typedReport.id)
      throw new Error('Failed to create task')
    }
    type TaskResult = { id: string }
    const typedTask = task as TaskResult
    console.log(`[AIService] Task created: ${typedTask.id}`)

    // Add to queue
    console.log(`[AIService] Adding job to queue...`)
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
    console.log(`[AIService] Job added to queue: ${job.id}`)

    console.log(`[AIService] ========================================`)
    console.log(`[AIService] Analysis started successfully`)
    console.log(`[AIService]   Task ID: ${typedTask.id}`)
    console.log(`[AIService]   Report ID: ${typedReport.id}`)
    console.log(`[AIService] ========================================`)

    return {
      taskId: typedTask.id,
      reportId: typedReport.id,
    }
  }
}

export const aiService = new AIService()
