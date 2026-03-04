import { NextResponse } from 'next/server'
import { unauthorizedResponse, notFoundResponse, internalErrorResponse } from '@/lib/api/response'
import { requireAuth, createSupabaseClient } from '@/lib/api/auth'
import { generatePDF, getPDFFileName } from '@/lib/export/pdf-generator'

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

    // Generate PDF
    const pdfBuffer = await generatePDF(report_id)
    const fileName = getPDFFileName(report_id)

    // Return PDF file
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Content-Length': pdfBuffer.length.toString(),
      },
    })
  } catch (error) {
    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return unauthorizedResponse()
    }
    console.error('Export PDF error:', error)
    return internalErrorResponse(
      error instanceof Error ? error.message : 'Failed to generate PDF'
    )
  }
}
