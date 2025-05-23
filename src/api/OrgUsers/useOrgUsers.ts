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
import { publicApi } from '../publicApi'
import { UserResponseT, UsersResponseT, UserT, UserType } from './useOrgUsers.type'
import { toast } from '@/components/ui/use-toast'

export const getAllUsersQueryKey = (id: number): QueryKey => ['get_all_users', id]
// API Functions
const getUsers = (orgId: number): Promise<UsersResponseT> =>
  publicApi({
    method: 'GET',
    url: `/dashboard/organizations/${orgId}/users`,
  })

const createUsers = (orgId: number, params: UserT): Promise<UserResponseT> =>
  publicApi({
    method: 'POST',
    url: `/dashboard/organizations/${orgId}/users`,
    params: { user: params },
  })

const updateUsers = (orgId: number, params: UserType): Promise<UserResponseT> =>
  publicApi({
    method: 'PUT',
    url: `/dashboard/organizations/${orgId}/users/${params.id}`,
    params: { user: params },
  })

const deleteUsers = (orgId: number, userId: number): Promise<UserResponseT> =>
  publicApi({
    method: 'DELETE',
    url: `/dashboard/organizations/${orgId}/users/${userId}`,
  })

export const useGetUsers = <TData = UsersResponseT, TError = HTTPValidationError>(
  id: number,
  opts?: {
    query?: Omit<UseQueryOptions<UsersResponseT, TError, TData>, 'queryKey' | 'queryFn'>
  },
): UseQueryResult<TData, TError> => {
  return useQuery({
    queryKey: getAllUsersQueryKey(id),
    queryFn: () => getUsers(id),
    ...opts?.query,
  })
}

export const useCreateUser = <TError extends HTTPValidationError>(
  id: number,
  opts?: {
    mutation?: UseMutationOptions<UserResponseT, TError, UserT>
  },
): UseMutationResult<UserResponseT, TError, UserT> => {
  return useMutation({
    ...(opts?.mutation || {}),
    mutationFn: (payload) => createUsers(id, payload),
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

export const useUpdateUser = <TError extends HTTPValidationError>(
  id: number,
  opts?: {
    mutation?: UseMutationOptions<UserResponseT, TError, UserType>
  },
): UseMutationResult<UserResponseT, TError, UserType> => {
  return useMutation({
    ...(opts?.mutation || {}),
    mutationFn: (payload) => updateUsers(id, payload),
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

export const useDeleteUser = <TError extends HTTPValidationError>(
  id: number,
  opts?: {
    mutation?: UseMutationOptions<UserResponseT, TError, number>
  },
): UseMutationResult<UserResponseT, TError, number> => {
  return useMutation({
    ...(opts?.mutation || {}),
    mutationFn: (userId) => deleteUsers(id, userId),
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
