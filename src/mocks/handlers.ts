import { ENDPOINT } from '@/utils/constants';

import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get(ENDPOINT, () => {
    return HttpResponse.json([
      {
        id: '1',
        order: 5,
        title: 'Faire les courses',
        content: 'Acheter du pain, du lait et des oeufs',
        isCompleted: true,
        completedAt: '2024-09-12T18:33:33.250Z',
        createdAt: '2021-01-01T10:00:00.000Z',
      },
    ]);
  }),
  http.get(`${ENDPOINT}/:id`, () => {
    return HttpResponse.json({
      id: '1',
      order: 5,
      title: 'Faire les courses',
      content: 'Acheter du pain, du lait et des oeufs',
      isCompleted: true,
      completedAt: '2024-09-12T18:33:33.250Z',
      createdAt: '2021-01-01T10:00:00.000Z',
    });
  }),
];