export interface ApiResponse {
  code: number
  message: string
  data?: Record<string, unknown>
}

export interface ApiError {
  code: number
  message?: string
  data?: Record<string, unknown>
}
