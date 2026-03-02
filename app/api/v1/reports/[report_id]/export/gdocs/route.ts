import { NextResponse } from 'next/server'
import { notImplementedResponse, unauthorizedResponse } from '@/lib/api/response'
import { requireAuth } from '@/lib/api/auth'

export async function POST(
  request: Request,
  { params }: { params: { report_id: string } }
) {
  try {
    // Verify authentication
    await requireAuth()

    // TODO: Implement Google Docs export logic (Phase 6)
    // const docUrl = await exportToGDocs(params.report_id)

    return notImplementedResponse('Google Docs export is not yet implemented')
  } catch (error) {
    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return unauthorizedResponse()
    }
    console.error('Export GDocs error:', error)
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } },
      { status: 500 }
    )
  }
}
