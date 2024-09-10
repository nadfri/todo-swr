import './DateCompleted.scss';
import { TodoType } from '@/types/todoType';
import { formatDateByDistance } from '@/utils/formatDateByDistance';

export default function DateCompleted({ todo }: { todo: TodoType }) {
  return (
    <span className='DateCompleted'>
      {todo.isCompleted
        ? formatDateByDistance(todo.completedAt!)
        : 'Still in progress...'}
    </span>
  );
}
