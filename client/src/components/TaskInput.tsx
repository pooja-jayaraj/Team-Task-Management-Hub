import React, { useState, useMemo } from 'react';
import { ZodError } from 'zod';

import { taskSchema } from '../schema/taskSchema';
import { useTaskStore } from '../store/TaskStore';

type CreateTaskClientInput = {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'done';
};

const initialForm: CreateTaskClientInput = {
  title: '',
  description: '',
  priority: 'medium',
  status: 'todo'
};

const TaskInput: React.FC = () => {
  const createTask = useTaskStore((state) => state.createTask);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [form, setForm] = useState<CreateTaskClientInput>(initialForm);

  const isSubmitDisabled = useMemo(() => form.title.trim().length === 0, [form.title]);

  const handleFieldChange = <K extends keyof CreateTaskClientInput>(field: K, value: CreateTaskClientInput[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    try {
      const payload = taskSchema.parse(form);
      console.log('Validated payload:', payload);
      await createTask(payload);
      setForm(initialForm);
    } catch (error) {
      if (error instanceof ZodError) {
        setErrorMessage(error.issues[0]?.message ?? 'Invalid input');
        return;
      }
      const message = error instanceof Error ? error.message : 'Failed to create task';
      setErrorMessage(message);
    }
  };

  return (
    <section className="panel">
      <h2 className="panel-title">Create Task</h2>

      <form className="task-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            value={form.title}
            onChange={(event) => handleFieldChange('title', event.target.value)}
            placeholder="Plan sprint demo"
            maxLength={120}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={form.description}
            onChange={(event) => handleFieldChange('description', event.target.value)}
            placeholder="Include stakeholders and QA handoff notes"
            maxLength={1000}
            rows={3}
          />
        </div>

        <div className="grid-two">
          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              value={form.priority}
              onChange={(event) => handleFieldChange('priority', event.target.value as CreateTaskClientInput['priority'])}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={form.status}
              onChange={(event) => handleFieldChange('status', event.target.value as CreateTaskClientInput['status'])}
            >
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
        </div>

        {errorMessage ? <p className="error-banner">{errorMessage}</p> : null}

        <button type="submit" disabled={isSubmitDisabled}>
          Add Task
        </button>
      </form>
    </section>
  );
};

export default TaskInput;