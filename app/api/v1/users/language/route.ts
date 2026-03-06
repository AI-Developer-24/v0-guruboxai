import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { LanguageSchema } from '@/lib/validation/schemas'
import {
  successResponse,
  validationErrorResponse,
  internalErrorResponse,
  unauthorizedResponse,
} from '@/lib/api/response'
import { requireAuth } from '@/lib/api/auth'
import { logger } from '@/lib/logger'

const apiLogger = logger.withContext('API:Language')

const UpdateLanguageSchema = z.object({
  language: LanguageSchema,
})

export async function PUT(request: Request) {
  try {
    const user = await requireAuth()
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
    const body = await request.json()
    const validation = UpdateLanguageSchema.safeParse(body)

    if (!validation.success) {
      return validationErrorResponse(
        'Invalid language code',
        validation.error.errors
      )
    }

    const { language } = validation.data

    // Update user language
    const { data, error } = await supabase
      .from('users')
      .update({ language })
      .eq('id', user.id)
      .select()
      .single()

    if (error) {
      apiLogger.error('Update language error', error)
      return internalErrorResponse('Failed to update language')
    }

    return successResponse({
      id: data.id,
      email: data.email,
      language: data.language,
    })
  } catch (error) {
    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return unauthorizedResponse()
    }
    apiLogger.error('Update language error', error)
    return internalErrorResponse()
  }
}
