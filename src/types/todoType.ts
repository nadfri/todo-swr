import { z } from 'zod';

export const TodoSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  isCompleted: z.boolean(),
  completedAt: z.string().nullable(),
  createdAt: z.string(),
  order: z.number(),
});

export type TodoType = z.infer<typeof TodoSchema>;

export const CreateTodoSchema = TodoSchema.omit({ id: true, order: true });

export type CreateTodoType = z.infer<typeof CreateTodoSchema>;
