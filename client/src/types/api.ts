import type { AxiosError } from "axios";

interface ApiErrorResponse {
  success: boolean;
  message: string;
}

export type ApiError = AxiosError<ApiErrorResponse>;
