export class APIError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'APIError';
  }
}

export async function fetchAPI<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new APIError(`HTTP error! status: ${response.status}`, response.status);
  }
  return response.json();
}