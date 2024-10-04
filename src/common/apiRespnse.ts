interface ApiResponse<T = any> {
  success: boolean
  data?: T
  errors?: string | string[]
}

export { ApiResponse }
