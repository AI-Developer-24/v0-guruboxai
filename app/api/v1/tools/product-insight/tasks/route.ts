import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { CreateTaskSchema } from '@/lib/validation/schemas'
import {
  successResponse,
  validationErrorResponse,
  concurrentTaskLimitResponse,
  internalErrorResponse,
  unauthorizedResponse,
} from '@/lib/api/response'
import { requireAuth } from '@/lib/api/auth'
import { aiService } from '@/lib/ai/service'

// Enhanced validation schema with additional checks
const EnhancedCreateTaskSchema = CreateTaskSchema.refine(
  (value) => {
    const trimmed = value.input_text.trim()
    const specialChars = /[<>{}|\\^`]/g
    const cleanLength = trimmed.replace(specialChars, '').length
    return cleanLength > trimmed.length * 0.5
  },
  {
    message: 'Input contains too many special characters. Please use plain text.',
    path: ['input_text'],
  }
)

const forbiddenWords = ['xxx', 'porn', 'illegal', 'hack']

export async function POST(request: Request) {
  console.log('[Tasks API] POST /api/v1/tools/product-insight/tasks called')

  try {
    // Verify authentication
    console.log('[Tasks API] Verifying authentication...')
    const user = await requireAuth()
    console.log('[Tasks API] User authenticated:', { userId: user.id })

    const cookieStore = await cookies()
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

    // Parse and validate request body
    console.log('[Tasks API] Parsing request body...')
    const body = await request.json()
    const validation = EnhancedCreateTaskSchema.safeParse(body)

    if (!validation.success) {
      console.log('[Tasks API] Validation failed:', validation.error.errors)
      return validationErrorResponse(
        'Invalid input',
        validation.error.errors
      )
    }

    console.log('[Tasks API] Validation passed')
    const { input_text } = validation.data
    const trimmedInput = input_text.trim()

    // Check for forbidden words
    const hasForbiddenWord = forbiddenWords.some(word =>
      trimmedInput.toLowerCase().includes(word)
    )

    if (hasForbiddenWord) {
      console.log('[Tasks API] Forbidden word detected')
      return validationErrorResponse('Input contains inappropriate content')
    }

    // Check concurrent task limit
    console.log('[Tasks API] Checking concurrent task limit...')
    const { data: runningTask } = await supabase
      .from('tasks')
      .select('id, report_id')
      .eq('user_id', user.id)
      .eq('status', 'running')
      .maybeSingle()

    if (runningTask) {
      console.log('[Tasks API] Concurrent task found:', runningTask)
      return concurrentTaskLimitResponse({
        task_id: runningTask.id,
        report_id: runningTask.report_id,
      })
    }

    // Start analysis via AI service (adds to queue)
    console.log('[Tasks API] Starting analysis...')
    const result = await aiService.startAnalysis(input_text, user.id)
    console.log('[Tasks API] Analysis started:', result)

    return successResponse({
      task_id: result.taskId,
      report_id: result.reportId,
      status: 'pending',
    })
  } catch (error) {
    console.error('[Tasks API] Error:', error)

    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      console.log('[Tasks API] Returning unauthorized response')
      return unauthorizedResponse()
    }
    if (error instanceof Error && error.message === 'CONCURRENT_TASK_LIMIT') {
      return concurrentTaskLimitResponse({
        message: 'You already have a task running',
      })
    }
    console.error('Create task error:', error)
    return internalErrorResponse()
  }
}
