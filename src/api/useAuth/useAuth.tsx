import {
  useMutation,
  UseMutationOptions,
  UseMutationResult
} from '@tanstack/react-query';

import { GetTokenStatusT, HTTPValidationError, TokenResponse } from './types'; // Adjust the import based on your types
import axios from 'axios';
import { Toastr } from '@/components/Toastr/Toastr';
// export const getAuthStatus = async (): Promise<boolean> => {
//   const response = await axios({
//     method: 'get',
//     url: 'https://randomuser.me/api/'
//   });
//   // const response = await axios.get<AuthStatusResponse>(
//   //   'https://randomuser.me/api/'
//   // ); // Adjust the URL based on your backend

//   console.log('response', response);
//   return response.data?.results[0].gender === 'male' ?? false; // Assuming the response contains this field
// };

// export const getTokenStatus = async (
//   body: GetTokenStatusT
// ): Promise<TokenResponse> => {
//   const res = await axios({
//     method: 'post',
//     url: 'https://fakestoreapi.com/auth/login',
//     data: body
//   });
//   console.log('res', res);
//   return res.data;
// };

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
      // Toastr.success('This is an amazing success message! ');
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
