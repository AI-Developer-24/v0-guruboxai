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
    const defaultModel = process.env.DEFAULT_MODEL || 'gpt-4'
    const cheapModel = process.env.CHEAP_MODEL || 'gpt-3.5-turbo'
    const premiumModel = process.env.PREMIUM_MODEL || defaultModel

    // Stage 1: Understanding
    await this.updateTaskStage(taskId, 'understanding')
    const understanding = await this.callAI(
      PROMPTS.understanding(input),
      { model: cheapModel },
      UnderstandingOutputSchema
    )
    results.understanding = understanding
    await this.completeStage(taskId, 'understanding')

    // Stage 2: Analyzing
    await this.updateTaskStage(taskId, 'analyzing')
    const analysis = await this.callAI(
      PROMPTS.analyzing(JSON.stringify(understanding)),
      { model: cheapModel },
      AnalyzingOutputSchema
    )
    results.analysis = analysis
    await this.completeStage(taskId, 'analyzing')

    // Stage 3: Scanning
    await this.updateTaskStage(taskId, 'scanning')
    const signals = await this.callAI(
      PROMPTS.scanning(input),
      { model: premiumModel },
      ScanningOutputSchema
    )
    results.signals = signals
    await this.completeStage(taskId, 'scanning')

    // Stage 4: Generating (6 batches)
    await this.updateTaskStage(taskId, 'generating')
    const opportunities: any[] = []

    for (let batch = 1; batch <= 6; batch++) {
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
    }
    results.opportunities = opportunities
    await this.completeStage(taskId, 'generating')

    // Stage 5: Scoring
    await this.updateTaskStage(taskId, 'scoring')
    const scored = await this.callAI(
      PROMPTS.scoring(opportunities),
      { model: cheapModel },
      z.array(OpportunitySchema)
    )
    results.scored = scored
    await this.completeStage(taskId, 'scoring')

    // Stage 6: Finalizing
    await this.updateTaskStage(taskId, 'finalizing')
    const finalData = await this.callAI(
      PROMPTS.finalizing(scored, input),
      { model: premiumModel },
      FinalizingOutputSchema
    )
    results.finalizing = finalData

    // Save opportunities to database
    await this.saveOpportunities(reportId, scored)

    // Update report
    const analysisTime = Math.floor((Date.now() - startTime) / 1000)

    // Calculate premium_ratio
    const premiumCount = scored.filter((o: any) => o.final_score > 80).length
    const premiumRatio = premiumCount / scored.length

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
    await supabaseAdmin
      .from('tasks')
      .update({ status: 'completed', updated_at: new Date().toISOString() })
      .eq('id', taskId)

    await this.completeStage(taskId, 'finalizing')

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
    const model = options.model || 'gpt-4'
    const provider = getProviderForModel(model)

    const messages: Message[] = [
      { role: 'system', content: 'You are a helpful AI assistant. Always respond with valid JSON.' },
      { role: 'user', content: prompt },
    ]

    const response = await provider.chat(messages, {
      model,
      temperature: options.temperature ?? 0.7,
      maxTokens: 4096,
    })

    // Parse JSON
    let jsonContent: any
    try {
      // Extract JSON (handle possible markdown code blocks)
      const jsonMatch = response.content.match(/```json\s*([\s\S]*?)\s*```/) ||
                       response.content.match(/```\s*([\s\S]*?)\s*```/) ||
                       [null, response.content]

      jsonContent = JSON.parse(jsonMatch[1] || response.content)
    } catch (error) {
      console.error('Failed to parse AI response:', response.content)
      throw new Error('Invalid AI response format')
    }

    // Validate schema
    try {
      return schema.parse(jsonContent)
    } catch (error) {
      console.error('Validation error:', error)
      console.error('Invalid data:', jsonContent)
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
      .single()

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
