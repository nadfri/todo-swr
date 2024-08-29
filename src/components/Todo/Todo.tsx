import './Todo.scss';
import { TodoType } from '@/types/todoType';
import { Link } from 'react-router-dom';

type TodoProps = {
  todo: TodoType;
};

export default function Todo({ todo }: TodoProps) {
  const formatDate = (dateString: Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    });
  };

  return (
    <li className='Todo'>
      <Link to={`/todos/${todo.id}`}>
      {todo.title} {todo.completedAt && `fait le ${formatDate(todo.completedAt)}`}
      </Link>
    </li>
  );
}