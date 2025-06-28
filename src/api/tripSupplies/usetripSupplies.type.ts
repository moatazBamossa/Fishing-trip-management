import { AxiosResponse } from 'axios'
import { HTTPValidationError } from '../apiType.type'

export type TripSuppliesType = {
  id?: number
  category: string
  cost: string
  name: string
}

export type TripSuppliesResponse = {
  trip_supplies: TripSuppliesType[]
}

export type TripSuppliesResponseT = AxiosResponse<TripSuppliesResponse, HTTPValidationError>
