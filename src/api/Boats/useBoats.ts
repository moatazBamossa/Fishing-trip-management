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
import { BoatParamsType, BoatsResponseT } from './useBoats.type'

// Query Key
export const getAllBoatsQueryKey = ['get_all_boats']
//api
const getBoats = (): Promise<BoatsResponseT> =>
  publicApi({
    method: 'GET',
    url: `/boats`,
  })

const createBoats = (params: BoatParamsType): Promise<BoatsResponseT> =>
  publicApi({
    method: 'POST',
    url: `/boats`,
    params: { boat: params },
  })

const updateBoat = (params: BoatParamsType): Promise<BoatsResponseT> => {
  const { id, ...rest } = params
  return publicApi({
    method: 'PUT',
    url: `/boats/${id}`,
    params: { boat: rest },
  })
}

const deleteBoat = (boatId: number): Promise<BoatsResponseT> =>
  publicApi({
    method: 'DELETE',
    url: `/boats/${boatId}`,
  })

// hock
export const useGetBoats = <TData = BoatsResponseT, TError = HTTPValidationError>(opts?: {
  query?: Omit<UseQueryOptions<BoatsResponseT, TError, TData>, 'queryKey' | 'queryFn'>
}): UseQueryResult<TData, TError> => {
  return useQuery({
    queryKey: getAllBoatsQueryKey,
    queryFn: getBoats,
    ...opts?.query,
  })
}

export const useCreateBoat = <TError extends HTTPValidationError>(opts?: {
  mutation?: UseMutationOptions<BoatsResponseT, TError, BoatParamsType>
}): UseMutationResult<BoatsResponseT, TError, BoatParamsType> => {
  return useMutation({
    ...(opts?.mutation || {}),
    mutationFn: (payload) => createBoats(payload),
    onSuccess: (res, variables, context) => {
      opts?.mutation?.onSuccess?.(res, variables, context)
    },
    onError: (error, variables, context) => {
      opts?.mutation?.onError?.(error, variables, context)
    },
  })
}

export const useUpdateBoats = <TError extends HTTPValidationError>(opts?: {
  mutation?: UseMutationOptions<BoatsResponseT, TError, BoatParamsType>
}): UseMutationResult<BoatsResponseT, TError, BoatParamsType> => {
  return useMutation({
    ...(opts?.mutation || {}),
    mutationFn: (payload) => updateBoat(payload),
    onSuccess: (res, variables, context) => {
      opts?.mutation?.onSuccess?.(res, variables, context)
    },
    onError: (error, variables, context) => {
      opts?.mutation?.onError?.(error, variables, context)
    },
  })
}

export const useDeleteBoat = <TError extends HTTPValidationError>(opts?: {
  mutation?: UseMutationOptions<BoatsResponseT, TError, number>
}): UseMutationResult<BoatsResponseT, TError, number> => {
  return useMutation({
    ...(opts?.mutation || {}),
    mutationFn: (boatId) => deleteBoat(boatId),
    onSuccess: (res, variables, context) => {
      opts?.mutation?.onSuccess?.(res, variables, context)
    },
    onError: (error, variables, context) => {
      opts?.mutation?.onError?.(error, variables, context)
    },
  })
}
