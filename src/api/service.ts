import useSWR, { mutate } from 'swr';
import { TodoType } from '@/types/todoType';
import { ENDPOINT } from '../utils/constants';

/*Fetch methods*/
export const fetchTodos = async (): Promise<TodoType[]> => {
  const response = await fetch(ENDPOINT);
  if (!response.ok) {
    throw new Error('Failed to fetch todos');
  }
  return response.json();
};

export const fetchTodoById = async (id?: string): Promise<TodoType | null> => {
  if (!id) return null;

  const response = await fetch(`${ENDPOINT}/${id}`);
  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

/*SWR hooks*/
export function useTodos() {
  const {
    data: todos,
    error,
    isLoading,
  } = useSWR<TodoType[]>(ENDPOINT, fetchTodos, {
    revalidateIfStale: false,
  });

  return { todos, error, isLoading };
}

export function useTodo(id?: string) {
  const {
    data: todo,
    error,
    isLoading,
  } = useSWR<TodoType | null>(`${ENDPOINT}/${id}`, () => fetchTodoById(id), {
    revalidateIfStale: false,
  });

  return { todo, error, isLoading };
}

/*CREATE*/
export const createTodo = async (newTodo: Omit<TodoType, 'id'>): Promise<TodoType> => {
  // Optimistic UI update
  mutate(
    ENDPOINT,
    async (currentTodos: TodoType[] = []) => {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
      });

      if (!response.ok) {
        throw new Error('Failed to create todo');
      }

      const createdTodo = (await response.json()) as TodoType;

      return [...currentTodos, createdTodo];
    },
    {
      optimisticData: (currentTodos: TodoType[] = []) => [
        ...currentTodos,
        { ...newTodo, id: crypto.randomUUID() },
      ],
      rollbackOnError: true,
      revalidate: false,
    }
  );

  return newTodo as TodoType;
};

/*UPDATE*/
export const updateTodo = async (updatedTodo: TodoType): Promise<TodoType> => {
  const updateLocalTodos = (todos: TodoType[] = []) =>
    todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo));

  //UPDATE CACHE FOR TODOPAGE
  mutate(`${ENDPOINT}/${updatedTodo.id}`, updatedTodo, false);

  mutate(
    ENDPOINT,
    async (todos: TodoType[] = []) => {
      const response = await fetch(`${ENDPOINT}/${updatedTodo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodo),
      });

      if (!response.ok) throw new Error('Failed to update todo');

      const updatedData = await response.json();

      return todos.map((todo) => (todo.id === updatedTodo.id ? updatedData : todo));
    },
    {
      optimisticData: updateLocalTodos,
      rollbackOnError: true,
      revalidate: false,
    }
  );

  return updatedTodo;
};

/*DELETE*/
export const deleteTodo = async (id: string): Promise<void> => {
  const removeTodoFromList = (todos: TodoType[] = [], todoId: string) =>
    todos.filter((todo) => todo.id !== todoId);

  mutate(
    ENDPOINT,
    async (currentTodos: TodoType[] = []) => {
      const response = await fetch(`${ENDPOINT}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }

      return removeTodoFromList(currentTodos, id);
    },
    {
      optimisticData: (currentTodos: TodoType[] = []) =>
        removeTodoFromList(currentTodos, id),
      rollbackOnError: true,
      revalidate: false,
    }
  );
};
