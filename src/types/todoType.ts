export type TodoType = {
  id: string;
  title: string;
  content: string;
  isCompleted: boolean;
  completedAt: Date | null;
  createdAt: Date;
};