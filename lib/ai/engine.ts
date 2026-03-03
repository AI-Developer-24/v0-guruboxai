import { getProviderForModel } from './providers/factory'
import { PROMPTS, OpportunitySchema, UnderstandingOutputSchema, AnalyzingOutputSchema, ScanningOutputSchema, FinalizingOutputSchema } from './prompts'
import { supabaseAdmin } from '../supabase'
import type { Message } from './providers/base'
import { z } from 'zod'

export class AIEngine {
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
    console.log(`[AIEngine] Stage 3/6: Scanning - START`)
    await this.updateTaskStage(taskId, 'scanning')
    const signals = await this.callAI(
      PROMPTS.scanning(input),
      { model: premiumModel },
      ScanningOutputSchema
    )
    results.signals = signals
    await this.completeStage(taskId, 'scanning')
    console.log(`[AIEngine] Stage 3/6: Scanning - COMPLETE`)

    // Stage 4: Generating (6 batches)
    console.log(`[AIEngine] Stage 4/6: Generating - START`)
    await this.updateTaskStage(taskId, 'generating')
    const opportunities: any[] = []

    for (let batch = 1; batch <= 6; batch++) {
      console.log(`[AIEngine] Stage 4/6: Generating batch ${batch}/6 - START`)
      const batchOpportunities = await this.callAI(
        PROMPTS.generating(batch, 6, input, JSON.stringify(signals)),
        { model: premiumModel, temperature: 0.8 },
        z.array(OpportunitySchema)
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
    console.log(`[AIEngine] Stage 5/6: Scoring - START`)
    await this.updateTaskStage(taskId, 'scoring')
    const scored = await this.callAI(
      PROMPTS.scoring(opportunities),
      { model: cheapModel },
      z.array(OpportunitySchema)
    )
    results.scored = scored
    await this.completeStage(taskId, 'scoring')
    console.log(`[AIEngine] Stage 5/6: Scoring - COMPLETE`)

    // Stage 6: Finalizing
    console.log(`[AIEngine] Stage 6/6: Finalizing - START`)
    await this.updateTaskStage(taskId, 'finalizing')
    const finalData = await this.callAI(
      PROMPTS.finalizing(scored, input),
      { model: premiumModel },
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
    options: { model?: string; temperature?: number },
    schema: z.ZodSchema<T>
  ): Promise<T> {
    const model = options.model || process.env.DEFAULT_MODEL || 'qwen3-max'
    if (!model) {
      throw new Error('No model specified and DEFAULT_MODEL not set')
    }
    const provider = getProviderForModel(model)

    console.log(`[AIEngine.callAI] Calling model: ${model}, temperature: ${options.temperature ?? 0.7}`)

    const messages: Message[] = [
      { role: 'system', content: 'You are a helpful AI assistant. Always respond with valid JSON.' },
      { role: 'user', content: prompt },
    ]

    const response = await provider.chat(messages, {
      model,
      temperature: options.temperature ?? 0.7,
      maxTokens: 4096,
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
    await supabaseAdmin
      .from('tasks')
      .update({
        current_stage: stage,
        updated_at: new Date().toISOString(),
      })
      .eq('id', taskId)
  }

  /**
   * Mark stage as completed
   */
  private async completeStage(taskId: string, stage: string) {
    const { data: task } = await supabaseAdmin
      .from('tasks')
      .select('stages_completed')
      .eq('id', taskId)
      .maybeSingle()

    const stagesCompleted = [...(task?.stages_completed || []), stage]

    await supabaseAdmin
      .from('tasks')
      .update({
        stages_completed: stagesCompleted,
        updated_at: new Date().toISOString(),
      })
      .eq('id', taskId)
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
      signal_count: opp.signal_count,
      monetization_score: opp.monetization_score,
      industry_size_score: opp.industry_size_score,
      competition_score: opp.competition_score,
      mvp_difficulty_score: opp.mvp_difficulty_score,
      final_score: opp.final_score,
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
