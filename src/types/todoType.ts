export type TodoType = {
  id: string;
  title: string;
  content: string;
  completed: boolean;
  completedAt: Date | null;
  createdAt: Date;
};