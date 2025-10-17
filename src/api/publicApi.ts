import api from './axios'

export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export type DataType = Record<string, unknown>

export type GetParamsType = {
  filters?: {
    search?: string
  }
  limit?: number
  page?: number
}

interface RequestOptions {
  method: Method
  url: string
  params?: DataType
  data?: DataType
}

export const publicApi = async <T = unknown>({
  method,
  url,
  params,
  data,
}: RequestOptions): Promise<T> => {
  const response = await api.request<T>({
    method,
    url,
    params,
    data,
  })
  return response.data
}
