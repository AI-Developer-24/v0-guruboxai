import { Queue } from 'bullmq'
import { redis } from '../redis'
import { supabaseAdmin } from '../supabase'
import type { AnalysisJobData } from '../queue/worker'

console.log('[AIService] Initializing analysis queue...')

const analysisQueue = new Queue<AnalysisJobData>('analysis-queue', {
  connection: redis,
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
    const { data: runningTask, error: checkError } = await supabaseAdmin
      .from('tasks')
      .select('id, report_id')
      .eq('user_id', userId)
      .eq('status', 'running')
      .maybeSingle()

    if (checkError) {
      console.error(`[AIService] Error checking concurrent tasks:`, checkError)
    }

    if (runningTask) {
      console.log(`[AIService] User has running task: ${runningTask.id}`)
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
      })
      .select()
      .single()

    if (reportError) {
      console.error('[AIService] Failed to create report:', reportError)
      throw new Error('Failed to create report')
    }
    console.log(`[AIService] Report created: ${report.id}`)

    // Create task
    console.log(`[AIService] Creating task...`)
    const { data: task, error: taskError } = await supabaseAdmin
      .from('tasks')
      .insert({
        user_id: userId,
        report_id: report.id,
        status: 'pending',
        current_stage: 'understanding',
      })
      .select()
      .single()

    if (taskError) {
      console.error('[AIService] Failed to create task:', taskError)
      // Rollback report
      console.log(`[AIService] Rolling back report: ${report.id}`)
      await supabaseAdmin.from('reports').delete().eq('id', report.id)
      throw new Error('Failed to create task')
    }
    console.log(`[AIService] Task created: ${task.id}`)

    // Add to queue
    console.log(`[AIService] Adding job to queue...`)
    const job = await analysisQueue.add(
      'analyze',
      {
        input,
        taskId: task.id,
        reportId: report.id,
        userId,
      },
      {
        jobId: task.id,
        timeout: 10 * 60 * 1000, // 10 minute timeout
      }
    )
    console.log(`[AIService] Job added to queue: ${job.id}`)

    console.log(`[AIService] ========================================`)
    console.log(`[AIService] Analysis started successfully`)
    console.log(`[AIService]   Task ID: ${task.id}`)
    console.log(`[AIService]   Report ID: ${report.id}`)
    console.log(`[AIService] ========================================`)

    return {
      taskId: task.id,
      reportId: report.id,
    }
  }
}

export const aiService = new AIService()
