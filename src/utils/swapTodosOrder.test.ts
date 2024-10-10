import { swapTodosOrder } from './swapTodosOrder';

const todos = [
  {
    id: '1',
    order: 1,
    title: 'Faire les courses',
    content: 'Acheter du pain, du lait et des oeufs',
    isCompleted: true,
    completedAt: '2024-09-12T18:33:33.250Z',
    createdAt: '2021-01-01T10:00:00.000Z',
  },
  {
    id: '2',
    order: 2,
    title: 'Lire un livre',
    content: "Lire le livre 'Clean Code' de Robert C. Martin",
    isCompleted: true,
    completedAt:
      'Tue Sep 17 2024 16:54:19 GMT+0200 (heure d’été d’Europe centrale)',
    createdAt: '2021-01-03T10:00:00.000Z',
  },
];

const todo1 = todos[0];
const todo2 = todos[1];

//test swapTodosOrder
describe('swapTodosOrder', () => {
  it('should swap todos order', () => {
    const newTodos = swapTodosOrder(todos, todo1.id, todo2.id);

    const newTodos1 = newTodos.find((todo) => todo.id === todo1.id);
    const newTodos2 = newTodos.find((todo) => todo.id === todo2.id);

    expect(newTodos1!.order).toBe(todo2.order);
    expect(newTodos2!.order).toBe(todo1.order);
  });

  it('should return a new array sorted', () => {
    const newTodos = swapTodosOrder(todos, todo1.id, todo2.id);

    const orders = newTodos.map((todo) => todo.order);

    expect(orders).toEqual([...orders].sort((a, b) => a - b));
  });

  it('should throw an error if one of the todos is not found', () => {
    const todo1 = todos[0];
    const todo2 = { ...todos[1], id: '4' };
    expect(() => swapTodosOrder(todos, todo1.id, todo2.id)).toThrow(
      'Error swapping todos order',
    );
  });
});
