/**
 * API Client for BadgerSignal
 * Provides type-safe methods for communicating with the backend API
 */

import { logger } from '../logger'

const apiLogger = logger.withContext('ApiClient')

class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string = '/api/v1') {
    this.baseUrl = baseUrl
  }

  /**
   * GET request
   */
  async get<T>(path: string, params?: Record<string, any>): Promise<T> {
    // Build URL with proper path concatenation
    let fullPath = `${this.baseUrl}${path}`

    if (params) {
      const searchParams = new URLSearchParams()
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value))
        }
      })
      const queryString = searchParams.toString()
      if (queryString) {
        fullPath += `?${queryString}`
      }
    }

    // Add cache busting to prevent browser caching
    const url = new URL(fullPath, window.location.origin)
    url.searchParams.append('_', Date.now().toString())

    const response = await fetch(url.toString(), {
      credentials: 'include',
      cache: 'no-store',
    })
    return this.handleResponse<T>(response)
  }

  /**
   * POST request
   */
  async post<T>(path: string, body?: any): Promise<T> {
    apiLogger.debug('POST request', {
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

    apiLogger.debug('POST response', {
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
      const json = await response.json()
      // Extract data from wrapped response: { data: T } -> T
      // But preserve structure for paginated responses: { data: T[], meta: {...} }
      if (json && typeof json === 'object' && 'data' in json && !('meta' in json)) {
        return json.data as T
      }
      return json as T
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
  status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled'
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
  premium_count: number
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

// Single opportunity response (matches database schema)
export interface OpportunityResponse {
  id: string
  report_id: string
  index_number: number
  name: string
  core_users: string
  pain_points: string
  user_demands: string
  ai_solution: string
  category?: string
  inspiration_source?: string
  signal_count: number
  monetization_score: number
  industry_size_score: number
  competition_score: number
  mvp_difficulty_score: number
  final_score: number
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
