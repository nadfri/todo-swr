import useSWR from 'swr';
import './Todos.scss';
import { TodoType } from '@/types/todoType';
import Todo from '../Todo/Todo';

export default function Todos() {
  const endpoint = 'http://localhost:3000/todos';

  const fetcher = (url: string): Promise<TodoType[]> =>
    fetch(url).then((res) => res.json());

  const { data: todos, error, isLoading } = useSWR<TodoType[]>(endpoint, fetcher);

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error loading todos</div>;

  if (!todos) return <div>No todos found</div>;

  return (
    <div className='Todos'>
      <h1>Todos</h1>

      <ul>
        {todos.map((todo: TodoType) => (
          <Todo todo={todo} key={todo.id}/>
        ))}
      </ul>
    </div>
  );
}
