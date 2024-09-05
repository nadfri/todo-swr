import { useTodos } from '@/api/service';
import './CounterTask.scss';

export default function CounterTask() {
  const { todos } = useTodos();

  if (!todos) return null;

  const todosCompleted = todos.filter((todo) => todo.isCompleted).length;
  const totalTodos = todos.length;
  return (
    <div className='CounterTask'>
      <div className='countner-container'>
        <span className='counter-completed'>{todosCompleted}</span>
        <span className='counter-total'>/{totalTodos}</span>
      </div>

      <span className='counter-rest'>{totalTodos - todosCompleted}</span>
    </div>
  );
}
