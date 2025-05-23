import { AxiosResponse } from 'axios'
import { HTTPValidationError } from '../apiType.type'

export type UserT = {
  email: string
  password: string
  full_name: string
  phone: string
  address: string
  role: 'admin' | 'user'
  id_card_number: string
}

export type UserType = {
  id: number
  active: boolean
  address: string
  email: string
  full_name: string
  id_card_number: string
  is_admin: boolean
  phone: string
  reset_required: boolean
  role: string
  role_i18n: string
}

type PublicUsersTypeResponse = {
  success: true
  message: string
}

type MetaT = {
  pagination: {
    count: number
    page: number
    limit: number
    prev: boolean | null
    next: boolean | null
    last: number
  }
}

type UsersTypeResponse = {
  users: UserType[]
  meta: MetaT
} & PublicUsersTypeResponse

type UserTypeResponse = {
  user: UserType
  meta: MetaT
} & PublicUsersTypeResponse

export type UsersResponseT = AxiosResponse<UsersTypeResponse, HTTPValidationError>
export type UserResponseT = AxiosResponse<UserTypeResponse, HTTPValidationError>
