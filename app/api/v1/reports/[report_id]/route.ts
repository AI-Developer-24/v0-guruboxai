import { NextResponse } from 'next/server'
import {
  successResponse,
  notFoundResponse,
  internalErrorResponse,
  unauthorizedResponse,
} from '@/lib/api/response'
import { requireAuth } from '@/lib/api/auth'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(
  request: Request,
  { params }: { params: { report_id: string } }
) {
  try {
    const user = await requireAuth()

    const reportId = params.report_id

    // Get report with ownership check
    const { data: report, error } = await supabaseAdmin
      .from('reports')
      .select('*')
      .eq('id', reportId)
      .eq('user_id', user.id)
      .eq('is_deleted', false)
      .single()

    if (error || !report) {
      return notFoundResponse('Report not found')
    }

    // Get opportunity count
    const { count } = await supabaseAdmin
      .from('opportunities')
      .select('*', { count: 'exact', head: true })
      .eq('report_id', reportId)

    // Get premium opportunity count
    const { count: premiumCount } = await supabaseAdmin
      .from('opportunities')
      .select('*', { count: 'exact', head: true })
      .eq('report_id', reportId)
      .gt('final_score', 80)

    return successResponse({
      id: report.id,
      input_text: report.input_text,
      status: report.status,
      analysis_time_sec: report.analysis_time_sec,
      total_opportunities: count || 0,
      premium_ratio: report.premium_ratio,
      premium_count: premiumCount || 0,
      summary_text: report.summary_text,
      created_at: report.created_at,
    })
  } catch (error) {
    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return unauthorizedResponse()
    }
    console.error('Get report error:', error)
    return internalErrorResponse()
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { report_id: string } }
) {
  try {
    const user = await requireAuth()

    const reportId = params.report_id

    // Soft delete report
    const { data, error } = await supabaseAdmin
      .from('reports')
      .update({ is_deleted: true })
      .eq('id', reportId)
      .eq('user_id', user.id)
      .select()
      .single()

    if (error || !data) {
      return notFoundResponse('Report not found')
    }

    return successResponse({ success: true })
  } catch (error) {
    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return unauthorizedResponse()
    }
    console.error('Delete report error:', error)
    return internalErrorResponse()
  }
}
