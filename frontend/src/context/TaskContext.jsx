import React, { createContext, useState, useEffect, useContext } from 'react';
import { 
  createTask, 
  getAllTasks, 
  updateTask, 
  deleteTask,
  getActivityLogs 
} from '../utils/api';
import { toast } from 'react-toastify';
import { AuthContext } from './AuthContext';

// Create context
export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [activityLogs, setActivityLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch tasks when user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchTasks();
      fetchActivityLogs();
    } else {
      setTasks([]);
      setActivityLogs([]);
    }
  }, [isAuthenticated]);

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const { tasks } = await getAllTasks();
      setTasks(tasks);
      setLoading(false);
    } catch (error) {
      setError(error.message || 'Failed to fetch tasks');
      setLoading(false);
      toast.error(error.message || 'Failed to fetch tasks');
    }
  };

  // Fetch activity logs
  const fetchActivityLogs = async () => {
    try {
      const { logs } = await getActivityLogs();
      setActivityLogs(logs);
    } catch (error) {
      console.error('Failed to fetch activity logs:', error);
    }
  };

  // Add a new task
  const addTask = async (taskData) => {
    try {
      setLoading(true);
      const { task } = await createTask(taskData);
      setTasks([task, ...tasks]);
      setLoading(false);
      toast.success('Task created successfully');
      fetchActivityLogs();
      return task;
    } catch (error) {
      setError(error.message || 'Failed to create task');
      setLoading(false);
      toast.error(error.message || 'Failed to create task');
      return null;
    }
  };

  // Update a task
  const updateTaskById = async (id, taskData) => {
    try {
      setLoading(true);
      const { task } = await updateTask(id, taskData);
      setTasks(tasks.map(t => (t._id === id ? task : t)));
      setLoading(false);
      toast.success('Task updated successfully');
      fetchActivityLogs();
      return task;
    } catch (error) {
      setError(error.message || 'Failed to update task');
      setLoading(false);
      toast.error(error.message || 'Failed to update task');
      return null;
    }
  };

  // Delete a task
  const deleteTaskById = async (id) => {
    try {
      setLoading(true);
      await deleteTask(id);
      setTasks(tasks.filter(t => t._id !== id));
      setLoading(false);
      toast.success('Task deleted successfully');
      fetchActivityLogs();
      return true;
    } catch (error) {
      setError(error.message || 'Failed to delete task');
      setLoading(false);
      toast.error(error.message || 'Failed to delete task');
      return false;
    }
  };

  // Get tasks by status
  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status);
  };

  // Move a task to a different status
  const moveTask = async (id, newStatus) => {
    try {
      const task = tasks.find(t => t._id === id);
      if (!task) return null;
      
      const updatedTask = await updateTaskById(id, { status: newStatus });
      return updatedTask;
    } catch (error) {
      console.error('Failed to move task:', error);
      return null;
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        activityLogs,
        loading,
        error,
        fetchTasks,
        addTask,
        updateTask: updateTaskById,
        deleteTask: deleteTaskById,
        getTasksByStatus,
        moveTask,
        fetchActivityLogs
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};