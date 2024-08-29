import './Todos.scss';
import { TodoType } from '@/types/todoType';
import Todo from '../Todo/Todo';
import { useTodos } from '@/utils/service';

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
      <h1>Todos</h1>

      <ul>
        {todos.map((todo: TodoType) => (
          <Todo todo={todo} key={todo.id} />
        ))}
      </ul>
    </div>
  );
}
