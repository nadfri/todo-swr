import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Todo from './Todo';
import { TodoType } from '@/types/todoType';
import userEvent from '@testing-library/user-event';
import App from '@/App';

const mockTodo: TodoType = {
  id: '1',
  title: 'Test Todo',
  content: 'Test Content',
  isCompleted: false,
  completedAt: null,
  createdAt: new Date().toISOString(),
  order: 1,
};

const mockSelectedDraggedTodo = vi.fn();
const mockSelectedDragOverTodo = vi.fn();
const mockOnDrop = vi.fn();

describe('Todo Component', () => {
  it('renders the todo item', () => {
    render(
      <MemoryRouter>
        <Todo
          todo={mockTodo}
          selectedDraggedTodo={mockSelectedDraggedTodo}
          selectedDragOverTodo={mockSelectedDragOverTodo}
          onDrop={mockOnDrop}
        />
      </MemoryRouter>,
    );

    expect(screen.getByText('Test Todo')).toBeInTheDocument();
  });

  it('calls updateTodo when checkbox is clicked', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const checkbox = await screen.findByRole('checkbox');
    await userEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  });

  it('calls deleteTodo when delete button is clicked', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const deleteButton = await screen.findByLabelText('delete todo');
    const inputTitle = await screen.findByText(/Updated Title/i);

    expect(inputTitle).toBeInTheDocument();

    await userEvent.click(deleteButton);
    await waitForElementToBeRemoved(inputTitle);
  });

  it('handles drag and drop events', () => {
    render(
      <MemoryRouter>
        <Todo
          todo={mockTodo}
          selectedDraggedTodo={mockSelectedDraggedTodo}
          selectedDragOverTodo={mockSelectedDragOverTodo}
          onDrop={mockOnDrop}
        />
      </MemoryRouter>,
    );

    const todoItem = screen.getByRole('listitem');

    fireEvent.dragStart(todoItem);
    expect(mockSelectedDraggedTodo).toHaveBeenCalledWith(mockTodo);

    fireEvent.dragOver(todoItem);
    expect(mockSelectedDragOverTodo).toHaveBeenCalledWith(mockTodo);

    fireEvent.dragEnter(todoItem);
    fireEvent.dragLeave(todoItem);
    fireEvent.dragEnd(todoItem);
    fireEvent.drop(todoItem);
    expect(mockOnDrop).toHaveBeenCalled();
  });
});
