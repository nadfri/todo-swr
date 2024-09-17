import { ZodError, ZodSchema } from 'zod';

export class APIError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'APIError';
  }
}

export async function fetchAPI<T>(
  url: string,
  options: RequestInit = {},
  schema?: ZodSchema<T>
): Promise<T> {
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const mergedOptions = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers || {}),
    },
  };

  try {
    const response = await fetch(url, mergedOptions);

    if (!response.ok) {
      throw new APIError(`HTTP error! status: ${response.status}`, response.status);
    }

    const data = await response.json();

    if (schema) {
      try {
        return schema.parse(data);
      } catch (error) {
        if (error instanceof ZodError) {
          console.error('Zod validation error:', error.errors);
          throw new APIError('Data validation failed');
        }
        throw error;
      }
    }

    return data as T;
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    } else {
      console.error('Unexpected error:', error);
      throw new APIError('An unexpected error occurred');
    }
  }
}