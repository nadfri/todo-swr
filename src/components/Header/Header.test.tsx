// Header.test.tsx
import { render, screen } from '@testing-library/react';
import Header from './Header';
import { MemoryRouter } from 'react-router-dom';

describe('Header', () => {
  it('should render the Header component correctly', () => {
    // Render the Header component wrapped in a router because Link component is used
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    const linkElement = screen.getByRole('link', { name: /todo with swr/i });
    expect(linkElement).toBeInTheDocument();
  });
});
