import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchAPI, APIError } from './fetchAPI';
import { z } from 'zod';

describe('fetchAPI', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should fetch data successfully', async () => {
    const mockData = { id: 1, name: 'Test' };
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      } as Response),
    );

    const result = await fetchAPI('https://api.example.com/data');
    expect(result).toEqual(mockData);
  });

  it('should throw an APIError for HTTP errors', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      } as Response),
    );

    await expect(fetchAPI('https://api.example.com/data')).rejects.toThrow(
      APIError,
    );
  });

  it('should validate data with schema', async () => {
    const mockData = { id: 1, name: 'Test' };
    const schema = z.object({
      id: z.number(),
      name: z.string(),
    });

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      } as Response),
    );

    const result = await fetchAPI('https://api.example.com/data', {}, schema);
    expect(result).toEqual(mockData);
  });

  it('should throw an APIError for schema validation errors', async () => {
    const mockData = { id: '1', name: 'Test' }; // id should be a number
    const schema = z.object({
      id: z.number(),
      name: z.string(),
    });

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      } as Response),
    );

    await expect(
      fetchAPI('https://api.example.com/data', {}, schema),
    ).rejects.toThrow(APIError);
  });

  it('should throw an APIError for unexpected errors', async () => {
    global.fetch = vi.fn(() => Promise.reject(new Error('Network error')));

    await expect(fetchAPI('https://api.example.com/data')).rejects.toThrow(
      APIError,
    );
  });

  it('should merge headers correctly', async () => {
    const mockData = { id: 1, name: 'Test' };

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      } as Response),
    );

    const customHeaders = { Authorization: 'Bearer token' };

    await fetchAPI('https://api.example.com/data', { headers: customHeaders });

    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.example.com/data',
      expect.objectContaining({
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
          Authorization: 'Bearer token',
        }),
      }),
    );
  });
});
