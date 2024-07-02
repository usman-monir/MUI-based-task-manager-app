import { useState, useEffect } from 'react';
import { Typography, Button, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TaskService from '../../services/taskService';
import Task from "../../components/Task"

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const fetchedTasks = await TaskService.fetchTasks();
      setErrorMessage('');
      setTasks(fetchedTasks);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      setErrorMessage(error.message || 'Failed to fetch tasks');
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await TaskService.deleteTask(taskId);
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (error) {
      console.error(`Failed to delete task with ID ${taskId}:`, error);
    }
  };

  const handleCreateTask = async () => {
    navigate('/tasks/add')
  };

  const renderTasks = () => {
    {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
    if (tasks?.length === 0) {
      return <Typography variant="body1">No tasks yet. Create a new task!</Typography>;
    }

    return tasks?.map(task => (
      <Task task={task} key={task._id} onDeleteTask={handleDeleteTask}/>
    ));
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Your Tasks
      </Typography>
      {renderTasks()}
      <Button variant="contained" color="primary" onClick={handleCreateTask}>
        Create New Task
      </Button>
    </div>
  );
};

export default Tasks;
