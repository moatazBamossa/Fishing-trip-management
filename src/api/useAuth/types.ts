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

export type TokenResponse = {
  token: string; // Adjust based on the actual API response structure
};
