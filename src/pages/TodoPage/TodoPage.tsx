import './TodoPage.scss';
import { Navigate, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { deleteTodo, updateTodo, useTodo } from '@/api/service';
import { formatDateByDistance } from '@/utils/formatDateByDistance';
import Loader from '@/components/Loader/Loader';
import BackBtn from '@/components/BackBtn/BackBtn';
import Circle from '@/components/Circle/Circle';
import AddNewTodo from '@/components/AddNewTodo/AddNewTodo';
import { useRef, useState } from 'react';
import EditIcon from '@/components/Icons/EditIcon';

export default function TodoPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { todo, error, isLoading } = useTodo(id!);
  const [isEditing, setIsEditing] = useState(false);

  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  if (isLoading) return <Loader />;

  if (error) {
    if (error.status === 404) return <Navigate to='/404' />;
    throw error;
  }

  if (!todo) return <Navigate to='/404' />;

  const handleCompleted = async () => {
    await updateTodo({
      ...todo,
      isCompleted: !todo.isCompleted,
      completedAt: !todo.isCompleted ? new Date() : null,
    });
  };

  const handleUpdate = async () => {
    const updatedTitle = titleRef.current?.value.trim();
    const updatedContent = contentRef.current?.value.trim() || '';

    if (!updatedTitle) {
      titleRef.current?.focus();
      return;
    }

    if (updatedTitle !== todo.title || updatedContent !== todo.content) {
      await updateTodo({
        ...todo,
        title: updatedTitle,
        content: updatedContent,
      });
    }

    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteTodo(todo.id);
    navigate('/', { replace: true });
  };

  return (
    <div className='TodoPage'>
      <div>
        <h1>
          <input
            name='title'
            className={
              todo.isCompleted ? 'input title-input completed' : 'input title-input'
            }
            type='text'
            defaultValue={todo.title}
            placeholder='Title*'
            readOnly={!isEditing}
            ref={titleRef}
            onFocus={() => setIsEditing(true)}
            onBlur={handleUpdate}
            title='Cick to edit'
            required
          />
          <Circle isCompleted={todo.isCompleted} />
        </h1>

        <textarea
          className='textarea'
          name='content'
          defaultValue={todo.content}
          readOnly={!isEditing}
          rows={3}
          maxLength={200}
          placeholder='No Description...'
          ref={contentRef}
          onFocus={() => setIsEditing(true)}
          onBlur={handleUpdate}
          title='Cick to edit'
        />

        {todo.isCompleted ? (
          <p className='date'>{formatDateByDistance(todo.completedAt!)}</p>
        ) : (
          <p className='date'>Still in progress...</p>
        )}
      </div>

      <div className='btn-container'>
        {isEditing && (
          <button onClick={handleUpdate} className='btn btn-save fade-in'>
            SAVE <EditIcon />
          </button>
        )}

        <button
          onClick={handleCompleted}
          className={todo.isCompleted ? 'btn btn-check completed' : 'btn btn-check'}>
          {todo.isCompleted ? 'UNDONE' : 'DONE'}
        </button>

        <button onClick={handleDelete} className='btn btn-delete'>
          DELETE
        </button>

        <BackBtn />
      </div>

      <AddNewTodo redirectToHome />
    </div>
  );
}
