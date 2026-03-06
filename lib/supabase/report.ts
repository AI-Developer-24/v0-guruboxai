import { supabase } from '../supabase'
import { supabaseAdmin } from '../supabase-admin'
import type { Database } from '../supabase-types'

type Report = Database['public']['Tables']['reports']['Row']
type ReportInsert = Database['public']['Tables']['reports']['Insert']
type ReportUpdate = Database['public']['Tables']['reports']['Update']

export async function getReportById(id: string) {
  const { data, error } = await supabase
    .from('reports')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  return { report: data, error }
}

export async function getUserReports(
  userId: string,
  options: { page?: number; size?: number; includeDeleted?: boolean } = {}
) {
  const { page = 1, size = 20, includeDeleted = false } = options

  const query = supabase
    .from('reports')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (!includeDeleted) {
    query.eq('is_deleted', false)
  }

  // Pagination
  const from = (page - 1) * size
  const to = from + size - 1
  query.range(from, to)

  // Get total count
  const { count } = await supabase
    .from('reports')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .match(includeDeleted ? {} : { is_deleted: false })

  const { data, error } = await query

  return {
    reports: data || [],
    pagination: {
      page,
      size,
      total: count || 0,
      totalPages: Math.ceil((count || 0) / size),
    },
    error,
  }
}

export async function createReport(report: ReportInsert) {
  const { data, error } = await supabaseAdmin
    .from('reports')
    .insert(report as ReportInsert)
    .select()
    .single()

  return { report: data as Report | null, error }
}

export async function updateReport(id: string, updates: ReportUpdate) {
  const { data, error } = await supabase
    .from('reports')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  return { report: data, error }
}

export async function softDeleteReport(id: string) {
  const { data, error } = await supabase
    .from('reports')
    .update({ is_deleted: true })
    .eq('id', id)
    .select()
    .single()

  return { report: data, error }
}
