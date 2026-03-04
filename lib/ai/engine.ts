import { getProviderForModel } from './providers/factory'
import { PROMPTS, OpportunitySchema, UnderstandingOutputSchema, AnalyzingOutputSchema, ScanningOutputSchema, FinalizingOutputSchema, GeneratingOpportunitySchema } from './prompts'
import { supabaseAdmin } from '../supabase'
import type { Message } from './providers/base'
import { z } from 'zod'

class TaskCancelledError extends Error {
  constructor() {
    super('Task was cancelled')
    this.name = 'TaskCancelledError'
  }
}

/**
 * Retry helper for database operations
 */
async function withRetry<T>(
  operation: () => Promise<T>,
  operationName: string,
  maxRetries: number = 3,
  delayMs: number = 1000
): Promise<T> {
  let lastError: Error | null = null

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation()
    } catch (error) {
      lastError = error as Error
      console.error(`[${operationName}] Attempt ${attempt}/${maxRetries} failed:`, error)

      if (attempt < maxRetries) {
        console.log(`[${operationName}] Retrying in ${delayMs}ms...`)
        await new Promise(resolve => setTimeout(resolve, delayMs))
        // Exponential backoff
        delayMs *= 2
      }
    }
  }

  throw lastError
}

export class AIEngine {
  /**
   * Check if task has been cancelled
   */
  private async checkCancelled(taskId: string): Promise<void> {
    const task = await withRetry(
      async () => {
        const { data, error } = await supabaseAdmin
          .from('tasks')
          .select('status')
          .eq('id', taskId)
          .maybeSingle()

        if (error) {
          throw error
        }
        return data
      },
      'AIEngine.checkCancelled',
      3,
      1000
    )

    if (task?.status === 'cancelled') {
      console.log(`[AIEngine] Task ${taskId} was cancelled, stopping analysis`)
      throw new TaskCancelledError()
    }
  }

