import { NextRequest, NextResponse } from 'next/server'
import { exchangeCodeForToken, storeUserTokens } from '@/lib/export/google-oauth'
import { createSupabaseClient, requireAuth } from '@/lib/api/auth'

export async function GET(request: NextRequest) {
  try {
    // Verify authentication (user must be logged in)
    const user = await requireAuth()

    const searchParams = request.nextUrl.searchParams
    const code = searchParams.get('code')
    const error = searchParams.get('error')
    const state = searchParams.get('state')

    // Handle OAuth error
    if (error) {
      console.error('[Google OAuth Callback] OAuth error:', error)
      return new NextResponse(
        `
        <!DOCTYPE html>
        <html>
        <head><title>Authorization Failed</title></head>
        <body>
          <script>
            if (window.opener) {
              window.opener.postMessage(
                { type: 'GOOGLE_OAUTH_ERROR', error: '${error}' },
                '*'
              );
              window.close();
            } else {
              window.location.href = '/report?error=google_auth_failed';
            }
          </script>
          <p>Authorization failed. You can close this window.</p>
        </body>
        </html>
        `,
        {
          headers: { 'Content-Type': 'text/html' },
        }
      )
    }

    // Validate required parameters
    if (!code) {
      return new NextResponse(
        `
        <!DOCTYPE html>
        <html>
        <head><title>Authorization Failed</title></head>
        <body>
          <script>
            if (window.opener) {
              window.opener.postMessage(
                { type: 'GOOGLE_OAUTH_ERROR', error: 'missing_code' },
                '*'
              );
              window.close();
            } else {
              window.location.href = '/report?error=google_auth_failed';
            }
          </script>
          <p>Authorization failed. You can close this window.</p>
        </body>
        </html>
        `,
        {
          headers: { 'Content-Type': 'text/html' },
        }
      )
    }

    console.log('[Google OAuth Callback] Processing callback for user:', user.id)

    // Exchange code for tokens
    const tokenResponse = await exchangeCodeForToken(code)

    // Store tokens for the user
    await storeUserTokens(user.id, tokenResponse)

    console.log('[Google OAuth Callback] Tokens stored successfully')

    // Return success page that closes the popup and notifies parent
    return new NextResponse(
      `
      <!DOCTYPE html>
      <html>
      <head><title>Authorization Successful</title></head>
      <body>
        <script>
          if (window.opener) {
            window.opener.postMessage(
              { type: 'GOOGLE_OAUTH_SUCCESS' },
              '*'
            );
            window.close();
          } else {
            window.location.href = '/report?google_auth=success';
          }
        </script>
        <p>Authorization successful! You can close this window.</p>
      </body>
      </html>
      `,
      {
        headers: { 'Content-Type': 'text/html' },
      }
    )
  } catch (error) {
    console.error('[Google OAuth Callback] Error:', error)

    const errorMessage = error instanceof Error ? error.message : 'Unknown error'

    return new NextResponse(
      `
      <!DOCTYPE html>
      <html>
      <head><title>Authorization Failed</title></head>
      <body>
        <script>
          if (window.opener) {
            window.opener.postMessage(
              { type: 'GOOGLE_OAUTH_ERROR', error: '${errorMessage.replace(/'/g, "\\'")}' },
              '*'
            );
            window.close();
          } else {
            window.location.href = '/report?error=google_auth_failed';
          }
        </script>
        <p>Authorization failed. You can close this window.</p>
      </body>
      </html>
      `,
      {
        headers: { 'Content-Type': 'text/html' },
      }
    )
  }
}
