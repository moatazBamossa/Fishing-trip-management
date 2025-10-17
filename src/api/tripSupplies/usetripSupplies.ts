import {
  useMutation,
  useQuery,
  UseMutationOptions,
  UseQueryOptions,
  UseMutationResult,
} from '@tanstack/react-query'
import { publicApi } from '../publicApi'
import { TripSuppliesResponseT, TripSuppliesType } from './usetripSupplies.type'
import { HTTPValidationError } from '../apiType.type'

export const getTripSuppliesQueryKey = (id: number) => ['get_trip_supplies', id]
export const getTripSuppliesByIdQueryKey = (id: number, tripSuppliesId: number) => [
  'get_trip_supplies_by_id',
  id,
  tripSuppliesId,
]

// API to get trips
const getTripSupplies = (id: number): Promise<TripSuppliesResponseT> =>
  publicApi({
    method: 'GET',
    url: `/trips/${id}/trip_expenses`,
  })

// const createTripSupplies = (
//   id: number,
//   params: TripSuppliesType[],
// ): Promise<TripSuppliesResponseT> =>
//   publicApi({
//     method: 'POST',
//     url: `/trips/${id}/trip_expenses`,
//     data: { trip_expense: params },
//   })

const createTripSupplies = (
  id: number,
  params: TripSuppliesType[],
): Promise<TripSuppliesResponseT> =>
  publicApi({
    method: 'POST',
    url: `/trips/${id}/trip_expenses`,
    data: { trip_expense: params },
  })
const updateTripSupplies = (
  id: number,
  params: TripSuppliesType[],
): Promise<TripSuppliesResponseT> =>
  publicApi({
    method: 'PATCH',
    url: `/trips/${id}/trip_expenses`,
    data: { trip_expenses: params },
  })

const deleteTripSupplies = (id: number): Promise<TripSuppliesResponseT> =>
  publicApi({
    method: 'DELETE',
    url: `/trips/${id}/trip_expenses`,
  })

export const useGetTripSupplies = <
  TData = TripSuppliesResponseT,
  TError = HTTPValidationError,
>(opts?: {
  query?: Omit<UseQueryOptions<TripSuppliesResponseT, TError, TData>, 'queryKey' | 'queryFn'>
  id: number
}) => {
  return useQuery({
    queryKey: getTripSuppliesQueryKey(opts?.id),
    queryFn: () => getTripSupplies(opts?.id),
    ...opts?.query,
  })
}

export const useCreateTripSupplies = <TError extends HTTPValidationError>(
  id: number,
  opts?: {
    mutation?: UseMutationOptions<TripSuppliesResponseT, TError, TripSuppliesType[]>
  },
): UseMutationResult<TripSuppliesResponseT, TError, TripSuppliesType[]> => {
  return useMutation({
    ...(opts?.mutation || {}),
    mutationFn: (payload) => createTripSupplies(id, payload),
    onSuccess: (res, variables, context) => {
      opts?.mutation?.onSuccess?.(res, variables, context)
    },
  })
}

export const useUpdateTripSupplies = <TError extends HTTPValidationError>(
  id: number,
  opts?: {
    mutation?: UseMutationOptions<TripSuppliesResponseT, TError, TripSuppliesType[]>
  },
): UseMutationResult<TripSuppliesResponseT, TError, TripSuppliesType[]> => {
  return useMutation({
    ...(opts?.mutation || {}),
    mutationFn: (payload) => updateTripSupplies(id, payload),
    onSuccess: (res, variables, context) => {
      opts?.mutation?.onSuccess?.(res, variables, context)
    },
  })
}

export const useDeleteTripSupplies = <TError extends HTTPValidationError>(
  id: number,
  opts?: {
    mutation?: UseMutationOptions<TripSuppliesResponseT, TError, void>
  },
): UseMutationResult<TripSuppliesResponseT, TError, void> => {
  return useMutation({
    ...(opts?.mutation || {}),
    mutationFn: () => deleteTripSupplies(id),
    onSuccess: (res, variables, context) => {
      opts?.mutation?.onSuccess?.(res, variables, context)
    },
  })
}
