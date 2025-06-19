import { AxiosResponse } from 'axios'
import { HTTPValidationError, MetaT, PublicTypeResponse } from '../apiType.type'
import { BoatType } from '../Boats/useBoats.type'

export type TripData = {
  id: number
  base_cost: string
  boat: BoatType
  boat_id: number
  description: string
  end_date: string
  form: string
  name: string
  start_date: string
  status: string
  status_i18n: string
  to: string
}

export type TripParamsType = {
  id?: number
  name: string
  start_date: string
  end_date: string
  description: string
  base_cost: string
  status: string
  boat_id: number
  form: string
  to: string
}

type TripTypeResponse = {
  trips: TripData[]
  meta: MetaT
} & PublicTypeResponse

export type TripResponseT = AxiosResponse<TripTypeResponse, HTTPValidationError>
