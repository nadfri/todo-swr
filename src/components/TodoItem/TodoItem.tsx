import './TodoItem.scss';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import CrossIcon from '../Icons/CrossIcon';
import CheckBox from '../CheckBox/CheckBox';
import { TodoType } from '@/types/todoType';
import { deleteTodo, updateTodo } from '@/api/service';
import DateCompleted from '../DateCompleted/DateCompleted';
import DragIcon from '../Icons/DragIcon';
import { useTranslation } from 'react-i18next';

type TodoItemProps = React.ComponentPropsWithoutRef<'li'> & {
  todo: TodoType;
  selectedDraggedTodo: (todo: TodoType | null) => void;
  selectedDragOverTodo: (todo: TodoType | null) => void;
  onDrop: () => void;
};

export default function TodoItem({
  todo,
  selectedDraggedTodo,
  selectedDragOverTodo,
  onDrop,
  ...rest
}: TodoItemProps) {
  const { t } = useTranslation();
  const refLi = useRef<HTMLLIElement>(null);

  const handleCompleted = async () => {
    updateTodo({
      ...todo,
      isCompleted: !todo.isCompleted,
      completedAt: !todo.isCompleted ? new Date().toISOString() : null,
    });
  };

  const handleDelete = () => {
    refLi.current?.classList.add('slide-out');

    setTimeout(() => {
      deleteTodo(todo.id);
    }, 300);
  };

  /* Handle Drag and Drop */
  const handleDragStart = () => {
    refLi.current?.classList.add('dragging');
    selectedDraggedTodo(todo);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();
    selectedDragOverTodo(todo);
  };

  const handleDragEnter = () => {
    if (!refLi.current?.classList.contains('dragging'))
      refLi.current?.classList.add('drag-over');
  };

  const handleDragLeave = () => {
    refLi.current?.classList.remove('drag-over');
  };

  const handleDragEnd = () => {
    refLi.current?.classList.remove('dragging');
  };

  const handleDrop = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();
    refLi.current?.classList.remove('drag-over');
    onDrop();
  };

  return (
    <li
      {...rest}
      className="TodoItem"
      ref={refLi}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragEnd={handleDragEnd}
      onDrop={handleDrop}
      draggable
    >
      <DragIcon className="DragIcon" />
      <Link to={`/todos/${todo.id}`} className="todo-link" draggable={false}>
        <span
          className={todo.isCompleted ? 'todo-title completed' : 'todo-title'}
        >
          {todo.title}{' '}
        </span>

        <DateCompleted todo={todo} />
      </Link>

      <div className="todo-actions">
        <CheckBox checked={todo.isCompleted} onChange={handleCompleted} />
        <button
          className="btn-delete"
          onClick={handleDelete}
          aria-label={t('aria-delete')}
        >
          <CrossIcon className="CrossIcon" />
        </button>
      </div>
    </li>
  );
}
