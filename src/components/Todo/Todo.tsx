import './Todo.scss';
import { TodoType } from '@/types/todoType';
import { Link } from 'react-router-dom';
import CrossIcon from '../Icons/CrossIcon';
import { formatDateByDistance } from '@/utils/formatDateByDistance';
import { deleteTodo } from '@/utils/service';
import { useRef } from 'react';

type TodoProps = {
  todo: TodoType;
};

export default function Todo({ todo }: TodoProps) {
  const refLi = useRef<HTMLLIElement>(null);

  const handleDelete = () => {
    refLi.current?.classList.add('deleting');

    setTimeout(() => {
      deleteTodo(todo.id);
    }, 300);
  };

  return (
    <li className='Todo' ref={refLi}>
      <Link to={`/todos/${todo.id}`} className='todo-link'>
        <span>
          {todo.title} {todo.title}{' '}
        </span>

        {todo.completedAt && (
          <span className='todo-completed'>{formatDateByDistance(todo.completedAt)}</span>
        )}
      </Link>

      <button className='btn-delete' onClick={handleDelete}>
        <CrossIcon className='CrossIcon' />
      </button>
    </li>
  );
}
