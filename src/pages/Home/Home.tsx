import './Home.scss';
import Loader from '@/components/Loader/Loader';
import { useTodos } from '@/api/service';
import AddNewTodo from '@/components/AddNewTodo/AddNewTodo';
import { useTranslation } from 'react-i18next';
import TodoList from '@/components/TodoList/TodoList';

export default function Home() {
  const { t } = useTranslation();
  const { todos, error, isLoading } = useTodos();

  if (isLoading) return <Loader />;

  if (error) throw error;

  if (!todos)
    return (
      <div className="Home">
        <h1>{t('no-todo')}</h1>
      </div>
    );

  return (
    <div className="Home">
      <AddNewTodo />

      <TodoList todos={todos} />
    </div>
  );
}
