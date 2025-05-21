import {
  QueryKey,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query'

import { HTTPValidationError } from '../apiType.type'
import { publicApi } from '../publicApi'
import {
  OrganizationResponseT,
  OrganizationsResponseT,
  OrganizationType,
} from './useOrganiztion.type'
import { toast } from '@/components/ui/use-toast'
export const getAllOrganizations = ['get_all_organizations']

// API Functions
const getOrganizations = (): Promise<OrganizationsResponseT> =>
  publicApi({
    method: 'GET',
    url: '/dashboard/organizations/',
  })

const createOrganization = (params: OrganizationType): Promise<OrganizationResponseT> =>
  publicApi({
    method: 'POST',
    url: '/dashboard/organizations/',
    params: { organization: params },
  })

const updateOrganization = (params: OrganizationType): Promise<OrganizationResponseT> =>
  publicApi({
    method: 'PUT',
    url: `/dashboard/organizations/${params.id}`,
    params: { organization: params },
  })

const deleteOrganization = (id: number): Promise<OrganizationResponseT> =>
  publicApi({
    method: 'DELETE',
    url: `/dashboard/organizations/${id}`,
  })

export const useGetOrganizations = <
  TData = OrganizationsResponseT,
  TError = HTTPValidationError,
>(opts?: {
  query?: Omit<UseQueryOptions<OrganizationsResponseT, TError, TData>, 'queryKey' | 'queryFn'>
}): UseQueryResult<TData, TError> => {
  return useQuery({
    queryKey: getAllOrganizations, // Default query key
    queryFn: getOrganizations, // Direct reference to the function
    ...opts?.query, // Spread any additional options
  })
}

export const useCreateOrganization = <TError extends HTTPValidationError>(opts?: {
  mutation?: UseMutationOptions<OrganizationResponseT, TError, OrganizationType>
}): UseMutationResult<OrganizationResponseT, TError, OrganizationType> => {
  return useMutation({
    ...(opts?.mutation || {}),
    mutationFn: (payload) => createOrganization(payload),
    onSuccess: (res, variables, context) => {
      toast({
        title: 'create organization successfully',
        description: res.data.message,
      })

      opts?.mutation?.onSuccess?.(res, variables, context)
    },
    onError: (error, variables, context) => {
      toast({
        title: 'create organization failed',
        description: error?.response?.data?.error || 'Invalid credentials.',
        variant: 'destructive',
      })
      opts?.mutation?.onError?.(error, variables, context)
    },
  })
}

export const useDeleteOrganization = <TError extends HTTPValidationError>(opts?: {
  mutation?: UseMutationOptions<OrganizationResponseT, TError, number>
}): UseMutationResult<OrganizationResponseT, TError, number> => {
  return useMutation({
    ...(opts?.mutation || {}),
    mutationFn: (payload) => deleteOrganization(payload),
    onSuccess: (res, variables, context) => {
      opts?.mutation?.onSuccess?.(res, variables, context)
    },
    onError: (error, variables, context) => {
      // Toastr.error(error.response?.data.error)
      opts?.mutation?.onError?.(error, variables, context)
    },
  })
}

export const useUpdateOrganization = <TError extends HTTPValidationError>(opts?: {
  mutation?: UseMutationOptions<OrganizationResponseT, TError, OrganizationType>
}): UseMutationResult<OrganizationResponseT, TError, OrganizationType> => {
  return useMutation({
    ...(opts?.mutation || {}),
    mutationFn: (payload) => updateOrganization(payload),
    onSuccess: (res, variables, context) => {
      opts?.mutation?.onSuccess?.(res, variables, context)
    },
    onError: (error, variables, context) => {
      // Toastr.error(error.response?.data.error)
      opts?.mutation?.onError?.(error, variables, context)
    },
  })
}
