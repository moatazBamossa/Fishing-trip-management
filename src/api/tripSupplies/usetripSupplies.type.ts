import { AxiosResponse } from 'axios'
import { HTTPValidationError } from '../apiType.type'

export type TripSuppliesType = {
  id?: number
  category: string
  amount: string
  note: string
}

export type TripSuppliesResponse = {
  trip_expenses: TripSuppliesType[]
}

export type TripSuppliesResponseT = AxiosResponse<TripSuppliesResponse, HTTPValidationError>
