import './Home.scss';
import { useRef } from 'react';
import Todo from '@/components/Todo/Todo';
import { TodoType } from '@/types/todoType';
import Loader from '@/components/Loader/Loader';
import { updateOrderTodos, useTodos } from '@/api/service';
import AddNewTodo from '@/components/AddNewTodo/AddNewTodo';

export default function Home() {
  const { todos, error, isLoading } = useTodos();

  const draggedTodoRef = useRef<TodoType | null>(null);
  const dragOverTodoRef = useRef<TodoType | null>(null);

  if (isLoading) return <Loader />;

  if (error) throw error;

  if (!todos)
    return (
      <div className="Home">
        <h1>No todo today...</h1>
      </div>
    );

  const onDrop = () => {
    const draggedTodo = draggedTodoRef.current;
    const dragOverTodo = dragOverTodoRef.current;

    if (!draggedTodo || !dragOverTodo) return;

    updateOrderTodos(draggedTodo, dragOverTodo);

    draggedTodoRef.current = null;
    dragOverTodoRef.current = null;
  };

  const selectedDraggedTodo = (todo: TodoType | null) =>
    (draggedTodoRef.current = todo);
  const selectedDragOverTodo = (todo: TodoType | null) =>
    (dragOverTodoRef.current = todo);

  return (
    <div className="Home">
      <AddNewTodo />

      <ul className="todos-list">
        {todos.map((todo: TodoType) => (
          <Todo
            todo={todo}
            key={todo.id}
            selectedDraggedTodo={(todo) => selectedDraggedTodo(todo)}
            selectedDragOverTodo={(todo) => selectedDragOverTodo(todo)}
            onDrop={onDrop}
            draggable
          />
        ))}
      </ul>
    </div>
  );
}
