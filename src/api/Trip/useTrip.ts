import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query'
import { publicApi } from '../publicApi'
import { TripParamsType, TripResponseT } from './useTrip.trip'
import { HTTPValidationError } from '../apiType.type'

// Query Key
export const getAllTripQueryKey = ['get_all_trips']
export const getTripByIdQueryKey = (tripId: number) => ['get_trip_by_id', tripId]

// API to get trips
const getTrips = (): Promise<TripResponseT> =>
  publicApi({
    method: 'GET',
    url: `/trips`,
  })

const getTripById = (tripId: number): Promise<TripResponseT> =>
  publicApi({
    method: 'GET',
    url: `/trips/${tripId}`,
  })
// API to create a trip
const createTrip = (params: TripParamsType): Promise<TripResponseT> =>
  publicApi({
    method: 'POST',
    url: `/trips`,
    params: { trip: params },
  })

const updateTrip = (params: TripParamsType): Promise<TripResponseT> => {
  const { id, ...rest } = params
  return publicApi({
    method: 'PUT',
    url: `/trips/${id}`,
    params: { trip: rest },
  })
}

const deleteTrip = (tripId: number): Promise<TripResponseT> =>
  publicApi({
    method: 'DELETE',
    url: `/trips/${tripId}`,
  })

// hocks
export const useGetTrips = <TData = TripResponseT, TError = HTTPValidationError>(opts?: {
  query?: Omit<UseQueryOptions<TripResponseT, TError, TData>, 'queryKey' | 'queryFn'>
}): UseQueryResult<TData, TError> => {
  return useQuery({
    queryKey: getAllTripQueryKey,
    queryFn: getTrips,
    ...opts?.query,
  })
}

export const useCreateTrip = <TError extends HTTPValidationError>(opts?: {
  mutation?: UseMutationOptions<TripResponseT, TError, TripParamsType>
}): UseMutationResult<TripResponseT, TError, TripParamsType> => {
  return useMutation({
    ...(opts?.mutation || {}),
    mutationFn: (payload) => createTrip(payload),
    onSuccess: (res, variables, context) => {
      opts?.mutation?.onSuccess?.(res, variables, context)
    },
    onError: (error, variables, context) => {
      opts?.mutation?.onError?.(error, variables, context)
    },
  })
}

export const useUpdateTrip = <TError extends HTTPValidationError>(opts?: {
  mutation?: UseMutationOptions<TripResponseT, TError, TripParamsType>
}): UseMutationResult<TripResponseT, TError, TripParamsType> => {
  return useMutation({
    ...(opts?.mutation || {}),
    mutationFn: (payload) => updateTrip(payload),
    onSuccess: (res, variables, context) => {
      opts?.mutation?.onSuccess?.(res, variables, context)
    },
    onError: (error, variables, context) => {
      opts?.mutation?.onError?.(error, variables, context)
    },
  })
}

export const useDeleteTrip = <TError extends HTTPValidationError>(opts?: {
  mutation?: UseMutationOptions<TripResponseT, TError, number>
}): UseMutationResult<TripResponseT, TError, number> => {
  return useMutation({
    ...(opts?.mutation || {}),
    mutationFn: (payload) => deleteTrip(payload),
    onSuccess: (res, variables, context) => {
      opts?.mutation?.onSuccess?.(res, variables, context)
    },
    onError: (error, variables, context) => {
      opts?.mutation?.onError?.(error, variables, context)
    },
  })
}

export const useGetTripById = <TData = TripResponseT, TError = HTTPValidationError>(
  tripId: number,
  opts?: {
    query?: Omit<UseQueryOptions<TripResponseT, TError, TData>, 'queryKey' | 'queryFn'>
  },
): UseQueryResult<TData, TError> => {
  return useQuery({
    queryKey: getTripByIdQueryKey(tripId),
    queryFn: () => getTripById(tripId),
    ...opts?.query,
  })
}
