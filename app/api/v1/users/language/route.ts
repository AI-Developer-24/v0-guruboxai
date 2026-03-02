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
import { supabaseAdmin } from '@/lib/supabase'

const UpdateLanguageSchema = z.object({
  language: LanguageSchema,
})

export async function PUT(request: Request) {
  try {
    const user = await requireAuth()

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
    const { data, error } = await supabaseAdmin
      .from('users')
      .update({ language })
      .eq('id', user.id)
      .select()
      .single()

    if (error) {
      console.error('Update language error:', error)
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
    console.error('Update language error:', error)
    return internalErrorResponse()
  }
}
