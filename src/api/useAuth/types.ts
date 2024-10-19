import { ExpensesT, FishingT } from '@/lib/InterFace/helper';

export type AuthStatusResponse = {
  results: { gender: string };
};

export type HTTPValidationError = {
  response?: { data?: string };
  statusCode: number; // The HTTP status code of the error
  message: string; // A general error message
  errors?: {
    // Optional field for detailed validation errors
    [key: string]: string[]; // Keyed by the field name with an array of error messages
  };
};

export type GetTokenStatusT = {
  username: string;
  password: string;
};

export type LoginT = {
  name: string;
  password: string;
};

export type TokenResponse = {
  token: string; // Adjust based on the actual API response structure
};

export type getUsersT = {
  company_id: string;
};

export type CreateUserParams = {
  name: string;
  description: string;
  company_id: string; // Use the _id from the company object
};

export type DeleteUserParams = {
  company_id: string; // Use the _id from the company object
  user_id: string; // Use the _id from the company object
};
export type UpdateUserParams = {
  company_id: string; // Use the _id from the company object
  user_id: string; // Use the _id from the company object
  params: {
    name: string;
    description: string;
  };
};

export type UserType = {
  _id: string;
  name: string;
  description: string;
  company_id: string;
  created_at: string;
  tripCount: number;
};

export type GetTripsT = {
  user_id: string;
  trip_id: string;
};

interface User {
  _id: string;
  name: string;
  description: string;
  company_id: string;
  created_at: string; // You may want to use Date if you convert it later
  __v: number;
}

export type Trips = {
  _id: string;
  step: string;
  number_trip: string;
  is_boat_rate: boolean;
  owner_arrow: number;
  fisher_arrow: number;
  other_arrow: number;
  dateTrip: string; // You may want to use Date if you convert it later
  rate_boat_price: number;
  check_nakodah: boolean;
  check_captain: boolean;
  nakodah: string;
  captain: string;
  nakodah_arrows: string; // If you expect it to be a number, change to number
  captain_arrows: string; // If you expect it to be a number, change to number
  expenses: ExpensesT[];
  fishing: FishingT[];
  user_id: User;
  __v: number;
};

export type DataTypeResponse = {
  data: {
    users?: UserType[];
    auth?: boolean;
    trips?: Trips[];
  };
  message: string;
  success: boolean;
};
