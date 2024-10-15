import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TodoList from './TodoList';
import { TodoType } from '@/types/todoType';
import { MemoryRouter } from 'react-router-dom';

describe('TodoList', () => {
  const todos: TodoType[] = [
    {
      id: '1',
      order: 1,
      title: 'Title Test 1',
      content: 'Content Test',
      isCompleted: true,
      completedAt: '2024-09-12T18:33:33.250Z',
      createdAt: '2021-01-01T10:00:00.000Z',
    },
    {
      id: '2',
      order: 2,
      title: 'Title Test 2',
      content: 'Content Test 2',
      isCompleted: true,
      completedAt: '2024-09-12T18:33:33.250Z',
      createdAt: '2021-01-01T10:00:00.000Z',
    },
  ];

  const renderComponent = () =>
    render(
      <MemoryRouter>
        <TodoList todos={todos} />
      </MemoryRouter>,
    );

  it('renders the list of todos', () => {
    renderComponent();

    expect(screen.getByText('Title Test 1')).toBeInTheDocument();
    expect(screen.getByText('Title Test 2')).toBeInTheDocument();
  });
});
