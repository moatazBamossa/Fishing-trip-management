import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query'
import { HTTPValidationError } from '../apiType.type'
import { publicApi } from '../publicApi'
import { UsersResponseT } from './useUsers.type'
import { UserType } from '../OrgUsers/useOrgUsers.type'

export const getAllUsersQueryKey = ['get_all_users']

const getUsers = (): Promise<UsersResponseT> =>
  publicApi({
    method: 'GET',
    url: `/users`,
  })

const createUsers = (params: UserType): Promise<UsersResponseT> =>
  publicApi({
    method: 'POST',
    url: '/users',
    params: { user: params },
  })

const updateUsers = (params: UserType): Promise<UsersResponseT> => {
  const { id, ...rest } = params
  return publicApi({
    method: 'PUT',
    url: `users/${id}`,
    params: { user: rest },
  })
}
// apis
const deleteUsers = (userId: number): Promise<UsersResponseT> =>
  publicApi({
    method: 'DELETE',
    url: `/users/${userId}`,
  })

export const useGetUsers = <TData = UsersResponseT, TError = HTTPValidationError>(opts?: {
  query?: Omit<UseQueryOptions<UsersResponseT, TError, TData>, 'queryKey' | 'queryFn'>
}): UseQueryResult<TData, TError> => {
  return useQuery({
    queryKey: getAllUsersQueryKey,
    queryFn: () => getUsers(),
    ...opts?.query,
  })
}

export const useCreateUser = <TError extends HTTPValidationError>(opts?: {
  mutation?: UseMutationOptions<UsersResponseT, TError, UserType>
}): UseMutationResult<UsersResponseT, TError, UserType> => {
  return useMutation({
    ...(opts?.mutation || {}),
    mutationFn: (payload) => createUsers(payload),
    onSuccess: (res, variables, context) => {
      opts?.mutation?.onSuccess?.(res, variables, context)
    },
    onError: (error, variables, context) => {
      opts?.mutation?.onError?.(error, variables, context)
    },
  })
}

export const useUpdateUser = <TError extends HTTPValidationError>(opts?: {
  mutation?: UseMutationOptions<UsersResponseT, TError, UserType>
}): UseMutationResult<UsersResponseT, TError, UserType> => {
  return useMutation({
    ...(opts?.mutation || {}),
    mutationFn: (payload) => updateUsers(payload),
    onSuccess: (res, variables, context) => {
      opts?.mutation?.onSuccess?.(res, variables, context)
    },
    onError: (error, variables, context) => {
      opts?.mutation?.onError?.(error, variables, context)
    },
  })
}

export const useDeleteUser = <TError extends HTTPValidationError>(opts?: {
  mutation?: UseMutationOptions<UsersResponseT, TError, number>
}): UseMutationResult<UsersResponseT, TError, number> => {
  return useMutation({
    ...(opts?.mutation || {}),
    mutationFn: (userId) => deleteUsers(userId),
    onSuccess: (res, variables, context) => {
      opts?.mutation?.onSuccess?.(res, variables, context)
    },
    onError: (error, variables, context) => {
      opts?.mutation?.onError?.(error, variables, context)
    },
  })
}
