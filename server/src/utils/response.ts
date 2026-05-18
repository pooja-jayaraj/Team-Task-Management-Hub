import type { ApiErrorResponse, ApiSuccessResponse } from '../types.ts';

export const success = <T>(data: T): ApiSuccessResponse<T> => ({
  success: true,
  data
});

export const failure = (code: string, message: string, details?: unknown): ApiErrorResponse => ({
  success: false,
  error: {
    code,
    message,
    details
  }
});
