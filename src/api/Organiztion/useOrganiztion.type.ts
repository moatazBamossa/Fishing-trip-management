import { AxiosResponse } from 'axios'
import { HTTPValidationError } from '../apiType.type'

export type OrganizationType = {
  id?: number
  address: string | null
  email: string
  name: string
  phone: number | null
}

export type PublicOrganizationTypeResponse = {
  success: boolean
  message: string | null

  meta: {
    pagination: {
      count: number
      page: number
      limit: number
      prev: boolean | null
      next: boolean | null
      last: number
    }
  }
}
export type OrganizationsTypeResponse = {
  organizations?: OrganizationType[]
} & PublicOrganizationTypeResponse

export type OrganizationTypeResponse = {
  organizations?: OrganizationType
} & PublicOrganizationTypeResponse

export type OrganizationsResponseT = AxiosResponse<OrganizationsTypeResponse, HTTPValidationError>
export type OrganizationResponseT = AxiosResponse<OrganizationTypeResponse, HTTPValidationError>