  /**
   * Execute the complete 6-stage analysis
   */
  async analyze(input: string, taskId: string, reportId: string) {
    const startTime = Date.now()
    const results: Record<string, any> = {}

    // Get default model from env, with fallbacks
    const defaultModel = process.env.DEFAULT_MODEL
    const cheapModel = process.env.CHEAP_MODEL
    const premiumModel = process.env.PREMIUM_MODEL

    console.log(`[AIEngine] Starting analysis for task: ${taskId}, report: ${reportId}`)
    console.log(`[AIEngine] Models - default: ${defaultModel}, cheap: ${cheapModel}, premium: ${premiumModel}`)

    // Stage 1: Understanding
    await this.checkCancelled(taskId)
    console.log(`[AIEngine] Stage 1/6: Understanding - START`)
    await this.updateTaskStage(taskId, 'understanding')
    const understanding = await this.callAI(
      PROMPTS.understanding(input),
      { model: cheapModel },
      UnderstandingOutputSchema
    )
    results.understanding = understanding
    await this.completeStage(taskId, 'understanding')
    console.log(`[AIEngine] Stage 1/6: Understanding - COMPLETE`)

    // Stage 2: Analyzing
    await this.checkCancelled(taskId)
    console.log(`[AIEngine] Stage 2/6: Analyzing - START`)
    await this.updateTaskStage(taskId, 'analyzing')
    const analysis = await this.callAI(
      PROMPTS.analyzing(JSON.stringify(understanding)),
      { model: cheapModel },
      AnalyzingOutputSchema
    )
    results.analysis = analysis
    await this.completeStage(taskId, 'analyzing')
    console.log(`[AIEngine] Stage 2/6: Analyzing - COMPLETE`)

    // Stage 3: Scanning
    await this.checkCancelled(taskId)
    console.log(`[AIEngine] Stage 3/6: Scanning - START`)
    await this.updateTaskStage(taskId, 'scanning')
    const signals = await this.callAI(
      PROMPTS.scanning(input),
      { model: premiumModel, maxTokens: 32768 },
      ScanningOutputSchema
    )
    results.signals = signals
    await this.completeStage(taskId, 'scanning')
    console.log(`[AIEngine] Stage 3/6: Scanning - COMPLETE`)

    // Stage 4: Generating (6 batches)
    await this.checkCancelled(taskId)
    console.log(`[AIEngine] Stage 4/6: Generating - START`)
    await this.updateTaskStage(taskId, 'generating')
    const opportunities: any[] = []

    for (let batch = 1; batch <= 1; batch++) {
      await this.checkCancelled(taskId)
      console.log(`[AIEngine] Stage 4/6: Generating batch ${batch}/6 - START`)
      const batchOpportunities = await this.callAI(
        PROMPTS.generating(batch, 6, input, JSON.stringify(signals)),
        { model: premiumModel, temperature: 0.8, maxTokens: 32768 },
        z.array(GeneratingOpportunitySchema)
      )

      // Update index_number
      const indexed = batchOpportunities.map((opp: any, idx: number) => ({
        ...opp,
        index_number: (batch - 1) * 50 + idx + 1,
      }))

      opportunities.push(...indexed)
      console.log(`[AIEngine] Stage 4/6: Generating batch ${batch}/6 - COMPLETE (${indexed.length} opportunities)`)
    }
    results.opportunities = opportunities
    await this.completeStage(taskId, 'generating')
    console.log(`[AIEngine] Stage 4/6: Generating - COMPLETE (total: ${opportunities.length} opportunities)`)

    // Stage 5: Scoring
    await this.checkCancelled(taskId)
    console.log(`[AIEngine] Stage 5/6: Scoring - START`)
    await this.updateTaskStage(taskId, 'scoring')
    const scored = await this.callAI(
      PROMPTS.scoring(opportunities),
      { model: cheapModel, maxTokens: 32768 },
      z.array(OpportunitySchema)
    )
    results.scored = scored
    await this.completeStage(taskId, 'scoring')
    console.log(`[AIEngine] Stage 5/6: Scoring - COMPLETE`)

    // Stage 6: Finalizing
    await this.checkCancelled(taskId)
    console.log(`[AIEngine] Stage 6/6: Finalizing - START`)
    await this.updateTaskStage(taskId, 'finalizing')
    const finalData = await this.callAI(
      PROMPTS.finalizing(scored, input),
      { model: premiumModel, maxTokens: 16384 },
      FinalizingOutputSchema
    )
    results.finalizing = finalData

    // Save opportunities to database
    console.log(`[AIEngine] Saving ${scored.length} opportunities to database...`)
    await this.saveOpportunities(reportId, scored)
    console.log(`[AIEngine] Opportunities saved successfully`)

    // Update report
    const analysisTime = Math.floor((Date.now() - startTime) / 1000)

    // Calculate premium_ratio
    const premiumCount = scored.filter((o: any) => o.final_score > 80).length
    const premiumRatio = premiumCount / scored.length

    console.log(`[AIEngine] Updating report status to completed...`)
    await supabaseAdmin
      .from('reports')
      .update({
        status: 'completed',
        summary_text: finalData.summary_text,
        premium_ratio: premiumRatio,
        analysis_time_sec: analysisTime,
      })
      .eq('id', reportId)

    // Update task status
    console.log(`[AIEngine] Updating task status to completed...`)
    await supabaseAdmin
      .from('tasks')
      .update({ status: 'completed', updated_at: new Date().toISOString() })
      .eq('id', taskId)

    await this.completeStage(taskId, 'finalizing')
    console.log(`[AIEngine] Stage 6/6: Finalizing - COMPLETE`)

    console.log(`[AIEngine] Analysis completed for task: ${taskId}, total time: ${analysisTime}s`)
    return results
  }

