import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import {
  successResponse,
  notFoundResponse,
  internalErrorResponse,
  unauthorizedResponse,
} from '@/lib/api/response'
import { requireAuth } from '@/lib/api/auth'
import { supabaseAdmin } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ task_id: string }> }
) {
  const startTime = Date.now()
  let taskId = 'unknown'

  try {
    console.log('[TaskStatus API] GET request received')
    const user = await requireAuth()
    const cookieStore = await cookies()
    const paramsData = await params
    taskId = paramsData.task_id

    console.log(`[TaskStatus API] Fetching status for task: ${taskId}, user: ${user.id}`)

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
        },
      }
    )

    // Get task with ownership check
    console.log(`[TaskStatus API] Querying task from database...`)
    const { data: task, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('id', taskId)
      .eq('user_id', user.id)
      .single()

    if (error || !task) {
      console.log(`[TaskStatus API] Task not found: ${taskId}`, error)
      return notFoundResponse('Task not found')
    }

    console.log(`[TaskStatus API] Task found:`, {
      id: task.id,
      status: task.status,
      current_stage: task.current_stage,
      stages_completed: task.stages_completed,
    })

    // Get related report status
    console.log(`[TaskStatus API] Fetching report status...`)
    const { data: report } = await supabase
      .from('reports')
      .select('status')
      .eq('id', task.report_id)
      .single()

    const response = {
      task_id: task.id,
      report_id: task.report_id,
      status: task.status,
      current_stage: task.current_stage,
      stages_completed: task.stages_completed || [],
      report_status: report?.status,
      created_at: task.created_at,
      updated_at: task.updated_at,
    }

    const elapsed = Date.now() - startTime
    console.log(`[TaskStatus API] Returning response (${elapsed}ms):`, response)

    // Return with no-cache headers to ensure fresh data on each poll
    return NextResponse.json(
      { data: response },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      }
    )
  } catch (error) {
    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      console.log(`[TaskStatus API] Unauthorized access attempt for task: ${taskId}`)
      return unauthorizedResponse()
    }
    console.error('[TaskStatus API] Error:', error)
    return internalErrorResponse()
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ task_id: string }> }
) {
  let taskId = 'unknown'

  try {
    console.log('[TaskCancel API] DELETE request received')
    const user = await requireAuth()
    const paramsData = await params
    taskId = paramsData.task_id

    console.log(`[TaskCancel API] Canceling task: ${taskId}, user: ${user.id}`)

    // Get task with ownership check
    const { data: task, error: taskError } = await supabaseAdmin
      .from('tasks')
      .select('id, report_id, status')
      .eq('id', taskId)
      .eq('user_id', user.id)
      .single()

    if (taskError || !task) {
      console.log(`[TaskCancel API] Task not found: ${taskId}`, taskError)
      return notFoundResponse('Task not found')
    }

    // Can only cancel pending or running tasks
    if (task.status !== 'pending' && task.status !== 'running') {
      console.log(`[TaskCancel API] Task cannot be canceled, current status: ${task.status}`)
      return NextResponse.json(
        { error: { code: 'INVALID_STATUS', message: 'Task cannot be canceled' } },
        { status: 400 }
      )
    }

    // Update task status to cancelled
    const { error: updateTaskError } = await supabaseAdmin
      .from('tasks')
      .update({ status: 'cancelled', updated_at: new Date().toISOString() })
      .eq('id', taskId)

    if (updateTaskError) {
      console.error(`[TaskCancel API] Failed to cancel task:`, updateTaskError)
      return internalErrorResponse('Failed to cancel task')
    }

    // Update report status to cancelled
    const { error: updateReportError } = await supabaseAdmin
      .from('reports')
      .update({ status: 'cancelled' })
      .eq('id', task.report_id)

    if (updateReportError) {
      console.error(`[TaskCancel API] Failed to cancel report:`, updateReportError)
      // Don't fail the request, task is already cancelled
    }

    console.log(`[TaskCancel API] Task cancelled successfully: ${taskId}`)

    return successResponse({ task_id: taskId, status: 'cancelled' })
  } catch (error) {
    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      console.log(`[TaskCancel API] Unauthorized access attempt for task: ${taskId}`)
      return unauthorizedResponse()
    }
    console.error('[TaskCancel API] Error:', error)
    return internalErrorResponse()
  }
}
