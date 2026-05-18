import { z } from 'zod';

export const taskPrioritySchema = z.enum(['low', 'medium', 'high']);
export const taskStatusSchema = z.enum(['todo', 'in-progress', 'done']);

// Task schema for validation
export const taskSchema = z.object({
  title: z.string().min(2).max(100),
  description: z.string().max(500),
  priority: taskPrioritySchema,
  status: taskStatusSchema
});
