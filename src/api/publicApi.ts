import api from './axios'

export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

export type DataType = Record<string, unknown>

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
