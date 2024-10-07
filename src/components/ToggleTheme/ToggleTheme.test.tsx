import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import ToggleTheme from './ToggleTheme';

describe('ToggleTheme Component', () => {
  beforeEach(() => {
    localStorage.clear();
    document.body.removeAttribute('data-theme');
  });

  it('should render with initial theme from localStorage', () => {
    localStorage.setItem('theme', 'light');
    render(<ToggleTheme />);
    expect(document.body.getAttribute('data-theme')).toBe('light');
  });

  it('should toggle theme from dark to light', async () => {
    render(<ToggleTheme />);
    const button = screen.getByRole('button', { name: /toggle theme/i });
    expect(document.body.getAttribute('data-theme')).toBe('dark');

    await userEvent.click(button);
    expect(document.body.getAttribute('data-theme')).toBe('light');
    expect(localStorage.getItem('theme')).toBe('light');
  });

  it('should toggle theme from light to dark', async () => {
    localStorage.setItem('theme', 'light');
    render(<ToggleTheme />);
    const button = screen.getByRole('button', { name: /toggle theme/i });
    expect(document.body.getAttribute('data-theme')).toBe('light');

    await userEvent.click(button);
    expect(document.body.getAttribute('data-theme')).toBe('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  it('should display SunIcon when theme is dark', () => {
    render(<ToggleTheme />);
    expect(screen.getByRole('button').firstChild).toHaveClass('SunIcon');
  });

  it('should display MoonIcon when theme is light', async () => {
    localStorage.setItem('theme', 'light');
    render(<ToggleTheme />);
    expect(screen.getByRole('button').firstChild).toHaveClass('MoonIcon');
  });
});
