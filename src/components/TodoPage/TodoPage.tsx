import './TodoPage.scss';
import { TodoType } from '@/types/todoType';
import useSWR from 'swr';
import { Navigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function TodoPage() {
  const { id } = useParams();

  const endpoint = 'http://localhost:3000/todos/' + id;

  const fetcher = async (url: string): Promise<TodoType | null> => {
    const res = await fetch(url);
    if (!res.ok) {
      if (res.status === 404) {
        return null;
      }
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  };

  const { data: todo, error, isLoading } = useSWR<TodoType | null>(endpoint, fetcher);

  if (isLoading) return <div>Loading...</div>;

  if (error) throw error;

  if (!todo) return <Navigate to='/404' />;

  return (
    <div className='TodoPage'>
      <h1>{todo.title}</h1>
      <div>{todo.content}</div>
    </div>
  );
}
