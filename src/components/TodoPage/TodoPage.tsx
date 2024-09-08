import './TodoPage.scss';
import { Navigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useTodo } from '@/api/service';
import { formatDateByDistance } from '@/utils/formatDateByDistance';
import Loader from '@/components/Loader/Loader';

export default function TodoPage() {
  const { id } = useParams();

  const { todo, error, isLoading } = useTodo(id!);

  if (isLoading) return <Loader />;

  if (error) {
    if (error.status === 404) return <Navigate to='/404' />;
    throw error;
  }

  if (!todo) return <Navigate to='/404' />;

  return (
    <div className='TodoPage'>
      <h1>{todo.title}</h1>
      <p>{todo.content}</p>
      <p>
        {todo.isCompleted
          ? `Fait ${todo.completedAt && formatDateByDistance(todo.completedAt)}`
          : 'Non Fait'}
      </p>
    </div>
  );
}
