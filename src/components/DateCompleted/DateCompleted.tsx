import './DateCompleted.scss';
import { TodoType } from '@/types/todoType';
import { formatDateByDistance } from '@/utils/formatDateByDistance';
import { useTranslation } from 'react-i18next';

export default function DateCompleted({ todo }: { todo: TodoType }) {
  const { t } = useTranslation();

  return (
    <span className="DateCompleted">
      {todo.isCompleted
        ? formatDateByDistance(new Date(todo.completedAt!))
        : t('inProgress')}
    </span>
  );
}
