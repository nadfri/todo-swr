import useSWR, { mutate } from 'swr';
import { TodoType } from '@/types/todoType';
import { ENDPOINT } from '../utils/constants';
import { fetchAPI } from './fetchApi';
import { swapTodosOrder } from '@/utils/swapTodosOrder';

const CONFIG_SWR = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  revalidateIfStale: false,
};

/*Fetch methods*/
export const fetchTodos = () => fetchAPI<TodoType[]>(ENDPOINT);

export const fetchTodoById = (id: string) => fetchAPI<TodoType>(`${ENDPOINT}/${id}`);

/*SWR hooks*/
export function useTodos() {
  const {
    data: todos,
    error,
    isLoading,
  } = useSWR<TodoType[]>(ENDPOINT, fetchTodos, CONFIG_SWR);

  todos?.sort((a, b) => a.order - b.order);

  return { todos, error, isLoading };
}

export function useTodo(id: string) {
  const {
    data: todo,
    error,
    isLoading,
  } = useSWR<TodoType | null>(`${ENDPOINT}/${id}`, () => fetchTodoById(id), CONFIG_SWR);

  return { todo, error, isLoading };
}

/*CREATE*/
export const createTodo = async (
  newTodo: Omit<TodoType, 'id' | 'order'>
): Promise<TodoType> => {
  // Optimistic UI update
  mutate(
    ENDPOINT,
    async (currentTodos: TodoType[] = []) => {
      const createdTodo = await fetchAPI<TodoType>(ENDPOINT, {
        method: 'POST',
        body: JSON.stringify({ ...newTodo, order: currentTodos.length + 1 }),
      });

      return [...currentTodos, createdTodo];
    },
    {
      optimisticData: (currentTodos: TodoType[] = []) => [
        ...currentTodos,
        { ...newTodo, id: crypto.randomUUID(), order: currentTodos.length + 1 },
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
    async (currentTodos: TodoType[] = []) => {
      const updatedData = await fetchAPI<TodoType>(`${ENDPOINT}/${updatedTodo.id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedTodo),
      });

      return currentTodos.map((todo) =>
        todo.id === updatedTodo.id ? updatedData : todo
      );
    },
    {
      optimisticData: updateLocalTodos,
      rollbackOnError: true,
      revalidate: false,
    }
  );

  return updatedTodo;
};

/*UPDATE TODOS ORDER*/
export const updateOrderTodos = async (
  todo1: TodoType,
  todo2: TodoType
): Promise<void> => {
  mutate(
    ENDPOINT,
    async (currentTodos: TodoType[] = []) => {
      const [updatedTodo1, updatedTodo2] = await Promise.all([
        fetchAPI<TodoType>(`${ENDPOINT}/${todo1.id}`, {
          method: 'PATCH',
          body: JSON.stringify({ order: todo2.order }),
        }),
        fetchAPI<TodoType>(`${ENDPOINT}/${todo2.id}`, {
          method: 'PATCH',
          body: JSON.stringify({ order: todo1.order }),
        }),
      ]);

      return swapTodosOrder(currentTodos, updatedTodo1.id, updatedTodo2.id);
    },
    {
      optimisticData: (currentTodos: TodoType[] = []) =>
        swapTodosOrder(currentTodos, todo1.id, todo2.id),
      rollbackOnError: true,
      revalidate: false,
    }
  );
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
