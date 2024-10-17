import { describe, it, expect, vi } from 'vitest';
import { formatDateByDistance } from './formatDateByDistance';
import i18n from '@/locales/i18n';

describe('formatDateByDistance', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should format date in English by default', async () => {
    await i18n.changeLanguage('en');
    const date = new Date();
    const result = formatDateByDistance(date);
    expect(result).toBe('less than a minute ago');
  });

  it('should format date in French if language is fr', async () => {
    await i18n.changeLanguage('fr');
    const date = new Date();
    const result = formatDateByDistance(date);
    expect(result).toBe('il y a moins d’une minute');
  });

  it('should format date correctly for a past date', async () => {
    await i18n.changeLanguage('en');
    const date = new Date(Date.now() - 1000 * 60 * 60); // 1 hour ago
    const result = formatDateByDistance(date);
    expect(result).toBe('about 1 hour ago');
  });

  it('should format date correctly for a future date', async () => {
    await i18n.changeLanguage('en');
    const date = new Date(Date.now() + 1000 * 60 * 60); // 1 hour in the future
    const result = formatDateByDistance(date);
    expect(result).toBe('in about 1 hour');
  });

  it('should format date in Arabic if language is ar', async () => {
    await i18n.changeLanguage('ar');
    const date = new Date();
    const result = formatDateByDistance(date);
    expect(result).toBe('منذ أقل من دقيقة');
  });

  it('should format date correctly for a date 1 day ago', async () => {
    await i18n.changeLanguage('en');
    const date = new Date(Date.now() - 1000 * 60 * 60 * 24); // 1 day ago
    const result = formatDateByDistance(date);
    expect(result).toBe('1 day ago');
  });

  it('should format date correctly for a date 1 week ago', async () => {
    await i18n.changeLanguage('en');
    const date = new Date(Date.now() - 1000 * 60 * 60 * 24 * 7); // 1 week ago
    const result = formatDateByDistance(date);
    expect(result).toBe('7 days ago');
  });

  it('should format date correctly for a date 1 month ago', async () => {
    await i18n.changeLanguage('en');
    const date = new Date(Date.now() - 1000 * 60 * 60 * 24 * 30); // 1 month ago
    const result = formatDateByDistance(date);
    expect(result).toBe('about 1 month ago');
  });

  it('should format date correctly for a date 1 year ago', async () => {
    await i18n.changeLanguage('en');
    const date = new Date(Date.now() - 1000 * 60 * 60 * 24 * 365); // 1 year ago
    const result = formatDateByDistance(date);
    expect(result).toBe('12 months ago');
  });
});
