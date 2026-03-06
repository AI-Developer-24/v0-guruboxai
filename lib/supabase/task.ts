import { supabase } from '../supabase'
import { supabaseAdmin } from '../supabase-admin'
import type { Database } from '../supabase-types'

type Task = Database['public']['Tables']['tasks']['Row']
type TaskInsert = Database['public']['Tables']['tasks']['Insert']
type TaskUpdate = Database['public']['Tables']['tasks']['Update']

export async function getTaskById(id: string) {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  return { task: data, error }
}

export async function getUserRunningTask(userId: string) {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'running')
    .maybeSingle()

  return { task: data, error }
}

export async function createTask(task: TaskInsert) {
  const { data, error } = await supabaseAdmin
    .from('tasks')
    .insert(task)
    .select()
    .single()

  return { task: data, error }
}

export async function updateTask(id: string, updates: TaskUpdate) {
  const { data, error } = await supabaseAdmin
    .from('tasks')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  return { task: data, error }
}

export async function updateTaskStage(taskId: string, stage: string) {
  return updateTask(taskId, {
    current_stage: stage,
    updated_at: new Date().toISOString(),
  })
}

export async function completeTaskStage(taskId: string, stage: string) {
  const { data: task } = await getTaskById(taskId)
  if (!task) return { error: new Error('Task not found') }

  const stagesCompleted = [...(task.stages_completed || []), stage]
  return updateTask(taskId, {
    stages_completed: stagesCompleted,
    updated_at: new Date().toISOString(),
  })
}
