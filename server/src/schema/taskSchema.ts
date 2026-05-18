import { z } from 'zod';
import { id } from 'zod/locales';

export const taskPrioritySchema = z.enum(['low', 'medium', 'high']);
export const taskStatusSchema = z.enum(['todo', 'in-progress', 'done']);
// In-memory task storage
let tasks: any[] = [];

// Task schema for validation
export const taskSchema = z.object({
  title: z.string().min(2).max(100),
  description: z.string().max(500),
  priority: taskPrioritySchema,
  status: taskStatusSchema
});

export const idSchema = z.object({
  id: z.string().trim().min(1, 'Task id is required')
});

