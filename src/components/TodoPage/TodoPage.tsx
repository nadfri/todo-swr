import './TodoPage.scss';
import { Navigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useTodo } from '@/utils/service';

export default function TodoPage() {
  const { id } = useParams();

  const { todo, error, isLoading } = useTodo(id);

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
