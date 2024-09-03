import './Todos.scss';
import Todo from '@/components/Todo/Todo';
import { TodoType } from '@/types/todoType';
import { useTodos } from '@/utils/service';
import AddNewTodo from '../AddNewTodo/AddNewTodo';

export default function Todos() {
  const { todos, error, isLoading } = useTodos();

  if (isLoading) return <div>Loading...</div>;

  if (error) throw error;

  if (!todos)
    return (
      <div className='Todos'>
        <h1>No todo today...</h1>
      </div>
    );

  return (
    <div className='Todos'>
      <ul className='todos-list'>
        {todos.map((todo: TodoType) => (
          <Todo todo={todo} key={todo.id} />
        ))}
      </ul>

      <AddNewTodo />
    </div>
  );
}
