import { tasksApi } from '../api/TaskApi';
import type { CreateTaskPayload, Task } from '../types/task';
import { create } from 'zustand'

interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  errorMessage: string | null;
  fetchTasks: () => Promise<void>;
  createTask: (payload: CreateTaskPayload) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}


const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Unknown error occurred';
};

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  isLoading: false,
  errorMessage: null,
  fetchTasks: async () => {
    set({ isLoading: true, errorMessage: null });

    try {
      const tasks = await tasksApi.getTasks();
      set({ tasks, isLoading: false });
    } catch (error) {
      set({ isLoading: false, errorMessage: getErrorMessage(error) });
    }
  },
  createTask: async (payload) => {
    set({ isLoading: true, errorMessage: null });

    try {
      const newTask = await tasksApi.createTask(payload);
      set((state) => ({ tasks: [newTask, ...state.tasks], isLoading: false }));
    } catch (error) {
      set({ isLoading: false, errorMessage: getErrorMessage(error) });
      throw error;
    }
  },
  deleteTask: async (id) => {
    set({ isLoading: true, errorMessage: null });

    try {
      await tasksApi.deleteTask(id);
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
        isLoading: false
      }));
    } catch (error) {
      set({ isLoading: false, errorMessage: getErrorMessage(error) });
      throw error;
    }
  },
}));
