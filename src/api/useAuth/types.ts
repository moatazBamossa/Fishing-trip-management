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
};

export type DataTypeResponse = {
  data: {
    users?: UserType[];
    auth?: boolean;
  };
  message: string;
  success: boolean;
};
