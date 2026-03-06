import { OAuth2Client } from 'google-auth-library'
import { supabaseAdmin } from '../supabase-admin'
import type { Database } from '../supabase-types'
import { logger } from '../logger'

const oauthLogger = logger.withContext('GoogleOAuth')

type GoogleToken = Database['public']['Tables']['google_tokens']['Row']

// Google OAuth 2.0 configuration
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const REDIRECT_URI = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/v1/auth/google/callback`

// Required scopes for Google Docs export
const SCOPES = [
  'https://www.googleapis.com/auth/documents',
  'https://www.googleapis.com/auth/drive.file',
]

/**
 * Validate that Google OAuth is configured
 */
export function isGoogleOAuthConfigured(): boolean {
  return !!(GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET)
}

/**
 * Generate Google OAuth authorization URL
 */
export function getGoogleDocsAuthUrl(state: string): string {
  if (!GOOGLE_CLIENT_ID) {
    throw new Error('GOOGLE_CLIENT_ID is not configured')
  }

  const params = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: 'code',
    scope: SCOPES.join(' '),
    access_type: 'offline',
    prompt: 'consent',
    state,
  })

  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
}

/**
 * Token response from Google OAuth
 */
interface TokenResponse {
  access_token: string
  refresh_token?: string
  expires_in: number
  scope?: string
  token_type: string
}

/**
 * Exchange authorization code for tokens
 */
export async function exchangeCodeForToken(code: string): Promise<TokenResponse> {
  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
    throw new Error('Google OAuth credentials are not configured')
  }

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      code,
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
      grant_type: 'authorization_code',
    }).toString(),
  })

  if (!response.ok) {
    const error = await response.text()
    console.error('[Google OAuth] Token exchange failed:', error)
    throw new Error('Failed to exchange authorization code for tokens')
  }

  return response.json()
}

/**
 * Refresh access token using refresh token
 */
export async function refreshAccessToken(refreshToken: string): Promise<TokenResponse> {
  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
    throw new Error('Google OAuth credentials are not configured')
  }

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      refresh_token: refreshToken,
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      grant_type: 'refresh_token',
    }).toString(),
  })

  if (!response.ok) {
    const error = await response.text()
    console.error('[Google OAuth] Token refresh failed:', error)
    throw new Error('Failed to refresh access token')
  }

  return response.json()
}

/**
 * Get valid token for user (refresh if needed)
 * Returns null if user has no token stored
 */
export async function getValidUserToken(userId: string): Promise<string | null> {
  const supabase = supabaseAdmin

  // Get stored token
  const { data: token, error } = await supabase
    .from('google_tokens')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle()

  if (error) {
    console.error('[Google OAuth] Error fetching token:', error)
    throw new Error('Failed to fetch Google token')
  }

  if (!token) {
    return null
  }

  const typedToken = token as GoogleToken

  // Check if token is expired (with 5 minute buffer)
  const expiresAt = new Date(typedToken.expires_at)
  const now = new Date()
  const bufferMs = 5 * 60 * 1000 // 5 minutes

  if (expiresAt.getTime() > now.getTime() + bufferMs) {
    // Token is still valid
    return typedToken.access_token
  }

  // Token is expired, refresh it
  if (!typedToken.refresh_token) {
    console.error('[Google OAuth] Token expired and no refresh token available')
    // Delete the invalid token
    await supabase.from('google_tokens').delete().eq('user_id', userId)
    return null
  }

  console.log('[Google OAuth] Refreshing expired token for user:', userId)

  try {
    const tokenResponse = await refreshAccessToken(typedToken.refresh_token)

    // Calculate new expiration time
    const newExpiresAt = new Date(Date.now() + tokenResponse.expires_in * 1000)

    // Update token in database
    const { error: updateError } = await supabase
      .from('google_tokens')
      .update({
        access_token: tokenResponse.access_token,
        expires_at: newExpiresAt.toISOString(),
        scope: tokenResponse.scope || typedToken.scope,
        updated_at: new Date().toISOString(),
      } as never)
      .eq('user_id', userId)

    if (updateError) {
      console.error('[Google OAuth] Error updating token:', updateError)
      throw new Error('Failed to update Google token')
    }

    return tokenResponse.access_token
  } catch (refreshError) {
    console.error('[Google OAuth] Token refresh failed:', refreshError)
    // Delete the invalid token
    await supabase.from('google_tokens').delete().eq('user_id', userId)
    return null
  }
}

/**
 * Store or update Google OAuth tokens for a user
 */
export async function storeUserTokens(
  userId: string,
  tokenResponse: TokenResponse
): Promise<void> {
  const supabase = supabaseAdmin

  const expiresAt = new Date(Date.now() + tokenResponse.expires_in * 1000)

  const tokenData = {
    user_id: userId,
    access_token: tokenResponse.access_token,
    refresh_token: tokenResponse.refresh_token || null,
    expires_at: expiresAt.toISOString(),
    scope: tokenResponse.scope || null,
    updated_at: new Date().toISOString(),
  }

  // Upsert token (insert or update if exists)
  const { error } = await supabase
    .from('google_tokens')
    .upsert(tokenData as never, {
      onConflict: 'user_id',
    })

  if (error) {
    console.error('[Google OAuth] Error storing token:', error)
    throw new Error('Failed to store Google token')
  }

  console.log('[Google OAuth] Token stored successfully for user:', userId)
}

/**
 * Delete Google OAuth tokens for a user
 */
export async function deleteUserTokens(userId: string): Promise<void> {
  const supabase = supabaseAdmin

  const { error } = await supabase.from('google_tokens').delete().eq('user_id', userId)

  if (error) {
    console.error('[Google OAuth] Error deleting token:', error)
    throw new Error('Failed to delete Google token')
  }
}

/**
 * Create OAuth2 client with user's access token
 */
export function createOAuth2Client(accessToken: string): OAuth2Client {
  const client = new OAuth2Client({
    clientId: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
  })

  // Set credentials with the access token
  client.setCredentials({
    access_token: accessToken,
  })

  return client
}
