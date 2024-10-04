import { describe, it, expect, vi } from 'vitest';
import { formatDateByDistance } from './formatDateByDistance';

describe('formatDateByDistance', () => {
  it('should format date in English by default', () => {
    const date = new Date();
    const spy = vi.spyOn(navigator, 'language', 'get').mockReturnValue('en-US');

    const result = formatDateByDistance(date);
    expect(result).toBe('less than a minute');
    spy.mockRestore();
  });

  it('should format date in French if language is fr', () => {
    const date = new Date();
    const spy = vi.spyOn(navigator, 'language', 'get').mockReturnValue('fr-FR');

    const result = formatDateByDistance(date);
    expect(result).toBe("moins d’une minute");
    spy.mockRestore();
  });

  it('should format date correctly for a past date', () => {
    const date = new Date(Date.now() - 1000 * 60 * 60); // 1 hour ago
    const spy = vi.spyOn(navigator, 'language', 'get').mockReturnValue('en-US');

    const result = formatDateByDistance(date);
    expect(result).toBe('about 1 hour');
    spy.mockRestore();
  });

  it('should format date correctly for a future date', () => {
    const date = new Date(Date.now() + 1000 * 60 * 60); // 1 hour in the future
    const spy = vi.spyOn(navigator, 'language', 'get').mockReturnValue('en-US');
    const result = formatDateByDistance(date);
    expect(result).toBe('about 1 hour');
    spy.mockRestore();
  });
});
