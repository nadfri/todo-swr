import './TodoPage.scss';
import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Circle from '@/components/CircleLed/CircleLed';
import Loader from '@/components/Loader/Loader';
import BackBtn from '@/components/BackBtn/BackBtn';
import EditIcon from '@/components/Icons/EditIcon';
import { Navigate, useNavigate } from 'react-router-dom';
import AddNewTodo from '@/components/AddNewTodo/AddNewTodo';
import { deleteTodo, updateTodo, useTodo } from '@/api/service';
import DateCompleted from '@/components/DateCompleted/DateCompleted';
import { useTranslation } from 'react-i18next';

export default function TodoPage() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const { todo, error, isLoading } = useTodo(id!);
  const [isEditing, setIsEditing] = useState(false);

  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  if (isLoading) return <Loader />;

  if (error) {
    if (error.status === 404) return <Navigate to="/404" />;
    throw error;
  }

  if (!todo) return <Navigate to="/404" />;

  const handleCompleted = async () => {
    await updateTodo({
      ...todo,
      isCompleted: !todo.isCompleted,
      completedAt: !todo.isCompleted ? new Date().toISOString() : null,
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
    <div className="TodoPage slide-to-right">
      <div>
        <h1>
          <input
            name="title"
            className={
              todo.isCompleted ? 'input title-input completed' : 'input title-input'
            }
            type="text"
            maxLength={80}
            defaultValue={todo.title}
            placeholder={t('title-placeholder')}
            readOnly={!isEditing}
            ref={titleRef}
            onFocus={() => setIsEditing(true)}
            onBlur={handleUpdate}
            title={t('edit-title')}
            required
          />
          <Circle isCompleted={todo.isCompleted} />
        </h1>

        <textarea
          className="textarea"
          name="content"
          defaultValue={todo.content}
          readOnly={!isEditing}
          rows={3}
          maxLength={200}
          placeholder={t('no-description')}
          ref={contentRef}
          onFocus={() => setIsEditing(true)}
          onBlur={handleUpdate}
          title={t('edit-description')}
        />

        <DateCompleted todo={todo} />
      </div>

      <div className="btn-container">
        {isEditing && (
          <button onClick={handleUpdate} className="btn btn-save fade-in">
            {t('save')} <EditIcon />
          </button>
        )}

        <button
          onClick={handleCompleted}
          className={todo.isCompleted ? 'btn btn-check completed' : 'btn btn-check'}
        >
          {todo.isCompleted ? t('undone') : t('done')}
        </button>

        <button onClick={handleDelete} className="btn btn-delete">
          {t('delete')}
        </button>

        <BackBtn />
      </div>

      <AddNewTodo redirectToHome />
    </div>
  );
}
