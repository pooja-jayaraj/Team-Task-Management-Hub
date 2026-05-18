import type { ApiResponse } from '../types/task';

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: unknown;
  headers?: Record<string, string>;
}

export const request = async <T>(url: string, options: RequestOptions = {}): Promise<T> => {
  const response = await fetch(url, {
    method: options.method ?? 'GET',
    headers: { 'Content-Type': 'application/json', ...(options.headers ?? {}) },
    body: options.body ? JSON.stringify(options.body) : undefined
  });

  const payload = (await response.json()) as ApiResponse<T>;

  if (!response.ok || !payload.success) {
    const message = payload.success ? 'Request failed' : payload.error.message;
    throw new Error(message);
  }

  return payload.data;
};
