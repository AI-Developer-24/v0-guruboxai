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
  { params }: { params: { task_id: string } }
) {
  try {
    const user = await requireAuth()

    const taskId = params.task_id

    // Get task with ownership check
    const { data: task, error } = await supabaseAdmin
      .from('tasks')
      .select('*')
      .eq('id', taskId)
      .eq('user_id', user.id)
      .single()

    if (error || !task) {
      return notFoundResponse('Task not found')
    }

    // Get related report status
    const { data: report } = await supabaseAdmin
      .from('reports')
      .select('status')
      .eq('id', task.report_id)
      .single()

    return successResponse({
      task_id: task.id,
      report_id: task.report_id,
      status: task.status,
      current_stage: task.current_stage,
      stages_completed: task.stages_completed || [],
      report_status: report?.status,
      created_at: task.created_at,
      updated_at: task.updated_at,
    })
  } catch (error) {
    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return unauthorizedResponse()
    }
    console.error('Get task error:', error)
    return internalErrorResponse()
  }
}
