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
  { params }: { params: { report_id: string } }
) {
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

    // Verify report ownership
    const { data: report, error: reportError } = await supabase
      .from('reports')
      .select('id, user_id')
      .eq('id', params.report_id)
      .eq('user_id', user.id)
      .eq('is_deleted', false)
      .single()

    if (reportError || !report) {
      return notFoundResponse('Report not found')
    }

    // Parse query parameters
    const { searchParams } = new URL(request.url)
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'))
    const size = Math.min(100, Math.max(1, parseInt(searchParams.get('size') || '20')))
    const sortBy = searchParams.get('sort_by') || 'final_score'
    const sortOrder = searchParams.get('sort_order') || 'desc'
    const category = searchParams.get('category')

    // Calculate pagination
    const from = (page - 1) * size
    const to = from + size - 1

    // Build query
    let query = supabase
      .from('opportunities')
      .select('*', { count: 'exact' })
      .eq('report_id', params.report_id)
      .order(sortBy, { ascending: sortOrder === 'asc' })

    if (category) {
      query = query.eq('category', category)
    }

    query.range(from, to)

    const { data: opportunities, count, error } = await query

    if (error) {
      console.error('Get opportunities error:', error)
      return internalErrorResponse('Failed to fetch opportunities')
    }

    return successResponse(
      opportunities || [],
      {
        pagination: {
          page,
          size,
          total: count || 0,
          total_pages: Math.ceil((count || 0) / size),
        },
      }
    )
  } catch (error) {
    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return unauthorizedResponse()
    }
    console.error('Get opportunities error:', error)
    return internalErrorResponse()
  }
}
