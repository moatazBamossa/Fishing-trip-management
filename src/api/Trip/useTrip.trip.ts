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
  is_rental_field: boolean
  rental_boat_cost: string
  rental_boat_cost_currency: string
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
  rental_boat_cost: number
  rental_boat_cost_currency: string
}

type TripsTypeResponse = {
  trips: TripData[]
  meta: MetaT
} & PublicTypeResponse

type TripTypeResponse = {
  meta: MetaT
} & PublicTypeResponse &
  TripData

export type TripResponseT = AxiosResponse<TripTypeResponse, HTTPValidationError>

export type TripsResponseT = AxiosResponse<TripsTypeResponse, HTTPValidationError>
