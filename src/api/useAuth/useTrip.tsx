import { DataTypeResponse, GetTripsT, HTTPValidationError } from './types';
import {
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

// /**
//  * @endpoint: GET: /users/:company_id
//  * @summary This hook used to List All users that for the specific company
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
