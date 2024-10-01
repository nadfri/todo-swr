import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from '@/App';

describe('TodoPage usecases', () => {
  const renderComponent = (id = '1') =>
    render(
      <MemoryRouter initialEntries={[`/todos/${id}`]}>
        <App />
      </MemoryRouter>
    );

  it('should render the TodoPage when navigating to /todos/:id', async () => {
    renderComponent();

    const inputElements = await screen.findAllByPlaceholderText('Title*');
    expect(inputElements.length).toBe(2);
  });

  it('should display the todo details', async () => {
    renderComponent();

    const titleInput = await screen.findByRole('textbox', {
      name: /Click to edit title/i,
    });
    const textArea = await screen.findByText(/Content Test/i);

    expect(titleInput).toHaveAttribute('readonly');
    expect(titleInput).toHaveValue('Title Test');
    expect(textArea).toBeInTheDocument();
  });

  it('should render the notFound page for unknown routes', async () => {
    renderComponent('2');

    expect(await screen.findByText(/page not found/i)).toBeInTheDocument();
  });

  it('should update the todo title', async () => {
    renderComponent();

    const titleInput = await screen.findByRole('textbox', {
      name: /Click to edit title/i,
    });

    expect(titleInput).toHaveAttribute('readonly');

    await userEvent.click(titleInput);

    expect(titleInput).not.toHaveAttribute('readonly');

    await userEvent.clear(titleInput);
    await userEvent.type(titleInput, 'Updated Title');

    expect(titleInput).toHaveValue('Updated Title');
  });

  it('should update the Content', async () => {
    renderComponent();

    const textArea = await screen.findByPlaceholderText(/no description/i);

    await userEvent.click(textArea);
    await userEvent.clear(textArea);
    await userEvent.type(textArea, 'Updated Content');

    expect(textArea).toHaveValue('Updated Content');
  });

  it('should mark the todo as completed', async () => {
    renderComponent();

    const doneButton = await screen.findByRole('button', {
      name: /done/i,
    });

    await userEvent.click(doneButton);

    const undoneButton = await screen.findByRole('button', {
      name: /undone/i,
    });

    expect(undoneButton).toBeInTheDocument();
  });

  it('should delete the todo and redirect to Home', async () => {
    renderComponent();

    const deleteButton = await screen.findByRole('button', {
      name: /delete/i,
    });

    expect(deleteButton).toBeInTheDocument();

    await userEvent.click(deleteButton);

    expect(deleteButton).not.toBeInTheDocument();
  });
});
