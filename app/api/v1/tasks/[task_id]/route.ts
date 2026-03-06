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
import { supabaseAdmin } from '@/lib/supabase-admin'
import { logger } from '@/lib/logger'

const apiLogger = logger.withContext('API:Task')

// Type for task query result
type TaskBasicInfo = { id: string; report_id: string; status: string }

export const dynamic = 'force-dynamic'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ task_id: string }> }
) {
  const startTime = Date.now()
  let taskId = 'unknown'

  try {
    apiLogger.debug('GET request received')
    const user = await requireAuth()
    const cookieStore = await cookies()
    const paramsData = await params
    taskId = paramsData.task_id

    apiLogger.debug('Fetching status for task', { taskId, userId: user.id })

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
    apiLogger.debug('Querying task from database...', { taskId })
    const { data: task, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('id', taskId)
      .eq('user_id', user.id)
      .single()

    if (error || !task) {
      apiLogger.warn('Task not found', { taskId })
      return notFoundResponse('Task not found')
    }

    apiLogger.debug('Task found', {
      id: task.id,
      status: task.status,
      current_stage: task.current_stage,
      stages_completed: task.stages_completed,
    })

    // Get related report status
    apiLogger.debug('Fetching report status...', { reportId: task.report_id })
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
    apiLogger.debug('Returning response', { elapsed: `${elapsed}ms`, taskId })

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
      apiLogger.warn('Unauthorized access attempt', { taskId })
      return unauthorizedResponse()
    }
    apiLogger.error('Error in GET', error, { taskId })
    return internalErrorResponse()
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ task_id: string }> }
) {
  let taskId = 'unknown'

  try {
    apiLogger.debug('DELETE request received')
    const user = await requireAuth()
    const paramsData = await params
    taskId = paramsData.task_id

    apiLogger.info('Canceling task', { taskId, userId: user.id })

    // Get task with ownership check
    const { data: task, error: taskError } = await supabaseAdmin
      .from('tasks')
      .select('id, report_id, status')
      .eq('id', taskId)
      .eq('user_id', user.id)
      .single()

    if (taskError || !task) {
      apiLogger.warn('Task not found', { taskId })
      return notFoundResponse('Task not found')
    }

    // Type assertion for query result
    const typedTask = task as TaskBasicInfo

    // Can only cancel pending or running tasks
    if (typedTask.status !== 'pending' && typedTask.status !== 'running') {
      apiLogger.warn('Task cannot be canceled', { taskId, status: typedTask.status })
      return NextResponse.json(
        { error: { code: 'INVALID_STATUS', message: 'Task cannot be canceled' } },
        { status: 400 }
      )
    }

    // Update task status to cancelled
    const { error: updateTaskError } = await supabaseAdmin
      .from('tasks')
      .update({ status: 'cancelled', updated_at: new Date().toISOString() } as never)
      .eq('id', taskId)

    if (updateTaskError) {
      apiLogger.error('Failed to cancel task', updateTaskError, { taskId })
      return internalErrorResponse('Failed to cancel task')
    }

    // Update report status to cancelled
    const { error: updateReportError } = await supabaseAdmin
      .from('reports')
      .update({ status: 'cancelled' } as never)
      .eq('id', typedTask.report_id)

    if (updateReportError) {
      apiLogger.error('Failed to cancel report', updateReportError, { reportId: typedTask.report_id })
      // Don't fail the request, task is already cancelled
    }

    apiLogger.info('Task cancelled successfully', { taskId })

    return successResponse({ task_id: taskId, status: 'cancelled' })
  } catch (error) {
    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      apiLogger.warn('Unauthorized access attempt', { taskId })
      return unauthorizedResponse()
    }
    apiLogger.error('Error in DELETE', error, { taskId })
    return internalErrorResponse()
  }
}