  /**
   * Call AI model
   */
  private async callAI<T>(
    prompt: string,
    options: { model?: string; temperature?: number; maxTokens?: number },
    schema: z.ZodSchema<T>
  ): Promise<T> {
    const model = options.model || process.env.DEFAULT_MODEL || 'qwen3-max'
    if (!model) {
      throw new Error('No model specified and DEFAULT_MODEL not set')
    }
    const provider = getProviderForModel(model)
    const maxTokens = options.maxTokens ?? 16384

    console.log(`[AIEngine.callAI] Calling model: ${model}, temperature: ${options.temperature ?? 0.7}, maxTokens: ${maxTokens}`)

    const messages: Message[] = [
      { role: 'system', content: 'You are a helpful AI assistant. Always respond with valid JSON.' },
      { role: 'user', content: prompt },
    ]

    const response = await provider.chat(messages, {
      model,
      temperature: options.temperature ?? 0.7,
      maxTokens,
    })

    console.log(`[AIEngine.callAI] Response received, length: ${response.content.length} chars`)

    // Parse JSON
    let jsonContent: any
    try {
      // Extract JSON (handle possible markdown code blocks)
      const jsonMatch = response.content.match(/```json\s*([\s\S]*?)\s*```/) ||
                       response.content.match(/```\s*([\s\S]*?)\s*```/) ||
                       [null, response.content]

      jsonContent = JSON.parse(jsonMatch[1] || response.content)
      console.log(`[AIEngine.callAI] JSON parsed successfully`)
    } catch (error) {
      console.error('[AIEngine.callAI] Failed to parse AI response:', response.content.substring(0, 500))
      throw new Error('Invalid AI response format')
    }

    // Validate schema
    try {
      const validated = schema.parse(jsonContent)
      console.log(`[AIEngine.callAI] Schema validation passed`)
      return validated
    } catch (error) {
      console.error('[AIEngine.callAI] Validation error:', error)
      console.error('[AIEngine.callAI] Invalid data:', JSON.stringify(jsonContent).substring(0, 500))
      throw new Error('AI response validation failed')
    }
  }

  /**
   * Update task current stage
   */
  private async updateTaskStage(taskId: string, stage: string) {
    console.log(`[AIEngine.updateTaskStage] Updating task ${taskId} to stage: ${stage}`)

    await withRetry(
      async () => {
        const { error } = await supabaseAdmin
          .from('tasks')
          .update({
            current_stage: stage,
            updated_at: new Date().toISOString(),
          })
          .eq('id', taskId)

        if (error) {
          throw error
        }
      },
      'AIEngine.updateTaskStage',
      3,
      1000
    )

    console.log(`[AIEngine.updateTaskStage] Stage updated successfully to: ${stage}`)
  }

  /**
   * Mark stage as completed
   */
  private async completeStage(taskId: string, stage: string) {
    console.log(`[AIEngine.completeStage] Marking stage ${stage} as completed for task ${taskId}`)

    await withRetry(
      async () => {
        const { data: task, error: fetchError } = await supabaseAdmin
          .from('tasks')
          .select('stages_completed')
          .eq('id', taskId)
          .maybeSingle()

        if (fetchError) {
          throw fetchError
        }

        const stagesCompleted = [...(task?.stages_completed || []), stage]
        console.log(`[AIEngine.completeStage] New stages_completed:`, stagesCompleted)

        const { error: updateError } = await supabaseAdmin
          .from('tasks')
          .update({
            stages_completed: stagesCompleted,
            updated_at: new Date().toISOString(),
          })
          .eq('id', taskId)

        if (updateError) {
          throw updateError
        }
      },
      'AIEngine.completeStage',
      3,
      1000
    )

    console.log(`[AIEngine.completeStage] Stage ${stage} marked as completed`)
  }

  /**
   * Save opportunities to database
   */
  private async saveOpportunities(reportId: string, opportunities: any[]) {
    const toInsert = opportunities.map((opp) => ({
      report_id: reportId,
      index_number: opp.index_number,
      name: opp.name,
      core_users: opp.core_users,
      pain_points: opp.pain_points,
      user_demands: opp.user_demands,
      ai_solution: opp.ai_solution,
      category: opp.category,
      inspiration_source: opp.inspiration_source,
      signal_count: Math.round(opp.signal_count),
      monetization_score: Math.round(opp.monetization_score),
      industry_size_score: Math.round(opp.industry_size_score),
      competition_score: Math.round(opp.competition_score),
      mvp_difficulty_score: Math.round(opp.mvp_difficulty_score),
      final_score: Math.round(opp.final_score),
    }))

    const { error } = await supabaseAdmin
      .from('opportunities')
      .insert(toInsert)

    if (error) {
      console.error('Failed to save opportunities:', error)
      throw error
    }
  }
}
