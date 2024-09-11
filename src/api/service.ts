import useSWR, { mutate } from 'swr';
import { TodoType } from '@/types/todoType';
import { ENDPOINT } from '../utils/constants';
import { fetchAPI } from './fetchApi';

/*Fetch methods*/
export const fetchTodos = () => fetchAPI<TodoType[]>(ENDPOINT);
export const fetchTodoById = (id: string) => fetchAPI<TodoType>(`${ENDPOINT}/${id}`);

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

export function useTodo(id: string) {
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
      const createdTodo = await fetchAPI<TodoType>(ENDPOINT, {
        method: 'POST',
        body: JSON.stringify(newTodo),
      });

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

/*UPDATE ONE TODO*/
export const updateTodo = async (updatedTodo: TodoType): Promise<TodoType> => {
  const updateLocalTodos = (todos: TodoType[] = []) =>
    todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo));

  //UPDATE CACHE FOR TODOPAGE
  mutate(`${ENDPOINT}/${updatedTodo.id}`, updatedTodo, false);

  mutate(
    ENDPOINT,
    async (todos: TodoType[] = []) => {
      const updatedData = await fetchAPI<TodoType>(`${ENDPOINT}/${updatedTodo.id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedTodo),
      });

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
      await fetchAPI<void>(`${ENDPOINT}/${id}`, {
        method: 'DELETE',
      });

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
