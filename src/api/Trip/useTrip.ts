import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query'
import { GetParamsType, publicApi } from '../publicApi'
import { TripParamsType, TripResponseT, TripsResponseT } from './useTrip.trip'
import { HTTPValidationError } from '../apiType.type'

// Query Key
export const getAllTripQueryKey = (params?: GetParamsType) => ['get_all_trips', params]
export const getTripByIdQueryKey = (tripId: number) => ['get_trip_by_id', tripId]

// API to get trips
const getTrips = (params?: GetParamsType): Promise<TripsResponseT> =>
  publicApi({
    method: 'GET',
    url: `/trips`,
    params,
  })

const getTripById = (tripId: number): Promise<TripResponseT> =>
  publicApi({
    method: 'GET',
    url: `/trips/${tripId}`,
  })
// API to create a trip
const createTrip = (params: TripParamsType): Promise<TripsResponseT> =>
  publicApi({
    method: 'POST',
    url: `/trips`,
    params: { trip: params },
  })

const updateTrip = (params: TripParamsType): Promise<TripsResponseT> => {
  const { id, ...rest } = params
  return publicApi({
    method: 'PUT',
    url: `/trips/${id}`,
    params: { trip: rest },
  })
}

const deleteTrip = (tripId: number): Promise<TripsResponseT> =>
  publicApi({
    method: 'DELETE',
    url: `/trips/${tripId}`,
  })

// hocks
export const useGetTrips = <TData = TripsResponseT, TError = HTTPValidationError>(
  params?: GetParamsType,
  opts?: {
    query?: Omit<UseQueryOptions<TripsResponseT, TError, TData>, 'queryKey' | 'queryFn'>
  },
): UseQueryResult<TData, TError> => {
  return useQuery({
    queryKey: getAllTripQueryKey(params),
    queryFn: () => getTrips(params),
    ...opts?.query,
  })
}

export const useCreateTrip = <TError extends HTTPValidationError>(opts?: {
  mutation?: UseMutationOptions<TripsResponseT, TError, TripParamsType>
}): UseMutationResult<TripsResponseT, TError, TripParamsType> => {
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
  mutation?: UseMutationOptions<TripsResponseT, TError, TripParamsType>
}): UseMutationResult<TripsResponseT, TError, TripParamsType> => {
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
  mutation?: UseMutationOptions<TripsResponseT, TError, number>
}): UseMutationResult<TripsResponseT, TError, number> => {
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
