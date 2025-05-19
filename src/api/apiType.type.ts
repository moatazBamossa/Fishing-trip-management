import { AxiosError } from 'axios'

export type HTTPValidationError = AxiosError<{
  message: string | null
  error: string | null
  success: boolean
}>
