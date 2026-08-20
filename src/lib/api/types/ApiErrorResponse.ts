export interface ApiFieldError {
  field: string;
  code: string;
  message: string;
}

export interface ApiErrorResponse {
  status: number;
  code: string;
  message: string;
  errors: ApiFieldError[];
  timestamp: string;
}
