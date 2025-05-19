import {
  useQuery,
  useMutation,
  QueryKey,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query'
import { publicApi } from './publicApi'
import { HTTPValidationError } from './apiType.type'
import { useToast } from '@/hooks/use-toast'

// type
type LoginDataParamsT = { email: string; password: string }

type ChangePasswordParamsT = {
  old_password: string
  password: string
  password_confirmation: string
}

export type UserType = {
  id: number
  active: boolean
  address: string
  email: string
  full_name: string
  id_card_number: string
  phone: string
  reset_required: boolean
  role: string
  isAdmin: boolean
}

type LoginResponseType = {
  token: string
  user: UserType
}

type ChangePasswordResponseType = {
  message: string
}

// Query Key
export const getSessionQueryKey = (): QueryKey => ['session_employee']

// API Functions
// export const fetchUsers = () =>
//   publicApi({
//     method: 'POST',
//     url: '/session',
//   });

export const login = (params: LoginDataParamsT): Promise<LoginResponseType> =>
  publicApi({
    method: 'POST',
    url: '/session',
    params,
  })

export const changePassword = (
  params: ChangePasswordParamsT,
): Promise<ChangePasswordResponseType> =>
  publicApi({
    method: 'PUT',
    url: '/passwords/update_with_old_password',
    params,
  })

export const useChangePassword = <TError extends HTTPValidationError>(opts?: {
  mutation?: UseMutationOptions<ChangePasswordResponseType, TError, ChangePasswordParamsT>
}): UseMutationResult<ChangePasswordResponseType, TError, ChangePasswordParamsT> => {
  return useMutation({
    ...(opts?.mutation || {}),
    mutationFn: (payload) => changePassword(payload),
    onSuccess: (res, variables, context) => {
      opts?.mutation?.onSuccess?.(res, variables, context)
    },
    onError: (error, variables, context) => {
      // Toastr.error(error.response?.data.error)
      opts?.mutation?.onError?.(error, variables, context)
    },
  })
}
