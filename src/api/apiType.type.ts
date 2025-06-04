import { AxiosError } from 'axios'

export type HTTPValidationError = AxiosError<{
  message: string | null
  error: string | null
  success: boolean
}>

export type PublicTypeResponse = {
  success: true
  message: string
}

export type MetaT = {
  pagination: {
    count: number
    page: number
    limit: number
    prev: boolean | null
    next: boolean | null
    last: number
  }
}
