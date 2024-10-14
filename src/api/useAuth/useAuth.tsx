import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  UseQueryOptions,
  UseQueryResult
} from '@tanstack/react-query';

import {
  DataTypeResponse,
  GetTokenStatusT,
  getUsersT,
  HTTPValidationError,
  LoginT,
  TokenResponse
} from './types'; // Adjust the import based on your types
import axios from 'axios';
import { Toastr } from '@/components/Toastr/Toastr';
import { CompanyDataT } from '@/lib/InterFace/helper';

export const getTokenStatus = async (
  body: GetTokenStatusT
): Promise<TokenResponse> => {
  const res = await axios.post<TokenResponse>(
    'https://fakestoreapi.com/auth/login',
    body
  );

  // The `res.data` should match the structure of `TokenResponse`
  return res.data;
};

export const login = async (body: LoginT): Promise<CompanyDataT> => {
  const res = await axios.post<CompanyDataT>(
    'https://alshrarh-team-1.onrender.com/check-company',
    body
  );
  return res.data;
};

export const getAuthStat = async (
  params: getUsersT
): Promise<DataTypeResponse> => {
  const res = await axios.get<DataTypeResponse>(
    `https://alshrarh-team-1.onrender.com/check-company/${params.company_id}`
  );

  return res.data; // This should return the data according to your DataTypeResponse
};

// /**
//  * @endpoint: GET: /api/check-auth
//  * @summary This hook is used to get the authentication status of the user.
//  */
// export const useGetAuth = <TError extends HTTPValidationError>(
//   opts?: UseQueryOptions<boolean, TError>
// ): UseQueryResult<boolean, TError> => {
//   return useQuery<boolean, TError>({
//     queryKey: ['authStatus'], // Unique key for the query
//     queryFn: getAuthStatus, // Your API function to fetch auth status
//     ...opts // Merge any additional options passed to the hook
//   });
// };

export const useGetTokenStatus = <TError extends HTTPValidationError>(opts?: {
  mutation?: UseMutationOptions<TokenResponse, TError, GetTokenStatusT>;
}): UseMutationResult<TokenResponse, TError, GetTokenStatusT> => {
  return useMutation({
    ...(opts?.mutation || {}),
    mutationFn: (payload) => getTokenStatus(payload),
    onSuccess: (res, variables, context) => {
      opts?.mutation?.onSuccess?.(res, variables, context);

      localStorage.setItem('token', res?.token);

      // Show the success Toastr
      Toastr.success('Login successful!', () => {
        window.open('/', '_self');
      });
    },
    onError: (err) => {
      console.log('err', err);
      Toastr.error(err?.response?.data || 'error');
    }
  });
};

export const useLogin = <TError extends HTTPValidationError>(opts?: {
  mutation?: UseMutationOptions<CompanyDataT, TError, LoginT>;
}): UseMutationResult<CompanyDataT, TError, LoginT> => {
  return useMutation({
    ...(opts?.mutation || {}),
    mutationFn: (payload) => login(payload),
    onSuccess: (res, variables, context) => {
      opts?.mutation?.onSuccess?.(res, variables, context);
    },
    onError: (err) => {
      console.log('err', err);
      Toastr.error(err?.response?.data || 'error');
    }
  });
};

export const useGetAuth = <TData = boolean, TError = HTTPValidationError>(
  company_id: getUsersT,
  opts?: {
    query?: UseQueryOptions<DataTypeResponse, TError, TData>;
  }
): UseQueryResult<TData, TError> => {
  return useQuery<DataTypeResponse, TError, TData>({
    ...(opts?.query || {}),
    queryKey: opts?.query?.queryKey ?? ['getAuth', company_id], // Ensure the queryKey is unique based on company_id
    queryFn: () => getAuthStat(company_id)
  });
};
