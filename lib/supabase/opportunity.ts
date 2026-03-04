import { supabase, supabaseAdmin } from '../supabase'
import type { Database } from '../supabase-types'

type Opportunity = Database['public']['Tables']['opportunities']['Row']
type OpportunityInsert = Database['public']['Tables']['opportunities']['Insert']

export async function getReportOpportunities(
  reportId: string,
  options: {
    page?: number
    size?: number
    sortBy?: 'final_score' | 'index_number'
    sortOrder?: 'asc' | 'desc'
    category?: string
  } = {}
) {
  const {
    page = 1,
    size = 20,
    sortBy = 'final_score',
    sortOrder = 'desc',
    category,
  } = options

  const query = supabase
    .from('opportunities')
    .select('*')
    .eq('report_id', reportId)
    .order(sortBy, { ascending: sortOrder === 'asc' })

  if (category) {
    query.eq('category', category)
  }

  // Pagination
  const from = (page - 1) * size
  const to = from + size - 1
  query.range(from, to)

  // Get total count
  const { count } = await supabase
    .from('opportunities')
    .select('*', { count: 'exact', head: true })
    .eq('report_id', reportId)
    .match(category ? { category } : {})

  const { data, error } = await query

  return {
    opportunities: data || [],
    pagination: {
      page,
      size,
      total: count || 0,
      totalPages: Math.ceil((count || 0) / size),
    },
    error,
  }
}

export async function createOpportunities(opportunities: OpportunityInsert[]) {
  const { data, error } = await supabaseAdmin
    .from('opportunities')
    .insert(opportunities)
    .select()

  return { opportunities: data, error }
}

export async function getPremiumOpportunities(reportId: string) {
  const { data, error } = await supabase
    .from('opportunities')
    .select('*')
    .eq('report_id', reportId)
    .gt('final_score', 80)
    .order('final_score', { ascending: false })

  return { opportunities: data || [], error }
}

export async function getOpportunitiesByCategory(
  reportId: string
): Promise<Record<string, Opportunity[]>> {
  const { data, error } = await supabase
    .from('opportunities')
    .select('*')
    .eq('report_id', reportId)

  if (error || !data) return {}

  return data.reduce((acc, opp) => {
    const category = opp.category || 'Uncategorized'
    if (!acc[category]) acc[category] = []
    acc[category].push(opp)
    return acc
  }, {} as Record<string, Opportunity[]>)
}
