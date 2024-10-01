import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorPage from './ErrorPage';

describe('ErrorPage', () => {
  it('should render the error message when an error is passed', () => {
    const error = new Error('Test error message');
    render(
      <MemoryRouter>
        <ErrorBoundary FallbackComponent={ErrorPage}>
          <ErrorPage error={error} />
        </ErrorBoundary>
      </MemoryRouter>
    );

    expect(screen.getByText('Oops!')).toBeInTheDocument();

    expect(
      screen.getByText('Sorry, an unexpected error has occurred.')
    ).toBeInTheDocument();

    expect(screen.getByText('Test error message')).toBeInTheDocument();
  });

  it('should render "Page not found" when notFound is true', () => {
    render(
      <MemoryRouter>
        <ErrorBoundary FallbackComponent={ErrorPage}>
          <ErrorPage notFound={true} />
        </ErrorBoundary>
      </MemoryRouter>
    );

    expect(screen.getByText('Oops!')).toBeInTheDocument();

    expect(
      screen.getByText('Sorry, an unexpected error has occurred.')
    ).toBeInTheDocument();

    expect(screen.getByText('Page not found')).toBeInTheDocument();
  });

  it('should render the link to go back to the home page', () => {
    render(
      <MemoryRouter>
        <ErrorBoundary FallbackComponent={ErrorPage}>
          <ErrorPage />
        </ErrorBoundary>
      </MemoryRouter>
    );

    expect(screen.getByText('Go back to the home page')).toBeInTheDocument();

    expect(
      screen.getByRole('link', { name: 'Go back to the home page' })
    ).toHaveAttribute('href', '/');
  });
});
