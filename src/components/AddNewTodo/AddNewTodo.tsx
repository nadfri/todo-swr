import './AddNewTodo.scss';
import { TodoType } from '@/types/todoType';
import { createTodo } from '@/utils/service';
import CrossIcon from '../Icons/CrossIcon';
import { v4 as uuidv4 } from 'uuid';

export default function AddNewTodo() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const titleTodo = formData.get('title-input');
    const contentTodo = formData.get('title-content');

    if (!titleTodo) return;

    const newTodo: TodoType = {
      id: uuidv4(),
      title: titleTodo.toString(),
      content: contentTodo ? contentTodo.toString() : '',
      completed: false,
      completedAt: null,
      createdAt: new Date(),
    };

    createTodo(newTodo);

    event.currentTarget.reset();
  };

  return (
    <form className='AddNewTodo' onSubmit={handleSubmit}>
      <div className='inputs'>
        <input
          name='title-input'
          type='text'
          placeholder='Title*'
          autoComplete='off'
          required
        />
        <textarea
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
