import {
  QueryKey,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query'
import { HTTPValidationError } from '../apiType.type'
import { GetParamsType, publicApi } from '../publicApi'
import { UserResponseT, UsersResponseT, UserType } from './useOrgUsers.type'
import { toast } from '@/components/ui/use-toast'

export const getAllOrgUsersQueryKey = (id: number, params?: GetParamsType): QueryKey => [
  'get_all_users',
  id,
  params,
]
// API Functions
const getOrgUsers = (orgId: number, params?: GetParamsType): Promise<UsersResponseT> =>
  publicApi({
    method: 'GET',
    url: `/dashboard/organizations/${orgId}/users`,
    params,
  })

const createOrgUsers = (orgId: number, params: UserType): Promise<UserResponseT> =>
  publicApi({
    method: 'POST',
    url: `/dashboard/organizations/${orgId}/users`,
    params: { user: params },
  })

const updateOrgUsers = (orgId: number, params: UserType): Promise<UserResponseT> =>
  publicApi({
    method: 'PUT',
    url: `/dashboard/organizations/${orgId}/users/${params.id}`,
    params: { user: params },
  })

const deleteOrgUsers = (orgId: number, userId: number): Promise<UserResponseT> =>
  publicApi({
    method: 'DELETE',
    url: `/dashboard/organizations/${orgId}/users/${userId}`,
  })

export const useGetOrgUsers = <TData = UsersResponseT, TError = HTTPValidationError>(
  id: number,
  params?: GetParamsType,
  opts?: {
    query?: Omit<UseQueryOptions<UsersResponseT, TError, TData>, 'queryKey' | 'queryFn'>
  },
): UseQueryResult<TData, TError> => {
  return useQuery({
    queryKey: getAllOrgUsersQueryKey(id, params),
    queryFn: () => getOrgUsers(id, params),
    ...opts?.query,
  })
}

export const useCreateOrgUser = <TError extends HTTPValidationError>(
  id: number,
  opts?: {
    mutation?: UseMutationOptions<UserResponseT, TError, UserType>
  },
): UseMutationResult<UserResponseT, TError, UserType> => {
  return useMutation({
    ...(opts?.mutation || {}),
    mutationFn: (payload) => createOrgUsers(id, payload),
    onSuccess: (res, variables, context) => {
      toast({
        title: 'create organization successfully',
        description: res.data.message,
      })

      opts?.mutation?.onSuccess?.(res, variables, context)
    },
    onError: (error, variables, context) => {
      toast({
        title: 'create organization failed',
        description: error?.response?.data?.error || 'Invalid credentials.',
        variant: 'destructive',
      })
      opts?.mutation?.onError?.(error, variables, context)
    },
  })
}

export const useUpdateOrgUser = <TError extends HTTPValidationError>(
  id: number,
  opts?: {
    mutation?: UseMutationOptions<UserResponseT, TError, UserType>
  },
): UseMutationResult<UserResponseT, TError, UserType> => {
  return useMutation({
    ...(opts?.mutation || {}),
    mutationFn: (payload) => updateOrgUsers(id, payload),
    onSuccess: (res, variables, context) => {
      toast({
        title: 'create organization successfully',
        description: res.data.message,
      })

      opts?.mutation?.onSuccess?.(res, variables, context)
    },
    onError: (error, variables, context) => {
      toast({
        title: 'create organization failed',
        description: error?.response?.data?.error || 'Invalid credentials.',
        variant: 'destructive',
      })
      opts?.mutation?.onError?.(error, variables, context)
    },
  })
}

export const useDeleteOrgUser = <TError extends HTTPValidationError>(
  id: number,
  opts?: {
    mutation?: UseMutationOptions<UserResponseT, TError, number>
  },
): UseMutationResult<UserResponseT, TError, number> => {
  return useMutation({
    ...(opts?.mutation || {}),
    mutationFn: (userId) => deleteOrgUsers(id, userId),
    onSuccess: (res, variables, context) => {
      opts?.mutation?.onSuccess?.(res, variables, context)
    },
    onError: (error, variables, context) => {
      toast({
        title: 'create organization failed',
        description: error?.response?.data?.error || 'Invalid credentials.',
        variant: 'destructive',
      })
      opts?.mutation?.onError?.(error, variables, context)
    },
  })
}
