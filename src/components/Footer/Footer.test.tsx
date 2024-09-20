import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import { describe, it, expect } from 'vitest';

describe('Footer Component', () => {
  it('should render the footer', () => {
    render(<Footer />);
    const linkElement = screen.getByText(/NadfriJS @2024/i);
    expect(linkElement).toBeInTheDocument();
  });
});
