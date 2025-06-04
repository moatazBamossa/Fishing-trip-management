import { AxiosResponse } from 'axios'
import { HTTPValidationError, MetaT, PublicTypeResponse } from '../apiType.type'

export type BoatType = {
  id: number
  capacity: number
  model: string | null
  name: string
  registration_number: string
  rental_status: string
  rental_status_i18n: string
  status: string
  status_i18n: string
  year_built: string | null
}

export type BoatParamsType = {
  id?: number
  name: string
  capacity: number
  registration_number: string
  owner: string
}

type BoatsTypeResponse = {
  boats: BoatType[]
  meta: MetaT
} & PublicTypeResponse

export type BoatsResponseT = AxiosResponse<BoatsTypeResponse, HTTPValidationError>
