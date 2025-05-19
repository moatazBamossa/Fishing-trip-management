import api from './axios'

export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

export type DataType = Record<string, unknown>

interface RequestOptions<T = unknown> {
  method: Method
  url: string
  params?: DataType
  data?: T
}

export const publicApi = async <T = unknown>({
  method,
  url,
  params,
  data,
}: RequestOptions<T>): Promise<T> => {
  const response = await api.request<T>({
    method,
    url,
    params,
    data,
  })
  return response.data
}
