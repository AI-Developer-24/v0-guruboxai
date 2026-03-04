import { NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import { unauthorizedResponse, internalErrorResponse, successResponse } from '@/lib/api/response'
import { requireAuth } from '@/lib/api/auth'
import { getGoogleDocsAuthUrl, isGoogleOAuthConfigured } from '@/lib/export/google-oauth'

export async function POST() {
  try {
    // Verify authentication
    const user = await requireAuth()

    // Check if Google OAuth is configured
    if (!isGoogleOAuthConfigured()) {
      return internalErrorResponse('Google OAuth is not configured. Please contact support.')
    }

    // Generate state for CSRF protection
    const state = randomUUID()

    // Generate authorization URL
    const authUrl = getGoogleDocsAuthUrl(state)

    return successResponse({
      auth_url: authUrl,
      state,
    })
  } catch (error) {
    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return unauthorizedResponse()
    }

    console.error('[Google OAuth Init] Error:', error)
    return internalErrorResponse(
      error instanceof Error ? error.message : 'Failed to initiate Google OAuth'
    )
  }
}
