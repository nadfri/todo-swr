import './TodoPage.scss';
import { Navigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useTodo } from '@/api/service';
import { formatDateByDistance } from '@/utils/formatDateByDistance';

export default function TodoPage() {
  const { id } = useParams();

  const { todo, error, isLoading } = useTodo(id);

  if (isLoading) return <div>Loading...</div>;

  if (error) throw error;

  if (!todo) return <Navigate to='/404' />;

  return (
    <div className='TodoPage'>
      <h1>{todo.title}</h1>
      <p>{todo.content}</p>
      <p>{todo.isCompleted? `Fait ${todo.completedAt && formatDateByDistance(todo.completedAt)}`: 'Non Fait'}</p>
    </div>
  );
}
