import { Toastr } from '@/components/Toastr/Toastr';
import {
  CreateTripParams,
  DataTypeResponse,
  GetTripsT,
  HTTPValidationError
} from './types';
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  UseQueryOptions,
  UseQueryResult
} from '@tanstack/react-query';
import axios from 'axios';

const getAllTrip = async (params: {
  id: string;
}): Promise<DataTypeResponse> => {
  const res = await axios.get<DataTypeResponse>(
    `http://localhost:5000/users/${params.id}/trips`
  );
  return res.data; // This should return the data according to your DataTypeResponse
};

export const addTrip = async (params: CreateTripParams): Promise<string> => {
  try {
    const res = await axios.post<string>(
      `http://localhost:5000/users/${params.user_id}/trip`,
      {
        ...params
      }
    );

    return res.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error; // Throw the error to catch it later
  }
};

// /**
//  * @endpoint: GET: /users/:user_id/trips
//  * @summary This hook used to List All trips that for the specific user
//  */

export const useGetTrip = <TData = GetTripsT, TError = HTTPValidationError>(
  params: {
    id: string;
  },
  opts?: {
    query?: UseQueryOptions<DataTypeResponse, TError, TData>;
  }
): UseQueryResult<TData, TError> => {
  return useQuery<DataTypeResponse, TError, TData>({
    ...(opts?.query || {}),
    queryKey: opts?.query?.queryKey ?? ['getTrip', params], // Ensure the queryKey is unique based on company_id
    queryFn: () => getAllTrip(params)
  });
};

// /**
//  * @endpoint: POST: /users/:user_id/trip'
//  * @summary This hook used to add trip that for the specific user
//  */

export const useTrip = <TError extends HTTPValidationError>(opts?: {
  mutation?: UseMutationOptions<string, TError, CreateTripParams>;
}): UseMutationResult<string, TError, CreateTripParams> => {
  return useMutation({
    ...(opts?.mutation || {}),
    mutationFn: (payload) => addTrip(payload),
    onSuccess: (res, variables, context) => {
      opts?.mutation?.onSuccess?.(res, variables, context);
    },
    onError: (err) => {
      console.log('err', err);
      Toastr.error(err?.response?.data || 'error');
    }
  });
};
