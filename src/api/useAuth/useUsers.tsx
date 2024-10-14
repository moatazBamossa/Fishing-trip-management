import {
  QueryKey,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
  useMutation,
  useQuery
} from '@tanstack/react-query';

import {
  CreateUserParams,
  DataTypeResponse,
  DeleteUserParams,
  getUsersT,
  HTTPValidationError,
  UpdateUserParams,
  UserType
} from './types';
import axios from 'axios';
import { Toastr } from '@/components/Toastr/Toastr';

export const getUsers = async (
  params: getUsersT
): Promise<DataTypeResponse> => {
  const res = await axios.get<DataTypeResponse>(
    `https://alshrarh-team-1.onrender.com/users/${params.company_id}`
  );
  return res.data; // This should return the data according to your DataTypeResponse
};

export const addUser = async (params: CreateUserParams): Promise<UserType> => {
  try {
    const res = await axios.post<UserType>(
      `https://alshrarh-team-1.onrender.com/user`,
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

export const deleteUser = async (params: DeleteUserParams): Promise<string> => {
  try {
    const res = await axios.delete<string>(
      `https://alshrarh-team-1.onrender.com/user/${params.company_id}/${params.user_id}`
    );

    return res.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error; // Throw the error to catch it later
  }
};

export const updateUser = async (
  params: UpdateUserParams
): Promise<UserType> => {
  try {
    const res = await axios.put<UserType>(
      `https://alshrarh-team-1.onrender.com/user/${params.company_id}/${params.user_id}`,
      params.params
    );

    return res.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error; // Throw the error to catch it later
  }
};

export const usersLoadKey = (params?: string): QueryKey => ['allUsers', params];

// ? hooks

// /**
//  * @endpoint: GET: /users/:company_id
//  * @summary This hook used to List All users that for the specific company
//  */

export const useGetUsers = <TData = UserType[], TError = HTTPValidationError>(
  company_id: getUsersT,
  opts?: {
    query?: UseQueryOptions<DataTypeResponse, TError, TData>;
  }
): UseQueryResult<TData, TError> => {
  return useQuery<DataTypeResponse, TError, TData>({
    ...(opts?.query || {}),
    queryKey: opts?.query?.queryKey ?? ['getUsers', company_id], // Ensure the queryKey is unique based on company_id
    queryFn: () => getUsers(company_id)
  });
};

// /**
//  * @endpoint: POST: /users
//  * @summary This hook used to add user that for the specific company
//  */

export const useAddUser = <TError extends HTTPValidationError>(opts?: {
  mutation?: UseMutationOptions<UserType, TError, CreateUserParams>;
}): UseMutationResult<UserType, TError, CreateUserParams> => {
  return useMutation({
    ...(opts?.mutation || {}),
    mutationFn: (payload) => addUser(payload),
    onSuccess: (res, variables, context) => {
      opts?.mutation?.onSuccess?.(res, variables, context);
    },
    onError: (err) => {
      console.log('err', err);
      Toastr.error(err?.response?.data || 'error');
    }
  });
};

// /**
//  * @endpoint: DELETE: /users/:company_id/:user_id
//  * @summary This hook used to add user that for the specific company
//  */

export const useDeleteUser = <TError extends HTTPValidationError>(opts?: {
  mutation?: UseMutationOptions<string, TError, DeleteUserParams>;
}): UseMutationResult<string, TError, DeleteUserParams> => {
  return useMutation({
    ...(opts?.mutation || {}),
    mutationFn: (payload) => deleteUser(payload),
    onSuccess: (res, variables, context) => {
      opts?.mutation?.onSuccess?.(res, variables, context);
      Toastr.success(res || 'success');
    },
    onError: (err) => {
      console.log('err', err);
      Toastr.error(err?.response?.data || 'error');
    }
  });
};

// /**
//  * @endpoint: UPDATE: /users/:company_id/:user_id
//  * @summary This hook used to add user that for the specific company
//  */

export const useUpdateUser = <TError extends HTTPValidationError>(opts?: {
  mutation?: UseMutationOptions<UserType, TError, UpdateUserParams>;
}): UseMutationResult<UserType, TError, UpdateUserParams> => {
  return useMutation({
    ...(opts?.mutation || {}),
    mutationFn: (payload) => updateUser(payload),
    onSuccess: (res, variables, context) => {
      opts?.mutation?.onSuccess?.(res, variables, context);
      Toastr.success(res.name || 'success');
    },
    onError: (err) => {
      console.log('err', err);
      Toastr.error(err?.response?.data || 'error');
    }
  });
};
