import './AddNewTodo.scss';
import { TodoType } from '@/types/todoType';
import { createTodo } from '@/api/service';
import CrossIcon from '../Icons/CrossIcon';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddNewTodo({ redirectToHome }: { redirectToHome?: boolean }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const titleTodo = formData.get('title-input');
    const contentTodo = formData.get('title-content');

    if (!titleTodo) return;

    const newTodo: Omit<TodoType, 'id' | 'order'> = {
      //id generated by the server
      title: titleTodo.toString().trim(),
      content: contentTodo ? contentTodo.toString().trim() : '',
      isCompleted: false,
      completedAt: null,
      createdAt: new Date(),
    };

    createTodo(newTodo);

    event.currentTarget.reset();
    inputRef.current?.blur();

    if (redirectToHome) navigate('/');
  };

  return (
    <form className='AddNewTodo' onSubmit={handleSubmit}>
      <div className='inputs'>
        <input
          className='input'
          name='title-input'
          type='text'
          placeholder='Title*'
          maxLength={80}
          autoComplete='off'
          required
          ref={inputRef}
        />
        <textarea
          className='textarea'
          name='title-content'
          rows={3}
          maxLength={200}
          placeholder='Description...'
        />
      </div>
      <button type='submit'>
        <CrossIcon className='CrossIcon' />
      </button>
    </form>
  );
}
