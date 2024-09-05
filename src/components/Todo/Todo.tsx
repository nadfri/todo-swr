import './Todo.scss';
import { TodoType } from '@/types/todoType';
import { Link } from 'react-router-dom';
import CrossIcon from '../Icons/CrossIcon';
import { formatDateByDistance } from '@/utils/formatDateByDistance';
import { deleteTodo, updateTodo } from '@/api/service';
import { useRef } from 'react';
import CheckBox from '../CheckBox/CheckBox';

export default function Todo({ todo }: { todo: TodoType }) {
  const refLi = useRef<HTMLLIElement>(null);

  const handleCompleted = async () => {
    const newIsCompleted = !todo.isCompleted;
    const newCompletedAt = newIsCompleted ? new Date() : null;

    updateTodo({
      ...todo,
      isCompleted: newIsCompleted,
      completedAt: newCompletedAt,
    });
  };

  const handleDelete = () => {
    refLi.current?.classList.add('slide-out');

    setTimeout(() => {
      deleteTodo(todo.id);
    }, 300);
  };

  return (
    <li className='Todo' ref={refLi}>
      <Link to={`/todos/${todo.id}`} className='todo-link'>
        <span className={todo.isCompleted ? 'todo-title completed' : 'todo-title'}>
          {todo.title} {todo.title}{' '}
        </span>

        {todo.completedAt && (
          <span className='todo-date'>
            {formatDateByDistance(new Date(todo.completedAt))}
          </span>
        )}
      </Link>

      <div className='todo-actions'>
        <CheckBox checked={todo.isCompleted} onChange={handleCompleted} />
        <button className='btn-delete' onClick={handleDelete}>
          <CrossIcon className='CrossIcon' />
        </button>
      </div>
    </li>
  );
}
