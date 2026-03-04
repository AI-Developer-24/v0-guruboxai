import { z } from 'zod'

// Create task
export const CreateTaskSchema = z.object({
  input_text: z.string()
    .min(10, 'Input text must be at least 10 characters')
    .max(500, 'Input text must be less than 500 characters')
    .refine(
      (value) => value.trim().length > 5,
      'Please enter meaningful text (at least 5 non-whitespace characters)'
    )
    .refine(
      (value) => !/^\d+$/.test(value.trim()),
      'Input cannot be just numbers. Please describe a product direction or idea.'
    ),
})

// Task status type
export const TaskStatusSchema = z.enum(['pending', 'running', 'completed', 'failed'])

// Analysis stage type
export const AnalysisStageSchema = z.enum([
  'understanding',
  'analyzing',
  'scanning',
  'generating',
  'scoring',
  'finalizing',
])

// Report status type
export const ReportStatusSchema = z.enum(['generating', 'completed', 'failed', 'deleted'])

// Language type
export const LanguageSchema = z.enum(['en', 'zh', 'de', 'fr', 'it', 'es', 'pt'])

// Update user
export const UpdateUserSchema = z.object({
  language: LanguageSchema,
})

// Pagination parameters
export const PaginationSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  size: z.coerce.number().min(1).max(100).default(20),
})

// Opportunity sorting
export const OpportunitySortSchema = z.object({
  sort_by: z.enum(['final_score', 'index_number', 'monetization_score']).default('final_score'),
  sort_order: z.enum(['asc', 'desc']).default('desc'),
  category: z.string().optional(),
})

// Export format
export const ExportFormatSchema = z.enum(['pdf', 'gdocs'])

// Opportunity data
export const OpportunitySchema = z.object({
  index_number: z.number(),
  name: z.string(),
  core_users: z.string(),
  pain_points: z.string(),
  user_demands: z.string(),
  ai_solution: z.string(),
  category: z.string().optional(),
  inspiration_source: z.string().optional(),
  signal_count: z.number().min(0),
  monetization_score: z.number().min(0).max(100),
  industry_size_score: z.number().min(0).max(100),
  competition_score: z.number().min(0).max(100),
  mvp_difficulty_score: z.number().min(0).max(100),
  final_score: z.number().min(0).max(100),
})

// Error response types
export const ErrorCodeSchema = z.enum([
  'UNAUTHORIZED',
  'FORBIDDEN',
  'NOT_FOUND',
  'VALIDATION_ERROR',
  'CONCURRENT_TASK_LIMIT',
  'INTERNAL_ERROR',
  'NOT_IMPLEMENTED',
  'GOOGLE_AUTH_REQUIRED',
])

export type ErrorCode = z.infer<typeof ErrorCodeSchema>
