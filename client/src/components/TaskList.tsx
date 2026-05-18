import type { Task } from '../types/task';
import { TaskItem } from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: string) => Promise<void>;
}
export const TaskList = ({ tasks, onDelete }: TaskListProps) => {
  if (tasks.length === 0) return <p>No tasks yet!</p>;

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} onDelete={onDelete} />
      ))}
    </ul>
  );
};

export default TaskList;
