import './TodoList.scss';
import { useRef } from 'react';
import { TodoType } from '@/types/todoType';
import TodoItem from '../TodoItem/TodoItem';
import { updateOrderTodos } from '@/api/service';

export default function TodoList({ todos }: { todos: TodoType[] }) {
  const draggedTodoRef = useRef<TodoType | null>(null);
  const dragOverTodoRef = useRef<TodoType | null>(null);

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
    <ul className="TodoList">
      {todos.map((todo: TodoType) => (
        <TodoItem
          todo={todo}
          key={todo.id}
          selectedDraggedTodo={(todo) => selectedDraggedTodo(todo)}
          selectedDragOverTodo={(todo) => selectedDragOverTodo(todo)}
          onDrop={onDrop}
          draggable
        />
      ))}
    </ul>
  );
}
