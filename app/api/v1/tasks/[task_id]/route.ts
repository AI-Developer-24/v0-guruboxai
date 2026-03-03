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

    return successResponse(response)
  } catch (error) {
    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      console.log(`[TaskStatus API] Unauthorized access attempt for task: ${taskId}`)
      return unauthorizedResponse()
    }
    console.error('[TaskStatus API] Error:', error)
    return internalErrorResponse()
  }
}
