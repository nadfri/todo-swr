export class APIError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'APIError';
  }
}

export async function fetchAPI<T>(url: string, options: RequestInit = {}): Promise<T> {
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

  const response = await fetch(url, mergedOptions);

  if (!response.ok) {
    throw new APIError(`HTTP error! status: ${response.status}`, response.status);
  }

  return response.json();
}
