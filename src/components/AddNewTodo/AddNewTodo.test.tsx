import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import AddNewTodo from './AddNewTodo';
import { createTodo } from '@/api/service';

describe('AddNewTodo component', () => {
  it('should submit the form and call createTodo', async () => {
    const user = userEvent.setup();

    vi.mock('@/api/service', () => ({
      createTodo: vi.fn(),
    }));

    render(
      <MemoryRouter>
        <AddNewTodo />
      </MemoryRouter>
    );

    const titleInput = screen.getByPlaceholderText('Title*');
    const contentInput = screen.getByPlaceholderText('Description...');
    const submitButton = screen.getByRole('button', { name: /add new todo/i });

    await user.type(titleInput, 'Test Todo');
    await user.type(contentInput, 'Test description');
    await user.click(submitButton);

    expect(createTodo).toHaveBeenCalledWith({
      title: 'Test Todo',
      content: 'Test description',
      isCompleted: false,
      completedAt: null,
      createdAt: expect.any(String),
    });

    expect(titleInput).toHaveValue('');
    expect(contentInput).toHaveValue('');
  });
});
