import './Home.scss';
import Todo from '@/components/Todo/Todo';
import { TodoType } from '@/types/todoType';
import { useTodos } from '@/api/service';
import AddNewTodo from '@/components/AddNewTodo/AddNewTodo';
import Loader from '@/components/Loader/Loader';

export default function Home() {
  const { todos, error, isLoading } = useTodos();

  if (isLoading) return <Loader />;

  if (error) throw error;

  if (!todos)
    return (
      <div className='Home'>
        <h1>No todo today...</h1>
      </div>
    );

  return (
    <div className='Home'>
      <AddNewTodo />

      <ul className='todos-list'>
        {todos.map((todo: TodoType) => (
          <Todo todo={todo} key={todo.id} />
        ))}
      </ul>
    </div>
  );
}