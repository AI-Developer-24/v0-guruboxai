import { NextResponse } from 'next/server'
import {
  successResponse,
  internalErrorResponse,
  unauthorizedResponse,
} from '@/lib/api/response'
import { requireAuth } from '@/lib/api/auth'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(request: Request) {
  try {
    const user = await requireAuth()

    // Parse query parameters
    const { searchParams } = new URL(request.url)
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'))
    const size = Math.min(100, Math.max(1, parseInt(searchParams.get('size') || '20')))
    const includeDeleted = searchParams.get('include_deleted') === 'true'

    // Calculate pagination
    const from = (page - 1) * size
    const to = from + size - 1

    // Build query
    let query = supabaseAdmin
      .from('reports')
      .select('*', { count: 'exact' })
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (!includeDeleted) {
      query = query.eq('is_deleted', false)
    }

    query.range(from, to)

    const { data: reports, count, error } = await query

    if (error) {
      console.error('Get reports error:', error)
      return internalErrorResponse('Failed to fetch reports')
    }

    return successResponse(
      reports || [],
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
    console.error('Get reports error:', error)
    return internalErrorResponse()
  }
}
