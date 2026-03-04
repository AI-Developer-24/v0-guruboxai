import { NextResponse } from 'next/server'
import {
  unauthorizedResponse,
  notFoundResponse,
  internalErrorResponse,
  successResponse,
  googleAuthRequiredResponse,
} from '@/lib/api/response'
import { requireAuth, createSupabaseClient } from '@/lib/api/auth'
import { exportToGoogleDocs } from '@/lib/export/gdocs-service'
import {
  getValidUserToken,
  isGoogleOAuthConfigured,
} from '@/lib/export/google-oauth'

export async function POST(
  request: Request,
  { params }: { params: Promise<{ report_id: string }> }
) {
  try {
    // Verify authentication
    const user = await requireAuth()
    const { report_id } = await params

    // Verify report ownership
    const supabase = await createSupabaseClient()
    const { data: report, error: reportError } = await supabase
      .from('reports')
      .select('id, user_id')
      .eq('id', report_id)
      .eq('user_id', user.id)
      .eq('is_deleted', false)
      .maybeSingle()

    if (reportError || !report) {
      return notFoundResponse('Report not found')
    }

    // Check if Google OAuth is configured
    if (!isGoogleOAuthConfigured()) {
      return internalErrorResponse(
        'Google Docs export is not configured. Please contact support.'
      )
    }

    // Get user's valid Google token
    const accessToken = await getValidUserToken(user.id)

    if (!accessToken) {
      // User needs to authorize with Google
      // Return special response to trigger OAuth flow
      const { getGoogleDocsAuthUrl } = await import('@/lib/export/google-oauth')
      const { randomUUID } = await import('crypto')
      const state = randomUUID()
      const authUrl = getGoogleDocsAuthUrl(state)

      return googleAuthRequiredResponse(authUrl)
    }

    // Export to Google Docs using user's OAuth token
    const { documentId, url } = await exportToGoogleDocs(report_id, accessToken)

    return successResponse({
      document_id: documentId,
      url,
    })
  } catch (error) {
    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return unauthorizedResponse()
    }

    // Log detailed error information
    console.error('[Export GDocs] Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      name: error instanceof Error ? error.name : undefined,
      stack: error instanceof Error ? error.stack : undefined,
      // Google API error response
      code: (error as { code?: number }).code,
      status: (error as { status?: string | number }).status,
      statusText: (error as { statusText?: string }).statusText,
      response: (error as { response?: { data?: unknown; status?: number; statusText?: string } }).response
        ? {
            data: (error as { response?: { data?: unknown } }).response?.data,
            status: (error as { response?: { status?: number } }).response?.status,
            statusText: (error as { response?: { statusText?: string } }).response?.statusText,
          }
        : undefined,
      // Full error for inspection
      fullError: JSON.stringify(error, Object.getOwnPropertyNames(error), 2),
    })

    // Check for Google API permission errors
    const errorCode = (error as { code?: number }).code
    if (errorCode === 401 || errorCode === 403) {
      return internalErrorResponse(
        'Google authorization expired or invalid. Please try exporting again.'
      )
    }

    return internalErrorResponse(
      error instanceof Error ? error.message : 'Failed to export to Google Docs'
    )
  }
}
