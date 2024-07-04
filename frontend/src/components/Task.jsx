import { useState, useCallback } from 'react';
import { Card, CardContent, Typography, Button, Switch } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TaskService from '../services/taskService';
import { memo } from 'react';


const Task = memo( function Task ({ task, onDeleteTask }){
  const navigate = useNavigate();
  const [isCompleted, setIsCompleted] = useState(task.completed);

  const handleDeleteTask = useCallback(async () => {
    try {
      onDeleteTask(task._id);
    } catch (error) {
      console.error(`Failed to delete task with ID ${task._id}:`, error);
    }
  }, [onDeleteTask, task._id]);

  const handleEditClick = useCallback(() => {
    navigate(`/tasks/${task._id}/edit`);
  }, [navigate, task._id]);

  const toggleCompletion = useCallback(async () => {
    const updatedTask = { ...task, completed: !isCompleted };
    const response = await TaskService.updateTask(task._id, updatedTask);
    if (response?.success) {
      setIsCompleted(!isCompleted);
    } else {
      console.error(`Failed to toggle task with ID ${task._id}:`, response?.message);
    }
  }, [isCompleted, task]);

  return (
    <Card
      key={task._id}
      sx={{
        maxWidth: 400,
        marginBottom: 2,
        backgroundColor: isCompleted ? 'grey.300' : 'white',
        opacity: isCompleted ? 0.5 : 1,
        transition: 'all 0.5s',
      }}
    >
      <CardContent>
        <Typography variant="h5" component="div">
          {task.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {task.description}
        </Typography>
        <br />
        <hr />
        <Switch checked={isCompleted} onChange={toggleCompletion} color="primary" />
        <br />
        <br />
        <Button variant="contained" color="secondary" onClick={handleEditClick}>
          Edit
        </Button>
        <br />
        <br />
        <Button variant="contained" color="warning" onClick={handleDeleteTask}>
          Delete
        </Button>
      </CardContent>
    </Card>
  );
});

export default Task;
