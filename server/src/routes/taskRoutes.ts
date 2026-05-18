import { Router } from 'express';
import { randomUUID } from 'node:crypto';

import { success } from '../utils/response.ts';
import { taskStore } from '../store/taskStore.ts';
import { taskSchema, idSchema } from '../schema/taskSchema.ts';
export const appRouter = Router();

const DELETE_HEADER_NAME = 'x-task-admin-token';
const DELETE_HEADER_SECRET = process.env.DELETE_TASK_TOKEN ?? 'team-task-secret';

// GET all tasks
appRouter.get('/tasks', (_req, res) => {
  console.log('Fetching all tasks');
  res.status(200).json(success(taskStore.getAll()));
});

// Create (POST) a new task
appRouter.post('/tasks', (req, res) => {
  const parseResult = taskSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      error: parseResult.error.issues[0].message
    });
  }
  const newTask = {
    id: randomUUID(),
    ...parseResult.data
  };

  taskStore.create(newTask);
  res.status(201).json(success(newTask));
});

// DELETE a task
appRouter.delete('/tasks/:id', (req, res) => {
  const headerValue = req.header(DELETE_HEADER_NAME);
    if (headerValue !== DELETE_HEADER_SECRET) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
        error: 'Delete operation requires a valid authorization header',
      });
    }
  const taskId = req.params.id;
  const tasks = taskStore.getAll();
  const taskIndex = tasks.findIndex(t => t.id === taskId);
  if (taskIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Task not found',
      error: null
    });
  }

  const parseResult = idSchema.safeParse({ id: taskId });
  if (!parseResult.success) {
    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      error: parseResult.error.issues[0].message
    });
  }

  taskStore.remove(taskId);
  res.status(200).json(success(taskId));
});
