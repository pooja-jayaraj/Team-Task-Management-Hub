import type { CreateTaskPayload, Task } from '../types/task';
import { request } from './request';

const DELETE_HEADER_NAME = 'x-task-admin-token';
const DELETE_HEADER_VALUE = import.meta.env.VITE_DELETE_TASK_TOKEN ?? 'team-task-secret';


export const tasksApi = {
  getTasks: () => request<Task[]>('/api/tasks'),
  createTask: (payload: CreateTaskPayload) => {
    console.log('Creating task with payload:', payload);
    return request<Task>('/api/tasks', {
      method: 'POST',
      body: payload
    });
  },
  deleteTask: (id: string) =>
    request<{ id: string }>(`/api/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        [DELETE_HEADER_NAME]: DELETE_HEADER_VALUE
      }
    })
};
