import useSWR, { mutate } from 'swr';
import { TodoType } from '@/types/todoType';
import { ENDPOINT } from './constants';

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

/*CRUD methods*/
export const createTodo = async (newTodo: TodoType): Promise<TodoType> => {
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

  const createdTodo = await response.json();
  mutate(ENDPOINT); // Revalidation des données
  return createdTodo;
};

// Fonction pour mettre à jour un todo
export const updateTodo = async (updatedTodo: TodoType): Promise<TodoType> => {
  const response = await fetch(`${ENDPOINT}/${updatedTodo.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedTodo),
  });

  if (!response.ok) {
    throw new Error('Failed to update todo');
  }

  const updatedData = await response.json();
  mutate(`${ENDPOINT}/${updatedTodo.id}`); // Revalidation des données spécifiques
  mutate(ENDPOINT); // Revalidation de la liste complète
  return updatedData;
};

// Fonction pour supprimer un todo
export const deleteTodo = async (id: string): Promise<void> => {
  const response = await fetch(`${ENDPOINT}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete todo');
  }

  mutate(ENDPOINT); // Revalidation de la liste complète
};
