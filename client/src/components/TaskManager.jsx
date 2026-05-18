import React, { useState, useEffect, useMemo } from 'react';
import TaskInput from './taskInput';
import TaskList from './taskList';
import { useTaskStore } from '../store/TaskStore';

const TaskManager = () => {
  const {
    tasks,
    isLoading,
    errorMessage,
    fetchTasks,
    deleteTask,
  } = useTaskStore();

  const [localTasks, setLocalTasks] = useState(tasks);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    void fetchTasks();
  }, [fetchTasks]);

  const viewTasks = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return tasks.filter(task => task.title.toLowerCase().includes(query));
  }, [tasks, searchQuery]);

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h1>My Tasks</h1>
      <TaskInput />
      {isLoading ? <p className="status">Working...</p> : null}
      {errorMessage ? <p className="error-banner">{errorMessage}</p> : null}
      <input
        type="text"
        placeholder="Search tasks by title..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <TaskList 
        tasks={viewTasks} 
        onDelete={deleteTask} 
      />
    </div>
  );
};

export default TaskManager;
