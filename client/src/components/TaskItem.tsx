import type { Task } from '../types/task';

interface TaskItemProps {
  task: Task;
  onDelete: (id: string) => Promise<void>;
}

export const TaskItem = ({ task, onDelete }: TaskItemProps) => {
  return (
    <article className="task-card">
      <div className="task-card-header">
        <h3>{task.title}</h3>
        <span className={`pill pill-${task.priority}`}>{task.priority}</span>
      </div>

      <p className="description">{task.description || 'No description provided.'}</p>

      <div className="task-card-footer">
        <span className="pill pill-status">{task.status}</span>
        <button className="danger" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </article>
  );
};
