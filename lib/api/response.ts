import { NextResponse } from 'next/server'
import type { ErrorCode } from '../validation/schemas'

export interface ApiError {
  code: ErrorCode
  message: string
  details?: unknown
}

export interface ApiResponse<T = unknown> {
  data?: T
  error?: ApiError
  meta?: {
    pagination?: {
      page: number
      size: number
      total: number
      total_pages: number
    }
  }
}

export function successResponse<T>(data: T, meta?: ApiResponse<T>['meta']): NextResponse<ApiResponse<T>> {
  return NextResponse.json({ data, ...meta ? { meta } : {} })
}

export function errorResponse(
  code: ErrorCode,
  message: string,
  status: number = 500,
  details?: unknown
): NextResponse<ApiResponse> {
  return NextResponse.json(
    { error: { code, message, details } },
    { status }
  )
}

export function unauthorizedResponse(message = 'Authentication required'): NextResponse<ApiResponse> {
  return errorResponse('UNAUTHORIZED', message, 401)
}

export function notFoundResponse(message = 'Resource not found'): NextResponse<ApiResponse> {
  return errorResponse('NOT_FOUND', message, 404)
}

export function validationErrorResponse(message: string, details?: unknown): NextResponse<ApiResponse> {
  return errorResponse('VALIDATION_ERROR', message, 400, details)
}

export function concurrentTaskLimitResponse(details?: unknown): NextResponse<ApiResponse> {
  return errorResponse(
    'CONCURRENT_TASK_LIMIT',
    'You already have an analysis running',
    429,
    details
  )
}

export function internalErrorResponse(message = 'Internal server error'): NextResponse<ApiResponse> {
  return errorResponse('INTERNAL_ERROR', message, 500)
}

export function notImplementedResponse(message = 'Feature not yet implemented'): NextResponse<ApiResponse> {
  return errorResponse('NOT_IMPLEMENTED', message, 501)
}
