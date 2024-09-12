import { TodoType } from '@/types/todoType';

export const swapTodosOrder = (todos: TodoType[], id1: string, id2: string) => {
  const newList = [...todos];
  const index1 = newList.findIndex((item) => item.id === id1);
  const index2 = newList.findIndex((item) => item.id === id2);

  if (index1 !== -1 && index2 !== -1) {
    const order1 = newList[index1].order;
    const order2 = newList[index2].order;

    newList[index1] = { ...newList[index1], order: order2 };
    newList[index2] = { ...newList[index2], order: order1 };

    return newList.sort((a, b) => a.order - b.order);
  }

  throw new Error('Error swapping todos order');
};
