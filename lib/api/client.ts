/**
 * API Client for GuruBox AI
 * Provides type-safe methods for communicating with the backend API
 */

class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string = '/api/v1') {
    this.baseUrl = baseUrl
  }

  /**
   * GET request
   */
  async get<T>(path: string, params?: Record<string, any>): Promise<T> {
    const url = new URL(path, window.location.origin + this.baseUrl)

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value))
        }
      })
    }

    const response = await fetch(url.toString(), {
      credentials: 'include',
    })
    return this.handleResponse<T>(response)
  }

  /**
   * POST request
   */
  async post<T>(path: string, body?: any): Promise<T> {
    console.log('[ApiClient] POST request', {
      url: `${this.baseUrl}${path}`,
      body,
      hasCredentials: true,
    })

    const response = await fetch(`${this.baseUrl}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: body ? JSON.stringify(body) : undefined,
    })

    console.log('[ApiClient] POST response', {
      url: `${this.baseUrl}${path}`,
      status: response.status,
      ok: response.ok,
    })

    return this.handleResponse<T>(response)
  }

  /**
   * PUT request
   */
  async put<T>(path: string, body?: any): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: body ? JSON.stringify(body) : undefined,
    })
    return this.handleResponse<T>(response)
  }

  /**
   * DELETE request
   */
  async delete<T>(path: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: 'DELETE',
      credentials: 'include',
    })
    return this.handleResponse<T>(response)
  }

  /**
   * Handle response and errors
   */
  private async handleResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get('content-type')

    if (!response.ok) {
      const errorBody = contentType?.includes('application/json')
        ? await response.json()
        : { message: response.statusText }

      throw new ApiError(
        errorBody.error?.code || 'API_ERROR',
        errorBody.error?.message || 'An error occurred',
        errorBody.error?.details,
        response.status
      )
    }

    if (contentType?.includes('application/json')) {
      return response.json() as Promise<T>
    }

    return response.text() as unknown as Promise<T>
  }
}

/**
 * API Error class
 */
export class ApiError extends Error {
  constructor(
    public code: string,
    message: string,
    public details?: any,
    public status?: number
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export const api = new ApiClient()

/**
 * Type definitions for API responses
 */

// Create task response
export interface CreateTaskResponse {
  task_id: string
  report_id: string
  status: string
}

// Task status response
export interface TaskStatusResponse {
  status: 'pending' | 'running' | 'completed' | 'failed'
  current_stage: string
  stages_completed: string[]
  report_status: string
}

// Report response
export interface ReportResponse {
  id: string
  input_text: string
  status: string
  analysis_time_sec: number
  total_opportunities: number
  premium_ratio: number
  summary_text: string
  created_at: string
}

// Opportunities list response
export interface OpportunitiesListResponse {
  data: OpportunityResponse[]
  meta: {
    pagination: {
      total_pages: number
      current_page: number
      total_count: number
    }
  }
}

// Single opportunity response
export interface OpportunityResponse {
  id: string
  report_id: string
  index_number: number
  name: string
  category?: string
  one_liner?: string
  monetization_score: number
  industry_size_score: number
  competition_level_score: number
  mvp_difficulty_score: number
  final_score: number
  target_user_segments?: string[]
  key_pain_points?: string[]
  core_ai_capabilities?: string[]
  signal_count: number
}

// Reports list response
export interface ReportsListResponse {
  data: ReportResponse[]
  meta: {
    pagination: {
      total_pages: number
      current_page: number
      total_count: number
    }
  }
}

// User language update request
export interface UpdateLanguageRequest {
  language: string
}
