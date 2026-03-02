import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') || '/tools/product-insight'

  if (code) {
    // Create Supabase client for server-side
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value
          },
          set(name: string, value: string, options: any) {
            request.cookies.set(name, value)
          },
          remove(name: string, options: any) {
            request.cookies.delete(name)
          },
        },
      }
    )

    // Exchange code for session
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      console.error('Auth error:', error)
      return NextResponse.redirect(
        new URL('/auth/error', requestUrl.origin)
      )
    }

    // Get user info
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      // Ensure user record exists in users table using admin client (bypasses RLS)
      const { error: upsertError } = await supabaseAdmin
        .from('users')
        .upsert({
          id: user.id,
          email: user.email!,
          name: user.user_metadata.full_name,
          avatar: user.user_metadata.avatar_url,
        }, {
          onConflict: 'id',
        })

      if (upsertError) {
        console.error('User upsert error:', upsertError)
      }
    }
  }

  // Redirect to target page
  return NextResponse.redirect(new URL(next, requestUrl.origin))
}
