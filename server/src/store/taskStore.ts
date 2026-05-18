import type { Task } from '../types.ts';
import { randomUUID } from 'node:crypto';


interface CreateTaskInput {
  id: string;
  title: string;
  description: string;
  priority: Task['priority'];
  status: Task['status'];
}

let tasks: Task[] = [
  {
    id: randomUUID(),
    title: 'Welcome to daily standup',
    description: 'Summarize blockers and progress for today.',
    priority: 'medium',
    status: 'todo',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: randomUUID(),
    title: 'Review pull requests',
    description: 'Review API changes and provide feedback.',
    priority: 'high',
    status: 'in-progress',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export const taskStore = {
  getAll: () => [...tasks],
  getById: (id: string) => tasks.find((task) => task.id === id),
  create: (input: CreateTaskInput) => {
    const newTask: Task = {
      id: input.id,
      title: input.title,
      description: input.description,
      priority: input.priority,
      status: input.status,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    tasks = [newTask, ...tasks];
    return newTask;
  },
  remove: (id: string) => {
    const existingLength = tasks.length;
    tasks = tasks.filter((task) => task.id !== id);
    return tasks.length < existingLength;
  }
};
