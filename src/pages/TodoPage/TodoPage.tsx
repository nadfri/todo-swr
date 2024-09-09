import './TodoPage.scss';
import { Navigate, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { deleteTodo, updateTodo, useTodo } from '@/api/service';
import { formatDateByDistance } from '@/utils/formatDateByDistance';
import Loader from '@/components/Loader/Loader';
import BackBtn from '@/components/BackBtn/BackBtn';
import Circle from '@/components/Circle/Circle';
import AddNewTodo from '@/components/AddNewTodo/AddNewTodo';

export default function TodoPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { todo, error, isLoading } = useTodo(id!);

  if (isLoading) return <Loader />;

  if (error) {
    if (error.status === 404) return <Navigate to='/404' />;
    throw error;
  }

  if (!todo) return <Navigate to='/404' />;

  const handleCompleted = async () => {
    await updateTodo({
      ...todo,
      isCompleted: !todo.isCompleted,
      completedAt: !todo.isCompleted ? new Date() : null,
    });
  };

  const handleDelete = () => {
    deleteTodo(todo.id);
    navigate('/', { replace: true });
  };

  return (
    <div className='TodoPage'>
      <div>
        <h1 className={todo.isCompleted?  'completed' : ''}>
          <span>{todo.title}</span>
          <Circle isCompleted={todo.isCompleted} />
        </h1>

        <p className='content'>
          {todo.content ? todo.content : <i>No description...</i>}
        </p>

        {todo.isCompleted ? (
          <p className='date'>{formatDateByDistance(todo.completedAt!)}</p>
        ) : (
          <p className='date'>Still in progress...</p>
        )}
      </div>

      <div className='btn-container'>
        <button
          onClick={handleCompleted}
          className={todo.isCompleted ? 'btn btn-check completed' : 'btn btn-check'}>
          {todo.isCompleted ? 'UNDONE' : 'DONE'}
        </button>

        <button onClick={handleDelete} className='btn btn-delete'>
          DELETE
        </button>

        <BackBtn />
      </div>

      <AddNewTodo />
    </div>
  );
}
