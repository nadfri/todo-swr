import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import userEvent from '@testing-library/user-event';

describe('Simplest Test True', () => {
  it('true is true', () => {
    expect(true).toBe(true);
  });
});

describe('App', () => {
  it('should render the Home page by default', () => {
    // MemoryRouter to simulate Router in test
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByRole('banner')).toBeInTheDocument(); //banner for header in aria
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument(); //contentinfo for footer in aria
  });

  it('should render input Title', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    const inputElement = await screen.findByPlaceholderText('Title*');
    expect(inputElement).toBeInTheDocument();
  });

  it('should render the TodoPage when navigating to /todos/:id', async () => {
    render(
      <MemoryRouter initialEntries={['/todos/1']}>
        <App />
      </MemoryRouter>
    );

    const inputElements = await screen.findAllByPlaceholderText('Title*');
    expect(inputElements.length).toBe(2);
  });

  it('should render the notFound page for unknown routes', () => {
    render(
      <MemoryRouter initialEntries={['/unknown-route']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
  });

  //test create new todo
  it('should create new Todo', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    const titleInput = screen.getByPlaceholderText('Title*');
    const contentInput = screen.getByPlaceholderText('Description...');
    const submitButton = screen.getByRole('button', { name: /add new todo/i });

    await user.type(titleInput, 'Test Todo');
    await user.type(contentInput, 'Test description');
    await user.click(submitButton);

    expect(titleInput).toHaveValue('');
    expect(contentInput).toHaveValue('');
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
  });
});
