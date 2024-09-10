import './Todo.scss';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import CrossIcon from '../Icons/CrossIcon';
import CheckBox from '../CheckBox/CheckBox';
import { TodoType } from '@/types/todoType';
import { deleteTodo, updateTodo } from '@/api/service';
import DateCompleted from '../DateCompleted/DateCompleted';

export default function Todo({ todo }: { todo: TodoType }) {
  const refLi = useRef<HTMLLIElement>(null);

  const handleCompleted = async () => {
    updateTodo({
      ...todo,
      isCompleted: !todo.isCompleted,
      completedAt: !todo.isCompleted ? new Date() : null,
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
      <Link to={`/todos/${todo.id}`} className='todo-link' draggable={false}>
        <span className={todo.isCompleted ? 'todo-title completed' : 'todo-title'}>
          {todo.title}{' '}
        </span>

        <DateCompleted todo={todo} />
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
