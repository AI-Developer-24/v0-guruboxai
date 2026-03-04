import { google } from 'googleapis'
import { OAuth2Client } from 'google-auth-library'
import { getSupabaseAdmin } from '../supabase'
import type { Database } from '../supabase-types'
import { createOAuth2Client } from './google-oauth'

type Report = Database['public']['Tables']['reports']['Row']
type Opportunity = Database['public']['Tables']['opportunities']['Row']

interface ExportResult {
  documentId: string
  url: string
}

/**
 * Export report to Google Docs using user's OAuth token
 */
export async function exportToGoogleDocs(
  reportId: string,
  accessToken: string
): Promise<ExportResult> {
  console.log('[GDocs Export] Starting export for report:', reportId)

  // Create OAuth2 client with user's access token
  const auth = createOAuth2Client(accessToken)
  const docs = google.docs({ version: 'v1', auth })
  const drive = google.drive({ version: 'v3', auth })
  const supabaseAdmin = getSupabaseAdmin()

  // Fetch report data
  console.log('[GDocs Export] Fetching report data...')
  const { data: report, error: reportError } = await supabaseAdmin
    .from('reports')
    .select('*')
    .eq('id', reportId)
    .single()

  if (reportError || !report) {
    console.error('[GDocs Export] Failed to fetch report:', reportError)
    throw new Error('Report not found')
  }
  console.log('[GDocs Export] Report fetched successfully, input_text length:', report.input_text?.length)

  // Fetch all opportunities
  console.log('[GDocs Export] Fetching opportunities...')
  const { data: opportunities, error: oppsError } = await supabaseAdmin
    .from('opportunities')
    .select('*')
    .eq('report_id', reportId)
    .order('final_score', { ascending: false })

  if (oppsError) {
    console.error('[GDocs Export] Failed to fetch opportunities:', oppsError)
    throw new Error('Failed to fetch opportunities')
  }
  console.log('[GDocs Export] Fetched opportunities count:', opportunities?.length || 0)

  // Create new document
  const title =
    report.input_text.length > 50
      ? `GuruBox Report: ${report.input_text.slice(0, 50)}...`
      : `GuruBox Report: ${report.input_text}`

  console.log('[GDocs Export] Creating document with title:', title)
  let createdDoc
  try {
    createdDoc = await docs.documents.create({
      requestBody: { title },
    })
    console.log('[GDocs Export] Document created successfully, documentId:', createdDoc.data.documentId)
  } catch (createError) {
    console.error('[GDocs Export] Failed to create document:', {
      message: createError instanceof Error ? createError.message : 'Unknown error',
      stack: createError instanceof Error ? createError.stack : undefined,
      response: (createError as { response?: { data?: unknown; status?: number } }).response?.data,
      status: (createError as { response?: { data?: unknown; status?: number } }).response?.status,
    })
    throw createError
  }

  const documentId = createdDoc.data.documentId!
  const requests: google.docs.v1.Schema$Request[] = []

  // Track current index for insertions
  let currentIndex = 1

  // Note: We don't delete the default empty paragraph because:
  // 1. Google Docs API doesn't allow deleteContentRange to include the newline at segment end
  // 2. Inserting content at index 1 will naturally replace the default content

  // Helper to add text and update index
  const addText = (text: string) => {
    requests.push({
      insertText: {
        location: { index: currentIndex },
        text,
      },
    })
    currentIndex += text.length
  }

  // Add title
  addText('AI Product Insight Report\n')
  requests.push({
    updateParagraphStyle: {
      range: { startIndex: 1, endIndex: 27 },
      paragraphStyle: {
        namedStyleType: 'HEADING_1',
        alignment: 'CENTER',
      },
      fields: 'namedStyleType,alignment',
    },
  })

  // Add date
  const dateString = new Date(report.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  addText(`${dateString}\n\n`)

  // Add analysis direction section
  addText('Analysis Direction\n')
  requests.push({
    updateParagraphStyle: {
      range: { startIndex: currentIndex - 19, endIndex: currentIndex - 1 },
      paragraphStyle: { namedStyleType: 'HEADING_2' },
      fields: 'namedStyleType',
    },
  })
  addText(`${report.input_text}\n\n`)

  // Add statistics section
  const premiumCount = Math.round(report.premium_ratio * report.total_opportunities)
  const premiumPercent = Math.round(report.premium_ratio * 100)
  const analysisMinutes = Math.round(report.analysis_time_sec / 60)

  addText('Statistics\n')
  requests.push({
    updateParagraphStyle: {
      range: { startIndex: currentIndex - 11, endIndex: currentIndex - 1 },
      paragraphStyle: { namedStyleType: 'HEADING_2' },
      fields: 'namedStyleType',
    },
  })
  addText(`Total Opportunities: ${report.total_opportunities}\n`)
  addText(`Premium Opportunities: ${premiumCount} (${premiumPercent}%)\n`)
  addText(`Analysis Time: ${analysisMinutes} minutes\n\n`)

  // Add executive summary section
  addText('Executive Summary\n')
  requests.push({
    updateParagraphStyle: {
      range: { startIndex: currentIndex - 18, endIndex: currentIndex - 1 },
      paragraphStyle: { namedStyleType: 'HEADING_2' },
      fields: 'namedStyleType',
    },
  })
  addText(`${report.summary_text}\n\n`)

  // Add opportunities section
  addText('Opportunities\n\n')
  requests.push({
    updateParagraphStyle: {
      range: { startIndex: currentIndex - 14, endIndex: currentIndex - 2 },
      paragraphStyle: { namedStyleType: 'HEADING_2' },
      fields: 'namedStyleType',
    },
  })

  // Add each opportunity
  for (const opp of opportunities || []) {
    const isPremium = opp.final_score >= 80
    const oppTitle = `${opp.index_number}. ${opp.name}`
    const titleLength = oppTitle.length

    addText(oppTitle)

    if (isPremium) {
      requests.push({
        updateTextStyle: {
          range: {
            startIndex: currentIndex - titleLength - 1,
            endIndex: currentIndex - 1,
          },
          textStyle: {
            bold: true,
            foregroundColor: {
              color: { rgbColor: { red: 0.6, green: 0.3, blue: 0 } },
            },
          },
          fields: 'bold,foregroundColor',
        },
      })
    }

    if (opp.category) {
      addText(` (${opp.category})`)
    }
    addText('\n')

    if (opp.core_users) {
      addText(`   Core Users: ${opp.core_users}\n`)
    }
    if (opp.pain_points) {
      addText(`   Pain Points: ${opp.pain_points}\n`)
    }
    if (opp.ai_solution) {
      addText(`   AI Solution: ${opp.ai_solution}\n`)
    }
    if (opp.inspiration_source) {
      addText(`   Inspiration: ${opp.inspiration_source}\n`)
    }

    // Add scores
    addText(
      `   Scores: Monetization ${opp.monetization_score} | ` +
        `Market Size ${opp.industry_size_score} | ` +
        `Competition ${opp.competition_score} | ` +
        `MVP Difficulty ${opp.mvp_difficulty_score} | ` +
        `Final: ${opp.final_score}\n\n`
    )
  }

  // Add footer
  addText('\n---\nGenerated by GuruBox.ai')

  // Execute all requests
  console.log('[GDocs Export] Executing batch update with', requests.length, 'requests')
  try {
    await docs.documents.batchUpdate({
      documentId,
      requestBody: { requests },
    })
    console.log('[GDocs Export] Batch update completed successfully')
  } catch (batchError) {
    console.error('[GDocs Export] Failed to batch update document:', {
      documentId,
      message: batchError instanceof Error ? batchError.message : 'Unknown error',
      stack: batchError instanceof Error ? batchError.stack : undefined,
      response: (batchError as { response?: { data?: unknown; status?: number } }).response?.data,
      status: (batchError as { response?: { data?: unknown; status?: number } }).response?.status,
    })
    throw batchError
  }

  // Note: Document is created in user's Drive, so they already have full access
  // No need to set sharing permissions - the document owner is the user

  // Generate URL
  const url = `https://docs.google.com/document/d/${documentId}/edit`

  console.log('[GDocs Export] Export completed successfully. URL:', url)
  return { documentId, url }
}
