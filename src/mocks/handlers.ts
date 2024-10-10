import { TodoType } from '@/types/todoType';
import { ENDPOINT } from '@/utils/constants';

import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get(ENDPOINT, () => {
    return HttpResponse.json([
      {
        id: '1',
        order: 1,
        title: 'Title Test',
        content: 'Content Test',
        isCompleted: true,
        completedAt: '2024-09-12T18:33:33.250Z',
        createdAt: '2021-01-01T10:00:00.000Z',
      },
    ]);
  }),

  http.get(`${ENDPOINT}/:id`, ({ params }) => {
    console.log('params', params);
    if (params.id === '2') {
      return HttpResponse.json({ message: 'Todo not found' }, { status: 404 });
    }

    return HttpResponse.json({
      id: '1',
      order: 1,
      title: 'Title Test',
      content: 'Content Test',
      isCompleted: false,
      completedAt: null,
      createdAt: '2021-01-01T10:00:00.000Z',
    });
  }),

  http.post(ENDPOINT, async ({ request }) => {
    const newTodo = (await request.json()) as TodoType;

    if (!newTodo) {
      return HttpResponse.json({ message: 'Error' }, { status: 400 });
    }

    newTodo.id = '2';
    newTodo.order = 2;

    return HttpResponse.json(newTodo, { status: 201 });
  }),

  http.put(`${ENDPOINT}/:id`, () => {
    return HttpResponse.json({
      id: '1',
      order: 1,
      title: 'Updated Title',
      content: 'Updated Content',
      isCompleted: true,
      completedAt: null,
      createdAt: '2021-01-01T10:00:00.000Z',
    });
  }),

  http.delete(`${ENDPOINT}/:id`, () => {
    return HttpResponse.json({
      id: '2',
      order: 2,
      title: 'Delete Test',
      content: '',
      isCompleted: false,
      completedAt: null,
      createdAt: '2021-01-01T10:00:00.000Z',
    });
  }),
];
