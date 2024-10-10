import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import userEvent from '@testing-library/user-event';

describe('Simplest Test True', () => {
  it('true is true', () => {
    expect(true).toBe(true);
  });
});

describe('Home Page usecases', () => {
  const renderComponent = () =>
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );

  it('should render the Home page by default', () => {
    renderComponent();

    expect(screen.getByRole('banner')).toBeInTheDocument(); //banner for header in aria
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument(); //contentinfo for footer in aria
  });

  it('should render input Title', async () => {
    renderComponent();

    const inputElement = await screen.findByPlaceholderText('Title*');
    expect(inputElement).toBeInTheDocument();
  });

  it('should create new Todo', async () => {
    const user = userEvent.setup();
    renderComponent();

    const titleInput = screen.getByPlaceholderText('Title*');
    const contentInput = screen.getByPlaceholderText('Description...');
    const submitButton = screen.getByRole('button', { name: /add new todo/i });

    const TITLE = 'Create Title Test';
    const CONTENT = 'Create Content Test';

    await user.type(titleInput, TITLE);
    await user.type(contentInput, CONTENT);

    await user.click(submitButton);

    expect(titleInput).toHaveValue('');
    expect(contentInput).toHaveValue('');

    expect(screen.getByText(TITLE)).toBeInTheDocument();
  });

  it('should render the notFound page for unknown routes', () => {
    render(
      <MemoryRouter initialEntries={['/unknow']}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
  });
});
