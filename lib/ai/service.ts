import { Queue } from 'bullmq'
import { redis } from '../redis'
import { supabaseAdmin } from '../supabase'
import type { AnalysisJobData } from '../queue/worker'

const analysisQueue = new Queue<AnalysisJobData>('analysis-queue', {
  connection: redis,
})

export class AIService {
  /**
   * Start a new analysis
   */
  async startAnalysis(input: string, userId: string) {
    // Check concurrent task limit
    const { data: runningTask } = await supabaseAdmin
      .from('tasks')
      .select('id, report_id')
      .eq('user_id', userId)
      .eq('status', 'running')
      .single()

    if (runningTask) {
      throw new Error('CONCURRENT_TASK_LIMIT')
    }

    // Create report
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
      console.error('Failed to create report:', reportError)
      throw new Error('Failed to create report')
    }

    // Create task
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
      console.error('Failed to create task:', taskError)
      // Rollback report
      await supabaseAdmin.from('reports').delete().eq('id', report.id)
      throw new Error('Failed to create task')
    }

    // Add to queue
    await analysisQueue.add(
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

    return {
      taskId: task.id,
      reportId: report.id,
    }
  }
}

export const aiService = new AIService()
